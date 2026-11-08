---
title: "Pengaturan Aplikasi Seluler"
description: "Konfigurasi tab navigasi, tombol di layar Beranda, prompt masuk, dan pengaturan privasi direktori anggota untuk aplikasi anggota B1.church di B1 Admin."
---

# Pengaturan Aplikasi Seluler

<div class="article-intro">

Halaman Pengaturan Aplikasi Seluler memungkinkan Anda mengonfigurasi tab navigasi yang muncul di **pengalaman seluler B1.church (PWA)** bagi anggota gereja Anda. Anda dapat mengatur tab mana yang terlihat, ke mana tab tersebut tertaut, dan bagaimana tab tersebut ditampilkan.

</div>

## Video Pelatihan

<YouTube id="ydY7WGK16fE" title="Menyesuaikan Aplikasi Anggota Gereja Anda di B1" />

:::info
Tab yang dikonfigurasi di sini muncul di Aplikasi B1, yang dapat [dipasang sebagai Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md) oleh anggota. Bagikan halaman pemasangan gereja Anda — `https://yourchurchname.b1.church/mobile/install` — kepada anggota; halaman tersebut memandu mereka memasang aplikasi di perangkat mereka, tanpa perlu mengunduh dari App Store atau Google Play.
:::

<div class="prereqs">
<h4>Sebelum Anda Memulai</h4>

- Anda memerlukan izin "Edit Pengaturan Gereja". Lihat [Peran & Izin](./roles-permissions.md) jika Anda tidak memiliki akses.
- Konfigurasikan [Pengaturan Gereja](./church-settings.md) Anda terlebih dahulu, termasuk nama gereja dan identitas merek

</div>

## Mengakses Pengaturan Navigasi

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas) lalu perluas **Mobile**.
2. Klik **Navigation** (`/mobile/navigation`).
3. Halaman Navigation menampilkan tab aplikasi Anda saat ini.

## Menambahkan Tab Baru

