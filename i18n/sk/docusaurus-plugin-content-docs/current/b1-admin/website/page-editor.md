---
title: "Práca s editorom stránok"
description: "Nastavte editor stránok v B1 Admin: pridávajte sekcie a prvky, upravujte štýl, pozrite náhľad na mobile a publikujte koncepty. Vrátane späť a verzií."
---

# Práca s editorom stránok

<div class="article-intro">

Editor stránok B1 je vizuálny nástroj na tvorbu pomocou presúvania prvkov (drag-and-drop), ktorý vám umožňuje navrhovať stránky webu vašej cirkvi bez písania akéhokoľvek kódu. Môžete pridávať sekcie a bloky obsahu, prispôsobovať štýly, zobraziť náhľad svojej práce a vrátiť zmeny späť -- to všetko priamo vo vašom prehliadači.

</div>

## Výukové video

<YouTube id="m2B_JxmfFm4" title="Úprava stránok a navigácie v B1" next="Pripojenie vlastnej domény v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončite [Počiatočné nastavenie](./initial-setup.md), aby ste mali nakonfigurovaný svoj web
- Vytvorte aspoň jednu stránku v časti [Správa stránok](./managing-pages.md)
- Na prístup k editoru potrebujete oprávnenie **content.edit**

</div>

## Otvorenie editora

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), rozbaľte položku **Web** a kliknite na **Stránky**.
2. V tabuľke stránok nájdite stránku, ktorú chcete upraviť, a kliknite na **Upraviť obsah**.

Editor sa otvorí na celú obrazovku. Ľavý panel zobrazuje štruktúru vašej stránky a dostupné prvky obsahu; stredná oblasť zobrazuje živý náhľad vašej stránky.

:::info
Editor sa vždy zobrazuje vo svetlom režime bez ohľadu na nastavenie motívu v B1 Admin a používa nadpisové a textové písma, ktoré ste zvolili v časti [Vzhľad](./appearance.md). Týmto sa zabezpečí, že náhľad presne zodpovedá tomu, ako bude stránka vyzerať pre návštevníkov webu.
:::

## Štruktúra stránky: sekcie a prvky

Každá stránka je zostavená z dvoch úrovní:

- **Sekcie** -- Najvyššie kontajnery, ktoré rozdeľujú stránku na horizontálne pásy (napríklad hlavnú sekciu, blok obsahu alebo pás pätičky). Každá stránka musí mať aspoň jednu sekciu, kým môžete pridať obsah.
- **Prvky** -- Jednotlivé časti obsahu umiestnené v sekcii, ako sú text, obrázky, tlačidlá, karty, formuláre a kalendáre.

### Pridanie sekcie

1. Kliknite na **Pridať sekciu** (alebo na tlačidlo **+** v hornej časti ľavého panela).
2. Zvoľte, ako začať:
   - **Zo šablóny** — prezrite si galériu šablón sekcií usporiadanú podľa kategórií (Hero, O nás, Služby, Dary a pod.) a kliknutím na jednu ju vložte ako plne naštýlovanú sekciu s predvyplneným obsahom. Po pridaní môžete všetko prispôsobiť.
   - **Prázdna sekcia** — zvoľte rozloženie stĺpcov (jeden, dva, tri stĺpce atď.) a zostavte ju od začiatku.
3. Nová sekcia sa zobrazí v náhľade. Kliknutím na ňu ju vyberiete a nastavíte jej farbu pozadia, vnútorné odsadenie a ďalšie možnosti štýlu.

### Zmena rozloženia sekcie

Už ste sekciu vytvorili, ale chcete inú štruktúru? Pomocou prepínača rozloženia v tejto sekcii môžete zameniť usporiadanie stĺpcov za iné z galérie a zachovať pritom existujúci obsah a prvky.

### Pridanie prvkov do sekcie

