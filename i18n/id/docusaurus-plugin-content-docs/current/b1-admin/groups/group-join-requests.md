---
title: "Permintaan Bergabung ke Grup"
---

# Permintaan Bergabung ke Grup

<div class="article-intro">

Ketika sebuah grup dikonfigurasi dengan kebijakan bergabung yang memerlukan persetujuan, orang-orang dapat mengirimkan permintaan untuk bergabung. Pemimpin grup dan administrator meninjau permintaan ini dan menyetujui atau menolaknya. Dengan cara ini, gereja Anda tetap memegang kendali atas keanggotaan grup sekaligus memudahkan orang-orang untuk menyatakan minat bergabung.

</div>

## Video Pelatihan

<YouTube id="1vj-suCiIsE" title="Permintaan Bergabung ke Grup dan Kalender Grup di B1" next="Mengatur Layanan dan Kehadiran di B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin untuk mengelola grup, atau Anda harus menjadi pemimpin dari grup tertentu. Lihat [Peran & Izin](../people/roles-permissions.md) untuk detailnya.
- Grup harus memiliki kebijakan bergabung yang diatur ke **Permintaan** (memerlukan persetujuan). Lihat [Membuat Grup](./creating-groups.md) untuk cara mengonfigurasi kebijakan bergabung.

</div>

## Memahami Kebijakan Bergabung

Grup dapat memiliki tiga kebijakan bergabung yang berbeda:

- **Terbuka** -- Siapa pun dapat langsung bergabung tanpa persetujuan
- **Permintaan** -- Orang-orang mengirimkan permintaan bergabung yang memerlukan persetujuan
- **Tertutup** -- Tidak ada yang dapat meminta untuk bergabung (anggota harus ditambahkan secara manual)

Ketika grup menggunakan kebijakan **Permintaan**, semua upaya bergabung melalui alur persetujuan yang dijelaskan pada halaman ini.

## Melihat Permintaan yang Tertunda

### Untuk Pemimpin Grup

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) dan pilih **People > Groups**
2. Klik nama grup
3. Bagian **Members** menunjukkan berapa banyak permintaan yang tertunda. Klik **All members** -- permintaan tertunda untuk grup ini akan muncul di bagian atas daftar anggota

### Untuk Administrator

Administrator dengan izin pengelolaan grup dapat melihat permintaan tertunda di semua grup:

1. Di menu Jump, pilih **People > Groups**
2. Klik tombol **pending requests** di header halaman (misalnya, "3 pending requests"). Tombol ini hanya muncul ketika ada permintaan yang menunggu.
3. Tinjau semua permintaan tertunda di seluruh gereja

## Meninjau Permintaan Bergabung

Setiap permintaan bergabung menampilkan:

- **Nama dan foto orang tersebut** -- Orang yang meminta untuk bergabung
- **Pesan opsional** -- Pesan pribadi yang menjelaskan alasan mereka ingin bergabung (jika diberikan)
- **Tanggal permintaan** -- Kapan permintaan dikirimkan

Untuk meninjau permintaan:

1. Baca pesan orang tersebut jika mereka memberikannya
2. Klik nama orang tersebut untuk melihat profilnya jika diperlukan
3. Putuskan apakah akan menyetujui atau menolak

## Menyetujui Permintaan

1. Klik **Approve** pada permintaan bergabung
2. Orang tersebut langsung ditambahkan ke grup sebagai anggota
3. Pemohon menerima notifikasi bahwa permintaannya disetujui
4. Permintaan ditandai sebagai disetujui dalam sistem

:::tip
Ketika Anda menyetujui permintaan, orang tersebut menjadi anggota grup biasa. Anda kemudian dapat mempromosikan mereka menjadi pemimpin grup jika diperlukan dari halaman [Anggota Grup](./group-members.md).
:::

## Menolak Permintaan

