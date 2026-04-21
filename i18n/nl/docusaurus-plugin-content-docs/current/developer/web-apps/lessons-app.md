---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp is de lessinhoudsbeheer-toepassing voor [Lessons.church](https://lessons.church). Het biedt een interface voor het maken, organiseren en publiceren van kerklesses-curriculum, gebouwd met Next.js en React.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js 22+** en **Git** -- zie [Prerequisites](../setup/prerequisites)
- Configureer uw API-doel (staging of lokaal) -- zie [Environment Variables](../setup/environment-variables)

</div>

:::warning
LessonsApp vereist Node.js 22 of later. Eerdere versies worden niet ondersteund.
:::

## Setup

### 1. Kloon de repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installeer afhankelijkheden

```bash
cd LessonsApp
npm install
```

### 3. Configureer omgevingsvariabelen

Kopieer het omgevingsvoorbeeldbestand naar `.env` en configureer de API-eindpunten:

```bash
cp dotenv.sample.txt .env
```

Werk de API-eindpunt-URL's bij om naar de staging API of uw lokale API-instantie te wijzen.

### 4. Start de dev-server

```bash
npm run dev
```

De Next.js-dev-server start op [http://localhost:3501](http://localhost:3501).

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm run dev` | Start Next.js-dev-server op poort 3501 |
| `npm run build` | Productiebouw via Next.js |

## Tech Stack

- **Next.js 16** met TypeScript
- **React 19** voor UI-onderdelen
- **`@churchapps/apphelper*`**-pakketten voor gedeelde onderdelen

:::info
LessonsApp communiceert met de **LessonsApi** backend, wat een afzonderlijke API is van de hoofdsteurapps Api. Zorg ervoor dat uw omgeving is geconfigureerd met het juiste Lessons API-eindpunt.
:::

## Implementatie

Productie-builds worden naar **S3 + CloudFront** geïmplementeerd:

1. `npm run build` genereert de geoptimaliseerde Next.js-build
2. Build-output wordt gesynchroniseerd met een S3-bucket
3. CloudFront-invalidatie wordt geactiveerd om de nieuwe versie te serveren

:::tip
Zie de [Web App Deployment](../deployment/web-apps)-gids voor gedetailleerde implementatie-instructies.
:::
