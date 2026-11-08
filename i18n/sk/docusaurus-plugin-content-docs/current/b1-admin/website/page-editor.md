---
title: "Používanie editora stránok"
description: "Nastavte editor stránok v B1 Admin pridávaním sekcií a prvkov, ich štylizáciou, náhľadom na mobile a publikovaním konceptov. Obsahuje aj vrátenie zmien a históriu verzií."
---

# Používanie editora stránok

<div class="article-intro">

Editor stránok B1 je vizuálny nástroj na presúvanie prvkov, ktorý vám umožní navrhovať stránky vášho kostolného webu bez písania akéhokoľvek kódu. Môžete pridávať sekcie a obsahové bloky, prispôsobovať štýly, zobrazovať náhľad svojej práce a vracať zmeny späť – to všetko priamo vo vašom prehliadači.

</div>

## Video s návodom

<YouTube id="m2B_JxmfFm4" title="Úprava stránok a navigácie v B1" next="Pripojenie vlastnej domény v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Dokončite [počiatočné nastavenie](./initial-setup.md), aby bola vaša webová stránka nakonfigurovaná
- Vytvorte aspoň jednu stránku v časti [Správa stránok](./managing-pages.md)
- Na prístup k editoru potrebujete oprávnenie **content.edit**

</div>

## Otvorenie editora

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu), rozbaľte položku **Website** a kliknite na **Pages**.
2. V tabuľke stránok nájdite stránku, ktorú chcete upraviť, a kliknite na **Edit Content**.

Editor sa otvorí na celú obrazovku. Ľavý panel zobrazuje štruktúru vašej stránky a dostupné obsahové prvky; stredná oblasť zobrazuje živý náhľad vašej stránky.

:::info
Editor sa vždy zobrazuje vo svetlom režime bez ohľadu na nastavenie motívu v B1 Admin a používa nadpisové a textové písma, ktoré ste zvolili v časti [Vzhľad](./appearance.md). Tým sa zabezpečí, že náhľad presne zodpovedá tomu, ako bude vaša stránka vyzerať pre návštevníkov webu.
:::

## Štruktúra stránky: sekcie a prvky

Každá stránka je zložená z dvoch úrovní:

- **Sekcie** -- Najvyššie kontajnery, ktoré rozdeľujú vašu stránku na horizontálne pásy (napríklad hlavná sekcia, blok s obsahom alebo pás pätičky). Každá stránka musí mať aspoň jednu sekciu, skôr než do nej pridáte obsah.
- **Prvky** -- Jednotlivé obsahové časti umiestnené vnútri sekcie, napríklad text, obrázky, tlačidlá, karty, formuláre a kalendáre.

### Pridanie sekcie

1. Kliknite na **Add Section** (alebo na tlačidlo **+** v hornej časti ľavého panela).
2. Vyberte, ako začať:
   - **Zo šablóny** -- Prezrite si galériu šablón sekcií usporiadanú podľa kategórií (Hero, About, Services, Giving atď.) a kliknutím na jednu z nich vložte plne štylizovanú, vopred vyplnenú sekciu. Po pridaní ju môžete ľubovoľne upraviť.
   - **Prázdna sekcia** -- Vyberte rozloženie stĺpcov (jeden stĺpec, dva stĺpce, tri stĺpce atď.) a vytvorte obsah od začiatku.
3. Nová sekcia sa zobrazí v náhľade. Kliknutím na ňu ju vyberiete a nastavíte farbu pozadia, odsadenie a ďalšie možnosti štýlu.

### Zmena rozloženia sekcie

Ak ste už sekciu vytvorili, ale chcete inú štruktúru? Použite prepínač rozloženia v danej sekcii a vymeňte rozmiestnenie jej stĺpcov za iné z galérie, pričom si ponecháte existujúci obsah a prvky na ich pôvodnom mieste.

### Pridanie prvkov do sekcie

