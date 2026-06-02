---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

Ang **B1 Export** ay ang opisyal na Google Sheets add-on para sa B1.church. Nagdadagdag ito ng sidebar sa anumang spreadsheet na nag-export ng People, Donations, Groups, o Attendance mula sa iyong B1 church sa mga named tabs — on demand, na may isang click. Ang add-on ay tumatakbo nang buo sa loob ng Google account ng user; wala tungkol dito na umabot sa ChurchApps' servers maliban sa read-only API calls na ginagawa ng bawat export.

</div>

<div class="prereqs">
<h4>Bago Magsimula</h4>

- Isang Google account na may edit access sa spreadsheet na gusto mong mag-export
- Isang church admin (o isang may read access sa data na gusto mong i-export) na maaaring lumikha ng isang B1 API key
- Ang B1 Export add-on ay naka-install mula sa Google Workspace Marketplace

</div>

## Ano ang I-export Nito

| Menu item | Sheet tab | Data |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Bawat export **ay nagpapalit** ng contents ng naka-named tab — ang pag-run ng isang export ay nagbibigay sa iyo ng fresh snapshot, hindi appended rows. Ang ibang mga tabs sa spreadsheet ay untouched.

## Setup

### 1. Lumikha ng isang B1 API key na may tamang scopes

1. Sa B1Admin pumunta sa **Settings → Developer → API Keys**.
2. Mag-click ng **New API Key**, pangalanan ito "Sheets Export", at bigyan ng **read** scopes para sa anumang plano mong i-export:
   - `people:read` para sa People export
   - `donations:read` para sa Donations
   - `groups:read` para sa Groups
   - `attendance:read` para sa Attendance
3. Ang key na nag-export lamang ay **hindi kailangang** `settings:write` — ang scope na ito ay para lamang sa connectors na nag-register ng webhooks (Zapier / Make). Panatilihin ang key na ito na makitid.
4. I-save at kopyahin ang `cak_…` key.

### 2. I-install ang add-on

1. Buksan ang spreadsheet na gusto mong mag-export.
2. **Extensions → Add-ons → Get add-ons**.
3. Maghanap ng **B1 Export** at i-install ito. Hinihiling ng Google na bigyan ng access sa iyong sheets at sa external HTTP (upang ang add-on ay maaaring tawarang ang B1 API).

Pagkatapos ng installation, ang isang **B1 Export** entry ay lumalabas sa **Extensions** menu ng bawat spreadsheet na bubuksan mo gamit ang Google account na ito.

### 3. Konektahan ang key

1. **Extensions → B1 Export → Connect…** (o **B1 Export → Connect…** mula sa menu bar pagkatapos ng unang open).
2. I-paste ang API key sa sidebar, iwanan ang Base URL bilang `https://api.churchapps.org` (maliban kung ikaw ay nag-test laban sa staging), at mag-click ng **Save**.
3. Mag-click ng **Test Connection** — ang berdeng "Connection OK" ay nagko-confirm na ang key ay gumagana.

Ang key ay naka-store sa **per-user properties** (`PropertiesService.getUserProperties()`) — ito ay nakatali sa iyong Google account, hindi kailanman nakaisulat sa sheet, at hindi kailanman makikita sa ibang mga editor ng spreadsheet.

## Pag-run ng isang Export

Isa man:

- **Mula sa menu** — **Extensions → B1 Export → Export People** (o Donations / Groups / Attendance)
- **Mula sa sidebar** — buksan ang sidebar (Connect…) at mag-click ng appropriate dataset button

Ang toast ay nagko-confirm kapag tapos na — "_N_ row(s) written to 'B1 People'."

## Pagbuo ng Mga Reports Sa Itaas

Ang exported tabs ay plain Google Sheets data. Bumuo ng iyong sariling analytics sa pamamagitan ng pagsasanggot sa mga tabs:

- Isang **summary tab** na may `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` upang kabuuhin ang card gifts
- Isang **filtered view** ng mga members lamang na may `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Isang **chart** ng attendance trends na kumukuha mula sa `B1 Attendance`

Ang pag-run ng export ay nag-refresh ng underlying tab; ang iyong mga formula ay nag-update nang automatic.

## Pag-schedule ng Recurring Exports

Ang add-on ay on-demand bilang default. Para sa weekly o monthly exports, gamitin ang Apps Script's built-in time-driven triggers:

1. **Extensions → Apps Script** sa spreadsheet (ito ay nagbubukas ng bound script ng add-on).
2. Mag-click ng **⏰ Triggers** icon sa left sidebar.
3. **Add Trigger** para sa `exportPeople` (o anumang export function) — piliin ang *Time-driven*, *Week timer*, hal. *Every Monday 6am*.

Ang export ay tumatakbo sa background sa ilalim ng iyong Google account. Kung ang API key ay ino-rotate o na-revoke, ang trigger ay nag-email sa iyo sa susunod na pagkakataon na ito ay nabigo.

## Mga Permiso at Privacy

- Ang add-on ay humihiling lamang ng `spreadsheets.currentonly` (maaari lamang nito hawakan ang spreadsheet na ito ay open) at `script.external_request` (upang `UrlFetchApp` ay maaaring tawarang ang B1 API). Ito ay **hindi** nakikita ang iyong Drive, Gmail, o ibang Google data.
- Ang B1 API key ay naka-store per-user — ang ibang mga editor ng parehong spreadsheet ay hindi ito makikita.
- Ang lahat ng B1 API calls ay ginawa sa pamamagitan ng HTTPS na may `Authorization: Bearer cak_…`.

## Troubleshooting

- **"No API key set"** — buksan ang **Extensions → B1 Export → Connect…** at i-paste ang key.
- **"B1 rejected the API key (401)"** — ang key ay na-revoke o mali. Muling lumikha at muling i-paste ito.
- **"This API key lacks permission for /giving/donations (403)"** — ang key ay walang `donations:read`. I-update ang scopes ng key sa B1Admin.
- **Sheet doesn't refresh** pagkatapos ng pag-run — siguraduhin na titingin ka sa *correct* tab name (`B1 People` atbp.). Ang export ay lumilikha ng tab kung ito ay hindi umiiral.
- **"Quota exceeded"** — Ang Apps Script ay naglalaan ng per-user daily quotas sa `UrlFetchApp` (karaniwang libu-libong calls bawat araw). Isang malaking church na may maraming records ay maaaring kailangang hatiin ang exports sa maraming araw o gamitin ang [Make](./make) / isang custom integration para sa high-volume sync.

## Pag-customize ng Add-On

Ang add-on ay open source — ang Apps Script project ay nasa `B1Integrations/GoogleSheetsAddon/` repo. Kung gusto mo ng isang column na hindi namin i-export, isang extra dataset, o isang iba't ibang output format, magbukas ng isang issue o PR doon.

## Makita Din

- [Zapier](./zapier) — para sa real-time sync sa halip na on-demand export
- [Make](./make) — para sa sync na may mas kumplikadong transformations
- [API Keys (developer reference)](/docs/developer/api/api-keys)
