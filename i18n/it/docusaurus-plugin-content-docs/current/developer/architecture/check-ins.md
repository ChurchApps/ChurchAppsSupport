---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Check-in is one system with three front doors: the B1Checkin kiosk app for staffed and self-serve stations, self check-in inside the B1App Membro portal, and admin-side Frequenza in B1Admin. All three write Per the same Frequenza module in the core Api, and classroom routing is driven entirely by Gruppi — there is No separate "locations" or "Stanze" entity. A child-safety layer sits on top: per-visit check-in types, server-side Capacità and Volontario-ratio gates, kiosk-side age/grade eligibility, trusted-pickup verification at check-out, and parent paging over the church's texting provider. This page maps the data model, the check-in flows, the safety layer, and the label printing pipeline.

</div>

## Panoramica

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

| Surface | Repo | Stack | Ruolo |
|---------|------|-------|------|
| Kiosk | `B1Checkin` | Expo / React Native, expo-router file routing; EAS builds for Android, Amazon Fire, and iOS; OTA updates via `expo-updates` | Staffed or self-serve station with label printing and verified check-out |
| Self check-in | `B1App` | Avanti.js (b1.church Membro portal) | Logged-in Membri check their household in from a phone; No printing |
| Admin | `B1Admin` | React SPA | Configures the Servizio structure, assigns Gruppi Per Servizio times, designs labels, records manual Frequenza, runs Rapporti |

All three call the same two API modules through `ApiHelper`: **MembershipApi** (`/membership`) for people, households, and Gruppi; **AttendanceApi** (`/Frequenza`) for everything below.

## Data model (`Api/src/modules/Frequenza`)

