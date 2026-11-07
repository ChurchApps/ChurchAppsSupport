---
title: "Mobilios programėlės nustatymai"
---

# Mobilios programėlės nustatymai

<div class="article-intro">

Puslapis „Mobilios programėlės nustatymai“ leidžia sukonfigūruoti navigacijos skirtukus, kurie rodomi jūsų bažnyčios nariams **B1.church mobiliojoje versijoje (PWA)**. Galite nuspręsti, kurie skirtukai matomi, kur jie veda ir kaip rodomi.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="ydY7WGK16fE" title="Bažnyčios narių programėlės tinkinimas B1 sistemoje" />

:::info Native B1 Mobile programėlė nebepalaikoma
Čia sukonfigūruoti skirtukai pateikiami per [B1.church progresyviąją žiniatinklio programėlę (PWA)](/docs/b1-church/getting-started/installing-pwa), kuri pakeitė atskirą B1 Mobile programėlę. Nariams pasidalykite savo bažnyčios diegimo puslapiu — `https://yourchurchname.b1.church/mobile/install`. Jame jie sužinos, kaip įdiegti programėlę savo įrenginyje, be jokio atsisiuntimo iš App Store ar Google Play.
:::

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia leidimo „Redaguoti bažnyčios nustatymus“ (Edit Church Settings). Jei neturite prieigos, žr. [Vaidmenys ir leidimai](./roles-permissions.md).
- Pirmiausia sukonfigūruokite [Bažnyčios nustatymus](./church-settings.md), įskaitant bažnyčios pavadinimą ir prekinį ženklą

</div>

## Navigacijos nustatymų atidarymas

1. B1 Admin sistemoje atidarykite [Šuoliavimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje) ir išskleiskite **Mobilioji**.
2. Spustelėkite **Navigacija** (`/mobile/navigation`).
3. Navigacijos puslapyje rodomi dabartiniai programėlės skirtukai.

## Naujo skirtuko pridėjimas

