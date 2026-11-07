---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** yra oficialus Google Sheets priedas, skirtas B1.church. Jis prideda šoninę juostą prie bet kurios skaičiuoklės ir eksportuoja į pavadintus lapus žmones, aukas, grupes ar lankomumą iš jūsų B1 bažnyčios. Eksportas vykdomas pagal poreikį, vienu paspaudimu. Priedas veikia visiškai naudotojo Google paskyroje, ir jo veikla su ChurchApps serveriais apsiriboja tik skaitymo API iškvietimais, kuriuos atlieka kiekvienas eksportas.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Google paskyra, turinti redagavimo teisę į skaičiuoklę, į kurią norite eksportuoti
- Bažnyčios administratorius (arba asmuo, turintis skaitymo teisę į duomenis, kuriuos norite eksportuoti), galintis sukurti B1 API raktą
- B1 Export priedas, įdiegtas iš Google Workspace Marketplace

</div>

## Ką eksportuoja

| Meniu punktas | Lapo skirtukas | Duomenys |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Kiekvienas eksportas **pakeičia** jo pavadinto skirtuko turinį. Pakartotinis eksportas suteikia naują momentinę kopiją, o ne prideda eilutes prie senųjų. Kiti skaičiuoklės skirtukai lieka nepaliesti.

## Sąranka

### 1. Sukurkite B1 API raktą su tinkamomis teisėmis

1. B1Admin programoje eikite į **Settings → Developer → API Keys** (Nustatymai → Kūrėjas → API raktai).
2. Spustelėkite **New API Key**, pavadinkite jį „Sheets Export“ ir suteikite **read** teises tam, ką planuojate eksportuoti:
   - `people:read` žmonių eksportui
   - `donations:read` aukoms
   - `groups:read` grupėms
   - `attendance:read` lankomumui
3. Raktui, skirtam tik eksportams, `settings:write` teisės **nereikia**. Ši teisė reikalinga tik jungtims, registruojančioms webhook (Zapier / Make). Išlaikykite šį raktą kuo siauresnį.
4. Išsaugokite ir nukopijuokite `cak_…` raktą.

### 2. Įdiekite priedą

1. Atidarykite skaičiuoklę, į kurią norite eksportuoti.
2. **Extensions → Add-ons → Get add-ons** (Plėtiniai → Priedai → Gauti priedus).
3. Ieškokite **B1 Export** ir įdiekite jį. Google paprašys suteikti prieigą prie jūsų lapų ir išorinių HTTP užklausų, kad priedas galėtų kviesti B1 API.

Įdiegus, **B1 Export** įrašas atsiras **Extensions** meniu kiekvienoje skaičiuoklėje, kurią atidarysite su šia Google paskyra.

### 3. Prijunkite raktą

1. **Extensions → B1 Export → Connect…** (arba **B1 Export → Connect…** meniu juostoje, kai priedas atidarytas pirmą kartą).
2. Įklijuokite API raktą į šoninę juostą, palikite Base URL kaip `https://api.churchapps.org` (nebent testuojate bandomojoje aplinkoje) ir spustelėkite **Save**.
3. Spustelėkite **Test Connection**. Žinutė „Connection OK“ žaliu tekstu patvirtins, kad raktas veikia.

Raktas saugomas **vartotojo nustatymuose** (`PropertiesService.getUserProperties()`). Jis susietas su jūsų Google paskyra, niekada neįrašomas į skaičiuoklę ir nematomas kitiems skaičiuoklės redaktoriams.

## Eksporto vykdymas

Galite:

- **Iš meniu**: **Extensions → B1 Export → Export People** (arba Donations / Groups / Attendance)
- **Iš šoninės juostos**: atidarykite šoninę juostą (Connect…) ir spustelėkite atitinkamo duomenų rinkinio mygtuką

Kai eksportas baigtas, pranešimas patvirtina tai, pvz., „_N_ eilutė(s) įrašyta į „B1 People“.“

## Ataskaitų kūrimas

Eksportuoti skirtukai yra įprasti Google Sheets duomenys. Savo analitiką kurkite nuorodomis į šiuos skirtukus:

- **Suvestinės skirtukas** su `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)`, kad susumuotumėte aukas kortele
- **Filtruotas vaizdas** tik narių su `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- **Diagrama** lankomumo tendencijoms, naudojanti duomenis iš `B1 Attendance`

Pakartotinai vykdant eksportą, pagrindinis skirtukas atnaujinamas, o jūsų formulės atsinaujina automatiškai.

## Periodiškai kartojami eksportai

Priedas pagal numatytuosius nustatymus veikia pagal poreikį. Savaitiniams ar mėnesiniams eksportams naudokite įmontuotus Apps Script laiko trigerius:

1. Skaičiuoklėje eikite į **Extensions → Apps Script** (tai atidaro priedo susietą scenarijų).
2. Kairėje šoninėje juostoje spustelėkite **⏰ Triggers** piktogramą.
3. Pridėkite trigerį **Add Trigger** funkcijai `exportPeople` (arba bet kuriai eksporto funkcijai). Pasirinkite *Time-driven*, *Week timer*, pvz., *Every Monday 6am*.

Eksportas vykdomas fone jūsų Google paskyroje. Jei API raktas pakeičiamas arba panaikinamas, trigeris, kitą kartą nepavykus, atsiųs jums el. laišką.

## Leidimai ir privatumas

- Priedas prašo tik `spreadsheets.currentonly` (gali liestis tik su skaičiuokle, kurioje atidarytas) ir `script.external_request` (kad `UrlFetchApp` galėtų kviesti B1 API). Jis **nemato** jūsų Drive, Gmail ar kitų Google duomenų.
- B1 API raktas saugomas kiekvienam naudotojui atskirai. Kiti tos pačios skaičiuoklės redaktoriai jo nemato.
- Visi B1 API iškvietimai atliekami per HTTPS su antrašte `Authorization: Bearer cak_…`.

## Trikčių šalinimas

- **„No API key set“**: atidarykite **Extensions → B1 Export → Connect…** ir įklijuokite raktą.
- **„B1 rejected the API key (401)“**: raktas panaikintas arba neteisingas. Sukurkite naują ir įklijuokite jį iš naujo.
- **„This API key lacks permission for /giving/donations (403)“**: raktui trūksta `donations:read` teisės. Atnaujinkite rakto teises B1Admin programoje.
- **Lapas neatsinaujina po eksporto**: įsitikinkite, kad žiūrite į *teisingą* skirtuko pavadinimą (`B1 People` ir pan.). Eksportas sukuria skirtuką, jei jo nebuvo.
- **„Quota exceeded“**: Apps Script nustato kiekvieno naudotojo dienines `UrlFetchApp` kvotas (paprastai tūkstančius iškvietimų per dieną). Didelei bažnyčiai su daugybe įrašų gali reikėti padalyti eksportus į kelias dienas arba naudoti [Make](./make) ar pritaikytą integraciją didelės apimties sinchronizacijai.

## Priedo pritaikymas

Priedas yra atvirojo kodo. Apps Script projektas laikomas `B1Integrations/GoogleSheetsAddon/` saugykloje. Jei norite stulpelio, kurio mes neeksportuojame, papildomo duomenų rinkinio ar kito išvesties formato, sukurkite problemą (issue) arba pateikite pakeitimą (PR) toje saugykloje.

## Taip pat žr.

- [Zapier](./zapier): sinchronizacijai realiu laiku, o ne eksportui pagal poreikį
- [Make](./make): sinchronizacijai su sudėtingesnėmis transformacijomis
- [API raktai (kūrėjo žinynas)](/docs/developer/api/api-keys)
