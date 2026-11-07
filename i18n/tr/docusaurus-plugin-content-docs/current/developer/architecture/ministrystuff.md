# MinistryStuff (Ücretli Depolama ve SMS)

MinistryStuff.org, ChurchApps'in kendisi ücretsiz kalırken sunamadığı iki hizmeti finanse eden ayrı bir ücretli hizmettir: toplu dosya depolama (1 TB+) ve SMS kredileri. Bu hizmetler düz oranlı aylık abonelikler olarak sunulur. ChurchApps tamamen ücretsiz kalır. B1'de hiçbir özellik MinistryStuff aboneliği gerektirmez ve her entegrasyon noktası, üçüncü bir tarafın da uygulayabileceği bir sağlayıcı arayüzüdür.

## Bileşenler

| Parça | Depo | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (geliştirmede 8097 portu) | Faturalandırma (Stripe), SMS gönderimi ve kredi defteri (AWS End User Messaging), depolama (S3 + kota hesabı). Tek bir MySQL veritabanı: `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (geliştirmede 3103 portu) | ministrystuff.org: tanıtım sayfaları, fiyatlandırma ve hesap portalı (planlar, kullanım, Stripe Checkout/Müşteri Portalı yönlendirmeleri). |
| Metin mesajlaşma sağlayıcısı | `Packages/texting` → `MinistryStuffProvider` | Clearstream/TextInChurch ile birlikte `ministrystuff` adıyla kayıtlıdır. |
| Depolama arayüzü | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (varsayılan, ücretsiz) özgün S3/disk seçimini sarmalar; `FileStorageHelper` işlemi değiştirmeden varsayılan sağlayıcıya devreder. |
| Api bağlantıları | `Api/` içerik ve mesajlaşma modülleri | `MinistryStuffStorageProvider` ve `StorageResolver` (içerik), `TextingConfigHelper` hizmet anahtarı ekleme (mesajlaşma), `storageProviders` tablosu, `/content/storage/*` ve `/messaging/texting/credits` uç noktaları. |

## Kimlik ve güven

- **Aynı hesaplar, aynı kiliseler:** MinistryStuffApi, ChurchApps JWT'lerini paylaşılan `JWT_SECRET` ile doğrular (B1Transfer gibi kardeş uygulama modeli). Portal, MembershipApi üzerinden oturum açar ve `?jwt=` ile yapılan devirleri kabul eder.
- **Sunucudan sunucuya (çekirdek Api → MinistryStuffApi):** `X-Service-Key` başlığı (`MINISTRYSTUFF_SERVICE_KEY`, iki tarafta da) ve açık bir `churchId` kullanılır. Yetki her zaman o kilisenin aboneliğine göre kontrol edilir. Kiliseler hiçbir zaman MinistryStuff kimlik bilgilerine sahip olmaz; B1Admin'de sağlayıcıyı seçmek yeterlidir.

## SMS akışı

B1Admin'de Metin Gönder → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → mesaj segment sayısı, geçerli dönemin `smsCreditGrants` kayıtlarından düşülür → AWS End User Messaging (geliştirmede veya `smsMode: mock` ile). Krediler **kesin bir sınırdır**: kredisi biten gönderimler topluca reddedilir (`insufficient_credits`; B1Admin'de kullanıcı dostu bir yükseltme bildirimi olarak gösterilir). Kısmi gönderim yapılmaz ve kota aşımı için ek ücret alınmaz. Kredi tahsisleri, her faturalama dönemi için Stripe `invoice.paid` webhook'larından idempotent olarak oluşturulur. Her gönderimden önce abonelikten çıkanlar (`smsOptOuts`) filtrelenir.

Aynı sağlayıcı arayüzüne `TextingController`'ı kullanmadan ulaşan diğer yollar da vardır: yoklama uyarıları (`CheckinController` → `MessagingModuleGateway.sendBulkText`) ve iş akışı **Metin Gönder** adımı (`Api/src/modules/doing/helpers/StepActionHelper.ts` içindeki `sendText` → `MessagingModuleGateway.sendPersonText`; bu adım gönderen bilgisi boş olan `sentTexts` ve `deliveryLogs` kayıtlarını yazar). Birleştirme alanları (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) her alıcı için `MergeFieldHelper.resolve` tarafından çözülür ve sonuç 1.600 karakterle sınırlandırılır. `TextingController` içinde `{{` içeren bir grup mesajı, tek bir `sendBulk` yerine alıcı başına bir `sendMessage` olarak gönderilir. Yer tutucu içermeyen bir mesaj ise yine tek bir toplu gönderim olarak iletilir.

## Depolama akışı

Bir kilisenin sağlayıcı kaydı (`content.storageProviders`, B1Admin → Ayarlar → Dosya Depolama bölümünde yönetilir), **yeni** yüklemelerin nereye yapılacağını belirler. `contentPath`, dosya başına mutlak bir URL'dir. Bu sayede farklı sağlayıcılar geçiş yapmadan birlikte çalışabilir: eski dosyalar `content.churchapps.org` üzerinden sunulmaya devam eder, yeni dosyalar ise `content.ministrystuff.org` üzerinden sunulur. Yüklemeler şu yolu izler: Api → `StorageResolver.forChurch` → sağlayıcının `store`/`getUploadUrl` işlevi (S3 modunda `content-length-range` içeren önceden imzalanmış POST; disk/geliştirme modunda base64 yedeği). Silme işlemleri, kayıtlı URL'ye göre yönlendirilir (`StorageResolver.forUrl`). Kota, plandaki bayt miktarıdır ve `storageObjects` tablosundaki `stored` ve `pending` (ayrılmış) kayıtlardan hesaplanır. Kota aşıldığında yeni yüklemeler engellenir (`storage_quota_exceeded`). Hiçbir dosya silinmez ve ek ücret alınmaz. ChurchApps'in ücretsiz katmanı etkilenmez: limitler öncekiyle aynıdır ve kilise genelinde bir kota yoktur.

Kapsam notu: Sağlayıcı seçimi, içerik **dosya ve kaynakları** akışını kapsar (toplu medyanın bulunduğu yer). Galeri, logo ve fotoğraf yüklemeleri varsayılan sağlayıcıda kalır. Bu yüklemeler depolamadaki anahtarları listeleyip URL'leri istemci tarafında oluşturduğu için kilise bazlı yönlendirme henüz uygulanmaz.

Aynı arayüz, [Kendi Depolamanızı Getirin](./byos-storage) özelliğini de destekler: Kiliseler, MinistryStuff planı yerine Google Drive, Dropbox, OneDrive veya kendi S3 uyumlu bucket'larını bağlayabilir.

## Faturalandırma

Abonelik için barındırılan Stripe Checkout, kart güncelleme, iptal ve faturalar için Stripe Müşteri Portalı kullanılır. MinistryStuffWeb'de kart formu yoktur. Her (kilise, ürün) çifti için bir `subscriptions` kaydı tutulur. Planlar ve katmanlar kodda tanımlıdır (`MinistryStuffApi/src/helpers/Plans.ts`) ve Stripe fiyat kimlikleri yapılandırmadan gelir. Webhook'u (`/billing/webhook`, ham gövde imza doğrulaması ve `webhookEvents` tekrar kontrolü ile), abonelik yaşam döngüsünü yönetir: aktif → ödeme gecikmiş (ek süre) → iptal edildi.

## Geliştirme ortamı kurulumu

MinistryStuffApi'yi çalıştırın (`yarn dev`, 8097 portu). Bunun için paylaşılan `JWT_SECRET` ve `MINISTRYSTUFF_SERVICE_KEY` değerlerini içeren bir `.env` dosyası gerekir. Aynı hizmet anahtarını `Api/.env` dosyasında da ayarlayın. `Api/config/dev.json` dosyası zaten `ministryStuffApi` değerini `localhost:8097` adresine yönlendirir. MinistryStuffWeb için `VITE_STAGE=dev` değerini içeren bir `.env` dosyası gerekir. Geliştirmede `smsMode: mock` ve disk depolama kullanılır; AWS gerekmez.
