---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp is the lesson content management application for [Lessons.church](https://lessons.church). It provides an interface for creating, organizing, and publishing church lesson curricula, built with Next.js and React.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install **Node.js 22+** and **Git** -- see [Prerequisites](../setup/prerequisites)
- Configure your API target (staging or local) -- see [Environment Variables](../setup/environment-variables)

</div>

:::warning
LessonsApp requires Node.js 22 or later. Earlier versions are not supported.
:::

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Install dependencies

```bash
cd LessonsApp
npm install
```

### 3. Configure environment variables

Copy the environment sample file to `.env` and configure the API endpoints:

```bash
cp dotenv.sample.txt .env
```

Update the API endpoint URLs to point at either the staging API or your local API instance.

### 4. Start the dev server

```bash
npm run dev
```

The Next.js dev server launches at [http://localhost:3501](http://localhost:3501).

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on port 3501 |
| `npm run build` | Production build via Next.js |

## Tech Stack

- **Next.js 16** with TypeScript
- **React 19** for UI components
- **`@churchapps/apphelper*`** packages for shared components

:::info
LessonsApp communicates with the **LessonsApi** backend, which is a separate API from the main ChurchApps Api. Make sure your environment is configured with the correct Lessons API endpoint.
:::

## Deployment

Production builds are deployed to **S3 + CloudFront**:

1. `npm run build` generates the optimized Next.js build
2. Build output is synced to an S3 bucket
3. CloudFront invalidation is triggered to serve the new version

:::tip
For detailed deployment instructions, see the [Web App Deployment](../deployment/web-apps) guide.
:::
