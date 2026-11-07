---
title: "Endpoint Kehadiran"
description: "Referensi API kehadiran untuk B1 Admin dan B1 Checkin: kampus, ibadah, waktu ibadah, sesi, kunjungan, aturan check-in, dan endpoint ekspor."
---

# Endpoint Kehadiran

<div class="article-intro">

Modul Kehadiran mengelola lokasi kampus, layanan, waktu layanan, sesi kehadiran, kunjungan, dan sesi kunjungan. Modul ini menyediakan infrastruktur untuk melacak siapa yang menghadiri layanan atau pertemuan kelompok tertentu, mendukung alur kerja check-in, serta menawarkan pelaporan tren dan ringkasan kehadiran.

</div>

**Path dasar:** `/attendance`

## Kampus

Path dasar: `/attendance/campuses`

Controller CRUD standar (memperluas GenericCrudController). Menyediakan rute `getById`, `getAll`, `post`, dan `delete` melalui kelas dasar CRUD.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | — | Menampilkan semua kampus untuk gereja |
| GET | `/:id` | JWT | — | Mendapatkan kampus berdasarkan ID |
| POST | `/` | JWT | Services.Edit | Membuat atau memperbarui kampus |
| DELETE | `/:id` | JWT | Services.Edit | Menghapus kampus |

## Layanan

Path dasar: `/attendance/services`

Memperluas GenericCrudController dengan rute CRUD `getById`, `getAll`, `post`, dan `delete`. Endpoint `getAll` (`GET /`) dan `search` diganti dengan implementasi khusus.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | — | Menampilkan semua layanan (termasuk informasi kampus) |
| GET | `/:id` | JWT | — | Mendapatkan layanan berdasarkan ID |
| GET | `/search?campusId=` | JWT | — | Mencari layanan berdasarkan ID kampus |
| POST | `/` | JWT | Services.Edit | Membuat atau memperbarui layanan |
| DELETE | `/:id` | JWT | Services.Edit | Menghapus layanan |

### Contoh: Mencari Layanan berdasarkan Kampus

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Waktu Layanan

Path dasar: `/attendance/servicetimes`

