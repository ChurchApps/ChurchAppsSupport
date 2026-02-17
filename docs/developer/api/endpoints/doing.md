---
title: "Doing Endpoints"
---

# Doing Endpoints

<div class="article-intro">

The Doing module manages service planning, volunteer scheduling, task management, and automations. It provides tools for creating service plans with times and positions, assigning volunteers, managing blockout dates, building service order items, connecting to external content providers, and configuring automated workflows with conditions and actions.

</div>

**Base path:** `/doing`

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all plans for the church |
| GET | `/:id` | JWT | — | Get a plan by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plans by comma-separated IDs |
| GET | `/types/:planTypeId` | JWT | — | Get plans by plan type |
| GET | `/presenter` | JWT | — | Get plans for the next 7 days (presenter view) |
| GET | `/public/current/:planTypeId` | Public | — | Get the current plan for a plan type |
| POST | `/` | JWT | — | Create or update plans (accepts single object or array) |
| POST | `/copy/:id` | JWT | — | Copy a plan including positions, times, assignments, and service order items. Body includes `copyMode` ("none", "positions", "all") and `copyServiceOrder` (boolean) |
| POST | `/autofill/:id` | JWT | — | Auto-fill volunteer assignments for a plan. Body: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Delete a plan and all related times, assignments, positions, and plan items |

### Example: Copy a Plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plan Types

Base path: `/doing/planTypes`

Extends CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — no permission checks).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all plan types |
| GET | `/:id` | JWT | — | Get a plan type by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plan types by comma-separated IDs |
| GET | `/ministryId/:ministryId` | JWT | — | Get plan types for a ministry |
| POST | `/` | JWT | — | Create or update plan types |
| DELETE | `/:id` | JWT | — | Delete a plan type |

## Plan Items

Base path: `/doing/planItems`

Manages service order items (headers, sections, songs, etc.) organized in a parent-child tree structure.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a plan item by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plan items by comma-separated IDs |
| GET | `/plan/:planId` | JWT | — | Get all plan items for a plan (returns tree structure) |
| GET | `/presenter/:churchId/:planId` | Public | — | Get plan items for presenter view (returns tree structure) |
| POST | `/` | JWT | — | Create or update plan items |
| POST | `/sort` | JWT | — | Update sort order for a plan item (re-sorts siblings) |
| DELETE | `/:id` | JWT | — | Delete a plan item |

## Plan Feed

Base path: `/doing/planFeed`

Provides plan item feeds for the presenter. If no plan items exist, auto-populates from the Lessons.church venue feed using the plan's `contentId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Get plan feed for presenter (auto-populates from venue feed if empty) |

## Positions

Base path: `/doing/positions`

Extends CRUD base class (GET `/:id`, POST `/`, DELETE `/:id` — no permission checks).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a position by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple positions by comma-separated IDs |
| GET | `/plan/ids?planIds=` | JWT | — | Get positions for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all positions for a plan |
| POST | `/` | JWT | — | Create or update positions |
| DELETE | `/:id` | JWT | — | Delete a position |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | List all times for the church |
| GET | `/:id` | JWT | — | Get a time by ID |
| GET | `/plans?planIds=` | JWT | — | Get times for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all times for a plan |
| POST | `/` | JWT | — | Create or update times |
| DELETE | `/:id` | JWT | — | Delete a time |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Get assignments for the current user |
| GET | `/:id` | JWT | — | Get an assignment by ID |
| GET | `/plan/ids?planIds=` | JWT | — | Get assignments for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all assignments for a plan |
| POST | `/` | JWT | — | Create or update assignments (defaults status to "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accept an assignment (must be the assigned person) |
| POST | `/decline/:id` | JWT | — | Decline an assignment (must be the assigned person) |
| DELETE | `/:id` | JWT | — | Delete an assignment |

### Example: Accept an Assignment

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Blockout Dates

Base path: `/doing/blockoutDates`

Extends CRUD base class (GET `/:id`, DELETE `/:id` — no permission checks).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a blockout date by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple blockout dates by comma-separated IDs |
| GET | `/my` | JWT | — | Get blockout dates for the current user |
| GET | `/upcoming` | JWT | — | Get all upcoming blockout dates for the church |
| POST | `/` | JWT | — | Create or update blockout dates (defaults personId to current user if not provided) |
| DELETE | `/:id` | JWT | — | Delete a blockout date |

## Tasks

Base path: `/doing/tasks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Get open tasks for the current user |
| GET | `/:id` | JWT | — | Get a task by ID |
| GET | `/closed` | JWT | — | Get closed tasks for the current user |
| GET | `/timeline?taskIds=` | JWT | — | Get timeline data for tasks by comma-separated task IDs |
| GET | `/directoryUpdate/:personId` | JWT | — | Get directory update task for a person |
| POST | `/` | JWT | — | Create or update tasks. Add `?type=directoryUpdate` to handle directory update tasks (auto-uploads photos) |
| POST | `/loadForGroups` | JWT | — | Load tasks for specific groups. Body: `{ groupIds: [], status: "Open" }` |

## Automations

Base path: `/doing/automations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all automations for the church |
| GET | `/:id` | JWT | — | Get an automation by ID |
| GET | `/check` | Public | — | Trigger a check of all automations |
| POST | `/` | JWT | — | Create or update automations |
| DELETE | `/:id` | JWT | — | Delete an automation |

## Actions

Base path: `/doing/actions`

Actions define what happens when an automation is triggered.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get an action by ID |
| GET | `/automation/:id` | JWT | — | Get all actions for an automation |
| POST | `/` | JWT | — | Create or update actions |
| DELETE | `/:id` | JWT | — | Delete an action |

## Conditions

Base path: `/doing/conditions`

Conditions define the criteria that trigger an automation.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a condition by ID |
| GET | `/automation/:id` | JWT | — | Get all conditions for an automation |
| POST | `/` | JWT | — | Create or update conditions |
| DELETE | `/:id` | JWT | — | Delete a condition |

## Conjunctions

Base path: `/doing/conjunctions`

Conjunctions link multiple conditions together in an automation (AND/OR logic).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a conjunction by ID |
| GET | `/automation/:id` | JWT | — | Get all conjunctions for an automation |
| POST | `/` | JWT | — | Create or update conjunctions |
| DELETE | `/:id` | JWT | — | Delete a conjunction |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

Extends CRUD base class (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — no permission checks).

Manages OAuth authentication records for external content providers (e.g., presentation software integrations).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all content provider auths |
| GET | `/:id` | JWT | — | Get a content provider auth by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple content provider auths by comma-separated IDs |
| GET | `/ministry/:ministryId` | JWT | — | Get all content provider auths for a ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Get auth record for a specific ministry and provider |
| POST | `/` | JWT | — | Create or update content provider auths |
| DELETE | `/:id` | JWT | — | Delete a content provider auth |

## Provider Proxy

Base path: `/doing/providerProxy`

Proxies requests to external content providers (e.g., ProPresenter, EasyWorship). Handles token refresh automatically when tokens expire.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Browse content provider files. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Get presentations from a content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Get a playlist from a content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Get instructions for a content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Get expanded instructions for a content item. Body: `{ ministryId, providerId, path }` |

## Related Pages

- [Membership Endpoints](./membership) — People, groups, roles, and permissions
- [Attendance Endpoints](./attendance) — Service and visit tracking
- [Module Structure](../module-structure) — Code organization patterns
