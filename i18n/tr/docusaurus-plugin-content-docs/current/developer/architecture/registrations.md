---
title: "Etkinlik Kayıtları"
description: "Etkinlik kayıtlarının B1 Admin ve B1App'te işleyişi: katılımcı türleri, ücretli eklentiler, indirim kodları, ödemeler ve bekleme listesi terfileri."
---

# Etkinlik Kayıtları

<div class="article-intro">

Yerel etkinlik kaydı içerik modülünde bulunur ve ücretli kayıt dalgasından bu yana tam bir ticaret modeline sahiptir: fiyatlandırılmış katılımcı türleri, fiyatlandırılmış ek seçimler, indirim kodları, kilisenin mevcut bağış ağ geçidi üzerinden ödemeler ve duruma dayalı bir bekleme listesi. Ödeme akışı bilerek bağış altyapısını yeniden kullanır. Kayıt denetleyicisi, [Bağış](./giving.md) sayfasında belgelenen aynı `GatewayService` / `IGatewayProvider` soyutlamasını kullanarak ücret alır; bu nedenle içerik modülünde hiçbir kart verisi veya ağ geçidi SDK bilgisi bulunmaz. Bu sayfa veri modelini, fiyatlandırma ve kapasite kurallarını ile kayıt, ödeme ve bekleme listesi akışlarını açıklar.

</div>

## Genel Bakış

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Yığın boyunca üç kural geçerlidir:

1. **Fiyatı sunucu belirler.** İstemciler tür kimliklerini, seçim kimliklerini ve miktarları gönderir; `RegistrationPricingHelper.computeTotal()` toplamı sunucu tarafında hesaplar ve kuponlar ücret alma anında yeniden doğrulanır. İstemcinin gönderdiği bir tutar asla güvenilir kabul edilmez.
2. **Kapasite, ekleme anında atomik olarak uygulanır.** Kapasite sınırlı her ekleme `INSERT … SELECT … FROM dual WHERE (etkin satır sayısı) < kapasite` ifadesini kullanır; böylece iki eş zamanlı kayıt son yeri birlikte alamaz. Sayılar durumdan (`pending`/`confirmed`) türetilir, asla saklanmaz.
3. **Ödemeler bağış altyapısı üzerinden yapılır.** `RegistrationController`, kilisenin yapılandırılmış ağ geçidiyle paylaşılan `GatewayService.processCharge` metodunu çağırır. Bu, bağışlarla aynı sağlayıcı soyutlamasını, belirteçleme modelini ve SCA işlemlerini kullanır.

## Veri Modeli (`Api/src/modules/content`)

Modeller `models/Registration.ts` dosyasında, tablo eşlemeleri `db/DatabaseTypes.ts` dosyasında bulunur; her tablo için `repositories/` altında bir depo vardır.

| Tablo | Anlamı | Temel alanlar |
|-------|--------|---------------|
| `registrations` | Tek bir kayıt (bir etkinlik için bir hane/grup) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Bir kayıttaki tek bir katılımcı | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Etkinlik başına katılımcı türleri (ör. Yetişkin / Çocuk) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Fiyatı olan, adlandırılmış ek seçenekler (ör. Tişört) | eventId, name, description, **price**, **capacity**, **maxQuantity** (kayıt başına üst sınır), sort, active |
| `registrationSelectionChoices` | Bir kayıt/katılımcı tarafından seçilen bir seçimin miktarı | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Bir kayda karşı başarılı tek bir ücret | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Etkinlik başına indirim kodları | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Notlar:

