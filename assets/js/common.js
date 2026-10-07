/* Shared: themes, animated background, nav/footer, and event detail markup. */
const THEMES = {
  home:        { bg: "#10124a", card: "#ffd84a", ink: "#101a5c", ribbon: "#1f3fbf", ribbonInk: "#fff", c1: "#ffd21f", c2: "#e63027", mode: "popcorn", pal: ["#fff3c4", "#ffd84a"] },
  insideout:   { bg: "#1b1458", card: "#ffd84a", ink: "#101a5c", ribbon: "#1f3fbf", ribbonInk: "#fff", c1: "#ffd21f", c2: "#8e5bd6", mode: "orbs",    pal: ["#ffd84a", "#8e5bd6", "#3a7bd5", "#e63027", "#3ecf6b"] },
  cars:        { bg: "#4d0c12", card: "#e63027", ink: "#ffffff", ribbon: "#130a24", ribbonInk: "#ffd21f", c1: "#ffd21f", c2: "#e63027", mode: "speed", pal: ["#ffd21f", "#ffffff"] },
  findingnemo: { bg: "#06306b", card: "#1e90e8", ink: "#ffffff", ribbon: "#ff8a1f", ribbonInk: "#130a24", c1: "#ff8a1f", c2: "#1e90e8", mode: "bubbles", pal: ["#bfe6ff", "#ff8a1f"] },
  dragon:      { bg: "#26104a", card: "#5a2a9a", ink: "#ffd84a", ribbon: "#ff8a1f", ribbonInk: "#130a24", c1: "#ff8a1f", c2: "#9b6bff", mode: "embers", pal: ["#ff8a1f", "#ffd21f", "#e63027"] },
};

/* CSS custom properties for a theme; used on :root (pages) or an element (cards). */
function themeVars(t) {
  return `--bg:${t.bg};--card:${t.card};--card-ink:${t.ink};--ribbon:${t.ribbon};--ribbon-ink:${t.ribbonInk};--c1:${t.c1};--c2:${t.c2}`;
}

function applyTheme(key) {
  const t = THEMES[key] || THEMES.home;
  document.documentElement.style.cssText = themeVars(t);
  return t;
}

/* Particle background; `mode` changes shape and motion to match the movie. */
function startBackground(t) {
  const cv = document.getElementById("bg");
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let w, h;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const resize = () => { w = cv.width = innerWidth; h = cv.height = innerHeight; };
  addEventListener("resize", resize); resize();

  const make = () => ({ x: rnd(0, w), y: rnd(0, h), r: rnd(3, 11), s: rnd(0.3, 1.5), p: rnd(0, 6.28),
    c: t.pal[Math.floor(Math.random() * t.pal.length)] });
  const parts = Array.from({ length: t.mode === "speed" ? 34 : 46 }, make);

  const ring = (p, fill) => {
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.28);
    ctx.globalAlpha = .55;
    if (fill) { ctx.fillStyle = p.c; ctx.fill(); }
    else { ctx.strokeStyle = p.c; ctx.lineWidth = 2.5; ctx.stroke(); }
    ctx.globalAlpha = 1;
  };
  const draw = {
    popcorn: (p) => { p.y -= p.s * .4; p.x += Math.sin(p.p += .01); ring(p, true); },
    orbs:    (p) => { p.y -= p.s * .3; p.x += Math.sin(p.p += .01) * .6; ring(p, true); },
    bubbles: (p) => { p.y -= p.s; p.x += Math.sin(p.p += .03) * .8; ring(p, false); },
    embers:  (p) => { p.y -= p.s * 1.2; p.x += Math.sin(p.p += .05); ring({ ...p, r: p.r / 2 }, true); },
    speed:   (p) => { p.x -= p.s * 14; ctx.strokeStyle = p.c; ctx.globalAlpha = .4; ctx.lineWidth = 3;
               ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + p.r * 14, p.y); ctx.stroke(); ctx.globalAlpha = 1; },
  };
  (function frame() {
    ctx.clearRect(0, 0, w, h);
    parts.forEach((p) => {
      draw[t.mode](p);
      if (p.y < -20 || p.x < -200) {
        const speed = t.mode === "speed";
        p.y = speed ? rnd(0, h) : h + 20; p.x = speed ? w + 20 : rnd(0, w);
      }
    });
    if (!reduce) requestAnimationFrame(frame);
  })();
}

