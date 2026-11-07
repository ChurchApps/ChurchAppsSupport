---
title: "ChatGPT"
description: "Hubungkan ChatGPT ke data B1 gereja Anda dengan kunci API agar Anda dapat mengajukan pertanyaan dalam bahasa sehari-hari tentang orang, pemberian, dan kehadiran di B1 Admin."
---

# ChatGPT

<div class="article-intro">

Hubungkan ChatGPT ke data B1 gereja Anda dan ajukan pertanyaan dalam bahasa sehari-hari — jawabannya diambil dari catatan gereja Anda yang aktual. Anda juga bisa meminta bantuan untuk hal-hal yang memerlukan beberapa langkah di B1 Admin.

**Beberapa contoh pertanyaan:**
- *"Tampilkan semua orang yang hadir minggu lalu tetapi belum ditugaskan ke kelompok kecil"*
- *"Ringkas persembahan bulan ini berdasarkan dana"*
- *"Siapa anggota baru kami, dan apakah kami sudah menindaklanjuti mereka?"*
- *"Saya tidak tahu cara melakukan X di B1 — bisakah Anda memandu saya?"*

</div>

<div class="prereqs">
<h4>Yang Anda Perlukan</h4>

- **Aplikasi desktop ChatGPT** untuk Mac atau Windows
- **Paket ChatGPT berbayar** (Plus atau yang lebih tinggi). Akun ChatGPT gratis tidak dapat terhubung ke B1.
- **Login B1 Anda** dengan izin untuk mengelola pengaturan gereja (diperlukan untuk membuat kunci). Tidak punya? Tanyakan kepada administrator B1 gereja Anda.

</div>

:::tip Disarankan: coba Claude terlebih dahulu — gratis
[Claude](./claude.md) terhubung ke B1 pada **paket gratisnya** dan dapat diatur dalam kurang dari 3 menit — cukup tambahkan B1 sebagai konektor dan masuk dengan akun B1 Anda. Tidak perlu kunci. Ini cara termudah bagi gereja Anda untuk mencoba AI bersama B1 sebelum membayar apa pun.
:::

## Cara Mengaturnya

Tampilan layar mungkin sedikit berbeda di versi ChatGPT Anda.

---

**Langkah 1 — Buat kunci B1 Anda**

Kunci inilah yang memungkinkan ChatGPT masuk ke B1 *gereja Anda* — anggap seperti kata sandi khusus untuk ChatGPT.

