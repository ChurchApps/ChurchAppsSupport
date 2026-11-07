---
title: "Granskningslogg och ångringsbara batcher"
---

# Granskningslogg och ångringsbara batcher

<div class="article-intro">

Varje användarinitierad ändring i Api:et loggas (vem, vad, när och varifrån) över alla moduler, utan någon kopplning per controller. Ovanpå loggen ligger ett batchlager: en import eller massåtgärd kan märkas som en batch och senare **ångras** rad för rad, i Planning Center-stil. Båda delarna lever i en enda tabell, `auditLogs`, i medlemsdatabasen och styrs helt från en gemensam punkt, `BaseController.actionWrapper`. Den här sidan beskriver vad som granskas, var datan lagras, de prestandaavvägningar som formar lösningen och hur ångra återför en batch säkert utan transaktioner över databaser.

</div>

## Översikt

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

Två strukturella fakta styr allt nedan:

1. **Controller-lagret är det enda som känner till användaren.** Repositories ser aldrig `AuthenticatedUser`; bara controllers har `au`. Alla modulers controllers går redan genom `BaseController.actionWrapper`, så det är där granskningen kopplas in. Inga repo-signaturer ändras.
2. **En tabell används av alla moduler.** Granskningsrader för givande, närvaro, innehåll m.m. skrivs alla till `auditLogs` i medlemsdatabasen via `RepoManager.getRepos("membership")`, även från en controller utanför medlemsmodulen. "Allt Jane ändrade i dag" förblir en enda fråga.

## Vad som granskas

Granskning är **på som standard för alla muterande verb på alla routes**. `actionWrapper` härleder granskningsfälten från requesten utan någon konfiguration per route:

| Fält | Härleds från |
|-------|--------------|
| `module` | `this.moduleName` (den ägande modulen) |
| `entityType` | singulariserat sista segmentet i `req.baseUrl` (t.ex. `/membership/people` → `person`) |
| `category` | standard är `entityType` |
| `action` | `${entityType}_saved` för `POST /`, `${entityType}_deleted` för `DELETE /:id`, annars `${entityType}_${method}:${routePath}` så att icke-CRUD-underroutes (t.ex. `task_post:/:id/move`) fångas automatiskt |

`BaseController.AUDIT_REGISTRY` är **endast till för överskrivningar och undantag**. Det är inte en tilläggslista. En route läggs dit för att byta namn på sin category/entityType, för att deklarera `{ dbModule, table }` (vilket gör den batch- och ångringsbar), för att markera den som `sensitive` (granska anonyma ändringar) eller för att stänga av granskningen med `optOut: true`.

**Undantagslista** (skrivvägar med hög volym som skulle dränka loggen): närvaro `visits` / `visitsessions` / `sessions` / `checkin` (söndagens incheckningsstorm) och meddelanden `messages` / `connections` / `devices` (chatt och närvaro). Allt annat loggas.

**Massendpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) är registrerade i `BULK_ROUTES` och skriver **en granskningsrad per berört id**. En import av 10 000 personer ger alltså 10 000 rader, och just den granulariteten gör batchen ångringsbar.

**Anonyma ändringar** (`actionWrapperAnon`: anonyma gåvor, gästregistrering, formulärinskick) granskas bara för routes som flaggats `sensitive` i registret. De skrivs med `userId="anonymous"` plus klientens IP-adress. Donationer leder listan, och den vägen har en verklig regressionshistorik.

### Maskering av hemligheter och storleksgränser

Innan någon `details`-payload lagras körs `AuditLogHelper.capDetails()` över den med `sanitizeValue()`:

- **Hemliga nycklar maskeras.** Ett fält vars gemena namn finns i `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) ersätts med `"[redacted]"`.
- **Stora skalärer tas bort.** Varje `data:`-URI eller sträng över 4 KB (base64-foton, blobbar) blir `"[stripped]"`.
- **Övergroda rader kapas.** Om den serialiserade JSON:en överstiger ca 64 KB ersätts hela payloaden med `{ truncated: true }`. Kapade rader går fortfarande att visa, men **de kan inte ångras** eftersom det inte finns någon efter- eller före-bild att återställa från.

## Var datan lagras

En enda tabell `auditLogs` i **medlemsdatabasen** ligger bakom alla moduler. Kolumner: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON-sträng), ipAddress, module, batchId, created`. Migreringen `tools/migrations/membership/2026-07-04_audit_universal.ts` lägger till `module` och `batchId`, breddar `details` från `TEXT` till `MEDIUMTEXT`, lägger till indexen `ix_auditLogs_batch (batchId)` och `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` och skapar tabellen `batches`. Kolumnen `module` finns just för att kollisioner i `entityType` mellan moduler (`note`, `setting` finns i flera) ska gå att filtrera på. Entitetsindexet är det som ger både historik per entitet och ångringens konfliktkontroll.

