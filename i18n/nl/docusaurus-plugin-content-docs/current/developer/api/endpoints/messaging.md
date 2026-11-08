---
title: "Messaging-eindpunten"
description: "Referentie voor de ChurchApps messaging-API-eindpunten: gesprekken, toegangsregels voor notities, sms, e-mailsjablonen, meldingen en apparaten."
---

# Messaging-eindpunten

<div class="article-intro">

De Messaging-module beheert realtime gesprekken, chatberichten, pushmeldingen, sms- en e-maillevering, WebSocket-verbindingen, privéberichten, apparaatregistratie en sms-providers. Het vormt de communicatielaag die in alle ChurchApps-applicaties wordt gebruikt, zowel voor livestream-chat als voor asynchrone meldingen.

</div>

**Basispad:** `/messaging`

## Gesprekken

Basispad: `/messaging/conversations`

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Laad gesprekken op basis van komma-gescheiden ID's, met het eerste en laatste bericht |
| GET | `/messages/:contentType/:contentId` | JWT | — | Laad gesprekken voor inhoud met gepagineerde berichten (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Haal gesprekken van het type post op voor de groepen van de huidige gebruiker |
| GET | `/posts/group/:groupId` | JWT | — | Haal gesprekken van het type post op voor een specifieke groep |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Nieuwste notities over alle records voor de notitiepagina van B1 Admin. `section` is `people`, `groups`, `events` of `workflows` (anders `400`); `limit` staat standaard op 25 (maximaal 100); `before` is de cursor van de vorige pagina. Elke notitie moet nog steeds voldoen aan de regel van het eigen type (machtiging People Edit / vertrouwelijke notities, leiders van de groep, kijkers van events, kijkers van workflowkaarten), zodat aanroepers alleen notities zien die ze zouden kunnen openen. Notitietekst wordt ingekort tot 300 tekens |
| GET | `/current/:churchId/:contentType/:contentId` | Openbaar | — | Haal het huidige gesprek voor inhoud op of maak het aan (decodeert `contentId` automatisch) |
| GET | `/:churchId/:contentType/:contentId` | Openbaar | — | Laad gesprekken op basis van inhoudstype en ID |
| GET | `/:churchId/:id` | Openbaar | — | Laad één gesprek op basis van ID |
| POST | `/` | JWT | — | Maak gesprekken aan of werk ze bij (batch) |
| POST | `/start` | JWT | — | Start een nieuw gesprek met een eerste opmerking |
| DELETE | `/:churchId/:id` | JWT | — | Verwijder een gesprek |

### Toegangscontrole voor notities van personen

Gesprekken met `contentType: "person"` (het tabblad Notities op een persoonsrecord) of `contentType: "personConfidential"` (de sectie Vertrouwelijke notities) worden op elk lees- en schrijfpad beveiligd, ook op de hierboven genoemde openbare routes. Die geven voor deze inhoudstypen `401` terug. `person` vereist de MembershipApi-machtiging **People / Edit**; `personConfidential` vereist **People / View Confidential Notes**. Voor API-sleutels met beperkte scope geeft `people:write` beide acties (de gebruiker van de sleutel moet de onderliggende rolmachtiging nog wel hebben).

### Toegangscontrole voor groeps- en eventnotities {#group-and-event-notes-access-control}

Twee andere notitietypen worden op dezelfde manier beveiligd, op elk lees- en schrijfpad (ook op de openbare routes hierboven), en er kan nooit anoniem op worden gepost:

- **`groupNote`** (`contentId` = groeps-ID) -- de feed **Leidersnotities** van een groep. Alleen de leiders van die groep (`leaderGroupIds` in de JWT) kunnen lezen of posten. Geen enkele medewerkersmachtiging geeft toegang, ook `content.edit` en de groepslidmachtigingen niet.
- **`eventNote`** (`contentId` = event-ID) -- de notities bij een kalendergebeurtenis. Medewerkers met `content.edit` of **Calendars / Admin** kunnen altijd lezen en posten. Anders volgt de toegang de velden `notesViewRole` (lezen) en `notesPostRole` (posten) van het event: `staff` (de standaard, gebruikt wanneer het veld `null` is) geeft niemand anders toegang, `leaders` geeft toegang aan leiders van de groep van het event, en `members` geeft toegang aan leden en leiders van de eventgroep. Een event zonder `groupId` is alleen voor medewerkers.

### Toegangscontrole voor notities van workflowkaarten

Gesprekken met `contentType: "workflowCard"` (de notities op een workflowkaart, waarbij `contentId` de taak-ID van de kaart is) kunnen alleen worden gelezen en beschreven door iemand die die kaart kan openen: een gebruiker met de DoingApi-machtiging **Tasks / View**, of de persoon of groep aan wie de kaart is toegewezen, door wie hij is aangemaakt of waarover hij gaat. Iedereen krijgt `401` op elk leespad, ook op de openbare routes hierboven. Het gesprek van een kaart wordt via de kaart zelf gekoppeld met `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; het eerst gekoppelde gesprek blijft staan). Die aanroep kan worden gedaan door de bewerkers van de kaart en de toegewezen persoon.

### Voorbeeld: een gesprek starten

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

## Berichten

Basispad: `/messaging/messages`

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Laad alle berichten van een gesprek |
| GET | `/catchup/:churchId/:conversationId` | Openbaar | — | Laad alle berichten van een gesprek (openbare catchup voor livechat) |
| GET | `/:churchId/:id` | Openbaar | — | Laad één bericht op basis van ID |
| POST | `/` | JWT | — | Sla berichten op (batch). Stuurt realtime updates en activeert meldingen. Het bijwerken van een bestaand bericht vereist dat je de auteur bent of de machtiging `content.edit` hebt; de opgeslagen auteur kan nooit worden gewijzigd |
| POST | `/send` | Openbaar | — | Verstuur berichten (batch, openbaar). Stuurt realtime updates via WebSocket en activeert meldingen |
| POST | `/setCallout` | JWT | — | (verouderd) Zend een callout-bericht realtime uit. Geen actieve client; livestream-chat toont callouts niet meer |
| DELETE | `/:churchId/:id` | JWT | — | Verwijder een bericht en zend de verwijdering realtime uit. Zie [Moderatie van berichten](#message-moderation) |

### Moderatie van berichten

Een bericht verwijderen mag door:

- de auteur van het bericht;
- medewerkers met `content.edit` (in de hele kerk);
- **groepsleiders**, voor gesprekken met een `contentType` van `group` of `groupAnnouncement` waarvan de `contentId` een groep is die ze leiden (`leaderGroupIds` in de JWT).

Gesprekken over notities van personen (`person` / `personConfidential`) worden nooit door leiders gemodereerd; daarvoor gelden de notitiemachtigingen (`people.edit`, `people.viewConfidentialNotes`).

Leiders kunnen alleen verwijderen, niet bewerken: het herschrijven van het bericht van een ander lid blijft beperkt tot de auteur en medewerkers met `content.edit`.

### Voorbeeld: een bericht verzenden

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

## Privéberichten

Basispad: `/messaging/privatemessages`

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Laad alle privéberichten van de huidige gebruiker (inclusief het laatste bericht per gesprek; markeert alles als gelezen) |
| GET | `/existing/:personId` | JWT | — | Zoek een bestaand privégesprek met een specifieke persoon |
| GET | `/:id` | JWT | — | Laad een privébericht op basis van ID (wist de melding als het aan de huidige gebruiker is gericht) |
| POST | `/` | JWT | — | Verstuur privéberichten (batch). Activeert een pushmelding voor de ontvanger |

## Meldingen

Basispad: `/messaging/notifications`

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Haal het aantal ongelezen meldingen van de huidige gebruiker op |
| GET | `/my` | JWT | — | Laad alle meldingen van de huidige gebruiker (markeert alles als gelezen) |
| GET | `/tmpEmail` | Openbaar | — | Activeer de dagelijkse e-mailsamenvatting van meldingen (debug-/cron-eindpunt) |
| GET | `/:churchId/person/:personId` | JWT | — | Laad meldingen van een specifieke persoon |
| GET | `/:churchId/:id` | JWT | — | Laad een melding op basis van ID |
| POST | `/` | JWT | — | Maak meldingen aan of werk ze bij (batch) |
| POST | `/create` | JWT | — | Maak meldingen aan voor meerdere personen. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Markeer alle meldingen van een persoon als gelezen |
| POST | `/sendTest` | JWT | — | Verstuur een testpushmelding. Body: `{ personId, title }` |
| POST | `/ping` | Openbaar | — | Maak een melding aan via een externe trigger. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Verwijder een melding |

### Voorbeeld: meldingen aanmaken

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

## Meldingsvoorkeuren

Basispad: `/messaging/notificationpreferences`

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Geef een overzicht van meldingscategorieën met hun standaard- en toegestane kanalen |
| GET | `/my` | JWT | — | Laad de meldingsvoorkeuren van de huidige gebruiker (maakt standaardwaarden automatisch aan als er geen zijn) |
| POST | `/` | JWT | — | Sla de voorkeuren van de huidige gebruiker op. Body: een of meer van `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus optioneel `overrides: [{ categoryKey, channel, optedIn }]` (channel kan `push`, `email`, `in_app` of `sms` zijn; vergrendelde categorieën worden genegeerd). `allowSms` is de opt-in van het lid voor tekstherinneringen. Een verouderde body met een array van rijen wordt nog steeds geaccepteerd |

## Verbindingen

Basispad: `/messaging/connections`

Beheert WebSocket-/realtimeverbindingen voor chat, groepsgesprekken, privéberichten en livestreaming. Zie [Realtime-architectuur](../../realtime.md) voor het volledige protocol.

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Openbaar | — | Laad alle verbindingen voor een gesprek |
| POST | `/` | Openbaar | — | Registreer verbindingen (batch). Activeert een aanwezigheidsbroadcast voor het gesprek. Body-items: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Openbaar | — | Werk de weergavenaam van een verbinding bij op basis van socket-ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Openbaar | — | Verwijder een verbinding uit een gesprek. Activeert een aanwezigheidsbroadcast |
| POST | `/tmpSendAlert` | Openbaar | — | Stuur een meldingsalert naar de verbindingen van een persoon. Body: `{ churchId, personId }` |

## Apparaten

Basispad: `/messaging/devices`

Beheert apparaatregistratie voor pushmeldingen en contentkoppeling (bijv. de Lessons-app op tv-schermen).

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Registreer of werk een apparaat bij (registratie voor mobiele push). Zoekt op FCM-token of apparaat-ID |
| POST | `/enrollAnon` | Openbaar | — | Registreer een anoniem apparaat en genereer een koppelcode van 4 tekens |
| POST | `/` | Openbaar | — | Sla apparaten op (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Koppel een apparaat met de koppelcode. Optioneel `?contentType=&contentId=` om content toe te wijzen |
| GET | `/status/:deviceId` | Openbaar | — | Controleer de koppelstatus van een apparaat |
| GET | `/:churchId` | JWT | — | Laad alle apparaten van een kerk |
| GET | `/:churchId/person/:personId` | JWT | — | Laad alle apparaten van een persoon |
| GET | `/:churchId/:id` | JWT | — | Laad een apparaat op basis van ID |
| DELETE | `/:churchId/:id` | JWT | — | Verwijder een apparaat |

### Voorbeeld: een apparaat registreren

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

## Apparaatinhoud

Basispad: `/messaging/devicecontents`

Beheert contenttoewijzingen voor gekoppelde apparaten (bijv. welke les op een tv wordt getoond).

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Laad de contenttoewijzingen van een apparaat |
| POST | `/` | JWT | — | Sla de contenttoewijzingen van apparaten op (batch) |
| DELETE | `/:id` | JWT | — | Verwijder een contenttoewijzing van een apparaat |

## Sms

Basispad: `/messaging/texting`

Beheert sms-providers, groepstekstberichten en het bijhouden van de levering.

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Laad de sms-providers van de kerk (inloggegevens worden gemaskeerd) |
| GET | `/status` | JWT | — | `{ enabled }` -- of de kerk een ingeschakelde sms-provider heeft. Elke ingelogde gebruiker van de kerk; wordt gebruikt om de opties **Text** alleen te tonen wanneer er sms'jes kunnen worden verstuurd |
| GET | `/inboundUrl` | JWT | `texting.send` of `settings.edit` | `{ url }` -- de inkomende (STOP-)webhook-URL van de kerk, om in de provider te plakken |
| POST | `/inbound/:churchId/:token` | Openbaar | — | Inkomende-berichtwebhook van de provider. `token` is een HMAC van de kerk-ID. Een antwoord dat exact een stopwoord is (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) markeert elke overeenkomende persoon als `optedOut` en zet hun `allowSms` uit. Geeft `{ optedOut: <count> }` terug; andere antwoorden geven `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Bekijk de ontvangers van een groepstekstbericht (aantallen geschikt, afgemeld en zonder telefoonnummer) |
| GET | `/sent` | JWT | — | Laad alle verzonden sms-records van de kerk |
| GET | `/sent/:id/details` | JWT | — | Laad een verzonden sms met de leveringslogs per ontvanger |
| POST | `/providers` | JWT | — | Sla sms-providers op (batch). Versleutelt API-inloggegevens |
| POST | `/send` | JWT | — | Verstuur een sms naar alle geschikte leden van een groep. Body: `{ groupId, message }`. Invoegvelden (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) worden per ontvanger ingevuld |
| POST | `/sendPerson` | JWT | — | Verstuur een sms naar één persoon. Body: `{ personId, phoneNumber, message }`. Invoegvelden worden ingevuld, en de ingevulde tekst is wat wordt gelogd |
| DELETE | `/providers/:id` | JWT | — | Verwijder een sms-provider |

### Voorbeeld: een groepstekstbericht verzenden

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

## E-mailsjablonen

Basispad: `/messaging/emailTemplates`

Beheert herbruikbare e-mailsjablonen en het verzenden van sjabloon-e-mails naar groepen.

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Laad alle e-mailsjablonen van de kerk |
| GET | `/:id` | JWT | — | Laad een e-mailsjabloon op basis van ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` of `tasks.admin` | De e-mailstatus van de groepen van de kerk: `{ approved, paused, remaining, requested }`. Het dialoogvenster Send Email van B1Admin en de workflowactie **Send email** gebruiken dit om te waarschuwen wanneer er geen e-mail zal worden verstuurd |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Vraag support om de kerk goed te keuren voor groepsmail (hooguit één keer per kerk per week) |
| GET | `/preview/:groupId` | JWT | — | Bekijk de e-mailafleveringen voor een groep (aantal geschikte ontvangers, leden zonder e-mailadres) |
| POST | `/` | JWT | — | Maak e-mailsjablonen aan of werk ze bij (batch) |
| POST | `/send` | JWT | — | Verstuur een sjabloon-e-mail naar alle leden van een groep. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Verwijder een e-mailsjabloon |

### Voorbeeld: e-mail naar een groep verzenden

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

**Ondersteunde invoegvelden:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Geblokkeerde IP-adressen

Basispad: `/messaging/blockedips`

(verouderd) IP-blokkering voor livestream-chat. De B1App-client roept `POST /` niet meer aan; IP-blokkering is verwijderd bij de migratie naar uniforme levering. De route `/clear` wordt nog steeds server-naar-server aangeroepen door `StreamingServiceController` wanneer streamingdiensten worden opgeslagen.

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (verouderd) Sla geblokkeerde IP-adressen op (batch). Geen actieve client |
| POST | `/clear` | JWT | — | Wis alle geblokkeerde IP-adressen voor specifieke diensten. Body: `[{ serviceId, churchId }]` |

## Leveringslogs

Basispad: `/messaging/deliverylogs`

Houdt de leveringsstatus bij van verzonden berichten (sms, pushmeldingen, e-mail).

| Methode | Pad | Auth | Machtiging | Beschrijving |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Laad leveringslogs op basis van inhoudstype en ID |
| GET | `/person/:personId` | JWT | — | Laad leveringslogs van een persoon. Optioneel filteren met `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Laad recente leveringslogs van de kerk. Optioneel `?limit=` (standaard 100) |
| GET | `/:id` | JWT | — | Laad een leveringslog op basis van ID |

## Gerelateerde pagina's

- [Realtime-architectuur](../../realtime.md) -- WebSocket-protocol, roomabonnementen en het uniforme leveringsframework
- [Web Push-meldingen](../../web-push.md) -- Registratie en levering van browserpush
- [Ledeneindpunten](./membership.md) -- Personen, groepen, rollen en kernidentiteit
- [Aanwezigheidseindpunten](./attendance.md) -- Bijhouden van diensten en bezoeken
- [Authenticatie & machtigingen](./authentication.md) -- Inlogstroom, JWT, OAuth, machtigingsmodel
- [Modulestructuur](../module-structure.md) -- Patronen voor de codeorganisatie
