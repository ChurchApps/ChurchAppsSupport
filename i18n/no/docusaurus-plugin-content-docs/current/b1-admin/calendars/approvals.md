---
title: "Godkjenninger i kalenderen"
---

# Godkjenninger i kalenderen

<div class="article-intro">

På Godkjenninger-siden går administratorer gjennom og behandler ventende bookingforespørsler for rom og ressurser, samt kalenderarrangementer som må godkjennes før de publiseres.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Konfigurer rom eller ressurser med en **Godkjenningsgruppe** i [Rom og ressurser](rooms-resources)
- Du trenger tillatelsen **Kalenderadministrator** eller tillatelsen **content.edit**

</div>

## Åpne Godkjenninger

Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) i B1 Admin, utvid **Kalendere** og klikk på **Godkjenninger**. Ventende bookingforespørsler og arrangementer som venter på gjennomgang, vises her.

## Bookingforespørsler

Når en gruppe oppretter et arrangement og ber om et rom eller en ressurs, vises forespørselen i panelet **Forespørsler om rom og ressurser**. Hver rad viser:

- Rommet eller ressursen det bes om
- Arrangementets navn og dato/klokkeslett
- Gruppen som ber om det

### Konfliktvarsler

Hvis to forespørsler overlapper for samme rom eller ressurs, vises et advarselsikon for konflikt. Se nøye gjennom forespørslene som er i konflikt, før du godkjenner noen av dem.

### Godkjenne eller avslå

Klikk på ikonet **✓** (godkjenn) eller **✗** (avslå) på en bookingforespørsel. Gruppen som ba om bookingen, får beskjed om avgjørelsen. Godkjente bookinger låses til rommet eller ressursen for arrangementet, mens avslåtte bookinger frigir tidsrommet for andre.

Når du klikker på godkjenn, åpnes en dialogboks **Godkjenn booking**, slik at du også kan publisere arrangementet i samme steg:

1. Kryss av for **Publiser i offentlig kalender** for å gjøre arrangementet offentlig i gruppens kalender. La den stå uten avkrysning for å godkjenne bookingen uten å endre arrangementets synlighet.
2. Når **Publiser i offentlig kalender** er avkrysset, kan du eventuelt velge en kuratert kalender under **Legg også til i kalender** for å legge arrangementet til i en av dine [kurerte kalendere](curated-calendar). La den stå på **Ingen** for å hoppe over dette. (Dette alternativet vises bare hvis du har tillatelsen **content.edit**.)
3. Klikk på **Godkjenn**.

## Ventende arrangementer

Hvis kalenderrutinen din krever godkjenning før arrangementer blir synlige for offentligheten, vises ventende arrangementer i panelet **Arrangementsforespørsler**. Godkjenn et arrangement for å publisere det i kalenderen, eller avslå det for å gi innsenderen beskjed om at det må gjøres endringer.

:::tip
Sett opp en godkjenningsgruppe på et rom i [Rom og ressurser](rooms-resources) for å kreve godkjenning for det rommet. Grupper med tilgang kan da be om rommet når de oppretter arrangementer, og forespørslene havner på denne siden.
:::

## Relaterte artikler

- [Rom, ressurser og planlegging](rooms-resources) — sett opp rom og ressurser som kan bookes
- [Opprette kalendere](creating-calendars) — administrer kalendere og arrangementer
