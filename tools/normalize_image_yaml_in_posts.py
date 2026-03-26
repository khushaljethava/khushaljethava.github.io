"""Normalize `path:` / `alt:` indentation under `image:` in post front matter."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS = ROOT / "_posts"


def normalize_fm(fm: str) -> str:
    fm = fm.replace("\r\n", "\n").replace("\r", "\n")
    fm = re.sub(r"\n +path:", "\n  path:", fm)
    fm = re.sub(r"\n +alt:", "\n  alt:", fm)
    fm = re.sub(r"\n +lqip:", "\n  lqip:", fm)
    return fm


def main() -> int:
    n = 0
    for p in sorted(POSTS.glob("*.md")):
        text = p.read_text(encoding="utf-8", errors="strict")
        if not text.startswith("---"):
            continue
        parts = text.split("---", 2)
        if len(parts) < 3:
            continue
        fm, rest = parts[1], parts[2]
        new_fm = normalize_fm(fm)
        if new_fm != fm:
            p.write_text(f"---{new_fm}---{rest}", encoding="utf-8", newline="\n")
            n += 1
    print(f"Updated front matter in {n} posts")
    return 0


if __name__ == "__main__":
    sys.exit(main())
