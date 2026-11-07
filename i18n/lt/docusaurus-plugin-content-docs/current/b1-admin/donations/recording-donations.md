---
title: "Aukų įrašymas"
description: "Registruokite aukas B1 Admin: sukurkite partiją, įveskite dovanas po vieną, importuokite CSV failą arba įrašykite vieną auką iš aukotojo profilio."
---

# Aukų įrašymas

<div class="article-intro">

Aukas B1 Admin programoje įrašote per Partijų (Batches) sistemą. Sukuriate partiją, kuri atspindi rinkimą (pavyzdžiui, sekmadienio auką), tada į tą partiją pridedate atskiras aukas. Taip jūsų aukojimo įrašai išlieka tvarkingi ir lengvai suderinami.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Nustatykite savo [fondus](funds.md), kad galėtumėte priskirti aukas tinkamoms kategorijoms
- Sukurkite [partiją](batches.md), kurioje laikysite aukas, kurias ketinate įvesti
- Įsitikinkite, kad aukotojai yra jūsų [asmenų kataloge](../people/adding-people.md), kad galėtumėte juos rasti įvedant dovanas
- Norint įvesti dovanas į partiją, reikia leidimo **Edit Donations** arba leidimų **Enter Donations** ir **View Donations** kartu (žr. [Kas gali keisti partiją](batches.md#who-can-change-a-batch))

</div>

## Partijos kūrimas ir aukų pridėjimas

1. B1 Admin programoje atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe), išskleiskite **Donations** ir spustelėkite **Batches**.
2. Puslapio viršuje spustelėkite **Add Batch**.
3. Įveskite partijos pavadinimą (pvz., „Sekmadienio auka – saus. 5“) ir pasirinkite datą. Spustelėkite **Save**.
4. Jūsų nauja partija pasirodys sąraše, kur nurodyta nulis aukų ir 0,00 $.
5. Spustelėkite **partijos pavadinimą**, kad ją atidarytumėte.

## Atskirų aukų įvedimas

1. Partijos informacijos puslapyje šalia aukų sąrašo rodomas aukų įvedimo skydelis. Skiltyje **Select Person or Anonymous** įveskite aukotojo vardą paieškos lauke, kad jį rastumėte, arba spustelėkite **Anonymous**. (Spustelėjus **Add Donation** puslapio viršuje, pereinama prie šio skydelio.)
2. Pasirinkus asmenį, įvedimo formoje rodomi laukai: **Date**, **Method** (Check, Cash, Card arba In-Kind), **Fund**, **Notes**, **Amount** ir **Check #** (arba **Last 4 digits** kortelės dovanoms, arba **Item**, jei aprašote natūra įteiktą dovaną). Norėdami pasirinkti kitą asmenį, spustelėkite **Change** šalia aukotojo vardo.
3. Užpildykite duomenis ir spustelėkite **Add Donation** (arba paspauskite Enter).
4. Auka pridedama prie aukų sąrašo, o forma išvalomas, kad galėtumėte įvesti kitą.

:::info
Jei partija [uždaryta](batches.md#closing-and-reopening-a-batch), įvedimo skydelis ir **Edit** nuorodos paslepiamos visiems, kurie neturi leidimo **Edit Donations**, o viršuje esantis pranešimas nurodo, kad partija uždaryta. Paprašykite kolegos, turinčio leidimą **Edit Donations**, ją vėl atidaryti.
:::

:::tip
Galite greitai įvesti kelias aukas iš eilės, nepalikdami partijos puslapio. Forma išvalomas po kiekvieno įrašo, todėl galite efektyviai peržiūrėti krūvą čekių ar vokų.
:::

## Aukų importavimas iš CSV failo {#importing-donations-from-a-csv-file}

Jei jūsų aukos jau yra skaičiuoklėje, pavyzdžiui, eksportuotos iš kitos aukojimo sistemos arba suskaičiuotos skaičiavimo komandos lentelėje, galite jas importuoti į partiją, o ne įvesti kiekvieną atskirai.

1. Atidarykite partiją ir puslapio viršuje spustelėkite **Import CSV**. (Mygtukas rodomas, jei galite keisti partiją ir jūsų bažnyčioje yra bent vienas [fondas](funds.md).)
2. Spustelėkite **Choose CSV File** ir pasirinkite failą. Faile turi būti antraštės eilutė, o stulpeliai gali eiti bet kokia tvarka:
   - **Amount** (privalomas; veikia ir `Total`) – valiutos simboliai ir kableliai ignoruojami, todėl `$1,250.00` yra tinkamas. Suma turi būti didesnė nei nulis.
   - **Date** – naudokite formatą, pavyzdžiui, `2026-10-25` arba `10/25/2026`. Jei laukas tuščias, naudojama partijos data.
   - **Fund** – fondo pavadinimas, atitinkantis nepriklausomai nuo didžiųjų ir mažųjų raidžių. Jei laukas tuščias, naudojamas jūsų pirmasis fondas.
   - **Method** – **Check**, **Cash**, **Card** arba **In-Kind**. Jei laukas tuščias, naudojamas **Check**.
   - **Check Number** – čekio numeris (arba kita mokėjimo informacija).
   - **Notes**
   - **Email**, **Name** arba **First Name** ir **Last Name** – naudojami aukotojui sieti su asmeniu jūsų duomenų bazėje. Įrašas „Smith, John“ nuskaitomas kaip „John Smith“.
3. Peržiūrėkite peržiūros sąrašą. Kiekvienoje eilutėje rodomas eilutės numeris, aukotojas iš failo, **Match**, fondas ir suma:
   - Asmens vardas reiškia, kad aukotojas buvo susietas. B1 pirmiausia ieško pagal el. paštą, paskui pagal tikslų vardą, ir tik tada, kai tinka tiksliai vienas asmuo.
   - **Not found — anonymous** reiškia, kad vienintelio atitikmens nerasta. Dovana importuojama kaip anoniminė, o jos pastabose pridedama „Imported as:“ su aukotojo vardu, kad vėliau galėtumėte ją priskirti.
   - Raudonas pranešimas, pavyzdžiui, **Invalid amount**, **Unknown fund**, **Unknown method** arba **Invalid date**, reiškia, kad ta eilutė bus praleista. Ištaisykite failą ir pasirinkite jį iš naujo, kad eilutė būtų įtraukta.
4. Spustelėkite **Import** (mygtuke nurodomas eilučių, kurios bus importuotos, skaičius). Aukos pridedamos prie partijos.

:::tip
Po importavimo bet kurioje anoniminėje aukoje spustelėkite **Edit** ir pasirinkite tinkamą asmenį. Pastaba „Imported as:“ parodo, kieno vardu failas nurodė auką.
:::

## Dovanos įrašymas iš asmens įrašo

Norėdami įrašyti vieną dovaną neatidarę partijos, atidarykite aukotojo įrašą skiltyje **People** ir spustelėkite **Log a gift** (aukojimo suvestinėje arba asmens aukojimo rodinyje).

1. Nustatykite **Date** ir **Amount**.
2. Pasirinkite **Fund** ir **Method** (Check, Cash, Card arba In-Kind) ir, jei reikia, įveskite **Check #**, **Last 4 digits** arba **Item** (natūra įteiktoms dovanoms).
3. Jei norite, pridėkite **Notes**, tada spustelėkite **Save**.

Dovana įrašoma į tos datos partiją. Jei tai datai partijos dar nėra, ji sukuriama automatiškai ir pavadinama pagal datą.

## Vienos aukos paskirstymas keliems fondams

Kartais vienas aukotojas vienu mokėjimu aukoja keliems fondams. Norėdami tai įrašyti:

1. Po įvedimo skydeliu spustelėkite nuorodą **full donation editor** (arba spustelėkite **Edit** ties esama aukos eilute).
2. Pilname redaktoriuje pridėkite sumas skirtingiems fondams. Bendra suma bus apskaičiuota automatiškai pagal atskirų fondų sumas.
3. Spustelėkite **Save**, kad atnaujintumėte aukos įrašą.

:::info
Aukų paskirstymas keliems fondams yra įprastas, kai aukotojas išrašo vieną čekį keliems tikslams, pavyzdžiui, Bendrajam fondui ir misijoms.
:::

## Aukų redagavimas ir šalinimas

Norėdami redaguoti aukos įrašą, partijoje spustelėkite **Edit** mygtuką jo eilutėje. Galite pakeisti datą, sumą, fondą, mokėjimo būdą (Check, Cash, Card arba In-Kind) ar bet kurią kitą informaciją. Natūra įteiktai dovanai redaktorius lauką pažymi **Item**, kad galėtumėte aprašyti, kas buvo įteikta. Baigę spustelėkite **Save**.

:::tip
Eilutė po partijos pavadinimu viršutinėje puslapio dalyje automatiškai atnaujinama: ji rodo partijos datą, dovanų skaičių ir bendrą sumą, kai pridedate ar redaguojate įrašus. Ja galite pasinaudoti derindami su indėlio kvitu.
:::

## Aukos grąžinimas

Jei aukotojas buvo apmokestintas per klaidą arba prašo grąžinti pinigus, užbaigtą aukos įrašą galite grąžinti tiesiai iš jo redagavimo ekrano – nereikia eiti į jūsų mokėjimų vartų valdymo skydelį.

1. Atidarykite aukos įrašą ir spustelėkite **Edit**.
2. Formos apačioje, šalia **Delete**, spustelėkite mygtuką **Refund**.
3. Patvirtinkite dialogą: „Refund this donation in full through the payment gateway? This cannot be undone.“ (Grąžinti šią auką visa suma per mokėjimų vartus? Šio veiksmo negalima atšaukti.)

Auka grąžinama visa suma per pradinį mokėjimų vartus ir sąrašuose pažymima **Refunded**.

:::warning
Galima grąžinti tik visą sumą – iš B1 Admin negalima grąžinti dalies sumos. Patvirtinus grąžinimą, jo taip pat negalima atšaukti.
:::

:::info
Mygtukas **Refund** rodomas tik aukoms, sumokėtoms internetu (turinčioms mokėjimo vartų operaciją), kurių statusas vis dar **Complete**. Rankiniu būdu įvestos aukos (grynieji, čekiai) neturi mokėjimo vartų operacijos, todėl jų negalima grąžinti – jas reikia redaguoti arba ištrinti.
:::

## Vienos dovanos kvito spausdinimas

Kai kas nors įteikia čekį, sumoka už renginį ar marškinėlius arba atvykusi organizacija atneša auką, galite atspausdinti kvitą tik tai dovanai, o ne visai partijai ar metinei ataskaitai.

1. Atidarykite partiją, kurioje yra auka.
2. Šalia **Edit** ties aukos eilute spustelėkite **Receipt**. Taip pat galite spustelėti **Receipt** Edit Donation formos apačioje.
3. Spustelėkite **Print**, arba **Close**, kad grįžtumėte.

Kvitas naudoja tokį patį maketą kaip aukojimo ataskaita: jūsų bažnyčią ir aukotoją (arba „Anonymous“), dovanos datą ir būdą, kiekvieną fondą ir sumą, pastabą, jūsų **Giving Note** ir oficialų kvito bloką, jei nustatėte **Statement format** (žr. [Aukojimo ataskaitas](giving-statements.md)). Numeris tame bloke yra aukos ID.

:::info
Frazė „be prekių ar paslaugų“ spausdinama tik tada, kai visi dovanos fondai pažymėti kaip atskaitomi nuo mokesčių. Jei bet kuri dovanos dalis buvo skirta fondui, kuris nėra atskaitomas nuo mokesčių, pavyzdžiui, renginio mokesčiui ar pirkiniui, kvite ši frazė nerašoma, kad jis būtų suprantamas kaip mokėjimas, o ne labdaros dovana.
:::

:::tip
Internetu atliktos aukos jau gauna automatinį padėkos el. laišką, todėl kvitas dažniausiai naudingas dovanoms, kurias įvedate rankiniu būdu.
:::

## Kiti žingsniai

- Patikrinkite įrašus naudodami [Aukų ataskaitas](donation-reports.md), kad įsitikintumėte jų tikslumu
- Metų pabaigoje sugeneruokite [Aukojimo ataskaitas](giving-statements.md) savo aukotojams