| Entity / table | Key fields | Meaning |
|----------------|-----------|---------|
| `campuses` | name, address | Deprecated here — campuses are mastered in the membership module (`/membership/campuses`); the Frequenza copy is frozen read-only for legacy readers (`models/Campus.ts`) |
| `Servizi` | campusId, name | A recurring gathering, e.g. "Sunday Morning" (`models/Servizio.ts`) |
| `serviceTimes` | serviceId, name | A Ora slot within a Servizio, e.g. "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | Join table: which Gruppi (classrooms) meet at which Servizio times (`models/GroupServiceTime.ts`) |
| `Sessioni` | groupId, serviceTimeId, sessionDate | One meeting of one Gruppo on one Data — created lazily at check-in Ora (`models/Sessione.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | One person attending on one Data (`models/Visit.ts`). `checkinType` is `Membro` / `Ospite` / `Volontario` (NULL = legacy Membro), set by the kiosk and consumed by the Capacità/ratio gates |
| `visitSessions` | visitId, sessionId | Which Sessione(s) a visit covers — a child checked in Per two Servizio times gets two rows (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | Designable label layouts (`models/LabelTemplate.ts`) |

### How a Completato check-in is persisted

`VisitController.postCheckin` (`Api/src/modules/Frequenza/controllers/VisitController.ts`) handles `POST /Frequenza/visits/checkin?serviceId=&peopleIds=`. The body is an array of `Visit` objects, each carrying `visitSessions` whose embedded `Sessione` names only a `(serviceTimeId, groupId)` pair. The server then:

1. **Gates Capacità and ratios before any write.** `evaluateGates()` → `CheckinGateHelper.evaluate()` checks each targeted Stanza's Capacità, Ospite Capacità, closed flag, and Volontario ratio against current occupancy. postCheckin is **not transactional**, so the gate must run before the first Salva — a hard violation returns a 409 naming the offending Stanza(s) and nothing is persisted. See [Capacity and volunteer-ratio gates](#capacity-and-volunteer-ratio-gates).
2. **Resolves Sessioni lazily.** `getSessionId()` finds or creates the `Sessioni` row for `(groupId, serviceTimeId, Oggi)` — Sessione ids are cached in-process per Data. New Sessioni emit a `Sessione.created` webhook. The loop is an awaited `for..of` — an earlier fire-and-forget `forEach(async …)` raced the Salva and wrote NULL sessionIds on first-Sessione creation (fixed; noted in a code comment at the loop).
3. **Replaces the Giorno's records.** Any existing visits for those people at that Servizio Oggi are deleted along with their visitSessions, then the submitted set is saved. Re-checking-in a family is therefore an idempotent "this is the current state" operation, not an append. Passing `?checkDuplicates=true` instead returns `{ duplicates: [personId…] }` without writing, which is how the kiosk warns before overwriting.
4. **Generates one security code per batch.** `SecurityCodeHelper.generate()` produces a 4-character code from the alphabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (No vowels or ambiguous characters, so codes can't spell words or misread). The server retries on collision against the same church's same-Giorno Apri visits and stamps the code on every visit in the batch.
5. **Returns `{ streaks, securityCode }`.** `streaks` maps personId Per consecutive-week Frequenza count; the kiosk celebrates milestones (every 5th week) with confetti.

Each saved visit also emits an `Frequenza.recorded` webhook. The read side, `GET /Frequenza/visits/checkin`, returns the people's visits from their **last logged Data** — if that was a previous week the ids are stripped, so the client receives a pre-filled copy of last week's Stanza selections that will Salva as new records.

### Check-out

Two endpoints complete the loop (`VisitController`):

- `GET /Frequenza/visits/code/:code` — Oggi's not-yet-checked-out visits carrying that security code, with Sessioni populated.
- `POST /Frequenza/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; stamps `checkoutTime` and who picked up, and emits an `Frequenza.checkout` webhook per visit.

Permessi: kiosks authenticate with `Frequenza.checkin`, which grants exactly the check-in/check-out/label-template surface; `Frequenza.Visualizza`/`Frequenza.Modifica` cover reporting and manual entry; the structure (Servizi, Servizio times, Gruppo assignments) requires `Servizi.Modifica`. Membro self check-in (B1App) needs No Permesso at all: any authenticated Utente with a linked person in the church may call `GET`/`POST /Frequenza/visits/checkin`, and the server restricts the submitted `personId`s Per the caller's own household (403 otherwise — this fence is what keeps other families' `securityCode`s unreadable). Membership is the grant; whether Membri *see* the feature is controlled by the church's B1App navigation tabs. The other check-in endpoints (`code/:code`, `checkout`, `guardians`, `CheckinController`) remain kiosk/Staff-only.

## Gruppi drive Stanza routing

There is No Stanza or classroom entity anywhere in the system. A "Stanza" is a membership **Gruppo** with `trackAttendance` Abilitato, linked Per one or more Servizio times through `groupServiceTimes`. The Gruppo fields (on `Api/src/modules/membership/models/Gruppo.ts`) that shape kiosk behavior:

