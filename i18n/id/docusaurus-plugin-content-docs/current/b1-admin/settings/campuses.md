---
title: "Kampus"
---

# Kampus

<div class="article-intro">

Jika gereja Anda berkumpul di lebih dari satu lokasi, **Kampus** memungkinkan Anda melacak lokasi setiap orang dan grup. Setelah dikonfigurasi, kampus akan muncul sebagai opsi di profil orang, dalam pengaturan kehadiran, dan di dasbor Demografi. Gereja multi-lokasi dapat memfilter, mencari, dan membuat laporan berdasarkan kampus di seluruh B1 Admin.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Anda memerlukan izin **Edit Pengaturan Gereja** untuk mengelola kampus. Lihat [Peran & Izin](./roles-permissions.md).

</div>

## Membuka Pengaturan Kampus

Di B1 Admin, buka [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (bilah pencarian di kiri atas), pilih **Settings > Settings**, lalu klik **Campuses** di daftar sebelah kiri untuk menggulir ke bagian **Campuses**. Anda juga dapat langsung membukanya di **/settings/campuses**. Anda akan melihat daftar semua kampus yang telah dikonfigurasi beserta nama, lokasi, dan zona waktunya.

## Menambahkan Kampus

1. Klik **Add Campus**.
2. Isi detail kampus:
   - **Name** *(wajib)* — nama tampilan yang ditampilkan di seluruh B1 Admin (misalnya "Kampus Utama" atau "Kampus Utara").
   - **Address** — alamat jalan kampus (digunakan untuk tampilan informasi; tidak sama dengan alamat utama gereja Anda di Pengaturan Gereja).
   - **City / State / Zip** — lokasi kampus.
   - **Time Zone** — zona waktu IANA untuk kampus ini (misalnya *America/Chicago*). [Jadwal check-in](../attendance/setup.md#setting-a-check-in-schedule) untuk ibadah di kampus ini dibuka dan ditutup mengikuti zona waktu ini. Jika diatur ke **None**, [Zona Waktu](./church-settings.md#time-zone) gereja Anda yang akan digunakan. Berguna jika kampus berada di zona waktu yang berbeda.
   - **Website** — URL opsional untuk situs web kampus ini.
3. Klik **Save**.

## Mengedit Kampus

Klik baris kampus mana pun di daftar untuk membuka editornya di panel sebelah kanan. Perbarui kolom-kolomnya lalu klik **Save**.

## Menghapus Kampus

Buka kampus untuk diedit lalu klik **Delete**. Anda akan diminta untuk mengonfirmasi. Menghapus kampus tidak menghapus orang-orang yang ditetapkan ke kampus tersebut; kolom kampus mereka hanya akan menjadi kosong.

## Menetapkan Orang ke Kampus

Setelah membuat kampus, staf dapat menetapkan seseorang ke kampus dari profilnya:

1. Buka catatan seseorang di **People**.
2. Klik **Edit**.
3. Pilih kampus dari dropdown **Campus**.
4. Klik **Save**.

Anda juga dapat memperbarui kampus secara massal dari halaman People. Pilih beberapa orang, gunakan **Bulk Edit**, lalu atur kolom Campus untuk semua orang sekaligus.

## Memfilter berdasarkan Kampus

Setelah kampus disiapkan, Anda dapat memfilter di seluruh B1 Admin berdasarkan kampus:

- **Pencarian People** — tambahkan kondisi Campus dalam pencarian lanjutan, atau muat [Daftar Tersimpan](../people/lists.md) yang dibatasi pada kampus tertentu.
- **Demographics** — [dasbor Demographics](../people/demographics.md) menampilkan diagram donat Campus jika setidaknya satu orang memiliki kampus yang ditetapkan.
- **Attendance Setup** — setiap waktu ibadah di Attendance dapat dikaitkan dengan kampus.

:::tip
Gereja dengan satu lokasi tidak perlu mengonfigurasi kampus. Semua fitur kampus bersifat opsional — jika tidak ada kampus, kolom dan diagram kampus tidak akan muncul.
:::

## Artikel Terkait

- [Pengaturan Gereja](./church-settings.md) — alamat gereja utama dan branding Anda (terpisah dari alamat kampus)
- [Demographics](../people/demographics.md) — diagram rincian Kampus
- [Attendance Setup](../attendance/setup.md) — mengaitkan waktu ibadah dengan kampus
- [Edit Massal](../people/bulk-editing.md) — menetapkan kampus kepada banyak orang sekaligus
