---
title: "Pengaturan Self Check-In dengan B1 Checkin dan B1 Admin"
sidebar_label: "Check-In"
description: "Atur self check-in untuk kebaktian dengan aplikasi B1 Checkin di B1 Admin, mencakup perangkat, akun kiosk, jadwal, branding, dan pendaftaran tamu melalui QR."
---

# Check-In

<div class="article-intro">

B1 Admin mendukung self check-in saat kebaktian melalui aplikasi pendamping **B1 Checkin**. Jemaat dapat melakukan check-in sendiri beserta keluarganya di kiosk atau perangkat khusus saat tiba, sehingga prosesnya lebih cepat dan beban kerja relawan berkurang. Setiap check-in otomatis dicatat sebagai kehadiran.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Kampus, jadwal kebaktian, dan kelompok Anda harus sudah dikonfigurasi di [Pengaturan Kehadiran](setup.md).
- Anda memerlukan [data jemaat di database](../people/adding-people.md) dengan [rumah tangga](../people/adding-people.md#managing-households) yang sudah diatur agar keluarga dapat check-in bersama.
- Anda memerlukan tablet dan, jika diinginkan, printer label Brother (lihat [rekomendasi perangkat keras](#recommended-hardware) di bawah).

</div>

## Cara Kerjanya

Aplikasi B1 Checkin terhubung dengan pengaturan kehadiran di B1 Admin Anda. Saat jemaat melakukan check-in, kehadirannya otomatis dicatat untuk kampus, jadwal kebaktian, dan kelompok yang tepat. Anda tidak perlu memasukkan kehadiran secara manual untuk siapa pun yang menggunakan sistem check-in.

## Mengatur Check-In

1. **Atur struktur kehadiran Anda terlebih dahulu.** Di B1 Admin, buka **People > Attendance** lalu klik **Setup** untuk memastikan kampus, jadwal kebaktian, dan kelompok Anda sudah tersedia. Aplikasi check-in bergantung pada konfigurasi ini. Secara opsional, berikan setiap jadwal kebaktian [jadwal check-in](setup.md#setting-a-check-in-schedule) agar check-in terbuka dan tertutup secara otomatis setiap minggu. Jadwal menggunakan zona waktu kampus tempat kebaktian diadakan, atau zona waktu gereja Anda jika kampus tidak memiliki zona waktu yang ditetapkan. Kiosk menampilkan jadwal kebaktian yang jendela waktunya sudah tertutup sebagai **Closed** dan memberi tahu keluarga kapan check-in dibuka. Lihat [Pengaturan Kehadiran](setup.md) untuk detailnya.
2. **Pasang aplikasi B1 Checkin** pada perangkat yang akan Anda gunakan. Aplikasi ini tersedia untuk platform berikut:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Masuk ke aplikasi B1 Checkin** menggunakan akun yang memiliki izin kehadiran **Checkin** (atau **Edit Attendance**). Lihat [Akun Kiosk Check-In](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Pilih kampus dan jadwal kebaktian** untuk pertemuan saat ini.
5. Jemaat sekarang dapat mencari nama mereka di perangkat dan melakukan check-in.

:::tip
Tempatkan perangkat check-in di lokasi yang terlihat dan mudah dijangkau, seperti pintu masuk lobi atau meja penyambutan. Pengumuman singkat selama kebaktian membantu jemaat mengetahui adanya pilihan ini.
:::

:::tip
Jika gereja Anda memiliki beberapa kampus, Anda perlu mengulangi pengaturan untuk setiap kampus di [Pengaturan Kehadiran](setup.md). Setiap perangkat check-in dapat dikonfigurasi untuk kampus yang berbeda.
:::

## Perangkat Keras yang Direkomendasikan

**Tablet** — semua perangkat berikut berfungsi baik dengan aplikasi ini:

- **Ukuran kecil:** Samsung Galaxy Tab A7 Lite 8.7"
- **Layar besar:** Samsung Galaxy Tab A8 10.5"
- **Anggaran terbatas:** Amazon Fire HD 10

**Printer** — check-in bekerja dengan printer label Brother untuk mencetak tanda nama:

- **Terbaik:** Brother QL-1110NWB (mendukung beberapa tablet melalui Bluetooth dan WiFi)
- **Baik:** Brother QL-810W (mendukung beberapa tablet melalui WiFi)
- **Anggaran terbatas:** Brother QL-1100 (hanya WiFi)

**Label:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Hanya printer label Brother yang kompatibel dengan aplikasi B1 Checkin. Merek printer lain tidak akan berfungsi untuk mencetak tanda nama.
:::

:::info
Ikuti petunjuk pengaturan printer Anda untuk menghubungkannya ke jaringan WiFi yang sama dengan tablet Anda. Anda dapat menemukan driver printer Brother dan panduan pengaturan di [situs dukungan Brother](https://support.brother.com).
:::

## Menyesuaikan Tampilan Kiosk

Anda dapat menyesuaikan tampilan aplikasi B1 Checkin agar sesuai dengan branding gereja Anda. Di B1 Admin, buka **Mobile > B1 CheckIn** lalu gunakan kartu **Kiosk Theme** untuk mengatur:

### Warna

Sesuaikan delapan pengaturan warna agar sesuai dengan branding gereja Anda:

- **Primary** dan **Primary Contrast** -- Warna merek utama dan warna teksnya.
- **Secondary** dan **Secondary Contrast** -- Warna aksen dan warna teksnya.
- **Header Background** dan **Subheader Background** -- Warna untuk area header kiosk.
- **Button Background** dan **Button Text** -- Warna untuk tombol interaktif.

### Gambar Latar Belakang

Unggah gambar latar belakang opsional untuk layar selamat datang dan pencarian kiosk. Ukuran yang disarankan adalah 1920x1080 piksel.

### Layar Diam / Screensaver

Atur screensaver yang aktif setelah periode tidak ada aktivitas:

1. Aktifkan atau nonaktifkan layar diam.
2. Atur **timeout** (berapa detik tidak ada aktivitas sebelum screensaver dimulai, minimal 10 detik).
3. Tambahkan satu atau beberapa **slide** -- setiap slide memiliki gambar dan durasi tampil (minimal 3 detik).

:::tip
Gunakan layar diam untuk menampilkan pengumuman, acara mendatang, atau pesan selamat datang ketika kiosk tidak sedang digunakan.
:::

## Pendaftaran Tamu melalui Kode QR

Kiosk check-in dapat menampilkan kode QR yang dipindai pengunjung untuk mendaftarkan diri dan keluarganya melalui ponsel mereka sendiri. Ini mempercepat proses check-in untuk tamu yang pertama kali datang.

Ketika tamu memindai kode QR, mereka akan diarahkan ke [halaman pendaftaran tamu](../../b1-church/checkin/guest-registration.md) tempat mereka memasukkan nama keluarganya dan detail lain yang Anda pilih untuk ditanyakan. Relawan kemudian dapat mencari mereka di kiosk dan melakukan check-in.

### Mengaktifkan Pendaftaran Tamu QR

Untuk menyalakan tampilan kode QR:

1. Di B1 Admin, buka [Menu Lompat](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas) dan perluas **Mobile**.
2. Klik **B1 CheckIn**.
3. Aktifkan **QR Guest Registration** lalu klik **Save**.

:::note
Pengaturan ini berada di **Mobile > B1 CheckIn** (halaman yang sama dengan kartu **Kiosk Theme**), bukan di Attendance. Tindakan **Kiosk** di halaman Attendance memiliki tautan ke halaman ini.
:::

Setelah sakelar diaktifkan, opsi lainnya di bawah akan muncul pada kartu **QR Guest Registration** yang sama. Klik **Save** pada kartu tersebut setelah mengubah salah satu opsi.

### Memilih Kolom Pendaftaran

Daftar centang **Sign-up fields** mengatur apa yang diminta formulir pendaftaran. **First Name** dan **Last Name** selalu ada di formulir dan selalu wajib diisi untuk setiap anggota keluarga. Untuk setiap kolom lain, aktifkan **Include** untuk menambahkannya ke formulir, lalu aktifkan **Required** jika tamu wajib mengisinya. **Required** hanya dapat diaktifkan untuk kolom yang disertakan, dan menonaktifkan **Include** akan menghapus pengaturan **Required**.

| Kolom | Diminta untuk | Disertakan secara default |
|-------|---------------|---------------------------|
| **Title** | Setiap anggota keluarga, sebagai menu tarik-turun di depan nama (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Tidak |
| **Email** | Hanya kontak utama | Ya (opsional) |
| **Phone** | Setiap anggota keluarga. Jika wajib, hanya kontak utama yang harus mengisinya. | Ya (opsional) |
| **Household role** | Setiap anggota keluarga selain kontak utama -- Spouse, Child, atau Other. Kontak utama adalah kepala rumah tangga baru. Anggota tanpa peran akan disimpan sebagai Other. | Ya (opsional) |
| **Home address** | Sekali untuk keluarga -- jalan, alamat baris 2, kota, provinsi, dan kode pos. Jika wajib, semua kecuali alamat baris 2 harus diisi. Alamat disimpan pada setiap anggota keluarga. | Tidak |
| **Birth date** | Setiap anggota keluarga | Tidak |
| **Gender** | Setiap anggota keluarga | Tidak |
| **Marital status** | Hanya kontak utama | Tidak |
| **Grade** | Setiap anggota keluarga (PreK hingga 12, atau Graduated) | Tidak |
| **Comments** | Sekali, dalam kotak di bawah anggota keluarga (maksimal 1.000 karakter) | Tidak |

Kolom yang Anda nonaktifkan tidak pernah disimpan, bahkan jika seseorang mengirimkannya ke pendaftaran dengan cara lain. Komentar disimpan sebagai catatan pada data kontak utama (dicatat sebagai "Guest sign-up"), sehingga Anda dapat membacanya di bagian **Notes** pada profilnya.

### Menambahkan Tamu ke Kelompok

Gunakan **Add new guests to group** untuk memasukkan semua orang yang mendaftar ke salah satu kelompok Anda secara otomatis -- misalnya kelompok "Newcomers" atau kelompok untuk acara akhir pekan ini. Pilih **None** (default) untuk melewatkan langkah ini. Tamu tidak pernah melihat atau memilih kelompok; kelompok hanya ditetapkan di sini. Ubah sebelum setiap acara agar Anda dapat menindaklanjuti tamu acara tersebut bersama-sama.

### Mencatat Kehadiran

Ketika sebuah kelompok dipilih, sakelar **Also record attendance** akan muncul. Aktifkan untuk menandai tamu hadir saat mereka mendaftar, sehingga Anda tidak perlu melakukan check-in secara terpisah.

Kehadiran hanya dicatat jika pendaftaran terjadi selama salah satu jadwal kebaktian **terjadwal** dari kelompok yang dipilih:

- Kelompok harus ditautkan ke satu atau beberapa jadwal kebaktian, dan jadwal tersebut harus memiliki [jadwal check-in](setup.md#setting-a-check-in-schedule) (**Day** dan **Start Time**).
- "Selama" berarti berada dalam jendela check-in jadwal kebaktian tersebut -- dari menit **Open check-in** sebelum waktu mulai hingga menit **Close check-in** setelah waktu selesai (atau setelah waktu mulai, jika tidak ada waktu selesai; jika tidak ada waktu selesai maupun menit penutupan, hingga akhir hari tersebut), dalam zona waktu yang sama dengan yang digunakan jadwal check-in.
- Setiap anggota keluarga ditandai hadir dalam kelompok untuk setiap jadwal kebaktiannya yang sedang terbuka pada saat itu, pada tanggal hari ini.
- Pendaftaran pada waktu lain, atau untuk kelompok yang jadwal kebaktiannya tidak memiliki jadwal, akan ditambahkan ke kelompok tetapi tidak dihitung sebagai kehadiran.

### Foto Header

Di bawah **Header photo**, klik **Change photo** untuk memilih atau mengunggah gambar (dipotong dengan rasio 16:9) yang akan ditampilkan di bagian atas halaman pendaftaran sebagai pengganti ikon default. Klik **Remove** untuk kembali ke ikon.

### Membagikan Tautan Pendaftaran

Setelah QR Guest Registration diaktifkan, bagian **Share registration QR code** akan muncul di bagian bawah kartu. Ini memberi Anda dua cara untuk membawa tamu ke formulir pendaftaran selain kode QR di kiosk:

- **Copy link** — menyalin URL pendaftaran sehingga Anda dapat menempelkannya di situs web gereja, dalam email, atau di mana pun secara daring.
- **Download PNG** — mengunduh kode QR sebagai gambar yang dapat Anda cetak pada brosur, buletin, atau papan informasi.

:::tip
Tambahkan tautan pendaftaran ke halaman "Rencanakan Kunjungan Anda" atau "Saya Baru" di situs web gereja Anda agar tamu dapat mendaftar bahkan sebelum mereka tiba.
:::

### Apa yang Terjadi Setelah Tamu Mendaftar

B1 pertama-tama mencari orang yang sudah ada di **People**. Anggota keluarga akan dicocokkan dengan orang yang sudah ada jika tepat satu orang memiliki nama depan yang sama dan email atau nomor telepon yang sama. Anak yang dimasukkan tanpa email atau telepon dicocokkan berdasarkan nama depan di dalam rumah tangga yang sudah cocok. Orang yang cocok digunakan kembali apa adanya -- pendaftaran tidak pernah mengubah detail atau status keanggotaan mereka -- dan siapa pun yang baru akan bergabung ke rumah tangga yang cocok.

Jika tidak ada yang cocok, pendaftaran akan membuat rumah tangga baru yang dinamai sesuai nama belakang kontak utama, dengan data jemaat untuk setiap anggota keluarga. Semua orang baru ditambahkan ke **People** dengan status keanggotaan **Visitor**, dengan kontak utama sebagai kepala rumah tangga.

Baik orang yang cocok maupun yang baru ditambahkan ke kelompok yang Anda pilih (jika belum tergabung di dalamnya) dan kehadiran mereka dicatat jika fitur tersebut diaktifkan. Komentar disimpan sebagai catatan pada kontak utama.

Untuk menindaklanjuti secara otomatis, tambahkan [pemicu alur kerja](../serving/workflows.md#triggers) seperti **Person · Created** dengan kondisi *Membership Status is Visitor*, atau **Group · Member Joined** untuk kelompok yang Anda pilih di atas.

## Data yang Dicatat

Setiap check-in membuat catatan kehadiran di B1 Admin. Anda dapat melihat catatan ini di halaman [Attendance](tracking-attendance.md) dan di setiap [sesi kelompok](../groups/group-members.md), sama seperti kehadiran yang dimasukkan secara manual. Tidak ada perbedaan dalam cara data ditampilkan — kedua metode memasukkan data ke laporan yang sama.
