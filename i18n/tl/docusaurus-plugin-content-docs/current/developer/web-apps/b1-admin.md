---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

Ang B1Admin ay ang dashboard ng administrasyon ng simbahan -- isang React single-page application na binuo gamit ang Vite at Material-UI. Ginagamit ito ng mga kawani ng simbahan upang pamahalaan ang mga tao, grupo, attendance, donasyon, nilalaman, at higit pa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **Node.js 22+** at **Git** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- I-configure ang iyong API target (staging o lokal) -- tingnan ang [Mga Variable ng Kapaligiran](../setup/environment-variables)

</div>

## Pag-setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Mag-install ng mga dependency

```bash
cd B1Admin
npm install
```

### 3. I-configure ang mga variable ng kapaligiran

```bash
cp dotenv.sample.txt .env
```

Buksan ang `.env` at i-configure ang mga API endpoint. Maaari mong ituro ang mga ito sa staging API o sa iyong lokal na API instance.

### 4. Simulan ang dev server

```bash
npm start
```

Inilulunsad nito ang Vite dev server. Ang app ay magagamit sa iyong browser na may naka-enable na hot module replacement.

## Mga Pangunahing Variable ng Kapaligiran

| Variable | Paglalarawan |
|----------|-------------|
| `REACT_APP_STAGE` | Pangalan ng kapaligiran (hal., `local`, `staging`, `prod`) |
| `PORT` | Port ng dev server (default: `3101`) |
| `REACT_APP_*_API` | Mga URL ng API endpoint para sa bawat module |

:::info
Ang `postinstall` script ay kumokopya ng mga locale at CSS file mula sa `@churchapps/apphelper`. Kung ang mga component ay mukhang walang estilo, patakbuhin ang `npm run postinstall` nang mano-mano.
:::

## Mga Pangunahing Utos

| Utos | Paglalarawan |
|---------|-------------|
| `npm start` | Simulan ang Vite dev server |
| `npm run build` | Production build sa pamamagitan ng Vite |
| `npm run test` | Patakbuhin ang end-to-end na mga test gamit ang Playwright |
| `npm run lint` | Patakbuhin ang ESLint na may auto-fix |

## Tech Stack

- **React 19** na may TypeScript
- **Vite** para sa build tooling at dev server
- **Material-UI 7** para sa mga UI component
- **React Query 5** para sa server state
- Mga **`@churchapps/apphelper*`** package para sa mga shared component

## Pag-deploy

Ang mga production build ay dine-deploy sa **S3 + CloudFront**:

1. Ang `npm run build` ay bumubuo ng mga static asset
2. Ang mga asset ay sini-sync sa isang S3 bucket
3. Ang CloudFront invalidation ay nati-trigger upang isilbi ang bagong bersyon

:::tip
Para sa mga detalyadong tagubilin sa pag-deploy, tingnan ang gabay sa [Pag-deploy ng Web App](../deployment/web-apps).
:::
