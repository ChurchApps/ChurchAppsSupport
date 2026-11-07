---
title: "Orientasi Twilio Gereja (Draf)"
description: "Draf pengaturan Twilio milik gereja untuk B1, panduan pendaftaran publik, contoh kampanye, dan daftar periksa persetujuan."
---

# Draf orientasi Twilio milik gereja

:::caution Draf untuk integrasi yang diusulkan
Ini adalah alur kerja yang diusulkan. B1 kini memiliki pilihan **Twilio** dasar di **Settings > Texting** (Account SID, Auth Token, From Number, dan webhook STOP masuk) -- lihat [Pengaturan Gereja: Texting](../../b1-admin/settings/church-settings.md#texting). Kontrol pengaturan B1 tambahan, pemetaan persetujuan, dan langkah validasi di bawah ini adalah persyaratan untuk rilis mendatang, bukan petunjuk untuk mencari pengaturan yang sudah ada. Baca [proposal teknis](./twilio-byok-proposal.md) untuk ruang lingkup dan ketergantungan. Sumber Twilio diperiksa pada 22 Oktober 2026; verifikasi persyaratan terkini sebelum mengirimkan kampanye.
:::

## Susunan yang direkomendasikan

Gereja Anda memiliki akun Twilio berbayar, nomor telepon, Messaging Service, penagihan, dan pendaftaran kampanye sendiri. B1 akan mengirim melalui sumber daya tersebut menggunakan kredensial yang dimasukkan secara pribadi di pengaturan gereja. Pastikan setidaknya dua administrator gereja yang sesuai dapat mengakses akun Twilio, aktifkan keamanan akun, dan tetapkan seseorang yang bertanggung jawab atas persetujuan, balasan masuk, dan pemberitahuan penolakan.

Rilis pertama yang diusulkan di sini mencakup satu nomor lokal AS dan satu program pesan gereja yang dijelaskan dengan jelas. Contoh di bawah menggunakan program fiktif **Grace Community Church** bernama **Grace Church Updates** untuk perubahan jadwal layanan, pengingat acara, dan penjadwalan relawan. Ganti setiap nama, domain, frekuensi, kontak, dan tujuan dengan praktik nyata gereja. Ini adalah contoh spesifik gereja dari aturan Twilio, bukan kampanye yang sudah disetujui sebelumnya atau janji persetujuan.

## 1. Siapkan pengalaman pendaftaran publik B1

Terbitkan halaman seperti `https://www.example.org/text-updates` di situs web B1 gereja, dengan formulir B1 publik tersemat atau tautan yang jelas ke formulir publik mandiri. Terbitkan juga `https://www.example.org/privacy` dan `https://www.example.org/sms-terms`. Alamat-alamat tersebut hanyalah placeholder; kirimkan URL nyata yang dapat dijangkau.

Untuk formulir pendaftaran SMS yang diusulkan:

| Pengaturan | Konfigurasi yang direkomendasikan |
|---|---|
| Akses | Publik/tanpa batas; aktif selama peninjauan dan pendaftaran berkelanjutan; tersedia tanpa login |
| Mode formulir | Mode standar pada awalnya; mode percakapan memerlukan dukungan persetujuan eksplisit yang dijelaskan dalam proposal teknis |
| Seluler | Diberi label jelas dengan kode negara; wajib hanya saat memilih pendaftaran SMS jika digunakan di dalam formulir koneksi/acara umum |
| Pilihan SMS | Kotak centang opsional terpisah, tidak dicentang secara default, dan dipetakan ke program spesifik serta kolom seluler |
| Pengungkapan | Terlihat di samping pilihan SMS: gereja/program, tujuan dan frekuensi pesan, kemungkinan tarif, STOP, HELP, kontak dukungan, serta tautan Kebijakan Privasi dan Ketentuan SMS yang nyata dan dapat diklik |
| Tindakan lain | Tamu dapat mengirimkan kartu koneksi, mendaftar acara, atau meminta informasi tanpa ikut serta dalam SMS |
| Bukti | Simpan program, nomor telepon yang tepat, persetujuan yang dipilih, pengiriman sumber, waktu server, dan versi pengungkapan/kebijakan; jawaban formulir biasa saja saat ini tidak mendaftarkan seseorang |
| Otomatisasi orang/grup | Nonaktifkan pembuatan orang dan penugasan grup otomatis untuk pilot pendaftaran awal, kecuali telah ditinjau sesuai aturan pencocokan yang ada di gereja. Penugasan grup tidak pernah menjadi otorisasi SMS. |
| Otomatisasi yang ada | Jangan mendaftarkan setiap pengirim formulir atau anggota grup ke alur kerja pesan teks. Hanya pemetaan persetujuan terverifikasi yang diusulkan yang dapat mengotorisasi program tersebut. |
| Pesan terima kasih | Konfirmasi bahwa formulir telah diterima tanpa mengklaim pendaftaran SMS ketika kotak ditolak atau konfirmasi/peninjauan masih tertunda. |

Formulir yang ada dapat dijadikan contoh tampilan, tetapi B1 tetap membutuhkan catatan persetujuan dan gerbang pengiriman. Renderer bersama yang berlaku saat ini menampilkan deskripsi sebagai teks biasa; menulis Markdown atau URL di sana tidak cukup untuk memastikan tautan kebijakan dapat diklik. Implementasi harus menyediakan kontrol persetujuan yang dapat diakses beserta tautan yang sebenarnya. Lihat [membuat formulir B1](../../b1-admin/forms/creating-forms.md) dan [proposal teknis](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio mensyaratkan opt-in sukarela yang dapat diverifikasi. Jangan gabungkan SMS dengan ketentuan keanggotaan wajib, izin email/telepon, persetujuan donasi, atau pendaftaran acara. Nomor seluler pada kartu pengunjung dengan sendirinya bukan persetujuan SMS. Lihat [persyaratan persetujuan sukarela](https://www.twilio.com/docs/api/errors/30923) dari Twilio dan [rekomendasi kampanye](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Contoh teks pendaftaran

Gunakan ini hanya setelah gereja memilih tujuan, pengirim, dan frekuensi yang sebenarnya. Kotak centang bersifat opsional dan dimulai dalam keadaan tidak dicentang; nama-nama kebijakan di bawah harus berupa tautan dalam formulir yang ditampilkan.

> Ya, saya ingin Grace Community Church mengirimi saya pesan teks melalui Grace Church Updates tentang perubahan jadwal layanan, acara gereja, dan jadwal relawan dari [nomor gereja terdaftar]. Harap siap menerima hingga 4 pesan setiap bulan. Tarif pesan dan data mungkin berlaku. Balas STOP untuk berhenti berlangganan atau HELP untuk bantuan. Pendaftaran SMS bersifat opsional dan tidak diperlukan untuk menghadiri, mendaftar, atau memberi. Lihat Kebijakan Privasi dan Ketentuan SMS kami. Pertanyaan: [email atau telepon dukungan gereja].

"Hingga 4" adalah contoh komitmen, bukan batas yang ditetapkan Twilio. Gantilah dengan frekuensi yang benar-benar dapat dipenuhi gereja; jika frekuensi bervariasi, ungkapkan hal itu secara jujur dan jelaskan pola yang diharapkan. Ajakan promosi atau program pelayanan tambahan tetap di luar kotak centang ini, kecuali tujuan dan persetujuannya telah dinilai secara terpisah.

Untuk formulir pengunjung/acara umum, pengiriman dengan kotak ini tidak dicentang tetap harus berhasil. Formulir khusus SMS dapat menjelaskan bahwa mencentang kotak berarti meminta pendaftaran, tetapi tidak boleh membuat layanan gereja yang tidak terkait bergantung pada pendaftaran. Pastikan perilaku sebenarnya di ponsel dan desktop.

### Konten kebijakan yang harus disiapkan

Halaman privasi gereja harus menjelaskan informasi apa yang dikumpulkan untuk pesan teks, bagaimana informasi itu digunakan dan dilindungi, serta praktik retensi dan kontaknya. Halaman tersebut harus menyatakan dengan jelas bahwa nomor seluler dan persetujuan pesan tidak dijual atau dibagikan kepada pihak ketiga atau afiliasi untuk tujuan pemasaran atau promosi mereka. Jelaskan pemrosesan oleh penyedia layanan yang diperlukan secara akurat; jangan mengklaim bahwa gereja tidak pernah menggunakan prosesor padahal gereja menggunakan B1 dan Twilio. [Panduan kebijakan privasi](https://www.twilio.com/docs/api/errors/30908) dan [rekomendasi kampanye](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) dari Twilio menjadi acuan untuk perbedaan ini.

Ketentuan SMS harus mengidentifikasi gereja dan program, tujuan, frekuensi sebenarnya, kemungkinan biaya pesan, petunjuk STOP/HELP, kontak dukungan, dan tautan privasi; sertakan pengungkapan tambahan apa pun yang diminta dalam peninjauan Twilio saat ini. Cocokkan tautan kebijakan pada halaman persetujuan dengan URL yang dikirimkan dalam kampanye secara tepat. Sejak 30 Juni 2026, Twilio mensyaratkan URL privasi dan ketentuan publik yang khusus untuk pendaftaran kampanye API baru; alur Console-nya juga mengumpulkan URL tersebut. [Persyaratan Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Ini adalah persyaratan konten yang harus diterapkan pada kebijakan nyata gereja, bukan pengganti praktik privasi gereja yang sudah ada atau kebijakan generik yang ditempel tanpa pemeriksaan.

## 2. Daftarkan gereja dan program pesannya di Twilio

1. Buat atau gunakan **akun berbayar yang dimiliki gereja** dan nomor lokal AS yang mendukung SMS. Gunakan nama hukum gereja, EIN/informasi registrasi bisnis, alamat, situs web, dan perwakilan resmi secara konsisten. Jangan menggantikannya dengan identitas ChurchApps atau informasi gereja lain.
2. Ikuti alur registrasi Brand untuk pelanggan langsung Twilio sesuai jenis entitas gereja yang sebenarnya. Untuk organisasi nirlaba yang memenuhi syarat, gunakan [panduan registrasi nirlaba](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Kasus penggunaan amal/501(c)(3) bergantung pada kelayakan; nama gereja saja tidak menetapkan persetujuan atau pengecualian Twilio.
3. Buat Messaging Service khusus dan ajukan kampanye A2P 10DLC yang relevan. Pilih kasus penggunaan yang secara jujur sesuai dengan pesan nyata dan opsi yang tersedia untuk Brand yang disetujui tersebut; contoh di sini tidak menentukan kode kasus penggunaan gereja yang universal.
4. Berikan URL pendaftaran publik, URL kebijakan, deskripsi lengkap persetujuan dan alur pesan, serta contoh pesan yang diminta. Sertakan setiap metode pendaftaran nyata; sesuaikan deklarasi tautan tertanam/nomor telepon dengan konten sebenarnya. Jangan cantumkan pendaftaran melalui kata kunci atau opt-in ganda kecuali alur tersebut ada dan telah diuji.
5. Kaitkan nomor pengirim dengan layanan dan kampanye yang disetujui. Tunggu hingga **verifikasi kampanye dan registrasi nomor selesai** sebelum mengirim pesan.

Lakukan langkah-langkah ini di Twilio Console milik gereja sendiri. Integrasi B1 yang diusulkan tidak mengajukan registrasi untuk gereja. [Panduan cepat registrasi](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) dan [sumber daya kampanye](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) dari Twilio menjelaskan kolom registrasi dan statusnya. Nomor yang masih tertunda tetap dapat menghalangi pengiriman meskipun kampanye sudah disetujui. [Registrasi nomor](https://www.twilio.com/docs/api/errors/30035)

### Contoh deskripsi kampanye

> Grace Community Church menggunakan Grace Church Updates untuk mengirim perubahan jadwal layanan, pengingat acara gereja, dan pemberitahuan jadwal relawan kepada orang yang memilih program ini di situs web gereja kami. Kami tidak mengirim lebih dari empat pesan per bulan melalui program ini. Penerima dapat berhenti menerima pesan ini kapan saja. Program ini tidak mencakup kontak yang dibeli, promosi pihak ketiga, atau ajakan penggalangan dana.

Contoh ini hanya cocok untuk gereja yang benar-benar mematuhi batas dan pengecualian tersebut. Jika pengingat relawan saja melebihi frekuensi yang dijanjikan, ubah desain program dan pengungkapannya sebelum pengajuan.

### Contoh deskripsi alur pesan

> Pengunjung membuka [URL pendaftaran gereja yang sebenarnya], memasukkan nomor seluler mereka, dan secara mandiri memilih kotak opsional Grace Church Updates. Kotak tersebut tidak dicentang saat formulir dibuka. Pengungkapan menyebutkan Grace Community Church, menjelaskan perubahan jadwal layanan, pengingat acara, dan jadwal relawan, menyebutkan batas bulanan dan kemungkinan tarif, serta menjelaskan STOP dan HELP. Tautan Kebijakan Privasi dan Ketentuan SMS yang ditampilkan mengarah ke [URL privasi yang sebenarnya] dan [URL ketentuan SMS yang sebenarnya]. Menolak SMS tidak mencegah kehadiran, pendaftaran acara, pemberian, atau penggunaan formulir koneksi umum. B1 mencatat pilihan afirmatif, nomor telepon, waktu pengiriman, dan versi pengungkapan. Kami hanya mengirim program ini kepada pelanggan yang terdokumentasi dan menekan pengiriman lebih lanjut setelah penarikan persetujuan.

Sesuaikan paragraf ini dengan alur yang diimplementasikan. Jika konfirmasi telepon atau peninjauan staf digunakan, jelaskan status tertunda dan langkah aktivasi yang tepat. Jika metode lain digunakan, sertakan setiap metode beserta buktinya. Jika pendaftaran berada di balik login atau terjadi di atas kertas, Twilio meminta bukti publik yang telah disunting tentang pengalaman opt-in yang sebenarnya; jangan pernah memperlihatkan formulir yang sudah diisi atau data anggota. [Panduan opt-in yang dapat diverifikasi](https://www.twilio.com/docs/api/errors/30923)

### Contoh pesan keluar

Ini adalah contoh fiktif untuk disesuaikan; gunakan URL gereja yang asli dan ganti nilai dalam tanda kurung sebelum pengajuan. API kampanye Twilio menerima dua hingga lima contoh. Contoh harus mengidentifikasi gereja, mencerminkan tujuan yang dinyatakan, dan menyertakan petunjuk berhenti berlangganan. [Kolom contoh kampanye](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Layanan hari Minggu akan dimulai pukul [waktu] karena [alasan]. Rincian: [URL situs web gereja]. Balas STOP untuk berhenti menerima pesan.
```

```text
Grace Community Church: Pengingat bahwa [acara gereja] akan diselenggarakan pada [tanggal] pukul [waktu]. Informasi: [URL acara gereja]. Balas STOP untuk berhenti menerima pesan.
```

```text
Grace Community Church: Anda dijadwalkan untuk melayani di [tim] pada [hari] ini. Mohon tinjau jadwal Anda: [URL portal gereja B1]. Balas STOP untuk berhenti menerima pesan.
```

URL dalam tanda kurung menggambarkan variabel contoh; contoh yang dikirimkan harus menampilkan domain gereja yang sebenarnya dan gaya tautan yang sesungguhnya. Tautan ke jadwal mungkin memerlukan login, tetapi halaman pendaftaran dan kebijakan yang digunakan untuk peninjauan harus dapat ditinjau secara publik. Jangan sertakan catatan pribadi, informasi anak-anak, atau detail anggota yang dapat diidentifikasi dalam contoh persetujuan. Pastikan konten contoh konsisten dengan apa yang sebenarnya dikirim oleh templat B1; jangan menjanjikan kotak balasan atau perilaku pengingat tertentu yang tidak tersedia.

### Respons STOP, START, dan HELP

Gunakan Advanced Opt-Out Messaging Service dari Twilio untuk konfirmasi ini, dan sesuaikan identitas gereja/program serta detail dukungan. Contoh maksud respons:

- **STOP:** Konfirmasi bahwa Grace Church Updates telah dihentikan dan jelaskan cara yang didukung untuk melanjutkan.
- **START:** Konfirmasi dilanjutkannya program yang sama, termasuk identitasnya, frekuensi/tarif, dan petunjuk bantuan/berhenti sebagaimana diwajibkan oleh alur yang dikonfigurasi.
- **HELP:** Identifikasi Grace Community Church dan berikan kontak dukungan yang sebenarnya serta petunjuk berhenti berlangganan.

Jangan kirim konfirmasi B1 kedua jika Twilio sudah memberikan respons. Balasan HELP bukan pendaftaran. START tidak boleh mendaftarkan seseorang ke program gereja lain atau menampilkannya di direktori anggota. [Advanced Opt-Out Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Periksa paket persetujuan sebelum pengajuan

- [ ] Informasi hukum/Brand gereja yang sebenarnya, identitas situs web, dan tujuan kampanye saling sesuai.
- [ ] Halaman pendaftaran dan formulir aktif dapat dibuka tanpa login dalam jendela browser privat, termasuk di perangkat seluler.
- [ ] Kotak SMS dimulai dalam keadaan tidak dicentang dan dapat ditolak saat menyelesaikan tindakan utama pengunjung/acara.
- [ ] Tujuan program, pengirim, frekuensi sebenarnya, kemungkinan biaya, STOP, HELP, kontak dukungan, dan tautan kebijakan yang dapat diklik muncul di samping pilihan SMS.
- [ ] URL privasi/ketentuan yang diberikan kepada Twilio bersifat publik, berfungsi tanpa kredensial, dan mengidentifikasi gereja/program yang sama. Isi kebijakan sesuai dengan pemrosesan yang sebenarnya.
- [ ] Setiap contoh pesan sesuai dengan program, identitas pengirim yang sebenarnya, serta perilaku tautan/nomor telepon yang diharapkan. Kampanye menjelaskan setiap metode opt-in yang nyata.
- [ ] Tangkapan layar yang telah disunting menunjukkan formulir kosong, kotak centang/pengungkapan, dan tautan kebijakan seperti yang akan dilihat peninjau. Bukti tidak berisi catatan anggota maupun kunci.
- [ ] Gereja memiliki cara operasional untuk menyimpan bukti persetujuan dan menghormati penarikan persetujuan sebelum pengiriman, termasuk permintaan yang diterima melalui telepon/email.

Daftar ini membantu mengurangi ketidaksesuaian yang dapat dihindari; Twilio dan mitra peninjauannya yang membuat keputusan persetujuan. Pastikan halaman pendaftaran dan URL kebijakan yang sebenarnya tetap tersedia setelah persetujuan, bukan hanya selama peninjauan.

## 4. Hubungkan dan validasi integrasi B1 di masa depan

Setelah integrasi dirilis, pengaturan Texting yang diusulkan seharusnya mengumpulkan Account SID gereja, API Key SID/secret khusus, Auth Token webhook yang terpisah, Messaging Service SID, dan pengirim yang dipilih. Buat kunci hanya di Console gereja dan masukkan rahasia hanya di pengaturan B1 yang bersifat pribadi. [Panduan API key Twilio](https://www.twilio.com/docs/iam/api-keys)

Salin URL webhook masuk dan status pengiriman yang spesifik untuk gereja yang disediakan B1 ke konfigurasi layanan Twilio yang sesuai. Aktifkan Advanced Opt-Out dan pastikan pesan masuk sampai ke webhook yang telah dikonfigurasi. B1 seharusnya menampilkan pemeriksaan terpisah untuk kredensial, kepemilikan layanan/pengirim, kampanye terverifikasi, registrasi nomor yang selesai, verifikasi pesan masuk, dan pesan uji yang terkirim. Kredensial yang tersimpan atau permintaan API yang diterima bukan merupakan pengiriman akhir.

Jika B1 tidak dapat memeriksa sinyal registrasi secara terprogram, konfirmasi langsung di Console; antarmuka harus memberi label hasil bertanggal sebagai telah dikonfirmasi oleh administrator. Selesaikan status tertunda/gagal sebelum mengaktifkan pesan produksi. Gunakan pesan uji terpisah yang diminta secara eksplisit kepada penerima uji dewasa yang menyetujui, lalu:

1. Pastikan bahwa pendaftaran dokumentasi yang sesuai membuat catatan persetujuan telepon/program yang benar; menolak atau mengubah nomor telepon tidak boleh mendaftarkan penerima secara diam-diam.
2. Kirim satu pesan uji, konfirmasi penerimaannya, dan bandingkan status B1 dengan Message SID Twilio serta hasil pengirimannya.
3. Balas STOP dan periksa bahwa pesan manual, pesan grup, alur kerja, dan pengingat melewati nomor telepon tersebut. Visibilitas direktori seharusnya tidak berubah.
4. Jalankan alur berlangganan ulang untuk program yang sama dan respons HELP sesuai dokumentasi; verifikasi bahwa tidak ada konfirmasi ganda dan tidak ada perubahan preferensi yang tidak terkait.

## 5. Pelihara program

Tunjuk pemilik gereja yang bertugas memantau status kampanye/akun, peringatan saldo dan penagihan, kegagalan pengiriman, serta balasan masuk di Twilio. Rilis B1 pertama yang diusulkan tidak memiliki kotak masuk SMS percakapan, jadi terbitkan dan pantau kontak bantuan yang nyata serta periksa balasan, jangan berasumsi bahwa staf melihatnya di B1.

Simpan riwayat persetujuan dan penarikan, versi pengungkapan/kebijakan saat ini, identifikasi kampanye, dan bukti persetujuan yang telah disunting dalam catatan yang dikendalikan gereja. Jangan pernah menempelkan kunci atau daftar penerima ke tiket dukungan publik. Ketika nomor, layanan, kredensial, alur pendaftaran, frekuensi, atau tujuan berubah, periksa ulang integrasi dan perbarui registrasi/persetujuan jika diperlukan sebelum melanjutkan. Tinjau dengan cermat nomor rumah tangga yang dibagikan dan nomor yang telah berubah; kelayakan mengikuti telepon dan program yang menyetujui, bukan catatan setiap anggota keluarga.

Untuk penolakan, baca kesalahan Twilio yang sebenarnya, perbaiki ketidakkonsistenan spesifik di situs web dan pengajuan, lalu kirim ulang melalui Console gereja. Untuk pengirim yang belum terdaftar atau tertunda, tunggu hingga registrasi selesai alih-alih mengganti nomor untuk menghindarinya. Gunakan [panduan pemecahan masalah registrasi Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) dan referensi kode kesalahan yang disediakan. Jangan menjanjikan waktu penyelesaian yang pasti.
