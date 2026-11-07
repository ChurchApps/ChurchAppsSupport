---
title: "Viestinnän päätepisteet"
---

# Viestinnän päätepisteet

<div class="article-intro">

Viestintämoduuli hallinnoi reaaliaikaisia keskusteluja, chat-viestejä, push-ilmoituksia, SMS- ja sähköpostitoimituksia, WebSocket-yhteyksiä, yksityisviestejä, laitteiden rekisteröintiä ja tekstiviestipalveluntarjoajia. Se tarjoaa viestintäkerroksen, jota kaikki ChurchApps-sovellukset käyttävät sekä suoratoiston chatissa että asynkronisissa ilmoituksissa.

</div>

**Peruspolku:** `/messaging`

## Keskustelut

Peruspolku: `/messaging/conversations`

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Lataa keskustelut pilkulla erotettujen tunnisteiden perusteella ensimmäisine ja viimeisine viesteineen |
| GET | `/messages/:contentType/:contentId` | JWT | — | Lataa sisällön keskustelut sivutetuin viestein (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hae nykyisen käyttäjän ryhmien julkaisutyyppiset keskustelut |
| GET | `/posts/group/:groupId` | JWT | — | Hae tietyn ryhmän julkaisutyyppiset keskustelut |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Uusimmat muistiinpanot kaikista tietueista B1 Adminin Muistiinpanot-sivulle. `section` on `people`, `groups`, `events` tai `workflows` (muuten 400); `limit` on oletuksena 25 (enintään 100); `before` on edellisen sivun kursori. Jokaiseen muistiinpanoon sovelletaan oman tyyppinsä sääntöä (People Edit / luottamukselliset muistiinpanot -oikeus, ryhmän johtajat, tapahtuman katselijat, työnkulkukortin katselijat), joten kutsujat näkevät vain ne muistiinpanot, jotka he voisivat avata. Muistiinpanon teksti katkaistaan 300 merkkiin |
| GET | `/current/:churchId/:contentType/:contentId` | Julkinen | — | Hae tai luo sisällön nykyinen keskustelu (purkaa contentId:n automaattisesti) |
| GET | `/:churchId/:contentType/:contentId` | Julkinen | — | Lataa keskustelut sisällötyypin ja tunnisteen perusteella |
| GET | `/:churchId/:id` | Julkinen | — | Lataa yksittäinen keskustelu tunnisteen perusteella |
| POST | `/` | JWT | — | Luo tai päivitä keskusteluja (erä) |
| POST | `/start` | JWT | — | Aloita uusi keskustelu alkukommentilla |
| DELETE | `/:churchId/:id` | JWT | — | Poista keskustelu |

### Henkilömuistiinpanojen käyttöoikeudet

Keskustelut, joiden `contentType` on `"person"` (henkilötietueen Muistiinpanot-välilehti) tai `"personConfidential"` (Luottamukselliset muistiinpanot -osio), ovat rajoitettuja kaikilla luku- ja kirjoituspoluilla, myös yllä olevilla julkisilla reiteillä, jotka palauttavat näille sisällöille `401`-vastauksen. `person` vaatii MembershipApi-oikeuden **People / Edit**, ja `personConfidential` vaatii oikeuden **People / View Confidential Notes**. Rajatuille API-avaimille `people:write` kattaa molemmat toiminnot (avaimen käyttäjällä on oltava myös vastaava roolioikeus).

### Ryhmä- ja tapahtumamuistiinpanojen käyttöoikeudet {#group-and-event-notes-access-control}

Kaksi muuta muistiinpanotyyppiä on rajoitettu samalla tavalla kaikilla luku- ja kirjoituspoluilla (myös yllä olevilla julkisilla reiteillä), eikä niihin koskaan voi kirjoittaa anonyymisti:

- **`groupNote`** (`contentId` = ryhmän tunniste) -- ryhmän **Johtajien muistiinpanot** -syöte. Vain kyseisen ryhmän johtajat (`leaderGroupIds` JWT:ssä) voivat lukea tai kirjoittaa. Mikään henkilöstöoikeus ei anna pääsyä, mukaan lukien `content.edit` ja ryhmäjäsenyyden oikeudet.
- **`eventNote`** (`contentId` = tapahtuman tunniste) -- kalenteritapahtuman muistiinpanot. Henkilöstö, jolla on `content.edit` tai **Calendars / Admin**, voi aina lukea ja kirjoittaa. Muuten pääsy noudattaa tapahtuman `notesViewRole`-kenttää (luku) ja `notesPostRole`-kenttää (kirjoitus): `staff` (oletus, käytetään kun kenttä on `null`) ei salli muille mitään, `leaders` sallii tapahtuman ryhmän johtajille ja `members` sallii tapahtuman ryhmän jäsenille ja johtajille. Tapahtuma ilman `groupId`-kenttää on vain henkilöstön käytettävissä.

### Työnkulkukortin muistiinpanojen käyttöoikeudet

Keskustelut, joiden `contentType` on `"workflowCard"` (työnkulkukortin muistiinpanot, missä `contentId` on kortin tehtävätunniste), ovat luettavissa ja muokattavissa vain henkilöltä, joka voi avata kortin. Tällainen henkilö on käyttäjä, jolla on DoingApi-oikeus **Tasks / View**, tai henkilö tai ryhmä, jolle kortti on osoitettu, jonka kortin on luonut tai jota kortti koskee. Muut saavat `401`-vastauksen kaikilla lukupoluilla, myös yllä olevilla julkisilla reiteillä. Kortin keskustelu liitetään itse kortin kautta reitillä `POST /doing/tasks/:id/conversation` (runko `{ "conversationId": "..." }`; ensimmäinen liitetty keskustelu jää voimaan). Kortin muokkaajat ja sen vastuuhenkilö voivat kutsua tätä reittiä.

### Esimerkki: Aloita keskustelu

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Viestit

Peruspolku: `/messaging/messages`

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Lataa kaikki keskustelun viestit |
| GET | `/catchup/:churchId/:conversationId` | Julkinen | — | Lataa kaikki keskustelun viestit (julkinen catchup live-chatille) |
| GET | `/:churchId/:id` | Julkinen | — | Lataa yksittäinen viesti tunnisteen perusteella |
| POST | `/` | JWT | — | Tallenna viestejä (erä). Lähettää reaaliaikaisia päivityksiä ja käynnistää ilmoitukset. Olemassa olevan viestin muokkaaminen edellyttää, että on viestin kirjoittaja tai sillä on `content.edit`-oikeus; tallennettua kirjoittajaa ei voi koskaan vaihtaa |
| POST | `/send` | Julkinen | — | Lähetä viestejä (erä, julkinen). Lähettää reaaliaikaisia päivityksiä WebSocketin kautta ja käynnistää ilmoitukset |
| POST | `/setCallout` | JWT | — | (vanha) Lähetä huomiokehotusviesti reaaliaikaisesti. Ei aktiivista asiakasta; suoratoiston chat ei enää näytä huomiokehotuksia |
| DELETE | `/:churchId/:id` | JWT | — | Poista viesti ja lähetä poisto reaaliaikaisesti. Katso [Viestien moderointi](#message-moderation) |

### Viestien moderointi

Viestin poistaminen on sallittu seuraaville:

- viestin kirjoittajalle;
- henkilöstölle, jolla on `content.edit` (koko seurakunnassa);
- **ryhmän johtajille** keskusteluissa, joiden `contentType` on `group` tai `groupAnnouncement` ja joiden `contentId` on ryhmä, jota he johtavat (`leaderGroupIds` JWT:ssä).

Henkilömuistiinpanojen keskusteluja (`person` / `personConfidential`) ei moderoida johtajien toimesta. Niissä käytetään muistiinpanojen oikeuksia (`people.edit`, `people.viewConfidentialNotes`).

Johtajilla on oikeus vain poistaa, ei muokata. Toisen jäsenen viestin kirjoittaminen uudelleen on edelleen rajattu kirjoittajalle ja `content.edit`-oikeuden omaavalle henkilöstölle.

### Esimerkki: Lähetä viesti

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Yksityisviestit

Peruspolku: `/messaging/privatemessages`

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lataa kaikki nykyisen käyttäjän yksityisviestit (sisältää keskustelukohtaisen viimeisimmän viestin ja merkitsee kaikki luetuiksi) |
| GET | `/existing/:personId` | JWT | — | Etsi olemassa oleva yksityiskeskustelu tietyn henkilön kanssa |
| GET | `/:id` | JWT | — | Lataa yksityisviesti tunnisteen perusteella (tyhjentää ilmoituksen, jos viesti on osoitettu nykyiselle käyttäjälle) |
| POST | `/` | JWT | — | Lähetä yksityisviestejä (erä). Laukaisee push-ilmoituksen vastaanottajalle |

## Ilmoitukset

Peruspolku: `/messaging/notifications`

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Hae nykyisen käyttäjän lukemattomien ilmoitusten määrä |
| GET | `/my` | JWT | — | Lataa kaikki nykyisen käyttäjän ilmoitukset (merkitsee kaikki luetuiksi) |
| GET | `/tmpEmail` | Julkinen | — | Käynnistä päivittäinen sähköpostiilmoitusyhteenveto (vianetsintä-/cron-päätepiste) |
| GET | `/:churchId/person/:personId` | JWT | — | Lataa tietyn henkilön ilmoitukset |
| GET | `/:churchId/:id` | JWT | — | Lataa ilmoitus tunnisteen perusteella |
| POST | `/` | JWT | — | Luo tai päivitä ilmoituksia (erä) |
| POST | `/create` | JWT | — | Luo ilmoituksia useille henkilöille. Runko: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Merkitse kaikki henkilön ilmoitukset luetuiksi |
| POST | `/sendTest` | JWT | — | Lähetä testi-push-ilmoitus. Runko: `{ personId, title }` |
| POST | `/ping` | Julkinen | — | Luo ilmoitus ulkoisesta laukaisijasta. Runko: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Poista ilmoitus |

### Esimerkki: Luo ilmoituksia

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Ilmoitusasetukset

Peruspolku: `/messaging/notificationpreferences`

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Listaa ilmoitusluokat niiden oletus- ja sallituilla kanavilla |
| GET | `/my` | JWT | — | Lataa nykyisen käyttäjän ilmoitusasetukset (luo oletukset automaattisesti, jos niitä ei ole) |
| POST | `/` | JWT | — | Tallenna nykyisen käyttäjän asetukset. Runko: mikä tahansa seuraavista: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, sekä valinnainen `overrides: [{ categoryKey, channel, optedIn }]` (channel voi olla `push`, `email`, `in_app` tai `sms`; lukittuja luokkia ei huomioida). `allowSms` on jäsenen suostumus tekstiviestimuistutuksiin. Vanhan rivitaulukon muotoinen runko hyväksytään edelleen |

## Yhteydet

Peruspolku: `/messaging/connections`

Hallinnoi WebSocket- ja reaaliaikaisia yhteyksiä chatille, ryhmäkeskusteluille, yksityisviesteille ja suoratoistolle. Katso koko protokolla kohdasta [Reaaliaikainen arkkitehtuuri](../../realtime).

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Julkinen | — | Lataa kaikki keskustelun yhteydet |
| POST | `/` | Julkinen | — | Rekisteröi yhteyksiä (erä). Käynnistää osallistumislähetyksen keskustelussa. Kohteet: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Julkinen | — | Päivitä yhteyden näyttönimi socket-tunnisteen perusteella. Runko: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Julkinen | — | Poista yhteys keskustelusta. Käynnistää osallistumislähetyksen |
| POST | `/tmpSendAlert` | Julkinen | — | Lähetä ilmoitushälytys henkilön yhteyksille. Runko: `{ churchId, personId }` |

## Laitteet

Peruspolku: `/messaging/devices`

Hallinnoi laitteiden rekisteröintiä push-ilmoituksia ja sisällön yhdistämistä varten (esim. Lessons-sovellus TV-näytöillä).

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Rekisteröi tai päivitä laite (mobiilin push-rekisteröinti). Vastaa FCM-tunnistetta tai laitteen tunnistetta |
| POST | `/enrollAnon` | Julkinen | — | Rekisteröi anonyymi laite ja luo 4-merkkinen paritauskoodi |
| POST | `/` | Julkinen | — | Tallenna laitteita (erä) |
| GET | `/pair/:pairingCode` | JWT | — | Pari laite paritauskoodin avulla. Valinnainen `?contentType=&contentId=` sisällön määrittämiseen |
| GET | `/status/:deviceId` | Julkinen | — | Tarkista laitteen paritustila |
| GET | `/:churchId` | JWT | — | Lataa seurakunnan kaikki laitteet |
| GET | `/:churchId/person/:personId` | JWT | — | Lataa henkilön kaikki laitteet |
| GET | `/:churchId/:id` | JWT | — | Lataa laite tunnisteen perusteella |
| DELETE | `/:churchId/:id` | JWT | — | Poista laite |

### Esimerkki: Rekisteröi laite

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Laitteen sisällöt

Peruspolku: `/messaging/devicecontents`

Hallinnoi paritettujen laitteiden sisältöjen määrityksiä (esim. mikä oppitunti näkyy TV:llä).

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Lataa laitteen sisältömääritykset |
| POST | `/` | JWT | — | Tallenna laitteen sisältömääritykset (erä) |
| DELETE | `/:id` | JWT | — | Poista laitteen sisältömääritys |

## Tekstiviestit

Peruspolku: `/messaging/texting`

Hallinnoi SMS-palveluntarjoajia, ryhmätekstiviestejä ja toimituksen seurantaa.

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Lataa seurakunnan tekstiviestipalveluntarjoajat (tunnistetiedot on peitetty) |
| GET | `/status` | JWT | — | `{ enabled }` — onko seurakunnalla käytössä oleva tekstiviestipalveluntarjoaja. Kaikki kirjautuneet seurakunnan käyttäjät; käytetään näyttämään **Text**-vaihtoehdot vain, kun viestejä voi lähettää |
| GET | `/inboundUrl` | JWT | `texting.send` tai `settings.edit` | `{ url }` — seurakunnan saapuvan (STOP) webhook-URL-osoite, joka liitetään palveluntarjoajalle |
| POST | `/inbound/:churchId/:token` | Julkinen | — | Palveluntarjoajan saapuvan viestin webhook. `token` on seurakunnan tunnisteen HMAC. Vastaus, joka on täsmälleen yksi lopetussanoista (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), merkitsee kaikki vastaavat henkilöt `optedOut`-tilaan ja kytkee heidän `allowSms`-asetuksensa pois. Palauttaa `{ optedOut: <count> }`; muut vastaukset palauttavat `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Esikatsele ryhmätekstiviestin vastaanottajat (oikeutetut, tilauksen perunut ja ilman puhelinnumeroa olevien määrät) |
| GET | `/sent` | JWT | — | Lataa kaikki seurakunnan lähetetyt tekstiviestitietueet |
| GET | `/sent/:id/details` | JWT | — | Lataa lähetetty tekstiviesti vastaanottajakohtaisine toimituslokeineen |
| POST | `/providers` | JWT | — | Tallenna tekstiviestipalveluntarjoajat (erä). Salaa API-tunnistetiedot |
| POST | `/send` | JWT | — | Lähetä SMS kaikille ryhmän oikeutetuille jäsenille. Runko: `{ groupId, message }`. Yhdistelykentät (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ratkaistaan vastaanottajakohtaisesti |
| POST | `/sendPerson` | JWT | — | Lähetä SMS yhdelle henkilölle. Runko: `{ personId, phoneNumber, message }`. Yhdistelykentät ratkaistaan, ja ratkaistu teksti on se, mikä kirjataan lokiin |
| DELETE | `/providers/:id` | JWT | — | Poista tekstiviestipalveluntarjoaja |

### Esimerkki: Lähetä ryhmätekstiviesti

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Sähköpostipohjat

Peruspolku: `/messaging/emailTemplates`

Hallinnoi uudelleenkäytettäviä sähköpostipohjia ja lähettää pohjapohjaisia sähköposteja ryhmille.

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Lataa seurakunnan kaikki sähköpostipohjat |
| GET | `/:id` | JWT | — | Lataa yksittäinen sähköpostipohja tunnisteen perusteella |
| GET | `/sendStatus` | JWT | `groupMembers.edit` tai `tasks.admin` | Seurakunnan ryhmän sähköpostin tila: `{ approved, paused, remaining, requested }`. B1Adminin Send Email -valintaikkuna ja työnkulun **Send email** -toiminto käyttävät sitä varoittamaan, jos sähköposti ei lähde |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Pyydä tukea hyväksymään seurakunta ryhmän sähköpostille (enintään kerran viikossa seurakuntaa kohden) |
| GET | `/preview/:groupId` | JWT | — | Esikatsele ryhmän sähköpostitoimitusta (oikeutettujen vastaanottajien määrä, jäsenet ilman sähköpostiosoitetta) |
| POST | `/` | JWT | — | Luo tai päivitä sähköpostipohjia (erä) |
| POST | `/send` | JWT | — | Lähetä pohjapohjainen sähköposti kaikille ryhmän jäsenille. Runko: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Poista sähköpostipohja |

### Esimerkki: Lähetä sähköposti ryhmälle

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Tuetut yhdistelykentät:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Estetyt IP-osoitteet

Peruspolku: `/messaging/blockedips`

(vanha) IP-osoitteiden esto suoratoiston live-chatille. B1App-asiakas ei enää kutsu `POST /` -reittiä, sillä IP-osoitteiden esto poistettiin yhtenäisen toimituksen siirtymässä. `/clear`-reittiä kutsuu edelleen palvelimelta palvelimelle `StreamingServiceController`, kun suoratoistopalvelut tallennetaan.

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (vanha) Tallenna estetyt IP-osoitteet (erä). Ei aktiivista asiakasta |
| POST | `/clear` | JWT | — | Tyhjennä kaikki estetyt IP-osoitteet tietyille palveluille. Runko: `[{ serviceId, churchId }]` |

## Toimituslokit

Peruspolku: `/messaging/deliverylogs`

Seuraa lähetettyjen viestien (tekstiviestit, push-ilmoitukset, sähköposti) toimitustilaa.

| Metodi | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Lataa toimituslokit sisällötyypin ja tunnisteen perusteella |
| GET | `/person/:personId` | JWT | — | Lataa henkilön toimituslokit. Valinnaiset `?startDate=&endDate=` rajaavat tuloksia |
| GET | `/recent` | JWT | — | Lataa seurakunnan viimeisimmät toimituslokit. Valinnainen `?limit=` (oletus 100) |
| GET | `/:id` | JWT | — | Lataa toimituloki tunnisteen perusteella |

## Aiheeseen liittyvät sivut

- [Reaaliaikainen arkkitehtuuri](../../realtime) -- WebSocket-protokolla, huonetilaukset ja yhtenäinen toimituskehys
- [Web-push-ilmoitukset](../../web-push) -- Selaimen push-rekisteröinti ja toimitus
- [Jäsenyyden päätepisteet](./membership) -- Henkilöt, ryhmät, roolit ja ydintunnistus
- [Osallistumisen päätepisteet](./attendance) -- Palveluiden ja käyntien seuranta
- [Todennus ja käyttöoikeudet](./authentication) -- Kirjautumisvirta, JWT, OAuth ja oikeusmalli
- [Moduulirakenne](../module-structure) -- Koodin järjestämisen mallit
