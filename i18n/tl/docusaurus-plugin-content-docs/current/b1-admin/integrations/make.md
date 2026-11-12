---
title: "Make"
description: "Ikonekta ang B1 Admin sa Make para i-automate ang mga workflow: gumawa ng API key, i-set up ang B1.church trigger at mga aksyon, at ayusin ang mga karaniwang error."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (dating Integromat) ay isang visual na workflow automation platform — katulad ng Zapier sa diwa, na may mas flexible na lohika at mas murang bayarin sa malaking saklaw. Hinahayaan ka ng opisyal na B1.church Make app na bumuo ng "scenario" na agad tumutugon sa mga event ng B1 at nagsusulat ng mga record pabalik sa B1.

</div>

:::caution Hindi pa available
Hindi pa nailalathala ang B1.church Make app sa app directory ng Make, kaya hindi mo pa maidadagdag ang mga **B1.church** module sa ibaba sa isang scenario ngayon. Hanggang sa maging available ito, gamitin ang [Zapier](./zapier.md), o tumawag sa [REST API](/docs/developer/api) ng B1 mula sa **HTTP — Make a request** module ng Make gamit ang [API key](/docs/developer/api/api-keys). Inilalarawan ng lahat ng nasa ibaba kung paano gagana ang app kapag nailabas na ito.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Make](https://www.make.com) account (sakop ng libreng tier ang maliliit na workflow)
- Isang church admin na may pahintulot na **Edit Settings** sa B1Admin
- Malinaw na ideya kung anong scenario ang gusto mong buuin

</div>

## Mga Module {#modules}

| Uri | Ano | B1 event / endpoint |
|---|---|---|
| **Instant Trigger** | Watch Events | anumang naka-subscribe na event ng B1 (`person.created`, `donation.created`, …) |
| **Action** | Create Person | nagdaragdag ng bagong tao |
| **Action** | Add Donation | nagtatala ng donasyon |
| **Action** | Add Group Member | nagdaragdag ng tao sa isang grupo |
| **Search** | Search People | naghahanap ng tao ayon sa pangalan o email |

Hinahayaan ka ng instant trigger na piliin kung aling event ang pakikinggan — isang trigger module bawat scenario, na naka-configure kada event.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-create-a-b1-api-key}

1. Sa B1Admin, pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, pangalanan itong "Make", at bigyan ng mga scope na kailangan mo.
3. **Isama ang `settings:write`** kung may gumagamit ng instant trigger ang alinman sa iyong mga scenario — nagrerehistro ang Make ng webhook para sa iyo kapag na-on ang scenario.
4. Bigyan din ng mga scope na kailangan ng mga action module (hal. `donations:write` para sa Add Donation module).
5. I-save at i-copy ang `cak_…` key.

### 2. I-install ang connection {#2-install-the-connection}

1. Sa Make, gumawa ng bagong scenario at ilagay ang **B1.church** trigger module sa canvas.
2. Kapag nagtanong, **Create a connection**. I-paste ang API key sa field na *API Key* at iwanang `https://api.churchapps.org` ang *API Base URL* (maliban kung nagte-test ka sa staging).
3. I-click ang **Save** — tina-test ng Make ang key sa pamamagitan ng pagbasa ng profile ng iyong simbahan.

Naka-save ang connection sa iyong Make account at muling ginagamit sa mga scenario.

### 3. I-configure ang trigger {#3-configure-the-trigger}

1. Buksan ang mga setting ng module na **Watch Events**.
2. Piliin ang event na gusto mo — hal. `donation.created`.
3. I-save. Gumagawa ang Make ng natatanging webhook URL at iniimbak ito nang panloob.

### 4. Magdagdag ng mga kasunod na module {#4-add-downstream-modules}

Ilagay ang alinman sa daan-daang app module ng Make sa canvas — Mailchimp, Google Sheets, Slack, HubSpot, sarili mong HTTP endpoint, atbp. Imapa ang output ng trigger (`event`, `churchId`, `data.id`, `data.amount`, …) sa kanilang input field. Hinahayaan ka ng mga flatten / iterator / router / aggregator module ng Make na bumuo ng mga sangay at parallel na daloy na mahirap gawin sa Zapier.

### 5. I-on ang scenario {#5-turn-the-scenario-on}

