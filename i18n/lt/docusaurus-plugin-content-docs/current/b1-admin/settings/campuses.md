---
title: "Filialai"
description: "Nustatykite B1 Admin filialus, kad žinotumėte, kuriam objektui priklauso kiekvienas asmuo ir grupė, ir filtruotumėte pagal vietą."
---

# Filialai

<div class="article-intro">

Jei jūsų bažnyčia renkasi daugiau nei vienoje vietoje, **Filialai** leidžia sekti, kuriam objektui priklauso kiekvienas asmuo ir grupė. Juos nustačius, filialai atsiranda asmenų profilių, lankomumo nustatymų ir Demografijos suvestinės parinktyse. Kelių vietų bažnyčios visame B1 Admin gali filtruoti, ieškoti ir kurti ataskaitas pagal filialą.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Filialams valdyti jums reikia leidimo **Redaguoti bažnyčios nustatymus**. Žr. [Vaidmenys ir leidimai](./roles-permissions.md).

</div>

## Filialų nustatymų atidarymas

B1 Admin programoje atidarykite [Šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juostą viršutiniame kairiajame kampe), pasirinkite **Nustatymai > Nustatymai** ir kairiajame sąraše spustelėkite **Filialai**, kad perslinktumėte į skyrių **Filialai**. Taip pat galite tiesiogiai atidaryti adresu **/settings/campuses**. Pamatysite visų sukonfigūruotų filialų sąrašą su jų pavadinimais, vietomis ir laiko juostomis.

## Filialo pridėjimas

1. Spustelėkite **Pridėti filialą**.
2. Užpildykite filialo duomenis:
   - **Pavadinimas** *(privalomas)* — rodomas pavadinimas, matomas visame B1 Admin (pavyzdžiui, „Pagrindinis filialas“ arba „Šiaurės filialas“).
   - **Adresas** — filialo gatvės adresas (naudojamas tik informacijai rodyti; nesutampa su pagrindiniu bažnyčios adresu bažnyčios nustatymuose).
   - **Miestas / Valstija / Pašto kodas** — filialo vieta.
   - **Laiko juosta** — šio filialo IANA laiko juosta (pavyzdžiui, *America/Chicago*). [Registracijos tvarkaraščiai](../attendance/setup.md#setting-a-check-in-schedule) šio filialo pamaldoms atsidaro ir užsidaro pagal šią laiko juostą. Jei nustatyta **Nėra**, vietoj jos naudojama jūsų bažnyčios [Laiko juosta](./church-settings.md#time-zone). Naudinga, kai filialai yra skirtingose laiko juostose.
   - **Svetainė** — nebūtinas šio filialo interneto svetainės adresas.
3. Spustelėkite **Išsaugoti**.

## Filialo redagavimas

Spustelėkite bet kurią filialo eilutę sąraše, kad atidarytumėte jo redaktorių dešinėje esančiame skydelyje. Atnaujinkite laukus ir spustelėkite **Išsaugoti**.

## Filialo ištrynimas

Atidarykite filialą redagavimui ir spustelėkite **Ištrinti**. Būsite paprašyti patvirtinti. Ištrynus filialą, žmonės, priskirti prie jo, nepašalinami — jų filialo laukas tiesiog tampa tuščias.

## Asmenų priskyrimas filialui

Sukūrus filialus, darbuotojai gali priskirti asmenį filialui iš jo profilio:

1. Atidarykite asmens įrašą skyriuje **Žmonės**.
2. Spustelėkite **Redaguoti**.
3. Išskleidžiamajame sąraše **Filialas** pasirinkite filialą.
4. Spustelėkite **Išsaugoti**.

Filialą taip pat galite atnaujinti masiškai žmonių puslapyje. Pažymėkite kelis asmenis, naudokite **Masinis redagavimas** ir visiems iš karto nustatykite lauką Filialas.

## Filtravimas pagal filialą

Nustačius filialus, visame B1 Admin galite filtruoti pagal filialą:

- **Žmonių paieška** — išplėstinėje paieškoje pridėkite sąlygą Filialas arba įkelkite [išsaugotą sąrašą](../people/lists.md), apribotą pagal filialą.
- **Demografija** — [Demografijos suvestinėje](../people/demographics.md) rodoma filialo skritulinė diagrama, kai bent vienam asmeniui priskirtas filialas.
- **Lankomumo nustatymai** — kiekvieną lankomumo pamaldų laiką galima susieti su filialu.

:::tip
Bažnyčioms su viena vieta filialų konfigūruoti nereikia. Visos filialų funkcijos yra neprivalomos — jei filialų nėra, filialų laukai ir diagramos tiesiog nerodomos.
:::

## Susiję straipsniai

- [Bažnyčios nustatymai](./church-settings.md) — jūsų pagrindinis bažnyčios adresas ir prekės ženklas (atskirai nuo filialų adresų)
- [Demografija](../people/demographics.md) — filialų pasiskirstymo diagrama
- [Lankomumo nustatymai](../attendance/setup.md) — susieti pamaldų laikus su filialu
- [Masinis redagavimas](../people/bulk-editing.md) — priskirti filialą daugeliui žmonių vienu metu
