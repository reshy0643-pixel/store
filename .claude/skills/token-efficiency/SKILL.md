---
name: token-efficiency
description: Keep token usage low on every task — targeted reads, batched tool calls, short answers. Apply always; especially on large files (e.g. the ~140 KB index.html in this repo), long sessions, or when the user asks to save tokens / "تقليل التوكنز".
---

# Token efficiency

## Reading
- Search before reading: `Grep` for the symbol/string, then `Read` with `offset`/`limit` around the hit. Never read a large file whole (index.html here is ~140 KB).
- Use `head`, `sed -n 'a,bp'`, `wc -l`, `grep -n -c` to size things up first.
- Don't re-read a file you just edited or already have in context.
- Don't open binaries/images (icons, PNGs) unless the task is about them.
- Prefer `files_with_matches` / `count` output modes; use `head_limit`.

## Acting
- Batch independent tool calls in one message.
- Edit with small, exact `Edit` replacements instead of rewriting whole files.
- Pipe noisy commands: `| tail -20`, `-q`, `--silent`; never dump full logs or lockfiles.
- Don't spawn subagents unless asked — each one re-reads context from scratch.
- Web: one `standard` search first; `extended` only if results are thin. Fetch a specific doc page, not a whole site.
- Don't re-derive decisions already made or re-verify what a tool already confirmed.

## Writing
- Answer first, then only necessary detail. No preamble, no restating the question, no recap of what the diff already shows.
- Code: show only changed parts; reference `file:line` instead of pasting.
- Lists over paragraphs; skip options you won't recommend.
- Match the user's language (Arabic in, Arabic out) without duplicating it in English.

## Session hygiene
- Long session drifting? Summarize state in a few lines and continue; suggest `/compact` or a fresh session for unrelated work.
- Put stable project facts in CLAUDE.md once instead of re-discovering them each session.
