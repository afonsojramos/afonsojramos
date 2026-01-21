#!/usr/bin/env node
import { render } from "ink";
import { App } from "./App.js";

// Clear screen
process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");

const { unmount, waitUntilExit } = render(<App onExit={() => unmount()} />);

await waitUntilExit();
