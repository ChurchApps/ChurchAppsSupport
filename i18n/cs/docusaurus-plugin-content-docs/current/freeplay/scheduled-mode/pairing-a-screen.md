---
title: "Párování obrazovky"
---

# Párování obrazovky

<div class="article-intro">

Chcete-li zařadit televizi do kalendáře, spárujte ji s **FreePlay Admin**. Televize zobrazí čtyřmístný kód. Zadáte tento kód na stránce [admin.freeplay.church](https://admin.freeplay.church) a vyberete skupinu obrazovek, jejíž kalendář má televize sledovat. Stačí to udělat jednou pro každou televizi.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte a spusťte FreePlay na televizi. Viz [Začínáme](../getting-started/)
- Mějte přihlašovací údaje ChurchApps pro svůj sbor, abyste se mohli přihlásit do FreePlay Admin
- Volitelně nejprve [vytvořte playlist](./building-playlists) a [naplánujte jej](./scheduling-the-calendar), aby televize mohla hned něco přehrát

</div>

## Zobrazení kódu na televizi

1. Na televizi otevřete v dolní části postranního panelu **Nastavení**.
2. Vyberte **Spárovat s kalendářem**. Řádek zobrazuje **Nespárováno**, pokud televize ještě není spárována.
3. Obrazovka **Spárovat tuto obrazovku** zobrazuje QR kód a čtyřmístný párovací kód se zprávou **Naskenujte telefonem nebo přejděte na freeplay.church/pair a zadejte tento kód**.
4. Pod kódem bliká **Čeká se na potvrzení**, dokud FreePlay čeká, až dokončíte párování.

Kód platí 15 minut a odpočet pod ním ukazuje zbývající čas. Když čas vyprší, FreePlay sám zobrazí nový kód. Můžete také vybrat **Vygenerovat nový kód** pro nový kód, nebo **Zrušit** a vrátit se do Nastavení.

## Párování ve FreePlay Admin

1. Naskenujte QR kód telefonem nebo přejděte na **freeplay.church/pair** v libovolném počítači nebo telefonu. Pokud budete vyzváni, přihlaste se. FreePlay Admin otevře formulář **Spárovat obrazovku** s již vyplněným kódem.
   - Formulář můžete otevřít i sami. Přejděte na **Obrazovky** ve FreePlay Admin a klikněte na **Spárovat obrazovku**.
2. Zkontrolujte **Párovací kód**. Jsou to čtyři písmena na televizi.
3. Zadejte **Štítek**, abyste odlišili tuto televizi od ostatních, například „Levý vestibul“. Je to volitelné.
4. V části **Skupina** vyberte skupinu obrazovek, jejíž kalendář má tato televize sledovat. Chcete-li vytvořit novou, vyberte **＋ Nová skupina…** a zadejte **Název nové skupiny**.
5. V části **Režim** ponechte vybraný **Naplánovaný**. Televize bude podle kalendáře skupiny přehrávat automaticky.
6. Klikněte na **Spárovat**.

Televize zobrazí **Připojeno!** a potom **Načítání vašeho plánu...**. Stáhne naplánovaný obsah a začne přehrávat. Viz [Přehrávání podle plánu na televizi](./scheduled-playback).

:::info
Pokud FreePlay Admin hlásí **Tento kód neodpovídá žádné televizi**, zkontrolujte kód na obrazovce. Pokud vypršel, použijte nový kód, který televize právě zobrazuje.
:::

### Naplánovaný vs. ruční

Nastavení **Režim** má dvě možnosti:

- **Naplánovaný** - Přehrává se automaticky podle kalendáře skupiny. Nikdo nemusí nic spouštět.
- **Ruční** - Obsah vybírá někdo pomocí dálkového ovladače. Ruční obrazovka se i tak zobrazí v seznamu **Obrazovky**, ale nesleduje kalendář, a proto je pole **Skupina** vypnuté.

Režim obrazovky můžete později změnit přes **Upravit** na stránce [Obrazovky](./managing-screens).

## Párování s plánem bohoslužby místo toho

Kód na obrazovce **Spárovat tuto obrazovku** funguje také v B1 Admin. Pokud jej tam zadáte a pod **Zobrazit plány pro** vyberete typ plánu, televize bude místo kalendáře sledovat tento typ plánu v [Režimu plánu](../plan-mode/). Viz [Párování zařízení](../plan-mode/device-pairing).

## Změna nebo zrušení párování na televizi

Jakmile je televize spárována, řádek **Spárovat s kalendářem** v **Nastavení** zobrazuje název skupiny obrazovek, kterou sleduje. Výběrem řádku otevřete dialog **Spárováno s**, který má tři možnosti:

- **Zpět k plánu** - Zavře dialog a vrátí vás k přehrávači podle plánu. Párování se nezmění.
- **Zrušit párování** - Přestane sledovat plán. FreePlay otevře obrazovku **Poskytovatelé obsahu**.
- **Spárovat s jiným kalendářem** - Zruší párování a poté zobrazí nový párovací kód, abyste mohli televizi znovu spárovat.

:::warning
Zrušením párování se odstraní soubory, které FreePlay stáhl pro tento kalendář.
:::

## Zrušení párování ve FreePlay Admin

1. Přejděte na **Obrazovky** a klikněte na název obrazovky.
2. Klikněte na **Více** a potom na **Zrušit párování**.
3. Pro potvrzení znovu klikněte na **Zrušit párování**.

Televize se vrátí k zobrazení párovacího kódu. Kdykoli ji chcete znovu použít, spárujte ji znovu.

## Související články

- **[Správa obrazovek a skupin](./managing-screens)** - Přejmenujte obrazovku, přesuňte ji do jiné skupiny nebo zkontrolujte její stahování
- **[Plánování kalendáře](./scheduling-the-calendar)** - Určete, co přehrávají obrazovky skupiny
- **[Výběr režimu párování](../getting-started/pairing-modes)** - Porovnejte režim Naplánovaný s režimem plánu bohoslužby a procházení poskytovatelů obsahu sami
