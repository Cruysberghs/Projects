# BEER. – WordPress-thema

Een WordPress-thema in de stijl van het BEER.-ontwerp: warme crème- en perziktinten, terracotta knoppen en zachte knuffelberen.

## Installeren (5 minuten)

1. **Hosting met WordPress**: neem een hostingpakket met WordPress (bv. Combell, one.com of Hostinger). Bij de meeste hosts installeer je WordPress met één klik. Zet het account en de domeinnaam op naam van de eigenaar(s).
2. **Thema uploaden**: ga in WordPress naar *Weergave → Thema's → Nieuw thema → Thema uploaden* en kies **`beer.zip`** (in deze map).
3. **Activeren**: klik op *Activeren*. Het thema doet dan automatisch het volgende:
   - het maakt de pagina's Home, Shop, Stel jouw BEER. samen, Workshops, Kinderfeestjes, Kampjes, Ons verhaal, FAQ en Contact aan, al gevuld met tekst;
   - het stelt **Home** in als startpagina;
   - het zet de sitenaam op "BEER." (als die nog op de standaardnaam stond);
   - het verwijdert de lege standaard-"Voorbeeldpagina".

   Bestaande pagina's worden nooit overschreven.

## Aanpassen (zonder code)

| Wat | Waar in WordPress |
|---|---|
| Teksten, prijzen, afbeeldingen op een pagina | *Pagina's* → pagina openen → gewoon klikken en typen |
| Beer-afbeelding vervangen door een foto | klik op de afbeelding → *Vervangen* |
| Menu, logo, footer | *Weergave → Editor → Patronen → Template-onderdelen* (Header / Footer) |
| Kleuren en lettertypes | *Weergave → Editor → Stijlen* |
| Kant-en-klare blokken toevoegen | in een pagina op **+** klikken → *Patronen* → categorie **BEER.** |

Extra stijlen die je rechts bij een blok kan kiezen (onder *Stijlen*):
- **Groep → Kaart**: wit kaartje met afgeronde hoeken en schaduw
- **Groep → Prijsbadge**: het ronde "Vanaf € …"-stempel
- **Lijst → Hartjes**: opsomming met hartjes
- **Afbeelding → Wiebelen**: de beer wiebelt zachtjes

## Later uitbreiden

- **Contactformulier**: installeer de plugin *WPForms Lite* of *Contact Form 7* en zet het formulier op de Contact-pagina. Nu staat er een knop die een e-mail opent.
- **Webshop**: plugin *WooCommerce*, met *Mollie Payments for WooCommerce* om met Bancontact te betalen. De knoppen "Bestellen" op de Shop-pagina kunnen dan naar de echte producten wijzen.
- **Online boeken** van workshops, feestjes en kampjes: bv. de plugin *Amelia* of *Bookly*.

## Voor wie verder wil knutselen

- `beer/theme.json`: kleuren, lettertypes, knoppen
- `beer/style.css`: extra stijlen (kaart, prijsbadge, hartjes, …)
- `beer/patterns/`: de kant-en-klare blokken. Ze worden gemaakt met `hulpmiddelen/maak_patronen.py`:
  ```
  python3 hulpmiddelen/maak_patronen.py beer/patterns
  ```
- Een nieuwe `beer.zip` maken na wijzigingen:
  ```
  zip -r beer.zip beer
  ```

De lettertypes (Fredoka, Nunito, Caveat) zitten in het thema zelf, zodat er niets bij Google geladen wordt (beter voor de privacy/GDPR). Ze vallen onder de SIL Open Font License.

Getest met WordPress 6.6. Het thema heeft minstens WordPress 6.6 nodig.
