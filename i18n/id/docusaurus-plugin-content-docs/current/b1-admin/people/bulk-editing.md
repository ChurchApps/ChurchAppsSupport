---
title: "Mengedit Banyak Orang Sekaligus"
---

# Mengedit Banyak Orang Sekaligus

<div class="article-intro">
Pengeditan massal memungkinkan Anda memperbarui banyak orang sekaligus, sehingga menghemat waktu saat Anda membuat perubahan yang sama untuk banyak individu. Anda dapat memperbarui status keanggotaan, status pernikahan, jenis kelamin, preferensi berhenti berlangganan, dan keanggotaan grup dalam satu kali operasi.
</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Anda memerlukan izin untuk mengelola data orang. Lihat [Peran & Izin](./roles-permissions.md) untuk detailnya.
- Anda sebaiknya sudah menambahkan atau mengimpor orang yang ingin Anda edit. Lihat [Menambahkan Orang](./adding-people.md) jika diperlukan.
</div>

## Memilih Orang untuk Pengeditan Massal

1. Buka **Orang** di B1 Admin
2. Gunakan alat pencarian atau filter untuk menemukan orang yang ingin Anda perbarui
3. Centang kotak untuk memilih orang
   - Pada tampilan **Keluarga**, mencentang sebuah keluarga akan memilih semua anggotanya
   - Pada tampilan **Tabel** (beralih dengan sakelar **Lihat sebagai**), Anda dapat memilih orang satu per satu
   - Atau gunakan kotak centang di atas daftar untuk memilih semua orang yang terlihat
4. Setelah Anda memilih minimal satu orang, bilah di atas daftar akan menampilkan berapa banyak yang dipilih, beserta tombol **Hapus Pilihan** dan tombol **Tindakan**

:::tip
Jika Anda perlu memperbarui kelompok besar orang berdasarkan kriteria tertentu, gunakan fitur [Pencarian AI](./ai-search.md) atau filter untuk mempersempit daftar Anda terlebih dahulu, lalu pilih semua orang yang cocok.
:::

## Tindakan Massal yang Tersedia

Menu **Tindakan** menyediakan beberapa pilihan:

### Memperbarui Status Keanggotaan

Perbarui status keanggotaan untuk semua orang yang dipilih:

1. Klik **Tindakan** → **Atur Status Keanggotaan**
2. Pilih status baru:
   - **Pengunjung** -- Orang yang datang untuk pertama kali atau sesekali
   - **Tamu** -- Tamu, seperti keluarga yang mendaftar di kiosk check-in
   - **Peserta Reguler** -- Peserta yang sering hadir tetapi bukan anggota
   - **Anggota** -- Anggota gereja yang resmi
   - **Staf** -- Staf gereja
   - **Tidak Aktif** -- Orang yang tidak lagi hadir
   - **Meninggal Dunia** -- Orang yang telah meninggal dunia
3. Pilih mode pembaruan:
   - **Timpa semua** -- Ganti status saat ini untuk semua orang yang dipilih
   - **Perbarui yang kosong saja** -- Hanya atur status untuk orang yang belum memilikinya
4. Klik **Perbarui**

### Memperbarui Status Pernikahan

Perbarui status pernikahan secara massal:

1. Klik **Tindakan** → **Atur Status Pernikahan**
2. Pilih status baru:
   - **Tidak diketahui**
   - **Lajang**
   - **Menikah**
   - **Bercerai**
   - **Janda/Duda**
3. Pilih apakah akan menimpa nilai yang ada atau hanya memperbarui kolom yang kosong
4. Klik **Perbarui**

### Memperbarui Jenis Kelamin

Perbarui informasi jenis kelamin untuk beberapa orang:

1. Klik **Tindakan** → **Atur Jenis Kelamin**
2. Pilih nilainya:
   - **Tidak ditentukan**
   - **Laki-laki**
   - **Perempuan**
3. Pilih mode pembaruan (timpa semua atau hanya yang kosong)
4. Klik **Perbarui**

### Memperbarui Status Berhenti Berlangganan

Kendalikan apakah orang telah berhenti berlangganan dari komunikasi:

1. Klik **Tindakan** → **Atur Berhenti Berlangganan Direktori**
2. Pilih:
   - **Tidak** -- Izinkan komunikasi (hapus berhenti berlangganan)
   - **Ya** -- Blokir komunikasi (atur berhenti berlangganan)
3. Pilih mode pembaruan
4. Klik **Perbarui**

:::warning
Berhati-hatilah saat mengubah status berhenti berlangganan. Orang yang secara eksplisit telah berhenti berlangganan tidak seharusnya menerima komunikasi kecuali mereka telah memberikan persetujuan baru.
:::

### Atur Kolom Kustom

Atur nilai [kolom kustom](../settings/custom-fields.md) Ya/Tidak untuk semua orang yang dipilih sekaligus:

1. Klik **Tindakan** → **Atur Kolom Kustom**.
2. Pilih kolom kustom Ya/Tidak yang ingin Anda atur.
3. Pilih nilai (**Ya** atau **Tidak**) yang akan diterapkan.
4. Klik **Perbarui**.

