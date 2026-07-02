---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in is one system with three front doors: the B1Checkin kiosk app for staffed and self-serve stations, self check-in inside the B1App member portal, and admin-side attendance in B1Admin. All three write to the same attendance module in the core Api, and classroom routing is driven entirely by Groups — there is no separate "locations" or "rooms" entity. This page maps the data model, the check-in flows, and the label printing pipeline.

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
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Staffed or self-serve station with label printing and verified check-out |
| Self check-in | `B1App` | Next.js (b1.church member portal) | Logged-in members check their household in from a phone; no printing |
| Admin | `B1Admin` | React SPA | Configures the service structure, assigns groups to service times, designs labels, records manual attendance, runs reports |

All three call the same two API modules through `ApiHelper`: **MembershipApi** (`/membership`) for people, households, and groups; **AttendanceApi** (`/attendance`) for everything below.

## Data model (`Api/src/modules/attendance`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated here — campuses are mastered in the membership module (`/membership/campuses`); the attendance copy is frozen read-only for legacy readers (`models/Campus.ts`) |
| `services` | campusId, name | A recurring gathering, e.g. "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | A time slot within a service, e.g. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: which groups (classrooms) meet at which service times (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | One meeting of one group on one date — created lazily at check-in time (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkoutTime, checkedOutBy, checkedOutById | One person attending on one date (`models/Visit.ts`) |
| `visitSessions` | visitId, sessionId | Which session(s) a visit covers — a child checked in to two service times gets two rows (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### How a completed check-in is persisted

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) handles `POST /attendance/visits/checkin?serviceId=&peopleIds=`. The body is an array of `Visit` objects, each carrying `visitSessions` whose embedded `session` names only a `(serviceTimeId, groupId)` pair. The server then:

1. **Resolves sessions lazily.** `getSessionId()` finds or creates the `sessions` row for `(groupId, serviceTimeId, today)` — session ids are cached in-process per date. New sessions emit a `session.created` webhook.
2. **Replaces the day's records.** Any existing visits for those people at that service today are deleted along with their visitSessions, then the submitted set is saved. Re-checking-in a family is therefore an idempotent "this is the current state" operation, not an append. Passing `?checkDuplicates=true` instead returns `{ duplicates: [personId…] }` without writing, which is how the kiosk warns before overwriting.
3. **Generates one security code per batch.** `SecurityCodeHelper.generate()` produces a 4-character code from the alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (no vowels or ambiguous characters, so codes can't spell words or misread). The server retries on collision against the same church's same-day open visits and stamps the code on every visit in the batch.
4. **Returns `{ streaks, securityCode }`.** `streaks` maps personId to consecutive-week attendance count; the kiosk celebrates milestones (every 5th week) with confetti.

Each saved visit also emits an `attendance.recorded` webhook. The read side, `GET /attendance/visits/checkin`, returns the people's visits from their **last logged date** — if that was a previous week the ids are stripped, so the client receives a pre-filled copy of last week's room selections that will save as new records.

### Check-out

Two endpoints complete the loop (`VisitController`):

- `GET /attendance/visits/code/:code` — today's not-yet-checked-out visits carrying that security code, with sessions populated.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stamps `checkoutTime` and who picked up, and emits an `attendance.checkout` webhook per visit.

Permissions: kiosks authenticate with `attendance.checkin`, which grants exactly the check-in/check-out/label-template surface; `attendance.view`/`attendance.edit` cover reporting and manual entry; the structure (services, service times, group assignments) requires `services.edit`.

## Groups drive room routing

There is no room or classroom entity anywhere in the system. A "room" is a membership **group** with `trackAttendance` enabled, linked to one or more service times through `groupServiceTimes`. Three group flags (on `Api/src/modules/membership/models/Group.ts`) shape kiosk behavior:

| Flag | Effect |
|------|--------|
| `trackAttendance` | Group participates in attendance at all; B1Admin's setup tree flags `trackAttendance` groups with no `groupServiceTimes` row as unassigned |
| `parentPickup` | Marks a child room: checking in to it makes the visit a "child" visit, which prints a family pickup label and puts the security code on the nametag |
| `printNametag` | Whether check-ins to this group print a nametag at all |

Every client denormalizes the same way (e.g. `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): load `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, and `GET /membership/groups` in parallel, then for each service time collect the groups whose `groupServiceTimes` row points at it into `serviceTime.groups`. That array is what the room picker shows, organized by group `categoryName`.

Assignments are edited from the group's page in B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), and the whole Campus → Service → Service Time → Group tree is visualized in `B1Admin/src/attendance/components/AttendanceSetup.tsx` via `GET /attendance/attendancerecords/tree`.

:::info
Because groups are the single source of truth, the same group membership powers kiosk routing, roster-style attendance in B1Admin's group pages, and attendance reporting — assigning a group to a service time is the only step needed to make it a check-in destination.
:::

## The kiosk (B1Checkin)

Screens are expo-router files under `B1Checkin/app/`; cross-screen state lives in a static `CachedData` class (`src/helpers/CachedData.ts`), not React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — search by phone (`GET /membership/people/search/phone?number=`, last-4 or full) or by name (`GET /membership/people/search?term=`). Selecting a match loads the household (`GET /membership/people/household/{householdId}`) and existing visits (`GET /attendance/visits/checkin`), seeding `pendingVisits` with last week's selections.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — each member row shows an already-checked-in badge, allergy/`nametagNotes` badge, and their current room chips. Expanding a member lists every service time with a room button.
3. **Group assignment** (`app/selectGroup.tsx`) — a category tree built from `serviceTime.groups`; picking a room writes a `{ session: { serviceTimeId, groupId } }` visitSession into that person's pending visit (`src/helpers/VisitSessionHelper.ts`). "None" clears it.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` with `pendingVisits`, then prints labels if a printer is configured and auto-returns to lookup.

The **check-out** screen (`app/checkout.tsx`) accepts the 4-character security code through an auto-focused input — so USB/Bluetooth keyboard-wedge barcode scanners work with no camera — or an on-screen keypad using the same alphabet, auto-submitting at 4 characters. It looks up the code, shows the children being picked up, presents a photo grid of household adults (plus an "Other" free-text option), and posts `POST /attendance/visits/checkout` with the picker's name/id.

Station personality is an AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, toggled in `app/adminSettings.tsx`). Manned mode adds the check-out entry point on the lookup screen and per-member profile editing (`POST /membership/people`) from the household screen. Kiosk hardening is built in: an optional PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates the admin and printer screens, the admin screen opens only via 7 rapid taps on the header logo, and an idle attract screen (`src/hooks/useInactivityTimer.ts`) takes over between families.

## Self check-in (B1App)

Members check in from the b1.church portal at the `/mobile/checkin` screen (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` to `screens/CheckinPage.tsx`). It requires a logged-in user and walks the same four steps as the kiosk — services → household → groups → complete — against the identical endpoints, with state held in `B1App/src/helpers/CheckinHelper.ts`. The differences from the kiosk: the household comes from the logged-in user's own `householdId` (no search step), and the flow ends at a confirmation screen — no security code display and no label printing. Types and `ApiHelper`/`ArrayHelper` come from `@churchapps/helpers` and `@churchapps/apphelper`; no React components are shared with B1Admin.

## Admin-side attendance (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) renders the structure tree and creates services (`ServiceEdit.tsx`) and service times (`ServiceTimeEdit.tsx`). Campus data comes from membership via the `useCampuses()` hook.
- **Manual attendance** lives on the Groups side, not the attendance section: `B1Admin/src/groups/components/GroupSessionsTab.tsx` creates sessions (`POST /attendance/sessions`) and marks people present via `POST /attendance/visitsessions/log`, which finds-or-creates the visit for that person and session. Group leaders can record attendance for their own groups without the `attendance.edit` permission — the controllers check `au.leaderGroupIds`.
- **Reporting** — attendance trend and group attendance are server-defined reports (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi); per-person history is `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Templates and the designer

Churches design their own labels in B1Admin at `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, reached from the Check-In settings page). A template is a `labelTemplates` row whose `content` is a JSON array of blocks — `text`, `field`, `barcode`, `qrcode`, or `box` — each positioned in percent coordinates with font, alignment, symbology (`code39`/`code128`/`qr`), and optional visibility conditions (e.g. only render the allergy box when `person.nametagNotes` is non-empty). Two `labelType`s exist: `nametag` (one per checked-in person; fields like `person.displayName`, `sessions`, `securityCode`) and `pickup` (one per family; fields like `children`, `childrenAllergies`). The server enforces a single default per type per church (`LabelTemplateController.save`). The designer ships starter templates mirroring the kiosk's bundled labels and previews against sample data.

### Rendering and printing on the kiosk

At check-in completion, `B1Checkin/src/helpers/LabelHelper.ts` decides what to print from the group flags on each pending visit: nametags for `printNametag` groups, plus one family pickup label if any visit hit a `parentPickup` group. The security code from the check-in response goes onto child nametags and the pickup label; adult nametags print without a code. If the church has templates, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) turns blocks + a field context into a standalone HTML document; otherwise bundled HTML labels in `B1Checkin/assets/labels/` are used with placeholder substitution.

Barcodes are generated as inline SVG by pure-TypeScript encoders in `B1Checkin/src/helpers/barcode.ts` — Code 39 pattern tables and Code 128 (code set B with mod-103 checksum) width tables, plus QR via the `qrcode` package. **These encoders are intentionally duplicated in B1Admin** (`LabelEditor.tsx` inlines the same tables, noted in a code comment) so designer previews are pixel-faithful to kiosk output; a change to one must be mirrored in the other.

The print pipeline (`src/components/PrintUI.tsx`) renders each HTML label in a `WebView`, captures it to JPG via `react-native-view-shot`, and hands the image URIs to the native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). The module exposes `scan()`, `checkInit()`, `printUris()`, and status events, with a provider per brand on both platforms:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, the recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection lives at `app/printers.tsx` (network scan returns `brand~model~ip` entries; the choice persists to AsyncStorage), and `src/helpers/PrinterLog.ts` keeps an on-device diagnostic log surfaced through a live status dot in the kiosk header.

## Guest registration

Two paths create a person mid-check-in:

- **At the kiosk** — the household screen's "Add guest" opens `B1Checkin/app/addGuest.tsx`, which first searches `GET /membership/people/search?term=` for an existing non-member match and otherwise creates one with `POST /membership/people`, attached to the current household. The guest then flows through group assignment like any member.
- **Self-serve via QR** — when the church setting `enableQRGuestRegistration` is on (configured in B1Admin's Check-In settings, read from `GET /membership/settings/public/{churchId}`), the kiosk lookup screen shows a QR code linking to `https://{subdomain}.b1.church/guest-register?serviceId=`. That B1App page (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) lets a visiting family register themselves on their own phone through the anonymous `POST /membership/people/guest-register` endpoint, keeping the kiosk line moving.

## Related Pages

- [Attendance Endpoints](../api/endpoints/attendance) -- Full REST surface for campuses, services, sessions, visits, and visit sessions
- [Membership Endpoints](../api/endpoints/membership) -- People, households, and groups
- [Webhooks](../api/webhooks) -- The `session.created`, `attendance.recorded`, and `attendance.checkout` events
- [Module Structure](../api/module-structure) -- How the attendance module is organized server-side
