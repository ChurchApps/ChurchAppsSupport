---
title: "Platené registrácie"
---

# Platené registrácie

<div class="article-intro">

Registrácia na podujatie môže byť viac než jednoduchý súpis účastníkov. Môžete definovať typy účastníkov s cenou (napríklad Dospelý a Dieťa), ponúknuť voliteľné doplnkové položky s vlastnými cenami a množstvami, vytvárať zľavové kódy a prijímať platbu pri registrácii cez existujúceho poskytovateľa darov vašej cirkvi. Keď sa podujatie zaplní, voliteľný zoznam čakajúcich udrží záujemcov v poradí a automaticky ich zaradí, keď sa uvoľnia miesta.

</div>

## Video s návodom

<YouTube id="eGSZv24Dlzk" title="Registrácia na podujatia a platené podujatia v B1" next="Spustenie webovej stránky vašej cirkvi v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Najprv zapnite registráciu na podujatí — pozri [Vytváranie kalendárov](creating-calendars#enabling-event-registration)
- Ak chcete prijímať online platby, vaša cirkev musí mať [nastavené online darovanie](../donations/online-giving-setup.md) (Stripe, PayPal alebo Kingdom Funding). Bezplatné podujatia nepotrebujú nastavenie darovania. Bez online darovania platené registrácie fungujú aj naďalej, ale ľudia platia cirkvi priamo — pozri [Cirkvi bez online darovania](#churches-without-online-giving).

</div>

## Otvorenie nastavení registrácie

1. V B1 Admin otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu), zvoľte **Kalendáre > Registrácie** a otvorte svoje podujatie (alebo ho otvorte z jeho kalendára).
2. Karta **Nastavenia registrácie** zobrazuje základy — **Povoliť registráciu**, **Kapacita**, **Registrácia otvorená/zatvorená**, **Štítky** a **Otázky k registrácii**.
3. Pod základnými nastaveniami sú tri rozbaľovacie sekcie: **Typy účastníkov**, **Výbery** a **Zľavové kódy**.

## Typy účastníkov

Typy účastníkov vám umožňujú účtovať rôzne ceny pre rôzne kategórie účastníkov — a každú z nich obmedziť zvlášť.

1. Rozbaľte sekciu **Typy účastníkov** a kliknite na **Pridať typ**.
2. Zadajte **Názov** (napr. „Dospelý“, „Dieťa“, „Študent“).
3. Nastavte **Cenu**. Pre bezplatný typ zadajte 0.
4. Voliteľne nastavte **Kapacitu** iba pre tento typ (napr. len 20 miest pre deti). Ak necháte pole prázdne, pre typ nebude žiadny limit.
5. Kliknite na **Uložiť**.

Pri registrácii si každý účastník vyberie typ; vypredané typy sa zobrazia ako **Vypredané** a nedajú sa vybrať. Súpis zobrazuje typ každého účastníka a priebežné počty podľa typu.

## Výbery

Výbery sú voliteľné spoplatnené doplnky — tričká, stravovacie balíčky, vylepšenia aktivít.

1. Rozbaľte sekciu **Výbery** a kliknite na **Pridať výber**.
2. Zadajte **Názov**, voliteľný **Popis** a **Cenu** (0 sa zobrazí ako „Zadarmo“).
3. Voliteľne nastavte **Kapacitu** (celkový počet dostupných kusov vo všetkých registráciách) a **Max. množstvo** (najviac kusov, ktoré môže objednať jedna registrácia).
4. Kliknite na **Uložiť**.

Registrujúci si pri prihlasovaní vyberajú množstvo a tieto počty sa započítavajú do kapacity, takže nikdy nepredáte viac, než máte.

## Zľavové kódy

1. Rozbaľte sekciu **Zľavové kódy** a kliknite na **Pridať zľavový kód**.
2. Zadajte **Kód**, ktorý registrujúci zadajú.
3. Vyberte **Typ** — **Percento** alebo **Suma** — a zadajte jeho **Hodnotu**.
4. Voliteľne kód obmedzte pomocou **Dátumu začiatku** / **Dátumu konca**, **Min. počtu členov** (minimálny počet účastníkov v registrácii) a **Max. počtu použití**.
5. Kliknite na **Uložiť**.

Každý kód zobrazuje počet **Použití**, aby ste videli, ako často bol uplatnený. Registrujúci dostanú okamžitú spätnú väzbu, keď kód uplatnia — vrátane jasných správ, ak kód expiroval, ešte nezačal alebo vyžaduje viac účastníkov.

## Zoznam čakajúcich

Zapnite **Povoliť zoznam čakajúcich** v karte Nastavenia registrácie. Keď podujatie dosiahne kapacitu:

- Noví registrujúci dostanú miesto v zozname čakajúcich namiesto odmietnutia. Dokončia rovnakú registráciu (počas čakania sa platba preskočí).
- Keď niekto zruší účasť, najstaršia registrácia na zozname čakajúcich sa **automaticky zaradí** a dostane e-mail, že sa uvoľnilo miesto. Ak dlhujú sumu, e-mail ich prepojí na [Moje registrácie](../../b1-church/events/my-registrations) na webe B1 vašej cirkvi, kde môžu dokončiť platbu.
- Kohokoľvek môžete kedykoľvek zaradiť manuálne akciou **Zaradiť** v riadku na zozname čakajúcich — to je užitočné po zvýšení kapacity podujatia.

:::info
Zaradené registrácie zostávajú *čakajúce*, kým sa neuhradí každý dlh; po zaplatení (alebo ak nie je čo platiť) sa potvrdia.
:::

## Súpis registrácií

Otvorte podujatie zo stránky Registrácie a uvidíte všetky registrácie. Názov karty ukazuje, koľko registrácií drží miesto voči kapacite (napríklad *Registrácie (18 / 20)*). Počítajú sa iba čakajúce a potvrdené registrácie; ak sú ľudia na zozname čakajúcich, názov pridá ich počet (napríklad *· 3 na zozname čakajúcich*) a rovnaký počet sa zobrazí pod ukazovateľom kapacity. Tabuľka zobrazuje **Meno**, **Členovia**, **Typ** (typ každého účastníka), **Zaplatené / Celkom** (s upozornením na dlh, ak ešte nie je všetko zaplatené), **Stav** a **Dátum**, plus štítky s počtami podľa typu nad tabuľkou.

- Kliknutím na ikonu detailov v riadku otvoríte dialóg **Detaily registrácie** — členovia, výbery, zaplatené/dlh a tabuľku **Platby** so všetkými platbami (suma, spôsob, dátum).
- **Exportovať CSV** stiahne úplný súpis so stĺpcami pre členov, typy účastníkov, výbery, zaplatené/celkom/dlh, stav a jeden stĺpec pre každú otázku registrácie.
- **Pridať účastníka** zaznamená registráciu mimo systému alebo telefonicky pre ľubovoľnú osobu vo vašej cirkvi. Vyberte osobu a pri platenom podujatí aj jej typ účastníka. Jej karta sa nespoplatní: platená registrácia sa uloží ako **čakajúca** s celou sumou ako dlhom. Ak má vaša cirkev online darovanie, osoba môže platbu uhradiť cez [Moje registrácie](../../b1-church/events/my-registrations); inak ju vyberte osobne. Na pridávanie účastníkov potrebujete oprávnenie Upraviť registrácie.

:::info
Vrátenie platieb sa v B1 nespracúva. Ak potrebujete vrátiť platbu za zrušenú platenú registráciu, urobte to v administrácii vášho poskytovateľa darov (napr. Stripe).
:::

## Ako funguje platba

Platby prebiehajú cez rovnakú bránu darovania, ktorú vaša cirkev už používa na dary — údaje o karte idú priamo k poskytovateľovi a nikdy neprechádzajú cez servery B1. Ceny sa vždy počítajú na serveri z vašich nakonfigurovaných typov, výberov a zľavových kódov, takže registrujúci nemôže zmeniť celkovú sumu. Prihlásení členovia môžu platiť uloženou kartou. Hostia zadajú kartu pri pokladni a pred platbou musia zaškrtnúť políčko **Nie som robot**.

### Cirkvi bez online darovania

Ak vaša cirkev nemá nastaveného poskytovateľa darovania, platené podujatia môžu prijímať registrácie aj naďalej. Krok platby informuje registrujúcich, že online platba nie je k dispozícii a že môžu zaplatiť cirkvi priamo; tlačidlo **Registrovať a zaplatiť neskôr** registráciu uloží. Uloží sa ako **čakajúca** s celou sumou ako dlhom a v súpise sa zobrazí s upozornením na dlh. Peniaze vyberte spôsobom, ktorý vaša cirkev zvyčajne používa.

:::info
B1 nemá spôsob, ako označiť offline platbu ako prijatú. Dlh zostáva v súpise aj na karte [Moje registrácie](../../b1-church/events/my-registrations) registrujúceho aj po tom, ako ho vyberiete, preto si veďte vlastný záznam o tom, kto zaplatil.
:::

## Súvisiace články

- [Vytváranie kalendárov](creating-calendars#enabling-event-registration) — zapnutie registrácie a základných nastavení
- [Nastavenie online darovania](../donations/online-giving-setup.md) — konfigurácia platobnej brány použitej pri pokladni
- [Registrácia na podujatia](../../b1-church/events/registering) — čo členovia vidia pri prihlasovaní
- [Moje registrácie](../../b1-church/events/my-registrations) — ako členovia platia dlhy a upravujú registrácie
