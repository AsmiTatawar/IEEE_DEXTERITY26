/* Original cartoon illustrations, one per round (generic designs drawn for this site). */
const O = 'stroke="#130a24" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"';

const ART = {
  insideout: `<svg viewBox="0 0 300 300" role="img" aria-label="A head full of glowing memory orbs">
    <g ${O}>
      <path d="M70 260c-22-60-34-92-4-138 26-46 92-62 138-30 46 32 46 88 14 124-12 14-6 34-6 44z" fill="#fff0b3"/>
      <circle cx="120" cy="140" r="24" fill="#ffd21f"/><circle cx="175" cy="115" r="21" fill="#3a7bd5"/>
      <circle cx="212" cy="160" r="19" fill="#e63027"/><circle cx="150" cy="195" r="18" fill="#3ecf6b"/>
      <circle cx="104" cy="200" r="16" fill="#8e5bd6"/>
    </g>
    <g fill="#fff" opacity=".85"><circle cx="112" cy="132" r="6"/><circle cx="168" cy="108" r="5"/><circle cx="206" cy="154" r="4"/></g>
    <path d="M245 60l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill="#ffd21f" ${O}/>
  </svg>`,

  cars: `<svg viewBox="0 0 300 300" role="img" aria-label="A cartoon race car with a checkered flag">
    <defs><pattern id="chk" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><rect width="8" height="8" fill="#130a24"/><rect x="8" y="8" width="8" height="8" fill="#130a24"/></pattern></defs>
    <g ${O}>
      <path d="M232 40v90" fill="none"/><rect x="190" y="40" width="48" height="40" fill="url(#chk)"/>
      <path d="M92 160l24-46h84l32 46z" fill="#e63027"/>
      <path d="M108 158l16-34h30v34zM166 158v-34h32l24 34z" fill="#bfe6ff"/>
      <rect x="30" y="156" width="240" height="62" rx="28" fill="#e63027"/>
      <path d="M60 188h150" stroke="#ffd21f" stroke-width="10" fill="none"/>
      <circle cx="90" cy="222" r="30" fill="#130a24"/><circle cx="90" cy="222" r="12" fill="#ffd21f"/>
      <circle cx="212" cy="222" r="30" fill="#130a24"/><circle cx="212" cy="222" r="12" fill="#ffd21f"/>
      <path d="M8 172h26M0 196h30M12 220h20" stroke="#ffd21f" fill="none"/>
    </g>
  </svg>`,

  findingnemo: `<svg viewBox="0 0 300 300" role="img" aria-label="A magnifying glass over a data table with bubbles and a small fish">
    <g ${O}>
      <rect x="36" y="56" width="200" height="150" rx="12" fill="#fff"/>
      <rect x="36" y="56" width="200" height="34" rx="12" fill="#1e90e8"/>
      <path d="M36 128h200M36 166h200M104 90v116M172 90v116" fill="none" stroke-width="3"/>
      <circle cx="196" cy="170" r="52" fill="#bfe6ff" fill-opacity=".6"/>
      <path d="M233 208l42 48" stroke-width="14" fill="none"/>
      <path d="M52 262c10-26 52-26 66 0-14 26-56 26-66 0zM118 262l24-16v32z" fill="#c77dff"/>
      <circle cx="72" cy="258" r="4" fill="#130a24"/>
    </g>
    <g fill="none" stroke="#bfe6ff" stroke-width="4"><circle cx="258" cy="40" r="10"/><circle cx="276" cy="78" r="6"/><circle cx="14" cy="120" r="7"/></g>
  </svg>`,

  dragon: `<svg viewBox="0 0 300 300" role="img" aria-label="A cartoon dragon head breathing fire">
    <g ${O}>
      <path d="M96 96L66 26l62 52zM204 96l30-70-62 52z" fill="#ffd84a"/>
      <path d="M66 126C66 60 234 60 234 126l-10 76c-18 44-130 44-148 0z" fill="#9b6bff"/>
      <ellipse cx="116" cy="130" rx="20" ry="16" fill="#ff8a1f"/><ellipse cx="184" cy="130" rx="20" ry="16" fill="#ff8a1f"/>
      <path d="M116 120v20M184 120v20" stroke-width="6"/>
      <path d="M134 176l4 6M166 176l-4 6" stroke-width="6"/>
      <path d="M96 200q54 26 108 0" fill="none"/><path d="M118 208l6 14 6-12M170 208l6 12 6-14" fill="#fff" stroke-width="4"/>
      <path d="M110 250q-18 26 6 44-2-22 18-30 6 26 28 30-14-22 6-44 14 16 10 38 22-14 14-40-20 8-40-4-20 12-42 6z" fill="#ff8a1f" transform="translate(0 -6)"/>
    </g>
  </svg>`,
};
