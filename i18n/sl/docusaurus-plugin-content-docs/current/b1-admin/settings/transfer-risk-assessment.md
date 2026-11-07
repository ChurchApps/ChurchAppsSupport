---
title: "Ocena tveganja prenosa"
description: "Evidenca skladnosti podjetja ChurchApps za prenose podatkov cerkve iz Združenega kraljestva in EGP v ZDA v B1 Admin, ki zajema zaščitne ukrepe, podobdelovalce in nadzor dostopa."
---

# Ocena tveganja prenosa

<div class="article-intro">

Ta dokument beleži oceno tveganj, povezanih z mednarodnimi prenosi osebnih podatkov iz Združenega kraljestva/EGP v Združene države, kot to zahtevata britanska in evropska uredba GDPR. Gre za notranji dokument o skladnosti, ki ga ChurchApps vodi kot obdelovalec podatkov.

</div>

**Nazadnje pregledano:** april 2026

## 1. Podrobnosti prenosa

| Postavka | Podrobnosti |
|---|---|
| **Izvoznik podatkov** | Cerkve, ki uporabljajo ChurchApps (upravljavci podatkov), s sedežem v Združenem kraljestvu/EGP |
| **Uvoznik podatkov** | ChurchApps (obdelovalec podatkov), ki deluje iz Združenih držav |
| **Kategorije posameznikov, na katere se podatki nanašajo** | Člani cerkve, udeleženci, obiskovalci, donatorji, prostovoljci, otroci (upravljajo jih starši/skrbniki) |
| **Kategorije osebnih podatkov** | Imena, e-poštni naslovi, telefonske številke, poštni naslovi, datumi rojstva, spol, zakonski stan, profilne fotografije, zapisi o donacijah, evidence udeležbe, članstva v skupinah, dodelitve prostovoljnih nalog, zgodovina sporočil |
| **Občutljivi podatki** | Namerno se ne zbirajo. Ne shranjujemo zdravstvenih podatkov, biometričnih podatkov ali kazenskih evidenc. Podatki o finančnih računih (kreditne kartice, bančni računi) se nikoli ne shranjujejo v ChurchApps – obdeluje jih neposredno Stripe. |
| **Namen prenosa** | Zagotavljanje programske opreme za upravljanje cerkve (upravljanje članov, donacije, spremljanje udeležbe, komunikacija, načrtovanje prostovoljcev, prijave na dogodke) |
| **Država namembnosti** | Združene države |
| **Mehanizem prenosa** | Standardne pogodbene klavzule EU (SCC) in Dodatek o mednarodnem prenosu podatkov Združenega kraljestva (IDTA), vključeni prek Dodatka o obdelavi podatkov AWS |

## 2. Podobdelovalci

| Podobdelovalec | Vloga | Lokacija | Mehanizem prenosa |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Gostovanje infrastrukture, shranjevanje podatkov, dostava vsebin (regija us-east-2) | Združene države | DPA AWS s SCC (samodejno vključen v pogoje storitev AWS) |
| **Stripe** | Obdelava plačil za donacije | Združene države | DPA Stripe s SCC |

Podatki o kreditnih karticah in bančnih računih se pošiljajo neposredno iz uporabnikovega brskalnika v Stripe in se nikoli ne shranjujejo na strežnikih ChurchApps ali prek njih.

## 3. Ocena tveganja

### 3.1 Šifriranje

- **Med prenosom:** Vsi podatki so šifrirani s protokolom TLS/HTTPS za vso komunikacijo med uporabniki in strežniki ChurchApps.
- **V mirovanju:** Podatki, shranjeni na AWS, so šifrirani v mirovanju z upravljanim šifriranjem AWS.

### 3.2 Nadzor dostopa

- Dostop do produkcijskih strežnikov je omejen na dve osebi, ki sta članici upravnega odbora ChurchApps.
- Razvijalci, prostovoljci in drugi člani odbora nimajo dostopa do produkcijskih strežnikov ali podatkovnih baz.
- Strežniki podatkovnih baz so za požarnim zidom in niso neposredno dostopni z interneta.
- Podatki cerkva so logično ločeni – vsaka cerkev lahko dostopa le do svojih podatkov prek nadzora dostopa na ravni aplikacije.

