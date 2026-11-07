---
title: "Bağış Uç Noktaları"
---

# Bağış Uç Noktaları

<div class="article-intro">

Bağış modülü bağışları, fonları, ödeme işlemlerini, abonelikleri ve ilgili finansal işlemleri yönetir. Birden fazla ödeme geçidini (Stripe, PayPal) destekler, tek seferlik ve yinelenen bağışları işler, bağış gruplarını takip eder ve eşzamansız ödeme olayları için webhook işleme sağlar.

</div>

**Temel yol:** `/giving`

## Bağışlar

Temel yol: `/giving/donations`

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.View veya kendi personId değeri | Tüm bağışları listeler. `?batchId=` veya `?personId=` ile filtreleyin. `?personId=` ile kullanıldığında, vergi indirimine konu olmayan fonlara yapılan bağışlar bağış dökümlerinde olduğu gibi hariç tutulur. Ancak Donations.View yetkisine sahip bir çağıran `&includeNonDeductible=1` parametresini eklerse bu bağışlar da dahil edilir. B1Admin'in kişi kaydı bu parametreyi kullanır |
| GET | `/:id` | JWT | Donations.View | Kimliğe göre bir bağışı alır |
| GET | `/my` | JWT | — | Geçerli kullanıcının bağışlarını alır |
| GET | `/my/summary?year=` | JWT | — | Geçerli kullanıcının bir yıl için toplam bağış tutarı (varsayılan olarak bu yıl): `{ year, total, count, currency, isConverted }`. Toplamlar kilise para birimine dönüştürülür. Üye ana sayfasındaki bağış önizlemesini besler |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | Belirtilen aralıkta (dahil) tarihlenmiş bağışlar. Her iki tarih de `YYYY-MM-DD` biçiminde zorunludur; aksi takdirde `400` döner. B1Admin'in bağış dökümleri sayfaları, kilisenin tüm geçmişi yerine bu yöntemle bir takvim yılı ister |
| GET | `/summary` | JWT | Donations.ViewSummary | Bağış özetini alır. `?startDate=&endDate=&type=` ile filtreleyin. Kişi başına döküm için `type=person` kullanın |
| GET | `/testEmail` | Herkese açık | — | Test e-postası gönderir (geliştirme/hata ayıklama) |
| POST | `/` | JWT | Donations.Edit veya Donations.Enter | Bağışları (toplu olarak) oluşturur veya günceller. Yalnızca Donations.Enter ile hem hedef grup hem de (güncelleme için) bağışın mevcut grubu açık olmalıdır. Geçit bağışları (`transactionId` içerenler) değiştirilemez; aksi takdirde `403 { "error": "This batch is closed." }` döner |
| DELETE | `/:id` | JWT | Donations.Edit veya Donations.Enter | Bir bağışı siler. Yalnızca Donations.Enter: bağış açık bir grupta olmalı ve geçit bağışı olmamalıdır; aksi takdirde `403` döner |

### Örnek: Gruba Göre Bağışları Listeleme

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### Örnek: Bağış Özetini Alma

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## Bağış Grupları

Temel yol: `/giving/donationbatches`

`GenericCrudController`'ı genişletir ve şu CRUD rotalarına sahiptir: `getById`, `getAll`, `post`, `delete`. Silme işlemi, grup içindeki tüm bağışları da kaldırır.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.ViewSummary veya Donations.Enter | Tüm bağış gruplarını listeler |
| GET | `/:id` | JWT | Donations.ViewSummary veya Donations.Enter | Kimliğe göre bir bağış grubunu alır |
| POST | `/` | JWT | Donations.Edit veya Donations.Enter | Bağış gruplarını oluşturur veya günceller. Yalnızca Donations.Enter: mevcut bir grubu güncellemek için grubun açık olması gerekir; aksi takdirde `403 { "error": "This batch is closed." }` döner. Burada `status` yok sayılır, bu nedenle bir grubu kaydetmek onu yeniden açamaz |
| POST | `/:id/close` | JWT | Donations.Edit | Grubu kapatır: `status` değerini `closed`, `closedDate` değerini şimdiye ve `closedBy` değerini çağıranın kullanıcı kimliğine ayarlar. Grubu döndürür |
| POST | `/:id/reopen` | JWT | Donations.Edit | Grubu yeniden açar: `status` değerini `open` yapar ve `closedDate` ile `closedBy` alanlarını temizler. Grubu döndürür |
| DELETE | `/:id` | JWT | Donations.Edit | Bir grubu ve tüm bağışlarını siler |

Her grup `status` (`open` veya `closed`; yeni ve mevcut gruplar `open` durumundadır), `closedDate` ve `closedBy` içerir. Donations.Edit herhangi bir gruptaki bağışları değiştirebilir. Donations.Enter (rol düzenleyicisinde **Enter Donations** olarak görünür) ise yalnızca grubu açık olduğu sürece bağışları ve fon paylaşımlarını ekleyebilir, değiştirebilir veya silebilir.

## Bağış Yap

Temel yol: `/giving/donate`

