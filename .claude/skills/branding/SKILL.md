# Brand Design Skill for Claude Code

A guide to setting up persistent brand instructions in Claude Code and using them to generate branded websites and PowerPoint presentations.

---

## How Claude Code Reads Brand Instructions

Claude Code automatically reads `CLAUDE.md` files at session start. There are two levels:

| File | Scope |
|---|---|
| `~/.claude/CLAUDE.md` | Global — applies to every project |
| `your-project/CLAUDE.md` | Project-level — overrides global |

Put agency-wide defaults globally, project-specific overrides locally.

---

## Recommended Folder Structure

```
your-project/
├── CLAUDE.md                  ← Claude Code reads this automatically
├── brand/
│   ├── BRAND.md               ← full brand spec (referenced from CLAUDE.md)
│   ├── logo-full.svg
│   ├── logo-icon.svg
│   ├── logo.png               ← PNG copy for PPTX embedding
│   └── fonts/
│       ├── Inter-Bold.ttf
│       └── Inter-Regular.ttf
├── wp-content/
│   └── themes/your-theme/
│       └── css/
│           └── variables.css  ← CSS custom properties from brand tokens
└── ...
```

---

## Step 1 — Create Your `CLAUDE.md`

Create `CLAUDE.md` in your project root. Be specific with exact values — treat it like a design token file written in plain English.

```markdown
# Project: Acme Marketing Agency

## Brand
See /brand/BRAND.md for full brand guidelines.
Always apply these rules when generating CSS, HTML, WordPress templates, or PPTX files.

## WordPress / PHP Conventions
- Theme: custom child of GeneratePress
- CSS variables: /wp-content/themes/acme-child/css/variables.css
- ACF field groups use prefix: `brand_*`
- PHP files follow PSR-12
```

---

## Step 2 — Create `/brand/BRAND.md`

```markdown
# Brand Guidelines

## Colours
| Token          | Hex     | Usage                        |
|----------------|---------|------------------------------|
| Primary        | #1A2E4A | Headings, nav, PPTX titles   |
| Secondary      | #F4A624 | CTAs, accents, highlight bar |
| Light          | #E8F0FE | Backgrounds, section fills   |
| Text           | #2D2D2D | Body copy                    |
| Background     | #FFFFFF | Page/slide background        |

## Typography
| Role      | Font          | Weight | Size (web) | Size (PPTX) |
|-----------|---------------|--------|------------|-------------|
| Heading 1 | Inter         | 700    | 2.5rem     | 36pt        |
| Heading 2 | Inter         | 600    | 2rem       | 28pt        |
| Body      | Inter         | 400    | 1rem       | 18pt        |
| Caption   | Inter         | 300    | 0.875rem   | 14pt        |

## Logo
- Full logo: /brand/logo-full.svg
- Icon only: /brand/logo-icon.svg
- PNG for PPTX: /brand/logo.png
- Clear space: equal to logo height on all sides
- Never recolour, stretch, or place on a busy background

## Voice & Tone
- Professional but approachable
- Active voice, short sentences
- Avoid jargon

## PPTX Slide Rules
- Layout: LAYOUT_16x9 (10" × 5.625")
- Title slide: Primary (#1A2E4A) background, white text, logo bottom-right
- Content slide: White background, Primary heading, Secondary accent bar at top
- Section divider: Secondary (#F4A624) background, Primary text
- Logo on every slide: bottom-right, 1.2" wide, 0.5" high, anchored to x:8.6 y:5.0
- Font face in PPTX: "Inter" (fallback "Calibri" if Inter unavailable)
```

---

## Step 3 — Generate a Branded PPTX in Claude Code

Claude Code uses **PptxGenJS** (via Node.js) to create `.pptx` files from scratch.

### Install PptxGenJS

```bash
npm install pptxgenjs
```

### Ask Claude Code to build a presentation

Simply prompt Claude Code with something like:

```
Create a 5-slide branded pitch deck about our SEO services.
Follow the brand rules in /brand/BRAND.md.
Use PptxGenJS and save to output/seo-pitch.pptx
```

Claude Code will generate a script like the one below and run it.

### What the generated script looks like

