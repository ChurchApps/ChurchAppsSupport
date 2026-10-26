---
title: "Mga Integrasyon"
---

# Mga Integrasyon

<div class="article-intro">

Kumokonekta ang B1 sa mga tool na ginagamit na ng iyong team. Ikonekta ang Slack o Discord para sa notification ng staff, i-automate ang mga workflow sa Zapier o Make, o mag-export ng datos kapag kailangan sa Google Sheets — nang hindi nagbabayad para sa hiwalay na integration platform at nang hindi kailangang mag-host ng dagdag ng ChurchApps. Tumatakbo ang bawat integration sa imprastraktura ng third party at nakikipag-usap sa iyong simbahan sa pamamagitan ng webhooks o REST API ng B1.

</div>

## Ano ang Available

| Integration | Ano ang ginagawa nito | Direksyon | Pagsisikap sa pag-set up |
|---|---|---|---|
| **[Slack](./slack-discord)** | Nagpo-post ng madaling basahing notification (mga bagong tao, donasyon, sign-up, …) sa isang Slack channel | B1 → Slack | 2 minuto |
| **[Discord](./slack-discord)** | Pareho, sa isang Discord channel | B1 → Discord | 2 minuto |
| **[Zapier](./zapier)** | Gamitin ang mga event ng B1 bilang trigger at ang mga aksyon ng B1 sa alinman sa 7,000+ app ng Zapier | Pareho | 5–10 min bawat Zap |
| **[Make](./make)** | Parehong ideya sa Zapier, sa visual scenario builder ng Make | Pareho | 5–10 min bawat scenario |
| **[Google Sheets](./google-sheets)** | Mag-export ng People / Donations / Groups / Attendance sa spreadsheet kapag kailangan | B1 → Sheet | 5 minuto |
| **[Claude](./claude)** | Magtanong sa Claude ng Anthropic tungkol sa datos ng iyong simbahan, nakabatay sa iyong pahintulot — libreng subukan, inirerekomenda | Pareho | Wala pang 3 minuto |
| **[ChatGPT](./chatgpt)** | Parehong ideya gamit ang ChatGPT ng OpenAI (kailangan ng bayad na ChatGPT plan) | Pareho | 10 minuto |
| **[Connected services](./services/)** | Mga piling recipe para sa Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Iba-iba | 5–10 min bawat isa |

## Paano Pumili

- **Gusto mo lang ng notification sa chat?** Gamitin ang **Slack** o **Discord** — walang third-party account, walang Zap na kailangang pangalagaan. Kumpletong naka-configure sa loob ng B1Admin.
- **Gusto mong i-automate ang isang bagay sa iba't ibang app** (hal. "kapag may nagbigay, idagdag siya sa aking Mailchimp list at sa Slack #donations")? Gamitin ang **Zapier** o **Make**. Mas madali ang Zapier; mas mura ang Make kapag malaki na ang gamit at mas flexible ang logic nito.
- **Kailangan mo ng isang beses na pagkuha ng datos o naka-iskedyul na ulat?** Gamitin ang **Google Sheets** — i-paste ang API key sa sidebar ng add-on at i-click ang Export.
- **Gusto mong magtanong sa simpleng Ingles** ("ilan ang first-time visitors noong nakaraang Linggo?", "ibuod ang giving ngayong buwan")? Magsimula sa **[Claude](./claude)** — libreng subukan at wala pang 3 minuto ang pag-set up. Gumagana rin ang **[ChatGPT](./chatgpt)** kung mayroon kang bayad na plan. Kumokonekta ang Claude sa pamamagitan ng pag-sign in gamit ang iyong B1 account; gumagamit ang ChatGPT ng B1 API key.
- **Gumagawa ka ng sarili mong custom integration?** Wala sa mga nasa itaas — direktang makipag-usap sa [REST API](/docs/developer/api) gamit ang [API key](/docs/developer/api/api-keys), o mag-subscribe ng server na kontrolado mo sa [webhooks](/docs/developer/api/webhooks).

## Ang Pagkakapareho ng Lahat

Bawat integration ay nag-a-authenticate gamit ang **B1 API key**, na ginagawa sa B1Admin sa ilalim ng **Settings → Developer → API Keys**. Ang key:

- Nakatali sa isang partikular na tao sa iyong simbahan at namamana ang mga pahintulot ng taong iyon
- Maaaring paliitin gamit ang **scopes** — halimbawa, ang Google Sheets export ay nangangailangan lamang ng `people:read`, hindi `settings:write`
- Maaaring bawiin anumang oras, agad na puputol sa access ng integration nang hindi naaapektuhan ang iba

May ilang connector (Zapier, Make) na nagrerehistro rin ng [webhook](/docs/developer/api/webhooks) para sa iyo kapag na-on ang Zap o scenario, at inaalis ito kapag na-off ang Zap — hindi mo kailangang pamahalaan nang mano-mano ang webhook URL.

:::tip
Para awtomatikong makapagrehistro ng webhook ang Zapier at Make, kailangan ng API key ang **`settings:write`** scope (kasama ang mga resource scope para sa anumang ginagalaw ng integration). Gumagana ang read-only na key para sa mga aksyon at export, pero hindi para sa mga trigger.
:::

## Gastos

Libre at open-source ang ChurchApps. Libre rin mula sa aming panig ang Slack/Discord, ang [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), at ang opisyal na Zapier / Make / Google Sheets connectors. Maaaring maningil ang mga third party para sa sarili nilang platform (parehong may malawak na libreng tier ang Zapier at Make; libre ang Slack, Discord, at Google Sheets para sa ganitong gamit).

## Gumawa ng Sarili Mo

Kung wala sa nasa itaas ang akma, bukas ang bawat surface ng B1:

- **[REST API](/docs/developer/api)** — tumawag sa B1 mula sa anumang wika gamit ang `Authorization: Bearer cak_…` header
- **[Webhooks](/docs/developer/api/webhooks)** — mag-subscribe ng pampublikong HTTPS endpoint sa isa o higit pang uri ng event at tumanggap ng naka-sign na JSON payload
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — kung gumagawa ka ng SaaS product na ginagamit ng maraming simbahan

## Mga Susunod na Hakbang

- [Slack & Discord](./slack-discord) — mag-post ng notification sa chat
- [Zapier](./zapier) — kumonekta sa 7,000+ app
- [Make](./make) — visual na automation ng workflow
- [Google Sheets](./google-sheets) — mag-export sa spreadsheet
- [Claude](./claude) — magtanong sa Claude tungkol sa datos ng iyong simbahan
- [ChatGPT](./chatgpt) — magtanong sa ChatGPT ng OpenAI tungkol sa datos ng iyong simbahan
- [Connected services](./services/) — mga recipe bawat serbisyo (Mailchimp, Donorbox, Clearstream, …)
