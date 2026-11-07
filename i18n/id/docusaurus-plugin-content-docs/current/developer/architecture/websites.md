---
title: "Perutean Situs Web & Multi-Situs"
description: "Cara B1.church memetakan subdomain dan domain kustom ke gereja atau situs sekunder yang tepat, serta edge Caddy yang menangani TLS untuk domain kustom."
---

# Perutean Situs Web & Multi-Situs

<div class="article-intro">

Satu gereja kini dapat melayani lebih dari satu situs web yang berbeda, dan masing-masing dapat berada di subdomain `*.b1.church` atau di domain kustom sepenuhnya yang dimiliki gereja. Halaman ini memetakan lapisan perutean yang berada *di bawah* pembuat situs: bagaimana permintaan masuk diselesaikan menjadi gereja **dan** situs tertentu, model data multi-situs (nilai penanda `siteId` yang menjaga setiap situs yang sudah ada tetap tampil tanpa perubahan), serta tepi domain kustom, yaitu proxy Caddy yang dikelola sendiri di EC2 yang menangani TLS dan menulis ulang setiap domain gereja ke hulu `*.b1.church`-nya. Untuk hal yang benar-benar ditampilkan setelah permintaan berhasil diselesaikan, yaitu pohon halaman/bagian/elemen, lihat [Pembuat Situs Web](./website-builder.md).

</div>

## Ikhtisar

```
   grace.b1.church              www.gracechurch.org  (domain kustom)
   (subdomain b1.church)                  │
          │                               ▼
          │             ┌──────────────────────────────────────────┐
          │             │ Tepi Caddy — EC2 3.23.251.61              │
          │             │             (proxy.b1.church)             │
          │             │  • mengakhiri TLS (sertifikat LE per domain) │
          │             │  • menulis ulang Host → {sub}.b1.church   │
          │             │  • reverse-proxy ke B1App                 │
          │             └────────────────────┬─────────────────────┘
          │                  Host = {sub}.b1.church
          ▼                                  ▼
   ┌────────────────────────────────────────────────────────────┐
   │ B1App src/middleware.ts                                     │
   │  • selalu: hapus x-site yang dikirim klien (anti-spoof)     │
   │  • Host *.b1.church internal ⇒ pencarian domain tetap nonaktif │
   │  • Host kustom mentah (melewati Caddy) ⇒ pencarian → set x-site │
   └───────────────────────────┬────────────────────────────────┘
                               ▼  next.config.mjs → label pertama host → /[sdSlug]/…
              ┌─────────────────────────────────────────────────┐
              │ [sdSlug] · ConfigHelper.load(sdSlug)             │
              │   GET /membership/churches/lookup/?subDomain=…   │
              │   → { id, name, subDomain, siteId? }             │
              │   meneruskan ?siteId= ke setiap panggilan konten: │
              │   /content/pages/:id/tree · /globalStyles ·      │
              │   /blocks/public/footer · /links · sitemap       │
              └─────────────────────────────────────────────────┘

  penyimpanan/penghapusan domain (B1Admin Pengaturan→Domain → POST /membership/domains)
        └─ CaddyHelper.updateCaddy() best-effort (dibungkus, tidak fatal, timeout 10 dtk)
  Caddy membaca tabel domain sendiri melalui dua endpoint anonim:
        GET /membership/domains/authorize  — `ask` TLS sesuai permintaan (200 dikenal / 404 tidak dikenal)
        GET /membership/domains/hostmap    — peta host→{sub}.b1.church (penyegaran tiap 5 menit)
```

Tiga aturan berlaku di seluruh lapisan ini:

1. **Nilai penanda menjaga kompatibilitas mundur.** `siteId = ''` adalah situs utama. Setiap halaman, blok, tautan, gaya global, dan baris domain yang sudah ada sebelum fitur ini memiliki `''` dan tampil persis seperti sebelumnya. Situs *kedua* hanyalah sekumpulan baris dengan `siteId` yang tidak kosong, dan setiap endpoint konten yang dipanggil tanpa `?siteId=` akan mengembalikan situs utama, sama persis dengan permintaan lama.
2. **Perutean berbasis label host dan konvergen.** Subdomain `*.b1.church` diarahkan langsung berdasarkan label host-nya; domain kustom ditulis ulang ke label `{sub}.b1.church` di tepi Caddy sebelum B1App melihatnya (dengan pencarian DB middleware yang memberi cap header `x-site` sebagai cadangan untuk Host kustom mentah apa pun). Kedua jalur bermuara pada rute `[sdSlug]` yang sama dan panggilan `churches/lookup` yang sama, sehingga rendering di hilir identik.
3. **Tepi Caddy tidak menyimpan status di atas satu sumber kebenaran.** Domain kustom diakhiri di proxy Caddy yang dikelola sendiri di EC2, yang menulis ulang setiap domain ke hulu `{sub}.b1.church`-nya. Penyimpanan domain memicu satu `CaddyHelper.updateCaddy()` best-effort, dan Caddy juga membaca tabel `domains` secara langsung (endpoint `authorize` dan `hostmap` di bawah). Tabel ini adalah sumber otoritatif, sehingga Caddy yang tidak dapat dijangkau tidak akan pernah menggagalkan penyimpanan.

## Resolusi situs

### Subdomain `*.b1.church`

`B1App/next.config.mjs` menulis ulang permintaan masuk berdasarkan host. Aturan host dengan pola `(?<subdomain>.*?)\..*` menangkap **label pertama** dari host dan menulis ulang `/` dan `/:path*` menjadi `/{subdomain}`, yaitu segmen App Router `[sdSlug]`. Jadi `grace.b1.church/about` menjadi `/grace/about`.

Di dalam `src/app/[sdSlug]/`, `ConfigHelper.load(sdSlug)` (`src/helpers/ConfigHelper.ts`) memanggil `GET /membership/churches/lookup/?subDomain={sdSlug}`. Respons `ChurchController.getBySubDomain` kini memiliki dua cabang:

| Slug cocok dengan | Respons | Artinya |
|-------------------|---------|---------|
| `churches.subDomain` | `{ id, name, subDomain }` | Situs utama gereja tersebut |
| `sites.subDomain` | `{ id, name, subDomain, siteId }` | **Situs sekunder**. Controller beralih ke `sites`, menemukan gereja pemiliknya, dan mengembalikan slug yang diminta beserta `siteId` tambahan |

`siteId` tambahan itulah satu-satunya hal yang membedakan permintaan situs sekunder dari permintaan situs utama; semua hal lain dalam alur pemrosesan bersifat sama.

Slug yang tidak cocok dengan kedua tabel akan dikembalikan sebagai `{}` dengan status `200`. `ConfigHelper.load` memperlakukan respons tanpa `id` sebagai situs tidak dikenal dan memanggil `notFound()` dari Next, sehingga subdomain yang tidak dikenal menghasilkan 404 sungguhan alih-alih membuat setiap panggilan berikutnya meminta `/…/undefined`. Rute halaman pembuat juga membangun jalur pohonnya dengan `pageTreePath()` (`src/helpers/pageTreePath.ts`), yang melakukan URL-encode pada slug, sehingga slug yang salah format (backslash, spasi) menghasilkan 404 alih-alih meneruskan `400` dari API sebagai 500.

### Domain kustom

Domain milik gereja diakhiri di **tepi Caddy** (dijelaskan di bawah), yang menulis ulang header `Host` menjadi `{sub}.b1.church` situs tersebut sebelum meneruskan ke B1App. Jadi pada jalur normal, B1App menerima host `*.b1.church` yang *internal* dan menyelesaikannya berdasarkan label host persis seperti subdomain asli; pencarian DB middleware tidak pernah dijalankan. `src/middleware.ts` tetap berjalan pada setiap permintaan, tetapi dengan satu tugas tetap dan satu cadangan:

1. **Selalu** — ia **menghapus header `x-site` apa pun yang dikirim klien**. Header itu adalah input penulisan ulang yang dapat dipalsukan dan hanya dipercaya jika middleware sendiri yang menetapkannya; menghapusnya adalah tugas nyata middleware di balik Caddy.
2. **Cadangan, hanya untuk `Host` non-internal** — untuk `Host` domain kustom mentah yang mencapai B1App *tanpa* penulisan ulang Caddy, ia memanggil `GET /membership/domains/public/lookup/{host}` dan, jika itu mengembalikan `subDomain`, menetapkan `x-site: {subDomain}.b1.church`. Di balik Caddy, cabang ini tidak aktif karena `Host` sudah berupa `*.b1.church`.

