---
title: "Kendi Depolamanızı Getirin (BYOS)"
description: "Kilisenin dosya yüklemelerinin 100 MB platform sınırını aşması için B1 Admin'e kendi Google Drive, Dropbox, OneDrive veya S3 uyumlu depolama alanınızı bağlayın."
---

# Kendi Depolamanızı Getirin (BYOS)

Kiliseler, `/content/files` yüzeylerinde (web sitesi Dosyaları, grup kaynakları) yaklaşık 100MB ücretsiz barındırılan dosya depolama alanı alır. BYOS, bir kilisenin kendi bulut depolamasını bağlamasına olanak tanır: **Google Drive, Dropbox, OneDrive veya herhangi bir S3 uyumlu depolama (AWS S3, Cloudflare R2, Backblaze B2)**. Böylece yeni yüklemeler kilisenin kendi hesabına kaydedilir ve platform sınırı olmaz. ChurchApps ücretsiz kalır; sınır kilisenin kendi hesabıdır.

## Sağlayıcı katmanı

BYOS, [MinistryStuff](./ministrystuff.md) için oluşturulan depolama katmanını yeniden kullanır: `Packages/apihelper` içindeki `IStorageProvider`, `StorageResolver` tarafından `content.storageProviders` tablosundan kilise başına çözümlenir. Tekil `churchapps`/`ministrystuff` sağlayıcılarının aksine, BYOS sağlayıcıları kilise başına kimlik bilgilerini tutar. Bu yüzden `StorageResolver.forChurch`, her istek için kilisenin satırından bir örnek oluşturur. Uygulamalar çözücünün yanında, `Api/src/modules/content/helpers/` içinde yer alır: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider` ve ayrıca `ByosAuth` (OAuth belirteç değişimi ve tek uçuşlu yenileme). Dropbox yenileme belirteçlerini döndürdüğü için yenilemeler, `ProviderProxyController`'ın yaptığı şekilde tekilleştirilir.

`storageProviders` kimlik bilgilerini taşır: `accessToken`/`refreshToken`/`tokenExpiresAt` (şifrelenmiş OAuth üçlüsü) veya `apiKey`/`apiSecret` ile `settings` JSON'u (`{endpoint, region, bucket, publicBase}`, S3). Belirteçler asla istemciye ulaşmaz. `GET /content/storage/providers` gizli bilgileri maskeler ve bir `connected` boolean değeri döndürür.

## Yükleme akışı

Önceki ile aynı üç adımlı sözleşme, genişletilmiş bir ön imzalı yanıt yapısıyla kullanılır. `POST /content/files/postUrl`, `PresignedPostData` döndürür; bu yapı artık isteğe bağlı olarak `method`, `rawBody`, `headers`, `chunkSize` ve `externalIdField` alanlarını taşır:

| Sağlayıcı | Ön imza | İstemci baytları nasıl gönderir |
|---|---|---|
| churchapps (varsayılan) | S3 ön imzalı POST | çok parçalı form (eski yöntem) |
| Google Drive | devam ettirilebilir yükleme oturumu (`drive.file` kapsamı) | oturum URI'sine tek PUT |
| Dropbox | `files/get_temporary_upload_link` (4 saat) | ham POST |
| OneDrive | `createUploadSession` (approot) | parçalı PUT (20MiB, Graph 320KiB katları) |
| S3 uyumlu | ön imzalı PUT (B2'nin POST politikası yok) | ham PUT |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) tüm biçimleri işler ve yanıt bir sağlayıcı dosya kimliği içerdiğinde (Drive) bunu döndürür. İstemci bu kimliği `POST /content/files` kaydında `externalId` olarak iletir. `files.provider` ile `files.externalId`, baytların nerede olduğunu kaydeder (Drive dosya kimliği; diğerleri için yol). 100MB kota kontrolü yalnızca çözümlenen sağlayıcı `churchapps` olduğunda uygulanır.

## Herkese açık indirmeler

Tüketici bulut depolama alanları doğrudan bağlantıyla kullanılamaz (Drive bağlantıları kotayı aşar, Dropbox ve OneDrive bağlantılarının süresi dolar). Bu yüzden OAuth üçlüsü için `contentPath`, kararlı bir Api rotasına işaret eder: `GET /content/files/download/:id` (anonim). Bu rota dosya satırını yükler, sağlayıcının `getDownloadUrl` yöntemi (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`) aracılığıyla kısa ömürlü bir doğrudan bağlantı üretir, bunu bellekte 30 dakika önbelleğe alır ve `Cache-Control: max-age=300` ile 302 yönlendirmesi yapar. Bant genişliği tarayıcı ile sağlayıcı arasında akar, hiçbir zaman Api üzerinden geçmez. S3 uyumlu depolama yönlendirmeyi tamamen atlar. Bu durumda `contentPath`, kararlı `publicBase + key` URL'sidir (kovanın herkese açık okumaya ve CORS PUT işlemine izin vermesi gerekir).

Silme ve indirmeler `files.provider` alanına göre yönlendirilir (`StorageResolver.forFile`). Bu alanı olmayan eski satırlar URL öneki yönlendirmesine geri döner. BYOS dosyalarında yeniden adlandırmalar yalnızca veritabanında yapılır, çünkü baytlar ada göre değil `externalId` ile adreslenir. Hâlâ dosyası olan bir sağlayıcının bağlantısını kesmek satırı silmez. Bunun yerine satırı yumuşak olarak devre dışı bırakır ve belirteçleri tutar, böylece indirme ve silme işlemleri çalışmaya devam eder.

## Bağlanma (B1Admin → Ayarlar → Dosya Depolama)

OAuth üçlüsü, içerik sağlayıcılarıyla aynı aktarma akışını kullanır: açılır pencere → sağlayıcı onayı → `{membershipApi}/oauth/relay/callback` → B1Admin aktarma oturumunu yoklar → `POST /content/storage/exchange` sunucu tarafında kod-belirteç değişimini gerçekleştirir. İstemci gizli anahtarları sunucudan asla ayrılmaz. Google için `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive için `ONEDRIVE_CLIENT_SECRET` kullanılır; Dropbox ise PKCE kullanan genel bir istemcidir. İstemci kimlikleri `B1Admin/src/settings/components/byosProviders.ts` ve `Api .../ByosAuth.ts` içinde bulunur. Kapsamlar bilerek minimal tutulmuştur: Google `drive.file` (yalnızca uygulamanın oluşturduğu dosyalar, kısıtlı kapsam doğrulaması gerekmez), OneDrive `Files.ReadWrite.AppFolder` ve Dropbox uygulama klasörü erişimi. S3 ise basit bir kimlik bilgisi formudur.

Kapsam notu: BYOS yalnızca `/content/files` yüzeylerini kapsar. Galeri görselleri, küçük resimler, logolar ve kişi fotoğrafları varsayılan sağlayıcıda kalır. Bu öğeler küçük boyutlu, CDN üzerinden sunulan ve görselleri optimize edilmiş öğelerdir. İstemci, kilisenin BYOS ayarından bağımsız olarak bir yüklemeyi varsayılan churchapps sağlayıcısına sabitlemek için `postUrl` gövdesine `platformStorage: true` de geçebilir. FreeShow bunu `files/group/{teamId}/current.zip` eşitleme durumu için kullanır. Bu dosya herkese açık içerik ana bilgisayarından doğrudan okunur ve hiçbir zaman dosya satırı olarak kaydedilmez.
