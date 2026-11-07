---
title: "Check-In"
---

# Check-In

<div class="article-intro">

Check-in adalah satu sistem dengan tiga pintu masuk: aplikasi kiosk B1Checkin untuk stasiun yang dijaga staf maupun layanan mandiri, check-in mandiri di portal anggota B1App, dan pencatatan kehadiran di sisi admin dalam B1Admin. Ketiganya menulis ke modul kehadiran yang sama di Api inti, dan perutean ruang kelas sepenuhnya digerakkan oleh Groups. Tidak ada entitas terpisah bernama "lokasi" atau "ruangan". Di atasnya terdapat lapisan keselamatan anak: jenis check-in per kunjungan, gerbang kapasitas dan rasio relawan di sisi server, verifikasi penjemputan tepercaya saat check-out, serta pemanggilan orang tua melalui penyedia SMS gereja. Halaman ini memetakan model data, alur check-in, lapisan keselamatan, dan jalur pencetakan label.

</div>

## Ikhtisar

```
┌──────────────────────────┐
│ B1Checkin (kiosk Expo)   │──┐         ┌──────────────────────────────────────────────┐
│  pencarian → rumah →     │  │         │ Api                                          │
│  grup → selesai/cetak    │  │  HTTPS  │  ┌─ modul membership ──────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (check-in mandiri) │──┤         │  └─────────────────────────────────────────┘ │
│  layar /mobile/checkin   │  │         │  ┌─ modul attendance ──────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staf)           │──┘         │  │ groupServiceTimes  (perutean ruangan)   │ │
│  pengaturan · laporan ·  │            │  │ sessions ← visitSessions → visits       │ │
│  desainer label          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Jalur cetak label (hanya kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (templat label, atau fallback HTML bawaan)
       └▶ LabelRenderer → dokumen HTML + barcode SVG inline
            └▶ PrintUI: render WebView → tangkapan JPG ViewShot
                 └▶ modul native printer-helper → Brother QL / Zebra
```

| Permukaan | Repo | Stack | Peran |
|-----------|------|-------|-------|
| Kiosk | `B1Checkin` | Expo / React Native, perutean file expo-router; build EAS untuk Android, Amazon Fire, dan iOS; pembaruan OTA lewat `expo-updates` | Stasiun yang dijaga staf atau layanan mandiri dengan pencetakan label dan check-out terverifikasi |
| Check-in mandiri | `B1App` | Next.js (portal anggota b1.church) | Anggota yang sudah masuk men-check-in rumah tangga mereka dari ponsel; tanpa pencetakan |
| Admin | `B1Admin` | React SPA | Mengonfigurasi struktur layanan, menugaskan grup ke waktu layanan, mendesain label, mencatat kehadiran manual, menjalankan laporan |

Ketiganya memanggil dua modul API yang sama melalui `ApiHelper`: **MembershipApi** (`/membership`) untuk orang, rumah tangga, dan grup; **AttendanceApi** (`/attendance`) untuk semua yang tercantum di bawah.

## Model data (`Api/src/modules/attendance`)

