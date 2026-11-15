---
title: "Pagsisimula sa Website ng Iyong B1 Admin"
sidebar_label: "Initial Setup"
description: "I-set up ang website ng iyong simbahan sa B1 Admin: ituro ang subdomain o custom domain, gumawa ng home page, pumili ng brand color at logo, at bumuo ng navigation."
---

# Initial Setup

<div class="article-intro">

Bawat B1 account ay may kasamang website na handang gamitin. Gagabayan ka ng gabay na ito sa pag-set up ng domain ng iyong simbahan, pag-configure ng itsura ng iyong site, paggawa ng iyong unang mga pahina, at pag-aayos ng iyong navigation.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng B1.church account na may administrative access
- Kung gagamit ng custom domain, ihanda ang login credentials ng iyong DNS provider (hal., GoDaddy, Cloudflare, o AWS)
- Ihanda ang logo ng simbahan sa PNG format na may transparent na background para sa pinakamagandang resulta

</div>

## Pag-set Up ng Iyong Domain {#setting-up-your-domain}

Awtomatikong nakakakuha ang iyong simbahan ng subdomain sa B1.church (halimbawa, `yourchurch.b1.church`). Maaari mo ring ituro ang sarili mong custom domain sa iyong B1 site.

1. Pumunta sa **B1.church Admin** sa pamamagitan ng pagbisita sa admin.b1.church o pag-click sa profile dropdown mo at pagpili sa **Switch App**.
2. Buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Settings**, at i-click ang **Settings**.
3. Buksan ang seksyong **Church Information** para makita ang iyong subdomain. Gawin itong maikli at madaling tandaan, at walang espasyo.
4. Para gumamit ng custom domain, mag-log in sa iyong DNS provider (gaya ng GoDaddy, Cloudflare, o AWS) at magdagdag ng dalawang record:
   - Isang **A record** para sa root domain mo na tumuturo sa `3.23.251.61`
   - Isang **CNAME record** para sa `www` na tumuturo sa `proxy.b1.church`
5. Bumalik sa B1.church Admin, buksan ang seksyong **Domains** sa parehong Settings page, idagdag ang custom domain mo sa listahan, at i-click ang **Add** at pagkatapos ang **Save**. Maa-access na ang site mo sa custom domain mo sa loob ng ilang minuto.

:::tip
Kung hindi mo makita ang opsyong Settings, hilingin sa taong nag-set up ng account ng simbahan mo na bigyan ka ng permiso na "Edit Church Settings". Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) para sa mga detalye.
:::

## Paggawa ng Unang Pahina {#creating-your-first-page}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Website**, at i-click ang **Pages**.
2. I-click ang **Add Page** sa kanang-itaas na sulok.
3. Piliin ang **Blank** bilang uri ng pahina, ilagay ang "Home" bilang **Page Title**, at i-click ang **Save**.
4. I-click ang **Page Settings** sa row ng bagong pahina at palitan ang **URL Path** ng `/` (isang forward slash na walang ibang teksto) para sa home page mo. Ang ibang pahina ay gumagamit ng `/page-name`.
5. I-click ang **Edit Content** para magsimulang bumuo. Kailangang magsimula ang bawat pahina sa isang **Section** -- ito ang lalagyan ng lahat ng iba pang elemento. I-click ang **Add Content** at i-drag ang **Section** papunta sa pahina, pagkatapos pumili ng handang layout ng seksyon o **Blank Section**.
6. Pagkatapos magdagdag ng seksyon, i-click muli ang **Add Content** para maglagay ng teksto, larawan, video, card, form, at iba pa sa pamamagitan ng pag-drag sa mga ito papasok sa iyong seksyon.

:::info
Para sa detalyadong tagubilin sa paggawa ng mga pahina at navigation, tingnan ang [Managing Pages](./managing-pages.md). Para sa buong gabay sa visual editor, tingnan ang [Using the Page Editor](./page-editor.md).
:::

## Pag-configure ng Itsura ng Site {#configuring-site-appearance}

1. Sa Jump menu, piliin ang **Website > Appearance**.
2. Gamitin ang **Color Palette** para itakda ang brand color mo -- ang base na light, accent, at dark na shade, pati na ang primary at secondary na kulay ng button -- pagkatapos i-click ang **Save Palette**.
3. Sa ilalim ng **Fonts**, piliin ang heading at body font mo mula sa font browser at i-click ang **Save Fonts**.
4. I-upload ang logo ng simbahan mo sa ilalim ng **Logo** sa Style Settings. Magbigay ng bersyong light background at dark background, pagkatapos i-click ang **Save Changes**.
5. I-click ang **Site Footer** para buksan ang footer sa block editor at idagdag ang contact information at mga link ng simbahan mo.

:::info
Nalalapat sa buong website mo ang mga pagbabagong gagawin mo sa Appearance. Tingnan ang pahinang [Appearance](./appearance.md) para sa detalyadong tagubilin sa bawat setting.
:::

## Pag-set Up ng Navigation {#setting-up-navigation}

Lumalabas ang iyong mga navigation link sa Website Pages view. Para ayusin ang mga ito:

1. Sa panel na **Main Navigation**, i-click ang **Add**, ilagay ang **Link Text** at path ng pahina (halimbawa, `/about`) bilang **URL**, at i-click ang **Save**.
2. I-drag at i-drop ang mga link para muling ayusin ang mga ito o i-nest sa ilalim ng mga parent item.
3. I-preview ang iyong site para tiyaking tama ang itsura ng navigation.

## Mga Susunod na Hakbang {#next-steps}

- [Managing Pages](./managing-pages.md) -- Alamin nang detalyado kung paano gumana sa mga pahina at navigation
- [Appearance](./appearance.md) -- Pinuhin ang mga kulay, font, at layout ng iyong site
- [Files](./files.md) -- Mag-upload ng mga larawan at dokumento para sa iyong website
