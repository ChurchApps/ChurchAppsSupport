---
title: "Správa stránek"
description: "Vytvářejte, upravujte a organizujte stránky a navigaci v zobrazení Pages v B1 Admin, včetně nastavení stránek, přesměrování a šablon webu."
---

# Správa stránek

<div class="article-intro">

Zobrazení Stránky webu je vaším centrálním místem pro vytváření, úpravy a uspořádání všech stránek na webu vašeho sboru. Obsah stránek i navigaci webu můžete spravovat z této jediné obrazovky.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md), ve kterém nakonfigurujete svou doménu a základní nastavení webu
- Připravte si obsah a obrázky. Nejprve nahrajte mediální soubory pomocí správce [souborů](./files.md).

</div>

:::info
Pokud má váš sbor více webů (například samostatné weby pro jednotlivé pobočky), použijte přepínač webů v horní části zobrazení Stránky webu a přecházejte mezi nimi. Každý web má vlastní stránky, navigaci a nastavení [vzhledu](./appearance.md).
:::

## Typy stránek

Tabulka **Stránky** uvádí každou stránku na vašem webu podle **Cesty** a **Názvu**. Existují dva druhy stránek:

- **Generované** -- Stránky, které systém automaticky vytvořil na základě dat vašeho sboru (například stránka Skupin, stránka Kázání nebo samostatná stránka pro každé kázání ve vaší knihovně). Tyto stránky mají štítek **Generované** a aktualizují se společně s vašimi daty.
- **Vlastní** -- Stránky, které jste si vytvořili sami se svým vlastním obsahem a rozložením.

Kteroukoli automaticky generovanou stránku můžete převést na vlastní stránku, pokud chcete mít plnou kontrolu nad jejím obsahem a návrhem. Klikněte na **Převést** vedle generované stránky a potvrďte.

## Přidávání a úprava stránek

1. Klikněte na tlačítko **Přidat stránku** vpravo nahoře v zobrazení Stránky webu.
2. Vyberte typ stránky (prázdná stránka nebo šablona) a zadejte její název.
3. Klikněte na **Upravit obsah** vedle libovolné stránky a otevřete [editor stránek](./page-editor.md), kde můžete přidávat sekce, text, obrázky a další prvky.
4. Klikněte na **Nastavení stránky** vedle stránky a upravte její název, cestu v URL a další metadata.
5. Klikněte na cestu stránky ve sloupci **Cesta** a otevřete živou stránku v nové záložce. Uvidíte přesně, jak bude vypadat pro návštěvníky.

:::tip
Na domovskou stránku nastavte cestu URL pouze jako `/`. Pro všechny ostatní stránky použijte výstižnou cestu, například `/about` nebo `/contact`.
:::

### Nastavení stránky

Otevřete **Nastavení stránky** u libovolné stránky, kde můžete nastavit:

- **Název a cesta URL** -- Název stránky a její adresa na vašem webu.
- **Viditelnost** -- Určete, kdo stránku uvidí: všichni, pouze členové, pouze zaměstnanci nebo členové konkrétních skupin. Je to rychlý způsob, jak omezit přístup k soukromé stránce (například stránce se zdroji pro zaměstnance) bez samostatného hesla.
- **Popis pro vyhledávače** -- Krátké shrnutí, které se zobrazuje ve výsledcích vyhledávačů a v náhledech odkazů na sociálních sítích.
- **Přesměrování** -- Nasměrujte starou cestu URL na tuto stránku, aby odkazy a záložky na zrušenou stránku dál fungovaly.

## Správa navigace

Panel **Hlavní navigace** na pravé straně zobrazení Stránky webu zobrazuje odkazy v navigaci. Tyto odkazy řídí menu, které návštěvníci vidí na vašem webu.

1. Klikněte na **Přidat** a vytvořte nový odkaz v navigaci. Může směřovat na kteroukoli stránku vašeho webu nebo na externí URL.
2. Odkazy změníte pořadí tak, že je přetáhnete na požadované místo. Odkazy můžete také vnořit pod nadřazenou položku a vytvořit tak rozbalovací menu.
3. Klikněte na libovolný odkaz a otevřete jeho **Nastavení odkazu**, kde můžete změnit text, URL nebo nadřazenou stránku.
4. Chcete-li odkaz z navigace odebrat, otevřete jeho **Nastavení odkazu** a klikněte na **Smazat**.

:::info
Odebrání odkazu z navigace nesmaže samotnou stránku. Stránka stále existuje a lze k ní přistupovat přímo pomocí její URL -- jen se nezobrazí v menu.
:::

