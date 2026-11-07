---
title: "Priradenie rolí"
description: "Priraďujte roly v B1 Admin, aby zamestnanci a dobrovoľníci mali prístup len k oblastiam ľudí, darov, účasti a skupín, ktoré potrebujú."
---

# Priradenie rolí

<div class="article-intro">

B1 Admin používa systém oprávnení založený na rolách, ktorý kontroluje, čo môže každý používateľ vo vašom tíme vidieť a robiť. Priradením rolí môžete dať zamestnancom a dobrovoľníkom prístup presne k tým oblastiam, ktoré potrebujú – nič viac. Správna správa rolí chráni údaje vašej cirkvi a zároveň umožňuje vášmu tímu pracovať efektívne.

</div>

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Potrebujete prístup **Domain Admin** alebo rolu s oprávnením spravovať **Nastavenia** v B1 Admin.
- Ľudia, ktorým chcete priradiť roly, musia už existovať vo vašom adresári. Ak ich ešte potrebujete pridať, pozrite si [Pridanie osôb](adding-people.md).

</div>

## Pochopenie rolí

Rola je súbor oprávnení, ktoré priradíte jednému alebo viacerým používateľom. Môžete napríklad vytvoriť rolu „Finančný tím“, ktorá udelí prístup k [záznamom darov](../donations/recording-donations.md), alebo rolu „Dobrovoľník pri check-in“, ktorá umožní prístup iba k [funkciám dochádzky](../attendance/check-in.md).

Každá rola riadi prístup k určitým oblastiam B1 Admin, vrátane:

- **Osoby** – prezeranie a úprava profilov členov. Sekcia Poznámky v zázname osoby vyžaduje oprávnenie **Upraviť osoby** a samostatné oprávnenie **Zobraziť dôverné poznámky** riadi prístup k sekcii Dôverné poznámky (pre pastoračnú starostlivosť, osobnú históriu a podobné citlivé poznámky). **Zobraziť len mená osôb** umožňuje vyhľadávať osoby podľa mena (vidieť iba meno, fotografiu a stav členstva) bez prístupu k úplnému adresáru. V kombinácii s oprávnením **Zobraziť dochádzku** alebo **Upraviť dochádzku** môže dobrovoľník otvoriť **Skupiny** a zobraziť zoznamy tried podľa mien; s oprávnením **Upraviť dochádzku** môže navyše [zaznamenávať dochádzku](../attendance/recording-attendance.md). Pozrite si [Mená osôb len na zobrazenie](../settings/roles-permissions.md#people-names-only).
- **Dary** – správa príspevkov a finančných prehľadov. **Zadávať dary** je užšia možnosť pre počítacie tímy: umožňuje zadávať dary, ale iba do [dávok](../donations/batches.md#who-can-change-a-batch), ktoré sú ešte otvorené.
- **Dochádzka** – zaznamenávanie a prezeranie údajov o dochádzke
- **Formuláre** – vytváranie a správa [vlastných formulárov](../forms/creating-forms.md)
- **Skupiny** – správa [členstiev v skupinách](../groups/group-members.md) a kalendárov
- **Nastavenia** – konfigurácia nastavení platných pre celú cirkev

:::warning
**Domain Admins** majú úplný prístup ku každej oblasti B1 Admin. Ich oprávnenia nemožno upravovať ani obmedzovať. Túto rolu používajte iba pre svojich hlavných administrátorov.
:::

## Zobrazenie a správa rolí

1. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu B1 Admin) a rozbaľte **Nastavenia**.
2. Kliknite na **Roly**.
3. Zobrazí sa zoznam všetkých rolí nastavených pre vašu cirkev so stĺpcom **Členovia**, ktorý ukazuje, koľko používateľov je v každej role.
4. Kliknutím na ľubovoľnú rolu zobrazíte jej členov a oprávnenia.

## Pridanie používateľov do roly

1. V ponuke Jump vyberte **Nastavenia > Roly**.
2. Kliknite na rolu, do ktorej chcete pridať používateľa.
3. V sekcii **Členovia** vyhľadajte osobu podľa mena.
4. Kliknutím na **Pridať** ju priradíte k role.

Používateľ bude mať všetky oprávnenia spojené s touto rolou pri ďalšom prihlásení.

## Úprava oprávnení roly

1. V ponuke Jump vyberte **Nastavenia > Roly**.
2. Kliknite na rolu, ktorú chcete upraviť.
3. V sekcii **Oprávnenia** zaškrtnite alebo odškrtnite oblasti, ku ktorým má mať rola prístup. Každá skupina oprávnení zobrazuje, koľko jej oprávnení je zaškrtnutých (napríklad **2 z 5**).
4. Každá zmena sa uloží hneď, ako zaškrtnete alebo odškrtnete políčko.

:::tip
Dodržiavajte princíp najmenších oprávnení – každej role udeľte iba tie oprávnenia, ktoré naozaj potrebuje. Tým zostanú vaše údaje v bezpečí a znižuje sa riziko náhodných zmien.
:::

## Bežné príklady rolí

- **Kancelárski zamestnanci** – prístup k Osobám, Darom, Dochádzke a Formulárom
- **Vedúci skupín** – prístup iba k [Skupinám](../groups/creating-groups.md)
- **Dobrovoľníci pri check-in** – oprávnenie pre dochádzku **Checkin**, ktoré potrebuje účet prihlásený na [check-in kiosk](../attendance/check-in.md)
- **Finančný tím** – prístup k [Darom](../donations/recording-donations.md) a reportingu
- **Počítací tím** – **Zadávať dary** a **Zobraziť dary**, aby dobrovoľníci mohli zapisovať obetu do otvorených dávok bez toho, aby videli súhrny darov

Podrobnejší pohľad na oprávnenia týkajúce sa darov a osôb nájdete v časti [Roly a oprávnenia](../settings/roles-permissions.md).
