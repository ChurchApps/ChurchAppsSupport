---
title: "Registrere gaver"
---

# Registrere gaver

<div class="article-intro">

Registrering av gaver i B1 Admin gjøres gjennom batch-systemet. Du oppretter en batch som representerer en innsamling (for eksempel en søndagsoffer), og legger deretter til enkeltgaver i den batchen. Dette holder giverregistrene dine organisert og enkle å avstemme.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [fond](funds.md) slik at du kan knytte gaver til riktige kategorier
- Opprett en [batch](batches.md) for å holde gavene du skal registrere
- Sørg for at givere er i [personregisteret](../people/adding-people.md), slik at du kan slå dem opp når du registrerer gaver
- Du trenger **Rediger gaver**, eller **Registrer gaver** sammen med **Vis gaver**, for å legge inn gaver i en batch (se [Hvem kan endre en batch](batches.md#who-can-change-a-batch))

</div>

## Opprette en batch og legge til gaver

1. I **B1 Admin** åpner du [Hopp til-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Donations** og klikker på **Batches**.
2. Klikk på **Add Batch** øverst på siden.
3. Skriv inn et navn for batchen (f.eks. "Søndagsoffer - 5. jan") og velg datoen. Klikk på **Save**.
4. Den nye batchen vises i listen med null gaver og 0,00 $.
5. Klikk på **batchnavnet** for å åpne den.

## Registrere enkeltgaver

1. På batchens detaljside vises registreringspanelet ved siden av gavelisten. Under **Select Person or Anonymous** skriver du giverens navn i søkefeltet for å finne vedkommende, eller klikker på **Anonymous**. (Klikker du på **Add Donation** øverst på siden, hopper du til dette panelet.)
2. Etter at du har valgt en person, viser registreringsskjemaet feltene **Date**, **Method** (Check, Cash, Card eller In-Kind), **Fund**, **Notes**, **Amount** og **Check #** (eller **Last 4 digits** for kortgaver, eller **Item** for å beskrive en gave i naturalier). Klikk på **Change** ved siden av giverens navn for å velge en annen person.
3. Fyll inn detaljene og klikk på **Add Donation** (eller trykk Enter).
4. Gaven legges til i gavelisten, og skjemaet tilbakestilles slik at du kan registrere neste gave.

:::info
Hvis batchen er [lukket](batches.md#closing-and-reopening-a-batch), er registreringspanelet og **Edit**-lenkene skjult for alle som ikke har **Rediger gaver**, og en melding øverst på batchen sier at den er lukket. Be noen med **Rediger gaver** om å åpne den igjen.
:::

:::tip
Du kan raskt registrere flere gaver etter hverandre uten å forlate batchsiden. Skjemaet tilbakestilles etter hver registrering, slik at du effektivt kan gå gjennom en stabel med sjekker eller konvolutter.
:::

## Importere gaver fra en CSV-fil {#importing-donations-from-a-csv-file}

Hvis gavene dine allerede finnes i et regneark, for eksempel en eksport fra et annet givingsystem eller et tellelag sin telleliste, kan du importere dem til en batch i stedet for å skrive inn hver enkelt.

1. Åpne batchen og klikk på **Import CSV** øverst på siden. (Knappen vises når du kan endre batchen og kirken din har minst ett [fond](funds.md).)
2. Klikk på **Choose CSV File** og velg filen din. Filen må ha en overskriftsrad, og kolonnene kan stå i hvilken som helst rekkefølge:
   - **Amount** (påkrevd; `Total` fungerer også) -- Valutasymboler og komma ignoreres, så `$1,250.00` er greit. Beløpet må være større enn null.
   - **Date** -- Bruk et format som `2026-10-25` eller `10/25/2026`. Hvis feltet er tomt, brukes batchens dato.
   - **Fund** -- Fondets navn, som matches uavhengig av store og små bokstaver. Hvis feltet er tomt, brukes ditt første fond.
   - **Method** -- **Check**, **Cash**, **Card** eller **In-Kind**. Hvis feltet er tomt, brukes **Check**.
   - **Check Number** -- Sjekknummeret (eller andre betalingsdetaljer).
   - **Notes**
   - **Email**, **Name**, eller **First Name** og **Last Name** -- Brukes til å matche giveren med en person i databasen din. Et navn skrevet som "Smith, John" leses som "John Smith".
3. Gå gjennom forhåndsvisningen. Hver rad viser linjenummeret, giveren fra filen, **Match**, fondet og beløpet:
   - Et personnavn betyr at giveren ble matchet. B1 matcher først på e-post, deretter på eksakt navn, og bare når nøyaktig én person passer.
   - **Not found — anonymous** betyr at ingen enkelt treff ble funnet. Gaven importeres som anonym, og "Imported as:" med giverens navn legges til i notatene, slik at du kan tilordne den senere.
   - En rød melding, for eksempel **Invalid amount**, **Unknown fund**, **Unknown method** eller **Invalid date**, betyr at raden hoppes over. Rett filen og velg den på nytt for å inkludere den.
4. Klikk på **Import** (knappen viser hvor mange rader som skal importeres). Gavene legges til i batchen.

:::tip
Etter importen bruker du **Edit** på en anonym gave for å velge riktig person. Notatet "Imported as:" forteller deg hvem filen sa at giveren var.
:::

## Registrere en gave fra en persons profil

For å registrere en enkelt gave uten å åpne en batch, åpner du giverens profil under **People** og klikker på **Log a gift** (i givingsoversikten, eller på personens givingsvisning).

1. Angi **Date** og **Amount**.
2. Velg **Fund** og **Method** (Check, Cash, Card eller In-Kind), og skriv inn **Check #**, **Last 4 digits** eller **Item** (for gaver i naturalier) om nødvendig.
3. Legg eventuelt til **Notes**, og klikk deretter på **Save**.

Gaven lagres i batchen for den datoen. Hvis det ikke finnes en batch for datoen ennå, opprettes en for deg, med navn etter datoen.

## Dele en gave mellom flere fond

Noen ganger gir en giver til flere fond i én transaksjon. Slik håndterer du det:

1. Under registreringspanelet klikker du på lenken **full donation editor** (eller klikker på **Edit** på en eksisterende gaverad).
2. I den fullstendige redigeringsvisningen legger du inn beløp på ulike fond. Totalen beregnes automatisk ut fra beløpene for hvert fond.
3. Klikk på **Save** for å oppdatere gaven.

:::info
Å dele gaver mellom fond er vanlig når en giver skriver én sjekk som er øremerket til flere formål, for eksempel Generelt fond og Misjon.
:::

## Redigere eller fjerne gaver

For å redigere en gave klikker du på **Edit**-knappen på raden i batchen. Du kan endre datoen, beløpet, fondet, betalingsmetoden (Check, Cash, Card eller In-Kind) eller andre detaljer. For en gave i naturalier merker redigeringsvisningen detaljfeltet **Item**, slik at du kan beskrive hva som ble gitt. Klikk på **Save** når du er ferdig.

:::tip
Linjen under batchnavnet øverst på siden oppdateres automatisk og viser batchdatoen, antall gaver og det samlede beløpet etter hvert som du legger til eller endrer registreringer. Bruk den til å avstemme mot innskuddsseddelen din.
:::

## Tilbakeføre en gave

Hvis en giver ble belastet ved en feil, eller ber om å få pengene tilbake, kan du tilbakeføre en fullført gave direkte fra redigeringsskjermbildet -- uten å gå til betalingsløsningens dashbord.

1. Åpne gaven og klikk på **Edit**.
2. Klikk på knappen **Refund** ved siden av Delete nederst i skjemaet.
3. Bekreft dialogen: "Refund this donation in full through the payment gateway? This cannot be undone."

Gaven tilbakeføres i sin helhet via den opprinnelige betalingsløsningen og merkes **Refunded** i gavelistene dine.

:::warning
Tilbakeføringer gjelder kun hele beløpet -- det finnes ingen måte å tilbakeføre et delbeløp fra B1 Admin. Tilbakeføringen kan heller ikke angres når den er bekreftet.
:::

:::info
Knappen **Refund** vises bare for gaver som ble betalt online (de har en transaksjon i betalingsløsningen) og fortsatt har status **Complete**. Manuelt registrerte gaver (kontanter, sjekk) har ingen transaksjon å tilbakeføre -- rediger eller slett dem i stedet.
:::

## Neste steg

- Gå gjennom registreringene dine med [Gaverapporter](donation-reports.md) for å kontrollere at de stemmer
- Ved årsskiftet kan du generere [Giverbekreftelser](giving-statements.md) til givere
