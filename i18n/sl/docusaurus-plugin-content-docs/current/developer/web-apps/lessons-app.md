---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp je aplikacija za upravljanje vsebin lekcij za [Lessons.church](https://lessons.church). Omogoča ustvarjanje, urejanje in objavljanje učnih načrtov za cerkveni pouk. Zgrajena je z Next.js in React.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js 22+** in **Git** -- glejte [Predpogoji](../setup/prerequisites)
- Nastavite cilj API-ja (lokalni LessonsApi) -- glejte [Okoljske spremenljivke](../setup/environment-variables)

</div>

:::warning
LessonsApp zahteva Node.js 22 ali novejši. Starejše različice niso podprte.
:::

## Namestitev

### 1. Kloniranje repozitorija

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Namestitev odvisnosti

```bash
cd LessonsApp
npm install
```

### 3. Konfiguracija okoljskih spremenljivk

Vzorčno datoteko okoljskih spremenljivk kopirajte v `.env` in nastavite naslove API-jev:

```bash
cp dotenv.sample.txt .env
```

Posodobite URL-je API-jev, da bodo kazali na vaš lokalni primerek LessonsApi (`http://localhost:8090`). Testni API Lessons je bil ukinjen, zato zamenjajte vse URL-je `api.staging.lessons.church`, ki so ostali v vzorčni datoteki.

### 4. Zagon razvojnega strežnika

```bash
npm run dev
```

Razvojni strežnik Next.js se zažene na naslovu [http://localhost:3501](http://localhost:3501).

## Ključni ukazi

| Ukaz | Opis |
|------|------|
| `npm run dev` | Zažene razvojni strežnik Next.js na vratih 3501 |
| `npm run build` | Izdela produkcijsko različico prek Next.js |

## Tehnološki sklad

- **Next.js 16** s TypeScript
- **React 19** za uporabniške vmesnike
- Paketi **`@churchapps/apphelper*`** za skupne komponente

:::info
LessonsApp komunicira z zaledjem **LessonsApi**, ki je ločen API od glavnega ChurchApps Api. Prepričajte se, da je vaše okolje nastavljeno s pravilnim naslovom API-ja Lessons.
:::

## Objava

Produkcijske različice se objavljajo v **S3 + CloudFront**:

1. `npm run build` ustvari optimizirano različico Next.js
2. Izhod gradnje se sinhronizira v shrambo S3
3. Sproži se invalidacija CloudFront, da se prikaže nova različica

:::tip
Podrobna navodila za objavo najdete v vodniku [Objava spletne aplikacije](../deployment/web-apps).
:::
