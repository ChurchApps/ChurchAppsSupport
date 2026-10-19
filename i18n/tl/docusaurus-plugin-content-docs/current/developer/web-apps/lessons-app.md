---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

Ang LessonsApp ang application sa pamamahala ng nilalaman ng aralin para sa [Lessons.church](https://lessons.church). Nagbibigay ito ng interface para sa paggawa, pag-aayos, at paglalathala ng mga kurikulum ng aralin ng simbahan, at binuo gamit ang Next.js at React.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js 22+** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-configure ang iyong API target (lokal na LessonsApi) -- tingnan ang [Environment Variables](../setup/environment-variables)

</div>

:::warning
Nangangailangan ang LessonsApp ng Node.js 22 o mas bago. Hindi suportado ang mas naunang bersyon.
:::

## Setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. I-install ang mga dependency

```bash
cd LessonsApp
npm install
```

### 3. I-configure ang mga environment variable

Kopyahin ang sample file ng environment sa `.env` at i-configure ang mga API endpoint:

```bash
cp dotenv.sample.txt .env
```

I-update ang mga URL ng API endpoint para ituro ang iyong lokal na LessonsApi instance (`http://localhost:8090`). Wala na ang staging Lessons API, kaya palitan ang anumang URL na `api.staging.lessons.church` na naiwan sa sample file.

### 4. Simulan ang dev server

```bash
npm run dev
```

Magsisimula ang Next.js dev server sa [http://localhost:3501](http://localhost:3501).

## Mga Pangunahing Command

| Command | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang Next.js dev server sa port 3501 |
| `npm run build` | Production build sa pamamagitan ng Next.js |

## Tech Stack

- **Next.js 16** na may TypeScript
- **React 19** para sa mga UI component
- **`@churchapps/apphelper*`** na mga package para sa mga shared component

:::info
Nakikipag-ugnayan ang LessonsApp sa **LessonsApi** backend, na hiwalay na API mula sa pangunahing ChurchApps Api. Siguraduhing tama ang Lessons API endpoint na naka-configure sa iyong environment.
:::

## Deployment

Ang mga production build ay dine-deploy sa **S3 + CloudFront**:

1. Ang `npm run build` ay gumagawa ng optimized na Next.js build
2. Ang output ng build ay isini-sync sa isang S3 bucket
3. Pinapatakbo ang CloudFront invalidation para maihain ang bagong bersyon

:::tip
Para sa detalyadong tagubilin sa deployment, tingnan ang gabay na [Web App Deployment](../deployment/web-apps).
:::
