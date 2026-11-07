---
title: "Melacak Kehadiran"
---

# Melacak Kehadiran

<div class="article-intro">

Setelah kampus, waktu ibadah, dan kelompok Anda dikonfigurasi, B1 Admin memudahkan Anda meninjau data kehadiran dan melihat tren. Halaman Attendance dibuka dengan ringkasan kehadiran minggu ini, dan laporan **All years** menyediakan dua tampilan utama -- tab **Attendance Trend** untuk tren seluruh gereja dan tab **Group Attendance** untuk detail tingkat kelompok. Gunakan alat ini untuk memahami pola pertumbuhan, mengidentifikasi keterlibatan yang menurun, dan membuat keputusan berbasis data untuk gereja Anda.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Struktur kehadiran Anda harus sudah disiapkan dengan setidaknya satu kampus dan satu waktu ibadah. Lihat [Pengaturan Kehadiran](setup.md) jika Anda belum melakukannya.
- Data kehadiran perlu dicatat sebelum laporan menampilkan hasil. Data dapat berasal dari [entri manual](recording-attendance.md) atau [check-in mandiri](check-in.md).

</div>

## Melihat Tren Kehadiran

1. Buka **B1 Admin**, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **People**, lalu klik **Attendance**.
2. Klik **All years** di kolom kiri. Tab **Attendance Trend** dipilih secara default.
3. Laporan berjalan otomatis saat tab dibuka, menampilkan total kehadiran untuk setiap minggu.

:::tip
Untuk melihat sekilas minggu ini, halaman Attendance utama menampilkan berapa orang yang hadir minggu ini, rincian per ruangan (kelompok), jumlah tamu, dan diagram batang check-in selama 13 minggu -- tanpa perlu membuat laporan.
:::

## Memfilter Data Anda

Gunakan filter di kotak **Filter Report** untuk mempersempit hasil, lalu klik **Run Report**:

- **Campus** -- pilih kampus untuk melihat kehadiran hanya di lokasi tersebut.
- **Service** -- batasi laporan ke satu ibadah.
- **Service Time** -- pilih waktu ibadah untuk melihat pertemuan tertentu secara lebih rinci.
- **Group** -- tampilkan kehadiran untuk satu kelompok.
- **Start Date** dan **End Date** -- rentang tanggal yang disertakan. Secara default, laporan mencakup satu tahun terakhir, dari satu tahun lalu hingga hari ini, dan tanggal akhir disertakan sepenuhnya.

Laporan menampilkan diagram batang dan tabel total kunjungan per minggu. Setiap minggu diberi label dengan tanggal hari Minggu pada minggu tersebut. Tabel juga memiliki kolom **Session Dates** yang mencantumkan tanggal sebenarnya dalam minggu itu yang memiliki kehadiran (misalnya "9/27, 9/30"), sehingga Anda dapat melihat kapan pertemuan tengah minggu dihitung dalam minggu yang sama dengan hari Minggu.

:::info
Laporan berjalan otomatis setiap kali Anda membuka tab Attendance Trend, sehingga Anda selalu melihat angka terbaru tanpa perlu mengklik tombol refresh.
:::

## Kehadiran Kelompok

Tab **Group Attendance** menampilkan siapa saja yang hadir di setiap sesi kelompok. Ini berguna ketika Anda ingin memantau kelas, tim pelayanan, atau kelompok kecil tertentu, bukan hanya angka ibadah secara keseluruhan.

1. Pada laporan **All years**, pilih tab **Group Attendance**.
2. Opsional: pilih **Campus** dan **Service**.
3. Atur **Start Date** dan **End Date**. Secara default, laporan mencakup dari hari Minggu terakhir hingga hari ini.
4. Klik **Run Report**.

Hasil dikelompokkan berdasarkan tanggal sesi, lalu berdasarkan waktu ibadah dan kelompok, dengan orang-orang yang hadir tercantum di bawah setiap kelompok. Waktu ibadah, kelompok, dan nama diurutkan secara alfabetis sehingga setiap judul hanya muncul sekali. Baris setiap orang juga menampilkan kolom **Checked In** dengan waktu saat kehadiran mereka dicatat (kosong jika tidak ada waktu yang tersimpan) dan kolom **Membership Status** (misalnya Member atau Visitor), sehingga Anda dapat dengan cepat mengenali tamu.

Untuk mengunduh data, klik **Download Options** dan pilih **Summary**. File CSV memiliki satu baris untuk setiap anggota kelompok, diurutkan berdasarkan kelompok lalu nama, dan satu kolom untuk setiap sesi berdasarkan tanggal dalam rentang tersebut (misalnya "Sunday - 9:00 AM (2026-09-27)") yang ditandai **present** atau **absent**.

:::tip
Kehadiran kelompok sangat berguna bagi pemimpin [kelompok kecil](../groups/creating-groups.md) yang ingin melacak keterlibatan dalam kelompok mereka dari waktu ke waktu.
:::

## Tips Menggunakan Data Kehadiran

- Tinjau tren setiap bulan untuk mengenali pola musiman lebih awal.
- Bandingkan data tingkat kampus untuk memahami lokasi mana yang bertumbuh.
- Gunakan laporan tingkat kelompok untuk menindaklanjuti [kelompok](../groups/group-members.md) yang menunjukkan kehadiran menurun.
- Gabungkan wawasan kehadiran dengan alat [AI Search](../people/ai-search.md) untuk menemukan orang-orang yang belum hadir baru-baru ini.

## Halaman Terkait

- [Mencatat Kehadiran](recording-attendance.md) -- memasukkan kehadiran secara manual untuk sesi kelompok
- [Headcount Entry & Trend](headcount-entry.md) -- alternatif yang lebih sederhana untuk penghitungan total, dengan diagram tren mingguan tersendiri
- [Check-In](check-in.md) -- siapkan check-in mandiri agar kehadiran tercatat secara otomatis
