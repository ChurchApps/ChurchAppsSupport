---
title: "Mga Konektadong Serbisyo"
description: "Ikonekta ang B1 Admin sa Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, at iba pang tool gamit ang mga recipe ng Zapier o Make, kasama ang gabay sa setup para sa bawat isa."
---

# Mga Konektadong Serbisyo

<div class="article-intro">

Kadalasan, ang pinakamabilis na paraan para ikonekta ang B1 sa ibang church-tech tool ay isang recipe ng Zapier o Make — hindi mo kailangan ng bagong imprastraktura ng B1, at ang third party ang nagho-host ng workflow. Ito ay piniling listahan ng mga serbisyong nakumpirma naming maikakabit ngayon, na may maikli at kopyahin-at-i-paste na gabay sa setup para sa bawat isa.

</div>

## Sa Isang Sulyap {#at-a-glance}

| Serbisyo | Kategorya | Tulay | Ano ang maikakabit mo |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Email | Built-in sa B1 (tab na Webhooks) | Panatilihing naka-sync ang isang Mailchimp audience sa mga tao, grupo, at naka-save na listahan ng B1 |
| [Donorbox](./donorbox.md) | Donasyon | Zapier | Ibalik ang mga donasyon at donor ng Donorbox sa B1 |
| [Subsplash](./subsplash.md) | App / Donasyon | Zapier | Kunin ang giving at mga tao ng Subsplash papunta sa B1 |
| [VOMO](./vomo.md) | Pagboboluntaryo | Zapier | I-sync ang mga sign-up ng volunteer sa pagitan ng mga grupo ng B1 at mga proyekto ng VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Mag-trigger ng text ng Clearstream mula sa mga event ng B1; tanggapin ang mga sagot bilang mga record ng B1 |
| [Text In Church](./text-in-church.md) | SMS / Workflow | Zapier | Mag-trigger ng mga workflow ng Text In Church mula sa B1; tumanggap ng datos ng Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier o Make | Magpadala ng SMS mula sa alinmang event ng B1 |
| [Checkr](./checkr.md) | Background check | Make | Simulan ang background check kapag may sumali sa serving team |

## Ano ang Pare-pareho sa Lahat Nito {#what-all-of-these-have-in-common}

1. **Pareho ang panig ng B1 ng pagkakabit** — gumawa ng API key na may tamang scope sa **B1Admin → Settings → Developer → API Keys**, pagkatapos ay alinman sa hayaang magrehistro ang tulay ng webhook para sa trigger (ginagawa ito nang awtomatiko ng Zapier / Make, kailangan ang `settings:write`) o tumawag sa mga REST endpoint ng B1 mula sa downstream na aksyon. Kailangan ng Zapier app ng B1.church ang `settings:write` sa bawat key, dahil sinusuri nito ang key laban sa listahan ng webhook ng B1 kapag ikinonekta mo ito. (Eksepsyon ang Mailchimp: built-in sa B1 ang sync nito at naka-set up sa tab na **Webhooks**, walang API key o tulay na kailangan.)
2. **Ikaw ang sinisingil ng tulay, hindi kami.** Libre ang ChurchApps; parehong may libreng tier ang Zapier at Make na sumasakop sa ilang recipe.
3. **Puwede mong subukan ang pagkakabit nang hindi pa live.** May button na "Test step" ang Zapier na kumukuha ng sample na datos mula sa B1 at nagpapakita sa iyo ng hugis ng datos bago mo i-on ang recipe.

## Pagpili ng Tulay {#picking-a-bridge}

- **Zapier** ay mas magiliw at mas malaki ang catalogue ng app — gamitin ito bilang default maliban kung gastos ang alalahanin.
- **Make** ay mas mura sa malaking saklaw at mas flexible ang routing/filter logic — gamitin ito kapag may fan-out, kondisyon, o maraming hakbang ang iisang workflow.
- **Webhooks by Zapier** (ginagamit sa doc ng Mobile Message) ay generic na adapter na nagpapahintulot sa iyong mag-POST sa alinmang HTTP endpoint mula sa Zap kapag hindi first-class na Zapier app ang destinasyon.

Kung may gusto kang wala sa listahang ito, bukas ang [REST API](/docs/developer/api) at [webhooks](/docs/developer/api/webhooks) ng B1 — puwede kang gumawa ng isahang tulay gamit ang [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) sa loob ng ilang oras.

## Ano ang Wala Dito (at Bakit) {#whats-not-here-and-why}

Maraming sikat na church-tech tool — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — ang walang nailathalang Zapier app o Make module sa ngayon. May sarili silang API, pero ang pagkakabit sa mga ito sa B1 ay trabahong custom code, hindi recipe, kaya hindi sila angkop sa listahang ito. Kapag nagdagdag ng Zapier app o Make module ang isang vendor, idadagdag namin ang doc.

Sinadya rin naming laktawan ang mga tool na partikular sa Planning Center Services (musika, presentasyon), mga kakumpitensyang ChMS product, mga migration consultant, at mga tool na naglilinis lang ng datos na partikular sa PCO — wala sa mga ito ang may kapaki-pakinabang na landas ng pagkakabit sa B1.

## Tingnan Din {#see-also}

- [Zapier (pangkalahatang-tanaw)](../zapier.md) — magkapareho ang panig ng B1 ng bawat recipe sa Zapier; sakop ito ng doc na ito nang isang beses
- [Make (pangkalahatang-tanaw)](../make.md) — gayundin para sa mga scenario sa Make
- [Slack at Discord](../slack-discord.md) — mga chat notification nang walang kahit anong tulay
- [Google Sheets](../google-sheets.md) — mga export kapag kailangan
- [Webhooks (developer reference)](/docs/developer/api/webhooks) — ang catalog ng event na inaasahan ng bawat recipe
