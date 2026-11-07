---
title: "Záznam auditu"
description: "Prezrite si záznam auditu v B1 Admin: kto sa prihlásil, upravil záznamy osôb alebo zmenil oprávnenia. Filtrované položky exportujte do CSV."
---

# Záznam auditu

<div class="article-intro">

Záznam auditu eviduje všetky významné akcie a zmeny vo vašom systéme na správu cirkvi. Použite ho na kontrolu prihlásení, sledovanie, kto vykonal zmeny v záznamoch osôb, sledovanie zmien oprávnení a na zachovanie zodpovednosti vo vašom tíme.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet B1 Admin s prístupom správcu servera
- Prejdite do **Nastavení**, kde nájdete Záznam auditu

</div>

## Zobrazenie záznamu auditu

1. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu B1 Admin) a rozbaľte **Nastavenia**.
2. Kliknite na **Záznam auditu**.
3. Záznam zobrazuje posledné položky v tabuľke s nasledujúcimi stĺpcami:
   - **Dátum** -- Kedy sa akcia vykonala.
   - **Kategória** -- Typ akcie (farebne odlíšený pre rýchlu orientáciu).
   - **Akcia** -- Čo sa vykonalo (napr. create, update, delete, login_success).
   - **Entita** -- Typ a ID záznamu, ktorého sa akcia týkala.
   - **IP adresa** -- IP adresa používateľa, ktorý akciu vykonal.
   - **Podrobnosti** -- Súhrn konkrétnych vykonaných zmien.

## Filtrovanie záznamu

Pomocou filtrov v hornej časti stránky zúžte výsledky:

- **Kategória** -- Filtrovanie podľa typu akcie:
  - **Všetky kategórie** -- Zobrazí všetko.
  - **Prihlásenie** -- Úspešné a neúspešné prihlásenia.
  - **Osoby** -- Vytváranie, úprava alebo mazanie záznamov osôb.
  - **Oprávnenia** -- Udelenie a odobratie oprávnení.
  - **Dary** -- Zmeny v záznamoch darov.
  - **Skupiny** -- Akcie správy skupín.
  - **Formuláre** -- Aktivita odoslania formulárov.
  - **Nastavenia** -- Zmeny konfigurácie.
- **Dátum od** -- Zobrazí položky od tohto dátumu.
- **Dátum do** -- Zobrazí položky až do tohto dátumu.

Po nastavení filtrov kliknite na **Hľadať**, aby sa výsledky aktualizovali.

## Pochopenie kategórií

Každá kategória je farebne odlíšená pre rýchlu identifikáciu:

- **Prihlásenie** -- Modrý štítok. Eviduje úspešné a neúspešné pokusy o prihlásenie.
- **Osoby** -- Fialový štítok. Eviduje vytváranie, úpravy a mazanie záznamov osôb.
- **Oprávnenia** -- Červený štítok. Eviduje, kedy sú prístupové práva udelené alebo odobraté.
- **Dary** -- Zelený štítok. Eviduje zmeny v záznamoch darov.
- **Skupiny** -- Sivý štítok. Eviduje operácie správy skupín.
- **Formuláre** -- Oranžový štítok. Eviduje aktivitu odosielania formulárov.
- **Nastavenia** -- Žltý štítok. Eviduje zmeny konfigurácie.

## Export záznamu

Keď sa zobrazia položky záznamu, objaví sa tlačidlo **Stiahnuť CSV**. Kliknutím exportujete aktuálne filtrované výsledky do tabuľkového súboru na offline kontrolu alebo archiváciu.

## Stránkovanie

Pomocou ovládacích prvkov stránkovania na spodku tabuľky prechádzajte výsledky. Počet položiek na stránku môžete nastaviť na 25, 50 alebo 100.

:::info
Položky záznamu auditu sa automaticky uchovávajú jeden rok. Položky staršie ako 365 dní sa odstránia, aby systém zostal výkonný.
:::

:::tip
Záznam auditu kontrolujte pravidelne, najmä po zaškolení nových členov tímu alebo po väčších zmenách konfigurácie. Pomáha včas odhaliť neočakávanú aktivitu.
:::

## Súvisiace články

- [Roly a oprávnenia](../settings/roles-permissions.md) -- Správa toho, kto má prístup k čomu
- [Zabezpečenie údajov](../settings/data-security.md) -- Ako sú vaše údaje chránené
- [Prehľad reportov](./index.md) -- Prehľad všetkých dostupných reportov
