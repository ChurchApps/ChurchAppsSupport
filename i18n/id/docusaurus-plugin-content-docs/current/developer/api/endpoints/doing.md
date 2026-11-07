---
title: "Endpoint Doing"
description: "Referensi endpoint Doing API di balik rencana pelayanan, penugasan sukarelawan, tugas, dan otomatisasi di B1 Admin, dengan jalur, autentikasi, dan izin."
---

# Endpoint Doing

<div class="article-intro">

Modul Doing mengelola perencanaan layanan, penjadwalan relawan, manajemen tugas, dan otomatisasi. Modul ini menyediakan alat untuk membuat rencana layanan dengan waktu dan posisi, menugaskan relawan, mengelola tanggal pemblokiran, menyusun item urutan layanan, terhubung ke penyedia konten eksternal, serta mengatur alur kerja otomatis dengan kondisi dan tindakan.

</div>

**Jalur dasar:** `/doing`

## Rencana

Jalur dasar: `/doing/plans`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Daftar semua rencana untuk gereja |
| GET | `/:id` | JWT | — | Dapatkan rencana berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa rencana berdasarkan ID yang dipisahkan koma |
| GET | `/types/:planTypeId` | JWT | — | Dapatkan rencana berdasarkan jenis rencana |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + edit pelayanan | Pratinjau ringkasan pelayanan yang akan dikirimi **Pesan Teks Relawan**: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` untuk relawan yang ditugaskan dalam rentang tersebut (satu per orang, melewati yang berhenti berlangganan dan yang tidak punya nomor, nomor yang sama hanya dihitung sekali, dibatasi 200) |
| GET | `/presenter` | JWT | — | Dapatkan rencana untuk 7 hari ke depan (tampilan presenter) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Edit pelayanan | Alur kerja konfirmasi penugasan pelayanan yang aktif (`workflowType = "assignmentConfirmation"`) yang dapat dipilih rencana: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Publik | — | Dapatkan rencana saat ini untuk jenis rencana |
| GET | `/public/signup/:churchId` | Publik | — | Rencana yang terbuka untuk pendaftaran mandiri, paling awal lebih dulu, masing-masing dengan posisi pendaftaran mandirinya (diurutkan berdasarkan `categoryName`, lalu `name`, plus `filledCount` dari penugasan Accepted/Unconfirmed) dan waktunya. Tidak ada nama relawan. Jika pengaturan gereja `volunteerSignupNextOnly` bernilai `"true"`, hanya rencana pertama dari setiap jenis rencana yang dikembalikan. Setiap `plan` menyertakan `signupDeadline` yang dihitung (instan ISO, atau `null`): `signupDeadlineHours` sebelum waktu `service` paling awal pada rencana (entri waktu apa pun jika tidak ada waktu layanan; 9:00 di zona waktu gereja pada `serviceDate` jika rencana tidak memiliki waktu) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` untuk posisi pendaftaran mandiri pada rencana (nama tampilan dari penerima tugas Accepted/Unconfirmed). Mengembalikan `[]` kecuali pengaturan `showVolunteerNames` pada rencana aktif |
| POST | `/` | JWT | — | Buat atau perbarui rencana (menerima satu objek atau array). Atur `confirmationWorkflowId` untuk mengikutsertakan rencana dalam alur kerja konfirmasi pelayanan, atau `null` untuk tidak mengikutsertakannya pada permintaan berikutnya. Kirim `signupDeadlineHours: null` untuk menghapus batas waktu; jika kolom ini dihilangkan, nilai yang tersimpan tetap dipertahankan |
| POST | `/copy/:id` | JWT | Edit pelayanan | Salin rencana beserta posisi, waktu, penugasan, dan item urutan layanan. Badan permintaan mencakup `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all"), dan `copyServiceOrder` (boolean). Tanpa `targetPlanId`, rencana baru dibuat, dan `notes`, `signupDeadlineHours`, `showVolunteerNames`, serta `autoReplaceOnDecline` diwariskan dari rencana sumber kecuali diisi dalam badan permintaan. Dengan `targetPlanId`, salinan akan mengisi rencana yang sudah ada tersebut (pemanggil harus memiliki izin untuk mengeditnya). Opsi **Ulangi setiap minggu** di B1Admin memanggil endpoint ini sekali per minggu, dan setiap kali menyalin dari rencana yang dibuat seminggu sebelumnya |
| POST | `/textRange` | JWT | `texting.send` + edit pelayanan | Kirim pesan teks ke setiap relawan yang ditugaskan dalam rentang tanggal melalui penyedia pesan teks gereja. Badan permintaan: `{ startDate, endDate, ministryId, planTypeId?, message }` (pesan hingga 1600 karakter; kolom gabungan diisi sesuai penerima). Mengembalikan jumlah pratinjau beserta `recipientCount`, `successCount`, `failCount`, dan `error` (`no_provider` atau `insufficient_credits`) jika pengiriman berhenti lebih awal |
| POST | `/:id/issueRequests` | JWT | Edit rencana | Terbitkan penugasan Unconfirmed baru yang belum diberi tahu pada rencana melalui alur kerja konfirmasinya: menandai setiap penugasan sebagai sudah diberi tahu dan memulai satu kartu alur kerja untuk setiap penugasan. Badan kosong; mengembalikan `{ issued }`. Gagal kecuali rencana sudah diterbitkan (bukan `prepared`), memiliki `confirmationWorkflowId` aktif dengan minimal satu langkah, dan batas waktu responsnya belum terlewat |
| POST | `/autofill/:id` | JWT | — | Isi otomatis penugasan relawan untuk rencana. Badan permintaan: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Hapus rencana beserta semua waktu, penugasan, posisi, dan item rencana yang terkait |

### Contoh: Menyalin Rencana

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

## Jenis Rencana

Jalur dasar: `/doing/planTypes`

Memperluas kelas dasar CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — tanpa pemeriksaan izin).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Daftar semua jenis rencana |
| GET | `/:id` | JWT | — | Dapatkan jenis rencana berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa jenis rencana berdasarkan ID yang dipisahkan koma |
| GET | `/ministryId/:ministryId` | JWT | — | Dapatkan jenis rencana untuk suatu pelayanan |
| POST | `/` | JWT | — | Buat atau perbarui jenis rencana |
| DELETE | `/:id` | JWT | — | Hapus jenis rencana |

## Item Rencana

Jalur dasar: `/doing/planItems`

Mengelola item urutan layanan (judul, bagian, lagu, dan sebagainya) yang disusun dalam struktur pohon induk-anak.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan item rencana berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa item rencana berdasarkan ID yang dipisahkan koma |
| GET | `/plan/:planId` | JWT | — | Dapatkan semua item rencana untuk satu rencana (mengembalikan struktur pohon) |
| GET | `/presenter/:churchId/:planId` | Publik | — | Dapatkan item rencana untuk tampilan presenter (mengembalikan struktur pohon) |
| POST | `/` | JWT | — | Buat atau perbarui item rencana |
| POST | `/sort` | JWT | — | Perbarui urutan item rencana (mengurutkan ulang saudara setingkat) |
| DELETE | `/:id` | JWT | — | Hapus item rencana |

## Umpan Rencana

Jalur dasar: `/doing/planFeed`

Menyediakan umpan item rencana untuk presenter. Jika belum ada item rencana, umpan akan terisi otomatis dari umpan venue Lessons.church menggunakan `contentId` rencana.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/presenter/:churchId/:planId` | Publik | — | Dapatkan umpan rencana untuk presenter (terisi otomatis dari umpan venue jika kosong) |

