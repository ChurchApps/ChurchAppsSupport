---
title: "Vadovas: renginio registracijos nustatymas"
description: "Nustatykite renginio registracijos formą B1 Admin, kad galėtumėte rinkti dalyvių duomenis ir pasirinktinius mokėjimus, įdėti ją į savo bažnyčios svetainę ir sekti registracijas."
---

# Renginio registracijos nustatymas

<div class="article-intro">

Sukurkite renginio registracijos formą, rinkite dalyvių informaciją ir pasirinktinius mokėjimus, įdėkite ją į savo bažnyčios svetainę ir tvarkykite gautas registracijas. Baigę šį vadovą turėsite bendrinamą registracijos puslapį bet kokiam bažnyčios renginiui.

</div>

:::info
**Du renginių registracijos būdai:** Šis vadovas aprašo **formomis pagrįstą registraciją**, kuri suteikia visišką kontrolę su pasirinktiniais laukais ir mokėjimų rinkimu. Paprastiems renginiams, kai tiesiog reikia sekti, kas dalyvauja, naudokite **vietinę renginio registraciją**, įtaisytą kalendoriuje – nustatymo instrukcijas rasite [Kalendorių kūrimas](../calendars/creating-calendars.md#enabling-event-registration). Vietinė registracija leidžia nariams prisiregistruoti tiesiogiai per [B1.church arba B1 App](../../b1-church/events/registering.md), su dalyvių skaičiaus riba, datų langais ir el. pašto patvirtinimais.
:::

<div class="prereqs">
<h4>Prieš pradedant</h4>

- B1 Admin paskyra su administratoriaus prieiga
- Mokėjimams rinkti pirmiausia turi būti [sukonfigūruotas Stripe](../donations/online-giving-setup.md)

</div>

## 1 žingsnis: Sukurkite atskirą formą

Atskiros formos turi savo viešą URL, kurį gali pasiekti bet kas – puikiai tinka renginio registracijai.

Vadovaukitės [Formų kūrimas](../forms/creating-forms.md) vadovu, kad:

1. Eitumėte į Forms ir spustelėtumėte Add Form
2. Pasirinktumėte „Stand Alone“ tipą – tai suteiks jūsų formai savo viešą URL
3. Pavadintumėte ją pagal renginį (pvz., „Vyrų stovyklos registracija“, „Vaikų vasaros stovyklos registracija“)

## 2 žingsnis: Pridėkite klausimus

Sukurkite laukus, kuriuos reikia surinkti iš registruojamųjų.

Vadovaukitės [Formų kūrimas](../forms/creating-forms.md#adding-questions) vadovu, kad pridėtumėte klausimus:

1. Eikite į Questions skirtuką ir pridėkite laukus, reikalingą informacijai: vardas, el. paštas, telefonas, mitybos apribojimai, marškinėlių dydis, avarinis kontaktas ir pan.
2. Naudokite Multiple Choice pasirinkimams, pvz., maitinimosi pageidavimams ar sesijų pasirinkimams

:::warning
Mokėjimo lauko tipui reikia, kad būtų sukonfigūruotas Stripe. Jei dar nenustatėte internetinių aukų, prieš pridedant mokėjimo laukus žr. [Internetinių aukų nustatymas](../donations/online-giving-setup.md).
:::

## 3 žingsnis: Sukonfigūruokite formos nustatymus

Valdykite, kada ir kaip jūsų registracijos forma yra prieinama.

1. Nustatykite prieinamumo datas, jei registracija turi būti atvira tik ribotą laiką
2. Nukopijuokite viešą URL – galite jį tiesiogiai bendrinti
3. Pridėkite formos narius su Admin arba View Only vaidmenimis, kad padėtų tvarkyti registracijas

## 4 žingsnis: Įdėkite į savo svetainę

Padarykite registracijos formą lengvai randamą, pridėdami ją į savo bažnyčios svetainę.

Vadovaukitės [Puslapių tvarkymas](../website/managing-pages.md) vadovu, kad:

1. Savo B1 svetainės redaktoriuje pridėtumėte naują skyrių puslapiui ir pasirinktumėte Form elementą
2. Pasirinktumėte savo registracijos formą iš sąrašo

:::tip
Atskirą URL bendrinkite ir el. paštu, socialiniuose tinkluose bei bažnyčios biuleteniuose – kuo daugiau vietų jis matomas, tuo daugiau registracijų gausite.
:::

## 5 žingsnis: Tvarkykite registracijas

Sekite registracijas, kai jos gaunamos, ir eksportuokite duomenis, kai jų prireikia.

Vadovaukitės [Registracijų tvarkymas](../forms/managing-submissions.md) vadovu, kad:

1. Peržiūrėtumėte gautus atsakymus Submissions skirtuke
2. Eksportuotumėte į CSV failą skaičiuoklėms, dalyvių skaičiaus sekimui ar dalijimuisi su renginio koordinatoriais

## Viskas!

Jūsų renginio registracija veikia. Bendrinkite nuorodą, įdėkite ją į savo svetainę ir sekite registracijas iš B1 Admin. Pasibaigus renginiui, eksportuokite galutinį sąrašą savo įrašams.

## Susiję straipsniai

- [Formų kūrimas](../forms/creating-forms.md) — kurkite formas su skirtingais lauko tipais
- [Registracijų tvarkymas](../forms/managing-submissions.md) — peržiūrėkite ir eksportuokite formos atsakymus
- [Puslapių tvarkymas](../website/managing-pages.md) — įdėkite formas į savo svetainę
- [Internetinių aukų nustatymas](../donations/online-giving-setup.md) — reikalingas mokėjimų laukams