1. Klik tombol **Add Tab** di bagian atas halaman.
2. Isi detail tab:
   - **Name** -- Label yang muncul pada tab (misalnya "Sermons" atau "Give").
   - **Icon** -- Klik pemilih ikon untuk memilih ikon bagi tab Anda.
   - **Image** -- Klik **Select Image** (atau **Change Image**) untuk memberi tab sebuah foto. Tab dengan foto akan muncul sebagai ubin foto di layar Beranda aplikasi -- lihat [Ubin Layar Beranda](#home-screen-tiles).
   - **Tab Type** -- Pilih dari opsi seperti Bible, Live Stream, Donation, Website, dan lainnya.
   - **URL** -- Masukkan alamat web yang harus ditautkan oleh tab.
   - **Visibility** -- Atur siapa saja yang dapat melihat tab ini (semua orang, hanya anggota, dsb.). Untuk tab **Member Directory**, pengaturan ini hanya mengontrol siapa yang melihat tab itu sendiri; siapa yang dapat membuka direktori diatur oleh **Show in Directory** pada halaman Member portal (lihat [Pengaturan Direktori Anggota & Pesan](#member-directory--messaging-settings)).
3. Klik **Save Tab** untuk menambahkannya ke aplikasi Anda.

## Mengedit Tab yang Ada

1. Klik tab mana pun yang ada dalam daftar **App Tabs**.
2. Perbarui nama, ikon, URL, jenis, atau pengaturan visibilitas tab.
3. Klik **Save Tab** untuk menerapkan perubahan Anda.

## Mengurutkan Ulang Tab

Anda dapat mengubah urutan tab yang muncul di aplikasi seluler. Seret dan lepas tab dalam daftar untuk mengaturnya ulang. Urutan yang ditampilkan di halaman ini sama dengan urutan yang akan dilihat anggota Anda di aplikasi.

:::info
Beberapa tab mungkin muncul secara otomatis ketika kondisi tertentu terpenuhi -- misalnya, tab Live Stream mungkin muncul saat siaran sedang aktif. Tab yang ditambahkan secara manual memberi Anda kendali penuh atas apa yang dilihat anggota Anda setiap saat.
:::

:::tip
Jaga jumlah tab tetap terkendali. Tiga hingga lima tab cocok untuk sebagian besar gereja. Terlalu banyak tab dapat membuat navigasi membingungkan bagi anggota Anda.
:::

## Pengaturan Direktori Anggota & Pesan

Item **Member portal** dalam bagian Mobile yang sama memuat pengaturan yang mengatur direktori anggota dan pesan pribadi dalam pengalaman B1.church:

- **Directory Approval Group** -- Grup yang meninjau pembaruan direktori anggota, dan [permintaan penghapusan akun](../profile/account-deletion.md), sebelum berlaku.
- **Show in Directory** -- Siapa yang dapat membuka direktori anggota dan siapa yang tercantum di dalamnya: **Admins Only**, **Members and Above** (default), **Regular Attendees and Above**, atau **Visitors and Above**. Orang yang status keanggotaannya di bawah tingkat yang Anda pilih tidak melihat direktori dan tidak tercantum di dalamnya. **Admins Only** menutup direktori bagi semua orang kecuali staf dengan izin People &gt; View (status keanggotaan Staff saja tidak cukup), yang selalu dapat membuka direktori dan melihat semua orang, apa pun pengaturannya. Tamu tidak pernah disertakan, karena siapa pun yang mendaftar sendiri secara daring dimulai sebagai tamu.
- **Visibility Preference** -- Menetapkan default untuk seluruh gereja bagi anggota yang belum memilih pengaturan mereka sendiri. **Address**, **Phone Number**, dan **Email** masing-masing memiliki dropdown sendiri, dengan lima tingkat yang sama yang tersedia di mana pun visibilitas dikonfigurasi:
  - **Everyone** -- terlihat oleh siapa saja, termasuk pengunjung anonim
  - **Members** -- terlihat hanya oleh orang yang memiliki catatan Member atau Staff
  - **Groups Only** -- terlihat hanya oleh orang yang berbagi grup dengan orang ini, ditambah staf
  - **My Group Leaders and Staff** -- terlihat hanya oleh pemimpin grup tempat orang ini menjadi anggota, ditambah staf
  - **Staff Only** -- terlihat hanya oleh staf (siapa pun yang status keanggotaannya Staff, atau yang memiliki izin People &gt; View), dan oleh orang itu sendiri

  "Staff" dalam tingkat-tingkat ini berarti siapa pun yang status keanggotaannya Staff atau yang memiliki izin People &gt; View. Perubahan grup langsung berlaku: seseorang yang bergabung dengan grup, atau dijadikan pemimpin grup, dapat melihat detail **Groups Only** atau **My Group Leaders and Staff** yang sesuai dari anggota grup tersebut tanpa keluar dan masuk kembali.

  Anggota dapat mengganti default ini untuk catatan mereka sendiri dari tab **Privacy** pada profil mereka di PWA B1.church -- lihat [Mengedit Profil Anda](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Kontrol keselamatan anak. B1 tidak akan membuka percakapan pesan pribadi **baru** jika salah satu pihak berada di bawah usia ini, berdasarkan tanggal lahir mereka (peran rumah tangga digunakan sebagai cadangan jika tidak ada tanggal lahir yang tercatat). Orang di bawah usia tersebut tetap sepenuhnya terlihat di direktori -- hanya pesan langsung yang diblokir, di **kedua arah**, untuk semua orang termasuk staf. Percakapan grup dan pesan kepada orang tua anak tetap berfungsi. Pilihannya adalah Off, 13, 16, atau 18; defaultnya adalah **18**. Percakapan yang sudah ada tidak terpengaruh.

:::tip
Karena pemeriksaan usia minimum bergantung pada tanggal lahir, pastikan tanggal lahir telah diisi untuk anak-anak di jemaat Anda. Pengaturan ini termasuk dalam keluarga kontrol keselamatan anak yang sama dengan [kontrol keselamatan check-in](../attendance/checkin-safety.md).
:::

### Prompt Masuk di Layar Beranda

Pengunjung yang membuka [layar Beranda](/docs/b1-church/getting-started/navigating#home) aplikasi tanpa masuk akan melihat prompt singkat -- secara default, *"Sign in to see your groups, giving, and more."* -- di samping tombol **Sign In**. Pengaturan **Home screen sign-in prompt** pada halaman Member portal yang sama (`/mobile/b1-mobile`) memungkinkan Anda mengubahnya:

- **Show sign-in prompt on the app home screen** -- Matikan opsi ini untuk menyembunyikan prompt sekaligus tombol **Sign In** dari layar Beranda. Pengunjung tetap dapat masuk dari menu aplikasi.
- **Sign-in prompt text** -- Ganti kalimat default dengan pesan Anda sendiri (hingga 150 karakter). Biarkan kosong untuk menggunakan default. Kotak ini dinonaktifkan selama prompt dimatikan.

Klik **Save** untuk menerapkan. Pesan **Saved** mengonfirmasi perubahan. Menyimpan akan menyegarkan pengaturan aplikasi yang di-cache, sehingga perubahan akan terlihat saat layar Beranda dimuat berikutnya.

### Ubin Layar Beranda

Tab yang memiliki foto (lihat **Image** di [Menambahkan Tab Baru](#adding-a-new-tab)) muncul di [layar Beranda](/docs/b1-church/getting-started/navigating#home) aplikasi sebagai ubin foto, dalam sebuah bagian yang berjudul nama gereja Anda. Ini termasuk tab Verse of the Day, jika Anda memberinya foto. Tab foto tetap muncul di bilah tab juga.

Pengaturan **Home screen tiles** pada halaman Member portal yang sama (`/mobile/b1-mobile`) mengontrol tata letak ubin tersebut. Pilih **Layout**:

- **Grid** -- Dua ubin per baris (default). Jika jumlah ubin ganjil, ubin pertama membentang di seluruh lebar.
- **Scrolling row** -- Satu baris ubin yang digeser anggota ke samping.
- **Scrolling (automatic)** -- Baris geser yang sama, tetapi juga bergerak sendiri, maju satu ubin sekitar setiap empat detik dan kembali ke ubin pertama setelah ubin terakhir. Gerakan ini berhenti saat anggota menyentuh, mengarahkan kursor, atau menggunakan tombol Tab pada baris tersebut, lalu dilanjutkan beberapa detik kemudian. Pada perangkat yang diatur untuk mengurangi gerakan, baris tetap diam dan berfungsi seperti **Scrolling row**.
- **List** -- Daftar dengan thumbnail foto kecil di samping nama setiap tab.

Dalam kedua tata letak bergulir, ketika jumlah ubin melebihi yang muat di layar, deretan titik akan muncul di bawah ubin, satu untuk setiap ubin, dengan titik ubin yang aktif terisi. Anggota dapat mengetuk titik untuk melompat ke ubin tersebut.

Klik **Save** untuk menerapkan.

### Bagian Layar Beranda

Anggota yang sudah masuk selalu melihat riwayat kehadiran dan formulir yang mereka kirimkan di [halaman Me](/docs/b1-church/getting-started/me-page). Sakelar **Home screen sections** pada halaman Member portal yang sama (`/mobile/b1-mobile`) dapat menampilkannya juga di layar Beranda:

- **Show My Attendance on Home** -- Menambahkan bagian **My Attendance** yang berisi jumlah kehadiran anggota dalam 90 hari terakhir, dua kunjungan terbaru mereka, dan tautan **History** ke daftar kehadiran lengkap mereka.
- **Show My Forms on Home** -- Menambahkan bagian **My Forms** yang berisi dua pengiriman formulir terbaru anggota dan tautan **All forms**.

Keduanya dimatikan secara default. Bagian hanya muncul bagi anggota yang sudah masuk dan memiliki setidaknya satu catatan untuk ditampilkan. Klik **Save** untuk menerapkan.

## Di Mana Tab Ini Muncul

Tab yang Anda konfigurasi di sini ditampilkan di **PWA B1.church** yang dipasang anggota Anda dari halaman mana pun di `https://yourchurchname.b1.church`. Perubahan yang Anda buat pada halaman ini akan tercermin saat anggota berikutnya membuka aplikasi.

Di ponsel, bilah tab bawah menampilkan **Home**, hingga tiga tab Anda, dan **More**; di komputer, header menampilkan hingga lima tab. Layar bawaan (seperti Sermons, Giving, atau Groups) mendapat slot terlebih dahulu, dan tab **Internal Page** mengisi slot yang tersisa. Tab **External URL** dan **Verse of the Day** tidak pernah mendapat slot. Setiap tab, termasuk yang tidak muat, tercantum di halaman **More** aplikasi.

Tab yang ditempatkan di dalam tab **Folder** adalah pengecualian: tab tersebut hanya muncul di layar folder itu sendiri, yang dibuka anggota dengan mengetuk folder. Layar itu menampilkan tab sebagai ubin foto jika semuanya memiliki gambar, atau sebagai daftar jika tidak. Folder yang tidak berisi tab yang dapat dilihat anggota disembunyikan dari anggota tersebut. Lihat [Tab Folder](../../b1-church/getting-started/navigating.md#folder-tabs). Lihat [Navigating B1App](../../b1-church/getting-started/navigating.md) untuk mengetahui apa yang dilihat anggota.

## Langkah Selanjutnya

- [Pengaturan Gereja](./church-settings.md) -- Konfigurasi informasi dan identitas merek gereja Anda
- [Peran & Izin](./roles-permissions.md) -- Kelola akses untuk tim Anda
