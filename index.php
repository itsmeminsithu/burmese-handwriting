<?php
$appVersion = '0.3.0-php-python';
$appTitle = 'မြန်မာစာ လက်ရေး Trainer';
$developer = 'Min SiThu';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($appTitle) ?> — <?= htmlspecialchars($developer) ?></title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body data-app-version="<?= htmlspecialchars($appVersion) ?>">

  <noscript>
    <div class="data-note">This trainer needs JavaScript enabled for canvas drawing.</div>
  </noscript>

  <!-- SCREEN: HOME -->
  <div id="screen-home" class="screen active">
    <div class="home-bg"></div>
    <div class="home-content">
      <div class="logo-mark">မြန်မာ</div>
      <h1 class="title">Handwriting<br><em>Trainer</em></h1>
      <p class="subtitle">Learn · Practice · Research<br>Burmese Script</p>
      <div class="version-pill">PHP + Python · <?= htmlspecialchars($appVersion) ?></div>
      <div class="home-stats" id="home-stats">
        <div class="stat"><span id="stat-total">0</span><small>Attempts</small></div>
        <div class="stat"><span id="stat-best">—</span><small>Avg Score</small></div>
        <div class="stat"><span id="stat-streak">0</span><small>Best Streak</small></div>
      </div>
      <div class="daily-quote-card" id="home-quote-card">
        <div class="quote-label">နေ့စဉ်စကားပုံ / Quote of the Day</div>
        <div class="quote-my" id="home-quote-my"></div>
        <div class="quote-en" id="home-quote-en"></div>
      </div>
      <button class="btn-primary" onclick="App.startPractice()">Start Practice</button>
      <button class="btn-ghost" onclick="App.showScreen('screen-progress')">View Progress</button>
      <div class="credit">by <?= htmlspecialchars($developer) ?></div>
    </div>
  </div>

  <!-- SCREEN: PRACTICE -->
  <div id="screen-practice" class="screen">
    <div class="practice-header">
      <button class="btn-back" onclick="App.showScreen('screen-home')">←</button>
      <div class="progress-bar-wrap"><div class="progress-bar" id="progress-bar"></div></div>
      <div class="streak-badge" id="streak-badge">🔥 <span id="current-streak">0</span></div>
    </div>

    <div class="practice-body">
      <div class="prompt-card">
        <div class="prompt-label">Write this character</div>
        <div class="prompt-char" id="prompt-char">က</div>
        <div class="prompt-roman" id="prompt-roman">ka</div>
      </div>

      <div class="canvas-wrap">
        <canvas id="draw-canvas" width="320" height="320"></canvas>
        <div class="canvas-guide">ဤနေရာတွင် ရေးပါ</div>
      </div>

      <div class="canvas-controls">
        <label class="pen-control">Pen
          <input id="pen-size" type="range" min="2" max="14" value="5" oninput="Drawing.setPenSize(this.value)" />
        </label>
        <button class="btn-clear" onclick="Drawing.undoLastStroke()">Undo</button>
        <button class="btn-clear" onclick="Drawing.clear()">Clear</button>
        <button class="btn-submit" onclick="App.submitDrawing()">Submit ↗</button>
      </div>
      <div class="data-note">Scoring runs through PHP and Python. It is still demo scoring, not real AI recognition.</div>
    </div>
  </div>

  <!-- SCREEN: RESULT -->
  <div id="screen-result" class="screen">
    <div class="result-header">
      <button class="btn-back" onclick="App.showScreen('screen-practice')">←</button>
    </div>
    <div class="result-body">
      <div class="result-char-compare">
        <div class="compare-box">
          <div class="compare-label">Your Writing</div>
          <canvas id="result-canvas" width="140" height="140"></canvas>
        </div>
        <div class="compare-box">
          <div class="compare-label">Target</div>
          <div class="compare-target" id="result-target">က</div>
        </div>
      </div>

      <div class="stars-row" id="stars-row"></div>
      <div class="score-label" id="score-label">Loading…</div>
      <div class="feedback-card" id="feedback-card"><div class="feedback-text" id="feedback-text"></div></div>

      <div class="word-card" id="word-card">
        <div class="word-title" id="word-title">Words using က</div>
        <div class="word-list" id="word-list"></div>
        <div class="sentence-box" id="sentence-box"></div>
      </div>

      <div class="quote-card" id="quote-card">
        <div class="quote-label">မြန်မာစကားပုံနှင့် အဆိုအမိန့်များ</div>
        <div class="quote-my" id="quote-my"></div>
        <div class="quote-en" id="quote-en"></div>
      </div>

      <div class="result-actions">
        <button class="btn-ghost" onclick="App.retryCurrentChar()">Try Again</button>
        <button class="btn-primary" onclick="App.nextChar()">Next →</button>
      </div>
      <div class="save-note" id="save-note"></div>
    </div>
  </div>

  <!-- SCREEN: PROGRESS -->
  <div id="screen-progress" class="screen">
    <div class="practice-header">
      <button class="btn-back" onclick="App.showScreen('screen-home')">←</button>
      <span class="screen-title">Progress</span>
      <button class="btn-ghost-sm" onclick="App.exportData()">Export Data</button>
    </div>
    <div class="progress-body">
      <div class="progress-summary">
        <div class="psumm-item"><div id="p-total">0</div><small>Total Attempts</small></div>
        <div class="psumm-item"><div id="p-avg">—</div><small>Avg Stars</small></div>
        <div class="psumm-item"><div id="p-best-streak">0</div><small>Best Streak</small></div>
      </div>
      <div class="char-grid" id="char-grid"></div>
      <div class="data-note">Attempts are saved in <code>data/attempts.json</code>. Export JSON for future ML training.</div>
    </div>
  </div>

  <div id="overlay-scoring" class="overlay hidden">
    <div class="overlay-inner">
      <div class="scoring-anim">မြန်မာ</div>
      <div class="scoring-text">Analyzing with Python demo scorer…</div>
    </div>
  </div>

  <script src="js/characters.js"></script>
  <script src="js/drawing.js"></script>
  <script src="js/storage.js"></script>
  <script src="js/wordExamples.js"></script>
  <script src="js/quotes.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
