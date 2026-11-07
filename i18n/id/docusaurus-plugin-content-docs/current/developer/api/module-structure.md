---
title: "Struktur Modul"
---

# Struktur Modul

<div class="article-intro">

Setiap modul API mengikuti struktur internal yang konsisten, yaitu controller, repository, model, dan helper. Memahami tata letak ini memudahkan Anda menelusuri basis kode dan menambahkan fungsi baru ke modul mana pun.

</div>

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Siapkan API secara lokal -- lihat [Penyiapan API Lokal](./local-setup)
- Tinjau arsitektur [Basis Data](./database) untuk memahami lapisan akses data

</div>

## Tata Letak Direktori

Modul berada di bawah `src/modules/{name}/`. Modul tipikal berisi empat direktori:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

Sebagai contoh, modul membership:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Keenam modul data inti -- membership, attendance, content, giving, messaging, dan doing -- semua mengikuti tata letak ini. Beberapa modul khusus (seperti reporting, yang melayani laporan lintas modul dan tidak memiliki data sendiri) berada di samping modul-modul tersebut di bawah `src/modules/`.

## Satu Aplikasi, Banyak Modul

API ini adalah **monolit modular**: modul menandai batas organisasi kode dan kepemilikan data, bukan layanan terpisah. Saat startup, controller setiap modul didaftarkan ke satu kontainer dependency injection di balik satu aplikasi Express, sehingga seluruh API dibangun, dijalankan, dan di-deploy sebagai satu unit. Fungsi-fungsi yang di-deploy dan dijelaskan di bawah ini semuanya adalah titik masuk ke aplikasi yang sama.

Rute setiap modul berada di bawah awalan URL yang sesuai dengan nama modulnya:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Dengan cara ini, permukaan API setiap modul tetap mandiri, sementara klien tetap berkomunikasi dengan satu host.

## Controller

Controller mendefinisikan rute API untuk sebuah modul. Setiap modul memiliki base controller sendiri (misalnya `MembershipBaseController`), yang memperluas `BaseController` bersama, yang sendiri dibangun di atas `CustomBaseController` dari `@churchapps/apihelper`. Rute didaftarkan dengan decorator Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper` mengautentikasi permintaan dan mengisi `this.repos` dengan repository modul sebelum menjalankan aksi Anda.

### Decorator Rute

| Decorator | Metode HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Decorator `@controller("/base")` menetapkan jalur dasar untuk semua rute dalam controller.

## Repository

Repository menangani semua operasi basis data. Tidak ada ORM -- kueri ditulis dengan query builder Kysely, yang diketik sesuai skema basis data modul. File `db/index.ts` setiap modul menyediakan fungsi `getDb()` yang mengembalikan instance Kysely bertipe milik modul tersebut.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

Di dalam controller, repository modul tersedia sebagai `this.repos`. Di luar controller, peroleh melalui `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Komunikasi Lintas Modul

Setiap modul memiliki basis datanya sendiri (lihat [Basis Data](./database)), dan sebuah modul tidak pernah langsung mengkueri tabel milik modul lain. Ketika satu modul membutuhkan data milik modul lain -- misalnya, modul doing mencari orang dari membership -- ia melalui **gateway** milik modul pemilik di `src/shared/modules/`:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Setiap gateway (`MembershipModuleGateway`, `GivingModuleGateway`, dan sebagainya) adalah antarmuka TypeScript yang mendefinisikan secara tepat operasi apa saja yang diekspos modul pemilik ke bagian API lainnya. Antarmuka ini adalah kontraknya: implementasi saat ini membaca basis data modul pemilik secara in-process, tetapi karena pemanggil hanya bergantung pada antarmuka, sebuah implementasi dapat diganti -- misalnya, dengan yang melakukan panggilan HTTP -- jika suatu saat modul dipisahkan menjadi layanan tersendiri.

:::info
Jika data yang Anda butuhkan berada di modul lain dan gateway-nya tidak menyediakan operasi untuknya, perluas antarmuka gateway alih-alih mengakses repository atau basis data modul lain.
:::

## Autentikasi dan Otorisasi

### Autentikasi JWT

Semua permintaan diautentikasi melalui token JWT yang ditangani oleh `CustomAuthProvider`. Token divalidasi secara otomatis dan konteks pengguna terautentikasi (`au`) tersedia di setiap aksi controller.

### Pemeriksaan Izin

Gunakan `au.checkAccess()` untuk memverifikasi bahwa pengguna saat ini memiliki izin yang diperlukan. Izin adalah konstanta yang telah ditentukan, yang menggabungkan jenis konten dan aksi:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

Jika pengguna tidak memiliki izin yang diperlukan, respons kesalahan akan dikembalikan secara otomatis.

:::warning
Selalu panggil `au.checkAccess()` sebelum melakukan operasi data apa pun. Jangan pernah melewati pemeriksaan izin, bahkan untuk endpoint yang tampaknya hanya membaca.
:::

## Konfigurasi Lingkungan

Kelas `Environment` menangani konfigurasi di berbagai lingkungan:

- **Pengembangan lokal:** Membaca dari file `.env` di direktori root proyek
- **Lingkungan yang di-deploy:** Membaca dari AWS SSM Parameter Store

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

Abstraksi ini berarti kode Anda tidak perlu mengetahui dari mana konfigurasi berasal.

## Fungsi Lambda

Saat di-deploy ke AWS, API berjalan sebagai enam fungsi Lambda:

| Fungsi | Tujuan |
|--------|--------|
| `web` | Menangani semua permintaan REST API HTTP |
| `socket` | Mengelola koneksi WebSocket untuk fitur real-time |
| `timer15Min` | Dijadwalkan setiap 30 menit untuk notifikasi email (nama ini bersifat historis) |
| `timerMidnight` | Dijadwalkan setiap hari untuk email ringkasan dan pemeliharaan |
| `timerScheduledTasks` | Dijadwalkan setiap hari untuk otomasi yang jatuh tempo dan pemrosesan alur kerja yang terlambat |
| `timerWebhooks` | Dijadwalkan setiap menit untuk mengirimkan webhook keluar yang antre |

:::info
Secara lokal, fungsi `web` berjalan di port 8084 dan fungsi `socket` berjalan di port 8087. Fungsi timer dapat dipicu secara manual selama pengembangan.
:::

## Artikel Terkait

- **[Basis Data](./database)** -- String koneksi, skrip skema, dan pola akses data
- **[Penyiapan API Lokal](./local-setup)** -- Panduan penyiapan lengkap langkah demi langkah
- **[ApiHelper](../shared-libraries/api-helper)** -- Pustaka bersama yang menyediakan `CustomBaseController` dan middleware autentikasi
