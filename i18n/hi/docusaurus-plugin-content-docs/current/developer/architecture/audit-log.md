---
title: "Audit Log & Undoable Batches"
---

# Audit Log & Undoable Batches

<div class="article-intro">

Every user-initiated mutation in the Api is recorded — who, what, when, and from where — across all modules, without any per-controller wiring. On top of that ledger sits a batch layer: an import or bulk action can be tagged as a batch and later **undone** row-by-row, Planning-Center-style. Both live in a single `auditLogs` table in the membership database and are driven entirely from one choke point, `BaseController.actionWrapper`. This page maps what gets audited, where the data lives, the performance trade-offs that shape it, and how undo reverses a batch safely without cross-database transactions.

</div>

## Overview

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

Two structural facts drive everything below:

1. **The controller layer is the only place that knows the actor.** Repositories never see `AuthenticatedUser`; only controllers hold `au`. Every module's controllers already pass through `BaseController.actionWrapper`, so that is where auditing hooks in — no repo signatures change anywhere.
2. **One table serves all modules.** Audit rows for giving, attendance, content, etc. are all written into the membership DB's `auditLogs` via `RepoManager.getRepos("membership")`, even from a non-membership controller. "Everything Jane changed today" stays a single query.

## What gets audited

Auditing is **default-on for every mutating verb on every route**. `actionWrapper` derives the audit fields from the request with zero per-route config:

| Field | Derived from |
|-------|--------------|
| `module` | `this.moduleName` (the owning module) |
| `entityType` | singularized last segment of `req.baseUrl` (e.g. `/membership/people` → `person`) |
| `category` | defaults to `entityType` |
| `action` | `${entityType}_saved` for `POST /`, `${entityType}_deleted` for `DELETE /:id`, else `${entityType}_${method}:${routePath}` so non-CRUD sub-routes (e.g. `task_post:/:id/move`) are captured automatically |

`BaseController.AUDIT_REGISTRY` is **only for overrides and opt-outs** — it is not an allowlist. A route appears there to rename its category/entityType, to declare `{ dbModule, table }` (which makes it batch- and undo-capable), to mark it `sensitive` (audit anonymous mutations), or to switch it off with `optOut: true`.

**Opt-out list** (firehose write paths that would drown the ledger): attendance `visits` / `visitsessions` / `sessions` / `checkin` (the Sunday check-in storm) and messaging `messages` / `connections` / `devices` (chat and presence). Everything else logs.

**Bulk endpoints** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) are registered in `BULK_ROUTES` and emit **one audit row per touched id**, so a 10k-person import produces 10k rows — that per-entity granularity is exactly what makes the batch undoable.

**Anonymous mutations** (`actionWrapperAnon` — guest giving, guest registration, form submissions) are audited only for registry-flagged `sensitive` routes, written with `userId="anonymous"` plus the client IP. Donations lead the list; that path has a real regression history.

### Secret redaction and size caps

Before any `details` payload is stored, `AuditLogHelper.capDetails()` runs `sanitizeValue()` over it:

- **Secret keys are redacted.** Any field whose lowercased name is in `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) is replaced with `"[redacted]"`.
- **Huge scalars are stripped.** Any `data:` URI or string over 4 KB (base64 photos, blobs) becomes `"[stripped]"`.
- **Oversized rows are capped.** If the serialized JSON exceeds ~64 KB the whole payload is replaced with `{ truncated: true }`. Truncated rows are still viewable — but **not undoable** (there is no before/after image to restore from).

## Where the data lives

A single `auditLogs` table in the **membership** database backs every module. Columns: `id, churchId, userId, category, action, entityType, entityId, details (MEDIUMTEXT JSON string), ipAddress, module, batchId, created`. The migration `tools/migrations/membership/2026-07-04_audit_universal.ts` adds `module` + `batchId`, widens `details` from `TEXT` to `MEDIUMTEXT`, adds indexes `ix_auditLogs_batch (batchId)` and `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, and creates the `batches` table. The `module` column exists precisely so `entityType` collisions across modules (`note`, `setting` exist in several) stay filterable, and the entity index is what powers both per-entity history and the undo conflict guard.

