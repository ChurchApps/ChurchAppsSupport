---
title: "Make"
description: "Hubungkan B1 Admin ke Make untuk mengotomatiskan alur kerja: buat kunci API, atur pemicu dan aksi B1.church, lalu atasi kesalahan umum."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (sebelumnya Integromat) adalah platform otomatisasi alur kerja visual, mirip dengan Zapier, tetapi dengan logika yang lebih fleksibel dan biaya yang lebih murah dalam skala besar. Aplikasi Make resmi B1.church memungkinkan Anda membuat "skenario" yang langsung merespons peristiwa B1 dan menulis kembali data ke B1.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Akun [Make](https://www.make.com) (paket gratis mencukupi untuk alur kerja kecil)
- Admin gereja dengan izin **Edit Settings** di B1Admin
- Gambaran kasar tentang skenario yang ingin Anda buat

</div>

## Modul

| Jenis | Fungsi | Event / endpoint B1 |
|---|---|---|
| **Instant Trigger** | Watch Events | event B1 apa pun yang Anda langgani (`person.created`, `donation.created`, …) |
| **Action** | Create Person | menambahkan orang baru |
| **Action** | Add Donation | mencatat donasi |
| **Action** | Add Group Member | menambahkan orang ke grup |
| **Search** | Search People | mencari orang berdasarkan nama atau email |

Instant trigger memungkinkan Anda memilih event mana yang akan didengarkan. Setiap skenario hanya memiliki satu modul pemicu, yang dikonfigurasi per event.

## Pengaturan

### 1. Membuat kunci API B1

1. Di B1Admin, buka **Settings → Developer → API Keys**.
2. Klik **New API Key**, beri nama "Make", lalu berikan scope yang Anda butuhkan.
3. **Sertakan `settings:write`** jika ada skenario yang menggunakan instant trigger. Make mendaftarkan webhook atas nama Anda saat skenario diaktifkan.
4. Berikan juga scope yang dibutuhkan modul action (misalnya `donations:write` untuk modul Add Donation).
5. Simpan dan salin kunci `cak_…`.

### 2. Memasang koneksi

1. Di Make, buat skenario baru lalu letakkan modul pemicu **B1.church** di kanvas.
2. Saat diminta, pilih **Create a connection**. Tempelkan kunci API ke kolom *API Key* dan biarkan *API Base URL* tetap `https://api.churchapps.org` (kecuali Anda menguji di staging).
3. Klik **Save**. Make akan menguji kunci dengan membaca profil gereja Anda.

Koneksi disimpan di akun Make Anda dan dapat digunakan ulang di berbagai skenario.

### 3. Mengonfigurasi pemicu

1. Buka pengaturan modul **Watch Events**.
2. Pilih event yang Anda inginkan, misalnya `donation.created`.
3. Simpan. Make akan membuat URL webhook yang unik dan menyimpannya secara internal.

### 4. Menambahkan modul lanjutan

Letakkan modul aplikasi Make mana pun di kanvas, seperti Mailchimp, Google Sheets, Slack, HubSpot, atau endpoint HTTP Anda sendiri. Petakan output pemicu (`event`, `churchId`, `data.id`, `data.amount`, …) ke kolom input mereka. Modul flatten, iterator, router, dan aggregator dari Make memungkinkan Anda membuat alur bercabang dan paralel yang sulit dibuat di Zapier.

### 5. Mengaktifkan skenario

Aktifkan **Active** di header skenario. Make memanggil `POST /membership/webhooks` di B1 untuk mendaftarkan URL. Sejak saat itu, setiap event B1 yang cocok akan diproses oleh skenario secara real time.

Menonaktifkan skenario akan memanggil `DELETE /membership/webhooks/{id}` sehingga tidak ada langganan yatim yang tertinggal.

## Resep Umum

### Sinkronkan donasi ke Google Sheet untuk peninjauan keuangan

- **Pemicu**: B1: Watch Events (`donation.created`)
- **Action**: Google Sheets: Add a Row. Petakan `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` ke kolom-kolom di sheet.

### Notifikasi Slack bersyarat berdasarkan jumlah donasi

- **Pemicu**: B1: Watch Events (`donation.created`)
- **Router**:
  - Cabang A: Filter `data.amount >= 1000` → Slack: kirim ke `#major-gifts`
  - Cabang B: jika tidak cocok → Slack: kirim ke `#donations`

### Orang baru → CRM + email selamat datang + Slack

- **Pemicu**: B1: Watch Events (`person.created`)
- **Action**: HubSpot: Create Contact
- **Action**: Mailgun: Send Welcome Email
- **Action**: Slack: Beri tahu `#new-people` (berjalan paralel, gunakan router Make)

## Cara Kerja Instant Trigger

Instant trigger berbasis webhook, bukan polling. Saat diaktifkan, Make memanggil `POST /membership/webhooks` dengan URL yang dibuatnya dan event yang Anda pilih. Ketika event terjadi di B1, B1 mengirim envelope ke URL Make dan skenario Anda berjalan dalam hitungan detik. Menonaktifkan skenario akan menghapus webhook.

Pemicu hanya aktif untuk event yang terjadi **selama skenario aktif**. Tidak ada pengisian data mundur.

## Batasan dan Catatan

- **Satu event per modul Watch Events.** Untuk mendengarkan beberapa event dalam satu skenario, letakkan beberapa modul pemicu di skenario terpisah (atau gunakan satu modul dengan daftar event gabungan, lihat di bawah).
- **Verifikasi tanda tangan tidak tersedia.** Make tidak meneruskan `X-B1-Signature` ke skenario. Batas kepercayaannya adalah URL webhook per skenario yang sulit ditebak. Ini praktik standar Make. Jika Anda memerlukan pemeriksaan tanda tangan secara eksplisit, buat integrasi kustom dengan [SDK](/docs/developer/api/webhooks#sdk-support).
- **Jumlah operasi.** Setiap panggilan API dari modul action dihitung terhadap kuota operasi Make Anda, bukan sesuatu di sisi B1.

## Pemecahan Masalah

- **Tes koneksi gagal**: biasanya karena salah ketik pada kunci API. Salin ulang dari B1Admin (kunci lengkap hanya ditampilkan sekali; jika Anda kehilangannya, buat kunci baru).
- **Modul pemicu tidak aktif**: periksa **Settings → Developer → Webhooks** di B1Admin. Jika Anda tidak melihat baris "Make — &lt;event&gt;" setelah skenario diaktifkan, kunci tersebut tidak memiliki `settings:write`. Perbarui kunci lalu aktifkan kembali skenario.
- **Action mengembalikan `403 Forbidden`**: kunci API tidak memiliki scope untuk endpoint tersebut. Misalnya, Add Donation memerlukan `donations:write`. Perbarui kunci di B1Admin lalu uji ulang.

## Menyesuaikan Aplikasi

Aplikasi Make B1.church bersifat open source. Definisi JSON-nya berada di repositori `B1Integrations/Make/`. Jika Anda memerlukan modul yang belum tersedia, misalnya action baru untuk endpoint yang belum kami cakup, silakan buka issue atau PR di sana.

## Lihat Juga

- [Zapier](./zapier.md): pola yang sama dengan UI yang lebih sederhana dan katalog aplikasi yang lebih besar
- [Slack & Discord](./slack-discord.md): notifikasi obrolan bawaan tanpa Make
- [Webhooks (referensi pengembang)](/docs/developer/api/webhooks)