const ICON_IG = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`;
const ICON_IN = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4V9.5Z"/></svg>`;

function renderChrome(root = "") {
  document.body.insertAdjacentHTML("afterbegin",
    `<canvas id="bg"></canvas><div class="curtain l"></div><div class="curtain r"></div>
     <nav class="nav">
       <a class="brand" href="${root}index.html">TECHFLIX<small>DEXTERITY '26</small></a>
       <ul>
         <li><a href="${root}index.html#events">Events</a></li>
         <li><a href="${root}index.html#schedule">Schedule</a></li>
         <li><a href="${root}index.html#prizes">Prizes</a></li>
         <li><a class="btn sm" href="${root}index.html#ticket">Get Ticket</a></li>
       </ul>
       <div class="lights" aria-hidden="true"></div>
     </nav>`);
  document.body.insertAdjacentHTML("beforeend",
    `<div class="floor" aria-hidden="true"></div>
     <footer>
       <div class="orgs"><img src="assets/img/ieee-logo.png" alt="IEEE Student Branch MMCOE"><img src="assets/img/mmcoe-logo.png" alt="Marathwada Mitra Mandal's College of Engineering, Pune"></div>
       <p class="foot-title">${SITE.fest}</p>
       <p class="it">IEEE Student Branch MMCOE, Pune</p>
       <div class="socials">
         <a href="${SITE.instagram}" target="_blank" rel="noopener">${ICON_IG} Instagram</a>
         <a href="${SITE.linkedin}" target="_blank" rel="noopener">${ICON_IN} LinkedIn</a>
         <a href="${SITE.website}" target="_blank" rel="noopener">ieeemmcoe.com</a>
       </div>
       <a href="mailto:${SITE.email}">${SITE.email}</a>
     </footer>`);
  revealOnScroll();
}

function revealOnScroll() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* Full event details: used both in the expanded card and on each event page. */
function detailHTML(e) {
  const facts = [
    ["Round", `${e.round} | ${e.day}`],
    ["Venue", SITE.venue],
    ["Team size", SITE.team],
    ["Entry fee", SITE.fee],
    ["Skills", e.skills.join(", ")],
    ...(e.level ? [["Level", e.level]] : []),
  ].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");

  const phases = e.phases.map((p, i) =>
    `<li><span class="n">0${i + 1}</span><div><b>${p.name}</b><p>${p.text}</p></div></li>`).join("");

  const code = e.code ? `<div class="paper"><h3>${e.codeLabel}</h3><pre class="code">${e.code}</pre></div>` : "";
  const damage = e.damage ? `<div class="paper"><h3>Damage per challenge</h3><div class="dmg">${
    e.damage.map((d) => `<div style="--d:${d.color}"><b>${d.level}</b><span>-${d.xp} XP</span></div>`).join("")}</div></div>` : "";
  const prizes = e.showPrizes ? `<div class="paper"><h3>Final round prizes</h3><div class="dmg prize">${
    SITE.prizes.map((p) => `<div><b>${p.place}</b><span>${p.amount}</span></div>`).join("")}</div></div>` : "";

  return `<div class="detail">
    <div class="detail-main">
      <div class="paper"><h3>The story</h3><p>${e.about}</p></div>
      <div class="paper"><h3>How it plays</h3><ol class="phases">${phases}</ol></div>
      ${code}${damage}${prizes}
    </div>
    <aside class="detail-side">
      <div class="paper"><h3>Details</h3><dl>${facts}</dl></div>
      <p class="rule it">Register for any one or two of the first three rounds. The top 10 from each qualify for the Final Round.</p>
      <a class="btn big" href="${e.form}" target="_blank" rel="noopener">Click here to register</a>
    </aside>
  </div>`;
}

/* Framed event photo with the small illustration as a sticker. */
function photoHTML(e, cls = "") {
  return `<div class="photo ${cls}"><img src="${e.photo}" alt="${e.photoAlt}" loading="lazy"><div class="mascot">${ART[e.id]}</div></div>`;
}
