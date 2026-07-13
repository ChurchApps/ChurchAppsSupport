---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** yi-add-on lesemtsetfweni ye-Google Sheets ye-B1.church. Yengeta i-sidebar kunoma iyiphi ispredishithi lekhipha Bantfu, Iminikelo, Emacembu, nome Kubakhona kusuka kulibandla lakho le-B1 ibayise emathebulini lanemagama akhethiwe — ngesikhatsi lesidzingekile, ngekuchofota kanye. I-add-on isebenta ngekhatsi kwe-akhawunti ye-Google yemsebentisi kuphela; akukho lokutsintsa emaseva e-ChurchApps ngaphandle kwekubitwa kwe-API lokufunda kuphela lokwentiwa yinkhipho ngayinye.

</div>

<div class="prereqs">
<h4>Ngaphambi Kwekucala</h4>

- I-akhawunti ye-Google lenemvumo yekuhlela ispredishithi lofuna kukhipha kuso
- Umphatsi welibandla (nome nome ngubani lonemvumo yekufunda imininingwane lofuna kuyikhipha) longakwati kucalisa ikhiya ye-B1 API
- I-add-on ye-B1 Export lifakwe kusuka ku-Google Workspace Marketplace

</div>

## Loko Lekukhiphako

| Intfo yemenyu | Ithebhu yesipredishithi | Imininingwane |
|---|---|---|
| Export People | `B1 People` | ID, Ligama Lelikhonjiswako, Lekucala, Lekugcina, I-imeyili, Simo Selilungu |
| Export Donations | `B1 Donations` | ID, Person ID, Lusuku, Inani, Indlela, Batch ID |
| Export Groups | `B1 Groups` | ID, Ligama, Sigaba, Inani Lemalungu |
| Export Attendance | `B1 Attendance` | ID, Person ID, Lusuku Lwekuvakasha, Service ID, Group ID |

Inkhipho ngayinye **iyafaka lensha** endzaweni yethebhu yayo lenemagama — kubuyisela inkhipho kukupha situndzu lesisha, hhayi tinhlu letengetiwe. Letinye tithebhu kusipredishithi atitsintswa.

## Kulungiselela

### 1. Yakha ikhiya ye-B1 API lenemkhawulo lofanele

1. Ku-B1Admin hamba uye ku **Settings → Developer → API Keys**.
2. Chofota **New API Key**, uyicalise ngekutsi "Sheets Export", bese unika emkhawulo we-**read** waloko lohlela kukukhipha:
   - `people:read` yenkhipho yeBantfu
   - `donations:read` yeMinikelo
   - `groups:read` yeMacembu
   - `attendance:read` yeKubakhona
3. Ikhiya lekwenta kuphela nkhipho **ayidzingi** i-`settings:write` — loko kwemkhawulo kusetjentiswa kuphela ema-connector lakabisa ema-webhook (Zapier / Make). Gcina lelikhiya libe mfitshane.
4. Gcina bese ukhopisha ikhiya `cak_…`.

### 2. Faka i-add-on

1. Vula ispredishithi lofuna kukhipha kuso.
2. **Extensions → Add-ons → Get add-ons**.
3. Sesha i-**B1 Export** bese uyifaka. I-Google iyakubuta kutsi unike imvumo yekufinyelela emashidini akho kanye ne-HTTP yangaphandle (kuze i-add-on ikwati kubita i-B1 API).

Ngemuva kwekufakwa, intfo ye-**B1 Export** iyakhonjiswa ngaphansi kwemenyu ye-**Extensions** yaso sonkhe sipredishithi lovula ngale akhawunti ye-Google.

### 3. Xhuma ikhiya

1. **Extensions → B1 Export → Connect…** (nome **B1 Export → Connect…** kusuka kubha lemenyu ngemuva kwekuvula kwekucala).
2. Faka ikhiya ye-API ku-sidebar, shiya i-Base URL njenge `https://api.churchapps.org` (ngaphandle kwekutsi uhlola nge-staging), bese uchofota **Save**.
3. Chofota **Test Connection** — "Connection OK" lelicwebetela kuphindzelela kutsi ikhiya iyasebenta.

Ikhiya igcinwa ku**tici tebasebentisi ngabanye** (`PropertiesService.getUserProperties()`) — ihlotjaniswe ne-akhawunti yakho ye-Google, ayikaze ibhalwe kushidi, futsi ayikaze ibonakale kulabanye labahlela lesipredishithi.

## Kwenta Inkhipho

Nome nini:

