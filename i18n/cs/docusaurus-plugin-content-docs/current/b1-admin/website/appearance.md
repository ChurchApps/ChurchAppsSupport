---
title: "Vzhled"
description: "Nastavte barvy, písma, rozestupy, logo a navigaci webu vaší církve v B1 Admin, včetně widgetů, analytiky GA4, přesměrování a vlastního CSS."
---

# Vzhled

<div class="article-intro">

Stránka Vzhled vám umožňuje přizpůsobit celkový vzhled webu vašeho sboru. Od barev a písem po rozestupy a vlastní CSS můžete ovládat každý vizuální prvek webu z jednoho místa.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md) svého webu
- Připravte si logo sboru ve formátu PNG s průhledným pozadím a poměrem stran 4:1
- Pokud máte existující manuál stylu, zjistěte barvy značky sboru (hexadecimální hodnoty)

</div>

## Otevření nastavení vzhledu

1. V B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte položku **Web**.
2. Klikněte na **Vzhled**.
3. Otevře se stránka **Styly webu**. Karta **Motiv, písma a patička** zobrazuje seznam **Nastavení stylů** vlevo a náhled ukázkového webu vpravo. Pod ní jsou karty **Oznámení a widgety** a **Přesměrování a analytika**.

## Barevná paleta {#color-palette}

1. V panelu **Nastavení stylů** klikněte na **Barevná paleta**.
2. Zobrazí se **Základní barvy** (světlé, zvýrazňující a tmavé odstíny) a **Sémantické barvy** (Primární, Sekundární, Úspěch, Varování a Chyba).
3. Kliknutím na libovolný barevný vzorek otevřete výběr barev. Přetažením výběrače nebo zadáním hexadecimální hodnoty zvolte barvu.
4. **Náhled kombinací barev** ukazuje, jak se vybrané barvy hodí k sobě.
5. Pomocí **Navrhovaných palet** můžete rychle použít předpřipravené barevné schéma.
6. Až budete spokojeni, klikněte na **Uložit paletu**.

## Typografie

1. V panelu **Nastavení stylů** klikněte na **Písma**.
2. Kliknutím na tlačítko **Nadpisové písmo** nebo **Písmo textu** otevřete prohlížeč písem. Můžete hledat podle názvu nebo procházet kategorie, například Serif, Sans Serif, Dekorativní, Rukopisné a Monospace. Můžete také zvolit některou z **oblíbených kombinací písem**.
3. Kliknutím na **Uložit písma** použijete zvolená písma.
4. Chcete-li upravit velikostní hierarchii nadpisů 1 až 4, klikněte v panelu **Nastavení stylů** na **Měřítko typografie**. Pomocí polí **Násobitel velikostí**, **Základní velikost** a **Výška řádku** nastavení doladíte a poté klikněte na **Uložit typografii**.

## Rozestupy

1. V panelu **Nastavení stylů** klikněte na **Měřítko rozestupů**.
2. Upravte hodnoty rozestupů od velmi malých až po velmi velké. Praktické příklady ukazují, jak každá hodnota ovlivňuje rozložení.
3. Kliknutím na **Uložit rozestupy** použijete hodnoty na celý web.

## Logo a branding {#logo-and-branding}

1. V panelu **Nastavení stylů** klikněte na **Logo**.
2. Nahrajte **logo pro světlé pozadí** a **logo pro tmavé pozadí**. Pro nejlepší výsledky používejte obrázky s průhledným pozadím a poměrem stran 4:1.
3. Nahrajte **obrázek pro sociální sítě**, který se zobrazuje v náhledech odkazů, a **favicon**, tedy ikonu na kartě prohlížeče.
4. Klikněte na **Uložit změny**. Nahrané obrázky se neuloží, dokud je neuložíte, takže pokud se pokusíte nejprve zavřít nebo znovu načíst kartu prohlížeče, prohlížeč vás upozorní na neuložené změny.

:::tip
Pro nejlepší výsledky používejte logo ve formátu PNG s průhledným pozadím. Zajistí to, že bude dobře vypadat na světlém i tmavém pozadí na vašem webu i v [mobilní aplikaci](../settings/mobile-app.md).
:::

## Styly navigace

Přizpůsobte barvy navigační lišty webu pro plný i průhledný režim:

