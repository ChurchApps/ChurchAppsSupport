---
title: "Dávky darov"
description: "Zoskupte dary do dávok v B1 Admin, potom každú uzavrite, vytlačte alebo exportujte, aby súčty sedeli s vašimi bankovými vkladmi."
---

# Dávky darov

<div class="article-intro">

Dávky zoskupujú vaše dary, aby ich bolo jednoduchšie sledovať a zosúladiť. Typická dávka predstavuje jednu zbierku, napríklad nedeľnú obetu alebo špeciálnu udalosť. Používanie dávok vám pomáha udržiavať poriadok a uľahčuje overenie, či sa vaše záznamy zhodujú so skutočnými vkladmi.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Uistite sa, že ste [nastavili svoje fondy](funds.md), aby boli k dispozícii pri zaznamenávaní darov
- Na zobrazenie stránky Dávky potrebujete oprávnenie **Zobraziť súhrny darov**, **Upraviť dary** alebo **Zadávať dary** (pozrite si [Kto môže meniť dávku](#who-can-change-a-batch))

</div>

## Stránka Dávky

Keď prejdete na **Dary > Dávky**, uvidíte zoznam svojich dávok. Každý riadok zobrazuje:

- **Názov** -- označenie, ktoré ste dávke dali
- **Dátum** -- dátum zbierky
- **Dary** -- počet jednotlivých darov v dávke
- **Celkom** -- celková suma v eurách
- **Stav** -- **Otvorená** alebo **Uzavretá** (pozrite si [Uzavretie a opätovné otvorenie dávky](#closing-and-reopening-a-batch))

Nad zoznamom tlačidlá rokov umožňujú zobraziť iba dávky z jedného roka alebo všetky dávky, tlačidlo **Všetko**. Jednoriadkový súhrn ukazuje počet dávok, počet darov a celkovú sumu za zobrazené dávky.

## Vytvorenie novej dávky

1. Na hornej časti stránky kliknite na **Pridať dávku**.
2. Zadajte výstižný názov (napr. „Nedeľná obeta - 9. feb.“).
3. Vyberte dátum zbierky.
4. Kliknite na **Uložiť**.

Vaša nová dávka sa zobrazí v zozname, pripravená na pridávanie darov.

## Práca s dávkami

- **Zobrazenie darov** -- kliknite na názov dávky, aby sa otvorila a zobrazili sa všetky jednotlivé dary, ktoré obsahuje. Odtiaľ môžete dary pridávať, upravovať alebo odstraňovať, prípadne kliknúť na **Importovať CSV** a pridať veľa darov naraz z tabuľky (pozrite si [Import darov zo súboru CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Úprava údajov dávky** -- kliknite na tlačidlo **Upraviť** v riadku dávky a zmeňte jej názov alebo dátum. Dávku môžu odstrániť iba osoby s oprávnením **Upraviť dary**.
- **Triedenie** -- použite hlavičky stĺpcov na zoradenie dávok podľa názvu alebo dátumu.
- **Export** -- kliknite na **Exportovať** na hornej časti stránky a stiahnite zobrazené dávky ako tabuľku (CSV).
- **Neúspešné udalosti** -- ak váš platobný procesor nahlásil problémy, na hornej časti stránky sa zobrazí tlačidlo **Neúspešné udalosti** (s počtom nevyriešených udalostí). Kliknutím zobrazíte alebo skryjete zoznam udalostí pod dávkami.
- **Import zo Stripe** -- kliknite na **Importovať chýbajúce transakcie Stripe** na hornej časti stránky a otvorte nástroj [Import zo Stripe](stripe-import.md). Tlačidlo sa zobrazí iba vtedy, keď je platobným procesorom darov vašej cirkvi Stripe.

## Kto zadal jednotlivé dary

Každý dar zadaný do dávky zobrazuje pod menom darcu text **Zadal/a** a meno osoby, takže viete, kto dar zadal, bez potreby podpisového hárku. B1 to zaznamenáva automaticky podľa toho, kto je prihlásený, a neskoršia úprava daru tento údaj nemení. Dary importované pomocou **Importovať CSV** zobrazujú osobu, ktorá import spustila.

Online dary, dary pridané nástrojom [Import zo Stripe](stripe-import.md) a dary zadané pred pridaním tejto funkcie v novembri 2026 nezobrazujú meno.

## Uzavretie a opätovné otvorenie dávky

Keď sa dávka spočíta a vloží do banky, uzavrite ju, aby jej dary zostali presne také, aké boli, keď ste ju uzavreli.

1. Otvorte dávku.
2. Na hornej časti stránky kliknite na **Uzavrieť dávku**.

Štítok stavu vedľa názvu dávky sa zmení z **Otvorená** na **Uzavretá**, dávka zobrazí **Uzavretá** v stĺpci **Stav** na stránke Dávky a na hornej časti dávky sa zobrazí upozornenie, že je uzavretá. Kým je dávka uzavretá, osoby s oprávnením **Zadávať dary** ju môžu stále zobraziť, ale nemôžu pridávať, upravovať ani odstraňovať jej dary ani meniť jej názov alebo dátum.

Ak chcete vykonať zmeny, otvorte dávku a kliknite na **Znovu otvoriť dávku**. Nové dávky sú vždy na začiatku otvorené.

:::info
Tlačidlá **Uzavrieť dávku** a **Znovu otvoriť dávku** vidia iba osoby s oprávnením **Upraviť dary**. Ak je potrebná oprava, môžu tiež meniť dary v uzavretej dávke bez jej opätovného otvorenia.
:::

## Kto môže meniť dávku

Dve [oprávnenia rolí](../settings/roles-permissions.md) umožňujú niekomu pracovať s dávkami:

- **Upraviť dary** -- plný prístup: pridávanie a odstraňovanie dávok, ich uzatváranie a opätovné otváranie a pridávanie, úprava alebo odstraňovanie ľubovoľného daru, bez ohľadu na to, či je dávka otvorená alebo uzavretá.
- **Zadávať dary** -- pre tímy počítania a dobrovoľníkov, ktorí zapisujú obety. Môžu pridávať dávky a pridávať, upravovať alebo odstraňovať dary, ale iba kým je dávka otvorená. Nemôžu odstraňovať dávky, uzatvárať ich ani znovu otvárať, ani meniť dary, ktoré prišli cez online darovanie.

Niekto s oprávnením **Zadávať dary**, ale bez oprávnenia **Zobraziť súhrny darov**, vidí v ponuke B1 Admin položku **Dary**, ktorá ho priamo nasmeruje na stránku Dávky. Položky **Súhrn**, **Fondy**, **Kampane** a **Potvrdenia o daroch** sú pre neho skryté. Aby mohol otvoriť dávku a vidieť dary v nej, rola tiež potrebuje oprávnenie **Zobraziť dary**.

:::tip
Bežné nastavenie je rola „Tím počítania“ s oprávneniami **Zadávať dary** a **Zobraziť dary** a pokladník s oprávnením **Upraviť dary**, ktorý uzavrie každú dávku po zosúladení vkladu.
:::

## Tlač dávky

Otvorte dávku a nad zoznamom darov kliknite na **Tlačiť**, aby ste vytlačili papierovú kópiu pre svoj tím počítania alebo na účely evidencie vkladov. Výtlačok obsahuje:

- Hlavičku vašej cirkvi -- logo (**Logo pre svetlé pozadie** z [Web > Vzhľad](../website/appearance.md), ak ste ho nahrali) a pod ním názov vašej cirkvi -- potom názov dávky a dátum dávky
- Každý dar v dávke s menom darcu, údajom o tom, kto ho zadal, spôsobom platby, poznámkami, dátumom a sumou (vrátené dary sú prečiarknuté a označené ako vrátené)
- **Medzisúčty podľa fondov** -- celková suma darovaná na každý fond v dávke
- **Celkom za dávku** -- spoločná suma za celú dávku

Tlačidlo **Tlačiť** sa zobrazí až vtedy, keď dávka obsahuje aspoň jeden dar.

### Tlač viacerých dávok naraz

Ak chcete vytlačiť všetky dávky z určitého obdobia naraz -- napríklad všetky vklady z minulého mesiaca -- kliknite na **Tlačiť** na hornej časti stránky **Dávky**, vedľa tlačidla **Exportovať**. Otvorí sa stránka **Tlač dávok** s poľami **Dátum od** a **Dátum do**, ktoré zodpovedajú dávkam na obrazovke: od 1. januára do 31. decembra roka, ktorý ste vybrali, alebo od najskoršieho do najneskoršieho dátumu dávky, ak je vybraté **Všetko**. Ktorýkoľvek dátum môžete zmeniť a vybrať iný rozsah.

Každá dávka s dátumom v rozsahu (vrátane počiatočného a koncového dátumu) sa vytlačí v poradí podľa dátumu, po jednej dávke na stranu, s rovnakým rozložením ako pri tlači jednej dávky. Dávky bez darov sa vynechajú. Ak žiadna dávka v rozsahu nemá dary, zobrazí sa správa „Žiadne dávky s darmi v tomto rozsahu dátumov.“. Kliknutím na **Tlačiť** otvoríte tlačový dialóg prehliadača alebo kliknutím na **Zavrieť** sa vrátite do zoznamu dávok.

## Export dávky do QuickBooks Online

Otvorte dávku a kliknutím na **Exportovať pre QuickBooks** stiahnite dávku ako účtovný zápis, ktorý QuickBooks Online dokáže importovať (**Nastavenia > Importovať údaje > Účtovné zápisy**). Súbor obsahuje jedno debetné zaúčtovanie na účet **Undeposited Funds** vo výške celkovej sumy dávky a jedno kreditné zaúčtovanie za každý fond, pričom ako názov účtu sa použije názov daného fondu. QuickBooks počas importu požiada o priradenie týchto názvov k vášmu účtovnému rozvrhu, preto svoje fondy pomenujte rovnako, ako váš účtovník pomenúva účty príjmov, alebo ich pri importe namapujte iba raz.

:::tip
Názvy dávok píšte jednotne, aby ste ich neskôr ľahko našli. Uvedenie dátumu a typu zbierky (napr. „Nedeľné ráno - 2025-02-09“) pomôže udržať zoznam prehľadný, keď narastie.
:::

## Ďalšie kroky

Keď máte dávku, pozrite si [Zaznamenávanie darov](recording-donations.md), kde sa dozviete, ako do nej pridávať jednotlivé dary. Môžete tiež [importovať transakcie Stripe](stripe-import.md), aby sa dávky z online darovania vytvárali automaticky.
