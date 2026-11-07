---
title: "Kimlik Doğrulama ve İzinler"
---

# Kimlik Doğrulama ve İzinler

<div class="article-intro">

ChurchApps API'si JWT tabanlı kimlik doğrulama kullanır. Kullanıcılar giriş yaptıklarında kimliklerini, kilise üyeliklerini ve izinlerini içeren bir token alırlar. Bu sayfada kimlik doğrulama akışı, izin modeli ve OAuth desteği ele alınmaktadır.

</div>

## Giriş Akışı

### Standart Giriş

```
POST /membership/users/login
```

**Kimlik doğrulama:** Herkese açık

Üç kimlik bilgisi türünden birini kabul eder:

| Alan | Açıklama |
|-------|-------------|
| `email` + `password` | Standart e-posta ve parola ile giriş |
| `jwt` | Mevcut bir JWT ile yeniden kimlik doğrulama |
| `authGuid` | Tek kullanımlık kimlik doğrulama bağlantısı (karşılama ve sıfırlama e-postalarında kullanılır) |

**Yanıt:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

`token` alanı, sonraki isteklerde `Authorization: Bearer <token>` başlığıyla gönderilmesi gereken bir JWT'dir.

### İki Adımlı Doğrulamalı Giriş

Kullanıcılar kimlik doğrulayıcı uygulaması (TOTP) ile iki adımlı girişi etkinleştirebilir. Bu kullanıcılar için `email` + `password`, `authGuid` veya SSO girişi token döndürmez. Bunun yerine bir doğrulama sorusu döndürür:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Doğrulama token'ı 5 dakika geçerlidir. Kodla birlikte aynı uç noktaya geri gönderin:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` alanına kimlik doğrulayıcıdaki mevcut 6 haneli kod veya kullanıcının on tek kullanımlık yedek kodundan biri girilebilir. Yanlış kod `Invalid code` yanıtı döndürür ve hesap başına tekrarlanan hatalı denemeler hız sınırlamasına tabidir. `jwt` ile yeniden girişte doğrulama istenmez, bu nedenle mevcut oturumlar yenilenmeye devam eder. Giriş yanıtındaki `user` nesnesi `mfaEnabled` alanını içerir.

Self-servis uç noktaları (yalnızca oturum açmış kullanıcı, `/membership/users/mfa` altında):

| Uç nokta | Açıklama |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Kurulumu başlatır; QR kodu için `{ secret, otpauthUrl }` döndürür |
| `POST /enable` | Gövde `{ code }`; özelliği açar ve `{ backupCodes }` değerini yalnızca bir kez döndürür |
| `POST /disable` | Gövde `{ code }` (kimlik doğrulayıcı veya yedek kod); özelliği kapatır |
| `POST /reset/:userId` | Yalnızca Server.Admin; başka bir kullanıcı için kapatır |

Gizli anahtarlar şifrelenmiş olarak saklanır, yedek kodlar ise karma (hash) olarak saklanır. Etkinleştirme, devre dışı bırakma ve sıfırlama işlemleri denetim günlüğüne yazılır.

### Token İçeriği

JWT şu bilgileri içerir:
- `id` — Kullanıcı kimliği
- `churchId` — Şu anda seçili kilise
- `personId` — Seçili kilisedeki kişi kaydı
- API başına izin dizileri

### Kilise Seçimi

Kullanıcılar birden fazla kiliseye üye olabilir. Giriş yanıtı, tüm kiliseleri ve bunlardaki izinleri içerir. Kilise değiştirmek için istemci, giriş yanıtındaki verilerden farklı bir kiliseye yönelik yeni bir JWT oluşturur.

## Kullanıcı Kaydı

### Yeni Kullanıcı Kaydetme

```
POST /membership/users/register
```

**Kimlik doğrulama:** Herkese açık

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Geçici bir parolayla kullanıcı oluşturur ve bir kimlik doğrulama bağlantısı içeren karşılama e-postası gönderir. Yeni bir sunucuda kaydedilen ilk kullanıcıya otomatik olarak sunucu yöneticisi erişimi verilir.

