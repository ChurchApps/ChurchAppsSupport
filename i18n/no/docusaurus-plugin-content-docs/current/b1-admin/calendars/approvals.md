---
title: "Kalendergodkjenninger"
description: "Gjennomgå ventende bookingforespørsler for rom og ressurser i B1 Admin, sjekk for konflikter, godkjenn eller avslå dem, og se tilbake på tidligere beslutninger under History."
---

# Kalendergodkjenninger

<div class="article-intro">

Siden Approvals er der administratorer gjennomgår og behandler ventende bookingforespørsler for rom og ressurser, samt kalenderhendelser som må godkjennes før de publiseres.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Konfigurer rom eller ressurser med en **Approval Group** i [Rom og ressurser](./rooms-resources.md)
- Du trenger tillatelsen **Edit Content**, eller **Resolve Calendar Conflicts & Approvals** (begge finnes i seksjonen **Content** i [Roller og tillatelser](../settings/roles-permissions.md)). Uten **Edit Content** vises ikke menyen **Calendars** – åpne Approvals i stedet fra lenken for ventende godkjenninger på **Dashboard** eller fra godkjenningse-posten.

</div>

## Åpne Approvals {#opening-approvals}

I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Calendars** og klikker **Approvals**. Ventende bookingforespørsler og hendelser som venter på gjennomgang, vises her. Bruk knappene **Pending** og **History** øverst for å bytte mellom forespørsler som fortsatt må avgjøres, og de som allerede er avgjort.

## Bookingforespørsler {#booking-requests}

Når noen booker et rom eller en ressurs som har en **Approval Group**, og personen ikke er medlem av den gruppen, vises forespørselen i seksjonen **Room & Resource Requests**. (Bookinger fra medlemmer av Approval Group godkjennes automatisk.) Medlemmer av Approval Group får også en e-post med nye ventende forespørsler og en lenke til denne siden. Hver rad viser:

- Navnet på hendelsen og dato/klokkeslett
- Rommet eller ressursen som forespørres (med antall for ressurser med flere enheter)
- **Requested by**, personen som ba om den, med lenke til posten deres
- En statusmerkelapp som viser om forespørselen har konflikter

### Konfliktindikatorer {#conflict-indicators}

Hvis en forespørsel overlapper en annen booking eller sperring for samme rom eller ressurs, viser statusen et merke **Conflicts**; hold musepekeren over det for å se detaljene. Forespørsler uten overlapp viser **No conflicts**. Gjennomgå konfliktende forespørsler nøye før du godkjenner noen av dem.

### Godkjenne eller avslå {#approving-or-rejecting}

Hold musepekeren over en bookingforespørsel og klikk **Approve** eller **Reject**. Den som ba om forespørselen, får beskjed om avgjørelsen. Godkjente bookinger låses til det rommet eller den ressursen for hendelsen; avslåtte bookinger frigjør tidspunktet for andre.

Når du klikker **Approve**, åpnes en dialog **Approve booking**, slik at du også kan publisere hendelsen i samme steg:

1. Kryss av for **Publish to public calendar** for å gjøre hendelsen offentlig i kalenderen til gruppen. La det stå umerket for å godkjenne bookingen uten å endre synligheten til hendelsen.
2. Når **Publish to public calendar** er avkrysset, kan du eventuelt velge en utvalgt kalender fra **Also add to calendar** for å legge hendelsen til i en av dine [utvalgte kalendere](./curated-calendar.md) også. La det stå på **None** for å hoppe over dette. (Dette alternativet vises bare hvis du har tillatelsen **content.edit**.)
3. Klikk **Approve**.

Når du klikker **Reject**, åpnes en dialog **Reject Request**:

1. Skriv eventuelt en begrunnelse i **Reason (optional)** (opptil 500 tegn) – for eksempel *«Gymsalen er booket den helgen.»*
2. Klikk **Reject** for å bekrefte, eller **Cancel** for å beholde forespørselen som ventende.

Begrunnelsen legges til på slutten av varselet den som ba om forespørselen får (for eksempel *Your event request "Youth Lock-In" was rejected: Gymsalen er booket den helgen.*), og medlemmene ser den også på siden **My Requests** i B1-appen. La feltet være tomt for å sende det vanlige varselet.

## Ventende hendelser {#pending-events}

Hendelser som medlemmer ber om (for eksempel fra **My Requests** i B1-appen), vises i seksjonen **Event Requests** med dato, **Description** og **Requested by**. Klikk **Approve** for å publisere en hendelse i kalenderen, eller **Reject** for å varsle innsenderen om at endringer er nødvendig (du kan legge til en begrunnelse, slik som beskrevet ovenfor). Klikk **Edit** for å rette opp detaljene i forespørselen før du avgjør, eller **Delete** for å fjerne den. Hendelsesforespørsler som medlemmer sender fra appen, har ingen gruppe, så gruppelisten i redigeringsdialogen viser **(no group)** for dem, og du kan lagre endringene uten å velge en.

:::tip
Sett opp en Approval Group på et rom i [Rom og ressurser](./rooms-resources.md) for å kreve godkjenning for det rommet. Grupper med tilgang kan da be om rommet når de oppretter hendelser, og disse forespørslene havner på denne siden.
:::

## Historikk {#history}

Godkjente og avslåtte forespørsler blir værende på siden. Klikk **History** øverst i Approvals for å se dem; klikk **Pending** for å gå tilbake til de åpne forespørslene.

- **Room & Resource Requests** lister hver avgjorte booking med hendelsen, rommet eller ressursen, **Requested by**, et merke **Approved** eller **Rejected**, og **Decided**, som viser hvem som tok avgjørelsen og på hvilken dato. De sist avgjorte forespørslene vises først.
- **Event Requests** lister hver avgjort hendelse med beskrivelsen, **Requested by**, et merke **Approved** eller **Rejected**, og **Decided**, som viser hvem som tok avgjørelsen og på hvilken dato. Eldre hendelsesforespørsler, avgjort før B1 begynte å registrere dette, viser en strek i stedet.

Du kan endre mening fra History: en godkjent forespørsel har en handling **Reject**, og en avslått forespørsel har en handling **Approve**. Hvis du avslår en hendelsesforespørsel du tidligere har godkjent, fjernes den fra den offentlige kalenderen igjen. Hendelsesforespørsler kan også redigeres eller slettes her.

Klikk på et navn under **Requested by** for å åpne personens post.

## Relaterte artikler {#related-articles}

- [Rom, ressurser og planlegging](./rooms-resources.md) — konfigurer rom og ressurser som kan bookes
- [Opprette kalendere](./creating-calendars.md) — administrer kalendere og hendelser
