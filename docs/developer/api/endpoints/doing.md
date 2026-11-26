---
title: "Doing Endpoints"
description: "Endpoint reference for the Doing API: service plans, volunteer assignments, tasks, workflows, and signage screens, with paths, auth, and permissions."
---

# Doing Endpoints

<div class="article-intro">

The Doing module manages service planning, volunteer scheduling, tasks, workflows, and signage screens. It provides tools for creating service plans with times and positions, assigning volunteers, managing blockout dates and scheduling preferences, building service order items, and connecting to external content providers. Workflows move cards through ordered steps, with triggers, conditions, and step actions that automate follow-up. The screens endpoints schedule playlists, plan types, and provider folders onto groups of signage screens.

</div>

**Base path:** `/doing`

In the Permission column, **Ministry edit** means the caller has Plans.Edit or is a member of the ministry (the group a plan or plan type belongs to), and **Plan edit** means the same check against the ministry that owns the plan. A caller who fails a listed check gets a 401.

## Plans

Base path: `/doing/plans`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all plans for the church |
| GET | `/:id` | JWT | — | Get a plan by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plans by comma-separated IDs |
| GET | `/types/:planTypeId` | JWT | — | Get plans by plan type |
| GET | `/overview?startDate=&endDate=&ministryId=&planTypeId=` | JWT | — | Serving overview for plans with a `serviceDate` in the range, optionally limited to a ministry or plan type. One row per position and assigned volunteer: `{ serviceDate, ministryId, planId, planName, positionId, categoryName, positionName, groupId, needed, assignmentId, personId, status }`, sorted by category, position, then date. Only Accepted and Unconfirmed assignments are included; a position with none still returns one row with empty assignment fields. `startDate` and `endDate` are required |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | Texting.Send + Ministry edit | Preview the serving overview **Text Volunteers** send: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` for the volunteers assigned in the range (one per person, opted-out and missing numbers skipped, shared numbers deduplicated, capped at 200) |
| GET | `/presenter` | JWT | — | Get plans for the next 7 days (presenter view) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Ministry edit | Active serving assignment confirmation workflows (`workflowType = "assignmentConfirmation"`) a plan can select: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Get the current plan for a plan type |
| GET | `/public/signup/:churchId` | Public | — | Plans open for self-signup, soonest first, each with its self-signup positions (sorted by `categoryName`, then `name`, plus `filledCount` of Accepted/Unconfirmed assignments) and times. No volunteer names. When the church setting `volunteerSignupNextOnly` is `"true"`, only the first plan of each plan type is returned. Each `plan` includes a computed `signupDeadline` (ISO instant, or `null`): `signupDeadlineHours` before the plan's earliest `service`-type time (any timed entry if there is no service time; 9:00 in the church's time zone on `serviceDate` if the plan has no times) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` for the plan's self-signup positions (display names of Accepted/Unconfirmed assignees). Returns `[]` unless the plan's `showVolunteerNames` is on |
| POST | `/` | JWT | Ministry edit | Create or update plans (accepts single object or array). Set `confirmationWorkflowId` to opt the plan into a serving confirmation workflow, or `null` to opt out for future requests. Send `signupDeadlineHours: null` to clear a deadline; omitting the field keeps the saved value |
| POST | `/copy/:id` | JWT | Ministry edit | Copy a plan including positions, times, assignments, and service order items. Body includes `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") and `copyServiceOrder` (boolean). Without `targetPlanId` a new plan is created, and `notes`, `signupDeadlineHours`, `showVolunteerNames`, and `autoReplaceOnDecline` carry over from the source plan unless the body supplies them. With `targetPlanId`, the copy fills that existing plan instead (the caller must be able to edit it). B1Admin's **Repeat weekly** option calls this once per week, each time copying from the plan created the week before |
| POST | `/notifyRange` | JWT | Ministry edit | Send every volunteer assigned in a date range one serving-schedule notification, emailed as a summary of their assignments (plan, date, and positions). Body: `{ startDate, endDate, ministryId, planTypeId? }`; the first three are required (400). Covers Accepted and Unconfirmed assignments, one message per person, capped at 200 people. Returns `{ sent, failed, capped }` |
| POST | `/textRange` | JWT | Texting.Send + Ministry edit | Text every volunteer assigned in a date range through the church's texting provider. Body: `{ startDate, endDate, ministryId, planTypeId?, message }` (message up to 1600 characters; merge fields resolved per recipient). Returns the preview counts plus `recipientCount`, `successCount`, `failCount`, and `error` (`no_provider` or `insufficient_credits`) when sending stops early |
| POST | `/:id/issueRequests` | JWT | Plan edit | Issue the plan's new Unconfirmed, not-yet-notified assignments through its confirmation workflow: marks each notified and starts one workflow card per assignment. Empty body; returns `{ issued }`. Fails unless the plan is published (not `prepared`), has an active `confirmationWorkflowId` with at least one step, and its response deadline hasn't passed |
| POST | `/autofill/:id` | JWT | Plan edit | Auto-fill volunteer assignments for a plan. Body: `{ teams: [{ positionId, personIds }] }` |
| POST | `/autofill/:id/undo` | JWT | Plan edit | Undo the plan's most recent auto-fill: deletes the assignments that run created that are still Unconfirmed and clears the plan's `lastAutofillRunId`. Returns `{ removed }` (0 when there is no run to undo) |
| DELETE | `/:id` | JWT | Plan edit | Delete a plan and all related times, assignments, positions, and plan items |

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all plan types |
| GET | `/:id` | JWT | — | Get a plan type by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plan types by comma-separated IDs |
| GET | `/ministryId/:ministryId` | JWT | — | Get plan types for a ministry |
| POST | `/` | JWT | Ministry edit | Create or update plan types |
| POST | `/:id/lessonTrim` | JWT | Ministry edit | Save the plan type's lesson trim: the parts of a lesson that one customized plan kept in its order of service, re-applied to lessons scheduled into this plan type. Body: `{ fromPlanId, applyUpcoming?, preview? }`. `fromPlanId` must be a lesson-linked plan of this plan type whose order of service still holds lesson items (400 otherwise). With `preview: true` nothing is saved and the result is `{ keep, upcoming: [{ planId, name, serviceDate }] }`, the upcoming lessons the trim would apply to. Otherwise returns `{ keep, applied }`; `applyUpcoming: true` re-trims those upcoming lessons, replacing their order of service, and lists them in `applied` as `{ planId, name, serviceDate, warning }` |
| DELETE | `/:id/lessonTrim` | JWT | Ministry edit | Clear the plan type's saved lesson trim |
| DELETE | `/:id` | JWT | Ministry edit | Delete a plan type |

## Plan Templates

Base path: `/doing/plantemplates`

Reusable snapshots of a plan, stored per ministry. `data` is a JSON string holding `{ notes, items, positions }`: the plan's notes, service order items, and positions.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/ministry/:ministryId` | JWT | Ministry edit | List a ministry's plan templates, sorted by name |
| GET | `/:id` | JWT | Ministry edit | Get a plan template by ID (404 if not found) |
| POST | `/` | JWT | Ministry edit | Create or update plan templates (batch). Fields: `ministryId`, `name`, `data` |
| POST | `/fromPlan/:planId` | JWT | Plan edit | Save a plan as a template: captures the plan's notes, service order items, and positions into `data`. Body: `{ name, ministryId }` to create a template, or `{ id }` to refresh an existing template's snapshot (its name and ministry are kept unless supplied; the caller needs Ministry edit on that template; 404 if it is not found) |
| POST | `/apply/:id` | JWT | Plan edit on each target plan | Apply a template to plans. Body: `{ planIds, serviceOrder?, positions? }`. The template's notes, if any, replace each plan's notes. `serviceOrder` (default true) replaces the plan's service order items; `positions` (default false) replaces its positions and deletes its existing assignments. Returns `{ applied }`, the number of plans; 404 if the template is not found |
| DELETE | `/:id` | JWT | Ministry edit | Delete a plan template (404 if not found) |

