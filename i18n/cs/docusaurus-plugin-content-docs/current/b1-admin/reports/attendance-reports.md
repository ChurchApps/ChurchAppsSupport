---
title: "Přehledy docházky"
---

# Přehledy docházky

<div class="article-intro">

B1 Admin nabízí tři přehledy docházky, které vám pomohou pochopit, jak se lidé zapojují do vašich bohoslužeb a skupin. Každý přehled nabízí jiný pohled na data docházky, od celkových trendů až po denní rozpady.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ujistěte se, že je docházka pro vaše bohoslužby a skupiny [zaznamenávána důsledně](../attendance/tracking-attendance.md)
- Ověřte, že jsou vaše [skupiny](../groups/creating-groups.md) a bohoslužby nastaveny v B1 Admin
- Pro přístup k přehledům potřebujete odpovídající [oprávnění](../settings/roles-permissions.md)

</div>

## Trend docházky

Přehled Trend docházky ukazuje, jak se docházka na vaše bohoslužby mění v čase.

1. Přejděte přímo na **admin.b1.church/reports/attendanceTrend** ve svém prohlížeči (přehledy nemají položku v navigačním menu, takže nejjednodušší způsob, jak se k nim vrátit, je si adresu uložit do záložek). Stejný přehled je také na stránce Docházka: klikněte na **Všechny roky** a potom vyberte záložku **Trend docházky**.
2. Volitelně vyberte **Sbor**, **Bohoslužbu**, **Čas bohoslužby** nebo **Skupinu** a výsledky tím filtrujte.
3. Nastavte **Datum začátku** a **Datum konce**. Ve výchozím nastavení přehled pokrývá uplynulý rok, od před jedním rokem až do dnešního dne, a datum konce je zahrnuto celé. Klikněte na **Spustit přehled**.
4. Přehled zobrazí sloupcový graf a tabulku celkového počtu návštěv za každý týden. Každý týden je označen datem nedělního dne daného týdne a sloupec **Data bohoslužeb** v tabulce uvádí skutečná data v daném týdnu, kdy byla zaznamenána docházka (například „27. 9., 30. 9.“).

Tento přehled je užitečný pro odhalování vzorců, jako jsou sezónní poklesy, růstové trendy nebo dopad zvláštních akcí.

## Docházka ve skupinách

Přehled Docházka ve skupinách ukazuje, kdo se zúčastnil jednotlivých setkání skupin v zadaném časovém období.

1. Přejděte přímo na **admin.b1.church/reports/groupAttendance** ve svém prohlížeči, nebo na stránce Docházka klikněte na **Všechny roky** a vyberte záložku **Docházka ve skupinách**.
2. Volitelně vyberte **Sbor** a **Bohoslužbu**.
3. Nastavte **Datum začátku** a **Datum konce**. Ve výchozím nastavení přehled pokrývá období od minulé neděle až do dnešního dne a datum konce je zahrnuto celé.
4. Klikněte na **Spustit přehled**.

Výsledky jsou seskupeny podle data setkání, poté podle času bohoslužby a poté podle skupiny, přičemž pod každou skupinou jsou uvedeni účastníci. Časy bohoslužeb, skupiny a jména jsou řazeny abecedně. Vedle jména každé osoby sloupec **Přihlášen** ukazuje čas, kdy byla jeho docházka zaznamenána (prázdné, pokud čas není evidován), a sloupec **Stav členství** ukazuje jeho stav, například Člen nebo Návštěvník. Zahrnuta jsou i setkání skupin, které se nekonají v žádném čase bohoslužby; zobrazují se bez času bohoslužby.

Pro stažení tabulky klikněte na **Možnosti stahování** a vyberte **Souhrn**. CSV soubor obsahuje:

- Jeden řádek pro každého člena každé skupiny, která se v daném období setkala, seřazený podle skupiny a poté podle jména.
- Jméno osoby a název skupiny v prvních sloupcích.
- Jeden sloupec pro každé datované setkání, pojmenovaný podle bohoslužby, času bohoslužby a data (například „Neděle - 9:00 (2026-09-27)“), přičemž u každé osoby je uvedeno **přítomen** nebo **nepřítomen**. Setkání bez času bohoslužby je pojmenováno pouze podle data.

Tento přehled použijte k porovnání docházky mezi skupinami a k určení, které skupiny rostou nebo potřebují pozornost.

## Denní docházka ve skupinách

Přehled Denní docházka ve skupinách (nadepsaný **Docházka skupiny podle dne**) poskytuje počet lidí, kteří se zúčastnili jedné skupiny, v jednotlivých dnech.

1. Přejděte přímo na **admin.b1.church/reports/dailyGroupAttendance** ve svém prohlížeči.
2. Pomocí rozbalovacích seznamů **Sbor**, **Bohoslužba** a **Čas bohoslužby** zúžte seznam a poté vyberte **Skupinu**, kterou chcete zkontrolovat.
3. Spusťte přehled. Zobrazí se každý den, kdy se skupina setkala, od nejstaršího po nejnovější, s **datem** a počtem **účastníků** zaznamenaných v daný den.

Tento přehled poskytuje podrobné údaje, které jsou užitečné pro pochopení rozdílů mezi jednotlivými týdny nebo pro určení konkrétních dnů s neobvykle vysokou nebo nízkou docházkou.

:::tip
Pro celkový přehled použijte přehled Trend docházky a přehled Denní docházka ve skupinách, když potřebujete podrobněji prozkoumat konkrétní data.
:::

## Praktické využití

- **Plánování** -- Použijte trendy docházky k plánování míst k sezení, obsazení a zdrojů pro nadcházející bohoslužby.
- **Oslovování** -- Včas odhalte klesající vzorce docházky, abyste mohli s členy navázat kontakt.
- **Zprávy pro výbor** -- Zahrnujte data o docházce do pravidelných zpráv pro vedení a ukažte tak zdravý stav služby.
- **Vyhodnocení akcí** -- Porovnejte docházku před a po zvláštních akcích a změřte jejich dopad.

:::warning
Data o docházce se zaznamenávají prostřednictvím procesů přihlašování do skupin a bohoslužeb. Pokud docházka není evidována důsledně, přehledy nebudou přesně odrážet skutečnou účast. Pokyny k nastavení najdete v článku [Sledování docházky](../attendance/tracking-attendance.md).
:::
