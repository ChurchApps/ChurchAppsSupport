---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Picu pesan teks [Clearstream](https://clearstream.io) dari peristiwa B1 mana pun: orang baru, hadiah baru, pengiriman formulir, atau pembaruan kalender. Tarik balasan kembali sebagai catatan B1. Aplikasi Zapier dari Clearstream mendukung kedua arah, sehingga seluruh pengaturan cukup berupa resep dan tidak memerlukan kode khusus.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Clearstream](https://clearstream.io) dengan setidaknya satu daftar dan kuota SMS
- Akun [Zapier](https://zapier.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Bisa Anda Hubungkan

| Arah | Pemicu | Aksi |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (misalnya memberi tahu tim keuangan) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to List ke daftar perutean (misalnya tim permintaan doa) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; beri tag dengan kata kunci yang mereka kirim |

Aksi Zapier dari Clearstream: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## Pengaturan

### 1. Buat kunci API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: wajib agar B1 dapat mendaftarkan webhook pemicu
- `people:read`: diperlukan untuk mencari orang dari peristiwa (`personId` → nama/telepon/email)
- (Opsional) `people:write` jika balasan Clearstream harus membuat kontak B1

### 2. Buat Zap "kirim teks saat ada hadiah baru"

1. **Pemicu**: B1.church: New Donation
2. **Aksi**: B1.church: Find Person (`personId` dari donasi)
3. **Aksi**: Clearstream: Send Text to Number. Gunakan nomor telepon orang dari langkah 2 sebagai penerima, lalu tulis pesannya (`"Terima kasih atas hadiah Anda, {first}! …"`).

Aktifkan Zap. B1 mendaftarkan webhook donasi saat Zap diaktifkan. Anda akan melihat `Zapier — donation.created` muncul di **Settings → Developer → Webhooks**.

### 3. (Opsional) Tarik balasan kembali sebagai catatan B1

1. **Pemicu**: Clearstream: New Incoming Text
2. **Aksi**: Filter by Zapier pada kata kunci, misalnya lanjutkan hanya jika isi teks diawali `PRAY`
3. **Aksi**: B1.church: Find Person (berdasarkan telepon)
4. **Aksi**: Filter / Path. Jika orang tidak ditemukan, buat orang tersebut. Dalam kedua kasus, simpan isi teks di suatu tempat (Slack, Google Sheet, atau pengiriman formulir B1 melalui Webhooks by Zapier).

## Resep Umum

### Mengirim pesan ke tim relawan

- **Pemicu**: B1.church: New Form Submission (difilter pada id formulir permintaan doa)
- **Aksi**: Clearstream: Send Text to List, dengan daftar berupa tim pastoral siaga Anda. Susun isinya sebagai `Permintaan doa baru: {data.questions.0.answer}`.

### Urutan tindak lanjut untuk pengunjung pertama kali

- **Pemicu**: B1.church: New Person, difilter pada tag orang B1 "First-time visitor"
- **Aksi**: Clearstream: Add Subscriber to Automated Workflow. Petakan id alur kerja ke urutan teks 7 hari yang sudah disiapkan sebelumnya.

### Bergabung ke grup melalui kata kunci

- **Pemicu**: Clearstream: New Incoming Text (filter ke kata kunci `MENS`)
- **Aksi**: B1.church: Find Person (berdasarkan telepon). Jika tidak ditemukan, lanjutkan ke → Create Person
- **Aksi**: B1.church: Add Group Member ke grup Men's Ministry

## Batasan & Catatan

- **Clearstream menghitung SMS per pesan.** Setiap aksi Send Text memakai satu atau lebih kredit, tergantung panjang pesan dan jumlah penerima. Periksa kuota paket Anda.
- **Nomor telepon harus dalam format E.164** (misalnya `+15555550199`) untuk *Send Text to Number*. Rekaman orang di B1 menyimpan apa pun yang dimasukkan. Gunakan langkah *Formatter by Zapier — Numbers → Format Phone Number* jika Anda tidak bisa memastikan formatnya.
- **Tidak ada header yang diperlukan dari sisi B1.** Autentikasi Clearstream sepenuhnya berada di dalam koneksi Zapier-nya.

## Pemecahan Masalah

- **Pemicu tidak pernah aktif**: `Settings → Developer → Webhooks` seharusnya menampilkan baris `Zapier — <event>` setelah Zap diaktifkan. Jika tidak ada, kunci API B1 tidak memiliki `settings:write`. Buat ulang kunci dan sambungkan kembali.
- **Clearstream mengembalikan "Invalid phone number"**: kolom penerima tidak dalam format E.164. Tambahkan langkah Format Phone Number.
- **Send Text to List gagal dengan `403`**: pengguna API Clearstream tidak memiliki izin untuk daftar tersebut, atau id daftarnya salah. Id daftar terlihat di halaman detail daftar Clearstream.

## Lihat Juga

- [Text In Church](./text-in-church): platform SMS alternatif dengan pola pengaturan serupa
- [Mobile Message](./mobile-message): untuk gereja di luar AS
- [Zapier (ringkasan)](../zapier): sisi B1 dari setiap resep Zapier
- [Dokumentasi API Clearstream](https://api-docs.clearstream.io/): untuk integrasi kustom di luar aplikasi Zapier
