---
title: "Gi gaver i B1.church-medlemsportalen"
sidebar_label: "Gi en gave"
description: "Gi en engangsgave eller fast gave til menigheten din gjennom B1.church, med eller uten konto, og se givehistorikken din etterpå."
---

# Gi en gave

<div class="article-intro">

Det finnes to måter å gi en gave på via menighetens B1.church-nettsted: den offentlige givesiden (ingen innlogging nødvendig) og givesiden for medlemmer (innlogging nødvendig). Begge bruker et sikkert gaveskjema fra menighetens betalingsleverandør (de fleste menigheter bruker Stripe).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For offentlige gaver trenger du ingen konto -- bare besøk menighetens side **Doner**.
- For gaver som medlem, med historikk og lagrede betalingsmetoder, må du [logge inn](../getting-started/logging-in.md) på kontoen din først.

</div>

## Offentlig givside (ingen innlogging nødvendig) {#public-donation-page-no-login-required}

Alle kan gi en gave uten å opprette en konto:

1. Gå til menighetens side **Doner**.
2. Gaveskjemaet vises på venstre side av siden. Velg **Gi en gave** for en engangsgave, eller **Gi en fast gave** for å gi etter en plan (velg frekvens og startdato).
3. Skriv inn **fornavn**, **etternavn** og **e-post**, og deretter kortopplysningene dine.
4. Under **Fond** skriver du inn et **Beløp** og velger **Fond**. Klikk på **Legg til flere** for å fordele gaven din på flere fond.
5. Du kan eventuelt legge til et **Notat**. Hvis menigheten tillater det, kan du krysse av for å dekke transaksjonsgebyrene.
6. Klikk på **Doner** for å fullføre gaven din.

For å gi uten at navnet ditt står på gaven, krysser du av for **Gi anonymt (bare engangsgaver)**. Navnefeltene og alternativet for fast gave forsvinner da.

På høyre side av siden, under **Administrer gaver**, finner du en lenke til **Instruksjoner for ACH-betaling** hvis du heller vil gi med bankoverføring. Det finnes også en knapp for **Logg inn** (og en lenke **Logg inn for å administrere eksisterende gaver** under skjemaet) hvis du vil logge inn for å få tilgang til flere funksjoner, som givehistorikk.

Siden **Giving** i medlemsportalen (`/mobile/donate`) viser samme skjema når du er logget ut, med en lenke under: **Logg inn for å administrere faste gaver og se historikk**.

:::tip
Hvis du allerede er innlogget når du besøker den offentlige givesiden, sendes du automatisk videre til givesiden for medlemmer, der du har tilgang til hele givehistorikken din og lagrede betalingsmetoder.
:::

## Givesiden for medlemmer (innlogget) {#member-donation-page-logged-in}

Når du er innlogget, viser siden **Giving** i medlemsportalen en knapp for **Gi** og en knapp for **Skriv ut kvittering** øverst, etterfulgt av disse seksjonene:

- **I år** (med inneværende år som tittel) -- Totalen din for året så langt og antall gaver, med en lenke til **Hele historikken**. Se [Givehistorikk](./donation-history.md) for detaljer.
- **Gjentagende** -- Dine planlagte gaver, med en lenke til **Administrer**.
- **Nylig aktivitet** -- Dine tre siste gaver, med en lenke til **Gjenta siste gave** som åpner gaveskjemaet.
- **Betalingsmetoder** -- Dine lagrede kort og bankkontoer, med en lenke til **Administrer** for å legge til et kort eller en bankkonto og for å redigere eller fjerne lagrede.
- Et kort med kampanjefremdrift, hvis menigheten har en aktiv kampanje.

Slik gir du:

1. Åpne givesiden fra menighetens fane **Doner**, fra knappen **Gi** i seksjonen **Giving** på [Hjem-oversikten](../getting-started/navigating.md#home), eller fra **Historikk** i seksjonen **Giving** på [Me-siden](../getting-started/me-page.md). På givesiden trykker du på **Gi** for å åpne gaveskjemaet.
2. Velg **Gi en engangsgave** eller **Gi en fast gave**.
3. Velg en eksisterende lagret betalingsmetode, eller skriv inn nye kortopplysninger. Når du legger inn et nytt kort, krysser du av for **Lagre dette kortet for fremtidige gaver** for å beholde det til neste gang (hvis menighetens leverandør støtter lagrede kort).
4. Velg **Fond** du vil gi til, og skriv inn **Beløpet**. Klikk på **Legg til flere** for å gi til mer enn ett fond. Listen viser bare fondene menigheten tilbyr givere, selv om du er ansatt og kan se andre fond i B1 Admin.
5. Klikk på **Forhåndsvis gave** for å se gjennom gaven, og deretter på **Doner** for å fullføre den. **Avbryt** går tilbake til givesiden.

Når gaven din er behandlet, vises en melding om at den er fullført, og gaven vises i [givehistorikken](./donation-history.md) din.

:::info
Hvis gavene du har gitt er registrert i mer enn én valuta, omregnes totalen for året og totalen i historikken til menighetens valuta, med et notat **Omregnet etter gjeldende valutakurser** under. Enkeltgavene i historikken din viser fortsatt den opprinnelige valutaen.
:::

## Betalingsmetoder {#payment-methods}

Gaver behandles trygt av betalingsleverandøren menigheten din er koblet til. Hva du kan betale med, avhenger av leverandøren:

- **Stripe** -- kreditt- eller debetkort, eller bankkonto (ACH).
- **Kingdom Funding** -- kreditt- eller debetkort, eller bankkonto (ACH).
- **Paystack** (menigheter i Afrika) -- lokale kort og mobilbetaling, i din lokale valuta.
- **PayPal og Venmo** -- menigheter som allerede hadde PayPal satt opp, viser knapper for **PayPal** og **Venmo** over kortfeltene for engangsgaver. Faste gaver bruker kortfeltene.

Når du er innlogget, kan betalingsmetodene dine lagres for senere bruk, slik at det går raskere å gi neste gang.

:::info Giving med bankkonto uten innlogging
Hvis du gir som gjest (uten å logge inn) med bankkonto, må kontoen verifiseres umiddelbart ved at du logger inn i banken din. Hvis det ikke går, ser du «Denne bankkontoen kunne ikke verifiseres umiddelbart. Gi med kort, eller logg inn og legg til bankkontoen under givingprofilen din.» Bankkontoer som trenger noen dager med verifisering, kan bare legges til etter at du har logget inn.
:::

:::warning
Hvis gaven din ikke går gjennom, kontroller betalingsopplysningene dine og prøv igjen. Hvis problemet vedvarer, kontakt menighetskontoret for hjelp.
:::

## Neste steg {#next-steps}

- [Givehistorikk](./donation-history.md) -- Se tidligere gaver og skriv ut givekvitteringer
