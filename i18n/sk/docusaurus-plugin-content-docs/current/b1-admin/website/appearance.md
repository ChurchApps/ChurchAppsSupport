---
title: "Vzhľad"
description: "Nastavte farby, písma, medzery, logo a navigáciu pre webstránku vášho zboru v B1 Admin, plus widgety, analytiku GA4, presmerovania a vlastné CSS."
---

# Vzhľad

<div class="article-intro">

Stránka Vzhľad vám umožňuje prispôsobiť celkový vzhľad vašej cirkevnej webovej stránky. Od farieb a písiem až po medzery a vlastné CSS môžete ovládať každý vizuálny aspekt svojej stránky na jednom mieste.

</div>

<div class="prereqs">
<h4>Predtým, než začnete</h4>

- Dokončite [počiatočné nastavenie](./initial-setup.md) pre svoju webovú stránku
- Pripravte si logo cirkvi vo formáte PNG s priehľadným pozadím a pomerom strán 4:1
- Ak máte existujúcu štýlovú príručku, poznajte farby značky svojej cirkvi (hexadecimálne hodnoty)

</div>

## Prístup k nastaveniam vzhľadu

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu) a rozbaľte položku **Website**.
2. Kliknite na **Appearance**.
3. Otvorí sa stránka **Site Styles**. Karta **Theme, fonts & footer** zobrazuje zoznam **Style Settings** vľavo a náhľad ukážkovej stránky vpravo. Pod ňou sú karty **Announcement & widgets** a **Redirects & analytics**.

## Farebná paleta {#color-palette}

1. V paneli **Style Settings** kliknite na **Color Palette**.
2. Uvidíte **Base Colors** (svetlé, akcentové a tmavé odtiene) a **Semantic Colors** (Primary, Secondary, Success, Warning a Error).
3. Kliknutím na ľubovoľný farebný vzorník otvoríte výber farby. Potiahnite výber alebo zadajte hexadecimálnu hodnotu a zvoľte si farbu.
4. **Color Combinations Preview** ukazuje, ako sa vybrané farby navzájom dopĺňajú.
5. Pomocou **Suggested Palettes** rýchlo použijete vopred navrhnutú farebnú schému.
6. Keď budete spokojní, kliknite na **Save Palette**.

## Typografia

1. V paneli **Style Settings** kliknite na **Fonts**.
2. Kliknutím na tlačidlo **Heading Font** alebo **Body Font** otvorte prehliadač písiem. Môžete vyhľadávať podľa názvu alebo prechádzať kategórie ako Serif, Sans Serif, Display, Handwriting a Monospace. Môžete tiež zvoliť jednu z **Popular Font Combinations**.
3. Kliknutím na **Save Fonts** uplatníte svoj výber písiem.
4. Ak chcete upraviť veľkostnú hierarchiu nadpisov Heading 1 až Heading 4, v paneli **Style Settings** kliknite na **Typography Scale**. Pomocou polí **Type Scale** (násobiteľ), **Base Size** a **Line Height** doladíte nastavenia a potom kliknite na **Save Typography**.

## Medzery

1. V paneli **Style Settings** kliknite na **Spacing Scale**.
2. Upravte hodnoty medzier od Extra Small po Extra Large. Praktické príklady ukazujú, ako každá hodnota ovplyvňuje rozloženie.
3. Kliknutím na **Save Spacing** uplatníte hodnoty na celú stránku.

## Logo a značka {#logo-and-branding}

1. V paneli **Style Settings** kliknite na **Logo**.
2. Nahrajte **Light Background Logo** (logo pre svetlé pozadie) a **Dark Background Logo** (logo pre tmavé pozadie). Pre najlepší výsledok používajte obrázky s priehľadným pozadím a pomerom strán 4:1.
3. Nahrajte **Social Media Image** pre náhľady odkazov a **Favicon** pre ikonu na karte prehliadača.
4. Kliknite na **Save Changes**. Nahrané obrázky sa neuložia, kým ich neuložíte, takže ak sa pokúsite najskôr zavrieť alebo obnoviť kartu prehliadača, prehliadač vás upozorní na neuložené zmeny.

:::tip
Pre najlepší výsledok používajte logo s priehľadným pozadím vo formáte PNG. Zabezpečí to, že bude dobre vyzerať na svetlom aj tmavom pozadí na vašej webovej stránke a v [mobilnej aplikácii](../settings/mobile-app.md).
:::

## Štýly navigácie

Prispôsobte farby navigačného panela svojej webovej stránky pre plnú aj priehľadnú verziu:

1. V paneli **Style Settings** kliknite na **Navigation**.
2. Nastavte farby pre **Header (solid)** a **Header over hero (transparent)**.
3. Kliknutím na **Save Navigation** uplatníte farby navigácie.

Podrobné pokyny nájdete v časti [Štýly navigácie](./navigation-styles.md).

## Oznámenia a widgety

Widgety stránky sa zobrazujú na každej stránke vašej webovej stránky a plávajú nad jej obsahom:

- **Announcement Banner** -- Zatvoriteľný pruh v hornej časti stránky pre správy citlivé na čas, napríklad o blížiacej sa udalosti alebo zmene bohoslužby.
- **Launcher** -- Plávajúce tlačidlo, ktoré otvára rýchlu ponuku, napríklad s odkazmi na dary, odbavenie alebo zobrazenie farského spravodajcu.

1. Pod panelom **Style Settings** nájdite kartu **Announcement & widgets**.
2. Zapnite widgety, ktoré chcete použiť, a nastavte ich text, odkazy a farby.
3. Kliknite na **Save**.

## Presmerovania a analytika

Karta **Redirects & analytics** (pod panelom Style Settings) obsahuje dve nesúvisiace, ale bežne potrebné nastavenia:

- **Analytics** -- Pridajte svoje **GA4 Measurement ID** (formát `G-XXXXXXXXXX`), aby ste mohli sledovať návštevnosť svojej webovej stránky. Rovnaké ID sleduje aj zobrazenia stránok v mobilnej aplikácii B1 vašej cirkvi (portál pre členov na adrese `/mobile`, vrátane nainštalovanej aplikácie). Návštevy sú označené hodnotou `display_mode` `installed` alebo `browser`, takže v Google Analytics rozlíšite návštevy z nainštalovanej aplikácie od návštev z prehliadača.
- **Redirects** -- Namapujte staré URL cestu na novú, aby odkazy na stránku, ktorú ste presunuli alebo premenovali, fungovali ďalej a nezobrazovali chybu 404. Zadajte pôvodnú cestu **From** a novú cestu **To** a potom kliknite na **Save**. Presmerovanie má prednosť aj pred vstavanými stránkami B1 (`/sermons`, `/stream`, `/donate`, `/bible` a `/votd`), takže túto adresu môžete odoslať inam (napríklad na vašu vlastnú stránku kázní alebo na kanál YouTube). Nepremaže však stránku, ktorú ste vytvorili na rovnakej adrese. Ak chcete, aby sa presmerovanie uplatnilo, najskôr túto stránku odstráňte.

## Vlastné CSS a JavaScript

1. V paneli **Style Settings** kliknite na **CSS & Javascript**.
2. Pridajte **Custom CSS**, ak chcete prepísať predvolené štýly pre pokročilé prispôsobenie.
3. Pridajte **Custom HTML** pre sledovacie kódy alebo iné skripty.
4. V časti **Common JavaScript Examples** nájdete ukážky, napríklad na integráciu služby Google Analytics.

:::warning
Vlastné CSS je silný nástroj, ale pri nesprávnom použití môže rozbiť rozloženie vašej stránky. Väčšina cirkví dosiahne požadovaný vzhľad pomocou vstavaných nástrojov pre farby, písma a medzery. Vlastné CSS používajte iba vtedy, ak sa cítite dobre vo webovom vývoji.
:::

:::info
Vaša stránka uplatňuje Zásady zabezpečenia obsahu (Content Security Policy), ktoré blokujú vložené skripty z akéhokoľvek iného zdroja. Pole **Custom HTML** tu a [prvok HTML](./page-editor.md#using-the-html-element) na jednotlivých stránkach sú dôveryhodné výnimky. Kód, ktorý v nich uložíte, sa spustí tak, ako je, preto vkladajte iba skripty z dôveryhodných zdrojov (sledovacie kódy analytiky, widgety chatu a podobné vložené prvky).
:::

## Štýlové témy

Ak potrebujete rýchly začiatok, položky **Suggested Palettes** v časti Farebná paleta ponúkajú vopred pripravené témy, ktoré nastavia koordinované farby jediným kliknutím. Jednotlivé nastavenia môžete kedykoľvek doladiť aj po použití témy.

## Ďalšie kroky

- [Správa stránok](./managing-pages.md) -- Vytvárajte a organizujte stránky svojej webovej stránky
- [Súbory](./files.md) -- Nahrajte mediálne súbory pre svoju stránku
