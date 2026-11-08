---
title: "Používání editoru stránek"
description: "Nastavte editor stránek v B1 Admin přidáváním sekcí a prvků, jejich stylováním, náhledem na mobilu a publikováním konceptů. Popisuje také vrácení změn a historii verzí."
---

# Používání editoru stránek

<div class="article-intro">

Editor stránek B1 je vizuální nástroj pro přetahování, který vám umožní navrhnout stránky vašeho církevního webu bez psaní jakéhokoli kódu. Můžete přidávat sekce a obsahové bloky, upravovat styly, zobrazit náhled své práce a vracet změny zpět – to vše přímo v prohlížeči.

</div>

## Video s návodem

<YouTube id="m2B_JxmfFm4" title="Úprava stránek a navigace v B1" next="Připojení vlastní domény v B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Než začnete</h4>

- Dokončete [počáteční nastavení](./initial-setup.md), aby byl váš web nakonfigurován
- Vytvořte alespoň jednu stránku v části [Správa stránek](./managing-pages.md)
- Pro přístup k editoru potřebujete oprávnění **content.edit**

</div>

## Otevření editoru

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu), rozbalte položku **Website** a klikněte na **Pages**.
2. V tabulce stránek najděte stránku, kterou chcete upravit, a klikněte na **Edit Content**.

Editor se otevře na celou obrazovku. Levý panel zobrazuje strukturu stránky a dostupné obsahové prvky; střední oblast zobrazuje živý náhled vaší stránky.

:::info
Editor se vždy zobrazuje ve světlém režimu bez ohledu na nastavení motivu v B1 Admin a používá nadpisové a textové písmo, které jste zvolili v části [Vzhled](./appearance.md). Díky tomu náhled přesně odpovídá tomu, jak bude stránka vypadat pro návštěvníky webu.
:::

## Struktura stránky: sekce a prvky

Každá stránka se skládá ze dvou úrovní:

- **Sekce** -- Nejvyšší kontejnery, které rozdělují stránku na vodorovné pásy (například hlavní sekci, obsahový blok nebo pruh zápatí). Než začnete přidávat obsah, musí mít každá stránka alespoň jednu sekci.
- **Prvky** -- Jednotlivé obsahové části umístěné uvnitř sekce, jako jsou text, obrázky, tlačítka, karty, formuláře a kalendáře.

### Přidání sekce

1. Klikněte na **Add Section** (nebo na tlačítko **+** v horní části levého panelu).
2. Zvolte, jak začít:
   - **Ze šablony** — procházejte galerii šablon sekcí seřazenou podle kategorií (Hero, About, Services, Giving atd.) a kliknutím na jednu ji vložte jako plně stylizovanou sekci s předvyplněným obsahem. Vše můžete po přidání upravit.
   - **Prázdná sekce** — zvolte rozvržení sloupců (jeden sloupec, dva sloupce, tři sloupce atd.) a sestavte sekci od začátku.
3. Nová sekce se objeví v náhledu. Kliknutím na ni ji vyberte a nastavte barvu pozadí, odsazení a další možnosti stylu.

### Změna rozvržení sekce

Už jste sekci vytvořili, ale chcete jinou strukturu? Použijte přepínač rozvržení u dané sekce a vyměňte její uspořádání sloupců za jiné z galerie. Stávající obsah a prvky zůstanou na svém místě.

### Přidání prvků do sekce

