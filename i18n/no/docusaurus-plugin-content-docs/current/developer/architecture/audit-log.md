---
title: "Revisjonslogg og angrettbare partier"
---

# Revisjonslogg og angrettbare partier

<div class="article-intro">

Hver brukerinitiert mutasjon i Api registreres — hvem, hva, når og hvor — på tvers av alle moduler, uten noen per-controller-ledning. På toppen av denne hovedboken sitter et partillag: en import eller massehandling kan merkes som et parti og senere **angres** rad-for-rad, Planning-Center-stil. Begge deler lever i en enkelt `auditLogs` tabell i medlemskapdatabasen og drives helt fra ett trangpunkt, `BaseController.actionWrapper`. Denne siden kartlegger hva som blir revidert, hvor dataene befinner seg, ytelsesavveininger som former det, og hvordan angring omgjør et parti sikkert uten transaksjoner på tvers av databaser.

</div>

## Oversikt

```
hver muterende forespørsel (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ utled {module, entityType, category, action}
        │                         fra req.baseUrl + metode (AUDIT_REGISTRY = overstyringer/utelukkelser bare)
        │
        ├─ normal modus ─────────▶ kjør handling ─▶ vent AuditLogHelper.log(after-values)  ──┐
        │                                        (slettinger fanger også et før-bilde)    │
        │                                                                                  ▼
        └─ X-Batch-Id til stede ──▶ øyeblikksbilde før-bilder (streng) ─▶ kjør handling ─▶ revidéringsrader merket batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs (medlemskapsdatabase, én tabell, alle moduler)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ gå gjennom rader omvendt, per entitet ┘
                                          konfliktbeskyttelse → gjenopprett / slett / re-sett inn
```

To strukturelle fakta driver alt nedenfor:

1. **Controllerlaget er det eneste stedet som kjenner aktøren.** Depoter ser aldri `AuthenticatedUser`; bare kontrollere har `au`. Hver moduls kontrollere passerer allerede gjennom `BaseController.actionWrapper`, så det er der revisjoneringen kobler seg inn — ingen repo-signaturer endrer seg noe sted.
2. **En tabell betjener alle moduler.** Revisjonrader for donering, oppmøte, innhold osv. blir alle skrevet inn i medlemskapsDB-ens `auditLogs` via `RepoManager.getRepos("membership")`, selv fra en ikke-medlemskap-controller. "Alt Jane endret i dag" forblir en enkelt forespørsel.

## Hva som blir revidert

Revisjonering er **standardpå for hver muterende verb på hver rute**. `actionWrapper` utleder revisjonsfeltene fra forespørselen med null per-rute konfig:

| Felt | Utledet fra |
|-------|--------------|
| `module` | `this.moduleName` (den eier modulen) |
| `entityType` | enkeltform siste segment av `req.baseUrl` (f.eks. `/membership/people` → `person`) |
| `category` | standardverdier til `entityType` |
| `action` | `${entityType}_saved` for `POST /`, `${entityType}_deleted` for `DELETE /:id`, ellers `${entityType}_${method}:${routePath}` så ikke-CRUD under-rutene (f.eks. `task_post:/:id/move`) blir fanget automatisk |

`BaseController.AUDIT_REGISTRY` er **bare for overstyringer og utelukkelser** — det er ikke en tillateliste. En rute vises der for å omdøpe kategori/entityType, for å erklære `{ dbModule, table }` (som gjør det batch- og angre-kapabelt), for å markere det `sensitive` (revisjon anonyme mutasjoner), eller for å slå det av med `optOut: true`.

**Utelukkelses liste** (brannarkveisstier som ville drukne hovedboken): oppmøte `visits` / `visitsessions` / `sessions` / `checkin` (søndags innsjekking storm) og meldinger `messages` / `connections` / `devices` (chat og tilstedeværelse). Alt annet logger.

**Masseendepunkter** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) er registrert i `BULK_ROUTES` og sender ut **en revisjonrad per berørt id**, så en 10k-person import produserer 10k rader — at per-entitet granularitet er akkurat hva som gjør partiet angrettbar.

