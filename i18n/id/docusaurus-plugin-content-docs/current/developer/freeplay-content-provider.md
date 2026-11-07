---
title: "Penyedia Konten FreePlay"
---

# Penyedia Konten FreePlay

<div class="article-intro">

FreePlay adalah pemutar media ChurchApps untuk streaming pelajaran dan konten video lainnya di ponsel, tablet, dan TV. Jika Anda memiliki pustaka konten pelajaran dan ingin menyediakannya di FreePlay, panduan ini memuat semua yang perlu Anda siapkan.

</div>

## Branding

Sebelum integrasi dapat dimulai, kami memerlukan:

- **Logo** -- Gambar logo dengan rasio aspek **16:9** (digunakan untuk kartu penyedia di antarmuka FreePlay)
- **Nama merek** -- Nama yang diinginkan untuk organisasi Anda agar ditampilkan di FreePlay

## Endpoint API

FreePlay berkomunikasi dengan layanan Anda melalui sekumpulan kecil endpoint REST. Kami menulis adapter khusus untuk setiap penyedia, sehingga struktur URL yang pasti bersifat fleksibel -- tetapi informasi di bawah ini adalah yang kami perlukan.

### Autentikasi

Pilih model yang sesuai dengan konten Anda:

| Model | Kapan Digunakan | Yang Kami Perlukan |
|-------|-----------------|--------------------|
| **Tidak ada** | Konten publik, tanpa perlu masuk | Tidak ada -- kami memanggil endpoint katalog Anda secara langsung |
| **OAuth (PKCE)** | Masuk melalui web/seluler | URL otorisasi, endpoint pertukaran token, client ID, scope |
| **Device Flow** | Direkomendasikan untuk aplikasi TV (pengguna memasukkan kode pendek di ponsel mereka) | Endpoint otorisasi perangkat, endpoint polling token, client ID |

:::tip
Jika konten Anda memerlukan autentikasi, endpoint autentikasi mengembalikan **token pengguna** yang diteruskan FreePlay ke endpoint penelusuran dan pelajaran untuk memberikan otorisasi akses.
:::

### Penelusuran / Katalog

Endpoint (atau sekumpulan endpoint) yang mengembalikan **pohon folder** dari semua pelajaran yang tersedia.

- Ini bisa berupa **satu panggilan** yang mengembalikan seluruh pohon, atau **beberapa panggilan** di mana setiap panggilan mengembalikan satu level saat pengguna menelusuri lebih dalam.
- Setiap item dalam pohon sebaiknya menyertakan:

| Kolom | Wajib | Deskripsi |
|-------|-------|-----------|
| `id` | Ya | Pengenal unik untuk folder |
| `name` | Ya | Nama tampilan untuk folder |
| `thumbnail` | Direkomendasikan | URL thumbnail **16:9** |

### Daftar Putar Pelajaran

Endpoint yang mengembalikan **daftar putar file media** untuk satu pelajaran.

Setiap item dalam daftar putar sebaiknya menyertakan:

| Kolom | Wajib | Deskripsi |
|-------|-------|-----------|
| `title` | Ya | Judul tampilan dari item media |
| `mediaType` | Ya | `video` atau `image` |
| `url` | Ya | Tautan unduh langsung ke file (lihat [Format Media](#media-formats) di bawah) |
| `thumbnail` | Direkomendasikan | Gambar thumbnail untuk item tersebut |
| `duration` | Direkomendasikan | Durasi dalam detik (untuk video) |

## Format Media

FreePlay mengunduh file secara langsung, sehingga setiap item media harus memiliki **tautan langsung** (tanpa pemutar tersemat atau pengalihan halaman).

| Jenis | Format yang Diterima |
|-------|----------------------|
| Video | **MP4** (wajib untuk pemutaran lintas platform di perangkat Apple dan Android) |
| Gambar | JPG, PNG, atau GIF |

## Catatan

- **REST API yang mengembalikan JSON** adalah pola integrasi yang umum, tetapi karena kami menulis adapter khusus untuk setiap penyedia, kami dapat bekerja dengan hampir semua format API.
- Jika Anda tertarik menjadi penyedia konten FreePlay, hubungi kami melalui [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) atau buka isu di [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
