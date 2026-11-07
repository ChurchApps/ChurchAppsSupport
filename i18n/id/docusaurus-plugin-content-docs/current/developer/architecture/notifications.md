---
title: "Arsitektur Notifikasi & Pengingat"
description: "Cara API B1 Admin merutekan notifikasi, pengingat terjadwal, batas email gereja, dan opt-out SMS lewat satu saluran pengiriman dan gerbang preferensi."
---

# Arsitektur Notifikasi & Pengingat

<div class="article-intro">

Setiap pesan yang dilihat anggota gereja di luar halaman yang sedang mereka buka, seperti jumlah lencana, notifikasi push, atau ringkasan email, melewati salah satu dari dua pintu di MessagingApi. Halaman ini mendokumentasikan corong tersebut, mesin pengingat yang memasok corong itu secara terjadwal, dan model preferensi yang menentukan apa yang benar-benar sampai ke seseorang.

</div>

## Ikhtisar — dua pintu

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Segala sesuatu yang menyampaikan informasi kepada seseorang** melewati `NotificationHelper.createNotifications()` di modul messaging. Fungsi ini menyimpan baris `notifications` dan meningkatkan eskalasi dari socket → push → email, dengan mengevaluasi `PreferenceGateHelper` untuk setiap saluran, termasuk `in_app` pada level 0.
2. **Segala sesuatu yang dijadwalkan** adalah `reminderDefinition` (tingkat entitas atau tingkat cakupan) yang diperluas menjadi `reminderOccurrences` dan dikirim oleh `ReminderEngine.scan()` pada timer berulang. Ada satu pengurai, satu pengirim, dan satu buku catatan pengiriman (`reminderSentLog`).
3. **Email langsung** hanya tersedia melalui `TransactionalEmailHelper.sendTransactional()`. Aturan ESLint menegakkan hal ini pada waktu kompilasi, lihat di bawah.

:::tip Pintu email ditegakkan oleh lint, bukan sekadar konvensi
`Api/tools/eslint-rules/email-door.cjs` mendefinisikan `no-direct-email-helper`: setiap pemanggilan `EmailHelper.sendTemplatedEmail()` atau `EmailHelper.sendEmail()` di luar `NotificationHelper.ts` atau `TransactionalEmailHelper.ts` akan gagal pada lint. Jika Anda perlu mengirim email, arahkan melalui corong (`createNotifications` dengan `emailImmediate`) atau melalui `TransactionalEmailHelper.sendTransactional()`. Tidak ada cara ketiga yang lolos CI.
:::

## Corong notifikasi

`NotificationHelper.createNotifications()` adalah satu-satunya titik masuk untuk segala sesuatu yang tidak dijadwalkan dan tidak bersifat transaksional:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Untuk setiap penerima, fungsi ini menyimpan satu baris di `notifications` dan memanggil `attemptDeliveryWithEscalation`, yang menelusuri tangga saluran di bawah. Baris yang masih belum dibaca untuk `(contentType, contentId)` yang sama akan mencegah pembuatan ulang. Penjaga deduplikasi ini dilewati untuk pengiriman `emailImmediate` (pengingat offset, "email semua" dari staf, langkah workflow yang mengelola deduplikasinya sendiri) dan untuk pesan langsung, yang selalu membunyikan socket.

`shared/helpers/NotificationService.ts` mencerminkan tanda tangan yang sama (`NotificationServiceOptions`) untuk pemanggil di luar modul messaging dan didaftarkan ke modul messaging saat boot.

## Rantai eskalasi saluran

Pengiriman dimulai dari sebuah level (0 secara default, atau lebih tinggi untuk pengingat atau pengiriman eksplisit) dan hanya lanjut ke saluran berikutnya jika saluran sebelumnya tidak berhasil. Setiap level dibatasi oleh `PreferenceGateHelper` sebelum upaya apa pun dilakukan.

