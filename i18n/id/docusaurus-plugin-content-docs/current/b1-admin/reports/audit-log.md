---
title: "Log Audit"
---

# Log Audit

<div class="article-intro">

Log audit mencatat semua tindakan dan perubahan penting di seluruh sistem manajemen gereja Anda. Gunakan fitur ini untuk meninjau aktivitas login, melacak siapa yang membuat perubahan pada data jemaat, memantau pembaruan izin, dan menjaga akuntabilitas di seluruh tim Anda.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun B1 Admin dengan akses admin server
- Buka **Settings** untuk menemukan Log Audit

</div>

## Melihat Log Audit

1. Buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas B1 Admin) lalu perluas **Settings**.
2. Klik **Audit Log**.
3. Log menampilkan entri terbaru dalam tabel dengan kolom-kolom berikut:
   - **Date** -- Waktu tindakan terjadi.
   - **Category** -- Jenis tindakan (diberi warna agar mudah dipindai).
   - **Action** -- Tindakan yang dilakukan (misalnya, create, update, delete, login_success).
   - **Entity** -- Jenis dan ID data yang terpengaruh.
   - **IP Address** -- Alamat IP pengguna yang melakukan tindakan.
   - **Details** -- Ringkasan perubahan spesifik yang dibuat.

## Memfilter Log

Gunakan filter di bagian atas halaman untuk mempersempit hasil:

- **Category** -- Filter berdasarkan jenis tindakan:
  - **All Categories** -- Tampilkan semua.
  - **Login** -- Keberhasilan dan kegagalan login.
  - **People** -- Pembuatan, pembaruan, atau penghapusan data jemaat.
  - **Permissions** -- Pemberian dan pencabutan izin.
  - **Donations** -- Perubahan data donasi.
  - **Groups** -- Tindakan pengelolaan grup.
  - **Forms** -- Aktivitas pengiriman formulir.
  - **Settings** -- Perubahan konfigurasi.
- **Start Date** -- Tampilkan entri mulai dari tanggal ini.
- **End Date** -- Tampilkan entri hingga tanggal ini.

Klik **Search** setelah mengatur filter untuk memperbarui hasil.

## Memahami Kategori

Setiap kategori diberi warna untuk identifikasi cepat:

- **Login** -- Chip biru. Melacak percobaan login yang berhasil dan gagal.
- **People** -- Chip ungu. Melacak pembuatan, pembaruan, dan penghapusan data jemaat.
- **Permissions** -- Chip merah. Melacak saat hak akses diberikan atau dicabut.
- **Donations** -- Chip hijau. Melacak perubahan data donasi.
- **Groups** -- Chip abu-abu. Melacak operasi pengelolaan grup.
- **Forms** -- Chip oranye. Melacak aktivitas pengiriman formulir.
- **Settings** -- Chip kuning. Melacak perubahan konfigurasi.

## Mengekspor Log

Saat entri log ditampilkan, tombol **CSV download** akan muncul. Klik tombol tersebut untuk mengekspor hasil yang sedang difilter ke spreadsheet untuk ditinjau secara offline atau untuk keperluan pencatatan.

## Pagination

Gunakan kontrol pagination di bagian bawah tabel untuk berpindah antar halaman hasil. Anda dapat menampilkan 25, 50, atau 100 entri per halaman.

:::info
Entri log audit disimpan secara otomatis selama satu tahun. Entri yang lebih dari 365 hari akan dihapus agar sistem tetap berjalan optimal.
:::

:::tip
Tinjau log audit secara rutin, terutama setelah memperkenalkan anggota tim baru atau melakukan perubahan konfigurasi yang signifikan. Hal ini membantu Anda mengenali aktivitas yang tidak biasa lebih awal.
:::

## Artikel Terkait

- [Roles & Permissions](../settings/roles-permissions) -- Kelola siapa yang memiliki akses ke apa
- [Data Security](../settings/data-security) -- Pahami bagaimana data Anda dilindungi
- [Reports Overview](./index.md) -- Lihat semua laporan yang tersedia
