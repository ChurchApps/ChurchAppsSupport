---
title: "Uç Nokta Başvurusu"
description: "Her ChurchApps API uç noktasını modüle göre bulun; HTTP yöntemi, yol, kimlik doğrulama ve izni görün, ayrıca toplu kaydetme ve hata kurallarını öğrenin."
---

# Uç Nokta Başvurusu

<div class="article-intro">

Bu bölümde ChurchApps API'sinin sunduğu tüm REST uç noktaları belgelenmektedir. Her modül sayfası, her rotayı HTTP yöntemi, yolu, kimlik doğrulama gereksinimleri ve gerekli izinleriyle birlikte listeler.

</div>

## Temel URL

| Ortam | URL |
|-------|-----|
| Yerel geliştirme | `http://localhost:8084` |
| Üretim | `https://api.churchapps.org` |

## İstek Kuralları

- **Content-Type:** Tüm istek ve yanıt gövdeleri `application/json` kullanır
- **Çok kiracılı:** Kimliği doğrulanmış her istek, JWT belirtecinden çıkarılan bir `churchId` ile kapsamlandırılır. `churchId` değerini URL'de göndermezsiniz
- **Toplu kayıt:** Çoğu `POST` uç noktası **nesne dizisi** kabul eder. API, tek bir çağrıda yeni kayıtları (`id` alanı olmayan) ekler ve mevcut kayıtları (`id` alanı olan) günceller
- **Kimlikler:** Tüm varlık kimlikleri UUID biçimindedir

### Örnek: Toplu Kayıt

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

İlk nesne oluşturulur (yeni); ikincisi güncellenir (`id` alanına sahip olduğu için).

## Yanıt Biçimi

Başarılı yanıtlar JSON döndürür: tek bir nesne veya bir dizi. Hata yanıtları standart HTTP durum kodlarını kullanır:

| Kod | Anlamı |
|-----|--------|
| `200` | Başarılı |
| `400` | Hatalı istek (doğrulama hataları) |
| `401` | Yetkisiz (eksik veya geçersiz belirteç ya da yetersiz izinler) |
| `404` | Bulunamadı |
| `500` | Sunucu hatası |

Doğrulama hataları şu yanıtı döndürür:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Uç Nokta Tablolarını Nasıl Okursunuz

Her modül sayfası uç noktaları denetleyiciye göre düzenler. Tablolar şu sütunları kullanır:

| Sütun | Açıklama |
|-------|----------|
| **Method** (Yöntem) | HTTP yöntemi (`GET`, `POST`, `DELETE`) |
| **Path** (Yol) | Denetleyicinin temel yoluna göre göreli rota yolu |
| **Auth** (Kimlik Doğrulama) | **JWT** = Bearer belirteci gerektirir, **Public** = kimlik doğrulama gerekmez |
| **Permission** (İzin) | Gerekli izin (ör. `People.Edit`). `—` herhangi bir kimliği doğrulanmış kullanıcı anlamına gelir |
| **Description** (Açıklama) | Uç noktanın ne yaptığı |

Standart CRUD temel sınıfını genişleten denetleyiciler dört uç noktayı otomatik olarak sağlar: `GET /` (tümünü listele), `GET /:id` (kimliğe göre getir), `POST /` (oluştur/güncelle) ve `DELETE /:id` (sil).

## Raporlama Modülü

Raporlama modülü diğer modüllerden farklı çalışır. Veritabanı destekli CRUD işlemleri yerine, diskteki JSON dosyalarından rapor tanımlarını yükler ve parametreli SQL sorguları çalıştırır.

| Yöntem | Yol | Kimlik Doğrulama | Açıklama |
|--------|-----|------------------|----------|
| GET | `/reporting/reports/:keyName` | JWT | Anahtar adına göre bir rapor tanımı yükler |
| GET | `/reporting/reports/:keyName/run` | JWT | Raporu çalıştırır ve sonuçları döndürür |

Rapor parametreleri sorgu dizesi değerleri olarak iletilir (ör. `?startDate=2024-01-01&endDate=2024-12-31`). `churchId` parametresi JWT belirtecinden otomatik olarak eklenir. Her rapor tanımı kendi izin gereksinimlerini belirtebilir.

## Modül Dizini

| Modül | Temel Yol | Açıklama |
|-------|-----------|----------|
| [Kimlik Doğrulama](./authentication.md) | `/membership/users`, `/membership/oauth` | Giriş, kayıt, JWT belirteçleri, OAuth, izinler |
| [Üyelik](./membership.md) | `/membership/*` | Kişiler, kiliseler, gruplar, haneler, roller, formlar, ayarlar |
| [Katılım](./attendance.md) | `/attendance/*` | Kampüsler, hizmetler, oturumlar, ziyaretler, giriş kayıtları |
| [İçerik](./content.md) | `/content/*` | Sayfalar, vaazlar, etkinlikler, dosyalar, galeriler, Kutsal Kitap, yayın |
| [Bağış](./giving.md) | `/giving/*` | Bağışlar, fonlar, ödeme geçitleri, abonelikler |
| [Mesajlaşma](./messaging.md) | `/messaging/*` | Konuşmalar, bildirimler, cihazlar, SMS |
| [Planlama](./doing.md) | `/doing/*` | Planlar, görevler, atamalar, otomasyonlar, zamanlama |
