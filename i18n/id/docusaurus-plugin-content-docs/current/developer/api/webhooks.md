---
title: "Webhooks"
description: "Atur webhook real-time dari B1 Admin: daftarkan endpoint, pilih peristiwa, verifikasi tanda tangan HMAC, atur percobaan ulang, dan kirim ulang muatan gagal."
---

# Webhooks

<div class="article-intro">

Webhook memungkinkan gereja mengirim notifikasi real-time ke alat pihak ketiga — platform otomasi (Zapier, Make, n8n), CRM, sistem akuntansi, atau apa pun yang menerima HTTP POST. Ketika seseorang, grup, atau rumah tangga berubah di B1, B1 mengirimkan payload JSON yang ditandatangani ke setiap URL yang berlangganan event tersebut.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Admin gereja dengan izin **Edit Church Settings** mendaftarkan dan mengelola webhook
- Endpoint penerima Anda harus dapat diakses melalui **HTTPS** di alamat publik
- Siapkan cara untuk menyimpan signing secret dengan aman — secret ini hanya ditampilkan sekali

</div>

## Ikhtisar

Webhook bersifat **keluar** (outbound) saja: B1 memanggil endpoint Anda, Anda tidak memanggil B1. Setiap webhook adalah langganan per gereja yang terdiri dari URL tujuan, signing secret, dan daftar event yang dilanggan.

Pengiriman menggunakan **outbox yang tahan lama**: ketika event yang dilanggan terjadi, B1 mencatat baris pengiriman dan worker latar belakang mengirimkan POST dalam waktu sekitar satu menit. Pengiriman yang gagal dicoba ulang dengan exponential backoff. Tidak ada data yang hilang jika pengiriman lambat atau endpoint Anda sempat tidak tersedia.

## Mendaftarkan Webhook

### Di B1Admin

Buka **Settings → Developer → Webhooks → New Webhook**. Masukkan nama, URL payload, dan pilih event yang ingin dilanggan. Setelah disimpan, **signing secret ditampilkan sekali saja** — salin segera dan simpan bersama integrasi Anda. Secret tidak akan ditampilkan lagi (Anda dapat merotasinya nanti, tetapi tidak dapat mengambil yang asli).

### Melalui API

Semua endpoint berada di bawah path dasar modul Membership `/membership/webhooks` dan memerlukan JWT dari admin gereja dengan izin `Settings / Edit`, **atau [API key](./api-keys.md) yang dibuat dengan scope `settings:write`**. Rute yang sama menerima keduanya. Hal ini memungkinkan Zapier dan Make mendaftarkan webhook atas nama gereja ketika Zap atau scenario diaktifkan.

```http
POST /membership/webhooks
Authorization: Bearer <jwt>
Content-Type: application/json

{
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"]
}
```

Respons pembuatan — dan **hanya** respons pembuatan — menyertakan `secret`:

```json
{
  "id": "a1b2c3d4e5f",
  "name": "Zapier — new members",
  "url": "https://hooks.zapier.com/hooks/catch/123/abc",
  "events": ["person.created", "person.updated", "group.member.added"],
  "active": true,
  "secret": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822c"
}
```

| Metode & Path | Tujuan |
|---|---|
| `GET /membership/webhooks` | Mendaftar webhook gereja (secret tidak disertakan) |
| `GET /membership/webhooks/events` | Katalog nama event yang valid |
| `GET /membership/webhooks/:id` | Memuat satu webhook |
| `POST /membership/webhooks` | Membuat (tanpa `id`) atau memperbarui (dengan `id`) |
| `POST /membership/webhooks/:id/regenerate-secret` | Merotasi signing secret; mengembalikan nilai baru sekali |
| `DELETE /membership/webhooks/:id` | Menghapus webhook |
| `GET /membership/webhooks/:id/deliveries` | Percobaan pengiriman terbaru untuk sebuah webhook |
| `GET /membership/webhooks/deliveries/:deliveryId` | Payload dan respons lengkap untuk satu pengiriman |
| `POST /membership/webhooks/deliveries/:deliveryId/redeliver` | Mengantrekan ulang sebuah pengiriman |

## Katalog Event

Nama event mengikuti pola `{entity}.{action}`. Ambil daftar terkini dari `GET /membership/webhooks/events`.

| Event | Terjadi ketika |
|---|---|
| `person.created` | Seseorang ditambahkan |
| `person.updated` | Data seseorang diubah |
| `person.destroyed` | Seseorang dihapus |
| `household.created` | Rumah tangga ditambahkan |
| `household.updated` | Rumah tangga diubah |
| `household.destroyed` | Rumah tangga dihapus |
| `group.created` | Grup ditambahkan |
| `group.updated` | Grup diubah |
| `group.destroyed` | Grup dihapus |
| `group.member.added` | Seseorang ditambahkan ke grup |
| `group.member.removed` | Seseorang dihapus dari grup |
| `donation.created` | Pemberian dicatat — entri manual, daring, atau transisi pending → complete |
| `donation.updated` | Catatan donasi diedit |
| `attendance.recorded` | Kehadiran dicatat (entri manual atau check-in) |
| `session.created` | Sesi kehadiran baru dibuat (secara manual atau otomatis pada check-in pertama) |
| `form.submission.created` | Formulir dikirimkan |
| `event.created` | Acara kalender ditambahkan |
| `event.updated` | Acara kalender diedit |
| `event.destroyed` | Acara kalender dihapus |

