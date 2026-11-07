---
title: "Meninjau Permintaan Penghapusan Akun"
description: "Setujui atau tolak permintaan penghapusan akun anggota di B1 Admin, arahkan melalui Grup Persetujuan Direktori, dan penuhi tenggat 30 hari GDPR."
---

# Meninjau Permintaan Penghapusan Akun

<div class="article-intro">

Ketika sebuah gereja memiliki Grup Persetujuan Direktori yang dikonfigurasi, penghapusan akun tidak lagi terjadi secara instan. Permintaan anggota menjadi tugas yang ditinjau oleh grup persetujuan Anda sebelum apa pun dihapus. Halaman ini menjelaskan cara permintaan dibuat, cara menyetujui atau menolaknya, dan apa yang terjadi di setiap kasus.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Sebuah **Grup Persetujuan Direktori** harus dikonfigurasi di bawah **Mobile &rarr; Member portal**. Tanpa grup ini, mengklik **Delete my account** pada halaman Profil tetap langsung menghapus akun tanpa langkah peninjauan. Lihat [Pengaturan Aplikasi Mobile](../settings/mobile-app.md).
- Menyetujui atau menolak permintaan memerlukan izin **People &gt; Edit**.

</div>

## Cara Anggota Mengajukan Penghapusan

Penghapusan akun diajukan dari halaman **My Profile**, yaitu halaman akun bersama yang sama seperti dijelaskan di [Mengelola Profil Anda](./managing-profile.md), di bagian **Account Deletion**. Ketika grup persetujuan dikonfigurasi, mengonfirmasi permintaan tidak langsung menghapus apa pun. Sebagai gantinya, sistem:

1. Membuat tugas terbuka berjudul **"Account deletion request"**, ditugaskan kepada Grup Persetujuan Direktori, di bawah **Serving &rarr; My Work**.
2. Menonaktifkan tombol **Delete my account** untuk orang tersebut dan menampilkan pemberitahuan bahwa permintaan sedang menunggu peninjauan.

Mengirim permintaan kedua ketika satu permintaan sudah terbuka hanya akan membuka kembali tugas yang sama. Seseorang hanya dapat memiliki satu permintaan penghapusan yang tertunda pada satu waktu.

## Meninjau Permintaan

1. Buka **Serving &rarr; My Work** (atau **Assigned to My Groups** di dasbor Anda, tempat yang sama di mana [permintaan perubahan profil](./approving-profile-changes.md) muncul).
2. Buka tugas berjudul **"Account deletion request from *Name*"**.
3. Anda akan melihat dua tindakan: **Approve deletion** dan **Decline**.

### Menyetujui

Konfirmasi **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Ini mengganti informasi pribadi orang tersebut dengan nilai generik (anonimisasi yang sama seperti yang digunakan oleh tindakan **Data Management &gt; Anonymize** pada catatan seseorang, lihat [Keamanan Data](../settings/data-security.md)) dan menghapus login mereka. Tugas ditutup secara otomatis, dan anggota diberi tahu bahwa permintaan mereka disetujui.

### Menolak

Menolak memerlukan alasan, karena GDPR hanya mengizinkan penolakan permintaan penghapusan untuk pengecualian hukum:

- **Penyimpanan wajib secara hukum** (catatan donasi, pajak, atau ketenagakerjaan)
- **Diperlukan untuk klaim hukum**
- **Lainnya**: jelaskan di kotak teks (minimal 10 karakter)

Anggota diberi tahu tentang keputusan tersebut beserta alasan yang Anda berikan, dan dapat mengajukan kembali permintaan mereka atau meneruskannya ke otoritas pengawas jika mereka tidak setuju.

:::info
Gereja memiliki 30 hari untuk menanggapi permintaan penghapusan. Tugas jatuh tempo dalam 28 hari, dan grup persetujuan menerima pengingat otomatis jika tugas masih terbuka setelah 21 dan 27 hari.
:::

:::tip
Permintaan penghapusan dan perubahan profil menggunakan Grup Persetujuan Direktori yang sama dan alur peninjauan berbasis Tugas yang sama. Lihat [Menyetujui Perubahan Profil](./approving-profile-changes.md) jika Anda juga perlu meninjau permintaan pembaruan direktori.
:::

## Artikel Terkait

- [Mengelola Profil Anda](./managing-profile.md): Tempat anggota meminta penghapusan akun mereka sendiri
- [Menyetujui Perubahan Profil](./approving-profile-changes.md): Alur peninjauan serupa untuk permintaan pembaruan direktori
- [Keamanan Data](../settings/data-security.md): Kepatuhan GDPR dan anonimisasi yang dimulai oleh admin
- [Pengaturan Aplikasi Mobile](../settings/mobile-app.md): Mengonfigurasi Grup Persetujuan Direktori
