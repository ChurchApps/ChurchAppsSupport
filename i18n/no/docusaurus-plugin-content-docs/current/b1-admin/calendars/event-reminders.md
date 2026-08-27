---
title: "Hendelses påminnelser"
---

# Hendelses påminnelser

<div class="article-intro">

Hendelses påminnelser varsler automatisk riktige mennesker før en hendelse skjer -- for eksempel, "Ikke gå glipp! Helsetjenester workshop starter i morgen klokken 9:00 AM." Du konfigurerer en påminnelse en gang på hendelsen, og B1 sender den ut på planen gjennom push-varsler og e-post. Medlemmer kan kontrollere hvilke påminnelser de mottar fra sin egen [Varslings innstillinger](../../b1-church/getting-started/notification-preferences).

</div>

<div class="prereqs">
<h4>Før du starter</h4>

- Opprett hendelsen du vil minde mennesker om (se [Opprett kalendere](creating-calendars))
- For å nå registrerte deltakere, [aktiver registrering](creating-calenders) på hendelsen
- For å nå en hele gruppe, kontroller at hendelsen tilhører en [gruppe](../groups/creating-groups) med medlemmer

</div>

## Oppsett av en påminnelse

Du konfigurerer påminnelser i **Påminnelser**-delen av hendelsen.

- Når du **oppretter en ny hendelse**, utvid **Påminnelser**-delen i hendelses-redigeringsprogrammet før du lagrer.
- For en **eksisterende hendelse**, åpne hendelses **Registrerings detalj**-siden (fra **Registreringer**-delen) for å legge til eller endre påminnelsen.

1. Slå på **Aktiver påminnelser**.
2. Velg **Når** skal sendes. Velg opptil tre timinger: **7 dager før**, **3 dager før**, **1 dag før**, og **Dag av**.
3. Sett **Tid på dagen** påminnelsen skal gå ut (standard er **9:00 AM**, i kirkens lokale tidssone).
4. Velg **Hvem** som skal mindes (se [Hvem får påminnelser](#hvem-får-påminnelser) nedenfor).
5. Legg valgfritt til en **Melding**. La stå blank for å bruke standardformuleringen, eller skriv din egen -- du kan inkludere `{{eventTitle}}` og det vil bli erstattet med hendelsenavn.
6. Velg **Kanaler**: **Push** varsel, **E-post**, eller begge.
7. Lagre hendelsen.

Når du gjør endringer, viser en **live forhåndsvisning** omtrent hvor mange mennesker som vil bli påmint, hvor mange deltakere som ikke kan nås, og de neste planlagte sendingstidene -- slik at du kan bekrefte at påminnelsen ser riktig ut før du lagrer.

## Hvem får påminnelser

**Hvem**-innstillingen kontrollerer hvem påminnelsen går til:

- **Registranter bare** -- Alle registrert for hendelsen som er knyttet til en personpost. Dette er standard når hendelsen har registrering aktivert, så en påminnelse for en liten registrert hendelse aldri går til en hele gruppe av uhell.
- **Hoder / registranter bare** -- En påminnelse per registrering (personen som registrerte), i stedet for hver familjemedlem på registreringen.
- **Gruppememlemmer** -- Alle i hendelsens gruppe. Dette er standard når hendelsen ikke bruker registrering.
- **Auto** -- Bruker registranter når registrering er aktivert, ellers gruppen.

:::info
Gjester lagt til med navn bare (uten en knyttet personpost) kan ikke motta en påminnelse, fordi det er ingen konto, enhet eller e-post å sende til. Forhåndsvisningen forteller deg hvor mange deltakere som faller inn i denne gruppen slik at det ikke er noen overraskelser. Medlemmer som har valgt fra kommunikasjon blir også hoppet over.
:::

## Når påminnelser blir sendt

- Påminnelser sendes på **tid på dagen du velger**, i kirkens lokale tidssone, på hver av offsetene du valgte.
- Hvis du **endrer hendelses dato eller tid**, blir de ventende påminnelsene automatisk omplanlagt -- du trenger ikke redigere påminnelsen.
- Hvis du **sletter hendelsen** (eller avbryter en enkelt forekomst av en gjentakende hendelse), blir dens ventende påminnelser automatisk avbrutt.
- Gjentakende hendelser håndteres automatisk: hver kommende forekomst får sin egen påminnelse.

:::tip
Påminnelser sendes **push først, med e-post som en fallback**. Hvis et medlem har push-varsler aktivert, får de en push; hvis ikke, får de en e-post i stedet. Medlemmer velger hvilke kanaler de vil ha per varseltype i sin [Varslings innstillinger](../../b1-church/getting-started/notification-preferences).
:::

## Hva medlemmer kan kontrollere

Påminnelser respekterer alltid hvert medlems [Varslings innstillinger](../../b1-church/getting-started/notification-preferences). Et medlem kan:

- Slå av **Hendelses påminnelser** for push eller e-post mens du holder andre varsler på.
- Sett **stille timer** slik at ikke-haster varsler venter til en rimelig tid.

Du kan ikke overstyre et medlems valg for å melde seg av hendelses påminnelser -- dette holder B1 i samsvar med anti-spam-regler og holder medlemmer i kontroll over innboksen.

## Betjening av påminnelser

Frivillige planlagt på en plan mottar en separat **betjening påminnelse** med planedetaljene og, når de ikke har svart ennå, **Godta / Avslå**-knapper rett i e-posten. De påminnelsene er konfigurert på plantypen i stedet for på en kalender hendelse -- se [Søndag frivillige](../guides/sunday-volunteers) for hvordan frivillig planlegging og påminnelser fungerer.

## Neste steg

- [Varslings innstillinger](../../b1-church/getting-started/notification-preferences) -- Hva medlemmer kan kontrollere
- [Hendelses registrering veiledning](../guides/event-registration) -- Sett opp registrering slik at påminnelser kan nå deltakere
- [Opprett kalendere](creating-calendars) -- Returner til kalender oppsett
