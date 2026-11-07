---
title: "Správa stránok"
description: "Vytvárajte, upravujte a organizujte stránky a navigáciu v zobrazení Stránky webu v B1 Admin vrátane nastavení stránky, presmerovaní a šablón."
---

# Správa stránok

<div class="article-intro">

Zobrazenie Stránky webu je váš centrálny bod na vytváranie, úpravy a organizáciu všetkých stránok na webe vašej cirkvi. Obsah stránok aj navigáciu webu môžete spravovať z tejto jednej obrazovky.

</div>

<div class="prereqs">
<h4>Pred začiatkom</h4>

- Dokončite [Počiatočné nastavenie](./initial-setup.md), aby ste nastavili doménu a základné nastavenia webu
- Pripravte si obsah a obrázky. Najprv nahrajte mediálne súbory pomocou správcu [Súbory](./files.md).

</div>

:::info
Ak má vaša cirkev viac webov (napríklad samostatné weby pre jednotlivé pobočky), použite prepínač webov v hornej časti zobrazenia Stránky webu a prepínajte sa medzi nimi. Každý web má vlastné stránky, navigáciu a nastavenia [vzhľadu](./appearance.md).
:::

## Typy stránok

Tabuľka **Stránky** uvádza každú stránku na vašom webe podľa **Cesty** a **Názvu**. Existujú dva druhy stránok:

- **Generované** -- Stránky, ktoré systém automaticky vytvoril na základe údajov vašej cirkvi (napríklad stránka Skupiny, stránka Kázne alebo samostatná stránka pre každú kázeň vo vašej knižnici). Tieto stránky majú odznak **Generované** a sami sa aktualizujú pri zmene údajov.
- **Vlastné** -- Stránky, ktoré ste vytvorili sami s vlastným obsahom a rozložením.

Ľubovoľnú automaticky generovanú stránku môžete previesť na vlastnú, ak chcete mať úplnú kontrolu nad jej obsahom a dizajnom. Kliknite na **Previesť** vedľa generovanej stránky a potvrďte.

## Pridávanie a úprava stránok

1. Kliknite na tlačidlo **Pridať stránku** v pravom hornom rohu zobrazenia Stránky webu.
2. Vyberte typ stránky (prázdna alebo šablóna) a zadajte jej názov.
3. Kliknite na **Upraviť obsah** vedľa ľubovoľnej stránky a otvorte [editor stránok](./page-editor.md), kde môžete pridávať sekcie, text, obrázky a ďalšie prvky.
4. Kliknite na **Nastavenia stránky** vedľa stránky, ak chcete upraviť jej názov, cestu URL a ďalšie metaúdaje.
5. Kliknutím na cestu stránky v stĺpci **Cesta** otvoríte živú stránku na novej karte a uvidíte presne, ako bude vyzerať pre návštevníkov.

:::tip
Pre domovskú stránku nastavte cestu URL len na `/`. Pre všetky ostatné stránky použite výstižnú cestu, napríklad `/about` alebo `/contact`.
:::

### Nastavenia stránky

Otvorte **Nastavenia stránky** pri ľubovoľnej stránke, aby ste nastavili:

- **Názov a cestu URL** -- Názov stránky a jej adresa na vašom webe.
- **Viditeľnosť** -- Určite, kto môže stránku vidieť: každý, len členovia, len zamestnanci alebo členovia konkrétnych skupín. Je to rýchly spôsob, ako obmedziť prístup k súkromnej stránke (napríklad stránke so zdrojmi pre zamestnancov) bez samostatného hesla.
- **Meta popis** -- Krátke zhrnutie, ktoré sa zobrazuje vo výsledkoch vyhľadávačov a v náhľadoch odkazov na sociálnych sieťach.
- **Presmerovania** -- Nasmerujte starú cestu URL na túto stránku, aby odkazy a záložky na zrušenú stránku ďalej fungovali.

## Správa navigácie

Panel **Hlavná navigácia** na pravej strane zobrazenia Stránky webu zobrazuje odkazy na navigáciu. Tieto odkazy riadia menu, ktoré návštevníci vidia na vašom webe.

1. Kliknite na **Pridať**, aby ste vytvorili nový navigačný odkaz. Môže smerovať na ľubovoľnú stránku vášho webu alebo na externú URL.
2. Ak chcete odkazy preusporiadať, presuňte ich myšou do želaného poradia. Odkazy môžete tiež vnoriť pod nadradenú položku a vytvoriť rozbaľovacie menu.
3. Kliknutím na ľubovoľný odkaz otvorte jeho **Nastavenia odkazu**, kde môžete zmeniť text, URL alebo nadradenú stránku.
4. Ak chcete odkaz odstrániť z navigácie, otvorte jeho **Nastavenia odkazu** a kliknite na **Odstrániť**.

