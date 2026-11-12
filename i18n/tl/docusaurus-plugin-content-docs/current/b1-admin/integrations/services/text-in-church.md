---
title: "Text In Church"
description: "Ikabit ang B1 Admin at Text In Church gamit ang Zapier: gumawa ng API key, bumuo ng Zap mula connect card papuntang B1, at i-mirror ang membership sa grupo."
---

# Text In Church

<div class="article-intro">

Pinagsasama ng [Text In Church](https://textinchurch.com) ang SMS, mga drip workflow, at mga automation ng connect card. Sakop ng Zapier app nito ang parehong direksyon — ipasok ang mga event ng B1 sa isang workflow ng Text In Church, at hilahin ang mga trigger ng connect card o bagong contact mula sa kabilang dulo papuntang B1.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Text In Church](https://textinchurch.com) account sa plan na may kasamang Zapier integration
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

| Direksyon | Trigger | Aksyon |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Send Text Message sa kaugnay na team |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (i-mirror ang membership sa grupo) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Kasama rin sa mga aksyon ng Text In Church ang *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, at pagdaragdag/pag-alis ng membership sa grupo.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — kailangan para ikonekta ang key sa Zapier, at para sa mga Zap na tina-trigger ng B1
- `people:read`, `people:write` — para hanapin o gawin ang tao
- `groups:write` — para sa pag-sync ng grupo
- (Opsyonal) `donations:write` kung ikakabit mo sa TIC ang mga kumpirmasyon ng regalo

### 2. Ikonekta ang Text In Church sa Zapier {#2-connect-text-in-church-to-zapier}

Sundin ang [gabay sa Zapier integration ng Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Gumagawa sila ng API token mula sa loob ng dashboard ng TIC.

### 3. Buuin ang Zap mula connect card papuntang B1 {#3-build-the-connect-card-to-b1-zap}

Ito ang pinakakaraniwang direksyon. Ang mga connect card na ipinadala mula sa TIC ay awtomatikong nagiging mga bagong tao sa B1.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Aksyon** — B1.church: Find Person (ayon sa email).
3. **Aksyon** — B1.church: Add Group Member sa grupong "New Contact", gamit ang id ng tao mula sa hakbang 2.

Hihinto ang *Find Person* ng B1 sa Zap na may error na "No person found" kapag walang tumutugma, kaya hindi makakapag-branch ang Path dito. Para sa mga bagong contact, i-on ang error handling ng Zapier para sa Find Person step at patakbuhin ang B1.church: Create Person, pagkatapos ay Add Group Member, sa error path nito.

I-on ang Zap. Ang susunod na connect card na ipapadala sa pamamagitan ng TIC ay awtomatikong lalabas sa **B1Admin → People**.

## Karaniwang Recipe {#common-recipes}

### Mag-trigger ng workflow na gaya ng connect card mula sa isang form ng B1 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Trigger** — B1.church: New Form Submission (i-filter sa id ng form na "I'm new here")
- **Aksyon** — Text In Church: Create/Update Person, imapa ang mga sagot ng form sa email / telepono / pangalan
- **Aksyon** — Text In Church: Add to Group, kung saan may nakakabit na nakahandang welcome workflow ang grupo

### I-mirror ang membership sa grupo {#mirror-group-membership}

- **Trigger** — B1.church: New Group Member, i-filter sa partikular na `groupId`
- **Aksyon** — Text In Church: Add to Group (parehong tao, mirror na grupo). Ipares sa Zap na `group.member.removed` kung gusto mo ng buong sync.

### Mag-page ng leader kapag may sumali {#page-a-leader-when-someone-joins}

- **Trigger** — B1.church: New Group Member
- **Aksyon** — Text In Church: Send Text Message, recipient = telepono ng leader ng grupo, body = `"{first} {last} just joined {group}"`.

## Mga Limitasyon at Paalala {#limits--notes}

- **Naka-gate sa tier ng plan ang Zapier app ng TIC.** Kung naka-gray out ang Zapier integration sa dashboard ng TIC, makipag-ugnayan sa suporta ng TIC para i-enable ito sa iyong plan.
- **Sa TIC ang mga group id, hindi sa B1.** Kapag nagmi-mirror, may panatilihin kang mapping table kahit saan (isang Zapier *Lookup Table*, o naka-hard-code kada Zap).
- **May kapalit na credit ang Send Text Message.** Bawat Zap na nagpapaputok ng *Send Text* ay kumokonsumo mula sa iyong SMS allotment sa TIC.

## Troubleshooting {#troubleshooting}

- **Hindi nag-fire ang trigger ng connect card** — kailangan ng TIC na naka-on ang toggle ng Zapier integration. Tiyakin din na ang form na sinubukan mo ay naka-configure bilang "Connect Card", hindi generic na survey.
- **Pumapalya ang Create Person sa B1 na may 401** — mali, nabawi, o kulang sa `people:write` ang API key. Gumawa muli.
- **Mga duplicate na tao sa B1** — nagpapadala ang TIC ng *Person Created* at *Connect Card Submitted* para sa iisang event. Pumili ng isa bilang pinagmumulan ng katotohanan at magdagdag ng Zapier Filter sa isa pa.

## Tingnan Din {#see-also}

- [Clearstream](./clearstream.md) — alternatibong SMS platform na may katulad na hugis ng Zapier
- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Gabay sa Zapier ng Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (mga docs ng TIC)
