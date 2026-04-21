---
title: "Database"
---

# Database

<div class="article-intro">

ChurchApps API'en bruger en **database-pr-modul** arkitektur. Hver af de seks moduler har sin egen MySQL database med en uafhængig forbindelsespulje, hvilket giver klare datagrænser, samtidig med at alt holdes inden for en enkelt implementering.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Installer **MySQL 8.0+** -- se [Forudsætninger](../setup/prerequisites)
- Konfigurer database forbindelsesstrenge i din `.env` fil -- se [Miljøvariabler](../setup/environment-variables)

</div>

## Arkitektur oversigt

```
Api
├── membership_db   ← Mennesker, grupper, tilladelser
├── attendance_db   ← Tjenester, sessioner, poster
├── content_db      ← Sider, afsnit, elementer
├── giving_db       ← Donationer, fonde, betalinger
├── messaging_db    ← Samtaler, meddelelser
└── doing_db        ← Opgaver, planer, tildelte opgaver
```

### Vigtigste designbeslutninger

- **En database pr. modul** -- Hvert modul vedligeholder sin egen MySQL database med en dedikeret forbindelsespulje (`EnhancedPoolHelper`). Dette holder moduler afkoblet, og tillader uafhængig schema evolution.
- **Lager mønster med direkte SQL** -- Der er ingen ORM. Al dataadgang går gennem lager klasser, der udfører SQL direkte ved hjælp af `DB.query()`. Dette giver fuld kontrol over spørge ydeevne og adfærd.
- **Multi-tenant efter design** -- Hver forespørgsel er omfattet af `churchId`. Alle tabeller omfatter en `churchId` kolonne, og lagringsklassen håndhæver lejertilskillelse automatisk.

## Forbindelses strenge

Hver modules database forbindelse er konfigureret i `.env` ved hjælp af standard MySQL forbindelses streng format:

```
mysql://user:password@host:port/database
```

For eksempel kan en lokal udviklings opsætning se således ud:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
I produktion gemmes forbindelses strenge i AWS SSM Parameter Store og læses af `Environment` klassen ved opstart.
:::

## Schema scripts

Database schema scripts er placeret i mappen `tools/dbScripts/`, organiseret efter modul:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Disse scripts definerer tabel oprettelse, indekser og eventuelle nødvendige seed data.

## Database initialisering

### Initialisér alle databaser

```bash
npm run initdb
```

Dette skaber alle seks databaser og kører schema scripts til hver.

### Initialisér et enkelt modul

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Når du arbejder på et bestemt modul, kan du re-initialisere blot det moduls database uden at påvirke de andre.
:::

## Data adgangs mønster

Lagere får adgang til data gennem `DB.query()` metoden. En typisk lagrings metode ser således ud:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Lagere fås via `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Medtag altid `churchId` i dine forespørgsler for at opretholde multi-tenant isolation. Forespørg aldrig på tværs af lejere, medmindre du har en specifik, autoriseret grund til at gøre det.
:::

## Relaterede artikler

- **[Modul struktur](./module-structure)** -- Hvordan kontrollere og lagere er organiseret inden for hvert modul
- **[Lokal API opsætning](./local-setup)** -- Kør API'en lokalt til udvikling
