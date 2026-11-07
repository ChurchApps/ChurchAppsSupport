---
title: "Pasirinktiniai laukai"
---

# Pasirinktiniai laukai

<div class="article-intro">

**Pasirinktiniai laukai** leidžia įrašyti savo informaciją kiekvienam asmens įrašui: dalykus, kuriems B1 neturi įmontuoto lauko, pavyzdžiui, fono patikros galiojimo pabaigos datą, marškinėlių dydį ar krikšto mokymų būseną. Lauką apibrėžiate vieną kartą Nustatymuose, tada įvedate reikšmę kiekvieno asmens profilyje ir pagal ją ieškote arba kuriate sąrašus. Tai pakeičia senesnį sprendimą, kai asmens formos kurdavote tik vienam pasirinktiniam duomenų laukui saugoti.

</div>

## Mokymo vaizdo įrašas

<YouTube id="yUfDEbp2HQ4" title="Pasirinktiniai laukai, masinis redagavimas ir eksportavimas B1" next="Grupių kūrimas ir narių pridėjimas B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Reikia **Asmenys** redagavimo teisių, kad galėtumėte apibrėžti laukus ir įvesti reikšmes, bei prieigos prie srities **Nustatymai**. Bet kas, turintis asmenų peržiūros teises, gali matyti reikšmes. Žr. [Vaidmenys ir leidimai](./roles-permissions.md).
- Prieš pradedant nuspręskite, ką norite sekti ir kuris tipas tinka geriausiai (tekstas, skaičius, data, taip arba ne atsakymas ar pasirinkimų sąrašas).

</div>

## Pasirinktinių laukų atidarymas

B1 Admin programoje atidarykite [Greitojo šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje), pasirinkite **Nustatymai > Nustatymai** ir kairiajame sąraše spustelėkite **Pasirinktiniai laukai**, kad perslinktumėte į skyrių **Pasirinktiniai laukai**. Taip pat galite iš karto nueiti į **/settings/custom-fields**. Pamatysite visų apibrėžtų laukų sąrašą su jų **Pavadinimu** ir **Lauko tipu**. Jei dar nesukūrėte nė vieno, skydelyje rašoma *„Pasirinktinių laukų dar nepridėta."*

## Lauko pridėjimas

1. Spustelėkite **Pridėti lauką**.
2. Atsidariusiame dešinėje redaktoriuje įveskite **Pavadinimą**. Tai etiketė, kurią darbuotojai matys asmenų profiliuose ir paieškoje (pavyzdžiui, *Fono patikra baigiasi*).
3. Pasirinkite **Lauko tipą**:
   - **Teksto laukas**: laisvas trumpas tekstas.
   - **Sveikasis skaičius**: skaičiai be kablelio (pavyzdžiui, kiekis).
   - **Dešimtainis skaičius**: skaičiai, kuriuose gali būti dešimtainių trupmenų.
   - **Data**: kalendoriaus data.
   - **Taip / Ne**: paprastas atsakymas taip arba ne.
   - **Kelių pasirinkimų**: pasirinkimų sąrašas. Pasirinkus šį tipą atsiranda **pasirinkimų redaktorius**, kuriame galite pridėti kiekvieną parinktį, kurią žmonės gali pasirinkti.
4. Spustelėkite **Išsaugoti**.

Laukas dabar pasiekiamas kiekvieno asmens profilyje.

:::info
Lauko tipai yra tie patys, kurie naudojami [formų klausimams](../forms/creating-forms.md), todėl reikšmės visoje B1 elgiasi nuosekliai.
:::

## Lauko redagavimas

Spustelėkite bet kurią lauko eilutę sąraše, kad atidarytumėte ją redaktoriuje. Pakeiskite pavadinimą, tipą ar pasirinkimus ir spustelėkite **Išsaugoti**.

:::warning
Jei keičiate jau turinčio reikšmių lauko **Lauko tipą** (pavyzdžiui, iš Teksto į Datą), anksčiau įvestos reikšmės gali likti formatu, kuris nebeatitinka naujo tipo. Keiskite tipus atsargiai, kai darbuotojai jau pradėjo pildyti lauką.
:::

## Lauko šalinimas

Atidarykite lauką redagavimui ir spustelėkite **Ištrinti**. Būsite paprašyti patvirtinti: *„Ar tikrai norite ištrinti šį pasirinktinį lauką? Jo saugomos reikšmės taip pat bus pašalintos."* Lauko ištrynimas visam laikui pašalina jį **ir visas jam saugomas reikšmes** visų asmenų įrašuose. To atšaukti negalima.

## Reikšmių įvedimas asmeniui

Kai yra bent vienas pasirinktinis laukas, jo reikšmės rodomos kiekvieno asmens įraše šalia įmontuotos informacijos. Jas matote su asmens kontaktine informacija profilio kairėje, o redaguojate tame pačiame formos lange, kurį naudojate likusiai asmens informacijai. Kol neapibrėžėte pirmojo lauko, nieko papildomo nematote.

