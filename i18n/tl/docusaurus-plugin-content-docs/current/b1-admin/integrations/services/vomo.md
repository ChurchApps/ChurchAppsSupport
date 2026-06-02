---
title: "VOMO"
---

# VOMO

<div class="article-intro">

Ang VOMO ay isang volunteer engagement platform — ang mga tao ay nag-sign up para sa mga proyekto, nag-check in sa kiosk, at nagsasaipon ng mga oras. Kung gumagamit ka ng VOMO para sa volunteer scheduling ngunit B1 para sa mga people records, ang Zapier ay maaaring mag-sync ng membership at check-ins sa pagitan ng mga ito upang walang drift ang alinman.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [VOMO](https://vomo.org) account sa isang plan na nag-expose ng Zapier (makipag-ugnayan sa VOMO support kung hindi ka sigurado)
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

Ang Zapier app ng VOMO ay nag-expose ng apat na instant triggers at apat na actions. Ang mga recipe na karamihan ng mga churches ay gusto:

| Direction | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (kung bago) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member sa "Currently Serving" group, o mag-record bilang attendance |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (ayon sa email); kung hindi, custom step |
| Either | VOMO Participation (signups) | B1: Add Group Member sa project-specific group |

Ang VOMO actions ay limitado sa **pagdadraft ng mga proyekto** at **paghahanap** ng existing organizers/projects — walang "add this person to a VOMO project" action ngayon. Ang interesting wiring ay karamihan VOMO → B1.

## Setup

### 1. Mag-mint ng isang B1 API key

**Settings → Developer → API Keys → New API Key**. Mga scopes:

- `people:read`, `people:write` — upang hanapin at lumikha ng mga volunteers bilang B1 people
- `groups:write` — upang magdagdag sa kanila sa serving-team groups
- (Optional) `attendance:write` kung i-treat ang kiosk check-ins bilang attendance

### 2. Bumuo ng membership-sync Zap

1. **Trigger** — VOMO: Membership (event = `created`).
2. **Action** — B1.church: Find Person, matched sa email.
3. **Filter / Path** — i-fork sa found vs. not found:
   - Not found → B1.church: Create Person, pagkatapos Add Group Member sa appropriate volunteer group.
   - Found → B1.church: Add Group Member direkta.
4. I-on. Ang mga bagong VOMO volunteers ay lumalabas na sa B1 na may tamang group membership.

### 3. (Optional) Bumuo ng kiosk-check-in Zap

1. **Trigger** — VOMO: Kiosk
2. **Action** — B1.church: Find Person (ayon sa email)
3. **Action** — iyong pagpipilian:
   - *Kung i-treat bilang attendance* — Webhooks by Zapier POST sa B1's `/attendance/visits` endpoint (ang B1's Zapier app ay wala pang first-class *Record Attendance* action). Ang B1 [API key](/docs/developer/api/api-keys) ay napupunta sa `Authorization: Bearer cak_…` header.
   - *Kung i-treat bilang group membership* — B1.church: Add Group Member na may "Currently Serving (Today)" group, at isang pangalawang Zap mamaya sa araw ay nag-aalis sa kanila sa pamamagitan ng scheduled cleanup.

## Mga Karaniwang Recipes

### Per-project group sync

- **Trigger** — VOMO: Participation (created)
- **Action** — Filter by Zapier sa project id, pagkatapos
- **Action** — B1.church: Add Group Member sa B1 group na ang pangalan ay sumasalamin sa VOMO project.

Kapag ang VOMO project ay nagtapos, manu-manong burahin ang B1 group (o i-pair ito sa *Participation deleted* trigger na nag-aalis sa kanila).

### Magpadala ng "thanks for signing up" text sa SMS

Chain VOMO Participation → Clearstream Send Text o Text In Church Send Message sa parehong Zap. Pareho ay may first-class Zapier actions — tingnan ang [Clearstream](./clearstream) at [Text In Church](./text-in-church).

### Detect drop-off

Magpatakbo ng daily Zapier *Schedule* trigger na tumatawag sa Find Organizer sa VOMO para sa listahan ng B1 people na sumali sa serving team ngayong buwan — kung ang VOMO ay nagbabalik ng "not found", sila ay hindi nag-activate ng VOMO at kailangan ng nudge.

## Mga Limitasyon at Mga Tala

- **Ang email ay ang join key.** Ang VOMO's payloads ay nag-expose ng user email ngunit walang B1 person id. Ang mga donor na gumagamit ng iba't ibang emails sa bawat sistema ay maglikha ng duplicates.
- **Walang "Add to Project" action sa VOMO's Zapier app ngayon.** Kung kailangan mo ng B1 → VOMO project enrollment, POST mo sa VOMO's REST API mula sa *Webhooks by Zapier* step, na isa custom integration.
- **Ang VOMO's free / lower tiers ay maaaring hindi kasama ang Zapier.** Kumpirmahin sa VOMO support bago magpromisa ng wiring date.

## Troubleshooting

- **Trigger ay hindi kailanman nag-fire** — Ang VOMO's instant triggers ay nangangailangan ng API token upang manatiling valid. Muling subukan ang Zap; muling kumonekta sa VOMO kung ang token ay ino-rotate.
- **B1 *Add Group Member* ay nabigo na may 422** — ang group id sa action ay hindi umiiral. Buksan ang **B1Admin → Groups**, mag-click ng group, at kopyahin ang URL's id segment sa Zap step.
- **Duplicate B1 people mula sa isang solong VOMO volunteer** — malamang na nag-sign up sila sa ilalim ng ibang email kaysa sa kanilang mayroon na sa B1. Alinman i-standardize ang mga email, o magdagdag ng Zapier *Path* na nagsasaliksik din ayon sa phone bago lumikha.

## Makita Din

- [Zapier (overview)](../zapier) — B1 side ng bawat Zapier recipe
- [Clearstream](./clearstream), [Text In Church](./text-in-church) — i-pair ang volunteer signups na may SMS confirmations
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang events na maaari nang mag-trigger ng VOMO
