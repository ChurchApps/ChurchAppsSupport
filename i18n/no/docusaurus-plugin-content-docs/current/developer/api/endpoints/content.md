---
title: "Innholdsendepunkter"
---

# Innholdsendepunkter {#content-endpoints}

<div class="article-intro">

Innholdsmodulen håndterer nettsidesider, seksjoner, elementer, blokker, blogginnlegg, omdirigeringer, preken, spillelister, strømmetjenester, arrangementer, kuraterte kalendere, filer, galleri, bibeloversettelser og versoppslag, sanger, låtarrangementer, globale stiler, stockfoto og innstillinger. Det er den største modulen i API-et, og den driver CMS, media og strømming, gudstjenesteplanlegging og bibelfunksjoner i alle ChurchApps-applikasjoner.

</div>

**Basissti:** `/content`

## Sider {#pages}

Basissti: `/content/pages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Offentlig | — | Last hele sidetreet (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er når det hentes via URL. URL-baserte hentinger håndhever `pages.visibility`. En låst side returnerer `{ restricted: true, visibility }` med mindre den (valgfrie) JWT-en oppfyller kravet |
| GET | `/public/:churchId` | Offentlig | — | List offentlige sider (`url`, `title`, `metaDescription`); bare `visibility = everyone` |
| GET | `/:id` | JWT | — | Hent en side med ID |
| GET | `/` | JWT | — | List alle sider for menigheten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser en side med alle seksjoner og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Lagre en AI-generert side (side, seksjoner og elementer i ett kall) |
| POST | `/importTree` | JWT | Content.Edit | Opprett en side fra et nøstet tre (`title`, `url`, `sections[].elements[]…`). Setter alltid inn under innringerens menighet; ID-er i body ignoreres. Rader må inkludere sine `column`-barn. Maks 30 seksjoner / 500 elementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sider (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en side |

### Eksempel: Last sidetreet {#example-load-page-tree}

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

## Seksjoner {#sections}

Basissti: `/content/sections`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en seksjon med ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliser en seksjon, eller konverter den til en gjenbrukbar blokk |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater seksjoner (batch). Oppdaterer sorteringsrekkefølgen automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett en seksjon (oppdaterer sorteringsrekkefølgen automatisk) |

## Elementer {#elements}

Basissti: `/content/elements`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et element med ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser et element med alle underelementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater elementer (batch). Administrerer radkolonner og karusellysbilder automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett et element |

## Blokker {#blocks}

Basissti: `/content/blocks`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen, med tillatelsen Content.Edit for skrivinger).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokk med ID |
| GET | `/` | JWT | — | List alle blokker |
| GET | `/:churchId/tree/:id` | Offentlig | — | Last hele blokktreet med seksjoner og elementer |
| GET | `/blockType/:blockType` | JWT | — | Last blokker etter type (f.eks. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Offentlig | — | Last bunntekstblokkens tre for en menighet |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater blokker |
| DELETE | `/:id` | JWT | Content.Edit | Slett en blokk |

## Lenker {#links}

Basissti: `/content/links`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen, med tillatelsen Content.Edit for skrivinger).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke med ID |
| GET | `/` | JWT | — | List alle lenker. Valgfritt filter `?category=`. Sorteres automatisk etter lagring |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Last lenker filtrert etter synlighet (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Offentlig | — | Last lenker for en menighet etter kategori (offentlig) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater lenker (batch). Sorterer automatisk etter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Slett en lenke |

## Globale stiler {#global-styles}

Basissti: `/content/globalStyles`

Utvider standard CRUD (POST `/`, DELETE `/:id` fra basisklassen, med tillatelsen Content.Edit for skrivinger).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Offentlig | — | Last globale stiler for en menighet (returnerer standardverdier hvis ingen er satt) |
| GET | `/` | JWT | — | Last globale stiler for den autentiserte menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater globale stiler |
| DELETE | `/:id` | JWT | Content.Edit | Slett globale stiler |

## Sidehistorikk {#page-history}

Basissti: `/content/pageHistory`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List historikkoppføringer for en side |
| GET | `/block/:blockId` | JWT | Content.Edit | List historikkoppføringer for en blokk |
| GET | `/:id` | JWT | Content.Edit | Hent en historikkoppføring med ID |
| POST | `/` | JWT | Content.Edit | Lagre et øyeblikksbilde av en side/blokk. Rydder periodisk opp i oppføringer eldre enn 30 dager |
| POST | `/restore/:id` | JWT | Content.Edit | Gjenopprett en side/blokk fra et historikkøyeblikksbilde (sletter gjeldende innhold og oppretter det på nytt fra øyeblikksbildet) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Gjenopprett fra et innebygd øyeblikksbildeobjekt. Body: `{ pageId, blockId, snapshot }` |

## Innlegg (blogg) {#posts-blog}

Basissti: `/content/posts`

Blogginnlegg er frittstående rader med `title`, `slug` (unik per menighet), `excerpt`, `content` (markdown-innhold), `authorId`, `photoUrl`, `publishDate`, `category` og `tags`. Et innlegg er publisert når `publishDate` er satt og ligger i fortiden. Leseendepunkter beriker hvert innlegg med `authorName` hentet fra `authorId`. Se [Arkitektur for nettsidebyggeren](../../architecture/website-builder#blog).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Offentlig | — | List publiserte innlegg med paginering (maks 50 per side) |
| GET | `/public/:churchId/categories` | Offentlig | — | Ulike kategorier på tvers av publiserte innlegg |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent et publisert innlegg etter slug |
| GET | `/rss/:churchId?siteUrl=` | Offentlig | — | RSS 2.0-feed med publiserte innlegg (lenker bygges som `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Hent et innlegg med ID |
| GET | `/` | JWT | — | List alle innlegg for menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater innlegg (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et innlegg |

## Omdirigeringer {#redirects}

Basissti: `/content/redirects`

URL-omdirigeringer per menighet (`fromPath` → `toPath`), begrenset til 200 per menighet. Stier normaliseres (små bokstaver, innledende skråstrek, ingen avsluttende skråstrek), og `fromPath` er unik per menighet. B1App slår opp disse ved forespørsler som ville gitt 404, og sender en HTTP 308.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Offentlig | — | Slå opp en sti (eller list alle omdirigeringer når `path` utelates) |
| GET | `/:id` | JWT | — | Hent en omdirigering med ID |
| GET | `/` | JWT | — | List alle omdirigeringer for menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater omdirigeringer. Avviser `fromPath = toPath` og håndhever grensen på 200 rader |
| DELETE | `/:id` | JWT | Content.Edit | Slett en omdirigering |

## Preken {#sermons}

Basissti: `/content/sermons`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Hent en eksempelstruktur for FreeShow-spilleliste |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hent TV-appens innpakning med kilder for preken, leksjon og FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Offentlig | — | Hent én preken som en TV-feed-spilleliste |
| GET | `/public/tvFeed/:churchId` | Offentlig | — | Hent alle offentlige spillelister/prekener som en TV-feed |
| GET | `/public/:churchId` | Offentlig | — | List alle offentlige prekener for en menighet |
| GET | `/timeline?sermonIds=` | JWT | — | Last tidslinjedata for prekener |
| GET | `/lookup?videoType=&videoData=` | Offentlig | — | Slå opp prekemetadata fra YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generer AI-forslag til innlegg i sosiale medier basert på undertitlene i prekene |
| GET | `/outline?url=&title=&author=` | JWT | — | Generer en AI-basert leksjonsdisposisjon fra en URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer videoer fra en YouTube-kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer videoer fra en Vimeo-kanal |
| GET | `/:id` | JWT | — | Hent en preken med ID |
| GET | `/` | JWT | — | List alle prekener |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater prekener (batch, støtter opplasting av miniatyrbilde i base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en preken |

### Eksempel: Slå opp en YouTube-preken {#example-look-up-a-youtube-sermon}

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

## Spillelister {#playlists}

Basissti: `/content/playlists`

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra basisklassen, med tillatelsen StreamingServices.Edit for skrivinger).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en spilleliste med ID |
| GET | `/` | JWT | — | List alle spillelister |
| GET | `/public/:churchId` | Offentlig | — | List alle offentlige spillelister for en menighet |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater spillelister (batch, støtter opplasting av miniatyrbilde i base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en spilleliste |

## Strømmetjenester {#streaming-services}

Basissti: `/content/streamingServices`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hent kryptert vertschat-rom-ID for en tjeneste |
| GET | `/` | JWT | — | List alle strømmetjenester. Rydder automatisk opp i utløpte, ikke-gjentakende tjenester og flytter gjentakende tjenester videre |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater strømmetjenester (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en strømmetjeneste (fjerner også blokkerte IP-adresser) |

## Arrangementer {#events}

Basissti: `/content/events`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Last tidslinjehendelser for en gruppe (inkluderer unntaksdatoer, slik at slettede forekomster kan hoppes over) |
| GET | `/timeline?eventIds=` | JWT | — | Last tidslinjehendelser for den innloggede brukerens grupper (inkluderer unntaksdatoer) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Offentlig | — | Abonner på arrangementer som en ICS-kalenderfeed |
| GET | `/group/:groupId` | JWT | — | Hent arrangementer for en gruppe (inkluderer unntaksdatoer) |
| GET | `/public/group/:churchId/:groupId` | Offentlig | — | Hent offentlige arrangementer for en gruppe |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent ett arrangement for dets offentlige side, med `roomNames` (rom fra bookinger som ikke er avvist). Returnerer `null` for ventende eller avviste arrangementer, og for private arrangementer som ikke tar imot påmeldinger |
| GET | `/public/:churchId/:id/ical` | Offentlig | — | Last ned dette ene arrangementet som en `.ics`-fil (`text/calendar`, med unntaksdatoer). `404` når arrangementet er skjult etter de samme reglene |
| GET | `/:id` | JWT | — | Hent et arrangement med ID |
| POST | `/` | JWT | — | Opprett eller oppdater arrangementer (batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin eller gruppeleder | Slett et arrangement og tilhørende bookinger. Ledere for arrangementets gruppe kan slette det, og en forespørsel kan trekkes tilbake av den som sendte den inn |

Arrangementsposter inneholder `photoUrl` (arrangementsbildet i 16:9 som vises på den offentlige arrangementssiden og i kommende arrangementsfliser), `tags` (kommaseparert, brukes av kalenderelementet på nettsiden til tagfilteret), og `notesViewRole` / `notesPostRole` (`staff` når verdien er `null`, `leaders` eller `members`), som styrer samtalen `eventNote` for arrangementet. Se [Tilgangskontroll for gruppe- og arrangementsnotater](./messaging.md#group-and-event-notes-access-control). Svar for offentlige kuraterte arrangementer inneholder også hvert arrangements `photoUrl` og `tags`.

## Arrangementsunntak {#event-exceptions}

Basissti: `/content/eventExceptions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangementsunntak med ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin eller gruppeleder | Opprett eller oppdater arrangementsunntak (batch). Ledere kan bare legge til unntak for arrangementer i grupper de leder |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin eller gruppeleder | Slett et arrangementsunntak |

## Kuraterte kalendere {#curated-calendars}

Basissti: `/content/curatedCalendars`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en kuratert kalender med ID |
| GET | `/` | JWT | — | List alle kuraterte kalendere |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte kalendere (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert kalender |

## Kuraterte arrangementer {#curated-events}

Basissti: `/content/curatedEvents`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hent kuraterte arrangementer for en kalender (inkluderer arrangementsdetaljer og unntaksdatoer med mindre `?withoutEvents` er satt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Offentlig | — | Hent offentlige kuraterte arrangementer for en kalender |
| GET | `/:id` | JWT | — | Hent et kuratert arrangement med ID |
| GET | `/` | JWT | — | List alle kuraterte arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte arrangementer. Støtter en `eventIds`-matrise for å legge til bestemte gruppearrangementer |
| DELETE | `/:id` | JWT | Content.Edit | Slett et kuratert arrangement |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Fjern et bestemt arrangement fra en kuratert kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Fjern alle arrangementer for en gruppe fra en kuratert kalender |

## Filer {#files}

Basissti: `/content/files`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Hent filer etter innholdstype og innhold-ID |
| GET | `/` | JWT | — | List alle filer for menighetens nettside |
| GET | `/:id` | JWT | — | Hent en fil med ID |
| POST | `/` | JWT | Content.Edit* | Last opp filer (base64). *Også tillatt hvis brukeren er medlem av gruppen som samsvarer med `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hent en forhåndssignert S3-opplastings-URL. *Også tillatt for gruppemedlemmer. Maks 100 MB per innholdselement |
| DELETE | `/:id` | JWT | Content.Edit* | Slett en fil og fjern den fra lagringen. *Også tillatt for gruppemedlemmer |

## Galleri {#gallery}

Basissti: `/content/gallery`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Offentlig | — | List stockfoto i en mappe |
| GET | `/:folder` | JWT | Content.Edit | List galleribilder i en mappe |
| POST | `/requestUpload` | JWT | Content.Edit | Hent en forhåndssignert S3-opplastings-URL for et galleribilde |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Slett et galleribilde |

## Bibler {#bibles}

Basissti: `/content/bibles`

Alle bibelendepunkter er offentlige (ingen autentisering kreves). Data hentes fra eksterne kilder og caches lokalt.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | Offentlig | — | List alle bibeloversettelser (henter fra kilden hvis cachen er tom) |
| GET | `/stats?startDate=&endDate=` | Offentlig | — | Hent statistikk over bibelsøk for en datoperiode |
| GET | `/availableTranslations/:source` | Offentlig | — | List tilgjengelige oversettelser fra en kilde (f.eks. api.bible) |
| GET | `/updateTranslations` | Offentlig | — | Synkroniser alle oversettelser fra alle kilder |
| GET | `/updateTranslations/:source` | Offentlig | — | Synkroniser oversettelser fra en bestemt kilde |
| GET | `/updateCopyrights` | Offentlig | — | Oppdater opphavsrettsinformasjon for oversettelser som mangler den |
| GET | `/:translationKey/updateCopyright` | Offentlig | — | Oppdater opphavsrett for en bestemt oversettelse |
| GET | `/:translationKey/search?query=&limit=` | Offentlig | — | Søk etter vers i en oversettelse |
| GET | `/:translationKey/books` | Offentlig | — | Hent bøker for en oversettelse (caches lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Offentlig | — | Hent kapitler for en bok (caches lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Offentlig | — | Hent vers for et kapittel (caches lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Offentlig | — | Hent versetekst for et intervall. Logger oppslag. Noen oversettelser omgår cachingen av lisenshensyn |

### Eksempel: Hent versetekst {#example-get-verse-text}

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

## Sanger {#songs}

Basissti: `/content/songs`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Søk etter sanger med et søkeord |
| GET | `/:id` | JWT | — | Hent en sang med ID |
| GET | `/` | JWT | Content.Edit | List alle sanger |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sanger (batch) |
| POST | `/import` | JWT | — | Importer sanger fra FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en sang |

## Sangdetaljer {#song-details}

Basissti: `/content/songDetails`

Sangdetaljer er globale (ikke knyttet til en menighet). De representerer kanoniske sangmetadata som deles mellom menigheter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent sangdetaljer med ID (globalt) |
| GET | `/` | JWT | — | List sangdetaljer for menigheten |
| POST | `/create` | JWT | — | Opprett sangdetaljer fra en PraiseCharts-ID (returnerer eksisterende hvis de allerede er opprettet). Henter metadata automatisk fra PraiseCharts og MusicBrainz |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljer (batch) |

## Lenker til sangdetaljer {#song-detail-links}

Basissti: `/content/songDetailLinks`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke til sangdetaljer med ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hent alle lenker for sangdetaljer |
| POST | `/` | JWT | — | Opprett eller oppdater lenker til sangdetaljer (batch). Henter MusicBrainz-data automatisk hvis lenket |
| DELETE | `/:id` | JWT | — | Slett en lenke til sangdetaljer |

## Låtarrangementer {#arrangements}

Basissti: `/content/arrangements`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangement med ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hent arrangementer for en sang |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hent arrangementer for sangdetaljer |
| GET | `/` | JWT | Content.Edit | List alle arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementer (batch) |
| POST | `/freeShow/missing` | JWT | — | Finn FreeShow-ID-er som ikke finnes i menigheten. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement (sletter også tonearter; sletter sangen hvis ingen arrangementer gjenstår) |

## Arrangementtonearter {#arrangement-keys}

Basissti: `/content/arrangementKeys`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Offentlig | — | Hent toneart for arrangement med fullstendige sangdata for presentasjonsvisning |
| GET | `/:id` | JWT | — | Hent en toneart for arrangement med ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hent tonearter for et arrangement |
| GET | `/` | JWT | Content.Edit | List alle tonearter for arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater tonearter for arrangementer (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en toneart for et arrangement |

## Innstillinger {#settings}

Basissti: `/content/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent den innloggede brukerens innstillinger |
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for menigheten |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en menighet (returnert som nøkkel-verdi-par) |
| POST | `/my` | JWT | — | Lagre brukerinnstillinger (støtter opplasting av bilder i base64) |
| POST | `/` | JWT | Settings.Edit | Lagre menighetsinnstillinger (støtter opplasting av bilder i base64) |
| DELETE | `/my/:id` | JWT | — | Slett en brukerinnstilling |

## Forhåndsvisning {#preview}

Basissti: `/content/preview`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Offentlig | — | Last forhåndsvisningsdata for strømming for en menighet etter underdomene-nøkkel (faner, lenker, tjenester, prekener) |

## Galleri (stockfoto) {#gallery-stock-photos}

Basissti: `/content/stock`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/search` | Offentlig | — | Søk etter stockfoto på Pexels. Body: `{ term: "church" }` |

## PraiseCharts {#praisecharts}

Basissti: `/content/praiseCharts`

Integrasjon med PraiseCharts for oppdagelse av lovsanger og nedlasting av noter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Hent rådata fra PraiseCharts for en sang |
| GET | `/hasAccount` | JWT | — | Sjekk om brukeren har en koblet PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Søk i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hent produkter for en sang (fra biblioteket hvis autentisert, ellers fra katalogen) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hent rådata for arrangement fra biblioteket |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Last ned en fil fra PraiseCharts (PDF eller ZIP). Returnerer `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Offentlig | — | Hent OAuth-autoriseringsadresse for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Bytt OAuth-verifikator mot tilgangstoken og lagre i brukerinnstillingene |
| GET | `/library` | JWT | — | Bla i brukerens PraiseCharts-bibliotek |

## Støtte {#support}

Basissti: `/content/support`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Offentlig | — | Konverter SSML til MP3-lyd med AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Relaterte sider {#related-pages}

- [Arkitektur for nettsidebyggeren](../../architecture/website-builder) -- Hvordan sider, seksjoner, elementer, innlegg og omdirigeringer henger sammen på tvers av appene
- [Medlemsendepunkter](./membership) -- Personer, menigheter, grupper, roller, tillatelser
- [Oppmøte-endepunkter](./attendance) -- Sporing av gudstjenester og besøk
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Mønstre for kodeorganisering
