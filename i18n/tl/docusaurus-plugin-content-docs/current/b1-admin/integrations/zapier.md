---
title: "Zapier"
description: "Ikonekta ang B1 Admin sa Zapier para simulan ang mga automation sa mga bagong tao, donasyon, at miyembro ng grupo, at ibalik ang mga record sa B1 nang walang kinakailangang coding."
---

# Zapier

<div class="article-intro">

Ang opisyal na B1.church app sa Zapier ay nagpapahintulot sa isang Zap na tumugon sa mga event sa iyong simbahan (bagong tao, bagong donasyon, bagong miyembro ng grupo, …) at magsulat ng mga record pabalik sa B1. Walang coding, walang imprastraktura — ikakabit mo ito sa drag-and-drop editor ng Zapier, ipe-paste ang API key, at io-on ang Zap.

</div>

:::caution Naghihintay sa approval ng Zapier
Gumagana na at tapos na ang B1.church app, pero naghihintay pa ito sa review ng Zapier bago lumabas nang pampubliko sa app directory ng Zap editor. Hanggang sa ma-approve ito, tanging mga inimbitahang account lang ang makakagamit nito. Inilalarawan ng lahat ng nasa ibaba kung paano ito gagana kapag na-approve na.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Zapier](https://zapier.com) account (sapat na ang libreng tier para sa ilang Zap)
- Isang church admin na may pahintulot na **Edit Settings** sa B1Admin (gagawa ka ng API key)
- Malinaw na ideya kung ano ang gusto mong gawin — hal. "kapag may idinagdag na tao sa B1, idagdag siya sa aking Mailchimp list"

</div>

## Mga Trigger at Aksyon {#triggers-and-actions}

| Uri | Ano | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Aksyon** | Create Person | nagdaragdag ng bagong tao |
| **Aksyon** | Add Donation | nagtatala ng donasyon |
| **Aksyon** | Add Group Member | nagdaragdag ng tao sa isang grupo |
| **Aksyon** | Find Person | naghahanap ng tao ayon sa id, email, o pangalan; pumapalya ang task kung walang tumutugma |

Puwede mong pagsamahin ang mga ito nang malaya sa alinman sa 7,000+ app na sinusuportahan ng Zapier.

## Setup {#setup}

### 1. Gumawa ng B1 API key {#1-create-a-b1-api-key}

1. Sa B1Admin, pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, bigyan ito ng pangalang tulad ng "Zapier", at piliin ang mga scope na kailangan ng Zap.
3. **Mahalaga:** palaging isama ang scope na **`settings:write`**. Sinusuri ng Zapier ang key laban sa listahan ng webhook ng B1 kapag ikinonekta mo ito, at nagre-rehistro ang B1 ng webhook para sa iyo kapag na-on ang Zap — kailangan ng dalawa ang `settings:write`. Papalya sa connection test ang key na walang nito, kahit B1 action lang ang gamit ng iyong mga Zap.
4. Bigyan din ng mga scope na kailangan ng mga aksyon — halimbawa, ang aksyong "Add Donation" ay nangangailangan ng `donations:write`, ang "Create Person" ay nangangailangan ng `people:write`.
5. I-save. Ipinapakita ang buong `cak_…` key nang **isang beses lang** — kopyahin ito.

### 2. Ikonekta ang Zapier sa B1 {#2-connect-zapier-to-b1}

1. Sa Zapier, gumawa ng bagong Zap.
2. Kapag unang beses kang pumili ng B1 trigger o aksyon, hihilingin ng Zapier na **Sign in to B1.church**.
3. I-paste ang API key mula sa hakbang 1 sa **API Key** (iwanang blangko ang **API URL**) at i-click ang **Yes, Continue**. Vinavalidate ito ng Zapier laban sa iyong simbahan.

Naka-save ang koneksyon sa Zapier at muling ginagamit ng bawat Zap sa iyong account.

### 3. Buuin ang Zap {#3-build-the-zap}

Pumili ng trigger, pagkatapos ay magdagdag ng isa o higit pang action step. Mga halimbawa sa ibaba.

## Karaniwang Recipe {#common-recipes}

### Idagdag ang mga bagong tao sa B1 sa Mailchimp {#add-new-b1-people-to-mailchimp}

- **Trigger** — B1: New Person
- **Aksyon** — Mailchimp: Add/Update Subscriber. Imapa ang `name__first`, `name__last`, `contactInfo__email` ng B1 sa mga field na First Name / Last Name / Email ng Mailchimp.

### Mag-post ng mga donasyon sa Slack channel na may mas mayamang card kaysa sa built-in na connector {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Trigger** — B1: New Donation
- **Aksyon** — Slack: Send Channel Message. Buuin ang anumang layout — mga button, attachment, atbp. — na hindi kayang gawin ng built-in na [Slack connector](./slack-discord.md).

### Idagdag ang mga bagong miyembro ng grupo sa Google Group {#add-new-group-members-to-a-google-group}

- **Trigger** — B1: New Group Member
- **Aksyon** — Filter by Zapier: magpatuloy lang kung ang `groupId` ng trigger ay ang grupo ng B1 na pinapahalagahan mo
- **Aksyon** — B1: Find Person (gamitin ang `personId` ng trigger para makuha ang email)
- **Aksyon** — Google Groups: Add Member

### Ipasa ang mga form submission sa project tracker {#forward-form-submissions-to-a-project-tracker}

- **Trigger** — B1: New Form Submission
- **Aksyon** — Notion / Linear / Asana / Trello: Create page / issue / task

## Paano Gumagana ang mga Trigger sa Ilalim {#how-triggers-work-under-the-hood}

Ang mga trigger ay **REST hook**, hindi polling — hindi kinukulit ng Zapier ang B1 kada 15 minuto. Kapag na-on mo ang Zap, hihilingin ng Zapier sa B1 na magrehistro ng webhook na tumuturo sa pribadong URL ng Zapier; kapag nangyari ang event, ipinapadala ng B1 ang envelope sa Zapier at sisimulan ng Zap mo **sa loob ng ilang segundo**. Kapag na-off mo ang Zap, hihilingin ng Zapier sa B1 na burahin ang webhook — walang naiwang subscription.

Ibig sabihin, tanging mga event na nangyayari **pagkatapos** na ma-on ang Zap ang tinatrigger ng trigger. Walang backfill — ang pag-on ng Zap ay hindi nagre-replay ng mga donasyon kahapon.

## Mga Limitasyon at Paalala {#limits--notes}

- **Maraming Zap na may parehong trigger** ay bawat isa ay nagre-rehistro ng sarili nitong webhook ng B1 — walang salungatan, pero makabubuting malaman ito kapag tinitingnan mo ang **Settings → Developer → Webhooks** at nagtataka kung bakit may tatlong magkakaparehong hilerang `Zapier — donation.created`.
- **Test data sa setup ng Zap** — kapag gumagawa ka ng Zap, hihingi ang Zapier ng sample na datos para i-map ang mga field. Kukunin nito ang pinakabagong tumutugmang event mula sa B1 kung mayroon; kung wala, gagamit ito ng sintetikong sample mula sa app definition.
- **Lumalabas bilang error ng Zap ang pagpalya ng aksyon** sa task history ng Zapier. Karaniwang sanhi: API key na walang tamang scope (hal. ang aksyong "Add Donation" ay nangangailangan ng `donations:write`). Gumawa muli ng key na may tamang scope at ikonekta muli sa Zapier.
- **Quota ng outbound API call** — bawat tawag sa B1 API mula sa aksyon ay binibilang sa quota ng task mo sa Zapier, hindi sa anumang bahagi ng B1.

## Troubleshooting {#troubleshooting}

- **"Authentication failed"** kapag kumokonekta — mali, nabura, o kulang sa `settings:write` ang API key. Gumawa ng bagong key sa B1Admin na may `settings:write` kasama ang anumang resource scope na ginagalaw ng Zap (hindi mababago ang scope ng umiiral na key), pagkatapos ay i-update ang connection.
- **Hindi nag-fire ang trigger** — tiyakin na talagang nairehistro ang webhook: sa B1Admin, dapat nang magpakita ang **Settings → Developer → Webhooks** ng hilerang may pangalang "Zapier — &lt;event&gt;". Kung wala ito, malamang na kulang sa `settings:write` ang API key noong i-on mo ang Zap. Ayusin ang key, i-off at i-on muli ang Zap.
- **Dalawang beses nag-fire ang trigger** — paminsan-minsang muling inihahatid ng Zapier kung nawala ang acknowledgement nito. Gumamit ng step na "Filter by Zapier" sa natatanging id (hal. `id` ng tao) kung kailangan mo ng mahigpit na deduplication.

## Tingnan Din {#see-also}

- [Make](./make.md) — parehong pattern, ibang platform
- [Slack at Discord](./slack-discord.md) — mas simpleng chat notification nang walang Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