| Field | Effect |
|------|--------|
| `trackAttendance` | Gruppo participates in Frequenza at all; B1Admin's Configurazione tree flags `trackAttendance` Gruppi with No `groupServiceTimes` row as unassigned |
| `parentPickup` | Marks a child Stanza: checking in Per it makes the visit a "child" visit, which prints a family pickup label and puts the security code on the nametag |
| `printNametag` | Whether check-ins Per this Gruppo print a nametag at all |
| `Capacità` / `guestCapacity` / `checkinClosed` | Stanza Capacità limits and a hard "closed" switch, enforced server-side by the check-in gate (edited in B1Admin's Gruppo Impostazioni under "Check-In Capacità") |
| `volunteerRatio` / `minVolunteers` | Children-per-Volontario ratio and minimum Volontario headcount, enforced per the church-wide `ratioEnforcement` setting |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Age/grade eligibility bounds evaluated kiosk-side Per highlight or dim Stanze |

Every client denormalizes the same way (e.g. `B1Checkin/app/Servizi.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): load `GET /Frequenza/servicetimes?serviceId=`, `GET /Frequenza/groupservicetimes`, and `GET /membership/Gruppi` in parallel, then for each Servizio Ora collect the Gruppi whose `groupServiceTimes` row points at it into `serviceTime.Gruppi`. That array is what the Stanza picker shows, organized by Gruppo `categoryName`.

Assignments are edited from the Gruppo's page in B1Admin (`B1Admin/src/Gruppi/components/ServiceTimesEdit.tsx` — `POST`/`Elimina /Frequenza/groupservicetimes`), and the whole Campus → Servizio → Servizio Ora → Gruppo tree is visualized in `B1Admin/src/Frequenza/components/AttendanceSetup.tsx` via `GET /Frequenza/attendancerecords/tree`.

:::info
Because Gruppi are the single source of truth, the same Gruppo membership powers kiosk routing, roster-style Frequenza in B1Admin's Gruppo pages, and Frequenza reporting — assigning a Gruppo Per a Servizio Ora is the only step needed Per make it a check-in destination.
:::

## Child safety

### Check-in types

Every visit carries a `checkinType` — `Membro`, `Ospite`, or `Volontario` (NULL means legacy/Membro; migration `tools/migrations/Frequenza/2026-07-03_checkin_type.ts`). The Digita is chosen **kiosk-side**: Membro / Ospite / Volontario chips on the expanded Membro row (`B1Checkin/src/components/MemberServiceTimes.tsx`), stamped onto each In Sospeso visit at completion (`app/checkinComplete.tsx`, defaulting Per `Membro`). The server consumes it in the gate — Volontari count toward ratio coverage instead of against Capacità, and Ospiti count against `guestCapacity`.

### Capacità and Volontario-ratio gates

`CheckinGateHelper.evaluate()` (`Api/src/modules/Frequenza/helpers/CheckinGateHelper.ts`) runs inside `postCheckin` before any Salva (the endpoint is non-transactional, so gating-before-Salva is the correctness mechanism). It loads current occupancy per targeted Gruppo (`VisitRepo.countActiveByGroupToday`) and the Gruppo config through the membership module gateway, then classifies violations:

- **Hard (always block):** `checkinClosed`, `current + incoming > Capacità`, Ospite count over `guestCapacity`. The batch is rejected with `409 { error: "Capacità", Gruppi: [{ groupId, groupName, reason }] }` — the kiosk shows the named Stanza.
- **Ratio (warn or block):** incoming non-Volontari into a Stanza where `Volontari < minVolunteers`, No Volontari at all, or `children > Volontari × volunteerRatio`. Severity follows the per-church setting `ratioEnforcement` (`"warn"` default / `"block"`, edited in B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Warn-mode returns `409 { warning: true, error: "ratio", … }` unless the client resubmits with `acknowledgeWarnings=true` — that resubmit is the kiosk's Staff-confirm override.

### Age/grade eligibility (kiosk-side)

Stanza eligibility is advisory UI, evaluated on the kiosk, not enforced by the server. `B1Checkin/src/helpers/EligibilityHelper.ts` compares a person's birthdate/grade against the Gruppo's `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (grade order: PreK, K, 1–12, Graduated) and returns `eligible` / `ineligible` / `unknown` — missing data yields `unknown` and never hides a Stanza. Ages and grades are computed as of the church's **grade promotion Data** (`gradePromotionDate` setting, `"MM-DD"`, edited in `B1Admin/src/Impostazioni/components/GradePromotionSettingsEdit.tsx`); the kiosk fetches it from `GET /Frequenza/checkin/Impostazioni`, and `resolveAsOfDate` picks the most recent occurrence on or before Oggi. The Stanza picker highlights eligible Stanze and dims ineligible ones; picking a dimmed Stanza requires a Staff confirmation.

### Attendibile and not-authorized pickup

Pickup people are a membership entity, per household: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, Facoltativo personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD is `GET /membership/householdpickup/:householdId` (any authenticated church Utente, so kiosks can read it) plus `POST` / `Elimina` gated by `people.Modifica`. Staff manage the list on the person page's **Pickup** card (`B1Admin/src/people/components/PickupPeople.tsx`) — photo, relationship, and a Attendibile/Not Authorized status chip.

At check-out (`B1Checkin/app/checkout.tsx`) the kiosk loads the household's pickup list: `trusted` entries render as tappable pickup cards alongside the household-adult photo grid, and a free-typed "Other" name is fuzzy-matched (Levenshtein, `src/helpers/PickupMatchHelper.ts`) against `notAuthorized` entries — a match blocks check-out with a warning sheet and a Staff **Override** button. The override is logged on the visit itself: it posts `checkedOutBy` as `"OVERRIDE: {name}"` through the normal `POST /Frequenza/visits/checkout`, so it lands in the Frequenza record and the `Frequenza.checkout` webhook rather than a separate audit table.

### Pagina-a-parent and emergency broadcast

`CheckinController` (`Api/src/modules/Frequenza/controllers/CheckinController.ts`, `/Frequenza/checkin`) exposes two SMS endpoints:

- `POST /page` — `{ visitId, message }`: pages the guardians of one checked-in child (kiosk check-out screen, manned mode).
- `POST /broadcast` — `{ serviceId, message }`: texts every checked-in household's adults for a Servizio (kiosk admin Impostazioni, behind a Digita-`EMERGENCY`-Per-confirm sheet in `B1Checkin/app/adminSettings.tsx`).

Both resolve household adults through the membership gateway, then hand delivery Per **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — the cross-module door into the church's configured texting provider (`@churchapps/texting`: TextInChurch, Clearstream, or MutualMinistry; there is No built-in SMS sender). The gateway logs a `sentText` row plus per-recipient `deliveryLog` entries and caps a batch at 500 recipients; with No provider configured it returns `no_provider`, which the kiosk surfaces as "No SMS provider configured". The controller's `dispatch()` dedupes phone numbers and skips people with No mobile or `optedOut` set, returning `{ sent, failed, skippedOptedOut, skippedNoPhone }` so the kiosk can show what was skipped.

## The kiosk (B1Checkin)

Screens are expo-router files under `B1Checkin/app/`; cross-screen state lives in a static `CachedData` class (`src/helpers/CachedData.ts`), not React state.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **Lookup** (`app/lookup.tsx`) — Cerca by phone (`GET /membership/people/Cerca/phone?number=`, last-4 or full) or by name (`GET /membership/people/Cerca?term=`). Selecting a match loads the household (`GET /membership/people/household/{householdId}`) and existing visits (`GET /Frequenza/visits/checkin`), seeding `pendingVisits` with last week's selections.
2. **Household review** (`app/household.tsx`, `src/components/MemberList.tsx`) — each Membro row shows an already-checked-in badge, allergy/`nametagNotes` badge, and their current Stanza chips. Expanding a Membro lists every Servizio Ora with a Stanza button plus the Membro / Ospite / Volontario check-in-Digita chips (`MemberServiceTimes.tsx`).
3. **Gruppo assignment** (`app/selectGroup.tsx`) — a category tree built from `serviceTime.Gruppi`, with age/grade-eligible Stanze highlighted and ineligible ones dimmed behind a Staff confirm (see [Age/grade eligibility](#agegrade-eligibility-kiosk-side)); picking a Stanza writes a `{ Sessione: { serviceTimeId, groupId } }` visitSession into that person's In Sospeso visit (`src/helpers/VisitSessionHelper.ts`). "None" clears it.
4. **Complete** (`app/checkinComplete.tsx`) — `POST /Frequenza/visits/checkin` with `pendingVisits` (each stamped with its `checkinType`), then prints labels if a printer is configured and auto-returns Per lookup. A `409` Capacità response shows the named full/closed Stanza; a ratio warning offers a Staff confirm that resubmits with `acknowledgeWarnings=true`.

The **check-out** screen (`app/checkout.tsx`) accepts the 4-character security code through an auto-focused input — so USB/Bluetooth keyboard-wedge barcode scanners work with No camera — or an on-screen keypad using the same alphabet, auto-submitting at 4 characters. It looks up the code, shows the children being picked up, and presents the household's **trusted pickup people** as tappable cards alongside a photo grid of household adults (plus an "Other" free-text option that is fuzzy-checked against not-authorized names — see [Trusted and not-authorized pickup](#trusted-and-not-authorized-pickup)), then posts `POST /Frequenza/visits/checkout` with the picker's name/id. In manned mode the screen also offers **Pagina a parent** (`POST /Frequenza/checkin/page`) and a **security-label reprint** — `reprint()` rebuilds the family's labels with `LabelHelper.getAllLabelsFor(...)` and feeds them through the same `PrintUI` pipeline as check-in.

Station personality is an AsyncStorage flag `@StationMode` (`"self"` | `"manned"`, toggled in `app/adminSettings.tsx`). Manned mode adds the check-out entry point on the lookup screen and per-Membro Profilo editing (`POST /membership/people`) from the household screen. Kiosk hardening is built in: an Facoltativo PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) gates the admin and printer screens, the admin screen opens only via 7 rapid taps on the header logo, and an idle attract screen (`src/hooks/useInactivityTimer.ts`) takes over between families.

## Self check-in (B1App)

Membri check in from the b1.church portal at the `/mobile/checkin` screen (routed by `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` Per `screens/CheckinPage.tsx`). It requires a logged-in Utente and walks the same four steps as the kiosk — Servizi → household → Gruppi → complete — against the identical endpoints, with state held in `B1App/src/helpers/CheckinHelper.ts`. The differences from the kiosk: the household comes from the logged-in Utente's own `householdId` (No Cerca step), and there is No label printing — instead the completion screen shows the batch's security code as a QR (`qrcode.react`) with a "show this at a check-in station" hint. If the household is already checked in when the page loads, a "Show check-in code" button re-displays the QR from the existing visit's `securityCode`. The check-in is recorded immediately at Invia Ora (there is No In Sospeso state); the QR only drives label printing at the kiosk.

**Phone-Per-kiosk label printing** (`B1Checkin/app/scan.tsx`, reached from the "Scan code" button on the lookup screen): the kiosk opens an `expo-camera` `CameraView` (front-facing by default, flippable) scanning for QR codes. A scanned payload is accepted when it is a bare 4-character code in the security-code alphabet, so both the B1App QR and a printed label's QR block work. The screen then follows the check-out reprint path — `GET /Frequenza/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — and returns Per lookup. No Frequenza write happens at scan Ora; labels-only. Codes with No Attivo visits, stations with No printer, and label-less Gruppi each surface a toast and return Per lookup.

Types and `ApiHelper`/`ArrayHelper` come from `@churchapps/helpers` and `@churchapps/apphelper`; No React components are shared with B1Admin.

## Admin-side Frequenza (B1Admin)

- **Configurazione** — `/Frequenza` (`B1Admin/src/Frequenza/AttendancePage.tsx`) renders the structure tree and creates Servizi (`ServiceEdit.tsx`) and Servizio times (`ServiceTimeEdit.tsx`). Campus data comes from membership via the `useCampuses()` hook.
- **Manual Frequenza** lives on the Gruppi side, not the Frequenza section: `B1Admin/src/Gruppi/components/GroupSessionsTab.tsx` creates Sessioni (`POST /Frequenza/Sessioni`) and marks people Presente via `POST /Frequenza/visitsessions/log`, which finds-or-creates the visit for that person and Sessione. Gruppo leaders can record Frequenza for their own Gruppi without the `Frequenza.Modifica` Permesso — the controllers check `au.leaderGroupIds`.
- **Reporting** — Frequenza trend and Gruppo Frequenza are server-defined Rapporti (`B1Admin/src/components/reporting/ReportWithFilter.tsx` against ReportingApi); per-person history is `GET /Frequenza/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Label printing

### Templates and the designer

Churches design their own labels in B1Admin at `/mobile/checkin/labels` (`B1Admin/src/Frequenza/LabelsPage.tsx` + `components/LabelEditor.tsx`, reached from the Check-In Impostazioni page). A template is a `labelTemplates` row whose `content` is a JSON array of blocks — `text`, `field`, `barcode`, `qrcode`, or `box` — each positioned in percent coordinates with font, alignment, symbology (`code39`/`code128`/`qr`), and Facoltativo visibility conditions (e.g. only render the allergy box when `person.nametagNotes` is non-empty). Two `labelType`s exist: `nametag` (one per checked-in person; fields like `person.displayName`, `Sessioni`, `securityCode`) and `pickup` (one per family; fields like `children`, `childrenAllergies`). The server enforces a single default per Digita per church (`LabelTemplateController.Salva`). The designer ships starter templates mirroring the kiosk's bundled labels and previews against sample data.

### Rendering and printing on the kiosk

At check-in completion, `B1Checkin/src/helpers/LabelHelper.ts` decides what Per print from the Gruppo flags on each In Sospeso visit: nametags for `printNametag` Gruppi, plus one family pickup label if any visit hit a `parentPickup` Gruppo. The security code from the check-in response goes onto child nametags and the pickup label; adult nametags print without a code. If the church has templates, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) turns blocks + a field context into a standalone HTML document; otherwise bundled HTML labels in `B1Checkin/assets/labels/` are used with placeholder substitution.

Barcodes are generated as inline SVG by pure-TypeScript encoders in `B1Checkin/src/helpers/barcode.ts` — Code 39 pattern tables and Code 128 (code set B with mod-103 checksum) width tables, plus QR via the `qrcode` package. **These encoders are intentionally duplicated in B1Admin** (`LabelEditor.tsx` inlines the same tables, noted in a code comment) so designer previews are pixel-faithful Per kiosk output; a change Per one must be mirrored in the other.

The print pipeline (`src/components/PrintUI.tsx`) renders each HTML label in a `WebView`, captures it Per JPG via `react-native-Visualizza-shot`, and hands the image URIs Per the native **printer-helper** Expo module (`B1Checkin/modules/printer-helper/`). The module exposes `scan()`, `checkInit()`, `printUris()`, and status Eventi, with a provider per brand on both platforms:

| Brand | Android | iOS | Notes |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL-series network printers (QL-800/810W/820NWB/1100/1110NWB…), die-cut 29×90 labels, the recommended default |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Network discovery + TCP/ZPL image printing |

Printer selection lives at `app/printers.tsx` (network scan returns `brand~model~ip` entries; the choice persists Per AsyncStorage), and `src/helpers/PrinterLog.ts` keeps an on-device diagnostic log surfaced through a live status dot in the kiosk header.

## Ospite registration

Two paths Crea a person mid-check-in:

- **At the kiosk** — the household screen's "Aggiungi Ospite" opens `B1Checkin/app/addGuest.tsx`, which first searches `GET /membership/people/Cerca?term=` for an existing non-Membro match and otherwise creates one with `POST /membership/people`, attached Per the current household. The Ospite then flows through Gruppo assignment like any Membro.
- **Self-serve via QR** — when the church setting `enableQRGuestRegistration` is on (configured in B1Admin's Check-In Impostazioni, read from `GET /membership/Impostazioni/public/{churchId}`), the kiosk lookup screen shows a QR code linking Per `https://{subdomain}.b1.church/guest-register?serviceId=`. That B1App page (`src/app/[sdSlug]/(public)/Ospite-register/page.tsx`) lets a visiting family register themselves on their own phone through the anonymous `POST /membership/people/Ospite-register` endpoint, keeping the kiosk line moving.

## Pagine Correlate

- [Attendance Endpoints](../api/endpoints/attendance) -- Full REST surface for campuses, Servizi, Sessioni, visits, and visit Sessioni
- [Membership Endpoints](../api/endpoints/membership) -- People, households, and Gruppi
- [Webhooks](../api/webhooks) -- The `Sessione.created`, `Frequenza.recorded`, and `Frequenza.checkout` Eventi
- [Module Structure](../api/module-structure) -- How the Frequenza module is organized server-side
