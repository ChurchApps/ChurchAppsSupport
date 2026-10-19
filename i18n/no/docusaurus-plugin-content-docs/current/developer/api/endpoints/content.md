---
title: "Innhold-endepunkter"
---

# Innhold-endepunkter

<div class="article-intro">

Content-modulen administrerer nettstedssider, seksjoner, elementer, blokker, blogginnlegg, omdirigeringer, prekener, spillelister, strømmetjenester, hendelser, kuraterte kalendere, filer, galleri, bibeloversettelser og vers-oppslag, sanger, arrangementer, globale stiler, stockfoto og innstillinger. Det er den største modulen i API-et, og den driver CMS, media/strømming, gudstjenesteplanlegging og bibelfunksjoner på tvers av alle ChurchApps-applikasjonene.

</div>

**Basissti:** `/content`

## Sider

Basissti: `/content/pages`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Offentlig | — | Last inn hele sidetreet (seksjoner, elementer, blokker) etter URL eller ID. Fjerner interne ID-er når det hentes etter URL. URL-baserte hentinger håndhever `pages.visibility` — en side med begrenset tilgang returnerer `{ restricted: true, visibility }` med mindre den (valgfrie) JWT-en oppfyller kravet |
| GET | `/public/:churchId` | Offentlig | — | List offentlige sider (`url`, `title`, `metaDescription`); kun `visibility = everyone` |
| GET | `/:id` | JWT | — | Hent en side etter ID |
| GET | `/` | JWT | — | List alle sider for menigheten |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser en side med alle seksjoner og elementer |
| POST | `/temp/ai` | JWT | Content.Edit | Lagre en KI-generert side (side, seksjoner og elementer i ett kall) |
| POST | `/importTree` | JWT | Content.Edit | Opprett en side fra et nestet tre (`title`, `url`, `sections[].elements[]…`). Setter alltid inn under innringerens menighet; ID-er i innholdet ignoreres. Rader må inkludere sine `column`-underelementer. Maks 30 seksjoner / 500 elementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sider (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en side |

### Eksempel: Last inn sidetre

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

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en seksjon etter ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliser en seksjon eller konverter den til en gjenbrukbar blokk |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater seksjoner (batch). Oppdaterer sorteringsrekkefølgen automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett en seksjon (oppdaterer sorteringsrekkefølgen automatisk) |

## Elementer

Basissti: `/content/elements`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et element etter ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliser et element med alle underelementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater elementer (batch). Administrerer rad-kolonner og karusell-lysbilder automatisk |
| DELETE | `/:id` | JWT | Content.Edit | Slett et element |

## Blokker

Basissti: `/content/blocks`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en blokk etter ID |
| GET | `/` | JWT | — | List alle blokker |
| GET | `/:churchId/tree/:id` | Offentlig | — | Last inn hele blokktreet med seksjoner og elementer |
| GET | `/blockType/:blockType` | JWT | — | Last inn blokker etter type (f.eks. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Offentlig | — | Last inn bunntekstblokkens tre for en menighet |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater blokker |
| DELETE | `/:id` | JWT | Content.Edit | Slett en blokk |

## Lenker

Basissti: `/content/links`

Utvider standard CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke etter ID |
| GET | `/` | JWT | — | List alle lenker. Valgfritt filter `?category=`. Sorteres automatisk etter lagring |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Last inn lenker filtrert etter synlighet (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Offentlig | — | Last inn lenker for en menighet etter kategori (offentlig) |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater lenker (batch). Sorteres automatisk etter kategori |
| DELETE | `/:id` | JWT | Content.Edit | Slett en lenke |

## Globale stiler

Basissti: `/content/globalStyles`

Utvider standard CRUD (POST `/`, DELETE `/:id` fra basisklassen med Content.Edit-tillatelse for skriving).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/church/:churchId` | Offentlig | — | Last inn globale stiler for en menighet (returnerer standardverdier hvis ingen er satt) |
| GET | `/` | JWT | — | Last inn globale stiler for den autentiserte menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater globale stiler |
| DELETE | `/:id` | JWT | Content.Edit | Slett globale stiler |

## Sidehistorikk

Basissti: `/content/pageHistory`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | List historikkoppføringer for en side |
| GET | `/block/:blockId` | JWT | Content.Edit | List historikkoppføringer for en blokk |
| GET | `/:id` | JWT | Content.Edit | Hent en historikkoppføring etter ID |
| POST | `/` | JWT | Content.Edit | Lagre et øyeblikksbilde av en side/blokk. Rydder periodisk opp i oppføringer eldre enn 30 dager |
| POST | `/restore/:id` | JWT | Content.Edit | Gjenopprett en side/blokk fra et historikkøyeblikksbilde (sletter gjeldende innhold og oppretter det på nytt fra øyeblikksbildet) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Gjenopprett fra et innebygd øyeblikksbildeobjekt. Innhold: `{ pageId, blockId, snapshot }` |

## Innlegg (blogg)

Basissti: `/content/posts`

Blogginnlegg er frittstående rader: `title`, `slug` (unik per menighet), `excerpt`, `content` (markdown-innhold), `authorId`, `photoUrl`, `publishDate`, `category` og `tags`. Et innlegg publiseres når `publishDate` er satt og ligger i fortiden. Leseendepunktene beriker hvert innlegg med `authorName` hentet fra `authorId`. Se [Arkitektur for nettstedsbygger](../../architecture/website-builder#blog).

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Offentlig | — | List publiserte innlegg, paginert (maks 50 per side) |
| GET | `/public/:churchId/categories` | Offentlig | — | Unike kategorier på tvers av publiserte innlegg |
| GET | `/public/:churchId/slug/:slug` | Offentlig | — | Hent et publisert innlegg etter slug |
| GET | `/rss/:churchId?siteUrl=` | Offentlig | — | RSS 2.0-feed med publiserte innlegg (lenker bygges som `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Hent et innlegg etter ID |
| GET | `/` | JWT | — | List alle innlegg for menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater innlegg (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et innlegg |

## Omdirigeringer

Basissti: `/content/redirects`

Omdirigeringer av URL-er per menighet (`fromPath` → `toPath`), begrenset til 200 per menighet. Stier normaliseres (små bokstaver, innledende skråstrek, ingen avsluttende skråstrek), og `fromPath` er unik per menighet. B1App slår disse opp ved sannsynlige 404-feil og sender en HTTP 308.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/:churchId?path=` | Offentlig | — | Slå opp en sti (eller list alle omdirigeringer når `path` utelates) |
| GET | `/:id` | JWT | — | Hent en omdirigering etter ID |
| GET | `/` | JWT | — | List alle omdirigeringer for menigheten |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater omdirigeringer. Avviser `fromPath = toPath` og håndhever grensen på 200 rader |
| DELETE | `/:id` | JWT | Content.Edit | Slett en omdirigering |

## Prekener

Basissti: `/content/sermons`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Hent en eksempelstruktur for FreeShow-spilleliste |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Hent TV-appens innpakning med preken-, leksjons- og FreeShow-kilder |
| GET | `/public/tvFeed/:churchId/:sermonId` | Offentlig | — | Hent en enkelt preken som en TV-feed-spilleliste |
| GET | `/public/tvFeed/:churchId` | Offentlig | — | Hent alle offentlige spillelister/prekener som en TV-feed |
| GET | `/public/:churchId` | Offentlig | — | List alle offentlige prekener for en menighet |
| GET | `/timeline?sermonIds=` | JWT | — | Last inn tidslinjedata for prekener |
| GET | `/lookup?videoType=&videoData=` | Offentlig | — | Slå opp prekenmetadata fra YouTube eller Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Generer KI-forslag til innlegg på sosiale medier fra undertekster i prekener |
| GET | `/outline?url=&title=&author=` | JWT | — | Generer en KI-basert leksjonsoversikt fra en URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importer videoer fra en YouTube-kanal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importer videoer fra en Vimeo-kanal |
| GET | `/:id` | JWT | — | Hent en preken etter ID |
| GET | `/` | JWT | — | List alle prekener |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater prekener (batch, støtter opplasting av miniatyrbilde i base64) |
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

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en spilleliste etter ID |
| GET | `/` | JWT | — | List alle spillelister |
| GET | `/public/:churchId` | Offentlig | — | List alle offentlige spillelister for en menighet |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater spillelister (batch, støtter opplasting av miniatyrbilde i base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en spilleliste |

## Strømmetjenester

Basissti: `/content/streamingServices`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Hent kryptert chatrom-ID for vertsverten for en tjeneste |
| GET | `/` | JWT | — | List alle strømmetjenester. Rydder automatisk bort utløpte ikke-gjentakende tjenester og flytter gjentakende tjenester videre |
| POST | `/` | JWT | StreamingServices.Edit | Opprett eller oppdater strømmetjenester (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Slett en strømmetjeneste (fjerner også blokkerte IP-adresser) |

## Hendelser

Basissti: `/content/events`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Last inn tidslinjehendelser for en gruppe |
| GET | `/timeline?eventIds=` | JWT | — | Last inn tidslinjehendelser for den innloggede brukerens grupper |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Offentlig | — | Abonner på hendelser som ICS-kalenderfeed |
| GET | `/group/:groupId` | JWT | — | Hent hendelser for en gruppe (inkluderer unntaksdatoer) |
| GET | `/public/group/:churchId/:groupId` | Offentlig | — | Hent offentlige hendelser for en gruppe |
| GET | `/public/:churchId/:id` | Offentlig | — | Hent én hendelse for dens offentlige side, med `roomNames` (rom fra bookinger som ikke er avslått). Returnerer `null` for ventende eller avslåtte hendelser og for private hendelser som ikke tar imot påmeldinger |
| GET | `/public/:churchId/:id/ical` | Offentlig | — | Last ned den enkelte hendelsen som en `.ics`-fil (`text/calendar`, med unntaksdatoer brukt). `404` når hendelsen er skjult etter de samme reglene |
| GET | `/:id` | JWT | — | Hent en hendelse etter ID |
| POST | `/` | JWT | — | Opprett eller oppdater hendelser (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en hendelse |

Hendelsespostene inkluderer `photoUrl` (hendelsesbildet i 16:9 som vises på den offentlige hendelsessiden og på kommende hendelser), `tags` (kommaseparert, brukt av kalenderelementet på nettstedet til tagfilteret), og `notesViewRole` / `notesPostRole` (`staff` når `null`, `leaders` eller `members`), som styrer hendelsens `eventNote`-samtale. Se [Tilgangskontroll for gruppe- og hendelsesnotater](./messaging.md#group-and-event-notes-access-control). Offentlige svar for kuraterte hendelser inneholder også `photoUrl` og `tags` for hver hendelse.

## Hendelsesunntak

Basissti: `/content/eventExceptions`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et hendelsesunntak etter ID |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater hendelsesunntak (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett et hendelsesunntak |

## Kuraterte kalendere

Basissti: `/content/curatedCalendars`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en kuratert kalender etter ID |
| GET | `/` | JWT | — | List alle kuraterte kalendere |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte kalendere (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert kalender |

## Kuraterte hendelser

Basissti: `/content/curatedEvents`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Hent kuraterte hendelser for en kalender (inkluderer hendelsesdetaljer og unntaksdatoer med mindre `?withoutEvents` er satt) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Offentlig | — | Hent offentlige kuraterte hendelser for en kalender |
| GET | `/:id` | JWT | — | Hent en kuratert hendelse etter ID |
| GET | `/` | JWT | — | List alle kuraterte hendelser |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater kuraterte hendelser. Støtter `eventIds`-liste for å legge til bestemte gruppehendelser |
| DELETE | `/:id` | JWT | Content.Edit | Slett en kuratert hendelse |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Fjern en bestemt hendelse fra en kuratert kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Fjern alle hendelser for en gruppe fra en kuratert kalender |

## Filer

Basissti: `/content/files`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Hent filer etter innholdstype og innholds-ID |
| GET | `/` | JWT | — | List alle filer for menighetens nettsted |
| GET | `/:id` | JWT | — | Hent en fil etter ID |
| POST | `/` | JWT | Content.Edit* | Last opp filer (base64). *Også tillatt hvis brukeren er medlem av gruppen som samsvarer med `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Hent en forhåndssignert S3-opplastings-URL. *Også tillatt for gruppemedlemmer. Maks 100 MB per innholdselement |
| DELETE | `/:id` | JWT | Content.Edit* | Slett en fil og fjern den fra lagringen. *Også tillatt for gruppemedlemmer |

## Galleri

Basissti: `/content/gallery`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/stock/:folder` | Offentlig | — | List stockfoto i en mappe |
| GET | `/:folder` | JWT | Content.Edit | List galleribilder i en mappe |
| POST | `/requestUpload` | JWT | Content.Edit | Hent en forhåndssignert S3-opplastings-URL for et galleribilde |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Slett et galleribilde |

## Bibler

Basissti: `/content/bibles`

Alle bibelendepunkter er offentlige (ingen autentisering kreves). Data hentes fra eksterne kilder og mellomlagres lokalt.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/` | Offentlig | — | List alle bibeloversettelser (henter fra kilden hvis mellomlageret er tomt) |
| GET | `/stats?startDate=&endDate=` | Offentlig | — | Hent statistikk over bibelsøk for et datointervall |
| GET | `/availableTranslations/:source` | Offentlig | — | List tilgjengelige oversettelser fra en kilde (f.eks. api.bible) |
| GET | `/updateTranslations` | Offentlig | — | Synkroniser alle oversettelser fra alle kilder |
| GET | `/updateTranslations/:source` | Offentlig | — | Synkroniser oversettelser fra en bestemt kilde |
| GET | `/updateCopyrights` | Offentlig | — | Oppdater opphavsrettsinformasjon for oversettelser som mangler den |
| GET | `/:translationKey/updateCopyright` | Offentlig | — | Oppdater opphavsrett for en bestemt oversettelse |
| GET | `/:translationKey/search?query=&limit=` | Offentlig | — | Søk etter vers i en oversettelse |
| GET | `/:translationKey/books` | Offentlig | — | Hent bøker for en oversettelse (mellomlagrer lokalt) |
| GET | `/:translationKey/:bookKey/chapters` | Offentlig | — | Hent kapitler for en bok (mellomlagrer lokalt) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Offentlig | — | Hent vers for et kapittel (mellomlagrer lokalt) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Offentlig | — | Hent versteksten for et intervall. Logger oppslag. Noen oversettelser omgår mellomlagring av lisenshensyn |

### Eksempel: Hent versteksten

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

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/search?q=` | JWT | — | Søk etter sanger |
| GET | `/:id` | JWT | — | Hent en sang etter ID |
| GET | `/` | JWT | Content.Edit | List alle sanger |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater sanger (batch) |
| POST | `/import` | JWT | — | Importer sanger fra FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en sang |

## Sangdetaljer

Basissti: `/content/songDetails`

Sangdetaljer er globale (ikke knyttet til menighet). De representerer kanoniske sangmetadata som deles mellom menigheter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent sangdetaljer etter ID (globalt) |
| GET | `/` | JWT | — | List sangdetaljer for menigheten |
| POST | `/create` | JWT | — | Opprett sangdetaljer fra en PraiseCharts-ID (returnerer eksisterende hvis de allerede er opprettet). Henter metadata automatisk fra PraiseCharts og MusicBrainz |
| POST | `/` | JWT | — | Opprett eller oppdater sangdetaljer (batch) |

## Lenker for sangdetaljer

Basissti: `/content/songDetailLinks`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent en lenke for sangdetaljer etter ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Hent alle lenker for sangdetaljer |
| POST | `/` | JWT | — | Opprett eller oppdater lenker for sangdetaljer (batch). Henter MusicBrainz-data automatisk hvis lenket |
| DELETE | `/:id` | JWT | — | Slett en lenke for sangdetaljer |

## Arrangementer

Basissti: `/content/arrangements`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Hent et arrangement etter ID |
| GET | `/song/:songId` | JWT | Content.Edit | Hent arrangementer for en sang |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Hent arrangementer for sangdetaljer |
| GET | `/` | JWT | Content.Edit | List alle arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater arrangementer (batch) |
| POST | `/freeShow/missing` | JWT | — | Finn FreeShow-ID-er som ikke finnes i menigheten. Innhold: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Slett et arrangement (sletter også tonearter; sletter sangen hvis ingen arrangementer gjenstår) |

## Tonearter for arrangementer

Basissti: `/content/arrangementKeys`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:id` | Offentlig | — | Hent tonearten for et arrangement med full sangdata for presentasjonsvisningen |
| GET | `/:id` | JWT | — | Hent en tonart for et arrangement etter ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Hent tonearter for et arrangement |
| GET | `/` | JWT | Content.Edit | List alle tonearter for arrangementer |
| POST | `/` | JWT | Content.Edit | Opprett eller oppdater tonearter for arrangementer (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Slett en tonart for et arrangement |

## Innstillinger

Basissti: `/content/settings`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Hent gjeldende brukers innstillinger |
| GET | `/` | JWT | Settings.Edit | Hent alle innstillinger for menigheten |
| GET | `/public/:churchId` | Offentlig | — | Hent offentlige innstillinger for en menighet (returnert som nøkkel-verdi-par) |
| POST | `/my` | JWT | — | Lagre innstillinger på brukernivå (støtter opplasting av bilde i base64) |
| POST | `/` | JWT | Settings.Edit | Lagre innstillinger på menighetsnivå (støtter opplasting av bilde i base64) |
| DELETE | `/my/:id` | JWT | — | Slett en brukerinnstilling |

## Forhåndsvisning

Basissti: `/content/preview`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/data/:key` | Offentlig | — | Last inn forhåndsvisningsdata for strømming for en menighet etter underdomenenøkkel (faner, lenker, tjenester, prekener) |

## Galleri (stockfoto)

Basissti: `/content/stock`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/search` | Offentlig | — | Søk etter stockfoto på Pexels. Innhold: `{ term: "church" }` |

## PraiseCharts

Basissti: `/content/praiseCharts`

Integrasjon med PraiseCharts for oppdagelse av lovsangssanger og nedlasting av noter.

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| GET | `/raw/:id` | JWT | — | Hent rådata fra PraiseCharts for en sang |
| GET | `/hasAccount` | JWT | — | Sjekk om brukeren har en koblet PraiseCharts-konto |
| GET | `/search?q=` | JWT | — | Søk i PraiseCharts-katalogen |
| GET | `/products/:id?keys=` | JWT | — | Hent produkter for en sang (fra biblioteket hvis autentisert, ellers fra katalogen) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Hent rå arrangementdata fra biblioteket |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Last ned en fil fra PraiseCharts (PDF eller ZIP). Returnerer `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Offentlig | — | Hent OAuth-autorisasjons-URL for PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Bytt OAuth-verifikator med et tilgangstoken og lagre det i brukerens innstillinger |
| GET | `/library` | JWT | — | Bla i brukerens PraiseCharts-bibliotek |

## Støtte

Basissti: `/content/support`

| Metode | Sti | Autentisering | Tillatelse | Beskrivelse |
|--------|------|------|------------|-------------|
| POST | `/createAudio` | Offentlig | — | Konverter SSML til MP3-lyd med AWS Polly. Innhold: `{ ssml: "<speak>...</speak>" }` |

## Relaterte sider

- [Arkitektur for nettstedsbygger](../../architecture/website-builder) -- Hvordan sider, seksjoner, elementer, innlegg og omdirigeringer henger sammen på tvers av appene
- [Endepunkter for medlemskap](./membership) -- Personer, menigheter, grupper, roller, tillatelser
- [Endepunkter for oppmøte](./attendance) -- Sporing av tjenester og besøk
- [Autentisering og tillatelser](./authentication) -- Innloggingsflyt, JWT, tillatelsesmodell
- [Modulstruktur](../module-structure) -- Mønstre for kodeorganisering
