# မြန်မာစာ လက်ရေး Trainer — Project Recap

Developer: **Min SiThu**  
Current version: **v0.3.0-php-python**  
Status: **PHP + Python GitHub-ready prototype**

## Project Goal

Build a privacy-focused Burmese handwriting trainer and research tool.

The app helps users practice Burmese consonants by drawing on a canvas. It gives demo scoring, tracks progress, shows example Burmese words and sentences, and exports handwriting attempts as JSON for future machine learning research.

Long-term research question:

> Can machine learning accurately evaluate Burmese handwriting quality?

## Current Version

This version converts the earlier static browser demo into a PHP + Python project:

- `index.php` renders the app.
- JavaScript handles canvas drawing and UI.
- PHP API endpoints handle scoring, saving, stats, and export.
- Python performs the demo scoring heuristic.
- Attempts are saved to `data/attempts.json`.

## Important Limitation

The current scorer is demo-only.

It checks ink coverage, stroke count, and drawing duration. It does not truly recognize handwriting shape yet.

Correct description:

> A local Burmese handwriting practice and dataset prototype with demo scoring.

Not yet:

> An AI handwriting quality evaluator.

## Built Features

- Burmese consonant handwriting practice
- Canvas drawing
- Touch support
- Undo last stroke
- Pen size selector
- PHP scoring endpoint
- Python demo scorer
- Progress tracking
- JSON dataset storage
- JSON export
- Burmese word examples
- Example sentences
- Myanmar quotes/proverbs
- Quote of the Day
- Offline-friendly app logic except local PHP server requirement

## Next Priority

Build a dedicated data collection page for `minsithu.org`:

- Consent checkbox
- Anonymous participant ID
- Session ID
- Self-rating
- Drawing duration
- Stroke count
- Human review fields
- Clean dataset export

## Dataset Target

Minimum: 495 samples  
Better: 990 samples  
Strong early target: 1,000–3,000 samples
