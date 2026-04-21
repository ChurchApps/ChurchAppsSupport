---
title: "Lokalt API Setup"
---

# Lokalt API Setup

<div class="article-intro">

Denne vejledning guider dig gennem opsætning af ChurchApps API til lokal udvikling. Du vil klone lageret, konfigurere dine databaseforbindelser, initialisere skemaet og starte dev-serveren med hot reload.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **Node.js 22+**, **Git** og **MySQL 8.0+** -- se [Forudsætninger](../setup/prerequisites)
- Opret en MySQL-bruger med databaseoprettelsesprivilegier
- Gennemgå [Miljøvariabler](../setup/environment-variables) for API-konfiguration

</div>

## Trin-for-trin opsætning

### 1. Klon lageret

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installer afhængigheder

```bash
cd Api
npm install
```

### 3. Konfigurér miljøvariabler

```bash
cp .env.sample .env
```

Åbn `.env` og konfigurér dine MySQL-forbindelsesstrenke. Hvert modul har brug for sin egen databaseforbindelse i følgende format:

```
mysql://root:password@localhost:3306/dbname
```

Du får brug for forbindelsesstrenke for alle seks moduldatabaser (medlemskab, tilstedeværelse, indhold, giver, meddelelser, gør).

### 4. Initialiser databaserne

```bash
npm run initdb
```

Dette opretter alle seks databaser og deres tabeller automatisk.

:::tip
Du kan initialisere en enkelt moduls database med `npm run initdb:membership` (eller `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start dev-serveren

```bash
npm run dev
```

API'en starter med hot reload på [http://localhost:8084](http://localhost:8084).

## Vigtige kommandoer

| Command | Beskrivelse |
|---------|-------------|
| `npm run dev` | Start dev-server med hot reload (tsx watch) |
| `npm run build` | Rens, kompilér TypeScript og kopier aktiver |
| `npm run test` | Kør test med Jest (inkluderer dækning) |
| `npm run test:watch` | Kør test i tilsejlsmode |
| `npm run lint` | Kør Prettier og ESLint med auto-fix |

## Staging-installation

For at implementere til staging-miljøet:

```bash
npm run deploy-staging
```

Dette kører en produktionsbygning og implementerer derefter via Serverless Framework.

:::warning
Sørg for, at dine AWS-legitimationsoplysninger er konfigureret, før du kører deploy-kommandoen.
:::

## Lokal biblioteksudvikling

Hvis du har brug for at udvikle et delt bibliotek (`@churchapps/helpers` eller `@churchapps/apihelper`) ved siden af API'en, skal du bruge `npm link`:

```bash
# I biblioteksarkivet
cd Helpers
npm run build
npm link

# I API-arkivet
cd ../Api
npm link @churchapps/helpers
```

Dette giver dig mulighed for at teste biblioteksændringer mod API'en uden at publicere til npm.

## Relaterede artikler

- **[Database](./database)** -- Forståelse af database-per-modul arkitektur
- **[Modulstruktur](./module-structure)** -- Sådan organiseres controllere, repositories og modeller
- **[Delte biblioteker](../shared-libraries/)** -- Arbejde med `@churchapps/helpers` og `@churchapps/apihelper`
