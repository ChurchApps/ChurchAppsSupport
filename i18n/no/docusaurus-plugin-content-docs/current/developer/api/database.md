---
title: "Database"
---

# Database

<div class="article-intro">

ChurchApps API bruker en **database-per-modul**-arkitektur. Hver av de seks modulene har sin egen MySQL-database med en uavhengig tilkoblingspool, noe som gir klare datagrenser samtidig som alt holdes innenfor en enkelt distribusjon.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer **MySQL 8.0+** -- se [Forutsetninger](../setup/prerequisites)
- Konfigurer databasetilkoblingsstrenger i `.env`-filen din -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Arkitekturoversikt

```
Api
├── membership_db   ← Personer, grupper, tillatelser
├── attendance_db   ← Gudstjenester, økter, registreringer
├── content_db      ← Sider, seksjoner, elementer
├── giving_db       ← Gaver, fond, betalinger
├── messaging_db    ← Samtaler, varsler
└── doing_db        ← Oppgaver, planer, tildelinger
```

### Viktige designvalg

- **Én database per modul** -- Hver modul vedlikeholder sin egen MySQL-database med en dedikert tilkoblingspool (`EnhancedPoolHelper`). Dette holder modulene frakoblet og muliggjør uavhengig skjemautvikling.
- **Repository-mønster med direkte SQL** -- Det er ingen ORM. All datatilgang går gjennom repository-klasser som utfører SQL direkte ved hjelp av `DB.query()`. Dette gir full kontroll over spørringsytelse og oppførsel.
- **Flerleietaker etter design** -- Hver spørring er avgrenset av `churchId`. Alle tabeller inkluderer en `churchId`-kolonne, og repository-laget håndhever leieisolasjon automatisk.

## Tilkoblingsstrenger

Hver moduls databasetilkobling konfigureres i `.env` ved hjelp av standard MySQL-tilkoblingsstrengformat:

```
mysql://bruker:passord@vert:port/database
```

For eksempel kan et lokalt utviklingsoppsett se slik ut:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
I produksjon lagres tilkoblingsstrenger i AWS SSM Parameter Store og leses av `Environment`-klassen ved oppstart.
:::

## Skjemaskript

Databaseskjemaskript er plassert i katalogen `tools/dbScripts/`, organisert etter modul:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Disse skriptene definerer tabelloppretting, indekser og eventuelle nødvendige startdata.

## Databaseinitialisering

### Initialiser alle databaser

```bash
npm run initdb
```

Dette oppretter alle seks databaser og kjører skjemaskriptene for hver.

### Initialiser en enkelt modul

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Når du jobber med en spesifikk modul, kan du re-initialisere bare den modulens database uten å påvirke de andre.
:::

## Datatilgangsmønster

Repositories tilgjengeliggjør data gjennom `DB.query()`-metoden. En typisk repository-metode ser slik ut:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Repositories hentes via `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Inkluder alltid `churchId` i spørringene dine for å opprettholde flerleietaker-isolasjon. Spør aldri på tvers av leietakere med mindre du har en spesifikk, autorisert grunn til å gjøre det.
:::

## Relaterte artikler

- **[Modulstruktur](./module-structure)** -- Hvordan kontrollere og repositories er organisert innenfor hver modul
- **[Lokalt API-oppsett](./local-setup)** -- Fullstendig trinnvis oppsettsguide
