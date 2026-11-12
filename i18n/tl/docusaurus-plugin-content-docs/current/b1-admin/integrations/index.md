---
title: "Mga Integration"
description: "Ikonekta ang B1 Admin sa Slack, Discord, Zapier, Make, Google Sheets, at mga AI assistant gaya ng Claude, kasama ang mga hakbang sa setup at ang mga API key scope na kailangan ng bawat isa."
---

# Mga Integration

<div class="article-intro">

Nakakabit ang B1 sa mga tool na ginagamit na ng iyong team. Ikonekta ang Slack o Discord para sa mga notification ng staff, i-automate ang mga workflow sa Zapier o Make, o mag-export ng datos kapag kailangan sa Google Sheets — nang hindi nagbabayad para sa hiwalay na integration platform at nang hindi nagho-host ang ChurchApps ng anumang dagdag. Tumatakbo ang bawat integration sa sariling imprastraktura ng third party at nakikipag-usap sa iyong simbahan sa pamamagitan ng mga webhook o REST API ng B1.

</div>

## Ano ang Available {#whats-available}

| Integration | Ano ang ginagawa nito | Direksyon | Pagsisikap sa setup |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | Nagpo-post ng nababasang notification (mga bagong tao, donasyon, sign-up, …) sa isang Slack channel | B1 → Slack | 2 minuto |
| **[Discord](./slack-discord.md)** | Pareho, sa isang Discord channel | B1 → Discord | 2 minuto |
| **[Zapier](./zapier.md)** | Gamitin ang mga event ng B1 bilang trigger at mga aksyon ng B1 sa alinmang 7,000+ app ng Zapier (naghihintay sa approval ng Zapier) | Pareho | 5–10 min kada Zap |
| **[Make](./make.md)** | Parehong ideya ng Zapier, sa visual scenario builder ng Make (hindi pa nailalabas) | Pareho | 5–10 min kada scenario |
| **[Google Sheets](./google-sheets.md)** | Mag-export ng People / Donations / Groups / Attendance sa isang spreadsheet kapag kailangan (hindi pa nailalabas) | B1 → Sheet | 5 minuto |
| **[Claude](./claude.md)** | Magtanong sa Claude ng Anthropic tungkol sa datos ng iyong simbahan, nakabatay sa iyong mga pahintulot — libre subukan, inirerekomenda | Pareho | Wala pang 3 minuto |
| **[ChatGPT](./chatgpt.md)** | Parehong ideya gamit ang ChatGPT ng OpenAI (kailangan ng bayad na ChatGPT plan) | Pareho | 10 minuto |
| **[Mailchimp](./services/mailchimp.md)** | Panatilihing naka-sync ang isang Mailchimp audience sa iyong mga tao, grupo, at naka-save na listahan — built-in sa B1 | B1 → Mailchimp | 5 minuto |
| **[Mga konektadong serbisyo](./services/index.md)** | Mga piniling recipe para sa Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Iba-iba | 5–10 min bawat isa |

## Paano Pumili {#how-to-pick}

- **Gusto mo lang ng notification sa chat?** Gamitin ang **Slack** o **Discord** — walang third-party account, walang Zap na kailangang alagaan. Naka-configure nang buo sa loob ng B1Admin.
- **Gusto mong i-automate ang isang bagay sa iba't ibang app** (hal. "kapag may nagbigay, idagdag siya sa aking Mailchimp list at sa Slack #donations")? Gamitin ang **Zapier** o **Make**. Mas magiliw ang Zapier; mas mura ang Make sa malaking saklaw at mas flexible ang lohika.
- **Kailangan mo ng isahang pagkuha ng datos o naka-iskedyul na ulat?** Gamitin ang **Google Sheets** — i-paste ang API key sa sidebar ng add-on at i-click ang Export.
- **Gusto mong magtanong sa simpleng wika** ("ilan ang first-time visitor noong nakaraang Linggo?", "ibuod ang giving ngayong buwan")? Magsimula sa **[Claude](./claude.md)** — libre itong subukan at natatapos ang setup sa wala pang 3 minuto. Gumagana rin ang **[ChatGPT](./chatgpt.md)** kung may bayad na plan. Kumokonekta ang Claude sa pamamagitan ng pag-sign in gamit ang iyong B1 account; gumagamit ang ChatGPT ng B1 API key.
- **Gumagawa ka ng sarili mong custom na integration?** Wala sa mga nasa itaas — direktang makipag-usap sa [REST API](/docs/developer/api) gamit ang isang [API key](/docs/developer/api/api-keys), o mag-subscribe ng server na kontrolado mo sa [webhooks](/docs/developer/api/webhooks).

