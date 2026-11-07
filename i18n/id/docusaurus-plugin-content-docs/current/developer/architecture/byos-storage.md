---
title: "Penyimpanan Milik Sendiri"
---

# Penyimpanan Milik Sendiri (BYOS)

Gereja mendapatkan sekitar 100MB penyimpanan file yang dihosting secara gratis (bagian `/content/files`: File situs web, sumber daya grup). BYOS memungkinkan gereja menautkan penyimpanan cloud miliknya sendiri, yaitu **Google Drive, Dropbox, OneDrive, atau bucket apa pun yang kompatibel dengan S3** (AWS S3, Cloudflare R2, Backblaze B2). Dengan begitu, unggahan baru masuk ke akun gereja sendiri tanpa batas platform. ChurchApps tetap gratis; batasnya adalah akun gereja itu sendiri.

## Titik integrasi penyedia

BYOS menggunakan kembali titik integrasi penyimpanan yang dibangun untuk [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) yang di-resolve per gereja oleh `StorageResolver` dari tabel `content.storageProviders`. Berbeda dengan penyedia singleton `churchapps`/`ministrystuff`, penyedia BYOS menyimpan kredensial per gereja, sehingga `StorageResolver.forChurch` membuat instance per permintaan dari baris milik gereja. Implementasinya berada di samping resolver di `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, serta `ByosAuth` (pertukaran token OAuth + penyegaran single-flight. Dropbox memutar refresh token, sehingga penyegaran diduplikasi dengan cara yang sama seperti yang dilakukan `ProviderProxyController`).

`storageProviders` menyimpan kredensial: `accessToken`/`refreshToken`/`tokenExpiresAt` (terenkripsi, trio OAuth) atau `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, S3). Token tidak pernah sampai ke klien. `GET /content/storage/providers` menyamarkan rahasia dan mengembalikan boolean `connected`.

## Alur unggah

Kontrak tiga langkah yang sama seperti sebelumnya, dengan bentuk presign yang diperluas. `POST /content/files/postUrl` mengembalikan `PresignedPostData` yang kini secara opsional memuat `method`, `rawBody`, `headers`, `chunkSize`, dan `externalIdField`:

| Penyedia | Presign | Klien mengirim byte |
|---|---|---|
| churchapps (bawaan) | POST presigned S3 | form multipart (lama) |
| Google Drive | sesi unggah yang dapat dilanjutkan (cakupan `drive.file`) | satu PUT ke URI sesi |
| Dropbox | `files/get_temporary_upload_link` (4 jam) | POST mentah |
| OneDrive | `createUploadSession` (approot) | PUT terpotong (20MiB, kelipatan 320KiB Graph) |
| Kompatibel S3 | PUT presigned (B2 tidak memiliki kebijakan POST) | PUT mentah |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) menangani semua bentuk dan mengembalikan id file penyedia bila respons menyertakannya (Drive). Klien meneruskannya sebagai `externalId` dalam pendaftaran `POST /content/files`. `files.provider` + `files.externalId` mencatat lokasi byte (id file Drive; path untuk yang lain). Pemeriksaan kuota 100MB hanya berlaku bila penyedia yang di-resolve adalah `churchapps`.

## Unduhan publik

Cloud konsumen tidak dapat di-hotlink (tautan Drive kehabisan kuota, tautan Dropbox/OneDrive kedaluwarsa). Oleh karena itu, untuk trio OAuth `contentPath` mengarah ke rute Api yang stabil: `GET /content/files/download/:id` (anonim) memuat baris file, membuat tautan langsung berumur pendek melalui `getDownloadUrl` penyedia (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), menyimpannya dalam memori selama 30 menit, lalu melakukan pengalihan 302 dengan `Cache-Control: max-age=300`. Lalu lintas bandwidth mengalir antara browser↔penyedia, tidak pernah melalui Api. S3-compatible melewati pengalihan sepenuhnya. `contentPath` adalah URL stabil `publicBase + key` (bucket harus mengizinkan baca publik dan CORS PUT).

Penghapusan dan unduhan diarahkan berdasarkan `files.provider` (`StorageResolver.forFile`). Baris lama tanpa kolom tersebut kembali ke perutean berbasis awalan URL. Pengubahan nama hanya dilakukan di basis data untuk file BYOS (byte dialamatkan melalui `externalId`, bukan nama). Memutus penyedia yang masih memiliki file akan menonaktifkan baris secara lunak (token tetap disimpan agar unduhan dan penghapusan tetap berfungsi), alih-alih menghapusnya.

## Menghubungkan (B1Admin → Settings → File Storage)

Trio OAuth menggunakan alur relay yang sama dengan penyedia konten: popup → persetujuan penyedia → `{membershipApi}/oauth/relay/callback` → B1Admin melakukan polling sesi relay → `POST /content/storage/exchange` melakukan pertukaran kode→token di sisi server (rahasia klien tidak pernah meninggalkan server; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox adalah klien publik PKCE). ID klien berada di `B1Admin/src/settings/components/byosProviders.ts` dan `Api .../ByosAuth.ts`. Cakupan (scope) sengaja dibuat minimal: Google `drive.file` (hanya file yang dibuat aplikasi, tanpa verifikasi cakupan terbatas), OneDrive `Files.ReadWrite.AppFolder`, dan Dropbox akses folder aplikasi. S3 menggunakan formulir kredensial biasa.

Catatan cakupan: BYOS hanya mencakup bagian `/content/files`. Gambar galeri, thumbnail, logo, dan foto orang tetap menggunakan penyedia bawaan (kecil, disajikan CDN, dan dioptimalkan gambarnya). Klien juga dapat menyertakan `platformStorage: true` dalam body `postUrl` untuk mengunci unggahan ke penyedia churchapps bawaan, terlepas dari pengaturan BYOS gereja. FreeShow menggunakan ini untuk status sinkronisasi `files/group/{teamId}/current.zip`, yang dibaca langsung dari host konten publik dan tidak pernah didaftarkan sebagai baris file.
