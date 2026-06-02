---
title: "Connected Services"
---

# Connected Services

<div class="article-intro">

Ang pinakamabilis na paraan upang ikonekta ang B1 sa ibang church-tech tool ay karaniwang isang Zapier o Make recipe — hindi mo kailangan ng bagong B1 infrastructure, at ang third party ay nag-host ng workflow. Ang pahina na ito ay isang curated list ng mga serbisyo na aming na-confirm ay wireable ngayon, na may isang maikling, copy-paste setup guide para sa bawat isa.

</div>

## Sa Isang Sulyap

| Service | Category | Bridge | Ano ang maaari mong i-wire |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier or Make | Sync new B1 people / givers sa isang Mailchimp audience |
| [Donorbox](./donorbox) | Donations | Zapier | Push Donorbox donations at donors pabalik sa B1 |
| [Subsplash](./subsplash) | App / Donations | Zapier | Pull Subsplash giving at people sa B1 |
| [VOMO](./vomo) | Volunteering | Zapier | Sync volunteer signups sa pagitan ng B1 groups at VOMO projects |
| [Clearstream](./clearstream) | SMS | Zapier | Mag-trigger ng Clearstream text mula sa B1 events; i-ingest ang replies bilang B1 records |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | Mag-trigger ng Text In Church workflows mula sa B1; tumanggap ng Connect Card data |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier or Make | Magpadala ng SMS mula sa kahit na anong B1 event |
| [Checkr](./checkr) | Background checks | Make | Simulan ang isang background check kapag ang isang tao ay sumali sa isang serving team |

## Ano ang Mayroon Ang Lahat ng Ito sa Karaniwang

1. **Ang B1 side ng wiring ay pareho** — lumikha ng isang API key na may tamang scopes sa **B1Admin → Settings → Developer → API Keys**, pagkatapos hayaang ang bridge ay mag-register ng webhook para sa trigger (Zapier / Make ay awtomatikong ginagawa ito, nangangailangan ng `settings:write`) o tawarang ang B1's REST endpoints mula sa isang downstream action.
2. **Ang bridge ay nag-bill sa iyo, hindi sa amin.** Ang ChurchApps ay libre; Zapier at Make ay parehong may free tiers na sumasaklaw sa ilang recipes.
3. **Maaari mong subukan ang wiring nang hindi nag-go live.** Ang parehong mga bridge ay may "Test step" button na nag-fire ng trigger minsan laban sa B1 at nagpapakita sa iyo ng data shape bago ka mag-on ng recipe.

## Pagpili ng Bridge

- **Zapier** ay mas friendly at may mas malaking app catalogue — gamitin ito bilang iyong default maliban kung ang halaga ay isang isyu.
- **Make** ay mas mura sa scale at may mas flexible routing/filter logic — gamitin ito kapag ang isang solong workflow ay may fan-out, conditionals, o maraming mga hakbang.
- **Webhooks by Zapier** (ginagamit para sa Mobile Message doc) ay isang generic adapter na nagbibigay-daan sa iyo na mag-POST sa kahit na anong HTTP endpoint mula sa isang Zap kapag ang destinasyon ay hindi isang first-class Zapier app.

Kung gusto mo ng isang bagay na hindi nasa listahang ito, ang B1's [REST API](/docs/developer/api) at [webhooks](/docs/developer/api/webhooks) ay bukas — maaari kang bumuo ng isang one-off bridge gamit ang [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sa ilang oras.

## Ano ang Hindi Nandito (at Bakit)

Maraming popular na church-tech tools — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — ay walang published na Zapier app o Make module ngayon. Mayroon silang sariling APIs ngunit ang pag-wire sa kanila sa B1 ay isang custom-code job, hindi isang recipe, kaya hindi sila akma sa listahang ito. Kung ang isang vendor ay magdagdag ng Zapier app o Make module, magdadagdag kami ng doc.

Kami ay naglaan din ng purposely skipped Planning Center-Services-specific tools (music, presentation), competing ChMS products, migration consultants, at tools na tanging nag-clean up ng PCO-specific data — wala sa kanila ay may isang useful wiring path sa B1.

## Makita Din

- [Zapier (overview)](../zapier) — ang B1 side ng bawat Zapier recipe ay pareho; ang doc na ito ay sinasaklaw ito minsan
- [Make (overview)](../make) — pareho para sa Make scenarios
- [Slack & Discord](../slack-discord) — chat notifications nang walang kahit na anong bridge
- [Google Sheets](../google-sheets) — on-demand exports
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang event catalog na umaasa ang bawat recipe
