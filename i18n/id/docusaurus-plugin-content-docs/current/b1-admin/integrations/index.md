---
title: "Integrasi"
---

# Integrasi

<div class="article-intro">

B1 terhubung dengan alat yang sudah digunakan tim Anda. Hubungkan Slack atau Discord untuk notifikasi staf, otomatisasi alur kerja di Zapier atau Make, atau ekspor data sesuai kebutuhan ke Google Sheets, tanpa harus membayar platform integrasi terpisah dan tanpa ChurchApps menjalankan layanan tambahan apa pun. Setiap integrasi berjalan di infrastruktur pihak ketiga dan berkomunikasi dengan gereja Anda melalui webhook atau REST API B1.

</div>

## Yang Tersedia

| Integrasi | Fungsinya | Arah | Usaha pengaturan |
|---|---|---|---|
| **[Slack](./slack-discord)** | Mengirim notifikasi yang mudah dibaca (orang baru, donasi, pendaftaran, …) ke kanal Slack | B1 → Slack | 2 menit |
| **[Discord](./slack-discord)** | Sama, ke kanal Discord | B1 → Discord | 2 menit |
| **[Zapier](./zapier)** | Gunakan peristiwa B1 sebagai pemicu dan tindakan B1 di lebih dari 7.000 aplikasi Zapier | Keduanya | 5–10 menit per Zap |
| **[Make](./make)** | Ide yang sama dengan Zapier, dalam pembuat skenario visual Make | Keduanya | 5–10 menit per skenario |
| **[Google Sheets](./google-sheets)** | Ekspor Orang / Donasi / Grup / Kehadiran ke spreadsheet sesuai kebutuhan | B1 → Sheet | 5 menit |
| **[Claude](./claude)** | Ajukan pertanyaan kepada Claude dari Anthropic tentang data gereja Anda, sesuai izin Anda. Gratis dicoba, direkomendasikan | Keduanya | Kurang dari 3 menit |
| **[ChatGPT](./chatgpt)** | Ide yang sama dengan ChatGPT dari OpenAI (memerlukan paket ChatGPT berbayar) | Keduanya | 10 menit |
| **[Layanan terhubung](./services/)** | Panduan terkurasi untuk Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Bervariasi | 5–10 menit masing-masing |

## Cara Memilih

- **Hanya ingin notifikasi di chat?** Gunakan **Slack** atau **Discord**. Tidak perlu akun pihak ketiga dan tidak ada Zap yang perlu dipelihara. Semuanya dikonfigurasi di dalam B1Admin.
- **Ingin mengotomatisasi sesuatu lintas aplikasi** (misalnya "ketika seseorang memberi, tambahkan mereka ke daftar Mailchimp saya dan kirim ke #donasi di Slack")? Gunakan **Zapier** atau **Make**. Zapier lebih ramah pengguna; Make lebih murah dalam skala besar dan memiliki logika yang lebih fleksibel.
- **Perlu menarik data sekali waktu atau laporan terjadwal?** Gunakan **Google Sheets**. Tempelkan kunci API di sidebar add-on lalu klik Ekspor.
- **Ingin mengajukan pertanyaan dalam bahasa sehari-hari** ("berapa pengunjung baru Minggu lalu?", "rangkum donasi bulan ini")? Mulailah dengan **[Claude](./claude)**. Gratis dicoba dan siap digunakan kurang dari 3 menit. **[ChatGPT](./chatgpt)** juga bisa dengan paket berbayar. Claude terhubung dengan masuk menggunakan akun B1 Anda, sedangkan ChatGPT menggunakan kunci API B1.
- **Ingin membangun integrasi kustom sendiri?** Tidak ada yang di atas. Gunakan [REST API](/docs/developer/api) langsung dengan [kunci API](/docs/developer/api/api-keys), atau berlangganan [webhook](/docs/developer/api/webhooks) dari server yang Anda kendalikan.

## Persamaan Semua Integrasi

Setiap integrasi melakukan autentikasi dengan **kunci API B1**, yang dibuat di B1Admin pada **Pengaturan → Developer → API Keys**. Kunci tersebut:

- Terikat pada orang tertentu di gereja Anda dan mewarisi izin orang tersebut
- Dapat dipersempit dengan **scope**. Misalnya, ekspor Google Sheets hanya membutuhkan `people:read`, tidak perlu `settings:write`
- Dapat dicabut kapan saja, sehingga akses integrasi langsung terputus tanpa memengaruhi hal lain

Beberapa konektor (Zapier, Make) juga mendaftarkan [webhook](/docs/developer/api/webhooks) atas nama Anda ketika Zap atau skenario diaktifkan, dan menghapusnya ketika Zap dimatikan. Anda tidak perlu mengelola URL webhook secara manual.

:::tip
Agar Zapier dan Make dapat mendaftarkan webhook secara otomatis, kunci API perlu memiliki scope **`settings:write`** (serta scope sumber daya untuk apa pun yang disentuh integrasi). Kunci hanya-baca berfungsi untuk tindakan dan ekspor, tetapi tidak untuk pemicu.
:::

## Biaya

ChurchApps gratis dan bersifat open-source. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), serta konektor resmi Zapier / Make / Google Sheets juga gratis dari sisi kami. Pihak ketiga mungkin mengenakan biaya untuk platform mereka sendiri (Zapier dan Make sama-sama memiliki paket gratis yang cukup luas; Slack, Discord, dan Google Sheets gratis untuk keperluan ini).

## Membangun Sendiri

Jika tidak ada yang di atas yang sesuai, setiap permukaan B1 terbuka:

- **[REST API](/docs/developer/api)**: panggil B1 dari bahasa apa pun dengan header `Authorization: Bearer cak_…`
- **[Webhook](/docs/developer/api/webhooks)**: berlangganan endpoint HTTPS publik ke satu atau beberapa jenis peristiwa dan terima payload JSON yang ditandatangani
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)**: jika Anda membangun produk SaaS yang digunakan oleh banyak gereja

## Langkah Selanjutnya

- [Slack & Discord](./slack-discord): kirim notifikasi chat
- [Zapier](./zapier): terhubung ke lebih dari 7.000 aplikasi
- [Make](./make): otomatisasi alur kerja visual
- [Google Sheets](./google-sheets): ekspor ke spreadsheet
- [Claude](./claude): tanyakan kepada Claude dari Anthropic tentang data gereja Anda
- [ChatGPT](./chatgpt): tanyakan kepada ChatGPT dari OpenAI tentang data gereja Anda
- [Layanan terhubung](./services/): panduan per layanan (Mailchimp, Donorbox, Clearstream, …)
