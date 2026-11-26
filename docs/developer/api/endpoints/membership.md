---
title: "Membership Endpoints"
description: "Endpoint reference for the ChurchApps Membership API: people, households, groups, lists, custom fields, roles, forms, settings, domains, webhooks, and audit logs, with auth and permission rules."
---

# Membership Endpoints

<div class="article-intro">

The Membership module manages people, churches, campuses, groups, households, saved lists, custom person fields, roles, permissions, forms, and settings. It is the largest module and provides the core identity and authorization layer for all other modules. It also holds the church-level admin tools: domains and sites, webhooks, the audit log, undoable batches, GDPR export and erasure, and the server health checks.

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

Where a row lists **Member**, a caller without People.View is let in according to the church's `directoryVisibility` setting: `Members` (the default) admits a membership status of Member or Staff, `Regular Attendees` adds Regular Attendee, `Everyone` adds Visitor, and `Staff` admits no one.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | List all people for the church |
| GET | `/list?pageSize=` | JWT | People.View or Member | People in alphabetical order (last name, then first name). `pageSize` caps how many are returned; leave it out or send `0` for everyone. Callers without People.View need directory access and get the directory view: opted-out people and anyone outside the church's `directoryVisibility` tier are left out, and contact fields the caller may not see are removed |
| GET | `/:id` | JWT | People.View or own record | Get a person by ID (includes form submissions) |
| GET | `/ids?ids=` | JWT | People.View, Member, or People.ViewNames | Get multiple people by comma-separated IDs. People.ViewNames callers without People.View get the basic model, with opted-out people left out (except the caller) |
| GET | `/basic?ids=` | JWT | — | Get basic info (name only) for multiple people |
| GET | `/names?ids=` | JWT | Any church permission | `[{ id, name: { display, first, last }, photo }]`, sorted by last name then first name, for comma-separated ids the caller already has, so roles without People.View (donations, attendance) can label people. No search, no directory filter |
| POST | `/names` | JWT | Any church permission | Same as `GET /names`. Body: `{ peopleIds }` (or `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, or People.ViewNames | Recently added people. People.ViewNames callers without People.View (even members with directory access) get the basic model (`id`, `name.display`, `photo`, `membershipStatus`) with opted-out people left out |
| GET | `/guest-register/options?churchId=` | Public | — | QR guest sign-up checklist: returns `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, each `"off"`, `"optional"`, or `"required"` (parsed from the public `guestRegistrationFields` setting; missing or malformed values fall back to email/phone optional, the rest off). Requires `enableQRGuestRegistration` unless the request carries a matching site/church token; rate limited (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, or People.ViewNames | Search people by name or email (up to 100, sorted by last name then first name). People.ViewNames callers without People.View (even members with directory access) get a name search returning the basic model; an `email` search returns `[]` |
| GET | `/search/phone?number=` | JWT | People.View or Member | Search by phone number |
| GET | `/search/group?groupId=` | JWT | People.View or Member | Get people in a specific group |
| GET | `/household/:householdId` | JWT | People.View, People.Edit, Attendance.Checkin, or own household | Get all people in a household. A caller with Attendance.Checkin but neither people permission gets the check-in model (name, photo, `membershipStatus`, `householdId`, `householdRole`, `birthDate`, `grade`, `nametagNotes`). Anyone else without People.View or People.Edit can read only their own household (401 otherwise) |
| GET | `/attendance` | JWT | People.Edit | Load attendees with filters (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/demographics` | JWT | People.View | Counts for the church's people: `{ total, ageGroups, membershipStatus, gender, maritalStatus, campus }`. `ageGroups` has one `{ group, female, male, unassigned }` entry per age band (`0-3` to `65+`, counting only people with a birth date). The others are `{ name, count }` lists (`campus` also carries the campus `id`), with blank values counted as `Unassigned` |
| GET | `/possibleDuplicates` | JWT | People.Edit | Church-wide scan for likely duplicate records. Returns up to 100 pairs as `{ person1, person2, matchedOn }`, where `matchedOn` lists `email`, `phone`, and/or `nameBirthDate` (same first name, last name, and birth date). Email and phone matches also need the same first name, and a value shared by more than six people is skipped |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Load timeline data for people and groups |
| GET | `/directory/:id` | JWT | People.View, Member, or own record | Get person for directory view (respects visibility preferences). Send `all` as the id for the whole directory. With People.View the caller gets the full record with form submissions, or every person for `all`. A caller asking for their own record also gets the full record. Any other caller needs directory access (401 otherwise) and gets the name, photo, `membershipStatus`, and the contact fields the visibility rules let them see; for `all` they get the basic model of the people in the church's `directoryVisibility` tier, without those who opted out |
| GET | `/claim/:churchId` | JWT | — | Claim a person record for the current user at a church |
| POST | `/` | JWT | People.Edit or EditSelf | Create or update people (batch) |
| POST | `/search` | JWT | People.View, Member, or People.ViewNames | Search people (POST variant). Body: `{ term }` or `{ email }`; same names-only rules as `GET /search` |
| POST | `/advancedSearch` | JWT | People.View or Member | Multi-condition search (age, birthMonth, membershipStatus, etc.). Body is an array of conditions; an empty body means no conditions, and any other non-array body returns 400 |
| POST | `/loadOrCreate` | Public | — | Find or create a person by email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | QR guest sign-up. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 members; email/phone/maritalStatus apply to the first member only). Fields the church turned off are dropped; missing required or invalid values return 400. First reuses existing people: a member matches when exactly one non-removed person has the same first name (case-insensitive) and the same email or phone digits (home, work, or mobile); a member with no email or phone matches by first name inside the matched household. Matched people are never edited. Unmatched members join the matched household, or else a new household (named for the first member's last name), as `membershipStatus: "Visitor"` with the shared `address`. Saves `comments` as a note on the first member, adds everyone to the private `guestRegistrationGroupId` group if set, and — when `guestRegistrationRecordAttendance` is `"true"` — records attendance for that group's scheduled service times whose check-in window is open now. Returns `{ householdId, people: [{ id, name }] }`, echoing the submitted names rather than stored ones. Same opt-in/token and rate-limit rules as the options call |
| POST | `/household/:householdId` | JWT | People.Edit | Update household member assignments |
| POST | `/public/email` | Public | — | Send an email to a person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/duplicates` | JWT | People.View or Member | Check one set of details against existing people, for example before creating a record. Body: `{ email, phone, firstName, lastName, birthDate }` (all optional). Returns up to 25 people whose email matches, whose home, work, or mobile number has the same digits, or who share the first name, last name, and birth date. Returns `[]` when the body has no email, no phone, and no complete name and birth date. Callers without People.View get the directory view, as on `GET /list` |
| POST | `/familyMember` | JWT | People.EditSelf | Add a person to the caller's own household. Body: `{ first, last, prefix, mobilePhone, email, photo, householdRole }`; only `first` is required (400 without it). `last` defaults to the caller's last name and `householdRole` (`Head`, `Spouse`, `Child`, or `Other`) to `Other`. `photo` is a PNG data URL of up to 5 MB; anything else is ignored. Returns 403 when the church has a directory approval group (the `directoryApprovalGroupId` setting), and 401 when the caller has no person record or household. Sends `person.created` |
| POST | `/bulk-update` | JWT | People.Edit | Set the same values on several people. Body: `{ personIds, updates }`, where `updates` may hold `membershipStatus`, `maritalStatus`, `gender`, `optedOut`, `campusId`, `grade`, and `school`; other keys are ignored. Returns 400 when `personIds` is empty or `updates` has none of those keys, and 404 (with `missingIds`) when any id is not in the church, in which case nothing is changed. Returns `{ success, updatedIds, count, batchId }` and sends `person.updated` for each person. The `batchId` can be undone through [Batches](#batches) |
| POST | `/bulk-delete` | JWT | People.Edit | Delete several people at once. Body: `{ personIds }`. Returns 400 when the list is empty and 404 (with `missingIds`) when any id is not in the church, in which case nothing is deleted. Returns `{ success, deletedIds, count, batchId }` and sends `person.destroyed` for each person. The `batchId` can be undone through [Batches](#batches) |
| DELETE | `/:id` | JWT | People.Edit | Delete a person |

### Example: Search People

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Example: Create a Person

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Base path: `/membership/users`

See [Authentication & Permissions](./authentication.md) for login, registration, and password management endpoints.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Log in (email/password, JWT refresh, or authGuid) |
| POST | `/register` | Public | — | Register a new user |
| POST | `/forgot` | Public | — | Send password reset email |
| POST | `/setPasswordGuid` | Public | — | Set password using auth GUID from email link |
| POST | `/verifyCredentials` | Public | — | Verify email/password and return associated churches |
| POST | `/loadOrCreate` | JWT | — | Find or create a user by email/userId |
| POST | `/setDisplayName` | JWT | — | Update user's first and last name |
| POST | `/updateEmail` | JWT | — | Change user's email address |
| POST | `/updatePassword` | JWT | — | Change user's password (min 6 chars) |
| POST | `/updateOptedOut` | JWT | — | Set a person's opted-out status |
| POST | `/sendInviteEmail` | JWT | People.Edit | Email an invite to a person in this church (`email`, `personName`, `contextName`). The button reads **Sign Up** for someone with no account and **Log In** for an existing user. A user who has never logged in instead gets a **Set Your Password** link that expires in 7 days. A fixed template, so it doesn't count toward the church's daily email limit |
| GET | `/search?term=` | JWT | Server.Admin | Search all users by name/email |
| DELETE | `/` | JWT | — | Delete the current user account |

## Churches

Base path: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Load all churches for the current user |
| GET | `/:id` | JWT | — | Get church by ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Get the domain admin user for a church |
| GET | `/:id/impersonate` | JWT | Server.Admin | Impersonate a church (server admin only) |
| GET | `/all?term=` | JWT | Server.Admin | Search all churches (admin) |
| GET | `/search/?name=` | Public | — | Search churches by name |
| GET | `/lookup/?subDomain=&id=` | Public | — | Look up a church by subdomain or ID |
| POST | `/` | JWT | Settings.Edit | Update church details |
| POST | `/add` | JWT | — | Register a new church. Required fields: name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Search churches by name (POST variant) |
| POST | `/select` | JWT | — | Select/switch to a church. Body: `{ churchId }` or `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archive or unarchive a church |
| POST | `/:id/emailApproval` | JWT | Server.Admin | Approve a church to send its own email (email templates, form follow-ups, workflow emails), or withdraw the approval. Body: `{ approved }`. Sets or clears the church's `emailApprovedDate` and returns the church. 404 if the church does not exist |
| POST | `/byIds` | Public | — | Load multiple churches by IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Delete churches abandoned for 7+ days |

## Campuses

Base path: `/membership/campuses`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List the church's campuses, sorted by name |
| GET | `/:id` | JWT | — | Get a campus by ID |
| GET | `/public/:churchId` | Public | — | A church's campuses as `{ id, name }` only, for public campus filters such as the groups browser |
| POST | `/` | JWT | Settings.Edit | Create or update campuses (batch). Fields: `name`, `address1`, `address2`, `city`, `state`, `zip`, `timezone`, `website` |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a campus. The row is marked removed and no longer appears in any of the reads above |

## Groups

Base path: `/membership/groups`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all groups |
| GET | `/:id` | JWT | — | Get group by ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Search groups by service filters |
| GET | `/my` | JWT | — | Get groups for the current user |
| GET | `/my/:tag` | JWT | — | Get current user's groups filtered by tag |
| GET | `/tag/:tag` | JWT | — | Get all groups with a specific tag |
| GET | `/public/:churchId/:id` | Public | — | Get a public group by church and ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Get public groups by tag |
| GET | `/public/:churchId/label?label=` | Public | — | Get public groups by label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Get a public group by slug |
| GET | `/public/:churchId/list` | Public | — | List a church's groups tagged `standard`, leaving out archived and confidential ones. Sorted by category then name, each with its `memberCount` |
| GET | `/health/summary` | JWT | GroupMembers.View | One row per `standard` group: `{ groupId, name, categoryName, memberCount, leaderCount, averageAge, femaleCount, maleCount, joins90, leaves90, churnRate90 }`. `joins90` and `leaves90` count the last 90 days, and `churnRate90` is the leaves as a percentage of the group's size at the start of that period |
| GET | `/:id/health` | JWT | GroupMembers.View or group leader | Health detail for one group: `{ memberCount, leaderCount, averageAge, joins90, leaves90, churnRate90, monthly, demographics }`. `monthly` holds `{ month, joins, leaves }` for each of the last 12 calendar months, and `demographics` holds `gender` and `ageGroups` breakdowns of the members |
| GET | `/:id/plans` | JWT | Group member, Groups.Edit, or Plans.Edit | Service plans the group is linked to through [Associated Groups](#associated-groups) of content type `planType`, newest service date first. A link whose `settings` is `past` or `future` limits its plans to that side of today. Returns 403 for a caller who is not a member and has neither permission, and `[]` when no plan type is linked |
| POST | `/` | JWT | Groups.Edit | Create or update groups (auto-generates slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Delete a group (also deletes child teams for ministry groups) |

## Group Members

Base path: `/membership/groupmembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Get group member by ID |
| GET | `/` | JWT | GroupMembers.View* | List group members. Filter by `?groupId=`, `?groupIds=`, or `?personId=`. *Also allowed if user is in the group or querying own personId, and for `?groupId=` of any non-confidential group when the user has Attendance.View or Attendance.Edit (members under 13 are included for them) |
| GET | `/my` | JWT | — | Get current user's group memberships |
| GET | `/basic/:groupId` | JWT | — (confidential groups: group member or GroupMembers.View) | Get basic member list for a group (`id`, `groupId`, `personId`, `displayName`). For a confidential group the caller must belong to it or have GroupMembers.View (401 otherwise). Members known to be under 13 are left out unless the caller has GroupMembers.View, Attendance.View, or Attendance.Edit, or leads the group |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Get group leaders (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Get a group's public roster (minimal fields: `personId`, `displayName`, `leader`, photo). Only when the group opts in via `publicRoster`; powers the website builder's `staffGrid` element |
| POST | `/` | JWT | GroupMembers.Edit | Add or update group members |
| POST | `/bulk-add` | JWT | GroupMembers.Edit | Add several people to one group. Body: `{ groupId, personIds }`. People already in the group are skipped and the rest join as non-leaders. Returns `{ success, addedIds, count, batchId }` (`addedIds` are person ids) and sends `group.member.added` for each. 400 when `groupId` or `personIds` is missing. The `batchId` can be undone through [Batches](#batches) |
| POST | `/bulk-remove` | JWT | GroupMembers.Edit | Remove several people from one group. Body: `{ groupId, personIds }`. Ids that are not in the group are ignored. Returns `{ success, removedIds, count, batchId }` (`removedIds` are person ids) and sends `group.member.removed` for each. 400 when `groupId` or `personIds` is missing. The `batchId` can be undone through [Batches](#batches) |
| POST | `/self` | JWT | — | Join a group as the signed-in person. Body: `{ groupId }` (400 without it). Only works when the group's `joinPolicy` is `open`, which is the default. Returns 409 with `{ redirect: "request" }` when the group takes join requests (use [Group Join Requests](#group-join-requests)), 403 when the group is `closed` or is a confidential group that does not take requests, 404 when it is missing or archived, and 401 when the caller has no person record. A caller who already belongs gets the existing membership back. Sends `group.member.added` |
| DELETE | `/:id` | JWT | GroupMembers.Edit | Remove a group member |

## Group Join Requests

Base path: `/membership/groupjoinrequests`

Requests to join a group whose `joinPolicy` is `request`. A request's `status` is `pending`, `approved`, `declined`, or `cancelled`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | The signed-in person's requests, newest first, each with the group's `id` and `name` in `group` |
| GET | `/group/:groupId` | JWT | GroupMembers.Edit or group leader | Pending requests for one group, oldest first, each with the requester's name, photo, and email in `person` |
| GET | `/pending` | JWT | GroupMembers.Edit | Every pending request in the church, oldest first, with `person` and `group` |
| POST | `/` | JWT | — | Ask to join a group as the signed-in person. Body: `{ groupId, message }` (a single object; `message` is optional and cut to 1,000 characters). Returns 400 without `groupId` or when the group does not take requests, 404 when the group is missing or archived, and 409 when the caller is already a member. A second request while one is pending returns the existing one. Notifies the group's leaders and sends `group.member.requested` |
| POST | `/:id/approve` | JWT | GroupMembers.Edit or group leader | Approve a pending request: adds the person to the group as a non-leader, marks the request `approved`, notifies the requester, and sends `group.member.added`. 404 if not found, 400 if it is no longer pending |
| POST | `/:id/decline` | JWT | GroupMembers.Edit or group leader | Decline a pending request and notify the requester. Body: `{ declineReason }` (optional, cut to 500 characters, and included in the notification). 404 if not found, 400 if it is no longer pending |
| DELETE | `/:id` | JWT | Requester or GroupMembers.Edit | Cancel a request. A pending request is marked `cancelled` rather than deleted, and one that was already decided is left as it is. 404 if not found |

## Associated Groups

Base path: `/membership/associatedGroups`

Links a group to another record by `contentType` and `contentId`. Service plan types use it (`contentType` `planType`) to decide which groups see their plans; see `GET /membership/groups/:id/plans`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | The groups linked to one record, as `{ id, churchId, contentType, contentId, groupId, settings }` rows |
| GET | `/group/:groupId?contentType=` | JWT | — | The records linked to one group. `contentType` is optional and narrows the result to one type |
| POST | `/` | JWT | Plans.Edit | Create or update links (batch). Each item: `{ contentType, contentId, groupId, settings }`. On a `planType` link, a `settings` of `past` or `future` limits which plans the group sees |
| DELETE | `/:id` | JWT | Plans.Edit | Delete a link |

## Households

Base path: `/membership/households`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or People.Edit | List all households |
| GET | `/:id` | JWT | People.View, People.Edit, or own household | Get household by ID |
| POST | `/` | JWT | People.Edit | Create or update households |
| DELETE | `/:id` | JWT | People.Edit | Delete a household |

## Household Pickup

Base path: `/membership/householdpickup`

The people on a household's pickup list, each with a `status` of `trusted` or `notAuthorized`. Check-in reads the list so a kiosk can show who may pick up at check-out.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:householdId` | JWT | People.View, People.Edit, Attendance.Checkin, or own household | List a household's pickup people, sorted by `status` then `name` |
| POST | `/` | JWT | People.Edit | Create or update pickup people (batch). Each item: `{ householdId, name, status, personId, relationship, photoUrl, notes }`; `personId`, `relationship`, `photoUrl`, and `notes` are optional |
| DELETE | `/:id` | JWT | People.Edit | Delete a pickup person |

## Lists

Base path: `/membership/lists`

Saved people lists. A list stores a `rules` tree, `{ match, conditions, groups }`, that the server evaluates to find its people: `match` is `all`, `any`, or `none`, and each condition names a `provider` (`person`, `group`, `form`, `field`, `giving`, `attendance`, or `list`). See [Custom Person Fields](../custom-fields.md#filtering-people-and-saved-lists) for the custom field conditions. A list whose `scope` is `private` belongs to the person who created it; everyone else gets 404 for it.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View | List saved lists, sorted by category then name, each with `createdByPersonName`. Other people's private lists are left out |
| GET | `/:id` | JWT | People.View | Get a list by ID. 404 if it does not exist or is someone else's private list |
| GET | `/:id/people` | JWT | People.View | Evaluate the list's rules and return the matching people. 400 if the list has no `rules`. A list whose rules filter on giving also needs Donations.View (401 without it) |
| POST | `/preview` | JWT | People.View | Evaluate rules without saving a list and return the matching people. Body: `{ rules, householdInclusion }`; `rules` is required (400). Rules that filter on giving also need Donations.View (401 without it) |
| POST | `/` | JWT | People.Edit | Create or update lists (batch). Fields: `name`, `category`, `rules`, `conditions`, `scope` (`org` by default, or `private`), `householdInclusion` (`none` by default, `children`, or `household`), `autoRefresh`, `notifyOnChange`, and `actions`. The creator is set when the list is created and does not change. Rules that filter on giving also need Donations.View (401 without it), and updating a list the caller cannot see returns 404 |
| DELETE | `/:id` | JWT | People.Edit | Delete a list and its stored members. 404 for someone else's private list |

## Person Fields

Base path: `/membership/personfields`

The definitions of a church's custom person fields. See [Custom Person Fields](../custom-fields.md) for the field types, the value formats, and how to filter people by them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View | List the church's custom fields, ordered by `sort` then `name` |
| POST | `/` | JWT | People.Edit | Create or update fields (batch). Each item: `{ name, fieldType, choices, sort }`. Nothing is validated, and an update replaces every property, so leaving `choices` out clears it |
| DELETE | `/:id` | JWT | People.Edit | Delete a field and every value stored for it |

## Person Field Values

Base path: `/membership/personfieldvalues`

What each person has stored for each custom field, always as a string. See [Custom Person Fields](../custom-fields.md#field-values).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | People.View | Every custom field value stored for one person |
| GET | `/field/:fieldId` | JWT | People.View | One field's value for every person who has one |
| POST | `/` | JWT | People.Edit | Set or clear values (batch). Each item: `{ personId, fieldId, value }`. Values are matched on person and field, so a value that already exists is replaced, and an empty `value` deletes it. Returns every value now stored for each person named in the request |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Get role by ID |
| GET | `/church/:churchId` | JWT | Roles.View | Get all roles for a church. Each role includes `memberCount`, the number of distinct users in it |
| POST | `/` | JWT | Roles.Edit | Create or update roles |
| DELETE | `/:id` | JWT | Roles.Edit | Delete a role (also removes its permissions and members) |

## Role Members

Base path: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Get members for a role. Add `?include=users` to include user details |
| POST | `/` | JWT | Roles.Edit | Add members to a role (creates user if email doesn't exist) |
| DELETE | `/:id` | JWT | Roles.View | Remove a role member |
| DELETE | `/self/:churchId/:userId` | JWT | — | Remove yourself from a church |

## Role Permissions

Base path: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Get permissions for a role (use `null` as ID for "Everyone" role) |
| POST | `/` | JWT | Roles.Edit | Create or update role permissions |
| DELETE | `/:id` | JWT | Roles.Edit | Delete a role permission |

## Permissions

Base path: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Get the full list of available permissions |

Each entry has `apiName`, `section` (content type), `action`, and the `displaySection` / `displayAction` labels B1Admin's role editor shows. Recent additions: `MembershipApi` / `People` / `View Names` (**View People Names Only**, under People and Groups) and `GivingApi` / `Donations` / `Enter` (**Enter Donations**, under Donations; see [Donation Batches](./giving.md#donation-batches)).

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List all forms (admin sees all; editors see assigned + non-member forms) |
| GET | `/:id` | JWT | Form access | Get a form by ID |
| GET | `/archived` | JWT | Forms.Admin or Forms.Edit | List archived forms |
| GET | `/group/:groupId` | JWT | Group member, group leader, or Forms.Admin | Stand-alone forms linked to the group (`forms.groupId`), excluding archived ones, sorted by name. Returns `id`, `name`, `description`, and `open` (within the availability window). Members get only open forms; leaders and forms admins also get closed ones. Backs the group page's linked forms |
| GET | `/standalone/:id?churchId=` | JWT | — | Get a standalone form (restricted forms require auth) |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Create or update forms. Stand-alone forms accept an optional `photoUrl` (header photo shown above the form) and `groupId` (linked group) |
| POST | `/duplicate/:id` | JWT | Form access | Copy a form and its questions, and return the new form. The copy takes the original's name with ` (Copy)` added and is not archived, and each copied question's `showIf` condition points at the copied question it depends on |
| DELETE | `/:id` | JWT | Form access | Delete a form |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List submissions. Filter by `?personId=` or `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Self-scoped: up to 50 stand-alone form submissions (not person forms) the signed-in member submitted or that are linked to their person (`contentType` `person`, `contentId` = their person id -- for example, after an admin's change person), newest first, each with `form.name`. `include` attaches each form's questions and the submission's answers. Returns `401` if the user isn't linked to a person. Backs the **My Forms** section of the B1 Me page |
| GET | `/group/:groupId` | JWT | Leader of the group | Answers for the group's leaders: one entry per linked form and per group event with a registration form, each with `form`, `event` (`id`, `title`, `start`; event entries only), `questions`, and `submissions` (with `answers` and `personName`, `null` when anonymous) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, or view access | Get submission by ID. Add `?include=form,questions,answers`. Leaders of the form's linked group, and leaders of the group an event registration belongs to, can also read it |
| GET | `/formId/:formId` | JWT | Form access (view) | Get all submissions for a form (includes form, questions, answers). Leaders of the form's linked group have view access |
| POST | `/` | JWT | — | Submit form answers (handles restricted/unrestricted forms, sends email notifications). When the form has `autoCreatePerson`, finds-or-creates a Guest person by email and links the submission; when the form also has a `groupId`, adds that person to the group; when `followUpSubject`/`followUpBody` are set, sends a templated follow-up email to the submitter. Unless the caller can manage the form, `submittedBy` is always set to the signed-in member's person (or left empty for anonymous submissions) |
| POST | `/:id/person` | JWT | Form access | Link a submission to a person, or unlink it. Body: `{ personId }`. With a person id (400 if that person is not in the church) the submission's `contentType` becomes `person` and its `contentId` the person's id. With `null` the submission goes back to `contentType` `form` with the form's id as `contentId`, and `submittedBy` is cleared. Either way the caller is recorded as `revisedBy`. Returns the updated submission; 404 if it does not exist |
| DELETE | `/:id` | JWT | Forms.Admin or Forms.Edit | Delete a submission and its answers |

## Questions

Base path: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Form access | List questions for a form. Requires `?formId=` |
| GET | `/:id` | JWT | Form access | Get a question by ID |
| GET | `/unrestricted?formId=` | JWT | — | Get questions for an unrestricted form |
| GET | `/sort/:id/up` | JWT | — | Move a question up in sort order |
| GET | `/sort/:id/down` | JWT | — | Move a question down in sort order |
| POST | `/` | JWT | Form access | Create or update questions (auto-assigns sort order) |
| DELETE | `/:id?formId=` | JWT | Form access | Delete a question |

## Answers

Base path: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List answers. Filter by `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Create or update answers |

## Member Permissions

Base path: `/membership/memberpermissions`

Controls per-member access to specific forms.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Form access | Get a member permission by ID |
| GET | `/member/:id` | JWT | Form access | Get all form permissions for a member |
| GET | `/form/:id` | JWT | Form access | Get all member permissions for a form |
| GET | `/form/:id/my` | JWT | Form access | Get current user's permission for a form |
| POST | `/` | JWT | Form access | Create or update member permissions |
| DELETE | `/:id?formId=` | JWT | Form access | Delete a member permission |
| DELETE | `/member/:id?formId=` | JWT | Form access | Delete all permissions for a member on a form |

## Settings

Base path: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Get all settings for the church |
| GET | `/public/:churchId` | Public | — | Get public settings for a church |
| GET | `/public/:churchId/app-theme` | Public | — | The church's app theme: the value of its public `appTheme` setting, parsed as JSON. Returns `{}` when the setting is missing, not public, or not valid JSON |
| GET | `/public/:churchId/checkin-theme` | Public | — | The church's check-in theme: the value of its public `checkinTheme` setting, parsed as JSON. Returns `{}` when the setting is missing, not public, or not valid JSON |
| POST | `/` | JWT | Settings.Edit | Save settings (supports base64 image upload) |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a setting by ID |

## Domains

Base path: `/membership/domains`

The `authorize`, `hostmap`, `caddy`, and `caddy/init` routes exist for the custom-domain proxy and the people who run it, not for client apps. See [Caddy Custom-Domain Proxy](../../deployment/caddy-proxy.md) for how the proxy uses them.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all domains |
| GET | `/:id` | JWT | — | Get domain by ID |
| GET | `/lookup/:domainName` | JWT | Own church's domain, or Server.Admin | Look up a domain by name. Returns `{}` when the domain is not registered, and also when it belongs to another church unless the caller has Server.Admin |
| GET | `/public/lookup/:domainName` | Public | — | Public domain lookup by name |
| GET | `/public/owner/:domainName?churchId=` | Public | — | Yes/no check that a domain belongs to a church: `{ owned: true }` when the domain is registered to `churchId`, otherwise `{ owned: false }`. It never returns the owning church |
| GET | `/health/check` | Internal or JWT | Server.Admin (JWT callers) | Run health check on unchecked domains. Needs an `x-internal-key` header that matches the server's internal API key, or a JWT with Server.Admin (401 otherwise) |
| GET | `/authorize?domain=` | Public | — | Called by the Caddy proxy to ask whether a hostname is a registered custom domain. Returns 200 `{ authorized: true }` when the host (or, for a `www.` host, its bare domain) is in the domains table, and 404 otherwise. Caddy reads only the status code |
| GET | `/hostmap` | Internal or JWT | Server.Admin (JWT callers) | Called by the proxy's sync task, which has no JWT. Returns `text/plain`: one sorted, de-duplicated line per registered domain, holding the domain and the host it is served from. Needs an `x-internal-key` header that matches the server's internal API key, or a JWT with Server.Admin. |
| GET | `/caddy` | Internal or JWT | Server.Admin (JWT callers) | For operators. Rebuilds the proxy's route list from the registered domains, pushes it to the Caddy admin API when the server has one configured, and returns the generated config as JSON. Needs a matching `x-internal-key` header or a JWT with Server.Admin (401 otherwise) |
| GET | `/caddy/init` | Internal or JWT | Server.Admin (JWT callers) | For operators. Writes Caddy's base config (certificate storage, TLS policy, the HTTPS proxy server, and the HTTP redirect server) through its admin API and returns `{ success, results }`, with `error` and `step` added on failure. Does nothing when the server has no Caddy admin API configured. Same guard as `/caddy` |
| POST | `/` | JWT | Settings.Edit | Create or update domains (triggers Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a domain |

## Sites

Base path: `/membership/sites`

Additional websites for a church, each with its own subdomain. A domain points at a site through its `siteId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List the church's sites, sorted by name |
| POST | `/` | JWT | Settings.Edit | Create or update sites (batch). Each item needs a `name` and a `subDomain` of lower-case letters and numbers only (it is lower-cased and trimmed first). Church and site subdomains share one namespace, so a subdomain already used by any church or by another site is rejected. If any item fails, nothing is saved and the response is 400 with an `errors` array |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a site together with the website content that belongs to it (pages, blocks, links, and global styles), and clear `siteId` on the domains that pointed at it |

## User Church

Base path: `/membership/userchurch`

Manages the association between users and churches.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Get user-church record by user ID |
| GET | `/personid/:personId` | JWT | — | Get email for a person's linked user |
| GET | `/user/:userId` | JWT | Server.Admin | Load all churches for a user |
| POST | `/` | JWT | — | Create a user-church association |
| PATCH | `/:userId` | JWT | — | Update last accessed time and log access |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Delete a user-church record |

## Visibility Preferences

Base path: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Get current user's visibility preferences |
| POST | `/` | JWT | — | Save visibility preferences (address, phone, email visibility) |

## Query

Base path: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Natural language member search using AI. Body: `{ text, subDomain, siteUrl }` |

## Palette

Base path: `/membership/palette`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | The search index behind B1Admin's command palette: `{ items }`, where each item is `{ n, a, t, u }` (name, optional aliases, type, and target path). `t` is `do` (an action), `jump` (a page), `person`, `group`, `plan`, or `fund`. Only what the caller can open is included: people need People.View, plans need Plans.Edit or membership of a ministry group, funds need Donations.ViewSummary, and the action and page entries follow the caller's other permissions. Groups are always included |

## Client Errors

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Log a client-side error |

## Webhooks

Base path: `/membership/webhooks`

Manage a church's outbound webhook subscriptions and inspect their deliveries. See [Webhooks](../webhooks.md) for the event catalog, payload format, signatures, connector types, and retry rules.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | List the church's webhooks, newest first. The signing `secret` is left out |
| GET | `/events` | JWT | Settings.Edit | The valid event names, as `{ groups, all }`: `groups` maps each entity to its events and `all` is the flat list |
| GET | `/:id` | JWT | Settings.Edit | Get one webhook, without its `secret`. 404 if not found |
| GET | `/:id/deliveries` | JWT | Settings.Edit | The webhook's 50 most recent deliveries, newest first |
| GET | `/deliveries/:deliveryId` | JWT | Settings.Edit | One delivery, with the payload sent and the response received. 404 if not found |
| POST | `/` | JWT | Settings.Edit | Create (no `id`) or update (with `id`) one webhook. The body is a single object, not an array: `{ name, url, events, active, connectorType, connectorConfig }`. `events` needs at least one valid event name and `url` must be a public `https` address (400 otherwise). `connectorType` is `standard` (the default), `slack`, `discord`, or `mailchimp`. The signing `secret` is in the response only when the webhook is created, and not for a `mailchimp` webhook. 404 when updating a webhook that does not exist |
| POST | `/:id/test` | JWT | Settings.Edit | Send a sample event now and return the delivery with its `responseStatus` and `responseBody`. Body: `{ event }` (optional; when it is not one of the webhook's events, the first subscribed event is used). A `mailchimp` webhook has its stored credentials checked instead. 404 if not found |
| POST | `/:id/regenerate-secret` | JWT | Settings.Edit | Replace the signing secret and return `{ id, secret }`. This is the only time the new value is returned. 404 if not found |
| POST | `/deliveries/:deliveryId/redeliver` | JWT | Settings.Edit | Queue a new delivery with the same event and payload as an earlier one, and return it. 404 if not found |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a webhook |

## Audit Logs

Base path: `/membership/auditlogs`

The audit log records who changed what. Each entry has `userId`, `category`, `action`, `entityType`, `entityId`, `details` (a JSON string), `ipAddress`, `module`, `batchId`, and `created`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/?category=&module=&userId=&entityType=&entityId=&startDate=&endDate=&limit=&offset=` | JWT | Settings.Edit | Search the church's audit log, newest first. Every filter is optional. Returns `{ logs, count, limit, offset }`, where `count` is the total number of entries that match. `limit` defaults to 100 and is capped at 1,000 |
| GET | `/person/:personId?limit=&offset=` | JWT | Settings.Edit | Entries for one id, newest first: those whose `entityType` is `person` and whose `entityId` is the id, plus those whose `userId` is the id. `limit` defaults to 100 and is capped at 1,000 |

## Batches

Base path: `/membership/batches`

A batch groups a run of changes so they can be reviewed and undone together. Open one with `POST /`, send its id in an `X-Batch-Id` header on each save or delete, then complete it. While the header is present the API records a before and after image of every record the request touches. Only routes that can be undone accept the header (others return 400 `Route is not batch-capable`), and a batch that is unknown, closed, or from another church returns 403. The bulk routes for people and group members open and complete their own batch and return its `batchId`.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | List the church's batches, newest first (up to 500) |
| GET | `/:id/results` | JWT | Batch owner or Settings.Edit | `{ batch, rows }`: the batch and the audit log entries recorded under it, oldest first. 404 if not found |
| POST | `/` | JWT | — | Open a batch owned by the caller. Body: `{ label, source }` (both optional). Returns the batch with its `id` and a `status` of `open` |
| POST | `/:id/complete` | JWT | Batch owner or Settings.Edit | Close an open batch and store how many entries it recorded. 400 if the batch is not open, 404 if not found |
| POST | `/:id/undo` | JWT | Batch owner or Settings.Edit | Reverse a completed batch. Each record goes back to how it was before the batch, and a record that has been changed again since is skipped. Returns `{ restored, skippedConflicts, failed, status }`, where `status` is `undone` or `partial`. 400 if the batch is not completed or was created more than 30 days ago, 404 if not found |

## GDPR

Base path: `/membership/gdpr`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/people/:personId/export` | JWT | People.Edit | Everything stored about one person, across all modules, as a single JSON object: the person and household, groups and join requests, visibility preferences, custom field values, form permissions and submissions (with answers), donations and payment records, visits, devices, notifications, private messages, notes, serving assignments, blockout dates and tasks, registrations, event RSVPs and bookings, and documents. Confidential notes are included only when the caller also has People.ViewConfidentialNotes; `confidentialNotesIncluded` says whether they were |
| DELETE | `/people/:personId/anonymize` | JWT | People.Edit | Erase one person's personal data. The person record stays but is renamed (first name `Anonymized`, last name `User`), loses its contact and personal fields, and is marked removed and opted out. Group memberships, payment methods and subscriptions, devices, notifications, private messages, serving assignments, blockout dates, registrations, documents, and the photo are deleted. Donations and visits are kept without the person, and the text of messages the person posted is cleared. The person's login is removed from this church, and deleted when no other church uses it. Returns 400 when the person is the church's only Domain Admin. Sends `person.destroyed`. This cannot be reversed |

## Server Health

Base path: `/membership/serverHealth`

Diagnostics for whoever runs the server, used by the server admin page. Every route needs the Server.Admin permission, which no church role or API key scope grants. `:module` is one of `membership`, `attendance`, `content`, `giving`, `messaging`, `doing`, or `commons`; anything else returns 400.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Server.Admin | Configuration checklist: `{ environment, groups }`, where each group lists items as `{ key, label, configured, detail }`. It says whether each setting is present (secrets, mail, storage, third-party keys, module URLs, database connections) and never returns a secret's value. `detail` carries only non-secret names such as the environment, mail system, and file store |
| GET | `/jobs` | JWT | Server.Admin | Scheduled job status: `{ latest, recentFailures }`, the most recent run of each job and the 25 most recent failed runs |
| GET | `/migrations` | JWT | Server.Admin | Database migration status: `{ environment, modules }`, with one entry per module holding `applied` (a count), `pending` (names), `lastApplied`, and `noHistory` |
| GET | `/migrations/:module/detect?rerun=` | JWT | Server.Admin | Read-only. For a module with no migration history, works out which migrations its live schema already reflects and returns `{ module, migrations, suggested, blocked }`. `rerun` is an optional comma-separated list of partly applied migrations to run again instead of recording them |
| POST | `/migrations/:module/run` | JWT | Server.Admin | Apply one module's pending migrations, oldest first, stopping at the first failure. Returns `{ module, applied, failed, error, status }`. A module with no migration history is refused: nothing runs and `error` explains why |
| POST | `/migrations/:module/baseline` | JWT | Server.Admin | Record migrations as already applied without running them, for a module with no migration history. Body: `{ names, rerun }`, where `names` must be exactly what `detect` suggests right now for the same `rerun`. Returns `{ module, recorded, error, status }`; on a mismatch nothing is recorded and `error` explains why |

## Related Pages

- [Authentication & Permissions](./authentication.md) — Login flow, JWT, OAuth, permission model
- [Attendance Endpoints](./attendance.md) — Service and visit tracking
- [Module Structure](../module-structure.md) — Code organization patterns
