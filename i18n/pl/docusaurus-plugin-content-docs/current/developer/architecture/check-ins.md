---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Check-in is one system with three entry points: the B1Checkin kiosk app for staffed and self-service stations, self check-in inside the B1App member portal, and admin-side attendance in B1Admin. All three write to the same attendance module in the core Api, and classroom routing is driven entirely by Groups. There is no separate "locations" or "rooms" entity. A child-safety layer sits on top: per-visit check-in types, server-side capacity and volunteer-ratio gates, kiosk-side age and grade eligibility, trusted-pickup verification at check-out, and parent paging through the church's texting provider. This page covers the data model, the check-in flows, the safety layer, and the label printing pipeline.

</div>

## Overview

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| Surface | Repo | Stack | Role |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Staffed or self-service station with label printing and verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Logged-in members check their household in from a phone; no printing |
| Admin | `B1Admin` | React SPA | Configures the service structure, assigns groups to service times, designs labels, records manual attendance, runs reports |

All three call the same two API modules through `ApiHelper`: **MembershipApi** (`/membership`) for people, households, and groups; **AttendanceApi** (`/attendance`) for everything below.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated here. Campuses are mastered in the membership module (`/membership/campuses`); the attendance copy is frozen read-only for legacy readers (`models/Campus.ts`) |
| `services` | campusId, name | A recurring gathering, e.g. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | A time slot within a service, e.g. "9:00 AM" (`models/ServiceTime.ts`). The schedule columns are optional (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) and drive the [check-in window](#scheduled-check-in-windows) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: which groups (classrooms) meet at which service times (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | One meeting of one group on one date. Created lazily at check-in time (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | One person attending on one date (`models/Visit.ts`). `checkinType` is `member` / `guest` / `volunteer` (NULL = legacy member), set by the kiosk and consumed by the capacity and ratio gates |
| `visitSessions` | visitId, sessionId | Which session(s) a visit covers. A child checked in to two service times gets two rows (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### How a completed check-in is saved

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) handles `POST /attendance/visits/checkin?serviceId=&peopleIds=`. The body is an array of `Visit` objects, each carrying `visitSessions` whose embedded `session` names only a `(serviceTimeId, groupId)` pair. The server then:

1. **Checks capacity and ratios before any write.** `evaluateGates()` → `CheckinGateHelper.evaluate()` checks each targeted room's capacity, guest capacity, closed flag, and volunteer ratio against current occupancy. postCheckin is **not transactional**, so the gate must run before the first save. A hard violation returns a 409 naming the offending room(s), and nothing is saved. See [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Resolves sessions lazily.** `getSessionId()` finds or creates the `sessions` row for `(groupId, serviceTimeId, today)`. Session ids are cached in-process per date. New sessions emit a `session.created` webhook. The loop is an awaited `for..of`. An earlier fire-and-forget `forEach(async …)` raced the save and wrote NULL sessionIds on first-session creation. That is fixed, and a code comment at the loop explains it.
3. **Replaces the day's records.** Any existing visits for those people at that service today are deleted along with their visitSessions, then the submitted set is saved. Re-checking-in a family is therefore an idempotent "this is the current state" operation, not an append. Passing `?checkDuplicates=true` instead returns `{ duplicates: [personId…] }` without writing, which is how the kiosk warns before overwriting.
4. **Generates one security code per batch.** `SecurityCodeHelper.generate()` produces a 4-character code from the alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ`. The alphabet has no vowels or ambiguous characters, so codes can't spell words or be misread. The server retries on collision against the same church's same-day open visits and stamps the code on every visit in the batch.
5. **Returns `{ streaks, securityCode }`.** `streaks` maps personId to consecutive-week attendance count. The kiosk celebrates milestones (every 5th week) with confetti.

Each saved visit also emits an `attendance.recorded` webhook. The read side, `GET /attendance/visits/checkin`, returns the people's visits from their **last logged date**. If that was a previous week, the ids are stripped, so the client receives a pre-filled copy of last week's room selections that will save as new records.

### Check-out

Two endpoints complete the loop (`VisitController`):

- `GET /attendance/visits/code/:code` returns today's visits that have not yet been checked out and carry that security code, with sessions populated.
- `POST /attendance/visits/checkout` takes body `{ visitIds, checkedOutBy?, checkedOutById? }`, stamps `checkoutTime` and who picked up, and emits an `attendance.checkout` webhook for each visit.

Permissions: kiosks authenticate with `attendance.checkin`. That grants exactly the check-in, check-out, and label-template surface, plus the household lookups a kiosk needs without `people.view` (phone and name search, household members in the check-in model, and the household pickup list). B1Checkin's `SessionHelper.filterChurches` only offers churches where the account holds `Attendance/Checkin` or `Attendance/Edit`. `Checkin` is no longer part of the Everyone (null-role) permissions (`RoleHelper` and migration `2026-11-01_remove_everyone_checkin`), so it must be granted through a real role. `attendance.view` and `attendance.edit` cover reporting and manual entry. The structure (services, service times, group assignments) requires `services.edit`. Member self check-in (B1App) needs no permission at all: any authenticated user with a linked person in the church may call `GET`/`POST /attendance/visits/checkin`. The server restricts the submitted `personId`s to the caller's own household and returns 403 otherwise. This fence is what keeps other families' `securityCode`s unreadable. Membership is the grant. Whether members *see* the feature is controlled by the church's B1App navigation tabs. The other check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) remain kiosk and staff only.

## Groups drive room routing

There is no room or classroom entity anywhere in the system. A "room" is a membership **group** with `trackAttendance` enabled, linked to one or more service times through `groupServiceTimes`. The group fields (on `Api/src/modules/membership/models/Group.ts`) that shape kiosk behavior:

| Field | Effect |
|------|--------|
| `trackAttendance` | Group participates in attendance at all. B1Admin's setup tree flags `trackAttendance` groups with no `groupServiceTimes` row as unassigned |
| `parentPickup` | Marks a child room. Checking in to it makes the visit a "child" visit, which prints a family pickup label and puts the security code on the nametag |
| `printNametag` | Whether check-ins to this group print a nametag at all |
| `capacity` / `guestCapacity` / `checkinClosed` | Room capacity limits and a hard "closed" switch, enforced server-side by the check-in gate (edited in B1Admin's group settings under "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Children-per-volunteer ratio and minimum volunteer headcount, enforced per the church-wide `ratioEnforcement` setting |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age and grade eligibility bounds, evaluated kiosk-side to highlight or dim rooms |

Every client denormalizes the same way (e.g. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). Each client loads `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, and `GET /membership/groups` in parallel. Then, for each service time, it collects the groups whose `groupServiceTimes` row points at it into `serviceTime.groups`. That array is what the room picker shows, organized by group `categoryName`.

Assignments are edited from the group's page in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, using `POST`/`DELETE /attendance/groupservicetimes`). The whole Campus → Service → Service Time → Group tree is visualized in `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Because groups are the single source of truth, the same group membership powers kiosk routing, roster-style attendance in B1Admin's group pages, and attendance reporting. Assigning a group to a service time is the only step needed to make it a check-in destination.
:::

## Child safety

### Check-in types

Every visit carries a `checkinType`: `member`, `guest`, or `volunteer`. NULL means legacy member (migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). The type is chosen **kiosk-side**. Member, Guest, and Volunteer chips on the expanded member row (`B1Checkin/src/components/MemberServiceTimes.tsx`) set it, and it is stamped onto each pending visit at completion (`app/checkinComplete.tsx`, defaulting to `member`). The server uses it in the gate. Volunteers count toward ratio coverage instead of against capacity, and guests count against `guestCapacity`.

### Capacity and volunteer-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) runs inside `postCheckin` before any save. The endpoint is non-transactional, so gating before save is the correctness mechanism. It loads current occupancy per targeted group (`VisitRepo.countActiveByGroupToday`) and the group config through the membership module gateway, then classifies violations:

- **Hard (always blocks):** `checkinClosed`, `current + incoming > capacity`, or guest count over `guestCapacity`. The batch is rejected with `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`, and the kiosk shows the named room.
- **Ratio (warns or blocks):** incoming non-volunteers into a room where `volunteers < minVolunteers`, where there are no volunteers at all, or where `children > volunteers × volunteerRatio`. Severity follows the per-church `ratioEnforcement` setting (`"warn"` by default, or `"block"`, edited in B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Warn mode returns `409 { warning: true, error: "ratio", … }` unless the client resubmits with `acknowledgeWarnings=true`. That resubmission is the kiosk's staff-confirm override.

### Scheduled check-in windows

A service time may carry an optional weekly schedule: `dayOfWeek` 0–6 (0 = Sunday), `startTime`/`endTime` as `HH:mm`, and `checkinOpenMinutes`/`checkinCloseMinutes`. It is edited in B1Admin's **Attendance → Setup** service-time form (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` treats a service time as scheduled only when both `dayOfWeek` and `startTime` are set. Unscheduled times are never time-gated. `isServiceTimeOpen()` computes the window in local wall-clock time (`DateHelper.toChurchTime`).

The zone is resolved per service time by `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`). It checks, in order: the `timezone` of the service's campus (`service.campusId`, via `MembershipModuleGateway.loadCampusTimeZones`), then the church's `timeZone` (set in B1Admin's Church Information), then the first non-removed campus that has a `timezone` (`loadCampusTimeZone`), and only then `America/New_York`. The campus comes first because most churches had `America/New_York` backfilled as their church zone. The listing and posting paths below both resolve the zone the same way.

The window runs from `checkinOpenMinutes` before the start to `checkinCloseMinutes` after the end (or after the start when there is no end). It handles windows that cross midnight or the week boundary.

The window is enforced in two places:

- **Listing:** `GET /attendance/servicetimes` stamps each row with a computed `checkinOpen` boolean. B1App's self check-in (`CheckinPage.tsx`) and B1Checkin's service picker (`app/services.tsx`) keep every time. When all of a service's times are closed, they show the soonest opening: "Check-in opens Sun 9:30 AM." in B1App, or "Check-in for this service opens Sun 9:30 AM." in B1Checkin, from `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`. If no opening can be computed, they fall back to "Check-in isn't open for this service right now." (the kiosk offers a Back button to pick another service). Otherwise, closed times render as a non-selectable "Closed" or "Closed · opens 9:30 AM" row. B1Checkin's household screen (`MemberServiceTimes.tsx`) re-evaluates openness live on the device clock with `ServiceTimeHelper.isCheckinOpen()` (device time zone, not the church's), so a kiosk left running opens and closes on time. On a closed time that the person already holds, it shows "Kids Room 1 · Checked in" (the group name).
- **Posting:** inside `evaluateGates()`, before the capacity and ratio evaluation, `findClosedServiceTimeGroups()` rejects the batch with `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` if any targeted session's service time is outside its window. Because a household's existing visits for today are re-posted with every check-in, sessions the person already holds (`personId|sessionId` in the existing visits) skip this gate. That means adding a later open service time isn't refused just because an earlier window has closed. B1Checkin shows this through its hard-gate screen with the reason "check-in isn't open right now" (capacity violations still read "room is full or closed").

### Age and grade eligibility (kiosk-side)

Room eligibility is advisory UI, evaluated on the kiosk and not enforced by the server. `B1Checkin/src/helpers/EligibilityHelper.ts` compares a person's birthdate and grade against the group's `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (grade order: PreK, K, 1–12, Graduated). It returns `eligible`, `ineligible`, or `unknown`. Missing data yields `unknown` and never hides a room. Ages and grades are computed as of the church's **grade promotion date** (`gradePromotionDate` setting, `"MM-DD"`, edited in `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`). The kiosk fetches it from `GET /attendance/checkin/settings`, and `resolveAsOfDate` picks the most recent occurrence on or before today. The room picker highlights eligible rooms and dims ineligible ones. Picking a dimmed room requires staff confirmation.

### Trusted and not-authorized pickup

Pickup people are a membership entity, kept per household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts`, with householdId, optional personId, name, photoUrl, relationship, `status` of `trusted` or `notAuthorized`, and notes). CRUD is `GET /membership/householdpickup/:householdId` (any authenticated church user, so kiosks can read it), plus `POST` and `DELETE` gated by `people.edit`. Staff manage the list on the person page's **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`), which shows the photo, relationship, and a Trusted or Not Authorized status chip.

At check-out (`B1Checkin/app/checkout.tsx`), the kiosk loads the household's pickup list. `trusted` entries render as tappable pickup cards alongside the household-adult photo grid. A free-typed "Other" name is fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) against `notAuthorized` entries. A match blocks check-out with a warning sheet and a staff **Override** button. The override is logged on the visit itself: it posts `checkedOutBy` as `"OVERRIDE: {name}"` through the normal `POST /attendance/visits/checkout`. It therefore lands in the attendance record and the `attendance.checkout` webhook, not in a separate audit table.

### Paging a parent and emergency broadcast

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) exposes two SMS endpoints:

