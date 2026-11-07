---
title: "API Anahtarları"
---

# API Anahtarları

<div class="article-intro">

API anahtarları (kişisel erişim belirteçleri), B1 API'sine sunucu tarafı bir betikten, üçüncü taraf bir bağlayıcıdan (Zapier, Make, Google Sheets) ya da tam bir OAuth akışının gereksiz olduğu her durumdan kimlik doğrulamanın en basit yoludur. Bir anahtar belirli bir kilisedeki belirli bir kişiye bağlıdır ve o kişinin izinlerini devralır. İsteğe bağlı olarak bir dizi kapsam (scope) ile daraltılabilir.

</div>

<div class="prereqs">
<h4>Başlamadan Önce</h4>

- API anahtarlarını **Ayarları Düzenle** iznine sahip bir kilise yöneticisi oluşturur ve yönetir
- Ham anahtar oluşturulduğunda **yalnızca bir kez** gösterilir. Hemen güvenli bir yerde saklayın
- Tüm API istekleri **HTTPS** kullanmalıdır

</div>

## Anahtar Biçimi

B1 API anahtarı şu biçimdedir:

```
cak_<prefix>.<secret>
```

- `cak_`: sabit tanımlayıcı (kimlik doğrulama katmanının eşleştirdiği API anahtarı öneki)
- `<prefix>`: 8 karakterlik herkese açık arama bölümü
- `<secret>`: 48 karakterlik gizli bölüm. Sunucuda yalnızca SHA-256 karma değeri saklanır

Tam anahtar, standart taşıyıcı (bearer) başlığında sunucuya gönderilir:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

API kimlik doğrulama katmanı, `cak_` ile başlayan her belirteci API anahtarı yoluna yönlendirir, gizli bölümün karma değerini hesaplar, önek üzerinden arama yapar ve anahtarın sahibi olan kişinin güncel izinlerini belirler. Bu nedenle B1Admin'de bir izni iptal ettiğinizde değişiklik bir sonraki istekte geçerli olur ve anahtar hiçbir zaman rolle uyumsuz hale gelmez.

## Anahtar Oluşturma (B1Admin)

1. **Ayarları Düzenle** iznine sahip bir kullanıcı olarak B1Admin'de oturum açın.
2. **Ayarlar → Geliştirici → API Anahtarları** bölümünü açın.
3. **Yeni API Anahtarı**'na tıklayın, anahtara tanınabilir bir ad verin (ör. "Zapier — bağış senkronizasyonu"), anahtarın sahip olması gereken kapsamları seçin ve **Kaydet**'e tıklayın.
4. Tam `cak_…` anahtarı bir iletişim kutusunda **yalnızca bir kez** gösterilir. Kapatmadan önce entegrasyonunuzun yapılandırmasına kopyalayın. Anahtarı daha sonra geri almanın bir yolu yoktur, ancak istediğiniz zaman yeni bir anahtar oluşturabilirsiniz.

## Kapsamlar

Bir kapsam, bir anahtarın neler yapabileceğini **daraltır**. Anahtar, altta yatan kişinin sahip olmadığı bir izni asla veremez. Kapsam belirtilmemiş veya boş ise anahtar kişinin tüm izin kümesini taşır.