Cross-module writes go through `RepoManager.getRepos("membership")` from inside the wrapper. Ordering is deliberate: **the main write commits in the module DB first, the audit insert second.** In normal mode an audit-insert failure is swallowed (`console.error`, Sentry picks it up) — audit is advisory and must never fail a user's request. In **batch mode it is strict** (see below).

:::info Why not triggers, CDC, or per-module tables?
- **MySQL triggers** don't know the acting user (the connection has no `au`), and would mean maintaining trigger sets across every schema.
- **binlog / CDC** is a whole infrastructure project with the same actor-identity problem.
- **Threading `userId` through every repo** would touch hundreds of files to move information the controller layer already has.
- **Per-module audit tables** would mean 7× the plumbing and fan-out queries for any cross-module question. One table at the controller choke point is the least-code design that still captures the actor.
:::

## Performance stance

The hot path is deliberately cheap; the cost is paid only where it buys something.

- **No read-before-write on normal updates.** A regular save does **not** load the old record. The **submitted after-values** are stored in `details.after`; the UI reconstructs old→new at *view* time by diffing against the entity's previous audit row. One query at view time, zero cost at write time. Fields never touched since launch simply show no "old" value — acceptable.
- **Deletes get a before-image.** `DELETE /:id` on a registry route with `{ dbModule, table }` loads the row generically first and stores it in `details.before`. Deletes are rare and the before-image is the entire forensic value.
- **Batch mode is the only systematic read-before-write**, and it is opt-in — a bulk/import operation is already expensive, so N snapshot reads are the price of undo.
- **Audit inserts are awaited.** `actionWrapper` collects the log promises and `await Promise.allSettled(...)` before returning. This is the single most important invariant: on Lambda the container **freezes the instant the response returns**, so an un-awaited insert is silently dropped. "Fire and forget" here means *errors never fail the request*, not *don't await* — a single insert on the already-warm membership pool is ~1–3 ms.

## Batches and undo

A **batch** groups a set of mutations so they can be reviewed and reversed together. There are two ways to open one:

- **Explicit:** `POST /membership/batches { label, source }` returns a `batchId`. The client (B1Transfer, a B1Admin import UI) then sends `X-Batch-Id: <id>` on every subsequent save/delete. `POST /membership/batches/:id/complete` closes it and stamps `itemCount`.
- **Implicit:** the four bulk endpoints open, populate, and complete their own batch inside the single request, returning the `batchId` in the response.

The `batches` table (membership DB): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Batch mode is strict

When `X-Batch-Id` is present, `actionWrapper` tightens every guard (`writeBatchAuditRows`):

1. The batch must exist, be `open`, and belong to `au.churchId` — otherwise **403**.
2. The route must be batch-capable (`{ dbModule, table }` in the registry) — otherwise **400**.
3. Before the action runs, before-images for all affected ids are loaded in **one** `WHERE id IN (...) AND churchId = ?` query. If that snapshot read fails, the request **fails 500 and the action does not execute** — batch mode must never produce an un-undoable ledger silently. (Normal mode, by contrast, is best-effort and swallows snapshot failures.)
4. After the action succeeds, one audit row per entity is written with `batchId`, `details.before`, and `details.after`, plus an explicit **create marker** for rows the batch created.

### Undo

`POST /membership/batches/:id/undo` (permission: batch creator or `Permissions.server.admin`). It refuses if the batch is not `completed` or is older than the **30-day undo window**. `BatchUndoHelper.undo()` then:

