/* =========================================================
   BEER. – gedeelde code voor alle pagina's
   Alles wat je zelf wil aanpassen (prijzen, verzending, teksten
   van de seizoensbalk, productinfo) staat in deel 1 hieronder.
   ========================================================= */

/* =========================================================
   1. INSTELLINGEN – hier aanpassen
   ========================================================= */

// Winkel
const WINKEL = {
  verzendkost: 4.95,     // verzendkosten in België
  gratisVanaf: 40,       // gratis verzending vanaf dit bedrag
  pakketKorting: 2.45,   // korting voor beer + geurtje + kloppend hartje + paspoort
};

// Seizoensbalk bovenaan (maand-dag, elk jaar opnieuw). De eerste die past, wordt getoond.
const SEIZOEN = [
  { van: "11-01", tot: "12-02", tekst: "Bestel vóór 2 december en je beer is op tijd bij de Sint", link: "shop.html", knop: "Naar de shop" },
  { van: "12-03", tot: "12-19", tekst: "Bestel vóór 19 december en je beer ligt op tijd onder de kerstboom", link: "shop.html", knop: "Naar de shop" },
  { van: "12-20", tot: "12-31", tekst: "Te laat voor een pakje? Een cadeaubon kan je meteen geven", link: "cadeaubon.html", knop: "Cadeaubon" },
];
const SEIZOEN_ANDERS = { tekst: `Gratis verzending in België vanaf € ${WINKEL.gratisVanaf}`, link: "shop.html", knop: "Naar de shop" };

// Openingsuren van de winkel/het atelier (VOORBEELD – aanpassen)
const OPENINGSUREN = "Wo–za 10u–18u";

// Menu bovenaan
const MENU = [
  ["index.html", "Home"],
  ["shop.html", "Shop"],
  ["samenstellen.html", "Stel jouw BEER. samen"],
  ["workshops.html", "Workshops"],
  ["kinderfeestjes.html", "Kinderfeestjes"],
  ["kampjes.html", "Kampjes"],
  ["cadeaubon.html", "Cadeaubon"],
  ["ons-verhaal.html", "Ons verhaal"],
  ["contact.html", "Contact"],
];
// Links in de footer
const FOOTER_LINKS = [
  ["shop.html", "Shop"], ["samenstellen.html", "Stel jouw BEER. samen"], ["cadeaubon.html", "Cadeaubon"],
  ["workshops.html", "Workshops"], ["kinderfeestjes.html", "Kinderfeestjes"], ["kampjes.html", "Kampjes"],
  ["faq.html", "Veelgestelde vragen"], ["ons-verhaal.html", "Ons verhaal"],
];