## Ano ang Pare-pareho ng Lahat {#what-they-have-in-common}

Lahat ay naka-set up sa B1Admin sa ilalim ng **Settings → Developer**, na may tatlong tab: **API Keys**, **Webhooks**, at **Connected Apps**.

- **Slack, Discord, at Mailchimp** ay mga webhook na ikaw mismo ang gagawa sa tab na **Webhooks** (piliin ang katugmang **Connector Type**). Hindi nila kailangan ng API key.
- **Claude** (pag-sign in gamit ang iyong B1 account) ay lumalabas sa tab na **Connected Apps**, kung saan puwede mo itong bawiin.
- **Zapier, Make, Google Sheets, ChatGPT, at Claude gamit ang key** ay nag-a-authenticate gamit ang **B1 API key**, na ginagawa sa tab na **API Keys**. Ang key:

  - Nakatali sa taong gumawa nito at minamana ang mga pahintulot ng taong iyon
  - Puwedeng paliitin gamit ang **scopes** — halimbawa, ang Google Sheets export ay kailangan lang ng `people:read`, hindi `settings:write`
  - Puwedeng burahin anumang oras, agad na puputol sa access ng integration nang hindi naaapektuhan ang iba

Ang ilang connector (Zapier, Make) ay nagrerehistro rin ng [webhook](/docs/developer/api/webhooks) para sa iyo kapag na-on ang Zap o scenario, at inaalis ito kapag na-off mo ang Zap — hindi mo kailangang pamahalaan ang webhook URL mismo.

:::tip
Para awtomatikong magrehistro ng webhook ang Zapier at Make, kailangan ng API key ang scope na **`settings:write`** (kasama ang resource scope ng anumang ginagalaw ng integration). Gumagana ang read-only na key para sa mga aksyon at export, pero hindi para sa mga trigger.
:::

## Gastos {#cost}

Libre at open-source ang ChurchApps. Libre rin mula sa aming panig ang Slack/Discord, ang [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), at ang opisyal na Zapier / Make / Google Sheets connector. Maaaring maningil ang mga third party para sa sarili nilang platform (parehong may mapagbigay na libreng tier ang Zapier at Make; libre ang Slack, Discord, at Google Sheets para sa ganitong gamit).

## Gumawa ng Sarili Mo {#building-your-own}

Kung wala sa nasa itaas ang bagay sa iyo, bukas ang bawat surface ng B1:

- **[REST API](/docs/developer/api)** — tumawag sa B1 mula sa anumang wika gamit ang header na `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — mag-subscribe ng pampublikong HTTPS endpoint sa isa o higit pang uri ng event at tumanggap ng mga naka-sign na JSON payload
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — kung gumagawa ka ng SaaS product na ginagamit ng maraming simbahan

## Mga Susunod na Hakbang {#next-steps}

- [Slack at Discord](./slack-discord.md) — mag-post ng chat notification
- [Zapier](./zapier.md) — kumonekta sa 7,000+ app
- [Make](./make.md) — visual na workflow automation
- [Google Sheets](./google-sheets.md) — mag-export sa mga spreadsheet
- [Claude](./claude.md) — magtanong kay Claude ng Anthropic tungkol sa datos ng iyong simbahan
- [ChatGPT](./chatgpt.md) — magtanong sa ChatGPT ng OpenAI tungkol sa datos ng iyong simbahan
- [Mga konektadong serbisyo](./services/index.md) — mga recipe bawat serbisyo (Mailchimp, Donorbox, Clearstream, …)
