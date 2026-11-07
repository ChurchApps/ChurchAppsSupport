---
title: "Revisionslog og fortrydelige batches"
description: "Dækker API'ets revisionslog, der registrerer alle brugerændringer på tværs af moduler, og hvordan importbatches kan fortrydes række for række i B1 Admin."
---

# Revisionslog og fortrydelige batches

<div class="article-intro">

Hver brugerinitieret ændring i API'et registreres på tværs af alle moduler, uden nogen opsætning pr. controller. Hvem, hvad, hvornår og hvorfra. Oven på dette ligger et batch-lag: et import eller en massehandling kan markeres som en batch og senere **fortrydes** række for række, på samme måde som i Planning Center. Begge dele lever i en enkelt `auditLogs`-tabel i medlemsdatabasen og styres helt fra ét fælles kontrolpunkt, `BaseController.actionWrapper`. Denne side beskriver, hvad der registreres, hvor data gemmes, de ydelsesafvejninger der præger designet, og hvordan fortrydelse tilbagefører en batch sikkert uden transaktioner på tværs af databaser.

</div>

## Overblik

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

To strukturelle forhold styrer alt nedenfor:

1. **Controller-laget er det eneste sted, der kender aktøren.** Repositories ser aldrig `AuthenticatedUser`; kun controllere har `au`. Alle modulers controllere passerer allerede gennem `BaseController.actionWrapper`, så det er her revisionen kobles til. Ingen repository-signaturer ændres nogen steds.
2. **Én tabel betjener alle moduler.** Revisionsrækker for donationer, fremmøde, indhold osv. skrives alle til membership-databasens `auditLogs` via `RepoManager.getRepos("membership")`, også fra en controller uden for membership. "Alt Jane har ændret i dag" bliver dermed én enkelt forespørgsel.

## Hvad registreres

Revision er **slået til som standard for alle ændrende verber på alle ruter**. `actionWrapper` udleder revisionsfelterne fra anmodningen uden nogen konfiguration pr. rute:

| Felt | Udledt fra |
|------|------------|
| `module` | `this.moduleName` (det ejende modul) |
| `entityType` | entalsformen af sidste segment i `req.baseUrl` (f.eks. `/membership/people` → `person`) |
| `category` | standard er `entityType` |
| `action` | `${entityType}_saved` for `POST /`, `${entityType}_deleted` for `DELETE /:id`, ellers `${entityType}_${method}:${routePath}`, så ikke-CRUD-underruter (f.eks. `task_post:/:id/move`) fanges automatisk |

`BaseController.AUDIT_REGISTRY` er **kun til overskrivninger og fravalg**. Det er ikke en tilladelsesliste. En rute optræder der for at omdøbe sin kategori eller entityType, for at erklære `{ dbModule, table }` (hvilket gør den batch- og fortrydelsesklar), for at markere den som `sensitive` (revidér anonyme ændringer) eller for at slå den fra med `optOut: true`.

**Fravalgsliste** (skrivestier med stor volumen, som ellers ville drukne protokollen): fremmøde `visits` / `visitsessions` / `sessions` / `checkin` (søndagens check-in-storm) samt messaging `messages` / `connections` / `devices` (chat og tilstedeværelse). Alt andet logges.

**Masseendepunkter** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) er registreret i `BULK_ROUTES` og skriver **én revisionsrække pr. berørt id**. En import af 10.000 personer giver således 10.000 rækker, og netop den granularitet gør batchen fortrydelig.

**Anonyme ændringer** (`actionWrapperAnon`: anonyme donationer, gæsteregistrering, formularindsendelser) revideres kun på ruter, der er markeret `sensitive` i registret. De skrives med `userId="anonymous"` samt klientens IP-adresse. Donationer ligger øverst på listen, og den sti har en reel regressionshistorik.

### Redigering af hemmeligheder og størrelsesgrænser

Før en `details`-payload gemmes, kører `AuditLogHelper.capDetails()` `sanitizeValue()` over den:

