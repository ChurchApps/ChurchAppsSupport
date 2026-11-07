---
title: "Bağlı Uygulamalar ve OAuth"
---

# Bağlı Uygulamalar ve OAuth

<div class="article-intro">

B1 API, üçüncü taraf bir uygulamanın her kilise yöneticisinden verilerine erişim izni istemesine olanak tanıyan OAuth 2.0'ı destekler. Bu süreçte kilise hiçbir zaman parola veya API anahtarı paylaşmak zorunda kalmaz. **Bağlı Uygulama**, bir kilise yöneticisinin onayladığı OAuth jetonudur; iptal edildiğinde üçüncü taraf uygulamanın erişimi tek tıklamayla sona erer. Bu yolu çok kiracılı SaaS bağlayıcıları için kullanın. Tek bir kilise entegrasyonu için [API Anahtarları](./api-keys) tercih edin.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- Kiliselerin erişim verebilmesi için bir OAuth **istemcisinin** kayıtlı olması gerekir. Bu, ya bir B1 sunucu yöneticisi tarafından ya da istemcinin kendisi tarafından [dinamik kayıt](#dynamic-client-registration) yoluyla yapılır.
- Tüm OAuth uç noktaları Üyelik modülü altında bulunur: `/membership/oauth/...`
- Erişim jetonları JWT'lerdir. Kullanıcının izinlerini, verilen kapsamlara göre filtrelenmiş olarak taşırlar.

</div>

## Kavramlar

