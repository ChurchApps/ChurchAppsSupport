---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp er applikasjonen for leksjonsinnholdsadministrasjon for [Lessons.church](https://lessons.church). Den tilbyr et grensesnitt for å opprette, organisere og publisere kirkens leksjonspensum, bygget med Next.js og React.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Konfigurer API-målet ditt (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

:::warning
LessonsApp krever Node.js 22 eller nyere. Tidligere versjoner støttes ikke.
:::

## Oppsett

### 1. Klon repositoriet

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installer avhengigheter

```bash
cd LessonsApp
npm install
```

### 3. Konfigurer miljøvariabler

Kopier miljøeksempelfilen til `.env` og konfigurer API-endepunktene:

```bash
cp dotenv.sample.txt .env
```

Oppdater API-endepunkt-URL-ene til å peke mot enten staging-API-et eller din lokale API-instans.

### 4. Start utviklingsserveren

```bash
npm run dev
```

Next.js-utviklingsserveren starter på [http://localhost:3501](http://localhost:3501).

## Viktige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start Next.js-utviklingsserver på port 3501 |
| `npm run build` | Produksjonsbygging via Next.js |

## Teknologistabel

- **Next.js 16** med TypeScript
- **React 19** for UI-komponenter
- **`@churchapps/apphelper*`**-pakker for delte komponenter

:::info
LessonsApp kommuniserer med **LessonsApi**-backenden, som er et separat API fra hoved-ChurchApps Api. Sørg for at miljøet ditt er konfigurert med riktig Lessons API-endepunkt.
:::

## Distribusjon

Produksjonsbygginger distribueres til **S3 + CloudFront**:

1. `npm run build` genererer den optimaliserte Next.js-byggingen
2. Byggeutdata synkroniseres til en S3-bøtte
3. CloudFront-invalidering utløses for å levere den nye versjonen

:::tip
For detaljerte distribusjonsinstruksjoner, se guiden for [Webappdistribusjon](../deployment/web-apps).
:::
