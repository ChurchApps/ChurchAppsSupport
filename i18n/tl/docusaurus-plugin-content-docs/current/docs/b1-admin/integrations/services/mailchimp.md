---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Panatilihing synchronized ang isang Mailchimp audience sa B1 nang awtomatiko: ang mga tao ay dumadaloy sa pangalan, email, at telepono; ang membership ng grupo at listahan ay nagiging Mailchimp tags; ang mga tinanggal na tao ay naka-archive. Ang sync ay itinayo sa loob ng B1 -- walang third-party service, walang per-task metering, at ang mga pagbabago ay dumadating sa near-realtime sa halip na sa isang nightly schedule.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may audience na gusto mong pamahalaan ng B1
- Isang Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- Ang iyong **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Isang B1Admin user na may **Edit Settings** permission

</div>

## What Syncs

| B1 change | Mailchimp effect |
|---|---|
| Person added o updated | Subscriber added/updated (pangalan, apellido, telepono; ang mga bagong subscriber ay dumadating bilang `subscribed`) |
| Person deleted (o GDPR-erased) | Subscriber archived |
| Person joins a group | Tag na pinangalanan pagkatapos ng grupo na idinagdag |
| Person leaves a group | Ang tag na iyon ay aalis |
| Person enters a saved list | Tag na pinangalanan pagkatapos ng listahan na idinagdag |
| Person leaves a saved list | Ang tag na iyon ay aalis |

**Ang mga saved lists ay karaniwang ang mas mahusay na source ng tag.** Ang B1 [saved list](/docs/b1-admin/people/lists) ay isang rule-based audience na muling nag-evaulate sa sarili -- "lahat sa North campus," "mga miyembro na nag-opt in sa pastoral emails." Ituro ang iyong Mailchimp segments sa list tags at ang sync ay pinapanatili ang mga ito; gamitin ang group tags para sa ministry-team mailings.

Ang sync ay **one-way** (B1 → Mailchimp) at lamang ang tumatagos sa Mailchimp's standard fields, upang hindi ito maaaring magkasalungatan sa merge fields o segments na iyong pinamamahalaan sa loob ng Mailchimp.

## Setup

1. Sa B1Admin magpunta sa **Settings → Developer → Webhooks → Add Webhook**.
2. Itakda ang **Connector Type** sa **Mailchimp**.
3. I-paste ang iyong **Mailchimp API Key** at **Audience ID**. Ang key ay nai-store nang encrypted at hindi na ipinakita.
4. Ang mga kaugnay na kaganapan ay pre-selected; i-uncheck ang anuman na hindi mo gustong gawin (hal. iwanan ang person events ngunit laktawan ang group tags).
5. I-save. Ang B1 ay nag-verify sa key at audience laban sa Mailchimp bago tumanggap -- ang isang typo ay nababigo kaagad na may dahilan.

Gamitin ang **Send Test** anumang oras upang muling i-verify ang koneksyon. Bawat sync attempt ay na-log sa webhook's delivery history na may totoong tugon ng Mailchimp, at ang mga nababigong delivery ay automatic na umuulit na may backoff sa loob ng humigit-kumulang limang araw.

## Initial Import

Ang connector ay nag-sync ng *mga pagbabago* mula sa sandali na ito ay naka-on; hindi ito nag-backfill ng iyong umiiral na direktoryo. Para sa setup day:

1. Sa B1Admin magpunta sa **People**, maghanap ng mga taong nais mo (o patakbuhin ang isang saved list), at i-click ang **Export** upang mag-download ng isang CSV.
2. Sa Mailchimp gamitin ang **Audience → Import contacts** upang i-load ang CSV, na naglalapat ng anuman na mga tag sa panahon ng import.

Ang paggawa ng paunang load sa pamamagitan ng Mailchimp's importer ay pinapanatili ka sa kontrol ng consent question -- mag-import lamang ng mga taong aktwal na sumasang-ayon na makatanggap ng iyong mga email. Ang bulk-importing ng isang buong direktoryo bilang subscribed contacts ay maaaring lumabag sa mga katangian ng Mailchimp at anti-spam law (CAN-SPAM/GDPR).

