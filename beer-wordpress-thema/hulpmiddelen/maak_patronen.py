"""Genereert de blokpatronen van het BEER.-thema (patterns/*.php)."""
import json, sys, os

OUT = sys.argv[1]

def attrs(a):
    return (" " + json.dumps(a, ensure_ascii=False, separators=(",", ":"))) if a else ""

def cls(*c):
    return " ".join(x for x in c if x)

PAD = {"top": "var:preset|spacing|60", "bottom": "var:preset|spacing|60"}
PADCSS = "padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"

def group(inner, *, full=False, bg=None, gradient=None, className=None, layout=None, pad=False, tag="div", align=None, style_extra=None):
    a, classes, css = {}, ["wp-block-group"], []
    if tag != "div": a["tagName"] = tag
    if className: a["className"] = className; classes.append(className)
    if full: a["align"] = "full"; classes.append("alignfull")
    elif align: a["align"] = align; classes.append("align" + align)
    st = {}
    if pad: st["spacing"] = {"padding": PAD}; css.append(PADCSS)
    if style_extra: st.update(style_extra[0]); css += [style_extra[1]] if style_extra[1] else []
    if st: a["style"] = st
    if bg: a["backgroundColor"] = bg; classes += [f"has-{bg}-background-color", "has-background"]
    if gradient: a["gradient"] = gradient; classes += [f"has-{gradient}-gradient-background", "has-background"]
    a["layout"] = layout or {"type": "constrained"}
    s = f' style="{";".join(css)}"' if css else ""
    return f'<!-- wp:group{attrs(a)} -->\n<{tag} class="{cls(*classes)}"{s}>{inner}</{tag}>\n<!-- /wp:group -->'

def section(inner, **kw):
    return group(group(inner, align="wide", layout={"type": "default"}), full=True, pad=True, **kw)

def h(text, level=2, center=False, className=None):
    a = {}
    if center: a["textAlign"] = "center"
    if level != 2: a["level"] = level
    if className: a["className"] = className
    c = cls("wp-block-heading", "has-text-align-center" if center else "", className)
    return f'<!-- wp:heading{attrs(a)} -->\n<h{level} class="{c}">{text}</h{level}>\n<!-- /wp:heading -->'

def p(text, center=False, size=None, className=None):
    a, c = {}, []
    if center: a["align"] = "center"; c.append("has-text-align-center")
    if className: a["className"] = className; c.append(className)
    if size: a["fontSize"] = size; c.append(f"has-{size}-font-size")
    ca = f' class="{cls(*c)}"' if c else ""
    return f"<!-- wp:paragraph{attrs(a)} -->\n<p{ca}>{text}</p>\n<!-- /wp:paragraph -->"

def btns(*items, center=False):
    a = {"layout": {"type": "flex", "justifyContent": "center"}} if center else {}
    inner = ""
    for label, link, *rest in items:
        soort = rest[0] if rest else None
        klasse = "beer-koop" if soort == "koop" else ("is-style-outline" if soort else None)
        ba = {"className": klasse} if klasse else {}
        inner += f'<!-- wp:button{attrs(ba)} -->\n<div class="{cls("wp-block-button", klasse or "")}"><a class="wp-block-button__link wp-element-button" href="{link}">{label}</a></div>\n<!-- /wp:button -->'
    return f'<!-- wp:buttons{attrs(a)} -->\n<div class="wp-block-buttons">{inner}</div>\n<!-- /wp:buttons -->'

def img(file, alt="", width=None, center=False, className=None, link=None):
    a = {}
    if width: a["width"] = width
    a["sizeSlug"] = "full"
    a["linkDestination"] = "custom" if link else "none"
    if center: a["align"] = "center"
    if className: a["className"] = className
    c = cls("wp-block-image", "aligncenter" if center else "", "size-full", "is-resized" if width else "", className)
    s = f' style="width:{width}"' if width else ""
    tag = f'<img src="<?php echo beer_img( \'{file}\' ); ?>" alt="{alt}"{s}/>'
    if link: tag = f'<a href="{link}">{tag}</a>'
    return f'<!-- wp:image{attrs(a)} -->\n<figure class="{c}">{tag}</figure>\n<!-- /wp:image -->'

