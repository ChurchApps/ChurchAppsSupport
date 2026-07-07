---
title: "Audit Log at Undoable Batches"
---

# Audit Log at Undoable Batches

<div class="article-intro">

Bawat user-initiated mutation sa Api ay nire-record — sino, ano, kailan, at saan — sa lahat ng modules, nang walang per-controller na wiring. Sa kabuuang ledger ay nakaupo ang batch layer: isang import o bulk action ay maaaring i-tag bilang batch at mamaya na bawiin row-by-row, Planning-Center-style. Pareho ay nabubuhay sa isang iisang `auditLogs` table sa membership database at lubos na hinihimok mula sa iisang choke point, `BaseController.actionWrapper`. Ang pahinang ito ay nagsasaad kung ano ang ina-audit, kung saan nabubuhay ang data, ang performance trade-offs na bumubuo dito, at kung paano ang undo ay nag-reverse ng batch nang ligtas nang walang cross-database transactions.

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

Dalawang structural na mga katotohanan ay hinihimok ang lahat ng nasa ibaba:

1. **Ang controller layer ay ang tanging lugar na nakakaalam ng actor.** Ang mga Repositories ay hindi kailanman nakakita ng `AuthenticatedUser`; tanging ang mga controller lamang ang nagtataglay ng `au`. Ang controller ng bawat module ay dumaan na sa `BaseController.actionWrapper`, kaya doon ang pag-hook ng auditing — walang pagbabago ng repo signatures kahit saan.
2. **Isang table ang nagsisilbi sa lahat ng modules.** Ang mga audit row para sa giving, attendance, content, atbp. ay lahat ay nasusulat sa membership DB's `auditLogs` sa pamamagitan ng `RepoManager.getRepos("membership")`, kahit mula sa non-membership controller. Ang "Lahat ng binago ni Jane ngayon" ay nanatiling isang query.

## Ano ang ina-audit

Ang auditing ay default-on para sa bawat mutating verb sa bawat route. Ang `actionWrapper` ay nakakakuha ng audit fields mula sa request na may zero per-route config:

| Larangan | Galing sa |
|-------|--------------|
| `module` | `this.moduleName` (ang owning module) |
| `entityType` | singularized na huling segment ng `req.baseUrl` (e.g. `/membership/people` → `person`) |
| `category` | default sa `entityType` |
| `action` | `${entityType}_saved` para sa `POST /`, `${entityType}_deleted` para sa `DELETE /:id`, kung hindi ay `${entityType}_${method}:${routePath}` kaya ang non-CRUD na sub-routes (e.g. `task_post:/:id/move`) ay kumukuha awtomatiko |

Ang `BaseController.AUDIT_REGISTRY` ay lamang para sa overrides at opt-outs — ito ay hindi isang allowlist. Isang route ay lumalitaw doon upang pangalinin ang category/entityType nito, upang ipahayag ang `{ dbModule, table }` (na ginagawang batch- at undo-capable ito), upang markahan itong `sensitive` (i-audit ang anonymous mutations), o upang i-off ito na may `optOut: true`.

**Opt-out list** (firehose write paths na lulunugin ang ledger): attendance `visits` / `visitsessions` / `sessions` / `checkin` (ang Sunday check-in storm) at messaging `messages` / `connections` / `devices` (chat at presence). Lahat ng iba ay nag-log.

**Bulk endpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) ay naka-register sa `BULK_ROUTES` at naglalabas ng **isang audit row bawat touched id**, kaya ang 10k-person import ay gumagawa ng 10k rows — ang per-entity granularity na ito ay eksakto kung ano ang gumagawa ng batch na undoable.

**Anonymous mutations** (`actionWrapperAnon` — guest giving, guest registration, form submissions) ay ina-audit lamang para sa registry-flagged na `sensitive` routes, na isinulat na may `userId="anonymous"` kasama ang client IP. Ang mga donasyon ay nangunguna sa lista; ang path na iyon ay may tunay na regression history.

### Ang redaction ng Secret at mga size caps

Bago ang anumang `details` payload ay ina-store, ang `AuditLogHelper.capDetails()` ay tumatakbo ng `sanitizeValue()` sa loob nito:

