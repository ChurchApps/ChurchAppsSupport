---
title: "Menulis Postingan Blog untuk Situs Anda di B1 Admin"
sidebar_label: "Blog"
description: "Buat, jadwalkan, dan terbitkan postingan blog di situs gereja Anda di B1 Admin, termasuk kutipan, kategori, tag, foto header, dan embed komentar."
---

# Blog

<div class="article-intro">

Halaman Blog memungkinkan Anda menerbitkan berita, pembaruan, dan renungan harian ke situs web gereja Anda. Postingan muncul dalam daftar kartu di `/blog`, di URL masing-masing, dan dalam umpan RSS yang dapat dipantau oleh alat lain (seperti Zapier) untuk postingan baru.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Selesaikan [Pengaturan Awal](./initial-setup.md) untuk situs web Anda
- Tambahkan tautan navigasi ke `/blog` dari [Mengelola Halaman](./managing-pages.md) jika Anda ingin pengunjung menemukan blog Anda melalui menu

</div>

## Mengakses Blog

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas) dan perluas **Website**.
2. Klik **Blog**.
3. Halaman Blog mencantumkan setiap postingan beserta statusnya dan tanggal terbit.

## Menambahkan Postingan

1. Klik **Tambah Postingan** di pojok kanan atas.
2. Masukkan **Judul**. **Alamat web** (slug) yang ramah URL akan dibuat secara otomatis saat Anda mengetik. Anda dapat langsung mengeditnya jika menginginkan alamat yang berbeda.
3. Tambahkan **Kutipan** -- ringkasan singkat yang ditampilkan dalam daftar postingan, deskripsi meta, dan umpan RSS. Jika Anda membiarkannya kosong, kutipan akan dibuat otomatis dari awal konten postingan Anda.
4. Tulis isi postingan di editor **Konten** menggunakan Markdown. Klik **Pratinjau** untuk melihat tampilan postingan yang sudah diformat.
5. Pilih **Kategori** (pilih yang sudah ada atau ketik yang baru) dan **Tag** opsional yang dipisahkan koma.
6. Klik **Pilih Gambar** untuk memilih foto dari galeri [Berkas](./files.md) Anda, atau unggah foto baru. Foto yang diunggah akan terbuka di alat pemotong bawaan yang dikunci pada rasio 16:9, sehingga Anda dapat membingkai foto apa pun agar pas dengan header postingan dan kartu daftar.
7. Atur **Penulis** -- secara default adalah Anda, tetapi Anda dapat mencari dan memilih orang mana pun di basis data Anda.
8. Aktifkan **Diterbitkan** dan atur **Tanggal Terbit** saat Anda siap menjadikan postingan ini publik. Biarkan nonaktif untuk menyimpan postingan sebagai draf.

:::tip
Atur **Tanggal Terbit** di masa depan untuk menjadwalkan postingan. Postingan tetap tersembunyi dari pengunjung dan menampilkan label **Dijadwalkan** di daftar Blog hingga tanggal tersebut tiba.
:::

## Status Postingan

Setiap postingan dalam daftar menampilkan salah satu dari tiga status:

- **Draf** -- Belum diterbitkan. Hanya terlihat di admin.
- **Dijadwalkan** -- Diterbitkan sudah aktif, tetapi tanggal terbit berada di masa depan.
- **Diterbitkan** -- Tayang di situs web Anda dan disertakan dalam umpan RSS.

## Mengedit, Pratinjau, dan Menghapus Postingan

- Klik **Edit** di samping postingan untuk membuat perubahan.
- Klik **Lihat di Situs** (ditampilkan pada postingan yang sudah diterbitkan) untuk membuka postingan langsung di situs web Anda di tab baru.
- Klik **Hapus** untuk menghapus postingan secara permanen.

## Cara Pengunjung Melihat Blog Anda

Postingan yang diterbitkan muncul di `{yoursite}/blog`, 10 per halaman, dengan tautan **Lebih Lama**/**Lebih Baru** untuk menelusuri arsip Anda, serta filter kategori dan nama penulis serta foto setiap postingan. Tag juga ditampilkan sebagai label yang dapat diklik, sehingga pengunjung dapat memfilter daftar berdasarkan tag dengan cara yang sama. Setiap postingan berada di `{yoursite}/blog/{slug}` dan menyertakan postingan terkait dari kategori yang sama. Halaman blog juga menerbitkan umpan RSS yang dapat ditemukan secara otomatis oleh pembaca umpan dan alat otomatisasi seperti Zapier.

:::info
Postingan blog adalah jenis konten yang terpisah dari halaman website biasa -- postingan tidak dibuat di [editor halaman](./page-editor.md) dan tidak muncul di daftar Halaman. Hal ini membuat penulisan blog lebih cepat dan lebih fokus pada penulisan.
:::

## Menambahkan Komentar di Bawah Postingan

B1 tidak menyediakan layanan komentar blog secara langsung, tetapi Anda dapat menambahkan layanan komentar sendiri. Anda juga dapat menempatkan elemen lain di bawah setiap postingan, seperti formulir langganan buletin atau tombol memberi.

1. Daftar ke layanan komentar seperti [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com), atau [Disqus](https://disqus.com), lalu salin kode embed-nya.
2. Di halaman Blog, gulir ke **Di Bawah Setiap Postingan**.
3. Tempel kode embed dan klik **Simpan**.

Kode tersebut akan muncul di bawah konten setiap postingan yang diterbitkan. Layanan komentar Anda yang menangani moderasi dan penyaringan spam, jadi periksa dasbornya secara berkala.

:::tip
Kosongkan kotak dan klik **Simpan** untuk menghapus kode dari setiap postingan. Hanya orang yang dapat mengedit pengaturan gereja yang dapat melihat kotak ini.
:::

## Langkah Selanjutnya

- [Mengelola Halaman](./managing-pages.md) -- Tambahkan tautan navigasi ke blog Anda
- [Berkas](./files.md) -- Unggah foto untuk digunakan dalam postingan Anda
- [Integrasi Zapier](../integrations/zapier.md) -- Picu otomatisasi saat postingan baru diterbitkan
