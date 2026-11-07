---
title: "Vytváření kalendářů"
description: "Vytvořte kalendář v B1 Admin, připojte skupiny nebo importujte soubory .ics a spravujte jeho akce, registrace i poznámky na jednom místě."
---

# Vytváření kalendářů

<div class="article-intro">

Vytvoření kalendáře v B1 Admin vám umožní sestavit přehledný výběr událostí propojením jedné nebo více skupin. Události spravují vedoucí skupin ve svých skupinách a váš kalendář je zobrazuje na jednom místě. Administrátoři s přístupem k úpravám mohou přidávat nebo upravovat události v libovolné skupině. Vedoucí skupin bez administrátorských práv mohou spravovat události pouze ve skupinách, které vedou.

</div>

## Školicí video

<YouTube id="Ko3kgsCSLFs" title="Vytváření kalendářů, událostí a rezervací místností v B1" next="Registrace na události a placené události v B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte [skupiny](../groups/creating-groups.md), jejichž události chcete do kalendáře zahrnout
- Potřebujete administrátorský přístup k sekci Kalendáře v B1 Admin

</div>

## Vytvoření nového kalendáře

1. V B1 Admin otevřete [Rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte položku **Kalendáře** a klikněte na **Kalendáře**.
2. Nahoře na stránce klikněte na **Přidat kalendář**. Formulář pro nový kalendář se otevře pod seznamem kalendářů.
3. Zadejte **název** kalendáře (například „Události mládeže“ nebo „Hlavní kalendář sboru“).
4. Volitelně přidejte **popis**, aby váš tým věděl, k čemu tento kalendář slouží.
5. Kliknutím na **Vytvořit** kalendář uložte.

## Detail kalendáře

Po vytvoření kalendáře klikněte na jeho řádku na **Spravovat události** a otevřete stránku s detailem. Tato stránka má dvě hlavní části:

- **Levý sloupec** – Název kalendáře s jeho akcemi (**Nová událost**, **Upravit**, **Importovat .ics** a **Tisk**), a pod nimi seznam **Skupiny v kalendáři**, který ukazuje, které skupiny jsou v kalendáři zahrnuty. Kliknutím na **Odebrat** u skupiny ji z kalendáře vyřadíte.
- **Hlavní oblast** – Zobrazení **Události kalendáře** s událostmi převzatými z propojených skupin a nad ním tlačítka **Odebírat** a **Přidat skupinu**.

## Propojení skupin

Skupiny, které mají v kalendáři události, se automaticky objeví v seznamu **Skupiny v kalendáři** na levé straně stránky s detailem.

1. Kliknutím na **Přidat skupinu** nad kalendářem přiřadíte skupinu ke kalendáři.
2. Vyberte skupinu z rozbalovacího seznamu. Seznam obsahuje všechny skupiny vašeho sboru, nejen ty, do kterých patříte.
3. Zvolte, zda chcete zahrnout **všechny události** z dané skupiny, nebo jen **vybrané události**.
4. Klikněte na **Uložit**.

Každá událost se v kalendáři objeví pouze jednou. Pokud přidáte celou skupinu, všechny její události, které jste už dříve přidali jednotlivě, se sloučí do položky skupiny. Výběr konkrétních událostí ze skupiny, která už v kalendáři je, nepřidá nic nového. Pod položkou **Skupiny v kalendáři** se zobrazují pouze skupiny přidané jako celek.

### Import souboru .ics

Kliknutím na **Importovat .ics** převezmete události z jiného kalendáře. Vyberte **skupinu**, do které mají události patřit, pak klikněte na **Vybrat soubor .ics** nebo vložte obsah souboru, a nakonec klikněte na **Importovat**. Události se vytvoří v dané skupině a skupina se přidá do kalendáře, ze kterého importujete, takže se události hned zobrazí.

### Odebrání události z kalendáře

Klikněte na událost v kalendáři a poté na **Odebrat z kalendáře**. Tím se událost odebere pouze z tohoto kalendáře – samotná událost zůstane ve své skupině. Pokud je událost v kalendáři proto, že byla přidána celá její skupina, odebráním se z kalendáře vyřadí všechny události dané skupiny (události ve skupině zůstanou). Pokud chcete událost natrvalo smazat, odstraňte ji v [kalendáři skupiny](../groups/group-calendar.md).

:::tip
Propojení skupin s kalendářem je účinný způsob, jak automaticky sdružovat události. Když vedoucí skupiny přidá událost do své [skupiny](../groups/creating-groups.md), může se bez dalšího zásahu z vaší strany objevit v kalendáři celého sboru.
:::

:::info
Pokud chcete vytvořit jeden kalendář, který čerpá události z mnoha skupin napříč sborem, podívejte se na [Kurátorovaný kalendář](./curated-calendar.md), kde najdete přímočařejší postup.
:::

## Přidávání a úprava událostí {#adding-and-editing-events}

Chcete-li přidat událost, klikněte na stránce s detailem kalendáře na **Nová událost**. Chcete-li ji změnit, klikněte v kalendáři na událost a poté na **Upravit**. Formulář **Nová událost** / **Upravit událost** obsahuje tato pole:

- **Skupina** – Skupina, ke které událost patří. Pokud váš sbor používá šablony událostí, můžete také vybrat **Šablonu**, která formulář předvyplní.
- **Název**
- **Fotografie události** – Kliknutím na **Přidat fotografii** (nebo na prázdné políčko pro fotografii) vyberete nebo nahrajete obrázek, který se oříznutím přizpůsobí širokému formátu 16:9. Kliknutím na **Změnit fotografii** ji nahradíte. Fotografie se zobrazuje nahoře na stránce události na vašem webu a jako její dlaždice, když prvek Kalendář zobrazuje **Nadcházející události** (viz [Zobrazení událostí na vašem webu](#showing-events-on-your-website)).
- **Popis** – Zobrazuje se na stránce události na vašem webu. Podporováno je tučné písmo, seznamy a odkazy.
- **Začátek** a **Konec**, **Opakování** a **Viditelnost** (**Veřejná** nebo **Soukromá**).
- **Štítky** – Štítky oddělené čárkami, například `mladez, studenti`. Prvek Kalendář na vašem webu lze nastavit tak, aby zobrazoval pouze události s určitým štítkem. Jde o stejné pole **Štítky**, které je v nastavení registrace události.
- **Kdo může zobrazit poznámky** a **Kdo může přidávat poznámky** – Kdo může číst poznámky k události a přidávat do nich (viz [Poznámky k události](#event-notes)). Vyberte **Pouze zaměstnanci** (výchozí nastavení), **Vedoucí skupiny** (vedoucí skupiny dané události) nebo **Členové skupiny** (všichni ve skupině události, včetně jejích vedoucích).
- **Místnosti** a **Zdroje** – Rezervace prostor a vybavení pro událost. Viz [Místnosti, zdroje a plánování](./rooms-resources.md).

Klikněte na **Uložit**. Pokud se událost opakuje, B1 vás požádá o potvrzení, protože uložení aktualizuje každý výskyt v řadě.

### Poznámky k události {#event-notes}

Každá událost má vlastní vlákno poznámek pro plánování a navazující kroky. Klikněte na událost na stránce s detailem kalendáře; dialog zobrazí podrobnosti události, její připomenutí a pod nimi sekci **Poznámky**. Napište poznámku a odešlete ji, čímž se přidá do vlákna.

Zaměstnanci s oprávněním upravovat obsah nebo spravovat kalendáře mohou poznámky k události vždy číst a přidávat. Nastavení **Kdo může zobrazit poznámky** a **Kdo může přidávat poznámky** u události určuje, zda je mohou číst a přidávat i vedoucí nebo členové skupiny události.

### Zobrazení událostí na vašem webu {#showing-events-on-your-website}

Chcete-li na váš web umístit kalendář, přidejte na stránku prvek **Kalendář** a vyberte tento kalendář. Prvek může zobrazovat měsíční kalendář nebo mřížku dlaždic nadcházejících událostí a lze jej omezit na události s jedním štítkem. Návštěvníci, kteří klikнou na událost, otevřou její vlastní stránku. Viz [Použití prvku Kalendář](../website/page-editor.md#using-the-calendar-element).

## Zapnutí registrace na události {#enabling-event-registration}

Registraci můžete zapnout u libovolné události v kalendáři, aby se členové mohli přihlásit přes web B1 nebo mobilní aplikaci.

1. Klikněte na existující událost nebo vytvořte novou.
2. V editoru události přepněte přepínač **Registrace** na zapnuto.
3. Nastavte možnosti registrace:
   - **Kapacita** (volitelné) – Nastavte maximální počet registrací. Pokud necháte prázdné, počet není omezen.
   - **Registrace se otevírá** – Datum a čas, kdy se registrace zpřístupní.
   - **Registrace se uzavírá** – Datum a čas, kdy se registrace uzavře.
   - **Štítky** – Štítky oddělené čárkami (např. „mladez, retreat, VBS“), které pomáhají zařazovat události, na něž se lze registrovat.
   - **Otázky k registraci** – Volitelně můžete připojit [formulář](../forms/creating-forms.md), aby registrující odpověděli na doplňující otázky (stravovací omezení, velikost trička, kontakt pro případ nouze apod.) jako součást přihlášení. Výběrem **Žádné** otázky přeskočíte.
   - **Povolit čekací listinu** – Když je událost plná, mohou se další zájemci zařadit na čekací listinu namísto odmítnutí. Viz [Placené registrace](./paid-registrations.md#waitlist).
4. Uložte událost.

U placených událostí na stejné stránce s nastavením definujete zpoplatněné **Typy účastníků**, volitelné **Výběry** (doplňky) a **Slevové kódy**; platby se přijímají přes poskytovatele darů vašeho sboru. Kompletní postup najdete na stránce [Placené registrace](./paid-registrations.md).

Jakmile je registrace zapnutá, členové uvidí tlačítko **Registrovat se na tuto událost**, když si událost zobrazí na [webu B1](../../b1-church/events/registering.md) nebo v [mobilní aplikaci B1](../../b1-mobile/events/registering.md). Pokud jste připojili formulář, registrující během přihlašování uvidí krok **Otázky** a jejich odpovědi se uloží spolu s registrací.

:::info
Otázky k registraci fungují pouze s formuláři, které **nejsou** označeny jako Omezený. Omezený formulář se během registrace automaticky přeskočí a nezobrazí se, proto při připojování otázek k události použijte neomezený formulář.
:::

### Správa registrací

Chcete-li zobrazit a spravovat registrace na své události:

1. V Rychlé nabídce zvolte **Kalendáře > Registrace**.
2. Zobrazí se tabulka všech událostí s zapnutou registrací, která ukazuje název události, datum, aktuální počet registrací oproti kapacitě a štítky.
3. Kliknutím na událost zobrazíte úplný seznam registrací, včetně jmen, počtu členů, typů účastníků, stavu platby a data registrace.
4. Na stránce s detailem můžete:
   - **Přidat účastníka** – Ručně zaregistrovat někoho, kdo se přihlásil offline nebo telefonicky.
   - **Zrušit** jednotlivé registrace
   - **Smazat** registrace natrvalo
   - **Povýšit** registrace z čekací listiny, když se uvolní místo
   - **Exportovat CSV** – Stáhnout všechny registrace včetně typů účastníků, výběrů, částek plateb a odpovědí na otázky

Pokud má událost připojeny otázky k registraci, stránka s detailem také zobrazuje filtr **Pouze nezodpovězené otázky**, který rychle najde registrující, kteří ještě neodeslali odpovědi, a u každé zodpovězené registrace tlačítko **Zobrazit odpovědi**, které ukáže jejich odpovědi. U placených událostí přibývá sloupec **Typ**, sloupec **Zaplaceno / Celkem**, počty podle typů a dialog s detaily plateb – viz [Placené registrace](./paid-registrations.md#the-registration-roster).

:::tip
Ukazatel kapacity vám ukáže, jak rychle se události zaplňují. Když je událost na kapacitě nebo nad ní, ukazatel zčervená.
:::

## Další kroky

- [Kurátorovaný kalendář](./curated-calendar.md) – Vytvořte kalendář, který čerpá z více skupin
- [Placené registrace](./paid-registrations.md) – Typy účastníků, doplňkové výběry, slevové kódy, platby a čekací listiny
- [Průvodce registrací na události](../guides/event-registration.md) – Postup krok za krokem při nastavení registrace na události
- [Přehled kalendářů](./index.md) – Návrat na přehled kalendářů
