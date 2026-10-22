---
title: "Påminnelser om arrangementer"
---

# Påminnelser om arrangementer {#event-reminders}

<div class="article-intro">

Påminnelser om arrangementer varsler automatisk de riktige personene før et arrangement finner sted -- for eksempel «Ikke gå glipp av det! Helsekurset starter i morgen kl. 09.00.» Du konfigurerer en påminnelse én gang på arrangementet, og B1 sender den ut etter planen via pushvarsler, e-post og, hvis kirken har tekstmeldinger satt opp, SMS. Medlemmer kan styre hvilke påminnelser de mottar fra sine egne [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett arrangementet du vil minne folk på (se [Opprette kalendere](creating-calendars))
- For å nå påmeldte deltakere må du [aktivere påmelding](creating-calendars) på arrangementet
- For å nå en hel gruppe må arrangementet tilhøre en [gruppe](../groups/creating-groups) med medlemmer

</div>

## Sette opp en påminnelse {#setting-up-a-reminder}

Du konfigurerer påminnelser i delen **Påminnelser** på arrangementet.

- Når du **oppretter et nytt arrangement**, utvider du delen **Påminnelser** i arrangementsredigeringen før du lagrer.
- For et **eksisterende arrangement** åpner du arrangementets side **Påmeldingsdetaljer** (fra delen **Påmeldinger**) for å legge til eller endre påminnelsen.

1. Slå på **Aktiver påminnelser**.
2. Velg **Når** påminnelsen skal sendes. Velg opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** og **Samme dag**.
3. Angi **Klokkeslett** for når påminnelsen skal sendes (standard er **09.00**, i kirkens [tidssone](../settings/church-settings.md#time-zone)).
4. Velg **Hvem** som skal minnes (se [Hvem som får påminnelse](#who-gets-reminded) nedenfor).
5. Legg eventuelt til en **Melding**. La feltet stå tomt for å bruke standardteksten, eller skriv din egen -- du kan inkludere `{{eventTitle}}`, som erstattes med arrangementets navn.
6. Velg **kanalene**: **Push**-varsel, **E-post** og, hvis kirken har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
7. Lagre arrangementet.

Mens du gjør endringer, viser en **forhåndsvisning** omtrent hvor mange som får påminnelse, hvor mange deltakere som ikke kan nås, og de neste planlagte utsendelsestidspunktene -- slik at du kan bekrefte at påminnelsen ser riktig ut før du lagrer.

## Hvem som får påminnelse {#who-gets-reminded}

Innstillingen **Hvem** styrer hvem påminnelsen går til:

- **Kun påmeldte** -- Alle som er påmeldt arrangementet og er koblet til en personpost. Dette er standard når arrangementet har påmelding aktivert, slik at en påminnelse for et lite påmeldt arrangement aldri ved en feil går til en hel gruppe.
- **Hovedpersoner / kun påmeldte** -- Én påminnelse per påmelding (personen som meldte seg på), i stedet for hver familiemedlem på påmeldingen.
- **Gruppemedlemmer** -- Alle i arrangementets gruppe. Dette er standard når arrangementet ikke bruker påmelding.
- **Automatisk** -- Bruker påmeldte når påmelding er aktivert, ellers gruppen.

:::info
Gjester som bare er registrert med navn (uten koblet personpost), kan ikke få påminnelse, fordi det ikke finnes noen konto, enhet eller e-postadresse å sende til. Forhåndsvisningen forteller deg hvor mange deltakere som havner i denne gruppen, slik at det ikke blir noen overraskelser. Medlemmer som har reservert seg mot kommunikasjon, hoppes også over.
:::

## Når påminnelser sendes {#when-reminders-are-sent}

- Påminnelser sendes på **klokkeslettet du velger**, i kirkens lokale tidssone, på hvert av tidspunktene du har valgt.
- Hvis du **endrer datoen eller klokkeslettet** for arrangementet, planlegges de ventende påminnelsene automatisk på nytt -- du trenger ikke redigere påminnelsen.
- Hvis du **sletter arrangementet** (eller avlyser én enkelt forekomst av et gjentakende arrangement), avlyses de ventende påminnelsene automatisk.
- Gjentakende arrangementer håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **først som push, med e-post som reserve**. Hvis et medlem har pushvarsler aktivert, får de et push-varsel; hvis ikke, får de en e-post i stedet. Medlemmer velger hvilke kanaler de vil ha for hver type varsel i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).
:::

## Tekstpåminnelser {#text-reminders}

Kanalen **Tekstmelding** vises bare når kirken har en tekstmeldingsleverandør koblet til. Tekstmeldinger sendes via kirkens tekstmeldingsleverandør, og hver melding kan koste kirken penger. De sendes i tillegg til eventuelle push- eller e-postpåminnelser, og bare til personer som:

- Har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences), og
- Har et mobilnummer på profilen sin.

Hver tekstmelding starter med kirkens navn, holdes til én enkelt melding og avsluttes med «Svar STOP for å melde deg av.» Alle som svarer STOP, slutter å motta tekstmeldinger fra kirken. For at STOP-svar skal nå B1, limer du inn **URL for innkommende (STOP) webhook** fra [tekstmeldingsinnstillingene](../settings/church-settings.md#texting) i leverandørens webhook for innkommende meldinger.

## Hva medlemmene kan styre {#what-members-can-control}

Påminnelser respekterer alltid hvert medlems [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences). Et medlem kan:

- Slå av **Påminnelser om arrangementer** for push, e-post eller tekstmelding, mens andre varsler forblir på.
- Slå tekstpåminnelser av eller på med **Tekstmeldinger**.
- Angi **stille tider**, slik at ikke-hastende varsler venter til et rimelig tidspunkt.

Du kan ikke overstyre et medlems valg om å melde seg av påminnelser om arrangementer -- dette sikrer at B1 følger reglene mot spam, og at medlemmene har kontroll over innboksen sin.

## Tjenestepåminnelser {#serving-reminders}

Frivillige som er satt opp i en plan, får en egen **tjenestepåminnelse** med detaljer om planen og, dersom de ikke har svart ennå, knappene **Godta / Avslå** rett i e-posten. Disse påminnelsene konfigureres på plantypen i stedet for på et kalenderarrangement, og kan også sendes som tekstmelding -- se [Påminnelser til frivillige](../serving/plans#volunteer-reminders) og [Søndagens frivillige](../guides/sunday-volunteers) for hvordan planlegging og påminnelser for frivillige fungerer.

## Neste steg {#next-steps}

- [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences) -- Hva medlemmene kan styre
- [Veiledning for arrangementspåmelding](../guides/event-registration) -- Sett opp påmelding slik at påminnelser kan nå deltakerne
- [Opprette kalendere](creating-calendars) -- Tilbake til kalenderoppsettet
