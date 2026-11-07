---
title: "Přehledy darů"
description: "Projděte souhrny darů, odchody dárců a podrobnosti dávek v B1 Admin pomocí přehledu Souhrn darů, zobrazení Ztracení dárci a exportů CSV."
---

# Přehledy darů

<div class="article-intro">

B1 Admin nabízí několik způsobů, jak zobrazit a analyzovat údaje o darech vaší církve. Přehled darů na stránce **Souhrn** v sekci Dary poskytuje vizuální přehled s grafy a filtry, zatímco sekce Přehledy nabízí podrobnější přehled **Souhrn darů**. Tyto nástroje použijte ke sledování trendů v darování, k přípravě na jednání správní rady nebo k porovnání vašich záznamů.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ujistěte se, že dary byly [zaznamenány po dávkách](recording-donations.md) nebo [importovány ze Stripe](stripe-import.md)
- Ověřte, že jsou vaše [fondy](funds.md) nastaveny správně, aby byly dary správně zařazeny do kategorií

</div>

## Přehled darování

Přehled darování je zobrazení **Dashboard** na stránce **Souhrn**, což je první stránka, kterou uvidíte po otevření sekce **Dary**.

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře v B1 Admin), rozbalte **Dary** a klikněte na **Souhrn**. Stránka **Souhrn** se otevře v zobrazení **Dashboard**. Přepínač **View** vpravo nahoře přepíná mezi zobrazeními **Dashboard** a **Lapsed Givers**.
2. Přepínačem **Weekly**, **Monthly** a **Quarterly** nad přehledem zvolte, jak se darování seskupuje.
3. V panelu **Filter Report** nastavte **Start Date** a **End Date** (výchozí je období od před rokem do včerejška) a volitelně vyberte **Fund**. Poté klikněte na **Run Report**. Při otevření stránky se přehled spustí automaticky s výchozími hodnotami.
4. Čtyři **karty KPI** zobrazují ukazatele darování za zvolené období:
   - **Total Giving** -- Celková částka darů.
   - **Average Gift** -- Průměrná výše daru.
   - **Unique Donors** -- Počet různých osob, které darovaly.
   - **Total Donations** -- Celkový počet jednotlivých darů.
5. Pod ukazateli KPI sloupcový graf zobrazuje darování za týden, měsíc nebo čtvrtletí, rozdělené podle fondů.
6. Klikněte na **Download Options** a zvolte **Summary**, čímž exportujete CSV soubor se součty podle období a fondu, nebo klikněte na ikonu tiskárny a přehled vytisknete. Logo vaší církve (**Light Background Logo** z [Web > Vzhled](../website/appearance.md), pokud jste ho nahráli) a název se zobrazí vycentrovaně nahoře na vytištěném přehledu. Tisková verze používá tmavý text a světlý graf, i když B1 Admin používáte v tmavém režimu.

Pokud byly dary v daném období přijaty ve více než jedné měně, součty KPI se převedou na měnu vaší církve a pod kartami se zobrazí poznámka **Převedeno podle aktuálních směnných kurzů**. Podrobnosti najdete v části [Podpora více měn](./multi-currency.md#converted-totals).

:::info
Přehled zobrazuje souhrnná data o darování. Nezahrnuje jména jednotlivých dárců. Podrobnosti o konkrétních dárcích najdete na stránce [Dávky](batches.md).
:::

## Ztracení dárci

Zvolte **Lapsed Givers** v přepínači **View**, abyste zobrazili seznam osob, které darovaly v jednom období, ale od té doby nedarovaly. Ve výchozím nastavení porovnává poslední kalendářní rok s aktuálním rokem do dneška. Změnou některého z rozsahů dat můžete vyhledávání rozšířit nebo zúžit. Každý řádek zobrazuje osobu, datum jejího posledního daru a její celkovou částku za dřívější období. Tlačítko **Download Options > Summary** stáhne seznam jako CSV soubor, který můžete použít pro následnou korespondenci nebo seznam k telefonickému kontaktu.

## Podrobnosti o dárcích

Chcete-li zjistit, kdo kolik daroval a do kterého fondu:

1. Přejděte na **Dary > Dávky**.
2. Kliknutím na **název dávky** ji otevřete.
3. Stránka s detaily dávky vypisuje každý dar s jeho způsobem platby (a číslem šeku nebo čísly karty), jménem dárce, datem, poznámkami a částkou, dole pak celkový součet.
4. Kliknutím na **Edit** u řádku daru otevřete úplné údaje o tomto jednotlivém daru, včetně jeho fondu.
5. Kliknutím na **Export** nad seznamem stáhněte CSV soubor se všemi údaji o dárcích a darech pro danou dávku.

## Souhrnný přehled darů

Přehledy darů jsou přímo součástí sekce Dary. Stránka Souhrn slouží jako váš souhrnný přehled darů:

1. V nabídce Jump zvolte **Dary > Souhrn**.
2. V zobrazení **Dashboard** nastavte **Start Date** a **End Date** v panelu **Filter Report** a klikněte na **Run Report**.
3. Klikněte na **Download Options** a zvolte **Summary**, čímž přehled exportujete jako CSV soubor.

## Export dat

Údaje o darech můžete exportovat z několika míst:

- **Stránka Souhrn** -- stáhněte CSV soubor se součty darů podle týdne, měsíce nebo čtvrtletí a fondu
- **Stránka detailů dávky** -- stáhněte CSV soubor jednotlivých darů s údaji o dárcích
- **Stránka detailů fondu** -- stáhněte historii darů pro konkrétní fond

:::tip
Pro roční vyúčtování zkombinujte export ze stránky Souhrn s nástrojem [Potvrzení o darech](giving-statements.md), abyste získali jak souhrnné trendy, tak výpisy pro jednotlivé dárce.
:::

## Další kroky

- Vygenerujte [Potvrzení o darech](giving-statements.md) pro své dárce na konci roku
- Zkontrolujte jednotlivé [dávky](batches.md) a ověřte údaje o darech
- Prohlédněte si detailní stránky [fondů](funds.md) a zjistěte rozdělení darů podle kategorií