| Kapsam | İzin verdiği işlemler |
|---|---|
| `people:read` / `people:write` | Kişileri, hanehalklarını ve grup üyelerini görüntüleme / düzenleme |
| `groups:read` / `groups:write` | Grupları ve üyeliklerini görüntüleme / düzenleme |
| `donations:read` / `donations:write` | Bağışları görüntüleme / kaydetme |
| `attendance:read` / `attendance:write` | Devam kayıtlarını, oturumları ve check-in işlemlerini görüntüleme / kaydetme |
| `forms:write` | Formları yönetme (okuma erişimi yazma erişiminin içinde zaten vardır) |
| `content:read` / `content:write` | Web sitesi içeriğini, kayıtları ve yayın içeriğini görüntüleme / düzenleme |
| `messaging:read` / `messaging:write` | Mesajlaşmayı okuma; yazma izni ayrıca SMS gönderilmesine de izin verir |
| `roles:read` / `roles:write` | Rol tanımlarını görüntüleme / düzenleme |
| `settings:read` / `settings:write` | Kilise ayarlarını görüntüleme / düzenleme (webhook'ları programatik olarak kaydetmek için **gereklidir**) |
| `workflows:read` / `workflows:write` | İş akışlarını ve görevleri görüntüleme / iş akışlarını çalıştırma ve düzenleme. Bir iş akışını çalıştırmak e-posta ve metin mesajı gönderebilir, webhook'ları tetikleyebilir ve grup üyeliğini değiştirebilir |
| `offline_access` | Uzun ömürlü yenileme belirteçlerine izin verir (yalnızca OAuth akışları için geçerlidir, API anahtarları üzerinde bir etkisi yoktur) |

`write` kapsamları, karşılık gelen `read` kapsamını da içerir. Sunucu ve alan yöneticisi izinleri bilerek kapsam olarak sunulmaz. Kapsamlı bir kimlik bilgisi site yönetimi yetkisine asla yükseltilemez.

:::tip
Anahtarı webhook kaydetmek için kullanacaksanız (ör. Zapier veya Make entegrasyonu için), anahtarın `settings:write` iznine ihtiyacı vardır. Yalnızca `people:read` iznine sahip bir anahtar, `POST /membership/webhooks` isteğinde sessizce 403 hatası alır.
:::

## Anahtarı Kullanma

Diğer tüm taşıyıcı belirteçlerle aynıdır. Kimlik doğrulaması yapılan her uç nokta, API anahtarlarını JWT'lerle tamamen aynı şekilde kabul eder:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Yetersiz kapsamlara sahip bir anahtarla yapılan istek, izin reddi hatalarında kullanılan yapının aynısıyla **403 Forbidden** yanıtı döndürür.

## API Üzerinden Anahtar Yönetimi

Tüm uç noktalar Membership modülünün `/membership/apiKeys` yolu altındadır. Bu uç noktalar, **Ayarları Düzenle** iznine sahip bir kilise yöneticisinden alınmış bir JWT gerektirir (API anahtarı kabul edilmez).

| Yöntem ve yol | Amaç |
|---|---|
| `GET /membership/apiKeys` | Kilisenin anahtarlarını listeler (gizli bölüm dahil değildir, yalnızca `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt` ve `createdAt` döner) |
| `GET /membership/apiKeys/scopes` | Kullanılabilir tüm kapsam adlarının listesi. Anahtar oluşturma arayüzü için kullanılır |
| `POST /membership/apiKeys` | Yeni bir anahtar oluşturur. Gövde: `{ "name": "...", "scopes": ["people:read"] }`. Yanıt, ham `cak_…` anahtarını **yalnızca bir kez** içerir. |
| `DELETE /membership/apiKeys/:id` | Bir anahtarı iptal eder. Değişiklik bir sonraki istekte geçerli olur |

İptal edilen bir anahtar hemen geçersiz olur. Bekleme süresi yoktur.

## En İyi Uygulamalar

- **Her entegrasyon için bir anahtar.** Bir anahtar ele geçirilirse diğerlerini bozmadan yalnızca o anahtarı iptal edebilirsiniz.
- **Çalışan en dar kapsamları verin.** Bir Google Sheets dışa aktarımı yalnızca `people:read` iznine ihtiyaç duyar, `settings:write` iznine değil.
- **Anahtarı gerçek bir personele değil, bir hizmet hesabına bağlayın.** Bir personel kiliseden ayrıldığında B1 erişimi sona erer ve o kişinin kimliği altında oluşturulan tüm anahtarlar da sona erer.
- **Anahtarları bir gizli bilgi yöneticisinde saklayın** (barındırma sağlayıcınızın ortam değişkenleri, AWS Secrets Manager vb.). Anahtarları asla kaynak kod deposunda tutmayın.
- **Maruz kalma şüphesi varsa anahtarları yenileyin.** Yeni bir anahtar oluşturun, entegrasyonu güncelleyin, ardından eski anahtarı silin.

## OAuth'tan Farkı

API anahtarları, **kilisenizin entegrasyonu tek başına kullandığı** durumlar için uygundur. Her kilisenin açık onayıyla birden fazla kiliseye erişmesi gereken bir bağlayıcı için (ör. B1 topluluğunda paylaşılan bir SaaS uygulaması) bunun yerine [OAuth ve Bağlı Uygulamalar](./connected-apps) bölümüne bakın.

| | API anahtarı | OAuth |
|---|---|---|
| Kimin kurduğu | Tek bir kilise yöneticisi | Her kilise yöneticisi uygulamayı yetkilendirir |
| Yetkilendirme başlığı | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Belirteç ömrü | İptal edilene kadar | Erişim yaklaşık 7 gün, yenileme yaklaşık 90 gün |
| En uygun kullanım | Dahili betikler, Zapier/Make/Sheets bağlayıcıları | Çok kiracılı üçüncü taraf uygulamalar |
