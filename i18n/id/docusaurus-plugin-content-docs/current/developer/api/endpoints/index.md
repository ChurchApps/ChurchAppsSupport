---
title: "Referensi Endpoint"
---

# Referensi Endpoint

<div class="article-intro">

Bagian ini mendokumentasikan semua endpoint REST yang disediakan oleh API ChurchApps. Setiap halaman modul mencantumkan setiap rute beserta metode HTTP, path, persyaratan autentikasi, dan izin yang diperlukan.

</div>

## URL Dasar

| Lingkungan | URL |
|-------------|-----|
| Pengembangan lokal | `http://localhost:8084` |
| Produksi | `https://api.churchapps.org` |

## Konvensi Permintaan

- **Content-Type:** Semua badan permintaan dan respons menggunakan `application/json`
- **Multi-tenant:** Setiap permintaan yang terautentikasi dibatasi ke `churchId` yang diambil dari token JWT — Anda tidak perlu menyertakan `churchId` di URL
- **Penyimpanan batch:** Sebagian besar endpoint `POST` menerima **array objek**. API akan menambahkan rekaman baru (tanpa field `id`) dan memperbarui rekaman yang sudah ada (dengan field `id`) dalam satu panggilan
- **ID:** Semua ID entitas berupa UUID

### Contoh: Penyimpanan Batch

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Objek pertama akan dibuat (baru); objek kedua akan diperbarui (memiliki `id`).

## Format Respons

Respons yang berhasil mengembalikan JSON, berupa satu objek atau array. Respons kesalahan menggunakan kode status HTTP standar:

| Kode | Arti |
|------|---------|
| `200` | Berhasil |
| `400` | Permintaan tidak valid (kesalahan validasi) |
| `401` | Tidak diizinkan (token hilang/tidak valid atau izin tidak mencukupi) |
| `404` | Tidak ditemukan |
| `500` | Kesalahan server |

Kesalahan validasi dikembalikan dalam bentuk:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Cara Membaca Tabel Endpoint

Setiap halaman modul mengelompokkan endpoint berdasarkan controller. Tabel menggunakan kolom-kolom berikut:

| Kolom | Keterangan |
|--------|-------------|
| **Method** | Metode HTTP (`GET`, `POST`, `DELETE`) |
| **Path** | Path rute relatif terhadap base path controller |
| **Auth** | **JWT** = memerlukan Bearer token, **Public** = tidak memerlukan autentikasi |
| **Permission** | Izin yang diperlukan (misalnya `People.Edit`). `—` berarti semua pengguna yang terautentikasi |
| **Description** | Fungsi endpoint |

Controller yang memperluas kelas dasar CRUD standar secara otomatis menyediakan empat endpoint: `GET /` (daftar semua), `GET /:id` (ambil berdasarkan ID), `POST /` (buat/perbarui), dan `DELETE /:id` (hapus).

## Modul Pelaporan

Modul Pelaporan bekerja berbeda dari modul lainnya. Alih-alih CRUD berbasis database, modul ini memuat definisi laporan dari file JSON di disk dan menjalankan kueri SQL berparameter.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Muat definisi laporan berdasarkan nama kunci |
| GET | `/reporting/reports/:keyName/run` | JWT | Jalankan laporan dan kembalikan hasilnya |

Parameter laporan diteruskan sebagai nilai query string (misalnya `?startDate=2024-01-01&endDate=2024-12-31`). Parameter `churchId` disisipkan secara otomatis dari token JWT. Setiap definisi laporan dapat menentukan persyaratan izinnya sendiri.

## Indeks Modul

| Modul | Base Path | Keterangan |
|--------|-----------|-------------|
| [Autentikasi](./authentication) | `/membership/users`, `/membership/oauth` | Login, pendaftaran, token JWT, OAuth, izin |
| [Keanggotaan](./membership) | `/membership/*` | Orang, gereja, grup, rumah tangga, peran, formulir, pengaturan |
| [Kehadiran](./attendance) | `/attendance/*` | Kampus, layanan, sesi, kunjungan, catatan check-in |
| [Konten](./content) | `/content/*` | Halaman, khotbah, acara, berkas, galeri, Alkitab, streaming |
| [Persembahan](./giving) | `/giving/*` | Donasi, dana, gerbang pembayaran, langganan |
| [Pesan](./messaging) | `/messaging/*` | Percakapan, notifikasi, perangkat, SMS |
| [Doing](./doing) | `/doing/*` | Rencana, tugas, penugasan, otomasi, penjadwalan |
