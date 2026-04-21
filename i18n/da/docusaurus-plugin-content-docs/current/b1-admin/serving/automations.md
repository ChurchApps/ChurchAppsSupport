---
title: "automatiseringer"
---

# automatiseringer

<div class="article-intro">

automatiseringer opbygger opgaver automatisk på en tilbagevendende skema. I stedet for manuelt at opbygge de samme opgaver hver uge eller måned, kan du opsætte en automatisering engang og lade systemet håndtere det for dig, sikrer at intet falder gennem sprækker.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Bliv bekendt med hvordan [opgaver](./tasks.md) virker i B1 Admin
- Identificer hvilke tilbagevendende ansvar du ønsker at automatisere

</div>

## se automatiseringer

Gå til **tjeneste** og åbn **automatiseringer** siden. Du vil se en liste over alle dine automatiseringer, hver viser dens titel, aktiv status og tilbagekaldsmønster.

## opbygning af en automatisering

1. På automatiseringer siden, klik **Tilføj automatisering**.
2. Anføre en **titel** til automatiseringen. Dette vil også blive brugt som titlen på de opgaver det opbygger.
3. Indstil **tilbagekaldsmønster** -- vælg hvor ofte opgaven skal opbygges (for eksempel, ugentlig, månedlig eller på specifikke dage).
4. Tildel opgaven til en **person eller gruppe** som vil være ansvarlig hver gang den kører.
5. Indstil automatiseringen til **aktiv** så den begynder at opbygge opgaver efter skema.
6. Klik **gem**.

## rediger en automatisering

1. Klik på en eksisterende automatisering i listen for at åbne den.
2. opdater titel, tilbagekaldsmønster, tilsætning eller ethvert andet indstillinger.
3. Klik **gem** for at anvende dine ændringer.

## aktivering og deaktivering

Du kan styre om en automatisering kører uden at slette den:

- **aktiv** -- automatiseringen opbygger opgaver efter dens skema.
- **inaktiv** -- automatiseringen er pauseret og opbygger ikke nogen nye opgaver indtil du genaktiverer den.

:::tip
Indstil en automatisering til **inaktiv** under ferieperioder eller specielle sæsoner når den tilbagevendende opgave ikke er påkrævet. Du kan genaktivere den til enhver tid uden at miste din konfiguration.
:::

## hvordan det virker

Når en automatisering kører, opbygger den en ny [opgave](./tasks.md) med den konfigurerede titel og tilsætning. Opgaven opfører sig lige som enhver anden opgave -- tilsætninger modtager underretninger og kan administrere opgaven fra deres dashboard eller opgaver siden.

:::info
automatiseringer opbygger kun nye opgaver gå fremad. De opbygger ikke retroaktivt opgaver til tidligere datoer.
:::

## Næste trin

- Lær mere om administrering af individuelle [opgaver](./tasks.md) som automatiseringer opbygger
- Brug automatiseringer sammen med [tjenesteplaner](./plans.md) for at holde din ugentlige service forberedelse på sporet
