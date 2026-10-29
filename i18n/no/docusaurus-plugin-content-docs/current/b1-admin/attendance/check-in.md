---
title: "Innsjekking"
---

# Innsjekking

<div class="article-intro">

B1 Admin støtter selvinnsjekking på gudstjenester via den tilhørende appen **B1 Checkin**. Medlemmer kan sjekke seg selv og familien sin inn på kiosker eller dedikerte enheter når de kommer, noe som gjør prosessen rask og reduserer arbeidsbelastningen for frivillige. Hver innsjekking registreres automatisk som oppmøte.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kampusene, gudstjenestetidene og gruppene dine må være satt opp i [Oppmøteoppsett](setup.md).
- Du trenger [personer i databasen](../people/adding-people.md) med [husstander](../people/adding-people.md#managing-households) satt opp, slik at familier kan sjekke inn sammen.
- Du trenger et nettbrett og eventuelt en Brother-etikettskriver (se [maskinvareanbefalinger](#recommended-hardware) nedenfor).

</div>

## Slik fungerer det

B1 Checkin-appen kobles til oppmøteoppsettet ditt i B1 Admin. Når et medlem sjekker inn, registreres oppmøtet automatisk på riktig kampus, gudstjenestetid og gruppe. Du trenger ikke å registrere oppmøte manuelt for personer som bruker innsjekkingssystemet.

## Sette opp innsjekking

1. **Konfigurer oppmøtestrukturen din først.** I B1 Admin går du til **Personer > Oppmøte** og klikker **Oppsett** for å sikre at kampusene, gudstjenestetidene og gruppene dine er på plass. Innsjekkingsappen er avhengig av denne konfigurasjonen. Du kan eventuelt gi hver gudstjenestetid en [innsjekkingsplan](setup.md#setting-a-check-in-schedule), slik at innsjekking åpner og stenger automatisk hver uke. Planer bruker tidssonen til gudstjenestens kampus, eller kirkens tidssone hvis kampusen ikke har en satt. Kiosken viser gudstjenestetider som er utenfor innsjekkingsvinduet som **Stengt**, og forteller familier når innsjekkingen åpner. Se [Oppmøteoppsett](setup.md) for detaljer.
2. **Installer B1 Checkin-appen** på enhetene du planlegger å bruke. Appen er tilgjengelig på følgende plattformer:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-nettbrett:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-nettbrett:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Logg inn i B1 Checkin-appen** med kirkens kontoopplysninger.
4. **Velg kampus og gudstjenestetid** for den aktuelle samlingen.
5. Medlemmer kan nå søke etter navnet sitt på enheten og sjekke inn.

:::tip
Plasser innsjekkingsenheter på synlige og lett tilgjengelige steder, for eksempel ved inngangen i foajeen eller ved velkomstdisken. En kort kunngjøring under gudstjenesten hjelper medlemmene å vite at dette finnes.
:::

:::tip
Hvis kirken din har flere kampuser, må du gjenta oppsettet for hver kampus i [Oppmøteoppsett](setup.md). Hver innsjekkingsenhet kan konfigureres for en annen kampus.
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
Kun Brother-etikettskrivere er kompatible med B1 Checkin-appen. Skrivere fra andre merker fungerer ikke for utskrift av navnelapper.
:::

:::info
Følg skriverens oppsettsveiledning for å koble den til samme WiFi-nettverk som nettbrettet. Du finner Brother-skriverdrivere og oppsettsveiledninger på [Brothers støttested](https://support.brother.com).
:::

## Tilpasse utseendet til kiosken

Du kan tilpasse utseendet og følelsen til B1 Checkin-appen, slik at den passer kirkens profil. I B1 Admin går du til **Mobil > B1 CheckIn** og bruker kortet **Kioskdesign** for å konfigurere:

### Farger

Tilpass åtte fargeinnstillinger slik at de passer kirkens profil:

- **Primær** og **Primær kontrast** — Hovedfarge for profilen og tekstfargen på den.
- **Sekundær** og **Sekundær kontrast** — Aksentfarge og tekstfargen på den.
- **Bakgrunn for topptekst** og **Bakgrunn for underoverskrift** — Farger for kioskens topp- og underoverskriftsområder.
- **Knappebakgrunn** og **Knappetekst** — Farger for interaktive knapper.

### Bakgrunnsbilde

Last opp et valgfritt bakgrunnsbilde for kioskens velkomst- og søkeskjermer. Anbefalt størrelse er 1920x1080 piksler.

### Hvilemodus / skjermsparer

Konfigurer en skjermsparer som aktiveres etter en periode uten aktivitet:

1. Slå hvilemodus **på** eller **av**.
2. Angi **tidsavbrudd** (hvor mange sekunder uten aktivitet før skjermspareren starter, minimum 10 sekunder).
3. Legg til ett eller flere **lysbilder** — hvert lysbilde har et bilde og en visningstid (minimum 3 sekunder).

:::tip
Bruk hvilemodus til å vise kunngjøringer, kommende arrangementer eller velkomstmeldinger når kiosken ikke er i bruk.
:::

## Gjesteregistrering via QR-kode

Innsjekkingskiosken kan vise en QR-kode som besøkende skanner for å registrere seg selv og familien sin på egen telefon. Dette gjør innsjekkingen raskere for førstegangsgjester.

Når en gjest skanner QR-koden, kommer de til en [registreringsside for gjester](../../b1-church/checkin/guest-registration) der de oppgir familiens navn og eventuelle andre opplysninger du velger å be om. En frivillig kan deretter slå dem opp på kiosken og sjekke dem inn.

### Aktivere QR-gjesteregistrering

For å slå på QR-kodevisningen:

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre) og utvider **Mobil**.
2. Klikk **B1 CheckIn**.
3. Slå på **QR-gjesteregistrering** og klikk **Lagre**.

:::note
Denne innstillingen ligger under **Mobil > B1 CheckIn** (samme side som kortet **Kioskdesign**), ikke under Oppmøte. Handlingen **Kiosk** på Oppmøte-siden har en lenke til denne siden.
:::

Når bryteren er på, vises de andre alternativene nedenfor i samme kort, **QR-gjesteregistrering**. Klikk **Lagre** på kortet etter at du har endret noen av dem.

### Velge påmeldingsfelt

Listen **Påmeldingsfelt** styrer hva registreringsskjemaet spør om. **Fornavn** og **Etternavn** er alltid med på skjemaet og alltid påkrevd for hvert familiemedlem. For hvert annet felt slår du på **Inkluder** for å legge det til i skjemaet, og deretter slår du på **Påkrevd** hvis gjestene må fylle det ut. **Påkrevd** kan bare slås på for et inkludert felt, og hvis du slår av **Inkluder**, fjernes også **Påkrevd**.

| Felt | Spørres om | Inkludert som standard |
|-------|-----------|---------------------|
| **E-post** | Kun hovedkontakt | Ja (valgfri) |
| **Telefon** | Kun hovedkontakt | Ja (valgfri) |
| **Hjemmeadresse** | Én gang for familien — gate, adresselinje 2, by, fylke og postnummer. Når feltet er påkrevd, må alt unntatt adresselinje 2 fylles ut. Adressen lagres på alle familiemedlemmer. | Nei |
| **Fødselsdato** | Hvert familiemedlem | Nei |
| **Kjønn** | Hvert familiemedlem | Nei |
| **Sivilstatus** | Kun hovedkontakt | Nei |
| **Klassetrinn** | Hvert familiemedlem (førskole til 12. trinn, eller Utdannet) | Nei |
| **Kommentarer** | Én gang, i en boks under familiemedlemmene (opptil 1 000 tegn) | Nei |

Felt du slår av, lagres aldri, selv om noen sender dem til påmeldingen på en annen måte. Kommentarer lagres som et notat på hovedkontaktens post (merket som «Gjestepåmelding»), slik at du kan lese dem i **Notater**-delen på profilen deres.

### Legge gjester til en gruppe

Bruk **Legg nye gjester til gruppe** for å legge alle som melder seg på til i en av gruppene dine automatisk — for eksempel en gruppe for «Nykommere» eller en gruppe for denne helgens arrangement. Velg **Ingen** (standard) for å hoppe over dette. Gjester ser aldri eller velger gruppen selv; den settes kun her. Endre den før hvert arrangement, slik at du kan følge opp arrangementets gjester samlet.

### Registrere oppmøte

Når en gruppe er valgt, vises en bryter **Registrer også oppmøte**. Slå den på for å markere gjester som tilstede med en gang de melder seg på, slik at du slipper å sjekke dem inn separat.

Oppmøte registreres kun når påmeldingen skjer under ett av den valgte gruppens **planlagte** gudstjenestetider:

- Gruppen må være koblet til én eller flere gudstjenestetider, og disse gudstjenestetidene må ha en [innsjekkingsplan](setup.md#setting-a-check-in-schedule) (en **Dag** og en **Starttid**).
- «Under» betyr innenfor gudstjenestetidens innsjekkingsvindu — fra **Åpne innsjekking** minutter før starttidspunktet til **Lukk innsjekking** minutter etter sluttidspunktet (eller etter starttidspunktet hvis ingen sluttid er satt), i samme tidssone som innsjekkingsplanen bruker.
- Hvert familiemedlem markeres som tilstede i gruppen for hver av gruppens gudstjenestetider som er åpne på det tidspunktet, på dagens dato.
- Påmeldinger på andre tidspunkter, eller for en gruppe der gudstjenestetidene ikke har en plan, legges til i gruppen, men telles ikke som oppmøte.

### Toppbilde

Under **Toppbilde** klikker du **Endre bilde** for å velge eller laste opp et bilde (beskjæres til 16:9) som vises øverst på registreringssiden i stedet for standardikonet. Klikk **Fjern** for å gå tilbake til ikonet.

### Dele registreringslenken

Når QR-gjesteregistrering er aktivert, vises en seksjon **Del registrerings-QR-kode** nederst på kortet. Den gir deg to måter å få gjester til registreringsskjemaet på i tillegg til kioskens QR-kode:

- **Kopier lenke** — kopierer registreringsadressen slik at du kan lime den inn på kirkens nettside, i e-poster eller hvor som helst på nettet.
- **Last ned PNG** — laster ned QR-koden som et bilde du kan skrive ut på flygeblader, programmer eller skilting.

:::tip
Legg registreringslenken til på kirkens nettside, under «Planlegg besøket» eller «Jeg er ny», slik at gjester kan registrere seg før de i det hele tatt kommer.
:::

### Hva som skjer etter at en gjest har meldt seg på

B1 leter først etter personer som allerede finnes i **Personer**. Et familiemedlem kobles til en eksisterende person når nøyaktig én person har samme fornavn og samme e-postadresse eller telefonnummer. Et barn som er oppgitt uten e-post eller telefon, kobles til basert på fornavn innenfor husstanden som ble funnet. Personer som kobles, gjenbrukes slik de er — påmeldingen endrer aldri opplysningene deres eller medlemsstatusen — og alle nye personer blir med i den matchede husstanden.

Når ingen blir funnet, oppretter påmeldingen en ny husstand som er oppkalt etter hovedkontaktens etternavn, med en personpost for hvert familiemedlem. Alle nye legges til i **Personer** med medlemsstatusen **Besøkende**, og hovedkontakten settes som husstandens overhode.

Både eksisterende og nye personer legges til i gruppen du valgte (hvis de ikke allerede er med), og oppmøte registreres når det er slått på. Kommentarer lagres som et notat på hovedkontakten.

For å følge opp automatisk kan du legge til en [arbeidsflytutløser](../serving/workflows.md#triggers), for eksempel **Person · Opprettet** med betingelsen *Medlemsstatus er Besøkende*, eller **Gruppe · Medlem ble med** for gruppen du valgte ovenfor.

## Hva som registreres

Hver innsjekking oppretter en oppmøtepost i B1 Admin. Du kan se disse postene på [Oppmøte](tracking-attendance.md)-siden og i hver [gruppes](../groups/group-members.md) økter, akkurat som manuelt registrert oppmøte. Det er ingen forskjell i hvordan dataene vises — begge metodene gir data til de samme rapportene.
