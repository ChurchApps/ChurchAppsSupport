---
title: "Pengingat Acara"
---

# Pengingat Acara

<div class="article-intro">

Pengingat acara secara otomatis memberi tahu orang yang tepat sebelum sebuah acara berlangsung -- misalnya, "Jangan sampai terlewat! Lokakarya kesehatan dimulai besok pukul 9:00 pagi." Anda cukup mengatur pengingat sekali pada acara, dan B1 akan mengirimkannya sesuai jadwal melalui notifikasi push, email, dan, jika gereja Anda sudah menyiapkan layanan pesan teks, pesan SMS. Anggota dapat mengatur pengingat mana saja yang ingin mereka terima melalui [Preferensi Notifikasi](../../b1-church/getting-started/notification-preferences) mereka sendiri.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Buat acara yang ingin Anda ingatkan kepada orang-orang (lihat [Membuat Kalender](creating-calendars))
- Untuk menjangkau peserta yang sudah mendaftar, [aktifkan pendaftaran](creating-calendars) pada acara tersebut
- Untuk menjangkau seluruh anggota grup, pastikan acara tersebut termasuk dalam [grup](../groups/creating-groups) yang memiliki anggota

</div>

## Mengatur Pengingat

Anda mengatur pengingat di bagian **Reminders** pada acara.

- Saat **membuat acara baru**, buka bagian **Reminders** di editor acara sebelum menyimpan.
- Untuk **acara yang sudah ada**, buka halaman **Registration Details** acara tersebut (dari bagian **Registrations**) untuk menambah atau mengubah pengingatnya.

