---
title: "Paunang Pag-setup"
---

# Paunang Pag-setup

<div class="article-intro">

Bawat B1 account ay may kasamang website na handa nang gamitin. Ang gabay na ito ay gagabay sa iyo sa pag-setup ng iyong domain ng simbahan, pag-configure ng hitsura ng iyong site, paglikha ng iyong unang mga pahina, at pag-ayos ng iyong navigation.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng B1.church account na may administrative access
- Kung gumagamit ng custom domain, magkaroon ng handa na ang iyong DNS provider login credentials (halimbawa, GoDaddy, Cloudflare, o AWS)
- Ihanda ang iyong church logo sa PNG format na may transparent background para sa pinakamahusay na mga resulta

</div>

## Pag-setup ng Iyong Domain

Ang iyong simbahan ay awtomatikong makakatanggap ng subdomain sa B1.church (halimbawa, `yourchurch.b1.church`). Maaari mo rin ituro ang iyong sariling custom domain sa iyong site ng B1.

1. Pumunta sa **B1.church Admin** sa pamamagitan ng pagbisita sa admin.b1.church o pag-click sa iyong profile dropdown at pagpili ng **Switch App**.
2. Buksan ang **section menu** sa tuktok-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Settings**.
3. Buksan ang seksyon ng **Church Information** upang tingnan ang iyong subdomain. Itakda ito sa isang bagay na maikli at madaling makilala nang walang mga espasyo.
4. Upang gumamit ng custom domain, mag-login sa iyong DNS provider (tulad ng GoDaddy, Cloudflare, o AWS) at magdagdag ng dalawang record:
   - Isang **A record** para sa iyong root domain na namumuway sa `3.23.251.61`
   - Isang **CNAME record** para sa `www` na namumuway sa `proxy.b1.church`
5. Bumalik sa B1.church Admin, idagdag ang iyong custom domain sa listahan, at i-click ang **Add** pagkatapos **Save**. Ang iyong site ay magiging accessible mula sa iyong custom domain sa loob ng ilang minuto.

:::tip
Kung hindi mo nakikita ang opsyon ng Settings, tanungin ang taong nag-setup ng iyong account ng simbahan na bigyan ka ng pahintulot na "Edit Church Settings". Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mga detalye.
:::

## Paglikha ng Iyong Unang Pahina

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu upang buksan ang Website Pages view.
2. I-click ang **Add Page** sa tuktok na kanang sulok.
3. Pumili ng **Blank** bilang uri ng pahina at pangalanan ito ng "Home."
4. I-click ang **Page Settings** at itakda ang URL path sa `/` (isang forward slash na walang teksto) para sa iyong home page. Ang iba pang mga pahina ay gumagamit ng `/page-name`.
5. I-click ang **Edit Content** upang magsimulang bumuo. Bawat pahina ay dapat magsimula sa isang **Section** -- ito ang container para sa lahat ng iba pang elemento.
6. Pagkatapos magdagdag ng seksyon, i-click ang **Add Content** muli upang magsingit ng teksto, mga imahe, mga video, mga card, mga form, at higit pa sa pamamagitan ng pag-drag ng mga ito sa iyong seksyon.

:::info
Para sa mga detalyadong tagubilin sa pagtatrabaho sa mga pahina at navigation, tingnan ang [Managing Pages](managing-pages). Para sa kumpletong gabay sa visual editor, tingnan ang [Using the Page Editor](page-editor).
:::

## Pag-configure ng Hitsura ng Site

1. Mula sa Website Pages view, i-click ang tab na **Appearance** sa tuktok.
2. Gamitin ang **Color Palette** upang itakda ang iyong brand colors para sa primary, secondary, at accent tones.
3. Sa ilalim ng **Typography Settings**, pumili ng iyong heading at body fonts mula sa font browser.
4. I-upload ang iyong church logo sa ilalim ng **Logo** sa Style Settings. Magbigay ng parehong light background at dark background version.
5. I-configure ang iyong **Site Footer** gamit ang impormasyon sa kontak at mga link ng iyong simbahan.

:::info
Ang mga pagbabago na iyong ginagawa sa Appearance ay nag-apply sa buong website mo. Tingnan ang pahina ng [Appearance](appearance) para sa mga detalyadong tagubilin sa bawat setting.
:::

## Pag-setup ng Navigation

Ang iyong navigation links ay lilitaw sa Website Pages view. Upang ayusin ang mga ito:

1. I-click ang **Add** upang lumikha ng isang bagong navigation link at ituro ito sa isa sa iyong mga pahina.
2. I-drag at drop ang mga link upang muling ayusin ang mga ito o i-nest ang mga ito sa ilalim ng mga parent item.
3. Mag-preview ng iyong site upang kumpirmahin na ang navigation ay mukhang tama.

## Mga Susunod na Hakbang

- [Managing Pages](managing-pages) -- Matutuhan kung paano magtrabaho sa mga pahina at navigation nang detalyado
- [Appearance](appearance) -- Fine-tune ang iyong site's colors, fonts, at layout
- [Files](files) -- I-upload ang mga imahe at dokumento para sa iyong website
