---
title: "Průvodce: Vygenerování výročních přehledů darů"
description: "V B1 Admin dokončete roční záznamy darů, zkontrolujte daňová nastavení fondů a vygenerujte daňově odpočitatelná potvrzení o darech pro každého dárce."
---

# Vygenerování výročních přehledů darů

<div class="article-intro">

Projděte si roční postup, při kterém dokončíte záznamy o darech, ověříte nastavení fondů a vygenerujete daňově odpočitatelné přehledy darů pro každého dárce. Obvykle se to dělá na začátku ledna za předchozí kalendářní rok.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem k financím
- Dary zaznamenané v průběhu roku (online přes Stripe a/nebo ručně zadané)
- Přístup k vašemu účtu Stripe, pokud přijímáte online dary

</div>

## Krok 1: Import posledních transakcí ze Stripe

Ujistěte se, že jsou v systému všechny online dary z konce roku.

Podle návodu [Import ze Stripe](../donations/stripe-import.md) proveďte tyto kroky:

1. Přejděte do sekce Dary > Import ze Stripe
2. Vyberte časové období pokrývající konec roku (např. 1. prosince až 31. prosince)
3. Nejprve klikněte na Náhled a zkontrolujte údaje, poté klikněte na Importovat chybějící a import dokončete

:::warning
Tento import proveďte před vygenerováním přehledů. Transakce, které neimportujete, se na přehledech dárců neobjeví.
:::

## Krok 2: Zkontrolujte přehledy darů

Před vygenerováním přehledů ověřte, že jsou vaše záznamy správné.

Podle návodu [Přehledy darů](../donations/donation-reports.md) proveďte tyto kroky:

1. Zkontrolujte souhrnnou stránku darů za celý rok
2. Porovnejte součty podle fondů s výpisy z bankovního účtu a odhalte případné nesrovnalosti
3. Pokud je to potřeba, otevřete jednotlivé dávky a ověřte údaje o darech podle jednotlivých dárců

## Krok 3: Ověřte daňový status fondů

Zkontrolujte, zda je u každého fondu správně nastavena daňová odpočitatelnost, aby byly přehledy přesné.

Podle návodu [Fondy](../donations/funds.md) proveďte tyto kroky:

1. Otevřete každý fond a potvrďte, že je nastavení daňové odpočitatelnosti správné

:::info
Na přehledech darů se objeví pouze dary určené do fondů označených jako daňově odpočitatelné. Pokud by fond měl být daňově odpočitatelný, ale není tak označen, upravte jej před vygenerováním přehledů.
:::

## Krok 4: Vygenerujte přehledy darů

Vytvořte pro své dárce oficiální přehledy darů.

Podle návodu [Přehledy darů](../donations/giving-statements.md) proveďte tyto kroky:

1. Přejděte do **Dary > Přehledy darů**
2. Vyberte rok z rozbalovací nabídky a prohlédněte si souhrnné statistiky
3. Zvolte způsob stažení:
   - **Stáhnout ZIP** — jednotlivé soubory CSV, jeden pro každého dárce
   - **Vytisknout vše** — zobrazení pro tisk, kde je každý přehled na nové stránce, s logem vaší církve v záhlaví (pokud jste jej nahráli)

:::tip
Přehledy vygenerujte brzy v lednu, dokud jsou záznamy čerstvé. Budete tak mít čas odstranit případné problémy dříve, než je rozešlete.
:::

## Krok 5: Rozeslání dárcům

Doručte přehledy svým dárcům.

1. Přehledy vytiskněte a odešlete poštou, nebo jednotlivé soubory CSV rozešlete e-mailem
2. Členové si také mohou prohlédnout svou vlastní historii darů a tisknout přehledy na stránkách [B1.church](../../b1-church/giving/donation-history.md) a v aplikaci [B1 Mobile](../../b1-church/giving/donation-history.md)

## Hotovo!

Vaše výroční přehledy darů jsou hotové. Dárci mají daňově odpočitatelné přehledy a vaše finanční záznamy jsou za daný rok uzavřeny.

## Související články

- [Import ze Stripe](../donations/stripe-import.md) — import online transakcí
- [Přehledy darů](../donations/donation-reports.md) — zobrazení trendů a součtů darů
- [Fondy](../donations/funds.md) — správa fondů a nastavení daňové odpočitatelnosti
- [Přehledy darů](../donations/giving-statements.md) — vygenerování výročních přehledů
- [Zaznamenávání darů](../donations/recording-donations.md) — ruční zadání hotovostních darů a darů šekem
- [Historie darů (web)](../../b1-church/giving/donation-history.md) — samoobslužný přehled pro členy
- [Průvodce nastavením online darování](./online-giving.md) — počáteční nastavení Stripe a darování
