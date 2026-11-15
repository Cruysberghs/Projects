# BEER. – website

Een website voor knuffelberen: shop, "Stel jouw BEER. samen", workshops, kinderfeestjes, kampjes, ons verhaal, FAQ en contact.

## Bekijken
Dubbelklik op `index.html`: de site opent in je browser. Je hebt niets te installeren.

## Waar pas ik wat aan?
| Wat | Waar |
|---|---|
| Teksten van een pagina | het `.html`-bestand van die pagina (bv. `workshops.html`) |
| Menu, footer, adres, telefoon | bovenaan in `js/main.js` (één keer aanpassen = overal aangepast) |
| Knuffels, prijzen, geurtjes | `KNUFFELS`, `GEURTJES`, … in `js/main.js` |
| Kleuren en lettertypes | bovenaan in `css/style.css` (`:root`) |
| Afbeeldingen | map `img/` – vervang de getekende beertjes door echte foto's |

## Nog te doen voor een echte winkel
- **Foto's**: echte foto's van de beren en workshops in `img/` zetten.
- **Online betalen (Bancontact)**: het mandje werkt al, maar "Afrekenen" is nog niet gekoppeld. Opties: Mollie, Stripe, of de shop overzetten naar Shopify / WooCommerce.
- **Contactformulier**: koppelen aan bv. Formspree of Netlify Forms zodat berichten in je mailbox komen.
- **Online boeken** van workshops/feestjes/kampjes: nu via het contactformulier.
- **Online zetten**: gratis via GitHub Pages, Netlify of Cloudflare Pages; daarna een eigen domeinnaam (bv. beer.be).
