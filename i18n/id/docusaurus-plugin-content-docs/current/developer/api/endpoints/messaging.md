---
title: "Endpoint Messaging"
---

# Endpoint Messaging

<div class="article-intro">

Modul Messaging mengelola percakapan real-time, pesan obrolan, notifikasi push, pengiriman SMS/email, koneksi WebSocket, pesan pribadi, pendaftaran perangkat, dan penyedia teks. Modul ini menyediakan lapisan komunikasi yang digunakan di seluruh aplikasi ChurchApps, baik untuk obrolan siaran langsung maupun notifikasi asinkron.

</div>

**Path dasar:** `/messaging`

## Percakapan

Path dasar: `/messaging/conversations`

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Memuat percakapan berdasarkan ID yang dipisahkan koma beserta pesan pertama dan terakhir |
| GET | `/messages/:contentType/:contentId` | JWT | — | Memuat percakapan untuk konten dengan pesan berhalaman (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Mengambil percakapan bertipe post untuk grup pengguna saat ini |
| GET | `/posts/group/:groupId` | JWT | — | Mengambil percakapan bertipe post untuk grup tertentu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Catatan terbaru dari semua data untuk halaman Catatan B1 Admin. `section` adalah `people`, `groups`, `events`, atau `workflows` (selain itu akan mengembalikan 400); `limit` default-nya 25 (maks 100); `before` adalah cursor dari halaman sebelumnya. Setiap catatan tetap mengikuti aturan tipenya sendiri (izin People Edit / catatan rahasia, pemimpin grup, penonton acara, penonton kartu workflow), sehingga pemanggil hanya melihat catatan yang dapat mereka buka. Teks catatan dipotong menjadi 300 karakter |
| GET | `/current/:churchId/:contentType/:contentId` | Publik | — | Mengambil atau membuat percakapan saat ini untuk konten (otomatis mendekripsi contentId) |
| GET | `/:churchId/:contentType/:contentId` | Publik | — | Memuat percakapan berdasarkan tipe dan ID konten |
| GET | `/:churchId/:id` | Publik | — | Memuat satu percakapan berdasarkan ID |
| POST | `/` | JWT | — | Membuat atau memperbarui percakapan (batch) |
| POST | `/start` | JWT | — | Memulai percakapan baru dengan pesan komentar awal |
| DELETE | `/:churchId/:id` | JWT | — | Menghapus percakapan |

### Kontrol akses catatan orang

Percakapan dengan `contentType: "person"` (tab Catatan pada data orang) atau `contentType: "personConfidential"` (bagian Catatan Rahasia) dibatasi pada setiap jalur baca dan tulis, termasuk rute publik di atas, yang mengembalikan `401` untuk tipe konten ini. `person` memerlukan izin MembershipApi **People / Edit**; `personConfidential` memerlukan **People / View Confidential Notes**. Untuk API key dengan cakupan terbatas, `people:write` mencakup kedua aksi tersebut (pengguna pemilik key tetap harus memiliki izin peran yang mendasarinya).

### Kontrol akses catatan grup dan acara {#group-and-event-notes-access-control}

Dua tipe catatan lainnya dibatasi dengan cara yang sama, pada setiap jalur baca dan tulis (termasuk rute publik di atas), dan tidak pernah terbuka untuk posting anonim:

- **`groupNote`** (`contentId` = ID grup) -- feed **Catatan pemimpin** pada grup. Hanya pemimpin grup tersebut (`leaderGroupIds` pada JWT) yang dapat membaca atau memposting. Tidak ada izin staf yang memberikan akses, termasuk `content.edit` dan izin keanggotaan grup.
- **`eventNote`** (`contentId` = ID acara) -- catatan pada acara kalender. Staf dengan `content.edit` atau **Calendars / Admin** selalu dapat membaca dan memposting. Selain itu, akses mengikuti `notesViewRole` (baca) dan `notesPostRole` (posting) pada acara: `staff` (default, digunakan ketika field bernilai `null`) tidak memberikan akses kepada siapa pun selain staf, `leaders` memberikan akses kepada pemimpin grup acara, dan `members` memberikan akses kepada anggota dan pemimpin grup acara. Acara tanpa `groupId` hanya dapat diakses oleh staf.

### Kontrol akses catatan kartu workflow

Percakapan dengan `contentType: "workflowCard"` (catatan pada kartu workflow, di mana `contentId` adalah ID tugas kartu) hanya dapat dibaca dan ditulis oleh seseorang yang dapat membuka kartu tersebut: pengguna dengan izin DoingApi **Tasks / View**, atau orang atau grup yang ditugaskan kepada kartu, yang membuat kartu, atau yang menjadi subjek kartu. Pengguna lain akan menerima `401` pada setiap jalur baca, termasuk rute publik di atas. Percakapan kartu dilampirkan melalui kartu itu sendiri dengan `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; percakapan pertama yang dilampirkan yang berlaku). Endpoint ini dapat dipanggil oleh editor kartu dan penerima tugasnya.

### Contoh: Memulai Percakapan

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Pesan

Path dasar: `/messaging/messages`

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Memuat semua pesan dalam percakapan |
| GET | `/catchup/:churchId/:conversationId` | Publik | — | Memuat semua pesan dalam percakapan (catch-up publik untuk obrolan langsung) |
| GET | `/:churchId/:id` | Publik | — | Memuat satu pesan berdasarkan ID |
| POST | `/` | JWT | — | Menyimpan pesan (batch). Mengirim pembaruan real-time dan memicu notifikasi. Memperbarui pesan yang sudah ada memerlukan status sebagai penulisnya atau memiliki `content.edit`; penulis yang tersimpan tidak pernah dapat diubah |
| POST | `/send` | Publik | — | Mengirim pesan (batch, publik). Mengirim pembaruan real-time melalui WebSocket dan memicu notifikasi |
| POST | `/setCallout` | JWT | — | (lama) Menyiarkan pesan sorotan secara real-time. Tidak ada klien aktif; obrolan siaran langsung tidak lagi menampilkan sorotan |
| DELETE | `/:churchId/:id` | JWT | — | Menghapus pesan dan menyiarkan penghapusan secara real-time. Lihat [Moderasi pesan](#message-moderation) |

### Moderasi pesan

Penghapusan pesan diizinkan untuk:

- penulis pesan;
- staf dengan `content.edit` (di seluruh gereja);
- **pemimpin grup**, untuk percakapan dengan `contentType` `group` atau `groupAnnouncement` yang `contentId`-nya adalah grup yang mereka pimpin (`leaderGroupIds` pada JWT).

Percakapan catatan orang (`person` / `personConfidential`) tidak pernah dimoderasi oleh pemimpin. Percakapan tersebut menggunakan izin catatan (`people.edit`, `people.viewConfidentialNotes`) sebagai gantinya.

Pemimpin hanya mendapat izin hapus, bukan edit. Menulis ulang pesan anggota lain tetap dibatasi untuk penulisnya dan staf dengan `content.edit`.

### Contoh: Mengirim Pesan

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Pesan Pribadi

Path dasar: `/messaging/privatemessages`

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/` | JWT | — | Memuat semua pesan pribadi untuk pengguna saat ini (termasuk pesan terakhir per percakapan, dan menandai semuanya sebagai sudah dibaca) |
| GET | `/existing/:personId` | JWT | — | Mencari percakapan pribadi yang sudah ada dengan orang tertentu |
| GET | `/:id` | JWT | — | Memuat pesan pribadi berdasarkan ID (menghapus notifikasi jika ditujukan kepada pengguna saat ini) |
| POST | `/` | JWT | — | Mengirim pesan pribadi (batch). Memicu notifikasi push ke penerima |

## Notifikasi

Path dasar: `/messaging/notifications`

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/unreadCount` | JWT | — | Mengambil jumlah notifikasi belum dibaca untuk pengguna saat ini |
| GET | `/my` | JWT | — | Memuat semua notifikasi untuk pengguna saat ini (menandai semuanya sebagai sudah dibaca) |
| GET | `/tmpEmail` | Publik | — | Memicu ringkasan notifikasi email harian (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Memuat notifikasi untuk orang tertentu |
| GET | `/:churchId/:id` | JWT | — | Memuat notifikasi berdasarkan ID |
| POST | `/` | JWT | — | Membuat atau memperbarui notifikasi (batch) |
| POST | `/create` | JWT | — | Membuat notifikasi untuk beberapa orang. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Menandai semua notifikasi sebagai sudah dibaca untuk orang tertentu |
| POST | `/sendTest` | JWT | — | Mengirim notifikasi push uji coba. Body: `{ personId, title }` |
| POST | `/ping` | Publik | — | Membuat notifikasi dari pemicu eksternal. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Menghapus notifikasi |

### Contoh: Membuat Notifikasi

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Preferensi Notifikasi

Path dasar: `/messaging/notificationpreferences`

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/categories` | JWT | — | Mencantumkan kategori notifikasi beserta saluran default dan saluran yang diizinkan |
| GET | `/my` | JWT | — | Memuat preferensi notifikasi untuk pengguna saat ini (otomatis membuat default jika belum ada) |
| POST | `/` | JWT | — | Menyimpan preferensi pengguna saat ini. Body: salah satu dari `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, ditambah `overrides: [{ categoryKey, channel, optedIn }]` secara opsional (channel dapat berupa `push`, `email`, `in_app`, atau `sms`; kategori yang dikunci diabaikan). `allowSms` adalah persetujuan anggota untuk pengingat teks. Body lama berupa array baris masih diterima |

## Koneksi

Path dasar: `/messaging/connections`

Mengelola koneksi WebSocket/real-time untuk obrolan, percakapan grup, pesan pribadi, dan siaran langsung. Lihat [Arsitektur Real-time](../../realtime) untuk protokol end-to-end.

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/:churchId/:conversationId` | Publik | — | Memuat semua koneksi untuk percakapan |
| POST | `/` | Publik | — | Mendaftarkan koneksi (batch). Memicu siaran kehadiran pada percakapan. Item body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Publik | — | Memperbarui nama tampilan untuk koneksi berdasarkan socket ID. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Publik | — | Menghapus koneksi dari percakapan. Memicu siaran kehadiran |
| POST | `/tmpSendAlert` | Publik | — | Mengirim peringatan notifikasi ke koneksi seseorang. Body: `{ churchId, personId }` |

## Perangkat

Path dasar: `/messaging/devices`

Mengelola pendaftaran perangkat untuk notifikasi push dan pemasangan konten (misalnya, aplikasi Lessons di layar TV).

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| POST | `/enroll` | JWT | — | Mendaftarkan atau memperbarui perangkat (pendaftaran push seluler). Dicocokkan berdasarkan token FCM atau ID perangkat |
| POST | `/enrollAnon` | Publik | — | Mendaftarkan perangkat anonim dan membuat kode pasangan 4 karakter |
| POST | `/` | Publik | — | Menyimpan perangkat (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Memasangkan perangkat menggunakan kode pasangannya. `?contentType=&contentId=` opsional untuk menetapkan konten |
| GET | `/status/:deviceId` | Publik | — | Memeriksa status pemasangan perangkat |
| GET | `/:churchId` | JWT | — | Memuat semua perangkat untuk gereja |
| GET | `/:churchId/person/:personId` | JWT | — | Memuat semua perangkat untuk orang tertentu |
| GET | `/:churchId/:id` | JWT | — | Memuat perangkat berdasarkan ID |
| DELETE | `/:churchId/:id` | JWT | — | Menghapus perangkat |

### Contoh: Mendaftarkan Perangkat

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Konten Perangkat

Path dasar: `/messaging/devicecontents`

Mengelola penetapan konten untuk perangkat yang telah dipasangkan (misalnya, pelajaran mana yang ditampilkan di TV).

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/deviceId/:deviceId` | JWT | — | Memuat penetapan konten untuk perangkat |
| POST | `/` | JWT | — | Menyimpan penetapan konten perangkat (batch) |
| DELETE | `/:id` | JWT | — | Menghapus penetapan konten perangkat |

## Pesan Teks

Path dasar: `/messaging/texting`

Mengelola penyedia SMS, pengiriman pesan teks grup, dan pelacakan pengiriman.

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/providers` | JWT | — | Memuat penyedia teks untuk gereja (kredensial disamarkan) |
| GET | `/status` | JWT | — | `{ enabled }` — apakah gereja memiliki penyedia teks yang aktif. Pengguna gereja yang sudah masuk dapat mengaksesnya; digunakan untuk menampilkan opsi **Text** hanya ketika teks dapat dikirim |
| GET | `/inboundUrl` | JWT | `texting.send` atau `settings.edit` | `{ url }` — URL webhook masuk (STOP) gereja untuk ditempelkan ke penyedia |
| POST | `/inbound/:churchId/:token` | Publik | — | Webhook pesan masuk penyedia. `token` adalah HMAC dari ID gereja. Balasan yang persis berupa kata berhenti (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) akan menandai setiap orang yang cocok sebagai `optedOut` dan mematikan `allowSms` mereka. Mengembalikan `{ optedOut: <count> }`; balasan lain mengembalikan `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Pratinjau penerima pesan teks grup (jumlah yang memenuhi syarat, yang berhenti berlangganan, dan yang tidak memiliki nomor telepon) |
| GET | `/sent` | JWT | — | Memuat semua catatan pesan teks yang terkirim untuk gereja |
| GET | `/sent/:id/details` | JWT | — | Memuat pesan teks terkirim beserta log pengiriman per penerima |
| POST | `/providers` | JWT | — | Menyimpan penyedia teks (batch). Mengenkripsi kredensial API |
| POST | `/send` | JWT | — | Mengirim SMS kepada semua anggota grup yang memenuhi syarat. Body: `{ groupId, message }`. Field gabungan (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) diselesaikan untuk setiap penerima |
| POST | `/sendPerson` | JWT | — | Mengirim SMS kepada satu orang. Body: `{ personId, phoneNumber, message }`. Field gabungan diselesaikan, dan teks hasilnya yang dicatat |
| DELETE | `/providers/:id` | JWT | — | Menghapus penyedia teks |

### Contoh: Mengirim Pesan Teks Grup

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Templat Email

Path dasar: `/messaging/emailTemplates`

Mengelola templat email yang dapat digunakan kembali dan mengirim email berbasis templat ke grup.

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/` | JWT | — | Memuat semua templat email untuk gereja |
| GET | `/:id` | JWT | — | Memuat satu templat email berdasarkan ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` atau `tasks.admin` | Status email grup gereja: `{ approved, paused, remaining, requested }`. Dialog Kirim Email B1Admin dan tindakan workflow **Kirim email** menggunakannya untuk memberi peringatan ketika email tidak akan terkirim |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Meminta dukungan untuk menyetujui gereja agar dapat mengirim email grup (paling banyak sekali per gereja per minggu) |
| GET | `/preview/:groupId` | JWT | — | Pratinjau pengiriman email untuk grup (jumlah penerima yang memenuhi syarat, anggota tanpa email) |
| POST | `/` | JWT | — | Membuat atau memperbarui templat email (batch) |
| POST | `/send` | JWT | — | Mengirim templat email kepada semua anggota grup. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Menghapus templat email |

### Contoh: Mengirim Email ke Grup

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Field gabungan yang didukung:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP yang Diblokir

Path dasar: `/messaging/blockedips`

(lama) Pemblokiran IP untuk obrolan siaran langsung. Klien B1App tidak lagi memanggil `POST /`, karena pemblokiran IP dihapus dalam migrasi pengiriman terpadu. Rute `/clear` masih dipanggil server-ke-server oleh `StreamingServiceController` ketika layanan streaming disimpan.

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| POST | `/` | JWT | — | (lama) Menyimpan IP yang diblokir (batch). Tidak ada klien aktif |
| POST | `/clear` | JWT | — | Menghapus semua IP yang diblokir untuk layanan tertentu. Body: `[{ serviceId, churchId }]` |

## Log Pengiriman

Path dasar: `/messaging/deliverylogs`

Melacak status pengiriman untuk pesan yang terkirim (SMS, notifikasi push, email).

| Metode | Path | Auth | Izin | Deskripsi |
|--------|------|------|------|-----------|
| GET | `/content/:contentType/:contentId` | JWT | — | Memuat log pengiriman berdasarkan tipe dan ID konten |
| GET | `/person/:personId` | JWT | — | Memuat log pengiriman untuk orang tertentu. `?startDate=&endDate=` opsional untuk memfilter |
| GET | `/recent` | JWT | — | Memuat log pengiriman terbaru untuk gereja. `?limit=` opsional (default 100) |
| GET | `/:id` | JWT | — | Memuat log pengiriman berdasarkan ID |

## Halaman Terkait

- [Arsitektur Real-time](../../realtime) -- protokol WebSocket, langganan room, dan kerangka pengiriman terpadu
- [Notifikasi Web Push](../../web-push) -- pendaftaran dan pengiriman push browser
- [Endpoint Keanggotaan](./membership) -- orang, grup, peran, dan identitas inti
- [Endpoint Kehadiran](./attendance) -- pelacakan layanan dan kunjungan
- [Autentikasi & Izin](./authentication) -- alur login, JWT, OAuth, dan model izin
- [Struktur Modul](../module-structure) -- pola organisasi kode
