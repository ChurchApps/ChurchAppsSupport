---
title: "Betalte påmeldinger"
description: "Sett opp betalte arrangementspåmeldinger i B1 Admin: prisede deltakertyper, tilvalg, rabattkoder, ventelister og innkreving av betaling via giveleverandøren din."
---

# Betalte påmeldinger

<div class="article-intro">

Påmelding til arrangementer kan være mer enn en enkel oversikt over antall deltakere. Du kan definere prisede deltakertyper (for eksempel voksen og barn), tilby valgfrie tilvalg med egne priser og antall, lage rabattkoder, og ta imot betaling ved påmelding via menighetens eksisterende giveleverandør. Når et arrangement blir fullt, kan en valgfri venteliste holde interesserte medlemmer i kø og flytte dem opp automatisk etter hvert som plasser blir ledige.

</div>

## Opplæringsvideo

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding for arrangementet først -- se [Opprette kalendere](./creating-calendars.md#enabling-event-registration)
- For å ta imot betalinger på nett må menigheten din ha [nettbasert giving konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis arrangementer trenger ikke noe giving-oppsett. Uten nettbasert giving fungerer betalte påmeldinger fortsatt, men folk betaler menigheten direkte -- se [Menigheter uten nettbasert giving](#churches-without-online-giving).

</div>

## Åpne påmeldingsinnstillinger

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Kalendere > Påmeldinger** og åpner arrangementet ditt (eller åpner arrangementet fra kalenderen).
2. Kortet **Påmeldingsinnstillinger** viser det grunnleggende -- **Aktiver påmelding**, **Kapasitet**, **Påmelding åpner/stenger**, **Merkelapper** og **Påmeldingsspørsmål**.
3. Under det grunnleggende finner du tre aksordioner: **Deltakertyper**, **Tilvalg** og **Rabattkoder**.

## Deltakertyper

Med deltakertyper kan du ta forskjellige priser for ulike typer deltakere -- og begrense hver type for seg.

1. Utvid aksordionen **Deltakertyper** og klikk **Legg til type**.
2. Skriv inn et **navn** (for eksempel «Voksen», «Barn» eller «Elev»).
3. Angi en **pris**. Bruk 0 for en gratis type.
4. Du kan eventuelt angi en **kapasitet** for bare denne typen (for eksempel bare 20 plasser for barn). La feltet stå tomt for ingen grense per type.
5. Klikk **Lagre**.

Under påmeldingen velger hver deltaker en type; utsolgte typer vises som **Utsolgt** og kan ikke velges. Deltakerlisten viser typen til hver deltaker og løpende antall per type.

## Tilvalg

Tilvalg er valgfrie tilleggsprodukter med pris -- T-skjorter, måltidsplaner, oppgraderinger av aktiviteter.

1. Utvid aksordionen **Tilvalg** og klikk **Legg til tilvalg**.
2. Skriv inn et **navn**, eventuelt en **beskrivelse**, og en **pris** (0 vises som «Gratis»).
3. Du kan eventuelt angi en **kapasitet** (totalt tilgjengelig på tvers av alle påmeldinger) og en **maks antall** (det mest én påmelding kan bestille).
4. Klikk **Lagre**.

Deltakerne velger antall under påmeldingen, og totalene teller mot kapasiteten, slik at du aldri selger for mye.

## Rabattkoder

1. Utvid aksordionen **Rabattkoder** og klikk **Legg til rabattkode**.
2. Skriv inn **koden** som deltakerne skal taste inn.
3. Velg **typen** -- **Prosent** eller **Beløp** -- og angi **verdien**.
4. Du kan eventuelt begrense koden med en **startdato** / **sluttdato**, et **minimum antall deltakere** (minst antall deltakere på påmeldingen) og **maks bruk**.
5. Klikk **Lagre**.

Hver kode viser et **antall bruk**, slik at du kan se hvor ofte den er brukt. Deltakerne får umiddelbar tilbakemelding når de bruker en kode -- inkludert tydelige meldinger når en kode er utløpt, ikke har startet ennå, eller krever flere deltakere.

## Venteliste {#waitlist}

Slå på **Aktiver venteliste** i kortet Påmeldingsinnstillinger. Når arrangementet når kapasiteten:

- Nye deltakere får tilbud om en plass på ventelisten i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de står på ventelisten).
- Når noen avbestiller, blir den eldste påmeldingen på ventelisten **flyttet opp automatisk**, og får en e-post om at en plass er blitt ledig. Hvis de skylder et beløp, lenker e-posten dem til [Mine påmeldinger](../../b1-church/events/my-registrations.md) på menighetens B1-nettsted, der de kan betale.
- Du kan flytte opp noen manuelt når som helst med handlingen **Flytt opp** på en rad på ventelisten -- nyttig etter at du har økt kapasiteten for arrangementet.

:::info
Påmeldinger som er flyttet opp, forblir *ventende* til eventuelt beløp er betalt; når betalingen er gjort (eller det ikke er noe å betale), blir de bekreftet.
:::

## Deltakerlisten {#the-registration-roster}

Åpne et arrangement fra siden Påmeldinger for å se alle påmeldingene. Tittelen på kortet viser hvor mange påmeldinger som har en plass mot kapasiteten (for eksempel *Påmeldinger (18 / 20)*). Bare ventende og bekreftede påmeldinger teller; når folk står på ventelisten, legges antallet til i tittelen (for eksempel *· 3 på venteliste*), og det samme antallet vises under fremdriftslinjen for kapasitet. Det største tallet over fremdriftslinjen for kapasitet teller **personer** i stedet for påmeldinger -- alle på hver ventende eller bekreftede påmelding -- slik at en familie på fire teller som fire. Kapasitetsgrensen i seg selv teller fortsatt påmeldinger. Tabellen viser **Navn**, **Medlemmer**, **Type** (typen til hver deltaker), **Betalt / Totalt** (med en advarsel om balanse når det fortsatt skylles penger), **Status** og **Dato**, pluss brikker med antall per type over tabellen.

- Klikk på detaljikonet på en rad for å åpne dialogen **Påmeldingsdetaljer** -- medlemmer, tilvalg, betalt/balanse og en tabell for **Betalinger** med hver betaling (beløp, metode, dato).
- **Eksporter CSV** laster ned hele deltakerlisten med kolonner for medlemmer, deltakertyper, tilvalg, betalt/totalt/balanse, status og én kolonne per påmeldingsspørsmål.
- **Legg til deltaker** registrerer en påmelding gjort på papir eller telefon for en hvilken som helst person i menigheten. Velg personen og, på et betalt arrangement, deltakertypen. Det belastes ikke noe kort: en betalt påmelding lagres som **ventende** med hele beløpet som skyldig balanse. Hvis menigheten din har nettbasert giving, kan personen betale fra [Mine påmeldinger](../../b1-church/events/my-registrations.md); ellers må du ta imot betalingen personlig. Du trenger tillatelsen Påmeldinger -- Rediger for å legge til deltakere.

:::info
Refusjoner behandles ikke i B1. Hvis du må refundere en avbestilt betalt påmelding, gjør du refusjonen fra giveleverandørens dashbord (for eksempel Stripe).
:::

## Hvordan betaling fungerer

Betalinger går gjennom den samme giving-gatewayen som menigheten din allerede bruker for donasjoner -- kortopplysninger går rett til leverandøren og havner aldri på B1s servere. Priser beregnes alltid på serveren ut fra de konfigurerte typene, tilvalgene og rabattkodene dine, slik at en deltaker ikke kan manipulere totalbeløpet. Innloggede medlemmer kan betale med et lagret kort. Gjester legger inn kortet ved betaling og må krysse av for **Jeg er ikke en robot** før de betaler.

### Menigheter uten nettbasert giving {#churches-without-online-giving}

Hvis menigheten din ikke har satt opp en giveleverandør, kan betalte arrangementer likevel ta imot påmeldinger. Betalingssteget forteller deltakerne at betaling på nett ikke er tilgjengelig, og at de kan betale menigheten direkte. En knapp for **Meld deg på og betal senere** lagrer påmeldingen. Den lagres som **ventende** med hele beløpet som skyldig balanse, og den vises i deltakerlisten med en balanseadvarsel. Hent inn pengene på den måten menigheten din normalt gjør.

:::info
B1 har ingen måte å merke en betaling utenfor nettet som mottatt. Balansen forblir på deltakerlisten og på deltakerens kort under [Mine påmeldinger](../../b1-church/events/my-registrations.md) etter at du har tatt imot pengene, så før din egen oversikt over hvem som har betalt.
:::

## Relaterte artikler

- [Opprette kalendere](./creating-calendars.md#enabling-event-registration) -- aktiver påmelding og grunnleggende innstillinger
- [Nettbasert giving-oppsett](../donations/online-giving-setup.md) -- konfigurer betalingsgatewayen som brukes ved betaling
- [Meld deg på arrangementer](../../b1-church/events/registering.md) -- hva medlemmene ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations.md) -- hvordan medlemmer betaler balanser og redigerer påmeldinger
