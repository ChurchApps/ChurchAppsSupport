---
title: "Slack at Discord"
description: "I-post ang mga event ng B1 Admin gaya ng mga bagong tao, donasyon, at form submission sa isang Slack o Discord channel gamit ang incoming webhook, nang walang kailangang Zapier."
---

# Slack at Discord

<div class="article-intro">

Mag-post ng nababasang notification mula sa B1 diretso sa isang Slack o Discord channel — mga bagong tao, donasyon, group sign-up, form submission, event sa kalendaryo, at iba pa. Walang third-party account, walang Zap na kailangang alagaan: inaayos ng B1 ang mga event bilang mga chat message at siya mismo ang nagpo-POST ng mga ito sa webhook URL ng channel.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng pahintulot na **Edit Settings** sa B1Admin
- Isang admin sa iyong Slack workspace o Discord server para gumawa ng Incoming Webhook ng channel
- Pumili kung aling channel ang gusto mong pagpadalhan ng notification (puwede mong gamitin ang iisang channel para sa ilang uri ng event, o hatiin ang mga ito sa maraming channel)

</div>

## Paano Ito Gumagana {#how-it-works}

May built-in na **Connector Type** ang B1 para sa mga chat platform. Kapag gumawa ka ng webhook na may uri na **Slack** o **Discord**, ginagawa pa rin ng webhook engine ang karaniwang delivery + retry + signed-header, pero ang body na ipinapadala ay inaayos mula sa karaniwang envelope ng B1 na `{event,churchId,data}` tungo sa maliit na mensaheng `{text}` (Slack) o `{content}` (Discord) na inaasahan ng mga serbisyong iyon.

Walang server ng B1 na kumokontak sa Slack kada simbahan maliban sa umiiral nang outbound webhook flow — walang bagong ho-host, walang dagdag na babayaran.

## Slack — Hakbang-hakbang {#slack--step-by-step}

### 1. Kumuha ng Slack Incoming Webhook URL {#1-get-a-slack-incoming-webhook-url}

