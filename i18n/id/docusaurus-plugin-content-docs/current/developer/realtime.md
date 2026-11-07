---
title: "Arsitektur Real-time"
---

# Arsitektur Real-time

<div class="article-intro">

ChurchApps menggunakan satu kerangka pengiriman berbasis WebSocket untuk setiap fitur real-time: chat grup, pesan pribadi, catatan konten, chat siaran langsung, serta kehadiran dan presensi. Halaman ini mendokumentasikan protokol, server, dan primitif klien yang digunakan oleh konsumen.

</div>

## Ikhtisar

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

Protokol ini terdiri dari tiga bagian:

1. **Satu WebSocket persisten** per tab browser, dibuka oleh `SocketHelper`.
2. **Baris koneksi** (`POST /messaging/connections`) yang dicatat di tabel `connections`. Baris ini menandai tupel `(socketId, churchId, conversationId)` sebagai pelanggan sebuah room.
3. **Fan-out di sisi server** oleh `DeliveryHelper.sendConversationMessages()`. Saat pesan disimpan (`POST /messaging/messages/send`), server membaca baris koneksi yang cocok lalu mengirim payload bertipe ke setiap socket yang terbuka.

Tidak ada Socket.IO, fallback long-polling, maupun microservice terpisah. WebSocket berjalan di proses yang sama dengan REST API (Lambda `web` untuk HTTP, Lambda `socket` untuk WebSocket di AWS; satu proses gabungan secara lokal dan di Railway).

## Port dan transport

| Lingkungan | HTTP | WebSocket |
|-------------|------|-----------|
| Pengembangan lokal   | `8084` | `ws://localhost:8087` (`WebSocketServer` terpisah) |
| Railway / Docker / host satu-port (`RAILWAY_ENVIRONMENT` atau `SELF_HOSTED` diset) | bersama | server HTTP bersama (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (rute `$connect` / `$disconnect` / `$default`) |

Pemilih transport adalah konfigurasi `deliveryProvider`:

- `local` → library `ws` mentah; klien terhubung ke `MessagingApiSocket` dari `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket; server mengirim payload ke koneksi aktif melalui `@aws-sdk/client-apigatewaymanagementapi`.

Klien tidak perlu tahu transport mana yang digunakan. Klien selalu berbicara dengan protokol JSON yang sama.

## Protokol wire

Setiap frame berupa JSON dengan bentuk `PayloadInterface`:

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // the "room" — usually a UUID, sometimes "alerts" or "content-{type}-{id}"
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // server → client, after connect, carries the socketId to use for room joins
  | "message"             // server → client, new message
  | "deleteMessage"       // server → client, message removed
  | "privateMessage"      // server → client, badge-count ping to the recipient's "alerts" room when a direct message escalates; the message body itself arrives via the ordinary "message" action inside the open conversation
  | "reaction"            // server → client, emoji reaction toggled on a message; data is { messageId, conversationId, personId, emoji, added } (added=false means removed). Broadcast to the conversation room by POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// server → client, secondary "something happened" signal for content-room subscribers
  | "attendance"          // server → client, viewer list / presence snapshot
  | "notification"        // server → client, generic notification (counts, etc.)
  | "reconnect"           // client-internal, dispatched locally by SocketHelper after a new socketId handshake completes following a drop — either an exponential-backoff reconnect after an unexpected close, or an immediate reconnect triggered by the resume probe (tab focus/visibility/online); never sent by the server
  | "alert" | "callout";  // legacy, see Connections endpoint reference
```

### Handshake

1. Klien membuka socket dan mengirim string literal `"getId"`.
2. Server membalas dengan `{ action: "socketId", data: "<id>" }`.
3. Klien menyimpan `socketId` dan menggunakannya sebagai koordinat ketiga pada setiap langganan room.

### Bergabung ke room

"Room" hanyalah tupel `(churchId, conversationId)`. Untuk berlangganan, klien mengirim baris `Connection`:

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optional; null for anonymous live stream viewers
    "displayName": "Anonymous4823"
  }
]
```

Pengiriman ini juga memicu siaran `attendance` ke percakapan tersebut, sehingga pelanggan yang sudah ada mengetahui ada penonton baru yang bergabung.

### Mengirim pesan

`POST /messaging/messages/send` (boleh anonim) atau `POST /messaging/messages/` (memerlukan autentikasi):

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Server menyimpan pesan, kemudian `DeliveryHelper.sendConversationMessages()` mencari semua baris koneksi untuk `conversationId` tersebut dan mengirim setiap socket sebuah frame `{ action: "message", data: <message> }`.

Untuk percakapan yang terikat konten (misalnya catatan yang dilampirkan ke seseorang), siaran kedua dengan `action: "conversationActivity"` dikirim ke room sintetis `"content-{type}-{id}"`. Dengan begitu, konsumen tampilan daftar tahu kapan harus memperbarui data tanpa harus membuka percakapan yang mendasarinya.

### Keluar dari room

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Endpoint ini menghapus baris koneksi dan memicu siaran `attendance` terakhir.

## Komponen sisi server

| Berkas | Peran |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Memiliki `WebSocketServer`. Memberikan `socketId` saat koneksi. Menjalankan heartbeat ping/pong 30 detik (`startHeartbeat`) yang memanggil `terminate()` dan membersihkan koneksi yang tidak membalas pong. Membersihkan socket mati dan memicu siaran ulang `attendance` saat terputus. Menyediakan `getLiveSocketIds()` dan `reapStaleConnections()`, yang digunakan oleh job timer 30 menit untuk menghapus baris `connections` yang sudah usang. Secara lokal, pemeriksaan dilakukan dengan melihat socketId mana yang masih aktif di dalam proses. Di AWS, ini berfungsi sebagai cadangan dengan TTL 24 jam untuk event `$disconnect` yang terlewat (API Gateway membatasi koneksi sekitar 2 jam, sehingga koneksi yang masih hidup tidak akan terhapus) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` membaca koneksi untuk room dan mengarahkan setiap frame ke socket lokal atau koneksi AWS API Gateway. `sendAttendance(churchId, conversationId)` membangun dan menyiarkan snapshot penonton |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` untuk bergabung, `DELETE /:churchId/:conversationId/:socketId` untuk keluar, `POST /setName` untuk memperbarui nama tampilan |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonim) dan `POST /` (terautentikasi) menyimpan lalu melakukan fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` adalah sumber kebenaran untuk siapa saja yang berlangganan |

