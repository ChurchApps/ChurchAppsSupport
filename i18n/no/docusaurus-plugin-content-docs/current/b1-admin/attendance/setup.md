---
title: "Oppsett for oppmøte"
description: "Sett opp campuser, gudstjenester, gudstjenestetider og gruppetilknytninger i B1 Admin, slik at oppmøtesporing og innsjekkplaner fungerer i hele menigheten."
---

# Oppsett for oppmøte

<div class="article-intro">

Før du kan følge oppmøte, må du fortelle B1 Admin hvor kirken din har sine fysiske lokaler, når gudstjenestene holdes, og hvilke grupper som samles på hver gudstjeneste. Dette engangsoppsettet oppretter strukturen som driver all oppmøteregistrering og -rapportering i hele kirken.

</div>

## Opplæringsvideo

<YouTube id="LQPc2gVlXvQ" title="Sette opp gudstjenester og oppmøte i B1" next="Sette opp barnas innsjekking i B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelsen **Rediger gudstjenester** for oppmøte. Alternativet **Oppsett** vises bare for personer som har den -- det er ikke nok å kunne se oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Hvis du planlegger å knytte grupper til gudstjenestetider, må du først sørge for at [gruppene er opprettet](../groups/creating-groups.md).

</div>

## Nøkkelbegreper

- **Kirkested** -- et fysisk sted der kirken din samles (f.eks. «Hovedkirkested», «Nordre kirkested»). Kirkesteder administreres under **Innstillinger**.
- **Gudstjeneste** -- en gjentakende samling på et kirkested (f.eks. «Søndagsgudstjeneste», «Midtukesamling»).
- **Gudstjenestetid** -- et bestemt tidspunkt en gudstjeneste holdes (f.eks. «09.00», «11.00»).
- **Planlagt gruppe** -- en gruppe som er knyttet til en bestemt gudstjenestetid. Oppmøte følges i sammenheng med den gudstjenesten.
- **Ikke-planlagt gruppe** -- en gruppe som følger sitt eget oppmøte, uten å være knyttet til en gudstjenestetid.

## Sette opp oppmøtestrukturen

