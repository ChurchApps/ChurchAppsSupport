---
title: "Dávky darů"
---

# Dávky darů

<div class="article-intro">

Dávky slouží k seskupení darů, aby se snáze sledovaly a porovnávaly. Typická dávka odpovídá jedné sbírce, například nedělní obětině nebo mimořádné akci. Díky dávkám zůstane evidence přehledná a snadno se ověří, zda odpovídá skutečným vkladům.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ujistěte se, že jste [nastavili fondy](funds.md), aby byly k dispozici při zaznamenávání darů
- Pro zobrazení stránky Dávky potřebujete oprávnění **Zobrazit souhrny darů**, **Upravit dary** nebo **Zadávat dary** (viz [Kdo může měnit dávku](#who-can-change-a-batch))

</div>

## Stránka Dávky

Když přejdete na **Dary > Dávky**, uvidíte seznam svých dávek. Každý řádek zobrazuje:

- **Název** -- štítek, který jste dávce přiřadili
- **Datum** -- datum sbírky
- **Dary** -- počet jednotlivých darů v dávce
- **Celkem** -- celková částka v korunách
- **Stav** -- **Otevřená** nebo **Uzavřená** (viz [Uzavření a znovuotevření dávky](#closing-and-reopening-a-batch))

Nad seznamem vám tlačítka s rokem umožní zobrazit pouze dávky z jednoho roku, nebo všechny dávky tlačítkem **Vše**. Jednořádkové shrnutí uvádí počet dávek, počet darů a celkovou částku za zobrazené dávky.

## Vytvoření nové dávky

1. Na začátku stránky klikněte na **Přidat dávku**.
2. Zadejte výstižný název (např. „Nedělní oběť – 9. 2.“).
3. Vyberte datum sbírky.
4. Klikněte na **Uložit**.

Nová dávka se objeví v seznamu a můžete do ní začít přidávat dary.

## Práce s dávkami

- **Zobrazení darů** -- kliknutím na název dávky ji otevřete a uvidíte všechny jednotlivé dary, které obsahuje. Odtud můžete dary přidávat, upravovat nebo odebírat, případně kliknout na **Importovat CSV** a přidat mnoho darů najednou z tabulky (viz [Import darů ze souboru CSV](recording-donations.md#importing-donations-from-a-csv-file)).
- **Úprava údajů dávky** -- tlačítkem **Upravit** na řádku dávky změníte její název nebo datum. Dávku může smazat pouze osoba s oprávněním **Upravit dary**.
- **Řazení** -- pomocí záhlaví sloupců můžete dávky seřadit podle názvu nebo data.
- **Export** -- tlačítkem **Export** v horní části stránky stáhnete zobrazené dávky jako tabulku (CSV).
- **Neúspěšné události** -- pokud vaše platební brána nahlásila problémy, se tlačítkem **Neúspěšné události** (s počtem nevyřešených událostí) v horní části stránky zobrazí seznam. Kliknutím na něj seznam pod dávkami zobrazíte nebo skryjete.
- **Import ze Stripe** -- tlačítkem **Importovat chybějící transakce Stripe** v horní části stránky otevřete nástroj [Import ze Stripe](stripe-import.md). Tlačítko se zobrazí pouze tehdy, když je platební brána pro dary vaší církve Stripe.

## Kdo dar zadal

U každého daru zadaného do dávky se pod jménem dárce zobrazí **Zadal** a jméno osoby, která jej zapsala. Díky tomu poznáte, kdo dar zadal, bez nutnosti podpisového archu. B1 to zaznamenává automaticky podle toho, kdo je právě přihlášen, a pozdější úprava daru tento údaj nemění. Dary přidané pomocí **Importovat CSV** zobrazují osobu, která import spustila.

Online dary, dary přidané nástrojem [Import ze Stripe](stripe-import.md) a dary zadané před zavedením této funkce v listopadu 2026 jméno nezobrazují.

## Uzavření a znovuotevření dávky

Jakmile je dávka spočítána a uložena na účet, uzavřete ji, aby její dary zůstaly přesně takové, jaké byly v okamžiku uzavření.

1. Otevřete dávku.
2. V horní části stránky klikněte na **Uzavřít dávku**.

Štítek stavu vedle názvu dávky se změní z **Otevřená** na **Uzavřená**, na stránce Dávky se ve sloupci **Stav** zobrazí **Uzavřená** a v horní části dávky se objeví upozornění, že je uzavřena. Osoby s oprávněním **Zadávat dary** mohou uzavřenou dávku stále zobrazit, ale nemohou přidávat, upravovat ani mazat její dary či měnit její název nebo datum.

Chcete-li dávku znovu upravovat, otevřete ji a klikněte na **Znovu otevřít dávku**. Nové dávky jsou vždy otevřené.

:::info
Tlačítka **Uzavřít dávku** a **Znovu otevřít dávku** vidí pouze osoby s oprávněním **Upravit dary**. Pokud je potřeba provést opravu, mohou i v uzavřené dávce upravit dary, aniž by ji museli znovu otevřít.
:::

## Kdo může dávku měnit

Dvě [oprávnění rolí](../settings/roles-permissions.md) umožňují práci s dávkami:

- **Upravit dary** -- plný přístup: přidávat a mazat dávky, uzavírat a znovu otevírat je a přidávat, upravovat nebo mazat libovolný dar, ať je dávka otevřená, nebo uzavřená.
- **Zadávat dary** -- pro počítací týmy a dobrovolníky, kteří zapisují obětiny. Mohou přidávat dávky a přidávat, upravovat nebo mazat dary, ale pouze tehdy, když je dávka otevřená. Nemohou mazat dávky, uzavírat je ani znovu otevírat, ani měnit dary, které přišly prostřednictvím online darování.

Osoba s oprávněním **Zadávat dary**, ale bez oprávnění **Zobrazit souhrny darů**, vidí v nabídce B1 Admin položku **Dary**, která ji přímo přesměruje na stránku Dávky. Položky **Souhrn**, **Fondy**, **Kampaně** a **Potvrzení o darech** jsou pro ni skryté. Aby mohla otevřít dávku a zobrazit dary v ní, potřebuje roli také oprávnění **Zobrazit dary**.

:::tip
Častým nastavením je role „Počítací tým“ s oprávněními **Zadávat dary** a **Zobrazit dary** a pokladník s oprávněním **Upravit dary**, který po vyrovnání vkladu každou dávku uzavře.
:::

## Tisk dávky

Otevřete dávku a nad seznamem darů klikněte na **Tisk**. Vytisknete tak papírovou kopii pro počítací tým nebo pro účetní záznamy o vkladu. Výtisk obsahuje:

- Hlavičku vaší církve -- vaše logo (**Logo pro světlé pozadí** z [Web > Vzhled](../website/appearance.md), pokud jste nějaké nahráli) s názvem církve pod ním -- poté název dávky a datum dávky
- Každý dar v dávce, včetně jména dárce, osoby, která dar zadala, způsobu platby, poznámek, data a částky (vrácené dary jsou přeškrtnuté a označené jako vrácené)
- **Mezisoučty podle fondů** -- celková částka darovaná do každého fondu v dávce
- **Celkem za dávku** -- součet za celou dávku

Tlačítko **Tisk** se zobrazí až tehdy, když dávka obsahuje alespoň jeden dar.

### Tisk více dávek najednou

Chcete-li vytisknout všechny dávky z určitého období najednou -- například všechny vklady za minulý měsíc -- klikněte na stránce **Dávky** v horní části vedle tlačítka **Export** na **Tisk**. Otevře se stránka **Tisk dávek** s polem **Datum od** a **Datum do**, které odpovídají dávkám na obrazovce: od 1. ledna do 31. prosince vybraného roku, nebo od nejstaršího do nejnovějšího data dávky, pokud je vybráno **Vše**. Jedno z těchto dat můžete změnit a zvolit jiné období.

Každá dávka s datem v zadaném období (včetně počátečního a koncového data) se vytiskne v pořadí podle data, každá na samostatné stránce, ve stejném rozvržení jako tisk jedné dávky. Dávky bez darů se vynechají. Pokud žádná dávka v období nemá dary, zobrazí se hlášení „V tomto období datumu nejsou žádné dávky s dary.“ Kliknutím na **Tisk** otevřete tiskový dialog prohlížeče, nebo na **Zavřít** se vrátíte na seznam dávek.

## Export dávky do QuickBooks Online

Otevřete dávku a kliknutím na **Export pro QuickBooks** ji stáhněte jako účetní záznam, který lze importovat do QuickBooks Online (**Nastavení > Import dat > Journal Entries**). Soubor obsahuje jeden debetní zápis na účet **Undeposited Funds** ve výši celkové částky dávky a jeden kreditní zápis na každý fond, přičemž jako název účtu se použije název fondu. QuickBooks při importu požádá o přiřazení těchto názvů k vašemu účtovému rozvrhu, proto pojmenujte své fondy stejně, jak je pojmenovává váš účetní u výnosových účtů, nebo je jednou přiřaďte při importu.

:::tip
Pojmenovávejte dávky jednotně, aby se později snadno hledaly. Uvedení data a typu sbírky (např. „Nedělní dopolední – 2025-02-09“) udrží seznam přehledný i při jeho růstu.
:::

## Další kroky

Až budete mít dávku, přečtěte si [Zaznamenávání darů](recording-donations.md), kde se dozvíte, jak do ní přidávat jednotlivé dary. Také můžete [importovat transakce Stripe](stripe-import.md) a automaticky tak vytvářet dávky z online darů.
