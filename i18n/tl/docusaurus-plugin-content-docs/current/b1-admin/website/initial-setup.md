---
title: "Paunang Setup"
---

# Paunang Setup

<div class="article-intro">

Bawat B1 account ay may kasamang website na handa nang gamitin. Gagabayan ka ng gabay na ito sa pag-setup ng domain ng inyong simbahan, pag-configure ng hitsura ng iyong site, paggawa ng iyong mga unang pahina, at pag-oorganisa ng iyong navigation.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng B1.church account na may administrative access
- Kung gagamit ng custom domain, ihanda ang login credentials ng iyong DNS provider (hal., GoDaddy, Cloudflare, o AWS)
- Ihanda ang logo ng inyong simbahan sa PNG format na may transparent na background para sa pinakamagandang resulta

</div>

## Pag-setup ng Iyong Domain

Awtomatikong nakakatanggap ang inyong simbahan ng subdomain sa B1.church (halimbawa, `yourchurch.b1.church`). Maaari mo ring ituro ang sarili mong custom domain sa iyong B1 site.

1. Pumunta sa **B1.church Admin** sa pamamagitan ng pagbisita sa admin.b1.church o pag-click sa iyong profile dropdown at pagpili ng **Switch App**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Settings**, at i-click ang **Settings**.
3. Buksan ang seksyong **Church Information** para makita ang iyong subdomain. Gawin itong maikli at madaling matandaan, at walang espasyo.
4. Para gumamit ng custom domain, mag-log in sa iyong DNS provider (tulad ng GoDaddy, Cloudflare, o AWS) at magdagdag ng dalawang record:
   - Isang **A record** para sa iyong root domain na nakaturo sa `3.23.251.61`
   - Isang **CNAME record** para sa `www` na nakaturo sa `proxy.b1.church`
5. Bumalik sa B1.church Admin, idagdag ang iyong custom domain sa listahan, at i-click ang **Add** at pagkatapos ay **Save**. Magiging accessible ang iyong site mula sa iyong custom domain sa loob ng ilang minuto.

:::tip
Kung hindi mo makita ang opsyong Settings, hilingin sa taong nag-setup ng account ng inyong simbahan na bigyan ka ng "Edit Church Settings" na pahintulot. Tingnan ang [Mga Role at Pahintulot](../settings/roles-permissions.md) para sa mga detalye.
:::

## Paggawa ng Iyong Unang Pahina

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Website**, at i-click ang **Pages**.
2. I-click ang **Add Page** sa kanang itaas na sulok.
3. Piliin ang **Blank** bilang uri ng pahina at pangalanan itong "Home."
4. I-click ang **Page Settings** at itakda ang URL path sa `/` (isang forward slash na walang kasamang text) para sa iyong home page. Ang ibang mga pahina ay gumagamit ng `/page-name`.
5. I-click ang **Edit Content** para magsimulang bumuo. Bawat pahina ay dapat magsimula sa isang **Section** -- ito ang lalagyan ng lahat ng iba pang element.
6. Pagkatapos magdagdag ng section, i-click muli ang **Add Content** para maglagay ng text, mga larawan, video, card, form, at iba pa sa pamamagitan ng pag-drag sa mga ito papasok sa iyong section.

:::info
Para sa detalyadong tagubilin sa pagtatrabaho sa mga pahina at navigation, tingnan ang [Pamamahala ng mga Pahina](managing-pages). Para sa kumpletong gabay sa visual editor, tingnan ang [Paggamit ng Page Editor](page-editor).
:::

## Pag-configure ng Hitsura ng Site

1. Sa Jump menu, piliin ang **Website > Appearance**.
2. Gamitin ang **Color Palette** para itakda ang mga brand color mo para sa primary, secondary, at accent na mga tono.
3. Sa ilalim ng **Typography Settings**, piliin ang iyong heading at body na mga font mula sa font browser.
4. I-upload ang logo ng inyong simbahan sa ilalim ng **Logo** sa Style Settings. Magbigay ng bersyon para sa light na background at para sa dark na background.
5. I-configure ang iyong **Site Footer** gamit ang contact information at mga link ng inyong simbahan.

:::info
Ang mga pagbabagong gagawin mo sa Appearance ay umiiral sa buong website mo. Tingnan ang pahinang [Appearance](appearance) para sa detalyadong tagubilin sa bawat setting.
:::

## Pag-setup ng Navigation

Lumalabas ang iyong mga navigation link sa Website Pages view. Para ayusin ang mga ito:

1. I-click ang **Add** para gumawa ng bagong navigation link at ituro ito sa isa sa iyong mga pahina.
2. I-drag at i-drop ang mga link para baguhin ang pagkakasunod-sunod o isama ang mga ito sa ilalim ng mga parent item.
3. I-preview ang iyong site para matiyak na tama ang itsura ng navigation.

## Mga Susunod na Hakbang

- [Pamamahala ng mga Pahina](managing-pages) -- Alamin nang detalyado kung paano magtrabaho sa mga pahina at navigation
- [Appearance](appearance) -- Pinuhin ang mga kulay, font, at layout ng iyong site
- [Files](files) -- Mag-upload ng mga larawan at dokumento para sa iyong website
