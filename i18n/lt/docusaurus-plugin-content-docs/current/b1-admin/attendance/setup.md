---
title: "Lankomumo sąranka"
---

# Lankomumo sąranka

<div class="article-intro">

Prieš pradedant sekti lankomumą, B1 Admin reikia nurodyti jūsų bažnyčios fizines vietas, pamaldų laikus ir tai, kurios grupės susirenka kiekvienose pamaldose. Ši vienkartinė sąranka sukuria struktūrą, kuri užtikrina visą lankomumo sekimą ir ataskaitas jūsų bažnyčioje.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="LQPc2gVlXvQ" title="Pamaldų ir lankomumo nustatymas B1 programoje" next="Vaikų registracijos nustatymas B1 programoje" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia aktyvios B1 Admin paskyros su lankomumo leidimu **Redaguoti pamaldas**. Parinktis **Sąranka** rodoma tik žmonėms, kurie tokį leidimą turi; vien lankomumo peržiūros nepakanka. Jei nesate tikri dėl savo prieigos lygio, žr. [Vaidmenys ir leidimai](../people/roles-permissions.md).
- Jei planuojate priskirti grupes pamaldų laikams, pirmiausia įsitikinkite, kad [grupės sukurtos](../groups/creating-groups.md).

</div>

## Pagrindinės sąvokos

- **Filialas** -- fizinė vieta, kurioje jūsų bažnyčia renkasi (pvz., „Pagrindinis filialas“, „Šiaurinis filialas“). Filialai tvarkomi skiltyje **Nustatymai**.
- **Pamaldos** -- pasikartojantis susirinkimas filiale (pvz., „Sekmadienio pamaldos“, „Vidursavaitė“).
- **Pamaldų laikas** -- konkretus laikas, kada vyksta pamaldos (pvz., „9:00“, „11:00“).
- **Suplanuota grupė** -- grupė, priskirta konkrečiam pamaldų laikui. Lankomumas sekamas atsižvelgiant į tas pamaldas.
- **Neplanuota grupė** -- grupė, kuri seka lankomumą savarankiškai, nesusieta su pamaldų laiku.

## Lankomumo struktūros nustatymas

