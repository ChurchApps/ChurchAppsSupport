---
title: "Mailchimp"
description: "Sinkronkan orang dan keanggotaan grup atau daftar tersimpan di B1 Admin ke audiens Mailchimp sebagai tag, dengan langkah pengaturan, impor awal, dan pemecahan masalah."
---

# Mailchimp

<div class="article-intro">

Jaga agar audiens Mailchimp tetap sinkron dengan B1 secara otomatis: orang masuk dengan nama, email, dan nomor telepon mereka; keanggotaan grup dan daftar menjadi tag Mailchimp; orang yang dihapus akan diarsipkan. Sinkronisasi ini sudah terpasang di dalam B1, tanpa layanan pihak ketiga dan tanpa biaya per tugas, dan perubahan tiba hampir secara real-time, bukan terjadwal setiap malam.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Mailchimp](https://mailchimp.com) dengan audiens yang ingin Anda kelola oleh B1
- **API key** Mailchimp (Mailchimp: ikon profil → **Account & billing → Extras → API keys**)
- **Audience ID** Anda (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Apa yang Disinkronkan

| Perubahan di B1 | Efek di Mailchimp |
|---|---|
| Orang ditambahkan atau diperbarui | Subscriber ditambahkan/diperbarui (nama depan, nama belakang, telepon; subscriber baru masuk sebagai `subscribed`) |
| Orang dihapus (atau dihapus sesuai GDPR) | Subscriber diarsipkan |
| Orang bergabung dengan grup | Tag dengan nama grup tersebut ditambahkan |
| Orang keluar dari grup | Tag tersebut dihapus |
| Orang masuk ke daftar tersimpan | Tag dengan nama daftar tersebut ditambahkan |
| Orang keluar dari daftar tersimpan | Tag tersebut dihapus |

**Daftar tersimpan biasanya merupakan sumber tag yang lebih baik.** [Daftar tersimpan](/docs/b1-admin/people/lists) di B1 adalah audiens berbasis aturan yang mengevaluasi ulang dirinya sendiri, misalnya "semua orang di kampus Utara" atau "anggota yang memilih email pastoral." Arahkan segmen Mailchimp Anda ke tag daftar, dan sinkronisasi akan menjaganya tetap mutakhir. Gunakan tag grup untuk surat ke tim pelayanan.

Sinkronisasi bersifat **satu arah** (B1 → Mailchimp) dan hanya menyentuh field standar Mailchimp, sehingga tidak akan berbenturan dengan merge field atau segmen yang Anda kelola di dalam Mailchimp.

## Pengaturan

1. Di B1Admin, buka **Settings → Developer → Webhooks → New Webhook**.
2. Atur **Connector Type** ke **Mailchimp**.
3. Tempelkan **Mailchimp API Key** dan **Audience ID** Anda. Kunci disimpan terenkripsi dan tidak akan ditampilkan lagi.
4. Event yang relevan sudah dipilih sebelumnya. Hapus centang pada yang tidak Anda inginkan (misalnya, biarkan event person aktif tetapi lewati tag grup).
5. Simpan. B1 memverifikasi kunci dan audiens dengan Mailchimp sebelum menerimanya. Salah ketik akan langsung gagal dengan alasannya.

Gunakan **Send Test** kapan saja untuk memverifikasi ulang koneksi. Setiap upaya sinkronisasi dicatat dalam riwayat pengiriman webhook beserta respons asli dari Mailchimp, dan pengiriman yang gagal akan dicoba ulang secara otomatis dengan jeda bertahap selama sekitar lima hari.

## Impor Awal

Konektor hanya menyinkronkan *perubahan* sejak diaktifkan. Konektor tidak mengisi data direktori Anda yang sudah ada. Untuk hari pengaturan:

1. Di B1Admin, buka **People**, cari orang yang ingin Anda sertakan (atau jalankan daftar tersimpan), lalu klik **Export** untuk mengunduh CSV.
2. Di Mailchimp, gunakan **Audience → Import contacts** untuk memuat CSV, dan terapkan tag apa pun selama impor.

Memuat data awal melalui importer Mailchimp membuat Anda tetap memegang kendali atas persetujuan. Hanya impor orang yang benar-benar sudah setuju menerima email Anda. Mengimpor seluruh direktori sebagai kontak berlangganan secara massal dapat melanggar ketentuan Mailchimp dan hukum anti-spam (CAN-SPAM/GDPR).

## Batasan & Catatan

- **Sinkronisasi satu arah.** Berhenti berlangganan, bounce, dan perubahan yang dibuat di Mailchimp tidak kembali ke B1. Seseorang yang berhenti berlangganan di Mailchimp tetap bisa menerima email yang dikirim langsung dari B1. Anggap Mailchimp sebagai sumber kebenaran untuk persetujuan email massal.
- **Orang tanpa alamat email akan dilewati** (dicatat di riwayat pengiriman), karena subscriber Mailchimp diidentifikasi berdasarkan email.
- **Perubahan alamat email akan membuat subscriber baru.** Mailchimp mengidentifikasi orang berdasarkan email, sehingga mengubah email seseorang di B1 akan menambahkannya dengan alamat baru. Subscriber lama tetap ada sampai Anda mengarsipkannya di Mailchimp.
- **Hanya field standar yang disinkronkan**: nama depan, nama belakang, dan telepon. Status keanggotaan, kampus, dan field kustom B1 belum dipetakan ke merge field Mailchimp pada versi ini. Gunakan tag daftar untuk segmentasi.
- **Nama tag mengikuti nama grup atau daftar.** Mengubah nama grup atau daftar akan memulai pemberian tag dengan nama baru. Tag lama tetap ada pada subscriber yang sudah ada sampai dihapus di Mailchimp.
- **Batas kontak Mailchimp tetap berlaku.** Sinkronisasi yang mendorong audiens paket gratis melewati batasnya akan mencatat error `Member limit reached` di riwayat pengiriman.

## Resep Lainnya (Zapier / Make)

Hal di luar sinkronisasi audiens, seperti memberi tag pada pemberi dana saat `donation.created`, arah balik dari Mailchimp ke B1, atau sinkronisasi ke platform email lain (Constant Contact, Brevo, dll.), tetap tersedia melalui [Zapier](../zapier.md) atau [Make](../make.md). Keduanya dipicu oleh event webhook yang sama:

- **Beri tag pada pemberi dana:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Dua arah:** Mailchimp *New Subscriber* → B1 *Create Person*

Jika sebelumnya Anda menghubungkan sinkronisasi person/grup melalui Zapier, matikan Zap tersebut setelah mengaktifkan konektor native. Menjalankan keduanya akan memproses setiap event dua kali dan membuang tugas Zapier tanpa manfaat.

## Pemecahan Masalah

- **Penyimpanan gagal dengan "Mailchimp rejected the API key"**: kunci telah dicabut atau salah ketik. Kunci harus diakhiri dengan sufiks data center seperti `-us21`.
- **Penyimpanan gagal dengan "audience not found"**: Audience ID tidak ada di bawah akun tersebut. Salin dari **Audience → Settings → Audience name and defaults** (bukan nama audiens).
- **Seseorang tidak pernah muncul di Mailchimp**: periksa riwayat pengiriman webhook. "Skipped: person has no email address" berarti persis seperti itu. Respons `4xx` dari Mailchimp menampilkan alasannya di badan respons.
- **Pengiriman berhenti sepenuhnya**: setelah beberapa pengiriman gagal berulang kali, webhook otomatis nonaktif. Perbaiki penyebabnya (biasanya kunci yang dicabut), aktifkan kembali, lalu gunakan **Send Test** untuk memastikan.

## Lihat Juga

- [Webhooks (referensi pengembang)](/docs/developer/api/webhooks): mesin di baliknya, katalog event, serta semantik pengiriman dan percobaan ulang
- [Daftar Tersimpan](/docs/b1-admin/people/lists): audiens berbasis aturan yang cocok dengan tag Mailchimp
- [Zapier (ikhtisar)](../zapier.md): untuk resep di luar sinkronisasi audiens
