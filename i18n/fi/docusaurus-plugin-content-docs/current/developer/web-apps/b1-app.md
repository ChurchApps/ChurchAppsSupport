---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App on seurakunnan jäsenille suunnattu julkinen sovellus, joka on rakennettu Next.js-kehyksellä. Se tarjoaa jäsenkokemuksen, johon kuuluvat profiilit, ryhmähakemistot, suoratoistot ja lahjoitussivut.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js 22+** ja **Git** – katso [Esivaatimukset](../setup/prerequisites)
- Määritä API-kohde (demo tai paikallinen) – katso [Ympäristömuuttujat](../setup/environment-variables)

</div>

:::warning
B1App vaatii Node.js 22:n tai uudemman version. Aiempia versioita ei tueta.
:::

## Asennus

### 1. Kloonaa repositorio

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Asenna riippuvuudet

```bash
cd B1App
npm install
```

### 3. Määritä ympäristömuuttujat

```bash
cp dotenv.sample.txt .env
```

Avaa `.env` ja määritä `NEXT_PUBLIC_*_API`-päätepisteiden URL-osoitteet. Nämä voivat osoittaa jaettuun demo-API:in (`https://api.demo.churchapps.org`) tai paikalliseen API-instanssiisi. Esimerkkitiedosto saattaa yhä listata poistettuja testiympäristön URL-osoitteita, joten korvaa ne.

### 4. Käynnistä kehityspalvelin

```bash
npm run dev
```

Next.js-kehityspalvelin käynnistyy osoitteessa [http://localhost:3301](http://localhost:3301).

## Tärkeimmät komennot

| Komento | Kuvaus |
|---------|--------|
| `npm run dev` | Käynnistä Next.js-kehityspalvelin portissa 3301 |
| `npm run build` | Tuotantoversion rakentaminen Next.js:llä |
| `npm run test` | Suorita päästä päähän -testit Playwrightilla |
| `npm run lint` | Suorita Next.js-lint |

## Tärkeimmät ympäristömuuttujat

| Muuttuja | Kuvaus |
|----------|--------|
| `NEXT_PUBLIC_*_API` | Kunkin moduulin API-päätepisteiden URL-osoitteet |

:::info
`postinstall`-skripti kopioi kielitiedostot ja CSS-tiedostot paketista `@churchapps/apphelper`. Jos komponentit näyttävät asennuksen jälkeen tyylittömiltä, suorita `npm run postinstall` manuaalisesti.
:::

## Teknologiapino

- **Next.js 16** TypeScriptillä
- **React 19** käyttöliittymäkomponentteihin
- **Material-UI 7** suunnittelujärjestelmään
- **React Query 5** palvelimen tilan hallintaan
- **`@churchapps/apphelper*`**-paketit jaettuihin komponentteihin

## Julkaisu

Tuotantoversiot julkaistaan **S3 + CloudFront** -palveluun:

1. `npm run build` luo optimoidun Next.js-version
2. Buildin tulos synkronoidaan S3-bucketiin
3. CloudFront-välimuistin mitätöinti käynnistetään, jotta palvelu alkaa tarjota uuden version

:::tip
Yksityiskohtaiset julkaisuohjeet löydät oppaasta [Web-sovellusten julkaisu](../deployment/web-apps).
:::