def ul(items, className="is-style-hartjes"):
    a = {"className": className} if className else {}
    li = "".join(f"<!-- wp:list-item -->\n<li>{i}</li>\n<!-- /wp:list-item -->" for i in items)
    return f'<!-- wp:list{attrs(a)} -->\n<ul class="{cls("wp-block-list", className)}">{li}</ul>\n<!-- /wp:list -->'

def cols(*cs, center=True):
    a = {"verticalAlignment": "center"} if center else {}
    inner = ""
    for c in cs:
        ca = {"verticalAlignment": "center"} if center else {}
        inner += f'<!-- wp:column{attrs(ca)} -->\n<div class="{cls("wp-block-column", "is-vertically-aligned-center" if center else "")}">{c}</div>\n<!-- /wp:column -->'
    return f'<!-- wp:columns{attrs(a)} -->\n<div class="{cls("wp-block-columns", "are-vertically-aligned-center" if center else "")}">{inner}</div>\n<!-- /wp:columns -->'

def grid(inner, minw="14rem", n=3):
    return group(inner, layout={"type": "grid", "columnCount": n, "minimumColumnWidth": minw})

def kaart(inner):
    return group(inner, className="is-style-kaart")

def badge(boven, prijs, onder):
    return group(p(f"{boven}<br><strong>{prijs}</strong>{onder}"), className="is-style-prijs-badge")

def details(q, a):
    return f'<!-- wp:details -->\n<details class="wp-block-details"><summary>{q}</summary>{p(a)}</details>\n<!-- /wp:details -->'

def ico(naam, size="44px", center=True, className=None):
    return img(f"icons/{naam}.svg", "", size, center=center, className=className)

def rij(naam, html, size="26px"):
    """Icoontje + tekst naast elkaar."""
    return group(ico(naam, size, center=False) + p(html), className="beer-ico-rij",
                 layout={"type": "flex", "flexWrap": "nowrap", "verticalAlignment": "center"})

IMG = lambda f: f"<?php echo beer_img( '{f}' ); ?>"
L = lambda slug="": f"<?php echo beer_link( '{slug}' ); ?>"

def save(slug, title, body, inserter=True, desc=""):
    head = f"<?php\n/**\n * Title: {title}\n * Slug: beer/{slug}\n * Categories: beer\n"
    if desc: head += f" * Description: {desc}\n"
    if not inserter: head += " * Inserter: no\n"
    head += " */\n?>\n"
    with open(os.path.join(OUT, slug + ".php"), "w") as f:
        f.write(head + body + "\n")

# ---------------- Header & footer ----------------
save("header", "Header", group(
    group(
        group(img("ill/logo.webp", "BEER.", "34px", link=L()) + "<!-- wp:site-title {\"level\":0} /-->",
              layout={"type": "flex", "flexWrap": "nowrap"})
        + '<!-- wp:navigation {"overlayBackgroundColor":"creme","overlayTextColor":"tekst","layout":{"type":"flex","justifyContent":"right"}} -->\n<?php echo beer_menu_links(); // phpcs:ignore ?>\n<!-- /wp:navigation -->',
        align="wide", layout={"type": "flex", "flexWrap": "nowrap", "justifyContent": "space-between"}),
    full=True, bg="creme", className="beer-header",
    style_extra=({"spacing": {"padding": {"top": "12px", "bottom": "12px"}}, "border": {"bottom": {"color": "var:preset|color|perzik", "width": "1px"}}},
                 "border-bottom-color:var(--wp--preset--color--perzik);border-bottom-width:1px;padding-top:12px;padding-bottom:12px")),
    inserter=False)

save("footer", "Footer", section(
    cols(
        group(img("ill/logo.webp", "", "34px", link=L()) + "<!-- wp:site-title {\"level\":0} /-->", layout={"type": "flex", "flexWrap": "nowrap"})
        + p("Jouw knuffel, jouw verhaal.")
        + p("Een knuffel voor het leven ♡", size="x-large", className="beer-hand"),
        h("Ontdek", 3) + ul([f'<a href="{L(s)}">{n}</a>' for s, n in
            [("shop", "Shop"), ("samenstellen", "Stel jouw BEER. samen"), ("cadeaubon", "Cadeaubon"), ("workshops", "Workshops"), ("kinderfeestjes", "Kinderfeestjes"), ("kampjes", "Kampjes"), ("faq", "Veelgestelde vragen"), ("ons-verhaal", "Ons verhaal")]], className="beer-footer-links"),
        h("Contact", 3) + rij("mail", '<a href="mailto:info@beer.be">info@beer.be</a>', "18px")
        + rij("telefoon", '<a href="tel:+32479123456">+32 479 12 34 56</a>', "18px")
        + rij("locatie", "Straatnaam 12, 9000 Gent", "18px"),
        center=False)
    + p("© <?php echo esc_html( gmdate( 'Y' ) ); ?> BEER. – Met liefde gemaakt", center=True, size="small"),
    bg="perzik", className="beer-footer"), inserter=False)