## Celoweborové přepínače

Pod odkazy v panelu **Hlavní navigace** jsou dva přepínače, které se vztahují na celý web vašeho sboru:

- **Zobrazit přihlášení** -- Zobrazí tlačítko **Přihlásit se** v navigační liště vašeho webu.
- **Vypnout veřejný web** -- Vypne váš veřejný web. Použijte jej, pokud váš sbor používá B1 pouze pro členský portál, dary a registrace a hlavní web má umístěný jinde.

### Co dělá vypnutí veřejného webu

Když je zapnuto **Vypnout veřejný web**:

- Každá veřejná stránka, včetně domovské stránky a vašich vlastních stránek, přesměruje nepřihlášené návštěvníky na přihlašovací obrazovku. Po přihlášení se vrátí na stránku, kterou požadovali.
- Přihlášení členové vidí celý web jako obvykle, včetně vaší navigace a vestavěných **generovaných** stránek (například Skupiny a Kázání). Generované stránky se již v tabulce Stránky nezobrazují.
- Vyhledávačům se sdělí, aby web neindexovaly. Mapa stránek je prázdná a soubor `robots.txt` blokuje veškeré procházení.

Tyto odkazy zůstávají funkční, takže členové a hosté se k nim stále dostanou:

- Přihlášení a odhlášení
- Členský portál (vše pod `/mobile`)
- Odkazy na [registraci na akce](../guides/event-registration.md) a registraci hostů

Zatímco je veřejný web vypnutý, pod přepínačem se zobrazuje upozornění. Pro obnovení stránek přepínač znovu vypněte. Během vypnutí webu se nic nesmaže.

:::info
Toto nastavení platí pro celý váš sbor. Pokud máte více webů, vypne se všech, nikoli pouze ten vybraný v přepínači webů.
:::

## Tipy k uspořádání webu

- Držte hlavní navigaci na pěti nebo šesti položkách, aby návštěvníci snadno našli, co hledají.
- Pro související podstránky použijte vnořené odkazy (například rozbalovací menu „O nás“ s položkami „Náš tým“, „Vyznání“ a „Historie“).
- Prohlédněte si navigaci na telefonu a ověřte, že na menších obrazovkách funguje dobře.
- Dejte stránkám jasné a výstižné názvy, které návštěvníkům pomohou pochopit, co na nich najdou.

:::tip
Na své stránky můžete přidat [formuláře](../forms/creating-forms.md), pomocí kterých budete od návštěvníků sbírat registrace, modlitební prosby nebo jiné informace.
:::

## Začátek ze šablony webu

Pokud budujete web od začátku, můžete jej vytvořit pomocí **šablony webu** namísto vytváření stránek jednu po druhé. Šablona webu vytvoří sadu předpřipravených stránek -- domů, o nás, spojení, dary a dalších -- se zástupným obsahem a již propojenou navigací.

1. Na obrazovce Stránky klikněte na tlačítko **Začít ze šablony** (vedle tlačítka **Přidat stránku**).
2. Projděte dostupné šablony a kliknutím na některou zobrazte náhled struktury jejích stránek.
3. Až najdete šablonu, která se vám líbí, klikněte na **Použít šablonu**.
4. Stránky, které dosud neexistují, se vytvoří a přidají do navigace. Existující stránky zůstanou beze změny.

Po použití šablony otevřete každou stránku v [editoru stránek](./page-editor.md) a nahraďte zástupný text a obrázky skutečným obsahem vašeho sboru.

:::info
Šablony webu vytvářejí strukturu stránek a navigaci. Barevné schéma a písma webu nepřepisují -- ty řídí [Vzhled](./appearance.md).
:::

## Zvětšení obrázku (lightbox)

Když návštěvníci kliknou na obrázek na vašem webu, otevře se na celou obrazovku v překryvném zobrazení. Lidé si tak mohou prohlédnout fotografie ve větší velikosti, aniž by opustili stránku. Není potřeba žádné nastavení -- zvětšení se pro obrázky ve vašem obsahu zapíná automaticky.

## Další kroky

- [Počáteční nastavení](./initial-setup.md) -- Pokyny pro první nastavení
- [Používání editoru stránek](./page-editor.md) -- Naučte se vytvářet a stylizovat obsah stránek
- [Vzhled](./appearance.md) -- Přizpůsobte vizuální motiv svého webu
- [Soubory](./files.md) -- Nahrávejte a spravujte mediální soubory pro své stránky
