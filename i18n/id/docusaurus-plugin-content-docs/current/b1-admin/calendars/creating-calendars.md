---
title: "Membuat Kalender"
description: "Buat kalender di B1 Admin, hubungkan grup atau impor file .ics, dan kelola acara, pendaftaran, dan catatannya dari satu tempat."
---

# Membuat Kalender

<div class="article-intro">

Membuat kalender di B1 Admin memungkinkan Anda menyusun tampilan acara yang terkurasi dengan menghubungkan satu atau beberapa grup. Acara dikelola oleh pemimpin grup di dalam grup mereka masing-masing, dan kalender Anda menampilkan acara-acara tersebut di satu tempat. Admin dengan akses edit dapat menambah atau mengubah acara untuk grup mana pun. Pemimpin grup yang bukan admin hanya dapat mengelola acara untuk grup yang mereka pimpin.

</div>

## Video Pelatihan

<YouTube id="Ko3kgsCSLFs" title="Membuat Kalender, Acara, dan Pemesanan Ruangan di B1" next="Pendaftaran Acara dan Acara Berbayar di B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Siapkan [grup](../groups/creating-groups.md) yang acaranya ingin Anda sertakan dalam kalender
- Anda memerlukan akses administratif ke bagian Calendars di B1 Admin

</div>

## Membuat Kalender Baru

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Calendars**, lalu klik **Calendars**.
2. Klik **Add Calendar** di bagian atas halaman. Formulir kalender baru akan terbuka di bawah daftar kalender.
3. Masukkan **nama** untuk kalender Anda (misalnya, "Acara Pelayanan Remaja" atau "Kalender Gereja Utama").
4. Tambahkan **deskripsi** opsional agar tim Anda memahami tujuan kalender ini.
5. Klik **Create** untuk menyimpan kalender baru Anda.

## Halaman Detail Kalender

Setelah membuat kalender, klik **Manage Events** pada barisnya untuk membuka halaman detail. Halaman ini memiliki dua area utama:

- **Kolom kiri** -- Nama kalender beserta tindakannya (**New Event**, **Edit**, **Import .ics**, dan **Print**), diikuti daftar **Groups in Calendar** yang menunjukkan grup mana saja yang termasuk dalam kalender ini. Klik **Remove** di samping grup untuk mengeluarkannya dari kalender.
- **Area utama** -- Tampilan **Calendar Events** yang menampilkan acara dari grup yang terhubung, dengan tombol **Subscribe** dan **Add Group** di atasnya.

## Menghubungkan Grup

Grup yang memiliki acara di kalender akan otomatis muncul dalam daftar **Groups in Calendar** di sisi kiri halaman detail.

1. Klik **Add Group** di atas kalender untuk mengaitkan grup dengan kalender Anda.
2. Pilih grup dari menu tarik-turun. Daftar ini mencakup semua grup di gereja Anda, tidak hanya grup yang Anda ikuti.
3. Pilih apakah akan menyertakan **all events** dari grup tersebut atau hanya **specific events**.
4. Klik **Save**.

Setiap acara hanya muncul sekali di kalender. Jika Anda menambahkan seluruh grup, acara-acaranya yang sebelumnya sudah ditambahkan satu per satu akan digabungkan ke dalam entri grup. Memilih acara tertentu dari grup yang sudah ada di kalender tidak akan menambahkan apa pun. Hanya grup yang ditambahkan secara utuh yang dicantumkan di bawah **Groups in Calendar**.

### Mengimpor File .ics

Klik **Import .ics** untuk membawa acara dari kalender lain. Pilih **Group** tempat acara tersebut seharusnya berada, lalu klik **Choose .ics file** atau tempel isi file tersebut, dan klik **Import**. Acara akan dibuat di grup tersebut, dan grup itu ditambahkan ke kalender tempat Anda melakukan impor, sehingga acaranya langsung tampil di sana.

### Menghapus Acara dari Kalender

Klik acara di kalender, lalu klik **Remove from Calendar**. Ini hanya menghapus acara dari kalender ini -- acara itu sendiri tetap berada di grupnya. Jika acara ada di kalender karena seluruh grupnya ditambahkan, menghapusnya akan mengeluarkan semua acara grup tersebut dari kalender ini (acara-acaranya tetap ada di grup). Untuk menghapus acara secara permanen, hapuslah dari [kalender grup](../groups/group-calendar.md).