| Entitas / tabel | Field kunci | Makna |
|-----------------|-------------|-------|
| `campuses` | name, address | Sudah tidak digunakan di sini — kampus dikelola di modul membership (`/membership/campuses`); salinan attendance dibekukan hanya-baca untuk pembaca lama (`models/Campus.ts`) |
| `services` | campusId, name | Pertemuan berulang, misalnya "Ibadah Minggu Pagi" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Slot waktu dalam sebuah layanan, misalnya "09.00" (`models/ServiceTime.ts`). Kolom jadwal bersifat opsional (migrasi `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) dan menggerakkan [jendela check-in](#jendela-check-in-terjadwal) |
| `groupServiceTimes` | groupId, serviceTimeId | Tabel penghubung: grup (ruang kelas) mana yang bertemu di waktu layanan mana (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Satu pertemuan dari satu grup pada satu tanggal — dibuat secara lazy saat check-in (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Satu orang yang hadir pada satu tanggal (`models/Visit.ts`). `checkinType` berisi `member` / `guest` / `volunteer` (NULL = anggota lama), diatur oleh kiosk dan digunakan oleh gerbang kapasitas/rasio |
| `visitSessions` | visitId, sessionId | Sesi mana saja yang dicakup oleh satu kunjungan — anak yang di-check-in ke dua waktu layanan akan mendapat dua baris (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (blok JSON) | Tata letak label yang dapat didesain (`models/LabelTemplate.ts`) |

### Cara check-in yang selesai disimpan

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) menangani `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Body-nya berupa array objek `Visit`, masing-masing membawa `visitSessions` yang field `session`-nya hanya menyebut pasangan `(serviceTimeId, groupId)`. Server kemudian:

1. **Memeriksa kapasitas dan rasio sebelum ada penulisan.** `evaluateGates()` → `CheckinGateHelper.evaluate()` memeriksa setiap ruangan tujuan: kapasitas, kapasitas tamu, status tutup, dan rasio relawan terhadap jumlah hadir saat ini. postCheckin **tidak transaksional**, sehingga gerbang harus dijalankan sebelum penyimpanan pertama — pelanggaran berat mengembalikan 409 yang menyebut ruangan yang bermasalah dan tidak ada yang tersimpan. Lihat [Gerbang kapasitas dan rasio relawan](#gerbang-kapasitas-dan-rasio-relawan).
2. **Menyelesaikan sesi secara lazy.** `getSessionId()` mencari atau membuat baris `sessions` untuk `(groupId, serviceTimeId, hari ini)` — id sesi di-cache dalam proses per tanggal. Sesi baru memicu webhook `session.created`. Loop-nya adalah `for..of` dengan await — `forEach(async …)` yang sebelumnya tidak di-await menyebabkan balapan dengan penyimpanan dan menulis sessionId NULL saat pembuatan sesi pertama (sudah diperbaiki; dicatat dalam komentar kode di loop).
3. **Mengganti catatan hari itu.** Kunjungan yang sudah ada untuk orang-orang tersebut pada layanan itu hari ini dihapus beserta visitSessions-nya, lalu kumpulan yang dikirim disimpan. Karena itu, check-in ulang sebuah keluarga adalah operasi idempoten "ini adalah keadaan terkini", bukan penambahan. Mengirim `?checkDuplicates=true` sebagai gantinya mengembalikan `{ duplicates: [personId…] }` tanpa menulis apa pun, dan inilah cara kiosk memberi peringatan sebelum menimpa.
4. **Membuat satu kode keamanan per batch.** `SecurityCodeHelper.generate()` menghasilkan kode 4 karakter dari alfabet `23456789BCDFGHJKLMNPQRSTVWXYZ` (tanpa huruf vokal atau karakter yang ambigu, sehingga kode tidak bisa membentuk kata atau salah dibaca). Server mencoba ulang jika terjadi tabrakan dengan kunjungan terbuka hari yang sama di gereja yang sama, lalu mencantumkan kode itu pada setiap kunjungan dalam batch.
5. **Mengembalikan `{ streaks, securityCode }`.** `streaks` memetakan personId ke jumlah kehadiran minggu berturut-turut; kiosk merayakan tonggak (setiap minggu ke-5) dengan confetti.

Setiap kunjungan yang tersimpan juga memicu webhook `attendance.recorded`. Sisi baca, `GET /attendance/visits/checkin`, mengembalikan kunjungan orang-orang tersebut dari **tanggal terakhir yang tercatat** — jika itu minggu sebelumnya, id-nya dihapus sehingga klien menerima salinan terisi awal dari pilihan ruangan minggu lalu yang akan tersimpan sebagai catatan baru.

### Check-out

Dua endpoint melengkapi siklusnya (`VisitController`):

- `GET /attendance/visits/code/:code` — kunjungan hari ini yang belum di-check-out dan membawa kode keamanan tersebut, dengan sesi yang sudah terisi.
- `POST /attendance/visits/checkout` — body `{ visitIds, checkedOutBy?, checkedOutById? }`; mengisi `checkoutTime` dan siapa yang menjemput, serta memicu webhook `attendance.checkout` untuk setiap kunjungan.

Izin: kiosk melakukan autentikasi dengan `attendance.checkin`, yang memberikan akses tepat ke permukaan check-in/check-out/templat label, ditambah pencarian rumah tangga yang dibutuhkan kiosk tanpa `people.view` (pencarian telepon/nama, anggota rumah tangga dalam model check-in, dan daftar penjemput rumah tangga). `SessionHelper.filterChurches` di B1Checkin hanya menawarkan gereja tempat akun memiliki `Attendance/Checkin` atau `Attendance/Edit`. `Checkin` tidak lagi menjadi bagian dari izin Everyone (null-role) (`RoleHelper` dan migrasi `2026-11-01_remove_everyone_checkin`), sehingga harus diberikan melalui peran nyata; `attendance.view`/`attendance.edit` mencakup pelaporan dan entri manual; struktur (layanan, waktu layanan, penugasan grup) memerlukan `services.edit`. Check-in mandiri anggota (B1App) tidak memerlukan izin apa pun: pengguna terautentikasi mana pun yang memiliki orang tertaut di gereja boleh memanggil `GET`/`POST /attendance/visits/checkin`, dan server membatasi `personId` yang dikirim hanya pada rumah tangga pemanggil sendiri (403 jika tidak) — pagar inilah yang mencegah `securityCode` keluarga lain terbaca. Keanggotaan adalah izinnya; apakah anggota *melihat* fitur ini dikendalikan oleh tab navigasi B1App gereja. Endpoint check-in lainnya (`code/:code`, `checkout`, `guardians`, `CheckinController`) tetap hanya untuk kiosk/staf.

## Grup menggerakkan perutean ruangan

Tidak ada entitas ruangan atau kelas di mana pun dalam sistem. "Ruangan" adalah **grup** keanggotaan dengan `trackAttendance` aktif, yang terhubung ke satu atau lebih waktu layanan melalui `groupServiceTimes`. Field grup (pada `Api/src/modules/membership/models/Group.ts`) yang membentuk perilaku kiosk:

| Field | Efek |
|------|--------|
| `trackAttendance` | Grup ikut serta dalam kehadiran; pohon pengaturan B1Admin menandai grup `trackAttendance` yang tidak memiliki baris `groupServiceTimes` sebagai belum ditugaskan |
| `parentPickup` | Menandai ruangan anak: check-in ke ruangan ini menjadikan kunjungan sebagai kunjungan "anak", yang mencetak label penjemputan keluarga dan mencantumkan kode keamanan pada name tag |
| `printNametag` | Apakah check-in ke grup ini mencetak name tag sama sekali |
| `capacity` / `guestCapacity` / `checkinClosed` | Batas kapasitas ruangan dan sakelar "tutup" keras, ditegakkan di server oleh gerbang check-in (diedit di pengaturan grup B1Admin pada "Kapasitas Check-In") |
| `volunteerRatio` / `minVolunteers` | Rasio anak per relawan dan jumlah minimum relawan, ditegakkan sesuai pengaturan gereja `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Batas kelayakan usia/kelas yang dievaluasi di sisi kiosk untuk menyorot atau meredupkan ruangan |

Setiap klien melakukan denormalisasi dengan cara yang sama (misalnya `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): muat `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, dan `GET /membership/groups` secara paralel, lalu untuk setiap waktu layanan kumpulkan grup yang baris `groupServiceTimes`-nya menunjuk ke waktu tersebut ke dalam `serviceTime.groups`. Array itulah yang ditampilkan oleh pemilih ruangan, diurutkan berdasarkan `categoryName` grup.

Penugasan diedit dari halaman grup di B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), dan seluruh pohon Kampus → Layanan → Waktu Layanan → Grup divisualisasikan di `B1Admin/src/attendance/components/AttendanceSetup.tsx` melalui `GET /attendance/attendancerecords/tree`.

:::info
Karena grup adalah satu-satunya sumber kebenaran, keanggotaan grup yang sama menggerakkan perutean kiosk, pencatatan kehadiran bergaya daftar di halaman grup B1Admin, dan pelaporan kehadiran — menugaskan grup ke waktu layanan adalah satu-satunya langkah yang diperlukan agar grup menjadi tujuan check-in.
:::

## Keamanan anak

### Jenis check-in

Setiap kunjungan membawa `checkinType` — `member`, `guest`, atau `volunteer` (NULL berarti lama/anggota; migrasi `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Jenisnya dipilih **di sisi kiosk**: chip Anggota / Tamu / Relawan pada baris anggota yang diperluas (`B1Checkin/src/components/MemberServiceTimes.tsx`), dicantumkan pada setiap kunjungan tertunda saat selesai (`app/checkinComplete.tsx`, secara default `member`). Server menggunakannya di gerbang — relawan dihitung untuk cakupan rasio alih-alih terhadap kapasitas, dan tamu dihitung terhadap `guestCapacity`.

### Gerbang kapasitas dan rasio relawan

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) berjalan di dalam `postCheckin` sebelum penyimpanan apa pun (endpoint ini tidak transaksional, sehingga pemeriksaan sebelum penyimpanan adalah mekanisme kebenarannya). Gerbang memuat jumlah hadir saat ini untuk setiap grup tujuan (`VisitRepo.countActiveByGroupToday`) dan konfigurasi grup melalui gateway modul membership, lalu mengklasifikasikan pelanggaran:

- **Keras (selalu memblokir):** `checkinClosed`, `current + incoming > capacity`, jumlah tamu melebihi `guestCapacity`. Batch ditolak dengan `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosk menampilkan ruangan yang disebutkan.
- **Rasio (memperingatkan atau memblokir):** anggota non-relawan yang masuk ke ruangan dengan `volunteers < minVolunteers`, tanpa relawan sama sekali, atau `children > volunteers × volunteerRatio`. Tingkat keparahannya mengikuti pengaturan gereja `ratioEnforcement` (`"warn"` sebagai default / `"block"`, diedit di B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Mode peringatan mengembalikan `409 { warning: true, error: "ratio", … }` kecuali klien mengirim ulang dengan `acknowledgeWarnings=true` — pengiriman ulang itulah override konfirmasi staf dari kiosk.

### Jendela check-in terjadwal

Sebuah waktu layanan dapat memuat jadwal mingguan opsional (`dayOfWeek` 0–6 dengan 0 = Minggu, `startTime`/`endTime` dalam format `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), yang diedit di formulir waktu layanan **Attendance → Setup** B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Jadwal Check-in"). `CheckinGateHelper.hasSchedule()` hanya menganggap waktu layanan terjadwal jika `dayOfWeek` dan `startTime` keduanya diisi; waktu yang tidak terjadwal tidak pernah dibatasi oleh waktu. `isServiceTimeOpen()` menghitung jendela dalam waktu dinding lokal (`DateHelper.toChurchTime`). Zona waktu ditentukan per waktu layanan oleh `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`): `timezone` dari kampus layanan (`service.campusId`, melalui `MembershipModuleGateway.loadCampusTimeZones`) didahulukan, kemudian `timeZone` gereja (diatur di Informasi Gereja B1Admin), lalu kampus pertama yang belum dihapus dan memiliki `timezone` (`loadCampusTimeZone`), dan baru kemudian `America/New_York`. Kampus didahulukan karena banyak gereja memiliki `America/New_York` yang diisi secara retroaktif sebagai zona gereja mereka. Baik daftar maupun jalur posting di bawah menentukan zona dengan cara yang sama. Jendela berjalan dari `checkinOpenMinutes` sebelum mulai hingga `checkinCloseMinutes` setelah selesai (atau setelah mulai jika tidak ada selesai), dan menangani jendela yang melewati tengah malam atau batas minggu.

