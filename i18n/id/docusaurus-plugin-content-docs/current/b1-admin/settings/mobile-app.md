---
title: "Pengaturan Aplikasi Seluler"
description: "Atur tab navigasi, ubin Beranda, perintah masuk, dan privasi direktori anggota untuk aplikasi member B1.church di B1 Admin."
---

# Pengaturan Aplikasi Seluler

<div class="article-intro">

Halaman Pengaturan Aplikasi Seluler memungkinkan Anda mengonfigurasi tab navigasi yang muncul di **pengalaman seluler B1.church (PWA)** untuk anggota gereja Anda. Anda dapat mengontrol tab mana yang terlihat, ke mana tab tersebut tertaut, dan bagaimana tab tersebut ditampilkan.

</div>

## Video Pelatihan

<YouTube id="ydY7WGK16fE" title="Menyesuaikan Aplikasi Anggota Gereja Anda di B1" />

:::info Aplikasi B1 Mobile asli sudah tidak digunakan lagi
Tab yang dikonfigurasi di sini disajikan melalui [Progressive Web App (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), yang telah menggantikan aplikasi B1 Mobile asli. Bagikan halaman instalasi gereja Anda — `https://yourchurchname.b1.church/mobile/install` — kepada anggota; halaman tersebut akan memandu mereka menginstal aplikasi di perangkat mereka, tanpa perlu mengunduh dari App Store atau Google Play.
:::

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Anda memerlukan izin "Edit Church Settings". Lihat [Peran & Izin](./roles-permissions.md) jika Anda tidak memiliki akses.
- Konfigurasikan [Pengaturan Gereja](./church-settings.md) Anda terlebih dahulu, termasuk nama gereja dan identitas merek

</div>

## Mengakses Pengaturan Navigasi

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas) dan perluas **Mobile**.
2. Klik **Navigation** (`/mobile/navigation`).
3. Halaman Navigation menampilkan tab aplikasi Anda saat ini.

## Menambahkan Tab Baru

