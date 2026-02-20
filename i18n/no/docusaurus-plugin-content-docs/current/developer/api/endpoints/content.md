---
title: "Content-endepunkter"
---

# Content-endepunkter

<div class="article-intro">

Content-modulen administrerer nettsider, seksjoner, elementer, blokker, prekener, spillelister, strømmingstjenester, hendelser, kuraterte kalendere, filer, gallerier, bibeloversettelser og versoppslag, sanger, arrangementer, globale stiler, arkivbilder og innstillinger. Det er den største modulen i API-et og driver CMS-et, medie-/strømmingsfunksjoner, lovsangplanlegging og bibelfunksjoner på tvers av alle ChurchApps-applikasjoner.

</div>

**Basissti:** `/content`

## Sider

Basissti: `/content/pages`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Public | — | Last fullstendig sidetre (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er ved henting via URL |
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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en seksjon etter ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliser en seksjon eller konverter den til en gjenbrukbar blokk |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater seksjoner (batch). Oppdaterer sorteringsrekkefølge automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett en seksjon (oppdaterer sorteringsrekkefølge automatisk) |

## Elementer

Basissti: `/content/elements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et element etter ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser et element med alle underordnede |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater elementer (batch). Administrerer radkolonner og karusellbilder automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett et element |

## Blokker

Basissti: `/content/blocks`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra baseklassen med Content.Edit-tillatelse for skriving).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokk etter ID |
| GET | `/` | JWT | — | List alle blokker |
| GET | `/:churchId/tree/:id` | Public | — | Last fullstendig blokktre med seksjoner og elementer |
| GET | `/blockType/:blockType` | JWT | — | Last blokker etter type (f.eks. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Public | — | Last bunntekstblokktre for en kirke |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater blokker |
| DELETE | `/:id` | JWT | Content.Edit | Slett en blokk |

## Lenker

Basissti: `/content/links`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra baseklassen med Content.Edit-tillatelse for skriving).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke etter ID |
| GET | `/` | JWT | — | List alle lenker. Valgfritt `?category=`-filter. Sorteres automatisk etter lagring |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Last lenker filtrert etter synlighet (alle, besøkende, medlemmer, ansatte, grupper) |
| GET | `/church/:churchId?category=` | Public | — | Last lenker for en kirke etter kategori (offentlig) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater lenker (batch). Sorteres automatisk etter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Slett en lenke |

## Globale stiler

Basissti: `/content/globalStyles`

Utvider standard CRUD (POST `/`, DELETE `/:id` fra baseklassen med Content.Edit-tillatelse for skriving).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Public | — | Last globale stiler for en kirke (returnerer standardverdier hvis ingen er angitt) |
| GET | `/` | JWT | — | Last globale stiler for den autentiserte kirken |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater globale stiler |
| DELETE | `/:id` | JWT | Content.Edit | Slett globale stiler |

## Sidehistorikk

Basissti: `/content/pageHistory`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List historikkoppføringer for en side |
| GET | `/block/:blockId` | JWT | Content.Edit | List historikkoppføringer for en blokk |
| GET | `/:id` | JWT | Content.Edit | Hent en historikkoppføring etter ID |
| POST | `/` | JWT | Content.Edit | Lagre et side-/blokkøyeblikksbilde. Rydder periodisk opp oppføringer eldre enn 30 dager |
| POST | `/restore/:id` | JWT | Content.Edit | Gjenopprett en side/blokk fra et historikkøyeblikksbilde (sletter gjeldende innhold og gjenskaper fra øyeblikksbildet) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Gjenopprett fra et innebygd øyeblikksobjekt. Body: `{ pageId, blockId, snapshot }` |

## Prekener

Basissti: `/content/sermons`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Hent en eksempel FreeShow-spillelistestruktur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hent TV-app-wrapper med preken-, leksjons- og FreeShow-kilder |
| GET | `/public/tvFeed/:churchId/:sermonId` | Public | — | Hent en enkelt preken som TV-feed-spilleliste |
| GET | `/public/tvFeed/:churchId` | Public | — | Hent alle offentlige spillelister/prekener som TV-feed |
| GET | `/public/:churchId` | Public | — | List alle offentlige prekener for en kirke |
| GET | `/timeline?sermonIds=` | JWT | — | Last tidslinjedata for prekener |
| GET | `/lookup?videoType=&videoData=` | Public | — | Slå opp prekenmetadata fra YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generer AI-forslag til sosiale medier-innlegg fra prekenundertekster |
| GET | `/outline?url=&title=&author=` | JWT | — | Generer AI-leksjonsoversikt fra en URL |
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

Utvider standard CRUD (GET `/:id`, GET `/`, DELETE `/:id` fra baseklassen med StreamingServices.Edit-tillatelse for skriving).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en spilleliste etter ID |
| GET | `/` | JWT | — | List alle spillelister |
| GET | `/public/:churchId` | Public | — | List alle offentlige spillelister for en kirke |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater spillelister (batch, støtter base64-miniatyrbildeopplasting) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en spilleliste |

## Strømmingstjenester

Basissti: `/content/streamingServices`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hent kryptert verts-chatrom-ID for en tjeneste |
| GET | `/` | JWT | — | List alle strømmingstjenester. Rydder automatisk opp utløpte ikke-gjentagende tjenester og fremskynder gjentagende |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater strømmingstjenester (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en strømmingstjeneste (fjerner også blokkerte IP-er) |

## Hendelser

Basissti: `/content/events`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Last tidslinjehendelser for en gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Last tidslinjehendelser for gjeldende brukers grupper |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Public | — | Abonner på hendelser som ICS-kalender-feed |
| GET | `/group/:groupId` | JWT | — | Hent hendelser for en gruppe (inkluderer unntaksdatoer) |
| GET | `/public/group/:churchId/:groupId` | Public | — | Hent offentlige hendelser for en gruppe |
| GET | `/:id` | JWT | — | Hent en hendelse etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater hendelser (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en hendelse |

## Hendelsesunntak

Basissti: `/content/eventExceptions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et hendelsesunntak etter ID |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater hendelsesunntak (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et hendelsesunntak |

## Kuraterte kalendere

Basissti: `/content/curatedCalendars`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en kuratert kalender etter ID |
| GET | `/` | JWT | — | List alle kuraterte kalendere |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte kalendere (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert kalender |

## Kuraterte hendelser

Basissti: `/content/curatedEvents`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hent kuraterte hendelser for en kalender (inkluderer hendelsesdetaljer og unntaksdatoer med mindre `?withoutEvents` er satt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Public | — | Hent offentlige kuraterte hendelser for en kalender |
| GET | `/:id` | JWT | — | Hent en kuratert hendelse etter ID |
| GET | `/` | JWT | — | List alle kuraterte hendelser |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte hendelser. Støtter `eventIds`-liste for å legge til spesifikke gruppehendelser |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert hendelse |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Fjern en spesifikk hendelse fra en kuratert kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Fjern alle hendelser for en gruppe fra en kuratert kalender |

## Filer

Basissti: `/content/files`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Hent filer etter innholdstype og innholds-ID |
| GET | `/` | JWT | — | List alle filer for kirkenettstedet |
| GET | `/:id` | JWT | — | Hent en fil etter ID |
| POST | `/` | JWT | Content.Edit* | Last opp filer (base64). *Også tillatt hvis brukeren er medlem av gruppen som samsvarer med `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hent en forhåndssignert S3-opplastings-URL. *Også tillatt for gruppemedlemmer. Maks 100 MB per innholdselement |
| DELETE | `/:id` | JWT | Content.Edit* | Slett en fil og fjern fra lagring. *Også tillatt for gruppemedlemmer |

## Galleri

Basissti: `/content/gallery`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Public | — | List arkivbilder i en mappe |
| GET | `/:folder` | JWT | Content.Edit | List galleribilder i en mappe |
| POST | `/requestUpload` | JWT | Content.Edit | Hent en forhåndssignert S3-opplastings-URL for et galleribilde |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Slett et galleribilde |

## Bibler

Basissti: `/content/bibles`

Alle bibelendepunkter er offentlige (ingen autentisering kreves). Data hentes fra eksterne kilder og bufres lokalt.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | Public | — | List alle bibeloversettelser (henter fra kilde hvis bufferen er tom) |
| GET | `/stats?startDate=&endDate=` | Public | — | Hent statistikk for bibeloppslag for en datoperiode |
| GET | `/availableTranslations/:source` | Public | — | List tilgjengelige oversettelser fra en kilde (f.eks. api.bible) |
| GET | `/updateTranslations` | Public | — | Synkroniser alle oversettelser fra alle kilder |
| GET | `/updateTranslations/:source` | Public | — | Synkroniser oversettelser fra en spesifikk kilde |
| GET | `/updateCopyrights` | Public | — | Oppdater opphavsrettsinformasjon for oversettelser som mangler det |
| GET | `/:translationKey/updateCopyright` | Public | — | Oppdater opphavsrett for en spesifikk oversettelse |
| GET | `/:translationKey/search?query=&limit=` | Public | — | Søk vers i en oversettelse |
| GET | `/:translationKey/books` | Public | — | Hent bøker for en oversettelse (bufres lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Public | — | Hent kapitler for en bok (bufres lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Public | — | Hent vers for et kapittel (bufres lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Public | — | Hent verstekst for et område. Logger oppslag. Noen oversettelser omgår bufring på grunn av lisensiering |

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

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Søk sanger etter spørring |
| GET | `/:id` | JWT | — | Hent en sang etter ID |
| GET | `/` | JWT | Content.Edit | List alle sanger |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sanger (batch) |
| POST | `/import` | JWT | — | Importer sanger fra FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en sang |

## Sangdetaljer

Basissti: `/content/songDetails`

Sangdetaljer er globale (ikke kirke-avgrenset). Disse representerer kanoniske sangmetadata som deles på tvers av kirker.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetalj etter ID (global) |
| GET | `/` | JWT | — | List sangdetaljer for kirken |
| POST | `/create` | JWT | — | Opprett en sangdetalj fra PraiseCharts-ID (returnerer eksisterende hvis allerede opprettet). Henter metadata automatisk fra PraiseCharts og MusicBrainz |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljer (batch) |

## Sangdetaljlenker

Basissti: `/content/songDetailLinks`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en sangdetaljlenke etter ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hent alle lenker for en sangdetalj |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljlenker (batch). Henter MusicBrainz-data automatisk hvis lenket |
| DELETE | `/:id` | JWT | — | Slett en sangdetaljlenke |

## Arrangementer

Basissti: `/content/arrangements`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangement etter ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hent arrangementer for en sang |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hent arrangementer for en sangdetalj |
| GET | `/` | JWT | Content.Edit | List alle arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementer (batch) |
| POST | `/freeShow/missing` | JWT | — | Finn FreeShow-ID-er som ikke finnes i kirken. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement (sletter også tonearter; sletter sangen hvis ingen arrangementer gjenstår) |

## Arrangementstonearter

Basissti: `/content/arrangementKeys`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Public | — | Hent arrangementtoneart med fullstendige sangdata for presentasjonsvisning |
| GET | `/:id` | JWT | — | Hent en arrangementtoneart etter ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hent tonearter for et arrangement |
| GET | `/` | JWT | Content.Edit | List alle arrangementstonearter |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementstonearter (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en arrangementtoneart |

## Innstillinger

Basissti: `/content/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers innstillinger |
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for kirken |
| GET | `/public/:churchId` | Public | — | Hent offentlige innstillinger for en kirke (returneres som nøkkel-verdi-par) |
| GET | `/imports?playlistId=&channelId=&type=` | JWT | Settings.Edit | Hent automatiske importinnstillinger (YouTube-/Vimeo-kanal-ID-er) |
| POST | `/my` | JWT | — | Lagre innstillinger på brukernivå (støtter base64-bildeopplasting) |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger på kirkenivå (støtter base64-bildeopplasting) |
| DELETE | `/my/:id` | JWT | — | Slett en brukerinnstilling |

## Forhåndsvisning

Basissti: `/content/preview`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Public | — | Last strømmingsforhåndsvisningsdata for en kirke etter underdomene-nøkkel (faner, lenker, tjenester, prekener) |

## Galleri (arkivbilder)

Basissti: `/content/stock`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/search` | Public | — | Søk Pexels-arkivbilder. Body: `{ term: "church" }` |

## PraiseCharts

Basissti: `/content/praiseCharts`

Integrasjon med PraiseCharts for oppdagelse av lovsanger og nedlasting av noter.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Hent rå PraiseCharts-data for en sang |
| GET | `/hasAccount` | JWT | — | Sjekk om brukeren har en tilknyttet PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Søk i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hent produkter for en sang (fra bibliotek hvis autentisert, ellers katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hent rå arrangementdata fra bibliotek |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Last ned en fil fra PraiseCharts (PDF eller ZIP). Returnerer `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Public | — | Hent OAuth-autoriserings-URL for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Bytt OAuth-verifikator mot tilgangstoken og lagre i brukerinnstillinger |
| GET | `/library` | JWT | — | Bla gjennom brukerens PraiseCharts-bibliotek |

## Støtte

Basissti: `/content/support`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Public | — | Konverter SSML til MP3-lyd ved hjelp av AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Relaterte sider

- [Membership-endepunkter](./membership) -- Personer, kirker, grupper, roller, tillatelser
- [Attendance-endepunkter](./attendance) -- Gudstjeneste- og besøkssporing
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Kodeorganiseringsmønstre
