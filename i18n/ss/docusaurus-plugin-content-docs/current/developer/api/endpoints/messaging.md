---
title: "Ema-Endpoint E-Messaging"
---

# Ema-Endpoint E-Messaging

<div class="article-intro">

I-module ye-Messaging iphatsa tinkhulumo tesikhatsi lesiphila, imilayeto ye-chat, tatiso letiphushiwe, kuletfulwa kwe-SMS/imeyili, kuxhumana kwe-WebSocket, imilayeto lengasese, kubhaliswa kwemadivayisi, kanye nabaniketi bekutfumela imiyalo. Iniketa lulwandle lwekukhulumisana losetjentiswa kuwo wonkhe ema-app e-ChurchApps kokubili kwe-chat yekusakaza lokuphila kanye netatiso letingakahambisani.

</div>

**Umkhondvo Losisekelo:** `/messaging`

## Tinkhulumo

Umkhondvo losisekelo: `/messaging/conversations`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Layisha tinkhulumo nge-ID letihlukaniswe ngekhoma kanye nemilayeto yekucala/yekugcina |
| GET | `/messages/:contentType/:contentId` | JWT | — | Layisha tinkhulumo tekucuketfwe netimilayeto letihlukaniswe ngemakhasi (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Tfola tinkhulumo tesimo se-post temacembu emsebentisi wanyalo |
| GET | `/posts/group/:groupId` | JWT | — | Tfola tinkhulumo tesimo se-post telicembu lelitsite |
| GET | `/current/:churchId/:contentType/:contentId` | Ngeyeveleni | — | Tfola nobe wakhe inkhulumo yanyalo yekucuketfwe (izisombulula i-contentId ngekutentekela) |
| GET | `/:churchId/:contentType/:contentId` | Ngeyeveleni | — | Layisha tinkhulumo nge-luhlobo lwekucuketfwe kanye ne-ID |
| GET | `/:churchId/:id` | Ngeyeveleni | — | Layisha inkhulumo linye nge-ID |
| POST | `/` | JWT | — | Akha nobe buyeketa tinkhulumo (batch) |
| POST | `/start` | JWT | — | Cala inkhulumo lensha ngeliphimbo lemcijana lekucala |
| DELETE | `/:churchId/:id` | JWT | — | Sula inkhulumo |

### Sibonelo: Cala Inkhulumo

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

## Imilayeto

Umkhondvo losisekelo: `/messaging/messages`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Layisha yonkhe imilayeto yenkhulumo |
| GET | `/catchup/:churchId/:conversationId` | Ngeyeveleni | — | Layisha yonkhe imilayeto yenkhulumo (kubamba lokwendlulile kweveleni ye-chat lesiphila) |
| GET | `/:churchId/:id` | Ngeyeveleni | — | Layisha umlayeto linye nge-ID |
| POST | `/` | JWT | — | Gcina imilayeto (batch). Ithumela kubuyeketwa kwesikhatsi lesiphila futsi ivusa tatiso |
| POST | `/send` | Ngeyeveleni | — | Tfumela imilayeto (batch, yeveleni). Ithumela kubuyeketwa kwesikhatsi lesiphila nge-WebSocket futsi ivusa tatiso |
| POST | `/setCallout` | JWT | — | (yakadzeni) Sakaza umlayeto wemcijana ngesikhatsi lesiphila. Akukho client losebentako; chat yekusakaza lokuphila ayisakhombisi ema-callout |
| DELETE | `/:churchId/:id` | JWT | — | Sula umlayeto futsi usakaze kususwa ngesikhatsi lesiphila |

### Sibonelo: Tfumela Umlayeto

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

## Imilayeto Lengasese

Umkhondvo losisekelo: `/messaging/privatemessages`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Layisha yonkhe imilayeto lengasese yemsebentisi wanyalo (ifaka umlayeto wekugcina wenkhulumo ngayinye, iphawula konkhe njengekufundzwe) |
| GET | `/existing/:personId` | JWT | — | Fumana inkhulumo lengasese lesele ikhona nemuntfu lotsite |
| GET | `/:id` | JWT | — | Layisha umlayeto longasese nge-ID (ususa satiso nangabe utfunyelwe kumsebentisi wanyalo) |
| POST | `/` | JWT | — | Tfumela imilayeto lengasese (batch). Ivusa satiso lesiphushiwe kumemukeli |

## Tatiso

Umkhondvo losisekelo: `/messaging/notifications`

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Tfola sibalo satatiso letingakafundzwa temsebentisi wanyalo |
| GET | `/my` | JWT | — | Layisha tonkhe tatiso temsebentisi wanyalo (iphawula konkhe njengekufundzwe) |
| GET | `/tmpEmail` | Ngeyeveleni | — | Vusa i-digest yatatiso te-imeyili langa nga langa (endpoint yekuhlola/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Layisha tatiso temuntfu lotsite |
| GET | `/:churchId/:id` | JWT | — | Layisha satiso nge-ID |
| POST | `/` | JWT | — | Akha nobe buyeketa tatiso (batch) |
| POST | `/create` | JWT | — | Akha tatiso kubantfu labanyenti. Umtimba: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Phawula tonkhe tatiso njengekufundzwe kumuntfu |
| POST | `/sendTest` | JWT | — | Tfumela satiso sekuhlola lesiphushiwe. Umtimba: `{ personId, title }` |
| POST | `/ping` | Ngeyeveleni | — | Akha satiso kusuka kumvuseli wangaphandle. Umtimba: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Sula satiso |

### Sibonelo: Akha Tatiso

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

## Tikhetselo Tatatiso

Umkhondvo losisekelo: `/messaging/notificationpreferences`

Yandzisa i-CRUD levamile. I-base class iniketa i-POST `/` (akha nobe buyeketa, akukho mvumo ledzingekako).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Akha nobe buyeketa tikhetselo tatatiso (kusuka ku-CRUD base class) |
| GET | `/my` | JWT | — | Layisha tikhetselo tatatiso temsebentisi wanyalo (izenzakalelisa lokwentiwa ngekwentiwa nangabe kute lokukhona) |

## Kuxhumana

Umkhondvo losisekelo: `/messaging/connections`

Iphatsa kuxhumana kwe-WebSocket/sikhatsi lesiphila kwe-chat, tinkhulumo temacembu, imilayeto lengasese, kanye nekusakaza lokuphila. Buka [Real-time Architecture](../../realtime) kuprotocol lephelele.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Ngeyeveleni | — | Layisha konkhe kuxhumana kwenkhulumo |
| POST | `/` | Ngeyeveleni | — | Bhalisa kuxhumana (batch). Ivusa kusakaza kwekubakhona enkhulumeni. Titfo temtimba: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Ngeyeveleni | — | Buyeketa ligama lekukhombisa lekuxhumana nge-socket ID. Umtimba: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Ngeyeveleni | — | Wisa kuxhumana enkhulumeni. Ivusa kusakaza kwekubakhona |
| POST | `/tmpSendAlert` | Ngeyeveleni | — | Tfumela satiso semcijana kukuxhumana komuntfu. Umtimba: `{ churchId, personId }` |

## Emadivayisi

Umkhondvo losisekelo: `/messaging/devices`

Iphatsa kubhaliswa kwemadivayisi tatiso letiphushiwe kanye nekuhlanganiswa kwekucuketfwe (sibonelo, i-app ye-Lessons kuma-TV screen).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Bhalisa nobe buyeketa idivayisi (kubhaliswa kwe-push yaseluleni). Ilingane nge-FCM token nobe device ID |
| POST | `/enrollAnon` | Ngeyeveleni | — | Bhalisa idivayisi lengaziwa futsi ukhicite khodi yekuhlanganisa lenetinhlamvu leti-4 |
| POST | `/` | Ngeyeveleni | — | Gcina emadivayisi (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Hlanganisa idivayisi nge-khodi yayo yekuhlanganisa. `?contentType=&contentId=` kungakhetsi kwabela kucuketfwe |
| GET | `/status/:deviceId` | Ngeyeveleni | — | Hlola simo sekuhlanganiswa kwedivayisi |
| GET | `/:churchId` | JWT | — | Layisha onkhe emadivayisi elibandla |
| GET | `/:churchId/person/:personId` | JWT | — | Layisha onkhe emadivayisi emuntfu |
| GET | `/:churchId/:id` | JWT | — | Layisha idivayisi nge-ID |
| DELETE | `/:churchId/:id` | JWT | — | Sula idivayisi |

### Sibonelo: Bhalisa Idivayisi

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

## Kucuketfwe Kwemadivayisi

Umkhondvo losisekelo: `/messaging/devicecontents`

Iphatsa kwabelwa kwekucuketfwe kumadivayisi lahlanganisiwe (sibonelo, kutsi yisiphi sifundvo lesikhonjiswa ku-TV).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Layisha kwabelwa kwekucuketfwe kwedivayisi |
| POST | `/` | JWT | — | Gcina kwabelwa kwekucuketfwe kwemadivayisi (batch) |
| DELETE | `/:id` | JWT | — | Sula kwabelwa kwekucuketfwe kwedivayisi |

## Kutfumela Imiyalo (Texting)

Umkhondvo losisekelo: `/messaging/texting`

Iphatsa baniketi be-SMS, kutfumela imiyalo yelicembu, kanye nekulandzelela kuletfulwa.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Layisha baniketi bekutfumela imiyalo belibandla (ema-credential afihliwe) |
| GET | `/preview/:groupId` | JWT | — | Bukela ngaphambili bemukeli belicembu (sibalo lesikahle, lesitephulile, lesingenaselula) |
| GET | `/sent` | JWT | — | Layisha yonkhe imibhalo yemiyalo letfunyelwe yelibandla |
| GET | `/sent/:id/details` | JWT | — | Layisha umyalo lotfunyelwe kanye nemibhalo yekuletfulwa yemukeli ngamunye |
| POST | `/providers` | JWT | — | Gcina baniketi bekutfumela imiyalo (batch). Ifihla ema-credential e-API |
| POST | `/send` | JWT | — | Tfumela i-SMS kuwo onkhe emalunga lakufaneleko elicembu. Umtimba: `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Tfumela i-SMS kumuntfu munye. Umtimba: `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Sula umniketi wekutfumela imiyalo |

### Sibonelo: Tfumela Umyalo Welicembu

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

## Ema-Template E-Imeyili

Umkhondvo losisekelo: `/messaging/emailTemplates`

Iphatsa ema-template e-imeyili lasetjentiswa kaningi kanye nekutfumela imeyili letakhiwe ngale-template kumacembu.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Layisha onkhe ema-template e-imeyili elibandla |
| GET | `/:id` | JWT | — | Layisha template linye nge-ID |
| GET | `/preview/:groupId` | JWT | — | Bukela ngaphambili kuletfulwa kwe-imeyili yelicembu (sibalo lemukeli lokahle, emalunga langenayo imeyili) |
| POST | `/` | JWT | — | Akha nobe buyeketa ema-template e-imeyili (batch) |
| POST | `/send` | JWT | — | Tfumela i-imeyili letakhiwe ngale-template kuwo onkhe emalunga elicembu. Umtimba: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Sula template ye-imeyili |

### Sibonelo: Tfumela Imeyili Kulicembu

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

**Emabalisi Lasesekelwe Ekuhlanganisweni:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Ema-IP Lavinjelwe

Umkhondvo losisekelo: `/messaging/blockedips`

(yakadzeni) Kuvimbela ema-IP kuchat yekusakaza lokuphila. I-client ye-B1App ayisayibiti i-`POST /` — kuvimbela ema-IP kususiwe ku-migration yekuletfulwa lokuhlangene. Umkhondvo we-`/clear` usabitwa ku-server nge-`StreamingServiceController` nangabe ema-service ekusakaza agciniwe.

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (yakadzeni) Gcina ema-IP lavinjelwe (batch). Akukho client losebentako |
| POST | `/clear` | JWT | — | Sula onkhe ema-IP lavinjelwe kuma-service lakhetsekile. Umtimba: `[{ serviceId, churchId }]` |

## Emabhalo Ekuletfulwa

Umkhondvo losisekelo: `/messaging/deliverylogs`

Ilandzelela simo sekuletfulwa kwemilayeto letfunyelwe (SMS, tatiso letiphushiwe, imeyili).

| Inchubo | Umkhondvo | Kutivakalisa | Imvumo | Incazelo |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Layisha emabhalo ekuletfulwa nge-luhlobo lwekucuketfwe kanye ne-ID |
| GET | `/person/:personId` | JWT | — | Layisha emabhalo ekuletfulwa emuntfu. `?startDate=&endDate=` kungakhetsi kucenga |
| GET | `/recent` | JWT | — | Layisha emabhalo ekuletfulwa lasandza elibandla. `?limit=` kungakhetsi (ngekwentiwa ngu-100) |
| GET | `/:id` | JWT | — | Layisha umbhalo wekuletfulwa nge-ID |

## Emakhasi Lahlobene

- [Real-time Architecture](../../realtime) -- Protocol ye-WebSocket, kubhaliswa kwemakamelo, kanye nesifanekiso lesihlangene sekuletfulwa
- [Web Push Notifications](../../web-push) -- Kubhaliswa kwe-push yewebhu kanye nekuletfulwa
- [Membership Endpoints](./membership) -- Bantfu, emacembu, ema-role, kanye nebunikati basisekelo
- [Attendance Endpoints](./attendance) -- Kulandzelela service kanye nekuvakasha
- [Authentication & Permissions](./authentication) -- Inchubo yekungena, JWT, OAuth, sifanekiso semvumo
- [Module Structure](../module-structure) -- Sifanekiso sekuhlelwa kwekhodi
