---
title: "Guide: Sett opp innsjekking for barnetjenesten"
---

# Sett opp innsjekking for barnetjenesten

<div class="article-intro">

Denne guiden tar deg gjennom alt du trenger for å få et innsjekkingssystem for barn i gang i menigheten din — fra å legge inn familier i databasen, til å konfigurere alderstilpassede grupper, til å skrive ut navnelapper søndag morgen. Til slutt vil foreldre kunne sjekke inn barna sine ved et nettbrett-kiosk og motta en matchende sikkerhetslapp.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett din menighets konto på [admin.b1.church](https://admin.b1.church)
- Sørg for at du har administratortilgang — se [Roller og tillatelser](../people/roles-permissions.md) ved behov
- Valgfritt: Forbered en CSV-fil med familier hvis du migrerer fra et annet system

</div>

## Trinn 1: Legg til familier i databasen din

Før innsjekking kan fungere, må systemet kjenne til familiene dine. Hvert barn må kobles til en forelder gjennom husstandsfunksjonen.

Følg guiden [Legge til personer](../people/adding-people.md) for å legge til minst én familie. Sørg for å:

- Legge til foreldrene først
- Legge til hvert barn
- Koble dem i samme husstand ved hjelp av [husstandsredigereren](../people/adding-people.md#managing-households)

:::tip
Hvis du har mer enn noen få familier å legge til, bruk [CSV-import](../people/importing-data.md)-verktøyet i stedet for å legge dem til én etter én. Du kan importere hele katalogen din på noen minutter.
:::

## Trinn 2: Opprett barnegrupper

Grupper definerer klassene barna sjekker inn i. Du vil vanligvis ha én gruppe per aldersgruppe.

Følg guiden [Opprette grupper](../groups/creating-groups.md) for å opprette grupper som:

- **Barnehage** (alder 0–2)
- **Førskole** (alder 3–5)
- **Barneskole** (alder 6–10)

Du kan justere navnene og aldersgruppene for å matche din tjenestes struktur.

## Trinn 3: Konfigurer campus og gudstjenester

Innsjekking er knyttet til bestemte gudstjenestetider. Du trenger minst én campus og én gudstjeneste konfigurert.

Følg guiden [Oppmøteoppsett](../attendance/setup.md) for å:

1. Legge til din campus (f.eks. "Hovedcampus")
2. Legge til en gudstjeneste (f.eks. "Søndagsgudstjeneste")
3. Sette gudstjenestetiden (f.eks. "09:00")
4. Tildele barnegruppene dine til gudstjenesten

## Trinn 4: Sett opp innsjekkingsappen

Nå kobler du alt sammen ved å installere innsjekkingsappen på et nettbrett.

1. Installer **B1 Checkin-appen** — se artikkelen [Innsjekking](../attendance/check-in.md) for nedlastingslenker
2. Logg inn med dine B1 Admin-påloggingsdetaljer
3. Velg din campus og gudstjenestetid

Se den fullstendige artikkelen [Innsjekking](../attendance/check-in.md) for detaljerte oppsettstrinn.

## Trinn 5: Skaff deg maskinvaren

Du trenger et nettbrett til kiosken og valgfritt en Brother-etikettskriver for navnelapper.

Som minimum:
- **Ett Android- eller Amazon Fire-nettbrett** — se [anbefalte nettbrett](../attendance/check-in.md#recommended-hardware)
- **Én Brother-etikettskriver** — QL-1110NWB anbefales for sin Bluetooth- og WiFi-støtte
- **Brother DK-1201-etiketter** (1-1/7" x 3-1/2")

:::warning
Kun Brother-etikettskrivere er kompatible med B1 Checkin-appen. Andre skrivermerker vil ikke fungere.
:::

## Trinn 6: Kjør en testinnsjekking

Før søndag morgen, gjør en testkjøring:

1. Åpne B1 Checkin-appen på nettbrettet ditt
2. Velg din campus og riktig gudstjenestetid
3. Søk etter en av familiene du la til
4. Sjekk inn et barn og bekreft:
   - Oppmøtet vises i B1 Admin under **Oppmøte**
   - Hvis du bruker en skriver, skrives navnelappen ut korrekt

:::tip
Lær opp velkomstteamets frivillige i innsjekkingsprosessen før lansering. En rask 5-minutters gjennomgang er vanligvis alt som trengs.
:::

## Du er ferdig!

Innsjekkingen for barnetjenesten er klar. Foreldre kan søke etter familien sin, velge barna sine og sjekke inn ved kiosken. Oppmøte registreres automatisk i B1 Admin.

## Relaterte artikler

- [Legge til personer](../people/adding-people.md) — legg til flere familier etter hvert som de besøker
- [Opprette grupper](../groups/creating-groups.md) — administrer barnegruppene dine
- [Oppmøteoppsett](../attendance/setup.md) — konfigurer campus og gudstjenester
- [Innsjekking](../attendance/check-in.md) — detaljert oppsett av innsjekkingsapp og maskinvare
- [Oppmøtesporing](../attendance/tracking-attendance.md) — vis innsjekkingsrapporter
