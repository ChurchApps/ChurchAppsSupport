---
title: "Flytvalutastøtte"
---

# Flytvalutastøtte

<div class="article-intro">

B1s flytvalutafunksjon lar kirken din godta og spore donasjoner i ulike valutaer. Dette er spesielt nyttig for kirker med internasjonale medlemmer, missionærer eller flere avdelinger i ulike land.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må ha tillatelse til å håndtere donasjoner. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Sett opp dine [nettdonasjoner](./online-giving-setup.md) med Stripe, som støtter flytvalutaransaksioner.
- Forstå kirkens regnskapsbehov for håndtering av flere valutaer.

</div>

## Aktivering av flytvaluta

Flytvalutastøtte er nå aktivert som standard i B1. Når det er aktivert:

- Medlemmer kan gi i deres lokale valuta når de donerer online
- Du kan manuelt registrere donasjoner i enhver valuta
- Donasjonerapporter viser beløp i deres opprinnelige valuta
- Stripe håndterer valutakonvertering automatisk for nettdonasjoner

## Støttede valutaer

Systemet støtter alle større verdensvalutaer, inkludert:

- **USD** -- US-dollar
- **EUR** -- Euro
- **GBP** -- Britiske pund
- **CAD** -- Kanadiske dollar
- **AUD** -- Australske dollar
- **MXN** -- Mexicansk peso
- **BRL** -- Brasiliansk real
- **INR** -- Indisk rupi
- **CNY** -- Kinesisk yuan
- **JPY** -- Japansk yen
- Og mange flere...

De tilgjengelige valutaene for nettdonasjoner avhenger av hvilke valutaer som støttes av Stripe-kontoen din.

## Registrering av donasjoner i ulike valutaer

### Nettdonasjoner

Når et medlem gir online via Stripe:

1. De velger sin foretrukne valuta ved kassen
2. Stripe behandler betalingen i den valutaen
3. Donasjonen registreres i B1 med det opprinnelige valutabeløpet
4. Stripe håndterer automatisk eventuell nødvendig valutakonvertering til standardvalutaen på kontoen din

### Manuell oppføring

For å registrere en kontant- eller sjekkdonasjon i en annen valuta:

1. Gå til **Donasjoner** i B1 Admin
2. Klikk **Legg til donasjon**
3. Velg valutaen fra valutarullemenyen
4. Skriv inn beløpet i den valutaen
5. Fyll ut resten av donasjondetaljene
6. Klikk **Lagre**

## Visning av flytvalutadonasjoner

### Donasjonerapporter

Donasjonerapporter viser beløp i deres opprinnelige valuta:

- Individuelle donasjonsposter viser valutakoden (f.eks. "$100,00 USD")
- Totaler beregnes per valuta
- Du kan filtrere etter spesifikke valutaer

### Giveerklæringer

Når du genererer giveerklæringer:

- Hver donasjon vises med sin opprinnelige valuta
- Totaler er oppdeltt etter valuta
- Medlemmer ser nøyaktig hva de ga i hver valuta

## Stripe-integrering

For nettdonasjoner håndterer Stripe flytvalutaransaksioner:

- **Automatisk konvertering** -- Stripe konverterer valutaer til standardvalutaen på kontoen din
- **Valutakurser** -- Stripe bruker gjeldende markedskurser
- **Gebyrer** -- Valutakonvertering kan påløpe tilleggsgebyrer fra Stripe
- **Utbetalingsvaluta** -- Midler settes inn i standardvalutaen på kontoen din

:::info
Sjekk Stripe-dashbordet ditt for å se gjeldende valutakurser og eventuelle gebyrer knyttet til flytvalutaransaksioner.
:::

## Regnskapshensyn

Når du arbeider med flere valutaer:

- **Registrering** -- Holds orden på originale donasjonbelop og valutaer for nøyaktig rapportering
- **Valutakurser** -- Merk at Stripes konverteringskurser kan avvike fra bankens kurser
- **Skattekvisninger** -- Konsulter regnskapsfører om hvordan du skal rapportere donasjoner i ulike valutaer for skatteformål
- **Fondstildeling** -- Du kan tildele donasjoner til spesifikke fond uavhengig av valuta

## Beste praksis

- **Standardvaluta** -- Sett kirkens primærvaluta som standard for de fleste transaksjonene
- **Klar kommunikasjon** -- Fortell givere hvilken valuta de gir i under kasseprosessen
- **Konsistent rapportering** -- Bestem om du skal rapportere i opprinnelige valutaer eller konvertere til en enkelt valuta for sammendrag
- **Vanlig avstemming** -- Avstem Stripe-utbetalinger med donasjonsposter dine, med hensyn til valutakonverteringer

## Begrensninger

- Valutakonvertering håndteres av Stripe kun for nettdonasjoner
- Manuelle donasjoner registreres som innført uten automatisk konvertering
- Historiske rapporter viser donasjoner i deres opprinnelige valutaer
- Totalberegninger gjøres per valuta, ikke på tvers av valutaer

## Relaterte artikler

- [Nettdonasjonsoppsett](./online-giving-setup.md) -- Konfigurer Stripe for å godta donasjoner
- [Registrering av donasjoner](./recording-donations.md) -- Manuelt oppføring av donasjonsposter
- [Donasjonerapporter](./donation-reports.md) -- Generer og vis donasjonsammendrag
- [Giveerklæringer](./giving-statements.md) -- Opprett årsavslutningsgivererklæringer
