---
title: "Yoklama Uç Noktaları"
description: "B1 Admin ve B1 Checkin yoklama API'si: kampüsler, hizmetler, hizmet saatleri, oturumlar, ziyaretler, check-in kuralları ve dışa aktarma uç noktaları."
---

# Yoklama Uç Noktaları

<div class="article-intro">

Yoklama modülü kampüs konumlarını, ayinleri, ayin saatlerini, yoklama oturumlarını, ziyaretleri ve ziyaret oturumlarını yönetir. Hangi kişinin hangi ayine veya grup toplantısına katıldığını izlemek için altyapı sağlar, giriş iş akışlarını destekler ve yoklama eğilimi ile özet raporlama özellikleri sunar.

</div>

**Temel yol:** `/attendance`

## Kampüsler

Temel yol: `/attendance/campuses`

Standart CRUD denetleyicisi (GenericCrudController sınıfını genişletir). CRUD temel sınıfı aracılığıyla `getById`, `getAll`, `post` ve `delete` rotalarını sağlar.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | — | Kilisenin tüm kampüslerini listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir kampüsü getirir |
| POST | `/` | JWT | Services.Edit | Kampüs oluşturur veya günceller |
| DELETE | `/:id` | JWT | Services.Edit | Bir kampüsü siler |

## Ayinler

Temel yol: `/attendance/services`

GenericCrudController sınıfını genişletir ve `getById`, `getAll`, `post` ve `delete` CRUD rotalarını sağlar. `getAll` (`GET /`) ve `search` uç noktaları özel uygulamalarla geçersiz kılınmıştır.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | — | Tüm ayinleri listeler (kampüs bilgisini içerir) |
| GET | `/:id` | JWT | — | Kimliğe göre bir ayini getirir |
| GET | `/search?campusId=` | JWT | — | Kampüs kimliğine göre ayinleri arar |
| POST | `/` | JWT | Services.Edit | Ayin oluşturur veya günceller |
| DELETE | `/:id` | JWT | Services.Edit | Bir ayini siler |

### Örnek: Kampüse Göre Ayinleri Arama

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Ayin Saatleri

Temel yol: `/attendance/servicetimes`

