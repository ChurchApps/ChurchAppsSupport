---
title: "Duomenų saugumas"
---

# Duomenų saugumas

<div class="article-intro">

Nors nėra visiškai saugių sistemų, ChurchApps rimtai žiūri į duomenų saugumą. Šiame puslapyje paaiškinama, kokių priemonių imamasi, kad būtų apsaugoti visi B1.church Admin ir kituose ChurchApps produktuose įvesti duomenys.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Peržiūrėkite šį puslapį, kad suprastumėte, kaip apsaugomi jūsų bažnyčios duomenys
- Nustatykite [Vaidmenys ir leidimai](./roles-permissions.md), kad kontroliuotumėte, kas gali pasiekti jautrią informaciją
- Susipažinkite su [privatumo politika](https://churchapps.org/privacy)

</div>

## Jautrių saugomų duomenų ribojimas

Mūsų pirmasis požiūris – nesaugoti jokių jautresnių duomenų, nei būtina. Tai reiškia, kad niekada nesaugome kredito kortelių ar banko sąskaitų duomenų, naudojamų aukoms atlikti. Kai vartotojas aukoja naudodamas B1.church Admin arba B1, kredito kortelės duomenys niekada nesiunčiami į jokį mūsų serverį, o tik į jūsų mokėjimų vartus (Stripe). Tai reiškia, kad įvykus duomenų nutekėjimui nebūtų pažeista jokia kredito kortelės ar banko informacija.

Taip pat mūsų sistemoje niekada nesaugome slaptažodžių. Visi slaptažodžiai apdorojami vienkrypčiu maišos (hash) algoritmu, kuris dalį duomenų sunaikina, todėl niekas, net ir mes, negali iš duomenų bazės atkurti slaptažodžių. Norint patikrinti slaptažodį, įvesta reikšmė turi praeiti tą patį vienkryptį maišos algoritmą ir duoti tokį patį rezultatą.

Pašalinus šiuos du šaltinius, lieka tik vardų sąrašas ir kontaktinė informacija.

:::tip
Kadangi ChurchApps niekada nesaugo kredito kortelių ar banko informacijos, net ir blogiausiu duomenų nutekėjimo atveju nebūtų atskleista finansinių sąskaitų informacija. Rizikoje būtų tik vardai ir kontaktinė informacija.
:::

## Standartinių geriausių praktikų taikymas

Naudojame pramonėje įprastas saugumo geriausias praktikas, įskaitant visų duomenų, perduodamų į mūsų serverius ir iš jų, šifravimą naudojant HTTPS. Visi serveriai talpinami saugiame fiziniame duomenų centre su Amazon Web Services. Visi duomenų bazių serveriai laikomi už ugniasienės ir yra nepasiekiami iš interneto.

## Duomenų atskyrimas

Duomenys atskiriami į skirtingas duomenų bazes pagal apimtį. Kiekviena mūsų API (Membership, Giving, Attendance, Messaging, Doing ir Lessons) yra nepriklausoma duomenų sritis su savo duomenų baze. Jei viena iš jų būtų pažeista, duomenų naudingumas būtų ribotas, nebent būtų pažeistos ir kitos. Pavyzdžiui, jei būtų pažeista Giving API ar jos duomenų bazė, piktavalis galėtų gauti aukų sąrašą ir datas (bet niekada kredito kortelės ar banko duomenis). Tačiau jis neturėtų prieigos prie to, kurie vartotojai aukojo ar kurioms bažnyčioms, nes tie duomenys saugomi atskiroje Membership duomenų bazėje.

:::info
Duomenų atskyrimas reiškia, kad vienos sistemos pažeidimas nesuteikia prieigos prie visų bažnyčios duomenų. Kiekviena API veikia nepriklausomai, su savo duomenų baze, todėl ribojamas galimo nutekėjimo poveikis.
:::

## Ribota prieiga

Prieiga prie gamybinių serverių griežtai ribojama serverių administratoriams, kuriems ji reikalinga. Šiuo metu tai yra du asmenys, kurie taip pat yra valdybos nariai. Programuotojams, savanoriams ir kitiems valdybos nariams prieiga prie gamybinių serverių neleidžiama.

## Privatumo politika

Jūsų duomenys priklauso jums ir niekada nebus parduodami tretiesiems asmenims. Visą privatumo politiką galite perskaityti [čia](https://churchapps.org/privacy).

## BDAR atitiktis

ChurchApps palaiko BDAR (GDPR) atitiktį bažnyčioms, turinčioms narių Jungtinėje Karalystėje ar Europos Sąjungoje. Štai kaip sprendžiame pagrindinius reikalavimus:

### Duomenų subjekto teisės

ChurchApps teikia įrankius, padedančius bažnyčioms atsakyti į duomenų subjektų prašymus:

- **Teisė susipažinti (15 straipsnis)** — Nariai gali prašyti savo asmens duomenų kopijos, kreipdamiesi į savo bažnyčią. Administratoriai gali eksportuoti bet kurio asmens duomenis iš skilties **Duomenų valdymas** asmens įrašo puslapyje B1.church Admin.
- **Teisė į ištrynimą (17 straipsnis)** — Nariai gali patys prašyti ištrinti paskyrą iš savo profilio puslapio (žr. [Paskyros ištrynimo prašymų peržiūra](../profile/account-deletion.md)) arba tiesiogiai kreipdamiesi į savo bažnyčią. Administratoriai taip pat gali anonimizuoti asmens duomenis visuose moduliuose iš skilties **Duomenų valdymas** asmens įrašo puslapyje. Anonimizavimas pakeičia asmeninę informaciją bendrosiomis reikšmėmis, išsaugodamas bendruosius įrašus (aukų sumas, lankomumo skaičius), reikalingus bažnyčios finansinei atskaitomybei.
- **Teisė apriboti duomenų tvarkymą (18 straipsnis)** — Nariai gali prašyti apriboti duomenų tvarkymą, kreipdamiesi į savo bažnyčią, įskaitant atsisakymą gauti pranešimus.
- **Teisė į duomenų perkeliamumą (20 straipsnis)** — Administratoriai gali eksportuoti asmens duomenis struktūrizuotu, mašininiu būdu skaitomu JSON formatu narių, kurie to prašo, vardu.

### Duomenų valdymo įrankių naudojimas

Norėdami pasiekti BDAR duomenų įrankius konkrečiam asmeniui:

1. Eikite į **Asmenys** B1 Admin ir atidarykite asmens įrašą.
2. Spustelėkite **Redaguoti**, kad įjungtumėte redagavimo režimą.
3. Slinkite žemyn iki skilties **Duomenų valdymas** (pagal numatytuosius nustatymus suskleista) ir spustelėkite, kad ją išskleistumėte.
4. Naudokite **Eksportuoti duomenis**, kad atsisiųstumėte JSON failą su visais tam asmeniui saugomais duomenimis.
5. Naudokite **Anonimizuoti**, kad pakeistumėte asmeninę informaciją bendrosiomis reikšmėmis. Būsite paprašyti įvesti `ANONYMIZE` patvirtinimui. Šio veiksmo negalima atšaukti.

:::warning
Anonimizavimas yra negrįžtamas. Aukų sumos ir lankomumo skaičiai išsaugomi finansinės atskaitomybės tikslais, tačiau visi asmens identifikatoriai (vardas, el. paštas, adresas ir kt.) pašalinami ir negali būti atkurti.
:::

### Duomenų tvarkymas

ChurchApps veikia kaip **duomenų tvarkytojas** jūsų bažnyčios (**duomenų valdytojos**) vardu. Mūsų [Duomenų tvarkymo sutartis](https://churchapps.org/terms) nurodo kiekvienos šalies atsakomybes, įskaitant papildomų tvarkytojų naudojimą, pranešimo apie pažeidimus procedūras ir duomenų tvarkymą nutraukus sutartį.

### Tarptautinis duomenų perdavimas

ChurchApps duomenys talpinami Amazon Web Services (AWS) Jungtinėse Amerikos Valstijose. Tarptautinį duomenų perdavimą iš JK ar ES reglamentuoja AWS standartinės sutarčių sąlygos (SCC) pagal [AWS duomenų tvarkymo priedą](https://aws.amazon.com/compliance/data-processing-addendum/). AWS DPA automatiškai įtraukiamas į AWS paslaugų sąlygas visiems klientams. ES talpinimas nėra būtinas, kai taikomi tinkami perdavimo mechanizmai, pavyzdžiui, SCC.

Daugiau informacijos apie tai, kaip įvertinta perdavimo rizika, rasite [Perdavimo rizikos vertinime](./transfer-risk-assessment.md).

### Papildomi tvarkytojai

- **Amazon Web Services (AWS)** — Infrastruktūros talpinimas, duomenų saugojimas ir turinio pristatymas
- **Stripe** — Aukų mokėjimų apdorojimas (ChurchApps nesaugo kortelių duomenų)

:::info
Išsamią informaciją apie tai, kaip tvarkome asmens duomenis, rasite mūsų [Privatumo politikoje](https://churchapps.org/privacy) ir [Paslaugų teikimo sąlygose](https://churchapps.org/terms). Jei turite klausimų dėl BDAR atitikties, susisiekite su mumis el. paštu support@churchapps.org.
:::
