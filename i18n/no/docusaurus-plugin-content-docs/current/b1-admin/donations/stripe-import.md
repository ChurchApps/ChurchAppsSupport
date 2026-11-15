---
title: "Stripe-import"
description: "Hent Stripe-gaver inn i B1 Admin med en import som viser forhåndsvisning først og markerer hver belastning som ny, allerede importert eller hoppet over før du bekrefter."
---

# Stripe-import

<div class="article-intro">

Hvis du tar imot nettgaver via Stripe, lar verktøyet Stripe-import deg hente disse transaksjonene inn i B1 Admin, slik at alle giving-data ligger på ett sted. Dette er særlig nyttig for å fange opp transaksjoner som ikke ble synkronisert automatisk.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Fullfør [oppsettet for nettbasert giving](online-giving-setup.md) for å koble Stripe-kontoen din til B1 Admin. Menypunktet **Stripe Import** og knappen på siden Batches vises bare når menighetens giveløsning er Stripe, og bare for personer som kan redigere gaver
- Kontroller at du har gaver i Stripe-dashbordet for datoperioden du vil importere

</div>

## Slik fungerer det {#how-it-works}

Importen bruker en arbeidsflyt i to trinn: først forhåndsviser du hva som ville blitt importert, deretter bekrefter du importen. Denne tørrkjøringen lar deg gjennomgå alt før det opprettes noen data.

## Importere transaksjoner {#importing-transactions}

1. I **B1 Admin** går du til **Donations > Stripe Import**. (Du kan også klikke **Import missing Stripe transactions** øverst på siden **Batches**.)
2. Siden **Import Stripe Transactions** åpnes.
3. Under **Select Date Range** angir du **Start Date** og **End Date** for transaksjonene du vil importere. Perioden starter 1. januar i år og går til i dag.
4. Klikk **Preview** for å kjøre en tørrkjøring. **Import Missing** forblir deaktivert til en forhåndsvisning finner nye transaksjoner, og hvis du endrer en av datoene, fjernes forhåndsvisningen, slik at du må forhåndsvise den nye perioden først.

## Gjennomgå forhåndsvisningen {#reviewing-the-preview}

Forhåndsvisningen lister hver Stripe-hendelse med **Event ID**, **Type**, **Amount**, **Date** og en **Status**:

- **New** – denne transaksjonen er ikke importert ennå og vil bli med hvis du fortsetter.
- **Already Imported** – denne transaksjonen finnes allerede i B1 Admin og hoppes over.
- **Skipped** – denne transaksjonen er ekskludert av en annen grunn (f.eks. en refusjon eller en mislykket belastning).

Et sammendrag øverst viser **Total** antall hendelser og hvor mange som er **New**, **Already Imported** og **Skipped**. Hvis en hendelse ikke kunne leses, vises et antall **Errors**, og radens melding vises i kolonnen **Notes**.

:::info
Forhåndsvisningen oppretter ikke noen registreringer. Den er en skrivebeskyttet kontroll, slik at du kan se hva som vil skje før du forplikter deg.
:::

## Fullføre importen {#completing-the-import}

1. Gå gjennom resultatene i forhåndsvisningen og summene i sammendraget.
2. Klikk **Import Missing** for å importere alle transaksjoner som er merket som **New**.
3. Når importen er fullført, endres listen til **Import Results**: hver transaksjon som ble lagt til, viser **Imported**, og sammendraget får et tall for **Imported**.

## Tips for bruk av Stripe-import {#tips-for-using-stripe-import}

- Kjør importen jevnlig (ukentlig eller månedlig) for å holde registreringene dine oppdatert.
- Hvis en transaksjon vises som **Already Imported**, betyr det at B1 Admin allerede har en tilsvarende registrering – ingen handling er nødvendig.
- Bruk filteret for datoperioden for å fokusere på en bestemt periode hvis du leter etter bestemte transaksjoner.

:::tip
Etter importen besøker du siden [Batcher](batches.md) for å kontrollere at de importerte gavene vises riktig, og at summene stemmer med det du ser i Stripe-dashbordet.
:::

## Neste steg {#next-steps}

- Sjekk [Gaverapporter](donation-reports.md) for å se de importerte transaksjonene sammen med resten av giving-dataene dine
- Kontroller at importerte gaver er tilordnet riktige [fond](funds.md), slik at [gaveoversikter](giving-statements.md) blir riktige
