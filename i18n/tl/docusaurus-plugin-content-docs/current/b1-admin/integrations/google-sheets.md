---
title: "Google Sheets"
description: "Ikonekta ang B1 Admin sa Google Sheets gamit ang B1 Export add-on para kunin ang People, Donations, Groups, at Attendance papunta sa mga tab ng spreadsheet kapag kailangan."
---

# Google Sheets

<div class="article-intro">

Ang **B1 Export** ang opisyal na add-on ng Google Sheets para sa B1.church. Naglalagay ito ng sidebar sa alinmang spreadsheet para i-export ang People, Donations, Groups, o Attendance mula sa iyong B1 church papunta sa mga pinangalanang tab — kapag kailangan, sa isang click lang. Ganap na tumatakbo ang add-on sa loob ng Google account ng user; walang ginagawa ito sa mga server ng ChurchApps maliban sa mga read-only na API call na ginagawa ng bawat export.

</div>

:::caution Hindi pa available
Hindi pa nailalathala ang B1 Export add-on sa Google Workspace Marketplace, kaya hindi mo pa ito maii-install ngayon. Hanggang sa maging available ito, i-export ang mga tao mula sa B1Admin (tingnan ang [Exporting Data](../people/exporting-data.md)) at i-import ang CSV sa Google Sheets. Inilalarawan ng lahat ng nasa ibaba kung paano gagana ang add-on kapag nailabas na ito.
:::

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Isang Google account na may edit access sa spreadsheet na gusto mong pagexport-an
- Isang church admin (o sinumang may read access sa datos na gusto mong i-export) na kayang gumawa ng B1 API key
- Ang B1 Export add-on na naka-install mula sa Google Workspace Marketplace

</div>

## Ano ang Ine-export Nito {#what-it-exports}

| Menu item | Tab ng sheet | Datos |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Bawat export ay **pumapalit** sa laman ng pinangalanang tab nito — ang pag-ulit ng export ay nagbibigay ng bagong snapshot, hindi dinadagdag na mga row. Hindi naaapektuhan ang ibang tab sa spreadsheet.

## Setup {#setup}

### 1. Gumawa ng B1 API key na may tamang scope {#1-create-a-b1-api-key-with-the-right-scopes}

1. Sa B1Admin, pumunta sa **Settings → Developer → API Keys**.
2. I-click ang **New API Key**, pangalanan itong "Sheets Export", at bigyan ng **read** scope ang anumang ie-export mo:
   - `people:read` para sa People export
   - `donations:read` para sa Donations
   - `groups:read` para sa Groups
   - `attendance:read` para sa Attendance
3. Hindi kailangan ng key na para lang sa export ang `settings:write` — para lang ito sa mga connector na nagrerehistro ng webhook (Zapier / Make). Panatilihing makitid ang key na ito.
4. I-save at i-copy ang `cak_…` key.

### 2. I-install ang add-on {#2-install-the-add-on}

1. Buksan ang spreadsheet na gusto mong pagexport-an.
2. **Extensions → Add-ons → Get add-ons**.
3. Maghanap ng **B1 Export** at i-install ito. Hihingi ang Google ng pahintulot na i-access ang iyong mga sheet at ang external HTTP (para matawag ng add-on ang B1 API).

Pagkatapos ng install, lalabas ang entry na **B1 Export** sa ilalim ng menu na **Extensions** ng bawat spreadsheet na bubuksan mo gamit ang Google account na ito.

### 3. Ikonekta ang key {#3-connect-the-key}

1. **Extensions → B1 Export → Connect…** (o **B1 Export → Connect…** mula sa menu bar pagkatapos ng unang pagbukas).
2. I-paste ang API key sa sidebar, iwanang `https://api.churchapps.org` ang Base URL (maliban kung nagte-test ka sa staging), at i-click ang **Save**.
3. I-click ang **Test Connection** — kinukumpirma ng berdeng "Connection OK" na gumagana ang key.

Nakaimbak ang key sa **per-user properties** (`PropertiesService.getUserProperties()`) — nakatali ito sa iyong Google account, hindi kailanman isinusulat sa sheet, at hindi nakikita ng ibang editor ng spreadsheet.

