---
title: "Templat Email"
---

# Templat Email

<div class="article-intro">

Templat Email memungkinkan Anda menyimpan konten email yang dapat digunakan ulang -- pesan selamat datang, pengingat acara, ucapan terima kasih atas pemberian -- sehingga Anda (atau [alur kerja](../serving/workflows.md)) dapat mengirimkannya hanya dengan satu klik, tanpa perlu menulisnya dari awal setiap kali. Daftar yang sama juga menyimpan templat pesan teks untuk jendela Teks grup dan orang.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan akses ke area Pengaturan di B1 Admin.

</div>

## Mengakses Templat Email

1. Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di pojok kiri atas) lalu perluas **Pengaturan**.
2. Klik **Templat Email**.
3. Anda akan melihat daftar templat yang ada beserta subjek, kategori, dan tanggal terakhir diubah.

## Membuat Templat

1. Klik **Templat Baru**.
2. Masukkan **Nama Templat** untuk mengidentifikasinya dalam daftar, dan pilih **Kategori** (Umum, Acara, Grup, Pemberian, Selamat Datang, atau Teks) untuk membantu mengatur templat Anda. Pilih **Teks** untuk membuat templat pesan teks sebagai gantinya (lihat [Templat Teks](#text-templates) di bawah).
3. Masukkan baris **Subjek**.
4. Tulis **Isi** menggunakan editor teks kaya.
5. Klik **Simpan**.

## Bidang Gabungan

Klik chip bidang gabungan di atas Subjek atau Isi untuk menyisipkannya di posisi kursor Anda -- klik terlebih dahulu di tempat Anda ingin bidang tersebut muncul, lalu klik chip-nya. Kursor Anda tetap di tempatnya, sehingga Anda dapat langsung melanjutkan mengetik setelah bidang yang disisipkan. Jika Anda mengklik chip Isi tanpa terlebih dahulu mengklik di dalam isi, bidang tersebut akan ditambahkan di akhir isi. Saat email dikirim, setiap bidang gabungan akan digantikan dengan informasi sebenarnya dari penerima:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Nama penerima
- `{{email}}` -- Alamat email penerima
- `{{churchName}}` -- Nama gereja Anda

## Templat Teks

Templat dengan kategori **Teks** adalah pesan teks biasa untuk SMS, bukan email:

- Templat ini tidak memiliki subjek. Editor teks kaya akan digantikan dengan kotak **Pesan Teks** biasa yang dapat menampung hingga 1.600 karakter.
- Chip bidang gabungan di atas kotak akan menyisipkan `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, atau `{{churchName}}` di posisi kursor Anda.
- Templat teks muncul di pemilih **Muat Templat (opsional)** pada jendela Teks untuk [grup](../groups/group-members.md#texting-group-members) atau satu orang. Memilih salah satu akan mengisi pesan, dan Anda tetap dapat mengeditnya sebelum mengirim.
- Templat ini tidak disertakan dalam pemilih templat email, termasuk tindakan **Kirim email** pada alur kerja.

Pengiriman teks memerlukan [penyedia layanan teks](./church-settings.md#texting) yang terhubung.

## Melihat Pratinjau Templat

Klik **Pratinjau** untuk melihat tampilan subjek dan isi dengan data contoh yang sudah diisi pada bidang gabungan, sebelum Anda menyimpan atau mengirimnya.

## Menggunakan Templat

Templat yang tersimpan dapat dipilih saat menyusun email untuk orang atau grup, dan juga sebagai tindakan di [Alur Kerja](../serving/workflows.md). Sebelum gereja Anda dapat mengirimkannya, tim ChurchApps perlu menyetujui penggunaan email grup satu kali. Lihat [Mengaktifkan Email Grup untuk Gereja Anda](../groups/group-members.md#turning-on-group-email-for-your-church).

## Mengedit dan Menghapus

Klik ikon **Edit** di samping templat untuk memperbaruinya, atau ikon **Hapus** untuk menghapusnya secara permanen.

## Langkah Berikutnya

- [Alur Kerja](../serving/workflows.md) -- Memicu email templat secara otomatis berdasarkan aturan