## Format Payload

Setiap pengiriman berupa HTTP `POST` dengan isi JSON dan header berikut:

| Header | Keterangan |
|---|---|
| `Content-Type` | Selalu `application/json` |
| `X-B1-Event` | Nama event, misalnya `person.created` |
| `X-B1-Delivery-Id` | Id unik untuk percobaan pengiriman ini — gunakan untuk mendeduplikasi |
| `X-B1-Signature` | Tanda tangan HMAC-SHA256 dari body mentah (lihat di bawah) |
| `X-B1-Timestamp` | Waktu epoch Unix (detik) saat permintaan dikirim |
| `User-Agent` | `B1-Webhooks/1.0` |

Body membungkus resource yang berubah dalam amplop sederhana:

```json
{
  "event": "person.created",
  "churchId": "AbC123XyZ90",
  "occurredAt": "2026-05-17T14:32:08.114Z",
  "data": {
    "id": "Pq7Rs2Tu4Vw",
    "churchId": "AbC123XyZ90",
    "name": { "display": "Jordan Rivera", "first": "Jordan", "last": "Rivera" },
    "contactInfo": { "email": "jordan@example.com" }
  }
}
```

Untuk event `*.destroyed`, `data` hanya berisi `id` dan `churchId` dari catatan yang dihapus.

Event yang payload-nya mereferensikan catatan lain melalui id juga membawa nama yang mudah dibaca, yang diselesaikan pada saat pengiriman: `personName` dan `groupName` pada event keanggotaan grup, `personName` pada event kehadiran, donasi, dan keanggotaan daftar, `groupName` pada `session.created`, serta `formName` (dan `personName` jika pengiriman terkait dengan seseorang) pada `form.submission.created`.

## Tipe Connector

Format pengiriman default adalah amplop JSON di atas — `connectorType: "standard"`. Untuk [Slack dan Discord](/docs/b1-admin/integrations/slack-discord), mesin webhook yang sama justru mengirim pesan berbentuk chat yang langsung diterima oleh layanan tersebut:

| `connectorType` | Body yang dikirim | Gunakan ketika |
|---|---|---|
| `"standard"` (default) | Amplop `{event, churchId, occurredAt, data}`, ditandatangani | Anda menulis integrasi sendiri, atau mengarahkan ke Zapier / Make / server kustom |
| `"slack"` | `{ "text": "💝 New donation: $50.00" }` | Anda memposting langsung ke URL Slack Incoming Webhook |
| `"discord"` | `{ "content": "💝 New donation: $50.00" }` | Anda memposting langsung ke URL webhook channel Discord |
| `"mailchimp"` | tidak berlaku — connector memanggil API Mailchimp sendiri | Anda ingin [sinkronisasi audiens](/docs/b1-admin/integrations/services/mailchimp) tanpa URL untuk di-host |

Tipe connector diatur di dropdown **Connector Type** pada editor webhook, atau melalui `connectorType` dalam body `POST /membership/webhooks`. Header `X-B1-Signature` tetap dikirim untuk pengiriman Slack/Discord (mereka mengabaikannya tanpa masalah), sehingga mengubah webhook kembali ke `standard` nanti tidak memerlukan penandatanganan ulang.

Slack dan Discord hanya membentuk ulang body — mesin tetap mengirim POST ke URL yang diberikan gereja. `mailchimp` adalah connector pertama yang justru mengelola pertukaran HTTP-nya sendiri: untuk setiap event, ia mengirim permintaan upsert/archive/tag yang terautentikasi ke API Mailchimp (`MailchimpConnector.deliver`), dan kredensialnya (`{apiKey, audienceId}`) disimpan terenkripsi AES di `webhooks.connectorConfig`, hanya dapat ditulis melalui API. Webhook Mailchimp hanya menerima event person, group-member, dan list-member; rute penyimpanan memverifikasi kunci dan audiens dengan Mailchimp sebelum menerimanya. Baris pengiriman menyimpan amplop standar, sehingga log pengiriman menampilkan apa yang dilihat B1 beserta respons Mailchimp. Situasi yang tidak terpetakan (seseorang tanpa email, event tanpa pemetaan) diselesaikan sebagai berhasil dengan body respons `Skipped:` alih-alih membuang percobaan ulang.

## Pengujian Pengiriman