- **Bekleme listesi tablosu yoktur.** Bekleme listesindeki gruplar `status = 'waitlisted'` olan `registrations` satırlarıdır; tüm bekleme listesi yaşam döngüsü bu tek tablodaki durum geçişlerinden oluşur.
- **Saklanan sayaç yoktur.** "Satılan" ve "kullanılan" sayıları (etkinlik kapasitesi, tür başına kapasite, seçim başına kapasite, kupon kullanımları) `('pending','confirmed')` durumundaki satırlar üzerinde korelasyonlu alt sorgularla hesaplanır (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Bu nedenle bir kaydı iptal etmek, herhangi bir muhasebe kaydı tutmadan kapasiteyi serbest bırakır.
- Fiyatlar MySQL DECIMAL sütunlarıdır (ağ üzerinden string olarak gelir) ve fiyatlandırma yardımcısının içinde `Number()` ile sayıya dönüştürülür.

## REST Yüzeyi

Tüm uç noktalar `/content/registrations` altındadır (`controllers/RegistrationController.ts`) ve `Permissions.registrations` (`view` / `edit`) ile korunur:

| Rota | Erişim | Amaç |
|------|--------|------|
| `POST /register` | anonim | Tam gönderim: misafir, üye veya personel Katılımcı Ekle; sunucu fiyatlandırması, kapasite kontrolleri, isteğe bağlı ücret |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | herkese açık | Sihirbaz için türler ve seçimler; türetilmiş `used` / `remainingCapacity` değerleriyle |
| `POST /types`, `DELETE /types/:id` (`/selections` ve `/coupons` için aynısı) | `registrations.edit` | Personel ayarları için CRUD işlemleri |
| `POST /coupons/validate` | herkese açık | Sihirbaz sırasında satır içi indirim kodu doğrulaması |
| `GET /coupons/event/:eventId` | personel | Kullanım sayılarıyla birlikte kuponlar |
| `GET /event/:eventId` · `GET /event/:eventId/count` | personel · herkese açık | Liste; kapasite gösterimi için aktif sayı |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | kimlik doğrulaması gerekli | Kayıtlarım, ayrıntı, ödeme geçmişi |
| `PUT /:id` | sahibi/personel | Gönderim sonrası düzenleme: üyeleri ve seçim miktarlarını taze atomik kapasite kontrolleriyle değiştirir, `totalAmount` değerini yeniden hesaplar; asla otomatik ücret almaz veya iade yapmaz |
| `POST /:id/pay` | sahibi | "Ödemeyi tamamla": `totalAmount − amountPaid` tutarını tahsil eder, `waitlisted`/`pending` durumunu `confirmed` yapar |
| `POST /:id/promote` | personel | Manuel bekleme listesi terfisi |
| `POST /:id/cancel` · `DELETE /:id` | sahibi · personel | İptal / silme; ikisi de bekleme listesinin otomatik terfisini tetikler |

Aynı etkinlikte, aynı `personId` için iptal edilmemiş mevcut bir kayıt 409 hatasıyla reddedilir. Oluşturulan her kayıt, `WebhookDispatcher` aracılığıyla bir `registration.created` webhook'u yayınlar.

## Fiyatlandırma ve İndirim Kodları

`helpers/RegistrationPricingHelper.ts`, tüm para hesaplamalarının tek yetkili kaynağıdır:

- `computeTotal()`, her katılımcının tür fiyatını ve her seçim tercihinin `fiyat × miktar` değerini toplar.
- `validateCoupon()`, aktif bayrağını, tarih aralığını (`startDate`/`endDate`), gönderilen grup büyüklüğüne karşı `minMembers` değerini ve durumdan türetilen kullanım sayısına karşı `maxUses` değerini uygular.
- `applyDiscount()`: `percent` türü `toplam × değer/100` kadar düşer; `amount` türü `değer` kadar düşer. Her ikisi de sıfırın altına inmez.

Sihirbaz, satır içi geri bildirim için `POST /coupons/validate` uç noktasını çağırır. Ancak `register` kuponu sunucu tarafında yeniden doğrular ve uygular; istemcide gösterilen toplam yalnızca bilgi amaçlıdır.

## Atomik Kapasite Deseni

Kapasite sınırlı her ekleme, kapasite kontrolünü `INSERT` ifadesinin kendisinin bir parçası yaparak işlem veya kilit kullanmadan güvenli şekilde yarışır. Etkinlik düzeyinde (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Etkilenen satır sayısının sıfır olması "kapasite dolu" anlamına gelir. Aynı desen, tür başına eklemeleri (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, aktif kayıtlara bağlı üyeleri sayar) ve seçim başına miktarları (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` kullanır) korur. Bir kayıt sırasında herhangi bir üye veya seçim eklemesi yarıda başarısız olursa, denetleyici kısmi kaydı `deleteCascade()` ile geri alır ve hangi türün veya seçimin tükendiğini bildirir.

## Ödeme Akışı

Denetleyicideki `processRegistrationCharge`, kayıtların paraya dokunduğu tek yerdir ve bağış altyapısının ince bir istemcisidir:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Belirteçleme, bağışlarda olduğu gibi tarayıcıda gerçekleşir (bkz. [Bağış](./giving.md)). Sihirbaz, apphelper ödeme sağlayıcı kaydını yeniden kullanır; böylece giriş yapmış üyeler kayıtlı kartlarıyla ödeme yapabilir, misafirler ise yeni bir kartı belirteçleyebilir. Denetleyici, `DonateController`'ın sağlayıcıya özgü tuhaflıklarını yansıtır: Kingdom Funding `pm-{id}` ödeme yöntemi kimlikleri ve ödemeyi kaydetmeden istemciye döndürülen Stripe SCA `requires_action` yanıtları. Başarılı bir ücret bir `registrationPayments` satırı yazar, `amountPaid` değerini artırır ve kaydı onaylar. **İadeler uygulanmamıştır.** İptal edilmiş ücretli bir kayıt ödeme satırlarını korur ve herhangi bir iade, ağ geçidi panelinde ayrıca yapılır.

Her iki giriş noktası da aynı kod yolunu kullanır: `register` (kayıt sırasında ödeme) ve `pay` (bakiye ödemesi / bekleme listesi tamamlama).

`register`, iki durumda ücret almayı atlar ve kaydı `pending` olarak, `amountPaid = 0` ile kaydeder; tam tutar ödenmesi gereken bakiye olarak kalır:

- **Personel Katılımcı Ekle.** Gövdede, çağıranın kendisi olmayan bir `personId` bulunur, `guestInfo` yoktur ve çağıran o kilisede `registrations.edit` yetkisine sahiptir. Kişinin var olması gerekir (aksi halde 404), hane üyesi filtresi atlanır ve kart üzerinden ücret alınmaz.
- **Ağ geçidi yok.** Kilisenin bağış ağ geçidi yoktur (`hasGateway`, `gateway.loadAll` değerini kontrol eder). B1App ödeme adımında kart formu yerine **Kaydet ve Sonra Öde** seçeneği gösterilir.

Misafir (`au.id` olmayan) ücretli kayıtlar, `POST /giving/donate/captcha-verify` uç noktasından alınmış bir `captchaPass` taşımalıdır. `CaptchaPass.verify` (artık `shared/helpers` içinde), ücretten hemen önce çalışır; bu nedenle bekleme listesi ve ücretsiz kayıtlar etkilenmez. `CAPTCHA_ENFORCE=true` olduğunda ve geçiş eksik veya geçersiz olduğunda, yeni kayıt `deleteCascade()` ile geri alınır ve çağrı 403 döndürür. B1App'in `RegistrationPaymentForm` bileşeni misafirlere reCAPTCHA onay kutusunu gösterir ve geçişi hem kart kaydıyla hem de kayıtla birlikte gönderir.

## Bekleme Listesi Yaşam Döngüsü

Etkinlik dolu olduğunda ve etkinliğin `waitlistEnabled` bayrağı açık olduğunda, `register` grubu kapasite kontrollerini atlayarak `waitlisted` olarak kaydeder ve bekleme listesinde yer aldığını belirten normal onay e-postasını gönderir. Terfi üç yoldan gerçekleşir (`cancel`, `delete` ve personelin `promote` uç noktası). Hepsi `RegistrationRepo.promoteFromWaitlist` metodunda birleşir; bu metod en eski bekleme listesi satırını seçer ve onu atomik olarak değiştirir:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` koruması, eş zamanlı terfilerin bir satırı iki kez terfi ettirmesini engeller. Kapasite alt sorgusu ise terfinin fazla satış yapmasını önler. Terfi edilen satırlar `confirmed` değil `pending` durumuna geçer, çünkü hâlâ ödenmesi gereken bir bakiye olabilir. `RegistrationHelper.sendWaitlistAvailabilityEmail`, kayıt sahibine yerinin açıldığını bildirir ve `totalAmount − amountPaid > 0` ise kilisenin B1 `/mobile/registrations` sayfasına (Kayıtlarım) bağlantı verir. Bu bağlantı `B1AppRoot` ve kilisenin alt alan adından oluşturulur. Ödeme yapmak (ya da ödenecek bakiye olmamak) kaydı onaylar.

:::info
Kapasite artırımı tek başına otomatik terfi yapmaz. Personel, kapasiteyi artırdıktan sonra listedeki Terfi Ettir işlemini kullanır. İptaller ve silmeler ise otomatik olarak terfi ettirir.
:::

## İstemci Yüzeyleri

- **B1App sihirbazı**: Tek bir paylaşılan hook, `B1App/src/components/registration/useEventRegistration.ts`, hem web sitesi bileşenini (`components/registration/EventRegister.tsx`) hem de mobil portal ekranını (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`) yönetir. Adımlar `bilgi → üyeler → seçimler → sorular → ödeme → onay` sırasını izler. Ortadaki adımlar yalnızca etkinlikte seçimler, eklenmiş bir form veya sıfırdan farklı bir toplam varsa görünür. Bilgi ve üye adımları, canlı kalan kapasite ve tükenme durumlarıyla birlikte katılımcı türü başına seçiciler gösterir. Ödeme adımı (`RegistrationPaymentForm.tsx`) sipariş özetini, indirim kodu girişini ve giriş yapmış üyeler için apphelper sağlayıcı kaydı üzerinden kayıtlı ödeme yöntemlerini gösterir; misafirler yeni bir kart belirtir. **Kayıtlar** mobil ekranı (`screens/RegistrationsPage.tsx`) Kayıtlarım sayfasıdır: durum, kalan bakiye, Ödemeyi tamamla (`POST /:id/pay`), Düzenle (`PUT /:id`: iletişim bilgileri, üye türleri, seçim miktarları) ve İptal seçeneklerini içerir.
- **B1Admin ayarları**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx`, Bekleme Listesini Etkinleştir anahtarını ve Katılımcı Türleri, Seçimler ile İndirim Kodları için açılır bölümleri ekler (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Hepsi `/types`, `/selections` ve `/coupons` rotalarına karşı CRUD işlemleri yapar.
- **B1Admin listesi**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx` dosyasında katılımcı başına Tür sütunu, Ödenen/Toplam sütunu ile bakiye çipi, tür başına sayı çipleri, ödemelerin ayrıntılarını gösteren bir iletişim kutusu (`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId` uç noktasından), bekleme listesi için Terfi Ettir satır eylemi ve katılımcı türleri, seçimler, ödenen/toplam/bakiye ve soru yanıtlarını içeren CSV dışa aktarımı bulunur.

Modüller arası aramalar (misafir kişiyi çözme veya oluşturma, e-postalar için kiliseyi yükleme) `getMembershipModuleGateway()` üzerinden yapılır. İçerik modülü üyelik tablolarını doğrudan okumaz.

## İlgili Sayfalar

- [Bağış](./giving.md): Bu özelliğin yeniden kullandığı ağ geçidi soyutlaması, sağlayıcı kaydı ve belirteçleme modeli
- [İçerik Uç Noktaları](../api/endpoints/content.md): İçerik modülünün REST yüzeyi
- [Webhook'lar](../api/webhooks.md): `registration.created` olayı
- [Modül Yapısı](../api/module-structure.md): İçerik modülünün sunucu tarafında nasıl düzenlendiği
