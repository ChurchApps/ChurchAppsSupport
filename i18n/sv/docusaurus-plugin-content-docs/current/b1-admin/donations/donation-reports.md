---
title: "Donationsrapporter"
---

# Donationsrapporter

<div class="article-intro">

B1 Admin ger dig flera sätt att visa och analysera din kyrkas givardata. Givardashboarden på sidan **Sammanfattning** under Donationer ger en visuell översikt med diagram och filter, medan avsnittet Rapporter erbjuder en mer detaljerad sammanfattningsrapport för donationer. Använd dessa verktyg för att följa givartrender, förbereda inför styrelsemöten eller stämma av dina register.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Kontrollera att donationer har [registrerats i batcher](recording-donations.md) eller [importerats från Stripe](stripe-import.md)
- Kontrollera att dina [fonder](funds.md) är korrekt inställda så att donationerna kategoriseras rätt

</div>

## Givardashboard

Givardashboarden är vyn **Dashboard** på sidan **Sammanfattning**, den första sida du ser när du öppnar avsnittet **Donationer**.

1. Öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster i B1 Admin), expandera **Donationer** och klicka på **Sammanfattning**. Sidan **Sammanfattning** öppnas i vyn **Dashboard**. Växlaren **View** upp till höger växlar mellan **Dashboard** och **Lapsed Givers**.
2. Använd växlarna **Weekly**, **Monthly** och **Quarterly** ovanför rapporten för att välja hur givandet grupperas.
3. I panelen **Filter Report** anger du **Start Date** och **End Date** (som standard det senaste året fram till igår) och väljer eventuellt en **Fund**, och klickar sedan på **Run Report**. Rapporten körs automatiskt med standardinställningarna när sidan öppnas.
4. Fyra **KPI-kort** visar dina givarmått för det valda intervallet:
   - **Total Giving** -- Det totala belopp som donerats.
   - **Average Gift** -- Det genomsnittliga donationsbeloppet.
   - **Unique Donors** -- Antalet olika personer som gav.
   - **Total Donations** -- Det totala antalet enskilda donationer.
5. Under KPI-korten visar ett stapeldiagram givandet per vecka, månad eller kvartal, uppdelat per fond.
6. Klicka på **Download Options** och välj **Summary** för att exportera en CSV-fil med summorna per period och fond, eller klicka på skrivarikonen för att skriva ut rapporten. Din kyrkas logotyp (**Light Background Logo** från [Webbplats > Utseende](../website/appearance.md), om du har laddat upp en) och namn visas centrerat överst på den utskrivna rapporten. Utskriften använder mörk text och ett ljust diagram även om du använder B1 Admin i mörkt läge.

Om donationerna under perioden gavs i mer än en valuta omvandlas KPI-summorna till din kyrkvaluta, och en notering **Converted at current exchange rates** visas under korten. Se [Stöd för flera valutor](./multi-currency.md#converted-totals) för mer information.

:::info
Dashboarden visar sammanlagda givardata. Den innehåller inte enskilda givares namn. För uppgifter om enskilda givare använder du sidan [Batcher](batches.md).
:::

## Lapsed Givers

Välj **Lapsed Givers** i växlaren **View** för att lista personer som gav under en period men inte sedan dess. Som standard jämförs förra kalenderåret med innevarande år hittills; ändra något av datumintervallen för att bredda eller smalna av sökningen. Varje rad visar personen, datumet för deras senaste gåva och deras totalsumma för den tidigare perioden. **Download Options > Summary** laddar ner listan som en CSV-fil för uppföljande utskick eller ett samtalsunderlag.

## Visa uppgifter per givare

För en översikt över vem som gav, hur mycket och till vilken fond:

1. Gå till **Donationer > Batcher**.
2. Klicka på ett **batchnamn** för att öppna den.
3. Batchens detaljsida listar varje donation med dess metod (och checknummer eller kortets sista siffror), givarens namn, datum, anteckningar och belopp, med en summa längst ned.
4. Klicka på **Edit** på en donationsrad för att öppna fullständiga uppgifter om den enskilda donationen, inklusive fonden.
5. Klicka på **Export** ovanför listan för att ladda ner en CSV-fil med alla uppgifter om givare och donationer för den batchen.

## Sammanfattningsrapport för donationer

Donationsrapportering är inbyggd direkt i avsnittet Donationer. Sidan Sammanfattning fungerar som din sammanfattningsrapport för donationer:

1. Välj **Donationer > Sammanfattning** i Hoppmenyn.
2. I vyn **Dashboard** anger du **Start Date** och **End Date** i panelen **Filter Report** och klickar på **Run Report**.
3. Klicka på **Download Options** och välj **Summary** för att exportera rapporten som en CSV-fil.

## Exportera data

Du kan exportera donationsdata från flera ställen:

- **Sidan Sammanfattning** -- ladda ner en CSV-fil med givarsummor per vecka, månad eller kvartal och fond
- **Batchens detaljsida** -- ladda ner en CSV-fil med enskilda donationer och givaruppgifter
- **Fondens detaljsida** -- ladda ner donationshistoriken för en specifik fond

:::tip
För rapportering inför årsskiftet kan du kombinera exporten från sidan Sammanfattning med verktyget [Gåvobesked](giving-statements.md) för att få både sammanlagda trender och enskilda givarbesked.
:::

## Nästa steg

- Skapa [Gåvobesked](giving-statements.md) till dina givare vid årsskiftet
- Granska enskilda [batcher](batches.md) för att kontrollera donationsuppgifterna
- Kontrollera detaljsidorna för [fonder](funds.md) för givarfördelning per kategori
