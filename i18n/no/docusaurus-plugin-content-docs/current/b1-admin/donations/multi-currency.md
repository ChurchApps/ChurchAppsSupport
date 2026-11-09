---
title: "Støtte for flere valutaer"
description: "Registrer og rapporter donasjoner i ulike valutaer i B1 Admin, inkludert manuell registrering, nettbasert giving via Stripe, og hvordan samlede summer konverteres."
---

# Støtte for flere valutaer

<div class="article-intro">

Funksjonen for flere valutaer i B1 gjør det mulig for menigheten din å ta imot og føre donasjoner i ulike valutaer. Dette er særlig nyttig for menigheter med internasjonale medlemmer, misjonærer eller flere menigheter i ulike land.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere donasjoner. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Sett opp [nettbasert giving](./online-giving-setup.md) med Stripe, som støtter transaksjoner i flere valutaer. En menighet uten nettbasert giving kan fortsatt velge valutaen gavene den registrerer for hånd føres i.
- Vær klar over menighetens regnskapsbehov for håndtering av flere valutaer.

</div>

Menighetens valuta starter med valutaen for landet som ble oppgitt da menigheten registrerte seg (for eksempel kenyanske shilling for en menighet i Kenya), og den brukes hvis det ikke er lagret noen valuta ennå. Du kan endre den når som helst under **Administrer menighet → Giving**. Hvis landet ditt ikke gjenkjennes, starter den med amerikanske dollar.

## Aktivere flere valutaer

Støtte for flere valutaer er nå aktivert som standard i B1. Når den er aktivert:

- Medlemmer kan gi i sin lokale valuta når de donerer på nett
- Du kan registrere donasjoner i alle valutaer manuelt
- Donasjonsrapporter viser beløp i opprinnelig valuta
- Stripe håndterer valutakonvertering automatisk for giving på nett

## Støttede valutaer

Systemet støtter alle større valutaer i verden, blant annet:

- **USD** -- amerikanske dollar
- **EUR** -- euro
- **GBP** -- britiske pund
- **CAD** -- kanadiske dollar
- **AUD** -- australske dollar
- **MXN** -- meksikanske peso
- **BRL** -- brasilianske real
- **INR** -- indiske rupi
- **CNY** -- kinesiske yuan
- **JPY** -- japanske yen
- Og mange flere...

Hvilke valutaer som er tilgjengelige for nettbasert giving, avhenger av hvilke valutaer Stripe-kontoen din støtter.

## Registrere donasjoner i ulike valutaer

### Donasjoner på nett

Når et medlem gir på nett via Stripe:

1. Velger de sin foretrukne valuta i kassen
2. Stripe behandler betalingen i den valutaen
3. Donasjonen registreres i B1 med beløpet i opprinnelig valuta
4. Stripe håndterer automatisk eventuell nødvendig valutakonvertering til kontoens standardvaluta

### Manuell registrering

Kontant- og sjekkdonasjoner du registrerer for hånd, føres i menighetens valuta -- **valutaen** som er satt under **Innstillinger > Giving** (se [Angi menighetens valuta](./online-giving-setup.md#choosing-your-currency)). Det finnes ikke noe valg av valuta per gave. Feltet **Beløp** viser valutakoden på slutten (for eksempel *PHP*), slik at du ser hvilken valuta du skriver inn i.

1. Gå til **Donasjoner > Batcher** i B1 Admin og åpne batchen
2. Klikk **Legg til donasjon** øverst på batchsiden
3. Skriv inn beløpet i menighetens valuta
4. Fyll ut resten av donasjonsdetaljene
5. Klikk **Lagre**

Når du redigerer en eksisterende gave, beholdes valutaen den først ble registrert i.

## Se donasjoner i flere valutaer

### Donasjonsrapporter

Donasjonsrapporter viser beløp i opprinnelig valuta:

- Enkeltregistreringer av donasjoner viser valutakoden (f.eks. «$100.00 USD»)
- Totaler beregnes per valuta
- Du kan filtrere på bestemte valutaer

### Konverterte totaler {#converted-totals}

Der B1 viser en enkelt samlet sum -- kortene med nøkkeltall for giving, en batch-sum og et fonds totalsum -- konverteres donasjoner registrert i en annen valuta enn menighetens standardvaluta til menighetens valuta med dagens valutakurser. Dermed blir summen ett meningsfylt tall i stedet for at ulike valutaer legges sammen. Et notat **Konvertert til dagens valutakurs** vises under summen når en konvertering er brukt. Enkeltlinjer med donasjoner vises fortsatt i opprinnelig valuta.

### Gaveoppgaver

Når du lager gaveoppgaver:

- Hver donasjon vises i opprinnelig valuta
- Summene brytes ned per valuta
- Givere ser nøyaktig hva de ga i hver valuta

## Stripe-integrasjon

For giving på nett håndterer Stripe transaksjoner i flere valutaer:

- **Automatisk konvertering** -- Stripe konverterer valutaer til kontoens standardvaluta
- **Valutakurser** -- Stripe bruker gjeldende markedskurser
- **Gebyrer** -- Valutakonvertering kan gi ekstra Stripe-gebyrer
- **Utbetalingsvaluta** -- Midlene settes inn i kontoens standardvaluta

:::info
Sjekk Stripe-dashbordet ditt for gjeldende valutakurser og eventuelle gebyrer knyttet til transaksjoner i flere valutaer.
:::

## Regnskapshensyn

Når du jobber med flere valutaer:

- **Journalføring** -- Hold styr på opprinnelige donasjonsbeløp og valutaer for nøyaktig rapportering
- **Valutakurser** -- Merk at Stripes valutakurser kan avvike fra bankens kurser
- **Skattekvitteringer** -- Snakk med revisoren din om hvordan donasjoner i ulike valutaer skal rapporteres for skatteformål
- **Fondsfordeling** -- Du kan fordele donasjoner til bestemte fond uavhengig av valuta

## Beste praksis

- **Standardvaluta** -- Angi menighetens hovedvaluta under **Innstillinger > Giving**, slik at manuelt registrerte gaver og giving-summer bruker den
- **Tydelig kommunikasjon** -- Fortell givere hvilken valuta de gir i under kassen
- **Konsekvent rapportering** -- Samlede summer konverteres alltid automatisk til menighetens valuta; bruk filteret for valuta per donasjon når du trenger å se opprinnelige beløp
- **Jevnlig avstemming** -- Avstem Stripe-utbetalinger mot donasjonsregistrene dine, og ta hensyn til valutakonverteringer

## Begrensninger

- Valutakonvertering for betalingsbehandling håndteres av Stripe, og bare for giving på nett; manuelle donasjoner registreres slik de er lagt inn, uten automatisk konvertering
- Historiske rapporter og enkeltlinjer for donasjoner viser alltid opprinnelig valuta gaven ble registrert i
- Samlede summer (nøkkeltallskort, batchsummer, fondssummer) konverteres til menighetens valuta med dagens valutakurser -- disse kursene kan avvike litt fra bankens eller Stripes kurser på det tidspunktet midlene gjøres opp

## Relaterte artikler

- [Nettbasert giving-oppsett](./online-giving-setup.md) -- sett opp Stripe for å ta imot donasjoner
- [Registrere donasjoner](./recording-donations.md) -- registrer donasjoner manuelt
- [Donasjonsrapporter](./donation-reports.md) -- lag og se donasjonsoppsummeringer
- [Gaveoppgaver](./giving-statements.md) -- lag årlige gaveoppgaver
