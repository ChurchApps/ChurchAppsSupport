---
title: "Donation Reports"
description: "Prehliadajte súhrny darov, stratu darcov a údaje na úrovni dávok v B1 Admin pomocou prehľadu Donations Summary, zobrazenia Lapsed Givers a exportov CSV."
---

# Donation Reports

<div class="article-intro">

B1 Admin vám poskytuje niekoľko spôsobov, ako si pozrieť a analyzovať údaje o darovaniach vašej cirkvi. Panel darovaní na stránke **Súhrn** v sekcii Donations ponúka vizuálny prehľad s grafmi a filtrami, zatiaľ čo sekcia Reports obsahuje podrobnejšiu správu Donation Summary. Tieto nástroje použite na sledovanie trendov darovania, prípravu na zasadnutia predstavenstva alebo na zosúladenie vašich záznamov.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Uistite sa, že darovania boli [zaznamenané v dávkach](recording-donations.md) alebo [importované zo Stripe](stripe-import.md)
- Overte, či sú vaše [fondy](funds.md) správne nastavené, aby boli darovania správne kategorizované

</div>

## Panel darovaní

Panel darovaní je zobrazenie **Dashboard** na stránke **Súhrn**, ktorá je prvou stránkou, ktorú uvidíte po otvorení sekcie **Donations**.

1. Otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu B1 Admin), rozbaľte **Donations** a kliknite na **Summary**. Stránka **Summary** sa otvorí v zobrazení **Dashboard**. Prepínač **View** v pravom hornom rohu prepína medzi **Dashboard** a **Lapsed Givers**.
2. Pomocou prepínača **Weekly**, **Monthly** a **Quarterly** nad správou zvoľte, ako sa darovanie zoskupuje.
3. V paneli **Filter Report** nastavte **Start Date** a **End Date** (predvolene od pred rokom až do včerajška) a voliteľne vyberte **Fund**, potom kliknite na **Run Report**. Správa sa pri otvorení stránky spustí automaticky s predvolenými hodnotami.
4. Štyri **karty KPI** zobrazujú metriky darovania pre zvolený rozsah:
   - **Total Giving** -- Celková suma darovaná.
   - **Average Gift** -- Priemerná suma daru.
   - **Unique Donors** -- Počet rôznych osôb, ktoré darovali.
   - **Total Donations** -- Celkový počet jednotlivých darov.
5. Pod kartami KPI stĺpcový graf zobrazuje darovanie za týždeň, mesiac alebo štvrťrok, rozdelené podľa fondu.
6. Kliknite na **Download Options** a vyberte **Summary**, ak chcete exportovať CSV súbor so súčtami podľa obdobia a fondu, alebo kliknite na ikonu tlače a vytlačte správu. Logo vašej cirkvi (**Light Background Logo** z [Website > Appearance](../website/appearance.md), ak ste ho nahrali) a názov sa zobrazia na stred v hornej časti vytlačenej správy. Výtlačok používa tmavý text a svetlý graf, aj keď B1 Admin používate v tmavom režime.

Ak boli darovania v danom období poskytnuté vo viacerých menách, súčty KPI sa prepočítajú na menu vašej cirkvi a pod kartami sa zobrazí poznámka **Converted at current exchange rates**. Podrobnosti nájdete v časti [Multi-Currency Support](./multi-currency.md#converted-totals).

:::info
Panel zobrazuje súhrnné údaje o darovaniach. Nezahŕňa mená jednotlivých darcov. Podrobnosti o konkrétnych darcoch nájdete na stránke [Batches](batches.md).
:::

## Darcovia, ktorí prestali darovať

Vyberte **Lapsed Givers** v prepínači **View** a zobrazí sa zoznam osôb, ktoré darovali v jednom období, ale od tej doby už nie. Predvolene sa porovnáva minulý kalendárny rok s aktuálnym rokom až do dnešného dňa; zmenou ktoréhokoľvek dátumového rozsahu môžete vyhľadávanie rozšíriť alebo zúžiť. Každý riadok zobrazuje osobu, dátum jej posledného daru a jej celkovú sumu za predchádzajúce obdobie. Kliknutím na **Download Options > Summary** stiahnete zoznam ako CSV súbor pre následnú poštovú zásielku alebo zoznam na telefonáty.

## Zobrazenie podrobností o darcoch

Ak chcete prehľad o tom, kto daroval, koľko a do ktorého fondu:

1. Prejdite na **Donations > Batches**.
2. Kliknite na **názov dávky**, aby sa otvorila.
3. Stránka s podrobnosťami o dávke zobrazuje každé darovanie s jeho spôsobom (a číslom šeku alebo číslicami karty), menom darcu, dátumom, poznámkami a sumou, s celkovou sumou na konci.
4. Kliknutím na **Edit** v riadku darovania otvoríte úplné podrobnosti o tomto jednotlivom darovaní vrátane jeho fondu.
5. Kliknutím na **Export** nad zoznamom stiahnete CSV súbor so všetkými údajmi o darcoch a darovaniach pre túto dávku.

## Súhrnná správa o darovaniach

Správy o darovaniach sú priamo zabudované do sekcie Donations -- stránka Summary slúži ako vaša súhrnná správa o darovaniach:

1. V ponuke Jump vyberte **Donations > Summary**.
2. V zobrazení **Dashboard** nastavte **Start Date** a **End Date** v paneli **Filter Report** a kliknite na **Run Report**.
3. Kliknite na **Download Options** a vyberte **Summary**, ak chcete správu exportovať ako CSV súbor.

## Export údajov

Údaje o darovaniach môžete exportovať z viacerých miest:

- **Stránka Summary** -- stiahnite CSV súbor so súčtami darovaní za týždeň, mesiac alebo štvrťrok a podľa fondu
- **Stránka s podrobnosťami o dávke** -- stiahnite CSV súbor s jednotlivými darovaniami vrátane údajov o darcoch
- **Stránka s podrobnosťami o fonde** -- stiahnite históriu darovaní pre konkrétny fond

:::tip
Na účely ročného vykazovania skombinujte export zo stránky Summary s nástrojom [Giving Statements](giving-statements.md), aby ste získali súhrnné trendy aj výpisy pre jednotlivých darcov.
:::

## Ďalšie kroky

- Na konci roka vygenerujte [Giving Statements](giving-statements.md) pre svojich darcov
- Prezrite si jednotlivé [dávky](batches.md) a overte podrobnosti o darovaniach
- Skontrolujte stránky s podrobnosťami o [fondoch](funds.md) a prehľad darovaní podľa kategórií
