#!/usr/bin/env python3
"""Print a quick summary of data/attempts.json for research planning."""
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "attempts.json"


def main() -> None:
    if not DATA_FILE.exists():
        print("No dataset found yet.")
        return
    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    attempts = data.get("attempts", [])
    by_char = defaultdict(list)
    for item in attempts:
        by_char[item.get("char", "?")].append(int(item.get("stars", 0)))
    print(f"Total attempts: {len(attempts)}")
    print(f"Characters practiced: {len(by_char)}")
    for char, scores in sorted(by_char.items()):
        avg = sum(scores) / len(scores) if scores else 0
        print(f"{char}: {len(scores)} samples, avg {avg:.2f} stars")


if __name__ == "__main__":
    main()
