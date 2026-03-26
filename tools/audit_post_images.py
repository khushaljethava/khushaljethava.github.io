"""Audit post front matter image paths vs files in commons/."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def extract_commons_paths(fm: str) -> list[str]:
    fm = fm.replace("\r\n", "\n").replace("\r", "\n")
    out: list[str] = []
    out += [m.group(1).strip() for m in re.finditer(r'path:\s*"([^"]+)"', fm)]
    out += [m.group(1).strip() for m in re.finditer(r"path:\s*'([^']+)'", fm)]

    def unquoted(match: re.Match[str]) -> str:
        raw = match.group(1).strip()
        if raw.endswith('"') or raw.startswith("'"):
            return ""
        return raw.split("#", 1)[0].strip()

    for m in re.finditer(r"^\s*path:\s+(/commons/.+)$", fm, re.MULTILINE):
        s = unquoted(m)
        if s:
            out.append(s)
    return out


def main() -> int:
    posts = ROOT / "_posts"
    commons = ROOT / "commons"
    existing = {f.name for f in commons.iterdir() if f.is_file()}
    missing: list[tuple[str, str]] = []
    refstyle_no_def: list[str] = []

    for p in sorted(posts.glob("*.md")):
        text = p.read_text(encoding="utf-8", errors="replace")
        if not text.startswith("---"):
            continue
        parts = text.split("---", 2)
        if len(parts) < 3:
            continue
        fm, body = parts[1], parts[2]
        for full in extract_commons_paths(fm):
            if not full.startswith("/commons/"):
                continue
            fn = full.rsplit("/", 1)[-1]
            if fn not in existing:
                missing.append((p.name, full))
        refs = set(re.findall(r"!\[\]\[(image\d+)\]", body))
        if refs:
            undef = [lab for lab in sorted(refs) if f"[{lab}]:" not in body]
            if undef:
                refstyle_no_def.append((p.name, undef))

    print("Front matter /commons/ paths with no matching file in commons/:", len(missing))
    for name, full in missing:
        print(f"  {name} -> {full}")

    print("\nPosts with ![][imageN] but missing [imageN]: definitions:", len(refstyle_no_def))
    for name, undef in sorted(refstyle_no_def):
        print(f"  {name} -> {undef}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
