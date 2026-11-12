---
title: "Betalte påmeldinger"
description: "Sett opp betalte påmeldinger til hendelser i B1 Admin: prissatte deltakertyper, tilleggsvalg, rabattkoder, ventelister og innkreving av betaling via menighetens giveleverandør."
---

# Betalte påmeldinger

<div class="article-intro">

Påmelding til hendelser kan gå lenger enn en enkel deltakerteller. Du kan definere prissatte deltakertyper (for eksempel voksen og barn), tilby valgfrie tilleggsvalg med egne priser og antall, lage rabattkoder, og ta imot betaling ved påmelding via menighetens eksisterende giveleverandør. Når en hendelse blir full, holder en valgfri venteliste interesserte medlemmer i kø og flytter dem opp automatisk etter hvert som plasser blir ledige.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding på hendelsen først – se [Opprette kalendere](./creating-calendars.md#enabling-event-registration)
- For å ta imot betalinger på nett må menigheten din ha [nettbasert giving satt opp](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis hendelser trenger ikke noe oppsett for giving. Uten nettbasert giving fungerer betalte påmeldinger fortsatt, men folk betaler menigheten direkte – se [Menigheter uten nettbasert giving](#churches-without-online-giving).

</div>

## Åpne innstillingene for påmelding {#opening-registration-settings}

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Calendars > Registrations**, og klikker på hendelsen din (eller klikker på hendelsen i kalenderen og velger **Manage Registrations**).
2. Klikk **Edit settings**. Kortet **Registration Settings** viser grunnleggende innstillinger – **Enable Registration**, **Capacity**, **Enable Waitlist**, **Registration Opens/Closes**, **Tags** og **Registration Questions** – med knappen **Save Settings**.
3. Under de grunnleggende innstillingene finner du tre seksjoner som kan utvides: **Attendee Types**, **Selections** og **Discount Codes**. Hver har sin egen knapp **Save**, separat fra **Save Settings**. B1 varsler deg hvis du forsøker å forlate siden med ulagrede endringer i dem. Klikk **Back to Registrations** for å gå tilbake til deltakerlisten.

## Deltakertyper {#attendee-types}

Deltakertyper lar deg ta ulike priser for ulike typer deltakere – og begrense hver type for seg.

1. Utvid seksjonen **Attendee Types** og klikk **Add Type**.
2. Skriv inn et **Name** (f.eks. «Voksen», «Barn», «Elev»).
3. Angi en **Price**. Bruk 0 for en gratis type.
4. Angi eventuelt en **Capacity** for bare denne typen (f.eks. bare 20 plasser for barn). La feltet stå tomt for ingen grense per type.
5. Angi eventuelt **Sort** for å styre rekkefølgen typene vises i.
6. Klikk **Save**.

For å fjerne en lagret type klikker du på slettikonet og bekrefter; den fjernes med én gang. Tilleggsvalg og rabattkoder fjernes på samme måte.

Under påmeldingen velger hver deltaker en type; typer som er utsolgt, vises som **Sold out** og kan ikke velges. Deltakerlisten viser hver deltakers type og løpende antall per type.

## Tilleggsvalg {#selections}

Tilleggsvalg er valgfrie, prissatte tillegg – T-skjorter, måltidspakker, oppgraderinger til aktiviteter.

1. Utvid seksjonen **Selections** og klikk **Add Selection**.
2. Skriv inn et **Name**, en valgfri **Description** og en **Price** (0 vises som «Free»).
3. Angi eventuelt en **Capacity** (totalt tilgjengelig på tvers av alle påmeldinger) og en **Max Qty** (det største antallet én påmelding kan bestille).
4. Klikk **Save**.

Påmeldte velger antall under påmeldingen, og totalene telles mot kapasiteten, slik at du aldri selger for mye.

## Rabattkoder {#discount-codes}

1. Utvid seksjonen **Discount Codes** og klikk **Add Discount Code**.
2. Skriv inn **Code** som de påmeldte skal skrive inn.
3. Velg **Type** – **Percent** eller **Amount** – og angi **Value**.
4. Begrens koden eventuelt med **Start Date** / **End Date**, **Min Members** (minimum antall deltakere på påmeldingen) og **Max Uses**.
5. Klikk **Save**.

Hver kode viser en teller **Uses**, slik at du ser hvor ofte den er brukt. De påmeldte får umiddelbar tilbakemelding når de bruker en kode – inkludert tydelige meldinger når en kode har utløpt, ikke har startet ennå, eller krever flere deltakere.

## Venteliste {#waitlist}

Slå på **Enable Waitlist** i kortet Registration Settings. Når hendelsen når kapasiteten:

- Nye påmeldte får tilbud om en plass på ventelisten i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de står på ventelisten).
- Når noen avbestiller, blir den eldste påmeldingen på ventelisten **flyttet opp automatisk**, og får en e-post om at en plass er blitt ledig. Hvis de skylder et beløp, lenker e-posten dem til [Mine påmeldinger](../../b1-church/events/my-registrations.md) på menighetens B1-side, der de kan betale.
- Du kan flytte opp noen manuelt når som helst med handlingen **Promote** på en rad på ventelisten – nyttig etter at du har økt kapasiteten for hendelsen.

:::info
Påmeldinger som er flyttet opp, forblir *ventende* til eventuelt beløp er betalt. Når betalingen er gjort (eller det ikke er noe å betale), bekreftes påmeldingen.
:::

## Deltakerlisten {#the-registration-roster}

Åpne en hendelse fra siden Registrations for å se alle påmeldinger. Kortets tittel viser hvor mange påmeldinger som har en plass i forhold til kapasiteten (for eksempel *Registrations (18 / 20)*). Bare ventende og bekreftede påmeldinger teller; når folk står på ventelisten, legges antallet til i tittelen (for eksempel *· 3 waitlisted*), og det samme antallet vises under kapasitetslinjen. Tallet over kapasitetslinjen teller **personer** i stedet for påmeldinger – alle på hver ventende eller bekreftede påmelding – slik at en familie på fire telles som fire. Selve kapasitetsgrensen teller fortsatt påmeldinger. Tabellen viser **Name**, **Members**, **Type** (hver deltakers type), **Paid / Total** (med en saldoadvarsel når det fortsatt skylles penger), **Status** og **Date**, pluss brikker med antall per type over tabellen.

- Klikk på detaljikonet på en rad for å åpne dialogen **Registration Details** – medlemmer, valg, betalt/saldo og en tabell **Payments** som lister hver belastning (beløp, metode, dato).
- **Export CSV** laster ned hele deltakerlisten med kolonner for medlemmer, deltakertyper, valg, betalt/totalt/saldo, status og én kolonne per påmeldingsspørsmål.
- **Add Attendee** registrerer en påmelding gjort på papir eller telefon for en hvilken som helst person i menigheten din. Velg personen og – for en betalt hendelse – deltakertypen. Kortet deres belastes ikke: en betalt påmelding lagres som **pending** med hele beløpet som utestående saldo. Hvis menigheten din har nettbasert giving, kan personen betale via [Mine påmeldinger](../../b1-church/events/my-registrations.md); ellers må du ta imot betalingen personlig. Du trenger tillatelsen Registrations Edit for å legge til deltakere.

:::info
Refusjoner behandles ikke i B1. Hvis du må refundere en avbestilt betalt påmelding, utfører du refusjonen i din giveleverandørs dashbord (f.eks. Stripe).
:::

## Hvordan betaling fungerer {#how-payment-works}

Betalinger går gjennom samme giveløsning som menigheten din allerede bruker til gaver – kortopplysninger sendes direkte til leverandøren og berører aldri B1s servere. Priser beregnes alltid på serveren ut fra de konfigurerte typene, valgene og rabattkodene dine, slik at en påmeldt ikke kan manipulere totalbeløpet. Innloggede medlemmer kan betale med et lagret kort. Gjester legger inn kort ved kassen og må krysse av for **I'm not a robot** før de betaler.

### Menigheter uten nettbasert giving {#churches-without-online-giving}

Hvis menigheten din ikke har satt opp en giveleverandør, kan betalte hendelser fortsatt ta imot påmeldinger. Betalingssteget forteller de påmeldte at nettbetaling ikke er tilgjengelig, og at de kan betale menigheten direkte. Knappen **Register and Pay Later** lagrer påmeldingen. Den lagres som **pending** med hele beløpet som utestående saldo, og den vises i deltakerlisten med en saldoadvarsel. Ta inn pengene på den måten menigheten vanligvis gjør.

:::info
B1 har ingen måte å merke en betaling utenfor nettet som mottatt. Utestående saldo forblir i deltakerlisten og på den påmeldtes kort under [Mine påmeldinger](../../b1-church/events/my-registrations.md) også etter at du har tatt imot pengene, så du må føre din egen oversikt over hvem som har betalt.
:::

## Relaterte artikler {#related-articles}

- [Opprette kalendere](./creating-calendars.md#enabling-event-registration) — aktiver påmelding og de grunnleggende innstillingene
- [Oppsett av nettbasert giving](../donations/online-giving-setup.md) — konfigurer betalingsløsningen som brukes ved kassen
- [Melde seg på hendelser](../../b1-church/events/registering.md) — hva medlemmene ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations.md) — hvordan medlemmer betaler saldo og redigerer påmeldinger
