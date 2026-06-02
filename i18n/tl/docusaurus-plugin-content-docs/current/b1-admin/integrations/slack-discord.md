---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Mag-post ng readable notifications mula sa B1 direkta sa isang Slack o Discord channel — mga bagong tao, donations, group sign-ups, form submissions, calendar events, at marami pang iba. Walang third-party account, walang Zap na ina-asikaso: B1 ay muling nag-format ng events sa mga chat messages at nag-POST sa webhook URL ng channel mismo.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ang **Edit Settings** permission sa B1Admin
- Isang admin sa iyong Slack workspace o Discord server upang lumikha ng webhook ng channel
- Magpasya kung aling channel ang gusto mo ng mga notification (maaari mong gamitin ang parehong channel para sa maraming uri ng kaganapan, o hatiin ang mga ito sa mga channels)

</div>

## Paano Ito Gumagana

Ang B1 ay may built-in na **Connector Type** para sa mga chat platform. Kapag lumikha ka ng webhook na may tipo **Slack** o **Discord**, ang webhook engine ay gumagawa pa rin ng iyong dati na delivery + retry + signed-header dance, ngunit ang katawan na ipinapadala ay muling nabuo mula sa B1's normal `{event,churchId,data}` envelope sa maliit na `{text}` (Slack) o `{content}` (Discord) message na inaasahan ng mga serbisyong iyon.

Walang B1 servers na umaabot sa Slack sa isang per-church basis maliban sa umiiral na outbound webhook flow — walang bagong hosting, walang dagdag na babayaran.

## Slack — Hakbang-hakbang

### 1. Makakuha ng Slack Incoming Webhook URL

