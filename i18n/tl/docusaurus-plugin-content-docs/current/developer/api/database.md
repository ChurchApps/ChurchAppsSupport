---
title: "Database"
---

# Database

<div class="article-intro">

Gumagamit ang ChurchApps API ng arkitekturang **database-per-module**. Ang bawat isa sa anim na data module ay may sariling MySQL database na may independiyenteng connection pool, na nagbibigay ng malinaw na hangganan ng data habang pinapanatili ang lahat sa loob ng iisang deployment.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- I-install ang **MySQL 8.0+** -- tingnan ang [Prerequisites](../setup/prerequisites)
- I-configure ang mga connection string ng database sa iyong `.env` file -- tingnan ang [Environment Variables](../setup/environment-variables)

</div>

## Pangkalahatang-ideya ng Arkitektura

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Mga Pangunahing Desisyon sa Disenyo

- **Isang database bawat module** -- Nagpapanatili ang bawat module ng sarili nitong MySQL database na may dedicated na connection pool (pinamamahalaan ng `KyselyPool`). Pinapanatili nitong hiwalay ang mga module at pinapayagan ang independiyenteng ebolusyon ng schema.
- **Eksklusibong pagmamay-ari** -- Binabasa at isinusulat lamang ang mga table ng isang module ng sariling code ng module na iyon. Kapag kailangan ng ibang module ang data, tinatawagan nito ang gateway ng module na may-ari sa halip na direktang mag-query sa mga table nito -- tingnan ang [Cross-Module Communication](./module-structure#cross-module-communication).
- **Repository pattern nang walang ORM** -- Dumadaan ang lahat ng data access sa mga repository class na bumubuo ng typed SQL gamit ang Kysely query builder laban sa schema ng module. Nagbibigay ito ng buong kontrol sa performance at asal ng query.
- **Multi-tenant sa disenyo** -- Naka-scope ang bawat query sa pamamagitan ng `churchId`. May kasamang column na `churchId` ang lahat ng table, at awtomatikong ipinapatupad ng repository layer ang tenant isolation.

## Mga Connection String

Naka-configure ang koneksyon ng database ng bawat module sa `.env` gamit ang standard na format ng MySQL connection string:

```
mysql://user:password@host:port/database
```

Halimbawa, maaaring ganito ang itsura ng isang local development setup:

Binabasa ng bawat module ang koneksyon nito mula sa isang environment variable na pinangalanang `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Sa production, iniimbak ang mga connection string sa AWS SSM Parameter Store at binabasa ng `Environment` class sa startup.
:::

## Mga Schema Script

Ang mga schema ng table ay tinutukoy bilang mga Kysely migration sa `tools/migrations/` directory, na naayos ayon sa module:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Tinutukoy ng mga migration ang paglikha ng table, mga index, at pagbabago sa schema. Naglalaman ang `tools/dbScripts/` directory ng demo at seed data na maaaring i-load sa ibabaw ng schema.

## Pag-initialize ng Database

### I-initialize ang lahat ng database

```bash
npm run initdb
```

Lumilikha ito ng lahat ng anim na database at nagpapatakbo ng mga migration para sa bawat isa.

### I-initialize ang iisang module

```bash
npm run initdb -- --module=membership
```

:::tip
Kapag nagtatrabaho sa isang partikular na module, maaari mong i-reinitialize ang database lamang ng module na iyon nang hindi naaapektuhan ang iba.
:::

## Pattern ng Data Access

Bumubuo ang mga repository ng mga query gamit ang Kysely query builder laban sa typed database schema ng module, na kinukuha sa pamamagitan ng function na `getDb()` ng module. Ganito ang hitsura ng isang tipikal na repository method:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Kinukuha ang mga repository sa pamamagitan ng `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Palaging isama ang `churchId` sa iyong mga query upang mapanatili ang multi-tenant isolation. Huwag kailanman mag-query sa buong tenant maliban kung mayroon kang partikular at awtorisadong dahilan upang gawin ito.
:::

## Mga Cross-Module Reference

Dahil ang data ng bawat module ay nasa hiwalay na database, walang foreign key o SQL join sa kabuuan ng mga hangganan ng module. Ang isang record na may kaugnayan sa data ng ibang module ay nag-iimbak ng id ng record na iyon -- halimbawa, may dalang `personId` ng isang tao sa membership database ang isang donasyon sa giving database -- at ang anumang cross-module na komposisyon ay nangyayari sa application code.

Ito ang constraint na gumagawa sa mga hangganan ng module na totoo: maaaring mag-evolve ang bawat schema nang independiyente, maaaring ilipat ang database ng isang module sa sarili nitong server, at maaari pang ma-extract ang isang module bilang standalone na serbisyo nang hindi kinakailangang tanggalin ang mga shared table o cross-database query.

## Mga Kaugnay na Artikulo

- **[Module Structure](./module-structure)** -- Kung paano nakaayos ang mga controller at repository sa loob ng bawat module
- **[Local API Setup](./local-setup)** -- Kumpletong hakbang-hakbang na gabay sa setup
