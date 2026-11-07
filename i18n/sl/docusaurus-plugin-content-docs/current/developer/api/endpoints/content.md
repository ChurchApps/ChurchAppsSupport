---
title: "Končne točke vsebine"
---

# Končne točke vsebine

<div class="article-intro">

Modul Vsebina upravlja strani spletnega mesta, odseke, elemente, bloke, objave na blogu, preusmeritve, pridige, sezname predvajanja, pretočne storitve, dogodke, kuriran koledar, datoteke, galerije, prevode Biblije in iskanje verzov, pesmi, aranžmaje, globalne sloge, stock fotografije in nastavitve. Je največji modul v API-ju in poganja CMS, predstavnost/pretakanje, načrtovanje bogoslužja in funkcije Biblije v vseh aplikacijah ChurchApps.

</div>

**Osnovna pot:** `/content`

## Strani

Osnovna pot: `/content/pages`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:churchId/tree?url=&id=` | Javno | — | Naloži celotno drevo strani (odseki, elementi, bloki) po URL-ju ali ID-ju. Pri pridobivanju po URL-ju odstrani notranje ID-je. Pri pridobivanju po URL-ju se upošteva `pages.visibility` — zaščitena stran vrne `{ restricted: true, visibility }`, razen če (neobvezni) JWT izpolnjuje pogoj |
| GET | `/public/:churchId` | Javno | — | Seznam javnih strani (`url`, `title`, `metaDescription`); samo `visibility = everyone` |
| GET | `/:id` | JWT | — | Pridobi stran po ID-ju |
| GET | `/` | JWT | — | Seznam vseh strani cerkve |
| POST | `/duplicate/:id` | JWT | Content.Edit | Podvoji stran z vsemi odseki in elementi |
| POST | `/temp/ai` | JWT | Content.Edit | Shrani stran, ustvarjeno z UI (stran, odseki in elementi v enem klicu) |
| POST | `/importTree` | JWT | Content.Edit | Ustvari stran iz gnezdenega drevesa (`title`, `url`, `sections[].elements[]…`). Vedno vstavi pod cerkev pošiljatelja; ID-ji v telesu zahtevka se prezrejo. Vrstice morajo vključevati svoje podrejene `column` elemente. Največ 30 odsekov / 500 elementov |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi strani (paketno) |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši stran |

### Primer: nalaganje drevesa strani

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

## Odseki

Osnovna pot: `/content/sections`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi odsek po ID-ju |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Podvoji odsek ali ga pretvori v ponovno uporabni blok |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi odseke (paketno). Samodejno posodobi vrstni red razvrščanja |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši odsek (samodejno posodobi vrstni red razvrščanja) |

## Elementi

Osnovna pot: `/content/elements`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi element po ID-ju |
| POST | `/duplicate/:id` | JWT | Content.Edit | Podvoji element z vsemi podrejenimi elementi |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi elemente (paketno). Samodejno upravlja stolpce vrstic in diapozitive vrtiljaka |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši element |

## Bloki

Osnovna pot: `/content/blocks`

Podeduje standardni CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` iz osnovnega razreda) z dovoljenjem Content.Edit za pisanje.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi blok po ID-ju |
| GET | `/` | JWT | — | Seznam vseh blokov |
| GET | `/:churchId/tree/:id` | Javno | — | Naloži celotno drevo bloka z odseki in elementi |
| GET | `/blockType/:blockType` | JWT | — | Naloži bloke po vrsti (npr. footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Javno | — | Naloži drevo bloka noge strani za cerkev |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi bloke |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši blok |

## Povezave

Osnovna pot: `/content/links`

Podeduje standardni CRUD (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` iz osnovnega razreda) z dovoljenjem Content.Edit za pisanje.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi povezavo po ID-ju |
| GET | `/` | JWT | — | Seznam vseh povezav. Neobvezen filter `?category=`. Po shranjevanju se samodejno razvrsti |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Naloži povezave, filtrirane po vidnosti (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Javno | — | Naloži povezave cerkve po kategoriji (javno) |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi povezave (paketno). Samodejno razvrsti po kategoriji |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši povezavo |

## Globalni slogi

Osnovna pot: `/content/globalStyles`

Podeduje standardni CRUD (POST `/`, DELETE `/:id` iz osnovnega razreda) z dovoljenjem Content.Edit za pisanje.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/church/:churchId` | Javno | — | Naloži globalne sloge za cerkev (če niso nastavljeni, vrne privzete) |
| GET | `/` | JWT | — | Naloži globalne sloge za avtenticirano cerkev |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi globalne sloge |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši globalne sloge |

## Zgodovina strani

Osnovna pot: `/content/pageHistory`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/page/:pageId` | JWT | Content.Edit | Seznam vnosov zgodovine za stran |
| GET | `/block/:blockId` | JWT | Content.Edit | Seznam vnosov zgodovine za blok |
| GET | `/:id` | JWT | Content.Edit | Pridobi vnos zgodovine po ID-ju |
| POST | `/` | JWT | Content.Edit | Shrani posnetek strani/bloka. Občasno počisti vnose, starejše od 30 dni |
| POST | `/restore/:id` | JWT | Content.Edit | Obnovi stran/blok iz posnetka zgodovine (izbriše trenutno vsebino in jo ustvari znova iz posnetka) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Obnovi iz vgrajenega objekta posnetka. Telo: `{ pageId, blockId, snapshot }` |

## Objave (blog)

Osnovna pot: `/content/posts`

Blog objave so samostojne vrstice: `title`, `slug` (edinstven za cerkev), `excerpt`, `content` (telo v Markdownu), `authorId`, `photoUrl`, `publishDate`, `category` in `tags`. Objava je objavljena, ko je nastavljen `publishDate` in je v preteklosti. Bralne končne točke vsaki objavi dodajo `authorName`, razrešen iz `authorId`. Glej [Arhitektura gradnika spletnega mesta](../../architecture/website-builder#blog).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Javno | — | Seznam objavljenih objav po straneh (največ 50 na stran) |
| GET | `/public/:churchId/categories` | Javno | — | Različne kategorije med objavljenimi objavami |
| GET | `/public/:churchId/slug/:slug` | Javno | — | Pridobi objavljeno objavo po slugu |
| GET | `/rss/:churchId?siteUrl=` | Javno | — | RSS 2.0 vir objavljenih objav (povezave so sestavljene kot `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Pridobi objavo po ID-ju |
| GET | `/` | JWT | — | Seznam vseh objav cerkve |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi objave (paketno) |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši objavo |

## Preusmeritve

Osnovna pot: `/content/redirects`

Preusmeritve URL-jev za posamezno cerkev (`fromPath` → `toPath`), omejene na 200 na cerkev. Poti so normalizirane (male črke, vodilna poševnica, brez končne poševnice), `fromPath` pa je edinstven za cerkev. B1App jih razreši ob morebitnih napakah 404 in izda HTTP 308.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/public/:churchId?path=` | Javno | — | Razreši pot (ali izpiše vse preusmeritve, če `path` ni podan) |
| GET | `/:id` | JWT | — | Pridobi preusmeritev po ID-ju |
| GET | `/` | JWT | — | Seznam vseh preusmeritev cerkve |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi preusmeritve. Zavrne `fromPath = toPath` in uveljavi omejitev 200 vrstic |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši preusmeritev |

## Pridige

Osnovna pot: `/content/sermons`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/public/freeshowSample` | JWT | — | Pridobi vzorčno strukturo seznama predvajanja FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Pridobi ovoj aplikacije za TV z viri pridig, lekcij in FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Javno | — | Pridobi eno pridigo kot seznam predvajanja za TV vir |
| GET | `/public/tvFeed/:churchId` | Javno | — | Pridobi vse javne sezname predvajanja/pridige kot TV vir |
| GET | `/public/:churchId` | Javno | — | Seznam vseh javnih pridig za cerkev |
| GET | `/timeline?sermonIds=` | JWT | — | Naloži podatke časovnice za pridige |
| GET | `/lookup?videoType=&videoData=` | Javno | — | Poišči metapodatke pridige iz YouTubea ali Vimea |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Ustvari predloge objav za družbena omrežja z UI iz podnapisov pridige |
| GET | `/outline?url=&title=&author=` | JWT | — | Ustvari oris lekcije z UI iz URL-ja |
| GET | `/youtubeImport/:channelId` | JWT | — | Uvozi videoposnetke iz kanala YouTube. HTML entitete, ki jih YouTube-ov iskalni API vstavi v naslove in opise (npr. `&amp;` in `&#39;`), se dekodirajo |
| GET | `/vimeoImport/:channelId` | JWT | — | Uvozi videoposnetke iz kanala Vimeo |
| GET | `/:id` | JWT | — | Pridobi pridigo po ID-ju |
| GET | `/` | JWT | — | Seznam vseh pridig |
| POST | `/` | JWT | StreamingServices.Edit | Ustvari ali posodobi pridige. Sprejme polje ali posamezen objekt pridige (vedno vrne polje); prazno telo vrne 400. Podpira nalaganje sličice v base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Izbriši pridigo |

### Primer: iskanje pridige na YouTubeu

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

## Seznami predvajanja

Osnovna pot: `/content/playlists`

Podeduje standardni CRUD (GET `/:id`, GET `/`, DELETE `/:id` iz osnovnega razreda) z dovoljenjem StreamingServices.Edit za pisanje.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi seznam predvajanja po ID-ju |
| GET | `/` | JWT | — | Seznam vseh seznamov predvajanja |
| GET | `/public/:churchId` | Javno | — | Seznam vseh javnih seznamov predvajanja za cerkev |
| POST | `/` | JWT | StreamingServices.Edit | Ustvari ali posodobi sezname predvajanja (paketno, podpira nalaganje sličice v base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Izbriši seznam predvajanja |

## Pretočne storitve

Osnovna pot: `/content/streamingServices`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Pridobi šifrirani ID klepetalnice gostitelja za storitev |
| GET | `/` | JWT | — | Seznam vseh pretočnih storitev. Samodejno počisti pretekle nerekurentne storitve in premakne rekurentne naprej |
| POST | `/` | JWT | StreamingServices.Edit | Ustvari ali posodobi pretočne storitve (paketno) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Izbriši pretočno storitev (počisti tudi blokirane IP-naslove) |

## Dogodki

Osnovna pot: `/content/events`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Naloži dogodke časovnice za skupino (vključuje datume izjem, da se izbrisane ponovitve lahko preskočijo) |
| GET | `/timeline?eventIds=` | JWT | — | Naloži dogodke časovnice za skupine trenutnega uporabnika (vključuje datume izjem) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Javno | — | Naročite se na dogodke kot vir koledarja ICS |
| GET | `/group/:groupId` | JWT | — | Pridobi dogodke za skupino (vključuje datume izjem) |
| GET | `/public/group/:churchId/:groupId` | Javno | — | Pridobi javne dogodke za skupino |
| GET | `/public/:churchId/:id` | Javno | — | Pridobi en dogodek za njegovo javno stran, z `roomNames` (prostori iz rezervacij, ki niso zavrnjene). Za dogodke na čakanju ali zavrnjene dogodke in za zasebne dogodke, ki ne sprejemajo prijav, vrne `null` |
| GET | `/public/:churchId/:id/ical` | Javno | — | Prenesite ta dogodek kot datoteko `.ics` (`text/calendar`, datumi izjem so upoštevani). `404`, če je dogodek skrit po enakih pravilih |
| GET | `/:id` | JWT | — | Pridobi dogodek po ID-ju |
| POST | `/` | JWT | — | Ustvari ali posodobi dogodke (paketno) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ali vodja skupine | Izbriši dogodek in njegove rezervacije. Vodje skupine dogodka ga lahko izbrišejo, prosilec pa lahko umakne svojo zahtevo na čakanju |

Zapisi dogodkov vključujejo `photoUrl` (fotografijo dogodka v razmerju 16:9, prikazano na javni strani dogodka in v ploščicah prihajajočih dogodkov), `tags` (ločene z vejicami, uporablja jih filter oznak v elementu koledarja na spletnem mestu) in `notesViewRole` / `notesPostRole` (`staff`, če je `null`, `leaders` ali `members`), ki nadzirata pogovor `eventNote` dogodka — glej [Nadzor dostopa do zapiskov skupine in dogodka](./messaging.md#group-and-event-notes-access-control). Javni odzivi kuriranih dogodkov prav tako vsebujejo `photoUrl` in `tags` vsakega dogodka.

## Izjeme dogodkov

Osnovna pot: `/content/eventExceptions`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi izjemo dogodka po ID-ju |
| POST | `/` | JWT | Content.Edit, Calendars.Admin ali vodja skupine | Ustvari ali posodobi izjeme dogodkov (paketno). Vodje lahko dodajajo izjeme samo za dogodke v skupinah, ki jih vodijo |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin ali vodja skupine | Izbriši izjemo dogodka |

## Kuriran koledar

Osnovna pot: `/content/curatedCalendars`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi kuriran koledar po ID-ju |
| GET | `/` | JWT | — | Seznam vseh kuriranih koledarjev |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi kuriran koledar (paketno) |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši kuriran koledar |

## Kurirani dogodki

Osnovna pot: `/content/curatedEvents`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Pridobi kurirane dogodke za koledar (vključuje podrobnosti dogodkov in datume izjem, razen če je nastavljen `?withoutEvents`) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Javno | — | Pridobi javne kurirane dogodke za koledar |
| GET | `/:id` | JWT | — | Pridobi kuriran dogodek po ID-ju |
| GET | `/` | JWT | — | Seznam vseh kuriranih dogodkov |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi kurirane dogodke. Podpira polje `eventIds` za dodajanje določenih dogodkov skupine |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši kuriran dogodek |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Odstrani določen dogodek iz kuriranega koledarja |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Odstrani vse dogodke skupine iz kuriranega koledarja |

## Datoteke

Osnovna pot: `/content/files`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:contentType/:contentId` | JWT | — | Pridobi datoteke po vrsti vsebine in ID-ju vsebine |
| GET | `/` | JWT | — | Seznam vseh datotek za spletno mesto cerkve |
| GET | `/:id` | JWT | — | Pridobi datoteko po ID-ju |
| POST | `/` | JWT | Content.Edit* | Naloži datoteke (base64). *Dovoljeno tudi, če je uporabnik član skupine, ki ustreza `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Pridobi vnaprej podpisan URL za nalaganje v S3. *Dovoljeno tudi za člane skupine. Največ 100 MB na element vsebine |
| DELETE | `/:id` | JWT | Content.Edit* | Izbriši datoteko in jo odstrani iz shrambe. *Dovoljeno tudi za člane skupine |

## Galerija

Osnovna pot: `/content/gallery`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/stock/:folder` | Javno | — | Seznam stock fotografij v mapi |
| GET | `/:folder` | JWT | Content.Edit | Seznam slik v galeriji v mapi |
| POST | `/requestUpload` | JWT | Content.Edit | Pridobi vnaprej podpisan URL za nalaganje v S3 za sliko v galeriji |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Izbriši sliko v galeriji |

## Biblije

Osnovna pot: `/content/bibles`

Vse končne točke za Biblijo so javne (avtentikacija ni potrebna). Podatki se pridobijo iz zunanjih virov in shranijo v lokalni predpomnilnik. Zahteve do api.bible potečejo po 15 sekundah; časovna omejitev vrne **504**.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | Javno | — | Seznam vseh prevodov Biblije (če je predpomnilnik prazen, jih pridobi z vira) |
| GET | `/stats?startDate=&endDate=` | Javno | — | Pridobi statistiko iskanj v Bibliji za obdobje |
| GET | `/availableTranslations/:source` | Javno | — | Seznam razpoložljivih prevodov iz vira (npr. api.bible) |
| GET | `/updateTranslations` | Javno | — | Sinhroniziraj vse prevode iz vseh virov |
| GET | `/updateTranslations/:source` | Javno | — | Sinhroniziraj prevode iz določenega vira |
| GET | `/updateCopyrights` | Javno | — | Posodobi podatke o avtorskih pravicah za prevode, ki jih nimajo |
| GET | `/:translationKey/updateCopyright` | Javno | — | Posodobi avtorske pravice za določen prevod |
| GET | `/:translationKey/search?query=&limit=` | Javno | — | Išči verze v prevodu |
| GET | `/:translationKey/books` | Javno | — | Pridobi knjige za prevod (shrani v lokalni predpomnilnik) |
| GET | `/:translationKey/:bookKey/chapters` | Javno | — | Pridobi poglavja za knjigo (shrani v lokalni predpomnilnik) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Javno | — | Pridobi verze za poglavje (shrani v lokalni predpomnilnik) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Javno | — | Pridobi besedilo verzov za obseg. Beleži iskanja. Nekateri prevodi zaradi licenciranja obidejo predpomnjenje |

### Primer: pridobivanje besedila verza

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

## Pesmi

Osnovna pot: `/content/songs`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/search?q=` | JWT | — | Išči pesmi po poizvedbi |
| GET | `/:id` | JWT | — | Pridobi pesem po ID-ju |
| GET | `/` | JWT | Content.Edit | Seznam vseh pesmi |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi pesmi (paketno) |
| POST | `/import` | JWT | — | Uvozi pesmi iz FreeShow (paketno) |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši pesem |

## Podrobnosti pesmi

Osnovna pot: `/content/songDetails`

Podrobnosti pesmi so globalne (niso vezane na cerkev). Predstavljajo kanonične metapodatke o pesmih, ki si jih delijo cerkve.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi podrobnosti pesmi po ID-ju (globalno) |
| GET | `/` | JWT | — | Seznam podrobnosti pesmi za cerkev |
| POST | `/create` | JWT | — | Ustvari podrobnosti pesmi iz ID-ja PraiseCharts (vrne obstoječe, če so že ustvarjene). Samodejno pridobi metapodatke iz PraiseCharts in MusicBrainz |
| POST | `/` | JWT | — | Ustvari ali posodobi podrobnosti pesmi (paketno) |

## Povezave podrobnosti pesmi

Osnovna pot: `/content/songDetailLinks`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi povezavo podrobnosti pesmi po ID-ju |
| GET | `/songDetail/:songDetailId` | JWT | — | Pridobi vse povezave za podrobnosti pesmi |
| POST | `/` | JWT | — | Ustvari ali posodobi povezave podrobnosti pesmi (paketno). Če je povezava nastavljena, samodejno pridobi podatke iz MusicBrainz |
| DELETE | `/:id` | JWT | — | Izbriši povezavo podrobnosti pesmi |

## Aranžmaji

Osnovna pot: `/content/arrangements`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Pridobi aranžma po ID-ju |
| GET | `/song/:songId` | JWT | Content.Edit | Pridobi aranžmaje za pesem |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Pridobi aranžmaje za podrobnosti pesmi |
| GET | `/` | JWT | Content.Edit | Seznam vseh aranžmajev |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi aranžmaje (paketno) |
| POST | `/freeShow/missing` | JWT | — | Poišči ID-je FreeShow, ki ne obstajajo v cerkvi. Telo: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši aranžma (izbriše tudi tonalitete; izbriše pesem, če ne ostanejo nobeni aranžmaji) |

## Tonaliteti aranžmajev

Osnovna pot: `/content/arrangementKeys`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:id` | Javno | — | Pridobi tonaliteto aranžmaja s celotnimi podatki o pesmi za pogled predstavitve |
| GET | `/:id` | JWT | — | Pridobi tonaliteto aranžmaja po ID-ju |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Pridobi tonalitete za aranžma |
| GET | `/` | JWT | Content.Edit | Seznam vseh tonalitet aranžmajev |
| POST | `/` | JWT | Content.Edit | Ustvari ali posodobi tonalitete aranžmajev (paketno) |
| DELETE | `/:id` | JWT | Content.Edit | Izbriši tonaliteto aranžmaja |

## Nastavitve

Osnovna pot: `/content/settings`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Pridobi nastavitve trenutnega uporabnika |
| GET | `/` | JWT | Settings.Edit | Pridobi vse nastavitve cerkve |
| GET | `/public/:churchId` | Javno | — | Pridobi javne nastavitve cerkve (vrnjene kot pari ključ–vrednost) |
| POST | `/my` | JWT | — | Shrani nastavitve na ravni uporabnika (podpira nalaganje slik v base64) |
| POST | `/` | JWT | Settings.Edit | Shrani nastavitve na ravni cerkve (podpira nalaganje slik v base64) |
| DELETE | `/my/:id` | JWT | — | Izbriši nastavitev uporabnika |

## Predogled

Osnovna pot: `/content/preview`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/data/:key` | Javno | — | Naloži podatke predogleda pretoka za cerkev po ključu poddomene (zavihki, povezave, storitve, pridige) |

## Galerija (stock fotografije)

Osnovna pot: `/content/stock`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/search` | Javno | — | Išči stock fotografije v Pexelsu. Telo: `{ term: "church" }` |

## PraiseCharts

Osnovna pot: `/content/praiseCharts`

Integracija s PraiseCharts za odkrivanje bogoslužnih pesmi in prenose notnih zapisov.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/raw/:id` | JWT | — | Pridobi surove podatke PraiseCharts za pesem |
| GET | `/hasAccount` | JWT | — | Preveri, ali ima uporabnik povezan račun PraiseCharts |
| GET | `/search?q=` | JWT | — | Išči v katalogu PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Pridobi izdelke za pesem (iz knjižnice, če je uporabnik prijavljen, sicer iz kataloga) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Pridobi surove podatke aranžmaja iz knjižnice |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Prenesi datoteko iz PraiseCharts (PDF ali ZIP). Vrne `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Javno | — | Pridobi URL za avtorizacijo OAuth za PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Zamenjaj preverjevalnik OAuth za dostopni žeton in ga shrani v nastavitve uporabnika |
| GET | `/library` | JWT | — | Prebrskaj knjižnico PraiseCharts uporabnika |

## Podpora

Osnovna pot: `/content/support`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/createAudio` | Javno | — | Pretvori SSML v zvok MP3 z AWS Polly. Telo: `{ ssml: "<speak>...</speak>" }` |

## Sorodne strani

- [Arhitektura gradnika spletnega mesta](../../architecture/website-builder) -- Kako se strani, odseki, elementi, objave in preusmeritve povezujejo med aplikacijami
- [Končne točke članstva](./membership) -- Osebe, cerkve, skupine, vloge, dovoljenja
- [Končne točke obiskov](./attendance) -- Sledenje storitvam in obiskom
- [Avtentikacija in dovoljenja](./authentication) -- Potek prijave, JWT, model dovoljenj
- [Struktura modula](../module-structure) -- Vzorci organizacije kode