Skrivningar över moduler går via `RepoManager.getRepos("membership")` från inuti wrappern. Ordningen är medveten: **huvudskrivningen committas först i modulens databas, granskningsinsättningen sedan.** I normalläge sväljs ett fel i granskningsinsättningen (`console.error`, Sentry plockar upp det). Granskning är rådgivande och får aldrig göra att en användares begäran misslyckas. I **batchläge är den strikt** (se nedan).

:::info Varför inte triggers, CDC eller tabeller per modul?
- **MySQL-triggers** känner inte till den agerande användaren (anslutningen har ingen `au`), och skulle innebära underhåll av trigger-uppsättningar i varje schema.
- **binlog / CDC** är ett helt eget infrastrukturprojekt med samma problem kring aktörens identitet.
- **Att skicka med `userId` genom varje repo** skulle beröra hundratals filer för att flytta information som controller-lagret redan har.
- **Tabeller för granskning per modul** skulle innebära sju gånger så mycket kopplingsarbete och fan-out-frågor för alla frågor över moduler. En enda tabell vid controllerns gemensamma punkt är den design med minst kod som ändå fångar aktören.
:::

## Prestandaprinciper

Den heta vägen är medvetet billig. Kostnaden betalas bara där den ger något.

- **Ingen läsning före skrivning vid vanliga uppdateringar.** En vanlig sparning laddar **inte** den gamla posten. De **inskickade efter-värdena** lagras i `details.after`. Gränssnittet rekonstruerar gammalt → nytt vid *visning* genom att jämföra mot entitetens föregående granskningsrad. En fråga vid visning, noll kostnad vid skrivning. Fält som inte rörts sedan lanseringen visar helt enkelt inget "gammalt" värde, vilket är acceptabelt.
- **Borttagningar får en förbild.** `DELETE /:id` på en registerroute med `{ dbModule, table }` laddar raden generiskt först och lagrar den i `details.before`. Borttagningar är sällsynta, och förbilden är hela det rättsmedicinska värdet.
- **Batchläget är den enda systematiska läsningen före skrivning**, och den är opt-in. En massåtgärd eller import är redan dyr, så N snapshot-läsningar är priset för att kunna ångra.
- **Granskningsinsättningar awaitas.** `actionWrapper` samlar löftena för loggarna och gör `await Promise.allSettled(...)` innan den returnerar. Detta är den viktigaste invarianten: på Lambda fryses containern i samma ögonblick som svaret returneras, så en insättning som inte awaitas tappas tyst. "Fire and forget" här betyder *fel fäller aldrig begäran*, inte *vänta inte*. En enskild insättning i den redan varma medlemspoolen tar ca 1–3 ms.

## Batcher och ångra

En **batch** grupperar en mängd ändringar så att de kan granskas och återställas tillsammans. Det finns två sätt att öppna en:

- **Explicit:** `POST /membership/batches { label, source }` returnerar ett `batchId`. Klienten (B1Transfer, ett importgränssnitt i B1Admin) skickar sedan `X-Batch-Id: <id>` på varje efterföljande sparning eller borttagning. `POST /membership/batches/:id/complete` stänger batchen och sätter `itemCount`.
- **Implicit:** de fyra massendpoints öppnar, fyller och slutför sin egen batch inom samma begäran och returnerar `batchId` i svaret.

Tabellen `batches` (medlemsdatabasen): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batchläget är strikt

När `X-Batch-Id` finns skärper `actionWrapper` alla kontroller (`writeBatchAuditRows`):

1. Batchen måste finnas, vara `open` och tillhöra `au.churchId`. Annars **403**.
2. Routen måste vara batch-kapabel (`{ dbModule, table }` i registret). Annars **400**.
3. Innan åtgärden körs laddas före-bilderna för alla berörda id i **en** fråga `WHERE id IN (...) AND churchId = ?`. Om snapshot-läsningen misslyckas **misslyckas begäran med 500 och åtgärden körs inte**. Batchläget får aldrig tyst ge en ledger som inte kan ångras. (Normalläget är däremot bästa ansträngning och sväljer snapshot-fel.)
4. När åtgärden lyckats skrivs en granskningsrad per entitet med `batchId`, `details.before` och `details.after`, plus en explicit **skapamarkör** för rader som batchen skapade.

### Ångra

`POST /membership/batches/:id/undo` (behörighet: batchens skapare eller `Permissions.server.admin`). Anropet vägras om batchen inte är `completed` eller är äldre än **30 dagars ångringsfönster**. `BatchUndoHelper.undo()` gör sedan följande:

