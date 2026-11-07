---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App är den publika medlemsappen för kyrkor, byggd med Next.js. Den erbjuder medlemsupplevelsen, inklusive profiler, gruppkataloger, livesändningar och donationssidor.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js 22+** och **Git** -- se [Förutsättningar](../setup/prerequisites)
- Konfigurera ditt API-mål (demo eller lokalt) -- se [Miljövariabler](../setup/environment-variables)

</div>

:::warning
B1App kräver Node.js 22 eller senare. Tidigare versioner stöds inte.
:::

## Installation

### 1. Klona repositoryt

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installera beroenden

```bash
cd B1App
npm install
```

### 3. Konfigurera miljövariabler

```bash
cp dotenv.sample.txt .env
```

Öppna `.env` och konfigurera `NEXT_PUBLIC_*_API`-slutpunkterna. Dessa kan peka mot det delade demo-API:et (`https://api.demo.churchapps.org`) eller mot din lokala API-instans. Exempelfilen kan fortfarande innehålla inaktuella staging-URL:er; ersätt dem.

### 4. Starta utvecklingsservern

```bash
npm run dev
```

Next.js-utvecklingsservern startas på [http://localhost:3301](http://localhost:3301).

## Viktiga kommandon

| Kommando | Beskrivning |
|---------|-------------|
| `npm run dev` | Starta Next.js-utvecklingsservern på port 3301 |
| `npm run build` | Produktionsbygge via Next.js |
| `npm run test` | Kör end-to-end-tester med Playwright |
| `npm run lint` | Kör Next.js-lint |

## Viktiga miljövariabler

| Variabel | Beskrivning |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-slutpunkts-URL:er för varje modul |

:::info
`postinstall`-skriptet kopierar locale- och CSS-filer från `@churchapps/apphelper`. Om komponenterna ser ostylade ut efter installationen, kör `npm run postinstall` manuellt.
:::

## Teknikstack

- **Next.js 16** med TypeScript
- **React 19** för UI-komponenter
- **Material-UI 7** för designsystemet
- **React Query 5** för serverstatus
- **`@churchapps/apphelper*`**-paket för delade komponenter

## Driftsättning

Produktionsbyggen driftsätts till **S3 + CloudFront**:

1. `npm run build` genererar den optimerade Next.js-builden
2. Byggets utdata synkroniseras till en S3-bucket
3. En CloudFront-invalidering utlöses för att servera den nya versionen

:::tip
För detaljerade driftsättningsinstruktioner, se guiden [Driftsättning av webbappar](../deployment/web-apps).
:::
