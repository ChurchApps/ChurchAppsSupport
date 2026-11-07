---
title: "Mengelola Pengiriman Formulir"
---

# Mengelola Pengiriman Formulir

<div class="article-intro">

Setelah formulir Anda aktif, pengiriman akan mulai masuk. Tab **Form Submissions** memungkinkan Anda meninjau setiap tanggapan, melacak siapa saja yang sudah mengirim, dan menggunakan data tersebut untuk menindaklanjuti jemaat Anda tepat waktu.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- [Buat formulir](./creating-forms.md) dengan setidaknya satu pertanyaan
- Bagikan formulir melalui URL publiknya, atau sematkan di [situs web](../website/managing-pages.md) Anda

</div>

## Melihat Pengiriman

1. Buka [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (kolom pencarian di pojok kiri atas B1 Admin), perluas **People**, lalu klik **Forms**.
2. Klik formulir yang ingin Anda tinjau.
3. Buka tab **Form Submissions**.

Anda akan melihat daftar semua tanggapan yang diterima untuk formulir tersebut. Setiap pengiriman menampilkan informasi responden dan tanggal pengirimannya, diikuti satu kolom untuk setiap pertanyaan dalam formulir. Jika formulir Anda memiliki banyak pertanyaan, geser tabel ke samping untuk melihat kolom lainnya.

## Meninjau Pengiriman Individual

Klik pengiriman mana pun untuk melihat detail lengkapnya. Anda akan melihat semua jawaban yang diberikan orang tersebut untuk setiap pertanyaan dalam formulir.

Klik **ikon cetak** di samping pengiriman untuk mencetak jawaban yang telah diisi orang tersebut -- berguna untuk arsip fisik atau surat persetujuan bertanda tangan yang perlu Anda simpan. Hasil cetak menampilkan logo gereja Anda (**Light Background Logo** dari [Website > Appearance](../website/appearance.md), jika Anda sudah mengunggahnya) di tengah bagian atas, dengan nama gereja di bawahnya. Hasil cetak selalu menggunakan teks gelap di atas halaman putih, meskipun Anda menggunakan B1 Admin dalam mode gelap. Ini berbeda dari [mencetak formulir kosong](./creating-forms.md#printing-a-blank-form); fitur ini mencetak jawaban yang sudah dikirim satu orang, bukan salinan kosong. Ikon cetak yang sama juga muncul di mana pun pengiriman ditampilkan, termasuk di [profil seseorang](../people/adding-people.md#working-with-forms).

## Mengubah Orang pada Pengiriman

Jika pengiriman tertaut ke orang yang salah -- misalnya, dua anggota keluarga berbagi alamat email yang sama -- Anda dapat memindahkannya ke orang yang benar atau melepas tautannya.

1. Di tab **Form Submissions**, klik ikon **Change person** (dua panah) di samping nama orang tersebut. Ikon yang sama juga muncul di samping pengiriman pada [profil seseorang](../people/adding-people.md#working-with-forms).
2. Di dialog **Change person**, cari orang yang benar lalu klik **Move to this person**.
3. Atau klik **Unlink (Anonymous)** untuk melepas pengiriman dari orang mana pun. Pengiriman tersebut kemudian akan ditampilkan sebagai **Anonymous**.

Hanya tautannya yang berubah. Jawabannya tetap sama, dan tidak ada email tindak lanjut yang dikirim ulang.

:::info
Pada formulir yang diatur untuk membuat data orang, ketika seseorang sedang masuk ke situs gereja Anda saat mengirim, pengiriman akan ditautkan ke datanya sendiri, meskipun orang lain di database Anda memakai alamat email yang sama. Saat Anda [menggabungkan dua data orang](../people/adding-people.md), pengiriman formulir dari orang yang dihapus akan dipindahkan ke orang yang Anda pertahankan.
:::

## Cara Pengiriman Dikumpulkan

Pengiriman dapat masuk melalui beberapa saluran:

- **URL publik** -- Jika formulir Anda memiliki URL publik (formulir Stand Alone), siapa pun yang memiliki tautan dapat mengirim tanggapan. Bagikan URL melalui email, media sosial, atau pesan teks.
- **Disematkan di situs web Anda** -- Formulir yang disematkan di situs web B1 Anda mengumpulkan pengiriman secara otomatis saat pengunjung mengisinya.
- **Penggunaan internal** -- Staf dan relawan juga dapat mengirim formulir atas nama orang lain langsung dari dalam B1 Admin.

:::tip
Periksa tab **Form Submissions** secara rutin untuk formulir seperti kartu pengunjung atau permintaan doa, agar Anda dapat segera menindaklanjutinya.
:::

## Menggunakan Data Pengiriman

Data yang dikumpulkan melalui formulir dapat membantu Anda untuk:

- Melacak pendaftaran acara dan merencanakannya dengan tepat
- Menindaklanjuti pengunjung atau anggota baru
- Mengumpulkan umpan balik survei untuk perencanaan pelayanan
- Memproses pembayaran untuk acara atau program

:::info
Anggota formulir dengan peran **Admin** atau **View Only** dapat mengakses tab **Form Submissions**. Pastikan orang yang tepat di tim Anda memiliki akses ke formulir yang mereka butuhkan dengan mengelola peran di tab **Form Members**.
:::

:::info
Jika formulir Stand Alone [ditautkan ke grup](./creating-forms.md#linking-a-form-to-a-group), pemimpin grup tersebut dapat membaca dan mencetak pengirimannya dari halaman grup di B1.church, tanpa harus menjadi anggota formulir. Pemimpin juga dapat membaca jawaban untuk pertanyaan pendaftaran acara grup mereka di sana. Lihat [Detail Grup](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Jika formulir **Stand Alone** diatur untuk membuat data orang, setiap pengiriman yang cocok dengan orang yang sudah ada juga akan muncul di bagian **Forms** pada halaman orang tersebut di People -- tidak hanya formulir bertipe People.
:::

## Langkah Selanjutnya

- Pelajari cara membuat dan menyesuaikan formulir di [Membuat Formulir](./creating-forms.md)
- Tambahkan orang dari pengiriman formulir ke [direktori jemaat](../people/adding-people.md) Anda untuk tindak lanjut berkelanjutan
- [Tautkan formulir ke grup](./creating-forms.md#linking-a-form-to-a-group) agar pemimpinnya dapat membaca jawaban, atau [otomatis tambahkan pengirim ke grup](./creating-forms.md#automatically-adding-submitters-to-a-group) agar formulir pendaftaran mandiri membentuk daftar anggotanya sendiri
