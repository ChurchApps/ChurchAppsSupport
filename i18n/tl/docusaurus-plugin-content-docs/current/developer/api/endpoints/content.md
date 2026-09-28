---
title: "Mga Endpoint ng Content"
---

# Mga Endpoint ng Content

<div class="article-intro">

Ang Content module ay namamahala sa mga pahina ng website, mga seksyon, mga elemento, mga bloke, mga post sa blog, mga redirect, mga sermon, mga playlist, mga streaming service, mga kaganapan, mga customized na kalendaryo, mga file, mga gallery, mga Bible translation at mga verse lookup, mga kanta, mga arrangement, mga pandaigdigang istilo, mga stock photo, at mga setting. Ito ang pinakamalaking module sa API at nagbibigay-lakas sa CMS, media/streaming, worship planning, at mga feature ng Bible sa lahat ng ChurchApps applications.

</div>

**Pangunahing landas:** `/content`

## Mga Pahina

Pangunahing landas: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Mag-load ng buong puno ng pahina (mga seksyon, mga elemento, mga bloke) ayon sa URL o ID. Tinatanggal ang mga internal ID kapag kinuha sa pamamagitan ng URL. Ang mga pagkuha batay sa URL ay nagpapatakda ng `pages.visibility` — isang gated na pahina ay nagbabalik ng `{ restricted: true, visibility }` maliban kung ang (opsyonal) JWT ay sumasagot sa gate |
| GET | `/public/:churchId` | Public | — | Ilista ang mga public na pahina (`url`, `title`, `metaDescription`); tanging `visibility = everyone` lamang |
| GET | `/:id` | JWT | — | Makuha ang isang pahina ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga pahina para sa simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate ang isang pahina kasama ang lahat ng mga seksyon at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | Mag-save ng AI-generated na pahina (pahina, mga seksyon, at mga elemento sa isang tawag) |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang pahina |

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

