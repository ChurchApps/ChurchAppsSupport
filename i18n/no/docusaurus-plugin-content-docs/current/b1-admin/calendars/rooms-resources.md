---
title: "Rom, ressurser og planlegging"
description: "Sett opp rom, utstyr, sperringer og hendelsesmaler i B1 Admin slik at grupper kan be om booking, og du kan godkjenne dem for å unngå dobbeltbooking."
---

# Rom, ressurser og planlegging

<div class="article-intro">

Rom og ressurser lar deg følge med på menighetens lokaler og utstyr som kan bookes. Når en gruppe eller et team vil bruke et rom eller låne en ressurs til en hendelse, kan de be om det via B1 – og du kan godkjenne eller avslå forespørslene for å unngå dobbeltbooking.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelsen **Edit Content**
- Sett opp [grupper](../groups/creating-groups.md) hvis medlemmer skal sende inn bookingforespørsler

</div>

## Åpne Rooms & Resources {#opening-rooms--resources}

I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Calendars** og klikker **Rooms & Resources**. Siden har fire faner: **Rooms**, **Resources**, **Blockouts** og **Templates**. Legg-til-knappen øverst på siden endrer seg etter valgt fane, og boksen **Find** lar deg filtrere den gjeldende listen.

## Rom {#rooms}

Rom er fysiske lokaler som kan reserveres sammen med kalenderhendelser – et kirkerom, en fellesal, et klasserom osv.

### Legge til et rom {#adding-a-room}

1. På fanen **Rooms** klikker du **Add Room** øverst på siden.
2. Skriv inn et **Room Name**.
3. Angi eventuelt en **Capacity** (maksimalt antall personer) og en **Description**. Begge vises ved siden av rommet når folk velger rom til en hendelse.
4. Angi en **Approval Group** hvis bookinger må godkjennes. Bookinger som gjøres av medlemmer av den gruppen, godkjennes automatisk. Andres bookinger venter som **Pending** til de godkjennes på siden [Approvals](./approvals.md), og gruppens medlemmer får en e-post om nye forespørsler. La feltet stå på **No approval needed** for å godkjenne alle bookinger automatisk.
5. Klikk **Save**.

Listen over rom viser hvert rom med **Room Name**, **Capacity** og **Approval Group**.

### Redigere eller slette et rom {#editing-or-deleting-a-room}

Hold musepekeren over et rom og klikk **Edit**, gjør endringene dine og klikk **Save**. Bruk **Delete** for å fjerne et rom permanent.

## Ressurser {#resources}

Ressurser er gjenstander som kan bookes sammen med en hendelse – AV-utstyr, prosjektorer, stoler, en minibuss osv.

### Legge til en ressurs {#adding-a-resource}

1. Klikk på fanen **Resources**, og deretter **Add Resource**.
2. Skriv inn et **Resource Name** og eventuelt en **Description**.
3. Angi **Quantity** du eier (for eksempel 3 prosjektorer). Hver hendelse booker én, og B1 varsler når flere hendelser samtidig booker den enn det du har.
4. Angi en **Approval Group** hvis noen må godkjenne utlån av ressurser. Dette fungerer på samme måte som for rom.
5. Klikk **Save**.

Rediger eller slett en ressurs på samme måte som et rom.

## Sperringer {#blockouts}

Sperringer hindrer at rom eller ressurser blir booket i bestemte tidsrom – for renoveringer, reserverte perioder eller vedlikehold.

### Legge til en sperring {#adding-a-blockout}

1. Klikk på fanen **Blockouts**, og deretter **Add Blockout**.
2. Under **Applies To** velger du et rom, en ressurs eller **All rooms & resources**.
3. Angi **Start** og **End** dato/klokkeslett for sperringen.
4. Legg eventuelt til en **Reason**. Den vises i [Tilgjengelighetskalenderen](./availability.md) som *Blocked: reason*.
5. Klikk **Save**.

Hendelser som booker et sperret rom eller en sperret ressurs, viser en konfliktadvarsel i hendelsesredigeringen.

## Hendelsesmaler {#event-templates}

Maler lar deg lagre et gjenbrukbart oppsett for hendelser – tittel, beskrivelse, varighet, rom og ressurser – slik at hendelser du oppretter ofte, alltid settes opp på samme måte.

### Legge til en mal {#adding-a-template}

1. Klikk på fanen **Templates**, og deretter **Add Template**.
2. Skriv inn et **Template Name** (vises når du velger en mal).
3. Fyll inn **Event Title**, **Event Description** og **Duration (minutes)** som skal brukes for nye hendelser.
4. Velg eventuelt **Rooms** og **Resources** som skal bookes.
5. Klikk **Save**.

Når du oppretter en ny hendelse, velger du malen i boksen **Template** i hendelseseditoren for å fylle inn tittel, beskrivelse, rom og ressurser, og for å sette sluttidspunktet ut fra malens varighet (angi **Start** først). Du velger fortsatt hendelsens **Group** selv. Boksen **Template** vises først når det finnes minst én mal.

## Relaterte artikler {#related-articles}

- [Tilgjengelighetskalender](./availability.md) — se alle bookinger samlet og book rom eller ressurser direkte
- [Kalendergodkjenninger](./approvals.md) — godkjenn eller avslå bookingforespørsler for rom og ressurser
- [Opprette kalendere](./creating-calendars.md) — sett opp hendelseskalendere
- [Opprette grupper](../groups/creating-groups.md) — sett opp grupper som kan booke rom og ressurser
