---
title: "VOMO"
description: "Hubungkan pendaftaran relawan dan check-in kios VOMO ke orang dan grup di B1 Admin dengan Zapier, termasuk cakupan kunci API dan langkah pengaturan."
---

# VOMO

<div class="article-intro">

VOMO adalah platform keterlibatan relawan. Orang-orang mendaftar ke proyek, melakukan check-in di kiosk, dan mengumpulkan jam pelayanan. Jika Anda menggunakan VOMO untuk penjadwalan relawan tetapi B1 untuk data jemaat, Zapier dapat menyinkronkan keanggotaan dan check-in di antara keduanya agar datanya tetap sama di kedua sisi.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [VOMO](https://vomo.org) dengan paket yang mendukung Zapier (hubungi dukungan VOMO jika Anda tidak yakin)
- Akun [Zapier](https://zapier.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Dapat Anda Hubungkan

Aplikasi Zapier VOMO menyediakan empat instant trigger dan empat action. Resep yang paling sering dibutuhkan gereja adalah:

| Arah | Trigger | Action |
|---|---|---|
| VOMO → B1 | VOMO Membership (created) | B1: Find Person → Create Person (jika belum ada) |
| VOMO → B1 | VOMO Kiosk check-in | B1: Add Group Member ke grup "Currently Serving", atau catat sebagai kehadiran |
| B1 → VOMO | B1 `person.created` | VOMO: Find Organizer (berdasarkan email); jika tidak ada, gunakan langkah kustom |
| Keduanya | VOMO Participation (pendaftaran) | B1: Add Group Member ke grup khusus proyek |

Action VOMO hanya terbatas pada **membuat draf proyek** dan **mencari** organizer atau proyek yang sudah ada. Saat ini belum ada action untuk "menambahkan orang ini ke proyek VOMO". Penghubungan yang paling bermanfaat sebagian besar berada pada arah VOMO → B1.

## Pengaturan

### 1. Buat kunci API B1

**Settings → Developer → API Keys → New API Key**. Scope:

- `people:read`, `people:write`: untuk mencari dan membuat relawan sebagai data orang di B1
- `groups:write`: untuk menambahkan mereka ke grup tim pelayanan
- (Opsional) `attendance:write` jika Anda mencatat check-in kiosk sebagai kehadiran

### 2. Buat Zap sinkronisasi keanggotaan

1. **Trigger**: VOMO: Membership (event = `created`).
2. **Action**: B1.church: Find Person, dicocokkan berdasarkan email.
3. **Filter / Path**: bercabang berdasarkan ditemukan atau tidak ditemukan:
   - Tidak ditemukan → B1.church: Create Person, lalu Add Group Member ke grup relawan yang sesuai.
   - Ditemukan → B1.church: Add Group Member secara langsung.
4. Aktifkan. Relawan baru dari VOMO sekarang muncul di B1 dengan keanggotaan grup yang tepat.

### 3. (Opsional) Buat Zap check-in kiosk

1. **Trigger**: VOMO: Kiosk
2. **Action**: B1.church: Find Person (berdasarkan email)
3. **Action**: pilih salah satu:
   - *Jika dicatat sebagai kehadiran*: Webhooks by Zapier mengirim POST ke endpoint `/attendance/visits` milik B1 (aplikasi Zapier B1 belum memiliki action *Record Attendance* bawaan). [Kunci API](/docs/developer/api/api-keys) B1 dimasukkan ke header `Authorization: Bearer cak_…`.
   - *Jika dicatat sebagai keanggotaan grup*: B1.church: Add Group Member ke grup "Currently Serving (Today)". Lalu buat Zap kedua yang berjalan lebih lambat di hari itu untuk menghapus mereka melalui pembersihan terjadwal.

## Resep Umum

### Sinkronisasi grup per proyek

- **Trigger**: VOMO: Participation (created)
- **Action**: Filter by Zapier berdasarkan id proyek, lalu
- **Action**: B1.church: Add Group Member ke grup B1 yang namanya sama dengan proyek VOMO.

Ketika proyek VOMO berakhir, kosongkan grup B1 secara manual (atau gabungkan dengan trigger *Participation deleted* untuk menghapus mereka secara otomatis).

### Kirim SMS "terima kasih sudah mendaftar"

Hubungkan VOMO Participation → Clearstream Send Text atau Text In Church Send Message dalam Zap yang sama. Keduanya memiliki action Zapier bawaan. Lihat [Clearstream](./clearstream.md) dan [Text In Church](./text-in-church.md).

### Mendeteksi relawan yang tidak aktif

Jalankan trigger *Schedule* Zapier setiap hari yang memanggil Find Organizer di VOMO untuk daftar orang di B1 yang bergabung ke tim pelayanan bulan ini. Jika VOMO mengembalikan "not found", berarti mereka belum mengaktifkan VOMO dan perlu diingatkan.

## Batasan dan Catatan

- **Email adalah kunci penghubung.** Payload VOMO menyertakan email pengguna tetapi tidak menyertakan id orang di B1. Donatur yang menggunakan email berbeda di setiap sistem akan menghasilkan data ganda.
- **Belum ada action "Add to Project" di aplikasi Zapier VOMO.** Jika Anda membutuhkan pendaftaran proyek dari B1 ke VOMO, Anda perlu mengirim POST ke REST API VOMO dari langkah *Webhooks by Zapier*. Ini adalah integrasi kustom.
- **Paket gratis atau paket dasar VOMO mungkin tidak menyertakan Zapier.** Konfirmasikan dengan dukungan VOMO sebelum menjanjikan tanggal penghubungan.

## Pemecahan Masalah

- **Trigger tidak pernah berjalan**: trigger instan VOMO membutuhkan token API yang masih valid. Uji ulang Zap; hubungkan ulang VOMO jika token telah diganti.
- **B1 *Add Group Member* gagal dengan 422**: id grup pada action tidak ada. Buka **B1Admin → Groups**, klik grupnya, lalu salin segmen id dari URL ke langkah Zap.
- **Data orang ganda di B1 dari satu relawan VOMO**: kemungkinan mereka mendaftar dengan email yang berbeda dari yang sudah ada di B1. Anda dapat menyeragamkan email, atau menambahkan Zapier *Path* yang juga mencari berdasarkan nomor telepon sebelum membuat data baru.

## Lihat Juga

- [Zapier (ikhtisar)](../zapier.md): sisi B1 dari setiap resep Zapier
- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md): menggabungkan pendaftaran relawan dengan konfirmasi SMS
- [Webhooks (referensi pengembang)](/docs/developer/api/webhooks): event yang dapat memicu VOMO
