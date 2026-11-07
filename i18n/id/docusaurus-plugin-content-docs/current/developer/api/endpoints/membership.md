---
title: "Endpoint Membership"
description: "Referensi endpoint Membership API ChurchApps: orang, rumah tangga, grup, peran, formulir, dan pengaturan, dengan aturan autentikasi dan izin."
---

# Endpoint Membership

<div class="article-intro">

Modul Membership mengelola orang, gereja, grup, rumah tangga, peran, izin, formulir, dan pengaturan. Ini adalah modul terbesar dan menyediakan lapisan identitas dan otorisasi inti untuk semua modul lainnya.

</div>

**Jalur dasar:** `/membership`

## Orang

Jalur dasar: `/membership/people`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | People.View atau Member | Daftar semua orang untuk gereja |
| GET | `/:id` | JWT | People.View atau catatan sendiri | Ambil orang berdasarkan ID (termasuk pengiriman formulir) |
| GET | `/ids?ids=` | JWT | People.View, Member, atau People.ViewNames | Ambil beberapa orang berdasarkan ID yang dipisahkan koma. Pemanggil People.ViewNames tanpa People.View mendapatkan model dasar, dengan orang yang memilih keluar tidak disertakan (kecuali pemanggil) |
| GET | `/basic?ids=` | JWT | — | Ambil info dasar (hanya nama) untuk beberapa orang |
| GET | `/names?ids=` | JWT | Izin gereja apa pun | `[{ id, name: { display, first, last }, photo }]`, diurutkan berdasarkan nama belakang lalu nama depan, untuk ID yang dipisahkan koma yang sudah dimiliki pemanggil, sehingga peran tanpa People.View (donasi, kehadiran) dapat memberi label pada orang. Tanpa pencarian, tanpa filter direktori |
| POST | `/names` | JWT | Izin gereja apa pun | Sama seperti `GET /names`. Body: `{ peopleIds }` (atau `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, atau People.ViewNames | Orang yang baru ditambahkan. Pemanggil People.ViewNames tanpa People.View (bahkan anggota dengan akses direktori) mendapatkan model dasar (`id`, `name.display`, `photo`, `membershipStatus`) dengan orang yang memilih keluar tidak disertakan |
| GET | `/guest-register/options?churchId=` | Publik | — | Daftar periksa pendaftaran tamu melalui QR: mengembalikan `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, masing-masing bernilai `"off"`, `"optional"`, atau `"required"` (diurai dari pengaturan publik `guestRegistrationFields`; nilai yang hilang atau salah format kembali ke email/telepon opsional, sisanya nonaktif). Memerlukan `enableQRGuestRegistration` kecuali permintaan membawa token situs/gereja yang cocok; dibatasi laju (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, atau People.ViewNames | Cari orang berdasarkan nama atau email (hingga 100, diurutkan berdasarkan nama belakang lalu nama depan). Pemanggil People.ViewNames tanpa People.View (bahkan anggota dengan akses direktori) mendapatkan pencarian nama yang mengembalikan model dasar; pencarian `email` mengembalikan `[]` |
| GET | `/search/phone?number=` | JWT | People.View atau Member | Cari berdasarkan nomor telepon |
| GET | `/search/group?groupId=` | JWT | People.View atau Member | Ambil orang dalam grup tertentu |
| GET | `/household/:householdId` | JWT | — | Ambil semua orang dalam sebuah rumah tangga |
| GET | `/attendance` | JWT | People.Edit | Muat peserta dengan filter (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Muat data linimasa untuk orang dan grup |
| GET | `/directory/:id` | JWT | — | Ambil orang untuk tampilan direktori (menghormati preferensi visibilitas) |
| GET | `/claim/:churchId` | JWT | — | Klaim catatan orang untuk pengguna saat ini di sebuah gereja |
| POST | `/` | JWT | People.Edit atau EditSelf | Buat atau perbarui orang (batch) |
| POST | `/search` | JWT | People.View, Member, atau People.ViewNames | Cari orang (varian POST). Body: `{ term }` atau `{ email }`; aturan hanya-nama yang sama seperti `GET /search` |
| POST | `/advancedSearch` | JWT | People.View atau Member | Pencarian multi-kondisi (usia, birthMonth, membershipStatus, dll.). Body berupa array kondisi; body kosong berarti tanpa kondisi, dan body non-array lainnya mengembalikan 400 |
| POST | `/loadOrCreate` | Publik | — | Temukan atau buat orang berdasarkan email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publik | — | Pendaftaran tamu melalui QR. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 anggota; email/phone/maritalStatus hanya berlaku untuk anggota pertama). Kolom yang dinonaktifkan gereja dihapus; nilai wajib yang hilang atau tidak valid mengembalikan 400. Pertama, menggunakan ulang orang yang sudah ada: anggota cocok jika tepat satu orang yang tidak dihapus memiliki nama depan yang sama (tidak peka huruf besar/kecil) dan email atau digit telepon yang sama (rumah, kantor, atau seluler); anggota tanpa email atau telepon cocok berdasarkan nama depan dalam rumah tangga yang cocok. Orang yang cocok tidak pernah diubah. Anggota yang tidak cocok bergabung dengan rumah tangga yang cocok, atau jika tidak, rumah tangga baru (dinamai sesuai nama belakang anggota pertama), sebagai `membershipStatus: "Visitor"` dengan `address` bersama. Menyimpan `comments` sebagai catatan pada anggota pertama, menambahkan semua orang ke grup privat `guestRegistrationGroupId` jika ditetapkan, dan — ketika `guestRegistrationRecordAttendance` bernilai `"true"` — mencatat kehadiran untuk waktu layanan terjadwal grup tersebut yang jendela check-in-nya sedang terbuka. Mengembalikan `{ householdId, people: [{ id, name }] }`, menggemakan nama yang dikirim alih-alih nama yang tersimpan. Aturan opt-in/token dan batas laju sama seperti panggilan options |
| POST | `/household/:householdId` | JWT | People.Edit | Perbarui penugasan anggota rumah tangga |
| POST | `/public/email` | Publik | — | Kirim email ke seseorang. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Muat email orang berdasarkan ID (server-ke-server, memerlukan jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Hapus seseorang |

### Contoh: Cari Orang

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Contoh: Buat Orang

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Pengguna

Jalur dasar: `/membership/users`

Lihat [Autentikasi & Izin](./authentication.md) untuk endpoint login, pendaftaran, dan pengelolaan kata sandi.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| POST | `/login` | Publik | — | Masuk (email/kata sandi, penyegaran JWT, atau authGuid) |
| POST | `/register` | Publik | — | Daftarkan pengguna baru |
| POST | `/forgot` | Publik | — | Kirim email atur ulang kata sandi |
| POST | `/setPasswordGuid` | Publik | — | Atur kata sandi menggunakan GUID autentikasi dari tautan email |
| POST | `/verifyCredentials` | Publik | — | Verifikasi email/kata sandi dan kembalikan gereja yang terkait |
| POST | `/loadOrCreate` | JWT | — | Temukan atau buat pengguna berdasarkan email/userId |
| POST | `/setDisplayName` | JWT | — | Perbarui nama depan dan belakang pengguna |
| POST | `/updateEmail` | JWT | — | Ubah alamat email pengguna |
| POST | `/updatePassword` | JWT | — | Ubah kata sandi pengguna (minimal 6 karakter) |
| POST | `/updateOptedOut` | JWT | — | Atur status memilih keluar seseorang |
| POST | `/sendInviteEmail` | JWT | People.Edit | Kirim email undangan kepada seseorang di gereja ini (`email`, `personName`, `contextName`). Tombol bertuliskan **Daftar** untuk seseorang tanpa akun dan **Masuk** untuk pengguna yang sudah ada. Pengguna yang belum pernah masuk justru mendapatkan tautan **Atur Kata Sandi Anda** yang kedaluwarsa dalam 7 hari. Ini adalah templat tetap, sehingga tidak dihitung terhadap batas email harian gereja |
| GET | `/search?term=` | JWT | Server.Admin | Cari semua pengguna berdasarkan nama/email |
| DELETE | `/` | JWT | — | Hapus akun pengguna saat ini |

## Gereja

Jalur dasar: `/membership/churches`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Muat semua gereja untuk pengguna saat ini |
| GET | `/:id` | JWT | — | Ambil gereja berdasarkan ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Ambil pengguna domain admin untuk sebuah gereja |
| GET | `/:id/impersonate` | JWT | Server.Admin | Menyamar sebagai gereja (hanya admin server) |
| GET | `/all?term=` | JWT | Server.Admin | Cari semua gereja (admin) |
| GET | `/search/?name=` | Publik | — | Cari gereja berdasarkan nama |
| GET | `/lookup/?subDomain=&id=` | Publik | — | Cari gereja berdasarkan subdomain atau ID |
| POST | `/` | JWT | Settings.Edit | Perbarui detail gereja |
| POST | `/add` | JWT | — | Daftarkan gereja baru. Kolom wajib: name, address1, city, state, zip, country |
| POST | `/search` | Publik | — | Cari gereja berdasarkan nama (varian POST) |
| POST | `/select` | JWT | — | Pilih/beralih ke gereja. Body: `{ churchId }` atau `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Arsipkan atau batalkan pengarsipan gereja |
| POST | `/byIds` | Publik | — | Muat beberapa gereja berdasarkan ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Hapus gereja yang ditinggalkan selama 7+ hari |

## Grup

Jalur dasar: `/membership/groups`

Memperluas CRUD standar (GET `/`, GET `/:id` dari kelas dasar).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Daftar semua grup |
| GET | `/:id` | JWT | — | Ambil grup berdasarkan ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Cari grup berdasarkan filter layanan |
| GET | `/my` | JWT | — | Ambil grup untuk pengguna saat ini |
| GET | `/my/:tag` | JWT | — | Ambil grup pengguna saat ini yang difilter berdasarkan tag |
| GET | `/tag/:tag` | JWT | — | Ambil semua grup dengan tag tertentu |
| GET | `/public/:churchId/:id` | Publik | — | Ambil grup publik berdasarkan gereja dan ID |
| GET | `/public/:churchId/tag/:tag` | Publik | — | Ambil grup publik berdasarkan tag |
| GET | `/public/:churchId/label?label=` | Publik | — | Ambil grup publik berdasarkan label |
| GET | `/public/:churchId/slug/:slug` | Publik | — | Ambil grup publik berdasarkan slug |
| POST | `/` | JWT | Groups.Edit | Buat atau perbarui grup (menghasilkan slug secara otomatis) |
| DELETE | `/:id` | JWT | Groups.Edit | Hapus grup (juga menghapus tim anak untuk grup pelayanan) |

## Anggota Grup

Jalur dasar: `/membership/groupmembers`

Memperluas CRUD standar (GET `/:id`, DELETE `/:id` dari kelas dasar).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Ambil anggota grup berdasarkan ID |
| GET | `/` | JWT | GroupMembers.View* | Daftar anggota grup. Filter dengan `?groupId=`, `?groupIds=`, atau `?personId=`. *Juga diizinkan jika pengguna berada dalam grup atau meminta personId miliknya sendiri, dan untuk `?groupId=` grup non-rahasia mana pun ketika pengguna memiliki Attendance.View atau Attendance.Edit (anggota di bawah 13 tahun disertakan bagi mereka) |
| GET | `/my` | JWT | — | Ambil keanggotaan grup pengguna saat ini |
| GET | `/basic/:groupId` | JWT | — | Ambil daftar anggota dasar untuk sebuah grup |
| GET | `/public/leaders/:churchId/:groupId` | Publik | — | Ambil pemimpin grup (publik) |
| GET | `/public/:churchId/:groupId` | Publik | — | Ambil daftar anggota publik grup (kolom minimal: `personId`, `displayName`, `leader`, foto). Hanya ketika grup memilih melalui `publicRoster`; mendukung elemen `staffGrid` pada pembuat situs web |
| POST | `/` | JWT | GroupMembers.Edit | Tambah atau perbarui anggota grup |
| DELETE | `/:id` | JWT | GroupMembers.View | Hapus anggota grup |

## Rumah Tangga

Jalur dasar: `/membership/households`

Controller CRUD standar.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Daftar semua rumah tangga |
| GET | `/:id` | JWT | — | Ambil rumah tangga berdasarkan ID |
| POST | `/` | JWT | People.Edit | Buat atau perbarui rumah tangga |
| DELETE | `/:id` | JWT | People.Edit | Hapus rumah tangga |

## Peran

Jalur dasar: `/membership/roles`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Roles.View | Ambil peran berdasarkan ID |
| GET | `/church/:churchId` | JWT | Roles.View | Ambil semua peran untuk sebuah gereja. Setiap peran menyertakan `memberCount`, jumlah pengguna berbeda di dalamnya |
| POST | `/` | JWT | Roles.Edit | Buat atau perbarui peran |
| DELETE | `/:id` | JWT | Roles.Edit | Hapus peran (juga menghapus izin dan anggotanya) |

## Anggota Peran

Jalur dasar: `/membership/rolemembers`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ambil anggota untuk sebuah peran. Tambahkan `?include=users` untuk menyertakan detail pengguna |
| POST | `/` | JWT | Roles.Edit | Tambahkan anggota ke peran (membuat pengguna jika email belum ada) |
| DELETE | `/:id` | JWT | Roles.View | Hapus anggota peran |
| DELETE | `/self/:churchId/:userId` | JWT | — | Keluarkan diri sendiri dari sebuah gereja |

## Izin Peran

Jalur dasar: `/membership/rolepermissions`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Ambil izin untuk sebuah peran (gunakan `null` sebagai ID untuk peran "Everyone") |
| POST | `/` | JWT | Roles.Edit | Buat atau perbarui izin peran |
| DELETE | `/:id` | JWT | Roles.Edit | Hapus izin peran |

## Izin

Jalur dasar: `/membership/permissions`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Ambil daftar lengkap izin yang tersedia |

Setiap entri memiliki `apiName`, `section` (jenis konten), `action`, serta label `displaySection` / `displayAction` yang ditampilkan oleh editor peran B1Admin. Penambahan terbaru: `MembershipApi` / `People` / `View Names` (**Hanya Lihat Nama Orang**, di bawah People and Groups) dan `GivingApi` / `Donations` / `Enter` (**Masukkan Donasi**, di bawah Donations; lihat [Batch Donasi](./giving.md#donation-batches)).

## Formulir

Jalur dasar: `/membership/forms`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin atau Forms.Edit | Daftar semua formulir (admin melihat semua; editor melihat yang ditugaskan + formulir non-anggota) |
| GET | `/:id` | JWT | Akses formulir | Ambil formulir berdasarkan ID |
| GET | `/archived` | JWT | Forms.Admin atau Forms.Edit | Daftar formulir yang diarsipkan |
| GET | `/group/:groupId` | JWT | Anggota grup, pemimpin grup, atau Forms.Admin | Formulir mandiri yang ditautkan ke grup (`forms.groupId`), tidak termasuk yang diarsipkan, diurutkan berdasarkan nama. Mengembalikan `id`, `name`, `description`, dan `open` (dalam jendela ketersediaan). Anggota hanya mendapatkan formulir yang terbuka; pemimpin dan admin formulir juga mendapatkan yang tertutup. Mendukung formulir tertaut pada halaman grup |
| GET | `/standalone/:id?churchId=` | JWT | — | Ambil formulir mandiri (formulir terbatas memerlukan autentikasi) |
| POST | `/` | JWT | Forms.Admin atau Forms.Edit | Buat atau perbarui formulir. Formulir mandiri menerima `photoUrl` opsional (foto header yang ditampilkan di atas formulir) dan `groupId` (grup yang ditautkan) |
| DELETE | `/:id` | JWT | Akses formulir | Hapus formulir |

## Pengiriman Formulir

Jalur dasar: `/membership/formsubmissions`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin atau Forms.Edit | Daftar pengiriman. Filter dengan `?personId=` atau `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Cakupan diri sendiri: hingga 50 pengiriman formulir mandiri (bukan formulir orang) yang dikirim oleh anggota yang sedang masuk atau yang ditautkan ke orangnya (`contentType` `person`, `contentId` = ID orang mereka -- misalnya, setelah perubahan orang oleh admin), dari yang terbaru, masing-masing dengan `form.name`. `include` melampirkan pertanyaan setiap formulir dan jawaban pengiriman. Mengembalikan `401` jika pengguna tidak ditautkan ke seseorang. Mendukung bagian **Formulir Saya** pada halaman B1 Me |
| GET | `/group/:groupId` | JWT | Pemimpin grup | Jawaban untuk pemimpin grup: satu entri per formulir tertaut dan per acara grup dengan formulir pendaftaran, masing-masing dengan `form`, `event` (`id`, `title`, `start`; hanya entri acara), `questions`, dan `submissions` (dengan `answers` dan `personName`, `null` jika anonim) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, atau akses lihat | Ambil pengiriman berdasarkan ID. Tambahkan `?include=form,questions,answers`. Pemimpin grup tertaut formulir, dan pemimpin grup tempat pendaftaran acara berada, juga dapat membacanya |
| GET | `/formId/:formId` | JWT | Akses formulir (lihat) | Ambil semua pengiriman untuk sebuah formulir (menyertakan form, questions, answers). Pemimpin grup tertaut formulir memiliki akses lihat |
| POST | `/` | JWT | — | Kirim jawaban formulir (menangani formulir terbatas/tidak terbatas, mengirim notifikasi email). Ketika formulir memiliki `autoCreatePerson`, menemukan atau membuat orang Tamu berdasarkan email dan menautkan pengiriman; ketika formulir juga memiliki `groupId`, menambahkan orang tersebut ke grup; ketika `followUpSubject`/`followUpBody` ditetapkan, mengirim email tindak lanjut berbasis templat kepada pengirim. Kecuali pemanggil dapat mengelola formulir, `submittedBy` selalu diatur ke orang anggota yang sedang masuk (atau dikosongkan untuk pengiriman anonim) |
| DELETE | `/:id` | JWT | Forms.Admin atau Forms.Edit | Hapus pengiriman dan jawabannya |

## Pertanyaan

Jalur dasar: `/membership/questions`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Akses formulir | Daftar pertanyaan untuk sebuah formulir. Memerlukan `?formId=` |
| GET | `/:id` | JWT | Akses formulir | Ambil pertanyaan berdasarkan ID |
| GET | `/unrestricted?formId=` | JWT | — | Ambil pertanyaan untuk formulir tidak terbatas |
| GET | `/sort/:id/up` | JWT | — | Pindahkan pertanyaan ke atas dalam urutan |
| GET | `/sort/:id/down` | JWT | — | Pindahkan pertanyaan ke bawah dalam urutan |
| POST | `/` | JWT | Akses formulir | Buat atau perbarui pertanyaan (menetapkan urutan secara otomatis) |
| DELETE | `/:id?formId=` | JWT | Akses formulir | Hapus pertanyaan |

## Jawaban

Jalur dasar: `/membership/answers`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Forms.Admin atau Forms.Edit | Daftar jawaban. Filter dengan `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin atau Forms.Edit | Buat atau perbarui jawaban |

## Izin Anggota

Jalur dasar: `/membership/memberpermissions`

Mengontrol akses per anggota ke formulir tertentu.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | Akses formulir | Ambil izin anggota berdasarkan ID |
| GET | `/member/:id` | JWT | Akses formulir | Ambil semua izin formulir untuk seorang anggota |
| GET | `/form/:id` | JWT | Akses formulir | Ambil semua izin anggota untuk sebuah formulir |
| GET | `/form/:id/my` | JWT | Akses formulir | Ambil izin pengguna saat ini untuk sebuah formulir |
| POST | `/` | JWT | Akses formulir | Buat atau perbarui izin anggota |
| DELETE | `/:id?formId=` | JWT | Akses formulir | Hapus izin anggota |
| DELETE | `/member/:id?formId=` | JWT | Akses formulir | Hapus semua izin anggota pada sebuah formulir |

## Pengaturan

Jalur dasar: `/membership/settings`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | Settings.Edit | Ambil semua pengaturan untuk gereja |
| GET | `/public/:churchId` | Publik | — | Ambil pengaturan publik untuk sebuah gereja |
| POST | `/` | JWT | Settings.Edit | Simpan pengaturan (mendukung unggahan gambar base64) |

## Domain

Jalur dasar: `/membership/domains`

Memperluas CRUD standar (GET `/:id`, GET `/`, DELETE `/:id` dari kelas dasar).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | JWT | — | Daftar semua domain |
| GET | `/:id` | JWT | — | Ambil domain berdasarkan ID |
| GET | `/lookup/:domainName` | JWT | — | Cari domain berdasarkan nama |
| GET | `/public/lookup/:domainName` | Publik | — | Pencarian domain publik berdasarkan nama |
| GET | `/health/check` | Publik | — | Jalankan pemeriksaan kesehatan pada domain yang belum diperiksa |
| POST | `/` | JWT | Settings.Edit | Buat atau perbarui domain (memicu pembaruan Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Hapus domain |

## Userchurch

Jalur dasar: `/membership/userchurch`

Mengelola hubungan antara pengguna dan gereja.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/userid/:userId` | JWT | — | Ambil catatan pengguna-gereja berdasarkan ID pengguna |
| GET | `/personid/:personId` | JWT | — | Ambil email untuk pengguna yang tertaut dengan seseorang |
| GET | `/user/:userId` | JWT | Server.Admin | Muat semua gereja untuk seorang pengguna |
| POST | `/` | JWT | — | Buat asosiasi pengguna-gereja |
| PATCH | `/:userId` | JWT | — | Perbarui waktu akses terakhir dan catat akses |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Hapus catatan pengguna-gereja |

## Preferensi Visibilitas

Jalur dasar: `/membership/visibilityPreferences`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Ambil preferensi visibilitas pengguna saat ini |
| POST | `/` | JWT | — | Simpan preferensi visibilitas (visibilitas alamat, telepon, email) |

## Query

Jalur dasar: `/membership/query`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| POST | `/members` | JWT | — | Pencarian anggota dalam bahasa alami menggunakan AI. Body: `{ text, subDomain, siteUrl }` |

## Kesalahan Klien

Jalur dasar: `/membership/clientErrors`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| POST | `/` | JWT | — | Catat kesalahan sisi klien |

## Halaman Terkait

- [Autentikasi & Izin](./authentication.md) — Alur login, JWT, OAuth, model izin
- [Endpoint Kehadiran](./attendance.md) — Pelacakan layanan dan kunjungan
- [Struktur Modul](../module-structure.md) — Pola organisasi kode
