---
title: "Endpoint Konten"
description: "Referensi endpoint Content API ChurchApps: halaman situs web, postingan blog, pengalihan, khotbah, acara, berkas, pencarian Alkitab, dan lagu di B1 Admin."
---

# Endpoint Konten

<div class="article-intro">

Modul Konten mengelola halaman situs web, bagian, elemen, blok, postingan blog, pengalihan, khotbah, daftar putar, layanan streaming, acara, kalender kurasi, berkas, galeri, terjemahan Alkitab dan pencarian ayat, lagu, aransemen, gaya global, foto stok, dan pengaturan. Ini adalah modul terbesar di API dan mendukung CMS, fitur media/streaming, perencanaan ibadah, dan fitur Alkitab di seluruh aplikasi ChurchApps.

</div>

**Path dasar:** `/content`

## Halaman

Path dasar: `/content/pages`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:churchId/tree?url=&id=` | Publik | — | Muat seluruh pohon halaman (bagian, elemen, blok) berdasarkan URL atau ID. Menghapus ID internal saat diambil melalui URL. Pengambilan berbasis URL menerapkan `pages.visibility` — halaman yang dibatasi mengembalikan `{ restricted: true, visibility }` kecuali JWT (opsional) memenuhi syarat pembatasan |
| GET | `/public/:churchId` | Publik | — | Daftar halaman publik (`url`, `title`, `metaDescription`); hanya `visibility = everyone` |
| GET | `/:id` | JWT | — | Ambil halaman berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua halaman untuk gereja |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikat halaman beserta semua bagian dan elemennya |
| POST | `/temp/ai` | JWT | Content.Edit | Simpan halaman yang dibuat AI (halaman, bagian, dan elemen dalam satu panggilan) |
| POST | `/importTree` | JWT | Content.Edit | Buat halaman dari pohon bertingkat (`title`, `url`, `sections[].elements[]…`). Selalu disisipkan di bawah gereja pemanggil; ID dalam body diabaikan. Baris harus menyertakan anak `column`-nya. Maksimum 30 bagian / 500 elemen |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui halaman (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Hapus halaman |

### Contoh: Muat Pohon Halaman

```
GET /content/pages/abc-church-id/tree?url=/about
```

```json
{
  "name": "About",
  "url": "/about",
  "sections": [
    {
      "background": "#FFFFFF",
      "textColor": "dark",
      "elements": [
        { "elementType": "textWithPhoto", "answers": { "text": "Welcome" } }
      ]
    }
  ]
}
```

## Bagian

Path dasar: `/content/sections`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil bagian berdasarkan ID |
| POST | `/duplicate/:id?convertToBlock=` | JWT | Content.Edit | Duplikat bagian atau ubah menjadi blok yang dapat digunakan ulang |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui bagian (batch). Urutan pengurutan diperbarui otomatis |
| DELETE | `/:id` | JWT | Content.Edit | Hapus bagian (urutan pengurutan diperbarui otomatis) |

## Elemen

Path dasar: `/content/elements`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil elemen berdasarkan ID |
| POST | `/duplicate/:id` | JWT | Content.Edit | Duplikat elemen beserta semua turunannya |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui elemen (batch). Kolom baris dan slide carousel dikelola otomatis |
| DELETE | `/:id` | JWT | Content.Edit | Hapus elemen |

## Blok

Path dasar: `/content/blocks`

Memperluas CRUD standar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dari kelas dasar dengan izin Content.Edit untuk operasi tulis).

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil blok berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua blok |
| GET | `/:churchId/tree/:id` | Publik | — | Muat pohon blok lengkap dengan bagian dan elemen |
| GET | `/blockType/:blockType` | JWT | — | Muat blok berdasarkan jenis (misalnya footerBlock, elementBlock) |
| GET | `/public/footer/:churchId` | Publik | — | Muat pohon blok footer untuk sebuah gereja |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui blok |
| DELETE | `/:id` | JWT | Content.Edit | Hapus blok |

## Tautan

Path dasar: `/content/links`

Memperluas CRUD standar (GET `/:id`, GET `/`, POST `/`, DELETE `/:id` dari kelas dasar dengan izin Content.Edit untuk operasi tulis).

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil tautan berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua tautan. Filter `?category=` bersifat opsional. Diurutkan otomatis setelah disimpan |
| GET | `/church/:churchId/filtered?category=` | JWT | — | Muat tautan yang difilter berdasarkan visibilitas (everyone, visitors, members, staff, groups) |
| GET | `/church/:churchId?category=` | Publik | — | Muat tautan untuk sebuah gereja berdasarkan kategori (publik) |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui tautan (batch). Diurutkan otomatis berdasarkan kategori |
| DELETE | `/:id` | JWT | Content.Edit | Hapus tautan |

## Gaya Global

Path dasar: `/content/globalStyles`

Memperluas CRUD standar (POST `/`, DELETE `/:id` dari kelas dasar dengan izin Content.Edit untuk operasi tulis).

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/church/:churchId` | Publik | — | Muat gaya global untuk sebuah gereja (mengembalikan nilai default jika belum diatur) |
| GET | `/` | JWT | — | Muat gaya global untuk gereja yang terautentikasi |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui gaya global |
| DELETE | `/:id` | JWT | Content.Edit | Hapus gaya global |

