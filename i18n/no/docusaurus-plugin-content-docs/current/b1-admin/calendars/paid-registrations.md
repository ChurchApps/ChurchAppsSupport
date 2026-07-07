---
title: "Betalte registreringer"
---

# Betalte registreringer

<div class="article-intro">

Arrangementsregistrering kan gå utover en enkel antallstelling. Du kan definere prisede deltakelsestyper (som voksen og barn), tilby valgfrie tillegg med egne priser og mengder, opprett rabattkoder og samle inn betaling ved registrering gjennom din kirkes eksisterende giversystem. Når et arrangement fylles opp, en valgfritt venteliste holder interesserte medlemmer på linja og promoterer dem automatisk når plasser åpnes.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver registrering på arrangementet først -- se [Opprett kalendere](creating-calendars#enabling-event-registration)
- For å samle inn betalinger, må din kirke [online giver konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis arrangementer trenger ingen giversetup.

</div>

## Åpne registreringsinnstillinger

1. I B1 Admin, gå til **Registreringer**-siden og åpne arrangementet ditt (eller åpne arrangementet fra sin kalender).
2. **Registreringsinnstillinger**-kortet viser grunnene -- **Aktiver registrering**, **Kapasitet**, **Registrering åpnes/lukkes**, **Merker** og **registreringsspørsmål**.
3. Nedenfor grunnene er tre harmonikaer: **Deltakelsestyper**, **Valg** og **Rabattkoder**.

## Deltakelsestyper

Deltakelsestyper lar deg belaste ulike priser for ulike slag deltakere -- og dølg hver enkelt separat.

1. Ekspander **Deltakelsestyper**-harmonikaen og klikk **Legg til type**.
2. Angi en **Navn** (f.eks. "Voksen", "barn", "Student").
3. Sett en **Pris**. Bruk 0 for en gratis type.
4. Eventuelle sett en **kapasitet** for bare denne typen (f.eks. bare 20 Barn flekker). La det stå tomt for ingen per-type grense.
5. Klikk **Lagre**.

Under registrering velger hver deltaker en type; utsolgte typer vises som **Solgt ut** og kan ikke velges. Rosteret viser hver deltakers type og løpende per-type tellinger.

## Valg

Valg er valgfrie prisede tillegg -- T-skjorter, måltidsplaner, aktivitet oppgraderinger.

1. Ekspander **Valg**-harmonikaen og klikk **Legg til valg**.
2. Angi en **Navn**, valgfritt **Beskrivelse** og en **Pris** (0 vises som "Gratis").
3. Eventuelle sett en **kapasitet** (totalt tilgjengelig på tvers av alle registreringer) og en **Maks antall** (det meste en registrering kan bestille).
4. Klikk **Lagre**.

Registranter velger mengder under registrering, og totalen teller mot kapasitet slik at du aldri overseljer.

## Rabattkoder

1. Ekspander **Rabattkoder**-harmonikaen og klikk **Legg til rabattkode**.
2. Angi **Koden** registranter vil skrive.
3. Velg **Type** -- **Prosent** eller **Beløp** -- og dets **Verdi**.
4. Eventuelle begrens koden med en **Start dato** / **Sluttdato**, en **Min medlemmer** (minimum antall deltakere på registreringen) og **Maks bruk**.
5. Klikk **Lagre**.

Hver kode viser en **Bruker**-telling slik at du kan se hvor ofte den har blitt løst inn. Registranter får umiddelbar tilbakemelding når de bruker en kode -- inkludert klare meldinger når en kode har gått ut, ikke har startet, eller trenger flere deltakere.

## Venteliste

Slå på **Aktiver venteliste** i registreringsinnstillinger-kortet. Når arrangementet når kapasitet:

- Nye registranter tilbys en venteliste plass i stedet for å bli avvist. De fullfører samme registrering (betaling hoppes over mens de står på ventelisten).
- Når noen avbryter, den eldste venteliste registreringen er **automatisk forfremmelse** og mottar en e-post at en plass åpnet. Hvis de skylder en balanse, e-posten kobler dem for å fullføre betaling.
- Du kan forfremme noen manuelt når som helst med **Fremme**-handlingen på en venteliste rad -- nyttig etter å ha økt arrangementets kapasitet.

:::info
Forfremmede registreringer holder *pending* til eventuell balanse betales; betale (eller ikke ha noe å betale) bekrefter dem.
:::

## Registreringsrosteret

Åpne et arrangement fra Registreringer-siden for å se hver registrering. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltakers type), **Betalt / Totalt** (med en balanse advarsel når penger fortsatt skyldest), **Status** og **Dato**, pluss per-type telle chips over tabellen.

- Klikk en rads detaljer-ikon for å åpne **Registreringsdetaljene**-dialogen -- medlemmer, valg, betalt/balanse og en **Betalinger**-tabell som viser hver ladning (beløp, metode, dato).
- **Eksport CSV** nedlaster det fulle rosteret med kolonner for medlemmer, deltakelsestyper, valg, betalt/totalt/balanse, status og en kolonne per registreringsspørsmål.
- **Legg til deltaker** lar deg fortsatt registrere offline registreringer manuelt.

:::info
Refusjoner behandles ikke inne i B1. Hvis du må refundere en kansellert betalt registrering, utsted refusjon fra din givers leverandørens dashbord (f.eks. Stripe).
:::

## Hvordan betaling fungerer

Betalinger kjøres gjennom samme giversystem din kirke allerede bruker for donasjoner -- kortdetaljer går direkte til leverandøren og berører aldri B1s servere. Priser beregnes alltid på serveren fra dine konfigurerte typer, valg og rabattkoder, slik at en registrant ikke kan grible med totalen. Loggede medlemmer kan betale med et lagret kort; gjester skriver inn et kort ved kassen.

## Relaterte artikler

- [Opprett kalendere](creating-calendars#enabling-event-registration) -- aktiver registrering og de grunnleggende innstillingene
- [Online giver oppsett](../donations/online-giving-setup.md) -- konfigurer betalings gateway brukt ved kassen
- [Registrer for arrangementer](../../b1-church/events/registering) -- hva medlemmer ser når de registrerer seg
- [Mine registreringer](../../b1-church/events/my-registrations) -- hvordan medlemmer betaler balanse og redigerer registreringer
