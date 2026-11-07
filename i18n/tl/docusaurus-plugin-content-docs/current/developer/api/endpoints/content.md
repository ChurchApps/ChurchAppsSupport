---
title: "Mga Endpoint ng Content"
description: "Sanggunian ng endpoint para sa ChurchApps Content API: website page, blog post, redirect, sermon, event, file, Bible lookup, at kanta sa B1 Admin."
---

# Mga Endpoint ng Content

<div class="article-intro">

Pinamamahalaan ng Content module ang mga pahina ng website, seksyon, elemento, block, blog post, redirect, sermon, playlist, streaming service, event, curated na kalendaryo, file, galeriya, mga salin ng Bible at paghahanap ng talata, kanta, arrangement, pandaigdigang estilo, stock photo, at mga setting. Ito ang pinakamalaking module sa API at pinapagana nito ang CMS, media at streaming, pagpaplano ng pagsamba, at mga tampok ng Bible sa lahat ng ChurchApps application.

</div>

**Batayang path:** `/content`

## Mga Pahina

Batayang path: `/content/pages`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | I-load ang buong page tree (mga seksyon, elemento, block) gamit ang URL o ID. Tinatanggal ang mga internal na ID kapag URL ang ginamit sa pagkuha. Ang mga pagkuha gamit ang URL ay sumusunod sa `pages.visibility`. Ang pahinang may restriksyon ay nagbabalik ng `{ restricted: true, visibility }` maliban kung natutugunan ng (opsyonal) JWT ang restriksyon |
| GET | `/public/:churchId` | Public | — | Ilista ang mga pampublikong pahina (`url`, `title`, `metaDescription`); `visibility = everyone` lamang |
| GET | `/:id` | JWT | — | Kunin ang pahina gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng pahina ng simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang pahina kasama ang lahat ng seksyon at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | I-save ang pahinang ginawa ng AI (pahina, mga seksyon, at mga elemento sa iisang call) |
| POST | `/importTree` | JWT | Content.Edit | Gumawa ng pahina mula sa nested na tree (`title`, `url`, `sections[].elements[]…`). Palaging ipinapasok sa ilalim ng simbahan ng tumatawag; hindi pinapansin ang mga ID sa body. Dapat isama ang mga `column` child ng mga row. Pinakamataas na 30 seksyon / 500 elemento |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang pahina |

### Halimbawa: I-load ang Page Tree

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Mga Seksyon

Batayang path: `/content/sections`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang seksyon gamit ang ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Kopyahin ang seksyon o gawing reusable na block |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga seksyon (batch). Awtomatikong ina-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang seksyon (awtomatikong ina-update ang sort order) |

## Mga Elemento

Batayang path: `/content/elements`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang elemento gamit ang ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang elemento kasama ang lahat ng child nito |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga elemento (batch). Awtomatikong pinamamahalaan ang row column at carousel slide |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang elemento |

## Mga Block

Batayang path: `/content/blocks`

Pinalawak mula sa standard na CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class, na may pahintulot na Content.Edit para sa pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang block gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng block |
| GET | `/:churchId/tree/:id` | Public | — | I-load ang buong block tree na may mga seksyon at elemento |
| GET | `/blockType/:blockType` | JWT | — | I-load ang mga block ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | I-load ang footer block tree ng isang simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga block |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang block |

## Mga Link

Batayang path: `/content/links`

Pinalawak mula sa standard na CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class, na may pahintulot na Content.Edit para sa pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang link gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng link. Opsyonal ang filter na `?category=`. Awtomatikong nag-aayos pagkatapos mag-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | I-load ang mga link na sinala ayon sa visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | I-load ang mga link ng simbahan ayon sa kategorya (pampubliko) |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga link (batch). Awtomatikong nag-aayos ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang link |

## Pandaigdigang Estilo

Batayang path: `/content/globalStyles`

