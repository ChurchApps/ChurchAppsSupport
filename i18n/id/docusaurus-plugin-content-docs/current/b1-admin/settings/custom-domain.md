---
title: "Domain Kustom"
description: "Arahkan domain Anda sendiri, misalnya www.gerejaanda.org, ke situs B1 Anda di B1 Admin dengan mengatur rekaman DNS dan menambahkan domain di Pengaturan."
---

# Domain Kustom

<div class="article-intro">

Anda dapat mengarahkan domain Anda sendiri (misalnya **`www.gerejaanda.org`**) ke situs B1 Anda sehingga pengunjung dapat mengakses situs gereja Anda melalui alamat web asli gereja, bukan alamat default gerejaanda.b1.church.

</div>

## Video Pelatihan

<YouTube id="L5yaDusHts8" title="Menghubungkan Domain Kustom di B1" next="Menyiapkan Siaran Langsung di B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Langkah 1 — Tambahkan Catatan DNS Terlebih Dahulu

Sebelum menambahkan domain Anda di B1, Anda perlu mengarahkannya ke server B1 melalui registrar domain Anda (GoDaddy, Namecheap, Cloudflare, dan sebagainya).

Tambahkan salah satu catatan berikut — CNAME lebih disarankan:

| Tipe | Host | Nilai |
|------|------|-------|
| CNAME | `www` | `proxy.b1.church` |
| A | `gerejaanda.org` | `3.23.251.61` |

Gunakan **CNAME** untuk alamat `www` Anda. Gunakan **catatan A** jika registrar Anda tidak mendukung CNAME pada domain root/apex (tanpa www), atau jika Anda juga ingin domain root berfungsi.

Perubahan DNS dapat memakan waktu beberapa menit hingga beberapa jam untuk berlaku.

## Langkah 2 — Tambahkan Domain di B1

Setelah DNS mengarah ke B1:

1. Buka **Settings** di B1 Admin.
2. Klik **Domains** di daftar sebelah kiri, lalu klik **Edit** pada bagian **Domains**.
3. Ketik domain Anda di kolom dan klik **Save**.

Anda tidak perlu mengklik tombol **+** terlebih dahulu — domain yang sudah diketik di kolom akan ditambahkan saat Anda menyimpan. Gunakan **+** (atau tekan **Enter**) jika Anda ingin menambahkan beberapa domain ke dalam daftar sebelum menyimpan.

B1 menangani SSL secara otomatis — tidak perlu membeli sertifikat.

:::warning
Jika Anda menambahkan domain di B1 sebelum catatan DNS Anda terpasang, domain tidak akan tersimpan. Selalu siapkan DNS terlebih dahulu.
:::

## Memeriksa Apakah Sudah Berfungsi

Setelah menyimpan, kunjungi domain Anda di browser. Jika situs B1 Anda tampil, berarti sudah selesai. Jika muncul galat, DNS mungkin masih dalam proses penyebaran — tunggu beberapa menit lalu coba lagi.

Anda juga dapat memeriksa penyebaran DNS di [dnschecker.org](https://dnschecker.org) — cari domain Anda dan pastikan catatan CNAME atau A Anda muncul.
