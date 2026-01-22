#!/usr/bin/env bun
/**
 * Compresses ASCII art frames for the dance animation using zlib.
 * - Parses raw frames from frames-raw.txt (36 lines per frame)
 * - Compresses using gzip, stores as base64
 * - Frames are decompressed at runtime
 *
 * ASCII frames from: https://github.com/johnsoupir/ASCII_Rickroll
 * Thanks to @johnsoupir for the amazing ASCII art!
 */

import { gzipSync } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const LINES_PER_FRAME = 36;

const assetsDir = join(import.meta.dir, "../src/assets");
const rawPath = join(assetsDir, "frames-raw.txt");
const outPath = join(assetsDir, "frames.ts");

// Read raw file
const raw = readFileSync(rawPath, "utf-8");
const lines = raw.split("\n");

console.log(`Total lines: ${lines.length}`);

// Split into frames (36 lines each)
const allFrames: string[] = [];
for (let i = 0; i < lines.length; i += LINES_PER_FRAME) {
  const frameLines = lines.slice(i, i + LINES_PER_FRAME);
  if (frameLines.length === LINES_PER_FRAME) {
    // Keep lines at full 130-char width for consistent centering
    const frame = frameLines.map((line) => line.padEnd(130)).join("\n");
    allFrames.push(frame);
  }
}

console.log(`Total frames parsed: ${allFrames.length}`);

const selectedFrames = allFrames;

console.log(`Selected frames: ${selectedFrames.length}`);

// Compress all frames as a single JSON blob
const framesJson = JSON.stringify(selectedFrames);
const compressed = gzipSync(framesJson);
const base64 = Buffer.from(compressed).toString("base64");

console.log(`Frames JSON size: ${framesJson.length} bytes`);
console.log(`Compressed size: ${compressed.length} bytes`);
console.log(`Base64 size: ${base64.length} bytes`);
console.log(`Compression ratio: ${((compressed.length / framesJson.length) * 100).toFixed(1)}%`);

// Generate TypeScript output with decompression at runtime
const output = `// Auto-generated - do not edit manually
// Run: bun scripts/compress-frames.ts

import { gunzipSync } from "zlib";

const compressed = "${base64}";

function decompress(): string[] {
  const bytes = Uint8Array.from(atob(compressed), (c) => c.charCodeAt(0));
  const decompressed = gunzipSync(bytes);
  const text = new TextDecoder().decode(decompressed);
  return JSON.parse(text);
}

export const danceFrames: string[] = decompress();
`;

writeFileSync(outPath, output);
console.log(`Wrote compressed frames to ${outPath}`);

// Final stats
const rawSize = raw.length;
const outputSize = output.length;
console.log(`\nTotal: ${rawSize} -> ${outputSize} bytes (${((outputSize / rawSize) * 100).toFixed(1)}%)`);
