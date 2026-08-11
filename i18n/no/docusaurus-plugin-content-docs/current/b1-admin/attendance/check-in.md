---
title: "Sjekk inn"
---

# Sjekk inn

<div class="article-intro">

B1 Admin støtter selvsjekk inn ved gudstjenester gjennom appen **B1 Checkin**. Medlemmer kan sjekke inn seg selv og familien sin ved kioskene eller dedikerte enheter når de ankommer, noe som gjør prosessen rask og reduserer belastningen på frivillige. Hver innsjekking blir automatisk registrert som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Dine campuser, gudstjenesteklokkeslett og grupper må være konfigurert i [Innsjekking Setup](setup.md).
- Du trenger [mennesker i databasen din](../people/adding-people.md) med [hushold](../people/adding-people.md#managing-households) opprettet slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Hvordan det fungerer

B1 Checkin-appen kobles til B1 Admin-oppsettet for oppmøte. Når et medlem sjekker inn, blir oppmøtet deres automatisk registrert mot riktig campus, gudstjenesteklokkeslett og gruppe. Du trenger ikke å registrere oppmøte manuelt for noen som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Konfigurer oppsettet for oppmøte først.** I B1 Admin, gå til **Oppmøte > Setup** og pass på at campuser, gudstjenesteklokkeslett og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Se [Innsjekking Setup](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med kirkeens kontolegitimering.
4. **Velg campus og gudstjenesteklokkeslett** for gjeldende forsamling.
5. Medlemmer kan nå søke etter sitt navn på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige, lett tilgjengelige steder som lobbyer eller velkommen-skranker. En kort kunngjøring under gudstjenestene hjelper medlemmer til å vite at alternativet er tilgjengelig.
:::

:::tip
Hvis kirken din har flere campuser, må du gjenta oppsettet for hver campus i [Innsjekking Setup](setup.md). Hver innsjekking-enhet kan konfigureres for en annen campus.
:::

## Anbefalt maskinvare

**Nettbrett** — noen av disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10,5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere** — innsjekking fungerer med Brother-etikettskrivere for utskrift av navneskilt:

- **Beste:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Kun Brother-etikettskrivere er kompatible med B1 Checkin-appen. Andre merkeskrivere vil ikke fungere for utskrift av navneskilt.
:::

:::info
Følg skriverens oppsettsanvisninger for å koble den til samme WiFi-nettverk som nettbrettet ditt. Du finner Brother-printerdrivere og oppsettveiledninger på [Brother-supportnettstedet](https://support.brother.com).
:::

## Tilpasse kioskens utseende

Du kan tilpasse utseendet og følelsen av B1 Checkin-appen for å samsvare med kirkens merkevaresignaler. I B1 Admin, gå til **Oppmøte > Kiosk Theme** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger for å samsvare med kirkens merkevaresignaler:

- **Primær** og **Primær kontrast** -- Hovedmerkefargen og dens tekstfarge.
- **Sekundær** og **Sekundær kontrast** -- Aksejentfargen og dens tekstfarge.
- **Hodingsbakgrunn** og **Underhodingsbakgrunn** -- Farger for kioskhodeområdene.
- **Knappeikke bakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for kioskens velkomst- og oppslåskjermene. Anbefalt størrelse er 1920x1080 piksler.

### Tomgangs-skjerm / Skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode med inaktivitet:

1. Slå tomgangsskjermen **på** eller **av**.
2. Sett **tidsavbrudd** (hvor mange sekunder av inaktivitet før skjermsparen starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningsvarighet (minimum 3 sekunder).

:::tip
Bruk tomgangsskjermen til å vise kunngjøringer, kommende arrangementer eller velkomsthilsener når kiosken ikke aktivt brukes.
:::

## Gjestregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på sin egen telefon. Dette fremskynder innsjekkingsprosessen for førstegangsbeskjørere.

Når en gjest skanner QR-koden, blir de tatt til en [gjestregistreringsside](../../b1-church/checkin/guest-registration) der de angir navnet sitt, e-postadressen og familiemedlemmer. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivering av QR-gjestregistrering

For å slå på QR-kodeskjermen:

1. I B1 Admin, åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Mobil**.
2. Velg **B1 CheckIn**-fanen.
3. Slå **QR Guest Registration** på og klikk **Lagre**.

:::note
Denne innstillingen er under **Mobil**, ikke under Oppmøte > Kiosk Theme.
:::

### Deling av registreringslenken

Når QR Guest Registration er aktivert, vises en **Del registrerings-QR-kode**-seksjon under vekslerknappen. Dette gir deg to måter å få gjester til registreringskjemaet utover kioskens QR-kode:

- **Kopier lenke** — kopierer registrerings-URL-en slik at du kan lime den inn på kirkens nettsted, i e-poster eller hvor som helst online.
- **Last ned PNG** — laster ned QR-koden som et bilde du kan skrive ut på løpesedler, bulletin eller skilt.

:::tip
Legg til registreringslenken på kirkens nettstedsside "Plan Your Visit" eller "I'm New" slik at gjester kan registrere seg før de ankommer.
:::

## Hva som blir registrert

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan vise disse registreringene på fanene [Oppmøte](tracking-attendance.md) og [Grupper](../groups/group-members.md) på samme måte som manuelt innført oppmøte. Det er ingen forskjell i hvordan dataene vises -- begge metodene føres inn i samme rapporter.
