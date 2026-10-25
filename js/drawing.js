const Drawing = (() => {
  let canvas, ctx, drawing = false;
  let hasStrokes = false;
  let strokes = [];
  let currentStroke = null;
  let startedAt = null;
  let penSize = 5;

  function init() {
    canvas = document.getElementById("draw-canvas");
    ctx = canvas.getContext("2d");
    clear();

    canvas.addEventListener("mousedown", e => start(pos(e)));
    canvas.addEventListener("mousemove", e => { if (drawing) move(pos(e)); });
    canvas.addEventListener("mouseup", stop);
    canvas.addEventListener("mouseleave", stop);

    canvas.addEventListener("touchstart", e => {
      e.preventDefault();
      start(pos(e.touches[0]));
    }, { passive: false });
    canvas.addEventListener("touchmove", e => {
      e.preventDefault();
      if (drawing) move(pos(e.touches[0]));
    }, { passive: false });
    canvas.addEventListener("touchend", stop);
  }

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - r.left) * (canvas.width / r.width)),
      y: Math.round((e.clientY - r.top) * (canvas.height / r.height)),
      t: Date.now(),
    };
  }

  function start(p) {
    drawing = true;
    hasStrokes = true;
    if (!startedAt) startedAt = Date.now();
    currentStroke = [p];
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function move(p) {
    currentStroke.push(p);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function stop() {
    if (drawing && currentStroke && currentStroke.length > 0) strokes.push(currentStroke);
    drawing = false;
    currentStroke = null;
  }

  function drawGuide() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(201,169,110,0.12)";
    ctx.lineWidth = 1;
    const mid = canvas.height / 2;
    [mid - 60, mid, mid + 60].forEach(y => {
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(canvas.width - 20, y); ctx.stroke();
    });
    ctx.strokeStyle = "rgba(201,169,110,0.06)";
    ctx.beginPath(); ctx.moveTo(canvas.width / 2, 20); ctx.lineTo(canvas.width / 2, canvas.height - 20); ctx.stroke();
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function redraw() {
    drawGuide();
    strokes.forEach(stroke => {
      if (!stroke.length) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach(p => { ctx.lineTo(p.x, p.y); ctx.stroke(); });
    });
  }

  function clear() {
    strokes = [];
    currentStroke = null;
    startedAt = null;
    hasStrokes = false;
    drawGuide();
  }

  function undoLastStroke() {
    strokes.pop();
    hasStrokes = strokes.length > 0;
    redraw();
  }

  function setPenSize(value) {
    penSize = Number(value) || 5;
    ctx.lineWidth = penSize;
  }

  function getImageBase64() {
    return canvas.toDataURL("image/png").split(",")[1];
  }

  function getMetadata() {
    return {
      strokeCount: strokes.length + (currentStroke ? 1 : 0),
      durationMs: startedAt ? Date.now() - startedAt : 0,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      penSize,
      strokes,
    };
  }

  function copyToCanvas(targetCanvas) {
    const tCtx = targetCanvas.getContext("2d");
    tCtx.drawImage(canvas, 0, 0, targetCanvas.width, targetCanvas.height);
  }

  function isEmpty() { return !hasStrokes; }

  return { init, clear, undoLastStroke, setPenSize, getImageBase64, getMetadata, copyToCanvas, isEmpty };
})();
