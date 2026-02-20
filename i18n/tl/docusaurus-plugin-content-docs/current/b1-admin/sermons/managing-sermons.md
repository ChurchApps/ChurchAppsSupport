---
title: "Pamamahala ng mga Sermon"
---

# Pamamahala ng mga Sermon

<div class="article-intro">

Ang pahina ng Mga Sermon ay nagpapakita ng inyong buong sermon library. Mula rito maaari kayong magdagdag ng mga bagong sermon, mag-edit ng mga kasalukuyang entry, at ayusin ang inyong content ayon sa playlist. Bawat sermon ay maaaring mag-link sa video o audio na naka-host sa YouTube, Vimeo, Facebook, o custom na URL.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **contentApi.streamingServices.edit** na pahintulot. Tingnan ang [Mga Tungkulin at Pahintulot](../settings/roles-permissions.md) kung wala kang access.
- Gumawa ng kahit isang [playlist](playlists) para ayusin ang inyong mga sermon
- Ihanda ang inyong mga video ID o URL mula sa YouTube, Vimeo, o Facebook

</div>

## Pagtingin ng Inyong Sermon Library

1. Sa B1 Admin, i-click ang **Sermons** sa kaliwang sidebar.
2. Ipinapakita ng pahina ng Sermons ang lahat ng inyong sermon entry, na nakaayos ayon sa playlist. Ipinapakita ng bawat sermon ang thumbnail, pamagat, at petsa nito.
3. I-click ang anumang sermon para tingnan o i-edit ang mga detalye nito.

## Pagdagdag ng Sermon

1. I-click ang **Add Sermon** button sa kanang sulok sa itaas at piliin ang **Add Sermon** mula sa dropdown.
2. Pumili ng **Playlist** para i-assign ang sermon.
3. Piliin ang inyong **Video Provider** -- YouTube, Vimeo, Facebook, o Custom URL. Inirerekomenda namin ang YouTube dahil pinakamaganda itong gumagana sa B1 system.
4. Ilagay ang video ID o URL at i-click ang **Fetch**. Para sa YouTube, ang video ID ay ang string ng mga character pagkatapos ng `v=` sa YouTube URL.
5. Kapag na-click ninyo ang **Fetch**, awtomatikong nai-import ang mga detalye ng sermon, kabilang ang petsa ng paglalathala, tagal, pamagat, paglalarawan, at thumbnail.
6. Gumawa ng anumang mga pagbabago na gusto ninyo at i-click ang **Save**.

:::tip
Maaari rin kayong magdagdag ng permanenteng live stream URL sa pamamagitan ng pagpili ng **Add Permanent Live URL** mula sa **Add Sermon** dropdown. Gumagawa ito ng permanenteng koneksyon sa live stream ng inyong YouTube channel gamit ang inyong Channel ID. Tingnan ang [Live Streaming](live-streaming) para sa karagdagang detalye.
:::

## Pag-edit ng Sermon

1. I-click ang anumang sermon sa inyong library para buksan ang mga detalye nito.
2. I-update ang pamagat, tagapagsalita, petsa, paglalarawan, thumbnail, o mga media link kung kinakailangan.
3. I-click ang **Save** para i-apply ang inyong mga pagbabago.

## Mga Detalye ng Sermon

Bawat sermon entry ay maaaring magsama ng:

- **Pamagat** -- Ang pangalan ng sermon na ipinapakita sa mga bisita
- **Tagapagsalita** -- Sino ang nagbigay ng sermon
- **Petsa** -- Ang petsa ng paglalathala o paghahatid
- **Paglalarawan** -- Isang buod ng nilalaman ng sermon
- **Thumbnail** -- Isang preview na larawan na ipinapakita sa inyong sermon library
- **Mga Link ng Video/Audio** -- Mga URL patungo sa media ng sermon sa YouTube, Vimeo, Facebook, o custom na host

## Pag-schedule ng Sermon para sa Live Stream

Pagkatapos magdagdag ng sermon, maaari ninyo itong i-schedule para sa broadcast sa inyong live stream page:

1. Pumunta sa **Live Stream Times** tab.
2. I-edit ang isang serbisyo at sa ilalim ng **Video Settings**, piliin ang inyong sermon mula sa dropdown.
3. Ang sermon ay ipe-play sa naka-iskedyul na oras ng serbisyo.

:::info
Para sa pag-import ng maraming sermon nang sabay-sabay sa halip na isa-isang pagdagdag, gamitin ang [Bulk Import](bulk-import) tool para mag-pull ng mga video nang direkta mula sa inyong YouTube o Vimeo account.
:::

## Mga Susunod na Hakbang

- [Mga Playlist](playlists) -- Ayusin ang mga sermon sa mga serye
- [Live Streaming](live-streaming) -- I-configure ang inyong iskedyul ng streaming
- [Bulk Import](bulk-import) -- Mag-import ng maraming sermon nang sabay-sabay
