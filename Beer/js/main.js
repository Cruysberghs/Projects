/* =========================================================
   BEER. – gedeelde code voor alle pagina's
   - menu + footer (hier één keer aanpassen = overal aangepast)
   - knuffels en prijzen
   - winkelmandje (onthouden in de browser)
   - "Stel jouw BEER. samen"
   - formulieren
   ========================================================= */

// ---------- 1. Menu ----------
const MENU = [
  ["index.html", "Home"],
  ["shop.html", "Shop"],
  ["samenstellen.html", "Stel jouw BEER. samen"],
  ["workshops.html", "Workshops"],
  ["kinderfeestjes.html", "Kinderfeestjes"],
  ["kampjes.html", "Kampjes"],
  ["ons-verhaal.html", "Ons verhaal"],
  ["faq.html", "FAQ"],
  ["contact.html", "Contact"],
];

// ---------- 2. Knuffels & prijzen ----------
const KNUFFELS = [
  { id: "classic", naam: "Classic Bear", prijs: 24.95, img: "img/bear-classic.svg", tekst: "De tijdloze favoriet in warm honingbruin." },
  { id: "brownie", naam: "Brownie Bear", prijs: 24.95, img: "img/bear-brownie.svg", tekst: "Chocoladebruin en extra knuffelbaar." },
  { id: "dreamy", naam: "Dreamy Bear", prijs: 24.95, img: "img/bear-dreamy.svg", tekst: "Zacht vanillekleurig, voor zoete dromen." },
  { id: "little", naam: "Little Bear", prijs: 22.95, img: "img/bear-little.svg", tekst: "Klein maar dapper, past in elke rugzak." },
];
const GEURTJES = [
  { id: "geen", naam: "Geen geurtje", emoji: "–", prijs: 0 },
  { id: "vanille", naam: "Vanille", emoji: "🍦", prijs: 2.5 },
  { id: "aardbei", naam: "Aardbei", emoji: "🍓", prijs: 2.5 },
  { id: "lavendel", naam: "Lavendel", emoji: "💜", prijs: 2.5 },
];
const HARTJES = [
  { id: "zacht", naam: "Zacht hartje", icoon: "hart", prijs: 0 },
  { id: "kloppend", naam: "Kloppend hartje", icoon: "kloppend-hartje", prijs: 4.95 },
];
const KRAALTJES = [
  { id: "geen", naam: "Geen bandje", emoji: "–", prijs: 0 },
  { id: "bandje", naam: "Vriendschapsbandje", icoon: "bandje", prijs: 3.5 },
];

const euro = (n) => "€ " + n.toFixed(2).replace(".", ",");

// ---------- Header & footer invoegen ----------
function bouwLayout() {
  const huidig = location.pathname.split("/").pop() || "index.html";
  const links = MENU.map(([href, naam]) =>
    `<li><a href="${href}"${href === huidig ? ' aria-current="page"' : ""}>${naam}</a></li>`).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <header class="site-header">
      <div class="container header-inner">
        <a class="logo" href="index.html"><img src="img/bear-classic.svg" alt="">BEER.</a>
        <nav class="hoofdmenu" id="hoofdmenu" aria-label="Hoofdmenu"><ul>${links}</ul></nav>
        <div class="header-acties">
          <a class="icoon-knop" href="shop.html" aria-label="Zoeken in de shop">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          </a>
          <button class="icoon-knop" id="mandje-knop" aria-label="Winkelmandje openen">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>
            <span class="mandje-aantal" data-leeg="true">0</span>
          </button>
          <button class="icoon-knop menu-knop" id="menu-knop" aria-label="Menu" aria-expanded="false" aria-controls="hoofdmenu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>
    </header>`);

  document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-raster">
          <div>
            <a class="logo" href="index.html"><img src="img/bear-classic.svg" alt="">BEER.</a>
            <p>Jouw knuffel, jouw verhaal.</p>
            <span class="hand">Een knuffel voor het leven ♡</span>
          </div>
          <div><h3>Ontdek</h3><ul>${MENU.slice(1, 6).map(([h, n]) => `<li><a href="${h}">${n}</a></li>`).join("")}</ul></div>
          <div><h3>Contact</h3><ul>
            <li><img class="ico" src="img/icons/mail.svg" alt=""><a href="mailto:info@beer.be">info@beer.be</a></li>
            <li><img class="ico" src="img/icons/telefoon.svg" alt=""><a href="tel:+32479123456">+32 479 12 34 56</a></li>
            <li><img class="ico" src="img/icons/locatie.svg" alt="">Straatnaam 12, 9000 Gent</li>
          </ul></div>
        </div>
        <p class="footer-onder">© ${new Date().getFullYear()} BEER. – Met liefde gemaakt · Veilige betalingen met Bancontact</p>
      </div>
    </footer>
    <div class="achtergrond" id="achtergrond"></div>
    <aside class="mandje-paneel" id="mandje" aria-label="Winkelmandje" aria-hidden="true">
      <div class="mandje-kop"><h2>Jouw mandje</h2>
        <button class="icoon-knop" id="mandje-sluit" aria-label="Sluiten">✕</button></div>
      <ul class="mandje-items" id="mandje-items"></ul>
      <div class="mandje-voet">
        <div class="totaal"><span>Totaal</span><span id="mandje-totaal">€ 0,00</span></div>
        <button class="btn" id="afrekenen">Afrekenen</button>
      </div>
    </aside>
    <div class="toast" id="toast" role="status"></div>`);

  const menu = document.getElementById("hoofdmenu");
  const menuKnop = document.getElementById("menu-knop");
  menuKnop.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuKnop.setAttribute("aria-expanded", open);
  });
}

