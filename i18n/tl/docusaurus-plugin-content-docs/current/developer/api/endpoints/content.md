---
title: "Mga Content Endpoint"
---

# Mga Content Endpoint

<div class="article-intro">

Pinamamahalaan ng Content module ang mga pahina ng website, seksyon, elemento, block, blog post, redirect, sermon, playlist, streaming service, event, curated calendar, file, gallery, Bible translation at verse lookup, awit, arrangement, global style, stock photo, at settings. Ito ang pinakamalaking module sa API at pinapagana nito ang CMS, media/streaming, pagpaplano ng pagsamba, at mga feature ng Bible sa lahat ng ChurchApps application.

</div>

**Base path:** `/content`

## Mga Pahina

Base path: `/content/pages`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Publiko | — | I-load ang buong puno ng pahina (mga seksyon, elemento, block) ayon sa URL o ID. Tinatanggal ang mga internal ID kapag kinuha sa pamamagitan ng URL. Ipinapatupad ng mga URL-based fetch ang `pages.visibility` -- ang pahinang may gate ay nagbabalik ng `{ restricted: true, visibility }` maliban kung natutugunan ng (opsyonal) JWT ang gate |
| GET | `/public/:churchId` | Publiko | — | Ilista ang mga pampublikong pahina (`url`, `title`, `metaDescription`); `visibility = everyone` lamang |
| GET | `/:id` | JWT | — | Kunin ang pahina ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng pahina ng simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang pahina kasama ang lahat ng seksyon at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | I-save ang pahinang ginawa ng AI (pahina, seksyon, at elemento sa iisang tawag) |
| POST | `/importTree` | JWT | Content.Edit | Gumawa ng pahina mula sa nested na puno (`title`, `url`, `sections[].elements[]…`). Palaging nagpapasok sa ilalim ng simbahan ng tumatawag; hindi pinapansin ang mga id sa body. Dapat kasama ng mga row ang kanilang `column` na children. Pinakamarami 30 seksyon / 500 elemento |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang pahina |

### Halimbawa: Pag-load ng Puno ng Pahina

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

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang seksyon ayon sa ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Kopyahin ang seksyon o gawing reusable na block |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga seksyon (batch). Awtomatikong ina-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang seksyon (awtomatikong ina-update ang sort order) |

## Mga Elemento

Base path: `/content/elements`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang elemento ayon sa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang elemento kasama ang lahat ng child nito |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga elemento (batch). Awtomatikong pinamamahalaan ang row column at carousel slide |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang elemento |

## Mga Block

Base path: `/content/blocks`

Pinalalawak ang karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang block ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng block |
| GET | `/:churchId/tree/:id` | Publiko | — | I-load ang buong puno ng block kasama ang mga seksyon at elemento |
| GET | `/blockType/:blockType` | JWT | — | I-load ang mga block ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Publiko | — | I-load ang puno ng footer block para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga block |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang block |

## Mga Link

Base path: `/content/links`

Pinalalawak ang karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang link ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng link. Opsyonal na `?category=` filter. Awtomatikong nag-aayos pagkatapos mag-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | I-load ang mga link na sinala ayon sa visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Publiko | — | I-load ang mga link ng isang simbahan ayon sa kategorya (pampubliko) |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga link (batch). Awtomatikong nag-aayos ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang link |

## Global Styles

Base path: `/content/globalStyles`

