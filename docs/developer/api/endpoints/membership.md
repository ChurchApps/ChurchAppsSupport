---
title: "Membership Endpoints"
---

# Membership Endpoints

<div class="article-intro">

The Membership module manages people, churches, groups, households, roles, permissions, forms, and settings. It is the largest module and provides the core identity and authorization layer for all other modules.

</div>

**Base path:** `/membership`

## People

Base path: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View or Member | List all people for the church |
| GET | `/:id` | JWT | People.View or own record | Get a person by ID (includes form submissions) |
| GET | `/ids?ids=` | JWT | People.View or Member | Get multiple people by comma-separated IDs |
| GET | `/basic?ids=` | JWT | — | Get basic info (name only) for multiple people |
| GET | `/recent` | JWT | People.View or Member | Recently added people |
| GET | `/search?term=&email=` | JWT | People.View or Member | Search people by name or email |
| GET | `/search/phone?number=` | JWT | People.View or Member | Search by phone number |
| GET | `/search/group?groupId=` | JWT | People.View or Member | Get people in a specific group |
| GET | `/household/:householdId` | JWT | — | Get all people in a household |
| GET | `/attendance` | JWT | People.Edit | Load attendees with filters (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Load timeline data for people and groups |
| GET | `/directory/:id` | JWT | — | Get person for directory view (respects visibility preferences) |
| GET | `/claim/:churchId` | JWT | — | Claim a person record for the current user at a church |
| POST | `/` | JWT | People.Edit or EditSelf | Create or update people (batch) |
| POST | `/search` | JWT | People.View or Member | Search people (POST variant) |
| POST | `/advancedSearch` | JWT | People.View or Member | Multi-condition search (age, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Public | — | Find or create a person by email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Update household member assignments |
| POST | `/public/email` | Public | — | Send an email to a person. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Load person emails by IDs (server-to-server, requires jwtSecret) |
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

See [Authentication & Permissions](./authentication) for login, registration, and password management endpoints.

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
| POST | `/byIds` | Public | — | Load multiple churches by IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Delete churches abandoned for 7+ days |

## Groups

Base path: `/membership/groups`

Extends standard CRUD (GET `/`, GET `/:id` from base class).

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
| POST | `/` | JWT | Groups.Edit | Create or update groups (auto-generates slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Delete a group (also deletes child teams for ministry groups) |

## Group Members

Base path: `/membership/groupmembers`

Extends standard CRUD (GET `/:id`, DELETE `/:id` from base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Get group member by ID |
| GET | `/` | JWT | GroupMembers.View* | List group members. Filter by `?groupId=`, `?groupIds=`, or `?personId=`. *Also allowed if user is in the group or querying own personId |
| GET | `/my` | JWT | — | Get current user's group memberships |
| GET | `/basic/:groupId` | JWT | — | Get basic member list for a group |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Get group leaders (public) |
| POST | `/` | JWT | GroupMembers.Edit | Add or update group members |
| DELETE | `/:id` | JWT | GroupMembers.View | Remove a group member |

## Households

Base path: `/membership/households`

Standard CRUD controller.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all households |
| GET | `/:id` | JWT | — | Get household by ID |
| POST | `/` | JWT | People.Edit | Create or update households |
| DELETE | `/:id` | JWT | People.Edit | Delete a household |

## Roles

Base path: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Get role by ID |
| GET | `/church/:churchId` | JWT | Roles.View | Get all roles for a church |
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

## Forms

Base path: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List all forms (admin sees all; editors see assigned + non-member forms) |
| GET | `/:id` | JWT | Form access | Get a form by ID |
| GET | `/archived` | JWT | Forms.Admin or Forms.Edit | List archived forms |
| GET | `/standalone/:id?churchId=` | JWT | — | Get a standalone form (restricted forms require auth) |
| POST | `/` | JWT | Forms.Admin or Forms.Edit | Create or update forms |
| DELETE | `/:id` | JWT | Form access | Delete a form |

## Form Submissions

Base path: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin or Forms.Edit | List submissions. Filter by `?personId=` or `?formId=` |
| GET | `/:id` | JWT | Forms.Admin or Forms.Edit | Get submission by ID. Add `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Form access | Get all submissions for a form (includes form, questions, answers) |
| POST | `/` | JWT | — | Submit form answers (handles restricted/unrestricted forms, sends email notifications) |
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
| POST | `/` | JWT | Settings.Edit | Save settings (supports base64 image upload) |

## Domains

Base path: `/membership/domains`

Extends standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` from base class).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | List all domains |
| GET | `/:id` | JWT | — | Get domain by ID |
| GET | `/lookup/:domainName` | JWT | — | Look up a domain by name |
| GET | `/public/lookup/:domainName` | Public | — | Public domain lookup by name |
| GET | `/health/check` | Public | — | Run health check on unchecked domains |
| POST | `/` | JWT | Settings.Edit | Create or update domains (triggers Caddy update) |
| DELETE | `/:id` | JWT | Settings.Edit | Delete a domain |

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

## Client Errors

Base path: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Log a client-side error |

## Related Pages

- [Authentication & Permissions](./authentication) — Login flow, JWT, OAuth, permission model
- [Attendance Endpoints](./attendance) — Service and visit tracking
- [Module Structure](../module-structure) — Code organization patterns
