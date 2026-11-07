---
title: "Vyhledávání osob"
---

# Vyhledávání osob

<div class="article-intro">

Stránka **Osoby** zobrazuje adresář vašeho sboru jako prohledávatelný seznam domácností nebo jako řazenou tabulku jednotlivých osob. Můžete rychle najít kohokoli ze sboru, upravit, které informace se zobrazují, a exportovat výsledky. Efektivní vyhledávání je nezbytné pro každodenní administrativu sboru, jako je navazování kontaktu s návštěvníky, příprava kontaktních seznamů a správa záznamů o členech.

</div>

## Školicí video

<YouTube id="7Y-tN9RmnDQ" title="Vyhledávání osob a vytváření seznamů v B1" next="Vlastní pole, hromadné úpravy a export v B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s oprávněním k zobrazení osob. Pokud si nejste jisti svou úrovní přístupu, podívejte se na [Role a oprávnění](roles-permissions.md).
- Váš adresář sboru by měl obsahovat osoby. Pokud jste ještě nikoho nepřidali, podívejte se na [Přidání osob](adding-people.md) nebo [Import dat](importing-data.md).

</div>

## Domácnosti a zobrazení tabulky

Stránka Osoby uvádí váš adresář podle **domácností**, seskupených abecedně. Každý řádek zobrazuje fotografie domácnosti, její název (například „Rodina Novákova“) a jména všech jejích členů. Kliknutím na domácnost otevřete profil hlavy domácnosti, nebo kliknutím na jméno kteréhokoli člena otevřete profil dané osoby. Nad seznamem se zobrazuje počet domácností a osob, které jsou právě zobrazeny.

Pomocí přepínače **Zobrazit jako** nad seznamem přepínáte mezi **Domácnosti** a **Tabulka**. Zobrazení **Tabulka** uvádí jednu osobu na řádek a umožňuje řazení a výběr sloupců (viz níže). B1 si vaši volbu pamatuje na tomto zařízení.

