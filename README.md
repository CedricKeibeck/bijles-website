# Bijles Cedric — v4.0

Een statische one-page website voor GitHub Pages, met een eigen afgeronde visuele identiteit en twee swipe/drag-carrousels voor visualisaties en recensies.

## Belangrijk bij uploaden

De live site verwacht de portretfoto op:

`assets/cedric.jpg`

Deze foto zit bewust niet in dit ZIP-bestand. Laat je bestaande `assets/cedric.jpg` in GitHub dus staan.

## Persoonlijke gegevens aanpassen

Bewerk `site-config.js` voor:
- naam
- diploma
- huidige functie
- e-mail
- telefoonnummer
- tarief
- praktische afspraken
- recensies

## Domein

De SEO-bestanden verwijzen nu naar:

`https://bijlescedric.be/`

Dit is aangepast in `index.html`, `robots.txt` en `sitemap.xml`.

## Carrousels

De visualisaties en recensies gebruiken geen externe bibliotheek. `script.js` beheert:
- klikken op een kaart
- vorige/volgende knoppen
- navigatiepunten
- pijltjestoetsen
- slepen met muis
- swipen met touch

## GitHub Pages

Upload/vervang de bestanden in de root van je bestaande repository. `CNAME` bevat al `bijlescedric.be`. Laat `.nojekyll` staan en behoud `assets/cedric.jpg`.
