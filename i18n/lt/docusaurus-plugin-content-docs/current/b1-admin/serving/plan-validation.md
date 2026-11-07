---
title: "Plano tikrinimas ir pranešimai"
description: "Tikrinkite pamaldų planus B1 Admin dėl neužpildytų pareigų, tvarkaraščio konfliktų ir neprieinamų savanorių, ir vienu paspaudimu praneškite komandai."
---

# Plano tikrinimas ir pranešimai savanoriams

<div class="article-intro">

B1 Admin automatiškai patikrina jūsų planus dar prieš sekmadienį: ar nėra neužpildytų pozicijų, planavimo konfliktų ir savanorių, kurie pažymėjo, kad tą dieną negali dalyvauti. Kai viskas atrodo tvarkingai, vienu paspaudimu galite pranešti visai savo komandai.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukurkite [pamaldų planą](./plans.md) ir priskirkite savanorius pozicijoms
- Pridėkite [pamaldų laikus](./plans.md) prie plano, kad konfliktų aptikimas galėtų patikrinti persidengimus
- Įsitikinkite, kad savanoriai turi įdiegtą B1 Mobile programėlę, kad galėtų gauti pranešimus

</div>

## Tikrinimo skydelis

Kiekvienas planas turi **Tikrinimo** skydelį, kuris veikia automatiškai, kol kuriate planą. Jis tikrina tris dalykus:

### Neužpildytos pozicijos
Jei pozicijai reikia daugiau žmonių, nei šiuo metu priskirta, tikrinimo skydelyje nurodoma, kiek dar trūksta, pavyzdžiui, *„Garso technikas: reikia dar 1 žmogaus."* Iš karto matote, ar planas jau pilnai aprūpintas, kol nepriėjo savaitė.

### Planavimo konfliktai
Jei savanoris priskirtas dviem pozicijoms, kurios tame pačiame plane laike persidengia, tikrinimo skydelis tai pažymi konfliktu, pavyzdžiui, *„Jane Smith: laiko konfliktas tarp Pagyrimo vadovo ir Vaikų registracijos per sekmadienio pamaldas."* Taip dvigubi užimtumai pastebimi dar prieš tai, kai jie tampa problema sekmadienio rytą.

### Nepasiekiami laikotarpiai
Savanoriai B1 Mobile programėlėje gali nurodyti datas, kada jie nepasiekiami. Jei kas nors priskirtas planui, kuris patenka į vieną iš jo nepasiekiamų laikotarpių, tikrinimo skydelis konfliktą parodo automatiškai, kad galėtumėte rasti pakaitalą.

### Konfliktai tarp planų
Tikrinimas taip pat vienu metu nagrinėja visus jūsų planus. Jei tas pats savanoris priskirtas dviem skirtingiems planams, kurie laike persidengia (pavyzdžiui, 9 val. ir 10 val. pamaldos, kurios abi trunka iki 10:30 val.), B1 Admin pažymės, kad tas asmuo dvigubai užimtas tarp planų.

:::tip
Tikrinimo paleisti nereikia. Jis atnaujinamas automatiškai kiekvieną kartą, kai pridedate ar keičiate priskyrimą. Tiesiog stebėkite skydelį, kol kuriate planą.
:::

## Savanorių informavimas

Kai planas paruoštas, galite iš karto iš tikrinimo skydelio pranešti visiems priskirtiems savanoriams.

1. Atidarykite planą ir slinkite iki **Tikrinimo** skydelio
2. Jei yra savanorių, apie kuriuos dar nepranešta, pamatysite nuorodą su jų skaičiumi (pvz., *„Pranešti 8 savanoriams"*)
3. Spustelėkite nuorodą, kad būtų išsiųsti pranešimai visiems, kurie dar nebuvo informuoti
4. Savanoriai telefone gaus pranešimą, kuriame bus nurodyta, kad jie paskirti, ir paprašyta patvirtinti savo priskyrimą

:::info
Įtraukiami tik tie savanoriai, apie kuriuos dar nepranešta. Jei vėliau į planą pridėsite naują žmogų, nuoroda vėl pasirodys, kad galėtumėte pranešti tik naujam asmeniui, nekartodami pranešimo visai komandai.
:::

### Planai su patvirtinimo eiga

Jei plano nustatymuose nurodyta [patvirtinimo eiga](./workflows.md#serving-assignment-confirmations), skydelyje rodoma: *„Nauji prašymai naudoja patvirtinimo eigą. Programėlės pranešimai lieka įjungti. Priminimai nustoja siųstis, kai kiekvienas prašymas priimamas arba atmetamas."* Tokiu atveju:

- Pranešimo nuoroda skaičiuoja tik tuos savanorius, kuriems dar nepranešta ir kurie dar neatsakė.
- Ją paspaudus išsiunčiamas įprastas programėlės pranešimas ir eigos lentoje sukuriama po vieną kortelę kiekvienam prašymui. Tada eiga siunčia el. laiško ir SMS priminimus, o jei reikia, prašymą perduoda kam nors paskambinti.
- Planas turi būti paskelbtas (ne tik pažymėtas kaip preliminarus), o eiga turi būti aktyvi. Priešingu atveju skydelyje rodoma: *„Prašymų nepavyko išsiųsti. Patikrinkite, ar pasirinkta eiga aktyvi ir ar planas paskelbtas, tada bandykite dar kartą."*

:::warning
Kad gautų pranešimus, savanoriai turi įdiegti B1.church mobilią versiją (PWA pagrindiniame ekrane arba nebenaudojamą B1 Mobile vietinę programėlę, jei ji dar naudojama) ir įjungti pranešimus. Sąranka aprašyta straipsnyje [Įdiegimas kaip programėlė (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Susiję straipsniai

- [Pamaldų planai](./plans.md)
- [Eigos](./workflows.md)
- [B1.church PWA įdiegimas](/docs/b1-church/getting-started/installing-pwa)
