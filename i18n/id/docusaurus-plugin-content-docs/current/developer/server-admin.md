---
title: "Administrasi Server"
---

# Administrasi Server

<div class="article-intro">

Fitur administrasi server di ChurchApps hanya tersedia untuk pengguna dengan izin **Server.Admin**. Alat-alat ini digunakan untuk operasi platform, dukungan, dan pemecahan masalah di semua gereja dalam sistem.

</div>

:::warning Akses Terbatas
Fitur yang dijelaskan di halaman ini memerlukan izin **Server.Admin** dan tidak tersedia untuk administrator gereja biasa. Fitur ini hanya ditujukan untuk operator platform dan staf dukungan.
:::

## Mengakses Server Admin

Pengguna dengan izin Server.Admin dapat mengakses panel server admin dari B1 Admin:

1. Masuk ke [admin.b1.church](https://admin.b1.church)
2. Buka [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), perluas **Settings**, lalu klik **Server Admin**. (Anda juga dapat langsung membuka `admin.b1.church/admin`.)
3. Panel Server Admin mencantumkan bagian-bagiannya di sisi kiri dalam tiga kelompok: **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends), dan **System** (Translation Lookups, Server Health, Database Migrations)

## Mengatur Ulang Masuk Dua Langkah

Jika pengguna telah mengaktifkan [masuk dua langkah](../b1-admin/profile/managing-profile.md#two-factor-sign-in) dan kehilangan ponsel sekaligus kode cadangannya, admin server dapat menonaktifkannya:

1. Buka bagian **Users** di panel Server Admin dan cari pengguna tersebut.
2. Pengguna dengan masuk dua langkah akan menampilkan lencana **Two-factor on**. Klik **Reset 2FA** di sebelahnya.
3. Konfirmasi perintah yang muncul. Lakukan ini hanya setelah memastikan siapa yang sedang Anda ajak bicara.

Pengguna kemudian dapat masuk hanya dengan kata sandinya dan mengatur ulang masuk dua langkah dari profil mereka. Pengaturan ulang dicatat di log audit sebagai `mfa_reset`. Endpoint-nya adalah `POST /membership/users/mfa/reset/:userId` dan memerlukan Server.Admin.

## Peniruan Pengguna (Impersonation)

Fitur peniruan memungkinkan admin server untuk masuk sebagai pengguna lain demi keperluan dukungan dan pemecahan masalah. Fitur ini berguna saat menyelidiki masalah yang dilaporkan pengguna atau saat membantu gereja mengonfigurasi sistem mereka.

### Cara Meniru Pengguna

1. Buka bagian **Impersonate User** di panel Server Admin
2. Masukkan nama atau alamat email pengguna di kolom pencarian
3. Klik **Search** atau tekan Enter
4. Dari hasil pencarian, klik pengguna yang ingin Anda tiru
5. Konfirmasi peniruan di dialog yang muncul
6. Anda akan masuk sebagai pengguna tersebut dan dialihkan ke akun mereka

### Catatan Penting

- Peniruan membuat sesi baru dengan izin dan akses gereja milik pengguna target
- Sesi admin asli Anda berakhir ketika Anda meniru pengguna lain
- Semua tindakan yang dilakukan saat meniru pengguna dicatat dalam jejak audit
- Untuk kembali ke akun admin Anda, keluar lalu masuk kembali dengan kredensial Anda
- Gunakan peniruan hanya bila diperlukan untuk keperluan dukungan, dan selalu beri tahu pengguna bila Anda mengakses akun mereka untuk keperluan dukungan

### Endpoint API

Fitur peniruan didukung oleh endpoint `/users/:userId/impersonate` di Membership API. Lihat [Membership Endpoints](/docs/developer/api/endpoints/membership#users) untuk detail teknis.

### Pertimbangan Keamanan

- Peniruan memerlukan izin Server.Admin. Izin ini sebaiknya diberikan dengan hati-hati dan hanya kepada operator platform yang tepercaya
- Semua peristiwa peniruan dicatat beserta ID admin dan ID pengguna target
- Gereja tidak diberi tahu saat peniruan terjadi, jadi tetapkan kebijakan yang jelas tentang kapan dan bagaimana fitur ini digunakan
- Pertimbangkan untuk mencatat peristiwa peniruan dalam sistem tiket dukungan Anda untuk akuntabilitas

## Moderasi Commons

Commons adalah antrean moderasi bersama untuk konten yang dikirimkan pengguna di berbagai produk. Lagu WorshipCommons, pelajaran Lessons.church, template FreeShow, dan template website builder B1 semuanya masuk melalui antrean yang sama, alih-alih melalui alat peninjauan terpisah untuk setiap produk.

### Mengakses Commons

1. Buka tab **Commons** di panel Server Admin.
2. Anda akan melihat tiga sub-tab: **Queue**, **Reports**, dan **Assets**.

Peran **music editor** terbatas juga dapat melihat tab Queue, tetapi tidak dapat menyetujui pengajuan yang mengubah hak atau lisensi sebuah lagu.

### Queue

Queue mencantumkan setiap pengajuan yang menunggu di semua produk, dan dapat difilter berdasarkan produk serta jenis aset. Setiap baris menunjukkan apakah pengajuan tersebut merupakan aset baru, suntingan dari penulis aslinya, atau suntingan dari pihak ketiga, beserta riwayat persetujuan pengirim dan berapa lama pengajuan menunggu (ditandai setelah melewati 72 jam).

Klik **Review** untuk membuka panel dengan perbandingan perubahan per kolom, pratinjau file, dan pratinjau item hanya-baca yang tertanam. Gunakan pintasan keyboard **a** untuk menyetujui atau **r** untuk menolak, serta **j** dan **k** untuk berpindah ke pengajuan berikutnya atau sebelumnya tanpa meninggalkan panel. Saat menolak, Anda harus memilih alasan (misalnya kualitas, duplikat, lisensi, ccli, ai, atau di luar topik) dan menuliskan catatan.

### Reports

Tab Reports menangani laporan hak cipta serta kebijakan/kualitas yang diajukan terhadap aset yang sudah dipublikasikan. Laporan dibagi ke dalam antrean terpisah untuk Copyright dan Policy & Other, serta riwayat Resolved. Klaim sebuah laporan untuk mulai mengerjakannya, lalu selesaikan dengan resolusi (upheld, dismissed, atau duplicate) dan tindakan (none, unpublish, atau remove).

### Assets

Tab Assets adalah penelusur konten yang sudah dipublikasikan dan dapat dicari, dengan tindakan untuk **Feature** sebuah aset (menyorotnya di halaman beranda produk), **Unpublish**/**Republish**, atau **Remove** (dengan alasan hak cipta atau kebijakan).

Khusus untuk lagu, di sinilah sebuah lagu menjadi **Sunday-ready** dan memenuhi syarat untuk muncul di pencarian lagu B1 Admin sebuah gereja. Peninjau membuka aset dan menandai setiap kunci yang dipublikasikan sebagai **Listened** setelah mendengarkannya dan memastikan partitur, kord, dan slide semuanya tersedia. Sebuah lagu baru menjadi Sunday-ready setelah setiap kuncinya telah ditandai.

:::info
Moderasi Commons hanya untuk staf. Gereja individual tidak pernah melihat antrean ini. Satu-satunya tempat di mana B1 Admin gereja individual bersinggungan dengan data Commons adalah bagian "WorshipCommons — free" dalam [pencarian lagu](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), yang hanya menampilkan lagu-lagu yang sudah melewati proses peninjauan ini.
:::

Lihat halaman [arsitektur Content Commons](/docs/developer/architecture/commons) untuk model data dan siklus hidup pengajuan yang mendasarinya.

## Persetujuan Email Grup

Gereja tidak dapat mengirim email yang ditulis gereja (email grup, tindak lanjut formulir, email alur kerja, dan undangan akun) sebelum admin server menyetujuinya. Hal ini mencegah gereja yang terdaftar melalui bot menggunakan alamat pengirim bersama ChurchApps untuk mengirim spam.

1. Buka tab **Churches** di panel Server Admin.
2. Setiap gereja menampilkan chip **Group Email**: **Approved** (hijau) atau **Not approved** (berbingkai garis).
3. Klik chip tersebut dan konfirmasi untuk menyetujui gereja, atau untuk mencabut persetujuan.

Staf gereja meminta persetujuan dengan tombol **Request review** di dialog Send Email B1 Admin. Permintaan dikirim melalui email ke alamat dukungan dan mencantumkan nama gereja, ID, tanggal pendaftaran, lokasi, serta siapa yang mengajukan. Sebuah gereja dapat mengirim satu permintaan per minggu. Lihat [batasan email yang ditulis gereja](/docs/developer/architecture/notifications#church-authored-email-limits) untuk jatah harian dan jeda otomatis akibat email gagal kirim (bounce) serta keluhan.

## Migrasi Database

Alur kerja **Deploy Prod** menerapkan migrasi yang tertunda dengan sendirinya. Database hosting hanya menerima koneksi dari dalam jaringan Api, sehingga runner GitHub tidak dapat menjangkaunya. Sebagai gantinya, tepat setelah `serverless deploy`, alur kerja memanggil Lambda `migrate` milik Api (`api-Prod-migrate`), yang menjalankan semua migrasi tertunda dari setiap modul dengan runner yang sama seperti tab ini, dan menggagalkan deploy jika ada modul yang error atau ditolak. **Rollback Prod** hanya mengembalikan kode Lambda; migrasi yang sudah diterapkan tetap diterapkan. Tab **Database Migrations** digunakan untuk memeriksa status, menjalankan migrasi yang tidak dijalankan oleh deploy (misalnya di lingkungan demo, yang deploy-nya tidak melakukan migrasi), dan membuat baseline untuk modul yang tidak memiliki riwayat. (Instalasi Docker yang di-host sendiri tetap menjalankan migrasi secara otomatis saat container Api dimulai.)

Tab ini menampilkan lingkungan saat ini dan satu baris untuk setiap modul (membership, attendance, giving, dan seterusnya) beserta statusnya, jumlah migrasi yang sudah diterapkan dan yang tertunda, serta migrasi terakhir yang diterapkan.

- **Run Pending Migrations** menerapkan setiap migrasi tertunda, satu modul pada satu waktu, secara berurutan. Proses berhenti pada kegagalan pertama dan menampilkan apa saja yang sudah diterapkan untuk setiap modul.
- Modul yang diberi tanda **No history** memiliki database yang lebih lama daripada pelacakan migrasi. Modul ini tidak pernah dijalankan secara otomatis, karena hal itu akan memutar ulang migrasi data lama pada tabel yang aktif. Klik **Check Schema** pada modul tersebut. Api akan membandingkan tabel, kolom, dan indeks yang dibuat oleh setiap migrasi dengan database yang aktif, lalu memberi tanda setiap migrasi sebagai **Already applied**, **Missing**, **Partly applied**, atau **Data only**. Pemeriksaan ini tidak mengubah apa pun.
- Pada hasil pemeriksaan, **Record as Already Applied** mencatat migrasi yang terdeteksi ke dalam riwayat migrasi tanpa menjalankannya (setelah konfirmasi). Semua migrasi hingga migrasi **Already applied** terakhir akan dicatat, termasuk migrasi **Data only** dalam rentang tersebut. Migrasi **Missing** tetap tertunda dan kemudian dapat dijalankan secara normal dengan **Run Pending Migrations**.
- Migrasi **Partly applied** akan memblokir pencatatan. Jika migrasi tersebut aman untuk dijalankan ulang (baca dulu), centang **Re-run** agar tetap tertunda dan dijalankan kembali dari awal.

Panel Server Admin dan CLI (`yarn migrate:up`) menggunakan migrator Kysely yang sama serta tabel `kysely_migration`, sehingga keduanya selalu sepakat tentang migrasi mana yang sudah diterapkan. Endpoint pendukungnya adalah `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, dan `POST .../:module/baseline`, yang semuanya hanya untuk Server.Admin.

## Halaman Terkait

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Model izin dan autentikasi JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API manajemen pengguna dan gereja
- [Audit Log](/docs/b1-admin/reports/audit-log) — Melihat log aktivitas untuk sebuah gereja
- [Content Commons Architecture](/docs/developer/architecture/commons) — Model aset bersama dan siklus hidup moderasi
