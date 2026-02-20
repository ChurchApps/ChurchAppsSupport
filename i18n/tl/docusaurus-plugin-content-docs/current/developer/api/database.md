---
title: "Database"
---

# Database

<div class="article-intro">

Gumagamit ang ChurchApps API ng arkitekturang **database-per-module**. Ang bawat isa sa anim na module ay may sariling MySQL database na may independiyenteng connection pool, na nagbibigay ng malinaw na hangganan ng data habang pinapanatili ang lahat sa isang deployment.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Mag-install ng **MySQL 8.0+** -- tingnan ang [Mga Pangangailangan](../setup/prerequisites)
- I-configure ang mga database connection string sa iyong `.env` file -- tingnan ang [Mga Variable ng Kapaligiran](../setup/environment-variables)

</div>

## Pangkalahatang-tanaw ng Arkitektura

```
Api
├── membership_db   ← Mga tao, grupo, pahintulot
├── attendance_db   ← Mga serbisyo, sesyon, talaan
├── content_db      ← Mga pahina, seksyon, elemento
├── giving_db       ← Mga donasyon, pondo, bayad
├── messaging_db    ← Mga pag-uusap, abiso
└── doing_db        ← Mga gawain, plano, takdang-aralin
```

### Mahahalagang Desisyon sa Disenyo

- **Isang database bawat module** -- Ang bawat module ay nagpapanatili ng sariling MySQL database na may dedikadong connection pool (`EnhancedPoolHelper`). Pinapanatili nitong magkahiwalay ang mga module at pinapayagan ang independiyenteng ebolusyon ng schema.
- **Repository pattern na may direktang SQL** -- Walang ORM. Lahat ng pag-access ng data ay dumadaan sa mga repository class na nagpapatupad ng SQL nang direkta gamit ang `DB.query()`. Nagbibigay ito ng ganap na kontrol sa performance at pag-uugali ng query.
- **Multi-tenant ayon sa disenyo** -- Bawat query ay naka-scope sa `churchId`. Lahat ng talahanayan ay may kasamang `churchId` na kolum, at awtomatikong ipinapatupad ng repository layer ang paghihiwalay ng tenant.

## Mga Connection String

Ang database connection ng bawat module ay naka-configure sa `.env` gamit ang karaniwang format ng MySQL connection string:

```
mysql://user:password@host:port/database
```

Halimbawa, ang isang local na development setup ay maaaring ganito ang hitsura:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Sa production, ang mga connection string ay naka-imbak sa AWS SSM Parameter Store at binabasa ng `Environment` class sa pagsisimula.
:::

## Mga Script ng Schema

Ang mga database schema script ay matatagpuan sa direktoryo ng `tools/dbScripts/`, na inorganisa ayon sa module:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Ang mga script na ito ay tumutukoy sa paglikha ng talahanayan, mga index, at anumang kinakailangang seed data.

## Pagsisimula ng Database

### Simulan ang lahat ng database

```bash
npm run initdb
```

Lumilikha ito ng lahat ng anim na database at pinapatakbo ang mga schema script para sa bawat isa.

### Simulan ang isang module

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Kapag nagtatrabaho sa isang partikular na module, maaari mong i-reinitialize lamang ang database ng module na iyon nang hindi naaapektuhan ang iba.
:::

## Pattern ng Pag-access ng Data

Ina-access ng mga repository ang data sa pamamagitan ng `DB.query()` method. Ang isang karaniwang repository method ay ganito ang hitsura:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Ang mga repository ay nakukuha sa pamamagitan ng `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Palaging isama ang `churchId` sa iyong mga query upang mapanatili ang multi-tenant na paghihiwalay. Huwag mag-query sa mga tenant maliban kung may partikular at awtorisadong dahilan upang gawin ito.
:::

## Mga Kaugnay na Artikulo

- **[Istraktura ng Module](./module-structure)** -- Kung paano inorganisa ang mga controller at repository sa loob ng bawat module
- **[Lokal na Pag-setup ng API](./local-setup)** -- Kumpletong gabay sa pag-setup nang sunud-sunod
