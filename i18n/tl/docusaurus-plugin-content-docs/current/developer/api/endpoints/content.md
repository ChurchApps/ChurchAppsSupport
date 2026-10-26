---
title: "Mga Content Endpoint"
---

# Mga Content Endpoint

<div class="article-intro">

Pinamamahalaan ng Content module ang mga pahina ng website, seksyon, elemento, block, blog post, redirect, sermon, playlist, streaming service, event, curated calendar, file, gallery, Bible translation at paghahanap ng talata, awit, arrangement, global style, stock photo, at mga setting. Ito ang pinakamalaking module sa API at nagpapagana sa CMS, media/streaming, pagpaplano ng pagsamba, at mga feature ng Bible sa lahat ng ChurchApps application.

</div>

**Base path:** `/content`

## Mga Pahina

Base path: `/content/pages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Iload ang buong puno ng pahina (mga seksyon, elemento, block) ayon sa URL o ID. Tinatanggal ang mga internal na ID kapag kinuha sa pamamagitan ng URL. Ang mga fetch na batay sa URL ay sumusunod sa `pages.visibility` — ang pahinang may restriksyon ay nagbabalik ng `{ restricted: true, visibility }` maliban kung nasasatisfy ng (opsyonal na) JWT ang restriksyon |
| GET | `/public/:churchId` | Public | — | Ilista ang mga pampublikong pahina (`url`, `title`, `metaDescription`); `visibility = everyone` lamang |
| GET | `/:id` | JWT | — | Kunin ang isang pahina ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng pahina ng simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang pahina kasama ang lahat ng seksyon at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | I-save ang pahinang ginawa ng AI (pahina, seksyon, at elemento sa isang tawag) |
| POST | `/importTree` | JWT | Content.Edit | Gumawa ng pahina mula sa nested na puno (`title`, `url`, `sections[].elements[]…`). Palagi itong ipinapasok sa ilalim ng simbahan ng tumatawag; hindi pinapansin ang mga ID sa body. Dapat isama ng mga row ang kanilang mga `column` na child. Pinakamarami 30 seksyon / 500 elemento |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang pahina |

### Halimbawa: Iload ang Puno ng Pahina

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

Base path: `/content/sections`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang seksyon ayon sa ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Kopyahin ang isang seksyon o gawing reusable block |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga seksyon (batch). Awtomatikong ina-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang seksyon (awtomatikong ina-update ang sort order) |

## Mga Elemento

Base path: `/content/elements`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang elemento ayon sa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang elemento kasama ang lahat ng child nito |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga elemento (batch). Awtomatikong pinamamahalaan ang mga column ng row at mga slide ng carousel |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang elemento |

## Mga Block

Base path: `/content/blocks`

Nagmamana mula sa karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang block ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng block |
| GET | `/:churchId/tree/:id` | Public | — | Iload ang buong puno ng block na may mga seksyon at elemento |
| GET | `/blockType/:blockType` | JWT | — | Iload ang mga block ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Iload ang puno ng footer block para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga block |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang block |

## Mga Link

Base path: `/content/links`

Nagmamana mula sa karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang link ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng link. Opsyonal na filter na `?category=`. Awtomatikong nag-aayos pagkatapos mag-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Iload ang mga link na naka-filter ayon sa visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Iload ang mga link ng isang simbahan ayon sa kategorya (pampubliko) |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga link (batch). Awtomatikong nag-aayos ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang link |

## Global Style

Base path: `/content/globalStyles`

Nagmamana mula sa karaniwang CRUD (POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Iload ang global style ng isang simbahan (nagbabalik ng mga default kung walang nakatakda) |
| GET | `/` | JWT | — | Iload ang global style para sa naka-authenticate na simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng global style |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang global style |

## Kasaysayan ng Pahina

Base path: `/content/pageHistory`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang block |
| GET | `/:id` | JWT | Content.Edit | Kunin ang isang entry ng kasaysayan ayon sa ID |
| POST | `/` | JWT | Content.Edit | I-save ang snapshot ng pahina/block. Pana-panahong nililinis ang mga entry na mahigit 30 araw na ang tanda |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang pahina/block mula sa isang snapshot ng kasaysayan (binubura ang kasalukuyang content at muling ginagawa mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa isang inline na snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Mga Post (Blog)

Base path: `/content/posts`

Ang mga blog post ay standalone na row: `title`, `slug` (natatangi bawat simbahan), `excerpt`, `content` (markdown na katawan), `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Nai-publish ang isang post kapag nakatakda na ang `publishDate` at nasa nakaraan na. Dinadagdagan ng mga read endpoint ang bawat post ng `authorName` na kinuha mula sa `authorId`. Tingnan ang [Website Builder Architecture](../../architecture/website-builder#blog).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Ilista ang mga nai-publish na post, may pagination (pinakamarami 50 bawat pahina) |
| GET | `/public/:churchId/categories` | Public | — | Mga natatanging kategorya sa mga nai-publish na post |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang isang nai-publish na post ayon sa slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed ng mga nai-publish na post (ang mga link ay binubuo bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Kunin ang isang post ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng post ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang post |

## Mga Redirect

Base path: `/content/redirects`

Mga URL redirect bawat simbahan (`fromPath` → `toPath`), hanggang 200 bawat simbahan. Ginagawang normal ang mga path (naka-lowercase, may leading slash, walang trailing slash) at natatangi ang `fromPath` bawat simbahan. Nireresolba ito ng B1App kapag may 404 at naglalabas ng HTTP 308.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | I-resolve ang isang path (o ilista ang lahat ng redirect kapag walang `path`) |
| GET | `/:id` | JWT | — | Kunin ang isang redirect ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng redirect ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga redirect. Tinatanggihan ang `fromPath = toPath` at ipinapatupad ang limitasyong 200 row |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang redirect |

## Mga Sermon

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Kunin ang halimbawang istruktura ng FreeShow playlist |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Kunin ang TV app wrapper na may mga source ng sermon, lesson, at FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Kunin ang isang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Kunin ang lahat ng pampublikong playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng pampublikong sermon ng isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | Iload ang datos ng timeline para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Public | — | Maghanap ng metadata ng sermon mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Bumuo ng mga mungkahi sa social media post gamit ang AI mula sa mga subtitle ng sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Bumuo ng outline ng aralin gamit ang AI mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang YouTube channel. Dine-decode ang mga HTML entity na inilalagay ng search API ng YouTube sa mga pamagat at deskripsyon (gaya ng `&amp;` at `&#39;`) |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Kunin ang isang sermon ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga sermon. Tumatanggap ng array o isang sermon object (palaging nagbabalik ng array); nagbabalik ng 400 ang walang laman na body. Sinusuportahan ang base64 na thumbnail upload |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang isang sermon |

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

Base path: `/content/playlists`

Nagmamana mula sa karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may pahintulot na StreamingServices.Edit para sa mga pagsulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang playlist ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng playlist |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng pampublikong playlist ng isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga playlist (batch, sinusuportahan ang base64 na thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang isang playlist |

## Mga Streaming Service

Base path: `/content/streamingServices`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Kunin ang naka-encrypt na host chat room ID para sa isang service |
| GET | `/` | JWT | — | Ilista ang lahat ng streaming service. Awtomatikong nililinis ang mga hindi paulit-ulit na service na nag-expire at ina-advance ang mga paulit-ulit |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang isang streaming service (binubura rin ang mga naka-block na IP) |

## Mga Event

Base path: `/content/events`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Iload ang mga timeline event para sa isang grupo (kasama ang mga exception date, para maiwasan ang mga binurang occurrence) |
| GET | `/timeline?eventIds=` | JWT | — | Iload ang mga timeline event para sa mga grupo ng kasalukuyang user (kasama ang mga exception date) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Mag-subscribe sa mga event bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Kunin ang mga event ng isang grupo (kasama ang mga exception date) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Kunin ang mga pampublikong event ng isang grupo |
| GET | `/public/:churchId/:id` | Public | — | Kunin ang isang event para sa pampublikong pahina nito, kasama ang `roomNames` (mga kuwarto mula sa mga booking na hindi tinanggihan). Nagbabalik ng `null` para sa mga nakabinbin o tinanggihang event, at para sa mga pribadong event na hindi tumatanggap ng registration |
| GET | `/public/:churchId/:id/ical` | Public | — | I-download ang isang event bilang `.ics` file (`text/calendar`, na may nailapat na exception date). `404` kapag nakatago ang event ayon sa parehong mga patakaran |
| GET | `/:id` | JWT | — | Kunin ang isang event ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga event (batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o group leader | Burahin ang isang event at ang mga booking nito. Maaaring burahin ito ng mga leader ng grupo ng event, at maaaring bawiin ng humiling ang sarili nilang nakabinbing kahilingan |

Kasama sa mga record ng event ang `photoUrl` (ang 16:9 na larawan ng event na ipinapakita sa pampublikong pahina ng event at sa mga tile ng paparating na event), `tags` (pinaghihiwalay ng kuwit, ginagamit ng tag filter ng Calendar element ng website), at `notesViewRole` / `notesPostRole` (`staff` kapag `null`, `leaders`, o `members`), na nagbabantay sa conversation ng `eventNote` ng event — tingnan ang [Group and event notes access control](./messaging.md#group-and-event-notes-access-control). Kasama rin sa mga tugon ng public curated-event ang `photoUrl` at `tags` ng bawat event.

## Mga Exception ng Event

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang exception ng event ayon sa ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, o group leader | Gumawa o mag-update ng mga exception ng event (batch). Maaaring magdagdag ng exception ang mga leader para lamang sa mga event ng mga grupong pinamumunuan nila |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, o group leader | Burahin ang isang exception ng event |

## Mga Curated Calendar

Base path: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang curated calendar ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated calendar |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated calendar (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang curated calendar |

## Mga Curated Event

Base path: `/content/curatedEvents`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kunin ang mga curated event ng isang calendar (kasama ang detalye ng event at mga exception date maliban kung may `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Kunin ang mga pampublikong curated event ng isang calendar |
| GET | `/:id` | JWT | — | Kunin ang isang curated event ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated event |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated event. Sinusuportahan ang array na `eventIds` para magdagdag ng partikular na event ng grupo |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang curated event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang partikular na event sa isang curated calendar |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng event ng isang grupo sa isang curated calendar |

## Mga File

Base path: `/content/files`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Kunin ang mga file ayon sa content type at content ID |
| GET | `/` | JWT | — | Ilista ang lahat ng file para sa website ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang file ayon sa ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Pinapayagan din kung ang user ay miyembro ng grupong tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Kumuha ng pre-signed na S3 upload URL. *Pinapayagan din para sa mga miyembro ng grupo. Pinakamalaki 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Burahin ang isang file at alisin sa storage. *Pinapayagan din para sa mga miyembro ng grupo |

## Gallery

Base path: `/content/gallery`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga gallery image sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Kumuha ng pre-signed na S3 upload URL para sa isang gallery image |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Burahin ang isang gallery image |

## Mga Bible

Base path: `/content/bibles`

Lahat ng Bible endpoint ay pampubliko (walang kinakailangang authentication). Kinukuha ang datos mula sa mga external na pinagmulan at kinakatago nang lokal. Nagta-time out ang mga request sa api.bible pagkalipas ng 15 segundo; ang timeout ay nagbabalik ng **504**.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Ilista ang lahat ng Bible translation (kumukuha mula sa pinagmulan kung walang laman ang cache) |
| GET | `/stats?startDate=&endDate=` | Public | — | Kunin ang estadistika ng paghahanap sa Bible para sa isang saklaw ng petsa |
| GET | `/availableTranslations/:source` | Public | — | Ilista ang mga available na translation mula sa isang pinagmulan (hal. api.bible) |
| GET | `/updateTranslations` | Public | — | I-sync ang lahat ng translation mula sa lahat ng pinagmulan |
| GET | `/updateTranslations/:source` | Public | — | I-sync ang mga translation mula sa isang partikular na pinagmulan |
| GET | `/updateCopyrights` | Public | — | I-update ang impormasyon ng copyright para sa mga translation na walang nito |
| GET | `/:translationKey/updateCopyright` | Public | — | I-update ang copyright ng isang partikular na translation |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Maghanap ng mga talata sa isang translation |
| GET | `/:translationKey/books` | Public | — | Kunin ang mga aklat ng isang translation (kinakatago nang lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Kunin ang mga kabanata ng isang aklat (kinakatago nang lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Kunin ang mga talata ng isang kabanata (kinakatago nang lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Kunin ang teksto ng talata para sa isang saklaw. Nagtatala ng mga paghahanap. Ang ilang translation ay nilalampasan ang caching dahil sa lisensya |

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

## Mga Awit

Base path: `/content/songs`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Hanapin ang mga awit ayon sa query |
| GET | `/:id` | JWT | — | Kunin ang isang awit ayon sa ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng awit |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga awit (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga awit mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang awit |

## Mga Detalye ng Awit

Base path: `/content/songDetails`

Ang mga detalye ng awit ay pandaigdig (hindi nakatali sa simbahan). Kinakatawan ng mga ito ang mga pamantayang metadata ng awit na ibinabahagi sa mga simbahan.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang detalye ng awit ayon sa ID (pandaigdig) |
| GET | `/` | JWT | — | Ilista ang mga detalye ng awit para sa simbahan |
| POST | `/create` | JWT | — | Gumawa ng detalye ng awit mula sa PraiseCharts ID (nagbabalik ng umiiral na kung nagawa na). Awtomatikong kumukuha ng metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga detalye ng awit (batch) |

## Mga Link ng Detalye ng Awit

Base path: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang link ng detalye ng awit ayon sa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Kunin ang lahat ng link ng isang detalye ng awit |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga link ng detalye ng awit (batch). Awtomatikong kumukuha ng datos ng MusicBrainz kung may naka-link |
| DELETE | `/:id` | JWT | — | Burahin ang isang link ng detalye ng awit |

## Mga Arrangement

Base path: `/content/arrangements`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang arrangement ayon sa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang awit |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang detalye ng awit |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Hanapin ang mga FreeShow ID na wala sa simbahan. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang arrangement (binubura rin ang mga key; binubura ang awit kung wala nang natitirang arrangement) |

## Mga Arrangement Key

Base path: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Kunin ang arrangement key kasama ang buong datos ng awit para sa presenter view |
| GET | `/:id` | JWT | — | Kunin ang isang arrangement key ayon sa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Kunin ang mga key ng isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement key |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga arrangement key (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang arrangement key |

## Mga Setting

Base path: `/content/settings`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga setting ng kasalukuyang user |
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang mga pampublikong setting ng isang simbahan (ibinabalik bilang mga key-value pair) |
| POST | `/my` | JWT | — | I-save ang mga setting sa antas ng user (sinusuportahan ang base64 na pag-upload ng larawan) |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting sa antas ng simbahan (sinusuportahan ang base64 na pag-upload ng larawan) |
| DELETE | `/my/:id` | JWT | — | Burahin ang isang setting ng user |

## Preview

Base path: `/content/preview`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Iload ang datos ng streaming preview para sa isang simbahan ayon sa subdomain key (mga tab, link, serbisyo, sermon) |

## Gallery (Mga Stock Photo)

Base path: `/content/stock`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Maghanap ng mga stock photo sa Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

Integrasyon sa PraiseCharts para sa pagtuklas ng awit ng pagsamba at pag-download ng sheet music.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Kunin ang raw na datos ng PraiseCharts para sa isang awit |
| GET | `/hasAccount` | JWT | — | Suriin kung ang user ay may naka-link na PraiseCharts account |
| GET | `/search?q=` | JWT | — | Maghanap sa catalog ng PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Kunin ang mga produkto para sa isang awit (mula sa library kung naka-authenticate, kung hindi ay mula sa catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kunin ang raw na datos ng arrangement mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | I-download ang isang file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Kunin ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Palitan ang OAuth verifier ng access token at i-save sa mga setting ng user |
| GET | `/library` | JWT | — | I-browse ang library ng PraiseCharts ng user |

## Suporta

Base path: `/content/support`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Website Builder Architecture](../../architecture/website-builder) -- Paano nagkakaugnay ang mga pahina, seksyon, elemento, post, at redirect sa iba't ibang app
- [Membership Endpoints](./membership) -- Mga tao, simbahan, grupo, tungkulin, pahintulot
- [Attendance Endpoints](./attendance) -- Pagsubaybay ng serbisyo at pagbisita
- [Authentication & Permissions](./authentication) -- Daloy ng pag-login, JWT, modelo ng pahintulot
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
