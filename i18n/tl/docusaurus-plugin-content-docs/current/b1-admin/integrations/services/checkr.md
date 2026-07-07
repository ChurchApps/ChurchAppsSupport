---
title: "Checkr"
---

# Checkr

<div class="article-intro">

Ang [Checkr](https://checkr.com) ay nag-run ng background screening para sa staff at volunteers — isang halos unibersal na pangangailangan para sa kahit na anong simbahan na gumagawa ng isang children's o youth program. Ang B1 ay **walang built-in na background-check feature** -- ang pag-order ng mga check, pag-track ng mga resulta, at compliance sa screening ay lahat ay naninirahan sa Checkr; ang recipe sa ibaba ay nag-wire lamang ng B1 events dito. Ang Checkr ay walang Zapier app, ngunit ang [Make.com's Checkr integration](https://www.make.com/en/integrations/checkr) ay na-verify at nag-expose ng mga actions na kailangan mo upang simulan ang isang check mula sa isang B1 event.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Checkr](https://checkr.com) account na may API access at hindi bababa sa isang screening package na na-configure
- Isang [Make](https://www.make.com) account
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

Ang Checkr app ng Make ay nag-expose ng 1 trigger at 6 actions:

| Direksyon | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtered sa isang volunteer group) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: I-update ang record ng tao (hal. tag "Checkr cleared") |

Ang mga actions ng Checkr: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Plus 4 search modules.

## Setup

### 1. Mag-mint ng isang B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — para sa trigger webhook
- `people:read` — upang hanapin ang pangalan/email ng tao kapag nagsisimula ng isang check
- (Opsyonal) `people:write` kung gusto mong isulat ang status ng report pabalik bilang custom field o tag

### 2. Bumuo ng "kick off a check on volunteer signup" scenario sa Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — magpatuloy lamang kung ang `data.groupId` ay tumutugma sa iyong "Children's Volunteers" (o equivalent) group.
3. **Action** — B1.church: Find Person (sa pamamagit ng `data.personId`) upang makuha ang email + first/last name.
4. **Action** — Checkr: Create Candidate. I-map ang first/last/email mula sa hakbang 3.
5. **Action** — Checkr: Create Background Check Invitation. I-map ang bagong candidate id mula sa hakbang 4 sa *candidate_id* field. Piliin ang screening package (hal. `tasker_standard` o anumang nag-expose ang iyong account).
6. (Opsyonal) **Action** — Slack: notipikahan ang iyong safe-ministry coordinator na ang isang check ay nasimulan.

I-on ang scenario. Ang mga bagong volunteers sa target group ay makakakuha ng isang awtomatikong Checkr invitation sa pamamagit ng email; kumpleto nila ito sa kanilang phone o laptop; tumatakbo ang Checkr ng screen.

### 3. (Opsyonal) Tanggapin ang report pabalik

1. **Trigger** — Checkr: Watch Events (webhook). Ang Make ay nag-register ng Checkr webhook sa activation.
2. **Filter** — magpatuloy lamang kung ang `event_type = report.completed`.
3. **Action** — Checkr: Get Report (gamitin ang report id mula sa webhook).
4. **Action** — B1.church: Find Person (sa pamamagit ng candidate email).
5. **Action** — Conditional Slack / Email: notipikahan ang coordinator na may `clear` / `consider` / `suspended` status.

Tala: Ang B1 ay walang built-in na "background-check status" field ngayon. Ang pragmatic options ay (a) mag-post ng result sa isang private Slack channel para sa review, (b) isulat ito sa isang Google Sheet para sa audit, o (c) magdagdag ng tao sa isang "Cleared volunteers" B1 group sa `clear`.

## Mga Karaniwang Recipes

### Re-screen volunteers bawat 2 taon

I-pair ang itaas na may isang Make schedule trigger:

- **Trigger** — Make: Schedule (monthly)
- **Action** — B1.church: List Group Members para sa "Cleared volunteers"
- **Action** — Filter by Make: cleared date mas lumang kaysa 22 months
- **Action** — Checkr: Create Background Check Invitation (pareho sa initial flow)

### I-block ang stage 1 access hanggang sa makumpleto ang check

Kung ang iyong simbahan ay gumagamit ng B1 group membership upang i-gate ang access (hal. mga "Cleared" group members lamang ang lumilitaw sa serving schedules), panatilihin ang mga bagong volunteers sa isang holding group hanggang sa ang Checkr `report.completed` event ay i-flip sila.

## Mga Limitasyon at Mga Tala

- **Ang Checkr ay US-only** para sa karamihan ng screening packages. Ang Australian, UK, at Canadian churches ay kailangang isang alternatibo.
- **Pricing** ay per check — bawat Create Invitation sa Make ay sumusunod ng real check. I-test sa Checkr's sandbox / staging account una (ang Checkr app ng Make ay nirerespeto ang credentials na ipinasa mo sa connection, kaya ang pag-swap ng creds ay nag-switch ng sandbox/live).
- **Ang Checkr API access ay plan-gated.** Ang mas maliit na Checkr accounts ay maaaring nasa isang UI-only tier; makipag-ugnayan sa Checkr upang i-enable ang API.

## Troubleshooting

- **Create Candidate fails na may `403`** — ang Checkr API token ay read-only o nawawalan ng tamang account permissions. Muling isyu ito mula sa Checkr dashboard na may write scope.
- **Invitation ay hindi kailanman dumating** — suriin ang email ng candidate sa hakbang 3; ang B1 ay maaaring may isang walang laman na email field para sa taong iyon. Magdagdag ng email-required filter bago ang Checkr step.
- **Webhook trigger ay hindi nag-fire** — ang Checkr's webhook registration ay silent na nabigo minsan kung ang iyong Make account ay hindi sa isang paid tier na sumusuporta sa outbound webhooks. I-verify sa Checkr's dashboard *Webhooks* page na ang URL ng Make ay nakalista.

## Makita Din

- [Make (overview)](../make) — B1 side ng bawat Make scenario
- [Mobile Message](./mobile-message) — para sa SMS-providers-without-Zapier-apps, parehong Webhooks/HTTP pattern tulad ng Checkr Make wiring
- [Checkr API docs](https://docs.checkr.com/)
