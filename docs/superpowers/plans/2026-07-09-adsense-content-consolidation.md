# AdSense Content Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Consolidate ~130 thin Python-reference stub posts into ~8 deep pillar guides with URL-preserving redirects, resolving the AdSense "Low value content" rejection.

**Architecture:** Add the `jekyll-redirect-from` plugin. For each bucket of thin stubs, write one comprehensive pillar post whose front matter lists every absorbed old URL under `redirect_from:`, then delete the stubs. Old URLs 301 to the pillar (anchored to the exact function). Strong AI/ML posts are untouched except for cross-links.

**Tech Stack:** Jekyll, Chirpy theme, GitHub Pages (Actions build), `jekyll-redirect-from`, `jekyll-sitemap`, `html-proofer`, Ruby/Bundler.

## Global Constraints

- Permalink structure is `/posts/:title/` — do NOT change it.
- Site URL: `https://khushaljethava.work`, `baseurl: ""`.
- Every pillar post front matter uses the existing convention: `title`, `description`, `date`, `categories`, `tags`, `image: { path, alt }`.
- Each pillar ≥1500 words with genuine added value (examples, gotchas, comparison tables, "when to use").
- Every deleted stub URL MUST appear in exactly one pillar's `redirect_from:` list.
- Do NOT request the AdSense review until all tasks (through Task 8) are complete.
- Do NOT modify the ~75 strong AI/ML and project posts except to add cross-links (Task 7).
- Commit after each task.

---

## Pre-flight: capture the ground-truth URL list

Before deleting anything, build the site and extract the real slugified URLs so `redirect_from` values are exact (not guessed).

### Task 0: Baseline build + URL inventory

**Files:**
- Create: `docs/superpowers/urls-baseline.txt` (commit it)

- [ ] **Step 1: Install deps and build**

Run:
```bash
cd /home/khushal/raw_codes/khushaljethava.github.io
bundle install
bundle exec jekyll build
```
Expected: build completes, `_site/` populated, no fatal errors.

- [ ] **Step 2: Extract all post URLs from the sitemap**

Run:
```bash
grep -oE '/posts/[^<]+' _site/sitemap.xml | sort > docs/superpowers/urls-baseline.txt
wc -l docs/superpowers/urls-baseline.txt
```
Expected: ~207 URLs listed. This is the authoritative slug map.

- [ ] **Step 3: Commit the baseline**

```bash
git add docs/superpowers/urls-baseline.txt Gemfile.lock
git commit -m "chore: baseline URL inventory before consolidation"
```

---

### Task 1: Add jekyll-redirect-from plugin

**Files:**
- Modify: `Gemfile`
- Modify: `_config.yml` (plugins list)

**Interfaces:**
- Produces: working `redirect_from:` front-matter support for all later tasks.

- [ ] **Step 1: Add the gem**

In `Gemfile`, after the `jekyll-sitemap` line, add:
```ruby
gem "jekyll-redirect-from", "~> 0.16"
```

- [ ] **Step 2: Register the plugin**

In `_config.yml`, under `plugins:`, add the entry so it reads:
```yaml
plugins:
  - jekyll-sitemap
  - jekyll-redirect-from
```

- [ ] **Step 3: Install and verify build**

Run:
```bash
bundle install
bundle exec jekyll build 2>&1 | tail -5
```
Expected: build succeeds, no "unknown tag" or plugin errors.

- [ ] **Step 4: Smoke-test a redirect**

Temporarily add `redirect_from: [/posts/__redirect-smoke-test/]` to any one existing post's front matter, rebuild, then:
```bash
bundle exec jekyll build && test -f "_site/posts/__redirect-smoke-test/index.html" && echo "REDIRECT OK"
```
Expected: `REDIRECT OK`. Then remove the temporary line and rebuild.

- [ ] **Step 5: Commit**

```bash
git add Gemfile Gemfile.lock _config.yml
git commit -m "feat: add jekyll-redirect-from for URL-preserving consolidation"
```

---

### Task 2: Built-in Functions pillar (53 stubs → 1 guide)

**Files:**
- Create: `_posts/2026-07-09-python-built-in-functions-reference.md`
- Delete: the 53 `Page N - Python <func>()` stub files that are NOT Dictionary/List (those go to Tasks 3–4)
- Test: local build + redirect check

**Interfaces:**
- Consumes: `redirect_from` support (Task 1), URL baseline (Task 0).
- Produces: pillar URL `/posts/python-built-in-functions-reference/` with anchors `#<func>` per function.

- [ ] **Step 1: List the exact stub files and their URLs**

