---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

Ang [Text In Church](https://textinchurch.com) ay nagbu-bundle ng SMS plus drip workflows at connect-card automations. Ang Zapier app ay nag-expose ng parehong direksyon — mag-pipe ng B1 events sa isang Text In Church workflow, at ibalik ang mga connect-card o bagong-contact triggers sa B1.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Text In Church](https://textinchurch.com) account sa isang plan na kasama ang Zapier integration
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

| Direction | Trigger | Action |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message sa pamamagitan ng relevant team |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (mirror group membership) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Ang mga actions ng Text In Church ay nagsasama din ng *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, at group membership add/remove.

## Setup

### 1. Mag-mint ng isang B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — kinakailangan para sa B1-triggered Zaps
- `people:read`, `people:write` — upang hanapin o lumikha ng tao
- `groups:write` — para sa group syncing
- (Optional) `donations:write` kung i-wire mo ang gift confirmations sa TIC

### 2. Konektahan ang Text In Church sa Zapier

Sundin ang [Text In Church's Zapier integration guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Lumilikha sila ng isang API token mula sa loob ng TIC dashboard.

### 3. Bumuo ng connect-card-to-B1 Zap

Ang pinakakaraniwang direksyon. Ang mga connect card na pinagsama mula sa TIC ay nagiging automatic na bagong B1 people.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Action** — B1.church: Find Person (ayon sa email).
3. **Path** — i-branch sa found / not found:
   - Not found → B1.church: Create Person.
   - Found → magpatuloy.
4. **Action** — B1.church: Add Group Member sa isang "New Contact" group.

I-on ang Zap. Ang susunod na connect card na isinumite sa pamamagitan ng TIC ay lumalopad sa **B1Admin → People** nang awtomatiko.

## Mga Karaniwang Recipes

### Mag-trigger ng connect-card-style workflow mula sa B1 form

- **Trigger** — B1.church: New Form Submission (filter sa "I'm new here" form id)
- **Action** — Text In Church: Create/Update Person, nag-map ng form's email / phone / name answers
- **Action** — Text In Church: Add to Group, kung saan ang group ay may pre-built welcome workflow na naka-attach

### Mirror group membership

- **Trigger** — B1.church: New Group Member, filtered sa specific `groupId`
- **Action** — Text In Church: Add to Group (parehong tao, mirror group). I-pair gamit ang `group.member.removed` Zap kung gusto mo ang full sync.

### I-page ang leader kapag may sumali

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message, recipient = ang phone ng group leader, body = `"{first} {last} just joined {group}"`.

## Mga Limitasyon at Mga Tala

- **Ang TIC's Zapier app ay nag-gate sa likod ng plan tier.** Kung ang Zapier integration ay nag-gray out sa TIC dashboard, makipag-ugnayan sa TIC support upang i-enable ito sa iyong plan.
- **Ang group ids ay ng TIC, hindi B1's.** Kapag nag-mirror, mapapanatili mo ang mapping table sa isang lugar (isang Zapier *Lookup Table*, o hard-coded per-Zap).
- **Ang Send Text Message ay gumagamit ng credits.** Bawat Zap na nag-fire ng *Send Text* ay umuubos mula sa iyong TIC SMS allotment.

## Troubleshooting

- **Connect-Card trigger ay hindi nag-fire** — kailangan ng TIC ang Zapier integration toggle sa. I-verify din na ang form na sinubukan mo ay naka-configure bilang "Connect Card", hindi isang generic survey.
- **Create Person sa B1 ay nabigo na may 401** — ang API key ay mali, revoked, o nawawalan ng `people:write`. Muling mag-mint.
- **Duplicate B1 people** — Ang TIC ay nagpapadala ng parehong *Person Created* at *Connect Card Submitted* para sa parehong event. Pumili ng isa bilang iyong source of truth at magdagdag ng Zapier Filter sa iba.

## Makita Din

- [Clearstream](./clearstream) — alternatibong SMS platform na may katulad na Zapier shape
- [Zapier (overview)](../zapier) — B1 side ng bawat Zapier recipe
- [Text In Church Zapier guide](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC's docs)
