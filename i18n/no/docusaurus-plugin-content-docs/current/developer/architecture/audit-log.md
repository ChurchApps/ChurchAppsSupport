---
title: "Revisjonslogg og angrebare partier"
---

# Revisjonslogg og angrebare partier

<div class="article-intro">

Hver brukerinitiert mutasjon i Api registreres — hvem, hva, når og hvorfra — på tvers av alle moduler, uten noen per-controller-oppkobling. Oppå denne hovedboken sitter et partilag: en import eller en masseoperasjon kan merkes som et parti og senere **angres** rad for rad, i Planning Center-stil. Begge deler lever i en enkelt `auditLogs`-tabell i medlemskapsdatabasen og styres helt fra ett trangt punkt, `BaseController.actionWrapper`. Denne siden kartlegger hva som revideres, hvor dataene ligger, ytelsesavveiningene som former det, og hvordan angring reverserer et parti trygt uten transaksjoner på tvers av databaser.

</div>

## Oversikt

```
hver muterende forespørsel (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ utled {module, entityType, category, action}
        │                         fra req.baseUrl + metode  (AUDIT_REGISTRY = kun overstyringer/unntak)
        │
        ├─ normal modus ─────────▶ kjør handling ─▶ vent på AuditLogHelper.log(after-verdier)  ──┐
        │                                        (slettinger fanger også et før-bilde)            │
        │                                                                                         ▼
        └─ X-Batch-Id til stede ──▶ ta øyeblikksbilde av før-bilder (streng) ─▶ kjør handling ─▶ revisjonsrader merket med batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (medlemskapsdatabase, én tabell, alle moduler)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ gå gjennom rader i motsatt rekkefølge, per entitet ┘
                                          konfliktvakt → gjenopprett / slett / sett inn på nytt
```

To strukturelle fakta driver alt nedenfor:

1. **Controller-laget er det eneste stedet som kjenner aktøren.** Repositorier ser aldri `AuthenticatedUser`; bare controllere har `au`. Hver moduls controllere passerer allerede gjennom `BaseController.actionWrapper`, så det er der revisjonen kobler seg inn — ingen repo-signaturer endres noe sted.
2. **Én tabell betjener alle moduler.** Revisjonsrader for donasjoner, oppmøte, innhold osv. skrives alle inn i medlemskapsdatabasens `auditLogs` via `RepoManager.getRepos("membership")`, selv fra en controller som ikke tilhører medlemskapsmodulen. "Alt Jane endret i dag" forblir ett enkelt spørring.

## Hva som revideres

Revisjon er **standard på for hvert muterende verb på hver rute**. `actionWrapper` utleder revisjonsfeltene fra forespørselen uten noen per-rute-konfigurasjon:

| Felt | Utledet fra |
|-------|--------------|
| `module` | `this.moduleName` (den eiende modulen) |
| `entityType` | entallsform av siste segment av `req.baseUrl` (f.eks. `/membership/people` → `person`) |
| `category` | faller tilbake til `entityType` |
| `action` | `${entityType}_saved` for `POST /`, `${entityType}_deleted` for `DELETE /:id`, ellers `${entityType}_${method}:${routePath}` slik at ikke-CRUD-underruter (f.eks. `task_post:/:id/move`) fanges automatisk |

`BaseController.AUDIT_REGISTRY` er **kun for overstyringer og unntak** — det er ikke en tillatelsesliste. En rute oppføres der for å gi kategori/entityType nytt navn, for å deklarere `{ dbModule, table }` (som gjør den parti- og angrebar), for å merke den som `sensitive` (revider anonyme mutasjoner), eller for å slå den av med `optOut: true`.

**Unntaksliste** (brannslange-skrivestier som ville druknet hovedboken): oppmøte `visits` / `visitsessions` / `sessions` / `checkin` (søndags innsjekkingsstormen) og meldinger `messages` / `connections` / `devices` (chat og tilstedeværelse). Alt annet logges.

**Bulk-endepunkter** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) er registrert i `BULK_ROUTES` og sender ut **én revisjonsrad per berørt id**, så en import av 10 000 personer produserer 10 000 rader — det er nettopp denne per-entitets granulariteten som gjør partiet angrebart.