Run:
```bash
cd /home/khushal/raw_codes/khushaljethava.github.io
ls _posts | grep -iE "Page [0-9]+ - Python" | grep -viE "Dictionary|List"
grep -iE '/posts/python-(abs|all|any|ascii|bin|bool|bytearray|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|exec|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|import)' docs/superpowers/urls-baseline.txt
```
Expected: ~53 filenames and their matching `/posts/...` URLs. Record the URL list — it becomes `redirect_from`.

- [ ] **Step 2: Write the pillar post**

Create `_posts/2026-07-09-python-built-in-functions-reference.md`. Front matter:
```yaml
---
title: "Python Built-in Functions: The Complete Reference Guide"
description: "Every Python built-in function explained with examples, gotchas, and when to use each — abs, zip, map, enumerate, sorted, and 50+ more."
date: 2026-07-09 10:00:00 +0530
categories: [Python]
tags: [python, built-in-functions, reference]
image:
  path: /commons/Python Built-in Functions.webp
  alt: "Python built-in functions complete reference"
redirect_from:
  # paste every /posts/python-<func>/ URL from Step 1 here, one per line as a list item
---
```
Body requirements (≥1500 words):
- Intro: what "built-in" means, the `builtins` module, grouped by purpose (numeric, iterables, type conversion, introspection, I/O).
- One `## <func>()` section per function with an anchor, signature, a runnable example, output, and one gotcha or "when to use" note.
- A summary comparison table grouping functions by category.
- 2–3 cross-links to relevant AI/ML posts where a built-in is used in practice (e.g. `enumerate`/`zip` in data loops).

Anchor syntax for Chirpy/kramdown headings — the anchor slug MUST match the tail of the old URL so redirects land precisely (old `/posts/python-zip/` → pillar `#python-zip`):
```markdown
## zip()
{: #python-zip }
```

- [ ] **Step 3: Delete the 53 stubs**

Run (uses the Step 1 file list — review it first, then):
```bash
ls _posts | grep -iE "Page [0-9]+ - Python" | grep -viE "Dictionary|List" | while read f; do git rm "_posts/$f"; done
```
Expected: 53 files staged for deletion.

- [ ] **Step 4: Build and verify redirects resolve**

Run:
```bash
bundle exec jekyll build 2>&1 | tail -3
for u in python-zip python-map python-enumerate; do
  test -f "_site/posts/$u/index.html" && echo "$u OK" || echo "$u MISSING";
done
```
Expected: all three `OK` (redirect stub HTML generated).

- [ ] **Step 5: Commit**

```bash
git add _posts/2026-07-09-python-built-in-functions-reference.md
git commit -m "feat: consolidate 53 built-in function stubs into pillar guide with redirects"
```

---

### Task 3: Python Dictionaries pillar (11 dict-method stubs → 1 guide)

**Files:**
- Create: `_posts/2026-07-09-python-dictionaries-complete-guide.md`
- Delete: 11 `Page N - Python Dictionary <method>()` stubs
- Delete/merge: existing `Python-Dictionary.md` intro post (fold its content in, redirect it too)

**Interfaces:**
- Produces: `/posts/python-dictionaries-complete-guide/` with `#<method>` anchors.

- [ ] **Step 1: List stubs + URLs**

Run:
```bash
ls _posts | grep -iE "Page [0-9]+ - Python Dictionary"
grep -iE '/posts/python-dictionary' docs/superpowers/urls-baseline.txt
```
Expected: 11 method stubs + the `Python-Dictionary` intro URL.

- [ ] **Step 2: Write the pillar** (≥1500 words)

Create the file with standard front matter (title "Python Dictionaries: Complete Guide with All Methods", `categories: [Python]`, `tags: [python, dictionary, data-structures]`, image path `/commons/Python Dictionary.webp`). Include `redirect_from:` with all 12 URLs from Step 1.
Body: dict fundamentals (creation, access, mutation), then one `## dict.<method>()` section per method (`clear`, `copy`, `fromkeys`, `get`, `items`, `keys`, `pop`, `popitem`, `setdefault`, `update`, `values`) each with anchor matching old URL tail, example, output, gotcha. Add a methods comparison table and cross-links.

- [ ] **Step 3: Delete stubs**

```bash
ls _posts | grep -iE "Page [0-9]+ - Python Dictionary" | while read f; do git rm "_posts/$f"; done
ls _posts | grep -i "Python-Dictionary.md"   # confirm intro filename, then git rm it
```

- [ ] **Step 4: Build + verify**

```bash
bundle exec jekyll build 2>&1 | tail -3
for u in python-dictionary-clear python-dictionary-get python-dictionary-update; do
  test -f "_site/posts/$u/index.html" && echo "$u OK" || echo "$u CHECK-SLUG";
done
```
If any print `CHECK-SLUG`, look up the true slug in `urls-baseline.txt` and fix that `redirect_from` entry.

