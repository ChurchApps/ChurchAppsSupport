---
title: "Checkr"
description: "Ikonekta ang mga sign-up ng volunteer sa B1 Admin sa mga background check ng Checkr gamit ang Make.com, na may opsyonal na alerto sa status ng ulat para sa iyong safe-ministry coordinator."
---

# Checkr

<div class="article-intro">

Nagsasagawa ang [Checkr](https://checkr.com) ng background screening para sa staff at volunteer — isang halos unibersal na pangangailangan ng alinmang simbahang may programa para sa mga bata o kabataan. Walang **built-in na feature para sa background check** ang B1 — nasa Checkr ang pag-order ng mga check, pagsubaybay sa mga resulta, at pagsunod sa screening; ikinakabit lang ng recipe sa ibaba ang mga event ng B1 dito. Walang Zapier app ang Checkr, pero beripikado ang [Checkr integration ng Make.com](https://www.make.com/en/integrations/checkr) at nagbibigay ng mga aksyong kailangan mo para simulan ang isang check mula sa isang event ng B1.

</div>

:::caution
Ginagamit ng recipe na ito ang B1.church Make app, na hindi pa nailalabas (tingnan ang [Make](../make.md)). Hanggang sa maging available ito, ang panig ng B1 ng mga scenario na ito ay kailangang buuin gamit ang HTTP module ng Make na tumatawag sa [REST API](/docs/developer/api) ng B1.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Checkr](https://checkr.com) account na may API access at kahit isang screening package na na-configure
- Isang [Make](https://www.make.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

Naglalantad ang Checkr app ng Make ng 1 trigger at 6 na aksyon:

| Direksyon | Trigger ng B1 / Make | Aksyon |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (sinala para sa isang volunteer group) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook ng Checkr (event ng invitation / report) | B1: I-update ang record ng tao (hal. i-tag ng "Checkr cleared") |

Mga aksyon ng Checkr sa Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, Get an Invitation. Dagdag pa ang 4 na search module.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — para sa webhook ng trigger
- `people:read` — para hanapin ang pangalan/email ng tao kapag sinisimulan ang check
- (Opsyonal) `people:write` kung gusto mong isulat pabalik ang status ng ulat bilang custom field o tag

### 2. Buuin sa Make ang scenario na "simulan ang check kapag nag-sign up ang volunteer" {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Trigger** — B1.church: Watch Events (`group.member.added`).
2. **Filter** — magpatuloy lang kung tumutugma ang `data.groupId` sa iyong "Children's Volunteers" (o katumbas na grupo).
3. **Aksyon** — B1.church: Find Person (gamit ang `data.personId`) para makuha ang email + unang pangalan/apelyido.
4. **Aksyon** — Checkr: Create Candidate. Imapa ang unang pangalan/apelyido/email mula sa hakbang 3.
5. **Aksyon** — Checkr: Create Background Check Invitation. Imapa ang bagong candidate id mula sa hakbang 4 sa field na *candidate_id*. Piliin ang screening package (hal. `tasker_standard` o anuman ang ipinapakita ng iyong account).
6. (Opsyonal) **Aksyon** — Slack: ipaalam sa iyong safe-ministry coordinator na nasimulan na ang check.

I-on ang scenario. Ang mga bagong volunteer sa tinukoy na grupo ay awtomatikong makakatanggap ng Checkr invitation sa email; kukumpletuhin nila ito sa kanilang telepono o laptop, at ang Checkr ang magpapatakbo ng screening.

### 3. (Opsyonal) Tanggapin ang ulat pabalik {#3-optional-receive-the-report-back}

1. **Trigger** — Checkr: Watch Events (webhook). Nagrerehistro ang Make ng webhook sa Checkr kapag na-activate.
2. **Filter** — magpatuloy lang kung `event_type = report.completed`.
3. **Aksyon** — Checkr: Get Report (gamit ang report id mula sa webhook).
4. **Aksyon** — B1.church: Find Person (gamit ang email ng candidate).
5. **Kondisyonal na Slack / Email** — ipaalam sa coordinator gamit ang status na `clear` / `consider` / `suspended`.

Tandaan: wala pang built-in na field ng "background-check status" ang B1 sa ngayon. Ang praktikal na opsyon ay (a) i-post ang resulta sa isang pribadong Slack channel para suriin, (b) isulat ito sa Google Sheet para sa audit, o (c) idagdag ang tao sa isang B1 group na "Cleared volunteers" kapag `clear`.

## Karaniwang Recipe {#common-recipes}

### I-screen muli ang mga volunteer kada 2 taon {#re-screen-volunteers-every-2-years}

Ipares ang nasa itaas sa schedule trigger ng Make:

- **Trigger** — Make: Schedule (buwanan)
- **Aksyon** — HTTP — Make a request: GET sa `/membership/groupmembers?groupId=…` ng B1 para sa iyong grupong "Cleared volunteers" (walang list action ang B1.church app)
- **Aksyon** — Filter sa Make: petsa ng clearance na mas matanda sa 22 buwan
- **Aksyon** — Checkr: Create Background Check Invitation (kapareho ng unang daloy)

### I-block ang access ng yugto 1 hanggang makumpleto ang check {#block-stage-1-access-until-check-completes}

Kung gumagamit ang iyong simbahan ng membership sa grupo ng B1 para kontrolin ang access (hal. tanging mga miyembro ng grupong "Cleared" ang lumalabas sa mga serving schedule), panatilihin ang mga bagong volunteer sa isang holding group hanggang mapalitan sila ng Checkr event na `report.completed`.

## Mga Limitasyon at Paalala {#limits--notes}

- **US lang ang Checkr** para sa karamihan ng screening package. Kailangan ng alternatibo ng mga simbahan sa Australia, UK, at Canada.
- **Presyo kada check** — bawat Create Invitation sa Make ay nagsusunog ng tunay na check. Subukan muna sa sandbox / staging account ng Checkr (iginagalang ng Checkr app ng Make ang credentials na ipinapasa mo sa connection, kaya ang pagpapalit ng credentials ay nagpapalipat sa sandbox/live).
- **Naka-gate sa plan ang Checkr API access.** Maaaring nasa UI-only na tier ang mas maliliit na Checkr account; makipag-ugnayan sa Checkr para i-enable ang API.

## Troubleshooting {#troubleshooting}

- **Pumapalya ang Create Candidate na may `403`** — read-only ang Checkr API token o kulang sa tamang pahintulot ng account. Muling i-issue mula sa Checkr dashboard na may write scope.
- **Hindi dumarating ang invitation** — suriin ang email ng candidate sa hakbang 3; maaaring walang laman ang email field ng tao sa B1. Magdagdag ng filter na nangangailangan ng email bago ang hakbang ng Checkr.
- **Hindi nag-fire ang webhook trigger** — minsan tahimik na pumapalya ang pagrehistro ng webhook sa Checkr kung ang Make account mo ay wala sa bayad na tier na sumusuporta sa outbound webhook. Beripikahin sa pahinang *Webhooks* ng Checkr dashboard na nakalista ang URL ng Make.

## Tingnan Din {#see-also}

- [Make (pangkalahatang-tanaw)](../make.md) — panig ng B1 ng bawat scenario sa Make
- [Mobile Message](./mobile-message.md) — para sa mga SMS provider na walang Zapier app, parehong pattern ng Webhooks/HTTP gaya ng pagkabit ng Checkr sa Make
- [Checkr API docs](https://docs.checkr.com/)
