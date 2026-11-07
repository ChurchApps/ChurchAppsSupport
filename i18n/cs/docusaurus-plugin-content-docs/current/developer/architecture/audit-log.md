---
title: "Auditní záznam a dávky s možností vrácení"
---

# Auditní záznam a dávky s možností vrácení

<div class="article-intro">

Každá změna dat vyvolaná uživatelem v Api je zaznamenána (kdo, co, kdy a odkud) napříč všemi moduly, bez nutnosti jakéhokoli nastavení v jednotlivých controllerech. Nad tímto záznamem je vrstva dávek: import nebo hromadnou akci lze označit jako dávku a později ji **vrátit zpět** po jednotlivých řádcích, v duchu Planning Center. Obojí je uloženo v jediné tabulce `auditLogs` v databázi členství a řídí se výhradně z jednoho centrálního bodu, `BaseController.actionWrapper`. Tato stránka popisuje, co se zaznamenává, kde jsou data uložena, kompromisy v oblasti výkonu, které tento návrh ovlivnily, a jak vrácení dávky probíhá bezpečně bez transakcí přes více databází.

</div>

## Přehled

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Dvě strukturální skutečnosti určují vše, co následuje:

1. **Pouze vrstva controllerů ví, kdo akci provedl.** Repozitáře nikdy nevidí `AuthenticatedUser`; `au` drží pouze controllery. Všechny controllery každého modulu už procházejí přes `BaseController.actionWrapper`, a proto se auditování napojuje právě tam. Žádné signatury repozitářů se nemění.
2. **Jedna tabulka slouží všem modulům.** Auditní záznamy pro dary, docházku, obsah apod. se zapisují do tabulky `auditLogs` v databázi členství přes `RepoManager.getRepos("membership")`, a to i z controlleru mimo modul členství. Dotaz „vše, co dnes změnila Jana“ tak zůstává jediným dotazem.

## Co se zaznamenává

Auditování je **výchozí pro každé modifikující HTTP sloveso na každé trase**. `actionWrapper` odvodí auditní pole z požadavku bez jakékoli konfigurace pro konkrétní trasu:

| Pole | Odvozeno z |
|-------|--------------|
| `module` | `this.moduleName` (modul, který je vlastní) |
| `entityType` | poslední segment `req.baseUrl` převedený do jednotného čísla (např. `/membership/people` → `person`) |
| `category` | výchozí hodnota je `entityType` |
| `action` | `${entityType}_saved` pro `POST /`, `${entityType}_deleted` pro `DELETE /:id`, jinak `${entityType}_${method}:${routePath}`, takže podřízené trasy, které nejsou CRUD (např. `task_post:/:id/move`), se zachytí automaticky |

`BaseController.AUDIT_REGISTRY` slouží **pouze k přepisům a výjimkám**. Není to seznam povolených položek. Trasa se v něm objeví, pokud chceme přejmenovat její kategorii nebo `entityType`, deklarovat `{ dbModule, table }` (čímž se stane schopnou dávkování a vrácení), označit ji jako `sensitive` (auditovat anonymní změny), nebo ji vypnout pomocí `optOut: true`.

**Seznam výjimek** (zápisové cesty s velkým objemem, které by zahltily záznam): docházka `visits` / `visitsessions` / `sessions` / `checkin` (nápor při nedělním check-inu) a zprávy `messages` / `connections` / `devices` (chat a přítomnost). Vše ostatní se zaznamenává.

**Hromadné endpointy** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) jsou registrovány v `BULK_ROUTES` a vytvářejí **jeden auditní řádek pro každé dotčené id**. Import 10 000 osob tak vytvoří 10 000 řádků. Právě tato granularita po entitách umožňuje dávku vrátit zpět.

**Anonymní změny** (`actionWrapperAnon`, tedy anonymní dary, registrace hostů a odeslání formulářů) se auditují pouze u tras označených v registru jako `sensitive`. Zapisují se s `userId="anonymous"` a IP adresou klienta. V čele jsou dary; tato cesta má skutečnou historii regresí.

### Redakce tajných údajů a limity velikosti

