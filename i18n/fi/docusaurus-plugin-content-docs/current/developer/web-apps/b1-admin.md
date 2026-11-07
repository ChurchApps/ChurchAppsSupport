---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin on kirkkojen hallintanäkymä, React-pohjainen yhden sivun sovellus, joka on rakennettu Vite- ja Material-UI-kirjastoilla. Seurakunnan henkilökunta käyttää sitä henkilöiden, ryhmien, läsnäolon, lahjoitusten, sisällön ja muiden asioiden hallintaan.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js 22+** ja **Git** -- katso [Esivaatimukset](../setup/prerequisites)
- Määritä API-kohde (demo tai paikallinen) -- katso [Ympäristömuuttujat](../setup/environment-variables)

</div>

## Asennus

### 1. Kloonaa repositorio

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Asenna riippuvuudet

```bash
cd B1Admin
npm install
```

### 3. Määritä ympäristömuuttujat

```bash
cp dotenv.sample.txt .env
```

Avaa `.env` ja määritä API-päätepisteet. Voit osoittaa ne joko jaettuun demo-rajapintaan (`https://api.demo.churchapps.org`) tai omaan paikalliseen API-instanssiisi. Esimerkkitiedostossa saattaa vielä olla vanhentuneita staging-osoitteita; korvaa ne.

### 4. Käynnistä kehityspalvelin

```bash
npm start
```

Tämä käynnistää Vite-kehityspalvelimen. Sovellus on käytettävissä selaimessa, ja hot module replacement on käytössä.

## Keskeiset ympäristömuuttujat

| Muuttuja | Kuvaus |
|----------|-------------|
| `REACT_APP_STAGE` | Ympäristön nimi (esim. `demo` esimerkkitiedoston mukaan, `prod` tai `selfhost`) |
| `PORT` | Kehityspalvelimen portti (oletus: `3101`) |
| `REACT_APP_*_API` | Kunkin moduulin API-päätepisteiden URL-osoitteet |

:::info
`postinstall`-skripti kopioi kielitiedostot ja CSS-tiedostot paketista `@churchapps/apphelper`. Jos komponentit näyttävät tyylittömiltä, suorita `npm run postinstall` manuaalisesti.
:::

## Keskeiset komennot

| Komento | Kuvaus |
|---------|-------------|
| `npm start` | Käynnistä Vite-kehityspalvelin |
| `npm run build` | Tuotantoversion rakentaminen Vitellä |
| `npm run test` | Suorita päästä päähän -testit Playwrightilla |
| `npm run lint` | Suorita ESLint automaattisilla korjauksilla |

## Teknologiapino

- **React 19** ja TypeScript
- **Vite** rakennustyökaluihin ja kehityspalvelimeen
- **Material-UI 7** käyttöliittymäkomponentteihin
- **React Query 5** palvelimen tilan hallintaan
- **`@churchapps/apphelper*`**-paketit jaettuihin komponentteihin

## Julkaisu

Tuotantoversiot julkaistaan **S3 + CloudFront** -palveluun:

1. `npm run build` luo staattiset resurssit
2. Resurssit synkronoidaan S3-bucketiin
3. CloudFront-välimuistin mitätöinti käynnistetään, jotta uusi versio tarjoillaan

:::tip
Yksityiskohtaiset julkaisuohjeet löydät [Web-sovellusten julkaisu](../deployment/web-apps) -oppaasta.
:::
