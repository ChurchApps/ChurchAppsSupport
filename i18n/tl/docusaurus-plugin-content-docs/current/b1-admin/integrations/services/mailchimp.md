---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Panatilihing naka-sync ang Mailchimp audience sa B1 awtomatiko: ang mga tao ay dumadaloy gamit ang kanilang pangalan, email, at telepono; ang pagiging miyembro ng grupo at listahan ay nagiging Mailchimp tags; ang mga inalis na tao ay naka-archive. Ang sync ay built into B1 — walang third-party service, walang per-task metering, at ang mga pagbabago ay dumadaloy sa near-realtime sa halip na sa isang nightling schedule.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may audience na gusto mong i-manage ng B1
- Isang Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- Ang iyong **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Kung Ano Ang Nag-sync

| B1 change | Mailchimp effect |
|---|---|
| Tao na idinagdag o na-update | Subscriber na idinagdag/na-update (unang pangalan, pangalawang pangalan, telepono; ang mga bagong subscriber ay dumadaloy bilang `subscribed`) |
| Tao na inalis (o GDPR-erased) | Subscriber na naka-archive |
| Tao na sumali sa isang grupo | Tag na pinangalan pagkatapos ng grupo na idinagdag |
| Tao na umalis sa isang grupo | Tagging na iyon ay inalis |
| Tao na pumasok sa isang salvadong listahan | Tag na pinangalan pagkatapos ng listahan na idinagdag |
| Tao na umalis sa isang salvadong listahan | Tagging na iyon ay inalis |

**Ang mga salvadong listahan ay kadalasan ang mas mahusay na tag source.** Isang B1 [salvadong listahan](/docs/b1-admin/people/lists) ay isang rule-based na audience na muling sinusuri ang sarili nito — "lahat sa North campus," "mga miyembro na nag-opt into pastoral emails." Ituro ang iyong Mailchimp segments sa tag ng listahan at ang sync ay pinapanatili ang mga ito; gamitin ang mga tag ng grupo para sa ministry-team na mga pagpadala.

Ang sync ay **one-way** (B1 → Mailchimp) at tumatagos lamang sa mga standard field ng Mailchimp, kaya ito ay hindi maaaring makipag-conflict sa merge fields o segment na ginagamit mo sa loob ng Mailchimp.

## Setup

1. Sa B1Admin pumunta sa **Settings → Developer → Webhooks → Add Webhook**.
2. Itakda ang **Connector Type** sa **Mailchimp**.
3. I-paste ang iyong **Mailchimp API Key** at **Audience ID**. Ang susi ay naka-store encrypted at hindi na ipapakita.
4. Ang mga relevant event ay pre-selected; uncheck ang kahit alin na hindi mo gusto (hal. iwanan ang person event ngunit i-skip ang group tags).
5. I-save. Ang B1 ay nag-verify ng susi at audience laban sa Mailchimp bago tumanggap — isang typo ay nabigong kaagad na may dahilan.

Gamitin ang **Send Test** anumang oras upang muling i-verify ang koneksyon. Bawat sync attempt ay naitala sa delivery history ng webhook na may aktwal na tugon ng Mailchimp, at ang mga failed deliveries ay awtomatikong retry gamit ang backoff sa humigit-kumulang limang araw.

## Initial Import

Ang connector ay nag-sync ng *pagbabago* mula sa sandaling ito ay on; ito ay hindi backfill ang iyong umiiral na direktoryo. Para sa setup day:

1. Sa B1Admin pumunta sa **People**, maghanap ng mga tao na gusto mo (o tumakbo ng salvadong listahan), at i-click ang **Export** upang i-download ang CSV.
2. Sa Mailchimp gamitin ang **Audience → Import contacts** upang i-load ang CSV, naglalapat ng anumang tags sa panahon ng import.

Ang paggawa ng paunang load sa pamamagitan ng importer ng Mailchimp ay nagpapanatili sa iyo sa kontrol ng tanong ng consent — i-import lamang ang mga tao na tunay na sumasang-ayon na makatanggap ng iyong mga email. Ang bulk-importing ng buong direktoryo bilang subscribed contacts ay maaaring lumabag sa mga tuntunin ng Mailchimp at anti-spam law (CAN-SPAM/GDPR).

