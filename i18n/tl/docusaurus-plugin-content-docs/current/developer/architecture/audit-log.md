---
title: "Audit Log at Undoable Batches"
---

# Audit Log at Undoable Batches

<div class="article-intro">

Bawat user-initiated na mutation sa Api ay itinatala — sino, ano, kailan, at saan — sa lahat ng modules, nang walang per-controller na wiring. Sa ibabaw ng ledger na ito ay may batch layer: ang isang import o bulk action ay maaaring i-tag bilang batch at mamaya ay **maibalik (undo)** row-by-row, sa istilong Planning Center. Pareho itong nabubuhay sa iisang `auditLogs` table sa membership database at hinihimok mismo mula sa iisang choke point, ang `BaseController.actionWrapper`. Ipinapakita ng pahinang ito kung ano ang ina-audit, kung saan nakatira ang data, ang mga performance trade-off na humuhubog dito, at kung paano ligtas na binabaligtad ng undo ang isang batch nang walang cross-database transaction.

</div>

## Pangkalahatang-ideya

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

May dalawang structural na katotohanan na humuhubog sa lahat ng nasa ibaba:

1. **Ang controller layer lang ang nakakaalam sa actor.** Hindi kailanman nakikita ng mga repository ang `AuthenticatedUser`; ang mga controller lang ang may hawak ng `au`. Dumadaan na sa `BaseController.actionWrapper` ang mga controller ng bawat module, kaya doon isinasabit ang auditing — walang pagbabagong kinakailangan sa signature ng anumang repo.
2. **Iisang table ang naglilingkod sa lahat ng modules.** Ang mga audit row para sa giving, attendance, content, atbp. ay lahat isinusulat sa `auditLogs` ng membership DB sa pamamagitan ng `RepoManager.getRepos("membership")`, kahit mula sa isang controller na hindi sa membership. Nananatiling iisang query lang ang "Lahat ng binago ni Jane ngayon."

## Ano ang ina-audit

Default-on ang auditing para sa **bawat mutating verb sa bawat route**. Nakukuha ng `actionWrapper` ang mga audit field mula sa request nang walang per-route na config:

| Larangan | Pinagkunan |
|-------|--------------|
| `module` | `this.moduleName` (ang nagmamay-ari na module) |
| `entityType` | ang singularized na huling segment ng `req.baseUrl` (hal. `/membership/people` → `person`) |
| `category` | default sa `entityType` |
| `action` | `${entityType}_saved` para sa `POST /`, `${entityType}_deleted` para sa `DELETE /:id`, kung hindi ay `${entityType}_${method}:${routePath}` para awtomatikong makuha ang mga non-CRUD na sub-route (hal. `task_post:/:id/move`) |

**Para lang sa overrides at opt-out** ang `BaseController.AUDIT_REGISTRY` — hindi ito allowlist. Lumalabas dito ang isang route para palitan ang category/entityType nito, para ideklara ang `{ dbModule, table }` (na siyang gumagawa nitong batch- at undo-capable), para markahan itong `sensitive` (i-audit ang anonymous mutations), o para i-off ito gamit ang `optOut: true`.

**Opt-out list** (mga firehose write path na kung hindi ay lulunod sa ledger): attendance `visits` / `visitsessions` / `sessions` / `checkin` (ang Sunday check-in storm) at messaging `messages` / `connections` / `devices` (chat at presence). Nag-log ang lahat ng iba pa.

**Ang mga bulk endpoint** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) ay nakarehistro sa `BULK_ROUTES` at naglalabas ng **isang audit row bawat naapektuhang id**, kaya ang isang 10k-katao na import ay gumagawa ng 10,000 row — ang per-entity na granularity na ito mismo ang dahilan kung bakit maaaring i-undo ang batch.

**Ang mga anonymous mutation** (`actionWrapperAnon` — guest giving, guest registration, form submission) ay ina-audit lang para sa mga route na naka-flag na `sensitive` sa registry, isinusulat gamit ang `userId="anonymous"` kasama ang IP ng client. Nangunguna rito ang mga donasyon; may tunay na regression history ang path na iyon.

### Pag-redact ng lihim (secret) at mga size cap

Bago i-store ang anumang `details` payload, pinapatakbo ng `AuditLogHelper.capDetails()` ang `sanitizeValue()` dito:

