---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin är administrationspanelen för kyrkan -- en React-ensidesapplikation byggd med Vite och Material-UI. Kyrkans personal använder den för att hantera personer, grupper, närvaro, gåvor, innehåll och mycket mer.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js 22+** och **Git** -- se [Förutsättningar](../setup/prerequisites)
- Konfigurera ditt API-mål (demo eller lokalt) -- se [Miljövariabler](../setup/environment-variables)

</div>

## Installation

### 1. Klona förvaret

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installera beroenden

```bash
cd B1Admin
npm install
```

### 3. Konfigurera miljövariabler

```bash
cp dotenv.sample.txt .env
```

Öppna `.env` och konfigurera API-slutpunkterna. Du kan peka dem mot antingen det gemensamma demo-API:et (`https://api.demo.churchapps.org`) eller din lokala API-instans. Exempelfilen kan fortfarande innehålla utgångna staging-URL:er; ersätt dem.

### 4. Starta utvecklingsservern

```bash
npm start
```

Detta startar Vite-utvecklingsservern. Appen blir tillgänglig i din webbläsare med hot module replacement aktiverat.

## Viktiga miljövariabler

| Variabel | Beskrivning |
|----------|-------------|
| `REACT_APP_STAGE` | Miljönamn (t.ex. `demo` som i exempelfilen, `prod` eller `selfhost`) |
| `PORT` | Port för utvecklingsservern (standard: `3101`) |
| `REACT_APP_*_API` | API-slutpunkts-URL:er för varje modul |

:::info
Skriptet `postinstall` kopierar språk- och CSS-filer från `@churchapps/apphelper`. Om komponenterna ser ostylade ut, kör `npm run postinstall` manuellt.
:::

## Viktiga kommandon

| Kommando | Beskrivning |
|----------|-------------|
| `npm start` | Startar Vite-utvecklingsservern |
| `npm run build` | Produktionsbygge via Vite |
| `npm run test` | Kör end-to-end-tester med Playwright |
| `npm run lint` | Kör ESLint med automatisk rättning |

## Teknikstack

- **React 19** med TypeScript
- **Vite** för byggverktyg och utvecklingsserver
- **Material-UI 7** för UI-komponenter
- **React Query 5** för serverstate
- **`@churchapps/apphelper*`**-paket för delade komponenter

## Driftsättning

Produktionsbyggen driftsätts till **S3 + CloudFront**:

1. `npm run build` genererar statiska tillgångar
2. Tillgångarna synkroniseras till en S3-bucket
3. En CloudFront-invalidering startas så att den nya versionen levereras

:::tip
För detaljerade driftsättningsinstruktioner, se guiden [Driftsättning av webbappen](../deployment/web-apps).
:::
