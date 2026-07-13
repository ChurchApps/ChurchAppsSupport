---
title: "Integrations"
---

# Integrations

<div class="article-intro">

I-B1 iyahlanganiswa nemathulusi lelicembu lakho selikade liwasebentisa. Xhuma i-Slack nome i-Discord kusati sebasebenti, wenta ngco imisebenti ku-Zapier nome Make, nome ukhiphe imininingwane ngesikhatsi lesidzingekile ku-Google Sheets — ngaphandle kwekukhokha luhlelo lolwehlukile lwekuhlanganisa futsi ngaphandle kwe-ChurchApps kuhostela lokunye lokwengetiwe. Kuhlanganiswa ngakunye kusebenta etulu kwesakhiwo semaphathi latsatfu ngekwabo futsi kukhuluma nelibandla lakho ngema-webhook e-B1 nome i-REST API.

</div>

## Loko Lokutfolakalako

| Kuhlanganiswa | Lokwentako | Indlela | Umzamo Wekulungiselela |
|---|---|---|---|
| **[Slack](./slack-discord)** | Tfumela sati lesifundzeka lula (bantfu labasha, iminikelo, kubhalisa, …) kusigceme se-Slack | B1 → Slack | Emaminithi lali-2 |
| **[Discord](./slack-discord)** | Kufanako, kusigceme se-Discord | B1 → Discord | Emaminithi lali-2 |
| **[Zapier](./zapier)** | Sebentisa imicimbi ye-B1 njengetento kanye netento te-B1 kunoma nguluphi lwaletinhlelo letingetulu kwa-7,000+ te-Zapier | Kokubili | Emaminithi lali-5–10 nge-Zap ngayinye |
| **[Make](./make)** | Umbono lofanako ne-Zapier, kusakhi sesento lesibonakalako se-Make | Kokubili | Emaminithi lali-5–10 nge-scenario ngayinye |
| **[Google Sheets](./google-sheets)** | Khipha Bantfu / Iminikelo / Emacembu / Kubakhona kuya kusipredishithi ngesikhatsi lesidzingekile | B1 → Sheet | Emaminithi lali-5 |
| **[Claude](./claude)** | Buta i-Claude ye-Anthropic imibuto ngemininingwane welibandla lakho, ngekwemvumo yakho | Kokubili | Emaminithi lali-5 |
| **[ChatGPT](./chatgpt)** | Umbono lofanako nge-ChatGPT ye-OpenAI, nge-Custom GPT nome ithulusi le-OpenAI lelati i-MCP | Kokubili | Emaminithi lali-10 |
| **[Connected services](./services/)** | Tindlela letihlelekile te-Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Kuyehluka | Emaminithi lali-5–10 ngayinye |

## Kutsi Ukhetsa Njani

- **Ufuna kuphela sati kunkulumo-mpendvulwano?** Sebentisa i-**Slack** nome i-**Discord** — akukho akhawunti yephatsi lesitsatfu, akukho Zap lekumele uyigcine. Kulungiselelwa konkhe ngekhatsi kwe-B1Admin.
- **Ufuna kwenta ngco intfo emaphakathi kwetinhlelo** (sibonelo "nangabe umuntfu anikela, ngeta kuluhlu lwami lwe-Mailchimp bese ngeta ku-Slack #donations")? Sebentisa i-**Zapier** nome i-**Make**. I-Zapier ilula kakhulu; i-Make iyashibhile nangabe kukhula futsi inelogic lenetintsandvo letinyenti.
- **Udzinga kukhishwa kwemininingwane kanye nome umbiko lohleliwe?** Sebentisa i-**Google Sheets** — faka ikhiya ye-API ku-sidebar ye-add-on bese uchofota Export.
- **Ufuna kubuta imibuto ngelulwimi loluvamile** ("bavakashi labangaki labeta kucala ngeSonto leledlule?", "hlanganisa iminikelo yalenyanga")? Sebentisa i-**[Claude](./claude)** nome i-**[ChatGPT](./chatgpt)** — kokubili kuxhuma ku-B1 ngeikhiya yinye ye-API.
- **Wakha kuhlanganiswa kwakho ngco?** Akukho lokungetulu — khuluma ne-[REST API](/docs/developer/api) ngco nge-[ikhiya ye-API](/docs/developer/api/api-keys), nome ubhalise seva loyilawulako ku-[ema-webhook](/docs/developer/api/webhooks).

## Loko Lokuhlanganyelwe

Kuhlanganiswa ngakunye kucinisekisa nge**ikhiya ye-B1 API**, leyakhiwe ku-B1Admin ngaphansi kwe **Settings → Developer → API Keys**. Ikhiya:

- Ihlotjaniswe nemuntfu lotsite welibandla lakho futsi idla imvumo yaloyo muntfu
- Ingancishiswa nge**mkhawulo** — sibonelo, inkhipho ye-Google Sheets idzinga kuphela `people:read`, hhayi `settings:write`
- Ingasuswa nome ngasiphi sikhatsi, ivale kufinyelela kwekuhlanganiswa ngco ngaphandle kwekutsintsa lokunye

Ema-connector lambalwa (Zapier, Make) nawo abhalisa i-[webhook](/docs/developer/api/webhooks) esikhundleni sakho nangabe i-Zap nome i-scenario icaliswe, bese ayisusa nangabe uyivalile i-Zap — awuphatsi i-URL ye-webhook wena ngco.

:::tip
Kuze i-Zapier ne-Make tibhalise ema-webhook ngekutentekela, ikhiya ye-API idzinga umkhawulo we-**`settings:write`** (kanye nemkhawulo wemitfombo yaloko lokutsintswa kuhlanganiswa). Ikhiya lefunda kuphela iyasebenta ku-action nasenkhiphweni kepha hhayi kuma-trigger.
:::

## Tindleko

I-ChurchApps imahhala futsi ivulekile emtfombeni. I-Slack/Discord, i-[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), kanye nema-connector asemtsetfweni e-Zapier / Make / Google Sheets nawo amahhala kusuka ehlangotsini lwetfu. Emaphathi latsatfu angakhokhisa tinkhundla tawo ngekwabo (i-Zapier ne-Make kokubili tinebanga lelimahhala lelinesihle; i-Slack, i-Discord, ne-Google Sheets amahhala kuloluhlobo lomsebenti).

## Kwakha Lokwakho

Nangabe akukho kulokungetulu lokufanele, sonkhe simo se-B1 sivulekile:

- **[REST API](/docs/developer/api)** — bita i-B1 kusuka kunoma lulwimi ngekusebentisa iHedha ye-`Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — bhalisa indzawo ye-HTTPS lesembikweni kuluhlobo lulunye nome lamanyenti lwemicimbi bese wemukela imithwalo ye-JSON lesayiniwe
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — nangabe wakha umkhicito we-SaaS losetjentiswa ngemabandla lamanyenti

## Tinyatselo Letilandzelako

- [Slack & Discord](./slack-discord) — tfumela sati senkulumo-mpendvulwano
- [Zapier](./zapier) — xhuma kutinhlelo letingetulu kwa-7,000+
- [Make](./make) — kwenta ngco umsebenti lobonakalako
- [Google Sheets](./google-sheets) — khipha uye kusipredishithi
- [Claude](./claude) — buta i-Claude ye-Anthropic ngemininingwane welibandla lakho
- [ChatGPT](./chatgpt) — buta i-ChatGPT ye-OpenAI ngemininingwane welibandla lakho
- [Connected services](./services/) — tindlela ngenkonzo ngayinye (Mailchimp, Donorbox, Clearstream, …)
