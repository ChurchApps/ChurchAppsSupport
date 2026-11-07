---
title: "Masuk ke B1 Church Checkin"
sidebar_label: "Masuk"
description: "Masuk ke aplikasi kiosk B1 Church Checkin, pilih gereja Anda, dan pahami masuk otomatis, pengaturan admin, serta keluar di tablet check-in."
---

# Masuk

<div class="article-intro">

Sebelum kiosk dapat digunakan untuk check-in, Anda perlu masuk dengan akun ChurchApps yang memiliki akses ke gereja Anda. Halaman ini membahas proses masuk pertama kali, pemilihan gereja, perilaku masuk otomatis, dan cara keluar.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Pasang B1 Church Checkin di tablet Android Anda (lihat [Memulai](./index.md))
- Siapkan email dan kata sandi akun ChurchApps Anda
- Akun tersebut memerlukan izin **Checkin** (atau **Edit Attendance**) di gereja Anda. Admin menambahkannya di B1 Admin pada **Settings > Roles**. Lihat [Akun Kiosk Check-In](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Masuk Pertama Kali

1. Buka aplikasi B1 Church Checkin. Setelah layar pembuka, Anda akan melihat layar masuk dengan logo B1 Church Checkin.
2. Masukkan **alamat email** Anda di kolom pertama.
3. Masukkan **kata sandi** Anda di kolom kedua.
4. Ketuk tombol **Masuk**.

Aplikasi memvalidasi kredensial Anda dan memasukkan Anda. Jika email atau kata sandi salah, Anda akan melihat pesan kesalahan di bagian bawah layar.

Jika akun memiliki [verifikasi dua langkah](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) yang aktif, aplikasi kemudian meminta kode. Masukkan kode 6 digit dari aplikasi autentikator pemilik akun, atau salah satu kode cadangannya, lalu ketuk **Masuk** lagi. Kode ini hanya diperlukan untuk masuk pertama kali; setelah itu kiosk tetap dalam keadaan masuk.

:::info
Ini adalah email dan kata sandi yang sama dengan yang Anda gunakan untuk B1 Admin atau produk ChurchApps lainnya. Anda tidak memerlukan akun terpisah untuk kiosk check-in.
:::

## Memilih Gereja Anda

Setelah berhasil masuk, aplikasi memuat gereja tempat akun Anda memiliki izin **Checkin** atau **Edit Attendance**. Gereja yang hanya memiliki izin lain tidak akan ditampilkan. Jika tidak ada gereja yang tersisa, aplikasi menampilkan **No check-in access** dan meminta Anda agar admin gereja menambahkan izin Checkin ke salah satu peran Anda. Setiap gereja ditampilkan sebagai kartu yang berisi nama dan logo gereja (jika sudah diatur di B1 Admin).

- Jika akun Anda hanya terhubung dengan **satu gereja**, Anda tetap akan melihat layar pemilihan. Ketuk gereja Anda untuk melanjutkan.
- Jika akun Anda terhubung dengan **beberapa gereja**, ketuk gereja yang ingin dilayani oleh kiosk ini.

Setelah Anda memilih gereja, aplikasi memuat pengaturan merek dan tampilan gereja tersebut. Logo gereja Anda akan muncul di header pada semua layar berikutnya.

## Masuk Otomatis pada Kunjungan Berikutnya

Setelah berhasil masuk pertama kali, aplikasi menyimpan token masuk yang aman dan gereja yang Anda pilih di tablet. Aplikasi tidak menyimpan kata sandi Anda. Pada peluncuran berikutnya:

- Aplikasi akan memasukkan Anda kembali menggunakan token yang tersimpan.
- Jika sebelumnya Anda sudah memilih gereja, aplikasi memulihkan pilihan tersebut dan langsung membawa Anda ke **layar layanan**.
- Jika sesi masuk yang tersimpan sudah tidak berlaku, aplikasi kembali ke layar masuk agar Anda dapat masuk lagi.

:::tip
Karena kiosk masuk secara otomatis, Anda hanya perlu memasukkan kredensial sekali saat pengaturan awal. Setelah itu, tablet cukup dinyalakan dan sudah siap digunakan.
:::

## Pengaturan Admin

Pengaturan admin sengaja disembunyikan agar anggota gereja yang menggunakan kiosk tidak secara tidak sengaja mengubah konfigurasi. Untuk mengaksesnya:

1. Ketuk **logo gereja** di header **tujuh kali** berturut-turut dengan cepat (dalam dua detik).
2. Jika PIN kiosk sudah diatur, masukkan PIN saat diminta.
3. Layar **Admin Settings** akan terbuka dengan pilihan berikut:
   - **Change Service**: mengganti waktu layanan yang dipilih
   - **Change Printer**: membuka [pengaturan printer](./printer-setup.md) untuk memindai dan memilih printer
   - **Set/Change PIN**: mengatur atau memperbarui PIN kiosk yang melindungi akses admin
   - **Logout**: keluar dan kembali ke layar masuk

:::warning
Keluar akan menghapus semua kredensial dan pilihan gereja yang tersimpan. Anda harus memasukkan kembali email dan kata sandi untuk menggunakan kiosk lagi. Keluar hanya saat Anda perlu mengganti akun atau mengonfigurasi ulang kiosk.
:::

## Langkah Selanjutnya

Setelah masuk, Anda dapat [mengatur printer](./printer-setup.md) atau langsung menuju [alur kerja check-in](../check-in/index.md).
