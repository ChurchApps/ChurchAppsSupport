---
title: "Používání editoru stránek"
description: "Nastavte editor stránek v B1 Admin: přidávejte sekce a prvky, upravujte jejich styl, zobrazte náhled na mobilu a publikujte koncepty. Včetně historie verzí."
---

# Používání editoru stránek

<div class="article-intro">

Editor stránek B1 je vizuální nástroj pro tvorbu přetahováním, který vám umožňuje navrhovat stránky vašeho church webu bez psaní jakéhokoli kódu. Můžete přidávat sekce a obsahové bloky, upravovat styly, prohlížet náhled a vracet změny zpět. Vše děláte přímo v prohlížeči.

</div>

## Výukové video

<YouTube id="m2B_JxmfFm4" title="Úprava stránek a navigace v B1" next="Připojení vlastní domény v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md), aby byl váš web nakonfigurovaný
- Vytvořte alespoň jednu stránku v části [Správa stránek](./managing-pages.md)
- K otevření editoru potřebujete oprávnění **content.edit**

</div>

## Otevření editoru

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte položku **Website** a klikněte na **Pages**.
2. V tabulce stránek najděte stránku, kterou chcete upravit, a klikněte na **Edit Content**.

Editor se otevře na celou obrazovku. Levý panel zobrazuje strukturu stránky a dostupné obsahové prvky; střední oblast zobrazuje živý náhled stránky.

:::info
Editor se vždy zobrazuje v světlém režimu bez ohledu na nastavení motivu v B1 Admin a používá nadpisové a textové písmo, které jste zvolili v části [Vzhled](./appearance.md). Tím je zajištěno, že náhled přesně odpovídá tomu, jak bude stránka vypadat pro návštěvníky webu.
:::

## Struktura stránky: sekce a prvky

Každá stránka se skládá ze dvou úrovní:

- **Sekce** -- Nejvyšší kontejnery, které rozdělují stránku do vodorovných pásů (například hlavní úvodní sekce, obsahový blok nebo pás zápatí). Než začnete přidávat obsah, musí mít stránka alespoň jednu sekci.
- **Prvky** -- Jednotlivé obsahové části umístěné uvnitř sekce, například text, obrázky, tlačítka, karty, formuláře a kalendáře.

### Přidání sekce

1. Klikněte na **Add Section** (nebo na tlačítko **+** nahoře v levém panelu).
2. Zvolte, jak začít:
   - **Ze šablony** -- Procházejte galerii šablon sekcí rozdělenou do kategorií (Hero, About, Services, Giving atd.) a kliknutím vložte hotovou, předem vyplněnou sekci. Po vložení ji můžete libovolně upravit.
   - **Prázdná sekce** -- Zvolte rozvržení sloupců (jeden sloupec, dva sloupce, tři sloupce atd.) a stránku vytvořte od začátku.
3. Nová sekce se objeví v náhledu. Kliknutím ji vyberte a nastavte barvu pozadí, odsazení a další možnosti stylu.

### Změna rozvržení sekce

Sekci už máte hotovou, ale chcete jiné uspořádání? Použijte přepínač rozvržení u této sekce a vyberte jiné uspořádání sloupců z galerie. Stávající obsah a prvky zůstanou zachovány.

### Přidání prvků do sekce

