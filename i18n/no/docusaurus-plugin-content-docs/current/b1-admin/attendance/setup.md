---
title: "Oppmøteoppsett"
---

# Oppmøteoppsett

<div class="article-intro">

Før du kan følge oppmøte, må du fortelle B1 Admin om menighetens fysiske steder, når gudstjenestene holdes, og hvilke grupper som møtes på hver gudstjeneste. Dette engangsoppsettet oppretter strukturen som driver all oppmøteregistrering og -rapportering i hele menigheten.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på hvilken tilgang du har.
- Hvis du planlegger å knytte grupper til gudstjenestetider, må du først sørge for at [gruppene er opprettet](../groups/creating-groups.md).

</div>

## Nøkkelbegreper

- **Campus** -- et fysisk sted der menigheten samles (f.eks. «Hovedcampus», «Nordcampus»). Campus administreres under **Innstillinger**.
- **Gudstjeneste** -- en gjentakende samling på et campus (f.eks. «Søndagsgudstjeneste», «Midtuke»).
- **Gudstjenestetid** -- et bestemt tidspunkt for en gudstjeneste (f.eks. «09.00», «11.00»).
- **Planlagt gruppe** -- en gruppe knyttet til en bestemt gudstjenestetid. Oppmøte følges i sammenheng med den gudstjenesten.
- **Ikke-planlagt gruppe** -- en gruppe som følger oppmøte på egen hånd, uten å være knyttet til en gudstjenestetid.

## Sette opp oppmøtestrukturen

