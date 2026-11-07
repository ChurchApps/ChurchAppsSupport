---
title: "Mesajlaşma Uç Noktaları"
---

# Mesajlaşma Uç Noktaları

<div class="article-intro">

Mesajlaşma modülü, gerçek zamanlı görüşmeleri, sohbet mesajlarını, anlık bildirimleri, SMS/e-posta iletimini, WebSocket bağlantılarını, özel mesajlaşmayı, cihaz kaydını ve kısa mesaj sağlayıcılarını yönetir. Hem canlı yayın sohbeti hem de eşzamansız bildirimler için tüm ChurchApps uygulamalarında kullanılan iletişim katmanını sağlar.

</div>

**Temel yol:** `/messaging`

## Görüşmeler

Temel yol: `/messaging/conversations`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/timeline/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklere göre görüşmeleri, ilk ve son mesajlarıyla birlikte yükler |
| GET | `/messages/:contentType/:contentId` | JWT | — | İçerik için görüşmeleri, sayfalanmış mesajlarla birlikte yükler (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Geçerli kullanıcının grupları için gönderi türündeki görüşmeleri alır |
| GET | `/posts/group/:groupId` | JWT | — | Belirli bir grup için gönderi türündeki görüşmeleri alır |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | B1 Admin Notlar sayfası için tüm kayıtlardaki en yeni notları getirir. `section` değeri `people`, `groups`, `events` veya `workflows` olmalıdır (aksi halde 400 döner); `limit` varsayılan olarak 25'tir (en fazla 100); `before`, önceki sayfadan gelen imleçtir. Her not kendi türünün kuralından geçer (Kişi Düzenleme / gizli notlar izni, grubun liderleri, etkinlik görüntüleyicileri, iş akışı kartı görüntüleyicileri), bu nedenle çağıranlar yalnızca açabilecekleri notları görür. Not metni 300 karakterle kesilir |
| GET | `/current/:churchId/:contentType/:contentId` | Herkese açık | — | İçerik için geçerli görüşmeyi alır veya oluşturur (contentId otomatik olarak çözülür) |
| GET | `/:churchId/:contentType/:contentId` | Herkese açık | — | İçerik türü ve kimliğine göre görüşmeleri yükler |
| GET | `/:churchId/:id` | Herkese açık | — | Kimliğe göre tek bir görüşmeyi yükler |
| POST | `/` | JWT | — | Görüşmeleri oluşturur veya günceller (toplu) |
| POST | `/start` | JWT | — | İlk yorum mesajıyla yeni bir görüşme başlatır |
| DELETE | `/:churchId/:id` | JWT | — | Bir görüşmeyi siler |

### Kişi notlarına erişim denetimi

`contentType: "person"` (kişi kaydındaki Notlar sekmesi) veya `contentType: "personConfidential"` (Gizli Notlar bölümü) olan görüşmeler, her okuma ve yazma yolunda denetlenir. Bu, yukarıdaki herkese açık rotalar dahil, bu içerik türleri için `401` döndüren tüm yollardır. `person` için MembershipApi **People / Edit** izni gerekir; `personConfidential` için **People / View Confidential Notes** izni gerekir. Kapsamlı API anahtarları için `people:write` her iki işlemi de kapsar (anahtarın kullanıcısı yine de ilgili rol iznine sahip olmalıdır).

### Grup ve etkinlik notlarına erişim denetimi {#group-and-event-notes-access-control}

Denetlenen iki not içerik türü daha vardır. Bunlar da her okuma ve yazma yolunda (yukarıdaki herkese açık rotalar dahil) aynı şekilde denetlenir ve anonim gönderime asla açık değildir:

- **`groupNote`** (`contentId` = grup kimliği) -- bir gruptaki **Lider notları** akışı. Yalnızca o grubun liderleri (JWT üzerindeki `leaderGroupIds`) okuyabilir veya gönderebilir. `content.edit` ve grup üyeliği izinleri dahil hiçbir personel izni erişim sağlamaz.
- **`eventNote`** (`contentId` = etkinlik kimliği) -- takvim etkinliğindeki notlar. `content.edit` veya **Calendars / Admin** iznine sahip personel her zaman okuyabilir ve gönderebilir. Diğer durumlarda erişim, etkinliğin `notesViewRole` (okuma) ve `notesPostRole` (gönderme) alanlarını izler: `staff` (alan `null` olduğunda kullanılan varsayılan) başka kimseye izin vermez, `leaders` etkinliğin grubunun liderlerine izin verir, `members` ise etkinlik grubunun üyelerine ve liderlerine izin verir. `groupId`'si olmayan bir etkinlik yalnızca personele açıktır.

### İş akışı kartı notlarına erişim denetimi

`contentType: "workflowCard"` olan görüşmeler (bir iş akışı kartındaki notlar; burada `contentId` kartın görev kimliğidir) yalnızca o kartı açabilen kişi tarafından okunabilir ve yazılabilir. Bu kişi, DoingApi **Tasks / View** iznine sahip bir kullanıcı ya da kartın atandığı, oluşturulduğu veya ilgili olduğu kişi veya gruptur. Diğer herkes, yukarıdaki herkese açık rotalar dahil her okuma yolunda `401` alır. Bir kartın görüşmesi, kartın kendisi üzerinden `POST /doing/tasks/:id/conversation` ile eklenir (gövde `{ "conversationId": "..." }`; eklenen ilk görüşme geçerli olur). Bu uç noktayı kartın düzenleyicileri ve atanan kişisi çağırabilir.

### Örnek: Bir Görüşme Başlatma

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

## Mesajlar

Temel yol: `/messaging/messages`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/conversation/:conversationId` | JWT | — | Bir görüşmenin tüm mesajlarını yükler |
| GET | `/catchup/:churchId/:conversationId` | Herkese açık | — | Bir görüşmenin tüm mesajlarını yükler (canlı sohbet için herkese açık catchup) |
| GET | `/:churchId/:id` | Herkese açık | — | Kimliğe göre tek bir mesajı yükler |
| POST | `/` | JWT | — | Mesajları kaydeder (toplu). Gerçek zamanlı güncellemeler gönderir ve bildirimleri tetikler. Mevcut bir mesajı güncellemek için yazar olmak veya `content.edit` iznine sahip olmak gerekir; kayıtlı yazar asla değiştirilemez |
| POST | `/send` | Herkese açık | — | Mesajları gönderir (toplu, herkese açık). WebSocket üzerinden gerçek zamanlı güncellemeler gönderir ve bildirimleri tetikler |
| POST | `/setCallout` | JWT | — | (eski) Bir uyarı mesajını gerçek zamanlı yayınlar. Aktif bir istemci yok; canlı yayın sohbeti artık uyarıları göstermiyor |
| DELETE | `/:churchId/:id` | JWT | — | Bir mesajı siler ve silme işlemini gerçek zamanlı yayınlar. Bkz. [Mesaj moderasyonu](#message-moderation) |

### Mesaj moderasyonu

Bir mesajı silmeye şu kişilere izin verilir:

- mesajın yazarı;
- kilise genelinde `content.edit` iznine sahip personel;
- **grup liderleri**, `contentType` değeri `group` veya `groupAnnouncement` olan ve `contentId`'si yönettikleri bir grup olan görüşmeler için (JWT üzerindeki `leaderGroupIds`).

Kişi notu görüşmeleri (`person` / `personConfidential`) hiçbir zaman lider moderasyonuna tabi değildir; bunların yerine notlar izinleri (`people.edit`, `people.viewConfidentialNotes`) kullanılır.

Liderler yalnızca silme yetkisi alır, düzenleme yetkisi almaz. Başka bir üyenin mesajını yeniden yazma, yazar ve `content.edit` personeli ile sınırlı kalır.

### Örnek: Bir Mesaj Gönderme

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

## Özel Mesajlar

Temel yol: `/messaging/privatemessages`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/` | JWT | — | Geçerli kullanıcının tüm özel mesajlarını yükler (görüşme başına son mesajı içerir ve hepsini okundu olarak işaretler) |
| GET | `/existing/:personId` | JWT | — | Belirli bir kişiyle mevcut bir özel görüşmeyi bulur |
| GET | `/:id` | JWT | — | Kimliğe göre bir özel mesajı yükler (geçerli kullanıcıya gönderilmişse bildirimi temizler) |
| POST | `/` | JWT | — | Özel mesajları gönderir (toplu). Alıcıya anlık bildirim tetikler |

## Bildirimler

Temel yol: `/messaging/notifications`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/unreadCount` | JWT | — | Geçerli kullanıcının okunmamış bildirim sayısını alır |
| GET | `/my` | JWT | — | Geçerli kullanıcının tüm bildirimlerini yükler (hepsini okundu olarak işaretler) |
| GET | `/tmpEmail` | Herkese açık | — | Günlük e-posta bildirim özetini tetikler (hata ayıklama/cron uç noktası) |
| GET | `/:churchId/person/:personId` | JWT | — | Belirli bir kişinin bildirimlerini yükler |
| GET | `/:churchId/:id` | JWT | — | Kimliğe göre bir bildirimi yükler |
| POST | `/` | JWT | — | Bildirimleri oluşturur veya günceller (toplu) |
| POST | `/create` | JWT | — | Birden çok kişi için bildirim oluşturur. Gövde: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Bir kişinin tüm bildirimlerini okundu olarak işaretler |
| POST | `/sendTest` | JWT | — | Test anlık bildirimi gönderir. Gövde: `{ personId, title }` |
| POST | `/ping` | Herkese açık | — | Harici bir tetikleyiciden bildirim oluşturur. Gövde: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Bir bildirimi siler |

### Örnek: Bildirim Oluşturma

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

## Bildirim Tercihleri

Temel yol: `/messaging/notificationpreferences`

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/categories` | JWT | — | Bildirim kategorilerini, varsayılan ve izin verilen kanallarıyla listeler |
| GET | `/my` | JWT | — | Geçerli kullanıcının bildirim tercihlerini yükler (hiç yoksa varsayılanları otomatik oluşturur) |
| POST | `/` | JWT | — | Geçerli kullanıcının tercihlerini kaydeder. Gövde: `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay` alanlarından herhangi biri ile isteğe bağlı `overrides: [{ categoryKey, channel, optedIn }]` (channel değeri `push`, `email`, `in_app` veya `sms` olabilir; kilitli kategoriler yok sayılır). `allowSms`, üyenin metin hatırlatmaları için verdiği onaydır. Eski satır dizisi biçimindeki gövde hâlâ kabul edilir |

## Bağlantılar

Temel yol: `/messaging/connections`

Sohbet, grup görüşmeleri, özel mesajlar ve canlı yayın için WebSocket/gerçek zamanlı bağlantılarını yönetir. Uçtan uca protokol için bkz. [Gerçek Zamanlı Mimari](../../realtime).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/:churchId/:conversationId` | Herkese açık | — | Bir görüşmenin tüm bağlantılarını yükler |
| POST | `/` | Herkese açık | — | Bağlantıları kaydeder (toplu). Görüşmede bir katılım yayını tetikler. Gövde öğeleri: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Herkese açık | — | Soket kimliğine göre bir bağlantının görünen adını günceller. Gövde: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Herkese açık | — | Bir bağlantıyı görüşmeden çıkarır. Katılım yayını tetikler |
| POST | `/tmpSendAlert` | Herkese açık | — | Bir kişinin bağlantılarına bildirim uyarısı gönderir. Gövde: `{ churchId, personId }` |

## Cihazlar

Temel yol: `/messaging/devices`

Anlık bildirimler ve içerik eşleştirme için cihaz kaydını yönetir (ör. TV ekranlarındaki Lessons uygulaması).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| POST | `/enroll` | JWT | — | Bir cihazı kaydeder veya günceller (mobil anlık bildirim kaydı). FCM belirteci veya cihaz kimliğine göre eşleşir |
| POST | `/enrollAnon` | Herkese açık | — | Anonim bir cihazı kaydeder ve 4 karakterli bir eşleştirme kodu üretir |
| POST | `/` | Herkese açık | — | Cihazları kaydeder (toplu) |
| GET | `/pair/:pairingCode` | JWT | — | Bir cihazı eşleştirme koduyla eşleştirir. İçerik atamak için isteğe bağlı `?contentType=&contentId=` |
| GET | `/status/:deviceId` | Herkese açık | — | Bir cihazın eşleştirme durumunu kontrol eder |
| GET | `/:churchId` | JWT | — | Bir kilisenin tüm cihazlarını yükler |
| GET | `/:churchId/person/:personId` | JWT | — | Bir kişinin tüm cihazlarını yükler |
| GET | `/:churchId/:id` | JWT | — | Kimliğe göre bir cihazı yükler |
| DELETE | `/:churchId/:id` | JWT | — | Bir cihazı siler |

### Örnek: Bir Cihazı Kaydetme

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

## Cihaz İçerikleri

Temel yol: `/messaging/devicecontents`

Eşleştirilmiş cihazlar için içerik atamalarını yönetir (ör. TV'de hangi dersin gösterildiği).

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/deviceId/:deviceId` | JWT | — | Bir cihaz için içerik atamalarını yükler |
| POST | `/` | JWT | — | Cihaz içerik atamalarını kaydeder (toplu) |
| DELETE | `/:id` | JWT | — | Bir cihaz içerik atamasını siler |

## Kısa Mesajlaşma

Temel yol: `/messaging/texting`

SMS kısa mesaj sağlayıcılarını, grup metin mesajlaşmasını ve teslimat takibini yönetir.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/providers` | JWT | — | Kilise için kısa mesaj sağlayıcılarını yükler (kimlik bilgileri maskelenir) |
| GET | `/status` | JWT | — | `{ enabled }`: kilisenin etkin bir kısa mesaj sağlayıcısı olup olmadığını gösterir. Oturum açmış herhangi bir kilise kullanıcısı tarafından erişilebilir; yalnızca metin gönderilebildiğinde **Text** seçeneklerini göstermek için kullanılır |
| GET | `/inboundUrl` | JWT | `texting.send` veya `settings.edit` | `{ url }`: sağlayıcıya yapıştırılacak kilisenin gelen (STOP) webhook URL'si |
| POST | `/inbound/:churchId/:token` | Herkese açık | — | Sağlayıcının gelen mesaj webhook'u. `token`, kilise kimliğinin HMAC'idir. Yanıt tam olarak bir durdurma sözcüğü ise (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), eşleşen her kişi `optedOut` olarak işaretlenir ve `allowSms` değeri kapatılır. `{ optedOut: <count> }` döndürür; diğer yanıtlar `{ optedOut: 0 }` döndürür |
| GET | `/preview/:groupId` | JWT | — | Bir grup metni için alıcıları önizler (uygun, abonelikten çıkmış ve telefonu olmayan kişi sayıları) |
| GET | `/sent` | JWT | — | Kilise için gönderilen tüm metin mesajı kayıtlarını yükler |
| GET | `/sent/:id/details` | JWT | — | Alıcı başına teslimat günlükleriyle birlikte gönderilen bir metni yükler |
| POST | `/providers` | JWT | — | Kısa mesaj sağlayıcılarını kaydeder (toplu). API kimlik bilgilerini şifreler |
| POST | `/send` | JWT | — | Bir grubun tüm uygun üyelerine SMS gönderir. Gövde: `{ groupId, message }`. Birleştirme alanları (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) alıcı başına çözümlenir |
| POST | `/sendPerson` | JWT | — | Tek bir kişiye SMS gönderir. Gövde: `{ personId, phoneNumber, message }`. Birleştirme alanları çözümlenir ve kaydedilen metin çözümlenmiş metindir |
| DELETE | `/providers/:id` | JWT | — | Bir kısa mesaj sağlayıcısını siler |

### Örnek: Grup Metni Gönderme

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

## E-posta Şablonları

Temel yol: `/messaging/emailTemplates`

Yeniden kullanılabilir e-posta şablonlarını ve gruplara şablonlu e-posta gönderimini yönetir.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/` | JWT | — | Kilise için tüm e-posta şablonlarını yükler |
| GET | `/:id` | JWT | — | Kimliğe göre tek bir e-posta şablonunu yükler |
| GET | `/sendStatus` | JWT | `groupMembers.edit` veya `tasks.admin` | Kilisenin grup e-posta durumu: `{ approved, paused, remaining, requested }`. B1Admin'in **Send Email** iletişim kutusu ve iş akışındaki **Send email** eylemi, e-postanın gönderilmeyeceği durumlarda uyarmak için bunu kullanır |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Destek ekibinden kilisenin grup e-postası için onay istemesi (kilise başına haftada en fazla bir kez) |
| GET | `/preview/:groupId` | JWT | — | Bir grup için e-posta teslimatını önizler (uygun alıcı sayısı, e-posta adresi olmayan üyeler) |
| POST | `/` | JWT | — | E-posta şablonlarını oluşturur veya günceller (toplu) |
| POST | `/send` | JWT | — | Bir grubun tüm üyelerine şablonlu e-posta gönderir. Gövde: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Bir e-posta şablonunu siler |

### Örnek: Gruba E-posta Gönderme

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

**Desteklenen birleştirme alanları:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Engellenen IP'ler

Temel yol: `/messaging/blockedips`

(eski) Canlı yayın sohbeti için IP engelleme. B1App istemcisi artık `POST /` çağırmıyor; IP engelleme, birleşik teslimat geçişinde kaldırıldı. `/clear` rotası, yayın hizmetleri kaydedildiğinde `StreamingServiceController` tarafından hâlâ sunucudan sunucuya çağrılıyor.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| POST | `/` | JWT | — | (eski) Engellenen IP'leri kaydeder (toplu). Aktif istemci yok |
| POST | `/clear` | JWT | — | Belirli hizmetler için tüm engellenen IP'leri temizler. Gövde: `[{ serviceId, churchId }]` |

## Teslimat Günlükleri

Temel yol: `/messaging/deliverylogs`

Gönderilen mesajların (SMS, anlık bildirim, e-posta) teslimat durumunu izler.

| Yöntem | Yol | Yetkilendirme | İzin | Açıklama |
|--------|------|------|------|----------|
| GET | `/content/:contentType/:contentId` | JWT | — | İçerik türü ve kimliğine göre teslimat günlüklerini yükler |
| GET | `/person/:personId` | JWT | — | Bir kişinin teslimat günlüklerini yükler. İsteğe bağlı `?startDate=&endDate=` filtreleri |
| GET | `/recent` | JWT | — | Kilise için son teslimat günlüklerini yükler. İsteğe bağlı `?limit=` (varsayılan 100) |
| GET | `/:id` | JWT | — | Kimliğe göre bir teslimat günlüğünü yükler |

## İlgili Sayfalar

- [Gerçek Zamanlı Mimari](../../realtime) -- WebSocket protokolü, oda abonelikleri ve birleşik teslimat çerçevesi
- [Web Anlık Bildirimleri](../../web-push) -- Tarayıcı anlık bildirim kaydı ve teslimatı
- [Üyelik Uç Noktaları](./membership) -- Kişiler, gruplar, roller ve temel kimlik
- [Katılım Uç Noktaları](./attendance) -- Hizmet ve ziyaret takibi
- [Kimlik Doğrulama ve İzinler](./authentication) -- Oturum açma akışı, JWT, OAuth, izin modeli
- [Modül Yapısı](../module-structure) -- Kod organizasyon kalıpları
