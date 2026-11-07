---
title: "Kelių valiutų palaikymas"
---

# Kelių valiutų palaikymas

<div class="article-intro">

B1 kelių valiutų funkcija leidžia jūsų bažnyčiai priimti ir apskaityti aukas skirtingomis valiutomis. Tai ypač naudinga bažnyčioms, turinčioms tarptautinių narių, misionierių ar kelis filialus skirtingose šalyse.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia leidimo tvarkyti aukas. Išsamiau žr. [Vaidmenys ir leidimai](../people/roles-permissions.md).
- Nustatykite [internetinį aukojimą](./online-giving-setup.md) su Stripe, kuris palaiko daugiavaliutines operacijas.
- Susipažinkite su savo bažnyčios apskaitos poreikiais, susijusiais su kelių valiutų tvarkymu.

</div>

## Kelių valiutų įjungimas

Kelių valiutų palaikymas dabar B1 įjungtas pagal numatytuosius nustatymus. Kai ši funkcija įjungta:

- Nariai gali aukoti internetu savo vietine valiuta
- Aukas galite įrašyti rankiniu būdu bet kuria valiuta
- Aukų ataskaitose sumos rodomos pradine valiuta
- Stripe automatiškai atlieka valiutos konvertavimą internetiniam aukojimui

## Palaikomos valiutos

Sistema palaiko visas pagrindines pasaulio valiutas, įskaitant:

- **USD** -- JAV doleris
- **EUR** -- Euras
- **GBP** -- Didžiosios Britanijos svaras
- **CAD** -- Kanados doleris
- **AUD** -- Australijos doleris
- **MXN** -- Meksikos pesas
- **BRL** -- Brazilijos realas
- **INR** -- Indijos rupija
- **CNY** -- Kinijos juanis
- **JPY** -- Japonijos jena
- Ir daugelis kitų...

Internetiniam aukojimui galimos valiutos priklauso nuo to, kokias valiutas palaiko jūsų Stripe paskyra.

## Aukų įrašymas skirtingomis valiutomis

### Internetinės aukos

Kai narys aukoja internetu per Stripe:

1. Atsiskaitymo metu jis pasirenka norimą valiutą
2. Stripe apdoroja mokėjimą ta valiuta
3. Auka įrašoma B1 su pradine valiutos suma
4. Stripe automatiškai atlieka visą reikalingą valiutos konvertavimą į jūsų paskyros numatytąją valiutą

### Rankinis įvedimas

Norėdami įrašyti grynųjų ar čekio auką kita valiuta:

1. B1 Admin programėlėje eikite į **Donations > Batches** ir atidarykite partiją
2. Partijos puslapio viršuje spustelėkite **Add Donation**
3. Iš valiutų sąrašo pasirinkite valiutą
4. Įveskite sumą ta valiuta
5. Užpildykite likusią aukos informaciją
6. Spustelėkite **Save**

## Kelių valiutų aukų peržiūra

### Aukų ataskaitos

Aukų ataskaitose sumos rodomos pradine valiuta:

- Atskiri aukų įrašai rodo valiutos kodą (pvz., "$100.00 USD")
- Sumos skaičiuojamos atskirai kiekvienai valiutai
- Galite filtruoti pagal konkrečias valiutas

### Konvertuotos sumos

Visur, kur B1 rodo bendrą sumą -- aukojimo santraukos KPI kortelėse, aukų partijos sumoje ar fondo sumoje -- aukos, įrašytos valiuta, kuri nėra jūsų bažnyčios numatytoji, konvertuojamos į jūsų bažnyčios valiutą pagal dabartinius valiutos kursus. Tokiu būdu bendra suma yra viena prasminga reikšmė, o ne nesuderinamų valiutų sudėtis. Kai taikomas konvertavimas, po suma atsiranda pastaba **Konvertuota pagal dabartinius valiutos kursus**. Atskiros aukos eilutės ir toliau rodomos pradine valiuta.

### Aukojimo pažymos

Generuojant aukojimo pažymas:

- Kiekviena auka rodoma su pradine valiuta
- Sumos suskirstomos pagal valiutą
- Nariai tiksliai mato, kiek aukojo kiekviena valiuta

## Stripe integracija

Internetiniam aukojimui kelių valiutų operacijas tvarko Stripe:

- **Automatinis konvertavimas** -- Stripe konvertuoja valiutas į jūsų paskyros numatytąją valiutą
- **Valiutos kursai** -- Stripe naudoja dabartinius rinkos valiutos kursus
- **Mokesčiai** -- Valiutos konvertavimas gali užtraukti papildomų Stripe mokesčių
- **Išmokėjimo valiuta** -- Lėšos pervedamos į jūsų paskyros numatytąją valiutą

:::info
Patikrinkite savo Stripe valdymo skydelyje dabartinius konvertavimo kursus ir visus su kelių valiutų operacijomis susijusius mokesčius.
:::

## Apskaitos aspektai

Dirbdami su keliomis valiutomis:

- **Įrašų tvarkymas** -- Tiksliai ataskaitai teikti sekite pradines aukų sumas ir valiutas
- **Valiutos kursai** -- Atkreipkite dėmesį, kad Stripe konvertavimo kursai gali skirtis nuo jūsų banko kursų
- **Mokesčių kvitai** -- Pasitarkite su buhalteriu, kaip teikti aukas skirtingomis valiutomis mokestinėms ataskaitoms
- **Lėšų paskirstymas** -- Aukas galite paskirstyti konkretiems fondams nepriklausomai nuo valiutos

## Geriausia praktika

- **Numatytoji valiuta** -- Daugumai operacijų nustatykite pagrindinę bažnyčios valiutą kaip numatytąją
- **Aiškus bendravimas** -- Pasakykite aukotojams, kokia valiuta jie aukoja atsiskaitymo metu
- **Nuoseklus ataskaitų teikimas** -- Bendros sumos visada automatiškai konvertuojamos į jūsų bažnyčios valiutą; kai reikia matyti pradines sumas, naudokite filtrą pagal aukos valiutą
- **Reguliarus suderinimas** -- Suderinkite Stripe išmokėjimus su savo aukų įrašais, atsižvelgdami į valiutos konvertavimus

## Apribojimai

- Mokėjimų valiutos konvertavimą atlieka Stripe, ir tik internetiniam aukojimui; rankinės aukos įrašomos taip, kaip įvestos, be automatinio konvertavimo
- Istorinės ataskaitos ir atskiros aukų eilutės visada rodo pradinę valiutą, kuria auka buvo įrašyta
- Bendros sumos (KPI kortelės, partijų sumos, fondų sumos) konvertuojamos į jūsų bažnyčios valiutą pagal dabartinius valiutos kursus -- šie kursai gali šiek tiek skirtis nuo jūsų banko ar Stripe kursų lėšoms įskaitomis dieną

## Susiję straipsniai

- [Internetinio aukojimo nustatymas](./online-giving-setup.md) -- Sukonfigūruokite Stripe aukų priėmimui
- [Aukų įrašymas](./recording-donations.md) -- Rankiniu būdu įveskite aukų įrašus
- [Aukų ataskaitos](./donation-reports.md) -- Generuokite ir peržiūrėkite aukų santraukas
- [Aukojimo pažymos](./giving-statements.md) -- Sukurkite metines aukojimo pažymas
