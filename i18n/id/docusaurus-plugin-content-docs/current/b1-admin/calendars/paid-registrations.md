---
title: "Pendaftaran Berbayar"
description: "Atur pendaftaran acara berbayar di B1 Admin: jenis peserta berharga, tambahan, kode diskon, daftar tunggu, dan pembayaran lewat penyedia pemberian Anda."
---

# Pendaftaran Berbayar

<div class="article-intro">

Pendaftaran acara dapat lebih dari sekadar menghitung jumlah peserta. Anda dapat menentukan jenis peserta dengan harga (seperti Dewasa dan Anak), menawarkan tambahan opsional dengan harga dan jumlahnya sendiri, membuat kode diskon, dan menerima pembayaran saat pendaftaran melalui penyedia pemberian gereja Anda yang sudah ada. Ketika acara penuh, daftar tunggu opsional akan menjaga anggota yang berminat tetap dalam antrean dan memindahkan mereka secara otomatis saat ada tempat yang kosong.

</div>

## Video Pelatihan

<YouTube id="eGSZv24Dlzk" title="Pendaftaran Acara dan Acara Berbayar di B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Aktifkan pendaftaran untuk acara terlebih dahulu — lihat [Membuat Kalender](./creating-calendars.md#enabling-event-registration)
- Untuk menerima pembayaran online, gereja Anda perlu [mengonfigurasi pemberian online](../donations/online-giving-setup.md) (Stripe, PayPal, atau Kingdom Funding). Acara gratis tidak memerlukan pengaturan pemberian. Tanpa pemberian online, pendaftaran berbayar tetap dapat digunakan, tetapi orang membayar langsung ke gereja — lihat [Gereja Tanpa Pemberian Online](#churches-without-online-giving).

</div>

## Membuka Pengaturan Pendaftaran

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di pojok kiri atas), pilih **Calendars > Registrations**, lalu buka acara Anda (atau buka acara dari kalendernya).
2. Kartu **Registration Settings** menampilkan pengaturan dasar — **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags**, dan **Registration Questions**.
3. Di bawah pengaturan dasar terdapat tiga akordion: **Attendee Types**, **Selections**, dan **Discount Codes**.

## Jenis Peserta

Jenis peserta memungkinkan Anda mengenakan harga berbeda untuk setiap kategori peserta — dan membatasi jumlah masing-masing secara terpisah.

1. Buka akordion **Attendee Types** lalu klik **Add Type**.
2. Masukkan **Name** (misalnya "Dewasa", "Anak", "Pelajar").
3. Atur **Price**. Gunakan 0 untuk jenis gratis.
4. Opsional, atur **Capacity** khusus untuk jenis ini (misalnya hanya 20 tempat Anak). Biarkan kosong jika tidak ada batas per jenis.
5. Klik **Save**.

Saat pendaftaran, setiap peserta memilih satu jenis; jenis yang sudah habis ditampilkan sebagai **Sold out** dan tidak dapat dipilih. Daftar peserta menampilkan jenis setiap peserta serta jumlah per jenis yang berjalan.

## Pilihan Tambahan

Pilihan tambahan (selections) adalah add-on berbayar opsional — kaos, paket makan, peningkatan kegiatan.

1. Buka akordion **Selections** lalu klik **Add Selection**.
2. Masukkan **Name**, **Description** (opsional), dan **Price** (0 akan ditampilkan sebagai "Free").
3. Opsional, atur **Capacity** (jumlah total yang tersedia dari semua pendaftaran) dan **Max Qty** (jumlah maksimum yang dapat dipesan dalam satu pendaftaran).
4. Klik **Save**.

Pendaftar memilih jumlah saat mendaftar, dan totalnya dihitung terhadap kapasitas sehingga Anda tidak akan kelebihan penjualan.

## Kode Diskon

1. Buka akordion **Discount Codes** lalu klik **Add Discount Code**.
2. Masukkan **Code** yang akan diketik oleh pendaftar.
3. Pilih **Type** — **Percent** atau **Amount** — dan isi **Value**-nya.
4. Opsional, batasi kode dengan **Start Date** / **End Date**, **Min Members** (jumlah minimum peserta dalam satu pendaftaran), dan **Max Uses**.
5. Klik **Save**.

Setiap kode menampilkan jumlah **Uses** sehingga Anda dapat melihat seberapa sering kode tersebut telah digunakan. Pendaftar langsung mendapat tanggapan saat menerapkan kode — termasuk pesan yang jelas jika kode sudah kedaluwarsa, belum berlaku, atau memerlukan lebih banyak peserta.

## Daftar Tunggu

Aktifkan **Enable Waitlist** di kartu Registration Settings. Ketika acara mencapai kapasitas:

