---
title: "Database"
---

# Database

<div class="article-intro">

Ang ChurchApps API ay gumagamit ng isang **database-per-module** na arkitektura. Bawat isa sa anim na data module ay may sariling MySQL database na may independent na connection pool, na nagbibigay ng malinaw na data boundary habang pinapanatili ang lahat sa loob ng isang deployment.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **MySQL 8.0+** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-configure ang database connection string sa iyong `.env` file -- tingnan ang [Environment Variable](../setup/environment-variables)

</div>

## Architecture Overview

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Key Design Decision

- **Isang database bawat module** -- Bawat module ay may sariling MySQL database na may dedicated na connection pool (pinamamahalaan ng `KyselyPool`). Ito ay pinapanatili ang mga module na naka-decouple at nagbibigay-daan sa independent schema evolution.
- **Eksklusibong pagmamay-ari** -- Ang mga talahanayan ng isang module ay basahin at isulat lamang ng code ng sariling module. Kapag kailangan ng ibang module ang data, tumawag ito sa gateway ng module na may-ari sa halip na ang sarili nitong mag-query sa mga talahanayan -- tingnan ang [Cross-Module Communication](./module-structure#cross-module-communication).
- **Repository pattern na walang ORM** -- Lahat ng data access ay napupunta sa pamamagitan ng repository class na bumubuo ng typed SQL gamit ang Kysely query builder laban sa schema ng module. Ito ay nagbibigay ng buong kontrol sa query performance at behavior.
- **Multi-tenant by design** -- Bawat query ay scoped ng `churchId`. Lahat ng talahanayan ay may kasamang `churchId` column, at ang repository layer ay nag-enforce ng tenant isolation nang awtomatiko.

## Connection String

Ang database connection ng bawat module ay naka-configure sa `.env` gamit ang standard MySQL connection string format:

```
mysql://user:password@host:port/database
```

Halimbawa, ang isang local development setup ay maaaring magmukhang ganito:

Bawat module ay basahin ang connection nito mula sa environment variable na pinangalanang `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Sa production, ang mga connection string ay nakaimbak sa AWS SSM Parameter Store at binasa ng `Environment` class sa startup.
:::

## Schema Script

Ang mga schema ng talahanayan ay tinukoy bilang Kysely migration sa `tools/migrations/` directory, inayos ng module:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Ang migration ay tumutukoy ng table creation, index, at schema change. Ang `tools/dbScripts/` directory ay may demo at seed data na maaaring i-load sa tuktok ng schema.

## Database Initialization

### I-initialize ang lahat ng database

```bash
npm run initdb
```

Ito ay lumilikha ng lahat ng anim na database at tumatakbo sa migration para sa bawat isa.

### I-initialize ang isang single module

```bash
npm run initdb -- --module=membership
```

:::tip
Kapag nagtatrabaho sa isang specific na module, maaari mong i-re-initialize ang database lamang ng module na iyon nang hindi nakakaapekto sa iba.
:::

## Data Access Pattern

Ang repository ay bumubuo ng query gamit ang Kysely query builder laban sa typed database schema ng module, na nakuha sa pamamagitan ng `getDb()` function ng module. Ang isang typical na repository method ay ganito:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Ang repository ay nakukuha sa pamamagitan ng `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Palaging isama ang `churchId` sa iyong query upang mapanatili ang multi-tenant isolation. Huwag mag-query sa buong tenant maliban kung mayroon kang specific, authorized na dahilan upang gawin ito.
:::

## Cross-Module Reference

Dahil ang data ng bawat module ay nabubuhay sa isang hiwalay na database, walang foreign key o SQL join sa buong module boundary. Ang isang record na may kaugnayan sa data ng ibang module ay nag-store ng id ng record na iyon -- halimbawa, ang isang donation sa giving database ay may dala ang `personId` ng isang tao sa membership database -- at ang anumang cross-module composition ay nangyayari sa application code.

Ang constraint na ito ay kung ano ang gumagawa ng module boundary na totoo: bawat schema ay maaaring mag-evolve nang independyente, ang database ng isang module ay maaaring ilipat sa sarili nitong server, at ang isang module ay maaaring maging extracted sa isang standalone service nang walang pagbubuklod ng shared table o cross-database query.

## Mga Kaugnay na Artikulo

- **[Module Structure](./module-structure)** -- Kung paano ang mga controller at repository ay inayos sa loob ng bawat module
- **[Local API Setup](./local-setup)** -- Kompletong step-by-step setup guide
