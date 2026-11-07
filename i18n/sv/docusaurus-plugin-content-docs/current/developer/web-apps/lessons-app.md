---
title: "LessonsApp"
description: "Installera LessonsApp, Next.js-lektionseditorn, lokalt på Node.js 22+, koppla den till ett lokalt LessonsApi och förstå bygg och S3/CloudFront-driftsättning."
---

# LessonsApp

<div class="article-intro">

LessonsApp är applikationen för innehållshantering av lektioner för [Lessons.church](https://lessons.church). Den erbjuder ett gränssnitt för att skapa, organisera och publicera kyrkliga lektionsplaner, och är byggd med Next.js och React.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **Node.js 22+** och **Git** -- se [Förutsättningar](../setup/prerequisites.md)
- Konfigurera ditt API-mål (lokal LessonsApi) -- se [Miljövariabler](../setup/environment-variables.md)

</div>

:::warning
LessonsApp kräver Node.js 22 eller senare. Tidigare versioner stöds inte.
:::

## Installation

### 1. Klona repositoryt

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installera beroenden

```bash
cd LessonsApp
npm install
```

### 3. Konfigurera miljövariabler

Kopiera exempelfilen för miljövariabler till `.env` och konfigurera API-slutpunkterna:

```bash
cp dotenv.sample.txt .env
```

Uppdatera URL:erna för API-slutpunkterna så att de pekar mot din lokala LessonsApi-instans (`http://localhost:8090`). Det tidigare staging-API:et för Lessons har avvecklats, så ersätt eventuella `api.staging.lessons.church`-URL:er som finns kvar i exempelfilen.

### 4. Starta utvecklingsservern

```bash
npm run dev
```

Next.js utvecklingsserver startar på [http://localhost:3501](http://localhost:3501).

## Viktiga kommandon

| Kommando | Beskrivning |
|---------|-------------|
| `npm run dev` | Starta Next.js utvecklingsserver på port 3501 |
| `npm run build` | Produktionsbygge via Next.js |

## Teknikstack

- **Next.js 16** med TypeScript
- **React 19** för UI-komponenter
- **`@churchapps/apphelper*`**-paket för delade komponenter

:::info
LessonsApp kommunicerar med backend-tjänsten **LessonsApi**, som är ett separat API från det huvudsakliga ChurchApps Api. Se till att din miljö är konfigurerad med rätt slutpunkt för Lessons API.
:::

## Driftsättning

Produktionsbyggen driftsätts till **S3 + CloudFront**:

1. `npm run build` genererar det optimerade Next.js-bygget
2. Byggresultatet synkroniseras till en S3-bucket
3. En CloudFront-invalidering utlöses för att servera den nya versionen

:::tip
För detaljerade instruktioner om driftsättning, se guiden [Driftsättning av webbappar](../deployment/web-apps.md).
:::
