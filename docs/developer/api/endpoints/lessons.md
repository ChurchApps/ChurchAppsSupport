---
title: "Lessons API Endpoints"
description: "Endpoint reference for the Lessons API behind Lessons.church: programs, studies, lessons, venue feeds, playlists, files, classrooms, and schedules."
---

# Lessons API Endpoints

<div class="article-intro">

The Lessons API (LessonsApi) is the backend for [Lessons.church](https://lessons.church). It holds the curriculum library (programs, studies, lessons, and their venues), the files and videos attached to it, and each church's classrooms and schedules. It is a separate service from the main ChurchApps API: it has its own base URL and its own database, and its routes carry no module prefix (`/programs`, not `/lessons/programs`).

</div>

## Base URL

| Environment | URL |
|-------------|-----|
| Local development | `http://localhost:8090` |
| Production | `https://api.lessons.church` |

Paths on this page are appended straight to the base URL, for example `https://api.lessons.church/programs/public`. There is no hosted demo or staging instance of this service.

The main API does not serve these routes. The one bridge is its [MCP server](../mcp.md): an `api_call` whose path starts with `/lessons/` is forwarded to this service with that prefix removed (`/lessons/programs/public` reaches `/programs/public`), using a 15-minute JWT signed for the calling user.

## Authentication and Permissions

The service accepts the same JWT the main API issues. It verifies the `Authorization: Bearer` token with the shared JWT secret and reads the user, church, group IDs, and permissions straight from the token. It has no login endpoint of its own, so sign in through the main API (see [Authentication & Permissions](./authentication.md)) and send that token here. API keys (`cak_...`) are not accepted directly; use the MCP bridge above for those.

The **Auth** column means:

- **Public** — the handler runs anonymously. No token is needed.
- **JWT** — send the JWT as a bearer token. The handler reads the caller from the token and scopes its work to the token's church.

Two permissions are checked. Both are plain string matches against the token's permission list; there is no domain-admin shortcut, so the token must carry the permission itself.

| Permission | Stored as (API / content type / action) | Used for |
|------------|------------------------------------------|----------|
| `Lessons.Edit` | `LessonsApi` / `Lessons` / `Edit` | Curriculum authoring: programs, studies, lessons, venues, sections, roles, actions, bundles, resources, files, videos, add-ons, year plans, providers |
| `Schedules.Edit` | `LessonsApi` / `Schedules` / `Edit` | A church's own classrooms, schedules, customizations, and external providers. Shown in the role editor as **Edit Schedules** in the **Lessons** group |

A failed permission check returns `401` with an empty object. This service does not use `403`.

## Request Conventions

- **Content-Type:** request and response bodies are `application/json`
- **Church scoping:** authenticated routes take the church from the token. `public` routes that need a church take it in the path (`/classrooms/public/church/:churchId`)
- **Batch saves:** every `POST` that saves a resource takes an **array**. Items without an `id` are created and get an 11-character generated ID; items with an `id` are updated. Updates only touch rows that belong to the caller's church
- **Images:** the `image` field on programs, studies, lessons, and add-ons accepts a `data:image/...` URL on save. The server stores the image (as a `.png` file) and replaces the field with its URL
- **Errors:** unhandled errors and unknown routes return `{ error: { message, status, timestamp, path } }`. A handler that reads a required query parameter (such as `ids`) without finding it fails this way with a `500`

## Content Hierarchy

Curriculum is nested. A **provider** (the publishing organization, owned by a church) has **programs**; a program has **studies**; a study has **lessons**. A lesson has **venues**, named variations of the lesson that each hold their own content. A venue is divided into **sections**, a section into named **roles**, and a role into ordered **actions**. An action has an `actionType` (the code gives special handling to `Say`, `Do`, `Play`, `Download`, and `Add-on`) and can point at a resource, an asset, an external video, or an add-on. This nesting is why most routes are keyed by the parent's ID: `/studies/program/:programId`, `/lessons/study/:studyId`, `/venues/lesson/:lessonId`, `/sections/venue/:venueId`, `/roles/section/:sectionId`, `/actions/role/:roleId`.

Media hangs off the same tree. A **bundle** is attached to a content item such as a program, study, or lesson (`contentType` plus `contentId`) and is zipped into a single download. A bundle contains **resources**; a resource has **variants** (alternative renditions of the whole resource, such as the `WEBM` copy generated for players) and **assets** (ordered individual files within it), each pointing at a **file** record. **External videos** are videos hosted by an outside video provider (the code integrates with Vimeo), and **add-ons** are a shared catalog of extra items that an action can reference.

On the consuming side, a church has **classrooms**; each classroom has dated **schedules** that point at a venue, or at a lesson from an **external provider** (a third-party catalog URL the church has registered). **Customizations** let a church hide or reorder a venue's sections, roles, and actions without touching the publisher's content. **Year plans** are a publisher's ordered list of weeks, each pointing at a lesson.

## What "public" Means

Routes with `public` in the path run anonymously and skip the church filter. Whether they also filter on a published flag depends on the level:

- **Programs, studies, lessons, and year plans** have a `live` flag, and their `public` routes return only rows where `live` is true (the one exception is noted on `GET /lessons/public/tree`). Routes that start from the full program list (the program list itself, the library and catalog trees, and the search export) also require the program's provider to be live.
- **Venues, sections, roles, actions, add-ons, external videos, providers, classrooms, schedules, and customizations** are not filtered on a published flag. Their `public` routes return rows by ID or parent ID as they are. The feed and playlist routes are the exception: they check that the parent lesson (and, for feeds, the study) is live, as noted on each row.

The sections below start with the routes apps read anonymously (programs down to actions, then add-ons, year plans, providers, and search), continue with the authoring resources (bundles, resources, files, videos, downloads), then the church-side resources (classrooms, schedules, customizations, external providers), and end with internal and maintenance routes.

## Programs

Base path: `/programs`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public` | Public | — | List live programs whose provider is also live, ordered by `sort` |
| GET | `/public/:id` | Public | — | Get a live program by ID |
| GET | `/public/slug/:slug` | Public | — | Get a live program by slug. Returns `{}` when no live program has that slug |
| GET | `/public/tree` | Public | — | The whole live library as a tree for players: `{ treeLabels: ["Program", "Study", "Lesson", "Playlist"], playlists }`. Each node is `{ id, name, description, image, children }`; the venue nodes at the bottom carry `apiUrl` (`/venues/playlistNew/:venueId`) instead of children |
| GET | `/` | JWT | Lessons.Edit | List the church's programs, live or not |
| GET | `/:id` | JWT | — | Get one of the church's programs by ID |
| GET | `/provider/:providerId` | JWT | Lessons.Edit | List the church's programs for one provider |
| POST | `/` | JWT | Lessons.Edit | Create or update programs (batch). Each item: `{ id?, name, slug, image, shortDescription, description, videoEmbedUrl, live, aboutSection, age, sort }`. A new program is attached to the church's provider automatically; a `providerId` in the body is ignored. 404 if an existing `id` sent with a new image is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a program. 404 if it is not the church's; 400 with `{ errors }` while it still has studies or files. Returns `{ id }` |

### Example: List Public Programs

```
GET https://api.lessons.church/programs/public
```

```json
[
  {
    "id": "aBcD3fGh1jK",
    "churchId": "L8fupS4MSOo",
    "providerId": "CMCkovCA00e",
    "name": "Example Program",
    "slug": "example-program",
    "image": "https://content.example.org/programs/aBcD3fGh1jK.png?dt=1700000000000",
    "shortDescription": "A one-line summary",
    "description": "A longer description",
    "videoEmbedUrl": "",
    "live": true,
    "aboutSection": "",
    "age": "Elementary",
    "sort": 1
  }
]
```

## Studies

Base path: `/studies`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public` | Public | — | List all live studies |
| GET | `/public/:id` | Public | — | Get a live study by ID |
| GET | `/public/ids?ids=` | Public | — | Live studies for comma-separated IDs. `ids` is required |
| GET | `/public/program/:programId` | Public | — | Live studies in a program, ordered by `sort`. Each row has a `lessonCount`, which counts every lesson in the study, live or not |
| GET | `/public/programs?ids=` | Public | — | Live studies for comma-separated program IDs, ordered by `sort`. Returns `[]` when `ids` is missing |
| GET | `/public/slug/:programId/:slug` | Public | — | Get a live study by program ID and slug. Returns `{}` when none matches |
| GET | `/` | JWT | Lessons.Edit | List the church's studies, ordered by `sort` |
| GET | `/:id` | JWT | — | Get one of the church's studies by ID |
| GET | `/program/:programId` | JWT | Lessons.Edit | The church's studies in a program, live or not, ordered by `sort` |
| POST | `/` | JWT | Lessons.Edit | Create or update studies (batch). Each item: `{ id?, programId, name, slug, image, shortDescription, description, videoEmbedUrl, sort, live }`. 404 if `programId`, or an existing `id` sent with a new image, is not the church's. `programId` is stored on create only; an update does not move a study |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a study. 404 if it is not the church's; 400 with `{ errors }` while it still has lessons or files. Returns `{ id }` |

## Study Categories

Base path: `/studyCategories`

Category rows group a program's studies under named headings. Each row is `{ id, programId, studyId, categoryName, sort }`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/program/:programId` | Public | — | All category rows for a program, ordered by `sort`. No `live` filter is applied |
| GET | `/categoryNames/:programId` | JWT | Lessons.Edit | The distinct category names used in a program, as a sorted array of strings |
| GET | `/:programId?categoryName=` | JWT | Lessons.Edit | The rows of one category in a program, ordered by `sort` |
| POST | `/` | JWT | Lessons.Edit | Create or update category rows (batch). Every `programId` and `studyId` must belong to the church, otherwise 404. After saving, the category named in the first item is renumbered from 0 in its current order |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a category row. 404 if it does not exist or its program is not the church's |

## Lessons

Base path: `/lessons`

"Expanded lesson data" below means `{ lesson, study, program, venues, bundles, resources, externalVideos, addOns }`, where each venue carries its `sections`, each section its `roles`, and each role its `actions`; bundles and add-ons carry their `file`, and resources carry their `variants` and `assets` with files.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/tree?providerId=` | Public | — | The catalog as nested JSON: `{ programs: [{ id, name, description, image, studies: [{ ..., lessons: [{ ..., venues: [{ id, name, apiUrl }] }] }] }] }`. Lesson names are `name: title`, lessons also carry `bottomLine`, `verse`, `parentQuestion`, and `parentNote`, and each venue's `apiUrl` is the absolute URL of its `/venues/public/feed/:id`. Studies and lessons are live only. Without `providerId` the programs are the live ones with a live provider; with `providerId` every program of that provider is returned and the program `live` flag is not checked |
| GET | `/public/actionTree?providerId=` | Public | — | The same tree taken down to actions: programs, studies, lessons, venues, sections, then `actions` as `{ id, name, actionType, roleName }` (`name` is the first 50 characters of the action's content). Branches with no actions are left out. `providerId` behaves as on `/public/tree` |
| GET | `/public/:id` | Public | — | Expanded lesson data for a live lesson. 404 if the lesson or its study is not live |
| GET | `/public/ids?ids=` | Public | — | Live lessons for comma-separated IDs. `ids` is required |
| GET | `/public/slug/:programSlug/:studySlug/:slug` | Public | — | Expanded lesson data, found by the three slugs. Returns `{}` when the program, study, or lesson is missing or not live |
| GET | `/public/slugAlt/:programSlug/:studySlug/:slug` | Public | — | The same lookup, returned as `{ venues }` with every venue in feed format (see `/venues/public/feed/:id`). Expired video links are refreshed first. Returns `{}` when nothing live matches |
| GET | `/public/studies?ids=` | Public | — | Live lessons for comma-separated study IDs, ordered by `sort`. Returns `[]` when `ids` is missing |
| GET | `/public/study/:studyId` | Public | — | Live lessons in a study, ordered by `sort` |
| GET | `/` | JWT | Lessons.Edit | List the church's lessons, ordered by `sort` |
| GET | `/:id` | JWT | — | Get one of the church's lessons by ID |
| GET | `/study/:studyId` | JWT | Lessons.Edit | The church's lessons in a study, live or not, ordered by `sort` |
| POST | `/` | JWT | Lessons.Edit | Create or update lessons (batch). Each item: `{ id?, studyId, name, slug, title, sort, image, live, description, videoEmbedUrl, bottomLine, verse, parentQuestion, parentNote }`. 404 if `studyId`, or an existing `id` sent with a new image, is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a lesson. 404 if it is not the church's; 400 with `{ errors }` while it still has files. Returns `{ id }` |

### Example: Load the Public Catalog

```
GET https://api.lessons.church/lessons/public/tree
```

```json
{
  "programs": [
    {
      "id": "aBcD3fGh1jK",
      "name": "Example Program",
      "description": "A one-line summary",
      "image": "https://content.example.org/programs/aBcD3fGh1jK.png",
      "studies": [
        {
          "id": "mNoP4qRs5tU",
          "name": "Example Study",
          "description": "",
          "image": "",
          "lessons": [
            {
              "id": "vWxY6zAb7cD",
              "name": "Week 1: Example Lesson",
              "description": "",
              "image": "",
              "bottomLine": "",
              "verse": "",
              "parentQuestion": "",
              "parentNote": "",
              "venues": [
                {
                  "id": "eFgH8iJk9lM",
                  "name": "Classroom",
                  "apiUrl": "https://api.lessons.church/venues/public/feed/eFgH8iJk9lM"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Venues

Base path: `/venues`

Venues carry the two formats players use. The **feed** (`/public/feed/:id`) is the full teaching script with files. The **playlists** (`/playlist/:venueId`, `/playlistNew/:venueId`) hold only what plays on screen: the `Play` and `Add-on` actions, in order.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:id` | Public | — | A venue with its `sections`, each with `roles`, each with `actions`. 404 if the venue does not exist. The lesson's `live` flag is not checked |
| GET | `/public/lesson/:lessonId` | Public | — | Every venue of a lesson, ordered by `sort`, nested the same way. The lesson's `live` flag is not checked |
| GET | `/public/feed/:id` | Public | — | The venue feed: `{ id, name, lessonId, lessonName, lessonDescription, lessonImage, bottomLine, verse, parentQuestion, parentNote, studyName, studySlug, programName, programSlug, programAbout, downloads, sections }`. Each section is `{ id, name, sort, materials, actions }` and each action `{ id, actionType, content, sort, roleId, role, files }`. Action types are lower-cased, `Download` actions are left out of sections, and `Add-on` actions are reported as `play`. 404 if the venue does not exist or its lesson or study is not live |
| GET | `/public/actions/:id` | Public | — | A summary for pickers: `{ venueName, sections: [{ id, name, actions: [{ id, name, actionType, roleName, seconds }] }] }`. `name` is the first 50 characters of the action's content, `seconds` is an estimated duration, and sections without actions are left out. 404 if the venue does not exist |
| GET | `/public/planItems/:id` | Public | — | The venue as service-plan items: `{ venueName, items }` with one `header` item whose `children` are one `lessonSection` item per section, each with an estimated `seconds`. 404 if the venue does not exist |
| GET | `/public/images?ids=` | Public | — | `[{ venueId, lessonImage }]` for comma-separated venue IDs. Returns `[]` when `ids` is missing |
| GET | `/playlist/:venueId?resolution=&mode=` | Public | — | Playlist grouped by section: `{ messages: [{ name, files: [{ name, url, seconds, loopVideo, thumbnail }] }], lessonName, lessonTitle, lessonImage, lessonDescription, venueName }`. `resolution=1080` selects 1080p video links (720p otherwise); `mode=web` returns videos as `provider:videoId` references instead of file links. Looping files and files with no known length get `seconds: 3600`. 404 if the venue does not exist or its lesson is not live. Records a playlist download for the lesson, once per IP address per day |
| GET | `/playlistNew/:venueId?resolution=&mode=` | Public | — | The same content in the slide format: `{ id, name, prefetch, playOrder, messages: [{ name, thumbnail, slides }] }`, one message per playable action. Same parameters, 404 rules, and download logging as `/playlist/:venueId` |
| GET | `/` | JWT | Lessons.Edit | List the church's venues, ordered by `sort` |
| GET | `/:id` | JWT | — | Get one of the church's venues by ID |
| GET | `/lesson/:lessonId` | JWT | Lessons.Edit | The church's venues for a lesson, ordered by `sort` |
| GET | `/names/classroom/:classroomId` | JWT | — | The distinct venue names of the lessons scheduled in one of the church's classrooms, as a sorted array of strings |
| GET | `/timeline?venueIds=` | JWT | — | Timeline cards for comma-separated venue IDs: `[{ postType: "venue", postId, studyName, name, description, image, slug }]`, where `slug` is the lesson's `/program/study/lesson` path. Not limited to the caller's church. Returns `[]` when `venueIds` is missing |
| POST | `/` | JWT | Lessons.Edit | Create or update venues (batch). Each item: `{ id?, lessonId, name, sort }`. 404 if `lessonId` is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a venue together with its sections, their roles, and their actions. Returns `{}` |

## Sections

Base path: `/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/venue/:venueId` | Public | — | Sections of a venue, ordered by `sort` |
| GET | `/public/lesson/:lessonId` | Public | — | Sections of every venue in a lesson, ordered by `sort` |
| GET | `/public/feed/:id` | Public | — | One section in feed format: `{ section, lessonId, lessonName, lessonDescription, lessonImage, venueName, studyName, programName }`, where `section` holds its actions and their files. Returns an empty body when the section does not exist. Fails with a `500` if the section's lesson, study, or program is not live |
| GET | `/venue/:venueId` | JWT | Lessons.Edit | The church's sections for a venue, ordered by `sort` |
| GET | `/copy/:sourceSectionId/:destVenueId` | JWT | Lessons.Edit | Copy a section, with its roles and actions, into another venue. This is a `GET` that writes. 401 with `{ errors }` unless both the source section and the destination venue belong to the church. Returns `[]` |
| POST | `/` | JWT | Lessons.Edit | Create or update sections (batch). Each item: `{ id?, lessonId, venueId, name, sort, materials }`. 404 if `venueId` or `lessonId` is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a section together with its roles and their actions. Returns `{}` |

## Roles

Base path: `/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/lesson/:lessonId` | Public | — | Roles of every section in a lesson, ordered by `sort` |
| GET | `/:id` | Public | — | Get a role by ID. This route is anonymous and not church-scoped, although its path has no `public` segment |
| GET | `/section/:sectionId` | JWT | Lessons.Edit | The church's roles for a section, ordered by `sort` |
| POST | `/` | JWT | Lessons.Edit | Create or update roles (batch). Each item: `{ id?, lessonId, sectionId, name, sort }`. 404 if `sectionId` or `lessonId` is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a role. Its actions are not deleted with it. Returns `{}` |

## Actions

Base path: `/actions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/lesson/:lessonId` | Public | — | Every action in a lesson, ordered by `sort` |
| GET | `/public/feed/:id` | Public | — | One action in feed format: `{ action, sectionId, sectionName, lessonId, lessonName, lessonDescription, lessonImage, venueName, studyName, programName, roleName }`, where `action` carries its playable `files`. Returns an empty body when the action, its role, or its section does not exist. Fails with a `500` if the lesson, study, or program is not live |
| GET | `/:id` | JWT | — | Get an action by ID. 404 if it does not exist or belongs to another church |
| GET | `/role/:roleId` | JWT | Lessons.Edit | The church's actions for a role, ordered by `sort` |
| POST | `/` | JWT | Lessons.Edit | Create or update actions (batch). Each item: `{ id?, lessonId, roleId, actionType, content, sort, resourceId, assetId, externalVideoId, addOnId }`. 404 if `roleId`, `lessonId`, `resourceId`, `assetId`, or `externalVideoId` is not the church's. `addOnId` is not checked because add-ons are a shared catalog |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an action. Returns `{}` |

## Add-ons

Base path: `/addOns`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public` | Public | — | Every add-on from every church, ordered by `category` then `name`. Add-ons that have a video also carry its `seconds` |
| GET | `/public/:id` | Public | — | One add-on with its `video` (the external video record), `seconds`, and `file` when it has them. Returns an empty body when the add-on does not exist |
| GET | `/` | JWT | Lessons.Edit | List the church's add-ons, ordered by `category` then `name` |
| GET | `/:id` | JWT | — | Get an add-on by ID. Not limited to the caller's church |
| POST | `/` | JWT | Lessons.Edit | Create or update add-ons (batch). Each item: `{ id?, providerId, category, name, image, addOnType, fileId }`. 404 if an existing `id` sent with a new image is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an add-on. Returns `{}` |

## Year Plans

Base path: `/yearPlans`

A year plan is `{ id, name, slug, programId, venuePreference, startMonth, sort, live, weeks }`. Each week is `{ week, lessonId, externalProviderId, programId, studyId, venueId, studyName, lessonName, venueName, anchor }`. On read, blank `programId`, `studyId`, `studyName`, `lessonName`, `venueId`, and `venueName` values are filled in from the lesson. A blank venue is picked from the lesson's venues: the first whose name matches `venuePreference` (a comma-separated list of names, tried as exact matches and then as partial matches), or else the lesson's first venue.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public` | Public | — | Live year plans with their weeks, ordered by `sort` then `name`. Names are filled in from live lessons and studies only |
| GET | `/public/:id` | Public | — | One live year plan with its weeks. 404 if it does not exist or is not live |
| GET | `/` | JWT | Lessons.Edit | The church's year plans with their weeks, live or not |
| GET | `/:id` | JWT | Lessons.Edit | One of the church's year plans with its weeks. 404 if it is not the church's |
| POST | `/` | JWT | Lessons.Edit | Create or update year plans (batch). When an item includes `weeks`, the plan's existing weeks are deleted and replaced with that list; leave `weeks` out to keep them. 404 if an existing `id` is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a year plan and its weeks. Returns `{}` |

## Providers

Base path: `/providers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public` | Public | — | List every provider. The provider `live` flag is not applied here |
| GET | `/public/:id` | Public | — | Get a provider by ID. The provider `live` flag is not applied here |
| GET | `/stats` | Public | — | Library totals: `{ providers, studies, lessons }`, counting all providers, live studies, and live lessons |
| GET | `/` | JWT | — | List the church's providers |
| GET | `/:id` | JWT | — | Get one of the church's providers by ID |
| POST | `/` | JWT | Lessons.Edit | Create or update providers (batch). Only `name` is stored; `live` cannot be set through this route |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a provider. Returns `{}` |

## Search

Base path: `/search`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/export` | Public | — | A flat array with one search document per live program (with a live provider), live study, and live lesson, for building a client-side search index. Each document: `{ id, type, name, description, slug, image, age, programName, programSlug, studyName, studySlug, lessonSlug, categories, lessonCount }`. `type` is `program`, `study`, or `lesson`, and `id` is prefixed with it (`lesson-...`). `categories` is the study's category names joined with commas |

## Bundles

Base path: `/bundles`

A bundle is attached to one content item (`contentType` plus `contentId`, such as a program, study, or lesson) and is delivered as one zip file. Saving a bundle, or changing anything inside it, flags it `pendingUpdate`; a scheduled job that runs every five minutes rebuilds the zip of flagged bundles. The queue routes below let an author inspect and nudge that job for their own church.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Lessons.Edit | Get one of the church's bundles by ID |
| GET | `/available?programId=&studyId=` | JWT | Lessons.Edit | The church's bundles attached to the given program or study, for choosing where a resource goes. Both parameters are read; send `studyId=` empty to match on the program alone |
| GET | `/content/:contentType/:contentId` | JWT | Lessons.Edit | The church's bundles attached to one content item, ordered by `name` |
| GET | `/zip` | JWT | Lessons.Edit | Rebuild the zip for as many as five of the church's flagged bundles now, instead of waiting for the scheduled job. Returns `[]` |
| GET | `/queue/health` | JWT | Lessons.Edit | Zip queue status for the church: `{ status, queueDepth, totalBundles, stuckBundles, stuckBundleIds, timestamp, metrics: { queueUtilization, recommendedAction } }`. `status` is `WARNING` when a flagged bundle counts as stuck (its `dateModified` is missing or more than an hour old), `HIGH_LOAD` when more than 10 are flagged, otherwise `HEALTHY`. Looks at up to 50 flagged bundles |
| POST | `/` | JWT | Lessons.Edit | Create or update bundles (batch). Each item: `{ id?, contentType, contentId, name }`. Every saved bundle is flagged for zipping |
| POST | `/:id/rezip` | JWT | Lessons.Edit | Flag one of the church's bundles for zipping. Returns `{ id, pendingUpdate: true }` |
| POST | `/queue/clear-stuck` | JWT | Lessons.Edit | Clear the `pendingUpdate` flag on the church's stuck bundles (same test as `/queue/health`, up to 100 at a time) without zipping them. Returns `{ clearedCount, clearedBundleIds, timestamp }` |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a bundle together with its resources, their variants and assets, and the stored files. Returns `{}` |

## Resources

Base path: `/resources`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Lessons.Edit | Get one of the church's resources by ID |
| GET | `/content/:contentType/:contentId` | JWT | Lessons.Edit | Resources in the church's bundles for one content item, ordered by `name` |
| POST | `/` | JWT | Lessons.Edit | Create or update resources (batch). Each item: `{ id?, bundleId, name, category, loopVideo }`. 404 if `bundleId` is not the church's. Moving a resource to a bundle on different content moves its stored files, and the bundles involved are flagged for zipping |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a resource together with its variants, assets, and their stored files, and flag its bundle for zipping. Returns `{}` |

## Variants

Base path: `/variants`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Lessons.Edit | Get one of the church's variants by ID |
| GET | `/content/:contentType/:contentId` | JWT | Lessons.Edit | The church's variants for every resource on one content item, ordered by `name` |
| GET | `/resourceId/:resourceId` | JWT | Lessons.Edit | The church's variants for a resource, ordered by `name` |
| GET | `/createWebms` | JWT | Lessons.Edit | Maintenance. Starts a WEBM transcode for every resource, in any church, that has an MP4 variant and no `WEBM` variant yet. Returns `{}` |
| POST | `/` | JWT | Lessons.Edit | Create or update variants (batch). Each item: `{ id?, resourceId, fileId, name, downloadDefault, playerDefault, hidden }`. 404 if `resourceId` is not the church's. Flags the bundle for zipping and starts a WEBM transcode when the resource has an MP4 and no `WEBM` variant |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a variant and its stored file, and flag the bundle for zipping. Returns `{}` |

## Assets

Base path: `/assets`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Lessons.Edit | Get one of the church's assets by ID |
| GET | `/content/:contentType/:contentId` | JWT | Lessons.Edit | The church's assets for every resource on one content item, ordered by `sort` |
| GET | `/resourceId/:resourceId` | JWT | Lessons.Edit | The church's assets for a resource, ordered by `sort` |
| GET | `/resourceIds?resourceIds=` | JWT | Lessons.Edit | The church's assets for comma-separated resource IDs, ordered by `sort`. `resourceIds` is required |
| POST | `/` | JWT | Lessons.Edit | Create or update assets (batch). Each item: `{ id?, resourceId, fileId, name, sort }`. 404 if `resourceId` is not the church's. Flags the bundle for zipping |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an asset and its stored file, and flag the bundle for zipping. Returns `{}` |

## Files

Base path: `/files`

A file record is `{ id, fileName, contentPath, fileType, size, seconds, dateModified, thumbPath }`. `contentPath` is the file's URL and is set by the server. There are two ways to add a file: send its contents inline to `POST /`, or ask for an upload target with one of the `postUrl` routes, upload straight to storage, and then `POST /` the record without `fileContents`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List the church's file records |
| GET | `/:id` | JWT | — | Get one of the church's file records by ID |
| GET | `/cleanup` | JWT | Lessons.Edit | Maintenance. Deletes the church's file records that no bundle, asset, or variant points at, then removes stored objects in the church's file folders that no remaining record points at. Returns `{ paths }`, the storage paths removed |
| POST | `/` | JWT | Lessons.Edit | Create or update file records (batch). Each item: `{ id?, fileName, fileType, size, seconds, thumbPath, resourceId, contentType, contentId, fileContents }`. With `resourceId` the file is filed under that resource; otherwise under `contentType` and `contentId`, which must name content the church owns (`program`, `study`, `lesson`, or `addOn`), or the call returns 401. `fileContents` is an optional base64 data URL that is written to storage |
| POST | `/postUrl` | JWT | Lessons.Edit | Get a presigned upload target for a file that belongs to a resource. Body: `{ resourceId, fileName }`. Returns `{ url, fields, key }`, valid for one hour, or `{}` when the service stores files on local disk |
| POST | `/postUrl/content/:contentType/:contentId` | JWT | Lessons.Edit | The same for a file attached directly to a content item. Body: `{ fileName }`. 401 if the content is not the church's |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete a file record. The stored object is not removed by this route. Returns `{}` |

## External Videos

Base path: `/externalVideos`

An external video is `{ id, contentType, contentId, name, videoProvider, videoId, seconds, loopVideo, play720, play1080, play4k, download720, download1080, download4k, thumbnail, downloadsExpire }`. The play and download links come from the video provider and expire, so the public routes refresh them when `downloadsExpire` has passed.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:id` | Public | — | Get an external video by ID, with refreshed links. 404 if it does not exist |
| GET | `/download/:id` | Public | — | Redirect to the video's 1080p download link, or its 720p link when there is no 1080p one. 404 if the video does not exist or has neither link. Feeds use this URL for video downloads |
| GET | `/:id` | JWT | Lessons.Edit | Get one of the church's external videos by ID |
| GET | `/content/:contentType/:contentId` | JWT | Lessons.Edit | The church's external videos for one content item, ordered by `name` |
| POST | `/` | JWT | Lessons.Edit | Create or update external videos (batch). `contentType` and `contentId` must name content the church owns (`program`, `study`, `lesson`, or `addOn`), otherwise 404. When `videoId` is set, the duration, play and download links, and thumbnail are loaded from the video provider and overwrite the values sent |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an external video. Returns `{}` |

## Add-on Playlists

Base path: `/addOnPlaylists`

A named list of add-ons: `{ id, providerId, name }`. The source marks these routes, and the playlist item routes below, as not currently in use.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an add-on playlist by ID. Not limited to the caller's church |
| POST | `/` | JWT | Lessons.Edit | Create or update add-on playlists (batch) |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an add-on playlist. Returns `{}` |

## Add-on Playlist Items

Base path: `/addOnPlaylistItems`

One add-on's place in a playlist: `{ id, playlistId, addOnId, sort }`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an add-on playlist item by ID. Not limited to the caller's church |
| POST | `/` | JWT | Lessons.Edit | Create or update add-on playlist items (batch) |
| DELETE | `/:id` | JWT | Lessons.Edit | Delete an add-on playlist item. Returns `{}` |

## Downloads

Base path: `/downloads`

The download log behind the publisher statistics. The playlist routes also write to it.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | Public | — | Record downloads (batch). Each item: `{ lessonId, fileId, fileName }`. A token is optional: when one is sent, the church and user come from it; otherwise the download is recorded with no church or user. The IP address and date are set by the server. When there is a church, its download totals are also pushed to the marketing systems the service is configured with |
| GET | `/:programId/churches?startDate=&endDate=` | JWT | Own program | The distinct churches that downloaded from a program in the date range, as `[{ churchId }]`. 401 with `{ errors }` if the program is not the caller's church's. Both dates are required and `endDate` is inclusive |
| GET | `/:programId/geo?startDate=&endDate=` | JWT | Own program | Download counts by location for a program: `[{ lat, lon, city, state, country, totalDownloads }]`. Only downloads whose IP address has been geolocated are counted. Same access rule and date parameters |
| GET | `/:programId/studies?startDate=&endDate=` | JWT | Own program | Downloads per study for a program: `[{ id, studyName, downloadCount }]`, where `downloadCount` is the number of distinct IP addresses. Same access rule and date parameters |

## Classrooms

Base path: `/classrooms`

A classroom is `{ id, name, recentGroupId, upcomingGroupId }`. The two group IDs are group IDs from the main API; `GET /person` matches them against the caller's groups.

"Current schedule" below means the classroom's earliest schedule dated later than one day before `date`, so today's lesson or the next one coming up. `date` defaults to the current time at a fixed UTC-6 offset.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | Public | — | Get a classroom by ID. This route is anonymous and not church-scoped, although its path has no `public` segment |
| GET | `/public/church/:churchId` | Public | — | A church's classrooms, ordered by `name` |
| GET | `/public/tree/:churchId` | Public | — | A church's classrooms as a player menu: `{ treeLabels: ["Classroom"], playlists: [{ id, name, description, image, apiUrl }] }`. Each `apiUrl` is the production URL of that classroom's `/playlistNew/:classroomId` |
| GET | `/player/:churchId?classrooms=` | Public | — | The same menu without `description`, optionally limited to the comma-separated classroom IDs in `classrooms` |
| GET | `/playlist/:classroomId?date=&resolution=` | Public | — | The playlist for the classroom's current schedule, in the section format of `/venues/playlist/:venueId` (files have no `thumbnail`), with the scheduling church's customizations applied (removed items dropped, custom order used). A schedule that points at an external provider is built from that provider's feed instead. `resolution=1080` selects 1080p video links. 404 with `{ error }` when nothing is scheduled. Records a playlist download for the church, once per IP address per day |
| GET | `/playlistNew/:classroomId?date=&resolution=` | Public | — | The same in the slide format of `/venues/playlistNew/:venueId`. 404 with `{ error }` when nothing is scheduled. This route does not handle schedules that point at an external provider: the venue lookup fails with a `500` |
| GET | `/` | JWT | — | List the church's classrooms, ordered by `name` |
| GET | `/person` | JWT | — | The church's classrooms whose `recentGroupId` or `upcomingGroupId` is one of the caller's groups (taken from the token). Returns `[]` when the caller is in no groups |
| POST | `/` | JWT | Schedules.Edit | Create or update classrooms (batch) |
| DELETE | `/:id` | JWT | Schedules.Edit | Delete a classroom. Its schedules are not deleted with it. Returns `{}` |

## Schedules

Base path: `/schedules`

A schedule is `{ id, classroomId, scheduledDate, lessonId, venueId, displayName, externalProviderId, programId, studyId }`. `scheduledDate` is stored as a date with no time. For a lesson from an external provider, `externalProviderId`, `programId`, `studyId`, `lessonId`, and `venueId` hold that provider's IDs.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/classroom/:classroomId` | Public | — | Every schedule for a classroom, ordered by `scheduledDate` |
| GET | `/:id` | JWT | — | Get a schedule by ID. 404 if it does not exist or belongs to another church |
| GET | `/classroom/:classroomId` | JWT | — | The church's schedules for a classroom, ordered by `scheduledDate` |
| POST | `/` | JWT | Schedules.Edit | Create or update schedules (batch). 404 if a `classroomId` is not one of the church's classrooms. `venueId` is not checked, because classrooms schedule lessons published by other churches |
| DELETE | `/:id` | JWT | Schedules.Edit | Delete a schedule. Returns `{}` |

## Customizations

Base path: `/customizations`

A customization is `{ id, venueId, classroomId, contentType, contentId, action, actionContent }`. `contentId` is the ID of a section, role, or action in the venue. The playlist routes read two `action` values: `remove` drops that item, and `sort` uses `actionContent` as its sort number in place of the publisher's.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/venue/:venueId/:churchId?classroomId=` | Public | — | A church's customizations for a venue. With `classroomId`, only the rows with no classroom plus the rows for that classroom |
| GET | `/:id` | JWT | — | Get one of the church's customizations by ID |
| GET | `/venue/:venueId?classroomId=` | JWT | — | The church's customizations for a venue, with the same optional `classroomId` filter |
| POST | `/` | JWT | Schedules.Edit | Create or update customizations (batch) |
| DELETE | `/:id` | JWT | Schedules.Edit | Delete a customization. Returns `{}` |

## External Providers

Base path: `/externalProviders`

An external provider is `{ id, name, apiUrl }`: a third-party lesson catalog a church has registered. `apiUrl` must return a catalog in the shape of `GET /lessons/public/tree` (programs, studies, lessons, venues), and each venue's own `apiUrl` must return a venue feed in the shape of `GET /venues/public/feed/:id`. The public routes below fetch those URLs on the caller's behalf. Provider URLs must be `https` on a public host name (no IP addresses or private hosts), a venue feed must be on the provider's own host (or on `lessons.church`), redirects are not followed, and each fetch times out after 10 seconds. An unknown provider ID, a failed fetch, or a venue that is not in the catalog results in a `500`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/lessons` | Public | — | The provider's catalog, fetched from its `apiUrl` and returned as is |
| GET | `/:id/venue/:venueId` | Public | — | The feed for one venue, found by ID anywhere in the catalog. `bottomLine`, `verse`, `parentQuestion`, and `parentNote` are filled in from the catalog's lesson when the feed leaves them blank |
| GET | `/:id/venue/:venueId/actions` | Public | — | That venue as an action summary, in the shape of `/venues/public/actions/:id` |
| GET | `/:id/venue/:venueId/planItems` | Public | — | That venue as service-plan items, in the shape of `/venues/public/planItems/:id` |
| GET | `/playlist/:externalProviderId/:programId/:studyId/:lessonId/:venueId` | Public | — | That venue as a playlist: `{ lessonName, lessonTitle, lessonImage, lessonDescription, bottomLine, verse, parentQuestion, parentNote, venueName, messages: [{ name, files: [{ name, url, seconds, loopVideo }] }] }`. Only `play` actions are included. The venue is found by following the four IDs through the catalog |
| GET | `/` | JWT | — | List the church's external providers |
| GET | `/:id` | JWT | — | Get one of the church's external providers by ID |
| POST | `/` | JWT | Schedules.Edit | Create or update external providers (batch). Each item: `{ id?, name, apiUrl }` |
| DELETE | `/:id` | JWT | Schedules.Edit | Delete an external provider. Returns `{}` |

## Internal and Maintenance

These routes exist for operations rather than for client apps. None of them is protected by a shared secret, so the **Auth** and **Permission** columns are the whole of their protection. Maintenance routes that belong to a resource are listed with it: `GET /bundles/zip`, `GET /bundles/queue/health`, `POST /bundles/queue/clear-stuck`, `GET /files/cleanup`, and `GET /variants/createWebms`.

### Health

Base path: `/`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Service banner: `{ name, version, status, timestamp }`. Does not touch the database |
| GET | `/favicon.ico` | Public | — | Always answers `204` with no body |
| GET | `/health` | Public | — | Health check. Runs a trivial database query and returns `{ status, environment, modules: { loaded }, timestamp }`. The HTTP status is always `200`; `status` is `healthy` when the query works and `degraded` when it does not, so read the body rather than the status code |

### Transcode Pingback

Base path: `/pingback`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | Public | — | Does nothing. The handler is empty: it accepts any body, performs no work, and returns no data. Video transcode results reach the service as notification events handled by a separate background function, not through this route |

### IP Details

Base path: `/ipDetails`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/lookup` | JWT | Lessons.Edit | Runs the IP geolocation backfill on demand. Looks up as many as 10 download IP addresses that have no location yet with an outside geolocation service and stores the city, region, country, coordinates, and ISP that `GET /downloads/:programId/geo` reports on. Works across all churches, takes no body, and does nothing when no geolocation key is configured. Returns `{}` |

### Temp

Base path: `/temp`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/venue/:venueId` | Public | — | A flattened venue export kept in a controller the source names `TempController`: `{ name, lessonName, lessonDescription, studyName, programName, sections: [{ name, actions: [{ actionType, content, files }] }] }`. `Download` actions are left out and only `Play` actions carry `files`. It has no not-found handling: an unknown venue, or one whose lesson, study, or program is not live, fails with a `500`. `/venues/public/feed/:id` covers the same ground and answers 404 instead |

## Related Pages

- [Endpoint Reference](./index.md) — Request conventions and the main API's modules
- [Authentication & Permissions](./authentication.md) — Login flow and the JWT this service accepts
- [MCP Server](../mcp.md) — How `/lessons/...` paths are forwarded to this service
- [LessonsApp](../../web-apps/lessons-app.md) — The Lessons.church web app that calls these routes
