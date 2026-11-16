# BEER. – website

Een website voor knuffelberen: shop, "Stel jouw BEER. samen", workshops, kinderfeestjes, kampjes, ons verhaal, FAQ en contact.

## Bekijken
Dubbelklik op `index.html`: de site opent in je browser. Je hebt niets te installeren.

## Waar pas ik wat aan?
| Wat | Waar |
|---|---|
| Teksten van een pagina | het `.html`-bestand van die pagina (bv. `workshops.html`) |
| Menu, footer, adres, telefoon | bovenaan in `js/main.js` (één keer aanpassen = overal aangepast) |
| Knuffels, prijzen, productinfo | `KNUFFELS` bovenaan in `js/main.js` (hoogte, materiaal, leeftijd en wassen zijn **voorbeelden**) |
| Verzendkosten, gratis verzending, pakketkorting | `WINKEL` bovenaan in `js/main.js` |
| Seizoensbalk (Sinterklaas, Kerst) | `SEIZOEN` bovenaan in `js/main.js` |
| Openingsuren (**voorbeeld**) | `OPENINGSUREN` bovenaan in `js/main.js` en op `contact.html` |
| Bestellen | `bestellen.html`: opent het mailprogramma met de bestelling erin, tot online betalen gekoppeld is |
| Extraatjes in het mandje | `EXTRAS` bovenaan in `js/main.js` |
| Kleuren en lettertypes | bovenaan in `css/style.css` (`:root`) |
| Illustraties | map `img/ill/` (beren, logo, icoontjes, doodles). Een afbeelding vervangen = een nieuw bestand met dezelfde naam erin zetten |

## Nog te doen voor een echte winkel
- **Foto's**: echte foto's van de beren en workshops in `img/` zetten.
- **Online betalen (Bancontact)**: het mandje werkt al, maar "Afrekenen" is nog niet gekoppeld. Opties: Mollie, Stripe, of de shop overzetten naar Shopify / WooCommerce.
- **Contactformulier**: koppelen aan bv. Formspree of Netlify Forms zodat berichten in je mailbox komen.
- **Online boeken** van workshops/feestjes/kampjes: nu via het contactformulier.
- **Online zetten**: gratis via GitHub Pages, Netlify of Cloudflare Pages; daarna een eigen domeinnaam (bv. beer.be).