1. Buksan ang [api.slack.com/apps](https://api.slack.com/apps) sa Slack workspace na gusto mo ng mga notification.
2. Mag-click ng **Create New App → From scratch**, pangalanan ito ng kung ano tulad ng "B1 Notifications", at piliin ang workspace.
3. Sa left nav piliin ang **Incoming Webhooks** at i-toggle ang **Activate Incoming Webhooks** sa *On*.
4. Mag-click ng **Add New Webhook to Workspace**, piliin ang channel (hal. `#donations`), pagkatapos **Allow**.
5. Ang Slack ay nagdadalhin ka pabalik sa page na may bagong **Webhook URL** na mukhang `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Kopyahin ito — yan ang tanging piraso ng impormasyon na kailangan ng B1.

:::caution
I-treat ang Slack webhook URL bilang isang lihim. Ang sinuman na may ito ay maaaring mag-post ng arbitrary messages sa channel. Kung aksidenteng ito ay exposed, muling lumikha ito mula sa Slack app page (regenerating ay nag-rotate lamang ng URL; i-update ang B1 upang tumugma).
:::

### 2. Konektahan ito sa B1Admin

1. Sa B1Admin pumunta sa **Settings → Developer → Webhooks**.
2. Mag-click ng **New Webhook**.
3. Punan:
   - **Name** — isang bagay na readable tulad ng "Donations → #donations". Nakikita lamang nito ang iyong team.
   - **Connector Type** — pumili ng **Slack**.
   - **Payload URL** — i-paste ang Slack URL mula sa hakbang 1.
   - **Events** — tiklutin ang mga events na gusto mo bilang mga mensahe. Para sa isang donations channel, lamang `donation.created`. Para sa isang #people channel, subukan ang `person.created` at `group.member.added`.
4. Mag-click ng **Save**. Isang "Signing Secret" dialog ay lumalabas — maaari mong palampasin ito para sa Slack (ang Slack ay hindi nag-verify ng B1 signatures) at isarahan ito.

### 3. Subukan ito

Muling buksan ang webhook mula sa listahan at mag-click ng **Send Test Event**. Sa loob ng isang o dalawang segundo, isang mensahe tulad ng

> 💝 New donation: $50.00

ay lumalabas sa iyong Slack channel, at isang bagong row ay lumalabas sa **Recent Deliveries** table sa parehong screen na may status `succeeded`. Tapos ka na.

## Discord — Hakbang-hakbang

### 1. Makakuha ng Discord Webhook URL

1. Sa iyong Discord server, mag-hover sa channel na gusto mo ng mga notification at mag-click ng **⚙ gear** (Edit Channel).
2. Buksan ang **Integrations → Webhooks → New Webhook**.
3. Bigyan ito ng isang pangalan at (optionally) isang avatar, pagkatapos mag-click ng **Copy Webhook URL** — mukhang `https://discord.com/api/webhooks/123…/abc…`.

### 2. Konektahan ito sa B1Admin

Kapwa sa Slack flow sa itaas, maliban na itakda ang **Connector Type** sa **Discord**. I-paste ang Discord URL sa **Payload URL** at i-save.

:::tip
Hindi mo kailangang idagdag ang `/slack` sa dulo ng Discord URL — nagpapadala ang B1 ng Discord-native `{content}` payloads, hindi Slack-compatible ones. Lamang i-paste ang URL na bigay ng Discord.
:::

### 3. Subukan ito

Parehong **Send Test Event** button — ipapakita ng Discord ang mensahe sa piniling channel at ang delivery log ay lumilipat sa `succeeded`.

## Ano ang Hitsura ng Mga Mensahe

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

Ang buong listahan ay nabubuhay sa [webhook event catalog](/docs/developer/api/webhooks#event-catalog) — anumang kaganapan doon ay maaaring i-route sa Slack/Discord.

## Isang Channel Bawat Paksa

Hindi mo kailangang ilagay ang bawat event sa isang lugar. Ang karamihan ng mga churches ay nag-setup ng ilang webhooks:

- Isang **#donations** channel na nakinig lamang sa `donation.created`
- Isang **#new-people** channel para sa `person.created` at `group.member.added`
- Isang **#admin-alerts** channel para sa low-volume things tulad ng `form.submission.created`

Walang limitasyon sa bilang ng webhooks bawat church. Bawat isa ay independyente — ang pag-delete o pag-disable ng isa ay hindi nakakaapekto sa iba.

## Pag-inspect ng Mga Deliveries

Ang **Recent Deliveries** table ng webhook editor ay nagpapakita ng nakaraang 50 attempts. Mag-click ng row upang makita ang exact payload na ipinadala at ang response na bumalik. Para sa Slack connector ang payload ay `{"text":"💝 New donation: $50.00"}` — hindi ang raw `{event,churchId,...}` envelope — dahil muling-nag-format ang B1 bago ang delivery.

Kung may nabigo (pulang `failed` o `exhausted` badge), ipinapakita ng dialog ang HTTP status at response body upang makita mo kung ano ang hindi gusto ng Slack o Discord — karaniwang isang copy/paste error sa URL.

## Troubleshooting

- **Walang mensahe na lumalabas + delivery status `400`** — karaniwang ang Connector Type ay nakatakda sa **Standard** ngunit ang URL ay isang Slack/Discord isa. Ang Slack/Discord ay nagtatatangi ng raw envelope. Lumipat ang dropdown sa **Slack** o **Discord** at ipadala ang test.
- **Webhook auto-disabled** — pagkatapos ng 3 sunod-sunod na failed deliveries, i-off ng B1 ang webhook. I-ayos ang URL (o i-rotate ito sa Slack/Discord) at i-toggle ang **Active** pabalik.
- **Mensahe ay dumating ngunit nawawalan ng detalye** — bawat chat platform ay limitado ang laki ng mensahe. Ang mga mensahe ng B1 ay one-liners ng disenyo; para sa mas mayamang mga notification gumamit ng [Zapier](./zapier) o [Make](./make) upang bumuo ng mas puno na Slack message gamit ang kanilang Slack actions.

## Pagbabago ng Connector Types Mamaya

Maaari mong baguhin ang Connector Type sa isang umiiral na webhook — ito ay may epekto sa susunod na delivery. Kung lumipat mula Slack hanggang Standard, ituro ang URL sa iyong sariling HTTPS endpoint at ang parehong signing secret (ito ay inisyu kapag ang webhook ay ginawa) ay nagsisimulang maging verifiable bilang raw envelope.

## Makita Din

- [Zapier](./zapier) — para sa multi-step workflows na nag-trigger mula sa B1 events
- [Make](./make) — visual scenario builder
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang buong payload + signature format kung kailanman mo ay ituro ang webhook sa iyong sariling server