## Mga Limitasyon & Mga Tala

- **One-way sync.** Ang mga unsubscribe, bounce, at edit na ginawa sa Mailchimp ay hindi bumalik sa B1. Ang isang taong nag-unsubscribe sa Mailchimp ay maaaring makatanggap ng email na ipinadala direkta mula sa B1 — tratuhin ang Mailchimp bilang ang source of truth para sa bulk-mail consent.
- **Ang mga taong walang email address ay na-skip** (naitala bilang isang ganoong bagay sa delivery history) — ang mga subscriber ng Mailchimp ay may susi ayon sa email.
- **Ang mga pagbabago ng email address ay lumilikha ng isang bagong subscriber.** Ang Mailchimp ay nag-identify ng mga tao ayon sa email, kaya ang pagbabago ng email ng isang tao sa B1 ay nagdadagdag sa kanila sa ilalim ng bagong address; ang lumang subscriber ay manatili hanggang sa i-archive mo ito sa Mailchimp.
- **Lamang ang standard fields ang nag-sync** — unang pangalan, pangalawang pangalan, telepono. Ang pagiging miyembro ng kalagayan, campus, at custom na mga field ng B1 ay hindi nag-map sa Mailchimp merge fields sa bersyong ito; gamitin ang list tags upang i-segment sa halip.
- **Ang mga pangalan ng tag ay ang mga pangalan ng grupo/listahan.** Ang pag-rename ng isang grupo o listahan ay nagsisimula ng pag-tag sa ilalim ng bagong pangalan; ang lumang tag ay nananatili sa mga umiiral na subscriber hanggang sa alisin ito sa Mailchimp.
- **Ang mga limitasyon sa contact ng Mailchimp ay patuloy na nalalapat** — isang sync na nagtutulak ng free-tier audience lampas sa cap ay mag-log ng `Member limit reached` errors sa delivery history.

## Iba Pang Mga Recipes (Zapier / Make)

Kahit anong higit pa sa audience sync — tagging ng givers sa `donation.created`, isang Mailchimp → B1 reverse direction, o pag-sync sa isang iba't ibang email platform (Constant Contact, Brevo, atbp.) — ay patuloy na available sa pamamagitan ng [Zapier](../zapier) o [Make](../make), na nag-trigger sa parehong webhook events:

- **Tag givers:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Two-way:** Mailchimp *New Subscriber* → B1 *Create Person*

Kung nag-wire ka nang person/group sync sa pamamagitan ng Zapier, i-switch off ang mga Zaps pagkatapos i-enable ang native connector — ang pagsasagawa ng parehong dalawang proseso sa bawat event at nagsusuma ng Zapier tasks para sa walang.

## Troubleshooting

- **Ang save ay nabigong may "Mailchimp rejected ang API key"** — ang susi ay na-revoke o maling-type. Ang mga key ay dapat magtapos sa isang data-center suffix tulad ng `-us21`.
- **Ang save ay nabigong may "audience not found"** — ang Audience ID ay hindi umiiral sa ilalim ng account na iyon. Kopyahin ito mula sa **Audience → Settings → Audience name and defaults** (ito ay hindi ang pangalan ng audience).
- **Ang isang tao ay hindi kailanman lumabas sa Mailchimp** — suriin ang delivery history ng webhook. "Skipped: person has no email address" ay nangangahulugang eksakto iyon; isang `4xx` mula sa Mailchimp ay nagpapakita ng dahilan sa response body.
- **Ang mga delivery ay tumigil nang lubusan** — pagkatapos ng paulit-ulit na nauubos na delivery ang webhook ay auto-disables. Ayusin ang dahilan (karaniwang isang revoked key), muling i-enable ito, at gamitin ang **Send Test** upang kumpirmahin.

## Tingnan Din

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang engine sa ilalim, event catalog, delivery/retry semantics
- [Saved Lists](/docs/b1-admin/people/lists) — rule-based na audience na natural na nag-map sa Mailchimp tags
- [Zapier (overview)](../zapier) — para sa mga recipe na higit pa ang audience sync
