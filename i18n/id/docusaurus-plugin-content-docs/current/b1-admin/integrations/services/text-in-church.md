---
title: "Text In Church"
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) menggabungkan SMS dengan alur kerja drip dan otomatisasi kartu koneksi. Aplikasi Zapier-nya menyediakan kedua arah: meneruskan peristiwa B1 ke alur kerja Text In Church, dan mengambil pemicu kartu koneksi atau kontak baru dari sisi lain untuk dikirim ke B1.

</div>

<div class="prereqs">
<h4>Sebelum Anda Mulai</h4>

- Akun [Text In Church](https://textinchurch.com) dengan paket yang mencakup integrasi Zapier
- Akun [Zapier](https://zapier.com)
- Pengguna B1Admin dengan izin **Edit Settings**

</div>

## Yang Dapat Anda Hubungkan

| Arah | Pemicu | Tindakan |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | Kirim pesan teks melalui tim yang relevan |
| B1 → Text In Church | B1 `group.member.added` | Add to Group (cerminkan keanggotaan grup) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Tindakan Text In Church juga mencakup *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, serta menambah dan menghapus keanggotaan grup.

## Pengaturan

### 1. Buat kunci API B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: diperlukan untuk Zap yang dipicu dari B1
- `people:read`, `people:write`: untuk menemukan atau membuat orang
- `groups:write`: untuk sinkronisasi grup
- (Opsional) `donations:write` jika Anda ingin mengirim konfirmasi donasi ke TIC

### 2. Hubungkan Text In Church ke Zapier

Ikuti [panduan integrasi Zapier dari Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Mereka membuat token API dari dalam dasbor TIC.

### 3. Buat Zap dari kartu koneksi ke B1

Ini adalah arah yang paling umum. Kartu koneksi yang dikirim dari TIC otomatis menjadi orang baru di B1.

1. **Pemicu**: Text In Church: Connect Card Submitted.
2. **Tindakan**: B1.church: Find Person (berdasarkan email).
3. **Jalur**: percabangan berdasarkan hasil pencarian:
   - Tidak ditemukan → B1.church: Create Person.
   - Ditemukan → lanjutkan.
4. **Tindakan**: B1.church: Add Group Member ke grup "New Contact".

Aktifkan Zap. Kartu koneksi berikutnya yang dikirim melalui TIC akan langsung muncul di **B1Admin → People**.

## Resep Umum

### Memicu alur kerja bergaya kartu koneksi dari formulir B1

- **Pemicu**: B1.church: New Form Submission (saring menurut id formulir "I'm new here")
- **Tindakan**: Text In Church: Create/Update Person, dengan memetakan jawaban email, telepon, dan nama dari formulir
- **Tindakan**: Text In Church: Add to Group, dengan grup yang sudah memiliki alur kerja sambutan

### Cerminkan keanggotaan grup

- **Pemicu**: B1.church: New Group Member, disaring menurut `groupId` tertentu
- **Tindakan**: Text In Church: Add to Group (orang yang sama, grup cermin). Pasangkan dengan Zap `group.member.removed` jika Anda ingin sinkronisasi penuh.

### Beri tahu pemimpin saat seseorang bergabung

- **Pemicu**: B1.church: New Group Member
- **Tindakan**: Text In Church: Send Text Message, penerima = nomor telepon pemimpin grup, isi = `"{first} {last} just joined {group}"`.

## Batasan & Catatan

- **Aplikasi Zapier TIC bergantung pada tingkat paket.** Jika integrasi Zapier tidak aktif (berwarna abu-abu) di dasbor TIC, hubungi dukungan TIC untuk mengaktifkannya di paket Anda.
- **ID grup berasal dari TIC, bukan B1.** Saat mencerminkan grup, Anda perlu menyimpan tabel pemetaan di suatu tempat (*Lookup Table* di Zapier, atau ditulis langsung di setiap Zap).
- **Send Text Message menggunakan kredit.** Setiap Zap yang menjalankan *Send Text* akan mengurangi kuota SMS TIC Anda.

## Pemecahan Masalah

- **Pemicu Connect-Card tidak berjalan**: TIC memerlukan sakelar integrasi Zapier dalam keadaan aktif. Pastikan juga formulir yang Anda uji dikonfigurasi sebagai "Connect Card", bukan survei biasa.
- **Create Person di B1 gagal dengan 401**: kunci API salah, dicabut, atau tidak memiliki `people:write`. Buat ulang kuncinya.
- **Orang ganda di B1**: TIC mengirim *Person Created* dan *Connect Card Submitted* untuk peristiwa yang sama. Pilih salah satu sebagai sumber kebenaran dan tambahkan Filter Zapier pada yang lain.

## Lihat Juga

- [Clearstream](./clearstream): platform SMS alternatif dengan pola Zapier yang serupa
- [Zapier (ikhtisar)](../zapier): sisi B1 dari setiap resep Zapier
- [Panduan Zapier Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (dokumentasi TIC)
