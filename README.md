# TECHFLIX | IEEE DEXTERITY '26

> **Beyond the Screen - Enter. Solve. Escape.**
> Official event showcase for the IEEE MMCOE Student Branch's flagship annual technical symposium: **DEXTERITY '26**.

TechFlix is an immersive technical competition where cinema meets problem-solving: four movie-themed rounds over two days, ending in a final boss battle.

**Dates:** 29 & 30 October 2026 | **Venue:** MMCOE, Pune | **Team size:** 1-2 | **Fee:** ₹50 / head | **Prize pool:** ₹15,000 (1st ₹7,000 | 2nd ₹5,000 | 3rd ₹3,000)

## Events

| Round | Day | Movie | Challenge | Page |
|---|---|---|---|---|
| Round 1 | 29 Oct | Inside Out | Debug the Mind | `insideout.html` |
| Round 2 | 29 Oct | Cars | Pit Stop Protocol | `cars.html` |
| Round 3 | 30 Oct | Finding Nemo | Find the Data | `findingnemo.html` |
| Final | 30 Oct | How To Train Your Dragon | Dragon Code | `howtotrainyourdragon.html` |

Register for any one or two of the first three rounds. The top 10 from each round qualify for the Final Round.

## Features

- Cartoon theatre look: curtains that open on load, marquee lights, a solid stage-colour background with halftone dots, and a popcorn bucket that jumps out and spills.
- Movie-matched animated background per page: popcorn, orbs, speed lines, bubbles and dragon embers.
- Event cards on the home page. Click one and it expands into the full round details with a register button, or open its own page.
- Poster block in the hero, schedule, prize podium and an "Admit One" ticket with a live countdown to **29 Oct 2026, 09:00 IST**.
- Respects `prefers-reduced-motion`. No build step, plain HTML/CSS/JS (fonts are self-hosted).

## Project structure

```
index.html                                   Home page
insideout.html  cars.html
findingnemo.html  howtotrainyourdragon.html  Event pages (thin shells)
assets/js/events.js                          All event content and registration links (edit here)
assets/js/common.js                          Themes, background, nav/footer, detail markup
assets/js/home.js                            Home cards, expanding sheet, popcorn, countdown
assets/js/event.js                           Event page renderer
assets/js/art.js                             Original illustrations, one per round
assets/css/style.css                         Styles
assets/css/fonts.css  assets/fonts/          Self-hosted Lilita One and Nunito
assets/img/poster.jpg                        Event poster
assets/img/ieee-logo.png  mmcoe-logo.png     Organisation logos
assets/img/events/                           One image per round
assets/img/piston-cup.jpg                    Prize trophy
serve.py                                     Optional local server
```

## Setup

1. Open `assets/js/events.js` and replace every `https://forms.gle/REPLACE_ME` with the real Google Form link (one per event, plus `generalForm`).

## Run locally

```bash
python3 serve.py
```

It prints the local URL (e.g. `http://localhost:8000`). You can also open `index.html` directly in a browser.

## Connect

- Instagram: https://www.instagram.com/ieee_mmcoe/
- LinkedIn: https://www.linkedin.com/in/ieee-mmcoe-student-branch-1837ba1b6
- Website: https://ieeemmcoe.com