```javascript
const pptxgen = require("pptxgenjs");

// --- Brand tokens (from BRAND.md) ---
const BRAND = {
  navy:   "1A2E4A",
  amber:  "F4A624",
  light:  "E8F0FE",
  white:  "FFFFFF",
  text:   "2D2D2D",
  font:   "Inter",
};

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title  = "SEO Services Pitch";
pres.author = "Acme Marketing Agency";

// Helper — logo bottom-right on every slide
function addLogo(slide) {
  slide.addImage({ path: "./brand/logo.png", x: 8.6, y: 5.0, w: 1.2, h: 0.5 });
}

// --- Slide 1: Title ---
const s1 = pres.addSlide();
s1.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: "100%", fill: { color: BRAND.navy } });
s1.addText("SEO Services", {
  x: 0.8, y: 1.8, w: 8.5, h: 1.2,
  fontSize: 44, bold: true, color: BRAND.white, fontFace: BRAND.font,
});
s1.addText("Driving organic growth for ambitious brands", {
  x: 0.8, y: 3.1, w: 7, h: 0.8,
  fontSize: 20, color: BRAND.amber, fontFace: BRAND.font,
});
addLogo(s1);

// --- Slide 2: Content with accent bar ---
const s2 = pres.addSlide();
// Amber top accent bar
s2.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: "100%", h: 0.12, fill: { color: BRAND.amber } });
s2.addText("Our Approach", {
  x: 0.6, y: 0.3, w: 8.5, h: 0.9,
  fontSize: 28, bold: true, color: BRAND.navy, fontFace: BRAND.font,
});
s2.addText([
  { text: "Technical SEO audit & fixes\n", options: { bullet: true } },
  { text: "Keyword strategy & content planning\n", options: { bullet: true } },
  { text: "Link building & authority growth\n", options: { bullet: true } },
  { text: "Monthly reporting & iteration\n",    options: { bullet: true } },
], {
  x: 0.6, y: 1.4, w: 8.5, h: 3.5,
  fontSize: 18, color: BRAND.text, fontFace: BRAND.font, lineSpacingMultiple: 1.4,
});
addLogo(s2);

// --- Save ---
pres.writeFile({ fileName: "output/seo-pitch.pptx" })
    .then(() => console.log("Done: output/seo-pitch.pptx"));
```

---

## Step 4 — Generate Branded WordPress CSS

Once your `CLAUDE.md` and `BRAND.md` are in place, ask Claude Code:

```
Generate /wp-content/themes/acme-child/css/variables.css
using the brand tokens from /brand/BRAND.md
```

It will produce:

```css
/* Generated from /brand/BRAND.md — do not edit manually */
:root {
  --color-primary:    #1A2E4A;
  --color-secondary:  #F4A624;
  --color-light:      #E8F0FE;
  --color-text:       #2D2D2D;
  --color-bg:         #FFFFFF;

  --font-base:        'Inter', sans-serif;
  --font-size-base:   1rem;
  --font-size-h1:     2.5rem;
  --font-size-h2:     2rem;
  --font-size-caption: 0.875rem;

  --spacing-sm:  0.5rem;
  --spacing-md:  1rem;
  --spacing-lg:  2rem;
  --spacing-xl:  4rem;
}
```

---

## Quick Reference — Key Claude Code Prompts

| What you want | Prompt to use |
|---|---|
| Branded PPTX from scratch | `"Create a [N]-slide deck about [topic]. Follow /brand/BRAND.md. Save to output/[name].pptx"` |
| Branded CSS variables | `"Generate CSS custom properties from /brand/BRAND.md into /wp-content/themes/acme-child/css/variables.css"` |
| Apply branding to existing template | `"Edit [file.pptx] to match brand colours and fonts in /brand/BRAND.md"` |
| New WordPress page template | `"Create a PHP template for [page] using brand tokens from /brand/BRAND.md and our CSS variables"` |

---

## Tips

- **Be exact in BRAND.md.** Hex codes, point sizes, and file paths — no vague descriptions. Claude Code applies what it reads literally.
- **Logo must be PNG for PPTX.** SVG is not supported by PptxGenJS; keep a `/brand/logo.png` alongside your SVG.
- **Fonts in PPTX.** If a font isn't installed on the machine opening the file, PowerPoint will substitute. Embed or ship with a widely available fallback like `Calibri`.
- **Run the script, don't just generate it.** Tell Claude Code to both write and execute the Node script so you get the actual `.pptx` file back, not just code.
- **Version-control your BRAND.md.** Treat it like source code — it is the single source of truth for every generated asset.
