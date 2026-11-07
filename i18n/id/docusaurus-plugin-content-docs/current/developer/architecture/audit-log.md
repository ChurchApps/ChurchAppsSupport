---
title: "Log Audit & Batch yang Dapat Dibatalkan"
---

# Log Audit & Batch yang Dapat Dibatalkan

<div class="article-intro">

Setiap perubahan data yang dilakukan pengguna di Api dicatat, yaitu siapa, apa, kapan, dan dari mana, di semua modul tanpa perlu konfigurasi tambahan di setiap controller. Di atas catatan ini ada lapisan batch: impor atau aksi massal dapat ditandai sebagai batch dan kemudian **dibatalkan** baris demi baris, seperti di Planning Center. Keduanya disimpan dalam satu tabel `auditLogs` di database membership dan dikendalikan sepenuhnya dari satu titik, yaitu `BaseController.actionWrapper`. Halaman ini memetakan apa saja yang diaudit, di mana datanya disimpan, pertimbangan performa yang membentuk desainnya, serta cara pembatalan mengembalikan batch dengan aman tanpa transaksi lintas database.

</div>

## Ikhtisar

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Dua fakta struktural menjadi dasar seluruh pembahasan di bawah:

1. **Lapisan controller adalah satu-satunya tempat yang mengetahui pelakunya.** Repository tidak pernah melihat `AuthenticatedUser`; hanya controller yang memegang `au`. Semua controller modul sudah melewati `BaseController.actionWrapper`, sehingga di situlah audit dipasang. Tidak ada signature repository yang perlu diubah.
2. **Satu tabel melayani semua modul.** Baris audit untuk giving, kehadiran, konten, dan lainnya semuanya ditulis ke tabel `auditLogs` di database membership melalui `RepoManager.getRepos("membership")`, bahkan dari controller yang bukan milik modul membership. Pertanyaan "semua yang diubah Jane hari ini" cukup dijawab dengan satu query.

## Apa yang diaudit

Audit **aktif secara default** untuk setiap kata kerja pengubah data di setiap rute. `actionWrapper` menurunkan field audit dari request tanpa konfigurasi per rute:

| Field | Diturunkan dari |
|-------|-----------------|
| `module` | `this.moduleName` (modul pemilik) |
| `entityType` | bentuk tunggal dari segmen terakhir `req.baseUrl` (misalnya `/membership/people` menjadi `person`) |
| `category` | secara default sama dengan `entityType` |
| `action` | `${entityType}_saved` untuk `POST /`, `${entityType}_deleted` untuk `DELETE /:id`, selain itu `${entityType}_${method}:${routePath}` sehingga sub-rute non-CRUD (misalnya `task_post:/:id/move`) ikut tercatat otomatis |

`BaseController.AUDIT_REGISTRY` **hanya untuk penggantian dan pengecualian**. Ini bukan daftar izin. Sebuah rute dimasukkan ke sana untuk mengganti nama category/entityType, mendeklarasikan `{ dbModule, table }` (yang membuatnya mendukung batch dan pembatalan), menandainya sebagai `sensitive` (agar mutasi anonim ikut diaudit), atau mematikannya dengan `optOut: true`.

**Daftar pengecualian** (jalur tulis bervolume tinggi yang akan membanjiri log): `visits`, `visitsessions`, `sessions`, dan `checkin` pada attendance (badai check-in hari Minggu), serta `messages`, `connections`, dan `devices` pada messaging (chat dan status online). Selain itu, semuanya dicatat.

**Endpoint massal** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) terdaftar di `BULK_ROUTES` dan menghasilkan **satu baris audit untuk setiap id yang tersentuh**. Jadi impor 10.000 orang menghasilkan 10.000 baris. Granularitas per entitas inilah yang membuat batch dapat dibatalkan.

**Mutasi anonim** (`actionWrapperAnon`, seperti donasi tamu, pendaftaran tamu, dan pengiriman formulir) hanya diaudit untuk rute yang ditandai `sensitive` di registry. Data ditulis dengan `userId="anonymous"` beserta IP klien. Donasi berada di urutan teratas daftar ini, dan jalur tersebut memiliki riwayat regresi yang nyata.

### Penyamaran rahasia dan batas ukuran

Sebelum payload `details` disimpan, `AuditLogHelper.capDetails()` menjalankan `sanitizeValue()` padanya:

- **Kunci rahasia disamarkan.** Field yang nama huruf kecilnya ada di `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, dan lainnya) diganti dengan `"[redacted]"`.
- **Nilai skalar yang besar dihapus.** Setiap URI `data:` atau string lebih dari 4 KB (foto base64, blob) menjadi `"[stripped]"`.
- **Baris yang terlalu besar dipotong.** Jika JSON hasil serialisasi melebihi sekitar 64 KB, seluruh payload diganti dengan `{ truncated: true }`. Baris yang dipotong tetap bisa dilihat, tetapi **tidak dapat dibatalkan** karena tidak ada citra sebelum/sesudah untuk dipulihkan.

## Di mana data disimpan

Satu tabel `auditLogs` di database **membership** menopang semua modul. Kolomnya: `id, churchId, userId, category, action, entityType, entityId, details (JSON string MEDIUMTEXT), ipAddress, module, batchId, created`. Migrasi `tools/migrations/membership/2026-07-04_audit_universal.ts` menambahkan `module` dan `batchId`, memperlebar `details` dari `TEXT` menjadi `MEDIUMTEXT`, menambahkan indeks `ix_auditLogs_batch (batchId)` dan `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, serta membuat tabel `batches`. Kolom `module` ada agar tabrakan `entityType` antarmodul (`note` dan `setting` ada di beberapa modul) tetap bisa difilter. Indeks entitas menopang riwayat per entitas sekaligus guard konflik saat pembatalan.

Penulisan lintas modul dilakukan lewat `RepoManager.getRepos("membership")` dari dalam wrapper. Urutannya disengaja: **penulisan utama di-commit lebih dulu di database modul, baru kemudian audit disisipkan.** Dalam mode normal, kegagalan penyisipan audit diabaikan (`console.error`, dan Sentry menangkapnya). Audit bersifat sekadar pencatatan dan tidak boleh menggagalkan permintaan pengguna. Dalam **mode batch**, penanganannya ketat (lihat di bawah).

:::info Mengapa tidak memakai trigger, CDC, atau tabel per modul?
- **Trigger MySQL** tidak mengetahui pengguna yang melakukan perubahan (koneksi tidak memiliki `au`), dan mengharuskan pemeliharaan set trigger di setiap skema.
- **binlog / CDC** adalah proyek infrastruktur tersendiri dengan masalah identitas pelaku yang sama.
- **Meneruskan `userId` melalui setiap repository** akan menyentuh ratusan file hanya untuk memindahkan informasi yang sudah tersedia di lapisan controller.
- **Tabel audit per modul** berarti 7 kali lipat pekerjaan pemasangan dan query fan-out untuk setiap pertanyaan lintas modul. Satu tabel di titik controller adalah desain dengan kode paling sedikit yang tetap bisa mencatat pelakunya.
:::

## Pendirian soal performa

Jalur panas (hot path) sengaja dibuat murah. Biaya hanya dibayar di tempat yang memberikan manfaat.

- **Tidak ada read sebelum write pada pembaruan normal.** Penyimpanan biasa **tidak** memuat data lama. **Nilai sesudah yang dikirim** disimpan di `details.after`. UI merekonstruksi perubahan dari lama ke baru saat *melihat* data, dengan membandingkannya terhadap baris audit sebelumnya dari entitas tersebut. Satu query saat melihat, tanpa biaya saat menulis. Field yang tidak pernah disentuh sejak peluncuran tidak menampilkan nilai "lama", dan hal ini dapat diterima.
- **Penghapusan mendapat citra sebelum.** `DELETE /:id` pada rute registry dengan `{ dbModule, table }` memuat baris secara generik terlebih dahulu dan menyimpannya di `details.before`. Penghapusan jarang terjadi, dan citra sebelum adalah seluruh nilai forensiknya.
- **Mode batch adalah satu-satunya read sebelum write yang dilakukan secara sistematis**, dan mode ini bersifat opt-in. Operasi massal atau impor memang sudah mahal, jadi N kali read snapshot adalah harga untuk bisa membatalkan.
- **Penyisipan audit di-await.** `actionWrapper` mengumpulkan promise log lalu menjalankan `await Promise.allSettled(...)` sebelum mengembalikan respons. Ini adalah invarian terpenting: di Lambda, container **dibekukan segera setelah respons dikembalikan**, sehingga penyisipan yang tidak di-await akan hilang diam-diam. "Fire and forget" di sini berarti *kesalahan tidak pernah menggagalkan permintaan*, bukan *tidak perlu di-await*. Satu penyisipan pada pool membership yang sudah hangat memakan waktu sekitar 1–3 ms.

