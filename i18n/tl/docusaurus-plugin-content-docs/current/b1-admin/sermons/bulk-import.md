---
title: "Maramihang Pag-import"
---

# Maramihang Pag-import

<div class="article-intro">

Hinahayaan ka ng pahinang Bulk Import na mabilis na punan ang iyong sermon library sa pamamagitan ng pag-import ng mga video mula sa YouTube o Vimeo. Ito ang pinakamabilis na paraan para dalhin ang umiiral mong nilalaman ng sermon, sa halip na magdagdag ng bawat video nang isa-isa.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ang pahintulot na **contentApi.streamingServices.edit**. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung wala kang access.
- Gumawa ng kahit isang [playlist](playlists) para doon i-import ang iyong mga sermon
- Ihanda ang iyong YouTube Channel ID o impormasyon ng iyong Vimeo account

</div>

## Pagpili ng Iyong Source

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), buksan ang **Sermons**, at i-click ang **Sermons**. I-click ang **Add Sermon** at piliin ang **Bulk Import** mula sa menu.
2. Sa ilalim ng **Choose Import Source**, makikita mo ang dalawang opsyon:
   - **YouTube** -- Mag-import ng mga video mula sa isang YouTube channel
   - **Vimeo** -- Mag-import ng mga video mula sa isang Vimeo account
3. I-click ang opsyon para sa platform kung saan naka-host ang iyong mga sermon (o i-click ang **Import from YouTube** / **Import from Vimeo** sa ilalim ng paglalarawan nito). I-click ang **Back** sa itaas ng pahina para bumalik sa pagpili ng source.

:::tip
Maaari kang bumalik at magpalit ng source anumang oras kung may mga video ka sa parehong platform.
:::

## Bago Ka Mag-import

Bago mag-import ng mga video, kailangan mo ng kahit isang playlist para pagsamahin-samahin ang mga ito. Kung wala ka pang nagawang playlist:

1. Bumalik sa pahinang **Sermons** at hanapin ang panel na **Playlists**.
2. I-click ang **Create First Playlist** at punan ang pangalan, paglalarawan, petsa ng paglalathala, at thumbnail.
3. I-click ang **Save**, pagkatapos bumalik sa Bulk Import sa pamamagitan ng pag-click sa **Add Sermon** at pagpili sa **Bulk Import**.

Tingnan ang [Playlists](playlists) para sa detalyadong tagubilin sa paggawa at pamamahala ng mga playlist.

## Pag-import ng mga Video

1. Pagkatapos piliin ang YouTube o Vimeo, ilagay ang iyong **YouTube Channel ID** o **impormasyon ng Vimeo account** sa field na ibinigay.
2. I-click ang button na **Fetch** para kunin ang lahat ng available na video mula sa iyong channel o account.
3. Pagkatapos ng fetch, makikita mo ang listahan ng lahat ng iyong video na may mga checkbox.
4. Lagyan ng check ang mga kahon sa tabi ng mga video na gusto mong i-import. Maaari mong piliin ang lahat o ang mga partikular lamang.
5. Opsyonal na i-enable ang **Auto Import New Videos** para awtomatikong idagdag sa iyong library ang mga bagong upload sa hinaharap.
6. I-click ang dropdown na **Import Into Playlist** para piliin kung aling playlist dapat idagdag ang mga video na ito.
7. I-click ang button na **Import** para makumpleto ang bulk import.

Ii-import ang iyong mga video kasama ang lahat ng detalye nito, kabilang ang mga pamagat, paglalarawan, petsa, at thumbnail. Ang mga espesyal na character sa mga pamagat at paglalarawan sa YouTube, tulad ng `&`, apostrophe, at quotation mark, ay lumilitaw nang eksakto gaya ng pagkakasulat, sa halip na bilang mga code tulad ng `&amp;`.

:::info
Ang bulk import ay mainam para sa pagsisimula kapag lumilipat ka mula sa ibang platform. Para sa pagdaragdag ng indibidwal na sermon sa hinaharap, gamitin ang pahinang [Managing Sermons](managing-sermons) sa halip.
:::

## Mga Susunod na Hakbang

- [Managing Sermons](managing-sermons) -- I-edit ang mga detalye ng sermon na na-import
- [Playlists](playlists) -- Gumawa at pamahalaan ang mga sermon series
- [Live Streaming](live-streaming) -- I-set up ang live streaming para sa iyong mga serbisyo
