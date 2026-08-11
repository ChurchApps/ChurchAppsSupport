---
title: "Paunang Setup"
---

# Paunang Setup

<div class="article-intro">

Bawat account ng B1 ay may kasamang website na handa nang gamitin. Ang gabay na ito ay gagabay sa iyo sa pag-setup ng iyong domain ng simbahan, pag-configure ng hitsura ng iyong site, paglikha ng iyong mga unang pahina, at pag-ayos ng iyong navigation.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng isang account ng B1.church na may access sa pamamahala
- Kung gumagamit ng custom domain, handa na ang mga login credentials ng iyong DNS provider (hal., GoDaddy, Cloudflare, o AWS)
- Maghanda ng logo ng iyong simbahan sa PNG format na may transparent background para sa pinakamahusay na resulta

</div>

## Pag-setup ng Iyong Domain

Ang iyong simbahan ay awtomatikong tumatanggap ng isang subdomain sa B1.church (halimbawa, `yourchurch.b1.church`). Maaari mo ring ituro ang iyong sariling custom domain sa iyong B1 site.

1. Pumunta sa **B1.church Admin** sa pamamagitan ng pagbisita sa admin.b1.church o pag-click sa iyong profile dropdown at pagpili ng **Switch App**.
2. Buksan ang **menu ng seksyon** sa sulok sa itaas-kaliwa (ang pangalan ng seksyon na may maliit na arrow) at pumili ng **Mga Ayos**.
3. I-click ang **Manage** upang tingnan ang iyong subdomain. Itakda ito sa isang napakaikli at kinikilala nang walang mga puwang.
4. Upang gumamit ng custom domain, mag-login sa iyong DNS provider (tulad ng GoDaddy, Cloudflare, o AWS) at magdagdag ng dalawang record:
   - Isang **A record** para sa iyong root domain na ituturo sa `3.23.251.61`
   - Isang **CNAME record** para sa `www` na ituturo sa `proxy.b1.church`
5. Bumalik sa B1.church Admin, idagdag ang iyong custom domain sa listahan, at i-click ang **Add** pagkatapos **Magsave**. Ang iyong site ay magiging accessible mula sa iyong custom domain sa loob ng ilang minuto.

:::tip
Kung hindi mo nakikita ang opsyon ng Mga Ayos, tanungin ang taong nag-setup ng iyong account ng simbahan na magbigay sa iyo ng pahintulot na "I-edit ang Mga Ayos ng Simbahan". Tingnan ang [Mga Rol at Pahintulot](../settings/roles-permissions.md) para sa mga detalye.
:::

## Paglikha ng Iyong Unang Pahina

1. Sa B1 Admin, i-click ang **Website** sa kaliwang menu upang buksan ang Website Pages view.
2. I-click ang **Magdagdag ng Pahina** sa sulok sa itaas-kanan.
3. Pumili ng **Blank** bilang uri ng pahina at pangalanan itong "Home."
4. I-click ang **Mga Ayos ng Pahina** at itakda ang URL path sa `/` (isang forward slash na walang teksto) para sa iyong home page. Ang ibang mga pahina ay gumagamit ng `/page-name`.
5. I-click ang **I-edit ang Nilalaman** upang magsimula ng pagbuo. Bawat pahina ay dapat magsimula sa isang **Seksyon** -- ito ang container para sa lahat ng iba pang elemento.
6. Pagkatapos magdagdag ng seksyon, i-click ang **Magdagdag ng Nilalaman** muli upang magpasok ng teksto, mga larawan, mga video, mga card, mga form, at marami pang iba sa pamamagitan ng pag-drag sa iyong seksyon.

:::info
Para sa detalyadong mga tagubilin sa pagtrabaho sa mga pahina at navigation, tingnan ang [Pag-manage ng Mga Pahina](managing-pages). Para sa isang buong gabay sa visual editor, tingnan ang [Paggamit ng Page Editor](page-editor).
:::

## Pag-configure ng Hitsura ng Site

1. Mula sa Website Pages view, i-click ang tab ng **Hitsura** sa tuktok.
2. Gamitin ang **Color Palette** upang itakda ang iyong mga brand color para sa pangunahin, pangalawang, at accent tones.
3. Sa ilalim ng **Typography Settings**, pumili ng iyong heading at body fonts mula sa font browser.
4. I-upload ang logo ng iyong simbahan sa ilalim ng **Logo** sa Style Settings. Magbigay ng parehong light background at dark background version.
5. I-configure ang iyong **Site Footer** na may impormasyon ng pakikipag-ugnayan at mga link ng iyong simbahan.

:::info
Ang mga pagbabago na ginagawa mo sa Hitsura ay naaply sa buong iyong website. Tingnan ang pahina ng [Hitsura](appearance) para sa detalyadong mga tagubilin sa bawat setting.
:::

## Pag-setup ng Navigation

Ang iyong mga link sa navigation ay lumalabas sa Website Pages view. Upang ayusin ang mga ito:

1. I-click ang **Add** upang lumikha ng isang bagong link sa navigation at ituro ito sa isa sa iyong mga pahina.
2. Drag at drop ang mga link upang baguhin ang pagkakasunod-sunod o nest ang mga ito sa ilalim ng mga item ng magulang.
3. I-preview ang iyong site upang kumpirmahin na ang navigation ay mukhang tama.

## Mga Susunod na Hakbang

- [Pag-manage ng Mga Pahina](managing-pages) -- Matuto kung paano gumawa ng mga pahina at navigation nang detalyado
- [Hitsura](appearance) -- Fine-tune ang kulay, font, at layout ng iyong site
- [Mga File](files) -- I-upload ang mga larawan at dokumento para sa iyong website