Pangunahing landas: `/content/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang seksyon ayon sa ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplicate ang isang seksyon o i-convert ito sa isang reusable block |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga seksyon (batch). Auto-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang seksyon (auto-update ng sort order) |

## Mga Elemento

Pangunahing landas: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang elemento ayon sa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate ang isang elemento kasama ang lahat ng mga anak |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga elemento (batch). Auto-manage ang row columns at carousel slides |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang elemento |

## Mga Bloke

Pangunahing landas: `/content/blocks`

Pinalawak ang standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang bloke ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga bloke |
| GET | `/:churchId/tree/:id` | Public | — | Mag-load ng buong puno ng bloke kasama ang mga seksyon at elemento |
| GET | `/blockType/:blockType` | JWT | — | Mag-load ng mga bloke ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Mag-load ng footer block tree para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga bloke |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang bloke |

## Mga Link

Pangunahing landas: `/content/links`

Pinalawak ang standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang link ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga link. Opsyonal na `?category=` filter. Auto-sort pagkatapos mag-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Mag-load ng mga link na na-filter ng visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Mag-load ng mga link para sa isang simbahan ayon sa kategorya (public) |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga link (batch). Auto-sort ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang link |

## Mga Pandaigdigang Istilo

Pangunahing landas: `/content/globalStyles`

Pinalawak ang standard CRUD (POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Mag-load ng mga pandaigdigang istilo para sa isang simbahan (nagbabalik ng defaults kung wala ang naitakda) |
| GET | `/` | JWT | — | Mag-load ng mga pandaigdigang istilo para sa authenticated na simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga pandaigdigang istilo |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang mga pandaigdigang istilo |

## Kasaysayan ng Pahina

Pangunahing landas: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga entry sa kasaysayan para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga entry sa kasaysayan para sa isang bloke |
| GET | `/:id` | JWT | Content.Edit | Makuha ang isang entry sa kasaysayan ayon sa ID |
| POST | `/` | JWT | Content.Edit | Mag-save ng isang snapshot ng pahina/bloke. Pana-panahon na nag-clean up ng mga entry na mas matanda kaysa 30 araw |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang isang pahina/bloke mula sa isang history snapshot (tinatanggal ang kasalukuyang nilalaman at ginagawa muli mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa isang inline snapshot object. Katawan: `{ pageId, blockId, snapshot }` |

## Mga Post (Blog)

Pangunahing landas: `/content/posts`

Ang mga blog post ay standalone na mga hilera: `title`, `slug` (natatangi sa bawat simbahan), `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Ang isang post ay nai-publish kapag ang `publishDate` ay naitakda at nakaraan na. Ang mga read endpoint ay nag-enrich sa bawat post na may `authorName` na nalutas mula sa `authorId`. Tingnan ang [Website Builder Architecture](../../architecture/website-builder#blog).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Ilista ang mga published na post, paginated (max 50 bawat pahina) |
| GET | `/public/:churchId/categories` | Public | — | Mga natatanging kategorya sa buong mga published na post |
| GET | `/public/:churchId/slug/:slug` | Public | — | Makuha ang isang published na post sa pamamagitan ng slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed ng mga published na post (mga link na binuo bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Makuha ang isang post ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga post para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang post |

## Mga Redirect

Pangunahing landas: `/content/redirects`

Mga per-church URL redirect (`fromPath` → `toPath`), limited sa 200 sa bawat simbahan. Ang mga path ay normalized (lowercased, leading slash, walang trailing slash) at `fromPath` ay natatangi sa bawat simbahan. Ang B1App ay nalulutas ang mga ito sa magiging 404s at naglalabas ng HTTP 308.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Malutas ang isang path (o ilista ang lahat ng redirect kapag ang `path` ay omitted) |
| GET | `/:id` | JWT | — | Makuha ang isang redirect ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga redirect para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga redirect. Tinatanggihan ang `fromPath = toPath` at nagpapatakda ng 200-row cap |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang redirect |

## Mga Sermon

Pangunahing landas: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Makuha ang isang sample na FreeShow playlist structure |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Makuha ang TV app wrapper na may sermon, lesson, at FreeShow sources |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Makuha ang isang sermon bilang isang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Makuha ang lahat ng mga public na playlist/sermons bilang isang TV feed |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng mga public na sermon para sa isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | Mag-load ng timeline data para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Public | — | Maghanap ng sermon metadata mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Lumikha ng AI social media post suggestions mula sa sermon subtitles |
| GET | `/outline?url=&title=&author=` | JWT | — | Lumikha ng AI lesson outline mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Makuha ang isang sermon ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga sermon |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga sermon (batch, sumusuporta sa base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang sermon |

### Halimbawa: Maghanap ng isang YouTube Sermon

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

Pangunahing landas: `/content/playlists`

Pinalawak ang standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may StreamingServices.Edit permission para sa writes).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang playlist ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga playlist |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng mga public na playlist para sa isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga playlist (batch, sumusuporta sa base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang playlist |

## Mga Streaming Service

Pangunahing landas: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Makuha ang encrypted host chat room ID para sa isang serbisyo |
| GET | `/` | JWT | — | Ilista ang lahat ng mga streaming service. Auto-cleans expired non-recurring services at umuusad sa mga recurring ones |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang streaming service (din ay nag-clear ng mga blocked IP) |

## Mga Kaganapan

Pangunahing landas: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Mag-load ng timeline events para sa isang grupo |
| GET | `/timeline?eventIds=` | JWT | — | Mag-load ng timeline events para sa mga grupo ng kasalukuyang user |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Mag-subscribe sa mga kaganapan bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Makuha ang mga kaganapan para sa isang grupo (kasama ang exception dates) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Makuha ang mga public na kaganapan para sa isang grupo |
| GET | `/:id` | JWT | — | Makuha ang isang kaganapan ayon sa ID |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga kaganapan (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang kaganapan |

## Mga Kaganapan na Pagbubukod

Pangunahing landas: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang kaganapan na pagbubukod ayon sa ID |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga kaganapan na pagbubukod (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang kaganapan na pagbubukod |

## Mga Customized na Kalendaryo

Pangunahing landas: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang customized na kalendaryo ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga customized na kalendaryo |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga customized na kalendaryo (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang customized na kalendaryo |

## Mga Customized na Kaganapan

Pangunahing landas: `/content/curatedEvents`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Makuha ang mga customized na kaganapan para sa isang kalendaryo (kasama ang event details at exception dates kung hindi ang `?withoutEvents` ay naitakda) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Makuha ang mga public na customized na kaganapan para sa isang kalendaryo |
| GET | `/:id` | JWT | — | Makuha ang isang customized na kaganapan ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga customized na kaganapan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga customized na kaganapan. Sumusuporta sa `eventIds` array upang magdagdag ng mga specific na group events |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang customized na kaganapan |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang specific na kaganapan mula sa isang customized na kalendaryo |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng mga kaganapan para sa isang grupo mula sa isang customized na kalendaryo |

## Mga File

Pangunahing landas: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Makuha ang mga file ayon sa content type at content ID |
| GET | `/` | JWT | — | Ilista ang lahat ng mga file para sa church website |
| GET | `/:id` | JWT | — | Makuha ang isang file ayon sa ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Din na allowed kung ang user ay miyembro ng grupo na tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Makuha ang isang pre-signed S3 upload URL. *Din na allowed para sa mga miyembro ng grupo. Max 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Tanggalin ang isang file at alisin mula sa storage. *Din na allowed para sa mga miyembro ng grupo |

## Gallery

Pangunahing landas: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga gallery image sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Makuha ang isang pre-signed S3 upload URL para sa isang gallery image |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Tanggalin ang isang gallery image |

## Mga Bible

Pangunahing landas: `/content/bibles`

Lahat ng Bible endpoints ay public (walang authentication na kailangan). Ang data ay kinukuha mula sa mga external source at naka-cache locally.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Ilista ang lahat ng mga Bible translation (kinukuha mula sa source kung ang cache ay walang laman) |
| GET | `/stats?startDate=&endDate=` | Public | — | Makuha ang Bible lookup statistics para sa isang date range |
| GET | `/availableTranslations/:source` | Public | — | Ilista ang available translations mula sa isang source (hal. api.bible) |
| GET | `/updateTranslations` | Public | — | I-sync ang lahat ng translations mula sa lahat ng sources |
| GET | `/updateTranslations/:source` | Public | — | I-sync ang mga translations mula sa isang specific na source |
| GET | `/updateCopyrights` | Public | — | I-update ang copyright info para sa mga translations na kulang nito |
| GET | `/:translationKey/updateCopyright` | Public | — | I-update ang copyright para sa isang specific na translation |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Maghanap ng mga verse sa isang translation |
| GET | `/:translationKey/books` | Public | — | Makuha ang mga libro para sa isang translation (naka-cache locally) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Makuha ang mga kabanata para sa isang libro (naka-cache locally) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Makuha ang mga verse para sa isang kabanata (naka-cache locally) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Makuha ang text ng verse para sa isang range. Nag-log ng mga lookup. Ang ilang translations ay nag-bypass ng caching para sa licensing |

### Halimbawa: Makuha ang Verse Text

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

Pangunahing landas: `/content/songs`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Maghanap ng mga kanta ayon sa query |
| GET | `/:id` | JWT | — | Makuha ang isang kanta ayon sa ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng mga kanta |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga kanta (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga kanta mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang kanta |

## Mga Detalye ng Kanta

Pangunahing landas: `/content/songDetails`

Ang mga detalye ng kanta ay pandaigdig (hindi church-scoped). Ang mga ito ay kumakatawan sa canonical na metadata ng kanta na ibinahagi sa mga simbahan.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang detalye ng kanta ayon sa ID (pandaigdig) |
| GET | `/` | JWT | — | Ilista ang mga detalye ng kanta para sa simbahan |
| POST | `/create` | JWT | — | Lumikha ng isang detalye ng kanta mula sa PraiseCharts ID (nagbabalik ng existing kung na-create na). Auto-fetch ang metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga detalye ng kanta (batch) |

## Mga Link ng Detalye ng Kanta

Pangunahing landas: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang link ng detalye ng kanta ayon sa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Makuha ang lahat ng mga link para sa isang detalye ng kanta |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga link ng detalye ng kanta (batch). Auto-fetch ang MusicBrainz data kung nag-link |
| DELETE | `/:id` | JWT | — | Tanggalin ang isang link ng detalye ng kanta |

## Mga Arrangement

Pangunahing landas: `/content/arrangements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makuha ang isang arrangement ayon sa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Makuha ang mga arrangement para sa isang kanta |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Makuha ang mga arrangement para sa isang detalye ng kanta |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng mga arrangement |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Maghanap ng FreeShow ID na hindi nag-exist sa simbahan. Katawan: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang arrangement (din ay tinatanggal ang mga susi; tinatanggal ang kanta kung walang arrangements na nananatili) |

## Mga Susi ng Arrangement

Pangunahing landas: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Makuha ang arrangement key na may buong data ng kanta para sa presenter view |
| GET | `/:id` | JWT | — | Makuha ang isang susi ng arrangement ayon sa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Makuha ang mga susi para sa isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng mga susi ng arrangement |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga susi ng arrangement (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang susi ng arrangement |

## Mga Setting

Pangunahing landas: `/content/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Makuha ang mga setting ng kasalukuyang user |
| GET | `/` | JWT | Settings.Edit | Makuha ang lahat ng mga setting para sa simbahan |
| GET | `/public/:churchId` | Public | — | Makuha ang mga public na setting para sa isang simbahan (nagbabalik bilang key-value pairs) |
| POST | `/my` | JWT | — | Mag-save ng mga user-level na setting (sumusuporta sa base64 image upload) |
| POST | `/` | JWT | Settings.Edit | Mag-save ng mga church-level na setting (sumusuporta sa base64 image upload) |
| DELETE | `/my/:id` | JWT | — | Tanggalin ang isang user setting |

## Paglalantad

Pangunahing landas: `/content/preview`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Mag-load ng streaming preview data para sa isang simbahan sa pamamagitan ng subdomain key (tabs, links, services, sermons) |

## Gallery (Stock Photos)

Pangunahing landas: `/content/stock`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Maghanap ng Pexels stock photos. Katawan: `{ term: "church" }` |

## PraiseCharts

Pangunahing landas: `/content/praiseCharts`

Integration sa PraiseCharts para sa worship song discovery at sheet music downloads.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Makuha ang raw PraiseCharts data para sa isang kanta |
| GET | `/hasAccount` | JWT | — | Suriin kung ang user ay may naka-link na PraiseCharts account |
| GET | `/search?q=` | JWT | — | Maghanap sa PraiseCharts catalog |
| GET | `/products/:id?keys=` | JWT | — | Makuha ang mga produkto para sa isang kanta (mula sa library kung authenticated, kung hindi ay catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Makuha ang raw arrangement data mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Mag-download ng isang file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Makuha ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | I-exchange ang OAuth verifier para sa access token at mag-save sa user settings |
| GET | `/library` | JWT | — | I-browse ang library ng PraiseCharts ng user |

## Suporta

Pangunahing landas: `/content/support`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Katawan: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Website Builder Architecture](../../architecture/website-builder) -- Paano ang mga pahina, mga seksyon, mga elemento, mga post, at mga redirect ay umaangkop sa mga apps
- [Membership Endpoints](./membership) -- Mga tao, mga simbahan, mga grupo, mga tungkulin, mga pahintulot
- [Attendance Endpoints](./attendance) -- Serbisyo at bisita na pagsubaybay
- [Authentication & Permissions](./authentication) -- Login flow, JWT, permission model
- [Module Structure](../module-structure) -- Mga pattern sa code organization