Ücretlendirme, abonelikler, webhook'lar ve ücret hesaplamaları dahil herkese açık bağış akışını yönetir. Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/gateways/:churchId` | Herkese açık | — | Bir kilise için kullanılabilir ödeme geçitlerini alır (yalnızca genel anahtarlar) |
| POST | `/client-token` | JWT | — | Geçit başlatma için istemci belirteci oluşturur |
| POST | `/create-order` | JWT | — | Bir ödeme siparişi oluşturur (PayPal tarzı ödeme) |
| POST | `/charge` | JWT | — | Tek seferlik bir bağış tahsilatını işler |
| POST | `/subscribe` | JWT | — | Yinelenen bir bağış aboneliği oluşturur |
| POST | `/log` | Herkese açık | — | Bir bağışı kaydeder. Gövde: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Herkese açık | — | Ödeme webhook olaylarını alır (Stripe, PayPal). `?churchId=` gerektirir |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | Bir tarih aralığındaki Stripe olaylarını yeniden oynatır. Gövde: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Herkese açık | — | İşlem ücretlerini hesaplar. Gövde: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` gerektirir |
| POST | `/captcha-verify` | Herkese açık | — | reCAPTCHA belirtecini doğrular. Gövde: `{ token, churchId? }`. İnsan yanıtı `{ response: "human", pass }` döndürür. Burada `pass`, 10 dakika geçerli imzalı bir misafir bağış geçişidir (ve yalnızca bir `churchId` gönderildiyse o kilise için geçerlidir) |

API `CAPTCHA_ENFORCE=true` ile çalıştığında, misafir (oturum açmamış) çağrılar `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard` ve `/giving/paymentmethods/ach-setup-intent-anon` uç noktalarına (ve ücretli `POST /content/registrations/register` çağrılarına) bu `captchaPass` değerini gövdede göndermelidir. Aksi takdirde `403 Captcha verification required` döner. Geçiş süresi dolana kadar yeniden kullanılabilir, çünkü Stripe misafir akışı iki çağrı yapar (önce kart ekleme, ardından tahsilat). Oturum açmış çağrılar etkilenmez. `CAPTCHA_ENFORCE` varsayılan olarak `false` değerindedir. `@churchapps/apphelper` paketinin misafir bağış formları geçişi otomatik olarak gönderir.

### Örnek: Bağış Tahsilatını İşleme

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### Örnek: Yinelenen Abonelik Oluşturma

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## Fonlar

Temel yol: `/giving/funds`

`GenericCrudController`'ı genişletir ve şu CRUD rotalarına sahiptir: `getById`, `getAll`, `post`, `delete`. `view` izni `null` değerindedir; yani fonları görüntülemek için izin gerekmez.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | — | Tüm fonları listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir fonu alır |
| GET | `/churchId/:churchId` | Herkese açık | — | Belirli bir kilisenin tüm fonlarını alır (herkese açık) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Herkese açık | — | Bir fonun bağış toplamını alır: `{ fundId, totalAmount, donationCount }`. Web sitesi oluşturucunun `campaignProgress` öğesini besler |
| POST | `/` | JWT | Donations.Edit | Fonları oluşturur veya günceller |
| DELETE | `/:id` | JWT | Donations.Edit | Bir fonu siler |

## Fon Bağışları

Temel yol: `/giving/funddonations`

Bireysel bağışların fonlara nasıl dağıtıldığını takip eder. Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.View | Fon bağışlarını listeler. `?donationId=`, `?personId=`, `?fundId=` veya `?fundName=` ile filtreleyin. İsteğe bağlı olarak tarihe göre filtrelemek için `?startDate=&endDate=` ekleyin |
| GET | `/:id` | JWT | Donations.View | Kimliğe göre bir fon bağışını alır |
| GET | `/my` | JWT | — | Geçerli kullanıcının fon bağışlarını alır |
| POST | `/` | JWT | Donations.Edit veya Donations.Enter | Fon bağışlarını (toplu olarak) oluşturur veya günceller. Yalnızca Donations.Enter: üst bağış açık bir grupta olmalı ve geçit bağışı olmamalıdır; aksi takdirde `403` döner |
| DELETE | `/:id` | JWT | Donations.Edit veya Donations.Enter | Bir fon bağışını siler. Donations.Enter için aynı açık grup kuralı geçerlidir |

## Ödeme Geçitleri

Temel yol: `/giving/gateways`

Ödeme geçidi yapılandırmalarını yönetir (Stripe, PayPal vb.). Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir. Geçit gizli anahtarları dinlenme halinde şifrelenir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | — | Kilisenin tüm geçitlerini listeler |
| GET | `/:id` | JWT | Settings.Edit | Kimliğe göre bir geçidi alır |
| GET | `/churchId/:churchId` | Herkese açık | — | Bir kilisenin geçitlerini alır (yalnızca genel anahtarlar) |
| GET | `/configured/:churchId` | Herkese açık | — | Bir kilisenin yapılandırılmış bir ödeme geçidi olup olmadığını kontrol eder |
| POST | `/` | JWT | Settings.Edit | Geçitleri oluşturur veya günceller (anahtarları şifreler, webhook'ları ve ürünleri sağlar) |
| PATCH | `/:id` | JWT | Settings.Edit | Bir geçidi kısmen günceller |
| DELETE | `/:id` | JWT | Settings.Edit | Bir geçidi siler (webhook'larını da kaldırır) |

### Örnek: Ödeme Geçidi Yapılandırmasını Kontrol Etme

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Müşteriler

Temel yol: `/giving/customers`

`GenericCrudController`'ı genişletir ve şu CRUD rotalarına sahiptir: `getAll`, `delete`. Kişileri ödeme geçidi müşteri kayıtlarına bağlar.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.ViewSummary | Tüm müşterileri listeler |
| GET | `/:id` | JWT | Donations.ViewSummary veya kendi kaydı | Kimliğe göre bir müşteriyi alır |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary veya kendi kaydı | Bir müşteri için geçit aboneliklerini alır |
| DELETE | `/:id` | JWT | Donations.Edit | Bir müşteriyi siler |

## Abonelikler

Temel yol: `/giving/subscriptions`

Yinelenen bağış aboneliklerini yönetir. Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.ViewSummary | Tüm abonelikleri listeler |
| GET | `/:id` | JWT | Donations.ViewSummary | Kimliğe göre bir aboneliği alır |
| POST | `/` | JWT | Donations.Edit veya kendi aboneliği | Abonelikleri ödeme geçidiyle günceller |
| DELETE | `/:id` | JWT | Donations.Edit veya kendi aboneliği | Bir aboneliği iptal eder ve veritabanından kaldırır. Gövde: `{ provider, reason }` |

## Abonelik Fonları

Temel yol: `/giving/subscriptionfunds`

Yinelenen abonelikler için fon paylaşımlarını takip eder. Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.View veya kendi aboneliği | Abonelik fonlarını listeler. `?subscriptionId=` ile filtreleyin |
| GET | `/:id` | JWT | Donations.ViewSummary | Kimliğe göre bir abonelik fonunu alır |
| DELETE | `/:id` | JWT | Donations.Edit | Bir abonelik fonunu siler |
| DELETE | `/subscription/:id` | JWT | Donations.Edit veya kendi aboneliği | Bir aboneliğin tüm fonlarını siler |

## Ödeme Yöntemleri

Temel yol: `/giving/paymentmethods`

Ödeme geçidi API'leri aracılığıyla saklanan ödeme yöntemlerini (kartlar, banka hesapları) yönetir. Temel CRUD rotaları etkin değildir; tüm uç noktalar özeldir.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/personid/:id` | JWT | Donations.View veya kendi personId değeri | Bir kişi için saklanan tüm ödeme yöntemlerini (kartlar, banka hesapları) alır |
| POST | `/addcard` | JWT | — | Bir kart ödeme yöntemi ekler. Gövde: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit veya kendi personId değeri | Kart bilgilerini günceller. Gövde: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit veya kendi personId değeri | Banka hesabı bağlamak için bir Stripe ACH SetupIntent oluşturur. Gövde: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Herkese açık | — | Misafir bağışları için anonim bir ACH SetupIntent oluşturur. Gövde: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit veya kendi personId değeri | Bir belirteç aracılığıyla banka hesabı ekler (kullanımdan kaldırıldı; `ach-setup-intent` kullanın). Gövde: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit veya kendi personId değeri | Banka hesabı bilgilerini günceller. Gövde: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit veya kendi müşteri kaydı | Küçük para yatırmalarıyla bir banka hesabını doğrular. Gövde: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit veya kendi müşteri kaydı | Bir ödeme yöntemini (kart veya banka hesabı) siler |

