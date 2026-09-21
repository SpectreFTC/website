# Team Spectre — FTC #36363 Website

A multi-page site for FTC Team Spectre. Plain HTML/CSS/JS — no build step, no
framework, no dependencies to install. Open `index.html` in a browser and it
just works; every other page is its own `.html` file linked from the nav.

```
team-spectre-website/
├── index.html          ← Home (hero)
├── about.html          ← About the Team
├── team.html           ← The Roster (students + mentors)
├── robot.html          ← Offseason Highlights (BOOM bot)
├── sponsors.html       ← Our Sponsors
├── donate.html         ← Donate
├── schedule.html       ← Schedule
├── gallery.html        ← Gallery
├── contact.html        ← Get In Touch
├── css/styles.css      ← all styling (colors, fonts, layout, responsive rules)
├── js/main.js          ← mobile menu, active-nav highlighting, scroll effects
├── assets/logo.svg     ← the team logo
├── assets/robot/        ← BOOM bot / Jadon bot / decode bot / drivetrain photos
└── README.md
```

Every page shares the same header/nav and footer markup, so if you add or
rename a page, update the `<nav class="primary-nav">` and
`<nav class="mobile-nav">` blocks in **all nine files** (a quick find-and-
replace across the folder is the easiest way).

## Editing content

Each page is a normal HTML file — open the one you want to change in any
text editor and edit the text directly. A few spots are still placeholders,
wrapped in `[brackets]` or left as `TBD`:

- Team (`team.html`): all 12 roster names/roles/bios plus the 2 mentor cards
  (add/remove `<article class="member-card">` blocks inside `.roster-grid`
  as your roster changes — student cards and mentor cards are two separate
  grids so you can size them independently)
- Sponsors (`sponsors.html`): pitch text, contact email in the "Become a
  Sponsor" button, the scrolling logo strip text (`.marquee-track span` —
  duplicate list, keep both halves identical so the loop looks seamless),
  and the tiered logo tiles (once you have a logo image, replace a
  `<div class="sponsor-slot"><span>Your Logo Here</span></div>` with
  `<div class="sponsor-slot"><img src="assets/sponsors/logo.png"
  alt="Sponsor name"></div>`)
- Schedule (`schedule.html`): real dates and venues once your league
  publishes them
- Gallery (`gallery.html`): swap any remaining `<div class="gallery-slot">`
  blocks for real photos, e.g. `<figure class="gallery-item"><img
  src="assets/gallery/photo1.jpg" alt="..."></figure>` (keep photos under
  ~500KB each so the page stays fast)

Everything else (About, Robot, Donate, Contact) already has real Team
Spectre content — just keep it up to date as things change.

## Colors & fonts (already set up)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#161B2B` | page background |
| `--green-1` | `#31AB32` | primary accent, buttons |
| `--green-2` | `#95ED8E` | secondary accent, highlights |
| Text | `#FFFFFF` | headings / body |

Fonts are loaded from Google Fonts: **Big Shoulders Display** (headings),
**IBM Plex Sans** (body copy), **IBM Plex Mono** (labels, numbers, nav).
All three are defined once as CSS variables at the top of `styles.css` — 
change them there if you ever want a different look.

## Motion & interaction

- The hero headline, tagline, and buttons animate in on load (pure CSS,
  no dependency), and the logo fades in beside them.
- The header gets a solid background once you scroll past it.
- Sections below the fold settle into place as you scroll to them.
- Buttons and cards get a subtle "magnetic" pull toward the cursor and a
  hover lift (desktop only — this is skipped automatically on touch
  devices and for anyone with reduced-motion turned on in their OS).
- The sponsor strip auto-scrolls in an infinite loop.

Everything above is additive polish only — the page is fully readable with
JavaScript off, fonts blocked, or animations disabled; nothing depends on a
script running to become visible.

## Deploying to GitHub Pages (free)

1. Create a new repository on GitHub (e.g. `team-spectre-website`).
2. From inside this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Team Spectre website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`, then **Save**.
5. GitHub gives you a live URL within a minute or two, typically:
   `https://<your-username>.github.io/<repo-name>/`
6. (Optional) If your FTC team gets its own domain, add it under **Settings
   → Pages → Custom domain** and follow GitHub's DNS instructions.

Every time you `git push` after that, the live site updates automatically.

## Deploying to Netlify (alternative)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in.
2. Drag-and-drop this whole folder onto the "Deploy manually" area on your
   dashboard — no git required. Netlify gives you a live URL immediately.
3. For automatic updates on every push instead, connect the same GitHub repo
   from step 1 above via "Add new site → Import an existing project."

## Local preview

No server is required — double-click `index.html`. If you want it served
over `http://` instead of `file://` (matches production more closely), run
from this folder:

```bash
python3 -m http.server 8000
```

then open `http://localhost:8000`.
