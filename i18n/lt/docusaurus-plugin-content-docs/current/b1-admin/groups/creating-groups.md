---
title: "Grupų kūrimas"
description: "Sukurkite naują grupę B1 Admin: nuo kategorijos ir pavadinimo iki prisijungimo taisyklių, žymų, žinučių ir lankomumo nustatymų."
---

# Grupų kūrimas

<div class="article-intro">

B1 Admin programoje grupės kurti paprasta. Nustatysite kategoriją, pavadinsite grupę, o tada sukonfigūruosite jos nustatymus. Grupės padeda organizuoti bendruomenę į prasmingus vienetus, pavyzdžiui, mažąsias grupes, komitetus ir klases.

</div>

## Mokomasis vaizdo įrašas

<YouTube id="uG93pXVreNo" title="Grupių kūrimas ir narių pridėjimas B1 programoje" next="Grupių prašymai prisijungti ir grupių kalendoriai B1 programoje" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikalinga aktyvi B1 Admin paskyra, turinti teisę valdyti grupes. Jei nesate tikri dėl savo prieigos lygio, žr. [Vaidmenys ir leidimai](../people/roles-permissions.md).
- Nuspręskite, kokia bus jūsų grupių kategorijų struktūra (pavyzdžiui, „Mažosios grupės“, „Tarnystės“, „Komitetai“). Kategorijos padeda išlaikyti susijusias grupes tvarkingas.

</div>

## Naujos grupės kūrimas

1. Atidarykite [Greito pereigos meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos laukas viršutiniame kairiajame B1 Admin kampe), išskleiskite **People** ir spustelėkite **Groups**.
2. Puslapio antraštėje spustelėkite **Add Group**. Po sąrašu atsidarys **New Group** forma. Įveskite **Category Name**. Kategorijos padeda susietas grupes sugrupuoti kartu (pavyzdžiui, „Mažosios grupės“, „Tarnystės“ ar „Komitetai“). Jei kategorija jau egzistuoja, galite ją pasirinkti iš sąrašo.
3. Įveskite grupės **Name**.
4. Spustelėkite **Add**. Nauja grupė atsiras sąraše, o jos kategorija bus rodoma po pavadinimu.

## Grupės nustatymų konfigūravimas

Kai grupė sukurta, galite įvesti papildomos informacijos:

1. Sąraše spustelėkite grupės **pavadinimą**, kad ją atidarytumėte.
2. Grupės puslapio kairėje, po grupės informacija, spustelėkite mygtuką **Edit**.
3. Sukonfigūruokite šiuos nustatymus:
   - **Description** -- Trumpas aprašymas, apie ką yra grupė. Tai matoma nariams.
   - **Meeting Times** -- Kada grupė paprastai renkasi (pavyzdžiui, „Trečiadieniais 19 val.“).
   - **Join Policy** -- Pasirinkite, kas gali prisijungti prie šios grupės:
     - **Open** -- Bet kas gali prisijungti iš karto, be patvirtinimo
     - **Request** -- Žmonės turi pateikti prašymą prisijungti, kurį reikia patvirtinti (žr. [Grupių prašymai prisijungti](./group-join-requests.md))
     - **Closed** -- Narius rankiniu būdu pridės vadovai ar administratoriai
   - **Labels** -- Priskirkite grupei vieną ar daugiau aprašomųjų etikečių (pavyzdžiui, „Gyvai“, „Internetu“, „Kviečiame naujus narius“). Etiketės yra jūsų pačių apibrėžti laisvi žymenys; pažymėkite visas tinkamas. Etiketes galima naudoti grupėms filtruoti Groups Browser svetainės elemente.
   - **Confidential group** -- Paslėpkite šią grupę ir jos narių sąrašą nuo viešų puslapių, grupių paieškos ir ne narių. Naudokite tai jautrioms grupėms, pavyzdžiui, priklausomybių įveikimo ar konsultavimo tarnystėms; ją matyti gali tik grupės nariai ir bažnyčios darbuotojai.
   - **Discussions** -- Įjungia arba išjungia grupės pokalbių srautą, kuriame bet kuris narys gali rašyti. Pagal numatytuosius nustatymus įjungta.
   - **Announcements** -- Įjungia antrą, tik vadovams skirtą pokalbių srautą -- nariai gali skaityti ir reaguoti, bet rašyti gali tik vadovai. Pagal numatytuosius nustatymus įjungta.
   - **Attendance Tracking** -- Įjunkite, jei norite registruoti šios grupės [lankomumą](../attendance/tracking-attendance.md).
   - **Service Times** -- Jei taikoma, susiekite grupę su konkrečiais bažnyčios pamaldų laikais. Išsamesnės informacijos apie pamaldų laikus rasite [Lankomumo nustatymai](../attendance/setup.md).