- [ ] **Step 5: Commit**

```bash
git add -A _posts/
git commit -m "feat: consolidate dictionary methods into pillar guide with redirects"
```

---

### Task 4: Python Lists pillar (5 list-method stubs → 1 guide)

**Files:**
- Create: `_posts/2026-07-09-python-lists-complete-guide.md`
- Delete: 5 `Page N - Python List <method>()` stubs + existing `Python-List.md` intro (fold + redirect)

- [ ] **Step 1: List stubs + URLs**

```bash
ls _posts | grep -iE "Page [0-9]+ - Python List"
grep -iE '/posts/python-list' docs/superpowers/urls-baseline.txt
```

- [ ] **Step 2: Write pillar** (≥1500 words)

Front matter title "Python Lists: Complete Guide with All Methods", `tags: [python, list, data-structures]`, image `/commons/Python List.webp`, `redirect_from:` with all list URLs. Body: list fundamentals + `## list.<method>()` sections (`append`, `clear`, `copy`, `extend`, `insert`, and cover `remove`/`pop`/`sort`/`reverse`/`index`/`count` for completeness), anchors matching old URLs, examples, gotchas, comparison table, cross-links.

- [ ] **Step 3: Delete stubs**

```bash
ls _posts | grep -iE "Page [0-9]+ - Python List" | while read f; do git rm "_posts/$f"; done
ls _posts | grep -i "Python-List.md"   # then git rm the intro post
```

- [ ] **Step 4: Build + verify**

```bash
bundle exec jekyll build 2>&1 | tail -3
for u in python-list-append python-list-extend python-list-insert; do
  test -f "_site/posts/$u/index.html" && echo "$u OK" || echo "$u CHECK-SLUG"; done
```

- [ ] **Step 5: Commit**

```bash
git add -A _posts/
git commit -m "feat: consolidate list methods into pillar guide with redirects"
```

---

### Task 5: Python Sets pillar (15 set-method stubs → 1 guide)

**Files:**
- Create: `_posts/2026-07-09-python-sets-complete-guide.md`
- Delete: 15 set-method stubs + existing `Python-Set.md` intro

- [ ] **Step 1: List stubs + URLs**

```bash
ls _posts | grep -iE "set (clear|copy|difference|discard|intersection|isdisjoint|issubset|issuperset|pop|remove|symmetric|union|update|add)"
grep -iE '/posts/python-set' docs/superpowers/urls-baseline.txt
```
Expected: 15 method stubs + intro. Record exact URLs (slugs like `python-set-union`, `python-set-difference-update`).

- [ ] **Step 2: Write pillar** (≥1500 words)

Title "Python Sets: Complete Guide with All Methods", `tags: [python, set, data-structures]`, image `/commons/Python Set.webp`. `redirect_from:` with all 16 URLs. Body: set fundamentals + `## set.<method>()` per method with anchors matching old URL tails, examples, output, the mutating-vs-returning distinction (e.g. `difference` vs `difference_update`), comparison table, cross-links.

- [ ] **Step 3: Delete stubs**

```bash
ls _posts | grep -iE "set (clear|copy|difference|discard|intersection|isdisjoint|issubset|issuperset|pop|remove|symmetric|union|update|add)" | while read f; do git rm "_posts/$f"; done
ls _posts | grep -i "Python-Set.md"   # then git rm intro
```

- [ ] **Step 4: Build + verify**

```bash
bundle exec jekyll build 2>&1 | tail -3
for u in python-set-union python-set-difference python-set-pop; do
  test -f "_site/posts/$u/index.html" && echo "$u OK" || echo "$u CHECK-SLUG"; done
```

- [ ] **Step 5: Commit**

```bash
git add -A _posts/
git commit -m "feat: consolidate set methods into pillar guide with redirects"
```

---

### Task 6: Python Tuples + Basics/Control-Flow pillars

Consolidates the 2 tuple-method stubs and the ~40 basic-tutorial stubs into three pillars: **Python Tuples**, **Python Basics** (syntax, variables, comments, operators, data types, type conversion, input/output, print, keywords, docstrings, strings), **Python Control Flow** (conditionals, for loop, while loop, break/continue, pass, functions, lambda, recursion, range).

**Files:**
- Create: `_posts/2026-07-09-python-tuples-complete-guide.md`
- Create: `_posts/2026-07-09-python-basics-complete-guide.md`
- Create: `_posts/2026-07-09-python-control-flow-complete-guide.md`
- Delete: the corresponding stub posts

- [ ] **Step 1: Inventory each group's files + URLs**

