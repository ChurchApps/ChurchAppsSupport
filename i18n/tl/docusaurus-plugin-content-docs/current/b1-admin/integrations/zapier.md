---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Ang opisyal na B1.church app sa Zapier ay nagpapahintulot sa isang Zap na tumugon sa mga pangyayari sa iyong simbahan (bagong tao, bagong donasyon, bagong miyembro ng grupo, ...) at magsulat ng mga record pabalik sa B1. Walang kailangang coding at walang kailangang imprastraktura -- ikakabit mo ito sa drag-and-drop editor ng Zapier, ipapaste ang isang API key, at ia-activate ang Zap.

</div>

:::caution Naghihintay pa ng approval ng Zapier
Nagawa at gumagana na ang B1.church app, pero naghihintay pa ito ng review ng Zapier bago ito lumitaw nang publiko sa app directory ng Zap editor. Hanggang maaprubahan ito, mga inimbitahang account lang ang makakagamit nito. Inilalarawan ng lahat ng nasa ibaba kung paano ito gagana kapag naaprubahan na.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Zapier](https://zapier.com) account (sapat na ang libreng tier para sa ilang Zap)
- Isang church admin na may **Edit Settings** permission sa B1Admin (gagawa ka ng API key)
- Ideya kung ano ang gusto mong gawin -- halimbawa, "kapag may idinagdag na tao sa B1, idagdag siya sa aking Mailchimp list"

</div>

## Mga Trigger at Action

| Uri | Ano | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | nagdadagdag ng bagong tao |
| **Action** | Add Donation | nagtatala ng donasyon |
| **Action** | Add Group Member | nagdadagdag ng tao sa grupo |
| **Action** | Find Person | naghahanap ng tao gamit ang id, email, o pangalan; nabibigo ang task kung walang tugma |

Pagsamahin ang mga ito nang malaya sa alinman sa 7,000+ suportadong app ng Zapier.

## Pag-set Up

### 1. Gumawa ng B1 API key

1. Sa B1Admin, pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, bigyan ito ng pangalang gaya ng "Zapier", at piliin ang mga scope na kailangan ng Zap.
3. **Mahalaga:** Nagre-register ang mga Zapier trigger ng webhook sa ngalan mo kapag na-on ang Zap, at kailangan nito ang scope na **`settings:write`**. Laging isama ang `settings:write` kung may gumagamit ng B1 trigger ang alinman sa iyong mga Zap.
4. Ibigay din ang mga scope na kailangan ng mga action -- halimbawa, ang action na "Add Donation" ay nangangailangan ng `donations:write`, ang "Create Person" ay nangangailangan ng `people:write`.
5. I-save. Ang buong `cak_…` key ay ipinapakita nang **isang beses** -- kopyahin ito.

### 2. Ikonekta ang Zapier sa B1

1. Sa Zapier, gumawa ng bagong Zap.
2. Kapag pumili ka ng B1 trigger o action sa unang pagkakataon, hihilingin ng Zapier na **Sign in to B1.church**.
3. I-paste ang API key mula sa hakbang 1 at i-click ang **Yes, Continue**. Bini-validate ito ng Zapier laban sa iyong simbahan.

Naka-save ang koneksyon sa Zapier at muling ginagamit ng bawat Zap sa iyong account.

### 3. Buuin ang Zap

Pumili ng trigger, pagkatapos magdagdag ng isa o higit pang action step. Nasa ibaba ang mga halimbawa.

## Mga Karaniwang Recipe

### Idagdag ang bagong tao sa B1 sa Mailchimp

- **Trigger** -- B1: New Person
- **Action** -- Mailchimp: Add/Update Subscriber. I-map ang `name__first`, `name__last`, `contactInfo__email` ng B1 sa mga field na First Name / Last Name / Email ng Mailchimp.

### Mag-post ng donasyon sa Slack channel na may mas mayamang card kaysa sa built-in na connector

- **Trigger** -- B1: New Donation
- **Action** -- Slack: Send Channel Message. Gumawa ng anumang layout -- mga button, attachment, atbp. -- na hindi kayang gawin ng built-in na [Slack connector](./slack-discord).

### Idagdag ang bagong miyembro ng grupo sa isang Google Group

- **Trigger** -- B1: New Group Member (sinala sa partikular na `groupId`)
- **Action** -- Filter by Zapier: magpatuloy lang kung ang B1 group ay iyong pakay
- **Action** -- B1: Find Person (gamitin ang `personId` ng trigger para kunin ang email)
- **Action** -- Google Groups: Add Member

### Ipasa ang mga form submission sa project tracker

- **Trigger** -- B1: New Form Submission
- **Action** -- Notion / Linear / Asana / Trello: Create page / issue / task

## Paano Gumagana ang Mga Trigger sa Loob

Ang mga trigger ay **REST hook**, hindi polling -- hindi kinukulit ng Zapier ang B1 kada 15 minuto. Kapag na-on mo ang Zap, hihilingin ng Zapier sa B1 na magrehistro ng webhook na tumuturo sa pribadong URL ng Zapier; kapag nangyari ang event, ipinapadala ng B1 ang envelope sa Zapier at magsisimula ang iyong Zap **sa loob ng ilang segundo**. Kapag na-off mo ang Zap, hihilingin ng Zapier sa B1 na burahin ang webhook -- walang naiiwang nakabitin na subscription.

Ibig sabihin, tanging mga event na nangyari **pagkatapos** ma-on ang Zap ang magti-trigger. Walang backfill -- ang pag-on ng Zap ay hindi nagre-replay ng mga donasyon kahapon.

## Mga Limitasyon at Paalala

- **Maraming Zap na may iisang trigger** ay bawat isa nagre-register ng sariling B1 webhook -- walang conflict, pero makabubuting malaman ito kung sinisiyasat mo ang **Settings → Developer → Webhooks** at nagtataka kung bakit may tatlong magkakaparehong row na `Zapier -- donation.created`.
- **Test data sa Zap setup** -- kapag gumagawa ka ng Zap, humihingi ang Zapier ng sample data para ma-map ang mga field. Kukunin nito ang pinakabagong tugmang event mula sa B1 kung mayroon; kung wala, gagamit ito ng gawa-gawang sample mula sa app definition.
- **Lumalabas na Zap error ang pagkabigo ng action** sa task history ng Zapier. Karaniwang sanhi: API key na walang tamang scope (halimbawa, ang action na "Add Donation" ay nangangailangan ng `donations:write`). Gumawa ulit ng key na may tamang scope at ikonekta muli sa Zapier.
- **Mga quota ng outbound API call** -- ang bawat tawag sa B1 API mula sa isang action ay binibilang sa iyong task quota sa Zapier, hindi sa anumang bagay sa panig ng B1.

## Pag-troubleshoot

- **"Authentication failed"** kapag kumokonekta -- mali, binawi, o kulang sa mga scope na kailangan ng Zap ang API key. Gumawa ulit nito sa B1Admin na may kahit `settings:write` at ang mga resource scope na ginagalaw ng Zap, pagkatapos i-update ang koneksyon.
- **Hindi kailanman nagti-trigger ang trigger** -- tiyaking talagang nairehistro ang webhook: sa B1Admin, dapat nang nagpapakita ang **Settings → Developer → Webhooks** ng row na pinangalanang "Zapier -- &lt;event&gt;". Kung wala ito, malamang na kulang sa `settings:write` ang API key noong na-on mo ang Zap. Ayusin ang key, i-off at i-on ulit ang Zap.
- **Nagti-trigger nang dalawang beses** -- paminsan-minsang muling nagpapadala ang Zapier kung nawala ang acknowledgment nito. Gumamit ng step na "Filter by Zapier" sa isang natatanging id (halimbawa, ang `id` ng tao) kung kailangan mo ng mahigpit na deduplication.

## Tingnan Din

- [Make](./make) -- parehong pattern, ibang platform
- [Slack & Discord](./slack-discord) -- mas simpleng notification sa chat nang walang Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
