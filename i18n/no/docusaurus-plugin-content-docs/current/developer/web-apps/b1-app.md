---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App er den offentlige medlemsappen for menigheter, bygget med Next.js. Den gir medlemsopplevelsen, inkludert profiler, gruppekataloger, direktesending og givingssider.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **Node.js 22+** og **Git** — se [Forutsetninger](../setup/prerequisites)
- Konfigurer API-målet ditt (demo eller lokalt) — se [Miljøvariabler](../setup/environment-variables)

</div>

:::warning
B1App krever Node.js 22 eller nyere. Tidligere versjoner støttes ikke.
:::

## Oppsett

### 1. Klon repositoryet

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

Åpne `.env` og konfigurer URL-ene for `NEXT_PUBLIC_*_API`-endepunktene. Disse kan peke til det delte demo-API-et (`https://api.demo.churchapps.org`) eller din lokale API-instans. Eksempelfilen kan fortsatt liste utrangerte staging-URL-er; erstatt dem.

### 4. Start utviklingsserveren

```bash
npm run dev
```

Next.js-utviklingsserveren starter på [http://localhost:3301](http://localhost:3301).

## Viktige kommandoer

| Kommando | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start Next.js-utviklingsserveren på port 3301 |
| `npm run build` | Produksjonsbygg via Next.js |
| `npm run test` | Kjør ende-til-ende-tester med Playwright |
| `npm run lint` | Kjør Next.js-lint |

## Viktige miljøvariabler

| Variabel | Beskrivelse |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API-endepunkt-URL-er for hver modul |

:::info
`postinstall`-skriptet kopierer språk- og CSS-filer fra `@churchapps/apphelper`. Hvis komponentene ser ustilte ut etter installasjon, kjør `npm run postinstall` manuelt.
:::

## Teknologistakk

- **Next.js 16** med TypeScript
- **React 19** for UI-komponenter
- **Material-UI 7** som designsystem
- **React Query 5** for serverstatus
- **`@churchapps/apphelper*`**-pakker for delte komponenter

## Distribusjon

Produksjonsbygg distribueres til **S3 + CloudFront**:

1. `npm run build` lager det optimaliserte Next.js-bygget
2. Byggutdataene synkroniseres til en S3-bøtte
3. En CloudFront-invalidering utløses for å servere den nye versjonen

:::tip
For detaljerte distribusjonsinstruksjoner, se veiledningen [Distribusjon av webapper](../deployment/web-apps).
:::
