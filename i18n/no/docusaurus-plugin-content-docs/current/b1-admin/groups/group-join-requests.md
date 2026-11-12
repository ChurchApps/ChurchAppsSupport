---
title: "Forespørsler om å bli med i grupper"
description: "Gjennomgå, godkjenn eller avslå forespørsler om å bli med i en gruppe i B1 Admin, finn ventende forespørsler som leder eller administrator, og legg til en begrunnelse ved avslag."
---

# Forespørsler om å bli med i grupper

<div class="article-intro">

Når en gruppe er satt opp med en påmeldingspolicy som krever godkjenning, kan folk sende inn forespørsler om å bli med. Gruppeledere og administratorer gjennomgår disse forespørslene og godkjenner eller avslår dem. Dette gir menigheten kontroll over gruppemedlemskap, samtidig som det er enkelt for folk å vise interesse for å bli med.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="1vj-suCiIsE" title="Group Join Requests and Group Calendars in B1" next="Setting Up Services and Attendance in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere grupper, eller du må være leder for den bestemte gruppen. Se [Roller og tillatelser](../people/roles-permissions.md) for detaljer.
- Gruppen må ha påmeldingspolicyen satt til **Request** (krever godkjenning). Se [Opprette grupper](./creating-groups.md) for hvordan du konfigurerer påmeldingspolicyer.

</div>

## Forstå påmeldingspolicyer {#understanding-join-policies}

Grupper kan ha tre ulike påmeldingspolicyer:

- **Open** – alle kan bli med umiddelbart uten godkjenning
- **Request** – folk sender inn en forespørsel om å bli med, som krever godkjenning
- **Closed** – ingen kan be om å bli med (medlemmer må legges til manuelt)

Når en gruppe bruker policyen **Request**, går alle påmeldingsforsøk gjennom godkjenningsprosessen som beskrives på denne siden.

## Se ventende forespørsler {#viewing-pending-requests}

### For gruppeledere {#for-group-leaders}

1. I B1 Admin åpner du [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) og velger **People > Groups**
2. Klikk på gruppenavnet
3. Seksjonen **Members** viser hvor mange forespørsler som venter (for eksempel «1 pending»). Klikk **All members** – ventende forespørsler for denne gruppen vises under **Pending Requests** øverst i medlemslisten

### For administratorer {#for-administrators}

Administratorer med tillatelser til å administrere grupper kan se ventende forespørsler på tvers av alle grupper:

1. I hurtigmenyen velger du **People > Groups**
2. Klikk knappen **pending requests** i sidetoppen (for eksempel «3 pending requests»). Den vises bare når det finnes forespørsler som venter.
3. Siden **Pending Join Requests** lister alle ventende forespørsler i hele menigheten, med gruppen personen ønsker å bli med i ved siden av navnet. Klikk **Groups** øverst på siden for å gå tilbake. Når ingenting venter, viser siden **No pending requests.**

## Gjennomgå en forespørsel om å bli med {#reviewing-a-join-request}

Hver forespørsel viser:

- **Personens navn og bilde** – personen som ber om å bli med (og på siden for hele menigheten, gruppen)
- **Valgfri melding** – en personlig melding som forklarer hvorfor de vil bli med (hvis den er oppgitt)
- **Forespørselsdato** – når forespørselen ble sendt inn

For å gjennomgå en forespørsel:

1. Les personens melding hvis de har lagt til en
2. Klikk på personens navn for å åpne profilen hvis du trenger det
3. Bestem deg for om du vil godkjenne eller avslå

## Godkjenne en forespørsel {#approving-a-request}

1. Klikk **Approve** på forespørselen om å bli med
2. Personen legges umiddelbart til i gruppen som medlem, og forespørselen forsvinner fra listen
3. Den som ba om å bli med, får et varsel om at forespørselen er godkjent
4. Forespørselen merkes som godkjent i systemet

