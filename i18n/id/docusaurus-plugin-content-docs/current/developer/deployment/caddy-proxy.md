---
title: "Proxy Domain Kustom Caddy"
description: "Bangun dan jalankan reverse proxy Caddy yang melayani domain gereja kustom untuk situs B1.church, mencakup sertifikat TLS, pemetaan host, dan jebakan umum."
---

# Proxy Domain Kustom Caddy

<div class="article-intro">

Domain gereja kustom (`mychurch.org` → situs B1 gereja) berakhir di satu instans EC2 Windows yang menjalankan Caddy. Instans ini memiliki sertifikat TLS, me-resolve setiap domain ke situs `{sub}.b1.church`-nya, dan melakukan reverse-proxy dengan header Host yang ditulis ulang. Seluruh konfigurasinya terdiri dari dua file: `Caddyfile` statis dan `hosts.map` yang disegarkan dari Membership API. Dengan begitu, instans tetap berfungsi setelah restart tanpa state runtime apa pun. Halaman ini membahas cara membangun instans dari awal, cara mengoperasikannya, dan jebakan yang sudah teruji di lapangan yang akan merepotkan siapa pun yang membangun ulang.

</div>

Untuk cara permintaan di-resolve ke gereja/situs setelah sampai di B1App, lihat [Perutean Website & Multi-Situs](../architecture/websites.md).

## Komponen