Pinalalawak ang karaniwang CRUD (POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Publiko | — | I-load ang global styles ng isang simbahan (nagbabalik ng default kung walang nakatakda) |
| GET | `/` | JWT | — | I-load ang global styles para sa naka-authenticate na simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng global styles |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang global styles |

## Kasaysayan ng Pahina

Base path: `/content/pageHistory`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang block |
| GET | `/:id` | JWT | Content.Edit | Kunin ang entry ng kasaysayan ayon sa ID |
| POST | `/` | JWT | Content.Edit | I-save ang snapshot ng pahina/block. Pana-panahong nililinis ang mga entry na mahigit 30 araw na ang tanda |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang pahina/block mula sa history snapshot (binubura ang kasalukuyang nilalaman at muling ginagawa mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa inline na snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Mga Post (Blog)

Base path: `/content/posts`

Ang mga blog post ay mga standalone na row: `title`, `slug` (natatangi bawat simbahan), `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Nai-publish ang isang post kapag nakatakda na ang `publishDate` at nasa nakaraan na. Dinadagdagan ng mga read endpoint ang bawat post ng `authorName` na kinuha mula sa `authorId`. Tingnan ang [Website Builder Architecture](../../architecture/website-builder#blog).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Publiko | — | Ilista ang mga nai-publish na post, may pahina (pinakamarami 50 bawat pahina) |
| GET | `/public/:churchId/categories` | Publiko | — | Mga natatanging kategorya sa mga nai-publish na post |
| GET | `/public/:churchId/slug/:slug` | Publiko | — | Kunin ang nai-publish na post ayon sa slug |
| GET | `/rss/:churchId?siteUrl=` | Publiko | — | RSS 2.0 feed ng mga nai-publish na post (ang mga link ay binubuo bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Kunin ang post ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng post ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang post |

## Mga Redirect

Base path: `/content/redirects`

Mga URL redirect bawat simbahan (`fromPath` → `toPath`), limitado sa 200 bawat simbahan. Ang mga path ay ginagawang normal (naka-lowercase, may leading slash, walang trailing slash) at natatangi ang `fromPath` bawat simbahan. Nireresolba ito ng B1App sa mga posibleng 404 at naglalabas ng HTTP 308.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Publiko | — | I-resolve ang isang path (o ilista ang lahat ng redirect kapag inalis ang `path`) |
| GET | `/:id` | JWT | — | Kunin ang redirect ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng redirect ng simbahan |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga redirect. Tinatanggihan ang `fromPath = toPath` at ipinapatupad ang 200-row cap |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang redirect |

## Mga Sermon

Base path: `/content/sermons`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Kunin ang sample na istruktura ng playlist ng FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Kunin ang TV app wrapper na may mga source ng sermon, lesson, at FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Publiko | — | Kunin ang isang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Publiko | — | Kunin ang lahat ng pampublikong playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Publiko | — | Ilista ang lahat ng pampublikong sermon ng isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | I-load ang timeline data para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Publiko | — | Maghanap ng metadata ng sermon mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Bumuo ng mga mungkahi sa social media post gamit ang AI mula sa mga subtitle ng sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Bumuo ng outline ng lesson gamit ang AI mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Kunin ang sermon ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga sermon (batch, sumusuporta sa base64 thumbnail upload) |
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

Base path: `/content/playlists`

Pinalalawak ang karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may pahintulot na StreamingServices.Edit para sa mga pagsusulat).

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang playlist ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng playlist |
| GET | `/public/:churchId` | Publiko | — | Ilista ang lahat ng pampublikong playlist ng isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga playlist (batch, sumusuporta sa base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang playlist |

## Mga Streaming Service

Base path: `/content/streamingServices`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Kunin ang naka-encrypt na host chat room ID para sa isang service |
| GET | `/` | JWT | — | Ilista ang lahat ng streaming service. Awtomatikong nililinis ang mga nag-expire na hindi paulit-ulit na service at nilalampasan ang mga paulit-ulit |
| POST | `/` | JWT | StreamingServices.Edit | Gumawa o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang streaming service (binubura rin ang mga naka-block na IP) |

## Mga Event

Base path: `/content/events`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | I-load ang timeline event para sa isang grupo |
| GET | `/timeline?eventIds=` | JWT | — | I-load ang timeline event para sa mga grupo ng kasalukuyang user |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Publiko | — | Mag-subscribe sa mga event bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Kunin ang mga event ng isang grupo (kasama ang mga exception date) |
| GET | `/public/group/:churchId/:groupId` | Publiko | — | Kunin ang mga pampublikong event ng isang grupo |
| GET | `/public/:churchId/:id` | Publiko | — | Kunin ang isang event para sa pampublikong pahina nito, kasama ang `roomNames` (mga kuwarto mula sa mga booking na hindi tinanggihan). Nagbabalik ng `null` para sa mga event na nakabinbin o tinanggihan, at para sa mga pribadong event na hindi tumatanggap ng registration |
| GET | `/public/:churchId/:id/ical` | Publiko | — | I-download ang isang event bilang `.ics` file (`text/calendar`, may nalalapat na exception date). `404` kapag nakatago ang event ayon sa parehong patakaran |
| GET | `/:id` | JWT | — | Kunin ang event ayon sa ID |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga event (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang event |

Kasama sa mga record ng event ang `photoUrl` (ang 16:9 na larawan ng event na ipinapakita sa pampublikong pahina ng event at sa mga tile ng paparating na event), `tags` (pinaghihiwalay ng kuwit, ginagamit ng tag filter ng website Calendar element), at `notesViewRole` / `notesPostRole` (`staff` kapag `null`, `leaders`, o `members`), na nagkokontrol sa `eventNote` conversation ng event -- tingnan ang [Group and event notes access control](./messaging.md#group-and-event-notes-access-control). Kasama rin sa mga tugon ng pampublikong curated event ang `photoUrl` at `tags` ng bawat event.

## Mga Exception ng Event

Base path: `/content/eventExceptions`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang exception ng event ayon sa ID |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga exception ng event (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang exception ng event |

## Mga Curated Calendar

Base path: `/content/curatedCalendars`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang curated calendar ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated calendar |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated calendar (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang curated calendar |

## Mga Curated Event

Base path: `/content/curatedEvents`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kunin ang mga curated event ng isang calendar (kasama ang detalye ng event at exception date maliban kung may `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Publiko | — | Kunin ang mga pampublikong curated event ng isang calendar |
| GET | `/:id` | JWT | — | Kunin ang curated event ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated event |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga curated event. Sumusuporta sa `eventIds` array para magdagdag ng partikular na group event |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang curated event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang partikular na event sa curated calendar |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng event ng isang grupo sa curated calendar |

## Mga File

Base path: `/content/files`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Kunin ang mga file ayon sa uri ng nilalaman at content ID |
| GET | `/` | JWT | — | Ilista ang lahat ng file para sa website ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang file ayon sa ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Pinapayagan din kung ang user ay miyembro ng grupong tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Kumuha ng pre-signed na S3 upload URL. *Pinapayagan din para sa mga miyembro ng grupo. Pinakamarami 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Burahin ang file at alisin sa storage. *Pinapayagan din para sa mga miyembro ng grupo |

## Gallery

Base path: `/content/gallery`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Publiko | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga larawan ng gallery sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Kumuha ng pre-signed na S3 upload URL para sa larawan ng gallery |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Burahin ang larawan ng gallery |

## Mga Bible

Base path: `/content/bibles`

Lahat ng Bible endpoint ay pampubliko (walang kailangang authentication). Kinukuha ang datos mula sa mga external na pinagmumulan at naka-cache nang lokal.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | Publiko | — | Ilista ang lahat ng Bible translation (kumukuha mula sa pinagmulan kung walang laman ang cache) |
| GET | `/stats?startDate=&endDate=` | Publiko | — | Kunin ang estadistika ng Bible lookup para sa isang saklaw ng petsa |
| GET | `/availableTranslations/:source` | Publiko | — | Ilista ang mga available na translation mula sa isang pinagmulan (hal. api.bible) |
| GET | `/updateTranslations` | Publiko | — | I-sync ang lahat ng translation mula sa lahat ng pinagmulan |
| GET | `/updateTranslations/:source` | Publiko | — | I-sync ang mga translation mula sa isang partikular na pinagmulan |
| GET | `/updateCopyrights` | Publiko | — | I-update ang impormasyon ng copyright para sa mga translation na wala nito |
| GET | `/:translationKey/updateCopyright` | Publiko | — | I-update ang copyright ng isang partikular na translation |
| GET | `/:translationKey/search?query=&limit=` | Publiko | — | Maghanap ng mga talata sa isang translation |
| GET | `/:translationKey/books` | Publiko | — | Kunin ang mga aklat ng isang translation (nagca-cache nang lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Publiko | — | Kunin ang mga kabanata ng isang aklat (nagca-cache nang lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Publiko | — | Kunin ang mga talata ng isang kabanata (nagca-cache nang lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Publiko | — | Kunin ang teksto ng mga talata sa isang saklaw. Nagtatala ng mga lookup. May ilang translation na lumalampas sa caching dahil sa lisensya |

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

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Maghanap ng mga awit ayon sa query |
| GET | `/:id` | JWT | — | Kunin ang awit ayon sa ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng awit |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga awit (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga awit mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang awit |

## Mga Detalye ng Awit

Base path: `/content/songDetails`

Ang mga detalye ng awit ay pandaigdig (hindi nakatali sa simbahan). Ito ang mga canonical na metadata ng awit na ibinabahagi ng mga simbahan.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang detalye ng awit ayon sa ID (pandaigdig) |
| GET | `/` | JWT | — | Ilista ang mga detalye ng awit para sa simbahan |
| POST | `/create` | JWT | — | Gumawa ng detalye ng awit mula sa PraiseCharts ID (nagbabalik ng umiiral na kung nagawa na). Awtomatikong kumukuha ng metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga detalye ng awit (batch) |

## Mga Link ng Detalye ng Awit

Base path: `/content/songDetailLinks`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang link ng detalye ng awit ayon sa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Kunin ang lahat ng link ng isang detalye ng awit |
| POST | `/` | JWT | — | Gumawa o mag-update ng mga link ng detalye ng awit (batch). Awtomatikong kumukuha ng datos ng MusicBrainz kung naka-link |
| DELETE | `/:id` | JWT | — | Burahin ang link ng detalye ng awit |

## Mga Arrangement

Base path: `/content/arrangements`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang arrangement ayon sa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang awit |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Kunin ang mga arrangement ng isang detalye ng awit |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Hanapin ang mga FreeShow ID na wala sa simbahan. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang arrangement (binubura rin ang mga key; binubura ang awit kung wala nang natitirang arrangement) |

## Mga Arrangement Key

Base path: `/content/arrangementKeys`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Publiko | — | Kunin ang arrangement key kasama ang buong datos ng awit para sa presenter view |
| GET | `/:id` | JWT | — | Kunin ang arrangement key ayon sa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Kunin ang mga key ng isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement key |
| POST | `/` | JWT | Content.Edit | Gumawa o mag-update ng mga arrangement key (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang arrangement key |

## Mga Setting

Base path: `/content/settings`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang settings ng kasalukuyang user |
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting ng simbahan |
| GET | `/public/:churchId` | Publiko | — | Kunin ang mga pampublikong setting ng isang simbahan (ibinabalik bilang key-value pair) |
| POST | `/my` | JWT | — | I-save ang mga setting sa antas ng user (sumusuporta sa base64 image upload) |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting sa antas ng simbahan (sumusuporta sa base64 image upload) |
| DELETE | `/my/:id` | JWT | — | Burahin ang setting ng user |

## Preview

Base path: `/content/preview`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Publiko | — | I-load ang streaming preview data ng isang simbahan ayon sa subdomain key (tabs, links, services, sermons) |

## Gallery (Stock Photos)

Base path: `/content/stock`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/search` | Publiko | — | Maghanap ng stock photo sa Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

Integrasyon sa PraiseCharts para sa pagtuklas ng awit ng pagsamba at pag-download ng sheet music.

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Kunin ang raw na datos ng PraiseCharts para sa isang awit |
| GET | `/hasAccount` | JWT | — | Suriin kung may naka-link na PraiseCharts account ang user |
| GET | `/search?q=` | JWT | — | Maghanap sa PraiseCharts catalog |
| GET | `/products/:id?keys=` | JWT | — | Kunin ang mga produkto para sa isang awit (mula sa library kung naka-authenticate, kung hindi ay mula sa catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kunin ang raw na datos ng arrangement mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Mag-download ng file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Publiko | — | Kunin ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Palitan ang OAuth verifier ng access token at i-save sa settings ng user |
| GET | `/library` | JWT | — | I-browse ang library ng PraiseCharts ng user |

## Suporta

Base path: `/content/support`

| Paraan | Path | Auth | Pahintulot | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Publiko | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Website Builder Architecture](../../architecture/website-builder) -- Paano nagkakasama-sama ang mga pahina, seksyon, elemento, post, at redirect sa iba't ibang app
- [Membership Endpoints](./membership) -- Mga tao, simbahan, grupo, tungkulin, pahintulot
- [Attendance Endpoints](./attendance) -- Pagsubaybay ng serbisyo at pagbisita
- [Authentication & Permissions](./authentication) -- Daloy ng login, JWT, modelo ng pahintulot
- [Module Structure](../module-structure) -- Mga pattern ng organisasyon ng code
