---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Ang opisyal na B1.church app sa Zapier ay nagbibigay-daan sa isang Zap na tumugon sa mga kaganapan sa iyong simbahan (bagong tao, bagong donasyon, bagong miyembro ng grupo, …) at magsulat ng mga record pabalik sa B1. Walang coding, walang infrastructure — idikit mo lang ito sa Zapier's drag-and-drop editor, idikit ang API key, at i-on ang Zap.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Zapier](https://zapier.com) account (ang free tier ay sapat para sa ilang Zaps)
- Isang church admin na may **Edit Settings** permission sa B1Admin (gagawa ka ng API key)
- Isang ideya kung ano ang gusto mong gawin — halimbawa "kapag ang isang tao ay idinagdag sa B1, idagdag sila sa aking Mailchimp list"

</div>

## Triggers at Actions

| Tipo | Ano | B1 event / endpoint |
|---|---|---|
| **Trigger** | Bagong Tao | `person.created` |
| **Trigger** | Na-update na Tao | `person.updated` |
| **Trigger** | Bagong Donasyon | `donation.created` |
| **Trigger** | Bagong Miyembro ng Grupo | `group.member.added` |
| **Trigger** | Bagong Form Submission | `form.submission.created` |
| **Action** | Lumikha ng Tao | nagdadagdag ng bagong tao |
| **Action** | Magdagdag ng Donasyon | nagpaparehistro ng donasyon |
| **Action** | Magdagdag ng Miyembro sa Grupo | nagdadagdag ng tao sa isang grupo |
| **Search** | Maghanap ng Tao | naghahanap ng tao ayon sa pangalan o email |

Pagsama-samahin ang mga ito nang libre gamit ang alinman sa mahigit 7,000 na suportadong app ng Zapier.

## Setup

### 1. Lumikha ng B1 API key

1. Sa B1Admin pumunta sa **Settings → Developer → API Keys**.
2. Mag-click sa **New API Key**, bigyan ito ng pangalan tulad ng "Zapier", at piliin ang mga scope na kailangan ng Zap.
3. **Mahalaga:** Ang mga Zapier triggers ay nagsasabing maghanda ng webhook sa iyong pangalan kapag nagsimula ang Zap, na nangangailangan ng **`settings:write`** scope. Palaging isama ang `settings:write` kung gumagamit ang alinman sa iyong Zaps ng B1 trigger.
4. Magbigay din ng mga scope na kailangan ng mga action — halimbawa ang "Add Donation" action ay kailangan ng `donations:write`, "Create Person" ay kailangan ng `people:write`.
5. I-save. Ang buong `cak_…` key ay ipinapakita **isang beses lang** — kopyahin ito.

### 2. Ikonekta ang Zapier sa B1

1. Sa Zapier, bumuo ng bagong Zap.
2. Kapag pumili ka ng B1 trigger o action sa unang pagkakataon, itinatanong ng Zapier na mag-**Sign in to B1.church**.
3. I-paste ang API key mula sa hakbang 1 at mag-click sa **Yes, Continue**. Ini-validate ng Zapier ito laban sa iyong simbahan.

Ang koneksyon ay naka-save sa Zapier at ginagamit ulit ng bawat Zap sa iyong account.

### 3. Bumuo ng Zap

Pumili ng trigger, pagkatapos magdagdag ng isa o higit pang action steps. Tingnan ang mga halimbawa sa ibaba.

## Mga Karaniwang Resipe

### Magdagdag ng mga bagong B1 na tao sa Mailchimp

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. I-map ang B1's `name__first`, `name__last`, `contactInfo__email` sa Mailchimp's First Name / Last Name / Email fields.

### Magsabing mga donasyon sa isang Slack channel na may mas mayamang card kaysa sa built-in connector

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. Bumuo ng anumang layout — buttons, attachments, atbp. — na hindi kayang gawin ang built-in [Slack connector](./slack-discord).

### Magdagdag ng mga bagong miyembro ng grupo sa isang Google Group