```bash
ls _posts | grep -iE "Tuple (count|index)|Python-Tuple.md"
grep -iE '/posts/(python-tuple|tuple-)' docs/superpowers/urls-baseline.txt
# Basics group
ls _posts | grep -iE "Basic-Syntax|Python-Variables|Python-Comments|Python-Operators|Data-Types|Type-Conversion|Input-and-Output|print-function|Keywords-and-Identifiers|Docstrings|Python-String"
# Control-flow group
ls _posts | grep -iE "Conditional|For-Loop|While-loop|Break-and-continue|pass-statement|Python-Function|Lambda|Recursion|Python-Range"
```
Cross-reference each filename to its URL in `urls-baseline.txt`. Record three URL lists (one per pillar).

- [ ] **Step 2: Write the three pillars** (each ≥1500 words)

Each with standard front matter and a `redirect_from:` list of its group's URLs. Use `## <topic>` sections with anchors matching old URL tails. Tuples pillar covers creation, immutability, `count`, `index`, unpacking, named tuples. Basics pillar covers syntax→strings as a learning path. Control-flow pillar covers conditionals→functions→recursion. Comparison tables and cross-links in each.

- [ ] **Step 3: Delete stubs** (only files confirmed in Step 1 lists)

```bash
# Example for tuples; repeat pattern for basics and control-flow lists
ls _posts | grep -iE "Tuple (count|index)" | while read f; do git rm "_posts/$f"; done
# git rm each basics + control-flow stub confirmed in Step 1
```

- [ ] **Step 4: Build + verify** a sample redirect from each pillar resolves

```bash
bundle exec jekyll build 2>&1 | tail -3
for u in tuple-count-method python-for-loop python-variables; do
  test -f "_site/posts/$u/index.html" && echo "$u OK" || echo "$u CHECK-SLUG"; done
```

- [ ] **Step 5: Commit**

```bash
git add -A _posts/
git commit -m "feat: consolidate tuples, basics, and control-flow stubs into pillar guides"
```

---

### Task 7: Cross-link strong posts + navigation

**Files:**
- Modify: select AI/ML pillar-relevant posts to link into the new Python pillars (and vice-versa)

- [ ] **Step 1: Add cross-links**

In each of the 8 new pillars, ensure 2–3 contextual links to strong AI/ML posts already exist (added during authoring). Add reciprocal links from 3–4 high-traffic AI/ML posts back to the relevant pillar (e.g. a data-loop mention → Built-in Functions `#python-enumerate`). Keep links contextual, not a link dump.

- [ ] **Step 2: Commit**

```bash
git add -A _posts/
git commit -m "feat: add contextual cross-links between pillars and AI/ML posts"
```

---

### Task 8: Full verification gate

**Files:**
- None (verification only)

- [ ] **Step 1: Clean build**

```bash
bundle exec jekyll build 2>&1 | tail -5
```
Expected: no errors/warnings about missing pages.

- [ ] **Step 2: Broken-link check**

```bash
bundle exec htmlproofer _site --disable-external --allow-hash-href 2>&1 | tail -20
```
Expected: passes (no broken internal links / anchors). Fix any broken `#anchor` that a `redirect_from` points to.

- [ ] **Step 3: Verify every deleted URL still resolves**

```bash
cd /home/khushal/raw_codes/khushaljethava.github.io
missing=0
while read u; do
  p="_site${u%/}/index.html"
  [ -f "$p" ] || { echo "MISSING: $u"; missing=$((missing+1)); }
done < docs/superpowers/urls-baseline.txt
echo "missing=$missing"
```
Expected: `missing=0`. Every baseline URL either still a post or a generated redirect. Any `MISSING` → add that URL to the correct pillar's `redirect_from` and rebuild.

- [ ] **Step 4: Confirm post-count reduction**

```bash
ls _posts | wc -l
```
Expected: ~75 (down from 207).

- [ ] **Step 5: Commit any fixes + push**

```bash
git add -A
git commit -m "fix: resolve remaining redirect/anchor gaps from verification" || echo "nothing to fix"
git push
```

- [ ] **Step 6: Request AdSense review**

Only now: in AdSense, tick "I confirm I have fixed the issues" → **Request review**. (Manual step for the site owner.)

---

## Notes for the implementer

- The `redirect_from` slugs are the single most error-prone part. Always derive them from `docs/superpowers/urls-baseline.txt`, never guess. Task 8 Step 3 is the safety net that catches any missed URL.
- Chirpy slugifies titles by lowercasing, replacing spaces with hyphens, and stripping `()` — but verify against the baseline rather than trusting this rule.
- Pillar word counts and quality are what actually satisfy Google; do not write filler to hit 1500 words — write genuinely useful reference material.
