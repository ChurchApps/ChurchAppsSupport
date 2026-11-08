---
title: "Logge inn i B1 Church Checkin"
sidebar_label: "Innlogging"
description: "Logg inn i B1 Church Checkin-kioskappen, velg menigheten din, og forstå automatisk innlogging, administratorinnstillinger og utlogging på innsjekkingsnettbrettet."
---

# Innlogging

<div class="article-intro">

Før kiosken kan brukes til innsjekking, må du logge inn med en ChurchApps-konto som har tilgang til menigheten din. Denne siden dekker den første innloggingen, valg av menighet, automatisk innlogging og hvordan du logger ut.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Installer B1 Church Checkin på Android-nettbrettet ditt (se [Komme i gang](./index.md))
- Ha e-postadressen og passordet til ChurchApps-kontoen din klare
- Kontoen må ha tillatelsen **Checkin** (eller **Rediger oppmøte**) i menigheten din. En administrator legger den til i B1 Admin under **Innstillinger > Roller** — se [Kontoer for innsjekkingskiosk](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Første innlogging

1. Åpne B1 Church Checkin-appen. Etter startskjermen ser du innloggingsskjermen med B1 Church Checkin-logoen.
2. Skriv inn **e-postadressen din** i det første feltet.
3. Skriv inn **passordet ditt** i det andre feltet.
4. Trykk på knappen **Logg inn**.

Appen validerer påloggingsopplysningene dine og logger deg inn. Hvis e-postadressen eller passordet er feil, vises en feilmelding nederst på skjermen.

Hvis kontoen har [tofaktorpålogging](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) aktivert, ber appen deretter om en kode. Skriv inn den 6-sifrede koden fra autentiseringsappen til kontoeieren, eller en av reservekodene deres, og trykk på **Logg inn** igjen. Du trenger kun koden ved denne første innloggingen; etter det forblir kiosken innlogget.

:::info
Dette er samme e-postadresse og passord som du bruker for B1 Admin eller andre ChurchApps-produkter. Du trenger ikke en egen konto for innsjekkingskiosken.
:::

## Velge menigheten din

Etter vellykket innlogging laster appen inn menighetene der kontoen din har tillatelsen **Checkin** eller **Rediger oppmøte**. Menigheter der du kun har andre tillatelser, utelates. Hvis ingen er igjen, viser appen **Ingen tilgang til innsjekking** og ber deg be menighetsadministratoren om å legge til Checkin-tillatelsen til en av rollene dine. Hver menighet vises som et kort med menighetens navn og logo (hvis en logo er konfigurert i B1 Admin).

- Hvis kontoen din bare er knyttet til **én menighet**, vises likevel valgskjermen. Trykk på menigheten din for å fortsette.
- Hvis kontoen din er knyttet til **flere menigheter**, trykk på menigheten du vil at denne kiosken skal betjene.

Når du har valgt en menighet, laster appen menighetens merkevare- og utseendeinnstillinger. Menighetslogoen din vises i toppteksten på alle påfølgende skjermer.

## Automatisk innlogging ved senere besøk

Etter den første vellykkede innloggingen lagrer appen et sikkert innloggingstoken og den valgte menigheten din på nettbrettet. Den lagrer ikke passordet ditt. Ved fremtidige oppstarter:

- Appen logger deg automatisk inn igjen med det lagrede tokenet.
- Hvis du tidligere valgte en menighet, gjenopprettes valget, og du føres direkte til **tjenestevalgskjermen**.
- Hvis den lagrede innloggingen ikke lenger er gyldig, går appen tilbake til innloggingsskjermen, slik at du kan logge inn på nytt.

:::tip
Fordi kiosken logger inn automatisk, trenger du bare å skrive inn påloggingsopplysningene én gang under førstegangsoppsettet. Deretter kan nettbrettet slås på, og det er klart til bruk.
:::

## Administratorinnstillinger

Administratorinnstillinger er bevisst skjult, slik at medlemmer av menigheten som bruker kiosken, ikke ved et uhell endrer konfigurasjonen. Slik får du tilgang til dem:

1. Trykk **syv ganger** raskt etter hverandre (innen to sekunder) på **menighetslogoen** i toppteksten.
2. Hvis en kiosk-PIN er angitt, skriv inn PIN-koden når du blir bedt om det.
3. Skjermen **Administratorinnstillinger** åpnes med følgende alternativer:
   - **Endre tjeneste** — bytt valgt tjenestetidspunkt
   - **Endre skriver** — åpne [skriverinnstillinger](./printer-setup.md) for å søke etter og velge en skriver
   - **Angi administrator-PIN** (eller **Endre administrator-PIN** når en er angitt) — angi eller oppdater kiosk-PIN-koden som beskytter administratortilgang
   - **Nødkringkasting** — send tekstmelding til foresatte i alle innsjekkede husstander (se [Nødkringkasting](../check-in/checking-out.md#emergency-broadcast))
   - **Bemannet stasjonsmodus** — en bryter som legger til utsjekking, personsøking, utskrift på nytt og redigering av profiler for denne stasjonen (se [Utsjekking](../check-in/checking-out.md))
   - **Logg ut** — logg ut og gå tilbake til innloggingsskjermen

   Trykk på **Tilbake til kiosk** for å gå tilbake til innsjekking.

:::warning
Utlogging fjerner alle lagrede påloggingsopplysninger og valget av menighet. Du må skrive inn e-postadressen og passordet ditt på nytt for å bruke kiosken igjen. Logg bare ut når du må bytte konto eller konfigurere kiosken på nytt.
:::

## Neste steg

Når du er innlogget, kan du [sette opp en skriver](./printer-setup.md) eller gå direkte til [innsjekkingsarbeidsflyten](../check-in/index.md).
