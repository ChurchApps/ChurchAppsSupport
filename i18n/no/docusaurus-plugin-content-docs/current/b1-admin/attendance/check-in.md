---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvbetjent innsjekking ved tjenester gjennom en tilhørende **B1 Checkin**-app. Medlemmer kan sjekke inn seg selv og familiene sine ved kiosker eller dedikerte enheter når de ankommer, noe som gjør prosessen rask og reduserer arbeidsmengden for frivillige. Hver innsjekking blir automatisk registrert som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Dine campuser, servicetider og grupper må være konfigurert i [Innsjekking-oppsett](setup.md).
- Du må ha [personer i databasen din](../people/adding-people.md) med [hushold](../people/adding-people.md#managing-households) satt opp slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Hvordan det fungerer

B1 Checkin-appen kobles til oppsettet for B1 Admin-oppmøte. Når et medlem sjekker inn, blir oppmøtet deres automatisk registrert mot riktig campus, servicetid og gruppe. Du trenger ikke å registrere oppmøte manuelt for noen som bruker innsjekkingssystemet.

## Konfigurering av innsjekking

1. **Konfigurer først oppmøtestrukturen din.** I B1 Admin går du til **Oppmøte > Oppsett** og sørger for at campuser, servicetider og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Se [Innsjekking-oppsett](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg på B1 Checkin-appen** ved hjelp av kirken din kontolegitimering.
4. **Velg campusen og servicetiden** for det nåværende møtet.
5. Medlemmer kan nå søke etter sitt navn på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige, lett tilgjengelige steder som innganger til lobbyen eller velkomstdesker. En kort kunngjøring under tjenester hjelper medlemmene med å vite at alternativet er tilgjengelig.
:::

:::tip
Hvis kirken din har flere campuser, må du gjenta oppsettet for hver campus i [Innsjekking-oppsett](setup.md). Hver innsjekkingsenhet kan konfigureres for en annen campus.
:::

## Anbefalt maskinvare

**Nettbrett** — noen av disse fungerer bra med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stort skjerm:** Samsung Galaxy Tab A8 10,5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere** — innsjekking fungerer med Brother-etikettskrivere for utskrift av navn:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med B1 Checkin-appen. Andre skrivermerkevarer vil ikke fungere for utskrift av navn.
:::

:::info
Følg skriverens oppsettsanvisninger for å koble den til samme WiFi-nettverk som nettbrettet. Du kan finne Brother-skriverdrivere og oppsettsguider på [Brother-støttesiden](https://support.brother.com).
:::

## Tilpasning av kioskutseende

Du kan tilpasse utseendet og følelsen på B1 Checkin-appen for å samsvare med kirkens merkevare. I B1 Admin går du til **Oppmøte > Kiosktemplate** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger for å samsvare med kirkens merkevare:

- **Primær** og **Primær kontrast** -- Hovedmerkefarge og dens tekstfarge.
- **Sekundær** og **Sekundær kontrast** -- Accentfarge og dens tekstfarge.
- **Hodebakgrunn** og **Underhodebakgrunn** -- Farger for kioskhodearealene.
- **Knapebakgrunn** og **Knapetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for velkomst- og søkeskjermene i kioskene. Anbefalt størrelse er 1920x1080 piksler.

### Ledig skjerm / Pauseskjerm

Konfigurer en pauseskjerm som aktiveres etter en periode med inaktivitet:

1. Slå skjermen idle **på** eller **av**.
2. Angi **tidsavbrudd** (hvor mange sekunder med inaktivitet før pauseskjermen starter, minimum 10 sekunder).
3. Legg til en eller flere **lysbilder** -- hvert lysbilde har et bilde og varighet for visning (minimum 3 sekunder).

:::tip
Bruk skjermen idle til å vise kunngjøringer, kommende hendelser eller velkomstmeldinger når kioskene ikke aktivt brukes.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skannet for å registrere seg selv og familien sin på sin egen telefon. Dette øker hastigheten på innsjekkingsprosessen for førsteganggsgjester.

Når en gjest skannet QR-koden, blir de tatt til en [gjesteregistreringside](../../b1-church/checkin/guest-registration) hvor de oppgir sitt navn, e-post og familiemedlemmer. En frivillig kan deretter slå dem opp på kioskene og sjekke dem inn.

### Aktivering av QR-gjesteregistrering

For å aktivere QR-kodedisplayen:

1. I B1 Admin går du til **Mobiltelefon** i venstre sidefelt (telefonikon).
2. Velg fanen **Innsjekking**.
3. Slå **QR-gjesteregistrering** på.

:::note
Denne innstillingen er under **Mobiltelefon**, ikke under Oppmøte > Kiosktemplate.
:::

## Hva som blir registrert

Hver innsjekking oppretter en oppmøtepost i B1 Admin. Du kan se disse postene på fanene [Oppmøte](tracking-attendance.md) og [Grupper](../groups/group-members.md) akkurat som manuelt registrert oppmøte. Det er ingen forskjell i hvordan dataene vises -- begge metodene føres inn i de samme rapportene.
