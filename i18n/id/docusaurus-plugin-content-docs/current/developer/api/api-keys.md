---
title: "Kunci API"
---

# Kunci API

<div class="article-intro">

Kunci API (token akses pribadi) adalah cara termudah untuk melakukan autentikasi ke API B1 dari skrip sisi server, konektor pihak ketiga (Zapier, Make, Google Sheets), atau dalam situasi apa pun yang tidak memerlukan alur OAuth yang lengkap. Sebuah kunci terikat pada orang tertentu di gereja tertentu dan mewarisi izin orang tersebut, yang dapat dipersempit dengan serangkaian cakupan (scope) opsional.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Admin gereja dengan izin **Edit Settings** membuat dan mengelola kunci
- Kunci mentah hanya ditampilkan **sekali** saat dibuat — simpan segera di tempat yang aman
- Semua permintaan API harus menggunakan **HTTPS**

</div>

## Format Kunci

Kunci API B1 terlihat seperti ini:

```
cak_<prefix>.<secret>
```

- `cak_` — pengenal tetap (awalan kunci API yang dicocokkan oleh lapisan autentikasi)
- `<prefix>` — segmen pencarian publik yang terdiri dari 8 karakter
- `<secret>` — rahasia sepanjang 48 karakter; hanya hash SHA-256 yang disimpan di sisi server

Kunci lengkap dikirim ke server dalam header bearer standar:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Lapisan autentikasi API mengarahkan setiap token yang diawali `cak_` ke jalur kunci API, melakukan hash pada rahasianya, mencarinya berdasarkan awalan, dan menentukan izin terkini dari orang pemilik kunci tersebut. Dengan demikian, pencabutan izin di B1Admin langsung berlaku pada permintaan berikutnya, dan kunci tidak pernah tidak sinkron dengan peran.

## Membuat Kunci (B1Admin)

