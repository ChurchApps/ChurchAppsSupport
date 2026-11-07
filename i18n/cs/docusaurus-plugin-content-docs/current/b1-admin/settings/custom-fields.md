---
title: "Vlastní pole"
description: "Definujte v B1 Admin vlastní pole pro údaje o osobách, například platnost výpisu z rejstříku trestů nebo velikost trička, a filtrujte podle nich."
---

# Vlastní pole

<div class="article-intro">

**Vlastní pole** vám umožňují sledovat vlastní informace u každého záznamu osoby – věci, pro které B1 nemá vestavěné pole, například datum vypršení platnosti výpisu z rejstříku trestů, velikost trička nebo stav kurzu pro křest. Pole definujete jednou v Nastavení a poté u profilu každé osoby vyplníte hodnotu a můžete podle ní vyhledávat nebo sestavovat seznamy. Tím nahrazujete starší řešení, kdy se kvůli uložení jediného vlastního údaje vytvářel formulář pro členy.

</div>

## Školicí video

<YouTube id="yUfDEbp2HQ4" title="Vlastní pole, hromadné úpravy a export v B1" next="Vytváření skupin a přidávání členů v B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Než začnete</h4>

- Pro definování polí a vyplňování hodnot potřebujete oprávnění **Lidé** k úpravám a přístup do oblasti **Nastavení**. Hodnoty mohou vidět všichni, kdo mají oprávnění Lidé k zobrazení. Viz [Role a oprávnění](./roles-permissions.md).
- Než začnete, rozhodněte, co chcete sledovat, a který typ se nejlépe hodí (text, číslo, datum, ano/ne nebo výběr z nabídky).

</div>

## Otevření vlastních polí

V B1 Admin otevřete [rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), zvolte **Nastavení > Nastavení** a v seznamu vlevo klikněte na **Vlastní pole**, čímž se posunete do sekce **Vlastní pole**. Přímo se sem dostanete také na adrese **/settings/custom-fields**. Zobrazí se seznam všech definovaných polí s uvedeným **Názvem** a **Typem pole**. Pokud žádné pole zatím nevytvořilo, panel zobrazí hlášku *„Zatím nebyla přidána žádná vlastní pole.“*

## Přidání pole

1. Klikněte na **Přidat pole**.
2. V editoru, který se otevře vpravo, zadejte **Název** – toto je popisek, který zaměstnanci uvidí na profilech osob a při vyhledávání (například *Výpis z rejstříku trestů vyprší*).
3. Zvolte **Typ pole**:
   - **Textové pole** – volný krátký text.
   - **Celé číslo** – čísla bez desetinných míst (například počet).
   - **Desetinné číslo** – čísla, která mohou obsahovat desetinnou část.
   - **Datum** – kalendářní datum.
   - **Ano/Ne** – jednoduchá odpověď ano, nebo ne.
   - **Výběr z možností** – seznam na výběr. Při volbě tohoto typu se zobrazí **editor možností**, do kterého přidáte jednotlivé volby, ze kterých mohou lidé vybírat.
4. Klikněte na **Uložit**.

Pole je nyní dostupné na profilu každé osoby.

:::info
Typy polí jsou stejné jako typy u [otázek ve formulářích](../forms/creating-forms.md), takže se hodnoty v celém B1 chovají jednotně.
:::

## Úprava pole

Kliknutím na libovolný řádek pole v seznamu jej znovu otevřete v editoru. Změňte název, typ nebo možnosti a klikněte na **Uložit**.

:::warning
Změna **typu pole** u pole, které už obsahuje hodnoty (například z Textového pole na Datum), může ponechat dříve zadané hodnoty v formátu, který už neodpovídá novému typu. Typy měňte opatrně, jakmile zaměstnanci začali pole vyplňovat.
:::

## Smazání pole

Otevřete pole k úpravě a klikněte na **Smazat**. Budete požádáni o potvrzení: *„Opravdu chcete smazat toto vlastní pole? Jeho uložené hodnoty budou také odstraněny.“* Smazáním pole trvale odstraníte jak pole, tak **všechny hodnoty uložené u něj** u všech osob – tuto akci nelze vrátit zpět.

## Vyplňování hodnot u osoby

Jakmile existuje alespoň jedno vlastní pole, jeho hodnoty se zobrazí přímo vedle vestavěných údajů v záznamu každé osoby – zobrazíte je spolu s kontaktními údaji osoby na levé straně profilu a upravujete je ve stejném formuláři, který používáte pro ostatní údaje o osobě. Dokud nedefinujete první pole, nezobrazí se nic navíc.

