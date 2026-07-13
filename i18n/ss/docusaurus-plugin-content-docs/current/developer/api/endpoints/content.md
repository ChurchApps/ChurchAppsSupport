---
title: "Ema-Endpoint E-Content"
---

# Ema-Endpoint E-Content

<div class="article-intro">

I-module ye-Content iphatsa emakhasi ewebhusayithi, tigaba, ema-element, ema-block, imibhalo ye-blog, kuphindzelwa (redirects), tishumayelo, ema-playlist, ema-service ekusakaza, imicimbi, emakhalenda lakhetsiwe, emafayela, ema-gallery, tinguqulo teliBhayibheli kanye nekufuna emavesi, tingoma, ema-arrangement, tinhlobo tesitayela lesihlangene, tifombe temitfombo, kanye netilungiselelo. Iyona module lenkhulu kakhulu ku-API futsi isebentisa i-CMS, i-media/kusakaza, kuhlelwa kwekukhonta, kanye netici teliBhayibheli kuwo wonkhe ema-app e-ChurchApps.

</div>

**Umkhondvo Losisekelo:** `/content`

## Emakhasi

Umkhondvo losisekelo: `/content/pages`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Ngeyeveleni | — | Layisha i-tree yelikhasi lelphelele (tigaba, ema-element, ema-block) nge-URL nobe ID. Susa ema-ID angekhatsi nangabe kutfolwe nge-URL. Kutfola ngeku-URL kuphatsa i-`pages.visibility` — likhasi lelivinjelwe libuyisela `{ restricted: true, visibility }` ngaphandle kwe-JWT (lengakhetsi) leyanelisa lokuvinjelwe |
| GET | `/public/:churchId` | Ngeyeveleni | — | Bala emakhasi eveleni (`url`, `title`, `metaDescription`); kuphela `visibility = everyone` |
| GET | `/:id` | JWT | — | Tfola likhasi nge-ID |
| GET | `/` | JWT | — | Bala onkhe emakhasi elibandla |
| POST | `/duplicate/:id` | JWT | Content.Edit | Phindza likhasi kanye netonkhe tigaba nema-element |
| POST | `/temp/ai` | JWT | Content.Edit | Gcina likhasi lelakhiwe yi-AI (likhasi, tigaba, kanye nema-element ngasicelo sinye) |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa emakhasi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula likhasi |

### Sibonelo: Layisha I-Tree Yelikhasi

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

## Tigaba

Umkhondvo losisekelo: `/content/sections`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola sigaba nge-ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Phindza sigaba nobe usiguqule sibe yi-block lengasetjentiswa kaningi |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa tigaba (batch). Izenzakalelisa kubuyeketa luhla lwekuhlela |
| DELETE | `/:id` | JWT | Content.Edit | Sula sigaba (izenzakalelisa kubuyeketa luhla lwekuhlela) |

## Ema-Element

Umkhondvo losisekelo: `/content/elements`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola element nge-ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Phindza element kanye netonkhe bantfwana bayo |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa ema-element (batch). Iphatsa ngekutentekela emakholomu emugca kanye netitfombe te-carousel |
| DELETE | `/:id` | JWT | Content.Edit | Sula element |

## Ema-Block

Umkhondvo losisekelo: `/content/blocks`

Yandzisa i-CRUD levamile (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` kusuka ku-base class nemvumo ye-Content.Edit ekubhalweni).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola block nge-ID |
| GET | `/` | JWT | — | Bala onkhe ema-block |
| GET | `/:churchId/tree/:id` | Ngeyeveleni | — | Layisha i-tree lephelele ye-block kanye netigaba nema-element |
| GET | `/blockType/:blockType` | JWT | — | Layisha ema-block nge-luhlobo (sibonelo footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Ngeyeveleni | — | Layisha i-tree ye-footer block yelibandla |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa ema-block |
| DELETE | `/:id` | JWT | Content.Edit | Sula block |

## Emalinki

Umkhondvo losisekelo: `/content/links`

Yandzisa i-CRUD levamile (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` kusuka ku-base class nemvumo ye-Content.Edit ekubhalweni).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola linki nge-ID |
| GET | `/` | JWT | — | Bala onkhe emalinki. `?category=` kungakhetsi kucenga. Izenzakalelisa kuhlela ngemuva kwekugcina |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Layisha emalinki acengiwe nge-kubonakala (wonkhe, tivakashi, emalunga, bomatafula, emacembu) |
| GET | `/church/:churchId?category=` | Ngeyeveleni | — | Layisha emalinki elibandla nge-luhlobo (yeveleni) |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa emalinki (batch). Izenzakalelisa kuhlela nge-luhlobo |
| DELETE | `/:id` | JWT | Content.Edit | Sula linki |