1. Kliknutím uvnitř sekce v náhledu ji vyberte.
2. Klikněte na **Add Content** a z nabídky zvolte typ prvku:
   - **Text** -- Nadpisy, odstavce a formátovaný text
   - **Image** -- Nahrání nebo odkaz na fotografii
   - **Button** -- Klikatelný odkaz typu výzvy k akci
   - **Card** -- Obrázek s nadpisem a popisem
   - **Form** -- Vložení [formuláře](../forms/creating-forms.md) přímo na stránku. Pokud má formulář [hlavní fotografii](../forms/creating-forms.md#adding-a-header-photo), zobrazí se nad otázkami
   - **Calendar** -- Zobrazení kalendáře událostí
   - **FAQ** -- Bloky otázek a odpovědí ve stylu akordeonu
   - **Video** -- Vložení videa podle URL
   - **Groups Browser** -- Filtrovatelný adresář všech skupin sboru s volitelným vyhledáváním, filtrem kategorií a filtrem štítků
   - **Icon Feature** -- Ikona s nadpisem a krátkým popisem pro zvýraznění služby nebo služebního zaměření
   - **Gallery** -- Mřížka více fotografií nebo rozvržení typu masonry
   - **Testimonial** -- Jedna nebo více citací se jménem autora, rolí a fotografií
   - **Social Icons** -- Odkazované ikony profilů sboru na sociálních sítích: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo a Podcast. U každé ikony, kterou chcete zobrazit, vyplňte odkaz; u **WhatsApp** použijte odkaz `https://wa.me/` s vaším číslem nebo odkaz na pozvánku do skupiny
   - **Countdown** -- Časovač odpočítávající čas do data nebo do pravidelného termínu bohoslužby
   - **Stats** -- Řada velkých čísel s popisky (členové, roky, pobočky)
   - **Campaign Progress** -- Živý ukazatel průběhu sbírkové kampaně, který zobrazuje celkovou částku vybranou na cíl fondu
   - **Staff Grid** -- Karty s fotografiemi členů skupiny; skupina musí mít zapnutou možnost **public roster**
   - **Service Times** -- Rozvrh bohoslužeb vašich poboček, načtený automaticky z nastavení docházky
   - **Sermons** -- Vaše knihovna kázání jako plný prohlížeč nebo jako mřížka, seznam či zvýrazněné nejnovější kázání
   - **Map** -- Vložená mapa vycentrovaná na adresu vašeho sboru
   - **Table** -- Jednoduchá mřížka řádků a sloupců pro tabulková data
   - **Text with Photo** -- Text a obrázek vedle sebe
   - **Logo** -- Logo vašeho sboru načtené z části [Vzhled](./appearance.md)
   - **Live Stream** -- Přehrávač vašeho živého přenosu vložený přímo na stránku
   - **Podcast** -- Seznam epizod načtený z externí adresy RSS kanálu podcastu, který zadáte, s nastavením počtu zobrazených epizod a toho, zda zobrazovat data a popisy. Každá epizoda na živém webu má audio přehrávač a odkaz **Download**, který uloží zvukový soubor epizody pod názvem epizody. Slouží k zobrazení libovolného podcastového kanálu na vašem webu; pokud chcete vlastní kázání publikovat jako podcast, podívejte se místo toho do části [Správa kázání](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Tlačítko pro dary nebo vložený formulář pro dary
   - **HTML** -- Vlastní surový HTML kód pro pokročilé použití, například vložení widgetu třetí strany (viz [Použití prvku HTML](#using-the-html-element))
   - **iFrame** -- Vložení externího obsahu podle URL
3. Prvek nastavte pomocí panelu nastavení, který se zobrazí.

### Použití prvku HTML

Prvek **HTML** má dvě pole:

- **HTML Content** -- Kód, který se zobrazí na stránce. Všechny značky `<script>`, které sem vložíte, se spustí na živém webu.
- **JavaScript (exclude script tag)** -- Skriptový kód, který se spustí při načtení stránky. Sem můžete také vložit vložený kód od dodavatele včetně jeho značek `<script>` a spustí se na živém webu.

Pokud do pole JavaScript vložíte pouze webovou adresu (například odkaz na obrázek), pole se zbarví červeně s upozorněním *„This is a web address, not JavaScript."* Samotná adresa v tomto poli nic neudělá. Chcete-li zobrazit obrázek, použijte prvek **Image** nebo vložte `<img src="...">` do pole **HTML Content**.

### Použití prvku Kalendář {#using-the-calendar-element}

Prvek **Calendar** zobrazuje události z jednoho z vašich kalendářů:

1. V části **Select** zvolte **Group Calendar** (události jedné skupiny -- seznam obsahuje skupiny, jejichž jste členem) nebo **Curated Calendar** (kalendář, který jste vytvořili v části **Calendars**; viz [Kurátorský kalendář](../calendars/curated-calendar.md)).
2. V části **Select Calendar** vyberte skupinu nebo kalendář.
3. V části **Display** zvolte způsob zobrazení:
   - **Month calendar** -- Měsíční mřížka, kterou návštěvníci mohou přepínat mezi měsíci.
   - **Upcoming events** -- Mřížka dlaždic pro nejbližších 12 nadcházejících událostí, přičemž opakující se událost je zobrazena jednou u jejího nejbližšího termínu. Každá dlaždice ukazuje fotografii události (nebo její název na tmavé barvě vašeho motivu, pokud nemá fotografii), štítek s datem, den a čas a první řádek popisu. Tlačítko **Subscribe** nad dlaždicemi umožňuje návštěvníkům zkopírovat odkaz ICS na kalendář nebo jej stáhnout. Pro toto zobrazení se objeví nastavení **Layout**: **Grid** (výchozí) nebo **Scrolling (automatic)**, které umístí dlaždice do jedné řady, jež se sama automaticky posouvá.
4. Chcete-li zobrazit jen některé události, zadejte štítek do pole **Only events tagged** -- například `youth`. Zobrazí se pouze události, jejichž **Tags** obsahují toto slovo. Pokud pole necháte prázdné, zobrazí se všechny události. Štítky se nastavují u každé události; viz [Přidávání a úprava událostí](../calendars/creating-calendars.md#adding-and-editing-events).

V obou zobrazeních se po kliknutí na událost otevře její vlastní stránka na vašem webu. Stránka události zobrazuje fotografii události, název, datum a čas a popis, a také box s informacemi **When** (včetně opakovacího vzorce u opakující se události) a **Where** (místnosti rezervované pro událost). Pokud je zapnuta registrace, objeví se také tlačítko **Register for this Event**, a odkaz **Add to my calendar** stáhne událost jako soubor kalendáře. Stránka je nastavena tak, aby vyhledávače mohly ve výsledcích zobrazit datum a podrobnosti události. Stránky událostí z kurátorských kalendářů zobrazených na vašich stránkách (pro události v následujících šesti měsících) jsou také uvedeny v mapě stránek vašeho webu, aby je vyhledávače mohly najít.

### Změna pořadí obsahu

Sekce nebo prvky přesunete tažením za ikonu úchytu (šest teček) na levé straně každé položky. Prvky můžete přesouvat uvnitř sekce nebo je přesunout do jiné sekce.

## Úprava vzhledu stránky

### Styly sekce

Kliknutím na libovolnou sekci otevřete její panel stylů. Můžete nastavit:

- **Background** -- Jednobarevné pozadí, přechod nebo obrázek. Při použití obrázku na pozadí vám výběr **Focal Point** umožní kliknutím určit, která část obrázku zůstane vycentrovaná při změně velikosti sekce, a možnost **Overlay** přidá na obrázek poloprůhledný barevný nádech pro lepší čitelnost textu.
- **Padding** -- Horní a dolní mezera uvnitř sekce
- **Width** -- Celá šířka nebo vycentrovaný/omezený obsah
- **Dividers** -- Dekorativní tvarové oddělovače (vlna, šikmý, oblouk, trojúhelník a další) na horním nebo dolním okraji sekce, s nastavením barvy, výšky a převrácení

### Styly prvků

Kliknutím na libovolný prvek otevřete jeho panel stylů. Mezi běžné možnosti patří velikost písma, barva, zarovnání, okraj a odsazení. U obrázků můžete nastavit alternativní text a cíle odkazů.

### Vlastní CSS

Pro pokročilé úpravy vzhledu má každá sekce a každý prvek pole **Custom CSS**, kam můžete napsat vlastní pravidla CSS. Ta jsou omezena na daný prvek, takže nemohou neúmyslně ovlivnit zbytek stránky.

:::tip
Pokud potřebujete použít styly na celý web -- například vlastní písmo nebo globální barvu -- použijte nastavení v části [Vzhled](./appearance.md) místo vlastního CSS na jednotlivých stránkách.
:::

## Náhled stránky

Pomocí ovládacích prvků náhledu na panelu nástrojů zkontrolujte, jak vaše stránka vypadá při různých velikostech obrazovky:

- **Desktop** -- Zobrazení na celou šířku prohlížeče
- **Mobile** -- Úzké zobrazení ve velikosti telefonu

Na telefonech se sloupce v řádku skládají pod sebe na plnou šířku, pokud pro ně v nastavení řádku nenastavíte **Mobile Width**. Seznamy kázání a podcastů na telefonech také zobrazují text každé epizody pod jejím náhledem.

Chcete-li vidět živou stránku přesně tak, jak ji uvidí návštěvníci, vraťte se na seznam stránek a klikněte na cestu dané stránky. Otevře se v nové záložce prohlížeče.

## Kontrola přístupnosti

Kliknutím na ikonu **Accessibility** na panelu nástrojů spustíte rychlou kontrolu častých problémů -- chybějící alternativní text obrázků, nízký barevný kontrast nebo nadpisy v nesprávném pořadí. Každý problém vás přímo odkáže na prvek, který vyžaduje pozornost, takže jej můžete opravit přímo na místě.

## Vrácení změn

Editor automaticky sleduje historii úprav. K pohybu v ní použijte tlačítka na panelu nástrojů nebo klávesové zkratky:

- **Undo** (Ctrl+Z / Cmd+Z) -- Vrátí vaši poslední akci zpět
- **Redo** (Ctrl+Shift+Z nebo Ctrl+Y / Cmd+Shift+Z) -- Znovu použije vrácenou akci

Stránku můžete také obnovit do dřívějšího snímku. Kliknutím na **View history** na panelu nástrojů zobrazíte seznam uložených snímků s popisy a kliknutím na libovolnou položku se vrátíte do daného bodu.

:::warning
Obnovení snímku nahradí aktuální obsah stránky verzí ze snímku. Tuto změnu nelze vrátit standardním tlačítkem Undo. Pokud se chcete k aktuálnímu stavu vrátit, uložte si před obnovením starého snímku jeho snímek.
:::

## Ukládání a publikování

Změny se ukládají automaticky při práci. Stav v panelu nástrojů ukazuje, zda byly vaše změny uloženy.

### Stav konceptu a publikování

Stránky mohou mít stav **published**, který určuje, kdy návštěvníci uvidí vaše změny. Panel nástrojů zobrazuje štítek s aktuálním stavem:

- **Live on save** -- Stránka nepoužívá pracovní postup publikování. Každá uložená změna se okamžitě zveřejní. Toto je výchozí nastavení nových stránek.
- **Unpublished changes** -- Stránka už byla dříve publikována, ale od posledního publikování jste provedli změny. Návštěvníci stále vidí předchozí publikovanou verzi.
- **Published** -- Stránka je živá a uložený obsah odpovídá tomu, co vidí návštěvníci.

Chcete-li své změny publikovat, klikněte na tlačítko **Publish** na panelu nástrojů. Stránka se okamžitě zveřejní.

Chcete-li se vrátit k poslednímu publikovanému stavu, aniž by to ovlivnilo, co vidí návštěvníci, otevřete nabídku se třemi tečkami (⋮) a klikněte na **Discard unpublished changes**.

Chcete-li přestat používat pracovní postup publikování, otevřete nabídku se třemi tečkami a klikněte na **Turn off publishing**. Úpravy se pak opět zveřejní okamžitě.

:::tip
Pracovní postup konceptu a publikování použijte, když chcete stránku připravit, například pro nadcházející událost, a zveřejnit ji až ve správný okamžik. Sestavte a zkontrolujte náhled stránky a poté, až budete připraveni, klikněte na Publish.
:::

## Související články

- [Správa stránek](./managing-pages.md) -- Vytváření stránek, nastavení URL a správa navigace webu
- [Vzhled](./appearance.md) -- Nastavení barev, písem a značky pro celý web
- [Soubory](./files.md) -- Nahrávání obrázků a dokumentů pro použití v editoru
- [Vytváření formulářů](../forms/creating-forms.md) -- Vytvářejte formuláře, které můžete vkládat na stránky
