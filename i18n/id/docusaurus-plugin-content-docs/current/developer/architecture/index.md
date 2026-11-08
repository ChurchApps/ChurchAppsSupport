---
title: "Arsitektur"
description: "Peta sistem lintas repositori yang menunjukkan cara persembahan, check-in, notifikasi, dan situs web bekerja di B1 Admin, B1.church, dan Api sebelum Anda mengubahnya."
---

# Arsitektur

<div class="article-intro">

Halaman-halaman ini adalah peta sistem lintas repositori: halaman ini mendokumentasikan cara kerja sistem inti ChurchApps dari awal hingga akhir, mencakup aplikasi, modul API, dan pustaka bersama, dan bukan cara menyiapkan satu proyek tertentu. Bacalah halaman ini sebelum mengubah perilaku suatu sistem. Baca [Pengaturan](../setup/index.md) untuk menjalankan proyek, dan [bagian API](../api/index.md) untuk referensi tingkat endpoint.

</div>

## Ekosistem sekilas

ChurchApps terdiri dari ~20 repositori independen (bukan monorepo). Aplikasi klien berkomunikasi dengan sejumlah kecil API backend melalui HTTPS dan WebSocket, serta berbagi kode melalui paket npm yang dipublikasikan di bawah scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dua aturan struktural membentuk semua yang didokumentasikan di bagian ini:

1. **Modul bersifat terisolasi.** Setiap modul Api memiliki basis data dan tabelnya sendiri. Modul lain dan aplikasi hanya dapat mengakses datanya melalui endpoint REST. Lihat [Struktur Modul](../api/module-structure.md).
2. **Kode bersama dikirim sebagai paket npm.** Aplikasi tidak pernah mengimpor sumber satu sama lain. Apa pun yang digunakan kembali melintasi batas repositori melalui `@churchapps/helpers`, `@churchapps/apphelper`, atau `@churchapps/apihelper`. Lihat [Pustaka Bersama](../shared-libraries/index.md).

## Peta sistem

| Halaman | Yang dibahas | Mencakup |
|------|----------------|-------|
| [Notifikasi & Pengingat](./notifications.md) | Bagaimana sesuatu memberi tahu seseorang: dua pintu pengiriman, rantai eskalasi saluran, dan mesin pengingat | Api (messaging), B1Admin, B1App |
| [Arsitektur Real-time](../realtime.md) | Kerangka pengiriman WebSocket di balik chat, presence, dan pengiriman dalam aplikasi | Api (messaging), semua aplikasi web |
| [Notifikasi Web Push](../web-push.md) | Saluran push browser: kunci VAPID, penyimpanan langganan, dan pengiriman | Api (messaging), semua aplikasi web |
| [Persembahan](./giving.md) | Penyedia pembayaran dan gateway, alur donasi, dana/batch, dan webhook gateway | Api (giving), apphelper, B1App, B1Admin |
| [Pendaftaran Acara](./registrations.md) | Model perdagangan pendaftaran: jenis peserta, pilihan, kode diskon, pembayaran melalui gateway persembahan, dan daftar tunggu | Api (content + giving), B1App, B1Admin |
| [Check-In](./check-ins.md) | Check-in kiosk dan mandiri, model data kehadiran, perutean ruangan, lapisan keamanan anak, dan pencetakan label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Pembangun Situs Web](./website-builder.md) | Pohon halaman/bagian/elemen, kontrak dan renderer jenis elemen, blog, halaman dengan akses terbatas, SEO, dan pembuatan AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Perutean Situs Web & Multi-Situs](./websites.md) | Cara sebuah permintaan diarahkan ke gereja dan situs tertentu, model data `siteId` multi-situs, dan edge domain kustom Caddy | B1App, Api (membership + content), B1Admin |
| [Integrasi](./integrations.md) | Permukaan ekstensi: OAuth, kunci API, webhook, penyedia konten, MCP | Api, pustaka bersama, aplikasi eksternal |
| [Log Audit & Batch yang Dapat Dibatalkan](./audit-log.md) | Audit default-aktif atas setiap mutasi di titik kontrol controller, dan lapisan batch yang membuat impor serta tindakan massal dapat dibatalkan | Api (semua modul), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Layanan penyimpanan berbayar dan kredit SMS: identitas shared-JWT, S2S service-key, titik sambung penyedia SMS dan penyimpanan, penagihan Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paket texting/apihelper, B1Admin |
| [Penyimpanan Bawa Sendiri](./byos-storage.md) | Gereja menautkan Google Drive, Dropbox, OneDrive, atau bucket kompatibel S3 untuk unggahan di atas 100MB gratis: koneksi OAuth, bentuk unggahan per penyedia, dan pengalihan unduhan publik | Api (content + membership), paket helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | Tulang punggung aset dan pengajuan bersama di balik konten buatan pengguna lintas produk, serta antrean moderasi tunggal khusus staf di Server Admin B1Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Ketika perubahan mengubah cara kerja salah satu sistem ini, bukan hanya halaman di dalam satu aplikasi, peta sistem yang sesuai di sini harus diperbarui dalam upaya yang sama. Hal itu menjaga bagian ini tetap menjadi sumber rujukan pertama yang dapat dipercaya bagi kontributor baru.
:::

## Usulan

Dokumen-dokumen ini menjelaskan pekerjaan yang diusulkan untuk ditinjau, bukan perilaku produk yang tersedia.

| Usulan | Yang dibahas |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Akun, kunci, layanan, dan nomor telepon milik gereja; cakupan integrasi, persetujuan, pengiriman, estimasi, dan pemeriksaan rilis |
| [Draf orientasi gereja Twilio](./twilio-byok-onboarding-draft.md) | Pengaturan formulir pendaftaran B1 yang diusulkan, contoh kampanye khusus gereja, dan daftar periksa persetujuan serta operasional |
