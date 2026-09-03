---
title: "Betalte påmeldinger"
---

# Betalte påmeldinger

<div class="article-intro">

Arrangementpåmelding kan gå utover en enkel opptelling. Du kan definere priset deltakertypene (som Voksen og Barn), tilby valgfrie tillegg med sine egne priser og antall, opprette rabattkoder, og kreve inn betaling ved påmelding gjennom kirkens eksisterende giverprovider. Når et arrangement fylles opp, holder en valgfri venteliste interesserte medlemmer i kø og promoterer dem automatisk ettersom plasser åpnes.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Aktiver påmelding på arrangementet først — se [Opprette kalendere](creating-calendars#enabling-event-registration)
- For å kreve inn betalinger, trenger kirken din [nettgivning konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal, eller Kingdom Funding). Gratis arrangementer trenger ingen giveoppsett.

</div>

## Åpning av påmeldingsinnstillinger

1. Gå til **Påmeldinger**-siden i B1 Admin og åpne arrangementet (eller åpne arrangementet fra kalenderen).
2. **Påmeldingsinnstillinger**-kortet viser grunnleggende ting — **Aktiver påmelding**, **Kapasitet**, **Påmelding åpner/lukker**, **Merker**, og **Påmeldingsspørsmål**.
3. Under grunnleggende er det tre trekkspillharmonika: **Deltakertypene**, **Valg**, og **Rabattkoder**.

## Deltakertypene

Deltakertypene lar deg belaste ulike priser for ulike typer deltakere — og begrense hver enkelt separat.

1. Utvid **Deltakertypene** trekkspillharmonika og klikk **Legg til type**.
2. Skriv inn et **navn** (f.eks. "Voksen", "Barn", "Student").
3. Sett en **pris**. Bruk 0 for en gratis type.
4. Angi eventuelt en **kapasitet** for bare denne typen (f.eks. bare 20 Barn-plasser). La det stå tomt for ingen per-type grense.
5. Klikk **Lagre**.

Under påmelding velger hver deltaker en type; utsolgte typer vises som **Utsolgt** og kan ikke velges. Rosteret viser hver deltakers type og kjørende per-type telling.

## Valg

Valg er valgfrie priset tillegg — T-skjorter, måltidsplaner, aktivitetsoppgraderinger.

1. Utvid **Valg** trekkspillharmonika og klikk **Legg til valg**.
2. Skriv inn et **navn**, valgfritt **beskrivelse**, og en **pris** (0 vises som "Gratis").
3. Angi eventuelt en **kapasitet** (totalt tilgjengelig på tvers av alle påmeldinger) og en **Maks antall** (det meste en påmelding kan bestille).
4. Klikk **Lagre**.

Påmeldere velger antall under registrering, og totalene teller mot kapasiteten slik at du aldri overselger.

## Rabattkoder

1. Utvid **Rabattkoder** trekkspillharmonika og klikk **Legg til rabattkode**.
2. Skriv inn **koden** som påmeldere skal skrive.
3. Velg **typen** — **Prosent** eller **Beløp** — og dens **verdi**.
4. Begrenset eventuelt koden med en **Startdato** / **Sluttdato**, et **minimalt medlemmer** (minste antall deltakere på påmeldingen), og **Maks bruk**.
5. Klikk **Lagre**.

Hver kode viser en **Bruks**-telling slik at du kan se hvor ofte den har blitt innløst. Påmeldere får umiddelbar tilbakemelding når de bruker en kode — inkludert klare meldinger når en kode har utløpt, ikke har startet, eller trenger flere deltakere.

## Venteliste

Slå på **Aktiver venteliste** i Påmeldingsinnstillinger-kortet. Når arrangementet når kapasitet:

- Nye påmeldere tilbys en venteliste-plass i stedet for å bli slått av. De fullfører samme registrering (betaling hoppes over mens på ventelisten).
- Når noen avbestiller, blir den eldste ventelisten-påmelding **promotert automatisk** og mottar en e-post om at en plass åpnet. Hvis de skylder en saldo, linker e-posten dem til fullføring av betaling.
- Du kan manuelt promotere noen når som helst med **Promote**-handlingen på en venteliste-rad — nyttig etter å ha økt arrangementkapasiteten.

:::info
Promoterte påmeldinger forblir *ventende* inntil eventuelle saldoer er betalt; betaling (eller at det ikke er noe å betale) bekrefter dem.
:::

## Påmeldingsrosteret

Åpne et arrangement fra Påmeldinger-siden for å se hver påmelding. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltakers type), **Betalt / Total** (med en saldovarsel når penger fortsatt er skyldig), **Status**, og **Dato**, pluss per-type tellerklipper over tabellen.

- Klikk et rads detalj-ikon for å åpne **Påmeldingsdetaljer**-dialogen — medlemmer, valg, betalt/saldo, og en **Betalinger**-tabell som viser hver ladning (beløp, metode, dato).
- **Eksporter CSV** laster ned hele rosteret med kolonner for medlemmer, deltakertypene, valg, betalt/total/saldo, status, og en kolonne per påmeldingsspørsmål.
- **Legg til deltaker** lar deg fortsatt registrere offline-påmeldinger manuelt.

:::info
Refusjoner blir ikke behandlet innenfor B1. Hvis du trenger å refundere en kansellert betalt påmelding, utsted refusjonen fra giver-providerens instrumentbord (f.eks. Stripe).
:::

## Hvordan betaling fungerer

Betalinger kjøres gjennom samme givergateway kirken bruker for donasjoner — kortdetaljer går direkte til leverandøren og berører aldri B1-servere. Prisene er alltid beregnet på serveren fra dine konfigurerte typene, valg og rabattkoder, slik at en påmelder ikke kan manipulere totalen. Innloggede medlemmer kan betale med et lagret kort; gjester angir et kort ved kassen.

## Relaterte artikler

- [Opprette kalendere](creating-calendars#enabling-event-registration) — aktiver påmelding og grunnleggende innstillinger
- [Nettgivning-oppsett](../donations/online-giving-setup.md) — konfigurer betalingsgatewayen som brukes ved kassen
- [Påmelding til arrangementer](../../b1-church/events/registering) — hva medlemmer ser når de registrerer seg
- [Mine påmeldinger](../../b1-church/events/my-registrations) — hvordan medlemmer betaler saldoer og redigerer påmeldinger
