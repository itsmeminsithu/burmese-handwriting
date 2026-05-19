# Project Recap — မြန်မာစာ လက်ရေး Trainer

**Developer:** Min Sithu  
**Project:** မြန်မာစာ လက်ရေး Trainer  
**Current version:** v0.2-learning  
**Status:** Local browser demo + learning content prototype  

---

## 1. Project Goal

The goal of this project is to build a privacy-focused Burmese handwriting trainer and research tool.

The app helps users practice Burmese consonants by drawing on a canvas. It gives a demo score, tracks progress locally, shows example Burmese words and sentences, and exports handwriting attempts as JSON for future machine learning research.

Long-term research question:

> Can machine learning accurately evaluate Burmese handwriting quality?

---

## 2. What Is Built So Far

A local web app built with plain:

- HTML
- CSS
- JavaScript
- Canvas API
- localStorage

No frontend framework is used. The app runs directly in the browser.

Current screens:

1. **Home**
   - Total attempts
   - Average score
   - Streak
   - Quote of the day

2. **Practice**
   - Shows one Burmese consonant
   - User draws on canvas using mouse or touch
   - Clear and submit controls

3. **Result**
   - 1–5 star demo score
   - Feedback text
   - User drawing vs target character
   - Burmese example words for the practiced character
   - Example sentence
   - Myanmar quote/proverb

4. **Progress**
   - Shows all 33 Burmese consonants
   - Shows average score per character
   - Allows clicking a character to practice it
   - Allows exporting saved data as JSON

---

## 3. Current Folder Structure

```text
burmese-handwriting/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── characters.js      # all 33 Burmese consonants
│   ├── drawing.js         # canvas drawing logic
│   ├── storage.js         # localStorage and export logic
│   ├── scorer.js          # local demo scorer
│   ├── wordExamples.js    # Burmese words and example sentences
│   ├── quotes.js          # Myanmar quotes/proverbs
│   └── app.js             # main app controller
├── README.md
└── PROJECT_RECAP.md
```

---

## 4. Scoring System

The current scorer is a local demo scorer.

It does **not** use AI yet.

Current logic:

- Very little ink gives a low score.
- Medium ink gives a medium score.
- Good ink amount gives a higher score.
- A fake delay is used to make scoring feel realistic.
- Feedback messages vary by star level.

Important limitation:

> The demo scorer checks ink coverage only. It cannot truly recognize whether the shape is correct Burmese handwriting.

This is acceptable for Phase 1, but it should not be presented as a real ML handwriting evaluator yet.

---

## 5. Learning Features Added in v0.2

### Character Word Examples

After practicing a character, the result screen shows words that use the character.

Example:

```text
က = ကောင်းကင် / အကင် / ကလေး / ကမ္ဘာ
```

The app also shows a simple example sentence.

### Myanmar Quotes / Proverbs

The app now includes Myanmar quotes and proverb-style learning messages.

They appear in:

- Home screen as Quote of the Day
- Result screen as a motivation card

Recommended label:

```text
မြန်မာစကားပုံနှင့် အဆိုအမိန့်များ
Myanmar Proverbs & Quotes
```

---

## 6. Data Saved Per Attempt

Each attempt is saved in browser localStorage.

Current saved fields:

- App version
- Character
- Romanization
- Star score
- Feedback text
- Handwriting image as base64 PNG
- Timestamp

The user can export the saved data as JSON.

This exported JSON can become the starting point for a future handwriting dataset.

---

## 7. Privacy Concept

The current app is privacy-friendly because:

- Drawing happens locally in the browser.
- The demo scorer runs locally.
- No backend server is required.
- No API key is required.
- No handwriting image is uploaded anywhere by default.

This makes the project suitable for local demos and early thesis prototyping.

---

## 8. Research / Thesis Direction

This project can become a university thesis around Burmese handwriting quality assessment.

Possible thesis contribution:

1. A browser-based Burmese handwriting data collection tool
2. A small labeled Burmese consonant handwriting dataset
3. A baseline scoring system
4. A machine learning model for handwriting quality evaluation
5. A comparison between human scoring and model scoring

Minimum dataset target:

```text
33 consonants × 15 samples = 495 samples
```

Better early target:

```text
33 consonants × 30 samples = 990 samples
```

Stronger target:

```text
1,000–3,000 samples
```

---

## 9. Next Features to Build

### Priority 1 — Better Trainer UX

- Tracing guide mode
- Undo last stroke
- Pen size selector
- Skip character
- Weak character practice
- Character detail history

### Priority 2 — Research Data Collection

Build a separate collection page for minsithu.org.

Recommended flow:

```text
Welcome
→ Consent
→ Participant info
→ Writing task
→ Review
→ Submit
→ Thank you
```

Add fields:

- Consent accepted
- Anonymous participant ID
- Session ID
- Device type
- Canvas size
- Drawing duration
- Stroke count
- Self-rating
- Human score

### Priority 3 — Better Scoring Baseline

Before real ML, improve the demo scorer with:

- Bounding box check
- Centering check
- Too much ink detection
- Target image similarity
- Stroke count comparison

### Priority 4 — ML Model

After enough data is collected:

- Train a CNN model
- Compare model score with human score
- Convert to TensorFlow.js if possible
- Run scoring locally in browser

---

## 10. Current Roadmap

- [x] Phase 1 — Local web app with demo scorer
- [x] Phase 1.5 — Word examples, sentences, and Myanmar quotes/proverbs
- [ ] Phase 2 — Data collection page for minsithu.org
- [ ] Phase 3 — Human-labeled handwriting dataset
- [ ] Phase 4 — Baseline image similarity scorer
- [ ] Phase 5 — CNN / TensorFlow.js model
- [ ] Phase 6 — React Native mobile app

---

## 11. Recommended GitHub Repository Name

Suggested repo name:

```text
burmese-handwriting-trainer
```

Alternative names:

```text
myanmar-handwriting-trainer
burmese-handwriting-ml
myanmar-script-trainer
```

Recommended public description:

```text
A local browser-based Burmese handwriting trainer and dataset prototype for future ML handwriting quality research.
```

---

## 12. Important Notes

- The current scorer is demo-only.
- Word examples for rare consonants should be reviewed by a Burmese language expert before thesis/public release.
- The project should add ethics approval and consent flow before collecting real participant data.
- Do not collect names, signatures, ID cards, addresses, or sensitive personal documents.

