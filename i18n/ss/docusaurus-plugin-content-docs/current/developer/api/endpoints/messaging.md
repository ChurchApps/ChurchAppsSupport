---
title: "Tindzawo Temilayezo"
description: "Incwadzi yetindzawo te-API yemilayezo ye-ChurchApps: tingcoco, kufinyeleleka kwemanothi, kutfumela ma-SMS, timodeli teimeyili, tesatfiso, nemadivayisi."
---

# Tindzawo Temilayezo

<div class="article-intro">

Module yemilayezo ilawula tingcoco letisheshako, imilayezo yencoco, tesatfiso, kulethwa kwe-SMS/imeyili, kuxhumana nge-WebSocket, imilayezo yangasese, kubhalisa madivayisi, nemahhovisi etitfumelo temabhalasi. Inika umtsetfo wekuxhumana losetjentiswa kuyo yonkhe imitsetfo yeChurchApps, kokubili kusakaza lokuphilako kwencoco kanye nesatfiso lesingasiyo lesikhatsi.

</div>

**Indzawo yekucala:** `/messaging`

## Tingcoco

Indzawo yekucala: `/messaging/conversations`

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/timeline/ids?ids=` | JWT | — | Layisha tingcoco ngema-ID lahlukaniswe ngekhoma, nemilayezo yekucala nelokugcina |
| GET | `/messages/:contentType/:contentId` | JWT | — | Layisha tingcoco talokuqukethwe nemilayezo lehlukaniswe emakhasini (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Tfola tingcoco letinhlobo le-post temaqembu emsebenti wamanje |
| GET | `/posts/group/:groupId` | JWT | — | Tfola tingcoco letinhlobo le-post temqembu locacile |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Manothi lamasha kuwo wonkhe emarekhodi wekhasi lemanothi le-B1 Admin. `section` ibe ngu-`people`, `groups`, `events` noma `workflows` (400 uma kungenjalo); `limit` ibe ngu-25 ngekuzenzekelako (lingu-100 kakhulu); `before` ngumcelo wekhasi langaphambili. Lincwadzi ngalinye lisadlula emtsetfweni wohlobo lwalo (imvume ye-People Edit / manothi lamfihlekile, bahholi bemqembu, labobona emicimbini, labobona emakhadi emsebenti), ngako bantfu bayabona kuphela manothi labangawavula. Umbhalo wemanothi unciphiswa ku-300 wemanani
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Tfola noma yakha ingcoco yamanje yalokuqukethwe (ivula contentId ngekuzenzekelako) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Layisha tingcoco ngohlobo lwalokuqukethwe nangeID |
| GET | `/:churchId/:id` | Public | — | Layisha ingcoco yinye ngeID |
| POST | `/` | JWT | — | Yakha noma uvuselele tingcoco (ngekwenhlanganisela) |
| POST | `/start` | JWT | — | Qala ingcoco lensha nemlayezo wekucala wekuphawula |
| DELETE | `/:churchId/:id` | JWT | — | Susa ingcoco |

### Kuvikeleka kwemanothi omuntfu

Tingcoco letinohlobo `contentType: "person"` (ithebhu yeManothi ekurekhodeni komuntfu) noma `contentType: "personConfidential"` (sigaba seManothi Lamfihlekile) bavikelekile kuyo yonkhe indlela yekufunda nekubhala, kubandzakanya nendlela letitsite letingenhla, letibuyisa `401` kulolohlobo lwalokuqukethwe. `person` idinga imvume ye-MembershipApi **People / Edit**; `personConfidential` idinga **People / View Confidential Notes**. Ngemakhiyi e-API anemikhawulo, `people:write` ihlanganisa tonkhe letimbili letenzo (umsebenti wemakhiyi kumelwe ube nemvume yendzima yendzima ngaphansi kwaleyo).

### Kuvikeleka kwemanothi emaqembu nemicimbi {#group-and-event-notes-access-control}

Kunetinhlobo letimbili letengetiwe temanothi, avikelekile ngendlela lefanako kuyo yonkhe indlela yekufunda nekubhala (kubandzakanya netindlela letitsite letingenhla), futsi akucale kuvulelwa labangakwaziwa kutfumela:

- **`groupNote`** (`contentId` = ID yemqembu) -- **Amanothi abaholi** esikhatsini semqembu. Bahholi balelo qembu (`leaderGroupIds` ku-JWT) kuphela abangafunda noma baphose. Ayikho imvume yetisebenti leyanikela mvume, kubandzakanya `content.edit` nemvume yetilungu temqembu.
- **`eventNote`** (`contentId` = ID yemcimbi) -- manothi emcimbini wekhalenda. Tisebenti letinelungelo le-`content.edit` noma **Calendars / Admin** njalo bangafunda bayaphosta. Lokunye kulandzela `notesViewRole` yemcimbi (kufunda) ne-`notesPostRole` (kuphosta): `staff` (lokuzenzekelako, uma lenkhundla ingu-`null`) akavumeli muntfu lomunye, `leaders` ivumela bahholi bemqembu wemcimbi, `members` ivumela emalungu nebahholi bemqembu wemcimbi. Umcimbi longenaso `groupId` ungowetisebenti kuphela.

### Kuvikeleka kwemanothi wekhadi lemsebenti

Tingcoco letinohlobo `contentType: "workflowCard"` (manothi ekhadini lemsebenti, lapho `contentId` ingu-ID yemsebenti yekhadi) zifundzeka zibhalwe kuphela ngulowo longavula lelikhadi: umsebenti lonemvume ye-DoingApi **Tasks / View**, noma umuntfu noma iqembu lelikhadi lelabelwe kubo, lelakhiwe nabo, noma lelibhekisele kubo. Labanye bonkhe batfola `401` kuyo yonkhe indlela yekufunda, kubandzakanya netindlela letitsite letingenhla. Ingcoco yekhadi inamathiselwa ngalo khadi ngokwalo nge-`POST /doing/tasks/:id/conversation` (umtimba `{ "conversationId": "..." }`; ingcoco yekucala leyamanjiswa iyanqoba), lebitwa ngabahleli bekhadi nangumuntfu lelabelwe.

### Sibonelo: Qala Ingcoco

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

## Imilayezo

Indzawo yekucala: `/messaging/messages`

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/conversation/:conversationId` | JWT | — | Layisha yonkhe imilayezo yencoco |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Layisha yonkhe imilayezo yencoco (ukulandzelela kwesikhatsi lokuphilako kwencoco ngesikhatsi sangempela) |
| GET | `/:churchId/:id` | Public | — | Layisha umlayezo munye ngeID |
| POST | `/` | JWT | — | Gcina imilayezo (ngekwenhlanganisela). Itfumela tibuyekezo tesikhatsi sangempela futsi ivusa tesatfiso. Kuvuselela umlayezo lokhona kudzinga kutsi ube ngumbhali walo noma ube nemvume ye-`content.edit`; umbhali logcinwe akakwazi kushintjwa |
| POST | `/send` | Public | — | Tfumela imilayezo (ngekwenhlanganisela, ngumuntfu longavula). Itfumela tibuyekezo tesikhatsi sangempela nge-WebSocket futsi ivusa tesatfiso |
| POST | `/setCallout` | JWT | — | (lelidzala) Sakaza umlayezo wesimemo ngesikhatsi sangempela. Akukho klayenti lelisebenta; kusakaza lokuphilako akusenti tesimemo |
| DELETE | `/:churchId/:id` | JWT | — | Susa umlayezo futsi usakaze kususwa kwawo ngesikhatsi sangempela. Bona [Kuphathwa kwemilayezo](#message-moderation) |

### Kuphathwa kwemilayezo

Kususa umlayezo kuvunyelwe kula:

- umbhali womlayezo;
- tisebenti letinemvume ye-`content.edit` (kuyo yonkhe i-church);
- **bahholi bemaqembu**, kutingcoco lenohlobo `group` noma `groupAnnouncement` lapho `contentId` kuyi-ID yemqembu labaholako (`leaderGroupIds` ku-JWT).

Tingcoco temanothi omuntfu (`person` / `personConfidential`) atikaphatfwa ngabaholi -- kusetjentiswa timvume temanothi (`people.edit`, `people.viewConfidentialNotes`) kuwo.

Bahholi batfola kususa kuphela, hhayi kuhlela: kulungisa umlayezo womunye umunti kuhlala kukhawulelwe kumbhali nakutisebenti letinemvume ye-`content.edit`.

### Sibonelo: Tfumela Umlayezo

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

## Imilayezo Yangasese

Indzawo yekucala: `/messaging/privatemessages`

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/` | JWT | — | Layisha yonkhe imilayezo yangasese yemsebenti wamanje (ifaka umlayezo wekugcina ngencoco ngayinye, ichaza yonkhe njengeyefundzwe) |
| GET | `/existing/:personId` | JWT | — | Funa ingcoco yangasese lekhona nemuntfu locacile |
| GET | `/:id` | JWT | — | Layisha umlayezo wangasese ngeID (usule tesatfiso uma ukhombisela umsebenti wamanje) |
| POST | `/` | JWT | — | Tfumela imilayezo yangasese (ngekwenhlanganisela). Ivusa tesatfiso letitfumelwa kumamukeli |

## Tesatfiso

Indzawo yekucala: `/messaging/notifications`

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/unreadCount` | JWT | — | Tfola inani tesatfiso letingakafundwa tsomsebenti wamanje |
| GET | `/my` | JWT | — | Layisha tonkhe tesatfiso temsebenti wamanje (tiyachithwa tonkhe njengetifundziwe) |
| GET | `/tmpEmail` | Public | — | Qala lisumnikwa lelusuku lwetesatfiso temeyili (indlela yokulungisa iphutsa/yecron) |
| GET | `/:churchId/person/:personId` | JWT | — | Layisha tesatfiso temuntfu locacile |
| GET | `/:churchId/:id` | JWT | — | Layisha satfiso ngeID |
| POST | `/` | JWT | — | Yakha noma uvuselele tesatfiso (ngekwenhlanganisela) |
| POST | `/create` | JWT | — | Yakha tesatfiso tebantfu labanyenti. Umtimba: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Chaza tonkhe tesatfiso temuntfu njengetifundziwe |
| POST | `/sendTest` | JWT | — | Tfumela satfiso sekuhlola sokusindza. Umtimba: `{ personId, title }` |
| POST | `/ping` | Public | — | Yakha satfiso kusuka kulesibangako sangaphandle. Umtimba: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Susa satfiso |

### Sibonelo: Yakha Tesatfiso

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

## Tikhetho Tetesatfiso

Indzawo yekucala: `/messaging/notificationpreferences`

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/categories` | JWT | — | Lolota tigaba tetesatfiso netindlela letingenteka netetivamelekile ngekuzenzekelako |
| GET | `/my` | JWT | — | Layisha tikhetho tetesatfiso temsebenti wamanje (ayidala tikhetho letivamelekile uma ngabe tingekho) |
| POST | `/` | JWT | — | Gcina tikhetho temsebenti wamanje. Umtimba: nanoma yiliphi lelitsi `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, kanye ne-`overrides: [{ categoryKey, channel, optedIn }]` lekhetheni (`channel` ingaba `push`, `email`, `in_app`, noma `sms`; tigaba letikhiyiwe atihlolwa). `allowSms` ngukuvuma kwelilunga kwetesikhumbuzo temyalezo-mfushane. Umtimba lowakhiwe ngemigca lowakhiwe ngendlela lendala uyemukelwa njalo |

## Kuxhumana

Indzawo yekucala: `/messaging/connections`

Iphatha tuxhumano te-WebSocket/lwesikhatsi sangempela setingcoco, tingcoco temaqembu, timiyalezo yangasese, nekusakaza lokuphilako. Bona [Kwakheka kwesikhatsi sangempela](../../realtime.md) ngemtsetfo wonkhe wekuxhumana.

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/:churchId/:conversationId` | Public | — | Layisha tonkhe tuxhumano tencoco |
| POST | `/` | Public | — | Bhalisa tuxhumano (ngekwenhlanganisela). Iyavusa kusakazwa kwekutfola ekhasini lencoco. Tintfo temtimba: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Vuselela ligama lekuboniswa kuxhumano ngesimo se-socket. Umtimba: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Susa uxhumano kusuka encocweni. Iyavusa kusakazwa kwekutfola ekhasini |
| POST | `/tmpSendAlert` | Public | — | Tfumela sexwayiso sesatfiso kutuxhumano temuntfu. Umtimba: `{ churchId, personId }` |

## Madivayisi

Indzawo yekucala: `/messaging/devices`

Iphatha kubhalisa madivayisi etesatfiso netekuhlanganisa emaconthi (njengohlelo lwe-Lessons ekhompyutha yeTV).

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| POST | `/enroll` | JWT | — | Bhalisa noma uvuselele idivayisi (kubhalisa kwesatfiso sefoni). Iyafanisa ngethokheni ye-FCM noma nge-ID yedivayisi |
| POST | `/enrollAnon` | Public | — | Bhalisa idivayisi engaziwa futsi yakhe likhodi lekuhlanganisa lelinemagama ali-4 |
| POST | `/` | Public | — | Gcina emadivayisi (ngekwenhlanganisela) |
| GET | `/pair/:pairingCode` | JWT | — | Hlanganisa idivayisi ngelikhodi lekuhlanganisa. `?contentType=&contentId=` lokukhetfwako kunikela lokuqukethwe |
| GET | `/status/:deviceId` | Public | — | Hlola simo sekuhlanganiswa kwedivayisi |
| GET | `/:churchId` | JWT | — | Layisha tonkhe tidivayisi te-church |
| GET | `/:churchId/person/:personId` | JWT | — | Layisha tonkhe tidivayisi temuntfu |
| GET | `/:churchId/:id` | JWT | — | Layisha idivayisi ngeID |
| DELETE | `/:churchId/:id` | JWT | — | Susa idivayisi |

### Sibonelo: Bhalisa Idivayisi

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

## Emaconthi Emadivayisi

Indzawo yekucala: `/messaging/devicecontents`

Iphatha tibelethelo tekuqukethwe kumadivayisi ahlanganisiwe (njengokuthi ngabe yiphi Lesson ibonakala kutelevishini).

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/deviceId/:deviceId` | JWT | — | Layisha tibelethelo tekuqukethwe kwedivayisi |
| POST | `/` | JWT | — | Gcina tibelethelo tekuqukethwe kwedivayisi (ngekwenhlanganisela) |
| DELETE | `/:id` | JWT | — | Susa lesibelethelo sekuqukethwe kwedivayisi |

## Kutfumela Ma-SMS

Indzawo yekucala: `/messaging/texting`

Iphatha emahhovisi etitfumelo te-SMS, kutfumela kumaqembu, nekulandzela kulethwa.

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/providers` | JWT | — | Layisha emahhovisi etitfumelo te-church (tigunya tifihlwe) |
| GET | `/status` | JWT | — | `{ enabled }` -- kutsi i-church ine-hhovisi lelisebentako letitfumelo. Nanoma ngubani lovele ungenile ku-church; isetjentiswa kukhombisa tikhetho te-**Text** kuphela lapho kungatfunyelwa temyalezo |
| GET | `/inboundUrl` | JWT | `texting.send` noma `settings.edit` | `{ url }` -- ikheli le-webhook lekufika (STOP) le-church lokufanele likhiphelwe kuhhovisi letitfumelo |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook yemilayezo lefika kuhhovisi letitfumelo. `token` ingu-HMAC ye-ID ye-church. Impendulo lefanana kahle namagamaokumisa (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) imaka bonkhe labafanako njenge-`optedOut` futsi icima i-`allowSms` yabo. Ibuyisa `{ optedOut: <count> }`; ezinye timpendulo zibuyisa `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Bukela ngaphambili labemukelako lemyalezo yeqembu (labafanelekile, labaphumile, nemanani labangenayo ifoni) |
| GET | `/sent` | JWT | — | Layisha tonkhe timrekhodi temyalezo-mfushane letitfumeleke ye-church |
| GET | `/sent/:id/details` | JWT | — | Layisha umyalezo-mfushane lothunyelwe nemarekhodi ekulethwa ngemunye umuntfu |
| POST | `/providers` | JWT | — | Gcina emahhovisi etitfumelo (ngekwenhlanganisela). Ifihla tigunya te-API |
| POST | `/send` | JWT | — | Tfumela i-SMS kubo bonkhe labafanelekile emalungwini eqembu. Umtimba: `{ groupId, message }`. Tinkhundla letihlanganisiwe (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) ayatfolakala ngemuntfu ngamunye |
| POST | `/sendPerson` | JWT | — | Tfumela i-SMS kumuntfu munye. Umtimba: `{ personId, phoneNumber, message }`. Tinkhundla letihlanganisiwe ayatfolakala, futsi umbhalo lolungisiwe yilowo lolotfusha |
| DELETE | `/providers/:id` | JWT | — | Susa lihhovisi letitfumelo |

### Sibonelo: Tfumela Umyalezo Weqembu

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

## Timodeli Teimeyili

Indzawo yekucala: `/messaging/emailTemplates`

Iphatha timodeli teimeyili letisetjentiswa njalo nekutfumela imeyili yetimodeli emaqembini.

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/` | JWT | — | Layisha tonkhe timodeli teimeyili te-church |
| GET | `/:id` | JWT | — | Layisha timodeli teimeyili ngeID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` noma `tasks.admin` | Simo semeyili yeqembu ye-church: `{ approved, paused, remaining, requested }`. Ingxoxo ye-B1Admin ye-Send Email nesenzo se-workflow **Send email**iyasisebenzisa kwexwayisa uma imeyili ingeke iphume |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Cela kusekela ukuba i-churchivunywe ngemeyili yeqembu (kanye nje ngeviki ngayinye nge-church) |
| GET | `/preview/:groupId` | JWT | — | Bukela ngaphambili kulethwa kwemeyili yeqembu (inani labemukelako labafanelekile, emalungu langenayo imeyili) |
| POST | `/` | JWT | — | Yakha noma uvuselele timodeli teimeyili (ngekwenhlanganisela) |
| POST | `/send` | JWT | — | Tfumela imeyili yetimodeli kubo bonkhe emalungwini eqembu. Umtimba: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Susa timodeli teimeyili |

### Sibonelo: Tfumela Imeyili Kuliqembu

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

**Emasimu lasekelwako:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Ma-IP Avinjiwe

Indzawo yekucala: `/messaging/blockedips`

(lelidzala) Kuvinjelwa kwe-IP kwekuxoxa lokuphilako. Iklayenti le-B1App ayisasebentisi `POST /` -- kuvinjelwa kwe-IP kwasuswa ekutfutfukisweni kwekulethwa kwemanje. Indlela `/clear` isabitwa ngumsebenti-kuya-msebenti yi-`StreamingServiceController` lapho tinsita letisakazwa setigciniwe.

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| POST | `/` | JWT | — | (lelidzala) Gcina ma-IP avinjiwe (ngekwenhlanganisela). Akukho klayenti lelisebentako |
| POST | `/clear` | JWT | — | Susa tonkhe ma-IP avinjiwe kutinsita letitsite. Umtimba: `[{ serviceId, churchId }]` |

## Emarekhodi Ekulethwa

Indzawo yekucala: `/messaging/deliverylogs`

Ilandzela simo sekulethwa kwemilayezo lethunyeleweko (SMS, tesatfiso tefoni, imeyili).

| Method | Path | Auth | Permission | Incazelo |
|--------|------|------|------------|----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Layisha emarekhodi ekulethwa ngohlobo lwalokuqukethwe nangeID |
| GET | `/person/:personId` | JWT | — | Layisha emarekhodi ekulethwa somuntfu. `?startDate=&endDate=` lokukhetfwako kuyawahlunga |
| GET | `/recent` | JWT | — | Layisha emarekhodi ekulethwa lamasha ye-church. `?limit=` lokukhetfwako (ivamile ingu-100) |
| GET | `/:id` | JWT | — | Layisha irekhodi lekulethwa ngeID |

## Emakhasi Lahlobene

- [Kwakheka kwesikhatsi sangempela](../../realtime.md) -- protokholi ye-WebSocket, kubhalisa emakamelo, nendlela yekulethwa ehlanganisiwe
- [Tesatfiso temawebhu](../../web-push.md) -- kubhalisa nekulethwa kwetesatfiso kusiphequluli
- [Tindzawo Temalungu](./membership.md) -- Bantfu, emaqembu, tindzima, nekuzazisa okusisekelo
- [Tindzawo Tekubonakala](./attendance.md) -- Kulandzela tinsita nemavakashi
- [Kugunyaza nemvume](./authentication.md) -- Inkqubo yekungena, JWT, OAuth, nemodeli yemvume
- [Sakhiwo se-module](../module-structure.md) -- Tindlela tekuhlela ikhodi
