---
title: "Pamamahala ng Mga Sermon"
description: "Pamahalaan ang iyong sermon library sa B1 Admin: magdagdag ng mga sermon mula sa YouTube, Vimeo, o Facebook, mag-edit ng mga detalye, at makakuha ng podcast feed para sa iyong simbahan."
---

# Pamamahala ng Mga Sermon

<div class="article-intro">

Ipinapakita ng pahinang Sermons ang buong sermon library mo. Mula rito, maaari kang magdagdag ng mga bagong sermon, mag-edit ng umiiral na entry, at ayusin ang iyong content ayon sa playlist. Maaaring mag-link ang bawat sermon sa video o audio na naka-host sa YouTube, Vimeo, Facebook, o custom na URL.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng permiso na **Edit Services** sa seksyong **Content** ng iyong role. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung wala kang access.
- Gumawa ng kahit isang [playlist](./playlists.md) kung saan ayusin ang iyong mga sermon
- Ihanda ang iyong mga video ID o URL mula sa YouTube, Vimeo, o Facebook

</div>

## Pagtingin sa Iyong Sermon Library {#viewing-your-sermon-library}

1. Sa B1 Admin, buksan ang [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (ang search bar sa itaas-kaliwa), palawakin ang **Sermons**, at i-click ang **Sermons**.
2. Ipinapakita ng pahinang Sermons ang iyong mga sermon entry sa isang table, may **Playlist**, pamagat (**Sermon**), at **Publish Date** ng bawat sermon, mula sa pinakabago, kasama ang bilang gaya ng "11 of 11 sermons". I-type sa kahon na **Search sermons by title or playlist...** para i-filter ang listahan. Nakalista ang iyong mga playlist sa panel na **Playlists** sa tabi ng table, at nasa ibaba nito ang panel na **Podcast Feed**.
3. I-hover ang row ng isang sermon at i-click ang **Edit** para tingnan o i-edit ang mga detalye nito.

## Pagdaragdag ng Sermon {#adding-a-sermon}

1. I-click ang button na **Add Sermon** sa kanang-itaas at piliin ang **Add Sermon** mula sa dropdown. Magbubukas ang form na **Edit Sermon** sa itaas ng listahan.
2. Pumili ng **Playlist** kung saan ilalagay ang sermon (o iwan sa **None**).
3. Piliin ang iyong **Video Provider** -- **YouTube**, **Vimeo**, **Facebook**, o **Custom Embed Url**. Inirerekomenda namin ang YouTube dahil pinakamahusay itong gumagana sa sistema ng B1.
4. Ilagay ang **YouTube ID**, **Vimeo ID**, **Sermon ID** (Facebook), o **Sermon Embed Url** ng video. Maaari mong i-paste ang buong link ng video; ang ID lamang ang itatago ng B1. Para sa YouTube, ang video ID ay ang mga karakter na nasa likod ng `v=` sa YouTube URL.
5. Para sa YouTube at Vimeo, i-click ang **Fetch** para awtomatikong i-import ang mga detalye ng sermon, kabilang ang petsa ng publish, tagal, pamagat, paglalarawan, at thumbnail. Kung hindi ma-load ang mga detalye, may lalabas na mensahe at maaari mo itong punan nang mag-isa.
6. Gawin ang mga pagbabagong gusto mo at i-click ang **Save**.

:::tip
Maaari ka ring magdagdag ng permanenteng live stream URL sa pamamagitan ng pagpili sa **Add Permanent Live URL** mula sa dropdown na **Add Sermon**. Lumilikha ito ng tuloy-tuloy na koneksyon sa live stream ng iyong YouTube channel gamit ang iyong Channel ID. Tingnan ang [Live Streaming](./live-streaming.md) para sa higit pang detalye.
:::

## Pag-edit ng Sermon {#editing-a-sermon}

1. I-click ang **Edit** sa anumang row ng sermon sa iyong library para buksan ang mga detalye nito.
2. I-update ang pamagat, petsa, paglalarawan, thumbnail, tagal, o media links kung kinakailangan.
3. I-click ang **Save** para ilapat ang iyong mga pagbabago, o **Cancel** para isara ang form.

Para alisin ang sermon, buksan ito, i-click ang **Delete**, at kumpirmahin.

### Pagdaragdag ng Sermon sa Ibang Playlist {#adding-a-sermon-to-another-playlist}

Para ilista ang parehong sermon sa pangalawang playlist (halimbawa, sermon na kabilang sa isang series at sa koleksyong "Best Of"), buksan ang sermon, i-click ang **Add to another playlist**, piliin ang playlist, at i-click ang **Add**. Mag-iimbak ito ng kopya ng sermon sa playlist na iyon.

## Mga Detalye ng Sermon {#sermon-details}

Maaaring maglaman ang bawat sermon entry ng:

- **Playlist** -- Ang series na kinabibilangan ng sermon
- **Video Provider** at video ID -- Kung saan naka-host ang video ng sermon: YouTube, Vimeo, Facebook, o custom na embed URL
- **Publish Date** -- Ang petsa kung kailan ipino-publish ang sermon; ang mga sermon na walang petsa ay nagpapakita ng **Not scheduled** sa listahan
- **Total Sermon Duration** -- Ang haba ng sermon sa minuto at segundo
- **Thumbnail** -- Preview na larawang ipinapakita sa iyong sermon library. I-click ang larawan para i-crop o palitan ito (16:9).
- **Title** -- Ang pangalan ng sermon na nakikita ng mga bisita
- **Description** -- Buod ng nilalaman ng sermon
- **Audio File URL (for podcast)** -- Direktang link sa MP3/M4A file para sa sermon na ito. Maaari mong i-paste ang URL o, kapag na-save na ang sermon, i-click ang **Upload Audio** para mag-upload ng file at awtomatikong mapunan ito. Tanging ang mga sermon na may field na ito (o direktang link sa video file) ang kasama sa iyong podcast feed.

## Ang Iyong Podcast Feed {#your-podcast-feed}

Kapag may kahit isang sermon na may nakakabit na audio o video file, awtomatikong gumagawa ang B1 Admin ng podcast RSS feed para sa iyong simbahan -- wala kang kailangang i-on. Makikita ito sa panel na **Podcast Feed** sa tabi ng listahan ng sermon (sa ibaba ng panel na **Playlists**): i-click ang copy icon para kopyahin ang feed URL, pagkatapos i-submit ang URL na iyon sa Apple Podcasts, Spotify, o sa anumang iba pang podcast directory.

:::info
Ang mga sermon na naka-link lamang sa embedded player (gaya ng YouTube o Vimeo video ID) ay hindi lilitaw sa podcast feed -- kailangan ng mga podcast app ng direkta at madaling i-download na media file. Magdagdag ng **Audio File URL** para maisama ang isang sermon.
:::

## Pag-iiskedyul ng Sermon para sa Live Stream {#scheduling-a-sermon-for-live-stream}

Pagkatapos magdagdag ng sermon, maaari mo itong iiskedyul para sa broadcast sa iyong live stream page:

1. Sa Jump menu, piliin ang **Sermons > Live Stream Times**.
2. I-edit ang isang serbisyo at sa ilalim ng **Video Settings**, piliin ang iyong sermon mula sa dropdown na **Sermon**.
3. Ipe-play ang sermon sa nakatakdang oras ng serbisyo.

:::info
Para mag-import ng maraming sermon nang sabay-sabay sa halip na isa-isang idagdag, gamitin ang [Bulk Import](./bulk-import.md) para kunin nang direkta ang mga video mula sa iyong YouTube o Vimeo account.
:::

## Mga Susunod na Hakbang {#next-steps}

- [Playlists](./playlists.md) -- Ayusin ang mga sermon sa mga series
- [Live Streaming](./live-streaming.md) -- I-configure ang iyong iskedyul ng streaming
- [Bulk Import](./bulk-import.md) -- Mag-import ng maraming sermon nang sabay-sabay
