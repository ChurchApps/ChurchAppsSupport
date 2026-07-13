---
title: "Database"
---

# Database

<div class="article-intro">

I-ChurchApps API isebentisa umumo we-**database-nga-module ngayinye**. Module ngayinye kuma-6 edatha inayo i-database yayo ye-MySQL lene-connection pool letimele, leniketa imincele lecacile yedatha ngesikhatsi kugcinwa konkhe ngaphansi kwe-deployment yinye.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- Faka **MySQL 8.0+** -- buka [Prerequisites](../setup/prerequisites)
- Hlela emastringi ekuxhumana ne-database ku-fayela lakho le-`.env` -- buka [Environment Variables](../setup/environment-variables)

</div>

## Sifundvo Semumo

```
Api
├── membership_db   ← Bantfu, emacembu, timvumo
├── attendance_db   ← Ema-service, ticgawu, imibhalo
├── content_db      ← Emakhasi, tigaba, ema-element
├── giving_db       ← Eminikelo, tikhwama, tinkhokhelo
├── messaging_db    ← Tinkhulumo, tatiso
└── doing_db        ← Imisebenti, ema-plan, kwabelwa
```

### Tincumo Letisemcoka Temumo

- **Database yinye ku-module ngayinye** -- Module ngayinye igcina database yayo ye-MySQL lene-connection pool yayo (lephatswa yi-`KyselyPool`). Loku kugcina ema-module angahlangani futsi kuvumela schema ngayinye kutfutfuka ngayodvwana.
- **Bunikati lobodvwa** -- Emathebula e-module afundvwa futsi abhalwe ngukhodi yaleyo module kuphela. Nangabe leminye i-module idzinga idatha, ibiza i-gateway yemodule lenikatiwe kunekubuta emathebula ngco -- buka [Kukhulumisana Emkhatsini Wema-Module](./module-structure#cross-module-communication).
- **Sifanekiso se-Repository ngaphandle kwe-ORM** -- Konkhe kufinyelela idatha kuhamba ngeti-class te-repository letakha i-SQL lekhitiwe nge-Kysely query builder kuhambisana ne-schema ye-module. Loku kuniketa kulawula lokugcwele etikwekusebenta nekutiphatsa kwemibuto.
- **Kwakhelwe i-multi-tenant** -- Umbuto ngamunye uncishiswa nge-`churchId`. Onkhe emathebula afaka kholomu le-`churchId`, futsi layela lwe-repository luphatsa kwahlukaniswa kwabatsatsi ngekutentekela.

## Emastringi Ekuxhumana

Kuxhumana ne-database ye-module ngayinye kuhlelwa ku-`.env` kusetjentiswa umumo lovamile we-string wekuxhumana ye-MySQL:

```
mysql://user:password@host:port/database
```

Sibonelo, kuhlela kwekutfutfuka kwendzawo kungabukeka kanje:

Module ngayinye ifundza kuxhumana kwayo kusuka ku-environment variable lebitwa `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Ku-production, emastringi ekuxhumana agcinwa ku-AWS SSM Parameter Store futsi afundvwe yi-class le-`Environment` ekucaleni.
:::

## Ema-Script E-Schema

Ema-schema wemathebula achazwe njengema-migration e-Kysely ku-folda le-`tools/migrations/`, ahlelwe ngemodule:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Ema-migration achaza kwakhiwa kwemathebula, ema-index, kanye nekushintjwa kwe-schema. Folda le-`tools/dbScripts/` ligcina idatha ye-demo nesibonelo lengafakwa etulu kwe-schema.

## Kucalisa I-Database

### Calisa tonkhe ema-database

```bash
npm run initdb
```

Loku kwakha onkhe ema-database lasi-6 futsi kuhambise ema-migration ngamunye ngamunye.

### Calisa module linye

```bash
npm run initdb -- --module=membership
```

:::tip
Nawusebenta ku-module lelitsite, ungacalisa kabusha kuphela database yaleyo module ngaphandle kwekutsintsa leminye.
:::

## Sifanekiso Sekufinyelela Idatha

Ema-Repository akha imibuto nge-Kysely query builder kuhambisana ne-schema ye-database yemodule lekhitiwe, letfolwa nge-function ye-module ye-`getDb()`. Indlela levamile ye-repository ibukeka kanje:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Ema-Repository atfolwe nge-`RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Njalo faka i-`churchId` kumibuto yakho kuze kugcinwe kwahlukaniswa kwe-multi-tenant. Ungakaze ubute emkhatsini wabatsatsi ngaphandle kwesizatfu lesicacile lesivunyelwe.
:::

## Kubhekiswa Emkhatsini Wema-Module

Njengobe idatha ye-module ngayinye ihlala ku-database lehlukene, akukho ema-foreign key nobe ema-SQL join emkhatsini wemincele yema-module. Umbhalo lohlobene nedatha yeleminye i-module ugcina i-id yaloyo mbhalo -- sibonelo, umnikelo ku-database ye-giving utfwele i-`personId` yemuntfu ku-database ye-membership -- futsi nome ngukuphi kuhlanganiswa emkhatsini wema-module kwenteka ku-khodi ye-app.

Lesibopho yiso lesenta imincele yema-module ibe ngiyo yangempela: schema ngayinye ingatfutfuka ngayodvwana, database ye-module ingasuswa iyiswe ku-server yayo, futsi module ingakhishwa ibe insita letimele ngaphandle kwekuhlakaza emathebula lahlanganyelwako nobe imibuto lehambako emkhatsini wema-database.

## Emahlandla Lahlobene

- **[Module Structure](./module-structure)** -- Kuhlelwa kwema-controller nema-repository ngekhatsi kwe-module ngayinye
- **[Local API Setup](./local-setup)** -- Umhlahlandlela logcwele wesinyatselo ngesinyatselo
