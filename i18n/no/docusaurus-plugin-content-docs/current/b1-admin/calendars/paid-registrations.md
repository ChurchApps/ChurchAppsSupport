---
title: "Betalte påmeldinger"
description: "Sett opp betalte påmeldinger i B1 Admin: prisede deltakertyper, tilleggsvalg, rabattkoder, venteliste og innbetaling via din givertjeneste."
---

# Betalte påmeldinger

<div class="article-intro">

Påmelding til arrangementer kan gå utover en enkel deltakerteller. Du kan definere prissatte deltakertyper (som voksen og barn), tilby valgfrie tilleggsvarer med egne priser og antall, opprette rabattkoder og ta betaling ved påmelding gjennom kirkens eksisterende giveleverandør. Når et arrangement blir fullt, holder en valgfri venteliste interesserte medlemmer i køen og flytter dem opp automatisk etter hvert som plasser blir ledige.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Aktiver påmelding på arrangementet først -- se [Opprette kalendere](./creating-calendars.md#enabling-event-registration)
- For å ta imot betalinger på nett må kirken din ha [nettbasert giving konfigurert](../donations/online-giving-setup.md) (Stripe, PayPal eller Kingdom Funding). Gratis arrangementer trenger ikke giveoppsett. Uten nettbasert giving fungerer betalte påmeldinger fortsatt, men folk betaler kirken direkte -- se [Kirker uten nettbasert giving](#churches-without-online-giving).

</div>

## Åpne påmeldingsinnstillingene

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), velger **Kalendere > Påmeldinger** og åpner arrangementet ditt (eller åpner arrangementet fra kalenderen).
2. Kortet **Påmeldingsinnstillinger** viser det grunnleggende -- **Aktiver påmelding**, **Kapasitet**, **Påmelding åpner/stenger**, **Merkelapper** og **Påmeldingsspørsmål**.
3. Under det grunnleggende finner du tre akkordeoner: **Deltakertyper**, **Valg** og **Rabattkoder**.

## Deltakertyper

Deltakertyper lar deg ta ulike priser for ulike typer deltakere -- og begrense hver av dem for seg.

1. Utvid akkordeonen **Deltakertyper** og klikk **Legg til type**.
2. Skriv inn et **navn** (f.eks. «Voksen», «Barn», «Elev»).
3. Angi en **pris**. Bruk 0 for en gratis type.
4. Angi eventuelt en **kapasitet** for bare denne typen (f.eks. bare 20 plasser for barn). La feltet stå tomt hvis det ikke skal være noen grense for denne typen.
5. Klikk **Lagre**.

Under påmeldingen velger hver deltaker en type. Typer som er utsolgt, vises som **Utsolgt** og kan ikke velges. Deltakerlisten viser hver deltakers type og løpende antall per type.

## Valg

Valg er valgfrie tilleggsvarer med pris -- t-skjorter, måltidspakker, oppgraderinger til aktiviteter.

1. Utvid akkordeonen **Valg** og klikk **Legg til valg**.
2. Skriv inn et **navn**, en eventuell **beskrivelse** og en **pris** (0 vises som «Gratis»).
3. Angi eventuelt en **kapasitet** (totalt tilgjengelig på tvers av alle påmeldinger) og en **maks antall** (det meste én påmelding kan bestille).
4. Klikk **Lagre**.

Påmeldte velger antall under påmeldingen, og summene teller mot kapasiteten, slik at du aldri selger for mye.

## Rabattkoder

1. Utvid akkordeonen **Rabattkoder** og klikk **Legg til rabattkode**.
2. Skriv inn **koden** som de påmeldte skal skrive inn.
3. Velg **typen** -- **Prosent** eller **Beløp** -- og angi **verdien**.
4. Begrens koden eventuelt med en **startdato** / **sluttdato**, et **minimum antall medlemmer** (minste antall deltakere på påmeldingen) og **maks bruk**.
5. Klikk **Lagre**.

Hver kode viser et antall **bruk**, slik at du kan se hvor ofte den er brukt. Påmeldte får umiddelbar tilbakemelding når de bruker en kode -- inkludert tydelige meldinger når en kode har utløpt, ennå ikke har startet, eller krever flere deltakere.

## Venteliste {#waitlist}

Slå på **Aktiver venteliste** i kortet for påmeldingsinnstillinger. Når arrangementet når kapasiteten:

- Nye påmeldte får tilbud om en plass på ventelisten i stedet for å bli avvist. De fullfører den samme påmeldingen (betaling hoppes over mens de står på ventelisten).
- Når noen avbestiller, **flyttes den eldste påmeldingen på ventelisten opp automatisk**, og får en e-post om at en plass er blitt ledig. Hvis de skylder et beløp, lenker e-posten dem til [Mine påmeldinger](../../b1-church/events/my-registrations.md) på kirkens B1-nettsted, der de kan fullføre betalingen.
- Du kan flytte noen opp manuelt når som helst med handlingen **Flytt opp** på en rad på ventelisten -- nyttig etter at du har økt kapasiteten på arrangementet.

:::info
Påmeldinger som er flyttet opp, forblir *ventende* til et eventuelt beløp er betalt; når betalingen er gjort (eller det ikke er noe å betale), blir de bekreftet.
:::

## Deltakerlisten {#the-registration-roster}

Åpne et arrangement fra siden for påmeldinger for å se alle påmeldingene. Tittelen på kortet viser hvor mange påmeldinger som har en plass mot kapasiteten (for eksempel *Påmeldinger (18 / 20)*). Bare ventende og bekreftede påmeldinger teller; når folk står på ventelisten, legges antallet til i tittelen (for eksempel *· 3 på venteliste*), og det samme antallet vises under kapasitetslinjen. Tabellen viser **Navn**, **Medlemmer**, **Type** (hver deltakers type), **Betalt / Totalt** (med en advarsel når det fortsatt skyldes penger), **Status** og **Dato**, i tillegg til brikker med antall per type over tabellen.

- Klikk på detaljikonet på en rad for å åpne dialogen **Påmeldingsdetaljer** -- medlemmer, valg, betalt/restbeløp og en tabell over **Betalinger** som lister hvert beløp (beløp, metode, dato).
- **Eksporter CSV** laster ned hele deltakerlisten med kolonner for medlemmer, deltakertyper, valg, betalt/totalt/restbeløp, status og én kolonne per påmeldingsspørsmål.
- **Legg til deltaker** registrerer en påmelding som er gjort frakoblet eller per telefon for en hvilken som helst person i kirken din. Velg personen og, for et betalt arrangement, deres deltakertype. Kortet deres belastes ikke: en betalt påmelding lagres som **ventende** med hele beløpet som utestående saldo. Hvis kirken har nettbasert giving, kan personen betale via [Mine påmeldinger](../../b1-church/events/my-registrations.md); ellers må du innkreve beløpet personlig. Du trenger tillatelsen Rediger påmeldinger for å legge til deltakere.

:::info
Refusjoner behandles ikke i B1. Hvis du må refundere en avbestilt betalt påmelding, gjør du det fra giveleverandørens dashbord (f.eks. Stripe).
:::

## Slik fungerer betaling

Betalinger går gjennom den samme giveløsningen kirken din allerede bruker til gaver -- kortopplysninger sendes direkte til leverandøren og berører aldri B1-serverne. Priser beregnes alltid på serveren fra de konfigurerte typene, valgene og rabattkodene dine, slik at en påmeldt ikke kan manipulere totalbeløpet. Innloggede medlemmer kan betale med et lagret kort. Gjester legger inn et kort i kassen og må krysse av for **Jeg er ikke en robot** før de betaler.

### Kirker uten nettbasert giving {#churches-without-online-giving}

Hvis kirken din ikke har satt opp en giveleverandør, kan betalte arrangementer fortsatt ta imot påmeldinger. Betalingssteget forteller de påmeldte at betaling på nett ikke er tilgjengelig, og at de kan betale kirken direkte, og en knapp for **Meld på og betal senere** lagrer påmeldingen. Den lagres som **ventende** med hele beløpet som utestående saldo, og vises på deltakerlisten med en advarsel om restbeløp. Innkreve pengene på den måten kirken din vanligvis gjør det.

:::info
B1 har ingen måte å merke en betaling utenfor systemet som mottatt. Restbeløpet forblir på deltakerlisten og på den påmeldtes kort under [Mine påmeldinger](../../b1-church/events/my-registrations.md) etter at du har innkrevd det, så før din egen oversikt over hvem som har betalt.
:::

## Relaterte artikler

- [Opprette kalendere](./creating-calendars.md#enabling-event-registration) -- aktiver påmelding og de grunnleggende innstillingene
- [Oppsett for nettbasert giving](../donations/online-giving-setup.md) -- konfigurer betalingsløsningen som brukes i kassen
- [Melde seg på arrangementer](../../b1-church/events/registering.md) -- det medlemmer ser når de melder seg på
- [Mine påmeldinger](../../b1-church/events/my-registrations.md) -- hvordan medlemmer betaler restbeløp og redigerer påmeldinger