| Level | Saluran | Perilaku |
|-------|---------|----------|
| 0 | **in_app / socket** | Gerbang `in_app` diperiksa terlebih dahulu. Jika ditekan (dibisukan), baris disimpan dengan `isNew=false` dan pengiriman berhenti sepenuhnya: tidak ada ping socket, tidak ada lencana, tidak ada eskalasi lebih lanjut. Jika tidak, server mencari koneksi socket yang terbuka untuk ruang `alerts` orang tersebut dan mengirim bingkai `notification` (atau `privateMessage`). Untuk notifikasi biasa, pengiriman socket yang berhasil menghentikan rantai di sini; timer 30 menit akan memeriksa ulang item yang belum dibaca dan mengeskalasinya nanti. Pesan langsung tidak pernah berhenti di socket: PWA yang terpasang dapat menjaga socket alerts tetap terbuka di latar belakang, yang jika tidak akan menekan push tingkat OS. |
| 1 | **push** | Dibatasi oleh `allowPush` / opt-out kategori / jam tenang. Dikirim ke token push Expo dan langganan Web Push yang ditemukan pada baris `devices` milik orang tersebut, dengan deduplikasi berdasarkan endpoint dan pembersihan token yang sudah usang. |
| 2 | **email** | Dibatasi oleh `emailFrequency` dan opt-out kategori. Pengiriman langsung (`emailImmediate`) dirender seketika dan menulis baris `deliveryLogs`; selain itu, notifikasi dibiarkan tertunda untuk ringkasan batch, yang dijelaskan di bawah. |
| — | **sms** | Bukan level dalam tangga eskalasi. Satu-satunya produsen SMS yang dibatasi adalah mesin pengingat: ketika `channels` sebuah definisi mencakup `sms`, `ReminderEngine.sendSms()` mengirim pesan teks kepada setiap penerima **selain** notifikasi push/email (lihat [Pengingat teks](#text-reminders)). Pesan teks massal (`TextingController` / `@churchapps/texting`), tindakan **Kirim Teks ke Relawan** pada ikhtisar pelayanan (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), dan tindakan langkah workflow **Kirim Teks** (`StepActionHelper.sendText` → `sendPersonText`) semuanya mengirim teks langsung melalui penyedia gereja, sehingga preferensi notifikasi dan jam tenang tidak berlaku untuk pesan-pesan tersebut. Hanya flag `optedOut` milik orang tersebut yang dihormati. |

Notifikasi belum dibaca yang tertinggal di socket atau push dieskalasi oleh timer 30 menit (`NotificationHelper.escalateDelivery`). Email batch dikirim oleh `NotificationHelper.sendEmailNotifications(frequency)`, yang digerakkan oleh preferensi `emailFrequency` setiap orang: `individual` berjalan pada timer 30 menit, `daily` berjalan pada timer malam hari. (`weekly` adalah nilai preferensi yang valid, tetapi belum memiliki proses batch khusus.)

## Mesin Pengingat

Pengingat terjadwal, yaitu pengingat acara, tenggat tugas, dan pengingat penugasan pelayanan atau rencana, semuanya melalui satu mesin umum dan bukan logika cron khusus per fitur.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Definisi** (`reminderDefinitions`) bisa berupa tingkat entitas (`entityId` diisi, yaitu acara, tugas, atau rencana tertentu) atau tingkat cakupan (`entityId` kosong, `scopeId` diisi, misalnya setiap rencana di bawah jenis rencana pelayanan tertentu). Sebuah definisi memuat CSV berisi offset menit (`offsets`, misalnya `"1440,60"` untuk satu hari dan satu jam sebelumnya), waktu kirim lokal (`sendLocalTime`), CSV saluran (`channels`, termasuk `email` yang memicu email kaya secara langsung saat pengiriman), `recipientMode`, dan pesan kustom opsional (`message`).

**Ekspansi** merealisasikan baris pengiriman untuk jendela waktu ke depan (jendela bergulir beberapa hari). Proses ini berjalan pada timer malam hari, dan secara sinkron setiap kali definisi disimpan agar pengingat untuk acara mendadak tetap terkirim. Definisi cakupan disebarkan melalui `loadScopeEntities` milik adapter, menghasilkan satu kumpulan kemunculan untuk setiap entitas konkret. Kemunculan tingkat entitas menggunakan kunci `definitionId:occurrenceISO:offset`, sedangkan kemunculan bercakupan diberi ruang nama berdasarkan id entitas agar tidak pernah bertabrakan. Menyisipkan atau memperbarui sebuah kemunculan **menghidupkan kembali** baris yang sebelumnya dibatalkan. Membatalkan lalu memperluas ulang adalah cara standar untuk menyinkronkan kembali pengingat setelah entitas dasarnya berubah. Baris yang sudah berstatus `sent`, `failed`, atau `processing` tidak disentuh.

**Pengiriman** (`ReminderEngine.scan()`) berjalan pada timer 30 menit. Proses ini mengklaim kemunculan yang sudah jatuh tempo (sebuah lease mencegah pemrosesan ganda), memuat penerima melalui adapter entitas, menyaring siapa pun yang sudah tercatat di `reminderSentLog` untuk kemunculan tersebut, lalu memanggil `createNotifications` dengan `deliveryStartLevel: 1` (langsung ke push) ditambah `emailImmediate`/`emailByPerson` ketika saluran definisi mencakup email.

### Pengingat teks

Ketika `channels` sebuah definisi mencakup `sms`, `scan()` memanggil `ReminderEngine.sendSms()` setelah notifikasi push/email dibuat, untuk penerima baru yang sama. Pengiriman teks bersifat opt-in per anggota:

- Setiap penerima melewati `PreferenceGateHelper.evaluate(..., "sms", ...)`, sehingga `allowSms` harus aktif (secara default nonaktif dan diatur dari sakelar **Pesan teks** di B1App), dan saluran `sms` untuk kategori tersebut tidak boleh dinonaktifkan secara khusus. `event_reminders`, `serving_schedule`, dan `tasks` mencantumkan `sms` pada `defaultChannels` maupun `allowedChannels`.
- Orang yang tidak memiliki `mobilePhone` atau yang memiliki `optedOut` akan ditekan. Jika gereja tidak memiliki penyedia teks, sisa batch ditekan dengan alasan `no_provider`.
- Isi pesan dibangun oleh `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, dipangkas menjadi satu segmen 160 karakter.
- Setiap penerima mendapatkan baris `reminderSentLog` sendiri dengan `channel: "sms"` dan status `sent` / `suppressed` / `failed`, yang dikunci secara terpisah dari baris push/email, sehingga teks yang gagal tidak pernah mengirim ulang push atau email.

Editor hanya menampilkan **Teks** ketika `GET /messaging/texting/status` mengembalikan `{ enabled: true }` (penyedia teks pertama gereja aktif).

**Berhenti berlangganan (STOP).** `POST /messaging/texting/inbound/:churchId/:token` adalah webhook anonim yang ditempelkan gereja ke penyedianya (B1Admin menampilkan URL dari `GET /messaging/texting/inboundUrl` di pengaturan teks). Token adalah HMAC dari id gereja (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` menerima field formulir gaya Twilio dan JSON gaya Clearstream/TextInChurch. Jika balasan persis berupa kata henti dari operator (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), setiap orang di gereja yang belum dihapus dan nomor selulernya cocok akan mendapatkan `people.optedOut = true` dan `allowSms = false`. Balasan lain diakui dan diabaikan.

Bus event internal bereaksi terhadap perubahan entitas tanpa menunggu ekspansi malam hari: event konten (melalui dispatcher webhook) dan event pembaruan rencana/tugas memicu ekspansi ulang atau pembatalan segera untuk entitas terkait, dan pembaruan rencana juga memperluas ulang definisi cakupan yang terhubung dengan jenis rencananya.

### Adapter

Mesin ini tidak bergantung pada jenis entitas tertentu. Setiap jenis entitas yang didukung dihubungkan melalui adapter (`helpers/adapters/`):

| Jenis entitas | Adapter | Catatan |
|---------------|---------|---------|
| `event` | `EventReminderAdapter` | Penerima dibatasi pada pendaftar atau anggota grup, bergantung pada acara dan `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Penerima adalah penugasan yang Diterima + Belum Dikonfirmasi pada rencana yang sudah dipublikasikan (bukan draf). Penugasan Belum Dikonfirmasi yang diterbitkan melalui workflow konfirmasi pelayanan dikecualikan sampai diterima (lihat di bawah). `buildEmails` memanggil `DoingModuleGateway.buildPlanReminderEmails`, yang merender posisi, catatan, dan pesan kustom melalui `doing/helpers/PlanReminderEmailHelper`, termasuk tombol Terima/Tolak yang ditandatangani oleh `ReminderTokenHelper` dan dikirim ke endpoint publik respons penugasan. |
| `task` | `TaskReminderAdapter` | Penerima adalah penanggung jawab tugas. |

### Endpoint

| Metode | Path | Tujuan |
|--------|------|--------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Memuat atau menyimpan definisi pengingat untuk satu entitas. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Memuat atau menyimpan definisi pengingat tingkat cakupan (diwarisi). |
| `DELETE` | `/messaging/reminders/:defId` | Menghapus definisi dan membatalkan kemunculan yang masih tertunda. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Menampilkan pratinjau jumlah penerima dan waktu kirim berikutnya untuk pengingat acara sebelum disimpan. |
| `GET` | `/messaging/reminders/log` | Riwayat kemunculan pengingat terbaru untuk sebuah gereja. |
| `POST` | `/messaging/reminders/mute` | Membisukan pengingat untuk entitas tertentu. |

Menyimpan definisi memicu ekspansi ulang secara sinkron untuk entitas atau cakupan tersebut, sehingga editor dapat melihat "pengiriman berikutnya" yang terbaru tanpa menunggu tugas malam hari.

## Pesan langsung

Pesan langsung menggunakan corong yang sama dengan semua hal lain, bukan jalur eskalasi terpisah. Setiap percakapan yang belum dibaca mendapatkan satu **baris bayangan** di `notifications` (`contentType='privateMessage'`, `contentId` = id pesan pribadi, `category='direct_messages'`) yang memiliki seluruh status pengiriman, yaitu eskalasi socket/push/email, pelacakan baca, dan semuanya. Tabel `privateMessages` tetap menyimpan isi pesan dan kolom `notifyPersonId`, yang menjadi sumber lencana belum dibaca dan dikosongkan ketika penerima membaca percakapan.

Baris bayangan tidak terlihat oleh ikon lonceng notifikasi: baris ini dikecualikan dari kueri jumlah belum dibaca, kueri daftar notifikasi, dan kueri tandai-dibaca/hapus, yang semuanya menyaring `contentType <> 'privateMessage'`. Setiap ping DM mengenai socket tanpa memandang status belum dibaca (semantik obrolan langsung, tanpa deduplikasi). DM tidak pernah berhenti di pengiriman socket seperti notifikasi biasa, karena PWA yang berjalan di latar belakang dapat menjaga socket tetap terbuka sementara tetap membutuhkan push tingkat OS. Jika seseorang membisukan notifikasi DM, baris bayangan dinonaktifkan sementara (`isNew=false`, `notifyPersonId` dikosongkan). Pesan tetap terlihat di dalam percakapan itu sendiri, tetapi tanpa lencana atau peringatan.

## Preferensi dan gerbang

Setiap pengiriman melewati `PreferenceGateHelper.evaluate()`, sebuah fungsi murni (semua status diteruskan sebagai argumen, tanpa pemanggilan basis data pada jalur panas) yang mengembalikan `allow`, `suppress`, atau `defer`. Lapisan dijalankan berurutan, dan lapisan pertama yang memutuskan akan menang:

1. **Kategori terkunci**: beberapa kategori bersifat wajib (tingkat 0) dan melewati semua lapisan lain.
2. **Bisukan utama / matikan saluran**: `masterMute`, `allowPush`, `allowSms` (nonaktif secara default, anggota harus memilih untuk mengaktifkan), atau `emailFrequency='never'` langsung menekan pengiriman.
3. **Jam tenang**: hanya untuk push dan SMS (email dianggap tidak mengganggu). Jika waktu dinding saat ini di zona waktu orang tersebut berada dalam jendela tenangnya, kategori transaksional tetap diteruskan; kategori non-transaksional ditunda hingga akhir jendela tenang, yang dihitung sebagai instan UTC yang akurat terhadap DST melalui `TimezoneHelper.wallClockToUtc`.
4. **Penggantian preferensi per kategori**: opt-out eksplisit untuk satu pasangan kategori × saluran; ketiadaan berarti nilai default kategori.
5. **Bisukan per entitas**: bisukan yang dicatat pada entitas tertentu (misalnya satu acara, satu rencana) membatasi lebih ketat daripada pengaturan tingkat kategori, tetapi hanya berlaku jika pemanggil menyertakan id/jenis entitas bersama notifikasi.

Tabel yang terlibat: `notificationPreferences` (global: `masterMute`, `emailFrequency` berupa `individual|daily|weekly|never`, `allowPush`, jendela jam tenang beserta zona waktunya, `allowSms`), `notificationPreferenceOverrides` (per kategori × saluran), dan `notificationEntityMutes` (per entitas).

Gerbang ini diterapkan untuk dalam aplikasi (level 0), push (level 1), dan email (level 2) di dalam corong, termasuk email pengingat dan ringkasan langsung, serta untuk pesan teks pengingat di `ReminderEngine.sendSms()`. Email transaksional (kode autentikasi, reset kata sandi, undangan, kwitansi donasi) melewatinya secara sengaja. Itulah inti dari pintu kedua.

### Workflow konfirmasi pelayanan

Sebuah rencana dapat memilih workflow `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Publish/Notify kemudian memanggil `POST /doing/plans/:id/issueRequests` alih-alih notifikasi per penugasan: setiap penugasan Belum Dikonfirmasi yang baru mendapatkan `notified` + `confirmationWorkflowId` dan satu kartu workflow (`tasks.assignmentId`, `followupKey` unik). Kartu tersebut mengirim peringatan khusus aplikasi (`appOnly: true`, tanpa eskalasi push/email), lalu menjalankan tindakan `sendAssignmentRequest` dari workflow, yang melewati `MessagingModuleGateway.sendServingWorkflowMessage`: email melalui `NotificationHelper.sendWorkflowEmail` (gerbang preferensi + `ChurchEmailLimiter`, dihitung sebagai `workflowEmail`), SMS melalui `sendPersonText` hanya dengan `allowSms` dan gerbang kategori `serving_schedule`. Terima/Tolak (`assignment.updated` pada bus event) menutup kartu; timer 30 menit (`AssignmentWorkflowHelper.processPending`) memperbaiki mulai dan acara yang terlewat, serta mengubah permintaan yang belum dijawab pada batas waktu tindak lanjut menjadi tugas tinjauan oleh pemimpin. Siklus hidup lengkap: `Api/docs/assignment-confirmation-workflows.md`.

## Batas email yang ditulis gereja

Email yang isinya ditulis oleh gereja dikirim dari identitas SES ChurchApps bersama, sehingga pemakaiannya diukur per gereja oleh `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Empat jalur memanggilnya: pengiriman grup/templat (`EmailTemplateController`, jenis konten `email`), email tindak lanjut formulir (`FormSubmissionController`, `formFollowUp`), tindakan workflow **Kirim email** (`NotificationHelper` dengan `churchAuthored`, `workflowEmail`), dan email permintaan konfirmasi pelayanan (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Email sistem (kode autentikasi, kwitansi, pengingat) serta undangan peran dan grup (`UserController.sendInviteEmail`, templat tetap) tidak dihitung.

- **Gerbang persetujuan.** Sebuah gereja tidak mengirim apa pun sampai admin server mengatur `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Gereja yang diarsipkan selalu diblokir. Dialog Kirim Email di B1Admin membaca `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) dan, jika belum disetujui, menampilkan kartu **Ajukan tinjauan** sebagai pengganti editor. Editor langkah workflow membaca endpoint yang sama (terbuka bagi `tasks.admin` maupun `groupMembers.edit`) untuk memberi peringatan pada tindakan **Kirim email** ketika gereja belum disetujui atau dijeda. Saat pengiriman, `MessagingModuleGateway.sendTemplatedEmail` mengembalikan `false` tanpa membuat notifikasi ketika `ChurchEmailLimiter.remaining()` kurang dari 1, sehingga riwayat kartu tidak pernah menampilkan **Email terkirim** untuk email yang dibuang. `POST /messaging/emailTemplates/requestApproval` mengirim email ke support, paling banyak sekali per gereja per minggu.
- **Kuota yang diperoleh.** Gereja yang sudah disetujui mendapatkan `max(150, 2 × hari terbaiknya untuk email yang ditulis gereja dalam 30 hari sebelumnya)`, dibatasi 2.000 per 24 jam bergulir. 24 jam berjalan dikecualikan dari "hari terbaik" agar lonjakan tidak dapat menaikkan batasnya sendiri.
- **Cadangkan, lalu selesaikan.** `reserve()` menulis satu baris `deliveryLogs` untuk setiap penerima sebelum pengiriman, memeriksa ulang kuota dengan baris-baris tersebut dihitung, dan membatalkan jika dua permintaan melewati batas secara bersamaan (pengiriman mengembalikan 429). `settle()` menandai setiap baris sebagai terkirim atau gagal.
- **Jeda karena keluhan.** Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, dialirkan dari SES → SNS) mengaitkan setiap bounce permanen atau keluhan dengan gereja yang email tulisannya sampai ke alamat tersebut sekitar waktu itu, disimpan sebagai `deliveryMethod` `sesBounce` / `sesComplaint`. Sebuah gereja dijeda pada 2 keluhan atau lebih (≥ 0,3% dari pengiriman) atau 10 bounce keras atau lebih (≥ 5%) dalam 7 hari.

## Penjadwalan

Mesin pengingat dan ringkasan notifikasi sama-sama memanfaatkan timer terjadwal yang sudah ada, tanpa memperkenalkan infrastruktur baru:

| Timer | Jadwal | Menjalankan |
|-------|--------|-------------|
| Timer 30 menit | setiap 30 menit | Mengeskalasi notifikasi belum dibaca; mengirim email ringkasan frekuensi `individual`; mengirim kemunculan pengingat yang jatuh tempo (`ReminderEngine.scan`); ringkasan persetujuan; eksekusi otomasi yang jatuh tempo |
| Timer malam | 05:00 UTC | Pengingat kehadiran grup; memajukan layanan streaming berulang; menyegarkan daftar yang diperbarui otomatis; memperluas kemunculan pengingat untuk horizon berikutnya (`ReminderEngine.expandAll`); mengirim email ringkasan frekuensi `daily` |

Secara lokal, logika yang sama dapat dipicu sesuai permintaan dengan `npm run timer:30min` dan `npm run timer:midnight` dari proyek `Api`.

## Daftar berkas

| Area | Berkas |
|------|--------|
| Corong | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Titik masuk bersama | `Api/src/shared/helpers/NotificationService.ts` |
| Pintu transaksional | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, aturan lint `Api/tools/eslint-rules/email-door.cjs` |
| Batas email gereja | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Mesin pengingat | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Teks / opt-out STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (**Kirim Teks ke Relawan** pada ikhtisar pelayanan) |
| Repositori pengingat | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email pelayanan/rencana | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Editor pengingat (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Editor pengingat / preferensi (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Halaman terkait

- [Arsitektur Real-time](../realtime.md): protokol WebSocket dan primitif klien (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) yang digunakan oleh level pengiriman dalam aplikasi
- [Notifikasi Web Push](../web-push.md): pengaturan VAPID dan jalur Push API peramban yang digunakan oleh level eskalasi push
- [Endpoint Messaging](../api/endpoints/messaging.md): permukaan REST lengkap untuk pesan, percakapan, koneksi, serta rute notifikasi dan pengingat
