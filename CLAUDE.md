# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the course repository for the Udemy course **"Managing AI Agent Teams"**. It contains course project datasets, Claude Code skill definitions, and reference materials for teaching AI-assisted workflows.

## Repository Structure

- `.claude/skills/branding/SKILL.md` — A Claude Code skill guide for setting up brand identities and generating branded PPTX/CSS assets
- `COURSE_PROJECTS/MARKETING_DATASET/` — Synthetic 12-month (2024) UK marketing CSV dataset used for course exercises
- `CMD_CLAUDE.md` / `CMD_GENERALmd` — Command reference notes

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