1. Kliknite vnútri sekcie v náhľade, aby ste ju vybrali.
2. Kliknite na **Add Content** a zo zoznamu vyberte typ prvku:
   - **Text** -- Nadpisy, odseky a formátovaný text
   - **Image** -- Nahrajte fotografiu alebo na ňu vytvorte odkaz
   - **Button** -- Klikateľný odkaz s výzvou na konanie
   - **Card** -- Obrázok s nadpisom a popisom
   - **Form** -- Vložte [formulár](../forms/creating-forms.md) priamo na stránku. Ak má formulár [hlavičkovú fotografiu](../forms/creating-forms.md#adding-a-header-photo), zobrazí sa nad otázkami
   - **Calendar** -- Zobrazte kalendár udalostí
   - **FAQ** -- Bloky otázok a odpovedí v štýle akordeónu
   - **Video** -- Vložte video podľa URL adresy
   - **Groups Browser** -- Filtrovateľný adresár všetkých cirkevných skupín s voliteľným vyhľadávaním, filtrom kategórií a filtrom štítkov. Jeho **Layout** môže byť **Grid** (predvolené) alebo **Scrolling (automatic)** -- pozrite si [Posúvacie rozloženia](#scrolling-layouts)
   - **Group List** -- Dlaždice vašich verejných skupín, prípadne len skupiny s daným štítkom. Jeho **Layout** môže byť **Grid** (predvolené; až tri dlaždice v riadku) alebo **Scrolling (automatic)** -- pozrite si [Posúvacie rozloženia](#scrolling-layouts)
   - **Icon Feature** -- Ikona s nadpisom a krátkym popisom na zvýraznenie funkcií alebo služieb
   - **Gallery** -- Mriežka s viacerými fotografiami alebo rozloženie typu masonry
   - **Testimonial** -- Jedna alebo viac citácií s menom autora, funkciou a fotografiou
   - **Social Icons** -- Ikony s odkazmi na profily vašej cirkvi na sociálnych sieťach: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo a Podcast. Pri každej ikone, ktorú chcete zobraziť, vyplňte odkaz; pri **WhatsApp** použite odkaz `https://wa.me/` s vaším číslom alebo odkaz na pozvánku do skupiny
   - **Countdown** -- Časovač odpočítavajúci čas do konkrétneho dátumu alebo do času týždennej bohoslužby
   - **Stats** -- Rad veľkých čísel s popismi (členovia, roky, pobočky)
   - **Campaign Progress** -- Živý ukazovateľ priebehu pre kampaň darovania, ktorý zobrazuje celkovú sumu vybranú na cieľ fondu
   - **Staff Grid** -- Karty s fotografiami členov skupiny; skupina musí mať zapnutú možnosť **public roster**
   - **Service Times** -- Harmonogram bohoslužieb vašich pobočiek, ktorý sa automaticky načíta z nastavenia účasti
   - **Sermons** -- Vaša knižnica kázní ako úplný prehliadač alebo v rozložení mriežky, zoznamu alebo so zvýraznenou najnovšou kázňou
   - **Map** -- Vložená mapa so stredom na adrese vašej cirkvi
   - **Table** -- Jednoduchá mriežka riadkov a stĺpcov pre tabuľkový obsah
   - **Text with Photo** -- Text a obrázok vedľa seba
   - **Logo** -- Logo vašej cirkvi, načítané z [Vzhľadu](./appearance.md)
   - **Live Stream** -- Prehrávač vášho živého prenosu vložený priamo na stránku
   - **Podcast** -- Zoznam epizód načítaný z externej URL adresy RSS kanála podcastu, ktorú zadáte, s nastaveniami počtu zobrazených epizód a toho, či sa majú zobrazovať dátumy a popisy. Každá epizóda na živej stránke má audio prehrávač a odkaz **Download**, ktorý uloží zvukový súbor epizódy pod názvom epizódy. Slúži na zverejnenie ľubovoľného kanála podcastu na vašom webe; ak chcete svoje vlastné kázne publikovať ako podcast, pozrite si namiesto toho [Správa kázní](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Tlačidlo na darovanie alebo vložený formulár na darovanie
   - **HTML** -- Váš vlastný surový HTML kód pre pokročilé použitie, napríklad vloženie widgetu tretej strany (pozrite si [Používanie prvku HTML](#using-the-html-element))
   - **iFrame** -- Vloženie externého obsahu podľa URL adresy
3. Prvok nakonfigurujte pomocou panela nastavení, ktorý sa zobrazí.

### Používanie prvku HTML

Prvok **HTML** má dve polia:

- **HTML Content** -- Značkovanie, ktoré sa zobrazí na stránke. Všetky značky `<script>`, ktoré tu vložíte, sa spustia na vašej živej stránke.
- **JavaScript (exclude script tag)** -- Skriptový kód, ktorý sa spustí pri načítaní stránky. Sem môžete tiež vložiť vloženú ukážku (embed) od dodávateľa aj so značkami `<script>` a spustí sa na živej stránke.

Ak do poľa JavaScript vložíte iba webovú adresu (napríklad odkaz na obrázok), pole sa sfarbí na červeno s upozornením *„This is a web address, not JavaScript.“* Samotná adresa v tomto poli nerobí nič. Ak chcete zobraziť obrázok, použite prvok **Image** alebo vložte `<img src="...">` do poľa **HTML Content**.

### Používanie prvku Kalendár {#using-the-calendar-element}

Prvok **Calendar** zobrazuje udalosti z jedného z vašich kalendárov:

1. V časti **Select** vyberte **Group Calendar** (udalosti jednej skupiny -- zoznam zobrazuje skupiny, ktorých ste členom) alebo **Curated Calendar** (kalendár, ktorý ste vytvorili v časti **Calendars**; pozrite si [Kurátorovaný kalendár](../calendars/curated-calendar.md)).
2. V časti **Select Calendar** vyberte skupinu alebo kalendár.
3. V časti **Display** vyberte spôsob zobrazenia:
   - **Month calendar** -- Mesačná mriežka, v ktorej môžu návštevníci prechádzať jednotlivé mesiace. Každá udalosť je zafarbená podľa skupiny, do ktorej patrí, takže udalosti skupiny majú rovnakú farbu v každom kalendári. B1 farby vyberá automaticky; nie je potrebné nič nastavovať.
   - **Upcoming events** -- Mriežka dlaždíc pre najbližších 12 nadchádzajúcich udalostí, pričom sa opakujúca sa udalosť zobrazí iba raz pri jej najbližšom termíne. Každá dlaždica zobrazuje fotografiu udalosti (alebo jej názov na tmavej farbe vašej témy, ak fotografia chýba), odznak s dátumom, deň a čas a prvý riadok popisu. Tlačidlo **Subscribe** nad dlaždicami umožňuje návštevníkom skopírovať odkaz ICS na kalendár alebo ho stiahnuť. Pre toto zobrazenie sa objaví nastavenie **Layout**: **Grid** (predvolené) alebo **Scrolling (automatic)**, ktoré umiestni dlaždice do jedného riadka, ktorý sa sám posúva (pozrite si [Posúvacie rozloženia](#scrolling-layouts)). Pri **Curated Calendar** zapnite nastavenie **Group badge**, aby sa v pravom hornom rohu každej dlaždice zobrazil názov skupiny farbou kalendára danej skupiny. Udalosti z archivovaných alebo dôverných skupín odznak nemajú.
4. Ak chcete zobraziť iba niektoré udalosti, zadajte štítok do poľa **Only events tagged** -- napríklad `youth`. Zobrazia sa len udalosti, ktorých **Tags** obsahujú dané slovo. Ak pole necháte prázdne, zobrazia sa všetky udalosti. Štítky sa nastavujú pri každej udalosti; pozrite si [Pridávanie a úprava udalostí](../calendars/creating-calendars.md#adding-and-editing-events).

V oboch zobrazeniach otvorí kliknutie na udalosť jej vlastnú stránku na vašom webe. Stránka udalosti zobrazuje fotografiu, názov, dátum a čas udalosti a popis, a tiež box s údajmi **When** (vrátane vzoru opakovania pri opakujúcej sa udalosti) a **Where** (miestnosti rezervované pre danú udalosť). Ak je registrácia zapnutá, zobrazí sa aj tlačidlo **Register for this Event** a odkaz **Add to my calendar**, ktorý udalosť stiahne ako súbor kalendára. Stránka je pripravená tak, aby vyhľadávače mohli vo výsledkoch zobraziť dátum a podrobnosti udalosti. Stránky udalostí z kurátorovaných kalendárov zobrazených na vašich stránkach (pre udalosti v najbližších šiestich mesiacoch) sa tiež uvádzajú v mape stránok vášho webu, aby ich vyhľadávače mohli nájsť.

### Posúvacie rozloženia {#scrolling-layouts}

Rozloženie **Scrolling (automatic)** v prvkoch **Groups Browser**, **Group List** a v zobrazení **Upcoming events** prvku Calendar umiestni dlaždice do jedného riadka namiesto mriežky. Na telefóne každá dlaždica vyplní celý riadok; na počítači sa vedľa seba zmestia dve dlaždice. Ak je dlaždíc viac, než sa zmestí, riadok:

- Každé približne štyri sekundy posunie o jednu dlaždicu vpred a po poslednej dlaždici sa vráti na prvú.
- Pozastaví sa, keď návštevník nad ním podrží kurzor, dotkne sa ho alebo sa doň prepne tabulátorom, a po niekoľkých sekundách pokračuje.
- Pod riadkom zobrazí rad bodiek, jednu za každú dlaždicu, pričom bodka aktuálnej dlaždice je vyplnená. Návštevník môže kliknutím na bodku prejsť na danú dlaždicu.

Na zariadeniach s nastavením zníženého pohybu riadok zostáva nehybný a návštevníci ho potiahnu alebo posúvajú sami. Ak sa všetky dlaždice zmestia, riadok sa nehýbe a bodky sa nezobrazia.

### Zmena poradia obsahu

Sekcie alebo prvky presuniete potiahnutím za ikonu úchytu (šesť bodiek) na ľavej strane každej položky. Prvky môžete presúvať v rámci sekcie alebo ich premiestniť do iných sekcií.

## Štylizácia stránky

### Štýly sekcie

Kliknutím na ľubovoľnú sekciu otvoríte jej panel štýlov. Môžete nastaviť:

- **Background** -- Jednofarebné pozadie, prechod farieb alebo obrázok. Pri pozadí s obrázkom vám výber **Focal Point** umožňuje kliknutím určiť, ktorá časť obrázka zostane v strede pri zmene veľkosti sekcie, a možnosť farby **Overlay** vám umožní pridať nad obrázok polopriehľadný náter, ktorý zlepší čitateľnosť textu.
- **Padding** -- Horný a dolný odstup vnútri sekcie
- **Width** -- Na celú šírku alebo vycentrované/obmedzené šírky
- **Dividers** -- Dekoratívne tvarované oddeľovače (vlna, šikmina, oblúk, trojuholník a ďalšie) na hornom alebo dolnom okraji sekcie s možnosťami farby, výšky a otočenia

### Štýly prvku

Kliknutím na ľubovoľný prvok otvoríte jeho panel štýlov. Medzi bežné možnosti patrí veľkosť písma, farba, zarovnanie, odsadenie (margin) a vnútorné odsadenie (padding). Pri obrázkoch môžete nastaviť alternatívny text a cieľ odkazu.

### Vlastné CSS

Pre pokročilú úpravu vzhľadu má každá sekcia a každý prvok pole **Custom CSS**, do ktorého môžete napísať vlastné pravidlá CSS. Tie sa vzťahujú len na daný prvok, takže nemôžu neúmyselne ovplyvniť ostatné časti stránky.

:::tip
Ak potrebujete použiť štýly na celý váš web -- napríklad vlastné písmo alebo globálnu farbu -- použite nastavenia [Vzhľad](./appearance.md) namiesto vlastného CSS na jednotlivých stránkach.
:::

## Náhľad stránky

Ovládacie prvky náhľadu na paneli nástrojov vám umožňujú skontrolovať, ako stránka vyzerá pri rôznych veľkostiach obrazovky:

- **Desktop** -- Zobrazenie na celú šírku prehliadača
- **Mobile** -- Úzke zobrazenie v rozmere telefónu

Na telefónoch sa stĺpce v riadku skladajú jeden nad druhým na celú šírku, pokiaľ im v nastaveniach riadka nenastavíte **Mobile Width**. Zoznamy kázní a podcastov tiež na telefónoch zobrazujú text každej epizódy pod jej miniatúrou.

Ak chcete vidieť živú stránku presne tak, ako ju uvidia návštevníci, vráťte sa do zoznamu stránok a kliknite na cestu danej stránky. Otvorí sa v novej karte prehliadača.

## Kontrola prístupnosti

Kliknutím na ikonu **Accessibility** na paneli nástrojov spustíte rýchlu kontrolu bežných problémov -- obrázky bez alternatívneho textu, nízky farebný kontrast alebo nadpisy v nesprávnom poradí. Každý problém vás priamo odkáže na prvok, ktorý treba opraviť, aby ste ho mohli upraviť priamo na mieste.

## Vrátenie zmien

Editor automaticky sleduje históriu vašich úprav. Na pohyb v nej použite tlačidlá na paneli nástrojov alebo klávesové skratky:

- **Undo** (Ctrl+Z / Cmd+Z) -- Vrátenie vašej poslednej akcie
- **Redo** (Ctrl+Shift+Z alebo Ctrl+Y / Cmd+Shift+Z) -- Opätovné použitie vrátenej akcie

Stránku môžete tiež obnoviť do skoršieho stavu zo snímky. Kliknutím na **View history** na paneli nástrojov zobrazíte zoznam uložených snímok s popismi a kliknutím na ľubovoľnú položku obnovíte stránku do tohto bodu.

:::warning
Obnovenie snímky nahradí aktuálny obsah stránky verziou zo snímky. Túto akciu nie je možné vrátiť štandardným tlačidlom späť. Ak chcete mať možnosť sa k aktuálnemu stavu vrátiť, pred obnovením starej snímky si uložte snímku aktuálneho stavu.
:::

## Ukladanie a publikovanie

Zmeny sa ukladajú automaticky, ako pracujete. Stavový indikátor na paneli nástrojov ukazuje, či boli vaše zmeny uložené.

### Stav konceptu a publikovania

Stránky môžu mať stav **published**, ktorý určuje, kedy návštevníci uvidia vaše zmeny. Panel nástrojov zobrazuje štítok so súčasným stavom:

- **Live on save** -- Stránka nepoužíva pracovný postup publikovania. Každá uložená zmena sa okamžite zverejní. Toto je predvolený stav nových stránok.
- **Unpublished changes** -- Stránka už bola niekedy publikovaná, ale od posledného publikovania ste urobili zmeny. Návštevníci stále vidia predtým publikovanú verziu.
- **Published** -- Stránka je zverejnená a váš uložený obsah zodpovedá tomu, čo vidia návštevníci.

Svoje zmeny publikujete kliknutím na tlačidlo **Publish** na paneli nástrojov. Stránka sa okamžite zverejní.

Ak sa chcete vrátiť k poslednej publikovanej verzii bez toho, aby to ovplyvnilo, čo vidia návštevníci, otvorte ponuku s tromi bodkami (⋮) a kliknite na **Discard unpublished changes**.

Ak chcete prestať používať pracovný postup publikovania, otvorte ponuku s tromi bodkami a kliknite na **Turn off publishing**. Úpravy sa potom znovu okamžite zverejňujú.

:::tip
Pracovný postup konceptu a publikovania využite vtedy, keď chcete stránku pripraviť -- napríklad na nadchádzajúcu udalosť -- a sprístupniť ju až v správnom okamihu. Stránku vytvorte a skontrolujte v náhľade, potom kliknite na Publish, keď budete pripravení.
:::

## Súvisiace články

- [Správa stránok](./managing-pages.md) -- Vytváranie stránok, nastavovanie URL adries a správa navigácie webu
- [Vzhľad](./appearance.md) -- Nastavenie farieb, písiem a brandingu pre celý web
- [Súbory](./files.md) -- Nahrávanie obrázkov a dokumentov na použitie v editore
- [Vytváranie formulárov](../forms/creating-forms.md) -- Vytváranie formulárov, ktoré môžete vkladať na stránky