:::info
Hanya kolom kustom Ya/Tidak yang tersedia untuk tindakan massal ini. Untuk mengatur jenis kolom lainnya, edit setiap orang secara individual.
:::

### Tambahkan ke Grup

Tambahkan semua orang yang dipilih ke satu atau beberapa grup:

1. Klik **Tindakan** → **Tambahkan ke Grup**
2. Cari dan pilih grup yang akan ditambahkan
3. Anda dapat memilih beberapa grup untuk menambahkan orang ke semuanya
4. Klik **Tambahkan ke Grup**

Setiap orang akan ditambahkan sebagai anggota biasa dari grup yang dipilih. Anda nanti dapat menjadikan individu sebagai pemimpin grup jika diperlukan dari halaman [Anggota Grup](../groups/group-members.md).

### Hapus dari Grup

Hapus semua orang yang dipilih dari satu atau beberapa grup:

1. Klik **Tindakan** → **Hapus dari Grup**
2. Cari dan pilih grup yang akan dihapus orangnya
3. Anda dapat memilih beberapa grup
4. Klik **Hapus dari Grup**

:::info
Tindakan ini hanya menghapus orang dari grup yang ditentukan. Tindakan ini tidak menghapus data pribadi mereka.
:::

### Hapus Orang

Hapus secara permanen orang yang dipilih dari basis data gereja Anda:

1. Klik **Tindakan** → **Hapus**
2. Dialog **Hapus Orang yang Dipilih** akan meminta Anda mengonfirmasi berapa banyak orang yang akan dihapus
3. Klik **Hapus**

:::danger
Menghapus orang bersifat permanen dan tidak dapat dibatalkan. Ini akan menghapus semua data mereka, termasuk:
- Informasi pribadi
- Keanggotaan grup
- Catatan kehadiran
- Riwayat donasi
- Pengiriman formulir

Gunakan tindakan ini hanya jika Anda benar-benar yakin ingin menghapus orang-orang ini dari sistem Anda.
:::

## Hasil Pengeditan Massal

Setelah menyelesaikan tindakan massal, Anda akan melihat ringkasan yang menampilkan:

- **Total dipilih** -- Berapa banyak orang yang termasuk dalam operasi
- **Berhasil diperbarui** -- Berapa banyak catatan yang berhasil diubah
- **Gagal** -- Catatan yang tidak dapat diperbarui (jika ada)
- **Tidak berubah** -- Catatan yang tidak memerlukan perubahan (misalnya, saat menggunakan mode "perbarui yang kosong saja")

Jika ada pembaruan yang gagal, Anda akan melihat detail kesalahan yang menjelaskan alasannya.

## Praktik Terbaik

- **Mulai dari yang kecil** -- Uji operasi massal pada beberapa catatan terlebih dahulu untuk memastikan Anda membuat perubahan yang tepat
- **Gunakan filter** -- Persempit daftar Anda dengan filter atau pencarian AI sebelum memilih orang, agar Anda hanya memperbarui individu yang tepat
- **Periksa kembali pilihan Anda** -- Tinjau orang yang dipilih sebelum menerapkan perubahan massal
- **Gunakan mode "perbarui yang kosong saja"** -- Ketika Anda ingin mengisi data yang hilang tanpa menimpa informasi yang sudah ada
- **Catat perubahan besar** -- Simpan catatan tentang pembaruan massal jika Anda perlu merujuknya nanti
- **Koordinasi dengan tim Anda** -- Beri tahu administrator lain saat Anda membuat perubahan massal yang besar

## Kasus Penggunaan Umum

### Memperbarui Anggota Baru

Setelah kelas keanggotaan, perbarui semua peserta menjadi status Anggota:

1. Cari orang-orang yang menghadiri kelas tersebut
2. Pilih semuanya
3. Gunakan **Tindakan** → **Atur Status Keanggotaan** → **Anggota**

### Mengatur Kelompok Kecil

Tambahkan beberapa orang ke kelompok kecil yang baru:

1. Cari orang-orang yang ingin Anda masukkan ke dalam grup
2. Pilih mereka
3. Gunakan **Tindakan** → **Tambahkan ke Grup** dan pilih kelompok kecil tersebut

### Membersihkan Data

Isi status pernikahan yang hilang untuk pasangan suami istri:

1. Filter orang yang sudah menikah (menggunakan informasi keluarga)
2. Pilih mereka yang status pernikahannya kosong
3. Gunakan **Tindakan** → **Atur Status Pernikahan** → **Menikah** → **Perbarui yang kosong saja**

## Artikel Terkait

- [Mencari Orang](./searching-people.md) -- Temukan orang untuk diedit
- [Pencarian AI](./ai-search.md) -- Gunakan bahasa alami untuk menemukan kelompok orang tertentu
- [Anggota Grup](../groups/group-members.md) -- Kelola keanggotaan grup
- [Ekspor Data](./exporting-data.md) -- Ekspor data orang sebelum membuat perubahan massal
