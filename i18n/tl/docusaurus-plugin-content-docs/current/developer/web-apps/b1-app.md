---
title: "B1App"
---

# B1App

<div class="article-intro">

Ang B1App ay ang pampublikong church member application na binuo gamit ang Next.js. Nagbibigay ito ng karanasan ng miyembro kasama ang mga profile, direktoryo ng grupo, live streaming, at mga pahina ng donasyon.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js 22+** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- I-configure ang iyong API target (staging o lokal) -- tingnan ang [Mga Variable ng Kapaligiran](../setup/environment-variables)

</div>

:::warning
Nangangailangan ang B1App ng Node.js 22 o mas bago. Ang mga naunang bersyon ay hindi sinusuportahan.
:::

## Pag-setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Mag-install ng mga dependency

```bash
cd B1App
npm install
```

### 3. I-configure ang mga variable ng kapaligiran

```bash
cp dotenv.sample.txt .env
```

Buksan ang `.env` at i-configure ang mga `NEXT_PUBLIC_*_API` endpoint URL. Maaaring ituro ang mga ito sa staging API o sa iyong lokal na API instance.

### 4. Simulan ang dev server

```bash
npm run dev
```

Ang Next.js dev server ay naglulunsad sa [http://localhost:3301](http://localhost:3301).

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang Next.js dev server sa port 3301 |
| `npm run build` | Production build sa pamamagitan ng Next.js |
| `npm run test` | Patakbuhin ang end-to-end na mga test gamit ang Playwright |
| `npm run lint` | Patakbuhin ang Next.js lint |

## Mga Pangunahing Variable ng Kapaligiran

| Variable | Paglalarawan |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | Mga URL ng API endpoint para sa bawat module |

:::info
Ang `postinstall` script ay kumokopya ng mga locale at CSS file mula sa `@churchapps/apphelper`. Kung ang mga component ay mukhang walang estilo pagkatapos ng install, patakbuhin ang `npm run postinstall` nang mano-mano.
:::

## Tech Stack

- **Next.js 16** na may TypeScript
- **React 19** para sa mga UI component
- **Material-UI 7** para sa design system
- **React Query 5** para sa server state
- Mga **`@churchapps/apphelper*`** package para sa mga shared component

## Pag-deploy

Ang mga production build ay dine-deploy sa **S3 + CloudFront**:

1. Ang `npm run build` ay bumubuo ng optimized na Next.js build
2. Ang build output ay sini-sync sa isang S3 bucket
3. Ang CloudFront invalidation ay nati-trigger upang isilbi ang bagong bersyon

:::tip
Para sa mga detalyadong tagubilin sa pag-deploy, tingnan ang gabay sa [Pag-deploy ng Web App](../deployment/web-apps).
:::
