# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the course repository for the Udemy course **"Managing AI Agent Teams"**. It contains course project datasets, Claude Code skill definitions, and reference materials for teaching AI-assisted workflows.

## Repository Structure

- `.claude/skills/branding/SKILL.md` — A Claude Code skill guide for setting up brand identities and generating branded PPTX/CSS assets
- `01-WEBSITE/` — Single-page professional website for a fictional oncologist (course project)
- `COURSE_PROJECTS/MARKETING_DATASET/` — Synthetic 12-month (2024) UK marketing CSV dataset used for course exercises
- `CMD_CLAUDE.md` / `CMD_GENERALmd` — Command reference notes

## Course Projects

### 01-WEBSITE — Dr. Javed Khan Oncologist Site

`01-WEBSITE/index.html` is a self-contained single-page website (no build step, no dependencies) demonstrating professional web design with Claude Code.

**Style:** Matches the Anthropic/Claude Developer Platform docs aesthetic — dark default background (`#0d0d0d`), warm orange accent (`#e07b39`), card grids with 1px border separators, sticky nav.

**Key features:**
- Light/dark mode toggle (dark default) via CSS custom properties on `data-theme` attribute
- Fully responsive — grids reflow and nav collapses on mobile
- Sections: hero, stats bar, about, specialisms (6 cards), services (6 cards), experience timeline, publications list, contact (NHS + private), footer

**To open:** Open `01-WEBSITE/index.html` directly in a browser — no server required.

**Planned improvements** (see `01-WEBSITE/README.md` for full list):
- Replace emoji photo placeholder with a real headshot
- Add a contact/referral form (Formspree or Netlify Forms)
- Add `Physician` JSON-LD structured data for Google
- Appointment booking widget (Calendly embed)
- Mobile hamburger menu for hidden nav links

## Commands

This project has no build pipeline. The VS Code workspace is configured for Python with pytest:

```bash
# Run Python tests (if test files are created under /tests)
pytest tests/

# Generate a branded PPTX (requires Node.js)
npm install pptxgenjs
node <generated-script>.js
```

## Branding Skill — Key Conventions

When working on brand-related tasks, follow the conventions in `.claude/skills/branding/SKILL.md`:

- Place a `CLAUDE.md` at project root and a `brand/BRAND.md` with full brand specifications (colours, typography, logo paths, voice)
- Store brand assets under `brand/` — logos as both SVG and PNG (PNG required for PptxGenJS)
- Use **PptxGenJS** (Node.js) to generate `.pptx` files; slides use `LAYOUT_16x9` (10" × 5.625")
- CSS brand tokens go in a `variables.css` file using CSS custom properties (`--color-primary`, etc.)
- BRAND.md is the single source of truth — reference it from CLAUDE.md rather than duplicating values

## Marketing Dataset

Located in `COURSE_PROJECTS/MARKETING_DATASET/`. Five CSV files covering a synthetic UK business for 2024:

| File | Description |
|------|-------------|
| `site_traffic_daily.csv` | Daily sessions/users/conversions by channel |
| `seo_keywords.csv` | Monthly keyword rankings, impressions, CTR |
| `paid_campaigns.csv` | Google Ads / Meta / LinkedIn campaign metrics |
| `page_performance.csv` | Page-level metrics incl. Core Web Vitals (LCP, CLS, FID) |
| `audience_demographics.csv` | Segmentation by country, device, age, gender (~22k rows) |

## VS Code Workspace

The `.vscode/settings.json` enforces:
- Python strict type checking (Pylance) and Black formatting
- pytest as the test runner (target: `tests/` directory)
- 150-character line length, 4-space tabs, Consolas 18pt font
