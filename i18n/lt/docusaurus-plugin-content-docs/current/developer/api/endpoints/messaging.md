---
title: "Žinučių galutiniai taškai"
---

# Žinučių galutiniai taškai

<div class="article-intro">

Žinučių modulis valdo tiesioginius pokalbius, pokalbių žinutes, įrenginių pranešimus, SMS ir el. laiškų siuntimą, WebSocket ryšius, privačias žinutes, įrenginių registraciją ir SMS paslaugų teikėjus. Jis teikia ryšio sluoksnį, kurį visos ChurchApps programėlės naudoja tiek tiesioginiam transliacijos pokalbiui, tiek asinchroniniams pranešimams.

</div>

**Bazinis kelias:** `/messaging`

## Pokalbiai

Bazinis kelias: `/messaging/conversations`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/timeline/ids?ids=` | JWT | — | Įkelia pokalbius pagal kableliais atskirtus ID su pirmąja ir paskutine žinute |
| GET | `/messages/:contentType/:contentId` | JWT | — | Įkelia turiniui priskirtus pokalbius su puslapiais žinučių (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Gauna dabartinio vartotojo grupių įrašų tipo pokalbius |
| GET | `/posts/group/:groupId` | JWT | — | Gauna konkrečios grupės įrašų tipo pokalbius |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Naujausios pastabos iš visų įrašų B1 Admin pastabų puslapiui. `section` gali būti `people`, `groups`, `events` arba `workflows` (kitu atveju 400); `limit` pagal numatytuosius yra 25 (daugiausia 100); `before` yra ankstesnio puslapio žymeklis. Kiekviena pastaba vis dar tikrinama pagal savo tipo taisyklę (asmenų redagavimo / konfidencialių pastabų leidimas, grupės vadovai, renginių peržiūrėtojai, darbo eigos kortelių peržiūrėtojai), todėl iškvietėjai mato tik tas pastabas, kurias galėtų atidaryti. Pastabos tekstas sutrumpinamas iki 300 simbolių |
| GET | `/current/:churchId/:contentType/:contentId` | Viešas | — | Gauna arba sukuria dabartinį turinio pokalbį (automatiškai iššifruoja contentId) |
| GET | `/:churchId/:contentType/:contentId` | Viešas | — | Įkelia pokalbius pagal turinio tipą ir ID |
| GET | `/:churchId/:id` | Viešas | — | Įkelia vieną pokalbį pagal ID |
| POST | `/` | JWT | — | Sukuria arba atnaujina pokalbius (paketu) |
| POST | `/start` | JWT | — | Pradeda naują pokalbį su pirmine komentaro žinute |
| DELETE | `/:churchId/:id` | JWT | — | Ištrina pokalbį |

### Asmenų pastabų prieigos valdymas

Pokalbiai su `contentType: "person"` (skirtukas Pastabos asmens įraše) arba `contentType: "personConfidential"` (skyrius Konfidencialios pastabos) yra kontroliuojami kiekviename skaitymo ir rašymo kelyje, įskaitant aukščiau nurodytus viešus maršrutus, kurie šiems turinio tipams grąžina `401`. `person` reikalauja MembershipApi leidimo **People / Edit** (Asmenys / Redagavimas); `personConfidential` reikalauja **People / View Confidential Notes** (Asmenys / Peržiūrėti konfidencialias pastabas). Ribotų API raktų atveju `people:write` apima abu veiksmus (raktui priskirtas vartotojas vis tiek turi turėti pagrindinį vaidmens leidimą).

### Grupės ir renginio pastabų prieigos valdymas {#group-and-event-notes-access-control}

Dar du pastabų turinio tipai kontroliuojami taip pat, kiekviename skaitymo ir rašymo kelyje (įskaitant aukščiau nurodytus viešus maršrutus), ir niekada nėra atviri anoniminiam rašymui:

- **`groupNote`** (`contentId` = grupės ID) -- grupės **Vadovų pastabų** srautas. Tik tos grupės vadovai (`leaderGroupIds` JWT) gali skaityti arba rašyti. Jokie personalo leidimai nesuteikia prieigos, įskaitant `content.edit` ir grupės narystės leidimus.
- **`eventNote`** (`contentId` = renginio ID) -- kalendoriaus renginio pastabos. Personalas su `content.edit` arba **Calendars / Admin** (Kalendoriai / Administravimas) visada gali skaityti ir rašyti. Kitais atvejais prieiga priklauso nuo renginio `notesViewRole` (skaitymas) ir `notesPostRole` (rašymas): `staff` (numatytasis, naudojamas, kai laukas yra `null`) neleidžia niekam kitam, `leaders` leidžia renginio grupės vadovams, o `members` leidžia renginio grupės nariams ir vadovams. Renginys be `groupId` yra prieinamas tik personalui.

### Darbo eigos kortelių pastabų prieigos valdymas

Pokalbius su `contentType: "workflowCard"` (darbo eigos kortelės pastabos, kur `contentId` yra kortelės užduoties ID) gali skaityti ir rašyti tik tas, kas gali atidaryti tą kortelę: vartotojas su DoingApi leidimu **Tasks / View** (Užduotys / Peržiūra), arba asmuo ar grupė, kuriems kortelė priskirta, kurią sukūrė arba apie kurią ji yra. Visi kiti gauna `401` kiekviename skaitymo kelyje, įskaitant aukščiau nurodytus viešus maršrutus. Kortelės pokalbis prijungiamas per pačią kortelę su `POST /doing/tasks/:id/conversation` (turinys `{ "conversationId": "..." }`; pirmasis prijungtas pokalbis lieka), ir tai gali iškviesti kortelės redaktoriai bei jos vykdytojas.

### Pavyzdys: pradėti pokalbį

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

## Žinutės

Bazinis kelias: `/messaging/messages`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/conversation/:conversationId` | JWT | — | Įkelia visas pokalbio žinutes |
| GET | `/catchup/:churchId/:conversationId` | Viešas | — | Įkelia visas pokalbio žinutes (viešas atsiliepimas tiesioginiam pokalbiui) |
| GET | `/:churchId/:id` | Viešas | — | Įkelia vieną žinutę pagal ID |
| POST | `/` | JWT | — | Išsaugo žinutes (paketu). Siunčia atnaujinimus realiuoju laiku ir inicijuoja pranešimus. Esamos žinutės atnaujinimui reikia būti jos autoriumi arba turėti `content.edit`; išsaugotas autorius niekada negali būti pakeistas |
| POST | `/send` | Viešas | — | Siunčia žinutes (paketu, viešai). Siunčia atnaujinimus realiuoju laiku per WebSocket ir inicijuoja pranešimus |
| POST | `/setCallout` | JWT | — | (pasenęs) Transliuoja pastabos žinutę realiuoju laiku. Nėra aktyvaus kliento; tiesioginės transliacijos pokalbis nebeatvaizduoja pastabų |
| DELETE | `/:churchId/:id` | JWT | — | Ištrina žinutę ir realiuoju laiku transliuoja trynimą. Žr. [Pranešimų moderavimas](#message-moderation) |

### Pranešimų moderavimas

Žinutę galima ištrinti:

- žinutės autoriui;
- personalui su `content.edit` (bet kur bažnyčioje);
- **grupių vadovams**, pokalbiams, kurių `contentType` yra `group` arba `groupAnnouncement` ir kurių `contentId` yra grupė, kuriai jie vadovauja (`leaderGroupIds` JWT).

Asmenų pastabų pokalbiai (`person` / `personConfidential`) niekada nemoderuojami vadovų -- jiems taikomi pastabų leidimai (`people.edit`, `people.viewConfidentialNotes`).

Vadovai gali tik ištrinti, o ne redaguoti: kito nario žinutės perrašymas lieka apribotas autoriui ir personalui su `content.edit`.

### Pavyzdys: išsiųsti žinutę

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

## Privačios žinutės

Bazinis kelias: `/messaging/privatemessages`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Įkelia visas dabartinio vartotojo privačias žinutes (įskaitant paskutinę žinutę kiekviename pokalbyje, pažymi visas kaip perskaitytas) |
| GET | `/existing/:personId` | JWT | — | Suranda esamą privatų pokalbį su konkrečiu asmeniu |
| GET | `/:id` | JWT | — | Įkelia privačią žinutę pagal ID (panaikina pranešimą, jei ji adresuota dabartiniam vartotojui) |
| POST | `/` | JWT | — | Siunčia privačias žinutes (paketu). Gavėjui inicijuoja įrenginio pranešimą |

## Pranešimai

Bazinis kelias: `/messaging/notifications`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/unreadCount` | JWT | — | Gauna neperskaitytų pranešimų skaičių dabartiniam vartotojui |
| GET | `/my` | JWT | — | Įkelia visus dabartinio vartotojo pranešimus (pažymi visus kaip perskaitytus) |
| GET | `/tmpEmail` | Viešas | — | Inicijuoja kasdienį el. laiškų pranešimų apibendrinimą (derinimo / cron galutinis taškas) |
| GET | `/:churchId/person/:personId` | JWT | — | Įkelia konkretaus asmens pranešimus |
| GET | `/:churchId/:id` | JWT | — | Įkelia pranešimą pagal ID |
| POST | `/` | JWT | — | Sukuria arba atnaujina pranešimus (paketu) |
| POST | `/create` | JWT | — | Sukuria pranešimus keliems asmenims. Turinys: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Pažymi visus asmens pranešimus kaip perskaitytus |
| POST | `/sendTest` | JWT | — | Siunčia bandomąjį įrenginio pranešimą. Turinys: `{ personId, title }` |
| POST | `/ping` | Viešas | — | Sukuria pranešimą iš išorinio paleidiklio. Turinys: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Ištrina pranešimą |

### Pavyzdys: sukurti pranešimus

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

## Pranešimų nustatymai

Bazinis kelias: `/messaging/notificationpreferences`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/categories` | JWT | — | Išvardija pranešimų kategorijas su jų numatytaisiais ir leidžiamais kanalais |
| GET | `/my` | JWT | — | Įkelia dabartinio vartotojo pranešimų nustatymus (automatiškai sukuria numatytuosius, jei jų nėra) |
| POST | `/` | JWT | — | Išsaugo dabartinio vartotojo nustatymus. Turinys: bet kuris iš `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plius pasirinktinis `overrides: [{ categoryKey, channel, optedIn }]` (kanalas gali būti `push`, `email`, `in_app` arba `sms`; užrakintos kategorijos ignoruojamos). `allowSms` yra nario sutikimas gauti teksto priminimus. Vis dar priimamas senas eilučių masyvo turinys |

## Ryšiai

Bazinis kelias: `/messaging/connections`

Valdo WebSocket / realaus laiko ryšius pokalbiams, grupių pokalbiams, privačioms žinutėms ir tiesioginei transliacijai. Visą protokolą žr. [Realaus laiko architektūra](../../realtime).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/:churchId/:conversationId` | Viešas | — | Įkelia visus pokalbio ryšius |
| POST | `/` | Viešas | — | Registruoja ryšius (paketu). Inicijuoja lankomumo transliaciją pokalbyje. Turinio elementai: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Viešas | — | Atnaujina ryšio rodomą vardą pagal socket ID. Turinys: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Viešas | — | Pašalina ryšį iš pokalbio. Inicijuoja lankomumo transliaciją |
| POST | `/tmpSendAlert` | Viešas | — | Siunčia pranešimo įspėjimą asmens ryšiams. Turinys: `{ churchId, personId }` |

## Įrenginiai

Bazinis kelias: `/messaging/devices`

Valdo įrenginių registraciją įrenginių pranešimams ir turinio susiejimui (pvz., Lessons programėlė TV ekranuose).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| POST | `/enroll` | JWT | — | Registruoja arba atnaujina įrenginį (mobiliojo įrenginio pranešimų registracija). Atitikimas pagal FCM žetoną arba įrenginio ID |
| POST | `/enrollAnon` | Viešas | — | Registruoja anoniminį įrenginį ir sugeneruoja 4 simbolių susiejimo kodą |
| POST | `/` | Viešas | — | Išsaugo įrenginius (paketu) |
| GET | `/pair/:pairingCode` | JWT | — | Susieja įrenginį naudojant jo susiejimo kodą. Pasirinktinis `?contentType=&contentId=` turiniui priskirti |
| GET | `/status/:deviceId` | Viešas | — | Patikrina įrenginio susiejimo būseną |
| GET | `/:churchId` | JWT | — | Įkelia visus bažnyčios įrenginius |
| GET | `/:churchId/person/:personId` | JWT | — | Įkelia visus asmens įrenginius |
| GET | `/:churchId/:id` | JWT | — | Įkelia įrenginį pagal ID |
| DELETE | `/:churchId/:id` | JWT | — | Ištrina įrenginį |

### Pavyzdys: registruoti įrenginį

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

## Įrenginių turinys

Bazinis kelias: `/messaging/devicecontents`

Valdo turinio priskyrimus susietiems įrenginiams (pvz., kuri pamoka rodoma TV).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/deviceId/:deviceId` | JWT | — | Įkelia įrenginio turinio priskyrimus |
| POST | `/` | JWT | — | Išsaugo įrenginio turinio priskyrimus (paketu) |
| DELETE | `/:id` | JWT | — | Ištrina įrenginio turinio priskyrimą |

## SMS žinutės

Bazinis kelias: `/messaging/texting`

Valdo SMS paslaugų teikėjus, grupinį teksto siuntimą ir pristatymo sekimą.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/providers` | JWT | — | Įkelia bažnyčios SMS teikėjus (prisijungimo duomenys paslepiami) |
| GET | `/status` | JWT | — | `{ enabled }` -- ar bažnyčia turi įjungtą SMS teikėją. Bet kuris prisijungęs bažnyčios vartotojas; naudojama rodyti **Tekstas** parinktims tik tada, kai žinutes galima siųsti |
| GET | `/inboundUrl` | JWT | `texting.send` arba `settings.edit` | `{ url }` -- bažnyčios gaunamųjų (STOP) webhook URL, kurį reikia įklijuoti teikėjui |
| POST | `/inbound/:churchId/:token` | Viešas | — | Teikėjo gaunamų žinučių webhook. `token` yra bažnyčios ID HMAC. Atsakymas, kuris yra tiksliai stabdymo žodis (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), pažymi kiekvieną atitinkamą asmenį `optedOut` ir išjungia jų `allowSms`. Grąžina `{ optedOut: <count> }`; kiti atsakymai grąžina `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Peržiūri grupės teksto gavėjus (tinkami, atsisakę, be telefono numerio skaičiai) |
| GET | `/sent` | JWT | — | Įkelia visus bažnyčios išsiųstų teksto žinučių įrašus |
| GET | `/sent/:id/details` | JWT | — | Įkelia išsiųstą tekstą su kiekvieno gavėjo pristatymo žurnalais |
| POST | `/providers` | JWT | — | Išsaugo SMS teikėjus (paketu). Šifruoja API prisijungimo duomenis |
| POST | `/send` | JWT | — | Siunčia SMS visiems tinkamiems grupės nariams. Turinys: `{ groupId, message }`. Sujungimo laukai (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) išsprendžiami kiekvienam gavėjui |
| POST | `/sendPerson` | JWT | — | Siunčia SMS vienam asmeniui. Turinys: `{ personId, phoneNumber, message }`. Sujungimo laukai išsprendžiami, o išspręstas tekstas įrašomas į žurnalą |
| DELETE | `/providers/:id` | JWT | — | Ištrina SMS teikėją |

### Pavyzdys: siųsti grupinę žinutę

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

## El. laiškų šablonai

Bazinis kelias: `/messaging/emailTemplates`

Valdo daugkartinio naudojimo el. laiškų šablonus ir šablonų laiškų siuntimą grupėms.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Įkelia visus bažnyčios el. laiškų šablonus |
| GET | `/:id` | JWT | — | Įkelia vieną el. laiškų šabloną pagal ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` arba `tasks.admin` | Bažnyčios grupės el. laiškų būsena: `{ approved, paused, remaining, requested }`. B1Admin dialogo Siųsti el. laišką ir darbo eigos veiksmas **Siųsti el. laišką** ją naudoja, kad įspėtų, kai laiškas nebus išsiųstas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Prašo palaikymo komandos patvirtinti bažnyčią grupių el. laiškams (ne daugiau kaip kartą per savaitę kiekvienai bažnyčiai) |
| GET | `/preview/:groupId` | JWT | — | Peržiūri grupės el. laiškų pristatymą (tinkamų gavėjų skaičius, nariai be el. pašto) |
| POST | `/` | JWT | — | Sukuria arba atnaujina el. laiškų šablonus (paketu) |
| POST | `/send` | JWT | — | Siunčia šabloninį el. laišką visiems grupės nariams. Turinys: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Ištrina el. laiškų šabloną |

### Pavyzdys: siųsti el. laišką grupei

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

**Palaikomi sujungimo laukai:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Užblokuoti IP adresai

Bazinis kelias: `/messaging/blockedips`

(pasenęs) IP blokavimas tiesioginiam transliacijos pokalbiui. B1App klientas nebeiškviečia `POST /` -- IP blokavimas buvo pašalintas vienoje pristatymo migracijoje. Maršrutą `/clear` serveris į serverį vis dar iškviečia `StreamingServiceController`, kai išsaugomos transliacijos paslaugos.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| POST | `/` | JWT | — | (pasenęs) Išsaugo užblokuotus IP adresus (paketu). Nėra aktyvaus kliento |
| POST | `/clear` | JWT | — | Išvalo visus užblokuotus IP adresus konkrečioms paslaugoms. Turinys: `[{ serviceId, churchId }]` |

## Pristatymo žurnalai

Bazinis kelias: `/messaging/deliverylogs`

Seka išsiųstų žinučių (SMS, įrenginių pranešimų, el. laiškų) pristatymo būseną.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------|------|------|
| GET | `/content/:contentType/:contentId` | JWT | — | Įkelia pristatymo žurnalus pagal turinio tipą ir ID |
| GET | `/person/:personId` | JWT | — | Įkelia asmens pristatymo žurnalus. Pasirinktiniai filtrai `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Įkelia bažnyčios naujausius pristatymo žurnalus. Pasirinktinis `?limit=` (numatytasis 100) |
| GET | `/:id` | JWT | — | Įkelia pristatymo žurnalą pagal ID |

## Susiję puslapiai

- [Realaus laiko architektūra](../../realtime) -- WebSocket protokolas, kambarių prenumeratos ir vieningas pristatymo sistemos karkasas
- [Web Push pranešimai](../../web-push) -- Naršyklės pranešimų registracija ir pristatymas
- [Narystės galutiniai taškai](./membership) -- Asmenys, grupės, vaidmenys ir pagrindinė tapatybė
- [Lankomumo galutiniai taškai](./attendance) -- Pamaldų ir apsilankymų sekimas
- [Autentifikacija ir leidimai](./authentication) -- Prisijungimo srautas, JWT, OAuth, leidimų modelis
- [Modulio struktūra](../module-structure) -- Kodo organizavimo modeliai
