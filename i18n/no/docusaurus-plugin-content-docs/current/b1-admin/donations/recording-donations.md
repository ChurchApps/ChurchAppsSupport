---
title: "Registrere gaver"
---

# Registrere gaver

<div class="article-intro">

Gaver registreres i B1 Admin gjennom systemet for Batcher. Du oppretter en batch som representerer en innsamling (for eksempel en søndagsoffer), og legger deretter til enkeltgaver i batchen. Dette holder giverregistrene dine ryddige og enkle å avstemme.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [fondene](funds.md) dine, slik at du kan knytte gaver til riktige kategorier
- Opprett en [batch](batches.md) for å holde gavene du er i ferd med å legge inn
- Sørg for at giverne finnes i [personregisteret](../people/adding-people.md) ditt, slik at du kan slå dem opp når du registrerer gaver
- Du trenger **Rediger gaver**, eller **Registrer gaver** sammen med **Vis gaver**, for å legge gaver inn i en batch (se [Hvem kan endre en batch](batches.md#who-can-change-a-batch))

</div>

## Opprette en batch og legge til gaver

1. I **B1 Admin** åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Gaver** og klikker **Batcher**.
2. Klikk **Legg til batch** øverst på siden.
3. Skriv inn et navn på batchen (f.eks. «Søndagsoffer – 5. jan») og velg datoen. Klikk **Lagre**.
4. Den nye batchen vises i listen med null gaver og 0,00 kr.
5. Klikk på **batchnavnet** for å åpne den.

## Registrere enkeltgaver

1. På detaljsiden for batchen vises registreringspanelet for gaver ved siden av gavelisten. Under **Velg person eller anonym** skriver du giverens navn i søkefeltet for å finne dem, eller klikker **Anonym**. (Ved å klikke **Legg til gave** øverst på siden hopper du til dette panelet.)
2. Etter at du har valgt en person, viser skjemaet feltene **Dato**, **Metode** (Sjekk, Kontant, Kort eller Naturalia), **Fond**, **Notater**, **Beløp** og **Sjekk nr.** (eller **Siste 4 siffer** for kortgaver, eller **Gjenstand** for å beskrive en naturaliagave). Klikk **Endre** ved siden av giverens navn for å velge noen andre.
3. Fyll inn detaljene og klikk **Legg til gave** (eller trykk Enter).
4. Gaven legges til i gavelisten, og skjemaet tømmes slik at du kan registrere neste.

:::info
Hvis batchen er [lukket](batches.md#closing-and-reopening-a-batch), er registreringspanelet og lenkene **Rediger** skjult for alle uten **Rediger gaver**, og et varsel øverst i batchen sier at den er lukket. Be noen med **Rediger gaver** om å åpne den igjen.
:::

:::tip
Du kan raskt registrere flere gaver på rad uten å forlate batch-siden. Skjemaet tømmes etter hver registrering, slik at du kan gå effektivt gjennom en bunke med sjekker eller konvolutter.
:::

## Logge en gave fra en persons profil

For å registrere en enkelt gave uten å åpne en batch, åpner du giverens profil i **Personer** og klikker **Logg gave** (i givingsoppsummeringen, eller i personens givingsvisning).

1. Angi **Dato** og **Beløp**.
2. Velg **Fond** og **Metode** (Sjekk, Kontant, Kort eller Naturalia), og skriv inn **Sjekk nr.**, **Siste 4 siffer** eller **Gjenstand** (for naturaliagaver) om nødvendig.
3. Legg eventuelt til **Notater**, og klikk deretter **Lagre**.

Gaven lagres i batchen for den datoen. Hvis det ikke finnes noen batch for datoen ennå, opprettes en for deg, og den navngis etter datoen.

## Dele en gave mellom flere fond

Noen ganger gir én giver til mer enn ett fond i én transaksjon. Slik håndterer du det:

1. Under registreringspanelet klikker du lenken **full gaveredigering** (eller klikker **Rediger** på en eksisterende gaverad).
2. I den fullstendige redigeringen legger du til beløp på ulike fond. Totalen beregnes automatisk fra beløpene per fond.
3. Klikk **Lagre** for å oppdatere gaven.

:::info
Det er vanlig å dele gaver mellom fond når en giver skriver én sjekk som er øremerket flere formål, for eksempel Generelt fond og Misjon.
:::

## Redigere eller fjerne gaver

For å redigere en gave klikker du på knappen **Rediger** på raden i batchen. Du kan endre dato, beløp, fond, betalingsmetode (Sjekk, Kontant, Kort eller Naturalia), eller andre detaljer. For en naturaliagave merker redigeringen detaljfeltet **Gjenstand**, slik at du kan beskrive hva som ble gitt. Klikk **Lagre** når du er ferdig.

:::tip
Linjen under batchnavnet øverst på siden oppdateres automatisk og viser batchdatoen, antall gaver og den samlede dollarverdien etter hvert som du legger til eller redigerer poster. Bruk den til å avstemme mot innskuddsslippen din.
:::

## Tilbakeføre en gave

Hvis en giver ble belastet ved en feil, eller ber om pengene tilbake, kan du tilbakeføre en fullført gave direkte fra redigeringsskjermen — uten å gå til betalingsleverandørens dashbord.

1. Åpne gaven og klikk **Rediger**.
2. Klikk knappen **Tilbakefør** ved siden av Slett nederst i skjemaet.
3. Bekreft dialogen: «Tilbakefør denne gaven i sin helhet gjennom betalingsleverandøren? Dette kan ikke angres.»

Gaven tilbakeføres i sin helhet gjennom den opprinnelige betalingsleverandøren og merkes **Tilbakeført** i gavelistene dine.

:::warning
Tilbakeføringer er kun fulle tilbakeføringer — det finnes ingen måte å tilbakeføre et delbeløp fra B1 Admin. Tilbakeføringen kan heller ikke angres når den er bekreftet.
:::

:::info
Knappen **Tilbakefør** vises bare for gaver som ble betalt på nett (de har en transaksjon hos betalingsleverandøren) og fortsatt har statusen **Fullført**. Manuelt registrerte gaver (kontant, sjekk) har ingen transaksjon hos betalingsleverandøren å tilbakeføre — rediger eller slett disse i stedet.
:::

## Neste steg

- Gå gjennom oppføringene dine med [Gaverapporter](donation-reports.md) for å bekrefte at de er riktige
- Ved årsslutt lager du [Giverbekreftelser](giving-statements.md) for giverne dine
