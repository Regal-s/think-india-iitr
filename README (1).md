# Think India · IIT Roorkee — Website

A single-page, fully self-contained website for the Think India IIT Roorkee chapter,
built around the editorial aesthetic of the chapter's first magazine, **ऋतम्**.

```
think-india-iitr/
├── index.html      ← the page itself
├── styles.css      ← all design tokens, typography, layout
├── script.js       ← nav, scroll-reveal, mobile menu, form handler
└── README.md       ← this file
```

## What's inside

Sections, in order:

1. **Hero** — magazine-issue masthead with the Sanskrit shloka *ऋतेन सत्यं तिष्ठति* and the tagline "Rooted in tradition. Guided by truth. Shaping tomorrow."
2. **Ticker** — running banner with the chapter's core themes.
3. **§01 About** — the "Nation First" attitude, with a highlights sidebar (delegates, Tiranga Yatra numbers, Khadi Mela visitors, etc.).
4. **§02 Vision pillars** — four convictions that drive the chapter.
5. **§03 Initiatives** — selected events from the year (National Convention, Tiranga Yatra, Chhatra Sansad, Master Your Mind, Maati-NITI, Khadi Mela, Parakram Diwas, Nitishala, Voter Awareness).
6. **§04 The magazine — ऋतम्** — a stylised cover panel + editor's note + a quote from the Director.
7. **§05 Voices** — quotes from the Director, Faculty In-Charge, and Founder.
8. **§06 Team** — faculty mentors, magazine design team, advisory team.
9. **§07 Connect** — the contact form (full name, email, phone, affiliation, role, multi-select interest chips, message).
10. **Footer** — address, links, motto.

## Design choices

- **Palette** carried from the magazine cover — warm parchment, antique gold, deep ink, with a deep emerald and ink-dark sections for contrast.
- **Type stack** — *Fraunces* (display, variable serif with personality), *Newsreader* (literary body serif), *Tiro Devanagari Sanskrit* for all the Devanagari, *DM Mono* for labels.
- **Decorative details** — paper grain overlay, a sun-rayed chakra mark, hairline rules, a lotus-and-line ornament divider, and a tilted "magazine cover" panel rendered in CSS (no image needed).

## Getting it online

It's plain HTML/CSS/JS — host anywhere.

**Quickest:** drag the folder onto [Netlify Drop](https://app.netlify.com/drop) or push it to a GitHub repo and turn on GitHub Pages.

**Local preview:**
```bash
cd think-india-iitr
python3 -m http.server 8000
# then open http://localhost:8000
```

## Wiring up the contact form

The form currently points at a placeholder:
```html
<form ... action="https://formspree.io/f/your-form-id" method="POST">
```

Pick one of these and replace the `action` URL:

| Option | What you do |
|---|---|
| **Formspree** *(easiest)* | Sign up at [formspree.io](https://formspree.io), create a form, paste its endpoint into `action`. Free tier handles ~50 submissions/month. |
| **Netlify Forms** | If hosting on Netlify, replace the `<form>` tag with `<form name="connect" netlify method="POST">` and Netlify captures everything automatically. |
| **Google Forms** | Create a Form, get the `formResponse` URL, replace the action; rename the inputs to match the Google `entry.xxxxxx` IDs. |
| **Your own backend** | Just point `action` at your endpoint. The form sends standard `application/x-www-form-urlencoded` (or `multipart/form-data` via `FormData`). |

The JS in `script.js` already handles Formspree/Netlify/Getform/Formsubmit endpoints with an inline success message — anything else falls back to a normal browser submit, which is fine.

## Easy edits

| You want to change | Where |
|---|---|
| Colors | `:root { --paper, --gold, --ink, --emerald, ... }` in `styles.css` |
| Fonts | The `<link>` in `index.html` (Google Fonts) + the `--f-*` tokens in `styles.css` |
| Section padding | `--section-y` and `--shell-pad-x` in `:root` |
| Stats in the About section | the `.about-stats` block in `index.html` |
| Event cards | the `.cards` block in `index.html` — duplicate any `.card` to add another |
| Team names | the `.team-grid` block in `index.html` |
| Contact channels (email, address, faculty) | the `.connect-channels` list in `index.html` |

## A note on the magazine

The site treats the magazine as a centrepiece, not an afterthought — the cover is rendered in CSS (so it's text-selectable, scales beautifully, and needs no image asset). When the chapter is ready to share **ऋतम्** as a PDF, swap the cover panel for an `<img>` of the real cover and link the **§04** CTA to the file.

— Built around the spirit of ऋतम्. श्रम विना न किमपि साध्यम्.
