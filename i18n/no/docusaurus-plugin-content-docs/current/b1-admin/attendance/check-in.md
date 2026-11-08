---
title: "Oppsett av selvbetjent innsjekking med B1 Checkin og B1 Admin"
sidebar_label: "Innsjekking"
description: "Sett opp selvbetjent innsjekking under gudstjenester med B1 Checkin-appen i B1 Admin, inkludert enheter, kioskkontoer, tidsplaner, merkevarebygging og QR-registrering av gjester."
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvbetjent innsjekking under gudstjenester via den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien sin inn på kiosker eller dedikerte enheter når de ankommer. Det gjør prosessen raskere og reduserer arbeidsbyrden for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Menighetens campus, gudstjenestetider og grupper må være satt opp i [Oppmøteoppsett](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husholdninger](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen kobles til oppmøteoppsettet i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig campus, gudstjenestetid og gruppe. Du trenger ikke registrere oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Konfigurer oppmøtestrukturen først.** I B1 Admin går du til **People > Attendance** og klikker **Setup** for å sørge for at campus, gudstjenestetider og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingstidsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpner og stenger automatisk hver uke. Tidsplaner bruker tidssonen til gudstjenestens campus, eller menighetens tidssone hvis campuset ikke har en tidssone satt. Kiosken viser gudstjenestetider som har stengt innsjekkingsvindu som **Closed**, og forteller familier når innsjekkingen åpner. Se [Oppmøteoppsett](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med en konto som har tillatelsen **Checkin** for oppmøte (eller **Edit Attendance**). Se [Kontoer for innsjekkingskiosk](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Velg campus og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige og lett tilgjengelige steder, for eksempel ved inngangen i foajeen eller ved velkomstdisken. En kort kunngjøring under gudstjenestene hjelper medlemmene å vite at dette alternativet finnes.
:::

:::tip
Hvis menigheten din har flere campus, må du gjenta oppsettet for hvert campus i [Oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan konfigureres for et annet campus.
:::

## Anbefalt maskinvare

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
Bare Brother-etikettskrivere er kompatible med B1 Checkin-appen. Skrivere fra andre merker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-skriverdrivere og oppsettsveiledninger på [Brothers støttesider](https://support.brother.com).
:::

## Tilpasse kioskens utseende

Du kan tilpasse utseendet til B1 Checkin-appen slik at det samsvarer med menighetens merkevare. I B1 Admin går du til **Mobile > B1 CheckIn** og bruker kortet **Kiosk Theme** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de samsvarer med menighetens merkevare:

- **Primary** og **Primary Contrast** -- Hovedfarge for merkevaren og tekstfargen til den.
- **Secondary** og **Secondary Contrast** -- Aksentfarge og tekstfargen til den.
- **Header Background** og **Subheader Background** -- Farger for kioskens toppområder.
- **Button Background** og **Button Text** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for kioskens velkomst- og oppslagsskjermer. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodus / skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodus **på** eller **av**.
2. Angi **timeout** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningstid (minimum 3 sekunder).

:::tip
Bruk hvilemodus til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i aktiv bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, sendes vedkommende til en [registreringsside for gjester](../../b1-church/checkin/guest-registration.md), der de fyller inn familiens navn og eventuelle andre opplysninger du velger å be om. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

For å slå på visningen av QR-koden:

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobile**.
2. Klikk på **B1 CheckIn**.
3. Slå på **QR Guest Registration** og klikk **Save**.

:::note
Denne innstillingen ligger under **Mobile > B1 CheckIn** (samme side som kortet **Kiosk Theme**), ikke under Attendance. Handlingen **Kiosk** på Attendance-siden har en lenke til denne siden.
:::

Når bryteren er på, vises de øvrige alternativene nedenfor på samme kort, **QR Guest Registration**. Klikk **Save** på kortet etter at du har endret noen av dem.

### Velge registreringsfelt

Listen **Sign-up fields** styrer hva registreringsskjemaet spør etter. **First Name** og **Last Name** er alltid med på skjemaet og alltid påkrevd for hvert familiemedlem. For hvert annet felt slår du på **Include** for å legge det til i skjemaet, og deretter på **Required** hvis gjester må fylle det ut. **Required** kan bare slås på for et felt som er inkludert, og å slå av **Include** fjerner også **Required**.

| Felt | Spørres etter | Inkludert som standard |
|-------|-----------|---------------------|
| **Title** | Hvert familiemedlem, som en nedtrekksliste foran navnet (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Nei |
| **Email** | Kun hovedkontakten | Ja (valgfritt) |
| **Phone** | Hvert familiemedlem. Når feltet er påkrevd, må bare hovedkontakten fylle det ut. | Ja (valgfritt) |
| **Household role** | Hvert familiemedlem etter hovedkontakten -- Spouse (ektefelle), Child (barn) eller Other (annet). Hovedkontakten er overhode for en ny husholdning. Den som ikke har en rolle, lagres som Other. | Ja (valgfritt) |
| **Home address** | Én gang for familien -- gate, adresselinje 2, by, delstat og postnummer. Når feltet er påkrevd, må alt unntatt adresselinje 2 fylles ut. Adressen lagres på hvert familiemedlem. | Nei |
| **Birth date** | Hvert familiemedlem | Nei |
| **Gender** | Hvert familiemedlem | Nei |
| **Marital status** | Kun hovedkontakten | Nei |
| **Grade** | Hvert familiemedlem (PreK til 12, eller Graduated) | Nei |
| **Comments** | Én gang, i en boks under familiemedlemmene (opptil 1 000 tegn) | Nei |

Felter du slår av, lagres aldri, selv om noen sender dem til registreringen på en annen måte. Kommentarer lagres som et notat på hovedkontaktens post (registrert som "Guest sign-up"), slik at du kan lese dem i seksjonen **Notes** på profilen deres.

### Legge gjester til i en gruppe

Bruk **Add new guests to group** for automatisk å legge alle som registrerer seg til i en av gruppene dine -- for eksempel en gruppe for nykommere ("Newcomers") eller en gruppe for helgens arrangement. Velg **None** (standard) for å hoppe over dette. Gjester ser aldri gruppen og kan ikke velge den; den settes bare her. Endre den før hvert arrangement, slik at du kan følge opp arrangementets gjester samlet.

### Registrere oppmøte

Når en gruppe er valgt, vises en bryter, **Also record attendance**. Slå den på for å registrere gjester som til stede med én gang de registrerer seg, slik at du ikke må sjekke dem inn separat.

Oppmøte registreres bare når registreringen skjer i løpet av en av den valgte gruppens **planlagte** gudstjenestetider:

- Gruppen må være koblet til én eller flere gudstjenestetider, og disse gudstjenestetidene må ha en [innsjekkingstidsplan](setup.md#setting-a-check-in-schedule) (en **Day** og en **Start Time**).
- "I løpet av" betyr innenfor innsjekkingsvinduet for gudstjenestetiden, fra **Open check-in**-minuttene før starttidspunktet til **Close check-in**-minuttene etter sluttidspunktet (eller etter starttidspunktet hvis det ikke er satt noe sluttidspunkt). Uten både sluttidspunkt og lukkeminutter gjelder vinduet til slutten av den dagen. Tidssonen er den samme som innsjekkingstidsplanen bruker.
- Hvert familiemedlem registreres som til stede i gruppen for hver av gruppens gudstjenestetider som er åpen på det tidspunktet, på dagens dato.
- Registreringer på andre tidspunkter, eller for en gruppe hvis gudstjenestetider ikke har en tidsplan, legges til i gruppen, men telles ikke som oppmøte.

### Overskriftsbilde

Under **Header photo** klikker du **Change photo** for å velge eller laste opp et bilde (beskjært til 16:9) som vises øverst på registreringssiden i stedet for standardikonet. Klikk **Remove** for å gå tilbake til ikonet.

### Dele registreringslenken

Når QR Guest Registration er aktivert, vises en seksjon, **Share registration QR code**, nederst på kortet. Den gir deg to måter å få gjester til registreringsskjemaet på, i tillegg til QR-koden på kiosken:

- **Copy link** — kopierer registreringslenken, slik at du kan lime den inn på menighetens nettside, i e-poster eller hvor som helst på nettet.
- **Download PNG** — laster ned QR-koden som et bilde du kan skrive ut på flygeblader, menighetsblader eller skilt.

:::tip
Legg registreringslenken til på menighetens nettside, for eksempel siden "Plan Your Visit" eller "I'm New", slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

### Hva skjer etter at en gjest har registrert seg

B1 leter først etter personer som allerede finnes i **People**. Et familiemedlem kobles til en eksisterende person når nøyaktig én person har samme fornavn og samme e-post eller telefonnummer. Et barn som er oppgitt uten e-post eller telefon, kobles til basert på fornavn innenfor husholdningen som ble koblet. Personer som blir koblet, brukes slik de er. Registreringen endrer aldri opplysningene deres eller medlemsstatusen. Alle nye personer blir med i den koblede husholdningen.

Når ingen samsvarer, oppretter registreringen en ny husholdning oppkalt etter hovedkontaktens etternavn, med en personpost for hvert familiemedlem. Alle nye legges til i **People** med medlemsstatusen **Visitor**, og hovedkontakten er overhode for husholdningen.

Både koblede og nye personer legges til i gruppen du valgte (hvis de ikke allerede er med), og oppmøtet deres registreres når dette er slått på. Kommentarer lagres som et notat på hovedkontakten.

For å følge opp automatisk, legg til en [arbeidsflytutløser](../serving/workflows.md#triggers), for eksempel **Person · Created** med betingelsen *Membership Status is Visitor*, eller **Group · Member Joined** for gruppen du valgte ovenfor.

## Hva som registreres

Hver innsjekking oppretter en oppmøtepost i B1 Admin. Du kan se disse postene på siden [Oppmøte](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) økter, akkurat som manuelt registrert oppmøte. Det er ingen forskjell i hvordan dataene vises. Begge metodene gir data til de samme rapportene.
