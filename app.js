const App = (() => {
  let currentIndex = 0;
  let shuffledChars = [];
  let lastResult = null;
  let currentStats = null;

  const SCORE_LABELS = ["", "Keep Trying", "Getting There", "Good Job!", "Great Work!", "Perfect!"];

  async function init() {
    Drawing.init();
    shuffledChars = shuffle([...CHARACTERS]);
    renderHomeQuote();
    buildCharGrid({ charStats: {} });
    await refreshStats();
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  async function refreshStats() {
    try {
      const response = await Storage.getStats();
      currentStats = response.stats || response;
      updateHomeStats(currentStats);
      updateProgress(currentStats);
      return currentStats;
    } catch (err) {
      console.error(err);
      showToast("Could not load PHP data store.");
      return null;
    }
  }

  async function showScreen(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    if (id === "screen-home") {
      renderHomeQuote();
      await refreshStats();
    }
    if (id === "screen-progress") await refreshStats();
  }

  function updateHomeStats(stats) {
    stats = stats || defaultStats();
    document.getElementById("stat-total").textContent = stats.totalAttempts || 0;
    document.getElementById("stat-streak").textContent = stats.bestStreak || 0;
    document.getElementById("stat-best").textContent = starsFromAverage(stats.averageStars);
  }

  function defaultStats() {
    return { attempts: [], charStats: {}, totalAttempts: 0, bestStreak: 0, streak: 0, averageStars: 0 };
  }

  function starsFromAverage(avg) {
    if (!avg) return "—";
    const rounded = Math.round(avg);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }

  function startPractice() {
    currentIndex = 0;
    shuffledChars = shuffle([...CHARACTERS]);
    showPrompt();
    showScreen("screen-practice");
  }

  function showPrompt() {
    const c = shuffledChars[currentIndex];
    document.getElementById("prompt-char").textContent = c.char;
    document.getElementById("prompt-roman").textContent = c.roman;
    document.getElementById("progress-bar").style.width = (((currentIndex + 1) / shuffledChars.length) * 100) + "%";
    document.getElementById("current-streak").textContent = currentStats?.streak || 0;
    Drawing.clear();
  }

  async function submitDrawing() {
    if (Drawing.isEmpty()) {
      showToast("Please write a character first!");
      return;
    }

    const c = shuffledChars[currentIndex];
    const imageBase64 = Drawing.getImageBase64();
    const metadata = Drawing.getMetadata();

    document.getElementById("overlay-scoring").classList.remove("hidden");

    try {
      const scoreResponse = await Storage.scoreAttempt({
        char: c.char,
        roman: c.roman,
        imageBase64,
        metadata,
      });

      const result = scoreResponse.result;
      const saveResponse = await Storage.recordAttempt({
        char: c.char,
        roman: c.roman,
        stars: result.stars,
        feedback: result.feedback,
        coverage: result.coverage,
        imageBase64,
        metadata,
      });

      currentStats = saveResponse.stats;
      lastResult = { ...result, char: c.char, roman: c.roman, imageBase64, metadata, stats: currentStats };
      showResult(lastResult);
      showScreen("screen-result");
    } catch (err) {
      console.error(err);
      showToast("PHP/Python scoring failed. Check server logs.");
    } finally {
      document.getElementById("overlay-scoring").classList.add("hidden");
    }
  }

  function showResult(r) {
    const rc = document.getElementById("result-canvas");
    Drawing.copyToCanvas(rc);
    document.getElementById("result-target").textContent = r.char;

    const starsRow = document.getElementById("stars-row");
    starsRow.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement("span");
      s.className = "star";
      s.textContent = i <= r.stars ? "★" : "☆";
      s.style.color = i <= r.stars ? "#c9a96e" : "#3a3050";
      s.style.animationDelay = (i * 0.1) + "s";
      if (i <= r.stars) s.classList.add("lit");
      starsRow.appendChild(s);
    }

    document.getElementById("score-label").textContent = SCORE_LABELS[r.stars] || "";
    document.getElementById("feedback-text").textContent = r.feedback;
    renderWordExamples(r.char);
    renderMyanmarQuote();
    document.getElementById("save-note").textContent =
      `✓ Saved to PHP JSON dataset · strokes: ${r.metadata.strokeCount} · duration: ${Math.round(r.metadata.durationMs / 1000)}s`;
    document.getElementById("current-streak").textContent = r.stats?.streak || 0;
  }

  function getDailyQuote() {
    if (!Array.isArray(MYANMAR_QUOTES) || MYANMAR_QUOTES.length === 0) return null;
    const today = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < today.length; i++) hash += today.charCodeAt(i);
    return MYANMAR_QUOTES[hash % MYANMAR_QUOTES.length];
  }

  function getRandomQuote() {
    if (!Array.isArray(MYANMAR_QUOTES) || MYANMAR_QUOTES.length === 0) return null;
    return MYANMAR_QUOTES[Math.floor(Math.random() * MYANMAR_QUOTES.length)];
  }

  function renderHomeQuote() {
    const quote = getDailyQuote();
    const my = document.getElementById("home-quote-my");
    const en = document.getElementById("home-quote-en");
    if (!quote || !my || !en) return;
    my.textContent = `“${quote.my}”`;
    en.textContent = quote.en;
  }

  function renderMyanmarQuote() {
    const quote = getRandomQuote();
    const my = document.getElementById("quote-my");
    const en = document.getElementById("quote-en");
    if (!quote || !my || !en) return;
    my.textContent = `“${quote.my}”`;
    en.textContent = quote.en;
  }

  function renderWordExamples(char) {
    const data = WORD_EXAMPLES[char];
    const wordCard = document.getElementById("word-card");
    const wordTitle = document.getElementById("word-title");
    const wordList = document.getElementById("word-list");
    const sentenceBox = document.getElementById("sentence-box");
    if (!wordCard || !wordTitle || !wordList || !sentenceBox) return;
    if (!data) { wordCard.style.display = "none"; return; }
    wordCard.style.display = "block";
    wordTitle.textContent = `${char} အသုံးပြုသော စကားလုံးများ`;
    wordList.innerHTML = "";
    sentenceBox.innerHTML = "";
    data.words.forEach(item => {
      const chip = document.createElement("div");
      chip.className = "word-chip";
      chip.innerHTML = `<div class="word-my"></div><div class="word-en"></div>`;
      chip.querySelector(".word-my").textContent = item.my;
      chip.querySelector(".word-en").textContent = item.en;
      wordList.appendChild(chip);
    });
    if (data.sentence) {
      sentenceBox.innerHTML = `<div class="sentence-my"></div><div class="sentence-en"></div>`;
      sentenceBox.querySelector(".sentence-my").textContent = data.sentence.my;
      sentenceBox.querySelector(".sentence-en").textContent = data.sentence.en;
    }
  }

  function retryCurrentChar() {
    Drawing.clear();
    showScreen("screen-practice");
  }

  function nextChar() {
    currentIndex = (currentIndex + 1) % shuffledChars.length;
    showPrompt();
    showScreen("screen-practice");
  }

  function buildCharGrid(stats = currentStats || defaultStats()) {
    const grid = document.getElementById("char-grid");
    if (!grid) return;
    grid.innerHTML = "";
    CHARACTERS.forEach(c => {
      const cell = document.createElement("div");
      cell.className = "char-cell";
      const cs = stats.charStats?.[c.char];
      if (cs) {
        const avg = cs.averageStars || (cs.totalStars / cs.attempts);
        cell.classList.add(avg >= 4 ? "mastered" : "attempted");
        const filled = Math.round(avg);
        cell.innerHTML = `<div class="cc-char">${c.char}</div><div class="cc-stars" style="color:#c9a96e">${"★".repeat(filled)}${"☆".repeat(5 - filled)}</div>`;
      } else {
        cell.innerHTML = `<div class="cc-char">${c.char}</div><div class="cc-stars" style="color:#3a3050">☆☆☆☆☆</div>`;
      }
      cell.onclick = () => {
        const idx = shuffledChars.findIndex(s => s.char === c.char);
        if (idx !== -1) currentIndex = idx;
        else { shuffledChars.unshift(c); currentIndex = 0; }
        showPrompt();
        showScreen("screen-practice");
      };
      grid.appendChild(cell);
    });
  }

  function updateProgress(stats = currentStats || defaultStats()) {
    const total = document.getElementById("p-total");
    if (!total) return;
    total.textContent = stats.totalAttempts || 0;
    document.getElementById("p-best-streak").textContent = stats.bestStreak || 0;
    document.getElementById("p-avg").textContent = stats.averageStars ? `${stats.averageStars.toFixed(1)} ★` : "—";
    buildCharGrid(stats);
  }

  function exportData() {
    Storage.exportJSON();
    showToast("Data exported from PHP JSON store.");
  }

  function showToast(msg) {
    let t = document.getElementById("toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast";
      t.style.cssText = `position:fixed; bottom:2rem; left:50%; transform:translateX(-50%); background:#1c1c28; border:1px solid rgba(201,169,110,0.3); color:#f0e6d3; padding:0.75rem 1.5rem; border-radius:2rem; font-size:0.85rem; z-index:9999; transition:opacity 0.3s; font-family:'Crimson Pro',serif; letter-spacing:0.05em; box-shadow:0 4px 20px rgba(0,0,0,0.5);`;
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1";
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = "0"; }, 2800);
  }

  return { init, showScreen, startPractice, submitDrawing, retryCurrentChar, nextChar, exportData };
})();

window.addEventListener("DOMContentLoaded", App.init);