1. Kliknutím do sekcie v náhľade ju vyberte.
2. Kliknite na **Pridať obsah** a zo zoznamu vyberte typ prvku:
   - **Text** -- Nadpisy, odseky a formátovaný text
   - **Obrázok** -- Nahrajte fotografiu alebo na ňu vložte odkaz
   - **Tlačidlo** -- Klikateľný odkaz na výzvu k akcii
   - **Karta** -- Obrázok s nadpisom a popisom
   - **Formulár** -- Priamo na stránku vložte [formulár](../forms/creating-forms.md). Ak má formulár [hlavičkovú fotografiu](../forms/creating-forms.md#adding-a-header-photo), zobrazí sa nad otázkami.
   - **Kalendár** -- Zobrazenie kalendára udalostí
   - **FAQ** -- Bloky otázok a odpovedí v štýle akordeónu
   - **Video** -- Vloženie videa pomocou URL adresy
   - **Prehliadač skupín** -- Filtrovateľný adresár všetkých skupín cirkvi s voliteľným vyhľadávaním, filtrom kategórií a filtrom štítkov
   - **Ikona s popisom** -- Ikona s nadpisom a krátkym popisom na zvýraznenie funkcií alebo služieb
   - **Galéria** -- Mriežka viacerých fotografií alebo rozloženie typu masonry
   - **Referencia** -- Jeden alebo viac citátov s menom autora, funkciou a fotografiou
   - **Ikony sociálnych sietí** -- Odkazy s ikonami na profily vašej cirkvi na sociálnych sieťach: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo a Podcast. Vyplňte odkaz pre každú sieť, ktorú chcete zobraziť; pri **WhatsApp** použite odkaz `https://wa.me/` s vaším číslom alebo pozvánkový odkaz do skupiny.
   - **Odpočítavanie** -- Časovač odpočítavajúci do dátumu alebo do týždenného času bohoslužby
   - **Štatistiky** -- Rad veľkých čísel s popiskami (členovia, roky, pobočky)
   - **Priebeh kampane** -- Živý ukazovateľ priebehu kampane darov, ktorý zobrazuje celkovú sumu vybranú na cieľ fondu
   - **Mriežka zamestnancov** -- Fotokarty členov skupiny; skupina musí mať zapnutú možnosť **verejný zoznam**
   - **Časy bohoslužieb** -- Rozvrh bohoslužieb vašich pobočiek, ktorý sa automaticky načíta z nastavenia dochádzky
   - **Kázne** -- Vaša knižnica káz, ako úplný prehliadač alebo v rozložení mriežky, zoznamu či zvýraznených najnovších
   - **Mapa** -- Vložená mapa vycentrovaná na adresu vašej cirkvi
   - **Tabuľka** -- Jednoduchá mriežka riadkov a stĺpcov pre tabuľkový obsah
   - **Text s fotografiou** -- Text a obrázok vedľa seba
   - **Logo** -- Logo vašej cirkvi, načítané z [Vzhľadu](./appearance.md)
   - **Živý prenos** -- Prehrávač vášho živého prenosu vložený priamo na stránku
   - **Podcast** -- Zoznam epizód načítaný z externej URL adresy RSS kanála podcastu, ktorú zadáte, s nastaveniami počtu zobrazených epizód a toho, či sa majú zobrazovať dátumy a popisy. Každá epizóda na živej stránke má audio prehrávač a odkaz **Stiahnuť**, ktorý uloží zvukový súbor epizódy pod názvom epizódy. Slúži na zobrazenie ľubovoľného podcastového kanála na vašej stránke; ak chcete vlastné kázne publikovať ako podcast, pozrite namiesto toho [Správa káz](../sermons/managing-sermons.md#your-podcast-feed).
   - **Dar** -- Tlačidlo na dar alebo vložený formulár darov
   - **HTML** -- Vlastný HTML kód na pokročilé použitie, napríklad na vloženie widgetu tretej strany (pozrite [Použitie prvku HTML](#using-the-html-element))
   - **iFrame** -- Vloženie externého obsahu pomocou URL adresy
3. Prvok nakonfigurujte pomocou panela nastavení, ktorý sa zobrazí.

### Použitie prvku HTML

Prvok **HTML** má dve polia:

- **Obsah HTML** -- Značkovanie, ktoré sa má zobraziť na stránke. Všetky značky `<script>`, ktoré tu vložíte, sa spustia na vašej živej stránke.
- **JavaScript (bez značky script)** -- Kód skriptu, ktorý sa spustí po načítaní stránky. Sem môžete tiež vložiť vložený kód dodávateľa aj so značkami `<script>` a spustí sa na živej stránke.

Ak do poľa JavaScript vložíte iba webovú adresu (napríklad odkaz na obrázok), pole sa sfarbí na červeno s upozornením *„Toto je webová adresa, nie JavaScript.“* Holá adresa v tomto poli nemá žiadny účinok. Ak chcete zobraziť obrázok, použite prvok **Obrázok** alebo vložte `<img src="...">` do poľa **Obsah HTML**.

### Použitie prvku Kalendár {#using-the-calendar-element}

Prvok **Kalendár** zobrazuje udalosti z jedného z vašich kalendárov:

1. V časti **Výber** zvoľte **Kalendár skupiny** (udalosti jednej skupiny -- zoznam zobrazuje skupiny, do ktorých patríte) alebo **Kurátorský kalendár** (kalendár, ktorý ste vytvorili v časti **Kalendáre**; pozrite [Kurátorský kalendár](../calendars/curated-calendar.md)).
2. V časti **Vybrať kalendár** vyberte skupinu alebo kalendár.
3. V časti **Zobrazenie** zvoľte, ako ho zobraziť:
   - **Mesačný kalendár** -- Mriežka mesiaca medzi ktorými môžu návštevníci prepínať.
   - **Nadchádzajúce udalosti** -- Mriežka dlaždíc pre najbližších 12 udalostí, pričom opakujúca sa udalosť sa zobrazí raz pri svojom najbližšom termíne. Každá dlaždica zobrazuje fotografiu udalosti (alebo jej názov na tmavej farbe vášho motívu, ak fotografia chýba), odznak s dátumom, deň a čas a prvý riadok jej popisu. Tlačidlo **Odoberať** nad dlaždicami umožňuje návštevníkom skopírovať odkaz ICS kalendára alebo ho stiahnuť. Pre toto zobrazenie sa zobrazí nastavenie **Rozloženie**: **Mriežka** (predvolené) alebo **Posúvanie (automaticky)**, pri ktorom sa dlaždice zobrazia v jednom riadku, ktorý sa sám posúva.
4. Ak chcete zobraziť iba niektoré udalosti, zadajte štítok do poľa **Iba udalosti označené** -- napríklad `youth`. Zobrazia sa len udalosti, ktorých **Štítky** obsahujú toto slovo. Ak pole necháte prázdne, zobrazia sa všetky udalosti. Štítky sa nastavujú pri každej udalosti; pozrite [Pridanie a úprava udalostí](../calendars/creating-calendars.md#adding-and-editing-events).

V obidvoch zobrazeniach kliknutie na udalosť otvorí jej vlastnú stránku na vašom webe. Stránka udalosti zobrazuje fotografiu, názov, dátum a čas a popis udalosti, a tiež rámček s **Kedy** (vrátane vzoru opakovania pri opakujúcej sa udalosti) a **Kde** (miestnosti rezervované pre ňu). Keď je zapnutá registrácia, obsahuje aj tlačidlo **Registrovať sa na túto udalosť** a odkaz **Pridať do môjho kalendára**, ktorý udalosť stiahne ako súbor kalendára. Stránka je nastavená tak, aby vyhľadávače mohli vo výsledkoch zobraziť dátum a podrobnosti udalosti. Stránky udalostí z kurátorských kalendárov zobrazených na vašich stránkach (pre udalosti v nasledujúcich šiestich mesiacoch) sú tiež uvedené v mape stránok vášho webu, aby ich vyhľadávače mohli nájsť.

### Zmena poradia obsahu

Sekcie alebo prvky presúvajte pomocou ikony úchytu (šesť bodiek) na ľavej strane každej položky, aby ste zmenili ich poradie. Prvky môžete presúvať v rámci sekcie alebo ich premiestňovať medzi sekciami.

## Štylizácia stránky

### Štýly sekcií

Kliknutím na sekciu otvorte jej panel štýlov. Môžete nastaviť:

- **Pozadie** -- Jednofarebné, prechod (gradient) alebo obrázok. Pri použití obrázkového pozadia vám nástroj **Ohnisko** umožňuje kliknutím určiť, ktorá časť obrazu zostane v strede pri zmene veľkosti sekcie, a možnosť farby **Prekrytie** vám umožňuje pridať nad obrázok polopriehľadný odtieň, ktorý zlepší čitateľnosť textu.
- **Vnútorné odsadenie** -- Medzery hore a dole vnútri sekcie
- **Šírka** -- Na celú šírku alebo vycentrovaná/ohraničená
- **Oddeľovače** -- Dekoratívne tvarové oddeľovače (vlna, šikmé, oblúk, trojuholník a ďalšie) na hornom alebo dolnom okraji sekcie, s možnosťami farby, výšky a otočenia

### Štýly prvkov

Kliknutím na ľubovoľný prvok otvorte jeho panel štýlov. Medzi bežné možnosti patrí veľkosť písma, farba, zarovnanie, okraj a vnútorné odsadenie. Pri obrázkoch môžete nastaviť alternatívny text a cieľ odkazu.

### Vlastné CSS

Pre pokročilú štylizáciu má každá sekcia a prvok pole **Vlastné CSS**, kam môžete napísať vlastné pravidlá CSS. Tieto pravidlá sa vzťahujú len na daný prvok, takže nebudú neúmyselne ovplyvňovať zvyšok stránky.

:::tip
Ak potrebujete použiť štýly na celý web -- napríklad vlastné písmo alebo globálnu farbu -- použite nastavenia [Vzhľad](./appearance.md) namiesto vlastného CSS na jednotlivých stránkach.
:::

## Náhľad stránky

Pomocou ovládacích prvkov náhľadu na paneli nástrojov skontrolujte, ako vaša stránka vyzerá pri rôznych veľkostiach obrazovky:

- **Počítač** -- Zobrazenie v prehliadači na celú šírku
- **Mobil** -- Úzke zobrazenie v štýle telefónu

Na telefónoch sa stĺpce v riadku zoradia jeden nad druhý na plnú šírku, pokiaľ im v nastaveniach riadku nenastavíte **Šírku pre mobil**. Zoznamy káz a podcastov na telefónoch tiež zobrazujú text každej epizódy pod jej miniatúrou.

Ak chcete vidieť živú stránku presne tak, ako ju uvidia návštevníci, vráťte sa do zoznamu stránok a kliknite na cestu danej stránky. Otvorí sa na novej karte prehliadača.

## Kontrola prístupnosti

Kliknutím na ikonu **Prístupnosť** na paneli nástrojov spustíte rýchlu kontrolu bežných problémov -- obrázky bez alternatívneho textu, nízky farebný kontrast alebo nadpisy v nesprávnom poradí. Každý problém odkazuje priamo na prvok, ktorý vyžaduje pozornosť, takže ho môžete opraviť priamo na mieste.

## Vrátenie zmien

Editor automaticky sleduje históriu úprav. Na pohyb použite tlačidlá na paneli nástrojov alebo klávesové skratky:

- **Späť** (Ctrl+Z / Cmd+Z) -- Vráti vašu poslednú akciu
- **Znova** (Ctrl+Shift+Z alebo Ctrl+Y / Cmd+Shift+Z) -- Znovu použije vrátenú akciu

Stránku môžete tiež obnoviť do staršieho stavu (snímky). Kliknutím na **Zobraziť históriu** na paneli nástrojov zobrazíte zoznam uložených snímok s popismi a kliknutím na ľubovoľnú položku obnovíte stránku do tohto stavu.

:::warning
Obnovenie snímky nahradí aktuálny obsah stránky verziou zo snímky. Tento krok nemožno vrátiť štandardným tlačidlom Späť. Ak si chcete ponechať možnosť návratu, pred obnovením starej snímky si uložte snímku aktuálneho stavu.
:::

## Ukladanie a publikovanie

Zmeny sa ukladajú automaticky počas práce. Indikátor stavu na paneli nástrojov zobrazuje, či boli vaše zmeny uložené.

### Stav konceptu a publikovania

Stránky môžu mať stav **publikované**, ktorý určuje, kedy návštevníci uvidia vaše zmeny. Na paneli nástrojov sa zobrazuje štítok so stavom:

- **Zverejnené pri uložení** -- Stránka nepoužíva postup publikovania. Každá uložená zmena sa okamžite zverejní. Toto je predvolené nastavenie pre nové stránky.
- **Nepublikované zmeny** -- Stránka už bola publikovaná, ale od posledného publikovania ste vykonali zmeny. Návštevníci stále vidia predtým publikovanú verziu.
- **Publikované** -- Stránka je zverejnená a váš uložený obsah zodpovedá tomu, čo vidia návštevníci.

Ak chcete zmeny publikovať, kliknite na tlačidlo **Publikovať** na paneli nástrojov. Stránka sa okamžite zverejní.

Ak sa chcete vrátiť k poslednej publikovanej verzii bez ovplyvnenia toho, čo vidia návštevníci, otvorte ponuku ďalších možností (⋮) a kliknite na **Zahodiť nepublikované zmeny**.

Ak chcete prestať používať postup publikovania, otvorte ponuku ďalších možností a kliknite na **Vypnúť publikovanie**. Úpravy sa potom znova zverejňujú okamžite.

:::tip
Postup konceptu a publikovania použite vtedy, keď chcete stránku pripraviť -- napríklad na nadchádzajúcu udalosť -- a zverejniť ju až v správnom okamihu. Zostavte a zobrazte náhľad stránky a keď budete pripravení, kliknite na Publikovať.
:::

## Súvisiace články

- [Správa stránok](./managing-pages.md) -- Vytváranie stránok, nastavenie URL adries a správa navigácie na webe
- [Vzhľad](./appearance.md) -- Nastavenie farieb, písiem a brandingu pre celý web
- [Súbory](./files.md) -- Nahrávanie obrázkov a dokumentov na použitie v editore
- [Vytváranie formulárov](../forms/creating-forms.md) -- Vytvárajte formuláre, ktoré môžete vložiť na stránky
