---
title: "Betalte påmeldinger"
---

# Betalte påmeldinger

<div class="article-intro">

Påmelding til arrangementer kan være mer enn en enkel telling av deltakere. Du kan definere prissatte deltakertyper (for eksempel voksen og barn), tilby valgfrie tillegg med egne priser og antall, opprette rabattkoder og ta betalt ved påmelding via menighetens eksisterende giveleverandør. Når et arrangement blir fullt, kan en valgfri venteliste holde interesserte medlemmer i kø og flytte dem opp automatisk etter hvert som plasser blir ledige.

</div>

## Opplæringsvideo

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding på arrangementet først -- se [Opprette kalendere](creating-calendars#enabling-event-registration)
- For å ta betaling på nett må menigheten din ha [online giving satt opp](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratisarrangementer trenger ikke noe oppsett for giving. Betalte påmeldinger fungerer også uten online giving, men da betaler folk direkte til menigheten -- se [Menigheter uten online giving](#churches-without-online-giving).

</div>

## Åpne innstillingene for påmelding

1. I B1 Admin åpner du [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Calendars > Registrations** og åpner arrangementet ditt (eller åpner arrangementet fra kalenderen).
2. Kortet **Registration Settings** viser det grunnleggende -- **Enable Registration**, **Capacity**, **Registration Opens/Closes**, **Tags** og **Registration Questions**.
3. Under det grunnleggende finner du tre aksordeoner: **Attendee Types**, **Selections** og **Discount Codes**.

## Deltakertyper

Med deltakertyper kan du ta ulike priser for ulike typer deltakere, og begrense hver type separat.

1. Utvid aksordeonet **Attendee Types** og klikk på **Add Type**.
2. Skriv inn et **Name** (for eksempel «Voksen», «Barn» eller «Student»).
3. Angi en **Price**. Bruk 0 for en gratis type.
4. Angi eventuelt en **Capacity** bare for denne typen (for eksempel bare 20 plasser for barn). La feltet stå tomt hvis typen ikke skal ha egen grense.
5. Klikk på **Save**.

Under påmeldingen velger hver deltaker en type. Typer som er utsolgt, vises som **Sold out** og kan ikke velges. Påmeldingsoversikten viser hver deltakers type og løpende antall per type.

## Tilvalg

Tilvalg er valgfrie tillegg med pris, for eksempel t-skjorter, måltidsordninger eller oppgraderinger av aktiviteter.

1. Utvid aksordeonet **Selections** og klikk på **Add Selection**.
2. Skriv inn et **Name**, en valgfri **Description** og en **Price** (0 vises som «Free»).
3. Angi eventuelt en **Capacity** (totalt tilgjengelig på tvers av alle påmeldinger) og en **Max Qty** (det høyeste antallet én påmelding kan bestille).
4. Klikk på **Save**.

Deltakerne velger antall under påmeldingen, og summene regnes mot kapasiteten, slik at du aldri selger mer enn det finnes.

## Rabattkoder

1. Utvid aksordeonet **Discount Codes** og klikk på **Add Discount Code**.
2. Skriv inn **Code** som deltakerne skal taste inn.
3. Velg **Type** -- **Percent** eller **Amount** -- og angi **Value**.
4. Begrens koden eventuelt med en **Start Date** / **End Date**, et **Min Members** (minimum antall deltakere på påmeldingen) og **Max Uses**.
5. Klikk på **Save**.

Hver kode viser en teller **Uses**, slik at du ser hvor ofte den er brukt. Deltakerne får umiddelbar tilbakemelding når de bruker en kode, også tydelige meldinger hvis koden er utløpt, ikke har startet ennå eller krever flere deltakere.

## Venteliste {#waitlist}

Slå på **Enable Waitlist** i kortet Registration Settings. Når arrangementet når kapasiteten:

- Nye påmeldte får et venteplass i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de står på venteliste).
- Når noen avmelder seg, blir den eldste påmeldingen på ventelisten **promoted automatically** (flyttet opp automatisk). Personen får en e-post om at en plass er blitt ledig. Hvis personen skylder et beløp, lenker e-posten til [Mine påmeldinger](../../b1-church/events/my-registrations) på menighetens B1-nettsted, der de kan betale.
- Du kan flytte en person opp manuelt når som helst med handlingen **Promote** på en rad på ventelisten. Dette er nyttig etter at du har økt kapasiteten for arrangementet.

:::info
Påmeldinger som er flyttet opp, står som *pending* til eventuelt beløp er betalt. Når betalingen er gjort (eller det ikke er noe å betale), bekreftes påmeldingen.
:::

## Påmeldingsoversikten {#the-registration-roster}

Åpne et arrangement fra siden Påmeldinger for å se alle påmeldinger. Korttittelen viser hvor mange påmeldinger som har en plass mot kapasiteten, for eksempel *Registrations (18 / 20)*. Bare påmeldinger med status pending og confirmed teller. Når personer står på venteliste, legges antallet til i tittelen (for eksempel *· 3 waitlisted*), og det samme antallet vises under kapasitetslinjen. Tabellen viser **Name**, **Members**, **Type** (hver deltakers type), **Paid / Total** (med en advarsel når det fortsatt skyldes beløp), **Status** og **Date**, i tillegg til antall per type som brikker over tabellen.

- Klikk på detaljikonet på en rad for å åpne dialogen **Registration Details** -- medlemmer, valg, betalt/saldo og en tabell **Payments** med alle belastninger (beløp, metode, dato).
- **Export CSV** laster ned hele oversikten med kolonner for medlemmer, deltakertyper, valg, betalt/totalt/saldo, status og én kolonne per spørsmål i påmeldingen.
- **Add Attendee** registrerer en påmelding gjort offline eller per telefon for en hvilken som helst person i menigheten din. Velg personen og, på et betalt arrangement, deltakertypen. Det belastes ikke noe kort: en betalt påmelding lagres som **pending** med hele beløpet som utestående saldo. Hvis menigheten har online giving, kan personen betale via [Mine påmeldinger](../../b1-church/events/my-registrations). Ellers må du ta imot betalingen personlig. Du trenger tillatelsen Registrations Edit for å legge til deltakere.

:::info
Refusjoner behandles ikke i B1. Hvis du må refundere en avlyst betalt påmelding, gjør du refusjonen i dashbordet til giveleverandøren din (for eksempel Stripe).
:::

## Slik fungerer betalingen

Betalinger går gjennom den samme giveløsningen som menigheten allerede bruker for gaver. Kortopplysningene går direkte til leverandøren og kommer aldri innom B1-serverne. Priser beregnes alltid på serveren ut fra de konfigurerte typene, tilvalgene og rabattkodene, slik at en deltaker ikke kan endre totalbeløpet. Innloggede medlemmer kan betale med et lagret kort. Gjester oppgir et kort ved kassen og må krysse av for **I'm not a robot** før de betaler.

### Menigheter uten online giving {#churches-without-online-giving}

Hvis menigheten din ikke har satt opp en giveleverandør, kan betalte arrangementer likevel ta imot påmeldinger. Betalingssteget forteller deltakerne at betaling på nett ikke er tilgjengelig, og at de kan betale menigheten direkte. Knappen **Register and Pay Later** lagrer påmeldingen. Den lagres som **pending** med hele beløpet som utestående saldo, og den vises i påmeldingsoversikten med en saldoadvarsel. Samle inn pengene på den måten menigheten vanligvis gjør.

:::info
B1 har ingen måte å markere en betaling utenfor nettet som mottatt. Saldoen forblir i påmeldingsoversikten og på kortet til deltakeren under [Mine påmeldinger](../../b1-church/events/my-registrations) selv etter at du har tatt imot betalingen, så før du selv har oversikt over hvem som har betalt.
:::

## Relaterte artikler

- [Opprette kalendere](creating-calendars#enabling-event-registration) -- aktiver påmelding og de grunnleggende innstillingene
- [Oppsett av online giving](../donations/online-giving-setup.md) -- konfigurer betalingsløsningen som brukes ved kassen
- [Melde seg på arrangementer](../../b1-church/events/registering) -- hva medlemmer ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations) -- hvordan medlemmer betaler saldo og redigerer påmeldinger