1. Buksan ang [api.slack.com/apps](https://api.slack.com/apps) sa Slack workspace kung saan mo gustong makatanggap ng notification.
2. I-click ang **Create New App → From scratch**, pangalanan ito ng halimbawang "B1 Notifications", at piliin ang workspace.
3. Sa kaliwang nav, piliin ang **Incoming Webhooks** at i-toggle ang **Activate Incoming Webhooks** sa *On*.
4. I-click ang **Add New Webhook to Workspace**, piliin ang channel (hal. `#donations`), pagkatapos ay **Allow**.
5. Ibabalik ka ng Slack sa pahina na may bagong **Webhook URL** na mukhang `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopyahin ito — iyon lang ang impormasyong kailangan ng B1.

:::caution
Ituring na sikreto ang Slack webhook URL. Ang sinumang may hawak nito ay puwedeng mag-post ng kahit anong mensahe sa channel. Kung aksidente itong nalantad, i-regenerate ito mula sa pahina ng Slack app (ang pag-regenerate ay nagpapalit lang ng URL; i-update ang B1 para tumugma).
:::

### 2. Ikonekta ito sa B1Admin {#2-connect-it-in-b1admin}

1. Sa B1Admin, pumunta sa **Settings → Developer → Webhooks**.
2. I-click ang **New Webhook**.
3. Punan ang:
   - **Name** — isang nababasang pangalan tulad ng "Donations → #donations". Ang iyong team lang ang makakakita nito.
   - **Connector Type** — piliin ang **Slack**.
   - **Payload URL** — i-paste ang Slack URL mula sa hakbang 1.
   - **Events** — lagyan ng check ang mga event na gusto mong maging mensahe. Para sa channel ng donasyon, `donation.created` lang. Para sa #people channel, subukan ang `person.created` at `group.member.added`.
4. I-click ang **Save**. Lalabas ang dialog na "Signing Secret" — puwede mo itong balewalain para sa Slack (hindi bine-verify ng Slack ang signature ng B1) at isara ito.

### 3. Subukan ito {#3-test-it}

Buksan muli ang webhook mula sa listahan at i-click ang **Send Test Event**. Magpapadala ang B1 ng sample ng unang event na na-tick mo, kaya sa loob ng isa o dalawang segundo ay lalabas sa iyong Slack channel ang isang mensaheng gaya ng

> 💝 New donation: $50.00

at may lalabas na bagong hilera sa talahanayang **Recent Deliveries** sa parehong screen na may status na `succeeded`. Tapos ka na.

## Discord — Hakbang-hakbang {#discord--step-by-step}

### 1. Kumuha ng Discord Webhook URL {#1-get-a-discord-webhook-url}

1. Sa iyong Discord server, i-hover ang channel kung saan mo gustong makatanggap ng notification at i-click ang **⚙ gear** (Edit Channel).
2. Buksan ang **Integrations → Webhooks → New Webhook**.
3. Bigyan ito ng pangalan at (opsyonal) avatar, pagkatapos ay i-click ang **Copy Webhook URL** — mukhang `https://discord.com/api/webhooks/123…/abc…`.

### 2. Ikonekta ito sa B1Admin {#2-connect-it-in-b1admin-1}

Kapareho ng daloy ng Slack sa itaas, maliban na itakda ang **Connector Type** sa **Discord**. I-paste ang Discord URL sa **Payload URL** at i-save.

:::tip
**Hindi** mo kailangang idagdag ang `/slack` sa dulo ng Discord URL — nagpapadala ang B1 ng mga payload na `{content}` na katutubo sa Discord, hindi mga payload na compatible sa Slack. I-paste lang ang URL na ibinigay ng Discord.
:::

### 3. Subukan ito {#3-test-it-1}

Ang parehong button na **Send Test Event** — ipinapakita ng Discord ang mensahe sa napiling channel at nagiging `succeeded` ang delivery log.

## Ano ang Hitsura ng mga Mensahe {#what-the-messages-look-like}

| Event | Halimbawang mensahe |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Kumpleto ang listahan sa [webhook event catalog](/docs/developer/api/webhooks#event-catalog) — puwedeng ipadala sa Slack/Discord ang alinmang event doon.

## Isang Channel Bawat Paksa {#one-channel-per-topic}

Hindi mo kailangang ilagay ang lahat ng event sa iisang lugar. Karamihan sa mga simbahan ay nagse-set up ng ilang webhook:

- Isang **#donations** channel na tanging `donation.created` lang ang pinapakinggan
- Isang **#new-people** channel para sa `person.created` at `group.member.added`
- Isang **#admin-alerts** channel para sa mga bagay na mababa ang volume gaya ng `form.submission.created`

Walang limitasyon sa bilang ng webhook bawat simbahan. Malaya ang bawat isa — ang pagbura o pag-disable sa isa ay hindi nakakaapekto sa iba.

## Pagsusuri ng mga Delivery {#inspecting-deliveries}

Ipinapakita ng talahanayang **Recent Deliveries** ng webhook editor ang huling 50 pagtatangka. I-click ang isang hilera para makita ang eksaktong payload na ipinadala at ang response na bumalik. Para sa Slack connector, ang payload ay `{"text":"💝 New donation: $50.00"}` — hindi ang raw na envelope na `{event,churchId,...}` — dahil inaayos ito ng B1 bago i-deliver.

Kung may pumalya (isang amber na badge na `failed` habang patuloy pang sinusubukan ng B1, o pulang badge na `exhausted` kapag sumuko na ito), ipinapakita ng column na **Response** ang HTTP status, at ipinapakita ng dialog ng hilera ang response body, para makita mo kung ano ang hindi nagustuhan ng Slack o Discord — kadalasan ay pagkakamali sa pagkopya/pag-paste ng URL. I-click ang **Redeliver** para ipadala muli ang delivery na iyon.

## Troubleshooting {#troubleshooting}

- **Walang lumalabas na mensahe + delivery status na `400`** — kadalasan ay nakatakda ang Connector Type sa **Standard** pero Slack/Discord URL ang gamit. Tinatanggihan ng Slack/Discord ang raw na envelope. Palitan ang dropdown sa **Slack** o **Discord** at ipadala muli ang test.
- **Awtomatikong na-disable ang webhook** — sinusubukan muli ng B1 ang bawat pumalyang delivery nang mga limang araw. Kapag tatlong delivery nang sunud-sunod ang naubusan ng retry, ino-off ito ng B1 (ang status nito ay **Disabled**). Ayusin ang URL (o palitan ito sa Slack/Discord), i-on muli ang **Active**, at i-save.
- **Dumating ang mensahe pero kulang sa detalye** — may limitasyon sa laki ng mensahe ang bawat chat platform. Sadyang maikli ang mga mensahe ng B1; para sa mas mayayamang notification, gamitin ang [Zapier](./zapier.md) o [Make](./make.md) para buuin ang mas kumpletong mensahe sa Slack sa pamamagitan ng kanilang mga Slack action.

## Pagpapalit ng Connector Type sa Hinaharap {#switching-connector-types-later}

Puwede mong palitan ang Connector Type ng umiiral nang webhook — magkakabisa ito sa susunod na delivery. Kung lilipat ka mula Slack patungong Standard, ituro ang URL sa sarili mong HTTPS endpoint, at ang parehong signing secret (inilabas noong ginawa ang webhook) ay magiging mabe-verify na bilang raw na envelope.

## Tingnan Din {#see-also}

- [Zapier](./zapier.md) — para sa mga multi-step na workflow na tinatrigger ng mga event ng B1
- [Make](./make.md) — visual na scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang buong format ng payload at signature kung sakaling ituro mo ang isang webhook sa sarili mong server
