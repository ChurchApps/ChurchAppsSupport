---
title: "B1App"
---

# B1App

<div class="article-intro">

Ang B1App ay ang public-facing na church member application na binuo gamit ang Next.js. Ibinibigay nito ang karanasan ng miyembro kabilang ang mga profile, group directory, live streaming, at mga donation page.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js 22+** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-configure ang iyong API target (demo o local) -- tingnan ang [Environment Variables](../setup/environment-variables)

</div>

:::warning
Kailangan ng B1App ang Node.js 22 o mas bago. Hindi suportado ang mas naunang bersyon.
:::

## Setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. I-install ang mga dependency

```bash
cd B1App
npm install
```

### 3. I-configure ang environment variables

```bash
cp dotenv.sample.txt .env
```

Buksan ang `.env` at i-configure ang mga URL ng `NEXT_PUBLIC_*_API` endpoint. Maaaring tumuro ang mga ito sa shared demo API (`https://api.demo.churchapps.org`) o sa iyong local API instance. Maaaring nakalista pa rin sa sample file ang mga retired na staging URL; palitan ang mga ito.

### 4. Simulan ang dev server

```bash
npm run dev
```

Ilulunsad ang Next.js dev server sa [http://localhost:3301](http://localhost:3301).

## Mga Pangunahing Command

| Command | Paglalarawan |
|---------|-------------|
| `npm run dev` | Simulan ang Next.js dev server sa port 3301 |
| `npm run build` | Production build sa pamamagitan ng Next.js |
| `npm run test` | Magpatakbo ng end-to-end test gamit ang Playwright |
| `npm run lint` | Magpatakbo ng Next.js lint |

## Mga Pangunahing Environment Variable

| Variable | Paglalarawan |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | Mga URL ng API endpoint para sa bawat module |

:::info
Kinokopya ng `postinstall` script ang mga locale at CSS file mula sa `@churchapps/apphelper`. Kung mukhang walang style ang mga component pagkatapos ng install, patakbuhin nang manu-mano ang `npm run postinstall`.
:::

## Tech Stack

- **Next.js 16** na may TypeScript
- **React 19** para sa mga UI component
- **Material-UI 7** para sa design system
- **React Query 5** para sa server state
- **`@churchapps/apphelper*`** packages para sa mga shared component

## Deployment

Ang mga production build ay idinedeploy sa **S3 + CloudFront**:

1. Ginagawa ng `npm run build` ang na-optimize na Next.js build
2. Ang output ng build ay isinasabay sa isang S3 bucket
3. Itinatrigger ang CloudFront invalidation para maihatid ang bagong bersyon

:::tip
Para sa detalyadong instruksyon sa deployment, tingnan ang gabay na [Web App Deployment](../deployment/web-apps).
:::
