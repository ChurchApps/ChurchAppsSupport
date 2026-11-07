---
title: "Zaznamenávanie darov"
description: "Zaznamenávajte dary v B1 Admin: vytvorte dávku a zadajte dary po jednom, importujte CSV alebo zapíšte jeden dar z profilu darcu."
---

# Zaznamenávanie darov

<div class="article-intro">

Zaznamenávanie darov v B1 Admin sa robí cez systém dávok (Batches). Vytvoríte dávku, ktorá predstavuje zbierku (napríklad nedeľnú obetu), a potom do nej pridávate jednotlivé dary. Vďaka tomu zostávajú záznamy o darovaniach prehľadné a ľahko sa dajú porovnať.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Nastavte si [fondy](funds.md), aby ste mohli dary priradiť k správnym kategóriám
- Vytvorte [dávku](batches.md), ktorá bude obsahovať dary, ktoré chcete zadať
- Uistite sa, že darcovia sú v [adresári osôb](../people/adding-people.md), aby ste ich pri zadávaní darov mohli vyhľadať
- Na zadávanie darov do dávky potrebujete oprávnenie **Upraviť dary**, alebo **Zadávať dary** spolu s **Zobraziť dary** (pozri [Kto môže meniť dávku](batches.md#who-can-change-a-batch))

</div>

## Vytvorenie dávky a pridanie darov

1. V **B1 Admin** otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte **Donations** a kliknite na **Batches**.
2. Kliknite na **Add Batch** v hornej časti stránky.
3. Zadajte názov dávky (napr. „Nedeľná obeta - 5. január“) a vyberte dátum. Kliknite na **Save**.
4. Vaša nová dávka sa zobrazí v zozname s nulovým počtom darov a sumou 0,00 $.
5. Kliknutím na **názov dávky** ju otvorte.

## Zadávanie jednotlivých darov

1. Na stránke detailu dávky sa vedľa zoznamu darov zobrazí panel na zadávanie. V časti **Select Person or Anonymous** zadajte meno darcu do vyhľadávacieho poľa, alebo kliknite na **Anonymous**. (Kliknutím na **Add Donation** v hornej časti stránky sa presuniete na tento panel.)
2. Po výbere osoby sa vo formulári zobrazia polia **Date**, **Method** (Check, Cash, Card alebo In-Kind), **Fund**, **Notes**, **Amount** a **Check #** (alebo **Last 4 digits** pri darách kartou, či **Item** na opis daru v naturáliách). Ak chcete vybrať iného darcu, kliknite na **Change** vedľa jeho mena.
3. Vyplňte údaje a kliknite na **Add Donation** (alebo stlačte Enter).
4. Dar sa pridá do zoznamu darov a formulár sa vynuluje, aby ste mohli zadať ďalší.

:::info
Ak je dávka [uzavretá](batches.md#closing-and-reopening-a-batch), panel na zadávanie a odkazy **Edit** sú skryté pre každého, kto nemá oprávnenie **Upraviť dary**, a v hornej časti dávky sa zobrazí upozornenie, že je uzavretá. Požiadajte niekoho s oprávnením **Upraviť dary**, aby ju znova otvoril.
:::

:::tip
Viacero darov môžete rýchlo zadať za sebou bez opustenia stránky dávky. Formulár sa po každom zápise vynuluje, takže môžete efektívne prechádzať balík šekov alebo obálok.
:::

## Import darov zo súboru CSV {#importing-donations-from-a-csv-file}

Ak sú vaše dary už v tabuľke, napríklad ako export z iného systému na evidenciu darov alebo ako tabuľka počítacieho tímu, môžete ich importovať do dávky namiesto toho, aby ste zadávali každý dar ručne.

1. Otvorte dávku a v hornej časti stránky kliknite na **Import CSV**. (Tlačidlo sa zobrazí, keď môžete dávku meniť a váš kostol má aspoň jeden [fond](funds.md).)
2. Kliknite na **Choose CSV File** a vyberte súbor. Súbor musí obsahovať riadok so záhlavím a stĺpce môžu byť v ľubovoľnom poradí:
   - **Amount** (povinný; funguje aj `Total`) -- Symboly meny a čiarky sa ignorujú, takže `$1,250.00` je v poriadku. Suma musí byť väčšia ako nula.
   - **Date** -- Použite formát ako `2026-10-25` alebo `10/25/2026`. Ak je pole prázdne, použije sa dátum dávky.
   - **Fund** -- Názov fondu, porovnávaný bez ohľadu na veľkosť písmen. Ak je pole prázdne, použije sa váš prvý fond.
   - **Method** -- **Check**, **Cash**, **Card** alebo **In-Kind**. Ak je pole prázdne, použije sa **Check**.
   - **Check Number** -- Číslo šeku (alebo iný údaj o platbe).
   - **Notes**
   - **Email**, **Name**, alebo **First Name** a **Last Name** -- Použijú sa na priradenie darcu k osobe vo vašej databáze. Meno zapísané ako „Smith, John“ sa načíta ako „John Smith“.
3. Skontrolujte náhľad. Každý riadok zobrazuje jeho číslo, darcu zo súboru, **Match**, fond a sumu:
   - Meno osoby znamená, že darca bol priradený. B1 najprv hľadá podľa e-mailu, potom podľa presnej zhody mena a iba vtedy, keď sa hodí presne jedna osoba.
   - **Not found — anonymous** znamená, že sa nenašla jediná zhoda. Dar sa importuje ako anonymný a do jeho poznámok sa pridá „Imported as:“ s menom darcu, aby ste ho mohli neskôr priradiť.
   - Červená správa, ako **Invalid amount**, **Unknown fund**, **Unknown method** alebo **Invalid date**, znamená, že tento riadok bude preskočený. Opravte súbor a vyberte ho znova, aby sa riadok zahrnul.
4. Kliknite na **Import** (tlačidlo zobrazuje, koľko riadkov sa importuje). Dary sa pridajú do dávky.

:::tip
Po importe kliknite na **Edit** pri ktoromkoľvek anonymnom darе a vyberte správnu osobu. Poznámka „Imported as:“ vám povie, od koho podľa súboru dar pochádza.
:::

## Zaznamenanie daru z osobného záznamu

Ak chcete zaznamenať jeden dar bez otvárania dávky, otvorte záznam darcu v sekcii **People** a kliknite na **Log a gift** (v súhrne darov alebo v zobrazení darov danej osoby).

1. Nastavte **Date** a **Amount**.
2. Vyberte **Fund** a **Method** (Check, Cash, Card alebo In-Kind) a v prípade potreby zadajte **Check #**, **Last 4 digits** alebo **Item** (pri darách v naturáliách).
3. Voliteľne pridajte **Notes** a potom kliknite na **Save**.

Dar sa uloží do dávky pre daný dátum. Ak pre tento dátum ešte neexistuje dávka, vytvorí sa automaticky a pomenuje sa podľa dátumu.

## Rozdelenie daru medzi viac fondov

Niekedy jeden darca v jednej transakcii prispeje do viacerých fondov. Postup:

1. Pod panelom na zadávanie kliknite na odkaz **full donation editor** (alebo kliknite na **Edit** pri existujúcom riadku daru).
2. V plnom editore pridajte sumy k rôznym fondom. Celková suma sa automaticky vypočíta zo súm jednotlivých fondov.
3. Kliknutím na **Save** aktualizujte dar.

:::info
Rozdeľovanie darov medzi fondy je bežné, keď darca vystaví jeden šek určený na viacero účelov, napríklad na Všeobecný fond a Misie.
:::

## Úprava alebo odstránenie darov

Ak chcete dar upraviť, kliknite na tlačidlo **Edit** v jeho riadku v dávke. Môžete zmeniť dátum, sumu, fond, spôsob platby (Check, Cash, Card alebo In-Kind) alebo akýkoľvek iný údaj. Pri dare v naturáliách editor označí pole s detailom ako **Item**, aby ste mohli opísať, čo bolo darované. Keď skončíte, kliknite na **Save**.

:::tip
Riadok pod názvom dávky v hornej časti stránky sa automaticky aktualizuje a zobrazuje dátum dávky, počet darov a celkovú sumu, ako pridávate alebo upravujete položky. Použite ho na porovnanie s vaším výpisom z vkladu.
:::

## Vrátenie daru

Ak bol darcovi omylom strhnutý poplatok alebo si žiada svoje peniaze späť, dokončený dar môžete vrátiť priamo z jeho obrazovky úprav, bez potreby ísť do panelu vašej platobnej brány.

1. Otvorte dar a kliknite na **Edit**.
2. Na konci formulára kliknite na tlačidlo **Refund** vedľa **Delete**.
3. Potvrďte dialógové okno: „Vrátiť túto platbu v plnej výške cez platobnú bránu? Túto akciu nie je možné vrátiť späť.“

Dar sa vráti v plnej výške cez pôvodnú platobnú bránu a v zoznamoch darov bude označený ako **Refunded**.

:::warning
Vrátenie je možné len v plnej výške -- z B1 Admin nie je možné vrátiť čiastočnú sumu. Po potvrdení sa vrátenie tiež nedá zrušiť.
:::

:::info
Tlačidlo **Refund** sa zobrazí len pri darách zaplatených online (majú transakciu v platobnej bráne) a ktoré majú stále stav **Complete**. Ručne zadané dary (hotovosť, šek) nemajú transakciu v bráne, ktorú by bolo možné vrátiť -- takéto dary upravte alebo odstráňte.
:::

## Tlač potvrdenia pre jeden dar

Keď niekto odovzdá šek, zaplatí za podujatie alebo tričko, alebo keď návštevná organizácia prinesie dar, môžete vytlačiť potvrdenie len pre tento jeden dar, namiesto celej dávky alebo ročného výpisu.

1. Otvorte dávku, ktorá obsahuje dar.
2. Vedľa **Edit** v riadku daru kliknite na **Receipt**. Môžete tiež kliknúť na **Receipt** v spodnej časti formulára Edit Donation.
3. Kliknite na **Print**, alebo na **Close** pre návrat.

Potvrdenie používa rovnaký formát ako výpis darov: názov vášho kostola a darcu (alebo „Anonymous“), dátum a spôsob daru, každý fond a sumu, poznámku, vašu poznámku k darom (Giving Note) a oficiálny blok potvrdenia, ak ste nastavili **Statement format** (pozri [Výpisy darov](giving-statements.md)). Číslo potvrdenia v tomto bloku je ID daru.

:::info
Text „žiadny tovar ani služby“ sa vytlačí iba vtedy, keď je každý fond pri tomto dare označený ako daňovo odpočítateľný. Ak akákoľvek časť daru išla do fondu, ktorý nie je daňovo odpočítateľný, napríklad poplatok za podujatie alebo nákup, tento text sa na potvrdení vynechá, aby pôsobilo ako platba, a nie ako charitatívny dar.
:::

:::tip
Online dary už automaticky dostávajú e-mail s poďakovaním, takže potvrdenie je užitočné najmä pri darách, ktoré zadávate ručne.
:::

## Ďalšie kroky

- Skontrolujte svoje záznamy pomocou [reportov darov](donation-reports.md), aby ste overili ich správnosť
- Na konci roka vygenerujte pre svojich darcov [výpisy darov](giving-statements.md)