:::info
Odstránenie navigačného odkazu neodstráni samotnú stránku. Stránka stále existuje a dá sa otvoriť priamo cez jej URL -- jednoducho sa nezobrazí v menu.
:::

## Prepínače pre celý web

Pod odkazmi v paneli **Hlavná navigácia** sú dva prepínače, ktoré platia pre celý web vašej cirkvi:

- **Zobraziť prihlásenie** -- Zobrazí tlačidlo **Prihlásiť sa** na navigačnom paneli vášho webu.
- **Vypnúť verejný web** -- Vypne váš verejný web. Použite ho, ak vaša cirkev používa B1 len pre členský portál, darovanie a registrácie a hlavný web má umiestnený inde.

### Čo robí vypnutie verejného webu

Keď je **Vypnúť verejný web** zapnuté:

- Každá verejná stránka vrátane domovskej stránky a vašich vlastných stránok presmeruje návštevníkov, ktorí nie sú prihlásení, na prihlasovaciu obrazovku. Po prihlásení sa vrátia na stránku, o ktorú žiadali.
- Prihlásení členovia vidia celý web ako obvykle vrátane navigácie a vstavaných **generovaných** stránok (napríklad Skupiny a Kázne). Generované stránky sa už nezobrazujú v tabuľke Stránky.
- Vyhľadávačom sa oznamuje, aby web neindexovali. Mapa stránok je prázdna a súbor `robots.txt` blokuje všetky prehľadávanie.

Tieto odkazy fungujú ďalej, takže k nim majú členovia aj hostia stále prístup:

- Prihlásenie a odhlásenie
- Členský portál (všetko pod `/mobile`)
- Odkazy na [registráciu na udalosti](../guides/event-registration.md) a registrácia hostí

Pod prepínačom sa počas vypnutého verejného webu zobrazuje upozornenie. Ak chcete stránky znova sprístupniť, prepínač opäť vypnite. Počas vypnutia webu sa nič nevymaže.

:::info
Toto nastavenie platí pre celú vašu cirkev. Ak máte viac webov, vypne všetky z nich, nielen ten, ktorý je vybraný v prepínači webov.
:::

## Tipy na organizáciu webu

- Hlavná navigácia nech má päť alebo šesť položiek, aby návštevníci rýchlo našli, čo hľadajú.
- Súvisiace podstránky vnorte pod nadradený odkaz (napríklad rozbaľovacie menu „O nás" s položkami „Náš tím", „Presvedčenia" a „História").
- Skontrolujte navigáciu na telefóne, aby fungovala dobre na menších obrazovkách.
- Stránkam dajte jasné a výstižné názvy, ktoré pomôžu návštevníkom pochopiť, čo na nich nájdu.

:::tip
Na stránky môžete pridať [formuláre](../forms/creating-forms.md), aby ste od návštevníkov zbierali registrácie, modlitebné prosby alebo iné informácie.
:::

## Začíname so šablónou webu

Ak budujete web od nuly, môžete ho vytvoriť pomocou **Šablóny webu** namiesto vytvárania stránok jednu po druhej. Šablóna webu vytvorí súbor vopred pripravených stránok -- domovskú, o nás, spojenie, darovanie a ďalšie -- s ukážkovým obsahom a už prepojenou navigáciou.

1. Na obrazovke Stránky kliknite na tlačidlo **Začať zo šablóny** (vedľa tlačidla **Pridať stránku**).
2. Prezrite si dostupné šablóny a kliknutím na jednu zobrazte štruktúru jej stránok.
3. Keď nájdete vhodnú šablónu, kliknite na **Použiť šablónu**.
4. Stránky, ktoré ešte neexistujú, sa vytvoria a pridajú do navigácie. Existujúce stránky zostanú nezmenené.

Po použití šablóny otvorte každú stránku v [editore stránok](./page-editor.md) a nahraďte ukážkový text a obrázky skutočným obsahom vašej cirkvi.

:::info
Šablóny webu vytvárajú štruktúru stránok a navigáciu. Neprepisujú farebnú schému ani písma webu -- tie riadi [Vzhľad](./appearance.md).
:::

## Zväčšenie obrázkov (lightbox)

Keď návštevníci kliknú na obrázok na vašom webe, otvorí sa na celú obrazovku v prekrytí lightbox. Ľudia si tak môžu prezrieť fotografie vo väčšej veľkosti bez opustenia stránky. Nie je potrebné nič nastavovať -- lightbox sa automaticky zapne pre obrázky v obsahu vašich stránok.

## Ďalšie kroky

- [Počiatočné nastavenie](./initial-setup.md) -- Pokyny na prvé nastavenie
- [Použitie editora stránok](./page-editor.md) -- Naučte sa, ako vytvárať a štýlovať obsah stránok
- [Vzhľad](./appearance.md) -- Prispôsobte si vizuálny motív vášho webu
- [Súbory](./files.md) -- Nahrávajte a spravujte mediálne súbory pre svoje stránky