# ---------------- Home ----------------
save("hero", "Welkom (hero)", section(cols(
    p("Een knuffel met een verhaal", className="beer-bovenkop")
    + h('Welkom bij<br><span style="font-size:1.55em;font-weight:600">BEER.</span>', 1)
    + p("Niet zomaar een knuffel. Een vriendje dat je zelf kiest, vult en helemaal van jou maakt.", size="large")
    + btns(("Stel jouw BEER. samen →", L("samenstellen"), "koop"), ("Bekijk de knuffels", L("shop"), True))
    + p("Vanaf € 22,95 · Gratis verzending vanaf € 40", size="small", className="beer-hero-klein")
    + p(f'Liever samen knutselen? <a href="{L("workshops")}">Workshops</a> <a href="{L("kinderfeestjes")}">Kinderfeestjes</a> <a href="{L("kampjes")}">Kampjes</a>', className="beer-hero-snel"),
    group(img("ill/groot-hero.webp", "Een grote beer knuffelt een kleine beer", "460px", center=True, className="is-style-wiebel"),
          className="beer-hero-beeld"))
, gradient="zacht"), desc="Grote welkomstbanner met beer en knop.")

kenmerken = [("zelf-vullen", "Zelf vullen"), ("geurtje", "Heerlijk geurtje"), ("kloppend-hartje", "Kloppend hartje"), ("paspoort", "Berenpaspoort"), ("bandje", "Vriendschapsbandje")]
save("kenmerken", "Kenmerken", group(group(
    grid("".join(group(img(f"ill/icoon-{i}.png", "", None, center=True, className="beer-kenmerk-ico") + p(f"<strong>{t}</strong>", center=True, size="small"),
                       style_extra=({"spacing": {"blockGap": "0"}}, "")) for i, t in kenmerken), "9rem", 5),
    align="wide", layout={"type": "default"}), full=True, bg="wit", className="beer-kenmerken",
    style_extra=({"spacing": {"padding": {"top": "var:preset|spacing|40", "bottom": "var:preset|spacing|40"}}},
                 "padding-top:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--40)")))

KNUFFELS = [("ill/classic.webp", "Classic Bear", "€ 24,95", "De tijdloze favoriet in warm honingbruin."),
            ("ill/brownie.webp", "Brownie Bear", "€ 24,95", "Chocoladebruin en extra knuffelbaar."),
            ("ill/dreamy.webp", "Dreamy Bear", "€ 24,95", "Zacht vanillekleurig, voor zoete dromen."),
            ("ill/little.webp", "Little Bear", "€ 22,95", "Klein maar dapper, past in elke rugzak.")]
PSLUG = lambda naam: "shop/" + naam.lower().replace(" ", "-")
save("knuffels", "Onze knuffels", section(
    p("Onze knuffelvriendjes", className="beer-bovenkop")
    + h("Onze knuffels")
    + p("Vier zachte karaktertjes, ieder met een eigen verhaal.")
    + grid("".join(kaart(img(f, n, "150px", center=True, link=L(PSLUG(n))) + h(f'<a href="{L(PSLUG(n))}">{n}</a>', 3) + p(t, size="small")
                         + p(f"<strong>{pr}</strong>", className="beer-prijs") + btns(("Bekijk →", L(PSLUG(n)))))
                   for f, n, pr, t in KNUFFELS), "13rem", 4), className="beer-knuffels"), desc="Vier knuffelkaarten met prijs.")

save("samenstellen-cta", "Stel jouw BEER. samen (blok)", section(cols(
    group(img("ill/beer-hart.webp", "Een beer met een groot hart", "280px", center=True), className="beer-samenstel-beeld"),
    p("Helemaal van jou", className="beer-bovenkop")
    + h("Stel jouw BEER. samen")
    + p("Kies je beer, geef hem een geurtje en een kloppend hartje, en maak een vriend voor het leven.")
    + p("<span>1</span> Kies je beer <span>2</span> Geef hem een geur <span>3</span> Een hartje erbij", className="beer-stap-chips")
    + btns(("Begin met samenstellen →", L("samenstellen"), "koop"))), className="beer-samenstel-blok", bg="wit"))

