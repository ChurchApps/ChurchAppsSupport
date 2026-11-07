---
title: "Konten Bersama"
description: "Cara lagu, pelajaran, dan templat dari pengguna bergerak melalui antrean moderasi bersama di Server Admin B1 Admin, dari kiriman hingga terbit."
---

# Konten Bersama — Pustaka Aset Bersama & Moderasi

Konten yang dikirim pengguna dan dibagikan lintas produk (lagu WorshipCommons, pelajaran Lessons.church, templat FreeShow, templat situs web B1) melalui satu antrean moderasi, bukan alur peninjauan terpisah untuk setiap produk. Halaman ini membahas siklus hidup pengiriman/persetujuan, model data aset bersama, dan lokasi moderasi.

## Tulang punggung aset

Dua tabel menyimpan setiap item commons, terlepas dari produknya:

- **`assets`**: baris identitas publik. `status`: `pending` | `published` | `unpublished` | `removed`. Data spesifik tipe (detail lagu, penulis) disimpan di tabel satelit yang terhubung melalui `assetId`.
- **`assetFiles`**: setiap berkas yang dilampirkan ke aset (audio, gambar, dokumen). Tabel ini menggantikan kolom `path` dan `files` (dipisah koma) yang lama pada tabel konten individual.
- **`submissions`**: unit moderasi. Siklus hidupnya: `draft → pending → approved | rejected | withdrawn`. Sebuah pengiriman bisa berupa aset baru atau perubahan pada aset yang sudah dipublikasikan, baik oleh penulis asli maupun pihak ketiga.

Saat pengiriman disetujui, dijalankan **publish hook** khusus produk (`Api/src/modules/commons/helpers/publishHooks/`, misalnya `song.ts`) yang mengubah pengiriman menjadi catatan milik produk tersebut.

## Alur pengiriman

`CommonsSubmissionController` (`Api/src/modules/commons/`) adalah API yang digunakan pengguna akhir: membuat draf, menyiapkan presign dan melampirkan berkas, mengirim untuk ditinjau, atau menarik kembali pengiriman. Klien sebenarnya adalah situs produsen eksternal (situs WorshipCommons, Lessons.church, FreeShow, galeri templat situs web B1), bukan B1Admin.

## Konsumsi untuk gereja

Selain moderasi, B1Admin juga membaca langsung dari tulang punggung commons. Pencarian "Add Song" pada Serving → Songs di B1Admin melakukan kueri ke `GET /songs?sundayReady=true` bersama basis data lagu eksternal yang sudah ada. Pencarian ini menampilkan lagu WorshipCommons yang sudah dipublikasikan dan ditandai siap-Minggu oleh staf (lihat gerbang dengar di bawah) dengan lencana lisensi. Saat sebuah lagu dipilih, `SongDetail` baru akan dihubungkan kembali ke sumbernya melalui `songDetailLinks`. Ini adalah satu-satunya jalur ketika B1Admin milik gereja individual menyentuh data commons secara langsung, bukan melalui alat Server Admin yang hanya untuk staf. Untuk deskripsi bagi gereja, lihat bagian [Lagu Gratis dari WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) pada dokumen dukungan.

## Antrean moderasi

Antrean berada di **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), dibatasi oleh izin `Permissions.server.admin`, yaitu izin yang sama yang membatasi Churches/Impersonate/Jobs di halaman tersebut. Ini adalah alat internal khusus staf ChurchApps, bukan sesuatu yang dilihat gereja individual.

Ada tiga sub-tab:

- **Queue**: setiap pengiriman yang menunggu dari semua produk, dapat difilter berdasarkan produk/tipe aset. Setiap baris menampilkan lencana aset baru, edit oleh penulis, atau edit oleh pihak ketiga, rekam jejak persetujuan pengirim, ringkasan perbedaan kolom dan berkas, serta usia pengiriman (ditandai jika lebih dari 72 jam). **Review** membuka panel dengan perbedaan per kolom, pratinjau berkas, dan pratinjau produk hanya-baca yang disematkan. Approve/Reject mendukung pintasan keyboard (j/k untuk navigasi, a/r untuk bertindak).
- **Reports**: laporan hak cipta dan kebijakan/kualitas terhadap aset yang sudah dipublikasikan, dibagi menjadi dua antrean ditambah riwayat yang sudah diselesaikan. Anggota staf mengklaim laporan, lalu menyelesaikannya dengan sebuah resolusi (dipertahankan/ditolak/duplikat) dan sebuah tindakan (tidak ada/tangguhkan publikasi/hapus).
- **Assets**: peramban yang dapat dicari untuk konten yang sudah dipublikasikan, dengan tindakan per aset: jadikan unggulan, tangguhkan/publikasikan ulang, atau hapus (alasan: hak cipta/kebijakan). Untuk lagu, **gerbang dengar** di sini adalah cara sebuah lagu menjadi "siap-Minggu": staf menandainya setelah mendengarkan setiap kunci yang dipublikasikan dan memastikan partitur, kord, dan slide sudah lengkap.

Setiap endpoint di bawah `/commons/admin/*` (`CommonsAdminController.ts`) memeriksa ulang izin server-admin secara mandiri.

:::info
Desain ini sengaja memiliki satu antrean: UI moderasi `/admin` milik WorshipCommons dihentikan, dan semua pengiriman dari setiap produk kini diarahkan melalui alat Server Admin di B1Admin.
:::

## Cakupan

Api (modul commons), B1Admin (Server Admin), dan situs produsen eksternal: WorshipCommons, Lessons.church, FreeShow, templat pembuat situs web B1.
