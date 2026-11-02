---
title: "Forespørsler om å bli med i grupper"
---

# Forespørsler om å bli med i grupper

<div class="article-intro">

Når en gruppe er satt opp med en påmeldingsregel som krever godkjenning, kan folk sende forespørsler om å bli med. Gruppeledere og administratorer går gjennom disse forespørslene og godkjenner eller avslår dem. Dette gir kirken kontroll over gruppemedlemskap, samtidig som det er enkelt for folk å vise interesse for å bli med.

</div>

## Opplæringsvideo

<YouTube id="1vj-suCiIsE" title="Forespørsler om å bli med i grupper og gruppekalendere i B1" next="Sette opp gudstjenester og oppmøte i B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere grupper, eller du må være leder for den aktuelle gruppen. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Gruppen må ha påmeldingsregelen satt til **Forespørsel** (krever godkjenning). Se [Opprette grupper](./creating-groups.md) for hvordan du konfigurerer påmeldingsregler.

</div>

## Forstå påmeldingsregler

Grupper kan ha tre ulike påmeldingsregler:

- **Åpen** -- Alle kan bli med med en gang uten godkjenning
- **Forespørsel** -- Personer sender en forespørsel om å bli med som krever godkjenning
- **Lukket** -- Ingen kan be om å bli med (medlemmer må legges til manuelt)

Når en gruppe bruker regelen **Forespørsel**, går alle påmeldingsforsøk gjennom godkjenningsflyten som beskrives på denne siden.

## Se ventende forespørsler

### For gruppeledere

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) og velger **Personer > Grupper**
2. Klikk på gruppenavnet
3. Seksjonen **Medlemmer** viser hvor mange forespørsler som venter. Klikk **Alle medlemmer** -- ventende forespørsler for denne gruppen vises øverst i medlemslisten

### For administratorer

Administratorer med tillatelser til gruppeadministrasjon kan se ventende forespørsler på tvers av alle grupper:

1. I hurtigmenyen velger du **Personer > Grupper**
2. Klikk knappen **ventende forespørsler** i sidehodet (for eksempel «3 ventende forespørsler»). Den vises bare når det finnes forespørsler som venter.
3. Gjennomgå alle ventende forespørsler i hele kirken

## Gå gjennom en påmeldingsforespørsel

Hver påmeldingsforespørsel viser:

- **Personens navn og bilde** -- Personen som ber om å bli med
- **Valgfri melding** -- En personlig melding som forklarer hvorfor de vil bli med (hvis de har oppgitt en)
- **Forespørselsdato** -- Når forespørselen ble sendt inn

For å gå gjennom en forespørsel:

1. Les personens melding hvis de har sendt en
2. Klikk på personens navn for å se profilen deres ved behov
3. Bestem om du vil godkjenne eller avslå

## Godkjenne en forespørsel

1. Klikk **Godkjenn** på påmeldingsforespørselen
2. Personen legges umiddelbart til i gruppen som medlem
3. Den som sendte forespørselen får et varsel om at forespørselen er godkjent
4. Forespørselen markeres som godkjent i systemet

:::tip
Når du godkjenner en forespørsel, blir personen et vanlig gruppemedlem. Du kan senere forfremme dem til gruppeleder hvis det er nødvendig, fra siden [Gruppemedlemmer](./group-members.md).
:::

## Avslå en forespørsel

1. Klikk **Avslå** på påmeldingsforespørselen
2. Oppgi eventuelt en grunn til avslaget (opptil 500 tegn)
3. Klikk **Bekreft**
4. Den som sendte forespørselen får et varsel med avslagsgrunnen din (hvis du oppga en)
5. Forespørselen markeres som avslått

:::info
Å oppgi en grunn til avslaget hjelper personen å forstå hvorfor forespørselen ikke ble godkjent, og kan oppmuntre dem til å prøve igjen senere eller utforske andre grupper.
:::

## Godkjenne fra oppgavesiden {#approving-from-the-tasks-page}

Hver påmeldingsforespørsel oppretter også en oppgave under **Tjeneste &rarr; Mitt arbeid**, med tittelen «*Person* ba om å bli med i *Gruppe*». Den tildeles gruppens ledere. Hvis gruppen ikke har en leder ennå, går den til ansatte med tillatelsen **Gruppemedlemmer &gt; Rediger**, eller til kirkens domeneadministratorer hvis ingen har den tillatelsen. Ansatte og administratorer som får oppgaven på denne måten, får også et varsel som lenker direkte til den.

Når du åpner oppgaven, vises navnet til den som ber om å bli med, gruppen og den valgfrie meldingen, med knappene **Godkjenn** og **Avslå** rett på oppgavekortet (Avslå åpner samme valgfrie begrunnelsesfelt som beskrevet over). Dette gir ledere en andre, varselbasert måte å håndtere en forespørsel på, uten å åpne gruppens medlemsliste.

Når en forespørsel avgjøres fra enten stedet -- gruppens medlemsliste eller oppgavekortet -- lukkes den overalt, slik at ledere aldri ser en utdatert oppgave for en forespørsel som noen allerede har behandlet.

## Varsler

Systemet for påmeldingsforespørsler sender varsler automatisk:

- **Når en forespørsel sendes inn** -- Alle gruppens ledere får et varsel. Hvis gruppen ikke har noen leder, varsles i stedet ansatte eller administratorer som er tildelt oppgaven (se over).
- **Når en forespørsel godkjennes** -- Den som sendte forespørselen får en bekreftelse
- **Når en forespørsel avslås** -- Den som sendte forespørselen får et varsel med eventuell avslagsgrunn

Varsler vises i brukerens varslingssenter på B1.church og i mobilappen. I B1 Admins varselklokke åpner et klikk på et varsel om påmeldingsforespørsel (eller **Vis detaljer**) gruppen på kirkens B1.church-nettsted i en ny fane.

## Administrere forespørsler fra medlemssiden

Personer kan administrere sine egne påmeldingsforespørsler på B1.church:

- Se statusen på ventende forespørsler på gruppens detaljside
- Avbryt en ventende forespørsel hvis de ombestemmer seg
- Se om forespørselen deres ble godkjent eller avslått

## Beste praksis

- **Svar raskt** -- Prøv å gå gjennom forespørsler innen 24-48 timer, slik at ikke folk må vente unødig
- **Vær tydelig i avslagsgrunner** -- Hjelp folk å forstå neste steg eller alternative tilbud
- **Sjekk profiler** -- Gjennomgå personens profil for å se om de passer godt inn i gruppen
- **Kommuniser forventninger** -- Sørg for at gruppebeskrivelsen tydelig sier hvem gruppen er for

## Relaterte artikler

- [Opprette grupper](./creating-groups.md) -- Lær hvordan du setter opp grupper og konfigurerer påmeldingsregler
- [Gruppemedlemmer](./group-members.md) -- Administrer eksisterende gruppemedlemmer
- [Gruppekalender](./group-calendar.md) -- Planlegg gruppemøter og arrangementer