## Pagpapatakbo ng Export {#running-an-export}

Alinman sa:

- **Mula sa menu** — **Extensions → B1 Export → Export People** (o Donations / Groups / Attendance)
- **Mula sa sidebar** — buksan ang sidebar (Connect…) at i-click ang angkop na dataset button

Kinukumpirma ng toast kapag tapos na — "_N_ row(s) written to 'B1 People'."

## Paggawa ng Mga Ulat Gamit Ito {#building-reports-on-top}

Ang mga na-export na tab ay simpleng datos ng Google Sheets. Gumawa ng sarili mong analytics sa pamamagitan ng pag-reference sa mga tab:

- Isang **summary tab** na may `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` para i-total ang mga regalong card
- Isang **filtered view** ng mga miyembro lang gamit ang `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Isang **chart** ng mga trend ng attendance na kumukuha mula sa `B1 Attendance`

Kapag inulit mo ang export, nare-refresh ang pinagbabatayang tab; awtomatikong nag-a-update ang iyong mga formula.

## Pag-iskedyul ng Paulit-ulit na Export {#scheduling-recurring-exports}

Ang add-on ay on-demand bilang default. Para sa lingguhan o buwanang export, gamitin ang mga built-in na time-driven trigger ng Apps Script:

1. **Extensions → Apps Script** sa spreadsheet (magbubukas ito ng naka-bind na script ng add-on).
2. I-click ang icon na **⏰ Triggers** sa kaliwang sidebar.
3. **Add Trigger** para sa `exportPeople` (o anumang export function) — piliin ang *Time-driven*, *Week timer*, hal. *Every Monday 6am*.

Tumatakbo ang export sa background sa ilalim ng iyong Google account. Kung napalitan o nabawi ang API key, magpapadala sa iyo ng email ang trigger sa susunod na pagkabigo nito.

## Pahintulot at Privacy {#permissions--privacy}

- Humihingi lang ang add-on ng `spreadsheets.currentonly` (ang spreadsheet lang na bukas dito ang puwede nitong galawin) at `script.external_request` (para matawag ng `UrlFetchApp` ang B1 API). Hindi nito nakikita ang iyong Drive, Gmail, o iba pang datos ng Google.
- Naka-imbak ang B1 API key kada user — hindi ito makikita ng ibang editor ng parehong spreadsheet.
- Lahat ng tawag sa B1 API ay ginagawa sa HTTPS gamit ang `Authorization: Bearer cak_…`.

## Troubleshooting {#troubleshooting}

- **"No API key set"** — buksan ang **Extensions → B1 Export → Connect…** at i-paste ang key.
- **"B1 rejected the API key (401)"** — nabura ang key o mali ito. Gumawa ng bagong key at i-paste ito.
- **"This API key lacks permission for /giving/donations (403)"** — walang `donations:read` ang key. Hindi mababago ang scope ng umiiral na key, kaya gumawa ng bagong key na may tamang scope sa B1Admin.
- **Hindi nagre-refresh ang sheet** pagkatapos tumakbo — siguraduhing tinitingnan mo ang *tamang* pangalan ng tab (`B1 People` atbp.). Ginagawa ng export ang tab kung wala pa ito.
- **"Quota exceeded"** — nagpapataw ang Apps Script ng araw-araw na quota kada user sa `UrlFetchApp` (karaniwang libu-libong tawag kada araw). Maaaring kailangang hatiin ng malaking simbahan na maraming record ang mga export sa maraming araw, o gumamit ng [Make](./make.md) / custom na integration para sa high-volume na sync.

## Kulang ang Isang Column? {#missing-a-column}

Kung gusto mo ng column na hindi namin ine-export, dagdag na dataset, o ibang output format, mag-email sa [support@churchapps.org](mailto:support@churchapps.org).

## Tingnan Din {#see-also}

- [Zapier](./zapier.md) — para sa real-time sync sa halip na on-demand na export
- [Make](./make.md) — para sa sync na may mas kumplikadong transformation
- [API Keys (developer reference)](/docs/developer/api/api-keys)
