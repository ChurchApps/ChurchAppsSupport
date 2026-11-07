---
title: "Logge inn i B1 Church Checkin"
sidebar_label: "Logge inn"
description: "Logg inn i B1 Church Checkin-kioskappen, velg menighet, og forstå automatisk innlogging, admininnstillinger og utlogging på nettbrettet."
---

# Logge inn

<div class="article-intro">

Før kiosken kan brukes til innsjekking, må du logge inn med en ChurchApps-konto som har tilgang til kirken din. Denne siden dekker innlogging første gang, valg av kirke, automatisk innlogging og hvordan du logger ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer B1 Church Checkin på Android-nettbrettet ditt (se [Komme i gang](./index.md))
- Ha e-postadressen og passordet til ChurchApps-kontoen din klare
- Kontoen trenger tillatelsen **Innsjekking** (eller **Rediger oppmøte**) i kirken din. En administrator legger den til i B1 Admin under **Innstillinger > Roller** -- se [Kontoer for innsjekkingskiosk](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Innlogging første gang

1. Åpne B1 Church Checkin-appen. Etter startskjermen ser du innloggingsskjermen med B1 Church Checkin-logoen.
2. Skriv inn **e-postadressen** din i det første feltet.
3. Skriv inn **passordet** ditt i det andre feltet.
4. Trykk på knappen **Logg inn**.

Appen validerer påloggingsopplysningene dine og logger deg inn. Hvis e-posten eller passordet er feil, vises en feilmelding nederst på skjermen.

Hvis kontoen har [tofaktorinnlogging](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) slått på, ber appen deretter om en kode. Skriv inn den 6-sifrede koden fra kontoeierens autentiseringsapp, eller en av reservekodene deres, og trykk **Logg inn** igjen. Du trenger bare koden ved denne første innloggingen; etter det forblir kiosken innlogget.

:::info
Dette er samme e-post og passord som du bruker for B1 Admin eller et hvilket som helst annet ChurchApps-produkt. Du trenger ingen egen konto for innsjekkingskiosken.
:::

## Velge kirken din

Etter en vellykket innlogging laster appen inn kirkene der kontoen din har tillatelsen **Innsjekking** eller **Rediger oppmøte**. Kirker der du bare har andre tillatelser utelates. Hvis ingen gjenstår, viser appen **Ingen tilgang til innsjekking** og ber deg be kirkens administrator om å legge til tillatelsen Innsjekking i en av rollene dine. Hver kirke vises som et kort med kirkens navn og logo (hvis den er konfigurert i B1 Admin).

- Hvis kontoen din er koblet til **bare én kirke**, ser du likevel valgskjermen. Trykk på kirken din for å fortsette.
- Hvis kontoen din er koblet til **flere kirker**, trykker du på kirken du vil at denne kiosken skal betjene.

Når du har valgt en kirke, laster appen den kirkens profil og utseendeinnstillinger. Kirkens logo vises i toppteksten på alle påfølgende skjermer.

## Automatisk innlogging ved senere besøk

Etter den første vellykkede innloggingen lagrer appen et sikkert innloggingstoken og den valgte kirken din på nettbrettet. Den lagrer ikke passordet ditt. Ved fremtidige oppstarter:

- Appen logger deg inn igjen med det lagrede tokenet.
- Hvis du tidligere valgte en kirke, gjenoppretter den valget og tar deg rett til **gudstjenesteskjermen**.
- Hvis den lagrede innloggingen ikke lenger er gyldig, går appen tilbake til innloggingsskjermen, slik at du kan logge inn igjen.

:::tip
Fordi kiosken logger inn automatisk, trenger du bare å skrive inn påloggingsopplysningene én gang under førstegangsoppsettet. Etter det kan nettbrettet slås på, og det er klart til bruk.
:::

## Administratorinnstillinger

Administratorinnstillinger er bevisst skjult, slik at medlemmer som bruker kiosken ikke ved et uhell endrer konfigurasjonen. Slik får du tilgang til dem:

1. Trykk på **kirkelogoen** i toppteksten **sju ganger** raskt etter hverandre (innen to sekunder).
2. Hvis det er satt en kiosk-PIN, skriver du inn PIN-koden når du blir bedt om det.
3. Skjermen **Administratorinnstillinger** åpnes med følgende alternativer:
   - **Bytt gudstjeneste** -- bytt den valgte gudstjenestetiden
   - **Bytt skriver** -- åpne [skriverinnstillingene](./printer-setup.md) for å søke etter og velge en skriver
   - **Sett/endre PIN** -- sett eller oppdater kiosk-PIN-koden som beskytter administratortilgangen
   - **Logg ut** -- logg ut og gå tilbake til innloggingsskjermen

:::warning
Å logge ut fjerner alle lagrede påloggingsopplysninger og valget av kirke. Du må skrive inn e-post og passord på nytt for å bruke kiosken igjen. Logg bare ut når du må bytte konto eller konfigurere kiosken på nytt.
:::

## Neste steg

Når du er logget inn, kan du [sette opp en skriver](./printer-setup.md) eller gå direkte til [innsjekkingsflyten](../check-in/index.md).
