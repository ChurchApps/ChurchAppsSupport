---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Ang opisyal na B1.church app sa Zapier ay nagbibigay-daan sa isang Zap na tumugon sa mga event sa iyong simbahan (bagong tao, bagong donasyon, bagong miyembro ng grupo, …) at magsulat ng mga record pabalik sa B1. Walang coding, walang infrastructure — ikinokonekta mo ito sa drag-and-drop editor ng Zapier, ide-paste ang isang API key, at ino-on ang Zap.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Zapier](https://zapier.com) account (sapat na ang free tier para sa ilang Zap)
- Isang church admin na may permisong **Edit Settings** sa B1Admin (gagawa ka ng API key)
- Isang ideya kung ano ang gusto mong gawin — hal. "kapag nagdagdag ng tao sa B1, idagdag sila sa aking Mailchimp list"

</div>

## Mga Trigger at Aksyon

| Uri | Ano | B1 event / endpoint |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | nagdaragdag ng bagong tao |
| **Action** | Add Donation | nagre-record ng donasyon |
| **Action** | Add Group Member | nagdaragdag ng tao sa isang grupo |
| **Action** | Find Person | naghahanap ng tao ayon sa id, email, o pangalan; nabibigo ang task kung walang tumutugma |

Pagsamahin ang mga ito nang malaya sa alinman sa 7,000+ na sinusuportahang app ng Zapier.

## Setup

### 1. Gumawa ng B1 API key

1. Sa B1Admin, pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, bigyan ito ng pangalang tulad ng "Zapier", at piliin ang mga scope na kailangan ng Zap.
3. **Mahalaga:** ang mga trigger ng Zapier ay nagrerehistro ng webhook para sa iyo kapag in-on ang Zap, na nangangailangan ng scope na **`settings:write`**. Palaging isama ang `settings:write` kung gumagamit ang alinman sa iyong mga Zap ng B1 trigger.
4. Bigyan din ito ng mga scope na kailangan ng mga action — halimbawa, ang action na "Add Donation" ay nangangailangan ng `donations:write`, at ang "Create Person" ay nangangailangan ng `people:write`.
5. I-save. Ipapakita ang buong key na `cak_…` nang **isang beses lamang** — kopyahin ito.

### 2. Ikonekta ang Zapier sa B1

1. Sa Zapier, gumawa ng bagong Zap.
2. Kapag pumili ka ng B1 trigger o action sa unang pagkakataon, hihilingin ng Zapier na **Sign in to B1.church**.
3. I-paste ang API key mula sa hakbang 1 at i-click ang **Yes, Continue**. I-vavalidate ito ng Zapier laban sa iyong simbahan.

Naka-save ang koneksyon sa Zapier at magagamit muli ng bawat Zap sa iyong account.

### 3. Buuin ang Zap

Pumili ng trigger, pagkatapos ay magdagdag ng isa o higit pang hakbang na action. Mga halimbawa sa ibaba.

## Mga Karaniwang Recipe

### Idagdag ang mga bagong tao ng B1 sa Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. I-map ang `name__first`, `name__last`, `contactInfo__email` ng B1 papunta sa mga field na First Name / Last Name / Email ng Mailchimp.

### I-post ang mga donasyon sa isang Slack channel na may mas mayamang card kaysa sa built-in connector

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Gumawa ng anumang layout — buttons, attachments, atbp. — na hindi kaya ng built-in [Slack connector](./slack-discord).

### Idagdag ang mga bagong miyembro ng grupo sa isang Google Group

- **Trigger** — B1: New Group Member (naka-filter sa isang partikular na `groupId`)
- **Action** — I-filter sa pamamagitan ng Zapier: magpatuloy lamang kung ang grupo sa B1 ay ang partikular na inaalala mo
- **Action** — B1: Find Person (gamitin ang `personId` ng trigger para kunin ang email)
- **Action** — Google Groups: Add Member

### I-forward ang mga form submission sa isang project tracker

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## Paano Gumagana ang mga Trigger sa Ilalim ng Lahat

Ang mga trigger ay **REST hooks**, hindi polling — hindi nagpi-ping ang Zapier sa B1 tuwing 15 minuto. Kapag in-on mo ang Zap, hihilingin ng Zapier sa B1 na magrehistro ng webhook na nakatuon sa isang pribadong URL ng Zapier; kapag pumutok ang event, magpo-POST ang B1 ng envelope sa Zapier at magsisimula ang iyong Zap sa loob ng **ilang segundo**. I-off ang Zap at hihilingin ng Zapier sa B1 na tanggalin ang webhook — walang natitirang orphan na subscription.

Nangangahulugan ito na tumutugon lamang ang trigger sa mga event na nangyayari **pagkatapos** ma-on ang Zap. Walang backfill — ang pag-on ng isang Zap ay hindi nagre-replay ng mga donasyon kahapon.

## Mga Limitasyon at Paalala

- **Ang maraming Zap na may parehong trigger** ay bawat isa'y nagrerehistro ng sarili nilang B1 webhook — walang conflict, ngunit mabuting malaman ito kung sinusuri mo ang **Settings → Developer → Webhooks** at nagtataka kung bakit may tatlong magkaparehong row na `Zapier — donation.created`.
- **Test data sa Zap setup** — kapag gumagawa ka ng Zap, hihilingin ng Zapier ng sample data para i-map ang mga field. Kukunin nito ang pinakabagong tumutugmang event mula sa B1 kung mayroon; kung wala, gagamitin nito ang synthetic na sample mula sa app definition.
- **Ang mga pagkabigo ng action ay lumalabas bilang mga error ng Zap** sa task history ng Zapier. Karaniwang dahilan: isang API key na walang tamang scope (hal. kailangan ng action na "Add Donation" ang `donations:write`). Muling gumawa ng key na may tamang scope at muling ikonekta sa Zapier.
- **Mga quota ng outbound API call** — bawat tawag sa B1 API mula sa isang action ay binibilang sa iyong quota ng task sa Zapier, hindi sa anumang bagay sa panig ng B1.

## Pag-troubleshoot

- **"Authentication failed"** kapag kumokonekta — mali, revoked, o kulang ng mga scope na kailangan ng Zap ang API key. Muling gawin ito sa B1Admin nang may kahit `settings:write` kasama ang anumang resource scope na ginagalaw ng Zap, pagkatapos ay i-update ang koneksyon.
- **Hindi kailanman pumuputok ang trigger** — kumpirmahin na talagang narehistro ang webhook: sa B1Admin, dapat magpakita ngayon ang **Settings → Developer → Webhooks** ng row na pinangalanang "Zapier — &lt;event&gt;". Kung wala ito, malamang kulang ang API key ng `settings:write` noong in-on mo ang Zap. Ayusin ang key, i-toggle ang Zap nang naka-off at pabalik sa on.
- **Pumuputok ang trigger nang dalawang beses** — paminsan-minsan ay muling naghahatid ang Zapier kung nawala ang acknowledgement nito. Gumamit ng hakbang na "Filter by Zapier" sa isang natatanging id (hal. `id` ng tao) kung kailangan mo ng mahigpit na deduplication.

## Tingnan Din

- [Make](./make) — parehong pattern, ibang platform
- [Slack & Discord](./slack-discord) — mas simpleng mga abiso sa chat nang walang Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
