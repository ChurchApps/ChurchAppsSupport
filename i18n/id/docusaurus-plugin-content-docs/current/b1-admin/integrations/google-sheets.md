---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** adalah add-on resmi Google Sheets untuk B1.church. Add-on ini menambahkan sidebar ke spreadsheet mana pun untuk mengekspor data Orang, Donasi, Grup, atau Kehadiran dari gereja B1 Anda ke dalam tab bernama, sesuai permintaan, cukup dengan satu klik. Add-on ini sepenuhnya berjalan di dalam akun Google pengguna. Selain panggilan API hanya-baca yang dilakukan setiap ekspor, tidak ada bagian dari add-on ini yang berhubungan dengan server ChurchApps.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun Google dengan akses edit ke spreadsheet tempat Anda ingin mengekspor data
- Admin gereja (atau seseorang dengan akses baca ke data yang ingin Anda ekspor) yang dapat membuat kunci API B1
- Add-on B1 Export yang sudah terpasang dari Google Workspace Marketplace

</div>

## Data yang Diekspor

| Item menu | Tab lembar | Data |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Setiap ekspor **menggantikan** isi tab bernama yang bersangkutan. Jadi, menjalankan ulang ekspor akan memberi Anda snapshot baru, bukan menambahkan baris di bawah data yang ada. Tab lain di dalam spreadsheet tidak akan terpengaruh.

## Pengaturan

### 1. Buat kunci API B1 dengan scope yang tepat

1. Di B1Admin, buka **Settings → Developer → API Keys**.
2. Klik **New API Key**, beri nama "Sheets Export", lalu berikan scope **read** untuk data yang ingin Anda ekspor:
   - `people:read` untuk ekspor People
   - `donations:read` untuk Donations
   - `groups:read` untuk Groups
   - `attendance:read` untuk Attendance
3. Kunci yang hanya digunakan untuk ekspor **tidak** memerlukan `settings:write`. Scope tersebut hanya diperlukan untuk konektor yang mendaftarkan webhook (Zapier / Make). Batasi kunci ini seminimal mungkin.
4. Simpan dan salin kunci `cak_…`.

### 2. Pasang add-on

1. Buka spreadsheet tempat Anda ingin mengekspor data.
2. Pilih **Extensions → Add-ons → Get add-ons**.
3. Cari **B1 Export** lalu pasang. Google akan meminta izin untuk mengakses lembar Anda dan permintaan HTTP eksternal (agar add-on dapat memanggil API B1).

Setelah terpasang, entri **B1 Export** akan muncul di menu **Extensions** pada setiap spreadsheet yang Anda buka dengan akun Google ini.

### 3. Hubungkan kunci

1. Pilih **Extensions → B1 Export → Connect…** (atau **B1 Export → Connect…** dari bilah menu setelah pertama kali dibuka).
2. Tempelkan kunci API ke sidebar, biarkan Base URL tetap `https://api.churchapps.org` (kecuali Anda sedang menguji di staging), lalu klik **Save**.
3. Klik **Test Connection**. Pesan hijau "Connection OK" menandakan kunci berfungsi.

Kunci disimpan di **per-user properties** (`PropertiesService.getUserProperties()`). Artinya, kunci ini terikat pada akun Google Anda, tidak pernah ditulis ke dalam lembar, dan tidak terlihat oleh editor lain di spreadsheet tersebut.

## Menjalankan Ekspor

Anda bisa melakukannya dengan salah satu cara berikut:

- **Dari menu**: pilih **Extensions → B1 Export → Export People** (atau Donations / Groups / Attendance)
- **Dari sidebar**: buka sidebar (Connect…) lalu klik tombol dataset yang sesuai

Notifikasi singkat akan muncul saat ekspor selesai, misalnya "_N_ row(s) written to 'B1 People'."

## Membuat Laporan di Atas Data

Tab hasil ekspor adalah data Google Sheets biasa. Anda dapat membuat analisis sendiri dengan merujuk ke tab tersebut:

- **Tab ringkasan** dengan `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` untuk menjumlahkan donasi kartu
- **Tampilan terfilter** yang hanya berisi anggota dengan `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Grafik** tren kehadiran yang mengambil data dari `B1 Attendance`

Menjalankan ulang ekspor akan menyegarkan tab yang bersangkutan, dan rumus Anda akan diperbarui secara otomatis.

## Menjadwalkan Ekspor Berulang

Secara default, add-on ini bekerja sesuai permintaan. Untuk ekspor mingguan atau bulanan, gunakan time-driven triggers bawaan Apps Script:

1. Pilih **Extensions → Apps Script** di spreadsheet (ini akan membuka skrip terikat milik add-on).
2. Klik ikon **⏰ Triggers** di sidebar kiri.
3. Pilih **Add Trigger** untuk `exportPeople` (atau fungsi ekspor lainnya). Pilih *Time-driven*, *Week timer*, misalnya *Every Monday 6am*.

Ekspor berjalan di latar belakang di bawah akun Google Anda. Jika kunci API diganti atau dicabut, trigger akan mengirimkan email kepada Anda pada kegagalan berikutnya.

## Izin dan Privasi

- Add-on hanya meminta `spreadsheets.currentonly` (hanya dapat mengakses spreadsheet tempat ia dibuka) dan `script.external_request` (agar `UrlFetchApp` dapat memanggil API B1). Add-on ini **tidak** dapat melihat Drive, Gmail, atau data Google Anda yang lain.
- Kunci API B1 disimpan per pengguna. Editor lain dari spreadsheet yang sama tidak dapat melihatnya.
- Semua panggilan API B1 dilakukan melalui HTTPS dengan `Authorization: Bearer cak_…`.

## Pemecahan Masalah

- **"No API key set"**: buka **Extensions → B1 Export → Connect…** lalu tempelkan kuncinya.
- **"B1 rejected the API key (401)"**: kunci sudah dicabut atau salah. Buat ulang kunci dan tempelkan kembali.
- **"This API key lacks permission for /giving/donations (403)"**: kunci tidak memiliki `donations:read`. Perbarui scope kunci di B1Admin.
- **Sheet tidak diperbarui** setelah ekspor dijalankan: pastikan Anda melihat nama tab yang *benar* (misalnya `B1 People`). Ekspor akan membuat tab jika belum ada.
- **"Quota exceeded"**: Apps Script menetapkan kuota harian per pengguna untuk `UrlFetchApp` (biasanya ribuan panggilan per hari). Gereja besar dengan banyak data mungkin perlu membagi ekspor ke beberapa hari, atau menggunakan [Make](./make) / integrasi kustom untuk sinkronisasi volume tinggi.

## Menyesuaikan Add-On

Add-on ini bersifat open source. Proyek Apps Script-nya berada di repositori `B1Integrations/GoogleSheetsAddon/`. Jika Anda membutuhkan kolom yang tidak diekspor, dataset tambahan, atau format keluaran yang berbeda, silakan buka issue atau PR di sana.

## Lihat Juga

- [Zapier](./zapier): untuk sinkronisasi real-time, bukan ekspor sesuai permintaan
- [Make](./make): untuk sinkronisasi dengan transformasi yang lebih kompleks
- [Kunci API (referensi pengembang)](/docs/developer/api/api-keys)