- Pendaftar baru akan ditawari tempat di daftar tunggu alih-alih ditolak. Mereka menyelesaikan proses pendaftaran yang sama (pembayaran dilewati selama masih dalam daftar tunggu).
- Ketika seseorang membatalkan, pendaftaran daftar tunggu yang paling lama akan **dipindahkan secara otomatis** dan menerima email bahwa ada tempat yang tersedia. Jika mereka masih memiliki tagihan, email tersebut akan menautkan mereka ke [My Registrations](../../b1-church/events/my-registrations.md) di situs B1 gereja Anda, tempat mereka dapat menyelesaikan pembayaran.
- Anda dapat memindahkan seseorang secara manual kapan saja dengan tindakan **Promote** pada baris daftar tunggu — berguna setelah menaikkan kapasitas acara.

:::info
Pendaftaran yang dipindahkan tetap *pending* hingga tagihannya dibayar; pembayaran (atau jika tidak ada yang harus dibayar) akan mengonfirmasi pendaftaran tersebut.
:::

## Daftar Peserta Pendaftaran

Buka acara dari halaman Registrations untuk melihat semua pendaftaran. Judul kartu menampilkan berapa banyak pendaftaran yang menempati tempat dibandingkan dengan kapasitas (misalnya *Registrations (18 / 20)*). Hanya pendaftaran pending dan confirmed yang dihitung; ketika ada orang di daftar tunggu, judul akan menambahkan jumlahnya (misalnya *· 3 waitlisted*), dan jumlah yang sama muncul di bawah bilah kapasitas. Tabel menampilkan **Name**, **Members**, **Type** (jenis setiap peserta), **Paid / Total** (dengan peringatan saldo jika masih ada tagihan), **Status**, dan **Date**, serta lencana jumlah per jenis di atas tabel.

- Klik ikon detail pada baris untuk membuka dialog **Registration Details** — anggota, pilihan tambahan, sudah dibayar/saldo, dan tabel **Payments** yang mencantumkan setiap pembayaran (jumlah, metode, tanggal).
- **Export CSV** mengunduh seluruh daftar dengan kolom untuk anggota, jenis peserta, pilihan tambahan, total dibayar/total/saldo, status, dan satu kolom untuk setiap pertanyaan pendaftaran.
- **Add Attendee** mencatat pendaftaran offline atau melalui telepon untuk siapa pun di gereja Anda. Pilih orangnya dan, pada acara berbayar, jenis pesertanya. Kartu mereka tidak akan ditagih: pendaftaran berbayar disimpan sebagai **pending** dengan seluruh jumlah sebagai saldo yang harus dibayar. Jika gereja Anda memiliki pemberian online, orang tersebut dapat membayarnya dari [My Registrations](../../b1-church/events/my-registrations.md); jika tidak, kumpulkan pembayarannya secara langsung. Anda memerlukan izin Registrations Edit untuk menambahkan peserta.

:::info
Pengembalian dana tidak diproses di dalam B1. Jika Anda perlu mengembalikan dana untuk pendaftaran berbayar yang dibatalkan, lakukan pengembalian dana dari dasbor penyedia pemberian Anda (misalnya Stripe).
:::

## Cara Kerja Pembayaran

Pembayaran diproses melalui gateway pemberian yang sama dengan yang sudah digunakan gereja Anda untuk donasi — detail kartu langsung dikirim ke penyedia dan tidak pernah melewati server B1. Harga selalu dihitung di server berdasarkan jenis, pilihan tambahan, dan kode diskon yang Anda konfigurasi, sehingga pendaftar tidak dapat mengubah total. Anggota yang sudah masuk dapat membayar dengan kartu yang tersimpan. Tamu memasukkan kartu saat checkout dan harus mencentang **I'm not a robot** sebelum membayar.

### Gereja Tanpa Pemberian Online

Jika gereja Anda belum mengatur penyedia pemberian, acara berbayar tetap dapat menerima pendaftaran. Langkah pembayaran akan memberi tahu pendaftar bahwa pembayaran online tidak tersedia dan mereka dapat membayar langsung ke gereja, serta tombol **Register and Pay Later** akan menyimpan pendaftaran. Pendaftaran disimpan sebagai **pending** dengan seluruh jumlah sebagai saldo yang harus dibayar, dan muncul di daftar dengan peringatan saldo. Kumpulkan uangnya dengan cara yang biasa dilakukan gereja Anda.

:::info
B1 tidak memiliki cara untuk menandai pembayaran offline sebagai sudah diterima. Saldo yang harus dibayar tetap ada di daftar dan di kartu [My Registrations](../../b1-church/events/my-registrations.md) pendaftar setelah Anda menerima pembayaran, jadi simpan catatan Anda sendiri tentang siapa saja yang sudah membayar.
:::

## Artikel Terkait

- [Membuat Kalender](./creating-calendars.md#enabling-event-registration) — mengaktifkan pendaftaran dan pengaturan dasar
- [Pengaturan Pemberian Online](../donations/online-giving-setup.md) — mengonfigurasi gateway pembayaran yang digunakan saat checkout
- [Mendaftar untuk Acara](../../b1-church/events/registering.md) — apa yang dilihat anggota saat mendaftar
- [My Registrations](../../b1-church/events/my-registrations.md) — cara anggota membayar saldo dan mengedit pendaftaran