1. Masuk ke B1Admin sebagai pengguna yang memiliki izin **Edit Settings**.
2. Buka **Settings → Developer → API Keys**.
3. Klik **New API Key**, beri nama yang mudah dikenali (misalnya "Zapier — sinkronisasi donasi), pilih cakupan yang harus dimiliki kunci tersebut, lalu klik **Save**.
4. Kunci `cak_…` lengkap ditampilkan **sekali** dalam sebuah dialog. Salin ke konfigurasi integrasi Anda sebelum menutup dialog — tidak ada cara untuk mengambilnya kembali nanti. Anda selalu dapat membuat kunci baru.

## Cakupan

Cakupan **mempersempit** apa yang dapat dilakukan sebuah kunci — cakupan tidak pernah dapat memberikan izin yang tidak dimiliki oleh orang yang mendasarinya. Cakupan kosong atau tidak ada berarti kunci memiliki seluruh rangkaian izin orang tersebut.

| Cakupan | Mengizinkan |
|---|---|
| `people:read` / `people:write` | Melihat / mengedit orang, rumah tangga, anggota grup |
| `groups:read` / `groups:write` | Melihat / mengedit grup dan keanggotaannya |
| `donations:read` / `donations:write` | Melihat / mencatat donasi |
| `attendance:read` / `attendance:write` | Melihat / mencatat kehadiran, sesi, dan check-in |
| `forms:write` | Mengelola formulir (akses baca sudah termasuk dalam akses tulis) |
| `content:read` / `content:write` | Melihat / mengedit konten situs web, pendaftaran, dan streaming |
| `messaging:read` / `messaging:write` | Membaca pesan; akses tulis juga mengizinkan pengiriman SMS |
| `roles:read` / `roles:write` | Melihat / mengedit definisi peran |
| `settings:read` / `settings:write` | Melihat / mengedit pengaturan gereja (**wajib** untuk mendaftarkan webhook secara terprogram) |
| `workflows:read` / `workflows:write` | Melihat alur kerja dan tugas / menjalankan dan mengedit alur kerja. Menjalankan alur kerja dapat mengirim email dan pesan teks, memicu webhook, dan mengubah keanggotaan grup |
| `offline_access` | Mengizinkan refresh token berumur panjang (hanya untuk alur OAuth — tidak berpengaruh pada kunci API) |

Cakupan `write` secara implisit mencakup `read` yang sesuai. Izin admin server dan admin domain sengaja tidak diekspos sebagai cakupan — kredensial yang dibatasi cakupan tidak akan pernah dapat naik menjadi administrator situs.

:::tip
Jika Anda akan menggunakan kunci untuk mendaftarkan webhook (misalnya untuk integrasi Zapier atau Make), kunci tersebut memerlukan `settings:write`. Kunci yang hanya memiliki `people:read` akan diam-diam menghasilkan respons 403 pada `POST /membership/webhooks`.
:::

## Menggunakan Kunci

Sama seperti token bearer lainnya — setiap endpoint yang memerlukan autentikasi menerima kunci API persis seperti menerima JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Permintaan yang kuncinya memiliki cakupan tidak mencukupi akan mendapatkan respons **403 Forbidden** dengan bentuk yang sama seperti kesalahan penolakan izin lainnya.

## Mengelola Kunci melalui API

Semua endpoint berada di bawah jalur `/membership/apiKeys` pada modul Membership dan memerlukan JWT (bukan kunci API) dari admin gereja dengan izin **Edit Settings**.

| Metode & Jalur | Tujuan |
|---|---|
| `GET /membership/apiKeys` | Menampilkan daftar kunci gereja (tanpa rahasia — hanya `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Menampilkan daftar semua nama cakupan yang tersedia — untuk antarmuka pembuatan kunci |
| `POST /membership/apiKeys` | Membuat kunci baru. Body: `{ "name": "...", "scopes": ["people:read"] }`. Respons menyertakan kunci mentah `cak_…` **sekali**. |
| `DELETE /membership/apiKeys/:id` | Mencabut kunci — berlaku pada permintaan berikutnya |

Kunci yang dicabut langsung tidak berlaku — tidak ada masa tenggang.

## Praktik Terbaik

- **Satu kunci untuk setiap integrasi.** Jika ada sesuatu yang disusupi, Anda cukup mencabut satu kunci tanpa merusak integrasi lainnya.
- **Buat kunci dengan cakupan sesempit mungkin yang masih berfungsi.** Ekspor Google Sheets hanya memerlukan `people:read`, bukan `settings:write`.
- **Ikat kunci ke akun layanan, bukan ke anggota staf sungguhan.** Jika anggota staf keluar, akses B1-nya berakhir — dan begitu pula semua kunci yang dibuat di bawah identitasnya.
- **Simpan kunci di pengelola rahasia** (variabel lingkungan penyedia hosting Anda, AWS Secrets Manager, dll.) — jangan pernah di kontrol sumber.
- **Rotasi kunci** jika Anda mencurigai adanya paparan: buat kunci baru, perbarui integrasi, lalu hapus kunci lama.

## Perbedaannya dengan OAuth

Kunci API cocok ketika **gereja Anda adalah satu-satunya yang menggunakan integrasi tersebut**. Untuk konektor yang perlu mengakses banyak gereja dengan persetujuan eksplisit dari masing-masing gereja — seperti aplikasi SaaS yang digunakan bersama di komunitas B1 — gunakan [OAuth dan Aplikasi Terhubung](./connected-apps) sebagai gantinya.

| | Kunci API | OAuth |
|---|---|---|
| Siapa yang memasang | Satu admin gereja | Setiap admin gereja mengotorisasi aplikasi |
| Header autentikasi | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Masa berlaku token | Hingga dicabut | Akses ≈ 7 hari, refresh ≈ 90 hari |
| Paling cocok untuk | Skrip internal, konektor Zapier/Make/Sheets | Aplikasi pihak ketiga multi-penyewa |
