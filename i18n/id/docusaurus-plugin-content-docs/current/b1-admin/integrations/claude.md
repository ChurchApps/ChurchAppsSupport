---
title: "Claude"
description: "Hubungkan B1 Admin ke Claude agar Anda dapat bertanya tentang kehadiran, pemberian, dan grup dalam bahasa sehari-hari, dengan opsi masuk dan opsi kunci dengan izin terbatas."
---

# Claude

<div class="article-intro">

Tanyakan Claude tentang gereja Anda dalam bahasa sehari-hari, dan ia akan menjawab berdasarkan data B1 Anda, termasuk pelajaran dan kelas FreePlay Anda. Pertanyaan seperti *"berapa banyak pengunjung pertama kali yang datang pada hari Minggu?"* atau *"siapa yang bergabung dengan kelompok kecil bulan ini?"*, atau minta Claude melakukan sesuatu, seperti *"tambahkan halaman baru di situs web kami bernama Acara."* Pengaturannya memakan waktu kurang dari 3 menit dan Anda tidak perlu keahlian teknis atau perangkat lunak tambahan untuk memasangnya.

</div>

<div class="prereqs">
<h4>Yang Anda Perlukan</h4>

- **Akun Claude.** **Paket gratis bisa digunakan**, dan ini cara yang baik untuk mencobanya. Akun gratis memiliki batas pesan harian, namun mencari informasi di B1 menggunakan pesan dengan cepat, jadi jika Anda menggunakannya secara rutin, kami menyarankan **Claude Pro** (sekitar $20/bulan).
- **Login B1 Anda**, yaitu login yang sama dengan yang Anda gunakan untuk B1 Admin.

</div>

:::tip Direkomendasikan — gratis untuk dicoba
Claude adalah cara termudah untuk menghubungkan B1 dengan AI, dan tersedia di **paket gratis** Claude. Ini cara yang tepat bagi gereja Anda untuk mencobanya sebelum membayar apa pun.
:::

Ada dua cara untuk menghubungkan. **Opsi 1 adalah yang paling mudah**, tanpa kunci dan tanpa perlu memasang apa pun.

## Opsi 1 — Masuk dengan B1 (paling mudah)

Berfungsi di situs web Claude, aplikasi desktop Claude, dan aplikasi ponsel Claude. Atur sekali saja dan itu akan berlaku di semuanya.

### Langkah 1 — Buka pengaturan konektor Claude