## Olay Günlüğü

Temel yol: `/giving/eventLog`

`GenericCrudController`'ı genişletir ve şu CRUD rotalarına sahiptir: `getById`, `getAll`, `post`, `delete`. Denetim ve tekrar önleme için ödeme geçidi webhook olaylarını takip eder.

| Yöntem | Yol | Doğrulama | İzin | Açıklama |
|--------|-----|-----------|------|----------|
| GET | `/` | JWT | Donations.ViewSummary | Tüm olay günlüklerini listeler |
| GET | `/:id` | JWT | Donations.ViewSummary | Kimliğe göre bir olay günlüğünü alır |
| GET | `/type/:type` | JWT | Donations.ViewSummary | Olay türüne göre filtrelenmiş olay günlüklerini alır |
| POST | `/` | JWT | Donations.Edit | Olay günlüklerini oluşturur veya günceller |
| DELETE | `/:id` | JWT | Donations.Edit | Bir olay günlüğünü siler |

## İlgili Sayfalar

- [Üyelik Uç Noktaları](./membership) — Kişiler, kiliseler, gruplar, roller ve izinler
- [Kimlik Doğrulama ve İzinler](./authentication) — Oturum açma akışı, JWT, OAuth, izin modeli
- [Modül Yapısı](../module-structure) — Kod organizasyon kalıpları
