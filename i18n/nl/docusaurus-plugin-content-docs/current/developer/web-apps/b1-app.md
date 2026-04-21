---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App is de publiek beschikbare kerkledapp gebouwd met Next.js. Het biedt de ledervaring met inbegrip van profielen, groepsdirectory's, live streamen en donatiebladzijden.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js 22+** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Configureer uw API-doel (staging of lokaal) -- zie [Environment Variables](../setup/environment-variables)

</div>

:::warning
B1App vereist Node.js 22 of later. Eerdere versies worden niet ondersteund.
:::

## Setup

### 1. Kloon de repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installeer afhankelijkheden

```bash
cd B1App
npm install
```

### 3. Configureer omgevingsvariabelen

```bash
cp dotenv.sample.txt .env
```

Open `.env` en configureer de `NEXT_PUBLIC_*_API`-eindpunt-URL's. Deze kunnen naar de staging API of uw lokale API-instantie wijzen.

### 4. Start de dev-server

```bash
npm run dev
```

De Next.js-dev-server start op [http://localhost:3301](http://localhost:3301).

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm run dev` | Start Next.js-dev-server op poort 3301 |
| `npm run build` | Productiebouw via Next.js |
| `npm run test` | End-to-end tests met Playwright uitvoeren |
| `npm run lint` | Next.js lint uitvoeren |

## Sleutel-omgevingsvariabelen

| Variable | Beschrijving |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-eindpunt-URL's voor elke module |

:::info
Het `postinstall`-script kopieert locale- en CSS-bestanden van `@churchapps/apphelper`. Als onderdelen na installatie unstyled zijn, voert u handmatig `npm run postinstall` uit.
:::

## Tech Stack

- **Next.js 16** met TypeScript
- **React 19** voor UI-onderdelen
- **Material-UI 7** voor designsysteem
- **React Query 5** voor serverstaat
- **`@churchapps/apphelper*`**-pakketten voor gedeelde onderdelen

## Implementatie

Productie-builds worden naar **S3 + CloudFront** geïmplementeerd:

1. `npm run build` genereert de geoptimaliseerde Next.js-build
2. Build-output wordt gesynchroniseerd met een S3-bucket
3. CloudFront-invalidatie wordt geactiveerd om de nieuwe versie te serveren

:::tip
Zie de [Web App Deployment](../deployment/web-apps)-gids voor gedetailleerde implementatie-instructies.
:::
