---
title: "Raporty o účasti"
description: "Prehľad troch správ o účasti v B1 Admin (Trend účasti, Účasť v skupinách, Denná účasť v skupinách), čo každá zobrazuje, a postup ich spustenia a exportu."
---

# Raporty o účasti

<div class="article-intro">

B1 Admin poskytuje tri správy o účasti, ktoré vám pomôžu pochopiť, ako sa ľudia zapájajú do vašich bohoslužieb a skupín. Každá správa ponúka iný pohľad na údaje o účasti, od všeobecných trendov až po denné prehľady.

</div>

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Uistite sa, že sa účasť [sleduje dôsledne](../attendance/tracking-attendance.md) pre vaše bohoslužby a skupiny
- Uistite sa, že sú vaše [skupiny](../groups/creating-groups.md) a bohoslužby nastavené v B1 Admin
- Na prístup k správam potrebujete príslušné [oprávnenia](../settings/roles-permissions.md)

</div>

## Trend účasti

Správa Trend účasti zobrazuje, ako sa účasť na vašich bohoslužbách mení v čase.

1. Prejdite priamo na **admin.b1.church/reports/attendanceTrend** vo svojom prehliadači (správy nemajú položku v navigačnom menu – najjednoduchším spôsobom, ako sa k nej vrátiť, je uloženie adresy do záložiek). Rovnaká správa je aj na stránke Účasť: kliknite na **Všetky roky** a potom vyberte záložku **Trend účasti**.
2. Voliteľne vyberte **Pobočku**, **Bohoslužbu**, **Čas bohoslužby** alebo **Skupinu** a výsledky tým sfiltrujte.
3. Nastavte **Dátum začiatku** a **Dátum konca**. Správa predvolene pokrýva posledný rok, od jedného roka dozadu až po dnešok, pričom koncový dátum je zahrnutý celý. Kliknite na **Spustiť správu**.
4. Správa zobrazí stĺpcový graf a tabuľku celkového počtu návštev za každý týždeň. Každý týždeň je označený dátumom nedele daného týždňa a v stĺpci **Dátumy bohoslužieb** sú uvedené konkrétne dni daného týždňa, v ktorých bola zaznamenaná účasť (napríklad „9/27, 9/30“).

Táto správa je užitočná na identifikáciu vzorcov, ako sú sezónne poklesy, rast alebo vplyv špeciálnych podujatí.

## Účasť v skupinách

Správa Účasť v skupinách zobrazuje, kto sa zúčastnil jednotlivých stretnutí skupiny v zadanom období.

1. Prejdite priamo na **admin.b1.church/reports/groupAttendance** vo svojom prehliadači, alebo na stránke Účasť kliknite na **Všetky roky** a vyberte záložku **Účasť v skupinách**.
2. Voliteľne vyberte **Pobočku** a **Bohoslužbu**.
3. Nastavte **Dátum začiatku** a **Dátum konca**. Správa predvolene pokrýva obdobie od poslednej nedele po dnešok, pričom koncový dátum je zahrnutý celý.
4. Kliknite na **Spustiť správu**.

Výsledky sú zoskupené podľa dátumu stretnutia, potom podľa času bohoslužby a potom podľa skupiny, pričom pod každou skupinou sú uvedené osoby, ktoré sa zúčastnili. Časy bohoslužieb, skupiny aj mená sú zoradené abecedne. Vedľa mena každej osoby stĺpec **Prihlásený** zobrazuje čas, kedy bola jej účasť zaznamenaná (prázdne, ak nie je evidovaný žiadny čas), a stĺpec **Stav členstva** zobrazuje jej stav, napríklad Člen alebo Návštevník. Sú zahrnuté aj stretnutia skupín, ktoré sa nekonajú v čase žiadnej bohoslužby; zobrazujú sa bez času bohoslužby.

Ak chcete stiahnuť tabuľku, kliknite na **Možnosti sťahovania** a vyberte **Súhrn**. CSV súbor obsahuje:

- Jeden riadok za každého člena každej skupiny, ktorá sa stretla v zadanom období, zoradený podľa skupiny a potom podľa mena.
- Meno osoby a názov skupiny v prvých stĺpcoch.
- Jeden stĺpec pre každé datované stretnutie, pomenovaný podľa bohoslužby, času bohoslužby a dátumu (napríklad „Nedeľa - 9:00 (2026-09-27)“), pričom každá osoba je označená ako **prítomná** alebo **neprítomná**. Stretnutie bez času bohoslužby je pomenované iba podľa dátumu.

Túto správu použite na porovnanie účasti medzi skupinami a na zistenie, ktoré skupiny rastú alebo si vyžadujú pozornosť.

## Denná účasť v skupinách

Správa Denná účasť v skupinách (s názvom **Účasť v skupine podľa dňa**) poskytuje denný prehľad počtu osôb, ktoré sa zúčastnili jednej skupiny.

1. Prejdite priamo na **admin.b1.church/reports/dailyGroupAttendance** vo svojom prehliadači.
2. Pomocou rozbaľovacích ponúk **Pobočka**, **Bohoslužba** a **Čas bohoslužby** zúžte zoznam a potom vyberte **Skupinu**, ktorú chcete skontrolovať.
3. Spustite správu. Zobrazí sa zoznam každého dňa, kedy sa skupina stretla, od najstaršieho po najnovší, s **Dátumom** a počtom **Účastníkov** zaznamenaných v daný deň.

Táto správa poskytuje podrobné informácie, ktoré sú užitočné na pochopenie týždenných výkyvov alebo na identifikáciu konkrétnych dní s nezvyčajne vysokou alebo nízkou účasťou.

:::tip
Na všeobecný prehľad použite správu Trend účasti a na detailnú analýzu konkrétnych dátumov použite správu Denná účasť v skupinách.
:::

## Praktické využitie

- **Plánovanie** -- Využite trendy účasti na plánovanie sedenia, obsadenia a zdrojov pre nadchádzajúce bohoslužby.
- **Oslovovanie** -- Včas identifikujte klesajúce trendy účasti, aby ste mohli nadviazať kontakt s členmi.
- **Správy pre výbor** -- Zahrňte údaje o účasti do pravidelných správ pre vedenie a ukážte tak stav služby.
- **Hodnotenie podujatí** -- Porovnajte účasť pred a po špeciálnych podujatiach a zmerajte ich vplyv.

:::warning
Údaje o účasti sa zaznamenávajú prostredníctvom procesov prihlasovania do skupín a bohoslužieb. Ak sa účasť nesleduje dôsledne, vaše správy nebudú presne odrážať skutočnú účasť. Pokyny na nastavenie nájdete v časti [Sledovanie účasti](../attendance/tracking-attendance.md).
:::
