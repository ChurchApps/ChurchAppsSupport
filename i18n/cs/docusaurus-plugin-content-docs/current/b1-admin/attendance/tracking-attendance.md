---
title: "Sledování docházky"
---

# Sledování docházky

<div class="article-intro">

Jakmile nastavíte sbory, časy bohoslužeb a skupiny, B1 Admin vám usnadní přehled o datech docházky a odhalování trendů. Stránka Docházka se otevírá souhrnem docházky za aktuální týden a reporty **Všechna léta** nabízejí dva hlavní pohledy: záložku **Trend docházky** pro celocírkevní trendy a záložku **Docházka skupin** pro podrobnosti na úrovni skupin. Tyto nástroje vám pomohou pochopit vzorce růstu, odhalit klesající zapojení a činit rozhodnutí podložená daty pro váš sbor.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Struktura docházky musí obsahovat alespoň jeden sbor a jeden čas bohoslužby. Pokud jste to ještě neudělali, podívejte se na [Nastavení docházky](setup.md).
- Data docházky je třeba zaznamenat dříve, než reporty zobrazí výsledky. Data mohou pocházet z [ručního zadávání](recording-attendance.md) nebo [samoobslužného check-inu](check-in.md).

</div>

## Zobrazení trendů docházky

1. Otevřete **B1 Admin**, otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Lidé** a klikněte na **Docházka**.
2. V levém sloupci klikněte na **Všechna léta**. Záložka **Trend docházky** je ve výchozím stavu vybrána.
3. Report se po otevření záložky spustí automaticky a zobrazí celkovou docházku za každý týden.

:::tip
Pro rychlý pohled na aktuální týden hlavní stránka Docházka ukazuje, kolik lidí je tento týden v místnosti, rozdělení podle místností (skupin), počet hostů a 13týdenní sloupcový graf check-inů. Nic dalšího není potřeba.
:::

## Filtrování dat

Pomocí filtrů v poli **Filtr reportu** zúžte výsledky a poté klikněte na **Spustit report**:

- **Sbor** – vyberte sbor a zobrazte docházku pouze pro toto místo.
- **Bohoslužba** – omezte report na jednu bohoslužbu.
- **Čas bohoslužby** – vyberte čas bohoslužby a zaměřte se na konkrétní shromáždění.
- **Skupina** – zobrazte docházku jedné skupiny.
- **Datum od** a **Datum do** – časové období, které má být zahrnuto. Ve výchozím nastavení report pokrývá poslední rok, od jednoho roku zpět až do dneška, a koncové datum je zahrnuto celé.

Report zobrazuje sloupcový graf a tabulku celkových návštěv za každý týden. Každý týden je označen datem nedělního dne. Tabulka má také sloupec **Data setkání**, který uvádí konkrétní dny v daném týdnu, kdy byla zaznamenána docházka (například „9/27, 9/30“). Díky tomu vidíte, kdy se středeční setkání započítá do stejného týdne jako neděle.

:::info
Reporty se automaticky spouštějí při každém otevření záložky Trend docházky, takže vždy uvidíte aktuální čísla, aniž byste museli klikat na tlačítko pro obnovení.
:::

## Docházka skupin

Záložka **Docházka skupin** ukazuje, kdo se zúčastnil jednotlivých setkání skupin. Je to užitečné, pokud chcete sledovat konkrétní třídu, služební tým nebo malou skupinu, a ne celková čísla z bohoslužeb.

1. V reportech **Všechna léta** vyberte záložku **Docházka skupin**.
2. Volitelně vyberte **Sbor** a **Bohoslužbu**.
3. Nastavte **Datum od** a **Datum do**. Ve výchozím nastavení report pokrývá období od poslední neděle do dneška.
4. Klikněte na **Spustit report**.

Výsledky jsou seskupeny podle data setkání, poté podle času bohoslužby a skupiny, přičemž lidé, kteří se zúčastnili, jsou uvedeni pod každou skupinou. Časy bohoslužeb, skupiny i jména jsou řazeny abecedně, takže se každý nadpis zobrazí pouze jednou. Řádek každé osoby také zobrazuje sloupec **Check-in** s časem, kdy byla docházka zaznamenána (je prázdný, pokud čas není uložen), a sloupec **Stav členství** (například Člen nebo Návštěvník), takže hosty poznáte na první pohled.

Chcete-li data stáhnout, klikněte na **Možnosti stažení** a vyberte **Souhrn**. CSV soubor obsahuje jeden řádek na každého člena skupiny, seřazený podle skupiny a poté podle jména, a sloupec pro každé datované setkání v daném období (například „Sunday - 9:00 AM (2026-09-27)“), označený hodnotou **present** (přítomen) nebo **absent** (nepřítomen).

:::tip
Docházka skupin je zvlášť cenná pro vedoucí [malých skupin](../groups/creating-groups.md), kteří chtějí sledovat zapojení ve své skupině v průběhu času.
:::

## Tipy pro práci s daty docházky

- Trendy kontrolujte měsíčně, abyste včas zachytili sezónní vzorce.
- Porovnávejte data na úrovni sborů a zjistěte, které lokality rostou.
- Pomocí reportů na úrovni skupin sledujte [skupiny](../groups/group-members.md), u kterých docházka klesá.
- Kombinujte přehledy docházky s nástrojem [AI vyhledávání](../people/ai-search.md) a najděte lidi, kteří se v poslední době nezúčastnili.

## Související stránky

- [Zaznamenávání docházky](recording-attendance.md) – ruční zadání docházky na setkání skupiny
- [Zadávání počtu účastníků a trend](headcount-entry.md) – jednodušší alternativa s celkovým počtem a vlastním týdenním grafem trendu
- [Check-in](check-in.md) – nastavení samoobslužného check-inu, aby se docházka zaznamenávala automaticky