// Knuffels. LET OP: hoogte, materiaal, leeftijd en wasvoorschrift zijn VOORBEELDEN – vervang ze door de echte gegevens.
const KNUFFELS = [
  { id: "classic", naam: "Classic Bear", prijs: 24.95, img: "img/ill/classic.webp",
    tekst: "De tijdloze favoriet in warm honingbruin.",
    lang: "Classic Bear is de beer waar het allemaal mee begon. Zacht honingbruin pluche, een lieve snuit en armen die gemaakt zijn om te knuffelen.",
    hoogte: "30 cm", materiaal: "Zacht pluche, gerecycleerde vulling", leeftijd: "Vanaf 0 jaar", wassen: "Handwas of 30°C in een kussensloop" },
  { id: "brownie", naam: "Brownie Bear", prijs: 24.95, img: "img/ill/brownie.webp",
    tekst: "Chocoladebruin en extra knuffelbaar.",
    lang: "Brownie Bear heeft een diepe chocoladebruine vacht en is net iets steviger gevuld. Een echte bodyguard voor onder het donsdeken.",
    hoogte: "30 cm", materiaal: "Zacht pluche, gerecycleerde vulling", leeftijd: "Vanaf 0 jaar", wassen: "Handwas of 30°C in een kussensloop" },
  { id: "dreamy", naam: "Dreamy Bear", prijs: 24.95, img: "img/ill/dreamy.webp",
    tekst: "Zacht vanillekleurig, voor zoete dromen.",
    lang: "Dreamy Bear is licht als een wolkje. Met een geurtje lavendel erbij is hij de perfecte slaapvriend.",
    hoogte: "30 cm", materiaal: "Extra zacht pluche, gerecycleerde vulling", leeftijd: "Vanaf 0 jaar", wassen: "Handwas of 30°C in een kussensloop" },
  { id: "little", naam: "Little Bear", prijs: 22.95, img: "img/ill/little.webp",
    tekst: "Klein maar dapper, past in elke rugzak.",
    lang: "Little Bear is klein genoeg voor de boekentas en groot genoeg voor alle geheimen. Ideaal als eerste beer of als broertje of zusje.",
    hoogte: "20 cm", materiaal: "Zacht pluche, gerecycleerde vulling", leeftijd: "Vanaf 0 jaar", wassen: "Handwas of 30°C in een kussensloop" },
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
// Kleine extraatjes die in het mandje worden voorgesteld
const EXTRAS = [
  { id: "inpakken", naam: "Cadeauverpakking met kaartje", prijs: 2.95, img: "img/icons/uniek.svg" },
  { id: "bandje", naam: "Vriendschapsbandje", prijs: 3.5, img: "img/icons/bandje.svg" },
  { id: "geurzakje", naam: "Extra geurzakje", prijs: 2.5, img: "img/icons/geurtje.svg" },
];

/* =========================================================
   2. Hulpjes
   ========================================================= */
const euro = (n) => "€ " + n.toFixed(2).replace(".", ",");
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const param = (naam) => new URLSearchParams(location.search).get(naam);
const opslag = {
  lees(sleutel, standaard) { try { return JSON.parse(localStorage.getItem(sleutel)) ?? standaard; } catch { return standaard; } },
  zet(sleutel, waarde) { try { localStorage.setItem(sleutel, JSON.stringify(waarde)); } catch {} },
};
const minderBeweging = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================
   3. Header, seizoensbalk en footer
   ========================================================= */
function huidigSeizoen() {
  const nu = new Date();
  const md = String(nu.getMonth() + 1).padStart(2, "0") + "-" + String(nu.getDate()).padStart(2, "0");
  return SEIZOEN.find((s) => md >= s.van && md <= s.tot) || SEIZOEN_ANDERS;
}

function bouwLayout() {
  const huidig = location.pathname.split("/").pop() || "index.html";
  const links = MENU.map(([href, naam]) =>
    `<li><a href="${href}"${href === huidig ? ' aria-current="page"' : ""}>${naam}</a></li>`).join("");
  const s = huidigSeizoen();

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="seizoensbalk" id="seizoensbalk">
      <p><img src="img/icons/uniek.svg" alt="">${s.tekst} <a href="${s.link}">${s.knop} →</a></p>
    </div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="logo" href="index.html"><img src="img/ill/logo.webp" alt="">BEER.</a>
        <nav class="hoofdmenu" id="hoofdmenu" aria-label="Hoofdmenu"><ul>${links}</ul></nav>
        <div class="header-acties">
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
            <a class="logo" href="index.html"><img src="img/ill/logo.webp" alt="">BEER.</a>
            <p>Jouw knuffel, jouw verhaal.</p>
            <span class="hand">Een knuffel voor het leven ♡</span>
          </div>
          <div><h3>Ontdek</h3><ul>${FOOTER_LINKS.map(([h, n]) => `<li><a href="${h}">${n}</a></li>`).join("")}</ul></div>
          <div><h3>Contact</h3><ul>
            <li><img class="ico" src="img/icons/mail.svg" alt=""><a href="mailto:info@beer.be">info@beer.be</a></li>
            <li><img class="ico" src="img/icons/telefoon.svg" alt=""><a href="tel:+32479123456">+32 479 12 34 56</a></li>
            <li><img class="ico" src="img/icons/locatie.svg" alt="">Straatnaam 12, 9000 Gent</li>
            <li><img class="ico" src="img/icons/uniek.svg" alt="">${OPENINGSUREN}</li>
          </ul></div>
        </div>
        <p class="footer-onder">© ${new Date().getFullYear()} BEER. – Met liefde gemaakt · Veilig betalen met Bancontact</p>
      </div>
    </footer>
    <div class="achtergrond" id="achtergrond"></div>
    <aside class="mandje-paneel" id="mandje" aria-label="Winkelmandje" aria-hidden="true">
      <div class="mandje-kop"><h2>Jouw mandje</h2>
        <button class="icoon-knop" id="mandje-sluit" aria-label="Sluiten">✕</button></div>
      <div class="mandje-verzending" id="mandje-verzending"></div>
      <ul class="mandje-items" id="mandje-items"></ul>
      <div class="mandje-extra" id="mandje-extra"></div>
      <div class="mandje-voet">
        <div class="regel"><span>Subtotaal</span><span id="mandje-subtotaal">€ 0,00</span></div>
        <div class="regel"><span>Verzending</span><span id="mandje-verzendkost">€ 0,00</span></div>
        <div class="totaal"><span>Totaal</span><span id="mandje-totaal">€ 0,00</span></div>
        <button class="btn koop" id="afrekenen">Bestelling afronden</button>
        <p class="betaal-chips"><span>Bancontact</span><span>Payconiq</span><span>Visa</span><span>Mastercard</span></p>
        <p class="mandje-belofte">Levering in 2–3 werkdagen · Gratis afhalen in Gent · 14 dagen bedenktijd</p>
      </div>
    </aside>
    <div class="toast" id="toast" role="status"></div>`);

  // Op de gsm: vaste knop onderaan, zodat bestellen altijd één tik ver is
  const GSM_KNOP = {
    "workshops.html": ["contact.html?onderwerp=Workshop", "Reserveer een workshop →"],
    "kinderfeestjes.html": ["contact.html?onderwerp=Kinderfeestje", "Boek een feestje →"],
    "kampjes.html": ["contact.html?onderwerp=Kampje", "Schrijf je in →"],
  };
  if (!["samenstellen.html", "product.html", "cadeaubon.html", "bestellen.html", "contact.html"].includes(huidig)) {
    const [href, tekst] = GSM_KNOP[huidig] || ["samenstellen.html", "Stel jouw BEER. samen →"];
    document.body.insertAdjacentHTML("beforeend", `<a class="gsm-cta" href="${href}">${tekst}</a>`);
    document.body.classList.add("heeft-gsm-cta");
    // Verbergen zolang er al een grote bestelknop in beeld is (geen dubbele knoppen)
    if ("IntersectionObserver" in window) {
      const cta = document.querySelector(".gsm-cta");
      const zichtbaar = new Set();
      const io = new IntersectionObserver((items) => {
        items.forEach((it) => it.isIntersecting ? zichtbaar.add(it.target) : zichtbaar.delete(it.target));
        cta.classList.toggle("verborgen", zichtbaar.size > 0);
      });
      setTimeout(() => document.querySelectorAll("main .btn.groot, main .pakket .btn, main .hero-knoppen .btn").forEach((b) => io.observe(b)), 0);
    }
  }

  const menu = document.getElementById("hoofdmenu");
  const menuKnop = document.getElementById("menu-knop");
  menuKnop.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuKnop.setAttribute("aria-expanded", open);
  });
}

/* =========================================================
   4. Winkelmandje
   ========================================================= */
const Mandje = {
  lees() {
    return opslag.lees("beer-mandje", []).map((it) => ({ aantal: 1, ...it }));
  },
  bewaar(items) { opslag.zet("beer-mandje", items); this.toon(); },
  aantal() { return this.lees().reduce((s, it) => s + it.aantal, 0); },
  subtotaal() { return this.lees().reduce((s, it) => s + it.prijs * it.aantal, 0); },
  voegToe(item, aantal = 1) {
    const items = this.lees();
    const zelfde = items.find((it) => it.naam === item.naam && (it.details || "") === (item.details || "") && it.prijs === item.prijs);
    if (zelfde) zelfde.aantal += aantal; else items.push({ ...item, aantal });
    this.bewaar(items);
    toast(`${item.naam} zit in je mandje! 🧸`);
    const mk = document.getElementById("mandje-knop");
    mk.classList.remove("hup"); void mk.offsetWidth; mk.classList.add("hup");
  },
  wijzig(i, delta) {
    const items = this.lees();
    items[i].aantal += delta;
    if (items[i].aantal < 1) items.splice(i, 1);
    this.bewaar(items);
  },
  toon() {
    const items = this.lees();
    const teller = document.querySelector(".mandje-aantal");
    teller.textContent = this.aantal();
    teller.dataset.leeg = items.length === 0;

    const sub = this.subtotaal();
    const gratis = sub >= WINKEL.gratisVanaf;
    const verzend = items.length && !gratis ? WINKEL.verzendkost : 0;

    // Balk "nog € … tot gratis verzending"
    const balk = document.getElementById("mandje-verzending");
    balk.hidden = !items.length;
    balk.innerHTML = gratis
      ? `<p><strong>Hoera, je verzending is gratis!</strong></p><div class="voortgang"><span style="width:100%"></span></div>`
      : `<p>Nog <strong>${euro(WINKEL.gratisVanaf - sub)}</strong> tot gratis verzending</p>
         <div class="voortgang"><span style="width:${Math.min(100, (sub / WINKEL.gratisVanaf) * 100)}%"></span></div>`;

    const lijst = document.getElementById("mandje-items");
    lijst.innerHTML = items.length ? items.map((it, i) => `
      <li><img src="${it.img}" alt="">
        <div><strong>${esc(it.naam)}</strong>${it.details ? `<small>${esc(it.details)}</small>` : ""}
          <span class="aantal-knoppen">
            <button data-min="${i}" aria-label="Eén minder">−</button><span>${it.aantal}</span><button data-plus="${i}" aria-label="Eén meer">+</button>
          </span>
        </div>
        <span class="mandje-prijs">${euro(it.prijs * it.aantal)}</span></li>`).join("")
      : `<li class="mandje-leeg">Je mandje is nog leeg.<br><a href="samenstellen.html">Stel jouw beer samen →</a></li>`;

    // Extraatjes voorstellen die nog niet in het mandje zitten
    const extra = document.getElementById("mandje-extra");
    const voorstel = items.length ? EXTRAS.filter((x) => !items.some((it) => it.naam === x.naam)).slice(0, 2) : [];
    extra.hidden = !voorstel.length;
    extra.innerHTML = voorstel.length ? `<p class="mandje-extra-titel">Iets kleins erbij?</p>` + voorstel.map((x) => `
      <button class="extra-knop" data-extra="${x.id}"><img src="${x.img}" alt=""><span>${x.naam}</span><strong>+ ${euro(x.prijs)}</strong></button>`).join("") : "";

    document.getElementById("mandje-subtotaal").textContent = euro(sub);
    document.getElementById("mandje-verzendkost").textContent = verzend ? euro(verzend) : items.length ? "Gratis" : "€ 0,00";
    document.getElementById("mandje-totaal").textContent = euro(sub + verzend);
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
    const min = e.target.closest("[data-min]"), plus = e.target.closest("[data-plus]");
    if (min) Mandje.wijzig(+min.dataset.min, -1);
    if (plus) Mandje.wijzig(+plus.dataset.plus, 1);
  });
  document.getElementById("mandje-extra").addEventListener("click", (e) => {
    const knop = e.target.closest("[data-extra]");
    if (!knop) return;
    const x = EXTRAS.find((y) => y.id === knop.dataset.extra);
    springHartjes(knop);
    Mandje.voegToe({ naam: x.naam, prijs: x.prijs, img: x.img });
  });
  document.getElementById("afrekenen").addEventListener("click", () => {
    if (!Mandje.lees().length) return toast("Je mandje is nog leeg.");
    // TODO: later vervangen door echte online betaling (bv. WooCommerce + Mollie met Bancontact).
    location.href = "bestellen.html";
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

/* =========================================================
   5. Shop: knuffelkaarten en het complete pakket
   ========================================================= */
function toonKnuffels() {
  document.querySelectorAll("[data-knuffels]").forEach((doel) => {
    doel.innerHTML = KNUFFELS.map((k) => `
      <article class="product-kaart">
        <a class="pk-beeld" href="product.html?id=${k.id}"><img src="${k.img}" alt="${k.naam}"></a>
        <div class="pk-info">
          <h3><a href="product.html?id=${k.id}">${k.naam}</a></h3>
          ${doel.dataset.knuffels === "lang" ? `<p>${k.tekst}</p>` : ""}
          <a class="pk-info-link" href="product.html?id=${k.id}">Meer info · ${k.hoogte}</a>
          <div class="pk-koop">
            <span class="prijs">${euro(k.prijs)}</span>
            <button class="btn koop klein plus" data-koop="${k.id}" aria-label="${k.naam} in mijn mandje">In mandje</button>
          </div>
        </div>
      </article>`).join("");
  });

  // Het complete pakket: beer + geurtje + kloppend hartje + paspoort
  const goedkoopste = Math.min(...KNUFFELS.map((k) => k.prijs));
  const normaal = goedkoopste + 2.5 + 4.95;
  document.querySelectorAll("[data-pakket]").forEach((doel) => {
    doel.innerHTML = `
      <div class="pakket">
        <div class="pakket-beeld"><img src="img/ill/beer-hart.webp" alt=""></div>
        <div>
          <p class="pakket-label">Meest gekozen</p>
          <h3>Het complete knuffelpakket</h3>
          <ul class="hart-lijst">
            <li>Beer naar keuze</li><li>Geurtje naar keuze</li><li>Kloppend hartje</li><li>Eigen berenpaspoort</li>
          </ul>
          <p class="pakket-prijs">Vanaf <strong>${euro(normaal - WINKEL.pakketKorting)}</strong> <s>${euro(normaal)}</s></p>
          <a class="btn koop" href="samenstellen.html?pakket=1">Stel je pakket samen</a>
        </div>
      </div>`;
  });

  // Beer reageert: blij sprongetje + hartje (muis erover of aanraken)
  const maakBlij = (vak) => {
    if (minderBeweging || !vak || vak.classList.contains("blij")) return;
    vak.classList.add("blij");
    setTimeout(() => vak.classList.remove("blij"), 900);
  };
  document.addEventListener("pointerover", (e) => {
    const vak = e.target.closest(".pk-beeld");
    if (vak && e.pointerType === "mouse" && !vak.contains(e.relatedTarget)) maakBlij(vak);
  });
  document.addEventListener("touchstart", (e) => maakBlij(e.target.closest(".product-kaart")?.querySelector(".pk-beeld")), { passive: true });

  document.addEventListener("click", (e) => {
    const knop = e.target.closest("[data-koop]");
    if (!knop) return;
    const k = KNUFFELS.find((x) => x.id === knop.dataset.koop);
    const vak = knop.closest(".product-kaart")?.querySelector(".pk-beeld");
    maakBlij(vak);
    vliegNaarMandje(vak?.querySelector("img"));
    springHartjes(knop);
    Mandje.voegToe({ naam: k.naam, prijs: k.prijs, img: k.img });
  });
}

/* =========================================================
   6. Productpagina (product.html?id=classic)
   ========================================================= */
function productPagina() {
  const el = document.getElementById("product");
  if (!el) return;
  const k = KNUFFELS.find((x) => x.id === param("id"));
  if (!k) { location.replace("shop.html"); return; }
  document.title = `${k.naam} – BEER.`;
  const anderen = KNUFFELS.filter((x) => x.id !== k.id);
  let aantal = 1;

  el.innerHTML = `
    <nav class="kruimel" aria-label="Kruimelpad"><a href="shop.html">Shop</a> › <span>${k.naam}</span></nav>
    <div class="product-raster">
      <div class="galerij">
        <div class="galerij-groot"><img id="groot-beeld" src="${k.img}" alt="${k.naam}"></div>
      </div>
      <div class="product-info">
        <h1>${k.naam}</h1>
        <p class="product-prijs">${euro(k.prijs)}</p>
        <p class="lead">${k.lang}</p>
        <div class="koop-rij">
          <div class="aantal-kiezer">
            <button id="p-min" aria-label="Eén minder">−</button><span id="p-aantal">1</span><button id="p-plus" aria-label="Eén meer">+</button>
          </div>
          <button class="btn koop plus" id="p-koop">In mijn mandje</button>
        </div>
        <p class="inbegrepen"><strong>Kant-en-klaar:</strong> gevuld, met een zacht hartje, klaar om te knuffelen. Geurtje, kloppend hartje of paspoort kies je in de samensteller.</p>
        <a class="samenstel-link" href="samenstellen.html?beer=${k.id}">Of maak hem helemaal van jou: geurtje, kloppend hartje en paspoort →</a>
        <ul class="voordelen">
          <li><img src="img/icons/uniek.svg" alt="">Levering in 2–3 werkdagen</li>
          <li><img src="img/icons/hart.svg" alt="">Gratis verzending vanaf ${euro(WINKEL.gratisVanaf)}</li>
          <li><img src="img/icons/met-liefde.svg" alt="">14 dagen bedenktijd</li>
          <li><img src="img/icons/veilig.svg" alt="">Veilig betalen met Bancontact</li>
        </ul>
        <dl class="specs">
          <div><dt>Hoogte</dt><dd>${k.hoogte}</dd></div>
          <div><dt>Materiaal</dt><dd>${k.materiaal}</dd></div>
          <div><dt>Leeftijd</dt><dd>${k.leeftijd}</dd></div>
          <div><dt>Wassen</dt><dd>${k.wassen}</dd></div>
        </dl>
      </div>
    </div>
    <section class="ook-leuk">
      <h2 class="center">Ook leuk</h2>
      <div class="raster">${anderen.map((x) => `
        <a class="kaart kaart-link" href="product.html?id=${x.id}"><img src="${x.img}" alt="${x.naam}"><h3>${x.naam}</h3><p class="prijs">${euro(x.prijs)}</p></a>`).join("")}
      </div>
    </section>`;

  const toonAantal = () => { el.querySelector("#p-aantal").textContent = aantal; };
  el.querySelector("#p-min").addEventListener("click", () => { aantal = Math.max(1, aantal - 1); toonAantal(); });
  el.querySelector("#p-plus").addEventListener("click", () => { aantal++; toonAantal(); });
  el.querySelector("#p-koop").addEventListener("click", (e) => {
    springHartjes(e.currentTarget);
    Mandje.voegToe({ naam: k.naam, prijs: k.prijs, img: k.img }, aantal);
  });
}

/* =========================================================
   7. Stel jouw BEER. samen (met pakketkorting)
   ========================================================= */
function samensteller() {
  const el = document.getElementById("samensteller");
  if (!el) return;
  const keuze = { beer: KNUFFELS[0], geur: GEURTJES[0], hart: HARTJES[0], naam: "", verjaardag: "", kraal: KRAALTJES[0] };
  // Vooraf ingevuld via de link: ?beer=brownie of ?pakket=1
  const gekozen = KNUFFELS.find((k) => k.id === param("beer"));
  if (gekozen) keuze.beer = gekozen;
  if (param("pakket")) { keuze.geur = GEURTJES[1]; keuze.hart = HARTJES[1]; }

  let stap = 0;
  const stappen = el.querySelectorAll(".stappen li");
  const inhoud = el.querySelector("#stap-inhoud");
  const isPakket = () => keuze.geur.id !== "geen" && keuze.hart.id === "kloppend" && keuze.naam !== "";
  const normaal = () => keuze.beer.prijs + keuze.geur.prijs + keuze.hart.prijs + keuze.kraal.prijs;
  const totaal = () => normaal() - (isPakket() ? WINKEL.pakketKorting : 0);

  // Wat ontbreekt er nog voor de pakketkorting?
  function pakketTip() {
    if (isPakket()) return `<strong>Pakketkorting!</strong> Je bespaart ${euro(WINKEL.pakketKorting)}.`;
    const nodig = [keuze.geur.id === "geen" && "een geurtje", keuze.hart.id !== "kloppend" && "een kloppend hartje", !keuze.naam && "een naam op het paspoort"].filter(Boolean);
    return `Kies nog ${nodig.join(", ").replace(/, ([^,]*)$/, " en $1")} en krijg <strong>${euro(WINKEL.pakketKorting)} pakketkorting</strong>.`;
  }

  const knoppen = (lijst, sleutel) => `<div class="keuzes">${lijst.map((o) => `
      <button class="keuze" data-${sleutel}="${o.id}" aria-pressed="${keuze[sleutel].id === o.id}">
        ${o.img ? `<img src="${o.img}" alt="">` : o.icoon ? `<img class="ico" src="img/icons/${o.icoon}.svg" alt="">` : `<span class="emoji">${o.emoji}</span>`}
        ${o.naam}<small>${o.prijs ? (sleutel === "beer" ? euro(o.prijs) : "+ " + euro(o.prijs)) : "gratis"}</small>
      </button>`).join("")}</div>`;

  const schermen = [
    () => `<h3>1. Kies je beer</h3><div class="beer-keuzes">${knoppen(KNUFFELS, "beer")}</div>
      <div class="beer-info">
        <p class="beer-info-tekst"><strong>${keuze.beer.naam}</strong> – ${keuze.beer.tekst}</p>
        <dl class="beer-specs">
          <div><dt>Hoogte</dt><dd>${keuze.beer.hoogte}</dd></div>
          <div><dt>Leeftijd</dt><dd>${keuze.beer.leeftijd}</dd></div>
          <div><dt>Materiaal</dt><dd>${keuze.beer.materiaal}</dd></div>
          <div><dt>Wassen</dt><dd>${keuze.beer.wassen}</dd></div>
        </dl>
        <a class="tekst-pijl" href="product.html?id=${keuze.beer.id}">Alles over ${keuze.beer.naam}</a>
      </div>`,
    () => `<h3>2. Kies een geurtje</h3><p class="stap-uitleg">Een klein geurzakje in de buik. Blijft maandenlang lekker ruiken.</p>${knoppen(GEURTJES, "geur")}`,
    () => `<h3>3. Voeg een hartje toe</h3><p class="stap-uitleg">Elk beertje krijgt een hartje. Een kloppend hartje klopt als je op de buik drukt.</p>${knoppen(HARTJES, "hart")}`,
    () => `<h3>4. Maak een paspoort</h3><p class="stap-uitleg">Een echt berenpaspoort met naam en verjaardag. Gratis bij elke beer.</p>
      <div class="paspoort-veld">
        <label for="p-naam">Naam van je beer</label>
        <input id="p-naam" maxlength="20" placeholder="bv. Bruno" value="${esc(keuze.naam)}">
        <label for="p-dag">Verjaardag</label>
        <input id="p-dag" type="date" value="${keuze.verjaardag}">
      </div>`,
    () => `<h3>5. Optioneel: vriendschapsbandje</h3><p class="stap-uitleg">Twee bandjes: één voor jou en één voor je beer.</p>${knoppen(KRAALTJES, "kraal")}`,
  ];

  function toonPrijs() {
    const korting = isPakket();
    el.querySelector("#totaal").innerHTML = korting ? `${euro(totaal())} <s>${euro(normaal())}</s>` : euro(totaal());
    el.querySelector("#pakket-tip").innerHTML = pakketTip();
    el.querySelector("#pakket-tip").classList.toggle("gelukt", korting);
    el.querySelector("#voorbeeld-naam").textContent = keuze.naam ? `“${keuze.naam}”` : keuze.beer.naam;
  }

  function teken() {
    stappen.forEach((li, i) => {
      li.classList.toggle("actief", i === stap);
      li.classList.toggle("klaar", i < stap);
    });
    inhoud.innerHTML = schermen[stap]();
    // De beer springt even op als hij verandert, en bij een kloppend hartje klopt het echt.
    const img = el.querySelector("#voorbeeld-img");
    const kloppend = keuze.hart.id === "kloppend";
    if (!img.src.endsWith(keuze.beer.img)) {
      img.src = keuze.beer.img;
      img.classList.remove("pop"); void img.offsetWidth; img.classList.add("pop");
    }
    el.querySelector("#klop-hart").hidden = !kloppend;
    el.querySelector("#hart-label").hidden = !kloppend;
    el.querySelector("#vorige").hidden = stap === 0;
    el.querySelector("#volgende").textContent = stap === 4 ? "In mijn mandje" : "Volgende stap";
    toonPrijs();
    const naamVeld = el.querySelector("#p-naam");
    if (naamVeld) {
      naamVeld.addEventListener("input", () => { keuze.naam = naamVeld.value.trim(); toonPrijs(); });
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
      keuze.kraal.id !== "geen" && keuze.kraal.naam, keuze.naam && "paspoort: " + keuze.naam,
      isPakket() && "pakketprijs"].filter(Boolean).join(" · ");
    springHartjes(el.querySelector("#volgende"));
    Mandje.voegToe({ naam: keuze.beer.naam + " (op maat)", details, prijs: Math.round(totaal() * 100) / 100, img: keuze.beer.img });
    Mandje.open();
  });
  teken();
}

/* =========================================================
   8. Cadeaubon
   ========================================================= */
function cadeaubon() {
  const el = document.getElementById("cadeaubon");
  if (!el) return;
  const bon = { bedrag: 50, soort: "bedrag", voor: "", van: "", boodschap: "", post: false };
  const WORKSHOP = 19.95, POST = 2.5;

  function teken() {
    const waarde = bon.soort === "workshop" ? WORKSHOP : bon.bedrag;
    el.querySelector("#bon-waarde").textContent = bon.soort === "workshop" ? "1 workshop" : euro(waarde).replace(",00", "");
    el.querySelector("#bon-voor").textContent = bon.voor || "…";
    el.querySelector("#bon-van").textContent = bon.van || "…";
    el.querySelector("#bon-boodschap").textContent = bon.boodschap || "Veel knuffelplezier!";
    el.querySelector("#bon-totaal").textContent = euro(waarde + (bon.post ? POST : 0));
    el.querySelectorAll("[data-bedrag]").forEach((b) =>
      b.setAttribute("aria-pressed", bon.soort === "bedrag" ? +b.dataset.bedrag === bon.bedrag : b.dataset.bedrag === "workshop"));
  }
  el.querySelectorAll("[data-bedrag]").forEach((b) => b.addEventListener("click", () => {
    if (b.dataset.bedrag === "workshop") bon.soort = "workshop";
    else { bon.soort = "bedrag"; bon.bedrag = +b.dataset.bedrag; }
    teken();
  }));
  ["voor", "van", "boodschap"].forEach((v) => el.querySelector(`#c-${v}`).addEventListener("input", (e) => { bon[v] = e.target.value.trim(); teken(); }));
  el.querySelectorAll("[name=levering]").forEach((r) => r.addEventListener("change", () => { bon.post = r.value === "post" && r.checked; teken(); }));
  el.querySelector("#bon-koop").addEventListener("click", (e) => {
    const waarde = bon.soort === "workshop" ? WORKSHOP : bon.bedrag;
    springHartjes(e.currentTarget);
    Mandje.voegToe({
      naam: bon.soort === "workshop" ? "Cadeaubon workshop" : `Cadeaubon ${euro(waarde)}`,
      details: [bon.voor && "voor " + bon.voor, bon.van && "van " + bon.van, bon.post ? "per post" : "per e-mail"].filter(Boolean).join(" · "),
      prijs: waarde + (bon.post ? POST : 0), img: "img/icons/uniek.svg",
    });
    Mandje.open();
  });
  teken();
}

/* =========================================================
   9. Formulieren
   ========================================================= */
function formulieren() {
  // Onderwerp invullen vanuit een link, bv. contact.html?onderwerp=Workshop
  const onderwerp = param("onderwerp");
  const veld = document.getElementById("onderwerp");
  if (onderwerp && veld) veld.value = onderwerp;

  // Formulieren openen je mailprogramma met alles al ingevuld.
  // TODO: later koppelen aan een formulierdienst (bv. WPForms in WordPress) zodat het zonder mailprogramma werkt.
  document.querySelectorAll("form[data-demo]").forEach((f) => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      const d = new FormData(f);
      const regels = [...d.entries()].filter(([, v]) => v).map(([k, v]) => `${k[0].toUpperCase() + k.slice(1)}: ${v}`);
      location.href = `mailto:info@beer.be?subject=${encodeURIComponent((d.get("onderwerp") || "Vraag") + " via de website")}&body=${encodeURIComponent(regels.join("\n"))}`;
      f.querySelector(".melding").classList.add("zichtbaar");
    });
  });
  bestelPagina();
}

