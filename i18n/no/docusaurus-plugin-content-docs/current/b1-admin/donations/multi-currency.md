---
title: "Støtte for flere valutaer"
description: "Registrer og rapporter gaver i ulike valutaer i B1 Admin, inkludert manuell registrering, nettgaver via Stripe, og hvordan samlede summer omregnes."
---

# Støtte for flere valutaer

<div class="article-intro">

B1s funksjon for flere valutaer lar menigheten din ta imot og følge gaver i ulike valutaer. Dette er særlig nyttig for menigheter med internasjonale medlemmer, misjonærer eller flere menigheter i ulike land.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere gaver. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Sett opp [nettbasert giving](./online-giving-setup.md) med Stripe, som støtter transaksjoner i flere valutaer. En menighet uten nettbasert giving kan fortsatt velge hvilken valuta manuelt registrerte gaver føres i.
- Kjenn til menighetens regnskapsbehov når det gjelder flere valutaer.

</div>

Menighetens valuta starter på valutaen til landet som ble oppgitt da menigheten registrerte seg (for eksempel kenyanske shilling for en menighet i Kenya), og den brukes hvis det ikke er lagret noen valuta ennå. Du kan endre den når som helst under **Settings → Giving** (nedtrekkslisten **Currency**). Hvis landet ditt ikke gjenkjennes, starter den på amerikanske dollar.

## Aktivere flere valutaer {#enabling-multi-currency}

Støtte for flere valutaer er aktivert som standard i B1:

- Nettgaver belastes i valutaen du har valgt under innstillingene for **Giving**
- Hver gave beholder valutaen den ble registrert i, og enkeltlinjer for gaver viser denne valutaen
- Samlede summer omregnes til menighetens valuta (se [Omregnede summer](#converted-totals))
- Stripe håndterer valutaomregningen til utbetalingsvalutaen din for nettbasert giving

## Støttede valutaer {#supported-currencies}

Systemet støtter alle større valutaer i verden, blant annet:

- **USD** – amerikanske dollar
- **EUR** – euro
- **GBP** – britiske pund
- **CAD** – kanadiske dollar
- **AUD** – australske dollar
- **MXN** – meksikanske peso
- **BRL** – brasilianske real
- **INR** – indiske rupi
- **CNY** – kinesiske yuan
- **JPY** – japanske yen
- Og mange flere …

Hvilke valutaer som er tilgjengelige for nettbasert giving, avhenger av hvilke valutaer Stripe-kontoen din støtter.

## Registrere gaver i ulike valutaer {#recording-donations-in-different-currencies}

### Nettgaver {#online-donations}

Når et medlem gir på nett via Stripe:

1. Gaven belastes i valutaen som er satt under **Settings → Giving**; givere velger ikke valuta ved kassen
2. Stripe behandler betalingen i den valutaen
3. Gaven registreres i B1 med den valutaen og beløpet
4. Stripe håndterer automatisk eventuell nødvendig valutaomregning til utbetalingsvalutaen for kontoen din

Hvis du endrer innstillingen **Currency** senere, bruker nye gaver den nye valutaen, mens gaver som allerede er registrert beholder sin valuta. Registreringene dine kan dermed inneholde mer enn én valuta.

### Manuell registrering {#manual-entry}

Gaver du legger inn for hånd – i en batch, med **Import CSV**, eller med **Log a gift** på en persons post – registreres alltid i menighetens valuta, som vises ved siden av feltet **Amount**. Det finnes ingen valutanedtrekksliste for manuell registrering, så du må omregne en gave som er gitt i en annen valuta til menighetens valuta før du legger den inn, og eventuelt notere det opprinnelige beløpet i **Notes** hvis du trenger det.

## Se gaver i flere valutaer {#viewing-multi-currency-donations}

### Gaverapporter {#donation-reports}

Enkeltlinjer for gaver – i en batch, på et fonds side og i en persons givehistorikk – viser hver gave i valutaen den ble registrert i. Samlede summer omregnes, slik det beskrives nedenfor.

### Omregnede summer {#converted-totals}

Der B1 viser én samlet sum – nøkkeltallskortene i giving-oversikten, en batchsum og et fonds totalsum – omregnes gaver som er registrert i en annen valuta enn menighetens standardvaluta, til menighetens valuta med dagens valutakurser. Dermed blir summen ett meningsfullt tall i stedet for at ulike valutaer legges sammen. Under summen vises merknaden **Converted at current exchange rates** når en omregning er brukt. Enkeltlinjer for gaver vises fortsatt i opprinnelig valuta.

### Gaveoversikter {#giving-statements}

Gaveoversikter viser hvert gavebeløp slik det ble registrert, og summerer dem uten å omregne. En oversikt er derfor bare nøyaktig når alle givers gaver for året er i menighetens valuta. Hvis en giver har gitt i mer enn én valuta, bør du kontrollere oversikten før du sender den.

## Stripe-integrasjon {#stripe-integration}

For nettbasert giving håndterer Stripe transaksjoner i flere valutaer:

- **Automatisk omregning** – Stripe omregner valutaer til kontoens standardvaluta
- **Valutakurser** – Stripe bruker dagens markedskurser
- **Gebyrer** – valutaomregning kan medføre ekstra Stripe-gebyrer
- **Utbetalingsvaluta** – midlene settes inn i kontoens standardvaluta

:::info
Sjekk Stripe-dashbordet ditt for å se gjeldende valutakurser og eventuelle gebyrer for transaksjoner i flere valutaer.
:::

## Regnskapshensyn {#accounting-considerations}

Når du arbeider med flere valutaer:

- **Dokumentasjon** – hold oversikt over de opprinnelige gavebeløpene og valutaene for korrekt rapportering
- **Valutakurser** – merk deg at Stripes omregningskurser kan avvike fra bankens kurser
- **Skattekvitteringer** – spør regnskapsføreren din om hvordan gaver i ulike valutaer skal rapporteres for skatteformål
- **Fordeling på fond** – du kan fordele gaver til bestemte fond uavhengig av valuta

## Beste praksis {#best-practices}

- **Standardvaluta** – angi menighetens hovedvaluta under **Settings > Giving**, slik at gaver som registreres for hånd og giving-summer bruker den
- **Tydelig kommunikasjon** – fortell givere hvilken valuta de gir i under betalingen
- **Konsekvent rapportering** – samlede summer omregnes alltid automatisk til menighetens valuta; åpne en batch eller et fond for å se hver gaves opprinnelige beløp og valuta
- **Jevnlig avstemming** – avstem Stripe-utbetalinger mot gaveregistreringene dine, og ta hensyn til valutaomregningene

## Begrensninger {#limitations}

- Valutaomregning ved betalingsbehandling håndteres av Stripe, og bare for nettbasert giving; manuelle gaver registreres i menighetens valuta slik de er lagt inn
- Historiske rapporter og enkeltlinjer for gaver viser alltid den opprinnelige valutaen gaven ble registrert i
- Samlede summer (nøkkeltallskort, batchsummer, fondsummer) omregnes til menighetens valuta med dagens valutakurser – disse kursene kan avvike litt fra bankens eller Stripes kurser på tidspunktet midlene gjøres opp

## Relaterte artikler {#related-articles}

- [Oppsett av nettbasert giving](./online-giving-setup.md) – sett opp Stripe for å ta imot gaver
- [Registrere gaver](./recording-donations.md) – før inn gaveregistreringer manuelt
- [Gaverapporter](./donation-reports.md) – lag og se gavesammendrag
- [Gaveoversikter](./giving-statements.md) – lag årlige gaveoversikter
