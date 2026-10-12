---
title: "Registrere gaver"
---

# Registrere gaver

<div class="article-intro">

Gaver registreres i B1 Admin via gavebuntsystemet. Du oppretter en gavebunt som representerer en innsamling (for eksempel søndagens offer), og legger deretter enkeltgaver inn i denne bunten. Slik holder du orden på giverregistreringene dine og gjør avstemming enklere.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [fondene dine](funds.md) slik at du kan knytte gaver til riktige kategorier
- Opprett en [gavebunt](batches.md) som skal inneholde gavene du holder på å registrere
- Sørg for at giverne finnes i [personregisteret ditt](../people/adding-people.md), slik at du kan slå dem opp når du registrerer gaver

</div>

## Opprette en gavebunt og legge til gaver

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i **B1 Admin** (søkefeltet øverst til venstre), utvid **Gaver** og klikk på **Gavebunter**.
2. Klikk på **Legg til gavebunt** øverst på siden.
3. Skriv inn et navn på gavebunten (for eksempel «Søndagsoffer – 5. jan») og velg dato. Klikk på **Lagre**.
4. Den nye gavebunten vises i listen med null gaver og 0,00 kr.
5. Klikk på **navnet på gavebunten** for å åpne den.

## Registrere enkeltgaver

1. På detaljsiden for gavebunten vises registreringspanelet for gaver ved siden av listen over gaver. Under **Velg person eller anonym** skriver du giverens navn i søkefeltet for å finne vedkommende, eller klikker på **Anonym**. (Å klikke på **Legg til gave** øverst på siden hopper til dette panelet.)
2. Etter at du har valgt en person, viser skjemaet feltene **Dato**, **Metode** (Sjekk, Kontant, Kort eller Naturalgave), **Fond**, **Notater**, **Beløp** og **Sjekknr.** (eller **Siste 4 siffer** for kortgaver). Klikk på **Endre** ved siden av giverens navn for å velge en annen person.
3. Fyll ut opplysningene og klikk på **Legg til gave** (eller trykk Enter).
4. Gaven legges til i listen over gaver, og skjemaet nullstilles slik at du kan registrere neste gave.

:::tip
Du kan raskt registrere flere gaver på rad uten å forlate gavebuntsiden. Skjemaet nullstilles etter hver registrering, slik at du effektivt kan jobbe deg gjennom en bunke med sjekker eller konvolutter.
:::

## Registrere en gave fra en persons post {#logging-a-gift-from-a-persons-record}

For å registrere en enkelt gave uten å åpne en gavebunt, åpner du giverens post under **Personer** og klikker på **Registrer gave** (i giveroversikten, eller på personens giveside).

1. Angi **Dato** og **Beløp**.
2. Velg **Fond** og **Metode** (Sjekk, Kontant, Kort eller Naturalgave), og skriv inn **Sjekknr.** eller **Siste 4 siffer** om nødvendig.
3. Legg eventuelt til **Notater**, og klikk deretter på **Lagre**.

Gaven lagres i gavebunten for den datoen. Finnes det ikke en gavebunt for den datoen ennå, opprettes en for deg, med datoen som navn.

## Dele en gave mellom flere fond

Noen ganger gir en giver til mer enn ett fond i samme transaksjon. Slik gjør du det:

1. Under registreringspanelet klikker du på lenken **full redigering av gave** (eller klikker på **Rediger** på en eksisterende gaverad).
2. I den fullstendige redigeringen legger du til beløp på ulike fond. Totalen beregnes automatisk ut fra beløpene på de enkelte fondene.
3. Klikk på **Lagre** for å oppdatere gaven.

:::info
Det er vanlig å dele gaver mellom fond når en giver skriver én sjekk som er øremerket flere formål, for eksempel Generelt fond og Misjon.
:::

## Redigere eller fjerne gaver

For å redigere en gave klikker du på knappen **Rediger** på raden i gavebunten. Du kan endre dato, beløp, fond, betalingsmåte eller andre detaljer. Klikk på **Lagre** når du er ferdig.

:::tip
Linjen under navnet på gavebunten øverst på siden oppdateres automatisk og viser gavebuntens dato, antall gaver og samlet beløp etter hvert som du legger til eller redigerer registreringer. Bruk dette til å avstemme mot innskuddsslippen.
:::

## Refundere en gave

Hvis en giver ble belastet ved en feil eller ber om å få pengene tilbake, kan du refundere en fullført gave direkte fra redigeringsskjermen. Du trenger ikke gå til betalingsleverandørens dashbord.

1. Åpne gaven og klikk på **Rediger**.
2. Klikk på knappen **Refunder** ved siden av Slett nederst i skjemaet.
3. Bekreft dialogen: «Refundere denne gaven i sin helhet via betalingsgatewayen? Dette kan ikke angres.»

Gaven refunderes i sin helhet via den opprinnelige betalingsgatewayen og merkes som **Refundert** i gavelistene dine.

:::warning
Refusjoner er bare fulle refusjoner. Det er ikke mulig å refundere et delbeløp fra B1 Admin. Refusjonen kan heller ikke angres når den er bekreftet.
:::

:::info
Knappen **Refunder** vises bare for gaver som er betalt online (de har en gatewaytransaksjon) og som fortsatt har statusen **Fullført**. Manuelt registrerte gaver (kontanter, sjekk) har ingen gatewaytransaksjon å refundere. Rediger eller slett dem i stedet.
:::

## Neste steg

- Gå gjennom registreringene dine med [giverrapporter](donation-reports.md) for å kontrollere at de stemmer
- Ved årsskiftet oppretter du [giveroppgaver](giving-statements.md) til giverne dine
