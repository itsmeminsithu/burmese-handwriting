#!/usr/bin/env python3
"""Demo Burmese handwriting scorer.

This is NOT a real AI handwriting evaluator. It uses simple PNG ink-coverage
heuristics so the PHP app can collect usable practice/dataset records.
"""
from __future__ import annotations

import argparse
import json
import random
import struct
import zlib
from pathlib import Path

FEEDBACK = {
    1: [
        "Keep trying! Burmese script takes time to learn. Try again slowly.",
        "Don't give up! Look at the target character carefully and try once more.",
        "Every expert was once a beginner. Study the shape and try again!",
    ],
    2: [
        "Getting closer! The basic shape is there but needs more practice.",
        "You can see the character forming — keep working on the curves.",
        "Good attempt! Focus on the proportions and try once more.",
    ],
    3: [
        "Not bad! The character is recognizable. Work on making the strokes smoother.",
        "Decent effort! A bit more practice and you will nail it.",
        "You are on the right track. Pay attention to the loop size.",
    ],
    4: [
        "Great writing! Just a few minor details to refine.",
        "Very good! Your strokes are confident. Almost perfect.",
        "Impressive! Small improvements to the curves will make it perfect.",
    ],
    5: [
        "Perfect! Your handwriting is excellent. Move to the next character!",
        "Outstanding! Beautiful form and stroke balance.",
        "Excellent work! A native speaker would be proud of this writing.",
    ],
}


def _paeth(a: int, b: int, c: int) -> int:
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    if pa <= pb and pa <= pc:
        return a
    if pb <= pc:
        return b
    return c


def read_png_rgba(path: Path) -> tuple[int, int, bytes]:
    data = path.read_bytes()
    if not data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("Input is not a PNG file")

    pos = 8
    width = height = bit_depth = color_type = None
    compressed = bytearray()

    while pos < len(data):
        length = struct.unpack(">I", data[pos:pos+4])[0]
        chunk_type = data[pos+4:pos+8]
        chunk_data = data[pos+8:pos+8+length]
        pos += 12 + length
        if chunk_type == b"IHDR":
            width, height, bit_depth, color_type, *_ = struct.unpack(">IIBBBBB", chunk_data)
        elif chunk_type == b"IDAT":
            compressed.extend(chunk_data)
        elif chunk_type == b"IEND":
            break

    if width is None or height is None or bit_depth != 8 or color_type not in (2, 6):
        raise ValueError("Only 8-bit RGB/RGBA PNG images are supported")

    channels = 4 if color_type == 6 else 3
    stride = width * channels
    raw = zlib.decompress(bytes(compressed))
    rows: list[bytearray] = []
    offset = 0

    for _ in range(height):
        filter_type = raw[offset]
        offset += 1
        scanline = bytearray(raw[offset:offset+stride])
        offset += stride
        prev = rows[-1] if rows else bytearray(stride)
        recon = bytearray(stride)
        for i, value in enumerate(scanline):
            left = recon[i - channels] if i >= channels else 0
            up = prev[i]
            upper_left = prev[i - channels] if i >= channels else 0
            if filter_type == 0:
                recon[i] = value
            elif filter_type == 1:
                recon[i] = (value + left) & 0xFF
            elif filter_type == 2:
                recon[i] = (value + up) & 0xFF
            elif filter_type == 3:
                recon[i] = (value + ((left + up) // 2)) & 0xFF
            elif filter_type == 4:
                recon[i] = (value + _paeth(left, up, upper_left)) & 0xFF
            else:
                raise ValueError(f"Unsupported PNG filter {filter_type}")
        rows.append(recon)

    pixels = bytearray()
    for row in rows:
        if channels == 4:
            pixels.extend(row)
        else:
            for i in range(0, len(row), 3):
                pixels.extend(row[i:i+3] + b"\xff")
    return width, height, bytes(pixels)


def analyze_coverage(path: Path) -> float:
    width, height, pixels = read_png_rgba(path)
    dark = 0
    total = width * height
    for i in range(0, len(pixels), 4):
        r, g, b, a = pixels[i], pixels[i+1], pixels[i+2], pixels[i+3]
        if a > 0 and (r < 200 or g < 200 or b < 200):
            dark += 1
    return dark / total if total else 0.0


def stars_from_features(coverage: float, stroke_count: int, duration_ms: int) -> int:
    if coverage < 0.01:
        stars = 1
    elif coverage < 0.03:
        stars = 2
    elif coverage < 0.07:
        stars = 3
    elif coverage < 0.15:
        stars = 4
    else:
        stars = 3

    if stroke_count >= 1:
        stars += 1 if 2 <= stroke_count <= 8 else 0
    if duration_ms and duration_ms < 500:
        stars -= 1
    if duration_ms and duration_ms > 60000:
        stars -= 1
    return max(1, min(5, stars))


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--image", required=True)
    parser.add_argument("--char", required=True)
    parser.add_argument("--roman", default="")
    parser.add_argument("--stroke-count", type=int, default=0)
    parser.add_argument("--duration-ms", type=int, default=0)
    args = parser.parse_args()

    coverage = analyze_coverage(Path(args.image))
    stars = stars_from_features(coverage, args.stroke_count, args.duration_ms)
    print(json.dumps({
        "mode": "demo-python-coverage-scorer",
        "isAiEvaluator": False,
        "char": args.char,
        "roman": args.roman,
        "coverage": round(coverage, 6),
        "stars": stars,
        "feedback": random.choice(FEEDBACK[stars]),
    }, ensure_ascii=False))


if __name__ == "__main__":
    main()