1. Masuk ke [B1 Admin](https://admin.b1.church) lalu buka [Settings → Developer](https://admin.b1.church/settings/developer).
2. Pada tab **API Keys**, klik **New API Key** dan beri nama `ChatGPT`.
3. **Scopes:** centang apa saja yang boleh dilakukan ChatGPT. Setiap area memiliki kotak **read** (hanya melihat) dan kotak **write** (membuat perubahan). Tidak yakin? Untuk permulaan, centang saja kotak **read**.
4. Klik **Save**, lalu **Copy** kunci tersebut (diawali dengan `cak_`). Kunci hanya ditampilkan sekali.

---

**Langkah 2 — Klik nama Anda di pojok kiri bawah ChatGPT**

![Klik nama profil Anda](/img/guides/chatgpt-mcp/01.png)

---

**Langkah 3 — Klik Settings**

![Klik Settings dari menu](/img/guides/chatgpt-mcp/02.png)

---

**Langkah 4 — Klik Plugins di sidebar kiri**

![Klik Plugins di bawah Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Langkah 5 — Klik tab MCPs**

![Klik tab MCPs](/img/guides/chatgpt-mcp/04.png)

Anda akan melihat server MCP yang sudah Anda tambahkan di sini.

---

**Langkah 6 — Klik Add → Add MCP server**

![Klik Add lalu Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Langkah 7 — Isi formulir dan klik Save**

![Formulir Connect to a custom MCP](/img/guides/chatgpt-mcp/07.png)

Klik **Streamable HTTP**, lalu isi:

| Kolom | Yang perlu dimasukkan |
|---|---|
| **Name** | `B1 Church` (atau nama lain yang Anda inginkan) |
| **Type** | Klik **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Biarkan kosong |
| **Headers** | Klik **+ Add header** → Key: `Authorization` → Value: lihat di bawah |

![Contoh formulir terisi, menampilkan Authorization pada Key dan kunci Bearer pada Value](/img/guides/chatgpt-mcp/08.png)

- **Key:** `Authorization`
- **Value:** `Bearer cak_kuncianda` — kata Bearer, spasi, lalu kunci Anda

Klik **Save**.

Selesai! Kembali ke obrolan dan tanyakan sesuatu seperti *"Berapa banyak orang di gereja kita?"*, dan ChatGPT akan mengambil jawabannya langsung dari B1.

---

## Apakah Aman?

- ChatGPT hanya dapat melihat data **gereja Anda**.
- ChatGPT hanya dapat melakukan apa yang diizinkan kunci Anda — kunci dengan kotak **read** saja hanya dapat melihat dan tidak pernah dapat mengubah apa pun.
- Untuk mematikannya, hapus kunci di B1 Admin pada **Settings → Developer**. Akses langsung berhenti.

## Berapa Biayanya?

Koneksi B1 gratis — ini bagian dari ChurchApps. ChatGPT memerlukan paket berbayar (Plus atau yang lebih tinggi) untuk terhubung; lihat harga OpenAI.

## Detail Teknis

Sisa halaman ini ditujukan untuk pengguna teknis dan asisten AI. Server MCP B1 berada di `https://api.churchapps.org/mcp` (Streamable HTTP) dan menerima kunci API sebagai header `Authorization: Bearer cak_…`. Lihat [referensi pengembang MCP Server](/docs/developer/api/mcp).

### Custom GPT dengan Actions

Custom GPT memungkinkan Anda membuat asisten khusus yang dapat digunakan bersama seluruh tim — mereka cukup membuka tautan dan mulai mengajukan pertanyaan tanpa pengaturan apa pun. Fitur ini memerlukan akun ChatGPT Plus, Team, atau Enterprise dan sekitar 10 menit.

#### 1. Buat kunci API

Ikuti Langkah 1 di bagian Cara Mengaturnya di atas jika belum melakukannya.

#### 2. Buat Custom GPT

1. Di ChatGPT, klik profil Anda → **My GPTs** → **Create a GPT**.
2. Beralih ke tab **Configure**, beri nama GPT (misalnya "B1 Assistant") dan tambahkan instruksi:

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Gulir ke **Actions** → **Create new action** → **Authentication**.
   - **Authentication type:** API Key
   - **API Key:** tempel kunci `cak_…` Anda
   - **Auth Type:** Bearer
   - Simpan.

4. Pada kotak **Schema**, tempel spesifikasi OpenAPI awal ini:

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: List people in the church
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Get a single person by id
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: List attendance records
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Simpan action. Uji dengan: *"berapa banyak orang di gereja?"* — ChatGPT memanggil `listPeople` dan memberikan jawabannya.
6. **Publish** GPT (Only me / Anyone with link / Organization) dan bagikan tautannya kepada tim Anda.

#### 3. Gunakan

Siapa pun yang memiliki tautan dapat mengajukan pertanyaan dalam bahasa sehari-hari. Cakupan (scopes) kunci tetap berlaku — kunci hanya-baca menolak penulisan apa pun, terlepas dari isi skema action.

---

### Keamanan dan batasan

- **Isolasi per gereja.** Kunci API hanya terkait dengan satu gereja. ChatGPT tidak dapat melihat data gereja lain.
- **Dibatasi izin.** Kunci hanya membawa cakupan yang Anda berikan. Menghapus cakupan (dengan menghapus dan membuat ulang kunci) memutus akses tersebut pada panggilan berikutnya.
- **Dapat dicabut seketika.** Hapus kunci di **Settings → Developer → API Keys** dan akses langsung berakhir.
- **Berbagi Custom GPT berarti berbagi data.** Setiap orang yang memiliki akses ke GPT dapat melihat apa pun yang diizinkan cakupan kunci. Untuk GPT yang dibagikan secara luas, lebih baik gunakan cakupan yang lebih sempit (misalnya hilangkan `donations:read`).
- **Jejak audit.** Setiap perubahan yang dibuat melalui ChatGPT tercatat dalam log audit yang sama dengan tindakan di B1 Admin — temukan di **Settings → Audit Log**.

### Pemecahan Masalah

**Konektor MCP menampilkan "Unauthorized" atau kesalahan 401:** kunci API Anda hilang atau salah. Buka pengaturan konektor dan periksa header **Authorization**: nilainya harus berupa kata `Bearer`, satu spasi, lalu seluruh kunci `cak_…` tanpa spasi tambahan.

**ChatGPT mengatakan tidak dapat menemukan data tertentu:** kunci mungkin tidak memiliki cakupan yang tepat. Buat kunci baru di **Settings → Developer → API Keys** dengan cakupan tambahan dan perbarui konektor.

**Action Custom GPT mengembalikan 401:** pada panel autentikasi action, pastikan **Auth Type: Bearer** dipilih dan kunci tidak mengandung kata `Bearer` (ChatGPT menambahkannya secara otomatis).

**Action Custom GPT mengembalikan 403:** kunci tidak memiliki cakupan untuk endpoint tersebut. Buat kunci baru dengan cakupan yang benar dan perbarui GPT.

**Skema action ditolak:** ChatGPT memerlukan OpenAPI 3.1 dengan setidaknya satu entri `paths` dan URL `servers`. Validasi YAML di [editor.swagger.io](https://editor.swagger.io) sebelum menempelkannya.

## Terkait

- [API Keys](/docs/developer/api/api-keys) — referensi cakupan lengkap
- [MCP Server (referensi pengembang)](/docs/developer/api/mcp) — detail protokol dan skema tool
- [Claude](./claude.md) — konsep serupa, untuk model Anthropic
- [Referensi REST API](/docs/developer/api/endpoints) — setiap endpoint yang dapat dipanggil oleh action Custom GPT
