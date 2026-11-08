---
title: "Endpoint Messaging"
description: "Referensi endpoint API messaging ChurchApps: percakapan, aturan akses catatan, pengiriman SMS, templat email, notifikasi, dan perangkat."
---

# Endpoint Messaging

<div class="article-intro">

Modul Messaging mengelola percakapan real-time, pesan obrolan, notifikasi push, pengiriman SMS/email, koneksi WebSocket, pesan pribadi, pendaftaran perangkat, dan penyedia pengiriman SMS. Modul ini menyediakan lapisan komunikasi yang digunakan di seluruh aplikasi ChurchApps, baik untuk obrolan siaran langsung maupun notifikasi asinkron.

</div>

**Jalur dasar:** `/messaging`

## Percakapan

Jalur dasar: `/messaging/conversations`

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Muat percakapan berdasarkan ID yang dipisahkan koma beserta pesan pertama dan terakhir |
| GET | `/messages/:contentType/:contentId` | JWT | — | Muat percakapan untuk konten dengan pesan berhalaman (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Ambil percakapan bertipe postingan untuk grup pengguna saat ini |
| GET | `/posts/group/:groupId` | JWT | — | Ambil percakapan bertipe postingan untuk grup tertentu |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Catatan terbaru dari semua data untuk halaman Catatan B1 Admin. `section` berupa `people`, `groups`, `events`, atau `workflows` (selain itu akan menghasilkan 400); `limit` default 25 (maks. 100); `before` adalah kursor dari halaman sebelumnya. Setiap catatan tetap harus lolos aturan jenisnya masing-masing (izin People Edit / catatan rahasia, pemimpin grup, penonton acara, penonton kartu alur kerja), sehingga pemanggil hanya melihat catatan yang bisa mereka buka. Teks catatan dipotong menjadi 300 karakter |
| GET | `/current/:churchId/:contentType/:contentId` | Publik | — | Ambil atau buat percakapan saat ini untuk konten (otomatis mendekripsi contentId) |
| GET | `/:churchId/:contentType/:contentId` | Publik | — | Muat percakapan berdasarkan tipe dan ID konten |
| GET | `/:churchId/:id` | Publik | — | Muat satu percakapan berdasarkan ID |
| POST | `/` | JWT | — | Buat atau perbarui percakapan (batch) |
| POST | `/start` | JWT | — | Mulai percakapan baru dengan pesan komentar awal |
| DELETE | `/:churchId/:id` | JWT | — | Hapus percakapan |

### Kontrol akses catatan orang

Percakapan dengan `contentType: "person"` (tab Catatan pada data orang) atau `contentType: "personConfidential"` (bagian Catatan Rahasia) dibatasi di setiap jalur baca dan tulis, termasuk rute publik di atas, yang akan mengembalikan `401` untuk tipe konten ini. `person` memerlukan izin **People / Edit** dari MembershipApi; `personConfidential` memerlukan izin **People / View Confidential Notes**. Untuk kunci API dengan cakupan, `people:write` mencakup kedua tindakan tersebut (pengguna kunci tetap harus memiliki izin peran yang mendasarinya).

### Kontrol akses catatan grup dan acara {#group-and-event-notes-access-control}

Dua jenis konten catatan lainnya dibatasi dengan cara yang sama, di setiap jalur baca dan tulis (termasuk rute publik di atas), dan tidak pernah terbuka untuk pengiriman oleh anonim:

- **`groupNote`** (`contentId` = ID grup) -- feed **Catatan pemimpin** pada grup. Hanya pemimpin grup tersebut (`leaderGroupIds` pada JWT) yang dapat membaca atau mengirim. Tidak ada izin staf yang memberikan akses, termasuk `content.edit` dan izin keanggotaan grup.
- **`eventNote`** (`contentId` = ID acara) -- catatan pada acara kalender. Staf dengan `content.edit` atau **Calendars / Admin** selalu dapat membaca dan mengirim. Selain itu, akses mengikuti `notesViewRole` (baca) dan `notesPostRole` (kirim) pada acara: `staff` (default, digunakan ketika field bernilai `null`) tidak mengizinkan siapa pun selain staf, `leaders` mengizinkan pemimpin grup acara, dan `members` mengizinkan anggota serta pemimpin grup acara. Acara tanpa `groupId` hanya dapat diakses staf.

### Kontrol akses catatan kartu alur kerja

Percakapan dengan `contentType: "workflowCard"` (catatan pada kartu alur kerja, di mana `contentId` adalah ID tugas kartu) hanya dapat dibaca dan ditulis oleh orang yang dapat membuka kartu tersebut: pengguna dengan izin DoingApi **Tasks / View**, atau orang atau grup yang ditugaskan, dibuat oleh, atau menjadi subjek kartu. Pihak lain akan menerima `401` di setiap jalur baca, termasuk rute publik di atas. Percakapan kartu dilampirkan melalui kartu itu sendiri dengan `POST /doing/tasks/:id/conversation` (body `{ "conversationId": "..." }`; lampiran pertama yang berhasil akan dipakai), yang dapat dipanggil oleh pengedit kartu dan penerima tugasnya.

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

Jalur dasar: `/messaging/messages`

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Muat semua pesan untuk sebuah percakapan |
| GET | `/catchup/:churchId/:conversationId` | Publik | — | Muat semua pesan untuk sebuah percakapan (catchup publik untuk obrolan langsung) |
| GET | `/:churchId/:id` | Publik | — | Muat satu pesan berdasarkan ID |
| POST | `/` | JWT | — | Simpan pesan (batch). Mengirim pembaruan real-time dan memicu notifikasi. Memperbarui pesan yang sudah ada mengharuskan pengirim aslinya atau pemegang `content.edit`; penulis yang tersimpan tidak pernah dapat diubah |
| POST | `/send` | Publik | — | Kirim pesan (batch, publik). Mengirim pembaruan real-time melalui WebSocket dan memicu notifikasi |
| POST | `/setCallout` | JWT | — | (lama) Siarkan pesan callout secara real-time. Tidak ada klien aktif; obrolan siaran langsung tidak lagi menampilkan callout |
| DELETE | `/:churchId/:id` | JWT | — | Hapus pesan dan siarkan penghapusan secara real-time. Lihat [Moderasi pesan](#message-moderation) |

### Moderasi pesan

Penghapusan pesan diizinkan untuk:

- penulis pesan;
- staf dengan `content.edit` (di seluruh gereja);
- **pemimpin grup**, untuk percakapan dengan `contentType` berupa `group` atau `groupAnnouncement` yang `contentId`-nya adalah grup yang mereka pimpin (`leaderGroupIds` pada JWT).

Percakapan catatan orang (`person` / `personConfidential`) tidak pernah dimoderasi oleh pemimpin; keduanya menggunakan izin catatan (`people.edit`, `people.viewConfidentialNotes`).

Pemimpin hanya mendapat izin hapus, bukan edit: menulis ulang pesan anggota lain tetap dibatasi untuk penulis dan staf dengan `content.edit`.

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

Jalur dasar: `/messaging/privatemessages`

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Muat semua pesan pribadi untuk pengguna saat ini (termasuk pesan terakhir per percakapan, menandai semuanya sudah dibaca) |
| GET | `/existing/:personId` | JWT | — | Temukan percakapan pribadi yang sudah ada dengan orang tertentu |
| GET | `/:id` | JWT | — | Muat pesan pribadi berdasarkan ID (menghapus notifikasi jika ditujukan kepada pengguna saat ini) |
| POST | `/` | JWT | — | Kirim pesan pribadi (batch). Memicu notifikasi push ke penerima |

## Notifikasi

Jalur dasar: `/messaging/notifications`

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Ambil jumlah notifikasi belum dibaca untuk pengguna saat ini |
| GET | `/my` | JWT | — | Muat semua notifikasi untuk pengguna saat ini (menandai semuanya sudah dibaca) |
| GET | `/tmpEmail` | Publik | — | Picu ringkasan notifikasi email harian (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Muat notifikasi untuk orang tertentu |
| GET | `/:churchId/:id` | JWT | — | Muat notifikasi berdasarkan ID |
| POST | `/` | JWT | — | Buat atau perbarui notifikasi (batch) |
| POST | `/create` | JWT | — | Buat notifikasi untuk beberapa orang. Body: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Tandai semua notifikasi sudah dibaca untuk seseorang |
| POST | `/sendTest` | JWT | — | Kirim notifikasi push uji coba. Body: `{ personId, title }` |
| POST | `/ping` | Publik | — | Buat notifikasi dari pemicu eksternal. Body: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Hapus notifikasi |

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

Jalur dasar: `/messaging/notificationpreferences`

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Daftar kategori notifikasi beserta saluran default dan saluran yang diizinkan |
| GET | `/my` | JWT | — | Muat preferensi notifikasi untuk pengguna saat ini (otomatis membuat default jika belum ada) |
| POST | `/` | JWT | — | Simpan preferensi pengguna saat ini. Body: salah satu dari `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, serta opsional `overrides: [{ categoryKey, channel, optedIn }]` (channel dapat berupa `push`, `email`, `in_app`, atau `sms`; kategori yang dikunci diabaikan). `allowSms` adalah persetujuan anggota untuk pengingat teks. Body lama berupa array baris masih diterima |

## Koneksi

Jalur dasar: `/messaging/connections`

Mengelola koneksi WebSocket/real-time untuk obrolan, percakapan grup, pesan pribadi, dan siaran langsung. Lihat [Arsitektur Real-time](../../realtime.md) untuk protokol end-to-end.

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Publik | — | Muat semua koneksi untuk sebuah percakapan |
| POST | `/` | Publik | — | Daftarkan koneksi (batch). Memicu siaran kehadiran pada percakapan. Item body: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Publik | — | Perbarui nama tampilan untuk koneksi berdasarkan ID socket. Body: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Publik | — | Lepaskan koneksi dari percakapan. Memicu siaran kehadiran |
| POST | `/tmpSendAlert` | Publik | — | Kirim peringatan notifikasi ke koneksi milik seseorang. Body: `{ churchId, personId }` |

## Perangkat

Jalur dasar: `/messaging/devices`

Mengelola pendaftaran perangkat untuk notifikasi push dan pemasangan konten (misalnya, aplikasi Lessons di layar TV).

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Daftarkan atau perbarui perangkat (pendaftaran push seluler). Dicocokkan berdasarkan token FCM atau ID perangkat |
| POST | `/enrollAnon` | Publik | — | Daftarkan perangkat anonim dan hasilkan kode pemasangan 4 karakter |
| POST | `/` | Publik | — | Simpan perangkat (batch) |
| GET | `/pair/:pairingCode` | JWT | — | Pasangkan perangkat menggunakan kode pemasangannya. Opsional `?contentType=&contentId=` untuk menetapkan konten |
| GET | `/status/:deviceId` | Publik | — | Periksa status pemasangan perangkat |
| GET | `/:churchId` | JWT | — | Muat semua perangkat untuk sebuah gereja |
| GET | `/:churchId/person/:personId` | JWT | — | Muat semua perangkat untuk seseorang |
| GET | `/:churchId/:id` | JWT | — | Muat perangkat berdasarkan ID |
| DELETE | `/:churchId/:id` | JWT | — | Hapus perangkat |

### Contoh: Mendaftarkan Perangkat

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Konten Perangkat

Jalur dasar: `/messaging/devicecontents`

Mengelola penugasan konten untuk perangkat yang telah dipasangkan (misalnya, pelajaran mana yang ditampilkan di TV).

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Muat penugasan konten untuk sebuah perangkat |
| POST | `/` | JWT | — | Simpan penugasan konten perangkat (batch) |
| DELETE | `/:id` | JWT | — | Hapus penugasan konten perangkat |

## Pengiriman SMS

Jalur dasar: `/messaging/texting`

Mengelola penyedia SMS, pengiriman pesan teks grup, dan pelacakan pengiriman.

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Muat penyedia SMS untuk gereja (kredensial disamarkan) |
| GET | `/status` | JWT | — | `{ enabled }` — apakah gereja memiliki penyedia SMS yang aktif. Dapat diakses pengguna gereja yang sudah masuk; digunakan untuk menampilkan opsi **Text** hanya ketika pesan teks dapat dikirim |
| GET | `/inboundUrl` | JWT | `texting.send` atau `settings.edit` | `{ url }` — URL webhook masuk (STOP) gereja untuk ditempelkan ke penyedia |
| POST | `/inbound/:churchId/:token` | Publik | — | Webhook pesan masuk dari penyedia. `token` adalah HMAC dari ID gereja. Balasan yang persis berupa kata berhenti (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) menandai setiap orang yang cocok sebagai `optedOut` dan mematikan `allowSms` mereka. Mengembalikan `{ optedOut: <count> }`; balasan lain mengembalikan `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Pratinjau penerima untuk pesan teks grup (jumlah yang memenuhi syarat, yang berhenti berlangganan, dan yang tidak memiliki nomor telepon) |
| GET | `/sent` | JWT | — | Muat semua catatan pesan teks terkirim untuk gereja |
| GET | `/sent/:id/details` | JWT | — | Muat satu pesan teks terkirim beserta log pengiriman per penerima |
| POST | `/providers` | JWT | — | Simpan penyedia SMS (batch). Mengenkripsi kredensial API |
| POST | `/send` | JWT | — | Kirim SMS ke semua anggota grup yang memenuhi syarat. Body: `{ groupId, message }`. Field gabungan (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) diganti untuk setiap penerima |
| POST | `/sendPerson` | JWT | — | Kirim SMS ke satu orang. Body: `{ personId, phoneNumber, message }`. Field gabungan diganti, dan teks yang sudah diganti itulah yang dicatat |
| DELETE | `/providers/:id` | JWT | — | Hapus penyedia SMS |

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

Jalur dasar: `/messaging/emailTemplates`

Mengelola templat email yang dapat digunakan ulang dan pengiriman email berbasis templat ke grup.

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Muat semua templat email untuk gereja |
| GET | `/:id` | JWT | — | Muat satu templat email berdasarkan ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` atau `tasks.admin` | Status email grup gereja: `{ approved, paused, remaining, requested }`. Dialog Send Email B1Admin dan tindakan **Send email** pada alur kerja menggunakannya untuk memperingatkan jika email tidak akan terkirim |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Minta dukungan untuk menyetujui gereja untuk email grup (paling banyak sekali per gereja per minggu) |
| GET | `/preview/:groupId` | JWT | — | Pratinjau pengiriman email untuk grup (jumlah penerima yang memenuhi syarat, anggota tanpa email) |
| POST | `/` | JWT | — | Buat atau perbarui templat email (batch) |
| POST | `/send` | JWT | — | Kirim email berbasis templat ke semua anggota grup. Body: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Hapus templat email |

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

Jalur dasar: `/messaging/blockedips`

(lama) Pemblokiran IP untuk obrolan siaran langsung. Klien B1App tidak lagi memanggil `POST /` — pemblokiran IP dihapus dalam migrasi pengiriman terpadu. Rute `/clear` masih dipanggil server-ke-server oleh `StreamingServiceController` ketika layanan siaran disimpan.

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (lama) Simpan IP yang diblokir (batch). Tidak ada klien aktif |
| POST | `/clear` | JWT | — | Hapus semua IP yang diblokir untuk layanan tertentu. Body: `[{ serviceId, churchId }]` |

## Log Pengiriman

Jalur dasar: `/messaging/deliverylogs`

Melacak status pengiriman untuk pesan yang terkirim (SMS, notifikasi push, email).

| Metode | Jalur | Auth | Izin | Deskripsi |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Muat log pengiriman berdasarkan tipe dan ID konten |
| GET | `/person/:personId` | JWT | — | Muat log pengiriman untuk seseorang. Opsional `?startDate=&endDate=` untuk memfilter |
| GET | `/recent` | JWT | — | Muat log pengiriman terbaru untuk gereja. Opsional `?limit=` (default 100) |
| GET | `/:id` | JWT | — | Muat log pengiriman berdasarkan ID |

## Halaman Terkait

- [Arsitektur Real-time](../../realtime.md) -- protokol WebSocket, langganan room, dan kerangka pengiriman terpadu
- [Notifikasi Web Push](../../web-push.md) -- pendaftaran dan pengiriman push di browser
- [Endpoint Membership](./membership.md) -- orang, grup, peran, dan identitas inti
- [Endpoint Attendance](./attendance.md) -- pelacakan layanan dan kunjungan
- [Autentikasi & Izin](./authentication.md) -- alur masuk, JWT, OAuth, model izin
- [Struktur Modul](../module-structure.md) -- pola organisasi kode
