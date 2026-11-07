---
title: "Výber služby"
description: "Vyberte bohoslužbu, ktorej sa zúčastňujete, na obrazovke služieb v B1 Checkin. Určuje to časy bohoslužieb a skupiny zobrazené v ďalšom priebehu prihlásenia."
---

# Výber služby

<div class="article-intro">

Prvým krokom každého odbavenia je výber služby, na ktorú prichádzate. Obrazovka služieb sa zobrazí hneď po načítaní aplikácie a určuje, ktoré časy služieb a skupiny budú k dispozícii počas zvyšku procesu odbavenia.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- [Prihláste sa](../getting-started/logging-in.md) do aplikácie B1 Church Checkin a vyberte svoj kostol
- Uistite sa, že váš správca kostola [nakonfiguroval služby a časy služieb](../../b1-admin/attendance/setup.md) v B1 Admin

</div>

## Ako to funguje

1. Po prihlásení (alebo po automatickom prihlásení pri ďalších návštevách) aplikácia zobrazí **obrazovku služieb**.
2. Uvidíte zoznam všetkých služieb, ktoré boli nakonfigurované pre váš kostol. Každá služba sa zobrazí ako karta s názvom služby (napríklad „Nedeľné ráno“ alebo „Streda večer“).
3. Ťuknite na službu, na ktorú prichádzate.

Aplikácia načíta časy služieb a skupiny priradené k tejto službe a potom vás presmeruje na [obrazovku vyhľadávania členov](./looking-up-members.md).

## Keď odbavovanie nie je otvorené

Ak váš správca priradil času služby [harmonogram odbavovania](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), aplikácia umožní rodinám vybrať tento čas služby iba vtedy, keď je jeho okno odbavovania otvorené. Časy služieb, ktorých okno je práve zatvorené, sa stále zobrazia na [obrazovke domácnosti](./household-review.md), ale budú označené **Zatvorené** (napríklad **Zatvorené · otvorí sa ne 9:30**) namiesto tlačidla skupiny.

Ak sú všetky časy služby, ktorú ste vybrali, zatvorené, aplikácia vám oznámi, kedy sa odbavovanie otvorí – napríklad **„Odbavovanie pre túto službu sa otvorí ne 9:30.“** (Ak nie je možné zobraziť čas otvorenia, zobrazí sa **„Odbavovanie pre túto službu momentálne nie je otvorené.“**) Ťuknutím na **Späť** sa vrátite na zoznam služieb a vyberiete inú službu, alebo počkáte, kým sa okno otvorí, a skúsite znova.

:::info
Okná odbavovania sa riadia časovým pásmom kampusu danej služby. Ak kampus nemá nastavené časové pásmo, použije sa časové pásmo vášho kostola. Ak sa zdá, že čas služby sa otvára v nesprávnu hodinu, požiadajte správcu, aby skontroloval časové pásmo v nastaveniach kampusu alebo kostola. Na obrazovke domácnosti kiosk tiež používa hodiny samotného tabletu na otváranie a zatváranie časov služieb, preto sa uistite, že tablet má nastavený správny čas a časové pásmo.
:::

:::info
Služby konfiguruje správca vášho kostola v B1 Admin v sekcii Účasť. Ak nevidíte službu, ktorú očakávate, požiadajte správcu, aby overil, že bola vytvorená v [nastavení účasti](../../b1-admin/attendance/setup.md).
:::

## Čo sa deje v pozadí

Keď vyberiete službu, aplikácia zo servera načíta tri údaje:

- **Časy služieb** pre túto službu (napríklad jedna služba môže mať časový slot o 9:00 aj o 11:00).
- **Skupiny** dostupné v každom čase služby (napríklad Detská izba, Predškoláci, Základná škola).
- **Prepojenia skupín a časov služieb**, ktoré určujú, ktoré skupiny sú dostupné v ktorých časoch.

Tieto údaje sa ukladajú do lokálnej pamäte, aby bol zvyšok procesu odbavovania rýchly a pohotový.

:::tip
Ak má váš kostol nakonfigurovanú iba jednu službu, aj tak ju musíte ťuknutím vybrať, aby ste mohli pokračovať. Aplikácia nevyberá jednu službu automaticky.
:::

## Ďalší krok

Po výbere služby [vyhľadáte svoju rodinu](./looking-up-members.md) podľa telefónneho čísla alebo mena.
