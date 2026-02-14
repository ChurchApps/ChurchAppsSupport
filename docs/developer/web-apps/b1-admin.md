---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin is the church administration dashboard -- a React single-page application built with Vite and Material-UI. Church staff use it to manage people, groups, attendance, donations, content, and more.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js 22+** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Configure your API target (staging or local) -- see [Environment Variables](../setup/environment-variables)

</div>

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Install dependencies

```bash
cd B1Admin
npm install
```

### 3. Configure environment variables

```bash
cp dotenv.sample.txt .env
```

Open `.env` and configure the API endpoints. You can point them at either the staging API or your local API instance.

### 4. Start the dev server

```bash
npm start
```

This launches the Vite dev server. The app will be available in your browser with hot module replacement enabled.

## Key Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_STAGE` | Environment name (e.g., `local`, `staging`, `prod`) |
| `PORT` | Dev server port (default: `3101`) |
| `REACT_APP_*_API` | API endpoint URLs for each module |

:::info
The `postinstall` script copies locale and CSS files from `@churchapps/apphelper`. If components look unstyled, run `npm run postinstall` manually.
:::

## Key Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start Vite dev server |
| `npm run build` | Production build via Vite |
| `npm run test` | Run end-to-end tests with Playwright |
| `npm run lint` | Run ESLint with auto-fix |

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling and dev server
- **Material-UI 7** for UI components
- **React Query 5** for server state
- **`@churchapps/apphelper*`** packages for shared components

## Deployment

Production builds are deployed to **S3 + CloudFront**:

1. `npm run build` generates static assets
2. Assets are synced to an S3 bucket
3. CloudFront invalidation is triggered to serve the new version

:::tip
For detailed deployment instructions, see the [Web App Deployment](../deployment/web-apps) guide.
:::
