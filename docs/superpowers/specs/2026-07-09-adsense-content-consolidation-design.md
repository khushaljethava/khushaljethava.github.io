# AdSense Low-Value-Content Remediation — Design

**Date:** 2026-07-09
**Site:** khushaljethava.work (Jekyll + Chirpy, GitHub Pages)
**Goal:** Resolve AdSense "Low value content" policy rejection while building toward long-term traffic growth.

## Problem

AdSense rejected the site for **low value content** (thin content, minimum content requirements). Of 207 posts, ~130 are thin (<800 words) near-duplicate reference stubs — one post per Python built-in function or data-structure method. This drags average page quality below Google's publisher bar.

## Strategy

**Consolidate thin stubs into deep pillar guides, with safe redirects.** Not deletion — every old URL keeps its SEO value via `redirect_from`. Raises average page quality, reduces the count of thin pages Google judges, and creates rank-worthy pillar content.

Post count: **207 → ~75**. Total content value increases.

## Content Buckets (verified counts)

| Bucket | Posts | Destination |
|--------|-------|-------------|
| Built-in functions (abs, zip, map, …) | 53 | New pillar: *Python Built-in Functions Reference* |
| Dict methods (Page X — Dictionary) | 11 | Fold into *Python Dictionaries* guide |
| List methods (Page X — List) | 5 | Fold into *Python Lists* guide |
| Set methods | 15 | Fold into *Python Sets* guide |
| Tuple methods | 2 | Fold into *Python Tuples* guide |
| Basic tutorials (variables, loops, operators, functions, …) | ~40 | 3 pillars: *Python Basics*, *Python Data Structures*, *Python Control Flow* |
| AI/ML + project posts (strong content) | ~75 | Keep as-is; add cross-links |

## Technical Mechanics

### Redirects
- Add `jekyll-redirect-from` gem (GitHub Pages / Chirpy + Actions compatible).
- Register in `_config.yml` plugins list.
- Each pillar's front matter carries a `redirect_from:` list of every absorbed old URL.
- Old URL → pillar (anchor-linked to the exact method). Google treats as 301-equivalent; ranking signal transfers.

### Pillar page structure
- 1500–3000+ words; real examples, gotchas, comparison tables, "when to use" guidance.
- Anchor IDs per function/method (`#zip`, `#map`) so redirects land precisely.
- Cross-links to AI/ML posts where relevant.
- Front matter matches existing convention: `title`, `description`, `date`, `categories`, `tags`, `image`.

### File operations
- New pillars → `_posts/` with current dates.
- Deleted: the ~130 stub files (URLs survive via `redirect_from`).
- `jekyll-sitemap` regenerates the sitemap automatically.

## Rollout Order

1. **Phase 1** — Add redirect plugin; build *Built-in Functions* pillar (53→1); delete those stubs; verify redirects + local build.
2. **Phase 2** — Data-structure pillars: Dict/List/Set/Tuple methods (33 posts → 4 guides).
3. **Phase 3** — Basic-tutorial pillars (~40 → 3 guides).
4. **Phase 4** — Cross-link AI/ML posts; run `html-proofer` (already in Gemfile) to confirm no broken links.
5. **Then** — Tick "I confirm I have fixed the issues" → Request review in AdSense.

**Do not request review until all phases ship** — a partial fix risks a second rejection and slower re-approval.

## Success Criteria

- Site builds clean; `html-proofer` passes (no broken internal links).
- Every deleted URL resolves via redirect to its pillar + anchor.
- Post count ~75; each pillar ≥1500 words with genuine added value.
- AdSense review requested only after all four phases complete.

## Out of Scope

- No changes to the ~75 strong AI/ML and project posts beyond cross-linking.
- No unrelated theme/design refactors.
