---
title: "Autentikasi & Izin"
description: "Referensi login JWT, masuk dua faktor, alur OAuth 2.0, dan model izin API ChurchApps bagi pengembang yang membangun integrasi."
---

# Autentikasi & Izin

<div class="article-intro">

API ChurchApps menggunakan autentikasi berbasis JWT. Pengguna masuk untuk menerima token yang menyimpan identitas, keanggotaan gereja, dan izin mereka. Halaman ini membahas alur autentikasi, model izin, dan dukungan OAuth.

</div>

## Alur Masuk

### Masuk Standar

```
POST /membership/users/login
```

**Autentikasi:** Publik

Menerima salah satu dari tiga jenis kredensial:

| Field | Deskripsi |
|-------|-----------|
| `email` + `password` | Masuk standar dengan email dan kata sandi |
| `jwt` | Autentikasi ulang dengan JWT yang sudah ada |
| `authGuid` | Tautan autentikasi sekali pakai (digunakan dalam email selamat datang/reset) |

**Respons:**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Field `token` adalah JWT yang harus dikirim sebagai `Authorization: Bearer <token>` pada permintaan berikutnya.

### Verifikasi Dua Langkah

Pengguna dapat mengaktifkan verifikasi dua langkah berbasis aplikasi autentikator (TOTP). Untuk pengguna tersebut, masuk dengan `email` + `password`, `authGuid`, atau SSO tidak mengembalikan token. Sebagai gantinya, server mengembalikan tantangan:

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Token tantangan berlaku selama 5 menit. Kirim kembali token tersebut ke endpoint yang sama beserta kodenya:

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` dapat berupa kode autentikator 6 digit yang sedang berlaku atau salah satu dari sepuluh kode cadangan sekali pakai milik pengguna. Kode yang salah akan mengembalikan `Invalid code`, dan percobaan yang gagal berulang kali dibatasi per akun. Masuk ulang dengan `jwt` tidak pernah ditantang, sehingga sesi yang sudah ada tetap dapat diperbarui. Objek `user` pada respons masuk memuat `mfaEnabled`.

Endpoint layanan mandiri (hanya untuk pengguna yang sudah masuk, di bawah `/membership/users/mfa`):

| Endpoint | Deskripsi |
|----------|-----------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Memulai pengaturan; mengembalikan `{ secret, otpauthUrl }` untuk kode QR |
| `POST /enable` | Body `{ code }`; mengaktifkan dan mengembalikan `{ backupCodes }` hanya sekali |
| `POST /disable` | Body `{ code }` (kode autentikator atau kode cadangan); menonaktifkan |
| `POST /reset/:userId` | Hanya Server.Admin; menonaktifkan untuk pengguna lain |

Rahasia disimpan dalam bentuk terenkripsi dan kode cadangan disimpan dalam bentuk hash. Pengaktifan, penonaktifan, dan reset dicatat dalam log audit.

### Isi Token

JWT menyimpan:
- `id` — ID pengguna
- `churchId` — Gereja yang sedang dipilih
- `personId` — Catatan orang untuk gereja yang dipilih
- Array izin per API

### Pemilihan Gereja

Pengguna dapat tergabung dalam beberapa gereja. Respons masuk menyertakan semua gereja beserta izinnya. Untuk berpindah gereja, klien membuat JWT baru yang dibatasi ke gereja lain, berdasarkan data dari respons masuk.

## Pendaftaran Pengguna

### Mendaftarkan Pengguna Baru

```
POST /membership/users/register
```

**Autentikasi:** Publik

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Membuat pengguna dengan kata sandi sementara dan mengirim email selamat datang berisi tautan autentikasi. Pengguna pertama yang mendaftar pada instans baru otomatis mendapatkan akses admin server.

Dua field opsional sebagai jebakan bot diterima: `website` (field tersembunyi yang sengaja dibiarkan kosong oleh pengguna sungguhan) dan `fillMs` (berapa lama formulir terbuka, dalam milidetik). Jika `website` terisi atau `fillMs` kurang dari 2000, akun tidak dibuat, tetapi endpoint tetap mengembalikan `200` seperti biasa agar bot tidak tahu bahwa permintaannya ditolak. Klien yang tidak menyertakan kedua field ini tetap dapat mendaftar seperti biasa.

### Mendaftarkan Gereja Baru

```
POST /membership/churches/add
```

**Autentikasi:** JWT

Setelah mendaftarkan pengguna, panggil endpoint ini untuk membuat gereja dan mengaitkannya dengan pengguna tersebut.

## Manajemen Kata Sandi

| Metode | Jalur | Autentikasi | Deskripsi |
|--------|-------|-------------|-----------|
| POST | `/membership/users/forgot` | Publik | Mengirim email reset kata sandi. Body: `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Publik | Menetapkan kata sandi baru menggunakan GUID autentikasi dari email reset. Body: `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Mengubah kata sandi pengguna saat ini. Body: `{ "newPassword": "..." }` |

## Model Izin

Izin dikelompokkan berdasarkan modul dan diberikan kepada pengguna melalui peran. Setiap izin memiliki **jenis konten** dan **tindakan**.

### Referensi Izin

| Bagian Tampilan | Jenis Konten | Tindakan | Deskripsi |
|----------------|--------------|----------|-----------|
| **Kehadiran** | Attendance | Checkin | Mencatat kehadiran anggota di ibadah |
| | Attendance | Edit | Mengedit catatan kehadiran |
| | Services | Edit | Mengelola ibadah dan jadwal ibadah |
| | Attendance | View | Melihat catatan kehadiran |
| | Attendance | View Summary | Melihat ringkasan dan laporan kehadiran |
| **Donasi** | Donations | Edit | Membuat dan mengedit catatan donasi |
| | Settings | Edit | Mengedit pengaturan pemberian/pembayaran |
| | Donations | View Summary | Melihat laporan ringkasan donasi |
| | Donations | View | Melihat catatan donasi individual |
| **Orang dan Grup** | Forms | Admin | Administrasi formulir secara penuh |
| | Forms | Edit | Mengedit definisi formulir |
| | Plans | Edit | Mengedit rencana ibadah |
| | Group Members | Edit | Menambah/menghapus anggota grup |
| | Groups | Edit | Membuat dan mengedit grup |
| | Households | Edit | Mengedit penugasan rumah tangga |
| | People | Edit | Mengedit catatan orang mana pun |
| | People | Edit Self | Hanya mengedit catatan pribadi Anda sendiri |
| | Roles | Edit | Mengelola peran dan penugasan pengguna |
| | Group Members | View | Melihat daftar anggota grup |
| | People | View Members | Hanya melihat anggota (bukan pengunjung) |
| | People | View | Melihat semua orang |
| | Roles | View | Melihat peran dan penugasannya |
| | Settings | Edit | Mengedit pengaturan gereja |
| **Konten** | Content | Edit | Mengedit halaman, bagian, dan elemen |
| | Settings | Edit | Mengedit pengaturan konten |
| | StreamingServices | Edit | Mengelola konfigurasi layanan streaming |
| | Chat | Host | Menjadi host/memoderasi sesi obrolan |
| **Pesan** | Texting | Send | Mengirim pesan teks SMS |

### Cara Izin Diperiksa

Di controller, izin diperiksa menggunakan metode `au.checkAccess()`:

```typescript
// Memerlukan izin tertentu
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Atau di dalam actionWrapper — sistem CRUD memeriksa secara otomatis
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Admin Server

