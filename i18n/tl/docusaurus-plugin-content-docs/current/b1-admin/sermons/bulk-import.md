---
title: "Bulk Import"
description: "I-import nang sabayan ang mga sermon video mula sa YouTube channel o Vimeo account papunta sa B1 Admin, pagkatapos ayusin ang mga ito sa isang playlist."
---

# Bulk Import

<div class="article-intro">

Hinahayaan ka ng pahinang Bulk Import na mabilis na punan ang iyong sermon library sa pamamagitan ng pag-import ng mga video mula sa YouTube o Vimeo. Ito ang pinakamabilis na paraan para maidala ang umiiral mong sermon content, sa halip na idagdag ang bawat video nang isa-isa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Services** sa seksyong **Content** ng iyong role. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung wala kang access.
- Gumawa ng kahit isang [playlist](./playlists.md) kung saan i-import ang iyong mga sermon
- Ihanda ang iyong YouTube Channel ID o impormasyon ng Vimeo account

</div>

## Pagpili ng Source {#choosing-your-source}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Sermons**, at i-click ang **Sermons**. I-click ang **Add Sermon** at piliin ang **Bulk Import** mula sa menu.
2. Sa ilalim ng **Choose Import Source**, makikita mo ang dalawang opsyon:
   - **YouTube** -- Mag-import ng mga video mula sa YouTube channel
   - **Vimeo** -- Mag-import ng mga video mula sa Vimeo account
3. I-click ang opsyon ng platform kung saan naka-host ang iyong mga sermon (o i-click ang **Import from YouTube** / **Import from Vimeo** sa ibaba ng paglalarawan nito). I-click ang **Back** sa itaas ng pahina para bumalik sa pagpili ng source.

:::tip
Maaari kang bumalik at magpalit ng source anumang oras kung may mga video ka sa parehong platform.
:::

## Bago Ka Mag-import {#before-you-import}

Bago mag-import ng mga video, kailangan mo ng kahit isang playlist para pag-ayusin ang mga ito. Kung wala ka pang nagawang playlist:

1. Bumalik sa pahinang **Sermons** at hanapin ang panel na **Playlists**.
2. I-click ang **Create First Playlist** at punan ang pangalan, paglalarawan, petsa ng publish, at thumbnail.
3. I-click ang **Save**, pagkatapos bumalik sa Bulk Import sa pamamagitan ng pag-click sa **Add Sermon** at pagpili sa **Bulk Import**.

Tingnan ang [Playlists](./playlists.md) para sa detalyadong tagubilin sa paggawa at pamamahala ng mga playlist.

## Pag-import ng mga Video {#importing-videos}

1. Pagkatapos piliin ang YouTube o Vimeo, ilagay ang iyong **YouTube Channel ID** o **Vimeo Channel ID** sa field na nakalaan.
2. I-click ang button na **Fetch** para kunin ang mga video mula sa iyong channel. Kung hindi ma-load ang mga video o walang laman ang channel, may lalabas na mensahe; suriin ang ID at subukan ulit.
3. Pagkatapos ng fetch, makikita mo ang listahan ng iyong mga video, bawat isa ay may checkbox sa ilalim ng **Import**.
4. Lagyan ng check ang kahon sa tabi ng bawat video na gusto mong i-import.
5. I-click ang dropdown na **Import Into Playlist** para piliin kung aling playlist idadagdag ang mga video na ito.
6. I-click ang button na **Import** para makumpleto ang bulk import. Ibabalik ka sa pagpili ng source kapag natapos ito.

Kapag na-click mo ang **Import** nang hindi pumipili ng playlist o naglalagay ng check sa anumang video, hihilingin ng B1 na gawin mo muna ito. I-click ang **Cancel** para umalis nang hindi nag-iimport.

Ang iyong mga video ay ima-import kasama ang lahat ng detalye nila, kabilang ang mga pamagat, paglalarawan, petsa, at thumbnail. Ang mga espesyal na character sa mga pamagat at paglalarawan sa YouTube, gaya ng `&`, kudlit, at quotation mark, ay lalabas nang tulad ng pagkakasulat ng mga ito at hindi bilang mga code gaya ng `&amp;`.

:::info
Mainam ang bulk import para sa pagsisimula kapag lumilipat ka mula sa ibang platform. Para sa pagdaragdag ng mga indibidwal na sermon sa hinaharap, gamitin ang pahinang [Managing Sermons](./managing-sermons.md) sa halip.
:::

## Mga Susunod na Hakbang {#next-steps}

- [Managing Sermons](./managing-sermons.md) -- I-edit ang mga detalye ng na-import na sermon
- [Playlists](./playlists.md) -- Gumawa at pamahalaan ang mga sermon series
- [Live Streaming](./live-streaming.md) -- I-set up ang live streaming para sa iyong mga serbisyo
