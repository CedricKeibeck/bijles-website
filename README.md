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


## Visualisaties

De drie Illustrator-voorbeelden staan al in `assets/visualisaties/`:

- `elektrische-machine.svg`
- `transformator.svg`
- `mmc-circuit.jpg`

De twee MATLAB-figuren worden bewust uit code gegenereerd. Open MATLAB vanuit de projectmap en voer uit:

```matlab
run('matlab/maak_visualisaties.m')
```

Daarna verschijnen automatisch:

- `assets/visualisaties/goniometrische-cirkel.png`
- `assets/visualisaties/omwentelingslichaam.png`

De website gebruikt voor beide MATLAB-voorbeelden een PNG, zodat de site ook werkt met MATLAB-versies waarin `exportgraphics` geen SVG ondersteunt. Het goniometriescript probeert daarnaast optioneel een SVG te maken via `exportgraphics` of `print -dsvg`.

> Let op: `assets/cedric.png` zit niet in deze download omdat de foto alleen in je GitHub-repository staat. Laat dat bestand gewoon staan wanneer je de overige bestanden vervangt.


## MATLAB-figuren (v3.2)
De aangeleverde MATLAB-exports staan nu rechtstreeks in `assets/visualisaties/`:
- `goniometrische-cirkel.svg`
- `omwentelingslichaam.svg`

De website gebruikt deze SVG-bestanden rechtstreeks. De MATLAB-scripts blijven in `matlab/` staan zodat je later nieuwe versies kunt genereren.
