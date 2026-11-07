---
title: "Basis Data"
---

# Basis Data

<div class="article-intro">

API ChurchApps menggunakan arsitektur **satu-basis-data-per-modul**. Setiap dari enam modul data memiliki basis data MySQL sendiri dengan connection pool yang independen. Pendekatan ini memberikan batas data yang jelas sekaligus tetap berada dalam satu deployment.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Instal **MySQL 8.0+** -- lihat [Prasyarat](../setup/prerequisites)
- Konfigurasikan string koneksi basis data di berkas `.env` Anda -- lihat [Variabel Lingkungan](../setup/environment-variables)

</div>

## Ikhtisar Arsitektur

```
Api
├── membership_db   ← Orang, grup, izin
├── attendance_db   ← Layanan, sesi, catatan
├── content_db      ← Halaman, bagian, elemen
├── giving_db       ← Donasi, dana, pembayaran
├── messaging_db    ← Percakapan, notifikasi
└── doing_db        ← Tugas, rencana, penugasan
```

### Keputusan Desain Utama

- **Satu basis data per modul** -- Setiap modul memelihara basis data MySQL sendiri dengan connection pool khusus (dikelola oleh `KyselyPool`). Hal ini membuat modul-modul tetap terpisah dan memungkinkan evolusi skema yang independen.
- **Kepemilikan eksklusif** -- Tabel milik sebuah modul hanya dibaca dan ditulis oleh kode modul itu sendiri. Ketika modul lain membutuhkan data tersebut, ia memanggil gateway modul pemilik, bukan langsung membaca tabelnya -- lihat [Komunikasi Lintas Modul](./module-structure#cross-module-communication).
- **Pola repositori tanpa ORM** -- Semua akses data dilakukan melalui kelas repositori yang membangun SQL bertipe menggunakan Kysely query builder terhadap skema modul. Dengan cara ini, performa dan perilaku kueri dapat dikendalikan sepenuhnya.
- **Multi-tenant sejak awal** -- Setiap kueri dibatasi oleh `churchId`. Semua tabel memiliki kolom `churchId`, dan lapisan repositori menerapkan isolasi tenant secara otomatis.

## String Koneksi

Koneksi basis data setiap modul dikonfigurasi di `.env` menggunakan format string koneksi MySQL standar:

```
mysql://user:password@host:port/database
```

Sebagai contoh, pengaturan pengembangan lokal mungkin terlihat seperti ini:

Setiap modul membaca koneksinya dari variabel lingkungan bernama `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Di lingkungan produksi, string koneksi disimpan di AWS SSM Parameter Store dan dibaca oleh kelas `Environment` saat startup.
:::

## Skrip Skema

Skema tabel didefinisikan sebagai migrasi Kysely di direktori `tools/migrations/`, diorganisasi berdasarkan modul:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrasi mendefinisikan pembuatan tabel, indeks, dan perubahan skema. Direktori `tools/dbScripts/` berisi data demo dan data awal yang dapat dimuat di atas skema.

## Inisialisasi Basis Data

### Inisialisasi semua basis data

```bash
npm run initdb
```

Perintah ini membuat keenam basis data dan menjalankan migrasi untuk masing-masing.

### Inisialisasi satu modul

```bash
npm run initdb -- --module=membership
```

:::tip
Saat bekerja pada modul tertentu, Anda dapat menginisialisasi ulang basis data modul tersebut saja tanpa memengaruhi modul lainnya.
:::

## Pola Akses Data

Repositori membangun kueri dengan Kysely query builder terhadap skema basis data bertipe milik modul, yang diperoleh melalui fungsi `getDb()` modul. Metode repositori yang umum terlihat seperti ini:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repositori diperoleh melalui `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Selalu sertakan `churchId` dalam kueri Anda untuk menjaga isolasi multi-tenant. Jangan pernah melakukan kueri lintas tenant kecuali Anda memiliki alasan spesifik dan berwenang untuk melakukannya.
:::

## Referensi Lintas Modul

Karena data setiap modul berada di basis data terpisah, tidak ada foreign key maupun SQL join lintas batas modul. Catatan yang berkaitan dengan data modul lain menyimpan id catatan tersebut -- misalnya, donasi di basis data giving membawa `personId` dari seseorang di basis data membership -- dan penggabungan lintas modul dilakukan di kode aplikasi.

Batasan ini yang membuat batas modul benar-benar nyata: setiap skema dapat berkembang secara independen, basis data sebuah modul dapat dipindahkan ke server sendiri, dan sebuah modul bahkan dapat dipisahkan menjadi layanan mandiri tanpa harus mengurai tabel bersama atau kueri lintas basis data.

## Artikel Terkait

- **[Struktur Modul](./module-structure)** -- Cara controller dan repositori diorganisasi di dalam setiap modul
- **[Pengaturan API Lokal](./local-setup)** -- Panduan pengaturan lengkap langkah demi langkah
