---
title: "Oppgaver"
---

# Oppgaver

<div class="article-intro">

Oppgaver lar deg tildele handlingselementer til personer eller grupper i kirken din. Enten det er en engangsoppgave eller et gjentakende ansvar, hjelper oppgaver deg med å følge med på hva som må gjøres og hvem som har ansvaret, slik at ingenting blir oversett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene eller [gruppene](../groups/creating-groups.md) du vil tildele oppgaver til, finnes i B1 Admin
- I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Tjeneste > Mitt arbeid** for å se oppgaver

</div>

## Se oppgaver

I Hurtigmenyen velger du **Tjeneste > Mitt arbeid** (eller søker etter «Mitt arbeid»). Listen **Oppgaver** viser tittelen på hver oppgave, hvem den gjelder, hvem den er tildelt, når den ble åpnet og statusen. [Arbeidsflytkortene](./workflows.md) dine vises ved siden av under **Mine kort**.

Bruk fanene over listen for å bytte mellom oppgavene **Tildelt meg**, **Tildelt mine grupper** og **Forespurt av meg**. Hver fane viser hvor mange oppgaver den inneholder.

:::tip
Som standard vises bare åpne oppgaver. Velg **Lukket** over listen for å se fullførte oppgaver i stedet.
:::

## Opprette en oppgave

1. På siden **Mitt arbeid** klikker du **Legg til oppgave**. Et skjema **Ny oppgave** åpnes.
2. Klikk på boksen **Knytt til** og velg personen oppgaven gjelder.
3. Klikk på boksen **Tildel til**. I vinduet **Velg en person eller gruppe** søker du på fanen **Person**, eller bytter til fanen **Gruppe** og søker etter en gruppe, og velger resultatet.
4. Skriv inn en **Tittel** for oppgaven.
5. Velg eventuelt en **Forfallsdato**.
6. Legg til **Notater** med detaljer eller instruksjoner til den som skal utføre oppgaven.
7. Klikk **Lagre**.

Oppgaven vises nå i oppgavelisten, og den som er tildelt kan se den på dashbordet sitt og i mobilappen.

## Administrere en oppgave

Klikk på en oppgave for å åpne detaljsiden. Herfra kan du:

- **Lukke eller gjenåpne oppgaven** — klikk **Lukk oppgave** når arbeidet er gjort, eller **Gjenåpne oppgave** for å åpne den igjen.
- **Tildele oppgaven på nytt** — klikk **Tildel** for å velge en annen person eller gruppe.
- **Endre hvem den gjelder** — klikk **Knytt til** for å velge en annen person.
- **Endre forfallsdatoen** — velg en dato i feltet **Forfall**; den lagres når du klikker utenfor. (Oppgaver som er opprettet for en [bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) viser forfallsdatoen sin, men den kan ikke endres her.)
- **Legge til notater** — legg ut oppdateringer eller detaljer til den som er tildelt, i oppgavens notater.
- **Sette påminnelser** — se [Oppgavepåminnelser](#task-reminders) nedenfor.

## Oppgavepåminnelser

En oppgave med forfallsdato kan minne den som er tildelt før den forfaller.

1. På oppgavens side klikker du **Rediger** ved siden av **Påminnelser**.
2. Slå på **Send påminnelser for denne oppgaven**.
3. Under **Når skal påminnelser sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** eller **Samme dag**.
4. Sett **Klokkeslett** og eventuelt en **Melding**.
5. Under **Send via** velger du **Push**, **E-post** og, hvis kirken din har [en tekstmeldingstjeneste](../settings/church-settings.md#texting) koblet til, **Tekst**.
6. Klikk **Lagre påminnelser**.

Hvis oppgaven ikke har en forfallsdato, advarer B1 deg om at ingen påminnelser sendes før en er satt i feltet **Forfall**. Tekstpåminnelser når bare personer som har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), og hver tekstmelding kan koste kirken din penger.

## Oppgavens livssyklus

1. En ny oppgave starter med statusen **Åpen**.
2. Den som er tildelt får et varsel og kan se oppgaven fra dashbordet sitt, **Tjeneste > Mitt arbeid** eller mobilappen.
3. Når arbeidet er fullført, klikker den som er tildelt (eller en administrator) på **Lukk oppgave**.
4. Lukkede oppgaver fjernes fra standardvisningen, men kan fortsatt finnes ved å velge **Lukket** over oppgavelisten.

:::info
B1 Admin oppretter ikke lenger gjentakende oppgaver etter en plan. For gjentakende oppfølging av personer, bruk en [arbeidsflyt](./workflows.md) med en [tidsplanutløser](./workflows.md#schedule-triggers).
:::

:::tip
Når du trenger å flytte mange personer gjennom de samme trinnene — for eksempel oppfølging av nye besøkende eller en medlemsprosess — bruk [Arbeidsflyter](./workflows.md). Arbeidsflyter gjør oppgaver om til kort på en dra-og-slipp-tavle med trinn, forfallsdatoer og ruting.
:::

:::info
Noen oppgaver opprettes automatisk av andre deler av B1, og åpnes med et spesielt gjennomgangskort i stedet for det vanlige notat-/omtildelingsvisningen — [påmeldingsforespørsler til grupper](../groups/group-join-requests.md#approving-from-the-tasks-page), [forespørsler om profilendringer](../profile/approving-profile-changes.md) og [forespørsler om sletting av konto](../profile/account-deletion.md) fungerer alle på denne måten.
:::

## Neste steg

- Flytt personer gjennom en prosess i flere trinn med [Arbeidsflyter](./workflows.md)
- Bruk [Arbeidsflyter](./workflows.md) for å flytte personer gjennom gjentakende prosesser automatisk
- Bruk oppgaver sammen med [gudstjenesteplaner](./plans.md) for å følge med på forberedelsesoppgaver til gudstjenesten
