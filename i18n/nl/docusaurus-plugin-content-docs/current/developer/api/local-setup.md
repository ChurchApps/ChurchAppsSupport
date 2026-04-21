---
title: "Local API Setup"
---

# Local API Setup

<div class="article-intro">

Deze gids leidt u door het instellen van de ChurchApps API voor lokale ontwikkeling. U klont de repository, configureert uw databaseverbindingen, initialiseert het schema en start de dev-server met hot reload.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Installeer **Node.js 22+**, **Git** en **MySQL 8.0+** -- zie [Prerequisites](../setup/prerequisites)
- Maak een MySQL-gebruiker met privileges voor databaseaanmaak
- Lees de [Environment Variables](../setup/environment-variables)-referentie voor API-configuratie

</div>

## Stapsgewijze Setup

### 1. Kloon de repository

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Installeer afhankelijkheden

```bash
cd Api
npm install
```

### 3. Configureer omgevingsvariabelen

```bash
cp .env.sample .env
```

Open `.env` en configureer uw MySQL-verbindingsreeksen. Elke module heeft zijn eigen databaseverbinding in het volgende formaat nodig:

```
mysql://root:password@localhost:3306/dbname
```

U hebt verbindingsreeksen voor alle zes moduledata nodig (membership, attendance, content, giving, messaging, doing).

### 4. Initialiseer de databases

```bash
npm run initdb
```

Dit maakt automatisch alle zes databases en hun tabellen aan.

:::tip
U kunt de database van een enkele module initialiseren met `npm run initdb:membership` (of `attendance`, `content`, `giving`, `messaging`, `doing`).
:::

### 5. Start de dev-server

```bash
npm run dev
```

De API start met hot reload op [http://localhost:8084](http://localhost:8084).

## Sleutelcommando's

| Command | Beschrijving |
|---------|-------------|
| `npm run dev` | Start dev-server met hot reload (tsx watch) |
| `npm run build` | Schoon, compileer TypeScript en kopieer assets |
| `npm run test` | Tests uitvoeren met Jest (inclusief dekking) |
| `npm run test:watch` | Tests in watch-modus uitvoeren |
| `npm run lint` | Prettier en ESLint met auto-fix uitvoeren |

## Staging-implementatie

Voer het volgende uit om te implementeren naar de staging-omgeving:

```bash
npm run deploy-staging
```

Dit voert een productiebuild uit en implementeert vervolgens via Serverless Framework.

:::warning
Zorg ervoor dat uw AWS-gegevens zijn geconfigureerd voordat u het deployopdracht uitvoert.
:::

## Lokale bibliotheekbemoeiing

Als u een gedeelde bibliotheek (`@churchapps/helpers` of `@churchapps/apihelper`) naast de API moet ontwikkelen, gebruikt u `npm link`:

```bash
# In de bibliotheekmap
cd Helpers
npm run build
npm link

# In de API-map
cd ../Api
npm link @churchapps/helpers
```

Dit laat u bibliotheekwijzigingen tegen de API testen zonder naar npm te publiceren.

## Gerelateerde Artikelen

- **[Database](./database)** -- De database-per-module-architectuur begrijpen
- **[Module Structure](./module-structure)** -- Hoe controllers, repositories en modellen zijn georganiseerd
- **[Shared Libraries](../shared-libraries/)** -- Werken met `@churchapps/helpers` en `@churchapps/apihelper`