## Limits & Notes

- **One-way sync.** Ang mga unsubscribes, bounces, at mga edits na ginawa sa Mailchimp ay hindi bumabalik sa B1. Ang isang taong nag-unsubscribe sa Mailchimp ay maaaring makatanggap pa rin ng email na ipinadala nang direkta mula sa B1 -- tratuhin ang Mailchimp bilang source ng katotohanan para sa bulk-mail consent.
- **Ang mga taong walang email address ay nilalabasan** (na-log na katulad dito sa delivery history) -- ang mga Mailchimp subscriber ay susi ng email.
- **Ang mga pagbabago ng email address ay lumilikha ng isang bagong subscriber.** Ang Mailchimp ay nag-identify sa mga tao ayon sa email, kaya ang pagbabago ng email ng isang tao sa B1 ay nagdadagdag sa kanila sa ilalim ng bagong address; ang lumang subscriber ay nananatili hanggang sa i-archive mo ito sa Mailchimp.
- **Ang lamang ang standard fields ay sync** -- pangalan, pangalawang pangalan, telepono. Ang membership status, campus, at custom B1 fields ay hindi nag-map sa Mailchimp merge fields sa version na ito; gamitin ang list tags upang mag-segment sa halip.
- **Ang mga pangalan ng tag ay ang pangalan ng grupo/listahan.** Ang pagbabago ng pangalan ng isang grupo o listahan ay nagsisimulang nag-tag sa ilalim ng bagong pangalan; ang lumang tag ay nananatili sa mga umiiral na subscriber hanggang sa alisin mo ito sa Mailchimp.
- **Ang mga contact limits ng Mailchimp ay patuloy na naaaplay** -- isang sync na nagtutulak ng isang free-tier audience lampas sa cap ay mag-log ng `Member limit reached` errors sa delivery history.

## Other Recipes (Zapier / Make)

Kahit ano pa - tagging givers sa `donation.created`, isang Mailchimp → B1 reverse direction, o pag-sync sa isang iba't ibang email platform sa buo (Constant Contact, Brevo, atbp.) -- ay patuloy na available sa pamamagitan ng [Zapier](../zapier) o [Make](../make), na nag-trigger sa parehong webhook events:

- **Tag givers:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Two-way:** Mailchimp *New Subscriber* → B1 *Create Person*

Kung naunang wired ka ang person/group sync sa pamamagitan ng Zapier, i-switch off ang mga Zaps na iyon pagkatapos mag-enable ng native connector -- ang pagtakbo ng pareho ay doble-proseso sa bawat kaganapan at nagsusumikap ng Zapier tasks para sa walang.

## Troubleshooting

- **Save fails na may "Mailchimp rejected ang API key"** -- ang key ay na-revoke o maling-tipo. Ang mga key ay dapat na magtapus sa isang data-center suffix tulad ng `-us21`.
- **Save fails na may "audience not found"** -- ang Audience ID ay hindi umiiral sa account na iyon. Kopyahin ito mula sa **Audience → Settings → Audience name at defaults** (hindi ito ang pangalan ng audience).
- **Ang isang tao ay hindi kailanman lumitaw sa Mailchimp** -- suriin ang delivery history ng webhook. "Skipped: person has no email address" ay nangangahulugang eksakto iyon; isang `4xx` mula sa Mailchimp ay nagpapakita ng dahilan sa tugon ng katawan.
- **Ang mga delivery ay tumitigil nang buo** -- pagkatapos ng mga paulit-ulit na nauubosang delivery ang webhook ay awtomatikong naka-disable. Ayusin ang sanhi (karaniwang isang revoked key), i-re-enable ito, at gamitin ang **Send Test** upang kumpirmahin.

## See Also

- [Webhooks (developer reference)](/docs/developer/api/webhooks) -- ang engine sa ilalim, event catalog, delivery/retry semantics
- [Saved Lists](/docs/b1-admin/people/lists) -- ang mga rule-based audience na natural na nag-map sa Mailchimp tags
- [Zapier (overview)](../zapier) -- para sa mga recipes lampas sa audience sync
