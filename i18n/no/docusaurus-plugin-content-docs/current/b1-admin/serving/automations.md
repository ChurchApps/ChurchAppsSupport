---
title: "Automatiseringer"
---

# Automatiseringer

<div class="article-intro">

Automatiseringer oppretter oppgaver automatisk etter en gjentakende tidsplan. I stedet for å manuelt opprette de samme oppgavene hver uke eller måned, kan du sette opp en automatisering én gang og la systemet ta seg av det, slik at ingenting blir oversett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Gjør deg kjent med hvordan [Oppgaver](./tasks.md) fungerer i B1 Admin
- Identifiser hvilke gjentakende ansvarsområder du ønsker å automatisere

</div>

## Vise automatiseringer

Naviger til **Tjeneste** og åpne **Automatiseringer**-siden. Du vil se en liste over alle dine automatiseringer, som viser tittel, aktiv status og gjentakelsesmønster for hver.

## Opprette en automatisering

1. På Automatiseringer-siden, klikk **Legg til automatisering**.
2. Skriv inn en **tittel** for automatiseringen. Denne vil også bli brukt som tittelen på oppgavene den oppretter.
3. Sett **gjentakelsesmønsteret** -- velg hvor ofte oppgaven skal opprettes (for eksempel ukentlig, månedlig eller på bestemte dager).
4. Tildel oppgaven til en **person eller gruppe** som skal være ansvarlig hver gang den kjøres.
5. Sett automatiseringen til **Aktiv** slik at den begynner å opprette oppgaver etter tidsplanen.
6. Klikk **Lagre**.

## Redigere en automatisering

1. Klikk på en eksisterende automatisering i listen for å åpne den.
2. Oppdater tittelen, gjentakelsesmønsteret, tildelingen eller andre innstillinger.
3. Klikk **Lagre** for å lagre endringene dine.

## Aktivering og deaktivering

Du kan kontrollere om en automatisering kjører uten å slette den:

- **Aktiv** -- Automatiseringen vil opprette oppgaver i henhold til sin tidsplan.
- **Inaktiv** -- Automatiseringen er satt på pause og vil ikke opprette nye oppgaver før du reaktiverer den.

:::tip
Sett en automatisering til **Inaktiv** under ferieavbrekk eller spesielle perioder når den gjentakende oppgaven ikke er nødvendig. Du kan reaktivere den når som helst uten å miste konfigurasjonen din.
:::

## Hvordan det fungerer

Når en automatisering kjøres, oppretter den en ny [oppgave](./tasks.md) med den konfigurerte tittelen og tildelingen. Oppgaven oppfører seg akkurat som enhver annen oppgave -- tilordnede mottar varsler og kan administrere oppgaven fra dashbordet sitt eller Oppgaver-siden.

:::info
Automatiseringer oppretter bare nye oppgaver fremover. De oppretter ikke oppgaver tilbakevirkende for tidligere datoer.
:::

## Neste steg

- Lær mer om å administrere individuelle [Oppgaver](./tasks.md) som automatiseringer oppretter
- Bruk automatiseringer sammen med [Tjenesteplaner](./plans.md) for å holde den ukentlige tjenesteforberebelsen på sporet
