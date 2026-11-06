# Gita Gyan data generator

Builds `_data/gita/chapters.json` and `_data/gita/chapter-N.json`, which `_layouts/gita-chapter.html` renders.

- Sanskrit text comes from the public-domain (Unlicense) [gita/gita](https://github.com/gita/gita) dataset (`data/verse.json`, `data/chapters.json`).
- IAST transliteration is generated from the Devanagari with `indic-transliteration`, so the two always match line for line.
- English meanings (`meanings.py`), scenes and gyan notes (`SECTIONS` in `build.py`) and per-verse particle effects (`fx.py`) are written for this site.

```bash
python3 -m venv .venv && .venv/bin/pip install indic-transliteration
mkdir -p /tmp/gita && for f in verse chapters; do gh api repos/gita/gita/contents/data/$f.json -H "Accept: application/vnd.github.raw" > /tmp/gita/$f.json; done
.venv/bin/python tools/gita/build.py /tmp/gita _data/gita
```

All 18 chapters are built. To change one: edit its meanings (`CHn` in `meanings.py`), its per-verse effects (`CHn_FX` in `fx.py`) or its scenes (`SECTIONS[n]` and `KEY_VERSES` in `build.py`); scene drawings live in `assets/js/gita-shapes.js`. The build asserts that every verse has a meaning and an effect and that scenes cover every verse exactly once.
