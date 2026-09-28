---
title: "Innhold-endepunkter"
---

# Innhold-endepunkter

<div class="article-intro">

Innholdmodulen administrerer nettstedssider, seksjoner, elementer, blokker, blogginnlegg, omdirigeringer, prekenoter, avspillingslister, strømmingstjenester, arrangementer, kuraterte kalendere, filer, gallerier, bibeltranslaksjoner og verslettkslipp, sanger, arrangementer, globale stiler, arkivfoto og innstillinger. Det er den største modulen i API-en og driver CMS, media/streaming, worship planning og bibelfunksjoner på tvers av alle ChurchApps-applikasjoner.

</div>

**Basisbane:** `/content`

## Sider

Basisbane: `/content/pages`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Last fullt sidetre (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er når de hentes etter URL. URL-baserte hentinger håndhever `pages.visibility` – en gate-side returnerer `{ restricted: true, visibility }` med mindre den (valgfrie) JWT oppfyller gaten |
| GET | `/public/:churchId` | Public | — | List offentlige sider (`url`, `title`, `metaDescription`); kun `visibility = everyone` |
| GET | `/:id` | JWT | — | Hent en side etter ID |
| GET | `/` | JWT | — | List alle sider for kirken |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser en side med alle seksjoner og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Lagre en AI-generert side (side, seksjoner og elementer i ett anrop) |
| POST | `/importTree` | JWT | Content.Edit | Opprett en side fra et nestet tre (`title`, `url`, `sections[].elements[]…`). Setter alltid under samtalepartnerens kirke; id-er i kroppen ignoreres. Radene må inkludere deres `column`-barn. Maks 30 seksjoner / 500 elementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sider (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en side |

### Eksempel: Last sidetree

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

## Seksjoner

Basisbane: `/content/sections`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en seksjon etter ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliser en seksjon eller konverter den til en gjenbrukbar blokk |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater seksjoner (batch). Oppdaterer sorteringsrekkefølge automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett en seksjon (oppdaterer sorteringsrekkefølge automatisk) |

## Elementer

Basisbane: `/content/elements`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et element etter ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser et element med alle barn |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater elementer (batch). Administrerer radkolonner og karusellglidinger automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett et element |

## Blokker

Basisbane: `/content/blocks`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklasse med Content.Edit-tillatelse for skrivinger).

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokk etter ID |
| GET | `/` | JWT | — | List alle blokker |
| GET | `/:churchId/tree/:id` | Public | — | Last fullt blokktre med seksjoner og elementer |
| GET | `/blockType/:blockType` | JWT | — | Last blokker etter type (f.eks. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Last fotseksjonblokk for en kirke |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater blokker |
| DELETE | `/:id` | JWT | Content.Edit | Slett en blokk |

## Lenker

Basisbane: `/content/links`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklasse med Content.Edit-tillatelse for skrivinger).

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke etter ID |
| GET | `/` | JWT | — | List alle lenker. Valgfritt `?category=` filter. Sorterer automatisk etter lagring |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Last lenker filtrert etter synlighet (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Public | — | Last lenker for en kirke etter kategori (offentlig) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater lenker (batch). Sorterer automatisk etter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Slett en lenke |

## Globale stiler

Basisbane: `/content/globalStyles`

Utvider standard CRUD (POST `/`, DELETE `/:id` fra basisklasse med Content.Edit-tillatelse for skrivinger).

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Last globale stiler for en kirke (returnerer standarder hvis ingen er satt) |
| GET | `/` | JWT | — | Last globale stiler for den autentiserte kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater globale stiler |
| DELETE | `/:id` | JWT | Content.Edit | Slett globale stiler |

## Sidehistorie

Basisbane: `/content/pageHistory`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List historienlegg for en side |
| GET | `/block/:blockId` | JWT | Content.Edit | List historienlegg for en blokk |
| GET | `/:id` | JWT | Content.Edit | Hent et historienlegg etter ID |
| POST | `/` | JWT | Content.Edit | Lagre et side-/blokkøyeblikksbilde. Renser periodisk opp oppføringer eldre enn 30 dager |
| POST | `/restore/:id` | JWT | Content.Edit | Gjenopprett en side/blokk fra et historienlegg-øyeblikksbilde (sletter gjeldende innhold og gjenskaper fra øyeblikksbildet) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Gjenopprett fra et innebygd øyeblikksbildeobjekt. Kropp: `{ pageId, blockId, snapshot }` |

## Innlegg (Blog)

Basisbane: `/content/posts`

Blogginnlegg er frittstående rader: `title`, `slug` (unik per kirke), `excerpt`, `content` (markdown-tekst), `authorId`, `photoUrl`, `publishDate`, `category` og `tags`. Et innlegg publiseres når `publishDate` er satt og i fortiden. Les endepunkter berikede hvert innlegg med `authorName` løst fra `authorId`. Se [Website Builder Architecture](../../architecture/website-builder#blog).

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Public | — | List publiserte innlegg, paginert (maks 50 per side) |
| GET | `/public/:churchId/categories` | Public | — | Distinkte kategorier på tvers av publiserte innlegg |
| GET | `/public/:churchId/slug/:slug` | Public | — | Hent et publisert innlegg etter slug |
| GET | `/rss/:churchId?siteUrl=` | Public | — | RSS 2.0-feed av publiserte innlegg (lenker bygget som `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Hent et innlegg etter ID |
| GET | `/` | JWT | — | List alle innlegg for kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater innlegg (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et innlegg |

## Omdirigeringer

Basisbane: `/content/redirects`

Per-kirke URL-omdirigeringer (`fromPath` → `toPath`), begrenset til 200 per kirke. Baner normaliseres (små bokstaver, ledende skråstrek, ingen etterfølgende skråstrek) og `fromPath` er unik per kirke. B1App løser disse på ville-være 404-er og utsteder en HTTP 308.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Løs en bane (eller list alle omdirigeringer når `path` utelates) |
| GET | `/:id` | JWT | — | Hent en omdirigering etter ID |
| GET | `/` | JWT | — | List alle omdirigeringer for kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater omdirigeringer. Avviser `fromPath = toPath` og håndhever 200-rader-grensen |
| DELETE | `/:id` | JWT | Content.Edit | Slett en omdirigering |

## Prekenoter

Basisbane: `/content/sermons`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Hent en eksempel FreeShow-avspilliststruktur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hent TV-appwrapper med prediken-, leksjons- og FreeShow-kilder |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Hent en enkelt prediken som en TV-feed-avspillingsliste |
| GET | `/public/tvFeed/:churchId` | Public | — | Hent alle offentlige avspillingslister/prekenoter som en TV-feed |
| GET | `/public/:churchId` | Public | — | List alle offentlige prekenoter for en kirke |
| GET | `/timeline?sermonIds=` | JWT | — | Last tidslinjedata for prekenoter |
| GET | `/lookup?videoType=&videoData=` | Public | — | Slå opp predikemetadata fra YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generer AI-forslag til sosiale medier-innlegg fra predikuntekster |
| GET | `/outline?url=&title=&author=` | JWT | — | Generer AI-leksjonsoverskrift fra en URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer videoer fra en YouTube-kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer videoer fra en Vimeo-kanal |
| GET | `/:id` | JWT | — | Hent en prediken etter ID |
| GET | `/` | JWT | — | List alle prekenoter |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater prekenoter (batch, støtter base64-miniatyropplasting) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en prediken |

### Eksempel: Slå opp en YouTube-prediken

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

## Avspillingslister

Basisbane: `/content/playlists`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklasse med StreamingServices.Edit-tillatelse for skrivinger).

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en avspillingsliste etter ID |
| GET | `/` | JWT | — | List alle avspillingslister |
| GET | `/public/:churchId` | Public | — | List alle offentlige avspillingslister for en kirke |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater avspillingslister (batch, støtter base64-miniatyropplasting) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en avspillingsliste |

## Strømmingstjenester

Basisbane: `/content/streamingServices`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hent kryptert vert-chat-rom-ID for en tjeneste |
| GET | `/` | JWT | — | List alle strømmingstjenester. Renser automatisk utgåtte ikke-gjentakende tjenester og fremmer gjentakende tjenester |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater strømmingstjenester (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en strømmingstjeneste (rydder også opp blokkerte IP-er) |

## Arrangementer

Basisbane: `/content/events`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Last tidslinjebegivenheter for en gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Last tidslinjebegivenheter for gjeldende brukers grupper |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Abonner på begivenheter som ICS-kalenderfeed |
| GET | `/group/:groupId` | JWT | — | Hent begivenheter for en gruppe (inkluderer unnakelsesdatoer) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Hent offentlige begivenheter for en gruppe |
| GET | `/:id` | JWT | — | Hent en begivenhet etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater begivenheter (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en begivenhet |

## Begivenhetunntak

Basisbane: `/content/eventExceptions`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et begivenhetunntak etter ID |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater begivenhetunntak (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et begivenhetunntak |

## Kuraterte kalendere

Basisbane: `/content/curatedCalendars`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en kuratert kalender etter ID |
| GET | `/` | JWT | — | List alle kuraterte kalendere |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte kalendere (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert kalender |

## Kuraterte begivenheter

Basisbane: `/content/curatedEvents`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hent kuraterte begivenheter for en kalender (inkluderer begivenhetdetaljer og unnakelsesdatoer med mindre `?withoutEvents` er satt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Hent offentlige kuraterte begivenheter for en kalender |
| GET | `/:id` | JWT | — | Hent en kuratert begivenhet etter ID |
| GET | `/` | JWT | — | List alle kuraterte begivenheter |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte begivenheter. Støtter `eventIds`-rekke for å legge til spesifikke gruppebegivenheter |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert begivenhet |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Fjern en spesifikk begivenhet fra en kuratert kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Fjern alle begivenheter for en gruppe fra en kuratert kalender |

## Filer

Basisbane: `/content/files`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Hent filer etter innholdstype og innhold-ID |
| GET | `/` | JWT | — | List alle filer for kirkenettstedet |
| GET | `/:id` | JWT | — | Hent en fil etter ID |
| POST | `/` | JWT | Content.Edit* | Last opp filer (base64). *Også tillatt hvis bruker er medlem av gruppen som matcher `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hent en forhåndssignert S3-opplastings-URL. *Også tillatt for gruppemedlemmer. Maks 100MB per innholdselement |
| DELETE | `/:id` | JWT | Content.Edit* | Slett en fil og fjern fra lagring. *Også tillatt for gruppemedlemmer |

## Galleri

Basisbane: `/content/gallery`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | List arkivfoto i en mappe |
| GET | `/:folder` | JWT | Content.Edit | List galleribilder i en mappe |
| POST | `/requestUpload` | JWT | Content.Edit | Hent en forhåndssignert S3-opplastings-URL for et galleribildde |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Slett et galleribildde |

## Bibler

Basisbane: `/content/bibles`

Alle bibel-endepunkter er offentlige (ingen autentisering kreves). Data hentes fra eksterne kilder og bufres lokalt.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | List alle bibeltranslaksjoner (henter fra kilde hvis buffer er tom) |
| GET | `/stats?startDate=&endDate=` | Public | — | Hent bibellettkslipp-statistikk for et datoområde |
| GET | `/availableTranslations/:source` | Public | — | List tilgjengelige translaksjoner fra en kilde (f.eks. api.bible) |
| GET | `/updateTranslations` | Public | — | Synkroniser alle translaksjoner fra alle kilder |
| GET | `/updateTranslations/:source` | Public | — | Synkroniser translaksjoner fra en spesifikk kilde |
| GET | `/updateCopyrights` | Public | — | Oppdater opphavsrettsinformasjon for translaksjoner som mangler det |
| GET | `/:translationKey/updateCopyright` | Public | — | Oppdater opphavsrett for en spesifikk translasjon |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Søk vers i en translasjon |
| GET | `/:translationKey/books` | Public | — | Hent bøker for en translasjon (bufres lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Hent kapitler for en bok (bufres lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Hent vers for et kapittel (bufres lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Hent verstekst for et område. Logger oppslag. Noen translaksjoner omgår buffering for lisensieringsårsaker |

### Eksempel: Hent verstekst

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

## Sanger

Basisbane: `/content/songs`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Søk sanger etter spørring |
| GET | `/:id` | JWT | — | Hent en sang etter ID |
| GET | `/` | JWT | Content.Edit | List alle sanger |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sanger (batch) |
| POST | `/import` | JWT | — | Importer sanger fra FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en sang |

## Sangdetaljer

Basisbane: `/content/songDetails`

Sangdetaljer er globale (ikke kirke-avgrenset). Disse representerer kanonisk sangmetadata som deles på tvers av kirker.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetalj etter ID (global) |
| GET | `/` | JWT | — | List sangdetaljer for kirken |
| POST | `/create` | JWT | — | Opprett en sangdetalj fra PraiseCharts ID (returnerer eksisterende hvis allerede opprettet). Henter automatisk metadata fra PraiseCharts og MusicBrainz |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljer (batch) |

## Sangdetalj-lenker

Basisbane: `/content/songDetailLinks`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetalj-lenke etter ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hent alle lenker for en sangdetalj |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetalj-lenker (batch). Henter automatisk MusicBrainz-data hvis koblet |
| DELETE | `/:id` | JWT | — | Slett en sangdetalj-lenke |

## Arrangementer

Basisbane: `/content/arrangements`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangement etter ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hent arrangementer for en sang |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hent arrangementer for en sangdetalj |
| GET | `/` | JWT | Content.Edit | List alle arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementer (batch) |
| POST | `/freeShow/missing` | JWT | — | Finn FreeShow-ID-er som ikke finnes i kirken. Kropp: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement (sletter også taster; sletter sangen hvis ingen arrangementer gjenstår) |

## Arrangement-taster

Basisbane: `/content/arrangementKeys`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Hent arrangement-tast med fulle sangdata for presenter-visning |
| GET | `/:id` | JWT | — | Hent en arrangement-tast etter ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hent taster for et arrangement |
| GET | `/` | JWT | Content.Edit | List alle arrangement-taster |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangement-taster (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en arrangement-tast |

## Innstillinger

Basisbane: `/content/settings`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers innstillinger |
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Public | — | Hent offentlige innstillinger for en kirke (returnert som nøkkel-verdi-par) |
| POST | `/my` | JWT | — | Lagre bruker-nivå-innstillinger (støtter base64-bildeopplasting) |
| POST | `/` | JWT | Settings.Edit | Lagre kirke-nivå-innstillinger (støtter base64-bildeopplasting) |
| DELETE | `/my/:id` | JWT | — | Slett en bruker-innstilling |

## Forhåndsvisning

Basisbane: `/content/preview`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Last strømmings-forhåndsvisningsdata for en kirke etter underdomenenøkkel (faner, lenker, tjenester, prekenoter) |

## Galleri (arkivfoto)

Basisbane: `/content/stock`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Søk Pexels-arkivfoto. Kropp: `{ term: "church" }` |

## PraiseCharts

Basisbane: `/content/praiseCharts`

Integrasjon med PraiseCharts for oppdagelse av tilbedelses-sanger og nedlasting av musikk.

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Hent råe PraiseCharts-data for en sang |
| GET | `/hasAccount` | JWT | — | Sjekk om brukeren har en koblet PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Søk i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hent produkter for en sang (fra bibliotek hvis autentisert, ellers katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hent råe arrangement-data fra bibliotek |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Last ned en fil fra PraiseCharts (PDF eller ZIP). Returnerer `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Hent OAuth-autorisasjons-URL for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Bytt OAuth-verifikator for tilgangstoken og lagre i brukerinnstillinger |
| GET | `/library` | JWT | — | Bla gjennom brukerens PraiseCharts-bibliotek |

## Kundestøtte

Basisbane: `/content/support`

| Metode | Bane | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Konverter SSML til MP3-lyd ved hjelp av AWS Polly. Kropp: `{ ssml: "<speak>...</speak>" }` |

## Relaterte sider

- [Website Builder Architecture](../../architecture/website-builder) -- Hvordan sider, seksjoner, elementer, innlegg og omdirigeringer henger sammen på tvers av appene
- [Membership Endpoints](./membership) -- Personer, kirker, grupper, roller, tillatelser
- [Attendance Endpoints](./attendance) -- Tjeneste- og besøkssporing
- [Authentication & Permissions](./authentication) -- Innloggingsflyt, JWT, tillatelsemodell
- [Module Structure](../module-structure) -- Kodorganisasjonsmønstre
