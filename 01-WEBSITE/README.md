# 01-WEBSITE — Dr. Javed Khan, Consultant Oncologist

A single-page professional website for a fictional oncologist, built to match the visual style of the Anthropic/Claude Developer Platform documentation site.

---

## What Was Built

**File:** `index.html` (self-contained — no dependencies, no build step)

### Style Reference
The design mirrors the Claude Docs aesthetic from `screenshot.png`:
- Dark `#0d0d0d` default background with warm orange `#e07b39` accent colour
- Card grids separated by 1px borders on a slightly lighter card background
- Sticky top navigation bar with brand name, section links, and CTA button
- Clean sans-serif typography with muted secondary text and uppercase section labels

### Sections
| Section | Description |
|---|---|
| **Navigation** | Sticky nav with smooth-scroll links, theme toggle, and "Book Appointment" button |
| **Hero** | Name, credentials (MBBS MD FRCP FRCR PhD), specialty tags, bio summary, action buttons |
| **Stats bar** | 5 headline figures — years experience, patients treated, publications, trials, funding |
| **About** | Photo placeholder, biographical text, GMC number, fellowship memberships |
| **Specialisms** | 6-card grid — lung cancer, haematological malignancies, breast cancer, precision oncology, immunotherapy, early-phase trials |
| **Services** | 6-card grid — new patient consultation, second opinion, biomarker testing, MDT coordination, remote follow-up, palliative care |
| **Experience** | Vertical timeline from undergraduate (1996) to current consultant post (2014–present) |
| **Publications** | 6 formatted entries with dummy authors, journals, years, and DOIs |
| **Contact** | NHS clinic details, private practice details, clinic hours, medical secretary, insurer list |
| **Footer** | Disclaimer, privacy/GMC links |

### Features
- **Light/dark mode** — dark is the default; toggles instantly via CSS custom properties
- **Fully responsive** — nav collapses, grids reflow, and about/contact sections stack on mobile
- **Zero dependencies** — plain HTML, CSS, and ~10 lines of vanilla JS; opens directly in a browser

---

## Possible Improvements & Additions

### Content
- Replace the `👨‍⚕️` emoji placeholder with a real headshot photo
- Add a **Patient Testimonials** section with quote cards
- Add a **Referral Form** section (downloadable PDF link or embedded form)
- Expand publications to include a **full list page** or filter by year/topic
- Add a **Media & Press** section for interviews, podcasts, or news appearances

### Functionality
- **Contact form** — name, email, message, and reason for enquiry fields (requires a backend or a service like Formspree/Netlify Forms)
- **Appointment booking widget** — embed a scheduling tool (Calendly, Acuity, etc.)
- **Cookie consent banner** — required for UK/EU compliance if analytics are added
- **Search** — for the publications list once it grows

### Design & UX
- Add a subtle **hero background pattern** (grid, dots, or gradient) to match the Claude docs hero more closely
- Animate cards on scroll using the Intersection Observer API
- Add a **"Back to top"** floating button
- Improve the mobile nav with a hamburger menu revealing the hidden links

### Technical
- Extract CSS into a separate `style.css` file and JS into `main.js` for maintainability
- Add `<meta>` Open Graph and Twitter card tags for social sharing previews
- Add structured data (`application/ld+json`) for `Physician` schema — improves Google search appearance
- Set up a simple `netlify.toml` or GitHub Pages config to deploy the site live
- Add Google Analytics or Plausible for visitor tracking (with cookie consent)
