---
title: "Kalendoriaus planavimas"
description: "Nustatykite savaitinį ar vienkartinį tvarkaraštį FreePlay Admin kalendoriuje: grojaraščiai, planai ar aplankai ekranų grupėms, numatytieji ciklai – atsarga."
---

# Kalendoriaus planavimas

<div class="article-intro">

Puslapis **Calendar** FreePlay Admin valdo, ką kiekviena ekranų grupė rodo ir kada. Pridėkite tvarkaraštį grojaraščiui, pamaldų planui ar tiekėjo aplankui, nustatykite jį kartotis kas savaitę arba rodyti vieną kartą. Kai tvarkaraštis nenustatytas, grupė rodo savo numatytąjį ciklą.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukurkite bent vieną ekranų grupę. Žr. [Ekranų ir grupių valdymas](./managing-screens.md#screen-groups)
- [Sukurkite grojaraštį](./building-playlists.md) arba įsitikinkite, kad B1 Admin yra nustatytas pamaldų plano tipas

</div>

## Kalendoriaus skaitymas

1. Eikite į **Calendar**.
2. Viršuje esančiuose skirtukuose pasirinkite ekranų grupę. Kiekvienas skirtukas rodo, kiek tvarkaraščių turi grupė.
3. Savaitės rodinys eina nuo pirmadienio iki sekmadienio, nuo 6 val. iki 22 val. Raudona linija žymi dabartinį laiką.
4. Naudokite rodyklių mygtukus, kad pereitumėte į ankstesnę ar kitą savaitę, arba spustelėkite **Today**, kad grįžtumėte į šią savaitę.

Puslapio paantraštėje rodoma laiko juosta, naudojama kalendoriuje. Tvarkaraščiai seka jūsų bažnyčios laiko juostą, kurią nustatote B1 Admin skiltyje [Church Information](../../b1-admin/settings/church-settings.md#time-zone). Jei jūsų bažnyčiai laiko juosta nenustatyta, FreePlay naudoja jūsų filialo laiko juostą. Kalendorius ir jūsų televizoriai naudoja tą pačią laiko juostą, todėl blokas, įdėtas kalendoriuje 9:00, televizoriuje rodomas 9:00, net jei jūsų kompiuteris nustatytas į kitą laiko juostą.

Tvarkaraščiai pažymėti spalvomis pagal tipą. Legenda paaiškina spalvas:

- **Default loop** - Brūkšniuotas fonas, rodomas už visko, kai grupė turi numatytąjį ciklą
- **Playlist** - Grojaraštis
- **Service plan** - Pamaldų planas
- **Provider folder** - Tiekėjo aplankas

Kiekviename bloke rodomas jo pavadinimas, o aukštesni blokai papildomai rodo laiką, ar tvarkaraštis kartojasi (**weekly** arba **once**), ir ką daryti, kai turinys baigiasi anksčiau.

## Numatytojo ciklo nustatymas

Numatytasis ciklas grupės ekranuose rodomas visada, kai nėra jokio tvarkaraščio.

1. Puslapyje **Calendar** antraštėje spustelėkite **Default loop…**. Jei numatytasis ciklas jau nustatytas, mygtuke rodomas tekstas **Default loop:**, po kuriuo nurodytas grojaraščio pavadinimas.
2. Pasirinkite **Playlist** arba pasirinkite **None — screen goes dark**.
3. Spustelėkite **Save**.

## Tvarkaraščio pridėjimas

Naują tvarkaraštį galima pradėti trimis būdais:

- Spustelėkite tuščią kalendoriaus vietą. Forma atsidaro jau užpildyta tos dienos ir pusvalandžio laiku.
- Antraštėje spustelėkite **Add schedule**.
- Komandų paletėje (**Ctrl+K** arba **⌘K**) pasirinkite **Add schedule**.

Tada užpildykite formą:

1. **Play** - Pasirinkite, ką rodyti:
   - **Playlists** - Bet kuris jūsų sukurtas grojaraštis
   - **Service plans** - Pamaldų plano tipas iš B1 Admin, pažymėtas **(current plan)**. Ekranas kiekvieną savaitę rodo dabartinį to plano tipo planą, įskaitant Go Curriculum pamokas (ir pritaikytas), kurioms naudojamas prie plano tipo ministerijos susietas Go prisijungimas
   - **Provider folder…** - Atidaro langą **Choose a provider folder**. Naršykite iki aplanko ir spustelėkite **Use this folder**. Norėdami vėliau pasirinkti kitą aplanką, spustelėkite **Change**
2. **Repeats** - Pažymėkite savaitės dienas, kuriomis tvarkaraštis rodomas. Jei norite vienai datai, įjunkite **One time** ir pasirinkite **Date**.
3. **Start** ir **End** - Laikas, kada tvarkaraštis prasideda ir baigiasi.
4. **If it finishes early** - Ką daryti, kai turinys pasibaigia anksčiau nei pabaigos laikas:
   - **Loop until the end time** - Pradeda iš naujo nuo pradžios. Tinka skelbimų ciklams, pranešimams ir laikmačiams
   - **Teacher paced** - Skaidrės laukia mokytojo nuotolinio valdymo pulto. Pamoka lieka ekrane po pabaigos laiko, kol bus rodoma paskutinė skaidrė
   - **Play once, then go back to the default loop** - Parodo vieną kartą, tada grįžta prie numatytojo ciklo
5. Kartojamiems tvarkaraščiams nustatykite **Starts** į pirmąją datą. Skiltyje **Ends** pasirinkite **Never** arba **On date** ir įveskite **End date**.
6. Spustelėkite **Save**.

:::info
**Teacher paced** pakeitė senesnę parinktį „palikti paskutinę skaidrę“. Tvarkaraščiai, išsaugoti su ta parinktimi, dabar rodomi kaip teacher paced.
:::

## Tvarkaraščio redagavimas ar šalinimas

1. Spustelėkite tvarkaraščio bloką kalendoriuje.
2. Pakeiskite bet kurį lauką ir spustelėkite **Save**, arba spustelėkite **Delete**, kad pašalintumėte tvarkaraštį.

## Persidengiantys tvarkaraščiai

Jei du tvarkaraščiai persidengia, forma rodo įspėjimą: **Overlaps another schedule. The one that starts later wins.** Kol veikia vėliau prasidedantis tvarkaraštis, ekranai rodo jį. Jam pasibaigus, ekranai grįžta prie ankstesnio tvarkaraščio, jei jis dar veikia.

## Kaip ekranai pritaiko pakeitimus

Susieti ekranai atsisiunčia visa, kas suplanuota kitoms 7 dienoms, ir patys tikrina, ar yra pakeitimų. Pakeitus kalendorių, televizoriaus liesti nereikia. Norėdami sužinoti, ar ekranas turi viską, ko reikia, patikrinkite lauką **Ready through** [Screens puslapyje](./managing-screens.md).

## Susiję straipsniai

- **[Grojaraščių kūrimas](./building-playlists.md)** - Sukurkite grojaraščius, kuriuos planuojate
- **[Planuotas atkūrimas televizoriuje](./scheduled-playback.md)** - Kaip mokytojo nustatytos pamokos ir nuotolinis valdymo pultas veikia televizoriuje
- **[Ekranų ir grupių valdymas](./managing-screens.md)** - Pridėkite grupes ir patikrinkite kiekvieno ekrano atsisiuntimus
- **[Tik dalies kiekvienos pamokos išlaikymas](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Sumažinkite visas planuojamas pamokas pagal plano tipą iki dalių, kurias rodo jūsų kambarys
