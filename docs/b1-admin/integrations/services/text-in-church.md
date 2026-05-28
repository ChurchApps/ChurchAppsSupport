---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) bundles SMS plus drip workflows and connect-card automations. Its Zapier app exposes both directions — pipe B1 events into a Text In Church workflow, and pull connect-card or new-contact triggers out the other side into B1.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A [Text In Church](https://textinchurch.com) account on a plan that includes the Zapier integration
- A [Zapier](https://zapier.com) account
- A B1Admin user with **Edit Settings** permission

</div>

## What You Can Wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message via the relevant team |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (mirror group membership) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church actions also include *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, and group membership add/remove.

## Setup

### 1. Mint a B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — required for B1-triggered Zaps
- `people:read`, `people:write` — to find or create the person
- `groups:write` — for group syncing
- (Optional) `donations:write` if you wire gift confirmations to TIC

### 2. Connect Text In Church to Zapier

Follow [Text In Church's Zapier integration guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). They generate an API token from inside the TIC dashboard.

### 3. Build the connect-card-to-B1 Zap

The most common direction. Connect cards fired from TIC become new B1 people automatically.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Action** — B1.church: Find Person (by email).
3. **Path** — branch on found / not found:
   - Not found → B1.church: Create Person.
   - Found → continue.
4. **Action** — B1.church: Add Group Member to a "New Contact" group.

Turn the Zap on. The next connect card submitted through TIC lands in **B1Admin → People** automatically.

## Common Recipes

### Trigger a connect-card-style workflow from a B1 form

- **Trigger** — B1.church: New Form Submission (filter on the "I'm new here" form id)
- **Action** — Text In Church: Create/Update Person, mapping the form's email / phone / name answers
- **Action** — Text In Church: Add to Group, where the group has a pre-built welcome workflow attached

### Mirror group membership

- **Trigger** — B1.church: New Group Member, filtered on a specific `groupId`
- **Action** — Text In Church: Add to Group (same person, mirror group). Pair with a `group.member.removed` Zap if you want full sync.

### Page a leader when someone joins

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, recipient = the group leader's phone, body = `"{first} {last} just joined {group}"`.

## Limits & Notes

- **TIC's Zapier app gates behind plan tier.** If the Zapier integration is greyed out in the TIC dashboard, contact TIC support to enable it on your plan.
- **Group ids are TIC's, not B1's.** When mirroring, you'll maintain a mapping table somewhere (a Zapier *Lookup Table*, or hard-coded per-Zap).
- **Send Text Message costs credits.** Each Zap that fires *Send Text* consumes from your TIC SMS allotment.

## Troubleshooting

- **Connect-Card trigger doesn't fire** — TIC needs the Zapier integration toggle on. Also verify the form you tested with is configured as a "Connect Card", not a generic survey.
- **Create Person in B1 fails with 401** — the API key is wrong, revoked, or missing `people:write`. Re-mint.
- **Duplicate B1 people** — TIC sends both *Person Created* and *Connect Card Submitted* for the same event. Pick one as your source of truth and add a Zapier Filter on the other.

## See Also

- [Clearstream](./clearstream) — alternative SMS platform with similar Zapier shape
- [Zapier (overview)](../zapier) — B1 side of every Zapier recipe
- [Text In Church Zapier guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC's docs)
