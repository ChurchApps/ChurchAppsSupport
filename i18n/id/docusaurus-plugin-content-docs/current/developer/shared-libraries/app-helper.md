---
title: "AppHelper"
description: "Referensi paket bersama @churchapps/apphelper di workspace Packages: titik masuk subpath, aplikasi yang memakai tiap ekspor, serta langkah dev lokal dan publikasi."
---

# AppHelper

<div class="article-intro">

Paket `@churchapps/apphelper` menyediakan komponen React dan utilitas bersama untuk semua aplikasi web ChurchApps. Paket ini adalah satu paket yang dipublikasikan, yang menampilkan modul fitur melalui subpath entry point -- login, donasi, formulir, markdown, dan fungsi website/CMS -- bersama kumpulan inti komponen dan helper bersama.

</div>

<div class="prereqs">
<h4>Sebelum Memulai</h4>

- Instal **Node.js** dan **Git** -- lihat [Prasyarat](../setup/prerequisites.md)
- Pelajari pengaturan [ruang kerja Packages](./index.md) dan alur rilisnya

</div>

## Entry Point

Paket ini mendefinisikan subpath export di `package.json`-nya, sehingga setiap modul fitur dapat diimpor secara terpisah:

| Entry point | Isi |
|-------------|----------|
| `@churchapps/apphelper` | Komponen inti, helper, dan hook |
| `@churchapps/apphelper/login` | UI login dan registrasi |
| `@churchapps/apphelper/donations` | Komponen pemberian dan donasi |
| `@churchapps/apphelper/forms` | Komponen pengiriman formulir |
| `@churchapps/apphelper/markdown` | Editor dan renderer Markdown serta HTML |
| `@churchapps/apphelper/website` | Komponen pembuat website dan CMS |

## Siapa Menggunakan Apa

Sebelum mengubah export bersama, periksa aplikasi mana saja yang mengimpornya:

| Area export | Yang disediakan | Digunakan oleh |
|---|---|---|
| Root -- komponen inti & hook | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, serta utilitas `@churchapps/helpers` yang diekspor ulang (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, dll.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- kerangka situs | `SiteHeader` (navigasi, menu pengguna, notifikasi) | B1Admin, B1Transfer, LessonsApp |
| Root -- editor konten admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- infrastruktur realtime | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- store obrolan/kehadiran | `ConversationStore`, `PresenceStore` | B1App |
| Root -- UI catatan & pesan | `Notes` (catatan staf tentang orang/tugas); `AddNote`, `SubscriptionToggle` (pesan anggota) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- khusus Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (bersama); `MarkdownPreview`, `HtmlEditor` (penyuntingan konten admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (bersama); `FundDonations` (khusus admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (merender `ConversationalForm` ketika `displayMode` formulir adalah `conversational`) | B1Admin, B1App |
| `./website` | Inti rendering halaman yang dipakai bersama oleh editor dan renderer (`Element` + renderer per jenis yang diselesaikan melalui `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widget seluruh situs (`AnnouncementBanner`, `Launcher` beserta helper `parse*Config`-nya); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` yang hanya dipakai oleh renderer untuk publik | B1Admin (editor), B1App (komponen editor + renderer) |

B1Transfer dan LessonsApp hanya menggunakan entry point root dan `login` -- subpath `donations`, `forms`, dan `website` saat ini hanya dikonsumsi oleh B1Admin dan B1App.

## Pengaturan untuk Pengembangan Lokal

Paket ini berada di ruang kerja [Packages](https://github.com/ChurchApps/Packages) bersama pustaka bersama lainnya:

1. Clone ruang kerja tersebut:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instal dependensi di root ruang kerja:

   ```bash
   cd Packages && yarn install
   ```

3. Jalankan playground Vite dari direktori paket:

   ```bash
   cd apphelper && yarn dev
   ```

   Server pengembangan playground berjalan di `http://localhost:3001`. Salin `playground/dotenv.sample` ke `playground/.env` dan isi nilai yang diperlukan terlebih dahulu.

Untuk membangun paket agar siap dikonsumsi (dikompilasi ke `dist/` dan menyalin aset locale/CSS), jalankan `yarn workspace @churchapps/apphelper build` -- atau `yarn build` di root untuk membangun setiap paket sesuai urutan dependensinya. Untuk menguji build yang belum dipublikasikan di dalam aplikasi yang menggunakannya, gunakan portal Yarn sementara -- lihat [Pengembangan Lokal Terhadap Aplikasi yang Menggunakan](./index.md#local-development-against-a-consuming-app).

:::tip
Playground adalah cara tercepat untuk mengembangkan dan menguji komponen AppHelper. Playground memuat ulang secara otomatis melalui server pengembangan Vite sehingga Anda dapat melihat perubahan secara real time.
:::

## Publikasi

Rilis dilakukan melalui changesets: jalankan `yarn changeset` di root ruang kerja untuk setiap perubahan, lalu `yarn publish-all` ketika siap dirilis. Lihat [Ikhtisar Pustaka Bersama](./index.md#releasing-with-changesets) untuk alur lengkapnya.

:::warning
Jangan pernah menghapus atau mengganti nama export sebelum pengganti dipublikasikan dan setiap konsumen telah dimigrasikan -- cari di semua repositori yang menggunakannya sebelum menggabungkan penghapusan.
:::

## Artikel Terkait

- **[Helpers](./helpers.md)** -- Paket utilitas dasar yang digunakan bersama AppHelper
- **[Aplikasi Web](../web-apps/index.md)** -- Aplikasi web yang menggunakan paket ini
- **[Ikhtisar Pustaka Bersama](./index.md)** -- Pengaturan ruang kerja, alur rilis, dan alur kerja tautan lokal