4. Spustelėkite **Save**, kad pritaikytumėte pakeitimus.

:::tip
Aiškus aprašymas ir susirinkimo laikas padeda nariams žinoti, ko tikėtis prisijungus prie grupės.
:::

:::info
Išjungus ir Discussions, ir Announcements, grupės skirtukas Messages visiškai pašalinamas iš narių portalo. Išjungus tik vieną, paslepiamas tik jo skirtukas; nariai perkeliami į tą srautą, kuris dar įjungtas. Esami pranešimai išlieka in bet kuriuo atveju -- jungikliai valdo tik naujų pranešimų rašymą.
:::

## Grupės dubliavimas

Pradedate naują pasikartojančios klasės ar tarnystės ciklą? Vietoj to, kad iš naujo įvestumėte visus nustatymus, dubliuokite esamą grupę:

1. Atidarykite grupę ir spustelėkite **Duplicate** (grupės puslapio kairėje, po mygtuku **Edit**).
2. Patvirtinkite dubliavimą.

Kopija perima originalo nustatymus -- kategoriją, aprašymą, susirinkimo laiką ir vietą, prisijungimo politiką, etiketes ir filialą -- bet **ne** narius. Nauja grupė bus pavadinta pagal originalą su pridėtu „ (Copy)“; pervadinkite ją grupės nustatymuose.

## Grupės archyvavimas

Kai grupė nebeaktyvi, bet norite išsaugoti jos istoriją, o ne ištrinti:

1. Atidarykite grupę ir spustelėkite **Edit**, kad redaguotumėte jos nustatymus.
2. Spustelėkite **Archive** ir patvirtinkite.

Archyvuotos grupės pasitraukia iš pagrindinio grupių sąrašo. Norėdami jas surasti iš naujo, Groups puslapio viršuje, šalia kategorijų mygtukų, spustelėkite **Show archived**, tada prie grupės spustelėkite **Restore**, kad ją grąžintumėte.

:::info
Grupės archyvavimas neištrina jos narių, lankomumo istorijos ar kalendoriaus įvykių -- jis tik paslepia grupę iš numatytojo sąrašo, kol ją atkursite.
:::

## Kiti žingsniai

Sukūrę ir sukonfigūravę grupę, galite:

- **Pridėti narius** -- Ieškokite žmonių ir pridėkite juos į grupę. Spustelėkite žvaigždutės piktogramą (**Make Leader**), kad paskirtumėte grupės vadovus. Žr. [Grupių nariai](./group-members.md).
- **Nustatyti kalendorių** -- Sukurkite grupės įvykius ir pasikartojančius susirinkimus. Žr. [Grupės kalendorius](./group-calendar.md).
- **Bendrauti** -- Siųskite pranešimus visiems grupės nariams tiesiai iš grupės puslapio.
- **Eksportuoti duomenis** -- Spustelėkite **Export** virš grupės narių sąrašo, kad jį atsisiųstumėte.

:::info
Kiekviena grupė priklauso kategorijai, o pagrindiniame Groups puslapyje sąrašą galite filtruoti pagal kategoriją. Kategorijas galite bet kada perkelti ar pervadinti, bet bažnyčiai augant.
:::
