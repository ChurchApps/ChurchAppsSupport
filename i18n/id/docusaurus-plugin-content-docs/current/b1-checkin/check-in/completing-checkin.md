---
title: "Menyelesaikan Check-in"
---

# Menyelesaikan Check-in

<div class="article-intro">

Setelah Anda meninjau rumah tangga dan membuat penugasan grup yang diperlukan, Anda siap untuk menyelesaikan check-in. Ini adalah langkah terakhir dalam alur kerja kiosk -- aplikasi mengirimkan data kehadiran, mencetak label, dan mengatur ulang diri untuk keluarga berikutnya.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- [Tinjau rumah tangga Anda](./household-review) di layar tinjauan rumah tangga
- [Tetapkan grup](./group-assignment) untuk anggota keluarga yang perlu check-in ke kelas atau program tertentu
- Opsional, [tambahkan tamu](./adding-guests) yang berkunjung bersama keluarga Anda

</div>

## Cara Melakukan Check-in

1. Dari **layar tinjauan rumah tangga**, ketuk tombol **Check-in** di bagian bawah layar.
2. Aplikasi mengirimkan data kehadiran ke server dan menampilkan **layar sukses** dengan tanda centang hijau dan pesan selamat datang.

Hanya itu yang diperlukan. Kehadiran keluarga Anda sudah tercatat.

## Ruangan Penuh dan Rasio Relawan

Jika gereja Anda telah mengonfigurasi [batas keamanan](../../b1-admin/attendance/checkin-safety) pada ruangannya, server akan memeriksanya sebelum menyimpan:

- Jika ruangan yang dipilih **penuh atau ditutup**, check-in tidak akan berhasil dan aplikasi akan menyebutkan nama ruangan tersebut agar Anda dapat memilih ruangan lain.
- Jika waktu layanan memiliki [jadwal check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) dan jendela check-in-nya tidak sedang terbuka, check-in ke ruangan-ruangan pada waktu layanan tersebut juga ditolak. Layar **Belum bisa check-in** menampilkan ruangan tersebut dengan alasan "check-in belum dibuka saat ini"; ketuk **Ubah Ruangan** untuk memilih waktu layanan atau grup lain. (Waktu layanan yang sudah ditutup ditampilkan sebagai **Ditutup** di [layar rumah tangga](./household-review) dan tidak dapat dipilih, jadi Anda biasanya hanya akan melihat ini jika jendela tertutup di tengah proses check-in.)
- Rumah tangga yang sudah check-in untuk waktu layanan sebelumnya dapat kembali nanti dan menambahkan waktu layanan yang sedang terbuka, bahkan setelah jendela sebelumnya tertutup. Riwayat check-in yang sudah ada tetap disimpan dan tidak menyebabkan check-in baru ditolak.
- Jika sebuah ruangan anak-anak **kekurangan relawan** sesuai rasionya, aplikasi akan menampilkan peringatan yang dapat dikonfirmasi oleh staf untuk melanjutkan, atau langsung memblokir check-in -- tergantung pada cara gereja Anda mengonfigurasi penegakan rasio.

## Pencetakan Label

Jika printer jaringan telah dikonfigurasi, aplikasi secara otomatis mencetak label setelah check-in:

- **Label nama** dicetak untuk setiap orang yang ditetapkan ke grup yang memiliki pengaturan **Cetak Name Tag** aktif. Label nama mencakup nama orang tersebut, penugasan grupnya, serta informasi alergi/catatan jika tersedia.
- **Slip penjemputan orang tua** dicetak saat ada orang yang di-check-in berada di grup yang memiliki pengaturan **Penjemputan Orang Tua** aktif. Orang yang di-check-in sebagai **Relawan** akan dilewati, sehingga pengasuh anak yang bertugas di ruangan Penjemputan Orang Tua tidak mendapatkan slip penjemputan. Slip penjemputan mencantumkan anak-anak, penugasan grup mereka, dan **kode keamanan 4 karakter** yang unik.

:::info
Kode keamanan yang sama muncul pada label nama anak dan slip penjemputan orang tua. Saat penjemputan, relawan mencocokkan kode tersebut untuk memastikan orang dewasa yang benar menjemput setiap anak.
:::

Kode keamanan dibuat baru untuk setiap check-in dan hanya menggunakan konsonan dan angka (huruf vokal dikecualikan agar tidak membentuk kata yang tidak pantas).

:::warning
Jika label tidak tercetak, buka Pengaturan Admin dengan mengetuk **logo gereja** tujuh kali, lalu ketuk **Ubah Printer** untuk memverifikasi koneksi printer. Lihat [Pengaturan Printer](../getting-started/printer-setup) untuk langkah pemecahan masalah.
:::

## Yang Terjadi Setelah Check-in

- Jika printer telah dikonfigurasi, aplikasi mencetak semua label lalu secara otomatis kembali ke **layar pencarian**, siap untuk keluarga berikutnya.
- Jika tidak ada printer yang dikonfigurasi, aplikasi tetap secara otomatis kembali ke **layar pencarian**.

Dalam kedua kasus, layar sukses tetap tampil selama minimal 6 detik sejak muncul (8 detik jika sedang merayakan pencapaian kehadiran seseorang), agar keluarga dapat melihat bahwa check-in berhasil. Jika pencetakan memakan waktu lebih lama dari itu, aplikasi akan kembali sekitar satu setengah detik setelah pencetakan selesai.

Anda tidak perlu mengetuk apa pun untuk kembali ke layar pencarian -- aplikasi menangani transisi secara otomatis. Setelah layar tampil beberapa saat, Anda dapat mengetuknya untuk kembali segera; ketukan dalam satu setengah detik pertama akan diabaikan, sehingga ketukan ganda cepat pada **Check-in** tidak akan melewati layar tersebut.

:::tip
Aplikasi diatur ulang sepenuhnya setelah setiap check-in, sehingga tidak ada risiko satu keluarga melihat informasi keluarga lain.
:::

## Data yang Tercatat

Saat Anda mengetuk **Check-in**, aplikasi mengirimkan informasi berikut ke server untuk setiap anggota rumah tangga yang memiliki penugasan grup:

- **Orang** yang di-check-in
- **Layanan** yang mereka hadiri
- **Waktu layanan** dan **grup** tempat mereka ditugaskan

Data ini muncul di B1 Admin pada bagian Kehadiran, tempat administrator gereja Anda dapat melihat dan mengelola catatan kehadiran. Lihat [panduan administrasi check-in](../../b1-admin/attendance/check-in.md) untuk detailnya.
