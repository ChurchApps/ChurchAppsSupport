---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

Ang B1Admin ay ang dashboard ng pangangasiwa ng simbahan -- isang React single-page application na binuo gamit ang Vite at Material-UI. Ginagamit ito ng staff ng simbahan para pamahalaan ang mga tao, group, attendance, donasyon, content, at iba pa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js 22+** at **Git** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-configure ang iyong API target (demo o lokal) -- tingnan ang [Environment Variables](../setup/environment-variables)

</div>

## Setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. I-install ang mga dependency

```bash
cd B1Admin
npm install
```

### 3. I-configure ang mga environment variable

```bash
cp dotenv.sample.txt .env
```

Buksan ang `.env` at i-configure ang mga API endpoint. Maaari mong ituro ang mga ito sa shared demo API (`https://api.demo.churchapps.org`) o sa iyong lokal na API instance. Maaaring may nakalista pa ring retired na staging URL ang sample file; palitan ang mga ito.

### 4. Simulan ang dev server

```bash
npm start
```

Sisimulan nito ang Vite dev server. Magiging available ang app sa iyong browser na may hot module replacement na naka-enable.

## Mga Pangunahing Environment Variable

| Variable | Paglalarawan |
|----------|----------|
| `REACT_APP_STAGE` | Pangalan ng environment (hal., `demo` gaya ng nasa sample file, `prod`, o `selfhost`) |
| `PORT` | Port ng dev server (default: `3101`) |
| `REACT_APP_*_API` | Mga URL ng API endpoint para sa bawat module |

:::info
Kinokopya ng `postinstall` script ang mga locale at CSS file mula sa `@churchapps/apphelper`. Kung mukhang walang style ang mga component, patakbuhin nang manu-mano ang `npm run postinstall`.
:::

## Mga Pangunahing Command

| Command | Paglalarawan |
|---------|----------|
| `npm start` | Simulan ang Vite dev server |
| `npm run build` | Production build gamit ang Vite |
| `npm run test` | Patakbuhin ang end-to-end test gamit ang Playwright |
| `npm run lint` | Patakbuhin ang ESLint na may auto-fix |

## Tech Stack

- **React 19** na may TypeScript
- **Vite** para sa build tooling at dev server
- **Material-UI 7** para sa mga UI component
- **React Query 5** para sa server state
- **`@churchapps/apphelper*`** na mga package para sa mga shared component

## Deployment

Ang mga production build ay idine-deploy sa **S3 + CloudFront**:

1. Ang `npm run build` ay gumagawa ng mga static asset
2. Ang mga asset ay sine-sync sa isang S3 bucket
3. Ang CloudFront invalidation ay ina-trigger para maihatid ang bagong bersyon

:::tip
Para sa detalyadong instruksyon sa deployment, tingnan ang gabay na [Web App Deployment](../deployment/web-apps).
:::
