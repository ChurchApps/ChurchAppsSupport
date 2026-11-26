---
title: "Commons Endpoints"
description: "Look up every Commons API route behind WorshipCommons: browse songs and assets, submit work for review, file reports, and moderate the queue."
---

# Commons Endpoints

<div class="article-intro">

The Commons module is the backend for [WorshipCommons](https://worshipcommons.org), a shared library of songs and other worship assets. It serves the public catalog, each user's saved library and writer page, the submission and review flow, reports about published content, and the moderation tools.

</div>

**Base path:** `/commons`

## Authentication and Access

Commons works differently from the other modules in three ways.

**The library is not scoped to a church.** Everyone sees the same catalog. Records belong to the user who published or submitted them (the user `id` in the token), not to the token's `churchId`, so any valid ChurchApps token identifies the caller. Commons ids are 11-character strings, not UUIDs.

**Anonymous access is decided per route.** In the tables on this page:

- **Public** means no token is needed. Where a description says a token is optional, sending one adds data for that caller.
- **JWT** means a signed-in user is required. A missing or invalid token gets a `401`.

**Moderation is not a church permission.** The Permission column uses these values:

| Permission | Who passes |
|------------|------------|
| — | Anyone on a Public route, any signed-in user on a JWT route |
| Asset publisher | The asset's primary publisher or one of its co-publishers. Anyone else gets `404` |
| Submitter or reviewer | The user who created the submission, or a reviewer. Anyone else gets `404` |
| Reviewer | A server admin or a music editor. Anyone else gets `401` |
| Server.Admin | A server admin only. A music editor gets `403` with `{ errors: ["Server admin required"] }`, anyone else `401` |

- **Server admin** is the `Server.Admin` permission (see [Authentication & Permissions](./authentication.md#server-admin)), held by the people who run the server: ChurchApps staff on the hosted API. It is not a church's own admin role, and there is no Commons permission a church can grant. The check reads the permission list inside the JWT, so the token must be a church-scoped one that carries `Server.Admin`, as the token B1Admin uses does. The WorshipCommons site signs users in at user level, and that token carries no church permissions. With it a server admin is treated as an ordinary user, with two exceptions that look the permission up in membership instead: `GET /commons/admin/status` reports `admin: true`, and `POST /commons/songs/:id/abc` and `POST /commons/submissions/:id/submit` apply the reviewer exemption for songs closed to community edits.
- **Music editor** is a user whose id or email is listed in the server's `COMMONS_MUSIC_EDITORS` setting. Music editors can work the review queue and record the listen gate, but an approval that changes rights needs a server admin: the first publish of a new asset, a change to `license`, `licenseVersion`, `detail.recordingOwned`, `detail.proAnswer`, or `detail.masterLicense`, or an added demo, stems, master, or accompaniment recording.
- **Reviewer** is either of the two.

Validation errors come back as `{ errors: ["message"] }` with plain strings. Many not-found and not-allowed responses are an empty object with the status code.

## Songs

Base path: `/commons/songs`

Song-shaped views over the asset tables, used by the WorshipCommons site and by song search in B1Admin. `GET /library`, the two `/:id/library` routes, `POST /:id/abc`, and `POST /` are shims over the newer [Assets](#assets) and [Submissions](#submissions) routes, kept for clients that predate them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/?sundayReady=&confidence=&language=&q=` | Public | — | List published songs, most popular first. `sundayReady=true` keeps only Sunday-ready songs and overrides `confidence` (an exact confidence tier); `language` is an exact language name such as `English`; `q` is a case-insensitive match on title, first line, or writer. Rows are compact: empty fields are left out, and files appear as flags (`hasScore`, `hasSlides`, `hasChords`, `hasCover`, `hasMidi`, `hasDemo`, `hasStems`) and a `packageDir` rather than URLs |
| GET | `/similar?title=&writer=&firstLine=` | Public | — | Duplicate check before submitting: up to 5 published songs whose title or first sung line matches, as `[{ id, title, writer }]`. A matching `writer` only ranks a hit higher. Returns `[]` when `title` and `firstLine` are both blank |
| GET | `/mine` | JWT | — | Songs the caller publishes (as primary or co-publisher) in any status, newest first, each with `status` and `fileUrls` |
| GET | `/library` | JWT | — | The caller's saved songs (published only), most recently saved first. Song-shaped view of `GET /commons/assets/saved` |
| GET | `/:id` | Public | — | A published song: its fields and ChordPro text, `fileUrls` (file role to public URL), rights (`rights`, `rightsMatrix`, `ccliReport`, `attribution`), `form`, `publishedKeys`, `contributors`, and the listen-gate fields. 404 when the song is missing or not published |
| GET | `/:id/page` | Public | — | Everything the song page needs in one call: `{ song, history, family, similar }`. `song` is the `GET /:id` payload, `history` the approved-submission timeline, `family` the parent, sibling, and child songs linked by `parentSongId`, and `similar` up to 6 songs in the same language, each with a one-sentence `reason`. 404 when not published |
| GET | `/:id/chordpro` | Public | — | Download a published song as a ChordPro text file (a `.cho` attachment named after the title). Counts as a download, at most one per IP address per day. 404 when not published |
| GET | `/:id/lyrics` | Public | — | Download a published song's lyrics without chords as a `.txt` attachment. Counts as a download the same way. 404 when not published |
| POST | `/` | JWT | — | One-call song submission (shim). Body: `{ title, chordPro, certified, writer, year, songKey, bpm, timeSignature, themes, language, scripture, license, proAnswer, recordingOwned, files }`, where `files` may hold `demoAudio`, `sheetPdf`, and `stemsZip`, each as `{ name, contentType, base64 }`. `language` defaults to `English` and `license` to `WC`. Creates a draft submission, stores the files, and submits it for review; if that fails the draft is discarded. Returns `{ id, submissionId, title, status: "pending" }`. 400 when `title`, `chordPro`, or `certified` is missing or validation fails; 409 and 429 as for `POST /commons/submissions/:id/submit` |
| POST | `/:id/library` | JWT | — | Save a published song to the caller's library (shim for `PUT /commons/assets/:id/saved`). Returns `{ inLibrary: true }`. 404 when the id is not a published song |
| POST | `/:id/abc` | JWT | — | Propose an ABC transcription of a published song's tune. Body: `{ abc }` (text, required, at most 100,000 characters; 400 otherwise). Creates an `additionalFile` submission carrying `tune.abc` and submits it, returning `{ id, status: "pending" }` with the submission id. 403 when the song's license keeps all changes with its writer and the caller is neither one of its publishers nor a reviewer; 404 when the id is not a published song; 409 and 429 as for `POST /commons/submissions/:id/submit` |
| DELETE | `/:id/library` | JWT | — | Remove a song from the caller's library. Returns `{ inLibrary: false }`. 404 when the id is not a published song |

## Assets

Base path: `/commons/assets`

An asset is the public record of one library item of any type; a song is an asset with extra song fields. An asset's `status` is `pending` (never published), `published`, `unpublished`, or `removed`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/?assetType=&tags=&language=&license=&featured=&q=&sort=&page=&pageSize=` | Public | — | Search published assets. `tags` is comma-separated and every tag must match; `q` matches the name or description; `featured=true` keeps featured assets; `sort` is `downloads`, `saves`, or `featured` (default: newest published first); `pageSize` defaults to 50 (maximum 200). Returns `{ assets, total, page, pageSize }`. Each asset carries `publisherName`, `files` (each with a `role`), and `fileUrls` (file role to public URL) |
| GET | `/saved` | JWT | — | The caller's saved assets (published only), most recently saved first, in the same shape as the search results |
| GET | `/mine` | JWT | — | Assets the caller publishes (as primary or co-publisher) in any status, newest first, each with `hasPendingSubmission` |
| GET | `/:id` | Public | — | Get one asset with `version` (the number of approved submissions), `hasPendingSubmission`, and, for a song, the song fields in `detail`. A token is optional: with one the response adds `mySaved`, and the asset's publishers and Server.Admin can also read it while it is `pending` or `unpublished` (everyone else gets 404). A `removed` asset returns 410 with `{ removedReason }` |
| GET | `/:id/history` | Public | — | The asset's approved-submission timeline, oldest first: `[{ submissionId, submittedBy, submittedByName, submittedAt, approvedAt, note, filesChanged, fieldsChanged }]`. 404 when the asset does not exist or is still `pending` |
| GET | `/:id/editable` | JWT | — | The snapshot to start an edit from, in the shape of a submission `payload`: `{ name, description, tags, language, license, detail }`. 404 for a `pending` or `removed` asset; an `unpublished` asset is returned only to its publishers and reviewers |
| POST | `/:id/download` | Public | — | Count a download (at most one per IP address per day) and return `{ url, downloadCount }`, where `url` is the public URL of the asset's `content` file. An asset with no `content` file returns only `{ downloadCount }`. 404 when not published |
| POST | `/:id/files/:name/download` | Public | — | Count a download the same way and return `{ url, downloadCount }` for one live file. `:name` is the stored file name (URL-encode any slashes) or just its base name. 404 when the asset is not published or has no such file |
| POST | `/:id/unpublish` | JWT | Asset publisher | Hide the caller's own asset: `published` becomes `unpublished`, with files and history kept. Returns `{ status: "unpublished" }`. 404 when the asset is missing or the caller is not one of its publishers; 400 when it is not `published` |
| POST | `/:id/republish` | JWT | Asset publisher | Put the caller's own asset back: `unpublished` becomes `published`. Returns `{ status: "published" }`. 404 and 400 as for unpublish |
| PUT | `/:id/saved` | JWT | — | Save or unsave a published asset for the caller. Body: `{ saved }` (boolean). Returns `{ saved }`. 404 when not published |

## Authors

Base path: `/commons/authors`

An author is a writer's public page. A user can edit the one linked to their account.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/mine` | JWT | — | The author page linked to the caller: `{ id, name, bio, portraitUrl, links, supportLinks }`. Returns `{}` when the caller has none |
| GET | `/:id` | Public | — | An author page plus `songs`, the author's published songs as `[{ id, title, year, language, license }]`. 404 when the author does not exist |
| PUT | `/mine` | JWT | — | Replace the caller's `bio` and `links`. Body: `{ bio, links, supportLinks }`; `bio` is at most 2,000 characters, and `links` and `supportLinks` are lists of up to 5 `{ label, url }` entries with `http` or `https` URLs. Leave `supportLinks` out to keep the stored ones. Returns the saved page. 400 on a validation error; 404 when no author page is linked to the caller |

## Submissions

Base path: `/commons/submissions`

A submission is one proposal against one asset: a new asset, or a change to a published one made by its publisher or by anyone else. Its `type` is `new`, `translation`, `arrangement`, `correction`, `additionalFile`, `recording`, or `removal`, taken from `payload.type` or inferred. The lifecycle the code implements:

1. **Draft.** `POST /` creates the submission as `draft`. For a new asset it also creates the asset as `pending`, with the caller as publisher. `PUT /:id` edits the draft.
2. **Upload files.** Each file needs the conventional name for its role in the asset type, such as `demoAudio.mp3` or `tune.abc`. Call `POST /:id/postUrl` with the name. When the server uses S3 storage, the answer is a presigned form post: send its `fields` and the file to its `url`, then record the file with `POST /:id/files` (`name`, `sizeBytes`, `contentHash`). When the server stores files on disk, the answer points at `POST /:id/upload/:name` with `authRequired: true`: send the same multipart form there with the bearer token, and the API stores and records the file in one step. A file of up to 1 MB can skip both and go inline as `base64` in `POST /:id/files`. Uploads stay private until approval.
3. **Submit.** `POST /:id/submit` validates the payload and files against the asset type and moves the submission to `pending`. Only one submission per asset can be pending, a user can have 5 pending at once, and a user can send 20 submissions that create a new asset (`new`, `translation`, `arrangement`) in total unless the server sets a different limit for that user.
4. **Review.** A reviewer approves, requests changes, or rejects (see [Admin (Moderation)](#admin-moderation)). Approve sets `approved`, makes the proposed fields and files live, and publishes the asset; an approved `removal` unpublishes it instead, and an edit to an unpublished asset leaves it unpublished. Request changes returns the submission to `draft` with the reviewer's note in `reviewNote`, files kept, to be edited and submitted again. Reject sets `rejected` and deletes the proposed files, along with the asset if it was never published.
5. **Withdraw.** `POST /:id/withdraw` takes a pending submission back to `draft`, and `DELETE /:id` discards a draft. The status `withdrawn` is set only by the system, on the open submissions of an asset that is taken down.

The submitter is emailed when a submission is received, approved, sent back for changes, or rejected. A nightly job deletes drafts created more than 14 days ago.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/mine?status=` | JWT | — | The caller's submissions, newest first, optionally filtered by `status`. Each row adds the asset's `assetType`, `assetName`, and `assetStatus`, plus `isNewAsset` and `isThirdParty` (the caller is not one of the asset's publishers) |
| GET | `/licenses` | JWT | — | License ids granted to the caller on top of the asset type's standard list, as an array of strings (`[]` when the caller has no grants) |
| GET | `/:id` | JWT | Submitter or reviewer | Get a submission in any status, with `submittedByName`, the asset's `assetType`, `assetName`, and `assetStatus`, `isNewAsset`, `isThirdParty`, `files` (the proposed files, each with a signed `url` valid for 2 hours unless it proposes a removal), and `live` (the current asset with its `files`, `fileUrls`, and editable `payload`). 404 when it does not exist or belongs to someone else |
| GET | `/:id/preview?token=` | Public | — | The same payload as `GET /:id`, for the product preview embedded in the review screen, which sends no session. Requires the signed `token` from the `previewUrl` returned by `GET /commons/admin/submissions/:id` (valid for 2 hours); 404 without a valid one |
| POST | `/` | JWT | — | Start a draft. Body: `{ assetType, payload, note }` for a new asset, or `{ assetId, payload, note }` to propose a change to an existing one. `payload` is `{ name, description, tags, language, license, type, detail }`, where `detail` holds the asset type's own fields. Returns `{ submissionId, assetId, status: "draft" }`. 400 when neither an `assetId` nor a known `assetType` is sent; 404 when the asset is missing or removed |
| PUT | `/:id` | JWT | Submitter or reviewer | Update a draft. Body: `{ payload, note }`; a `payload` that is sent replaces the stored one whole. Returns 204. 400 when the submission is not a `draft` |
| POST | `/:id/postUrl` | JWT | Submitter or reviewer | Get upload instructions for one file of a draft. Body: `{ name, contentType }`; `name` must be a file name the asset type accepts (400 otherwise). Returns `{ url, fields, method: "POST" }`: with S3 storage a presigned form post that expires in 1 hour and is capped at that file's size limit, with disk storage the `upload/:name` URL and `authRequired: true`. 400 when the submission is not a `draft` |
| POST | `/:id/upload/:name` | JWT | Submitter or reviewer | Upload one file of a draft through the API: multipart form data with a single `file` field, up to 50 MB (413 above that). Stores the file as pending and records it, returning the file record. 400 when `file` is missing or empty, `:name` is not accepted for the asset type, or the submission is not a `draft` |
| POST | `/:id/files` | JWT | Submitter or reviewer | Record a proposed file on a draft. Body: `{ name, sizeBytes, contentHash }` after a presigned upload, `{ name, action: "remove" }` to propose removing a live file, or `{ name, contentType, base64 }` to upload inline (1 MB limit). The stored `action` is `replace` when a live file of that name exists, otherwise `add`. Returns the file record `{ id, assetId, submissionId, name, action, sizeBytes, contentHash, uploadedBy }`. 400 for a name the asset type does not accept, a removal of a file that is not live, or a submission that is not a `draft` |
| POST | `/:id/submit` | JWT | Submitter or reviewer | Send a draft for review: `draft` becomes `pending`. Returns `{ status: "pending" }`. 400 with every validation problem listed in `errors` (required fields, license, attestations, file rules, a recorded file that was never uploaded); 409 when an identical file is already published under another asset, or another submission for the same asset is pending; 429 when the submitter already has 5 pending submissions or has reached the new-asset limit |
| POST | `/:id/withdraw` | JWT | Submitter or reviewer | Take a pending submission back to `draft` so it can be edited or deleted. Returns `{ status: "draft" }`. 400 when it is not `pending` |
| DELETE | `/:id/files/:name` | JWT | Submitter or reviewer | Drop a proposed file from a draft, both the record and the pending upload. Returns 204. 400 when the submission is not a `draft` |
| DELETE | `/:id` | JWT | Submitter or reviewer | Delete a draft and its proposed files. If the asset was never published and has no other open submission, the asset is deleted too. Returns 204. 400 when the submission is not a `draft` |

## Reports

Base path: `/commons/reports`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | Public | — | File a report about library content. A token is optional. Body: `{ contentText, details, reason, assetId, name, email, signature, reporterRole }`. `contentText` (what is being reported) and `details` are required; `reason` is `copyright` (the default), `ai`, `policy`, `quality`, or `other`; a copyright report also needs `name`, `email`, `signature`, and `reporterRole`. A signed-in caller who sends `reporterRole: "writer"` files a writer request instead: only `assetId` and `details` are required, and `reason` is `copyright` unless `other` is sent. Returns `{ id }` and emails a confirmation to the report's address. 400 when a required field is missing; 429 after 3 reports in an hour from one IP address or one email (not enforced when the API runs in its `dev` environment) |

Server admins list, claim, and resolve reports through the admin routes below.

## Admin (Moderation)

Base path: `/commons/admin`

The moderation API behind the Commons tab of B1Admin's Server Admin page. Rows are grouped the way that screen is: the review queue, reports, assets, then maintenance. See [Authentication and Access](#authentication-and-access) for what Reviewer and Server.Admin mean and why a few routes here are Public.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/status` | Public | — | Tells a client which moderation tools to show without provoking a 401. Returns `{ admin: false, musicEditor: false }` to anonymous callers and ordinary users, and `{ admin, musicEditor, pendingCount }` to a server admin or music editor |
| GET | `/types` | Public | — | The asset type registry: `[{ key, label, product, productLabel, hasPreview }]` |
| GET | `/submissions?status=&product=&assetType=&page=` | JWT | Reviewer | The review queue across every asset type: submissions in `status` (default `pending`), highest triage score first and then oldest, 100 per page. Filter by `product` or `assetType`. Rows leave out `payload` and add `typeLabel`, `productLabel`, `submittedByName`, `publisherName`, `submitterStats` (`{ total, approved }`), `isNewAsset`, `isThirdParty`, `filesChanged`, `qualityDetail`, `rightsFlag`, `possibleDuplicate`, and, for songs, a `song` summary |
| GET | `/submissions/:id` | JWT | Reviewer | Review detail for one submission: the submission with its proposed `files` (signed URLs), the `live` asset (`files`, `fileUrls`, `payload`, `contributors`), `diff` (`{ fields, files }` against the live version), `qualityDetail`, `submitterStats`, the asset type's `detailFields` and `attestations`, and a `previewUrl` when the type has a product preview. 404 when the submission or its asset is missing |
| POST | `/submissions/:id/approve` | JWT | Reviewer | Approve a pending submission and publish it. Optional body: `{ note, declineFiles }`, where `declineFiles` is `[{ name, reason }]` naming proposed files to leave out. Returns `{ status: "approved", assetId, declined }`. 400 when the submission is not `pending`, the asset was removed, or `declineFiles` is invalid; 403 when a music editor approves a rights change |
| POST | `/submissions/:id/request-changes` | JWT | Reviewer | Send a pending submission back to `draft` with a note for the submitter. Body: `{ note }` (required; the first 500 characters are kept). Nothing is published or discarded. Returns `{ status: "draft" }`. 400 without a note; 404 for an unknown submission; 409 when it is not `pending` |
| POST | `/submissions/:id/reject` | JWT | Reviewer | Reject a pending submission. Body: `{ reason, note }`, both required; `reason` is `quality`, `duplicate`, `licensing`, `ccli`, `ai`, `offtopic`, `incomplete`, or `other`. Deletes the proposed files and, when nothing was ever published, the asset. Returns `{ status: "rejected" }`. 400 when a field is missing or the submission is not `pending` |
| GET | `/pending-files/:submissionId/:name?exp=&sig=` | Public | — | Serve one pending upload to review players and image tags, which send no token. Works only with the `exp` and `sig` values of a signed file `url` (issued when the server stores files on disk, valid for 2 hours) and while the submission is `draft` or `pending`; otherwise 404 |
| GET | `/reports?status=&reason=` | JWT | Server.Admin | List reports, oldest first, optionally filtered by `status` (`open`, `reviewing`, `resolved`) and `reason`. Each row adds the linked asset's `assetName` and `assetStatus` |
| POST | `/reports/:id/claim` | JWT | Server.Admin | Claim an open report: `open` becomes `reviewing`, with the caller as `reviewedBy`. Returns `{ status: "reviewing" }`. 400 when the report is not `open` |
| POST | `/reports/:id/resolve` | JWT | Server.Admin | Resolve a report. Body: `{ resolution, action, note }`; `resolution` is `upheld`, `dismissed`, or `duplicate`, and `action` is `none` (the default), `unpublish`, or `remove`, applied to the linked asset. Emails the reporter, and the asset's publishers when the asset is taken down. Returns `{ status: "resolved" }`. 400 for an unknown value, a report already resolved, or an action on a report with no linked asset |
| GET | `/assets?q=&status=&assetType=&page=` | JWT | Server.Admin | Browse assets in any status, most recently modified first, 100 per page. `q` matches part of the name or an exact asset id. Each row adds `publishers` (`[{ id, name }]`), `publisherName`, and `typeLabel` |
| POST | `/assets/:id/publishers` | JWT | Server.Admin | Replace an asset's publishers. Body: `{ userIds }`, a list of up to 20 user ids; the first becomes the primary publisher and the rest co-publishers. Returns `{ publishers: [{ id, name }] }`. 400 for a malformed list |
| POST | `/assets/:id/unpublish` | JWT | Server.Admin | Hide a published asset: `published` becomes `unpublished` with the reason `policy`, files and history kept. Returns `{ status: "unpublished" }`. 400 when it is not `published` |
| POST | `/assets/:id/republish` | JWT | Server.Admin | Put an unpublished asset back: `unpublished` becomes `published`. Returns `{ status: "published" }`. 400 when it is not `unpublished` |
| POST | `/assets/:id/remove` | JWT | Server.Admin | Take an asset down for good. Body: `{ reason }`, `copyright` or `policy`. Deletes its files, marks its open submissions `withdrawn`, and sets the status to `removed`; the id is kept so `GET /commons/assets/:id` answers 410 with the reason. Returns `{ status: "removed" }`. 400 for any other reason or an asset already removed |
| POST | `/assets/:id/feature` | JWT | Server.Admin | Toggle the asset's `featured` flag. Returns `{ featured }` with the new value |
| POST | `/songs/:id/listen` | JWT | Reviewer | Record the listen gate for a song. Body: `{ keys }`, a list of up to 12 key names such as `G`, `Bb`, or `F#m`. The song becomes `sunday-ready` when the keys cover every published key and the song serves a score, chords, and slides; an empty list clears the record and restores the computed tier. Returns the song detail. 400 for an invalid list; 404 when the song is missing or removed |
| POST | `/sync-audio` | JWT | Server.Admin | Maintenance, no body. For each published song that already has a registered audio output, lists the song's `output/audio` folder in storage and registers any `.zip` or `.m4a` file there that has no file record yet. Returns `{ scanned, added }` |
| POST | `/sync-output` | JWT | Server.Admin | Maintenance, for the content pipeline's publish job after it uploads a song's generated files. Body: `{ ids }`, 1 to 20 song ids (400 otherwise). For each song it registers the generated files found in the package's `output/` folder, drops the records of generated files that are gone, and fills `scoreSource`, `confidence`, `singTimeSeconds`, and a blank `bpm` or `songKey` from them. Returns a map of song id to `{ added, removed }`, or `null` for a song with no package to read. The first time a song's generated files are registered, the submitter gets the approval email that approve held back |
| POST | `/score-missing` | JWT | Server.Admin | Maintenance, no body. Runs the LLM quality scorer on up to 8 songs that have no quality score, or only a completeness-heuristic one, and stores the result as the reviewer-only triage score. Returns `{ scored, remaining }`; `remaining` is 1 while more songs are waiting, so repeat the call until it is 0. 503 when the server has no LLM API key configured |

The three maintenance routes repair or backfill data and are not part of normal moderation. Only a server admin can run them, and a music editor gets `403`. Nothing in the API calls `sync-audio` or `score-missing` on a schedule; both are safe to repeat. `sync-output` also runs without a call: a timer applies the same sync every 30 minutes to published songs approved in the last 7 days.

## Related Pages

- [Content Commons](../../architecture/commons.md) — The asset data model, the submission lifecycle, and where moderation lives
- [Endpoint Reference](./index.md) — Base URL, request conventions, and the module index
- [Authentication & Permissions](./authentication.md) — Login flow, JWT, and the permission model
- [WorshipCommons Overview](../../../worship-commons/index.md) — What the library looks like to churches and writers