Jendela ditegakkan di dua tempat:

- **Daftar:** `GET /attendance/servicetimes` memberi setiap baris sebuah boolean `checkinOpen` yang dihitung. Check-in mandiri B1App (`CheckinPage.tsx`) dan pemilih layanan B1Checkin (`app/services.tsx`) tetap menampilkan setiap waktu. Ketika semua waktu layanan tertutup, keduanya menampilkan waktu pembukaan terdekat ("Check-in dibuka Min 09.30." di B1App, "Check-in untuk layanan ini dibuka Min 09.30." di B1Checkin, dari `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), dan jatuh kembali ke "Check-in belum dibuka untuk layanan ini saat ini." jika tidak ada waktu pembukaan yang dapat dihitung (kiosk menyediakan tombol Kembali untuk memilih layanan lain). Selain itu, waktu yang tertutup ditampilkan sebagai baris "Tertutup" / "Tertutup · dibuka 09.30" yang tidak dapat dipilih. Layar rumah tangga B1Checkin (`MemberServiceTimes.tsx`) mengevaluasi ulang status buka secara langsung dengan jam perangkat menggunakan `ServiceTimeHelper.isCheckinOpen()` (zona waktu perangkat, bukan zona gereja) sehingga kiosk yang dibiarkan menyala akan membuka dan menutup tepat waktu, dan menampilkan "Ruang Anak 1 · Sudah di-check-in" (nama grup) pada waktu yang tertutup yang sudah dimiliki orang tersebut.
- **Posting:** di dalam `evaluateGates()`, sebelum evaluasi kapasitas/rasio, `findClosedServiceTimeGroups()` menolak batch dengan `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` jika waktu layanan dari sesi tujuan mana pun berada di luar jendelanya. Karena kunjungan yang sudah ada untuk hari ini dari sebuah rumah tangga dikirim ulang setiap kali check-in, sesi yang sudah dimiliki orang tersebut (`personId|sessionId` dalam kunjungan yang sudah ada) melewati gerbang ini, sehingga menambahkan waktu layanan terbuka yang lebih lambat tidak ditolak hanya karena jendela sebelumnya sudah tertutup. B1Checkin menampilkan ini melalui layar gerbang keras dengan alasan "check-in belum dibuka saat ini" (pelanggaran kapasitas tetap menampilkan "ruangan penuh atau tertutup").

### Kelayakan usia/kelas (sisi kiosk)

Kelayakan ruangan adalah UI bersifat saran, dievaluasi di kiosk, bukan ditegakkan oleh server. `B1Checkin/src/helpers/EligibilityHelper.ts` membandingkan tanggal lahir/kelas seseorang dengan `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` grup (urutan kelas: PreK, K, 1–12, Lulus) dan mengembalikan `eligible` / `ineligible` / `unknown` — data yang hilang menghasilkan `unknown` dan tidak pernah menyembunyikan ruangan. Usia dan kelas dihitung per **tanggal kenaikan kelas** gereja (pengaturan `gradePromotionDate`, `"MM-DD"`, diedit di `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk mengambilnya dari `GET /attendance/checkin/settings`, dan `resolveAsOfDate` memilih kemunculan terbaru pada atau sebelum hari ini. Pemilih ruangan menyorot ruangan yang layak dan meredupkan yang tidak layak; memilih ruangan yang diredupkan memerlukan konfirmasi staf.

### Penjemputan tepercaya dan tidak diizinkan

Orang penjemput adalah entitas membership, per rumah tangga: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId opsional, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD-nya adalah `GET /membership/householdpickup/:householdId` (pengguna gereja terautentikasi mana pun, sehingga kiosk dapat membacanya) ditambah `POST` / `DELETE` yang dibatasi oleh `people.edit`. Staf mengelola daftar di kartu **Penjemputan** pada halaman orang (`B1Admin/src/people/components/PickupPeople.tsx`) — foto, hubungan, dan chip status Tepercaya/Tidak Diizinkan.

Saat check-out (`B1Checkin/app/checkout.tsx`), kiosk memuat daftar penjemput rumah tangga: entri `trusted` ditampilkan sebagai kartu penjemput yang dapat diketuk di samping kisi foto orang dewasa dalam rumah tangga, dan nama "Lainnya" yang diketik bebas dicocokkan secara fuzzy (Levenshtein, `src/helpers/PickupMatchHelper.ts`) dengan entri `notAuthorized` — kecocokan memblokir check-out dengan lembar peringatan dan tombol **Override** staf. Override dicatat pada kunjungan itu sendiri: ia mengirim `checkedOutBy` sebagai `"OVERRIDE: {name}"` melalui `POST /attendance/visits/checkout` yang biasa, sehingga tercatat dalam catatan kehadiran dan webhook `attendance.checkout`, bukan dalam tabel audit terpisah.

### Memanggil orang tua dan siaran darurat

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) menyediakan dua endpoint SMS:

- `POST /page` — `{ visitId, message }`: memanggil wali dari satu anak yang sudah di-check-in (layar check-out kiosk, mode dijaga).
- `POST /broadcast` — `{ serviceId, message }`: mengirim SMS kepada semua orang dewasa dari setiap rumah tangga yang sudah di-check-in untuk sebuah layanan (pengaturan admin kiosk, di balik lembar konfirmasi `EMERGENCY` yang harus diketik di `B1Checkin/app/adminSettings.tsx`).

Keduanya menyelesaikan orang dewasa dalam rumah tangga melalui gateway membership, lalu menyerahkan pengiriman ke **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — pintu lintas-modul ke penyedia SMS yang dikonfigurasi gereja (`@churchapps/texting`: TextInChurch, Clearstream, atau MutualMinistry; tidak ada pengirim SMS bawaan). Gateway mencatat baris `sentText` ditambah entri `deliveryLog` per penerima dan membatasi satu batch hingga 500 penerima; jika tidak ada penyedia yang dikonfigurasi, ia mengembalikan `no_provider`, yang ditampilkan kiosk sebagai "Tidak ada penyedia SMS yang dikonfigurasi". `dispatch()` pada controller menghapus nomor telepon ganda dan melewati orang yang tidak memiliki ponsel atau yang bertanda `optedOut`, lalu mengembalikan `{ sent, failed, skippedOptedOut, skippedNoPhone }` agar kiosk dapat menampilkan apa yang dilewati.

## Kiosk (B1Checkin)

Layar adalah file expo-router di bawah `B1Checkin/app/`; state lintas-layar berada dalam kelas statis `CachedData` (`src/helpers/CachedData.ts`), bukan state React.

```
index (boot/login otomatis) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             memuat serviceTimes, groups, │             │  └─────────┘ └▶ addGuest  └▶ cetak label,
             groupServiceTimes,           │             └▶ checkout (dijaga)           kembali otomatis
             labelTemplates               │                                            ke lookup
```

