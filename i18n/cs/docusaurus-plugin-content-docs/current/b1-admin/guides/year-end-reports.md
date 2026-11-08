---
title: "Guía: Generar informes anuales de donaciones"
description: "En B1 Admin, finalice los registros de donaciones del año, verifique la configuración fiscal de los fondos y genere certificados de donación deducibles de impuestos para cada donante."
---

Lo siento, pero el texto de entrada está en inglés y mi respuesta debe estar en checo, así que aquí tienes la traducción correcta:

---
title: "Průvodce: Vytvoření ročních přehledů darů"
description: "V aplikaci B1 Admin dokončete záznamy o darech za rok, zkontrolujte daňová nastavení fondů a vygenerujte potvrzení o daru odpočitatelném z daní pro každého dárce."
---

# Vytvoření ročních přehledů darů

<div class="article-intro">

Projděte si roční postup dokončení záznamů o darech, ověření nastavení fondů a vytvoření potvrzení o daru odpočitatelném z daní pro každého dárce. Obvykle se to provádí na začátku ledna za předchozí kalendářní rok.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet B1 Admin s přístupem k finančním údajům
- Dary zaznamenané během roku (online přes Stripe a/nebo ručně zadané)
- Přístup k vašemu účtu Stripe, pokud přijímáte online dary

</div>

## Krok 1: Importujte poslední transakce Stripe

Ujistěte se, že jsou všechny online dary z konce roku ve vašem systému.

Postupujte podle průvodce [Import z Stripe](../donations/stripe-import.md):

1. Přejděte na Dary > Import ze Stripe
2. Vyberte časové období pokrývající konec roku (např. 1.–31. prosince)
3. Nejprve klikněte na Náhled a zkontrolujte údaje, poté klikněte na Importovat chybějící a dokončete import

:::warning
Tento import spusťte před vygenerováním potvrzení. Transakce, které neimportujete, se na potvrzeních dárců neobjeví.
:::

## Krok 2: Zkontrolujte přehledy darů

Před vygenerováním potvrzení ověřte, že jsou vaše záznamy správné.

Postupujte podle průvodce [Přehledy darů](../donations/donation-reports.md):

1. Zkontrolujte souhrnnou stránku darů za celý rok
2. Zkontrolujte součty podle fondů a porovnejte je s výpisy z účtu, abyste odhalili případné nesrovnalosti
3. V případě potřeby otevřete jednotlivé dávky a ověřte údaje o dárcích

## Krok 3: Ověřte daňový status fondů

Zkontrolujte, zda je nastavení odpočitatelnosti daní u každého fondu správné, aby byla potvrzení přesná.

Postupujte podle průvodce [Fondy](../donations/funds.md):

1. Otevřete každý fond a potvrďte, že nastavení odpočitatelnosti daní je správné

:::info
Na potvrzeních o darech se objeví pouze dary určené do fondů označených jako daňově odpočitatelné. Pokud by fond měl být daňově odpočitatelný, ale není tak označen, upravte jej před vygenerováním potvrzení.
:::

## Krok 4: Vygenerujte potvrzení o darech

Vytvořte oficiální potvrzení o darech pro své dárce.

Postupujte podle průvodce [Potvrzení o darech](../donations/giving-statements.md):

1. Přejděte na **Dary > Potvrzení o darech**
2. Vyberte rok z rozbalovací nabídky a zkontrolujte souhrnné statistiky
3. Zvolte způsob stažení:
   - **Stáhnout ZIP** — jednotlivé soubory CSV, jeden pro každého dárce
   - **Vytisknout vše** — tiskové zobrazení, každé potvrzení na nové stránce, s logem vašeho sboru nahoře (pokud jste jej nahráli)

:::tip
Potvrzení vygenerujte včas na začátku ledna, dokud jsou záznamy čerstvé. Získáte tak čas na odstranění případných problémů, než je rozešlete.
:::

## Krok 5: Rozešlete dárcům

Doručte potvrzení svým dárcům.

1. Vytiskněte a odešlete potvrzení poštou, nebo odešlete jednotlivé soubory CSV dárcům e-mailem
2. Členové si mohou také prohlédnout vlastní historii darů a vytisknout potvrzení na [B1.church nebo v aplikaci B1 App](../../b1-church/giving/donation-history.md)

## Hotovo!

Vaše roční přehledy darů jsou hotové. Dárci mají daňová potvrzení a vaše finanční záznamy jsou za rok uzavřeny.

## Související články

- [Import z Stripe](../donations/stripe-import.md) — import online transakcí
- [Přehledy darů](../donations/donation-reports.md) — zobrazení trendů a součtů darů
- [Fondy](../donations/funds.md) — správa fondů a nastavení daňové odpočitatelnosti
- [Potvrzení o darech](../donations/giving-statements.md) — vytvoření ročních potvrzení
- [Zaznamenání darů](../donations/recording-donations.md) — ruční zadání hotovostních darů a šeků
- [Historie darů (web)](../../b1-church/giving/donation-history.md) — přehled pro členy, samoobslužná služba
- [Průvodce nastavením online darování](./online-giving.md) — počáteční nastavení Stripe a darování