1. Laddar batchens granskningsrader och **grupperar dem efter `(module, entityType, entityId)`.** En entitet som berörts flera gånger inom en batch återställs **en gång**, till sitt verkliga tillstånd före batchen: den tidigaste före-bilden, eller en borttagning om batchen skapade den. Det är därför ångra inte naivt spelar upp varje rad. Att återställa en mellanliggande ögonblicksbild mitt i batchen skulle vara fel.
2. För varje entitet körs **konfliktkontrollen först**: `auditLog.hasLaterModification()` frågar om det finns någon *senare* granskningspost för samma `(module, entityType, entityId)` utanför denna batch. Om så är fallet redigerades entiteten efter importen. Den **hoppas över och rapporteras**, aldrig överskriven. Här används granskningsloggen själv som ändringsdetektor. Inga `modifiedAt`-kolumner behövs i några tabeller.
3. Återställer enligt den registrerade operationen, med `{ dbModule, table }` hämtat från registret och generiska Kysely-skrivningar:
   - **created** → hård borttagning av raden.
   - **updated** → skriver tillbaka `details.before`.
   - **deleted** → återinsätter `details.before` (uppdatera-eller-infoga om en rad med det id:t har dykt upp igen).
4. Varje återställning granskas i sin tur (`action: "<entityType>_undone"`, utan `batchId`, eftersom ångra-av-ångra ligger utanför omfånget).

Operationen väljs utifrån den explicita **skapamarkören**, inte utifrån en saknad före-bild. En lagligt tom före-bild eller en kapad rad får inte förväxlas med en skapning.

Resultatpayloaden är `{ restored, skippedConflicts: [...], failed: [...], status }`. Batchen går till `undone` (rent) eller `partial`. **Det finns ingen transaktion över databaser.** Ångra är bästa ansträngning per rad, samma begränsning som Planning Center dokumenterar för sammanslagna profiler.

:::warning Sidoeffekt-entiteter behöver en `onUndo`-hook
Att återställa en `groupMember`-skapning måste även skriva `groupMemberHistory` ("left"), annars bryter churn-analysen tyst. Det är en stående invariant i arbetsytan. Sådana entiteter registrerar en `onUndo`-callback i `AUDIT_REGISTRY` som returnerar `true` när den har hanterat återställningen helt, vilket förbigår den generiska vägen. `groupMembers` är det kanoniska fallet. Den nycklas på radens id på den explicita vägen men på `personId` vid massendpoints, och historiken spåras vid varje tillägg och varje borttagning.
:::

## Gränssnitt som använder loggen

Båda administrationsytorna är **under utveckling**. Avsikten:

| Yta | Repo | Syfte |
|---------|------|---------|
| **Granskningslogg-sidan** | B1Admin (ManageChurch → Audit Log) | Filtrera på modul, kategori, användare eller entitet och visa gammalt → nytt-diffar. För redigeringar jämförs mot entitetens föregående post, för borttagningar används `details.before`. Backas av `GET /membership/auditlogs` och skyddas av `Permissions.server.admin`. |
| **Batch-sidan** | B1Admin (samma Settings-hub) | Lista batcher med status och antal, **Visa resultat** (batchens granskningsrader via `GET /membership/batches/:id/results`) och en **Ångra**-knapp som visar rapporten över överhoppade konflikter och misslyckanden. |
| **Importbatcher** | B1Transfer | Öppna en batch, skicka `X-Batch-Id` på dess vanliga sparningsanrop och slutför den i slutet. Importer blir ångringsbara utan några nya importendpoints. Det äldre `importKey` finns kvar som en markör för härkomst vid skapande, men är ersatt för ångra. |

## Fallgropar som en framtida ändring inte får återinföra

- **Granskningsinsättningar måste fortsatt awaitas.** Ett icke-awaitat `AuditLogHelper.log(...)` tappas av Lambda-frysningen. Samla löftena och `await Promise.allSettled` innan du returnerar.
- **Kysely tar bort `undefined` från `.set()` och `.values()`.** Vid återställning skulle en rensad kolumn överleva orörd. `BatchUndoHelper` konverterar varje frånvarande fält till explicit `null` (`nullify`). Förbigå aldrig den för en "snabbare" direkt skrivning.
- **Lagringstiden måste ligga långt över ångringsfönstret.** `AuditLogRepo.deleteOld()` körs på den nattliga timern (standard 365 dagars lagring), och ångringsfönstret är 30 dagar. Om lagringstiden någonsin sjunker mot fönstret rensas ångra-ledgers bort under öppna batcher.
- **Kapade rader kan inte ångras.** En `{ truncated: true }`-payload har ingen efter- eller före-bild. Ångra rapporterar den som `failed` och gissar aldrig.
- **Ordningen är modulskrivning före granskning.** Flytta aldrig granskningsinsättningen före den riktiga skrivningen, och håll den strikt i batch men rådgivande i normalläge.

## Filförteckning

| Område | Filer |
|------|-------|
| Wrapper / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + skrivning av rader) |
| Ångra-motor | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Granskningshjälpare | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeller / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrering | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-gränssnitt (pågår) | B1Admin-sidorna Audit Log och Batches; B1Transfer-rubriken för importbatcher |

## Relaterade sidor

- [Modulstruktur](../api/module-structure): hur en controller utanför medlemsmodulen når medlemsrepona via `RepoManager`
- [Givande](./giving): de donationsskrivvägar som granskas som `sensitive` även när de är anonyma
- [Membership-endpoints](../api/endpoints/membership): REST-ytan som bär `X-Batch-Id` och exponerar `/auditlogs` och `/batches`
