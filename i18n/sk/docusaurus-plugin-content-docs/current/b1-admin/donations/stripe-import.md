---
title: "Stripe import"
description: "Importujte dary zo Stripe do B1 Admin s náhľadom pred importom, ktorý označí každú platbu ako novú, už importovanú alebo preskočenú, ešte pred potvrdením."
---

# Stripe import

<div class="article-intro">

Ak prijímate online dary cez Stripe, nástroj Stripe Import vám umožní preniesť tieto transakcie do B1 Admin, aby sa všetky vaše údaje o darovaní nachádzali na jednom mieste. Je to užitočné najmä vtedy, keď chcete zachytiť transakcie, ktoré sa nesynchronizovali automaticky.

</div>

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Dokončite [nastavenie online darovania](online-giving-setup.md), aby ste prepojili svoj účet Stripe s B1 Admin. Položka ponuky **Stripe Import** a tlačidlo na stránke Dávky sa zobrazia iba vtedy, keď je platobná brána darovania vašej cirkvi nastavená na Stripe, a iba pre osoby, ktoré môžu upravovať dary
- Overte, či máte v Stripe dashboarde dary za obdobie, ktoré chcete importovať

</div>

## Ako to funguje

Proces importu prebieha v dvoch krokoch: najprv si zobrazíte náhľad toho, čo sa bude importovať, a potom import potvrdíte. Tento prístup so skúšobným behom vám umožní všetko skontrolovať skôr, než sa vytvoria akékoľvek údaje.

## Import transakcií

1. V **B1 Admin** prejdite na **Dary > Stripe Import**. (Môžete tiež kliknúť na **Importovať chýbajúce transakcie Stripe** v hornej časti stránky **Dávky**.)
2. Otvorí sa stránka **Stripe Import**.
3. Vyberte **časové obdobie** transakcií, ktoré chcete importovať.
4. Kliknutím na **Náhľad** spustite kontrolu bez zápisu údajov.

## Kontrola náhľadu

Náhľad zobrazuje každú transakciu zo Stripe spolu s indikátorom stavu:

- **Nová** -- táto transakcia ešte nebola importovaná a po pokračovaní sa zahrnie.
- **Už importovaná** -- táto transakcia už v B1 Admin existuje a bude preskočená.
- **Preskočená** -- táto transakcia bola vynechaná z iného dôvodu (napr. vrátená platba alebo neúspešná platba).

Súhrnná časť v hornej časti zobrazuje celkový počet transakcií v jednotlivých kategóriách a súvisiace sumy v dolároch.

:::info
Krok náhľadu nevytvára žiadne záznamy. Je to kontrola len na čítanie, vďaka ktorej si môžete overiť, čo sa stane, skôr než sa rozhodnete pokračovať.
:::

## Dokončenie importu

1. Skontrolujte výsledky náhľadu a súhrnné sumy.
2. Kliknutím na **Importovať chýbajúce** importujete všetky transakcie označené ako **Nová**.
3. Po dokončení importu sa štítky stavu vedľa každej transakcie aktualizujú a zobrazia výsledok.

## Tipy na používanie Stripe Import

- Import spúšťajte pravidelne (týždenne alebo mesačne), aby boli vaše záznamy aktuálne.
- Ak sa transakcia zobrazuje ako **Už importovaná**, znamená to, že B1 Admin už obsahuje zodpovedajúci záznam -- nie je potrebná žiadna ďalšia akcia.
- Ak hľadáte konkrétne transakcie, použite filter časového obdobia a zamerajte sa na konkrétne obdobie.

:::tip
Po importe si otvorte stránku [Dávky](batches.md) a overte, že sa importované dary zobrazujú správne a že súčty zodpovedajú tomu, čo vidíte vo svojom Stripe dashboarde.
:::

## Ďalšie kroky

- Pozrite si [Správy o darovaní](donation-reports.md), kde si môžete prezrieť importované transakcie spolu s ostatnými údajmi o darovaní
- Uistite sa, že importované dary sú priradené k správnym [fondom](funds.md), aby boli [výpisy o darovaní](giving-statements.md) presné
