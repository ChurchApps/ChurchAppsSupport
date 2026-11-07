---
title: "LessonsApp"
description: "Asenna LessonsApp (Next.js) paikallisesti Node.js 22+:lla, yhdistä se paikalliseen LessonsApi:in ja tutustu koontiin sekä S3/CloudFront-julkaisuun."
---

# LessonsApp

<div class="article-intro">

LessonsApp on sisällönhallintasovellus, jolla hallitaan [Lessons.church](https://lessons.church)-sivuston opetussisältöä. Sen avulla voi luoda, järjestää ja julkaista kirkkojen opetussuunnitelmia. Sovellus on rakennettu Next.js- ja React-kirjastoilla.

</div>

<div class="prereqs">
<h4>Ennen aloittamista</h4>

- Asenna **Node.js 22+** ja **Git** -- katso [Esivaatimukset](../setup/prerequisites.md)
- Määritä API-kohde (paikallinen LessonsApi) -- katso [Ympäristömuuttujat](../setup/environment-variables.md)

</div>

:::warning
LessonsApp vaatii Node.js 22:n tai uudemman version. Vanhempia versioita ei tueta.
:::

## Asennus

### 1. Kloonaa tietovarasto

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Asenna riippuvuudet

```bash
cd LessonsApp
npm install
```

### 3. Määritä ympäristömuuttujat

Kopioi ympäristömuuttujien mallitiedosto tiedostoon `.env` ja määritä API-päätepisteet:

```bash
cp dotenv.sample.txt .env
```

Päivitä API-päätepisteiden URL-osoitteet osoittamaan paikalliseen LessonsApi-instanssiisi (`http://localhost:8090`). Staging Lessons API on poistettu käytöstä, joten korvaa mallitiedostossa mahdollisesti olevat `api.staging.lessons.church`-URL-osoitteet.

### 4. Käynnistä kehityspalvelin

```bash
npm run dev
```

Next.js-kehityspalvelin käynnistyy osoitteessa [http://localhost:3501](http://localhost:3501).

## Tärkeimmät komennot

| Komento | Kuvaus |
|---------|--------|
| `npm run dev` | Käynnistä Next.js-kehityspalvelin portissa 3501 |
| `npm run build` | Tuotantoversion rakennus Next.js:llä |

## Teknologiat

- **Next.js 16** TypeScriptillä
- **React 19** käyttöliittymäkomponenteille
- **`@churchapps/apphelper*`**-paketit jaetuille komponenteille

:::info
LessonsApp kommunikoi **LessonsApi**-taustajärjestelmän kanssa, joka on erillinen API pääasiallisesta ChurchApps Api:sta. Varmista, että ympäristösi on määritetty oikealle Lessons API -päätepisteelle.
:::

## Julkaisu

Tuotantoversiot julkaistaan **S3 + CloudFront**-palveluun:

1. `npm run build` luo optimoidun Next.js-version
2. Rakennustulos synkronoidaan S3-säilöön
3. CloudFront-välimuistin mitätöinti käynnistetään, jotta palvellaan uusi versio

:::tip
Yksityiskohtaiset julkaisuohjeet löytyvät [Web App -julkaisu](../deployment/web-apps.md) -oppaasta.
:::
