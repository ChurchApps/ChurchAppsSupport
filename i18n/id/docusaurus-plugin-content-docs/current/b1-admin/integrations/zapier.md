---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Aplikasi resmi B1.church di Zapier memungkinkan Zap merespons peristiwa di gereja Anda (orang baru, donasi baru, anggota grup baru, dan lain-lain) dan menulis data kembali ke B1. Tanpa coding dan tanpa infrastruktur tambahan. Anda cukup menghubungkannya di editor drag-and-drop Zapier, menempelkan kunci API, lalu mengaktifkan Zap.

</div>

:::caution Menunggu persetujuan Zapier
Aplikasi B1.church sudah dibuat dan berfungsi, tetapi masih menunggu peninjauan Zapier sebelum muncul secara publik di direktori aplikasi editor Zap. Sampai disetujui, hanya akun yang diundang yang dapat menggunakannya. Semua yang dijelaskan di bawah ini menggambarkan cara kerjanya setelah disetujui.
:::

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Zapier](https://zapier.com) (paket gratis sudah cukup untuk beberapa Zap)
- Admin gereja dengan izin **Edit Settings** di B1Admin (Anda akan membuat kunci API)
- Gambaran tentang apa yang ingin Anda lakukan, misalnya "ketika orang ditambahkan di B1, tambahkan mereka ke daftar Mailchimp saya"

</div>

## Pemicu dan Aksi

| Jenis | Keterangan | Peristiwa / endpoint B1 |
|---|---|---|
| **Pemicu** | New Person | `person.created` |
| **Pemicu** | Updated Person | `person.updated` |
| **Pemicu** | New Donation | `donation.created` |
| **Pemicu** | New Group Member | `group.member.added` |
| **Pemicu** | New Form Submission | `form.submission.created` |
| **Aksi** | Create Person | menambahkan orang baru |
| **Aksi** | Add Donation | mencatat donasi |
| **Aksi** | Add Group Member | menambahkan seseorang ke grup |
| **Aksi** | Find Person | mencari orang berdasarkan id, email, atau nama; tugas gagal jika tidak ada yang cocok |

Kombinasikan dengan bebas dengan lebih dari 7.000 aplikasi yang didukung Zapier.

## Pengaturan

### 1. Buat kunci API B1

1. Di B1Admin, buka **Settings → Developer → API Keys**.
2. Klik **New API Key**, beri nama seperti "Zapier", lalu pilih scope yang dibutuhkan Zap.
3. **Penting:** Pemicu Zapier mendaftarkan webhook atas nama Anda saat Zap diaktifkan, dan ini memerlukan scope **`settings:write`**. Selalu sertakan `settings:write` jika ada Zap yang menggunakan pemicu B1.
4. Berikan juga scope yang dibutuhkan aksi. Misalnya, aksi "Add Donation" memerlukan `donations:write`, dan "Create Person" memerlukan `people:write`.
5. Simpan. Kunci `cak_…` lengkap hanya ditampilkan **sekali**. Salin sekarang.

### 2. Hubungkan Zapier ke B1

1. Di Zapier, buat Zap baru.
2. Saat pertama kali memilih pemicu atau aksi B1, Zapier akan meminta Anda **Sign in to B1.church**.
3. Tempelkan kunci API dari langkah 1, lalu klik **Ya, Lanjutkan**. Zapier akan memvalidasinya terhadap gereja Anda.

Koneksi disimpan di Zapier dan digunakan ulang oleh setiap Zap di akun Anda.

### 3. Bangun Zap

Pilih pemicu, lalu tambahkan satu atau beberapa langkah aksi. Contohnya ada di bawah.

## Resep Umum

### Tambahkan orang baru B1 ke Mailchimp

- **Pemicu**: B1: New Person
- **Aksi**: Mailchimp: Add/Update Subscriber. Petakan `name__first`, `name__last`, dan `contactInfo__email` dari B1 ke kolom First Name, Last Name, dan Email di Mailchimp.

### Kirim donasi ke saluran Slack dengan kartu yang lebih kaya daripada konektor bawaan

- **Pemicu**: B1: New Donation
- **Aksi**: Slack: Send Channel Message. Susun tata letak apa pun, seperti tombol, lampiran, dan lainnya, yang tidak dapat dibuat oleh [konektor Slack](./slack-discord) bawaan.

### Tambahkan anggota grup baru ke Google Group

- **Pemicu**: B1: New Group Member (difilter ke `groupId` tertentu)
- **Aksi**: Filter by Zapier: lanjutkan hanya jika grup B1 adalah grup yang Anda maksud
- **Aksi**: B1: Find Person (gunakan `personId` dari pemicu untuk mengambil email)
- **Aksi**: Google Groups: Add Member

### Teruskan pengiriman formulir ke pelacak proyek

- **Pemicu**: B1: New Form Submission
- **Aksi**: Notion / Linear / Asana / Trello: Create page / issue / task

## Cara Kerja Pemicu di Balik Layar

Pemicu adalah **REST hooks**, bukan polling. Zapier tidak memeriksa B1 setiap 15 menit. Saat Anda mengaktifkan Zap, Zapier meminta B1 mendaftarkan webhook yang mengarah ke URL Zapier yang bersifat privat. Ketika peristiwa terjadi, B1 mengirim data ke Zapier dan Zap Anda berjalan **dalam hitungan detik**. Jika Zap dinonaktifkan, Zapier meminta B1 menghapus webhook tersebut, sehingga tidak ada langganan yatim.

Artinya, pemicu hanya aktif untuk peristiwa yang terjadi **setelah** Zap diaktifkan. Tidak ada pengisian mundur. Mengaktifkan Zap tidak akan memutar ulang donasi kemarin.

## Batasan & Catatan

- **Beberapa Zap dengan pemicu yang sama** masing-masing mendaftarkan webhook B1 sendiri. Tidak ada konflik, tetapi perlu diketahui jika Anda memeriksa **Settings → Developer → Webhooks** dan bertanya-tanya mengapa ada tiga baris `Zapier — donation.created` yang identik.
- **Data uji dalam pengaturan Zap**: saat Anda membangun Zap, Zapier meminta data contoh untuk memetakan field. Zapier akan mengambil peristiwa terbaru yang cocok dari B1 jika ada. Jika tidak, Zapier menggunakan contoh sintetis dari definisi aplikasi.
- **Kegagalan aksi muncul sebagai error Zap** di riwayat tugas Zapier. Penyebab umumnya adalah kunci API tanpa scope yang tepat. Misalnya, aksi "Add Donation" memerlukan `donations:write`. Buat ulang kunci dengan scope yang benar, lalu hubungkan kembali di Zapier.
- **Kuota panggilan API keluar**: setiap panggilan API B1 dari aksi dihitung ke kuota tugas Zapier Anda, bukan ke sesuatu di sisi B1.

## Pemecahan Masalah

- **"Authentication failed"** saat menghubungkan: kunci API salah, dicabut, atau tidak memiliki scope yang dibutuhkan Zap. Buat ulang di B1Admin dengan minimal `settings:write` ditambah scope resource yang disentuh Zap, lalu perbarui koneksinya.
- **Pemicu tidak pernah aktif**: pastikan webhook benar-benar terdaftar. Di B1Admin, **Settings → Developer → Webhooks** seharusnya menampilkan baris bernama "Zapier — &lt;event&gt;". Jika tidak ada, kemungkinan kunci API tidak memiliki `settings:write` saat Zap diaktifkan. Perbaiki kuncinya, lalu nonaktifkan dan aktifkan kembali Zap.
- **Pemicu aktif dua kali**: Zapier kadang mengirim ulang peristiwa jika konfirmasinya hilang. Gunakan langkah "Filter by Zapier" pada id unik (misalnya `id` orang) jika Anda membutuhkan deduplikasi yang ketat.

## Lihat Juga

- [Make](./make): pola yang sama, platform berbeda
- [Slack & Discord](./slack-discord): notifikasi chat yang lebih sederhana tanpa Zapier
- [Webhooks (referensi developer)](/docs/developer/api/webhooks)
