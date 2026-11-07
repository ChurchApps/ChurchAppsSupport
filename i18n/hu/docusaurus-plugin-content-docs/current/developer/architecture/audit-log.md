---
title: "Naplózás és visszavonható kötegek"
---

# Naplózás és visszavonható kötegek

<div class="article-intro">

Az API-ban minden felhasználó által kezdeményezett módosítás rögzítésre kerül: ki, mit, mikor és honnan. Ez minden modulra kiterjed, modulonkénti bekötés nélkül. Erre épül a kötegrétegen: egy import vagy tömeges művelet kötegként jelölhető meg, majd később sorról sorra **visszavonható**, a Planning Center mintájára. Mindkettő egyetlen `auditLogs` táblában él a membership adatbázisban, és egyetlen központi ponton, a `BaseController.actionWrapper`-en keresztül vezérlődik. Ez az oldal bemutatja, mi kerül naplózásra, hol tárolódnak az adatok, milyen teljesítménybeli kompromisszumok formálják a rendszert, és hogyan vonja vissza biztonságosan a visszavonás a köteget adatbázisok közötti tranzakciók nélkül.

</div>

## Áttekintés

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

Két szerkezeti tény határozza meg az alábbiakat:

1. **A vezérlőréteg az egyetlen hely, amely ismeri a végrehajtót.** A repository-k sosem látják az `AuthenticatedUser`-t; csak a vezérlők birtokolják az `au`-t. Minden modul vezérlője már átmegy a `BaseController.actionWrapper`-en, így a naplózás ott kapcsolódik be, és egyetlen repository szignatúra sem változik.
2. **Egy tábla szolgálja ki az összes modult.** Az adomány-, jelenléti, tartalmi stb. naplóbejegyzések mind a membership adatbázis `auditLogs` táblájába íródnak a `RepoManager.getRepos("membership")` segítségével, még akkor is, ha nem membership vezérlőből történnek. A „Jane ma mindent módosított” típusú lekérdezés így is egyetlen lekérdezés marad.

## Mi kerül naplózásra

A naplózás **alapértelmezetten bekapcsolt minden módosító igére minden útvonalon**. Az `actionWrapper` route-konfiguráció nélkül származtatja a naplózási mezőket a kérésből:

| Mező | Forrás |
|-------|--------------|
| `module` | `this.moduleName` (a tulajdonos modul) |
| `entityType` | a `req.baseUrl` utolsó szegmensének egyes számra alakítva (pl. `/membership/people` → `person`) |
| `category` | alapértelmezetten az `entityType` |
| `action` | `${entityType}_saved` a `POST /`-nál, `${entityType}_deleted` a `DELETE /:id`-nál, egyébként `${entityType}_${method}:${routePath}`, így a nem CRUD al-útvonalak (pl. `task_post:/:id/move`) automatikusan rögzítődnek |

A `BaseController.AUDIT_REGISTRY` **kizárólag felülírásokra és kizárásokra** való, nem engedélyezési lista. Egy útvonal azért szerepel itt, hogy átnevezze a kategóriáját vagy `entityType`-ját, deklarálja a `{ dbModule, table }` párost (ettől lesz kötegelhető és visszavonható), megjelölje `sensitive`-ként (névtelen módosítások naplózásához), vagy kikapcsolja az `optOut: true` beállítással.

**Kizárási lista** (olyan nagy forgalmú írási útvonalak, amelyek elárasztanák a naplót): a jelenlét `visits` / `visitsessions` / `sessions` / `checkin` (a vasárnapi bejelentkezési roham) és az üzenetküldés `messages` / `connections` / `devices` (csevegés és jelenlét). Minden más naplózásra kerül.

**Tömeges végpontok** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) a `BULK_ROUTES`-ban vannak regisztrálva, és **érintett azonosítónként egy naplósort** bocsátanak ki. Így egy 10 000 személyes import 10 000 sort eredményez. Ez az entitásonkénti részletesség teszi lehetővé a köteg visszavonását.

**Névtelen módosítások** (`actionWrapperAnon`: vendégadakozás, vendégregisztráció, űrlapbeküldések) csak a regiszterben `sensitive`-ként megjelölt útvonalakon kerülnek naplózásra, `userId="anonymous"` értékkel és a kliens IP-címével. Az adományozás vezet a listán, és ennél az útvonalnál valódi regressziós múlt áll mögötte.

### Titkok elrejtése és méretkorlátok

Mielőtt a `details` adatcsomag tárolásra kerülne, az `AuditLogHelper.capDetails()` lefuttatja rajta a `sanitizeValue()`-t:

