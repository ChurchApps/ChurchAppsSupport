---
title: "Donationsrapporter"
---

# Donationsrapporter

<div class="article-intro">

B1 Admin giver dig flere måder at se og analysere dine kirkes giverdata. Siden Donationsopsummering giver et visuelt overblik med diagrammer og filtre, mens rapportsektionen tilbyder en mere detaljeret donationsopsummeringsrapport. Brug disse værktøjer til at spore giverindsigter, forberede møder eller afstemme dine records.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Sørg for, at donationer er [registreret i batcher](recording-donations.md) eller [importeret fra Stripe](stripe-import.md)
- Bekræft, at dine [fonde](funds.md) er korrekt sat op, så donationer er korrekt kategoriseret

</div>

## Giver-dashboard

**Giver-dashboard** er det første, du ser, når du klikker **Donationer** i sidebjælken. Det giver et højt perspektiv på din giveraktivitet med vigtige præstationsindikatorer.

1. Gå til **Donationer** i sidebjælken for at åbne dashboardet.
2. Øverst viser fire **KPI-kort** dine givemetriks på et øjeblik:
   - **Samlet giving** -- Det samlede beløb givet i den valgte periode.
   - **Gennemsnitlig gave** -- Det gennemsnitlige donationsbeløb.
   - **Unikke givere** -- Antallet af forskellige mennesker, som gav.
   - **Samlede donationer** -- Det samlede antal individuelle donationer.
3. Brug **periode toggle** for at skifte mellem **Ugentlig**, **Månedlig**, og **Kvartalsvis** visninger.
4. Under KPI'erne viser et diagram givertrends for den valgte periode.
5. Klik **Download** for at eksportere en CSV-fil med givetotaler.

## Siden Donationsopsummering

Siden **Opsummering** giver mere detaljerede samlede giverdata.

1. Gå til **Donationer** i sidebjælken for at åbne siden Opsummering.
2. Brug **datointervalpilteret** til at vælge den tidsperiode, du vil gennemgå. Indstil den tidligere dato øverst og den nyere dato nedenfor.
3. Siden viser et ugentligt giverdiagram, så du kan se trends på et øjeblik.
4. Klik **Download** for at eksportere en CSV-fil med det samlede givet beløb, ugen det blev givet, og den fond det blev givet til.

:::info
Siden Opsummering viser samlede giverdata. Det inkluderer ikke individuelle donornavne. For donorniveaudetaljer skal du bruge siden [Batcher](batches.md).
:::

## Visning af donorniveaudetaljer

For en nedbrydning af hvem der gav, hvor meget og til hvilken fond:

1. Gå til **Donationer > Batcher**.
2. Klik på et **batchnavn** for at åbne det.
3. Siden med batchdetaljer viser hver donation med donorens navn, beløb, fond, dato og betalingsmetode.
4. Klik på en **donors navn** for at se en nedbrydning af, hvor mange gange de gav og hvor meget hver gang.
5. Klik på en **donations-id** for at åbne et sidepanel med de fulde detaljer for den individuelle donation.
6. Klik **Download** for at eksportere en CSV med alle donor- og donationsoplysninger for den batch.

## Donationsopsummeringsrapport

B1 Admin inkluderer også en **Donationsopsummering**-rapport i rapportsektionen:

1. Klik **Rapporter** i sidebjælken.
2. Vælg **Donationsopsummering**-raportern.
3. Vælg dine filtre (datointervallet, fond, campus osv.) og kør rapporten.

## Eksportering af data

Du kan eksportere donationsdata fra flere steder:

- **Siden Opsummering** -- download en CSV med ugentlige givetotaler efter fond
- **Siden Batchdetaljer** -- download en CSV med individuelle donationer med donordetaljer
- **Siden Fondsdetaljer** -- download donationshistorikk for en bestemt fond

:::tip
Til slutårsrapportering skal du kombinere eksportens Opsummering med værktøjet [Giverbekendtelser](giving-statements.md) for at få både samlede tendenser og individuelle donorbekendtelser.
:::

## Næste trin

- Generer [Giverbekendtelser](giving-statements.md) for dine donorer ved slutåret
- Gennemse individuelle [batcher](batches.md) for at bekræfte donationsdetaljer
- Kontroller siden [fond](funds.md) detaljer for giverbrokering efter kategori
