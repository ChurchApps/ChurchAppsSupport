---
title: "Alur Kerja"
description: "Bangun papan gaya Kanban di B1 Admin untuk membimbing orang melalui langkah tindak lanjut dengan email, SMS, dan pemicu otomatis yang menambahkan orang secara otomatis."
---

# Alur Kerja

<div class="article-intro">

Alur kerja memindahkan orang melalui serangkaian langkah pada papan visual. Setiap orang menjadi kartu yang berpindah dari satu langkah ke langkah berikutnya, mulai dari tindak lanjut untuk tamu yang baru pertama kali datang, proses keanggotaan, ucapan terima kasih untuk pemberi persembahan pertama kali, hingga hal lain yang memerlukan pelacakan banyak orang melalui tahap yang sama. Sebuah langkah dapat meminta relawan melakukan sesuatu (menelepon, mengadakan percakapan) **dan** menjalankan tindakan otomatis sendiri, seperti mengirim email atau pesan teks, menunggu beberapa hari, atau menambahkan orang tersebut ke grup. Dengan demikian, Alur Kerja menangani tindak lanjut manusia sekaligus pekerjaan rutin di sekitarnya. Alur Kerja memperluas [Tugas](./tasks.md) menjadi papan Kanban seret-dan-lepas agar tidak ada yang terlewat.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Pastikan orang yang ingin Anda lacak sudah ada di B1 Admin
- Pelajari cara kerja [Tugas](./tasks.md), karena setiap kartu di papan adalah sebuah tugas
- Untuk menggunakan tindakan **Kirim email**, buat terlebih dahulu templat email yang ingin dikirim (dikelola di **Pengaturan → Templat Email**)
- Untuk menggunakan tindakan **Kirim teks**, hubungkan terlebih dahulu [penyedia pesan teks](../settings/church-settings.md#texting)
- Anda memerlukan izin Tugas yang sesuai. Melihat dan mengedit kartu serta mengelola alur kerja adalah tingkat izin yang terpisah (lihat [Peran & Izin](../settings/roles-permissions.md))

</div>

## Melihat Alur Kerja

Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas B1 Admin), perluas **Pelayanan**, lalu klik **Alur Kerja**. Alur kerja Anda ditampilkan dalam tabel yang memperlihatkan **Kategori** dan **Status** (**Aktif** atau **Nonaktif**) masing-masing. Jika Anda menggunakan kategori, tab di atas daftar memungkinkan Anda memfilter daftar berdasarkan kategori. Klik alur kerja mana pun untuk membuka papannya.

## Membuat Alur Kerja