/* =========================================================
   Bestelpagina (bestellen.html): overzicht + gegevens -> e-mail
   ========================================================= */
function bestelPagina() {
  const el = document.getElementById("bestellen");
  if (!el) return;
  const items = Mandje.lees();
  if (!items.length) { el.innerHTML = `<p class="lead">Je mandje is leeg. <a href="shop.html">Kies eerst een beer →</a></p>`; return; }
  const sub = Mandje.subtotaal();
  const teken = () => {
    const afhalen = el.querySelector("[name=levering]:checked").value === "afhalen";
    const verzend = afhalen || sub >= WINKEL.gratisVanaf ? 0 : WINKEL.verzendkost;
    el.querySelector("#adres-velden").hidden = afhalen;
    el.querySelectorAll("#adres-velden input").forEach((i) => (i.required = !afhalen));
    el.querySelector("#b-verzend").textContent = verzend ? euro(verzend) : "Gratis";
    el.querySelector("#b-totaal").textContent = euro(sub + verzend);
    return { afhalen, verzend };
  };
  el.querySelector("#b-items").innerHTML = items.map((it) =>
    `<li><img src="${it.img}" alt=""><span>${it.aantal} × ${esc(it.naam)}${it.details ? `<small>${esc(it.details)}</small>` : ""}</span><strong>${euro(it.prijs * it.aantal)}</strong></li>`).join("");
  el.querySelector("#b-sub").textContent = euro(sub);
  el.querySelectorAll("[name=levering]").forEach((r) => r.addEventListener("change", teken));
  teken();
  el.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const { afhalen, verzend } = teken();
    const d = new FormData(e.target);
    const tekst = [
      "Hallo BEER., ik wil graag bestellen:", "",
      ...items.map((it) => `- ${it.aantal} x ${it.naam}${it.details ? " (" + it.details + ")" : ""}: ${euro(it.prijs * it.aantal)}`),
      "", `Verzending: ${verzend ? euro(verzend) : "gratis"}`, `Totaal: ${euro(sub + verzend)}`, "",
      `Naam: ${d.get("naam")}`, `E-mail: ${d.get("email")}`, `Telefoon: ${d.get("telefoon") || "-"}`,
      afhalen ? "Levering: ik haal af in Gent" : `Adres: ${d.get("straat")}, ${d.get("postcode")} ${d.get("gemeente")}`,
      d.get("opmerking") ? `Opmerking: ${d.get("opmerking")}` : "",
    ].join("\n");
    location.href = `mailto:info@beer.be?subject=${encodeURIComponent("Bestelling via de website")}&body=${encodeURIComponent(tekst)}`;
    el.querySelector(".melding").classList.add("zichtbaar");
  });
}