Host internal — `localhost`, `b1.church`, dan sufiks `.b1.church`, `.localtest.me`, `.localhost`, `.up.railway.app`, `.vercel.app` — sepenuhnya melewati pencarian (karena sudah diselesaikan oleh penulisan ulang berbasis label host, atau merupakan host pratinjau/deployment).

Pencarian itu sendiri (`DomainRepo.loadByName`) melakukan left join `domains → churches` dan `domains → sites`, dan mengembalikan `COALESCE(NULLIF(sites.subDomain,''), churches.subDomain)`: subdomain situs sekunder yang ditetapkan jika domain mengarah ke sana, jika tidak maka subdomain gereja. Pencarian pertama-tama mencocokkan host persis; jika host itu diawali `www.` dan tidak ditemukan, pencarian akan **sekali** mencoba ulang dengan apex polos.

Kembali di `next.config.mjs`, aturan penulisan ulang `x-site` ditempatkan **sebelum** aturan host generik, sehingga aturan tersebut diutamakan. `x-site: grace.b1.church` → label pertama `grace` → `[sdSlug] = grace`, dan dari sana resolusinya identik dengan jalur subdomain (`churches/lookup` yang sama, `siteId` yang sama).

:::info
Header `x-site` tidak dipercaya dari luar. Middleware secara tanpa syarat menghapus `x-site` masuk apa pun sebelum opsional menetapkan miliknya sendiri, dan aturan penulisan ulang hanya melihat nilai yang ditetapkan middleware. Klien tidak dapat memaksakan diri ke konten gereja lain dengan mengirim header.
:::

Dua detail operasional pada middleware:

- **Cache.** Hasil setiap host (hit *atau* miss yang dipastikan, bukan kesalahan jaringan) disimpan selama **10 menit** dalam `Map` di memori, per isolate serverless.
- **Matcher.** Matcher secara sengaja menyertakan kembali `/sitemap.xml`, `/robots.txt`, dan `/manifest.webmanifest`. Pola pertamanya mengecualikan jalur yang memiliki titik, yang jika tidak akan menghilangkan berkas-berkas itu; berkas tersebut ditambahkan kembali agar berkas SEO/PWA per gereja pada domain kustom juga menerima header `x-site`.
- **Header kanonis.** Untuk halaman gereja, middleware menambahkan header respons `Link: <{proto}://{host}{path}>; rel="canonical"` yang menyebutkan host tempat halaman sebenarnya disajikan, yaitu subdomain atau domain kustom (`helpers/canonicalLink.ts`). Ketika domain kustom mencapai B1App melalui [proxy Caddy](../deployment/caddy-proxy.md), host permintaan adalah subdomain `{sub}.b1.church`, sehingga middleware menggunakan domain pengunjung dari `X-Church-Host` sebagai gantinya, tetapi hanya setelah `/domains/public/lookup/{host}` memastikan bahwa domain tersebut memetakan ke subdomain yang sama (`ownsSubdomain()`). Tautan kanonis, `robots.txt`, dan `sitemap.xml` kemudian menyebutkan domain kustom alih-alih subdomain `b1.church`. Ini dilewati pada host non-gereja (`b1.church`, `localhost`, `*.vercel.app`, `*.up.railway.app`) dan pada `/mobile`, `/login`, `/logout`, serta berkas robots/sitemap/manifest yang dihasilkan.

### Menonaktifkan situs publik

Gereja dapat mengaktifkan **Nonaktifkan Situs Publik** di B1Admin (pengaturan konten tingkat gereja `hidePublicSite = "true"`). Situs kemudian hanya melayani rute yang ditujukan untuk anggota:

- **Middleware B1App** mencari subdomain (`/membership/churches/lookup` lalu `/content/settings/public/:churchId`) dan mengalihkan permintaan anonim untuk jalur apa pun di luar daftar izin ke `/login?returnUrl={path}{query}`. Daftar izin (`helpers/publicSite.ts`) berisi `/login`, `/logout`, `/mobile/*`, `/register/*`, `/guest-register`, serta berkas manifest/robots/sitemap. Hanya jawaban yang dipastikan yang di-cache (60 detik di produksi, karena panggilan revalidate dari admin tidak dapat menghapus peta per-instance ini; tidak di-cache di dev/test). Kesalahan API akan menampilkan situs alih-alih mengunci semua orang.
- **Anggota yang sudah masuk melihat situs lengkap.** Permintaan yang membawa cookie `jwt` yang belum kedaluwarsa (`hasSession()` pada middleware men-decode `exp` dari payload tanpa memverifikasi tanda tangan; ini adalah gerbang lunak, bukan kontrol akses) melewati pengalihan, sehingga setelah masuk, anggota kembali ke halaman yang diminta dan melihat halaman normal, halaman bawaan (Kelompok, Khotbah, dll.), serta navigasi header. Komponen halaman dan `Header` tidak lagi memeriksa `hidePublicSite` sendiri.
- **`robots.txt`** melarang semua hal, sama seperti pada host noindex.
- **API.** `GET /content/pages/public/:churchId` (daftar halaman sitemap) mengembalikan `[]`, sehingga pemanggil anonim tidak dapat mendaftar halaman.

### Penerusan `siteId`

`ConfigHelper` menyimpan `siteId` yang telah diselesaikan pada `ConfigurationInterface` per permintaannya (di-memoize dengan `cache()` dari React) dan menambahkan `?siteId=` ke panggilan konten yang dibuatnya dan yang dibuat oleh komponen halaman, dengan **bersyarat**: `siteId` kosong (subdomain gereja utama) menghilangkan parameter sepenuhnya. Endpoint yang diteruskan adalah pohon halaman (`/content/pages/:id/tree`), daftar halaman publik yang digunakan sitemap (`/content/pages/public/:id`), gaya global (`/content/globalStyles/church/:id`), tautan navigasi (`/content/links/church/:id`), dan blok footer mandiri (`/content/blocks/public/footer/:id`). Pada jalur render normal, footer datang di dalam pohon halaman (bagian yang diberi tag `zone: "siteFooter"`), yang sudah diambil dengan `siteId`, sehingga tidak ada celah footer yang tidak dibatasi.

Portal anggota (B1App `mobile`) sengaja berada di luar ini: `loadChurchAppearance.ts` menyelesaikan gereja melalui `churches/lookup` tetapi membaca `/settings/public/{id}` tingkat gereja dan tidak pernah meneruskan `siteId`. Portal bersifat untuk seluruh gereja di v1 (lihat di bawah).

## Beberapa situs web per gereja

### Model data

Tabel `membership.sites` yang baru sengaja dibuat sangat kecil:

| Kolom | Tipe | Catatan |
|-------|------|---------|
| `id` | `char(11)` PK | |
| `churchId` | `char(11)` | Gereja pemilik |
| `name` | `varchar(255)` | Nama tampilan (misalnya "Español", "Youth") |
| `subDomain` | `varchar(45)` | **Indeks unik**, namespace global (lihat di bawah) |

Pembatasan situs kemudian hanyalah satu kolom yang ditambahkan ke tabel konten dan domain, tanpa kemungkinan nol:

| Tabel (modul) | Kolom | `''` berarti |
|---------------|-------|--------------|
| `domains` (membership) | `siteId char(11) NOT NULL DEFAULT ''` | Domain melayani situs utama |
| `pages`, `links`, `globalStyles`, `blocks` (content) | `siteId char(11) NOT NULL DEFAULT ''` | Situs utama, dan pada **`blocks`**, `''` juga berarti *dibagikan ke semua situs* |

Dua migrasi menambahkan semua ini (`tools/migrations/membership/2026-07-02_sites.ts`, `tools/migrations/content/2026-07-02_site_id.ts`). Karena kolom default-nya `''`, setiap baris yang ada tetap berperilaku seperti sekarang tanpa perlu backfill.

**Namespace subdomain global.** `sites.subDomain` berbagi *satu* namespace dengan `churches.subDomain`, sehingga subdomain situs tidak pernah bisa bertabrakan dengan subdomain gereja atau situs lain. Ini diberlakukan pada **kedua** jalur penyimpanan: `SiteController.save` menolak slug yang sudah ada di `churches` maupun `sites`, dan `ChurchController.validateSave` melakukan hal yang sama secara terbalik. Indeks unik pada `sites.subDomain` mendukungnya di tingkat database.

