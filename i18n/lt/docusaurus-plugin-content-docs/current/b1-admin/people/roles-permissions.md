---
title: "Rolių priskyrimas"
---

# Rolių priskyrimas

<div class="article-intro">

B1 Admin naudoja vaidmenimis grįstą leidimų sistemą, kuri padeda valdyti, ką kiekvienas jūsų komandos narys gali matyti ir daryti. Priskirdami vaidmenis, galite suteikti darbuotojams ir savanoriams prieigą tik prie sričių, kurių jiems reikia, – ir nieko daugiau. Tinkamas vaidmenų valdymas apsaugo jūsų bažnyčios duomenis ir leidžia komandai dirbti efektyviau.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia **Domain Admin** prieigos arba vaidmens, suteikiančio leidimą tvarkyti **Settings** B1 Admin.
- Žmonės, kuriems norite priskirti vaidmenis, jau turi būti jūsų kataloge. Jei juos dar reikia pridėti, žr. [Žmonių pridėjimas](adding-people.md).

</div>

## Vaidmenų supratimas

Vaidmuo – tai leidimų rinkinys, kurį priskiriate vienam ar keliems naudotojams. Pavyzdžiui, galite sukurti vaidmenį „Finance Team“, suteikiantį prieigą prie [aukojimų įrašų](../donations/recording-donations.md), arba vaidmenį „Check-In Volunteer“, leidžiantį naudotis tik [lankomumo funkcijomis](../attendance/check-in.md).

Kiekvienas vaidmuo valdo prieigą prie konkrečių B1 Admin sričių, įskaitant:

- **People** – narių profilių peržiūra ir redagavimas. Asmens įrašo skyriui **Notes** reikia leidimo **Edit People**, o atskiras leidimas **View Confidential Notes** valdo prieigą prie skyriaus **Confidential Notes** (skirto pastoracinei priežiūrai, asmens istorijai ir panašioms jautrioms pastaboms). **View People Names Only** leidžia ieškoti žmonių pagal vardą (matant tik vardą, nuotrauką ir narystės statusą), bet be prieigos prie viso katalogo. Kartu su **View Attendance** arba **Edit Attendance** jis leidžia savanoriui atidaryti **Groups** ir matyti klasių sąrašus pagal vardus; su **Edit Attendance** jis taip pat leidžia [įrašyti lankomumą](../attendance/recording-attendance.md). Žr. [People Names Only](../settings/roles-permissions.md#people-names-only).
- **Donations** – aukų ir finansinių ataskaitų tvarkymas. **Enter Donations** yra siauresnė parinktis skaičiavimo komandoms: ji leidžia įvesti aukas, bet tik į [paketus](../donations/batches.md#who-can-change-a-batch), kurie vis dar atviri.
- **Attendance** – lankomumo duomenų įrašymas ir peržiūra
- **Forms** – [pasirinktinių formų](../forms/creating-forms.md) kūrimas ir tvarkymas
- **Groups** – [grupių narystės](../groups/group-members.md) ir kalendorių tvarkymas
- **Settings** – bažnyčios mastu taikomų nustatymų konfigūravimas

:::warning
**Domain Admins** turi visapusišką prieigą prie visų B1 Admin sričių. Jų leidimų negalima keisti ar riboti. Šį vaidmenį naudokite tik pagrindiniams administratoriams.
:::

## Vaidmenų peržiūra ir tvarkymas

1. Atidarykite [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą B1 Admin viršutinėje kairėje pusėje) ir išskleiskite **Settings**.
2. Spustelėkite **Roles**.
3. Pamatysite visų jūsų bažnyčiai sukonfigūruotų vaidmenų sąrašą su stulpeliu **Members**, kuriame nurodyta, kiek naudotojų priklauso kiekvienam vaidmeniui.
4. Spustelėkite bet kurį vaidmenį, kad peržiūrėtumėte jo narius ir leidimus.

## Naudotojų priskyrimas vaidmeniui

1. Jump menu pasirinkite **Settings > Roles**.
2. Spustelėkite vaidmenį, prie kurio norite pridėti naudotoją.
3. Skyriuje **Members** ieškokite asmens pagal vardą.
4. Spustelėkite **Add**, kad priskirtumėte jį prie vaidmens.

Naudotojas turės visus su šiuo vaidmeniu susijusius leidimus kitą kartą prisijungdamas.

## Vaidmens leidimų redagavimas

1. Jump menu pasirinkite **Settings > Roles**.
2. Spustelėkite vaidmenį, kurį norite keisti.
3. Skyriuje **Permissions** pažymėkite arba panaikinkite žymėjimą sričių, prie kurių vaidmuo turi turėti prieigą. Kiekvienoje leidimų grupėje nurodoma, kiek jos leidimų pažymėta (pavyzdžiui, **2 of 5**).
4. Kiekvienas pakeitimas išsaugomas iš karto, kai pažymite arba panaikinate žymėjimą.

:::tip
Laikykitės mažiausių privilegijų principo – kiekvienam vaidmeniui suteikite tik tuos leidimus, kurių jam iš tikrųjų reikia. Tai padeda apsaugoti duomenis ir sumažina atsitiktinių pakeitimų tikimybę.
:::

## Dažniausi vaidmenų pavyzdžiai

- **Office Staff** – prieiga prie People, Donations, Attendance ir Forms
- **Group Leaders** – prieiga tik prie [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** – leidimas **Checkin** lankomumo skyriuje, kurio reikia paskyrai, prisijungiančiai prie [registracijos terminalo](../attendance/check-in.md)
- **Finance Team** – prieiga prie [Donations](../donations/recording-donations.md) ir ataskaitų
- **Counting Team** – **Enter Donations** ir **View Donations**, kad savanoriai galėtų įvesti aukas į atvirus paketus, nematydami aukojimų suvestinių

Išsamesnės informacijos apie aukojimų ir žmonių leidimus žr. [Roles & Permissions](../settings/roles-permissions.md).