- `POST /page` takes `{ visitId, message }` and pages the guardians of one checked-in child (kiosk check-out screen, manned mode).
- `POST /broadcast` takes `{ serviceId, message }` and texts every checked-in household's adults for a service (kiosk admin settings, behind a type-`EMERGENCY`-to-confirm sheet in `B1Checkin/app/adminSettings.tsx`).

Both resolve household adults through the membership gateway, then hand delivery to **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`). That is the cross-module door into the church's configured texting provider (`@churchapps/texting`: TextInChurch, Clearstream, or MutualMinistry). There is no built-in SMS sender. The gateway logs a `sentText` row plus per-recipient `deliveryLog` entries and caps a batch at 500 recipients. With no provider configured, it returns `no_provider`, which the kiosk surfaces as "No SMS provider configured". The controller's `dispatch()` dedupes phone numbers and skips people with no mobile number or with `optedOut` set. It returns `{ sent, failed, skippedOptedOut, skippedNoPhone }` so the kiosk can show what was skipped.

## The kiosk (B1Checkin)

Screens are expo-router files under `B1Checkin/app/`. Cross-screen state lives in a static `CachedData` class (`src/helpers/CachedData.ts`), not in React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`): search by phone (`GET /membership/people/search/phone?number=`, last four digits or full number) or by name (`GET /membership/people/search?term=`). Selecting a match loads the household (`GET /membership/people/household/{householdId}`) and existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` with last week's selections.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`): each member row shows an already-checked-in badge, an allergy or `nametagNotes` badge, and their current room chips. Expanding a member lists every service time with a room button, plus the Member / Guest / Volunteer check-in-type chips (`MemberServiceTimes.tsx`). Under each service time name, `ServiceTimeHelper.getGroupSummary()` shows the groups offered there (the `serviceTime.groups` names, trimmed, de-duplicated case-insensitively, and comma-joined). Nothing renders when the time has no groups.
3. **Group assignment** (`app/selectGroup.tsx`): a category tree built from `serviceTime.groups`, with age- and grade-eligible rooms highlighted and ineligible ones dimmed behind a staff confirm (see [Age and grade eligibility](#agegrade-eligibility-kiosk-side)). Picking a room writes a `{ session: { serviceTimeId, groupId } }` visitSession into that person's pending visit (`src/helpers/VisitSessionHelper.ts`). "None" clears it.
4. **Complete** (`app/checkinComplete.tsx`): `POST /attendance/visits/checkin` with `pendingVisits` (each stamped with its `checkinType`), then prints labels if a printer is configured and auto-returns to lookup. A `409` capacity or `notOpen` response shows the named room with the reason (full or closed, or check-in not open). A ratio warning offers a staff confirm that resubmits with `acknowledgeWarnings=true`.

The **check-out** screen (`app/checkout.tsx`) accepts the 4-character security code through an auto-focused input, so USB or Bluetooth keyboard-wedge barcode scanners work with no camera. It also offers an on-screen keypad using the same alphabet, which auto-submits at 4 characters. A **Scan** button opens a sheet with the shared `src/components/CodeScanner.tsx` camera (back-facing by default, accepting QR, Code 128, and Code 39), so stations without a wedge scanner can read the pickup label. A scanned code feeds the same `handleCode()` path as typed input. The screen looks up the code, shows the children being picked up, and presents the household's **trusted pickup people** as tappable cards alongside a photo grid of household adults. An "Other" free-text option is fuzzy-checked against not-authorized names (see [Trusted and not-authorized pickup](#trusted-and-not-authorized-pickup)). It then posts `POST /attendance/visits/checkout` with the picker's name and id. In manned mode, the screen also offers **Page a parent** (`POST /attendance/checkin/page`) and a **security-label reprint**. `reprint()` rebuilds the family's labels with `LabelHelper.getAllLabelsFor(...)` and feeds them through the same `PrintUI` pipeline as check-in.

Station personality is an AsyncStorage flag, `@StationMode` (`"self"` or `"manned"`, toggled in `app/adminSettings.tsx`). Manned mode adds the check-out entry point on the lookup screen and per-member profile editing (`POST /membership/people`) from the household screen. Kiosk hardening is built in: an optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates the admin and printer screens. The admin screen opens only after seven rapid taps on the header logo. An idle attract screen (`src/hooks/useInactivityTimer.ts`) takes over between families.

## Self check-in (B1App)

Members check in from the b1.church portal at the `/mobile/checkin` screen (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` to `screens/CheckinPage.tsx`). It requires a logged-in user and walks the same four steps as the kiosk (services → household → groups → complete) against the identical endpoints, with state held in `B1App/src/helpers/CheckinHelper.ts`. The differences from the kiosk: the household comes from the logged-in user's own `householdId` (there is no search step), and there is no label printing. Instead, the completion screen shows the batch's security code as a QR (`qrcode.react`) with a "show this at a check-in station" hint. If the household is already checked in when the page loads, a "Show check-in code" button re-displays the QR from the first existing visit (from `GET /attendance/visits/checkin`) that carries a `securityCode`. The check-in is recorded immediately at submit time (there is no pending state). The QR only drives label printing at the kiosk.

**Phone-to-kiosk label printing** (`B1Checkin/app/scan.tsx`, reached from the QR "Scan code" button on the lookup screen): the kiosk shows `CodeScanner` (an `expo-camera` `CameraView`, front-facing by default and flippable) scanning for QR codes. `ScanCodeHelper.parse()` accepts a payload only when it is a bare 4-character code in the security-code alphabet. `ScanCodeHelper.isRepeat()` ignores the same code for 4 seconds, so both the B1App QR and a printed label's QR block work. The screen then follows the check-out reprint path (`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`) and returns to lookup. No attendance write happens at scan time, so it is labels only. Codes with no active visits, stations with no printer, and groups with no labels each surface a toast and return to lookup.

Types and `ApiHelper`/`ArrayHelper` come from `@churchapps/helpers` and `@churchapps/apphelper`. No React components are shared with B1Admin.

## Admin-side attendance (B1Admin)

- **Setup:** `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renders the structure tree and creates services (`ServiceEdit.tsx`) and service times (`ServiceTimeEdit.tsx`). Campus data comes from membership via the `useCampuses()` hook.
- **Manual attendance** lives on the Groups side, not in the attendance section. `B1Admin/src/groups/components/GroupSessionsTab.tsx` creates sessions (`POST /attendance/sessions`). When adding, `SessionEdit.tsx` can include one session per other group sharing the chosen service time, skipping groups that already have a session on that date. Staff mark people present via `POST /attendance/visitsessions/log`, which finds or creates the visit for that person and session. Group leaders can record attendance for their own groups without the `attendance.edit` permission, because the controllers check `au.leaderGroupIds`.
- **Reporting:** attendance trend and group attendance are server-defined reports (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi; definitions in `Api/reports/*.json`). Both take `startDate`/`endDate` (end date inclusive). The trend report defaults to one year ago through today and adds a per-week `sessionDates` column. The group attendance on-screen tree includes each visit's `checkinTime` and the person's `membershipStatus`. Group attendance's CSV comes from the companion `groupAttendanceDownload` report, pivoted by `GroupAttendanceDownloadHelper` into one row per group member, with a present or absent column for each dated session. Per-person history is available at `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Templates and the designer

Churches design their own labels in B1Admin at `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, reached from the Check-In settings page). A template is a `labelTemplates` row whose `content` is a JSON array of blocks: `text`, `field`, `barcode`, `qrcode`, or `box`. Each block is positioned in percent coordinates, with font, alignment, symbology (`code39`/`code128`/`qr`), and optional visibility conditions (e.g. only render the allergy box when `person.nametagNotes` is non-empty). Two `labelType`s exist:

- `nametag`: one per checked-in person. Fields include `person.displayName`, `sessions`, `securityCode`, and `person.isBirthdayWeek`, which is `"true"` when the birthday's month and day fall within 3 days of today, wrapping across year end (computed by `LabelHelper.isBirthdayWithin()`).
- `pickup`: one per family. Fields include `children` and `childrenAllergies`.

The server enforces a single default per type per church (`LabelTemplateController.save`). The designer ships starter templates that mirror the kiosk's bundled labels, and it previews against sample data.

### Rendering and printing on the kiosk

At check-in completion, `B1Checkin/src/helpers/LabelHelper.ts` decides what to print from the group flags on each pending visit: nametags for `printNametag` groups, plus one family pickup label if any visit hit a `parentPickup` group. Visits with `checkinType` `volunteer` are skipped by `LabelHelper.selectChildVisits()`, so a childcare worker in a Parent Pickup room never triggers a pickup label. The security code from the check-in response goes onto child nametags and the pickup label. Adult nametags print without a code. If the church has templates, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) turns blocks and a field context into a standalone HTML document. Otherwise, bundled HTML labels in `B1Checkin/assets/labels/` are used with placeholder substitution.

Barcodes are generated as inline SVG by pure-TypeScript encoders in `B1Checkin/src/helpers/barcode.ts`: Code 39 pattern tables, Code 128 (code set B with mod-103 checksum) width tables, and QR via the `qrcode` package. **These encoders are intentionally duplicated in B1Admin** (`LabelEditor.tsx` inlines the same tables, as noted in a code comment), so designer previews are pixel-faithful to kiosk output. A change to one must be mirrored in the other.

The print pipeline (`src/components/PrintUI.tsx`) renders each HTML label in a `WebView`, captures it to JPG via `react-native-view-shot`, and hands the image URIs to the native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). The module exposes `scan()`, `checkInit()`, `printUris()`, and status events, with a provider per brand on both platforms:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, the recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery and TCP/ZPL image printing |

Printer selection lives at `app/printers.tsx`. A network scan returns `brand~model~ip` entries, and the choice persists to AsyncStorage. `src/helpers/PrinterLog.ts` keeps an on-device diagnostic log, surfaced through a live status dot in the kiosk header.

## Guest registration

Two paths create a person mid-check-in:

- **At the kiosk:** the household screen's "Add guest" opens `B1Checkin/app/addGuest.tsx`. It first searches `GET /membership/people/search?term=` for an existing non-member match, and otherwise creates one with `POST /membership/people`, attached to the current household. The guest then flows through group assignment like any member.
- **Self-serve via QR:** when the church setting `enableQRGuestRegistration` is on (configured in B1Admin's Check-In settings and read from `GET /membership/settings/public/{churchId}`), the kiosk lookup screen shows a QR code linking to `https://{subdomain}.b1.church/guest-register?serviceId=`. That B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lets a visiting family register on their own phone through the anonymous `POST /membership/people/guest-register` endpoint, keeping the kiosk line moving. The QR sheet also has a **Register here** button that opens the same page on the kiosk (`app/guestRegister.tsx`) in an incognito, cache-disabled `WebView`. `src/helpers/GuestRegisterHelper.ts` builds the URL for both the QR and the WebView, and blocks navigation off `https://{subdomain}.b1.church/guest-register`. The screen returns to lookup on **Done**, on back, or after 120 seconds of inactivity (form typing is relayed from the WebView as activity), unmounting the WebView so one family's entries never reach the next.

The QR sign-up is driven by church settings saved from the **QR Guest Registration** card in B1Admin (`src/mobile/CheckInPage.tsx`):

| Setting | Visibility | Purpose |
|---|---|---|
| `enableQRGuestRegistration` | public | Opt-in switch for the kiosk QR and the anonymous endpoints |
| `guestRegistrationFields` | public | JSON map of `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Default: email and phone optional, the rest off. First and last name are always required |
| `guestRegistrationImage` | public | Header photo URL. B1App renders it 16:9 in place of the icon on the form and the confirmation screen |
| `guestRegistrationGroupId` | private | Group every sign-up is added to (guests never see or pick it) |
| `guestRegistrationRecordAttendance` | private | `"true"` to also record attendance for that group |

B1App's `src/components/checkin/GuestRegister.tsx` fetches the checklist from the anonymous `GET /membership/people/guest-register/options?churchId=` and renders only the included fields (email, phone, marital status, and address on the primary contact; birth date, gender, and grade per member; one comments box), sending only those. The server re-applies the checklist in `GuestRegistrationHelper.sanitize()`: off fields are dropped, and missing required or out-of-list values return a 400. This happens before `PersonHelper.registerGuestHousehold()` runs. That function first calls `PersonRepo.findGuestMatch()` for each member with an email or phone. Exactly one live person with the same first name and the same email or phone digits is reused. Zero or several matches create a new person, so it never guesses. A contactless member is matched by first name inside the matched household. Reused people are never edited, so an anonymous form can't overwrite stored details, and the response echoes the submitted names. Unmatched members join the matched household or a new one, as `membershipStatus: "Visitor"`, emitting `person.created` for each new person. Afterwards, failures are logged rather than returned. Members are added to the configured group (`group.member.added`). If attendance recording is on, `AttendanceModuleGateway.recordAttendance()` marks each member present for every one of the group's service times that has a schedule and whose check-in window (`CheckinGateHelper.isServiceTimeOpen`) is open right now, creating the session for today's church-local date if needed. Unscheduled service times and sign-ups outside the window record nothing. Comments become a hidden person-note conversation on the head of household (message author "Guest sign-up"), linked through `person.conversationId`.

## Related Pages

- [Attendance Endpoints](../api/endpoints/attendance): Full REST surface for campuses, services, sessions, visits, and visit sessions
- [Membership Endpoints](../api/endpoints/membership): People, households, and groups
- [Webhooks](../api/webhooks): The `session.created`, `attendance.recorded`, and `attendance.checkout` events
- [Module Structure](../api/module-structure): How the attendance module is organized server-side
