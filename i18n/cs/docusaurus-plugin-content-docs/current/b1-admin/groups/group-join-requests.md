---
title: "Žádosti o připojení ke skupině"
description: "Schvalujte nebo zamítejte žádosti o přihlášení do skupiny v B1 Admin, najděte čekající žádosti jako vedoucí nebo administrátor a u zamítnutí uveďte důvod."
---

# Žádosti o připojení ke skupině

<div class="article-intro">

Pokud je skupina nastavena tak, aby se do ní vstupovalo na základě schválení, mohou lidé odeslat žádost o připojení. Vedoucí skupiny a správci tyto žádosti posuzují a schvalují nebo zamítají. Váš sbor tak má kontrolu nad členstvím ve skupinách a zároveň lidem usnadňuje projevit zájem o připojení.

</div>

## Školicí video

<YouTube id="1vj-suCiIsE" title="Žádosti o připojení ke skupině a kalendáře skupin v B1" next="Nastavení služeb a docházky v B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění ke správě skupin nebo musíte být vedoucím dané skupiny. Podrobnosti najdete v článku [Role a oprávnění](../people/roles-permissions.md).
- Skupina musí mít nastavenou zásadu připojení na **Žádost** (vyžaduje schválení). Jak zásady připojení nastavit, najdete v článku [Vytváření skupin](./creating-groups.md).

</div>

## Pochopení zásad připojení

Skupiny mohou mít tři různé zásady připojení:

- **Otevřená** -- Kdokoli se může připojit okamžitě bez schválení
- **Žádost** -- Lidé odešlou žádost o připojení, která vyžaduje schválení
- **Uzavřená** -- Nikdo nemůže požádat o připojení (členové se musí přidat ručně)

Pokud skupina používá zásadu **Žádost**, všechny pokusy o připojení procházejí schvalovacím postupem popsaným na této stránce.

## Zobrazení čekajících žádostí

### Pro vedoucí skupin

1. V aplikaci B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) a zvolte **Lidé > Skupiny**
2. Klikněte na název skupiny
3. V sekci **Členové** je vidět, kolik žádostí čeká na vyřízení. Klikněte na **Všichni členové** -- čekající žádosti pro tuto skupinu se zobrazí na začátku seznamu členů

### Pro správce

Správci s oprávněním ke správě skupin mohou zobrazit čekající žádosti přes všechny skupiny:

1. V rychlé nabídce zvolte **Lidé > Skupiny**
2. Klikněte na tlačítko **čekající žádosti** v záhlaví stránky (například „3 čekající žádosti“). Zobrazí se pouze tehdy, když na vyřízení čekají žádosti.
3. Prohlédněte všechny čekající žádosti napříč celým sborem

## Posouzení žádosti o připojení

Každá žádost o připojení zobrazuje:

- **Jméno a fotografii osoby** -- Osoba, která žádá o připojení
- **Volitelnou zprávu** -- Osobní zprávu s vysvětlením, proč se chce připojit (pokud byla uvedena)
- **Datum žádosti** -- Kdy byla žádost odeslána

Jak žádost posoudit:

1. Přečtěte si zprávu od dané osoby, pokud ji uvedla
2. V případě potřeby klikněte na jméno osoby a zobrazte si její profil
3. Rozhodněte, zda žádost schválíte, nebo zamítnete

## Schválení žádosti

1. Klikněte na **Schválit** u žádosti o připojení
2. Osoba je okamžitě přidána do skupiny jako člen
3. Žadatel obdrží oznámení, že jeho žádost byla schválena
4. Žádost se v systému označí jako schválená

:::tip
Po schválení žádosti se osoba stane běžným členem skupiny. Později ji můžete v případě potřeby povýšit na vedoucího skupiny na stránce [Členové skupiny](./group-members.md).
:::

## Zamítnutí žádosti

1. Klikněte na **Zamítnout** u žádosti o připojení
2. Volitelně uveďte důvod zamítnutí (až 500 znaků)
3. Klikněte na **Potvrdit**
4. Žadatel obdrží oznámení s vaším důvodem zamítnutí (pokud byl uveden)
5. Žádost se označí jako zamítnutá

:::info
Uvedení důvodu zamítnutí pomáhá osobě pochopit, proč její žádost nebyla schválena, a může ji povzbudit k tomu, aby to zkusila znovu později, nebo aby prozkoumala jiné skupiny.
:::

## Schválení na stránce úkolů

Každá žádost o připojení také vytvoří úkol v sekci **Služba &rarr; Moje práce** s názvem „*Osoba* požádala o připojení ke skupině *Skupina*.“ Úkol je přiřazen vedoucím skupiny. Pokud skupina zatím nemá vedoucího, je přiřazen každému zaměstnanci s oprávněním **Členové skupiny &gt; Upravit**, nebo správcům domény vašeho sboru, pokud toto oprávnění nikdo nemá. Zaměstnanci a správci, kteří úkol takto obdrží, zároveň dostanou oznámení, které na něj přímo odkazuje.

Po otevření úkolu se zobrazí jméno žadatele, skupina a jeho volitelná zpráva, přímo na kartě úkolu pak tlačítka **Schválit** a **Zamítnout** (tlačítko Zamítnout otevře stejné volitelné pole pro důvod popsané výše). Vedoucí tak mají druhý způsob, jak na žádost reagovat, který je řízen oznámeními, a nemusí otevírat seznam členů skupiny.

Rozhodnutí o žádosti z kteréhokoli z těchto míst -- ze seznamu členů skupiny nebo z karty úkolu -- ji uzavře všude, takže vedoucí nikdy neuvidí zastaralý úkol pro žádost, kterou už někdo vyřídil.

## Oznámení

Systém žádostí o připojení automaticky odesílá oznámení:

- **Při odeslání žádosti** -- Všichni vedoucí skupiny obdrží oznámení. Pokud skupina nemá vedoucího, jsou místo toho upozorněni zaměstnanci nebo správci, kterým byl úkol přiřazen (viz výše).
- **Při schválení žádosti** -- Žadatel obdrží potvrzení
- **Při zamítnutí žádosti** -- Žadatel obdrží oznámení s případným důvodem zamítnutí

Oznámení se zobrazují v centru oznámení uživatele na B1.church a v mobilní aplikaci. Kliknutím na oznámení o žádosti o připojení (nebo na tlačítko **Zobrazit podrobnosti**) ve zvonku oznámení v aplikaci B1 Admin se skupina otevře na webu B1.church vašeho sboru v nové záložce.

## Správa žádostí z pohledu člena

Lidé mohou spravovat své vlastní žádosti o připojení na B1.church:

- Zobrazit stav svých čekajících žádostí na detailu skupiny
- Zrušit čekající žádost, pokud si to rozmyslí
- Zjistit, zda jejich žádost byla schválena, nebo zamítnuta

## Osvědčené postupy

- **Reagujte včas** -- Snažte se žádosti posoudit do 24–48 hodin, aby lidé nečekali zbytečně dlouho
- **Buďte jasní v důvodech zamítnutí** -- Pomozte lidem pochopit, jaké jsou další kroky nebo alternativní možnosti
- **Kontrolujte profily** -- Prohlédněte si profil osoby a zjistěte, zda se hodí do skupiny
- **Sdělte očekávání** -- Ujistěte se, že popis vaší skupiny jasně uvádí, pro koho je určena

## Související články

- [Vytváření skupin](./creating-groups.md) -- Jak nastavit skupiny a zásady připojení
- [Členové skupiny](./group-members.md) -- Správa stávajících členů skupiny
- [Kalendář skupiny](./group-calendar.md) -- Plánování setkání a akcí skupiny
