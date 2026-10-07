/* Home page: clickable event cards that expand into full details, popcorn surprise, countdown. */
const theme = applyTheme("home");
renderChrome();
startBackground(theme);

const grid = document.getElementById("cards");
grid.innerHTML = EVENTS.map((e, i) => {
  const t = THEMES[e.id];
  return `<article class="card reveal" style="${themeVars(t)};transition-delay:${i * 80}ms" data-id="${e.id}"
      role="button" tabindex="0" aria-haspopup="dialog" aria-label="${e.movie}: open details">
    <div class="card-top">
      <div class="card-head">
        <div class="row"><span class="num">${e.numeral}</span><span class="chip-round">${e.round} | ${e.day}</span></div>
        <h3>${e.movie}</h3>
        <span class="ribbon">${e.title}</span>
      </div>
      ${photoHTML(e, "card-photo")}
    </div>
    <p class="it">${e.tagline}</p>
    <p>${e.blurb}</p>
    <ol class="steps">${e.phases.map((p, n) => `<li>0${n + 1} ${p.name}</li>`).join("")}</ol>
    <div class="card-foot">
      <span class="hint it">Tap to open</span>
      <a class="btn sm" href="${e.form}" target="_blank" rel="noopener">Register</a>
    </div>
  </article>`;
}).join("");

revealOnScroll(); // cards are rendered after renderChrome(), so observe them now

document.querySelectorAll(".reg-link").forEach((a) => (a.href = SITE.generalForm));

/* ---- Expanding card sheet ---- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let current = null;

function openSheet(card) {
  if (current) return;
  const e = EVENTS.find((x) => x.id === card.dataset.id);
  const r = card.getBoundingClientRect();
  const back = document.createElement("div");
  back.className = "backdrop";
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-label", e.movie);
  sheet.style.cssText = `${themeVars(THEMES[e.id])};top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px`;
  sheet.innerHTML = `<button class="close" aria-label="Close">&times;</button>
    <div class="sheet-body">
      <header class="sheet-head"><div class="sheet-art">${photoHTML(e, "sheet-photo")}</div>
        <span class="chip-round">${e.round} | ${e.day}</span>
        <h2>${e.movie}</h2>
        <span class="ribbon">${e.title}</span>
        <p class="it">${e.tagline}</p>
      </header>
      ${detailHTML(e)}
      <a class="btn ghost full-link" href="${e.file}">Open full page</a>
    </div>`;
  document.body.append(back, sheet);
  document.body.style.overflow = "hidden";
  card.style.visibility = "hidden";
  current = { card, sheet, back };

  const w = Math.min(1040, innerWidth * 0.94), h = innerHeight * 0.9;
  if (reduce) sheet.style.transition = "none";
  sheet.getBoundingClientRect(); // force reflow so the transition runs
  requestAnimationFrame(() => {
    back.classList.add("show");
    sheet.classList.add("open");
    Object.assign(sheet.style, { top: `${(innerHeight - h) / 2}px`, left: `${(innerWidth - w) / 2}px`, width: `${w}px`, height: `${h}px` });
  });
  sheet.querySelector(".close").focus();
  sheet.querySelector(".close").onclick = back.onclick = closeSheet;
}

function closeSheet() {
  if (!current) return;
  const { card, sheet, back } = current;
  current = null;
  const r = card.getBoundingClientRect();
  const done = () => { sheet.remove(); back.remove(); card.style.visibility = ""; document.body.style.overflow = ""; card.focus(); };
  back.classList.remove("show");
  sheet.classList.remove("open");
  if (reduce) return done();
  Object.assign(sheet.style, { top: `${r.top}px`, left: `${r.left}px`, width: `${r.width}px`, height: `${r.height}px` });
  setTimeout(done, 520);
}

grid.addEventListener("click", (ev) => {
  if (ev.target.closest("a")) return; // Register button keeps its own link
  const card = ev.target.closest(".card");
  if (card) openSheet(card);
});
grid.addEventListener("keydown", (ev) => {
  if ((ev.key === "Enter" || ev.key === " ") && ev.target.classList.contains("card")) { ev.preventDefault(); openSheet(ev.target); }
});
addEventListener("keydown", (ev) => { if (ev.key === "Escape") closeSheet(); });

/* ---- Popcorn burst from the bucket ---- */
if (!reduce) {
  setTimeout(() => {
    const b = document.querySelector(".bucket-wrap").getBoundingClientRect();
    for (let i = 0; i < 36; i++) {
      const k = document.createElement("span");
      k.className = "kernel";
      k.style.left = `${b.left + b.width / 2}px`;
      k.style.top = `${b.top + 10}px`;
      k.style.setProperty("--x", `${-Math.random() * 80 * innerWidth / 100}px`);
      k.style.setProperty("--y", `${-(Math.random() * 45 + 15) * innerHeight / 100}px`);
      k.style.animationDelay = `${Math.random() * 0.4}s`;
      document.body.appendChild(k);
      setTimeout(() => k.remove(), 3200);
    }
  }, 1500);
}

/* ---- Countdown ---- */
const cd = document.getElementById("countdown");
const target = new Date(SITE.countdownTo).getTime();
(function tick() {
  const d = target - Date.now();
  if (d <= 0) { cd.textContent = "NOW SHOWING"; return; }
  const p = (n) => String(n).padStart(2, "0");
  cd.textContent = `${Math.floor(d / 864e5)}d ${p(Math.floor(d / 36e5) % 24)}h ${p(Math.floor(d / 6e4) % 60)}m ${p(Math.floor(d / 1e3) % 60)}s`;
  setTimeout(tick, 1000);
})();
