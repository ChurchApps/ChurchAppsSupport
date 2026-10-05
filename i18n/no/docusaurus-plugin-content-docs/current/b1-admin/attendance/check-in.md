---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking på samlinger gjennom følgeappen **B1 Checkin**. Medlemmer kan sjekke inn seg selv og familien sin på kiosker eller dedikerte enheter når de kommer, noe som gjør prosessen rask og gir frivillige mindre å gjøre. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Menighetens campuser, samlingstidspunkter og grupper må være satt opp i [Oppsett av oppmøte](setup.md).
- Du trenger [personer i databasen din](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [anbefalt utstyr](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen er koblet til oppsettet for oppmøte i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig campus, samlingstidspunkt og gruppe. Du trenger ikke å registrere oppmøte manuelt for dem som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Sett opp strukturen for oppmøte først.** Gå til **Oppmøte > Oppsett** i B1 Admin og kontroller at campuser, samlingstidspunkter og grupper er på plass. Innsjekkingsappen bygger på dette oppsettet. Se [Oppsett av oppmøte](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på disse plattformene:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med menighetens kontoopplysninger.
4. **Velg campus og samlingstidspunkt** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenhetene på synlige steder som er lette å nå, for eksempel ved inngangen eller i vestibylen. En kort kunngjøring under gudstjenesten gjør at medlemmene vet at muligheten finnes.
:::

:::tip
Hvis menigheten har flere campuser, må du gjenta oppsettet for hver campus i [Oppsett av oppmøte](setup.md). Hver innsjekkingsenhet kan settes opp for en egen campus.
:::

## Anbefalt utstyr

**Nettbrett** – alle disse fungerer bra med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10,5"
- **Rimelig:** Amazon Fire HD 10

**Skrivere** – innsjekkingen fungerer med Brother-etikettskrivere for utskrift av navnelapper:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Rimelig:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med B1 Checkin-appen. Skrivere fra andre merker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettveiledning for å koble den til det samme WiFi-nettverket som nettbrettet. Du finner Brother-skriverdrivere og oppsettveiledninger på [Brothers støtteside](https://support.brother.com).
:::

## Tilpasse utseendet på kiosken

Du kan tilpasse utseendet til B1 Checkin-appen slik at det passer menighetens profil. Gå til **Mobil > B1 CheckIn** i B1 Admin og bruk kortet **Kiosktema** til å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de passer menighetens profil:

- **Primær** og **Primær kontrast** -- Hovedfargen og tekstfargen som brukes på den.
- **Sekundær** og **Sekundær kontrast** -- Aksentfargen og tekstfargen som brukes på den.
- **Bakgrunn for topptekst** og **Bakgrunn for undertopptekst** -- Farger for toppområdene på kiosken.
- **Knappebakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde til velkomstskjermen og søkeskjermen på kiosken. Anbefalt størrelse er 1920x1080 piksler.

### Hvileskjerm / skjermsparer

Sett opp en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvileskjermen **på** eller **av**.
2. Angi **tidsavbrudd** (hvor mange sekunder uten aktivitet før skjermspareren starter, minst 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningstid (minst 3 sekunder).

:::tip
Bruk hvileskjermen til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på sin egen telefon. Dette gjør innsjekkingen raskere for førstegangsbesøkende.

Når en gjest skanner QR-koden, kommer vedkommende til en [side for gjesteregistrering](../../b1-church/checkin/guest-registration) der navn, e-post og familiemedlemmer fylles inn. En frivillig kan deretter slå opp gjesten på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

Slik slår du på visningen av QR-koden:

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) i B1 Admin og utvid **Mobil**.
2. Klikk på **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk på **Lagre**.

:::note
Denne innstillingen finner du under **Mobil > B1 CheckIn** (samme side som kortet **Kiosktema**), ikke under Oppmøte.
:::

### Dele registreringslenken

Når QR-gjesteregistrering er aktivert, vises en seksjon med **Del QR-kode for registrering** under bryteren. Den gir deg to måter å få gjester til registreringsskjemaet på, i tillegg til QR-koden på kiosken:

- **Kopier lenke** — kopierer registreringsadressen slik at du kan lime den inn på menighetens nettsted, i e-poster eller andre steder på nettet.
- **Last ned PNG** — laster ned QR-koden som et bilde du kan skrive ut på flygeblader, programmer eller skilt.

:::tip
Legg registreringslenken på menighetens nettside for «Planlegg besøket» eller «Jeg er ny», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

## Hva som registreres

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan se disse registreringene i fanene [Oppmøte](tracking-attendance.md) og [Grupper](../groups/group-members.md), akkurat som manuelt registrert oppmøte. Dataene vises på samme måte uansett – begge metodene mater de samme rapportene.
