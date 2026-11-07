---
title: "Duomenų eksportavimas"
description: "Eksportuokite asmenis į CSV, grupių narių sąrašus ar visą B1 duomenų bazės atsarginę kopiją iš B1 Admin ir sužinokite, kas yra B1 Export Zip archyve."
---

# Duomenų eksportavimas

<div class="article-intro">

B1 Admin leidžia eksportuoti bažnyčios duomenis, kad galėtumėte naudoti juos skaičiuoklėse, bendrinti su komanda arba išsaugoti atsarginę kopiją. Ar jums reikia greito vardų ir el. pašto adresų sąrašo, ar visos duomenų bazės eksporto, yra variantų, kurie atitiks jūsų poreikius.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia aktyvios B1 Admin paskyros su leidimu peržiūrėti duomenis, kuriuos norite eksportuoti. Jei nesate tikri dėl savo prieigos lygio, žr. [Vaidmenys ir leidimai](roles-permissions.md).
- Visos duomenų bazės eksportui jums reikia prieigos prie **Nustatymų** srities.

</div>

## Eksportavimas iš Žmonių puslapio

Greičiausias būdas eksportuoti katalogą yra tiesiogiai iš **Žmonių** puslapio:

1. Atidarykite [Greitojo perėjimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršutiniame kairiajame B1 Admin kampe), išskleiskite **Žmonės** ir spustelėkite **Žmonės**.
2. Naudokite paieškos lauką arba filtrus, kad susiaurintumėte rezultatus, kuriuos norite eksportuoti (arba palikite be filtrų, kad eksportuotumėte visus). Patarimų dėl filtravimo žr. [Žmonių paieška](searching-people.md).
3. Spustelėkite mygtuką **Eksportuoti** Žmonių puslapio antraštėje.
4. Į jūsų kompiuterį bus atsisiųstas CSV failas su šiuo metu jūsų rezultatuose esančiais asmenimis, įskaitant jų vardą, kontaktinę informaciją, adresą ir kitus standartinius laukus.

:::tip
Eksportas apima visus jūsų dabartinių rezultatų asmenis. Prieš eksportuodami pirmiausia atlikite paiešką, įkelkite [Išsaugotą sąrašą](./lists.md) arba naudokite **Išplėstinę** paiešką, kad eksportuotumėte tik jums reikalingus asmenis.
:::

## Visas duomenų eksportas iš nustatymų

Norėdami visiškai eksportuoti visus B1 duomenis (ne tik asmenis), naudokite eksporto įrankį Nustatymuose:

1. Greitojo perėjimo meniu pasirinkite **Nustatymai > Nustatymai**.
2. Spustelėkite **Importavimas/eksportavimas** nuorodą po jūsų bažnyčios pavadinimu kairiojo nustatymų meniu viršuje.
3. Išskleidžiamajame sąraše **Duomenų šaltinis** pasirinkite **B1 duomenų bazė**.
4. Peržiūrėkite duomenų peržiūrą ir spustelėkite **Tęsti į paskirties vietą**.
5. Kaip eksporto paskirties vietą pasirinkite **B1 Export Zip**.
6. Stebėkite eksporto eigą, kol visi elementai pažymėti žaliomis varnelėmis.
7. Eksporto failas bus automatiškai atsisiųstas. Ieškokite `B1Export` failo savo atsisiuntimų aplanke.
8. Išarchyvuokite failą, kad pasiektumėte atskirus CSV failus (pvz., `people.csv`), kuriuos galite atidaryti Excel, Google Sheets arba Numbers.

:::info
B1 Export Zip yra visa jūsų bažnyčios duomenų atsarginė kopija. Ji apima:

- asmenis (su nuotraukomis) ir namų ūkius, įskaitant namų ūkio paėmimo kontaktus
- filialus, pamaldas ir pamaldų laikus
- grupes ir grupių narius
- fondus ir aukas, įskaitant dovanas, paskirstytas keliems fondams
- lankomumą
- formas, klausimus, pateikimus ir atsakymus
- pasirinktinius laukus ir jų reikšmes
- išsaugotus asmenų sąrašus

Jei eksporto metu asmens nuotraukos nepavyko atsisiųsti ar perskaityti, ji praleidžiama, o eksportas tęsiamas be jos.

Norėdami ją atkurti, kaip šaltinį pasirinkite **B1 Import Zip**, o kaip paskirties vietą – **B1 duomenų bazė** (žr. [Duomenų importavimas](./importing-data.md)). Namų ūkiai, paėmimo kontaktai ir išsaugoti sąrašai atkuriami kartu su asmenimis. Išsaugotų sąrašų filtrai nukreipiami į atkurtas grupes, fondus, filialus ir pasirinktinius laukus.
:::

## Grupių duomenų eksportas

Taip pat galite eksportuoti atskirų grupių narių sąrašus. Iš **Grupių** puslapio atidarykite grupę ir spustelėkite **atsisiuntimo piktogramą**, kad eksportuotumėte tos grupės narių sąrašą. Daugiau informacijos žr. [Grupių nariai](../groups/group-members.md).

:::info
Eksportuoti CSV failai veikia su visomis pagrindinėmis skaičiuoklių programomis, įskaitant Microsoft Excel, Google Sheets ir Apple Numbers.
:::
