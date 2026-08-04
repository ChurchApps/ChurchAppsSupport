---
title: "Checkr"
---

# Checkr

<div class="article-intro">

Nagsasagawa ang [Checkr](https://checkr.com) ng background screening para sa staff at volunteer — isang halos-unibersal na pangangailangan para sa anumang simbahang nagpapatakbo ng programa para sa mga bata o kabataan. Ang B1 ay **walang built-in na background-check feature** — ang pag-order ng mga check, pagsubaybay ng mga resulta, at pag-comply sa screening ay pawang nasa Checkr; ang recipe sa ibaba ay ikinokonekta lamang ang mga event ng B1 dito. Walang Zapier app ang Checkr, ngunit ang [Make.com integration ng Checkr](https://www.make.com/en/integrations/checkr) ay verified at inilalantad ang mga actions na kailangan mo para simulan ang isang check mula sa isang event ng B1.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Checkr](https://checkr.com) account na may API access at kahit isang na-configure na screening package
- Isang [Make](https://www.make.com) account
- Isang user ng B1Admin na may permisong **Edit Settings**

</div>

## Ano ang Puwede Mong Ikonekta

Inilalantad ng Checkr app ng Make ang 1 trigger at 6 na action:

| Direksyon | B1 / Make trigger | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (naka-filter sa isang volunteer group) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr webhook (invitation / report event) | B1: I-update ang record ng tao (hal. tag na "Checkr cleared") |

Mga action ng Checkr sa Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Kasama pa ang 4 na search module.

## Setup

### 1. Gumawa ng B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — para sa trigger webhook
- `people:read` — para hanapin ang pangalan/email ng tao kapag nagsisimula ng check
- (Opsyonal) `people:write` kung gusto mong i-record ang status ng report bilang custom field o tag

### 2. Buuin ang scenario na "simulan ang check kapag nag-sign up ang volunteer" sa Make

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — magpatuloy lamang kung ang `data.groupId` ay tumutugma sa iyong "Children's Volunteers" (o katumbas nito) na grupo.
3. **Action** — B1.church: Find Person (ayon sa `data.personId`) para makuha ang email + unang/huling pangalan.
4. **Action** — Checkr: Create Candidate. I-map ang unang/huling pangalan/email mula sa hakbang 3.
5. **Action** — Checkr: Create Background Check Invitation. I-map ang bagong candidate id mula sa hakbang 4 sa field na *candidate_id*. Piliin ang screening package (hal. `tasker_standard` o kung ano ang inilalantad ng iyong account).
6. (Opsyonal) **Action** — Slack: ipaalam sa iyong safe-ministry coordinator na may sinimulan nang check.

I-on ang scenario. Ang mga bagong volunteer sa target na grupo ay awtomatikong makakatanggap ng Checkr invitation sa pamamagitan ng email; kanilang kokompletuhin ito sa kanilang telepono o laptop; isasagawa ng Checkr ang screening.

### 3. (Opsyonal) Matanggap pabalik ang report

1. **Trigger** — Checkr: Watch Events (webhook). Nagrerehistro ang Make ng Checkr webhook sa oras ng activation.
2. **Filter** — magpatuloy lamang kung ang `event_type = report.completed`.
3. **Action** — Checkr: Get Report (gamitin ang report id mula sa webhook).
4. **Action** — B1.church: Find Person (ayon sa email ng candidate).
5. **Action** — Conditional Slack / Email: ipaalam sa coordinator ang status na `clear` / `consider` / `suspended`.

Paalala: Wala pang built-in na field ang B1 para sa "background-check status" sa ngayon. Ang mga praktikal na opsyon ay (a) i-post ang resulta sa isang pribadong Slack channel para sa pagsusuri, (b) isulat ito sa isang Google Sheet para sa audit, o (c) idagdag ang tao sa isang grupong "Cleared volunteers" sa B1 kapag `clear`.

## Mga Karaniwang Recipe

### Muling i-screen ang mga volunteer tuwing 2 taon

Isamahan ang nasa itaas sa isang schedule trigger ng Make:

- **Trigger** — Make: Schedule (buwanan)
- **Action** — B1.church: List Group Members para sa "Cleared volunteers"
- **Action** — I-filter sa pamamagitan ng Make: petsa ng pagiging cleared na mas matanda sa 22 buwan
- **Action** — Checkr: Create Background Check Invitation (kapareho ng paunang flow)

### I-block ang stage 1 access hanggang makumpleto ang check

Kung ginagamit ng iyong simbahan ang membership sa grupo ng B1 para i-gate ang access (hal. mga miyembro lamang ng grupong "Cleared" ang lumalabas sa mga serving schedule), panatilihin ang mga bagong volunteer sa isang holding group hanggang baguhin sila ng event na `report.completed` ng Checkr.

## Mga Limitasyon at Paalala

- **Ang Checkr ay para lamang sa US** para sa karamihan ng mga screening package. Kailangan ng alternatibo ang mga simbahan sa Australia, UK, at Canada.
- **Ang presyo** ay per check — bawat Create Invitation sa Make ay gumagamit ng aktwal na check. Subukan muna sa sandbox / staging account ng Checkr (iginagalang ng Checkr app ng Make ang mga credential na ipinapasa mo sa koneksyon, kaya ang pagpapalit ng credentials ay lumilipat sa pagitan ng sandbox/live).
- **Ang Checkr API access ay plan-gated.** Ang mas maliliit na Checkr account ay maaaring nasa UI-only tier lamang; makipag-ugnayan sa Checkr para i-enable ang API.

## Pag-troubleshoot

- **Nabigo ang Create Candidate na may `403`** — read-only ang Checkr API token o kulang ito ng tamang permisyon sa account. Muling i-issue ito mula sa Checkr dashboard na may write scope.
- **Hindi dumadating ang invitation** — suriin ang email ng candidate sa hakbang 3; posibleng walang laman ang email field ng B1 para sa taong iyon. Magdagdag ng filter na kailangan ang email bago ang hakbang ng Checkr.
- **Hindi umaandar ang webhook trigger** — minsan tahimik na nabibigo ang webhook registration ng Checkr kung ang iyong Make account ay wala sa paid tier na sumusuporta sa outbound webhooks. I-verify sa page na *Webhooks* ng Checkr dashboard na nakalista ang URL ng Make.

## Tingnan Din

- [Make (overview)](../make) — bahagi ng B1 sa bawat Make scenario
- [Mobile Message](./mobile-message) — para sa mga SMS provider na walang Zapier app, kaparehong Webhooks/HTTP pattern gaya ng Checkr Make wiring
- [Checkr API docs](https://docs.checkr.com/)
