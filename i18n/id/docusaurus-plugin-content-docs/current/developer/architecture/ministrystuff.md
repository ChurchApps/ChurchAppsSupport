# MinistryStuff (Penyimpanan Berbayar & SMS)

MinistryStuff.org adalah layanan berbayar terpisah yang mendanai dua hal yang tidak dapat diberikan ChurchApps secara gratis: penyimpanan file berukuran besar (1TB+) dan kredit SMS. Keduanya tersedia sebagai langganan bulanan dengan tarif tetap. ChurchApps sendiri tetap 100% gratis. Tidak ada bagian B1 yang memerlukan langganan MinistryStuff, dan setiap titik integrasi adalah provider seam yang juga dapat diimplementasikan oleh pihak ketiga.

## Komponen

| Bagian | Repositori | Peran |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (port 8097 untuk pengembangan) | Penagihan (Stripe), pengiriman SMS + buku kredit (AWS End User Messaging), penyimpanan (S3 + pencatatan kuota). Satu database MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (port 3103 untuk pengembangan) | ministrystuff.org: pemasaran, harga, dan portal akun (paket, penggunaan, pengalihan ke Stripe Checkout/Customer Portal). |
| Penyedia SMS | `Packages/texting` → `MinistryStuffProvider` | Terdaftar sebagai `ministrystuff` bersama Clearstream/TextInChurch. |
| Seam penyimpanan | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (default, gratis) membungkus sakelar S3/disk yang asli. `FileStorageHelper` mendelegasikan ke provider default tanpa perubahan. |
| Penghubungan Api | Modul konten dan messaging di `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (konten), injeksi service-key `TextingConfigHelper` (messaging), tabel `storageProviders`, endpoint `/content/storage/*` + `/messaging/texting/credits`. |

## Identitas & kepercayaan

- Akun dan gereja yang sama: MinistryStuffApi memverifikasi JWT ChurchApps dengan `JWT_SECRET` bersama (pola aplikasi sejenis, seperti B1Transfer). Portal masuk melalui MembershipApi dan menerima serah terima `?jwt=`.
- Server-ke-server (Api inti → MinistryStuffApi): header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, di kedua sisi) + `churchId` eksplisit. Hak akses selalu diperiksa terhadap langganan gereja tersebut. Gereja tidak pernah memegang kredensial MinistryStuff. Cukup dengan memilih penyedia di B1Admin.

## Alur SMS

B1Admin Send Text → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → jumlah segmen dikurangkan dari `smsCreditGrants` periode berjalan → AWS End User Messaging (atau `smsMode: mock` di pengembangan). Kredit bersifat **penghentian keras**: jika kredit habis, seluruh pengiriman ditolak (`insufficient_credits`, ditampilkan sebagai ajakan upgrade yang ramah di B1Admin). Tidak ada pengiriman sebagian, dan tidak ada tagihan kelebihan pemakaian. Hibah kredit diterbitkan secara idempoten per periode penagihan dari webhook Stripe `invoice.paid`. Opt-out (`smsOptOuts`) disaring sebelum setiap pengiriman.

Jalur lain yang mencapai seam penyedia yang sama tanpa melalui `TextingController`: peringatan check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) dan aksi langkah alur kerja **Send Text** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, yang menulis baris `sentTexts` dan `deliveryLogs` dengan pengirim null). Bidang gabungan (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) diisi per penerima oleh `MergeFieldHelper.resolve`, dan hasilnya dibatasi hingga 1.600 karakter. Di `TextingController`, pesan grup yang berisi `{{` dikirim sebagai satu `sendMessage` per penerima, bukan satu `sendBulk`. Pesan tanpa placeholder tetap dikirim sebagai satu pengiriman massal.

## Alur penyimpanan

Baris provider gereja (`content.storageProviders`, dikelola di B1Admin → Settings → File Storage) menentukan lokasi unggahan **baru**. `contentPath` adalah URL absolut per file, sehingga provider campuran dapat hidup berdampingan tanpa migrasi: file lama tetap disajikan dari `content.churchapps.org`, sedangkan file baru dari `content.ministrystuff.org`. Unggahan mengalir dari Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` provider (presigned POST dengan `content-length-range` dalam mode S3; fallback base64 dalam mode disk/dev). Penghapusan diarahkan berdasarkan URL tersimpan (`StorageResolver.forUrl`). Kuota sama dengan byte paket, dihitung dari `storageObjects` (reservasi `stored` + `pending`). Kuota yang terlampaui memblokir unggahan baru (`storage_quota_exceeded`). Tidak ada yang pernah dihapus atau ditagih tambahan. Tingkat gratis ChurchApps tidak tersentuh: batasnya sama seperti sebelumnya, dan tidak ada kuota untuk seluruh gereja.

Catatan cakupan: pemilihan provider hanya mencakup alur **file/sumber daya** konten, yaitu tempat media berukuran besar disimpan. Unggahan galeri, logo, dan foto tetap menggunakan provider default. Fitur tersebut mendaftar kunci dari penyimpanan dan membangun URL di sisi klien, sehingga pengakaran per gereja belum berlaku.

Seam yang sama juga mendukung [Penyimpanan Bring-Your-Own](./byos-storage): gereja dapat menautkan Google Drive, Dropbox, OneDrive, atau bucket S3-compatible milik mereka sendiri, alih-alih menggunakan paket MinistryStuff.

## Penagihan

Stripe Checkout (hosted) digunakan untuk berlangganan, dan Stripe Customer Portal untuk memperbarui kartu, membatalkan, serta melihat faktur. MinistryStuffWeb tidak memiliki formulir kartu. Ada satu baris `subscriptions` per pasangan (gereja, produk). Paket dan tingkatannya berada dalam kode (`MinistryStuffApi/src/helpers/Plans.ts`) dengan ID harga Stripe dari konfigurasi. Webhook (`/billing/webhook`, dengan verifikasi tanda tangan raw-body dan deduplikasi `webhookEvents`) menggerakkan siklus hidup langganan: active → past_due (masa tenggang) → canceled.

## Penyiapan pengembangan

Jalankan MinistryStuffApi (`yarn dev`, port 8097). Ini memerlukan `.env` dengan `JWT_SECRET` bersama dan `MINISTRYSTUFF_SERVICE_KEY`. Atur service key yang sama di `Api/.env`. `Api/config/dev.json` sudah mengarahkan `ministryStuffApi` ke `localhost:8097`. MinistryStuffWeb memerlukan `.env` dengan `VITE_STAGE=dev`. Pengembangan menggunakan `smsMode: mock` dan penyimpanan disk, sehingga tidak perlu AWS.