## Batch dan pembatalan

Sebuah **batch** mengelompokkan sekumpulan mutasi agar bisa ditinjau dan dibalik bersama-sama. Ada dua cara membuka batch:

- **Eksplisit:** `POST /membership/batches { label, source }` mengembalikan `batchId`. Klien (B1Transfer, UI impor B1Admin) kemudian mengirim `X-Batch-Id: <id>` pada setiap penyimpanan atau penghapusan berikutnya. `POST /membership/batches/:id/complete` menutup batch dan mencatat `itemCount`.
- **Implisit:** keempat endpoint massal membuka, mengisi, dan menutup batchnya sendiri dalam satu permintaan, lalu mengembalikan `batchId` dalam respons.

Tabel `batches` (database membership): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Mode batch bersifat ketat

Saat `X-Batch-Id` ada, `actionWrapper` memperketat setiap pemeriksaan (`writeBatchAuditRows`):

1. Batch harus ada, berstatus `open`, dan milik `au.churchId`. Jika tidak, respons **403**.
2. Rute harus mendukung batch (`{ dbModule, table }` ada di registry). Jika tidak, respons **400**.
3. Sebelum aksi dijalankan, citra sebelum untuk semua id yang terdampak dimuat dengan **satu** query `WHERE id IN (...) AND churchId = ?`. Jika pembacaan snapshot ini gagal, permintaan **gagal dengan 500 dan aksi tidak dijalankan**. Mode batch tidak boleh menghasilkan log yang tidak bisa dibatalkan tanpa diketahui. (Sebaliknya, mode normal bersifat best-effort dan mengabaikan kegagalan snapshot.)
4. Setelah aksi berhasil, satu baris audit ditulis untuk setiap entitas dengan `batchId`, `details.before`, dan `details.after`, serta **penanda create** eksplisit untuk baris yang dibuat oleh batch.

### Pembatalan

`POST /membership/batches/:id/undo` (izin: pembuat batch atau `Permissions.server.admin`). Permintaan ditolak jika batch belum berstatus `completed` atau jika sudah lebih dari **jendela pembatalan 30 hari**. `BatchUndoHelper.undo()` kemudian:

1. Memuat baris audit batch dan **mengelompokkannya berdasarkan `(module, entityType, entityId)`**. Entitas yang disentuh beberapa kali dalam satu batch dibalik **sekali saja**, kembali ke keadaan sebenarnya sebelum batch, yaitu citra sebelum yang paling awal, atau penghapusan jika batch yang membuatnya. Inilah alasan pembatalan tidak memutar ulang setiap baris secara naif, sebab memulihkan snapshot perantara di tengah batch akan salah.
2. Untuk setiap entitas, menjalankan **guard konflik terlebih dahulu**: `auditLog.hasLaterModification()` memeriksa apakah ada entri audit *yang lebih baru* untuk `(module, entityType, entityId)` yang sama di luar batch ini. Jika ada, entitas itu telah diubah setelah impor. Entitas tersebut **dilewati dan dilaporkan**, tidak pernah ditimpa. Ini memanfaatkan log audit itu sendiri sebagai pendeteksi perubahan, sehingga tidak perlu kolom `modifiedAt` di tabel mana pun.
3. Membalik operasi sesuai catatan, dengan mengambil `{ dbModule, table }` dari registry dan menggunakan penulisan Kysely yang generik:
   - **created** → hapus baris secara permanen.
   - **updated** → tulis kembali `details.before`.
   - **deleted** → sisipkan kembali `details.before` (perbarui atau sisipkan jika baris dengan id tersebut muncul kembali).
4. Setiap pembalikan itu sendiri juga diaudit (`action: "<entityType>_undone"`, tanpa `batchId`, karena undo dari undo berada di luar cakupan).

Operasi dipilih dari **penanda create** eksplisit, bukan disimpulkan dari tidak adanya citra sebelum. Citra sebelum yang memang kosong atau baris yang dipotong tidak boleh keliru dianggap sebagai create.

Payload hasil berbentuk `{ restored, skippedConflicts: [...], failed: [...], status }`. Batch berpindah ke status `undone` (bersih) atau `partial`. **Tidak ada transaksi lintas DB.** Pembatalan bersifat best-effort per baris. Ini adalah keterbatasan yang sama seperti yang didokumentasikan Planning Center untuk profil yang digabung.

