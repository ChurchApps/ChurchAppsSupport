---
title: "Innsjekking"
---

# Innsjekking {#check-in}

<div class="article-intro">

B1 Admin støtter selvinnsjekking på gudstjenester via den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien sin inn på kiosker eller egne enheter når de kommer, noe som gjør prosessen rask og avlaster de frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Campus, gudstjenestetider og grupper må være satt opp i [Oppsett av oppmøte](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [anbefalinger for maskinvare](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det {#how-it-works}

Appen B1 Checkin kobles til oppsettet for oppmøte i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig campus, gudstjenestetid og gruppe. Du trenger ikke registrere oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Sette opp innsjekking {#setting-up-check-in}

1. **Konfigurer oppmøtestrukturen først.** I B1 Admin går du til **Personer > Oppmøte** og klikker **Oppsett** for å kontrollere at campus, gudstjenestetider og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpner og stenger automatisk hver uke. Planene bruker tidssonen til gudstjenestens campus, eller kirkens tidssone hvis campuset ikke har en tidssone satt. Kiosken viser gudstjenestetider der innsjekkingsvinduet er stengt som **Stengt**, og forteller familier når innsjekkingen åpner. Se [Oppsett av oppmøte](setup.md) for detaljer.
2. **Installer appen B1 Checkin** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i appen B1 Checkin** med kirkens brukerkonto.
4. **Velg campus og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige og lett tilgjengelige steder, for eksempel ved inngangen i lobbyen eller ved velkomstdisken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis kirken din har flere campus, må du gjenta oppsettet for hvert campus i [Oppsett av oppmøte](setup.md). Hver innsjekkingsenhet kan settes opp for et annet campus.
:::

## Anbefalt maskinvare {#recommended-hardware}

**Nettbrett** — alle disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10.5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere** — innsjekking fungerer med Brother-etikettskrivere for utskrift av navnelapper:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med appen B1 Checkin. Skrivere fra andre merker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-drivere og oppsettsveiledninger på [Brothers støttesider](https://support.brother.com).
:::

## Tilpasse utseendet til kiosken {#customizing-the-kiosk-appearance}

Du kan tilpasse utseendet til appen B1 Checkin, slik at det passer til kirkens profil. I B1 Admin går du til **Mobil > B1 CheckIn** og bruker kortet **Kiosk-tema** til å konfigurere:

### Farger {#colors}

Tilpass åtte fargeinnstillinger slik at de passer til kirkens profil:

- **Primær** og **Primær kontrast** -- Hovedfarge for profilen og tekstfargen på den.
- **Sekundær** og **Sekundær kontrast** -- Aksentfarge og tekstfarge for den.
- **Bakgrunn for topptekst** og **Bakgrunn for undertekst** -- Farger for toppområdene på kiosken.
- **Knappebakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde {#background-image}

Last opp et valgfritt bakgrunnsbilde for velkomst- og oppslagsskjermene på kiosken. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodus / skjermsparer {#idle-screen--screensaver}

Sett opp en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodus **på** eller **av**.
2. Angi **tidsavbrudd** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningstid (minimum 3 sekunder).

:::tip
Bruk hvilemodus til å vise kunngjøringer, kommende arrangementer eller velkomstbeskjeder når kiosken ikke er i bruk.
:::

## Gjesteregistrering via QR-kode {#guest-registration-via-qr-code}

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, sendes vedkommende til en [registreringsside for gjester](../../b1-church/checkin/guest-registration), der de skriver inn navn, e-post og familiemedlemmer. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering {#enabling-qr-guest-registration}

Slik slår du på visningen av QR-koden:

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk **Lagre**.

:::note
Denne innstillingen ligger under **Mobil > B1 CheckIn** (samme side som kortet **Kiosk-tema**), ikke under Oppmøte. Handlingen **Kiosk** på oppmøtesiden har en lenke til denne siden.
:::

### Dele registreringslenken {#sharing-the-registration-link}

Når QR-gjesteregistrering er aktivert, vises en seksjon med **Del QR-kode for registrering** under bryteren. Dette gir deg to måter å nå gjester med registreringsskjemaet på, i tillegg til QR-koden på kiosken:

- **Kopier lenke** — kopierer registreringsadressen, slik at du kan lime den inn på kirkens nettside, i e-post eller andre steder på nettet.
- **Last ned PNG** — laster ned QR-koden som et bilde du kan skrive ut på flyers, menighetsblad eller skilt.

:::tip
Legg registreringslenken til på kirkens nettside, for eksempel siden «Planlegg besøket» eller «Jeg er ny», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

## Hva som registreres {#what-gets-recorded}

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan se disse på siden [Oppmøte](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) økter, akkurat som manuelt registrert oppmøte. Det er ingen forskjell på hvordan dataene vises — begge metodene går inn i de samme rapportene.
