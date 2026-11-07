---
title: "Plánované přehrávání na TV"
---

# Plánované přehrávání na TV

<div class="article-intro">

Jakmile je TV spárována s kalendářem, FreePlay ji spouští za vás. Stáhne obsah na následující týden, v naplánovaných časech přepíná obsah a při výpadku internetu pokračuje v přehrávání z vlastního úložiště. Učitel nebo dobrovolník může i nadále pozastavovat, přeskakovat a přecházet mezi obsahem pomocí dálkového ovladače TV.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Spárujte TV s kalendářem](./pairing-a-screen)
- [Přidejte obsah do kalendáře](./scheduling-the-calendar), nebo nastavte výchozí smyčku pro skupinu obrazovky

</div>

## Co TV dělá samo od sebe

- **Otevře se rovnou na rozvrhu** - Když spárovaná TV spustí FreePlay, přejde přímo do plánovaného přehrávače
- **Stahuje dopředu** - FreePlay stáhne všechny soubory naplánované na příštích 7 dní a také výchozí smyčku a přehrává je z těchto staženýchh souborů
- **Přehrává podle hodin** - V každém naplánovaném čase začátku obrazovka přepne na daný obsah. Když není nic naplánováno, přehrává výchozí smyčku skupiny
- **Kontroluje změny** - FreePlay pravidelně kontroluje v FreePlay Admin změny v kalendáři a stáhne vše nové
- **Opravuje vadné soubory** - Pokud se stažený soubor nepřehraje, FreePlay ho přeskočí a stáhne znovu

Než dorazí první soubory, obrazovka zobrazí **Načítání rozvrhu...** nebo **Stahování souboru X z Y**. Když není nic naplánováno a skupina nemá výchozí smyčku, zobrazí **Právě nic není naplánováno**.

## Informační panel

Stisknutím tlačítka **Select** na ovladači otevřete informační panel. Po několika sekundách se sám zavře. Panel zobrazuje:

- **Vpravo nahoře** - **Připraveno do** a datum, do kterého je vše staženo, nebo **Stahování**, dokud ještě přicházejí soubory. Pod tím je počet stažených souborů a ukazatel průběhu
- **Vlevo dole** - Název právě přehrávaného obsahu (nebo **Výchozí smyčka**), která položka je na obrazovce, a co bude následovat a kdy
- **Naposledy kontrolováno** - Kdy FreePlay naposledy kontroloval změny rozvrhu

Panel má také tři tlačítka:

- **Připnout tento playlist** - Ponechá aktuální obsah ve smyčce a ignoruje kalendář. Výběrem **Odepnout playlist** se vrátíte k rozvrhu
- **Procházet obsah** - Opustí plánovaný přehrávač a umožní procházet vaše připojené poskytovatele
- **Nastavení** - Otevře nastavení FreePlay, kde můžete [zrušit spárování nebo spárovat s jiným kalendářem](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Chcete-li se po procházení vrátit k rozvrhu, stiskněte na ovladači tlačítko **Back** na obrazovce **Poskytovatelé obsahu**, nebo otevřete **Nastavení**, vyberte **Spárovat s kalendářem** a zvolte **Zpět k rozvrhu**. Spárovaná TV se také vrátí k plánovanému přehrávači pokaždé, když se FreePlay vrátí do popředí, a vždy se otevře na plánovaném přehrávači.
:::

## Ovládání dálkovým ovladačem

| Tlačítko ovladače | Akce |
|---|---|
| **Select** | Otevře informační panel |
| **Play/Pause** | Pozastaví nebo obnoví přehrávání. Při pozastavení se zobrazí ikona přehrávání |
| **Šipka doprava** | Další snímek nebo video |
| **Šipka doleva** | Předchozí snímek nebo video |
| **Šipka nahoru** | Otevře přehled snímků pro přechod na libovolný snímek |
| **Fast Forward** | Přeskočí o 10 sekund dopředu ve videu |
| **Rewind** | Přeskočí o 10 sekund zpět ve videu |
| **Back** | Zavře přehled snímků nebo informační panel, nebo otevře informační panel |

Další a předchozí položka zůstávají v rámci právě přehrávaného obsahu. Přechod z poslední položky na první nastane pouze tehdy, když je rozvrh nastaven na opakování. Fast Forward a Rewind fungují jen při přehrávání videa. U snímku nedělají nic.

### Přechod na snímek

Stiskněte **Nahoru** pro otevření přehledu snímků. Zobrazí všechny položky aktuálního playlistu nebo lekce. Přejděte na požadovanou položku a stisknutím **Select** na ni okamžitě přejdete.

## Lekce s tempem určeným učitelem

Když je rozvrh nastaven na **Tempo určuje učitel**, obrazové snímky se nepřepínají samy. Učitel postupuje vpřed šipkou **doprava**. Video se přehraje až do konce a poté přejde na další položku.

Lekce s tempem určeným učitelem zůstane na obrazovce i po naplánovaném konci, dokud učitel nedojde k poslednímu snímku a ten se nedokončí. Poté obrazovka přejde na to, co je naplánováno jako další. Díky tomu se hodina, která se protáhne, nepřeruší uprostřed výkladu.

## Prezentace v prohlížeči

Kalendář obrazovky můžete přehrávat také ve webovém prohlížeči. Ve FreePlay Admin otevřete obrazovku na stránce **Obrazovky** a klikněte na **Prezentovat v prohlížeči**. Prohlížeč sleduje kalendář obrazovky stejným způsobem jako TV a ovládací lišta zobrazuje, co bude následovat. Klávesou **Mezerník** pozastavíte, klávesami **←** / **→** přeskakujete, klávesou **F** přepnete celou obrazovku a klávesou **Esc** ukončíte.

## Související články

- **[Plánování kalendáře](./scheduling-the-calendar)** - Nastavte, co se přehraje a co se stane, když skončí dříve
- **[Správa obrazovek a skupin](./managing-screens)** - Zkontrolujte stahování jednotlivých obrazovek ve FreePlay Admin
- **[Přehrávání obsahu](../content-providers/playing-content)** - Ovládací prvky přehrávače, když přehráváte obsah sami
