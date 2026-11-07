---
title: "Vaidmenys ir leidimai"
---

# Vaidmenys ir leidimai

<div class="article-intro">

Vaidmenys leidžia valdyti, prie ko skirtingi naudotojai gali prieiti jūsų ChurchApps paskyroje. Galite kurti individualius vaidmenis darbuotojams, savanoriams ir kitiems komandos nariams, kiekvienam su savo prieigos lygiu, kad jūsų duomenys būtų saugūs.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="ZzCIkinVMnE" title="Vaidmenys, leidimai ir komandos kvietimas B1 sistemoje" next="Paslaugų ir lankomumo nustatymas B1 sistemoje" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia Domain Admin prieigos arba vaidmens, kuris leidžia valdyti vaidmenis
- Turėkite komandos narių sąrašą ir sričių, prie kurių jiems reikia prieigos, sąrašą
- Peržiūrėkite toliau pateiktas leidimų kategorijas, kad suplanuotumėte vaidmenis

</div>

## Vaidmenų pasiekimas

1. B1 Admin sistemoje atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje) ir išskleiskite **Nustatymai**.
2. Spustelėkite **Vaidmenys**.
3. Vaidmenų puslapyje rodomi visi jūsų bažnyčiai apibrėžti vaidmenys. Stulpelyje **Nariai** nurodoma, kiek naudotojų yra kiekviename vaidmenyje, o eilutėje **(Visi)** rodoma **Visi naudotojai**.

## Vaidmenų puslapio apžvalga

Vaidmenų puslapis suskirstytas į dvi sritis:

- **Kairė pusė** -- rodomas pasirinktam vaidmeniui priskirtų narių sąrašas.
- **Dešinė pusė** -- rodomi leidimų nustatymai, kuriuos galite sukonfigūruoti tam vaidmeniui.

Spustelėkite bet kurį vaidmens pavadinimą, kad peržiūrėtumėte ir tvarkytumėte jo narius bei leidimus.

## Naudotojų pridėjimas į vaidmenį

1. Pasirinkite vaidmenį, į kurį norite pridėti narių.
2. Naudokite kairėje esantį **paieškos lauką**, kad rastumėte asmenį, kurį norite pridėti.
3. Pasirinkite asmenį iš paieškos rezultatų.
4. Jis bus nedelsiant pridėtas į vaidmenį.

## Naudotojų pašalinimas iš vaidmens

1. Pasirinkite vaidmenį, kuriame yra naudotojas, kurį norite pašalinti.
2. Kairėje esančiame narių sąraše raskite asmenį.
3. Spustelėkite **pašalinimo mygtuką** šalia jo vardo.

## Leidimų konfigūravimas

Kiekvienam vaidmeniui galima suteikti prieigą prie konkrečių B1 Admin sričių. **Edit Permissions** skydelyje leidimai sugrupuoti į skyrius, kuriuos galite išskleisti, pavyzdžiui, **Lankomumas**, **Turinys**, **Aukojimai**, **Formos ir planai**, **Pamokos**, **Žinutės**, **Asmenys ir grupės** ir **Užduotys**. Įveskite į laukelį **Filter permissions**, kad būtų rodomi tik atitinkami leidimai.

Pažymėkite arba panaikinkite žymėjimą, kad vaidmeniui suteiktumėte arba panaikintumėte leidimą. Kiekvienos skilties antraštėje rodoma, kiek leidimų turi vaidmuo, pavyzdžiui, **2 iš 5**, ir šis skaičius atnaujinamas, kai žymite ar nuimate žymę nuo langelių.

### Aukojimų leidimai

Skiltyje **Aukojimai** yra šie leidimai:

- **View Donation Summaries** -- matyti Aukojimų skiltį, įskaitant puslapius **Santrauka**, **Partijos**, **Fondai**, **Kampanijos** ir **Aukojimų išrašai**.
- **View Donations** -- matyti atskiras aukas, pavyzdžiui, dovanas, esančias partijoje.
- **Edit Donations** -- pilna kontrolė: pridėti, redaguoti ir šalinti aukas bei partijas, [uždaryti ir iš naujo atidaryti partijas](../donations/batches.md#closing-and-reopening-a-batch).
- **Enter Donations** -- pridėti partijas ir įvesti, redaguoti arba šalinti aukas, tačiau tik partijose, kurios vis dar atviros. Naudotojai, turintys tik šį leidimą, negali šalinti partijų, jų uždaryti ar iš naujo atidaryti, taip pat keisti aukų, gautų per internetinį aukojimą.
- **Edit Settings** -- tvarkyti aukojimo nustatymus.

Naudotojas, turintis **Enter Donations**, bet neturintis **View Donation Summaries**, mato tik **Partijos** puslapį skiltyje **Aukojimai**. Skaičiavimo komandai suteikite ir **Enter Donations**, ir **View Donations** vaidmenį, kad jie galėtų atidaryti partiją ir matyti įvestas aukas. Išsamiau žr. [Kas gali keisti partiją](../donations/batches.md#who-can-change-a-batch).

### Tik vardų peržiūra

Skiltyje **Asmenys ir grupės** yra leidimas **View People Names Only**. Jį naudokite savanoriams, kuriems reikia ieškoti žmonių pagal vardą, pavyzdžiui, pasirinkti asmenį paieškos laukelyje, be prieigos prie viso katalogo. Turint tik šį leidimą, asmuo:

- Gali ieškoti žmonių pagal vardą ir matyti neseniai pridėtų žmonių sąrašą, tačiau mato tik kiekvieno asmens vardą, nuotrauką ir narystės statusą
- Negali ieškoti pagal el. paštą, matyti kontaktinės informacijos ar atidaryti **Asmenų** katalogo

Porinkite **View People Names Only** su **View Attendance** arba **Edit Attendance** savanoriams, kurie žymi klasių lankomumą. Tada jų meniu **Asmenys** atveria **Grupes**, kur jie gali atidaryti sąrašą **Visos grupės** ir matyti kiekvienos klasės narių vardus bei susitikimus. Su **Edit Attendance** jie taip pat gali [įrašyti lankomumą](../attendance/recording-attendance.md) ir pridėti svečių ieškodami jų vardų. Vardai nėra nuorodos į asmenų įrašus, o konfidencialios grupės lieka paslėptos, nebent savanoris yra narys.

B1 Admin slepia nuorodas ir mygtukus, kuriems reikia leidimų, kurių vaidmuo neturi. Pavyzdžiui, sąrašas **Visos grupės** prieinamas tik asmenims, kurie gali redaguoti grupes, peržiūrėti grupių narius ar asmenis, arba turintiems **View People Names Only** kartu su **View Attendance** arba **Edit Attendance** (kiti nukreipiami atgal į pradžios puslapį). Lankomumo nustatymai rodomi tik su **Edit Services**. Grupės mygtukas **El. paštas** rodomas tik asmenims su **Edit Group Members** (leidimas, reikalingas grupės el. laiškams siųsti). Grupės dalyvių sąrašo spausdinimui reikia **View Group Members** arba būti tos grupės vadovu. Kalendoriaus įvykio ištrynimui reikia **Edit Content** (arba savo laukiančios užklausos atšaukimo).

### Kiosko paskyros

Paskyra, kuri prisijungia prie [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) kiosko, turi turėti **Checkin** leidimą skiltyje **Lankomumas** (arba **Edit Attendance**). Turint vien **Checkin**, kioskas gali ieškoti šeimų pagal vardą ar telefoną, registruoti jų atvykimą ir išvykimą bei rodyti, kas gali pasiimti vaiką, be prieigos prie Asmenų katalogo.

**Checkin** leidimas nebesuteikiamas per eilutę **(Visi)**. Būti vaidmenyje su kitais leidimais nereiškia, kad asmuo gali valdyti kiosko, todėl pridėkite **Checkin** prie vaidmens, pavyzdžiui, „Registracijos savanoriai“, ir įtraukite kiosko paskyras į jį.

:::warning
**Domain Admins** turi visišką prieigą prie visų jūsų ChurchApps paskyros sričių. Jų leidimų negalima keisti ar apriboti. Naudokite šį vaidmenį tik patikimiausiems administratoriams.
:::

:::tip
Kurkite konkrečius vaidmenis, pavyzdžiui, „Iždininkas“ su tik **Aukojimų** prieiga, „Skaičiavimo komanda“ su **Enter Donations** ir **View Donations**, arba „Registracijos savanoris“ tik su **Lankomumo** prieiga. Tai atitinka mažiausių privilegijų principą ir išlaiko jūsų duomenis saugius. Daugiau apie tai, kaip ChurchApps saugo jūsų informaciją, žr. [Duomenų sauga](./data-security.md).
:::