1. Aktifkan **Enable reminders**.
2. Pilih **When** untuk waktu pengiriman. Pilih hingga tiga waktu: **7 days before** (7 hari sebelumnya), **3 days before** (3 hari sebelumnya), **1 day before** (1 hari sebelumnya), dan **Day of** (pada hari acara).
3. Atur **Time of day** untuk waktu pengiriman pengingat (defaultnya **9:00 AM**, mengikuti [zona waktu](../settings/church-settings.md#time-zone) gereja Anda).
4. Pilih **Who** yang akan diingatkan (lihat [Siapa yang Menerima Pengingat](#who-gets-reminded) di bawah).
5. Opsional, tambahkan **Message**. Biarkan kosong untuk menggunakan kalimat standar, atau tulis sendiri -- Anda dapat menyertakan `{{eventTitle}}` yang akan otomatis diganti dengan nama acara.
6. Pilih **Channels**: notifikasi **Push**, **Email**, dan, jika gereja Anda sudah terhubung dengan [penyedia layanan pesan teks](../settings/church-settings.md#texting), **Text**.
7. Simpan acara.

Saat Anda membuat perubahan, **pratinjau langsung** akan menampilkan perkiraan jumlah orang yang akan menerima pengingat, jumlah peserta yang tidak dapat dijangkau, dan jadwal pengiriman berikutnya -- sehingga Anda dapat memastikan pengingat sudah benar sebelum menyimpan.

## Siapa yang Menerima Pengingat

Pengaturan **Who** menentukan siapa yang akan menerima pengingat:

- **Registrants only** -- Semua orang yang terdaftar untuk acara dan terhubung dengan data pribadi. Ini adalah default jika acara menggunakan pendaftaran, sehingga pengingat untuk acara terdaftar yang kecil tidak akan terkirim ke seluruh grup secara tidak sengaja.
- **Heads / registrants only** -- Satu pengingat untuk setiap pendaftaran (orang yang mendaftar), bukan untuk setiap anggota keluarga dalam pendaftaran tersebut.
- **Group members** -- Semua anggota grup acara. Ini adalah default jika acara tidak menggunakan pendaftaran.
- **Auto** -- Menggunakan peserta terdaftar jika pendaftaran diaktifkan, jika tidak, menggunakan grup.

:::info
Tamu yang hanya ditambahkan dengan nama (tanpa data pribadi yang terhubung) tidak dapat menerima pengingat, karena tidak ada akun, perangkat, atau email tujuan. Pratinjau akan menunjukkan berapa banyak peserta yang termasuk dalam kelompok ini agar tidak ada kejutan. Anggota yang memilih untuk tidak menerima komunikasi juga akan dilewati.
:::

## Kapan Pengingat Dikirim

- Pengingat dikirim pada **waktu yang Anda pilih**, sesuai waktu lokal zona waktu gereja Anda, pada setiap jarak waktu yang Anda pilih.
- Jika Anda **mengubah tanggal atau waktu acara**, pengingat yang belum terkirim akan dijadwalkan ulang secara otomatis -- Anda tidak perlu mengedit pengingatnya.
- Jika Anda **menghapus acara** (atau membatalkan satu kejadian dari acara berulang), pengingat yang belum terkirim akan dibatalkan secara otomatis.
- Acara berulang ditangani secara otomatis: setiap kejadian mendatang akan mendapatkan pengingatnya sendiri.

:::tip
Pengingat dikirim **melalui push terlebih dahulu, dengan email sebagai cadangan**. Jika anggota mengaktifkan notifikasi push, mereka akan menerima push; jika tidak, mereka akan menerima email. Anggota dapat memilih saluran yang mereka inginkan untuk setiap jenis notifikasi di [Preferensi Notifikasi](../../b1-church/getting-started/notification-preferences) mereka.
:::

## Pengingat Melalui Pesan Teks

Saluran **Text** hanya muncul jika gereja Anda sudah terhubung dengan penyedia layanan pesan teks. Pesan teks dikirim melalui penyedia layanan pesan teks gereja Anda, dan setiap pesan mungkin dikenakan biaya bagi gereja Anda. Pesan ini dikirim sebagai tambahan dari pengingat push atau email, dan hanya kepada orang yang:

- Mengaktifkan **Text messages** di [Preferensi Notifikasi](../../b1-church/getting-started/notification-preferences) mereka, dan
- Memiliki nomor ponsel di profil mereka.

Setiap pesan teks diawali dengan nama gereja Anda, dibatasi menjadi satu pesan teks, dan diakhiri dengan "Reply STOP to opt out." Siapa pun yang membalas STOP akan berhenti menerima pesan teks dari gereja Anda. Agar balasan STOP dapat sampai ke B1, tempelkan **URL webhook pesan masuk (STOP)** dari [pengaturan pesan teks](../settings/church-settings.md#texting) Anda ke webhook pesan masuk milik penyedia layanan Anda.

## Yang Dapat Dikontrol Anggota

Pengingat selalu mengikuti [Preferensi Notifikasi](../../b1-church/getting-started/notification-preferences) setiap anggota. Seorang anggota dapat:

- Mematikan **Event Reminders** untuk push, email, atau teks sambil tetap mengaktifkan notifikasi lainnya.
- Mengaktifkan atau mematikan pengingat teks dengan **Text messages**.
- Mengatur **quiet hours** agar notifikasi yang tidak mendesak menunggu hingga waktu yang wajar.

Anda tidak dapat mengesampingkan pilihan anggota untuk berhenti menerima pengingat acara -- ini membantu B1 mematuhi aturan anti-spam dan memastikan anggota tetap mengendalikan kotak masuk mereka.

## Pengingat Pelayanan

Relawan yang dijadwalkan dalam sebuah rencana akan menerima **pengingat pelayanan** terpisah yang berisi detail rencana tersebut, dan jika mereka belum merespons, tombol **Accept / Decline** (Terima / Tolak) langsung di dalam email. Pengingat tersebut diatur pada jenis rencana, bukan pada acara kalender, dan juga dapat dikirim melalui pesan teks -- lihat [Pengingat Relawan](../serving/plans#volunteer-reminders) dan [Relawan Minggu](../guides/sunday-volunteers) untuk mengetahui cara kerja penjadwalan relawan dan pengingatnya.

## Langkah Selanjutnya

- [Preferensi Notifikasi](../../b1-church/getting-started/notification-preferences) -- Hal-hal yang dapat diatur anggota
- [Panduan Pendaftaran Acara](../guides/event-registration) -- Atur pendaftaran agar pengingat dapat menjangkau peserta
- [Membuat Kalender](creating-calendars) -- Kembali ke pengaturan kalender
