---
title: "Selvinnsjekk-oppsett med B1 Checkin og B1 Admin"
sidebar_label: "Innsjekking"
description: "Sett opp selvinnsjekk for gudstjenester med B1 Checkin-appen i B1 Admin, inkludert enheter, kioskkontoer, plan, profil og QR-registrering av gjester."
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking ved gudstjenester gjennom den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien inn på kiosker eller dedikerte enheter når de ankommer, noe som gjør prosessen rask og reduserer arbeidsbyrden for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kirkesteder, gudstjenestetider og grupper må være satt opp i [oppsett for oppmøte](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen kobles til oppsettet for oppmøte i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig kirkested, gudstjenestetid og gruppe. Du trenger ikke å registrere oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Slik setter du opp innsjekking

1. **Sett opp oppmøtestrukturen først.** I B1 Admin går du til **Personer > Oppmøte** og klikker **Oppsett** for å kontrollere at kirkesteder, gudstjenestetider og grupper er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingsplan](setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpner og stenger automatisk hver uke. Planene bruker tidssonen til gudstjenestens kirkested, eller kirkens tidssone hvis kirkestedet ikke har en angitt. Kiosken viser gudstjenestetider der innsjekkingsvinduet er stengt som **Stengt**, og forteller familier når innsjekkingen åpner. Se [oppsett for oppmøte](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen finnes på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med en konto som har tillatelsen **Innsjekking** for oppmøte (eller **Rediger oppmøte**). Se [kontoer for innsjekkingskiosk](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Velg kirkested og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige og lett tilgjengelige steder, for eksempel ved inngangen i foajeen eller ved velkomstdisken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis kirken har flere kirkesteder, må du gjenta oppsettet for hvert kirkested i [oppsett for oppmøte](setup.md). Hver innsjekkingsenhet kan konfigureres for et annet kirkested.
:::

## Anbefalt maskinvare {#recommended-hardware}

**Nettbrett** — disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skjerm:** Samsung Galaxy Tab A8 10,5"
- **Budsjett:** Amazon Fire HD 10

**Skrivere** — innsjekking fungerer med Brother-etikettskrivere for utskrift av navneskilt:

- **Best:** Brother QL-1110NWB (støtter flere nettbrett via Bluetooth og WiFi)
- **God:** Brother QL-810W (støtter flere nettbrett via WiFi)
- **Budsjett:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med B1 Checkin-appen. Skrivere fra andre merker fungerer ikke for utskrift av navneskilt.
:::

:::info
Følg skriverens oppsettsinstruksjoner for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-skriverdrivere og oppsettsveiledninger på [Brothers støttesider](https://support.brother.com).
:::

## Tilpasse utseendet til kiosken

Du kan tilpasse utseendet til B1 Checkin-appen slik at det passer til kirkens profil. I B1 Admin går du til **Mobil > B1 CheckIn** og bruker kortet **Kiosktema** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de passer til kirkens profil:

- **Primær** og **Primær kontrast** -- Hovedfarge for profilen og tekstfargen til den.
- **Sekundær** og **Sekundær kontrast** -- Aksentfarge og tekstfargen til den.
- **Bakgrunn for topptekst** og **Bakgrunn for undertopptekst** -- Farger for toppområdene på kiosken.
- **Knappebakgrunn** og **Knappetekst** -- Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for velkomst- og søkeskjermene på kiosken. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodusskjerm / skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodusskjermen **på** eller **av**.
2. Angi **tidsavbruddet** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** -- hvert lysbilde har et bilde og en visningstid (minimum 3 sekunder).

:::tip
Bruk hvilemodusskjermen til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i bruk.
:::

## Gjesteregistrering via QR-kode {#guest-registration-via-qr-code}

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, kommer de til en [side for gjesteregistrering](../../b1-church/checkin/guest-registration.md) der de oppgir navnene til familien og eventuelle andre opplysninger du velger å spørre etter. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

For å slå på visningen av QR-koden:

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk **Lagre**.

:::note
Denne innstillingen ligger under **Mobil > B1 CheckIn** (samme side som kortet **Kiosktema**), ikke under Oppmøte. Handlingen **Kiosk** på siden for oppmøte har en lenke til denne siden.
:::

Når bryteren er på, vises alternativene nedenfor på kortet **QR-gjesteregistrering**. Klikk **Lagre** på kortet etter at du har endret noe av dette.

### Velge påmeldingsfelter

Listen **Påmeldingsfelter** styrer hva registreringsskjemaet spør etter. **Fornavn** og **Etternavn** er alltid med på skjemaet og alltid påkrevd for alle familiemedlemmer. For hvert annet felt slår du på **Inkluder** for å legge det til i skjemaet, og deretter på **Påkrevd** hvis gjestene må fylle det ut. **Påkrevd** kan bare slås på for et inkludert felt, og hvis du slår av **Inkluder**, fjernes også **Påkrevd**.

| Felt | Spørres etter | Inkludert som standard |
|------|---------------|------------------------|
| **E-post** | Kun hovedkontakt | Ja (valgfritt) |
| **Telefon** | Kun hovedkontakt | Ja (valgfritt) |
| **Hjemmeadresse** | Én gang for familien -- gate, adresselinje 2, by, fylke og postnummer. Når feltet er påkrevd, må alt unntatt adresselinje 2 fylles ut. Adressen lagres på alle familiemedlemmer. | Nei |
| **Fødselsdato** | Hvert familiemedlem | Nei |
| **Kjønn** | Hvert familiemedlem | Nei |
| **Sivilstatus** | Kun hovedkontakt | Nei |
| **Klassetrinn** | Hvert familiemedlem (førskole til 12. klasse, eller Uteksaminert) | Nei |
| **Kommentarer** | Én gang, i en boks under familiemedlemmene (opptil 1 000 tegn) | Nei |

Felt du slår av lagres aldri, selv om noen sender dem til påmeldingen på en annen måte. Kommentarer lagres som et notat på hovedkontaktens profil (registrert som «Gjestepåmelding»), slik at du kan lese dem i delen **Notater** på profilen.

### Legge gjester til en gruppe

Bruk **Legg nye gjester til gruppe** for å legge alle som melder seg på automatisk til en av gruppene dine -- for eksempel en gruppe for «Nykommere» eller en gruppe for helgens arrangement. Velg **Ingen** (standard) for å hoppe over dette. Gjester ser aldri og velger aldri gruppen; den settes kun her. Endre den før hvert arrangement, slik at du kan følge opp arrangementets gjester samlet.

### Registrere oppmøte

Når en gruppe er valgt, vises bryteren **Registrer også oppmøte**. Slå den på for å markere gjestene som tilstede med en gang de melder seg på, slik at du ikke må sjekke dem inn separat.

Oppmøte registreres kun når påmeldingen skjer under en av den valgte gruppens **planlagte** gudstjenestetider:

- Gruppen må være knyttet til en eller flere gudstjenestetider, og disse gudstjenestetidene må ha en [innsjekkingsplan](setup.md#setting-a-check-in-schedule) (en **Dag** og en **Starttid**).
- «Under» betyr innenfor innsjekkingsvinduet for gudstjenestetiden -- fra **Åpne innsjekking** minutter før start til **Steng innsjekking** minutter etter slutt (eller etter start, hvis ingen sluttid er satt), i samme tidssone som innsjekkingsplanen bruker.
- Hvert familiemedlem registreres som tilstede i gruppen for hver av gruppens gudstjenestetider som er åpen i det øyeblikket, på dagens dato.
- Påmeldinger på andre tidspunkter, eller for en gruppe der gudstjenestetidene ikke har noen plan, legges til i gruppen, men telles ikke som oppmøte.

### Overskriftsbilde

Under **Overskriftsbilde** klikker du **Endre bilde** for å velge eller laste opp et bilde (beskjært til 16:9) som skal vises øverst på påmeldingssiden i stedet for standardikonet. Klikk **Fjern** for å gå tilbake til ikonet.

### Dele påmeldingslenken

Når QR-gjesteregistrering er aktivert, vises en seksjon for **Del registrerings-QR-kode** nederst på kortet. Den gir deg to måter å få gjester til påmeldingsskjemaet på i tillegg til QR-koden på kiosken:

- **Kopier lenke** -- kopierer registreringslenken slik at du kan lime den inn på kirkens nettside, i e-poster eller hvor som helst på nett.
- **Last ned PNG** -- laster ned QR-koden som et bilde du kan skrive ut på flygeblader, kirkeblad eller skilt.

:::tip
Legg registreringslenken til på kirkens nettside, for eksempel siden «Planlegg besøket» eller «Jeg er ny», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

### Hva som skjer etter at en gjest har meldt seg på

B1 leter først etter personer som allerede finnes i **Personer**. Et familiemedlem kobles til en eksisterende person når nøyaktig én person har samme fornavn og samme e-postadresse eller telefonnummer. Et barn som er registrert uten e-post eller telefon, kobles ved fornavn innenfor husstanden som ble funnet. Personer som finnes fra før brukes slik de er -- påmeldingen endrer aldri detaljene eller medlemsstatusen deres -- og alle nye legges til i den matchede husstanden.

Hvis ingen finnes fra før, oppretter påmeldingen en ny husstand med navn etter hovedkontaktens etternavn, og en personpost for hvert familiemedlem. Alle nye legges til i **Personer** med medlemsstatusen **Besøkende**, med hovedkontakten som husstandens leder.

Både eksisterende og nye personer legges til i gruppen du valgte (hvis de ikke allerede er med) og får oppmøtet registrert når det er slått på. Kommentarer lagres som et notat på hovedkontakten.

For å følge opp automatisk kan du legge til en [arbeidsflyttrigger](../serving/workflows.md#triggers), for eksempel **Person · Opprettet** med betingelsen *Medlemsstatus er Besøkende*, eller **Gruppe · Medlem ble med** for gruppen du valgte ovenfor.

## Hva som registreres

Hver innsjekking oppretter en oppmøtepost i B1 Admin. Du kan se disse postene på siden [Oppmøte](tracking-attendance.md) og i [gruppens](../groups/group-members.md) økter, akkurat som manuelt registrert oppmøte. Det er ingen forskjell på hvordan dataene vises -- begge metodene mates inn i de samme rapportene.
