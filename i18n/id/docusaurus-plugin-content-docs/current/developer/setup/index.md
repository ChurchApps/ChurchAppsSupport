---
title: "Pengaturan"
---

# Pengaturan

<div class="article-intro">

Bagian ini memandu Anda menyiapkan lingkungan pengembangan lokal untuk proyek-proyek ChurchApps. Anda dapat mengarahkan frontend ke API demo bersama untuk pengembangan cepat, atau menjalankan seluruh tumpukan secara lokal untuk pekerjaan backend.

</div>

## Dua Pendekatan

Ada dua cara untuk mengembangkan secara lokal, tergantung seberapa banyak tumpukan yang Anda butuhkan:

### 1. Arahkan ke API Demo (Paling Mudah)

Jika Anda mengerjakan **proyek frontend** (aplikasi web, aplikasi seluler, atau aplikasi desktop), jalur tercepat adalah mengarahkan aplikasi lokal Anda ke API demo bersama. Tidak diperlukan pengaturan basis data atau backend.

URL dasar API demo adalah:

```
https://api.demo.churchapps.org
```

Setiap modul API tersedia di jalur di bawah basis ini, misalnya:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

Lingkungan demo menjalankan kode terbaru dari `main`, dan data contohnya diisi ulang setiap malam, jadi jangan berharap apa pun yang Anda buat di sana akan bertahan. (Lingkungan staging sebelumnya, `api.staging.churchapps.org`, sudah dihentikan. Beberapa file `.env` contoh mungkin masih mencantumkan URL staging -- gantilah dengan URL demo atau lokal.)

:::tip
Pendekatan ini memungkinkan Anda mulai membuat perubahan frontend dalam hitungan menit. Ini adalah jalur yang direkomendasikan untuk sebagian besar kontributor.
:::

### 2. Jalankan Semuanya Secara Lokal

Jika Anda perlu mengubah kode API atau bekerja tanpa internet, Anda dapat menjalankan seluruh tumpukan secara lokal. Ini memerlukan MySQL 8.0+ dan konfigurasi tambahan. Lihat panduan [penyiapan lokal API](../api/local-setup) untuk instruksi terperinci.

## Memulai

Ikuti halaman-halaman ini secara berurutan:

1. **[Prasyarat](prerequisites)** -- Pasang alat-alat yang diperlukan (Node.js, Git, MySQL, dan lainnya)
2. **[Ikhtisar Proyek](project-overview)** -- Pahami proyek-proyek yang ada dan fungsinya masing-masing
3. **[Variabel Lingkungan](environment-variables)** -- Atur file `.env` Anda agar semuanya terhubung

:::info
Setiap proyek ChurchApps adalah repositori Git yang berdiri sendiri. Anda hanya perlu mengkloning proyek tertentu yang ingin Anda kerjakan.
:::
