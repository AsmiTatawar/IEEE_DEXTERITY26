/* Event page: <body data-event="cars"> is rendered from EVENTS. */
const ev = EVENTS.find((e) => e.id === document.body.dataset.event);
const theme = applyTheme(ev.id);
renderChrome();
startBackground(theme);
document.title = `${ev.movie} - ${ev.title} | ${SITE.name} ${SITE.fest}`;

const others = EVENTS.filter((e) => e.id !== ev.id)
  .map((e) => `<a class="btn ghost" href="${e.file}">${e.movie}</a>`).join("");

document.getElementById("app").innerHTML = `
  <section class="ev-hero">
    <div>
      <span class="chip-round">${ev.round} | ${ev.day}</span>
      <h1>${ev.movie}</h1>
      <span class="ribbon">${ev.title}</span>
      <p class="tag it">${ev.tagline}</p>
      <p class="lead">${ev.blurb}</p>
      <a class="btn big" href="${ev.form}" target="_blank" rel="noopener">Click here to register</a>
    </div>
    <div class="cast">${photoHTML(ev)}</div>
  </section>
  <section class="reveal">${detailHTML(ev)}</section>
  <section class="reg-bar reveal">
    <h2>Ready to <em>enter</em>?</h2>
    <a class="btn big" href="${ev.form}" target="_blank" rel="noopener">Click here to register</a>
    <p class="it more-label">More from the programme</p>
    <div class="others">${others}</div>
  </section>`;
revealOnScroll();