- **A titkos kulcsok elrejtésre kerülnek.** Minden olyan mező, amelynek kisbetűs neve szerepel a `SENSITIVE_KEYS`-ben (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …), a `"[redacted]"` értéket kapja.
- **A túl nagy skalárok eltávolításra kerülnek.** Minden `data:` URI vagy 4 KB-nál hosszabb szöveg (base64 fotók, blobok) `"[stripped]"` értéket kap.
- **A túl nagy sorok korlátozódnak.** Ha a sorosított JSON meghaladja a ~64 KB-ot, a teljes adatcsomag `{ truncated: true }` értékre cserélődik. A csonkított sorok továbbra is megtekinthetők, de **nem visszavonhatók**, mert nincs olyan előtte/utána kép, amelyből vissza lehetne állítani.

## Hol tárolódnak az adatok

Egyetlen `auditLogs` tábla a **membership** adatbázisban szolgálja ki az összes modult. Oszlopok: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. A `tools/migrations/membership/2026-07-04_audit_universal.ts` migráció hozzáadja a `module` és a `batchId` oszlopot, a `details` mezőt `TEXT`-ről `MEDIUMTEXT`-re bővíti, létrehozza a `ix_auditLogs_batch (batchId)` és a `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` indexeket, valamint létrehozza a `batches` táblát. A `module` oszlop pontosan azért létezik, hogy a modulok közötti `entityType`-ütközések (a `note` és a `setting` több modulban is megvan) szűrhetők maradjanak. Az entitásindex pedig az entitásonkénti előzményeket és a visszavonási ütközésvédelmet egyaránt kiszolgálja.

A modulok közötti írások a wrapperen belül a `RepoManager.getRepos("membership")` segítségével történnek. A sorrend szándékos: **a fő írás előbb véglegesül a modul adatbázisában, a naplóbeszúrás utána.** Normál módban a naplóbeszúrás hibáját elnyeli a rendszer (`console.error`, a Sentry felveszi), mert a naplózás tanácsadó jellegű, és soha nem buktathatja meg a felhasználó kérését. **Kötegmódban viszont szigorú** (lásd lentebb).

:::info Miért nem triggerek, CDC vagy modulonkénti táblák?
- **A MySQL triggerek** nem ismerik a végrehajtó felhasználót (a kapcsolatnak nincs `au`-ja), és minden sémán külön triggerkészletet kellene karbantartani.
- **A binlog / CDC** egy teljes infrastruktúra-projekt, ugyanazzal a végrehajtó-azonosítási problémával.
- **A `userId` minden repository-n át való továbbítása** több száz fájlt érintene, hogy olyan információt mozgasson, amely a vezérlőrétegnél már rendelkezésre áll.
- **A modulonkénti naplótáblák** hétszeres bekötési munkát és elosztott lekérdezéseket jelentenének bármilyen modulok közötti kérdésnél. Az egy táblás megoldás a vezérlői központi ponton a legkevesebb kódot igényli, és így is rögzíti a végrehajtót.
:::

## Teljesítményszemlélet

A kritikus útvonal szándékosan olcsó; a költséget csak ott fizetjük meg, ahol az valamit hoz.

- **Normál frissítéseknél nincs olvasás írás előtt.** Egy rendes mentés **nem** tölti be a régi rekordot. A **beküldött utána-értékek** a `details.after`-ben tárolódnak; a felület a megjelenítéskor rekonstruálja a régi→új változást, az entitás előző naplósorával összevetve. Egy lekérdezés a megjelenítéskor történik, íráskor nulla költséggel. Az indulás óta soha nem módosított mezőknél egyszerűen nem jelenik meg „régi” érték, és ez elfogadható.
- **A törlések kapnak egy előtte-képet.** A `{ dbModule, table }`-s regiszter-útvonalon a `DELETE /:id` először általánosan betölti a sort, és a `details.before`-ban tárolja. A törlések ritkák, az előtte-kép pedig a teljes törvényszéki értéket adja.
- **A kötegmód az egyetlen rendszeres olvasás írás előtt.** Ez opt-in jellegű: egy tömeges vagy importművelet már eleve drága, így az N pillanatkép-olvasás a visszavonás ára.
- **A naplóbeszúrásokat megvárjuk.** Az `actionWrapper` összegyűjti a naplózási promise-okat, és visszatérés előtt `await Promise.allSettled(...)`-del megvárja azokat. Ez a legfontosabb invariáns: Lambdán a konténer **a válasz visszaküldésének pillanatában befagy**, így a meg nem várt beszúrás csendben elvész. Az „indítsd és felejtsd” itt azt jelenti, hogy *a hibák sosem buktatják meg a kérést*, nem azt, hogy *ne várjuk meg*. Egyetlen beszúrás a már fölmelegített membership-poolon ~1–3 ms.