/* =========================================================
   10. Beweging
   ========================================================= */

// Kleine hartjes die uit een knop springen
function springHartjes(knop) {
  if (minderBeweging || !knop || !knop.animate) return;
  const r = knop.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    const h = document.createElement("span");
    h.className = "spring-hart";
    h.textContent = "♥";
    h.style.left = r.left + r.width / 2 + "px";
    h.style.top = r.top + "px";
    document.body.appendChild(h);
    const dx = (Math.random() - 0.5) * 120, dy = -60 - Math.random() * 60;
    h.animate(
      [{ transform: "translate(-50%, 0) scale(.6)", opacity: 1 },
       { transform: `translate(calc(-50% + ${dx * 0.6}px), ${dy * 0.6}px) scale(1)`, opacity: 1, offset: 0.6 },
       { transform: `translate(calc(-50% + ${dx}px), ${dy}px) scale(1.1) rotate(${dx / 4}deg)`, opacity: 0 }],
      { duration: 700 + Math.random() * 300, easing: "cubic-bezier(.2,.7,.3,1)" }
    ).onfinish = () => h.remove();
  }
}

// Een mini-beertje vliegt in een boogje van de kaart naar het mandje
function vliegNaarMandje(img) {
  const mandje = document.getElementById("mandje-knop");
  if (minderBeweging || !img || !mandje || !img.animate) return;
  const van = img.getBoundingClientRect(), naar = mandje.getBoundingClientRect();
  const kopie = img.cloneNode();
  kopie.className = "vlieg-beer";
  Object.assign(kopie.style, { left: van.left + "px", top: van.top + "px", width: van.width + "px", height: van.height + "px" });
  document.body.appendChild(kopie);
  const dx = naar.left + naar.width / 2 - (van.left + van.width / 2);
  const dy = naar.top + naar.height / 2 - (van.top + van.height / 2);
  kopie.animate([
    { transform: "translate(0, 0) scale(1)", opacity: 1 },
    { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 90}px) scale(.55) rotate(-12deg)`, opacity: 1, offset: 0.45 },
    { transform: `translate(${dx}px, ${dy}px) scale(.12) rotate(10deg)`, opacity: .6 },
  ], { duration: 800, easing: "cubic-bezier(.45,.05,.55,.95)" }).onfinish = () => kopie.remove();
}

// Kaarten en blokken schuiven zacht in beeld bij het scrollen
function onthul() {
  if (minderBeweging || !("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver((items) => items.forEach((it) => {
    if (!it.isIntersecting) return;
    it.target.classList.add("zichtbaar");
    io.unobserve(it.target);
    // daarna de klasse weghalen, zodat het hover-effect weer werkt
    setTimeout(() => it.target.classList.remove("onthul", "zichtbaar"), 1200);
  }), { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".kaart, .beloftes > div, .faq details, .split > *, .raster > *, .pakket, .samenstel-blok").forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight) return; // al in beeld: niets verbergen
    if (el.closest("form, #bestellen, #samensteller, #cadeaubon")) return; // formulieren nooit verbergen
    const broers = [...el.parentElement.children];
    el.style.setProperty("--d", (broers.indexOf(el) % 4) * 90 + "ms");
    el.classList.add("onthul");
    io.observe(el);
  });
}

// Schaduw onder de header zodra je scrolt
function headerSchaduw() {
  const h = document.querySelector(".site-header");
  const zet = () => h.classList.toggle("gescrold", scrollY > 10);
  addEventListener("scroll", zet, { passive: true });
  zet();
}

bouwLayout();
koppelMandje();
headerSchaduw();
toonKnuffels();
productPagina();
samensteller();
cadeaubon();
formulieren();
onthul();