1. Klik **Decline** pada permintaan bergabung
2. Secara opsional, berikan alasan penolakan (hingga 500 karakter)
3. Klik **Confirm**
4. Pemohon menerima notifikasi beserta alasan penolakan Anda (jika diberikan)
5. Permintaan ditandai sebagai ditolak

:::info
Memberikan alasan penolakan membantu orang tersebut memahami mengapa permintaannya tidak disetujui dan dapat mendorong mereka untuk mencoba lagi nanti atau menjelajahi grup lain.
:::

## Menyetujui dari Halaman Tugas

Setiap permintaan bergabung juga membuat tugas di bawah **Pelayanan &rarr; Pekerjaan Saya**, dengan judul "*Person* meminta untuk bergabung dengan *Group*." Tugas ini ditugaskan kepada pemimpin grup. Jika grup belum memiliki pemimpin, tugas akan diberikan kepada staf mana pun yang memiliki izin **Group Members &gt; Edit**, atau kepada admin domain gereja Anda jika tidak ada yang memiliki izin tersebut. Staf dan admin yang menerima tugas dengan cara ini juga mendapatkan notifikasi yang langsung menautkan ke tugas tersebut.

Membuka tugas akan menampilkan nama pemohon, grup, dan pesan opsional mereka, dengan tombol **Approve** dan **Decline** langsung pada kartu tugas (Decline membuka kolom alasan opsional yang sama seperti dijelaskan di atas). Ini memberi pemimpin cara kedua yang digerakkan oleh notifikasi untuk menindaklanjuti permintaan tanpa harus membuka daftar anggota grup.

Memutuskan permintaan dari salah satu tempat -- daftar anggota grup atau kartu Tugas -- akan menutupnya di semua tempat, sehingga pemimpin tidak pernah melihat tugas usang untuk permintaan yang sudah ditangani seseorang.

## Notifikasi

Sistem permintaan bergabung secara otomatis mengirimkan notifikasi:

- **Ketika permintaan dikirimkan** -- Semua pemimpin grup menerima notifikasi. Jika grup tidak memiliki pemimpin, staf atau admin yang ditugaskan untuk tugas tersebut yang akan diberi tahu (lihat di atas).
- **Ketika permintaan disetujui** -- Pemohon menerima konfirmasi
- **Ketika permintaan ditolak** -- Pemohon menerima notifikasi beserta alasan penolakan, jika ada

Notifikasi muncul di pusat notifikasi pengguna di B1.church dan di aplikasi seluler. Di ikon lonceng notifikasi B1 Admin, mengklik notifikasi permintaan bergabung (atau **View Details**-nya) akan membuka grup di situs B1.church gereja Anda di tab baru.

## Mengelola Permintaan dari Sisi Anggota

Orang-orang dapat mengelola permintaan bergabung mereka sendiri dari B1.church:

- Melihat status permintaan tertunda mereka di halaman detail grup
- Membatalkan permintaan tertunda jika mereka berubah pikiran
- Melihat apakah permintaan mereka disetujui atau ditolak

## Praktik Terbaik

- **Tanggapi dengan cepat** -- Usahakan untuk meninjau permintaan dalam 24-48 jam agar orang-orang tidak menunggu terlalu lama
- **Jelaskan alasan penolakan dengan jelas** -- Bantu orang memahami langkah selanjutnya atau pilihan alternatif
- **Periksa profil** -- Tinjau profil orang tersebut untuk melihat apakah mereka cocok dengan grup
- **Komunikasikan harapan** -- Pastikan deskripsi grup Anda dengan jelas menyatakan untuk siapa grup tersebut

## Artikel Terkait

- [Membuat Grup](./creating-groups.md) -- Pelajari cara membuat grup dan mengonfigurasi kebijakan bergabung
- [Anggota Grup](./group-members.md) -- Kelola anggota grup yang sudah ada
- [Kalender Grup](./group-calendar.md) -- Jadwalkan pertemuan dan acara grup
