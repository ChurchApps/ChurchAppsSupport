---
title: "Databáza"
description: "Naučte sa, ako API ChurchApps rozdeľuje údaje do šiestich databáz MySQL, jednej pre každý modul, a ako nastaviť pripojenia a ich inicializovať."
---

# Databáza

<div class="article-intro">

ChurchApps API používa architektúru **databáza-na-modul**. Každý zo šiestich dátových modulov má vlastnú databázu MySQL s nezávislým pool pripojení, čo poskytuje jasné hranice dát a zároveň všetko udržiava v rámci jedného nasadenia.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte **MySQL 8.0+** -- pozrite si [Požiadavky](../setup/prerequisites.md)
- Nakonfigurujte reťazce pripojenia k databáze vo vašom súbore `.env` -- pozrite si [Premenné prostredia](../setup/environment-variables.md)

</div>

## Prehľad architektúry

```
Api
├── membership_db   ← Ľudia, skupiny, oprávnenia
├── attendance_db   ← Služby, relácie, záznamy
├── content_db      ← Stránky, sekcie, prvky
├── giving_db       ← Dary, fondy, platby
├── messaging_db    ← Konverzácie, upozornenia
└── doing_db        ← Úlohy, plány, priradenia
```

### Kľúčové návrhové rozhodnutia

- **Jedna databáza na modul** -- Každý modul spravuje vlastnú databázu MySQL s vyhradeným pool pripojení (spravovaným cez `KyselyPool`). To udržiava moduly oddelené a umožňuje nezávislý vývoj schémy.
- **Výhradné vlastníctvo** -- Tabuľky modulu čítá a zapisuje iba kód daného modulu. Keď iný modul potrebuje tieto dáta, volá bránu vlastniaceho modulu namiesto toho, aby tabuľky dopytoval priamo -- pozrite si [Komunikácia medzi modulmi](./module-structure.md#cross-module-communication).
- **Vzor repozitára bez ORM** -- Všetok prístup k dátam prebieha cez triedy repozitárov, ktoré vytvárajú typované SQL dopyty pomocou staviteľa dopytov Kysely voči schéme modulu. To dáva plnú kontrolu nad výkonom a správaním dopytov.
- **Multi-tenant od začiatku** -- Každý dopyt je obmedzený na `churchId`. Všetky tabuľky obsahujú stĺpec `churchId` a vrstva repozitárov automaticky vynucuje izoláciu tenantov.

## Reťazce pripojenia

Pripojenie k databáze každého modulu sa konfiguruje v `.env` pomocou štandardného formátu reťazca pripojenia MySQL:

```
mysql://user:password@host:port/database
```

Napríklad lokálne vývojové nastavenie môže vyzerať takto:

Každý modul číta svoje pripojenie z premennej prostredia s názvom `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
V produkcii sú reťazce pripojenia uložené v AWS SSM Parameter Store a pri spustení ich načíta trieda `Environment`.
:::

## Skripty schémy

Schémy tabuliek sú definované ako migrácie Kysely v adresári `tools/migrations/`, usporiadané podľa modulov:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrácie definujú vytváranie tabuliek, indexy a zmeny schémy. Adresár `tools/dbScripts/` obsahuje demo a testovacie dáta, ktoré je možné načítať na existujúcu schému.

## Inicializácia databázy

### Inicializácia všetkých databáz

```bash
npm run initdb
```

Tento príkaz vytvorí všetci šesť databáz a spustí migrácie pre každú z nich.

### Inicializácia jedného modulu

```bash
npm run initdb -- --module=membership
```

:::tip
Pri práci na konkrétnom module môžete znova inicializovať iba databázu tohto modulu bez ovplyvnenia ostatných.
:::

## Vzor prístupu k dátam

Repozitáre vytvárajú dopyty pomocou staviteľa dopytov Kysely voči typovanej schéme databázy modulu, ktorú získajú cez funkciu `getDb()` modulu. Typická metóda repozitára vyzerá takto:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repozitáre sa získavajú cez `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Vo všetkých dopytoch vždy uvádzajte `churchId`, aby ste zachovali izoláciu tenantov. Nikdy nedopytujte dáta naprieč tenantmi, pokiaľ na to nemáte konkrétny a autorizovaný dôvod.
:::

## Referencie medzi modulmi

Keďže dáta každého modulu sa nachádzajú v samostatnej databáze, neexistujú cudzie kľúče ani SQL spojenia naprieč hranicami modulov. Záznam, ktorý súvisí s dátami iného modulu, uchováva id tohto záznamu -- napríklad dar v databáze giving nesie `personId` osoby z databázy membership -- a akékoľvek skladanie dát naprieč modulmi sa deje v aplikačnom kóde.

Toto obmedzenie robí hranice modulov skutočnými: každá schéma sa môže vyvíjať nezávisle, databáza modulu sa dá presunúť na vlastný server a modul by dokonca mohol byť vyčlenený ako samostatná služba bez rozplietania zdieľaných tabuliek alebo dopytov naprieč databázami.

## Súvisiace články

- **[Štruktúra modulu](./module-structure.md)** -- Ako sú controllery a repozitáre usporiadané v rámci každého modulu
- **[Lokálne nastavenie API](./local-setup.md)** -- Úplný podrobný sprievodca nastavením
