---
title: "Betalte påmeldinger"
---

# Betalte påmeldinger

<div class="article-intro">

Arrangementspåmelding kan være mer enn en enkel opptelling. Du kan definere deltakertyper med ulike priser (for eksempel voksen og barn), tilby valgfrie tilvalg med egne priser og antall, opprette rabattkoder og ta betalt ved påmelding via menighetens eksisterende betalingsleverandør for gaver. Når et arrangement er fullt, kan en valgfri venteliste holde interesserte medlemmer i kø og automatisk flytte dem opp når det blir ledige plasser.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding på arrangementet først -- se [Opprette kalendere](creating-calendars#enabling-event-registration)
- For å ta imot betalinger må menigheten ha [nettbasert giving konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratisarrangementer krever ingen oppsett av giving.

</div>

## Åpne påmeldingsinnstillingene

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søkefeltet øverst til venstre), velg **Kalendere > Påmeldinger** og åpne arrangementet ditt (eller åpne arrangementet fra kalenderen).
2. Kortet **Påmeldingsinnstillinger** viser det grunnleggende -- **Aktiver påmelding**, **Kapasitet**, **Påmeldingen åpner/stenger**, **Etiketter** og **Påmeldingsspørsmål**.
3. Under det grunnleggende finner du tre trekkspillseksjoner: **Deltakertyper**, **Tilvalg** og **Rabattkoder**.

## Deltakertyper

Med deltakertyper kan du ta ulik pris for ulike typer deltakere -- og sette en egen kapasitetsgrense for hver av dem.

1. Utvid trekkspillet **Deltakertyper** og klikk på **Legg til type**.
2. Skriv inn et **navn** (for eksempel «Voksen», «Barn», «Student»).
3. Angi en **pris**. Bruk 0 for en gratis type.
4. Du kan angi en **kapasitet** bare for denne typen (for eksempel bare 20 barneplasser). La feltet stå tomt hvis det ikke skal være noen grense per type.
5. Klikk på **Lagre**.

Under påmeldingen velger hver deltaker en type. Typer som er utsolgt, vises som **Utsolgt** og kan ikke velges. Deltakerlisten viser hver deltakers type og løpende antall per type.

## Tilvalg

Tilvalg er valgfrie tillegg med pris -- t-skjorter, måltidspakker, oppgraderinger av aktiviteter.

1. Utvid trekkspillet **Tilvalg** og klikk på **Legg til tilvalg**.
2. Skriv inn et **navn**, en valgfri **beskrivelse** og en **pris** (0 vises som «Gratis»).
3. Du kan angi en **kapasitet** (totalt antall tilgjengelig på tvers av alle påmeldinger) og et **maks. antall** (det meste én påmelding kan bestille).
4. Klikk på **Lagre**.

Deltakerne velger antall under påmeldingen, og totalene regnes mot kapasiteten, slik at du aldri selger flere enn du har.

## Rabattkoder

1. Utvid trekkspillet **Rabattkoder** og klikk på **Legg til rabattkode**.
2. Skriv inn **koden** deltakerne skal taste inn.
3. Velg **type** -- **Prosent** eller **Beløp** -- og **verdi**.
4. Du kan begrense koden med en **startdato** / **sluttdato**, et **minimumsantall medlemmer** (minste antall deltakere i påmeldingen) og **maks. antall bruk**.
5. Klikk på **Lagre**.

Hver kode viser et **Bruk**-tall, slik at du kan se hvor ofte den er brukt. Deltakerne får umiddelbar tilbakemelding når de bruker en kode -- med tydelige meldinger hvis koden er utløpt, ikke har startet ennå eller krever flere deltakere.

## Venteliste

Slå på **Aktiver venteliste** i kortet Påmeldingsinnstillinger. Når arrangementet er fullt:

- Nye deltakere får tilbud om en plass på ventelisten i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de står på venteliste).
- Når noen melder seg av, blir den eldste påmeldingen på ventelisten **flyttet opp automatisk**, og vedkommende får en e-post om at det er blitt en ledig plass. Hvis de skylder et beløp, inneholder e-posten en lenke til å fullføre betalingen.
- Du kan flytte opp noen manuelt når som helst med handlingen **Flytt opp** på en rad på ventelisten -- nyttig etter at du har økt kapasiteten på arrangementet.

:::info
Opprykkede påmeldinger forblir *ventende* til et eventuelt utestående beløp er betalt. Når det er betalt (eller det ikke er noe å betale), blir de bekreftet.
:::

## Deltakerlisten

Åpne et arrangement fra Påmeldinger-siden for å se alle påmeldinger. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltakers type), **Betalt / Totalt** (med en saldoadvarsel når det fortsatt skyldes penger), **Status** og **Dato**, i tillegg til brikker med antall per type over tabellen.

- Klikk på detaljikonet på en rad for å åpne dialogen **Påmeldingsdetaljer** -- medlemmer, tilvalg, betalt/saldo og en **Betalinger**-tabell som viser hver belastning (beløp, metode, dato).
- **Eksporter CSV** laster ned hele deltakerlisten med kolonner for medlemmer, deltakertyper, tilvalg, betalt/totalt/saldo, status og én kolonne per påmeldingsspørsmål.
- **Legg til deltaker** lar deg fortsatt registrere påmeldinger utenfor nettet manuelt.

:::info
Refusjoner behandles ikke i B1. Hvis du må refundere en kansellert betalt påmelding, gjør du det fra betalingsleverandørens dashbord (for eksempel Stripe).
:::

## Slik fungerer betalingen

Betalinger går gjennom den samme betalingsgatewayen som menigheten allerede bruker til gaver -- kortopplysningene går rett til leverandøren og berører aldri B1s servere. Prisene beregnes alltid på serveren ut fra de konfigurerte typene, tilvalgene og rabattkodene, slik at ingen kan tukle med totalbeløpet. Innloggede medlemmer kan betale med et lagret kort, mens gjester taster inn et kort ved kassen.

## Relaterte artikler

- [Opprette kalendere](creating-calendars#enabling-event-registration) — aktiver påmelding og de grunnleggende innstillingene
- [Oppsett av nettbasert giving](../donations/online-giving-setup.md) — konfigurer betalingsgatewayen som brukes ved betaling
- [Melde seg på arrangementer](../../b1-church/events/registering) — hva medlemmene ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations) — hvordan medlemmer betaler utestående beløp og redigerer påmeldinger
