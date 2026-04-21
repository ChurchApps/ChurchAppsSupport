---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App er den offentligt-vendt kirkmedlemsapplikation bygget med Next.js. Den giver medlemsoplevelsen, herunder profiler, gruppemappeoplysninger, live streaming og donationssider.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js 22+** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Konfigurér dit API-mål (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

:::warning
B1App kræver Node.js 22 eller senere. Tidligere versioner understøttes ikke.
:::

## Setup

### 1. Klon lageret

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installer afhængigheder

```bash
cd B1App
npm install
```

### 3. Konfigurér miljøvariabler

```bash
cp dotenv.sample.txt .env
```

Åbn `.env` og konfigurér `NEXT_PUBLIC_*_API`-endpoint URL'erne. Disse kan pege på staging-API'en eller din lokale API-instans.

### 4. Start dev-serveren

```bash
npm run dev
```

Next.js dev-serveren starter på [http://localhost:3301](http://localhost:3301).

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start Next.js dev-server på port 3301 |
| `npm run build` | Produktionsbygning via Next.js |
| `npm run test` | Kør end-to-end test med Playwright |
| `npm run lint` | Kør Next.js lint |

## Vigtige miljøvariabler

| Variable | Beskrivelse |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-endpoint URL'er for hvert modul |

:::info
`postinstall`-scriptet kopierer locale- og CSS-filer fra `@churchapps/apphelper`. Hvis komponenter ser uformatterede ud efter installation, skal du køre `npm run postinstall` manuelt.
:::

## Tech Stack

- **Next.js 16** med TypeScript
- **React 19** til UI-komponenter
- **Material-UI 7** til designsystem
- **React Query 5** til serverstatusadministration
- **`@churchapps/apphelper*`** pakker til delte komponenter

## Installation

Produktionsbyggerier implementeres til **S3 + CloudFront**:

1. `npm run build` genererer det optimerede Next.js-build
2. Build-output synkroniseres til en S3-bucket
3. CloudFront-ugyldighed udløses for at betjene den nye version

:::tip
For detaljerede installationsinstruktioner, se vejledningen [Webapp-installation](../deployment/web-apps).
:::
