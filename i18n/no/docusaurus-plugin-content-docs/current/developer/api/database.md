---
title: "Database"
---

# Database

<div class="article-intro">

ChurchApps API-et bruker en **database-per-modul**-arkitektur. Hver av de seks datamodulene har sin egen MySQL-database med en uavhengig tilkoblingspool, noe som gir tydelige datagrenser samtidig som alt holdes innenfor én enkelt distribusjon.

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
├── attendance_db   ← Gudstjenester, sesjoner, oppføringer
├── content_db      ← Sider, seksjoner, elementer
├── giving_db       ← Donasjoner, fond, betalinger
├── messaging_db    ← Samtaler, varsler
└── doing_db        ← Oppgaver, planer, tildelinger
```

### Sentrale designvalg

- **Én database per modul** -- Hver modul opprettholder sin egen MySQL-database med en dedikert tilkoblingspool (administrert av `KyselyPool`). Dette holder modulene frikoblet og muliggjør uavhengig skjemautvikling.
- **Eksklusivt eierskap** -- En moduls tabeller leses og skrives kun av modulens egen kode. Når en annen modul trenger dataene, kaller den den eiende modulens gateway i stedet for å spørre tabellene direkte -- se [Kommunikasjon på tvers av moduler](./module-structure#cross-module-communication).
- **Repository-mønster uten ORM** -- All datatilgang går gjennom repository-klasser som bygger typet SQL med Kysely-spørringsbyggeren mot modulens skjema. Dette gir full kontroll over spørringsytelse og -atferd.
- **Multi-tenant per design** -- Hver spørring er avgrenset av `churchId`. Alle tabeller inkluderer en `churchId`-kolonne, og repository-laget håndhever tenant-isolasjon automatisk.

## Tilkoblingsstrenger

Hver moduls databasetilkobling konfigureres i `.env` ved hjelp av standard MySQL-tilkoblingsstrengformat:

```
mysql://user:password@host:port/database
```

For eksempel kan et lokalt utviklingsoppsett se slik ut:

Hver modul leser tilkoblingen sin fra en miljøvariabel kalt `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
I produksjon lagres tilkoblingsstrenger i AWS SSM Parameter Store og leses av `Environment`-klassen ved oppstart.
:::

## Skjemaskript

Tabellskjemaer defineres som Kysely-migrasjoner i `tools/migrations/`-katalogen, organisert etter modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrasjoner definerer tabellopprettelse, indekser og skjemaendringer. `tools/dbScripts/`-katalogen inneholder demo- og frødata som kan lastes oppå skjemaet.

## Databaseinitialisering

### Initialiser alle databaser

```bash
npm run initdb
```

Dette oppretter alle seks databasene og kjører migrasjonene for hver av dem.

### Initialiser en enkelt modul

```bash
npm run initdb -- --module=membership
```

:::tip
Når du jobber med en spesifikk modul, kan du re-initialisere bare den modulens database uten å påvirke de andre.
:::

## Datatilgangsmønster

Repositories bygger spørringer med Kysely-spørringsbyggeren mot modulens typede databaseskjema, hentet gjennom modulens `getDb()`-funksjon. En typisk repository-metode ser slik ut:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositories hentes via `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Inkluder alltid `churchId` i spørringene dine for å opprettholde multi-tenant-isolasjon. Aldri spør på tvers av tenanter med mindre du har en spesifikk, autorisert grunn til å gjøre det.
:::

## Referanser på tvers av moduler

Fordi hver moduls data ligger i en separat database, finnes det ingen fremmednøkler eller SQL-joins på tvers av modulgrenser. En oppføring som relaterer seg til en annen moduls data, lagrer den oppføringens id -- for eksempel har en donasjon i giving-databasen `personId` til en person i membership-databasen -- og all sammensetning på tvers av moduler skjer i applikasjonskoden.

Denne begrensningen er det som gjør modulgrensene reelle: hvert skjema kan utvikle seg uavhengig, en moduls database kan flyttes til sin egen server, og en modul kan til og med skilles ut som en frittstående tjeneste uten å måtte løse opp delte tabeller eller spørringer på tvers av databaser.

## Relaterte artikler

- **[Modulstruktur](./module-structure)** -- Hvordan kontrollere og repositories er organisert innenfor hver modul
- **[Lokalt API-oppsett](./local-setup)** -- Full trinnvis oppsettsveiledning
