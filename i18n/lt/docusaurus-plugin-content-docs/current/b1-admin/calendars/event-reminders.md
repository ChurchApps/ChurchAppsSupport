---
title: "Renginių priminimai"
---

# Renginių priminimai

<div class="article-intro">

Renginių priminimai automatiškai informuoja tinkamus žmones prieš renginį -- pavyzdžiui, „Nepraleiskite! Sveikatos seminaras prasideda rytoj 9:00.“ Priminimą nustatote renginyje vieną kartą, o B1 jį išsiunčia laiku per push pranešimus, el. paštu ir, jei jūsų bažnyčia yra nustačiusi SMS žinučių siuntimą, tekstinėmis žinutėmis. Nariai gali valdyti, kokius priminimus gauna, savo [Pranešimų nuostatose](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukurkite renginį, apie kurį norite priminti žmonėms (žr. [Kalendorių kūrimas](creating-calendars))
- Norėdami pasiekti registruotus dalyvius, įjunkite renginiui [registraciją](creating-calendars)
- Norėdami pasiekti visą grupę, įsitikinkite, kad renginys priklauso [grupei](../groups/creating-groups), kurioje yra narių

</div>

## Priminimo nustatymas

Priminimus konfigūruojate renginio skiltyje **Priminimai**.

- Kai **kuriate naują renginį**, prieš išsaugodami išskleiskite skiltį **Priminimai** renginio redaktoriuje.
- Esamam **renginiui** atidarykite renginio puslapį **Registracijos duomenys** (iš skilties **Registracijos**), kad pridėtumėte arba pakeistumėte priminimą.

1. Įjunkite **Įjungti priminimus**.
2. Pasirinkite, **kada** siųsti. Galite pasirinkti iki trijų laikų: **prieš 7 dienas**, **prieš 3 dienas**, **prieš 1 dieną** ir **Renginio dieną**.
3. Nustatykite **Laiką**, kada priminimas turėtų būti išsiųstas (numatytasis -- **9:00**, jūsų bažnyčios [laiko juostoje](../settings/church-settings.md#time-zone)).
4. Pasirinkite, **kam** reikėtų priminti (žr. toliau [Kam siunčiami priminimai](#who-gets-reminded)).
5. Neprivaloma: pridėkite **Žinutę**. Palikite tuščią, kad būtų naudojamas numatytasis tekstas, arba parašykite savo -- galite įtraukti `{{eventTitle}}`, ir jis bus pakeistas renginio pavadinimu.
6. Pasirinkite **Kanalus**: **Push** pranešimą, **El. paštą** ir, jei jūsų bažnyčia yra prijungusi [SMS paslaugų teikėją](../settings/church-settings.md#texting), **Tekstinę žinutę**.
7. Išsaugokite renginį.

Kol keičiate nustatymus, **tiesioginė peržiūra** parodo apytikslį priminimų gavėjų skaičių, kiek dalyvių nepasiekiama, ir artimiausius planuojamus siuntimo laikus -- taip galite patikrinti, ar priminimas atrodo teisingai, prieš išsaugodami.

## Kam siunčiami priminimai

Nustatymas **Kam** lemia, kam siunčiamas priminimas:

- **Tik registruotiems** -- Visi renginiui užsiregistravę asmenys, susieti su asmens įrašu. Tai numatytoji reikšmė, kai renginiui įjungta registracija, todėl priminimas mažam registruotam renginiui niekada netyčia nepasieks visos grupės.
- **Tik vadovams / registruotiems** -- Vienas priminimas kiekvienai registracijai (asmeniui, kuris užsiregistravo), o ne kiekvienam šeimos nariui registracijoje.
- **Grupės nariams** -- Visiems renginio grupės nariams. Tai numatytoji reikšmė, kai renginys nenaudoja registracijos.
- **Automatinis** -- Naudoja registruotus asmenis, kai registracija įjungta, priešingu atveju -- grupę.

:::info
Dalyviai, pridėti tik vardu (be susieto asmens įrašo), negali gauti priminimo, nes nėra paskyros, įrenginio ar el. pašto, kur jį siųsti. Peržiūra parodo, kiek dalyvių patenka į šią kategoriją, kad nebūtų netikėtumų. Nariai, kurie atsisakė komunikacijos, taip pat praleidžiami.
:::

## Kada siunčiami priminimai

- Priminimai siunčiami **jūsų pasirinktu laiku** jūsų bažnyčios vietiniu laiku, kiekvienu iš pasirinktų intervalų.
- Jei **pakeisite renginio datą ar laiką**, laukiantys priminimai automatiškai perplanuojami -- priminimo redaguoti nereikia.
- Jei **ištrinsite renginį** (arba atšauksite vieną pasikartojančio renginio įvykį), jo laukiantys priminimai automatiškai atšaukiami.
- Pasikartojantys renginiai tvarkomi automatiškai: kiekvienas artimiausias įvykis gauna savo priminimą.

:::tip
Priminimai siunčiami **pirmiausia push pranešimu, o el. paštu -- kaip atsarginiu variantu**. Jei nariui įjungti push pranešimai, jis gaus push pranešimą; jei ne, vietoj to gaus el. laišką. Nariai savo [Pranešimų nuostatose](../../b1-church/getting-started/notification-preferences) pasirenka, kuriais kanalais nori gauti kiekvieno tipo pranešimus.
:::

## Tekstiniai priminimai

Kanalas **Tekstinė žinutė** rodomas tik tada, kai jūsų bažnyčia yra prijungusi SMS paslaugų teikėją. Tekstinės žinutės siunčiamos per jūsų bažnyčios SMS paslaugų teikėją, o kiekviena žinutė gali kainuoti jūsų bažnyčiai. Jos siunčiamos kartu su bet kokiu push ar el. pašto priminimu ir tik asmenims, kurie:

- savo [Pranešimų nuostatose](../../b1-church/getting-started/notification-preferences) įjungė **Tekstines žinutes**, ir
- profilyje nurodė mobiliojo telefono numerį.

Kiekviena žinutė prasideda jūsų bažnyčios pavadinimu, telpa į vieną SMS žinutę ir baigiasi tekstu „Atsakykite STOP, kad atsisakytumėte.“ Kas atsako STOP, nebegaus tekstinių žinučių iš jūsų bažnyčios. Kad STOP atsakymai pasiektų B1, įklijuokite **Gaunamųjų (STOP) webhook URL** iš savo [SMS nustatymų](../settings/church-settings.md#texting) į savo paslaugų teikėjo gaunamų žinučių webhook nustatymą.

## Ką nariai gali valdyti

Priminimai visada atsižvelgia į kiekvieno nario [Pranešimų nuostatas](../../b1-church/getting-started/notification-preferences). Narys gali:

- išjungti **Renginių priminimus** push, el. pašto ar tekstinėms žinutėms, paliekant įjungtus kitus pranešimus;
- įjungti arba išjungti tekstinius priminimus su **Tekstinės žinutės**;
- nustatyti **tylos valandas**, kad neskubūs pranešimai palaukti iki tinkamo laiko.

Negalite pakeisti nario sprendimo atsisakyti renginių priminimų -- taip B1 atitinka antispam taisykles, o nariai išlieka savo el. pašto dėžutės valdytojai.

## Tarnystės priminimai

Savanoriai, paskirti į planą, gauna atskirą **tarnystės priminimą** su plano informacija ir, jei dar neatsakė, **Priimti / Atsisakyti** mygtukus tiesiai el. laiške. Šie priminimai nustatomi plano tipe, o ne kalendoriaus renginyje, ir taip pat gali būti siunčiami tekstine žinute -- žr. [Savanorių priminimai](../serving/plans#volunteer-reminders) ir [Sekmadienio savanoriai](../guides/sunday-volunteers), kur aprašyta, kaip veikia savanorių planavimas ir priminimai.

## Kiti žingsniai

- [Pranešimų nuostatos](../../b1-church/getting-started/notification-preferences) -- ką nariai gali valdyti
- [Renginių registracijos vadovas](../guides/event-registration) -- nustatykite registraciją, kad priminimai pasiektų dalyvius
- [Kalendorių kūrimas](creating-calendars) -- grįžti prie kalendoriaus nustatymo
