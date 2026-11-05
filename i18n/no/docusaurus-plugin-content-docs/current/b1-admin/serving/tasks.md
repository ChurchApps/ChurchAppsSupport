---
title: "Oppgaver"
---

# Oppgaver

<div class="article-intro">

Med oppgaver kan du tildele handlingspunkter til personer eller grupper i menigheten din. Enten det er en engangsoppgave eller et gjentakende ansvar, hjelper oppgaver deg med å følge med på hva som må gjøres og hvem som har ansvaret, slik at ingenting blir oversett.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sørg for at personene eller [gruppene](../groups/creating-groups.md) du vil tildele oppgaver til, finnes i B1 Admin
- I [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) velger du **Serving > My Work** for å se oppgaver

</div>

## Vise oppgaver

I Jump-menyen velger du **Serving > My Work** (eller søker etter «My Work»). Listen **Tasks** viser tittelen på hver oppgave, hvem den gjelder, hvem den er tildelt, når den ble åpnet, og statusen. [Arbeidsflytkortene](./workflows.md) dine vises ved siden av den under **My Cards**.

Bruk fanene over listen for å bytte mellom oppgavene **Assigned to Me**, **Assigned to My Groups** og **Requested by Me**. Hver fane viser hvor mange oppgaver den inneholder.

:::tip
Som standard vises bare åpne oppgaver. Velg **Closed** over listen for å se fullførte oppgaver.
:::

## Opprette en oppgave

1. Klikk på **Add Task** på siden **My Work**. Skjemaet **New Task** åpnes.
2. Du kan eventuelt klikke i boksen **Associate with** og velge personen eller gruppen oppgaven gjelder. La den stå tom for en enkel huskeliste som ikke gjelder noen, for eksempel en påminnelse til deg selv.
3. Klikk i boksen **Assign to**. I vinduet **Select a Person or Group** søker du på fanen **Person**, eller bytter til fanen **Group** og søker etter en gruppe. Velg deretter resultatet.
4. Skriv inn en **Title** for oppgaven.
5. Velg eventuelt en **Due date**.
6. Legg til **Notes** med detaljer eller instruksjoner til den som skal utføre oppgaven.
7. Klikk på **Save**.

Oppgaven vises nå i oppgavelisten og er synlig for den som er tildelt, på dashbordet og i mobilappen.

## Administrere en oppgave

Klikk på en oppgave for å åpne detaljsiden. Herfra kan du:

- **Lukke eller åpne oppgaven igjen** -- Klikk på **Close task** når arbeidet er ferdig, eller på **Reopen task** for å åpne den igjen.
- **Tildele oppgaven på nytt** -- Klikk på **Assign** for å velge en annen person eller gruppe.
- **Endre hvem oppgaven gjelder** -- Klikk på **Associate** for å velge en annen person eller gruppe, eller velg **No person or group** for å fjerne koblingen.
- **Endre forfallsdatoen** -- Velg en dato i feltet **Due**. Den lagres når du klikker utenfor feltet. (Oppgaver som er opprettet for en [bekreftelse av tjenesteoppdrag](./workflows.md#serving-assignment-confirmations) viser forfallsdatoen, men den kan ikke endres her.)
- **Legge til notater** -- Skriv oppdateringer eller detaljer til den som skal utføre oppgaven, i notatfeltet for oppgaven.
- **Sette påminnelser** -- Se [Påminnelser for oppgaver](#task-reminders) nedenfor.

## Påminnelser for oppgaver {#task-reminders}

En oppgave med forfallsdato kan minne den som er tildelt før den forfaller.

1. Klikk på **Edit** ved siden av **Reminders** på oppgavens side.
2. Slå på **Send reminders for this task**.
3. Under **When should reminders go out?** velger du inntil tre tidspunkter: **7 days before**, **3 days before**, **1 day before** eller **Day of**.
4. Angi **Time of Day** og eventuelt en **Message**.
5. Under **Send By** velger du **Push**, **Email** og -- hvis menigheten din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til -- **Text**.
6. Klikk på **Save Reminders**.

Hvis oppgaven ikke har en forfallsdato, varsler B1 deg om at ingen påminnelser sendes før du har satt en dato i feltet **Due**. Tekstpåminnelser når bare personer som har slått på **Text messages** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), og hver tekstmelding kan koste menigheten din penger.

## Oppgavens livssyklus

1. En ny oppgave starter med status **Open**.
2. Den som er tildelt, får et varsel og kan se oppgaven fra dashbordet sitt, **Serving > My Work** eller mobilappen.
3. Når arbeidet er ferdig, klikker den som er tildelt (eller en administrator) på **Close task**.
4. Lukkede oppgaver fjernes fra standardvisningen, men du kan fortsatt finne dem ved å velge **Closed** over oppgavelisten.

:::info
B1 Admin oppretter ikke lenger gjentakende oppgaver etter en fast plan. For gjentatt oppfølging av personer bruker du en [arbeidsflyt](./workflows.md) med en [tidsplanutløser](./workflows.md#schedule-triggers).
:::

:::tip
Når du trenger å flytte mange personer gjennom de samme stegene -- for eksempel oppfølging av nye besøkende eller en medlemsprosess -- bruk [Workflows](./workflows.md). Arbeidsflyter gjør oppgaver om til kort på et dra-og-slipp-brett, med steg, forfallsdatoer og ruting.
:::

:::info
Noen oppgaver opprettes automatisk av andre deler av B1 og åpnes som et spesielt gjennomgangskort i stedet for den vanlige visningen for notater og omtildeling. Dette gjelder [forespørsler om å bli med i en gruppe](../groups/group-join-requests.md#approving-from-the-tasks-page), [forespørsler om endring av profil](../profile/approving-profile-changes.md) og [forespørsler om sletting av konto](../profile/account-deletion.md).
:::

## Neste steg

- Flytt personer gjennom en prosess med flere steg med [Workflows](./workflows.md)
- Bruk [Workflows](./workflows.md) til å flytte personer gjennom gjentakende prosesser automatisk
- Bruk oppgaver sammen med [Tjenesteplaner](./plans.md) for å følge opp handlingspunkter i forberedelsen av gudstjenesten
