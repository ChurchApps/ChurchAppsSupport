---
title: "Panduan: Mengatur Pendaftaran Acara"
description: "Atur formulir pendaftaran acara di B1 Admin untuk mengumpulkan data peserta dan pembayaran opsional, menyematkannya di situs web gereja Anda, dan melacak pendaftaran."
---

# Mengatur Pendaftaran Acara

<div class="article-intro">

Buat formulir pendaftaran acara, kumpulkan informasi peserta dan pembayaran opsional, sematkan di situs web gereja Anda, dan kelola pengiriman saat masuk. Setelah selesai, Anda akan memiliki halaman pendaftaran yang dapat dibagikan untuk acara gereja apa pun.

</div>

:::info
**Dua cara menangani pendaftaran acara:** Panduan ini membahas **pendaftaran berbasis formulir**, yang memberi Anda kendali penuh atas kolom khusus dan pengumpulan pembayaran. Untuk acara yang lebih sederhana, di mana Anda hanya perlu melacak siapa yang akan hadir, gunakan **pendaftaran acara bawaan** yang tersedia di kalender -- lihat [Membuat Kalender](../calendars/creating-calendars.md#enabling-event-registration) untuk petunjuk pengaturan. Pendaftaran bawaan memungkinkan anggota mendaftar langsung dari [B1.church atau Aplikasi B1](../../b1-church/events/registering.md) dengan pelacakan kapasitas, jendela tanggal, dan konfirmasi email.
:::

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Akun B1 Admin dengan akses admin
- Untuk mengumpulkan pembayaran: [Stripe harus dikonfigurasi](../donations/online-giving-setup.md) terlebih dahulu

</div>

## Langkah 1: Buat Formulir Mandiri

Formulir Mandiri memiliki URL publik sendiri yang dapat diakses siapa saja -- sangat cocok untuk pendaftaran acara.

Ikuti panduan [Membuat Formulir](../forms/creating-forms.md) untuk:

1. Buka Formulir dan klik Tambah Formulir
2. Pilih jenis "Mandiri" -- ini memberi formulir Anda URL publik sendiri
3. Beri nama sesuai acara (misalnya, "Pendaftaran Retret Pria", "Pendaftaran VBS")

## Langkah 2: Tambahkan Pertanyaan

Susun kolom yang perlu Anda kumpulkan dari peserta.

Ikuti panduan [Membuat Formulir](../forms/creating-forms.md#adding-questions) untuk menambahkan pertanyaan Anda:

1. Buka tab Pertanyaan dan tambahkan kolom untuk informasi yang Anda butuhkan: nama, email, telepon, pembatasan diet, ukuran kaos, kontak darurat, dan lain-lain
2. Gunakan Pilihan Ganda untuk opsi seperti preferensi makanan atau pilihan sesi

:::warning
Jenis kolom Pembayaran memerlukan Stripe untuk dikonfigurasi. Jika Anda belum mengatur pemberian online, lihat [Pengaturan Pemberian Online](../donations/online-giving-setup.md) sebelum menambahkan kolom pembayaran.
:::

## Langkah 3: Konfigurasi Pengaturan Formulir

Atur kapan dan bagaimana formulir pendaftaran Anda tersedia.

1. Atur tanggal ketersediaan jika pendaftaran hanya boleh dibuka untuk waktu terbatas
2. Salin URL publik -- Anda dapat langsung membagikannya
3. Tambahkan anggota formulir dengan peran Admin atau Hanya Lihat untuk membantu mengelola pengiriman

## Langkah 4: Sematkan di Situs Web Anda

Pastikan formulir pendaftaran mudah ditemukan dengan menambahkannya ke situs web gereja Anda.

Ikuti panduan [Mengelola Halaman](../website/managing-pages.md) untuk:

1. Di editor situs web B1 Anda, tambahkan bagian baru ke halaman dan pilih elemen Formulir
2. Pilih formulir pendaftaran Anda dari daftar

:::tip
Bagikan juga URL mandiri melalui email, media sosial, dan buletin gereja -- semakin banyak tempat formulir terlihat, semakin banyak pendaftar yang Anda dapatkan.
:::

## Langkah 5: Kelola Pengiriman

Lacak pendaftaran saat masuk dan ekspor data bila Anda membutuhkannya.

Ikuti panduan [Mengelola Pengiriman](../forms/managing-submissions.md) untuk:

1. Tinjau tanggapan saat masuk di tab Pengiriman
2. Ekspor ke CSV untuk spreadsheet, pelacakan jumlah kehadiran, atau dibagikan kepada koordinator acara

## Selesai!

Pendaftaran acara Anda sudah aktif. Bagikan tautannya, sematkan di situs web Anda, dan lacak pendaftar dari B1 Admin. Setelah acara selesai, ekspor daftar akhir untuk catatan Anda.

## Artikel Terkait

- [Membuat Formulir](../forms/creating-forms.md) -- membangun formulir dengan berbagai jenis kolom
- [Mengelola Pengiriman](../forms/managing-submissions.md) -- meninjau dan mengekspor tanggapan formulir
- [Mengelola Halaman](../website/managing-pages.md) -- menyematkan formulir di situs web Anda
- [Pengaturan Pemberian Online](../donations/online-giving-setup.md) -- diperlukan untuk kolom pembayaran
