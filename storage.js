const Storage = (() => {
  async function request(path, options = {}) {
    const response = await fetch(path, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) {
      throw new Error(data.error || `Request failed: ${response.status}`);
    }
    return data;
  }

  async function scoreAttempt(payload) {
    return request("api/score.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async function recordAttempt(payload) {
    return request("api/save_attempt.php", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async function getStats() {
    return request("api/stats.php");
  }

  function exportJSON() {
    window.location.href = "api/export.php";
  }

  return { scoreAttempt, recordAttempt, getStats, exportJSON };
})();
