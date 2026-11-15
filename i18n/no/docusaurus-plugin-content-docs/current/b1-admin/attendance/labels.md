---
title: "Etikettdesigner for innsjekking"
description: "Tilpass malene for navnelapper og hentelapper som skrives ut ved innsjekking i B1 Admin, inkludert felter, plassering og betingelser for bursdag eller merknader."
---

# Etikettdesigner for innsjekking

<div class="article-intro">

Etikettdesigneren lar deg lage og tilpasse malene for navnelapper og hentelapper som skrives ut når familier sjekker inn barna sine. Du kan styre nøyaktig hvilken informasjon som vises på hver etikett, hvor den er plassert og hvordan den ser ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [oppmøte](./setup.md) og konfigurer minst ett gudstjenestetidspunkt med innsjekking slått på
- Sett opp [innsjekking](./check-in.md) slik at etikettene skrives ut
- Du trenger tillatelsen **Edit Attendance**

</div>

## Åpne etikettdesigneren {#opening-the-label-designer}

Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), utvid **Mobile** og klikk **Labels**. Du kan også klikke **B1 CheckIn** og deretter **Design Labels** på kortet **Check-in Labels**.

Siden **Check-in Labels** viser de lagrede malene dine med **Name**, **Type** (**Nametag** eller **Pickup Slip**) og **Size**. Hvis du ikke har laget noen ennå, står det **No label templates**, og B1 Checkin skriver ut sin innebygde navnelapp og hentelapp.

## Etikettyper {#label-types}

- **Nametag** – skrives ut og festes på barnet. Inneholder vanligvis barnets navn, klasserom/samling og en sikkerhetskode.
- **Pickup Slip** – gis til forelderen eller foresatte. Inneholder vanligvis sikkerhetskoden og en liste over barna de har sjekket inn.

Begge startmalene er tilpasset standard termoetiketter på 3,5 × 1,1 tommer (Brother DK-1201).

## Lage en etikettmal {#creating-a-label-template}

1. Klikk **Add label** og velg et utgangspunkt: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** eller **Blank**.
2. Malen åpnes i etikettredigeringsprogrammet, med en forhåndsvisning av etiketten fylt ut med eksempeldata.

### Etikettredigeringsprogrammet {#label-editor}

Øverst i redigeringsprogrammet kan du angi:

- **Name** – navnet på malen (kun for din egen referanse; påkrevd)
- **Type** – Nametag eller Pickup Slip
- **Width (in)** / **Height (in)** – etikettstørrelse i tommer

### Legge til blokker {#adding-blocks}

En etikett er bygget opp av blokker – enkeltstående innholdselementer plassert på etiketten. Klikk på en knapp i panelet **Add Block** for å legge til en:

- **Fields** – henter inn en verdi når etiketten skrives ut. Navnelapper tilbyr **Display Name**, **First Name**, **Last Name**, **Nickname**, **Nametag Notes** (merknadene på personens post), **Birthday This Week** (sann når personens bursdag faller innenfor 3 dager før eller etter innsjekkingsdatoen), **Sessions** (gudstjenestetidspunktene og rommene de har sjekket inn til), **Security Code**, **Date** og **Church Name**. Hentelapper tilbyr **Children**, **Children & Allergies**, **Security Code**, **Date** og **Church Name**.
- **Text** – fast tekst du skriver inn (til overskrifter, etiketter eller instruksjoner)
- **Barcode** – en strekkode av typen Code 128 eller Code 39 for et felt, for eksempel sikkerhetskoden
- **QR Code** – en QR-kode for et felt
- **Box** – et rektangel med valgfri fyllfarge og kantlinje

### Plassere og style blokker {#positioning-and-styling-blocks}

Dra en blokk på etiketten for å flytte den, eller klikk på den og bruk panelet **Properties**. **X**, **Y**, **W** og **H** er prosenter av etiketten (0–100). Avhengig av blokken kan du også angi:

- **Font Size** – tekststørrelse, i forhold til etikettens høyde
- **Bold** og **Italic**
- **Align** – Left, Center eller Right
- **Symbology** og **Value** – for strekkoder og QR-koder
- **Fill** og **Border** – for bokser
- **Condition** – **Always** viser blokken. Velg et felt for å vise blokken bare når feltet **Is not blank**, **Is blank**, **Equals** eller **Does not equal** en verdi. For eksempel: vis merknader for navnelappen bare når de er fylt ut, eller vis en bursdagsgrafikk bare når **Birthday This Week** er lik `true`.

Klikk **Remove Block** for å slette den valgte blokken.

### Lagre {#saving}

Klikk **Save** for å lagre malen, eller **Cancel** for å forkaste endringene dine. B1 Checkin bruker den oppdaterte malen neste gang den laster innstillingene sine.

## Velge standardmalen {#choosing-the-default-template}

Hvis du har mer enn én mal av samme type, klikker du **Set Default** på malen som B1 Checkin skal skrive ut. Den får et merke **Default**, og andre maler av samme type slutter å være standard. Hvis ingen mal av en type er merket som standard, bruker kiosken den første.

## Slette en mal {#deleting-a-template}

Klikk **Delete** på malens rad og bekreft. Hvis du sletter alle maler av en type, går B1 Checkin tilbake til sin innebygde etikett for den typen.

:::tip
Skriv ut en testetikett etter at du har redigert en mal, for å bekrefte at layouten ser riktig ut før neste gudstjeneste.
:::

## Relaterte artikler {#related-articles}

- [Oppmøteoppsett](./setup.md) – konfigurer gudstjenester og grupper for innsjekking
- [Innsjekking](./check-in.md) – sett opp kioskappen B1 Checkin
- [Komme i gang med B1 Checkin](../../b1-checkin/getting-started/index.md) – kioskappen Checkin
