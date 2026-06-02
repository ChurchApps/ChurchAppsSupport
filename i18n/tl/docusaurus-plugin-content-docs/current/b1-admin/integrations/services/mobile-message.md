---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

Ang [Mobile Message](https://mobilemessage.com.au) ay isang Australian SMS API — popular sa AU churches dahil nag-aalok ito ng lokal na mga numero at competitive AU pricing kung saan ang Clearstream at Text In Church ay US-centric. Ang Mobile Message ay walang first-class Zapier app ngayon, ngunit nag-publish ito ng isang public REST API, kaya maaari mong i-wire ang B1 events sa Mobile Message texts sa pamamagitan ng **Webhooks by Zapier** (o ang HTTP module ng Make) sa ilang minuto.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Mobile Message](https://mobilemessage.com.au) account na may registered Sender ID at API credentials (API username + password sa ilalim ng *Account → API Settings*)
- Isang [Zapier](https://zapier.com) account (o [Make](https://www.make.com))
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Maaari Mong I-wire Up

Ang API ng Mobile Message ay "send SMS"-shaped — walang triggers, lamang outbound text. Kaya ang mga recipe ay lahat B1 → SMS:

| Direction | B1 trigger | Outcome |
|---|---|---|
| B1 → Mobile Message | `person.created` | Welcome text sa bagong tao |
| B1 → Mobile Message | `donation.created` | Thank-you text sa donor |
| B1 → Mobile Message | `form.submission.created` | I-page ang on-call team |
| B1 → Mobile Message | `event.created` | Reminder broadcast sa listahan |

## Setup

### 1. Mag-mint ng isang B1 API key

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — para sa trigger webhook upang mag-register
- `people:read` — upang hanapin ang phone number ng recipient mula sa `personId`

### 2. Bumuo ng Zap gamit ang Webhooks by Zapier

1. **Trigger** — B1.church: piliin ang event na gusto mo (hal. New Donation).
2. **Action** — B1.church: Find Person (gamit ang `data.personId`) upang makuha ang phone number at pangalan.
3. **Action** — Webhooks by Zapier: **POST**. I-configure tulad ng nasa ibaba.

Ang POST step's settings:

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
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier ay nagdadagdag nito nang awtomatiko)
- **Basic Auth** — itakda ang *Basic Auth* field sa `<api_username>|<api_password>` (Zapier ay nag-convert sa tamang `Authorization: Basic …` header)

I-on ang Zap. Magpadala ng test gift sa B1Admin upang i-verify ang text ay dumating.

## Mga Karaniwang Recipes

### Event reminders sa umaga

- **Trigger** — Schedule by Zapier (daily, 7am)
- **Action** — B1.church: Find Events para sa ngayon (o gamitin ang Find step na may fixed date filter, o mag-store ng today's event list sa isang Google Sheet)
- **Action** — Webhooks by Zapier: POST sa Mobile Message na may event list sa registered subscriber group

### Gamitin ang batch endpoint para sa broadcast sa listahan

Ang `/v1/messages` endpoint ng Mobile Message ay tumatanggap ng hanggang 10,000 messages bawat tawag. Upang mag-broadcast sa B1 group:

- **Trigger** — B1.church: New Form Submission (filter sa specific form)
- **Action** — B1.church: List Group Members para sa target group (sa pamamagitan ng *Webhooks by Zapier — GET* step sa `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize ang response sa isang `messages` array
- **Action** — Webhooks by Zapier: POST ang buong array sa `/v1/messages`

### Make alternative

Kung mas gusto mo ang Make, ilagay ang **HTTP — Make a request** module pagkatapos ng B1 Watch Events trigger, i-configure ito sa parehong paraan (POST, Basic Auth, JSON body). Tingnan ang [Make overview](../make) para sa B1 side.

## Mga Limitasyon at Mga Tala

- **Ang Basic Auth ay ang tanging authentication method** — Ang Mobile Message ay nag-issue ng username at password mula sa dashboard. I-treat ang pareho bilang secrets.
- **`sender` ay dapat na isang registered Sender ID** sa iyong Mobile Message account, o ang send ay magbabalik ng `400 Invalid sender`. Ang AU regulations ay nangangailangan ng sender registration.
- **Ang AU phone numbers** ay maaaring `0412345678` (lokal) o `+61412345678` (international). Ang API ay tumatanggap ng pareho, ngunit normalize sa `+61…` kung ikaw ay nagpapadala din sa ibang bansa.
- **Hanggang 10,000 messages bawat request** — kapaki-pakinabang para sa mga broadcast, ngunit ang isang solong B1 webhook delivery ay malabong maglalabas ng listahan na ganyan kalaki; i-reserve ang batch endpoint para sa scheduled bulk Zaps.

## Troubleshooting

- **POST ay nagbabalik ng `401 Unauthorized`** — Ang Basic Auth credentials ay mali. Muling kopyahin mula sa Mobile Message dashboard *Account → API Settings*. Tandaan ang username ay ang iyong account email bilang default, hindi isang hiwalay na API key.
- **POST ay nagbabalik ng `400 Invalid sender`** — ang `sender` value ay hindi isang registered Sender ID sa iyong account. I-register ito sa Mobile Message dashboard una.
- **Text ay dumarating ngunit ay na-truncate** — Ang Mobile Message ay naghahati ng mga mensahe sa ~160 characters sa maraming bahagi; ikaw ay nag-bill per part. Suriin ang response body — ito ay nagsasabi sa iyo ng part count.

## Makita Din

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternatibong SMS providers na may native Zapier apps (walang Webhooks-by-Zapier step na kailangan)
- [Zapier (overview)](../zapier) — B1 side ng bawat Zapier recipe
- [Mobile Message API docs](https://mobilemessage.com.au/api-documentation)
