---
title: "Správa obrazovek a skupin"
---

# Správa obrazovek a skupin

<div class="article-intro">

Stránka **Obrazovky** v aplikaci FreePlay Admin uvádí každou televizi spárovanou s vaším sborem, s informací o tom, co právě přehrává, a o tom, zda je připravena na nedělní bohoslužbu. Zde také spravujete **skupiny obrazovek**. Obrazovky ve stejné skupině sdílejí jeden kalendář a jednu výchozí smyčku.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Přihlaste se do aplikace FreePlay Admin na adrese [admin.freeplay.church](https://admin.freeplay.church)
- [Spárujte alespoň jednu obrazovku](./pairing-a-screen)

</div>

## Stránka Obrazovky

Nahoře se třemi čísly rychle zjistíte stav systému:

- **Online nyní** - Obrazovky, které se ohlásily během posledních 15 minut
- **Připraveno na neděli** - Kolik naplánovaných obrazovek má všechen obsah stažený až do nadcházející neděle včetně
- **Vyžaduje pozornost** - Obrazovky, které jsou offline nebo jim chybí soubory

Níže použijte **Hledat obrazovky** k vyhledání obrazovky podle popisku, skupiny nebo toho, co přehrává. Filtrační štítky zúží seznam na **Vše**, **Naplánované**, **Ruční**, **Vyžaduje pozornost** nebo na jednu konkrétní skupinu. Mezi zobrazením **Tabulka** a **Mřížka** přepínáte tlačítkem vpravo.

Každá obrazovka zobrazuje:

- **Popisek** a model zařízení
- **Skupinu**
- **Režim** - **Naplánovaný** nebo **Ruční**
- **Právě přehrává** - Co je právě na obrazovce. Ruční obrazovky zobrazují **Učebna · učitel stiskne Start**
- **Připraveno do** - Datum, do kterého má obrazovka stažený obsah. Pokud se soubory nestáhly, zobrazí se místo toho **chybí N souborů**. Nová obrazovka zobrazuje **Čeká na první synchronizaci**
- **Naposledy viděno** - Kdy se obrazovka naposledy ohlásila. Obrazovka, která se delší dobu neohlásila, zobrazuje **Offline**, a obrazovka, která se nikdy nepřipojila, zobrazuje **Nikdy neviděno**

Tlačítkem **Prezentovat** přehrajete kalendář obrazovky v prohlížeči, tlačítkem **Upravit** změníte její nastavení.

## Zobrazení obrazovky

Kliknutím na popisek obrazovky otevřete její stránku. Vlevo najdete:

- **Prezentovat v prohlížeči** - Přehrajte kalendář této obrazovky na celou obrazovku v prohlížeči tak, jak by vypadal na televizi. Viz [Prezentace z prohlížeče](./scheduled-playback#presenting-from-a-browser)
- **Upravit** - Změňte popisek, skupinu nebo režim
- **Více** > **Odpárovat** - Odpojte televizi. Vrátí se k zobrazení párovacího kódu

Zbytek stránky obsahuje tyto sekce:

- **Nyní a poté** - Co se přehrává nyní a dokdy, následované vším, co je naplánováno na dalších 7 dní. Kliknutím na **Otevřít kalendář** přejdete na kalendář této skupiny
- **Stahování** - **Připraveno do** data, kdy je vše staženo, nebo seznam chybějících souborů
- **Zařízení** - ID zařízení, platforma, model, verze aplikace FreePlay, IP adresa, využité a volné úložiště, naposledy viděno a režim
- **Nedávné** - Nejnovější aktivity, které obrazovka nahlásila

:::tip
Pokud obrazovka zobrazuje chybějící soubory, ujistěte se, že je online a má volné úložiště. Televize si chybějící soubory stáhne sama při příštím ohlášení.
:::

## Úprava obrazovky

1. Klikněte na **Upravit** vedle obrazovky nebo na její stránce.
2. Změňte **Popisek**, **Skupinu** nebo **Režim** (**Naplánovaný** nebo **Ruční**).
3. Klikněte na **Uložit**.

Přesunutí obrazovky do jiné skupiny ji přepne na kalendář této skupiny.

## Skupiny obrazovek

Skupina obrazovek je sada obrazovek, které přehrávají totéž ve stejnou dobu, například „Vstupní hala“ nebo „Dětské křídlo“. Každá skupina má vlastní kalendář a může mít **výchozí smyčku**, která se přehrává vždy, když nic není naplánováno.

Pro správu skupin klikněte nahoře na stránce **Obrazovky** na **Skupiny**. Seznam **Skupiny obrazovek** zobrazuje název každé skupiny, počet jejích obrazovek a její výchozí smyčku. Kliknutím na **Obrazovky** se vrátíte zpět.

### Přidání skupiny

1. V zobrazení **Skupiny obrazovek** klikněte na **Přidat skupinu**.
2. Zadejte **Název**, například „Vstupní hala“.
3. Vyberte playlist jako **Výchozí smyčku**, nebo ponechte **Žádná — obrazovka zhasne**.
4. Klikněte na **Uložit**.

Skupinu můžete vytvořit i během párování obrazovky výběrem **＋ Nová skupina…** v poli **Skupina**.

### Úprava nebo smazání skupiny

1. Klikněte na **Upravit** vedle skupiny.
2. Změňte název nebo výchozí smyčku a klikněte na **Uložit**.
3. Chcete-li skupinu odstranit, klikněte na **Smazat** a potvrďte.

:::warning
Smazáním skupiny smažete i její plán. Obrazovky v této skupině zhasnou, dokud je nepřesunete do jiné skupiny.
:::

## Související články

- **[Párování obrazovky](./pairing-a-screen)** - Přidání nové televize
- **[Plánování kalendáře](./scheduling-the-calendar)** - Nastavení, co každá skupina přehrává, a její výchozí smyčka
- **[Naplánované přehrávání na televizi](./scheduled-playback)** - Co datum „Připraveno do“ znamená přímo na televizi