**Anonyme mutasjoner** (`actionWrapperAnon` — gjest donering, gjest registrering, skjema innsendinger) blir revidert bare for registreringsmerket `sensitive` ruter, skrevet med `userId="anonymous"` pluss klienten IP. Donasjoner leder listen; den stien har en ekte regresjonshistorie.

### Hemmelighetsredaksjon og størrelsesgrenser

Før en `details` last lagres, kjører `AuditLogHelper.capDetails()` `sanitizeValue()` over den:

- **Hemmeligtaster blir redaksjonert.** Ethvert felt hvis lavercased navn er i `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) blir erstattet med `"[redacted]"`.
- **Enorme skalarer blir fjernet.** Ethvert `data:` URI eller streng over 4 KB (base64 bilder, blobber) blir `"[stripped]"`.
- **Overstore rader blir begrenset.** Hvis den serialiserte JSON overskrider ~64 KB blir hele lasten erstattet med `{ truncated: true }`. Avkappede rader er fortsatt visbare — men **ikke angrettbar** (det er ingen før/etter bilde å gjenopprette fra).

## Hvor dataene befinner seg

En enkelt `auditLogs` tabell i **medlemskaps** databasen støtter hver modul. Kolonner: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Migrasjonen `tools/migrations/membership/2026-07-04_audit_universal.ts` legger til `module` + `batchId`, utvidelser `details` fra `TEXT` til `MEDIUMTEXT`, legger til indekser `ix_auditLogs_batch (batchId)` og `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, og oppretter `batches` tabellen. `module` kolonnen eksisterer nøyaktig så `entityType` kollisjoner på tvers av moduler (`note`, `setting` eksisterer i flere) forblir filtrerbare, og enhets indeksen er hva som driver både per-entitet historie og angre konfliktbeskyttelse.

Skriv på tvers av moduler går gjennom `RepoManager.getRepos("membership")` fra innsiden av omslaget. Rekkefølge er tilsiktet: **hovedskrivingen forplikter seg i modul DB først, revisjon innsettingen andre.** I normal modus en revisjon-innsetting feil blir svelget (`console.error`, Sentry plukker det opp) — revisjon er rådgivende og må aldri mislykkes en brukers forespørsel. I **partie modus det er streng** (se nedenfor).

:::info Hvorfor ikke triggere, CDC eller per-modul tabeller?
- **MySQL triggere** vet ikke den handlende brukeren (tilkoblingen har ingen `au`), og ville bety vedlikehold av trigger sett på tvers av alle skjemaer.
- **binlog / CDC** er et helt infrastruktur prosjekt med samme aktør-identitets problem.
- **Threading `userId` gjennom hver depot** ville berøre hundrevis av filer for å flytte informasjon controllerlaget allerede har.
- **Per-modul revisjon tabeller** ville bety 7× røret og vifte-ut forespørsler for noen spørsmål på tvers av moduler. Én tabell ved controllertrangpunktet er minst-kod designet som fortsatt fanger aktøren.
:::

## Ytelsesstilling

Den varme stien er bevisst billig; kostnaden betales bare der det kjøper noe.

- **Ingen les-før-skriving på normale oppdateringer.** En vanlig lagring **ikke** laster den gamle posten. De **sendte etter-verdiene** lagres i `details.after`; brukerflaten rekonstruerer gammel→ny på *vis* tid ved å sammenligne mot enhetens tidligere revisjonrad. Én forespørsel på vistid, null kostnad på skrivetid. Felt aldri berørt siden lansering viser ganske enkelt ingen "gammel" verdi — akseptabel.
- **Slettinger får et før-bilde.** `DELETE /:id` på en registrerings rute med `{ dbModule, table }` laster raden generisk først og lagrer det i `details.before`. Slettinger er sjeldne og før-bildet er hele rettsmedisinsk verdi.
- **Partie modus er den eneste systematiske les-før-skriving**, og det er opt-in — en bulk/import operasjon er allerede dyr, så N øyeblikks bilder er prisen på angring.
- **Revisjon innsettinger er avventet.** `actionWrapper` samler loggpromisuene og `await Promise.allSettled(...)` før retur. Dette er den eneste viktigste invarianten: på Lambda beholderen **fryser øyeblikket svaret returnerer**, så et uavventet innsetting blir stille droppet. "Skyte og glemme" her betyr *feil mislykkes aldri forespørselen*, ikke *ikke vent* — en enkelt innsetting på den allerede varme medlemskapssamling er ~1–3 ms.