## Plan Items

Base path: `/doing/planItems`

Manages service order items (headers, sections, songs, etc.) organized in a parent-child tree structure.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a plan item by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple plan items by comma-separated IDs |
| GET | `/songs?startDate=&endDate=` | JWT | Plans.Edit or Content.Edit | Song items (`itemType` `song` or `arrangementKey`, with a `relatedId`) on plans whose `serviceDate` falls in the range, oldest first: `{ id, planId, itemType, relatedId, label, serviceDate, planName }`. Both dates are required, as `YYYY-MM-DD` (400) |
| GET | `/plan/:planId` | JWT | — | Get all plan items for a plan (returns tree structure) |
| GET | `/presenter/:churchId/:planId` | Public | — | Get plan items for presenter view (returns tree structure) |
| POST | `/` | JWT | Plan edit | Create or update plan items |
| POST | `/sort` | JWT | Plan edit | Update sort order for a plan item (re-sorts siblings) |
| DELETE | `/:id` | JWT | Plan edit | Delete a plan item |

## Plan Item Times

Base path: `/doing/planItemTimes`

Per-service-time records for service order items. Each links a plan item (`planItemId`) to one of the plan's times (`timeId`), with an `excluded` flag (the item is left out of that service time) and an optional `positionId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/plan/:planId` | JWT | — | Get the records for every item in a plan |
| GET | `/planItem/:planItemId` | JWT | — | Get the records for one plan item |
| POST | `/` | JWT | Plan edit | Create or update plan item times (batch). Fields: `planItemId`, `timeId`, `excluded`, `positionId`. Returns 401 when a `planItemId` does not exist |
| DELETE | `/:id` | JWT | Plan edit | Delete a plan item time |

## Plan Feed

Base path: `/doing/planFeed`

Provides plan item feeds for the presenter. If no plan items exist, auto-populates from the Lessons.church venue feed using the plan's `contentId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Get plan feed for presenter (auto-populates from venue feed if empty) |
| GET | `/signage/:planTypeId` | Public | — | Signage feed for a plan type's current plan (the earliest plan dated yesterday or later): `{ messages: [{ name, files: [{ name, url, seconds, loopVideo, mediaType }] }], planName, lessonName, venueName }`. Messages come from the plan's service order items, or from the linked Lessons.church venue feed when the plan has none. Returns `{ messages: [] }` when the plan type has no current plan |

## Positions

