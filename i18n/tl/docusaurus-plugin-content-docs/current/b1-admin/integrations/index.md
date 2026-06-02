---
title: "Integrations"
---

# Integrations

<div class="article-intro">

Ang B1 ay kumonekta sa mga tools na ginagamit na ng iyong team. Konektahan ang Slack o Discord para sa staff notifications, i-automate ang workflows sa Zapier o Make, o mag-export ng data on demand sa Google Sheets — nang hindi nagbabayad para sa isang hiwalay na integration platform at nang hindi inaasikaso ng ChurchApps ang kahit ano pang dagdag. Bawat integration ay tumatakbo sa third party's sariling infrastructure at nagsasalita sa iyong church sa pamamagitan ng B1's webhooks o REST API.

</div>

## Ano ang Available

| Integration | Ano ang ginagawa | Direction | Effort to set up |
|---|---|---|---|
| **[Slack](./slack-discord)** | I-post ang readable notifications (new people, donations, sign-ups, …) sa isang Slack channel | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Pareho, sa isang Discord channel | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Gamitin ang B1 events bilang triggers at B1 actions sa kahit na alin sa Zapier's 7,000+ apps | Both | 5–10 min per Zap |
| **[Make](./make)** | Parehong ideya tulad ng Zapier, sa Make's visual scenario builder | Both | 5–10 min per scenario |
| **[Google Sheets](./google-sheets)** | I-export ang People / Donations / Groups / Attendance sa isang spreadsheet on demand | B1 → Sheet | 5 minutes |
| **[Claude](./claude)** | Magtanong sa Anthropic's Claude ng mga katanungan tungkol sa iyong church data, scoped sa iyong permissions | Both | 5 minutes |
| **[ChatGPT](./chatgpt)** | Parehong ideya gamit ang OpenAI's ChatGPT, sa pamamagitan ng isang Custom GPT o MCP-aware OpenAI tooling | Both | 10 minutes |
| **[Connected services](./services/)** | Mga curated recipes para sa Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varies | 5–10 min each |

## Paano Pumili

- **Gusto mo lang ng isang notification sa chat?** Gamitin ang **Slack** o **Discord** — walang third-party account, walang Zap na ina-asikaso. Naka-configure nang buo sa loob ng B1Admin.
- **Gusto mong i-automate ang isang bagay sa mga apps** (hal. "kapag may nagbigay, idagdag sila sa aking Mailchimp list at Slack #donations")? Gamitin ang **Zapier** o **Make**. Ang Zapier ay mas friendly; ang Make ay mas mura sa scale at may mas flexible logic.
- **Kailangan ng isang one-off data pull o isang scheduled report?** Gamitin ang **Google Sheets** — i-paste ang isang API key sa sidebar ng add-on at mag-click ng Export.
- **Gusto mong magtanong sa plain English** ("ilang first-time visitors noong nakaraang Linggo?", "i-summarize ang giving ngayong buwan")? Gamitin ang **[Claude](./claude)** o **[ChatGPT](./chatgpt)** — parehong kumokonekta sa B1 na may isang API key.
- **Nagbubuo ng iyong sariling custom integration?** Wala sa itaas — makipag-usap sa [REST API](/docs/developer/api) direkta gamit ang isang [API key](/docs/developer/api/api-keys), o mag-subscribe sa isang server na kinokontrol mo sa [webhooks](/docs/developer/api/webhooks).

## Ano ang Mayroon Sila sa Karaniwang

Bawat integration ay nag-authenticate gamit ang isang **B1 API key**, na lilikha sa B1Admin sa ilalim ng **Settings → Developer → API Keys**. Ang key:

- Ay nakakabit sa isang specific person sa iyong church at ay nag-inherit ng mga permissions ng tao na iyon
- Ay maaaring mapatupad gamit ang **scopes** — halimbawa ang isang Google Sheets export ay kailangan lamang ng `people:read`, hindi `settings:write`
- Ay maaaring i-revoke anumang oras, kaagad na naghihintay sa access ng integration nang walang makakaapekto sa iba

Ang ilang connectors (Zapier, Make) ay nag-register din ng isang [webhook](/docs/developer/api/webhooks) sa iyong ngalan kapag ang Zap o scenario ay naka-on, at tinatanggal ito kapag ikaw ay nag-off ng Zap — hindi mo ini-manage ang webhook URL nang sarili mo.

:::tip
Para sa Zapier at Make upang mag-register ng webhooks nang automatic, ang API key ay kailangan ang **`settings:write`** scope (plus ang resource scopes para sa anumang pinaplano ng integration). Ang read-only key ay gumagana para sa actions at exports ngunit hindi para sa triggers.
:::

## Halaga

Ang ChurchApps ay libre at open-source. Ang Slack/Discord, ang [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), at ang opisyal na Zapier / Make / Google Sheets connectors ay libre din mula sa aming side. Ang mga third parties ay maaaring mag-charge para sa kanilang sariling mga platforms (Zapier at Make ay parehong may generous free tiers; Slack, Discord, at Google Sheets ay libre para sa layuning ito).

## Pagbuo ng Iyong Sarili

Kung wala sa itaas ang akma, bawat B1 surface ay bukas:

- **[REST API](/docs/developer/api)** — tawarang B1 mula sa anumang wika na may `Authorization: Bearer cak_…` header
- **[Webhooks](/docs/developer/api/webhooks)** — mag-subscribe ng isang public HTTPS endpoint sa isa o higit pang uri ng kaganapan at makatanggap ng signed JSON payloads
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — kung ikaw ay nagbubuo ng isang SaaS product na ginagamit ng maraming churches

## Mga Susunod na Hakbang

- [Slack & Discord](./slack-discord) — mag-post ng chat notifications
- [Zapier](./zapier) — kumonekta sa 7,000+ apps
- [Make](./make) — visual workflow automation
- [Google Sheets](./google-sheets) — mag-export sa mga spreadsheets
- [Claude](./claude) — magtanong sa Anthropic's Claude tungkol sa iyong church data
- [ChatGPT](./chatgpt) — magtanong sa OpenAI's ChatGPT tungkol sa iyong church data
- [Connected services](./services/) — per-service recipes (Mailchimp, Donorbox, Clearstream, …)