**Keunikan halaman** diperluas dari `(churchId, url)` menjadi `(churchId, siteId, url)`, sehingga dua situs dari satu gereja masing-masing dapat memiliki `/about` sendiri.

### Konten per situs, dengan cadangan

Setiap endpoint **daftar/pohon** konten yang dibatasi situs menerima `?siteId=` opsional (jika tidak ada ⇒ `''` = utama): pohon/daftar/publik halaman, daftar/menurut-tipe/footer blok, tautan (anonim / terfilter / semua), dan gaya global. Bagian dan elemen *tidak* dibatasi secara langsung; keduanya mewarisi dari halaman atau blok induknya.

Dua rantai resolusi melakukan pekerjaan menarik:

- **Gaya global — `situs → utama → default`.** `GlobalStyleRepo.loadForChurch(churchId, siteId)` mengembalikan baris milik situs tersebut; jika situs sekunder tidak memilikinya, ia mengembalikan **baris utama (`''`) apa adanya** (mempertahankan `id`/`siteId` milik utama, yang digunakan klien untuk copy-on-write); jika utama juga tidak ada, `GlobalStyleController` mengembalikan palet/font default yang ditetapkan secara tetap.
- **Blok footer — footer khusus situs diutamakan, yang dibagikan sebagai cadangan.** `BlockRepo.loadByBlockType(churchId, "footerBlock", siteId)` mengembalikan baris bersama (`''`) *dan* baris khusus situs; resolver memilih footer milik situs jika ada, jika tidak memakai yang bersama. Logika yang sama berjalan baik di `TreeHelper.insertBlocks` (pohon halaman) maupun di endpoint mandiri `/content/blocks/public/footer/:churchId`.

### Kaskade penghapusan situs

`SiteController.delete` (dibatasi oleh izin Pengaturan→Edit membership) menghapus situs sekunder dalam tiga langkah:

1. `ContentModuleGateway.deleteSiteContent(churchId, siteId)` mengkaskade semua konten yang dimiliki situs: **halaman**-nya beserta bagian, elemen, `pageHistory`, dan `posts`; **blok**-nya beserta bagian, elemen, dan `pageHistory`; serta **tautan** dan **globalStyles**-nya. Penjaga menolak berjalan untuk `''`; nilai penanda utama/bersama tidak pernah dikaskade.
2. `DomainRepo.clearSiteId` **menetapkan ulang** domain situs kembali ke utama (`siteId → ''`) alih-alih menghapusnya, sehingga domain kustom tetap ada setelah situs dihapus.
3. Baris `sites` dihapus dan rute Caddy disinkronkan ulang (best-effort).

### Permukaan B1Admin

| Kemampuan | Lokasi | Mekanisme |
|-----------|--------|-----------|
| Pengganti situs | `useSiteSelection` + `SiteSwitcher` (kosong = "Situs Utama") | Membaca parameter URL `?site=` dan meneruskannya sebagai `?siteId=` ke panggilan ContentApi. Tersedia di tiga area **daftar** Situs: **Halaman**, **Blok**, **Tampilan**, tetapi *tidak* pada editor halaman/blok, yang membawa `siteId` pada rekamannya |
| Buat/hapus situs | `SitesDialog`, dibuka dari entri "Kelola situs web…" pada pengganti situs | `POST /membership/sites` / `DELETE /membership/sites/:id` (nama + subDomain). Dibatasi oleh izin Pengaturan→Edit membership (`Permissions.settings.edit` di server; `Permissions.membershipApi.settings.edit` di B1Admin). **Hanya buat/hapus. Tidak ada UI ganti nama di v1** |
| Penugasan situs per domain | `DomainSettingsEdit` di bawah Pengaturan→Domain | Dropdown situs per baris mengirim `siteId` per domain ke `/membership/domains`. Kolom ini disembunyikan jika API tidak mengembalikan situs (backend lama) |
| Gaya copy-on-write | `StylesManager.prepareForSave` | Ketika `siteId` dari baris gaya global yang dimuat tidak cocok dengan situs yang dipilih (yaitu API mengembalikan utama yang diwarisi sebagai cadangan), ia menghapus `id` milik utama dan menetapkan `siteId` saat ini, sehingga memaksa **penyisipan** baris khusus situs baru alih-alih menimpa utama. Percabangan saat tidak cocok yang sama juga berlaku untuk blok footer situs |

