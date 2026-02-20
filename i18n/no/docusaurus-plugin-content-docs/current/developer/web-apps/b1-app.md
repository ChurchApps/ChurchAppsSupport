---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App er den offentlige kirkemedlemsapplikasjonen bygget med Next.js. Den tilbyr medlemsopplevelsen inkludert profiler, gruppekataloger, direktestrømming og gavesider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+** og **Git** -- se [Forutsetninger](../setup/prerequisites)
- Konfigurer API-målet ditt (staging eller lokalt) -- se [Miljøvariabler](../setup/environment-variables)

</div>

:::warning
B1App krever Node.js 22 eller nyere. Tidligere versjoner støttes ikke.
:::

## Oppsett

### 1. Klon repositoriet

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installer avhengigheter

```bash
cd B1App
npm install
```

### 3. Konfigurer miljøvariabler

```bash
cp dotenv.sample.txt .env
```

Åpne `.env` og konfigurer `NEXT_PUBLIC_*_API`-endepunkt-URL-ene. Disse kan peke mot staging-API-et eller din lokale API-instans.

### 4. Start utviklingsserveren

```bash
npm run dev
```

Next.js-utviklingsserveren starter på [http://localhost:3301](http://localhost:3301).

## Viktige kommandoer

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start Next.js-utviklingsserver på port 3301 |
| `npm run build` | Produksjonsbygging via Next.js |
| `npm run test` | Kjør ende-til-ende-tester med Playwright |
| `npm run lint` | Kjør Next.js lint |

## Viktige miljøvariabler

| Variabel | Beskrivelse |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-endepunkt-URL-er for hver modul |

:::info
`postinstall`-skriptet kopierer lokaliserings- og CSS-filer fra `@churchapps/apphelper`. Hvis komponenter ser ut til å mangle stiler etter installering, kjør `npm run postinstall` manuelt.
:::

## Teknologistabel

- **Next.js 16** med TypeScript
- **React 19** for UI-komponenter
- **Material-UI 7** for designsystem
- **React Query 5** for serverstatus
- **`@churchapps/apphelper*`**-pakker for delte komponenter

## Distribusjon

Produksjonsbygginger distribueres til **S3 + CloudFront**:

1. `npm run build` genererer den optimaliserte Next.js-byggingen
2. Byggeutdata synkroniseres til en S3-bøtte
3. CloudFront-invalidering utløses for å levere den nye versjonen

:::tip
For detaljerte distribusjonsinstruksjoner, se guiden for [Webappdistribusjon](../deployment/web-apps).
:::
