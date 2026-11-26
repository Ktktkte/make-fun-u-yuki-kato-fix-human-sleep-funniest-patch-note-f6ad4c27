# BRIEF — Fix Human Sleep: Funniest Patch Note

## Competition

- Slug: `u-yuki-kato-fix-human-sleep-funniest-patch-note-f6ad4c27`
- Title: "Fix Human Sleep: Funniest Patch Note"
- Prize: $2, winner take all (1st place only)
- Deadline: 2026-11-26 23:10 WIB (16:10 UTC)
- Harness: program/v1, Node 22, no network, read-only `/bot`, user 65534
- Deliverable: `main.ts` at the repo root writes one text to
  `$MAKEFUN_OUTPUT_DIR/entry.txt`.

## The gate (sealed scorer)

`/output/entry.txt` must be UTF-8 text of **1 to 160 characters**, not only
whitespace, a single line. Only a valid entry goes before the judge; an
invalid one is listed with 0, no rate, no prize.

## The judge (head-to-head, AI model)

An AI comedy editor compares two patch notes at a time and picks the funnier,
weighing in this order:

1. Reads as a real patch note announcing a fix for human sleep.
2. Is funny — the joke lands on a single read and earns a laugh.
3. Sounds like genuine release notes: terse, confident, changelog voice.
4. Stays a single line and under the character cap, no padding.
5. Surprises — the fix is specific and unexpected, not a flat "sleep is fixed".

A line that explains the joke is weaker than one that trusts the reader.

## The entry line

> Fixed: sleep now ships with a mute button for the 3 a.m. voice replaying
> everything embarrassing you've ever said.

Why this line:

- **Real patch note (criterion 1):** opens with `Fixed:` and announces a
  concrete change to human sleep, in changelog register.
- **Funny on one read (criterion 2):** the 3 a.m. voice replaying every
  embarrassing thing is instantly relatable; the laugh comes from recognition,
  not from a setup that needs unpacking.
- **Changelog voice (criterion 3):** "now ships with a mute button" is terse,
  confident, and phrased the way a release note would phrase a feature.
- **Single line, under cap (criterion 4):** one line, well under 160
  characters, no trailing explanation, no padding.
- **Surprise (criterion 5):** the fix is specific and unexpected — a mute
  button for an inner voice — rather than a flat claim that sleep is fixed.
- **Trusts the reader:** nothing explains the joke; the line ends on the punch.

Deliberately NOT used: text addressed to the judge. The rules allow it, but
criterion 1 (reads as a real patch note) is weighed first, and a line begging
the judge would lose to any genuine patch note on the subject.

## How main.ts works

- Reads `entry.txt` from the directory of the script file itself
  (`fileURLToPath` + `dirname`), never `process.cwd()`, so the grader can run
  it from any working directory.
- Validates the line against the gate before writing: 1–160 characters,
  single line, not only whitespace.
- Writes the line byte-for-byte to `$MAKEFUN_OUTPUT_DIR/entry.txt` with no
  trailing newline, so the file holds exactly the judged text.
- Creates the output directory if needed (`mkdir -p` semantics) and never
  deletes it — the grader's `/output` is a mount point that cannot be removed.
- Fully deterministic: constant input, no clock, no randomness, no network.
  Two runs produce byte-identical output.

## Files

- `main.ts` — entrypoint the grader runs (`node /bot/main.ts`).
- `entry.txt` — the single patch-note line, no trailing newline.
- `README.md` — the three live make.fun badges + bounty link + run steps.
- `LICENSE` — MIT, `SPDX-License-Identifier: MIT` as the first line.
- `BRIEF.md` — this file (the prose spec of what was built).

## Verification

- `/tmp`-cwd test: `cd /tmp && MAKEFUN_OUTPUT_DIR=/tmp/out-<slug> node
  <entry-dir>/main.ts`, exit 0, run twice, outputs byte-identical.
- Char count of the entry line checked with `wc -m` / `wc -c` (must be 1–160).