GenericCrudController sınıfını genişletir ve `getById`, `post` ve `delete` CRUD rotalarını sağlar. `getAll` ve `search` uç noktaları özel uygulamalardır.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | — | Tüm ayin saatlerini listeler. `?serviceId=` ile filtreleyin. Grup verilerini eklemek için `?include=groups` ekleyin. Her satır hesaplanmış bir `checkinOpen` boolean değeri içerir (ayin saatinin bir giriş programı varsa ve bu pencere şu anda kapalıysa false olur). Pencere; önce ayinin kampüsünün, sonra kilisenin, ardından saat dilimi tanımlı ilk kampüsün saat dilimine ve son olarak `America/New_York` saat dilimine göre ölçülür |
| GET | `/:id` | JWT | — | Kimliğe göre bir ayin saatini getirir |
| GET | `/search?campusId=&serviceId=` | JWT | — | Kampüs ve ayine göre ayin saatlerini arar |
| GET | `/public/:churchId` | Herkese açık | — | Bir kilise için kampüs → ayin → saat ağacını getirir. Web sitesi oluşturucunun `serviceTimes` öğesini besler |
| POST | `/` | JWT | Services.Edit | Ayin saati oluşturur veya günceller. İsteğe bağlı program alanları: `dayOfWeek` (0 = Pazar … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (başlangıçtan önce), `checkinCloseMinutes` (bitişten sonra). Giriş yalnızca hem `dayOfWeek` hem de `startTime` ayarlandığında zamana bağlanır |
| DELETE | `/:id` | JWT | Services.Edit | Bir ayin saatini siler |

## Grup Ayin Saatleri

Temel yol: `/attendance/groupservicetimes`

Grupları belirli ayin saatlerine bağlar.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | — | Tüm grup-ayin saati ilişkilerini listeler. Ayin adlarıyla ilişkileri almak için `?groupId=` ile filtreleyin |
| GET | `/:id` | JWT | — | Kimliğe göre bir grup-ayin saati ilişkisini getirir |
| POST | `/` | JWT | Services.Edit | Grup-ayin saati ilişkileri oluşturur veya günceller |
| DELETE | `/:id` | JWT | Services.Edit | Bir grup-ayin saati ilişkisini siler |

## Yoklama Kayıtları

Temel yol: `/attendance/attendancerecords`

Raporlama ve görüntüleme için yoklama verilerinin salt okunur toplu görünümlerini sağlar.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | Attendance.View | Bir kişinin yoklama kayıtlarını yükler. `?personId=` gereklidir |
| GET | `/my` | JWT | — | Yalnızca kendi verileriniz: oturum açmış üyenin son 12 aya ait kendi yoklama kayıtları, en yeniden en eskiye doğru. Kullanıcı bir kişiyle ilişkilendirilmemişse `401` döndürür. B1 Me sayfasındaki **Yoklamam** bölümünü besler |
| GET | `/tree` | JWT | — | Tam yoklama ağacını yükler (kampüsler, ayinler, ayin saatleri, gruplar) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | İsteğe bağlı filtrelerle yoklama eğilimi verilerini yükler |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Belirli bir haftada bir ayin için grup yoklamasını yükler |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Ayin saatine atanmış her grup için, o tarihe ait `{ groupId, sessionId, attendanceCount }` döndürür (`date` biçimi `YYYY-MM-DD`'dir; grubun oturumu yoksa `sessionId` null olur). B1Admin'deki **Yoklaması Eksik Olanlar** iletişim kutusunu besler |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Yoklama kayıtlarını filtrelerle arar (kampüs, ayin, ayin saati, grup, tarih aralığı) |

### Örnek: Yoklama Eğilimi

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Oturumlar

Temel yol: `/attendance/sessions`

GenericCrudController sınıfını genişletir ve `getById` ile `delete` CRUD rotalarını sağlar. `getAll` ve `save` uç noktaları, grup liderlerinin kendi gruplarının oturumlarını yönetmesine de izin veren özel uygulamalardır.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | Attendance.View veya Grup Lideri | Tüm oturumları listeler. `?groupId=` ile filtreleyin (adları içerir). Grup liderleri kendi grupları için oturumları görüntüleyebilir |
| GET | `/:id` | JWT | Attendance.View | Kimliğe göre bir oturumu getirir |
| POST | `/` | JWT | Attendance.Edit veya Grup Lideri | Oturum oluşturur veya günceller. Grup liderleri kendi grupları için oturumları kaydedebilir |
| DELETE | `/:id` | JWT | Attendance.Edit | Bir oturumu siler |

## Ziyaretler

Temel yol: `/attendance/visits`

Bireysel ziyaret kayıtlarını (belirli bir tarihte katılan bir kişi) yönetir ve giriş iş akışını sağlar.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | Attendance.View | Tüm ziyaretleri listeler. `?personId=` ile filtreleyin |
| GET | `/:id` | JWT | Attendance.View | Kimliğe göre bir ziyareti getirir |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View veya Attendance.Checkin | Bir ayinde kişiler için giriş verilerini yükler. Son kaydedilen tarihten ziyaret oturumlarını içeren ziyaretleri döndürür |
| POST | `/` | JWT | Attendance.Edit | Ziyaret oluşturur veya günceller |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit veya Attendance.Checkin | Giriş verilerini gönderir. Ziyaret ve ziyaret oturumları oluşturur/günceller, eski kayıtları kaldırır |
| DELETE | `/:id` | JWT | Attendance.Edit | Bir ziyareti siler |

### Örnek: Giriş Akışı

**Adım 1 -- Mevcut giriş verilerini yükleyin:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Adım 2 -- Girişi gönderin:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Hedeflenen bir ayin saatinin bir giriş programı varsa ve penceresi kapalıysa (`checkinOpen` ile aynı kampüs öncelikli saat dilimi sırasına göre ölçülür), hiçbir şey kaydedilmez ve yanıt `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }` olur. Kapasite ve gönüllü oranı ihlalleri de 409 döndürür (`error: "capacity"` veya `"ratio"`). Bir kişinin bugün zaten sahip olduğu oturumlar (her girişte yeniden gönderilen) pencere kontrolünden muaftır; böylece bir hane, önceki bir ayin saatinin penceresi kapandıktan sonra açık olan başka bir ayin saatini ekleyebilir.

## Ziyaret Oturumları

Temel yol: `/attendance/visitsessions`

Ziyaretler ile oturumlar arasındaki ilişkiyi yönetir (bir kişinin bir ziyaret sırasında hangi belirli oturuma katıldığı). Ayrıca hızlı kayıt uç noktası ve indirme/dışa aktarma uç noktası sağlar.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/` | JWT | Attendance.View veya Grup Lideri | Ziyaret oturumlarını listeler. `?sessionId=` ile filtreleyin. Grup liderleri kendi grupları için ziyaret oturumlarını görüntüleyebilir |
| GET | `/:id` | JWT | Attendance.View | Kimliğe göre bir ziyaret oturumunu getirir |
| GET | `/download/:sessionId` | JWT | Attendance.View | Bir oturumun yoklamasını indirir (kişi adlarını mevcut/yok durumuyla döndürür) |
| POST | `/` | JWT | Attendance.Edit | Ziyaret oturumları oluşturur veya günceller |
| POST | `/log` | JWT | Attendance.Edit veya Grup Lideri | Bir kişinin yoklamasını bir oturuma hızlıca kaydeder. Gerekirse ziyareti otomatik olarak oluşturur. Grup liderleri kendi grupları için yoklama kaydedebilir |
| DELETE | `/:id` | JWT | Attendance.Edit | Kimliğe göre bir ziyaret oturumunu siler |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit veya Grup Lideri | Bir kişiyi bir oturumdan çıkarır. Ziyaret oturumunu ve oturum kalmadıysa üst ziyareti siler. Grup liderleri kendi grupları için yoklamayı kaldırabilir |

### Örnek: Yoklamayı Hızlıca Kaydetme

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Örnek: Oturum Yoklamasını İndirme

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Seriler

Temel yol: `/attendance/streaks`

Bireylerin yoklama serilerini izler -- bir kişinin katıldığı ardışık haftalar. Katılım metrikleri ve oyunlaştırma için kullanışlıdır.

| Yöntem | Yol | Kimlik Doğrulama | İzin | Açıklama |
|--------|-----|------------------|------|----------|
| GET | `/person/:personId` | JWT | — | Bir kişinin yoklama serilerini yükler |

## İlgili Sayfalar

- [Üyelik Uç Noktaları](./membership.md) — Kişiler, gruplar, roller ve kilise yönetimi
- [Kimlik Doğrulama ve İzinler](./authentication.md) — Oturum açma akışı, JWT, izin modeli
- [Modül Yapısı](../module-structure.md) — Kod organizasyon kalıpları
