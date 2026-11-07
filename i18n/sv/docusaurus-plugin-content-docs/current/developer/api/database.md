---
title: "Databas"
---

# Databas

<div class="article-intro">

ChurchApps API använder en **databas-per-modul**-arkitektur. Var och en av de sex datamodulerna har sin egen MySQL-databas med en oberoende anslutningspool. Det ger tydliga datagränser och håller ändå allt inom en enda driftsättning.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Installera **MySQL 8.0+** -- se [Förutsättningar](../setup/prerequisites)
- Konfigurera databasens anslutningssträngar i din `.env`-fil -- se [Miljövariabler](../setup/environment-variables)

</div>

## Arkitekturöversikt

```
Api
├── membership_db   ← Personer, grupper, behörigheter
├── attendance_db   ← Gudstjänster, sessioner, poster
├── content_db      ← Sidor, sektioner, element
├── giving_db       ← Donationer, fonder, betalningar
├── messaging_db    ← Konversationer, aviseringar
└── doing_db        ← Uppgifter, planer, tilldelningar
```

### Viktiga designbeslut

- **En databas per modul** -- Varje modul har sin egen MySQL-databas med en dedikerad anslutningspool (hanteras av `KyselyPool`). Detta gör modulerna frikopplade och gör det möjligt att utveckla schemat oberoende av varandra.
- **Exklusivt ägarskap** -- En moduls tabeller läses och skrivs endast av den modulens egen kod. När en annan modul behöver datan anropar den den ägande modulens gateway i stället för att fråga tabellerna själv -- se [Kommunikation mellan moduler](./module-structure#cross-module-communication).
- **Repository-mönster utan ORM** -- All dataåtkomst sker via repository-klasser som bygger typade SQL-frågor med Kysely-frågebyggaren mot modulens schema. Det ger full kontroll över frågornas prestanda och beteende.
- **Flerhyresgäster by design** -- Varje fråga är avgränsad med `churchId`. Alla tabeller har en `churchId`-kolumn, och repository-lagret säkerställer tenant-isolering automatiskt.

## Anslutningssträngar

Varje moduls databasanslutning konfigureras i `.env` med det vanliga MySQL-formatet för anslutningssträngar:

```
mysql://user:password@host:port/database
```

En lokal utvecklingsmiljö kan till exempel se ut så här:

Varje modul läser sin anslutning från en miljövariabel med namnet `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
I produktion lagras anslutningssträngarna i AWS SSM Parameter Store och läses in av klassen `Environment` vid uppstart.
:::

## Schemaskript

Tabellscheman definieras som Kysely-migreringar i katalogen `tools/migrations/`, ordnade per modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migreringar definierar tabellskapande, index och schemaändringar. Katalogen `tools/dbScripts/` innehåller demo- och startdata som kan läsas in ovanpå schemat.

## Initiering av databaser

### Initiera alla databaser

```bash
npm run initdb
```

Detta skapar alla sex databaserna och kör migreringarna för var och en.

### Initiera en enskild modul

```bash
npm run initdb -- --module=membership
```

:::tip
När du arbetar med en specifik modul kan du återinitiera enbart den modulens databas utan att påverka de andra.
:::

## Mönster för dataåtkomst

Repositories bygger frågor med Kysely-frågebyggaren mot modulens typade databasschema, som hämtas via modulens funktion `getDb()`. En typisk repository-metod ser ut så här:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositories hämtas via `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Inkludera alltid `churchId` i dina frågor för att bibehålla isoleringen mellan hyresgäster. Fråga aldrig över hyresgäster om du inte har ett specifikt, auktoriserat skäl till det.
:::

## Referenser mellan moduler

Eftersom varje moduls data finns i en separat databas finns det inga främmande nycklar eller SQL-joins över modulgränser. En post som relaterar till en annan moduls data lagrar det postens id -- till exempel bär en donation i givandedatabasen med sig `personId` för en person i medlemsdatabasen -- och all sammansättning över moduler sker i applikationskoden.

Denna begränsning är det som gör modulgränserna verkliga: varje schema kan utvecklas oberoende, en moduls databas kan flyttas till en egen server, och en modul skulle till och med kunna brytas ut till en fristående tjänst utan att behöva reda ut delade tabeller eller databasöverskridande frågor.

## Relaterade artiklar

- **[Modulstruktur](./module-structure)** -- Hur kontroller och repositories är organiserade inom varje modul
- **[Lokal API-installation](./local-setup)** -- Fullständig steg-för-steg-guide för installation
