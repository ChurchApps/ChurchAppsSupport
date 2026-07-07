---
title: "Local API Setup"
---

# Local API Setup

<div class="article-intro">

Ang gabay na ito ay gagabay sa iyo sa pag-setup ng ChurchApps API para sa local development. Kopyahin mo ang repository, i-configure ang iyong database connections, i-initialize ang schema, at simulan ang dev server na may hot reload.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **Node.js 22+**, **Git**, at **MySQL 8.0+** -- tingnan ang [Prerequisites](../setup/prerequisites)
- Lumikha ng MySQL user na may database creation privileges
- Suriin ang [Environment Variables](../setup/environment-variables) reference para sa API configuration

</div>

## Step-by-Step Setup

### 1. I-clone ang repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. I-install ang dependencies

Ang project ay gumagamit ng Yarn (isang guard ay humihigil sa `npm install`):

```bash
cd Api
yarn install
```

### 3. I-configure ang environment variables

```bash
cp .env.sample .env
```

Buksan ang `.env` at i-configure ang iyong MySQL connection strings. Bawat module ay kailangan ng sarili nitong database connection sa sumusunod na format:

```
mysql://root:password@localhost:3306/dbname
```

Kailangan mo ng connection strings para sa lahat ng anim na module databases (membership, attendance, content, giving, messaging, doing).

### 4. I-initialize ang databases

```bash
npm run initdb
```

Ito ay lumilikha ng lahat ng anim na databases at ang kanilang tables nang awtomatiko.

:::tip
Maaari mong i-initialize ang isang module's database lamang gamit ang `npm run initdb -- --module=membership` (o `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Simulan ang dev server

```bash
npm run dev
```

Ang API ay nagsisimula na may hot reload sa [http://localhost:8084](http://localhost:8084).

## Key Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Simulan ang dev server na may hot reload (tsx watch) |
| `npm run build` | I-clean, i-compile ang TypeScript, at kopyahin ang assets |
| `npm run test` | Patakbuhin ang tests gamit ang Jest (kasama ang coverage) |
| `npm run test:watch` | Patakbuhin ang tests sa watch mode |
| `npm run lint` | Patakbuhin ang ESLint na may auto-fix (ESLint ang sole formatter) |

## Staging Deployment

Para i-deploy sa staging environment:

```bash
npm run deploy-staging
```

Ito ay nagsasagawa ng production build at pagkatapos ay nag-deploy via Serverless Framework.

:::warning
Siguraduhin na ang iyong AWS credentials ay configured bago patakbuhin ang deploy command.
:::

## Local Library Development

Kung kailangan mong mag-develop ng shared library (`@churchapps/helpers` o `@churchapps/apihelper`) kasama ang API, i-build ito sa [Packages](https://github.com/ChurchApps/Packages) workspace at magdagdag ng temporary Yarn portal sa API:

```bash
# Sa Packages workspace
yarn build

# Sa API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Ito ay nagpapahintulot sa iyo na subukan ang library changes laban sa API nang hindi nag-publish sa npm. Tingnan ang [Shared Libraries](../shared-libraries/#local-development-against-a-consuming-app) para sa detalye -- at hindi kailanman i-commit ang portal resolution na isusulat ng link sa `package.json`.

## Related Articles

- **[Database](./database)** -- Pag-unawa sa database-per-module architecture
- **[Module Structure](./module-structure)** -- Paano ino-organize ang controllers, repositories, at models
- **[Shared Libraries](../shared-libraries/)** -- Pagtrabaho sa `@churchapps/helpers` at `@churchapps/apihelper`