:::info
**Yang tetap berlaku untuk seluruh gereja di v1 (pilihan cakupan yang disengaja, bukan batasan model data):** **blog** (`BlogPage` tidak memiliki pengganti dan memuat `/posts` tanpa `siteId`), **widget situs** (banner pengumuman + peluncur), **pengalihan**, **logo / GA4 / pengaturan gereja**, dan **portal anggota** (B1App mobile). Perhatikan bahwa ini *bukan* "seluruh Tampilan". Gaya global situs sekunder (palet, font, tipografi, spasi, navigasi, CSS kustom) **memang** per situs melalui jalur copy-on-write di atas; hanya sub-panel banner/peluncur/pengalihan/logo pada halaman Tampilan yang tetap berlaku untuk seluruh gereja.
:::

## Domain kustom: tepi Caddy (rencana konfigurasi statis)

:::info
**Arah direvisi 2026-07-02.** Rencana sebelumnya untuk memindahkan hosting domain kustom ke domain yang dikelola Vercel **dibatalkan**, dan semua kode pendaftaran domain Vercel (`VercelHelper`, variabel lingkungan `vercelToken`/`vercelProjectId`/`vercelTeamId`, parameter SSM, dan entri kesehatan) dihapus dari Api. Proxy Caddy yang dikelola sendiri di EC2 **tetap dipertahankan** sebagai tepi domain kustom yang permanen. Satu-satunya pekerjaan yang tersisa bersifat internal: mengganti konfigurasi *runtime* Caddy melalui admin API dengan konfigurasi *statis* yang bertahan setelah restart.
:::

### Tepi

Setiap domain gereja kustom mengarahkan DNS ke satu kotak EC2, yaitu `3.23.251.61`, yang juga dapat diakses sebagai `proxy.b1.church`. Layar Pengaturan→Domain di B1Admin meminta gereja untuk menambahkan `A` apex → `3.23.251.61` atau `CNAME` → `proxy.b1.church`. Caddy mengakhiri TLS dengan sertifikat Let's Encrypt per domain, menulis ulang header `Host` ke hulu `{sub}.b1.church` milik domain tersebut, dan melakukan reverse-proxy ke B1App, yang kemudian merutekannya berdasarkan label host seperti subdomain asli mana pun (lihat [Domain kustom](#domain-kustom) di atas).

Pemetaan hulu berasal dari `DomainRepo.loadPairs`, yang dial-nya melakukan COALESCE pada subdomain situs yang ditetapkan, sehingga domain di-proxy ke situs **sekunder** yang benar dan kembali ke utama gereja jika tidak ada:

```sql
CONCAT(COALESCE(NULLIF(s.subDomain,''), c.subDomain), '.b1.church:443')  AS dial
WHERE d.domainName NOT LIKE '%www.%'
```

Baris `www.*` dikecualikan dari peta; Caddy melayani `www.{host}` melalui pengalihan `302` ke apex.

### Dua endpoint anonim yang memberi makan tepi

`DomainController` menyediakan dua endpoint baca-saja tanpa autentikasi yang dikonsumsi langsung oleh kotak tersebut. Keduanya anonim karena memang harus: tepi melakukan kueri ke endpoint ini sebelum konteks gereja apa pun ada.

| Endpoint | Mengembalikan | Peran |
|----------|---------------|-------|
| `GET /membership/domains/authorize?domain=` | `200` jika domain, atau untuk kegagalan `www.`, apex polosnya, ada di `domains`; jika tidak `404` (termasuk `domain` kosong) | **`ask` TLS sesuai permintaan** Caddy: kontrol penyalahgunaan yang memutuskan apakah akan menerbitkan sertifikat untuk SNI yang masuk |
| `GET /membership/domains/hostmap` | `text/plain`, satu baris `{domain} {sub}.b1.church` yang diurutkan per domain yang dapat dirutekan | Berkas peta host→hulu yang disegarkan kotak tersebut secara berkala |

