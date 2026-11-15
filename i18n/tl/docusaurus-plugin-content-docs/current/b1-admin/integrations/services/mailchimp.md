---
title: "Mailchimp"
description: "I-sync ang mga tao sa B1 Admin at ang membership sa grupo o naka-save na listahan sa isang Mailchimp audience bilang mga tag, kasama ang setup, paunang import, at mga hakbang sa troubleshooting."
---

# Mailchimp

<div class="article-intro">

Panatilihing naka-sync ang isang Mailchimp audience sa B1 nang awtomatiko: dumadaloy papasok ang mga tao kasama ang kanilang pangalan, email, at telepono; nagiging mga tag ng Mailchimp ang membership sa grupo at listahan; at naa-archive ang mga binurang tao. Built-in sa B1 ang sync — walang third-party na serbisyo, walang metering kada gawain, at halos real-time ang pagdating ng mga pagbabago sa halip na sa nightly schedule.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may audience na gusto mong pamahalaan ng B1
- Isang Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- Ang iyong **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Isang B1Admin user na may pahintulot na **Edit Settings**

</div>

## Ano ang Nagsi-sync {#what-syncs}

| Pagbabago sa B1 | Epekto sa Mailchimp |
|---|---|
| Tao na idinagdag o na-update | Subscriber na idinagdag/na-update (first name, last name, telepono; ang mga bagong subscriber ay dumarating bilang `subscribed`) |
| Tao na binura (o binura alinsunod sa GDPR) | Subscriber na na-archive |
| Tao na sumali sa grupo | Idinagdag ang tag na ipinangalan sa grupo |
| Tao na umalis sa grupo | Inalis ang tag na iyon |
| Tao na pumasok sa naka-save na listahan | Idinagdag ang tag na ipinangalan sa listahan |
| Tao na umalis sa naka-save na listahan | Inalis ang tag na iyon |

**Kadalasang mas mabuting pinagmumulan ng tag ang mga naka-save na listahan.** Ang [saved list](/docs/b1-admin/people/lists) ng B1 ay audience na nakabatay sa patakaran at kusang nagre-evaluate ng sarili — "lahat sa North campus," "mga miyembrong nag-opt in sa pastoral na email." Ituro ang iyong mga segment ng Mailchimp sa mga tag ng listahan at pananatilihin ito ng sync; gamitin ang mga tag ng grupo para sa mga mailing ng ministry team.

Ang sync ay **isang direksyon** (B1 → Mailchimp) at tanging mga karaniwang field ng Mailchimp ang ginagalaw nito, kaya hindi ito makakasalungat sa mga merge field o segment na pinamamahalaan mo sa loob ng Mailchimp.

## Setup {#setup}

1. Sa B1Admin, pumunta sa **Settings → Developer → Webhooks → New Webhook**.
2. Itakda ang **Connector Type** sa **Mailchimp**.
3. I-paste ang iyong **Mailchimp API Key** at **Audience ID**. Naka-encrypt na iniimbak ang key at hindi na ipapakita muli.
4. Naka-piling na ang mga kaugnay na event; alisan ng check ang anumang ayaw mo (hal. panatilihing naka-on ang mga event ng tao pero laktawan ang mga tag ng grupo).
5. I-save. Bine-verify ng B1 ang key at audience laban sa Mailchimp bago tanggapin — agad na papalya ang typo na may kasamang dahilan.

Buksan muli ang webhook at i-click ang **Send Test Event** anumang oras para muling i-verify ang koneksyon (para sa Mailchimp, tinitingnan nito ang key at audience mo sa halip na magpadala ng sample na subscriber). Bawat pagtatangkang mag-sync ay naitatala sa delivery history ng webhook kasama ang aktwal na tugon ng Mailchimp, at awtomatikong sumusubok muli ang mga pumalyang delivery nang may backoff nang humigit-kumulang limang araw.

## Paunang Import {#initial-import}

Nagsi-sync ang connector ng *mga pagbabago* mula sa sandaling i-on ito; hindi nito pinupunan ang nakaraang directory mo. Para sa araw ng setup:

1. Sa B1Admin, pumunta sa **People**, maghanap ng mga taong gusto mo (o magpatakbo ng naka-save na listahan), at i-click ang **Export** para mag-download ng CSV.
2. Sa Mailchimp, gamitin ang **Audience → Import contacts** para i-load ang CSV, at maglapat ng anumang tag habang nag-i-import.