İki isteğe bağlı bot tuzağı alanı kabul edilir: `website` (gerçek kullanıcıların boş bıraktığı gizli bir tuzak alanı) ve `fillMs` (formun milisaniye cinsinden kaç süre açık kaldığı). `website` doldurulmuşsa veya `fillMs` 2000'in altındaysa hesap oluşturulmaz, ancak uç nokta yine de normal görünümlü bir `200` yanıtı döndürür; böylece botlar reddedildiklerini anlayamaz. Bu iki alanı da göndermeyen istemciler normal şekilde kayıt olur.

### Yeni Kilise Kaydetme

```
POST /membership/churches/add
```

**Kimlik doğrulama:** JWT

Bir kullanıcıyı kaydettikten sonra, bir kilise oluşturmak ve kullanıcıyı bu kiliseyle ilişkilendirmek için bu uç noktayı çağırın.

## Parola Yönetimi

| Yöntem | Yol | Kimlik doğrulama | Açıklama |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Herkese açık | Parola sıfırlama e-postası gönderir. Gövde: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Herkese açık | Sıfırlama e-postasındaki kimlik doğrulama GUID'ini kullanarak yeni bir parola belirler. Gövde: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Oturum açmış kullanıcının parolasını değiştirir. Gövde: `{ "newPassword": "..." }` |

## İzin Modeli

İzinler modüllere göre düzenlenir ve roller aracılığıyla kullanıcılara atanır. Her iznin bir **içerik türü** ve bir **işlemi** vardır.

### İzin Başvurusu

| Görüntüleme bölümü | İçerik türü | İşlem | Açıklama |
|----------------|--------------|--------|-------------|
| **Katılım** | Attendance | Checkin | Üyeleri ayinlerde giriş yaptırır |
| | Attendance | Edit | Katılım kayıtlarını düzenler |
| | Services | Edit | Ayinleri ve ayin saatlerini yönetir |
| | Attendance | View | Katılım kayıtlarını görüntüler |
| | Attendance | View Summary | Katılım özetlerini ve raporlarını görüntüler |
| **Bağışlar** | Donations | Edit | Bağış kayıtları oluşturur ve düzenler |
| | Settings | Edit | Bağış/ödeme ayarlarını düzenler |
| | Donations | View Summary | Bağış özet raporlarını görüntüler |
| | Donations | View | Tek tek bağış kayıtlarını görüntüler |
| **Kişiler ve Gruplar** | Forms | Admin | Formların tam yönetimi |
| | Forms | Edit | Form tanımlarını düzenler |
| | Plans | Edit | Ayin planlarını düzenler |
| | Group Members | Edit | Grup üyelerini ekler/çıkarır |
| | Groups | Edit | Grup oluşturur ve düzenler |
| | Households | Edit | Hane atamalarını düzenler |
| | People | Edit | Herhangi bir kişi kaydını düzenler |
| | People | Edit Self | Yalnızca kendi kişi kaydınızı düzenler |
| | Roles | Edit | Rolleri ve kullanıcı atamalarını yönetir |
| | Group Members | View | Grup üyesi listelerini görüntüler |
| | People | View Members | Yalnızca üyeleri görüntüler (ziyaretçileri değil) |
| | People | View | Tüm kişileri görüntüler |
| | Roles | View | Rolleri ve atamalarını görüntüler |
| | Settings | Edit | Kilise ayarlarını düzenler |
| **İçerik** | Content | Edit | Sayfaları, bölümleri ve öğeleri düzenler |
| | Settings | Edit | İçerik ayarlarını düzenler |
| | StreamingServices | Edit | Yayın hizmeti yapılandırmasını yönetir |
| | Chat | Host | Sohbet oturumlarına ev sahipliği yapar ve bunları denetler |
| **Mesajlaşma** | Texting | Send | SMS metin mesajları gönderir |

### İzinler Nasıl Denetlenir

Denetleyicilerde izinler `au.checkAccess()` metodu kullanılarak denetlenir:

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Sunucu Yöneticisi

