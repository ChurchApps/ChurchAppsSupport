---
title: "Používání editoru stránek"
description: "Nastavte editor stránek v B1 Admin přidáváním sekcí a prvků, jejich stylováním, náhledem na mobilu a publikováním konceptů. Popisuje také vrácení změn a historii verzí."
---

# Používání editoru stránek

<div class="article-intro">

Editor stránek B1 je vizuální nástroj pro tvorbu typu přetáhnout a pustit, který vám umožňuje navrhovat stránky vašeho církevního webu bez psaní jakéhokoli kódu. Můžete přidávat sekce a obsahové bloky, upravovat styly, prohlížet náhled své práce a vracet změny zpět – to vše přímo v prohlížeči.

</div>

## Video s návodem

<YouTube id="m2B_JxmfFm4" title="Úprava stránek a navigace v B1" next="Připojení vlastní domény v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md), abyste měli web nakonfigurovaný
- Vytvořte alespoň jednu stránku v části [Správa stránek](./managing-pages.md)
- Pro přístup k editoru potřebujete oprávnění **content.edit**

</div>

## Otevření editoru

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), rozbalte položku **Website** a klikněte na **Pages**.
2. V tabulce stránek najděte stránku, kterou chcete upravit, a klikněte na **Edit Content**.

Editor se otevře na celou obrazovku. Levý panel zobrazuje strukturu stránky a dostupné obsahové prvky; střední oblast zobrazuje živý náhled vaší stránky.

:::info
Editor se vždy zobrazuje v úsporném světlém režimu bez ohledu na nastavení motivu v B1 Admin a používá nadpisové a textové písmo, které jste zvolili v části [Vzhled](./appearance.md). Díky tomu náhled přesně odpovídá tomu, jak bude stránka vypadat pro návštěvníky webu.
:::

## Struktura stránky: sekce a prvky

Každá stránka je vytvořena ze dvou úrovní:

- **Sekce** – Nejvyšší kontejnery, které rozdělují stránku na vodorovné pásy (například hlavní úvodní blok, obsahový blok nebo pruh zápatí). Než budete moci přidat obsah, musí mít každá stránka alespoň jednu sekci.
- **Prvky** – Jednotlivé obsahové části umístěné uvnitř sekce, například text, obrázky, tlačítka, karty, formuláře a kalendáře.

### Přidání sekce

1. Klikněte na **Add Section** (nebo na tlačítko **+** v horní části levého panelu).
2. Vyberte, jak začít:
   - **Ze šablony** – Procházejte galerii šablon sekcí rozdělenou do kategorií (Hero, About, Services, Giving atd.) a kliknutím vložte jednu z nich jako plně stylizovanou sekci s předvyplněným obsahem. Vše můžete po přidání upravit.
   - **Prázdná sekce** – Zvolte rozvržení sloupců (jeden sloupec, dva sloupce, tři sloupce atd.) a začněte od nuly.
3. Nová sekce se zobrazí v náhledu. Kliknutím ji vyberete a nastavíte barvu pozadí, odsazení a další možnosti stylu.

### Změna rozvržení sekce

Máte sekci hotovou, ale chcete jiné uspořádání? Použijte přepínač rozvržení u této sekce a vyměňte uspořádání sloupců za jiné z galerie, přičemž vaše stávající obsahy a prvky zůstanou zachovány.

### Přidání prvků do sekce

