---
title: "Duomenų perdavimo rizikos vertinimas"
---

# Duomenų perdavimo rizikos vertinimas

<div class="article-intro">

Šiame dokumente ChurchApps įrašo savo vertinimą dėl rizikų, susijusių su asmens duomenų perdavimu iš JK/EEE į Jungtines Amerikos Valstijas. Vertinimas atliekamas pagal JK BDAR ir ES BDAR reikalavimus. Tai vidinis atitikties įrašas, kurį ChurchApps tvarko kaip duomenų tvarkytojas.

</div>

**Paskutinė peržiūra:** 2026 m. balandis

## 1. Perdavimo duomenys

| Elementas | Informacija |
|---|---|
| **Duomenų eksportuotojas** | Bažnyčios, naudojančios ChurchApps (duomenų valdytojai), įsikūrusios JK/EEE |
| **Duomenų importuotojas** | ChurchApps (duomenų tvarkytojas), veikiantis iš Jungtinių Amerikos Valstijų |
| **Duomenų subjektų kategorijos** | Bažnyčios nariai, lankytojai, svečiai, aukotojai, savanoriai, vaikai (tvarkomi tėvų ar administratorių) |
| **Asmens duomenų kategorijos** | Vardai, el. pašto adresai, telefono numeriai, pašto adresai, gimimo datos, lytis, šeiminė padėtis, profilio nuotraukos, aukojimų įrašai, lankomumo įrašai, grupių narystės, savanorių paskyrimai, pranešimų istorija |
| **Jautrūs duomenys** | Sąmoningai nerenkami. Nesaugomi sveikatos, biometriniai duomenys ar teistumo duomenys. Finansinės sąskaitos duomenys (kredito kortelės, banko sąskaitos) ChurchApps niekada nesaugo – jais tiesiogiai rūpinasi Stripe. |
| **Perdavimo tikslas** | Bažnyčių valdymo programinės įrangos paslaugų teikimas (narių valdymas, aukojimai, lankomumo apskaita, komunikacija, savanorių grafikų sudarymas, renginių registracija) |
| **Paskirties šalis** | Jungtinės Amerikos Valstijos |
| **Perdavimo mechanizmas** | ES standartinės sutarčių sąlygos (SCC) ir JK tarptautinio duomenų perdavimo priedas (IDTA), įtraukti per AWS duomenų tvarkymo priedą |

## 2. Papildomi duomenų tvarkytojai

| Papildomas tvarkytojas | Vaidmuo | Vieta | Perdavimo mechanizmas |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastruktūros talpinimas, duomenų saugojimas, turinio pristatymas (us-east-2 regionas) | Jungtinės Amerikos Valstijos | AWS DPA su SCC (automatiškai įtraukta į AWS paslaugų sąlygas) |
| **Stripe** | Aukojimų apdorojimas | Jungtinės Amerikos Valstijos | Stripe DPA su SCC |

Kredito kortelės ir banko sąskaitos duomenys perduodami tiesiai iš naudotojo naršyklės į Stripe ir niekada nesaugomi ChurchApps serveriuose ar per juos neperduodami.

## 3. Rizikos vertinimas

### 3.1 Šifravimas

- **Perdavimo metu:** Visi duomenys šifruojami naudojant TLS/HTTPS visoms komunikacijoms tarp naudotojų ir ChurchApps serverių.
- **Saugojimo metu:** AWS saugomi duomenys šifruojami saugojimo metu naudojant AWS valdomą šifravimą.

### 3.2 Prieigos kontrolė

- Prieiga prie gamybos serverių ribojama dviem asmenimis, kurie yra ChurchApps direktorių tarybos nariai.
- Kūrėjai, savanoriai ir kiti tarybos nariai neturi prieigos prie gamybos serverių ar duomenų bazių.
- Duomenų bazių serveriai yra už ugniasienės ir nėra tiesiogiai pasiekiami iš interneto.
- Bažnyčios duomenys loginiu būdu atskirti – kiekviena bažnyčia gali pasiekti tik savo duomenis, taikant programos lygmens prieigos kontrolę.

### 3.3 Duomenų atskyrimas

