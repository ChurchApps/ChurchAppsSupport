---
title: "Integrasi Twilio BYOK (Usulan)"
description: "Usulan integrasi Twilio milik gereja, model persetujuan, cakupan implementasi, dan kriteria rilis."
---

# Usulan integrasi Twilio BYOK

:::caution Usulan, bukan integrasi yang tersedia
Ini adalah rancangan untuk ditinjau oleh pengelola, berdasarkan sumber publik dan dokumentasi Twilio yang ditinjau pada 22 Oktober 2026. Sejak itu, penyedia Twilio dasar telah dirilis (`@churchapps/texting` 0.6.0 dan **Settings > Texting** di B1 Admin): gereja memasukkan Account SID, Auth Token, dan nomor pengirim (From). Penyedia ini juga menerima Messaging Service SID yang diawali `MG`, tetapi kolom `fromNumber` masih `varchar(20)`, terlalu pendek untuk SID 34 karakter. Pesan dikirim satu permintaan per penerima melalui Messages API Twilio, dan balasan STOP sampai ke B1 melalui webhook masuk yang sudah ada. Lihat [Pengaturan Gereja: Texting](../../b1-admin/settings/church-settings.md#texting). Model persetujuan, penanganan Advanced Opt-Out, status pengiriman, dan pemeriksaan kesiapan pengaturan di bawah ini masih berupa usulan, belum menjadi perilaku yang dirilis. [Rancangan onboarding gereja](./twilio-byok-onboarding-draft.md) yang menyertai dokumen ini berisi panduan pengaturan yang diusulkan dan contoh khusus gereja.
:::

## Jalur yang direkomendasikan

Tambahkan Twilio ke sistem penyedia texting B1 yang sudah ada, dengan **akun Twilio milik gereja, kredensial API, Messaging Service, dan nomor telepon yang mendukung SMS**. Gereja mendaftarkan badan hukumnya sendiri dan kampanye pesan, membayar Twilio secara langsung, menjaga persetujuan penerima, dan mengelola persetujuan di Twilio Console. ChurchApps menyediakan integrasi dan dokumentasinya.

Mulailah dengan satu program pesan, satu Messaging Service, dan satu pengirim lokal 10DLC AS per gereja B1. Dukung pesan individual, pesan kelompok, pesan alur kerja (workflow), dan pengingat opt-in melalui layar B1 yang sudah ada. Program awal yang wajar mencakup perubahan jadwal ibadah, pengingat acara, dan penjadwalan relawan, asalkan ketiganya dijelaskan dalam persetujuan dan kampanye yang disetujui milik gereja tersebut. Pesan penggalangan dana atau promosi memerlukan cakupan dan persetujuan yang dinilai secara terpisah; jangan menambahkannya diam-diam ke program ini.

| Tanggung jawab | Gereja | B1 / ChurchApps |
|---|---|---|
| Akun Twilio, penagihan, kepemilikan nomor | Memiliki dan mengelolanya | Tidak menyediakan akun platform atau menjual ulang kredit |
| Merek, kampanye, pendaftaran nomor | Mengirimkan informasi gereja yang akurat; menangani peninjauan dan koreksi | Menjelaskan prasyarat dan membaca informasi kesiapan yang tersedia |
| Halaman pendaftaran, kebijakan, tujuan pesan | Menerbitkan dan memeliharanya | Menyediakan kontrol formulir yang kompatibel, contoh, dan catatan persetujuan |
| Kelayakan penerima dan penanganan STOP | Meninjau bukti persetujuan dan meminta penarikan yang diterima di luar SMS | Menerapkan persetujuan, penekanan (suppression), izin, dan webhook yang ditandatangani |
| Pengiriman dan dukungan | Memantau kesalahan Twilio, kesehatan akun, dan balasan masuk | Menampilkan status pengajuan dan pengiriman tanpa menjanjikan jaminan persetujuan |

Tunda akun induk Twilio milik ChurchApps, subakun pelanggan, pembelian nomor, pengajuan Trust Hub, penagihan, kotak masuk percakapan, MMS/WhatsApp, pengiriman internasional, dan onboarding nomor bebas pulsa (toll-free). Nomor bebas pulsa adalah jalur pengirim terverifikasi yang terpisah, bukan jalan pintas untuk pendaftaran. Batasan ini menjaga rilis pertama tetap selaras dengan model bawa-penyedia-sendiri (bring-your-own-provider) B1 yang sudah ada.

## Fondasi yang ada dan kesenjangan

Pengamatan berikut terkait dengan snapshot sumber tertentu, bukan asumsi tentang apa yang saat ini sudah diterapkan:

| Komponen | Perilaku yang ada | Implikasi |
|---|---|---|
| [Registri penyedia dan kontrak](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` memiliki pengiriman tunggal/massal, validasi, kapabilitas subscriber/daftar opsional, dan ID pesan penyedia dalam hasil. Belum ada adaptor Twilio yang terdaftar. | Tambahkan Twilio di `@churchapps/texting`; tidak perlu membuat subscriber maupun daftar yang dikelola penyedia. |
| [Pengaturan texting](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church, dan Nalo dapat dipilih; MinistryStuff dibatasi oleh fitur. Pengeditan dan penyimpanan pengirim saat ini khusus untuk Nalo. | Tambahkan kolom Twilio yang eksplisit, validasi, penyimpanan pengirim, dan bantuan onboarding. Entri dropdown saja tidak cukup. |
| [Controller](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) dan [gateway modul](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Kredensial dienkripsi dan disamarkan; pengiriman manual maupun otomatis menentukan penyedia gereja. Pengiriman kelompok menghapus duplikasi nomor telepon yang sama. | Gunakan kembali jalur ini dan pertahankan otorisasi. Tempatkan gerbang persetujuan dan kesiapan yang baru di jalur server yang sama agar alur kerja tidak dapat melewatinya. |
| [Helper STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Mengurai `From`/`Body` bergaya Twilio; memvalidasi token URL gereja; mengatur `person.optedOut` dan menonaktifkan pengingat SMS. Balasan lain diabaikan. | Ini titik awal yang berguna, bukan webhook Twilio yang lengkap. Tambahkan tanda tangan Twilio dan status langganan SMS yang independen. |
| [Skema pesan](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Menyimpan `apiKey`, `apiSecret`, dan `fromNumber` 20 karakter; log pengiriman hanya mencatat keberhasilan/kesalahan langsung, bukan ID penyedia atau status pengiriman akhir. | Nomor pengirim E.164 sudah cocok; SID Messaging Service 34 karakter memerlukan kolom tersendiri. Tambahkan penyimpanan pesan dan status penyedia yang tahan lama. |
| [Halaman formulir publik](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [renderer formulir bersama](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx), dan [controller pengiriman formulir](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Formulir tanpa batasan dan kotak centang opsional sudah ada. Deskripsi berupa teks biasa. Pengiriman menyimpan jawaban, tetapi jalur texting tidak memiliki buku besar persetujuan khusus kampanye. | Tambahkan kontrol persetujuan SMS yang dikonfigurasi dengan tautan kebijakan yang nyata dan pencatatan bukti di sisi server. Kotak centang generik atau keanggotaan grup tidak boleh otomatis memberikan izin SMS. |

[Dokumentasi pengaturan gereja untuk pengguna](../../b1-admin/settings/church-settings.md#texting) juga menjelaskan bahwa flag opt-out saat ini dipakai bersama dengan privasi direktori. Keterkaitan ini adalah masalah rilis: membalas START tidak boleh mengubah visibilitas direktori.

## Desain konfigurasi dan kredensial

Gunakan kolom konfigurasi yang eksplisit dan bersifat tambahan, alih-alih memaksakan `fromNumber` atau menyimpan data terstruktur dalam string kunci API:

| Kolom | Tujuan yang diusulkan |
|---|---|
| `accountSid` | Identifier akun/proyek Twilio milik gereja (`AC…`) |
| `apiKey`, `apiSecret` | SID Kunci API Twilio khusus (`SK…`) dan rahasianya untuk akses API keluar; dienkripsi dan disamarkan |
| `webhookAuthToken` | Auth Token akun yang digunakan SDK Twilio untuk memvalidasi tanda tangan masuk; dienkripsi dan disamarkan secara terpisah |
| `messagingServiceSid` | Messaging Service gereja (`MG…`, 34 karakter) |
| `fromNumber` | Nomor yang mendukung SMS dan dipilih, dalam format E.164, diverifikasi sebagai pengirim di akun/layanan tersebut |
| Konfigurasi program | ID program yang stabil, nama, tujuan yang diizinkan, URL pendaftaran/kebijakan, dan versi pengungkapan |

[Twilio menyarankan kunci API untuk autentikasi REST](https://www.twilio.com/docs/iam/api-keys). Gunakan izin kunci yang paling sempit dan sudah diuji yang mencakup pengiriman serta pemeriksaan pengaturan hanya-baca yang diperlukan. Auth Token akun tetap diperlukan untuk [pemeriksaan tanda tangan webhook Twilio standar](https://www.twilio.com/docs/usage/security). Jelaskan perbedaan ini di antarmuka; rahasia API bukan Auth Token webhook. Simpan kredensial hanya di penyimpanan pengaturan sisi server, jangan pernah di halaman publik, jawaban formulir, permintaan kirim dari browser, atau laporan dukungan.

Gereja membuat dan mengelola sumber daya ini di Console. Tindakan validasi B1 hanya boleh membaca layanan, pengirim, dan informasi pendaftaran yang dikonfigurasi. Tindakan itu tidak boleh membeli nomor, membuat kampanye, mengubah pengaturan Twilio, atau mengirim pesan uji sebagai efek samping. Sediakan tindakan kirim uji yang terpisah dan eksplisit, yang hanya ditujukan kepada satu penerima yang memenuhi syarat dan telah menyetujui.

Pertahankan kredensial yang disamarkan hanya saat mengedit penyedia yang sama yang sudah tersimpan. Saat beralih ke Twilio, wajib mengisi kredensialnya sendiri dan hapus nilai lama yang khusus penyedia; jangan membawa kunci Clearstream atau Nalo yang disamarkan ke konfigurasi Twilio.

Batasi setiap pemuatan/pembaruan pada gereja B1 yang terautentikasi. Kaitkan callback dengan integrasi yang tersimpan dan akun/layanan/pengirim Twilio yang diharapkan, serta tolak penugasan lintas-gereja yang bertentangan. Rotasi kredensial dan pemutusan penyedia harus membatalkan status kesiapan dan menjeda pengiriman yang masuk antrean, tanpa menghapus catatan persetujuan atau riwayat pengiriman.

## Persetujuan dan penekanan adalah pekerjaan rilis yang wajib

Perkenalkan catatan langganan yang terikat pada nomor telepon untuk program Twilio, beserta peristiwa persetujuan/penekanan yang bersifat hanya-tambah (append-only). Bukti minimum yang disarankan: ID gereja, ID program, nomor telepon yang dinormalisasi, asosiasi orang terverifikasi (opsional), tindakan afirmatif, ID formulir/pengiriman sumber atau bukti eksternal yang telah ditinjau, timestamp server, teks/versi pengungkapan, URL sumber, URL kebijakan, serta peristiwa penarikan dan pengaktifan kembali. Batasi akses dan retensi sesuai kebijakan keamanan data gereja yang berlaku.

Gunakan status seperti `unknown`, `pending`, `active`, dan `suppressed`. Nomor ponsel yang sudah ada, kontak yang diimpor, kehadiran, donasi, keanggotaan grup, `person.optedOut = false`, dan `allowSms` bukan persetujuan afirmatif untuk program. Mengimpor persetujuan yang terdokumentasi harus berupa tindakan yang diotorisasi dan diaudit dengan sumber yang dicatat; migrasi tidak boleh mendaftarkan semua orang.

Untuk alur web awal, gunakan mode formulir publik standar B1. Tambahkan pertanyaan persetujuan SMS yang dikonfigurasi secara eksplisit, yang awalnya tidak dicentang, bersifat opsional, menampilkan tautan kebijakan yang dapat diklik, dan dipetakan ke satu program serta satu kolom ponsel. Validasi pemetaan itu di server dan simpan snapshot pengungkapan yang ditampilkan saat menyimpan respons afirmatif. Jangan pernah menurunkan persetujuan dari label pertanyaan yang sembarangan, AI percakapan, atau keanggotaan alur kerja. Aktifkan padanan percakapan hanya setelah interaksi afirmatif yang eksplisit dan pencatatan bukti telah diuji.

Pengiriman formulir yang tidak dicentang tidak membuat langganan dan tidak boleh menarik persetujuan yang sudah ada dari orang lain. Kaitkan persetujuan dengan nomor telepon yang dikirimkan; staf dapat menyelesaikan asosiasi orang yang ambigu tanpa menggabungkan catatan rumah tangga. Nomor ponsel yang berubah memerlukan persetujuan tersendiri. Untuk formulir anonim, terapkan kontrol penyalahgunaan dan buat secara eksplisit setiap verifikasi kepemilikan nomor atau langkah konfirmasi ganda (double opt-in); kotak yang dicentang saja tidak membuktikan siapa pemilik telepon. Jika konfirmasi digunakan, biarkan langganan berstatus pending hingga konfirmasi selesai dan jelaskan alur yang tepat itu dalam materi pendaftaran.

Untuk Twilio, pisahkan penekanan SMS dari visibilitas direktori. Secara konservatif, migrasikan opt-out lama apa pun menjadi catatan penekanan; penerima lama lainnya dibiarkan `unknown`. Pendaftaran baru yang eksplisit dan terdokumentasi dapat membentuk persetujuan SMS sementara privasi direktori tetap tidak berubah. Pertahankan perilaku penyedia lain hingga migrasi mereka ditinjau secara terpisah.

Pada setiap pengiriman aktual, pastikan integrasi gereja aktif/siap, persetujuan program terkini untuk nomor yang tepat, tidak ada penekanan tingkat nomor, dan izin pemanggil yang ada terpenuhi. Pengingat juga harus menghormati `allowSms`, preferensi kategori, dan jam tenang (quiet hours). Lakukan pemeriksaan ulang setelah masuk antrean, selesaikan field gabungan (merge fields), normalisasi dan validasi nomor, serta hapus duplikasi berdasarkan nomor telepon. STOP menekan semua pengiriman untuk layanan/program tersebut, termasuk pengiriman manual dan alur kerja; STOP juga harus berlaku untuk setiap orang yang berbagi nomor telepon itu.

Tampilkan identitas gereja dan instruksi STOP secara konsisten di jalur pengiriman Twilio yang umum, dan pratinjau jumlah SMS/segmen akhir. Perluasan field gabungan dan penanganan panjang harus mempertahankan elemen tersebut; jangan memotong instruksi opt-out secara diam-diam. Pastikan contoh dan templat pengingat/alur kerja yang sebenarnya tetap selaras.

## Pengiriman, balasan, dan status pengiriman Twilio

Implementasikan `TwilioProvider.sendMessage` melalui Messages API dengan Messaging Service dan pengirim yang dipilih. Kembalikan SID pesan penyedia dan hasil diterima/diajukan; penerimaan HTTP bukan pengiriman ke ponsel penerima. Pengiriman kelompok menggunakan hasil per penerima sesuai urutan input.

Batasi konkurensi keluar untuk **baik** `sendBulk` maupun pengiriman individual: cabang field gabungan saat ini memecah panggilan `sendMessage` secara paralel. Simpan niat pengiriman dan pekerjaan yang dapat diklaim untuk kelompok yang tidak muat dalam anggaran satu permintaan; gunakan kembali model deployment yang ada alih-alih meminta gereja menjalankan layanan lain. Coba ulang kegagalan sementara atau batas laju yang diketahui dengan backoff. Perlakukan timeout yang ambigu sebagai hasil yang tidak diketahui untuk direkonsiliasi, bukan instruksi untuk mengirim ulang secara membabi buta yang berisiko menimbulkan pesan dan biaya ganda.

Konfigurasikan URL callback masuk dan callback status khusus gereja. Validasi `X-Twilio-Signature` dengan SDK, URL eksternal yang dikonfigurasi secara tepat, parameter formulir asli, dan Auth Token akun yang sesuai. URL rahasia saja tidak cukup. Cocokkan callback dengan catatan gereja/akun/pesan yang tersimpan, tangani duplikat dan callback yang tiba sebelum hasil pengiriman dicatat, serta cegah peristiwa lama menimpa status terminal. Kembalikan TwiML kosong untuk pengakuan pesan masuk dan respons sukses yang sesuai untuk peristiwa status. [Keamanan Twilio](https://www.twilio.com/docs/usage/security), [callback status](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Rekomendasikan **Advanced Opt-Out** pada Messaging Service. Twilio yang menangani konfirmasi STOP/START/HELP; B1 menggunakan peristiwa `OptOutType` yang terautentikasi tanpa mengirim konfirmasi ganda. STOP langsung mencatat penekanan. START hanya memulihkan langganan yang sudah diketahui untuk program yang sama dan telah diungkapkan, dengan peristiwa restart baru; START tidak boleh membuat nomor baru ikut dalam pesan lain yang tidak terkait atau mengaktifkan preferensi pengingat. HELP tidak mendaftarkan siapa pun. Balasan masuk lainnya tetap di luar cakupan kotak masuk B1; gereja memerlukan cara yang terdokumentasi untuk memantaunya di Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Simpan SID pesan Twilio, pengikatan akun/layanan, waktu pengajuan, status/kode kesalahan akhir, dan waktu callback bersama log pengiriman. Tampilkan status antre/diterima, terkirim, gagal, tidak terkirim, atau tidak diketahui secara akurat. Pertahankan kontrak respons yang ada untuk penyedia lain, dan tentukan apakah jumlah keberhasilan agregat mewakili pengajuan atau pengiriman.

## Kesiapan pengaturan dan validasi persetujuan

Tampilkan titik pemeriksaan yang terpisah untuk kredensial, kepemilikan layanan/pengirim, verifikasi kampanye, pendaftaran nomor, pemeriksaan webhook, dan tes asap (smoke test) pengiriman yang berhasil. Jangan pernah menampilkan satu lencana hijau “disetujui” hanya karena kredensial berfungsi.

Untuk nomor lokal AS, baca [sumber daya Usa2p campaign](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) milik layanan dan pastikan kampanye yang relevan berstatus `VERIFIED`. Verifikasi secara terpisah bahwa nomor telepon yang dipilih terkait dengan layanan itu dan telah menyelesaikan pendaftaran nomor; kampanye yang sudah disetujui masih bisa memiliki nomor yang tertunda. Jika API baca yang didukung tidak menampilkan sinyal yang diperlukan, tampilkan **diperlukan verifikasi manual di Console** dan catat konfirmasi bertanggal dari administrator gereja sebagaimana adanya; jangan memberi label bahwa itu telah diverifikasi melalui API. Peristiwa pendaftaran nomor otomatis dapat menjadi tindak lanjut. [Kesalahan pendaftaran nomor](https://www.twilio.com/docs/api/errors/30035), [peristiwa registrasi A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Pastikan pemeriksaan terkini sebelum mengaktifkan pengiriman; catat kapan dan bagaimana kesiapan diperiksa, batalkan pemeriksaan yang sudah usang, dan jeda pengiriman saat kredensial dicabut, pengirim berubah, pendaftaran gagal, atau kesalahan akun terus berulang. Keberhasilan tes asap hanya mengonfirmasi jalur yang diuji, bukan persetujuan operator seluler secara universal atau persetujuan penerima. Rancangan pendamping menjelaskan pemeriksaan operasional gereja sebelum pengajuan, sebelum peluncuran, dan berkelanjutan.

## Repositori dan rencana rilis

[Panduan kontribusi organisasi](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) mengarahkan permintaan fitur B1 ke ChurchAppsSupport dan PR implementasi ke repositori pemiliknya. Gunakan satu permintaan fitur pusat dan tautkan PR implementasi yang terfokus ke permintaan tersebut:

1. **ChurchAppsSupport:** tinjau desain ini dan rancangan onboardingnya sebelum menyajikan Twilio sebagai fitur pengguna yang tersedia.
2. **Packages:** tambahkan adaptor Twilio, konfigurasi/antarmuka bersama yang eksplisit, dan perenderan formulir persetujuan SMS jika digunakan bersama oleh B1Admin/B1App. Sertakan changeset dan publikasikan melalui alur rilis yang ada sebelum memperbarui konsumen.
3. **Api:** tambahkan migrasi tambahan untuk metadata integrasi, persetujuan/penekanan, dan status pengiriman; implementasikan validasi konfigurasi, gerbang pengiriman bersama, pencatatan bukti formulir, penanganan webhook, dan penyimpanan dispatch.
4. **B1Admin:** tambahkan UI konfigurasi/kesiapan Twilio, pengelolaan program/persetujuan, penyimpanan pengirim yang sadar-penyedia, dan pelaporan pengiriman yang akurat. Jangan sediakan penggantian persetujuan SMS melalui pengeditan orang biasa.
5. **B1App:** verifikasi pengalaman halaman/formulir publik dan tautan kebijakan terhadap kontrol bersama, termasuk pengunjung anonim dan seluler. Tidak diperlukan klien browser Twilio terpisah.
6. **ChurchAppsSupport:** setelah rilis, ubah rancangan onboarding menjadi halaman bantuan/pengaturan yang didukung, tambahkan tangkapan layar yang sebenarnya, tautkan dari pengaturan Texting, dan atur terjemahannya.

Deploy skema dan paket bersama sebelum konsumen. Batasi Twilio dengan fitur gate untuk pilot opt-in kecil; penyedia yang ada harus tetap berfungsi. Rollback menonaktifkan dispatch Twilio dan membatalkan pekerjaan yang belum diajukan, sambil mempertahankan opt-out dan bukti; rollback tidak boleh secara otomatis mengalihkan penerima ke penyedia atau pengirim lain.

## Estimasi upaya

Estimasi perencanaan untuk kontributor yang familiar dengan ekosistem; tidak ada kredensial produksi atau SMS sungguhan yang digunakan dalam penilaian ini:

| Pekerjaan | Hari pengembang |
|---|---|
| Adaptor, perluasan konfigurasi/skema, UI pengaturan | 2–3 |
| Persetujuan telepon/program, penekanan independen, gerbang pengiriman bersama, integrasi formulir publik | 3–5 |
| Callback yang ditandatangani, penyimpanan pengiriman, dispatch yang dibatasi/tahan lama | 2–3 |
| UI kesiapan, panduan gereja, pengujian integrasi/regresi, perbaikan pilot | 3–4 |
| **Cakupan peluncuran yang direkomendasikan** | **10–15 total** |

Proof of concept adaptor/pengaturan dasar memerlukan sekitar 1–2 hari. Estimasi pengirim saja tidak mencakup pekerjaan persetujuan dan onboarding yang diperlukan untuk rekomendasi ini. Waktu tinjauan eksternal Twilio/operator seluler terpisah dan bervariasi; proyek tidak boleh menjanjikan tanggal persetujuan atau hasil persetujuan.

## Kriteria penerimaan

- [ ] Gereja memiliki dan membayar akun, layanan, pengirim terdaftar, dan kampanye; tidak diperlukan akun Twilio yang dikelola ChurchApps.
- [ ] Kredensial dienkripsi/disamarkan, dibatasi per tenant, dapat dirotasi, dan tidak ada di log/konten publik; validasi bersifat hanya-baca.
- [ ] Kotak persetujuan opsional yang tidak dicentang menampilkan tautan kebijakan yang nyata dan menyimpan bukti program/telepon/pengungkapan di sisi server; menolak tetap memungkinkan tindakan formulir utama.
- [ ] Semua jalur manual, kelompok, field gabungan, alur kerja, dan pengingat menerapkan gerbang kelayakan Twilio yang sama. Penerima yang tidak diketahui, tanpa persetujuan, dengan nomor yang berubah, atau ditekan dilewati dengan alasan yang berguna; perenderan mempertahankan identitas gereja/instruksi STOP setelah perluasan dan penanganan panjang.
- [ ] Privasi direktori lama tidak mendaftarkan penerima; STOP/START tidak pernah mengubah visibilitas direktori atau preferensi yang tidak terkait. Kasus nomor telepon bersama dan lintas-gereja diuji.
- [ ] STOP/START/HELP yang ditandatangani, tanda tangan tidak valid, akun/layanan yang salah, peristiwa duplikat, pengiriman formulir yang diputar ulang (replay), dan pemetaan persetujuan yang dipalsukan tercakup dalam pengujian.
- [ ] Ukuran kelompok/timeout, batas laju, kegagalan sebagian, hasil yang ambigu, race condition callback, dan peristiwa pengiriman yang tidak berurutan diuji tanpa pengiriman ganda.
- [ ] Persetujuan kampanye dan pendaftaran nomor yang selesai dibedakan dari validasi kredensial. Bukti manual diberi label dengan jelas; kesiapan yang usang atau dicabut memblokir pengiriman.
- [ ] Gereja pilot memeriksa halaman pendaftarannya, jalur formulir yang ditolak dan diterima, URL kebijakan yang tepat, dan penerima uji yang telah menyetujui melalui pengiriman, pengiriman ke penerima, penekanan STOP, dan pengaktifan kembali yang diizinkan.
- [ ] Pengaturan dan perilaku pengiriman Clearstream, Text In Church, dan Nalo yang ada lolos pemeriksaan regresi; teks bantuan membedakan usulan dari fitur yang dirilis.
