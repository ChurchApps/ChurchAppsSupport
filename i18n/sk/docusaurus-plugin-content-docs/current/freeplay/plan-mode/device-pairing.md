---
title: "Párovanie zariadenia"
---

# Párovanie zariadenia

<div class="article-intro">

Na použitie režimu plánu spárujete svoj televízor s typom plánu v B1 Admin. FreePlay zobrazí na televízore krátky párovací kód. Tento kód zadáte v B1 Admin a vyberiete typ plánu, ktorý sa má sledovať. Televízor potom každý týždeň automaticky dostáva obsah tohto plánu.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Nainštalujte a spustite FreePlay. Pozrite si [Začíname](../getting-started/)
- Na dokončenie párovania potrebujete prístup k **B1 Admin** na počítači alebo telefóne

</div>

## Vygenerovanie párovacieho kódu

1. Na televízore otvorte **Nastavenia** v dolnej časti bočného panela.
2. Vyberte **Spárovať s kalendárom**.
3. FreePlay zobrazí štvorpísmenový párovací kód veľkými písmenami vedľa QR kódu.
4. Pod kódom sa zobrazí pulzujúci indikátor **Čaká sa na potvrdenie**, ktorý znamená, že FreePlay čaká, kým dokončíte párovanie.

Rovnaký kód funguje pre [Naplánovaný režim](../scheduled-mode/) vo FreePlay Admin aj pre režim plánu v B1 Admin. QR kód a adresa **freeplay.church/pair** na obrazovke otvoria FreePlay Admin. Pri režime plánu ich ignorujte a kód zadajte v B1 Admin podľa nižšie uvedeného postupu.

## Zadanie kódu v B1 Admin

1. V B1 Admin prejdite na **Profil** > **Zariadenia** a kliknite na **Pridať obrazovku**.
2. Do poľa **Párovací kód** zadajte štyri písmená zobrazené na televízore.
3. V časti **Zobraziť plány pre** vyberte typ plánu, ktorý má táto obrazovka sledovať, napríklad „Nedeľná bohoslužba“.
4. Uložte.

FreePlay každých pár sekúnd kontroluje, či je párovanie dokončené. Keď ho B1 Admin potvrdí, televízor zobrazí **Pripojené!** a prejde na obrazovku sťahovania plánu.

## Sťahovanie obsahu plánu

Po spárovaní FreePlay načíta aktuálny plán pre daný typ plánu. Zobrazí:

- Názov plánu a dátum bohoslužby
- Názov lekcie, ak plán obsahuje obsah lekcie
- Indikátor priebehu s textom **Sťahuje sa položka X z Y**

Keď sa stiahnu všetky mediálne súbory, zobrazí sa tlačidlo **Spustiť plán**. Stlačením tlačidla **Vybrať** na diaľkovom ovládači spustíte prehrávanie.

:::tip
Plán sa automaticky obnovuje každú hodinu. Ak niekto počas dňa plán aktualizuje, FreePlay zmeny prevezme samo.
:::

## Ak párovanie zlyhá

Ak FreePlay nedokáže vygenerovať párovací kód (napríklad kvôli problému so sieťou), zobrazí sa chybové hlásenie s tlačidlom **Skúsiť znova**. Skontrolujte, či je televízor pripojený na internet, a skúste to znova.

:::warning
Párovacie kódy vypršia po 15 minútach. Keď starý kód vyprší, FreePlay zobrazí nový kód automaticky. Kedykoľvek môžete vybrať **Vygenerovať nový kód**. Ak kód, ktorý ste zadali, nefunguje, použite kód, ktorý je práve zobrazený na televízore.
:::

## Súvisiace články

- **[Prehľad režimu plánu](./index.md)** - Ako sa režim plánu líši od naplánovaného režimu
- **[Párovanie obrazovky](../scheduled-mode/pairing-a-screen)** - Namiesto toho spárujte rovnaký televízor s kalendárom vo FreePlay Admin
- **[Prehrávanie obsahu](../content-providers/playing-content)** - Ovládacie prvky prehrávača pre prehrávanie plánu
