---
title: "Veiledning: Sett opp innsjekking for barnearbeidet"
description: "Sett opp innsjekking for barn i B1 Admin: koble familier sammen, opprett aldersbaserte grupper, konfigurer gudstjenester og skriv ut navnelapper til kioskappen B1 Checkin."
---

# Sett opp innsjekking for barnearbeidet

<div class="article-intro">

Denne veiledningen går gjennom alt som trengs for å få et system for innsjekking av barn i gang i menigheten din – fra å legge inn familier i databasen, til å sette opp aldersriktige grupper, til å skrive ut navnelapper søndag morgen. Når du er ferdig, kan foreldre sjekke inn barna sine ved en kioskskjerm og få en tilsvarende sikkerhetsbrikke.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett menighetskontoen din på [admin.b1.church](https://admin.b1.church)
- Sørg for at du har administratortilgang – se [Roller og tillatelser](../people/roles-permissions.md) om nødvendig
- Valgfritt: Forbered en CSV-fil med familier hvis du flytter fra et annet system

</div>

## Steg 1: Legg til familier i databasen {#step-1-add-families-to-your-database}

Før innsjekkingen kan fungere, må systemet vite om familiene dine. Hvert barn må kobles til en forelder gjennom husstandsfunksjonen.

Følg veiledningen [Legge til personer](../people/adding-people.md) for å legge til minst én familie. Pass på å:

- Legge til foreldrene først
- Legge til hvert barn
- Koble dem i samme husstand ved hjelp av [husstandsredigeringen](../people/adding-people.md#managing-households)

:::tip
Hvis du har mer enn en håndfull familier å legge til, bruk verktøyet [CSV-import](../people/importing-data.md) i stedet for å legge dem til én etter én. Du kan importere hele registeret på få minutter.
:::

## Steg 2: Opprett grupper for barn {#step-2-create-childrens-groups}

Grupper definerer klassene barna sjekker inn til. Vanligvis vil du ha én gruppe per aldersgruppe.

Følg veiledningen [Opprette grupper](../groups/creating-groups.md) for å lage grupper som:

- **Nursery** (alder 0–2)
- **Preschool** (alder 3–5)
- **Elementary** (alder 6–10)

Du kan justere navnene og aldersgrensene slik at de passer til tjenesten din. Åpne deretter innstillingene for hver gruppe (klikk **Edit** på gruppesiden) og:

- Sett **Track Attendance** til **Yes**, slik at gruppen kan sjekkes inn til
- Slå på **Print Nametag** (og **Parent Pickup** hvis du skriver ut hentelapper)
- Eventuelt angi grensene for **Age & Grade**, slik at kiosken foreslår riktig rom – se [Sikkerhet ved innsjekking](../attendance/checkin-safety.md)

## Steg 3: Konfigurer menigheter og gudstjenester {#step-3-configure-campuses-and-services}

Innsjekking er knyttet til bestemte gudstjenestetidspunkter. Du trenger minst én menighet og én gudstjeneste satt opp.

Følg veiledningen [Oppmøteoppsett](../attendance/setup.md) for å:

1. Gå til **People > Attendance** og klikk **Setup**
2. Legg til menigheten din (f.eks. «Main Campus»)
3. Legg til en gudstjeneste (f.eks. «Sunday Morning»)
4. Legg til gudstjenestetidspunktet (f.eks. «9:00 AM») og eventuelt en [innsjekkingstidsplan](../attendance/setup.md#setting-a-check-in-schedule), slik at innsjekkingen åpnes automatisk før hver gudstjeneste og lukkes etter den
5. Koble hver barnegruppe til gudstjenestetidspunktet: åpne gruppen, klikk **Edit**, velg tidspunktet i **Add Service Time**, og klikk plusknappen

## Steg 4: Sett opp innsjekkingsappen {#step-4-set-up-the-check-in-app}

Nå kobler du alt sammen ved å installere innsjekkingsappen på et nettbrett.

1. Installer **B1 Checkin-appen** – se artikkelen [Innsjekking](../attendance/check-in.md) for nedlastingslenker
2. Logg inn med en konto som har tillatelsen **Checkin** for oppmøte (eller **Edit Attendance**) – se [Kioskkontoer for innsjekking](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Velg menigheten og gudstjenestetidspunktet ditt

Se hele artikkelen [Innsjekking](../attendance/check-in.md) for detaljerte oppsettstrinn.

## Steg 5: Skaff maskinvaren {#step-5-get-your-hardware}

Du trenger et nettbrett til kiosken, og eventuelt en Brother-etikettskriver for navnelapper.

Som et minimum:
- **Ett iPad-, Android- eller Amazon Fire-nettbrett** – se [anbefalte nettbrett](../attendance/check-in.md#recommended-hardware)
- **Én Brother-etikettskriver** – QL-1110NWB anbefales for støtten for Bluetooth og WiFi
- **Brother DK-1201-etiketter** (1-1/7" x 3-1/2")

:::warning
Bare Brother-etikettskrivere er kompatible med appen B1 Checkin. Skrivere fra andre merker fungerer ikke.
:::

## Steg 6: Kjør en testinnsjekking {#step-6-run-a-test-check-in}

Gjør en testkjøring før søndag morgen:

1. Åpne appen B1 Checkin på nettbrettet
2. Velg menigheten din og riktig gudstjenestetidspunkt
3. Søk etter en av familiene du la til
4. Sjekk inn et barn og kontroller at:
   - Oppmøtet vises i B1 Admin under **People > Attendance**
   - Hvis du bruker en skriver, skrives navnelappen ut riktig

:::tip
Lær opp frivillige i velkomstteamet i innsjekkingsprosessen før dere starter. En rask gjennomgang på 5 minutter er vanligvis alt som trengs.
:::

## Ferdig! {#youre-done}

Innsjekkingen for barnearbeidet er klar. Foreldre kan søke etter familien sin, velge barna sine og sjekke inn ved kiosken. Oppmøte registreres automatisk i B1 Admin.

## Relaterte artikler {#related-articles}

- [Legge til personer](../people/adding-people.md) — legg til flere familier etter hvert som de besøker
- [Opprette grupper](../groups/creating-groups.md) — administrer barnegruppene dine
- [Oppmøteoppsett](../attendance/setup.md) — konfigurer menigheter og gudstjenester
- [Innsjekking](../attendance/check-in.md) — detaljert oppsett av innsjekkingsappen og maskinvare
- [Følge oppmøte](../attendance/tracking-attendance.md) — se rapporter for innsjekking
