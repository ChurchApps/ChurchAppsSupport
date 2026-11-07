---
title: "Server MCP"
description: "Atur akses MCP ke API B1 agar klien AI seperti Claude Code, Cursor, atau Claude Desktop dapat memanggil endpoint data gereja dengan kunci API atau masuk OAuth."
---

# Server MCP

<div class="article-intro">

API B1 menyediakan server [MCP (Model Context Protocol)](https://modelcontextprotocol.io) di `/mcp`. Klien AI apa pun yang mendukung MCP, seperti konektor kustom claude.ai, Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, atau klien buatan Anda sendiri, dapat terhubung ke server ini dan memanggil REST API yang mendasarinya atas nama pengguna gereja yang sudah terautentikasi. Ini adalah pembungkus yang ringan dan generik: tiga alat generik mengekspos seluruh permukaan API secara dinamis, alih-alih memodelkan setiap endpoint secara manual, ditambah satu alat panduan domain untuk pembuat situs web.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- [Kunci API B1](./api-keys.md) (`cak_…`) dengan scope yang dibutuhkan klien, atau klien MCP yang dapat masuk dengan OAuth (lihat [Penemuan OAuth](#oauth-discovery))
- Host API B1 yang dapat dijangkau, yaitu `https://api.churchapps.org` untuk gereja yang di-host, atau deployment Anda sendiri
- Klien MCP. Lihat [Claude](/docs/b1-admin/integrations/claude) dan [ChatGPT](/docs/b1-admin/integrations/chatgpt) untuk panduan pengaturan pengguna akhir

</div>

## Endpoint

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspek | Nilai |
|---|---|
| **Path** | `/mcp` (relatif terhadap host API) |
| **Method** | Hanya `POST`. Permintaan/respons dan streaming SSE sama-sama terjadi pada endpoint yang sama |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Model sesi** | Stateless. Instance server MCP baru dibuat untuk setiap permintaan, tanpa session id dan tanpa resumption |
| **Autentikasi** | Bearer token. Kunci API `cak_…` dan JWT B1 (termasuk access token OAuth) sama-sama berfungsi; proses resolusinya sama dengan endpoint terautentikasi lainnya |

Permintaan yang header `Authorization`-nya tidak ada atau tidak valid akan mengembalikan:

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

dengan HTTP 401 dan header `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`. Klien yang mendukung OAuth akan mengikuti header ini untuk memulai proses masuk.

Pada API yang di-host (produksi dan demo), `/mcp` dilayani melalui API Gateway HTTP API, bukan REST API yang digunakan untuk endpoint lainnya. REST API mengganti nama `WWW-Authenticate` menjadi `x-amzn-remapped-www-authenticate` pada respons proxy Lambda. Akibatnya, klien seperti ChatGPT hanya menerima 401 tanpa challenge yang bisa dipakai untuk memulai masuk. HTTP API meneruskan header ini tanpa perubahan.

## Alat

Tiga alat generik dan satu panduan. Model menggunakan `list_endpoints` untuk penemuan, `describe_endpoint` untuk mempelajari bentuk payload, `api_call` untuk benar-benar memanggil API, dan `describe_page_builder` ketika tugas berkaitan dengan konten situs web.

### `list_endpoints`

Mengembalikan inventaris lengkap rute REST yang terdaftar, yang dapat difilter dengan substring dan/atau kata kerja HTTP opsional. Setiap entri mencakup nama controller dan scope kunci API yang kemungkinan besar dibutuhkan.

**Input:**

| Field | Tipe | Deskripsi |
|---|---|---|
| `filter` | string (opsional) | Substring tidak peka huruf besar/kecil yang dicocokkan dengan path, misalnya `"people"` |
| `method` | enum (opsional) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Output:** dokumen JSON dengan bentuk berikut:

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

Inventaris dibangun sekali saat API dimulai, dari tabel rute yang sedang berjalan. Semua yang bisa diakses dengan `curl` akan muncul di sini.

### `describe_endpoint`

Mengembalikan ringkasan singkat dan, jika tersedia, contoh isi permintaan dan respons yang disusun secara manual untuk satu endpoint.

**Input:**

| Field | Tipe | Deskripsi |
|---|---|---|
| `method` | string | Kata kerja HTTP |
| `path` | string | Path lengkap seperti yang dikembalikan oleh `list_endpoints` |

**Output:** untuk endpoint yang memiliki contoh, berupa contoh dengan `summary`, `requestBody`, dan `responseSample`. Untuk endpoint tanpa contoh, berupa pesan cadangan yang menginstruksikan model untuk memanggil `GET` terlebih dahulu guna melihat bentuk datanya. Sekitar selusin rute yang sering dipakai (people, groups, donations, attendance, funds) sudah memiliki contoh.

### `api_call`

Memanggil endpoint REST yang dipilih, di dalam proses yang sama, melalui tumpukan middleware Express yang sama dengan permintaan HTTP biasa. Autentikasi, parsing body, audit log, dan pembatasan per gereja tetap berlaku.

**Input:**

| Field | Tipe | Deskripsi |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Path termasuk prefiks modul, misalnya `/membership/people` |
| `query` | object (opsional) | Objek datar berisi parameter query string |
| `body` | any (opsional) | Body permintaan JSON, biasanya berupa array objek model untuk `POST` |

**Output:**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Hasil alat ditandai `isError: true` untuk setiap respons dengan status ≥ 400.

### `describe_page_builder`

Satu-satunya alat non-generik: panduan statis yang berdiri sendiri untuk membangun halaman situs web melalui endpoint `/content/*`. Isinya mencakup model data Page → Section → Element, alur pembuatan, setiap `elementType` beserta bentuk `answersJSON`-nya, pengaturan tingkat section seperti pembagi bentuk `dividerTop`/`dividerBottom`, dan contoh lengkap dari awal hingga akhir. Alat ini tidak menerima input dan mencerminkan katalog elemen yang dikelola di editor B1Admin (lihat [Arsitektur Website Builder](../architecture/website-builder.md)). Agen diharapkan memanggilnya sekali sebelum membuat atau mengedit konten halaman, lalu bertindak melalui `api_call`.

## Model Autentikasi

Permintaan MCP itu sendiri dijalankan melalui `CustomAuthProvider.getUser()`, jalur yang sama dengan yang digunakan setiap endpoint B1 yang terautentikasi. Bearer `cak_…` akan di-resolve menjadi `Principal` yang izinannya merupakan RBAC terkini dari orang yang menerbitkan kunci, **diirisankan** dengan scope yang diberikan kepada kunci tersebut. Irisan ini dihitung ulang pada setiap permintaan, sehingga:

- Menghapus scope dari sebuah kunci (dengan menghapus lalu membuatnya ulang) akan memutus akses pada panggilan berikutnya.
- Menghapus izin dari orang yang bersangkutan di B1Admin akan memutus akses pada panggilan berikutnya, meskipun kuncinya masih ada.

Untuk pemanggilan `api_call` bersarang, header `Authorization` asli disalin ke permintaan sintetis, sehingga `CustomAuthProvider` berjalan lagi dan irisan scope diterapkan ulang pada setiap panggilan. Tidak ada caching token.

## Daftar Blokir Path

Sejumlah kecil rute tidak dapat diakses melalui `api_call`, bahkan dengan kunci yang valid:

| Pola | Alasan |
|---|---|
| `/giving/donate/webhook/*` | Endpoint webhook penyedia mengharapkan body mentah yang sudah diverifikasi tanda tangannya dari Stripe/PayPal, bukan dari pemanggil umum |
| `/membership/oauth/clients*` | Pendaftaran klien OAuth hanya untuk operator |
| `/membership/people/apiEmails` | Dibatasi oleh `jwtSecret` operator, bukan oleh izin pengguna |
| Rute apa pun yang membutuhkan `multipart/form-data` | Unggahan file tidak cocok dengan pola JSON-RPC |

Path yang diblokir akan mengembalikan hasil alat `isError: true` dengan pesan deskriptif, dan rute yang mendasarinya tidak pernah dipanggil.

## Batas Ukuran Respons

Body respons setiap `api_call` dibatasi hingga **64 KB** output yang ditangkap. Jika sebuah query melebihi batas ini, respons akan memuat `"truncated": true` dan model diharapkan mencoba lagi dengan parameter query yang lebih sempit. Ini mencegah satu respons alat membanjiri jendela konteks klien.

## Pembatasan Laju

Tidak ada pembatasan laju di tingkat aplikasi pada `/mcp`. Pengendalian lalu lintas diserahkan ke konkurensi API Gateway / Lambda di produksi, dan ke reverse proxy Anda pada deployment yang di-host sendiri.

## Penemuan OAuth

Server MCP menyiarkan metadata OAuth 2.1 agar klien yang hanya terhubung ke server yang ditemukan melalui OAuth, terutama UI "Add custom connector" di Claude.ai, dapat memasukkan pengguna tanpa kunci yang ditempel. `/mcp` adalah protected resource, [penyedia OAuth](./connected-apps.md) yang ada di bawah `/membership/oauth` adalah authorization server-nya, dan halaman `/oauth` di B1Admin adalah layar persetujuannya.

| Endpoint | Tujuan |
|---|---|
| `GET /.well-known/oauth-protected-resource` (juga `/.well-known/oauth-protected-resource/mcp`) | Metadata protected resource (RFC 9728): `resource` berisi `<api>/mcp`, `authorization_servers` berisi root API, `scopes_supported` mencantumkan setiap [scope kunci API](./api-keys.md#scopes) |
| `GET /.well-known/oauth-authorization-server` | Metadata authorization server (RFC 8414): `authorization_endpoint` adalah `/oauth` di B1Admin, `token_endpoint` adalah `/membership/oauth/token`, `registration_endpoint` adalah `/membership/oauth/register` |
| `POST /membership/oauth/register` | Registrasi klien dinamis (RFC 7591) |

Alur yang dijalankan klien seperti claude.ai:

1. `POST /mcp` tanpa token mengembalikan 401 dengan header `WWW-Authenticate` yang mengarah ke metadata protected resource.
2. Klien membaca kedua dokumen metadata, lalu mendaftarkan dirinya dengan `POST /membership/oauth/register`, dengan mengirimkan `client_name`, `redirect_uris`, dan secara opsional `scope`. Setiap klien yang mendaftar sendiri adalah klien **publik**: tidak ada secret yang diterbitkan dan respons memuat `token_endpoint_auth_method: "none"`. Redirect URI harus `https`, atau `http` pada alamat loopback (`localhost`, `127.0.0.1`, `[::1]`); maksimal 10 per klien. Pendaftaran dibatasi 20 per jam per IP.
3. Pengguna dikirim ke `/oauth` di B1Admin dengan `code_challenge` dan `code_challenge_method=S256`. Halaman persetujuan mencantumkan setiap scope yang diminta dengan bahasa sederhana (atau "Semua yang dapat diakses akun B1 Anda" jika tidak ada scope yang diminta), menampilkan host tempat pengguna akan dikembalikan, dan memberi tahu jika aplikasi mendaftarkan dirinya sendiri. Pengguna mengklik **Izinkan**.
4. Klien menukar kode di `/membership/oauth/token` dengan `grant_type=authorization_code` dan `code_verifier`-nya, lalu nanti memperbarui token dengan `grant_type=refresh_token`. Body yang dikodekan form maupun JSON sama-sama diterima.
5. Access token yang dihasilkan adalah JWT B1 yang sudah di-scope, dan digunakan sebagai bearer pada `/mcp`.

Aturan PKCE: hanya `S256` yang diterima. Klien tanpa secret wajib mengirimkan `code_challenge` saat otorisasi dan `code_verifier` yang sesuai saat pertukaran token. Klien confidential (yang memiliki secret) tetap boleh menggunakan secret saja. Redirect URI harus cocok persis dengan URI yang terdaftar.

Klien yang menerima bearer token statis dalam konfigurasinya, seperti Claude Code, Claude Desktop, OpenAI Agents SDK, Cursor, dan kode kustom, tetap dapat menggunakan kunci `cak_…`.

## Pengembangan Lokal

Endpoint MCP dipasang bersama layanan lainnya ketika API dijalankan secara lokal:

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Saat startup, baris log `📡 MCP server ready at /mcp — N routes in inventory` mengonfirmasi bahwa inventaris telah dibangun.

Uji dengan MCP Inspector:

```bash
npx @modelcontextprotocol/inspector
```

Di UI Inspector, arahkan ke `http://localhost:8084/mcp` dan atur header `Authorization` menjadi `Bearer cak_<prefix>.<secret>`. Panggil `list_endpoints` terlebih dahulu; Anda akan melihat daftar rute lengkap. Kemudian `api_call({ method: "GET", path: "/membership/people" })` seharusnya mengembalikan data orang dari seed lokal Anda.

## Tata Letak Kode

Server MCP berada di `src/modules/mcp/` pada repositori Api. Berkas-berkas penting:

| Berkas | Tujuan |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; memasang `StreamableHTTPServerTransport` untuk setiap permintaan dan mengirim challenge `WWW-Authenticate` pada respons 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Menyajikan dokumen penemuan OAuth `/.well-known` |
| `McpServer.ts` | Membangun `Server` MCP dan mendaftarkan keempat alat |
| `RouteInventory.ts` | Menelusuri metadata inversify-express-utils saat startup untuk mendata rute |
| `internalDispatch.ts` | `req`/`res` sintetis yang memasuki kembali aplikasi Express di dalam proses yang sama |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Contoh permintaan/respons yang disusun untuk endpoint yang sering dipakai |

## Terkait

- [Kunci API](./api-keys.md)
- [Webhook](./webhooks.md)
- [Aplikasi Terhubung (OAuth)](./connected-apps.md)
- [Claude: panduan pengaturan pengguna akhir](/docs/b1-admin/integrations/claude)
- [ChatGPT: panduan pengaturan pengguna akhir](/docs/b1-admin/integrations/chatgpt)