Ang paunang load sa pamamagitan ng importer ng Mailchimp ay nagpapanatili sa iyo ng kontrol sa tanong ng pahintulot — mag-import lang ng mga taong talagang sumang-ayong tumanggap ng iyong email. Ang maramihang pag-import ng buong directory bilang mga subscribed na contact ay maaaring lumabag sa mga tuntunin ng Mailchimp at batas laban sa spam (CAN-SPAM/GDPR).

## Mga Limitasyon at Paalala {#limits--notes}

- **Isang direksyong sync.** Ang mga unsubscribe, bounce, at pag-edit na ginawa sa Mailchimp ay hindi bumabalik sa B1. Ang taong nag-unsubscribe sa Mailchimp ay maaari pa ring makatanggap ng email na direktang ipinadala mula sa B1 — ituring ang Mailchimp bilang pinagmumulan ng katotohanan para sa pahintulot sa bulk mail.
- **Nilalaktawan ang mga taong walang email address** (naitatala ito bilang ganoon sa delivery history) — ang mga subscriber ng Mailchimp ay naka-key ayon sa email.
- **Ang pagbabago ng email address ay lumilikha ng bagong subscriber.** Kinikilala ng Mailchimp ang mga tao ayon sa email, kaya ang pagbabago ng email ng isang tao sa B1 ay idaragdag siya sa ilalim ng bagong address; mananatili ang lumang subscriber hanggang i-archive mo ito sa Mailchimp.
- **Tanging mga karaniwang field ang nagsi-sync** — first name, last name, telepono. Hindi nama-map sa mga merge field ng Mailchimp ang membership status, campus, at mga custom na field ng B1 sa bersyong ito; gamitin ang mga tag ng listahan para sa segmentation.
- **Ang mga pangalan ng tag ay ang mga pangalan ng grupo/listahan.** Ang pagpapalit ng pangalan ng grupo o listahan ay magsisimulang mag-tag sa ilalim ng bagong pangalan; mananatili ang lumang tag sa mga umiiral na subscriber hanggang alisin ito sa Mailchimp.
- **Nalalapat pa rin ang mga limitasyon ng contact ng Mailchimp** — ang sync na nagtutulak sa isang free-tier audience na lampas sa limitasyon nito ay magtatala ng mga error na `Member limit reached` sa delivery history.

## Iba Pang Recipe (Zapier / Make) {#other-recipes-zapier--make}

Anumang lampas sa audience sync — pag-tag sa mga nagbibigay sa `donation.created`, ang reverse direction na Mailchimp → B1, o pag-sync sa ibang email platform nang buo (Constant Contact, Brevo, atbp.) — available pa rin sa pamamagitan ng [Zapier](../zapier.md) o [Make](../make.md), na nagti-trigger sa parehong webhook event:

- **Mag-tag ng mga nagbibigay:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Dalawang direksyon:** Mailchimp *New Subscriber* → B1 *Create Person*

Kung dati mong ikinabit ang sync ng tao/grupo sa pamamagitan ng Zapier, i-off ang mga Zap na iyon pagkatapos i-enable ang native connector — ang pagpapatakbo ng pareho ay dobleng nagpoproseso ng bawat event at nagsusunog ng mga task ng Zapier nang walang kabuluhan.

## Troubleshooting {#troubleshooting}

- **Pumapalya ang save na may "Mailchimp rejected the API key"** — nabawi o na-typo ang key. Dapat magtapos ang mga key sa suffix ng data center gaya ng `-us21`.
- **Pumapalya ang save na may "audience not found"** — hindi umiiral ang Audience ID sa ilalim ng account na iyon. Kopyahin ito mula sa **Audience → Settings → Audience name and defaults** (hindi ito ang pangalan ng audience).
- **Hindi kailanman lumitaw ang isang tao sa Mailchimp** — tingnan ang delivery history ng webhook. Ang "Skipped: person has no email address" ay eksaktong ibig sabihin noon; ang `4xx` mula sa Mailchimp ay magpapakita ng dahilan sa response body.
- **Huminto nang tuluyan ang mga delivery** — pagkatapos ng paulit-ulit na nauubos na delivery, awtomatikong nao-off ang webhook. Ayusin ang sanhi (kadalasan ay nabawing key), i-enable itong muli, at gamitin ang **Send Test Event** para kumpirmahin.

## Tingnan Din {#see-also}

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang makina sa ilalim, catalog ng event, at semantika ng delivery/retry
- [Saved Lists](/docs/b1-admin/people/lists) — mga audience na nakabatay sa patakaran na natural na tumutugma sa mga tag ng Mailchimp
- [Zapier (pangkalahatang-tanaw)](../zapier.md) — para sa mga recipe na lampas sa audience sync
