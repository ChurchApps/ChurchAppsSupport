---
title: "Adatbázis"
---

# Adatbázis

<div class="article-intro">

A ChurchApps API **modulonkénti adatbázis** architektúrát használ. Az öt adatmodul mindegyikének saját MySQL-adatbázisa és független kapcsolatkezelő készlete (connection pool) van. Ez egyértelmű adathatárokat biztosít, miközben minden egyetlen telepítésen belül marad.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **MySQL 8.0+** verziót – lásd: [Előfeltételek](../setup/prerequisites)
- Állítsa be az adatbázis-kapcsolati karakterláncokat a `.env` fájlban – lásd: [Környezeti változók](../setup/environment-variables)

</div>

## Architektúra áttekintése

```
Api
├── membership_db   ← Személyek, csoportok, jogosultságok
├── attendance_db   ← Istentiszteletek, alkalmak, nyilvántartások
├── content_db      ← Oldalak, szakaszok, elemek
├── giving_db       ← Adományok, alapok, fizetések
├── messaging_db    ← Beszélgetések, értesítések
└── doing_db        ← Feladatok, tervek, hozzárendelések
```

### Fontos tervezési döntések

- **Egy adatbázis modulonként** – Minden modul saját MySQL-adatbázist használ, dedikált kapcsolatkezelő készlettel (a `KyselyPool` kezeli). Ez függetlenné teszi a modulokat, és lehetővé teszi a sémák önálló fejlesztését.
- **Kizárólagos tulajdonjog** – Egy modul táblái kizárólag az adott modul saját kódja által olvashatók és írhatók. Ha egy másik modulnak van szüksége ezekre az adatokra, a tulajdonos modul átjáróját (gateway) hívja meg, nem pedig közvetlenül a táblákat kérdezi le – lásd: [Modulok közötti kommunikáció](./module-structure#cross-module-communication).
- **Repository-minta ORM nélkül** – Az összes adateléréssel repository-osztályokon keresztül dolgozunk, amelyek a Kysely lekérdezésépítővel, típusos SQL-t építenek a modul sémája ellen. Ez teljes kontrollt ad a lekérdezések teljesítménye és viselkedése felett.
- **Több bérlős (multi-tenant) felépítés** – Minden lekérdezés `churchId` szerint szűrt. Minden tábla tartalmaz `churchId` oszlopot, a repository-réteg pedig automatikusan biztosítja a bérlők elkülönítését.

## Kapcsolati karakterláncok

Minden modul adatbázis-kapcsolatát a `.env` fájlban, a szokásos MySQL-kapcsolati karakterlánc formátumban állítjuk be:

```
mysql://user:password@host:port/database
```

Egy helyi fejlesztői környezet például így nézhet ki:

Minden modul a `<MODULE>_CONNECTION_STRING` nevű környezeti változóból olvassa a kapcsolatot:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Éles környezetben a kapcsolati karakterláncok az AWS SSM Parameter Store-ban vannak tárolva, és az indításkor a `Environment` osztály olvassa be őket.
:::

## Sémaszkriptek

A táblasémákat Kysely-migrációkként definiáljuk a `tools/migrations/` könyvtárban, modulonként rendezve:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

A migrációk határozzák meg a táblák létrehozását, az indexeket és a sémamódosításokat. A `tools/dbScripts/` könyvtár demó- és kezdeti adatokat tartalmaz, amelyeket a séma betöltése után lehet betölteni.

## Adatbázis inicializálása

### Összes adatbázis inicializálása

```bash
npm run initdb
```

Ez létrehozza mind a hat adatbázist, és lefuttatja az egyes adatbázisok migrációit.

### Egyetlen modul inicializálása

```bash
npm run initdb -- --module=membership
```

:::tip
Ha egy adott modulon dolgozik, csak az adott modul adatbázisát inicializálhatja újra, a többi adatbázis érintése nélkül.
:::

## Adatelérési minta

A repository-k a Kysely lekérdezésépítővel állítanak össze lekérdezéseket a modul típusos adatbázissémája ellen, amelyet a modul `getDb()` függvényén keresztül érnek el. Egy tipikus repository-metódus így néz ki:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

A repository-kat a `RepoManager` segítségével kérhetjük le:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Mindig szerepeltesse a `churchId` értéket a lekérdezéseiben, hogy megőrizze a több bérlős elkülönítést. Soha ne kérdezzen le több bérlő adatait egyszerre, hacsak nincs rá konkrét, jogosult indoka.
:::

## Modulok közötti hivatkozások

Mivel minden modul adatai külön adatbázisban vannak, a modulhatárokon átívelő idegen kulcsok (foreign key) és SQL-illesztések (join) nem léteznek. Ha egy rekord egy másik modul adataihoz kapcsolódik, a rekord a másik rekord azonosítóját tárolja – például a giving adatbázisban lévő adomány tartalmazza a membership adatbázisban lévő személy `personId` értékét –, a modulok közötti összeállítás pedig az alkalmazáskódban történik.

Ez a korlátozás teszi valósággá a modulhatárokat: minden séma önállóan fejlődhet, egy modul adatbázisa saját szerverre helyezhető át, sőt egy modul akár önálló szolgáltatássá is kiemelhető megosztott táblák vagy adatbázisok közötti lekérdezések szétbogozása nélkül.

## Kapcsolódó cikkek

- **[Modulstruktúra](./module-structure)** – Hogyan szerveződnek a vezérlők és a repository-k az egyes modulokon belül
- **[Helyi API-beállítás](./local-setup)** – Teljes, lépésről lépésre haladó telepítési útmutató
