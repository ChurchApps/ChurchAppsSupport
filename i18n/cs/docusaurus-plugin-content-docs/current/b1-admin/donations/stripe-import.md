---
title: "Import ze Stripe"
description: "Stáhněte dary ze Stripe do B1 Admin s importem s náhledem, který označí každou platbu jako novou, už importovanou nebo přeskočenou."
---

# Import ze Stripe

<div class="article-intro">

Pokud přijímáte online dary přes Stripe, nástroj Import ze Stripe vám umožní načíst tyto transakce do B1 Admin, takže všechna vaše data o darech budou na jednom místě. Je to užitečné zejména pro dohledání transakcí, které se nesynchronizovaly automaticky.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [Nastavení online darování](online-giving-setup.md) a propojte svůj účet Stripe s B1 Admin. Položka nabídky **Import ze Stripe** a tlačítko na stránce Dávky se zobrazí pouze tehdy, když je platební brána vaší církve Stripe, a pouze uživatelům, kteří mohou upravovat dary
- Ověřte, že máte v přehledu Stripe dary za období, které chcete importovat

</div>

## Jak to funguje

Import probíhá ve dvou krocích: nejprve si zobrazíte náhled toho, co by se mělo importovat, a poté import potvrdíte. Tento postup se zkušebním během vám umožní vše zkontrolovat dříve, než se vytvoří jakákoli data.

## Import transakcí

1. V **B1 Admin** přejděte na **Dary > Import ze Stripe**. (Můžete také kliknout na **Importovat chybějící transakce Stripe** v horní části stránky **Dávky**.)
2. Otevře se stránka **Import ze Stripe**.
3. Vyberte **časové období** transakcí, které chcete importovat.
4. Klikněte na **Náhled** a spusťte kontrolu bez zápisu.

## Kontrola náhledu

Náhled zobrazuje každou transakci ze Stripe spolu s indikátorem stavu:

- **Nová** -- tato transakce ještě nebyla importována a bude zahrnuta, pokud budete pokračovat.
- **Již importována** -- tato transakce již v B1 Admin existuje a bude přeskočena.
- **Přeskočeno** -- tato transakce byla vyloučena z jiného důvodu (např. vrácená nebo neúspěšná platba).

Souhrnná sekce v horní části ukazuje celkový počet transakcí v každé kategorii a příslušné částky.

:::info
Krok náhledu nevytváří žádné záznamy. Je to pouze kontrola pro čtení, abyste si mohli ověřit, co se stane, dříve než import potvrdíte.
:::

## Dokončení importu

1. Zkontrolujte výsledky náhledu a souhrnné součty.
2. Klikněte na **Importovat chybějící**, čímž naimportujete všechny transakce označené jako **Nová**.
3. Po dokončení importu se stavové štítky u každé transakce aktualizují a zobrazí výsledek.

## Tipy pro použití Importu ze Stripe

- Import spouštějte pravidelně (týdně nebo měsíčně), aby byly vaše záznamy aktuální.
- Pokud transakce zobrazuje stav **Již importována**, znamená to, že B1 Admin již obsahuje odpovídající záznam -- není třeba žádný zásah.
- Pokud hledáte konkrétní transakce, použijte filtr časového období a zaměřte se na určité období.

:::tip
Po importu si otevřete stránku [Dávky](batches.md) a ověřte, že se importované dary zobrazují správně a že součty odpovídají tomu, co vidíte v přehledu Stripe.
:::

## Další kroky

- Přečtěte si [Přehledy darů](donation-reports.md) a zkontrolujte importované transakce spolu s ostatními údaji o darech
- Ujistěte se, že importované dary jsou přiřazeny ke správným [fondům](funds.md), aby byla [potvrzení o darech](giving-statements.md) přesná