1. Åpne **B1 Admin**, åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), og utvid **Personer**.
2. Klikk **Oppmøte**, og deretter **Oppsett** i venstre kolonne. Tabellen **Tjenestestruktur** åpnes, med antall campus, gudstjenestetider og planlagte og ikke-planlagte grupper øverst. Tallene oppdateres med en gang du legger til, redigerer eller fjerner noe i tabellen.
3. Klikk **Administrer campus** (øverst til høyre i panelet **Tjenestestruktur**). Dette tar deg til **Innstillinger → Campus**. Klikk **Legg til campus**, skriv inn navnet på stedet ditt (adresse og tidssone er valgfritt), og klikk **Lagre**.
4. Gå tilbake til **Personer → Oppmøte** og klikk **Oppsett**. Campuset ditt vises nå i oppsettstabellen.
5. Klikk på **+-knappen i kolonnen Tjeneste** under campuset ditt. Skriv inn et tjenestenavn, for eksempel «Søndagsgudstjeneste», og klikk **Lagre**.
6. Klikk på **+-knappen i kolonnen Tid** under tjenesten. Skriv inn et navn på **gudstjenestetiden**, for eksempel «09.00», fyll eventuelt inn [innsjekkingsplanen](#setting-a-check-in-schedule), og klikk **Lagre**. Gjenta for hver gudstjenestetid.
7. For å knytte en gruppe til en gudstjenestetid åpner du gruppen fra **Personer > Grupper**, klikker **Rediger** og bruker **Legg til gudstjenestetid** -- se neste avsnitt.

### Aktivere oppmøteføring for en gruppe

Før det kan registreres oppmøte for en gruppe, må **Følg oppmøte** være slått på for den gruppen.

1. I Hurtigmenyen velger du **Personer > Grupper** og velger gruppen.
2. Klikk på knappen **Rediger** under gruppens navn.
3. Sett **Følg oppmøte** til **Ja**.
4. Klikk **Lagre**.

:::tip
Hvis du knyttet gruppen til en gudstjenestetid i forrige trinn, bruker du også alternativet **Legg til gudstjenestetid** på redigeringssiden for gruppen for å koble den til riktig gudstjeneste. Dette sikrer at øktene knyttes til riktig campus og tidspunkt.
:::

:::tip
Hvis en gruppe møtes utenfor en vanlig gudstjeneste -- for eksempel en smågruppe midt i uken som følger sitt eget oppmøte -- kan du la den være en ikke-planlagt gruppe. Den vil fortsatt vises i rapporten **Gruppeoppmøte**.
:::

## Sette en innsjekkingsplan

Hver gudstjenestetid kan ha en valgfri innsjekkingsplan, slik at [selvinnsjekking](check-in.md) åpner og stenger automatisk hver uke. Uten en plan er innsjekking for den gudstjenestetiden tilgjengelig til enhver tid (så lenge rommet ikke er stengt av andre grunner, for eksempel fordi det er fullt).

1. I visningen **Oppsett** klikker du på navnet til en gudstjenestetid i kolonnen **Tid** (eller legger til en ny).
2. Under **Innsjekkingsplan** velger du **Dag** i uken gudstjenestetiden holdes.
3. Angi **Starttidspunkt** og eventuelt **Sluttidspunkt**.
4. Skriv inn **Åpne innsjekking (minutter før start)** -- for eksempel åpner `30` innsjekkingen en halv time før gudstjenesten starter.
5. Skriv inn **Lukk innsjekking (minutter etter slutt)** -- for eksempel holder `15` innsjekkingen åpen i 15 minutter etter sluttidspunktet. Hvis du ikke har satt et sluttidspunkt, telles dette fra starttidspunktet.
6. Klikk **Lagre**.

Planen gjentas hver uke og måles i tidssonen til gudstjenestens campus. Hvis campuset ikke har en tidssone, brukes menighetens [tidssone](../settings/church-settings.md#time-zone) i stedet, deretter tidssonen til ditt første campus som har en, og til slutt østlig tid (America/New_York). Hvis innsjekkingen åpner på feil klokkeslett, kontrollerer du **Tidssone** på campuset under [Campus](../settings/campuses.md). For å fjerne en plan setter du **Dag** tilbake til **Ingen plan** og klikker **Lagre**. En plan trer bare i kraft når både **Dag** og **Starttidspunkt** er satt.

Mens innsjekkingsvinduet for en gudstjenestetid er stengt:

- **Selvinnsjekking på B1.church** viser gudstjenestetiden som **Stengt** (eller for eksempel **Stengt · åpner søn 09.30**), og den kan ikke velges. Hvis ingen av en tjenestes tider er åpne, ser familier når innsjekkingen åpner, for eksempel «Innsjekking åpner søn 09.30».
- **B1 Checkin-kioskappen** viser også gudstjenestetiden som **Stengt**, med når den åpner. Hvis alle tider for en gudstjeneste er stengt, forteller kiosken når innsjekkingen for den gudstjenesten åpner. Noen som allerede er sjekket inn på en stengt gudstjenestetid, vises med gruppen sin som **Innsjekket** i stedet. Hvis et vindu lukkes midt i en innsjekking, fullfører ikke kiosken den, og den viser en skjerm **Kan ikke sjekke inn ennå** med rommet det gjelder, slik at familien kan velge et annet.

En husstand som allerede har sjekket inn til en tidligere gudstjenestetid, kan fortsatt komme tilbake og legge til en senere gudstjenestetid som er åpen, selv etter at det tidligere vinduet er stengt. Deres eksisterende innsjekkinger beholdes.

:::tip
Sett et romslig åpningsvindu (for eksempel 45 minutter før start), slik at tidlig ankomne familier og frivillige kan sjekke inn, og et kort lukkevindu, slik at sen ankomne fortsatt kan sjekke inn når gudstjenesten har startet.
:::

## Redigere oppsettet

Du kan oppdatere oppsettet når som helst. Velg et campus, en gudstjenestetid eller en gruppe og klikk **Rediger** for å endre detaljene, eller **Slett** for å fjerne den.

:::info
Hvis du fjerner en gudstjenestetid, slettes ikke tidligere oppmøteregistreringer. Historikken din bevares, selv om du endrer planen.
:::

## Neste steg

Når campus, gudstjenestetider og grupper er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt, eller sette opp [selvinnsjekking](check-in.md) for gudstjenestene dine.