:::tip
Når du godkjenner en forespørsel, blir personen et vanlig gruppemedlem. Du kan senere forfremme dem til gruppeleder ved behov fra siden [Gruppemedlemmer](./group-members.md).
:::

## Avslå en forespørsel {#declining-a-request}

1. Klikk **Decline** på forespørselen om å bli med
2. I dialogen **Decline Request** skriver du eventuelt inn en **Reason (optional)** (opptil 500 tegn)
3. Klikk **Decline**
4. Den som ba om å bli med, får et varsel med begrunnelsen for avslaget (hvis du oppga en)
5. Forespørselen merkes som avslått

:::info
En begrunnelse for avslaget hjelper personen å forstå hvorfor forespørselen ikke ble godkjent, og kan oppmuntre dem til å prøve igjen senere eller utforske andre grupper.
:::

## Godkjenne fra oppgavesiden {#approving-from-the-tasks-page}

Hver forespørsel om å bli med oppretter også en oppgave under **Serving &rarr; My Work**, med tittelen «*Person* requested to join *Group*.» Den er tildelt gruppens ledere. Hvis gruppen ikke har en leder ennå, går den til ansatte med tillatelsen **Group Members &gt; Edit**, eller til menighetens domeneadministratorer hvis ingen har den tillatelsen. Ansatte og administratorer som får oppgaven på denne måten, får også et varsel som lenker direkte til den.

Når du åpner oppgaven, vises navnet til den som ber om å bli med, gruppen og deres eventuelle melding, med knappene **Approve** og **Decline** rett på oppgavekortet (Decline åpner det samme valgfrie begrunnelsesfeltet som beskrevet ovenfor). Dette gir ledere en andre måte å handle på en forespørsel, drevet av varsler, uten å åpne gruppens medlemsliste.

Når du avgjør en forespørsel fra enten stedet – gruppens medlemsliste eller oppgavekortet – lukkes den overalt, slik at ledere aldri ser en utdatert oppgave for en forespørsel som noen allerede har behandlet.

## Varsler {#notifications}

Systemet for forespørsler om å bli med sender automatisk varsler:

- **Når en forespørsel sendes inn** – alle gruppens ledere får et varsel. Hvis gruppen ikke har noen leder, får i stedet ansatte eller administratorer som er tildelt oppgaven, et varsel (se ovenfor).
- **Når en forespørsel godkjennes** – den som ba om å bli med, får en bekreftelse
- **Når en forespørsel avslås** – den som ba om å bli med, får et varsel med eventuell begrunnelse for avslaget

Varsler vises i brukerens varslingssenter på B1.church og i mobilappen. I varselklokken i B1 Admin åpner et klikk på et varsel om forespørsel om å bli med (eller **View Details**) gruppen på menighetens B1.church-nettsted i en ny fane.

## Administrere forespørsler fra medlemssiden {#managing-requests-from-the-member-side}

Folk kan administrere sine egne forespørsler om å bli med fra B1.church:

- Se statusen på sine ventende forespørsler på gruppens detaljside
- Avbryt en ventende forespørsel hvis de ombestemmer seg
- Se om forespørselen deres ble godkjent eller avslått

## Beste praksis {#best-practices}

- **Svar raskt** – prøv å gjennomgå forespørsler innen 24–48 timer, slik at folk ikke må vente
- **Vær tydelig i begrunnelser for avslag** – hjelp folk å forstå neste steg eller alternative muligheter
- **Sjekk profiler** – gå gjennom personens profil for å se om de passer til gruppen
- **Kommuniser forventninger** – sørg for at gruppebeskrivelsen tydelig sier hvem gruppen er for

## Relaterte artikler {#related-articles}

- [Opprette grupper](./creating-groups.md) – lær hvordan du setter opp grupper og konfigurerer påmeldingspolicyer
- [Gruppemedlemmer](./group-members.md) – administrer eksisterende gruppemedlemmer
- [Gruppekalender](./group-calendar.md) – planlegg gruppemøter og hendelser
