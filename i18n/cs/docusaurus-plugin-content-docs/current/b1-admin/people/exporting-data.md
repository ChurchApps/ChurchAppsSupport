---
title: "Export údajů"
---

# Export údajů

<div class="article-intro">

B1 Admin vám umožňuje exportovat údaje vaší církve, abyste je mohli používat v tabulkách, sdílet s týmem nebo si je uložit jako zálohu. Ať už potřebujete rychlý seznam jmen a e-mailů, nebo úplný export databáze, máte k dispozici možnosti pro různé potřeby.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s oprávněním k zobrazení údajů, které chcete exportovat. Pokud si nejste jisti svou úrovní přístupu, podívejte se na [Role a oprávnění](roles-permissions.md).
- Pro úplný export databáze potřebujete přístup do sekce **Nastavení**.

</div>

## Export z stránky Lidé

Nejrychlejší způsob, jak exportovat adresář, je přímo ze stránky **Lidé**:

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře v B1 Admin), rozbalte **Lidé** a klikněte na **Lidé**.
2. Pomocí vyhledávacího pole nebo filtrů zúžte výsledky, které chcete exportovat (nebo ponechte bez filtru pro export všech). Tipy k filtrování najdete v části [Vyhledávání lidí](searching-people.md).
3. Klikněte na tlačítko **Export** v záhlaví stránky Lidé.
4. Do počítače se stáhne soubor CSV s lidmi, kteří jsou aktuálně ve výsledcích, včetně jména, kontaktních údajů, adresy a dalších standardních polí.

:::tip
Export obsahuje všechny osoby v aktuálních výsledcích. Nejprve spusťte vyhledávání, načtěte [uložený seznam](./lists.md) nebo použijte pokročilé vyhledávání **Advanced**, abyste exportovali pouze osoby, které potřebujete.
:::

## Úplný export dat z Nastavení

Pro úplný export všech dat B1 (nejen osob) použijte nástroj pro export v Nastavení:

1. V nabídce Jump zvolte **Settings > Settings** (Nastavení > Nastavení).
2. Klikněte na odkaz **Import/Export** pod názvem vaší církve v horní části levé nabídky nastavení.
3. V rozbalovacím seznamu **Data Source** (Zdroj dat) vyberte **B1 Database** (Databáze B1).
4. Zkontrolujte náhled dat a klikněte na **Continue to Destination** (Pokračovat k cíli).
5. Jako cíl exportu vyberte **B1 Export Zip** (Archiv ZIP B1 Export).
6. Sledujte průběh exportu, dokud všechny položky nezobrazí zelené fajfky.
7. Soubor exportu se automaticky stáhne. Hledejte soubor `B1Export` ve složce Stažené soubory.
8. Rozbalte soubor a získáte jednotlivé soubory CSV (například `people.csv`), které můžete otevřít v Excelu, Tabulkách Google nebo Numbers.

:::info
Archiv B1 Export Zip je úplná záloha dat vaší církve. Obsahuje:

- osoby (včetně fotografií) a domácnosti, včetně kontaktů pro vyzvednutí dětí z domácnosti
- kampusy, bohoslužby a časy bohoslužeb
- skupiny a členy skupin
- fondy a dary, včetně darů rozdělených mezi více fondů
- docházku
- formuláře, otázky, odeslání a odpovědi
- vlastní pole a jejich hodnoty
- uložené seznamy osob

Pokud se fotografii osoby během exportu nepodaří stáhnout nebo přečíst, tato fotografie se přeskočí a export pokračuje bez ní.

Pro obnovení vyberte jako zdroj **B1 Import Zip** (Archiv ZIP B1 Import) a jako cíl **B1 Database** (Databáze B1) (viz [Import údajů](./importing-data.md)). Domácnosti, kontakty pro vyzvednutí a uložené seznamy se obnoví spolu s osobami. Filtry uložených seznamů se nasmérují na obnovené skupiny, fondy, kampusy a vlastní pole.
:::

## Export dat skupin

Členské seznamy jednotlivých skupin můžete exportovat také. Na stránce **Skupiny** otevřete skupinu a kliknutím na **ikonu stahování** exportujte seznam členů dané skupiny. Další podrobnosti najdete v části [Členové skupiny](../groups/group-members.md).

:::info
Exportované soubory CSV fungují ve všech hlavních tabulkových aplikacích, včetně Microsoft Excel, Tabulek Google a Apple Numbers.
:::
