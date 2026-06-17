# Contributing

The whole point of terminal-toys is community personality. The easiest and most welcome contributions are **new lines of content**.

## Add an excuse / fortune / roast / oracle answer

All content lives as plain JSON in [`lib/data/`](lib/data/):

- `excuses.json` — reasons you can't work today (array of strings)
- `oracle.json` — `yes` / `no` / `maybe` answers
- `luck.json` — `fortunes`
- `procrastinator.json` — `tasks` and `closers`
- `blame.json` — `who` (culprits) and `verdicts`
- `panic.json` — `verdicts` and `diagnostics`
- `dramaticexit.json` — `monologues` (arrays of lines) and `signoffs`
- `roasts.json` — git-roast burns, keyed by pattern

Add your line, keep it short, keep it funny, keep it kind-ish. Then:

```bash
npm test   # makes sure every toy still runs and the JSON is valid
```

Open a PR. That's it.

## Add a whole new toy

1. Create `bin/<name>.js` with a `#!/usr/bin/env node` shebang.
2. Reuse the helpers in [`lib/ui.js`](lib/ui.js) (`c` colors, `sleep`, `pick`, `box`, `type`, `line`).
3. Honor `--fast` (skip animations) — copy the pattern from an existing toy.
4. Register it in the `bin` map in `package.json` and in the menu in `bin/terminal-toys.js`.
5. `chmod +x bin/<name>.js`, run `npm test`, and add a row to the README table.

## Style

- Zero runtime dependencies. Keep it that way.
- Output should look good in color and degrade gracefully without it (`NO_COLOR`, non-TTY).
- Funny > clever. Memorable > useful.