- **Trigger** — B1: New Group Member (na-filter sa isang partikular na `groupId`)
- **Action** — Filter by Zapier: magpatuloy lang kung ang B1 group ay ang isa na iyong pinag-iingatan
- **Action** — B1: Find Person (gamitin ang trigger's `personId` upang makuha ang email)
- **Action** — Google Groups: Add Member

### Ipadala ang mga form submissions sa isang project tracker

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: Create page / issue / task

## Paano Gumagana ang mga Triggers sa Likuran

Ang mga trigger ay **REST hooks**, hindi polling — hindi ang Zapier na nagsasabing ping sa B1 bawat 15 minuto. Kapag sinimula mo ang Zap, hinihiling ng Zapier sa B1 na magsabing magparehistro ng webhook na tumuturo sa isang pribadong URL ng Zapier; kapag aktibo ang kaganapan, ang B1 ay nag-POST ng envelope sa Zapier at tumatakbo ang iyong Zap **sa loob ng ilang segundo**. I-off ang Zap at hinihiling ng Zapier sa B1 na burahin ang webhook — walang orphan subscriptions.

Ito ay nangangahulugang ang trigger ay sumasabog lamang para sa mga kaganapan na nangyari **pagkatapos** na nagsimula ang Zap. Walang backfill — ang pagbubukas ng Zap ay hindi uulit ang mga donasyon ng kahapon.

## Mga Limitasyon at Mga Tala

- **Maraming Zaps na may parehong trigger** na bawat isa ay nagsasayang ng sarili nilang B1 webhook — walang conflict, ngunit ito ay nagkakahalaga ng pag-alam kung sinisuri mo ang **Settings → Developer → Webhooks** at nagtaka kung bakit may tatlong magkaparehong `Zapier — donation.created` rows.
- **Data na sinubukan sa Zap setup** — kapag binubuo mo ang isang Zap, hinihiling ng Zapier ang sample data upang i-map ang mga field. Aari nitong makuha ang pinaka-kamakailan na tugmang kaganapan mula sa B1 kung mayroon; kung wala, gumagamit ito ng synthetic sample mula sa app definition.
- **Ang mga kabiguan ng aksyon ay nakikita bilang mga Zap errors** sa task history ng Zapier. Karaniwang dahilan: isang API key na walang tamang scope (halimbawa ang "Add Donation" action ay kailangan ng `donations:write`). Likhain nang muli ang key gamit ang tamang mga scope at muling ikonekta sa Zapier.
- **Outbound API call quotas** — bawat B1 API call mula sa isang aksyon ay binibilang sa iyong Zapier task quota, hindi sa anuman sa B1 side.

## Paglutas ng mga Problema

- **"Authentication failed"** kapag nag-uugnay — ang API key ay maling, na-revoke, o kulang ang mga scope na kailangan ng Zap. Likhain nang muli ito sa B1Admin gamit ang hindi bababa sa `settings:write` plus anuman ang resource scopes na hinahawakan ng Zap, pagkatapos ay i-update ang koneksyon.
- **Trigger ay hindi kailanman sumasabog** — kumpirmahin ang webhook ay tunay na nakarehistro: sa B1Admin, **Settings → Developer → Webhooks** ay dapat ipakita ang isang row na pinangalanang "Zapier — &lt;event&gt;". Kung nandoon ito, ang API key ay malamang na kulang ang `settings:write` kapag binuksan mo ang Zap. Ayusin ang key, i-toggle ang Zap off at pabalik on.
- **Trigger ay sumasabog ng dalawang beses** — Ang Zapier ay paminsan-minsan nag-redeliver kung ang acknowledgement nito ay nawala. Gumamit ng "Filter by Zapier" step sa isang natatanging id (halimbawa ang `id` ng tao) kung kailangan mo ang mahigpit na deduplication.

## Tingnan Din

- [Make](./make) — parehong pattern, magkakaibang platform
- [Slack & Discord](./slack-discord) — mas simpleng chat notifications nang walang Zapier
- [Webhooks (developer reference)](/docs/developer/api/webhooks)