| Terim | Anlamı |
|---|---|
| **OAuth istemcisi** | Üçüncü taraf uygulamanın kendisi. `client_id` ile tanımlanır, `client_secret` ile korunur. B1'e bir kez kaydedilir ve bunu kuran tüm kiliseler arasında paylaşılır. |
| **Bağlı Uygulama** | Yöneticinin istemciye erişim verdiği belirli bir `(istemci, kilise yöneticisi)` çifti. Her Bağlı Uygulama bir OAuth yenileme jetonuyla desteklenir. |
| **Erişim jetonu** | İstemcinin API çağrılarında kullandığı, kısa ömürlü bir JWT (≈ 7 gün). Kullanıcı JWT'siyle aynı biçimdedir: `Authorization: Bearer <jwt>`. |
| **Yenileme jetonu** | İstemcinin yeni erişim jetonları üretmek için kullandığı, uzun ömürlü ve içeriği yorumlanamayan bir dize (≈ 90 gün). |
| **Kapsam** | Erişim jetonunun neler yapabileceğini sınırlar. [Kapsam kataloğuna](./api-keys#scopes) bakın. |

## Yetkilendirme Akışları

B1, RFC 6749 ve RFC 8628 ile tanımlanan üç OAuth akışını destekler.

### Yetkilendirme Kodu (web uygulamaları)

Uygulamanızın sunucu tarafı bir bileşeni olduğunda ve `client_secret` değerini gizli tutabildiğinde kullanın.

1. **Yetkilendirin**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Genel istemciler (`client_secret` içermeyenler) ayrıca `"code_challenge": "..."` ve `"code_challenge_method": "S256"` göndermelidir (PKCE, RFC 7636). Yalnızca `S256` kabul edilir.

   Dönen yanıt: `{ "code": "...", "state": "xyz" }`. Yetkilendirme kodu uç noktası bilerek kimliği doğrulanmış bir POST isteğidir. Uygulamanız kullanıcının B1 JWT'sini toplar (genellikle kullanıcının B1 oturumunda bir düğme barındırarak) ve bunu onay adımının bir parçası olarak iletir.

2. **Kodu jetonlarla değiştirin**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Yetkilendirme adımında bir `code_challenge` gönderildiyse, eşleşen `"code_verifier": "..."` değerini ekleyin. Genel bir istemci doğrulayıcıyı gönderir ve `client_secret` değerini atlar. Jeton uç noktası JSON veya form kodlamalı (`application/x-www-form-urlencoded`) gövdeleri kabul eder.

   Jeton yanıtı şöyle görünür:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Erişim jetonunun süresi dolmak üzereyken yenileyin:**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Yenileme jetonu 90 gün kullanılmazsa sona erer. Süresi dolmuşsa kilise yöneticisi yeniden yetkilendirme yapar.

### Cihaz Kodu (TV'ler, kiyosklar, CLI)

Cihazın tarayıcısı olmadığında kullanın. RFC 8628 ile tanımlanır.

1. **Bir cihaz kodu isteyin**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Kullanıcıya gösterilecek kodu ve yoklama aralığını döndürür:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. `user_code` ve `verification_uri` değerlerini kullanıcıya gösterin.

3. `grant_type=urn:ietf:params:oauth:grant-type:device_code` ve `device_code` ile `/membership/oauth/token` adresini **yoklayın**. Standart yanıtlar şunlardır:

   | Hata | Anlamı |
   |---|---|
   | `authorization_pending` | Kullanıcı henüz onaylamadı. Önerilen aralıkta yoklamaya devam edin. |
   | `expired_token` | Cihaz kodunun `expires_in` süresi doldu. Baştan başlayın. |
   | `access_denied` | Kullanıcı isteği reddetti. |
   | _(yok — 200 OK)_ | Onaylandı. Gövde bir `B1TokenResponse` nesnesidir. |

4. Onaylandıktan sonra `refresh_token` değerini saklayın ve süresi dolana kadar `access_token` değerini kullanın.

B1 SDK'sı, RFC uyumlu makul bir geri çekilme (backoff) ile yoklama döngüsünü sizin yerinize çalıştıran `B1OAuthClient.awaitDeviceToken(...)` metodunu içerir.

### Yenileme Jetonu

Elinizde bir `refresh_token` olduğunda bu akış her zaman bağımsız bir istek olarak kullanılabilir:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Yeni bir `access_token` ve `refresh_token` döner. **Genel istemciler** (`client_secret` içermeyenler), yenilemede `client_secret` değerini atlayabilir. Bu, gizli anahtarı saklayamayan mobil ve masaüstü OAuth uygulamaları için kullanışlıdır.

Yenileme jetonları döndürülür, ancak eski jeton hemen atılmaz. Bir istemci yenileme yanıtını hiç almazsa (örneğin, istek sırasında gücü veya Wi-Fi bağlantısı kesilen bir TV), önceki `refresh_token` ile **7 güne kadar** yeniden deneyebilir. Yeniden deneme yalnızca yerine geçen jeton henüz kullanılmadıysa başarılı olur. Kullanılmayan yedek jeton o noktada atılır ve yeni bir çift verilir. Yerine geçen jeton kendisi yenilendiyse, eski jeton `invalid_grant` hatası döndürür. Bir bağlantıyı iptal etmek, bekleme penceresinde hâlâ geçerli olan döndürülmüş jetonları da iptal eder. Bağlı uygulamalar listesinde her bağlantı yalnızca bir kez görünür.

## Jeton Yapısı

Erişim jetonu, B1 tarafından verilen ve bir kullanıcının `POST /membership/users/login` uç noktasından alacağı jetonla aynı olan bir JWT'dir. Aynı modüler izin talebini taşır ve her denetleyicide aynı `checkAccess` davranışını gösterir. **Tek fark**, izinler dizisinin üretildiği anda verilen kapsamlardan geçirilmiş olmasıdır. Kapsamlı bir erişim jetonu, benzer kapsamlı bir API anahtarının yapamayacağı hiçbir şeyi yapamaz. Ayrıca hiçbir denetleyicide ayrı bir "OAuth yolu" yoktur. `actionWrapper`, taşıyıcının bir kişi, bir API anahtarı veya bir OAuth istemcisi olup olmadığını bilmez.

## Bağlı Uygulamalar (Kullanıcıya Yönelik)

Bir kilise yöneticisinin bakış açısından "Bağlı Uygulamalar", kiliselerine erişim verilmiş uygulamaların listesidir. Her satır, canlı bir `(OAuthClient, OAuthToken)` çiftini temsil eder.

B1Admin'de **Ayarlar → Geliştirici → Bağlı Uygulamalar** bölümünde şunlar görünür:

- İstemcinin adı
- Yöneticinin onayladığı kapsamlar
- Erişimin verildiği tarih
- Bir **İptal Et** düğmesi

| Yöntem ve Yol | Kimlik Doğrulama | Amaç |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Çağıranın kendi etkin bağlantılarını listeler (istemci adı ve kapsamlarla birlikte) |
| `DELETE /membership/oauth/connections/:id` | JWT | Bir bağlantıyı OAuth jeton kimliğiyle iptal eder. Jeton bir sonraki istekte çalışmayı durdurur. |

Liste, süresi dolmuş jetonları otomatik olarak dışarıda bırakır.

## Kapsamlar ve Onay

Kapsam dizeleri, [API anahtarlarıyla](./api-keys#scopes) aynı kataloğu kullanır. İstemciler için en iyi uygulamalar şunlardır:

- **İşinizi görecek en dar kapsamları isteyin.** Yalnızca kişileri okumanız gerekirken `donations:write` isterseniz kiliseler bunu fark eder.
- **Kısa ömürlü erişim jetonlarını bir yenileme jetonuyla birlikte kullanın.** Uzun ömürlü erişim jetonlarını hızlıca iptal etmek daha zordur.
- **Verilen kapsamları her zaman kendi arayüzünüzde kullanıcıya gösterin.** Böylece neyi onayladıklarını doğrulayabilirler.

## OAuth İstemci Yönetimi

OAuth istemcileri (yani üçüncü taraf uygulamaların kendileri) genel olarak kaydedilir. `client_secret` içeren gizli bir istemciyi bir B1 sunucu yöneticisi oluşturur. Bir istemci yayınlamak için ChurchApps ekibiyle iletişime geçip bir `client_id` / `client_secret` çifti isteyin ve yönlendirme URI'lerinizi kaydettirin. MCP bağlayıcıları gibi genel istemciler ise (aşağıda) kendilerini kaydedebilir.

Kayıtlı yönlendirme URI'leri, istekteki `redirect_uri` ile tam olarak eşleşmelidir. Önek veya kısmi eşleşmeler reddedilir.

| Yöntem ve Yol | İzin | Açıklama |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Tüm OAuth istemcilerini listeler |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Bir istemciyi genel kimliğiyle getirir (gizli anahtar gizlenir) |
| `POST /membership/oauth/clients` | Server.Admin | Bir istemci oluşturur veya günceller |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Bir istemciyi siler |

### Dinamik İstemci Kaydı

`POST /membership/oauth/register` (genel, RFC 7591), claude.ai'nin MCP bağlayıcısı gibi bir istemcinin kendini kaydetmesine olanak tanır. Bu uç nokta, API'nin `/.well-known/oauth-authorization-server` belgesinde duyurulur. Bkz. [MCP Sunucusu → OAuth Keşfi](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Yanıt olarak `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) ve `token_endpoint_auth_method: "none"` içeren 201 yanıtı döner.

- Hiçbir gizli anahtar verilmez. Bu nedenle istemci her yetkilendirmede PKCE kullanmak zorundadır.
- `redirect_uris` 1–10 adet `https` URL'si olmalıdır. `localhost`, `127.0.0.1` veya `[::1]` üzerinde ise `http` de olabilir.
- `client_name`, 45 karaktere kırpılır (varsayılan: "AI assistant").
- IP başına saatte en fazla 20 kayıtla sınırlıdır.

B1Admin onay sayfasında, kendini kaydetmiş bir istemci için bunun kendi kendine kaydedildiğini belirten bir bildirim gösterilir. Bu istemcinin, kullanıcının kendi B1 hesabının yapabileceklerinden fazlasını asla yapamayacağı belirtilir. Ayrıca bağlantısı **Ayarlar → Geliştirici → Bağlı Uygulamalar** bölümünden kesilebilir.

## SDK Desteği

`@churchapps/integration-sdk` paketi, her OAuth akışını tipli yardımcı fonksiyonlarla sarmalar: `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()` ve `.awaitDeviceToken()`. Paket README'sine bakın. Uçtan uca bir örnek için [Webhooks](./webhooks#sdk-support) sayfasına da göz atabilirsiniz.
