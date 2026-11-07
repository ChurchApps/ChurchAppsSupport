---
title: "Notifikasi Push Web"
description: "Siapkan kunci VAPID, klien WebPushHelper, dan penanganan service worker agar B1.church dan B1 Admin bisa mengirim notifikasi push browser ke anggota."
---

# Notifikasi Push Web

<div class="article-intro">

Aplikasi web ChurchApps mengirimkan notifikasi push melalui W3C Web Push API. Mekanisme ini sama dengan yang digunakan Firebase Cloud Messaging di sisi server, tetapi dikirim melalui `PushManager` bawaan browser, bukan FCM. Satu pasang kunci VAPID di MessagingApi digunakan oleh semua konsumen (B1Admin, B1App, dan PWA lain di masa depan).

</div>

## Kapan push dikirim

Push merupakan salah satu tahap dalam satu alur pengiriman di dalam `NotificationHelper.attemptDeliveryWithEscalation()` (`Api/src/modules/messaging/helpers/NotificationHelper.ts`). Alurnya: gerbang preferensi dalam aplikasi, lalu pengiriman melalui socket dan push yang dicoba dalam satu alur yang sama (masing-masing memiliki gerbang preferensinya sendiri), lalu email. Penerima yang telah membisukan kategori tertentu tidak akan pernah menerima push. Keberhasilan pengiriman socket tidak lagi menghentikan push. Setiap jenis notifikasi kini berperilaku seperti pesan pribadi sejak awal, sehingga PWA yang terpasang dan berjalan di latar belakang tetap menampilkan notifikasi tingkat OS meskipun pengiriman socket sudah berhasil. Spanduk ganda ditangani di sisi klien oleh service worker (lihat [Persyaratan service worker](#service-worker-requirement)). Pengingat terjadwal dan siaran yang dipicu staf langsung dimulai dari tahap push dan melewati tahap socket sepenuhnya. Email tetap digerakkan oleh timer, yang meningkatkan baris belum dibaca sesuai jadwalnya sendiri dan tidak menjadi bagian dari alur ini.

Jalur paling umum yang mencapai tahap push:

1. **Notifikasi konten**: balasan pada percakapan yang diikuti seseorang, sebutan (mention), atau peristiwa lain yang diarahkan melalui `NotificationHelper.createNotifications()`.
2. **Pesan pribadi**: pesan langsung melalui fungsi pengiriman yang sama dan selalu mencoba push bersamaan dengan pengiriman socket.
3. **Pengingat terjadwal**: pengingat acara, tugas, dan pelayanan yang dijabarkan dan dikirim oleh mesin pengingat, yang memulai kemunculan baru langsung pada tahap push.
4. **Push yang dipicu staf**: `POST /messaging/notifications/create`, `/ping`, dan `/group/send` untuk siaran satu kali atau siaran kelompok.

## Alur server

```
NotificationHelper.createNotifications(...) / checkShouldNotify(...) / ReminderEngine.scan(...)
  │
  └─ NotificationHelper.attemptDeliveryWithEscalation(...)
       ├─ gerbang preferensi dalam aplikasi        ← penerima yang dibisukan berhenti di sini, tanpa push
       ├─ dalam alur yang sama, keduanya dicoba (tidak saling menghalangi):
       │    ├─ pengiriman socket melalui DeliveryHelper  ← dilewati untuk pengingat/siaran (mulai dari push)
       │    └─ gerbang preferensi push
       │         └─ WebPushHelper.sendBulkTypedMessages(tokens, title, body, type, contentId)
       │              └─ pustaka web-push → POST bertanda VAPID → layanan push browser
       └─ gerbang preferensi email → digerakkan timer, meningkatkan baris belum dibaca secara terpisah
```

### Variabel lingkungan yang diperlukan

Kunci VAPID disimpan di `Environment` dan harus tersedia agar push dapat diaktifkan:

| Variabel lingkungan | Pengaturan `Environment` | Keterangan |
|----------|----------|-------------|
| `WEB_PUSH_PUBLIC_KEY` | `webPushPublicKey` | Kunci publik VAPID (base64url). Dikembalikan ke klien melalui `GET /messaging/webpush/publicKey` |
| `WEB_PUSH_PRIVATE_KEY` | `webPushPrivateKey` | Kunci privat VAPID. Digunakan untuk menandatangani setiap push keluar |
| `WEB_PUSH_SUBJECT` | `webPushSubject` | URI `mailto:` yang dilaporkan ke layanan push. Nilai bawaannya `mailto:support@churchapps.org` |

`WebPushHelper.isEnabled()` mengembalikan `false` jika salah satu dari kedua kunci tidak ada. Modul messaging tetap berjalan, tetapi pengiriman push tidak melakukan apa-apa. Situs seluler B1App kemudian memberi tahu anggota bahwa push belum diaktifkan, alih-alih menawarkan pengaturan.

### Membuat pasangan kunci VAPID

```bash
npx web-push generate-vapid-keys
```

Tambahkan hasilnya ke `.env` Anda (lokal) atau ke AWS SSM Parameter Store (untuk deployment). Mengganti kunci membatalkan semua langganan yang ada. Klien harus mendaftar ulang saat halaman dimuat berikutnya.

## Model penyimpanan

Langganan Web Push disimpan di tabel `devices` yang sudah ada, bersama dengan catatan perangkat FCM. Keduanya dibedakan oleh awalan `webpush:` pada kolom `fcmToken`:

```
fcmToken = "webpush:" + JSON.stringify({ endpoint, keys: { p256dh, auth } })
```

Dengan cara ini, satu pemanggilan `loadByPersonId` dapat mengembalikan semua perangkat yang telah didaftarkan seorang pengguna, tanpa memandang platformnya. `WebPushHelper.isWebPushToken(token)` dan `decodeSubscription(token)` menangani logika awalan tersebut.

## Endpoint

Path dasar: `/messaging/webpush`

| Metode | Path | Autentikasi | Keterangan |
|--------|------|------|-------------|
| GET | `/publicKey` | Publik | Mengembalikan `{ publicKey, enabled }`. Klien meneruskan `publicKey` ke `pushManager.subscribe({ applicationServerKey })` |
| POST | `/subscribe` | JWT | Mendaftarkan (atau memperbarui) langganan untuk pengguna yang sudah terautentikasi. Body: `{ subscription: { endpoint, keys: { p256dh, auth } }, appName?, deviceInfo?, label? }` |
| POST | `/unsubscribe` | Publik | Menghapus baris perangkat apa pun yang `fcmToken`-nya mengandung endpoint yang diberikan. Body: `{ endpoint }` |
| DELETE | `/subscription/:id` | JWT | Menghapus baris perangkat tertentu berdasarkan id sisi server |

## Primitif klien: `WebPushHelper`

`WebPushHelper` dari `@churchapps/apphelper` adalah satu-satunya titik masuk di sisi klien. Host mengonfigurasinya sekali saat boot, lalu memanggil `subscribe()` setelah pengguna masuk.

```typescript
import { WebPushHelper } from "@churchapps/apphelper";

// Di bootstrap aplikasi Anda (misalnya _app.tsx, layout.tsx)
WebPushHelper.configure({
  scope: "/",                // cakupan service worker; sesuai dengan pendaftaran sw.js
  appName: "B1AppPwa"        // disimpan pada baris perangkat, berguna untuk memfilter berdasarkan permukaan
});

// Setelah masuk (dan setelah setiap perubahan userChurch)
await WebPushHelper.subscribe();
```

Perilaku yang didapat konsumen secara otomatis:

- **Pemeriksaan kemampuan**: `isSupported()` mengembalikan `false` pada browser yang tidak memiliki `serviceWorker` / `PushManager` / `Notification`.
- **Jeda waktu**: `canPromptNow()` menerapkan jeda 7 hari antara permintaan melalui `localStorage`, sehingga pengguna yang menolak perintah OS tidak akan ditanya lagi di setiap sesi.
- **Berhenti berlangganan**: `setOptedOut(true)` dan `unsubscribe()` mencegah permintaan ulang dan menghapus baris perangkat di sisi server.
- **Deteksi PWA mandiri**: `isStandalone()` memungkinkan host membatasi permintaan push di iOS hanya untuk pengguna yang telah memasang PWA ke layar utama (iOS hanya mengizinkan push dari PWA yang terpasang).
- **Daftar ulang saat berpindah gereja**: `refreshEnrollment()` mengirim ulang langganan browser yang ada ke `userChurch` yang baru tanpa meminta izin lagi. Panggil fungsi ini dari handler perubahan `userChurch`.

### Persyaratan service worker

`PushManager` di browser hanya akan menghasilkan langganan jika service worker terdaftar pada cakupan yang dikonfigurasi. PWA ChurchApps menggunakan [Serwist](https://serwist.dev/) (aplikasi Next.js) atau workbox untuk membuat service worker. Karena server kini selalu mencoba push bersamaan dengan pengiriman socket (lihat [Kapan push dikirim](#when-push-fires)), service worker menjadi titik deduplikasi. Handler `push`-nya harus menekan `showNotification` ketika klien yang sedang fokus atau terlihat sudah berada di tujuan tautan dalam notifikasi, tetapi harus selalu memperbarui lencana aplikasi, baik spanduk ditampilkan maupun tidak:

```javascript
// public/sw.js (atau apa pun yang dihasilkan Serwist/workbox)
self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "ChurchApps";
  const target = deepLinkFor(data.type, data.contentId, data);

  event.waitUntil((async () => {
    if (typeof data.badgeCount === "number") await updateAppBadge(data.badgeCount); // selalu dijalankan, meski spanduk ditekan

    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    // Pathname yang sama; untuk pesan pribadi, conversationId yang sama juga.
    const alreadyViewing = clients.some((client) => (client.focused || client.visibilityState === "visible") && clientMatchesTarget(client.url, target));
    if (alreadyViewing) return;

    await self.registration.showNotification(title, {
      body: data.body,
      data: { type: data.type, contentId: data.contentId, url: target },
      icon: "/icons/icon-192.png"
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const { url: target } = event.notification.data || {};
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });

    const exact = clients.find((client) => clientMatchesTarget(client.url, target));
    if (exact) return exact.focus(); // sudah berada di tujuan: fokuskan, jangan navigasi

    const mobileClient = clients.find((client) => new URL(client.url).pathname.startsWith("/mobile"));
    if (mobileClient) {
      await mobileClient.focus();
      return mobileClient.navigate(target);
    }

    return self.clients.openWindow(target);
  })());
});
```

`deepLinkFor` dan `clientMatchesTarget` bergantung pada masing-masing konsumen. Lihat `B1App/src/app/sw.ts` untuk implementasi acuannya. B1App mengarahkan `privateMessage` ke `/mobile/messages/:personId`, B1Admin mengarahkan `notification` ke panel peringatannya, dan seterusnya.

## Catatan operasional

- **Hasil `gone: true`**: `WebPushHelper.sendBulk` mengembalikan `{ token, success, gone, errorMessage }` untuk setiap penerima. Hasil `gone: true` (layanan push merespons `404` atau `410`) berarti langganan tersebut tidak valid secara permanen. Kode di hilir pada `NotificationHelper` akan menghapus baris perangkat tersebut agar tidak dicoba lagi.
- **TTL**: pesan push dikirim dengan `TTL: 86400` (24 jam). Jika browser pengguna tidak terhubung ke layanan push dalam 24 jam, push tersebut dibuang.
- **Tanpa percobaan ulang**: kegagalan sementara (timeout, 5xx) dicatat dan tidak dicoba lagi. Push bersifat best-effort. Socket di halaman dan tahap email yang menangani aspek ketahanan pengiriman.
- **Lingkungan nonaktif**: lingkungan pengembangan boleh membiarkan kunci VAPID kosong. `WebPushHelper.isEnabled()` akan mengembalikan `false` dan push akan dilewati. Ini adalah perilaku yang dimaksud untuk lingkungan yang tidak memiliki identitas VAPID sendiri.

## Halaman terkait

- [Arsitektur Notifikasi](./architecture/notifications.md) -- Alur lengkap eskalasi dalam aplikasi/push/email dan mesin pengingat
- [Arsitektur Real-time](./realtime.md) -- Pengiriman WebSocket. Push kini dipicu dari alur dalam aplikasi yang sama bersamaan dengan pengiriman socket, bukan hanya sebagai cadangan ketika pengiriman socket tidak berhasil
- [Endpoint Messaging](./api/endpoints/messaging.md) -- Notifikasi, perangkat, dan seluruh permukaan messaging lainnya
- [AppHelper](./shared-libraries/app-helper.md) -- Paket npm yang menyertakan `WebPushHelper`
