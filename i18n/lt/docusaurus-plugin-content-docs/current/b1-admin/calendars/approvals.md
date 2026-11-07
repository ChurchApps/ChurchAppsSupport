---
title: "Kalendoriaus patvirtinimai"
description: "Peržiūrėkite kambarių ir išteklių rezervavimo užklausas B1 Admin, patikrinkite konfliktus, tada patvirtinkite arba atmeskite, galbūt paskelbdami renginį."
---

# Kalendoriaus patvirtinimai

<div class="article-intro">

Patvirtinimų puslapyje administratoriai peržiūri ir tvarko laukiančius kambarių bei išteklių rezervavimo prašymus, taip pat kalendoriaus renginius, kuriuos prieš paskelbiant reikia patvirtinti.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Sukonfigūruokite kambarius arba išteklius su **Patvirtinimo grupe** skiltyje [Kambariai ir ištekliai](./rooms-resources.md)
- Jums reikia **Kalendorių administratoriaus** leidimo arba **content.edit** leidimo

</div>

## Patvirtinimų atidarymas

B1 Admin programoje atidarykite [Greitojo peršokimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje), išskleiskite **Kalendoriai** ir spustelėkite **Patvirtinimai**. Čia išvardyti laukiantys rezervavimo prašymai ir renginiai, kuriuos reikia peržiūrėti.

## Rezervavimo prašymai

Kai grupė sukuria renginį ir prašo kambario arba išteklių, prašymas rodomas skiltyje **Kambarių ir išteklių prašymai**. Kiekvienoje eilutėje rodoma:

- Renginio pavadinimas ir data bei laikas
- Prašomas kambarys arba išteklius (daugiavienetiems ištekliams – ir kiekis)
- Būsenos ženklelis, rodantis, ar prašymas turi konfliktų

### Konfliktų žymos

Jei prašymas persidengia su kitu rezervavimu arba blokuote tam pačiam kambariui ar ištekliui, jo būsenoje rodomas ženklelis **Konfliktai**. Užvedę pelės žymeklį ant jo, pamatysite išsamią informaciją. Prašymai be persidengimų rodo **Konfliktų nėra**. Prieš patvirtindami bet kurį iš konfliktuojančių prašymų, atidžiai juos peržiūrėkite.

### Patvirtinimas arba atmetimas

Spustelėkite **Patvirtinti** arba **Atmesti** bet kuriame rezervavimo prašyme (atmetant pirmiausia paprašoma patvirtinimo). Prašymą pateikusi grupė gauna pranešimą apie sprendimą. Patvirtinti rezervavimai užrakinami tam renginiui skirtam kambariui ar ištekliui; atmesti rezervavimai atlaisvina laiko tarpą kitiems.

Kai spustelite **Patvirtinti**, atsidaro dialogo langas **Patvirtinti rezervavimą**, kuriame tuo pačiu veiksmu galite paskelbti ir renginį:

1. Pažymėkite **Skelbti viešame kalendoriuje**, kad renginys būtų matomas viešai jo grupės kalendoriuje. Jei žymės nepažymėsite, rezervavimas bus patvirtintas be renginio matomumo pakeitimo.
2. Kai pažymėta **Skelbti viešame kalendoriuje**, galite pasirinktinai iš **Taip pat pridėti į kalendorių** pasirinkti kuratorinį kalendorių, kad renginys būtų pridėtas ir į vieną iš jūsų [kuratorinių kalendorių](./curated-calendar.md). Jei to nereikia, palikite **Nėra**. (Ši parinktis rodoma tik tuo atveju, jei turite **content.edit** leidimą.)
3. Spustelėkite **Patvirtinti**.

## Laukiantys renginiai

Jei jūsų kalendoriaus darbo eiga reikalauja, kad renginiai būtų patvirtinti prieš tapdami matomi visuomenei, laukiantys renginiai rodomi skiltyje **Renginių prašymai**. Spustelėkite **Patvirtinti**, kad renginys būtų paskelbtas kalendoriuje, arba **Atmesti**, kad pateikėjas gautų pranešimą, jog reikia pakeitimų.

:::tip
Nustatykite kambariui patvirtinimo grupę skiltyje [Kambariai ir ištekliai](./rooms-resources.md), kad tam kambariui būtų reikalaujama patvirtinimo. Tada grupės, turinčios prieigą, kurdamos renginius, galės prašyti to kambario, o tokie prašymai pateks į šį puslapį.
:::

## Susiję straipsniai

- [Kambariai, ištekliai ir planavimas](./rooms-resources.md) — sukonfigūruokite rezervuojamus kambarius ir išteklius
- [Kalendorių kūrimas](./creating-calendars.md) — tvarkykite kalendorius ir renginius
