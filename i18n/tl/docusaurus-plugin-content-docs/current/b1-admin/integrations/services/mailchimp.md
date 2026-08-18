---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Panatilihing naka-sync ang isang Mailchimp audience sa B1 awtomatiko: ang mga tao ay dumarating kasama ang kanilang pangalan, email, at telepono; ang pagsali ng grupo at listahan ay nagiging Mailchimp tags; ang mga nabagong tao ay naka-archive. Ang sync ay binuo sa loob ng B1 — walang third-party na serbisyo, walang per-task na metering, at ang mga pagbabago ay dumarating sa malapit na real-time sa halip na sa isang nightly schedule.

</div>

<div class="prereqs">
<h4>Bago Kang Magsimula</h4>

- Isang [Mailchimp](https://mailchimp.com) account na may audience na gusto mong pamahalaan ng B1
- Isang Mailchimp **API key** (Mailchimp: profile icon → **Account & billing → Extras → API keys**)
- Ang iyong **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Isang B1Admin user na may **Edit Settings** permission

</div>

## Ano ang Naka-Sync

| B1 change | Mailchimp effect |
|---|---|
| Person added or updated | Subscriber added/updated (first name, last name, phone; new subscribers arrive as `subscribed`) |
| Person deleted (or GDPR-erased) | Subscriber archived |
| Person joins a group | Tag named after the group added |
| Person leaves a group | That tag removed |
| Person enters a saved list | Tag named after the list added |
| Person leaves a saved list | That tag removed |

**Ang mga saved list ay karaniwang mas mahusay na fonte ng tag.** Ang isang B1 [saved list](/docs/b1-admin/people/lists) ay isang rule-based na audience na muling nag-evaluate sa sarili — "lahat sa North campus," "mga miyembro na nag-opt in sa pastoral emails." Ituro ang iyong Mailchimp segments sa list tags at ang sync ay nagpapanatili sa kanila; gamitin ang group tags para sa ministry-team mailings.

Ang sync ay **one-way** (B1 → Mailchimp) at tumatagos lamang sa Mailchimp's standard fields, kaya hindi ito maaaring magkasalungat sa merge fields o segments na iyong pinamamahalaan sa loob ng Mailchimp.

## Setup

1. Sa B1Admin pumunta sa **Settings → Developer → Webhooks → Add Webhook**.
2. Itakda ang **Connector Type** sa **Mailchimp**.
3. I-paste ang iyong **Mailchimp API Key** at **Audience ID**. Ang key ay naka-store na encrypted at hindi na ipapakita ulit.
4. Ang mga kaugnay na event ay pre-selected; i-uncheck ang sinuman na hindi mo gusto (halimbawa: hayaan ang person events ngunit laktawan ang group tags).
5. I-save. Ang B1 ay nag-verify ng key at audience laban sa Mailchimp bago tanggapin — ang isang typo ay nabibigong agad na may dahilan.

Gamitin ang **Send Test** anumang oras upang muling i-verify ang koneksyon. Bawat sync attempt ay naka-log sa webhook's delivery history kasama ang actual response ng Mailchimp, at ang mga nabigong delivery ay awtomatikong sumusubok muli na may backoff sa loob ng humigit-kumulang na limang araw.

## Initial Import

Ang connector ay nag-sync ng *changes* mula sa sandaling ito ay naka-on; hindi ito backfill ang iyong umiiral na directory. Para sa setup day:

1. Sa B1Admin pumunta sa **People**, maghanap ng mga taong gusto mo (o tumakbo ng isang saved list), at i-click ang **Export** upang mag-download ng CSV.
2. Sa Mailchimp gamitin ang **Audience → Import contacts** upang i-load ang CSV, na nag-apply ng anumang tags sa panahon ng import.

Ang paggawa ng initial load sa pamamagitan ng Mailchimp's importer ay nananatili sa iyo na may kontrol sa consent question — i-import lamang ang mga taong tunay na nag-setuju na makatanggap ng iyong mga email. Ang bulk-importing ng buong directory bilang subscribed contacts ay maaaring lumabas sa Mailchimp's terms at anti-spam law (CAN-SPAM/GDPR).

## Limits & Notes

- **One-way sync.** Ang mga unsubscribe, bounces, at edits na ginawa sa Mailchimp ay hindi bumabalik sa B1. Ang sinuman na nag-unsubscribe sa Mailchimp ay maaaring makatanggap ng email na ipinadala direkta mula sa B1 — tratuhin ang Mailchimp bilang source of truth para sa bulk-mail consent.
- **Ang mga taong walang email address ay naka-skip** (naka-log bilang ganitong sa delivery history) — ang mga Mailchimp subscribers ay susi ng email.
- **Ang mga pagbabago ng email address ay lumilikha ng isang bagong subscriber.** Ang Mailchimp ay nag-identify ng mga tao sa pamamagitan ng email, kaya ang pagbabago ng kanilang email sa B1 ay nagdadagdag sa kanila sa ilalim ng bagong address; ang lumang subscriber ay nananatili hanggang sa i-archive mo ito sa Mailchimp.
- **Tanging standard fields lamang ang nag-sync** — first name, last name, phone. Ang status ng membership, campus, at custom B1 fields ay hindi nag-map sa Mailchimp merge fields sa bersyong ito; gamitin ang list tags upang mag-segment sa halip.
- **Ang mga pangalan ng tag ay ang mga pangalan ng grupo/listahan.** Ang pagbabago ng pangalan ng isang grupo o listahan ay nagsisimulang nag-tag sa ilalim ng bagong pangalan; ang lumang tag ay nananatili sa mga kasalukuyang subscribers hanggang sa alisin mo ito sa Mailchimp.
- **Ang mga Mailchimp na limitasyon ng contact ay nananatili** — isang sync na nagtutulak ng isang free-tier audience lampas sa takda ay nag-log ng `Member limit reached` errors sa delivery history.

## Iba Pang Mga Recipe (Zapier / Make)

Anumang higit sa audience sync — pag-tag ng mga nagbibigay sa `donation.created`, isang Mailchimp → B1 reverse direction, o pag-sync sa isang iba't ibang email platform (Constant Contact, Brevo, atbp.) — ay available pa rin sa pamamagitan ng [Zapier](../zapier) o [Make](../make), na trigger sa parehong webhook events:

- **Tag givers:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Two-way:** Mailchimp *New Subscriber* → B1 *Create Person*

Kung dating mo na-wire ang person/group sync sa pamamagitan ng Zapier, i-switch off ang mga Zap na ito pagkatapos mag-enable ng native connector — ang pagtakbo ng pareho ay nag-double-process sa bawat event at nakasusunog ng Zapier tasks para sa walang.

## Troubleshooting

- **Ang pag-save ay nabibigong may "Mailchimp rejected the API key"** — ang key ay na-revoke o maling-type. Ang mga key ay dapat nagtatapos sa isang data-center suffix tulad ng `-us21`.
- **Ang pag-save ay nabibigong may "audience not found"** — ang Audience ID ay hindi umiiral sa ilalim ng account na iyon. Kopyahin ito mula sa **Audience → Settings → Audience name and defaults** (ito ay hindi ang pangalan ng audience).
- **Ang isang tao ay hindi kailanman lumitaw sa Mailchimp** — suriin ang webhook's delivery history. "Skipped: person has no email address" ay nangangahulugang eksakto iyon; ang `4xx` mula sa Mailchimp ay nagpapakita ng dahilan sa response body.
- **Ang mga delivery ay tumitigil na lubos** — pagkatapos ng paulit-ulit na nauubos na deliveries ang webhook ay awtomatikong nag-disable. I-ayos ang sanhi (karaniwang isang na-revoke na key), i-enable muli ito, at gamitin ang **Send Test** upang kumpirmahin.

## See Also

- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang engine sa ilalim, event catalog, delivery/retry semantics
- [Saved Lists](/docs/b1-admin/people/lists) — rule-based audiences na natural na nag-map sa Mailchimp tags
- [Zapier (overview)](../zapier) — para sa mga recipe na higit pa sa audience sync
