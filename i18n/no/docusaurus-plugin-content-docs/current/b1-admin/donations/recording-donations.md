---
title: "Registrere gaver"
description: "Registrer kirkens gaver i B1 Admin ved å opprette en batch, legge inn gaver én om gangen, importere en CSV-fil eller registrere én gave fra en giverprofil."
---

# Registrere gaver

<div class="article-intro">

Gaver registreres i B1 Admin gjennom batchsystemet. Du oppretter en batch som representerer en innsamling (for eksempel en søndagsoffer), og legger deretter til enkeltgaver i den batchen. Dette holder giveregistreringene dine organisert og enkle å avstemme.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp dine [fond](funds.md), slik at du kan tilordne gaver til riktige kategorier
- Opprett en [batch](batches.md) som skal inneholde gavene du er i ferd med å legge inn
- Sørg for at givere finnes i [personregisteret ditt](../people/adding-people.md), slik at du kan slå dem opp når du registrerer gaver
- Du trenger **Edit Donations**, eller **Enter Donations** sammen med **View Donations**, for å legge inn gaver i en batch (se [Hvem kan endre en batch](batches.md#who-can-change-a-batch))

</div>

## Opprette en batch og legge til gaver {#creating-a-batch-and-adding-donations}

1. I **B1 Admin** åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvider **Donations** og klikker **Batches**.
2. Klikk **Add Batch** øverst på siden.
3. Skriv inn et navn på batchen (f.eks. «Søndagsoffer – 5. jan») og velg datoen. Klikk **Save**.
4. Den nye batchen vises i listen med null gaver og $0,00.
5. Klikk på **batchnavnet** for å åpne den.

## Legge inn enkeltgaver {#entering-individual-donations}

1. På detaljsiden for batchen vises panelet for innlegging av gaver ved siden av gavelisten. Under **Select Person or Anonymous** skriver du giverens navn i søkefeltet for å finne vedkommende, eller klikker **Anonymous**. (Å klikke **Add Donation** øverst på siden hopper til dette panelet.)
2. Etter at du har valgt en person, viser skjemaet feltene **Date** (starter på batchdatoen), **Method** (Check, Cash, Card eller In-Kind), **Fund** (vises når menigheten din har mer enn ett fond), **Memo (prints on statement)**, **Notes (internal)**, **Amount** og **Check #** (eller **Last 4 digits** for kortgaver, eller **Item** for å beskrive en gave i naturalier; kontantgaver har ikke et detaljfelt). Klikk **Change** ved siden av giverens navn for å velge noen andre.
3. Fyll inn detaljene og klikk **Add Donation** (eller trykk Enter). Hvis beløpet er tomt eller null, ber skjemaet deg om å skrive inn et beløp større enn null i stedet for å lagre.
4. Gaven legges til i gavelisten, og skjemaet nullstilles slik at du kan legge inn neste. Datoen, metoden, fondet, memoet og notatene beholder verdiene du har satt, så en stabel med lignende sjekker krever bare giver, beløp og sjekknummer.

Datoen starter alltid på batchdatoen når du åpner en batch. Hvis du endrer den, følger den nye datoen med til neste gave du legger inn i batchen – både i innleggingspanelet og i den fullstendige gaveeditoren – til du endrer den igjen eller forlater batchen.

:::tip Memo eller Notes?
**Memo** skrives ut på giverens gaveoversikt og kvittering, ved siden av gaven. Bruk det til det giveren bør se, for eksempel formålet med en øremerket gave («Ungdomstur»). **Notes** er bare for personalet ditt og skrives aldri ut. Når noen gir på nett, lagres det de skriver i memo-feltet på giveskjemaet, som gavens memo.
:::

:::info
Hvis batchen er [lukket](batches.md#closing-and-reopening-a-batch), er innleggingspanelet og lenkene **Edit** skjult for alle uten **Edit Donations**, og en melding øverst i batchen sier at den er lukket. Be noen med **Edit Donations** om å gjenåpne den.
:::

:::tip
Du kan raskt legge inn flere gaver på rad uten å forlate batchsiden. Skjemaet nullstilles etter hver registrering, slik at du kan gå effektivt gjennom en stabel med sjekker eller konvolutter.
:::

## Importere gaver fra en CSV-fil {#importing-donations-from-a-csv-file}

Hvis gavene dine allerede ligger i et regneark – for eksempel en eksport fra et annet giving-system eller telleteamets tellingsark – kan du importere dem til en batch i stedet for å skrive inn hver enkelt.

1. Åpne batchen og klikk **Import CSV** øverst på siden. (Knappen vises når du kan endre batchen og menigheten din har minst ett [fond](funds.md).)
2. Klikk **Choose CSV File** og velg filen. Filen må ha en overskriftsrad, og kolonnene kan stå i hvilken som helst rekkefølge:
   - **Amount** (påkrevd; `Total` fungerer også) – valutasymboler og komma ignoreres, så `$1,250.00` er greit. Beløpet må være større enn null.
   - **Date** – bruk et format som `2026-10-25` eller `10/25/2026`. Hvis feltet er tomt, brukes batchdatoen.
   - **Fund** – fondets navn, uten hensyn til store og små bokstaver. Hvis feltet er tomt, brukes ditt første fond.
   - **Method** – **Check**, **Cash**, **Card** eller **In-Kind**. Hvis feltet er tomt, brukes **Check**.
   - **Check Number** – sjekknummeret (eller annen betalingsdetalj).
   - **Notes**
   - **Email**, **Name**, eller **First Name** og **Last Name** – brukes til å finne giveren blant personene i databasen din. Et navn skrevet som «Smith, John» leses som «John Smith».
3. Gjennomgå forhåndsvisningen. Hver rad viser linjenummeret, giveren fra filen, **Match**, fondet og beløpet:
   - Et personnavn betyr at giveren ble funnet. B1 søker først på e-post, deretter på eksakt navn, og bare når nøyaktig én person passer.
   - **Not found — anonymous** betyr at ingen enkelt treff ble funnet. Gaven importeres som anonym, og «Imported as:» med giverens navn legges til i notatene, slik at du kan tilordne den senere.
   - En rød melding som **Invalid amount**, **Unknown fund**, **Unknown method** eller **Invalid date** betyr at raden hoppes over. Rett filen og velg den på nytt for å inkludere den.
4. Klikk **Import** (knappen viser hvor mange rader som vil bli importert). Gavene legges til i batchen.

:::tip
Etter importen bruker du **Edit** på en anonym gave for å velge riktig person. Notatet «Imported as:» forteller deg hvem filen sa at giveren var.
:::

## Registrere en gave fra en persons profil {#logging-a-gift-from-a-persons-record}

For å registrere én enkelt gave uten å åpne en batch, åpner du giverens post i **People** og klikker **Log a gift** (i giving-oversikten, eller i personens giving-visning).

1. Angi **Date** og **Amount**.
2. Velg **Fund** og **Method** (Check, Cash, Card eller In-Kind), og skriv inn **Check #**, **Last 4 digits** eller **Item** (for gaver i naturalier) om nødvendig.
3. Legg eventuelt til **Notes**, og klikk deretter **Save**.

Gaven lagres i batchen for den datoen. Hvis det ikke finnes noen batch for datoen ennå, opprettes en automatisk og får datoen som navn.

## Fordele en gave på flere fond {#splitting-a-donation-across-multiple-funds}

Noen ganger gir en giver til flere fond i én transaksjon. Slik håndterer du det:

1. Under innleggingspanelet klikker du lenken til **full donation editor** (eller klikker **Edit** på en eksisterende gaverad). En ny gave starter på batchdatoen.
2. I den fullstendige editoren legger du inn et beløp og et fond, og klikker deretter **Add More** for å legge til et nytt fond og beløp. Totalen beregnes ut fra beløpene per fond.
3. Klikk **Save**. En gave uten beløp i noe fond lagres ikke; editoren ber deg om et beløp større enn null.

:::info
Å fordele gaver på flere fond er vanlig når en giver skriver én sjekk til flere formål, for eksempel Generelt fond og Misjon.
:::

## Redigere eller fjerne gaver {#editing-or-removing-donations}

For å redigere en gave klikker du på knappen **Edit** på raden i batchen. Du kan endre datoen, beløpet, fondet, betalingsmetoden (Check, Cash, Card eller In-Kind) eller andre detaljer, inkludert **Memo** og **Notes**. For en gave i naturalier merker editoren detaljfeltet **Item**, slik at du kan beskrive hva som ble gitt. Klikk **Save** når du er ferdig.

### Flytte en gave til en annen batch {#moving-a-gift-to-another-batch}

Hvis en gave ble lagt inn i feil batch, kan du flytte den i stedet for å slette den og skrive den inn på nytt:

1. Klikk **Edit** på gavens rad.
2. I nedtrekkslisten **Batch** velger du batchen den hører til. Listen viser hver batchs dato og navn, nyeste først. Lukkede batcher vises ikke, bortsett fra gavens nåværende batch.
3. Klikk **Save**.

Gaven forlater den nåværende batchen og vises i den du valgte, og totalene for begge batchene oppdateres. Å flytte en gave er en redigering, så det starter ikke en **Donation · Created**-[arbeidsflyt](../serving/workflows.md#triggers) slik det ville gjort om du registrerte den på nytt.

:::tip
Linjen under batchnavnet øverst på siden oppdateres automatisk og viser batchdatoen, antall gaver og det samlede beløpet i dollar når du legger til eller endrer registreringer. Bruk den til å avstemme mot innskuddsseddelen din.
:::

## Refundere en gave {#refunding-a-donation}

Hvis en giver ble belastet ved en feil, eller ber om pengene tilbake, kan du refundere en fullført gave direkte fra redigeringsskjermen – uten å gå til betalingsløsningens dashbord.

1. Åpne gaven og klikk **Edit**.
2. Klikk knappen **Refund** ved siden av Delete nederst i skjemaet.
3. Bekreft dialogen: «Refund this donation in full through the payment gateway? This cannot be undone.»

Gaven refunderes i sin helhet gjennom den opprinnelige betalingsløsningen og merkes **Refunded** i gavelistene dine.

:::warning
Refusjoner gjelder bare hele beløp – det finnes ingen måte å refundere et delbeløp fra B1 Admin. Refusjonen kan heller ikke angres når den er bekreftet.
:::

:::info
Knappen **Refund** vises bare for gaver som er betalt på nett (de har en transaksjon i betalingsløsningen) og fortsatt har status **Complete**. Manuelt registrerte gaver (kontanter, sjekk) har ingen betalingstransaksjon å refundere – rediger eller slett dem i stedet.
:::

## Skrive ut en kvittering for én gave {#printing-a-receipt-for-one-gift}

Når noen leverer inn en sjekk, betaler for et arrangement eller en T-skjorte, eller en besøkende organisasjon kommer med en gave, kan du skrive ut en kvittering for akkurat den gaven i stedet for for en hel batch eller en årsoversikt.

1. Åpne batchen som inneholder gaven.
2. Klikk **Receipt** ved siden av **Edit** på gavens rad. Du kan også klikke **Receipt** nederst i skjemaet Edit Donation.
3. Klikk **Print**, eller **Close** for å gå tilbake.

Kvitteringen bruker samme oppsett som gaveoversikten: menigheten din og giveren (eller «Anonymous»), gavens dato og metode, hvert fond og beløp, gavens memo (hvis den har ett), Giving Note og kvitteringsblokken fra skatteetaten hvis du har angitt et **Statement format** (se [Gaveoversikter](giving-statements.md)). Kvitteringsnummeret i den blokken er gavens ID.

:::info
Teksten «no goods or services» skrives bare ut når alle fond på gaven er merket som skattefradragsberettiget. Hvis noen del av gaven gikk til et fond som ikke er skattefradragsberettiget, for eksempel et arrangementsgebyr eller et kjøp, utelates den teksten, slik at kvitteringen leses som en betaling og ikke som en gave til et veldedig formål.
:::

:::tip
Nettgaver får allerede en automatisk takke-e-post, så kvitteringen er mest nyttig for gaver du legger inn for hånd.
:::

## Neste steg {#next-steps}

- Gå gjennom registreringene dine med [Gaverapporter](donation-reports.md) for å kontrollere at de er riktige
- Ved årsslutt lager du [gaveoversikter](giving-statements.md) for givere
