---
title: "Commons de Conteúdo"
---

# Content Commons — Shared Asset Library & Moderation

User-submitted content shared across products (WorshipCommons songs, Lessons.church lessons, FreeShow templates, B1 website templates) goes through one moderation queue rather than a per-product review flow. This page covers the submission/approval lifecycle, the shared asset data model, and where moderation lives.

## The asset spine

Two tables carry every commons item, regardless of product:

- **`assets`** — the public identity row. `status`: `pending` | `published` | `unpublished` | `removed`. Type-specific data (song details, authors) lives in satellite tables joined by `assetId`.
- **`assetFiles`** — every file attached to an asset (audio, images, documents), replacing the older `path` + comma-separated `files` columns on individual content tables.
- **`submissions`** — the moderation unit. Lifecycle: `draft → pending → approved | rejected | withdrawn`. A submission can be a brand-new asset or an edit to an existing published one (by the original author or a third party).

Approving a submission runs a product-specific **publish hook** (`Api/src/modules/commons/helpers/publishHooks/`, e.g. `song.ts`) that expands the submission into the product's own records.

## Submission flow

`CommonsSubmissionController` (`Api/src/modules/commons/`) is the end-user-facing API: create a draft, presign and attach files, submit for review, or withdraw. Its actual clients are external producer sites (the WorshipCommons site, Lessons.church, FreeShow, the B1 website template gallery) — not B1Admin.

## Moderation queue

The queue lives in **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), gated by the `Permissions.server.admin` permission — the same one that gates Churches/Impersonate/Jobs on that page. This is a ChurchApps-staff-only internal tool, not something individual churches see.

Three sub-tabs:

- **Queue** — every pending submission across all products, filterable by product/asset type. Each row shows a new-asset vs. edit-by-author vs. edit-by-third-party badge, the submitter's approval track record, a field/file diff summary, and age (flagged past 72h). **Review** opens a drawer with field-level diffs, file previews, and an embedded read-only product preview; Approve/Reject support keyboard shortcuts (j/k to navigate, a/r to act).
- **Reports** — copyright and policy/quality reports on published assets, split into two queues plus resolved history. A staff member claims a report, then resolves it with a resolution (upheld/dismissed/duplicate) and an action (none/unpublish/remove).
- **Assets** — a searchable browser of published content with per-asset actions: feature, unpublish/republish, or remove (reason: copyright/policy).

Every endpoint under `/commons/admin/*` (`CommonsAdminController.ts`) independently re-checks the server-admin permission.

:::info
This design intentionally has a single queue: WorshipCommons' own `/admin` moderation UI was retired in favor of routing every product's submissions through B1Admin's Server Admin tools.
:::

## Spans

Api (commons module), B1Admin (Server Admin), and the external producer sites: WorshipCommons, Lessons.church, FreeShow, B1 website builder templates.
