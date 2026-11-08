---
title: "Plano patikra ir pranešimai"
description: "Patikrinkite B1 Admin tarnystės planus, ar nėra neužpildytų pozicijų, grafiko konfliktų ir savanorių, pažymėjusių neprieinamumą, o tada vienu paspaudimu pranešdami visai komandai per stumiamuosius pranešimus."
---

# Plano patikra ir savanorių pranešimai

<div class="article-intro">

B1 Admin automatiškai patikrina jūsų planus prieš sekmadienį: ar nėra neužpildytų pozicijų, grafiko konfliktų ir savanorių, kurie pažymėjo tą datą kaip neprieinamą. Kai viskas tvarkinga, galite vienu paspaudimu pranešti visai savo komandai.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukurkite [tarnystės planą](./plans.md) ir priskirkite savanorius pozicijoms
- Pridėkite [tarnystės laikus](./plans.md) prie plano, kad konfliktų aptikimas galėtų patikrinti persidengimus
- Įsitikinkite, kad savanoriai yra įdiegę [B1 App programėlę](../../b1-church/getting-started/installing-pwa.md), kad galėtų gauti stumiamuosius pranešimus

</div>

## Patikros skydelis

Kiekviename plane yra **Patikros** skydelis, kuris veikia automatiškai, kol kuriate planą. Jis tikrina tris dalykus:

### Neužpildytos pozicijos
Jei pozicijai reikia daugiau žmonių, nei šiuo metu priskirta, patikros skydelis tiksliai nurodo, kiek dar reikia, pavyzdžiui: *„Garso technikas: reikia dar 1 žmogaus."* Vienu žvilgsniu matote, ar planas pilnai užpildytas prieš savaitę.

### Grafiko konfliktai
Jei savanoris priskirtas dviem pozicijoms, kurios tame pačiame plane laike persidengia, patikros skydelis pažymi konfliktą, pavyzdžiui: *„Jonas Jonaitis: laiko konfliktas tarp Vadovo ir Vaikų registracijos per sekmadienio pamaldas."* Taip dvigubi užsakymai pastebimi dar prieš sekmadienio rytą.

### Neprieinamumo datos
Savanoriai B1 App programėlėje gali nurodyti datas, kada jie neprieinami. Jei kas nors priskirtas planui, patenkančiam į vieną iš jo neprieinamumo datų, patikros skydelis konfliktą parodo automatiškai, kad galėtumėte rasti pakaitalą.

### Konfliktai tarp planų
Patikra taip pat tikrina visus jūsų planus vienu metu. Jei tas pats savanoris priskirtas dviem skirtingiems planams, kurie laike persidengia, pavyzdžiui, 9 val. ir 10 val. pamaldos, abi tęsiasi iki 10:30 val., B1 Admin pažymės tą asmenį kaip dvigubai užimtą tarp planų.

:::tip
Patikros paleisti nereikia. Ji atnaujinama automatiškai kiekvieną kartą, kai pridedate ar keičiate priskyrimą. Tiesiog stebėkite skydelį kurdami planą.
:::

## Savanorių pranešimas

Kai planas paruoštas, galite vienu metu pranešti visiems priskirtiems savanoriams tiesiai iš patikros skydelio.

1. Atidarykite planą ir slinkite iki **Patikros** skydelio
2. Jei yra savanorių, apie kuriuos dar nepranešta, pamatysite nuorodą, rodančią, kiek jų reikia informuoti (pvz., *„Pranešti 8 savanoriams"*)
3. Spustelėkite nuorodą, kad išsiųstumėte stumiamuosius pranešimus visiems, kam dar nepranešta
4. Savanoriai telefone gaus pranešimą, kad jie suplanuoti, ir raginimą patvirtinti savo priskyrimą

:::info
Įtraukiami tik tie savanoriai, apie kuriuos dar nebuvo pranešta. Jei vėliau į planą pridėsite kitą žmogų, nuoroda vėl pasirodys, kad galėtumėte pranešti tik naujajam, nepakartodami pranešimo visai komandai.
:::

### Planai su patvirtinimo eiga

Jei plano nustatymuose nurodoma [patvirtinimo eiga](./workflows.md#serving-assignment-confirmations), skydelyje rodoma: *„Nauji prašymai naudoja patvirtinimo eigą. Programėlės pranešimai lieka įjungti. Priminimai sustoja, kai kiekvienas prašymas priimamas arba atmetamas."* Tokiu atveju:

- Pranešimo nuoroda skaičiuoja tik tuos savanorius, kuriems dar nepranešta ir kurie dar neatsakė.
- Ją paspaudus išsiunčiamas įprastas programėlės pranešimas ir eigos lentoje sukuriama po vieną kortelę kiekvienam prašymui. Tada eiga siunčia el. laiškų ir SMS priminimus ir, jei reikia, perduoda prašymą kam nors paskambinti.
- Planas turi būti paskelbtas (ne tik preliminarus), o eiga turi būti aktyvi. Priešingu atveju skydelyje rodoma: *„Prašymų išsiųsti nepavyko. Patikrinkite, ar pasirinkta eiga aktyvi ir planas paskelbtas, tada bandykite dar kartą."*

:::warning
Kad gautų stumiamuosius pranešimus, savanoriai turi turėti įdiegtą B1 App programėlę savo pagrindiniame ekrane ir įjungtus pranešimus. Sąrankos instrukcijas rasite skyriuje [Įdiegimas kaip programėlė (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Susiję straipsniai

- [Tarnystės planai](./plans.md)
- [Eigos](./workflows.md)
- [B1.church PWA įdiegimas](/docs/b1-church/getting-started/installing-pwa)
