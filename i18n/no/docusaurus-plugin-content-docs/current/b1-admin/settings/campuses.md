---
title: "Campuser"
---

# Campuser

<div class="article-intro">

Hvis kirken din møtes på mer enn ett sted, lar **campuser** deg spore hvilket sted hver person og gruppe tilhører. Når de er konfigurert, vises campuser som et alternativ på personer-profiler, i oppmøte-oppsett og i demografisk instrumentpanel. Kirker på flere steder kan filtrere, søke og rapportere etter campus gjennom B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Rediger kirkens innstillinger**-tillatelsen for å administrere campuser. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpning av campus-innstillinger

I B1 Admin, åpne **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen), velg **Innstillinger** og velg **Campuser** fra Innstillinger-navigasjonen. Du vil se en liste over alle konfigurerte campuser med navn, plassering og tidssone.

## Legge til en campus

1. Klikk **Legg til campus** (eller **+** knappen hvis det ikke finnes campuser ennå).
2. Fyll inn campus-detaljene:
   - **Navn** *(påkrevd)* -- visningsnavnet som vises gjennom B1 Admin (for eksempel, "Hovedcampus" eller "Nordcampus").
   - **Adresse** -- campusens gateadresse (brukt for informativt display; ikke det samme som kirkens hovedadresse i kirkens innstillinger).
   - **By / Stat / Postnummer** -- campusplasseringen.
   - **Tidssone** -- IANA-tidssonen for denne campusen (for eksempel, *America/Chicago*). Nyttig når campuser er i forskjellige tidssoner.
   - **Nettsted** -- en valgfritt URL for campusens eget nettsted.
3. Klikk **Lagre**.

## Redigering av en campus

Klikk ethvert campus-rad i listen for å åpne redactoren i panelet til høyre. Oppdater feltene og klikk **Lagre**.

## Sletting av en campus

Åpne en campus for redigering og klikk **Slett**. Du blir bedt om å bekrefte. Sletting av en campus fjerner ikke menneskene som er tilordnet den -- deres campus-felt blir ganske enkelt tomt.

## Tilordning av mennesker til en campus

Etter å ha opprettet campuser, kan ansatte tilordne en person til en campus fra profilen:

1. Åpne en persons registrering i **Mennesker**.
2. Klikk **Rediger**.
3. Velg campusen fra **Campus**-rullemenyene.
4. Klikk **Lagre**.

Du kan også oppdatere campus i bulk fra mennesker-siden. Velg flere mennesker, bruk **Bulk rediger** og sett campus-feltet for alle på en gang.

## Filtrering etter campus

Når campuser er satt opp, kan du filtrere på tvers av B1 Admin etter campus:

- **Mennesker-søk** -- legg til en campus-betingelse i avansert søk, eller last en [Lagret liste](../people/lists.md) omfanget til en campus.
- **Demografi** -- [Demografisk instrumentpanel](../people/demographics.md) viser et campus-donut-diagram når minst en person har en campus tilordnet.
- **Oppmøte Setup** -- hvert gudstjenesteklokkeslett i oppmøte kan være knyttet til en campus.

:::tip
Kirker på ett sted trenger ikke å konfigurere campuser. Alle campus-funksjoner er valgfrie -- hvis det ikke finnes campuser, vises campus-felter og diagram ikke.
:::

## Relaterte artikler

- [Kirkens innstillinger](./church-settings.md) -- kirkens hovedadresse og merkevare (atskilt fra campus-adresser)
- [Demografi](../people/demographics.md) -- campus nedbrytning diagram
- [Oppmøte Setup](../attendance/setup.md) -- koble gudstjenesteklokkeslett til en campus
- [Bulk redigering](../people/bulk-editing.md) -- tilordne campus til mange mennesker på en gang
