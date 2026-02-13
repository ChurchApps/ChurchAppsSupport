# B1App

B1App is the public-facing church member application built with Next.js. It provides the member experience including profiles, group directories, live streaming, and donation pages.

## Prerequisites

- **Node.js 22+**
- **Git**

:::warning
B1App requires Node.js 22 or later. Earlier versions are not supported.
:::

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Install dependencies

```bash
cd B1App
npm install
```

### 3. Configure environment variables

```bash
cp dotenv.sample.txt .env
```

Open `.env` and configure the `NEXT_PUBLIC_*_API` endpoint URLs. These can point at the staging API or your local API instance.

### 4. Start the dev server

```bash
npm run dev
```

The Next.js dev server launches at [http://localhost:3301](http://localhost:3301).

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3301 |
| `npm run build` | Production build via Next.js |
| `npm run test` | Run end-to-end tests with Playwright |
| `npm run lint` | Run Next.js lint |

## Key Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | API endpoint URLs for each module |

:::info
The `postinstall` script copies locale and CSS files from `@churchapps/apphelper`. If components look unstyled after install, run `npm run postinstall` manually.
:::

## Tech Stack

- **Next.js 16** with TypeScript
- **React 19** for UI components
- **Material-UI 7** for design system
- **React Query 5** for server state
- **`@churchapps/apphelper*`** packages for shared components

## Deployment

Production builds are deployed to **S3 + CloudFront**:

1. `npm run build` generates the optimized Next.js build
2. Build output is synced to an S3 bucket
3. CloudFront invalidation is triggered to serve the new version