Duomenys paskirstyti tarp šešių nepriklausomų duomenų bazių (Nariai, Aukojimai, Lankomumas, Pranešimai, Darbai, Turinys). Vienos duomenų bazės pažeidimas neatskleidžia kitų duomenų. Pavyzdžiui, Aukojimų duomenų bazėje yra aukojimų sumos ir datos, tačiau nėra aukotojų vardų ar kontaktinės informacijos (ji saugoma Narių duomenų bazėje).

### 3.4 Duomenų mažinimas

- Kredito kortelės ar banko sąskaitos informacija nesaugoma (ja rūpinasi Stripe).
- Slaptažodžiai saugomi naudojant vienkryptį maišymą ir negali būti atkurti.
- Bažnyčios kontroliuoja, kokius duomenis renkasi iš savo narių.

### 3.5 Duomenų subjektų teisės

ChurchApps teikia techninius įrankius, leidžiančius bažnyčioms įvykdyti duomenų subjektų prašymus:

- **Prieiga ir perkeliamumas:** Visiškas duomenų eksportas mašininiu būdu skaitomu JSON formatu.
- **Ištrynimas:** Anonimizavimas visose šešiose duomenų bazėse – asmens duomenys pakeičiami bendrinėmis reikšmėmis, išsaugant finansinei atskaitomybei reikalingus bendrus įrašus.
- **Apribojimas:** Neaktyvi narystės būsena pašalina asmenis iš paieškos, katalogo, ataskaitų ir pranešimų, tačiau jų įrašas išlieka.
- **Ištaisymas:** Nariai ir administratoriai gali redaguoti asmeninę informaciją programoje.

### 3.6 Pranešimas apie pažeidimus

ChurchApps įsipareigoja per 72 valandas nuo sužinojimo apie asmens duomenų pažeidimą pranešti apie tai paveiktoms bažnyčioms, kaip nurodyta [Paslaugų teikimo sąlygose](https://churchapps.org/terms) (11.6 skirsnis).

### 3.7 JAV vyriausybės prieigos rizika

Pagrindinė su JAV talpinamais duomenimis susijusi rizika – galima prieiga prie duomenų pagal FISA 702 skirsnį arba Vykdomąjį įsakymą 12333. Ši rizika įvertinta kaip **maža** dėl šių priežasčių:

- ChurchApps tvarko bažnyčios narių ir lankomumo duomenis, o ne duomenis, turinčius žvalgybinę vertę.
- Duomenų subjektai yra bažnyčios nariai ir lankytojai – tai nėra kategorijos, kurios paprastai taikinys stebėjimo programoms.
- Nesaugomi jokie jautrūs asmens duomenys (sveikata, finansinės sąskaitos, politinės pažiūros).
- AWS DPA apima įsipareigojimus dėl vyriausybės prašymų dėl prieigos ir skaidrumo ataskaitų.
- ES ir JAV duomenų privatumo sistema (įsteigta 2023 m.) suteikia papildomas apsaugos priemones perduodant duomenis sertifikuotoms JAV organizacijoms.

## 4. Bendra rizikos išvada

Rizika duomenų subjektams dėl šio tarptautinio perdavimo įvertinta kaip **maža**. Tai nulemia tokių veiksnių visuma:

- Standartinės sutarčių sąlygos kaip teisinis perdavimo mechanizmas
- Šifravimas perdavimo ir saugojimo metu
- Griežta prieigos kontrolė, kurią turi tik du įgalioti asmenys
- Duomenų atskyrimas tarp nepriklausomų duomenų bazių
- Finansinių sąskaitų duomenų nesaugojimas
- Tvarkomų duomenų mažas jautrumas ir maža žvalgybinė vertė
- Techninės priemonės visoms duomenų subjektų teisėms įgyvendinti

yra pakankamos papildomos priemonės, užtikrinančios, kad perduodami duomenys būtų apsaugoti lygiaverčiu lygiu, iš esmės atitinkančiu JK/EEE garantuojamą lygį.

## 5. Peržiūros tvarkaraštis

Šis vertinimas bus peržiūrimas kasmet arba tada, kai įvyks esminis duomenų tvarkymo, papildomų tvarkytojų ar tarptautinį duomenų perdavimą reglamentuojančios teisinės sistemos pakeitimas.