## Posisi

Jalur dasar: `/doing/positions`

Memperluas kelas dasar CRUD (GET `/:id`, POST `/`, DELETE `/:id` — tanpa pemeriksaan izin).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan posisi berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa posisi berdasarkan ID yang dipisahkan koma |
| GET | `/plan/ids?planIds=` | JWT | — | Dapatkan posisi untuk beberapa rencana berdasarkan ID rencana yang dipisahkan koma |
| GET | `/plan/:planId` | JWT | — | Dapatkan semua posisi untuk satu rencana |
| POST | `/` | JWT | — | Buat atau perbarui posisi |
| DELETE | `/:id` | JWT | — | Hapus posisi |

## Waktu

Jalur dasar: `/doing/times`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/all` | JWT | — | Daftar semua waktu untuk gereja |
| GET | `/:id` | JWT | — | Dapatkan waktu berdasarkan ID |
| GET | `/plans?planIds=` | JWT | — | Dapatkan waktu untuk beberapa rencana berdasarkan ID rencana yang dipisahkan koma |
| GET | `/plan/:planId` | JWT | — | Dapatkan semua waktu untuk satu rencana |
| POST | `/` | JWT | — | Buat atau perbarui waktu |
| DELETE | `/:id` | JWT | — | Hapus waktu |

## Penugasan

Jalur dasar: `/doing/assignments`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/my` | JWT | — | Dapatkan penugasan untuk pengguna saat ini |
| GET | `/my/upcoming` | JWT | — | Hingga 20 penugasan pengguna saat ini pada rencana yang bertanggal mulai hari ini (rencana yang masih sementara, atau `prepared`, dilewati), paling awal lebih dulu: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Menjadi sumber pratinjau pelayanan di halaman beranda anggota |
| GET | `/:id` | JWT | — | Dapatkan penugasan berdasarkan ID |
| GET | `/plan/ids?planIds=` | JWT | — | Dapatkan penugasan untuk beberapa rencana berdasarkan ID rencana yang dipisahkan koma |
| GET | `/plan/:planId` | JWT | — | Dapatkan semua penugasan untuk satu rencana |
| POST | `/` | JWT | — | Buat atau perbarui penugasan (status default-nya "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Terima penugasan (harus orang yang ditugaskan) |
| POST | `/decline/:id` | JWT | — | Tolak penugasan (harus orang yang ditugaskan) |
| POST | `/signup` | JWT | — | Daftar mandiri untuk suatu posisi. Badan permintaan: `{ positionId }`. Posisi harus mengizinkan pendaftaran mandiri dan masih memiliki kuota; penugasan Accepted akan dibuat. Ditolak dengan "Signup deadline has passed" setelah batas waktu pendaftaran rencana (dihitung mundur dari waktu layanan pertama, seperti di atas) terlewat |
| DELETE | `/signup/:id` | JWT | — | Hapus pendaftaran mandiri Anda sendiri. Ditolak dengan "Removal deadline has passed" setelah batas waktu pendaftaran rencana terlewat |
| DELETE | `/:id` | JWT | — | Hapus penugasan |

### Contoh: Menerima Penugasan

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

## Tanggal Pemblokiran

Jalur dasar: `/doing/blockoutDates`

Memperluas kelas dasar CRUD (GET `/:id`, DELETE `/:id` — tanpa pemeriksaan izin).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan tanggal pemblokiran berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa tanggal pemblokiran berdasarkan ID yang dipisahkan koma |
| GET | `/my` | JWT | — | Dapatkan tanggal pemblokiran untuk pengguna saat ini |
| GET | `/upcoming` | JWT | — | Dapatkan semua tanggal pemblokiran mendatang untuk gereja |
| POST | `/` | JWT | — | Buat atau perbarui tanggal pemblokiran (personId default-nya pengguna saat ini jika tidak diisi) |
| DELETE | `/:id` | JWT | — | Hapus tanggal pemblokiran |

## Tugas

Jalur dasar: `/doing/tasks`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Dapatkan tugas terbuka untuk pengguna saat ini |
| GET | `/:id` | JWT | — | Dapatkan tugas berdasarkan ID |
| GET | `/:id/contact` | JWT | Dapat melihat kartu | Info kontak untuk orang yang menjadi subjek kartu alur kerja: `{ personId, displayName, mobilePhone, email }`. Memungkinkan penelepon yang ditugaskan tanpa akses People untuk menghubungi orang tersebut |
| GET | `/closed` | JWT | — | Dapatkan tugas yang sudah ditutup untuk pengguna saat ini |
| GET | `/timeline?taskIds=` | JWT | — | Dapatkan data linimasa untuk tugas berdasarkan ID tugas yang dipisahkan koma |
| GET | `/directoryUpdate/:personId` | JWT | — | Dapatkan tugas pembaruan direktori untuk seseorang |
| POST | `/` | JWT | — | Buat atau perbarui tugas. Tambahkan `?type=directoryUpdate` untuk menangani tugas pembaruan direktori (foto diunggah otomatis) |
| POST | `/:id/conversation` | JWT | `tasks.edit` atau penerima kartu | Lampirkan percakapan catatan ke kartu. Badan permintaan: `{ conversationId }`. Percakapan pertama yang dilampirkan yang dipakai; panggilan berikutnya mengembalikan kartu tanpa perubahan |
| POST | `/loadForGroups` | JWT | — | Muat tugas untuk grup tertentu. Badan permintaan: `{ groupIds: [], status: "Open" }` |

## Otomatisasi

Jalur dasar: `/doing/automations`

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Daftar semua otomatisasi untuk gereja |
| GET | `/:id` | JWT | — | Dapatkan otomatisasi berdasarkan ID |
| GET | `/check` | Publik | — | Picu pemeriksaan semua otomatisasi |
| POST | `/` | JWT | — | Buat atau perbarui otomatisasi |
| DELETE | `/:id` | JWT | — | Hapus otomatisasi |

## Tindakan

Jalur dasar: `/doing/actions`

Tindakan menentukan apa yang terjadi ketika otomatisasi dipicu.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan tindakan berdasarkan ID |
| GET | `/automation/:id` | JWT | — | Dapatkan semua tindakan untuk suatu otomatisasi |
| POST | `/` | JWT | — | Buat atau perbarui tindakan |
| DELETE | `/:id` | JWT | — | Hapus tindakan |

## Kondisi

Jalur dasar: `/doing/conditions`

Kondisi menentukan kriteria yang memicu otomatisasi.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan kondisi berdasarkan ID |
| GET | `/automation/:id` | JWT | — | Dapatkan semua kondisi untuk suatu otomatisasi |
| POST | `/` | JWT | — | Buat atau perbarui kondisi |
| DELETE | `/:id` | JWT | — | Hapus kondisi |

## Konjungsi

Jalur dasar: `/doing/conjunctions`

Konjungsi menghubungkan beberapa kondisi dalam suatu otomatisasi (logika AND/OR).

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/:id` | JWT | — | Dapatkan konjungsi berdasarkan ID |
| GET | `/automation/:id` | JWT | — | Dapatkan semua konjungsi untuk suatu otomatisasi |
| POST | `/` | JWT | — | Buat atau perbarui konjungsi |
| DELETE | `/:id` | JWT | — | Hapus konjungsi |

## Autentikasi Penyedia Konten

Jalur dasar: `/doing/contentProviderAuths`

Memperluas kelas dasar CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — tanpa pemeriksaan izin).

Mengelola catatan autentikasi OAuth untuk penyedia konten eksternal (misalnya, integrasi perangkat lunak presentasi).

`accessToken` dan `refreshToken` dienkripsi saat disimpan dengan `EncryptionHelper` dan didekripsi saat dibaca, sehingga API tetap mengembalikan token dalam bentuk biasa. Baris yang disimpan sebelum enkripsi diterapkan berisi teks biasa (yang tidak pernah mengandung `|`); baris tersebut dikembalikan apa adanya dan akan dienkripsi saat disimpan kembali berikutnya.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| GET | `/` | JWT | — | Daftar semua autentikasi penyedia konten |
| GET | `/:id` | JWT | — | Dapatkan autentikasi penyedia konten berdasarkan ID |
| GET | `/ids?ids=` | JWT | — | Dapatkan beberapa autentikasi penyedia konten berdasarkan ID yang dipisahkan koma |
| GET | `/ministry/:ministryId` | JWT | — | Dapatkan semua autentikasi penyedia konten untuk suatu pelayanan |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Dapatkan catatan autentikasi untuk pelayanan dan penyedia tertentu |
| POST | `/` | JWT | — | Buat atau perbarui autentikasi penyedia konten |
| DELETE | `/:id` | JWT | — | Hapus autentikasi penyedia konten |

## Proksi Penyedia

Jalur dasar: `/doing/providerProxy`

Meneruskan permintaan ke penyedia konten eksternal (misalnya, ProPresenter, EasyWorship). Menangani pembaruan token secara otomatis ketika token kedaluwarsa.

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|------|
| POST | `/browse` | JWT | — | Telusuri file penyedia konten. Badan permintaan: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Dapatkan presentasi dari penyedia konten. Badan permintaan: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Dapatkan daftar putar dari penyedia konten. Badan permintaan: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Dapatkan instruksi untuk item konten. Badan permintaan: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Dapatkan instruksi lengkap untuk item konten. Badan permintaan: `{ ministryId, providerId, path }` |

## Halaman Terkait

- [Endpoint Keanggotaan](./membership.md) — Orang, grup, peran, dan izin
- [Endpoint Kehadiran](./attendance.md) — Pelacakan layanan dan kunjungan
- [Struktur Modul](../module-structure.md) — Pola organisasi kode
