---
title: "Mobile Message"
description: "Ikonekta ang mga event ng B1 Admin sa Mobile Message, isang Australian SMS API, gamit ang mga webhook ng Zapier o Make para magpadala ng mga welcome, donation, at reminder na text."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) ay isang Australian SMS API — popular sa mga simbahan sa AU dahil nag-aalok ito ng lokal na numero at mapagkumpitensyang presyo sa AU kung saan nakasentro sa US ang Clearstream at Text In Church. Walang first-class na Zapier app ang Mobile Message sa ngayon, pero naglalathala ito ng pampublikong REST API, kaya maikakabit mo ang mga event ng B1 sa mga text ng Mobile Message sa pamamagitan ng **Webhooks by Zapier** (o HTTP module ng Make) sa loob ng ilang minuto.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Mobile Message](https://mobilemessage.com.au) account na may nakarehistrong Sender ID at API credential (API username + password sa ilalim ng *Account → API Settings*)
- Isang [Zapier](https://zapier.com) account (o [Make](https://www.make.com))
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Puwede Mong Ikabit {#what-you-can-wire-up}

Ang API ng Mobile Message ay hugis "magpadala ng SMS" — walang trigger, outbound na text lang. Kaya ang lahat ng recipe ay B1 → SMS:

| Direksyon | Trigger ng B1 | Resulta |
|---|---|---|
| B1 → Mobile Message | `person.created` | Welcome text sa bagong tao |
| B1 → Mobile Message | `donation.created` | Thank-you text sa donor |
| B1 → Mobile Message | `form.submission.created` | Mag-page sa on-call team |
| B1 → Mobile Message | `event.created` | Reminder broadcast sa isang listahan |

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — para marehistro ang webhook ng trigger
- `people:read` — para mahanap ang telepono ng tatanggap mula sa `personId`

### 2. Buuin ang Zap gamit ang Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Trigger** — B1.church: piliin ang event na gusto mo (hal. New Donation).
2. **Aksyon** — B1.church: Find Person (gamit ang `data.personId`) para makuha ang telepono at pangalan.
3. **Aksyon** — Webhooks by Zapier: **POST**. I-configure gaya ng nasa ibaba.

Ang mga setting ng POST step:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (awtomatikong idinadagdag ito ng Webhooks by Zapier)
- **Basic Auth** — itakda ang field na *Basic Auth* sa `<api_username>|<api_password>` (kino-convert ito ng Zapier sa tamang header na `Authorization: Basic …`)

I-on ang Zap. Magpadala ng test na regalo sa B1Admin para kumpirmahing dumating ang text.

## Karaniwang Recipe {#common-recipes}

### Mga reminder sa event tuwing umaga {#event-reminders-the-morning-of}

- **Trigger** — Schedule by Zapier (araw-araw, 7am)
- **Aksyon** — itago ang listahan ng event ngayong araw sa isang Google Sheet (o ibang app na mababasa ng Zapier) at hanapin ang mga row ngayong araw — walang action ang Zapier app ng B1 para sa paghahanap ng mga event
- **Aksyon** — Webhooks by Zapier: POST sa Mobile Message kasama ang listahan ng event sa isang nakarehistrong subscriber group

### Gamitin ang batch endpoint para sa broadcast sa listahan {#use-the-batch-endpoint-for-a-list-broadcast}

Tumatanggap ang endpoint na `/v1/messages` ng Mobile Message ng hanggang 10,000 mensahe bawat tawag. Para mag-broadcast sa isang grupo ng B1:

- **Trigger** — B1.church: New Form Submission (i-filter sa isang partikular na form)
- **Aksyon** — Webhooks by Zapier: GET sa `/membership/groupmembers?groupId=…` para ilista ang mga miyembro ng target na grupo (walang list action ang Zapier app ng B1 para dito; ipadala ang API key bilang header na `Authorization: Bearer cak_…`)
- **Aksyon** — Formatter by Zapier → Utilities → Line-itemize ang response sa isang array ng `messages`
- **Aksyon** — Webhooks by Zapier: POST ang buong array sa `/v1/messages`

### Alternatibo sa Make {#make-alternative}

Kung mas gusto mo ang Make, ilagay ang **HTTP — Make a request** module pagkatapos ng B1 Watch Events trigger, i-configure ito nang pareho (POST, Basic Auth, JSON body). Tingnan ang [Make overview](../make.md) para sa panig ng B1 — tandaan na hindi pa nailalabas ang B1.church Make app.

## Mga Limitasyon at Paalala {#limits--notes}

- **Basic Auth ang tanging paraan ng authentication** — naglalabas ang Mobile Message ng username at password mula sa dashboard. Ituring na sikreto ang pareho.
- **Dapat na nakarehistrong Sender ID sa iyong Mobile Message account ang `sender`**, kung hindi ay magbabalik ang send ng `400 Invalid sender`. Nangangailangan ng pagpaparehistro ng sender ang mga regulasyon ng AU.
- **Maaaring `0412345678` (lokal) o `+61412345678` (internasyonal) ang mga numero sa AU.** Tinatanggap ng API ang pareho, pero i-normalize sa `+61…` kung nagpapadala ka rin sa ibang bansa.
- **Hanggang 10,000 mensahe bawat request** — kapaki-pakinabang para sa mga broadcast, pero bihirang maglabas ng ganoon kalaking listahan ang isang delivery ng webhook ng B1; itira ang batch endpoint para sa mga naka-iskedyul na bulk Zap.

## Troubleshooting {#troubleshooting}

- **Nagbabalik ang POST ng `401 Unauthorized`** — mali ang Basic Auth credentials. Kopyahin muli mula sa dashboard ng Mobile Message na *Account → API Settings*. Tandaan na ang username ay ang email ng account mo bilang default, hindi isang hiwalay na API key.
- **Nagbabalik ang POST ng `400 Invalid sender`** — ang halaga ng `sender` ay hindi nakarehistrong Sender ID sa account mo. Irehistro muna ito sa dashboard ng Mobile Message.
- **Dumarating ang text pero putol** — hinahati ng Mobile Message ang mga mensaheng lampas ~160 character sa maraming bahagi; sinisingil ka kada bahagi. Tingnan ang response body — sinasabi nito ang bilang ng bahagi.

## Tingnan Din {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — mga alternatibong SMS provider na may native na Zapier app (hindi kailangan ng Webhooks-by-Zapier step)
- [Zapier (pangkalahatang-tanaw)](../zapier.md) — panig ng B1 ng bawat recipe sa Zapier
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)