1. Åpne **B1 Admin**, åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), og utvid **Personer**.
2. Klikk **Oppmøte**, og klikk deretter **Oppsett** i venstre kolonne. Tabellen **Gudstjenesteoppsett** åpnes, med antall kirkesteder, gudstjenestetider og planlagte og ikke-planlagte grupper øverst. Tallene oppdateres så snart du legger til, redigerer eller fjerner noe i tabellen.
3. Klikk **Administrer kirkesteder** (øverst til høyre i panelet **Gudstjenesteoppsett**). Dette tar deg til **Innstillinger → Kirkesteder**. Klikk **Legg til kirkested**, skriv inn navnet på stedet ditt (adresse og tidssone er valgfrie), og klikk **Lagre**.
4. Gå tilbake til **Personer → Oppmøte** og klikk **Oppsett**. Kirkestedet ditt vises nå i oppsettstabellen.
5. Klikk på **+-knappen i kolonnen Gudstjeneste** under kirkestedet ditt. Skriv inn et gudstjenestenavn, for eksempel «Søndagsgudstjeneste», og klikk **Lagre**.
6. Klikk på **+-knappen i kolonnen Tid** under gudstjenesten. Skriv inn et navn på **gudstjenestetiden**, for eksempel «09.00», fyll eventuelt ut [innsjekkingsplanen](#setting-a-check-in-schedule), og klikk **Lagre**. Gjenta for hver gudstjenestetid.
7. For å knytte en gruppe til en gudstjenestetid åpner du gruppen fra **Personer > Grupper**, klikker **Rediger** og bruker **Legg til gudstjenestetid** -- se neste avsnitt.

### Aktivere Følg oppmøte for en gruppe

Før det kan registreres oppmøte for en gruppe, må **Følg oppmøte** være slått på for den gruppen.

1. I hurtigmenyen velger du **Personer > Grupper** og velger gruppen.
2. Klikk knappen **Rediger** under gruppens navn.
3. Sett **Følg oppmøte** til **Ja**.
4. Klikk **Lagre**.

:::tip
Hvis du knyttet gruppen til en gudstjenestetid i forrige steg, bruker du også alternativet **Legg til gudstjenestetid** på gruppens redigeringsside for å koble den til riktig gudstjeneste. Dette sikrer at øktene er koblet til riktig kirkested og tidspunkt.
:::

:::tip
Hvis en gruppe samles utenfor en vanlig gudstjeneste -- for eksempel en smågruppe midt i uken som følger sitt eget oppmøte -- kan du la den være en ikke-planlagt gruppe. Den vil fortsatt vises i rapporten **Gruppeoppmøte** for oppmøterapportering.
:::

## Sette en innsjekkingsplan {#setting-a-check-in-schedule}

Hver gudstjenestetid kan ha en valgfri innsjekkingsplan, slik at [selvinnsjekking](check-in.md) åpner og stenger av seg selv hver uke. Uten en plan er innsjekking for den gudstjenestetiden tilgjengelig til enhver tid (så lenge rommet ikke er stengt av andre grunner, for eksempel fordi det er fullt).

1. I visningen **Oppsett** klikker du på navnet til en gudstjenestetid i kolonnen **Tid** (eller legger til en ny).
2. Under **Innsjekkingsplan** velger du **Dag** i uken gudstjenestetiden holdes.
3. Sett **Starttid** og eventuelt **Sluttid**.
4. Skriv inn **Åpne innsjekking (minutter før start)** -- for eksempel `30` for å åpne innsjekkingen en halvtime før gudstjenesten starter.
5. Skriv inn **Steng innsjekking (minutter etter slutt)** -- for eksempel `15` for å holde innsjekkingen åpen i 15 minutter etter sluttidspunktet. Hvis du ikke har satt en sluttid, telles dette fra starttidspunktet.
6. Klikk **Lagre**.

Planen gjentas hver uke og måles i tidssonen til gudstjenestens kirkested. Hvis dette kirkestedet ikke har en tidssone, brukes kirkens [tidssone](../settings/church-settings.md#time-zone) i stedet, deretter tidssonen til ditt første kirkested som har en, og til slutt østlig tid (America/New_York). Hvis innsjekkingen åpner til feil tid, kontrollerer du **tidssonen** på kirkestedet under [Kirkesteder](../settings/campuses.md). For å fjerne en plan setter du **Dag** tilbake til **Ingen plan** og klikker **Lagre**. En plan trer bare i kraft når både **Dag** og **Starttid** er satt.

Mens innsjekkingsvinduet for en gudstjenestetid er stengt:

- **Selvinnsjekking på B1.church** viser gudstjenestetiden som **Stengt** (eller for eksempel **Stengt · åpner søn 09.30**), og den kan ikke velges. Hvis ingen av gudstjenestens tider er åpne, ser familier når innsjekkingen åpner, for eksempel «Innsjekking åpner søn 09.30».
- **B1 Checkin-kiosken** viser også gudstjenestetiden som **Stengt**, med når den åpner. Hvis alle tider for en gudstjeneste er stengt, forteller kiosken når innsjekkingen for den gudstjenesten åpner. Noen som allerede er sjekket inn på en stengt gudstjenestetid, vises i stedet med gruppen sin som **Innsjekket**. Hvis et vindu stenger midt i en innsjekking, fullfører ikke kiosken innsjekkingen, og viser en skjerm for **Kan ikke sjekke inn ennå** med rommet det gjelder, slik at familien kan velge et annet.

En husstand som allerede har sjekket inn til en tidligere gudstjenestetid, kan fortsatt komme tilbake og legge til en senere gudstjenestetid som er åpen, selv etter at det tidligere vinduet er stengt. Eksisterende innsjekkinger beholdes.

:::tip
Sett et romslig åpningsvindu (for eksempel 45 minutter før start), slik at familier og frivillige som kommer tidlig kan sjekke inn, og et kort stengingsvindu, slik at sent ankomne fortsatt kan sjekke inn når gudstjenesten har startet.
:::

## Redigere oppsettet ditt

Du kan oppdatere oppsettet når som helst. Velg et kirkested, en gudstjenestetid eller en gruppe og klikk **Rediger** for å endre detaljene, eller **Slett** for å fjerne den.

:::info
Å fjerne en gudstjenestetid sletter ikke tidligere oppmøteregistreringer. Historikken din beholdes selv om du endrer planen.
:::

## Hva er neste steg

Når kirkesteder, gudstjenestetider og grupper er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt eller sette opp [selvinnsjekking](check-in.md) for gudstjenestene dine.