Base path: `/doing/positions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a position by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple positions by comma-separated IDs |
| GET | `/plan/ids?planIds=` | JWT | — | Get positions for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all positions for a plan |
| POST | `/` | JWT | Plan edit | Create or update positions |
| DELETE | `/:id` | JWT | Plan edit | Delete a position |

## Times

Base path: `/doing/times`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | List all times for the church |
| GET | `/:id` | JWT | — | Get a time by ID |
| GET | `/plans?planIds=` | JWT | — | Get times for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all times for a plan |
| POST | `/` | JWT | Plan edit | Create or update times |
| DELETE | `/:id` | JWT | Plan edit | Delete a time |

## Assignments

Base path: `/doing/assignments`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Get assignments for the current user |
| GET | `/my/upcoming` | JWT | — | Up to 20 of the current user's assignments on plans dated from yesterday on (penciled-in, or `prepared`, plans are skipped), soonest first: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Backs the serving preview on the member home page |
| GET | `/my/calendar` | JWT | — | Credentials for the current user's personal serving calendar feed: `{ churchId, personId, token }`. Pass all three as the query string of `GET /public/calendar` to build a subscription link. 400 when the login has no linked person |
| GET | `/monthCounts?date=` | JWT | — | Number of non-declined assignments each person has on plans in the calendar month of `date` (defaults to the current month): `[{ personId, count }]` |
| GET | `/picker/:positionId` | JWT | Plan edit | Context for choosing a volunteer for a position, covering the members of the position's group: `{ lastServed: [{ personId, serviceDate }], sameDay: [{ personId, planId, planName, positionName }] }`. `lastServed` is when each last served before this plan's date; `sameDay` is what else they serve that day. Both are empty when the position has no group or the plan has no date |
| GET | `/public/calendar?churchId=&personId=&token=` | Public | — | iCalendar feed (`text/calendar`) of a person's Accepted assignments on published plans dated from 60 days ago on (up to 500). One event per service time that applies to the position's team, or else per `service`-type time; a plan with no usable times becomes an all-day event. The `token` from `GET /my/calendar` is the credential and must match the church and person (401 otherwise) |
| GET | `/public/respond?token=` | Public | — | HTML confirmation page behind the Accept and Decline links in serving request emails. Shows a confirm button (and, for a decline, an optional reason field); nothing changes until the form is posted. The signed, expiring `token` is the credential: 400 when it is invalid or expired, or when the request has since changed (different person, position, plan, or date, or the plan is back in draft); 404 when the assignment no longer exists |
| GET | `/:id` | JWT | — | Get an assignment by ID |
| GET | `/plan/ids?planIds=` | JWT | — | Get assignments for multiple plans by comma-separated plan IDs |
| GET | `/plan/:planId` | JWT | — | Get all assignments for a plan |
| POST | `/` | JWT | Plan edit | Create or update assignments (defaults status to "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Accept an assignment (must be the assigned person) |
| POST | `/decline/:id` | JWT | — | Decline an assignment (must be the assigned person) |
| POST | `/my/calendar/reset` | JWT | — | Issue a new calendar token for the current user, which stops every link issued earlier from working. Returns `{ churchId, personId, token }` |
| POST | `/public/respond?token=` | Public | — | Apply the response carried by the token: sets the assignment to Accepted or Declined, notifies the ministry's leaders, and on a decline stores the optional form field `reason` (up to 255 characters) and fills the position with a replacement when the plan has `autoReplaceOnDecline`. Returns an HTML page; same token rules and errors as the GET |
| POST | `/signup` | JWT | — | Self-signup for a position. Body: `{ positionId }`. The position must allow self-signup and have room; creates an Accepted assignment. Rejected with "Signup deadline has passed" once the plan's signup deadline (counted back from its first service time, as above) has passed |
| DELETE | `/signup/:id` | JWT | — | Remove your own self-signup. Rejected with "Removal deadline has passed" after the plan's signup deadline |
| DELETE | `/:id` | JWT | Plan edit | Delete an assignment |

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Get a blockout date by ID |
| GET | `/ids?ids=` | JWT | — | Get multiple blockout dates by comma-separated IDs |
| GET | `/my` | JWT | — | Get blockout dates for the current user |
| GET | `/upcoming` | JWT | — | Get all upcoming blockout dates for the church |
| POST | `/` | JWT | Plans.Edit or own record | Create or update blockout dates (defaults personId to current user if not provided) |
| DELETE | `/:id` | JWT | Plans.Edit or own record | Delete a blockout date |

## Scheduling Preferences

Base path: `/doing/schedulingPreferences`

One record per person, read by plan auto-fill: `maxPerMonth` (people at their cap for the plan's calendar month are skipped), `preferredTimes` (comma-separated service time names or clock times such as `9:00`; a person whose preferences match none of the plan's times is picked after the others), and `householdScheduling` (`none`, `together`, or `apart`: whether auto-fill schedules the person on the same day as others in their household).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Get the current user's scheduling preference |
| GET | `/people?ids=` | JWT | — | Get the preferences of several people by comma-separated person IDs (`[]` without `ids`) |
| GET | `/:id` | JWT | — | Get a scheduling preference by ID |
| POST | `/` | JWT | Plans.Edit or own record | Create or update scheduling preferences (batch). `personId` defaults to the current user. A person has one record, so saving updates their existing one |
| DELETE | `/:id` | JWT | Plans.Edit or own record | Delete a scheduling preference |

## Tasks

Base path: `/doing/tasks`

A task with a `workflowId` is a workflow card (see [Workflows](#workflows)). Cards are added by hand with `/addToWorkflow` and changed with the `/bulk/...` and `/:id/...` card actions below. The card actions from `/:id/moveStep` to `/:id/snooze` return the updated card, 404 when the card does not exist, and 401 when the caller may not edit it.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Get open tasks for the current user |
| GET | `/:id` | JWT | Can view the task: Tasks.View, or its subject, creator, or assignee (creator and assignee can be one of the caller's groups) | Get a task by ID |
| GET | `/:id/contact` | JWT | Can view the card | Contact info for the person a workflow card is about: `{ personId, displayName, mobilePhone, email }`. Lets an assigned caller without People access reach the person |
| GET | `/closed` | JWT | — | Get closed tasks for the current user |
| GET | `/timeline?taskIds=` | JWT | — | Get timeline data for tasks by comma-separated task IDs |
| GET | `/directoryUpdate/:personId` | JWT | Tasks.View or own record | Get directory update task for a person |
| GET | `/person/:personId` | JWT | Tasks.View | Every task and workflow card about a person, open and closed, newest first |
| GET | `/cards/my` | JWT | — | Open workflow cards assigned to the current user, ordered by `dueDate` |
| GET | `/board/:workflowId` | JWT | Tasks.View | Everything a workflow board needs in one call: `{ workflow, steps, cards, routes, actions }`. `steps` are in `sort` order, `cards` are the workflow's open cards (by `sort`, then `taskNumber`), and `routes` and `actions` are every step route and step action in the workflow |
| POST | `/` | JWT | Tasks.Edit, or any caller linked to a person for `?type=directoryUpdate` and `?type=accountDeletion` | Create or update tasks. Add `?type=directoryUpdate` to handle directory update tasks (auto-uploads photos). Without Tasks.Edit, a `directoryUpdate` request can only create a task (an `id` returns 401), about the caller or about a household member with the Child role when the caller is that household's Head or Spouse (401 otherwise; a birth date on record must not show the child to be 18 or older or the caller to be under 18). An `accountDeletion` request is always filed about the caller. A task with a `workflowId` or `stepId` is refused (400) |
| POST | `/:id/conversation` | JWT | Tasks.Edit or card assignee | Attach the notes conversation to a card. Body: `{ conversationId }`. The first conversation attached wins; later calls return the card unchanged |
| POST | `/loadForGroups` | JWT | Tasks.View | Load tasks for specific groups. Body: `{ groupIds: [], status: "Open" }` |
| POST | `/:id/accountDeletionDecision` | JWT | People.Edit | Decide a member's account deletion request (a task with `taskType` `accountDeletion`). Body: `{ outcome, reason? }`, where `outcome` is `approved` or `rejected`. Approving anonymizes the person and removes their login; rejecting needs a `reason` of at least 10 characters. Either way the task is closed and the requester is told. 404 when the task is not a deletion request; 400 when it is already closed or the body is invalid |
| POST | `/addToWorkflow` | JWT | Tasks.Edit | Add one subject to a workflow as a card. Body: `{ workflowId, stepId?, associatedWith: { type, id, label } }` (`type` defaults to `person`). The card starts on `stepId`, or the workflow's first step, and that step's actions and `onEnter` routes run. A subject who already has an open card in the workflow gets that card back instead of a second one. Returns the card (`{}` when the workflow has no steps); 400 for a serving confirmation workflow, whose cards are issued from a plan |
| POST | `/bulkAddToWorkflow` | JWT | Tasks.Edit | Add several people to a workflow. Body: `{ workflowId, stepId?, people: [{ id, label }] }`. People who already have an open card in the workflow are skipped. Returns the cards created; 400 for a serving confirmation workflow |
| POST | `/bulk/moveStep` | JWT | Tasks.Edit or card assignee | Move several cards to a step, as `/:id/moveStep` does. Body: `{ ids, stepId }`. Returns `{ updated, skipped }` (arrays of ids); a card is skipped when it is missing, the caller may not edit it, or `stepId` is not in its workflow |
| POST | `/bulk/complete` | JWT | Tasks.Edit or card assignee | Complete several cards without an outcome route, as `/:id/complete` does. Body: `{ ids }`. Returns `{ updated, skipped }` |
| POST | `/bulk/reassign` | JWT | Tasks.Edit or card assignee | Reassign several cards. Body: `{ ids, assignedToType, assignedToId, assignedToLabel }`. Returns `{ updated, skipped }` |
| POST | `/bulk/snooze` | JWT | Tasks.Edit or card assignee | Snooze several cards. Body: `{ ids, days }` or `{ ids, until }`, as for `/:id/snooze`. Returns `{ updated, skipped }`; with an invalid snooze every id comes back in `skipped` |
| POST | `/:id/moveStep` | JWT | Tasks.Edit or card assignee | Move a card to another step of its workflow. Body: `{ stepId }` (400 when the step is not in the card's workflow). This is a manual move: the step's actions and `onEnter` routes do not run, but its due date and, for an unassigned card, its default assignee still apply |
| POST | `/:id/skip` | JWT | Tasks.Edit or card assignee | Manually move a card to the next step in `sort` order. The card is returned unchanged when there is no next step |
| POST | `/:id/sendBack` | JWT | Tasks.Edit or card assignee | Manually move a card to the previous step. The card is returned unchanged when there is no previous step |
| POST | `/:id/complete` | JWT | Tasks.Edit or card assignee | Complete a card's current step. Body: `{ routeId? }`. With the id of a route on the card's current step, the card follows it: to the route's `targetStepId` (running that step's actions and `onEnter` routes), or, for a `targetWorkflowId`, the card is closed and a new card for the same subject starts in that workflow. With no route, or a route with no target, the card is closed. A serving confirmation card is not closed this way: it stays open, snoozed until the response deadline, until the volunteer answers |
| POST | `/:id/remove` | JWT | Tasks.Edit or card assignee | Close a card without running routes or actions, and record `Removed` in its history. Use this to take a card off a board; `DELETE /:id` rejects workflow cards |
| POST | `/:id/reassign` | JWT | Tasks.Edit or card assignee | Reassign a card. Body: `{ assignedToType, assignedToId, assignedToLabel }`. The change is recorded in the card's history, and a newly assigned person is notified unless they assigned the card to themselves |
| POST | `/:id/pin` | JWT | Tasks.Edit or card assignee | Pin or unpin a card's assignment. Body: `{ pinned }` (defaults to true). While pinned, a step's default assignee is not applied when the card enters it |
| POST | `/:id/snooze` | JWT | Tasks.Edit or card assignee | Snooze a card. Body: `{ days }` (a positive number) or `{ until }` (a future date-time, used when both are sent); 400 `Invalid snooze date` otherwise. Sets `snoozedUntil`, and the assigned person is notified when the snooze ends |
| DELETE | `/:id` | JWT | Tasks.Edit | Permanently delete a plain task (404 if not found). Workflow cards and account deletion requests are refused with 400: close a card with `POST /:id/remove`, and settle a deletion request with `POST /:id/accountDeletionDecision` |

## Workflows

Base path: `/doing/workflows`

Workflows replaced the earlier automations: the `/doing/automations` and `/doing/actions` endpoints no longer exist, and a scheduled automation is now a `schedule` workflow trigger. The pieces fit together like this:

- A **workflow** is a board made of ordered **steps** (its columns). Workflows can be filed under a **workflow category**.
- A **card** is a task with a `workflowId` and a `stepId`, about one subject (usually a person, in `associatedWithType` and `associatedWithId`). Cards are added and moved with the card actions under [Tasks](#tasks); `POST /doing/tasks` refuses them.
- A step has **step actions**, run in `sort` order when a card enters the step (send an email or text, wait some days, add the person to a group, create a task, call a webhook, and so on), and **step routes**, which decide where the card goes next. `onEnter` routes move it on automatically, always or when the person matches the route's conditions. `onComplete` routes are the outcomes a caller picks when completing the card; one leads to another step, to another workflow, or closes the card.
- **Workflow triggers** add cards automatically. An `event` trigger fires on activity elsewhere in the API (a person created, a donation, a form submission, a group join, and others) and filters it with a condition tree stored on the trigger. A `schedule` trigger is evaluated shortly after midnight in the church's time zone and adds every person matching its **conditions**, which are grouped with AND/OR by **conjunctions**. `personMatch` step routes use the same conditions and conjunctions.
- Each time a trigger adds a card it records an **execution** (`pending`, `success`, `failed`, or `paused`). A failed attempt is retried automatically, up to 6 attempts in all, and executions can be retried, paused, and resumed by hand.

A workflow whose `workflowType` is `assignmentConfirmation` is a serving confirmation workflow. Its cards are issued from a plan, one per assignment (`POST /doing/plans/:id/issueRequests`), and they close when the volunteer accepts or declines, the request is changed or withdrawn, or its response deadline passes.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Tasks.View | List all workflows for the church, by `sort` then name |
| GET | `/:id` | JWT | Tasks.View | Get a workflow by ID |
| GET | `/:id/report` | JWT | Tasks.View | Board report: `{ stepCounts, overdue, throughput }`. `stepCounts` is open cards per step (`[{ stepId, count }]`), `overdue` is the open cards past their `dueDate` and not snoozed (earliest due first), and `throughput` is cards closed per day over the last 30 days (`[{ day, count }]`) |
| GET | `/templates` | JWT | Tasks.Admin | Starter templates for new workflows: `[{ key, name, description, workflowType?, steps }]` |
| POST | `/` | JWT | Tasks.Admin | Create or update workflows (batch). Fields: `name`, `categoryId`, `active`, `sort`, `workflowType`. `workflowType` must be empty or `assignmentConfirmation`, and cannot be changed once the workflow exists (400) |
| POST | `/fromTemplate` | JWT | Tasks.Admin | Create a workflow from a starter template, with the template's steps, step actions, and routes. Body: `{ templateKey, name? }`. 404 for an unknown key. The `assignmentConfirmation` template sends texts, so it also requires Texting.Send (401) |
| POST | `/:id/duplicate` | JWT | Tasks.Admin | Copy a workflow, named after the original plus `(copy)`, with its steps and step actions. Step routes and their conditions are copied only for a serving confirmation workflow; triggers and cards are never copied. Returns the new workflow; 404 if the source is not found |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a workflow with its triggers, steps, step actions, and step routes. Its open cards are closed, not deleted |

## Workflow Categories

Base path: `/doing/workflowCategories`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Tasks.View | List workflow categories, by `sort` then name |
| GET | `/:id` | JWT | Tasks.View | Get a workflow category by ID |
| POST | `/` | JWT | Tasks.Admin | Create or update workflow categories (batch). Fields: `name`, `sort` |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a workflow category. Workflows that reference it are left as they are |

## Workflow Steps

Base path: `/doing/workflowSteps`

A step belongs to a workflow (`workflowId`) and has a `name`, a `sort`, optional `instructions`, a default assignee (`defaultAssignToType`, `defaultAssignToId`, `defaultAssignToLabel`) given to an unassigned card that enters the step, and `expectedResponseDays`, which sets the card's due date on entry.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/workflow/:workflowId` | JWT | Tasks.View | List a workflow's steps in `sort` order |
| GET | `/:id` | JWT | Tasks.View | Get a step by ID |
| POST | `/` | JWT | Tasks.Admin | Create or update steps (batch) |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a step and its step actions. Open cards on the step move to the workflow's first remaining step, or are closed when no step is left; serving confirmation cards on the step are closed |