1. Atidarykite asmens įrašą skiltyje **Asmenys**.
2. Spustelėkite profilio kairėje, po asmens kontaktine informacija, esantį mygtuką **Redaguoti**.
3. Slinkite iki srities **Pasirinktiniai laukai** redagavimo formos apačioje ir įveskite reikšmę kiekvienam laukui. Kiekvienas laukas rodo įvesties valdiklį, atitinkantį jo tipą: datos rinkiklį Datos laukams, taip / ne išskleidžiamąjį sąrašą Taip / Ne laukams, pasirinkimų sąrašą Kelių pasirinkimų laukams ir pan.
4. Spustelėkite **Išsaugoti**. Pasirinktinių laukų reikšmės išsaugomos kartu su kitais asmens duomenimis.

Grįžę į profilį, bet kuris laukas su reikšme dabar rodomas po asmens kontaktine informacija kaip *Lauko pavadinimas: reikšmė* (Taip / Ne atsakymai rodomi kaip *Taip* arba *Ne*, o Kelių pasirinkimų lauke rodoma parinkties etiketė). Tušti laukai tiesiog paslepiami. Norėdami pašalinti reikšmę, redaguokite asmenį, išvalykite lauką ir išsaugokite. Tuščia reikšmė pašalinama iš įrašo, o ne saugoma kaip tuščia.

:::tip
Klasikinis naudojimo atvejis yra savanorių saugumas: sukurkite **Datos** lauką pavadinimu *Fono patikra baigiasi*, įrašykite kiekvieno savanorio datą, tada sukurkite [išsaugotą sąrašą](../people/lists.md), kuris pažymi asmenis, kurių data jau praėjo.
:::

## Paieška ir sąrašų kūrimas pagal pasirinktinius laukus

Pagal pasirinktinius laukus galima ieškoti visapusiškai:

1. Puslapyje **Asmenys** atidarykite [Išplėstinę paiešką](../people/searching-people.md).
2. Išskleiskite kategoriją **Pasirinktiniai laukai**.
3. Pažymėkite lauką, pagal kurį norite filtruoti, pasirinkite operatorių ir įveskite reikšmę. Siūlomi operatoriai priklauso nuo lauko tipo:
   - **Teksto laukas**: yra, lygu, prasideda su, baigiasi su.
   - **Sveikasis / dešimtainis skaičius**: lygu, didesnis, didesnis arba lygu, mažesnis, mažesnis arba lygu.
   - **Data**: lygu, po (vėliau nei), prieš (anksčiau nei).
   - **Taip / Ne**: lygu Taip arba Ne.
   - **Kelių pasirinkimų**: lygu vienam iš pasirinkimų arba apima jį.

Bet kurią paiešką pagal pasirinktinį lauką galite išsaugoti kaip [sąrašą](../people/lists.md). Sąrašai yra tiesioginės užklausos, todėl sąrašas, sukurtas pagal *Fono patikra baigiasi yra prieš šiandien*, kiekvieną kartą jį atidarant iš naujo patikrina kiekvieną asmenį. Rankinės priežiūros nereikia.

## Pasirinktinio lauko rodymas kaip stulpelio

Norėdami iš karto pamatyti lauko reikšmes visiems, pridėkite jį kaip stulpelį puslapyje **Asmenys**. Perjunkite **Rodyti kaip** į **Lentelė**, puslapio antraštėje spustelėkite **Pasirinkti stulpelius** piktogramą, perjunkite į skirtuką **Pasirinktiniai** ir pažymėkite lauką. Kiekvieno asmens reikšmė atsiras atskirame stulpelyje šalia įmontuotųjų. Žr. [Pasirinktinių laukų rodymas kaip stulpelių](../people/searching-people.md#showing-custom-fields-as-columns).

## Ką daro sujungimas

Kai [sujungiate du asmenų įrašus](../people/adding-people.md), pasirinktinių laukų reikšmės perkeliamos automatiškai. Išsaugomas asmuo išlaiko savo reikšmes. Kiekvienam laukui, kuriame reikšmę turėjo tik pašalintas asmuo, ta reikšmė nukopijuojama, kad nieko nepraraustumėte.

## Susiję straipsniai

- [Asmenų paieška](../people/searching-people.md): išplėstinė paieška, įskaitant kategoriją Pasirinktiniai laukai, ir pasirinktinių laukų rodymas kaip stulpelių
- [Išsaugoti sąrašai](../people/lists.md): išsaugokite pasirinktinių laukų paiešką ir paleiskite ją iš naujo tiesiogiai
- [Vaidmenys ir leidimai](./roles-permissions.md): kas gali apibrėžti laukus ir redaguoti reikšmes
- [Formų kūrimas](../forms/creating-forms.md): daugiaklausimių duomenų rinkimui, kai pilna forma tinka geriau nei atskiri laukai
