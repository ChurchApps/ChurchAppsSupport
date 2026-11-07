---
title: "Duomenų bazė"
---

# Duomenų bazė

<div class="article-intro">

ChurchApps API naudoja **architektūrą „viena duomenų bazė kiekvienam moduliui“**. Kiekvienas iš šešių duomenų modulių turi savo MySQL duomenų bazę su nepriklausomu ryšių baseinu. Taip duomenų ribos išlieka aiškios, o viskas veikia viename diegime.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Įdiekite **MySQL 8.0+** -- žr. [Reikalavimai](../setup/prerequisites)
- Nustatykite duomenų bazės ryšio eilutes `.env` faile -- žr. [Aplinkos kintamieji](../setup/environment-variables)

</div>

## Architektūros apžvalga

```
Api
├── membership_db   ← Asmenys, grupės, leidimai
├── attendance_db   ← Pamaldos, sesijos, įrašai
├── content_db      ← Puslapiai, skyriai, elementai
├── giving_db       ← Aukos, fondai, mokėjimai
├── messaging_db    ← Pokalbiai, pranešimai
└── doing_db        ← Užduotys, planai, paskyrimai
```

### Pagrindiniai projektiniai sprendimai

- **Viena duomenų bazė kiekvienam moduliui** -- Kiekvienas modulis turi savo MySQL duomenų bazę su atskiru ryšių baseinu (valdomu `KyselyPool`). Tai leidžia moduliams būti nepriklausomiems ir keistis schemai savarankiškai.
- **Išimtinė nuosavybė** -- Modulio lenteles skaito ir rašo tik to modulio kodas. Kai kitam moduliui reikia šių duomenų, jis kreipiasi į savininko modulio šliuzą, o ne pats užklausia lenteles -- žr. [Tarpmodulinė komunikacija](./module-structure#cross-module-communication).
- **Repozitorijų šablonas be ORM** -- Visa duomenų prieiga vyksta per repozitorijų klases, kurios su Kysely užklausų kūrėju sukuria tipizuotas SQL užklausas pagal modulio schemą. Tai suteikia pilną kontrolę nad užklausų našumu ir elgsena.
- **Sukurta kaip daugianuomininkė sistema** -- Kiekviena užklausa apribojama `churchId`. Visos lentelės turi `churchId` stulpelį, o repozitorijų sluoksnis automatiškai užtikrina nuomininkų izoliaciją.

## Ryšio eilutės

Kiekvieno modulio duomenų bazės ryšys nustatomas `.env` faile naudojant standartinį MySQL ryšio eilutės formatą:

```
mysql://user:password@host:port/database
```

Pavyzdžiui, vietinės kūrimo aplinkos konfigūracija gali atrodyti taip:

Kiekvienas modulis nuskaito savo ryšį iš aplinkos kintamojo, pavadinto `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Gamyboje ryšio eilutės saugomos AWS SSM Parameter Store ir paleidimo metu nuskaitomos `Environment` klasės.
:::

## Schemos skriptai

Lentelių schemos apibrėžtos Kysely migracijomis `tools/migrations/` kataloge, suskirstytomis pagal modulį:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migracijose aprašomas lentelių kūrimas, indeksai ir schemos pakeitimai. `tools/dbScripts/` kataloge yra demonstraciniai ir pradiniai duomenys, kuriuos galima įkelti ant schemos.

## Duomenų bazės inicializavimas

### Inicializuoti visas duomenų bazes

```bash
npm run initdb
```

Tai sukuria visas šešias duomenų bazes ir kiekvienai iš jų paleidžia migracijas.

### Inicializuoti vieną modulį

```bash
npm run initdb -- --module=membership
```

:::tip
Dirbdami su konkrečiu moduliu, galite iš naujo inicializuoti tik to modulio duomenų bazę, nepaveikdami kitų.
:::

## Duomenų prieigos modelis

Repozitorijos sudaro užklausas su Kysely užklausų kūrėju pagal modulio tipizuotą duomenų bazės schemą, gautą per modulio `getDb()` funkciją. Tipinis repozitorijos metodas atrodo taip:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repozitorijas gaunama per `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Visada įtraukite `churchId` į užklausas, kad išlaikytumėte daugianuomininkę izoliaciją. Niekada nevykdykite užklausų tarp nuomininkų, nebent turite konkrečią, įgaliotą priežastį.
:::

## Tarpmoduliniai ryšiai

Kadangi kiekvieno modulio duomenys yra atskirose duomenų bazėse, tarp modulių ribų nėra užsienio raktų ar SQL jungčių. Įrašas, susijęs su kito modulio duomenimis, saugo to įrašo id -- pavyzdžiui, `giving` duomenų bazės auka saugo `membership` duomenų bazės asmens `personId` -- o visas tarpmodulinis sujungimas vyksta programos kode.

Šis apribojimas ir daro modulių ribas tikras: kiekviena schema gali keistis nepriklausomai, modulio duomenų bazę galima perkelti į atskirą serverį, o modulį net galima išskirti į atskirą paslaugą, neperrišant bendrų lentelių ar tarpduomenų bazinių užklausų.

## Susiję straipsniai

- **[Modulio struktūra](./module-structure)** -- Kaip valdikliai ir repozitorijos organizuojami kiekviename modulyje
- **[Vietinė API sąranka](./local-setup)** -- Išsamus žingsnis po žingsnio diegimo vadovas