- **Hemmelige nøgler redigeres.** Ethvert felt, hvis navn med småt findes i `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret` osv.), erstattes med `"[redacted]"`.
- **Store skalarer fjernes.** Enhver `data:`-URI eller streng over 4 KB (base64-billeder, blobs) bliver til `"[stripped]"`.
- **Overdimensionerede rækker kappes.** Hvis den serialiserede JSON overstiger ca. 64 KB, erstattes hele payloaden med `{ truncated: true }`. Afkortede rækker kan stadig ses, men **kan ikke fortrydes**, da der ikke findes et før- eller efter-billede at gendanne fra.

## Hvor data lever

En enkelt `auditLogs`-tabel i **membership**-databasen understøtter alle moduler. Kolonnerne er `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON-streng), ipAddress, module, batchId, created`. Migrationen `tools/migrations/membership/2026-07-04_audit_universal.ts` tilføjer `module` og `batchId`, udvider `details` fra `TEXT` til `MEDIUMTEXT`, tilføjer indeksene `ix_auditLogs_batch (batchId)` og `ix_auditLogs_entity (churchId, module, entityType, entityId, created)` og opretter tabellen `batches`. Kolonnen `module` findes netop, så kollisioner i `entityType` på tværs af moduler (`note` og `setting` findes i flere) forbliver filtrerbare. Entitetsindekset driver både historikken pr. entitet og fortrydelsens konfliktkontrol.

Skrivninger på tværs af moduler går via `RepoManager.getRepos("membership")` inde fra wrapperen. Rækkefølgen er bevidst: **hovedskrivningen committes først i modulets database, og revisionsindsættelsen kommer derefter.** I normal tilstand sluges en fejl i revisionsindsættelsen (`console.error`, og Sentry fanger den). Revision er vejledende og må aldrig få en brugers anmodning til at fejle. I **batch-tilstand er den streng** (se nedenfor).

:::info Hvorfor ikke triggers, CDC eller tabeller pr. modul?
- **MySQL-triggers** kender ikke den handlende bruger (forbindelsen har ingen `au`), og de ville kræve vedligeholdelse af triggersæt i alle skemaer.
- **binlog / CDC** er et helt infrastrukturprojekt med samme problem med aktøridentitet.
- **At sende `userId` igennem hvert repository** ville berøre hundredvis af filer for at flytte information, som controller-laget allerede har.
- **Revisionstabeller pr. modul** ville betyde 7 gange så meget arbejde og fan-out-forespørgsler for ethvert spørgsmål på tværs af moduler. Én tabel ved controller-kontrolpunktet er den mindste kodemængde, der stadig fanger aktøren.
:::

## Ydelsesprincipper

Hot path'en er bevidst billig, og prisen betales kun dér, hvor den køber noget.

- **Ingen læsning før skrivning ved normale opdateringer.** Et almindeligt gem henter **ikke** den gamle post. De **indsendte efter-værdier** gemmes i `details.after`. UI'et rekonstruerer gammel→ny på *visningstidspunktet* ved at sammenligne med entitetens forrige revisionsrække. Én forespørgsel ved visning, nul omkostning ved skrivning. Felter, der aldrig er rørt siden lanceringen, viser simpelthen ingen "gammel" værdi, og det er acceptabelt.
- **Sletninger får et før-billede.** `DELETE /:id` på en registreret rute med `{ dbModule, table }` henter rækken generisk først og gemmer den i `details.before`. Sletninger er sjældne, og før-billedet er hele deres retsmedicinske værdi.
- **Batch-tilstand er den eneste systematiske læsning før skrivning**, og den er opt-in. En masse- eller importoperation er allerede dyr, så N snapshot-læsninger er prisen for at kunne fortryde.
- **Revisionsindsættelser afventes.** `actionWrapper` samler log-promises og kalder `await Promise.allSettled(...)`, før den returnerer. Det er den vigtigste invariant: på Lambda fryses containeren i det øjeblik svaret returneres, så en ikke-afventet indsættelse forsvinder stille. "Fire and forget" betyder her, at *fejl aldrig fejler anmodningen*, ikke at man *llader være med at afvente*. En enkelt indsættelse på den allerede varme membership-pulje tager ca. 1–3 ms.

