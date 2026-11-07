---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Kirim notifikasi yang mudah dibaca dari B1 langsung ke channel Slack atau Discord, seperti orang baru, donasi, pendaftaran grup, pengiriman formulir, acara kalender, dan lainnya. Tidak perlu akun pihak ketiga dan tidak ada Zap yang perlu dikelola. B1 memformat ulang event menjadi pesan chat dan mengirimkannya langsung ke URL webhook channel tersebut.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin **Edit Settings** di B1Admin
- Seorang admin di workspace Slack atau server Discord Anda untuk membuat Incoming Webhook channel
- Tentukan channel mana yang ingin Anda gunakan untuk notifikasi (Anda bisa memakai channel yang sama untuk beberapa jenis event, atau memisahkannya ke beberapa channel)

</div>

## Cara Kerjanya

B1 memiliki **Connector Type** bawaan untuk platform chat. Saat Anda membuat webhook dengan tipe **Slack** atau **Discord**, mesin webhook tetap menjalankan pengiriman, percobaan ulang, dan header bertanda tangan seperti biasa. Namun, isinya diubah dari envelope normal B1 `{event,churchId,data}` menjadi pesan sederhana `{text}` (Slack) atau `{content}` (Discord) yang diharapkan oleh layanan tersebut.

Tidak ada server B1 yang menghubungi Slack untuk setiap gereja selain alur webhook keluar yang sudah ada. Tidak ada yang baru untuk di-hosting dan tidak ada biaya tambahan.

## Slack — Langkah demi Langkah

### 1. Dapatkan URL Incoming Webhook Slack

