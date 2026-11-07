---
title: "Layanan Terhubung"
---

# Layanan Terhubung

<div class="article-intro">

Cara tercepat untuk menghubungkan B1 ke alat teknologi gereja lain biasanya adalah resep Zapier atau Make. Anda tidak memerlukan infrastruktur B1 yang baru, dan pihak ketiga yang menjalankan alurnya. Halaman ini berisi daftar layanan yang telah kami pastikan dapat dihubungkan saat ini, dengan panduan pengaturan singkat yang bisa langsung disalin untuk setiap layanan.

</div>

## Sekilas

| Layanan | Kategori | Jembatan | Yang Bisa Anda Hubungkan |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier atau Make | Sinkronkan orang dan pemberi baru dari B1 ke audiens Mailchimp |
| [Donorbox](./donorbox) | Donasi | Zapier | Kirim donasi dan donatur Donorbox kembali ke B1 |
| [Subsplash](./subsplash) | Aplikasi / Donasi | Zapier | Tarik data pemberian dan orang dari Subsplash ke B1 |
| [VOMO](./vomo) | Relawan | Zapier | Sinkronkan pendaftaran relawan antara grup B1 dan proyek VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Picu pesan teks Clearstream dari peristiwa B1; terima balasan sebagai data B1 |
| [Text In Church](./text-in-church) | SMS / Alur Kerja | Zapier | Picu alur kerja Text In Church dari B1; terima data Connect Card |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier atau Make | Kirim SMS dari peristiwa B1 mana pun |
| [Checkr](./checkr) | Pemeriksaan latar belakang | Make | Mulai pemeriksaan latar belakang saat seseorang bergabung dengan tim pelayanan |

## Persamaan Semua Layanan Ini

1. **Sisi B1 dalam pengaturan selalu sama.** Buat kunci API dengan cakupan (scope) yang tepat di **B1Admin → Settings → Developer → API Keys**. Lalu, biarkan jembatan mendaftarkan webhook untuk pemicu (Zapier dan Make melakukannya secara otomatis dan memerlukan `settings:write`), atau panggil endpoint REST B1 dari tindakan lanjutan.
2. **Jembatan ditagihkan kepada Anda, bukan kepada kami.** ChurchApps gratis. Zapier dan Make sama-sama memiliki paket gratis yang mencakup beberapa resep.
3. **Anda dapat menguji pengaturan tanpa mengaktifkannya.** Kedua jembatan memiliki tombol "Test step" yang memicu pemicu sekali terhadap B1 dan menampilkan bentuk datanya sebelum Anda mengaktifkan resep.

## Memilih Jembatan

- **Zapier** lebih mudah digunakan dan memiliki katalog aplikasi yang lebih besar. Gunakan sebagai pilihan utama kecuali biaya menjadi kendala.
- **Make** lebih murah untuk skala besar dan memiliki logika perutean dan penyaringan yang lebih fleksibel. Gunakan saat satu alur kerja memiliki percabangan, kondisi, atau banyak langkah.
- **Webhooks by Zapier** (digunakan pada dokumen Mobile Message) adalah adaptor umum yang memungkinkan Anda mengirim POST ke endpoint HTTP mana pun dari Zap, saat tujuannya bukan aplikasi Zapier resmi.

Jika Anda menginginkan sesuatu yang tidak ada dalam daftar ini, [REST API](/docs/developer/api) dan [webhook](/docs/developer/api/webhooks) B1 terbuka untuk digunakan. Anda dapat membuat jembatan khusus dengan [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) dalam beberapa jam.

## Yang Tidak Ada di Sini (dan Alasannya)

Beberapa alat teknologi gereja yang populer, seperti Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, dan MinistrySafe, saat ini tidak memiliki aplikasi Zapier atau modul Make yang dipublikasikan. Mereka memiliki API sendiri, tetapi menghubungkannya ke B1 memerlukan kode khusus, bukan resep, sehingga tidak termasuk dalam daftar ini. Jika vendor menambahkan aplikasi Zapier atau modul Make, kami akan menambahkan dokumennya.

Kami juga sengaja tidak menyertakan alat khusus Planning Center Services (musik, presentasi), produk ChMS pesaing, konsultan migrasi, dan alat yang hanya membersihkan data khusus PCO. Tidak ada satu pun dari mereka yang memiliki jalur penghubungan yang berguna ke B1.

## Lihat Juga

- [Zapier (ikhtisar)](../zapier): sisi B1 dari setiap resep Zapier sama, dan dokumen ini membahasnya sekali saja
- [Make (ikhtisar)](../make): sama untuk skenario Make
- [Slack & Discord](../slack-discord): notifikasi obrolan tanpa jembatan apa pun
- [Google Sheets](../google-sheets): ekspor sesuai permintaan
- [Webhook (referensi pengembang)](/docs/developer/api/webhooks): katalog peristiwa yang menjadi dasar setiap resep
