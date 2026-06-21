# 🎪 terminal-toys

> Useless terminal commands with maximum personality.

Your terminal has feelings now.

One install, a dozen toys.

```bash
npm install -g terminal-toys
```

Then:

```bash
coinflip pizza burger
oracle "should i quit?"
touchgrass
git-roast
procrastinator
scream
```

Run `terminal-toys` to see the whole menu.

---

## The toys

| Command | What it does |
|---|---|
| `coinflip [a b]` | Flip a coin, or pick between your own options. |
| `decision a b` | Decides for you, waits, then reads your disappointed face. The decision isn't the output — your reaction is. |
| `oracle "question"` | Ask the mystic terminal a yes/no question. |
| `excuse` | A scientifically valid reason not to work today. |
| `luck` | Roll today's luck meter + a fortune. |
| `panic` | Scream, then receive a professional diagnosis. |
| `scream [n]` | `AAAAAAAA`. Optional intensity 1–12. |
| `procrastinator` | A to-do list of everything except your actual task. |
| `touchgrass` | Analyzes your screen time and prescribes the outdoors. |
| `git-roast` | Reads your commit history and roasts you (run inside a repo). |
| `blame-me [thing]` | Finds someone — or something — else to blame. |
| `dramaticexit` | A theatrical farewell before you log off. |
| `feedback` | Like it? Star, share, or report a bug. |

Every toy accepts `--fast` to skip the animations (also auto-enabled when output is piped).

## Examples

```text
$ decision pizza burger

  deciding...

  burger

  Your face looked disappointed.
  You wanted pizza.

$ excuse

  You can't work today.

  ╭──────────────────────────────────────────╮
  │ Your keyboard appears emotionally         │
  │ unavailable.                              │
  ╰──────────────────────────────────────────╯

$ touchgrass

  System analysis complete.

  You have:
   - 31.2h since your machine last rested
   - 14 shell/terminal processes alive
   - 6 git commit(s) today

  ╭──────────────────────────────────────────╮
  │   Prescription: go outside.               │
  ╰──────────────────────────────────────────╯
```

## Why

No one needs this, that's the point.

## Contributing

The best PRs here are the easy ones: **add an excuse, a fortune, a roast, an oracle answer.** The data lives in plain JSON under [`lib/data/`](lib/data/). Add a line, open a PR. See [CONTRIBUTING.md](CONTRIBUTING.md).
Remember, Funny > clever. Memorable > useful.

## Zero dependencies

No runtime dependencies. Just Node ≥ 14. Fast to install, nothing to audit.
Just plug and play.

## License

MIT
