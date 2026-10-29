---
title: "Veiledning: Sett opp innsjekking for barnearbeidet"
---

# Sett opp innsjekking for barnearbeidet

<div class="article-intro">

Denne veiledningen går gjennom alt du trenger for å få et innsjekkingssystem for barn i gang i kirken din — fra å registrere familier i databasen, til å sette opp aldersmessige grupper, til å skrive ut navnelapper søndag morgen. Når du er ferdig, kan foreldre sjekke inn barna sine på en kioskskjerm og få en tilhørende sikkerhetsbrikke.

</div>

## Opplæringsvideo

<YouTube id="Ep9CBUcJwPI" title="Sette opp innsjekking for barn i B1" next="Registrere og følge opp oppmøte i B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett kirkens konto på [admin.b1.church](https://admin.b1.church)
- Sørg for at du har administratortilgang — se [Roller og tillatelser](../people/roles-permissions.md) om nødvendig
- Valgfritt: Forbered en CSV-fil med familier hvis du flytter fra et annet system

</div>

## Steg 1: Legg til familier i databasen din

Før innsjekkingen kan fungere, må systemet vite om familiene dine. Hvert barn må kobles til en forelder gjennom husstandsfunksjonen.

Følg veiledningen [Legge til personer](../people/adding-people.md) for å legge til minst én familie. Sørg for å:

- Legge til forelderen/foreldrene først
- Legge til hvert barn
- Koble dem i samme husstand ved hjelp av [husstandsredigeringen](../people/adding-people.md#managing-households)

:::tip
Hvis du har mer enn en håndfull familier å legge til, bruk verktøyet [CSV-import](../people/importing-data.md) i stedet for å legge dem til én etter én. Du kan importere hele katalogen din på minutter.
:::

## Steg 2: Opprett grupper for barn

Grupper definerer klassene barna sjekker inn til. Du vil vanligvis ha én gruppe per aldersgruppe.

Følg veiledningen [Opprette grupper](../groups/creating-groups.md) for å lage grupper som:

- **Spedbarn** (0–2 år)
- **Førskole** (3–5 år)
- **Barneskole** (6–10 år)

Du kan justere navnene og aldersgruppene slik at de passer til strukturen i barnearbeidet ditt.

## Steg 3: Konfigurer kampuser og gudstjenester

Innsjekking er knyttet til bestemte gudstjenestetider. Du trenger minst én kampus og én gudstjeneste konfigurert.

Følg veiledningen [Oppmøteoppsett](../attendance/setup.md) for å:

1. Legge til kampusen din (f.eks. «Hovedkampus»)
2. Legge til en gudstjeneste (f.eks. «Søndag morgen»)
3. Angi gudstjenestetiden (f.eks. «09:00») og eventuelt en [innsjekkingsplan](../attendance/setup.md#setting-a-check-in-schedule) slik at innsjekkingen åpner automatisk før hver gudstjeneste og stenger etter den
4. Tilordne barnegruppene dine til gudstjenesten

## Steg 4: Sett opp innsjekkingsappen

Nå kobler du alt sammen ved å installere innsjekkingsappen på et nettbrett.

1. Installer **B1 Checkin-appen** — se artikkelen [Innsjekking](../attendance/check-in.md) for nedlastingslenker
2. Logg inn med B1 Admin-kontoopplysningene dine
3. Velg kampus og gudstjenestetid

Se hele artikkelen [Innsjekking](../attendance/check-in.md) for detaljerte oppsettsteg.

## Steg 5: Skaff maskinvaren

Du trenger et nettbrett til kiosken og eventuelt en Brother-etikettskriver til navnelapper.

Minst dette:
- **Ett Android- eller Amazon Fire-nettbrett** — se [anbefalte nettbrett](../attendance/check-in.md#recommended-hardware)
- **Én Brother-etikettskriver** — QL-1110NWB anbefales for Bluetooth- og WiFi-støtten
- **Brother DK-1201-etiketter** (1-1/7" x 3-1/2")

:::warning
Kun Brother-etikettskrivere er kompatible med B1 Checkin-appen. Skrivere fra andre merker fungerer ikke.
:::

## Steg 6: Gjennomfør en prøveinnsjekking

Gjør en testkjøring før søndag morgen:

1. Åpne B1 Checkin-appen på nettbrettet
2. Velg kampusen din og riktig gudstjenestetid
3. Søk etter en av familiene du la til
4. Sjekk inn et barn og kontroller at:
   - Oppmøtet vises i B1 Admin under **Oppmøte**
   - Hvis du bruker skriver, skrives navnelappen ut riktig

:::tip
Lær opp frivillige i velkomstteamet i innsjekkingsprosessen før dere starter. En rask gjennomgang på 5 minutter er vanligvis alt som trengs.
:::

## Du er ferdig!

Innsjekkingen for barnearbeidet er klar. Foreldre kan søke etter familien sin, velge barna sine og sjekke inn på kiosken. Oppmøte registreres automatisk i B1 Admin.

## Relaterte artikler

- [Legge til personer](../people/adding-people.md) — legg til flere familier etter hvert som de besøker
- [Opprette grupper](../groups/creating-groups.md) — administrer barnegruppene dine
- [Oppmøteoppsett](../attendance/setup.md) — konfigurer kampuser og gudstjenester
- [Innsjekking](../attendance/check-in.md) — detaljert oppsett av innsjekkingsappen og maskinvare
- [Følge opp oppmøte](../attendance/tracking-attendance.md) — se innsjekkingsrapporter