## Riwayat Halaman

Path dasar: `/content/pageHistory`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/page/:pageId` | JWT | Content.Edit | Daftar entri riwayat untuk sebuah halaman |
| GET | `/block/:blockId` | JWT | Content.Edit | Daftar entri riwayat untuk sebuah blok |
| GET | `/:id` | JWT | Content.Edit | Ambil entri riwayat berdasarkan ID |
| POST | `/` | JWT | Content.Edit | Simpan snapshot halaman/blok. Secara berkala membersihkan entri yang lebih dari 30 hari |
| POST | `/restore/:id` | JWT | Content.Edit | Pulihkan halaman/blok dari snapshot riwayat (menghapus konten saat ini dan membuatnya kembali dari snapshot) |
| POST | `/restoreSnapshot` | JWT | Content.Edit | Pulihkan dari objek snapshot sebaris. Body: `{ pageId, blockId, snapshot }` |

## Postingan (Blog)

Path dasar: `/content/posts`

Postingan blog adalah baris mandiri: `title`, `slug` (unik per gereja), `excerpt`, `content` (isi markdown), `authorId`, `photoUrl`, `publishDate`, `category`, dan `tags`. Postingan dianggap terbit setelah `publishDate` diatur dan sudah lewat. Endpoint baca memperkaya setiap postingan dengan `authorName` yang diambil dari `authorId`. Lihat [Arsitektur Website Builder](../../architecture/website-builder.md#blog).

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?category=&tag=&page=&pageSize=` | Publik | — | Daftar postingan terbit, dengan paginasi (maksimum 50 per halaman) |
| GET | `/public/:churchId/categories` | Publik | — | Kategori unik dari postingan terbit |
| GET | `/public/:churchId/slug/:slug` | Publik | — | Ambil postingan terbit berdasarkan slug |
| GET | `/rss/:churchId?siteUrl=` | Publik | — | Umpan RSS 2.0 dari postingan terbit (tautan dibuat sebagai `{siteUrl}/blog/{slug}`) |
| GET | `/:id` | JWT | — | Ambil postingan berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua postingan untuk gereja |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui postingan (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Hapus postingan |

## Pengalihan

Path dasar: `/content/redirects`

Pengalihan URL per gereja (`fromPath` → `toPath`), dibatasi 200 per gereja. Path dinormalisasi (huruf kecil, diawali garis miring, tanpa garis miring di akhir) dan `fromPath` bersifat unik per gereja. B1App menyelesaikan pengalihan ini saat terjadi kemungkinan 404 dan mengirimkan HTTP 308.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/public/:churchId?path=` | Publik | — | Selesaikan sebuah path (atau daftar semua pengalihan jika `path` dihilangkan) |
| GET | `/:id` | JWT | — | Ambil pengalihan berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua pengalihan untuk gereja |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui pengalihan. Menolak `fromPath = toPath` dan menerapkan batas 200 baris |
| DELETE | `/:id` | JWT | Content.Edit | Hapus pengalihan |

## Khotbah

Path dasar: `/content/sermons`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/public/freeshowSample` | JWT | — | Ambil contoh struktur daftar putar FreeShow |
| GET | `/public/tvWrapper/:churchId` | JWT | — | Ambil pembungkus aplikasi TV dengan sumber khotbah, pelajaran, dan FreeShow |
| GET | `/public/tvFeed/:churchId/:sermonId` | Publik | — | Ambil satu khotbah sebagai daftar putar umpan TV |
| GET | `/public/tvFeed/:churchId` | Publik | — | Ambil semua daftar putar/khotbah publik sebagai umpan TV |
| GET | `/public/:churchId` | Publik | — | Daftar semua khotbah publik untuk sebuah gereja |
| GET | `/timeline?sermonIds=` | JWT | — | Muat data linimasa untuk khotbah |
| GET | `/lookup?videoType=&videoData=` | Publik | — | Cari metadata khotbah dari YouTube atau Vimeo |
| GET | `/socialSuggestions?youtubeVideoId=` | JWT | — | Hasilkan saran postingan media sosial dengan AI dari subtitel khotbah |
| GET | `/outline?url=&title=&author=` | JWT | — | Hasilkan kerangka pelajaran dengan AI dari sebuah URL |
| GET | `/youtubeImport/:channelId` | JWT | — | Impor video dari kanal YouTube. Entitas HTML yang dipakai API pencarian YouTube dalam judul dan deskripsi (seperti `&amp;` dan `&#39;`) akan didekode |
| GET | `/vimeoImport/:channelId` | JWT | — | Impor video dari kanal Vimeo |
| GET | `/:id` | JWT | — | Ambil khotbah berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua khotbah |
| POST | `/` | JWT | StreamingServices.Edit | Buat atau perbarui khotbah. Menerima array atau satu objek khotbah (selalu mengembalikan array); body kosong mengembalikan 400. Mendukung unggahan thumbnail base64 |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Hapus khotbah |

### Contoh: Cari Khotbah YouTube

```
GET /content/sermons/lookup?videoType=youtube&videoData=dQw4w9WgXcQ
```

```json
{
  "title": "Sunday Service - Faith in Action",
  "description": "Pastor John speaks about faith...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg",
  "duration": 2400,
  "publishDate": "2025-01-15T10:00:00Z"
}
```

## Daftar Putar

Path dasar: `/content/playlists`

Memperluas CRUD standar (GET `/:id`, GET `/`, DELETE `/:id` dari kelas dasar dengan izin StreamingServices.Edit untuk operasi tulis).

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil daftar putar berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua daftar putar |
| GET | `/public/:churchId` | Publik | — | Daftar semua daftar putar publik untuk sebuah gereja |
| POST | `/` | JWT | StreamingServices.Edit | Buat atau perbarui daftar putar (batch, mendukung unggahan thumbnail base64) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Hapus daftar putar |

## Layanan Streaming

Path dasar: `/content/streamingServices`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id/hostChat` | JWT | Chat.Host | Ambil ID ruang obrolan host terenkripsi untuk sebuah layanan |
| GET | `/` | JWT | — | Daftar semua layanan streaming. Otomatis membersihkan layanan non-berulang yang sudah kedaluwarsa dan memajukan layanan berulang |
| POST | `/` | JWT | StreamingServices.Edit | Buat atau perbarui layanan streaming (batch) |
| DELETE | `/:id` | JWT | StreamingServices.Edit | Hapus layanan streaming (juga menghapus IP yang diblokir) |

## Acara

Path dasar: `/content/events`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/timeline/group/:groupId?eventIds=` | JWT | — | Muat acara linimasa untuk sebuah grup (termasuk tanggal pengecualian, sehingga kejadian yang dihapus dapat dilewati) |
| GET | `/timeline?eventIds=` | JWT | — | Muat acara linimasa untuk grup pengguna saat ini (termasuk tanggal pengecualian) |
| GET | `/subscribe?churchId=&groupId=&curatedCalendarId=` | Publik | — | Berlangganan acara sebagai umpan kalender ICS |
| GET | `/group/:groupId` | JWT | — | Ambil acara untuk sebuah grup (termasuk tanggal pengecualian) |
| GET | `/public/group/:churchId/:groupId` | Publik | — | Ambil acara publik untuk sebuah grup |
| GET | `/public/:churchId/:id` | Publik | — | Ambil satu acara untuk halaman publiknya, dengan `roomNames` (ruangan dari pemesanan yang tidak ditolak). Mengembalikan `null` untuk acara yang menunggu atau ditolak, dan untuk acara privat yang tidak menerima pendaftaran |
| GET | `/public/:churchId/:id/ical` | Publik | — | Unduh acara tunggal tersebut sebagai berkas `.ics` (`text/calendar`, tanggal pengecualian diterapkan). `404` jika acara disembunyikan oleh aturan yang sama |
| GET | `/:id` | JWT | — | Ambil acara berdasarkan ID |
| POST | `/` | JWT | — | Buat atau perbarui acara (batch) |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, atau pemimpin grup | Hapus acara beserta pemesanannya. Pemimpin grup acara dapat menghapusnya, dan pemohon dapat membatalkan permintaan tertunda miliknya sendiri |

Catatan acara mencakup `photoUrl` (foto acara 16:9 yang ditampilkan di halaman acara publik dan kartu acara mendatang), `tags` (dipisahkan koma, digunakan oleh filter tag elemen Kalender situs web), dan `notesViewRole` / `notesPostRole` (`staff` jika `null`, `leaders`, atau `members`), yang mengatur akses ke percakapan `eventNote` acara — lihat [Kontrol akses catatan grup dan acara](./messaging.md#group-and-event-notes-access-control). Respons acara kurasi publik juga menyertakan `photoUrl` dan `tags` setiap acara.

## Pengecualian Acara

Path dasar: `/content/eventExceptions`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil pengecualian acara berdasarkan ID |
| POST | `/` | JWT | Content.Edit, Calendars.Admin, atau pemimpin grup | Buat atau perbarui pengecualian acara (batch). Pemimpin hanya dapat menambahkan pengecualian untuk acara di grup yang mereka pimpin |
| DELETE | `/:id` | JWT | Content.Edit, Calendars.Admin, atau pemimpin grup | Hapus pengecualian acara |

## Kalender Kurasi

Path dasar: `/content/curatedCalendars`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil kalender kurasi berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua kalender kurasi |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui kalender kurasi (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Hapus kalender kurasi |

## Acara Kurasi

Path dasar: `/content/curatedEvents`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/calendar/:curatedCalendarId?withoutEvents` | JWT | — | Ambil acara kurasi untuk sebuah kalender (menyertakan detail acara dan tanggal pengecualian kecuali `?withoutEvents` diatur) |
| GET | `/public/calendar/:churchId/:curatedCalendarId` | Publik | — | Ambil acara kurasi publik untuk sebuah kalender |
| GET | `/:id` | JWT | — | Ambil acara kurasi berdasarkan ID |
| GET | `/` | JWT | — | Daftar semua acara kurasi |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui acara kurasi. Mendukung array `eventIds` untuk menambahkan acara grup tertentu |
| DELETE | `/:id` | JWT | Content.Edit | Hapus acara kurasi |
| DELETE | `/calendar/:curatedCalendarId/event/:eventId` | JWT | Content.Edit | Hapus acara tertentu dari kalender kurasi |
| DELETE | `/calendar/:curatedCalendarId/group/:groupId` | JWT | Content.Edit | Hapus semua acara untuk sebuah grup dari kalender kurasi |

## Berkas

Path dasar: `/content/files`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:contentType/:contentId` | JWT | — | Ambil berkas berdasarkan jenis konten dan ID konten |
| GET | `/` | JWT | — | Daftar semua berkas untuk situs web gereja |
| GET | `/:id` | JWT | — | Ambil berkas berdasarkan ID |
| POST | `/` | JWT | Content.Edit* | Unggah berkas (base64). *Juga diizinkan jika pengguna adalah anggota grup yang cocok dengan `contentId` |
| POST | `/postUrl` | JWT | Content.Edit* | Dapatkan URL unggah S3 yang telah ditandatangani sebelumnya. *Juga diizinkan untuk anggota grup. Maksimum 100MB per item konten |
| DELETE | `/:id` | JWT | Content.Edit* | Hapus berkas dan hapus dari penyimpanan. *Juga diizinkan untuk anggota grup |

## Galeri

Path dasar: `/content/gallery`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/stock/:folder` | Publik | — | Daftar foto stok dalam sebuah folder |
| GET | `/:folder` | JWT | Content.Edit | Daftar gambar galeri dalam sebuah folder |
| POST | `/requestUpload` | JWT | Content.Edit | Dapatkan URL unggah S3 yang telah ditandatangani sebelumnya untuk gambar galeri |
| DELETE | `/:folder/:image` | JWT | Content.Edit | Hapus gambar galeri |

## Alkitab

Path dasar: `/content/bibles`

Semua endpoint Alkitab bersifat publik (tidak memerlukan autentikasi). Data diambil dari sumber eksternal dan di-cache secara lokal. Permintaan ke api.bible kedaluwarsa setelah 15 detik; respons timeout mengembalikan **504**.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/` | Publik | — | Daftar semua terjemahan Alkitab (mengambil dari sumber jika cache kosong) |
| GET | `/stats?startDate=&endDate=` | Publik | — | Ambil statistik pencarian Alkitab untuk rentang tanggal |
| GET | `/availableTranslations/:source` | Publik | — | Daftar terjemahan yang tersedia dari sebuah sumber (misalnya api.bible) |
| GET | `/updateTranslations` | Publik | — | Sinkronkan semua terjemahan dari semua sumber |
| GET | `/updateTranslations/:source` | Publik | — | Sinkronkan terjemahan dari sumber tertentu |
| GET | `/updateCopyrights` | Publik | — | Perbarui informasi hak cipta untuk terjemahan yang belum memilikinya |
| GET | `/:translationKey/updateCopyright` | Publik | — | Perbarui hak cipta untuk terjemahan tertentu |
| GET | `/:translationKey/search?query=&limit=` | Publik | — | Cari ayat dalam sebuah terjemahan |
| GET | `/:translationKey/books` | Publik | — | Ambil daftar kitab untuk sebuah terjemahan (di-cache secara lokal) |
| GET | `/:translationKey/:bookKey/chapters` | Publik | — | Ambil daftar pasal untuk sebuah kitab (di-cache secara lokal) |
| GET | `/:translationKey/chapters/:chapterKey/verses` | Publik | — | Ambil daftar ayat untuk sebuah pasal (di-cache secara lokal) |
| GET | `/:translationKey/verses/:startVerseKey-:endVerseKey` | Publik | — | Ambil teks ayat untuk sebuah rentang. Mencatat pencarian. Beberapa terjemahan dilewati dari cache karena lisensi |

### Contoh: Ambil Teks Ayat

```
GET /content/bibles/de4e12af7f28f599-02/verses/GEN.1.1-GEN.1.3
```

```json
[
  { "verseKey": "GEN.1.1", "content": "In the beginning God created the heavens and the earth.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 1 },
  { "verseKey": "GEN.1.2", "content": "Now the earth was formless and empty...", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 2 },
  { "verseKey": "GEN.1.3", "content": "And God said, \"Let there be light,\" and there was light.", "bookKey": "GEN", "chapterNumber": 1, "verseNumber": 3 }
]
```

## Lagu

Path dasar: `/content/songs`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/search?q=` | JWT | — | Cari lagu berdasarkan kueri |
| GET | `/:id` | JWT | — | Ambil lagu berdasarkan ID |
| GET | `/` | JWT | Content.Edit | Daftar semua lagu |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui lagu (batch) |
| POST | `/import` | JWT | — | Impor lagu dari FreeShow (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Hapus lagu |

## Detail Lagu

Path dasar: `/content/songDetails`

Detail lagu bersifat global (tidak terikat pada gereja). Ini merepresentasikan metadata lagu baku yang dibagikan antar gereja.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil detail lagu berdasarkan ID (global) |
| GET | `/` | JWT | — | Daftar detail lagu untuk gereja |
| POST | `/create` | JWT | — | Buat detail lagu dari ID PraiseCharts (mengembalikan data yang sudah ada jika sudah dibuat). Otomatis mengambil metadata dari PraiseCharts dan MusicBrainz |
| POST | `/` | JWT | — | Buat atau perbarui detail lagu (batch) |

## Tautan Detail Lagu

Path dasar: `/content/songDetailLinks`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil tautan detail lagu berdasarkan ID |
| GET | `/songDetail/:songDetailId` | JWT | — | Ambil semua tautan untuk sebuah detail lagu |
| POST | `/` | JWT | — | Buat atau perbarui tautan detail lagu (batch). Otomatis mengambil data MusicBrainz jika ditautkan |
| DELETE | `/:id` | JWT | — | Hapus tautan detail lagu |

## Aransemen

Path dasar: `/content/arrangements`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/:id` | JWT | — | Ambil aransemen berdasarkan ID |
| GET | `/song/:songId` | JWT | Content.Edit | Ambil aransemen untuk sebuah lagu |
| GET | `/songDetail/:songDetailId` | JWT | Content.Edit | Ambil aransemen untuk sebuah detail lagu |
| GET | `/` | JWT | Content.Edit | Daftar semua aransemen |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui aransemen (batch) |
| POST | `/freeShow/missing` | JWT | — | Temukan ID FreeShow yang tidak ada di gereja. Body: `{ freeShowIds: string[] }` |
| DELETE | `/:id` | JWT | Content.Edit | Hapus aransemen (juga menghapus kunci; menghapus lagu jika tidak ada aransemen tersisa) |

## Kunci Aransemen

Path dasar: `/content/arrangementKeys`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/presenter/:churchId/:id` | Publik | — | Ambil kunci aransemen dengan data lagu lengkap untuk tampilan presenter |
| GET | `/:id` | JWT | — | Ambil kunci aransemen berdasarkan ID |
| GET | `/arrangement/:arrangementId` | JWT | Content.Edit | Ambil kunci untuk sebuah aransemen |
| GET | `/` | JWT | Content.Edit | Daftar semua kunci aransemen |
| POST | `/` | JWT | Content.Edit | Buat atau perbarui kunci aransemen (batch) |
| DELETE | `/:id` | JWT | Content.Edit | Hapus kunci aransemen |

## Pengaturan

Path dasar: `/content/settings`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/my` | JWT | — | Ambil pengaturan pengguna saat ini |
| GET | `/` | JWT | Settings.Edit | Ambil semua pengaturan untuk gereja |
| GET | `/public/:churchId` | Publik | — | Ambil pengaturan publik untuk sebuah gereja (dikembalikan sebagai pasangan kunci-nilai) |
| POST | `/my` | JWT | — | Simpan pengaturan tingkat pengguna (mendukung unggahan gambar base64) |
| POST | `/` | JWT | Settings.Edit | Simpan pengaturan tingkat gereja (mendukung unggahan gambar base64) |
| DELETE | `/my/:id` | JWT | — | Hapus pengaturan pengguna |

## Pratinjau

Path dasar: `/content/preview`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/data/:key` | Publik | — | Muat data pratinjau streaming untuk sebuah gereja berdasarkan kunci subdomain (tab, tautan, layanan, khotbah) |

## Galeri (Foto Stok)

Path dasar: `/content/stock`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| POST | `/search` | Publik | — | Cari foto stok Pexels. Body: `{ term: "church" }` |

## PraiseCharts

Path dasar: `/content/praiseCharts`

Integrasi dengan PraiseCharts untuk penemuan lagu ibadah dan unduhan partitur musik.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| GET | `/raw/:id` | JWT | — | Ambil data mentah PraiseCharts untuk sebuah lagu |
| GET | `/hasAccount` | JWT | — | Periksa apakah pengguna memiliki akun PraiseCharts yang tertaut |
| GET | `/search?q=` | JWT | — | Cari katalog PraiseCharts |
| GET | `/products/:id?keys=` | JWT | — | Ambil produk untuk sebuah lagu (dari pustaka jika terautentikasi, jika tidak dari katalog) |
| GET | `/arrangement/raw/:id?keys=` | JWT | — | Ambil data mentah aransemen dari pustaka |
| GET | `/download?skus=&keys=&file_name=` | JWT | — | Unduh berkas dari PraiseCharts (PDF atau ZIP). Mengembalikan `{ redirectUrl }` |
| GET | `/authUrl?returnUrl=` | Publik | — | Dapatkan URL otorisasi OAuth untuk PraiseCharts |
| GET | `/access?verifier=&token=&secret=` | JWT | — | Tukarkan verifier OAuth dengan token akses dan simpan ke pengaturan pengguna |
| GET | `/library` | JWT | — | Telusuri pustaka PraiseCharts pengguna |

## Dukungan

Path dasar: `/content/support`

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------|------|-------------|
| POST | `/createAudio` | Publik | — | Ubah SSML menjadi audio MP3 menggunakan AWS Polly. Body: `{ ssml: "<speak>...</speak>" }` |

## Halaman Terkait

- [Arsitektur Website Builder](../../architecture/website-builder.md) -- Bagaimana halaman, bagian, elemen, postingan, dan pengalihan saling terhubung di seluruh aplikasi
- [Endpoint Keanggotaan](./membership.md) -- Orang, gereja, grup, peran, izin
- [Endpoint Kehadiran](./attendance.md) -- Pelacakan layanan dan kunjungan
- [Autentikasi & Izin](./authentication.md) -- Alur login, JWT, model izin
- [Struktur Modul](../module-structure.md) -- Pola organisasi kode