| Komponen | Keterangan |
|---|---|
| Instans EC2 | Windows Server; Elastic IP **`3.23.251.61`** (tertanam di DNS gereja di seluruh dunia; IP ini permanen, sedangkan instans bersifat sekali pakai) |
| `C:\caddy\caddy.exe` | Build Caddy **kustom** dengan modul penyimpanan `techknowlogick/certmagic-s3`. Caddy standar tidak dapat membaca penyimpanan sertifikat |
| `C:\caddy\Caddyfile` | Seluruh konfigurasi proxy: TLS sesuai permintaan, `map` host→upstream, redirect www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Satu baris `{domain} {sub}.b1.church` per domain yang dapat dirutekan, diimpor ke dalam blok `map` pada Caddyfile |
| `sync-hostmap.ps1` + task `CaddyHostmapSync` | Tugas terjadwal (setiap 5 menit + saat boot, sebagai SYSTEM) yang menyegarkan `hosts.map` dari API dan me-reload Caddy secara halus hanya jika ada perubahan |
| Layanan Windows `caddy` (pembungkus WinSW) | Menjalankan `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; restart otomatis saat gagal. Caddy tidak sadar SCM, sehingga pembungkus diperlukan |
| Bucket S3 `churchapps-caddy-certs` | Penyimpanan sertifikat bersama (`region us-east-2`, prefix `certs`). Sertifikat tetap ada saat instans dibangun ulang |
| Role IAM `CaddyRole` | Memberi instans akses S3. Caddy menggunakan rantai kredensial default AWS (tanpa kunci di konfigurasi) |

## Dua endpoint API yang bergantung pada instans ini

Keduanya ada di Membership API. `authorize` bersifat anonim. `hostmap` memerlukan header `x-internal-key: <INTERNAL_API_KEY>` sejak Api PR #67 (2026-08-16). `sync-hostmap.ps1` membacanya dari `C:\caddy\internal-key.txt`:

| Endpoint | Peran |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | **Gerbang `ask` TLS sesuai permintaan** milik Caddy: `200 {"authorized":true}` jika host (atau, untuk host `www.`, apex-nya) merupakan baris di `domains`; `404` jika tidak. Ini adalah kontrol penyalahgunaan. Caddy tidak akan menerbitkan sertifikat untuk host yang ditolak endpoint ini |
| `GET /membership/domains/hostmap` | Memerlukan `x-internal-key` (atau JWT admin server). Berupa `text/plain` dengan baris `{domain} {sub}.b1.church` yang diurutkan dan dihapus duplikatnya. Sadar situs: domain yang ditetapkan ke situs sekunder akan mengarah ke subdomain situs tersebut. Ini adalah sumber `map` |

## Alur permintaan

1. Browser me-resolve `mychurch.org` → `3.23.251.61` (rekaman `A` apex, atau `CNAME proxy.b1.church`).
2. Caddy menghentikan TLS. Jika sertifikat tersedia di S3, sajikan. Jika SNI tidak dikenal, `authorize` ditanya: 200 berarti terbitkan sesuai permintaan melalui Let's Encrypt, 404 berarti **handshake ditolak** (tanpa sertifikat, tanpa respons). Host yang tidak dikenal menerima penolakan TLS, bukan error HTTP.
3. `map` me-resolve Host ke `{sub}.b1.church`. `www.{apex}` mendapat 302 ke apex. Host yang sudah diotorisasi tetapi belum ada di map (domain baru dalam jendela sinkronisasi ≤5 menit) mendapat 404 bersih.
4. `reverse_proxy` menghubungi `{sub}.b1.church:443` dengan SNI dan Host yang ditulis ulang ke upstream, sehingga edge Vercel menyajikan situs B1App.
   Caddy juga mengirim domain asli pengunjung sebagai `X-Church-Host` (Vercel menimpa `X-Forwarded-Host` dengan Host yang sudah ditulis ulang). Middleware B1App hanya menerimanya jika `/domains/public/lookup/{host}` memetakannya ke `{sub}` yang sama dengan host permintaan. Setelah itu, nilainya diekspos sebagai `x-public-host` untuk header `Link` kanonis, `robots.txt`, dan `sitemap.xml`. `x-public-host` yang dikirim klien selalu dihapus. Schema.org `ChurchJsonLd` tetap menggunakan URL `b1.church`, karena membaca header di sana akan membuat halaman bersifat dinamis.
5. Port 80 meneruskan tantangan ACME HTTP-01 dan mengalihkan semua permintaan lain dengan 308 ke https.

Propagasi domain baru: domain yang disimpan di B1Admin menjadi dapat dirutekan dalam ~5 menit (tugas sinkronisasi). Sertifikatnya diterbitkan pada kunjungan HTTPS pertama.

## Membangun instans dari awal

Diringkas dari prosedur yang sudah teruji di lapangan. Langkah lengkap dengan perintah siap salin tersedia di workspace ops, bukan di repo ini. Prasyarat dulu, karena build tidak berfungsi tanpanya:

1. **IAM**: lampirkan `CaddyRole` (akses S3 ke bucket sertifikat) ke instans. Verifikasi melalui IMDSv2 dari instans. GET IMDS biasa yang mengembalikan 401 hanya berarti IMDSv2 diberlakukan, bukan "tidak ada role".
2. **Kesehatan API**: `authorize` harus mengembalikan 404 untuk domain palsu, dan `hostmap` (dengan header `x-internal-key`) harus mengembalikan 200, sebelum langkah lain.

Kemudian:

3. **Binary**: unduh build kustom dari layanan build Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (~57 MB dibanding ~45 MB untuk versi standar; v2.11.4 pada saat penulisan). Pilihan modul penting: `techknowlogick/certmagic-s3` menggunakan kunci `bucket`/`region`/`prefix` yang sesuai dengan tata letak sertifikat yang ada. Fork `ss098` menggunakan `host`/`endpoint` dan **tidak akan menemukan** sertifikat yang sudah ada.
4. **Berkas**: `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` produksi, satu baris) ke `C:\caddy\`. Isi map sekali dengan `sync-hostmap.ps1 -NoReload`.
5. **Gerbang sebelum start pertama**: `caddy list-modules` harus menampilkan modul penyimpanan s3. `caddy adapt` harus menghasilkan `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` di blok penyimpanannya. `caddy validate` harus lolos.
6. **Layanan**: pasang melalui WinSW (id layanan `caddy`, restart otomatis saat gagal, log bergulir). Berjalan sebagai LocalSystem, yang dapat menjangkau IMDS untuk kredensial role.
7. **Tugas sinkronisasi**: daftarkan `CaddyHostmapSync` (SYSTEM, setiap 5 menit + saat startup, batas eksekusi 4 menit).
8. **Verifikasi pra-cutover** dengan memaksa resolve domain ke `127.0.0.1` memakai `curl --resolve`. Instans belum menerima trafik nyata sampai EIP dipindahkan. Domain yang sudah ada harus menyajikan konten dengan sertifikat yang terbawa dan valid. `www.` harus 302. Host yang tidak dikenal harus ditolak TLS. `Restart-Service caddy` harus kembali menyajikan konten **tanpa priming ulang manual**. Tes restart itulah inti dari desain statis ini.
9. **Go-live**: kaitkan ulang Elastic IP `3.23.251.61` ke instans baru. DNS gereja tidak pernah berubah.

## Jebakan yang sudah teruji (dipelajari dengan susah payah, jangan sampai terulang)

| Jebakan | Gejala | Solusi |
|---|---|---|
| `tls_server_name {vars.upstream}` di transport reverse_proxy | Setiap domain yang di-proxy mengembalikan 502: placeholder map ter-resolve **kosong saat TLS dial** ("either ServerName or InsecureSkipVerify must be specified") | Gunakan placeholder native transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Kunci duplikat atau baris sampah di `hosts.map` | Handler `map` Caddy **langsung error pada kunci input duplikat**. Satu baris buruk bisa menjatuhkan seluruh konfigurasi | Script sinkronisasi menormalkan spasi, membuang baris yang rusak (hanya menolak seluruhnya jika >20% buruk), menghapus duplikat dengan prioritas pertama, dan menulis UTF-8 **tanpa BOM** (BOM merusak kunci map pertama). API juga menyaring baris domain yang kosong atau mengandung spasi di sumbernya |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Pendaftaran tugas **gagal secara diam-diam** (XML di luar rentang, error non-terminating) | Bangun pengulangan sebagai instance CIM `MSFT_TaskRepetitionPattern` dengan `Interval = "PT5M"` dan tanpa durasi. Tambahkan `ExecutionTimeLimit` 4 menit, karena eksekusi SYSTEM pertama bisa macet saat pencarian TLS/CRL dingin |

:::warning
Admin API hanya terikat ke `localhost:2019`. Mode runtime lama mengeksposnya secara remote agar Membership API dapat mendorong konfigurasi rute. Desain statis tidak memerlukan dorongan remote, dan permukaan yang lebih kecil ini disengaja. `caddy reload` (dijalankan secara lokal oleh script sinkronisasi) adalah satu-satunya konsumen admin API.
:::

:::info Dorongan runtime lama
`CaddyHelper` di API (serta endpoint `/membership/domains/caddy` + `/caddy/init`) masih ada sebagai jalur rollback ke mode lama yang dikonfigurasi saat runtime. Keduanya dijadwalkan untuk dihapus setelah instans statis stabil selama beberapa minggu. Setelah itu, `authorize` + `hostmap` adalah satu-satunya titik integrasi.
:::

## Operasi

- **Log**: log bergulir WinSW di `C:\caddy\` (stdout/err layanan; error reverse-proxy muncul di `caddy-service.err.log`). Riwayat sinkronisasi ada di `C:\caddy\sync-hostmap.log`.
- **Paksa penyegaran map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Perubahan konfigurasi**: edit `C:\caddy\Caddyfile`, lalu jalankan `caddy validate` + `caddy reload` (atau `Restart-Service caddy`, karena restart aman secara desain).
- **Penghapusan domain massal** akan memicu guard penyusutan script sinkronisasi secara sengaja. Pindahkan `hosts.map` lama ke samping dan jalankan ulang tugas untuk menerima penyusutan besar yang disengaja.
- **Instruksi DNS untuk gereja tidak pernah berubah**: apex `A 3.23.251.61` atau `CNAME proxy.b1.church`.

## Halaman Terkait

- [Perutean Website & Multi-Situs](../architecture/websites.md): bagaimana permintaan yang di-proxy di-resolve ke gereja/situs di B1App
- [Deployment API](./apis.md): deployment Membership API yang melayani `authorize`/`hostmap`
