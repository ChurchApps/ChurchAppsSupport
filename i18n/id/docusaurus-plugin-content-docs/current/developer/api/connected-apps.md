---
title: "Aplikasi Terhubung & OAuth"
---

# Aplikasi Terhubung & OAuth

<div class="article-intro">

API B1 mendukung OAuth 2.0 sehingga aplikasi pihak ketiga dapat meminta izin dari setiap admin gereja untuk mengakses data mereka, tanpa gereja pernah membagikan kata sandi atau kunci API. **Aplikasi Terhubung** adalah token OAuth yang telah disetujui oleh admin gereja; mencabutnya akan memutus akses aplikasi pihak ketiga tersebut hanya dengan satu klik. Gunakan jalur ini untuk konektor SaaS multi-penyewa. Untuk integrasi satu gereja, lebih baik gunakan [Kunci API](./api-keys).

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Sebuah **klien** OAuth harus didaftarkan sebelum gereja dapat memberikan aksesnya, baik oleh admin server B1 maupun oleh klien itu sendiri melalui [pendaftaran dinamis](#dynamic-client-registration)
- Semua endpoint OAuth berada di bawah modul Membership: `/membership/oauth/...`
- Access token berbentuk JWT yang membawa izin pengguna, yang telah disaring berdasarkan scope yang diberikan

</div>

## Konsep

| Istilah | Arti |
|---|---|
| **OAuth client** | Aplikasi pihak ketiga itu sendiri, diidentifikasi oleh `client_id` dan diamankan oleh `client_secret`. Didaftarkan sekali di B1 dan digunakan bersama oleh semua gereja yang memasangnya. |
| **Connected App** | Pasangan `(client, admin-gereja)` tertentu di mana admin telah memberikan akses kepada klien. Setiap Connected App didukung oleh refresh token OAuth. |
| **Access token** | JWT berumur pendek (≈ 7 hari) yang digunakan klien untuk panggilan API. Bentuknya sama dengan JWT pengguna: `Authorization: Bearer <jwt>`. |
| **Refresh token** | String opaque berumur panjang (≈ 90 hari) yang digunakan klien untuk membuat access token baru. |
| **Scope** | Membatasi apa saja yang dapat dilakukan access token. Lihat [katalog scope](./api-keys#scopes). |

## Alur Pemberian Akses

B1 mendukung tiga alur OAuth, yang semuanya didefinisikan oleh RFC 6749 dan RFC 8628.

### Authorization Code (aplikasi web)

Gunakan alur ini jika aplikasi Anda memiliki komponen sisi server dan dapat menjaga kerahasiaan `client_secret`.

1. **Otorisasi**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Klien publik (tanpa `client_secret`) juga harus mengirim `"code_challenge": "..."` dan `"code_challenge_method": "S256"` (PKCE, RFC 7636). Hanya `S256` yang diterima.

   Mengembalikan `{ "code": "...", "state": "xyz" }`. Endpoint kode otorisasi memang sengaja berupa POST yang memerlukan autentikasi. Aplikasi Anda mengumpulkan JWT B1 pengguna (biasanya dengan menampilkan tombol di sesi B1 pengguna) lalu meneruskannya sebagai bagian dari langkah persetujuan.

2. **Tukar kode dengan token**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Jika langkah otorisasi mengirim `code_challenge`, sertakan `"code_verifier": "..."` yang sesuai. Klien publik mengirim verifier dan tidak menyertakan `client_secret`. Endpoint token menerima body berformat JSON atau form-encoded (`application/x-www-form-urlencoded`).

   Mengembalikan respons token:

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Perbarui** token ketika access token hampir kedaluwarsa:

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Refresh token akan kedaluwarsa setelah 90 hari tidak digunakan. Jika sudah kedaluwarsa, admin gereja harus memberikan otorisasi ulang.

### Device Code (TV, kiosk, CLI)

Gunakan alur ini jika perangkat tidak memiliki browser. Didefinisikan oleh RFC 8628.

1. **Minta kode perangkat**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Mengembalikan kode yang ditampilkan kepada pengguna dan interval polling:

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Tampilkan `user_code` dan `verification_uri` kepada pengguna.

3. **Lakukan polling** ke `/membership/oauth/token` dengan `grant_type=urn:ietf:params:oauth:grant-type:device_code` dan `device_code`. Respons standarnya:

   | Error | Arti |
   |---|---|
   | `authorization_pending` | Pengguna belum menyetujui. Terus lakukan polling pada interval yang disarankan. |
   | `expired_token` | Kode perangkat sudah melewati `expires_in`. Mulai ulang dari awal. |
   | `access_denied` | Pengguna menolak permintaan. |
   | _(tidak ada, 200 OK)_ | Disetujui. Body berupa `B1TokenResponse`. |

4. Setelah disetujui, simpan `refresh_token` dan gunakan `access_token` hingga kedaluwarsa.

SDK B1 menyertakan `B1OAuthClient.awaitDeviceToken(...)` yang menjalankan loop polling untuk Anda dengan backoff yang sesuai RFC.

### Refresh Token

Permintaan ini selalu tersedia secara mandiri setelah Anda memiliki `refresh_token`:

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Access token dan refresh token baru akan dikembalikan. **Klien publik** (tanpa `client_secret`) dapat menghilangkan `client_secret` saat melakukan refresh. Ini berguna untuk aplikasi OAuth mobile atau desktop yang tidak dapat menjaga kerahasiaan secret.

Refresh token dirotasi, tetapi token yang lama tidak langsung dibuang. Jika klien tidak pernah menerima balasan refresh (misalnya TV yang kehilangan daya atau Wi-Fi di tengah permintaan), klien dapat mencoba ulang dengan `refresh_token` sebelumnya hingga **7 hari**. Percobaan ulang hanya berhasil selama token pengganti belum pernah digunakan. Token pengganti yang belum digunakan kemudian dibuang dan pasangan baru diterbitkan. Setelah token pengganti itu sendiri di-refresh, token lama akan mengembalikan `invalid_grant`. Mencabut koneksi juga mencabut token yang telah dirotasi dan masih berada dalam masa tenggang tersebut. Daftar aplikasi terhubung hanya menampilkan setiap koneksi satu kali.

## Bentuk Token

Access token adalah JWT yang diterbitkan oleh B1 dan identik dengan token yang didapatkan pengguna dari `POST /membership/users/login`. Klaim izin modularnya sama, dan perilaku `checkAccess` di setiap controller juga sama. **Satu-satunya perbedaan** adalah array izin telah disaring melalui scope yang diberikan saat token diterbitkan. Access token dengan scope tidak dapat melakukan apa pun yang tidak dapat dilakukan oleh kunci API dengan scope serupa. Tidak ada "jalur OAuth" terpisah di controller mana pun. `actionWrapper` tidak mengetahui apakah pemegang token adalah seseorang, kunci API, atau klien OAuth.

## Aplikasi Terhubung (untuk Pengguna)

Dari sudut pandang admin gereja, "Aplikasi Terhubung" adalah daftar aplikasi yang telah diberi akses ke gereja mereka. Setiap baris merupakan pasangan `(OAuthClient, OAuthToken)` yang aktif.

Di B1Admin, **Pengaturan → Developer → Connected Apps** menampilkan:

- Nama klien
- Scope yang disetujui admin
- Tanggal akses diberikan
- Tombol **Cabut**

| Metode & Path | Autentikasi | Tujuan |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Daftar koneksi aktif milik pemanggil (digabung dengan nama klien dan scope) |
| `DELETE /membership/oauth/connections/:id` | JWT | Cabut koneksi berdasarkan id token OAuth-nya. Token berhenti berfungsi pada permintaan berikutnya. |

Daftar ini secara otomatis mengecualikan token yang sudah kedaluwarsa.

## Scope & Persetujuan

String scope menggunakan katalog yang sama dengan [kunci API](./api-keys#scopes). Praktik terbaik untuk klien:

- **Minta scope yang paling sempit namun tetap berfungsi.** Gereja akan memperhatikan jika Anda meminta `donations:write` padahal Anda hanya perlu membaca data orang.
- **Gunakan refresh token bersama access token berumur pendek.** Access token berumur panjang lebih sulit dicabut dengan cepat.
- **Selalu tampilkan kembali scope yang diberikan kepada pengguna** di UI Anda sendiri agar mereka dapat memverifikasi apa yang telah mereka setujui.

## Pengelolaan Klien OAuth

Klien OAuth (aplikasi pihak ketiga itu sendiri) didaftarkan secara global. Klien confidential dengan `client_secret` dibuat oleh admin server B1. Untuk merilis aplikasi seperti ini, hubungi tim ChurchApps untuk mendapatkan pasangan `client_id` dan `client_secret`, lalu daftarkan redirect URI Anda. Klien publik seperti konektor MCP dapat mendaftarkan dirinya sendiri (lihat di bawah).

Redirect URI yang terdaftar harus sama persis dengan `redirect_uri` pada permintaan. Kecocokan sebagian atau awalan akan ditolak.

| Metode & Path | Izin | Deskripsi |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Daftar semua klien OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Ambil klien berdasarkan id publiknya (secret disembunyikan) |
| `POST /membership/oauth/clients` | Server.Admin | Buat atau perbarui klien |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Hapus klien |

### Pendaftaran Klien Dinamis

`POST /membership/oauth/register` (publik, RFC 7591) memungkinkan klien seperti konektor MCP claude.ai untuk mendaftarkan dirinya sendiri. Endpoint ini diiklankan oleh dokumen `/.well-known/oauth-authorization-server` pada API. Lihat [Server MCP → Penemuan OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Mengembalikan 201 dengan `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`), dan `token_endpoint_auth_method: "none"`.

- Tidak ada secret yang pernah diterbitkan, sehingga klien harus menggunakan PKCE pada setiap otorisasi.
- `redirect_uris` harus berupa 1–10 URL `https`, atau `http` pada `localhost`, `127.0.0.1`, atau `[::1]`.
- `client_name` dipotong hingga 45 karakter (default "AI assistant").
- Dibatasi 20 pendaftaran per jam per IP.

Pada halaman persetujuan B1Admin, klien yang mendaftarkan dirinya sendiri akan menampilkan pemberitahuan bahwa klien tersebut mendaftar sendiri. Klien ini tidak akan pernah dapat melakukan lebih dari yang dapat dilakukan oleh akun B1 pengguna itu sendiri, dan dapat diputus di **Pengaturan → Developer → Connected Apps**.

## Dukungan SDK

Paket `@churchapps/integration-sdk` membungkus setiap alur OAuth dengan helper bertipe, yaitu `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, dan `.awaitDeviceToken()`. Lihat README paket dan [Webhook](./webhooks#sdk-support) untuk contoh end-to-end.
