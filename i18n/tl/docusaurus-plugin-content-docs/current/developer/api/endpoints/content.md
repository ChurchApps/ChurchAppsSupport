---
title: "Content Endpoints"
---

# Content Endpoints

<div class="article-intro">

Ang Content module ay namamahala sa mga pahina ng website, mga section, elemento, blok, blog post, redirect, sermon, playlist, streaming service, kaganapan, curated calendar, file, gallery, Bible translation at verse lookup, kanta, arrangement, global style, stock photo, at setting. Ito ang pinakamalaking module sa API at nag-power ng CMS, media/streaming, worship planning, at Bible feature sa lahat ng ChurchApps application.

</div>

**Base path:** `/content`

## Pahina

Base path: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | I-load ang full page tree (section, element, blok) sa pamamagitan ng URL o ID. Nag-strip ng internal ID kapag kinuha ng URL. Ang URL-based fetch ay nag-enforce ng `pages.visibility` -- ang isang gated page ay nagbabalik ng `{ restricted: true, visibility }` maliban kung ang (optional) JWT ay nakatugon sa gate |
| GET | `/public/:churchId` | Public | — | Itala ang public page (`url`, `title`, `metaDescription`); lamang ang `visibility = everyone` |
| GET | `/:id` | JWT | — | Makakuha ng pahina sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng pahina para sa simbahan |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang pahina na may lahat ng section at elemento |
| POST | `/temp/ai` | JWT | Content.Edit | Magsave ng AI-generated na pahina (pahina, section, at elemento sa isang tawag) |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga pahina (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang pahina |

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

## Section

Base path: `/content/sections`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng section sa pamamagitan ng ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Kopyahin ang isang section o i-convert ito sa isang reusable block |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga section (batch). Awtomatikong nag-update ng sort order |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang section (awtomatikong nag-update ng sort order) |

## Elemento

Base path: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng elemento sa pamamagitan ng ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Kopyahin ang isang elemento na may lahat ng mga anak |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga elemento (batch). Awtomatikong namamahala ng row column at carousel slide |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang elemento |

## Blok

Base path: `/content/blocks`

Nag-extend ng standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng blok sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng blok |
| GET | `/:churchId/tree/:id` | Public | — | I-load ang full block tree na may section at elemento |
| GET | `/blockType/:blockType` | JWT | — | I-load ang mga blok ayon sa type (e.g. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | I-load ang footer block tree para sa isang simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga blok |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang blok |

## Link

Base path: `/content/links`

Nag-extend ng standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng link sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng link. Optional `?category=` filter. Awtomatikong nag-sort pagkatapos ng pagsave |
| GET | `/church/:churchId/filtered?category=` | JWT | — | I-load ang mga link na na-filter ayon sa visibility (everyone, visitor, miyembro, staff, grupo) |
| GET | `/church/:churchId?category=` | Public | — | I-load ang mga link para sa isang simbahan ayon sa kategorya (public) |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga link (batch). Awtomatikong nag-sort ayon sa kategorya |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang link |

## Global Style

Base path: `/content/globalStyles`

Nag-extend ng standard CRUD (POST `/`, DELETE `/:id` mula sa base class na may Content.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | I-load ang global style para sa isang simbahan (nagbabalik ng default kung walang na-set) |
| GET | `/` | JWT | — | I-load ang global style para sa authenticated na simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang global style |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang global style |

## Page History

Base path: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Itala ang history entry para sa isang pahina |
| GET | `/block/:blockId` | JWT | Content.Edit | Itala ang history entry para sa isang blok |
| GET | `/:id` | JWT | Content.Edit | Makakuha ng history entry sa pamamagitan ng ID |
| POST | `/` | JWT | Content.Edit | Magsave ng page/block snapshot. Peryodikong nag-clean ng entry na mas matatanda sa 30 araw |
| POST | `/restore/:id` | JWT | Content.Edit | Ibalik ang page/block mula sa history snapshot (tinatanggal ang kasalukuyang content at nire-recreate mula sa snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Ibalik mula sa inline snapshot object. Body: `{ pageId, blockId, snapshot }` |

## Post (Blog)

Base path: `/content/posts`

Ang mga blog post ay metadata sa regular na mga pahina: ang bawat post ng `pageId` ay tumutukoy sa pahina na may hawak ng katawan, at ang post row ay nagdadagdag ng `title`, `slug` (natatangi bawat simbahan), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, at `tags`. Ang isang post ay ini-publish kapag `publishDate` ay naka-set at nasa nakaraan. Tingnan ang [Website Builder Architecture](../../architecture/website-builder#blog-posts-over-pages).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | Itala ang nai-publish na mga post, pag-page (max 50 bawat pahina) |
| GET | `/public/:churchId/slug/:slug` | Public | — | Makakuha ng nai-publish na post metadata sa slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0 feed ng nai-publish na mga post (link na binuo bilang `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Makakuha ng post sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng post para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang post |

## Redirect

Base path: `/content/redirects`

Bawat-simbahan URL redirect (`fromPath` → `toPath`), capped sa 200 bawat simbahan. Ang mga path ay normalized (lowercased, leading slash, walang trailing slash) at `fromPath` ay natatangi bawat simbahan. Ang B1App ay nalulutas ang mga ito sa magiging 404 at naglalabas ng HTTP 308.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Solusyunan ang isang path (o itala ang lahat ng redirect kapag `path` ay inalis) |
| GET | `/:id` | JWT | — | Makakuha ng redirect sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng redirect para sa simbahan |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang redirect. Tinatanggihan ang `fromPath = toPath` at nag-enforce ng 200-row cap |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang redirect |

## Sermon

Base path: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Makakuha ng sample FreeShow playlist structure |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Makakuha ng TV app wrapper na may sermon, lesson, at FreeShow source |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Makakuha ng isang sermon bilang TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Public | — | Makakuha ng lahat ng public na playlist/sermon bilang TV feed |
| GET | `/public/:churchId` | Public | — | Itala ang lahat ng public na sermon para sa isang simbahan |
| GET | `/timeline?sermonIds=` | JWT | — | I-load ang timeline data para sa mga sermon |
| GET | `/lookup?videoType=&videoData=` | Public | — | Hanapin ang sermon metadata mula sa YouTube o Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Bumuo ng AI social media post suggestion mula sa sermon subtitle |
| GET | `/outline?url=&title=&author=` | JWT | — | Bumuo ng AI lesson outline mula sa isang URL |
| GET | `/youtubeImport/:channelId` | JWT | — | I-import ang mga video mula sa isang YouTube channel |
| GET | `/vimeoImport/:channelId` | JWT | — | I-import ang mga video mula sa isang Vimeo channel |
| GET | `/:id` | JWT | — | Makakuha ng sermon sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng sermon |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o i-update ang mga sermon (batch, sinusuportahan ang base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang sermon |

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

## Playlist

Base path: `/content/playlists`

Nag-extend ng standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` mula sa base class na may StreamingServices.Edit permission para sa pagsusulat).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng playlist sa pamamagitan ng ID |
| GET | `/` | JWT | — | Itala ang lahat ng playlist |
| GET | `/public/:churchId` | Public | — | Itala ang lahat ng public na playlist para sa isang simbahan |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o i-update ang mga playlist (batch, sinusuportahan ang base64 thumbnail upload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang playlist |

## Streaming Service

Base path: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Makakuha ng encrypted host chat room ID para sa isang serbisyo |
| GET | `/` | JWT | — | Itala ang lahat ng streaming service. Awtomatikong nag-clean ng nag-expire na non-recurring service at nag-advance ng recurring |
| POST | `/` | JWT | StreamingServices.Edit | Lumikha o i-update ang mga streaming service (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Tanggalin ang streaming service (pati na rin nag-clear ng blocked IP) |

## Kaganapan

Base path: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | I-load ang timeline event para sa isang grupo |
| GET | `/timeline?eventIds=` | JWT | — | I-load ang timeline event para sa mga grupo ng kasalukuyang user |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Mag-subscribe sa kaganapan bilang ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Makakuha ng kaganapan para sa isang grupo (kasama ang exception date) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Makakuha ng public na kaganapan para sa isang grupo |
| GET | `/:id` | JWT | — | Makakuha ng kaganapan sa pamamagitan ng ID |
| POST | `/` | JWT | — | Lumikha o i-update ang mga kaganapan (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang kaganapan |

## Event Exception

Base path: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Makakuha ng event exception sa pamamagitan ng ID |
| POST | `/` | JWT | Content.Edit | Lumikha o i-update ang mga event exception (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Tanggalin ang event exception |

## Curated Calendar

Ang seksyon ay patuloy. Ito ay mahabang endpoint documentation. Ang iba pang seksyon ay kasama ang Bible, Songs, Gallery, Streaming, Settings, at File Upload.
