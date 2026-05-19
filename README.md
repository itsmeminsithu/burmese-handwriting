# မြန်မာစာ လက်ရေး Trainer

Developer: **Min SiThu**  
Version: **v0.3.0-php-python**  
Status: **PHP + Python GitHub-ready prototype**

A privacy-focused Burmese handwriting practice and dataset collection prototype.

This project lets users practice Burmese consonants by drawing on a canvas. The browser sends the drawing to a PHP API, PHP calls a Python demo scorer, and the attempt is saved into a local JSON dataset for future machine learning research.

> Important: the current scorer is demo-only. It uses simple ink-coverage heuristics and stroke metadata. It is not yet an AI handwriting quality evaluator.

## Tech Stack

- PHP
- Python 3
- HTML
- CSS
- JavaScript Canvas API
- JSON file storage

## Features

- Burmese consonant handwriting practice
- Canvas drawing with mouse and touch support
- Undo last stroke
- Pen size selector
- PHP API endpoints
- Python demo scoring script
- Local JSON dataset storage
- Stroke count and drawing duration metadata
- Progress dashboard
- Export dataset as JSON
- Burmese word examples
- Example sentences
- Myanmar quotes/proverbs
- Quote of the Day

## Project Structure

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
│   └── dataset_summary.py
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
├── PROJECT_RECAP.md
├── ROADMAP.md
├── LICENSE
└── .gitignore
```

## Run Locally

Requirements:

- PHP 8+
- Python 3.9+

Start the PHP dev server:

```bash
php -S localhost:8000
```

Open:

```txt
http://localhost:8000
```

## How Scoring Works

1. User draws a Burmese consonant on the canvas.
2. JavaScript sends the PNG image and metadata to `api/score.php`.
3. PHP writes the PNG to a temporary file.
4. PHP calls `scripts/scorer.py`.
5. Python calculates ink coverage and combines it with stroke count/duration.
6. PHP returns a 1–5 star demo score.
7. JavaScript sends the attempt to `api/save_attempt.php`.
8. PHP saves the attempt to `data/attempts.json`.

This gives a useful research workflow without claiming real handwriting recognition yet.

## API Endpoints

### `POST /api/score.php`

Scores one drawing using the Python demo scorer.

Request:

```json
{
  "char": "က",
  "roman": "ka",
  "imageBase64": "PNG_BASE64_DATA",
  "metadata": {
    "strokeCount": 3,
    "durationMs": 4200,
    "canvasWidth": 320,
    "canvasHeight": 320,
    "penSize": 5
  }
}
```

### `POST /api/save_attempt.php`

Saves one scored attempt into `data/attempts.json`.

### `GET /api/stats.php`

Returns progress stats.

### `GET /api/export.php`

Downloads the dataset JSON.

### `POST /api/clear.php`

Clears the local dataset. Use carefully.

## Dataset Target

Minimum:

```txt
33 consonants × 15 samples = 495 samples
```

Better:

```txt
33 consonants × 30 samples = 990 samples
```

Strong early target:

```txt
1,000–3,000 samples
```

## Python Dataset Summary

After collecting attempts, run:

```bash
python3 scripts/dataset_summary.py
```

## Research Direction

This can become a university thesis project:

1. Burmese handwriting data collection tool
2. Burmese consonant handwriting dataset
3. Human-labeled handwriting quality scores
4. Baseline image similarity scorer
5. CNN or TensorFlow.js model
6. Human score vs ML score comparison

## Roadmap

- [x] Phase 1 — Local web app with demo scorer
- [x] Phase 1.5 — Word examples, sentences, and Myanmar quotes/proverbs
- [x] Phase 2 draft — PHP + Python backend structure
- [ ] Data collection page for minsithu.org
- [ ] Consent checkbox and anonymous participant ID
- [ ] Human review dashboard
- [ ] Human-labeled handwriting dataset
- [ ] Baseline shape similarity scorer
- [ ] CNN / TensorFlow.js model
- [ ] React Native mobile app

## License

MIT License