1. Loads the batch's audit rows and **groups them by `(module, entityType, entityId)`.** An entity touched several times inside one batch is reversed **once**, back to its true pre-batch state — the earliest before-image, or a delete if the batch created it. This is why undo does not naively replay each row: restoring an intermediate mid-batch snapshot would be wrong.
2. For each entity, runs the **conflict guard first**: `auditLog.hasLaterModification()` asks whether any *later* audit entry exists for that same `(module, entityType, entityId)` outside this batch. If so, the entity was edited after the import — it is **skipped and reported**, never clobbered. This reuses the audit log itself as the modification detector; no `modifiedAt` columns are needed on any table.
3. Reverses per the recorded op, resolving `{ dbModule, table }` from the registry and using generic Kysely writes:
   - **created** → hard-delete the row.
   - **updated** → write `details.before` back.
   - **deleted** → re-insert `details.before` (update-or-insert if a row with that id resurfaced).
4. Each reversal is itself audited (`action: "<entityType>_undone"`, no `batchId` — undo-of-undo is out of scope).

The op is chosen from the explicit **create marker**, not inferred from a missing before-image — a legitimately empty before-image or a truncated row must not be mistaken for a create.

The result payload is `{ restored, skippedConflicts: [...], failed: [...], status }`; the batch moves to `undone` (clean) or `partial`. **There is no cross-DB transaction** — undo is best-effort per row, the same limitation Planning Center documents for merged profiles.

:::warning Side-effect entities need an `onUndo` hook
Reversing a `groupMember` create must also write `groupMemberHistory` ("left"), or churn analytics silently break — a standing workspace invariant. Such entities register an `onUndo` callback in `AUDIT_REGISTRY` that returns `true` when it has fully handled the reversal, bypassing the generic path. `groupMembers` is the canonical case (keyed by row id on the explicit path but by `personId` on bulk endpoints, and history-tracked on every add/remove).
:::

## Consumer surfaces

Both admin surfaces are **in progress**; the intent:

| Surface | Repo | Purpose |
|---------|------|---------|
| **Audit Log page** | B1Admin (ManageChurch → Audit Log) | Filter by module/category/user/entity and render old→new diffs — for edits by diffing against the entity's previous entry, for deletes from `details.before`. Backed by `GET /membership/auditlogs`, gated by `Permissions.server.admin`. |
| **Batches page** | B1Admin (same Settings hub) | List batches with status and counts, **View Results** (the batch's audit rows via `GET /membership/batches/:id/results`), and an **Undo** button that surfaces the skipped-conflict / failed report. |
| **Import batches** | B1Transfer | Open a batch, send `X-Batch-Id` on its normal save calls, complete at the end — imports become undoable with no new import endpoints. The legacy `importKey` stays as a creates-only lineage marker, superseded for undo. |

## Gotchas a future change must not regress

- **Audit inserts must stay awaited.** Un-awaited `AuditLogHelper.log(...)` is dropped by the Lambda freeze. Collect promises and `await Promise.allSettled` before returning.
- **Kysely drops `undefined` from `.set()`/`.values()`.** On restore, a cleared column would survive untouched. `BatchUndoHelper` converts every absent field to explicit `null` (`nullify`) — never bypass it for a "faster" direct write.
- **Retention must stay well above the undo window.** `AuditLogRepo.deleteOld()` runs on the nightly timer (default 365-day retention); the undo window is 30 days. If retention ever drops toward the window, undo ledgers get purged out from under open batches.
- **Truncated rows are not undoable.** A `{ truncated: true }` payload has no before/after image; undo reports it as `failed`, never guesses.
- **Ordering is module-write-then-audit.** Never move the audit insert ahead of the real write, and keep it strict-in-batch / advisory-in-normal.

## File inventory

| Area | Files |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + write-rows) |
| Undo engine | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Audit helper | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controllers | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Models / repos | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Admin UI (in progress) | B1Admin Audit Log + Batches pages; B1Transfer import-batch header |

## Related Pages

- [Module Structure](../api/module-structure) — how a non-membership controller reaches the membership repos through `RepoManager`
- [Giving](./giving) — the donation write paths that are audited as `sensitive` even when anonymous
- [Membership Endpoints](../api/endpoints/membership) — the REST surface that carries `X-Batch-Id` and exposes `/auditlogs` and `/batches`