- **Ang mga secret key ay nire-redact.** Anumang larangan na ang lowercased name nito ay nasa `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) ay pinalitan ng `"[redacted]"`.
- **Ang malalaking scalars ay nabubura.** Anumang `data:` URI o string na higit sa 4 KB (base64 photos, blobs) ay nagiging `"[stripped]"`.
- **Ang mga oversized rows ay naka-cap.** Kung ang serialized JSON ay lumalampas ~64 KB ang buong payload ay pinalitan ng `{ truncated: true }`. Ang mga truncated rows ay maaaring pa ring tingnan — ngunit **hindi undoable** (walang before/after image upang ibalik mula).

## Kung saan nabubuhay ang data

Isang `auditLogs` table sa **membership** database ay sumusuporta sa bawat module. Mga haligi: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. Ang migration `tools/migrations/membership/2026-07-04_audit_universal.ts` ay nagdadagdag ng `module` + `batchId`, pinalalalaki ang `details` mula sa `TEXT` hanggang `MEDIUMTEXT`, nagdadagdag ng mga indexes `ix_auditLogs_batch (batchId)` at `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, at lumilikha ng `batches` table. Ang `module` column ay umiiral eksaktong upang ang `entityType` collisions sa lahat ng modules (`note`, `setting` ay umiiral sa marami) ay manatiling filterable, at ang entity index ay kung ano ang nagbibigay kapangyarihan sa parehong per-entity history at ang undo conflict guard.

Ang mga cross-module writes ay pumupunta sa `RepoManager.getRepos("membership")` mula sa loob ng wrapper. Ang pagkakasunod-sunod ay sinandig: **ang pangunahing write ay nag-commit sa module DB muna, ang audit insert pangalawa.** Sa normal mode ang audit-insert failure ay nilunok (`console.error`, ang Sentry ay pumupukaw dito) — ang audit ay advisory at dapat na hindi kailanman mabigo ang kahilingan ng user. Sa **batch mode ito ay mahigpit** (tingnan sa ibaba).

:::info Bakit hindi ang triggers, CDC, o per-module tables?
- Ang **MySQL triggers** ay hindi alam ang acting user (ang connection ay walang `au`), at magiging kahulugan ng pag-maintain ng trigger sets sa buong schema.
- Ang **binlog / CDC** ay isang buong infrastructure project na may parehong actor-identity problem.
- Ang **Threading ng userId sa buong repo** ay abot sa daan-daang file upang ilipat ang impormasyon na ang controller layer ay mayroon na.
- Ang **Per-module audit tables** ay magiging kahulugan ng 7× ang plumbing at fan-out queries para sa anumang cross-module question. Isang table sa controller choke point ay ang least-code design na nag-capture pa rin ng actor.
:::

## Performance stance

Ang mainit na daan ay sinandig na murang-mura; ang gastos ay binabayaran lamang kung saan ito bumibili ng something.

- **Walang read-before-write sa normal updates.** Isang regular save ay **hindi** nag-load ng lumang record. Ang **naisumiteng after-values** ay naka-imbak sa `details.after`; ang UI ay muling binubuo ang old→new sa *view* time sa pamamagit ng pag-diff laban sa nakaraang audit row ng entity. Isang query sa view time, zero cost sa write time. Ang mga larangan na hindi pinindot mula sa launch ay simpleng magpapakita ng walang "lumang" halaga — katanggap-tanggap.
- **Ang mga delete ay nakakakuha ng before-image.** `DELETE /:id` sa isang registry route na may `{ dbModule, table }` ay nag-load ng row nang pangkalahatang muna at nagsisiguro ito sa `details.before`. Ang mga delete ay bihira at ang before-image ay ang buong forensic value.
- **Ang batch mode ay ang tanging systematic read-before-write**, at ito ay opt-in — isang bulk/import operation ay mahal na, kaya ang N snapshot reads ay ang presyo ng undo.
- **Ang mga audit inserts ay inaasahan.** Ang `actionWrapper` ay nagsasangkot ng mga log promises at `await Promise.allSettled(...)` bago magbalik. Ito ay ang tunay na pinakamahalagang invariant: sa Lambda ang container ay **nangingig ang instant ng pagbabalik ng response**, kaya isang un-awaited insert ay tahimik na tinapon. Ang "Fire and forget" dito ay nangangahulugang ang mga error ay hindi kailanman mabigo ang kahilingan, hindi don't await — isang insert sa already-warm membership pool ay ~1–3 ms.