BEELD = {"workshops": "workshop-knutselen", "kinderfeestjes": "kinderfeestje", "kampjes": "kampjes"}
AANBOD = [("Workshops", "Samen knutselen, samen herinneringen maken. Vanaf € 19,95 per kind.", "workshops", "Ontdek →"),
          ("Kinderfeestjes", "Een onvergetelijk feestje met al je vriendjes. Vanaf € 17,50 per kind.", "kinderfeestjes", "Formules →"),
          ("Kampjes", "Een week vol knutselplezier, spel en creativiteit. € 125 per week.", "kampjes", "Ontdek →")]
save("samen-beleven", "Samen beleven", section(
    p("Samen knutselen", center=True, className="beer-bovenkop")
    + h("Samen beleven", center=True)
    + p("Samen knutselen, vieren en herinneringen maken.", center=True)
    + grid("".join(kaart(img(f"ill/groot-{BEELD[s]}.webp", "", None, center=True, className="beer-kaart-beeld") + h(t, 3) + p(x) + p(f'<a href="{L(s)}"><strong>{b}</strong></a>', className="beer-tekst-pijl")) for t, x, s, b in AANBOD), "15rem"), className="beer-beleven"))

save("beloftes", "Onze beloftes", section(
    h("Onze beloftes", center=True)
    + grid("".join(group(ico(i, "48px") + h(t, 3, center=True) + p(x, center=True))
                   for i, t, x in [("veilig", "Veilig &amp; kwalitatief", "Getest volgens de Europese speelgoednormen."),
                                   ("uniek", "Persoonlijk &amp; uniek", "Geen twee beren zijn hetzelfde."),
                                   ("met-liefde", "Met liefde gemaakt", "Elke knuffel wordt met zorg afgewerkt.")]), "14rem"),
    bg="wit", className="beer-beloftes"))

# ---------------- Samenstellen ----------------
STAPPEN = [("Kies je beer", "Classic, Brownie, Dreamy of Little Bear."),
           ("Kies een geurtje", "Vanille, aardbei of lavendel."),
           ("Voeg een hartje toe", "Een zacht hartje, of een kloppend hartje."),
           ("Maak een paspoort", "Geef je beer een naam en een verjaardag."),
           ("Optioneel: kraaltjes", "Een vriendschapsbandje voor jou én je beer.")]
save("stappen", "Stel jouw BEER. samen (stappen)", section(
    p(f'<a href="{L()}">Home</a> › Stel jouw BEER. samen', size="small")
    + h("Stel jouw BEER. samen", 1, center=True)
    + p("In een paar simpele stappen creëer je een unieke knuffelvriend.", center=True, size="large")
    + grid("".join(kaart(p(f"<strong>{n}</strong>", center=True, size="x-large", className="beer-hand") + h(t, 3, center=True) + p(x, center=True, size="small"))
                   for n, (t, x) in enumerate(STAPPEN, 1)), "11rem", 5)
    + h("Kies je beer", 3, center=True)
    + grid("".join(kaart(img(f"ill/{b}.webp", n, "110px", center=True, link=L(PSLUG(n)))
                         + p(f'<strong><a href="{L(PSLUG(n))}">{n}</a></strong><br>{pr}', center=True)
                         + p(f"{hoogte} · vanaf 0 jaar<br>Zacht pluche · wasbaar op 30°C", center=True, size="small")
                         + p(f'<a href="{L(PSLUG(n))}">Meer info →</a>', center=True, className="beer-tekst-pijl"))
                   for b, n, pr, hoogte in [("classic", "Classic Bear", "€ 24,95", "30 cm"), ("brownie", "Brownie Bear", "€ 24,95", "30 cm"),
                                             ("dreamy", "Dreamy Bear", "€ 24,95", "30 cm"), ("little", "Little Bear", "€ 22,95", "20 cm")]), "10rem", 4)
    + p("Vanaf <strong>€ 22,95</strong> · geurtje + € 2,50 · kloppend hartje + € 4,95 · bandje + € 3,50", center=True)
    + btns(("Kom langs in de winkel →", L("contact"), "koop"), ("Boek een workshop", L("workshops"), True), center=True),
    gradient="zacht"))

