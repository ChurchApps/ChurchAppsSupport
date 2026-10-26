---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking på gudstjenester via den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien sin inn på kiosker eller dedikerte enheter når de ankommer, noe som gjør prosessen rask og reduserer arbeidsbyrden for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Menighetens campus, gudstjenestetider og grupper må være konfigurert i [Oppmøteoppsett](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen kobles til oppsettet for oppmøte i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig campus, gudstjenestetid og gruppe. Du trenger ikke å registrere oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Konfigurer oppmøtestrukturen først.** I B1 Admin går du til **Personer > Oppmøte** og klikker **Oppsett** for å kontrollere at campus, gudstjenestetider og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpner og stenger automatisk hver uke. Planer bruker tidssonen til gudstjenestens campus, eller menighetens tidssone hvis campuset ikke har en tidssone satt. Kiosken viser gudstjenestetider der innsjekkingsvinduet er lukket som **Stengt**, og forteller familier når innsjekkingen åpner. Se [Oppmøteoppsett](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med menighetens kontoopplysninger.
4. **Velg campus og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter synlig og lett tilgjengelig, for eksempel ved inngangen i lobbyen eller ved velkomstskranken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis menigheten har flere campus, må du gjenta oppsettet for hvert campus i [Oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan konfigureres for et ulikt campus.
:::

## Anbefalt maskinvare

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
Bare Brother-etikettskrivere er kompatible med B1 Checkin-appen. Andre skrivermerker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-skriverdrivere og oppsettsveiledninger på [Brothers støtteside](https://support.brother.com).
:::

## Tilpasse kioskens utseende

Du kan tilpasse utseendet til B1 Checkin-appen slik at det samsvarer med menighetens profil. I B1 Admin går du til **Mobil > B1 CheckIn** og bruker kortet **Kiosk-tema** til å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de samsvarer med menighetens profil:

- **Primær** og **Primær kontrast** -- Hovedfarge for profilen og tekstfargen til den.
- **Sekundær** og **Sekundær kontrast** -- Aksentfarge og tekstfargen til den.
- **Topptekstbakgrunn** og **Undertekstbakgrunn** -- Farger for toppområdene i kiosken.
- **Knappebakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for velkomst- og oppslagsskjermene i kiosken. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodus / skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodus **på** eller **av**.
2. Angi **tidsavbrudd** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningsvarighet (minimum 3 sekunder).

:::tip
Bruk hvilemodusen til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i aktiv bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, sendes de til en [registreringsside for gjester](../../b1-church/checkin/guest-registration), der de fyller inn navnene til familien sin og eventuelle andre opplysninger du ber om. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

For å slå på visningen av QR-koden:

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk på **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk **Lagre**.

:::note
Denne innstillingen ligger under **Mobil > B1 CheckIn** (samme side som kortet **Kiosk-tema**), ikke under Oppmøte. Knappen **Kiosk** på oppmøtesiden har en lenke til denne siden.
:::

Når bryteren er på, vises de andre alternativene nedenfor på kortet **QR-gjesteregistrering**. Klikk **Lagre** på kortet etter at du har endret noen av dem.

### Velge påmeldingsfelt

Sjekklisten **Påmeldingsfelt** styrer hva registreringsskjemaet spør om. **Fornavn** og **Etternavn** er alltid med på skjemaet og alltid påkrevd for alle familiemedlemmer. For hvert annet felt slår du på **Inkluder** for å legge det til i skjemaet, og deretter slår du på **Påkrevd** hvis gjester må fylle det ut. **Påkrevd** kan bare slås på for et inkludert felt, og hvis du slår av **Inkluder**, fjernes også **Påkrevd**.

| Felt | Etterspurt for | Inkludert som standard |
|-------|-----------|---------------------|
| **E-post** | Kun hovedkontakt | Ja (valgfritt) |
| **Telefon** | Kun hovedkontakt | Ja (valgfritt) |
| **Hjemmeadresse** | Én gang for familien -- gate, adresselinje 2, by, fylke og postnummer. Når feltet er påkrevd, må alt unntatt adresselinje 2 fylles ut. Adressen lagres på alle familiemedlemmer. | Nei |
| **Fødselsdato** | Hvert familiemedlem | Nei |
| **Kjønn** | Hvert familiemedlem | Nei |
| **Sivilstatus** | Kun hovedkontakt | Nei |
| **Klassetrinn** | Hvert familiemedlem (fra førskole til 12. klasse, eller Uteksaminert) | Nei |
| **Kommentarer** | Én gang, i en boks under familiemedlemmene (opptil 1 000 tegn) | Nei |

Felt du slår av, lagres aldri, selv om noen sender dem til påmeldingen på en annen måte. Kommentarer lagres som et notat på hovedkontaktens post (merket «Gjestepåmelding»), slik at du kan lese dem i delen **Notater** på profilen deres.

### Legge gjester til en gruppe

Bruk **Legg nye gjester til gruppe** for å legge alle som melder seg på, automatisk i en av gruppene dine – for eksempel en gruppe for «Nykommere» eller en gruppe for årets arrangement denne helgen. Velg **Ingen** (standard) for å hoppe over dette. Gjester ser aldri eller velger gruppen selv; den settes kun her. Endre den før hvert arrangement, slik at du kan følge opp arrangementets gjester samlet.

### Registrere oppmøte

Når en gruppe er valgt, vises en bryter for **Registrer også oppmøte**. Slå den på for å markere gjestene som tilstede med en gang de melder seg på, slik at du ikke må sjekke dem inn separat.

Oppmøte registreres kun når påmeldingen skjer i løpet av ett av de valgte gruppens **planlagte** gudstjenestetider:

- Gruppen må være knyttet til én eller flere gudstjenestetider, og disse gudstjenestetidene må ha en [innsjekkingsplan](setup.md#setting-a-check-in-schedule) (en **Dag** og et **Starttidspunkt**).
- «I løpet av» betyr innenfor gudstjenestetidens innsjekkingsvindu -- fra **Åpne innsjekking** minutter før start til **Lukk innsjekking** minutter etter slutt (eller etter start, hvis ingen sluttid er satt), i samme tidssone som innsjekkingsplanen bruker.
- Hvert familiemedlem markeres som tilstede i gruppen for hver av gruppens gudstjenestetider som er åpen på det tidspunktet, på dagens dato.
- Påmeldinger på andre tidspunkter, eller for en gruppe der gudstjenestetidene ikke har en plan, legges til i gruppen, men telles ikke som oppmøte.

### Toppbilde

Under **Toppbilde** klikker du **Endre bilde** for å velge eller laste opp et bilde (beskjært til 16:9) som vises øverst på registreringssiden i stedet for standardikonet. Klikk **Fjern** for å gå tilbake til ikonet.

### Dele registreringslenken

Når QR-gjesteregistrering er aktivert, vises en seksjon for **Del registrerings-QR-kode** nederst på kortet. Den gir deg to måter å få gjester til registreringsskjemaet på, i tillegg til QR-koden på kiosken:

- **Kopier lenke** — kopierer registreringsadressen slik at du kan lime den inn på menighetens nettside, i e-poster eller andre steder på nettet.
- **Last ned PNG** — laster ned QR-koden som et bilde du kan skrive ut på flygeblader, menighetsbladet eller skilt.

:::tip
Legg registreringslenken til på menighetens nettside, for eksempel siden «Planlegg besøket ditt» eller «Jeg er ny», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

### Hva skjer etter at en gjest har meldt seg på

Hver påmelding oppretter en ny husstand med hovedkontaktens etternavn, med en personpost for hvert familiemedlem. Alle legges til under **Personer** med medlemsstatusen **Besøkende**, og hovedkontakten settes som husstandens overhode.

For å følge opp automatisk kan du legge til en [arbeidsflytutløser](../serving/workflows.md#triggers), for eksempel **Person · Opprettet** med betingelsen *Medlemsstatus er Besøkende*, eller **Gruppe · Medlem ble med** for gruppen du valgte ovenfor.

## Hva som registreres

Hver innsjekking oppretter en oppmøtepost i B1 Admin. Du kan se disse postene på siden [Oppmøte](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) økter, akkurat som manuelt registrert oppmøte. Det er ingen forskjell i hvordan dataene vises; begge metodene gir data til de samme rapportene.