## Partier og angring

Et **partie** grupperer et sett av mutasjoner slik de kan gjennomgås og reverseres sammen. Det er to måter å åpne en:

- **Eksplisitt:** `POST /membership/batches { label, source }` returnerer en `batchId`. Klienten (B1Transfer, en B1Admin import UI) sender deretter `X-Batch-Id: <id>` på hver påfølgende lagring/sletting. `POST /membership/batches/:id/complete` lukker det og stempel `itemCount`.
- **Implisitt:** de fire masse endepunktene åpner, populerer og kompletterer sine egne partie inne i den enkelte forespørselen, returnerer `batchId` i svaret.

`batches` tabellen (medlemskap DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Partie modus er streng

Når `X-Batch-Id` er til stede, `actionWrapper` strammar hver vakt (`writeBatchAuditRows`):

1. Partiet må eksistere, være `open`, og tilhøre `au.churchId` — ellers **403**.
2. Ruten må være partie-kapabel (`{ dbModule, table }` i registeret) — ellers **400**.
3. Før handlingen kjører, før-bilder for alle berørte ids blir lastet i **en** `WHERE id IN (...) AND churchId = ?` forespørsel. Hvis denne øyeblikks bilder lesing mislykkes, forespørselen **mislykkes 500 og handlingen kjører ikke** — partie modus må aldri stille produsere en un-angrettbar hovedbok. (Normal modus, derimot, er best-effort og svelger øyeblikks feil.)
4. Etter at handlingen lykkes, en revisjonrad per entitet blir skrevet med `batchId`, `details.before`, og `details.after`, pluss en eksplisitt **opprett markør** for rader partiet opprettet.

### Angring

`POST /membership/batches/:id/undo` (tillatelse: partie skaper eller `Permissions.server.admin`). Det nekter hvis partiet ikke er `completed` eller er eldre enn **30-dagers angre vinduet**. `BatchUndoHelper.undo()` så:

1. Laster partiets revisjon rader og **grupperer dem etter `(module, entityType, entityId)`.** En entitet berørt flere ganger innsiden ett partie blir reversert **en gang**, tilbake til sin sanne før-partie tilstand — den tidligste før-bildet, eller en sletting hvis partiet opprettet det. Dette er hvorfor angring ikke naivt gjenspiller hver rad: gjenopprette en mellomliggende mellom-partie øyeblikks bilde ville være galt.
2. For hver entitet, kjør **konfliktbeskyttelsen først**: `auditLog.hasLaterModification()` spør hvorvidt en *senere* revisjon innsettelse eksisterer for den samme `(module, entityType, entityId)` utenfor dette partiet. Hvis ja, entiteten ble redigert etter importen — den er **hoppet over og rapportert**, aldri overskrevet. Dette gjenbruk revisjon logg selv som modifikasjons detektøren; ingen `modifiedAt` kolonner trenges på noen tabell.
3. Reverserer per den registrerte op, løsning `{ dbModule, table }` fra registeret og bruk generisk Kysely skriving:
   - **opprettet** → hard-slett raden.
   - **oppdatert** → skriv `details.before` tilbake.
   - **slettet** → re-sett inn `details.before` (oppdater-eller-sett inn hvis en rad med at id dukket opp igjen).
4. Hver reversering blir selv revidert (`action: "<entityType>_undone"`, ingen `batchId` — angring-av-angring er utenfor omfang).

Operasjonen velges fra den eksplisitte **opprett markør**, ikke utledet fra et manglende før-bilde — en legitim tom før-bilde eller en avkappet rad må ikke misforstås som en opprettelse.

Resultat lasten er `{ restored, skippedConflicts: [...], failed: [...], status }`; partiet beveger seg til `undone` (ren) eller `partial`. **Det er ingen trans-DB transaksjon** — angring er best-effort per rad, samme begrensning Planning Center dokumenterer for sammenslåtte profiler.

:::warning Bivirknings entiteter trenger en `onUndo` krok
Reversering av en `groupMember` opprettelse må også skrive `groupMemberHistory` ("venstre"), eller churn analyser brekker stille — en stående arbeidsområde invariant. Slike entiteter registrerer en `onUndo` tilbakemelding i `AUDIT_REGISTRY` som returnerer `true` når den har fullt håndtert reverseringen, omgår den generiske banen. `groupMembers` er den kanoniske saken (nøkklet etter rad id på den eksplisitte banen men etter `personId` på masse endepunkter, og historie-sporet på hver tilføy/fjern).
:::

## Forbrukersflater

Begge administrasjonsflater er **pågår**; hensikten:

| Flate | Depo | Formål |
|---------|------|---------|
| **Revisjonlogg side** | B1Admin (ManageChurch → Audit Log) | Filter etter modul/kategori/bruker/entitet og gjengitt gammel→ny diffs — for redigeringer ved å sammenligne mot enhetens tidligere innsettelse, for slettinger fra `details.before`. Støttet av `GET /membership/auditlogs`, gated av `Permissions.server.admin`. |
| **Partier side** | B1Admin (samme Settings hub) | List partier med status og teller, **Se resultater** (partiets revisjon rader via `GET /membership/batches/:id/results`), og en **Angring** knapp som viser den hoppet-over-konflikt / mislykket rapport. |
| **Import partier** | B1Transfer | Åpne et partie, send `X-Batch-Id` på dets normale lagre anrop, kompletter på slutten — importerer blir angrettbar uten ny import endepunkter. Den eldre `importKey` forblir som en opprettet-bare avstamning markør, superseded for angring. |

## Fallgruver en fremtidig endring må ikke regredere

- **Revisjon innsettinger må forbli avventet.** Uavventet `AuditLogHelper.log(...)` blir droppet av Lambda frysing. Samle promiser og `await Promise.allSettled` før retur.
- **Kysely slipper `undefined` fra `.set()`/`.values()`.** På gjenopprette, en klar kolonne ville overleve urørt. `BatchUndoHelper` konverterer hver fraværende felt til eksplisitt `null` (`nullify`) — aldri omgå det for en "raskere" direkte skriving.
- **Oppbevaring må holde seg godt over angre vinduet.** `AuditLogRepo.deleteOld()` kjører på nattlig timer (standard 365-dagers oppbevaring); angre vinduet er 30 dager. Hvis oppbevaring noen gang faller mot vinduet, blir angre hovedbøker renset ut fra under åpne partier.
- **Avkappede rader er ikke angrettbar.** En `{ truncated: true }` last har ingen før/etter bilde; angring rapporterer det som `failed`, aldri gjetter.
- **Rekkefølge er modul-skriving-så-revisjon.** Aldri flytt revisjon innsettingen foran den virkelige skrivingen, og hold det streng-i-partie / rådgivende-i-normal.

## Filbeholdning

| Område | Filer |
|------|-------|
| Omslag / registrering | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, øyeblikks + skrive-rader) |
| Angring motor | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Revisjon hjelpemiddel | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Kontrolleser | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Modeller / depoter | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrasjon | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (pågår) | B1Admin Audit Log + Batches sider; B1Transfer import-partie header |

## Relaterte sider

- [Modul struktur](../api/module-structure) — hvordan en ikke-medlemskap kontroller når medlemskaps depoer gjennom `RepoManager`
- [Giving](./giving) — donerings skriv baner som blir revidert som `sensitive` selv når anonyme
- [Medlemskaps endepunkter](../api/endpoints/membership) — REST flaten som bærer `X-Batch-Id` og avslører `/auditlogs` og `/batches`