- **Kusuka kumenyu** — **Extensions → B1 Export → Export People** (nome Donations / Groups / Attendance)
- **Kusuka ku-sidebar** — vula i-sidebar (Connect…) bese uchofota inkhinobho yemininingwane lefanele

I-toast iyaphindzelela nangabe sekuphelile — "N row(s) written to 'B1 People'."

## Kwakha Imibiko Etulu Kwaloko

Emathebhu lakhishiwe yimininingwane lejwayelekile ye-Google Sheets. Yakha kuhlaziya kwakho ngokubhekisa kuletithebhu:

- Ithebhu ye-**sifingqo** ene-`=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` kubala tonkhe timinikelo tekhadi
- **Simo lesihlungiwe** samalungu kuphela nge-`=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Ishathi** yemikhuba yekubakhona lesuka ku `B1 Attendance`

Kubuyisela inkhipho kwenta kabusha ithebhu langaphansi; tinkhomba takho tiyativiyusela ngekutentekela.

## Kuhlela Kukhipha Loku-buyaphindza

I-add-on isebenta ngesikhatsi lesidzingekile ngekungajwayelekile. Kwenkhipho letiphindzaphindzeka ngesonto nome ngenyanga, sebentisa emathulusi e-Apps Script langesikhatsi:

1. **Extensions → Apps Script** kusipredishithi (loku kuvula scripthi ye-add-on lehlotjaniswe).
2. Chofota sithombe se-**⏰ Triggers** kusigcini sangesekela.
3. **Add Trigger** ye-`exportPeople` (nome nome nguluphi msebenti wenkhipho) — khetsa *Time-driven*, *Week timer*, sibonelo *Njalo ngoMsombuluko 6am*.

Inkhipho isebenta ngasemuva ngaphansi kwe-akhawunti yakho ye-Google. Nangabe ikhiya ye-API ishintjiwe nome isusiwe, sicalo siyakuthumela imeyili ngesikhatsi lesilandzelako lekwehluleka kwaso.

## Imvumo Nebumfihlo

- I-add-on icela kuphela i-`spreadsheets.currentonly` (ingakwati kutsintsa kuphela sipredishithi lesivuliwe) ne-`script.external_request` (kuze i-UrlFetchApp ikwati kubita i-B1 API). **Ayiboni** i-Drive yakho, i-Gmail, nome lenye imininingwane ye-Google.
- Ikhiya ye-B1 API igcinwa ngamsebentisi ngamunye — labanye labahlela lesipredishithi lesifanako abakwati kuyibona.
- Onkhe kubitwa kwe-B1 API kwentiwa nge-HTTPS ngekusebentisa `Authorization: Bearer cak_…`.

## Kulungisa Tinkinga

- **"No API key set"** — vula **Extensions → B1 Export → Connect…** bese ufaka ikhiya.
- **"B1 rejected the API key (401)"** — ikhiya isusiwe nome ayilungi. Yicalise kabusha uyifake.
- **"This API key lacks permission for /giving/donations (403)"** — ikhiya ayinawo `donations:read`. Hlela emkhawulo weikhiya ku-B1Admin.
- **Ishidi alibuyaphindzi** ngemuva kwekusebenta — cinisekisa kutsi ubuka ithebhu **lelifanele** (`B1 People` njalonjalo). Inkhipho iyakha ithebhu nangabe beyingekho.
- **"Quota exceeded"** — i-Apps Script inemikhawulo yelanga yamsebentisi ngamunye ku-`UrlFetchApp` (ngalokuvamile tinkhulungwane tekubitwa ngelilanga). Libandla lelikhulu lelinemarekhodi lamanyenti kungadzingeka kuhlukanise inkhipho emalangeni lamanyenti nome usebentise [Make](./make) / kuhlanganiswa lokwakhiwe ngco kwekukhipha lokukhulu.

## Kushintja i-Add-On

I-add-on ivulekile emtfombeni — luhlelo lwe-Apps Script luhlala ku-repo ye `B1Integrations/GoogleSheetsAddon/`. Nangabe udzinga likholomu lesingakukhiphi, imininingwane lengetiwe, nome indlela lehlukile yeluphumela, vula issue nome PR lapho.

## Bona Nako

- [Zapier](./zapier) — kukusinkroniza ngesikhatsi lesingiso esikhundleni sekukhipha ngesikhatsi lesidzingekile
- [Make](./make) — kukusinkroniza ngekushintjwa lokunengiwe
- [API Keys (developer reference)](/docs/developer/api/api-keys)