1. Klikněte v náhledu dovnitř sekce, abyste ji vybrali.
2. Klikněte na **Add Content** a z seznamu zvolte typ prvku:
   - **Text** – Nadpisy, odstavce a formátovaný text
   - **Image** – Nahrajte nebo propojte fotografii
   - **Button** – Klikatelný odkaz typu výzva k akci
   - **Card** – Obrázek s titulkem a popisem
   - **Form** – Vložte [formulář](../forms/creating-forms.md) přímo na stránku. Pokud má formulář [záhlavní fotografii](../forms/creating-forms.md#adding-a-header-photo), zobrazí se nad otázkami
   - **Calendar** – Zobrazí kalendář akcí
   - **FAQ** – Otázky a odpovědi v podobě rozbalovacích bloků (akordeon)
   - **Video** – Vložte video pomocí URL adresy
   - **Groups Browser** – Filtrovatelný adresář všech církevních skupin s volitelným vyhledáváním, filtrem kategorií a filtrem štítků. Jeho **Layout** může být **Grid** (výchozí) nebo **Scrolling (automatic)** – viz [Posuvná rozvržení](#scrolling-layouts)
   - **Group List** – Dlaždice vašich veřejných skupin, volitelně pouze skupin s daným štítkem. Jeho **Layout** může být **Grid** (výchozí; až tři dlaždice v řadě) nebo **Scrolling (automatic)** – viz [Posuvná rozvržení](#scrolling-layouts)
   - **Icon Feature** – Ikona s titulkem a krátkým popisem, vhodná pro zvýraznění funkcí nebo služeb
   - **Gallery** – Mřížka více fotografií nebo rozvržení typu masonry
   - **Testimonial** – Jedna nebo více citací s jménem autora, funkcí a fotografií
   - **Social Icons** – Odkazované ikony vašich profilů na sociálních sítích: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo a Podcast. Vyplňte odkaz pro každou síť, kterou chcete zobrazit; u **WhatsApp** použijte odkaz `https://wa.me/` s vaším číslem nebo pozvánkový odkaz do skupiny
   - **Countdown** – Odpočet do data nebo do pravidelného času bohoslužby
   - **Stats** – Řada velkých čísel s popisky (členové, roky, pobočky)
   - **Campaign Progress** – Živý ukazatel průběhu sbírkové kampaně, který zobrazuje celkovou částku vybranou na cíl fondu
   - **Staff Grid** – Fotografické karty členů skupiny; skupina musí mít zapnutou možnost **public roster**
   - **Service Times** – Rozvrh bohoslužeb vašich poboček, načítaný automaticky z nastavení docházky
   - **Sermons** – Vaše knihovna kázání, jako úplný prohlížeč nebo v rozvržení mřížky, seznamu či se zvýrazněným nejnovějším kázáním
   - **Map** – Vložená mapa vycentrovaná na adresu vašeho kostela
   - **Table** – Jednoduchá mřížka řádků a sloupců pro tabulková data
   - **Text with Photo** – Text a obrázek vedle sebe
   - **Logo** – Logo vašeho kostela, převzaté z části [Vzhled](./appearance.md)
   - **Live Stream** – Přehrávač vašeho živého přenosu vložený přímo na stránku
   - **Podcast** – Seznam epizod načtený z externí RSS adresy podcastu, kterou zadáte, s nastavením počtu zobrazených epizod a toho, zda se mají zobrazovat data a popisy. Každá epizoda na živém webu má audio přehrávač a odkaz **Download**, který uloží zvukový soubor epizody pod jejím názvem. Slouží k představení libovolného podcastového kanálu na vašem webu; pokud chcete publikovat vlastní kázání jako podcast, použijte místo toho [Správa kázání](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** – Tlačítko pro dar nebo vložený formulář pro dary
   - **HTML** – Vlastní surový HTML kód pro pokročilé použití, například vložení widgetu třetí strany (viz [Použití prvku HTML](#using-the-html-element))
   - **iFrame** – Vložení externího obsahu podle URL adresy
3. Prvek nastavte pomocí panelu nastavení, který se zobrazí.

### Použití prvku HTML

Prvek **HTML** má dvě pole:

- **HTML Content** – Značkování, které se má na stránce zobrazit. Všechny značky `<script>`, které sem vložíte, se spustí na vašem živém webu.
- **JavaScript (exclude script tag)** – Skriptový kód, který se spustí při načtení stránky. Sem můžete také vložit vložený kód (snippet) od dodavatele včetně jeho značek `<script>` a spustí se na živém webu.

Pokud do pole JavaScript vložíte pouze webovou adresu (například odkaz na obrázek), pole zčervená s varováním *„This is a web address, not JavaScript.“* Samotná adresa v tomto poli nic neudělá. Chcete-li zobrazit obrázek, použijte prvek **Image** nebo vložte `<img src="...">` do pole **HTML Content**.

### Použití prvku Calendar {#using-the-calendar-element}

Prvek **Calendar** zobrazuje události z jednoho z vašich kalendářů:

1. V části **Select** zvolte **Group Calendar** (události jedné skupiny – seznam zobrazuje skupiny, jejichž jste členem) nebo **Curated Calendar** (kalendář, který jste vytvořili v části **Calendars**; viz [Kurátorovaný kalendář](../calendars/curated-calendar.md)).
2. V části **Select Calendar** vyberte skupinu nebo kalendář.
3. V části **Display** zvolte způsob zobrazení:
   - **Month calendar** – Měsíční mřížka, kterou mohou návštěvníci procházet. Každá událost je obarvena podle skupiny, ke které patří, takže události skupiny mají stejnou barvu v každém kalendáři. B1 barvy vybírá automaticky; nic nemusíte nastavovat.
   - **Upcoming events** – Mřížka dlaždic pro nejbližších 12 nadcházejících událostí, přičemž opakující se událost je zobrazena jednou u jejího nejbližšího termínu. Každá dlaždice zobrazuje fotografii události (nebo její název na tmavé barvě vašeho motivu, pokud fotografie nemá), štítek s datem, den a čas a první řádek popisu. Tlačítko **Subscribe** nad dlaždicemi umožňuje návštěvníkům zkopírovat odkaz ICS na kalendář nebo jej stáhnout. Pro toto zobrazení se objeví nastavení **Layout**: **Grid** (výchozí) nebo **Scrolling (automatic)**, které umístí dlaždice do jediné řady, jež se sama posouvá (viz [Posuvná rozvržení](#scrolling-layouts)). U **Curated Calendar** zapněte nastavení **Group badge**, které zobrazí název skupiny každé události v pravém horním rohu její dlaždice barvou kalendáře dané skupiny. Události z archivovaných nebo důvěrných skupin odznak nedostanou.
4. Chcete-li zobrazit pouze některé události, zadejte štítek do pole **Only events tagged** – například `youth`. Zobrazí se pouze události, jejichž **Tags** obsahují toto slovo. Pokud pole necháte prázdné, zobrazí se všechny události. Štítky se nastavují u každé události; viz [Přidávání a úprava událostí](../calendars/creating-calendars.md#adding-and-editing-events).

V obou zobrazeních se po kliknutí na událost otevře její vlastní stránka na vašem webu. Stránka události zobrazuje fotografii události, název, datum a čas a popis, a také box s údaji **When** (včetně opakovacího vzorce u opakující se události) a **Where** (rezervované místnosti). Pokud je zapnuta registrace, objeví se také tlačítko **Register for this Event**, a odkaz **Add to my calendar**, který stáhne událost jako soubor kalendáře. Stránka je nastavena tak, aby vyhledávače mohly ve výsledcích zobrazit datum a podrobnosti události. Stránky událostí z kurátorovaných kalendářů zobrazených na vašich stránkách (pro události v následujících šesti měsících) jsou také uvedeny v mapě stránek vašeho webu, aby je vyhledávače mohly najít.

### Posuvná rozvržení {#scrolling-layouts}

Rozvržení **Scrolling (automatic)** u **Groups Browser**, **Group List** a u zobrazení **Upcoming events** prvku Calendar uspořádá dlaždice do jedné řady místo mřížky. Na telefonu každá dlaždice vyplní celou řadu; na počítači se vedle sebe vejdou dvě dlaždice. Pokud je dlaždic více, než se vejde, řada:

- Přejde na další dlaždici přibližně každé čtyři sekundy a po poslední dlaždici se vrátí na první.
- Pozastaví se, když návštěvník najede kurzorem, dotkne se jí nebo se do ní přepne klávesou Tab, a po několika sekundách pokračuje dál.
- Pod řadou zobrazí řadu teček, jedna pro každou dlaždici, přičemž tečka aktuální dlaždice je vyplněná. Návštěvník může kliknutím na tečku přejít na danou dlaždici.

Na zařízeních s nastavením omezeného pohybu řada zůstává nehybná a návštěvníci ji posouvají sami gestem nebo rolováním. Pokud se všechny dlaždice vejdou, řada se nehýbe a tečky se nezobrazí.

### Změna pořadí obsahu

Sekce nebo prvky přetáhněte pomocí ikony úchytu (šest teček) na levé straně každé položky a změňte jejich pořadí. Prvky můžete přetahovat uvnitř sekce nebo je přesouvat mezi sekcemi.

## Stylování stránky

### Styly sekcí

Kliknutím na libovolnou sekci otevřete její panel stylů. Můžete nastavit:

- **Background** – Plná barva, přechod nebo obrázek. Při použití obrazového pozadí vám výběr **Focal Point** umožní kliknutím určit, která část obrázku zůstane vycentrovaná při změně velikosti sekce, a možnost **Overlay** vám umožní přidat přes obrázek poloprůhledný barevný nátěr pro lepší čitelnost textu.
- **Padding** – Horní a dolní mezera uvnitř sekce
- **Width** – Na celou šířku nebo vycentrovaná/omezená šířka
- **Dividers** – Dekorativní tvarové oddělovače (vlna, šikmý řez, oblouk, trojúhelník a další) na horní nebo dolní hraně sekce, s nastavením barvy, výšky a převrácení

### Styly prvků

Kliknutím na libovolný prvek otevřete jeho panel stylů. Mezi běžné možnosti patří velikost písma, barva, zarovnání, okraj (margin) a odsazení (padding). U obrázků můžete nastavit alternativní text a cíle odkazů.

### Vlastní CSS

Pro pokročilé úpravy vzhledu má každá sekce a každý prvek pole **Custom CSS**, kam můžete napsat vlastní pravidla CSS. Ta jsou omezena na daný prvek, takže nemohou neúmyslně ovlivnit zbytek stránky.

:::tip
Pokud potřebujete použít styly na celý web – například vlastní písmo nebo globální barvu – použijte místo vlastního CSS na jednotlivých stránkách nastavení [Vzhled](./appearance.md).
:::

## Náhled stránky

Pomocí ovládacích prvků náhledu na panelu nástrojů si ověřte, jak stránka vypadá při různých velikostech obrazovky:

- **Desktop** – Zobrazení na celou šířku prohlížeče
- **Mobile** – Úzké zobrazení ve velikosti telefonu

Na telefonech se sloupce v řadě skládají pod sebe na celou šířku, pokud v nastavení řady nenastavíte pro ně **Mobile Width**. Seznamy kázání a podcastů také na telefonech zobrazují text každé epizody pod jejím náhledovým obrázkem.

Chcete-li vidět živou stránku přesně tak, jak ji uvidí návštěvníci, vraťte se na seznam stránek a klikněte na cestu (path) stránky. Otevře se v nové záložce prohlížeče.

## Kontrola přístupnosti

Kliknutím na ikonu **Accessibility** na panelu nástrojů spustíte rychlou kontrolu běžných problémů – chybějící alternativní text obrázků, nízký barevný kontrast nebo nesprávné pořadí nadpisů. Každý problém odkazuje přímo na prvek, který vyžaduje pozornost, takže jej můžete opravit přímo na místě.

## Vrácení změn

Editor automaticky sleduje historii úprav. K pohybu v ní použijte tlačítka na panelu nástrojů nebo klávesové zkratky:

- **Undo** (Ctrl+Z / Cmd+Z) – Vrátí vaši poslední akci zpět
- **Redo** (Ctrl+Shift+Z nebo Ctrl+Y / Cmd+Shift+Z) – Znovu použije vrácenou akci

Stránku můžete také obnovit do dřívějšího snímku. Kliknutím na **View history** na panelu nástrojů zobrazíte seznam uložených snímků s popisy a kliknutím na libovolnou položku se vrátíte do daného stavu.

:::warning
Obnovení snímku nahradí váš aktuální obsah stránky verzí ze snímku. Tuto akci nelze vrátit standardním tlačítkem Undo. Pokud si chcete ponechat možnost návratu, uložte si před obnovením starého snímku snímek svého aktuálního stavu.
:::

## Ukládání a publikování

Změny se ukládají automaticky během práce. Stavový indikátor na panelu nástrojů ukazuje, zda byly vaše změny uloženy.

### Stav konceptu a publikování

Stránky mohou mít stav **published**, který určuje, kdy návštěvníci uvidí vaše změny. Panel nástrojů zobrazuje štítek se stavem:

- **Live on save** – Stránka nepoužívá pracovní postup publikování. Každá uložená změna se okamžitě zveřejní. Toto je výchozí nastavení pro nové stránky.
- **Unpublished changes** – Stránka byla již dříve publikována, ale od posledního publikování jste provedli změny. Návštěvníci stále vidí předchozí publikovanou verzi.
- **Published** – Stránka je živá a váš uložený obsah odpovídá tomu, co vidí návštěvníci.

Pro publikování změn klikněte na tlačítko **Publish** na panelu nástrojů. Stránka se okamžitě zveřejní.

Chcete-li se vrátit k poslední publikované verzi, aniž by to ovlivnilo, co vidí návštěvníci, otevřete nabídku přetečení (⋮) a klikněte na **Discard unpublished changes**.

Chcete-li přestat používat pracovní postup publikování, otevřete nabídku přetečení a klikněte na **Turn off publishing**. Úpravy se pak opět okamžitě zveřejňují.

:::tip
Pracovní postup konceptu a publikování použijte tehdy, když chcete stránku připravit – například pro nadcházející událost – a zveřejnit ji až ve správný okamžik. Stránku sestavte a zkontrolujte v náhledu a poté klikněte na Publish, až budete připraveni.
:::

## Související články

- [Správa stránek](./managing-pages.md) – Vytváření stránek, nastavování URL adres a správa navigace webu
- [Vzhled](./appearance.md) – Nastavení barev, písem a branding celého webu
- [Soubory](./files.md) – Nahrávání obrázků a dokumentů pro použití v editoru
- [Vytváření formulářů](../forms/creating-forms.md) – Tvorba formulářů, které můžete vložit na stránky
