---
title: "Končne točke sporočil"
description: "Referenca za končne točke API-ja sporočil ChurchApps: pogovori, pravila dostopa do zapiskov, SMS-sporočila, predloge e-pošte, obvestila in naprave."
---

# Končne točke sporočil

<div class="article-intro">

Modul Sporočila upravlja pogovore v realnem času, sporočila v klepetu, potisna obvestila, dostavo SMS-sporočil in e-pošte, povezave WebSocket, zasebna sporočila, registracijo naprav in ponudnike za pošiljanje SMS-sporočil. Zagotavlja komunikacijsko plast, ki jo uporabljajo vse aplikacije ChurchApps, tako za klepet v živih prenosih kot za asinhrona obvestila.

</div>

**Osnovna pot:** `/messaging`

## Pogovori

Osnovna pot: `/messaging/conversations`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Naloži pogovore po ID-jih, ločenih z vejicami, s prvim in zadnjim sporočilom |
| GET | `/messages/:contentType/:contentId` | JWT | — | Naloži pogovore za vsebino s straničenimi sporočili (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Pridobi pogovore vrste objava za skupine trenutnega uporabnika |
| GET | `/posts/group/:groupId` | JWT | — | Pridobi pogovore vrste objava za določeno skupino |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Najnovejši zapiski iz vseh zapisov za stran Zapiski v storitvi B1 Admin. `section` je `people`, `groups`, `events` ali `workflows` (sicer 400); `limit` je privzeto 25 (največ 100); `before` je kazalec iz prejšnje strani. Vsak zapisek še vedno preveri pravilo svoje vrste (dovoljenje Osebe / Urejanje ali zaupni zapiski, voditelji skupine, gledalci dogodkov, gledalci kartic poteka dela), zato klicatelji vidijo samo zapiske, ki bi jih lahko odprli. Besedilo zapiska je skrajšano na 300 znakov |
| GET | `/current/:churchId/:contentType/:contentId` | Javno | — | Pridobi ali ustvari trenutni pogovor za vsebino (samodejno dešifrira contentId) |
| GET | `/:churchId/:contentType/:contentId` | Javno | — | Naloži pogovore po vrsti vsebine in ID-ju |
| GET | `/:churchId/:id` | Javno | — | Naloži posamezen pogovor po ID-ju |
| POST | `/` | JWT | — | Ustvari ali posodobi pogovore (paketno) |
| POST | `/start` | JWT | — | Začni nov pogovor z začetnim komentarjem |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši pogovor |

### Nadzor dostopa do zapiskov oseb

Pogovori z `contentType: "person"` (zavihek Zapiski na zapisu osebe) ali `contentType: "personConfidential"` (razdelek Zaupni zapiski) so zaščiteni pri vsakem branju in pisanju, vključno z zgoraj navedenimi javnimi potmi, ki za te vrste vsebine vrnejo `401`. Za `person` je potrebno dovoljenje MembershipApi **Osebe / Urejanje**; za `personConfidential` pa **Osebe / Ogled zaupnih zapiskov**. Pri API-jih ključih z omejenim obsegom `people:write` zajema obe dejanji (uporabnik ključa mora še vedno imeti temeljno dovoljenje vloge).

### Nadzor dostopa do zapiskov skupin in dogodkov {#group-and-event-notes-access-control}

Še dve vrsti zapiskov sta zaščiteni na enak način, pri vsakem branju in pisanju (vključno z zgoraj navedenimi javnimi potmi), in nikoli nista odprti za anonimno objavljanje:

- **`groupNote`** (`contentId` = ID skupine) -- zapiski **Zapiski voditeljev** na skupini. Brati ali objavljati lahko le voditelji te skupine (`leaderGroupIds` v JWT). Nobeno dovoljenje za osebje ne odpira dostopa, vključno z `content.edit` in dovoljenji za članstvo v skupini.
- **`eventNote`** (`contentId` = ID dogodka) -- zapiski na koledarskem dogodku. Osebje z `content.edit` ali **Koledarji / Skrbnik** lahko vedno bere in objavlja. Sicer dostop določata `notesViewRole` (branje) in `notesPostRole` (objavljanje) dogodka: `staff` (privzeto, uporabi se, ko je polje `null`) ne dovoli nikomur drugemu, `leaders` dovoli voditeljem skupine dogodka, `members` pa članom in voditeljem skupine dogodka. Dogodek brez `groupId` je dostopen samo osebju.

### Nadzor dostopa do zapiskov kartic poteka dela

Pogovori z `contentType: "workflowCard"` (zapiski na kartici poteka dela, kjer je `contentId` ID naloge kartice) so berljivi in zapisljivi samo za nekoga, ki lahko odpre to kartico: uporabnika z dovoljenjem DoingApi **Naloge / Ogled** ali osebo oziroma skupino, ki ji je kartica dodeljena, ki jo je ustvarila ali na katero se nanaša. Vsi drugi pri vsaki poti branja dobijo `401`, vključno z zgoraj navedenimi javnimi potmi. Pogovor kartice se pripne prek same kartice z `POST /doing/tasks/:id/conversation` (telo `{ "conversationId": "..." }`; prvi pripeti pogovor ostane). To lahko kličejo urejevalci kartice in njen nosilec.

### Primer: Začetek pogovora

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
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Naloži vsa sporočila za pogovor |
| GET | `/catchup/:churchId/:conversationId` | Javno | — | Naloži vsa sporočila za pogovor (javno nadaljevanje za klepet v živo) |
| GET | `/:churchId/:id` | Javno | — | Naloži posamezno sporočilo po ID-ju |
| POST | `/` | JWT | — | Shrani sporočila (paketno). Pošlje posodobitve v realnem času in sproži obvestila. Posodobitev obstoječega sporočila zahteva, da si avtor ali imaš `content.edit`; shranjenega avtorja ni mogoče nikoli preusmeriti na drugo osebo |
| POST | `/send` | Javno | — | Pošlji sporočila (paketno, javno). Pošlje posodobitve v realnem času prek WebSocket in sproži obvestila |
| POST | `/setCallout` | JWT | — | (zastarelo) V realnem času objavi opozorilo. Ni aktivnega odjemalca; klepet v živo opozoril ne prikazuje več |
| DELETE | `/:churchId/:id` | JWT | — | Izbriše sporočilo in v realnem času objavi brisanje. Glejte [Moderiranje sporočil](#message-moderation) |

### Moderiranje sporočil

Brisanje sporočila je dovoljeno za:

- avtorja sporočila;
- osebje z `content.edit` (kjerkoli v cerkvi);
- **voditelje skupin**, za pogovore z `contentType` `group` ali `groupAnnouncement`, katerih `contentId` je skupina, ki jo vodijo (`leaderGroupIds` v JWT).

Pogovorov o zapiskih oseb (`person` / `personConfidential`) voditelji nikoli ne moderirajo. Zanje veljajo dovoljenja za zapiske (`people.edit`, `people.viewConfidentialNotes`).

Voditelji lahko samo brišejo, ne urejajo. Prepisovanje sporočila drugega člana ostane omejeno na avtorja in osebje z `content.edit`.

### Primer: Pošlji sporočilo

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Naloži vsa zasebna sporočila za trenutnega uporabnika (vključuje zadnje sporočilo na pogovor in vse označi kot prebrana) |
| GET | `/existing/:personId` | JWT | — | Poišči obstoječ zasebni pogovor z določeno osebo |
| GET | `/:id` | JWT | — | Naloži zasebno sporočilo po ID-ju (počisti obvestilo, če je naslovljeno na trenutnega uporabnika) |
| POST | `/` | JWT | — | Pošlji zasebna sporočila (paketno). Sproži potisno obvestilo prejemniku |

## Obvestila

Osnovna pot: `/messaging/notifications`

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Pridobi število neprebranih obvestil za trenutnega uporabnika |
| GET | `/my` | JWT | — | Naloži vsa obvestila za trenutnega uporabnika (vse označi kot prebrana) |
| GET | `/tmpEmail` | Javno | — | Sproži dnevni povzetek e-poštnih obvestil (končna točka za odpravljanje napak/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Naloži obvestila za določeno osebo |
| GET | `/:churchId/:id` | JWT | — | Naloži obvestilo po ID-ju |
| POST | `/` | JWT | — | Ustvari ali posodobi obvestila (paketno) |
| POST | `/create` | JWT | — | Ustvari obvestila za več oseb. Telo: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Označi vsa obvestila osebe kot prebrana |
| POST | `/sendTest` | JWT | — | Pošlji testno potisno obvestilo. Telo: `{ personId, title }` |
| POST | `/ping` | Javno | — | Ustvari obvestilo iz zunanjega sprožilca. Telo: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Izbriše obvestilo |

### Primer: Ustvari obvestila

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
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Našteje kategorije obvestil s privzetimi in dovoljenimi kanali |
| GET | `/my` | JWT | — | Naloži nastavitve obvestil za trenutnega uporabnika (samodejno ustvari privzete, če še ne obstajajo) |
| POST | `/` | JWT | — | Shrani nastavitve trenutnega uporabnika. Telo: poljubno od `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, poleg neobveznega `overrides: [{ categoryKey, channel, optedIn }]` (kanal je lahko `push`, `email`, `in_app` ali `sms`; zaklenjene kategorije se prezrejo). `allowSms` je soglasje člana za besedilna opomnike. Še vedno je sprejeto staro telo v obliki polja vrstic |

## Povezave

Osnovna pot: `/messaging/connections`

Upravlja povezave WebSocket in povezave v realnem času za klepet, skupinske pogovore, zasebna sporočila in prenose v živo. Celoten protokol je opisan v [Arhitektura v realnem času](../../realtime.md).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Javno | — | Naloži vse povezave za pogovor |
| POST | `/` | Javno | — | Registriraj povezave (paketno). Sproži oddajo obiskovalcev za pogovor. Elementi telesa: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Javno | — | Posodobi prikazno ime za povezavo po ID-ju vtiča. Telo: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Javno | — | Odstrani povezavo iz pogovora. Sproži oddajo obiskovalcev |
| POST | `/tmpSendAlert` | Javno | — | Pošlji opozorilo o obvestilu na povezave osebe. Telo: `{ churchId, personId }` |

## Naprave

Osnovna pot: `/messaging/devices`

Upravlja registracijo naprav za potisna obvestila in povezovanje vsebine (npr. aplikacija Lessons na TV-zaslonih).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Vpiši ali posodobi napravo (registracija mobilnega potisnega obvestila). Ujema po žetonu FCM ali ID-ju naprave |
| POST | `/enrollAnon` | Javno | — | Vpiši anonimno napravo in ustvari 4-mestno kodo za povezavo |
| POST | `/` | Javno | — | Shrani naprave (paketno) |
| GET | `/pair/:pairingCode` | JWT | — | Poveži napravo s kodo za povezavo. Neobvezno `?contentType=&contentId=` za dodelitev vsebine |
| GET | `/status/:deviceId` | Javno | — | Preveri stanje povezave naprave |
| GET | `/:churchId` | JWT | — | Naloži vse naprave za cerkev |
| GET | `/:churchId/person/:personId` | JWT | — | Naloži vse naprave za osebo |
| GET | `/:churchId/:id` | JWT | — | Naloži napravo po ID-ju |
| DELETE | `/:churchId/:id` | JWT | — | Izbriši napravo |

### Primer: Vpiši napravo

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

## Vsebine naprav

Osnovna pot: `/messaging/devicecontents`

Upravlja dodelitve vsebine za povezane naprave (npr. katera lekcija se prikazuje na TV-ju).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Naloži dodelitve vsebine za napravo |
| POST | `/` | JWT | — | Shrani dodelitve vsebine naprav (paketno) |
| DELETE | `/:id` | JWT | — | Izbriši dodelitev vsebine naprave |

## Besedilna sporočila

Osnovna pot: `/messaging/texting`

Upravlja ponudnike SMS-sporočil, skupinsko pošiljanje besedilnih sporočil in sledenje dostave.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Naloži ponudnike besedilnih sporočil za cerkev (poverilnice so skrite) |
| GET | `/status` | JWT | — | `{ enabled }` -- ali ima cerkev omogočenega ponudnika besedilnih sporočil. Vsak prijavljen uporabnik cerkve; uporablja se za prikaz možnosti **Besedilo** samo takrat, ko je mogoče poslati sporočila |
| GET | `/inboundUrl` | JWT | `texting.send` ali `settings.edit` | `{ url }` -- URL za dohodni webhook (STOP) cerkve, ki ga prilepite v ponudnika |
| POST | `/inbound/:churchId/:token` | Javno | — | Webhook za dohodna sporočila ponudnika. `token` je HMAC ID-ja cerkve. Odgovor, ki je točno ena od ključnih besed za odjavo (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), označi vsako ustrezno osebo kot `optedOut` in izklopi njeno `allowSms`. Vrne `{ optedOut: <count> }`; drugi odgovori vrnejo `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Predogled prejemnikov skupinskega besedila (število upravičenih, odjavljenih in brez telefonske številke) |
| GET | `/sent` | JWT | — | Naloži vse zapise poslanih besedilnih sporočil za cerkev |
| GET | `/sent/:id/details` | JWT | — | Naloži poslano besedilo z dnevniki dostave za posameznega prejemnika |
| POST | `/providers` | JWT | — | Shrani ponudnike besedilnih sporočil (paketno). Šifrira API poverilnice |
| POST | `/send` | JWT | — | Pošlji SMS vsem upravičenim članom skupine. Telo: `{ groupId, message }`. Polja za združevanje (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se razrešijo za vsakega prejemnika |
| POST | `/sendPerson` | JWT | — | Pošlji SMS posamezni osebi. Telo: `{ personId, phoneNumber, message }`. Polja za združevanje se razrešijo, zabeleži pa se razrešeno besedilo |
| DELETE | `/providers/:id` | JWT | — | Izbriši ponudnika besedilnih sporočil |

### Primer: Pošlji skupinsko besedilo

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
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Naloži vse predloge e-pošte za cerkev |
| GET | `/:id` | JWT | — | Naloži posamezno predlogo e-pošte po ID-ju |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ali `tasks.admin` | Stanje e-poštnega pošiljanja skupin za cerkev: `{ approved, paused, remaining, requested }`. Pogovorno okno B1Admin Pošlji e-pošto in dejanje poteka dela **Pošlji e-pošto** ju uporabljata za opozorilo, kadar e-pošta ne bo odšla |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Prosi podporo za odobritev cerkve za e-pošto skupin (največ enkrat na cerkev na teden) |
| GET | `/preview/:groupId` | JWT | — | Predogled dostave e-pošte za skupino (število upravičenih prejemnikov, člani brez e-poštnega naslova) |
| POST | `/` | JWT | — | Ustvari ali posodobi predloge e-pošte (paketno) |
| POST | `/send` | JWT | — | Pošlji predlogo e-pošte vsem članom skupine. Telo: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Izbriši predlogo e-pošte |

### Primer: Pošlji e-pošto skupini

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

**Podprta polja za združevanje:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Blokirani IP-ji

Osnovna pot: `/messaging/blockedips`

(zastarelo) Blokiranje IP-jev za klepet prenosov v živo. Odjemalec B1App več ne kliče `POST /` -- blokiranje IP-jev je bilo odstranjeno med migracijo na enotno dostavo. Pot `/clear` še vedno kliče strežnik-strežniku `StreamingServiceController`, ko se storitve prenosa shranijo.

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (zastarelo) Shrani blokirane IP-je (paketno). Ni aktivnega odjemalca |
| POST | `/clear` | JWT | — | Počisti vse blokirane IP-je za določene storitve. Telo: `[{ serviceId, churchId }]` |

## Dnevniki dostave

Osnovna pot: `/messaging/deliverylogs`

Sledi stanju dostave poslanih sporočil (SMS, potisna obvestila, e-pošta).

| Metoda | Pot | Avtentikacija | Dovoljenje | Opis |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Naloži dnevnike dostave po vrsti in ID-ju vsebine |
| GET | `/person/:personId` | JWT | — | Naloži dnevnike dostave za osebo. Neobvezna filtra `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Naloži nedavne dnevnike dostave za cerkev. Neobvezno `?limit=` (privzeto 100) |
| GET | `/:id` | JWT | — | Naloži dnevnik dostave po ID-ju |

## Sorodne strani

- [Arhitektura v realnem času](../../realtime.md) -- protokol WebSocket, naročnine na sobe in enotno ogrodje za dostavo
- [Potisna obvestila v brskalniku](../../web-push.md) -- vpis in dostava potisnih obvestil v brskalniku
- [Končne točke članstva](./membership.md) -- osebe, skupine, vloge in osnovna identiteta
- [Končne točke obiskovanja](./attendance.md) -- sledenje storitvam in obiskom
- [Avtentikacija in dovoljenja](./authentication.md) -- potek prijave, JWT, OAuth in model dovoljenj
- [Struktura modula](../module-structure.md) -- vzorci organizacije kode
