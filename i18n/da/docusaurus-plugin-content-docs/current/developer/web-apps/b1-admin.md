---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin er kirkadministrationsdashboardet -- en React single-page applikation bygget med Vite og Material-UI. Kirkpersonale bruger den til at administrere mennesker, grupper, tilstedeværelse, donationer, indhold og mere.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js 22+** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Konfigurér dit API-mål (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Setup

### 1. Klon lageret

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installer afhængigheder

```bash
cd B1Admin
npm install
```

### 3. Konfigurér miljøvariabler

```bash
cp dotenv.sample.txt .env
```

Åbn `.env` og konfigurér API-endpoints. Du kan pege dem på enten staging-API'en eller din lokale API-instans.

### 4. Start dev-serveren

```bash
npm start
```

Dette starter Vite dev-serveren. Appen vil være tilgængelig i din browser med hot module replacement aktiveret.

## Vigtige miljøvariabler

| Variable | Beskrivelse |
|----------|-------------|
| `REACT_APP_STAGE` | Miljønavn (f.eks. `local`, `staging`, `prod`) |
| `PORT` | Dev-serverport (standard: `3101`) |
| `REACT_APP_*_API` | API-endpoint URL'er for hvert modul |

:::info
`postinstall`-scriptet kopierer locale- og CSS-filer fra `@churchapps/apphelper`. Hvis komponenter ser uformatterede ud, skal du køre `npm run postinstall` manuelt.
:::

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm start` | Start Vite dev-server |
| `npm run build` | Produktionsbygning via Vite |
| `npm run test` | Kør end-to-end test med Playwright |
| `npm run lint` | Kør ESLint med auto-fix |

## Tech Stack

- **React 19** med TypeScript
- **Vite** til build-værktøj og dev-server
- **Material-UI 7** til UI-komponenter
- **React Query 5** til serverstatusadministration
- **`@churchapps/apphelper*`** pakker til delte komponenter

## Installation

Produktionsbyggerier implementeres til **S3 + CloudFront**:

1. `npm run build` genererer statiske aktiver
2. Aktiver synkroniseres til en S3-bucket
3. CloudFront-ugyldighed udløses for at betjene den nye version

:::tip
For detaljerede installationsinstruktioner, se vejledningen [Webapp-installation](../deployment/web-apps).
:::
