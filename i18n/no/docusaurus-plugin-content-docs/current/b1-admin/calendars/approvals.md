---
title: "Kalendergodkjenninger"
description: "Gå gjennom ventende forespørsler om booking av rom og ressurser i B1 Admin, sjekk for konflikter, godkjenn eller avslå dem, og se tilbake på tidligere beslutninger under Historikk."
---

# Kalendergodkjenninger

<div class="article-intro">

Siden for godkjenninger er stedet der administratorer går gjennom og håndterer ventende forespørsler om booking av rom og ressurser, samt kalenderarrangementer som må godkjennes før de publiseres.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Konfigurer rom eller ressurser med en **godkjenningsgruppe** under [Rom og ressurser](./rooms-resources.md)
- Du trenger tillatelsen **Kalenderadministrator** eller tillatelsen **content.edit**

</div>

## Åpne godkjenninger

I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Kalendere** og klikker **Godkjenninger**. Ventende bookingforespørsler og arrangementer som venter på gjennomgang, vises her. Bruk knappene **Ventende** og **Historikk** øverst for å bytte mellom forespørsler som fortsatt må avgjøres, og forespørsler som allerede er besluttet.

## Bookingforespørsler

Når en gruppe oppretter et arrangement og ber om et rom eller en ressurs, vises forespørselen i seksjonen **Rom- og ressursforespørsler**. Hver rad viser:

- Navnet på arrangementet og dato/klokkeslett
- Rommet eller ressursen som er forespurt (med antall for ressurser med flere enheter)
- **Forespurt av**, personen som ba om det, med lenke til vedkommendes post
- Et statusmerke som viser om forespørselen har konflikter

### Konfliktindikatorer

Hvis en forespørsel overlapper en annen booking eller blokkering for samme rom eller ressurs, viser statusen et merke for **Konflikter**. Hold musepekeren over det for å se detaljene. Forespørsler uten overlapp viser **Ingen konflikter**. Gå nøye gjennom konfliktende forespørsler før du godkjenner noen av dem.

### Godkjenne eller avslå

Klikk **Godkjenn** eller **Avslå** på en bookingforespørsel (ved avslag må du bekrefte først). Den som ba om forespørselen, får beskjed om avgjørelsen. Godkjente bookinger låses til det rommet eller den ressursen for arrangementet; avslåtte bookinger frigjør tidsrommet for andre.

Når du klikker **Godkjenn**, åpnes en dialog for **Godkjenn booking**, slik at du også kan publisere arrangementet i samme steg:

1. Kryss av for **Publiser i offentlig kalender** for å gjøre arrangementet offentlig i gruppens kalender. La den være umerket hvis du vil godkjenne bookingen uten å endre synligheten til arrangementet.
2. Når **Publiser i offentlig kalender** er avkrysset, kan du eventuelt velge en kuratert kalender under **Legg også til i kalender** for å legge arrangementet til i en av dine [kuraterte kalendere](./curated-calendar.md). La den stå på **Ingen** for å hoppe over dette. (Dette alternativet vises bare hvis du har tillatelsen **content.edit**.)
3. Klikk **Godkjenn**.

## Ventende arrangementer

Hvis kalenderarbeidsflyten din krever godkjenning av arrangementer før de blir synlige for publikum, vises ventende arrangementer i seksjonen **Arrangementsforespørsler**. Klikk **Godkjenn** for å publisere et arrangement i kalenderen, eller **Avslå** for å si fra til den som sendte inn at endringer må gjøres.

:::tip
Opprett en godkjenningsgruppe på et rom under [Rom og ressurser](./rooms-resources.md) for å kreve godkjenning for det rommet. Grupper med tilgang kan da be om rommet når de oppretter arrangementer, og disse forespørslene havner på denne siden.
:::

## Historikk

Godkjente og avslåtte forespørsler blir liggende på siden. Klikk **Historikk** øverst på Godkjenninger for å se dem; klikk **Ventende** for å gå tilbake til de åpne forespørslene.

- **Rom- og ressursforespørsler** viser hver avgjort booking med arrangementet, rommet eller ressursen, **Forespurt av**, et merke for **Godkjent** eller **Avslått**, og **Avgjort**, som viser hvem som tok avgjørelsen og når. De nyligst avgjorte forespørslene vises først.
- **Arrangementsforespørsler** viser hvert avgjort arrangement med beskrivelse, **Forespurt av** og et merke for **Godkjent** eller **Avslått**. Hvem som avgjorde en arrangementsforespørsel, og når, blir ikke registrert, så den kolonnen vises ikke for arrangementer.

Klikk på et navn under **Forespurt av** for å åpne vedkommendes post.

## Relaterte artikler

- [Rom, ressurser og planlegging](./rooms-resources.md) — sett opp rom og ressurser som kan bookes
- [Opprette kalendere](./creating-calendars.md) — administrer kalendere og arrangementer