## Workflow Step Routes

Base path: `/doing/workflowStepRoutes`

A route belongs to a step (`stepId`, with its `workflowId`) and has a `trigger` (`onEnter` or `onComplete`), a `kind` (`always`, `personMatch`, or `outcome`), a `label`, and a `sort`. Its target is `targetStepId` to move within the workflow, `targetWorkflowId` (`onComplete` only) to hand the subject to another workflow, or neither to close the card. When a card enters a step, its `onEnter` routes are checked in `sort` order and the first that matches is followed.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/step/:stepId` | JWT | Tasks.View | List a step's routes in `sort` order |
| GET | `/workflow/:workflowId` | JWT | Tasks.View | List every route in a workflow |
| POST | `/` | JWT | Tasks.Admin | Create or update routes (batch). Saving a `personMatch` route also creates its root conjunction (`groupType` `and`) when it has none, ready for conditions |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a route with its conditions and conjunctions |

## Workflow Step Actions

Base path: `/doing/workflowStepActions`

An action belongs to a step (`stepId`) and has a `sort`, an `actionType`, and `config`, a JSON string whose keys depend on the type:

- `delay`: `days`. Parks the card; the step's remaining actions run when the wait ends.
- `addNote`: `note`.
- `sendEmail`: `templateId`, `subject`. `sendText`: `message`. Both go to the card's person.
- `addToGroup`, `removeFromGroup`, `recordAttendance`: `groupId`, `groupLabel`.
- `addToWorkflow`: `workflowId`, `stepId`, `workflowLabel`.
- `setField`: `field`, `value`, `fieldLabel`.
- `createTask`: `title`, `description`, `dueDays`, `assignedToType`, `assignedToId`, `assignedToLabel`.
- `notifyPerson`: `personId`, `personLabel`, `message`.
- `webhook`: `url`. Posts `{ cardId, workflowId, stepId, personId, personName }` as JSON.
- `sendAssignmentRequest` (serving confirmation workflows only): `channel` (`email` or `sms`), `message`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/step/:stepId` | JWT | Tasks.View | List a step's actions in `sort` order |
| GET | `/workflow/:workflowId` | JWT | Tasks.View | List the actions of every step in a workflow |
| POST | `/` | JWT | Tasks.Admin | Create or update step actions (batch). 404 when an action's `stepId` is not found; 400 when `config` is not valid JSON. `sendAssignmentRequest` is accepted only in a serving confirmation workflow, needs a `channel` of `email` or `sms` (400), and with `sms` also requires Texting.Send (401). Those workflows refuse `sendEmail`, `sendText`, and `addToWorkflow` (400) |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a step action |