1. Buka [claude.ai](https://claude.ai) dan masuk (atau buat akun gratis).
2. Klik nama Anda di pojok kiri bawah, lalu pilih **Settings** → **Connectors**.

### Langkah 2 — Tambahkan B1

1. Klik **Add**, lalu **Add custom connector**.
2. **Name:** ketik `B1`.
3. **URL:** tempel `https://api.churchapps.org/mcp`
4. Biarkan opsi lainnya seperti semula dan klik **Add**.

### Langkah 3 — Masuk ke B1

1. Klik **Connect**. Halaman masuk B1 akan terbuka.
2. Masuk dengan akun B1 Anda. Jika Anda tergabung di lebih dari satu gereja, pastikan gereja yang benar ditampilkan di bagian atas.
3. B1 menampilkan apa saja yang diminta Claude untuk dilakukan dan mengonfirmasi bahwa Anda akan dikembalikan ke **claude.ai**. Klik **Allow**.

Anda kembali ke Claude, dan B1 ditampilkan sebagai terhubung.

### Langkah 4 — Ajukan sebuah pertanyaan

Mulai **chat baru** dan coba:

- *"Berapa banyak orang di gereja kami?"*
- *"Tampilkan daftar kelompok aktif kami."*
- *"Ringkas persembahan bulan ini berdasarkan dana."*
- *"Siapa yang bergabung dengan gereja dalam 30 hari terakhir?"*

Pertama kali, Claude akan meminta izin untuk menggunakan B1. Klik **Allow**.

## Opsi 2 — Ekstensi desktop dengan kunci B1

Gunakan opsi ini jika Anda lebih memilih memberi Claude kunci dengan izin terbatas (misalnya, hanya lihat). Ini berfungsi di aplikasi desktop Claude untuk Mac atau Windows, dan Anda memerlukan izin untuk mengelola pengaturan gereja di B1 untuk membuat kunci.

### Langkah 1 — Dapatkan aplikasi Claude

Unduh aplikasi Claude dari [claude.com/download](https://claude.com/download), pasang, buka, dan masuk.

### Langkah 2 — Buat kunci B1 Anda

Kunci ini memungkinkan Claude masuk ke B1 *gereja Anda*. Anggap saja seperti kata sandi khusus untuk Claude.

1. Masuk ke [B1 Admin](https://admin.b1.church) dan buka [Settings → Developer](https://admin.b1.church/settings/developer).
2. Di tab **API Keys**, klik **New API Key**.
3. **Name:** ketik `Claude`.
4. **Scopes:** centang apa saja yang boleh dilakukan Claude. Setiap area memiliki kotak **read** (hanya lihat) dan kotak **write** (membuat perubahan). Belum yakin? Centang hanya kotak **read** untuk memulai. Anda bisa membuat kunci baru dengan izin lebih banyak nanti.
5. Klik **Save**, lalu **Copy** kuncinya. Kunci hanya ditampilkan sekali, jadi langsung lanjut ke Langkah 3.

### Langkah 3 — Tambahkan B1 ke Claude

1. [Unduh ekstensi B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Klik dua kali** berkas yang diunduh (`b1-churchapps.mcpb`). Claude akan terbuka dan menampilkan **B1 (ChurchApps)**.
3. Klik **Install**.
4. Saat diminta **B1 API key**, tempel kunci dari Langkah 2 dan simpan.
5. **Tutup Claude sepenuhnya** (Mac: **Cmd+Q** · Windows: klik kanan ikon Claude di taskbar → **Quit**), lalu buka kembali.

Jika mengklik dua kali tidak membuka Claude, buka **Settings → Extensions → Advanced settings → Install Extension…** di Claude dan pilih berkas yang diunduh. Lalu mulai chat baru dan ajukan sebuah pertanyaan.

:::tip Ekstensi sudah terpasang?
Tidak perlu melakukan apa pun. FreePlay berfungsi melalui koneksi yang sama. Satu-satunya pengecualian adalah versi 1.1.0, yang meminta email dan kata sandi B1: unduh dan pasang ulang ekstensi untuk memperbaruinya. Kunci Anda tetap berlaku.
:::

## Apakah Aman?

- Claude hanya dapat melihat data **gereja Anda**.
- **Dengan masuk (Opsi 1):** Claude tidak pernah bisa melakukan lebih dari yang bisa dilakukan login B1 Anda sendiri. Halaman masuk B1 menampilkan semua yang boleh dilakukan Claude sebelum Anda mengklik **Allow**.
- **Dengan kunci (Opsi 2):** Claude hanya bisa melakukan apa yang diizinkan kunci di B1. Kunci dengan kotak **read** saja hanya dapat melihat dan tidak pernah bisa mengubah apa pun. FreePlay bekerja dengan cara yang sama, di bawah kunci yang sama.
- **Untuk menonaktifkannya:** di B1 Admin buka **Settings → Developer** dan cabut aplikasi di bawah **Connected Apps** (Opsi 1) atau hapus kunci di bawah **API Keys** (Opsi 2). Akses langsung berhenti. Anda juga bisa mengklik **Disconnect** pada konektor B1 di Claude.

## Berapa Biayanya?

Koneksi B1 gratis karena merupakan bagian dari ChurchApps. Claude sendiri memiliki paket gratis. Claude Pro (sekitar $20/bulan) memberi Anda penggunaan yang jauh lebih banyak. Lihat [claude.com/pricing](https://claude.com/pricing).

## Detail Teknis

Sisa halaman ini ditujukan untuk pengguna teknis dan asisten AI: izin (scopes), cara lain untuk terhubung, dan cara kerjanya.

### Izin (Scopes)

Claude berkomunikasi dengan B1 melalui **Model Context Protocol (MCP) server** yang terpasang di API B1 (`https://api.churchapps.org/mcp`). Setiap panggilan melewati aturan autentikasi, izin, dan cakupan gereja yang sama dengan permintaan dari B1 Admin. Claude dibatasi pada **izin dan scope** kunci API, dan tidak dapat mengakses webhook, endpoint admin OAuth, atau jalur khusus operator lainnya.

Kumpulan scope awal yang umum:

- **Asisten hanya-baca:** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Baca + tambah catatan / tugas:** tambahkan `people:write`
- **Asisten operasional penuh:** tambahkan scope `:write` yang sesuai dengan yang Anda inginkan

Kunci `donations:read` memungkinkan Claude merangkum persembahan tetapi tidak dapat mencatat persembahan. Kunci `people:write` dapat menambahkan orang tetapi tidak dapat melihat persembahan. Lihat [API Keys](/docs/developer/api/api-keys) untuk mengetahui apa yang diizinkan setiap scope.

### Cara lain untuk terhubung

#### Claude Code (CLI)

Di terminal:

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

Selesai. Di dalam sesi Claude Code mana pun, ketik `/mcp` untuk memastikan server `b1` terhubung, lalu ajukan pertanyaan apa pun tentang gereja Anda.

#### Claude Desktop — konfigurasi manual (lanjutan)

Jika Anda tidak ingin menggunakan ekstensi, ubah berkas konfigurasi Claude Desktop:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

Tambahkan entri server `b1` yang terhubung ke B1 melalui `mcp-remote` (memerlukan [Node.js](https://nodejs.org)):

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Mulai ulang Claude Desktop. Menu konektor di kolom chat akan menampilkan `b1` beserta alatnya.

#### Claude.ai (web) — Custom Connector

Lihat **Opsi 1** di atas. Konektor menggunakan OAuth 2.1: Claude menemukan server otorisasi B1 dari `https://api.churchapps.org/.well-known/oauth-protected-resource`, mendaftarkan dirinya sendiri dengan Dynamic Client Registration, dan masuk dengan PKCE. Pada paket Team dan Enterprise, pemilik mungkin perlu menambahkan konektor untuk organisasi terlebih dahulu. Claude tidak meminta scope tertentu, jadi halaman persetujuan menawarkan semua yang dapat diakses akun B1 yang sedang masuk. Cabut akses di **Settings → Developer → Connected Apps** di B1 Admin.

### Cara kerjanya

API B1 menyediakan satu endpoint MCP di `/mcp`. Claude terhubung ke sana, mengautentikasi dengan kunci `cak_…` Anda, dan mendapatkan akses ke empat alat:

| Alat | Fungsinya |
|---|---|
| `list_endpoints` | Menampilkan daftar endpoint REST yang dapat dipanggil Claude, dapat difilter berdasarkan path. Digunakan untuk penelusuran. |
| `describe_endpoint` | Mengembalikan ringkasan singkat dan contoh permintaan/respons untuk endpoint tertentu. |
| `api_call` | Benar-benar memanggil endpoint REST sebagai pengguna yang terautentikasi. |
| `describe_page_builder` | Panduan untuk membuat dan mengedit halaman situs web gereja Anda, yang dibaca Claude sebelum mengerjakan konten situs web. |

Ini adalah antarmuka yang sama seperti `/membership/people`, `/giving/donations`, `/attendance/visits`, dan lainnya yang digunakan B1 Admin Anda. Setiap aturan otorisasi berlaku sama persis. Endpoint FreePlay (lessons.church) tercantum di bawah `/lessons/*`. Panggilan Claude ke sana diteruskan ke FreePlay sebagai pengguna yang sama, dengan izin yang sama.

### Keamanan dan batasan

- **Isolasi per gereja.** Kunci API hanya terhubung ke satu gereja. Claude tidak memiliki cara untuk melihat data gereja lain.
- **Dibatasi izin.** Jika Anda menghapus izin dari orang yang membuat kunci di B1Admin, Claude kehilangan izin tersebut pada panggilan berikutnya, seketika.
- **Dapat dicabut.** Hapus kunci di **Settings → Developer → API Keys** dan akses Claude langsung berakhir.
- **Daftar blokir.** Webhook penyedia, endpoint admin klien OAuth, dan rute `apiEmails` khusus operator tidak dapat dipanggil melalui MCP.
- **Batas ukuran respons.** Satu respons alat dibatasi 64 KB agar daftar panjang tidak memenuhi konteks Claude. Claude akan mempersempit kueri dengan filter jika hal ini terjadi.
- **Jejak audit.** Perubahan data melewati log audit yang sama dengan tindakan B1Admin. Anda dapat meninjaunya di **Settings → Audit Log**.

### Pemecahan masalah

**Claude meminta email dan kata sandi B1 untuk menggunakan FreePlay:** Anda menggunakan versi 1.1.0 dari ekstensi desktop. Unduh dan pasang ulang untuk memperbarui. Versi yang lebih baru hanya menggunakan kunci Anda.

**Claude melaporkan "Unauthorized" atau 401:** bearer token hilang, rusak, atau kunci telah dicabut. Jika Anda menggunakan ekstensi, buka **Settings → Extensions → B1 (ChurchApps)** di Claude dan tempel kembali kuncinya. Jika tidak, periksa ulang header `Authorization: Bearer cak_…` (perhatikan spasi dan kata `Bearer` secara harfiah).

**Panggilan alat mengembalikan 403:** kunci API tidak memiliki scope untuk endpoint tersebut. Tambahkan scope di **Settings → Developer → API Keys** (Anda perlu membuat kunci baru karena scope tidak dapat diubah langsung), lalu tempel kunci baru di pengaturan ekstensi atau konfigurasi Claude.

**Claude tidak dapat menemukan endpoint:** minta Claude memanggil `list_endpoints` dengan filter, misalnya *"gunakan list_endpoints dengan filter 'donations' untuk menemukan path yang tepat"*. Daftar rute dibuat dari API yang sedang berjalan, jadi apa pun yang bisa Anda akses dengan `curl` pasti ada di sana.

**Pengembangan lokal:** ganti `https://api.churchapps.org/mcp` dengan `http://localhost:8084/mcp`. Autentikasi dan alatnya sama.

## Terkait

- [API Keys](/docs/developer/api/api-keys): referensi lengkap scope
- [MCP Server (referensi developer)](/docs/developer/api/mcp): detail protokol dan skema alat
- [ChatGPT](./chatgpt.md): ide yang sama, untuk model OpenAI
