---
title: "Vytváření kalendářů"
description: "Vytvořte kalendář v B1 Admin, připojte skupiny nebo importujte soubory .ics a spravujte jeho události, registrace a poznámky na jednom místě."
---

# Vytváření kalendářů

<div class="article-intro">

Vytvoření kalendáře v B1 Admin vám umožní sestavit přehled událostí, který vznikne připojením jedné nebo více skupin. Události spravují vedoucí skupin ve svých skupinách a váš kalendář je všechny zobrazuje na jednom místě. Administrátoři s oprávněním k úpravám mohou přidávat nebo upravovat události v libovolné skupině. Vedoucí skupin, kteří nejsou administrátory, mohou spravovat události pouze ve skupinách, které vedou.

</div>

## Školicí video

<YouTube id="Ko3kgsCSLFs" title="Vytváření kalendářů, událostí a rezervací místností v B1" next="Registrace na události a placené události v B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte [skupiny](../groups/creating-groups.md), jejichž události chcete zahrnout do kalendáře
- Potřebujete administrátorský přístup k sekci Kalendáře v B1 Admin

</div>

## Vytvoření nového kalendáře

1. V B1 Admin otevřete [rychlou nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte položku **Kalendáře** a klikněte na **Kalendáře**.
2. Nahoře na stránce klikněte na **Přidat kalendář**. Pod seznamem kalendářů se otevře formulář pro nový kalendář.
3. Zadejte **název** kalendáře (například „Události mládeže“ nebo „Hlavní kalendář sboru“).
4. Volitelně přidejte **popis**, který vašemu týmu pomůže pochopit, k čemu tento kalendář slouží.
5. Kliknutím na **Vytvořit** nový kalendář uložte.

## Stránka s detailem kalendáře

Po vytvoření kalendáře klikněte na jeho řádku na **Spravovat události**, čímž otevřete stránku s detailem. Tato stránka má dvě hlavní části:

- **Levý sloupec** -- Název kalendáře s jeho akcemi (**Nová událost**, **Upravit**, **Importovat .ics** a **Tisk**), následovaný seznamem **Skupiny v kalendáři**, který ukazuje, které skupiny jsou do kalendáře zahrnuty. Kliknutím na **Odebrat** vedle skupiny ji z kalendáře vyřadíte.
- **Hlavní oblast** -- Zobrazení **Události kalendáře** s událostmi načtenými z připojených skupin, nad nímž jsou tlačítka **Odebírat** a **Přidat skupinu**.

## Připojování skupin

Skupiny, které mají události v kalendáři, se automaticky zobrazí v seznamu **Skupiny v kalendáři** na levé straně stránky s detailem.

1. Kliknutím na **Přidat skupinu** nad kalendářem přiřadíte skupinu ke kalendáři.
2. V rozbalovací nabídce vyberte skupinu. Seznam obsahuje všechny skupiny vašeho sboru, nejen ty, jejichž jste členem.
3. Vyberte, zda chcete zahrnout **všechny události** dané skupiny, nebo jen **konkrétní události**.
4. Klikněte na **Uložit**.

Každá událost se v kalendáři objeví pouze jednou. Pokud přidáte celou skupinu, všechny její události, které jste už dříve přidali jednotlivě, se sloučí do záznamu skupiny. Výběr konkrétních událostí ze skupiny, která už v kalendáři je, nic nového nepřidá. Pod položkou **Skupiny v kalendáři** jsou uvedeny pouze skupiny přidané jako celek.

### Import souboru .ics

Kliknutím na **Importovat .ics** přidáte události z jiného kalendáře. Vyberte **Skupinu**, do které mají události patřit, pak klikněte na **Vybrat soubor .ics** nebo vložte obsah souboru, a nakonec klikněte na **Importovat**. Události se vytvoří v dané skupině a skupina se přidá do kalendáře, ze kterého importujete, takže se události hned zobrazí i tam.

### Odebrání události z kalendáře

Klikněte na událost v kalendáři a poté na **Odebrat z kalendáře**. Tím se událost odebere pouze z tohoto kalendáře -- samotná událost zůstane ve své skupině. Pokud je událost v kalendáři proto, že byla přidána celá její skupina, odebráním se z kalendáře vyřadí všechny události této skupiny (události ve skupině zůstanou zachovány). Chcete-li událost trvale smazat, odstraňte ji z [kalendáře skupiny](../groups/group-calendar.md).

:::tip
Připojení skupin ke kalendáři je účinný způsob, jak automaticky sdružovat události. Když vedoucí skupiny přidá událost do své [skupiny](../groups/creating-groups.md), může se bez jakékoli další práce z vaší strany objevit v kalendáři celého sboru.
:::

:::info
Pokud chcete vytvořit jeden kalendář, který načítá události z mnoha skupin napříč sborem, podívejte se na [Kurátorský kalendář](./curated-calendar.md), kde najdete jednodušší postup.
:::

## Přidávání a úprava událostí {#adding-and-editing-events}

Chcete-li přidat událost, klikněte na stránce s detailem kalendáře na **Nová událost**. Chcete-li ji změnit, klikněte na událost v kalendáři a poté na **Upravit**. Formulář **Nová událost** / **Upravit událost** obsahuje tato pole:

- **Skupina** -- Skupina, do které událost patří. Pokud váš sbor používá šablony událostí, můžete vybrat **Šablonu**, která formulář předvyplní.
- **Název**
- **Fotografie události** -- Kliknutím na **Přidat fotografii** (nebo na prázdný rámeček pro fotografii) vyberte nebo nahrajte obrázek, který se ořízne do širokého tvaru 16:9. Kliknutím na **Změnit fotografii** ji nahradíte. Fotografie se zobrazuje v horní části stránky události na vašem webu a jako její dlaždice, pokud prvek Kalendář zobrazuje **Nadcházející události** (viz [Zobrazování událostí na vašem webu](#showing-events-on-your-website)).
- **Popis** -- Zobrazuje se na stránce události na vašem webu. Podporován je tučný text, seznamy a odkazy.
- **Začátek** a **Konec**, **Opakování** a **Viditelnost** (**Veřejné** nebo **Soukromé**).
- **Štítky** -- Štítky oddělené čárkami, například `mládež, studenti`. Prvek Kalendář na vašem webu lze nastavit tak, aby zobrazoval pouze události s určitým štítkem. Toto je stejné pole **Štítky**, které se zobrazuje v nastavení registrace události.
- **Kdo může zobrazit poznámky** a **Kdo může přidávat poznámky** -- Kdo může číst a přidávat poznámky k události (viz [Poznámky k události](#event-notes)). Vyberte **Pouze zaměstnanci** (výchozí nastavení), **Vedoucí skupiny** (vedoucí skupiny události) nebo **Členové skupiny** (všichni ve skupině události, včetně jejích vedoucích).
- **Místnosti** a **Zdroje** -- Rezervujte prostor a vybavení pro událost. Viz [Místnosti, zdroje a plánování](./rooms-resources.md).

Klikněte na **Uložit**. Pokud se událost opakuje, B1 vás požádá o potvrzení, protože uložení aktualizuje každý výskyt v sérii.

### Poznámky k události {#event-notes}

Každá událost má vlastní vlákno poznámek pro plánování a navazující kroky. Klikněte na událost na stránce s detailem kalendáře; dialog zobrazí podrobnosti o události, její připomínky a níže její **Poznámky**. Napište poznámku a odešlete ji, čímž ji přidáte do vlákna.

Zaměstnanci s oprávněním upravovat obsah nebo spravovat kalendáře mohou vždy číst a přidávat poznámky k události. Nastavení **Kdo může zobrazit poznámky** a **Kdo může přidávat poznámky** u události určuje, zda je mohou číst a přidávat také vedoucí nebo členové skupiny události.

### Zobrazování událostí na vašem webu {#showing-events-on-your-website}

Chcete-li na svůj web umístit kalendář, přidejte na stránku prvek **Kalendář** a vyberte tento kalendář. Prvek může zobrazovat měsíční kalendář nebo mřížku dlaždic nadcházejících událostí a lze jej omezit na události s jedním štítkem. Návštěvníci, kteří kliknou na událost, otevřou její vlastní stránku události. Viz [Použití prvku Kalendář](../website/page-editor.md#using-the-calendar-element).

## Zapnutí registrace na události {#enabling-event-registration}

Registraci můžete zapnout u libovolné události v kalendáři, aby se členové mohli přihlásit prostřednictvím webu B1 nebo mobilní aplikace B1.

1. Klikněte na existující událost nebo vytvořte novou.
2. V editoru události přepínačem zapněte **Registraci**.
3. Nakonfigurujte nastavení registrace:
   - **Kapacita** (volitelné) -- Nastavte maximální počet registrací. Pokud pole necháte prázdné, kapacita je neomezená.
   - **Registrace se otevírá** -- Datum a čas, kdy se registrace zpřístupní.
   - **Registrace se uzavírá** -- Datum a čas, kdy se registrace uzavře.
   - **Štítky** -- Štítky oddělené čárkami (např. „mládež, rekreace, VBS“), které pomáhají kategorizovat události, na něž se lze registrovat.
   - **Otázky k registraci** -- Volitelně připojte [formulář](../forms/creating-forms.md), aby registrovaní při přihlašování odpovídali na další otázky (stravovací omezení, velikost trička, kontakt pro případ nouze apod.). Výběrem **Žádný** otázky přeskočíte.
   - **Povolit čekací listinu** -- Pokud je událost plně obsazena, umožní dalším zájemcům přidat se na čekací listinu namísto odmítnutí. Viz [Placené registrace](./paid-registrations.md#waitlist).
4. Uložte událost.

U placených událostí vám stejná stránka nastavení umožní definovat zpoplatněné **typy účastníků**, volitelné **výběry** (doplňky) a **slevové kódy**. Platby se přijímají prostřednictvím poskytovatele darů vašeho sboru. Úplný postup najdete v části [Placené registrace](./paid-registrations.md).

Jakmile je registrace zapnutá, členové uvidí tlačítko **Registrovat se na tuto událost**, když si událost zobrazí na [B1.church nebo v aplikaci B1](../../b1-church/events/registering.md). Pokud jste připojili formulář, registrovaní během přihlašování uvidí krok **Otázky** a jejich odpovědi se uloží spolu s jejich registrací.

:::info
Otázky k registraci fungují pouze s formuláři, které **nejsou** označeny jako Omezené. Omezený formulář se při registraci automaticky přeskočí a nezobrazí se, proto při připojování otázek k události použijte neomezený formulář.
:::

### Správa registrací

Chcete-li zobrazit a spravovat registrace na své události:

1. V nabídce Jump zvolte **Kalendáře > Registrace**.
2. Zobrazí se tabulka všech událostí s zapnutou registrací. Obsahuje název události, datum, aktuální počet registrací oproti kapacitě a štítky.
3. Kliknutím na událost zobrazíte úplný seznam registrací, včetně jmen, počtu členů, typů účastníků, stavu platby a data registrace.
4. Na stránce s detailem můžete:
   - **Přidat účastníka** -- Ručně zaregistrovat osobu, která se přihlásila offline nebo telefonicky.
   - **Zrušit** jednotlivé registrace
   - **Smazat** registrace trvale
   - **Posunout** registraci z čekací listiny, když se uvolní místo
   - **Exportovat CSV** -- Stáhnout všechny registrace, včetně typů účastníků, výběrů, částek plateb a odpovědí na otázky

Pokud má událost připojeny otázky k registraci, stránka s detailem také zobrazí filtr **Pouze nezodpovězené otázky**, pomocí něhož rychle najdete registrované, kteří dosud neodeslali odpovědi, a u každé zodpovězené registrace tlačítko **Zobrazit odpovědi**, kde uvidíte jejich odpovědi. U placených událostí přibude sloupec **Typ**, sloupec **Zaplaceno / Celkem**, počty podle typů a dialog s podrobnostmi plateb. Viz [Placené registrace](./paid-registrations.md#the-registration-roster).

:::tip
Ukazatel kapacity vám pomůže sledovat, jak rychle se události zaplňují. Ukazatel zčervená, když je událost na kapacitě nebo nad ní.
:::

## Další kroky

- [Kurátorský kalendář](./curated-calendar.md) -- Vytvořte kalendář, který čerpá z více skupin
- [Placené registrace](./paid-registrations.md) -- Typy účastníků, doplňkové výběry, slevové kódy, platby a čekací listiny
- [Průvodce registrací na události](../guides/event-registration.md) -- Postup krok za krokem při nastavení registrace na události
- [Přehled kalendářů](./index.md) -- Návrat na přehled kalendářů
