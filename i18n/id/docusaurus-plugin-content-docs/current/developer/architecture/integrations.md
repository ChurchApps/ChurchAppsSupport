---
title: "Integrasi & Permukaan Ekstensi"
description: "Peta semua cara terhubung ke B1 ChurchApps: REST API, kunci API, OAuth, webhook, MCP, dan penyedia konten, dengan tautan ke setiap referensi."
---

# Integrasi & Permukaan Ekstensi

<div class="article-intro">

Semua yang dapat dihubungkan oleh pihak ketiga berjalan melalui satu API dan satu model otorisasi. Halaman ini adalah peta: halaman ini menyebutkan setiap permukaan integrasi, menunjukkan bagaimana permukaan-permukaan tersebut terhubung, dan menautkan ke referensi terperinci untuk masing-masing. Jika Anda membangun aplikasi untuk B1, mulailah di sini untuk memilih pintu yang tepat, lalu ikuti tautan ke halaman yang mendokumentasikannya secara mendalam.

</div>

## Permukaan Sekilas

Ada enam cara masuk dan keluar, dan semuanya berbagi lapisan autentikasi yang sama:

- **[REST API](../api/api-keys.md)** — seluruh permukaan produk, dapat dipanggil dengan bearer token dari bahasa pemrograman apa pun.
- **[API keys](../api/api-keys.md)** — kredensial paling sederhana: token `cak_…` yang terikat pada satu orang di satu gereja.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps.md)** — persetujuan per gereja untuk aplikasi multi-tenant; menerbitkan JWT yang sama dengan yang diterima pengguna.
- **[Webhooks](../api/webhooks.md)** — peristiwa keluar yang ditandatangani dan dikirim secara andal.
- **[MCP server](../api/mcp.md)** — pembungkus untuk AI di atas REST API, di `/mcp`.
- **[Content providers](../freeplay-content-provider.md)** — jalur masuk untuk pustaka media eksternal ke FreePlay dan aplikasi B1.