1. V panelu **Nastavení stylů** klikněte na **Navigace**
2. Nastavte barvy pro **Záhlaví (plné)** a **Záhlaví nad hlavním obrázkem (průhledné)**
3. Kliknutím na **Uložit navigaci** použijete barvy navigace

Podrobné pokyny najdete v části [Styly navigace](./navigation-styles.md).

## Oznámení a widgety

Widgety webu se zobrazují na každé stránce webu a plovou nad obsahem stránky:

- **Oznamovací pruh** -- Zavíratelný pruh v horní části webu pro časově citlivé zprávy, například nadcházející akci nebo změnu bohoslužby.
- **Spouštěč** -- Plovoucí tlačítko, které otevírá rychlou nabídku, například s odkazy na dary, přihlášení na místo nebo zobrazení týdenního programu.

1. Pod nastavením stylů najděte kartu **Oznámení a widgety**.
2. Zapněte widgety, které chcete použít, a nastavte jejich text, odkazy a barvy.
3. Klikněte na **Uložit**.

## Přesměrování a analytika

Karta **Přesměrování a analytika** (pod nastavením stylů) obsahuje dvě nesouvisející, ale běžně potřebná nastavení:

- **Analytika** -- Přidejte své **ID měření GA4** (formát `G-XXXXXXXXXX`), abyste mohli sledovat návštěvnost webu. Stejné ID sleduje také zobrazení stránek v mobilní aplikaci vašeho sboru B1 (portál pro členy na adrese `/mobile`, včetně nainstalované aplikace). Návštěvy jsou označeny hodnotou `display_mode` `installed` nebo `browser`, takže v Google Analytics poznáte návštěvy z nainstalované aplikace od návštěv z prohlížeče.
- **Přesměrování** -- Namapujte starou cestu URL na novou, aby odkazy na stránku, kterou jste přesunuli nebo přejmenovali, fungovaly dál a nevracely chybu 404. Zadejte starou cestu do pole **Z** a novou cestu do pole **Do**, poté klikněte na **Uložit**. Přesměrování má také přednost před vestavěnými stránkami B1 (`/sermons`, `/stream`, `/donate`, `/bible` a `/votd`), takže můžete tuto adresu nasměrovat jinam (například na vlastní stránku s kázáními nebo kanál na YouTube). Nepřepíše stránku, kterou jste sami vytvořili na stejné adrese. Pokud chcete, aby se přesměrování použilo, nejprve tuto stránku smažte.

## Vlastní CSS a JavaScript

1. V panelu **Nastavení stylů** klikněte na **CSS a JavaScript**.
2. Do pole **Vlastní CSS** přidejte styly, kterými přepíšete výchozí vzhled, pokud potřebujete pokročilé úpravy.
3. Do pole **Vlastní HTML** vložte sledovací kódy nebo jiné skripty.
4. V sekci **Běžné příklady JavaScriptu** najdete úryvky, například pro propojení s Google Analytics.

:::warning
Vlastní CSS je silný nástroj, ale při nesprávném použití může rozbít rozložení webu. Většina sborů dosáhne požadovaného vzhledu pomocí vestavěných nástrojů pro barvy, písma a rozestupy. Vlastní CSS používejte jen tehdy, pokud se cítíte dobře ve webovém vývoji.
:::

:::info
Váš web vynucuje zásadu zabezpečení obsahu (Content Security Policy), která blokuje vložené skripty z jakéhokoli jiného zdroje. Pole **Vlastní HTML** zde a [prvek HTML](./page-editor.md#using-the-html-element) na jednotlivých stránkách jsou důvěryhodné výjimky: kód, který zde uložíte, se spustí tak, jak je, proto vkládejte pouze skripty z důvěryhodných zdrojů (značky analytiky, chatovací widgety a podobné vložené prvky).
:::

## Motivy stylů

Pokud hledáte rychlý výchozí bod, nabízejí **Navrhované palety** v sekci Barevná paleta předpřipravené motivy, které nastaví koordinované barvy jedním kliknutím. Jednotlivá nastavení můžete vždy doladit i po použití motivu.

## Další kroky

- [Správa stránek](./managing-pages.md) -- Vytváření a organizace stránek webu
- [Soubory](./files.md) -- Nahrávání mediálních souborů pro váš web
