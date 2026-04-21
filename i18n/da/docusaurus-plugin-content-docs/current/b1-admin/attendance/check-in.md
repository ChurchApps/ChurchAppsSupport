---
title: "Ind- og udchecking"
---

# Ind- og udchecking

<div class="article-intro">

B1 Admin understøtter selvcheck-in ved tjenester gennem medfølgende **B1 Ind- og udchecking**-app. Medlemmer kan tjekke sig selv og deres familier ind ved kioskker eller dedikerede enheder, når de ankommer, hvilket gør processen hurtig og reducerer arbejdsbyrden på dine frivillige. Hver check-in registreres automatisk som fremmøde.

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Dine campusser, servicetider og grupper skal være konfigureret i [Fremmøde-opsætning](setup.md).
- Du skal have [personer i dine database](../people/adding-people.md) med [husstande](../people/adding-people.md#managing-households) sat op, så familier kan checke ind sammen.
- Du har brug for en tablet og eventuelt en Brother-etiketter (se [hardwareanbefaling](#recommended-hardware) nedenfor).

</div>

## Sådan virker det

B1 Ind- og udchecking-appen forbinder til din B1 Admin fremmøde-opsætning. Når et medlem tjekker ind, registreres deres fremmøde automatisk mod den korrekte campus, servicetid og gruppe. Du behøver ikke manuelt at angive fremmøde for nogen, der bruger check-in-systemet.

## Opsætning af ind- og udchecking

1. **Konfigurer først din fremmøde-struktur.** I B1 Admin skal du gå til **Fremmøde > Opsætning** og sørge for, at dine campusser, servicetider og grupper er på plads. Ind- og udchecking-appen er afhængig af denne konfiguration. Se [Fremmøde-opsætning](setup.md) for detaljer.
2. **Installer B1 Ind- og udchecking-appen** på de enheder, du planlægger at bruge. Appen er tilgængelig på følgende platforme:
   - **Android/Samsung-tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Log ind i B1 Ind- og udchecking-appen** ved hjælp af din kirkes kontooplysninger.
4. **Vælg campus og servicetid** for det aktuelle møde.
5. Medlemmer kan nu søge efter deres navn på enheden og checke ind.

:::tip
Placer ind- og udchecking-enheder på synlige, nemme-at-nå steder, såsom lobbyindgange eller velkomstskranker. En kort meddelelse under tjenester hjælper medlemmerne med at vide, at muligheden er tilgængelig.
:::

:::tip
Hvis din kirke har flere campusser, skal du gentage opsætningen for hver campus i [Fremmøde-opsætning](setup.md). Hver ind- og udchecking-enhed kan konfigureres til en anden campus.
:::

## Anbefalet hardware

**Tablets** — alle disse virker godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8.7"
- **Stor skærm:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Printere** — ind- og udchecking virker med Brother-etiketteprintere til print af navneskilt:

- **Bedst:** Brother QL-1110NWB (understøtter flere tablets via Bluetooth og WiFi)
- **God:** Brother QL-810W (understøtter flere tablets via WiFi)
- **Budget:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Kun Brother-etiketteprintere er kompatible med B1 Ind- og udchecking-appen. Andre printermærker virker ikke til print af navneskilt.
:::

:::info
Følg din printers opsætningsvejledning for at forbinde den til samme WiFi-netværk som din tablet. Du kan finde Brother printerdriver og opsætningsvejledninger på [Brother support-siden](https://support.brother.com).
:::

## Tilpasning af kioskk-udseende

Du kan tilpasse udseende og funktionsmåde af B1 Ind- og udchecking-appen for at passe din kirkes mærke. I B1 Admin skal du gå til **Fremmøde > Kioskk-tema** for at konfigurere:

### Farver

Tilpas otte farveindstillinger for at passe din kirkes mærke:

- **Primær** og **Primær kontrast** -- Hovedmærkefarve og dens tekstfarve.
- **Sekundær** og **Sekundær kontrast** -- Accentfarve og dens tekstfarve.
- **Header-baggrund** og **Underheader-baggrund** -- Farver til kioskk-headerarealerne.
- **Knap-baggrund** og **Knap-tekst** -- Farver til interaktive knapper.

### Baggrundsbillede

Upload et valgfrit baggrundsbillede til kioskk-velkomst- og opslags-skærme. Anbefalet størrelse er 1920x1080 pixels.

### Inaktiv skærm / Screensaver

Konfigurer en screensaver, der aktiveres efter en periode med inaktivitet:

1. Skift den inaktive skærm **til** eller **fra**.
2. Indstil **timeout** (hvor mange sekunder uden aktivitet før skærm-sparer starter, minimum 10 sekunder).
3. Tilføj et eller flere **slides** -- hvert slide har et billede og en displayvarighed (minimum 3 sekunder).

:::tip
Brug den inaktive skærm til at vise meddelelser, kommende begivenheder eller velkomstkort, når kioskken ikke aktivt bruges.
:::

## Gæsteregistrering via QR-kode

Ind- og udchecking-kioskken kan vise en QR-kode, som besøgende scanner for at registrere sig selv og deres familie på deres egen telefon. Dette fremskynder ind- og udchecking-processen for førstegangsgæster.

Når en gæst scanner QR-koden, bliver de taget til en [gæsteregistreringsside](../../b1-church/checkin/guest-registration), hvor de angiver deres navn, email og familiemedlemmer. En frivillig kan derefter slå dem op på kioskken og checke dem ind.

### Aktivering af QR-gæsteregistrering

For at slå QR-kodeskærmen til:

1. I B1 Admin skal du gå til **Mobil** i venstre sidebjælke (telefonikon).
2. Vælg **Ind- og udchecking**-fanen.
3. Skift **QR-gæsteregistrering** til.

:::note
Denne indstilling er under **Mobil**, ikke under Fremmøde > Kioskk-tema.
:::

## Hvad registreres

Hver check-in opretter en fremmøde-post i B1 Admin. Du kan se disse poster på fanerne [Fremmøde](tracking-attendance.md) og [Grupper](../groups/group-members.md) ligesom manuelt angivet fremmøde. Der er ingen forskel i, hvordan dataene vises - begge metoder fødes ind i de samme rapporter.