## Workflow Triggers

Base path: `/doing/workflowTriggers`

A trigger has a `name`, a `triggerKind` (`event`, the default, or `schedule`), the `workflowId` it adds cards to, and an optional `stepId` to start on (otherwise the workflow's first step). An `event` trigger also has an `eventType` and `conditions`, a JSON string holding a filter tree: group nodes, `{ type: "group", conjunction, children }` with a `conjunction` of `AND` or `OR`, and condition nodes, `{ type: "condition", field, operator, value }`, whose `operator` is one of `=`, `!=`, `contains`, `>`, `<`, `>=`, `<=`, `in`, or `notIn`. `GET /fields` lists the event types and the fields each one offers. A `schedule` trigger has `recurs` (`daily`, `weekly`, `monthly`, or `yearly`), which limits each person to one card from the trigger per period, or one card ever when it is empty; its conditions are [Conditions](#conditions) grouped by [Conjunctions](#conjunctions). With `oncePerSubject` (default true) a subject who has ever had a card in the workflow is not added again; `allowRepeatAfterClose` (default false) narrows that to subjects with an open card. `active` defaults to true.

An execution is `{ id, triggerId, workflowId, subjectType, subjectId, subjectLabel, eventType, status, attemptCount, nextAttemptAt, lastError, dateCreated, dateCompleted }`, where `eventType` is the originating event, `schedule`, or `runNow`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Tasks.View | List all triggers for the church, by name |
| GET | `/workflow/:workflowId` | JWT | Tasks.View | List the triggers that add cards to a workflow |
| GET | `/fields` | JWT | Tasks.View | The event types an `event` trigger can use and the fields its conditions can test: `[{ eventType, label, recordType, fields: [{ key, label, type, options?, optionsSource? }] }]` |
| GET | `/:id/executions` | JWT | Tasks.View | A trigger's 100 most recent executions, newest first |
| GET | `/executions/workflow/:workflowId` | JWT | Tasks.View | A workflow's 200 most recent executions, newest first |
| GET | `/check` | Internal | — | Run every active `schedule` trigger now, for all churches. A server-to-server fallback for the scheduled timer, guarded by the internal API key header (401 without it). Returns `{ success: true }` |
| POST | `/` | JWT | Tasks.Admin | Create or update triggers (batch). Saving a `schedule` trigger also creates its root conjunction (`groupType` `and`) when it has none |
| POST | `/:id/runNow` | JWT | Tasks.Admin | Apply a trigger to everyone who matches it right now. A `schedule` trigger runs its conditions with its usual once-per-period and once-per-person rules. An `event` trigger is supported for `person.created` and `person.updated` (everyone matching its conditions) and for `group.member.added` and `list.member.added` (current members of the group or list named in its conditions), skipping anyone who has ever had a card in the workflow. Returns `{ created, skipped }`; 400 with `{ error }` for any other event type or a missing group or list condition; 404 if not found |
| POST | `/:id/pauseAll` | JWT | Tasks.Admin | Deactivate a trigger and pause its pending executions. Returns the trigger; 404 if not found |
| POST | `/:id/resumeAll` | JWT | Tasks.Admin | Reactivate a trigger and return its paused executions to pending, due immediately. Returns the trigger; 404 if not found |
| POST | `/executions/:id/retry` | JWT | Tasks.Admin | Retry an execution now and return it with its new status. 404 if not found; 400 when it already succeeded or its trigger has been deleted |
| POST | `/executions/:id/pause` | JWT | Tasks.Admin | Pause a pending execution so it is not retried. 404 if not found; 400 when it is not pending |
| POST | `/executions/:id/resume` | JWT | Tasks.Admin | Return a paused execution to pending, due immediately. 404 if not found; 400 when it is not paused |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a trigger with its conditions and conjunctions |

## Conditions

Base path: `/doing/conditions`

A condition is one test in the condition tree of a `schedule` workflow trigger or a `personMatch` step route. It belongs to a conjunction (`conjunctionId`) and has a `field`, `fieldData`, `operator`, `value`, and `label`. `field` is `today` (a test on the church's current date; `fieldData`, a JSON string, may set `datePart` to `dayOfMonth`, `dayOfWeek`, or `month`), `giving` (regular givers who have lapsed; `fieldData` sets `regularWeeks`, `minWeeks`, and `lapsedWeeks`), or a person field matched by the membership module, where `value` can be a relative token such as `{currentMonth}`. Saving or deleting a condition whose `field` is `giving` requires Donations.View in addition to Tasks.Admin.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Tasks.View | Get a condition by ID |
| GET | `/trigger/:id` | JWT | Tasks.View | Get all conditions for a workflow trigger |
| GET | `/stepRoute/:id` | JWT | Tasks.View | Get all conditions for a step route |
| POST | `/` | JWT | Tasks.Admin, plus Donations.View for a `giving` condition | Create or update conditions |
| DELETE | `/:id` | JWT | Tasks.Admin, plus Donations.View for a `giving` condition | Delete a condition |

## Conjunctions

Base path: `/doing/conjunctions`

Conjunctions group conditions into a tree. Each belongs to exactly one owner, a workflow trigger (`triggerId`) or a step route (`stepRouteId`), and can nest under another conjunction (`parentId`; the root has none). A `groupType` of `OR` matches people who meet any of its conditions and child groups; any other value requires all of them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Tasks.View | Get a conjunction by ID |
| GET | `/trigger/:id` | JWT | Tasks.View | Get all conjunctions for a workflow trigger |
| GET | `/stepRoute/:id` | JWT | Tasks.View | Get all conjunctions for a step route |
| POST | `/` | JWT | Tasks.Admin | Create or update conjunctions |
| DELETE | `/:id` | JWT | Tasks.Admin | Delete a conjunction |

## Content Provider Auths

Base path: `/doing/contentProviderAuths`

Manages OAuth authentication records for external content providers (e.g., presentation software integrations).

`accessToken` and `refreshToken` are encrypted at rest with `EncryptionHelper` and decrypted when read. The API returns `accessToken` as a plain token and leaves `refreshToken` out of every response; clients refresh through `POST /refresh`. Rows saved before encryption hold plain text (which never contains `|`); they are read as-is and encrypted the next time they're saved.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Plans.Edit | List all content provider auths |
| GET | `/:id` | JWT | Plans.Edit | Get a content provider auth by ID |
| GET | `/ids?ids=` | JWT | Plans.Edit | Get multiple content provider auths by comma-separated IDs |
| GET | `/ministry/:ministryId` | JWT | Plans.Edit | Get all content provider auths for a ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | Plans.Edit | Get auth record for a specific ministry and provider |
| GET | `/church` | JWT | Plans.Edit | List the church-level connections, the records with no `ministryId` |
| GET | `/church/:providerId` | JWT | Plans.Edit | Get the church-level connection for a provider |
| POST | `/` | JWT | Plans.Edit | Create or update content provider auths |
| POST | `/church/:providerId` | JWT | Plans.Edit | Create or replace the church-level connection for a provider. Body: `{ accessToken, refreshToken?, tokenType?, expiresAt?, scope? }`. `accessToken` is required (400); an omitted `refreshToken` keeps the stored one, and `tokenType` defaults to `Bearer` |
| POST | `/exchange` | JWT | Plans.Edit | Finish a provider's OAuth (PKCE) sign-in on the server and store the tokens. Body: `{ providerId, code, codeVerifier, redirectUri, ministryId? }`. Saves to that ministry's connection when `ministryId` is sent, otherwise to the church-level one, replacing what was stored. 400 when a parameter is missing, the provider does not support code exchange, or the exchange fails |
| POST | `/refresh` | JWT | Plans.Edit | Return a connection with a usable access token, refreshing it first when it has expired. Body: `{ providerId, ministryId? }`. Clients refresh through this route because responses from this controller leave out `refreshToken`. 404 `Not linked` when there is no connection; 400 when it cannot be refreshed |
| DELETE | `/:id` | JWT | Plans.Edit | Delete a content provider auth |

## Provider Proxy

Base path: `/doing/providerProxy`

Proxies requests to external content providers (e.g., ProPresenter, EasyWorship). Handles token refresh automatically when tokens expire.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | Plans.Edit | Browse content provider files. Body: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | Plans.Edit | Get presentations from a content provider. Body: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | Plans.Edit | Get a playlist from a content provider. Body: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | Plans.Edit | Get instructions for a content item. Body: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | Plans.Edit | Get expanded instructions for a content item. Body: `{ ministryId, providerId, path }` |

## Screens

Base path: `/doing/screens`

Signage screens are the church's devices registered with the FreePlay app. A screen plays the schedule of the screen group it is assigned to (the device's `contentType` is `freeplayScreen` and its `contentId` is the screen group ID). The two device routes are called by the screen itself and authenticate with the device's secret in the `x-device-secret` header.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Plans.Edit | List the church's FreePlay devices: `{ id, deviceId, label, deviceInfo, registrationDate, lastActiveDate, contentType, contentId, screenGroupId, screenGroupName, status }`. `screenGroupId` and `screenGroupName` are set for a device assigned to a screen group; `status` is its last report to `POST /status/:deviceId` |
| GET | `/timeZone` | JWT | Plans.Edit | `{ timeZone }`: the zone schedule entry times are read in (the church's, else its campus's, else `America/New_York`) |
| GET | `/manifest/:deviceId` | Public | — | The playback manifest a screen downloads: `{ timeZone, screenGroupName, generatedAt, rev, validUntil, fallbackTitle, fallback, occurrences }`. `occurrences` is the screen group's schedule for the next 7 days with overlaps resolved (`[{ id, title, start, end, endBehavior, items }]`), `fallback` is the items of the group's default playlist, and `rev` is a hash of the content for change detection. Each item has `cacheKey`, `title`, `mediaType`, `seconds`, `loopVideo`, `url`, optional request `headers`, and `resolve` (`url`, or `lan` for media the screen finds on its local network). Requires the `x-device-secret` header (401); 404 when the device is not assigned to a screen group or the group is gone |
| POST | `/status/:deviceId` | Public | — | Report a screen's status. The JSON body is stored as the device's `status` and its `lastActiveDate` is updated. Requires the `x-device-secret` header (401) |

## Screen Groups

Base path: `/doing/screenGroups`

A screen group is a set of screens that share one schedule. `defaultPlaylistId` names the group's fallback playlist, returned as `fallback` in the screen manifest.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Plans.Edit | List screen groups, by name |
| GET | `/:id` | JWT | Plans.Edit | Get a screen group by ID |
| POST | `/` | JWT | Plans.Edit | Create or update screen groups (batch). Fields: `name`, `defaultPlaylistId` |
| DELETE | `/:id` | JWT | Plans.Edit | Delete a screen group and its schedule entries |

## Playlists

Base path: `/doing/playlists`

A playlist is a named, ordered list of media `items`, each `{ id, title, mediaType, thumbnail, url, seconds, loopVideo, providerId, providerPath, fileId }` with a `mediaType` of `video`, `image`, or `audio`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Plans.Edit | List playlists, by name |
| GET | `/:id` | JWT | Plans.Edit | Get a playlist by ID |
| POST | `/` | JWT | Plans.Edit | Create or update playlists (batch). Fields: `name`, `items`; the server sets `updatedAt` |
| DELETE | `/:id` | JWT | Plans.Edit | Delete a playlist |

## Schedule Entries

Base path: `/doing/scheduleEntries`

A schedule entry puts content on a screen group's calendar (`screenGroupId`). `targetType` is `playlist` (`targetId` is a playlist ID), `planType` (`targetId` is a plan type ID, and the screen plays that plan type's current plan), or `providerFolder` (`providerId` and `providerPath`). `start` and `end` are wall-clock times in the church's time zone, written `YYYY-MM-DDTHH:mm:ss` with no offset. `recurrenceRule` is an iCalendar RRULE string (a rule that repeats more often than daily plays once), and `exceptionDates` lists dates to skip. `endBehavior` is `loop` (the default), `fallback`, or `teacherPaced`; the retired `holdLast` plays as `teacherPaced`. `enabled` defaults to true. Where entries overlap, the one that started latest plays.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Plans.Edit | List all schedule entries for the church, by `start` |
| GET | `/group/:screenGroupId` | JWT | Plans.Edit | List a screen group's schedule entries, by `start` |
| GET | `/:id` | JWT | Plans.Edit | Get a schedule entry by ID |
| POST | `/` | JWT | Plans.Edit | Create or update schedule entries (batch) |
| DELETE | `/:id` | JWT | Plans.Edit | Delete a schedule entry |

## Related Pages

- [Membership Endpoints](./membership.md) — People, groups, roles, and permissions
- [Attendance Endpoints](./attendance.md) — Service and visit tracking
- [Module Structure](../module-structure.md) — Code organization patterns
