---
title: "Påminnelser for hendelser"
description: "Sett opp påminnelser for hendelser i B1 Admin som push, e-post og tekstmelding. Velg tidspunkt, mottakere og en egen melding, slik at folk blir varslet i tide."
---

# Påminnelser for hendelser

<div class="article-intro">

Påminnelser for hendelser varsler automatisk de rette personene før en hendelse finner sted – for eksempel «Ikke gå glipp av det! Helsekurset starter i morgen kl. 09.00.» Du setter opp en påminnelse én gang på hendelsen, og B1 sender den ut til rett tid via pushvarsler, e-post og, hvis menigheten din har tekstmeldinger satt opp, tekstmeldinger. Medlemmer kan selv styre hvilke påminnelser de får, via sine egne [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett hendelsen du vil minne folk på (se [Opprette kalendere](./creating-calendars.md))
- For å nå påmeldte deltakere må du [aktivere påmelding](./creating-calendars.md) for hendelsen
- For å nå en hel gruppe må du sørge for at hendelsen tilhører en [gruppe](../groups/creating-groups.md) med medlemmer

</div>

## Sette opp en påminnelse {#setting-up-a-reminder}

Du konfigurerer påminnelser i delen **Reminders** for hendelsen. Utvid den for å se innstillingene.

- Når du **oppretter en ny hendelse**, utvider du delen **Reminders** nederst i redigeringsvisningen **New Event**. Påminnelsen lagres når du lagrer hendelsen.
- For en **eksisterende hendelse** bruker du delen **Reminders** et av disse stedene, og klikker på knappen **Save** inne i delen: dialogen som åpnes når du klikker på hendelsen i en kalender, redigeringsvisningen **Edit Event**, eller hendelsens påmeldingsside (**Calendars > Registrations**, og deretter hendelsen).

1. Slå på **Enable reminders**.
2. Velg **When (up to 3)** for når den skal sendes: **7 days before**, **3 days before**, **1 day before** og **Day of**. Når tre er valgt, er de andre deaktivert til du fjerner ett.
3. Angi **Time of day** for når påminnelsen skal sendes (standard er **9:00 AM**, i menighetens [tidssone](../settings/church-settings.md#time-zone)).
4. Velg hvem som skal få påminnelsen under **Who** (se [Hvem får påminnelse](#who-gets-reminded) nedenfor).
5. Legg eventuelt til en **Message (optional)**. La feltet stå tomt for å bruke standardteksten, eller skriv din egen – du kan bruke `{{eventTitle}}`, som erstattes med hendelsens navn.
6. Velg **Channels**: **Push**-varsel og **E-post** (begge er på som standard), og **Text** hvis menigheten din har en [leverandør for tekstmeldinger](../settings/church-settings.md#texting) koblet til.
7. Klikk **Save** (eller lagre den nye hendelsen).

For å stoppe påminnelsene for en hendelse slår du av **Enable reminders** og lagrer.

For en hendelse som allerede er lagret, viser en **live preview** omtrent hvor mange som får påminnelse, hvor mange deltakere som ikke kan nås, og de neste planlagte utsendelsestidspunktene mens du gjør endringer – slik at du kan bekrefte at påminnelsen ser riktig ut før du lagrer. En helt ny hendelse har ingen forhåndsvisning før den er lagret.

## Hvem får påminnelse {#who-gets-reminded}

Innstillingen **Who** styrer hvem påminnelsen går til:

- **Registrants only** – alle som er påmeldt hendelsen og er koblet til en personpost. Dette er standard når hendelsen har påmelding aktivert, slik at en påminnelse for en liten påmeldt hendelse aldri ved en feil går til en hel gruppe.
- **Heads / registrants only** – én påminnelse per påmelding (den som meldte seg på), i stedet for til hvert familiemedlem på påmeldingen.
- **Group members** – alle i hendelsens gruppe. Dette er standard når hendelsen ikke bruker påmelding.
- **Auto** – bruker påmeldte når påmelding er aktivert, ellers gruppen.

:::info
Gjester som bare er oppgitt med navn (uten koblet personpost), kan ikke motta påminnelse, fordi det ikke finnes noen konto, enhet eller e-postadresse å sende til. Forhåndsvisningen viser hvor mange deltakere som havner i denne gruppen, slik at det ikke kommer overraskelser. Medlemmer som har reservert seg mot kommunikasjon, hoppes også over.
:::

## Når påminnelser sendes {#when-reminders-are-sent}

- Påminnelser sendes på **tidspunktet du velger**, i menighetens lokale tidssone, på hvert av de valgte tidspunktene før hendelsen.
- Hvis du **endrer datoen eller klokkeslettet** for hendelsen, blir de ventende påminnelsene automatisk planlagt på nytt – du trenger ikke redigere påminnelsen.
- Hvis du **sletter hendelsen** (eller avlyser én enkelt forekomst av en gjentakende hendelse), avlyses de ventende påminnelsene automatisk.
- Gjentakende hendelser håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **først som push, med e-post som reserve**. Hvis et medlem har pushvarsler aktivert, får de et push; ellers får de en e-post i stedet. Medlemmer velger selv hvilke kanaler de vil ha for hver type varsel i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md).
:::

## Tekstpåminnelser {#text-reminders}

Kanalen **Text** vises bare når menigheten din har en leverandør for tekstmeldinger koblet til. Tekstmeldinger sendes via menighetens leverandør, og hver tekstmelding kan koste menigheten din penger. De sendes i tillegg til eventuelle push- eller e-postpåminnelser, og bare til personer som:

- Har slått på **Text messages** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md), og
- Har et mobilnummer på profilen sin.

Hver tekstmelding starter med menighetens navn, holdes innenfor én tekstmelding og avsluttes med «Reply STOP to opt out.» Den som svarer STOP, slutter å få tekstmeldinger fra menigheten din. For at STOP-svar skal nå B1, limer du inn **Inbound (STOP) webhook URL** fra [innstillingene for tekstmeldinger](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

## Hva medlemmene kan styre {#what-members-can-control}

Påminnelser følger alltid hvert medlems [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md). Et medlem kan:

- Slå **Event Reminders** av for push, e-post eller tekst, mens andre varsler fortsatt er på.
- Slå tekstpåminnelser av eller på med **Text messages**.
- Angi **stille tid** slik at varsler som ikke er presserende venter til et rimelig tidspunkt.

Du kan ikke overstyre et medlems valg om å reservere seg mot påminnelser for hendelser – dette holder B1 i samsvar med regler mot spam og gir medlemmene kontroll over innboksen sin.

## Påminnelser til frivillige {#serving-reminders}

Frivillige som er satt opp på en plan, får en egen **tjenestepåminnelse** med detaljene for planen, og når de ikke har svart ennå, knappene **Accept / Decline** rett i e-posten. Disse påminnelsene konfigureres på plantypen og ikke på en kalenderhendelse, og de kan også sendes som tekstmelding – se [Påminnelser til frivillige](../serving/plans.md#volunteer-reminders) og [Søndagsfrivillige](../guides/sunday-volunteers.md) for hvordan planlegging og påminnelser for frivillige fungerer.

## Neste steg {#next-steps}

- [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences.md) – det medlemmene kan styre selv
- [Veiledning for påmelding til hendelser](../guides/event-registration.md) – sett opp påmelding slik at påminnelser kan nå deltakerne
- [Opprette kalendere](./creating-calendars.md) – tilbake til oppsett av kalender
