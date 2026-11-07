---
title: "Doing Uç Noktaları"
description: "Hizmet planları, gönüllü atamaları, görevler ve otomasyonları yöneten Doing API uç nokta başvurusu; yollar, kimlik doğrulama ve izinleriyle birlikte."
---

# Doing Uç Noktaları

<div class="article-intro">

Doing modülü hizmet planlamasını, gönüllü çizelgelemesini, görev yönetimini ve otomasyonları yönetir. Saatler ve pozisyonlarla hizmet planları oluşturmak, gönüllüleri atamak, engellenmiş tarihleri yönetmek, hizmet sırası öğeleri oluşturmak, harici içerik sağlayıcılarına bağlanmak ve koşullar ile eylemler içeren otomatik iş akışlarını yapılandırmak için araçlar sunar.

</div>

**Temel yol:** `/doing`

## Planlar

Temel yol: `/doing/plans`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Kilisenin tüm planlarını listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir plan getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok plan getirir |
| GET | `/types/:planTypeId` | JWT | — | Plan türüne göre planları getirir |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + hizmet grubunu düzenleme | **Gönüllülere SMS** gönderiminin hizmet özetini önizler: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }`. Bu, aralıkta atanan gönüllüler içindir (kişi başına bir kez; abonelikten çıkanlar ve numarası olmayanlar atlanır, paylaşılan numaralar tekilleştirilir, en fazla 200 ile sınırlandırılır) |
| GET | `/presenter` | JWT | — | Önümüzdeki 7 günün planlarını getirir (sunucu görünümü) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Hizmet grubunu düzenleme | Bir planın seçebileceği etkin hizmet ataması onay iş akışlarını (`workflowType = "assignmentConfirmation"`) listeler: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Herkese açık | — | Bir plan türü için mevcut planı getirir |
| GET | `/public/signup/:churchId` | Herkese açık | — | Kendi kendine kaydolmaya açık planları en yakın olandan başlayarak getirir. Her plan, kendi kendine kayıt pozisyonlarını (önce `categoryName`, sonra `name` sırasına göre, ayrıca Accepted/Unconfirmed atamalarının `filledCount` değeriyle) ve saatlerini içerir. Gönüllülerin adlarını içermez. Kilise ayarı `volunteerSignupNextOnly` değeri `"true"` olduğunda, her plan türünden yalnızca ilk plan döndürülür. Her `plan`, hesaplanan bir `signupDeadline` (ISO zaman damgası veya `null`) içerir. Bu, planın en erken `service` türündeki saatinden `signupDeadlineHours` saat önceye denk gelir (hizmet saati yoksa zamanlı herhangi bir giriş, plan hiç saat içermiyorsa kilisenin saat diliminde `serviceDate` tarihinde 9:00 kullanılır) |
| GET | `/signup/:planId/volunteers` | JWT | — | Planın kendi kendine kayıt pozisyonları için `[{ positionId, names }]` döndürür (Accepted/Unconfirmed atananların görünen adları). Planın `showVolunteerNames` ayarı açık değilse `[]` döndürür |
| POST | `/` | JWT | — | Planları oluşturur veya günceller (tek nesne veya dizi kabul eder). Planı bir hizmet onay iş akışına dahil etmek için `confirmationWorkflowId` değerini ayarlayın; gelecekteki isteklerde çıkmak için `null` gönderin. Bir son tarihi temizlemek için `signupDeadlineHours: null` gönderin; alanı atlamak kayıtlı değeri korur |
| POST | `/copy/:id` | JWT | Hizmet grubunu düzenleme | Bir planı pozisyonlar, saatler, atamalar ve hizmet sırası öğeleriyle birlikte kopyalar. Gövde `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") ve `copyServiceOrder` (boolean) içerir. `targetPlanId` olmadan yeni bir plan oluşturulur; gövde bunları sağlamadıkça `notes`, `signupDeadlineHours`, `showVolunteerNames` ve `autoReplaceOnDecline` kaynak plandan aktarılır. `targetPlanId` ile kopyalama bunun yerine mevcut planı doldurur (çağıranın bu planı düzenleme yetkisi olmalıdır). B1Admin'deki **Repeat weekly** seçeneği bunu her hafta bir kez çağırır ve her seferinde bir önceki hafta oluşturulan planı kopyalar |
| POST | `/textRange` | JWT | `texting.send` + hizmet grubunu düzenleme | Bir tarih aralığında atanan her gönüllüye, kilisenin SMS sağlayıcısı üzerinden mesaj gönderir. Gövde: `{ startDate, endDate, ministryId, planTypeId?, message }` (mesaj en fazla 1600 karakter; birleştirme alanları her alıcıya göre çözümlenir). Önizleme sayılarını ve ayrıca `recipientCount`, `successCount`, `failCount` değerlerini döndürür; gönderim erken durursa `error` (`no_provider` veya `insufficient_credits`) da döner |
| POST | `/:id/issueRequests` | JWT | Plan düzenleme | Planın yeni, henüz bildirilmemiş Unconfirmed atamalarını onay iş akışı üzerinden gönderir: her birini bildirilmiş olarak işaretler ve atama başına bir iş akışı kartı başlatır. Gövde boş olmalıdır; `{ issued }` döndürür. Plan yayımlanmamışsa (`prepared` değilse), etkin bir `confirmationWorkflowId` değeri ve en az bir adımı yoksa veya yanıt son tarihi geçmişse başarısız olur |
| POST | `/autofill/:id` | JWT | — | Bir plan için gönüllü atamalarını otomatik doldurur. Gövde: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Bir planı ve ilgili tüm saatleri, atamaları, pozisyonları ve plan öğelerini siler |

