---
title: "Variabel Lingkungan"
---

# Variabel Lingkungan

<div class="article-intro">

Setiap proyek ChurchApps menggunakan file `.env` untuk konfigurasi lokal. Setiap proyek menyertakan file contoh yang bisa Anda salin dan sesuaikan. Halaman ini membahas variabel lingkungan untuk API, aplikasi web, dan aplikasi seluler, termasuk cara memilih antara target API demo dan lokal.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Pasang [prasyarat](./prerequisites) untuk proyek Anda
- Kloning repositori proyek yang ingin Anda kerjakan
- Tinjau [Ikhtisar Proyek](./project-overview) untuk memahami modul API mana yang dibutuhkan proyek Anda

</div>

## Pola Umum

1. Cari `dotenv.sample.txt` atau `.env.sample` di direktori root proyek.
2. Salin file tersebut menjadi `.env`.
3. Ubah nilainya sesuai kebutuhan.

```bash
# Contoh untuk proyek dengan .env.sample
cp .env.sample .env

# Contoh untuk proyek dengan dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Jangan pernah meng-commit file `.env` ke sistem kontrol versi.** File ini berisi rahasia seperti kredensial database, kunci API, dan rahasia JWT. Semua proyek ChurchApps sudah mencantumkan `.env` di `.gitignore`, tetapi tetap periksa kembali sebelum melakukan commit.
:::

## Memilih Target API

Keputusan terpenting adalah ke mana frontend Anda mengarahkan panggilan API. Ada dua pilihan:

### Opsi 1: API Demo (Direkomendasikan untuk Pengembangan Frontend)

Gunakan lingkungan demo bersama. Tidak perlu menyiapkan API lokal atau database. Lingkungan ini menjalankan kode terbaru dari `main`, dan data contohnya diisi ulang setiap malam.

```bash
# Pola URL dasar
https://api.demo.churchapps.org/{module}

# Contoh URL modul
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Lingkungan staging (`api.staging.churchapps.org`, `api.staging.lessons.church`, dan host terkait) sudah dihentikan. Beberapa file `.env` contoh mungkin masih berisi URL staging; ganti dengan nilai demo atau lokal yang ditampilkan di halaman ini. Tidak ada API Lessons non-produksi yang bersifat bersama -- jalankan [LessonsApi](https://github.com/ChurchApps/LessonsApi) secara lokal (berjalan di port `8090`) jika Anda membutuhkannya.
:::

### Opsi 2: API Lokal

Jalankan proyek Api di komputer Anda. Membutuhkan MySQL 8.0+ dengan database yang sudah dibuat untuk setiap modul. Lihat panduan [penyiapan lokal API](../api/local-setup).

```bash
# Pola URL dasar
http://localhost:8084/{module}

# Contoh URL modul
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Variabel Lingkungan API

Proyek **Api** inti (`.env.sample`) memiliki konfigurasi paling banyak. Berikut variabel utamanya:

### Pengaturan Bersama

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `ENVIRONMENT` | Lingkungan runtime | `dev` |
| `SERVER_PORT` | Port HTTP untuk server pengembangan lokal | `8084` |
| `ENCRYPTION_KEY` | Kunci enkripsi 192-bit untuk data sensitif | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Rahasia untuk menandatangani JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Tempat menyimpan file yang diunggah (`disk` atau `s3`) | `disk` |
| `CORS_ORIGIN` | Asal CORS yang diizinkan (`*` untuk pengembangan lokal) | `*` |

### Koneksi Database

Satu URL dasar mengarahkan API ke MySQL. API menurunkan satu database per modul (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) dari basis ini.

| Variabel | Contoh |
|----------|--------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Ganti `root:password` dengan kredensial MySQL Anda yang sebenarnya. Setiap database per modul harus sudah ada sebelum menjalankan API. Gunakan `npm run initdb` untuk membuat skema untuk semua modul, atau `npm run initdb:membership` untuk satu modul saja.
:::

### Pengaturan WebSocket

| Variabel | Deskripsi | Contoh |
|----------|-----------|--------|
| `SOCKET_PORT` | Port untuk server WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket untuk klien terhubung | `ws://localhost:8087` |

---

## Variabel Lingkungan Aplikasi Web

### B1Admin (React + Vite)

File contoh: `.env.sample`

| Variabel | Deskripsi | Contoh (Demo) |
|----------|-----------|----------------|
| `REACT_APP_STAGE` | Nama lingkungan | `demo` |
| `PORT` | Port server pengembangan | `3101` |
| `REACT_APP_API_BASE` | Satu URL dasar untuk semua API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ditambahkan otomatis) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL pengiriman konten | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (opsional) | `UA-123456789-1` |

Untuk pengembangan dengan API lokal, arahkan URL dasar ke tumpukan lokal Anda:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

File contoh: `.env.sample`

| Variabel | Deskripsi | Contoh (Demo) |
|----------|-----------|----------------|
| `NEXT_PUBLIC_API_BASE` | Satu URL dasar untuk semua API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` ditambahkan otomatis) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pengiriman konten | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (opsional) | `UA-123456789-1` |

:::info
Next.js mewajibkan awalan `NEXT_PUBLIC_` untuk setiap variabel lingkungan yang perlu tersedia di browser. Variabel khusus server tidak memerlukan awalan ini.
:::

### LessonsApp (Next.js)

File contoh: `dotenv.sample.txt`

| Variabel | Deskripsi | Contoh (LessonsApi Lokal) |
|----------|-----------|----------------------------|
| `STAGE` | Tahap lingkungan (biarkan tidak diatur atau `dev` untuk pengembangan lokal) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL Lessons API | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL pengiriman konten | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | Basis ChurchApps API yang digunakan untuk masuk (hanya dipakai jika `STAGE` tidak diatur atau `dev`) | `https://api.demo.churchapps.org` |

---

## Variabel Lingkungan Aplikasi Seluler

### B1Mobile (React Native / Expo)

File contoh: `dotenv.sample.txt`

| Variabel | Deskripsi | Contoh (Demo) |
|----------|-----------|----------------|
| `STAGE` | Nama lingkungan | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Satu URL untuk setiap modul API ChurchApps (masing-masing default ke produksi jika tidak diatur) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | Lessons API (host terpisah; tidak ada yang bersifat bersama untuk non-produksi) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL pengiriman konten | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL situs Lessons | `https://lessons.church` |

:::info
Aplikasi seluler tidak menggunakan awalan `REACT_APP_` atau `NEXT_PUBLIC_`. Akses variabel lingkungan ditangani oleh konfigurasi Expo.
:::

---

## Referensi Cepat: Lokasi File Contoh

| Proyek | File Contoh |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
