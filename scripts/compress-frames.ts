#!/usr/bin/env bun
/**
 * Compresses ASCII art frames for the dance animation.
 * - Parses raw frames from frames-raw.txt
 * - Samples every Nth frame to reduce size
 * - Trims trailing whitespace from each line
 * - Outputs a TypeScript file with compressed frames
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const LINES_PER_FRAME = 36;
const SAMPLE_RATE = 12; // Take every 12th frame (~12 frames total)

const assetsDir = join(import.meta.dir, "../src/assets");
const rawPath = join(assetsDir, "frames-raw.txt");
const outPath = join(assetsDir, "frames.ts");

// Read and parse raw frames
const raw = readFileSync(rawPath, "utf-8");
const lines = raw
  .replace('FRAMES = """', "")
  .replace('"""', "")
  .split("\n")
  .filter((line) => line.length > 0);

// Split into frames
const frames: string[][] = [];
for (let i = 0; i < lines.length; i += LINES_PER_FRAME) {
  const frame = lines.slice(i, i + LINES_PER_FRAME);
  if (frame.length === LINES_PER_FRAME) {
    frames.push(frame);
  }
}

console.log(`Total frames parsed: ${frames.length}`);

// Sample and compress frames
const sampledFrames = frames.filter((_, i) => i % SAMPLE_RATE === 0);

const compressedFrames = sampledFrames.map((frame) =>
  frame.map((line) => line.trimEnd()).join("\n"),
);

console.log(`Sampled frames: ${compressedFrames.length}`);

// Generate TypeScript output
const output = `// Auto-generated - do not edit manually
// Run: bun scripts/compress-frames.ts

export const danceFrames = [
${compressedFrames.map((frame) => `  \`${frame}\``).join(",\n")}
];
`;

writeFileSync(outPath, output);
console.log(`Wrote compressed frames to ${outPath}`);

// Stats
const rawSize = raw.length;
const compressedSize = output.length;
console.log(
  `Compression: ${rawSize} -> ${compressedSize} bytes (${((compressedSize / rawSize) * 100).toFixed(1)}%)`,
);