1. Atidarykite **B1 Admin**, atidarykite [Greitojo šuolio meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršutiniame kairiajame kampe) ir išskleiskite **Žmonės**.
2. Spustelėkite **Lankomumas**, tada kairiajame stulpelyje spustelėkite **Sąranka**. Atsidaro lentelė **Pamaldų struktūra**, o viršuje rodomas jūsų filialų, pamaldų laikų bei suplanuotų ir neplanuotų grupių skaičius. Skaičiai atsinaujina iš karto, kai lentelėje ką nors pridedate, redaguojate ar pašalinate.
3. Spustelėkite **Tvarkyti filialus** (viršutiniame dešiniajame **Pamaldų struktūros** skydelio kampe). Tai nukreips jus į **Nustatymai → Filialai**. Spustelėkite **Pridėti filialą**, įveskite savo vietos pavadinimą (adresas ir laiko juosta neprivalomi) ir spustelėkite **Išsaugoti**.
4. Grįžkite į **Žmonės → Lankomumas** ir spustelėkite **Sąranka**. Jūsų filialas dabar rodomas sąrankos lentelėje.
5. Spustelėkite **+ mygtuką stulpelyje Pamaldos** po savo filialu. Įveskite pamaldų pavadinimą, pavyzdžiui, „Sekmadienio pamaldos“, ir spustelėkite **Išsaugoti**.
6. Spustelėkite **+ mygtuką stulpelyje Laikas** po pamaldomis. Įveskite **pamaldų laiko** pavadinimą, pavyzdžiui, „9:00“, neprivalomai užpildykite [registracijos tvarkaraštį](#registracijos-tvarkaraščio-nustatymas) ir spustelėkite **Išsaugoti**. Pakartokite kiekvienam pamaldų laikui.
7. Norėdami susieti grupę su pamaldų laiku, atidarykite grupę iš **Žmonės > Grupės**, spustelėkite **Redaguoti** ir naudokite **Pridėti pamaldų laiką** -- žr. kitą skyrių.

### Lankomumo sekimo įjungimas grupei

Kad grupei būtų galima įrašyti lankomumą, jai turi būti įjungta **Sekti lankomumą**.

1. Greitojo šuolio meniu pasirinkite **Žmonės > Grupės** ir pažymėkite grupę.
2. Spustelėkite mygtuką **Redaguoti**, esantį po grupės pavadinimu.
3. Nustatykite **Sekti lankomumą** į **Taip**.
4. Spustelėkite **Išsaugoti**.

:::tip
Jei ankstesniame žingsnyje grupę priskyrėte pamaldų laikui, grupės redagavimo ekrane taip pat naudokite **Pridėti pamaldų laiką**, kad ją susietumėte su tinkamomis pamaldomis. Tai užtikrina, kad susirinkimai būtų susieti su teisingu filialu ir laiku.
:::

:::tip
Jei grupė renkasi ne per įprastas pamaldas -- pavyzdžiui, vidursavaitės mažoji grupė, kuri seka savo lankomumą --, galite palikti ją kaip neplanuotą grupę. Ji vis tiek bus rodoma **Grupių lankomumo** ataskaitoje.
:::

## Registracijos tvarkaraščio nustatymas

Kiekvienam pamaldų laikui galima nustatyti neprivalomą registracijos tvarkaraštį, kad [savarankiška registracija](check-in.md) kiekvieną savaitę atsidarytų ir užsidarytų automatiškai. Be tvarkaraščio registracija tam pamaldų laikui visada prieinama (jei kambarys nėra uždarytas dėl kitų priežasčių, pavyzdžiui, yra pilnas).

1. Sąrankos rodinyje spustelėkite pamaldų laiko pavadinimą **Laiko** stulpelyje (arba pridėkite naują).
2. Skiltyje **Registracijos tvarkaraštis** pasirinkite savaitės **Dieną**, kada vyksta pamaldų laikas.
3. Nustatykite **Pradžios laiką** ir, neprivalomai, **Pabaigos laiką**.
4. Įveskite **Atverti registraciją (minučių prieš pradžią)** -- pavyzdžiui, `30` atvers registraciją pusvalandį prieš pamaldų pradžią.
5. Įveskite **Uždaryti registraciją (minučių po pabaigos)** -- pavyzdžiui, `15` palaiks registraciją atvirą 15 minučių po pabaigos laiko. Jei pabaigos laiko nenustatėte, skaičiuojama nuo pradžios laiko. Jei palikote tuščius ir **Pabaigos laiką**, ir **Uždaryti registraciją**, registracija lieka atvira iki tos dienos pabaigos.
6. Spustelėkite **Išsaugoti**.

Tvarkaraštis kartojasi kas savaitę ir matuojamas pamaldų filialo laiko juostoje. Jei filialas neturi laiko juostos, naudojama jūsų bažnyčios [laiko juosta](../settings/church-settings.md#time-zone), tada laiko juosta pirmojo filialo, kuris ją turi, o galiausiai -- Rytų laikas (America/New_York). Jei registracija atsidaro ne tuo metu, patikrinkite filialo **Laiko juostą** skiltyje [Filialai](../settings/campuses.md). Norėdami pašalinti tvarkaraštį, nustatykite **Diena** atgal į **Be tvarkaraščio** ir spustelėkite **Išsaugoti**. Tvarkaraštis įsigalioja tik tada, kai nustatytos ir **Diena**, ir **Pradžios laikas**.

Kai pamaldų laiko registracijos langas uždarytas:

- **Savarankiška registracija B1.church** tam pamaldų laikui rodo būseną **Uždaryta** (arba, pavyzdžiui, **Uždaryta · atsidaro sek. 9:30**), ir jo negalima pasirinkti. Jei visi pamaldų laikai uždaryti, šeimos mato, kada atsidarys registracija, pavyzdžiui: „Registracija atsidaro sekmadienį 9:30“.
- **B1 Checkin kioskų programa** taip pat rodo pamaldų laiką kaip **Uždaryta** ir nurodo, kada jis atsidarys. Jei visi pamaldų laikai uždaryti, kioskas parodo, kada atsidarys registracija tai pamaldoms. Asmuo, jau užregistruotas į uždarytą pamaldų laiką, vietoj to matys savo grupę su būsena **Užregistruota**. Jei langas užsidaro registracijos proceso metu, kioskas jos nebaigs ir parodys ekraną **Dar negalima registruotis**, kuriame nurodytas paveiktas kambarys, kad šeima galėtų pasirinkti kitą.

Šeima, jau užsiregistravusi ankstesniam pamaldų laikui, gali grįžti ir pridėti vėlesnį atvirą pamaldų laiką net tada, kai ankstesnis langas jau uždarytas. Jų esamos registracijos išlieka.

:::tip
Nustatykite pakankamai platų atvirą langą (pavyzdžiui, 45 minutes prieš pradžią), kad anksti atvykstančios šeimos ir savanoriai galėtų užsiregistruoti, ir trumpą uždarymo langą, kad vėluojantys galėtų užsiregistruoti jau prasidėjus pamaldoms.
:::

## Sąrankos redagavimas

Savo sąranką galite atnaujinti bet kada. Pasirinkite filialą, pamaldų laiką ar grupę ir spustelėkite **Redaguoti**, kad pakeistumėte jos duomenis, arba **Ištrinti**, kad ją pašalintumėte.

:::info
Pamaldų laiko pašalinimas neištrina ankstesnių lankomumo įrašų. Jūsų istoriniai duomenys išsaugomi, net jei pakeičiate tvarkaraštį.
:::

## Kas toliau

Kai jūsų filialai, pamaldų laikai ir grupės bus nustatyti, galėsite pradėti [įrašyti lankomumą](recording-attendance.md) rankiniu būdu arba nustatyti [savarankišką registraciją](check-in.md) savo pamaldoms.
