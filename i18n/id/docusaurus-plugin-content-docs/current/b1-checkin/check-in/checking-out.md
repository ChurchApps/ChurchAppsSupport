---
title: "Check-Out dan Keselamatan Anak"
description: "Check-out anak di stasiun B1 Checkin yang dijaga dengan kode keamanan, orang penjemput terverifikasi, panggilan orang tua, cetak ulang label, dan siaran darurat."
---

# Check-Out dan Keselamatan Anak

<div class="article-intro">

Check-out melengkapi proses check-in anak: orang tua menunjukkan kode keamanan dari label penjemputan mereka, kiosk memverifikasi siapa yang menjemput, lalu anak-anak di-check-out. Stasiun yang dijaga petugas juga dilengkapi alat keselamatan tambahan — verifikasi penjemput tepercaya, pesan SMS untuk memanggil orang tua, cetak ulang label keamanan, dan siaran darurat.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Check-out tersedia di stasiun yang diatur ke mode **dijaga petugas** dalam pengaturan admin kiosk
- Anak harus sudah [di-check-in](./completing-checkin.md) dengan label penjemputan tercetak yang memuat kode keamanan
- Fitur pemanggilan orang tua dan siaran darurat mengharuskan gereja Anda memiliki penyedia layanan pesan singkat yang terhubung di B1 Admin

</div>

## Memulai Check-Out

1. Di stasiun yang dijaga petugas, ketuk **Check Out** pada layar pencarian.
2. Masukkan **kode keamanan** 4 karakter dari label penjemputan keluarga. Anda dapat mengetikkannya, menggunakan papan ketik di layar, atau memindai barcode label dengan pemindai USB atau Bluetooth — kode akan dikirim otomatis setelah keempat karakter dimasukkan.
   - Tidak punya pemindai? Ketuk **Scan** di bawah kolom kode untuk menggunakan kamera tablet. Arahkan kode QR atau barcode label penjemputan ke kamera pada jendela **Scan pickup code**, dan kode akan dimasukkan secara otomatis. Kamera belakang digunakan secara default; ketuk tombol putar untuk berganti kamera, atau ketuk **Cancel** untuk kembali mengetik.
3. Kiosk menampilkan anak-anak yang di-check-in dengan kode tersebut.

## Memverifikasi Siapa yang Menjemput

Layar check-out akan menanyakan siapa yang menjemput anak-anak:

- **Penjemput tepercaya** untuk keluarga tersebut muncul sebagai kartu yang dapat diketuk, lengkap dengan foto dan hubungan keluarganya — ketuk orang yang berdiri di depan Anda.
- **Orang dewasa dalam keluarga** juga muncul dalam kisi foto.
- **Lainnya** memungkinkan Anda mengetik nama seseorang yang tidak ada dalam daftar.

Jika nama yang diketik cocok dengan seseorang yang ditandai **Not Authorized** untuk keluarga tersebut, kiosk akan memblokir check-out dengan peringatan. Anggota staf dapat memilih **Override** untuk tetap melanjutkan — penggantian ini dicatat pada catatan kehadiran beserta nama orang tersebut.

Setelah penjemput dikonfirmasi, ketuk check out. Nama penjemput akan disimpan bersama catatan kehadiran.

:::info
Penjemput tepercaya dan penjemput yang tidak diizinkan dikelola oleh staf gereja pada halaman masing-masing orang di B1 Admin — lihat [Check-In Safety](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Memanggil Orang Tua

Perlu memanggil orang tua selama kebaktian — karena popok perlu diganti, atau anak menangis? Dari layar check-out di stasiun yang dijaga petugas, staf dapat mengirim **panggilan**: pesan teks kepada orang tua atau wali anak melalui penyedia layanan pesan singkat gereja. Orang tua yang memilih berhenti menerima pesan teks atau tidak memiliki nomor ponsel akan dilewati, dan kiosk menampilkan jumlah pesan yang terkirim.

## Mencetak Ulang Label

Jika tanda nama atau label penjemputan hilang atau rusak, staf di stasiun yang dijaga petugas dapat **mencetak ulang** label keluarga dari layar check-out setelah memasukkan kode keamanan. Pencetakan ulang menggunakan printer dan templat label yang sama dengan check-in awal.

## Siaran Darurat

Dalam keadaan darurat, staf dapat mengirim pesan teks kepada wali dari **setiap anak yang sudah di-check-in** untuk kebaktian saat ini sekaligus:

1. Buka **pengaturan admin** kiosk (ketuk logo di header 7 kali dengan cepat, ditambah PIN jika diatur).
2. Ketuk **Emergency broadcast**.
3. Masukkan pesan, lalu ketik **EMERGENCY** pada kolom konfirmasi — tombol **Send broadcast** tetap nonaktif sampai Anda melakukannya.
4. Kiosk melaporkan berapa banyak ponsel yang menerima pesan dan berapa banyak orang yang dilewati (memilih berhenti atau tidak memiliki nomor ponsel).

:::warning
Siaran dikirim ke setiap keluarga yang di-check-in untuk kebaktian yang dipilih. Gunakan fitur ini hanya untuk keadaan darurat yang sebenarnya — evakuasi, penguncian gedung, atau cuaca buruk.
:::

## Artikel Terkait

- [Menyelesaikan Check-In](./completing-checkin.md) — asal kode keamanan dan label penjemputan
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md) — mengatur kapasitas, rasio, penjemput, dan persyaratan penyedia layanan pesan singkat
- [Pengaturan Printer](../getting-started/printer-setup.md) — konfigurasi printer label
