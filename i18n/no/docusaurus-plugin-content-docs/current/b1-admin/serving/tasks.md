---
title: "Oppgaver"
---

# Oppgaver

<div class="article-intro">

Oppgaver lar deg tildele handlingspunkter til personer eller grupper i kirken din. Enten det er en engangsoppgave eller et gjentakende ansvar, hjelper oppgaver deg å følge med på hva som må gjøres og hvem som har ansvaret, slik at ingenting blir oversett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at personene eller [gruppene](../groups/creating-groups.md) du vil tildele oppgaver til finnes i B1 Admin
- I [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Tjeneste > Mitt arbeid** for å se oppgaver

</div>

## Se oppgaver

I hurtigmenyen velger du **Tjeneste > Mitt arbeid** (eller søker etter «Mitt arbeid»). Listen **Oppgaver** viser hver oppgaves tittel, hvem den gjelder, hvem den er tildelt, når den ble åpnet og statusen. Dine [arbeidsflytkort](./workflows.md) vises ved siden av under **Mine kort**.

Bruk fanene over listen for å bytte mellom oppgavene **Tildelt meg**, **Tildelt mine grupper** og **Bedt om av meg**. Hver fane viser hvor mange oppgaver den inneholder.

:::tip
Som standard vises bare åpne oppgaver. Velg **Lukket** over listen for å se fullførte oppgaver i stedet.
:::

## Opprette en oppgave

1. På siden **Mitt arbeid** klikker du **Legg til oppgave**. Et skjema for **Ny oppgave** åpnes.
2. Klikk på boksen **Knytt til** og velg personen oppgaven gjelder.
3. Klikk på boksen **Tildel til**. I vinduet **Velg en person eller gruppe** søker du på fanen **Person**, eller bytter til fanen **Gruppe** og søker etter en gruppe, og velger deretter resultatet.
4. Skriv inn en **tittel** for oppgaven.
5. Velg eventuelt en **frist**.
6. Legg til **notater** med detaljer eller instruksjoner for den som skal utføre oppgaven.
7. Klikk **Lagre**.

Oppgaven vises nå i oppgavelisten, og er synlig for mottakeren på dashbordet og i mobilappen.

## Administrere en oppgave

Klikk på en oppgave for å åpne detaljsiden. Herfra kan du:

- **Lukke eller gjenåpne oppgaven** -- Klikk **Lukk oppgave** når arbeidet er gjort, eller **Gjenåpne oppgave** for å åpne den igjen.
- **Tildele oppgaven på nytt** -- Klikk **Tildel** for å velge en annen person eller gruppe.
- **Endre hvem den gjelder** -- Klikk **Knytt til** for å velge en annen person.
- **Endre fristen** -- Velg en dato i feltet **Frist**; den lagres når du klikker utenfor. (Oppgaver opprettet for en [bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) viser fristen sin, men den kan ikke endres her.)
- **Legge til notater** -- Skriv oppdateringer eller detaljer for den som skal utføre oppgaven i oppgavens notater.
- **Sette påminnelser** -- Se [Påminnelser for oppgaver](#task-reminders) nedenfor.

## Påminnelser for oppgaver {#task-reminders}

En oppgave med en frist kan minne den som skal utføre den før fristen.

1. På oppgavens side klikker du **Rediger** ved siden av **Påminnelser**.
2. Slå på **Send påminnelser for denne oppgaven**.
3. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** eller **Samme dag**.
4. Angi **klokkeslettet** og eventuelt en **melding**.
5. Under **Send med** velger du **Push**, **E-post** og, hvis kirken din har en [SMS-leverandør](../settings/church-settings.md#texting) koblet til, **SMS**.
6. Klikk **Lagre påminnelser**.

Hvis oppgaven ikke har noen frist, varsler B1 deg om at ingen påminnelser sendes før en er satt i feltet **Frist**. SMS-påminnelser når bare personer som har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), og hver SMS kan koste kirken din penger.

## Oppgavens livssyklus

1. En ny oppgave starter med statusen **Åpen**.
2. Den som oppgaven er tildelt, får et varsel og kan se oppgaven fra dashbordet, **Tjeneste > Mitt arbeid** eller mobilappen.
3. Når arbeidet er gjort, klikker den som utfører oppgaven (eller en administrator) på **Lukk oppgave**.
4. Lukkede oppgaver fjernes fra standardvisningen, men kan fortsatt finnes ved å velge **Lukket** over oppgavelisten.

:::info
B1 Admin oppretter ikke lenger gjentakende oppgaver etter en fast plan. For gjentakende oppfølging av personer, bruk en [arbeidsflyt](./workflows.md) med en [tidsplantrigger](./workflows.md#schedule-triggers).
:::

:::tip
Når du trenger å flytte mange personer gjennom de samme trinnene -- for eksempel oppfølging av nye besøkende eller en medlemsprosess -- bruk [arbeidsflyter](./workflows.md). Arbeidsflyter gjør oppgaver om til kort på en dra-og-slipp-tavle med steg, frister og ruting.
:::

:::info
Noen oppgaver opprettes automatisk av andre deler av B1 og åpnes som et spesielt gjennomgangskort i stedet for standardvisningen for notater/omtildeling -- [forespørsler om å bli med i grupper](../groups/group-join-requests.md#approving-from-the-tasks-page), [forespørsler om profilendringer](../profile/approving-profile-changes.md) og [forespørsler om sletting av konto](../profile/account-deletion.md) fungerer alle slik.
:::

## Neste steg

- Flytt personer gjennom en prosess med flere steg ved hjelp av [arbeidsflyter](./workflows.md)
- Bruk [arbeidsflyter](./workflows.md) for å flytte personer gjennom gjentakende prosesser automatisk
- Bruk oppgaver sammen med [gudstjenesteplaner](./plans.md) for å følge opp forberedelsene til gudstjenesten
