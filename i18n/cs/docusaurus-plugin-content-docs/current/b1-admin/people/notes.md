---
title: "Poznámky"
---

# Poznámky

<div class="article-intro">

Stránka **Poznámky** shromažďuje nedávné poznámky z celé aplikace B1 Admin na jednom místě, takže můžete být v obraze ohledně pastorační péče, navazujících kroků a plánování, aniž byste museli otevírat každý záznam zvlášť. Zobrazuje poznámky k osobám, ke skupinám, které vedete, k událostem v kalendáři a ke kartám pracovních postupů, od nejnovějších po nejstarší, a každou z nich propojuje se záznamem, ve kterém byla napsána.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Stránka **Poznámky** se zobrazí v nabídce, pokud máte oprávnění **Upravovat osoby** nebo vedete alespoň jednu skupinu. Viz [Přiřazování rolí](./roles-permissions.md).
- Stránka zobrazuje pouze poznámky, které už smíte číst. Každá karta se řídí stejnými pravidly jako záznam, ke kterému poznámky patří (viz [Co zobrazuje každá karta](#what-each-tab-shows)).

</div>

## Otevření stránky Poznámky

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu aplikace B1 Admin) a rozbalte **Osoby**.
2. Klikněte na **Poznámky**.
3. Stránka se otevře na kartě **Osoby**. Pomocí karet v záhlaví stránky přepínejte mezi **Osoby**, **Skupiny**, **Události** a **Pracovní postupy**.

## Čtení seznamu

Každá poznámka v seznamu zobrazuje:

- **Kde byla napsána** -- jméno osoby, název skupiny, název události nebo název karty pracovního postupu. Kliknutím na název otevřete daný záznam a přečtete si celé vlákno nebo přidáte poznámku.
- **Důvěrné** -- štítek u poznámek k osobám, které pochází ze sekce Důvěrné poznámky dané osoby.
- **Kdo ji napsal a kdy** -- „Od" jméno autora, následované datem a časem zveřejnění.
- **Samotnou poznámku** -- dlouhé poznámky jsou v seznamu zkráceny. Pro přečtení celého textu otevřete záznam.

Seznam zobrazuje nejnovější poznámky jako první. Starší poznámky zobrazíte kliknutím na **Načíst další** na konci seznamu.

Poznámky napsané k osobě, která byla mezitím smazána nebo sloučena s jiným záznamem, se na kartě **Osoby** nezobrazují.

Stránka Poznámky slouží pouze pro čtení. Chcete-li poznámku přidat, upravit nebo na ni odpovědět, klikněte na název záznamu a otevřete jej.

## Co zobrazuje každá karta {#what-each-tab-shows}

| Karta | Zobrazené poznámky | Kdo je může vidět | Kliknutí na název otevře |
|-------|--------------------|-------------------|--------------------------|
| **Osoby** | Poznámky u záznamů osob | Uživatelé s oprávněním **Upravovat osoby**. Důvěrné poznámky vyžadují také oprávnění **Zobrazit důvěrné poznámky** | Poznámky dané osoby |
| **Skupiny** | [Poznámky vedoucího](../groups/group-members.md#leader-notes) u skupin | Pouze vedoucí jednotlivých skupin, a to i v případě administrátorů | Poznámky dané skupiny |
| **Události** | [Poznámky k události](../calendars/creating-calendars.md#event-notes) | Zaměstnanci, kteří mohou upravovat obsah nebo spravovat kalendáře, a také každý, koho to umožňuje nastavení události **Kdo může zobrazit poznámky** | Kalendář skupiny, ke které událost patří |
| **Pracovní postupy** | Poznámky na [kartách pracovních postupů](../serving/workflows.md#working-the-board) | Každý, kdo může kartu otevřít, včetně osoby nebo skupiny, které je přiřazena | Nástěnka pracovního postupu dané karty |

Pokud na kartě zatím není nic, co byste mohli vidět, zobrazí se o tom zpráva, například „Zatím žádné poznámky ke skupinám, které vedete."

:::tip
Vlákna poznámek mají ikonu zvonku pro upozornění. Kliknutím na ni dostanete upozornění na nové poznámky v daném vlákně (ikona se změní okamžitě), a dalším kliknutím upozornění ztlumíte. Tato nastavení zapnutí a vypnutí se na stránce Poznámky nikdy nezobrazují jako poznámky.
:::

## Související články

- [Přidávání osob](./adding-people.md) -- sekce Poznámky v profilu osoby
- [Přiřazování rolí](./roles-permissions.md) -- oprávnění **Upravovat osoby** a **Zobrazit důvěrné poznámky**
- [Členové skupiny](../groups/group-members.md#leader-notes) -- soukromé poznámky vedoucího ke skupině
- [Vytváření kalendářů](../calendars/creating-calendars.md#event-notes) -- poznámky k událostem a to, kdo je může zobrazit
- [Pracovní postupy](../serving/workflows.md) -- poznámky na kartách pracovních postupů