## Batches og fortrydelse

En **batch** samler en mængde ændringer, så de kan gennemgås og vendes samlet. Der er to måder at åbne en på:

- **Eksplicit:** `POST /membership/batches { label, source }` returnerer et `batchId`. Klienten (B1Transfer, en import-UI i B1Admin) sender derefter `X-Batch-Id: <id>` på hvert efterfølgende gem eller slet. `POST /membership/batches/:id/complete` lukker batchen og sætter `itemCount`.
- **Implicit:** de fire masseendepunkter åbner, udfylder og afslutter deres egen batch inden for den enkelte anmodning og returnerer `batchId` i svaret.

Tabellen `batches` (membership-databasen): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batch-tilstand er streng

Når `X-Batch-Id` er til stede, skærper `actionWrapper` alle kontroller (`writeBatchAuditRows`):

1. Batchen skal findes, være `open` og tilhøre `au.churchId`. Ellers returneres **403**.
2. Ruten skal kunne bruges i en batch (`{ dbModule, table }` i registret). Ellers returneres **400**.
3. Før handlingen køres, indlæses før-billeder for alle berørte id'er i **én** forespørgsel: `WHERE id IN (...) AND churchId = ?`. Hvis snapshot-læsningen fejler, fejler anmodningen med **500, og handlingen udføres ikke**. Batch-tilstand må aldrig stille og roligt producere en protokol, der ikke kan fortrydes. (Normal tilstand er derimod bedst-forsøg og sluger snapshot-fejl.)
4. Når handlingen er lykkedes, skrives én revisionsrække pr. entitet med `batchId`, `details.before` og `details.after`, samt en eksplicit **oprettelsesmarkør** for de rækker, batchen oprettede.

### Fortrydelse

`POST /membership/batches/:id/undo` (tilladelse: batchens opretter eller `Permissions.server.admin`). Anmodningen afvises, hvis batchen ikke er `completed`, eller hvis den er ældre end **30 dages fortrydelsesvindue**. `BatchUndoHelper.undo()` gør derefter følgende:

1. Indlæser batchens revisionsrækker og **grupperer dem efter `(module, entityType, entityId)`**. En entitet, der er berørt flere gange inden for samme batch, tilbageføres **én gang** til sin sande tilstand før batchen. Det er enten det tidligste før-billede, eller en sletning hvis batchen oprettede den. Det er grunden til, at fortrydelse ikke naivt afspiller hver række: at gendanne et mellemliggende snapshot midt i batchen ville være forkert.
2. For hver entitet kører **konfliktkontrollen først**. `auditLog.hasLaterModification()` spørger, om der findes en *senere* revisionspost for samme `(module, entityType, entityId)` uden for denne batch. Hvis ja, er entiteten blevet redigeret efter importen. Den **springes over og rapporteres**, og den overskrives aldrig. Det genbruger selve revisionsloggen som ændringsdetektor, så der er ikke brug for `modifiedAt`-kolonner på nogen tabel.
3. Tilbageføringen sker efter den registrerede handling, med `{ dbModule, table }` fra registret og generiske Kysely-skrivninger:
   - **oprettet** → hård sletning af rækken.
   - **opdateret** → skriv `details.before` tilbage.
   - **slettet** → indsæt `details.before` igen (opdater eller indsæt, hvis en række med det id er dukket op igen).
4. Hver tilbageføring revideres selv (`action: "<entityType>_undone"`, uden `batchId`, da fortryd-af-fortrydelse er uden for scope).

Handlingen vælges ud fra den eksplicitte **oprettelsesmarkør** og ikke udledes af et manglende før-billede. Et legitimt tomt før-billede eller en afkortet række må ikke forveksles med en oprettelse.

Resultatpayloaden er `{ restored, skippedConflicts: [...], failed: [...], status }`. Batchen går til `undone` (rent) eller `partial`. **Der er ingen transaktion på tværs af databaser.** Fortrydelse er bedst-forsøg pr. række, samme begrænsning som Planning Center dokumenterer for sammenlagte profiler.