// ---------- 3. Winkelmandje ----------
const Mandje = {
  lees() { try { return JSON.parse(localStorage.getItem("beer-mandje")) || []; } catch { return []; } },
  bewaar(items) { try { localStorage.setItem("beer-mandje", JSON.stringify(items)); } catch {} this.toon(); },
  voegToe(item) {
    const items = this.lees();
    items.push(item);
    this.bewaar(items);
    toast(`${item.naam} zit in je mandje! 🧸`);
  },
  verwijder(i) { const items = this.lees(); items.splice(i, 1); this.bewaar(items); },
  toon() {
    const items = this.lees();
    const teller = document.querySelector(".mandje-aantal");
    teller.textContent = items.length;
    teller.dataset.leeg = items.length === 0;
    const lijst = document.getElementById("mandje-items");
    lijst.innerHTML = items.length ? items.map((it, i) => `
      <li><img src="${it.img}" alt="">
        <div><strong>${it.naam}</strong>${it.details ? `<small>${it.details}</small>` : ""}<small>${euro(it.prijs)}</small></div>
        <button data-weg="${i}" aria-label="Verwijder ${it.naam}">🗑</button></li>`).join("")
      : `<li class="mandje-leeg" style="display:block">Je mandje is nog leeg.<br><a href="shop.html">Ontdek onze knuffels →</a></li>`;
    document.getElementById("mandje-totaal").textContent = euro(items.reduce((s, it) => s + it.prijs, 0));
  },
  open(open = true) {
    document.getElementById("mandje").classList.toggle("open", open);
    document.getElementById("mandje").setAttribute("aria-hidden", !open);
    document.getElementById("achtergrond").classList.toggle("open", open);
  },
};