1. **Pencarian** (`app/lookup.tsx`) — cari berdasarkan telepon (`GET /membership/people/search/phone?number=`, 4 digit terakhir atau lengkap) atau berdasarkan nama (`GET /membership/people/search?term=`). Memilih salah satu hasil memuat rumah tangga (`GET /membership/people/household/{householdId}`) dan kunjungan yang sudah ada (`GET /attendance/visits/checkin`), lalu mengisi `pendingVisits` dengan pilihan minggu lalu.
2. **Tinjauan rumah tangga** (`app/household.tsx`, `src/components/MemberList.tsx`) — setiap baris anggota menampilkan lencana sudah di-check-in, lencana alergi/`nametagNotes`, dan chip ruangan saat ini. Dengan memperluas seorang anggota, daftar setiap waktu layanan muncul beserta tombol ruangan dan chip jenis check-in Anggota / Tamu / Relawan (`MemberServiceTimes.tsx`). Di bawah nama setiap waktu layanan, `ServiceTimeHelper.getGroupSummary()` menampilkan grup yang ditawarkan di sana (nama `serviceTime.groups`, dipangkas, dihapus duplikatnya tanpa memperhatikan huruf besar-kecil, dan digabung dengan koma); tidak ada yang ditampilkan jika waktu tersebut tidak memiliki grup.
3. **Penugasan grup** (`app/selectGroup.tsx`) — pohon kategori yang dibangun dari `serviceTime.groups`, dengan ruangan yang layak usia/kelas disorot dan yang tidak layak diredupkan di balik konfirmasi staf (lihat [Kelayakan usia/kelas](#kelayakan-usiakelas-sisi-kiosk)); memilih ruangan menulis visitSession `{ session: { serviceTimeId, groupId } }` ke kunjungan tertunda orang tersebut (`src/helpers/VisitSessionHelper.ts`). "Tidak ada" menghapusnya.
4. **Selesai** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` dengan `pendingVisits` (masing-masing dicantumkan dengan `checkinType`-nya), lalu mencetak label jika printer dikonfigurasi dan kembali otomatis ke pencarian. Respons `409` kapasitas atau `notOpen` menampilkan ruangan yang disebutkan beserta alasannya (penuh/tertutup, atau check-in belum dibuka); peringatan rasio menawarkan konfirmasi staf yang mengirim ulang dengan `acknowledgeWarnings=true`.

Layar **check-out** (`app/checkout.tsx`) menerima kode keamanan 4 karakter melalui input yang fokus otomatis — sehingga pemindai barcode keyboard-wedge USB/Bluetooth dapat dipakai tanpa kamera — atau keypad di layar yang menggunakan alfabet yang sama, dikirim otomatis setelah 4 karakter. Tombol **Pindai** membuka lembar dengan kamera bersama `src/components/CodeScanner.tsx` (kamera belakang secara default, menerima QR, Code 128, dan Code 39) sehingga stasiun tanpa pemindai wedge dapat membaca label penjemputan; kode yang dipindai masuk ke jalur `handleCode()` yang sama dengan input ketikan. Layar ini mencari kode, menampilkan anak-anak yang akan dijemput, dan menampilkan **orang penjemput tepercaya** rumah tangga sebagai kartu yang dapat diketuk di samping kisi foto orang dewasa dalam rumah tangga (ditambah opsi teks bebas "Lainnya" yang dicocokkan secara fuzzy dengan nama yang tidak diizinkan — lihat [Penjemputan tepercaya dan tidak diizinkan](#penjemputan-tepercaya-dan-tidak-diizinkan)), lalu mengirim `POST /attendance/visits/checkout` dengan nama/id penjemput yang dipilih. Dalam mode dijaga, layar juga menawarkan **Panggil orang tua** (`POST /attendance/checkin/page`) dan **cetak ulang label keamanan** — `reprint()` membangun ulang label keluarga dengan `LabelHelper.getAllLabelsFor(...)` dan memasukkannya melalui pipeline `PrintUI` yang sama dengan check-in.

Kepribadian stasiun adalah flag AsyncStorage `@StationMode` (`"self"` | `"manned"`, diubah di `app/adminSettings.tsx`). Mode dijaga menambahkan titik masuk check-out pada layar pencarian dan pengeditan profil per anggota (`POST /membership/people`) dari layar rumah tangga. Pengerasan kiosk sudah terpasang: PIN opsional (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) membatasi layar admin dan printer, layar admin hanya terbuka dengan 7 ketukan cepat pada logo header, dan layar attract saat idle (`src/hooks/useInactivityTimer.ts`) mengambil alih di antara keluarga.

## Check-in mandiri (B1App)

Anggota men-check-in dari portal b1.church di layar `/mobile/checkin` (diarahkan oleh `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` ke `screens/CheckinPage.tsx`). Layar ini membutuhkan pengguna yang sudah masuk dan menjalani empat langkah yang sama dengan kiosk — layanan → rumah tangga → grup → selesai — terhadap endpoint yang identik, dengan state yang disimpan di `B1App/src/helpers/CheckinHelper.ts`. Perbedaan dari kiosk: rumah tangga berasal dari `householdId` milik pengguna yang masuk (tanpa langkah pencarian), dan tidak ada pencetakan label — sebagai gantinya layar penyelesaian menampilkan kode keamanan batch sebagai QR (`qrcode.react`) dengan petunjuk "tunjukkan ini di stasiun check-in". Jika rumah tangga sudah di-check-in saat halaman dimuat, tombol "Tampilkan kode check-in" menampilkan ulang QR dari kunjungan pertama yang sudah ada (dari `GET /attendance/visits/checkin`) yang membawa `securityCode`. Check-in langsung dicatat saat dikirim (tidak ada status tertunda); QR hanya berfungsi untuk pencetakan label di kiosk.

**Pencetakan label dari ponsel ke kiosk** (`B1Checkin/app/scan.tsx`, dibuka dari tombol "Pindai kode" pada QR di layar pencarian): kiosk menampilkan `CodeScanner` (`CameraView` dari `expo-camera`, kamera depan secara default, dapat dibalik) yang memindai kode QR. `ScanCodeHelper.parse()` hanya menerima muatan yang berupa kode 4 karakter polos dalam alfabet kode keamanan, dan `ScanCodeHelper.isRepeat()` mengabaikan kode yang sama selama 4 detik, sehingga QR dari B1App maupun blok QR pada label cetak sama-sama berfungsi. Layar kemudian mengikuti jalur cetak ulang check-out — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — lalu kembali ke pencarian. Tidak ada penulisan kehadiran saat pemindaian; hanya label. Kode tanpa kunjungan aktif, stasiun tanpa printer, dan grup tanpa label masing-masing menampilkan toast dan kembali ke pencarian.

Tipe serta `ApiHelper`/`ArrayHelper` berasal dari `@churchapps/helpers` dan `@churchapps/apphelper`; tidak ada komponen React yang dibagikan dengan B1Admin.

## Kehadiran sisi admin (B1Admin)

- **Setup** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) merender pohon struktur dan membuat layanan (`ServiceEdit.tsx`) serta waktu layanan (`ServiceTimeEdit.tsx`). Data kampus berasal dari membership melalui hook `useCampuses()`.
- **Kehadiran manual** berada di sisi Grup, bukan di bagian kehadiran: `B1Admin/src/groups/components/GroupSessionsTab.tsx` membuat sesi (`POST /attendance/sessions`; saat menambahkan, `SessionEdit.tsx` dapat menyertakan satu sesi untuk setiap grup lain yang berbagi waktu layanan yang dipilih, dengan melewati grup yang sudah memiliki sesi pada tanggal itu) dan menandai orang hadir melalui `POST /attendance/visitsessions/log`, yang mencari atau membuat kunjungan untuk orang dan sesi tersebut. Pemimpin grup dapat mencatat kehadiran untuk grup mereka sendiri tanpa izin `attendance.edit` — controller memeriksa `au.leaderGroupIds`.
- **Pelaporan** — tren kehadiran dan kehadiran grup adalah laporan yang didefinisikan server (`B1Admin/src/components/reporting/ReportWithFilter.tsx` terhadap ReportingApi; definisinya di `Api/reports/*.json`). Keduanya menerima `startDate`/`endDate` (tanggal akhir inklusif); laporan tren secara default dari satu tahun lalu hingga hari ini dan menambahkan kolom `sessionDates` per minggu, dan pohon di layar kehadiran grup menyertakan `checkinTime` setiap kunjungan serta `membershipStatus` orang tersebut. CSV kehadiran grup berasal dari laporan pendamping `groupAttendanceDownload`, yang dipivot oleh `GroupAttendanceDownloadHelper` menjadi satu baris per anggota grup dengan kolom hadir/tidak hadir untuk setiap sesi yang bertanggal; riwayat per orang berada di `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## Pencetakan label

### Templat dan desainer

Gereja mendesain label mereka sendiri di B1Admin pada `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, dibuka dari halaman pengaturan Check-In). Templat adalah baris `labelTemplates` yang `content`-nya berupa array JSON berisi blok — `text`, `field`, `barcode`, `qrcode`, atau `box` — masing-masing diposisikan dalam koordinat persen dengan font, perataan, simbologi (`code39`/`code128`/`qr`), dan kondisi visibilitas opsional (misalnya hanya merender kotak alergi ketika `person.nametagNotes` tidak kosong). Ada dua `labelType`: `nametag` (satu per orang yang di-check-in; field seperti `person.displayName`, `sessions`, `securityCode`, dan `person.isBirthdayWeek` — `"true"` ketika bulan/hari ulang tahun berada dalam 3 hari dari hari ini, termasuk melewati akhir tahun, dihitung oleh `LabelHelper.isBirthdayWithin()`) dan `pickup` (satu per keluarga; field seperti `children`, `childrenAllergies`). Server menegakkan satu default per tipe per gereja (`LabelTemplateController.save`). Desainer menyertakan templat awal yang meniru label bawaan kiosk dan menampilkan pratinjau dengan data contoh.

### Render dan pencetakan di kiosk

Saat check-in selesai, `B1Checkin/src/helpers/LabelHelper.ts` memutuskan apa yang dicetak berdasarkan flag grup pada setiap kunjungan tertunda: name tag untuk grup `printNametag`, ditambah satu label penjemputan keluarga jika ada kunjungan yang mengenai grup `parentPickup`. Kunjungan dengan `checkinType` `volunteer` dilewati oleh `LabelHelper.selectChildVisits()`, sehingga pekerja penitipan anak di ruangan Parent Pickup tidak pernah memicu label penjemputan. Kode keamanan dari respons check-in dicantumkan pada name tag anak dan label penjemputan; name tag orang dewasa dicetak tanpa kode. Jika gereja memiliki templat, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) mengubah blok + konteks field menjadi dokumen HTML mandiri; jika tidak, label HTML bawaan di `B1Checkin/assets/labels/` digunakan dengan substitusi placeholder.

Barcode dibuat sebagai SVG inline oleh encoder TypeScript murni di `B1Checkin/src/helpers/barcode.ts` — tabel pola Code 39 dan tabel lebar Code 128 (code set B dengan checksum mod-103), serta QR melalui paket `qrcode`. **Encoder ini sengaja diduplikasi di B1Admin** (`LabelEditor.tsx` menyisipkan tabel yang sama, dicatat dalam komentar kode) agar pratinjau desainer sesuai piksel dengan keluaran kiosk; perubahan pada salah satunya harus dicerminkan di yang lain.

Pipeline pencetakan (`src/components/PrintUI.tsx`) merender setiap label HTML dalam `WebView`, menangkapnya menjadi JPG melalui `react-native-view-shot`, dan menyerahkan URI gambar ke modul Expo native **printer-helper** (`B1Checkin/modules/printer-helper/`). Modul ini menyediakan `scan()`, `checkInit()`, `printUris()`, dan event status, dengan provider per merek di kedua platform:

| Merek | Android | iOS | Catatan |
|-------|---------|-----|---------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Printer jaringan seri QL (QL-800/810W/820NWB/1100/1110NWB…), label die-cut 29×90, default yang direkomendasikan |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Penemuan jaringan + pencetakan gambar TCP/ZPL |

Pemilihan printer berada di `app/printers.tsx` (pemindaian jaringan mengembalikan entri `brand~model~ip`; pilihan disimpan ke AsyncStorage), dan `src/helpers/PrinterLog.ts` menyimpan log diagnostik di perangkat yang ditampilkan melalui titik status langsung di header kiosk.

## Pendaftaran tamu

Dua jalur membuat orang baru di tengah check-in:

- **Di kiosk** — tombol "Tambah tamu" di layar rumah tangga membuka `B1Checkin/app/addGuest.tsx`, yang pertama-tama mencari `GET /membership/people/search?term=` untuk kecocokan non-anggota yang sudah ada, dan jika tidak ada, membuatnya dengan `POST /membership/people`, dilampirkan ke rumah tangga saat ini. Tamu tersebut kemudian melalui penugasan grup seperti anggota lainnya.
- **Mandiri melalui QR** — ketika pengaturan gereja `enableQRGuestRegistration` aktif (dikonfigurasi di pengaturan Check-In B1Admin, dibaca dari `GET /membership/settings/public/{churchId}`), layar pencarian kiosk menampilkan kode QR yang mengarah ke `https://{subdomain}.b1.church/guest-register?serviceId=`. Halaman B1App tersebut (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) memungkinkan keluarga pengunjung mendaftarkan diri sendiri dari ponsel mereka melalui endpoint anonim `POST /membership/people/guest-register`, sehingga antrean kiosk tetap bergerak. Lembar QR juga memiliki tombol **Daftar di sini** yang membuka halaman yang sama di kiosk (`app/guestRegister.tsx`) dalam `WebView` mode penyamaran dengan cache dinonaktifkan; `src/helpers/GuestRegisterHelper.ts` membangun URL untuk QR dan WebView dan memblokir navigasi ke luar `https://{subdomain}.b1.church/guest-register`. Layar kembali ke pencarian saat **Selesai**, tombol kembali, atau 120 detik tidak aktif (pengetikan form diteruskan dari WebView sebagai aktivitas), sambil melepas WebView sehingga entri satu keluarga tidak pernah sampai ke keluarga berikutnya.

Pendaftaran QR digerakkan oleh pengaturan gereja yang disimpan dari kartu **QR Guest Registration** di B1Admin (`src/mobile/CheckInPage.tsx`):

| Pengaturan | Visibilitas | Tujuan |
|---|---|---|
| `enableQRGuestRegistration` | publik | Sakelar opt-in untuk QR kiosk dan endpoint anonim |
| `guestRegistrationFields` | publik | Peta JSON dari `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Default: email dan telepon opsional, sisanya nonaktif. Nama depan/belakang selalu wajib |
| `guestRegistrationImage` | publik | URL foto header; B1App menampilkannya dengan rasio 16:9 menggantikan ikon di formulir dan layar konfirmasi |
| `guestRegistrationGroupId` | privat | Grup tempat setiap pendaftaran ditambahkan (tamu tidak pernah melihat atau memilihnya) |
| `guestRegistrationRecordAttendance` | privat | `"true"` untuk juga mencatat kehadiran untuk grup tersebut |

`src/components/checkin/GuestRegister.tsx` di B1App mengambil daftar periksa dari endpoint anonim `GET /membership/people/guest-register/options?churchId=` dan hanya merender field yang disertakan (email, telepon, status pernikahan, dan alamat pada kontak utama; tanggal lahir, jenis kelamin, dan kelas per anggota; satu kotak komentar), dan hanya mengirim field tersebut. Server menerapkan ulang daftar periksa di `GuestRegistrationHelper.sanitize()` — field yang nonaktif dibuang, nilai wajib yang hilang atau di luar daftar menghasilkan 400 — sebelum `PersonHelper.registerGuestHousehold()` dijalankan. Pertama-tama ia memanggil `PersonRepo.findGuestMatch()` untuk setiap anggota yang memiliki email atau telepon: tepat satu orang aktif dengan nama depan yang sama dan email atau digit telepon yang sama akan digunakan kembali (nol atau beberapa kecocokan membuat orang baru, sehingga sistem tidak pernah menebak). Anggota tanpa kontak dicocokkan berdasarkan nama depan di dalam rumah tangga yang cocok. Orang yang digunakan kembali tidak pernah diedit, sehingga formulir anonim tidak dapat menimpa data tersimpan, dan respons mengembalikan nama yang dikirim. Anggota yang tidak cocok bergabung ke rumah tangga yang cocok atau rumah tangga baru, sebagai `membershipStatus: "Visitor"`, dan memancarkan `person.created` untuk setiap orang baru. Setelahnya, kegagalan dicatat alih-alih dikembalikan: anggota ditambahkan ke grup yang dikonfigurasi (`group.member.added`); jika pencatatan kehadiran aktif, `AttendanceModuleGateway.recordAttendance()` menandai setiap anggota hadir untuk setiap waktu layanan grup yang memiliki jadwal dan jendela check-in-nya (`CheckinGateHelper.isServiceTimeOpen`) sedang terbuka saat ini, membuat sesi untuk tanggal gereja lokal hari ini jika diperlukan — waktu layanan tanpa jadwal dan pendaftaran di luar jendela tidak mencatat apa pun; dan komentar menjadi percakapan catatan orang tersembunyi pada kepala rumah tangga (penulis pesan "Pendaftaran tamu"), dihubungkan melalui `person.conversationId`.

## Halaman terkait

- [Endpoint Attendance](../api/endpoints/attendance) -- REST API lengkap untuk kampus, layanan, sesi, kunjungan, dan visit session
- [Endpoint Membership](../api/endpoints/membership) -- Orang, rumah tangga, dan grup
- [Webhook](../api/webhooks) -- Event `session.created`, `attendance.recorded`, dan `attendance.checkout`
- [Struktur Modul](../api/module-structure) -- Cara modul attendance diorganisasi di sisi server
