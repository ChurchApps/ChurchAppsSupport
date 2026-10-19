---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking ved gudstjenester via den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien inn på kiosker eller dedikerte enheter når de kommer, noe som gjør prosessen rask og reduserer arbeidsmengden for de frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Campusene, gudstjenestetidene og gruppene dine må være satt opp i [oppmøteoppsettet](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

Appen B1 Checkin kobles til oppmøteoppsettet ditt i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig campus, gudstjenestetid og gruppe. Du trenger ikke registrere oppmøte manuelt for noen som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Sett opp oppmøtestrukturen først.** I B1 Admin går du til **Personer > Oppmøte** og klikker på **Oppsett** for å sikre at campusene, gudstjenestetidene og gruppene dine er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpner og stenger automatisk hver uke. Planene bruker menighetens tidssone, eller campusens tidssone hvis menigheten ikke har en angitt. Kiosken skjuler gudstjenestetider der vinduet er stengt, og forteller familier når innsjekkingen ikke er åpen ennå. Se [Oppmøteoppsett](setup.md) for detaljer.
2. **Installer appen B1 Checkin** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i appen B1 Checkin** med menighetens kontolegitimasjon.
4. **Velg campus og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenhetene på synlige, lett tilgjengelige steder, for eksempel ved inngangen til lobbyen eller ved velkomstdisken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis menigheten din har flere campus, må du gjenta oppsettet for hvert campus i [Oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan settes opp for et annet campus.
:::

## Anbefalt maskinvare {#recommended-hardware}

**Nettbrett**: alle disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10,5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere**: innsjekking fungerer med Brother-etikettskrivere for utskrift av navnelapper:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (bare WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med appen B1 Checkin. Skrivere fra andre merker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-skriverdrivere og oppsettsveiledninger på [Brothers støttesider](https://support.brother.com).
:::

## Tilpasse utseendet til kiosken

Du kan tilpasse utseendet til appen B1 Checkin slik at det passer menighetens profil. I B1 Admin går du til **Mobil > B1 CheckIn** og bruker kortet **Kioskdrakt** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de passer menighetens profil:

- **Primær** og **Primær kontrast**: hovedfarge for profilen og tekstfargen til den.
- **Sekundær** og **Sekundær kontrast**: aksentfarge og tekstfargen til den.
- **Topptekstbakgrunn** og **Bakgrunn for undertopptekst**: farger for toppseksjonene på kiosken.
- **Knappebakgrunn** og **Knappetekst**: farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for velkomst- og oppslagsskjermene på kiosken. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodus-skjerm / Skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodus-skjermen **på** eller **av**.
2. Angi **tidsavbruddet** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder**. Hvert lysbilde har et bilde og en visningsvarighet (minimum 3 sekunder).

:::tip
Bruk hvilemodus-skjermen til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, sendes de til en [gjesteregistreringsside](../../b1-church/checkin/guest-registration), der de skriver inn navn, e-post og familiemedlemmer. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Slå på QR-gjesteregistrering

Slik slår du på visningen av QR-koden:

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk på **Lagre**.

:::note
Denne innstillingen ligger under **Mobil > B1 CheckIn** (på samme side som kortet **Kioskdrakt**), ikke under Oppmøte. Handlingen **Kiosk** på Oppmøte-siden har en lenke til denne siden.
:::

### Dele registreringslenken

Når QR-gjesteregistrering er slått på, vises en seksjon **Del QR-kode for registrering** under bryteren. Den gir deg to måter å få gjester til registreringsskjemaet på, i tillegg til QR-koden på kiosken:

- **Kopier lenke** kopierer registreringsadressen, slik at du kan lime den inn på menighetens nettside, i e-post eller hvor som helst på nettet.
- **Last ned PNG** laster ned QR-koden som et bilde du kan skrive ut på flygeblader, i menighetsbladet eller på skilting.

:::tip
Legg registreringslenken til på menighetens nettside, for eksempel "Planlegg besøket ditt" eller "Jeg er ny", slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

## Hva som registreres

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan se disse registreringene på siden [Oppmøte](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) økter, akkurat som oppmøte som er registrert manuelt. Det er ingen forskjell på hvordan dataene vises. Begge metodene gir data til de samme rapportene.
