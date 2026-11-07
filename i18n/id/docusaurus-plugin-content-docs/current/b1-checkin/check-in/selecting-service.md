---
title: "Memilih Layanan"
description: "Pilih ibadah yang Anda hadiri di layar layanan B1 Checkin, yang menentukan waktu ibadah dan grup yang ditampilkan untuk sisa alur check-in."
---

# Memilih Layanan

<div class="article-intro">

Langkah pertama setiap check-in adalah memilih layanan yang akan Anda ikuti. Layar layanan muncul segera setelah aplikasi selesai dimuat, dan menentukan waktu layanan serta grup mana yang tersedia untuk alur check-in selanjutnya.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- [Masuk](../getting-started/logging-in.md) ke aplikasi B1 Church Checkin dan pilih gereja Anda
- Pastikan administrator gereja Anda telah [mengatur layanan dan waktu layanan](../../b1-admin/attendance/setup.md) di B1 Admin

</div>

## Cara Kerjanya

1. Setelah masuk (atau setelah masuk otomatis pada kunjungan berikutnya), aplikasi menampilkan **layar layanan**.
2. Anda akan melihat daftar semua layanan yang telah diatur untuk gereja Anda. Setiap layanan ditampilkan sebagai kartu yang berisi nama layanan (misalnya "Minggu Pagi" atau "Rabu Malam").
3. Ketuk layanan yang akan Anda ikuti.

Aplikasi kemudian memuat waktu layanan dan grup yang terkait dengan layanan tersebut, lalu membawa Anda ke [layar pencarian anggota](./looking-up-members.md).

## Saat Check-In Belum Dibuka

Jika administrator Anda memberikan waktu layanan [jadwal check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), aplikasi hanya memungkinkan keluarga memilih waktu layanan tersebut saat jendela check-in-nya terbuka. Waktu layanan yang jendela check-in-nya sedang tertutup tetap muncul di [layar keluarga](./household-review.md), tetapi ditandai **Tutup** (misalnya, **Tutup · dibuka Min 9:30 AM**) dan tidak menampilkan tombol grup.

Jika setiap waktu layanan untuk layanan yang Anda ketuk sedang tertutup, aplikasi akan memberi tahu kapan check-in dibuka, misalnya **"Check-in untuk layanan ini dibuka Min 9:30 AM."** (Jika waktu pembukaan tidak dapat ditampilkan, aplikasi menampilkan **"Check-in untuk layanan ini belum dibuka saat ini."**) Ketuk **Kembali** untuk kembali ke daftar layanan dan memilih layanan lain, atau tunggu hingga jendela dibuka lalu coba lagi.

:::info
Jendela check-in mengikuti zona waktu kampus layanan tersebut. Jika kampus itu belum memiliki zona waktu, zona waktu gereja Anda yang digunakan. Jika waktu layanan tampaknya dibuka pada jam yang salah, minta administrator Anda untuk memeriksa zona waktu di pengaturan kampus atau gereja. Pada layar keluarga, kiosk juga menggunakan jam tablet untuk membuka dan menutup waktu layanan, jadi pastikan tablet diatur ke waktu dan zona waktu yang benar.
:::

:::info
Layanan diatur oleh administrator gereja Anda di B1 Admin pada bagian Kehadiran. Jika Anda tidak melihat layanan yang Anda harapkan, minta admin Anda untuk memastikan layanan tersebut sudah dibuat di [pengaturan kehadiran](../../b1-admin/attendance/setup.md).
:::

## Yang Terjadi di Balik Layar

Ketika Anda memilih layanan, aplikasi mengambil tiga hal dari server:

- **Waktu layanan** untuk layanan tersebut (misalnya, satu layanan mungkin memiliki slot waktu pukul 9.00 dan pukul 11.00).
- **Grup** yang tersedia pada setiap waktu layanan (misalnya, Nursery, Preschool, Elementary).
- **Tautan grup-ke-waktu layanan** yang menentukan grup mana yang tersedia pada waktu mana.

Data ini disimpan di perangkat secara lokal agar proses check-in selanjutnya berjalan cepat dan responsif.

:::tip
Jika gereja Anda hanya memiliki satu layanan yang diatur, Anda tetap perlu mengetuknya untuk melanjutkan. Aplikasi tidak memilih layanan tunggal secara otomatis.
:::

## Langkah Berikutnya

Setelah memilih layanan, Anda akan [mencari keluarga Anda](./looking-up-members.md) menggunakan nomor telepon atau nama.