function koppelMandje() {
  document.getElementById("mandje-knop").addEventListener("click", () => Mandje.open());
  document.getElementById("mandje-sluit").addEventListener("click", () => Mandje.open(false));
  document.getElementById("achtergrond").addEventListener("click", () => Mandje.open(false));
  document.getElementById("mandje-items").addEventListener("click", (e) => {
    const knop = e.target.closest("[data-weg]");
    if (knop) Mandje.verwijder(+knop.dataset.weg);
  });
  document.getElementById("afrekenen").addEventListener("click", () => {
    if (!Mandje.lees().length) return toast("Je mandje is nog leeg.");
    // TODO: hier komt later de echte betaling (bv. Mollie of Shopify met Bancontact).
    toast("Online betalen komt binnenkort. Tot dan bestel je via info@beer.be.");
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") Mandje.open(false); });
  Mandje.toon();
}

let toastTimer;
function toast(tekst) {
  const t = document.getElementById("toast");
  t.textContent = tekst;
  t.classList.add("zichtbaar");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("zichtbaar"), 2500);
}

// ---------- Shop: knuffelkaarten ----------
function toonKnuffels() {
  document.querySelectorAll("[data-knuffels]").forEach((doel) => {
    doel.innerHTML = KNUFFELS.map((k) => `
      <article class="kaart">
        <img src="${k.img}" alt="${k.naam}">
        <h3>${k.naam}</h3>
        ${doel.dataset.knuffels === "lang" ? `<p>${k.tekst}</p>` : ""}
        <p class="prijs">${euro(k.prijs)}</p>
        <button class="btn plus" data-koop="${k.id}">Toevoegen</button>
      </article>`).join("");
  });
  document.addEventListener("click", (e) => {
    const knop = e.target.closest("[data-koop]");
    if (!knop) return;
    const k = KNUFFELS.find((x) => x.id === knop.dataset.koop);
    Mandje.voegToe({ naam: k.naam, prijs: k.prijs, img: k.img });
  });
}

// ---------- 4. Stel jouw BEER. samen ----------
function samensteller() {
  const el = document.getElementById("samensteller");
  if (!el) return;
  const keuze = { beer: KNUFFELS[0], geur: GEURTJES[0], hart: HARTJES[0], naam: "", verjaardag: "", kraal: KRAALTJES[0] };
  let stap = 0;
  const stappen = el.querySelectorAll(".stappen li");
  const inhoud = el.querySelector("#stap-inhoud");
  const totaal = () => keuze.beer.prijs + keuze.geur.prijs + keuze.hart.prijs + keuze.kraal.prijs;

  const knoppen = (lijst, sleutel) => `<div class="keuzes">${lijst.map((o) => `
      <button class="keuze" data-${sleutel}="${o.id}" aria-pressed="${keuze[sleutel].id === o.id}">
        ${o.img ? `<img src="${o.img}" alt="">` : o.icoon ? `<img class="ico" src="img/icons/${o.icoon}.svg" alt="">` : `<span class="emoji">${o.emoji}</span>`}
        ${o.naam}<small>${o.prijs ? (sleutel === "beer" ? euro(o.prijs) : "+ " + euro(o.prijs)) : "gratis"}</small>
      </button>`).join("")}</div>`;

  const schermen = [
    () => `<h3>1. Kies je beer</h3>${knoppen(KNUFFELS, "beer")}`,
    () => `<h3>2. Kies een geurtje</h3>${knoppen(GEURTJES, "geur")}`,
    () => `<h3>3. Voeg een hartje toe</h3>${knoppen(HARTJES, "hart")}`,
    () => `<h3>4. Maak een paspoort</h3>
      <div class="paspoort-veld">
        <label for="p-naam">Naam van je beer</label>
        <input id="p-naam" maxlength="20" placeholder="bv. Bruno" value="${keuze.naam}">
        <label for="p-dag">Verjaardag</label>
        <input id="p-dag" type="date" value="${keuze.verjaardag}">
      </div>`,
    () => `<h3>5. Optioneel: kraaltjes</h3>${knoppen(KRAALTJES, "kraal")}`,
  ];

  function teken() {
    stappen.forEach((li, i) => {
      li.classList.toggle("actief", i === stap);
      li.classList.toggle("klaar", i < stap);
    });
    inhoud.innerHTML = schermen[stap]();
    // Voorbeeld: de beer springt even op als hij verandert, en bij een kloppend hartje klopt het echt.
    const img = el.querySelector("#voorbeeld-img");
    const kloppend = keuze.hart.id === "kloppend";
    const nieuweSrc = kloppend ? keuze.beer.img.replace(".svg", "-kloppend.svg") : keuze.beer.img;
    if (!img.src.endsWith(nieuweSrc)) {
      img.src = nieuweSrc;
      img.classList.remove("pop"); void img.offsetWidth; img.classList.add("pop");
    }
    el.querySelector("#hart-label").hidden = !kloppend;
    el.querySelector("#voorbeeld-naam").textContent = keuze.naam ? `“${keuze.naam}”` : keuze.beer.naam;
    el.querySelector("#totaal").textContent = euro(totaal());
    el.querySelector("#vorige").hidden = stap === 0;
    el.querySelector("#volgende").textContent = stap === 4 ? "In mijn mandje" : "Volgende stap";
    const naamVeld = el.querySelector("#p-naam");
    if (naamVeld) {
      naamVeld.addEventListener("input", () => { keuze.naam = naamVeld.value.trim(); el.querySelector("#voorbeeld-naam").textContent = keuze.naam ? `“${keuze.naam}”` : keuze.beer.naam; });
      el.querySelector("#p-dag").addEventListener("input", (e) => { keuze.verjaardag = e.target.value; });
    }
  }

  inhoud.addEventListener("click", (e) => {
    const k = e.target.closest(".keuze");
    if (!k) return;
    const [sleutel, lijst] = [["beer", KNUFFELS], ["geur", GEURTJES], ["hart", HARTJES], ["kraal", KRAALTJES]]
      .find(([s]) => k.dataset[s] !== undefined);
    keuze[sleutel] = lijst.find((o) => o.id === k.dataset[sleutel]);
    teken();
  });
  stappen.forEach((li, i) => li.addEventListener("click", () => { stap = i; teken(); }));
  el.querySelector("#vorige").addEventListener("click", () => { stap--; teken(); });
  el.querySelector("#volgende").addEventListener("click", () => {
    if (stap < 4) { stap++; return teken(); }
    const details = [keuze.geur.id !== "geen" && keuze.geur.naam, keuze.hart.naam,
      keuze.kraal.id !== "geen" && keuze.kraal.naam, keuze.naam && "paspoort: " + keuze.naam].filter(Boolean).join(" · ");
    Mandje.voegToe({ naam: keuze.beer.naam + " (op maat)", details, prijs: totaal(), img: keuze.beer.img });
    Mandje.open();
  });
  teken();
}

// ---------- 5. Formulieren ----------
function formulieren() {
  // Onderwerp invullen vanuit een link, bv. contact.html?onderwerp=Workshop
  const onderwerp = new URLSearchParams(location.search).get("onderwerp");
  const veld = document.getElementById("onderwerp");
  if (onderwerp && veld) veld.value = onderwerp;

  document.querySelectorAll("form[data-demo]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      // TODO: koppel aan een formulierdienst (bv. Formspree of Netlify Forms) om echt e-mails te ontvangen.
      e.preventDefault();
      f.querySelector(".melding").classList.add("zichtbaar");
      f.reset();
    });
  });
}

bouwLayout();
koppelMandje();
toonKnuffels();
samensteller();
formulieren();
