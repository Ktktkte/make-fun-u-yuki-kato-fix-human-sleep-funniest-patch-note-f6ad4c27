// Fix Human Sleep: Funniest Patch Note.
// Writes the single patch-note line kept in entry.txt (next to this script)
// to $MAKEFUN_OUTPUT_DIR/entry.txt, exactly as the gate expects:
// one line, UTF-8, 1-160 characters, no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The sealed gate accepts only UTF-8 text of 1 to 160 characters, not only
// whitespace, on a single line. Reject anything outside that before writing
// so a bad line fails loudly here instead of silently scoring 0 upstream.
function validateEntryLine(line: string): void {
  if (line.length < 1 || line.length > 160) {
    throw new Error(`entry line must be 1-160 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const line = readFileSync(entryPath, "utf8");
validateEntryLine(line);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line, "utf8");
