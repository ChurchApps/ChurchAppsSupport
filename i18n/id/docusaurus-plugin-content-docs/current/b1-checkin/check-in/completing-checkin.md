---
title: "Menyelesaikan Check-In"
description: "Selesaikan check-in kiosk sebuah keluarga di B1 Checkin, mencakup batas ruangan, pencetakan label, kode keamanan penjemputan, dan langkah berikutnya yang dilakukan aplikasi."
---

# Menyelesaikan Check-In

<div class="article-intro">

Setelah Anda memeriksa rumah tangga Anda dan membuat penugasan grup yang diperlukan, Anda siap untuk menyelesaikan check-in. Ini adalah langkah terakhir dalam alur kerja kiosk -- aplikasi mengirimkan data kehadiran, mencetak label, lalu mengatur ulang untuk keluarga berikutnya.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- [Periksa rumah tangga Anda](./household-review.md) di layar pemeriksaan rumah tangga
- [Tetapkan grup](./group-assignment.md) untuk anggota keluarga yang perlu check-in ke kelas atau program tertentu
- Opsional, [tambahkan tamu](./adding-guests.md) yang berkunjung bersama keluarga Anda

</div>

## Cara Melakukan Check-In

1. Dari **layar pemeriksaan rumah tangga**, ketuk tombol **Check-in** di bagian bawah layar.
2. Aplikasi mengirimkan data kehadiran ke server dan menampilkan **layar sukses** dengan tanda centang hijau dan pesan selamat datang.

Hanya itu yang diperlukan. Kehadiran keluarga Anda sudah tercatat.

Jika ada orang yang Anda pilih sudah melakukan check-in untuk ibadah ini hari ini, jendela **Sudah Check-In** akan muncul lebih dulu dan menyebutkan nama mereka. Ketuk **Check-In Lagi** untuk menyimpan pilihan grup baru mereka, atau **Batal** untuk kembali ke layar rumah tangga.

## Ruangan Penuh dan Rasio Relawan

Jika gereja Anda telah mengonfigurasi [batas keselamatan](../../b1-admin/attendance/checkin-safety.md) pada ruangannya, server akan memeriksanya sebelum menyimpan:

- Jika ruangan yang dipilih **penuh atau ditutup**, check-in tidak akan diproses dan aplikasi akan menyebutkan nama ruangan tersebut agar Anda dapat memilih ruangan lain.
- Jika waktu ibadah memiliki [jadwal check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) dan jendela check-in-nya belum dibuka saat ini, check-in ke ruangan untuk waktu ibadah tersebut juga ditolak. Layar **Belum bisa check-in** menampilkan ruangan tersebut dengan alasan "check-in belum dibuka saat ini"; ketuk **Ubah Ruangan** untuk memilih waktu ibadah atau grup yang berbeda. (Waktu ibadah yang sudah ditutup akan ditampilkan sebagai **Ditutup** pada [layar rumah tangga](./household-review.md) dan tidak dapat dipilih, jadi Anda biasanya hanya akan melihat ini jika jendela ditutup di tengah proses check-in.)
- Rumah tangga yang sudah check-in untuk waktu ibadah sebelumnya dapat kembali nanti dan menambahkan waktu ibadah yang sedang dibuka, bahkan setelah jendela waktu sebelumnya ditutup. Check-in mereka yang sudah ada tetap disimpan dan tidak menyebabkan check-in baru ditolak.
- Jika ruangan anak-anak **kekurangan relawan** sesuai rasionya, aplikasi akan menampilkan peringatan yang dapat dikonfirmasi oleh anggota staf untuk melanjutkan, atau memblokir check-in sepenuhnya, bergantung pada cara gereja Anda mengonfigurasi penegakan rasio.

## Pencetakan Label

Jika printer jaringan telah dikonfigurasi, aplikasi secara otomatis mencetak label setelah check-in:

- **Label nama** dicetak untuk setiap orang yang ditugaskan ke grup yang memiliki pengaturan **Cetak Tanda Nama** aktif. Label nama mencakup nama orang tersebut, penugasan grupnya, serta informasi alergi atau catatan jika ada dalam data.
- **Slip penjemputan orang tua** dicetak ketika ada orang yang di-check-in berada di grup yang memiliki pengaturan **Penjemputan Orang Tua** aktif. Orang yang di-check-in sebagai **Relawan** akan dilewati, sehingga pengasuh anak yang bertugas di ruangan Penjemputan Orang Tua tidak mendapatkan slip penjemputan. Slip penjemputan mencantumkan anak-anak, penugasan grup mereka, dan **kode keamanan 4 karakter** yang unik.

:::info
Kode keamanan yang sama muncul pada label nama anak dan slip penjemputan orang tua. Saat penjemputan, relawan mencocokkan kode tersebut untuk memastikan bahwa orang dewasa yang benar menjemput setiap anak.
:::

Kode keamanan dibuat baru untuk setiap check-in dan hanya menggunakan konsonan dan angka (vokal dikecualikan agar tidak membentuk kata yang tidak pantas).

:::warning
Jika label tidak tercetak, buka Pengaturan Admin dengan mengetuk **logo gereja** sebanyak tujuh kali, lalu ketuk **Ganti Printer** untuk memeriksa koneksi printer. Lihat [Pengaturan Printer](../getting-started/printer-setup.md) untuk langkah pemecahan masalah.
:::

## Yang Terjadi Setelah Check-In

- Jika printer telah dikonfigurasi, aplikasi mencetak semua label lalu secara otomatis kembali ke **layar pencarian**, siap untuk keluarga berikutnya.
- Jika tidak ada printer yang dikonfigurasi, aplikasi juga secara otomatis kembali ke **layar pencarian**.

Dalam kedua kasus, layar sukses tetap tampil setidaknya selama 6 detik sejak muncul (8 detik jika sedang merayakan pencapaian kehadiran seseorang), sehingga keluarga dapat melihat bahwa check-in berhasil. Jika pencetakan memakan waktu lebih lama dari itu, aplikasi akan kembali sekitar satu setengah detik setelah pencetakan selesai.

Anda tidak perlu mengetuk apa pun untuk kembali ke layar pencarian -- aplikasi menangani transisinya secara otomatis. Setelah layar tampil sebentar, Anda dapat mengetuknya untuk kembali segera; ketukan dalam satu setengah detik pertama akan diabaikan, sehingga ketukan ganda cepat pada **Check-in** tidak melewatinya.

:::tip
Aplikasi diatur ulang sepenuhnya setelah setiap check-in, sehingga tidak ada risiko satu keluarga melihat informasi keluarga lain.
:::

## Data yang Dicatat

Ketika Anda mengetuk **Check-in**, aplikasi mengirimkan data berikut ke server untuk setiap anggota rumah tangga yang memiliki penugasan grup:

- **Orang** yang di-check-in
- **Layanan** yang mereka hadiri
- **Waktu ibadah** dan **grup** yang ditugaskan kepada mereka

Data ini muncul di B1 Admin pada bagian Kehadiran, tempat administrator gereja Anda dapat melihat dan mengelola catatan kehadiran. Lihat [panduan administrasi check-in](../../b1-admin/attendance/check-in.md) untuk detailnya.
