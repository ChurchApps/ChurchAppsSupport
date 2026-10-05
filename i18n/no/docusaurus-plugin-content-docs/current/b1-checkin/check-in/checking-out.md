---
title: "Utsjekking og barnesikkerhet"
---

# Utsjekking og barnesikkerhet

<div class="article-intro">

Utsjekking avslutter innsjekkingen av barn: en forelder viser sikkerhetskoden fra hentelappen, kiosken kontrollerer hvem som henter, og barna sjekkes ut. Betjente stasjoner har også sikkerhetsverktøy — kontroll av godkjente hentepersoner, tekstmeldinger for å tilkalle en forelder, ny utskrift av sikkerhetsetiketter og nødvarsling.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Utsjekking er tilgjengelig på stasjoner som er satt til **betjent** modus i kioskens administratorinnstillinger
- Barna må være [sjekket inn](./completing-checkin) med en utskrevet hentelapp som har sikkerhetskoden
- Tilkalling og nødvarsling krever at kirken har koblet til en leverandør av tekstmeldinger i B1 Admin

</div>

## Starte en utsjekking

1. På en betjent stasjon trykker du på **Sjekk ut** på oppslagsskjermen.
2. Skriv inn den firesifrede **sikkerhetskoden** fra familiens hentelapp. Du kan skrive den inn, bruke tastaturet på skjermen eller skanne strekkoden på lappen med en USB- eller Bluetooth-skanner — koden sendes automatisk når alle fire tegnene er skrevet inn.
   - Ingen skanner? Trykk på **Skann** under kodefeltet for å bruke nettbrettets kamera i stedet. Hold QR-koden eller strekkoden på hentelappen opp mot kameraet i vinduet **Skann hentekode**, så fylles koden inn for deg. Bakkameraet brukes som standard; trykk på vendeknappen for å bytte kamera, eller trykk på **Avbryt** for å gå tilbake til å skrive inn.
3. Kiosken viser barna som er sjekket inn under den koden.

## Kontrollere hvem som henter

Utsjekkingsskjermen spør hvem som henter barna:

- **Godkjente hentepersoner** for husstanden vises som kort du kan trykke på, med bilde og relasjon — trykk på personen som står foran deg.
- **Voksne i husstanden** vises også i et bilderutenett.
- **Annen** lar deg skrive inn navnet på noen som ikke står på listen.

Hvis et navn du skriver inn, stemmer med noen som er markert som **Ikke autorisert** for husstanden, blokkerer kiosken utsjekkingen med en advarsel. En ansatt kan velge **Overstyr** for å fortsette likevel — overstyringen registreres på oppmøteregistreringen sammen med personens navn.

Når hentepersonen er bekreftet, trykker du på sjekk ut. Hentepersonens navn lagres sammen med oppmøteregistreringen.

:::info
Godkjente og ikke-autoriserte hentepersoner administreres av kirkens ansatte på hver persons side i B1 Admin — se [Innsjekkingssikkerhet](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Tilkalle en forelder

Trenger du en forelder under gudstjenesten — bleieskift, et barn som gråter? Fra utsjekkingsskjermen på en betjent stasjon kan ansatte sende en **tilkalling**: en tekstmelding til barnets foreldre eller foresatte via kirkens leverandør av tekstmeldinger. Foreldre som har reservert seg mot tekstmeldinger eller ikke har mobilnummer, hoppes over, og kiosken viser hvor mange meldinger som ble sendt.

## Skrive ut etiketter på nytt

Hvis en navnelapp eller hentelapp er mistet eller skadet, kan ansatte på en betjent stasjon **skrive ut** familiens etiketter på nytt fra utsjekkingsskjermen etter å ha skrevet inn sikkerhetskoden. Utskriften bruker samme skriver og de samme etikettmalene som den opprinnelige innsjekkingen.

## Nødvarsling

I en nødssituasjon kan ansatte sende tekstmelding til de foresatte til **alle innsjekkede barn** i den aktuelle gudstjenesten samtidig:

1. Åpne kioskens **administratorinnstillinger** (sju raske trykk på logoen i toppen, pluss PIN-koden hvis den er satt).
2. Trykk på **Nødvarsling**.
3. Skriv inn meldingen, og skriv deretter **EMERGENCY** i bekreftelsesfeltet — knappen **Send varsel** er deaktivert til du har gjort det.
4. Kiosken viser hvor mange telefoner som mottok meldingen, og hvor mange som ble hoppet over (reservert seg eller uten mobilnummer).

:::warning
Varselet sendes til alle innsjekkede husstander for den valgte gudstjenesten. Bruk det kun ved reelle nødssituasjoner — evakuering, innelåsing, farlig vær.
:::

## Relaterte artikler

- [Fullføre innsjekking](./completing-checkin) — hvor sikkerhetskoder og hentelapper kommer fra
- [Innsjekkingssikkerhet](../../b1-admin/attendance/checkin-safety) — konfigurere kapasitet, forhold, hentepersoner og kravet om leverandør av tekstmeldinger
- [Skriveroppsett](../getting-started/printer-setup) — konfigurasjon av etikettskriver
