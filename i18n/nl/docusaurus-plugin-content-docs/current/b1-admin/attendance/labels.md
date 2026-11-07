---
title: "Labelontwerper voor check-in"
---

# Labelontwerper voor check-in

<div class="article-intro">

Met de Labelontwerper maak en pas je de naamlabels en ophaalbonnetjes aan die worden afgedrukt wanneer gezinnen hun kinderen inchecken. Je bepaalt precies welke informatie op elk label verschijnt, waar die wordt geplaatst en hoe het eruitziet.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Stel [Aanwezigheid](setup) in en configureer minstens één dienst met ingeschakelde check-in
- Stel [Check-in](check-in) in zodat er labels worden afgedrukt
- Je hebt beheerderstoegang nodig tot het gedeelte Aanwezigheid

</div>

## De Labelontwerper openen

Open in B1 Admin het [Sprongmenu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven), vouw **Mobile** uit en klik op **B1 CheckIn**. Klik vervolgens op de knop **Design Labels** op de kaart Check-in Labels. Je ziet een lijst met opgeslagen labelsjablonen, gescheiden per type: **Nametag** en **Pickup Slip**.

## Labeltypen

- **Nametag** — wordt afgedrukt en aan het kind bevestigd. Bevat meestal de naam van het kind, de klas of sessie en een beveiligingscode.
- **Pickup Slip** — wordt aan de ouder of voogd gegeven. Bevat meestal de beveiligingscode en een lijst met de kinderen die ze hebben ingecheckt.

B1 begint met een standaard naamlabel en een standaard ophaalbonnetje, beide afgestemd op standaard thermische labels van 3,5 × 1,1 inch.

## Een labelsjabloon maken

1. Klik op **Add** en kies een startpunt in het menu: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"** of **Blank**.
2. Er opent een nieuw sjabloon in de labeleditor.

### De labeleditor

De editor toont een geschaalde voorvertoning van het label in het ingestelde formaat. In het linkerpaneel kun je het volgende instellen:

- **Name** — de naam van het sjabloon (alleen ter referentie)
- **Label Type** — Nametag of Pickup Slip
- **Width / Height** — het formaat van het label in inches

### Blokken toevoegen

Een label is opgebouwd uit blokken: afzonderlijke onderdelen met inhoud die op het labelcanvas worden geplaatst. Klik op **Add Block** om een nieuw blok in te voegen en kies het type:

- **Field** — haalt op het moment van afdrukken een gegevenswaarde op:
  - `person.displayName` — de volledige naam van de persoon
  - `sessions` — de dienst of klas waarvoor ze zijn ingecheckt
  - `securityCode` — de willekeurig gegenereerde beveiligingscode voor het ophalen
  - `children` — lijst met kinderen (voor ophaalbonnetjes)
  - `person.nametagNotes` — eventuele speciale opmerkingen in het profiel van de persoon
  - `person.isBirthdayWeek` — true als de verjaardag (maand en dag) binnen 3 dagen voor of na de incheckdatum valt
  - `campus` — de naam van de campus
- **Text** — vaste tekst die je zelf typt (voor koppen, labels of instructies)
- **Barcode** — een barcode met de beveiligingscode

### Blokken positioneren

Elk blok heeft de velden **X**, **Y**, **Width** en **Height**, uitgedrukt als percentages van het labelcanvas (0–100). Pas deze aan om de inhoud precies te plaatsen. Je kunt ook instellen:

- **Font Size** — tekstgrootte in punten
- **Bold** — vetgedrukte tekst aan- of uitzetten
- **Align** — tekst links, midden of rechts uitlijnen
- **Condition** — het blok optioneel verbergen als een veld leeg is (bijvoorbeeld alleen nametagNotes tonen als er een waarde is). Dit werkt ook met `person.isBirthdayWeek`, zodat je een verjaardagsafbeelding of -tekst alleen op naamlabels toont voor kinderen wier verjaardag binnen enkele dagen van de check-in valt.

### Opslaan

Klik op **Save** om het sjabloon op te slaan. Het bijgewerkte sjabloon wordt gebruikt de volgende keer dat er labels worden afgedrukt in B1 Checkin.

## Sjablonen opnieuw rangschikken

Als je meerdere naamlabel- of ophaalbonnetjessjablonen hebt, gebruikt B1 Checkin standaard het eerste sjabloon in de lijst. Sleep sjablonen om ze opnieuw te ordenen.

## Een sjabloon verwijderen

Klik op het verwijderpictogram in de rij van een sjabloon en bevestig. Als je het laatste sjabloon van een type verwijdert, wordt het standaard ingebouwde sjabloon hersteld.

:::tip
Maak na het bewerken van een sjabloon een testafdruk om te controleren of de lay-out goed is voordat je de volgende dienst begint.
:::

## Gerelateerde artikelen

- [Check-in instellen](setup) — diensten en groepen voor check-in configureren
- [Check-in afronden](check-in) — de check-inprocedure voor gezinnen
- [B1 Checkin aan de slag](../../b1-checkin/getting-started/) — de Checkin-kioskapp
