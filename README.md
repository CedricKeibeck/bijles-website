# Bijleswebsite — GitHub Pages versie

Dit is een statische website (HTML/CSS/JavaScript). Daardoor is ze zeer geschikt voor **GitHub Pages**: geen server, database of build-stap nodig.

## 1. Eerst personaliseren

Open `site-config.js` en pas minstens deze velden aan:

- `firstName`
- `fullName`
- `education`
- `email`
- `phoneDisplay`
- `phoneInternational`
- `priceLabel`
- praktische voorwaarden

### Portretfoto

1. Zet je foto in de map `assets`, bijvoorbeeld `assets/profiel.jpg`.
2. Verander in `site-config.js`:

```js
profileImage: "assets/profiel.jpg",
```

Een verticale foto werkt het best.

### Echte testimonials

Voeg alleen echte recensies toe in `site-config.js`:

```js
testimonials: [
  { quote: "Heel duidelijke uitleg ...", author: "Student, 1e bachelor" },
  { quote: "...", author: "Leerling, 6e middelbaar" }
]
```

Zolang de lijst leeg is, toont de site bewust geen verzonnen recensies.

---

## 2. Lokaal bekijken

Je kunt `index.html` gewoon dubbelklikken. Nog beter is een kleine lokale webserver:

```bash
python -m http.server 8000
```

Ga daarna naar `http://localhost:8000`.

---

## 3. Publiceren met GitHub Pages

### Eenvoudigste methode

1. Maak op GitHub een nieuwe repository, bijvoorbeeld `bijles-website`.
2. Upload **alle bestanden en mappen uit deze map** naar de root van de repository.
3. Open op GitHub: **Settings → Pages**.
4. Kies bij **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Klik op **Save**.

Na enkele minuten staat de site normaal op:

`https://JOUW-GITHUB-NAAM.github.io/bijles-website/`

Wil je de site rechtstreeks op `https://JOUW-GITHUB-NAAM.github.io/`, noem de repository dan exact:

`JOUW-GITHUB-NAAM.github.io`

---

## 4. Eigen domeinnaam koppelen

GitHub Pages ondersteunt ook een eigen domein, bijvoorbeeld `jouwdomein.be`.

Ga naar **Settings → Pages → Custom domain** en vul je domein in. Daarna moet je bij je domeinprovider de DNS-records naar GitHub Pages laten verwijzen. Zet daarna ook **Enforce HTTPS** aan.

---

## Bestanden

- `index.html` — inhoud en structuur
- `styles.css` — ontwerp en responsive layout
- `site-config.js` — persoonlijke gegevens
- `script.js` — configuratie, mobiel menu en testimonials
- `assets/` — portret en favicon

De website gebruikt geen externe framework of betaalde dienst.
