---
title: "Støtte for flere valutaer"
---

# Støtte for flere valutaer

<div class="article-intro">

B1s funksjon for flere valutaer gjør det mulig for menigheten din å motta og spore donasjoner i forskjellige valutaer. Dette er spesielt nyttig for menigheter med internasjonale medlemmer, misjonærer eller flere lokasjoner i forskjellige land.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere donasjoner. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Sett opp [nettbasert giving](./online-giving-setup.md) med Stripe, som støtter transaksjoner i flere valutaer.
- Forstå menighetens regnskapsbehov for håndtering av flere valutaer.

</div>

## Aktivere støtte for flere valutaer

Støtte for flere valutaer er nå aktivert som standard i B1. Når det er aktivert:

- Medlemmer kan gi i sin lokale valuta når de donerer på nett
- Du kan manuelt registrere donasjoner i hvilken som helst valuta
- Donasjonsrapporter viser beløp i deres opprinnelige valuta
- Stripe håndterer valutaomregning automatisk for nettbasert giving

## Støttede valutaer

Systemet støtter alle store verdensvalutaer, inkludert:

- **USD** -- Amerikanske dollar
- **EUR** -- Euro
- **GBP** -- Britiske pund
- **CAD** -- Kanadiske dollar
- **AUD** -- Australske dollar
- **MXN** -- Meksikanske peso
- **BRL** -- Brasilianske real
- **INR** -- Indiske rupier
- **CNY** -- Kinesiske yuan
- **JPY** -- Japanske yen
- Og mange flere...

De tilgjengelige valutaene for nettbasert giving avhenger av Stripe-kontoens støttede valutaer.

## Registrere donasjoner i forskjellige valutaer

### Nettbaserte donasjoner

Når et medlem gir på nett gjennom Stripe:

1. De velger sin foretrukne valuta ved utsjekking
2. Stripe behandler betalingen i den valutaen
3. Donasjonen registreres i B1 med det opprinnelige valutabeløpet
4. Stripe håndterer automatisk eventuell nødvendig valutaomregning til kontoens standardvaluta

### Manuell registrering

For å registrere en kontant- eller sjekkdonasjon i en annen valuta:

1. Naviger til **Donasjoner** i B1 Admin
2. Klikk **Legg til donasjon**
3. Velg valutaen fra valutarullgardinmenyen
4. Skriv inn beløpet i den valutaen
5. Fullfør resten av donasjonsdetaljene
6. Klikk **Lagre**

## Vise donasjoner i flere valutaer

### Donasjonsrapporter

Donasjonsrapporter viser beløp i deres opprinnelige valuta:

- Individuelle donasjonsregistreringer viser valutakoden (f.eks. "$100.00 USD")
- Totaler beregnes per valuta
- Du kan filtrere etter spesifikke valutaer

### Givekvitteringer

Ved generering av givekvitteringer:

- Hver donasjon vises med sin opprinnelige valuta
- Totaler er delt ned etter valuta
- Medlemmer ser nøyaktig hva de ga i hver valuta

## Stripe-integrasjon

For nettbasert giving håndterer Stripe transaksjoner i flere valutaer:

- **Automatisk omregning** -- Stripe konverterer valutaer til kontoens standardvaluta
- **Valutakurser** -- Stripe bruker gjeldende markedskurser
- **Avgifter** -- Valutaomregning kan medføre ekstra Stripe-avgifter
- **Utbetalingsvaluta** -- Midler settes inn i kontoens standardvaluta

:::info
Sjekk Stripe-dashbordet ditt for å se gjeldende valutakurser og eventuelle avgifter knyttet til transaksjoner i flere valutaer.
:::

## Regnskapshensyn

Når du arbeider med flere valutaer:

- **Journalføring** -- Hold oversikt over opprinnelige donasjonsbeløp og valutaer for nøyaktig rapportering
- **Valutakurser** -- Merk at Stripes omregningskurser kan avvike fra bankens kurser
- **Skattekvitteringer** -- Konsulter regnskapsføreren din om hvordan du rapporterer donasjoner i forskjellige valutaer for skatteformål
- **Fondstildeling** -- Du kan tildele donasjoner til spesifikke fond uavhengig av valuta

## Beste praksis

- **Standardvaluta** -- Sett menighetens hovedvaluta som standard for de fleste transaksjoner
- **Tydelig kommunikasjon** -- Fortell givere hvilken valuta de gir i under utsjekkingsprosessen
- **Konsekvent rapportering** -- Bestem om du vil rapportere i opprinnelige valutaer eller konvertere til en enkelt valuta for sammendrag
- **Regelmessig avstemming** -- Avstem Stripe-utbetalinger med donasjonsregistreringene dine, med hensyn til valutaomregninger

## Begrensninger

- Valutaomregning håndteres av Stripe kun for nettbasert giving
- Manuelle donasjoner registreres som inntastet uten automatisk omregning
- Historiske rapporter viser donasjoner i deres opprinnelige valutaer
- Totalberegninger gjøres per valuta, ikke på tvers av valutaer

## Relaterte artikler

- [Oppsett av nettbasert giving](./online-giving-setup.md) -- Konfigurer Stripe for å motta donasjoner
- [Registrere donasjoner](./recording-donations.md) -- Registrer donasjonsregistreringer manuelt
- [Donasjonsrapporter](./donation-reports.md) -- Generer og vis donasjonssammendrag
- [Givekvitteringer](./giving-statements.md) -- Opprett årsavslutningskvitteringer for giving