Semua kecuali content providers dilayani oleh satu API monolitik (repositori [Api](https://github.com/ChurchApps/Api)) yang modul-modulnya dipasang di bawah path dasar yang stabil — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, dan `/mcp`.

## Cara Semuanya Terhubung

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Tiga panah menggambarkan keseluruhan cerita: pihak ketiga **memanggil masuk** dengan bearer token (API key atau OAuth JWT, termasuk melalui `/mcp`); API **memanggil balik ke luar** melalui webhook yang ditandatangani; dan content providers adalah satu-satunya jalur **konten masuk** tempat B1 sendiri bertindak sebagai klien OAuth yang menarik media dari sumber eksternal.

## Model Autentikasi Bersama

Setiap kredensial — JWT login pengguna, token akses OAuth, atau API key — diselesaikan menjadi **`Principal` yang sama** dan diperiksa dengan cara yang sama. Tidak ada jalur autentikasi "integrasi" yang terpisah; kredensial yang dibatasi lingkupnya tampak sama dengan pengguna yang memiliki hak lebih rendah.

### Struktur JWT

Token akses B1 adalah JWT HS256 yang diterbitkan di `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Kumpulan klaimnya:

| Klaim | Arti |
|---|---|
| `id`, `email`, `firstName`, `lastName` | Orang di balik token |
| `churchId` | Satu-satunya gereja tempat token ini bertindak — jangkar untuk semua pembatasan data |
| `personId` | Catatan orang di dalam gereja tersebut |
| `permissions` | Array datar string izin RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Keanggotaan dan kepemimpinan grup, untuk pemeriksaan yang dibatasi grup |
| `membershipStatus` | Tamu atau anggota, untuk pembatasan layanan mandiri |

Token akses OAuth memiliki bentuk yang persis sama dengan JWT login — satu-satunya perbedaan adalah array `permissions`-nya **disaring melalui lingkup yang diberikan sebelum ditandatangani** (`getCombinedApiJwt(...)`).

### Pembatasan per gereja

`churchId` adalah klaim token, bukan parameter permintaan, sehingga kredensial tidak akan pernah dapat menjangkau lintas gereja. Setiap query repositori memfilter berdasarkan `churchId` pemanggil; API key atau token OAuth terikat tepat pada satu gereja saat diterbitkan.

### Izin berbasis peran di batas

Controller membatasi tindakan dengan `au.checkAccess(contentType, action)` terhadap array `permissions` token. Lingkup adalah **filter, bukan pemberi izin** (`Api/src/shared/auth/Scopes.ts`): `SCOPE_CATALOG` memetakan setiap lingkup (misalnya `people:read`, `donations:write`) ke pasangan RBAC yang diizinkannya, dan `filterPermissionsByScopes()` mengirisnya dengan izin *saat ini* milik orang tersebut pada setiap resolusi. Konsekuensinya:

- Mencabut izin di B1Admin langsung memutus akses kredensial pada permintaan berikutnya — token tidak pernah menyimpang dari peran.
- Lingkup hanya dapat *menghapus* izin, sehingga kredensial yang dibatasi lingkupnya tidak pernah dapat naik menjadi administrator server / domain (izin tersebut sengaja tidak dipetakan ke lingkup mana pun).
- API key membawa awalan `cak_`; `CustomAuthProvider.getUser()` bercabang berdasarkan awalan itu, melakukan hash pada secret, dan menyelesaikan ulang RBAC aktif milik pemilik setiap kali dipanggil.

Lihat [API Keys → Scopes](../api/api-keys.md#scopes) untuk katalog lengkapnya.

## Referensi Permukaan

### REST API

Seluruh permukaan produk. Setiap endpoint yang terautentikasi menerima JWT atau API key `cak_…` dalam header `Authorization: Bearer` — tidak ada tabel rute khusus key atau khusus OAuth yang terpisah. Modul dan path dasarnya berada di bawah `Api/src/modules/*`.

### API keys

Personal access token `cak_<prefix>.<secret>`, dibuat di **B1Admin → Settings → Developer → API Keys**. Hanya hash SHA-256 yang disimpan; kunci mentah hanya ditampilkan sekali. Dikelola di `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Paling cocok untuk skrip milik satu gereja dan untuk konektor seperti Zapier, Make, dan Google Sheets. → **[API Keys](../api/api-keys.md)**

### OAuth 2.0 & Connected Apps

Untuk aplikasi multi-tenant yang membutuhkan persetujuan dari setiap gereja. Diimplementasikan di `Api/src/modules/membership/controllers/OAuthController.ts` di bawah `/membership/oauth`. Server mendukung tiga grant:

- **Authorization Code** — `POST /oauth/authorize` (terautentikasi) mengembalikan kode berumur pendek; `POST /oauth/token` dengan `grant_type=authorization_code` menukarnya dengan JWT akses (≈ 7 hari) beserta refresh token (≈ 90 hari). Klien publik (tanpa secret) wajib menggunakan PKCE (hanya `S256`): `code_challenge` pada authorize dan `code_verifier` yang sesuai pada pertukaran token.
- **Device Code** (RFC 8628) — `POST /oauth/device/authorize` menerbitkan `user_code`; pengguna menyetujuinya di B1Admin (`/oauth/device/approve`); perangkat melakukan polling ke `/oauth/token` dengan grant device-code. Untuk TV, kiosk, dan CLI tanpa browser.
- **Refresh Token** — `grant_type=refresh_token` menerbitkan token akses baru; klien publik (tanpa secret) boleh menghilangkan secret.

Klien publik juga dapat mendaftarkan diri sendiri dengan `POST /oauth/register` (dynamic client registration RFC 7591); mereka mendapatkan `client_id` tanpa secret, dan redirect URI mereka harus `https` atau loopback.

**Connected App** adalah tampilan token yang diberikan dari sisi administrator gereja, yang dapat dilihat dan dicabut di `/membership/oauth/connections`. Controller juga menjadi tuan rumah bagi jembatan **relay-session** OAuth (`/oauth/relay/*`) yang memungkinkan perangkat tanpa browser menyelesaikan proses masuk ke penyedia *eksternal*. → **[Connected Apps & OAuth](../api/connected-apps.md)**

### Webhooks

Satu-satunya permukaan keluar. Sebuah gereja berlangganan endpoint HTTPS publik ke peristiwa tertentu; ketika perubahan yang cocok terjadi, `WebhookDispatcher.emit(churchId, event, payload)` memperkaya payload yang hanya berisi id dengan nama tampilan (`personName`, `groupName`, `formName` — pencarian hanya dijalankan setelah sebuah langganan cocok), mencatat pengiriman, dan worker latar belakang mengirimkan envelope JSON yang ditandatangani dengan retry/backoff dan pengiriman ulang. Engine berada di `Api/src/shared/webhooks/`, CRUD per gereja di bawah `/membership/webhooks` (`WebhookController.ts`). Field `connectorType` membentuk ulang body untuk Slack / Discord; konektor `mailchimp` melangkah lebih jauh dan mengelola seluruh pertukaran HTTP (metode/URL/autentikasi per peristiwa terhadap API Mailchimp, kredensial dienkripsi di `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks.md)**

### MCP server

Pembungkus untuk AI di `/mcp` (`Api/src/modules/mcp/`). Tiga alat generik — `list_endpoints`, `describe_endpoint`, `api_call` — mengekspos seluruh REST API secara dinamis ke klien MCP mana pun. Autentikasinya sama dengan bearer token lainnya. Untuk klien yang masuk dengan OAuth (custom connector claude.ai), respons 401 dari `/mcp` membawa header `WWW-Authenticate` yang mengarah ke `/.well-known/oauth-protected-resource`, dan `/.well-known/oauth-authorization-server` mengiklankan endpoint `/membership/oauth`, dynamic registration, PKCE, dan halaman persetujuan `/oauth` di B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` masuk kembali ke stack Express di dalam proses yang sama sehingga setiap aturan izin dan pembatasan gereja tetap berlaku. → **[MCP Server](../api/mcp.md)**

### Content providers

Jalur konten masuk, berada di paket terpisah `Packages/content-providers` (`@churchapps/content-providers`), bukan di API. Setiap provider mengimplementasikan antarmuka `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus hook autentikasi — dan mendaftarkan dirinya sendiri ke registri `Map` (`src/providers/registry.ts`). Di sini **B1 adalah klien OAuth**: provider mendeklarasikan `AuthType` berupa `none`, `oauth_pkce`, `device_flow`, atau `form_login`, dan helper bersama (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) menjalankan alur PKCE / device di sisi klien terhadap sumber eksternal. Saat ini ada sebelas provider — termasuk Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, dan B1.church — yang menyuplai FreePlay dan aplikasi B1. → **[FreePlay Content Provider](../freeplay-content-provider.md)**

**Year plans** berjalan melalui jalur ini. Penerbit kurikulum (dengan `lessons.edit`) memelihara urutan berurutan minggu-1/2/3 di admin Lessons.church (tabel `LessonsApi` `yearPlans` / `yearPlanWeeks`, dengan `startMonth` opsional dan `anchor` per minggu berupa `easter` / `christmas`); `GET /yearPlans/public` di LessonsApi menyajikan rencana aktif secara anonim, dengan mengisi program/studi/tempat setiap minggu dari pohon pelajaran. **Serving → Plans → Schedule Lesson → Apply Year Plan** di B1Admin menggunakan endpoint tersebut dan menulis satu rencana DoingApi untuk setiap minggu yang disertakan (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Rencana dengan `startMonth` menyelesaikan minggu yang terikat (anchor) terhadap tahun yang dipilih (Paskah melalui komputus Gregorian, Natal sebagai hari Minggu pada atau sebelum 25 Desember) dan mengisi rentang di antaranya; rencana tanpa `startMonth` tetap memetakan minggu ke-N ke `startDate + (N−1)×7` hari. Minggu dari provider OLF eksternal atau dengan path yang tidak lengkap dilewati saat penerapan; gereja mengedit rencana yang dihasilkan seperti rencana lainnya, dan FreePlay memutar apa pun yang ada di rencana tersebut.

## Ringkasan

| Permukaan | Mekanisme autentikasi | Arah | Tempat diimplementasikan | Referensi |
|---|---|---|---|---|
| REST API | JWT `Bearer` atau key `cak_…` | Masuk | `Api/src/modules/*` | [API Keys](../api/api-keys.md) |
| API keys | Token `cak_` yang di-hash SHA-256 | Kredensial | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys.md) |
| OAuth 2.0 / Connected Apps | Auth code (PKCE) · device · refresh → JWT; dynamic client registration | Masuk | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps.md) |
| Webhooks | Secret per hook, tanda tangan HMAC-SHA256 | Keluar | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks.md) |
| MCP server | JWT `Bearer`, JWT OAuth (ditemukan melalui `/.well-known`), atau key `cak_…` | Masuk (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp.md) |
| Content providers | Per provider: none / OAuth PKCE / device / form | Masuk (konten) | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider.md) |

## Konektor Siap Pakai

Daripada semua orang membangun dari nol, ChurchApps menyediakan konektor di atas permukaan-permukaan di atas:

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — `connectorType` webhook membentuk ulang envelope standar menjadi pesan obrolan; dikonfigurasi sepenuhnya di B1Admin, tanpa akun pihak ketiga.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — `connectorType` `mailchimp` yang menyinkronkan orang ke audiens Mailchimp dan memetakan keanggotaan grup/daftar ke tag (`Api/src/shared/webhooks/MailchimpConnector.ts`). Berbeda dengan konektor obrolan, konektor ini membuat permintaan terautentikasi sendiri untuk setiap peristiwa (upsert/archive/tag) alih-alih mengirim POST ke URL yang disediakan gereja; API key dan id audiens disimpan terenkripsi di `webhooks.connectorConfig`. Satu arah, hanya field merge standar.
- **[Zapier](/docs/b1-admin/integrations/zapier)** dan **[Make](/docs/b1-admin/integrations/make)** — dipicu oleh peristiwa webhook dan bertindak melalui REST API; keduanya mendaftarkan webhook mereka sendiri saat Zap/scenario diaktifkan (membutuhkan key dengan `settings:write`). Kode sumber aplikasi Zapier berada di repositori `Integrations` di bawah `zapier/` (Zapier CLI, di-deploy dengan `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — add-on yang diautentikasi dengan API key, mengekspor People / Donations / Groups / Attendance sesuai permintaan.
- **[Claude](/docs/b1-admin/integrations/claude)** dan **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — klien MCP yang diarahkan ke `/mcp`.

Untuk kode Anda sendiri, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) membungkus semuanya: klien REST bertipe, klien OAuth (auth-code / refresh / device flow), dan verifikator webhook HMAC dengan middleware Express.

## Halaman Terkait

- [API Keys](../api/api-keys.md) — kredensial paling sederhana dan katalog lingkup
- [Connected Apps & OAuth](../api/connected-apps.md) — alur persetujuan multi-tenant
- [Webhooks](../api/webhooks.md) — sistem peristiwa keluar
- [MCP Server](../api/mcp.md) — pembungkus integrasi AI
- [FreePlay Content Provider](../freeplay-content-provider.md) — menjadi sumber konten masuk
- [Integrasi (pengguna akhir)](/docs/b1-admin/integrations/) — panduan penyiapan konektor siap pakai
