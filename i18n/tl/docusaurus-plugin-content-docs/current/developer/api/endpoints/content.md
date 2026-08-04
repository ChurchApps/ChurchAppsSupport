---
title: "Content Endpoints"
---

# Content Endpoints

<div class="article-intro">

Pinamamahalaan ng Content module ang mga pahina ng website, section, element, block, blog post, redirect, sermon, playlist, streaming service, kaganapan, curated calendar, file, gallery, Bible translation at verse lookup, kanta, arrangement, global style, stock photo, at setting. Ito ang pinakamalaking module sa API at nagpapatakbo sa CMS, media/streaming, worship planning, at mga Bible feature sa lahat ng application ng ChurchApps.

</div>

**Base path:** `/content`

## Pages

Base path: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | I-load ang buong page tree (mga section, element, block) ayon sa URL o ID. Inaalis ang mga internal ID kapag kinuha ayon sa URL. Ang mga fetch na batay sa URL ay nagpapatupad ng `pages.visibility` — nagbabalik ang isang gated page ng `{ restricted: true, visibility }` maliban kung natutugunan ng (opsyonal na) JWT ang gate |
| GET | `/public/:churchId` | Public | — | Ilista ang mga public na pahina (`url`, `title`, `metaDescription`); `visibility = everyone` lamang |
| GET | `/:id` | JWT | — | Kunin ang isang pahina ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng pahina para sa simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang pahina kasama ang lahat ng mga section at element |
| POST | `/temp/ai` | JWT | Content.Edit | I-save ang isang AI-generated na pahina (pahina, mga section, at mga element sa isang tawag) |
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

## Sections

