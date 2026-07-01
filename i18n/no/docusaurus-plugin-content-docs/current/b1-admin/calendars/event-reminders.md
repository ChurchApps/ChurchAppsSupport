---
title: "Begivenhetspåminnelser"
---

# Begivenhetspåminnelser

<div class="article-intro">

Begivenhetspåminnelser varsler automatisk de riktige personene før en begivenhet inntreffer -- for eksempel "Ikke gå glipp av det! Helseverkstedet starter i morgen klokken 9:00 AM." Du konfigurerer en påminnelse en gang på begivenheten, og B1 sender den ut etter planen gjennom push-varslinger og e-post. Medlemmer kan kontrollere hvilke påminnelser de mottar fra sine egne [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Opprett begivenheten du vil minne mennesker på (se [Opprette kalendere](creating-calendars))
- For å nå registrerte deltakere, [aktiver registrering](creating-calendars) på begivenheten
- For å nå en hel gruppe, må du kontrollere at begivenheten tilhører en [gruppe](../groups/creating-groups) med medlemmer

</div>

## Konfigurering av en påminnelse

Du konfigurerer påminnelser i **Påminnelser**-seksjonen av begivenheten.

- Når du **oppretter en ny begivenhet**, utvid **Påminnelser**-seksjonen i begivenhetsredigereren før du lagrer.
- For en **eksisterende begivenhet**, åpne begivenhetens **Registreringsdetaljer**-side (fra **Registreringer**-seksjonen) for å legge til eller endre påminnelsen.

1. Slå på **Aktiver påminnelser**.
2. Velg **Når** du skal sende. Velg opptil tre tidspunkter: **7 dager før**, **3 dager før**, **1 dag før** og **Dag for**.
3. Angi **Tidspunkt på dagen** påminnelsen skal sendes (standard er **9:00 AM**, i kirkens lokale tidssone).
4. Velg **Hvem** som skal minnes (se [Hvem blir minnet](#who-gets-reminded) nedenfor).
5. Legg eventuelt til en **Melding**. La den stå blank for å bruke standardformuleringen, eller skriv din egen -- du kan inkludere `{{eventTitle}}` og det vil bli erstattet med begivenhetens navn.
6. Velg **Kanaler**: **Push**-varsling, **E-post** eller begge.
7. Lagre begivenheten.

Mens du gjør endringer, viser en **live forhåndsvisning** omtrent hvor mange mennesker som vil bli mintet, hvor mange deltakere som ikke kan nås, og de neste planlagte sendingene -- slik at du kan bekrefte at påminnelsen ser riktig ut før du lagrer.

## Hvem blir minnet

**Hvem**-innstillingen kontrollerer hvem påminnelsen skal til:

- **Bare registranter** -- Alle som er registrert for begivenheten og koblet til en personpost. Dette er standarden når begivenheten har registrering aktivert, slik at en påminnelse for en liten registrert begivenhet aldri ved et uhell går til en hel gruppe.
- **Hoveder / bare registranter** -- En påminnelse per registrering (personen som registrerte seg), i stedet for hvert familiemedlem på registreringen.
- **Gruppemedlemmer** -- Alle i begivenhetens gruppe. Dette er standarden når begivenheten ikke bruker registrering.
- **Auto** -- Bruker registranter når registrering er aktivert, ellers gruppen.

:::info
Gjester lagt til bare ved navn (uten en koblet personpost) kan ikke motta en påminnelse, fordi det ikke er noen konto, enhet eller e-post å sende til. Forhåndsvisningen forteller deg hvor mange deltakere som faller inn i denne kategorien slik at det ikke er overraskelser. Medlemmer som har avslått kommunikasjon er også hoppet over.
:::

## Når påminnelser sendes

- Påminnelser avfyres på **tidspunktet du velger**, i kirkens lokale tidssone, på hver av offsetene du valgte.
- Hvis du **endrer begivenhetens dato eller tid**, blir ventepåminnelsene automatisk omplanlagt -- du trenger ikke redigere påminnelsen.
- Hvis du **sletter begivenheten** (eller avbryter en enkelt forekomst av en tilbakevendende begivenhet), blir dens ventepåminnelser automatisk avbrutt.
- Tilbakevendende begivenheter håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **push først, med e-post som tilbakefall**. Hvis et medlem har push-varslinger aktivert, får de en push; hvis ikke, får de en e-post i stedet. Medlemmer velger hvilke kanaler de ønsker per varslingstype i deres [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences).
:::

## Hva medlemmer kan kontrollere

Påminnelser respekterer alltid hvert medlems [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences). Et medlem kan:

- Slå **Begivenhetspåminnelser** av for push eller e-post mens andre varslinger er på.
- Angi **stille timer** slik at ikke-haste varslinger venter til et rimelig tidspunkt.

Du kan ikke overstyre et medlems valg om å melde seg av begivenhetspåminnelser -- dette holder B1 i samsvar med spam-regler og holder medlemmer i kontroll over innboksen sin.

## Tjenestepåminnelser

Frivillige planlagt på en plan mottar en separat **tjenestepåminnelse** med plandetaljene og, når de ikke har svart ennå, **Godta / Avslå**-knapper rett i e-posten. Disse påminnelsene konfigureres på plantypen i stedet for på en kalenderbegivenhet -- se [Søndags frivillige](../guides/sunday-volunteers) for hvordan frivillplanlegging og påminnelser fungerer.

## Neste trinn

- [Varslingsinnstillinger](../../b1-church/getting-started/notification-preferences) -- Hva medlemmer kan kontrollere
- [Begivenhetregistreringsveiledning](../guides/event-registration) -- Sett opp registrering slik påminnelser kan nå deltakerne
- [Opprette kalendere](creating-calendars) -- Tilbake til kalenderoppsett
