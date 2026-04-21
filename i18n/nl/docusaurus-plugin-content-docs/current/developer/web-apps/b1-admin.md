---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin is het kerkbeheerbereidingsdashboard -- een React single-page application gebouwd met Vite en Material-UI. Kerkpersoneel gebruikt het om personen, groepen, aanwezigheid, donaties, inhoud en meer te beheren.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js 22+** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Configureer uw API-doel (staging of lokaal) -- zie [Environment Variables](../setup/environment-variables)

</div>

## Setup

### 1. Kloon de repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installeer afhankelijkheden

```bash
cd B1Admin
npm install
```

### 3. Configureer omgevingsvariabelen

```bash
cp dotenv.sample.txt .env
```

Open `.env` en configureer de API-eindpunten. U kunt ze naar de staging API of uw lokale API-instantie wijzen.

### 4. Start de dev-server

```bash
npm start
```

Dit start de Vite-dev-server. De app is beschikbaar in uw browser met hot module vervanging ingeschakeld.

## Sleutel-omgevingsvariabelen

| Variable | Beschrijving |
|----------|-------------|
| `REACT_APP_STAGE` | Omgevingnaam (bijv. `local`, `staging`, `prod`) |
| `PORT` | Dev-server-poort (standaard: `3101`) |
| `REACT_APP_*_API` | API-eindpunt-URL's voor elke module |

:::info
Het `postinstall`-script kopieert locale- en CSS-bestanden van `@churchapps/apphelper`. Als onderdelen unstyled zijn, voert u handmatig `npm run postinstall` uit.
:::

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm start` | Start Vite-dev-server |
| `npm run build` | Productiebouw via Vite |
| `npm run test` | End-to-end tests met Playwright uitvoeren |
| `npm run lint` | ESLint met auto-fix uitvoeren |

## Tech Stack

- **React 19** met TypeScript
- **Vite** voor build-tooling en dev-server
- **Material-UI 7** voor UI-onderdelen
- **React Query 5** voor serverstaat
- **`@churchapps/apphelper*`**-pakketten voor gedeelde onderdelen

## Implementatie

Productie-builds worden naar **S3 + CloudFront** geïmplementeerd:

1. `npm run build` genereert statische assets
2. Assets worden gesynchroniseerd met een S3-bucket
3. CloudFront-invalidatie wordt geactiveerd om de nieuwe versie te serveren

:::tip
Zie de [Web App Deployment](../deployment/web-apps)-gids voor gedetailleerde implementatie-instructies.
:::