Memperluas GenericCrudController dengan rute CRUD `getById`, `post`, dan `delete`. Endpoint `getAll` dan `search` menggunakan implementasi khusus.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | — | Menampilkan semua waktu layanan. Filter dengan `?serviceId=`. Tambahkan `?include=groups` untuk menyertakan data kelompok. Setiap baris menyertakan nilai boolean `checkinOpen` yang dihitung (bernilai false hanya jika waktu layanan memiliki jadwal check-in dan jendela waktunya sedang tertutup). Jendela waktu diukur menggunakan zona waktu kampus layanan, lalu zona waktu gereja, lalu kampus pertama yang memiliki zona waktu, dan terakhir `America/New_York` |
| GET | `/:id` | JWT | — | Mendapatkan waktu layanan berdasarkan ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Mencari waktu layanan berdasarkan kampus dan layanan |
| GET | `/public/:churchId` | Publik | — | Mendapatkan pohon kampus → layanan → waktu untuk sebuah gereja. Digunakan oleh elemen `serviceTimes` pada website builder |
| POST | `/` | JWT | Services.Edit | Membuat atau memperbarui waktu layanan. Kolom jadwal opsional: `dayOfWeek` (0 = Minggu … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (sebelum mulai), `checkinCloseMinutes` (setelah selesai). Check-in hanya dibatasi waktu jika `dayOfWeek` dan `startTime` sama-sama diisi |
| DELETE | `/:id` | JWT | Services.Edit | Menghapus waktu layanan |

## Waktu Layanan Kelompok

Path dasar: `/attendance/groupservicetimes`

Menghubungkan kelompok dengan waktu layanan tertentu.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | — | Menampilkan semua asosiasi kelompok-waktu layanan. Filter dengan `?groupId=` untuk mendapatkan asosiasi beserta nama layanannya |
| GET | `/:id` | JWT | — | Mendapatkan asosiasi kelompok-waktu layanan berdasarkan ID |
| POST | `/` | JWT | Services.Edit | Membuat atau memperbarui asosiasi kelompok-waktu layanan |
| DELETE | `/:id` | JWT | Services.Edit | Menghapus asosiasi kelompok-waktu layanan |

## Catatan Kehadiran

Path dasar: `/attendance/attendancerecords`

Menyediakan tampilan agregat hanya-baca dari data kehadiran untuk pelaporan dan tampilan.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | Attendance.View | Memuat catatan kehadiran untuk seseorang. Wajib menyertakan `?personId=` |
| GET | `/my` | JWT | — | Cakupan mandiri: catatan kehadiran anggota yang sedang masuk selama 12 bulan terakhir, dari yang terbaru. Mengembalikan `401` jika pengguna tidak terhubung dengan seseorang. Digunakan oleh bagian **Kehadiran Saya** di halaman B1 Me |
| GET | `/tree` | JWT | — | Memuat pohon kehadiran lengkap (kampus, layanan, waktu layanan, kelompok) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Memuat data tren kehadiran dengan filter opsional |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Memuat kehadiran kelompok untuk layanan pada minggu tertentu |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Untuk setiap kelompok yang ditugaskan ke waktu layanan, mengembalikan `{ groupId, sessionId, attendanceCount }` pada tanggal tersebut (`date` dalam format `YYYY-MM-DD`; `sessionId` bernilai null jika kelompok tidak memiliki sesi). Digunakan oleh dialog **Siapa yang Masih Perlu Kehadiran** di B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Mencari catatan kehadiran dengan filter (kampus, layanan, waktu layanan, kelompok, rentang tanggal) |

### Contoh: Tren Kehadiran

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Sesi

Path dasar: `/attendance/sessions`

Memperluas GenericCrudController dengan rute CRUD `getById` dan `delete`. Endpoint `getAll` dan `save` menggunakan implementasi khusus yang juga memungkinkan pemimpin kelompok mengelola sesi untuk kelompok mereka.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | Attendance.View atau Group Leader | Menampilkan semua sesi. Filter dengan `?groupId=` (termasuk nama). Pemimpin kelompok dapat melihat sesi untuk kelompok mereka sendiri |
| GET | `/:id` | JWT | Attendance.View | Mendapatkan sesi berdasarkan ID |
| POST | `/` | JWT | Attendance.Edit atau Group Leader | Membuat atau memperbarui sesi. Pemimpin kelompok dapat menyimpan sesi untuk kelompok mereka sendiri |
| DELETE | `/:id` | JWT | Attendance.Edit | Menghapus sesi |

## Kunjungan

Path dasar: `/attendance/visits`

Mengelola catatan kunjungan individu (seseorang yang hadir pada tanggal tertentu) dan menyediakan alur kerja check-in.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | Attendance.View | Menampilkan semua kunjungan. Filter dengan `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Mendapatkan kunjungan berdasarkan ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View atau Attendance.Checkin | Memuat data check-in untuk orang-orang pada suatu layanan. Mengembalikan kunjungan beserta sesi kunjungannya dari tanggal log terakhir |
| POST | `/` | JWT | Attendance.Edit | Membuat atau memperbarui kunjungan |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit atau Attendance.Checkin | Mengirim data check-in. Membuat/memperbarui kunjungan dan sesi kunjungan, serta menghapus catatan yang sudah usang |
| DELETE | `/:id` | JWT | Attendance.Edit | Menghapus kunjungan |

### Contoh: Alur Check-in

**Langkah 1 -- Memuat data check-in yang ada:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Langkah 2 -- Mengirim check-in:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Jika waktu layanan yang dituju memiliki jadwal check-in dan jendela waktunya tertutup (diukur menggunakan urutan zona waktu yang sama dengan `checkinOpen`, dengan prioritas kampus), tidak ada yang disimpan dan respons yang dikembalikan adalah `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Pelanggaran kapasitas dan rasio relawan juga mengembalikan 409 (`error: "capacity"` atau `"ratio"`). Sesi yang sudah dimiliki seseorang hari ini (dikirim ulang pada setiap check-in) akan melewati pemeriksaan jendela waktu, sehingga satu rumah tangga dapat menambahkan waktu layanan yang masih terbuka setelah jendela waktu layanan sebelumnya tertutup.

## Sesi Kunjungan

Path dasar: `/attendance/visitsessions`

Mengelola hubungan antara kunjungan dan sesi (sesi spesifik mana yang dihadiri seseorang selama kunjungan). Juga menyediakan endpoint pencatatan cepat dan endpoint unduh/ekspor.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/` | JWT | Attendance.View atau Group Leader | Menampilkan sesi kunjungan. Filter dengan `?sessionId=`. Pemimpin kelompok dapat melihat sesi kunjungan untuk kelompok mereka sendiri |
| GET | `/:id` | JWT | Attendance.View | Mendapatkan sesi kunjungan berdasarkan ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Mengunduh kehadiran untuk sebuah sesi (mengembalikan nama orang beserta status hadir/tidak hadir) |
| POST | `/` | JWT | Attendance.Edit | Membuat atau memperbarui sesi kunjungan |
| POST | `/log` | JWT | Attendance.Edit atau Group Leader | Mencatat kehadiran seseorang ke sebuah sesi dengan cepat. Secara otomatis membuat kunjungan jika diperlukan. Pemimpin kelompok dapat mencatat kehadiran untuk kelompok mereka sendiri |
| DELETE | `/:id` | JWT | Attendance.Edit | Menghapus sesi kunjungan berdasarkan ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit atau Group Leader | Menghapus seseorang dari sebuah sesi. Menghapus sesi kunjungan dan kunjungan induknya jika tidak ada sesi yang tersisa. Pemimpin kelompok dapat menghapus kehadiran untuk kelompok mereka sendiri |

### Contoh: Pencatatan Cepat Kehadiran

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Contoh: Mengunduh Kehadiran Sesi

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Rangkaian Kehadiran

Path dasar: `/attendance/streaks`

Melacak rangkaian kehadiran individu, yaitu jumlah minggu berturut-turut seseorang hadir. Berguna untuk metrik keterlibatan dan gamifikasi.

| Metode | Path | Autentikasi | Izin | Deskripsi |
|--------|------|------------|------|------------|
| GET | `/person/:personId` | JWT | — | Memuat rangkaian kehadiran seseorang |

## Halaman Terkait

- [Endpoint Keanggotaan](./membership.md) — Orang, kelompok, peran, dan pengelolaan gereja
- [Autentikasi & Izin](./authentication.md) — Alur login, JWT, model izin
- [Struktur Modul](../module-structure.md) — Pola organisasi kode