# ---------------- Aanbodpagina's ----------------
def aanbod(slug, titel, lead, punten, knop, beren, prijs, per, info_titel, info):
    beeld = group(img(beren[0], beren[1], "100%", center=True)
                  + badge("Vanaf", prijs, per), className="beer-badge-houder")
    body = section(cols(h(titel, 1) + p(lead, size="large") + ul(punten) + btns((knop, L("contact"), "koop")), beeld), gradient="zacht")
    body += "\n\n" + section(h(info_titel, center=True) + grid("".join(kaart(h(t, 3, center=True) + p(x, center=True)) for t, x in info), "14rem"), bg="wit")
    save(slug, titel, body)

aanbod("workshops", "Workshops", "Samen knutselen, samen herinneringen maken.",
       ["Maak je eigen knuffelbeer", "Kies een geurtje", "Versier je berenpaspoort"], "Reserveer een workshop →",
       ("ill/groot-workshop-knuffelen.webp", "Twee kinderen knuffelen hun zelfgemaakte beer"), "€ 19,95", "per kind",
       "Hoe werkt een workshop?",
       [("1. Welkom", "We ontvangen je in ons atelier in Gent met een drankje."),
        ("2. Knutselen", "Je kiest je beer, vult hem zelf en geeft hem een hartje en geurtje."),
        ("3. Mee naar huis", "Met een eigen paspoort en een grote knuffel. Duur: ± 1,5 uur.")])

aanbod("kinderfeestjes", "Kinderfeestjes", "Vier een onvergetelijk feestje met BEER. en al je vriendjes!",
       ["Kies jouw formule", "Maak, speel en geniet", "Elk kind gaat naar huis met een eigen beer"], "Boek een feestje →",
       ("ill/groot-kinderfeestje.webp", "Een beer met feesthoedje tussen ballonnen en cadeautjes"), "€ 17,50", "per kind",
       "Onze formules",
       [("Mini-feestje", "<strong>€ 17,50 per kind</strong><br>1,5 uur · Little Bear · paspoort"),
        ("Berenfeest", "<strong>€ 24,50 per kind</strong><br>2 uur · beer naar keuze · geurtje · drankje &amp; taart"),
        ("Megafeest", "<strong>€ 32,50 per kind</strong><br>2,5 uur · alles van het Berenfeest + kloppend hartje &amp; bandje")])

aanbod("kampjes", "Kampjes", "Een week vol knutselplezier, spel en creativiteit.",
       ["Creatief knutselatelier", "Spel en avontuur", "Nieuwe vriendjes"], "Schrijf je in →",
       ("ill/groot-kampjes.webp", "Een beer met rugzak en kaart bij een tent en een kampvuur"), "€ 125", "per week",
       "Praktisch",
       [("Wanneer?", "Tijdens de krokus-, paas-, zomer- en herfstvakantie. Ma–vr, 9u tot 16u."),
        ("Voor wie?", "Kinderen van 5 tot 12 jaar, in kleine groepjes."),
        ("Inbegrepen", "Alle materiaal, een vieruurtje en je eigen BEER. om mee te nemen.")])

# ---------------- Ons verhaal, FAQ, contact ----------------
save("ons-verhaal", "Ons verhaal", section(cols(
    h("Ons verhaal", 1)
    + p("BEER. is ontstaan uit een eenvoudig idee: een knuffel die met je mee is, waar je ook gaat.", size="large")
    + p("Een vriendje om te koesteren, een maatje voor het leven.")
    + p("Vertel hier jullie eigen verhaal: wie zit erachter, hoe kwam het idee, en waarom beren?")
    + btns(("Leer ons kennen →", L("contact"))),
    group(img("ill/groot-ons-verhaal.webp", "Een grote en een kleine beer lezen samen een boek", "480px", center=True), className="beer-hero-beeld")), gradient="zacht"))

