---
title: "Panduan: Menyiapkan Pendaftaran Acara"
description: "Atur formulir pendaftaran acara di B1 Admin untuk mengumpulkan data peserta dan pembayaran opsional, sematkan di situs gereja Anda, dan lacak pendaftaran."
---

# Menyiapkan Pendaftaran Acara

<div class="article-intro">

Buat formulir pendaftaran acara, kumpulkan informasi peserta dan pembayaran opsional, sematkan di situs web gereja Anda, dan kelola pengiriman saat masuk. Setelah selesai, Anda akan memiliki halaman pendaftaran yang dapat dibagikan untuk acara gereja apa pun.

</div>

:::info
**Dua cara menangani pendaftaran acara:** Panduan ini membahas **pendaftaran berbasis formulir**, yang memberi Anda kendali penuh atas kolom khusus dan pengumpulan pembayaran. Untuk acara yang lebih sederhana, di mana Anda hanya perlu mencatat siapa yang akan hadir, gunakan **pendaftaran acara bawaan** yang ada di kalender -- lihat [Membuat Kalender](../calendars/creating-calendars.md#enabling-event-registration) untuk petunjuk pengaturannya. Pendaftaran bawaan memungkinkan anggota mendaftar langsung dari [situs web B1](../../b1-church/events/registering.md) dan [aplikasi seluler](../../b1-church/events/registering.md) dengan pelacakan kapasitas, rentang tanggal, dan konfirmasi email.
:::

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses admin
- Untuk menerima pembayaran: [Stripe harus dikonfigurasi](../donations/online-giving-setup.md) terlebih dahulu

</div>

## Langkah 1: Membuat Formulir Stand Alone

Formulir Stand Alone memiliki URL publik sendiri yang dapat diakses siapa pun, sangat cocok untuk pendaftaran acara.

Ikuti panduan [Membuat Formulir](../forms/creating-forms.md) untuk:

1. Buka Forms lalu klik Add Form
2. Pilih tipe "Stand Alone" -- ini memberi formulir Anda URL publik sendiri
3. Beri nama sesuai acara (misalnya, "Pendaftaran Retret Pria", "Pendaftaran VBS")

## Langkah 2: Menambahkan Pertanyaan

Susun kolom yang perlu Anda kumpulkan dari peserta.

Ikuti panduan [Membuat Formulir](../forms/creating-forms.md#adding-questions) untuk menambahkan pertanyaan Anda:

1. Buka tab Questions dan tambahkan kolom untuk informasi yang Anda butuhkan: nama, email, nomor telepon, pantangan makanan, ukuran kaus, kontak darurat, dan sebagainya
2. Gunakan Multiple Choice untuk pilihan seperti preferensi makanan atau pilihan sesi

:::warning
Tipe kolom Payment memerlukan Stripe yang sudah dikonfigurasi. Jika Anda belum menyiapkan donasi online, lihat [Pengaturan Donasi Online](../donations/online-giving-setup.md) sebelum menambahkan kolom pembayaran.
:::

## Langkah 3: Mengonfigurasi Pengaturan Formulir

Atur kapan dan bagaimana formulir pendaftaran Anda tersedia.

1. Atur tanggal ketersediaan jika pendaftaran hanya boleh dibuka untuk waktu terbatas
2. Salin URL publik -- Anda dapat langsung membagikannya
3. Tambahkan anggota formulir dengan peran Admin atau View Only untuk membantu mengelola pengiriman

## Langkah 4: Sematkan di Situs Web Anda

Buat formulir pendaftaran mudah ditemukan dengan menambahkannya ke situs web gereja Anda.

Ikuti panduan [Mengelola Halaman](../website/managing-pages.md) untuk:

1. Di editor situs web B1 Anda, tambahkan bagian baru ke halaman dan pilih elemen Form
2. Pilih formulir pendaftaran Anda dari daftar

:::tip
Bagikan juga URL formulir mandiri melalui email, media sosial, dan buletin gereja -- semakin banyak tempat formulir ini terlihat, semakin banyak pendaftar yang Anda dapatkan.
:::

## Langkah 5: Mengelola Pengiriman

Lacak pendaftaran saat masuk dan ekspor data kapan pun Anda membutuhkannya.

Ikuti panduan [Mengelola Pengiriman](../forms/managing-submissions.md) untuk:

1. Tinjau tanggapan saat masuk di tab Submissions
2. Ekspor ke CSV untuk spreadsheet, pencatatan jumlah peserta, atau dibagikan kepada koordinator acara

## Selesai!

Pendaftaran acara Anda sudah aktif. Bagikan tautannya, sematkan di situs web Anda, dan lacak pendaftar dari B1 Admin. Setelah acara selesai, ekspor daftar akhir untuk arsip Anda.

## Artikel Terkait

- [Membuat Formulir](../forms/creating-forms.md) -- membuat formulir dengan berbagai tipe kolom
- [Mengelola Pengiriman](../forms/managing-submissions.md) -- meninjau dan mengekspor tanggapan formulir
- [Mengelola Halaman](../website/managing-pages.md) -- menyematkan formulir di situs web Anda
- [Pengaturan Donasi Online](../donations/online-giving-setup.md) -- diperlukan untuk kolom pembayaran
