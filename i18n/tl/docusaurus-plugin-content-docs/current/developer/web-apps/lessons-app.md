---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

Ang LessonsApp ay ang lesson content management application para sa [Lessons.church](https://lessons.church). Nagbibigay ito ng interface para sa paglikha, pag-organisa, at pag-publish ng mga kurikulum ng aralin sa simbahan, na binuo gamit ang Next.js at React.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js 22+** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- I-configure ang iyong API target (staging o lokal) -- tingnan ang [Mga Variable ng Kapaligiran](../setup/environment-variables)

</div>

:::warning
Nangangailangan ang LessonsApp ng Node.js 22 o mas bago. Ang mga naunang bersyon ay hindi sinusuportahan.
:::

## Pag-setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Mag-install ng mga dependency

```bash
cd LessonsApp
npm install
```

### 3. I-configure ang mga variable ng kapaligiran

Kopyahin ang environment sample file sa `.env` at i-configure ang mga API endpoint:

```bash
cp dotenv.sample.txt .env
```

I-update ang mga URL ng API endpoint upang tumuro sa staging API o sa iyong lokal na API instance.

### 4. Simulan ang dev server

```bash
npm run dev
```

Ang Next.js dev server ay naglulunsad sa [http://localhost:3501](http://localhost:3501).

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang Next.js dev server sa port 3501 |
| `npm run build` | Production build sa pamamagitan ng Next.js |

## Tech Stack

- **Next.js 16** na may TypeScript
- **React 19** para sa mga UI component
- Mga **`@churchapps/apphelper*`** package para sa mga shared component

:::info
Ang LessonsApp ay nakikipag-ugnayan sa **LessonsApi** backend, na isang hiwalay na API mula sa pangunahing ChurchApps Api. Siguraduhing ang iyong kapaligiran ay naka-configure na may tamang Lessons API endpoint.
:::

## Pag-deploy

Ang mga production build ay dine-deploy sa **S3 + CloudFront**:

1. Ang `npm run build` ay bumubuo ng optimized na Next.js build
2. Ang build output ay sini-sync sa isang S3 bucket
3. Ang CloudFront invalidation ay nati-trigger upang isilbi ang bagong bersyon

:::tip
Para sa mga detalyadong tagubilin sa pag-deploy, tingnan ang gabay sa [Pag-deploy ng Web App](../deployment/web-apps).
:::
