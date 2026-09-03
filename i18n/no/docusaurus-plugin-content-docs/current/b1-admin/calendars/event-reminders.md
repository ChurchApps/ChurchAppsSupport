---
title: "Arrangement-påminnelser"
---

# Arrangement-påminnelser

<div class="article-intro">

Arrangement-påminnelser varsler automatisk rett personer før et arrangement skjer -- for eksempel, "Ikke gå glipp av det! Helseworkshoppen starter i morgen klokken 09:00." Du konfigurerer en påminnelse på arrangementet, og B1 sender den ut etter planen via push-meldinger og e-post. Medlemmer kan kontrollere hvilke påminnelser de mottar fra sine egne [Varselsinnstillinger](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Opprett arrangementet du vil påminne folk om (se [Opprette kalendere](creating-calendars))
- For å nå påmeldte deltakere, [aktiver påmelding](creating-calendars) på arrangementet
- For å nå en hel gruppe, forsikre deg om at arrangementet tilhører en [gruppe](../groups/creating-groups) med medlemmer

</div>

## Oppsett av påminnelse

Du konfigurerer påminnelser i **Påminnelser**-seksjonen av arrangementet.

- Når du **oppretter et nytt arrangement**, utvid **Påminnelser**-seksjonen i arrangementseditoren før du lagrer.
- For et **eksisterende arrangement**, åpne arrangementets **Påmeldingsdetaljer**-side (fra **Påmeldinger**-seksjonen) for å legge til eller endre påminnelsen.

1. Slå på **Aktiver påminnelser**.
2. Velg **Når** du skal sende. Velg opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før**, og **Dagen før**.
3. Sett **Tidspunktet på dagen** påminnelsen skal sendes (standarden er **09:00**, i kirkens lokale tidssone).
4. Velg **Hvem** som skal påminnes (se [Hvem får påminnelser](#hvem-får-påminnelser) nedenfor).
5. Legg eventuelt til en **Melding**. La den stå tom for å bruke standardformuleringen, eller skriv din egen -- du kan inkludere `{{eventTitle}}` og den vil bli erstattet med arrangementets navn.
6. Velg **Kanaler**: **Push**-melding, **E-post**, eller begge.
7. Lagre arrangementet.

Mens du gjør endringer, viser en **direkte forhåndsvisning** omtrent hvor mange mennesker som vil bli påminnet, hvor mange deltakere som ikke kan nås, og neste planlagte sendingstider -- slik at du kan bekrefte at påminnelsen ser riktig ut før du lagrer.

## Hvem får påminnelser

**Hvem**-innstillingen kontrollerer hvem påminnelsen går til:

- **Bare påmeldte** -- Alle som er påmeldt arrangementet og er knyttet til en personpost. Dette er standarden når arrangementet har påmelding aktivert, så en påminnelse for et lite påmeldt arrangement aldri sender til en hel gruppe ved et uhell.
- **Bare husfedre/påmeldte** -- En påminnelse per påmelding (personen som registrerte seg), i stedet for hvert familiemedlem på påmeldingen.
- **Gruppemedlemmer** -- Alle i arrangementets gruppe. Dette er standarden når arrangementet ikke bruker påmelding.
- **Automatisk** -- Bruker påmeldte når påmelding er aktivert, ellers gruppen.

:::info
Gjester som bare er lagt til etter navn (uten en knyttet personpost) kan ikke motta en påminnelse, fordi det ikke finnes en konto, enhet eller e-post å sende til. Forhåndsvisningen forteller deg hvor mange deltakere som faller inn i denne gruppen slik at det ikke er overraskelser. Medlemmer som har valgt bort kommunikasjon hoppes også over.
:::

## Når påminnelser sendes

- Påminnelser sendes på **tidspunktet du velger**, i kirkens lokale tidssone, på hver av forskyvningene du valgte.
- Hvis du **endrer arrangementets dato eller klokkeslett**, blir ventende påminnelser automatisk omplanlagt -- du trenger ikke å redigere påminnelsen.
- Hvis du **sletter arrangementet** (eller kansellerer en enkelt forekomst av et tilbakevendende arrangement), blir dets ventende påminnelser automatisk kansellert.
- Tilbakevendende arrangementer håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **push først, med e-post som reserve**. Hvis et medlem har push-meldinger aktivert, får de en push; hvis ikke, får de en e-post i stedet. Medlemmer velger hvilke kanaler de vil ha per varseltype i deres [Varselsinnstillinger](../../b1-church/getting-started/notification-preferences).
:::

## Hva medlemmer kan kontrollere

Påminnelser respekterer alltid hvert medlems [Varselsinnstillinger](../../b1-church/getting-started/notification-preferences). Et medlem kan:

- Slå **Arrangement-påminnelser** av for push eller e-post mens andre varslinger holdes på.
- Sette **stille timer** slik at ikke-kritiske meldinger venter til en fornuftig tid.

Du kan ikke åsidosette et medlems valg om å velge bort arrangement-påminnelser -- dette holder B1 kompatibel med antispam-regler og holder medlemmer kontroll over innboksen sin.

## Frivillig-påminnelser

Frivillige som er planlagt på en plan mottar en separat **frivillig-påminnelse** med plandetaljer og, når de ikke har svart ennå, **Godta / Avslå**-knapper rett i e-posten. Disse påminnelsene er konfigurert på plantypene i stedet for på et arrangementskalender -- se [Søndagsfribilige](../guides/sunday-volunteers) for hvordan frivilligniste-planlegging og påminnelser fungerer.

## Neste trinn

- [Varselsinnstillinger](../../b1-church/getting-started/notification-preferences) -- Hva medlemmer kan kontrollere
- [Arrangementsregistrering-guide](../guides/event-registration) -- Sett opp påmelding slik påminnelser kan nå deltakere
- [Opprette kalendere](creating-calendars) -- Tilbake til kalenderoppsett
