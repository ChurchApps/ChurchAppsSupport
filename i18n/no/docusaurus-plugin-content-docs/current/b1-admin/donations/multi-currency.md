---
title: "Støtte for flere valutaer"
---

# Støtte for flere valutaer

<div class="article-intro">

B1s multi-valutefunksjon lar kirken din akseptere og spore donasjoner i ulike valutaer. Dette er spesielt nyttig for kirker med internasjonale medlemmer, missionærer eller flere samlinger i ulike land.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere donasjoner. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Sett opp [elektronisk giving](./online-giving-setup.md) med Stripe, som støtter transaksjoner med flere valutaer.
- Forstå kirkas regnskapsbehov for håndtering av flere valutaer.

</div>

## Aktivere multi-valuta

Multi-valutas støtte er nå aktivert som standard i B1. Når den er aktivert:

- Medlemmer kan gi i sin lokale valuta når de donerer elektronisk
- Du kan manuelt registrere donasjoner i hvilken som helst valuta
- Donasjonsrapporter viser beløp i deres opprinnelige valuta
- Stripe håndterer valutakonvertering automatisk for elektronisk giving

## Støttede valutaer

Systemet støtter alle større verdens valutaer, inkludert:

- **USD** -- United States Dollar
- **EUR** -- Euro
- **GBP** -- Britisk pund
- **CAD** -- Kanadisk dollar
- **AUD** -- Australsk dollar
- **MXN** -- Mexicansk peso
- **BRL** -- Brasiliansk real
- **INR** -- Indisk rupee
- **CNY** -- Kinesisk yuan
- **JPY** -- Japansk yen
- Og mange flere...

De tilgjengelige valutaene for elektronisk giving avhenger av valutaene som støttes av Stripe-kontoen din.

## Registrering av donasjoner i ulike valutaer

### Elektroniske donasjoner

Når et medlem gir elektronisk gjennom Stripe:

1. De velger foretrukken valuta ved kassen
2. Stripe behandler betalingen i denne valutaen
3. Donasjonen registreres i B1 med det opprinnelige valutabeløpet
4. Stripe håndterer automatisk eventuell nødvendig valutakonvertering til standardvalutaen for kontoen din

### Manuell registrering

For å registrere en kontant eller sjekkdonasjon i en annen valuta:

1. Gå til **Donasjoner** i B1 Admin
2. Klikk **Legg til donasjon**
3. Velg valuta fra valutarullegardinlisten
4. Skriv inn beløpet i denne valutaen
5. Fullfør resten av donasjonsdetaljene
6. Klikk **Lagre**

## Vise donasjoner med flere valutaer

### Donasjonsrapporter

Donasjonsrapporter viser beløp i deres opprinnelige valuta:

- Individuelle donasjonsregistreringer viser valutakoden (f.eks. "$100.00 USD")
- Totaler beregnes per valuta
- Du kan filtrere etter spesifikke valutaer

### Konverterte totaler

Hvor B1 viser en enkelt kombinert total -- KPI-kortene for givingsoversikt, en donasjonbatotalt og en fonds total -- donasjoner registrert i en annen valuta enn kirkas standard konverteres til kirkas valuta ved hjelp av gjeldende valutakurser, slik at totalen er et enkelt meningsfylt tall i stedet for å legge til ulikt valutaer sammen. En **Konvertert til gjeldende valutakurser**-merknad vises under totalen når en konvertering ble brukt. Individuelle donasjonslinjer vises fortsatt i deres opprinnelige valuta.

### Givingsutsagn

Når du genererer givingsutsagn:

- Hver donasjon vises med sin opprinnelige valuta
- Totaler er delt ned etter valuta
- Medlemmer ser nøyaktig hva de ga i hver valuta

## Stripe-integrering

For elektronisk giving håndterer Stripe multi-valutatransaksjoner:

- **Automatisk konvertering** -- Stripe konverterer valutaer til standardvalutaen for kontoen din
- **Valutakurser** -- Stripe bruker gjeldende markedskurser
- **Gebyrer** -- Valutakonvertering kan påløpe ekstra Stripe-gebyrer
- **Utbetalingsvaluta** -- Midler blir satt inn i standardvalutaen for kontoen din

:::info
Sjekk Stripe-dashbordet ditt for å se gjeldende valutakurser og eventuelle gebyrer knyttet til multi-valutatransaksjoner.
:::

## Regnskapshensynet

Når du arbeider med flere valutaer:

- **Journalføring** -- Behold oversikt over originale donasjonsbeløp og valutaer for nøyaktig rapportering
- **Valutakurser** -- Merk at Stripes konverteringskurser kan avvike fra bankens kurser
- **Skatteregnskaper** -- Konsulter revisor om hvordan du rapporterer donasjoner i ulike valutaer for skatteformål
- **Fondsfordeling** -- Du kan fordele donasjoner til spesifikke fond uavhengig av valuta

## Beste praksis

- **Standardvaluta** -- Sett primær kirkvaluta din som standard for de fleste transaksjoner
- **Klar kommunikasjon** -- Si til donorer hvilken valuta de gir i under kasseprosessen
- **Konsistent rapportering** -- Kombinerte totaler konverteres alltid til kirkas valuta automatisk; bruk per-donasjonsvalutafilteret når du må se originale beløp
- **Regelmessig avstemming** -- Avstem Stripe-utbetalinger med donasjonsregistreringene dine, med tanke på valutakonverteringer

## Begrensninger

- Valutakonvertering for betalingsbehandling håndteres av Stripe for elektronisk giving bare; manuelle donasjoner registreres som innstrømt uten automatisk konvertering
- Historiske rapporter og individuelle donasjonslinjer viser alltid den opprinnelige valutaen gaven ble registrert i
- Kombinerte totaler (KPI-kort, batchtotaler, fondtotaler) konverteres til kirkas valuta ved hjelp av gjeldende valutakurser -- disse kursene kan variere litt fra bankens eller Stripes kurser på tidspunktet for oppgjør av midler

## Beslektede artikler

- [Oppsett for elektronisk giving](./online-giving-setup.md) -- Konfigurer Stripe for å godta donasjoner
- [Registrering av donasjoner](./recording-donations.md) -- Manuelt registrer donasjonsregistreringer
- [Donasjonsrapporter](./donation-reports.md) -- Generer og se donasjonssammendrag
- [Givingsutsagn](./giving-statements.md) -- Opprett årssluttgivingsutsagn
