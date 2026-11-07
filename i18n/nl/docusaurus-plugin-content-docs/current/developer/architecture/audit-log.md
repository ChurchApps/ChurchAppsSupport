---
title: "Auditlog en ongedaan te maken batches"
---

# Auditlog en ongedaan te maken batches

<div class="article-intro">

Elke mutatie die een gebruiker in de Api uitvoert, wordt vastgelegd: wie, wat, wanneer en vanaf waar, over alle modules heen, zonder dat elke controller daarvoor apart hoeft te worden aangesloten. Daarbovenop ligt een batchlaag: een import of bulkactie kan als batch worden gemarkeerd en later rij voor rij **ongedaan** worden gemaakt, in de stijl van Planning Center. Beide zitten in één tabel `auditLogs` in de membership-database en worden volledig aangestuurd vanuit één knooppunt, `BaseController.actionWrapper`. Deze pagina beschrijft wat er wordt geauditeerd, waar de gegevens staan, de prestatieafwegingen die de opzet bepalen, en hoe ongedaan maken een batch veilig terugdraait zonder transacties over databases heen.

</div>

## Overzicht

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

Twee structurele feiten bepalen alles hieronder:

1. **De controllerlaag is de enige plek die weet wie de handelende gebruiker is.** Repositories zien nooit `AuthenticatedUser`; alleen controllers beschikken over `au`. Elke controller van elke module loopt al via `BaseController.actionWrapper`, dus daar haakt het auditen in — er veranderen nergens handtekeningen van repositories.
2. **Eén tabel dient alle modules.** Auditrijen voor giving, aanwezigheid, content enzovoort worden allemaal in de `auditLogs`-tabel van de membership-database geschreven via `RepoManager.getRepos("membership")`, ook vanuit een controller die niet bij membership hoort. "Alles wat Jane vandaag heeft gewijzigd" blijft zo één query.

## Wat er wordt geauditeerd

Auditing staat **standaard aan voor elk muterend werkwoord op elke route**. `actionWrapper` leidt de auditvelden af uit het verzoek, zonder configuratie per route:

| Veld | Afgeleid van |
|------|--------------|
| `module` | `this.moduleName` (de eigenaar-module) |
| `entityType` | enkelvoudige vorm van het laatste segment van `req.baseUrl` (bijv. `/membership/people` → `person`) |
| `category` | standaard gelijk aan `entityType` |
| `action` | `${entityType}_saved` voor `POST /`, `${entityType}_deleted` voor `DELETE /:id`, anders `${entityType}_${method}:${routePath}`, zodat niet-CRUD-subroutes (bijv. `task_post:/:id/move`) automatisch worden vastgelegd |

`BaseController.AUDIT_REGISTRY` is **alleen bedoeld voor overschrijvingen en uitzonderingen**. Het is geen toegestane lijst. Een route staat erin om zijn categorie of entityType te hernoemen, om `{ dbModule, table }` op te geven (waardoor hij batchgeschikt en ongedaan te maken wordt), om hem als `sensitive` te markeren (zodat anonieme mutaties worden geauditeerd), of om hem uit te schakelen met `optOut: true`.

**Uitzonderingslijst** (schrijfpaden met zoveel volume dat ze het logboek zouden verdrinken): attendance `visits` / `visitsessions` / `sessions` / `checkin` (de zondagse check-in-storm) en messaging `messages` / `connections` / `devices` (chat en aanwezigheid). Al het andere wordt gelogd.

**Bulkendpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) zijn geregistreerd in `BULK_ROUTES` en schrijven **één auditrij per geraakt id**. Een import van 10.000 personen levert dus 10.000 rijen op. Precies die granulariteit maakt de batch ongedaan te maken.

**Anonieme mutaties** (`actionWrapperAnon`, zoals gastgiften, gastregistratie en formulierinzendingen) worden alleen geauditeerd voor routes die in het register als `sensitive` zijn gemarkeerd. Ze worden geschreven met `userId="anonymous"` plus het client-IP. Donaties staan bovenaan die lijst; dat pad heeft een echte geschiedenis van regressies.

### Redactie van geheimen en groottelimieten

Voordat een `details`-payload wordt opgeslagen, voert `AuditLogHelper.capDetails()` er `sanitizeValue()` overheen:

- **Geheime sleutels worden geredigeerd.** Elk veld waarvan de naam in kleine letters in `SENSITIVE_KEYS` staat (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) wordt vervangen door `"[redacted]"`.
- **Grote scalaire waarden worden verwijderd.** Elke `data:`-URI of string van meer dan 4 KB (base64-foto's, blobs) wordt `"[stripped]"`.
- **Te grote rijen worden afgekapt.** Als de geserialiseerde JSON groter is dan ongeveer 64 KB, wordt de volledige payload vervangen door `{ truncated: true }`. Afgekapte rijen zijn nog steeds te bekijken, maar **niet ongedaan te maken**, omdat er geen voor- of na-beeld is om uit te herstellen.

## Waar de gegevens staan

Eén tabel `auditLogs` in de **membership**-database ondersteunt elke module. Kolommen: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. De migratie `tools/migrations/membership/2026-07-04_audit_universal.ts` voegt `module` en `batchId` toe, verbreedt `details` van `TEXT` naar `MEDIUMTEXT`, voegt de indexen `ix_auditLogs_batch (batchId)` en `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` toe, en maakt de tabel `batches` aan. De kolom `module` bestaat precies zodat botsingen van `entityType` tussen modules (`note` en `setting` komen in meerdere modules voor) filterbaar blijven. De entiteitsindex voedt zowel de geschiedenis per entiteit als de conflictcontrole bij ongedaan maken.

Schrijfacties over modules heen gaan vanuit de wrapper via `RepoManager.getRepos("membership")`. De volgorde is bewust: **de hoofdschrijfactie wordt eerst in de module-database vastgelegd, de auditinvoeging daarna.** In de normale modus wordt een fout bij het invoegen van een audit stilzwijgend opgevangen (`console.error`, Sentry pikt die op). Audit is adviserend en mag het verzoek van een gebruiker nooit laten mislukken. In **batchmodus is die controle strikt** (zie hieronder).

:::info Waarom geen triggers, CDC of tabellen per module?
- **MySQL-triggers** kennen de handelende gebruiker niet (de verbinding heeft geen `au`), en zouden betekenen dat je triggersets voor elk schema moet onderhouden.
- **binlog / CDC** is een volledig infrastructuurproject met hetzelfde probleem rond de identiteit van de handelende gebruiker.
- **`userId` door elke repository doorgeven** zou honderden bestanden raken om informatie te verplaatsen die de controllerlaag al heeft.
- **Auditetabellen per module** zouden zeven keer zoveel koppelwerk en fan-outqueries betekenen voor elke vraag over meerdere modules. Eén tabel op het controllerknooppunt is de minste code die de handelende gebruiker nog steeds vastlegt.
:::

## Prestatiekeuze

Het hot path is bewust goedkoop. De kosten worden alleen gemaakt waar ze iets opleveren.

- **Geen lezen-voor-schrijven bij gewone updates.** Een gewone opslag laadt het oude record **niet**. De **ingediende na-waarden** worden opgeslagen in `details.after`. De UI reconstrueert oud→nieuw op weergavemoment door te vergelijken met de vorige auditrij van de entiteit. Dat is één query op weergavemoment en nul kosten bij schrijven. Velden die sinds de lancering nooit zijn aangeraakt, tonen gewoon geen oude waarde. Dat is acceptabel.
- **Verwijderingen krijgen een voor-beeld.** `DELETE /:id` op een registerroute met `{ dbModule, table }` laadt eerst de rij generiek en slaat die op in `details.before`. Verwijderingen komen zelden voor, en het voor-beeld is hun volledige forensische waarde.
- **Batchmodus is de enige systematische lezen-voor-schrijven**, en die is opt-in. Een bulk- of importbewerking is al duur, dus N snapshot-lezingen zijn de prijs van ongedaan maken.
- **Auditinserts worden afgewacht.** `actionWrapper` verzamelt de logbelofte en wacht met `await Promise.allSettled(...)` voordat het antwoord terugkomt. Dit is de belangrijkste invariant: op Lambda wordt de container **bevroren op het moment dat het antwoord terugkomt**, dus een niet-afgewachte insert gaat stilzwijgend verloren. "Fire and forget" betekent hier dat *fouten het verzoek nooit laten mislukken*, niet dat je niet hoeft te wachten. Een enkele insert op de al warme membership-pool kost ongeveer 1–3 ms.

## Batches en ongedaan maken

Een **batch** groepeert een reeks mutaties, zodat ze samen kunnen worden beoordeeld en teruggedraaid. Er zijn twee manieren om er een te openen:

- **Expliciet:** `POST /membership/batches { label, source }` geeft een `batchId` terug. De client (B1Transfer, een importinterface van B1Admin) stuurt daarna bij elke opslag of verwijdering `X-Batch-Id: <id>` mee. `POST /membership/batches/:id/complete` sluit de batch af en zet `itemCount`.
- **Impliciet:** de vier bulkendpoints openen, vullen en voltooien hun eigen batch binnen het ene verzoek, en geven de `batchId` terug in het antwoord.

De tabel `batches` (membership-database): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batchmodus is strikt

Wanneer `X-Batch-Id` aanwezig is, verscherpt `actionWrapper` elke controle (`writeBatchAuditRows`):

1. De batch moet bestaan, `open` zijn en bij `au.churchId` horen. Anders volgt **403**.
2. De route moet batchgeschikt zijn (`{ dbModule, table }` in het register). Anders volgt **400**.
3. Voordat de actie wordt uitgevoerd, worden de voor-beelden van alle betrokken id's geladen in **één** query `WHERE id IN (...) AND churchId = ?`. Mislukt die snapshotlezing, dan faalt het verzoek met **500 en wordt de actie niet uitgevoerd**. Batchmodus mag nooit stilzwijgend een logboek opleveren dat niet ongedaan te maken is. (Normale modus is daarentegen best-effort en vangt snapshotfouten op.)
4. Nadat de actie is geslaagd, wordt per entiteit één auditrij geschreven met `batchId`, `details.before` en `details.after`, plus een expliciete **aanmaakmarkering** voor rijen die de batch heeft aangemaakt.

### Ongedaan maken

`POST /membership/batches/:id/undo` (recht: de maker van de batch of `Permissions.server.admin`). Het verzoek wordt geweigerd als de batch niet `completed` is of ouder is dan het **venster van 30 dagen** voor ongedaan maken. `BatchUndoHelper.undo()` doet daarna het volgende:

1. Laadt de auditrijen van de batch en **groepeert ze op `(module, entityType, entityId)`**. Een entiteit die binnen één batch meerdere keren is aangeraakt, wordt **één keer** teruggedraaid naar zijn werkelijke staat vóór de batch: het vroegste voor-beeld, of een verwijdering als de batch hem heeft aangemaakt. Daarom speelt ongedaan maken niet naïef elke rij opnieuw af. Een tussentijdse snapshot midden in de batch herstellen zou fout zijn.
2. Voert voor elke entiteit eerst de **conflictcontrole** uit. `auditLog.hasLaterModification()` kijkt of er een *latere* auditvermelding bestaat voor dezelfde `(module, entityType, entityId)`, buiten deze batch. Zo ja, dan is de entiteit na de import bewerkt. Hij wordt **overgeslagen en gerapporteerd**, nooit overschreven. Dit gebruikt het auditlogboek zelf als wijzigingsdetector, dus er zijn geen `modifiedAt`-kolommen nodig op enige tabel.
3. Keert terug volgens de vastgelegde bewerking, met `{ dbModule, table }` uit het register en generieke Kysely-schrijfacties:
   - **aangemaakt** → de rij hard verwijderen.
   - **bijgewerkt** → `details.before` terugschrijven.
   - **verwijderd** → `details.before` opnieuw invoegen (bijwerken of invoegen, als een rij met dat id inmiddels weer is opgedoken).
4. Elke terugdraaiing wordt zelf ook geauditeerd (`action: "<entityType>_undone"`, zonder `batchId`. Ongedaan maken van een ongedaan maken valt buiten de scope).

De bewerking wordt gekozen op basis van de expliciete **aanmaakmarkering**, niet afgeleid van een ontbrekend voor-beeld. Een legitiem leeg voor-beeld of een afgekapte rij mag niet voor een aanmaak worden aangezien.

Het resultaat is `{ restored, skippedConflicts: [...], failed: [...], status }`. De batch krijgt de status `undone` (schoon) of `partial`. **Er is geen transactie over databases heen.** Ongedaan maken gebeurt per rij naar beste vermogen, dezelfde beperking die Planning Center documenteert voor samengevoegde profielen.

:::warning Entiteiten met neveneffecten hebben een `onUndo`-hook nodig
Het terugdraaien van een `groupMember`-aanmaak moet ook `groupMemberHistory` ("left") schrijven, anders breken de verloopanalyses stilzwijgend. Dat is een vaste invariant van de werkruimte. Zulke entiteiten registreren een `onUndo`-callback in `AUDIT_REGISTRY` die `true` teruggeeft wanneer ze de terugdraaiing volledig hebben afgehandeld, zodat het generieke pad wordt overgeslagen. `groupMembers` is het canonieke geval. Die wordt op rij-id gesleuteld via het expliciete pad, maar op `personId` via de bulkendpoints, en de geschiedenis wordt bij elke toevoeging en verwijdering bijgehouden.
:::

## Consumentenoppervlakken

Beide beheeroppervlakken zijn **nog in ontwikkeling**. Het doel is:

| Oppervlak | Repository | Doel |
|-----------|------------|------|
| **Auditlogpagina** | B1Admin (ManageChurch → Audit Log) | Filteren op module, categorie, gebruiker of entiteit, en oud→nieuw-verschillen weergeven. Bij bewerkingen wordt vergeleken met de vorige vermelding van de entiteit, bij verwijderingen gebeurt dat op basis van `details.before`. Gebaseerd op `GET /membership/auditlogs`, afgeschermd door `Permissions.server.admin`. |
| **Batchpagina** | B1Admin (zelfde Settings-hub) | Batches weergeven met status en aantallen, **View Results** (de auditrijen van de batch via `GET /membership/batches/:id/results`), en een knop **Undo** die het rapport met overgeslagen conflicten of mislukte items toont. |
| **Importbatches** | B1Transfer | Een batch openen, `X-Batch-Id` meesturen bij de gewone opslagaanroepen en hem aan het eind voltooien. Imports worden zo ongedaan te maken zonder nieuwe importendpoints. De verouderde `importKey` blijft bestaan als lineage-markering voor alleen aanmaken, maar is voor ongedaan maken vervangen. |

## Valkuilen die een toekomstige wijziging niet mag terugdraaien

- **Auditinserts moeten afgewacht blijven.** Een niet-afgewacht `AuditLogHelper.log(...)` gaat verloren door de Lambda-bevriezing. Verzamel de beloften en wacht met `await Promise.allSettled` voordat je het antwoord teruggeeft.
- **Kysely laat `undefined` weg uit `.set()` en `.values()`.** Bij herstel zou een leeggemaakte kolom ongewijzigd blijven. `BatchUndoHelper` zet elk afwezig veld om naar expliciete `null` (`nullify`). Omzeil dit nooit voor een "snellere" directe schrijfactie.
- **De bewaartermijn moet ruim boven het venster voor ongedaan maken blijven.** `AuditLogRepo.deleteOld()` draait op de nachtelijke timer (standaard bewaartermijn van 365 dagen), terwijl het venster voor ongedaan maken 30 dagen is. Als de bewaartermijn ooit richting dat venster zakt, worden ongedaan-maakgegevens van open batches weggehaald.
- **Afgekapte rijen zijn niet ongedaan te maken.** Een payload `{ truncated: true }` heeft geen voor- en na-beeld. Ongedaan maken meldt die als `failed` en raadt nooit.
- **De volgorde is eerst de modulewrite, dan de audit.** Verplaats de auditinsert nooit vóór de echte schrijfactie, en houd hem strikt in batchmodus en adviserend in de normale modus.

## Bestandsinventaris

| Gebied | Bestanden |
|--------|-----------|
| Wrapper / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot en wegschrijven van rijen) |
| Engine voor ongedaan maken | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit-helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modellen / repositories | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migratie | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Beheer-UI (in ontwikkeling) | B1Admin Audit Log- en Batches-pagina's; B1Transfer-importbatchkop |

## Gerelateerde pagina's

- [Modulestructuur](../api/module-structure): hoe een controller die niet bij membership hoort via `RepoManager` de membership-repositories bereikt
- [Geven](./giving): de donatieschrijfpaden die als `sensitive` worden geauditeerd, ook wanneer ze anoniem zijn
- [Membership-endpoints](../api/endpoints/membership): de REST-interface die `X-Batch-Id` meestuurt en `/auditlogs` en `/batches` beschikbaar maakt