## Kötegek és visszavonás

A **köteg** módosítások halmazát fogja össze, hogy azokat együtt lehessen áttekinteni és visszafordítani. Kétféleképpen lehet megnyitni:

- **Explicit:** a `POST /membership/batches { label, source }` egy `batchId`-t ad vissza. Az ügyfél (B1Transfer, egy B1Admin importfelület) ezután minden következő mentésnél és törlésnél elküldi az `X-Batch-Id: <id>` fejlécet. A `POST /membership/batches/:id/complete` lezárja a köteget, és rögzíti az `itemCount` értékét.
- **Implicit:** a négy tömeges végpont egyetlen kérésen belül nyitja meg, tölti fel és zárja le a saját kötegét, és a választ a `batchId`-val együtt adja vissza.

A `batches` tábla (membership adatbázis): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### A kötegmód szigorú

Ha az `X-Batch-Id` jelen van, az `actionWrapper` minden védelmi ellenőrzést szigorít (`writeBatchAuditRows`):

1. A kötegnek léteznie kell, `open` állapotban kell lennie, és az `au.churchId`-hoz kell tartoznia. Különben **403**.
2. Az útvonalnak kötegelhetőnek kell lennie (`{ dbModule, table }` a regiszterben). Különben **400**.
3. A művelet futtatása előtt az összes érintett azonosító előtte-képe **egyetlen** `WHERE id IN (...) AND churchId = ?` lekérdezésben töltődik be. Ha ez a pillanatkép-olvasás meghiúsul, a kérés **500-zal hibázik, és a művelet nem fut le**. A kötegmód soha nem termelhet csendben visszavonhatatlan naplót. (A normál móddal ellentétben itt a pillanatkép-hibákat nem nyeli el a rendszer, hanem a kérés hibázik.)
4. A művelet sikeres lefutása után entitásonként egy naplósor íródik a `batchId`, a `details.before` és a `details.after` mezőkkel, a köteg által létrehozott sorokhoz pedig egy kifejezett **létrehozási jelölő** kerül.

### Visszavonás

A `POST /membership/batches/:id/undo` (jogosultság: a köteg létrehozója vagy a `Permissions.server.admin`). Elutasítja a kérést, ha a köteg nem `completed` állapotú, vagy régebbi a **30 napos visszavonási időablaknál**. A `BatchUndoHelper.undo()` ezután:

1. Betölti a köteg naplósorait, és **csoportosítja őket `(module, entityType, entityId)` szerint.** Az a entitás, amelyet egy kötegen belül többször érintettek, **egyszer** kerül visszafordításra a köteg előtti valódi állapotába: a legkorábbi előtte-képre, vagy törlésre, ha a köteg hozta létre. Ezért a visszavonás nem játssza le naivan minden sorát, mert egy köteg közbeni köztes pillanatkép visszaállítása hibás lenne.
2. Entitásonként először a **ütközésvédelmet** futtatja. A `auditLog.hasLaterModification()` megkérdezi, létezik-e a köteg körén kívül *későbbi* naplóbejegyzés ugyanarra a `(module, entityType, entityId)` hármasra. Ha igen, az entitást az import után szerkesztették: **átugorja és jelenti**, soha nem írja felül. Ez maga a naplót használja módosítás-érzékelőként, így egyetlen táblán sem kell `modifiedAt` oszlop.
3. A rögzített művelet szerint fordít vissza, a `{ dbModule, table }`-t a regiszterből feloldva, általános Kysely-írásokkal:
   - **created** → a sor végleges törlése.
   - **updated** → a `details.before` visszaírása.
   - **deleted** → a `details.before` újra beszúrása (frissítés vagy beszúrás, ha az adott azonosítójú sor közben újra megjelent).
4. Minden visszafordítást maga is naplóz (`action: "<entityType>_undone"`, `batchId` nélkül). A visszavonás visszavonása nem tartozik a hatókörbe.

A műveletet a kifejezett **létrehozási jelölő** alapján választjuk ki, nem egy hiányzó előtte-képből következtetjük. Egy jogosan üres előtte-kép vagy egy csonkított sor nem téveszthető össze egy létrehozással.

Az eredménycsomag `{ restored, skippedConflicts: [...], failed: [...], status }`; a köteg `undone` (hibátlan) vagy `partial` állapotba kerül. **Nincs adatbázisok közötti tranzakció.** A visszavonás soronként best-effort, ugyanaz a korlát, amelyet a Planning Center az összevont profilokra dokumentál.