V zobrazení **Tabulka** se pod jménem každé osoby zobrazuje její stav členství. Každý ze sedmi stavů má vlastní barvu, stejnou jako na profilu dané osoby. Pokud má někdo v domácnosti nastavenu roli **Dítě**, vedle stavu se zobrazí také štítek **Dítě**. Chcete-li někoho označit jako dítě, nastavte jeho roli v [panelu domácnosti](./adding-people.md#managing-households) na jeho profilu.

Ve výchozím nastavení stránka načte první část vašeho adresáře. Pokud máte více osob, klikněte pod seznamem na **Zobrazit všechny členy**, čímž načtete všechny.

## Rychlé vyhledávání

Pole **Najít domácnost nebo osobu** v horní části stránky Osoby vám umožní najít členy v reálném čase:

1. Klikněte do **vyhledávacího pole** v horní části stránky Osoby.
2. Začněte psát jméno.
3. Výsledky se budou automaticky filtrovat, jak píšete (je tu krátká prodleva asi půl sekundy, aby se vyhledávání nespouštělo při každém stisku klávesy).
4. Seznam pod polem se aktualizuje a zobrazí pouze odpovídající výsledky.

Kliknutím na **Vymazat** (pod vyhledávacím polem) resetujete vyhledávání a znovu zobrazíte celý adresář.

:::tip
Nemusíte stisknout Enter. Vyhledávání se spustí automaticky, jakmile přestanete psát.
:::

## Řazení výsledků

V zobrazení **Tabulka** jsou osoby seřazeny podle příjmení a poté podle křestního jména. Adresář můžete seřadit jinak kliknutím na libovolnou hlavičku sloupce:

1. Kliknutím na **hlavičku sloupce** (například **Jméno** nebo **E-mail**) seřadíte podle tohoto sloupce.
2. Kliknutím na tutéž hlavičku znovu obrátíte pořadí řazení.

Díky tomu snadno najdete osoby abecedně, podle věku nebo podle jakéhokoli jiného viditelného sloupce.

## Přizpůsobení sloupců

Není nutné mít najednou viditelné všechny informace. Můžete zvolit, které sloupce se v tabulce zobrazí:

1. Klikněte na ikonu **Vybrat sloupce** v záhlaví stránky Osoby. (Sloupce se týkají zobrazení **Tabulka**.)
2. Zaškrtnutím nebo odškrtnutím sloupců je zobrazíte nebo skryjete. Dostupné sloupce zahrnují:
   - **Fotografie**
   - **Jméno**
   - **E-mail**
   - **Telefon**
   - **Adresa**
   - **Datum narození**
   - **Věk**
   - **Pohlaví**
   - **Stav členství**
   - **Kampus**
   - **Datum přidání** -- kdy byl záznam osoby vytvořen
3. Tabulka se okamžitě aktualizuje podle vašeho výběru. Kliknutím na **Hotovo** zavřete dialog **Vybrat sloupce**.

### Zobrazení vlastních polí jako sloupců

Výběr sloupců má dvě karty: **Standardní** obsahuje výše uvedené vestavěné sloupce a **Vlastní** obsahuje [vlastní pole](../settings/custom-fields.md) vašeho sboru spolu s otázkami z jakýchkoli formulářů pro osoby. Zaškrtnutím vlastního pole na kartě **Vlastní** jej přidáte jako sloupec a hodnota každé osoby pro toto pole se zobrazí v tabulce. Hodnoty se zobrazují stejně jako na profilu dané osoby: pole Ano/Ne ukazují *Ano* nebo *Ne*, pole s výběrem z možností zobrazují popisek zvolené možnosti a data se zobrazují jako krátká data. Osoby bez hodnoty pro dané pole mají prázdnou buňku.


## Export výsledků vyhledávání

Aktuální výsledky vyhledávání můžete kdykoli stáhnout jako soubor CSV:

1. Použijte libovolné vyhledávání nebo filtry, které chcete.
2. Klikněte na tlačítko **Exportovat** v záhlaví stránky Osoby.
3. Soubor CSV se stáhne do vašeho počítače, připravený k otevření v Excelu, Tabulkách Google nebo jiné tabulkové aplikaci.

Další podrobnosti o exportu najdete v části [Export dat](./exporting-data.md).

:::tip
Pro pokročilejší dotazy -- například pro nalezení všech, kdo se neúčastnili za poslední tři měsíce -- zkuste funkci [AI vyhledávání](./ai-search.md), která umožňuje vyhledávat pomocí otázek v běžném jazyce.
:::

## Pokročilé vyhledávání

Pokročilé vyhledávání umožňuje sestavit přesné filtry kombinací podmínek. Otevřete jej kliknutím na **Pokročilé** pod vyhledávacím polem na stránce Osoby. Poté rozbalte kategorii a zaškrtněte pole, podle kterých chcete filtrovat (můžete kliknout na název pole nebo na jeho zaškrtávací políčko), a u každého pole zvolte operátor a hodnotu. Kategorie zahrnují **Jména**, **Demografie**, **Kontakt**, **Členství**, **Aktivita** (dary a účast) a **Vlastní pole**.

Chcete-li najít nové osoby, otevřete kategorii **Členství** a zaškrtněte **Datum přidání**. Výchozí operátor je **za posledních N dní** s vyplněnou hodnotou 30, takže jedním kliknutím najdete všechny osoby přidané za poslední měsíc. Počet dní můžete změnit nebo přepnout na *rovná se / po / před* a vybrat konkrétní datum. **Datum narození** a **Výročí** také nabízejí možnost **za posledních N dní**. Datum přidání se zaznamenává pouze u osob vytvořených od konce října 2026; u dříve přidaných osob datum chybí, takže je tento filtr nenajde.

Kategorie **Vlastní pole** uvádí [vlastní pole](../settings/custom-fields.md) vašeho sboru -- pole, která definujete v Nastavení pro sledování vlastních informací (například datum vypršení platnosti výpisu z rejstříku trestů). Nabízené operátory odpovídají typu každého pole: textová pole podporují *obsahuje / rovná se / začíná na / končí na*, číselná pole podporují porovnávací operátory, datová pole podporují *rovná se / po / před* a pole Ano/Ne a výběr z možností vám umožňují zvolit hodnotu. Jakékoli pole, podle kterého zde můžete filtrovat, lze uložit jako živý [seznam](./lists.md).

## Uložení vyhledávání jako seznamů

Po provedení vyhledávání se v záhlaví stránky Osoby objeví tlačítko **Uložit jako seznam**. Kliknutím na něj uložíte aktuální dotaz pod názvem a volitelnou kategorií, abyste jej mohli při dalších relacích okamžitě znovu načíst. Podrobnosti najdete v části [Uložené seznamy](./lists.md).