FAQ = [("Hoe werkt het zelf vullen?", "In onze winkel of tijdens een workshop vul je je beer zelf met zachte vulling, zo stevig of zo zacht als je wil."),
       ("Welke geurtjes zijn er?", "Vanille, aardbei en lavendel. Het geurtje zit in een klein zakje in de buik en blijft maandenlang lekker ruiken."),
       ("Is de knuffel wasbaar?", "Ja! Haal het hartje en geurzakje eruit en was je beer op 30°C in een kussensloop. Laat hem daarna aan de lucht drogen."),
       ("Hoe lang is de levertijd?", "We verzenden binnen 2 tot 3 werkdagen in België. Een beer op maat kan een dagje langer duren."),
       ("Kan ik mijn bestelling retourneren?", "Niet-gepersonaliseerde knuffels kan je binnen 14 dagen terugsturen. Beren met een naam of paspoort zijn uniek en kunnen niet geruild worden."),
       ("Hoe betaal ik?", "Veilig met Bancontact, of ter plaatse in de winkel.")]
save("faq", "Veelgestelde vragen", group(
    h("Veelgestelde vragen", 1, center=True)
    + p("Hier vind je de antwoorden op de meestgestelde vragen.", center=True)
    + "".join(details(q, a) for q, a in FAQ)
    + p(f'Staat je vraag er niet bij? <a href="{L("contact")}">Stuur ons een bericht</a>.', center=True),
    full=True, pad=True, className="beer-faq"))

save("contact", "Contact", section(cols(
    h("Contact", 1)
    + p("Heb je een vraag, een idee of wil je iets reserveren? Laat het ons weten!", size="large")
    + rij("mail", '<a href="mailto:info@beer.be">info@beer.be</a>')
    + rij("telefoon", '<a href="tel:+32479123456">+32 479 12 34 56</a>')
    + rij("locatie", "Onze locatie<br>Straatnaam 12, 9000 Gent")
    + btns(("Stuur een bericht →", "mailto:info@beer.be")),
    img("ill/groot-contact.webp", "Een zwaaiende beer achter een laptop", "440px", center=True))))

# ---------------- Verkoop ----------------
save("seizoensbalk", "Seizoensbalk", """<?php
// Pas de teksten en data (maand-dag) hier aan. De eerste die past, wordt getoond.
$beer_seizoenen = array(
	array( '11-01', '12-02', 'Bestel vóór 2 december en je beer is op tijd bij de Sint', 'shop', 'Naar de shop' ),
	array( '12-03', '12-19', 'Bestel vóór 19 december en je beer ligt op tijd onder de kerstboom', 'shop', 'Naar de shop' ),
	array( '12-20', '12-31', 'Te laat voor een pakje? Een cadeaubon kan je meteen geven', 'cadeaubon', 'Cadeaubon' ),
);
$beer_s = array( '', '', 'Gratis verzending in België vanaf € 40', 'shop', 'Naar de shop' );
foreach ( $beer_seizoenen as $beer_rij ) {
	if ( wp_date( 'm-d' ) >= $beer_rij[0] && wp_date( 'm-d' ) <= $beer_rij[1] ) { $beer_s = $beer_rij; break; }
}
?>
""" + group(p('<?php echo esc_html( $beer_s[2] ); ?> <a href="<?php echo beer_link( $beer_s[3] ); ?>"><?php echo esc_html( $beer_s[4] ); ?> →</a>', center=True, size="small"),
            full=True, bg="bruin", className="beer-seizoensbalk",
            style_extra=({"spacing": {"padding": {"top": "8px", "bottom": "8px"}}}, "padding-top:8px;padding-bottom:8px")),
     inserter=False)

save("pakket", "Het complete knuffelpakket", group(group(group(
    cols(group(img("ill/beer-hart.webp", "", "200px", center=True), className="beer-pakket-beeld"),
         p("Meest gekozen", className="beer-pakket-label")
         + h("Het complete knuffelpakket", 3)
         + ul(["Beer naar keuze", "Geurtje naar keuze", "Kloppend hartje", "Eigen berenpaspoort"])
         + p("Vanaf <strong>€ 27,95</strong> <s>€ 30,40</s>", className="beer-pakket-prijs")
         + btns(("Stel je pakket samen →", L("samenstellen"), "koop"))),
    className="beer-pakket"), align="wide", layout={"type": "default"}), full=True,
    style_extra=({"spacing": {"padding": {"bottom": "var:preset|spacing|60"}}}, "padding-bottom:var(--wp--preset--spacing--60)")),
    desc="Pakketaanbieding: beer + geurtje + kloppend hartje + paspoort.")

