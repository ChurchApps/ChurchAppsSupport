---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin adalah dasbor administrasi gereja -- aplikasi halaman tunggal (SPA) berbasis React yang dibangun dengan Vite dan Material-UI. Staf gereja menggunakannya untuk mengelola data orang, grup, kehadiran, donasi, konten, dan lainnya.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Pasang **Node.js 22+** dan **Git** -- lihat [Prasyarat](../setup/prerequisites)
- Atur target API Anda (demo atau lokal) -- lihat [Variabel Lingkungan](../setup/environment-variables)

</div>

## Pengaturan

### 1. Clone repositori

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Pasang dependensi

```bash
cd B1Admin
npm install
```

### 3. Atur variabel lingkungan

```bash
cp dotenv.sample.txt .env
```

Buka `.env` dan atur endpoint API. Anda dapat mengarahkannya ke API demo bersama (`https://api.demo.churchapps.org`) atau instans API lokal Anda. File contoh mungkin masih mencantumkan URL staging yang sudah tidak digunakan; ganti URL tersebut.

### 4. Jalankan server pengembangan

```bash
npm start
```

Perintah ini menjalankan server pengembangan Vite. Aplikasi akan tersedia di browser Anda dengan hot module replacement aktif.

## Variabel Lingkungan Utama

| Variabel | Deskripsi |
|----------|-----------|
| `REACT_APP_STAGE` | Nama lingkungan (misalnya `demo` seperti di file contoh, `prod`, atau `selfhost`) |
| `PORT` | Port server pengembangan (default: `3101`) |
| `REACT_APP_*_API` | URL endpoint API untuk setiap modul |

:::info
Skrip `postinstall` menyalin file locale dan CSS dari `@churchapps/apphelper`. Jika komponen tampak tanpa gaya, jalankan `npm run postinstall` secara manual.
:::

## Perintah Utama

| Perintah | Deskripsi |
|----------|-----------|
| `npm start` | Menjalankan server pengembangan Vite |
| `npm run build` | Build produksi melalui Vite |
| `npm run test` | Menjalankan pengujian end-to-end dengan Playwright |
| `npm run lint` | Menjalankan ESLint dengan perbaikan otomatis |

## Tumpukan Teknologi

- **React 19** dengan TypeScript
- **Vite** untuk alat build dan server pengembangan
- **Material-UI 7** untuk komponen UI
- **React Query 5** untuk state server
- **`@churchapps/apphelper*`** paket untuk komponen bersama

## Deployment

Build produksi di-deploy ke **S3 + CloudFront**:

1. `npm run build` menghasilkan aset statis
2. Aset disinkronkan ke bucket S3
3. Invalidasi CloudFront dipicu agar versi baru disajikan

:::tip
Untuk instruksi deployment yang lebih rinci, lihat panduan [Deployment Aplikasi Web](../deployment/web-apps).
:::
