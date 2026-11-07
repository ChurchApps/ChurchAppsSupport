---
title: "Pengaturan Kehadiran"
---

# Pengaturan Kehadiran

<div class="article-intro">

Sebelum Anda dapat mencatat kehadiran, Anda perlu memberi tahu B1 Admin tentang lokasi fisik gereja Anda, kapan ibadah diadakan, dan kelompok mana yang bertemu di setiap ibadah. Pengaturan satu kali ini membuat struktur yang menjadi dasar seluruh pencatatan dan pelaporan kehadiran di gereja Anda.

</div>

## Video Pelatihan

<YouTube id="LQPc2gVlXvQ" title="Mengatur Ibadah dan Kehadiran di B1" next="Mengatur Check-In Anak di B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan akun B1 Admin yang aktif dengan izin kehadiran **Edit Services**. Opsi **Setup** hanya muncul bagi orang yang memiliki izin tersebut; hanya melihat kehadiran tidak cukup. Lihat [Peran & Izin](../people/roles-permissions.md) jika Anda tidak yakin dengan tingkat akses Anda.
- Jika Anda berencana menetapkan kelompok ke waktu ibadah, pastikan [kelompok Anda sudah dibuat](../groups/creating-groups.md) terlebih dahulu.

</div>

## Konsep Utama

- **Campus** -- lokasi fisik tempat gereja Anda berkumpul (misalnya, "Main Campus," "North Campus"). Campus dikelola di bawah **Settings**.
- **Service** -- kegiatan berulang di sebuah campus (misalnya, "Sunday Service," "Midweek").
- **Service Time** -- waktu tertentu saat sebuah ibadah berlangsung (misalnya, "9:00 AM," "11:00 AM").
- **Scheduled Group** -- kelompok yang ditetapkan ke waktu ibadah tertentu. Kehadiran dicatat dalam konteks ibadah tersebut.
- **Unscheduled Group** -- kelompok yang mencatat kehadirannya sendiri, tanpa dikaitkan dengan waktu ibadah.

## Mengatur Struktur Kehadiran Anda

