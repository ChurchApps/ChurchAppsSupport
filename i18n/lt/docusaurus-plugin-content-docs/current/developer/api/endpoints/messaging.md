---
title: "Pranešimų galutiniai taškai"
description: "ChurchApps pranešimų API galutinių taškų žinynas: pokalbiai, pastabų prieigos taisyklės, teksto žinutės, el. laiškų šablonai, pranešimai ir įrenginiai."
---

# Pranešimų galutiniai taškai

<div class="article-intro">

Pranešimų modulis valdo realaus laiko pokalbius, žinutes, push pranešimus, SMS ir el. laiškų siuntimą, WebSocket ryšius, privačias žinutes, įrenginių registraciją ir teksto siuntimo tiekėjus. Jis teikia komunikacijos sluoksnį, naudojamą visose ChurchApps programose tiek tiesioginio transliacijos pokalbiams, tiek asinchroniniams pranešimams.

</div>

**Bazinis kelias:** `/messaging`

## Pokalbiai

Bazinis kelias: `/messaging/conversations`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Įkelti pokalbius pagal kableliais atskirtus ID su pirma ir paskutine žinute |
| GET | `/messages/:contentType/:contentId` | JWT | — | Įkelti turinio pokalbius su puslapiuojamomis žinutėmis (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Gauti einamojo vartotojo grupių įrašų tipo pokalbius |
| GET | `/posts/group/:groupId` | JWT | — | Gauti konkrečios grupės įrašų tipo pokalbius |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Naujausios pastabos iš visų įrašų B1 Admin pastabų puslapiui. `section` yra `people`, `groups`, `events` arba `workflows` (kitu atveju 400); `limit` pagal numatytuosius 25 (maks. 100); `before` yra ankstesnio puslapio žymeklis. Kiekviena pastaba vis tiek atitinka savo tipo taisyklę (People Edit / konfidencialių pastabų leidimas, grupės vadovai, renginių peržiūrėtojai, darbo eigos kortelių peržiūrėtojai), todėl iškviečiantieji mato tik tas pastabas, kurias galėtų atverti. Pastabos tekstas sutrumpinamas iki 300 simbolių |
| GET | `/current/:churchId/:contentType/:contentId` | Viešas | — | Gauti arba sukurti dabartinį turinio pokalbį (automatiškai iššifruoja contentId) |
| GET | `/:churchId/:contentType/:contentId` | Viešas | — | Įkelti pokalbius pagal turinio tipą ir ID |
| GET | `/:churchId/:id` | Viešas | — | Įkelti vieną pokalbį pagal ID |
| POST | `/` | JWT | — | Sukurti arba atnaujinti pokalbius (paketu) |
| POST | `/start` | JWT | — | Pradėti naują pokalbį su pradine komentaro žinute |
| DELETE | `/:churchId/:id` | JWT | — | Ištrinti pokalbį |

### Asmens pastabų prieigos valdymas

Pokalbiai su `contentType: "person"` (skirtukas Pastabos asmens įraše) arba `contentType: "personConfidential"` (skyrius Konfidencialios pastabos) yra apriboti kiekviename skaitymo ir rašymo kelyje, įskaitant aukščiau nurodytus viešus maršrutus, kurie šiems turinio tipams grąžina `401`. `person` reikalauja MembershipApi leidimo **People / Edit**; `personConfidential` reikalauja **People / View Confidential Notes**. Apribotiesiems API raktams `people:write` apima abu veiksmus (rakto vartotojas vis tiek turi turėti pagrindinį vaidmens leidimą).

### Grupės ir renginio pastabų prieigos valdymas {#group-and-event-notes-access-control}

Dar du pastabų turinio tipai apribojami tokiu pačiu būdu kiekviename skaitymo ir rašymo kelyje (įskaitant aukščiau nurodytus viešus maršrutus) ir niekada neatviri anoniminiam skelbimui:

- **`groupNote`** (`contentId` = grupės ID) -- grupės **Vadovų pastabų** srautas. Skaityti arba skelbti gali tik tos grupės vadovai (`leaderGroupIds` JWT). Jokia personalo teisė nesuteikia prieigos, įskaitant `content.edit` ir grupių narystės leidimus.
- **`eventNote`** (`contentId` = renginio ID) -- pastabos kalendoriaus renginyje. Personalas su `content.edit` arba **Calendars / Admin** visada gali skaityti ir skelbti. Kitais atvejais prieiga priklauso nuo renginio `notesViewRole` (skaitymui) ir `notesPostRole` (skelbimui): `staff` (numatytoji, naudojama, kai laukas yra `null`) neleidžia niekam kitam, `leaders` leidžia renginio grupės vadovams, o `members` leidžia renginio grupės nariams ir vadovams. Renginys be `groupId` pasiekiamas tik personalui.

### Darbo eigos kortelės pastabų prieigos valdymas

Pokalbius su `contentType: "workflowCard"` (darbo eigos kortelės pastabos, kur `contentId` yra kortelės užduoties ID) gali skaityti ir redaguoti tik tie, kurie gali atverti tą kortelę: vartotojas, turintis DoingApi leidimą **Tasks / View**, arba asmuo ar grupė, kuriai kortelė priskirta, kurią sukūrė arba kuri su ja susijusi. Visi kiti gauna `401` kiekviename skaitymo kelyje, įskaitant aukščiau nurodytus viešus maršrutus. Kortelės pokalbis pridedamas per pačią kortelę su `POST /doing/tasks/:id/conversation` (turinys `{ "conversationId": "..." }`; pirmasis pridėtas pokalbis lieka), ir tai gali iškviesti kortelės redaktoriai bei jos vykdytojas.

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
|--------|------|------------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Įkelti visas pokalbio žinutes |
| GET | `/catchup/:churchId/:conversationId` | Viešas | — | Įkelti visas pokalbio žinutes (viešas atsivijimas tiesioginiam pokalbiui) |
| GET | `/:churchId/:id` | Viešas | — | Įkelti vieną žinutę pagal ID |
| POST | `/` | JWT | — | Išsaugoti žinutes (paketu). Siunčia realaus laiko atnaujinimus ir paleidžia pranešimus. Esamos žinutės atnaujinimui reikia būti jos autoriumi arba turėti `content.edit`; saugomo autoriaus negalima perskirti |
| POST | `/send` | Viešas | — | Siųsti žinutes (paketu, viešai). Siunčia realaus laiko atnaujinimus per WebSocket ir paleidžia pranešimus |
| POST | `/setCallout` | JWT | — | (pasenęs) Transliuoti iškėlimo žinutę realiuoju laiku. Nėra aktyvaus kliento; tiesioginio transliavimo pokalbis nebeatvaizduoja iškėlimų |
| DELETE | `/:churchId/:id` | JWT | — | Ištrinti žinutę ir realiuoju laiku transliuoti ištrynimą. Žr. [Žinučių moderavimas](#message-moderation) |

### Žinučių moderavimas

Žinutę galima ištrinti:

- žinutės autoriui;
- personalui su `content.edit` (visoje bažnyčioje);
- **grupių vadovams** pokalbiams, kurių `contentType` yra `group` arba `groupAnnouncement` ir kurių `contentId` yra grupė, kurią jie vadovauja (`leaderGroupIds` JWT).

Asmens pastabų pokalbių (`person` / `personConfidential`) vadovai nemoderuoja — jiems taikomi pastabų leidimai (`people.edit`, `people.viewConfidentialNotes`).

Vadovai gali tik ištrinti, bet ne redaguoti: kito nario žinutės perrašymas lieka apribotas autoriui ir `content.edit` personalui.

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
|--------|------|------------|------------|-------------|
| GET | `/` | JWT | — | Įkelti visas einamojo vartotojo privačias žinutes (įtraukia paskutinę žinutę kiekviename pokalbyje, visas pažymi kaip perskaitytas) |
| GET | `/existing/:personId` | JWT | — | Rasti esamą privatų pokalbį su konkrečiu asmeniu |
| GET | `/:id` | JWT | — | Įkelti privačią žinutę pagal ID (išvalo pranešimą, jei adresuota einamajam vartotojui) |
| POST | `/` | JWT | — | Siųsti privačias žinutes (paketu). Paleidžia push pranešimą gavėjui |

## Pranešimai

Bazinis kelias: `/messaging/notifications`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Gauti neperskaitytų pranešimų skaičių einamajam vartotojui |
| GET | `/my` | JWT | — | Įkelti visus einamojo vartotojo pranešimus (visus pažymi kaip perskaitytus) |
| GET | `/tmpEmail` | Viešas | — | Paleisti kasdienę el. pašto pranešimų apžvalgą (derinimo / cron galutinis taškas) |
| GET | `/:churchId/person/:personId` | JWT | — | Įkelti konkretaus asmens pranešimus |
| GET | `/:churchId/:id` | JWT | — | Įkelti pranešimą pagal ID |
| POST | `/` | JWT | — | Sukurti arba atnaujinti pranešimus (paketu) |
| POST | `/create` | JWT | — | Sukurti pranešimus keliems asmenims. Turinys: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Pažymėti visus asmens pranešimus kaip perskaitytus |
| POST | `/sendTest` | JWT | — | Siųsti bandomąjį push pranešimą. Turinys: `{ personId, title }` |
| POST | `/ping` | Viešas | — | Sukurti pranešimą iš išorinio paleidiklio. Turinys: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Ištrinti pranešimą |

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

## Pranešimų nuostatos

Bazinis kelias: `/messaging/notificationpreferences`

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/categories` | JWT | — | Išvardyti pranešimų kategorijas su jų numatytaisiais ir leidžiamais kanalais |
| GET | `/my` | JWT | — | Įkelti einamojo vartotojo pranešimų nuostatas (automatiškai sukuria numatytąsias, jei jų nėra) |
| POST | `/` | JWT | — | Išsaugoti einamojo vartotojo nuostatas. Turinys: bet kuris iš `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, be to, neprivaloma `overrides: [{ categoryKey, channel, optedIn }]` (kanalas gali būti `push`, `email`, `in_app` arba `sms`; užrakintos kategorijos ignoruojamos). `allowSms` yra nario sutikimas gauti tekstinius priminimus. Vis dar priimamas senasis eilučių masyvo turinys |

## Ryšiai

Bazinis kelias: `/messaging/connections`

Valdo WebSocket / realaus laiko ryšius pokalbiams, grupių pokalbiams, privačioms žinutėms ir tiesioginiam transliavimui. Visą protokolą žr. [Realaus laiko architektūra](../../realtime.md).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/:churchId/:conversationId` | Viešas | — | Įkelti visus pokalbio ryšius |
| POST | `/` | Viešas | — | Registruoti ryšius (paketu). Paleidžia dalyvavimo transliaciją pokalbyje. Turinio elementai: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Viešas | — | Atnaujinti ryšio rodomą vardą pagal socket ID. Turinys: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Viešas | — | Pašalinti ryšį iš pokalbio. Paleidžia dalyvavimo transliaciją |
| POST | `/tmpSendAlert` | Viešas | — | Siųsti pranešimo įspėjimą asmens ryšiams. Turinys: `{ churchId, personId }` |

## Įrenginiai

Bazinis kelias: `/messaging/devices`

Valdo įrenginių registraciją push pranešimams ir turinio susiejimą (pvz., Lessons programėlę televizijos ekranuose).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| POST | `/enroll` | JWT | — | Įtraukti arba atnaujinti įrenginį (mobiliojo push registracija). Atitinka pagal FCM žetoną arba įrenginio ID |
| POST | `/enrollAnon` | Viešas | — | Įtraukti anonimišką įrenginį ir sugeneruoti 4 simbolių susiejimo kodą |
| POST | `/` | Viešas | — | Išsaugoti įrenginius (paketu) |
| GET | `/pair/:pairingCode` | JWT | — | Susieti įrenginį naudojant jo susiejimo kodą. Neprivalomi `?contentType=&contentId=` turiniui priskirti |
| GET | `/status/:deviceId` | Viešas | — | Patikrinti įrenginio susiejimo būseną |
| GET | `/:churchId` | JWT | — | Įkelti visus bažnyčios įrenginius |
| GET | `/:churchId/person/:personId` | JWT | — | Įkelti visus asmens įrenginius |
| GET | `/:churchId/:id` | JWT | — | Įkelti įrenginį pagal ID |
| DELETE | `/:churchId/:id` | JWT | — | Ištrinti įrenginį |

### Pavyzdys: įtraukti įrenginį

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

## Įrenginio turinys

Bazinis kelias: `/messaging/devicecontents`

Valdo turinio priskyrimus susietiems įrenginiams (pvz., kuri pamoka rodoma televizoriuje).

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Įkelti įrenginio turinio priskyrimus |
| POST | `/` | JWT | — | Išsaugoti įrenginio turinio priskyrimus (paketu) |
| DELETE | `/:id` | JWT | — | Ištrinti įrenginio turinio priskyrimą |

## Teksto žinutės

Bazinis kelias: `/messaging/texting`

Valdo SMS teksto siuntimo tiekėjus, grupinių tekstinių žinučių siuntimą ir pristatymo sekimą.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/providers` | JWT | — | Įkelti bažnyčios teksto siuntimo tiekėjus (prisijungimo duomenys paslepiami) |
| GET | `/status` | JWT | — | `{ enabled }` — ar bažnyčia turi įjungtą teksto siuntimo tiekėją. Bet kuris prisijungęs bažnyčios vartotojas; naudojama rodyti **Tekstas** parinktis tik tada, kai žinutes galima siųsti |
| GET | `/inboundUrl` | JWT | `texting.send` arba `settings.edit` | `{ url }` — bažnyčios gaunamųjų (STOP) webhook URL, kurį įklijuoti į tiekėjo nustatymus |
| POST | `/inbound/:churchId/:token` | Viešas | — | Tiekėjo gaunamųjų žinučių webhook. `token` yra bažnyčios ID HMAC. Atsakymas, kuris tiksliai yra atsisakymo žodis (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), pažymi visus atitinkamus asmenis kaip `optedOut` ir išjungia jų `allowSms`. Grąžina `{ optedOut: <count> }`; kiti atsakymai grąžina `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Peržiūrėti grupinės žinutės gavėjus (tinkami, atsisakiusieji, be telefono numerio skaičiai) |
| GET | `/sent` | JWT | — | Įkelti visus bažnyčios išsiųstų tekstinių žinučių įrašus |
| GET | `/sent/:id/details` | JWT | — | Įkelti išsiųstą tekstinę žinutę su kiekvieno gavėjo pristatymo žurnalais |
| POST | `/providers` | JWT | — | Išsaugoti teksto siuntimo tiekėjus (paketu). Šifruoja API prisijungimo duomenis |
| POST | `/send` | JWT | — | Siųsti SMS visiems tinkamiems grupės nariams. Turinys: `{ groupId, message }`. Jungimo laukai (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) išsprendžiami kiekvienam gavėjui |
| POST | `/sendPerson` | JWT | — | Siųsti SMS vienam asmeniui. Turinys: `{ personId, phoneNumber, message }`. Jungimo laukai išsprendžiami, o į žurnalą įrašomas išspręstas tekstas |
| DELETE | `/providers/:id` | JWT | — | Ištrinti teksto siuntimo tiekėją |

### Pavyzdys: siųsti grupinę tekstinę žinutę

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

Valdo pakartotinai naudojamus el. laiškų šablonus ir šablonais grįstą el. laiškų siuntimą grupėms.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/` | JWT | — | Įkelti visus bažnyčios el. laiškų šablonus |
| GET | `/:id` | JWT | — | Įkelti vieną el. laiško šabloną pagal ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` arba `tasks.admin` | Bažnyčios grupių el. laiškų būsena: `{ approved, paused, remaining, requested }`. B1Admin dialogas Siųsti el. laišką ir darbo eigos veiksmas **Siųsti el. laišką** ją naudoja, kad įspėtų, kai el. laiškas nebus išsiųstas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Prašyti palaikymo komandos patvirtinti bažnyčią grupių el. laiškams (ne dažniau kaip kartą per savaitę vienai bažnyčiai) |
| GET | `/preview/:groupId` | JWT | — | Peržiūrėti grupės el. laiškų pristatymą (tinkamų gavėjų skaičius, nariai be el. pašto) |
| POST | `/` | JWT | — | Sukurti arba atnaujinti el. laiškų šablonus (paketu) |
| POST | `/send` | JWT | — | Siųsti šablonu grįstą el. laišką visiems grupės nariams. Turinys: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Ištrinti el. laiško šabloną |

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

**Palaikomi jungimo laukai:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Užblokuoti IP

Bazinis kelias: `/messaging/blockedips`

(pasenęs) IP blokavimas tiesioginio transliavimo pokalbiams. B1App klientas nebeiškviečia `POST /` — IP blokavimas buvo pašalintas vieningos pristatymo migracijos metu. Maršrutą `/clear` vis dar serverių tarpusavio ryšiu iškviečia `StreamingServiceController`, kai išsaugomos transliacijos paslaugos.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| POST | `/` | JWT | — | (pasenęs) Išsaugoti užblokuotus IP (paketu). Nėra aktyvaus kliento |
| POST | `/clear` | JWT | — | Išvalyti visus užblokuotus IP konkrečioms paslaugoms. Turinys: `[{ serviceId, churchId }]` |

## Pristatymo žurnalai

Bazinis kelias: `/messaging/deliverylogs`

Seka išsiųstų žinučių (SMS, push pranešimų, el. laiškų) pristatymo būseną.

| Metodas | Kelias | Autentifikacija | Leidimas | Aprašymas |
|--------|------|------------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Įkelti pristatymo žurnalus pagal turinio tipą ir ID |
| GET | `/person/:personId` | JWT | — | Įkelti asmens pristatymo žurnalus. Neprivalomi `?startDate=&endDate=` filtrai |
| GET | `/recent` | JWT | — | Įkelti naujausius bažnyčios pristatymo žurnalus. Neprivalomas `?limit=` (numatytasis 100) |
| GET | `/:id` | JWT | — | Įkelti pristatymo žurnalą pagal ID |

## Susiję puslapiai

- [Realaus laiko architektūra](../../realtime.md) -- WebSocket protokolas, kambarių prenumeratos ir vieningos pristatymo sistema
- [Web Push pranešimai](../../web-push.md) -- Naršyklės push registracija ir pristatymas
- [Narystės galutiniai taškai](./membership.md) -- Asmenys, grupės, vaidmenys ir pagrindinė tapatybė
- [Lankomumo galutiniai taškai](./attendance.md) -- Pamaldų ir apsilankymų sekimas
- [Autentifikacija ir leidimai](./authentication.md) -- Prisijungimo srautas, JWT, OAuth, leidimų modelis
- [Modulio struktūra](../module-structure.md) -- Kodo organizavimo modeliai
