---
title: "Kalendergodkendelser"
---

# Kalendergodkendelser

<div class="article-intro">

Siden Godkendelser er her, hvor administratorer gennemgår og behandler ventende booking-anmodninger til lokaler og ressourcer samt kalenderbegivenheder, der skal godkendes, før de offentliggøres.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Konfigurer lokaler eller ressourcer med en **godkendelsesgruppe** under [Lokaler og ressourcer](rooms-resources)
- Du skal have tilladelsen **Kalenderadministrator** eller tilladelsen **content.edit**

</div>

## Åbn Godkendelser

I B1 Admin åbnes [Hopmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre), udvid **Kalendere**, og klik på **Godkendelser**. Ventende booking-anmodninger og begivenheder, der afventer gennemgang, vises her.

## Booking-anmodninger

Når en gruppe opretter en begivenhed og anmoder om et lokale eller en ressource, vises anmodningen i sektionen **Lokale- og ressourceanmodninger**. Hver række viser:

- Begivenhedens navn og dato/tidspunkt
- Det lokale eller den ressource, der anmodes om (med antal for ressourcer med flere enheder)
- Et statusmærke, der viser, om anmodningen har konflikter

### Konfliktindikatorer

Hvis en anmodning overlapper en anden booking eller spærret periode for det samme lokale eller den samme ressource, vises et **Konflikter**-mærke; hold musen over det for at se detaljerne. Anmodninger uden overlap viser **Ingen konflikter**. Gennemgå konfliktende anmodninger grundigt, før du godkender en af dem.

### Godkendelse eller afvisning

Klik på **Godkend** eller **Afvis** ved en booking-anmodning (ved afvisning skal du først bekræfte). Den anmodende gruppe får besked om beslutningen. Godkendte bookinger låses til det pågældende lokale eller den ressource for begivenheden; afviste bookinger frigiver tidsrummet, så andre kan bruge det.

Når du klikker på **Godkend**, åbnes dialogen **Godkend booking**, så du også kan offentliggøre begivenheden i samme trin:

1. Markér **Publicér i offentlig kalender** for at gøre begivenheden offentlig i gruppens kalender. Lad feltet være umarkeret for kun at godkende bookingen uden at ændre begivenhedens synlighed.
2. Når **Publicér i offentlig kalender** er markeret, kan du valgfrit vælge en kurateret kalender under **Tilføj også til kalender** for også at tilføje begivenheden til en af dine [kurerede kalendere](curated-calendar). Lad feltet stå på **Ingen**, hvis du vil springe over. (Denne mulighed vises kun, hvis du har tilladelsen **content.edit**.)
3. Klik på **Godkend**.

## Ventende begivenheder

Hvis din kalenderarbejdsgang kræver godkendelse af begivenheder, før de bliver synlige for offentligheden, vises ventende begivenheder i sektionen **Begivenhedsanmodninger**. Klik på **Godkend** for at offentliggøre en begivenhed i kalenderen, eller på **Afvis** for at give indsenderen besked om, at der skal foretages ændringer.

:::tip
Opsæt en godkendelsesgruppe på et lokale under [Lokaler og ressourcer](rooms-resources) for at kræve godkendelse for dette lokale. Grupper med adgang kan derefter anmode om lokalet, når de opretter begivenheder, og disse anmodninger havner på denne side.
:::

## Relaterede artikler

- [Lokaler, ressourcer og planlægning](rooms-resources) — konfigurer bookbare lokaler og ressourcer
- [Oprettelse af kalendere](creating-calendars) — administrer kalendere og begivenheder
