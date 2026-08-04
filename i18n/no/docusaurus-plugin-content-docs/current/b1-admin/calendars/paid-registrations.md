---
title: "Betalte påmeldinger"
---

# Betalte påmeldinger

<div class="article-intro">

Arrangementspåmelding kan være mer enn en enkel deltakertelling. Du kan definere prissatte deltakertyper (som Voksen og Barn), tilby valgfrie tilleggsprodukter med egne priser og antall, opprette rabattkoder, og samle inn betaling ved påmelding gjennom menighetens eksisterende givertjeneste. Når et arrangement blir fullt, holder en valgfri venteliste interesserte medlemmer i kø og forfremmer dem automatisk etter hvert som plasser åpner seg.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding på arrangementet først -- se [Opprette kalendere](creating-calendars#enabling-event-registration)
- For å samle inn betalinger må menigheten din ha [nettbasert givertjeneste konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal, eller Kingdom Funding). Gratis arrangementer trenger ikke givertjeneste-oppsett.

</div>

## Åpne påmeldingsinnstillinger

1. I B1 Admin, gå til **Påmeldinger**-siden og åpne arrangementet ditt (eller åpne arrangementet fra kalenderen).
2. Kortet **Påmeldingsinnstillinger** viser det grunnleggende -- **Aktiver påmelding**, **Kapasitet**, **Påmelding åpner/stenger**, **Merkelapper**, og **Påmeldingsspørsmål**.
3. Under det grunnleggende er tre nedtrekksfelt: **Deltakertyper**, **Valg**, og **Rabattkoder**.

## Deltakertyper

Deltakertyper lar deg ta ulik pris for ulike typer deltakere -- og sette et eget tak for hver.

1. Utvid nedtrekksfeltet **Deltakertyper** og klikk **Legg til type**.
2. Skriv inn et **Navn** (f.eks. "Voksen", "Barn", "Student").
3. Sett en **Pris**. Bruk 0 for en gratis type.
4. Valgfritt: sett en **Kapasitet** for bare denne typen (f.eks. bare 20 Barn-plasser). La stå tomt for ingen grense per type.
5. Klikk **Lagre**.

Under påmelding velger hver deltaker en type; utsolgte typer vises som **Utsolgt** og kan ikke velges. Deltakerlisten viser hver deltakers type og løpende antall per type.

## Valg

Valg er valgfrie prissatte tilleggsprodukter -- T-skjorter, måltidsplaner, aktivitetsoppgraderinger.

1. Utvid nedtrekksfeltet **Valg** og klikk **Legg til valg**.
2. Skriv inn et **Navn**, valgfri **Beskrivelse**, og en **Pris** (0 vises som "Gratis").
3. Valgfritt: sett en **Kapasitet** (totalt tilgjengelig på tvers av alle påmeldinger) og en **Maks. antall** (det høyeste én påmelding kan bestille).
4. Klikk **Lagre**.

Deltakere velger antall under påmeldingen, og summene telles mot kapasiteten slik at du aldri overselger.

## Rabattkoder

1. Utvid nedtrekksfeltet **Rabattkoder** og klikk **Legg til rabattkode**.
2. Skriv inn **koden** deltakerne skal skrive inn.
3. Velg **Type** -- **Prosent** eller **Beløp** -- og verdien dens.
4. Valgfritt: begrens koden med en **Startdato** / **Sluttdato**, et **Min. antall medlemmer** (minste antall deltakere på påmeldingen), og **Maks. bruk**.
5. Klikk **Lagre**.

Hver kode viser et **Bruk**-antall slik at du kan se hvor ofte den er brukt. Deltakere får umiddelbar tilbakemelding når de bruker en kode -- inkludert tydelige meldinger når en kode har utløpt, ikke har startet ennå, eller krever flere deltakere.

## Venteliste

Slå på **Aktiver venteliste** i kortet Påmeldingsinnstillinger. Når arrangementet når full kapasitet:

- Nye deltakere tilbys en ventelisteplass i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de er på venteliste).
- Når noen avbestiller, blir den eldste ventelistepåmeldingen **forfremmet automatisk** og mottar en e-post om at en plass har åpnet seg. Hvis de skylder et beløp, lenker e-posten dem til å fullføre betalingen.
- Du kan forfremme noen manuelt når som helst med **Forfrem**-handlingen på en ventelisterad -- nyttig etter at du har hevet arrangementskapasiteten.

:::info
Forfremmede påmeldinger forblir *ventende* inntil eventuell saldo er betalt; betaling (eller ingenting å betale) bekrefter dem.
:::

## Påmeldingslisten

Åpne et arrangement fra Påmeldinger-siden for å se alle påmeldinger. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltakers type), **Betalt / Totalt** (med en saldoadvarsel når det fortsatt skyldes penger), **Status**, og **Dato**, pluss antallsbrikker per type over tabellen.

- Klikk detaljikonet på en rad for å åpne dialogen **Påmeldingsdetaljer** -- medlemmer, valg, betalt/saldo, og en **Betalinger**-tabell som lister hver belastning (beløp, metode, dato).
- **Eksporter CSV** laster ned hele deltakerlisten med kolonner for medlemmer, deltakertyper, valg, betalt/totalt/saldo, status, og én kolonne per påmeldingsspørsmål.
- **Legg til deltaker** lar deg fortsatt registrere offline-påmeldinger manuelt.

:::info
Refusjoner behandles ikke inne i B1. Hvis du trenger å refundere en avbestilt betalt påmelding, utsted refusjonen fra givertjenestens dashbord (f.eks. Stripe).
:::

## Hvordan betaling fungerer

Betalinger går gjennom den samme givertjenesten menigheten din allerede bruker for gaver -- kortopplysninger går rett til leverandøren og berører aldri B1s servere. Priser beregnes alltid på serveren ut fra dine konfigurerte typer, valg og rabattkoder, slik at en deltaker ikke kan manipulere totalsummen. Innloggede medlemmer kan betale med et lagret kort; gjester skriver inn et kort ved utsjekk.

## Relaterte artikler

- [Opprette kalendere](creating-calendars#enabling-event-registration) — aktiver påmelding og de grunnleggende innstillingene
- [Nettbasert givertjeneste-oppsett](../donations/online-giving-setup.md) — konfigurer betalingsleverandøren som brukes ved utsjekk
- [Melde seg på arrangementer](../../b1-church/events/registering) — hva medlemmer ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations) — hvordan medlemmer betaler saldo og redigerer påmeldinger
