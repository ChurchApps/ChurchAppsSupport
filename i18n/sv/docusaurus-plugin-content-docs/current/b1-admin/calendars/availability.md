---
title: "Tillgänglighetskalender"
---

# Tillgänglighetskalender

<div class="article-intro">

Tillgänglighetskalendern ger dig en överblick över alla bokningar av rum och resurser i din kyrka. Här kan du se vad som är schemalagt, upptäcka konflikter i förväg och boka ett rum eller en resurs direkt för vilken händelse som helst.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Skapa minst ett [rum eller en resurs](rooms-resources) i avsnittet Rum och resurser
- Du behöver redigeringsbehörighet för avsnittet Kalendrar i B1 Admin

</div>

## Öppna tillgänglighetskalendern

I B1 Admin öppnar du [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet högst upp till vänster), expanderar **Kalendrar** och klickar på **Tillgänglighet**.

## Läsa kalendern

Kalendern visar som standard innevarande månad. Du kan bläddra framåt och bakåt med pilarna högst upp, eller byta mellan månads-, vecko- och dagsvy.

Varje händelse är färgkodad efter bokningsstatus:

| Färg | Betydelse |
|-------|---------|
| Grön | Godkänd |
| Orange | Väntar på godkännande |
| Grå | Blockerad (inte tillgänglig) |

Om du håller muspekaren över en händelse visas händelsens titel och det rum eller den resurs den är kopplad till.

## Filtrera efter rum eller resurs

Använd rullgardinsmenyn **Rum / Resurs** längst upp till vänster för att begränsa kalendern till ett enskilt rum eller en resurs. Välj **Alla rum och resurser** för att återgå till den fullständiga vyn.

## Boka ett rum eller en resurs

1. Klicka på knappen **Boka** högst upp på sidan.
2. I dialogrutan som öppnas fyller du i uppgifterna om händelsen:
   - **Titel** — händelsens namn
   - **Start** och **Slut** datum/tid
   - **Synlighet** — Offentlig eller Privat
   - **Rum** — välj ett eller flera rum att reservera
   - **Resurser** — välj en eller flera resurser att reservera
3. Du kan valfritt ange tider för **Uppsättning** och **Nedtagning** (i minuter). Dessa lägger till tid före och efter bokningen så att utrymmet är reserverat för uppsättning och städning, även om händelsens start- och sluttider är oförändrade.
4. Om du vill upprepa bokningen markerar du **Upprepas** och konfigurerar upprepningen:
   - **Upprepa var** -- ange intervallet (till exempel var 2:e vecka).
   - **Frekvens** -- Dagligen, Veckovis eller Månadsvis. Veckovis låter dig välja specifik(a) veckodag(ar); Månadsvis låter dig välja en fast dag i månaden eller ett relativt mönster, som "den andra tisdagen".
   - **Slutar** -- Aldrig, på ett specifikt datum eller efter ett angivet antal tillfällen.
5. Om du vill ange ett eget bokningsfönster (som skiljer sig från händelsens start och slut) aktiverar du **Anpassat bokningsfönster** och anger fönstrets start- och sluttider. Använd detta när ett rum behöver vara tillgängligt utanför händelsens angivna tider.
6. Klicka på **Spara** för att skicka bokningen.

:::info
Om rummet eller resursen har en **Godkännandegrupp** konfigurerad visas bokningen som **Väntar** tills en ledare i den gruppen godkänner den. Se [Kalendergodkännanden](approvals) för godkännandeprocessen.
:::

:::tip
Kalendern markerar eventuella konflikter innan du sparar. Om du ser en konfliktvarning justerar du tiderna eller väljer ett annat rum.
:::

## Relaterade artiklar

- [Rum, resurser och schemaläggning](rooms-resources) — skapa bokningsbara utrymmen och utrustning
- [Kalendergodkännanden](approvals) — godkänn eller neka bokningsförfrågningar
- [Skapa kalendrar](creating-calendars) — hantera händelsekalendrar
