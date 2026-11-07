---
title: "Návod: Generovanie výročných prehľadov darov"
description: "V B1 Admin dokončite záznamy darov za rok, skontrolujte daňové nastavenia fondov a vygenerujte daňovo odpočítateľné výpisy darov pre každého darcu."
---

# Generovanie výročných prehľadov darov

<div class="article-intro">

Prejdite si výročný proces dokončenia záznamov o daroch, overenia nastavení fondov a vytvorenia výpisov o daroch odpočítateľných z dane pre každého darcu. Zvyčajne sa to robí na začiatku januára za predchádzajúci kalendárny rok.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet B1 Admin s finančným prístupom
- Dary zaznamenané počas roka (online cez Stripe a/alebo ručne zadané)
- Prístup k vášmu účtu Stripe, ak prijímate online dary

</div>

## Krok 1: Importujte posledné transakcie zo Stripe

Uistite sa, že sú všetky online dary z konca roka vo vašom systéme.

Podľa návodu [Import zo Stripe](../donations/stripe-import.md):

1. Prejdite na Donations > Stripe Import
2. Vyberte časové obdobie pokrývajúce koniec roka (napr. 1. december – 31. december)
3. Kliknite najprv na Preview, aby ste si import prezreli, a potom na Import Missing, aby ste ho dokončili

:::warning
Tento import spustite pred generovaním výpisov. Transakcie, ktoré neimportujete, sa na výpisoch darcov nezobrazia.
:::

## Krok 2: Skontrolujte prehľady darov

Pred generovaním výpisov overte, či sú vaše záznamy správne.

Podľa návodu [Prehľady darov](../donations/donation-reports.md):

1. Skontrolujte súhrnnú stránku darov za celý rok
2. Prejdite súčty podľa fondov a porovnajte ich s bankovými výpismi, aby ste odhalili prípadné nezrovnalosti
3. V prípade potreby kliknite na jednotlivé dávky a overte podrobnosti o darcoch

## Krok 3: Overte daňový štatút fondov

Uistite sa, že je nastavenie odpočítateľnosti dane pre každý fond správne, aby boli výpisy presné.

Podľa návodu [Fondy](../donations/funds.md):

1. Otvorte každý fond a potvrďte, že nastavenie odpočítateľnosti dane je správne

:::info
Na výpisoch o daroch sa zobrazia iba dary pre fondy označené ako odpočítateľné z dane. Ak by mal byť fond odpočítateľný z dane, ale nie je tak označený, pred generovaním výpisov ho upravte.
:::

## Krok 4: Vygenerujte výpisy o daroch

Vytvorte oficiálne výpisy o daroch pre vašich darcov.

Podľa návodu [Výpisy o daroch](../donations/giving-statements.md):

1. Prejdite na **Donations > Giving Statements**
2. Vyberte rok z rozbaľovacieho zoznamu a prezrite si súhrnné štatistiky
3. Vyberte spôsob sťahovania:
   - **Download ZIP** — samostatné súbory CSV, jeden pre každého darcu
   - **Print All** — zobrazenie vhodné na tlač, pričom každý výpis je na novej strane a na hornej časti je logo vašej cirkvi (ak ste ho nahrali)

:::tip
Výpisy generujte začiatkom januára, kým sú záznamy čerstvé. Získate tak čas na odstránenie prípadných problémov pred ich odoslaním.
:::

## Krok 5: Doručte darcom

Dostaňte výpisy k svojim darcom.

1. Vytlačte a pošlite výpisy poštou alebo posielajte jednotlivé súbory CSV darcom e-mailom
2. Členovia si môžu pozrieť vlastnú históriu darov a vytlačiť výpisy aj na [B1.church](../../b1-church/giving/donation-history.md) a v aplikácii [B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Hotovo!

Vaše výročné prehľady darov sú hotové. Darcovia majú svoje výpisy o daroch odpočítateľných z dane a vaše finančné záznamy sú za daný rok uzavreté.

## Súvisiace články

- [Import zo Stripe](../donations/stripe-import.md) — importujte online transakcie
- [Prehľady darov](../donations/donation-reports.md) — zobrazte trendy a súčty darov
- [Fondy](../donations/funds.md) — spravujte fondy a nastavenia odpočítateľnosti dane
- [Výpisy o daroch](../donations/giving-statements.md) — generujte výročné výpisy
- [Zaznamenávanie darov](../donations/recording-donations.md) — ručne zadajte hotovostné dary a dary šekom
- [História darov (web)](../../b1-church/giving/donation-history.md) — samoobslužné zobrazenie pre členov
- [Návod na nastavenie online darovania](./online-giving.md) — počiatočné nastavenie Stripe a darovania
