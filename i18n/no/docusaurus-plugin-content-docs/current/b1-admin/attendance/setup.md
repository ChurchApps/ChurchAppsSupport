---
title: "Oppsett av oppmøte"
---

# Oppsett av oppmøte {#attendance-setup}

<div class="article-intro">

Før du kan følge oppmøte, må du fortelle B1 Admin om kirkens fysiske lokasjoner, når gudstjenestene holdes, og hvilke grupper som møtes på hver gudstjeneste. Dette engangsoppsettet oppretter strukturen som driver all oppfølging og rapportering av oppmøte i hele kirken.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Hvis du planlegger å knytte grupper til gudstjenestetider, må du først sørge for at [gruppene er opprettet](../groups/creating-groups.md).

</div>

## Viktige begreper {#key-concepts}

- **Campus** -- en fysisk lokasjon der kirken din møtes (for eksempel «Hovedcampus» eller «Nordcampus»). Campus administreres under **Innstillinger**.
- **Gudstjeneste** -- en gjentakende samling på et campus (for eksempel «Søndagsgudstjeneste» eller «Midtuke»).
- **Gudstjenestetid** -- et bestemt tidspunkt en gudstjeneste holdes (for eksempel «09.00», «11.00»).
- **Planlagt gruppe** -- en gruppe som er knyttet til en bestemt gudstjenestetid. Oppmøte følges i sammenheng med den gudstjenesten.
- **Uplanlagt gruppe** -- en gruppe som følger oppmøte på egen hånd, uten å være knyttet til en gudstjenestetid.

## Sette opp oppmøtestrukturen {#setting-up-your-attendance-structure}

