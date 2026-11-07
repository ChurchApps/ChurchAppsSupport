---
title: "Persetujuan Kalender"
description: "Tinjau permintaan pemesanan ruangan dan sumber daya yang tertunda di B1 Admin, periksa bentrokan, lalu setujui atau tolak, dengan opsi menerbitkan acara."
---

# Persetujuan Kalender

<div class="article-intro">

Halaman Persetujuan adalah tempat administrator meninjau dan menindaklanjuti permintaan pemesanan ruangan dan sumber daya yang masih menunggu, serta acara kalender yang memerlukan persetujuan sebelum dipublikasikan.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Atur ruangan atau sumber daya dengan **Grup Persetujuan** di [Ruangan & Sumber Daya](./rooms-resources.md)
- Anda memerlukan izin **Calendars Admin** atau izin **content.edit**

</div>

## Membuka Persetujuan

Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas), perluas **Calendars**, lalu klik **Approvals**. Permintaan pemesanan dan acara yang menunggu tinjauan ditampilkan di sini.

## Permintaan Pemesanan

Ketika sebuah grup membuat acara dan meminta ruangan atau sumber daya, permintaan tersebut muncul di bagian **Room & Resource Requests**. Setiap baris menampilkan:

- Nama acara dan tanggal/waktu
- Ruangan atau sumber daya yang diminta (beserta jumlahnya untuk sumber daya dengan banyak unit)
- Lencana status yang menunjukkan apakah permintaan memiliki konflik

### Indikator Konflik

Jika sebuah permintaan tumpang tindih dengan pemesanan lain atau blokir jadwal untuk ruangan atau sumber daya yang sama, statusnya akan menampilkan lencana **Conflicts**; arahkan kursor ke lencana tersebut untuk melihat detailnya. Permintaan tanpa tumpang tindih menampilkan **No conflicts**. Tinjau permintaan yang berkonflik dengan saksama sebelum menyetujui salah satunya.

### Menyetujui atau Menolak

Klik **Approve** atau **Reject** pada permintaan pemesanan mana pun (penolakan akan meminta konfirmasi Anda terlebih dahulu). Grup pemohon akan diberi tahu tentang keputusan tersebut. Pemesanan yang disetujui akan dikunci untuk ruangan atau sumber daya tersebut selama acara berlangsung; pemesanan yang ditolak akan membebaskan slot tersebut untuk pihak lain.

Ketika Anda mengklik **Approve**, dialog **Approve booking** akan terbuka sehingga Anda juga dapat mempublikasikan acara dalam langkah yang sama:

1. Centang **Publish to public calendar** untuk membuat acara tersebut publik di kalender grupnya. Biarkan tidak tercentang jika Anda ingin menyetujui pemesanan tanpa mengubah visibilitas acara.
2. Setelah **Publish to public calendar** dicentang, Anda dapat memilih kalender kurasi dari **Also add to calendar** untuk menambahkan acara ke salah satu [kalender kurasi](./curated-calendar.md) Anda juga. Biarkan diatur ke **None** jika tidak ingin menambahkannya. (Opsi ini hanya muncul jika Anda memiliki izin **content.edit**.)
3. Klik **Approve**.

## Acara yang Menunggu

Jika alur kerja kalender Anda mewajibkan persetujuan acara sebelum acara terlihat oleh publik, acara yang menunggu akan muncul di bagian **Event Requests**. Klik **Approve** untuk mempublikasikan acara ke kalender, atau **Reject** untuk memberi tahu pengirim bahwa perubahan diperlukan.

:::tip
Atur Grup Persetujuan pada ruangan di [Ruangan & Sumber Daya](./rooms-resources.md) untuk mewajibkan persetujuan bagi ruangan tersebut. Grup yang memiliki akses kemudian dapat meminta ruangan tersebut saat membuat acara, dan permintaan tersebut akan masuk ke halaman ini.
:::

## Artikel Terkait

- [Ruangan, Sumber Daya & Penjadwalan](./rooms-resources.md) — mengatur ruangan dan sumber daya yang dapat dipesan
- [Membuat Kalender](./creating-calendars.md) — mengelola kalender dan acara