`authorize` menggunakan ulang `DomainRepo.loadByName` (host persis, lalu satu kali coba ulang `www.`→apex); `hostmap` menggunakan ulang `loadPairs`, sehingga sadar-situs dan mengecualikan `www.*`, identik dengan rute proxy, dan hanya menghapus sufiks `:443`.

### Penyimpanan/penghapusan domain: satu dorongan best-effort

`DomainController.save` menulis baris `domains` lalu melakukan **satu** panggilan `CaddyHelper.updateCaddy()` best-effort, dibungkus dalam `try/catch` yang mencatat (`console.error`) dan menelan kesalahan; `delete` melakukan hal yang sama (yang juga memperbaiki bug rute usang saat penghapusan sebelumnya), begitu pula penghapusan situs sekunder (`SiteController.delete`). `updateCaddy` sendiri dibatasi oleh timeout Axios **10 detik**, sehingga Caddy yang tidak dapat dijangkau atau berhenti tidak akan pernah menghasilkan `500` pada penyimpanan domain. Tabel `domains` adalah sumber kebenaran.

### Keadaan saat ini: konfigurasi statis, tanpa status runtime

Kotak tersebut (EC2 Windows di belakang Elastic IP permanen) menjalankan Caddy dari **Caddyfile statis**: TLS sesuai permintaan dengan `ask` yang mengarah ke `/membership/domains/authorize`, ditambah berkas peta host→hulu yang disegarkan setiap 5 menit dari `/membership/domains/hostmap` oleh tugas terjadwal yang diakhiri dengan `caddy reload` yang halus. Konfigurasi bertahan setelah restart tanpa status runtime sama sekali, tanpa proses priming ulang, dan SNI yang tidak dikenal **ditolak TLS-nya** (tidak ada sertifikat yang diterbitkan untuk host yang ditolak `authorize`), sementara host yang diotorisasi tetapi belum dipetakan (domain baru di dalam jendela sinkronisasi) mendapatkan 404 yang bersih. Domain baru dapat dirutekan dalam sekitar 5 menit setelah penyimpanan; sertifikatnya diterbitkan saat pertama kali diakses. Pembangunan/penyiapan, operasi, dan jebakan yang telah teruji di lapangan: [Proxy Domain Kustom Caddy](../deployment/caddy-proxy.md).

### Dorongan runtime lama: jalur rollback, menunggu penghapusan

`CaddyHelper` (modul membership) masih dapat menjalankan Caddy melalui **admin API**-nya di `caddyHost:caddyPort` (SSM `caddyHost`/`caddyPort`; tidak melakukan apa-apa jika tidak diatur; ditampilkan di bawah grup Integrasi `ServerHealthController`): `updateCaddy()` melakukan PATCH pada seluruh array rute, dan `initializeCaddy()` beserta endpoint `GET /membership/domains/caddy/init` / `GET /membership/domains/caddy` membangun ulang server yang dikonfigurasi runtime dari awal. Konfigurasi mode itu hanya hidup di memori Caddy, yaitu amnesia-restart yang digantikan oleh arsitektur ini. Mesin tersebut tetap ada semata-mata sebagai jalur rollback dan dijadwalkan untuk dihapus setelah kotak statis stabil; dorongan `updateCaddy()` best-effort pada penyimpanan/penghapusan domain adalah operasi tanpa efek yang tidak berbahaya terhadap kotak statis (admin API-nya hanya dapat diakses dari localhost).

## Halaman terkait

- [Proxy Domain Kustom Caddy](../deployment/caddy-proxy.md): kotak tepi itu sendiri, yaitu penyiapan kotak baru, layanan WinSW, tugas sinkronisasi peta, dan jebakan operasional
- [Pembuat Situs Web](./website-builder.md): pohon halaman/bagian/elemen, renderer, blog, SEO, dan pembuatan AI (yang ditampilkan setelah permintaan berhasil diselesaikan ke gereja/situs)
- [Endpoint Konten](../api/endpoints/content.md): permukaan REST untuk halaman, blok, tautan, dan gaya global, yang kini semuanya sadar `?siteId=`
- [B1App](../web-apps/b1-app.md): aplikasi Next.js yang menjadi host middleware dan perutean `[sdSlug]`
- [Deployment Aplikasi Web](../deployment/web-apps.md): cara B1App di-deploy ke Vercel