1. Klikněte v náhledu dovnitř sekce, abyste ji vybrali.
2. Klikněte na **Add Content** a zvolte typ prvku ze seznamu:
   - **Text** -- Nadpisy, odstavce a formátovaný text
   - **Image** -- Nahrajte fotografii nebo na ni odkažte
   - **Button** -- Klikatelné tlačítko s výzvou k akci
   - **Card** -- Obrázek s nadpisem a popisem
   - **Form** -- Vložte [formulář](../forms/creating-forms.md) přímo na stránku. Pokud má formulář [záhlavní fotografii](../forms/creating-forms.md#adding-a-header-photo), zobrazí se nad otázkami
   - **Calendar** -- Zobrazení kalendáře akcí
   - **FAQ** -- Otázky a odpovědi v podobě rozbalovacích bloků (akordeon)
   - **Video** -- Vložte video pomocí URL adresy
   - **Groups Browser** -- Filtrovatelný adresář všech církevních skupin s volitelným vyhledáváním, filtrem kategorií a filtrem štítků. Jeho **Layout** může být **Grid** (výchozí) nebo **Scrolling (automatic)** -- viz [Posuvná rozvržení](#scrolling-layouts)
   - **Group List** -- Dlaždice vašich veřejných skupin, volitelně pouze skupin s daným štítkem. Jeho **Layout** může být **Grid** (výchozí; až tři dlaždice v řádku) nebo **Scrolling (automatic)** -- viz [Posuvná rozvržení](#scrolling-layouts)
   - **Icon Feature** -- Ikona s nadpisem a krátkým popisem, vhodná pro zvýraznění služeb nebo aktivit
   - **Gallery** -- Mřížka nebo zobrazení typu masonry s více fotografiemi
   - **Testimonial** -- Jeden nebo více citátů se jménem autora, funkcí a fotografií
   - **Social Icons** -- Odkazované ikony profilů vaší církve na sociálních sítích: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo a Podcast. U každé ikony, kterou chcete zobrazit, vyplňte odkaz; u **WhatsApp** použijte odkaz `https://wa.me/` s vaším číslem nebo odkaz s pozvánkou do skupiny
   - **Countdown** -- Odpočet do data nebo do pravidelného času bohoslužby
   - **Stats** -- Řada velkých čísel s popisky (členové, roky, pobočky)
   - **Campaign Progress** -- Živý ukazatel průběhu sbírkové kampaně, který zobrazuje celkovou částku vybranou k dosažení cíle fondu
   - **Staff Grid** -- Karty s fotografiemi členů skupiny; skupina musí mít zapnutou možnost **public roster**
   - **Service Times** -- Harmonogram bohoslužeb vašich poboček, načtený automaticky z nastavení docházky
   - **Sermons** -- Vaše knihovna kázání, jako plný prohlížeč nebo v rozvržení mřížky, seznamu či se zvýrazněním nejnovějšího kázání
   - **Map** -- Vložená mapa se středem na adrese vaší církve
   - **Table** -- Jednoduchá mřížka řádků a sloupců pro tabulková data
   - **Text with Photo** -- Text a obrázek vedle sebe
   - **Logo** -- Logo vaší církve, převzaté z [Vzhledu](./appearance.md)
   - **Live Stream** -- Přehrávač živého přenosu vložený přímo na stránku
   - **Podcast** -- Seznam epizod načtený z externí adresy URL podcastového RSS kanálu, který zadáte, s nastavením počtu zobrazených epizod a toho, zda se mají zobrazovat data a popisy. Každá epizoda na živém webu má audio přehrávač a odkaz **Download**, který uloží zvukový soubor epizody pod jejím názvem. Slouží k zobrazení libovolného podcastového kanálu na vašem webu; pokud chcete publikovat vlastní kázání jako podcast, podívejte se místo toho na [Správa kázání](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- Tlačítko pro dary nebo vložený formulář na příspěvky
   - **HTML** -- Váš vlastní surový HTML kód pro pokročilé použití, například vložení widgetu třetí strany (viz [Použití prvku HTML](#using-the-html-element))
   - **iFrame** -- Vložení externího obsahu pomocí URL adresy
3. Prvek nastavte pomocí panelu nastavení, který se zobrazí.

### Použití prvku HTML

Prvek **HTML** má dvě pole:

- **HTML Content** -- Značkování, které se má na stránce zobrazit. Všechny značky `<script>`, které sem vložíte, se spustí na vašem živém webu.
- **JavaScript (exclude script tag)** -- Kód skriptu, který se spustí při načtení stránky. Sem můžete také vložit vloženou ukázku od dodavatele včetně značek `<script>` a spustí se na živém webu.

Pokud do pole JavaScript vložíte pouze webovou adresu (například odkaz na obrázek), pole se zbarví červeně s upozorněním *„This is a web address, not JavaScript."* Samotná adresa v tomto poli nic neudělá. Chcete-li zobrazit obrázek, použijte prvek **Image** nebo vložte `<img src="...">` do pole **HTML Content**.

### Použití prvku Calendar {#using-the-calendar-element}

Prvek **Calendar** zobrazuje akce z jednoho z vašich kalendářů:

1. V části **Select** zvolte **Group Calendar** (akce jedné skupiny -- seznam zobrazuje skupiny, jejichž jste členem) nebo **Curated Calendar** (kalendář, který jste vytvořili v části **Calendars**; viz [Kurátorský kalendář](../calendars/curated-calendar.md)).
2. V části **Select Calendar** vyberte skupinu nebo kalendář.
3. V části **Display** zvolte způsob zobrazení:
   - **Month calendar** -- Měsíční mřížka, kterou mohou návštěvníci procházet. Každá akce je obarvena podle skupiny, ke které patří, takže akce jedné skupiny mají stejnou barvu v každém kalendáři. B1 barvy vybírá automaticky; není třeba nic nastavovat.
   - **Upcoming events** -- Mřížka dlaždic pro dalších 12 nadcházejících akcí; opakující se akce se zobrazí jednou u jejího nejbližšího termínu. Každá dlaždice zobrazuje fotografii akce (nebo její název na tmavé barvě vašeho motivu, pokud fotografii nemá), odznak s datem, den a čas a první řádek jejího popisu. Tlačítko **Subscribe** nad dlaždicemi umožňuje návštěvníkům zkopírovat odkaz ICS kalendáře nebo jej stáhnout. Pro tento způsob zobrazení se objeví nastavení **Layout**: **Grid** (výchozí) nebo **Scrolling (automatic)**, které uspořádá dlaždice do jednoho řádku, jenž se sám posouvá (viz [Posuvná rozvržení](#scrolling-layouts)). U **Curated Calendar** zapněte nastavení **Group badge**, aby se v pravém horním rohu dlaždice zobrazil název skupiny akce v barvě kalendáře této skupiny. Akce z archivovaných nebo důvěrných skupin odznak nemají.
4. Chcete-li zobrazit jen některé akce, zadejte do pole **Only events tagged** štítek -- například `youth`. Zobrazí se pouze akce, jejichž **Tags** obsahují toto slovo. Pokud pole necháte prázdné, zobrazí se všechny akce. Štítky se nastavují u každé akce; viz [Přidávání a úprava akcí](../calendars/creating-calendars.md#adding-and-editing-events).

V obou způsobech zobrazení se po kliknutí na akci otevře její vlastní stránka na vašem webu. Stránka akce zobrazuje fotografii, název, datum a čas a popis, dále box s položkami **When** (včetně vzorce opakování u opakující se akce) a **Where** (místnosti rezervované pro akci). Pokud je zapnuta registrace, zobrazí se také tlačítko **Register for this Event** a odkaz **Add to my calendar**, který stáhne akci jako soubor kalendáře. Stránka je připravena tak, aby vyhledávače mohly ve výsledcích zobrazit datum a podrobnosti akce. Stránky akcí z kurátorských kalendářů zobrazených na vašich stránkách (pro akce v následujících šesti měsících) jsou také uvedeny v mapě stránek vašeho webu, aby je vyhledávače mohly najít.

### Posuvná rozvržení {#scrolling-layouts}

Rozvržení **Scrolling (automatic)** u **Groups Browser**, **Group List** a u zobrazení **Upcoming events** prvku Calendar uspořádá dlaždice do jednoho řádku místo mřížky. Na telefonu každá dlaždice vyplní celou šířku řádku; na počítači se vedle sebe vejdou dvě dlaždice. Pokud je dlaždic více, než se vejde, řádek:

- Přejde na další dlaždici přibližně každé čtyři sekundy a po poslední dlaždici se vrátí na první.
- Pozastaví se, když na něj návštěvník najede kurzorem, dotkne se ho nebo se do něj přepne klávesou Tab, a po několika sekundách pokračuje dál.
- Pod řádkem zobrazí řadu teček, jednu za každou dlaždici; tečka aktuální dlaždice je vyplněná. Návštěvník může kliknutím na tečku přejít přímo na danou dlaždici.

Na zařízeních s nastaveným omezením pohybu řádek zůstává nehybný a návštěvníci jej posouvají gestem nebo rolováním sami. Pokud se všechny dlaždice vejdou, řádek se nehýbe a tečky se nezobrazí.

### Změna pořadí obsahu

Sekce nebo prvky přetáhněte pomocí ikony úchytu (šest teček) na levé straně každé položky a změňte jejich pořadí. Prvky můžete přetahovat uvnitř sekce nebo je přesouvat mezi sekcemi.

## Stylování stránky

### Styly sekcí

Kliknutím na libovolnou sekci otevřete její panel stylů. Můžete nastavit:

- **Background** -- Jednobarevné pozadí, přechod nebo obrázek. Při použití obrazového pozadí vám výběr **Focal Point** umožní kliknutím určit, která část obrázku zůstane při změně velikosti sekce uprostřed. Možnost **Overlay** přidá nad obrázek průhledný barevný nátěr, který zlepší čitelnost textu.
- **Padding** -- Horní a dolní odsazení uvnitř sekce
- **Width** -- Celá šířka nebo vycentrovaný/omezený obsah
- **Dividers** -- Dekorativní tvarové oddělovače (vlna, šikmý řez, oblouk, trojúhelník a další) na horním nebo dolním okraji sekce, s nastavením barvy, výšky a převrácení

### Styly prvků

Kliknutím na libovolný prvek otevřete jeho panel stylů. Mezi běžné možnosti patří velikost písma, barva, zarovnání, okraj a odsazení. U obrázků můžete nastavit alternativní text a cíle odkazů.

### Vlastní CSS

Pro pokročilé úpravy vzhledu má každá sekce a každý prvek pole **Custom CSS**, kam můžete napsat vlastní pravidla CSS. Ta se vztahují pouze na daný prvek, takže nemohou neúmyslně ovlivnit zbytek stránky.

:::tip
Pokud potřebujete uplatnit styly na celý web -- například vlastní písmo nebo globální barvu -- použijte nastavení v části [Vzhled](./appearance.md) namísto vlastního CSS na jednotlivých stránkách.
:::

## Náhled stránky

Pomocí ovládacích prvků náhledu na panelu nástrojů zkontrolujte, jak stránka vypadá při různých velikostech obrazovky:

- **Desktop** -- Zobrazení na celou šířku prohlížeče
- **Mobile** -- Úzké zobrazení ve velikosti telefonu

Na telefonech se sloupce v řádku skládají jeden nad druhý na celou šířku, pokud pro ně v nastavení řádku nenastavíte **Mobile Width**. Seznamy kázání a podcastů na telefonech také zobrazují text každé epizody pod jejím náhledovým obrázkem.

Chcete-li vidět živou stránku přesně tak, jak ji uvidí návštěvníci, vraťte se na seznam stránek a klikněte na cestu stránky. Otevře se v nové záložce prohlížeče.

## Kontrola přístupnosti

Kliknutím na ikonu **Accessibility** na panelu nástrojů spustíte rychlou kontrolu běžných problémů -- chybějící alternativní text obrázků, nízký kontrast barev nebo nadpisy v nesprávném pořadí. Každý problém vás přímo odkáže na prvek, který je třeba opravit, takže jej můžete opravit přímo na místě.

## Vrácení změn

Editor automaticky sleduje historii úprav. Pro pohyb v ní použijte tlačítka na panelu nástrojů nebo klávesové zkratky:

- **Undo** (Ctrl+Z / Cmd+Z) -- Vrátí poslední akci zpět
- **Redo** (Ctrl+Shift+Z nebo Ctrl+Y / Cmd+Shift+Z) -- Znovu použije vrácenou akci

Stránku můžete také obnovit do dřívějšího snímku. Kliknutím na **View history** na panelu nástrojů zobrazíte seznam uložených snímků s popisy a kliknutím na libovolnou položku se vrátíte do daného stavu.

:::warning
Obnovení snímku nahradí aktuální obsah stránky verzí ze snímku. Tuto akci nelze vrátit standardním tlačítkem zpět. Pokud si chcete ponechat možnost návratu, před obnovením starého snímku si uložte snímek aktuálního stavu.
:::

## Ukládání a publikování

Změny se ukládají automaticky během práce. Stav v panelu nástrojů ukazuje, zda byly vaše změny uloženy.

### Stav konceptu a publikování

Stránky mohou mít stav **published**, který určuje, kdy návštěvníci uvidí vaše změny. Panel nástrojů zobrazuje štítek s aktuálním stavem:

- **Live on save** -- Stránka nepoužívá pracovní postup publikování. Každá uložená změna se okamžitě zveřejní. Toto je výchozí nastavení pro nové stránky.
- **Unpublished changes** -- Stránka už byla dříve publikována, ale od posledního publikování jste provedli změny. Návštěvníci stále vidí předchozí publikovanou verzi.
- **Published** -- Stránka je živá a uložený obsah odpovídá tomu, co vidí návštěvníci.

Chcete-li změny publikovat, klikněte na tlačítko **Publish** na panelu nástrojů. Stránka se okamžitě zveřejní.

Chcete-li se vrátit k poslední publikované verzi, aniž by to ovlivnilo, co vidí návštěvníci, otevřete nabídku se třemi tečkami (⋮) a klikněte na **Discard unpublished changes**.

Chcete-li přestat používat pracovní postup publikování, otevřete nabídku se třemi tečkami a klikněte na **Turn off publishing**. Úpravy se pak opět zveřejňují okamžitě.

:::tip
Pracovní postup konceptu a publikování použijte, když chcete stránku připravit -- například pro nadcházející akci -- a zveřejnit ji až ve správný okamžik. Sestavte a zkontrolujte stránku v náhledu a až budete připraveni, klikněte na Publish.
:::

## Související články

- [Správa stránek](./managing-pages.md) -- Vytváření stránek, nastavení adres URL a správa navigace webu
- [Vzhled](./appearance.md) -- Nastavení barev, písem a branding celého webu
- [Soubory](./files.md) -- Nahrávání obrázků a dokumentů pro použití v editoru
- [Vytváření formulářů](../forms/creating-forms.md) -- Tvorba formulářů, které lze vkládat na stránky
