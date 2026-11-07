---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) adalah API SMS asal Australia. Layanan ini populer di kalangan gereja-gereja di AU karena menawarkan nomor lokal dan harga yang kompetitif untuk Australia, sementara Clearstream dan Text In Church lebih berorientasi ke AS. Saat ini Mobile Message belum memiliki aplikasi Zapier resmi, tetapi mereka menyediakan REST API publik. Dengan demikian, Anda dapat menghubungkan event B1 ke pesan teks Mobile Message melalui **Webhooks by Zapier** (atau modul HTTP di Make) hanya dalam beberapa menit.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Mobile Message](https://mobilemessage.com.au) dengan Sender ID yang sudah terdaftar dan kredensial API (username + password API di *Account → API Settings*)
- Akun [Zapier](https://zapier.com) (atau [Make](https://www.make.com))
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Dapat Anda Hubungkan

API Mobile Message berbentuk "kirim SMS", tanpa trigger, hanya teks keluar. Jadi semua resep berarah B1 → SMS:

| Arah | Trigger B1 | Hasil |
|---|---|---|
| B1 → Mobile Message | `person.created` | Pesan selamat datang kepada orang baru |
| B1 → Mobile Message | `donation.created` | Pesan ucapan terima kasih kepada donatur |
| B1 → Mobile Message | `form.submission.created` | Menghubungi tim siaga (on-call) |
| B1 → Mobile Message | `event.created` | Siaran pengingat ke daftar penerima |

## Pengaturan

### 1. Buat kunci API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — untuk mendaftarkan webhook trigger
- `people:read` — untuk mencari nomor telepon penerima dari `personId`

### 2. Bangun Zap dengan Webhooks by Zapier

1. **Trigger** — B1.church: pilih event yang Anda inginkan (misalnya New Donation).
2. **Action** — B1.church: Find Person (menggunakan `data.personId`) untuk mendapatkan nomor telepon dan nama.
3. **Action** — Webhooks by Zapier: **POST**. Konfigurasikan seperti di bawah ini.

Pengaturan langkah POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier menambahkannya secara otomatis)
- **Basic Auth** — isi kolom *Basic Auth* dengan `<api_username>|<api_password>` (Zapier akan mengonversinya menjadi header `Authorization: Basic …` yang benar)

Aktifkan Zap-nya. Kirim donasi uji di B1Admin untuk memastikan pesan teks sampai.

## Resep Umum

### Pengingat event pada pagi hari

- **Trigger** — Schedule by Zapier (setiap hari, pukul 7 pagi)
- **Action** — B1.church: Find Events untuk hari ini (atau gunakan langkah Find dengan filter tanggal tetap, atau simpan daftar event hari ini di Google Sheet)
- **Action** — Webhooks by Zapier: POST ke Mobile Message dengan daftar event ke grup pelanggan yang terdaftar

### Gunakan endpoint batch untuk siaran ke daftar

Endpoint `/v1/messages` milik Mobile Message menerima hingga 10.000 pesan per panggilan. Untuk menyiarkan pesan ke grup B1:

- **Trigger** — B1.church: New Form Submission (difilter ke formulir tertentu)
- **Action** — B1.church: List Group Members untuk grup target (melalui langkah *Webhooks by Zapier — GET* pada `/membership/groupmembers?groupId=…`)
- **Action** — Formatter by Zapier → Utilities → Line-itemize untuk mengubah respons menjadi array `messages`
- **Action** — Webhooks by Zapier: POST seluruh array ke `/v1/messages`

### Alternatif Make

Jika Anda lebih suka Make, tambahkan modul **HTTP — Make a request** setelah trigger B1 Watch Events, lalu konfigurasikan dengan cara yang sama (POST, Basic Auth, body JSON). Lihat [ikhtisar Make](../make) untuk sisi B1.

## Batasan & Catatan

- **Basic Auth adalah satu-satunya metode autentikasi.** Mobile Message menerbitkan username dan password dari dashboard. Perlakukan keduanya sebagai rahasia.
- **`sender` harus berupa Sender ID yang terdaftar** di akun Mobile Message Anda, jika tidak pengiriman akan mengembalikan `400 Invalid sender`. Regulasi AU mewajibkan pendaftaran sender.
- **Nomor telepon AU** dapat berupa `0412345678` (lokal) atau `+61412345678` (internasional). API menerima keduanya, tetapi sebaiknya gunakan format `+61…` jika Anda juga mengirim pesan ke luar negeri.
- **Hingga 10.000 pesan per permintaan.** Ini berguna untuk siaran, tetapi satu pengiriman webhook B1 jarang menghasilkan daftar sebesar itu. Simpan endpoint batch untuk Zap massal yang dijadwalkan.

## Pemecahan Masalah

- **POST mengembalikan `401 Unauthorized`**: kredensial Basic Auth salah. Salin ulang dari dashboard Mobile Message di *Account → API Settings*. Perhatikan bahwa username secara default adalah email akun Anda, bukan kunci API terpisah.
- **POST mengembalikan `400 Invalid sender`**: nilai `sender` bukan Sender ID yang terdaftar di akun Anda. Daftarkan Sender ID tersebut di dashboard Mobile Message terlebih dahulu.
- **Teks sampai tetapi terpotong**: Mobile Message memecah pesan yang lebih dari sekitar 160 karakter menjadi beberapa bagian, dan Anda ditagih per bagian. Periksa body respons, karena di sana tertera jumlah bagiannya.

## Lihat Juga

- [Clearstream](./clearstream), [Text In Church](./text-in-church): penyedia SMS alternatif dengan aplikasi Zapier native (tidak memerlukan langkah Webhooks by Zapier)
- [Zapier (ikhtisar)](../zapier): sisi B1 untuk setiap resep Zapier
- [Dokumentasi API Mobile Message](https://mobilemessage.com.au/api-documentation)
