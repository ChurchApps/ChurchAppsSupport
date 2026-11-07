---
title: "Arsitektur Website Builder"
description: "Peta pengembang pembuat situs B1: pohon konten, katalog elemen bersama, pipeline render, dan pembuatan halaman berbasis AI di B1 Admin dan B1.church."
---

# Arsitektur Website Builder

<div class="article-intro">

Setiap situs web gereja yang disajikan oleh B1App dirender dari sebuah pohon konten (halaman, bagian, elemen) yang disimpan di ContentApi dan diedit secara visual di B1Admin. Satu pustaka komponen bersama merender pratinjau editor maupun situs langsung, satu katalog tipe elemen mendefinisikan apa saja yang boleh muncul di halaman, dan sebuah layanan AI terpisah dapat membuat atau menulis ulang pohon tersebut. Halaman ini memetakan seluruh tumpukannya: kontrak elemen di `@churchapps/helpers`, alur render, elemen data gereja, widget seluruh situs, lapisan blog, halaman dengan pembatasan akses, SEO, pembuatan AI, dan formulir percakapan.

</div>

## Gambaran umum

```
┌──────────────────────────────┐             ┌─────────────────────────────────────────┐
│  B1Admin — editor            │             │  Api — /content module (ContentApi)     │
│  ContentEditor · SectionEdit │  POST /…    │                                         │
│  ElementEdit · PageLinkEdit  │ ──────────▶ │  pages ─ sections ─ elements   blocks   │
│  SiteWidgetsEdit · Blog      │             │  posts   redirects   settings   styles  │
└──────────┬───────────────────┘             └───────────────┬─────────────────────────┘
           │                                                 │ GET /content/pages/:churchId/tree?url=…
           │        shared render pipeline                   ▼            (anon, JWT honored)
           │   ┌───────────────────────────────┐   ┌─────────────────────────────────┐
           └──▶│  @churchapps/helpers          │◀──│  B1App — public site (Next.js)  │
               │    ElementTypes.ts (catalog)  │   │  Zone → Section → Element       │
               │  @churchapps/apphelper        │   │  + widgets, JSON-LD, sitemap,   │
               │    ElementRegistry, renderers │   │    redirects, branded 404       │
               │    SectionDivider, widgets    │   └───────────────┬─────────────────┘
               └───────────────────────────────┘                   │ church-data elements
┌──────────────────────────────┐                                   ▼
│  AskApi — /website/* (AI)    │             ┌─────────────────────────────────────────┐
│  generateSite · rewriteSection│            │  /giving/funds/public/…/total           │
│  generateAltText · metaDesc  │             │  /membership/groupmembers/public/…      │
│  returns JSON; B1Admin saves │             │  /attendance/servicetimes/public/…      │
└──────────────────────────────┘             └─────────────────────────────────────────┘
```

Tiga aturan berlaku di seluruh tumpukan ini:

1. **Satu pohon, dua renderer.** Halaman adalah pohon `pages → sections → elements` di mana setiap simpul membawa pengaturannya sebagai blob JSON `answers`. Komponen apphelper yang sama merender editor seret-dan-lepas di B1Admin dan situs publik yang dirender di server oleh B1App. Tidak ada "format publikasi" yang terpisah.
2. **Kontraknya ada di `@churchapps/helpers`.** `ElementTypes.ts` adalah satu-satunya katalog tipe elemen; renderer diselesaikan melalui registri di apphelper; formulir editor berada di B1Admin. Menambah tipe elemen berarti menyentuh ketiganya, dengan urutan tersebut.
3. **Situs publik membaca endpoint anonim.** Semua yang dibutuhkan B1App (pohon halaman, pengaturan, postingan blog, redirect, dan endpoint data gereja di modul lain) bersifat publik. Autentikasi bersifat opsional: JWT pada endpoint pohon anonim membuka halaman khusus anggota, tetapi tidak ada yang lain yang berubah.

## Pohon konten

Modul konten (`Api/src/modules/content`) memiliki data builder:

| Tabel | Peran |
|-------|------|
| `pages` | Satu halaman per URL: `url`, `title`, `layout`, ditambah `visibility`/`groupIds` (pembatasan akses) dan `metaDescription` (SEO) |
| `sections` | Pita horizontal pada halaman (atau di dalam blok): latar belakang, warna teks, dan `answersJSON` yang memuat gaya serta konfigurasi pembatas bentuk `dividerTop`/`dividerBottom` |
| `elements` | Potongan konten di dalam section: `elementType` + `answersJSON`, dapat disarangkan untuk tipe tata letak (baris/kolom, carousel) |
| `blocks` | Grup section/elemen yang dapat digunakan ulang (blok footer, blok elemen) yang dibagikan antar halaman |
| `posts` | Postingan blog mandiri (lihat [Blog](#blog)) |
| `redirects` | Pasangan `fromPath → toPath` per gereja, dibatasi 200 (lihat [SEO](#seo-and-discoverability)) |
| `settings` | Pengaturan gereja berbentuk key-value; baris yang ditandai `public` disajikan secara anonim dan membawa konfigurasi widget/analitik |

Seluruh pohon untuk satu URL dikembalikan melalui satu panggilan anonim, `GET /content/pages/:churchId/tree?url=/about`, dan dari sinilah B1App merender di server. Permintaan editor justru mengambil berdasarkan id dan mempertahankan id internal.

## Kontrak elemen

### Katalog (`@churchapps/helpers`)

`Packages/helpers/src/ElementTypes.ts` mendefinisikan setiap tipe elemen sebagai `ElementTypeDefinition`: `elementType`, `label`, `category`, `schemaVersion`, `defaults`, dan `answersSchema` bergaya JSON-schema untuk jawabannya. `validateElementAnswers()` sengaja dibuat longgar. Tipe yang tidak dikenal dan kunci ekstra tetap lolos, sehingga konten lama tidak rusak saat katalog ditingkatkan. **Saat ini ada 35 tipe:**

| Kategori | Tipe elemen |
|----------|---------------|
| tata letak (6) | row, column, box, carousel, whiteSpace, block |
| konten (11) | text, textWithPhoto, card, faq, iconFeature, testimonial, socialIcons, countdown, stats, table, buttonLink |
| media (4) | image, gallery, video, map |
| gereja (12) | logo, sermons, stream, donation, donateLink, form, calendar, groupList, groups, campaignProgress, staffGrid, serviceTimes |
| lanjutan (2) | rawHTML, iframe |

Elemen `sermons` adalah tipe gereja yang paling dapat dikonfigurasi: jawaban `layout` memilih `browse` (penelusuran penuh versi lama), `grid`, `list`, atau `featuredLatest`, dengan `playlistId`, `itemCount`, `showTitles`, dan `showDates` yang menyempurnakan tata letak selain browse.

Elemen `rawHTML` memiliki dua jawaban: `rawHTML` (markup) dan `javascript`. Skrip yang disisipkan melalui `innerHTML` tidak pernah dijalankan, sehingga `RawHTMLElement` membuat ulang setiap node `<script>` dalam markup sebagai elemen baru. Node yang tidak disisipkan oleh parser ini dipercaya di bawah `strict-dynamic` CSP. Jawaban `javascript` yang diawali `<` (cuplikan vendor yang ditempel beserta tag `<script>`-nya) diurai sebagai markup dan mendapat perlakuan yang sama. Jika tidak, ia dijalankan sebagai skrip inline biasa. B1Admin menandai URL polos di kotak JavaScript, karena URL tunggal dijalankan sebagai skrip kosong. Elemen `map` tidak merender apa pun, dan tidak memuat skrip Google Maps, ketika tidak ada kunci API Maps yang dikonfigurasi.

### Renderer (`@churchapps/apphelper`)

Renderer berada di `Packages/apphelper/src/website/components/elementTypes/`, satu komponen per tipe, yang diselesaikan melalui `ElementRegistry.ts`. Ini adalah peta dua lapis: `Element.tsx` mendaftarkan renderer default untuk semua 35 tipe (`registerDefaultElementRenderer`), dan aplikasi host dapat menimpa salah satunya saat runtime (`registerElementRenderer`) tanpa membuat fork paket.

### Formulir editor (B1Admin)

Formulir pengaturan per tipe di editor berada di `B1Admin/src/site/admin/elements/`. `ElementEdit.tsx` meneruskan ke komponen khusus (`GalleryEdit`, `TestimonialEdit`, `StatsEdit`, …) atau ke pembangun field inline per tipe. Cermin katalog ini untuk AI adalah alat MCP `describe_page_builder` di API (lihat [Server MCP](../api/mcp.md)).

Pratinjau editor memasang `Theme` yang sama dengan situs langsung, yang mengatur variabel CSS `--headingFont` / `--bodyFont` dari gaya global gereja. B1App menerapkan variabel tersebut melalui `pages.css`, yang tidak dapat di-import oleh B1Admin, sehingga `ContentEditor.tsx` menyisipkan `EDITOR_PAGE_FONT_CSS` (`src/site/admin/editorCss.ts`) untuk menerapkannya pada teks body `.page` dan `h1`–`h6`. Tanpa itu, pratinjau menampilkan heading dengan font admin.

### Pembatas bentuk section

Section dapat membawa pembatas bentuk dekoratif di salah satu tepinya. Konfigurasinya berada di `answersJSON` section sebagai objek `dividerTop` / `dividerBottom`, yaitu `{ shape, color, height, flip }` dengan `shape` salah satu dari `wave, waves, slant, curve, triangle, peaks`. Apphelper menyediakan komponen `SectionDivider` dan helper `parseDividerConfig()`. Renderer Section di kedua aplikasi (`B1App/src/components/Section.tsx`, `B1Admin/src/site/admin/Section.tsx`) mengurai jawaban dan memasang divider, sedangkan `SectionEdit.tsx` di B1Admin menyediakan UI pemilih. Paket hanya menyediakan blok bangunannya. Penyambungan di level section adalah tugas aplikasi yang menggunakannya.

## Elemen data gereja

Tiga tipe elemen merender data gereja yang aktif, bukan konten yang ditulis. Isolasi modul tetap berlaku. Masing-masing memanggil endpoint publik milik modul pemiliknya langsung dari browser:

| Elemen | Endpoint | Catatan |
|---------|----------|-------|
| `campaignProgress` | `GET /giving/funds/public/:churchId/:fundId/total` | Mengembalikan `{ fundId, totalAmount, donationCount }`, dengan jendela opsional `?startDate=&endDate=`. Elemen membandingkannya dengan jawaban `goalAmount` |
| `staffGrid` | `GET /membership/groupmembers/public/:churchId/:groupId` | **Hanya opt-in**: grup harus memiliki `publicRoster` yang diatur (default nonaktif). Proyeksinya sengaja minimal (`personId`, `displayName`, `leader`, foto) tanpa kolom kontak atau demografi |
| `serviceTimes` | `GET /attendance/servicetimes/public/:churchId` | Mengembalikan pohon kampus → layanan → waktu. Renderer apphelper menghasilkan JSON-LD `Event` schema.org secara best-effort darinya (API hanya mengembalikan data mentah) |

:::warning
`publicRoster` adalah gerbang privasi untuk `staffGrid`. Jangan pernah memperluas proyeksi anggota grup publik atau melewati flag ini. Endpoint roster bersifat anonim menurut desain, dan daftar field yang minimal adalah properti keamanannya.
:::

### Elemen kalender dan halaman acara

Jawaban elemen `calendar` adalah `calendarType` (`group` | `curated`), `calendarId`, `display` (`month`, default, atau `upcoming`), dan `tag`. B1App menimpa renderer apphelper di `src/components/Element.tsx` dengan `registerElementRenderer("calendar", …)`:

- **`display: "upcoming"`** merender `UpcomingEventsElement` milik B1App. Komponen ini memuat `GET /content/events/public/group/:churchId/:groupId` atau `GET /content/curatedEvents/public/calendar/:churchId/:curatedCalendarId`, memperluas perulangan dengan `buildOccurrences()` (`src/helpers/EventOccurrences.ts`, satu kemunculan per acara dalam setahun), dan menampilkan 12 pertama sebagai ubin foto (`events.photoUrl`, dengan judul pada warna gelap tema sebagai cadangan) yang tertaut ke `/events/{id}`, dengan menu Subscribe untuk feed ICS kalender.
- **`display: "month"`** merender `CalendarElement` dari apphelper dengan callback `eventUrl`. `GroupCalendar` / `CuratedCalendar` → `EventCalendar` / `CuratedEventCalendar` kemudian berpindah ke URL tersebut saat diklik, alih-alih membuka dialog detail. B1Admin tidak meneruskan `eventUrl`, sehingga kalender admin tetap memakai dialog.
- **`tag`** menyaring kedua tampilan dengan `EventHelper.hasTag()` (`@churchapps/helpers`): pencocokan tidak peka huruf besar-kecil terhadap `events.tags` yang dipisahkan koma. Jika kosong, semua acara ditampilkan. Join kalender curated memilih `e.tags` sehingga acara curated membawanya.

Acara curated ditautkan melalui `realEventId` (`eventPageId()`), sehingga URL selalu menyebut acara yang mendasarinya. `/{sdSlug}/events/[eventId]` adalah rute khusus (bukan pipeline builder). Rute ini memuat `GET /content/events/public/:churchId/:id`, yang mengembalikan `null` untuk acara pending/rejected dan untuk acara privat tanpa registrasi, serta menambahkan `roomNames` dari pemesanan ruangan yang tidak ditolak. Rute ini merender `EventPageContent` (hero foto, deskripsi markdown, aside When/Where, **Register for this Event** saat `registrationEnabled`, dan tautan **Add to my calendar** ke `GET /content/events/public/:churchId/:id/ical`). Foto digunakan sebagai gambar Open Graph, dan JSON-LD `Event` untuk kemunculan berikutnya dipancarkan melalui `EventPageJsonLd`. Acara yang tidak dikenal atau tersembunyi mengembalikan 404 sungguhan.

## Widget seluruh situs

Dua widget dirender di setiap halaman publik, bukan di dalam pohon: **AnnouncementBanner** (bilah atas halaman yang dapat ditutup) dan **Launcher** (hub aksi mengambang untuk tautan bergaya give/visit/watch). Kedua komponen dan helper `parse*Config()`-nya disediakan di apphelper. Konfigurasinya berupa dua baris pengaturan publik dengan kunci `announcementBanner` dan `launcher`. Baris ini ditulis oleh `SiteWidgetsEdit` di B1Admin (pada halaman Appearance) dan dibaca oleh layout publik B1App melalui `GET /content/settings/public/:churchId`. API memperlakukannya sebagai pasangan key-value buram. Nama kunci adalah konvensi antara kedua aplikasi.

## Blog

Blog adalah tipe konten mandiri, bukan lapisan di atas halaman builder. Satu baris `posts` menyimpan seluruh postingan: `title`, `slug`, `excerpt`, `content` (badan markdown), `authorId`, `photoUrl`, `publishDate`, `category`, `tags`. Permukaan publiknya (semuanya anonim, `PostController`):

| Rute | Tujuan |
|-------|---------|
| `GET /content/posts/public/:churchId` | Postingan terbit, dapat difilter dengan `?category=&tag=`, dipaginasi |
| `GET /content/posts/public/:churchId/categories` | Kategori unik dari postingan terbit |
| `GET /content/posts/public/:churchId/slug/:slug` | Satu postingan terbit |
| `GET /content/posts/rss/:churchId?siteUrl=` | Feed RSS 2.0, berjudul nama gereja, dengan kategori per item dan deskripsi berupa excerpt atau konten |

Postingan dianggap "terbit" setelah `publishDate` diatur dan sudah lewat. `publishDate` di masa depan menandakan postingan terjadwal, yang disembunyikan dari publik dan ditampilkan dengan chip Scheduled di admin. Endpoint baca memperkaya setiap postingan dengan `authorName`, yang diselesaikan dari `authorId` melalui gateway modul membership. Excerpt yang kosong akan kembali ke konten markdown yang sudah dibersihkan (~160 karakter) di kartu daftar, meta description, dan RSS.

B1App menyajikan dua halaman. Pertama, `/{sdSlug}/blog`, yaitu daftar editorial: header terpusat yang menjadi nama kategori/tag aktif saat difilter, baris chip filter kategori, dan baris postingan dengan thumbnail di kiri disertai byline dan excerpt. Feed RSS diiklankan sebagai tautan alternatif. Kedua, `/{sdSlug}/blog/[postSlug]`, rute khusus (bukan pipeline Zone/Section) dengan header terpusat (kicker kategori, judul, byline, dan garis aksen warna primer), hero 16:9 selebar container, badan markdown dalam kolom baca ~720px, chip tag di footer artikel, strip postingan terkait `"Lainnya di {category}"`, dan JSON-LD `BlogPosting` yang mencakup penulisnya. Kedua halaman sepenuhnya memakai token tema, sehingga mewarisi palet setiap gereja. URL blog disertakan dalam sitemap per gereja.

UI penulisan B1Admin (**Site → Blog**) mengedit postingan dalam dialog: editor markdown dengan toggle pratinjau, pemilih gambar galeri dengan crop 16:9, pemilih orang untuk penulis (default ke pengguna yang sedang mengedit), autocomplete kategori yang diisi dari kategori yang sudah ada, validasi slug duplikat, dan toggle terbit. Baris yang sudah terbit menautkan ke postingan live, dan halaman mengingatkan admin untuk menambahkan tautan navigasi `/blog`.

Komentar diserahkan kepada layanan pihak ketiga. Pengaturan konten publik untuk seluruh gereja, `blogFooterHtml` (diedit di **Below Every Post** pada halaman Blog, hanya tampil dengan Settings→Edit), dirender di bawah setiap postingan oleh `BlogFooterEmbed` milik B1App. Komponen ini membuat ulang tag `<script>` agar dapat dieksekusi di bawah `'strict-dynamic'` dan menjalankannya secara berurutan: `src` eksternal selesai dimuat sebelum skrip inline berikutnya berjalan, karena cuplikan vendor biasanya memuat sebuah pustaka lalu memanggilnya.

## Halaman khusus anggota

`pages.visibility` menggunakan ulang enum tautan navigasi: `everyone` (default), `visitors`, `members`, `staff`, `team`, `groups` (dengan `groupIds`). Namun, enum ini berfungsi sebagai **gerbang akses keras**, bukan filter navigasi (`PageVisibilityHelper.canViewPage`). Alurnya sebagai berikut:

1. Endpoint pohon anonim memeriksa visibilitas pada pengambilan berbasis URL. Pemanggil anonim dari halaman yang dibatasi menerima `{ restricted: true, visibility }` alih-alih konten, sehingga pohon tidak pernah membocorkan isinya.
2. Endpoint tetap menghormati JWT. `CustomAuthProvider` memverifikasi header `Authorization` pada *setiap* permintaan, termasuk rute anonim, sehingga pengambilan URL yang sama oleh anggota yang terautentikasi berhasil secara normal.
3. B1App merender `RestrictedPage` pada respons `restricted`. Komponen ini memulihkan sesi dari kredensial yang tersimpan, mengambil ulang pohon dengan JWT, lalu merendernya. Jika tidak ada sesi, komponen menampilkan gerbang login dengan `returnUrl`.

:::info
Granularitas gerbang berbeda-beda per level. `groups` memeriksa `groupIds` pada token terhadap daftar halaman dan `staff` memeriksa `membershipStatus`, tetapi `members` dan `team` saat ini meloloskan pengguna terautentikasi mana pun dari gereja tersebut. Perlakukan `groups` sebagai opsi yang paling ketat.
:::

## SEO dan kemudahan ditemukan

Semua ini adalah rendering di sisi B1App di atas data ContentApi. API menyimpan, aplikasi yang memancarkan:

| Aspek | Cara kerjanya |
|---------|--------------|
| Meta descriptions | `pages.metaDescription` (≤300 karakter) mengalir melalui `MetaHelper.getMetaData()` ke `Metadata` Next.js (description + Open Graph) pada setiap rute yang dirender builder. Pengaturan halaman di B1Admin menyertakan tombol AI "Generate" (lihat di bawah) |
| Redirects | Baris `redirects` per gereja dikelola di `/content/redirects` (`content.edit`, batas 200 baris, path yang dinormalisasi). Saat akan terjadi 404, rute halaman B1App menyelesaikan path terhadap `GET /content/redirects/public/:churchId` dan mengeluarkan HTTP 308 melalui `permanentRedirect` Next. Path yang tidak cocok diteruskan ke `notFound()` |
| Branded 404 | `not-found.tsx` merender `BrandedNotFound` dengan logo, nama, dan tema gereja, alih-alih error generik. Path `/register/[eventId]`, `/events/[eventId]`, `/stream/[pageSlug]`, dan `/volunteer/[planId]` yang tidak dikenal mengembalikan 404 sungguhan, begitu pula subdomain yang tidak dikenal dan slug halaman yang salah bentuk (lihat [Routing Website & Multi-Site](./websites.md)) |
| Structured data | `BlogPosting` JSON-LD pada postingan blog. `VideoObject` pada halaman khotbah per sermon (`/{sdSlug}/sermons/[sermonId]`) dan pada halaman yang berisi elemen `sermons`. `Event` dari elemen kalender/acara pada halaman builder dan pada setiap halaman `/{sdSlug}/events/[eventId]` (kemunculan berikutnya, dengan foto acara sebagai `image`). `Event` schema.org dari elemen `serviceTimes` |
| Sermon pages | Setiap khotbah publik mendapat halaman yang dapat di-crawl di `/sermons/[sermonId]` dengan metadata lengkap. Khotbah tidak lagi terkunci di dalam elemen penjelajah sisi klien |
| Analytics | Kunci pengaturan publik `ga4MeasurementId` (dikelola di samping redirects di B1Admin) menyuntikkan gtag GA4 per gereja melalui `next/script`. Aplikasi B1 (`/{sdSlug}/mobile`) juga mengirim tampilan halamannya ke ID tersebut, di samping tag milik ChurchApps, jika ID-nya adalah `G-` yang valid. ID kontainer GTM tetap hanya untuk website. Setiap `gtag('config')` membawa `display_mode` bernilai `installed` atau `browser`, berdasarkan `navigator.standalone` atau media query `(display-mode: standalone)` (`B1App/src/helpers/mobileAnalytics.ts`) |
| Sitemap & feeds | Rute `sitemap.xml` per gereja menyertakan halaman builder, URL blog, dan 50 halaman khotbah terbaru (dengan `<lastmod>` dari tanggal terbit masing-masing khotbah). Sitemap juga mencantumkan halaman bawaan `/sermons`, `/groups`, dan `/volunteer` saat ada kontennya (grup publik, rencana pendaftaran), kecuali jika redirect tersimpan menggantikan path tersebut. `/` dikecualikan saat gereja tidak memiliki halaman utama, karena `/` kemudian dialihkan ke `/mobile` yang tidak diizinkan. Daftar blog mengiklankan feed RSS |
| Accessibility | Chrome publik merender skip link yang menuju landmark `<main id="main-content">` di setiap wrapper layout |

## Pembuatan AI (AskApi)

Pembuatan halaman dan situs berjalan di **AskApi**, layanan terpisah, di bawah controller `/website`. Layanan ini mengautentikasi dengan `CustomAuthProvider` JWT yang sama seperti semua yang lain, dan **tanpa status terhadap konten**. Setiap endpoint mengembalikan JSON, dan pemanggil (B1Admin) menyimpan hasilnya melalui ContentApi. `POST /content/pages/importTree` membuat halaman dengan seluruh pohon section/elemen bersarangnya dalam satu panggilan. Endpoint ini selalu menyisipkan di bawah gereja pemanggil dan mengabaikan id di body.

### Pembuatan halaman (`planPage` → `writePage`)

Templat "AI" di `AddPageModal` B1Admin menggunakan pipeline berbiaya rendah (`AskApi/src/helpers/SiteGenHelper.ts`) yang dibangun di atas satu aturan: **tidak ada model yang mengeluarkan JSON builder**. Dua model membagi pekerjaan melalui Vercel AI Gateway (HTTP biasa, kunci SSM `/{env}/aiGatewayApiKey` atau `AI_GATEWAY_API_KEY`):

- **JEV** (`typesafe-ai/jev`) adalah model keputusan bertipe yang mengembalikan pilihan, skor, dan boolean beserta probabilitasnya, tetapi tidak dapat menulis teks. Ia memilih setiap section secara berurutan dari pustaka templat tetap, memberi skor pada tata letak, memverifikasi fakta salinan, dan memilih foto stok serta ikon. Input berbiaya sekitar $0,04 per juta token dan output gratis, sehingga ~90 panggilan per halaman hanya memakan sebagian kecil sen.
- **Model chat kecil** (GPT-4.1 mini secara default) mengisi slot teks bernama dan berbatas panjang dari templat yang dipilih. Penulis adalah satu konstanta yang dapat ditimpa dengan variabel lingkungan `SITEGEN_COPY_MODEL` (id model chat apa pun di gateway, misalnya `anthropic/claude-haiku-4.5`). Dalam perbandingan berdampingan buta pada tiga gereja, Claude Haiku 4.5 terdengar sedikit lebih hangat, tetapi GPT-4.1 mini hampir setara, sekitar 4x lebih murah dan lebih cepat, sehingga ia menjadi default. Satu halaman lengkap dengan ketiga tata letak berbiaya sekitar 1,3 sen, dan sekitar 80% di antaranya adalah biaya penulisnya.

| Fase | Endpoint | Yang terjadi |
|-------|----------|--------------|
| 1 | `POST /website/planPage` | Mengklasifikasi jenis halaman (home, visit, about…), lalu mengambil sampel 10 tata letak kandidat dari probabilitas per-putaran JEV (hero + jumlah section → setiap section → penutup), menghapus duplikat, meminta JEV memberi skor setiap kandidat untuk kesesuaian, alur, dan kekurangan, lalu mengembalikan 3 teratas beserta suara penulisan dan `suggestedStyle` (palet + font). Kandidat yang berbagi section yang sama sejauh ini mengajukan pertanyaan identik ke JEV, sehingga putaran di-memoize berdasarkan prefiks. Skor terbaik di bawah 6 dicatat sebagai `lowLayoutScore`, dan log itu adalah daftar templat yang layak ditambahkan. ~2 detik |
| 2 | `POST /website/writePage` (satu panggilan per kandidat) | Penulis mengisi salinan slot dua section per panggilan, secara paralel, dan mengembalikan lima judul hero yang dipilih JEV. JEV memverifikasi fakta setiap section. Section yang gagal, memakai frasa klise, atau mengulang section sebelumnya (rangkaian 4 kata bersama, diperiksa di kode) ditulis ulang secara paralel dengan alasan spesifik. Pembersih kode membuang kalimat dengan frasa klise situs gereja, kecuali deskripsi gereja itu sendiri memakainya. JEV memilih subjek foto, ikon, dan pembatas bentuk hero, lalu memberi skor hasilnya. Mengembalikan pohon section yang siap disimpan dan skor. ~6–9 detik |
| 3 | `POST /content/pages/importTree` | B1Admin hanya menulis tata letak peringkat terbaik (yang kedua sebagai cadangan jika penulisan itu gagal), menyimpannya, dan membuka pratinjau (~10 detik setelah Save) |

Setiap fase adalah permintaan sendiri agar setiap panggilan tetap dalam batas 29 detik API Gateway. Templat di `SiteGenHelper.buildTree` adalah pohon section + elemen tetap dari katalog (`text`, `row`/`column`, `card`, `iconFeature`, `faq`, `table`, `testimonial`, `textWithPhoto`, `box`, `map`, `sermons`) dan merujuk token tema (`var(--accent)`, `var(--lightAccent)`…), sehingga halaman yang dihasilkan mewarisi pengaturan tampilan gereja yang sudah ada. Menambah templat section berarti menambahkan daftar slotnya ke `SECTIONS` dan pohonnya ke `buildTree`. Unit test menelusuri setiap templat dan memvalidasi pohonnya.

**Input.** Salinan hanya boleh menyatakan fakta dari dua sumber: apa yang diketik pengguna, dan `churchContext.facts`. Yang terakhir adalah catatan yang dikumpulkan B1Admin sebelum perencanaan, yaitu jadwal layanan publik dan nama grup publik, serta nama dan alamat gereja. Flag yang sama mengatur templat berbasis data. `times` merender elemen `serviceTimes` yang aktif ketika gereja menyimpan jadwal layanannya di B1 (jika tidak, tabel tetap yang digunakan). `groups` dan `countdown` hanya ditawarkan saat ada data di baliknya. Panggilan JEV bersifat hedged: duplikat dipicu setelah 1,5 detik dan jawaban pertama yang menang, karena gateway kadang tersendat dan panggilannya nyaris gratis.

**Tetap pada topik.** Prompt pengguna adalah *subjek halaman*, bukan latar belakang tentang gereja. `planPage` mengklasifikasikan permintaan (`home`, `visit`, `about`, `ministries`, `give`, `contact`, `event`, `topic`). Untuk halaman `event` dan `topic`, templat gereja umum (catatan pendeta, khotbah, pelayanan, grup, dampak komunitas, waktu mingguan dan countdown, hero video) bahkan tidak ditawarkan. Sebagai gantinya, `details` (kapan / di mana / apa yang dibawa) dan `eventCountdown` bertanggal ditawarkan. Kedua juri memberi skor pada kesesuaian topik. B1Admin meneruskan `pageType` dari rencana ke setiap panggilan `writePage`.

**Halaman lengkap dari permintaan singkat.** Halaman memiliki tiga sampai enam section tengah, panjang slot yang longgar, baris pengantar pada section kartu, dan FAQ lima pertanyaan. Pass perbaikan memperluas section mana pun yang kembali terlalu tipis. Pembuatan cukup satu klik, tanpa pertanyaan lanjutan. Jika permintaan tidak menyertakan detail biasa yang dibutuhkan halaman lengkap (jam mulai, ruangan, apa yang dibawa, cara mendaftar), penulis mengisinya dengan pilihan yang masuk akal dan sederhana untuk diedit gereja. Karena section ditulis secara paralel, celah-celah itu diputuskan **sekali**, di `planPage` (`assumedDetails`, satu panggilan penulis kecil yang berjalan bersamaan dengan pengambilan sampel tata letak). Keputusan itu diteruskan kembali ke setiap panggilan `writePage` melalui `churchContext.assumedDetails`, sehingga satu section tidak bisa menulis 5:00 sementara yang lain menulis 5:30. JEV memperbaiki section mana pun yang bertentangan dengan permintaan, catatan gereja, atau detail yang sudah diputuskan itu. Detail yang diputuskan tidak ditampilkan di UI. Gereja meninjau dan mengedit halaman seperti biasa. Beberapa hal tidak pernah dikarang: nama orang, nomor telepon, alamat email dan web, harga, statistik, sejarah gereja, kutipan yang dikaitkan dengan orang, dan hari dalam seminggu untuk tanggal yang tidak diberikan permintaan.

**Visual.** Templat tidak pernah menamai foto atau ikonnya. Mereka membiarkan slot terbuka, dan satu pass generik (`visualSlots` → `pickVisuals` → `applyVisuals` di `SiteGenHelper`) menelusuri pohon yang sudah selesai dan mengisi setiap slot. Slot tersebut mencakup latar section atau entri galeri yang ditandai `auto:photo`, sebuah `auto:icon`, `auto:divider` pada hero, dan, tanpa penanda sama sekali, setiap elemen `textWithPhoto`, `card` atau `image` yang `photo`-nya kosong. JEV memilih masing-masing dari teks di sebelahnya: foto kartu dari judul dan teks kartu itu, latar dari salinan section. Tidak ada subjek yang diulang dalam satu halaman. Templat baru karena itu mendapatkan foto secara gratis. Foto adalah subjek pencarian Pexels yang dikeluarkan sebagai placeholder `pexels:<term>`, yang diselesaikan B1Admin melalui `POST /content/stock/search`. Klien yang tidak mengirim `resolvesPhotos` mendapatkan gambar hero bawaan, pita warna datar, dan kartu tanpa foto sebagai gantinya. Sengaja tidak ada subjek potret, dan templat pendeta tidak memuat foto: orang asing dari stok tidak boleh menggantikan orang sungguhan. Untuk gereja tanpa halaman sama sekali, B1Admin menerapkan `suggestedStyle` ke gaya global. Situs yang sudah ada mempertahankan tampilannya.

### Endpoint lainnya

:::info
Tombol rewrite `SectionToolbar` dan tombol "Generate Site" pada daftar halaman di B1Admin tetap di-comment di sisi klien. Endpoint AskApi di bawah tetap merespons. Hanya UI-nya yang disembunyikan.
:::

| Endpoint | Tujuan |
|----------|---------|
| `POST /website/generatePageOutline` → `generateSection` | Alur halaman dua langkah yang asli (kerangka, lalu satu panggilan LLM per section yang mengeluarkan JSON elemen). Digantikan di B1Admin oleh `planPage`/`writePage` karena biaya. Dipertahankan untuk konsumen API |
| `POST /website/generateSite` | Pembuatan seluruh situs. **Dua fase menurut desain**: panggilan `planOnly: true` hanya mengembalikan rencana multi-halaman (satu panggilan model cepat), lalu klien meminta konten lengkap. Ini menjaga setiap permintaan tetap dalam batas waktu Lambda/API-Gateway |
| `POST /website/rewriteSection` | Penulisan ulang yang mempertahankan struktur: model hanya boleh mengubah jawaban yang berisi teks. Signature struktur rekursif (id + tipe + urutan) dibandingkan sebelum dan sesudah. Ketidakcocokan apa pun mengembalikan section asli dengan `fallback: true`, alih-alih struktur yang rusak |
| `POST /website/generateAltText` | Panggilan vision atas hingga 20 URL gambar. Mengembalikan alt text ringkas (≤125 karakter, awalan "photo of" dihapus) |
| `POST /website/generateMetaDescription` | Satu meta description SEO (≤155 karakter) dari konten teks halaman. Terhubung ke tombol Generate di pengaturan halaman B1Admin |

Prompt untuk endpoint ini adalah file markdown di bawah `AskApi/config/instructions/`, termasuk katalog elemen yang digunakan model untuk menghasilkan konten. Dua poin desain menjaga katalog tetap akurat. Pertama, klien mengirim `availableElementTypes` pada setiap permintaan, sehingga prompt hanya boleh memakai tipe dari daftar itu; server tidak pernah menuliskan set lengkapnya secara hardcode. Kedua, alat MCP `describe_page_builder` di API membawa panduan yang sama untuk agen AI yang bekerja melalui [MCP](../api/mcp.md). Model adalah Anthropic Claude melalui OpenRouter: 3.5 Haiku untuk konten section (demi latensi), dan 3.5 Sonnet untuk kerangka, rencana situs, serta vision. Fallback ke OpenAI digunakan saat tidak ada kunci OpenRouter yang dikonfigurasi.

## Formulir percakapan

Formulir (modul membership) memiliki mode percakapan yang ditujukan untuk halaman bergaya connect-card. Empat kolom pada `forms` mengatur mode ini: `displayMode` (`standard` | `conversational`), `autoCreatePerson`, `followUpSubject`, dan `followUpBody`.

- **Rendering.** `FormSubmissionEdit` dari apphelper beralih ke komponen `ConversationalForm` (satu pertanyaan per waktu) saat `displayMode` bernilai `conversational`. Halaman formulir B1App meneruskan mode tersebut. Payload pengiriman tetap sama di kedua mode.
- **Auto-create person.** Saat pengiriman dengan `autoCreatePerson` diatur, `ConversationalFormHelper.findOrCreatePerson` menghapus duplikat berdasarkan email (tidak peka huruf besar-kecil). Jika tidak ada yang cocok, ia membuat household dan person dengan `membershipStatus: "Guest"`, lalu menautkan pengiriman ke person tersebut.
- **Email tindak lanjut.** Saat subject dan body diatur, pengirim mendapat email berbasis templat (dengan token `{firstName}` / `{churchName}`) melalui jalur transaksional yang ada (`TransactionalEmailHelper`), tidak pernah melalui pintu digest notifikasi. Kedua efek samping ini tidak fatal: kegagalan tidak pernah menghilangkan pengiriman.

Keempat field ini saat ini diatur melalui API. Editor formulir B1Admin belum menampilkannya.

## Cache situs publik

Jalur render publik B1App men-cache pengambilan yang ditandai gereja (`next: { revalidate: 300, tags: [sdSlug] }` di produksi, `0` di dev), sehingga halaman live dapat tetap usang hingga lima menit setelah penulisan ContentApi. `POST /api/revalidate/{sdSlug}` di B1App memanggil `revalidateTag(sdSlug)` dan merupakan satu-satunya cara untuk membuang cache lebih awal.

Dua penulis yang mengakses cache ini:

1. **B1Admin.** `clearSiteCache()` di `B1Admin/src/site/siteCache.ts` melakukan POST setelah simpanan editor. Fungsi ini mengutamakan subdomain situs aktif, karena situs sekunder harus membatalkan *tag itu*, bukan tag default gereja.
2. **Api.** Mutasi konten yang tidak pernah melalui B1Admin (kunci API, MCP, AI) memicu `SiteCacheHelper.bump(churchId)` dari controller konten. Helper ini menyelesaikan subdomain gereja melalui `SubDomainHelper` dan melakukan POST ke `{b1AppRoot}/api/revalidate/{sd}`. Kegagalan ditelan diam-diam, sehingga B1App yang tidak dapat dijangkau tidak dapat menggagalkan penyimpanan.

Controller yang melakukan bump: pages (save, delete, duplicate, publish, discard, unpublish, AI temp), sections, elements, blocks, links, global styles, posts, dan redirects. `b1AppRoot` dev adalah `http://{subdomain}.localtest.me:3301`. Demo dan produksi menggunakan `https://{subdomain}.b1.church`.

## Halaman terkait

- [Routing Website & Multi-Site](./websites.md): bagaimana permintaan diselesaikan ke gereja/situs dan bagaimana domain kustom diarahkan
- [Endpoint Konten](../api/endpoints/content.md): seluruh REST surface untuk halaman, section, elemen, blok, postingan, redirect, dan pengaturan
- [AppHelper](../shared-libraries/app-helper.md): paket npm yang berisi renderer, registri, divider, dan widget
- [Server MCP](../api/mcp.md), termasuk alat panduan `describe_page_builder`
- [Page Editor (pengguna akhir)](/docs/b1-admin/website/page-editor): dokumentasi editor untuk staf