## Tinhlobo Tesitayela Lesihlangene

Umkhondvo losisekelo: `/content/globalStyles`

Yandzisa i-CRUD levamile (POST `/`, DELETE `/:id` kusuka ku-base class nemvumo ye-Content.Edit ekubhalweni).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Ngeyeveleni | — | Layisha tinhlobo tesitayela lesihlangene telibandla (ibuyisela lokwentiwa ngekwentiwa nangabe kute lokuhleliwe) |
| GET | `/` | JWT | — | Layisha tinhlobo tesitayela lesihlangene telibandla lelitivakalisiwe |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa tinhlobo tesitayela lesihlangene |
| DELETE | `/:id` | JWT | Content.Edit | Sula tinhlobo tesitayela lesihlangene |

## Umlandvo Welikhasi

Umkhondvo losisekelo: `/content/pageHistory`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Bala tingeniso temlandvo welikhasi |
| GET | `/block/:blockId` | JWT | Content.Edit | Bala tingeniso temlandvo we-block |
| GET | `/:id` | JWT | Content.Edit | Tfola singeniso semlandvo nge-ID |
| POST | `/` | JWT | Content.Edit | Gcina sitfombe (snapshot) selikhasi/block. Ihlambulula ngesikhatsi tingeniso letindzala kunemalanga langu-30 |
| POST | `/restore/:id` | JWT | Content.Edit | Buyisela likhasi/block kusuka ku-snapshot yemlandvo (isula kucuketfwe kwanyalo bese yakha kabusha kusuka ku-snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Buyisela kusuka ku-snapshot lengekhatsi. Umtimba: `{ pageId, blockId, snapshot }` |

## Ema-Post (Blog)

Umkhondvo losisekelo: `/content/posts`

Imibhalo ye-blog yidatha lengetulu kwemakhasi lavamile: i-`pageId` ye-post ngayinye ikhomba likhasi legcina umtimba, futsi umugca we-post wengeta i-`title`, `slug` (ngeyodvwa ku-libandla ngalinye), `excerpt`, `authorId`, `photoUrl`, `publishDate`, `category`, kanye ne-`tags`. I-post ishicelelwa nge-`publishDate` seyihleliwe futsi seyendlulile. Buka [Website Builder Architecture](../../architecture/website-builder#blog-posts-over-pages).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Ngeyeveleni | — | Bala ema-post lashicelelwe, ahlukaniswe ngemakhasi (kungadlulisi 50 kulikhasi ngalinye) |
| GET | `/public/:churchId/slug/:slug` | Ngeyeveleni | — | Tfola idatha ye-post lesishicelelwe nge-slug |
| GET | `/rss/:churchId?siteUrl=` | Ngeyeveleni | — | I-feed ye-RSS 2.0 yema-post lashicelelwe (emalinki akhiwe njenge-`{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Tfola post nge-ID |
| GET | `/` | JWT | — | Bala onkhe ema-post elibandla |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa ema-post (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula post |

## Kuphindzelwa (Redirects)

Umkhondvo losisekelo: `/content/redirects`

Kuphindzelwa kwe-URL kwelibandla ngalinye (`fromPath` → `toPath`), kuvinjelwe ku-200 kulibandla ngalinye. Imikhondvo ihlelwa (tinhlamvu letincane, i-slash yekucala, akukho i-slash yekugcina) futsi i-`fromPath` yiyodvwa kulibandla ngalinye. I-B1App isombulula loku kuma-404 lasagcina kuba khona futsi ikhipha i-HTTP 308.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Ngeyeveleni | — | Sombulula umkhondvo (nobe bala konkhe kuphindzelwa nangabe `path` ingakanikwa) |
| GET | `/:id` | JWT | — | Tfola kuphindzelwa nge-ID |
| GET | `/` | JWT | — | Bala konkhe kuphindzelwa kwelibandla |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa kuphindzelwa. Iyala `fromPath = toPath` futsi iphatsa luvinjelo lwe-200 |
| DELETE | `/:id` | JWT | Content.Edit | Sula kuphindzelwa |

## Tishumayelo

Umkhondvo losisekelo: `/content/sermons`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Tfola sifanekiso sesibonelo se-FreeShow playlist |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Tfola i-TV app wrapper lene-sermon, sifundvo, kanye netinhloko te-FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Ngeyeveleni | — | Tfola shumayelo linye njenge-TV feed playlist |
| GET | `/public/tvFeed/:churchId` | Ngeyeveleni | — | Tfola onkhe ema-playlist/tishumayelo teveleni njenge-TV feed |
| GET | `/public/:churchId` | Ngeyeveleni | — | Bala tonkhe tishumayelo teveleni telibandla |
| GET | `/timeline?sermonIds=` | JWT | — | Layisha idatha ye-timeline yetishumayelo |
| GET | `/lookup?videoType=&videoData=` | Ngeyeveleni | — | Fumana idatha yeshumayelo kusuka ku-YouTube nobe Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Khicita ticebiso te-post te-social media letakhwe yi-AI kusuka kuma-subtitle eshumayelo |
| GET | `/outline?url=&title=&author=` | JWT | — | Khicita sifanekiso se-lesson lesakhwe yi-AI kusuka ku-URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Ngenisa emavidiyo kusuka ku-channel ye-YouTube |
| GET | `/vimeoImport/:channelId` | JWT | — | Ngenisa emavidiyo kusuka ku-channel ye-Vimeo |
| GET | `/:id` | JWT | — | Tfola shumayelo nge-ID |
| GET | `/` | JWT | — | Bala onkhe tishumayelo |
| POST | `/` | JWT | StreamingServices.Edit | Akha nobe buyeketa tishumayelo (batch, kusekela kulayishwa kwesitfombe se-base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Sula shumayelo |

### Sibonelo: Fumana Shumayelo Le-YouTube

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

## Ema-Playlist

Umkhondvo losisekelo: `/content/playlists`

Yandzisa i-CRUD levamile (GET `/:id`, GET `/`, DELETE `/:id` kusuka ku-base class nemvumo ye-StreamingServices.Edit ekubhalweni).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola playlist nge-ID |
| GET | `/` | JWT | — | Bala onkhe ema-playlist |
| GET | `/public/:churchId` | Ngeyeveleni | — | Bala onkhe ema-playlist eveleni elibandla |
| POST | `/` | JWT | StreamingServices.Edit | Akha nobe buyeketa ema-playlist (batch, kusekela kulayishwa kwesitfombe se-base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Sula playlist |

## Ema-Service Ekusakaza

Umkhondvo losisekelo: `/content/streamingServices`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Tfola ID lekamelo le-chat le-host lesifihliwe le-service |
| GET | `/` | JWT | — | Bala onkhe ema-service ekusakaza. Izenzakalelisa kuhlambulula ema-service langakaphindzi lasaphelile futsi ichubekise laphindzako |
| POST | `/` | JWT | StreamingServices.Edit | Akha nobe buyeketa ema-service ekusakaza (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Sula service yekusakaza (futsi isule ema-IP lavinjelwe) |

## Imicimbi

Umkhondvo losisekelo: `/content/events`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Layisha imicimbi ye-timeline yelicembu |
| GET | `/timeline?eventIds=` | JWT | — | Layisha imicimbi ye-timeline yemacembu emsebentisi wanyalo |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Ngeyeveleni | — | Bhalisela imicimbi njenge-ICS calendar feed |
| GET | `/group/:groupId` | JWT | — | Tfola imicimbi yelicembu (kufaka emalanga elidzabukiswa) |
| GET | `/public/group/:churchId/:groupId` | Ngeyeveleni | — | Tfola imicimbi yeveleni yelicembu |
| GET | `/:id` | JWT | — | Tfola umcimbi nge-ID |
| POST | `/` | JWT | — | Akha nobe buyeketa imicimbi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula umcimbi |

## Kudzabukiswa Kwemicimbi

Umkhondvo losisekelo: `/content/eventExceptions`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola kudzabukiswa kwemcimbi nge-ID |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa kudzabukiswa kwemicimbi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula kudzabukiswa kwemcimbi |

## Emakhalenda Lakhetsiwe

Umkhondvo losisekelo: `/content/curatedCalendars`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola khalenda lekhetsiwe nge-ID |
| GET | `/` | JWT | — | Bala onkhe emakhalenda lakhetsiwe |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa emakhalenda lakhetsiwe (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula khalenda lelikhetsiwe |

## Imicimbi Lekhetsiwe

Umkhondvo losisekelo: `/content/curatedEvents`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Tfola imicimbi lekhetsiwe yekhalenda (kufaka imininingwane yemcimbi kanye nemalanga elidzabukiswa ngaphandle nangabe `?withoutEvents` ihleliwe) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Ngeyeveleni | — | Tfola imicimbi lekhetsiwe yeveleni yekhalenda |
| GET | `/:id` | JWT | — | Tfola umcimbi lokhetsiwe nge-ID |
| GET | `/` | JWT | — | Bala yonkhe imicimbi lekhetsiwe |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa imicimbi lekhetsiwe. Isekela luhla lwe-`eventIds` kwengeta imicimbi lekhetsekile yemacembu |
| DELETE | `/:id` | JWT | Content.Edit | Sula umcimbi lokhetsiwe |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Susa umcimbi lokhetsekile ekhalendeni lelikhetsiwe |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Susa yonkhe imicimbi yelicembu ekhalendeni lelikhetsiwe |

## Emafayela

Umkhondvo losisekelo: `/content/files`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Tfola emafayela nge-luhlobo lwekucuketfwe kanye ne-ID |
| GET | `/` | JWT | — | Bala onkhe emafayela ewebhusayithi yelibandla |
| GET | `/:id` | JWT | — | Tfola fayela nge-ID |
| POST | `/` | JWT | Content.Edit* | Layisha emafayela (base64). *Kuvunywe futsi nangabe umsebentisi alilunga lelicembu lelihambisana ne-`contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Tfola i-URL yekulayisha ye-S3 lesayinwe kucala. *Kuvunywe futsi kumalunga elicembu. Kudlula ku-100MB ngesitfo ngasinye sekucuketfwe |
| DELETE | `/:id` | JWT | Content.Edit* | Sula fayela futsi ususe endzaweni yekugcina. *Kuvunywe futsi kumalunga elicembu |

## I-Gallery

Umkhondvo losisekelo: `/content/gallery`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Ngeyeveleni | — | Bala titfombe temtfombo ku-folda |
| GET | `/:folder` | JWT | Content.Edit | Bala titfombe te-gallery ku-folda |
| POST | `/requestUpload` | JWT | Content.Edit | Tfola i-URL yekulayisha ye-S3 lesayinwe kucala sitfombe se-gallery |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Sula sitfombe se-gallery |

## LiBhayibheli

Umkhondvo losisekelo: `/content/bibles`

Onkhe ema-endpoint eliBhayibheli ngeveleni (akukho kutivakalisa lokudzingekako). Idatha itfolwa kutinsika letingaphandle futsi igcinwe endzaweni.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | Ngeyeveleni | — | Bala tonkhe tinguqulo teliBhayibheli (itfola kunsika nangabe indzawo yekugcina ingenalutfo) |
| GET | `/stats?startDate=&endDate=` | Ngeyeveleni | — | Tfola tibalo tekufunwa kweliBhayibheli sikhatsi lesitsite |
| GET | `/availableTranslations/:source` | Ngeyeveleni | — | Bala tinguqulo letitfolakalako kunsika (sibonelo api.bible) |
| GET | `/updateTranslations` | Ngeyeveleni | — | Hambisana tonkhe tinguqulo kuto tonkhe tinsika |
| GET | `/updateTranslations/:source` | Ngeyeveleni | — | Hambisana tinguqulo kunsika lekhetsekile |
| GET | `/updateCopyrights` | Ngeyeveleni | — | Buyeketa imininingwane ye-copyright yetinguqulo letiyintulako |
| GET | `/:translationKey/updateCopyright` | Ngeyeveleni | — | Buyeketa i-copyright yenguqulo lekhetsekile |
| GET | `/:translationKey/search?query=&limit=` | Ngeyeveleni | — | Fumana emavesi enguqulo |
| GET | `/:translationKey/books` | Ngeyeveleni | — | Tfola tincwadzi tenguqulo (igcina endzaweni) |
| GET | `/:translationKey/:bookKey/chapters` | Ngeyeveleni | — | Tfola tehluko tencwadzi (igcina endzaweni) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Ngeyeveleni | — | Tfola emavesi esehluko (igcina endzaweni) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Ngeyeveleni | — | Tfola umbhalo wemavesi sikhatsi lesitsite. Ibhala phansi kufunwa. Letinye tinguqulo tishaya indiva kugcinwa ngenca yemvumo |

### Sibonelo: Tfola Umbhalo Wevesi

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

## Tingoma

Umkhondvo losisekelo: `/content/songs`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Fumana tingoma nge-query |
| GET | `/:id` | JWT | — | Tfola ingoma nge-ID |
| GET | `/` | JWT | Content.Edit | Bala tonkhe tingoma |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa tingoma (batch) |
| POST | `/import` | JWT | — | Ngenisa tingoma kusuka ku-FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula ingoma |

## Imininingwane Yengoma

Umkhondvo losisekelo: `/content/songDetails`

Imininingwane yengoma ijikelele (ayincishiswa libandla). Yimela idatha yengoma leyaziwako lehlanganyelwako emabandleni.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola imininingwane yengoma nge-ID (jikelele) |
| GET | `/` | JWT | — | Bala imininingwane yetingoma yelibandla |
| POST | `/create` | JWT | — | Akha imininingwane yengoma kusuka ku-ID ye-PraiseCharts (ibuyisela leyekhona nangabe seyakhiwe). Izitfole ngekutentekela idatha kusuka ku-PraiseCharts ne-MusicBrainz |
| POST | `/` | JWT | — | Akha nobe buyeketa imininingwane yetingoma (batch) |

## Emalinki Emininingwane Yengoma

Umkhondvo losisekelo: `/content/songDetailLinks`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola linki yemininingwane yengoma nge-ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Tfola onkhe emalinki emininingwane yengoma |
| POST | `/` | JWT | — | Akha nobe buyeketa emalinki emininingwane yetingoma (batch). Izitfole ngekutentekela idatha ye-MusicBrainz nangabe kuhlanganisiwe |
| DELETE | `/:id` | JWT | — | Sula linki yemininingwane yengoma |

## Ema-Arrangement

Umkhondvo losisekelo: `/content/arrangements`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Tfola arrangement nge-ID |
| GET | `/song/:songId` | JWT | Content.Edit | Tfola ema-arrangement engoma |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Tfola ema-arrangement emininingwane yengoma |
| GET | `/` | JWT | Content.Edit | Bala onkhe ema-arrangement |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa ema-arrangement (batch) |
| POST | `/freeShow/missing` | JWT | — | Fumana ema-ID e-FreeShow langekho elibandleni. Umtimba: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Sula arrangement (isule netikhiya futsi isule ingoma nangabe kute ema-arrangement lasele) |

## Tikhiya Te-Arrangement

Umkhondvo losisekelo: `/content/arrangementKeys`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Ngeyeveleni | — | Tfola sikhiya se-arrangement kanye nedatha yengoma legcwele ye-presenter |
| GET | `/:id` | JWT | — | Tfola sikhiya se-arrangement nge-ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Tfola tikhiya te-arrangement |
| GET | `/` | JWT | Content.Edit | Bala tonkhe tikhiya te-arrangement |
| POST | `/` | JWT | Content.Edit | Akha nobe buyeketa tikhiya te-arrangement (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Sula sikhiya se-arrangement |

## Tilungiselelo

Umkhondvo losisekelo: `/content/settings`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Tfola tilungiselelo temsebentisi wanyalo |
| GET | `/` | JWT | Settings.Edit | Tfola tonkhe tilungiselelo telibandla |
| GET | `/public/:churchId` | Ngeyeveleni | — | Tfola tilungiselelo teveleni telibandla (kubuyiselwa njengema-key-value pair) |
| POST | `/my` | JWT | — | Gcina tilungiselelo tesigaba semsebentisi (kusekela kulayishwa kwesitfombe se-base64) |
| POST | `/` | JWT | Settings.Edit | Gcina tilungiselelo tesigaba selibandla (kusekela kulayishwa kwesitfombe se-base64) |
| DELETE | `/my/:id` | JWT | — | Sula lulungiselelo lwemsebentisi |

## Kubukela Ngaphambili (Preview)

Umkhondvo losisekelo: `/content/preview`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Ngeyeveleni | — | Layisha idatha yekubukela ngaphambili yekusakaza yelibandla nge-key ye-subdomain (ema-tab, emalinki, ema-service, tishumayelo) |

## I-Gallery (Titfombe Temtfombo)

Umkhondvo losisekelo: `/content/stock`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/search` | Ngeyeveleni | — | Fumana titfombe temtfombo te-Pexels. Umtimba: `{ term: "church" }` |

## PraiseCharts

Umkhondvo losisekelo: `/content/praiseCharts`

Kuhlanganiswa ne-PraiseCharts kutfola tingoma tekukhonta kanye nekulayisha emafayela emculo lobhaliwe.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Tfola idatha yeveleni ye-PraiseCharts yengoma |
| GET | `/hasAccount` | JWT | — | Hlola nangabe umsebentisi unayo i-akhawundi ye-PraiseCharts lehlanganisiwe |
| GET | `/search?q=` | JWT | — | Fumana ku-luhla lwe-PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Tfola tikhicito tengoma (kusuka ku-library nangabe kutivakalisiwe, nangako kusuka ku-luhla) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Tfola idatha yeveleni ye-arrangement kusuka ku-library |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Layisha fayela kusuka ku-PraiseCharts (PDF nobe ZIP). Ibuyisela `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Ngeyeveleni | — | Tfola i-URL yekutivakalisa ye-OAuth ye-PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Shintjanisa i-OAuth verifier ibe token yekufinyelela bese uyigcina kutilungiselelo temsebentisi |
| GET | `/library` | JWT | — | Hlola i-library ye-PraiseCharts yemsebentisi |

## Kusekela

Umkhondvo losisekelo: `/content/support`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Ngeyeveleni | — | Guqula i-SSML ibe umsindvo we-MP3 kusetjentiswa i-AWS Polly. Umtimba: `{ ssml: "<speak>...</speak>" }` |

## Emakhasi Lahlobene

- [Website Builder Architecture](../../architecture/website-builder) -- Indlela emakhasi, tigaba, ema-element, ema-post, kanye nekuphindzelwa lokuhlanganiswa ngayo kuwo wonkhe ema-app
- [Membership Endpoints](./membership) -- Bantfu, emabandla, emacembu, ema-role, timvumo
- [Attendance Endpoints](./attendance) -- Kulandzelela service kanye nekuvakasha
- [Authentication & Permissions](./authentication) -- Inchubo yekungena, JWT, sifanekiso semvumo
- [Module Structure](../module-structure) -- Sifanekiso sekuhlelwa kwekhodi