Před uložením jakéhokoli payloadu `details` spustí `AuditLogHelper.capDetails()` nad ním `sanitizeValue()`:

- **Tajné klíče se redagují.** Každé pole, jehož název malými písmeny je v `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), se nahradí hodnotou `"[redacted]"`.
- **Velké skaláry se odstraňují.** Každý URI `data:` nebo řetězec delší než 4 KB (base64 fotografie, binární bloby) se změní na `"[stripped]"`.
- **Příliš velké řádky se omezují.** Pokud serializovaný JSON přesáhne přibližně 64 KB, celý payload se nahradí hodnotou `{ truncated: true }`. Zkrácené řádky jsou stále k zobrazení, ale **nelze je vrátit zpět**, protože není z čeho obnovit stav před a po změně.

## Kde jsou data uložena

Jediná tabulka `auditLogs` v databázi **členství** slouží všem modulům. Sloupce: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Migrace `tools/migrations/membership/2026-07-04_audit_universal.ts` přidává sloupce `module` a `batchId`, rozšiřuje `details` z `TEXT` na `MEDIUMTEXT`, přidává indexy `ix_auditLogs_batch (batchId)` a `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` a vytváří tabulku `batches`. Sloupec `module` existuje právě proto, aby kolize `entityType` mezi moduly (`note` a `setting` existují v několika) zůstaly filtrovatelné. Entitní index pohání jak historii po jednotlivých entitách, tak kontrolu konfliktů při vrácení.

Zápisy mezi moduly probíhají přes `RepoManager.getRepos("membership")` uvnitř wrapperu. Pořadí je záměrné: **hlavní zápis se nejprve potvrdí v databázi modulu, auditní vložení až poté.** V normálním režimu se chyba auditního vložení potichu spolkne (`console.error`, Sentry ji zachytí). Audit je pouze informativní a nesmí nikdy selhat požadavek uživatele. V **dávkovém režimu je striktní** (viz níže).

:::info Proč ne triggery, CDC nebo tabulky pro jednotlivé moduly?
- **Triggery MySQL** neznají uživatele, který akci provedl (připojení nemá `au`), a znamenaly by udržování sad triggerů ve všech schématech.
- **binlog / CDC** je samostatný infrastrukturní projekt se stejným problémem s identitou aktéra.
- **Předávání `userId` přes každý repozitář** by změnilo stovky souborů jen proto, aby se přesunula informace, kterou vrstva controllerů už má.
- **Auditní tabulky pro každý modul** by znamenaly sedminásobek zapojení a dotazy rozesílané přes všechny moduly pro jakoukoli otázku napříč moduly. Jediná tabulka v centrálním bodu controllerů je nejmenší návrh s nejmenším množstvím kódu, který stále zachytí aktéra.
:::

## Přístup k výkonu

Běžná cesta je záměrně levná. Náklady se platí pouze tam, kde něco přinášejí.

- **Žádné čtení před zápisem u běžných úprav.** Běžné uložení **nenačítá** starý záznam. **Odeslané hodnoty po změně** se uloží do `details.after`. Uživatelské rozhraní rekonstruuje přechod stará→nová hodnota až **při zobrazení**, porovnáním s předchozím auditním řádkem entity. Jeden dotaz při zobrazení, nulové náklady při zápisu. Pole, na která se od spuštění nesáhlo, prostě nezobrazí „starou“ hodnotu. To je přijatelné.
- **Smazání obsahuje obraz před změnou.** `DELETE /:id` na trase registru s `{ dbModule, table }` nejprve obecně načte řádek a uloží ho do `details.before`. Smazání jsou vzácná a obraz před změnou je celá forenzní hodnota.
- **Dávkový režim je jediné systematické čtení před zápisem** a je volitelný. Hromadná operace nebo import jsou už tak nákladné, že N čtení snímků je cena za možnost vrácení.
- **Auditní vložení se čekají (`await`).** `actionWrapper` shromáždí sliby zápisů a před návratem zavolá `await Promise.allSettled(...)`. Toto je nejdůležitější invariant: na Lambdě se kontejner **zmrazí ihned po vrácení odpovědi**, takže nečekané vložení se tiše ztratí. „Fire and forget“ zde znamená *chyby nikdy nezruší požadavek*, nikoli *nečekat*. Jedno vložení do již zahřátého poolu databáze členství trvá přibližně 1–3 ms.

## Dávky a vrácení

**Dávka** seskupuje sadu změn, aby je bylo možné společně zkontrolovat a společně vrátit zpět. Otevřít ji lze dvěma způsoby:

- **Explicitně:** `POST /membership/batches { label, source }` vrátí `batchId`. Klient (B1Transfer, importní rozhraní B1Admin) pak posílá `X-Batch-Id: <id>` u každého dalšího uložení nebo smazání. `POST /membership/batches/:id/complete` ji uzavře a zapíše `itemCount`.
- **Implicitně:** čtyři hromadné endpointy otevřou, naplní a dokončí vlastní dávku uvnitř jednoho požadavku a `batchId` vrátí v odpovědi.

Tabulka `batches` (databáze členství): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Dávkový režim je striktní

Když je přítomna hlavička `X-Batch-Id`, `actionWrapper` zpřísní každou kontrolu (`writeBatchAuditRows`):

1. Dávka musí existovat, být `open` a patřit k `au.churchId`. Jinak **403**.
2. Trasa musí podporovat dávku (`{ dbModule, table }` v registru). Jinak **400**.
3. Před spuštěním akce se obrazy všech dotčených id před změnou načtou jedním dotazem `WHERE id IN (...) AND churchId = ?`. Pokud toto čtení snímku selže, požadavek **skončí chybou 500 a akce se nespustí**. Dávkový režim nesmí nikdy tiše vytvořit záznam, který nelze vrátit zpět. (Naproti tomu normální režim je best-effort a selhání snímku potichu ignoruje.)
4. Po úspěšné akci se pro každou entitu zapíše jeden auditní řádek s `batchId`, `details.before` a `details.after`, plus explicitní **značka vytvoření** pro řádky, které dávka vytvořila.

### Vrácení

`POST /membership/batches/:id/undo` (oprávnění: tvůrce dávky nebo `Permissions.server.admin`). Požadavek se odmítne, pokud dávka není ve stavu `completed` nebo je starší než **30denní okno pro vrácení**. `BatchUndoHelper.undo()` pak:

1. Načte auditní řádky dávky a **seskupí je podle `(module, entityType, entityId)`**. Entita, které se v rámci jedné dávky dotklo vícekrát, se vrátí **jednou**, do skutečného stavu před dávkou. To znamená k nejstaršímu obrazu před změnou, nebo se smaže, pokud ji dávka vytvořila. Proto vrácení nepřehrává jednotlivé řádky naslepo: obnovit mezilehlý snímek uprostřed dávky by bylo chybné.
2. Pro každou entitu nejprve spustí **kontrolu konfliktů**: `auditLog.hasLaterModification()` zjistí, zda pro stejnou trojici `(module, entityType, entityId)` existuje *pozdější* auditní záznam mimo tuto dávku. Pokud ano, entita byla upravena až po importu. Je **přeskočena a nahlášena**, nikdy přepsána. Tím se jako detektor změn používá samotný auditní záznam; žádná tabulka nepotřebuje sloupce `modifiedAt`.
3. Provede vrácení podle zaznamenané operace, s `{ dbModule, table }` načteným z registru a s obecnými zápisy Kysely:
   - **vytvořeno** → fyzicky smazat řádek.
   - **upraveno** → zapsat zpět `details.before`.
   - **smazáno** → znovu vložit `details.before` (aktualizovat, nebo vložit, pokud se řádek s daným id mezitím znovu objevil).
4. Každé vrácení se samo auditně zaznamená (`action: "<entityType>_undone"`, bez `batchId`, protože vrácení vrácení je mimo rozsah).

Operace se určuje podle explicitní **značky vytvoření**, nikoli odvozením z chybějícího obrazu před změnou. Legitimně prázdný obraz nebo zkrácený řádek se nesmí zaměnit za vytvoření.

Výsledný payload je `{ restored, skippedConflicts: [...], failed: [...], status }`; dávka přejde do stavu `undone` (čistě) nebo `partial`. **Neexistuje transakce přes více databází.** Vrácení je po jednotlivých řádcích best-effort, což je stejné omezení, jaké Planning Center dokumentuje u sloučených profilů.

:::warning Entity s vedlejšími efekty potřebují hook `onUndo`
Vrácení vytvoření `groupMember` musí zároveň zapsat `groupMemberHistory` („left“), jinak se tiše rozbijí analýzy odlivu. Je to trvalý invariant pracovního prostoru. Takové entity registrují callback `onUndo` v `AUDIT_REGISTRY`, který vrátí `true`, pokud vrácení zpracoval úplně, a obejde tak obecnou cestu. Kanonickým případem jsou `groupMembers` (na explicitní cestě indexované podle id řádku, na hromadných endpointech podle `personId` a sledované v historii při každém přidání a odebrání).
:::

## Konzumentské plochy

Obě rozhraní pro správce jsou **v přípravě**. Záměr je tento:

| Plocha | Repozitář | Účel |
|---------|------|---------|
| **Stránka Audit Log** | B1Admin (ManageChurch → Audit Log) | Filtrovat podle modulu, kategorie, uživatele nebo entity a zobrazit přechody stará→nová. U úprav porovnáním s předchozím záznamem entity, u smazání z `details.before`. Napojeno na `GET /membership/auditlogs`, chráněno oprávněním `Permissions.server.admin`. |
| **Stránka Batches** | B1Admin (stejný hub Settings) | Seznam dávek se stavem a počty, **View Results** (auditní řádky dávky přes `GET /membership/batches/:id/results`) a tlačítko **Undo**, které zobrazí hlášení přeskočených konfliktů a selhání. |
| **Importní dávky** | B1Transfer | Otevřít dávku, posílat `X-Batch-Id` u jejích běžných uložení a na konci ji dokončit. Importy lze vracet zpět bez nových importních endpointů. Starší `importKey` zůstává jako značka původu pouze pro vytváření; pro vrácení je nahrazen. |

## Úskalí, která nesmí budoucí změna narušit

- **Auditní vložení musí zůstat čekaná.** Nečekané `AuditLogHelper.log(...)` se na Lambdě kvůli zmrazení zahodí. Shromážděte sliby a před návratem použijte `await Promise.allSettled`.
- **Kysely vynechává `undefined` v `.set()` a `.values()`.** Při obnovení by se vymazaný sloupec zachoval beze změny. `BatchUndoHelper` převádí každé chybějící pole na explicitní `null` (`nullify`). Nikdy to neobcházejte kvůli „rychlejšímu“ přímému zápisu.
- **Uchovávání musí zůstat výrazně nad oknem pro vrácení.** `AuditLogRepo.deleteOld()` běží na nočním časovači (výchozí uchovávání 365 dní), zatímco okno pro vrácení je 30 dní. Pokud by se uchovávání někdy přiblížilo k tomuto oknu, auditní záznamy by byly smazány zpod otevřených dávek.
- **Zkrácené řádky nelze vrátit.** Payload `{ truncated: true }` nemá obraz před a po změně. Vrácení jej nahlásí jako `failed` a nikdy nehádá.
- **Pořadí je zápis modulu, poté audit.** Nikdy nepřesouvejte auditní vložení před skutečný zápis a držte jej striktní v dávce a informativní v normálním režimu.

## Seznam souborů

| Oblast | Soubory |
|------|-------|
| Wrapper a registr | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snímek a zápis řádků) |
| Motor vrácení | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Pomocník auditu | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllery | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modely a repozitáře | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrace | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Administrační UI (v přípravě) | Stránky B1Admin Audit Log a Batches; hlavička importní dávky v B1Transfer |

## Související stránky

- [Struktura modulů](../api/module-structure) – jak se controller mimo modul členství dostane k repozitářům členství přes `RepoManager`
- [Dary](./giving) – zápisové cesty darů, které jsou auditovány jako `sensitive`, i když jsou anonymní
- [Endpointy členství](../api/endpoints/membership) – REST rozhraní, které nese `X-Batch-Id` a vystavuje `/auditlogs` a `/batches`