`Server.Admin` izni, tüm kiliselerde tam erişim sağlar. Bu izin ilk kaydolan kullanıcıya atanır ve sunucu yöneticisi rolü aracılığıyla diğer kullanıcılara da verilebilir.

## OAuth 2.0

API, üçüncü taraf entegrasyonları için OAuth 2.0 destekler. İki yetkilendirme türü mevcuttur.

### Yetkilendirme Kodu Akışı

1. **Yetkilendirme:** `POST /membership/oauth/authorize` (JWT gerekir)
   - Gövde: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, yalnızca `S256`), gizli anahtarı olmayan herkese açık istemciler için zorunludur
   - Döndürür: `{ "code": "...", "state": "..." }`

2. **Kodu token ile değiştirme:** `POST /membership/oauth/token` (Herkese açık)
   - Gövde: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Yetkilendirme adımında bir `code_challenge` kullanıldıysa `code_verifier` gönderin; herkese açık istemciler `client_secret` alanını göndermez. JSON veya form kodlamalı gövdeler kabul edilir
   - Döndürür: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Token yenileme:** `POST /membership/oauth/token` (Herkese açık)
   - Gövde: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Erişim token'ları **12 saat** sonra sona erer.

### Cihaz Kodu Akışı (RFC 8628)

Tarayıcısı olmayan cihazlar için (TV uygulamaları, kiosklar):

1. **Cihaz kodu isteme:** `POST /membership/oauth/device/authorize` (Herkese açık)
   - Gövde: `{ "client_id": "...", "scope": "..." }`
   - Döndürür: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Kullanıcı kodu girer:** Kullanıcı, doğrulama URI'sinde kodu girer ve onaylar veya reddeder

3. **Token için sorgulama:** `POST /membership/oauth/token` (Herkese açık)
   - Gövde: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Onaylanana kadar `authorization_pending` döndürür, onaylandıktan sonra erişim token'ını döndürür

### OAuth İstemci Yönetimi

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Tüm OAuth istemcilerini listeler |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Kimliğe göre istemciyi getirir |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | İstemci kimliğine göre istemciyi getirir (gizli anahtar gizlenir) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | İstemci oluşturur veya günceller |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | İstemciyi siler |
| POST | `/membership/oauth/register` | Herkese açık | — | MCP bağlayıcıları gibi herkese açık istemciler için dinamik istemci kaydı (RFC 7591). Bkz. [Bağlı Uygulamalar](../connected-apps#dynamic-client-registration) |

### Cihaz Onay Uç Noktaları

| Yöntem | Yol | Kimlik doğrulama | Açıklama |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Onay arayüzü için bekleyen cihaz kodu bilgisini getirir |
| POST | `/membership/oauth/device/approve` | JWT | Bir cihaz yetkilendirmesini onaylar. Gövde: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Bir cihaz yetkilendirmesini reddeder. Gövde: `{ "user_code": "..." }` |

## Herkese Açık ve Kimliği Doğrulanmış Uç Noktalar

API, kimlik doğrulama gereksinimlerini belirleyen iki sarmalayıcı işlev kullanır:

- **`actionWrapper`** — Geçerli bir JWT gerektirir. Kimliği doğrulanmış kullanıcı nesnesi (`au`), `churchId`, `userId` ve izin denetimleriyle birlikte kullanılabilir.
- **`actionWrapperAnon`** — Kimlik doğrulama gerektirmez. Giriş, kayıt, herkese açık içerik sorguları ve webhook alıcıları için kullanılır.

Bu belgelendirmedeki uç nokta tablolarında bunlar, Kimlik doğrulama sütununda sırasıyla **JWT** ve **Herkese açık** olarak belirtilir.

## İlgili Sayfalar

- [Modül Yapısı](../module-structure) — Denetleyicilerin, depoların ve modellerin nasıl düzenlendiği
- [Yerel Kurulum](../local-setup) — Geliştirme için API'yi yerel olarak çalıştırma
