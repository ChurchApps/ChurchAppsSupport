---
title: "Pamamahala ng mga Sermon"
---

# Pamamahala ng mga Sermon

<div class="article-intro">

Ipinapakita ng pahina ng Sermons ang buong library ng inyong mga sermon. Dito maaari kayong magdagdag ng bagong sermon, mag-edit ng mga kasalukuyang entry, at ayusin ang inyong nilalaman ayon sa playlist. Ang bawat sermon ay maaaring i-link sa video o audio na naka-host sa YouTube, Vimeo, Facebook, o sa custom na URL.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan ninyo ang pahintulot na **contentApi.streamingServices.edit**. Tingnan ang [Mga Role at Pahintulot](../settings/roles-permissions.md) kung wala kayong access.
- Gumawa ng kahit isang [playlist](playlists) na paglalagyan ng inyong mga sermon
- Ihanda ang inyong mga video ID o URL mula sa YouTube, Vimeo, o Facebook

</div>

## Pagtingin sa Inyong Library ng mga Sermon

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa kaliwang itaas), i-expand ang **Sermons**, at i-click ang **Sermons**.
2. Ipinapakita ng pahina ng Sermons ang lahat ng inyong sermon entry, nakaayos ayon sa playlist. Ipinapakita ng bawat sermon ang thumbnail, pamagat, at petsa nito.
3. I-click ang anumang sermon para tingnan o i-edit ang mga detalye nito.

## Pagdaragdag ng Sermon

1. I-click ang button na **Add Sermon** sa kanang itaas na sulok at piliin ang **Add Sermon** mula sa dropdown.
2. Pumili ng **Playlist** kung saan ilalagay ang sermon.
3. Piliin ang inyong **Video Provider** -- YouTube, Vimeo, Facebook, o Custom URL. Inirerekomenda namin ang YouTube dahil ito ang pinakamahusay gumana sa sistema ng B1.
4. Ilagay ang video ID o URL at i-click ang **Fetch**. Para sa YouTube, ang video ID ay ang mga karakter na kasunod ng `v=` sa YouTube URL.
5. Kapag na-click ninyo ang **Fetch**, awtomatikong ii-import ang mga detalye ng sermon, kasama ang petsa ng pag-publish, haba, pamagat, paglalarawan, at thumbnail.
6. Gawin ang anumang pagbabagong nais ninyo at i-click ang **Save**.

:::tip
Maaari rin kayong magdagdag ng permanenteng URL ng live stream sa pamamagitan ng pagpili sa **Add Permanent Live URL** mula sa dropdown na **Add Sermon**. Gumagawa ito ng tuloy-tuloy na koneksyon sa live stream ng inyong YouTube channel gamit ang inyong Channel ID. Tingnan ang [Live Streaming](live-streaming) para sa karagdagang detalye.
:::

## Pag-edit ng Sermon

1. I-click ang anumang sermon sa inyong library para buksan ang mga detalye nito.
2. I-update ang pamagat, tagapagsalita, petsa, paglalarawan, thumbnail, o mga media link ayon sa kailangan.
3. I-click ang **Save** para i-apply ang inyong mga pagbabago.

## Mga Detalye ng Sermon

Maaaring maglaman ang bawat sermon entry ng:

- **Title** -- Ang pangalan ng sermon na makikita ng mga bisita
- **Speaker** -- Kung sino ang nagbahagi ng sermon
- **Date** -- Ang petsa ng pag-publish o pagbabahagi
- **Description** -- Buod ng nilalaman ng sermon
- **Thumbnail** -- Larawang preview na makikita sa inyong library ng sermon
- **Video/Audio Links** -- Mga URL ng media ng sermon sa YouTube, Vimeo, Facebook, o custom na host
- **Audio File URL (for podcast)** -- Direktang link sa MP3/M4A file para sa sermon na ito. Maaari kayong mag-paste ng URL o i-click ang **Upload Audio** para mag-upload ng file at awtomatikong mapunan ito. Tanging ang mga sermon na may ganitong field (o direktang link ng video file) ang isinasama sa inyong podcast feed.

## Ang Inyong Podcast Feed

Kapag may kahit isang sermon nang may nakakabit na audio o video file, awtomatikong gumagawa ang B1 Admin ng podcast RSS feed para sa inyong simbahan -- walang kailangang i-on. Makikita ito sa panel na **Podcast Feed** sa ibaba ng listahan ng sermon: i-click ang copy icon para kopyahin ang URL ng feed, saka isumite ang URL na iyon sa Apple Podcasts, Spotify, o anumang ibang podcast directory.

:::info
Ang mga sermon na naka-link lamang sa embedded player (tulad ng YouTube o Vimeo video ID) ay hindi lalabas sa podcast feed -- kailangan ng mga podcast app ang direktang media file na maaaring i-download. Magdagdag ng **Audio File URL** para maisama ang isang sermon.
:::

## Pag-iskedyul ng Sermon para sa Live Stream

Pagkatapos magdagdag ng sermon, maaari ninyo itong i-iskedyul para i-broadcast sa inyong pahina ng live stream:

1. Sa Jump menu, piliin ang **Sermons > Live Stream Times**.
2. I-edit ang isang service at sa ilalim ng **Video Settings**, piliin ang inyong sermon mula sa dropdown.
3. Ipapalabas ang sermon sa itinakdang oras ng service.

:::info
Para mag-import ng maraming sermon nang sabay-sabay sa halip na isa-isang idagdag, gamitin ang tool na [Bulk Import](bulk-import) para direktang kunin ang mga video mula sa inyong YouTube o Vimeo account.
:::

## Mga Susunod na Hakbang

- [Mga Playlist](playlists) -- Ayusin ang mga sermon sa mga serye
- [Live Streaming](live-streaming) -- I-configure ang inyong iskedyul ng streaming
- [Bulk Import](bulk-import) -- Mag-import ng maraming sermon nang sabay-sabay
