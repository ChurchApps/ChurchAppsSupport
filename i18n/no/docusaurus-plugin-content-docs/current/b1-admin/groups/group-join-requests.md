---
title: "Påmeldingsforespørsler til grupper"
---

# Påmeldingsforespørsler til grupper

<div class="article-intro">

Når en gruppe er konfigurert med en påmeldingsregel som krever godkjenning, kan folk sende forespørsler om å bli med. Gruppeledere og administratorer gjennomgår disse forespørslene og godkjenner eller avslår dem. Dette gir kirken kontroll over gruppemedlemskap, samtidig som det er enkelt for folk å vise interesse for å bli med.

</div>

## Opplæringsvideo

<YouTube id="1vj-suCiIsE" title="Påmeldingsforespørsler og gruppekalendere i B1" next="Sette opp gudstjenester og oppmøte i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere grupper, eller du må være leder for den aktuelle gruppen. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Gruppen må ha påmeldingsregelen satt til **Forespørsel** (krever godkjenning). Se [Opprette grupper](./creating-groups.md) for hvordan du konfigurerer påmeldingsregler.

</div>

## Forstå påmeldingsregler

Grupper kan ha tre ulike påmeldingsregler:

- **Åpen** — alle kan bli med umiddelbart uten godkjenning
- **Forespørsel** — personer sender en påmeldingsforespørsel som krever godkjenning
- **Lukket** — ingen kan be om å bli med (medlemmer må legges til manuelt)

Når en gruppe bruker regelen **Forespørsel**, går alle påmeldingsforsøk gjennom godkjenningsflyten som beskrives på denne siden.

## Se ventende forespørsler

### For gruppeledere

1. I B1 Admin åpner du [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) og velger **Personer > Grupper**
2. Klikk på gruppens navn
3. Delen **Medlemmer** viser hvor mange forespørsler som venter. Klikk **Alle medlemmer** — ventende forespørsler for denne gruppen vises øverst i medlemslisten

### For administratorer

Administratorer med tillatelse til gruppeadministrasjon kan se ventende forespørsler på tvers av alle grupper:

1. I hurtigmenyen velger du **Personer > Grupper**
2. Klikk knappen **ventende forespørsler** i sidehodet (for eksempel «3 ventende forespørsler»). Den vises kun når det finnes forespørsler som venter.
3. Gjennomgå alle ventende forespørsler i hele kirken

## Gjennomgå en påmeldingsforespørsel

Hver påmeldingsforespørsel viser:

- **Personens navn og bilde** — personen som ber om å bli med
- **Valgfri melding** — en personlig melding som forklarer hvorfor de vil bli med (hvis oppgitt)
- **Forespørselsdato** — når forespørselen ble sendt

Slik gjennomgår du en forespørsel:

1. Les personens melding hvis de har oppgitt en
2. Klikk på personens navn for å se profilen deres ved behov
3. Avgjør om du vil godkjenne eller avslå

## Godkjenne en forespørsel

1. Klikk **Godkjenn** på påmeldingsforespørselen
2. Personen legges umiddelbart til i gruppen som medlem
3. Den som ba om å bli med, får et varsel om at forespørselen er godkjent
4. Forespørselen merkes som godkjent i systemet

:::tip
Når du godkjenner en forespørsel, blir personen et vanlig gruppemedlem. Du kan senere gjøre dem til gruppeleder ved behov fra siden [Gruppemedlemmer](./group-members.md).
:::

## Avslå en forespørsel

1. Klikk **Avslå** på påmeldingsforespørselen
2. Oppgi eventuelt en grunn til avslaget (opptil 500 tegn)
3. Klikk **Bekreft**
4. Den som ba om å bli med, får et varsel med avslagsgrunnen din (hvis oppgitt)
5. Forespørselen merkes som avslått

:::info
Å oppgi en avslagsgrunn hjelper personen å forstå hvorfor forespørselen ikke ble godkjent, og kan oppmuntre dem til å prøve igjen senere eller utforske andre grupper.
:::

## Godkjenne fra oppgavesiden

Hver påmeldingsforespørsel oppretter også en oppgave under **Tjeneste &rarr; Mitt arbeid**, med tittelen «*Person* ba om å bli med i *Gruppe*». Den tildeles gruppens ledere. Hvis gruppen ennå ikke har en leder, går den til alle ansatte med tillatelsen **Gruppemedlemmer &gt; Rediger**, eller til kirkens domeneadministratorer hvis ingen har den tillatelsen. Ansatte og administratorer som får oppgaven på denne måten, får også et varsel som lenker direkte til den.

Når du åpner oppgaven, vises personens navn, gruppen og deres valgfrie melding, med knappene **Godkjenn** og **Avslå** rett på oppgavekortet (Avslå åpner det samme valgfrie feltet for grunn som beskrevet over). Dette gir ledere en andre, varselbasert måte å håndtere en forespørsel på uten å åpne gruppens medlemsliste.

Når en forespørsel avgjøres enten fra gruppens medlemsliste eller fra oppgavekortet, lukkes den overalt, slik at ledere aldri ser en utdatert oppgave for en forespørsel som noen allerede har håndtert.

## Varsler

Påmeldingssystemet sender automatisk varsler:

- **Når en forespørsel sendes inn** — alle gruppens ledere får et varsel. Hvis gruppen ikke har en leder, får i stedet de ansatte eller administratorene som er tildelt oppgaven, et varsel (se over).
- **Når en forespørsel godkjennes** — den som ba om å bli med, får en bekreftelse
- **Når en forespørsel avslås** — den som ba om å bli med, får et varsel med eventuell avslagsgrunn

Varsler vises i brukerens varslingssenter på B1.church og i mobilappen. I B1 Admins varselklokke åpner et klikk på et påmeldingsvarsel (eller **Vis detaljer**) gruppen på kirkens B1.church-side i en ny fane.

## Håndtere forespørsler fra medlemssiden

Personer kan administrere sine egne påmeldingsforespørsler fra B1.church:

- Se statusen til ventende forespørsler på gruppens detaljside
- Avbryt en ventende forespørsel hvis de ombestemmer seg
- Se om forespørselen deres er godkjent eller avslått

## Beste praksis

- **Svar raskt** — prøv å gjennomgå forespørsler innen 24–48 timer, slik at folk ikke må vente
- **Vær tydelig i avslagsgrunner** — hjelp folk å forstå neste steg eller alternative muligheter
- **Sjekk profiler** — gjennomgå personens profil for å se om de passer godt til gruppen
- **Kommuniser forventninger** — sørg for at gruppebeskrivelsen tydelig sier hvem gruppen er for

## Relaterte artikler

- [Opprette grupper](./creating-groups.md) — lær å sette opp grupper og konfigurere påmeldingsregler
- [Gruppemedlemmer](./group-members.md) — administrer eksisterende gruppemedlemmer
- [Gruppekalender](./group-calendar.md) — planlegg gruppemøter og hendelser
