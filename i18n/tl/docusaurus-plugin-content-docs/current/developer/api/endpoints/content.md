---
title: "Mga Endpoint ng Content"
---

# Mga Endpoint ng Content

<div class="article-intro">

Pinapamahalaan ng Content module ang mga pahina ng website, seksyon, elemento, block, sermon, playlist, streaming service, event, curated calendar, file, gallery, mga salin ng Bibliya at paghahanap ng talata, kanta, arrangement, global style, stock photo, at setting. Ito ang pinakamalaking module sa API at nagpapaandar ng CMS, media/streaming, pagpaplano ng pagsamba, at mga tampok ng Bibliya sa lahat ng ChurchApps na aplikasyon.

</div>

**Base path:** `/content`

## Mga Pahina

Base path: `/content/pages`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Pampubliko | — | I-load ang buong puno ng pahina (mga seksyon, elemento, block) ayon sa URL o ID. Tinatanggal ang mga internal ID kapag kinuha ayon sa URL |
| GET | `/:id` | JWT | — | Kunin ang isang pahina ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng pahina para sa simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplicate ang isang pahina kasama ang lahat ng seksyon at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | I-save ang isang pahinang ginawa ng AI (pahina, seksyon, at elemento sa isang tawag) |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang pahina |

### Halimbawa: I-load ang Puno ng Pahina

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
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | I-duplicate ang isang seksyon o i-convert ito sa reusable na block |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga seksyon (batch). Awtomatikong ina-update ang sort order |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang seksyon (awtomatikong ina-update ang sort order) |

## Mga Elemento

Base path: `/content/elements`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang elemento ayon sa ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | I-duplicate ang isang elemento kasama ang lahat ng mga anak |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga elemento (batch). Awtomatikong pinapamahalaan ang mga kolum ng hilera at slide ng carousel |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang elemento |

## Mga Block

Base path: `/content/blocks`