### Örnek: Bir Planı Kopyalama

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Plan Türleri

Temel yol: `/doing/planTypes`

Temel CRUD sınıfından türetilir (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — izin kontrolü yoktur).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Tüm plan türlerini listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir plan türü getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok plan türü getirir |
| GET | `/ministryId/:ministryId` | JWT | — | Bir hizmet grubunun plan türlerini getirir |
| POST | `/` | JWT | — | Plan türlerini oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir plan türünü siler |

## Plan Öğeleri

Temel yol: `/doing/planItems`

Üst-alt ağaç yapısında düzenlenmiş hizmet sırası öğelerini (başlıklar, bölümler, şarkılar vb.) yönetir.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir plan öğesi getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok plan öğesi getirir |
| GET | `/plan/:planId` | JWT | — | Bir plan için tüm plan öğelerini getirir (ağaç yapısı döndürür) |
| GET | `/presenter/:churchId/:planId` | Herkese açık | — | Sunucu görünümü için plan öğelerini getirir (ağaç yapısı döndürür) |
| POST | `/` | JWT | — | Plan öğelerini oluşturur veya günceller |
| POST | `/sort` | JWT | — | Bir plan öğesinin sıralamasını günceller (kardeşleri yeniden sıralar) |
| DELETE | `/:id` | JWT | — | Bir plan öğesini siler |

## Plan Akışı

Temel yol: `/doing/planFeed`

Sunucu için plan öğesi akışları sağlar. Hiç plan öğesi yoksa, planın `contentId` değerini kullanarak Lessons.church mekan akışından otomatik doldurur.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:planId` | Herkese açık | — | Sunucu için plan akışını getirir (boşsa mekan akışından otomatik doldurur) |

## Pozisyonlar

Temel yol: `/doing/positions`

Temel CRUD sınıfından türetilir (GET `/:id`, POST `/`, DELETE `/:id` — izin kontrolü yoktur).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir pozisyon getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok pozisyon getirir |
| GET | `/plan/ids?planIds=` | JWT | — | Virgülle ayrılmış plan kimlikleriyle birden çok plan için pozisyonları getirir |
| GET | `/plan/:planId` | JWT | — | Bir plan için tüm pozisyonları getirir |
| POST | `/` | JWT | — | Pozisyonları oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir pozisyonu siler |

## Zamanlar

Temel yol: `/doing/times`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/all` | JWT | — | Kilisenin tüm zamanlarını listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir zaman getirir |
| GET | `/plans?planIds=` | JWT | — | Virgülle ayrılmış plan kimlikleriyle birden çok plan için zamanları getirir |
| GET | `/plan/:planId` | JWT | — | Bir plan için tüm zamanları getirir |
| POST | `/` | JWT | — | Zamanları oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir zamanı siler |