1. Pada halaman Alur Kerja, klik **Tambah Alur Kerja**.
2. Pilih cara memulai:
   - **Alur kerja kosong** -- mulai dari awal dan susun langkah Anda sendiri.
   - **Dari templat** -- mulai dengan serangkaian langkah siap pakai yang dapat Anda edit. Templat bawaan meliputi:
     - **Tindak Lanjut Pengunjung Baru** -- Kirim email selamat datang → Telepon pribadi → Undang ke langkah berikutnya → Terhubung
     - **Kelas Keanggotaan** -- Menyatakan minat → Mendaftar kelas → Menghadiri kelas → Menyelesaikan keanggotaan
     - **Ucapan Terima Kasih untuk Pemberi Pertama Kali** -- Kirim catatan terima kasih → Bagikan dampak persembahan → Dikelola dengan baik
     - **Konfirmasi Penugasan Pelayanan** -- Minta dan tunggu respons → Telepon relawan tentang permintaan yang belum dijawab (lihat [Konfirmasi Penugasan Pelayanan](#serving-assignment-confirmations))

   Membuat langkah-langkah templat membutuhkan waktu sebentar. Selama proses berjalan, tombol **Tambah Alur Kerja** bertuliskan **Membuat...** dan tidak dapat diklik lagi, sehingga Anda tidak akan membuat alur kerja ganda. Jika terjadi kesalahan, halaman menampilkan pesan *"Alur kerja tidak dapat dibuat. Silakan coba lagi."*
3. Beri alur kerja tersebut **Nama**.
4. Opsional, tetapkan **Kategori** untuk mengelompokkan alur kerja yang terkait. Anda dapat membuat kategori baru langsung dari menu tarik-turun.
   Untuk alur kerja kosong, Anda juga memilih **Tujuan alur kerja**: **Tindak lanjut orang** (jenis yang umum) atau **Konfirmasi penugasan pelayanan**. Tujuan tidak dapat diubah setelah alur kerja dibuat.
5. Biarkan alur kerja **Aktif** agar orang dapat ditambahkan ke dalamnya, atau atur ke **Nonaktif** untuk menyembunyikannya dari daftar tambah ke alur kerja.
6. Klik **Simpan**.

:::tip
Gunakan tombol **Duplikasi** pada daftar Alur Kerja untuk menyalin alur kerja yang sudah ada -- termasuk langkah, tindakan otomatis, dan perutean-nya -- sebagai titik awal untuk alur kerja baru.
:::

## Membangun Papan dengan Langkah

Setiap papan alur kerja terdiri dari **langkah**, yang ditampilkan sebagai kolom dari kiri ke kanan. Buka alur kerja dan gunakan **Tambah Langkah** untuk membuat setiap tahap proses Anda.

Saat Anda menambah atau mengedit langkah, Anda dapat mengatur:

- **Nama Langkah** -- judul kolom (misalnya, "Panggilan Selamat Datang" atau "Menunggu Pendaftaran").
- **Jatuh tempo dalam (hari)** -- secara otomatis menetapkan tanggal jatuh tempo saat kartu masuk ke langkah ini. Kartu yang melewati tanggal jatuh tempo ditandai sebagai **Terlambat**.
- **Penanggung jawab default** -- orang atau grup yang secara otomatis ditugaskan untuk kartu baru pada langkah ini. Jika penanggung jawab default adalah seseorang, orang tersebut menerima notifikasi bahwa sebuah kartu telah ditugaskan kepadanya.
- **Tindakan otomatis** -- hal-hal yang dilakukan sistem sendiri saat kartu tiba (lihat di bawah).
- **Perutean** -- ke mana kartu pergi saat meninggalkan langkah (lihat [Perutean](#routing-cards-with-outcomes-and-conditions)).

Seret kolom langkah ke urutan yang sesuai dengan proses Anda. Urutan ini juga menentukan jalur default yang diambil kartu jika tidak ada perutean lain yang berlaku.

:::info
Simpan langkah baru terlebih dahulu. Tindakan otomatis dan perutean melekat pada langkah, sehingga editor baru membuka bagian tersebut setelah langkah ada.
:::

## Tindakan Otomatis

Setiap langkah dapat memiliki daftar **tindakan otomatis** yang berjalan sendiri pada saat kartu **masuk** ke langkah tersebut -- sebelum ada yang menyentuhnya. Dengan cara ini, sebuah langkah dapat sekaligus mengingatkan relawan *dan* menangani pekerjaan rutin di sekitar tindak lanjut.

Di editor langkah, buka **Tindakan otomatis**, klik **Tambah Tindakan**, pilih jenisnya, lalu isi pengaturannya. Tambahkan sebanyak yang Anda perlukan; tindakan dijalankan **dari atas ke bawah secara berurutan**. Klik **Simpan** pada langkah untuk menyimpan langkah beserta semua tindakannya sekaligus. Menghapus tindakan dengan ikon tempat sampahnya berlaku segera.

| Tindakan | Fungsinya |
|---|---|
| **Kirim email** | Mengirim email kepada orang tersebut menggunakan templat email yang Anda pilih. Anda dapat mengganti baris subjek. |
| **Kirim teks** | Mengirim pesan teks yang Anda tulis kepada orang tersebut, melalui [penyedia pesan teks](../settings/church-settings.md#texting) gereja Anda. |
| **Tunggu** | Menjeda kartu selama sejumlah hari sebelum dilanjutkan (lihat di bawah). |
| **Tambah ke grup** | Menambahkan orang tersebut ke [grup](../groups/index.md) yang Anda pilih. |
| **Hapus dari grup** | Menghapus orang tersebut dari grup yang Anda pilih. |
| **Catat Kehadiran** | Menandai orang tersebut hadir pada waktu ibadah grup yang sedang berlangsung (lihat di bawah). |
| **Tambah ke alur kerja** | Memulai orang tersebut pada alur kerja lain -- berguna untuk serah terima antarproses. |
| **Tambah catatan** | Mencatat catatan dalam riwayat kartu. |
| **Atur bidang** | Memperbarui bidang pada data orang tersebut: Status Keanggotaan, Status Pernikahan, Jenis Kelamin, Kota, Provinsi, atau Kode Pos. |
| **Webhook** | Mengirim detail kartu ke alamat web eksternal (URL) yang Anda berikan, untuk menghubungkan ke sistem lain. |
| **Buat tugas** | Membuat [tugas](./tasks.md) dengan judul dan deskripsi yang Anda masukkan, ditugaskan kepada siapa pun yang Anda pilih. |
| **Beri tahu Orang** | Mengirim email dan notifikasi B1 tentang kartu kepada staf atau relawan yang Anda pilih (lihat di bawah). |

Setelah semua tindakan sebuah langkah selesai, kartu **berhenti pada langkah tersebut** agar seseorang dapat menanganinya -- kecuali jika langkah memiliki rute otomatis yang memindahkannya ke depan (lihat [Langkah sepenuhnya otomatis](#fully-automated-steps)).

:::info
Tindakan otomatis hanya berjalan saat kartu tiba melalui alur normal -- ketika pertama kali ditambahkan, ketika hasil atau rute otomatis membawanya masuk, atau setelah Tunggu selesai. Tindakan **tidak** dijalankan ulang ketika anggota staf secara manual menyeret kartu ke langkah tersebut atau mengembalikannya, sehingga seseorang tidak menerima email yang sama dua kali.
:::

### Mengirim email

Pilih **Kirim email**, pilih salah satu templat email Anda, dan opsional ketik subjek khusus. Ketika kartu masuk ke langkah ini, orang tersebut menerima email itu secara otomatis. (Jika orang tersebut tidak memiliki alamat email tercatat, langkah ini hanya melewati tindakan tersebut.) [Bidang gabungan](../settings/email-templates.md#merge-fields) dalam templat, seperti `{{firstName}}`, akan diisi dengan data pribadi orang tersebut.

Ketika email terkirim, riwayat kartu mencatat **Email terkirim**. Jika tidak dapat dikirim -- misalnya, karena email gereja Anda belum disetujui atau batas harian telah tercapai -- tidak ada entri "Email terkirim" yang ditambahkan.

:::info
Email alur kerja hanya dikirim setelah gereja Anda disetujui untuk mengirim email grup, dan email tersebut dihitung terhadap batas email harian gereja Anda. Lihat [Mengaktifkan Email Grup untuk Gereja Anda](../groups/group-members.md#turning-on-group-email-for-your-church). Tindakan **Kirim email** memberi peringatan di editor langkah ketika email ini tidak akan terkirim: *"Email gereja Anda belum disetujui..."* jika persetujuan masih menunggu, atau *"Email gereja Anda dijeda..."* jika pesan terbaru dikembalikan atau dilaporkan sebagai spam.
:::

### Mencatat kehadiran

Pilih **Catat Kehadiran** dan klik **Pilih grup** untuk memilih grup yang kehadirannya harus dicatat. Saat tindakan berjalan, orang tersebut ditandai hadir pada waktu ibadah grup yang sedang berlangsung -- sama seperti jika ia telah melakukan check-in. Ini berguna bersama pemicu yang menambahkan orang ke alur kerja saat mereka tiba, sehingga mereka terhitung tanpa check-in terpisah.

- Kehadiran diukur pada saat kartu **dibuat**, sehingga **Tunggu** yang ada sebelumnya dalam alur kerja tidak akan mendorongnya melewati ibadah.
- Hanya waktu ibadah yang memiliki hari dan jam mulai yang dihitung. Jika tidak ada waktu ibadah grup yang sedang berlangsung pada saat itu, tidak ada yang dicatat dan riwayat kartu mencatat **Tidak ada ibadah terjadwal yang sedang berlangsung — kehadiran tidak dicatat**.
- Ketika kehadiran dicatat, riwayat kartu menampilkan **Kehadiran dicatat** diikuti nama grup. Menjalankan tindakan lagi untuk ibadah yang sama tidak menghitung orang tersebut dua kali.

### Memberi tahu seseorang

Pilih **Beri tahu Orang**, klik **Pilih orang**, dan opsional ketik **Pesan**. Ketika kartu masuk ke langkah ini, orang yang dipilih menerima email dan notifikasi B1 yang berisi nama orang pada kartu, nama alur kerja dan langkah, pesan Anda, serta tautan untuk membuka kartu. Gunakan fitur ini untuk memberi tahu staf atau pemimpin pelayanan -- misalnya, *"Beri tahu pendeta ketika seseorang mencapai langkah Wawancara Keanggotaan."* Riwayat kartu mencatat **Diberi tahu** diikuti nama orang tersebut.

### Mengirim teks

Pilih **Kirim Teks** dan ketik **Pesan teks** (maksimal 1.600 karakter). Ketika kartu masuk ke langkah ini, orang tersebut menerima pesan teks di ponsel. Untuk mempersonalisasi pesan, klik chip di bawah kotak pesan -- **Nama Depan**, **Nama Belakang**, **Nama Tampilan**, atau **Nama Gereja** -- untuk menyisipkan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, atau `{{churchName}}` di posisi kursor Anda. Masing-masing akan diisi dengan data orang tersebut saat teks dikirim.

- Jika orang tersebut tidak memiliki nomor ponsel tercatat, tidak ada teks yang dikirim dan riwayat kartu mencatat **Teks dilewati: tidak ada ponsel**.
- Jika orang tersebut telah berhenti berlangganan, tidak ada teks yang dikirim dan riwayat kartu mencatat **Teks dilewati: berhenti berlangganan**.
- Ketika teks terkirim, riwayat kartu mencatat **Teks terkirim**. Jika pengiriman gagal -- misalnya, karena tidak ada penyedia pesan teks yang terhubung atau kredit pesan teks gereja Anda habis -- kegagalan dicatat dalam riwayat kartu dan sisa tindakan pada langkah tetap dijalankan.

:::warning
Teks dikirim melalui [penyedia pesan teks](../settings/church-settings.md#texting) milik gereja Anda sendiri. Jika tidak ada penyedia yang terhubung, editor tindakan memberi peringatan *"Belum ada penyedia pesan teks yang disiapkan"* dan teks tidak akan terkirim.
:::

### Menunggu beberapa hari (urutan tetes)

Tindakan **Tunggu** menahan kartu selama jumlah hari yang Anda atur. Selama menunggu, kartu ditampilkan sebagai **Ditunda**. B1 memeriksa penundaan yang sudah selesai setiap 30 menit, sehingga kartu akan dilanjutkan dalam waktu sekitar setengah jam setelah penundaan berakhir. Ketika penantian selesai:

1. Setiap **tindakan yang tersisa pada langkah yang sama** dijalankan -- sehingga Anda dapat membuat urutan tetes seperti **Kirim email → Tunggu 3 hari → Kirim email pengingat**.
2. Kemudian, jika langkah memiliki rute otomatis, kartu berpindah; jika tidak, kartu berhenti pada langkah untuk ditangani seseorang.

:::tip
**Tunggu** di awal langkah adalah cara sederhana untuk "menahan" kartu sebelum ditampilkan kepada relawan -- misalnya, *Tunggu 7 hari, lalu seorang pembimbing menghubungi*.
:::

## Menambahkan Orang sebagai Kartu

Ada beberapa cara untuk menempatkan orang di papan:

- **Dari papan** -- Klik **Tambah Kartu** di bagian bawah kolom langkah dan pilih seseorang. Anda juga dapat memilih grup, dan setiap anggota grup tersebut ditambahkan sebagai kartu.
- **Dari data seseorang** -- Gunakan **Tambah ke Alur Kerja** pada halaman orang tersebut untuk memasukkannya ke alur kerja.
- **Dari pencarian Orang** -- Pilih beberapa orang dan gunakan tindakan massal **Tambah ke Alur Kerja** untuk menambahkan mereka sekaligus.
- **Otomatis dengan pemicu** -- Tambahkan orang ketika sesuatu terjadi, seperti pengiriman formulir atau pemberian pertama (lihat [Pemicu](#triggers) di bawah).

Menambahkan seseorang secara manual, atau dengan tindakan langkah **Tambah ke alur kerja**, tidak pernah memberi mereka kartu terbuka kedua pada alur kerja yang sama. Jika mereka sudah memiliki kartu terbuka, mereka dilewati (dalam penambahan massal, hanya orang yang belum memiliki kartu yang mendapatkan kartu baru). Setelah kartu mereka ditutup, Anda dapat menambahkan mereka lagi. Pemicu mengikuti pengaturan **Hanya sekali per orang** sendiri.

## Mengelola Papan

Buka alur kerja untuk melihat papannya. Setiap kartu menampilkan nama orang, siapa yang ditugaskan, serta chip jatuh tempo atau status (**Terlambat** atau **Ditunda**). Kolom langkah juga menampilkan lencana kecil untuk tindakan otomatis yang dijalankannya dan anotasi untuk perutean-nya, sehingga Anda dapat melihat sekilas bagaimana kartu mengalir.

- **Memindahkan kartu** -- Seret kartu dari satu kolom ke kolom berikutnya saat orang tersebut berkembang.
- **Membuka kartu** -- Klik dua kali kartu (atau klik satu kali) untuk membuka laci detailnya, tempat Anda dapat mengubah langkah, menugaskan ulang, menambahkan catatan, dan meninjau apa yang sudah terjadi.

Dari laci kartu, Anda dapat:

- **Tugaskan** kartu kepada orang atau grup lain.
- **Tunda** kartu selama 1 hari, 3 hari, atau 1 minggu untuk sementara menyembunyikan tanggal jatuh temponya.
- **Kembalikan** ke langkah sebelumnya atau **Lewati** ke langkah berikutnya.
- **Sematkan penugasan** -- pertahankan pemilik yang sama pada kartu meskipun berpindah antarlangkah. Secara default, saat kartu dipindahkan ke langkah baru, kartu ditugaskan ulang ke penanggung jawab default langkah tersebut; penyematan menjaga agar orang yang sama tetap bertanggung jawab sepanjang proses.
- **Selesaikan** kartu untuk menuntaskannya, atau pilih tombol **Hasil** jika langkah memiliki hasil yang dikonfigurasi (lihat [Perutean](#routing-cards-with-outcomes-and-conditions)).
- **Hapus kartu** -- Keluarkan kartu dari papan tanpa menyelesaikannya, misalnya ketika seseorang ditambahkan secara keliru. Setelah Anda mengonfirmasi, kartu ditutup dan dihapus dari daftar semua orang. Tidak ada hasil, rute, atau tindakan langkah yang dijalankan, dan riwayatnya disimpan dengan entri **Dihapus**. Untuk kartu [konfirmasi penugasan pelayanan](#serving-assignment-confirmations), menghapus kartu menutup permintaan dengan cara yang sama.
- **Tambahkan catatan** dan tinjau **Aktivitas** kartu -- catatan tindakan otomatis yang telah dijalankan (email terkirim, penundaan, dsb.), masing-masing dengan tanggal dan waktu terjadinya.

Untuk kartu tentang seseorang, laci juga menampilkan nomor ponsel dan email orang tersebut sebagai tautan yang dapat Anda ketuk untuk menelepon atau mengirim email, serta tautan **Lihat profil** jika Anda memiliki izin untuk melihat orang. Orang yang ditugaskan pada kartu dapat melihat nomor ponsel dan email meskipun tidak memiliki akses ke Orang.

Catatan disimpan bersama kartu. Siapa pun yang dapat membuka kartu -- termasuk orang atau grup yang ditugaskan -- dapat membaca catatan dan menambahkan catatan mereka sendiri. Orang yang tidak dapat membuka kartu tidak dapat melihat catatannya.

### Tindakan massal

Pilih kotak centang pada beberapa kartu untuk menanganinya bersama-sama. Untuk memilih setiap kartu dalam satu langkah sekaligus, centang kotak **Pilih semua** di header kolom langkah tersebut; centang lagi untuk menghapus pilihan. Sebuah bilah alat muncul, memungkinkan Anda **Selesaikan**, **Tunda**, **Tugaskan** (tugaskan ulang), atau **Pindahkan ke…** langkah lain untuk semua kartu yang dipilih sekaligus.

## Perutean Kartu dengan Hasil dan Kondisi

Perutean mengatur ke mana kartu pergi saat meninggalkan sebuah langkah. Buka editor langkah untuk mengonfigurasi dua jenis perutean.

### Tombol hasil

Hasil adalah tombol yang ditampilkan pada laci kartu ketika Anda menyelesaikan kartu pada langkah tersebut. Alih-alih satu tombol **Selesaikan**, Anda dapat menawarkan pilihan seperti "Bergabung dengan Grup" atau "Tidak Tertarik." Setiap hasil dapat:

- Mengirim kartu ke **langkah lain** dalam alur kerja ini,
- **Menyerahkan kartu** ke alur kerja lain sepenuhnya, atau
- **Menutup** kartu.

Dengan cara ini, satu keputusan dapat mencabangkan orang ke jalur yang berbeda.

### Perutean otomatis (bersyarat)

Rute otomatis memindahkan kartu ke depan **tepat saat kartu masuk ke langkah** (dan setelah tindakan otomatisnya selesai), tanpa ada yang mengkliknya, jika orang tersebut memenuhi sekumpulan kondisi. Tambahkan rute, pilih langkah tujuan, dan tentukan satu atau beberapa **kondisi** (misalnya, kampus, usia, atau status keanggotaan seseorang). Bidang teks dapat dicocokkan secara persis atau dengan **mengandung**, **diawali dengan**, atau **diakhiri dengan**. Rute tanpa kondisi cocok dengan semua orang.

Kondisi tanggal (Tanggal Hari Ini, Tanggal Lahir, atau Ulang Tahun Pernikahan) dapat membandingkan tanggal lengkap atau hanya sebagian -- hari dalam seminggu, **Tanggal dalam Bulan**, **Bulan**, atau jumlah tahun yang telah berlalu. Untuk Tanggal Lahir atau Ulang Tahun Pernikahan seseorang, **Tanggal dalam Bulan** menawarkan opsi relatif **Hari Ini**, sehingga kondisi seperti *Tanggal Lahir · Tanggal dalam Bulan = Hari Ini* cocok dengan orang yang ulang tahunnya jatuh pada tanggal hari ini. **Bulan** menawarkan **Bulan Sebelumnya**, **Bulan Ini**, dan **Bulan Berikutnya**. Nilai relatif seperti ini dihitung menggunakan zona waktu gereja Anda, sehingga sejalan dengan kalender hari gereja Anda, bukan kalender server.

Kelompok kondisi **Pemberian** memiliki **Pemberi tetap yang berhenti**, yang menemukan orang yang dulu memberi secara rutin lalu berhenti. Atur tiga angka: *Memberi setidaknya* **3** *dari* **12** *minggu terakhir, lalu tidak ada dalam* **3** *minggu terakhir* (ini nilai default). Minggu dihitung mundur dari hari ini dalam zona waktu gereja Anda, dan persembahan yang dikembalikan tidak dihitung. Fitur ini paling berguna pada [pemicu jadwal](#schedule-triggers) -- misalnya, aturan mingguan yang menambahkan pemberi yang berhenti ke papan tindak lanjut penggembalaan. Kondisi ini hanya melihat tanggal pemberian, tidak pernah jumlahnya, dan kartu maupun peringatan tidak pernah menampilkan jumlah. Karena kondisi ini mengungkap siapa yang telah berhenti memberi, hanya orang yang dapat melihat donasi yang dapat melihat opsi ini dan dapat menambahkan, mengubah, atau menghapusnya.

Jika kondisi sebuah rute tidak dapat diperiksa karena alasan tertentu, rute tersebut dianggap tidak cocok. Kartu tetap berada pada langkah (atau mengikuti rute lain yang cocok) alih-alih macet.

:::info
Pada papan, setiap kolom langkah menampilkan anotasi kecil yang menjelaskan perutean-nya -- misalnya, label hasil atau "jika cocok" diikuti panah menuju langkah atau alur kerja tujuan.
:::

## Langkah Sepenuhnya Otomatis

Anda dapat membuat sebuah langkah berjalan sepenuhnya sendiri, tanpa ada yang menanganinya. Berikan langkah itu **tindakan otomatis** dan tambahkan **rute otomatis** (tanpa kondisi) yang mengarah ke langkah berikutnya. Ketika kartu masuk, tindakan dijalankan, dan kemudian rute langsung memajukan kartu -- kartu melewati langkah ini begitu saja.

:::tip
Gabungkan ini dengan **Tunggu**: *Kirim email selamat datang → Tunggu 3 hari → otomatis lanjut ke langkah "Panggilan pribadi".* Email dan waktunya diurus untuk Anda, dan relawan hanya melihat kartu saat sudah waktunya sentuhan manusia.
:::

## Pemicu

Pemicu menambahkan orang ke alur kerja secara otomatis ketika sesuatu terjadi, sehingga Anda tidak perlu menambahkan kartu secara manual. Pada papan alur kerja, klik tab **Pemicu**, lalu **Tambah Pemicu**. Ada dua jenis:

### Pemicu peristiwa

Aktif segera setelah data berubah di B1. Pilih peristiwanya, lalu opsional tambahkan **kondisi** agar hanya orang yang cocok yang ditambahkan:

- **Orang · Dibuat / Diperbarui** -- misalnya, tambahkan siapa pun yang statusnya menjadi *Pengunjung* atau *Tamu* (status yang diberikan kepada orang yang mendaftar sendiri).
- **Donasi · Dibuat** -- misalnya, tambahkan pemberian pertama kali atau pemberian besar ke alur kerja ucapan terima kasih (cocokkan berdasarkan jumlah, dana, atau metode).
- **Grup · Anggota Bergabung** / **Grup · Dibuat**.
- **Formulir · Dikirim** -- tambahkan siapa pun yang mengirim formulir yang dipilih (cocok untuk kartu "Saya Baru" atau "Terhubung").

### Pemicu jadwal

Berjalan secara berulang -- harian, mingguan, bulanan, atau tahunan -- berdasarkan sekumpulan kondisi. Gunakan ini untuk jangkauan berbasis waktu, seperti *semua orang yang ulang tahunnya hari ini* (Tanggal Lahir · Tanggal dalam Bulan = **Hari Ini**, dengan bulan dicocokkan ke **Bulan Ini**) atau pemeriksaan *bulanan*. Bahkan tanpa **Hanya sekali per orang**, pemicu jadwal tidak akan menambahkan orang yang sama lagi dalam satu periode pengulangan (satu hari, minggu, bulan, atau tahun, sesuai frekuensi jalannya).

Untuk pemicu apa pun, Anda juga dapat mengatur:

- **Langkah awal** tempat kartu baru mendarat (defaultnya langkah pertama).
- **Hanya sekali per orang** -- agar orang yang sama tidak ditambahkan ke alur kerja dua kali oleh pemicu. Jika ini aktif, siapa pun yang sudah memiliki kartu pada alur kerja ini akan dilewati.
  - **Tambahkan lagi setelah kartunya ditutup** -- muncul ketika **Hanya sekali per orang** aktif. Centang untuk mengizinkan pemicu menambahkan seseorang lagi setelah kartu sebelumnya pada alur kerja ini ditutup. Seseorang tetap tidak pernah memiliki dua kartu terbuka pada alur kerja pada saat yang sama. Gunakan ini untuk hal-hal yang dapat terjadi lebih dari sekali, seperti tamu yang kembali atau proses tahunan.
- **Aktif** -- menyalakan atau mematikan pemicu tanpa menghapusnya.

:::tip
Pasangkan pemicu **Formulir · Dikirim** dengan templat **Tindak Lanjut Pengunjung Baru** untuk mengubah formulir "Kartu Koneksi" atau "Saya Baru" menjadi alur tindak lanjut otomatis.
:::

## Konfirmasi Penugasan Pelayanan

Jenis alur kerja khusus dapat menindaklanjuti [permintaan pelayanan](./plans.md#assigning-team-members) hingga setiap relawan menerima atau menolak. Alih-alih orang, setiap kartu pada papan ini melacak **satu penugasan** -- satu orang dalam satu posisi pada satu rencana. Dua peran atau dua layanan untuk orang yang sama mendapatkan kartu terpisah. Fitur ini bersifat opt-in: tidak ada yang berubah untuk sebuah rencana sampai Anda memilih alur kerja konfirmasi di pengaturannya.

### Menyiapkannya

1. Pada halaman Alur Kerja, klik **Tambah Alur Kerja** dan pilih templat **Konfirmasi Penugasan Pelayanan**. (Atau mulai **Alur kerja kosong** dan atur **Tujuan alur kerja** ke **Konfirmasi penugasan pelayanan**.) Membuat dari templat memerlukan izin untuk mengirim pesan teks, karena templat menyertakan langkah teks.
2. Tinjau langkah-langkahnya. Templat dimulai dengan:
   - **Minta dan tunggu respons** -- mengirim permintaan pelayanan melalui email dan pesan teks, menunggu 2 hari, mengirim email pengingat, menunggu 1 hari lagi, lalu secara otomatis memindahkan kartu ke depan.
   - **Telepon relawan tentang permintaan yang belum dijawab** -- langkah bagi seseorang untuk menelepon relawan, jatuh tempo dalam 1 hari. Atur **Penanggung jawab default** pada langkah ini. Jika tidak ada, kartu diberikan kepada pemimpin pelayanan, atau kepada tim pelayanan jika tidak ada pemimpin.
3. Edit waktu tunggu, pesan, dan langkah agar sesuai dengan gereja Anda.
4. Buka [pengaturan rencana](./plans.md#plan-settings) dan pilih alur kerja ini pada **Alur kerja konfirmasi**.

Alur kerja ini menggunakan tindakan **Kirim permintaan pelayanan** alih-alih **Kirim email** dan **Kirim teks**. Pilih **Email** atau **Pesan teks** dan, opsional, tulis **Pesan permintaan**. Permintaan selalu menyertakan peran, rencana, tanggal layanan, dan tautan untuk merespons; Anda dapat menggunakan `{{planName}}`, `{{positionName}}`, dan `{{serviceDate}}` dalam pesan Anda. Biarkan pesan kosong untuk menggunakan permintaan default. Preferensi notifikasi relawan, persetujuan pesan teks, penyedia pesan teks Anda, dan persetujuan email gereja Anda semuanya berlaku, dan setiap upaya yang dilewati atau diblokir dicatat pada kartu. **Kirim email**, **Kirim teks**, dan **Tambah ke alur kerja** tidak tersedia pada papan ini.

Tab **Pemicu** pada alur kerja konfirmasi menjelaskan bagaimana kartu dimulai alih-alih menawarkan pemicu, dan alur kerja ini tidak muncul dalam daftar **Tambah ke Alur Kerja** untuk orang.

### Cara kartu dimulai dan ditutup

- Kartu dimulai ketika Anda **Beri tahu** relawan pada rencana yang sudah dipublikasikan (lihat [Memberi Tahu Relawan](./plan-validation.md#notifying-volunteers)). Setiap penugasan baru yang belum dijawab mendapatkan satu kartu. Menyimpan, mempublikasikan, menyalin, atau mengisi otomatis rencana tidak menghubungi siapa pun dengan sendirinya, dan rencana yang masih berupa draf tidak mengirim apa pun.
- Relawan tetap menerima peringatan dalam aplikasi seperti biasa. Tindak lanjut email dan pesan teks berasal dari alur kerja.
- Ketika relawan **menerima atau menolak**, kartu mereka ditutup secara otomatis, bersama dengan tugas tindak lanjut apa pun yang terkait dengannya.
- Laci kartu menampilkan posisi, tanggal layanan, dan tautan ke rencana. Alih-alih **Selesaikan**, tombol bertuliskan **Catat tindak lanjut selesai**. Mengkliknya mencatat bahwa seseorang telah melakukan tindak lanjut, tetapi kartu tetap terbuka dan ditugaskan (ditampilkan sebagai **Menunggu respons**) hingga relawan merespons atau tenggat respons berlalu.
- Tenggat respons adalah akhir dari waktu ibadah terakhir tempat tim posisi tersebut bertugas. Jika rencana tidak memiliki waktu yang cocok, tenggatnya adalah akhir hari layanan. Jika belum ada yang menjawab pada saat itu, kartu ditutup dengan **Tenggat respons terlewati** dan tugas **Tinjau permintaan pelayanan yang belum dijawab** diberikan kepada pemilik kartu saat ini atau pemimpin pelayanan agar seseorang dapat memutuskan cara menutup posisi tersebut. Penugasan tetap **Belum dikonfirmasi**.
- Menghapus penugasan, mengubah orang, posisi, atau tanggal rencananya, mengembalikan rencana menjadi draf, atau mengganti rencana ke alur kerja konfirmasi yang berbeda akan menutup kartu. Kartu yang sudah ditutup tidak akan dibuka kembali oleh **Beri tahu** berikutnya; tambahkan penugasan baru untuk mengirim permintaan yang baru.

:::info
Untuk permintaan yang dikirim melalui alur kerja konfirmasi, [pengingat relawan](./plans.md#volunteer-reminders) hanya dikirim kepada relawan yang telah **menerima**, sehingga orang yang masih menunggu untuk merespons tidak menerima pengingat tambahan di atas tindak lanjut alur kerja.
:::

## Tugas Saya

Relawan dan staf tidak perlu mencari di setiap papan untuk menemukan pekerjaan mereka. Daftar **Kartu Saya** pada halaman **Pekerjaan Saya** menampilkan setiap kartu yang ditugaskan kepada pengguna saat ini di semua alur kerja. Untuk membukanya, klik **Kartu Saya** di bagian atas halaman Alur Kerja, atau buka **Pelayanan > Pekerjaan Saya** di menu Jump. Mengklik kartu membuka panel detailnya langsung di halaman Pekerjaan Saya, tempat Anda dapat menangani kartu atau menghapusnya tanpa meninggalkan halaman. Jika Anda dapat melihat alur kerja, panel juga memiliki tautan **Buka papan alur kerja** ke papan tempat kartu tersebut berada.

## Laporan

Buka alur kerja dan klik **Laporan** untuk melihat analitik alur kerja tersebut:

- **Terlambat** -- jumlah kartu yang melewati tanggal jatuh temponya.
- **Kartu per Langkah** -- berapa banyak kartu yang saat ini berada pada setiap langkah, ditampilkan sebagai diagram kolom.
- **Selesai (30 hari)** -- jumlah yang diselesaikan dalam 30 hari terakhir, ditampilkan sebagai diagram garis.

Gunakan ini untuk menemukan hambatan -- misalnya, langkah tempat kartu menumpuk dan tidak pernah maju.

## Artikel Terkait

- [Tugas](./tasks.md) -- item tindakan individual yang menjadi dasar kartu alur kerja
- [Formulir](../forms/index.md) -- membuat formulir yang dapat memicu alur kerja
- [Grup](../groups/index.md) -- grup tempat tindakan "Tambah ke grup" dapat menempatkan orang
- [Rencana Pelayanan](./plans.md) -- memilih alur kerja konfirmasi untuk permintaan pelayanan sebuah rencana
- [Peran & Izin](../settings/roles-permissions.md) -- mengatur siapa yang dapat melihat, mengedit, dan mengelola alur kerja
