---
title: "Viestinnän päätepisteet"
description: "Viiteopas ChurchApps-viestinnän API-päätepisteisiin: keskustelut, muistiinpanojen käyttöoikeudet, tekstiviestit, sähköpostimallit, ilmoitukset ja laitteet."
---

# Viestinnän päätepisteet

<div class="article-intro">

Viestintämoduuli hallinnoi reaaliaikaisia keskusteluja, chat-viestejä, push-ilmoituksia, SMS- ja sähköpostitoimitusta, WebSocket-yhteyksiä, yksityisviestejä, laitteiden rekisteröintiä ja tekstiviestipalveluntarjoajia. Se tarjoaa viestintäkerroksen, jota kaikki ChurchApps-sovellukset käyttävät sekä suoran lähetyksen chat-keskustelujen että asynkronisten ilmoitusten tarpeisiin.

</div>

**Perus-polku:** `/messaging`

## Keskustelut

Perus-polku: `/messaging/conversations`

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Lataa keskustelut pilkuilla erotettujen tunnisteiden perusteella, mukana ensimmäinen ja viimeisin viesti |
| GET | `/messages/:contentType/:contentId` | JWT | — | Lataa sisällön keskustelut sivutetuilla viesteillä (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Hae nykyisen käyttäjän ryhmien julkaisutyyppiset keskustelut |
| GET | `/posts/group/:groupId` | JWT | — | Hae tietyn ryhmän julkaisutyyppiset keskustelut |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Uusimmat muistiinpanot kaikista tietueista B1 Adminin Muistiinpanot-sivulle. `section` on `people`, `groups`, `events` tai `workflows` (muuten 400). `limit` on oletuksena 25 (enintään 100). `before` on edellisen sivun kursori. Jokainen muistiinpano täyttää edelleen oman tyyppinsä säännön (Henkilöt / Muokkaa -oikeus tai luottamuksellisten muistiinpanojen oikeus, ryhmän johtajat, tapahtumien katselijat, työnkulkukorttien katselijat), joten kutsujat näkevät vain ne muistiinpanot, jotka voisivat avata. Muistiinpanon teksti katkaistaan 300 merkkiin |
| GET | `/current/:churchId/:contentType/:contentId` | Julkinen | — | Hae tai luo sisällön nykyinen keskustelu (purkaa contentId-tunnisteen automaattisesti) |
| GET | `/:churchId/:contentType/:contentId` | Julkinen | — | Lataa keskustelut sisältötyypin ja tunnisteen perusteella |
| GET | `/:churchId/:id` | Julkinen | — | Lataa yksittäinen keskustelu tunnisteen perusteella |
| POST | `/` | JWT | — | Luo tai päivitä keskusteluja (erä) |
| POST | `/start` | JWT | — | Aloita uusi keskustelu ensimmäisellä kommenttiviestillä |
| DELETE | `/:churchId/:id` | JWT | — | Poista keskustelu |

### Henkilön muistiinpanojen käyttöoikeuden hallinta

Keskustelut, joiden `contentType` on `person` (henkilötietueen Muistiinpanot-välilehti) tai `personConfidential` (Luottamukselliset muistiinpanot -osio), ovat rajoitettuja jokaisessa luku- ja kirjoitusreitissä, myös yllä olevissa julkisissa reiteissä, jotka palauttavat näille sisältötyypeille vastauksen `401`. `person` vaatii MembershipApi-oikeuden **People / Edit**; `personConfidential` vaatii oikeuden **People / View Confidential Notes**. Rajatuilla API-avaimilla `people:write` kattaa molemmat toiminnot (avaimen käyttäjällä on oltava edelleen vastaava roolioikeus).

### Ryhmän ja tapahtuman muistiinpanojen käyttöoikeuden hallinta {#group-and-event-notes-access-control}

Kaksi muuta muistiinpanojen sisältötyyppiä on rajoitettu samalla tavalla jokaisessa luku- ja kirjoitusreitissä (myös yllä olevissa julkisissa reiteissä), eikä niihin koskaan voi kirjoittaa anonyymisti:

- **`groupNote`** (`contentId` = ryhmän tunniste) – ryhmän **Johtajien muistiinpanot** -syöte. Vain kyseisen ryhmän johtajat (`leaderGroupIds` JWT:ssä) voivat lukea tai kirjoittaa. Mikään henkilöstöoikeus ei anna pääsyä, myös `content.edit` ja ryhmäjäsenyysoikeudet mukaan lukien.
- **`eventNote`** (`contentId` = tapahtuman tunniste) – kalenteritapahtuman muistiinpanot. Henkilöstö, jolla on `content.edit` tai **Calendars / Admin**, voi aina lukea ja kirjoittaa. Muuten pääsy noudattaa tapahtuman `notesViewRole`-asetusta (luku) ja `notesPostRole`-asetusta (kirjoitus): `staff` (oletus, kun kenttä on `null`) ei salli muille ketään, `leaders` sallii tapahtuman ryhmän johtajat ja `members` sallii tapahtuman ryhmän jäsenet ja johtajat. Tapahtuma ilman `groupId`-tunnistetta on vain henkilöstön käytettävissä.

### Työnkulkukortin muistiinpanojen käyttöoikeuden hallinta

Keskustelut, joiden `contentType` on `workflowCard` (työnkulkukortin muistiinpanot, missä `contentId` on kortin tehtävätunniste), ovat luettavissa ja muokattavissa vain henkilöllä, joka voi avata kortin: käyttäjällä, jolla on DoingApi-oikeus **Tasks / View**, tai henkilöllä tai ryhmällä, jolle kortti on osoitettu, jonka kortin on luonut tai joka koskee. Kaikki muut saavat vastauksen `401` jokaisessa lukureitissä, myös yllä olevissa julkisissa reiteissä. Kortin keskustelu liitetään itse kortin kautta: `POST /doing/tasks/:id/conversation` (runko `{ "conversationId": "..." }`; ensimmäinen liitetty keskustelu voittaa). Kortin muokkaajat ja sen vastuuhenkilö voivat kutsua tätä reittiä.

### Esimerkki: Keskustelun aloittaminen

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

Perus-polku: `/messaging/messages`

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Lataa kaikki keskustelun viestit |
| GET | `/catchup/:churchId/:conversationId` | Julkinen | — | Lataa kaikki keskustelun viestit (julkinen catchup-reitti live-chatille) |
| GET | `/:churchId/:id` | Julkinen | — | Lataa yksittäinen viesti tunnisteen perusteella |
| POST | `/` | JWT | — | Tallenna viestit (erä). Lähettää reaaliaikaisia päivityksiä ja käynnistää ilmoitukset. Olemassa olevan viestin muokkaaminen vaatii, että käyttäjä on viestin kirjoittaja tai hänellä on `content.edit`. Tallennettua kirjoittajaa ei voi koskaan vaihtaa |
| POST | `/send` | Julkinen | — | Lähetä viestit (erä, julkinen). Lähettää reaaliaikaisia päivityksiä WebSocketin kautta ja käynnistää ilmoitukset |
| POST | `/setCallout` | JWT | — | (vanhentunut) Lähetä huomiointiviesti reaaliaikaisesti. Ei aktiivista asiakasta; suoran lähetyksen chat ei enää näytä huomiointeja |
| DELETE | `/:churchId/:id` | JWT | — | Poista viesti ja lähetä poisto reaaliaikaisesti. Katso [Viestien moderointi](#message-moderation) |

### Viestien moderointi

Viestin poistaminen on sallittu seuraaville:

- viestin kirjoittaja;
- henkilöstö, jolla on `content.edit` (koko seurakunnassa);
- **ryhmän johtajat** keskusteluille, joiden `contentType` on `group` tai `groupAnnouncement` ja joiden `contentId` on ryhmä, jota he johtavat (`leaderGroupIds` JWT:ssä).

Henkilömuistiinpanojen keskusteluja (`person` / `personConfidential`) johtajat eivät koskaan moderoi. Niissä käytetään muistiinpanojen oikeuksia (`people.edit`, `people.viewConfidentialNotes`).

Johtajilla on oikeus vain poistaa, ei muokata. Toisen jäsenen viestin kirjoittaminen uudelleen on edelleen rajattu kirjoittajalle ja `content.edit`-oikeuden omaaville henkilöille.

### Esimerkki: Viestin lähettäminen

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

Perus-polku: `/messaging/privatemessages`

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lataa kaikki nykyisen käyttäjän yksityisviestit (sisältää viimeisimmän viestin keskustelua kohden ja merkitsee kaikki luetuiksi) |
| GET | `/existing/:personId` | JWT | — | Etsi olemassa oleva yksityiskeskustelu tietyn henkilön kanssa |
| GET | `/:id` | JWT | — | Lataa yksityisviesti tunnisteen perusteella (tyhjentää ilmoituksen, jos viesti on osoitettu nykyiselle käyttäjälle) |
| POST | `/` | JWT | — | Lähetä yksityisviestit (erä). Käynnistää push-ilmoituksen vastaanottajalle |

## Ilmoitukset

Perus-polku: `/messaging/notifications`

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Hae nykyisen käyttäjän lukemattomien ilmoitusten määrä |
| GET | `/my` | JWT | — | Lataa kaikki nykyisen käyttäjän ilmoitukset (merkitsee kaikki luetuiksi) |
| GET | `/tmpEmail` | Julkinen | — | Käynnistä päivittäinen sähköposti-ilmoitusyhteenveto (vianetsintä- tai cron-päätepiste) |
| GET | `/:churchId/person/:personId` | JWT | — | Lataa tietyn henkilön ilmoitukset |
| GET | `/:churchId/:id` | JWT | — | Lataa ilmoitus tunnisteen perusteella |
| POST | `/` | JWT | — | Luo tai päivitä ilmoituksia (erä) |
| POST | `/create` | JWT | — | Luo ilmoituksia useille henkilöille. Runko: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Merkitse kaikki henkilön ilmoitukset luetuiksi |
| POST | `/sendTest` | JWT | — | Lähetä testi-push-ilmoitus. Runko: `{ personId, title }` |
| POST | `/ping` | Julkinen | — | Luo ilmoitus ulkoisesta laukaisijasta. Runko: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Poista ilmoitus |

### Esimerkki: Ilmoitusten luominen

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

Perus-polku: `/messaging/notificationpreferences`

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Listaa ilmoitusluokat niiden oletus- ja sallituilla kanavilla |
| GET | `/my` | JWT | — | Lataa nykyisen käyttäjän ilmoitusasetukset (luo oletukset automaattisesti, jos niitä ei ole) |
| POST | `/` | JWT | — | Tallenna nykyisen käyttäjän asetukset. Runko: mikä tahansa seuraavista: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, sekä valinnainen `overrides: [{ categoryKey, channel, optedIn }]` (kanava voi olla `push`, `email`, `in_app` tai `sms`; lukitut luokat ohitetaan). `allowSms` on jäsenen suostumus tekstiviestimuistutuksiin. Vanhan rivitaulukkomuotoisen rungon hyväksytään edelleen |

## Yhteydet

Perus-polku: `/messaging/connections`

Hallinnoi WebSocket- ja reaaliaikaisia yhteyksiä chatille, ryhmäkeskusteluille, yksityisviesteille ja suorille lähetyksille. Katso koko protokolla kohdasta [Reaaliaikainen arkkitehtuuri](../../realtime.md).

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Julkinen | — | Lataa kaikki keskustelun yhteydet |
| POST | `/` | Julkinen | — | Rekisteröi yhteydet (erä). Käynnistää läsnäololähetyksen keskustelulle. Kohteet: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Julkinen | — | Päivitä yhteyden näyttönimi socket-tunnisteen perusteella. Runko: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Julkinen | — | Poista yhteys keskustelusta. Käynnistää läsnäololähetyksen |
| POST | `/tmpSendAlert` | Julkinen | — | Lähetä ilmoitushälytys henkilön yhteyksille. Runko: `{ churchId, personId }` |

## Laitteet

Perus-polku: `/messaging/devices`

Hallinnoi laitteiden rekisteröintiä push-ilmoituksille ja sisällön liittämistä laitteisiin (esim. Lessons-sovellus TV-näytöillä).

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Rekisteröi tai päivitä laite (mobiilin push-rekisteröinti). Tunnistaa laitteen FCM-tunnisteen tai laitetunnuksen perusteella |
| POST | `/enrollAnon` | Julkinen | — | Rekisteröi anonyymi laite ja luo 4-merkkisen liityntäkoodin |
| POST | `/` | Julkinen | — | Tallenna laitteet (erä) |
| GET | `/pair/:pairingCode` | JWT | — | Liitä laite sen liityntäkoodilla. Valinnainen `?contentType=&contentId=` sisällön määrittämiseen |
| GET | `/status/:deviceId` | Julkinen | — | Tarkista laitteen liitännän tila |
| GET | `/:churchId` | JWT | — | Lataa kaikki seurakunnan laitteet |
| GET | `/:churchId/person/:personId` | JWT | — | Lataa kaikki henkilön laitteet |
| GET | `/:churchId/:id` | JWT | — | Lataa laite tunnisteen perusteella |
| DELETE | `/:churchId/:id` | JWT | — | Poista laite |

### Esimerkki: Laitteen rekisteröinti

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Laitteen sisältö

Perus-polku: `/messaging/devicecontents`

Hallinnoi liitettyjen laitteiden sisältöjen määrityksiä (esim. mikä oppitunti näkyy TV:llä).

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Lataa laitteen sisältömääritykset |
| POST | `/` | JWT | — | Tallenna laitteen sisältömääritykset (erä) |
| DELETE | `/:id` | JWT | — | Poista laitteen sisältömääritys |

## Tekstiviestit

Perus-polku: `/messaging/texting`

Hallinnoi SMS-tekstiviestipalveluntarjoajia, ryhmätekstiviestejä ja toimituksen seurantaa.

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Lataa seurakunnan tekstiviestipalveluntarjoajat (tunnistetiedot on peitetty) |
| GET | `/status` | JWT | — | `{ enabled }` – onko seurakunnalla käytössä oleva tekstiviestipalveluntarjoaja. Kuka tahansa kirjautunut seurakunnan käyttäjä; käytetään näyttämään **Teksti**-vaihtoehdot vain silloin, kun viestejä voi lähettää |
| GET | `/inboundUrl` | JWT | `texting.send` tai `settings.edit` | `{ url }` – seurakunnan saapuvan (STOP) webhook-URL-osoite, joka liitetään palveluntarjoajaan |
| POST | `/inbound/:churchId/:token` | Julkinen | — | Palveluntarjoajan saapuvan viestin webhook. `token` on seurakunnan tunnisteen HMAC. Vastaus, joka on täsmälleen pysäytyssana (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), merkitsee kaikki vastaavat henkilöt `optedOut`-tilaan ja kytkee pois heidän `allowSms`-asetuksensa. Palauttaa `{ optedOut: <count> }`; muut vastaukset palauttavat `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Esikatsele ryhmätekstiviestin vastaanottajat (kelvolliset, tilaus peruneet ja puhelinnumerottomat määrät) |
| GET | `/sent` | JWT | — | Lataa kaikki seurakunnan lähetetyt tekstiviestitietueet |
| GET | `/sent/:id/details` | JWT | — | Lataa lähetetty tekstiviesti vastaanottajakohtaisine toimitislokeineen |
| POST | `/providers` | JWT | — | Tallenna tekstiviestipalveluntarjoajat (erä). Salaa API-tunnistetiedot |
| POST | `/send` | JWT | — | Lähetä SMS kaikille ryhmän kelvollisille jäsenille. Runko: `{ groupId, message }`. Yhdistämiskentät (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ratkaistaan vastaanottajakohtaisesti |
| POST | `/sendPerson` | JWT | — | Lähetä SMS yhdelle henkilölle. Runko: `{ personId, phoneNumber, message }`. Yhdistämiskentät ratkaistaan, ja ratkaistu teksti on se, mikä kirjataan lokiin |
| DELETE | `/providers/:id` | JWT | — | Poista tekstiviestipalveluntarjoaja |

### Esimerkki: Ryhmätekstiviestin lähettäminen

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

## Sähköpostimallit

Perus-polku: `/messaging/emailTemplates`

Hallinnoi uudelleenkäytettäviä sähköpostimalleja ja lähettää mallipohjaisia sähköposteja ryhmille.

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lataa kaikki seurakunnan sähköpostimallit |
| GET | `/:id` | JWT | — | Lataa yksittäinen sähköpostimalli tunnisteen perusteella |
| GET | `/sendStatus` | JWT | `groupMembers.edit` tai `tasks.admin` | Seurakunnan ryhmäsähköpostin tila: `{ approved, paused, remaining, requested }`. B1Adminin Lähetä sähköposti -valintaikkuna ja työnkulun **Lähetä sähköposti** -toiminto käyttävät sitä varoittamaan, jos sähköposti ei lähde |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Pyydä tukea hyväksymään seurakunta ryhmäsähköpostia varten (enintään kerran viikossa seurakuntaa kohden) |
| GET | `/preview/:groupId` | JWT | — | Esikatsele ryhmän sähköpostitoimitusta (kelvollisten vastaanottajien määrä, jäsenet ilman sähköpostiosoitetta) |
| POST | `/` | JWT | — | Luo tai päivitä sähköpostimalleja (erä) |
| POST | `/send` | JWT | — | Lähetä mallipohjainen sähköposti kaikille ryhmän jäsenille. Runko: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Poista sähköpostimalli |

### Esimerkki: Sähköpostin lähettäminen ryhmälle

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

**Tuetut yhdistämiskentät:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Estetyt IP-osoitteet

Perus-polku: `/messaging/blockedips`

(vanhentunut) IP-osoitteiden esto suoran lähetyksen chatille. B1App-asiakas ei enää kutsu `POST /` -reittiä, sillä IP-osoitteiden esto poistettiin yhtenäisen toimituksen siirtymässä. `/clear`-reittiä kutsuu edelleen palvelimelta palvelimelle `StreamingServiceController`, kun suoran lähetyksen palveluja tallennetaan.

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (vanhentunut) Tallenna estetyt IP-osoitteet (erä). Ei aktiivista asiakasta |
| POST | `/clear` | JWT | — | Tyhjennä kaikki estetyt IP-osoitteet tietyille palveluille. Runko: `[{ serviceId, churchId }]` |

## Toimitusloki

Perus-polku: `/messaging/deliverylogs`

Seuraa lähetettyjen viestien (SMS, push-ilmoitukset, sähköposti) toimitustilaa.

| Menetelmä | Polku | Todennus | Käyttöoikeus | Kuvaus |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Lataa toimitusloki sisältötyypin ja tunnisteen perusteella |
| GET | `/person/:personId` | JWT | — | Lataa henkilön toimitusloki. Valinnainen suodatin `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Lataa seurakunnan viimeisimmät toimitusloki-merkinnät. Valinnainen `?limit=` (oletus 100) |
| GET | `/:id` | JWT | — | Lataa toimitusloki tunnisteen perusteella |

## Aiheeseen liittyvät sivut

- [Reaaliaikainen arkkitehtuuri](../../realtime.md) – WebSocket-protokolla, huoneiden tilaukset ja yhtenäinen toimituskehys
- [Web-push-ilmoitukset](../../web-push.md) – Selaimen push-rekisteröinti ja toimitus
- [Jäsenyyden päätepisteet](./membership.md) – Henkilöt, ryhmät, roolit ja ydinidentiteetti
- [Läsnäolon päätepisteet](./attendance.md) – Palveluiden ja käyntien seuranta
- [Todennus ja käyttöoikeudet](./authentication.md) – Kirjautumisvirta, JWT, OAuth ja käyttöoikeusmalli
- [Moduulin rakenne](../module-structure.md) – Koodin järjestämisen mallit