### 3.3 Ločevanje podatkov

Podatki so razporejeni v šest neodvisnih podatkovnih baz (Člani, Darovanja, Udeležba, Sporočila, Dela, Vsebina). Zloraba ene podatkovne baze ne razkrije podatkov iz drugih. Na primer, podatkovna baza Darovanja vsebuje zneske in datume donacij, vendar ne imen ali kontaktnih podatkov donatorjev (ti so shranjeni v bazi Članov).

### 3.4 Minimizacija podatkov

- Podatki o kreditnih karticah ali bančnih računih se ne shranjujejo (obdeluje Stripe).
- Gesla se shranjujejo z enosmerno zgoščevalno funkcijo in jih ni mogoče obnoviti.
- Cerkve nadzorujejo, katere podatke zbirajo od svojih članov.

### 3.5 Pravice posameznikov, na katere se podatki nanašajo

ChurchApps zagotavlja tehnična orodja, ki cerkvam omogočajo izpolnjevanje zahtevkov posameznikov, na katere se podatki nanašajo:

- **Dostop in prenosljivost:** Celoten izvoz podatkov v strojno berljivi obliki JSON.
- **Izbris:** Anonimizacija v vseh šestih podatkovnih bazah z nadomestitvijo osebnih podatkov s splošnimi vrednostmi, pri čemer se ohranijo skupni zapisi, potrebni za finančno poročanje.
- **Omejitev:** Status neaktivnega članstva izključi posameznike iz iskanja, imenika, poročil in sporočil, vendar ohrani njihov zapis.
- **Popravek:** Člani in skrbniki lahko urejajo osebne podatke prek aplikacije.

### 3.6 Obveščanje o kršitvah

ChurchApps se zavezuje, da bo prizadete cerkve obvestil v 72 urah od trenutka, ko izve za kršitev varnosti osebnih podatkov, kot je dokumentirano v [Pogojih uporabe](https://churchapps.org/terms) (oddelek 11.6).

### 3.7 Tveganje dostopa ameriških oblasti

Glavno tveganje, povezano s podatki, gostovanimi v ZDA, je morebiten dostop ameriških državnih organov na podlagi oddelka 702 zakona FISA ali Izvršilne odredbe 12333. To tveganje je ocenjeno kot **nizko** iz naslednjih razlogov:

- ChurchApps obdeluje podatke o članstvu in udeležbi v cerkvi, ne pa podatkov z obveščevalno vrednostjo.
- Posamezniki, na katere se podatki nanašajo, so člani in udeleženci cerkve – ne skupine, ki so običajno tarča nadzornih programov.
- Shranjujemo nobenih občutljivih osebnih podatkov (zdravje, finančni računi, politična mnenja).
- DPA AWS vključuje zaveze glede zahtevkov državnih organov za dostop in poročanja o preglednosti.
- Okvir za zasebnost podatkov med EU in ZDA (vzpostavljen leta 2023) zagotavlja dodatne zaščitne ukrepe za prenose podatkov certificiranim organizacijam v ZDA.

## 4. Splošni sklep o tveganju

Tveganje za posameznike, na katere se podatki nanašajo, zaradi tega mednarodnega prenosa je ocenjeno kot **nizko**. Kombinacija:

- Standardnih pogodbenih klavzul kot pravnega mehanizma prenosa
- Šifriranja med prenosom in v mirovanju
- Strogega nadzora dostopa, pri katerem imata pooblastilo samo dve osebi
- Ločevanja podatkov v neodvisnih podatkovnih bazah
- Neshranjevanja podatkov o finančnih računih
- Nizke občutljivosti in nizke obveščevalne vrednosti obdelanih podatkov
- Tehničnih orodij za uresničevanje vseh pravic posameznikov, na katere se podatki nanašajo

zagotavlja ustrezne dodatne ukrepe, ki zagotavljajo, da preneseni podatki uživajo raven varstva, ki je bistveno enakovredna tisti, zagotovljeni znotraj Združenega kraljestva/EGP.

## 5. Razpored pregledov

Ta ocena se bo pregledovala letno ali ob vsaki bistveni spremembi obdelave podatkov, podobdelovalcev ali pravnega okvira, ki ureja mednarodne prenose podatkov.