:::tip
Menghubungkan grup ke kalender Anda adalah cara yang ampuh untuk mengumpulkan acara secara otomatis. Ketika pemimpin grup menambahkan acara ke [grup](../groups/creating-groups.md) mereka, acara tersebut dapat masuk ke kalender seluruh gereja tanpa tambahan kerja dari Anda.
:::

:::info
Jika Anda ingin membuat satu kalender yang mengambil acara dari banyak grup di seluruh gereja, lihat [Kalender Terkurasi](./curated-calendar.md) untuk pendekatan yang lebih ringkas.
:::

## Menambah dan Mengubah Acara {#adding-and-editing-events}

Klik **New Event** pada halaman detail kalender untuk menambah acara, atau klik acara di kalender lalu klik **Edit** untuk mengubahnya. Formulir **New Event** / **Edit Event** memiliki kolom-kolom berikut:

- **Group** -- Grup tempat acara ini berada. Jika gereja Anda memiliki templat acara, Anda juga dapat memilih **Template** untuk mengisi formulir.
- **Title**
- **Event photo** -- Klik **Add Photo** (atau kotak foto kosong) untuk memilih atau mengunggah gambar, yang akan dipotong dengan rasio lebar 16:9. Klik **Change Photo** untuk menggantinya. Foto ditampilkan di bagian atas halaman acara di situs web Anda dan sebagai kartunya ketika elemen Calendar menampilkan **Upcoming events** (lihat [Menampilkan Acara di Situs Web Anda](#showing-events-on-your-website)).
- **Description** -- Ditampilkan di halaman acara di situs web Anda. Teks tebal, daftar, dan tautan didukung.
- **Start** dan **End**, **Repeats**, serta **Visibility** (**Public** atau **Private**).
- **Tags** -- Label dipisahkan koma, misalnya `youth, students`. Elemen Calendar di situs web Anda dapat diatur untuk hanya menampilkan acara dengan tag tertentu. Ini adalah kolom **Tags** yang sama dengan yang ada di pengaturan pendaftaran acara.
- **Who can view notes** dan **Who can post notes** -- Siapa yang dapat membaca dan menambahkan catatan acara (lihat [Catatan Acara](#event-notes)). Pilih **Staff only** (bawaan), **Group leaders** (pemimpin grup acara), atau **Group members** (semua anggota grup acara, termasuk pemimpinnya).
- **Rooms** dan **Resources** -- Pesan ruang dan peralatan untuk acara. Lihat [Ruangan, Sumber Daya & Penjadwalan](./rooms-resources.md).

Klik **Save**. Jika acara berulang, B1 akan meminta konfirmasi Anda, karena menyimpan perubahan akan memperbarui setiap kejadian dalam seri tersebut.

### Catatan Acara {#event-notes}

Setiap acara memiliki utas catatan sendiri untuk perencanaan dan tindak lanjut. Klik acara di halaman detail kalender; dialog akan menampilkan detail acara, pengingatnya, dan **Notes** di bawahnya. Ketik catatan dan kirimkan untuk menambahkannya ke utas.

Staf yang memiliki izin untuk mengedit konten atau mengelola kalender selalu dapat membaca dan menulis catatan acara. Pengaturan **Who can view notes** dan **Who can post notes** pada acara menentukan apakah pemimpin atau anggota grup acara juga dapat melakukannya.

### Menampilkan Acara di Situs Web Anda {#showing-events-on-your-website}

Untuk menampilkan kalender di situs web Anda, tambahkan elemen **Calendar** ke sebuah halaman dan pilih kalender ini. Elemen tersebut dapat menampilkan kalender bulanan atau kisi kartu acara mendatang, dan dapat dibatasi hanya untuk acara dengan satu tag tertentu. Pengunjung yang mengklik acara akan membuka halaman acara tersendiri. Lihat [Menggunakan elemen Calendar](../website/page-editor.md#using-the-calendar-element).

## Mengaktifkan Pendaftaran Acara {#enabling-event-registration}

Anda dapat mengaktifkan pendaftaran untuk acara kalender mana pun agar anggota dapat mendaftar melalui situs web B1 atau aplikasi seluler.

1. Klik acara yang sudah ada atau buat acara baru.
2. Di editor acara, aktifkan **Registration**.
3. Atur pengaturan pendaftaran:
   - **Capacity** (opsional) -- Tetapkan jumlah pendaftaran maksimum. Biarkan kosong untuk tanpa batas.
   - **Registration Opens** -- Tanggal dan waktu ketika pendaftaran mulai tersedia.
   - **Registration Closes** -- Tanggal dan waktu ketika pendaftaran ditutup.
   - **Tags** -- Label dipisahkan koma (misalnya, "youth, retreat, vbs") untuk membantu mengelompokkan acara yang dapat didaftari.
   - **Registration Questions** -- Opsional, lampirkan [formulir](../forms/creating-forms.md) agar pendaftar menjawab pertanyaan tambahan (pantangan makanan, ukuran kaus, kontak darurat, dan lainnya) sebagai bagian dari proses pendaftaran. Pilih **None** untuk melewati pertanyaan.
   - **Enable Waitlist** -- Ketika acara penuh, izinkan pendaftar tambahan bergabung dalam daftar tunggu alih-alih ditolak. Lihat [Pendaftaran Berbayar](./paid-registrations.md#waitlist).
4. Simpan acara.

Untuk acara berbayar, halaman pengaturan yang sama memungkinkan Anda menentukan **Attendee Types** dengan harga, **Selections** opsional (tambahan), dan **Discount Codes**, dengan pembayaran yang diproses melalui penyedia donasi gereja Anda. Lihat [Pendaftaran Berbayar](./paid-registrations.md) untuk panduan lengkapnya.

Setelah pendaftaran diaktifkan, anggota akan melihat tombol **Register for this Event** ketika mereka membuka acara di [B1.church atau di Aplikasi B1](../../b1-church/events/registering.md). Jika Anda melampirkan formulir, pendaftar akan melihat langkah **Questions** selama pendaftaran dan jawaban mereka akan disimpan bersama pendaftaran mereka.

:::info
Pertanyaan Pendaftaran hanya berfungsi dengan formulir yang **tidak** ditandai sebagai Restricted. Formulir terbatas akan dilewati secara otomatis selama pendaftaran alih-alih ditampilkan, jadi gunakan formulir yang tidak dibatasi ketika melampirkan pertanyaan ke acara.
:::

### Mengelola Pendaftaran

Untuk melihat dan mengelola pendaftaran acara Anda:

1. Di menu Jump, pilih **Calendars > Registrations**.
2. Anda akan melihat tabel semua acara dengan pendaftaran aktif, yang menampilkan judul acara, tanggal, jumlah pendaftaran saat ini dibanding kapasitas, dan tag.
3. Klik acara untuk melihat daftar lengkap pendaftaran, termasuk nama, jumlah anggota, jenis peserta, status pembayaran, dan tanggal pendaftaran.
4. Dari halaman detail, Anda dapat:
   - **Add Attendee** -- Mendaftarkan seseorang secara manual yang mendaftar secara luring atau melalui telepon.
   - **Cancel** pendaftaran individual
   - **Delete** pendaftaran secara permanen
   - **Promote** pendaftaran dari daftar tunggu ketika ada tempat yang kosong
   - **Export CSV** -- Unduh semua pendaftaran, termasuk jenis peserta, pilihan, jumlah pembayaran, dan jawaban pertanyaan

Jika acara memiliki Pertanyaan Pendaftaran yang dilampirkan, halaman detail juga menampilkan filter **Unanswered questions only** untuk dengan cepat menemukan pendaftar yang belum mengirimkan jawaban, serta tombol **View Answers** pada setiap pendaftaran yang sudah dijawab untuk melihat tanggapan mereka. Acara berbayar menambahkan kolom **Type**, kolom **Paid / Total**, jumlah per jenis, dan dialog detail pembayaran -- lihat [Pendaftaran Berbayar](./paid-registrations.md#the-registration-roster).

:::tip
Gunakan bilah kemajuan kapasitas untuk memantau seberapa cepat acara terisi. Bilah akan berubah merah ketika acara mencapai atau melampaui kapasitas.
:::

## Langkah Berikutnya

- [Kalender Terkurasi](./curated-calendar.md) -- Membuat kalender yang mengambil acara dari beberapa grup
- [Pendaftaran Berbayar](./paid-registrations.md) -- Jenis peserta, pilihan tambahan, kode diskon, pembayaran, dan daftar tunggu
- [Panduan Pendaftaran Acara](../guides/event-registration.md) -- Panduan langkah demi langkah untuk menyiapkan pendaftaran acara
- [Ikhtisar Kalender](./index.md) -- Kembali ke ikhtisar kalender