1. Otevřete záznam osoby v sekci **Lidé**.
2. Klikněte na tlačítko **Upravit** na levé straně profilu, pod kontaktními údaji osoby.
3. Přejděte dolů do oblasti **Vlastní pole** na konci formuláře pro úpravy a vyplňte hodnotu pro každé pole. Každé pole zobrazuje vstup odpovídající svému typu – výběr data u polí Datum, rozbalovací nabídku ano/ne u polí Ano/Ne, seznam na výběr u Výběru z možností a podobně.
4. Klikněte na **Uložit**. Hodnoty vlastních polí se uloží spolu se zbytkem údajů o osobě.

Zpět na profilu se každé pole s hodnotou zobrazí pod kontaktními údaji osoby ve tvaru *Název pole: hodnota* (odpovědi Ano/Ne se zobrazují jako *Ano* nebo *Ne* a u Výběru z možností se zobrazí popisek zvolené možnosti). Prázdná pole se jednoduše skryjí. Chcete-li hodnotu odstranit, upravte osobu, vymažte pole a uložte – prázdná hodnota se ze záznamu odstraní, nikoli uloží jako prázdná.

:::tip
Klasickým případem použití je bezpečnost dobrovolníků: vytvořte pole typu **Datum** s názvem *Výpis z rejstříku trestů vyprší*, zapište u každého dobrovolníka jeho datum a poté sestavte [uložený seznam](../people/lists.md), který označí každého, u koho datum už uplynulo.
:::

## Vyhledávání a sestavování seznamů podle vlastních polí

Vlastní pole lze plně prohledávat:

1. Na stránce **Lidé** otevřete [pokročilé vyhledávání](../people/searching-people.md).
2. Rozbalte kategorii **Vlastní pole**.
3. Zaškrtněte pole, podle kterého chcete filtrovat, zvolte operátor a zadejte hodnotu. Nabízené operátory odpovídají typu pole:
   - **Textové pole** – obsahuje, je rovno, začíná na, končí na.
   - **Celé číslo / Desetinné číslo** – je rovno, je větší než, je větší nebo rovno, je menší než, je menší nebo rovno.
   - **Datum** – je rovno, je po (větší než), je před (menší než).
   - **Ano/Ne** – je rovno Ano, nebo Ne.
   - **Výběr z možností** – je rovno, nebo obsahuje jednu z voleb.

Libovolné vyhledávání podle vlastního pole lze uložit jako [seznam](../people/lists.md). Seznamy jsou živé dotazy, takže seznam sestavený podle *Výpis z rejstříku trestů vyprší je před dnešním dnem* při každém otevření znovu prověří všechny osoby – bez nutnosti ruční údržby.

## Zobrazení vlastního pole jako sloupce

Chcete-li najednou vidět hodnoty pole u všech osob, přidejte ho jako sloupec na stránce **Lidé**. Přepněte **Zobrazit jako** na **Tabulka**, v záhlaví stránky klikněte na ikonu **Vybrat sloupce**, přepněte na kartu **Vlastní** a zaškrtněte dané pole. Hodnota každé osoby se zobrazí v samostatném sloupci vedle vestavěných sloupců. Viz [Zobrazení vlastních polí jako sloupců](../people/searching-people.md#showing-custom-fields-as-columns).

## Co se stane při sloučení

Když [sloučíte dva záznamy osob](../people/adding-people.md), hodnoty vlastních polí se přenesou automaticky. Osoba, kterou ponecháte, si zachová své vlastní hodnoty; u každého pole, u kterého měla hodnotu pouze odstraněná osoba, se tato hodnota zkopíruje, takže se nic neztratí.

## Související články

- [Vyhledávání osob](../people/searching-people.md) – pokročilé vyhledávání, včetně kategorie Vlastní pole, a zobrazení vlastních polí jako sloupců
- [Uložené seznamy](../people/lists.md) – uložení vyhledávání podle vlastního pole a jeho opětovné živé spuštění
- [Role a oprávnění](./roles-permissions.md) – kdo může pole definovat a upravovat hodnoty
- [Vytváření formulářů](../forms/creating-forms.md) – pro sběr dat z více otázek, kde se celý formulář hodí lépe než jednotlivá pole
