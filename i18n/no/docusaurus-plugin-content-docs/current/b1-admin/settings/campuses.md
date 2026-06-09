---
title: "Campuser"
---

# Campuser

<div class="article-intro">

Hvis kirken din møtes på mer enn ett sted, lar **Campuser** deg spore hvilket sted hver person og gruppe tilhører. Når de er konfigurert, vises campuser som et alternativ på personprofiler, i frammøteoppsett og på Demograffakta-dashbordet. Kirker med flere steder kan filtrere, søke og rapportere etter campus gjennom hele B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger **Rediger kirkens innstillinger**-tillatelse for å administrere campuser. Se [Roller og tillatelser](./roles-permissions.md).

</div>

## Åpne Campus-innstillinger

I B1 Admin, gå til **Innstillinger** i venstre sidestolpe og velg **Campuser** fra Innstillinger-navigasjonen. Du vil se en liste over alle konfigurerte campuser med navn, sted og tidssone.

## Legg til en campus

1. Klikk **Legg til campus** (eller **+**-knappen hvis ingen campuser finnes ennå).
2. Fyll inn campusdetaljene:
   - **Navn** *(obligatorisk)* – det visningsnavnet som vises gjennom B1 Admin (for eksempel "Hovedcampus" eller "Nordcampus").
   - **Adresse** – campusgatens adresse (brukt til informasjonell visning; ikke det samme som kirkens hovedadresse i Kirkens innstillinger).
   - **By / Fylke / Postnummer** – campusets plassering.
   - **Tidssone** – IANA-tidssonen for denne campusen (for eksempel *America/Chicago*). Nyttig når campuser er i forskjellige tidssoner.
   - **Nettsted** – en valgfri URL for denne campusens eget nettsted.
3. Klikk **Lagre**.

## Rediger en campus

Klikk enhver campusrad i listen for å åpne editoren i panelet til høyre. Oppdater feltene og klikk **Lagre**.

## Slett en campus

Åpne en campus for redigering og klikk **Slett**. Du vil bli bedt om å bekrefte. Sletting av en campus fjerner ikke personene som er tilordnet den – campusfeltet deres blir ganske enkelt tomt.

## Tilordne personer til en campus

Etter å ha opprettet campuser, kan personell tilordne en person til en campus fra profilen:

1. Åpne en persons oppføring i **Personer**.
2. Klikk **Rediger**.
3. Velg campusen fra **Campus**-rullegardinlisten.
4. Klikk **Lagre**.

Du kan også oppdatere campus i bulk fra Personer-siden. Velg flere personer, bruk **Bulkredigering** og angi Campus-feltet for alle samtidig.

## Filtrer etter campus

Når campuser er satt opp, kan du filtrere på tvers av B1 Admin etter campus:

- **Personsøk** – legg til en Campus-betingelse i det avanserte søket, eller last en [Lagret liste](../people/lists.md) begrenset til en campus.
- **Demograffakta** – [Demograffakta-dashbordet](../people/demographics.md) viser et Campus doughnut-diagram når minst en person har en campus tilordnet.
- **Frammøteoppsett** – hver servicetime i Frammøte kan være bundet til en campus.

:::tip
Enkeltlokasjonskirker trenger ikke å konfigurere campuser. Alle campus-funksjoner er valgfrie – hvis ingen campuser finnes, vises campus-felt og diagrammer ganske enkelt ikke.
:::

## Relaterte artikler

- [Kirkens innstillinger](./church-settings.md) – kirkes hovedadresse og merkevare (atskilt fra campusadresser)
- [Demograffakta](../people/demographics.md) – Campus-fordelingsdiagrammet
- [Frammøteoppsett](../attendance/setup.md) – koppel servicetider til en campus
- [Bulkredigering](../people/bulk-editing.md) – tilordne campus til mange personer på en gang
