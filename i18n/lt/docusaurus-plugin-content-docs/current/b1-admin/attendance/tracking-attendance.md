---
title: "Lankomumo sekimas"
---

# Lankomumo sekimas

<div class="article-intro">

Kai bus sukonfigūruoti jūsų filialai, pamaldų laikai ir grupės, B1 Admin leidžia lengvai peržiūrėti lankomumo duomenis ir pastebėti tendencijas. Lankomumo puslapis atsidaro su šios savaitės lankomumo santrauka, o jo **All years** ataskaitos siūlo du pagrindinius rodinius: **Attendance Trend** skirtuką bažnyčios mastu matomoms tendencijoms ir **Group Attendance** skirtuką grupių lygmens išsamiai informacijai. Šiais įrankiais galite suprasti augimo modelius, nustatyti mažėjantį įsitraukimą ir priimti į duomenis pagrįstus sprendimus savo bažnyčiai.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jūsų lankomumo struktūra turi būti nustatyta bent su vienu filialu ir pamaldų laiku. Jei dar to nepadarėte, žr. [Lankomumo nustatymai](setup.md).
- Prieš ataskaitoms rodant rezultatus, reikia užregistruoti lankomumo duomenis. Duomenys gali būti įvedami [rankiniu būdu](recording-attendance.md) arba [savitarnos registracija](check-in.md).

</div>

## Lankomumo tendencijų peržiūra

1. Atidarykite **B1 Admin**, atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršutiniame kairiajame kampe), išskleiskite **People** ir spustelėkite **Attendance**.
2. Kairiajame stulpelyje spustelėkite **All years**. Numatytai pasirinktas **Attendance Trend** skirtukas.
3. Ataskaita paleidžiama automatiškai atidarius skirtuką ir rodo bendrą lankomumą kiekvienai savaitei.

:::tip
Norėdami greitai peržiūrėti einamąją savaitę, pagrindiniame Attendance puslapyje matote, kiek žmonių yra patalpoje šią savaitę, suskirstymą pagal kambarį (grupę), svečių skaičių ir 13 savaičių stulpelinę registracijų diagramą. Ataskaitos nereikia.
:::

## Duomenų filtravimas

Naudokite filtrus lauke **Filter Report**, kad susiaurintumėte rezultatus, tada spustelėkite **Run Report**:

- **Campus** – pasirinkite filialą, kad matytumėte lankomumą tik toje vietoje.
- **Service** – apribokite ataskaitą viena pamaldų tvarka.
- **Service Time** – pasirinkite pamaldų laiką, kad išsamiai peržiūrėtumėte konkretų susibūrimą.
- **Group** – rodykite vienos grupės lankomumą.
- **Start Date** ir **End Date** – datų intervalas, įtraukiamas į ataskaitą. Numatytai ataskaita apima praėjusius metus, nuo prieš vienerius metus iki šiandienos, o pabaigos data įtraukiama visa.

Ataskaitoje rodoma stulpelinė diagrama ir lentelė su bendru apsilankymų skaičiumi per savaitę. Kiekviena savaitė pažymėta tos savaitės sekmadienio data. Lentelėje taip pat yra stulpelis **Session Dates**, kuriame išvardytos tikrosios tos savaitės datos, kurioms buvo lankomumo (pavyzdžiui, „9/27, 9/30“). Taip matote, kada vidursavaitės susibūrimas įskaičiuojamas į tą pačią savaitę kaip sekmadienis.

:::info
Ataskaitos automatiškai paleidžiamos kiekvieną kartą atidarius Attendance Trend skirtuką, todėl visada matysite naujausius skaičius be atskiro atnaujinimo mygtuko paspaudimo.
:::

## Grupių lankomumas

Skirtukas **Group Attendance** rodo, kas dalyvavo kiekviename grupės susitikime. Tai naudinga, kai norite stebėti konkrečią klasę, tarnystės komandą ar mažąją grupę, o ne bendrus pamaldų skaičius.

1. Ataskaitose **All years** pasirinkite skirtuką **Group Attendance**.
2. Pasirinktinai pasirinkite **Campus** ir **Service**.
3. Nustatykite **Start Date** ir **End Date**. Numatytai ataskaita apima laikotarpį nuo paskutinio sekmadienio iki šiandienos.
4. Spustelėkite **Run Report**.

Rezultatai sugrupuojami pagal susitikimo datą, o tada pagal pamaldų laiką ir grupę. Po kiekviena grupe išvardyti dalyvavę žmonės. Pamaldų laikai, grupės ir vardai surikiuoti abėcėlės tvarka, todėl kiekviena antraštė rodoma tik vieną kartą. Kiekvieno asmens eilutėje taip pat rodomas stulpelis **Checked In** su laiku, kada buvo užregistruotas lankomumas (tuščias, jei laikas neįrašytas), ir stulpelis **Membership Status** (pavyzdžiui, Member arba Visitor), kad galėtumėte iš karto pastebėti svečius.

Norėdami atsisiųsti duomenis, spustelėkite **Download Options** ir pasirinkite **Summary**. CSV faile yra po vieną eilutę kiekvienam grupės nariui, surikiuotą pagal grupę ir vardą, bei po stulpelį kiekvienam datuotam susitikimui intervale (pavyzdžiui, „Sunday - 9:00 AM (2026-09-27)“), pažymėtą **present** arba **absent**.

:::tip
Grupių lankomumas ypač vertingas [mažųjų grupių](../groups/creating-groups.md) vadovams, norintiems laikui bėgant sekti savo grupės įsitraukimą.
:::

## Lankomumo duomenų naudojimo patarimai

- Peržiūrėkite tendencijas kas mėnesį, kad laiku pastebėtumėte sezoninius modelius.
- Palyginkite filialų lygmens duomenis, kad suprastumėte, kurios vietos auga.
- Naudokite grupių lygmens ataskaitas, kad susisiektumėte su [grupėmis](../groups/group-members.md), kuriose lankomumas mažėja.
- Derinkite lankomumo įžvalgas su [AI Search](../people/ai-search.md) įrankiu, kad rastumėte žmones, kurie neseniai nelankė bažnyčios.

## Susiję puslapiai

- [Lankomumo registravimas](recording-attendance.md) – rankiniu būdu įvesti lankomumą grupės susitikimui
- [Dalyvių skaičiaus įvedimas ir tendencija](headcount-entry.md) – paprastesnė bendro skaičiaus alternatyva su savo savaitine tendencijos diagrama
- [Registracija](check-in.md) – nustatyti savitarnos registraciją, kad lankomumas būtų registruojamas automatiškai