# Productpagina's. LET OP: hoogte, materiaal, leeftijd en wassen zijn VOORBEELDEN.
PRODUCTEN = [
    ("ill/classic", "Classic Bear", "€ 24,95", "Classic Bear is de beer waar het allemaal mee begon. Zacht honingbruin pluche, een lieve snuit en armen die gemaakt zijn om te knuffelen.", "30 cm"),
    ("ill/brownie", "Brownie Bear", "€ 24,95", "Brownie Bear heeft een diepe chocoladebruine vacht en is net iets steviger gevuld. Een echte bodyguard voor onder het donsdeken.", "30 cm"),
    ("ill/dreamy", "Dreamy Bear", "€ 24,95", "Dreamy Bear is licht als een wolkje. Met een geurtje lavendel erbij is hij de perfecte slaapvriend.", "30 cm"),
    ("ill/little", "Little Bear", "€ 22,95", "Little Bear is klein genoeg voor de boekentas en groot genoeg voor alle geheimen. Ideaal als eerste beer of als broertje of zusje.", "20 cm"),
]
def spec(k, v):
    return group(p(f"<strong>{k}</strong>") + p(v), className="beer-spec",
                 layout={"type": "grid", "columnCount": 2})
for f, naam, prijs, tekst, hoogte in PRODUCTEN:
    slug = naam.lower().replace(" ", "-")
    anderen = [x for x in PRODUCTEN if x[1] != naam]
    body = section(
        p(f'<a href="{L("shop")}">Shop</a> › {naam}', size="small")
        + cols(
            group(img(f + ".webp", naam, "70%", center=True), className="beer-galerij-groot"),
            h(naam, 1)
            + p(prijs, className="beer-product-prijs")
            + p(tekst, size="large")
            + btns((f"Bestel {naam} →", f"mailto:info@beer.be?subject=Bestelling%20{naam.replace(' ', '%20')}", "koop"))
            + p(f'<a href="{L("samenstellen")}"><strong>Of maak hem helemaal van jou: geurtje, kloppend hartje en paspoort →</strong></a>')
            + grid(rij("uniek", "Levering in 2–3 werkdagen") + rij("hart", "Gratis verzending vanaf € 40")
                   + rij("met-liefde", "14 dagen bedenktijd") + rij("veilig", "Veilig betalen met Bancontact"), "12rem", 2)
            + group(spec("Hoogte", hoogte) + spec("Materiaal", "Zacht pluche, gerecycleerde vulling")
                    + spec("Leeftijd", "Vanaf 0 jaar") + spec("Wassen", "Handwas of 30°C in een kussensloop"), className="beer-specs"),
            center=False)
        + h("Ook leuk", center=True)
        + grid("".join(kaart(img(a + ".webp", n, "120px", center=True, link=L(PSLUG(n))) + h(f'<a href="{L(PSLUG(n))}">{n}</a>', 3, center=True) + p(pr, center=True))
                       for a, n, pr, _, _ in anderen), "9rem", 3))
    save("product-" + slug, naam + " (productpagina)", body)

save("cadeaubon", "Cadeaubon", section(cols(
    h("Cadeaubon", 1)
    + p("Twijfel je welke beer? Geef een cadeaubon. Inwisselbaar voor knuffels, workshops, feestjes en kampjes, en een jaar lang geldig.", size="large")
    + group(img("ill/beer-sjaal.png", "", "170px", className="beer-bon-beer")
            + p("BEER.", className="beer-bon-logo") + p("CADEAUBON", className="beer-bon-titel")
            + p("€ 50", className="beer-bon-waarde") + p("Voor <strong>Lotte</strong><br>Van <strong>Oma en opa</strong>")
            + p("Veel knuffelplezier!", className="beer-hand beer-bon-boodschap"), className="beer-bon"),
    kaart(h("Kies je bon", 3)
          + ul(["€ 25, € 50, € 75 of € 100", "Of: 1 workshop voor een kind (€ 19,95)", "Met een persoonlijke boodschap", "Per e-mail (gratis) of op mooi papier per post (+ € 2,50)"])
          + p("Laat ons weten welke bon je wil, voor wie en van wie. Je krijgt hem binnen één werkdag.")
          + btns(("Bestel een cadeaubon →", "mailto:info@beer.be?subject=Cadeaubon", "koop")))),
    gradient="zacht"), desc="Cadeaubon met voorbeeld en bestelknop.")

print("ok", sorted(os.listdir(OUT)))