## Primitif sisi klien (`@churchapps/apphelper`)

Kelima primitif ini adalah singleton statis di `apphelper/src/helpers/`. Mereka bekerja sama sehingga setiap tab hanya membuka **satu** WebSocket, tidak peduli berapa banyak komponen yang dipasang di halaman.

### `SocketHelper`

Memiliki satu koneksi WebSocket. `init()` yang dipanggil ulang bersifat idempoten, sehingga beberapa komponen dapat memanggilnya tanpa membuka socket ganda. Menyediakan:

- `init()` — membuka (atau menggunakan ulang) socket dan menyelesaikan handshake `getId`. Promise ini selesai setelah handshake berhasil, atau setelah timeout 5 detik ketika loop percobaan ulang di latar belakang sudah mengambil alih. Promise ini tidak pernah ditolak, sehingga pemanggil tidak perlu menangani kegagalan koneksi pertama secara khusus.
- `addHandler(action, id, fn)` / `removeHandler(id)` — mendaftarkan dan membatalkan listener berdasarkan `action`. Beberapa handler dapat mendengarkan action yang sama.
- `setPersonChurch({ personId, churchId })` — untuk pemanggil yang terautentikasi. Memicu langganan room `"alerts"` agar notifikasi push diterima di socket ini.
- `onSocketIdReady(fn)` — dipanggil pada setiap socketId baru, tidak hanya yang pertama. Ini mencakup handshake awal dan setiap reconnect berikutnya. Digunakan oleh `SubscriptionManager` untuk menjalankan join yang tertunda.
- `checkConnection()` — dipanggil oleh listener resume di bawah. Jika socket sudah tertutup, fungsi ini langsung melakukan reconnect. Jika socket tampak masih terbuka, fungsi ini mengirim probe liveness.

