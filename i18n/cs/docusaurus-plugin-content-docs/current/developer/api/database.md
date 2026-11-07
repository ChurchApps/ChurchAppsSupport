---
title: "Databáze"
---

# Databáze

<div class="article-intro">

API ChurchApps používá architekturu **jedna databáze na modul**. Každý ze šesti datových modulů má vlastní databázi MySQL s nezávislým připojovacím fondem. Data jsou tak jasně oddělena, a přitom vše běží v rámci jediného nasazení.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **MySQL 8.0+** -- viz [Požadavky](../setup/prerequisites)
- Nastavte připojovací řetězce k databázi v souboru `.env` -- viz [Proměnné prostředí](../setup/environment-variables)

</div>

## Přehled architektury

```
Api
├── membership_db   ← Lidé, skupiny, oprávnění
├── attendance_db   ← Služby, relace, záznamy
├── content_db      ← Stránky, sekce, prvky
├── giving_db       ← Dary, fondy, platby
├── messaging_db    ← Konverzace, oznámení
└── doing_db        ← Úkoly, plány, přiřazení
```

### Klíčová návrhová rozhodnutí

- **Jedna databáze na modul** -- Každý modul spravuje vlastní databázi MySQL s vyhrazeným připojovacím fondem (spravovaným třídou `KyselyPool`). Moduly tak zůstávají oddělené a každé schéma se může vyvíjet nezávisle.
- **Výhradní vlastnictví** -- Tabulky modulu čte a zapisuje pouze kód daného modulu. Když jiný modul potřebuje tato data, volá bránu (gateway) vlastnícího modulu, místo aby tabulky dotazoval přímo -- viz [Komunikace mezi moduly](./module-structure#cross-module-communication).
- **Vzor repozitáře bez ORM** -- Veškerý přístup k datům probíhá přes třídy repozitářů, které pomocí query builderu Kysely sestavují typované SQL dotazy nad schématem modulu. To dává plnou kontrolu nad výkonem a chováním dotazů.
- **Multi-tenant již od návrhu** -- Každý dotaz je omezen na `churchId`. Všechny tabulky obsahují sloupec `churchId` a vrstva repozitářů izolaci tenantů vynucuje automaticky.

## Připojovací řetězce

Připojení každého modulu k databázi se nastavuje v souboru `.env` pomocí standardního formátu připojovacího řetězce MySQL:

```
mysql://user:password@host:port/database
```

Například lokální vývojové nastavení může vypadat takto:

Každý modul čte své připojení z proměnné prostředí s názvem `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
V produkci jsou připojovací řetězce uloženy v AWS SSM Parameter Store a při startu je načítá třída `Environment`.
:::

## Skripty schématu

Tabulková schémata jsou definována jako migrace Kysely v adresáři `tools/migrations/`, uspořádané podle modulů:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrace definují vytváření tabulek, indexy a změny schématu. Adresář `tools/dbScripts/` obsahuje demo a testovací data, která lze nahrát na schéma.

## Inicializace databází

### Inicializace všech databází

```bash
npm run initdb
```

Tento příkaz vytvoří všech šest databází a spustí migrace pro každou z nich.

### Inicializace jednoho modulu

```bash
npm run initdb -- --module=membership
```

:::tip
Při práci na konkrétním modulu můžete znovu inicializovat jen databázi tohoto modulu, aniž byste ovlivnili ostatní.
:::

## Vzor přístupu k datům

Repozitáře sestavují dotazy pomocí query builderu Kysely nad typovaným schématem databáze modulu, které získávají přes funkci `getDb()` daného modulu. Typická metoda repozitáře vypadá takto:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repozitáře se získávají přes `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Vždy zahrnujte `churchId` do svých dotazů, aby byla zachována izolace tenantů. Nikdy nedotazujte data napříč tenanty, pokud k tomu nemáte konkrétní a oprávněný důvod.
:::

## Reference mezi moduly

Protože data každého modulu žijí v samostatné databázi, neexistují žádné cizí klíče ani SQL spojení přes hranice modulů. Záznam, který souvisí s daty jiného modulu, proto uloží jeho id -- například dar v databázi giving nese `personId` osoby z databáze membership. Veškeré skládání dat napříč moduly probíhá v aplikačním kódu.

Toto omezení činí hranice modulů skutečnými: každé schéma se může vyvíjet nezávisle, databázi modulu lze přesunout na vlastní server a modul lze dokonce vyčlenit jako samostatnou službu, aniž by bylo nutné rozplétat sdílené tabulky nebo dotazy napříč databázemi.

## Související články

- **[Struktura modulu](./module-structure)** -- Jak jsou controllery a repozitáře uspořádány uvnitř každého modulu
- **[Lokální nastavení API](./local-setup)** -- Kompletní průvodce nastavením krok za krokem
