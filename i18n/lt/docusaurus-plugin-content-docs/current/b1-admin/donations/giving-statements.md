---
title: "Aukų pažymos"
description: "Sukurkite metines aukų pažymas visiems aukotojams B1 Admin ir atsisiųskite CSV failais arba atspausdinkite siuntimui su lengvatinėmis sumomis."
---

# Aukų pažymos

<div class="article-intro">

Kiekvienais metais jūsų aukotojams reikia santraukos apie jų mokesčiais atskaitomas aukas, kad jie galėtų ją laikyti savo įrašuose. B1 Admin leidžia lengvai sugeneruoti šias pažymas visiems aukotojams vienu metu, o tai sutaupo valandas rankinio darbo.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Patikrinkite, ar jūsų [fondai](funds.md) teisingai pažymėti kaip **Mokesčiais atskaitomi** – pažymose rodomos tik aukos į mokesčiais atskaitomus fondus
- Įsitikinkite, kad visos aukos yra [įrašytos](recording-donations.md), o visos internetinės operacijos yra [importuotos iš Stripe](stripe-import.md)

</div>

## Aukų pažymų atidarymas

1. **B1 Admin** programoje atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe) ir išskleiskite **Donations**.
2. Spustelėkite **Giving Statements**. Atsidaro puslapis **Batch Giving Statements**.

## Pažymų generavimas

1. Panelėje **Select Year** išskleidžiamajame sąraše pasirinkite **Year**. Galite pasirinkti einamuosius metus arba bet kuriuos iš penkerių ankstesnių metų.
2. Puslapis įkelia tik tų metų (nuo sausio 1 iki gruodžio 31 dienos) aukas, todėl jis atsidaro greitai, net jei jūsų bažnyčia turi daug metų aukų istoriją. Pasirinkus kitus metus, santrauka atnaujinama pagal tuos metus. Po metų pasirinkimu esanti panelė **Summary** rodo tų metų statistiką, įskaitant:
   - **Total Donors** – žmonių, kurie aukojo, skaičių
   - **Total Donations** – atskirų aukų įrašų skaičių
   - **Total Amount** – bendrą visų aukų sumą doleriais

## Pažymų atsisiuntimas

Panelė **Download Options** suteikia dvi galimybes pažymoms pasiekti aukotojus:

### Atsisiuntimas CSV failais

Skyriuje **Individual CSV Files** spustelėkite **Download ZIP**, kad atsisiųstumėte ZIP failą, kuriame yra atskiras CSV failas kiekvienam aukotojui. Tai naudinga, jei norite siųsti pažymas el. paštu atskirai arba importuoti jas į kitą sistemą.

### Visų pažymų spausdinimas

Skyriuje **Printable Statements** spustelėkite **Print All** (mygtuke nurodomas pažymų skaičius), kad naršyklėje atsidarytų spausdinimui skirtas visų aukotojų pasirinktų metų pažymų vaizdas. Iš ten naudokite naršyklės spausdinimo funkciją, kad siųstumėte jas į spausdintuvą. Kiekviena pažyma prasideda nauju puslapiu, todėl jas galima lengvai sulankstyti ir išsiųsti paštu, o pažymos surikiuotos pagal aukotojo pavardę, o po to pagal vardą.

Jei įkėlėte **Light Background Logo** skyriuje [Website > Appearance](../website/appearance.md), jis spausdinamas centre kiekvienos pažymos viršuje, virš pažymos pavadinimo. Tai taikoma tiek **Print All**, tiek vieno aukotojo pažymai, spausdinamai iš jo įrašo.

:::tip
Generuokite pažymas anksti sausį, kol įrašai dar šviežiai atmintyje. Prieš generuodami pažymas, dar kartą patikrinkite, ar jūsų fondai teisingai pažymėti kaip mokesčiais atskaitomi – įtraukiamos tik aukos į mokesčiais atskaitomus fondus.
:::

:::info
Aukų pažymose įtraukiamos tik aukos, priskirtos fondams, kuriems įjungtas nustatymas **Tax Deductible**. Jei fondas nepažymėtas kaip mokesčiais atskaitomas, jo aukos pažymoje nebus rodomos. Šį nustatymą galite tvarkyti puslapyje [Funds](funds.md).
:::

## Pažymų formatai Kanadai, Australijai ir Naujajai Zelandijai

Bažnyčios už Jungtinių Valstijų ribų gali perjungti pažymą į savo šalies oficialų kvitų formatą. Spustelėkite **Statement format** viršuje puslapyje Giving Statements (arba eikite į **Settings** ir atidarykite skyrių **Giving**), nustatykite **Statement Format** į **Canada**, **Australia** arba **New Zealand**, tada užpildykite atsiradusius laukus: savo registracijos numerį (CRA registracijos numerį, ABN arba NZ labdaros organizacijos registracijos numerį), savo organizacijos adresą, asmens, įgalioto pasirašyti kvitus, vardą ir, Kanados atveju, miestą, kuriame išduodami kvitai.

Tuomet pažymose pateikiamas mokesčių institucijos reikalaujamas tekstas (Kanadai – „Official Receipt for Income Tax Purposes“ su CRA nuoroda), kvito numeris formatu `YEAR-DONORID`, apmokestinamoji suma, skaičiuojama tik pagal mokesčiais atskaitomus fondus, ir atskira eilutė bet kokioms aukoms į nemokesčiais atskaitomus fondus. Aukotojai tą patį kvito bloką mato, kai spausdina savo pažymą iš B1.church.

## Ką nariai mato B1.church

Tas pats skyrius **Giving** kontroliuoja, ką nariai mato savo aukų puslapyje B1.church:

- **Member Giving History** nustato, kuriuos metus nariai gali matyti. Numatytoji reikšmė – **All years**. **Through 2025** (arba bet kurie kiti metai) riboja iki tų metų, todėl nariai negali peržiūrėti ar spausdinti vėlesnių metų, kol neleisite. Tai padeda palaukti su einamaisiais metais, kol baigiate taisymus ir grąžinimus. **Hidden** visiškai pašalina aukų istoriją, metines sumas ir pažymų spausdinimą. Nariai vis tiek gali aukoti.
- **Giving Note** – trumpas pranešimas, rodomas nario aukų puslapyje ir aukų istorijoje bei spausdinamas kiekvienos aukų pažymos apačioje, įskaitant pažymas, kurias spausdinate čia. Naudokite jį, pavyzdžiui, grąžinimo politikai aprašyti.

Šie nustatymai keičia tik tai, ką nariai mato. Vis tiek galite spausdinti bet kurių metų pažymas šiame puslapyje.

## Kiti žingsniai

Jei prieš generuodami pažymas norite peržiūrėti aukų informaciją, apsilankykite puslapyje [Donation Reports](donation-reports.md) arba patikrinkite atskiras [partijas](batches.md).
