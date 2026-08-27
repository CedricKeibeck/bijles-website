# Bijleswebsite — opgeschoonde GitHub Pages-versie

Deze map kan rechtstreeks de bestaande bestanden in je GitHub-repository `bijles-website` vervangen.

## Wat is aangepast?

- de layoutfout waarbij smalle secties tegen de linker browserrand stonden is opgelost;
- alle secties delen nu dezelfde centrale contentkolom / uitlijning;
- desktopbreedte en witruimte zijn verfijnd;
- de portretplaceholder kan niet meer als een kapotte afbeelding verschijnen;
- de lege reviewsectie en `Ervaringen`-link verdwijnen automatisch zolang er geen echte testimonials zijn;
- naam, e-mail, telefoon, opleiding en tarief zijn zonder vierkante haken ingevuld;
- mobiele navigatie en mobiele spacing zijn aangescherpt;
- basis SEO-metadata, `robots.txt` en `sitemap.xml` zijn toegevoegd voor de huidige GitHub Pages-URL.

## Publiceren

Upload/vervang alle bestanden uit deze map in de root van:

`https://github.com/cedrickeibeck/bijles-website`

Commit de wijzigingen op `main`. GitHub Pages publiceert daarna automatisch de nieuwe versie.

## Eigen portret toevoegen

1. Voeg je foto toe als bijvoorbeeld `assets/cedric.jpg`.
2. Pas in `site-config.js` aan:

```js
profileImage: "assets/cedric.jpg",
```

Gebruik bij voorkeur een verticale foto met voldoende ruimte rond je hoofd en schouders.

## Persoonlijke gegevens

Vrijwel alle gegevens staan in `site-config.js`. Daardoor hoef je voor toekomstige wijzigingen normaal niet in `index.html` te werken.
