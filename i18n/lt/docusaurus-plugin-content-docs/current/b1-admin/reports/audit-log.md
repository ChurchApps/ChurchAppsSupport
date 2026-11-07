---
title: "Auditų žurnalas"
description: "Peržiūrėkite B1 Admin auditų žurnalą: kas prisijungė, redagavo asmenų įrašus ar keitė leidimus, ir eksportuokite filtruotus įrašus į CSV."
---

# Auditų žurnalas

<div class="article-intro">

Auditų žurnale fiksuojami visi svarbūs veiksmai ir pakeitimai jūsų bažnyčios valdymo sistemoje. Naudokite jį prisijungimų veiklai peržiūrėti, sekti, kas keitė asmenų įrašus, stebėti leidimų atnaujinimus ir išlaikyti atskaitomybę visoje komandoje.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su serverio administratoriaus prieiga
- Eikite į **Nustatymai**, kad rastumėte auditų žurnalą

</div>

## Auditų žurnalo peržiūra

1. Atidarykite [Jump meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje B1 Admin pusėje) ir išskleiskite **Nustatymai**.
2. Spustelėkite **Auditų žurnalas**.
3. Žurnale įrašai rodomi lentelėje su šiais stulpeliais:
   - **Data** -- Kada įvyko veiksmas.
   - **Kategorija** -- Veiksmo tipas (spalvomis pažymėtas, kad būtų lengviau greitai peržiūrėti).
   - **Veiksmas** -- Kas buvo atlikta (pvz., create, update, delete, login_success).
   - **Objektas** -- Įrašo, kuris buvo paveiktas, tipas ir ID.
   - **IP adresas** -- Vartotojo, atlikusio veiksmą, IP adresas.
   - **Detalės** -- Trumpa konkrečių atliktų pakeitimų santrauka.

## Žurnalo filtravimas

Naudokite puslapio viršuje esančius filtrus, kad susiaurintumėte rezultatus:

- **Kategorija** -- Filtruoti pagal veiksmo tipą:
  - **Visos kategorijos** -- Rodyti viską.
  - **Prisijungimas** -- Sėkmingi ir nesėkmingi prisijungimai.
  - **Asmenys** -- Asmenų įrašų kūrimas, atnaujinimas ar šalinimas.
  - **Leidimai** -- Leidimų suteikimas ir panaikinimas.
  - **Aukos** -- Aukojimo įrašų pakeitimai.
  - **Grupės** -- Grupių valdymo veiksmai.
  - **Formos** -- Formų pateikimo veikla.
  - **Nustatymai** -- Konfigūracijos pakeitimai.
- **Pradžios data** -- Rodyti įrašus nuo šios datos.
- **Pabaigos data** -- Rodyti įrašus iki šios datos.

Nustatę filtrus, spustelėkite **Ieškoti**, kad atnaujintumėte rezultatus.

## Kategorijų supratimas

Kiekviena kategorija pažymėta spalva, kad būtų lengviau atpažinti:

- **Prisijungimas** -- Mėlynas žymeklis. Fiksuoja sėkmingus ir nesėkmingus prisijungimo bandymus.
- **Asmenys** -- Violetinis žymeklis. Fiksuoja asmenų įrašų kūrimą, atnaujinimą ir šalinimą.
- **Leidimai** -- Raudonas žymeklis. Fiksuoja, kada suteikiamos arba panaikinamos prieigos teisės.
- **Aukos** -- Žalias žymeklis. Fiksuoja aukojimo įrašų pakeitimus.
- **Grupės** -- Pilkas žymeklis. Fiksuoja grupių valdymo operacijas.
- **Formos** -- Oranžinis žymeklis. Fiksuoja formų pateikimo veiklą.
- **Nustatymai** -- Geltonas žymeklis. Fiksuoja konfigūracijos pakeitimus.

## Žurnalo eksportavimas

Kai rodomi žurnalo įrašai, atsiranda **CSV atsisiuntimo** mygtukas. Spustelėkite jį, kad eksportuotumėte dabartinius filtruotus rezultatus į skaičiuoklę peržiūrai neprisijungus arba įrašams saugoti.

## Puslapiavimas

Naudokite lentelės apačioje esančius puslapiavimo valdiklius, kad naršytumėte rezultatus. Vienu puslapiu galite rodyti 25, 50 arba 100 įrašų.

:::info
Auditų žurnalo įrašai automatiškai saugomi vienerius metus. Įrašai, senesni nei 365 dienos, pašalinami, kad sistema veiktų sklandžiai.
:::

:::tip
Auditų žurnalą peržiūrėkite reguliariai, ypač po naujų komandos narių įtraukimo ar reikšmingų konfigūracijos pakeitimų. Tai padeda anksti pastebėti netikėtą veiklą.
:::

## Susiję straipsniai

- [Vaidmenys ir leidimai](../settings/roles-permissions.md) -- Tvarkykite, kas ir ką gali pasiekti
- [Duomenų saugumas](../settings/data-security.md) -- Sužinokite, kaip saugomi jūsų duomenys
- [Ataskaitų apžvalga](./index.md) -- Peržiūrėkite visas galimas ataskaitas