1. Viršuje puslapio spustelėkite mygtuką **Pridėti skirtuką**.
2. Užpildykite skirtuko informaciją:
   - **Pavadinimas** -- Etiketė, kuri rodoma skirtuke (pavyzdžiui, „Pamokslai“ ar „Aukoti“).
   - **Piktograma** -- Spustelėkite piktogramos pasirinkimo lauką ir parinkite skirtukui piktogramą.
   - **Paveikslėlis** -- Spustelėkite **Pasirinkti paveikslėlį** (arba **Keisti paveikslėlį**), kad skirtukui priskirtumėte nuotrauką. Skirtukai su nuotrauka programėlės pagrindiniame ekrane rodomi kaip nuotraukų plytelės -- žr. [Pagrindinio ekrano plytelės](#home-screen-tiles).
   - **Skirtuko tipas** -- Pasirinkite vieną iš variantų, pavyzdžiui, Biblija, Tiesioginė transliacija, Aukos, Svetainė ir kiti.
   - **URL** -- Įveskite žiniatinklio adresą, į kurį skirtukas turi vesti.
   - **Matomumas** -- Nustatykite, kas gali matyti šį skirtuką (visi, tik nariai ir pan.). Skirtukui **Narių katalogas** šis nustatymas valdo tik tai, kas mato patį skirtuką; kas gali atidaryti katalogą, nustatoma parinktimi **Rodyti kataloge** Narių portalo puslapyje (žr. [Narių katalogo ir žinučių nustatymai](#member-directory--messaging-settings)).
3. Spustelėkite **Išsaugoti skirtuką**, kad jis būtų pridėtas prie programėlės.

## Esamo skirtuko redagavimas

1. Spustelėkite bet kurį esamą skirtuką sąraše **Programėlės skirtukai**.
2. Atnaujinkite skirtuko pavadinimą, piktogramą, URL, tipą ar matomumo nustatymus.
3. Spustelėkite **Išsaugoti skirtuką**, kad pritaikytumėte pakeitimus.

## Skirtukų perrikiavimas

Galite pakeisti skirtukų tvarką mobiliojoje programėlėje. Norėdami perkelti skirtukus, vilkite ir mesdami juos sąraše. Šiame puslapyje rodoma tvarka atitinka tą, kuria jūsų nariai matys skirtukus programėlėje.

:::info
Kai kurie skirtukai gali atsirasti automatiškai, esant tam tikroms sąlygoms -- pavyzdžiui, skirtukas Tiesioginė transliacija gali pasirodyti, kai transliacija vyksta. Rankiniu būdu pridėti skirtukai suteikia jums visišką kontrolę, ką nariai mato visada.
:::

:::tip
Stenkitės neperkrauti skirtukų. Dauguma bažnyčių gerai dirba su trim–penkiais skirtukais. Per daug skirtukų gali supainioti narius naršant.
:::

## Narių katalogo ir žinučių nustatymai

Skiltyje **Narių portalas** tame pačiame Mobilioji skyriuje yra nustatymai, valdantys narių katalogą ir privačias žinutes B1.church sistemoje:

- **Katalogo patvirtinimo grupė** -- Grupė, kuri peržiūri narių katalogo atnaujinimus ir [paskyros ištrynimo prašymus](../profile/account-deletion.md) prieš jiems įsigaliojant.
- **Rodyti kataloge** -- Kas gali atidaryti narių katalogą ir kas jame yra įtrauktas: **Tik administratoriams**, **Nariai ir aukštesni** (numatytasis), **Reguliarūs lankytojai ir aukštesni** arba **Lankytojai ir aukštesni**. Asmenys, kurių narystės statusas yra žemesnis nei jūsų pasirinktas lygis, katalogo nemato ir jame neįtraukiami. Parinktis **Tik administratoriams** uždaro katalogą visiems, išskyrus darbuotojus, turinčius leidimą Asmenys &gt; Peržiūrėti (vien darbuotojo narystės statuso nepakanka). Tokie darbuotojai visada gali atidaryti katalogą ir matyti visus, nepriklausomai nuo šio nustatymo. Svečiai niekada neįtraukiami, nes visi, kurie registruojasi internetu patys, pradeda kaip svečiai.
- **Matomumo nustatymas** -- Nustato bažnyčios mastu galiojantį numatytąjį nustatymą nariams, kurie dar nepasirinko savo. **Adresas**, **Telefono numeris** ir **El. paštas** turi kiekvienas savo išskleidžiamąjį sąrašą su tais pačiais penkiais lygiais, kurie prieinami visur, kur konfigūruojamas matomumas:
  - **Visi** -- matoma visiems, įskaitant anonimus lankytojus
  - **Nariai** -- matoma tik asmenims, turintiems Nario ar Darbuotojo įrašą
  - **Tik grupės** -- matoma tik asmenims, kurie dalijasi grupe su šiuo asmeniu, ir darbuotojams
  - **Mano grupių vadovai ir darbuotojai** -- matoma tik tos grupės, kurioje šis asmuo yra, vadovams, ir darbuotojams
  - **Tik darbuotojai** -- matoma tik darbuotojams (kiekvienam, kurio narystės statusas yra Darbuotojas, arba kuris turi leidimą Asmenys &gt; Peržiūrėti), ir pačiam asmeniui

  „Darbuotojai“ šiuose lygiuose reiškia bet kurį, kurio narystės statusas yra Darbuotojas, arba kuris turi leidimą Asmenys &gt; Peržiūrėti. Grupių pakeitimai įsigalioja iš karto: asmuo, kuris prisijungia prie grupės arba tampa grupės vadovu, gali matyti atitinkamas **Tik grupės** ar **Mano grupių vadovai ir darbuotojai** lygio grupės narių duomenis neatsijungdamas ir neprisijungdamas iš naujo.

  Nariai gali pakeisti šiuos numatytuosius nustatymus savo įrašui B1.church PWA programėlės profilio skirtuke **Privatumas** -- žr. [Profilio redagavimas](/docs/b1-church/getting-started/me-page).
- **Minimalus amžius privačioms žinutėms** -- Vaikų saugos valdiklis. B1 neatvers **naujo** privataus pokalbio, jei bet kuris iš dalyvių yra jaunesnis už šį amžių, remiantis gimimo data (kai gimimo data neįrašyta, naudojamas namų ūkio vaidmuo). Jaunesni asmenys vis tiek visiškai matomi kataloge -- blokuojamos tik tiesioginės žinutės **abiem kryptimis**, visiems, įskaitant darbuotojus. Grupiniai pokalbiai ir žinutės vaikų tėvams vis tiek veikia. Pasirinkimai: Išjungta, 13, 16 arba 18; numatytasis -- **18**. Esami pokalbiai nepaveikiami.

:::tip
Kadangi minimalaus amžiaus tikrinimas remiasi gimimo datomis, įsitikinkite, kad vaikų gimimo datos užpildytos jūsų bendruomenėje. Šis nustatymas priklauso tai pačiai vaikų saugos nustatymų grupei kaip [registracijos saugos valdikliai](../attendance/checkin-safety.md).
:::

### Prisijungimo raginimas pagrindiniame ekrane

Lankytojai, kurie atidaro programėlės [pagrindinį ekraną](/docs/b1-church/getting-started/navigating#home), neprisijungę, mato trumpą raginimą -- pagal numatytuosius nustatymus *„Prisijunkite, kad matytumėte savo grupes, aukas ir kita.“* -- šalia mygtuko **Prisijungti**. Nustatymai **Prisijungimo raginimas pagrindiniame ekrane** tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) leidžia jį pakeisti:

- **Rodyti prisijungimo raginimą programėlės pagrindiniame ekrane** -- Išjunkite, jei norite paslėpti tiek raginimą, tiek mygtuką **Prisijungti** pagrindiniame ekrane. Lankytojai vis tiek gali prisijungti iš programėlės meniu.
- **Prisijungimo raginimo tekstas** -- Pakeiskite numatytąjį tekstą savo žinute (iki 150 simbolių). Palikite tuščią, kad būtų naudojamas numatytasis tekstas. Šis laukas išjungtas, kai raginimas išjungtas.

Spustelėkite **Išsaugoti**, kad pritaikytumėte. Pranešimas **Išsaugota** patvirtina pakeitimą. Išsaugojus, programėlės talpykloje saugomi nustatymai atnaujinami, todėl pakeitimas matomas kitą kartą atidarius pagrindinį ekraną.

### Pagrindinio ekrano plytelės

Skirtukai, turintys nuotrauką (žr. **Paveikslėlis** skyriuje [Naujo skirtuko pridėjimas](#adding-a-new-tab)), rodomi programėlės [pagrindiniame ekrane](/docs/b1-church/getting-started/navigating#home) kaip nuotraukų plytelės, skyriuje, pavadintame jūsų bažnyčios vardu. Tai apima ir Dienos eilutės skirtuką, jei jam priskirsite nuotrauką. Skirtukai su nuotraukomis vis tiek rodomi ir skirtukų juostoje.

Nustatymas **Pagrindinio ekrano plytelės** tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) valdo, kaip tos plytelės išdėstytos. Pasirinkite **Išdėstymą**:

- **Tinklelis** -- Dvi plytelės eilutėje (numatytasis). Kai plytelių skaičius nelyginis, pirmoji plytelė užima visą plotį.
- **Slenkama eilutė** -- Viena plytelių eilutė, kurią nariai perbraukia į šonus.
- **Slenkama (automatiškai)** -- Ta pati eilutė į šonus, tačiau ji juda ir pati, maždaug kas keturias sekundes pereidama prie kitos plytelės ir grįždama į pradžią pabaigoje. Ji sustoja, kai narys palies, užves pelės žymeklį ar pereis į eilutę klaviatūra, ir vėl pradeda judėti po kelių sekundžių. Įrenginiuose, kuriuose įjungtas judesio mažinimas, eilutė stovi vietoje ir veikia kaip **Slenkama eilutė**.
- **Sąrašas** -- Sąrašas su mažu nuotraukos miniatiūriniu vaizdu šalia kiekvieno skirtuko pavadinimo.

Spustelėkite **Išsaugoti**, kad pritaikytumėte.

### Pagrindinio ekrano skyriai

Prisijungę nariai visada mato savo lankomumo istoriją ir pateiktas formas [Mano puslapyje](/docs/b1-church/getting-started/me-page). Jungikliai **Pagrindinio ekrano skyriai** tame pačiame Narių portalo puslapyje (`/mobile/b1-mobile`) leidžia rodyti juos ir pagrindiniame ekrane:

- **Rodyti mano lankomumą pagrindiniame ekrane** -- Prideda skyrių **Mano lankomumas** su tuo, kiek kartų narys dalyvavo per paskutines 90 dienų, dviem naujausiais apsilankymais ir nuoroda **Istorija**, vedančia į visą lankomumo sąrašą.
- **Rodyti mano formas pagrindiniame ekrane** -- Prideda skyrių **Mano formos** su dviem naujausiais nario formų pateikimais ir nuoroda **Visos formos**.

Abu nustatymai pagal numatytuosius nustatymus išjungti. Skyrius rodomas tik prisijungusiems nariams, turintiems bent vieną įrašą. Spustelėkite **Išsaugoti**, kad pritaikytumėte.

## Kur rodomi šie skirtukai

Čia sukonfigūruoti skirtukai rodomi **B1.church PWA**, kurią jūsų nariai įdiegia iš bet kurio `https://yourchurchname.b1.church` puslapio. Šiame puslapyje atlikti pakeitimai atsispindi kitą kartą, kai narys atidaro programėlę.

Telefone apatinėje skirtukų juostoje rodomi **Pagrindinis**, iki trijų jūsų skirtukų ir **Daugiau**; kompiuteryje antraštėje rodoma iki penkių skirtukų. Įmontuotiems ekranams (pavyzdžiui, Pamokslams, Aukoms ar Grupėms) pirmiausia skiriamos vietos, o likusias vietas užpildo skirtukai **Vidinis puslapis**. Skirtukai **Išorinis URL** ir **Dienos eilutė** niekada negauna vietos juostoje. Kiekvienas skirtukas, įskaitant tuos, kurie netelpa, išvardytas programėlės puslapyje **Daugiau**. Žr. [B1App naršymas](/docs/b1-church/getting-started/navigating), kad sužinotumėte, ką mato nariai. (Skirtukus taip pat atvaizduoja senoji [B1 Mobile native programėlė](/docs/b1-mobile/) nariams, kurie ją dar naudoja, tačiau ši programėlė nebepalaikoma ir nebeatnaujinama.)

## Kiti žingsniai

- [Bažnyčios nustatymai](./church-settings.md) -- Sukonfigūruokite bažnyčios informaciją ir prekinį ženklą
- [Vaidmenys ir leidimai](./roles-permissions.md) -- Valdykite savo komandos prieigą