**Siklus hidup reconnect.** Penutupan tak terduga menjadwalkan reconnect dengan backoff eksponensial (1 detik, digandakan hingga batas 30 detik). `SocketHelper` juga mendengarkan `online`, `focus`, `pageshow`, dan `visibilitychange` pada `window`/`document` untuk mendeteksi tab yang kembali aktif. Jika socket sudah tertutup, fungsi ini langsung melakukan reconnect dan mengatur ulang backoff. Jika socket tampak masih terbuka, fungsi ini mengirim probe liveness `"getId"` dan memaksa reconnect jika tidak ada frame yang masuk dalam 3 detik. Mekanisme ini menangkap socket setengah-terbuka yang tertinggal setelah OS seluler menangguhkan aplikasi. Setelah handshake ulang berhasil, `SocketHelper` mengirim action lokal `"reconnect"` (lihat [Protokol wire](#wire-protocol)) ke setiap handler terdaftar untuk action tersebut.

### `SubscriptionManager`

Keanggotaan room dengan hitungan referensi. Beberapa komponen yang berlangganan percakapan yang sama hanya mendaftarkan satu baris koneksi di server.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... component renders, receives socket frames via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Tiga perilaku yang didapat konsumen secara otomatis:

- **Keluar tertunda (300 ms)**: bertahan dari double mount/unmount StrictMode React dan siklus pemasangan ulang yang singkat tanpa menghapus langganan di server. `reset()` juga membatalkan keluar tertunda yang masih menunggu.
- **Rejoin setelah reconnect**: `SubscriptionManager` mengingat `personId`/`displayName` yang digunakan untuk bergabung ke setiap room. Saat event `"reconnect"` dari `SocketHelper` (dan pada setiap pemanggilan `onSocketIdReady`), fungsi ini mengirim ulang setiap baris koneksi aktif beserta identitasnya. Rejoin dideduplikasi per socketId, sehingga satu reconnect tidak mengirim ulang room yang sama dua kali.
- **socketId yang diikat belakangan**: `joinRoom` mencatat niat sebelum socket selesai melakukan handshake. `POST /connections` yang sebenarnya dikirim saat `onSocketIdReady`.

### `ConversationStore`

Cache di memori dengan kunci `conversationId`. Mendaftarkan handler socket `message` / `deleteMessage` / `privateMessage` tepat satu kali dan menerapkan frame masuk ke percakapan yang sedang terbuka.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ uses /messages/conversation/:id when authenticated, /messages/catchup/:churchId/:id when anonymous

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-render with the latest snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // optional explicit cleanup
```

Pemanggil yang terautentikasi juga mendapatkan **hidrasi data orang**. `personId` pada pesan masuk diubah menjadi objek `PersonInterface` melalui pencarian `GET /people/ids` yang di-cache. Pemanggil anonim melewati langkah ini.

Pada event `"reconnect"` dari `SocketHelper`, `ConversationStore` mengambil ulang setiap percakapan yang saat ini memiliki listener `subscribe` aktif, sehingga pesan yang terlewat selama socket terputus dapat dipulihkan. Percakapan anonim melewati catch-up ini jika `churchId`-nya tidak pernah tercatat, karena endpoint catch-up memerlukan nilai tersebut.

### `PresenceStore`

Mengikuti pola `ConversationStore` untuk action `attendance`. Subscriber menerima `PresenceSnapshot { conversationId, totalViewers, viewers }` setiap kali server menyiarkan ulang presensi. Snapshot yang identik dideduplikasi sebelum notifikasi dikirim, sehingga badai reconnect tidak memicu render ulang yang tidak perlu.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Titik masuk utama untuk pemanggil yang **terautentikasi**. Membungkus `SocketHelper.init()`, mengatur konteks orang dan gereja (yang otomatis bergabung ke room `"alerts"`), dan memanggil `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` tepat satu kali. Layanan ini juga mendaftarkan handler `"reconnect"` sendiri yang memuat ulang jumlah notifikasi dan PM, sehingga badge pulih setelah koneksi terputus.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Alur anonim (chat siaran langsung adalah contoh utamanya) melewati `NotificationService` dan memanggil primitif secara langsung. Lihat `B1App/src/helpers/StreamChatManager.ts` sebagai implementasi referensi.

## Chat siaran langsung

Siaran langsung adalah konsumen anonim terbesar dari kerangka ini. Ada dua `contentType` yang digunakan untuk membatasi room:

- `streamingLive`: tab chat publik di `/stream` (satu room untuk setiap `streamingService`).
- `streamingLiveHost`: room privat yang hanya terlihat oleh staf dengan izin `contentApi.chat.host`. ID room dienkripsi di server (`GET /streamingServices/:id/hostChat`) agar pengikisan data secara iseng tidak mengungkapkannya.

`B1App/src/helpers/StreamChatManager.ts` menyiapkan kedua room melalui primitif terpadu. Tidak ada lagi kode socket khusus siaran langsung.

## Pola dan jebakan

- **Jangan membuka WebSocket sendiri.** `SocketHelper` adalah singleton dengan alasan tertentu. Jika Anda perlu mendengarkan action khusus, daftarkan handler pada socket yang sudah ada melalui `SocketHelper.addHandler`.
- **Jangan melewati `SubscriptionManager`.** Pemanggilan `POST /connections` secara langsung tetap berfungsi, tetapi Anda kehilangan hitungan referensi, keluar tertunda, dan rejoin setelah reconnect. Konsumen chat grup dan PM semuanya menggunakan `SubscriptionManager`.
- **ID handler harus unik per action.** `SocketHelper.addHandler(action, id, fn)` menggunakan `(action, id)` sebagai kunci. Jika dua listener memakai ID yang sama, listener pertama akan diganti. Store terpadu menggunakan ID seperti `"ConversationStore-Message"` dan `"PresenceStore-Attendance"` agar tidak bentrok dengan ID konsumen.
- **ID room adalah string opak.** Sebagian besar berupa UUID percakapan, tetapi sistem juga mendukung `"alerts"` (notifikasi per orang), `"content-{type}-{id}"` (room aktivitas sintetis), dan ID `streamingLiveHost` yang terenkripsi.
- **Autentikasi diperiksa di batas REST, bukan di socket.** Bergabung ke room melalui `POST /connections` boleh dilakukan secara anonim. Kontrol akses terjadi saat pesan dikirim, yaitu ketika controller pesan menentukan `messageType` apa saja yang boleh dikirim oleh pemanggil anonim.

## Halaman terkait

- [Arsitektur Notifikasi](./architecture/notifications) -- Alur eskalasi in-app/push/email yang menerima data dari transport ini
- [Endpoint Messaging](./api/endpoints/messaging) -- Daftar lengkap endpoint REST untuk pesan, percakapan, koneksi, dan perangkat
- [Notifikasi Push Web](./web-push) -- Push browser, terpisah dari pengiriman socket di dalam halaman
- [AppHelper](./shared-libraries/app-helper) -- Paket npm yang berisi primitif klien
- [Struktur Modul](./api/module-structure) -- Cara modul messaging diatur di sisi server
