---
title: "Inhoudeindpunten"
---

# Inhoudeindpunten

<div class="article-intro">

De Inhoudsmodule beheert websitepagina's, secties, elementen, blokken, preken, afspeellijsten, streaming-services, evenementen, samengestelde kalenders, bestanden, galerijen, Bijbelvertalingen en verszoekopdrachten, nummers, arrangementen, globale stijlen, stockfoto's en instellingen. Dit is de grootste module in de API en drijft de CMS, media/streaming, aanbidding planning en Bijbelfeatures in alle ChurchApps-applicaties.

</div>

**Basispad:** `/content`

## Pagina's

Basispad: `/content/pages`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:churchId/tree?url=&id=` | Openbaar | — | Laad volledige pagina boom (secties, elementen, blokken) per URL of ID. Verwijdert interne ID's wanneer opgehaald per URL |
| GET | `/:id` | JWT | — | Een pagina op ID opvragen |
| GET | `/` | JWT | — | Lijst alle pagina's voor de kerk |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliceer een pagina met alle secties en elementen |
| POST | `/temp/ai` | JWT | Content.Edit | Sla een door AI gegenereerde pagina op (pagina, secties en elementen in één aanroep) |
| POST | `/` | JWT | Content.Edit | Pagina's maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een pagina verwijderen |

### Voorbeeld: Pagina Boom laden

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

## Secties

Basispad: `/content/sections`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Een sectie op ID opvragen |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Dupliceer een sectie of converteer deze naar een herbruikbaar blok |
| POST | `/` | JWT | Content.Edit | Secties maken of bijwerken (batch). Sorteer volgorde automatisch |
| DELETE | `/:id` | JWT | Content.Edit | Een sectie verwijderen (sorteervolgorde automatisch bijwerken) |

## Elementen

Basispad: `/content/elements`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Een element op ID opvragen |
| POST | `/duplicate/:id` | JWT | Content.Edit | Dupliceer een element met alle onderliggende elementen |
| POST | `/` | JWT | Content.Edit | Elementen maken of bijwerken (batch). Beheer automatisch rijkolommen en carrouselladen |
| DELETE | `/:id` | JWT | Content.Edit | Een element verwijderen |

## Blokken

Basispad: `/content/blocks`

Breidt standaard CRUD uit (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` van basisklasse met Content.Edit toestemming voor schrijfbewerkingen).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Een blok op ID opvragen |
| GET | `/` | JWT | — | Lijst alle blokken |
| GET | `/:churchId/tree/:id` | Openbaar | — | Laad volledige blokboom met secties en elementen |
| GET | `/blockType/:blockType` | JWT | — | Laad blokken per type (bijv. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Openbaar | — | Laad voettekstblokboom voor een kerk |
| POST | `/` | JWT | Content.Edit | Blokken maken of bijwerken |
| DELETE | `/:id` | JWT | Content.Edit | Een blok verwijderen |

## Koppelingen

Basispad: `/content/links`

Breidt standaard CRUD uit (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` van basisklasse met Content.Edit toestemming voor schrijfbewerkingen).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Een koppeling op ID opvragen |
| GET | `/` | JWT | — | Lijst alle koppelingen. Optionele `?category=` filter. Automatisch gesorteerd na opslaan |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Laad koppelingen gefilterd op zichtbaarheid (iedereen, bezoekers, leden, personeel, groepen) |
| GET | `/church/:churchId?category=` | Openbaar | — | Laad koppelingen voor een kerk per categorie (openbaar) |
| POST | `/` | JWT | Content.Edit | Koppelingen maken of bijwerken (batch). Automatisch sorteren per categorie |
| DELETE | `/:id` | JWT | Content.Edit | Een koppeling verwijderen |

## Globale stijlen

Basispad: `/content/globalStyles`

Breidt standaard CRUD uit (POST `/`, DELETE `/:id` van basisklasse met Content.Edit toestemming voor schrijfbewerkingen).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/church/:churchId` | Openbaar | — | Laad globale stijlen voor een kerk (retourneert standaarden als er geen zijn ingesteld) |
| GET | `/` | JWT | — | Laad globale stijlen voor de geverifieerde kerk |
| POST | `/` | JWT | Content.Edit | Globale stijlen maken of bijwerken |
| DELETE | `/:id` | JWT | Content.Edit | Globale stijlen verwijderen |

## Paginageschiedenis

Basispad: `/content/pageHistory`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Lijst geschiedenisitems voor een pagina |
| GET | `/block/:blockId` | JWT | Content.Edit | Lijst geschiedenisitems voor een blok |
| GET | `/:id` | JWT | Content.Edit | Haal geschiedenisitem op ID |
| POST | `/` | JWT | Content.Edit | Sla pagina/blok momentopname op. Schoon periodiek items ouder dan 30 dagen op |
| POST | `/restore/:id` | JWT | Content.Edit | Herstel een pagina/blok uit momentopname (verwijdert huidige inhoud en herstelt uit momentopname) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Herstel vanuit inline momentopname object. Body: `{ pageId, blockId, snapshot }` |

## Preken

Basispad: `/content/sermons`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Haal voorbeeld FreeShow afspeellijst structuur |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Haal TV app wrapper met preek, les en FreeShow bronnen |
| GET | `/public/tvFeed/:churchId/:sermonId` | Openbaar | — | Haal enkele preek als TV feed afspeellijst |
| GET | `/public/tvFeed/:churchId` | Openbaar | — | Haal alle openbare afspeellijsten/preken als TV feed |
| GET | `/public/:churchId` | Openbaar | — | Lijst alle openbare preken voor een kerk |
| GET | `/timeline?sermonIds=` | JWT | — | Laad tijdlijngegevens voor preken |
| GET | `/lookup?videoType=&videoData=` | Openbaar | — | Zoek predikantmetagegevens op vanuit YouTube of Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Genereer AI-suggesties voor social media berichten vanuit preekondertitels |
| GET | `/outline?url=&title=&author=` | JWT | — | Genereer AI-lesoverzicht uit URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Importeer video's vanuit een YouTube-kanaal |
| GET | `/vimeoImport/:channelId` | JWT | — | Importeer video's vanuit een Vimeo-kanaal |
| GET | `/:id` | JWT | — | Haal preek op ID |
| GET | `/` | JWT | — | Lijst alle preken |
| POST | `/` | JWT | StreamingServices.Edit | Preken maken of bijwerken (batch, ondersteunt base64 miniatuuropload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Een preek verwijderen |

### Voorbeeld: YouTube-preek opzoeken

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

## Afspeellijsten

Basispad: `/content/playlists`

Breidt standaard CRUD uit (GET `/:id`, GET `/`, DELETE `/:id` van basisklasse met StreamingServices.Edit toestemming voor schrijfbewerkingen).

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal afspeellijst op ID |
| GET | `/` | JWT | — | Lijst alle afspeellijsten |
| GET | `/public/:churchId` | Openbaar | — | Lijst alle openbare afspeellijsten voor een kerk |
| POST | `/` | JWT | StreamingServices.Edit | Afspeellijsten maken of bijwerken (batch, ondersteunt base64 miniatuuropload) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Een afspeellijst verwijderen |

## Streaming-services

Basispad: `/content/streamingServices`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Haal versleutelde host chatkamarID voor een service |
| GET | `/` | JWT | — | Lijst alle streaming-services. Schoon automatisch verouderde niet-terugkerende services op en vervorder terugkerende |
| POST | `/` | JWT | StreamingServices.Edit | Streaming-services maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Een streaming-service verwijderen (wist ook geblokkeerde IP's) |

## Evenementen

Basispad: `/content/events`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Laad tijdlijn evenementen voor een groep |
| GET | `/timeline?eventIds=` | JWT | — | Laad tijdlijn evenementen voor de groepen van de huidige gebruiker |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Openbaar | — | Abonneer op evenementen als ICS kalender feed |
| GET | `/group/:groupId` | JWT | — | Haal evenementen voor een groep (inclusief uitzonderingsdata) |
| GET | `/public/group/:churchId/:groupId` | Openbaar | — | Haal openbare evenementen voor een groep |
| GET | `/:id` | JWT | — | Haal evenement op ID |
| POST | `/` | JWT | — | Evenementen maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een evenement verwijderen |

## Evenemenuitzonderingen

Basispad: `/content/eventExceptions`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal evenementuitzondering op ID |
| POST | `/` | JWT | Content.Edit | Evenementuitzonderingen maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een evenementuitzondering verwijderen |

## Samengestelde kalenders

Basispad: `/content/curatedCalendars`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal samengestelde kalender op ID |
| GET | `/` | JWT | — | Lijst alle samengestelde kalenders |
| POST | `/` | JWT | Content.Edit | Samengestelde kalenders maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een samengestelde kalender verwijderen |

## Samengestelde evenementen

Basispad: `/content/curatedEvents`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Haal samengestelde evenementen voor kalender (inclusief evenementdetails en uitzonderingsdata, tenzij `?withoutEvents` is ingesteld) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Openbaar | — | Haal openbare samengestelde evenementen voor kalender |
| GET | `/:id` | JWT | — | Haal samengesteld evenement op ID |
| GET | `/` | JWT | — | Lijst alle samengestelde evenementen |
| POST | `/` | JWT | Content.Edit | Samengestelde evenementen maken of bijwerken. Ondersteunt `eventIds` array om specifieke groepsfeiten toe te voegen |
| DELETE | `/:id` | JWT | Content.Edit | Een samengesteld evenement verwijderen |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Verwijder een specifiek evenement uit samengestelde kalender |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Verwijder alle evenementen voor groep uit samengestelde kalender |

## Bestanden

Basispad: `/content/files`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Haal bestanden per inhoudstype en inhouds-ID |
| GET | `/` | JWT | — | Lijst alle bestanden voor de kerkwebsite |
| GET | `/:id` | JWT | — | Haal bestand op ID |
| POST | `/` | JWT | Content.Edit* | Upload bestanden (base64). *Ook toegestaan als gebruiker lid is van groep matching `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Haal vooraf ondertekende S3 upload URL. *Ook toegestaan voor groepsleden. Max 100MB per inhoudsitem |
| DELETE | `/:id` | JWT | Content.Edit* | Verwijder bestand en verwijder uit opslag. *Ook toegestaan voor groepsleden |

## Galerij

Basispad: `/content/gallery`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/stock/:folder` | Openbaar | — | Lijst stockfoto's in folder |
| GET | `/:folder` | JWT | Content.Edit | Lijst galerijafbeeldingen in folder |
| POST | `/requestUpload` | JWT | Content.Edit | Haal vooraf ondertekende S3 upload URL voor galerijafbeelding |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Verwijder galerijafbeelding |

## Bijbels

Basispad: `/content/bibles`

Alle Bijbeleindpunten zijn openbaar (geen verificatie vereist). Gegevens worden opgehaald uit externe bronnen en lokaal gecached.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/` | Openbaar | — | Lijst alle Bijbelvertalingen (haalt uit bron als cache leeg is) |
| GET | `/stats?startDate=&endDate=` | Openbaar | — | Haal statistieken voor Bijbelzoekopdracht voor datumbereik |
| GET | `/availableTranslations/:source` | Openbaar | — | Lijst beschikbare vertalingen vanuit bron (bijv. api.bible) |
| GET | `/updateTranslations` | Openbaar | — | Synchroniseer alle vertalingen vanuit alle bronnen |
| GET | `/updateTranslations/:source` | Openbaar | — | Synchroniseer vertalingen vanuit specifieke bron |
| GET | `/updateCopyrights` | Openbaar | — | Update copyrightinfo voor vertalingen zonder |
| GET | `/:translationKey/updateCopyright` | Openbaar | — | Update copyright voor specifieke vertaling |
| GET | `/:translationKey/search?query=&limit=` | Openbaar | — | Zoek verzen in vertaling |
| GET | `/:translationKey/books` | Openbaar | — | Haal boeken voor vertaling (lokaal gecached) |
| GET | `/:translationKey/:bookKey/chapters` | Openbaar | — | Haal hoofdstukken voor boek (lokaal gecached) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Openbaar | — | Haal verzen voor hoofdstuk (lokaal gecached) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Openbaar | — | Haal verzentekst voor bereik. Log zoekopdrachten. Sommige vertalingen omzeilen caching voor licentering |

### Voorbeeld: Verzentekst opvragen

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

## Nummers

Basispad: `/content/songs`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/search?q=` | JWT | — | Zoek nummers per zoekopdracht |
| GET | `/:id` | JWT | — | Haal nummer op ID |
| GET | `/` | JWT | Content.Edit | Lijst alle nummers |
| POST | `/` | JWT | Content.Edit | Nummers maken of bijwerken (batch) |
| POST | `/import` | JWT | — | Importeer nummers vanuit FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een nummer verwijderen |

## Nummerdetails

Basispad: `/content/songDetails`

Nummerdetails zijn globaal (niet kerk-bereikt). Deze vertegenwoordigen canonieke nummermetagegevens gedeeld in kerken.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal nummerdetail op ID (globaal) |
| GET | `/` | JWT | — | Lijst nummerdetails voor kerk |
| POST | `/create` | JWT | — | Maak nummerdetail vanuit PraiseCharts-ID (retourneert bestaande als al gemaakt). Haalt automatisch metagegevens vanuit PraiseCharts en MusicBrainz |
| POST | `/` | JWT | — | Nummerdetails maken of bijwerken (batch) |

## Nummerkoppelingen

Basispad: `/content/songDetailLinks`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal nummerdetailkoppeling op ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Haal alle koppelingen voor nummerdetail |
| POST | `/` | JWT | — | Nummerkoppelingen maken of bijwerken (batch). Haalt automatisch MusicBrainz-gegevens op als gekoppeld |
| DELETE | `/:id` | JWT | — | Een nummerkoppeling verwijderen |

## Arrangementen

Basispad: `/content/arrangements`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/:id` | JWT | — | Haal arrangement op ID |
| GET | `/song/:songId` | JWT | Content.Edit | Haal arrangementen voor nummer |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Haal arrangementen voor nummerdetail |
| GET | `/` | JWT | Content.Edit | Lijst alle arrangementen |
| POST | `/` | JWT | Content.Edit | Arrangementen maken of bijwerken (batch) |
| POST | `/freeShow/missing` | JWT | — | Zoek FreeShow-ID's die niet in kerk voorkomen. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Verwijder arrangement (verwijdert ook sleutels; verwijdert nummer als geen arrangementen overblijven) |

## Arrangementsleuten

Basispad: `/content/arrangementKeys`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/presenter/:churchId/:id` | Openbaar | — | Haal arrangementsleute met volledige nummergegevens voor presentator-weergave |
| GET | `/:id` | JWT | — | Haal arrangementsleute op ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Haal sleutels voor arrangement |
| GET | `/` | JWT | Content.Edit | Lijst alle arrangementsleuten |
| POST | `/` | JWT | Content.Edit | Arrangementsleuten maken of bijwerken (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Een arrangementsleute verwijderen |

## Instellingen

Basispad: `/content/settings`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/my` | JWT | — | Haal huidige gebruikersinstellingen |
| GET | `/` | JWT | Settings.Edit | Haal alle instellingen voor kerk |
| GET | `/public/:churchId` | Openbaar | — | Haal openbare instellingen voor kerk (geretourneerd als sleutelwaardeparen) |
| POST | `/my` | JWT | — | Sla gebruikersinstellingen op (ondersteunt base64 afbeeldingopload) |
| POST | `/` | JWT | Settings.Edit | Sla kerkinstellingen op (ondersteunt base64 afbeeldingopload) |
| DELETE | `/my/:id` | JWT | — | Verwijder gebruikersinstelling |

## Voorbeeld

Basispad: `/content/preview`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/data/:key` | Openbaar | — | Laad streaming preview gegevens voor kerk per subdomain sleutel (tabbladen, koppelingen, services, preken) |

## Galerij (Stockfoto's)

Basispad: `/content/stock`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| POST | `/search` | Openbaar | — | Zoek Pexels-stockfoto's. Body: `{ term: "church" }` |

## PraiseCharts

Basispad: `/content/praiseCharts`

Integratie met PraiseCharts voor aanbiddingsliedontwikkeling en bladmuziek-downloads.

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| GET | `/raw/:id` | JWT | — | Haal ruwe PraiseCharts-gegevens voor nummer |
| GET | `/hasAccount` | JWT | — | Controleer of gebruiker gekoppelde PraiseCharts-account heeft |
| GET | `/search?q=` | JWT | — | Zoek PraiseCharts-catalogus |
| GET | `/products/:id?keys=` | JWT | — | Haal producten voor nummer (uit bibliotheek als geverifieerd, anders catalogus) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Haal ruwe arrangementsgegevens uit bibliotheek |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Download bestand vanuit PraiseCharts (PDF of ZIP). Retourneert `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Openbaar | — | Haal OAuth autorisatie URL voor PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Wissel OAuth-verifier voor toegangstoken en sla op in gebruikersinstellingen |
| GET | `/library` | JWT | — | Blader gebruiker PraiseCharts bibliotheek |

## Ondersteuning

Basispad: `/content/support`

| Methode | Pad | Verwijzing | Toestemming | Beschrijving |
|--------|------|-------|-------------|-------------|
| POST | `/createAudio` | Openbaar | — | Converteer SSML naar MP3 audio met AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Gerelateerde pagina's

- [Lidmaatschap Eindpunten](./membership) -- Mensen, kerken, groepen, rollen, toestemmingen
- [Aanwezigheid Eindpunten](./attendance) -- Service en bezoek tracering
- [Verificatie & Toestemmingen](./authentication) -- Inlogflow, JWT, toestemmingsmodel
- [Modulestructuur](../module-structure) -- Codeorganisatiepatronen
