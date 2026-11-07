---
title: "Končne točke sporočanja"
description: "Referenca končnih točk API-ja za sporočila ChurchApps: pogovori, pravila za dostop do zapiskov, SMS, predloge e-pošte, obvestila in naprave."
---

# Končne točke sporočanja

<div class="article-intro">

Modul Sporočanje upravlja pogovore v realnem času, klepetalna sporočila, potisna obvestila, dostavo SMS-sporočil in e-pošte, povezave WebSocket, zasebna sporočila, registracijo naprav in ponudnike SMS-sporočil. Zagotavlja komunikacijsko plast, ki jo uporabljajo vse aplikacije ChurchApps, tako za klepet v živih prenosih kot za asinhrona obvestila.

</div>

**Osnovna pot:** `/messaging`

## Pogovori

Osnovna pot: `/messaging/conversations`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Naloži pogovore po ID-jih, ločenih z vejicami, s prvimi in zadnjimi sporočili |
| GET | `/messages/:contentType/:contentId` | JWT | — | Naloži pogovore za vsebino s sporočili po straneh (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Pridobi pogovore tipa objava za skupine trenutnega uporabnika |
| GET | `/posts/group/:groupId` | JWT | — | Pridobi pogovore tipa objava za določeno skupino |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Najnovejše zapiske med vsemi zapisi za stran Zapiski v B1 Admin. `section` je `people`, `groups`, `events` ali `workflows` (sicer 400); `limit` je privzeto 25 (največ 100); `before` je kazalec iz prejšnje strani. Vsak zapisek mora še vedno izpolnjevati pravilo svoje vrste (People Edit / dovoljenje za zaupne zapiske, voditelji skupine, gledalci dogodkov, gledalci kartic delovnega toka), zato klicatelji vidijo samo zapiske, ki bi jih lahko odprli. Besedilo zapiska je skrajšano na 300 znakov |
| GET | `/current/:churchId/:contentType/:contentId` | Javno | — | Pridobi ali ustvari trenutni pogovor za vsebino (samodejno dešifrira contentId) |
| GET | `/:churchId/:contentType/:contentId` | Javno | — | Naloži pogovore po vrsti vsebine in ID-ju |
| GET | `/:churchId/:id` | Javno | — | Naloži en pogovor po ID-ju |
| POST | `/` | JWT | — | Ustvari ali posodobi pogovore (paketno) |
| POST | `/start` | JWT | — | Začni nov pogovor z začetnim komentarjem |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši pogovor |

### Nadzor dostopa do zapiskov o osebah

Pogovori s `contentType: "person"` (zavihek Zapiski na zapisu osebe) ali `contentType: "personConfidential"` (razdelek Zaupni zapiski) so zaščiteni pri vsaki poti branja in pisanja, vključno z zgoraj navedenimi javnimi potmi, ki za te vrste vsebine vrnejo `401`. Za `person` je potrebno dovoljenje MembershipApi **People / Edit**; za `personConfidential` je potrebno dovoljenje **People / View Confidential Notes**. Za API-ključe z omejenim dostopom `people:write` zajema obe dejanji (uporabnik ključa mora še vedno imeti temeljno vlogo z dovoljenjem).

### Nadzor dostopa do zapiskov skupin in dogodkov {#group-and-event-notes-access-control}

Dve dodatni vrsti zapiskov sta zaščiteni enako, pri vsaki poti branja in pisanja (vključno z zgoraj navedenimi javnimi potmi), in nikoli niso odprti za anonimno objavljanje:

- **`groupNote`** (`contentId` = ID skupine) -- vir **Zapiski voditeljev** na skupini. Do branja ali objavljanja imajo dostop samo voditelji te skupine (`leaderGroupIds` v JWT-ju). Nobeno osebje nima dostopa, vključno z `content.edit` in dovoljenji za članstvo v skupini.
- **`eventNote`** (`contentId` = ID dogodka) -- zapiski na koledarskem dogodku. Osebje z `content.edit` ali **Calendars / Admin** lahko vedno bere in objavlja. Sicer dostop določata `notesViewRole` (branje) in `notesPostRole` (objavljanje) dogodka: `staff` (privzeto, uporabi se, kadar je polje `null`) ne dovoli nikomur drugemu, `leaders` dovoli voditeljem skupine dogodka, `members` pa članom in voditeljem skupine dogodka. Dogodek brez `groupId` je dostopen samo osebju.

### Nadzor dostopa do zapiskov kartic delovnega toka

Pogovori s `contentType: "workflowCard"` (zapiski na kartici delovnega toka, kjer je `contentId` ID naloge kartice) so berljivi in zapisljivi samo za nekoga, ki lahko odpre to kartico: uporabnika z dovoljenjem DoingApi **Tasks / View**, ali osebo oziroma skupino, ki je kartici dodeljena, jo je ustvarila ali se nanjo nanaša. Vsi drugi dobijo `401` pri vsaki poti branja, vključno z zgoraj navedenimi javnimi potmi. Pogovor kartice se pripne prek same kartice z `POST /doing/tasks/:id/conversation` (telo `{ "conversationId": "..." }`; velja prvi pripet pogovor), kar lahko kličejo urejevalci kartice in njen dodeljenec.

### Primer: začetek pogovora

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

## Sporočila

Osnovna pot: `/messaging/messages`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Naloži vsa sporočila pogovora |
| GET | `/catchup/:churchId/:conversationId` | Javno | — | Naloži vsa sporočila pogovora (javna dohitevalna pot za klepet v živo) |
| GET | `/:churchId/:id` | Javno | — | Naloži eno sporočilo po ID-ju |
| POST | `/` | JWT | — | Shrani sporočila (paketno). Pošilja posodobitve v realnem času in sproži obvestila. Za posodobitev obstoječega sporočila mora biti uporabnik njegov avtor ali imeti `content.edit`; shranjenega avtorja ni mogoče spremeniti |
| POST | `/send` | Javno | — | Pošlji sporočila (paketno, javno). Pošilja posodobitve v realnem času prek WebSocket in sproži obvestila |
| POST | `/setCallout` | JWT | — | (zastarelo) V realnem času objavi opozorilo. Ni aktivnega odjemalca; klepet v živem prenosu opozoril ne prikazuje več |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši sporočilo in v realnem času objavi brisanje. Glejte [Moderiranje sporočil](#message-moderation) |

### Moderiranje sporočil

Brisanje sporočila je dovoljeno za:

- avtorja sporočila;
- osebje z `content.edit` (kjerkoli v cerkvi);
- **voditelje skupin**, za pogovore z `contentType` `group` ali `groupAnnouncement`, katerih `contentId` je skupina, ki jo vodijo (`leaderGroupIds` v JWT-ju).

Pogovore o zapiskih o osebah (`person` / `personConfidential`) voditelji nikoli ne moderirajo; zanje veljajo dovoljenja za zapiske (`people.edit`, `people.viewConfidentialNotes`).

Voditelji lahko sporočila samo brišejo, ne urejajo: prepisovanje sporočila drugega člana ostane omejeno na avtorja in osebje z `content.edit`.

### Primer: pošiljanje sporočila

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

## Zasebna sporočila

Osnovna pot: `/messaging/privatemessages`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Naloži vsa zasebna sporočila trenutnega uporabnika (vključuje zadnje sporočilo za vsak pogovor, vse označi kot prebrano) |
| GET | `/existing/:personId` | JWT | — | Poišči obstoječi zasebni pogovor z določeno osebo |
| GET | `/:id` | JWT | — | Naloži zasebno sporočilo po ID-ju (počisti obvestilo, če je naslovljeno na trenutnega uporabnika) |
| POST | `/` | JWT | — | Pošlji zasebna sporočila (paketno). Sproži potisno obvestilo prejemniku |

## Obvestila

Osnovna pot: `/messaging/notifications`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Pridobi število neprebranih obvestil za trenutnega uporabnika |
| GET | `/my` | JWT | — | Naloži vsa obvestila trenutnega uporabnika (vse označi kot prebrano) |
| GET | `/tmpEmail` | Javno | — | Sproži dnevni povzetek obvestil po e-pošti (končna točka za odpravljanje napak/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Naloži obvestila za določeno osebo |
| GET | `/:churchId/:id` | JWT | — | Naloži obvestilo po ID-ju |
| POST | `/` | JWT | — | Ustvari ali posodobi obvestila (paketno) |
| POST | `/create` | JWT | — | Ustvari obvestila za več oseb. Telo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označi vsa obvestila osebe kot prebrana |
| POST | `/sendTest` | JWT | — | Pošlji testno potisno obvestilo. Telo: `{ personId, title }` |
| POST | `/ping` | Javno | — | Ustvari obvestilo iz zunanjega sprožilca. Telo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši obvestilo |

### Primer: ustvarjanje obvestil

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

## Nastavitve obvestil

Osnovna pot: `/messaging/notificationpreferences`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Seznam kategorij obvestil s privzetimi in dovoljenimi kanali |
| GET | `/my` | JWT | — | Naloži nastavitve obvestil za trenutnega uporabnika (če ni nobene, samodejno ustvari privzete) |
| POST | `/` | JWT | — | Shrani nastavitve trenutnega uporabnika. Telo: kateri koli od `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, ter izbirno `overrides: [{ categoryKey, channel, optedIn }]` (kanal je lahko `push`, `email`, `in_app` ali `sms`; zaklenjene kategorije se prezrejo). `allowSms` je privolitev člana za SMS-opomnike. Še vedno je sprejeto tudi staro telo v obliki polja vrstic |

## Povezave

Osnovna pot: `/messaging/connections`

Upravlja povezave WebSocket/v realnem času za klepet, skupinske pogovore, zasebna sporočila in prenose v živo. Za celoten protokol glejte [Arhitektura v realnem času](../../realtime.md).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Javno | — | Naloži vse povezave za pogovor |
| POST | `/` | Javno | — | Registriraj povezave (paketno). Sproži oddajanje udeležbe za pogovor. Elementi telesa: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Javno | — | Posodobi prikazno ime povezave prek ID-ja vtiča. Telo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Javno | — | Odstrani povezavo iz pogovora. Sproži oddajanje udeležbe |
| POST | `/tmpSendAlert` | Javno | — | Pošlji obvestilo o opozorilu na povezave osebe. Telo: `{ churchId, personId }` |

## Naprave

Osnovna pot: `/messaging/devices`

Upravlja registracijo naprav za potisna obvestila in povezovanje vsebin (npr. aplikacija Lessons na TV-zaslonih).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Vpiši ali posodobi napravo (registracija potisnih obvestil v mobilni napravi). Ujema se po žetonu FCM ali ID-ju naprave |
| POST | `/enrollAnon` | Javno | — | Vpiši anonimno napravo in ustvari 4-mestno kodo za povezovanje |
| POST | `/` | Javno | — | Shrani naprave (paketno) |
| GET | `/pair/:pairingCode` | JWT | — | Poveži napravo z njeno kodo za povezovanje. Izbirno `?contentType=&contentId=` za dodelitev vsebine |
| GET | `/status/:deviceId` | Javno | — | Preveri stanje povezave naprave |
| GET | `/:churchId` | JWT | — | Naloži vse naprave za cerkev |
| GET | `/:churchId/person/:personId` | JWT | — | Naloži vse naprave za osebo |
| GET | `/:churchId/:id` | JWT | — | Naloži napravo po ID-ju |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši napravo |

### Primer: vpis naprave

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

## Vsebine naprav

Osnovna pot: `/messaging/devicecontents`

Upravlja dodelitve vsebin povezanim napravam (npr. katera lekcija je prikazana na TV-ju).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Naloži dodelitve vsebin za napravo |
| POST | `/` | JWT | — | Shrani dodelitve vsebin naprave (paketno) |
| DELETE | `/:id` | JWT | — | Izbriši dodelitev vsebine naprave |

## SMS sporočila

Osnovna pot: `/messaging/texting`

Upravlja ponudnike SMS-sporočil, skupinsko pošiljanje SMS-sporočil in sledenje dostave.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Naloži ponudnike SMS-sporočil za cerkev (poverilnice so zakrite) |
| GET | `/status` | JWT | — | `{ enabled }` -- ali ima cerkev omogočenega ponudnika SMS-sporočil. Dostop ima vsak prijavljeni uporabnik cerkve; uporablja se za prikaz možnosti **Text** samo, kadar je pošiljanje SMS-sporočil mogoče |
| GET | `/inboundUrl` | JWT | `texting.send` ali `settings.edit` | `{ url }` -- URL cerkve za dohodne (STOP) webhooke, ki ga prilepite k ponudniku |
| POST | `/inbound/:churchId/:token` | Javno | — | Webhook ponudnika za dohodna sporočila. `token` je HMAC ID-ja cerkve. Odgovor, ki je točno ena izmed ključnih besed za odjavo (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označi vse ustrezne osebe kot `optedOut` in izklopi njihov `allowSms`. Vrne `{ optedOut: <count> }`; drugi odgovori vrnejo `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Predogled prejemnikov skupinskega SMS-sporočila (šteje upravičene, odjavljene in tiste brez telefonske številke) |
| GET | `/sent` | JWT | — | Naloži vse zapise poslanih SMS-sporočil za cerkev |
| GET | `/sent/:id/details` | JWT | — | Naloži poslano SMS-sporočilo z dnevniki dostave za vsakega prejemnika |
| POST | `/providers` | JWT | — | Shrani ponudnike SMS-sporočil (paketno). Šifrira API-poverilnice |
| POST | `/send` | JWT | — | Pošlji SMS vsem upravičenim članom skupine. Telo: `{ groupId, message }`. Polja za spajanje (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se razrešijo za vsakega prejemnika posebej |
| POST | `/sendPerson` | JWT | — | Pošlji SMS eni osebi. Telo: `{ personId, phoneNumber, message }`. Polja za spajanje se razrešijo, v dnevnik pa se zapiše razrešeno besedilo |
| DELETE | `/providers/:id` | JWT | — | Izbriši ponudnika SMS-sporočil |

### Primer: pošiljanje skupinskega SMS-sporočila

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

## Predloge e-pošte

Osnovna pot: `/messaging/emailTemplates`

Upravlja ponovno uporabne predloge e-pošte in pošiljanje predlog e-pošte skupinam.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Naloži vse predloge e-pošte za cerkev |
| GET | `/:id` | JWT | — | Naloži eno predlogo e-pošte po ID-ju |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ali `tasks.admin` | Stanje e-poštnega pošiljanja skupin v cerkvi: `{ approved, paused, remaining, requested }`. Pogovorno okno Send Email v B1Admin in dejanje delovnega toka **Send email** ga uporabljata, da opozorita, kadar e-pošta ne bo odšla |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Prosi podporo za odobritev cerkve za e-pošto skupin (največ enkrat na cerkev na teden) |
| GET | `/preview/:groupId` | JWT | — | Predogled dostave e-pošte za skupino (število upravičenih prejemnikov, člani brez e-poštnega naslova) |
| POST | `/` | JWT | — | Ustvari ali posodobi predloge e-pošte (paketno) |
| POST | `/send` | JWT | — | Pošlji predlogo e-pošte vsem članom skupine. Telo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Izbriši predlogo e-pošte |

### Primer: pošiljanje e-pošte skupini

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

**Podprta polja za spajanje:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokirani IP-naslovi

Osnovna pot: `/messaging/blockedips`

(zastarelo) Blokiranje IP-naslovov za klepet pri prenosih v živo. Odjemalec B1App več ne kliče `POST /` -- blokiranje IP-naslovov je bilo odstranjeno z migracijo na enotno dostavo. Pot `/clear` še vedno kliče strežnik za strežnik `StreamingServiceController`, ko se storitve prenosa shranijo.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (zastarelo) Shrani blokirane IP-naslove (paketno). Ni aktivnega odjemalca |
| POST | `/clear` | JWT | — | Počisti vse blokirane IP-naslove za določene storitve. Telo: `[{ serviceId, churchId }]` |

## Dnevniki dostave

Osnovna pot: `/messaging/deliverylogs`

Spremlja stanje dostave poslanih sporočil (SMS, potisna obvestila, e-pošta).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Naloži dnevnike dostave po vrsti vsebine in ID-ju |
| GET | `/person/:personId` | JWT | — | Naloži dnevnike dostave za osebo. Izbirni filtri `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Naloži nedavne dnevnike dostave za cerkev. Izbirno `?limit=` (privzeto 100) |
| GET | `/:id` | JWT | — | Naloži dnevnik dostave po ID-ju |

## Sorodne strani

- [Arhitektura v realnem času](../../realtime.md) -- protokol WebSocket, naročanje na sobe in enotno ogrodje dostave
- [Spletna potisna obvestila](../../web-push.md) -- vpis in dostava potisnih obvestil v brskalniku
- [Končne točke članstva](./membership.md) -- osebe, skupine, vloge in osnovna identiteta
- [Končne točke udeležbe](./attendance.md) -- sledenje storitvam in obiskom
- [Avtentikacija in dovoljenja](./authentication.md) -- potek prijave, JWT, OAuth, model dovoljenj
- [Struktura modula](../module-structure.md) -- vzorci organizacije kode
