---
title: "Mengelola Layar dan Grup"
---

# Mengelola Layar dan Grup

<div class="article-intro">

Halaman **Layar** di FreePlay Admin menampilkan setiap TV yang dipasangkan ke gereja Anda, beserta apa yang sedang diputar dan apakah sudah siap untuk hari Minggu. Di sini Anda juga dapat mengelola **grup layar**. Layar dalam grup yang sama berbagi satu kalender dan satu perulangan default.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Masuk ke FreePlay Admin di [admin.freeplay.church](https://admin.freeplay.church)
- [Pasangkan setidaknya satu layar](./pairing-a-screen)

</div>

## Halaman Layar

Di bagian atas, tiga angka memberikan gambaran cepat tentang kondisi layar:

- **Online sekarang** - Layar yang telah melakukan pemeriksaan dalam 15 menit terakhir
- **Siap untuk Minggu** - Jumlah layar terjadwal yang telah mengunduh semuanya hingga Minggu mendatang
- **Perlu perhatian** - Layar yang luring atau kehilangan berkas

Di bawahnya, gunakan **Cari layar** untuk menemukan layar berdasarkan label, grup, atau apa yang sedang diputarnya. Chip filter mempersempit daftar menjadi **Semua**, **Terjadwal**, **Manual**, **Perlu perhatian**, atau satu grup tertentu. Beralih antara tampilan **Tabel** dan **Kisi** dengan tombol di sebelah kanan.

Setiap layar menampilkan:

- **Label** dan model perangkat
- **Grup**
- **Mode** - **Terjadwal** atau **Manual**
- **Sedang diputar** - Apa yang sedang ditampilkan di layar saat ini. Layar manual menampilkan **Kelas · guru menekan Mulai**
- **Siap hingga** - Tanggal hingga layar telah mengunduh. Jika berkas belum terunduh, layar akan menampilkan **N berkas hilang** sebagai gantinya. Layar baru menampilkan **Menunggu sinkronisasi pertama**
- **Terakhir terlihat** - Kapan layar terakhir melakukan pemeriksaan. Layar yang sudah lama tidak melakukan pemeriksaan menampilkan **Luring**, dan layar yang belum pernah terhubung menampilkan **Belum pernah terlihat**

Gunakan **Tampilkan** untuk memutar kalender layar di browser Anda, atau **Edit** untuk mengubah pengaturannya.

## Melihat Layar

Klik label layar untuk membuka halamannya. Di sebelah kiri:

- **Tampilkan di browser** - Putar kalender layar ini secara layar penuh di browser Anda, seperti tampilannya di TV. Lihat [Menampilkan dari Browser](./scheduled-playback#presenting-from-a-browser)
- **Edit** - Ubah label, grup, atau mode
- **Lainnya** > **Lepas pasangan** - Putuskan sambungan TV. TV akan kembali menampilkan kode pemasangan

Bagian lain di halaman ini memiliki bagian-bagian berikut:

- **Sekarang dan berikutnya** - Apa yang sedang diputar sekarang dan sampai kapan, diikuti dengan semua yang dijadwalkan untuk 7 hari ke depan. Klik **Buka kalender** untuk langsung membuka kalender grup ini
- **Unduhan** - **Siap hingga** tanggal tertentu jika semuanya telah terunduh, atau daftar berkas yang hilang
- **Perangkat** - ID perangkat, platform, model, versi aplikasi FreePlay, alamat IP, penyimpanan yang digunakan dan tersedia, terakhir terlihat, dan mode
- **Terbaru** - Aktivitas terbaru yang dilaporkan oleh layar

:::tip
Jika layar menampilkan berkas yang hilang, pastikan layar dalam keadaan online dan memiliki ruang penyimpanan yang tersedia. TV akan mengunduh berkas yang hilang secara otomatis saat berikutnya melakukan pemeriksaan.
:::

## Mengedit Layar

1. Klik **Edit** di samping layar, atau di halamannya.
2. Ubah **Label**, **Grup**, atau **Mode** (**Terjadwal** atau **Manual**).
3. Klik **Simpan**.

Memindahkan layar ke grup lain akan mengalihkannya ke kalender grup tersebut.

## Grup Layar

Grup layar adalah kumpulan layar yang memutar hal yang sama pada waktu yang sama, seperti "Lobi" atau "Sayap Anak-anak". Setiap grup memiliki kalendernya sendiri dan dapat memiliki **perulangan default** yang diputar ketika tidak ada yang dijadwalkan.

Untuk mengelola grup, klik **Grup** di bagian atas halaman **Layar**. Daftar **Grup layar** menampilkan nama setiap grup, jumlah layarnya, dan perulangan defaultnya. Klik **Layar** untuk kembali.

### Menambahkan Grup

1. Pada tampilan **Grup layar**, klik **Tambah grup**.
2. Masukkan **Nama**, misalnya "Lobi".
3. Pilih daftar putar **Perulangan default**, atau biarkan pada **Tidak ada — layar mati**.
4. Klik **Simpan**.

Anda juga dapat membuat grup saat memasangkan layar dengan memilih **＋ Grup baru…** di kolom **Grup**.

### Mengedit atau Menghapus Grup

1. Klik **Edit** di samping grup.
2. Ubah nama atau perulangan default, lalu klik **Simpan**.
3. Untuk menghapus grup, klik **Hapus** dan konfirmasi.

:::warning
Menghapus grup juga menghapus jadwalnya. Layar di grup tersebut akan mati hingga Anda memindahkannya ke grup lain.
:::

## Artikel Terkait

- **[Memasangkan Layar](./pairing-a-screen)** - Menambahkan TV baru
- **[Menjadwalkan Kalender](./scheduling-the-calendar)** - Menentukan apa yang diputar setiap grup dan perulangan defaultnya
- **[Pemutaran Terjadwal di TV](./scheduled-playback)** - Arti tanggal "Siap hingga" di TV itu sendiri
