---
title: "Registracijos užbaigimas"
---

# Registracijos užbaigimas

<div class="article-intro">

Kai peržiūrėsite savo šeimą ir priskirsite grupes, jei to reikia, galite užbaigti registraciją. Tai paskutinis žingsnis savitarnos terminalo darbo eigoje: programa pateikia lankomumo duomenis, spausdina etiketes ir paruošia terminalą kitai šeimai.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Peržiūrėkite savo šeimą](./household-review) šeimos peržiūros ekrane
- [Priskirkite grupes](./group-assignment) visiems šeimos nariams, kuriems reikia registruotis į konkrečią klasę ar programą
- Pasirinktinai [pridėkite svečius](./adding-guests), kurie atvyko kartu su jūsų šeima

</div>

## Kaip registruotis

1. Šeimos peržiūros ekrane palieskite mygtuką **Registracija**, esantį ekrano apačioje.
2. Programa pateikia lankomumo duomenis serveriui ir parodo **sėkmės ekraną** su žaliu varnelės ženklu ir sveikinimo žinute.

Tiek ir reikia. Jūsų šeimos lankomumas užregistruotas.

## Pilni kambariai ir savanorių santykis

Jei jūsų bažnyčia nustatė [saugos ribas](../../b1-admin/attendance/checkin-safety) kambariams, serveris jas patikrina prieš išsaugodamas duomenis:

- Jei pasirinktas kambarys yra **pilnas arba uždarytas**, registracija neįvyksta, o programa nurodo kambarį, kad galėtumėte pasirinkti kitą.
- Jei pamaldų laikui yra nustatyta [registracijos tvarkaraštis](../../b1-admin/attendance/setup#setting-a-check-in-schedule), o jo registracijos langas šiuo metu neatidarytas, registracija į to pamaldų laiko kambarius taip pat atmetama. Ekrane **Negalima dar registruoti** nurodomas kambarys ir priežastis „registracija šiuo metu neatidaryta“; palieskite **Keisti kambarius**, kad pasirinktumėte kitą pamaldų laiką ar grupę. (Jau uždaryti pamaldų laikai [šeimos ekrane](./household-review) rodomi kaip **Uždaryta** ir negali būti pasirinkti, todėl šį pranešimą paprastai pamatysite tik tuo atveju, jei langas užsidaro registracijos metu.)
- Šeima, kuri jau registravosi ankstesniam pamaldų laikui, gali vėliau grįžti ir pridėti atidarytą pamaldų laiką, net jei ankstesnio laiko langas jau uždarytas. Jų esamos registracijos išlieka, ir jos nebus priežastis atmesti naujos registracijos.
- Jei vaikų kambaryje trūksta savanorių pagal nustatytą santykį, programa arba parodo įspėjimą, kurį darbuotojas gali patvirtinti, kad tęstų, arba visiškai blokuoja registraciją – priklausomai nuo to, kaip jūsų bažnyčia nustatė santykio laikymosi taisykles.

## Etikečių spausdinimas

Jei sukonfigūruotas tinklinis spausdintuvas, programa po registracijos automatiškai spausdina etiketes:

- **Vardinės etiketės** spausdinamos kiekvienam asmeniui, kuris priskirtas grupei, kurioje įjungtas nustatymas **Spausdinti vardinę etiketę**. Vardinėse etiketėse nurodomas asmens vardas, grupės priskyrimas ir alergijos bei pastabų informacija, jei ji įrašyta.
- **Tėvų atsiėmimo lapeliai** spausdinami, kai bet kuris užregistruotas asmuo yra grupėje, kurioje įjungtas nustatymas **Tėvų atsiėmimas**. Asmenys, užregistruoti kaip **Savanoris**, praleidžiami, todėl vaikų priežiūros darbuotojas, dirbantis kambaryje su tėvų atsiėmimu, lapelio negauna. Atsiėmimo lapelyje išvardijami vaikai, jų grupių priskyrimai ir unikalus **4 simbolių saugos kodas**.

:::info
Tas pats saugos kodas pateikiamas ir vaiko vardinėje etiketėje, ir tėvų atsiėmimo lapelyje. Atsiėmimo metu savanoriai sulygina kodus, kad patikrintų, ar vaiką ima tinkamas suaugęs asmuo.
:::

Saugos kodas kiekvienai registracijai generuojamas iš naujo ir naudoja tik priebalses bei skaitmenis (balsės neįtraukiamos, kad nesudarytų netinkamų žodžių).

:::warning
Jei etiketės nespausdinamas, atidarykite administratoriaus nustatymus palietę **bažnyčios logotipą** septynis kartus, tada palieskite **Keisti spausdintuvą**, kad patikrintumėte ryšį su spausdintuvu. Trikčių šalinimo žingsnius rasite skyriuje [Spausdintuvo nustatymas](../getting-started/printer-setup).
:::

## Kas vyksta po registracijos

- Jei spausdintuvas sukonfigūruotas, programa atspausdina visas etiketes ir tada automatiškai grįžta į **paieškos ekraną**, paruoštą kitai šeimai.
- Jei spausdintuvas nesukonfigūruotas, programa taip pat automatiškai grįžta į **paieškos ekraną**.

Bet kuriuo atveju sėkmės ekranas lieka rodomas bent 6 sekundes nuo jo atsiradimo (8 sekundes, kai švenčiamas kieno nors lankomumo etapas), kad šeimos matytų, jog registracija pavyko. Jei spausdinimas trunka ilgiau, programa grįžta maždaug per pusantros sekundės po to, kai spausdinimas baigiasi.

Norėdami grįžti į paieškos ekraną, nieko palaikyti nereikia – programa perėjimą atlieka automatiškai. Kai ekranas jau rodomas kurį laiką, galite jį paliesti, kad grįžtumėte iš karto; palietimas per pirmą pusantros sekundės ignoruojamas, todėl greitas dvigubas paspaudimas ant **Registracija** neperšoks šio ekrano.

:::tip
Po kiekvienos registracijos programa visiškai atsistato, todėl nėra rizikos, kad viena šeima pamatys kitos šeimos informaciją.
:::

## Kas įrašoma

Kai palietžiate **Registracija**, programa serveriui siunčia šiuos duomenis kiekvienam šeimos nariui, kuriam priskirta grupė:

- **asmuo**, kuris registruojamas
- **pamaldos**, kuriose jis dalyvauja
- **pamaldų laikas** ir **grupė**, kuriai jis priskirtas

Šie duomenys matomi B1 Admin programoje skyriuje „Lankomumas“, kur bažnyčios administratoriai gali peržiūrėti ir tvarkyti lankomumo įrašus. Išsamios informacijos ieškokite [registracijos administravimo vadove](../../b1-admin/attendance/check-in.md).