- **Nire-redact ang mga secret key.** Anumang larangan na nasa `SENSITIVE_KEYS` ang lowercased na pangalan (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) ay pinapalitan ng `"[redacted]"`.
- **Tinatanggal ang malalaking scalar.** Anumang `data:` URI o string na mahigit 4 KB (base64 na litrato, blobs) ay nagiging `"[stripped]"`.
- **Naka-cap ang sobrang laking row.** Kung lumampas ang serialized JSON sa ~64 KB, pinapalitan ang buong payload ng `{ truncated: true }`. Nananatiling matitingnan ang mga truncated na row — pero **hindi na ito ma-u-undo** (walang before/after image na maibabalik).

## Kung saan nakatira ang data

Isang iisang `auditLogs` table sa **membership** database ang sumusuporta sa bawat module. Mga column: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Idinaragdag ng migration na `tools/migrations/membership/2026-07-04_audit_universal.ts` ang `module` + `batchId`, pinapalawak ang `details` mula sa `TEXT` patungong `MEDIUMTEXT`, nagdaragdag ng mga index na `ix_auditLogs_batch (batchId)` at `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, at gumagawa ng `batches` table. Umiiral ang `module` column mismo para manatiling na-filter ang mga banggaan ng `entityType` sa iba't ibang module (may `note`, `setting` sa marami sa kanila), at ang entity index ang siyang nagpapagana kapwa sa per-entity history at sa undo conflict guard.

Dumadaan sa `RepoManager.getRepos("membership")` mula sa loob ng wrapper ang mga cross-module na sulat. Sinasadya ang pagkakasunod-sunod: **una nagko-commit ang pangunahing sulat sa module DB, pangalawa ang audit insert.** Sa normal mode, nilulunok ang kabiguan ng audit-insert (`console.error`, kinukuha ito ni Sentry) — advisory lang ang audit at hindi dapat kailanman ito ang dahilan ng pagkabigo ng kahilingan ng user. Sa **batch mode, mahigpit ito** (tingnan sa ibaba).

:::info Bakit hindi triggers, CDC, o per-module tables?
- Hindi alam ng **mga MySQL trigger** kung sino ang acting user (walang `au` ang koneksyon), at magiging pagpapanatili ng mga trigger set sa lahat ng schema.
- Isang buong infrastructure project na may parehong problema sa pagkakakilanlan ng actor ang **binlog / CDC**.
- Ang **pag-thread ng userId sa bawat repo** ay makakaapekto sa daan-daang file para ilipat ang impormasyong nasa controller layer na.
- Ang **per-module na audit table** ay nangangahulugan ng 7× na plumbing at fan-out na query para sa anumang tanong na cross-module. Ang iisang table sa controller choke point ang least-code na disenyo na nagkukuha pa rin ng actor.
:::

## Paninindigan sa performance

Sinadyang murang-mura ang hot path; babayaran lang ang gastos kung saan may kapalit ito.

- **Walang read-before-write sa normal na update.** Hindi **nag-lo-load** ang regular na save ng lumang record. Ang **isinumiteng after-values** ang naka-imbak sa `details.after`; muling binubuo ng UI ang old→new sa oras ng *view* sa pamamagitan ng pag-diff laban sa nakaraang audit row ng entity. Isang query sa oras ng view, zero gastos sa oras ng write. Ang mga field na hindi pa nagalaw mula nang mailunsad ay basta magpapakita lang ng walang "lumang" halaga — katanggap-tanggap.
- **May before-image ang mga delete.** Nagla-load muna nang pangkalahatan ang `DELETE /:id` sa isang registry route na may `{ dbModule, table }` at itinatago ito sa `details.before`. Bihira ang mga delete at ang before-image mismo ang buong forensic na halaga.
- **Ang batch mode lang ang sistematikong read-before-write**, at opt-in ito — mahal na nga ang isang bulk/import operation, kaya ang N na snapshot read ang presyo ng undo.
- **Inaasahan (awaited) ang mga audit insert.** Kinokolekta ng `actionWrapper` ang mga log promise at `await Promise.allSettled(...)` bago bumalik. Ito ang pinakamahalagang invariant: sa Lambda, **kaagad na nagfi-freeze ang container** sa sandaling bumalik ang response, kaya tahimik na natatapon ang un-awaited na insert. Ibig sabihin ng "fire and forget" dito ay hindi kailanman dapat mabigo ang kahilingan dahil sa error, hindi ibig sabihing "huwag mag-await" — ang isang insert sa already-warm na membership pool ay ~1–3 ms lang.

## Mga batch at undo

Pinagsasama-sama ng isang **batch** ang isang set ng mutations para masuri at maibalik ang mga ito nang sama-sama. May dalawang paraan para magbukas nito:

- **Malinaw (explicit):** Nagbabalik ng `batchId` ang `POST /membership/batches { label, source }`. Ipinapadala pagkatapos ng client (B1Transfer, isang import UI ng B1Admin) ang `X-Batch-Id: <id>` sa bawat kasunod na save/delete. Sinasara ito ng `POST /membership/batches/:id/complete` at itinitimbre ang `itemCount`.
- **Di-tuwiran (implicit):** Binubuksan, pinupunan, at tinatapos ng apat na bulk endpoint ang sarili nilang batch sa loob ng iisang kahilingan, na ibinabalik ang `batchId` sa tugon.

Ang `batches` table (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Mahigpit ang batch mode

Kapag naroroon ang `X-Batch-Id`, pinapahigpit ng `actionWrapper` ang bawat guard (`writeBatchAuditRows`):

1. Dapat umiral ang batch, bukas ito, at kabilang sa `au.churchId` — kung hindi, **403**.
2. Dapat batch-capable ang route (`{ dbModule, table }` sa registry) — kung hindi, **400**.
3. Bago tumakbo ang aksyon, naka-load ang mga before-image para sa lahat ng apektadong id sa **isang** query na `WHERE id IN (...) AND churchId = ?`. Kung mabigo ang snapshot read na iyon, **mabibigo nang 500 ang kahilingan at hindi isasagawa ang aksyon** — hindi dapat kailanman tahimik na gumawa ng un-undoable na ledger ang batch mode. (Ang normal mode, sa kabaligtaran, ay best-effort at nilulunok ang mga kabiguan sa snapshot.)
4. Kapag matagumpay ang aksyon, isinusulat ang isang audit row bawat entity kasama ang `batchId`, `details.before`, at `details.after`, dagdag pa ang tahasang **create marker** para sa mga row na ginawa ng batch.

### Pagbabalik (Undo)

`POST /membership/batches/:id/undo` (pahintulot: batch creator o `Permissions.server.admin`). Tumatanggi ito kung hindi `completed` ang batch o kung mas matanda ito sa **30-araw na undo window**. Pagkatapos, ang `BatchUndoHelper.undo()`:

1. Nagla-load ng mga audit row ng batch at **pinagsasama-sama ang mga ito ayon sa `(module, entityType, entityId)`.** Ang isang entity na nagalaw nang ilang beses sa loob ng isang batch ay maibabalik **nang minsan lang**, pabalik sa tunay na pre-batch na estado nito — ang pinakaunang before-image, o isang delete kung ang batch ang gumawa nito. Ito ang dahilan kung bakit hindi basta-basta i-replay ng undo ang bawat row: mali ang pag-restore sa isang intermediate na snapshot sa gitna ng batch.
2. Para sa bawat entity, pinapatakbo muna ang **conflict guard**: tinatanong ng `auditLog.hasLaterModification()` kung may umiiral na *mas huling* audit entry para sa parehong `(module, entityType, entityId)` sa labas ng batch na ito. Kung gayon, na-edit ang entity pagkatapos ng import — ito ay **nila-skip at iniuulat**, hindi kailanman nabu-bura. Muling ginagamit nito ang audit log mismo bilang modification detector; hindi kailangan ng anumang `modifiedAt` na column sa anumang table.
3. Binabaliktad ayon sa naitalang op, na nire-resolve ang `{ dbModule, table }` mula sa registry gamit ang generic na Kysely write:
   - **create** → hard-delete ang row.
   - **update** → isulat pabalik ang `details.before`.
   - **delete** → muling i-insert ang `details.before` (update-or-insert kung muling lumitaw ang isang row na may id na iyon).
4. Ina-audit din ang bawat pagbabalik (`action: "<entityType>_undone"`, walang `batchId` — wala sa saklaw ang undo-of-undo).

Pinipili ang op mula sa tahasang **create marker**, hindi ito hinuhulaan mula sa nawawalang before-image — hindi dapat ikamali ang isang legitimong walang-lamang before-image o isang truncated na row bilang create.

Ang result payload ay `{ restored, skippedConflicts: [...], failed: [...], status }`; lumilipat ang batch sa `undone` (malinis) o `partial`. **Walang cross-DB transaction** — best-effort per row ang undo, kaparehong limitasyon na idinodokumento ng Planning Center para sa mga pinagsamang profile.

:::warning Kailangan ng `onUndo` hook ang mga entity na may side effect
Dapat ding isulat ng pagbabalik ng paggawa ng `groupMember` ang `groupMemberHistory` ("left"), kung hindi ay tahimik na masisira ang churn analytics — isang nakatayong invariant sa workspace. Nagpaparehistro ang mga ganitong entity ng `onUndo` callback sa `AUDIT_REGISTRY` na nagbabalik ng `true` kapag ganap na nito nahawakan ang pagbabalik, na lumalampas sa generic na landas. Ang `groupMembers` ang canonical na halimbawa (naka-key sa row id sa explicit na landas pero sa `personId` naman sa bulk endpoints, at history-tracked sa bawat add/remove).
:::

## Mga consumer surface

Parehong **isinasagawa pa** ang dalawang admin surface; ito ang layunin:

| Surface | Repo | Layunin |
|---------|------|---------|
| **Audit Log page** | B1Admin (ManageChurch → Audit Log) | I-filter ayon sa module/category/user/entity at i-render ang old→new na diffs — para sa edits sa pamamagitan ng pag-diff laban sa nakaraang entry ng entity, para sa deletes mula sa `details.before`. Sinusuportahan ng `GET /membership/auditlogs`, gated ng `Permissions.server.admin`. |
| **Batches page** | B1Admin (parehong Settings hub) | Ilista ang mga batch kasama ang status at bilang, **View Results** (ang mga audit row ng batch sa pamamagitan ng `GET /membership/batches/:id/results`), at isang **Undo** button na nagpapalabas ng ulat ng skipped-conflict / failed. |
| **Import batches** | B1Transfer | Buksan ang batch, ipadala ang `X-Batch-Id` sa mga normal na save call nito, tapusin sa dulo — nagiging undoable ang mga import nang walang bagong import endpoint. Nananatili ang legacy na `importKey` bilang creates-only na lineage marker, napalitan na para sa undo. |

## Mga gotcha na hindi dapat balikan (regress) ng susunod na pagbabago

- **Dapat manatiling awaited ang mga audit insert.** Itinatapon ng Lambda freeze ang un-awaited na `AuditLogHelper.log(...)`. Kolektahin ang mga promise at `await Promise.allSettled` bago bumalik.
- **Tinatanggal ng Kysely ang `undefined` mula sa `.set()`/`.values()`.** Sa pag-restore, hindi magagalaw ang isang na-clear na column. Kino-convert ng `BatchUndoHelper` ang bawat nawawalang field sa tahasang `null` (`nullify`) — huwag ito kailanman i-bypass para lang sa "mas mabilis" na direktang sulat.
- **Dapat manatiling mataas nang malayo ang retention kaysa sa undo window.** Tumatakbo ang `AuditLogRepo.deleteOld()` sa nightly timer (365-araw na default retention); 30 araw ang undo window. Kung bumaba man ang retention papalapit sa window, mabubura ang mga undo ledger mula sa ilalim ng mga bukas na batch.
- **Hindi ma-u-undo ang mga truncated na row.** Walang before/after image ang isang `{ truncated: true }` na payload; iniuulat ito ng undo bilang `failed`, hindi kailanman ito hinuhulaan.
- **Module-write-then-audit ang pagkakasunod-sunod.** Huwag kailanman ilipat ang audit insert nang mauna sa tunay na sulat, at panatilihin itong strict sa batch / advisory sa normal.

## Talaan ng file

| Lugar | Mga file |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Undo engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Mga controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Mga model / repo | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrasyon | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (isinasagawa pa) | mga pahina ng B1Admin Audit Log + Batches; header ng import-batch ng B1Transfer |

## Kaugnay na mga Pahina

- [Module Structure](../api/module-structure) — kung paano naaabot ng isang controller na hindi sa membership ang mga repo ng membership sa pamamagitan ng `RepoManager`
- [Giving](./giving) — ang mga write path ng donasyon na ina-audit bilang `sensitive` kahit anonymous
- [Membership Endpoints](../api/endpoints/membership) — ang REST surface na may dalang `X-Batch-Id` at naglalantad ng `/auditlogs` at `/batches`
