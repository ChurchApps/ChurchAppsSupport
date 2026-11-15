---
title: "Oppgaver"
description: "Opprett, tildel og lukk oppgaver i B1 Admin, finn dem under Tjeneste > Mitt arbeid, og sett påminnelser om forfallsdato slik at oppfølgingspunkter aldri glipper."
---

# Oppgaver

<div class="article-intro">

Oppgaver lar deg tildele handlingspunkter til personer eller grupper i menigheten din. Enten det er en engangsoppgave eller et gjentakende ansvar, hjelper oppgaver deg med å følge med på hva som må gjøres og hvem som har ansvaret, slik at ingenting blir oversett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kontroller at personene eller [gruppene](../groups/creating-groups.md) du vil tildele oppgaver til, finnes i B1 Admin
- I [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Tjeneste > Mitt arbeid** for å se oppgavene

</div>

## Se oppgaver {#viewing-tasks}

I Hurtigmenyen velger du **Tjeneste > Mitt arbeid** (eller søker etter «Mitt arbeid»). Listen **Oppgaver** viser tittelen til hver oppgave, hvem den gjelder, hvem den er tildelt, når den ble åpnet, og statusen. [Arbeidsflytkortene](./workflows.md) dine vises ved siden av den under **Mine kort**. Mottakere kan også se og arbeide med kortene og åpne oppgavene sine fra skjermbildet **Meg** i B1-appen.

Bruk fanene over listen for å bytte mellom oppgavene **Tildelt meg**, **Tildelt mine grupper** og **Bedt om av meg**. Hver fane viser hvor mange oppgaver den inneholder. Oppgaver og **Mine kort** listes med det nyeste først, slik at det som nettopp kom inn, står øverst.

:::tip
Som standard vises bare åpne oppgaver. Velg **Lukket** over listen for å se fullførte oppgaver i stedet.
:::

## Opprette en oppgave {#creating-a-task}

1. På siden **Mitt arbeid** klikker du på **Legg til oppgave**. Skjemaet **Ny oppgave** åpnes.
2. Klikk eventuelt i boksen **Knytt til** og velg personen eller gruppen oppgaven gjelder. La den stå tom for en vanlig oppgave som ikke gjelder noen, for eksempel en påminnelse til deg selv.
3. Klikk i boksen **Tildel til**. I vinduet **Velg en person eller gruppe** søker du på fanen **Person**, eller bytter til fanen **Gruppe** og søker etter en gruppe, og velger deretter resultatet.
4. Skriv inn en **tittel** for oppgaven.
5. Velg eventuelt en **forfallsdato**.
6. Legg til **notater** med detaljer eller instruksjoner for mottakeren.
7. Klikk på **Lagre**.

Oppgaven vises nå i oppgavelisten, og mottakeren ser den på dashbordet sitt og i mobilappen.

## Administrere en oppgave {#managing-a-task}

Klikk på en oppgave for å åpne detaljsiden. Herfra kan du:

- **Lukke eller gjenåpne oppgaven** -- Klikk på **Lukk oppgave** når arbeidet er ferdig, eller **Gjenåpne oppgave** for å åpne den igjen.
- **Tildele oppgaven på nytt** -- Klikk på **Tildel** for å velge en annen person eller gruppe.
- **Endre hvem den gjelder** -- Klikk på **Knytt til** for å velge en annen person eller gruppe, eller velg **Ingen person eller gruppe** for å fjerne det.
- **Endre forfallsdato** -- Velg en dato i feltet **Forfall**; den lagres når du klikker utenfor feltet. (Oppgaver opprettet for en [bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) viser forfallsdatoen sin, men den kan ikke endres her.)
- **Legge til notater** -- Skriv oppdateringer eller detaljer til mottakeren i oppgavens notater.
- **Sette påminnelser** -- Se [Påminnelser for oppgaver](#task-reminders) nedenfor.

## Påminnelser for oppgaver {#task-reminders}

En oppgave med forfallsdato kan minne mottakeren før fristen.

1. På oppgavens side klikker du på **Rediger** ved siden av **Påminnelser**.
2. Slå på **Send påminnelser for denne oppgaven**.
3. Under **Når skal påminnelsene sendes?** velger du opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** eller **Samme dag**.
4. Sett **klokkeslettet** og eventuelt en **melding**.
5. Under **Send via** velger du **Push**, **E-post** og, hvis menigheten din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
6. Klikk på **Lagre påminnelser**.

Hvis oppgaven ikke har en forfallsdato, varsler B1 deg om at ingen påminnelser sendes før en dato er satt i feltet **Forfall**. Tekstpåminnelser når bare personer som har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), og hver tekstmelding kan koste menigheten din penger.

## Livssyklus for en oppgave {#task-lifecycle}

1. En ny oppgave starter med statusen **Åpen**.
2. Mottakeren får et varsel og kan se oppgaven fra dashbordet sitt, **Tjeneste > Mitt arbeid**, eller mobilappen.
3. Når arbeidet er ferdig, klikker mottakeren (eller en administrator) på **Lukk oppgave**.
4. Lukkede oppgaver fjernes fra standardvisningen, men kan fortsatt finnes ved å velge **Lukket** over oppgavelisten.

:::info
B1 Admin oppretter ikke lenger gjentakende oppgaver etter en tidsplan. For gjentakende oppfølging av personer, bruk en [arbeidsflyt](./workflows.md) med en [tidsplanutløser](./workflows.md#schedule-triggers).
:::

:::tip
Når du trenger å flytte mange personer gjennom de samme stegene — for eksempel oppfølging av nye gjester eller en medlemsprosess — bruk [Arbeidsflyter](./workflows.md). Arbeidsflyter gjør oppgaver om til kort på en tavle du drar og slipper med steg, forfallsdatoer og ruting.
:::

:::info
Noen oppgaver opprettes automatisk av andre deler av B1 og åpnes med et spesielt gjennomgangskort i stedet for det vanlige notat- og omtildelingsvisningen — [forespørsler om å bli med i gruppe](../groups/group-join-requests.md#approving-from-the-tasks-page), [forespørsler om endring av profil](../profile/approving-profile-changes.md) og [forespørsler om sletting av konto](../profile/account-deletion.md) fungerer alle på denne måten.
:::

## Neste steg {#next-steps}

- Flytt personer gjennom en prosess med flere steg med [Arbeidsflyter](./workflows.md)
- Bruk [Arbeidsflyter](./workflows.md) til å flytte personer gjennom gjentakende prosesser automatisk
- Bruk oppgaver sammen med [gudstjenesteplaner](./plans.md) for å følge med på handlingspunkter i forberedelsene til gudstjenesten
