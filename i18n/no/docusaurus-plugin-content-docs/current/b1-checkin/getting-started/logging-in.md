---
title: "Logge inn"
---

# Logge inn

<div class="article-intro">

Før kiosken kan brukes til innsjekking, må du logge inn med en ChurchApps-konto som har tilgang til kirken din. Denne siden dekker innlogging første gang, valg av kirke, oppførsel ved automatisk innlogging og hvordan du logger ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer B1 Church Checkin på Android-nettbrettet ditt (se [Komme i gang](./index.md))
- Ha e-postadressen og passordet til ChurchApps-kontoen din klare

</div>

## Innlogging første gang

1. Åpne B1 Church Checkin-appen. Etter velkomstskjermen ser du påloggingsskjermen med B1 Church Checkin-logoen.
2. Skriv inn **e-postadressen** din i det første feltet.
3. Skriv inn **passordet** ditt i det andre feltet.
4. Trykk på **Logg inn**-knappen.

Appen validerer påloggingsopplysningene dine og logger deg inn. Hvis e-posten eller passordet er feil, vises en feilmelding nederst på skjermen.

Hvis kontoen har [tofaktorpålogging](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) slått på, ber appen deretter om en kode. Skriv inn den 6-sifrede koden fra kontoeierens autentiseringsapp, eller en av reservekodene deres, og trykk **Logg inn** igjen. Du trenger bare koden for denne første innloggingen; etter det forblir kiosken innlogget.

:::info
Dette er samme e-post og passord som du bruker for B1 Admin eller et hvilket som helst annet ChurchApps-produkt. Du trenger ingen egen konto for innsjekkingskiosken.
:::

## Velge kirken din

Etter en vellykket innlogging laster appen en liste over kirker som er koblet til kontoen din. Hver kirke vises som et kort med kirkens navn og logo (hvis den er konfigurert i B1 Admin).

- Hvis kontoen din bare er koblet til **én kirke**, ser du likevel valgskjermen. Trykk på kirken din for å fortsette.
- Hvis kontoen din er koblet til **flere kirker**, trykk på kirken du vil at denne kiosken skal betjene.

Når du velger en kirke, laster appen den kirkens profil- og utseendeinnstillinger. Kirkens logo vises i toppteksten på alle påfølgende skjermer.

## Automatisk innlogging ved senere besøk

Etter den første vellykkede innloggingen lagrer appen et sikkert innloggingstoken og den valgte kirken din på nettbrettet. Den lagrer ikke passordet ditt. Ved fremtidige oppstarter:

- Appen logger deg inn igjen med det lagrede tokenet.
- Hvis du tidligere valgte en kirke, gjenoppretter den valget og tar deg direkte til **gudstjenestevisningen**.
- Hvis den lagrede innloggingen ikke lenger er gyldig, går appen tilbake til påloggingsskjermen, slik at du kan logge inn på nytt.

:::tip
Fordi kiosken logger inn automatisk, trenger du bare å skrive inn påloggingsopplysningene én gang under det første oppsettet. Etter det kan nettbrettet slås på, og det er klart til bruk.
:::

## Admininnstillinger

Admininnstillinger er bevisst skjult, slik at medlemmer som bruker kiosken ikke ved et uhell endrer konfigurasjonen. Slik får du tilgang til dem:

1. Trykk på **kirkelogoen** i toppteksten **sju ganger** raskt etter hverandre (innen to sekunder).
2. Hvis en kiosk-PIN er satt, skriver du inn PIN-koden når du blir bedt om det.
3. Skjermen **Admininnstillinger** åpnes med følgende alternativer:
   - **Bytt gudstjeneste** — bytt valgt gudstjenestetid
   - **Bytt skriver** — åpne [skriverinnstillinger](./printer-setup) for å søke etter og velge en skriver
   - **Angi/endre PIN** — angi eller oppdater kiosk-PIN-koden som beskytter adminadgangen
   - **Logg ut** — logg ut og gå tilbake til påloggingsskjermen

:::warning
Å logge ut fjerner alle lagrede påloggingsopplysninger og kirkevalget. Du må skrive inn e-post og passord på nytt for å bruke kiosken igjen. Logg bare ut når du må bytte konto eller konfigurere kiosken på nytt.
:::

## Neste steg

Når du er logget inn, kan du [sette opp en skriver](./printer-setup) eller gå rett til [innsjekkingsflyten](../check-in/).
