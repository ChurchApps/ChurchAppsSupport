---
title: "Påminnelser om arrangementer"
---

# Påminnelser om arrangementer

<div class="article-intro">

Påminnelser om arrangementer varsler automatisk rett personer før et arrangement starter -- for eksempel «Ikke gå glipp av det! Helsekurset starter i morgen kl. 09.00.» Du konfigurerer en påminnelse én gang på arrangementet, og B1 sender den ut til rett tid via pushvarsler, e-post og, hvis menigheten din har tekstmeldinger satt opp, SMS. Medlemmer kan styre hvilke påminnelser de får, fra sine egne [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett arrangementet du vil minne folk på (se [Opprette kalendere](creating-calendars))
- For å nå påmeldte deltakere må du [aktivere påmelding](creating-calendars) på arrangementet
- For å nå en hel gruppe må du sørge for at arrangementet tilhører en [gruppe](../groups/creating-groups) med medlemmer

</div>

## Sette opp en påminnelse

Du konfigurerer påminnelser i delen **Påminnelser** for arrangementet.

- Når du **oppretter et nytt arrangement**, utvider du delen **Påminnelser** i arrangementseditoren før du lagrer.
- For et **eksisterende arrangement** åpner du arrangementets side **Påmeldingsdetaljer** (fra delen **Påmeldinger**) for å legge til eller endre påminnelsen.

1. Slå på **Aktiver påminnelser**.
2. Velg **når** den skal sendes. Velg opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** og **Samme dag**.
3. Angi **klokkeslettet** påminnelsen skal sendes ut (standard er **09.00**, i menighetens [tidssone](../settings/church-settings.md#time-zone)).
4. Velg **hvem** som skal få påminnelsen (se [Hvem får påminnelsen](#who-gets-reminded) nedenfor).
5. Legg eventuelt til en **melding**. La den stå tom for å bruke standardteksten, eller skriv din egen -- du kan inkludere `{{eventTitle}}`, og det erstattes med arrangementets navn.
6. Velg **kanalene**: **Push**-varsling, **E-post** og, hvis menigheten din har en [leverandør for tekstmeldinger](../settings/church-settings.md#texting) koblet til, **Tekstmelding**.
7. Lagre arrangementet.

Mens du gjør endringer, viser en **direkte forhåndsvisning** omtrent hvor mange som vil få påminnelsen, hvor mange deltakere som ikke kan nås, og neste planlagte sendetidspunkter -- slik at du kan kontrollere at påminnelsen ser riktig ut før du lagrer.

## Hvem får påminnelsen

Innstillingen **Hvem** styrer hvem påminnelsen går til:

- **Kun påmeldte** -- Alle som er påmeldt arrangementet og er koblet til en personpost. Dette er standard når påmelding er aktivert for arrangementet, slik at en påminnelse for et lite påmeldt arrangement aldri ved en feil går til en hel gruppe.
- **Hoder / kun påmeldte** -- Én påminnelse per påmelding (personen som meldte seg på), i stedet for hvert familiemedlem på påmeldingen.
- **Gruppemedlemmer** -- Alle i arrangementets gruppe. Dette er standard når arrangementet ikke bruker påmelding.
- **Automatisk** -- Bruker påmeldte når påmelding er aktivert, ellers gruppen.

:::info
Gjester som bare er registrert med navn (uten koblet personpost), kan ikke få en påminnelse, fordi det ikke finnes noen konto, enhet eller e-postadresse å sende til. Forhåndsvisningen viser hvor mange deltakere som faller i denne gruppen, slik at det ikke kommer overraskelser. Medlemmer som har valgt bort kommunikasjon, hoppes også over.
:::

## Når påminnelser sendes

- Påminnelser sendes på **klokkeslettet du har valgt**, i menighetens lokale tidssone, på hvert av tidspunktene du har valgt.
- Hvis du **endrer datoen eller klokkeslettet** for arrangementet, planlegges ventende påminnelser automatisk på nytt -- du trenger ikke å redigere påminnelsen.
- Hvis du **sletter arrangementet** (eller avlyser en enkelt forekomst av et gjentakende arrangement), avbrytes dets ventende påminnelser automatisk.
- Gjentakende arrangementer håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **først som push, med e-post som reserve**. Hvis et medlem har pushvarsler aktivert, får de en push; hvis ikke, får de en e-post i stedet. Medlemmer velger hvilke kanaler de vil ha per varslingstype i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).
:::

## Tekstpåminnelser

Kanalen **Tekstmelding** vises bare når menigheten din har en leverandør for tekstmeldinger koblet til. Tekstmeldinger sendes via menighetens leverandør for tekstmeldinger, og hver melding kan koste menigheten penger. De sendes i tillegg til eventuelle push- eller e-postpåminnelser, og bare til personer som:

- Har slått på **Tekstmeldinger** i sine [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences), og
- Har et mobilnummer på profilen sin.

Hver tekstmelding begynner med menighetens navn, holdes innenfor én tekstmelding og avsluttes med «Svar STOPP for å melde deg av.» Den som svarer STOPP, slutter å motta tekstmeldinger fra menigheten din. For at STOPP-svar skal nå B1, limer du inn **URL for innkommende (STOPP) webhook** fra [innstillingene for tekstmeldinger](../settings/church-settings.md#texting) i innkommende meldings-webhook hos leverandøren din.

## Hva medlemmer kan styre

Påminnelser følger alltid hvert medlems [varslingsinnstillinger](../../b1-church/getting-started/notification-preferences). Et medlem kan:

- Slå **påminnelser om arrangementer** av for push, e-post eller tekst, mens andre varsler forblir på.
- Slå tekstpåminnelser av eller på med **Tekstmeldinger**.
- Angi **stille tid**, slik at ikke-hastende varsler venter til et rimelig tidspunkt.

Du kan ikke overstyre et medlems valg om å melde seg av påminnelser om arrangementer -- dette gjør at B1 følger reglene mot spam, og at medlemmene har kontroll over innboksen sin.

## Tjenestepåminnelser

Frivillige som er planlagt på en plan, får en egen **tjenestepåminnelse** med detaljene om planen, og når de ikke har svart ennå, knapper for **Godta / Avslå** rett i e-posten. Disse påminnelsene konfigureres på plantypen i stedet for på et kalenderarrangement, og kan også sendes som tekstmelding -- se [Påminnelser for frivillige](../serving/plans#volunteer-reminders) og [Søndagens frivillige](../guides/sunday-volunteers) for hvordan planlegging av frivillige og påminnelser fungerer.

## Neste steg

- [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences) -- Hva medlemmer kan styre
- [Veiledning for påmelding til arrangementer](../guides/event-registration) -- Sett opp påmelding slik at påminnelser kan nå deltakerne
- [Opprette kalendere](creating-calendars) -- Gå tilbake til oppsett av kalender
