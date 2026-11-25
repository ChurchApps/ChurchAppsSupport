---
title: "Zapier"
description: "Connect B1 Admin to Zapier to start automations on new people, donations, and group members, and write records back to B1 with no coding required."
---

# Zapier

<div class="article-intro">

The official B1.church app on Zapier lets a Zap react to events in your church (new person, new donation, new group member, …) and write records back to B1. No coding, no infrastructure — you wire it up in Zapier's drag-and-drop editor, paste an API key, and turn the Zap on.

</div>

:::caution Waiting on Zapier's approval
The B1.church app is built and working, but it is still waiting on Zapier's review before it appears publicly in the Zap editor's app directory. Until it's approved, only invited accounts can use it. Everything below describes how it will work once approved.
:::

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Zapier](https://zapier.com) account (the free tier is enough for a handful of Zaps)
- A church admin with the **Edit Settings** permission in B1Admin (you'll create an API key)
- An idea of what you want to do — e.g. "when a person is added in B1, add them to my Mailchimp list"

</div>

## Triggers, Actions, and Searches

### Triggers

There is one trigger for each B1 [webhook event](../../developer/api/webhooks.md#event-catalog), 25 in all. Every trigger needs the **`settings:write`** scope, because turning the Zap on registers a webhook for it. The last column is the extra scope that lets Zapier load real records from your church when you test the trigger. Without that scope, or where the column says *sample only*, the test uses a built-in sample and the trigger still works.

| Trigger | B1 event | Fires when | Scope for real test records |
|---|---|---|---|
| New Person | `person.created` | A person is added | `people:read` |
| Updated Person | `person.updated` | A person record is changed | `people:read` |
| Deleted Person | `person.destroyed` | A person is deleted or anonymized | Sample only |
| New Group | `group.created` | A group is created | None needed |
| Updated Group | `group.updated` | A group's settings are changed | None needed |
| Deleted Group | `group.destroyed` | A group is deleted | Sample only |
| New Group Member | `group.member.added` | A person is added to a group | `groups:read` |
| Removed Group Member | `group.member.removed` | A person is removed from a group | Sample only |
| New Group Join Request | `group.member.requested` | A person asks to join a group that needs approval | Sample only |
| New Household | `household.created` | A household is created | `people:read` |
| Updated Household | `household.updated` | A household is edited | `people:read` |
| Deleted Household | `household.destroyed` | A household is deleted | Sample only |
| New Donation | `donation.created` | A gift is recorded, by manual entry or online giving | `donations:read` |
| Updated Donation | `donation.updated` | An existing donation is edited | `donations:read` |
| New Attendance Record | `attendance.recorded` | A person's attendance is recorded, by check-in or by marking them present | Sample only |
| New Attendance Checkout | `attendance.checkout` | A person is checked out of a service or class | Sample only |
| New Attendance Session | `session.created` | An attendance session (a group or service meeting on a date) is created | Sample only |
| New Form Submission | `form.submission.created` | A form is submitted | `forms:write` |
| New Event | `event.created` | A calendar event is created | Sample only |
| Updated Event | `event.updated` | A calendar event is changed | Sample only |
| Deleted Event | `event.destroyed` | A calendar event is deleted | Sample only |
| New Registration | `registration.created` | Someone registers for an event | Sample only |
| Cancelled Registration | `registration.cancelled` | An event registration is cancelled | Sample only |
| New List Member | `list.member.added` | The nightly refresh adds a person to a saved list | Sample only |
| Removed List Member | `list.member.removed` | The nightly refresh removes a person from a saved list | Sample only |

Two of these behave differently from what their names suggest:

- **New Donation** fires once, when the gift is first recorded. It does not fire again when a pending gift (a bank transfer that is still settling, for example) later completes.
- **New List Member** and **Removed List Member** only fire for a [saved list](../people/lists.md#nightly-refresh) that has **Refresh nightly** checked, and they fire during that nightly refresh rather than the moment a person starts or stops matching.

### Actions

| Action | What it does | Scope |
|---|---|---|
| Create Person | Adds a new person from a first name, last name, and optional email and mobile phone | `people:write` |
| Update Person | Changes a person's first name, last name, email, mobile phone, or membership status. Fields you leave blank keep their current value | `people:write` |
| Add Donation | Records a donation, with an optional fund. Leave **Person** blank for an anonymous gift | `donations:write` |
| Add Group Member | Adds a person to a group | `groups:write` |
| Remove Group Member | Removes a person from a group. Fails the Zap if they are not in the group | `groups:write` |
| Find Person | Looks up a person by id, email, or name. Fails the Zap if nobody matches | `people:read` |

The app has no action for adding a person to a saved list, creating a household, or recording attendance.

### Searches

| Search | What it does | Scope |
|---|---|---|
| Find Person | Finds a person by id, email, or name | `people:read` |
| Find Group | Finds a group by its exact name, ignoring capital letters | None needed |
| Find or Create Person | Runs Find Person and, if nobody matches, creates the person | `people:write` |

**Find Person** uses the first of id, email, and name that you fill in. An email has to match the whole address (capital letters aside), while a name can match part of a name; when several people match a name, the first by last name is used. It exists as both a search and an action. The search returns nothing when nobody matches, and the action stops the Zap with an error. Use **Find or Create Person** when someone who is not in B1 yet should be added.

Combine these freely with any of Zapier's 7,000+ supported apps.

## Setup

### 1. Create a B1 API key

1. In B1Admin go to **Settings → Developer → API Keys**.
2. Click **New API Key**, give it a name like "Zapier", and select the scopes the Zap needs.
3. **Important:** always include the **`settings:write`** scope. Zapier checks the key against B1's webhook list when you connect it, and B1 triggers register a webhook on your behalf when the Zap turns on — both need `settings:write`. A key without it fails the connection test, even if your Zaps only use B1 actions.
4. Also grant the scopes your triggers, actions, and searches need. The tables above list them. For example, Add Donation needs `donations:write` and Create Person needs `people:write`.
5. Save. The full `cak_…` key is shown **once** — copy it.

### 2. Connect Zapier to B1

1. In Zapier, build a new Zap.
2. When you pick a B1 trigger or action for the first time, Zapier asks you to **Sign in to B1.church**.
3. Paste the API key from step 1 into **API Key** (leave **API URL** blank) and click **Yes, Continue**. Zapier validates it against your church.

The connection is saved in Zapier and reused by every Zap on your account.

### 3. Build the Zap

Pick a trigger, then add one or more action steps. Examples below.

## Common Recipes

### Add new B1 people to Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. Map B1's `name__first`, `name__last`, `contactInfo__email` into Mailchimp's First Name / Last Name / Email fields.

### Post donations to a Slack channel with a richer card than the built-in connector

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Compose any layout — buttons, attachments, etc. — that the built-in [Slack connector](./slack-discord.md) can't.

### Add new group members to a Google Group

- **Trigger** — B1: New Group Member
- **Action** — Filter by Zapier: only continue if the trigger's `groupId` is the B1 group you care about
- **Action** — B1: Find Person (use the trigger's `personId` to fetch the email)
- **Action** — Google Groups: Add Member

### Forward form submissions to a project tracker

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## How Triggers Work Under the Hood

Triggers are **REST hooks**, not polling — Zapier doesn't ping B1 every 15 minutes. When you turn the Zap on, Zapier asks B1 to register a webhook pointing at a private Zapier URL; when the event fires, B1 POSTs the envelope to Zapier and your Zap kicks off **within seconds**. Turn the Zap off and Zapier asks B1 to delete the webhook — no orphan subscriptions.

This means the trigger only fires for events that happen **after** the Zap is turned on. There is no backfill — turning a Zap on does not replay yesterday's donations.

## Limits & Notes

- **Multiple Zaps with the same trigger** each register their own B1 webhook — there's no conflict, but it's worth knowing if you're inspecting **Settings → Developer → Webhooks** and wondering why three identical `Zapier — donation.created` rows are there.
- **Test data in Zap setup.** When you build a Zap, Zapier asks for sample data to map fields. For people, groups, group members, households, donations, and form submissions it pulls recent records from your church, as long as the key has the read scope shown in the trigger table. For every other trigger, and when the key lacks that scope, it uses a built-in sample.
- **Action failures surface as Zap errors** in Zapier's task history. Common cause: an API key without the right scope (e.g. an "Add Donation" action needs `donations:write`). Re-mint the key with the correct scopes and re-connect in Zapier.
- **Outbound API call quotas** — every B1 API call from an action counts toward your Zapier task quota, not toward anything on B1's side.

## Troubleshooting

- **"Authentication failed"** when connecting — the API key is wrong, deleted, or missing `settings:write`. Create a new key in B1Admin with `settings:write` plus whatever resource scopes the Zap touches (scopes can't be changed on an existing key), then update the connection.
- **Trigger never fires** — confirm the webhook actually got registered: in B1Admin, **Settings → Developer → Webhooks** should now show a row named "Zapier — &lt;event&gt;". If it's not there, the API key probably lacked `settings:write` when you turned the Zap on. Fix the key, toggle the Zap off and back on.
- **Trigger fires twice** — Zapier occasionally redelivers if its acknowledgement was lost. Use a "Filter by Zapier" step on a unique id (e.g. the person's `id`) if you need strict deduplication.

## See Also

- [Slack & Discord](./slack-discord.md) — simpler chat notifications without Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
