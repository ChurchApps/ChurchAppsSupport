---
title: "Selvinnsjekking med B1 Checkin og B1 Admin"
sidebar_label: "Innsjekking"
description: "Sett opp selvinnsjekking til gudstjenester med appen B1 Checkin i B1 Admin, med enheter, kioskkontoer, tidsplaner, profilering og QR-registrering av gjester."
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking til gudstjenester gjennom den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien sin inn ved kiosker eller dedikerte enheter når de kommer, noe som gjør prosessen raskere og reduserer arbeidsbyrden for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Menighetene, gudstjenestetidspunktene og gruppene dine må være satt opp i [oppmøteoppsett](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det {#how-it-works}

Appen B1 Checkin kobles til oppsettet ditt for oppmøte i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig menighet, gudstjenestetidspunkt og gruppe. Du trenger ikke å legge inn oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Sette opp innsjekking {#setting-up-check-in}

1. **Konfigurer oppmøtestrukturen først.** Gå til **People > Attendance** i B1 Admin og klikk **Setup** for å sørge for at menighetene, gudstjenestetidspunktene og gruppene dine er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hvert gudstjenestetidspunkt en [innsjekkingstidsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpnes og lukkes automatisk hver uke. Tidsplaner bruker tidssonen til gudstjenestens menighet, eller menighetens tidssone dersom menigheten ikke har en satt. Kiosken viser gudstjenestetidspunkter der tidsvinduet er stengt som **Closed**, og forteller familiene når innsjekkingen åpner. Se [oppmøteoppsett](setup.md) for detaljer.
2. **Installer appen B1 Checkin** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i appen B1 Checkin** med en konto som har tillatelsen **Checkin** for oppmøte (eller **Edit Attendance**). Se [kioskkontoer for innsjekking](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Velg menighet og gudstjenestetidspunkt** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke seg inn.

:::tip
Plasser innsjekkingsenheter på synlige, lett tilgjengelige steder, for eksempel ved inngangen i foajeen eller ved velkomstdisken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis menigheten din har flere menigheter, må du gjenta oppsettet for hver menighet i [oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan settes opp for en ulik menighet.
:::

## Anbefalt maskinvare {#recommended-hardware}

**Nettbrett** — alle disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10,5"
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
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-drivere og oppsettsveiledninger på [Brothers støttested](https://support.brother.com).
:::

## Tilpasse utseendet til kiosken {#customizing-the-kiosk-appearance}

Du kan tilpasse utseendet til appen B1 Checkin slik at det passer til menighetens profil. Gå til **Mobile > B1 CheckIn** i B1 Admin (eller klikk **Kiosk** på oppmøtesiden) og bruk kortet **Kiosk Theme**. Klikk **Save** på kortet etter at du har gjort endringer.

### Farger {#colors}

Kiosken bruker de samme fargene som menighetens app. Angi dem under **Mobile > App Theme**; kortet Kiosk Theme har ingen egne fargeinnstillinger.

### Bakgrunnsbilde {#background-image}

Under **Background Image** klikker du **Upload Image** for å legge til et valgfritt bakgrunnsbilde for velkomst- og oppslagsskjermene på kiosken. Anbefalt størrelse er 1920x1080 piksler. Bruk **Change Image** eller **Remove** for å erstatte eller fjerne det.

### Hvilemodus / skjermsparer {#idle-screen--screensaver}

Sett opp en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Åpne **Idle Screen / Screensaver** og slå på **Enable idle screen**.
2. Angi **Timeout (seconds)** – hvor mange sekunder uten aktivitet som må gå før skjermspareren starter (minimum 10).
3. Klikk **Add Slide** for hvert lysbilde, klikk **Upload** for å velge bildet, og angi **Duration (s)** (minimum 3 sekunder).

:::tip
Bruk hvilemodusen til å vise kunngjøringer, kommende arrangementer eller velkomsthilsener når kiosken ikke er i bruk.
:::

## Registrering av gjester via QR-kode {#guest-registration-via-qr-code}

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, kommer de til en [registreringsside for gjester](../../b1-church/checkin/guest-registration.md) der de fyller inn navnene i familien og andre opplysninger du har valgt å be om. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Slå på QR-registrering for gjester {#enabling-qr-guest-registration}

Slik slår du på visningen av QR-koden:

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobile**.
2. Klikk **B1 CheckIn**.
3. Slå på **QR Guest Registration** og klikk **Save**.

:::note
Denne innstillingen ligger under **Mobile > B1 CheckIn** (på samme side som kortet **Kiosk Theme**), ikke under Attendance. Handlingen **Kiosk** på oppmøtesiden har en lenke til denne siden.
:::

Når bryteren er på, vises de andre alternativene nedenfor i kortet **QR Guest Registration**. Klikk **Save** på kortet etter at du har endret noen av dem.

### Velge registreringsfelter {#choosing-sign-up-fields}

Sjekklisten **Sign-up fields** styrer hva registreringsskjemaet spør om. **First Name** og **Last Name** er alltid med på skjemaet og alltid påkrevd for hvert familiemedlem. For hvert av de andre feltene slår du på **Include** for å legge det til i skjemaet, og deretter på **Required** dersom gjestene må fylle det ut. **Required** kan bare slås på for et felt som er tatt med, og når du slår av **Include**, blir **Required** fjernet.

| Felt | Spørres etter | Med som standard |
|-------|-----------|---------------------|
| **Title** | Hvert familiemedlem, som en nedtrekksliste foran navnet (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nei |
| **Email** | Kun hovedkontakten | Ja (valgfritt) |
| **Phone** | Hvert familiemedlem. Når feltet er påkrevd, må bare hovedkontakten fylle det ut. | Ja (valgfritt) |
| **Household role** | Hvert familiemedlem etter hovedkontakten – Spouse, Child eller Other. Hovedkontakten er leder av en ny husstand. Den som ikke har en rolle, lagres som Other. | Ja (valgfritt) |
| **Home address** | Én gang for familien – gate, adresselinje 2, by, delstat og postnummer. Når feltet er påkrevd, må alt unntatt adresselinje 2 fylles ut. Adressen lagres på alle familiemedlemmene. | Nei |
| **Birth date** | Hvert familiemedlem | Nei |
| **Gender** | Hvert familiemedlem | Nei |
| **Marital status** | Kun hovedkontakten | Nei |
| **Grade** | Hvert familiemedlem (PreK til 12, eller Graduated) | Nei |
| **Comments** | Én gang, i en boks under familiemedlemmene (opptil 1 000 tegn) | Nei |

Felter du slår av, lagres aldri, selv om noen sender dem til registreringen på en annen måte. Kommentarer lagres som et notat på hovedkontaktens post (registrert som "Guest sign-up"), slik at du kan lese dem i delen **Notes** på profilen deres.

### Legge gjester til en gruppe {#adding-guests-to-a-group}

Bruk **Add new guests to group** for å legge alle som registrerer seg, automatisk i en av gruppene dine – for eksempel en gruppe for «Nykommere» eller en gruppe for helgens arrangement. Velg **None** (standard) for å hoppe over dette. Gjester ser eller velger aldri gruppen; den settes bare her. Endre den før hvert arrangement, slik at du kan følge opp arrangementets gjester samlet.

### Registrere oppmøte {#recording-attendance}

Når en gruppe er valgt, vises en bryter for **Also record attendance**. Slå den på for å registrere gjestene som til stede med en gang de registrerer seg, slik at du ikke må sjekke dem inn separat.

Oppmøte registreres bare når registreringen skjer innenfor et av de **planlagte** gudstjenestetidspunktene for den valgte gruppen:

- Gruppen må være knyttet til ett eller flere gudstjenestetidspunkter, og disse må ha en [innsjekkingstidsplan](setup.md#setting-a-check-in-schedule) (en **Day** og en **Start Time**).
- «Innenfor» betyr innenfor innsjekkingsvinduet til gudstjenestetidspunktet – fra det antallet **Open check-in**-minutter før start til det antallet **Close check-in**-minutter etter slutt (eller etter start dersom det ikke er satt et sluttidspunkt; uten både sluttidspunkt og lukkeminutter, til slutten av dagen), i samme tidssone som innsjekkingstidsplanen bruker.
- Hvert familiemedlem merkes som til stede i gruppen for hvert av gudstjenestetidspunktene som er åpne akkurat da, på dagens dato.
- Registreringer på andre tidspunkter, eller for en gruppe der gudstjenestetidspunktene ikke har en tidsplan, legges til i gruppen, men telles ikke som oppmøte.

### Bannerbilde {#header-photo}

Under **Header photo** klikker du **Change photo** for å velge eller laste opp et bilde (beskjæres til 16:9-format) som vises øverst på registreringssiden i stedet for standardikonet. Klikk **Remove** for å gå tilbake til ikonet.

### Dele registreringslenken {#sharing-the-registration-link}

Når QR-registrering for gjester er slått på, vises en seksjon for **Share registration QR code** nederst på kortet. Den gir deg to måter å få gjester til registreringsskjemaet på i tillegg til QR-koden på kiosken:

- **Copy link** – kopierer registreringsadressen slik at du kan lime den inn på menighetens nettside, i e-poster eller andre steder på nettet.
- **Download PNG** – laster ned QR-koden som et bilde du kan skrive ut på løpesedler, menighetsbladet eller skilt.

:::tip
Legg registreringslenken til på menighetens nettside, for eksempel siden «Plan Your Visit» eller «I'm New», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

### Hva som skjer etter at en gjest har registrert seg {#what-happens-after-a-guest-signs-up}

B1 ser først etter personer som allerede finnes i **People**. Et familiemedlem blir koblet til en eksisterende person når nøyaktig én person har samme fornavn og samme e-postadresse eller telefonnummer. Et barn som er oppgitt uten e-post eller telefon, kobles etter fornavn innenfor den husstanden som ble funnet. Personer som finnes fra før, brukes uendret – registreringen endrer aldri detaljene eller medlemsstatusen deres – og alle nye personer blir med i den matchede husstanden.

Når ingen treff, oppretter registreringen en ny husstand som får navnet til hovedkontaktens etternavn, med en personpost for hvert familiemedlem. Alle nye blir lagt til i **People** med medlemsstatusen **Visitor**, og hovedkontakten er leder av husstanden.

Både eksisterende og nye personer blir lagt til i gruppen du valgte (hvis de ikke allerede er med), og oppmøtet deres registreres når det er slått på. Kommentarer lagres som et notat på hovedkontakten.

For å følge opp automatisk kan du legge til en [arbeidsflytutløser](../serving/workflows.md#triggers), for eksempel **Person · Created** med betingelsen *Membership Status is Visitor*, eller **Group · Member Joined** for gruppen du valgte ovenfor.

## Hva som registreres {#what-gets-recorded}

Hver innsjekking oppretter en oppmøteregistrering i B1 Admin. Du kan se disse registreringene på siden [Attendance](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) møter, akkurat som oppmøte som er lagt inn manuelt. Det er ingen forskjell på hvordan dataene vises – begge metodene gir data til de samme rapportene.
