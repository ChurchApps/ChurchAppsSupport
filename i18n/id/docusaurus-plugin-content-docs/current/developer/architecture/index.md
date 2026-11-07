---
title: "Arsitektur"
description: "Peta sistem lintas-repo: cara persembahan, check-in, notifikasi, dan situs web bekerja di B1 Admin, B1.church, dan API sebelum Anda mengubahnya."
---

# Arsitektur

<div class="article-intro">

Halaman-halaman ini adalah peta sistem lintas-repositori: halaman ini mendokumentasikan cara kerja sistem inti ChurchApps secara menyeluruh, mulai dari aplikasi, modul API, hingga pustaka bersama, dan bukan cara menyiapkan satu proyek tertentu. Baca halaman ini sebelum mengubah perilaku sistem. Baca [Pengaturan](../setup/index.md) untuk menjalankan proyek, dan [bagian API](../api/index.md) untuk referensi tingkat endpoint.

</div>

## Ekosistem secara sekilas

ChurchApps terdiri dari sekitar 20 repositori independen (bukan monorepo). Aplikasi klien berkomunikasi dengan sejumlah kecil API backend melalui HTTPS dan WebSocket, serta berbagi kode melalui paket npm yang dipublikasikan di bawah scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Dua aturan struktural membentuk semua yang didokumentasikan dalam bagian ini:

1. **Modul bersifat terisolasi.** Setiap modul Api memiliki basis data dan tabelnya sendiri. Modul dan aplikasi lain hanya dapat mengakses datanya melalui endpoint REST. Lihat [Struktur Modul](../api/module-structure.md).
2. **Kode bersama didistribusikan sebagai paket npm.** Aplikasi tidak pernah mengimpor source code satu sama lain. Apa pun yang digunakan kembali melintasi batas repositori melalui `@churchapps/helpers`, `@churchapps/apphelper`, atau `@churchapps/apihelper`. Lihat [Pustaka Bersama](../shared-libraries/index.md).

## Peta sistem

| Halaman | Isi | Mencakup |
|------|----------------|-------|
| [Notifikasi & Pengingat](./notifications.md) | Cara sistem menyampaikan informasi kepada seseorang: dua pintu pengiriman, rantai eskalasi saluran, dan mesin pengingat | Api (messaging), B1Admin, B1App |
| [Real-time Architecture](../realtime.md) | Kerangka pengiriman WebSocket di balik chat, presence, dan pengiriman dalam aplikasi | Api (messaging), semua aplikasi web |
| [Web Push Notifications](../web-push.md) | Saluran push browser: kunci VAPID, penyimpanan langganan, dan pengiriman | Api (messaging), semua aplikasi web |
| [Giving](./giving.md) | Penyedia pembayaran dan gateway, alur donasi, dana/batch, webhook gateway | Api (giving), apphelper, B1App, B1Admin |
| [Event Registrations](./registrations.md) | Model komersial pendaftaran: jenis peserta, pilihan, kode diskon, pembayaran melalui gateway giving, dan daftar tunggu | Api (content + giving), B1App, B1Admin |
| [Check-Ins](./check-ins.md) | Check-in kiosk dan mandiri, model data kehadiran, perutean ruangan, lapisan keamanan anak, pencetakan label | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Website Builder](./website-builder.md) | Pohon halaman/bagian/elemen, kontrak dan renderer jenis elemen, blog, halaman dengan akses terbatas, SEO, dan pembuatan dengan AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Website Routing & Multi-Site](./websites.md) | Cara permintaan dipetakan ke gereja dan situs tertentu, model data `siteId` multi-situs, serta edge domain kustom Caddy | B1App, Api (membership + content), B1Admin |
| [Integrations](./integrations.md) | Permukaan ekstensi: OAuth, kunci API, webhook, penyedia konten, MCP | Api, pustaka bersama, aplikasi eksternal |
| [Audit Log & Undoable Batches](./audit-log.md) | Audit default-aktif atas setiap mutasi di titik kontrol controller, dan lapisan batch yang membuat impor serta tindakan massal dapat dibatalkan | Api (semua modul), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Layanan penyimpanan berbayar dan kredit SMS: identitas JWT bersama, S2S dengan service-key, titik integrasi penyedia SMS dan penyimpanan, penagihan Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paket texting/apihelper, B1Admin |
| [Bring-Your-Own Storage](./byos-storage.md) | Gereja dapat menghubungkan Google Drive, Dropbox, OneDrive, atau bucket kompatibel S3 untuk unggahan di atas batas gratis 100MB: koneksi OAuth, bentuk unggahan per penyedia, pengalihan unduhan publik | Api (content + membership), paket helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | Tulang punggung aset dan pengajuan bersama di balik konten buatan pengguna lintas produk, serta satu antrean moderasi khusus staf di Server Admin B1Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Saat perubahan mengubah cara kerja salah satu sistem ini, bukan hanya satu halaman di dalam satu aplikasi, peta sistem yang sesuai di sini juga perlu diperbarui dalam pekerjaan yang sama. Dengan begitu, bagian ini tetap dapat dipercaya sebagai sumber pertama bagi kontributor baru.
:::

## Usulan

Dokumen-dokumen ini menjelaskan pekerjaan yang diusulkan untuk ditinjau, dan bukan perilaku produk yang sudah tersedia.

| Usulan | Isi |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Akun, kunci, layanan, dan nomor telepon milik gereja; cakupan integrasi, persetujuan, pengiriman, perkiraan, dan pemeriksaan rilis |
| [Draf onboarding Twilio gereja](./twilio-byok-onboarding-draft.md) | Usulan pengaturan formulir pendaftaran B1, contoh kampanye khusus gereja, dan daftar periksa persetujuan serta operasional |
