---
title: "Managing Sermons"
---

# Managing Sermons

<div class="article-intro">

Ang Sermons page ay nagpapakita ng iyong buong sermon library. Mula dito maaari kang magdagdag ng bagong sermon, mag-edit ng existing entry, at ayusin ang iyong content ng playlist. Bawat sermon ay maaaring nag-link sa video o audio na naka-host sa YouTube, Vimeo, Facebook, o isang custom URL.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Kailangan mo ng **contentApi.streamingServices.edit** permission. Tingnan ang [Roles & Permissions](../settings/roles-permissions.md) kung walang access.
- Lumikha ng hindi bababa sa isa na [playlist](playlists) upang ayusin ang iyong sermon
- Handa ang iyong video ID o URL mula sa YouTube, Vimeo, o Facebook

</div>

## Pagtingin ng Iyong Sermon Library

1. Sa B1 Admin, buksan ang **section menu** sa top-left corner (ang pangalan ng section na may maliit na arrow) at piliin ang **Sermons**.
2. Ang Sermons page ay nagpapakita ng lahat ng iyong sermon entry, organized ng playlist. Bawat sermon ay nagpapakita ng thumbnail, title, at petsa.
3. I-click ang anumang sermon upang tingnan o i-edit ang detalye nito.

## Pagdadagdag ng Sermon

1. I-click ang **Add Sermon** button sa top right corner at piliin ang **Add Sermon** mula sa dropdown.
2. Piliin ang **Playlist** upang italang ang sermon.
3. Pumili ng iyong **Video Provider** -- YouTube, Vimeo, Facebook, o Custom URL. Inirerekomenda namin ang YouTube dahil ito ay gumagana nang pinakamahusay sa B1 system.
4. Ipasok ang video ID o URL at i-click ang **Fetch**. Para sa YouTube, ang video ID ay ang string ng character pagkatapos ng `v=` sa YouTube URL.
5. Kapag i-click mo ang **Fetch**, ang sermon detail ay idi-import nang awtomatiko, kasama ang publish date, duration, title, paglalarawan, at thumbnail.
6. Gumawa ng anumang pagbabago na gusto at i-click ang **Save**.

:::tip
Maaari mo ring magdagdag ng permanent live stream URL sa pamamagitan ng pagpili ng **Add Permanent Live URL** mula sa **Add Sermon** dropdown. Lumilikha ito ng persistent na koneksyon sa iyong YouTube channel's live stream gamit ang iyong Channel ID. Tingnan ang [Live Streaming](live-streaming) para sa higit pang detalye.
:::

## Pag-edit ng Sermon

1. I-click ang anumang sermon sa iyong library upang buksan ang detalye nito.
2. I-update ang title, speaker, petsa, paglalarawan, thumbnail, o media link kung kinakailangan.
3. I-click ang **Save** upang ilapat ang iyong mga pagbabago.

## Sermon Detail

Bawat sermon entry ay maaaring kasama ang:

- **Title** -- Ang pangalan ng sermon na ipinakita sa bisita
- **Speaker** -- Sino ang nag-deliver ng sermon
- **Date** -- Ang publish o delivery date
- **Description** -- Isang buod ng sermon content
- **Thumbnail** -- Isang preview image na ipinakita sa iyong sermon library
- **Video/Audio Link** -- URL sa sermon media sa YouTube, Vimeo, Facebook, o isang custom host

## Pag-schedule ng Sermon para sa Live Stream

Pagkatapos magdagdag ng sermon, maaari mo itong i-schedule para sa broadcast sa iyong live stream page:

1. Pumunta sa **Live Stream Times** tab.
2. I-edit ang isang service at sa ilalim ng **Video Setting**, piliin ang iyong sermon mula sa dropdown.
3. Ang sermon ay maglalaro sa scheduled service time.

:::info
Para sa pag-import ng maraming sermon nang sabay-sabay sa halip na isa-isang, gamitin ang [Bulk Import](bulk-import) tool upang hilahin ang video direkta mula sa iyong YouTube o Vimeo account.
:::

## Susunod na Hakbang

- [Playlists](playlists) -- Ayusin ang sermon sa series
- [Live Streaming](live-streaming) -- I-configure ang iyong streaming schedule
- [Bulk Import](bulk-import) -- I-import ang maraming sermon nang sabay-sabay
