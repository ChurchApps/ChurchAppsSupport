---
title: "Registrere gaver"
---

# Registrere gaver

<div class="article-intro">

Gaver registreres i B1 Admin gjennom batch-systemet. Du oppretter en batch som representerer en innsamling (for eksempel en søndagsoffer), og legger deretter til de enkelte gavene i batchen. Dette holder giverregistrene dine organisert og gjør dem enkle å avstemme.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp [fondene](funds.md) dine, slik at du kan knytte gaver til riktige kategorier
- Opprett en [batch](batches.md) som kan holde gavene du skal legge inn
- Sørg for at givere finnes i [personregisteret ditt](../people/adding-people.md), slik at du kan slå dem opp når du registrerer gaver
- Du trenger **Edit Donations**, eller **Enter Donations** sammen med **View Donations**, for å legge inn gaver i en batch (se [Hvem kan endre en batch](batches.md#who-can-change-a-batch))

</div>

## Opprette en batch og legge til gaver

1. I **B1 Admin** åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Donations** og klikker på **Batches**.
2. Klikk på **Add Batch** øverst på siden.
3. Skriv inn et navn for batchen (for eksempel «Søndagsoffer - 5. jan.») og velg datoen. Klikk på **Save**.
4. Den nye batchen vises i listen med null gaver og 0,00 $.
5. Klikk på **batchnavnet** for å åpne den.

## Registrere enkeltgaver

1. På detaljsiden for batchen vises registreringspanelet for gaver ved siden av listen over gaver. Under **Select Person or Anonymous** skriver du inn giverens navn i søkefeltet for å finne personen, eller klikker på **Anonymous**. (Klikker du på **Add Donation** øverst på siden, hopper du til dette panelet.)
2. Når du har valgt en person, viser skjemaet feltene **Date**, **Method** (Check, Cash, Card eller In-Kind), **Fund**, **Notes**, **Amount** og **Check #** (eller **Last 4 digits** for kortgaver, eller **Item** for å beskrive en gave i naturalier). Klikk på **Change** ved siden av giverens navn for å velge en annen person.
3. Fyll inn detaljene og klikk på **Add Donation** (eller trykk Enter).
4. Gaven legges til i listen over gaver, og skjemaet tømmes slik at du kan legge inn neste.

:::info
Hvis batchen er [lukket](batches.md#closing-and-reopening-a-batch), skjules registreringspanelet og lenkene **Edit** for alle som ikke har **Edit Donations**. Øverst på batchen vises en melding om at den er lukket. Be noen med **Edit Donations** om å åpne den igjen.
:::

:::tip
Du kan legge inn flere gaver raskt etter hverandre uten å forlate batchsiden. Skjemaet tømmes etter hver registrering, slik at du raskt kan gå gjennom en bunke sjekker eller konvolutter.
:::

## Importere gaver fra en CSV-fil {#importing-donations-from-a-csv-file}

Hvis gavene dine allerede ligger i et regneark -- for eksempel en eksport fra et annet giversystem eller et telleteams tellelisten -- kan du importere dem til en batch i stedet for å skrive dem inn én og én.

1. Åpne batchen og klikk på **Import CSV** øverst på siden. (Knappen vises når du kan endre batchen, og menigheten din har minst ett [fond](funds.md).)
2. Klikk på **Choose CSV File** og velg filen din. Filen må ha en overskriftsrad, og kolonnene kan stå i hvilken som helst rekkefølge:
   - **Amount** (påkrevd; `Total` fungerer også) -- Valutasymboler og komma ignoreres, så `$1,250.00` er greit. Beløpet må være større enn null.
   - **Date** -- Bruk et format som `2026-10-25` eller `10/25/2026`. Hvis feltet er tomt, brukes batchens dato.
   - **Fund** -- Fondets navn, uten hensyn til store og små bokstaver. Hvis feltet er tomt, brukes ditt første fond.
   - **Method** -- **Check**, **Cash**, **Card** eller **In-Kind**. Hvis feltet er tomt, brukes **Check**.
   - **Check Number** -- Sjekknummeret (eller annen betalingsdetalj).
   - **Notes**
   - **Email**, **Name**, eller **First Name** og **Last Name** -- Brukes for å finne giveren i databasen din. Et navn skrevet som «Smith, John» leses som «John Smith».
3. Gå gjennom forhåndsvisningen. Hver rad viser linjenummeret, giveren fra filen, **Match**, fondet og beløpet:
   - Et personnavn betyr at giveren er funnet. B1 søker først på e-post, deretter på eksakt navn, og bare når nøyaktig én person passer.
   - **Not found — anonymous** betyr at det ikke ble funnet én entydig treff. Gaven importeres som anonym, og «Imported as:» med giverens navn legges til i notatene, slik at du kan knytte den til en person senere.
   - En rød melding som **Invalid amount**, **Unknown fund**, **Unknown method** eller **Invalid date** betyr at raden hoppes over. Rett filen og velg den på nytt for å ta med raden.
4. Klikk på **Import** (knappen viser hvor mange rader som blir importert). Gavene legges til i batchen.

:::tip
Etter importen bruker du **Edit** på en anonym gave for å velge riktig person. Notatet «Imported as:» viser hvem filen sa at gaven var fra.
:::

## Registrere en gave fra en persons profil

For å registrere en enkelt gave uten å åpne en batch, åpner du giverens profil under **People** og klikker på **Log a gift** (i giveroversikten, eller i personens giveroversikt).

1. Angi **Date** og **Amount**.
2. Velg **Fund** og **Method** (Check, Cash, Card eller In-Kind), og skriv inn **Check #**, **Last 4 digits** eller **Item** (for gaver i naturalier) hvis det trengs.
3. Legg eventuelt til **Notes**, og klikk deretter på **Save**.

Gaven lagres i batchen for den datoen. Hvis det ikke finnes noen batch for datoen ennå, opprettes en for deg, og den får datoen som navn.

## Dele en gave på flere fond

Noen ganger gir en giver til flere fond i én transaksjon. Slik håndterer du det:

1. Under registreringspanelet klikker du på lenken **full donation editor** (eller klikker på **Edit** på en eksisterende gaverad).
2. I den fulle editoren legger du til beløp på ulike fond. Totalbeløpet beregnes automatisk ut fra beløpene per fond.
3. Klikk på **Save** for å oppdatere gaven.

:::info
Det er vanlig å dele gaver på flere fond når en giver skriver én sjekk med flere formål, for eksempel Generelt fond og Misjon.
:::

## Redigere eller fjerne gaver

For å redigere en gave klikker du på knappen **Edit** på raden i batchen. Du kan endre datoen, beløpet, fondet, betalingsmetoden (Check, Cash, Card eller In-Kind) eller andre detaljer. For en gave i naturalier merker editoren detaljfeltet **Item**, slik at du kan beskrive hva som ble gitt. Klikk på **Save** når du er ferdig.

:::tip
Linjen under batchnavnet øverst på siden oppdateres automatisk og viser batchens dato, antall gaver og samlet beløp etter hvert som du legger til eller endrer poster. Bruk den til å avstemme mot innskuddsseddelen din.
:::

## Refundere en gave

Hvis en giver ble belastet ved en feil, eller ber om pengene tilbake, kan du refundere en fullført gave direkte fra redigeringsskjermen -- du trenger ikke gå til betalingsløsningens dashbord.

1. Åpne gaven og klikk på **Edit**.
2. Klikk på knappen **Refund** ved siden av Delete nederst i skjemaet.
3. Bekreft dialogen: «Refund this donation in full through the payment gateway? This cannot be undone.»

Gaven refunderes i sin helhet via den opprinnelige betalingsløsningen, og den merkes **Refunded** i giverlistene dine.

:::warning
Refusjoner gjelder bare hele beløpet -- det finnes ingen måte å refundere et delbeløp fra B1 Admin. Refusjonen kan heller ikke angres når den er bekreftet.
:::

:::info
Knappen **Refund** vises bare for gaver som er betalt på nett (de har en transaksjon i betalingsløsningen) og fortsatt har status **Complete**. Gaver som er lagt inn manuelt (kontant, sjekk), har ingen transaksjon å refundere -- rediger eller slett dem i stedet.
:::

## Skrive ut en kvittering for én gave

Når noen leverer inn en sjekk, betaler for et arrangement eller en t-skjorte, eller en besøkende organisasjon gir en gave, kan du skrive ut en kvittering for bare den gaven i stedet for for en hel batch eller en årsoppgave.

1. Åpne batchen som inneholder gaven.
2. Klikk på **Receipt** ved siden av **Edit** på gavens rad. Du kan også klikke på **Receipt** nederst i skjemaet Edit Donation.
3. Klikk på **Print**, eller på **Close** for å gå tilbake.

Kvitteringen bruker samme oppsett som giveroppgaven: menigheten din og giveren (eller «Anonymous»), gavens dato og metode, hvert fond og beløp, notatet, menighetens Giving Note og den offisielle kvitteringsblokken hvis du har satt et **Statement format** (se [Giveroppgaver](giving-statements.md)). Kvitteringsnummeret i blokken er gavens ID.

:::info
Teksten «no goods or services» skrives bare ut når alle fond på gaven er merket som skattefradragsberettiget. Hvis noen del av gaven gikk til et fond som ikke er skattefradragsberettiget, for eksempel et arrangementsgebyr eller et kjøp, utelates teksten. Kvitteringen leses da som en betaling, ikke som en veldedig gave.
:::

:::tip
Gaver på nett får allerede en automatisk takk-e-post, så kvitteringen er mest nyttig for gaver du legger inn manuelt.
:::

## Neste steg

- Gå gjennom innleggene dine med [Giverrapporter](donation-reports.md) for å kontrollere at alt stemmer
- Ved årsskiftet lager du [Giveroppgaver](giving-statements.md) til giverne dine