Izin `Server.Admin` memberikan akses penuh ke semua gereja. Izin ini diberikan kepada pengguna pertama yang mendaftar dan dapat diberikan kepada orang lain melalui peran admin server.

## OAuth 2.0

API mendukung OAuth 2.0 untuk integrasi pihak ketiga. Tersedia dua jenis grant.

### Alur Authorization Code

1. **Otorisasi:** `POST /membership/oauth/authorize` (memerlukan JWT)
   - Body: `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, hanya `S256`) wajib untuk klien publik tanpa secret
   - Mengembalikan: `{ "code": "...", "state": "..." }`

2. **Menukar kode dengan token:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Kirim `code_verifier` jika langkah otorisasi menggunakan `code_challenge`; klien publik tidak perlu menyertakan `client_secret`. Body JSON maupun form-encoded diterima
   - Mengembalikan: `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Memperbarui token:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Access token kedaluwarsa setelah **12 jam**.

### Alur Device Code (RFC 8628)

Untuk perangkat tanpa browser (aplikasi TV, kiosk):

1. **Meminta device code:** `POST /membership/oauth/device/authorize` (Publik)
   - Body: `{ "client_id": "...", "scope": "..." }`
   - Mengembalikan: `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **Pengguna memasukkan kode** di verification URI lalu menyetujui atau menolak

3. **Melakukan polling untuk token:** `POST /membership/oauth/token` (Publik)
   - Body: `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Mengembalikan `authorization_pending` hingga disetujui, lalu mengembalikan access token

### Manajemen Klien OAuth

| Metode | Jalur | Autentikasi | Izin | Deskripsi |
|--------|-------|-------------|------|-----------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Menampilkan semua klien OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Mengambil klien berdasarkan ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Mengambil klien berdasarkan client ID (secret disembunyikan) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Membuat atau memperbarui klien |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Menghapus klien |
| POST | `/membership/oauth/register` | Publik | — | Pendaftaran klien dinamis (RFC 7591) untuk klien publik seperti konektor MCP. Lihat [Aplikasi Terhubung](../connected-apps.md#dynamic-client-registration) |

### Endpoint Persetujuan Perangkat

| Metode | Jalur | Autentikasi | Deskripsi |
|--------|-------|-------------|-----------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Mengambil informasi device code yang menunggu untuk antarmuka persetujuan |
| POST | `/membership/oauth/device/approve` | JWT | Menyetujui otorisasi perangkat. Body: `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Menolak otorisasi perangkat. Body: `{ "user_code": "..." }` |

## Endpoint Publik vs Terautentikasi

API menggunakan dua fungsi pembungkus yang menentukan persyaratan autentikasi:

- **`actionWrapper`** — Memerlukan JWT yang valid. Objek pengguna terautentikasi (`au`) tersedia dengan `churchId`, `userId`, dan pemeriksaan izin.
- **`actionWrapperAnon`** — Tidak memerlukan autentikasi. Digunakan untuk masuk, pendaftaran, pencarian konten publik, dan penerima webhook.

Dalam tabel endpoint di seluruh dokumentasi ini, keduanya ditandai masing-masing sebagai **JWT** dan **Publik** pada kolom Autentikasi.

## Halaman Terkait

- [Struktur Modul](../module-structure.md) — Cara controller, repository, dan model diorganisasi
- [Pengaturan Lokal](../local-setup.md) — Menjalankan API secara lokal untuk pengembangan
