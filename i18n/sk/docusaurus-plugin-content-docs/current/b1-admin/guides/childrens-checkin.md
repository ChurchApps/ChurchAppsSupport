---
title: "Návod: Nastavenie detského check-in"
description: "Nastavte check-in detí v B1 Admin: prepojte rodiny, vytvorte skupiny podľa veku, nakonfigurujte bohoslužby a tlačte menovky pre kiosk B1 Checkin."
---

# Nastavenie detského check-in

<div class="article-intro">

Tento návod vás prevedie všetkým, čo potrebujete na spustenie systému detského check-in vo vašom kostole – od zadávania rodín do databázy, cez nastavenie skupín podľa veku, až po tlač menoviek v nedeľu ráno. Na konci budú rodičia môcť prihlásiť svoje deti na dotykovom tablete a dostanú zodpovedajúcu bezpečnostnú značku.

</div>

## Video na zaučenie

<YouTube id="Ep9CBUcJwPI" title="Nastavenie detského check-in v B1" next="Zaznamenávanie a sledovanie účasti v B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Pred začatím</h4>

- Vytvorte si účet vašej cirkvi na [admin.b1.church](https://admin.b1.church)
- Uistite sa, že máte správcovský prístup – ak je potrebné, pozrite si [Roly a oprávnenia](../people/roles-permissions.md)
- Voliteľné: Pripravte CSV súbor s rodinami, ak prechádzate z iného systému

</div>

## Krok 1: Pridajte rodiny do databázy

Skôr než môže check-in fungovať, systém musí poznať vaše rodiny. Každé dieťa musí byť prepojené s rodičom prostredníctvom funkcie domácností.

Podľa návodu [Pridávanie osôb](../people/adding-people.md) pridajte aspoň jednu rodinu. Dbajte na to, aby ste:

- Najprv pridali rodičov
- Pridali každé dieťa
- Prepojili ich v rovnakej domácnosti pomocou [editora domácností](../people/adding-people.md#managing-households)

:::tip
Ak máte viac ako zopár rodín, použite namiesto pridávania jednotlivo nástroj [import z CSV](../people/importing-data.md). Celý adresár môžete naimportovať za pár minút.
:::

## Krok 2: Vytvorte skupiny pre deti

Skupiny definujú triedy, do ktorých sa deti prihlasujú. Zvyčajne chcete jednu skupinu pre každú vekovú kategóriu.

Podľa návodu [Vytváranie skupín](../groups/creating-groups.md) vytvorte skupiny ako napríklad:

- **Škôlka** (vek 0–2)
- **Predškoláci** (vek 3–5)
- **Základná škola** (vek 6–10)

Názvy a vekové rozsahy môžete upraviť tak, aby zodpovedali štruktúre vašej služby deťom.

## Krok 3: Nastavte pobočky a bohoslužby

Check-in je viazaný na konkrétne časy bohoslužieb. Potrebujete aspoň jednu pobočku a jednu bohoslužbu.

Podľa návodu [Nastavenie účasti](../attendance/setup.md) urobte nasledovné:

1. Pridajte vašu pobočku (napr. „Hlavná budova“)
2. Pridajte bohoslužbu (napr. „Nedeľné ráno“)
3. Nastavte čas bohoslužby (napr. „9:00“) a voliteľne [harmonogram check-in](../attendance/setup.md#setting-a-check-in-schedule), aby sa check-in automaticky otváral pred každou bohoslužbou a zatváral po nej
4. Priraďte skupiny pre deti k bohoslužbe

## Krok 4: Nastavte aplikáciu check-in

Teraz všetko prepojte inštaláciou aplikácie check-in na tablet.

1. Nainštalujte aplikáciu **B1 Checkin** – odkazy na stiahnutie nájdete v článku [Check-In](../attendance/check-in.md)
2. Prihláste sa svojimi prihlasovacími údajmi do B1 Admin
3. Vyberte vašu pobočku a čas bohoslužby

Podrobné kroky nastavenia nájdete v celom článku [Check-In](../attendance/check-in.md).

## Krok 5: Zabezpečte hardvér

Potrebujete tablet pre kiosk a voliteľne štítkovú tlačiareň Brother pre menovky.

Minimálne:
- **Jeden tablet Android alebo Amazon Fire** – pozrite si [odporúčané tablety](../attendance/check-in.md#recommended-hardware)
- **Jedna štítková tlačiareň Brother** – odporúčaná je QL-1110NWB pre podporu Bluetooth a WiFi
- **Štítky Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Aplikácia B1 Checkin je kompatibilná iba so štítkovými tlačiarňami Brother. Tlačiarne iných značiek nebudú fungovať.
:::

## Krok 6: Vykonajte skúšobný check-in

Pred nedeľným ránom si urobte skúšobný beh:

1. Otvorte aplikáciu B1 Checkin na vašom tablete
2. Vyberte vašu pobočku a správny čas bohoslužby
3. Vyhľadajte jednu z rodín, ktoré ste pridali
4. Prihláste dieťa a overte:
   - Že sa účasť zobrazuje v B1 Admin v sekcii **Účasť**
   - Ak používate tlačiareň, že sa menovka vytlačila správne

:::tip
Pred spustením zaškoľte dobrovoľníkov z uvítacieho tímu o procese check-in. Na to zvyčajne stačí krátky 5-minútový nácvik.
:::

## Hotovo!

Detský check-in vašej služby je pripravený. Rodičia môžu vyhľadať svoju rodinu, vybrať svoje deti a prihlásiť ich na kiosku. Účasť sa automaticky zaznamenáva v B1 Admin.

## Súvisiace články

- [Pridávanie osôb](../people/adding-people.md) – pridávajte ďalšie rodiny, ktoré prichádzajú
- [Vytváranie skupín](../groups/creating-groups.md) – spravujte skupiny pre deti
- [Nastavenie účasti](../attendance/setup.md) – nastavte pobočky a bohoslužby
- [Check-In](../attendance/check-in.md) – podrobné nastavenie aplikácie check-in a hardvéru
- [Sledovanie účasti](../attendance/tracking-attendance.md) – zobrazte správy o check-in