1. Åpne **B1 Admin**, åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), og utvid **Personer**.
2. Klikk **Oppmøte**, og klikk deretter **Oppsett** i venstre kolonne. Tabellen **Gudstjenestestruktur** åpnes, med antall campus, gudstjenestetider og planlagte og uplanlagte grupper øverst.
3. Klikk **Administrer campus** (øverst til høyre i panelet **Gudstjenestestruktur**). Dette tar deg til **Innstillinger → Campus**. Klikk **Legg til campus**, skriv inn navnet på lokasjonen (adresse og tidssone er valgfritt), og klikk **Lagre**.
4. Gå tilbake til **Personer → Oppmøte** og klikk **Oppsett**. Campuset ditt vises nå i oppsettstabellen.
5. Klikk på **+-knappen i kolonnen Gudstjeneste** under campuset ditt. Skriv inn et navn på gudstjenesten, for eksempel «Søndagsgudstjeneste», og klikk **Lagre**.
6. Klikk på **+-knappen i kolonnen Tid** under gudstjenesten. Skriv inn et navn på **gudstjenestetiden**, for eksempel «09.00», fyll eventuelt ut [innsjekkingsplanen](#setting-a-check-in-schedule), og klikk **Lagre**. Gjenta for hver gudstjenestetid.
7. For å koble en gruppe til en gudstjenestetid åpner du gruppen fra **Personer > Grupper**, klikker **Rediger** og bruker **Legg til gudstjenestetid** -- se neste avsnitt.

### Aktivere Følg oppmøte for en gruppe {#enabling-track-attendance-on-a-group}

Før det kan registreres oppmøte for en gruppe, må **Følg oppmøte** være slått på for den gruppen.

1. I hurtigmenyen velger du **Personer > Grupper** og velger gruppen.
2. Klikk **Rediger**-knappen under gruppens navn.
3. Sett **Følg oppmøte** til **Ja**.
4. Klikk **Lagre**.

:::tip
Hvis du knyttet gruppen til en gudstjenestetid i forrige steg, bruker du også alternativet **Legg til gudstjenestetid** på redigeringssiden for gruppen for å koble den til riktig gudstjeneste. Dette sørger for at øktene kobles til riktig campus og tidspunkt.
:::

:::tip
Hvis en gruppe møtes utenom en vanlig gudstjeneste -- for eksempel en liten midtuke-gruppe som følger sitt eget oppmøte -- kan du la den være en uplanlagt gruppe. Den vises fortsatt i rapporten **Gruppeoppmøte**.
:::

## Sette en innsjekkingsplan {#setting-a-check-in-schedule}

Hver gudstjenestetid kan ha en valgfri innsjekkingsplan, slik at [selvinnsjekking](check-in.md) åpner og stenger av seg selv hver uke. Uten en plan er innsjekking for den gudstjenestetiden tilgjengelig til enhver tid (så lenge rommet ikke er stengt av andre grunner, for eksempel fordi det er fullt).

1. I visningen **Oppsett** klikker du på navnet til en gudstjenestetid i kolonnen **Tid** (eller legger til en ny).
2. Under **Innsjekkingsplan** velger du **Dag** i uken gudstjenestetiden holdes.
3. Angi **Starttid** og eventuelt **Sluttid**.
4. Skriv inn **Åpne innsjekking (minutter før start)** -- for eksempel `30` åpner innsjekkingen en halv time før gudstjenesten starter.
5. Skriv inn **Steng innsjekking (minutter etter slutt)** -- for eksempel `15` holder innsjekkingen åpen i 15 minutter etter sluttidspunktet. Hvis du ikke har angitt en sluttid, regnes dette fra starttiden.
6. Klikk **Lagre**.

Planen gjentas hver uke og måles i tidssonen til gudstjenestens campus. Hvis campuset ikke har en tidssone, brukes kirkens [tidssone](../settings/church-settings.md#time-zone) i stedet, deretter tidssonen til det første campuset som har en, og til slutt østlig tid (America/New_York). Hvis innsjekkingen åpnes på feil tidspunkt, kontroller **tidssonen** på campuset i [Campus](../settings/campuses.md). For å fjerne en plan setter du **Dag** tilbake til **Ingen plan** og klikker **Lagre**. En plan trer bare i kraft når både **Dag** og **Starttid** er angitt.

Mens innsjekkingsvinduet for en gudstjenestetid er stengt:

- **Selvinnsjekking på B1.church** viser den gudstjenestetiden som **Stengt** (eller for eksempel **Stengt · åpner søn 09.30**), og den kan ikke velges. Hvis ingen av en gudstjenestes tider er åpne, ser familier når innsjekkingen åpner, for eksempel «Innsjekking åpner søn 09.30».
- **Kioskappen B1 Checkin** viser også gudstjenestetiden som **Stengt**, med tidspunktet den åpner. Hvis alle tidene for en gudstjeneste er stengt, viser kiosken når innsjekkingen for gudstjenesten åpner. En person som allerede er sjekket inn på en stengt gudstjenestetid, vises i stedet med gruppen sin og **Innsjekket**. Hvis vinduet stenger midt i en innsjekking, fullfører ikke kiosken innsjekkingen og viser en skjerm **Kan ikke sjekke inn ennå** med rommet det gjelder, slik at familien kan velge et annet.

En husstand som allerede har sjekket inn til en tidligere gudstjenestetid, kan fortsatt komme tilbake og legge til en senere gudstjenestetid som er åpen, selv etter at vinduet for den tidligere har stengt. Eksisterende innsjekkinger beholdes.

:::tip
Sett et generøst åpningsvindu (for eksempel 45 minutter før start), slik at familier og frivillige som kommer tidlig, kan sjekke inn, og et kort stengevindu, slik at de som kommer for sent, fortsatt kan sjekke inn etter at gudstjenesten har startet.
:::

## Redigere oppsettet {#editing-your-setup}

Du kan oppdatere oppsettet når som helst. Velg et campus, en gudstjenestetid eller en gruppe og klikk **Rediger** for å endre detaljene, eller **Slett** for å fjerne den.

:::info
Hvis du fjerner en gudstjenestetid, slettes ikke tidligere oppmøteregistreringer. Historiske data bevares selv om du endrer planen din.
:::

## Hva skjer videre {#whats-next}

Når campus, gudstjenestetider og grupper er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt, eller sette opp [selvinnsjekking](check-in.md) for gudstjenestene dine.