Setiap editor webhook memiliki tombol **Send Test Event** — panggilan API yang sesuai adalah `POST /membership/webhooks/:id/test`. Rute uji membangun payload sintetis untuk event pertama yang dilanggan, mengirimkannya secara sinkron melalui jalur pengiriman bertanda tangan yang sebenarnya (dan melalui `formatForConnector` untuk Slack/Discord), lalu mengembalikan baris pengiriman yang dihasilkan termasuk `responseStatus` dan `responseBody`. Gunakan ini untuk memastikan konektivitas dan penanganan tanda tangan sebelum mengaktifkan integrasi secara sungguhan. Untuk webhook `mailchimp`, uji justru memverifikasi kredensial yang tersimpan dengan API Mailchimp (event sintetis akan menulis subscriber palsu ke audiens asli gereja) dan mengembalikan hasil berbentuk pengiriman tanpa membuat baris.

## Memverifikasi Tanda Tangan

Selalu verifikasi `X-B1-Signature` sebelum mempercayai payload. Tanda tangan berupa `sha256=` diikuti HMAC-SHA256 dalam format heksadesimal dari **body permintaan mentah** yang dikunci dengan signing secret Anda. Hitung dari byte yang Anda terima — jangan serialisasi ulang JSON yang sudah di-parse.

**Node.js**

```js
const crypto = require("crypto");

function isValid(rawBody, signatureHeader, secret) {
  const expected = "sha256=" + crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
```

**Python**

```python
import hashlib, hmac

def is_valid(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature_header or "")
```

**PHP**

```php
function isValid(string $rawBody, string $signatureHeader, string $secret): bool {
    $expected = "sha256=" . hash_hmac("sha256", $rawBody, $secret);
    return hash_equals($expected, $signatureHeader ?? "");
}
```

Tolak setiap permintaan yang tanda tangannya tidak cocok. Sebagai opsi tambahan, Anda juga dapat menolak permintaan yang `X-B1-Timestamp`-nya lebih dari beberapa menit lalu untuk membatasi jendela replay.

## Dukungan SDK

Untuk Node.js, `@churchapps/integration-sdk` menyediakan verifier bertipe dan middleware Express yang menangani penangkapan raw body, pemeriksaan tanda tangan, dan parsing amplop untuk Anda:

```ts
import express from "express";
import { b1WebhookMiddleware } from "@churchapps/integration-sdk";

const app = express();
// Capture the raw body before JSON parsing — required so the signature still verifies.
app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));

app.post("/webhooks/b1", b1WebhookMiddleware({ secret: process.env.B1_WEBHOOK_SECRET! }), (req, res) => {
  const env = req.b1Webhook!;
  switch (env.event) {
    case "donation.created": console.log("new gift", env.data.amount); break;
  }
  res.sendStatus(200);
});
```

SDK juga menyediakan `WebhookVerifier.verify(secret, rawBody, signatureHeader)` untuk runtime non-Express (fungsi serverless, Fastify, dll.). Lihat paket di npm.

## Pengiriman & Percobaan Ulang

Endpoint Anda sebaiknya merespons dengan status `2xx` secepat mungkin — idealnya setelah hanya memasukkan pekerjaan ke antrean, bukan setelah memprosesnya. Setiap respons non-`2xx`, kegagalan koneksi, atau respons yang lebih lambat dari **10 detik** dihitung sebagai pengiriman yang gagal.

Pengiriman yang gagal dicoba ulang dengan exponential backoff — **16 percobaan dalam sekitar 5 hari**. Jedanya dimulai dari 1 menit, lalu meningkat hingga hitungan jam, hingga jeda 3 hari untuk percobaan terakhir. Setelah percobaan gagal yang ke-16, pengiriman ditandai `exhausted` dan ditinggalkan.

Pengiriman bersifat **at-least-once**: sebuah pengiriman dapat tiba lebih dari sekali (misalnya, jika endpoint Anda berhasil tetapi respons hilang). Gunakan header `X-B1-Delivery-Id` untuk mendeduplikasi — proses setiap id hanya sekali dan anggap pengulangan sebagai tidak ada aksi.

### Nonaktif otomatis

Jika sebuah webhook menghasilkan **tiga pengiriman exhausted berturut-turut**, B1 menonaktifkannya secara otomatis. Perbaiki endpoint Anda, lalu aktifkan kembali webhook di B1Admin (atau melalui `POST /membership/webhooks` dengan `"active": true`).

## Memeriksa & Mengirim Ulang

Editor webhook di B1Admin menampilkan tabel **Recent Deliveries** — event, status, jumlah percobaan, kode respons, dan waktu. Memilih sebuah baris akan menampilkan payload lengkap yang dikirim dan respons yang kembali.

Gunakan **Redeliver** untuk mengantrekan ulang pengiriman lama dengan payload aslinya — berguna setelah memperbaiki bug di endpoint Anda, atau untuk mengisi ulang event yang terlewat selama endpoint Anda tidak tersedia.

## Persyaratan URL

Karena URL webhook diberikan oleh gereja, B1 menerapkan pengamanan terhadap server-side request forgery. URL webhook ditolak — saat pendaftaran dan diperiksa ulang sebelum setiap pengiriman — jika:

- tidak menggunakan **`https`**
- mengarah ke `localhost`, hostname `.local` / `.internal`, atau
- di-resolve ke alamat IP **private, loopback, link-local, atau cloud-metadata**

Endpoint Anda harus berupa layanan HTTPS yang dapat diakses secara publik.
