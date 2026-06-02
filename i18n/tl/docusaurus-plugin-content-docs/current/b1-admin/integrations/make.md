---
title: "Make"
---

# Make

<div class="article-intro">

Ang [Make](https://www.make.com) (dating Integromat) ay isang visual workflow automation platform — katulad sa spirit ng Zapier, na may mas flexible logic at mas murang bill sa scale. Ang opisyal na B1.church Make app ay nagbibigay-daan sa iyo na bumuo ng "scenarios" na tumutugon kaagad sa B1 events at magsulat ng mga records pabalik sa B1.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Make](https://www.make.com) account (ang free tier ay sumasaklaw sa mga small workflows)
- Isang church admin na may **Edit Settings** permission sa B1Admin
- Isang magandang ideya ng scenario na gusto mong bumuo

</div>

## Mga Module

| Type | Ano | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | anumang subscribed B1 event (`person.created`, `donation.created`, …) |
| **Action** | Create Person | nagdadagdag ng bagong tao |
| **Action** | Add Donation | nag-record ng isang donation |
| **Action** | Add Group Member | nagdadagdag ng isang tao sa isang group |
| **Search** | Search People | naghahanap ng mga tao ayon sa pangalan o email |

Ang instant trigger ay nagbibigay-daan sa iyo na pumili kung aling kaganapan ang pakinig — isang trigger module bawat scenario, na na-configure per event.

## Setup

### 1. Lumikha ng isang B1 API key

1. Sa B1Admin pumunta sa **Settings → Developer → API Keys**.
2. Mag-click ng **New API Key**, pangalanan ito "Make", at bigyan ng mga scopes na kailangan mo.
3. **Kasama ang `settings:write`** kung ang kahit na isa sa iyong mga scenarios ay gumagamit ng instant trigger — si Make ay nag-register ng isang webhook sa iyong ngalan kapag ang scenario ay naka-on.
4. Bigyan din ng mga scopes na kailangan ng action modules (hal. `donations:write` para sa Add Donation module).
5. I-save at kopyahin ang `cak_…` key.

### 2. I-install ang connection

1. Sa Make, bumuo ng isang bagong scenario at ilagay ang **B1.church** trigger module sa canvas.
2. Kapag hiniling, **Create a connection**. I-paste ang API key sa *API Key* field at iwanan ang *API Base URL* bilang `https://api.churchapps.org` (maliban kung ikaw ay nag-test laban sa staging).
3. Mag-click ng **Save** — sinusubok ng Make ang key sa pamamagitan ng pagbasa ng iyong church profile.

Ang connection ay nakatipid sa iyong Make account at muling ginagamit sa mga scenario.

### 3. I-configure ang trigger

1. Buksan ang **Watch Events** module's settings.
2. Piliin ang kaganapan na gusto mo — hal. `donation.created`.
3. I-save. Ang Make ay lumilikha ng isang natatanging webhook URL at ito ay naka-store internally.

### 4. Magdagdag ng downstream modules

I-drop ang kahit na alin sa daan-daang app modules ng Make sa canvas — Mailchimp, Google Sheets, Slack, HubSpot, iyong sariling HTTP endpoint, atbp. I-map ang output ng trigger (`event`, `churchId`, `data.id`, `data.amount`, …) sa kanilang mga input fields. Ang mga flatten / iterator / router / aggregator modules ng Make ay nagbibigay-daan sa iyo na bumuo ng branching at parallel flows na mahirap sa Zapier.

### 5. I-on ang scenario

I-toggle ang **Active** sa scenario header. Tinatawag ng Make ang B1's `POST /membership/webhooks` upang i-register ang URL. Mula sa sandaling iyon, bawat tugmang B1 event ay dumadaloy sa scenario sa real time.

Ang pag-off ng scenario ay tumatawag sa `DELETE /membership/webhooks/{id}` upang walang orphan subscriptions.

## Mga Karaniwang Recipes

### Sync donations sa isang Google Sheet para sa finance review

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row. I-map ang `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` sa mga columns ng sheet.

### Conditional Slack notification ayon sa donation amount

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Branch A — Filter: `data.amount >= 1000` → Slack: mag-post sa `#major-gifts`
  - Branch B — fallthrough → Slack: mag-post sa `#donations`

### New person → CRM + welcome email + Slack

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: Notify `#new-people` (sa parallel — gamitin ang router ng Make)

## Paano Gumagana ang Instant Trigger

Ang instant trigger ay webhook-backed, hindi polling — kapag activated, tinatawag ng Make ang `POST /membership/webhooks` na may iyong generated URL at ang kaganapan na pinili mo. Kapag ang kaganapan ay bumuo sa B1, ang B1 ay nag-POST ng envelope sa webhook URL ng Make at ang iyong scenario ay tumatakbo sa loob ng ilang segundo. Ang pag-deactivate ng scenario ay nag-aalis ng webhook.

Ang trigger ay nag-fire lamang para sa mga kaganapan na nangyayari **habang ang scenario ay active**. Walang backfill.

## Mga Limitasyon at Mga Tala

- **Isang event bawat Watch Events module.** Upang makinig sa ilang mga kaganapan sa isang scenario, ilagay ang maraming trigger modules sa hiwalay na mga scenario (o gamitin ang isang module na may ang unioned event list — tingnan sa ibaba).
- **Signature verification ay hindi exposed** — hindi ipinapasa ng Make ang `X-B1-Signature` sa scenario; ang trust boundary ay ang per-scenario webhook URL ng Make na mahirap hulaan. Ito ay normal Make practice. Kung kailangan mo ng explicit signature checks, bumuo ng isang custom integration gamit ang [SDK](/docs/developer/api/webhooks#sdk-support) sa halip.
- **Operation count** — bawat API call mula sa isang action module ay binabayaran laban sa iyong Make operations quota, hindi laban sa kahit ano sa B1's side.

## Troubleshooting

- **Connection test fails** — karamihan ay isang typo sa API key. Muling kopyahin ito mula sa B1Admin (ang buong key ay ipakita lamang minsan; kung nawala mo ito, lumikha ng bagong key).
- **Trigger module doesn't activate** — suriin ang **Settings → Developer → Webhooks** sa B1Admin. Kung hindi ka nakakita ng isang "Make — &lt;event&gt;" row pagkatapos ng pag-activate ng scenario, ang key ay nawawalan ng `settings:write`. I-update ang key at muling i-activate.
- **Action returns `403 Forbidden`** — ang API key ay walang scope para sa endpoint na iyon. Halimbawa, Add Donation ay kailangan ng `donations:write`. I-update ang key sa B1Admin at muling subukan.

## Pag-customize ng App

Ang B1.church Make app ay open source — ang JSON definitions ay nabubuhay sa `B1Integrations/Make/` repo. Kung kailangan mo ng isang module na hindi umiiral (hal. isang bagong action para sa isang endpoint na hindi namin na-cover), magbukas ng isang issue o PR doon.

## Makita Din

- [Zapier](./zapier) — parehong pattern na may mas simple na UI at mas malaking app catalog
- [Slack & Discord](./slack-discord) — built-in chat notifications nang walang Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
