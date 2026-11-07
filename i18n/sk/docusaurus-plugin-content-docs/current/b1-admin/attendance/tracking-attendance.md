---
title: "Sledovanie účasti"
description: "Prehliadajte trendy účasti, filtrujte správy podľa kampusu, bohoslužby alebo skupiny a exportujte účasť skupín zo stránky Attendance v B1 Admin."
---

# Sledovanie účasti

<div class="article-intro">

Keď sú nastavené vaše kampusy, časy bohoslužieb a skupiny, B1 Admin vám uľahčí prehliadanie údajov o účasti a odhaľovanie trendov. Stránka Účasť sa otvorí so súhrnom účasti za tento týždeň a jej správy **Všetky roky** poskytujú dva hlavné pohľady: kartu **Trend účasti** pre celocirkevné trendy a kartu **Účasť v skupinách** pre podrobnosti na úrovni skupín. Tieto nástroje vám pomôžu pochopiť vzorce rastu, identifikovať klesajúcu angažovanosť a robiť rozhodnutia založené na údajoch pre vašu cirkev.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Štruktúra účasti musí obsahovať aspoň jeden kampus a jeden čas bohoslužby. Ak ste to ešte neurobili, pozrite si [Nastavenie účasti](setup.md).
- Údaje o účasti je potrebné zaznamenať skôr, než sa v správach zobrazia výsledky. Údaje môžu pochádzať z [manuálneho zadávania](recording-attendance.md) alebo z [samoprihlasovania](check-in.md).

</div>

## Zobrazenie trendov účasti

1. Otvorte **B1 Admin**, otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte **Ľudia** a kliknite na **Účasť**.
2. V ľavom stĺpci kliknite na **Všetky roky**. Karta **Trend účasti** je predvolene vybratá.
3. Správa sa spustí automaticky po otvorení karty a zobrazí celkovú účasť za každý týždeň.

:::tip
Na rýchly pohľad na aktuálny týždeň hlavná stránka Účasť zobrazuje, koľko ľudí je tento týždeň v miestnosti, rozdelenie podľa miestnosti (skupiny), počet hostí a 13-týždňový stĺpcový graf prihlásení. Nie je potrebná žiadna správa.
:::

## Filtrovanie údajov

Na zúženie výsledkov použite filtre v poli **Filtrovať správu** a potom kliknite na **Spustiť správu**:

- **Kampus** -- vyberte kampus, aby ste videli účasť iba na tomto mieste.
- **Bohoslužba** -- obmedzte správu na jednu bohoslužbu.
- **Čas bohoslužby** -- vyberte čas bohoslužby a zamerajte sa na konkrétne stretnutie.
- **Skupina** -- zobrazí účasť jednej skupiny.
- **Dátum začiatku** a **Dátum konca** -- časové obdobie, ktoré sa má zahrnúť. Predvolene správa pokrýva posledný rok, od pred jedného roka až po dnešok, pričom koncový dátum je zahrnutý celý.

Správa zobrazuje stĺpcový graf a tabuľku celkových návštev za každý týždeň. Každý týždeň je označený dátumom nedele daného týždňa. Tabuľka má tiež stĺpec **Dátumy stretnutí**, ktorý uvádza konkrétne dni daného týždňa s účasťou (napríklad „9/27, 9/30“). Vidíte tak, kedy sa stretnutie uprostred týždňa počíta do rovnakého týždňa ako nedeľa.

:::info
Správy sa automaticky spúšťajú pri každom otvorení karty Trend účasti, takže vždy uvidíte aktuálne čísla bez potreby klikať na tlačidlo obnovenia.
:::

## Účasť v skupinách

Karta **Účasť v skupinách** zobrazuje, kto sa zúčastnil jednotlivých stretnutí skupín. Je to užitočné, keď chcete sledovať konkrétny kurz, tím služby alebo malú skupinu, a nie celkové čísla bohoslužieb.

1. Na správach **Všetky roky** vyberte kartu **Účasť v skupinách**.
2. Voliteľne vyberte **Kampus** a **Bohoslužbu**.
3. Nastavte **Dátum začiatku** a **Dátum konca**. Predvolene správa pokrýva obdobie od poslednej nedele po dnešok.
4. Kliknite na **Spustiť správu**.

Výsledky sú zoskupené podľa dátumu stretnutia, potom podľa času bohoslužby a skupiny, pričom pod každou skupinou sú uvedení účastníci. Časy bohoslužieb, skupiny a mená sú zoradené abecedne, takže každý nadpis sa zobrazí iba raz. Riadok každej osoby tiež zobrazuje stĺpec **Prihlásený** s časom, kedy bola účasť zaznamenaná (prázdne, ak čas nie je uložený), a stĺpec **Stav členstva** (napríklad Člen alebo Návštevník), vďaka čomu rýchlo spoznáte hostí.

Na stiahnutie údajov kliknite na **Možnosti sťahovania** a vyberte **Súhrn**. CSV súbor obsahuje jeden riadok pre každého člena skupiny, zoradený podľa skupiny a potom podľa mena, a stĺpec pre každé stretnutie s dátumom v zadanom rozsahu (napríklad „Sunday - 9:00 AM (2026-09-27)“) označený ako **present** alebo **absent**.

:::tip
Účasť v skupinách je obzvlášť cenná pre vedúcich [malých skupín](../groups/creating-groups.md), ktorí chcú sledovať angažovanosť vo svojej skupine v čase.
:::

## Tipy na prácu s údajmi o účasti

- Trendy kontrolujte mesačne, aby ste včas zachytili sezónne vzorce.
- Porovnávajte údaje na úrovni kampusov, aby ste pochopili, ktoré miesta rastú.
- Použite správy na úrovni skupín, aby ste nadviazali kontakt so [skupinami](../groups/group-members.md), ktoré vykazujú klesajúcu účasť.
- Kombinujte prehľady účasti s nástrojom [AI vyhľadávanie](../people/ai-search.md) a nájdite ľudí, ktorí sa nedávno nezúčastnili.

## Súvisiace stránky

- [Zaznamenávanie účasti](recording-attendance.md) -- manuálne zadanie účasti na stretnutie skupiny
- [Zadávanie počtu osôb a trend](headcount-entry.md) -- jednoduchšia alternatíva s celkovým počtom a vlastným týždenným grafom trendu
- [Prihlasovanie](check-in.md) -- nastavenie samoprihlasovania, aby sa účasť zaznamenávala automaticky