:::warning Entitas dengan efek samping memerlukan hook `onUndo`
Membalik create `groupMember` juga harus menulis `groupMemberHistory` ("left"). Jika tidak, analitik churn akan rusak diam-diam. Ini adalah invarian workspace yang berlaku. Entitas seperti ini mendaftarkan callback `onUndo` di `AUDIT_REGISTRY`, yang mengembalikan `true` jika pembalikan sudah sepenuhnya ditangani dan melewati jalur generik. `groupMembers` adalah kasus acuannya. Entitas ini diidentifikasi berdasarkan id baris pada jalur eksplisit, tetapi berdasarkan `personId` pada endpoint massal, dan riwayatnya dilacak pada setiap penambahan dan penghapusan.
:::

## Antarmuka konsumen

Kedua antarmuka admin ini **masih dalam pengembangan**. Tujuannya sebagai berikut:

| Antarmuka | Repo | Tujuan |
|-----------|------|--------|
| **Halaman Audit Log** | B1Admin (ManageChurch → Audit Log) | Memfilter berdasarkan modul/kategori/pengguna/entitas dan menampilkan perbedaan lama→baru. Untuk pengeditan, perbedaan dihitung dengan membandingkan entri sebelumnya dari entitas tersebut. Untuk penghapusan, diambil dari `details.before`. Didukung oleh `GET /membership/auditlogs` dan dibatasi oleh `Permissions.server.admin`. |
| **Halaman Batch** | B1Admin (hub Settings yang sama) | Menampilkan daftar batch beserta status dan jumlahnya, **View Results** (baris audit batch lewat `GET /membership/batches/:id/results`), serta tombol **Undo** yang menampilkan laporan konflik yang dilewati atau kegagalan. |
| **Batch impor** | B1Transfer | Membuka batch, mengirim `X-Batch-Id` pada panggilan simpan biasa, lalu menutupnya di akhir. Impor menjadi dapat dibatalkan tanpa endpoint impor baru. `importKey` lama tetap ada sebagai penanda silsilah khusus create, dan sudah digantikan untuk keperluan pembatalan. |

## Jebakan yang tidak boleh dilanggar oleh perubahan di masa depan

- **Penyisipan audit harus tetap di-await.** `AuditLogHelper.log(...)` yang tidak di-await akan hilang karena pembekuan Lambda. Kumpulkan promise lalu `await Promise.allSettled` sebelum mengembalikan respons.
- **Kysely membuang `undefined` dari `.set()`/`.values()`.** Saat pemulihan, kolom yang dikosongkan akan tetap utuh dan tidak berubah. `BatchUndoHelper` mengubah setiap field yang tidak ada menjadi `null` eksplisit (`nullify`). Jangan pernah melewatinya demi penulisan langsung yang "lebih cepat".
- **Retensi harus tetap jauh di atas jendela pembatalan.** `AuditLogRepo.deleteOld()` berjalan pada timer harian (retensi default 365 hari), sedangkan jendela pembatalan adalah 30 hari. Jika retensi pernah turun mendekati jendela tersebut, log pembatalan akan terhapus dari bawah batch yang masih terbuka.
- **Baris yang dipotong tidak dapat dibatalkan.** Payload `{ truncated: true }` tidak memiliki citra sebelum/sesudah. Pembatalan melaporkannya sebagai `failed` dan tidak pernah menebak.
- **Urutannya adalah penulisan modul lalu audit.** Jangan pernah memindahkan penyisipan audit mendahului penulisan yang sebenarnya, dan pertahankan perilaku ketat dalam batch dan bersifat sekadar pencatatan dalam mode normal.

## Inventaris file

| Area | File |
|------|------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, snapshot + penulisan baris batch) |
| Mesin pembatalan | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Helper audit | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Model / repo | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migrasi | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| UI admin (dalam pengembangan) | Halaman B1Admin Audit Log + Batches; header batch impor B1Transfer |

## Halaman Terkait

- [Module Structure](../api/module-structure): cara controller non-membership mencapai repo membership melalui `RepoManager`
- [Giving](./giving): jalur penulisan donasi yang diaudit sebagai `sensitive` meskipun dilakukan secara anonim
- [Membership Endpoints](../api/endpoints/membership): REST surface yang membawa `X-Batch-Id` dan menyediakan `/auditlogs` dan `/batches`
