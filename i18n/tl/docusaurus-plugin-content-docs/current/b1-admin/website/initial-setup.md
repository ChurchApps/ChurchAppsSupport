---
title: "Paunang Setup"
---

# Paunang Setup

<div class="article-intro">

Bawat B1 account ay may kasamang website na handang gamitin. Gagabayan kayo ng gabay na ito sa pag-set up ng domain ng inyong simbahan, pag-configure ng hitsura ng inyong site, paggawa ng inyong mga unang pahina, at pag-aayos ng inyong navigation.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ng B1.church account na may administrative access
- Kung gagamit ng custom domain, ihanda ang inyong DNS provider login credentials (hal., GoDaddy, Cloudflare, o AWS)
- Ihanda ang logo ng inyong simbahan sa PNG format na may transparent na background para sa pinakamahusay na resulta

</div>

## Pag-set Up ng Inyong Domain

Awtomatikong nakakatanggap ang inyong simbahan ng subdomain sa B1.church (halimbawa, `yourchurch.b1.church`). Maaari rin ninyong ituro ang inyong sariling custom domain sa inyong B1 site.

1. Pumunta sa **B1.church Admin** sa pamamagitan ng pagbisita sa admin.b1.church o pag-click ng inyong profile dropdown at pagpili ng **Switch App**.
2. I-click ang **Dashboard** sa kaliwang sidebar, pagkatapos piliin ang **Settings** mula sa dropdown menu.
3. I-click ang **Manage** para tingnan ang inyong subdomain. Itakda ito sa isang bagay na maikli at madaling makilala na walang mga espasyo.
4. Para gumamit ng custom domain, mag-log in sa inyong DNS provider (tulad ng GoDaddy, Cloudflare, o AWS) at magdagdag ng dalawang record:
   - Isang **A record** para sa inyong root domain na nakaturo sa `3.23.251.61`
   - Isang **CNAME record** para sa `www` na nakaturo sa `proxy.b1.church`
5. Bumalik sa B1.church Admin, idagdag ang inyong custom domain sa listahan, at i-click ang **Add** pagkatapos **Save**. Ang inyong site ay maa-access mula sa inyong custom domain sa loob ng ilang minuto.

:::tip
Kung hindi ninyo nakikita ang opsyon ng Settings, hilingin sa taong nag-set up ng inyong church account na bigyan kayo ng pahintulot na "Edit Church Settings". Tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md) para sa mga detalye.
:::

## Paggawa ng Inyong Unang Pahina

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu para buksan ang Website Pages view.
2. I-click ang **Add Page** sa kanang sulok sa itaas.
3. Piliin ang **Blank** bilang uri ng pahina at pangalanan itong "Home."
4. I-click ang **Page Settings** at itakda ang URL path sa `/` (isang forward slash na walang teksto) para sa inyong home page. Ang iba pang pahina ay gumagamit ng `/page-name`.
5. I-click ang **Edit Content** para magsimulang bumuo. Bawat pahina ay kailangang magsimula sa isang **Section** -- ito ang lalagyan para sa lahat ng iba pang elemento.
6. Pagkatapos magdagdag ng section, i-click muli ang **Add Content** para maglagay ng teksto, mga larawan, video, card, form, at iba pa sa pamamagitan ng pag-drag ng mga ito sa inyong section.

:::info
Para sa mga detalyadong tagubilin sa pagtatrabaho sa mga pahina, navigation, at mga uri ng pahina, tingnan ang [Pamamahala ng mga Pahina](managing-pages).
:::

## Pag-configure ng Hitsura ng Site

1. Mula sa Website Pages view, i-click ang **Appearance** tab sa itaas.
2. Gamitin ang **Color Palette** para itakda ang inyong mga brand color para sa primary, secondary, at accent tone.
3. Sa ilalim ng **Typography Settings**, piliin ang inyong heading at body font mula sa font browser.
4. I-upload ang logo ng inyong simbahan sa ilalim ng **Logo** sa Style Settings. Magbigay ng parehong light background at dark background na bersyon.
5. I-configure ang inyong **Site Footer** na may impormasyon ng pakikipag-ugnayan at mga link ng inyong simbahan.

:::info
Ang mga pagbabagong ginagawa ninyo sa Appearance ay naa-apply sa buong website. Tingnan ang pahina ng [Hitsura](appearance) para sa mga detalyadong tagubilin sa bawat setting.
:::

## Pag-set Up ng Navigation

Ang inyong mga navigation link ay lumalabas sa kaliwang sidebar ng Website Pages view. Para ayusin ang mga ito:

1. I-click ang **Add** para gumawa ng bagong navigation link at ituro ito sa isa sa inyong mga pahina.
2. I-drag and drop ang mga link para ayusin ang pagkakasunod-sunod o i-nest ang mga ito sa ilalim ng mga parent item.
3. I-preview ang inyong site para kumpirmahing tama ang hitsura ng navigation.

## Mga Susunod na Hakbang

- [Pamamahala ng mga Pahina](managing-pages) -- Matutunan kung paano magtrabaho sa mga pahina at navigation nang detalyado
- [Hitsura](appearance) -- I-fine-tune ang mga kulay, font, at layout ng inyong site
- [Mga File](files) -- Mag-upload ng mga larawan at dokumento para sa inyong website
