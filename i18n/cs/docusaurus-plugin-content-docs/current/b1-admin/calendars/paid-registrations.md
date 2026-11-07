---
title: "Placené registrace"
description: "Nastavte placené registrace na akce v B1 Admin: typy účastníků s cenou, doplňky, slevové kódy, čekací listiny a platby přes poskytovatele darů."
---

# Placené registrace

<div class="article-intro">

Registrace na akce může být víc než jen jednoduché sečtení účastníků. Můžete definovat typy účastníků s cenou (např. Dospělý a Dítě), nabízet volitelné doplňky s vlastními cenami a počty, vytvářet slevové kódy a vybírat platbu při registraci prostřednictvím stávajícího poskytovatele online darování vaší církve. Když se akce zaplní, volitelná čekací listina udrží zájemce ve frontě a automaticky je zařadí, jakmile se uvolní místo.

</div>

## Školicí video

<YouTube id="eGSZv24Dlzk" title="Registrace na akce a placené akce v B1" next="Spuštění webu vaší církve v B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Než začnete</h4>

- Nejprve zapněte registraci na akci — viz [Vytváření kalendářů](./creating-calendars.md#enabling-event-registration)
- Pro online platby potřebuje vaše církev [nastavené online darování](../donations/online-giving-setup.md) (Stripe, PayPal nebo Kingdom Funding). Bezplatné akce nevyžadují žádné nastavení darování. Bez online darování placené registrace fungují dál, ale lidé platí církvi přímo — viz [Církve bez online darování](#churches-without-online-giving).

</div>

## Otevření nastavení registrace

1. V B1 Admin otevřete [Rychlou navigaci](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), vyberte **Kalendáře > Registrace** a otevřete svou akci (nebo ji otevřete z jejího kalendáře).
2. Karta **Nastavení registrace** zobrazuje základní údaje — **Povolit registraci**, **Kapacitu**, **Registrace se otevírá/zavírá**, **Štítky** a **Otázky k registraci**.
3. Pod základními údaji jsou tři rozbalovací sekce: **Typy účastníků**, **Výběry** a **Slevové kódy**.

## Typy účastníků

Typy účastníků vám umožňují účtovat různé ceny pro různé druhy účastníků a každý typ omezit zvlášť.

1. Rozbalte sekci **Typy účastníků** a klikněte na **Přidat typ**.
2. Zadejte **Název** (např. „Dospělý“, „Dítě“, „Student“).
3. Nastavte **Cenu**. Pro bezplatný typ použijte 0.
4. Volitelně nastavte **Kapacitu** pouze pro tento typ (např. jen 20 míst pro děti). Nechte prázdné, pokud nechcete limit pro jednotlivý typ.
5. Klikněte na **Uložit**.

Při registraci si každý účastník vybere typ; typy, které jsou vyprodané, se zobrazují jako **Vyprodáno** a nelze je vybrat. Seznam účastníků ukazuje typ každého účastníka a průběžné počty podle typu.

## Výběry

Výběry jsou volitelné placené doplňky — trička, stravovací plány, rozšíření aktivit.

1. Rozbalte sekci **Výběry** a klikněte na **Přidat výběr**.
2. Zadejte **Název**, volitelný **Popis** a **Cenu** (0 se zobrazí jako „Zdarma“).
3. Volitelně nastavte **Kapacitu** (celkový počet dostupných kusů ve všech registracích) a **Max. počet** (nejvíce kusů, které může jedna registrace objednat).
4. Klikněte na **Uložit**.

Registrovaní si při přihlášení vybírají množství a součty se počítají do kapacity, takže nikdy neprodáte víc, než máte.

## Slevové kódy

1. Rozbalte sekci **Slevové kódy** a klikněte na **Přidat slevový kód**.
2. Zadejte **Kód**, který registrovaní zadají.
3. Vyberte **Typ** — **Procenta** nebo **Částka** — a jeho **Hodnotu**.
4. Volitelně kód omezte pomocí **Data začátku** / **Data konce**, **Min. počtu členů** (nejmenší počet účastníků v registraci) a **Max. počtu použití**.
5. Klikněte na **Uložit**.

U každého kódu se zobrazuje počet **použití**, takže vidíte, jak často byl uplatněn. Registrovaní okamžitě dostanou zpětnou vazbu, když kód uplatní — včetně jasných zpráv, pokud kód vypršel, ještě nezačal, nebo vyžaduje více účastníků.

## Čekací listina

Na kartě Nastavení registrace zapněte **Povolit čekací listinu**. Když akce dosáhne kapacity:

- Novým registrovaným je místo odmítnutí nabídnuto místo na čekací listině. Přihlášení dokončí stejným způsobem (během čekání na listině se platba přeskočí).
- Když někdo zruší registraci, nejstarší registrace z čekací listiny je **automaticky povýšena** a obdrží e-mail, že se uvolnilo místo. Pokud dluží doplatek, e-mail je odkáže na [Moje registrace](../../b1-church/events/my-registrations.md) na webu B1 vaší církve, kde mohou zaplatit.
- Kohokoli můžete kdykoli povýšit ručně pomocí akce **Povýšit** na řádku čekací listiny — užitečné po zvýšení kapacity akce.

:::info
Povýšené registrace zůstávají *čekající*, dokud není uhrazen případný doplatek; zaplacením (nebo pokud nic doplácet nemusí) se potvrdí.
:::

## Seznam registrací

Otevřete akci ze stránky Registrace a uvidíte všechny registrace. Nadpis karty ukazuje, kolik registrací zabírá místo oproti kapacitě (například *Registrace (18 / 20)*). Počítají se pouze čekající a potvrzené registrace; pokud jsou lidé na čekací listině, nadpis přidá jejich počet (například *· 3 na čekací listině*) a stejný počet se zobrazí pod ukazatelem kapacity. Tabulka zobrazuje **Název**, **Členové**, **Typ** (typ každého účastníka), **Zaplaceno / Celkem** (s upozorněním na dluh, pokud ještě nějaká částka dluží), **Stav** a **Datum**, a nad tabulkou štítky s počty podle typů.

- Kliknutím na ikonu podrobností na řádku otevřete dialog **Podrobnosti registrace** — členové, výběry, zaplaceno/zůstatek a tabulku **Platby** s každou úhradou (částka, způsob, datum).
- **Export CSV** stáhne celý seznam se sloupci pro členy, typy účastníků, výběry, zaplaceno/celkem/zůstatek, stav a jeden sloupec pro každou otázku k registraci.
- **Přidat účastníka** zaznamená přihlášení offline nebo telefonicky pro kohokoli ve vaší církvi. Vyberte osobu a u placené akce také její typ účastníka. Jejich karta se neúčtuje: placená registrace se uloží jako **čekající** s celou částkou jako nedoplatkem. Pokud vaše církev má online darování, osoba může zaplatit z [Moje registrace](../../b1-church/events/my-registrations.md); jinak ji vyberte osobně. K přidávání účastníků potřebujete oprávnění Upravovat registrace.

:::info
Vrácení peněz se v B1 nezpracovává. Pokud potřebujete vrátit peníze za zrušenou placenou registraci, proveďte vrácení v administraci vašeho poskytovatele online darování (např. Stripe).
:::

## Jak funguje platba

Platby procházejí stejnou platební bránou pro darování, kterou vaše církev již používá — údaje o kartě jdou přímo k poskytovateli a nikdy se nedostanou na servery B1. Ceny se vždy počítají na serveru podle vašich nastavených typů, výběrů a slevových kódů, takže registrovaný nemůže celkovou částku ovlivnit. Přihlášení členové mohou platit uloženou kartou. Hosté zadají kartu při pokladně a před platbou musí zaškrtnout políčko **Nejsem robot**.

### Církve bez online darování

Pokud vaše církev nemá nastaveného poskytovatele online darování, placené akce mohou přijímat registrace i nadále. Krok platby registrovaným sdělí, že online platba není k dispozici a že mohou zaplatit církvi přímo, a tlačítko **Registrovat a zaplatit později** registraci uloží. Je uložena jako **čekající** s celou částkou jako nedoplatkem a v seznamu se zobrazí s upozorněním na dluh. Peníze vyberte tak, jak to vaše církev obvykle dělá.

:::info
B1 nemá způsob, jak označit offline platbu jako přijatou. Nedoplatek zůstane v seznamu i na kartě [Moje registrace](../../b1-church/events/my-registrations.md) registrovaného i poté, co ho vyberete, proto si veďte vlastní záznam o tom, kdo zaplatil.
:::

## Související články

- [Vytváření kalendářů](./creating-calendars.md#enabling-event-registration) — zapnutí registrace a základní nastavení
- [Nastavení online darování](../donations/online-giving-setup.md) — nastavení platební brány použité při pokladně
- [Registrace na akce](../../b1-church/events/registering.md) — co členové vidí při přihlašování
- [Moje registrace](../../b1-church/events/my-registrations.md) — jak členové hradí doplatky a upravují registrace
