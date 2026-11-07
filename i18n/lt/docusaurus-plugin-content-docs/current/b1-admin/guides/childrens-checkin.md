---
title: "Vadovas: vaikų registracijos nustatymas"
---

# Vaikų registracijos nustatymas

<div class="article-intro">

Šiame vadove žingsnis po žingsnio parodoma, kaip paleisti vaikų registracijos sistemą jūsų bažnyčioje: nuo šeimų įvedimo į duomenų bazę iki grupių, atitinkančių amžių, nustatymo ir vardo ženklelių spausdinimo sekmadienio rytą. Baigę šiuos veiksmus, tėvai galės užregistruoti savo vaikus savitarnos planšetėje ir gauti atitinkamą saugumo žymeklį.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="Ep9CBUcJwPI" title="Vaikų registracijos nustatymas B1 sistemoje" next="Lankomumo įrašymas ir sekimas B1 sistemoje" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukurkite savo bažnyčios paskyrą svetainėje [admin.b1.church](https://admin.b1.church)
- Įsitikinkite, kad turite administratoriaus teises. Jei reikia, žr. [Vaidmenys ir leidimai](../people/roles-permissions.md)
- Pasirinktinai: paruoškite šeimų CSV failą, jei perkeliate duomenis iš kitos sistemos

</div>

## 1 žingsnis: pridėkite šeimas į duomenų bazę

Kol registracija gali veikti, sistema turi žinoti apie jūsų šeimas. Kiekvienas vaikas turi būti susietas su tėvu ar motina per namų ūkio funkciją.

Vadovaukitės [Asmenų pridėjimo](../people/adding-people.md) vadovu ir pridėkite bent vieną šeimą. Būtinai:

- Pirmiausia pridėkite tėvą (-us) arba motiną (-as)
- Pridėkite kiekvieną vaiką
- Susiekite juos tame pačiame namų ūkyje, naudodami [namų ūkio redaktorių](../people/adding-people.md#managing-households)

:::tip
Jei turite daugiau nei keletą šeimų, vietoj jų pridėjimo po vieną naudokite [CSV importavimo](../people/importing-data.md) įrankį. Visą savo katalogą galite importuoti per kelias minutes.
:::

## 2 žingsnis: sukurkite vaikų grupes

Grupės apibrėžia klases, į kurias vaikai registruojasi. Paprastai norėsite vienos grupės kiekvienam amžiaus intervalui.

Vadovaukitės [Grupių kūrimo](../groups/creating-groups.md) vadovu ir sukurkite tokias grupes:

- **Kūdikių grupė** (nuo 0 iki 2 metų)
- **Ikimokyklinė grupė** (nuo 3 iki 5 metų)
- **Pradinė grupė** (nuo 6 iki 10 metų)

Pavadinimus ir amžiaus intervalus galite pritaikyti pagal savo vaikų ministerijos struktūrą.

## 3 žingsnis: sukonfigūruokite parapijas ir pamaldas

Registracija susieta su konkrečiu pamaldų laiku. Reikia sukonfigūruoti bent vieną parapiją (filialą) ir vieną pamaldas.

Vadovaukitės [Lankomumo nustatymu](../attendance/setup.md) vadovu, kad:

1. Pridėtumėte savo parapiją (pvz., „Pagrindinė parapija“)
2. Pridėtumėte pamaldas (pvz., „Sekmadienio rytas“)
3. Nustatytumėte pamaldų laiką (pvz., „9:00“) ir, pasirinktinai, [registracijos tvarkaraštį](../attendance/setup.md#setting-a-check-in-schedule), kad registracija automatiškai atsidarytų prieš kiekvienas pamaldas ir užsidarytų po jų
4. Priskirtumėte vaikų grupes prie pamaldų

## 4 žingsnis: nustatykite registracijos programą

Dabar viską sujunkite įdiegdami registracijos programą planšetėje.

1. Įdiekite **B1 Checkin** programą. Atsisiuntimo nuorodas rasite straipsnyje [Registracija](../attendance/check-in.md)
2. Prisijunkite naudodami savo B1 Admin prisijungimo duomenis
3. Pasirinkite savo parapiją ir pamaldų laiką

Išsamius nustatymo veiksmus rasite visame straipsnyje [Registracija](../attendance/check-in.md).

## 5 žingsnis: įsigykite įrangą

Savitarnos terminalui reikia planšetės, o vardo ženkleliams spausdinti pasirinktinai galite naudoti „Brother“ etikečių spausdintuvą.

Bent jau reikės:
- **Vienos „Android“ arba „Amazon Fire“ planšetės**. Žr. [rekomenduojamas planšetes](../attendance/check-in.md#recommended-hardware)
- **Vieno „Brother“ etikečių spausdintuvo**. Rekomenduojamas QL-1110NWB modelis dėl „Bluetooth“ ir „WiFi“ palaikymo
- **„Brother DK-1201“ etikečių** (1-1/7" x 3-1/2")

:::warning
Su B1 Checkin programa suderinami tik „Brother“ etikečių spausdintuvai. Kitų gamintojų spausdintuvai veikti nebus.
:::

## 6 žingsnis: atlikite bandomąją registraciją

Prieš sekmadienio rytą atlikite bandomąjį patikrinimą:

1. Savo planšetėje atidarykite B1 Checkin programą
2. Pasirinkite savo parapiją ir tinkamą pamaldų laiką
3. Ieškokite vienos iš pridėtų šeimų
4. Užregistruokite vaiką ir patikrinkite:
   - Lankomumas rodomas B1 Admin skiltyje **Lankomumas**
   - Jei naudojate spausdintuvą, vardo ženklelis atspausdinamas teisingai

:::tip
Prieš pradėdami, supažindinkite savo sveikinimo komandos savanorius su registracijos procesu. Paprastai pakanka trumpos 5 minučių apžvalgos.
:::

## Viskas paruošta!

Jūsų vaikų ministerijos registracija paruošta. Tėvai gali ieškoti savo šeimos, pasirinkti savo vaikus ir užsiregistruoti savitarnos terminale. Lankomumas automatiškai įrašomas B1 Admin sistemoje.

## Susiję straipsniai

- [Asmenų pridėjimas](../people/adding-people.md). Pridėkite daugiau šeimų, kai jos apsilanko
- [Grupių kūrimas](../groups/creating-groups.md). Tvarkykite savo vaikų grupes
- [Lankomumo nustatymas](../attendance/setup.md). Sukonfigūruokite parapijas ir pamaldas
- [Registracija](../attendance/check-in.md). Išsamus registracijos programos nustatymas ir įranga
- [Lankomumo sekimas](../attendance/tracking-attendance.md). Peržiūrėkite registracijos ataskaitas
