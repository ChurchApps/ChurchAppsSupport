---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvbetjent innsjekking ved gudstjenester gjennom den tilhørende **B1 Checkin**-appen. Medlemmer kan sjekke inn seg selv og familiene sine ved kiosker eller dedikerte enheter når de ankommer, noe som gjør prosessen rask og reduserer arbeidsmengden for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Dine campus, gudstjenestetider og grupper må være konfigurert i [Oppmøteoppsett](setup.md).
- Du trenger [personer i databasen din](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [anbefalte maskinvare](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen kobles til ditt B1 Admin-oppmøteoppsett. Når et medlem sjekker inn, registreres oppmøtet automatisk mot riktig campus, gudstjenestetid og gruppe. Du trenger ikke å registrere oppmøte manuelt for noen som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Konfigurer oppmøtestrukturen din først.** I B1 Admin, gå til **Oppmøte > Oppsett** og sørg for at campus, gudstjenestetider og grupper er på plass. Innsjekking-appen er avhengig av denne konfigurasjonen. Se [Oppmøteoppsett](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn på B1 Checkin-appen** med kirkens kontoinformasjon.
4. **Velg campus og gudstjenestetid** for det aktuelle møtet.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige, lett tilgjengelige steder som lobbyer eller velkomstdisker. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at muligheten er tilgjengelig.
:::

:::tip
Hvis kirken din har flere campus, må du gjenta oppsettet for hvert campus i [Oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan konfigureres for et annet campus.
:::

## Anbefalt maskinvare

**Nettbrett** — alle disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10.5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere** — innsjekking fungerer med Brother-etikettskrivere for utskrift av navnelapper:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **Bra:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Kun Brother-etikettskrivere er kompatible med B1 Checkin-appen. Andre skrivermerker vil ikke fungere for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettinstruksjoner for å koble den til det samme WiFi-nettverket som nettbrettet. Du finner Brother-skriverdrivere og oppsettguider på [Brothers støtteside](https://support.brother.com).
:::

## Tilpasse kioskens utseende

Du kan tilpasse utseendet til B1 Checkin-appen for å matche kirkens merkevare. I B1 Admin, gå til **Oppmøte > Kiosktema** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger for å matche kirkens merkevare:

- **Primær** og **Primærkontrast** -- Hovedmerkefargen og dens tekstfarge.
- **Sekundær** og **Sekundærkontrast** -- Aksentfarge og dens tekstfarge.
- **Topptekstbakgrunn** og **Undertopptekstbakgrunn** -- Farger for kioskens topptekstområder.
- **Knappebakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for kioskens velkomst- og oppslagsskjermer. Anbefalt størrelse er 1920x1080 piksler.

### Hvileskjerm / Skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode med inaktivitet:

1. Slå hvileskjermen **på** eller **av**.
2. Sett **tidsavbruddet** (hvor mange sekunder med inaktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningstid (minimum 3 sekunder).

:::tip
Bruk hvileskjermen til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i aktiv bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på sin egen telefon. Dette gjør innsjekkingsprosessen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, tas de til en [gjesteregistreringsside](../../b1-church/checkin/guest-registration) der de oppgir navn, e-post og familiemedlemmer. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

For å slå på QR-kodevisningen:

1. I B1 Admin, gå til **Mobil** i venstre sidefelt (telefonikon).
2. Velg fanen **Innsjekking**.
3. Slå **QR-gjesteregistrering** på.

:::note
Denne innstillingen er under **Mobil**, ikke under Oppmøte > Kiosktema.
:::

## Hva som registreres

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan se disse registreringene på fanene [Oppmøte](tracking-attendance.md) og [Grupper](../groups/group-members.md) akkurat som manuelt registrert oppmøte. Det er ingen forskjell i hvordan dataene vises — begge metodene mates inn i de samme rapportene.