Nag-eextend ng karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang block ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng block |
| GET | `/:churchId/tree/:id` | Pampubliko | — | I-load ang buong puno ng block kasama ang mga seksyon at elemento |
| GET | `/blockType/:blockType` | JWT | — | I-load ang mga block ayon sa uri (hal. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Pampubliko | — | I-load ang puno ng footer block para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga block |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang block |

## Mga Link

Base path: `/content/links`

Nag-eextend ng karaniwang CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang link ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng link. Opsyonal na filter ayon sa `?category=`. Awtomatikong isinasaayos pagkatapos mag-save |
| GET | `/church/:churchId/filtered?category=` | JWT | — | I-load ang mga link na na-filter ayon sa visibility (lahat, bisita, miyembro, kawani, grupo) |
| GET | `/church/:churchId?category=` | Pampubliko | — | I-load ang mga link para sa isang simbahan ayon sa kategorya (pampubliko) |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga link (batch). Awtomatikong isinasaayos ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang link |

## Mga Global Style

Base path: `/content/globalStyles`

Nag-eextend ng karaniwang CRUD (POST `/`, DELETE `/:id` mula sa base class na may pahintulot na Content.Edit para sa mga pagsusulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Pampubliko | — | I-load ang mga global style para sa isang simbahan (nagbabalik ng mga default kung wala pang naitakda) |
| GET | `/` | JWT | — | I-load ang mga global style para sa naka-authenticate na simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga global style |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang mga global style |

## Kasaysayan ng Pahina

Base path: `/content/pageHistory`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Ilista ang mga entry ng kasaysayan para sa isang block |
| GET | `/:id` | JWT | Content.Edit | Kunin ang isang entry ng kasaysayan ayon sa ID |
| POST | `/` | JWT | Content.Edit | I-save ang isang snapshot ng pahina/block. Pana-panahong nililinis ang mga entry na mas matanda sa 30 araw |
| POST | `/restore/:id` | JWT | Content.Edit | I-restore ang isang pahina/block mula sa isang snapshot ng kasaysayan (binubura ang kasalukuyang nilalaman at nililikha muli mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | I-restore mula sa isang inline na snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Mga Sermon

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Kumuha ng halimbawang istraktura ng FreeShow playlist |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Kumuha ng TV app wrapper na may mga pinagmulan ng sermon, aralin, at FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Pampubliko | — | Kumuha ng isang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Pampubliko | — | Kumuha ng lahat ng pampublikong playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Pampubliko | — | Ilista ang lahat ng pampublikong sermon para sa isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | I-load ang data ng timeline para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Pampubliko | — | Maghanap ng metadata ng sermon mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Bumuo ng mga mungkahi ng AI social media post mula sa mga subtitle ng sermon |
| GET | `/outline?url=&title=&author=` | JWT | — | Bumuo ng AI lesson outline mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | Mag-import ng mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Kunin ang isang sermon ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga sermon (batch, sinusuportahan ang base64 na pag-upload ng thumbnail) |
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

Nag-eextend ng karaniwang CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may pahintulot na StreamingServices.Edit para sa mga pagsusulat).

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang playlist ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng playlist |
| GET | `/public/:churchId` | Pampubliko | — | Ilista ang lahat ng pampublikong playlist para sa isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga playlist (batch, sinusuportahan ang base64 na pag-upload ng thumbnail) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang isang playlist |

## Mga Streaming Service

Base path: `/content/streamingServices`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Kunin ang naka-encrypt na host chat room ID para sa isang serbisyo |
| GET | `/` | JWT | — | Ilista ang lahat ng streaming service. Awtomatikong nililinis ang mga expired na hindi umuulit na serbisyo at iniaabante ang mga umuulit |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o mag-update ng mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Burahin ang isang streaming service (binubura din ang mga naka-block na IP) |

## Mga Event

Base path: `/content/events`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | I-load ang mga timeline event para sa isang grupo |
| GET | `/timeline?eventIds=` | JWT | — | I-load ang mga timeline event para sa mga grupo ng kasalukuyang gumagamit |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Pampubliko | — | Mag-subscribe sa mga event bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Kunin ang mga event para sa isang grupo (kasama ang mga exception date) |
| GET | `/public/group/:churchId/:groupId` | Pampubliko | — | Kunin ang mga pampublikong event para sa isang grupo |
| GET | `/:id` | JWT | — | Kunin ang isang event ayon sa ID |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga event (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang event |

## Mga Event Exception

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang event exception ayon sa ID |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga event exception (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang event exception |

## Mga Curated Calendar

Base path: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang curated calendar ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated calendar |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga curated calendar (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang curated calendar |

## Mga Curated Event

Base path: `/content/curatedEvents`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Kunin ang mga curated event para sa isang calendar (kasama ang mga detalye ng event at exception date maliban kung nakatakda ang `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Pampubliko | — | Kunin ang mga pampublikong curated event para sa isang calendar |
| GET | `/:id` | JWT | — | Kunin ang isang curated event ayon sa ID |
| GET | `/` | JWT | — | Ilista ang lahat ng curated event |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga curated event. Sinusuportahan ang `eventIds` array para magdagdag ng partikular na mga event ng grupo |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang curated event |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Alisin ang isang partikular na event mula sa isang curated calendar |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Alisin ang lahat ng event para sa isang grupo mula sa isang curated calendar |

## Mga File

Base path: `/content/files`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Kunin ang mga file ayon sa uri ng nilalaman at content ID |
| GET | `/` | JWT | — | Ilista ang lahat ng file para sa website ng simbahan |
| GET | `/:id` | JWT | — | Kunin ang isang file ayon sa ID |
| POST | `/` | JWT | Content.Edit* | Mag-upload ng mga file (base64). *Pinapayagan din kung ang gumagamit ay miyembro ng grupong tumutugma sa `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Kumuha ng pre-signed S3 upload URL. *Pinapayagan din para sa mga miyembro ng grupo. Maximum na 100MB bawat content item |
| DELETE | `/:id` | JWT | Content.Edit* | Burahin ang isang file at alisin mula sa storage. *Pinapayagan din para sa mga miyembro ng grupo |

## Gallery

Base path: `/content/gallery`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Pampubliko | — | Ilista ang mga stock photo sa isang folder |
| GET | `/:folder` | JWT | Content.Edit | Ilista ang mga imahe ng gallery sa isang folder |
| POST | `/requestUpload` | JWT | Content.Edit | Kumuha ng pre-signed S3 upload URL para sa isang imahe ng gallery |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Burahin ang isang imahe ng gallery |

## Mga Bibliya

Base path: `/content/bibles`

Lahat ng Bible endpoint ay pampubliko (walang kinakailangang authentication). Ang data ay kinukuha mula sa mga panlabas na pinagmulan at naka-cache nang lokal.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/` | Pampubliko | — | Ilista ang lahat ng salin ng Bibliya (kinukuha mula sa pinagmulan kung walang laman ang cache) |
| GET | `/stats?startDate=&endDate=` | Pampubliko | — | Kumuha ng estadistika ng paghahanap ng Bibliya para sa isang saklaw ng petsa |
| GET | `/availableTranslations/:source` | Pampubliko | — | Ilista ang mga magagamit na salin mula sa isang pinagmulan (hal. api.bible) |
| GET | `/updateTranslations` | Pampubliko | — | I-sync ang lahat ng salin mula sa lahat ng pinagmulan |
| GET | `/updateTranslations/:source` | Pampubliko | — | I-sync ang mga salin mula sa isang partikular na pinagmulan |
| GET | `/updateCopyrights` | Pampubliko | — | I-update ang impormasyon ng copyright para sa mga salin na wala nito |
| GET | `/:translationKey/updateCopyright` | Pampubliko | — | I-update ang copyright para sa isang partikular na salin |
| GET | `/:translationKey/search?query=&limit=` | Pampubliko | — | Maghanap ng mga talata sa isang salin |
| GET | `/:translationKey/books` | Pampubliko | — | Kumuha ng mga libro para sa isang salin (naka-cache nang lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Pampubliko | — | Kumuha ng mga kabanata para sa isang libro (naka-cache nang lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Pampubliko | — | Kumuha ng mga talata para sa isang kabanata (naka-cache nang lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Pampubliko | — | Kumuha ng teksto ng talata para sa isang saklaw. Nagla-log ng mga paghahanap. Ang ilang salin ay hindi gumagamit ng caching para sa licensing |

### Halimbawa: Kumuha ng Teksto ng Talata

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

Base path: `/content/songs`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Maghanap ng mga kanta ayon sa query |
| GET | `/:id` | JWT | — | Kunin ang isang kanta ayon sa ID |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng kanta |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga kanta (batch) |
| POST | `/import` | JWT | — | Mag-import ng mga kanta mula sa FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang kanta |

## Mga Detalye ng Kanta

Base path: `/content/songDetails`

Ang mga detalye ng kanta ay pandaigdig (hindi naka-scope sa simbahan). Ang mga ito ay kumakatawan sa canonical na metadata ng kanta na ibinahagi sa lahat ng simbahan.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang detalye ng kanta ayon sa ID (pandaigdig) |
| GET | `/` | JWT | — | Ilista ang mga detalye ng kanta para sa simbahan |
| POST | `/create` | JWT | — | Lumikha ng detalye ng kanta mula sa PraiseCharts ID (nagbabalik ng umiiral kung nagawa na). Awtomatikong kinukuha ang metadata mula sa PraiseCharts at MusicBrainz |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga detalye ng kanta (batch) |

## Mga Link ng Detalye ng Kanta

Base path: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang link ng detalye ng kanta ayon sa ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Kunin ang lahat ng link para sa isang detalye ng kanta |
| POST | `/` | JWT | — | Lumikha o mag-update ng mga link ng detalye ng kanta (batch). Awtomatikong kinukuha ang MusicBrainz data kung naka-link |
| DELETE | `/:id` | JWT | — | Burahin ang isang link ng detalye ng kanta |

## Mga Arrangement

Base path: `/content/arrangements`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Kunin ang isang arrangement ayon sa ID |
| GET | `/song/:songId` | JWT | Content.Edit | Kunin ang mga arrangement para sa isang kanta |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Kunin ang mga arrangement para sa isang detalye ng kanta |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Hanapin ang mga FreeShow ID na wala sa simbahan. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang arrangement (binubura din ang mga key; binubura ang kanta kung walang natitirang arrangement) |

## Mga Key ng Arrangement

Base path: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Pampubliko | — | Kunin ang arrangement key na may buong data ng kanta para sa presenter view |
| GET | `/:id` | JWT | — | Kunin ang isang arrangement key ayon sa ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Kunin ang mga key para sa isang arrangement |
| GET | `/` | JWT | Content.Edit | Ilista ang lahat ng arrangement key |
| POST | `/` | JWT | Content.Edit | Lumikha o mag-update ng mga arrangement key (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Burahin ang isang arrangement key |

## Mga Setting

Base path: `/content/settings`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Kunin ang mga setting ng kasalukuyang gumagamit |
| GET | `/` | JWT | Settings.Edit | Kunin ang lahat ng setting para sa simbahan |
| GET | `/public/:churchId` | Pampubliko | — | Kunin ang mga pampublikong setting para sa isang simbahan (ibinalik bilang mga key-value pair) |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | Kunin ang mga setting ng auto-import (mga YouTube/Vimeo channel ID) |
| POST | `/my` | JWT | — | I-save ang mga setting ng antas ng gumagamit (sinusuportahan ang base64 na pag-upload ng imahe) |
| POST | `/` | JWT | Settings.Edit | I-save ang mga setting ng antas ng simbahan (sinusuportahan ang base64 na pag-upload ng imahe) |
| DELETE | `/my/:id` | JWT | — | Burahin ang isang setting ng gumagamit |

## Preview

Base path: `/content/preview`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Pampubliko | — | I-load ang data ng streaming preview para sa isang simbahan ayon sa subdomain key (mga tab, link, serbisyo, sermon) |

## Gallery (Mga Stock Photo)

Base path: `/content/stock`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/search` | Pampubliko | — | Maghanap ng mga Pexels stock photo. Body: `{ term: "church" }` |

## PraiseCharts

Base path: `/content/praiseCharts`

Integrasyon sa PraiseCharts para sa pagtuklas ng mga kanta sa pagsamba at pag-download ng mga sheet music.

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Kunin ang raw na PraiseCharts data para sa isang kanta |
| GET | `/hasAccount` | JWT | — | Suriin kung ang gumagamit ay may naka-link na PraiseCharts account |
| GET | `/search?q=` | JWT | — | Maghanap sa PraiseCharts catalog |
| GET | `/products/:id?keys=` | JWT | — | Kunin ang mga produkto para sa isang kanta (mula sa library kung naka-authenticate, kung hindi mula sa catalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Kunin ang raw na data ng arrangement mula sa library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Mag-download ng file mula sa PraiseCharts (PDF o ZIP). Nagbabalik ng `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Pampubliko | — | Kunin ang OAuth authorization URL para sa PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Ipagpalit ang OAuth verifier para sa access token at i-save sa mga setting ng gumagamit |
| GET | `/library` | JWT | — | I-browse ang PraiseCharts library ng gumagamit |

## Support

Base path: `/content/support`

| Method | Path | Auth | Permission | Paglalarawan |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Pampubliko | — | I-convert ang SSML sa MP3 audio gamit ang AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Mga Kaugnay na Pahina

- [Mga Endpoint ng Membership](./membership) -- Mga tao, simbahan, grupo, tungkulin, pahintulot
- [Mga Endpoint ng Attendance](./attendance) -- Pagsubaybay ng serbisyo at pagbisita
- [Authentication at Mga Pahintulot](./authentication) -- Daloy ng pag-login, JWT, modelo ng pahintulot
- [Istraktura ng Module](../module-structure) -- Mga pattern ng organisasyon ng code