1. Buka **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), lalu perluas **People**.
2. Klik **Attendance**, lalu klik **Setup** di kolom kiri. Tabel **Service structure** akan terbuka, dengan jumlah campus, waktu ibadah, serta kelompok terjadwal dan tidak terjadwal di bagian atas. Jumlah ini diperbarui begitu Anda menambah, mengedit, atau menghapus sesuatu di tabel.
3. Klik **Manage Campuses** (kanan atas panel **Service structure**). Anda akan diarahkan ke **Settings → Campuses**. Klik **Add Campus**, masukkan nama lokasi Anda (alamat dan zona waktu bersifat opsional), lalu klik **Save**.
4. Kembali ke **People → Attendance** dan klik **Setup**. Campus Anda kini muncul di tabel pengaturan.
5. Klik tombol **+ di kolom Service** di bawah campus Anda. Masukkan nama ibadah seperti "Sunday Service" lalu klik **Save**.
6. Klik tombol **+ di kolom Time** di bawah ibadah tersebut. Masukkan nama **Service Time** seperti "9:00 AM", isi [jadwal check-in](#setting-a-check-in-schedule) jika diinginkan, lalu klik **Save**. Ulangi untuk setiap waktu ibadah.
7. Untuk menghubungkan kelompok ke waktu ibadah, buka kelompok dari **People > Groups**, klik **Edit**, lalu gunakan **Add Service Time** -- lihat bagian berikutnya.

### Mengaktifkan Track Attendance pada Kelompok

Sebelum kehadiran dapat dicatat untuk sebuah kelompok, Track Attendance harus diaktifkan untuk kelompok tersebut.

1. Di menu Jump, pilih **People > Groups** lalu pilih kelompoknya.
2. Klik tombol **Edit** di bawah nama kelompok.
3. Atur **Track Attendance** ke **Yes**.
4. Klik **Save**.

:::tip
Jika Anda menetapkan kelompok ke waktu ibadah pada langkah sebelumnya, gunakan juga opsi **Add Service Time** di layar edit kelompok untuk menautkannya ke ibadah yang tepat. Ini memastikan sesi terhubung dengan campus dan waktu yang benar.
:::

:::tip
Jika sebuah kelompok bertemu di luar ibadah reguler -- seperti kelompok kecil tengah minggu yang mencatat kehadirannya sendiri -- Anda dapat membiarkannya sebagai kelompok tidak terjadwal. Kelompok tersebut tetap muncul di laporan **Group Attendance** untuk pelaporan kehadiran.
:::

## Mengatur Jadwal Check-in

Setiap waktu ibadah dapat memiliki jadwal check-in opsional agar [self check-in](check-in.md) terbuka dan tertutup sendiri setiap minggu. Tanpa jadwal, check-in untuk waktu ibadah tersebut tetap tersedia kapan saja (selama ruangan tidak ditutup karena alasan lain, seperti sudah penuh).

1. Di tampilan **Setup**, klik nama waktu ibadah di kolom **Time** (atau tambahkan yang baru).
2. Di bawah **Check-in Schedule**, pilih **Day** dalam minggu saat waktu ibadah tersebut diadakan.
3. Atur **Start Time** dan, jika diinginkan, **End Time**.
4. Masukkan **Open check-in (minutes before start)** -- misalnya, `30` membuka check-in setengah jam sebelum ibadah dimulai.
5. Masukkan **Close check-in (minutes after end)** -- misalnya, `15` membuat check-in tetap terbuka selama 15 menit setelah waktu selesai. Jika Anda tidak mengatur waktu selesai, angka ini dihitung dari waktu mulai. Jika **End Time** dan **Close check-in** sama-sama dikosongkan, check-in tetap terbuka hingga akhir hari tersebut.
6. Klik **Save**.

Jadwal ini berulang setiap minggu dan dihitung menurut zona waktu campus ibadah tersebut. Jika campus itu tidak memiliki zona waktu, [Time Zone](../settings/church-settings.md#time-zone) gereja Anda yang digunakan, lalu zona waktu campus pertama yang memilikinya, dan terakhir waktu Eastern (America/New_York). Jika check-in terbuka pada jam yang salah, periksa **Time Zone** pada campus di [Campuses](../settings/campuses.md). Untuk menghapus jadwal, atur **Day** kembali ke **No schedule** lalu klik **Save**. Jadwal hanya berlaku jika **Day** dan **Start Time** sama-sama diatur.

Saat jendela check-in untuk sebuah waktu ibadah tertutup:

- **Self check-in di B1.church** menampilkan waktu ibadah tersebut sebagai **Closed** (atau, misalnya, **Closed · opens Sun 9:30 AM**) dan tidak dapat dipilih. Jika tidak ada waktu ibadah yang terbuka, keluarga akan melihat kapan check-in dibuka, misalnya "Check-in opens Sun 9:30 AM."
- **Aplikasi kiosk B1 Checkin** juga menampilkan waktu ibadah sebagai **Closed** beserta waktu pembukaannya. Jika semua waktu untuk sebuah ibadah tertutup, kiosk akan menampilkan kapan check-in untuk ibadah tersebut dibuka. Seseorang yang sudah check-in ke waktu ibadah yang kini tertutup akan melihat kelompoknya dengan status **Checked in**. Jika jendela tertutup di tengah proses check-in, kiosk tidak akan menyelesaikannya dan menampilkan layar **Can't check in yet** yang mencantumkan ruangan terkait sehingga keluarga dapat memilih ruangan lain.

Rumah tangga yang sudah check-in untuk waktu ibadah sebelumnya tetap dapat kembali dan menambahkan waktu ibadah berikutnya yang terbuka, meskipun jendela waktu sebelumnya sudah tertutup. Riwayat check-in mereka yang ada tetap disimpan.

:::tip
Atur jendela pembukaan yang longgar (misalnya, 45 menit sebelum mulai) agar keluarga dan relawan yang datang lebih awal dapat check-in, dan jendela penutupan yang singkat agar peserta yang terlambat tetap dapat check-in setelah ibadah dimulai.
:::

## Mengedit Pengaturan Anda

Anda dapat memperbarui pengaturan kapan saja. Pilih campus, waktu ibadah, atau kelompok lalu klik **Edit** untuk mengubah detailnya, atau **Delete** untuk menghapusnya.

:::info
Menghapus waktu ibadah tidak menghapus catatan kehadiran sebelumnya. Data historis Anda tetap tersimpan meskipun Anda mengubah jadwal.
:::

## Langkah Selanjutnya

Setelah campus, waktu ibadah, dan kelompok Anda siap, Anda dapat mulai [mencatat kehadiran](recording-attendance.md) secara manual atau mengatur [self check-in](check-in.md) untuk ibadah Anda.