Base path: `/content/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang section ayon sa ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Kopyahin ang isang section o i-convert ito sa isang reusable block |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga section (batch). Awtomatikong ina-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang section (awtomatikong ina-update ang sort order) |

## Elements

Base path: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang element ayon sa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang element kasama ang lahat ng mga anak nito |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga element (batch). Awtomatikong pinamamahalaan ang mga row column at carousel slide |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang element |

## Blocks

Base path: `/content/blocks`

Nag-e-extend ng standard na CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang block ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng block |
| GET | `/:churchId/tree/:id` | Public | — | I-load ang buong block tree kasama ang mga section at element |
| GET | `/blockType/:blockType` | JWT | — | I-load ang mga block ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | I-load ang footer block tree para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga block |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang block |

## Links

Base path: `/content/links`

Nag-e-extend ng standard na CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang link ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng link. Opsyonal na `?category=` filter. Awtomatikong nag-a-sort pagkatapos i-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | I-load ang mga link na na-filter ayon sa visibility (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | I-load ang mga link para sa isang simbahan ayon sa kategorya (public) |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga link (batch). Awtomatikong nag-a-sort ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang link |

## Global Styles

Base path: `/content/globalStyles`

Nag-e-extend ng standard na CRUD (POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | I-load ang mga global style para sa isang simbahan (nagbabalik ng mga default kung wala pang naka-set) |
| GET | `/` | JWT | — | I-load ang mga global style para sa naka-authenticate na simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga global style |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang mga global style |

## Page History

Base path: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga history entry para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga history entry para sa isang block |
| GET | `/:id` | JWT | Content.Edit | Kunin ang isang history entry ayon sa ID |
| POST | `/` | JWT | Content.Edit | I-save ang isang page/block snapshot. Pana-panahong nililinis ang mga entry na mas matanda sa 30 araw |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang isang page/block mula sa isang history snapshot (tinatanggal ang kasalukuyang content at nire-recreate mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa isang inline snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Posts (Blog)

Base path: `/content/posts`

Ang mga blog post ay standalone na row: `title`, `slug` (natatangi bawat simbahan), `excerpt`, `content` (markdown body), `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Naipa-publish ang isang post kapag naka-set na ang `publishDate` at ito ay nasa nakaraan na. Pinayayaman ng mga read endpoint ang bawat post ng `authorName` na kinukuha mula sa `authorId`. Tingnan ang [Website Builder Architecture](../../architecture/website-builder#blog).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Ilista ang mga na-publish na post, naka-paginate (hanggang 50 bawat pahina) |
| GET | `/public/:churchId/categories` | Public | — | Natatanging mga kategorya sa lahat ng na-publish na post |
| GET | `/public/:churchId/slug/:slug` | Public | — | Kunin ang isang na-publish na post ayon sa slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed ng mga na-publish na post (binuo ang mga link bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Kunin ang isang post ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng post para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang post |

## Redirects

Base path: `/content/redirects`

Mga per-church URL redirect (`fromPath` → `toPath`), na may limitasyong 200 bawat simbahan. Nino-normalize ang mga path (lowercase, may leading slash, walang trailing slash) at natatangi ang `fromPath` bawat simbahan. Nire-resolve ito ng B1App sa mga magiging 404 at naglalabas ng HTTP 308.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | I-resolve ang isang path (o ilista ang lahat ng redirect kapag inalis ang `path`) |
| GET | `/:id` | JWT | — | Kunin ang isang redirect ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng redirect para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga redirect. Tinatanggihan ang `fromPath = toPath` at ipinapatupad ang limitasyong 200-row |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang redirect |

## Sermons

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Kunin ang isang sample na FreeShow playlist structure |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Kunin ang TV app wrapper na may mga source ng sermon, lesson, at FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Kunin ang iisang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Kunin ang lahat ng public na playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng public na sermon para sa isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | I-load ang timeline data para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Public | — | Hanapin ang sermon metadata mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Bumuo ng mga AI social media post suggestion mula sa mga subtitle ng sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Bumuo ng AI lesson outline mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Kunin ang isang sermon ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga sermon (batch, sinusuportahan ang base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang sermon |

### Halimbawa: Hanapin ang isang YouTube Sermon

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

## Playlists

Base path: `/content/playlists`

Nag-e-extend ng standard na CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may StreamingServices.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang playlist ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng playlist |
| GET | `/public/:churchId` | Public | — | Ilista ang lahat ng public na playlist para sa isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga playlist (batch, sinusuportahan ang base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang playlist |

## Streaming Services

Base path: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Kunin ang encrypted host chat room ID para sa isang serbisyo |
| GET | `/` | JWT | — | Ilista ang lahat ng streaming service. Awtomatikong nililinis ang mga nag-expire nang non-recurring na serbisyo at ina-advance ang mga recurring |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang isang streaming service (nililinis din ang mga blocked IP) |

## Events

Base path: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | I-load ang mga timeline event para sa isang grupo |
| GET | `/timeline?eventIds=` | JWT | — | I-load ang mga timeline event para sa mga grupo ng kasalukuyang user |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Mag-subscribe sa mga kaganapan bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Kunin ang mga kaganapan para sa isang grupo (kasama ang mga exception date) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Kunin ang mga public na kaganapan para sa isang grupo |
| GET | `/:id` | JWT | — | Kunin ang isang kaganapan ayon sa ID |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga kaganapan (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang kaganapan |

## Event Exceptions

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang event exception ayon sa ID |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga event exception (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang event exception |

## Curated Calendars

Base path: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang curated calendar ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated calendar |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga curated calendar (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang curated calendar |

## Curated Events

Base path: `/content/curatedEvents`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kunin ang mga curated event para sa isang calendar (kasama ang mga detalye ng kaganapan at mga exception date maliban kung naka-set ang `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Kunin ang mga public na curated event para sa isang calendar |
| GET | `/:id` | JWT | — | Kunin ang isang curated event ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated event |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga curated event. Sinusuportahan ang array na `eventIds` upang magdagdag ng mga partikular na kaganapan ng grupo |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang curated event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang partikular na kaganapan mula sa isang curated calendar |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng kaganapan para sa isang grupo mula sa isang curated calendar |

## Files

Base path: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Kunin ang mga file ayon sa uri ng content at content ID |
| GET | `/` | JWT | — | Ilista ang lahat ng file para sa website ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang file ayon sa ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Pinapayagan din kung ang user ay miyembro ng grupong tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Kumuha ng pre-signed na S3 upload URL. *Pinapayagan din para sa mga miyembro ng grupo. Pinakamataas na 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Tanggalin ang isang file at alisin ito sa storage. *Pinapayagan din para sa mga miyembro ng grupo |

## Gallery

Base path: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga gallery image sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Kumuha ng pre-signed na S3 upload URL para sa isang gallery image |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Tanggalin ang isang gallery image |

## Bibles

Base path: `/content/bibles`

Lahat ng Bible endpoint ay public (walang kailangang authentication). Kinukuha ang data mula sa mga external na source at naka-cache nang lokal.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | Ilista ang lahat ng Bible translation (kumukuha mula sa source kung walang laman ang cache) |
| GET | `/stats?startDate=&endDate=` | Public | — | Kunin ang mga estadistika ng Bible lookup para sa isang saklaw ng petsa |
| GET | `/availableTranslations/:source` | Public | — | Ilista ang mga available na translation mula sa isang source (hal. api.bible) |
| GET | `/updateTranslations` | Public | — | I-sync ang lahat ng translation mula sa lahat ng source |
| GET | `/updateTranslations/:source` | Public | — | I-sync ang mga translation mula sa isang partikular na source |
| GET | `/updateCopyrights` | Public | — | I-update ang impormasyon ng copyright para sa mga translation na kulang nito |
| GET | `/:translationKey/updateCopyright` | Public | — | I-update ang copyright para sa isang partikular na translation |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Maghanap ng mga verse sa isang translation |
| GET | `/:translationKey/books` | Public | — | Kunin ang mga aklat para sa isang translation (nagca-cache nang lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Kunin ang mga kabanata para sa isang aklat (nagca-cache nang lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Kunin ang mga verse para sa isang kabanata (nagca-cache nang lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Kunin ang teksto ng verse para sa isang saklaw. Nag-log ng mga lookup. Nililiktawan ng ilang translation ang caching dahil sa lisensya |

### Halimbawa: Kunin ang Teksto ng Verse

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

## Songs

Base path: `/content/songs`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Maghanap ng mga kanta ayon sa query |
| GET | `/:id` | JWT | — | Kunin ang isang kanta ayon sa ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng kanta |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga kanta (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga kanta mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang kanta |

## Song Details

Base path: `/content/songDetails`

Global (hindi naka-scope sa simbahan) ang mga song detail. Kumakatawan ang mga ito sa canonical na metadata ng kanta na nabahagi sa mga simbahan.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang song detail ayon sa ID (global) |
| GET | `/` | JWT | — | Ilista ang mga song detail para sa simbahan |
| POST | `/create` | JWT | — | Lumikha ng isang song detail mula sa PraiseCharts ID (nagbabalik ng umiiral na kung nagawa na ito). Awtomatikong kumukuha ng metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga song detail (batch) |

## Song Detail Links

Base path: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang song detail link ayon sa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Kunin ang lahat ng link para sa isang song detail |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga song detail link (batch). Awtomatikong kumukuha ng data ng MusicBrainz kung naka-link |
| DELETE | `/:id` | JWT | — | Tanggalin ang isang song detail link |

## Arrangements

Base path: `/content/arrangements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang arrangement ayon sa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Kunin ang mga arrangement para sa isang kanta |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Kunin ang mga arrangement para sa isang song detail |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Hanapin ang mga FreeShow ID na wala sa simbahan. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang arrangement (tinatanggal din ang mga key; tinatanggal ang kanta kung walang natitirang arrangement) |

## Arrangement Keys

Base path: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Kunin ang arrangement key kasama ang buong data ng kanta para sa presenter view |
| GET | `/:id` | JWT | — | Kunin ang isang arrangement key ayon sa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Kunin ang mga key para sa isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement key |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga arrangement key (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang isang arrangement key |

## Settings

Base path: `/content/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga setting ng kasalukuyang user |
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting para sa simbahan |
| GET | `/public/:churchId` | Public | — | Kunin ang mga public na setting para sa isang simbahan (ibinabalik bilang key-value pairs) |
| POST | `/my` | JWT | — | I-save ang mga setting sa antas ng user (sinusuportahan ang base64 image upload) |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting sa antas ng simbahan (sinusuportahan ang base64 image upload) |
| DELETE | `/my/:id` | JWT | — | Tanggalin ang isang setting ng user |

## Preview

Base path: `/content/preview`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | I-load ang streaming preview data para sa isang simbahan ayon sa subdomain key (mga tab, link, serbisyo, sermon) |

## Gallery (Stock Photos)

Base path: `/content/stock`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Maghanap ng mga stock photo sa Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

Integrasyon sa PraiseCharts para sa pagtuklas ng worship song at pag-download ng sheet music.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Kunin ang raw na data ng PraiseCharts para sa isang kanta |
| GET | `/hasAccount` | JWT | — | Suriin kung may naka-link na PraiseCharts account ang user |
| GET | `/search?q=` | JWT | — | Maghanap sa katalogo ng PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Kunin ang mga produkto para sa isang kanta (mula sa library kung naka-authenticate, kung hindi ay mula sa katalogo) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kunin ang raw na arrangement data mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Mag-download ng file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Kunin ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Palitan ang OAuth verifier ng access token at i-save sa mga setting ng user |
| GET | `/library` | JWT | — | I-browse ang library ng PraiseCharts ng user |

## Support

Base path: `/content/support`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Website Builder Architecture](../../architecture/website-builder) -- Kung paano magkakasama ang mga pahina, section, element, post, at redirect sa lahat ng application
- [Membership Endpoints](./membership) -- Mga tao, simbahan, grupo, tungkulin, permission
- [Attendance Endpoints](./attendance) -- Pagsubaybay sa serbisyo at visit
- [Authentication & Permissions](./authentication) -- Daloy ng pag-login, JWT, permission model
- [Module Structure](../module-structure) -- Mga pattern ng pag-oorganisa ng code
