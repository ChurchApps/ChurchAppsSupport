---
title: "Checkr"
description: "Hubungkan pendaftaran relawan B1 Admin ke pemeriksaan latar belakang Checkr menggunakan Make.com, dengan peringatan status laporan opsional untuk koordinator pelayanan aman Anda."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) menyediakan layanan pemeriksaan latar belakang untuk staf dan relawan, kebutuhan yang hampir selalu ada di setiap gereja yang menjalankan program anak-anak atau remaja. B1 **tidak memiliki fitur pemeriksaan latar belakang bawaan**. Pemesanan pemeriksaan, pelacakan hasil, dan kepatuhan penyaringan semuanya dikelola di Checkr. Panduan di bawah hanya menghubungkan peristiwa B1 dengan Checkr. Checkr tidak memiliki aplikasi Zapier, tetapi [integrasi Checkr di Make.com](https://www.make.com/en/integrations/checkr) sudah terverifikasi dan menyediakan tindakan yang Anda butuhkan untuk memulai pemeriksaan dari peristiwa B1.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Checkr](https://checkr.com) dengan akses API dan setidaknya satu paket penyaringan yang sudah dikonfigurasi
- Akun [Make](https://www.make.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Bisa Anda Hubungkan

Aplikasi Checkr di Make menyediakan 1 pemicu dan 6 tindakan:

| Arah | Pemicu B1 / Make | Tindakan |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (disaring ke grup relawan) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Webhook Checkr (peristiwa undangan / laporan) | B1: Perbarui catatan orang tersebut (misalnya tag "Checkr cleared") |

Tindakan Checkr di Make: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA, dan Get an Invitation. Ditambah 4 modul pencarian.

## Pengaturan

### 1. Buat kunci API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: untuk webhook pemicu
- `people:read`: untuk mencari nama dan email orang tersebut saat memulai pemeriksaan
- (Opsional) `people:write` jika Anda ingin menulis status laporan kembali sebagai bidang kustom atau tag

### 2. Bangun skenario "mulai pemeriksaan saat relawan mendaftar" di Make

1. **Pemicu**: B1.church: Watch Events (`group.member.added`).
2. **Filter**: lanjutkan hanya jika `data.groupId` cocok dengan grup "Children's Volunteers" (atau yang setara).
3. **Tindakan**: B1.church: Find Person (berdasarkan `data.personId`) untuk mendapatkan email serta nama depan dan belakang.
4. **Tindakan**: Checkr: Create Candidate. Petakan nama depan, nama belakang, dan email dari langkah 3.
5. **Tindakan**: Checkr: Create Background Check Invitation. Petakan ID kandidat baru dari langkah 4 ke bidang *candidate_id*. Pilih paket penyaringan (misalnya `tasker_standard` atau paket lain yang tersedia di akun Anda).
6. (Opsional) **Tindakan**: Slack: beri tahu koordinator pelayanan aman Anda bahwa pemeriksaan telah dimulai.

Aktifkan skenario. Relawan baru di grup yang dituju akan menerima undangan Checkr otomatis melalui email. Mereka menyelesaikannya di ponsel atau laptop, lalu Checkr menjalankan penyaringan.

### 3. (Opsional) Terima laporan kembali

1. **Pemicu**: Checkr: Watch Events (webhook). Make mendaftarkan webhook Checkr saat skenario diaktifkan.
2. **Filter**: lanjutkan hanya jika `event_type = report.completed`.
3. **Tindakan**: Checkr: Get Report (gunakan ID laporan dari webhook).
4. **Tindakan**: B1.church: Find Person (berdasarkan email kandidat).
5. **Tindakan**: Slack / Email bersyarat: beri tahu koordinator dengan status `clear` / `consider` / `suspended`.

Catatan: saat ini B1 tidak memiliki bidang bawaan "status pemeriksaan latar belakang". Ada tiga opsi praktis: (a) kirim hasilnya ke saluran Slack privat untuk ditinjau, (b) tulis ke Google Sheet untuk audit, atau (c) tambahkan orang tersebut ke grup B1 "Cleared volunteers" saat statusnya `clear`.

## Resep Umum

### Periksa ulang relawan setiap 2 tahun

Gabungkan langkah di atas dengan pemicu jadwal Make:

- **Pemicu**: Make: Schedule (bulanan)
- **Tindakan**: B1.church: List Group Members untuk "Cleared volunteers"
- **Tindakan**: Filter oleh Make: tanggal lolos lebih dari 22 bulan yang lalu
- **Tindakan**: Checkr: Create Background Check Invitation (sama seperti alur awal)

### Blokir akses tahap 1 hingga pemeriksaan selesai

Jika gereja Anda menggunakan keanggotaan grup B1 untuk membatasi akses (misalnya hanya anggota grup "Cleared" yang muncul di jadwal pelayanan), tahan relawan baru di grup sementara hingga peristiwa Checkr `report.completed` mengubah statusnya.

## Batasan dan Catatan

- **Checkr hanya tersedia di AS** untuk sebagian besar paket penyaringan. Gereja di Australia, Inggris, dan Kanada memerlukan alternatif lain.
- **Harga** dihitung per pemeriksaan. Setiap Create Invitation di Make akan menggunakan satu pemeriksaan sungguhan. Uji coba terlebih dahulu di sandbox atau akun staging Checkr. Aplikasi Checkr di Make menggunakan kredensial yang Anda masukkan di koneksi, jadi mengganti kredensial akan mengganti antara sandbox dan produksi.
- **Akses API Checkr bergantung pada paket.** Akun Checkr yang lebih kecil mungkin hanya memiliki tingkat antarmuka pengguna; hubungi Checkr untuk mengaktifkan API.

## Pemecahan Masalah

- **Create Candidate gagal dengan `403`**: token API Checkr hanya memiliki akses baca atau tidak memiliki izin akun yang tepat. Terbitkan ulang dari dasbor Checkr dengan cakupan tulis.
- **Undangan tidak pernah sampai**: periksa email kandidat di langkah 3. B1 mungkin tidak memiliki email untuk orang tersebut. Tambahkan filter wajib-email sebelum langkah Checkr.
- **Pemicu webhook tidak aktif**: pendaftaran webhook Checkr kadang gagal tanpa pemberitahuan jika akun Make Anda tidak berada pada paket berbayar yang mendukung webhook keluar. Pastikan URL Make tercantum di halaman *Webhooks* pada dasbor Checkr.

## Lihat Juga

- [Make (ikhtisar)](../make.md): sisi B1 dari setiap skenario Make
- [Pesan Seluler](./mobile-message.md): untuk penyedia SMS tanpa aplikasi Zapier, dengan pola Webhooks/HTTP yang sama seperti integrasi Checkr di Make
- [Dokumentasi API Checkr](https://docs.checkr.com/)