## Ang Batches at undo

Isang **batch** ay nagsasama ng isang hanay ng mutations upang sila ay maaaring suriin at bawiin nang magkasama. May dalawang paraan upang buksan ito:

- **Malinaw:** `POST /membership/batches { label, source }` ay nagbabalik ng `batchId`. Ang client (B1Transfer, isang B1Admin import UI) ay pagkatapos ay nagpadala ng `X-Batch-Id: <id>` sa bawat susunod na save/delete. `POST /membership/batches/:id/complete` ay tinatara ito at timbre ang `itemCount`.
- **Implicit:** ang apat na bulk endpoints ay bukas, popuin, at tapusin ang kanilang sariling batch sa loob ng iisang kahilingan, nagbabalik ng `batchId` sa tugon.

Ang `batches` table (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Ang batch mode ay mahigpit

Kapag `X-Batch-Id` ay naroroon, ang `actionWrapper` ay pinipigilan ang bawat guard (`writeBatchAuditRows`):

1. Ang batch ay dapat na umiiral, ay bukas, at kabilang sa `au.churchId` — kung hindi ay **403**.
2. Ang route ay dapat na batch-capable (`{ dbModule, table }` sa registry) — kung hindi ay **400**.
3. Bago patakbuhin ang aksyon, ang before-images para sa lahat ng affected ids ay naka-load sa **isa** `WHERE id IN (...) AND churchId = ?` query. Kung ang snapshot read na iyon ay nabigo, ang kahilingan ay **nabigo ng 500 at ang aksyon ay hindi nagsasagawa** — ang batch mode ay dapat na hindi kailanman gumawa ng un-undoable ledger tahimik. (Ang normal mode, sa halip, ay best-effort at nilunok ang snapshot failures.)
4. Pagkatapos ang aksyon ay tagumpay, isang audit row bawat entity ay isinulat na may `batchId`, `details.before`, at `details.after`, kasama ang malinaw na **create marker** para sa mga row na gawa ng batch.

### Bawiin

`POST /membership/batches/:id/undo` (permission: batch creator o `Permissions.server.admin`). Itinanggi nito kung ang batch ay hindi `completed` o ay mas luma kaysa sa **30-day undo window**. Ang `BatchUndoHelper.undo()` ay pagkatapos:

1. Nag-load ng batch's audit rows at **nagsama-sama sila ayon sa `(module, entityType, entityId)`.** Isang entity na tumutulong ng maraming beses sa loob ng isang batch ay bawiin **nang minsan**, bumalik sa tunay na pre-batch state nito — ang pinakamaagang before-image, o isang delete kung ang batch ay gumawa nito. Ito ang dahilan kung bakit ang undo ay hindi naively replay ang bawat row: ang pag-restore ng isang intermediate mid-batch snapshot ay magiging mali.
2. Para sa bawat entity, patakbuhin ang **conflict guard muna**: `auditLog.hasLaterModification()` ay nagtanong kung ang anumang later audit entry ay umiiral para sa parehong `(module, entityType, entityId)` sa labas ng batch na ito. Kung ganoon, ang entity ay nae-edit pagkatapos ng import — ito ay **naka-skip at nir-report**, hindi kailanman na-clobbered. Ito ay muling gumagamit ng audit log mismo bilang ang modification detector; walang kailangang `modifiedAt` columns sa anumang table.
3. Bawiin ayon sa naka-record na op, na nilulutas ang `{ dbModule, table }` mula sa registry at gamit ang generic Kysely writes:
   - **likha** → hard-delete ang row.
   - **na-update** → isulat ang `details.before` pabalik.
   - **tinanggal** → muling i-insert ang `details.before` (update-or-insert kung isang row na may id na iyon ay muling lumitaw).
4. Bawat pagbabawi ay ito mismo ay ina-audit (`action: "<entityType>_undone"`, walang `batchId` — ang undo-of-undo ay out of scope).

Ang op ay pinili mula sa malinaw na **create marker**, hindi inferred mula sa missing before-image — isang legitimately empty before-image o isang truncated row ay dapat na hindi ma-mistaken para sa isang create.

Ang result payload ay `{ restored, skippedConflicts: [...], failed: [...], status }`; ang batch ay lilipat sa `undone` (clean) o `partial`. **Walang cross-DB transaction** — ang undo ay best-effort bawat row, ang parehong limitasyon na idine-document ng Planning Center para sa merged profiles.

:::warning Ang side-effect entities ay kailangan ng `onUndo` hook
Ang pag-reverse ng `groupMember` create ay dapat ding isulat ang `groupMemberHistory` ("left"), o ang churn analytics ay tahimik na masira — isang standing workspace invariant. Ang ganitong entities ay nag-register ng `onUndo` callback sa `AUDIT_REGISTRY` na nagbabalik ng `true` kapag ito ay ganap na nakonsumo ang pagbabawi, na lumalampas sa generic path. Ang `groupMembers` ay ang canonical case (naka-key sa row id sa malinaw na daan ngunit ng personId sa bulk endpoints, at history-tracked sa bawat add/remove).
:::

## Ang consumer surfaces

Ang parehong admin surfaces ay **nagpapatuloy**; ang layunin:

| Ibabaw | Repo | Layunin |
|---------|------|---------|
| **Audit Log page** | B1Admin (ManageChurch → Audit Log) | I-filter ayon sa module/category/user/entity at i-render ang old→new diffs — para sa edits sa pamamagit ng pag-diff laban sa nakaraang entry ng entity, para sa deletes mula sa `details.before`. Sinusuportahan ng `GET /membership/auditlogs`, gated ng `Permissions.server.admin`. |
| **Batches page** | B1Admin (parehong Settings hub) | I-list ang mga batches na may status at counts, **View Results** (ang batch's audit rows sa pamamagit ng `GET /membership/batches/:id/results`), at isang **Undo** button na nagdadala ng skipped-conflict / failed report. |
| **Import batches** | B1Transfer | Buksan ang batch, magpadala ng `X-Batch-Id` sa normal save calls nito, tapusin sa dulo — ang mga imports ay nagiging undoable na walang bagong import endpoints. Ang legacy `importKey` ay nanatili bilang creates-only lineage marker, na-supersede para sa undo. |

## Ang mga gotchas na ang hinaharap na pagbabago ay hindi dapat mag-regress

- **Ang mga audit inserts ay dapat na manatiling inaasahan.** Ang un-awaited `AuditLogHelper.log(...)` ay itinapon ng Lambda freeze. Kolektahin ang mga promises at `await Promise.allSettled` bago magbalik.
- **Ang Kysely ay bumabagal undefined mula sa `.set()`/`.values()`** Sa pag-restore, isang cleared column ay makakaligtas na walang putol. Ang `BatchUndoHelper` ay nag-convert ng bawat absent field sa explicit `null` (`nullify`) — huwag kailanman i-bypass ito para sa "mas mabilis" na direct write.
- **Ang retention ay dapat na manatiling mataas na higit sa undo window.** Ang `AuditLogRepo.deleteOld()` ay tumatakbo sa nightly timer (default 365-day retention); ang undo window ay 30 days. Kung ang retention ay bumababa patungo sa window, ang undo ledgers ay matutukso palabas mula sa ilalim ng bukas na mga batches.
- **Ang mga truncated rows ay hindi undoable.** Isang `{ truncated: true }` payload ay walang before/after image; ang undo ay nag-report nito bilang nabigo, hindi kailanman hula.
- **Ang ordering ay module-write-then-audit.** Huwag kailanman ilipat ang audit insert nangunguna sa tunay na write, at panatilihin ito strict-in-batch / advisory-in-normal.

## Inventory ng file

| Lugar | Mga file |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Engine ng undo | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Helper ng audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Mga controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Mga modelo / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrasyon | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (patuloy) | B1Admin Audit Log + Batches pages; B1Transfer import-batch header |

## Mga Kaugnay na Pahina

- [Module Structure](../api/module-structure) — paano ang non-membership controller ay umaabot sa membership repos sa pamamagit ng `RepoManager`
- [Giving](./giving) — ang donation write paths na ina-audit bilang `sensitive` kahit kelan anonymous
- [Membership Endpoints](../api/endpoints/membership) — ang REST surface na may dalang `X-Batch-Id` at nag-expose ng `/auditlogs` at `/batches`
