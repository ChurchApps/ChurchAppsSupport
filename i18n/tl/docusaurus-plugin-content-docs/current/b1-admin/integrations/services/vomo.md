---
title: "VOMO"
description: "Ikonekta ang mga sign-up ng volunteer at kiosk check-in ng VOMO sa mga tao at grupo ng B1 Admin gamit ang Zapier, kasama ang mga API key scope at mga hakbang sa setup."
---

# VOMO

<div class="article-intro">

Ang VOMO ay isang platform sa pakikilahok ng volunteer — nagsa-sign up ang mga tao para sa mga proyekto, nagche-check in sa kiosk, at nagiipon ng oras. Kung gumagamit ka ng VOMO para sa iskedyul ng volunteer pero ang B1 ang para sa mga record ng tao, maaaring i-sync ng Zapier ang membership at check-in sa pagitan nila para hindi maglayo ang alinmang panig.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [VOMO](https://vomo.org) account sa plan na nagbubukas ng Zapier (magtanong sa suporta ng VOMO kung hindi ka sigurado)
- Isang [Zapier](https://zapier.com) account
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

Naglalantad ang Zapier app ng VOMO ng apat na instant trigger at apat na aksyon. Ang mga recipe na gustong-gusto ng karamihan sa mga simbahan:

| Direksyon | Trigger | Aksyon |
|---|---|---|
| VOMO → B1 | VOMO Membership (nalikha) | B1: Find Person → Create Person (kung bago) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member sa grupong "Currently Serving", o itala bilang attendance |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (ayon sa email); kung wala, custom na hakbang |
| Alinman | VOMO Participation (mga sign-up) | B1: Add Group Member sa grupong partikular sa proyekto |

Limitado ang mga aksyon ng VOMO sa **pag-draft ng mga proyekto** at **paghahanap** ng mga umiiral na organizer/proyekto — walang aksyong "idagdag ang taong ito sa isang proyekto ng VOMO" sa ngayon. Ang mas kawili-wiling pagkakabit ay karamihan mula VOMO → B1.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**. Mga scope:

- `settings:write` — sinusuri ng Zapier ang bawat B1 key laban sa listahan ng webhook ng B1 kapag ikinonekta mo ito, kaya papalya ang koneksyon kung wala ito
- `people:read`, `people:write` — para hanapin at gawin ang mga volunteer bilang mga tao sa B1
- `groups:write` — para idagdag sila sa mga grupo ng serving team
- (Opsyonal) `attendance:write` kung ituturing mong attendance ang mga check-in sa kiosk

### 2. Buuin ang Zap ng pag-sync ng membership {#2-build-the-membership-sync-zap}

1. **Trigger** — VOMO: Membership (event = `created`).
2. **Aksyon** — B1.church: Find Person, itugma ayon sa email.
3. **Aksyon** — B1.church: Add Group Member, idagdag ang tao mula sa hakbang 2 sa angkop na grupo ng volunteer.

   Hihinto ang *Find Person* ng B1 sa Zap na may error na "No person found" kapag walang tumutugma. Para sa mga volunteer na wala pa sa B1, i-on ang error handling ng Zapier para sa Find Person step at patakbuhin ang B1.church: Create Person, pagkatapos ay Add Group Member, sa error path nito.
4. I-on. Ang mga bagong volunteer ng VOMO ay lalabas na ngayon sa B1 na may tamang membership sa grupo.

### 3. (Opsyonal) Buuin ang Zap ng check-in sa kiosk {#3-optional-build-the-kiosk-check-in-zap}

1. **Trigger** — VOMO: Kiosk
2. **Aksyon** — B1.church: Find Person (ayon sa email)
3. **Aksyon** — ang pipiliin mo:
   - *Kung ituturing na attendance* — Webhooks by Zapier POST sa endpoint na `/attendance/visits` ng B1 (wala pang first-class na *Record Attendance* action ang Zapier app ng B1). Ang B1 [API key](/docs/developer/api/api-keys) ay nasa header na `Authorization: Bearer cak_…`.
   - *Kung ituturing na membership sa grupo* — B1.church: Add Group Member sa grupong "Currently Serving (Today)", at ang ikalawang Zap na mamaya sa araw ay magtatanggal sa kanila sa pamamagitan ng nakaiskedyul na cleanup.

## Karaniwang Recipe {#common-recipes}

### Pag-sync ng grupo bawat proyekto {#per-project-group-sync}

- **Trigger** — VOMO: Participation (nalikha)
- **Aksyon** — Filter by Zapier sa project id, pagkatapos ay
- **Aksyon** — B1.church: Add Group Member sa grupo ng B1 na ang pangalan ay tumutugma sa proyekto ng VOMO.

Kapag natapos ang proyekto ng VOMO, manwal na linisin ang grupo sa B1 (o ipares ito sa trigger na *Participation deleted* na nag-aalis sa kanila).

### Magpadala ng text na "salamat sa pag-sign up" sa pamamagitan ng SMS {#send-a-thanks-for-signing-up-text-via-sms}

I-chain ang VOMO Participation → Clearstream Send Text o Text In Church Send Message sa iisang Zap. Parehong may first-class na aksyon sa Zapier — tingnan ang [Clearstream](./clearstream.md) at [Text In Church](./text-in-church.md).

### Tuklasin ang pag-alis {#detect-drop-off}

Magpatakbo ng araw-araw na *Schedule* trigger ng Zapier na tumatawag sa Find Organizer sa VOMO para sa listahan ng mga tao sa B1 na sumali sa serving team ngayong buwan — kung ibinalik ng VOMO ang "not found", hindi sila nag-activate ng VOMO at kailangang paalalahanan.

## Mga Limitasyon at Paalala {#limits--notes}

- **Email ang susi ng pagdurugtong.** Ang mga payload ng VOMO ay naglalantad ng email ng user pero walang person id ng B1. Ang mga donor na gumagamit ng magkaibang email sa bawat sistema ay gagawa ng duplicate.
- **Walang aksyong "Add to Project" sa Zapier app ng VOMO sa ngayon.** Kung kailangan mo ng pagpapatala ng B1 → proyekto ng VOMO, mag-POST ka sa REST API ng VOMO mula sa isang hakbang na *Webhooks by Zapier*, na custom integration.
- **Maaaring walang Zapier ang libre o mas mababang tier ng VOMO.** Kumpirmahin sa suporta ng VOMO bago mangako ng petsa ng pagkakabit.

## Troubleshooting {#troubleshooting}

- **Hindi nag-fire ang trigger** — kailangang manatiling valid ang API token ng trigger ng VOMO. Subukan muli ang Zap; ikonekta muli ang VOMO kung napalitan ang token.
- **Pumapalya ang *Add Group Member* ng B1** — wala na ang grupo sa aksyon. Piliin muli ang grupo mula sa dropdown na **Group** ng step, o buksan ang grupo sa B1Admin (**People > Groups**) at kopyahin ang id mula sa dulo ng web address nito.
- **Mga duplicate na tao sa B1 mula sa iisang volunteer ng VOMO** — malamang na nag-sign up sila gamit ang ibang email kaysa sa mayroon na sila sa B1. Alinman sa i-standardize ang mga email, o magdagdag ng Zapier *Path* na naghahanap din ayon sa telepono bago gumawa.

## Tingnan Din {#see-also}

- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — ipares ang mga sign-up ng volunteer sa mga kumpirmasyon ng SMS
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang mga event na maaaring i-trigger ng VOMO