## Atamalar

Temel yol: `/doing/assignments`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Mevcut kullanıcının atamalarını getirir |
| GET | `/my/upcoming` | JWT | — | Mevcut kullanıcının, dünden itibaren tarihli planlardaki en fazla 20 atamasını en yakın olandan başlayarak döndürür (beklemeye alınmış veya `prepared` planlar atlanır): `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Üye ana sayfasındaki hizmet önizlemesini besler |
| GET | `/:id` | JWT | — | Kimliğe göre bir atama getirir |
| GET | `/plan/ids?planIds=` | JWT | — | Virgülle ayrılmış plan kimlikleriyle birden çok plan için atamaları getirir |
| GET | `/plan/:planId` | JWT | — | Bir plan için tüm atamaları getirir |
| POST | `/` | JWT | — | Atamaları oluşturur veya günceller (durumu varsayılan olarak "Unconfirmed" yapar) |
| POST | `/accept/:id` | JWT | — | Bir atamayı kabul eder (atanan kişi olmalısınız) |
| POST | `/decline/:id` | JWT | — | Bir atamayı reddeder (atanan kişi olmalısınız) |
| POST | `/signup` | JWT | — | Bir pozisyon için kendi kendine kayıt olur. Gövde: `{ positionId }`. Pozisyon kendi kendine kayda izin vermeli ve yeri olmalıdır; Accepted bir atama oluşturur. Planın kayıt son tarihi (yukarıdaki gibi ilk hizmet saatinden geriye doğru sayılır) geçtikten sonra "Signup deadline has passed" hatasıyla reddedilir |
| DELETE | `/signup/:id` | JWT | — | Kendi kendine kaydınızı kaldırır. Planın kayıt son tarihinden sonra "Removal deadline has passed" hatasıyla reddedilir |
| DELETE | `/:id` | JWT | — | Bir atamayı siler |

### Örnek: Bir Atamayı Kabul Etme

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Engellenmiş Tarihler

Temel yol: `/doing/blockoutDates`

Temel CRUD sınıfından türetilir (GET `/:id`, DELETE `/:id` — izin kontrolü yoktur).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir engellenmiş tarih getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok engellenmiş tarih getirir |
| GET | `/my` | JWT | — | Mevcut kullanıcının engellenmiş tarihlerini getirir |
| GET | `/upcoming` | JWT | — | Kilisenin tüm yaklaşan engellenmiş tarihlerini getirir |
| POST | `/` | JWT | — | Engellenmiş tarihleri oluşturur veya günceller (personId belirtilmezse mevcut kullanıcıyı varsayılan yapar) |
| DELETE | `/:id` | JWT | — | Bir engellenmiş tarihi siler |

## Görevler

Temel yol: `/doing/tasks`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Mevcut kullanıcının açık görevlerini getirir |
| GET | `/:id` | JWT | — | Kimliğe göre bir görev getirir |
| GET | `/:id/contact` | JWT | Kartı görüntüleyebilir | Bir iş akışı kartının ilgili olduğu kişinin iletişim bilgileri: `{ personId, displayName, mobilePhone, email }`. Kişiler erişimi olmayan atanmış bir arayanın kişiye ulaşmasını sağlar |
| GET | `/closed` | JWT | — | Mevcut kullanıcının kapalı görevlerini getirir |
| GET | `/timeline?taskIds=` | JWT | — | Virgülle ayrılmış görev kimlikleriyle görevlerin zaman çizelgesi verilerini getirir |
| GET | `/directoryUpdate/:personId` | JWT | — | Bir kişi için dizin güncelleme görevini getirir |
| POST | `/` | JWT | — | Görevleri oluşturur veya günceller. Dizin güncelleme görevlerini işlemek için `?type=directoryUpdate` ekleyin (fotoğrafları otomatik yükler) |
| POST | `/:id/conversation` | JWT | `tasks.edit` veya kart atananı | Notlar görüşmesini bir karta ekler. Gövde: `{ conversationId }`. Eklenen ilk görüşme geçerli olur; sonraki çağrılar kartı değiştirmeden döndürür |
| POST | `/loadForGroups` | JWT | — | Belirli gruplar için görevleri yükler. Gövde: `{ groupIds: [], status: "Open" }` |

## Otomasyonlar

Temel yol: `/doing/automations`

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Kilisenin tüm otomasyonlarını listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir otomasyon getirir |
| GET | `/check` | Herkese açık | — | Tüm otomasyonların kontrolünü başlatır |
| POST | `/` | JWT | — | Otomasyonları oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir otomasyonu siler |

## Eylemler

Temel yol: `/doing/actions`

Eylemler, bir otomasyon tetiklendiğinde ne olacağını tanımlar.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir eylem getirir |
| GET | `/automation/:id` | JWT | — | Bir otomasyonun tüm eylemlerini getirir |
| POST | `/` | JWT | — | Eylemleri oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir eylemi siler |

## Koşullar

Temel yol: `/doing/conditions`

Koşullar, bir otomasyonu tetikleyen ölçütleri tanımlar.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir koşul getirir |
| GET | `/automation/:id` | JWT | — | Bir otomasyonun tüm koşullarını getirir |
| POST | `/` | JWT | — | Koşulları oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir koşulu siler |

## Bağlaçlar

Temel yol: `/doing/conjunctions`

Bağlaçlar, bir otomasyondaki birden çok koşulu birbirine bağlar (VE/VEYA mantığı).

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Kimliğe göre bir bağlaç getirir |
| GET | `/automation/:id` | JWT | — | Bir otomasyonun tüm bağlaçlarını getirir |
| POST | `/` | JWT | — | Bağlaçları oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir bağlacı siler |

## İçerik Sağlayıcı Yetkilendirmeleri

Temel yol: `/doing/contentProviderAuths`

Temel CRUD sınıfından türetilir (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — izin kontrolü yoktur).

Harici içerik sağlayıcıları (örneğin sunum yazılımı entegrasyonları) için OAuth kimlik doğrulama kayıtlarını yönetir.

`accessToken` ve `refreshToken`, depolanırken `EncryptionHelper` ile şifrelenir ve okunurken çözülür; böylece API yine de düz belirteçler döndürür. Şifrelemeden önce kaydedilen satırlar düz metin içerir (düz metin hiçbir zaman `|` içermez); olduğu gibi döndürülürler ve bir sonraki kaydedildiklerinde şifrelenirler.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Tüm içerik sağlayıcı yetkilendirmelerini listeler |
| GET | `/:id` | JWT | — | Kimliğe göre bir içerik sağlayıcı yetkilendirmesi getirir |
| GET | `/ids?ids=` | JWT | — | Virgülle ayrılmış kimliklerle birden çok içerik sağlayıcı yetkilendirmesi getirir |
| GET | `/ministry/:ministryId` | JWT | — | Bir hizmet grubunun tüm içerik sağlayıcı yetkilendirmelerini getirir |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Belirli bir hizmet grubu ve sağlayıcı için yetkilendirme kaydını getirir |
| POST | `/` | JWT | — | İçerik sağlayıcı yetkilendirmelerini oluşturur veya günceller |
| DELETE | `/:id` | JWT | — | Bir içerik sağlayıcı yetkilendirmesini siler |

## Sağlayıcı Vekil Sunucusu

Temel yol: `/doing/providerProxy`

İsteklerini harici içerik sağlayıcılarına (örneğin ProPresenter, EasyWorship) yönlendirir. Belirteçler sona erdiğinde belirteç yenilemeyi otomatik olarak yönetir.

| Yöntem | Yol | Kimlik doğrulama | İzin | Açıklama |
|--------|------|------|------|-------------|
| POST | `/browse` | JWT | — | İçerik sağlayıcı dosyalarına göz atar. Gövde: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Bir içerik sağlayıcısından sunumları getirir. Gövde: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Bir içerik sağlayıcısından oynatma listesini getirir. Gövde: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Bir içerik öğesi için yönergeleri getirir. Gövde: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Bir içerik öğesi için genişletilmiş yönergeleri getirir. Gövde: `{ ministryId, providerId, path }` |

## İlgili Sayfalar

- [Üyelik Uç Noktaları](./membership.md) — Kişiler, gruplar, roller ve izinler
- [Katılım Uç Noktaları](./attendance.md) — Hizmet ve ziyaret takibi
- [Modül Yapısı](../module-structure.md) — Kod organizasyon kalıpları
