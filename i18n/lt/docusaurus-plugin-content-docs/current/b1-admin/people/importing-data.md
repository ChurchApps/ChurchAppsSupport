---
title: "Duomenų importavimas"
---

# Duomenų importavimas

<div class="article-intro">

B1 perkėlimo įrankis leidžia lengvai perkelti esamus duomenis į B1, nesvarbu, ar pradedate nuo nulio su skaičiuokle, ar perkeliate iš kitos bažnyčios valdymo platformos, ar importuojate aukų įrašus. Jį taip pat galima bet kada naudoti duomenims eksportuoti arba atsarginei kopijai sukurti.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="G-VnhzACYIU" title="Savo žmonių duomenų bazės importavimas B1 sistemoje" next="Žmonių paieška ir sąrašų kūrimas B1 sistemoje" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia aktyvios B1 Admin paskyros, turinčios prieigą prie **Nustatymų**.
- Prieš pradedant turėkite paruoštus duomenis, eksportuotus iš ankstesnės sistemos.
- Šis įrankis skirtas pradiniam duomenų perkėlimui. Jei jau kurį laiką naudojate B1, pakartotinis importavimas gali sukurti dublikuotus įrašus.

</div>

## Perkėlimo įrankio atidarymas

1. Prisijunkite prie **B1 Admin**.
2. Atidarykite [Greitojo navigavimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe), išskleiskite **Nustatymai** ir spustelėkite **Nustatymai**.
3. Kairiajame nustatymų meniu viršuje, po jūsų bažnyčios pavadinimu, spustelėkite nuorodą **Importavimas / eksportavimas**.
4. Atsidarys **B1 perkėlimo** įrankis naujame skirtuke adresu [transfer.b1.church](https://transfer.b1.church).

Perkėlimo įrankis veda jus per keturis žingsnius: Šaltinis, Peržiūra, Paskirtis ir Vykdymas.

---

## 1 žingsnis – pasirinkite šaltinį

Pasirinkite, iš kur atkeliauja jūsų duomenys. Yra septyni variantai:

- **B1 duomenų bazė** — Tiesiogiai paima duomenis iš esamos B1 bažnyčios. Naudinga atsarginei kopijai sukurti arba duomenims konvertuoti į kitą formatą. Norint naudoti šį variantą, turite būti prisijungę.
- **B1 importavimo ZIP** — ZIP failas B1 formatu. Dažniausiai naudojamas ankstesniam B1 eksportui atkurti. Įkėlus B1 eksportavimo ZIP failą į **B1 duomenų bazę**, atkuriama viskas, ką eksportas talpina (žr. [Duomenų eksportavimas](./exporting-data.md#full-data-export-from-settings)). Jei failo nepavyksta perskaityti, įrankis rodo klaidą, o ne pradeda iš naujo.
- **Breeze importavimo ZIP** — ZIP failas, kuriame yra iš Breeze ChMS eksportuoti failai.
- **Planning Center ZIP** — ZIP arba CSV failas, eksportuotas iš Planning Center.
- **Pasirinktinis CSV / Excel** — Bet koks CSV arba Excel failas su žmonių duomenimis. Įkėlę failą, prieš tęsdami importavimą turėsite susieti stulpelius su B1 laukais.
- **Tithe.ly CSV** — Žmonių arba aukų eksporto failas iš Tithe.ly (priimami CSV ar Excel formatai).
- **CCB / Pushpay CSV** — Žmonių arba aukų eksporto CSV failas iš Church Community Builder arba Pushpay.

Failą galite įkelti vilkdami į įkėlimo sritį arba spustelėdami ir ieškodami jo.

---

## 1b žingsnis – susiekite laukus (tik Pasirinktinis CSV / Excel)

Jei pasirinkote **Pasirinktinis CSV / Excel**, įkėlę failą pamatysite laukų susiejimo ekraną, prieš pereidami į peržiūrą.

Kiekvienas failo stulpelis pateikiamas kartu su pavyzdine reikšme. Kiekvienam stulpeliui išskleidžiamajame sąraše pasirinkite atitinkamą B1 lauką. Įrankis automatiškai atpažins įprastus stulpelių pavadinimus, pavyzdžiui, „Vardas“, „El. paštas“ ar „Pašto kodas“, tačiau turėtumėte peržiūrėti kiekvieną eilutę ir ištaisyti tai, ko įrankis nepastebėjo.

Galimi B1 laukai:

- Vardas, Pavardė, Antrasis vardas, Slapyvardis, Rodomas vardas, Titulas/Prefiksas, Priedėlis
- El. paštas, Namų telefonas, Mobilusis telefonas, Darbo telefonas
- Adresas 1 eilutė, Adresas 2 eilutė, Miestas, Valstija, Pašto kodas
- Gimimo data, Vestuvių metinės, Lytis, Šeimyninė padėtis, Narystės statusas
- Namų ūkio / šeimos pavadinimas
- Grupės pavadinimas — priskiria asmenį grupei pagal pavadinimą
- **Pasirinktinis laukas (atitikti pagal pavadinimą)** — įrašo stulpelį į vieną iš jūsų bažnyčios [asmens pasirinktinių laukų](../settings/custom-fields.md). Pasirodo langelis **B1 lauko pavadinimas**, užpildytas stulpelio antrašte. Pakeiskite jį į tikslų lauko pavadinimą, kaip jis rodomas B1 (didžiosios ir mažosios raidės nesvarbios).
- **Formos atsakymas (pasirinktinis laukas)** — įrašo šio stulpelio reikšmę kaip pasirinktinį lauką, priskirtą asmens įrašui. Pasirinkus šį variantą, bus paprašyta pavadinti formą.

Datos gali būti įprastais formatais, pavyzdžiui, `9/17/1994`, ir jos konvertuojamos automatiškai. Pasirinktinių laukų Taip/Ne reikšmės priima tokias reikšmes kaip Yes, No, Y, N, True, False, 1 ir 0, o pasirinkimo laukai priima arba pasirinkimo tekstą, arba jo reikšmę.

:::info
Prieš importuodami sukurkite asmens pasirinktinius laukus B1 Admin. Baigus importavimą, žingsnyje **Pasirinktiniai laukai** pateikiami visi stulpelių pavadinimai, kurie neatitinka jokio B1 lauko, ir suskaičiuojamos reikšmės, kurios netinka lauko tipui. Tos reikšmės praleidžiamos, o likęs importavimas vis tiek baigiamas.
:::

Stulpelius, kurių nenorite importuoti, galima nustatyti į **(Praleisti)**. Kol nesusietas bent vienas vardo laukas (Vardas arba Pavardė), negalite tęsti.

Spustelėkite **Patvirtinti susiejimą ir importuoti**, kad pereitumėte į peržiūrą.

---

## 2 žingsnis – peržiūrėkite duomenis

Įkėlus failą, įrankis parodo visų importuojamų duomenų peržiūrą. Naudokite skirtukus, kad patikrintumėte kiekvieną duomenų tipą:

- **Žmonės** — Sąrašas pagal namų ūkius, su nuotraukomis, jei jos įtrauktos.
- **Grupės** — Surikiuotos pagal filialą, pamaldas, laiką ir kategoriją.
- **Lankomumas** — Susitikimų datos, grupės ir apsilankymų skaičius.
- **Aukos** — Partijos, fondai, aukotojai ir sumos.
- **Formos** — Formų pavadinimai ir turinio tipai.

Atidžiai peržiūrėkite prieš tęsdami. Jei kažkas atrodo neteisingai, spustelėkite **Pradėti iš naujo** ir ištaisykite šaltinio failą.

---

## 3 žingsnis – pasirinkite paskirtį

Pasirinkite, kur norite perkelti duomenis:

- **B1 duomenų bazė** — Importuoja tiesiai į jūsų bažnyčios B1 duomenų bazę. Pasirinkus šį variantą, įrankis parodys galutinį įrašų, kurie bus pridėti, skaičių. Spustelėkite **Pradėti perkėlimą**, kad patvirtintumėte.
- **B1 eksportavimo ZIP** — Atsisiunčia jūsų duomenis ZIP faile B1 formatu, kurį vėliau galima atkurti naudojant **B1 importavimo ZIP**. Tinka atsarginėms kopijoms.
- **Breeze eksportavimo ZIP** — Konvertuoja jūsų duomenis į Breeze formatą.
- **Planning Center ZIP** — Konvertuoja jūsų duomenis į Planning Center formatą.

:::warning
Šaltinio ir paskirties formatai negali sutapti. Jei jie sutampa, įrankis perspės, kad būtų išvengta atsitiktinio dublikavimo.
:::

---

## 4 žingsnis – vykdymas

Įrankis apdoroja perkėlimą ir rodo kiekvieno žingsnio eigą:

- Filialai, pamaldos ir laikai
- Žmonės
- Nuotraukos
- Grupės ir grupių nariai
- Aukos
- Lankomumas
- Formos, klausimai, atsakymai ir formų pateikimai
- Pasirinktiniai laukai (kai susiejote bet kokius pasirinktinių laukų stulpelius)
- Suspaudimas (tik ZIP failų paskirtims)

Kai paskirtis yra **B1 duomenų bazė**, eigos kortelė vadinama **Importavimo eiga** ir baigiama pranešimu **Importavimas baigtas!** (arba **Importavimas baigtas su klaidomis**). Kai paskirtis yra ZIP failas, tie patys pranešimai vietoj to rodo žodį **Eksportavimas**.

:::info
Atkuriant **B1 importavimo ZIP**, įrašai, nukreipti į tai, kas nebėra faile, praleidžiami, o ne sustabdo importavimą. Tai apima grupių narystes asmenims ar grupėms, kurių nėra ZIP faile, lankomumą ištrintoms grupėms ar asmenims, bei ryšius tarp grupių ir ištrintų pamaldų laikų. Lankomumo sesijos, kurios niekada nebuvo susietos su pamaldų laiku, vis tiek atkuriamos. Taip pat eksportuojant nuotrauka, kurios nepavyksta atsisiųsti ar perskaityti, paliekama nuošalyje, kad žingsnis **Nuotraukos** galėtų tęstis.
:::

:::warning
Nelaikykite naršyklės atidarytos, kol vyksta perkėlimas. Palaukite, kol visi žingsniai bus pažymėti kaip baigti.
:::

---

## Breeze importavimo ZIP failo paruošimas

1. Breeze sistemoje eikite į **Nustatymai** ir kairiajame šoniniame meniu spustelėkite **Eksportuoti**.
2. Eksportuokite tris atskirus failus: **Žmonės**, **Žymos** ir **Aukos**.
3. Pažymėkite visus tris failus, dešiniuoju pelės klavišu spustelėkite ir suspauskite juos į vieną ZIP failą.
   - Mac kompiuteryje: pažymėkite failus, dešiniuoju pelės klavišu spustelėkite ir pasirinkite **Suspausti**.
   - PC kompiuteryje: pažymėkite failus, dešiniuoju pelės klavišu spustelėkite, pasirinkite **Siųsti į**, tada **Suspaustas (ZIP) aplankas**.
4. Įkelkite ZIP failą naudodami **Breeze importavimo ZIP** variantą 1 žingsnyje.

Breeze importavimas automatiškai perkelia žmones, grupes (žymas) ir aukų įrašus.

---

## Planning Center eksporto paruošimas

1. Prisijunkite prie Planning Center ir atidarykite **People** produktą.
2. Kairiajame šoniniame meniu spustelėkite **Lists** ir sukurkite sąrašą, kuriame būtų visi, kuriuos norite perkelti. (Jei jau turite visos bendruomenės sąrašą, naudokite jį.)
3. Atidarykite sąrašą ir naudodami jo **eksportavimo** parinktį atsisiųskite žmones kaip **CSV** failą. Įtraukite laukus, kuriuos norite išsaugoti – vardas, el. paštas, telefonas, adresas, gimimo data, lytis ir narystės statusas visi perkeliami į B1.
4. Jei Planning Center sukūrė daugiau nei vieną failą, pažymėkite visus, dešiniuoju pelės klavišu spustelėkite ir suspauskite į vieną ZIP failą.
   - Mac kompiuteryje: pažymėkite failus, dešiniuoju pelės klavišu spustelėkite ir pasirinkite **Suspausti**.
   - PC kompiuteryje: pažymėkite failus, dešiniuoju pelės klavišu spustelėkite, pasirinkite **Siųsti į**, tada **Suspaustas (ZIP) aplankas**.
5. Įkelkite CSV arba ZIP failą naudodami **Planning Center ZIP** variantą 1 žingsnyje.

Įkėlę failą, pereikite į peržiūrą ir patikrinkite, ar žmonės bei namų ūkiai atrodo teisingai, prieš vykdydami importavimą.

---

## Tithe.ly eksporto paruošimas

1. Tithe.ly sistemoje eksportuokite **Žmonių** duomenis kaip CSV arba Excel failą. Jei norite perkelti aukų įrašus, taip pat galite eksportuoti atskirą **Aukų** failą.
2. Įrankis automatiškai atpažins, ar failas turi žmonių, ar aukų duomenų, pagal stulpelių pavadinimus.
3. Įkelkite failą naudodami **Tithe.ly CSV** variantą 1 žingsnyje.

:::info
Tithe.ly eksportus galima importuoti po vieną failą. Jei reikia importuoti ir žmonių, ir aukų įrašus atskirai, paleiskite procesą du kartus.
:::

---

## CCB arba Pushpay eksporto paruošimas

1. Church Community Builder arba Pushpay sistemoje eksportuokite **Žmonių** duomenis kaip CSV failą. Taip pat galite eksportuoti atskirą aukų / įnašų failą.
2. Įrankis automatiškai atpažins, ar failas turi žmonių, ar aukų duomenų, pagal stulpelių pavadinimus.
3. Įkelkite failą naudodami **CCB / Pushpay CSV** variantą 1 žingsnyje.

---

## Po importavimo

Baigus perkėlimą, skirkite kelias minutes duomenims patikrinti:

1. Atidarykite [Žmonių](../people/adding-people.md) puslapį ir atsitiktinai patikrinkite kelis profilius.
2. Įsitikinkite, kad vardai, el. paštai, telefono numeriai ir adresai perkelti teisingai.
3. Patikrinkite, ar išlikę namų ūkių ryšiai. Kiekvieno asmens namų ūkio vaidmuo (Galva, Sutuoktinis, Vaikas arba Kita) perkeliamas, jei šaltinyje jis yra: stulpelis **householdRole** B1 importavimo ZIP faile, **Family Role** Breeze arba Tithe.ly sistemoje ir **Family Position** CCB / Pushpay sistemoje. Vaidmenys, tokie kaip „Head of Household“, „Primary“, „Wife“ ar „Son“, konvertuojami į atitinkamą B1 vaidmenį. Planning Center ir Pasirinktinio CSV / Excel importavimuose vaidmenų stulpelio nėra, todėl tiems asmenims nustatomas vaidmuo **Kita**. Vaidmenį galite pakeisti asmens namų ūkio nustatymuose [Žmonių](../people/adding-people.md#managing-households) puslapyje.
4. Peržiūrėkite visas importuotas grupes ir aukų įrašus.

Jei pastebite problemų, galite redaguoti atskirus profilius Žmonių puslapyje. Taip pat galite dar kartą paleisti perkėlimo įrankį, kad [eksportuotumėte savo duomenis](exporting-data.md) kaip atsarginę kopiją.