1. Klik tombol **Add Tab** di bagian atas halaman.
2. Isi detail tab:
   - **Name** -- Label yang muncul pada tab (misalnya, "Sermons" atau "Give").
   - **Icon** -- Klik pemilih ikon untuk memilih ikon bagi tab Anda.
   - **Image** -- Klik **Select Image** (atau **Change Image**) untuk memberi tab sebuah foto. Tab dengan foto akan muncul sebagai kotak foto di layar Beranda aplikasi -- lihat [Kotak Layar Beranda](#home-screen-tiles).
   - **Tab Type** -- Pilih dari opsi seperti Alkitab, Siaran Langsung, Donasi, Situs Web, dan lainnya.
   - **URL** -- Masukkan alamat web yang dituju tab tersebut.
   - **Visibility** -- Atur siapa yang dapat melihat tab ini (semua orang, hanya anggota, dan sebagainya). Untuk tab **Member Directory**, pengaturan ini hanya mengontrol siapa yang melihat tab itu sendiri; siapa yang dapat membuka direktori diatur oleh **Show in Directory** pada halaman Portal Anggota (lihat [Pengaturan Direktori Anggota & Pesan](#member-directory--messaging-settings)).
3. Klik **Save Tab** untuk menambahkan tab ke aplikasi Anda.

## Mengedit Tab yang Ada

1. Klik tab mana pun dalam daftar **App Tabs**.
2. Perbarui nama, ikon, URL, jenis, atau pengaturan visibilitas tab.
3. Klik **Save Tab** untuk menerapkan perubahan Anda.

## Mengatur Ulang Urutan Tab

Anda dapat mengubah urutan tab muncul di aplikasi seluler. Seret dan lepas tab dalam daftar untuk mengaturnya ulang. Urutan yang ditampilkan di halaman ini sama dengan urutan yang akan dilihat anggota Anda di aplikasi.

:::info
Beberapa tab mungkin muncul secara otomatis ketika kondisi tertentu terpenuhi -- misalnya, tab Siaran Langsung mungkin muncul saat siaran sedang berlangsung. Tab yang ditambahkan secara manual memberi Anda kendali penuh atas apa yang selalu dilihat anggota Anda.
:::

:::tip
Jaga jumlah tab tetap terkendali. Tiga hingga lima tab cocok untuk sebagian besar gereja. Terlalu banyak tab dapat membuat navigasi membingungkan bagi anggota Anda.
:::

## Pengaturan Direktori Anggota & Pesan

Item **Member portal** di bagian Mobile yang sama memuat pengaturan yang mengatur direktori anggota dan pesan pribadi dalam pengalaman B1.church:

- **Directory Approval Group** -- Grup yang meninjau pembaruan direktori anggota, serta [permintaan penghapusan akun](../profile/account-deletion.md), sebelum berlaku.
- **Show in Directory** -- Siapa yang dapat membuka direktori anggota dan siapa yang tercantum di dalamnya: **Hanya Admin**, **Anggota dan Di Atasnya** (bawaan), **Jemaat Tetap dan Di Atasnya**, atau **Pengunjung dan Di Atasnya**. Orang yang status keanggotaannya di bawah tingkat yang Anda pilih tidak dapat melihat direktori dan tidak tercantum di dalamnya. **Hanya Admin** menutup direktori bagi semua orang kecuali staf dengan izin People &gt; View (status keanggotaan Staf saja tidak cukup), yang selalu dapat membuka direktori dan melihat semua orang, apa pun pengaturan ini. Tamu tidak pernah disertakan, karena siapa pun yang mendaftar sendiri secara daring dimulai sebagai tamu.
- **Visibility Preference** -- Menetapkan default untuk seluruh gereja bagi anggota yang belum memilih pengaturan mereka sendiri. **Address**, **Phone Number**, dan **Email** masing-masing memiliki menu tarik-turunnya sendiri, dengan lima tingkat yang sama yang tersedia di mana pun visibilitas dikonfigurasi:
  - **Everyone** -- terlihat oleh siapa pun, termasuk pengunjung anonim
  - **Members** -- hanya terlihat oleh orang yang memiliki catatan Anggota atau Staf
  - **Groups Only** -- hanya terlihat oleh orang yang berbagi grup dengan orang ini, serta staf
  - **My Group Leaders and Staff** -- hanya terlihat oleh pemimpin grup yang diikuti orang ini, serta staf
  - **Staff Only** -- hanya terlihat oleh staf (siapa pun dengan status keanggotaan Staf, atau yang memiliki izin People &gt; View), dan oleh orang itu sendiri

  "Staf" dalam tingkat-tingkat ini berarti siapa pun dengan status keanggotaan Staf atau yang memiliki izin People &gt; View. Perubahan grup berlaku segera: seseorang yang bergabung dengan grup, atau dijadikan pemimpin grup, dapat melihat detail **Groups Only** atau **My Group Leaders and Staff** yang sesuai dari anggota grup tersebut tanpa keluar lalu masuk kembali.

  Anggota dapat mengganti default ini untuk catatan mereka sendiri dari tab **Privasi** pada profil mereka di PWA B1.church -- lihat [Mengedit Profil Anda](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Kontrol keselamatan anak. B1 tidak akan membuka percakapan pesan pribadi **baru** ketika salah satu dari kedua orang tersebut berada di bawah usia ini, berdasarkan tanggal lahir mereka (peran rumah tangga digunakan sebagai cadangan jika tidak ada tanggal lahir tercatat). Orang yang berada di bawah usia tersebut tetap sepenuhnya terlihat di direktori -- hanya pesan langsung yang diblokir, di **kedua arah**, untuk semua orang termasuk staf. Percakapan grup dan pesan kepada orang tua anak tetap berfungsi. Pilihannya adalah Off, 13, 16, atau 18; bawaannya adalah **18**. Percakapan yang sudah ada tidak terpengaruh.

:::tip
Karena pemeriksaan usia minimum bergantung pada tanggal lahir, pastikan tanggal lahir anak-anak di jemaat Anda sudah diisi. Pengaturan ini termasuk dalam keluarga kontrol keselamatan anak yang sama dengan [kontrol keselamatan check-in](../attendance/checkin-safety.md).
:::

### Perintah Masuk di Layar Beranda

Pengunjung yang membuka [layar Beranda](/docs/b1-church/getting-started/navigating#home) aplikasi tanpa masuk akan melihat perintah singkat -- secara bawaan, *"Masuk untuk melihat grup, persembahan, dan lainnya."* -- di samping tombol **Sign In**. Pengaturan **Home screen sign-in prompt** pada halaman Portal Anggota yang sama (`/mobile/b1-mobile`) memungkinkan Anda mengubahnya:

- **Show sign-in prompt on the app home screen** -- Matikan untuk menyembunyikan perintah dan tombol **Sign In** dari layar Beranda. Pengunjung tetap dapat masuk dari menu aplikasi.
- **Sign-in prompt text** -- Ganti kalimat bawaan dengan pesan Anda sendiri (hingga 150 karakter). Biarkan kosong untuk menggunakan bawaan. Kotak ini dinonaktifkan selama perintah dimatikan.

Klik **Save** untuk menerapkan. Pesan **Saved** mengonfirmasi perubahan. Menyimpan akan menyegarkan pengaturan aplikasi yang disimpan dalam cache, sehingga perubahan akan muncul saat layar Beranda dimuat berikutnya.

### Kotak Layar Beranda

Anggota yang sudah masuk selalu melihat riwayat kehadiran dan formulir yang mereka kirim di [halaman Me](/docs/b1-church/getting-started/me-page). Sakelar **Home screen sections** pada halaman Portal Anggota yang sama (`/mobile/b1-mobile`) dapat menampilkannya juga di layar Beranda:

- **Show My Attendance on Home** -- Menambahkan bagian **My Attendance** yang berisi jumlah kali anggota hadir dalam 90 hari terakhir, dua kunjungan terbaru mereka, dan tautan **History** ke daftar kehadiran lengkap mereka.
- **Show My Forms on Home** -- Menambahkan bagian **My Forms** yang berisi dua pengiriman formulir terbaru anggota dan tautan **All forms**.

Keduanya nonaktif secara bawaan. Bagian hanya muncul bagi anggota yang sudah masuk dan memiliki setidaknya satu catatan untuk ditampilkan. Klik **Save** untuk menerapkan.

### Kotak Layar Beranda: Tata Letak

Tab yang memiliki foto (lihat **Image** di bagian [Menambahkan Tab Baru](#adding-a-new-tab)) muncul di [layar Beranda](/docs/b1-church/getting-started/navigating#home) aplikasi sebagai kotak foto, dalam bagian yang berjudul nama gereja Anda. Ini termasuk tab Ayat Hari Ini, jika Anda memberinya foto. Tab foto tetap muncul di bilah tab juga.

Pengaturan **Home screen tiles** pada halaman Portal Anggota yang sama (`/mobile/b1-mobile`) mengontrol cara kotak-kotak tersebut ditata. Pilih **Layout**:

- **Grid** -- Dua kotak per baris (bawaan). Ketika jumlah kotak ganjil, kotak pertama membentang selebar penuh.
- **Scrolling row** -- Satu baris kotak yang digeser anggota ke samping.
- **Scrolling (automatic)** -- Baris yang sama digeser ke samping, tetapi juga bergerak sendiri, maju satu kotak sekitar setiap empat detik dan kembali ke awal di akhir. Gerakan berhenti saat anggota menyentuh, mengarahkan kursor ke, atau menavigasi ke baris tersebut, lalu dilanjutkan beberapa detik kemudian. Pada perangkat yang diatur untuk mengurangi gerakan, baris tetap diam dan berfungsi seperti **Scrolling row**.
- **List** -- Daftar dengan miniatur foto kecil di samping nama setiap tab.

Klik **Save** untuk menerapkan.

## Di Mana Tab Ini Muncul

Tab yang Anda konfigurasi di sini ditampilkan di **PWA B1.church** yang diinstal anggota Anda dari halaman mana pun di `https://yourchurchname.b1.church`. Perubahan yang Anda buat di halaman ini akan tercermin saat anggota membuka aplikasi berikutnya.

Di ponsel, bilah tab bawah menampilkan **Home**, hingga tiga tab Anda, dan **More**; di komputer, header menampilkan hingga lima. Layar bawaan (seperti Sermons, Giving, atau Groups) mendapat slot lebih dulu, dan tab **Internal Page** mengisi slot yang tersisa. Tab **External URL** dan **Verse of the Day** tidak pernah mendapat slot. Setiap tab, termasuk yang tidak muat, tercantum di halaman **More** aplikasi. Lihat [Menavigasi B1App](/docs/b1-church/getting-started/navigating) untuk melihat apa yang dilihat anggota. (Tab juga ditampilkan oleh [aplikasi native B1 Mobile](/docs/b1-church/index.md) lama bagi anggota yang masih menggunakannya, tetapi aplikasi tersebut sudah tidak digunakan lagi dan tidak lagi diperbarui.)

## Langkah Selanjutnya

- [Pengaturan Gereja](./church-settings.md) -- Konfigurasikan informasi dan identitas merek gereja Anda
- [Peran & Izin](./roles-permissions.md) -- Kelola akses untuk tim Anda