:::warning A mellékhatásokkal járó entitásokhoz `onUndo` horog kell
Egy `groupMember` létrehozásának visszafordításakor a `groupMemberHistory`-ba is írni kell („left”), különben a lemorzsolódás-elemzés csendben elromlik. Ez állandó érvényű invariáns. Az ilyen entitások az `AUDIT_REGISTRY`-ben regisztrálnak egy `onUndo` callbacket, amely `true` értéket ad vissza, ha a visszafordítást teljesen lekezelte, így megkerülve az általános útvonalat. A `groupMembers` a mintapélda: az explicit útvonalon a sor azonosítója szerint, a tömeges végpontokon a `personId` szerint kulcsolódik, és minden hozzáadásnál és eltávolításnál előzménybe kerül.
:::

## Felhasználói felületek

Mindkét admin felület **folyamatban van**. A cél:

| Felület | Repo | Cél |
|---------|------|---------|
| **Naplóoldal** | B1Admin (ManageChurch → Audit Log) | Szűrés modul, kategória, felhasználó és entitás szerint, valamint régi→új különbségek megjelenítése: szerkesztéseknél az entitás előző bejegyzéséhez hasonlítva, törlésnél a `details.before`-ból. Backend: `GET /membership/auditlogs`, a `Permissions.server.admin` védelmével. |
| **Kötegek oldal** | B1Admin (ugyanaz a Settings hub) | Kötegek listázása állapottal és darabszámmal, **Eredmények megtekintése** (a köteg naplósorai a `GET /membership/batches/:id/results` végponton keresztül), valamint egy **Visszavonás** gomb, amely megjeleníti az átugrott ütközések és hibák jelentését. |
| **Importkötegek** | B1Transfer | Köteg megnyitása, `X-Batch-Id` küldése a normál mentési hívásokon, lezárás a végén. Az importok így új importvégpontok nélkül is visszavonhatóvá válnak. A régi `importKey` csak létrehozásokra vonatkozó leszármazási jelölőként marad meg, a visszavonás szempontjából már felváltva. |

## Buktatók, amelyeket egy későbbi módosítás nem ronthat el

- **A naplóbeszúrásokat továbbra is meg kell várni.** A meg nem várt `AuditLogHelper.log(...)` a Lambda-befagyasztás miatt elvész. Gyűjtsd össze a promise-okat, és visszatérés előtt várd meg őket `await Promise.allSettled`-del.
- **A Kysely eldobja az `undefined` értékeket a `.set()`/`.values()`-ből.** Visszaállításkor egy kiürített oszlop érintetlenül maradna. A `BatchUndoHelper` minden hiányzó mezőt explicit `null`-lá alakít (`nullify`). Soha ne kerüld meg gyorsabb közvetlen íráshoz.
- **A megőrzési időnek jóval a visszavonási időablak fölött kell maradnia.** Az `AuditLogRepo.deleteOld()` az éjszakai időzítőn fut (alapértelmezett 365 napos megőrzés), a visszavonási időablak pedig 30 nap. Ha a megőrzés valaha az időablak felé csökkenne, a visszavonási naplókat a nyitott kötegek alól törölnék.
- **A csonkított sorok nem visszavonhatók.** A `{ truncated: true }` adatcsomagnak nincs előtte/utána képe. A visszavonás `failed`-ként jelenti, sosem tippel.
- **A sorrend: előbb a modulírás, utána a naplózás.** Soha ne helyezd a naplóbeszúrást a valódi írás elé, és tartsd meg a szabályt: kötegmódban szigorú, normál módban tanácsadó.

## Fájllista

| Terület | Fájlok |
|------|------|
| Wrapper / regiszter | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, pillanatkép és sorírás) |
| Visszavonó motor | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Naplózó segédmodul | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Vezérlők | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modellek / repository-k | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migráció | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin felület (folyamatban) | B1Admin naplóoldal és kötegek oldal; B1Transfer importköteg-fejléc |

## Kapcsolódó oldalak

- [Modulszerkezet](../api/module-structure): hogyan éri el egy nem membership vezérlő a membership repository-kat a `RepoManager`-en keresztül
- [Adakozás](./giving): az adományozási írási útvonalak, amelyek névtelen esetben is `sensitive`-ként naplózódnak
- [Membership végpontok](../api/endpoints/membership): a REST felület, amely az `X-Batch-Id`-t hordozza, és az `/auditlogs` és `/batches` útvonalakat teszi elérhetővé