I-toggle ang **Active** sa header ng scenario. Tinatawag ng Make ang `POST /membership/webhooks` ng B1 para irehistro ang URL. Mula sa sandaling iyon, bawat tumutugmang event ng B1 ay dadaan sa scenario nang real time.

Kapag na-off ang scenario, tinatawag nito ang `DELETE /membership/webhooks/{id}` para walang maiwang hindi nagagamit na subscription.

## Karaniwang Recipe {#common-recipes}

### I-sync ang mga donasyon sa isang Google Sheet para sa pagsusuri ng finance {#sync-donations-to-a-google-sheet-for-finance-review}

- **Trigger** — B1: Watch Events (`donation.created`)
- **Action** — Google Sheets: Add a Row. Imapa ang `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` sa mga column ng sheet.

### Kondisyonal na Slack notification ayon sa halaga ng donasyon {#conditional-slack-notification-by-donation-amount}

- **Trigger** — B1: Watch Events (`donation.created`)
- **Router**:
  - Sangay A — Filter: `data.amount >= 1000` → Slack: mag-post sa `#major-gifts`
  - Sangay B — fallthrough → Slack: mag-post sa `#donations`

### Bagong tao → CRM + welcome email + Slack {#new-person--crm--welcome-email--slack}

- **Trigger** — B1: Watch Events (`person.created`)
- **Action** — HubSpot: Create Contact
- **Action** — Mailgun: Send Welcome Email
- **Action** — Slack: Ipaalam sa `#new-people` (sabay-sabay — gamitin ang router ng Make)

## Paano Gumagana ang Instant Trigger {#how-the-instant-trigger-works}

Nakabatay sa webhook ang instant trigger, hindi sa polling — kapag na-activate, tinatawag ng Make ang `POST /membership/webhooks` gamit ang nabuong URL nito at ang event na pinili mo. Kapag nangyari ang event sa B1, ipinapadala ng B1 ang envelope sa URL ng Make at tumatakbo ang iyong scenario sa loob ng ilang segundo. Ang pag-deactivate ng scenario ay nag-aalis ng webhook.

Ang trigger ay pumapaandar lang sa mga event na nangyayari **habang aktibo ang scenario**. Walang backfill.

## Mga Limitasyon at Paalala {#limits--notes}

- **Isang event bawat Watch Events module.** Para makinig sa ilang event, gumawa ng isang scenario bawat event.
- **Hindi naipapakita ang signature verification** — hindi ipinapasa ng Make ang `X-B1-Signature` sa scenario; ang hangganan ng tiwala ay ang hindi mahulaang per-scenario webhook URL ng Make. Ito ay karaniwang gawain sa Make. Kung kailangan mo ng tahasang signature check, gumawa ng custom na integration gamit ang [SDK](/docs/developer/api/webhooks#sdk-support).
- **Bilang ng operasyon** — bawat API call mula sa action module ay binibilang sa quota ng operasyon mo sa Make, hindi sa anumang bahagi ng B1.

## Troubleshooting {#troubleshooting}

- **Pumapalya ang connection test** — kadalasan ay typo sa API key. Kopyahin muli mula sa B1Admin (ipinapakita ang buong key nang isang beses lang; kung nawala mo na ito, gumawa ng bagong key).
- **Hindi nag-a-activate ang trigger module** — tingnan ang **Settings → Developer → Webhooks** sa B1Admin. Kung walang lumabas na hilera na "Make — &lt;event&gt;" pagkatapos i-activate ang scenario, kulang sa `settings:write` ang key. I-update ang key at i-reactivate.
- **Nagbabalik ang action ng `403 Forbidden`** — kulang sa scope ang API key para sa endpoint na iyon. Halimbawa, kailangan ng Add Donation ang `donations:write`. I-update ang key sa B1Admin at i-test muli.

## Kulang ang Isang Module? {#missing-a-module}

Kung kailangan mo ng module na hindi pa umiiral (hal. bagong action para sa endpoint na hindi pa natatakpan namin), mag-email sa [support@churchapps.org](mailto:support@churchapps.org). Samantala, puwedeng tumawag ang **HTTP — Make a request** module ng Make sa anumang endpoint ng B1 gamit ang header na `Authorization: Bearer cak_…`.

## Tingnan Din {#see-also}

- [Zapier](./zapier.md) — parehong pattern na may mas simpleng UI at mas malaking catalog ng app
- [Slack at Discord](./slack-discord.md) — built-in na chat notification nang walang Make
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
