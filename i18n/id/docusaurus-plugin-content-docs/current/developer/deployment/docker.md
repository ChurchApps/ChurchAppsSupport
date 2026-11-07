---
title: "Self-Hosting dengan Docker"
description: "Pasang stack pribadi B1 Admin, portal anggota, API, dan MySQL di komputer Anda dengan Docker, lalu tingkatkan dan cadangkan dengan perintah b1."
---

# Self-Hosting dengan Docker

<div class="article-intro">

Jalankan instans pribadi Anda sendiri dari B1 Admin, portal anggota dan situs web B1, API, serta database MySQL di mesin apa pun yang menjalankan Docker, seperti server rumah, VPS kecil, atau perangkat on-prem. Satu perintah untuk memasang, satu perintah untuk memperbarui, dan setiap pembaruan membuat cadangan terlebih dahulu. Jika Anda tidak ingin mengelola server sama sekali, lihat [Self-Hosting di Railway](./railway-template.md) sebagai alternatif terkelola.

</div>

## Mulai Cepat

<div class="prereqs">
<h4>Yang Anda Butuhkan</h4>

- Mesin Linux (atau macOS / Windows dengan WSL atau Git Bash, karena pembantu `b1` adalah skrip bash) dengan [Docker Engine](https://docs.docker.com/engine/install/) dan Compose v2 (sudah termasuk di Docker Desktop)
- Sekitar 2 GB RAM dan 5 GB ruang disk
- Untuk situs publik: nama domain yang mengarah ke mesin tersebut, dengan port 80 dan 443 dapat diakses

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Hilangkan `--domain` untuk menjalankan di `http://localhost`. Installer akan membuat folder `b1church`, menulis `.env` dengan rahasia yang baru dibuat, menarik image siap pakai dari GitHub Container Registry, dan menunggu hingga API melaporkan kondisi sehat. Tidak ada yang dibangun di mesin Anda, jadi start pertama memakan waktu satu hingga dua menit.

Setelah selesai:

1. Buka **https://church.example.org/admin** (atau http://localhost/admin) dan klik **Register**. Akun pertama otomatis menjadi admin server.
2. Ikuti petunjuk di aplikasi untuk membuat gereja pertama Anda. Situs web dan portal anggotanya langsung aktif di **https://church.example.org/** begitu gereja tersebut dibuat.

Semuanya berjalan di bawah satu domain:

| Path | Layanan |
|------|---------|
| `/` | B1App — situs web gereja dan portal anggota |
| `/admin` | B1Admin — dasbor staf |
| `/api` | API, file yang diunggah, dan websocket pembaruan langsung |

HTTPS berjalan otomatis: proxy [Caddy](https://caddyserver.com/) yang disertakan akan memperoleh dan memperbarui sertifikat Let's Encrypt untuk domain di `.env`. Hanya port 80 dan 443 yang terbuka; database hanya dapat dijangkau dari dalam jaringan Docker.

## Perintah `b1`

Installer menyisakan skrip `deploy/b1` di samping `docker-compose.yml`. Ini adalah satu-satunya yang Anda perlukan sehari-hari:

| Perintah | Fungsi |
|----------|--------|
| `./deploy/b1 upgrade` | Menarik rilis terbaru, membuat cadangan, memulai ulang, dan memverifikasi bahwa API sehat |
| `./deploy/b1 upgrade 2026.10.1` | Sama seperti di atas, tetapi dipatok ke rilis tertentu |
| `./deploy/b1 backup` | Membuat snapshot database, file yang diunggah, dan `.env` ke dalam `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Mengembalikan snapshot (API berhenti selama proses ini berjalan) |
| `./deploy/b1 rollback` | Memulihkan cadangan terbaru, termasuk rilis tempat cadangan itu dibuat |
| `./deploy/b1 status` | Versi yang terpasang dan kondisi kontainer |
| `./deploy/b1 logs api` | Memantau log sebuah layanan secara langsung |

Rilis diterbitkan sebagai satu paket bernomor versi sehingga ketiga image selalu cocok. `B1_VERSION=stable` di `.env` mengikuti rilis terbaru; atur ke versi tertentu untuk mematoknya. Catatan rilis tersedia di [rilis B1Admin](https://github.com/ChurchApps/B1Admin/releases).

## Konfigurasi

Semua pengaturan berada di `.env` di samping `docker-compose.yml`. Installer mengisi pengaturan yang wajib:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # yang disajikan Caddy; http://localhost untuk instalasi lokal
PUBLIC_URL=https://church.example.org    # bagaimana browser dan email mencapai situs
MYSQL_ROOT_PASSWORD=…                    # dibuat otomatis
JWT_SECRET=…                             # dibuat otomatis
ENCRYPTION_KEY=…                         # dibuat otomatis, tepat 32 karakter — jangan pernah diubah setelah kredensial tersimpan

# Email — sangat disarankan; tanpa ini anggota tidak dapat mengatur ulang kata sandinya sendiri
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Setelah mengedit `.env`, terapkan dengan `docker compose up -d`. Aplikasi web menentukan API mana yang harus dihubungi dari alamat di browser, jadi mengganti domain cukup dengan memperbarui `SITE_ADDRESS` dan `PUBLIC_URL` lalu memulai ulang, tanpa perlu membangun ulang.

:::warning
Simpan `.env` dengan aman. `ENCRYPTION_KEY` melindungi kredensial gateway pembayaran dan penyimpanan yang tersimpan; cadangan tanpa kunci ini tidak dapat mendekripsinya. `./deploy/b1 backup` menyertakan salinannya untuk alasan tersebut.
:::

### Memindahkan ke domain nanti

Jika Anda menginstal di `localhost` dan kemudian ingin membuatnya publik: arahkan DNS ke mesin tersebut, atur `DOMAIN`, `SITE_ADDRESS` (domain tanpa awalan) dan `PUBLIC_URL` (`https://` + domain) di `.env`, lalu jalankan `docker compose up -d`. Caddy akan mengambil sertifikat pada permintaan pertama.

## Email, Donasi, Multi-Situs, dan Integrasi

Semuanya bekerja persis seperti di Railway, dengan variabel lingkungan yang sama, hanya diatur di `.env` alih-alih dasbor Railway:

- **[Email / SMTP](./railway-template.md#1-email-highly-recommended)** — panduan penyedia untuk Resend, Brevo, dan Gmail
- **[Multi-situs](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — gereja tanpa batas per instans. `/` menyajikan gereja yang slug-nya adalah `DEFAULT_CHURCH_SLUG` (gereja pertama adalah `church`); arahkan domain tambahan ke server dan petakan di **Settings → Domains** di B1Admin
- **[Donasi online](./railway-template.md#4-online-giving-stripe--paypal)** — dikonfigurasi per gereja di antarmuka admin
- **[Integrasi opsional](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Notifikasi push](#notifikasi-push)** — `WEB_PUSH_*`; installer membiarkan ini kosong, sehingga push nonaktif sampai Anda menambahkannya

Undangan dan email lain yang dikirim gereja diaktifkan otomatis pada instans self-hosted (layanan hosted menahan fitur ini di balik tinjauan manual untuk melindungi reputasi pengirim).

## Notifikasi Push

Notifikasi push web di browser dan perangkat seluler tetap nonaktif sampai server memiliki pasangan kunci VAPID. Installer tidak membuatnya. Sampai Anda menambahkannya, halaman Notifications di aplikasi web seluler akan menyatakan bahwa push belum diaktifkan untuk situs ini.

1. Buat pasangan kunci. Ini hanya memerlukan Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Tambahkan kedua nilai ke `.env`. `WEB_PUSH_SUBJECT` bersifat opsional dan merupakan alamat kontak yang dilihat oleh layanan push:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Terapkan:

   ```bash
   docker compose up -d
   ```

4. Untuk memastikan, buka **Server Admin → Server Health** di B1Admin. Kedua kunci Web Push seharusnya tampil sebagai sudah dikonfigurasi. Anggota kemudian dapat mengaktifkan notifikasi dari aplikasi web seluler.

:::warning
Gunakan kunci yang sama setelah anggota mendaftar. Mengubahnya akan membatalkan semua langganan yang ada, dan setiap perangkat harus mendaftar ulang.
:::

## Data, Cadangan, dan Penyimpanan File

Tiga volume Docker bernama menyimpan seluruh status:

| Volume | Isi |
|--------|-----|
| `b1church_mysql-data` | Semua skema database |
| `b1church_api-content` | File yang diunggah — foto, dokumen, gambar situs web |
| `b1church_caddy-data` | Sertifikat TLS |

`./deploy/b1 backup` menulis snapshot yang konsisten dari dua volume pertama beserta `.env` ke `backups/<timestamp>/`. Jadwalkan dengan cron dan salin folder tersebut ke tempat lain di luar mesin:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Untuk pustaka media yang besar, Anda dapat beralih penyimpanan file ke S3 — atur `FILE_STORE=S3` beserta variabel `AWS_*` yang dijelaskan di [bagian Penyimpanan File pada panduan Railway](./railway-template.md#5-file-storage). Cadangan database tidak menyertakan objek S3; aktifkan versioning bucket di sana.

## Memperbarui

```bash
./deploy/b1 upgrade
```

Urutannya: menarik rilis, membuat cadangan, membuat ulang kontainer, menjalankan migrasi database yang tertunda saat API mulai, dan menunggu pemeriksaan kesehatan API. Jika ada yang gagal, proses berhenti dan memberi tahu Anda untuk menjalankan `./deploy/b1 rollback`, yang akan memulihkan cadangan tersebut dan rilis sebelumnya. Migrasi hanya berjalan maju; melakukan rollback selalu berarti memulihkan snapshot.

Memperbarui dari file compose beta (yang membangun image dari sumber) bekerja dengan cara yang sama setelah Anda memiliki `.env`: file tersebut secara default menggunakan `MYSQL_ROOT_PASSWORD=churchapps`, jadi masukkan nilai itu ke `.env` bersama `PUBLIC_URL` dan `SITE_ADDRESS`, ganti `docker-compose.yml` dan `deploy/` dengan file terbaru, lalu jalankan `./deploy/b1 upgrade`.

## Membangun dari sumber

Pengembang dapat membangun image secara lokal alih-alih menariknya:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` dan `B1APP_CONTEXT` di `.env` mengarahkan build ke salinan lokal (misalnya `../Api`) atau ke ref git.

## Pemecahan Masalah

| Gejala | Kemungkinan penyebab | Solusi |
|--------|----------------------|--------|
| Kontainer `api` restart terus-menerus | kegagalan migrasi atau kata sandi database salah | `./deploy/b1 logs api` — migrasi akan menampilkan modul mana yang gagal |
| `api` mencatat "ENCRYPTION_KEY must be exactly 32 characters" | kunci di `.env` diedit manual atau terpotong | pulihkan kunci 32 karakter yang asli (buat yang baru hanya jika belum ada kredensial yang tersimpan) |
| Browser menampilkan peringatan sertifikat | DNS belum mengarah ke sini, atau port 80/443 diblokir | perbaiki DNS / firewall; Caddy akan mencoba ulang secara otomatis |
| `/` menampilkan dasbor, bukan situs web | belum ada gereja, atau `DEFAULT_CHURCH_SLUG` tidak cocok | buat gereja, atau atur slug dari **Settings → Church** |
| "Check your email" tetapi email tidak datang | `MAIL_SYSTEM=SMTP` dengan kredensial yang salah | perbaiki kredensial, atau hapus `MAIL_SYSTEM` untuk menonaktifkan email |
| Aplikasi web seluler menyatakan notifikasi push belum diaktifkan | belum ada kunci VAPID di server | tambahkan seperti dijelaskan di [Notifikasi Push](#notifikasi-push) |
| Fitur chat / live tidak berfungsi | websocket diblokir oleh proxy lain di depannya | socket berada di `/api/` pada port yang sama; izinkan header `Upgrade` |
| `install` menolak: "database volume already exists" | sisa dari instalasi sebelumnya | jalankan `docker compose down -v` untuk menghapus, atau tulis `.env` dan gunakan `upgrade` |

Masih mengalami kendala? Buka isu di [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) dengan menyertakan keluaran dari `./deploy/b1 logs`.

## Artikel Terkait

- **[Self-Hosting di Railway](./railway-template.md)** — alternatif hosting terkelola, beserta panduan konfigurasi pascadeploy bersama
- **[Pengaturan Awal](../../getting-started/initial-setup.md)** — langkah pertama setelah gereja Anda dibuat
- **[Pengaturan API Lokal](../api/local-setup.md)** — menjalankan seluruh stack secara langsung untuk pengembangan
