---
title: "Format Pelajaran Terbuka"
description: "Spesifikasi format untuk penyedia kurikulum pihak ketiga di Lessons.church: struktur penyedia, field JSON feed venue, aksi, dan file media."
---

# Format Pelajaran Terbuka

<div class="article-intro">

Format Pelajaran Terbuka adalah skema JSON standar yang memungkinkan penyedia konten pihak ketiga menerbitkan kurikulum untuk Lessons.church. Organisasi mana pun yang menyediakan feed dalam format ini dapat ditambahkan sebagai penyedia eksternal, sehingga kontennya dapat dijelajahi dan diputar bersama pustaka bawaan.

</div>

## Cara Kerjanya

Penyedia menyediakan dua jenis endpoint:

1. **Pohon Penyedia** -- Satu URL yang mengembalikan seluruh katalog program, studi, pelajaran, dan venue. Setiap venue menyertakan URL feed yang mengarah ke konten pelajaran yang terperinci.
2. **Feed Venue** -- Satu URL untuk setiap venue, yang mengembalikan seluruh konten pelajaran (bagian, aksi, dan file media).

Ketika sebuah gereja menambahkan URL penyedia Anda di Lessons.church, platform akan mengambil pohon Anda untuk menemukan konten yang tersedia, lalu mengambil feed setiap venue sesuai kebutuhan.

## Pohon Penyedia

URL penyedia Anda harus mengembalikan objek JSON dengan struktur berikut:

```json
{
  "programs": [
    {
      "id": "program-1",
      "name": "Gospel of Mark",
      "slug": "gospel-of-mark",
      "image": "https://example.com/images/mark.jpg",
      "about": "A 12-week study through the Gospel of Mark.",
      "studies": [
        {
          "id": "study-1",
          "name": "The Beginning",
          "slug": "the-beginning",
          "image": "https://example.com/images/study1.jpg",
          "lessons": [
            {
              "id": "lesson-1",
              "name": "The Baptism of Jesus",
              "slug": "baptism-of-jesus",
              "title": "The Baptism of Jesus",
              "image": "https://example.com/images/lesson1.jpg",
              "description": "An introduction to Jesus' ministry.",
              "bottomLine": "God keeps His promises.",
              "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
              "parentQuestion": "What is one promise God has kept in our family?",
              "parentNote": "Pray together thanking God for keeping His promises.",
              "venues": [
                {
                  "id": "venue-1",
                  "name": "Kids",
                  "apiUrl": "https://example.com/feed/venues/venue-1"
                },
                {
                  "id": "venue-2",
                  "name": "Adults",
                  "apiUrl": "https://example.com/feed/venues/venue-2"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Kolom Pohon

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `programs[].id` | string | Pengidentifikasi program yang unik |
| `programs[].name` | string | Nama tampilan |
| `programs[].slug` | string | Nama yang ramah URL |
| `programs[].image` | string | URL gambar program (opsional) |
| `programs[].about` | string | Deskripsi (opsional) |
| `studies[].id` | string | Pengidentifikasi studi yang unik |
| `studies[].name` | string | Nama tampilan |
| `studies[].slug` | string | Nama yang ramah URL |
| `studies[].image` | string | URL gambar studi (opsional) |
| `lessons[].id` | string | Pengidentifikasi pelajaran yang unik |
| `lessons[].name` | string | Nama tampilan |
| `lessons[].slug` | string | Nama yang ramah URL |
| `lessons[].title` | string | Judul lengkap |
| `lessons[].image` | string | URL gambar pelajaran (opsional) |
| `lessons[].description` | string | Ringkasan pelajaran (opsional). Teks katalog untuk guru yang menjelajahi pustaka, bukan rangkuman untuk orang tua. |
| `lessons[].bottomLine` | string | Intisari satu kalimat untuk dibawa pulang orang tua (opsional) |
| `lessons[].verse` | string | Referensi ayat hafalan dan teks singkatnya (opsional) |
| `lessons[].parentQuestion` | string | Satu pertanyaan untuk ditanyakan orang tua di rumah (opsional) |
| `lessons[].parentNote` | string | Catatan tambahan opsional untuk orang tua (markdown) |
| `venues[].id` | string | Pengidentifikasi venue yang unik |
| `venues[].name` | string | Nama venue (misalnya "Kids", "Adults", "Youth") |
| `venues[].apiUrl` | string | URL yang mengembalikan feed venue (lihat di bawah) |

Keempat kolom intisari untuk orang tua (`bottomLine`, `verse`, `parentQuestion`, `parentNote`) bersifat opsional, baik pada pohon maupun pada feed venue. Jika dihilangkan, nilainya dianggap kosong. Jangan menyalin `description` ke dalam kolom-kolom tersebut.

**Venue** mewakili versi berbeda dari pelajaran yang sama, yang disesuaikan untuk audiens yang berbeda (kelompok usia, suasana, dan sebagainya).

## Feed Venue

`apiUrl` setiap venue harus mengembalikan objek JSON yang sesuai dengan skema ini:

```json
{
  "id": "venue-1",
  "name": "Kids",
  "lessonId": "lesson-1",
  "lessonName": "The Baptism of Jesus",
  "lessonImage": "https://example.com/images/lesson1.jpg",
  "lessonDescription": "An introduction to Jesus' ministry.",
  "bottomLine": "God keeps His promises.",
  "verse": "Genesis 9:13 — I have set my rainbow in the clouds…",
  "parentQuestion": "What is one promise God has kept in our family?",
  "parentNote": "Pray together thanking God for keeping His promises.",
  "studyName": "The Beginning",
  "studySlug": "the-beginning",
  "programName": "Gospel of Mark",
  "programSlug": "gospel-of-mark",
  "programAbout": "A 12-week study through the Gospel of Mark.",
  "downloads": [],
  "sections": [
    {
      "id": "section-1",
      "name": "Opening Discussion",
      "sort": 1,
      "materials": "Whiteboard and markers",
      "actions": [
        {
          "id": "action-1",
          "actionType": "text",
          "content": "**Key Verse:** Mark 1:9-11",
          "sort": 1
        },
        {
          "id": "action-2",
          "actionType": "question",
          "content": "What do you know about baptism?",
          "sort": 2,
          "role": "Leader"
        },
        {
          "id": "action-3",
          "actionType": "play",
          "content": "Intro Video",
          "sort": 3,
          "files": [
            {
              "id": "file-1",
              "name": "intro-video.mp4",
              "url": "https://example.com/media/intro.mp4",
              "streamUrl": "https://vimeo.com/123456789",
              "fileType": "video/mp4",
              "seconds": 180,
              "bytes": 52428800,
              "thumbnail": "https://example.com/media/intro-thumb.jpg",
              "loop": false
            }
          ]
        }
      ]
    }
  ]
}
```

### Kolom Feed Venue

#### Objek Akar

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | Pengidentifikasi venue |
| `name` | string | Nama venue |
| `lessonId` | string | Pengidentifikasi pelajaran |
| `lessonName` | string | Nama tampilan pelajaran |
| `lessonImage` | string | URL gambar pelajaran |
| `lessonDescription` | string | Ringkasan pelajaran (teks katalog) |
| `bottomLine` | string | Intisari satu kalimat untuk dibawa pulang orang tua (opsional) |
| `verse` | string | Referensi ayat hafalan dan teks singkatnya (opsional) |
| `parentQuestion` | string | Satu pertanyaan untuk ditanyakan orang tua di rumah (opsional) |
| `parentNote` | string | Catatan tambahan opsional untuk orang tua, dalam markdown (opsional) |
| `studyName` | string | Nama studi induk |
| `studySlug` | string | Slug studi induk |
| `programName` | string | Nama program induk |
| `programSlug` | string | Slug program induk |
| `programAbout` | string | Deskripsi program |
| `downloads` | array | Kumpulan file yang dapat diunduh |
| `sections` | array | Bagian pelajaran yang berurutan |

#### Bagian

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | Pengidentifikasi bagian |
| `name` | string | Judul bagian |
| `sort` | number | Urutan tampilan |
| `materials` | string | Catatan bahan atau persiapan (opsional) |
| `actions` | array | Aksi yang berurutan dalam bagian ini |

#### Aksi

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | Pengidentifikasi aksi |
| `actionType` | string | Salah satu dari: `play`, `text`, `question`, `quote`, `subhead` |
| `content` | string | Konten teks atau label media |
| `sort` | number | Urutan tampilan |
| `role` | string | Nama peran, misalnya "Leader", "Kids" (opsional) |
| `roleId` | string | Pengidentifikasi peran (opsional) |
| `files` | array | File media untuk aksi `play` (opsional) |

#### File

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `id` | string | Pengidentifikasi file |
| `name` | string | Nama file |
| `url` | string | URL unduhan langsung |
| `streamUrl` | string | URL streaming, misalnya tautan Vimeo (opsional) |
| `fileType` | string | Tipe MIME (misalnya `video/mp4`, `image/jpeg`) |
| `seconds` | number | Durasi dalam detik untuk audio/video (opsional) |
| `bytes` | number | Ukuran file dalam byte (opsional) |
| `thumbnail` | string | URL gambar miniatur (opsional) |
| `loop` | boolean | Apakah media harus diulang (opsional, default false) |

#### Unduhan

| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| `name` | string | Nama kumpulan unduhan (misalnya "Printable Materials") |
| `files` | array | File dalam kumpulan unduhan ini (kolom yang sama dengan File di atas) |

## Jenis Aksi

| Jenis | Tujuan |
|-------|--------|
| `play` | Pemutaran media -- video, audio, atau slideshow. Harus menyertakan `files`. |
| `text` | Konten teks statis. Mendukung cetak tebal gaya markdown (`**teks**`). |
| `question` | Pertanyaan diskusi atau refleksi untuk audiens. |
| `quote` | Kutipan atau bagian Kitab Suci yang disorot. |
| `subhead` | Judul atau pemisah dalam sebuah bagian. |

:::tip
Untuk melihat contoh feed yang berfungsi, Anda dapat membuka pohon konten bawaan Lessons.church di `https://api.lessons.church/lessons/public/tree` dan mengambil URL feed venue mana pun dari sana.
:::