:::warning Sideeffekt-entiteter kræver en `onUndo`-hook
Tilbageføring af en `groupMember`-oprettelse skal også skrive `groupMemberHistory` ("left"), ellers går churn-analysen stille i stykker. Det er en vedvarende invariant i arbejdsområdet. Sådanne entiteter registrerer en `onUndo`-callback i `AUDIT_REGISTRY`, som returnerer `true`, når den har håndteret tilbageføringen fuldt ud, og dermed springer den generiske sti over. `groupMembers` er det kanoniske eksempel. Den er nøglet på rækkens id på den eksplicitte sti, men på `personId` i masseendepunkterne, og den er historikregistreret ved hver tilføjelse og fjernelse.
:::

## Forbrugerflader

Begge administrationsflader er **under udvikling**. Hensigten er:

| Flade | Applikation | Formål |
|-------|-------------|--------|
| **Revisionslog-side** | B1Admin (ManageChurch → Audit Log) | Filtrér efter modul, kategori, bruger eller entitet, og vis gammel→ny-forskelle. Ved redigeringer sammenlignes der med entitetens forrige post, og ved sletninger bruges `details.before`. Understøttes af `GET /membership/auditlogs` og kræver `Permissions.server.admin`. |
| **Batch-side** | B1Admin (samme Indstillinger-hub) | Vis batches med status og antal, **Se resultater** (batchens revisionsrækker via `GET /membership/batches/:id/results`) og en **Fortryd**-knap, der viser rapporten over sprungne konflikter og fejl. |
| **Importbatches** | B1Transfer | Åbn en batch, send `X-Batch-Id` på dens normale gemmekald, og afslut den til sidst. Importer bliver fortrydelige uden nye importendepunkter. Den ældre `importKey` bliver stående som et rent oprettelses-herkomstmærke, men er erstattet for fortrydelse. |

## Faldgruber, en fremtidig ændring ikke må regressere

- **Revisionsindsættelser skal forblive afventede.** Et ikke-afventet `AuditLogHelper.log(...)` droppes af Lambda-frysningen. Saml promises og kald `await Promise.allSettled` før returnering.
- **Kysely dropper `undefined` fra `.set()` og `.values()`.** Ved gendannelse ville en ryddet kolonne overleve urørt. `BatchUndoHelper` konverterer alle manglende felter til eksplicit `null` (`nullify`). Omgå det aldrig for en "hurtigere" direkte skrivning.
- **Opbevaring skal forblive langt over fortrydelsesvinduet.** `AuditLogRepo.deleteOld()` kører på den natlige timer (standard 365 dages opbevaring), mens fortrydelsesvinduet er 30 dage. Hvis opbevaringen nogensinde nærmer sig vinduet, bliver fortrydelsesprotokoller slettet under batches, der stadig er åbne.
- **Afkortede rækker kan ikke fortrydes.** En `{ truncated: true }`-payload har intet før- eller efter-billede. Fortrydelse rapporterer den som `failed` og gætter aldrig.
- **Rækkefølgen er modulskrivning først, revision bagefter.** Flyt aldrig revisionsindsættelsen foran den egentlige skrivning, og hold den streng i batch og vejledende i normal tilstand.

## Filoversigt

| Område | Filer |
|--------|-------|
| Wrapper / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot og skrivning af rækker) |
| Fortrydelsesmotor | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Revisionshjælper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllere | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeller / repositories | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-UI (under udvikling) | B1Admin-siderne Revisionslog og Batches; B1Transfers import-batch-header |

## Relaterede sider

- [Modulstruktur](../api/module-structure.md): hvordan en controller uden for membership når membership-repositories via `RepoManager`
- [Donationer](./giving.md): de donationsskrivestier, der revideres som `sensitive`, selv når de er anonyme
- [Membership-endepunkter](../api/endpoints/membership.md): REST-fladen, der bærer `X-Batch-Id` og eksponerer `/auditlogs` og `/batches`
