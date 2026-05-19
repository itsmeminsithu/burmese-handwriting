# မြန်မာစာ လက်ရေး Trainer
### by Min Sithu

A local browser app for practicing Burmese consonant handwriting, learning example words, and exporting practice data for future ML research.

This version is **Phase 1 / 1.5** of the Burmese Handwriting ML Research Project.

---

## Current Version

This demo runs locally in the browser with:

- No backend server
- No API key
- No internet required for the app logic
- Demo scoring only, based on local canvas ink analysis

> Note: this version does **not** use a real AI/ML handwriting model yet. The current scorer is a local demo scorer. A real ML or vision scorer can replace `js/scorer.js` later.

---

## How to Run

### Option A — Easiest (VS Code)
1. Open the `burmese-handwriting` folder in VS Code
2. Install the "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. App opens in your browser at localhost:5500

### Option B — Python
```bash
cd burmese-handwriting
python -m http.server 8080
```
Then open: http://localhost:8080

### Option C — Node.js
```bash
cd burmese-handwriting
npx serve .
```
Then open the URL shown in terminal.

You can usually open `index.html` directly too, because this demo does not call an external API.

---

## Features

- ✏️ Draw Burmese characters on a canvas with mouse or touch
- ⭐ 1–5 star demo scoring
- 🔥 Streak tracking
- 📊 Progress screen for all 33 consonants
- 📚 Example Burmese words for each consonant
- 💬 Myanmar Proverbs & Quotes / မြန်မာစကားပုံနှင့် အဆိုအမိန့်များ
- 💾 All practice data saved locally in browser localStorage
- 📤 Export practice data as JSON for future ML training

---

## New Learning Content

After each practice result, the app now shows:

1. Words using the target character  
   Example: `က = ကောင်းကင် / အကင် / ကလေး / ကမ္ဘာ`
2. A simple example sentence
3. A Myanmar quote or proverb for motivation

The Home screen also shows a daily Myanmar quote.

---

## Project Structure

```text
burmese-handwriting/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── characters.js      ← all 33 Burmese consonants
│   ├── drawing.js         ← canvas drawing logic
│   ├── storage.js         ← localStorage + data export
│   ├── scorer.js          ← local demo scorer
│   ├── wordExamples.js    ← words and example sentences
│   ├── quotes.js          ← Myanmar quotes/proverbs
│   └── app.js             ← main app controller
└── README.md
```

---

## ML Data Collection

Every attempt is saved with:

- App version
- Character written
- Romanization
- Star score
- Feedback text
- Handwriting image as base64
- Timestamp

Use the **Export Data** button in the Progress screen to download your dataset as JSON.

For research use, the next version should add:

- Consent checkbox
- Anonymous participant ID
- Session ID
- Device type
- Drawing duration
- Stroke count
- Self-rating
- Human review score

---

## Roadmap

- [x] Phase 1 — Local web app with demo scorer
- [x] Phase 1.5 — Word examples, sentences, and Myanmar quotes/proverbs
- [ ] Phase 2 — Data collection page for minsithu.org
- [ ] Phase 3 — Human-labeled handwriting dataset
- [ ] Phase 4 — Baseline image similarity scorer
- [ ] Phase 5 — CNN / TensorFlow.js model
- [ ] Phase 6 — React Native mobile app

---

*Part of Min Sithu's thesis research on Burmese handwriting quality assessment.*
