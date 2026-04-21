---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp er lektionsindholdsadministrationsapplikationen til [Lessons.church](https://lessons.church). Det giver en interface til oprettelse, organisering og publicering af kirkeslanglektionslæreplan, bygget med Next.js og React.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js 22+** og **Git** -- se [Forudsætninger](../setup/prerequisites)
- Konfigurér dit API-mål (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

:::warning
LessonsApp kræver Node.js 22 eller senere. Tidligere versioner understøttes ikke.
:::

## Setup

### 1. Klon lageret

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installer afhængigheder

```bash
cd LessonsApp
npm install
```

### 3. Konfigurér miljøvariabler

Kopier miljø-sampelfilen til `.env` og konfigurér API-endpoints:

```bash
cp dotenv.sample.txt .env
```

Opdater API-endpoint URL'erne til at pege på enten staging-API'en eller din lokale API-instans.

### 4. Start dev-serveren

```bash
npm run dev
```

Next.js dev-serveren starter på [http://localhost:3501](http://localhost:3501).

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start Next.js dev-server på port 3501 |
| `npm run build` | Produktionsbygning via Next.js |

## Tech Stack

- **Next.js 16** med TypeScript
- **React 19** til UI-komponenter
- **`@churchapps/apphelper*`** pakker til delte komponenter

:::info
LessonsApp kommunikerer med **LessonsApi** backend, som er en separat API fra hovedet ChurchApps Api. Sørg for, at dit miljø er konfigureret med det korrekte Lessons API-endpoint.
:::

## Installation

Produktionsbyggerier implementeres til **S3 + CloudFront**:

1. `npm run build` genererer det optimerede Next.js-build
2. Build-output synkroniseres til en S3-bucket
3. CloudFront-ugyldighed udløses for at betjene den nye version

:::tip
For detaljerede installationsinstruktioner, se vejledningen [Webapp-installation](../deployment/web-apps).
:::
