# မြန်မာစာ လက်ရေး Trainer

Burmese handwriting practice app with a demo scorer. Version `v0.3.0-php-python`.

Developer: **Min SiThu**

Users draw a Burmese consonant on a canvas. The browser sends the drawing to a PHP endpoint, PHP calls a Python scorer, and the attempt is stored in a local JSON file. There is no account system and no external service: all data stays in `data/attempts.json` on the machine running the server.

The scorer is demo-only. It scores ink coverage, stroke count, and drawing duration on a 1–5 star scale. It does not recognise handwriting shape.

## Project structure

```txt
burmese-handwriting/
├── index.php
├── api/
│   ├── score.php
│   ├── save_attempt.php
│   ├── stats.php
│   ├── export.php
│   └── clear.php
├── includes/
│   └── helpers.php
├── scripts/
│   ├── scorer.py
│   ├── dataset_summary.py
│   └── test_python_scorer.py
├── data/
│   └── .gitkeep
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── characters.js
│   ├── drawing.js
│   ├── storage.js
│   ├── wordExamples.js
│   └── quotes.js
├── .devcontainer/
│   └── devcontainer.json
├── PROJECT_RECAP.md
├── ROADMAP.md
├── LICENSE
└── .gitignore
```

## Run locally

Requirements: PHP 8+, Python 3.9+.

```bash
php -S localhost:8000
```

Open `http://localhost:8000`.

## Live preview (GitHub Codespaces)

GitHub Pages cannot run this app because it needs PHP and Python. The preview route is Codespaces:

1. On GitHub, open **Code > Codespaces > Create codespace** (on `main` after this branch is merged; the devcontainer image provides PHP, and its setup step installs Python 3 if it is missing).
2. In the Codespaces terminal, run:

```bash
php -S localhost:8000
```

3. Open the forwarded port 8000 in the browser and draw a character to test scoring end to end.

Post-merge step still required: actually launch a Codespace and submit a drawing, to confirm the devcontainer and the `php -S` command work there. This PR does not claim a tested live URL.

## How scoring works

1. The user draws a Burmese consonant on the canvas.
2. JavaScript sends the PNG image and metadata to `api/score.php`.
3. PHP writes the PNG to a temporary file.
4. PHP calls `scripts/scorer.py`.
5. Python calculates ink coverage and combines it with stroke count and duration.
6. PHP returns a 1–5 star demo score.
7. JavaScript sends the attempt to `api/save_attempt.php`.
8. PHP saves the attempt to `data/attempts.json`.

## API endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/score.php` | POST | Score one drawing. Body: `char`, `roman`, `imageBase64` (PNG), `metadata` (`strokeCount`, `durationMs`, `canvasWidth`, `canvasHeight`, `penSize`). |
| `/api/save_attempt.php` | POST | Save one scored attempt to `data/attempts.json`. |
| `/api/stats.php` | GET | Return progress stats. |
| `/api/export.php` | GET | Download the dataset JSON. |
| `/api/clear.php` | POST | Clear the local dataset. |

## Dataset summary

After collecting attempts, run:

```bash
python3 scripts/dataset_summary.py
```

Collection targets stated in the project docs: 33 consonants × 15 samples = 495 minimum; × 30 samples = 990; a strong early target is 1,000–3,000 samples.

## Roadmap

See `ROADMAP.md` for completed phases and next steps (data-collection page, consent and participant ID, human review, labelled dataset, baseline shape scorer).

## License

MIT — see `LICENSE`.