1. Buka [api.slack.com/apps](https://api.slack.com/apps) di workspace Slack tempat Anda ingin menerima notifikasi.
2. Klik **Create New App → From scratch**, beri nama seperti "B1 Notifications", lalu pilih workspace.
3. Di navigasi kiri, pilih **Incoming Webhooks** dan ubah **Activate Incoming Webhooks** menjadi *On*.
4. Klik **Add New Webhook to Workspace**, pilih channel (misalnya `#donations`), lalu klik **Allow**.
5. Slack akan membawa Anda kembali ke halaman dengan **Webhook URL** baru yang tampak seperti `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Salin URL tersebut, karena itulah satu-satunya informasi yang dibutuhkan B1.

:::caution
Perlakukan URL webhook Slack sebagai rahasia. Siapa pun yang memilikinya dapat mengirim pesan apa pun ke channel. Jika Anda tidak sengaja membocorkannya, buat ulang dari halaman aplikasi Slack. Membuat ulang hanya memutar URL, jadi perbarui B1 agar sesuai.
:::

### 2. Hubungkan di B1Admin

1. Di B1Admin, buka **Settings → Developer → Webhooks**.
2. Klik **New Webhook**.
3. Isi:
   - **Name**: nama yang mudah dibaca, seperti "Donations → #donations". Hanya tim Anda yang melihatnya.
   - **Connector Type**: pilih **Slack**.
   - **Payload URL**: tempel URL Slack dari langkah 1.
   - **Events**: centang event yang ingin dikirim sebagai pesan. Untuk channel donasi, cukup `donation.created`. Untuk channel #people, coba `person.created` dan `group.member.added`.
4. Klik **Save**. Dialog "Signing Secret" akan muncul. Anda bisa mengabaikannya untuk Slack (Slack tidak memverifikasi tanda tangan B1) dan menutupnya.

### 3. Uji coba

Buka kembali webhook dari daftar dan klik **Send Test Event**. Dalam satu atau dua detik, pesan seperti

> 💝 New donation: $50.00

akan muncul di channel Slack Anda, dan baris baru akan muncul di tabel **Recent Deliveries** pada layar yang sama dengan status `succeeded`. Selesai.

## Discord — Langkah demi Langkah

### 1. Dapatkan URL Webhook Discord

1. Di server Discord Anda, arahkan kursor ke channel yang ingin Anda gunakan untuk notifikasi, lalu klik ikon **⚙ gear** (Edit Channel).
2. Buka **Integrations → Webhooks → New Webhook**.
3. Beri nama dan (opsional) avatar, lalu klik **Copy Webhook URL**. URL tersebut tampak seperti `https://discord.com/api/webhooks/123…/abc…`.

### 2. Hubungkan di B1Admin

Sama seperti alur Slack di atas, kecuali Anda mengatur **Connector Type** ke **Discord**. Tempel URL Discord ke **Payload URL** lalu simpan.

:::tip
Anda **tidak** perlu menambahkan `/slack` di akhir URL Discord. B1 mengirim payload `{content}` native Discord, bukan yang kompatibel dengan Slack. Cukup tempel URL yang diberikan Discord.
:::

### 3. Uji coba

Gunakan tombol **Send Test Event** yang sama. Discord akan menampilkan pesan di channel yang dipilih dan log pengiriman akan berubah menjadi `succeeded`.

## Seperti Apa Pesannya

| Event | Contoh pesan |
|---|---|
| `person.created` | 👤 New person added: Jordan Rivera |
| `person.updated` | 👤 Person updated: Jordan Rivera |
| `group.created` | 👥 New group created: Tuesday Bible Study |
| `group.member.added` | ➕ Someone was added to a group |
| `donation.created` | 💝 New donation: $50.00 |
| `donation.updated` | 💝 Donation updated: $75.00 |
| `attendance.recorded` | ✅ Attendance recorded |
| `form.submission.created` | 📝 New form submission received |
| `event.created` | 📅 New event: Easter Service |

Daftar lengkapnya ada di [katalog event webhook](/docs/developer/api/webhooks#event-catalog). Event apa pun di sana dapat diarahkan ke Slack/Discord.

## Satu Channel per Topik

Anda tidak harus memasukkan semua event ke satu tempat. Kebanyakan gereja menyiapkan beberapa webhook:

- Channel **#donations** yang hanya mendengarkan `donation.created`
- Channel **#new-people** untuk `person.created` dan `group.member.added`
- Channel **#admin-alerts** untuk hal bervolume rendah seperti `form.submission.created`

Tidak ada batas jumlah webhook per gereja. Setiap webhook bersifat independen. Menghapus atau menonaktifkan satu webhook tidak memengaruhi yang lain.

## Memeriksa Pengiriman

Tabel **Recent Deliveries** di editor webhook menampilkan 50 percobaan terakhir. Klik sebuah baris untuk melihat payload persis yang dikirim dan respons yang kembali. Untuk connector Slack, payload-nya adalah `{"text":"💝 New donation: $50.00"}`, bukan envelope mentah `{event,churchId,...}`, karena B1 mengubah bentuknya sebelum pengiriman.

Jika ada yang gagal (badge merah `failed` atau `exhausted`), dialog akan menampilkan status HTTP dan isi respons sehingga Anda bisa melihat persis apa yang tidak diterima Slack atau Discord. Biasanya penyebabnya adalah kesalahan salin-tempel di URL.

## Pemecahan Masalah

- **Tidak ada pesan yang muncul dan status pengiriman `400`**: biasanya Connector Type diatur ke **Standard** padahal URL-nya adalah URL Slack/Discord. Slack/Discord menolak envelope mentah. Ubah dropdown ke **Slack** atau **Discord**, lalu kirim ulang uji coba.
- **Webhook nonaktif otomatis**: setelah 3 pengiriman gagal berturut-turut, B1 mematikan webhook. Perbaiki URL (atau putar ulang di Slack/Discord), lalu aktifkan kembali **Active**.
- **Pesan tiba tetapi kehilangan detail**: setiap platform chat membatasi ukuran pesan. Pesan B1 sengaja dibuat satu baris. Untuk notifikasi yang lebih kaya, gunakan [Zapier](./zapier) atau [Make](./make) untuk menyusun pesan Slack yang lebih lengkap melalui aksi Slack mereka.

## Mengganti Connector Type Nanti

Anda dapat mengubah Connector Type pada webhook yang sudah ada. Perubahan berlaku pada pengiriman berikutnya. Jika Anda beralih dari Slack ke Standard, arahkan URL ke endpoint HTTPS Anda sendiri. Signing secret yang sama (yang diterbitkan saat webhook dibuat) kemudian dapat digunakan untuk memverifikasi envelope mentah.

## Lihat Juga

- [Zapier](./zapier): untuk alur kerja multi-langkah yang dipicu oleh event B1
- [Make](./make): pembuat skenario visual
- [Webhook (referensi pengembang)](/docs/developer/api/webhooks): format payload dan tanda tangan lengkap jika suatu saat Anda mengarahkan webhook ke server Anda sendiri
