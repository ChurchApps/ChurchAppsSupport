---
title: "Návod: Vygenerovanie ročných výkazov darov"
description: "V B1 Admin dokončite záznamy o daroch za rok, skontrolujte daňové nastavenia fondov a vygenerujte potvrdenia o daroch s nárokom na daňovú úľavu pre každého darcu."
---

# Vygenerovanie ročných výkazov darov

<div class="article-intro">

Prejdite procesom ukončenia roka: dokončenie záznamov o daroch, overenie nastavení fondov a vygenerovanie potvrdení o daroch s nárokom na daňovú úľavu pre každého darcu. Zvyčajne sa to robí na začiatku januára za predchádzajúci kalendárny rok.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Účet B1 Admin s finančným prístupom
- Dary zaznamenané počas roka (online cez Stripe a/alebo ručne zadané)
- Prístup k vášmu účtu Stripe, ak prijímate online dary

</div>

## Krok 1: Importujte finálne transakcie zo Stripe

Uistite sa, že sa všetky online dary z konca roka nachádzajú vo vašom systéme.

Podľa návodu [Import zo Stripe](../donations/stripe-import.md):

1. Prejdite do sekcie Donations > Stripe Import
2. Vyberte časový rozsah pokrývajúci koniec roka (napr. 1. december – 31. december)
3. Kliknite najprv na Preview, aby ste si import prezreli, a potom na Import Missing, čím ho dokončíte

:::warning
Tento import spustite pred vygenerovaním výkazov. Transakcie, ktoré neimportujete, sa na výkazoch darcov nezobrazia.
:::

## Krok 2: Skontrolujte prehľady darov

Pred vygenerovaním výkazov overte, či sú vaše záznamy správne.

Podľa návodu [Prehľady darov](../donations/donation-reports.md):

1. Skontrolujte súhrnnú stránku darov za celý rok
2. Prezrite si súčty podľa fondov a porovnajte ich s bankovými výpismi, aby ste zachytili prípadné nezrovnalosti
3. Ak je to potrebné, kliknite na jednotlivé dávky a overte si údaje o každom darcovi

## Krok 3: Overte daňový status fondov

Uistite sa, že je nastavenie daňovej odpočítateľnosti pri každom fonde správne, aby boli výkazy presné.

Podľa návodu [Fondy](../donations/funds.md):

1. Otvorte každý fond a potvrďte, že nastavenie daňovej odpočítateľnosti je správne

:::info
Na potvrdeniach o daroch sa zobrazia iba dary pre fondy označené ako daňovo odpočítateľné. Ak by mal byť fond daňovo odpočítateľný, ale nie je tak označený, aktualizujte ho pred vygenerovaním výkazov.
:::

## Krok 4: Vygenerujte potvrdenia o daroch

Vytvorte oficiálne potvrdenia o daroch pre svojich darcov.

Podľa návodu [Potvrdenia o daroch](../donations/giving-statements.md):

1. Prejdite do sekcie **Donations > Giving Statements**
2. Vyberte rok z rozbaľovacieho zoznamu a prezrite si súhrnné štatistiky
3. Zvoľte spôsob sťahovania:
   - **Download ZIP** — jednotlivé súbory CSV, jeden pre každého darcu
   - **Print All** — zobrazenie vhodné na tlač, každé potvrdenie na novej strane, s logom vašej cirkvi v hornej časti (ak ste ho nahrali)

:::tip
Potvrdenia vygenerujte na začiatku januára, kým sú záznamy čerstvé. Získate tak čas na odstránenie prípadných problémov pred ich odoslaním.
:::

## Krok 5: Doručte potvrdenia darcom

Zabezpečte, aby sa potvrdenia dostali k vašim darcom.

1. Vytlačte a pošlite potvrdenia poštou alebo jednotlivé súbory CSV pošlite darcom e-mailom
2. Členovia si môžu svoju históriu darov pozrieť a potvrdenia vytlačiť aj sami na [B1.church alebo v aplikácii B1 App](../../b1-church/giving/donation-history.md)

## Hotovo!

Vaše ročné prehľady darov sú hotové. Darcovia majú svoje potvrdenia s nárokom na daňovú úľavu a vaše finančné záznamy za rok sú uzavreté.

## Súvisiace články

- [Import zo Stripe](../donations/stripe-import.md) — import online transakcií
- [Prehľady darov](../donations/donation-reports.md) — zobrazenie trendov a súčtov darov
- [Fondy](../donations/funds.md) — správa fondov a nastavení daňovej odpočítateľnosti
- [Potvrdenia o daroch](../donations/giving-statements.md) — generovanie ročných výkazov
- [Zaznamenávanie darov](../donations/recording-donations.md) — ručné zadanie darov v hotovosti alebo šekom
- [História darov (web)](../../b1-church/giving/donation-history.md) — samoobslužný prehľad pre členov
- [Sprievodca nastavením online darovania](./online-giving.md) — počiatočné nastavenie Stripe a darovania