Pinalawak mula sa standard na CRUD (POST `/`, DELETE `/:id` mula sa base class, na may pahintulot na Content.Edit para sa pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | I-load ang pandaigdigang estilo ng simbahan (nagbabalik ng default kung walang nakatakda) |
| GET | `/` | JWT | — | I-load ang pandaigdigang estilo ng naka-authenticate na simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng pandaigdigang estilo |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang pandaigdigang estilo |

## Kasaysayan ng Pahina

Batayang path: `/content/pageHistory`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga entry sa kasaysayan ng isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga entry sa kasaysayan ng isang block |
| GET | `/:id` | JWT | Content.Edit | Kunin ang entry sa kasaysayan gamit ang ID |
| POST | `/` | JWT | Content.Edit | I-save ang snapshot ng pahina/block. Pana-panahong nililinis ang mga entry na mas matanda sa 30 araw |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang pahina/block mula sa snapshot ng kasaysayan (binubura ang kasalukuyang content at muling ginagawa mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa inline na snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Mga Post (Blog)

Batayang path: `/content/posts`

Ang mga blog post ay mga hiwalay na row: `title`, `slug` (natatangi bawat simbahan), `excerpt`, `content` (markdown na katawan), `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Ang post ay nai-publish kapag nakatakda na ang `publishDate` at nasa nakaraan na. Dinadagdagan ng mga read endpoint ang bawat post ng `authorName` na kinuha mula sa `authorId`. Tingnan ang [Arkitektura ng Website Builder](../../architecture/website-builder.md#blog).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Ilista ang mga nai-publish na post, may pagination (pinakamataas na 50 bawat pahina) |
| GET | `/public/:churchId/categories` | Public | — | Mga natatanging kategorya sa mga nai-publish na post |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang nai-publish na post gamit ang slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed ng mga nai-publish na post (ang mga link ay binubuo bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Kunin ang post gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng post ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang post |

## Mga Redirect

Batayang path: `/content/redirects`

Mga URL redirect bawat simbahan (`fromPath` → `toPath`), hanggang 200 bawat simbahan. Ang mga path ay ina-normalize (naka-lowercase, may leading slash, walang trailing slash) at natatangi ang `fromPath` bawat simbahan. Ni-re-resolve ito ng B1App kapag may 404 at nagpapadala ng HTTP 308.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | I-resolve ang isang path (o ilista ang lahat ng redirect kapag inalis ang `path`) |
| GET | `/:id` | JWT | — | Kunin ang redirect gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng redirect ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga redirect. Tinatanggihan ang `fromPath = toPath` at ipinapatupad ang limitasyong 200 row |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang redirect |

## Mga Sermon

Batayang path: `/content/sermons`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Kunin ang halimbawang istruktura ng FreeShow playlist |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Kunin ang TV app wrapper na may mga sermon, lesson, at FreeShow source |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Kunin ang isang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Kunin ang lahat ng pampublikong playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng pampublikong sermon ng simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | I-load ang timeline data para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Public | — | Maghanap ng metadata ng sermon mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Gumawa ng mga mungkahi sa social media post gamit ang AI mula sa subtitle ng sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Gumawa ng outline ng lesson gamit ang AI mula sa URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa YouTube channel. Dine-decode ang mga HTML entity na ibinabalik ng search API ng YouTube sa mga pamagat at paglalarawan (tulad ng `&amp;` at `&#39;`) |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa Vimeo channel |
| GET | `/:id` | JWT | — | Kunin ang sermon gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga sermon. Tumatanggap ng array o iisang sermon object (palaging nagbabalik ng array); nagbabalik ng 400 ang walang laman na body. Sinusuportahan ang base64 na thumbnail upload |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang sermon |

### Halimbawa: Maghanap ng YouTube Sermon

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Mga Playlist

Batayang path: `/content/playlists`

Pinalawak mula sa standard na CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class, na may pahintulot na StreamingServices.Edit para sa pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang playlist gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng playlist |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng pampublikong playlist ng simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga playlist (batch, sinusuportahan ang base64 na thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang playlist |

## Mga Streaming Service

Batayang path: `/content/streamingServices`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Kunin ang naka-encrypt na host chat room ID para sa isang service |
| GET | `/` | JWT | — | Ilista ang lahat ng streaming service. Awtomatikong binubura ang mga nag-expire na hindi paulit-ulit na service at inuusad ang mga paulit-ulit |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang streaming service (binubura rin ang mga naka-block na IP) |

## Mga Event

Batayang path: `/content/events`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | I-load ang timeline event ng isang grupo (kasama ang mga exception date, para malaktawan ang mga binurang occurrence) |
| GET | `/timeline?eventIds=` | JWT | — | I-load ang timeline event para sa mga grupo ng kasalukuyang user (kasama ang mga exception date) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Mag-subscribe sa mga event bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Kunin ang mga event ng grupo (kasama ang mga exception date) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Kunin ang mga pampublikong event ng grupo |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang isang event para sa pampublikong pahina nito, kasama ang `roomNames` (mga kuwarto mula sa mga booking na hindi tinanggihan). Nagbabalik ng `null` para sa mga event na nakabinbin o tinanggihan, at para sa mga pribadong event na hindi tumatanggap ng registration |
| GET | `/public/:churchId/:id/ical` | Public | — | I-download ang iisang event bilang `.ics` file (`text/calendar`, may mga exception date na nailapat). `404` kapag nakatago ang event ayon sa parehong mga tuntunin |
| GET | `/:id` | JWT | — | Kunin ang event gamit ang ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga event (batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o group leader | Burahin ang event at ang mga booking nito. Maaaring burahin ito ng mga leader ng grupo ng event, at maaaring bawiin ng humihiling ang sarili nilang nakabinbing kahilingan |

Kasama sa mga record ng event ang `photoUrl` (ang 16:9 na larawan ng event na ipinapakita sa pampublikong pahina ng event at sa mga tile ng paparating na event), `tags` (pinaghihiwalay ng kuwit, ginagamit ng tag filter ng Calendar element ng website), at `notesViewRole` / `notesPostRole` (`staff` kapag `null`, `leaders`, o `members`), na kumokontrol sa `eventNote` conversation ng event. Tingnan ang [Kontrol sa access ng mga tala ng grupo at event](./messaging.md#group-and-event-notes-access-control). Kasama rin sa mga pampublikong tugon ng curated event ang `photoUrl` at `tags` ng bawat event.

## Mga Eksepsyon sa Event

Batayang path: `/content/eventExceptions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang exception ng event gamit ang ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, o group leader | Gumawa o mag-update ng mga exception ng event (batch). Maaari lamang magdagdag ng exception ang mga leader para sa mga event sa mga grupong pinamumunuan nila |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o group leader | Burahin ang exception ng event |

## Mga Curated na Kalendaryo

Batayang path: `/content/curatedCalendars`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang curated na kalendaryo gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated na kalendaryo |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated na kalendaryo (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang curated na kalendaryo |

## Mga Curated na Event

Batayang path: `/content/curatedEvents`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kunin ang mga curated na event ng isang kalendaryo (kasama ang detalye ng event at mga exception date maliban kung may `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Kunin ang mga pampublikong curated na event ng isang kalendaryo |
| GET | `/:id` | JWT | — | Kunin ang curated na event gamit ang ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated na event |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated na event. Sinusuportahan ang array na `eventIds` para magdagdag ng mga partikular na event ng grupo |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang curated na event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang partikular na event sa curated na kalendaryo |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng event ng isang grupo sa curated na kalendaryo |

## Mga File

Batayang path: `/content/files`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Kunin ang mga file ayon sa uri ng content at ID ng content |
| GET | `/` | JWT | — | Ilista ang lahat ng file para sa website ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang file gamit ang ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Pinapayagan din kung miyembro ang user ng grupong tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Kumuha ng pre-signed na S3 upload URL. *Pinapayagan din para sa mga miyembro ng grupo. Pinakamataas na 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Burahin ang file at alisin sa storage. *Pinapayagan din para sa mga miyembro ng grupo |

## Galeriya

Batayang path: `/content/gallery`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga larawan sa galeriya sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Kumuha ng pre-signed na S3 upload URL para sa larawan sa galeriya |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Burahin ang larawan sa galeriya |

## Mga Bible

Batayang path: `/content/bibles`

Lahat ng endpoint ng Bible ay pampubliko (walang kinakailangang authentication). Kinukuha ang data mula sa mga panlabas na pinagmulan at iniimbak sa cache nang lokal. Ang mga request sa api.bible ay nag-e-expire pagkalipas ng 15 segundo; ang timeout ay nagbabalik ng **504**.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Ilista ang lahat ng salin ng Bible (kumukuha mula sa pinagmulan kung walang laman ang cache) |
| GET | `/stats?startDate=&endDate=` | Public | — | Kunin ang estadistika ng paghahanap sa Bible para sa isang petsa |
| GET | `/availableTranslations/:source` | Public | — | Ilista ang mga available na salin mula sa isang pinagmulan (hal. api.bible) |
| GET | `/updateTranslations` | Public | — | I-sync ang lahat ng salin mula sa lahat ng pinagmulan |
| GET | `/updateTranslations/:source` | Public | — | I-sync ang mga salin mula sa isang partikular na pinagmulan |
| GET | `/updateCopyrights` | Public | — | I-update ang impormasyon ng copyright para sa mga salin na wala nito |
| GET | `/:translationKey/updateCopyright` | Public | — | I-update ang copyright ng isang partikular na salin |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Maghanap ng mga talata sa isang salin |
| GET | `/:translationKey/books` | Public | — | Kunin ang mga aklat ng isang salin (nagca-cache nang lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Kunin ang mga kabanata ng isang aklat (nagca-cache nang lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Kunin ang mga talata ng isang kabanata (nagca-cache nang lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Kunin ang teksto ng mga talata sa isang saklaw. Nagtatala ng mga paghahanap. Nilalampasan ng ilang salin ang cache dahil sa lisensya |

### Halimbawa: Kunin ang Teksto ng Talata

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Mga Kanta

Batayang path: `/content/songs`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Maghanap ng mga kanta ayon sa query |
| GET | `/:id` | JWT | — | Kunin ang kanta gamit ang ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng kanta |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga kanta (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga kanta mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang kanta |

## Mga Detalye ng Kanta

Batayang path: `/content/songDetails`

Global ang mga detalye ng kanta (hindi nakatali sa simbahan). Kinakatawan nito ang mga pamantayang metadata ng kanta na ibinabahagi ng mga simbahan.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang detalye ng kanta gamit ang ID (global) |
| GET | `/` | JWT | — | Ilista ang mga detalye ng kanta para sa simbahan |
| POST | `/create` | JWT | — | Gumawa ng detalye ng kanta mula sa PraiseCharts ID (nagbabalik ng umiiral na kung nagawa na). Awtomatikong kinukuha ang metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga detalye ng kanta (batch) |

## Mga Link ng Detalye ng Kanta

Batayang path: `/content/songDetailLinks`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang link ng detalye ng kanta gamit ang ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Kunin ang lahat ng link ng isang detalye ng kanta |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga link ng detalye ng kanta (batch). Awtomatikong kinukuha ang datos ng MusicBrainz kung naka-link |
| DELETE | `/:id` | JWT | — | Burahin ang link ng detalye ng kanta |

## Mga Arrangement

Batayang path: `/content/arrangements`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang arrangement gamit ang ID |
| GET | `/song/:songId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang kanta |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang detalye ng kanta |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Hanapin ang mga FreeShow ID na wala sa simbahan. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang arrangement (binubura rin ang mga key; binubura ang kanta kung wala nang arrangement na natitira) |

## Mga Key ng Arrangement

Batayang path: `/content/arrangementKeys`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Kunin ang key ng arrangement kasama ang buong datos ng kanta para sa presenter view |
| GET | `/:id` | JWT | — | Kunin ang key ng arrangement gamit ang ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Kunin ang mga key ng isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng key ng arrangement |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga key ng arrangement (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang key ng arrangement |

## Mga Setting

Batayang path: `/content/settings`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga setting ng kasalukuyang user |
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang mga pampublikong setting ng simbahan (ibinabalik bilang key-value pairs) |
| POST | `/my` | JWT | — | I-save ang mga setting sa antas ng user (sinusuportahan ang base64 na pag-upload ng larawan) |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting sa antas ng simbahan (sinusuportahan ang base64 na pag-upload ng larawan) |
| DELETE | `/my/:id` | JWT | — | Burahin ang setting ng user |

## Preview

Batayang path: `/content/preview`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | I-load ang datos ng streaming preview para sa simbahan gamit ang subdomain key (mga tab, link, service, sermon) |

## Galeriya (Mga Stock Photo)

Batayang path: `/content/stock`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Maghanap ng mga stock photo sa Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Batayang path: `/content/praiseCharts`

Integrasyon sa PraiseCharts para sa paghahanap ng kanta sa pagsamba at pag-download ng sheet music.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Kunin ang raw na datos ng PraiseCharts para sa kanta |
| GET | `/hasAccount` | JWT | — | Suriin kung may naka-link na PraiseCharts account ang user |
| GET | `/search?q=` | JWT | — | Maghanap sa katalogo ng PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Kunin ang mga produkto para sa kanta (mula sa library kung naka-authenticate, kung hindi ay mula sa katalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kunin ang raw na datos ng arrangement mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Mag-download ng file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Kunin ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Palitan ang OAuth verifier ng access token at i-save sa mga setting ng user |
| GET | `/library` | JWT | — | I-browse ang PraiseCharts library ng user |

## Support

Batayang path: `/content/support`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Arkitektura ng Website Builder](../../architecture/website-builder.md) -- Paano nagkakaugnay ang mga pahina, seksyon, elemento, post, at redirect sa iba't ibang app
- [Mga Endpoint ng Membership](./membership.md) -- Mga tao, simbahan, grupo, tungkulin, pahintulot
- [Mga Endpoint ng Attendance](./attendance.md) -- Pagsubaybay sa serbisyo at pagbisita
- [Authentication at Mga Pahintulot](./authentication.md) -- Daloy ng login, JWT, modelo ng pahintulot
- [Module Structure](../module-structure.md) -- Mga pattern ng organisasyon ng code
