---
title: "Innholds-endepunkter"
---

# Innholds-endepunkter

<div class="article-intro">

Content-modulen administrerer nettstedsider, seksjoner, elementer, blokker, blogginnlegg, omdirigeringer, prekener, spillelister, strømmetjenester, arrangementer, kuraterte kalendere, filer, gallerier, bibeloversettelser og versoppslag, sanger, arrangementer (musikk), globale stiler, arkivbilder og innstillinger. Det er den største modulen i API-et og driver CMS-en, media-/strømmefunksjoner, gudstjenesteplanlegging og bibelfunksjoner på tvers av alle ChurchApps-applikasjoner.

</div>

**Basissti:** `/content`

## Sider

Basissti: `/content/pages`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Last hele sidetreet (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er ved henting via URL. URL-baserte hentinger håndhever `pages.visibility` — en beskyttet side returnerer `{ restricted: true, visibility }` med mindre den (valgfrie) JWT-en oppfyller sperren |
| GET | `/public/:churchId` | Public | — | List offentlige sider (`url`, `title`, `metaDescription`); kun `visibility = everyone` |
| GET | `/:id` | JWT | — | Hent en side etter ID |
| GET | `/` | JWT | — | List alle sider for kirken |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser en side med alle seksjoner og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Lagre en AI-generert side (side, seksjoner og elementer i ett kall) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sider (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en side |

### Eksempel: Last sidetre

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

Basissti: `/content/sections`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en seksjon etter ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliser en seksjon, eller konverter den til en gjenbrukbar blokk |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater seksjoner (batch). Oppdaterer sorteringsrekkefølge automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett en seksjon (oppdaterer sorteringsrekkefølge automatisk) |

## Elementer

Basissti: `/content/elements`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et element etter ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser et element med alle underelementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater elementer (batch). Administrerer automatisk radkolonner og karusell-lysbilder |
| DELETE | `/:id` | JWT | Content.Edit | Slett et element |

## Blokker

Basissti: `/content/blocks`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokk etter ID |
| GET | `/` | JWT | — | List alle blokker |
| GET | `/:churchId/tree/:id` | Public | — | Last hele blokktreet med seksjoner og elementer |
| GET | `/blockType/:blockType` | JWT | — | Last blokker etter type (f.eks. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Last footer-blokktreet for en kirke |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater blokker |
| DELETE | `/:id` | JWT | Content.Edit | Slett en blokk |

## Lenker

Basissti: `/content/links`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke etter ID |
| GET | `/` | JWT | — | List alle lenker. Valgfritt `?category=`-filter. Sorterer automatisk etter lagring |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Last lenker filtrert etter synlighet (alle, besøkende, medlemmer, stab, grupper) |
| GET | `/church/:churchId?category=` | Public | — | Last lenker for en kirke etter kategori (offentlig) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater lenker (batch). Sorterer automatisk etter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Slett en lenke |

## Globale stiler

Basissti: `/content/globalStyles`

Utvider standard CRUD (POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Last globale stiler for en kirke (returnerer standardverdier hvis ingen er satt) |
| GET | `/` | JWT | — | Last globale stiler for den autentiserte kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater globale stiler |
| DELETE | `/:id` | JWT | Content.Edit | Slett globale stiler |

## Sidehistorikk

Basissti: `/content/pageHistory`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List historikkoppføringer for en side |
| GET | `/block/:blockId` | JWT | Content.Edit | List historikkoppføringer for en blokk |
| GET | `/:id` | JWT | Content.Edit | Hent en historikkoppføring etter ID |
| POST | `/` | JWT | Content.Edit | Lagre et side-/blokk-øyeblikksbilde. Rydder periodisk opp oppføringer eldre enn 30 dager |
| POST | `/restore/:id` | JWT | Content.Edit | Gjenopprett en side/blokk fra et historikk-øyeblikksbilde (sletter gjeldende innhold og gjenskaper fra øyeblikksbildet) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Gjenopprett fra et innebygd øyeblikksbilde-objekt. Body: `{ pageId, blockId, snapshot }` |

## Innlegg (blogg)

Basissti: `/content/posts`

Blogginnlegg er frittstående rader: `title`, `slug` (unik per kirke), `excerpt`, `content` (markdown-brødtekst), `authorId`, `photoUrl`, `publishDate`, `category`, og `tags`. Et innlegg publiseres når `publishDate` er satt og ligger i fortiden. Lese-endepunkter beriker hvert innlegg med `authorName` løst fra `authorId`. Se [Nettstedbyggerens arkitektur](../../architecture/website-builder#blog).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
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

Basissti: `/content/redirects`

Kirke-spesifikke URL-omdirigeringer (`fromPath` → `toPath`), begrenset til 200 per kirke. Stier normaliseres (små bokstaver, innledende skråstrek, ingen avsluttende skråstrek), og `fromPath` er unik per kirke. B1App løser disse på det som ellers ville vært 404-er, og utsteder en HTTP 308.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Public | — | Løs opp en sti (eller list alle omdirigeringer når `path` utelates) |
| GET | `/:id` | JWT | — | Hent en omdirigering etter ID |
| GET | `/` | JWT | — | List alle omdirigeringer for kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater omdirigeringer. Avviser `fromPath = toPath` og håndhever 200-rads-grensen |
| DELETE | `/:id` | JWT | Content.Edit | Slett en omdirigering |

## Prekener

Basissti: `/content/sermons`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Hent en eksempel-FreeShow-spilleliste-struktur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hent TV-app-innpakning med preken-, leksjons- og FreeShow-kilder |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Hent en enkelt preken som en TV-feed-spilleliste |
| GET | `/public/tvFeed/:churchId` | Public | — | Hent alle offentlige spillelister/prekener som en TV-feed |
| GET | `/public/:churchId` | Public | — | List alle offentlige prekener for en kirke |
| GET | `/timeline?sermonIds=` | JWT | — | Last tidslinjedata for prekener |
| GET | `/lookup?videoType=&videoData=` | Public | — | Slå opp prekenmetadata fra YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generer AI-forslag til innlegg for sosiale medier fra prekenens undertekster |
| GET | `/outline?url=&title=&author=` | JWT | — | Generer AI-leksjonsdisposisjon fra en URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer videoer fra en YouTube-kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer videoer fra en Vimeo-kanal |
| GET | `/:id` | JWT | — | Hent en preken etter ID |
| GET | `/` | JWT | — | List alle prekener |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater prekener (batch, støtter base64-miniatyrbildeopplasting) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en preken |

### Eksempel: Slå opp en YouTube-preken

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

## Spillelister

Basissti: `/content/playlists`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen med StreamingServices.Edit-tillatelse for skriving).

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en spilleliste etter ID |
| GET | `/` | JWT | — | List alle spillelister |
| GET | `/public/:churchId` | Public | — | List alle offentlige spillelister for en kirke |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater spillelister (batch, støtter base64-miniatyrbildeopplasting) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en spilleliste |

## Strømmetjenester

Basissti: `/content/streamingServices`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hent kryptert vertschat-rom-ID for en tjeneste |
| GET | `/` | JWT | — | List alle strømmetjenester. Rydder automatisk opp utløpte, ikke-gjentakende tjenester og fremskrider gjentakende |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater strømmetjenester (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en strømmetjeneste (fjerner også blokkerte IP-er) |

## Arrangementer

Basissti: `/content/events`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Last tidslinjearrangementer for en gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Last tidslinjearrangementer for gjeldende brukers grupper |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Abonner på arrangementer som en ICS-kalenderfeed |
| GET | `/group/:groupId` | JWT | — | Hent arrangementer for en gruppe (inkluderer unntaksdatoer) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Hent offentlige arrangementer for en gruppe |
| GET | `/:id` | JWT | — | Hent et arrangement etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater arrangementer (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement |

## Arrangements-unntak

Basissti: `/content/eventExceptions`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangementsunntak etter ID |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementsunntak (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangementsunntak |

## Kuraterte kalendere

Basissti: `/content/curatedCalendars`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en kuratert kalender etter ID |
| GET | `/` | JWT | — | List alle kuraterte kalendere |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte kalendere (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert kalender |

## Kuraterte arrangementer

Basissti: `/content/curatedEvents`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hent kuraterte arrangementer for en kalender (inkluderer arrangementsdetaljer og unntaksdatoer med mindre `?withoutEvents` er satt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Hent offentlige kuraterte arrangementer for en kalender |
| GET | `/:id` | JWT | — | Hent et kuratert arrangement etter ID |
| GET | `/` | JWT | — | List alle kuraterte arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte arrangementer. Støtter `eventIds`-array for å legge til spesifikke gruppearrangementer |
| DELETE | `/:id` | JWT | Content.Edit | Slett et kuratert arrangement |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Fjern et bestemt arrangement fra en kuratert kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Fjern alle arrangementer for en gruppe fra en kuratert kalender |

## Filer

Basissti: `/content/files`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Hent filer etter innholdstype og innholds-ID |
| GET | `/` | JWT | — | List alle filer for kirkens nettsted |
| GET | `/:id` | JWT | — | Hent en fil etter ID |
| POST | `/` | JWT | Content.Edit* | Last opp filer (base64). *Også tillatt hvis brukeren er medlem av gruppen som samsvarer med `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hent en forhåndssignert S3-opplastings-URL. *Også tillatt for gruppemedlemmer. Maks 100 MB per innholdselement |
| DELETE | `/:id` | JWT | Content.Edit* | Slett en fil og fjern den fra lagring. *Også tillatt for gruppemedlemmer |

## Galleri

Basissti: `/content/gallery`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | List arkivbilder i en mappe |
| GET | `/:folder` | JWT | Content.Edit | List galleribilder i en mappe |
| POST | `/requestUpload` | JWT | Content.Edit | Hent en forhåndssignert S3-opplastings-URL for et galleribilde |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Slett et galleribilde |

## Bibler

Basissti: `/content/bibles`

Alle bibel-endepunkter er offentlige (ingen autentisering kreves). Data hentes fra eksterne kilder og caches lokalt.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | List alle bibeloversettelser (henter fra kilde hvis cachen er tom) |
| GET | `/stats?startDate=&endDate=` | Public | — | Hent statistikk over bibeloppslag for et datointervall |
| GET | `/availableTranslations/:source` | Public | — | List tilgjengelige oversettelser fra en kilde (f.eks. api.bible) |
| GET | `/updateTranslations` | Public | — | Synkroniser alle oversettelser fra alle kilder |
| GET | `/updateTranslations/:source` | Public | — | Synkroniser oversettelser fra en bestemt kilde |
| GET | `/updateCopyrights` | Public | — | Oppdater opphavsrettsinformasjon for oversettelser som mangler det |
| GET | `/:translationKey/updateCopyright` | Public | — | Oppdater opphavsrett for en bestemt oversettelse |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Søk i vers i en oversettelse |
| GET | `/:translationKey/books` | Public | — | Hent bøker for en oversettelse (caches lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Hent kapitler for en bok (caches lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Hent vers for et kapittel (caches lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Hent verstekst for et intervall. Logger oppslag. Enkelte oversettelser omgår caching av lisensårsaker |

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

Basissti: `/content/songs`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Søk sanger etter spørring |
| GET | `/:id` | JWT | — | Hent en sang etter ID |
| GET | `/` | JWT | Content.Edit | List alle sanger |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sanger (batch) |
| POST | `/import` | JWT | — | Importer sanger fra FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en sang |

## Sangdetaljer

Basissti: `/content/songDetails`

Sangdetaljer er globale (ikke kirkespesifikke). Disse representerer kanonisk sangmetadata delt på tvers av kirker.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetalj etter ID (global) |
| GET | `/` | JWT | — | List sangdetaljer for kirken |
| POST | `/create` | JWT | — | Opprett en sangdetalj fra en PraiseCharts-ID (returnerer eksisterende hvis allerede opprettet). Henter automatisk metadata fra PraiseCharts og MusicBrainz |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljer (batch) |

## Sangdetalj-lenker

Basissti: `/content/songDetailLinks`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetalj-lenke etter ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hent alle lenker for en sangdetalj |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetalj-lenker (batch). Henter automatisk MusicBrainz-data hvis lenket |
| DELETE | `/:id` | JWT | — | Slett en sangdetalj-lenke |

## Arrangementer (musikk)

Basissti: `/content/arrangements`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangement etter ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hent arrangementer for en sang |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hent arrangementer for en sangdetalj |
| GET | `/` | JWT | Content.Edit | List alle arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementer (batch) |
| POST | `/freeShow/missing` | JWT | — | Finn FreeShow-ID-er som ikke finnes i kirken. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement (sletter også toneart-nøkler; sletter sangen hvis ingen arrangementer gjenstår) |

## Arrangement-tonearter

Basissti: `/content/arrangementKeys`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Hent en arrangement-toneart med fullstendige sangdata for presentasjonsvisning |
| GET | `/:id` | JWT | — | Hent en arrangement-toneart etter ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hent tonearter for et arrangement |
| GET | `/` | JWT | Content.Edit | List alle arrangement-tonearter |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangement-tonearter (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en arrangement-toneart |

## Innstillinger

Basissti: `/content/settings`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers innstillinger |
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Public | — | Hent offentlige innstillinger for en kirke (returneres som nøkkel-verdi-par) |
| POST | `/my` | JWT | — | Lagre brukerspesifikke innstillinger (støtter base64-bildeopplasting) |
| POST | `/` | JWT | Settings.Edit | Lagre kirkespesifikke innstillinger (støtter base64-bildeopplasting) |
| DELETE | `/my/:id` | JWT | — | Slett en brukerinnstilling |

## Forhåndsvisning

Basissti: `/content/preview`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Last strømme-forhåndsvisningsdata for en kirke etter underdomene-nøkkel (faner, lenker, tjenester, prekener) |

## Galleri (arkivbilder)

Basissti: `/content/stock`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Søk Pexels arkivbilder. Body: `{ term: "church" }` |

## PraiseCharts

Basissti: `/content/praiseCharts`

Integrasjon med PraiseCharts for oppdagelse av lovsanger og nedlasting av noter.

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Hent rå PraiseCharts-data for en sang |
| GET | `/hasAccount` | JWT | — | Sjekk om brukeren har en koblet PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Søk i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hent produkter for en sang (fra bibliotek hvis autentisert, ellers katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hent rå arrangementdata fra bibliotek |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Last ned en fil fra PraiseCharts (PDF eller ZIP). Returnerer `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Hent OAuth-autorisasjons-URL for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Bytt OAuth-verifikator mot tilgangstoken og lagre til brukerinnstillinger |
| GET | `/library` | JWT | — | Bla gjennom brukerens PraiseCharts-bibliotek |

## Support

Basissti: `/content/support`

| Metode | Sti | Auth | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Konverter SSML til MP3-lyd ved hjelp av AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Relaterte sider

- [Nettstedbyggerens arkitektur](../../architecture/website-builder) -- Hvordan sider, seksjoner, elementer, innlegg og omdirigeringer henger sammen på tvers av appene
- [Medlemskaps-endepunkter](./membership) -- Personer, kirker, grupper, roller, tillatelser
- [Oppmøte-endepunkter](./attendance) -- Gudstjeneste- og besøkssporing
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Kodeorganiseringsmønstre