**Anonyme mutasjoner** (`actionWrapperAnon` — gjestedonasjoner, gjestepåmelding, skjemainnsendinger) revideres bare for registerflaggede `sensitive`-ruter, skrevet med `userId="anonymous"` pluss klientens IP. Donasjoner topper listen; den stien har en reell regresjonshistorikk.

### Sladding av hemmeligheter og størrelsestak

Før noen `details`-nyttelast lagres, kjører `AuditLogHelper.capDetails()` `sanitizeValue()` over den:

- **Hemmelige nøkler sladdes.** Ethvert felt hvis navn i små bokstaver finnes i `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) erstattes med `"[redacted]"`.
- **Enorme skalarer strippes.** Enhver `data:`-URI eller streng over 4 KB (base64-bilder, blobber) blir `"[stripped]"`.
- **Oversized rader begrenses.** Hvis den serialiserte JSON-en overstiger ~64 KB, erstattes hele nyttelasten med `{ truncated: true }`. Avkuttede rader er fortsatt synlige — men **ikke angrebare** (det finnes ikke noe før/etter-bilde å gjenopprette fra).

## Hvor dataene ligger

En enkelt `auditLogs`-tabell i **medlemskaps**-databasen betjener hver modul. Kolonner: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON-streng), ipAddress, module, batchId, created`. Migrasjonen `tools/migrations/membership/2026-07-04_audit_universal.ts` legger til `module` + `batchId`, utvider `details` fra `TEXT` til `MEDIUMTEXT`, legger til indeksene `ix_auditLogs_batch (batchId)` og `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, og oppretter `batches`-tabellen. `module`-kolonnen finnes nettopp for at `entityType`-kollisjoner på tvers av moduler (`note`, `setting` finnes i flere) skal forbli filtrerbare, og entitetsindeksen er det som driver både per-entitets historikk og angre-konfliktvakten.

Skriving på tvers av moduler går gjennom `RepoManager.getRepos("membership")` fra innsiden av wrapperen. Rekkefølgen er bevisst: **hovedskrivingen committer i modul-databasen først, revisjonsinnsettingen deretter.** I normal modus svelges en feil ved revisjonsinnsetting (`console.error`, Sentry fanger den opp) — revisjon er rådgivende og skal aldri kunne velte en brukers forespørsel. I **partimodus er det strengt** (se nedenfor).

:::info Hvorfor ikke triggere, CDC eller per-modul-tabeller?
- **MySQL-triggere** vet ikke hvem den handlende brukeren er (tilkoblingen har ingen `au`), og ville bety vedlikehold av triggersett på tvers av hvert skjema.
- **binlog / CDC** er et helt infrastrukturprosjekt med det samme aktør-identitetsproblemet.
- **Å tre `userId` gjennom hvert repo** ville berøre hundrevis av filer for å flytte informasjon controller-laget allerede har.
- **Per-modul-revisjonstabeller** ville betydd 7× rørleggingen og spredte spørringer for ethvert spørsmål på tvers av moduler. Én tabell ved controller-trangpunktet er designet med minst kode som fortsatt fanger aktøren.
:::

## Ytelsesposisjon

Den hyppig brukte stien er bevisst billig; kostnaden betales bare der den kjøper noe.

- **Ingen les-før-skriv ved normale oppdateringer.** En vanlig lagring laster **ikke** den gamle posten. De **innsendte etter-verdiene** lagres i `details.after`; brukergrensesnittet rekonstruerer gammel→ny ved *visnings*tidspunkt ved å sammenligne mot entitetens forrige revisjonsrad. Ett spørring ved visningstidspunkt, null kostnad ved skrivetidspunkt. Felt som aldri har blitt berørt siden lansering, viser rett og slett ingen "gammel" verdi — det er akseptabelt.
- **Slettinger får et før-bilde.** `DELETE /:id` på en registerrute med `{ dbModule, table }` laster raden generisk først og lagrer den i `details.before`. Slettinger er sjeldne, og før-bildet er hele den rettsmedisinske verdien.
- **Partimodus er den eneste systematiske les-før-skriv**, og den er opt-in — en bulk-/importoperasjon er allerede kostbar, så N øyeblikksbildelesinger er prisen for angring.
- **Revisjonsinnsettinger avventes.** `actionWrapper` samler loggløftene og `await Promise.allSettled(...)` før den returnerer. Dette er den viktigste enkeltinvarianten: på Lambda **fryser** beholderen i det øyeblikket svaret returneres, så en ikke-avventet innsetting droppes i stillhet. "Skyt og glem" betyr her *feil skal aldri velte forespørselen*, ikke *ikke vent* — en enkelt innsetting mot den allerede varme medlemskapsforbindelsen er ~1–3 ms.

## Partier og angring

Et **parti** grupperer et sett mutasjoner slik at de kan gjennomgås og reverseres sammen. Det finnes to måter å åpne ett på:

- **Eksplisitt:** `POST /membership/batches { label, source }` returnerer en `batchId`. Klienten (B1Transfer, et B1Admin-import-grensesnitt) sender deretter `X-Batch-Id: <id>` på hver påfølgende lagring/sletting. `POST /membership/batches/:id/complete` lukker det og stempler `itemCount`.
- **Implisitt:** de fire bulk-endepunktene åpner, fyller og fullfører sitt eget parti innenfor den enkelte forespørselen, og returnerer `batchId` i svaret.

`batches`-tabellen (medlemskapsdatabase): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Partimodus er streng

Når `X-Batch-Id` er til stede, strammer `actionWrapper` inn hver vakt (`writeBatchAuditRows`):

1. Partiet må eksistere, være `open`, og tilhøre `au.churchId` — ellers **403**.
2. Ruten må være partikapabel (`{ dbModule, table }` i registeret) — ellers **400**.
3. Før handlingen kjører, lastes før-bilder for alle berørte id-er i **ett** `WHERE id IN (...) AND churchId = ?`-spørring. Hvis denne øyeblikksbildelesningen mislykkes, **feiler forespørselen med 500 og handlingen utføres ikke** — partimodus skal aldri i stillhet produsere en hovedbok som ikke kan angres. (Normal modus, derimot, er beste-innsats og svelger feil ved øyeblikksbildelesing.)
4. Etter at handlingen lykkes, skrives én revisjonsrad per entitet med `batchId`, `details.before`, og `details.after`, pluss en eksplisitt **opprettelsesmarkør** for rader partiet opprettet.

### Angring

`POST /membership/batches/:id/undo` (tillatelse: partiets skaper eller `Permissions.server.admin`). Den nekter hvis partiet ikke er `completed` eller er eldre enn **30-dagers angrevinduet**. `BatchUndoHelper.undo()` gjør deretter følgende:

1. Laster partiets revisjonsrader og **grupperer dem etter `(module, entityType, entityId)`.** En entitet som er berørt flere ganger i ett parti, reverseres **én gang**, tilbake til sin sanne tilstand før partiet — det tidligste før-bildet, eller en sletting hvis partiet opprettet den. Dette er grunnen til at angring ikke naivt spiller av hver rad på nytt: å gjenopprette et mellomliggende midt-i-partiet-øyeblikksbilde ville vært feil.
2. For hver entitet kjøres **konfliktvakten først**: `auditLog.hasLaterModification()` spør om det finnes noen *senere* revisjonsoppføring for samme `(module, entityType, entityId)` utenfor dette partiet. Hvis ja, ble entiteten redigert etter importen — den **hoppes over og rapporteres**, aldri overskrevet. Dette gjenbruker selve revisjonsloggen som endringsdetektor; ingen `modifiedAt`-kolonner trengs på noen tabell.
3. Reverserer per den registrerte operasjonen, løser `{ dbModule, table }` fra registeret og bruker generiske Kysely-skrivinger:
   - **opprettet** → hardsletter raden.
   - **oppdatert** → skriver `details.before` tilbake.
   - **slettet** → setter `details.before` inn på nytt (oppdater-eller-sett-inn hvis en rad med den id-en har dukket opp igjen).
4. Hver reversering revideres selv (`action: "<entityType>_undone"`, ingen `batchId` — angring av angring er utenfor omfanget).

Operasjonen velges ut fra den eksplisitte **opprettelsesmarkøren**, ikke utledet fra et manglende før-bilde — et legitimt tomt før-bilde eller en avkuttet rad må ikke feiltolkes som en opprettelse.

Resultatnyttelasten er `{ restored, skippedConflicts: [...], failed: [...], status }`; partiet flyttes til `undone` (rent) eller `partial`. **Det finnes ingen transaksjon på tvers av databaser** — angring er beste-innsats per rad, den samme begrensningen Planning Center dokumenterer for sammenslåtte profiler.

:::warning Entiteter med sideeffekter trenger en `onUndo`-krok
Reversering av en opprettelse av `groupMember` må også skrive `groupMemberHistory` ("left"), ellers brytes churn-analyser i stillhet — en stående invariant i arbeidsområdet. Slike entiteter registrerer en `onUndo`-tilbakekalling i `AUDIT_REGISTRY` som returnerer `true` når den har håndtert reverseringen fullt ut, og dermed omgår den generiske stien. `groupMembers` er det kanoniske tilfellet (nøkkel er rad-id på den eksplisitte stien, men `personId` på bulk-endepunkter, og historikkspores på hver tillegg/fjerning).
:::

## Forbrukergrensesnitt

Begge admin-grensesnittene er **under arbeid**; intensjonen:

| Grensesnitt | Repo | Formål |
|---------|------|---------|
| **Revisjonslogg-siden** | B1Admin (ManageChurch → Audit Log) | Filtrer etter modul/kategori/bruker/entitet og gjengi gammel→ny-differ — for redigeringer ved å diffe mot entitetens forrige oppføring, for slettinger fra `details.before`. Støttet av `GET /membership/auditlogs`, sperret av `Permissions.server.admin`. |
| **Partier-siden** | B1Admin (samme innstillings-hub) | List opp partier med status og antall, **Se resultater** (partiets revisjonsrader via `GET /membership/batches/:id/results`), og en **Angre**-knapp som viser rapporten over hoppet-over-konflikter / feil. |
| **Import-partier** | B1Transfer | Åpne et parti, send `X-Batch-Id` på dets normale lagringskall, fullfør til slutt — importer blir angrebare uten nye importendepunkter. Den eldre `importKey` beholdes som en opprett-bare-avstamningsmarkør, avløst for angring. |

## Fallgruver en fremtidig endring ikke må gjeninnføre

- **Revisjonsinnsettinger må fortsatt avventes.** Ikke-avventet `AuditLogHelper.log(...)` droppes av Lambda-frysingen. Samle løfter og `await Promise.allSettled` før du returnerer.
- **Kysely dropper `undefined` fra `.set()`/`.values()`.** Ved gjenoppretting ville en tømt kolonne overlevd urørt. `BatchUndoHelper` konverterer hvert fraværende felt til eksplisitt `null` (`nullify`) — omgå den aldri for en "raskere" direkte skriving.
- **Oppbevaring må holdes godt over angrevinduet.** `AuditLogRepo.deleteOld()` kjører på nattlig timer (standard 365 dagers oppbevaring); angrevinduet er 30 dager. Hvis oppbevaringen noen gang nærmer seg vinduet, blir angrehovedbøker renset ut under åpne partier.
- **Avkuttede rader kan ikke angres.** En `{ truncated: true }`-nyttelast har ikke noe før/etter-bilde; angring rapporterer den som `failed`, gjetter aldri.
- **Rekkefølgen er modul-skriv-så-revisjon.** Flytt aldri revisjonsinnsettingen foran den faktiske skrivingen, og hold den streng-i-parti / rådgivende-i-normal.

## Filoversikt

| Område | Filer |
|------|-------|
| Wrapper / register | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, øyeblikksbilde + skrive-rader) |
| Angremotor | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Revisjonshjelper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllere | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeller / repoer | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrasjon | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin-UI (under arbeid) | B1Admin sidene Audit Log + Batches; B1Transfer import-parti-header |

## Relaterte sider

- [Modulstruktur](../api/module-structure) — hvordan en controller utenfor medlemskapsmodulen når medlemskaps-repoene gjennom `RepoManager`
- [Giving](./giving) — donasjonsskrivestiene som revideres som `sensitive` selv når de er anonyme
- [Medlemskaps-endepunkter](../api/endpoints/membership) — REST-overflaten som bærer `X-Batch-Id` og eksponerer `/auditlogs` og `/batches`
