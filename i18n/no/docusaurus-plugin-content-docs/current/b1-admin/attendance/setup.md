---
title: "Oppmøteoppsett"
description: "Sett opp menigheter, gudstjenester, gudstjenestetidspunkter og gruppetilordninger i B1 Admin, slik at oppmøtesporing og innsjekkingstidsplaner fungerer i hele menigheten."
---

# Oppmøteoppsett

<div class="article-intro">

Før du kan følge oppmøte, må du fortelle B1 Admin om menighetens fysiske lokasjoner, når gudstjenestene holdes, og hvilke grupper som samles til hver gudstjeneste. Dette engangsoppsettet lager strukturen som driver all sporing og rapportering av oppmøte i hele menigheten.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Setting Up Services and Attendance in B1" next="Setting Up Children's Check-In in B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv konto i B1 Admin med tillatelsen **Edit Services** for oppmøte. Alternativet **Setup** vises bare for personer som har den; det er ikke nok å bare se oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Hvis du planlegger å tilordne grupper til gudstjenestetidspunkter, må du først sørge for at [gruppene er opprettet](../groups/creating-groups.md).

</div>

## Sentrale begreper {#key-concepts}

- **Campus** – en fysisk lokasjon der menigheten samles (for eksempel «Main Campus» eller «North Campus»). Menigheter administreres under **Settings**.
- **Service** – en gjentakende samling på en menighet (for eksempel «Sunday Service» eller «Midweek»).
- **Service Time** – et bestemt tidspunkt en gudstjeneste holdes (for eksempel «9:00 AM» eller «11:00 AM»).
- **Scheduled Group** – en gruppe tilordnet et bestemt gudstjenestetidspunkt. Oppmøte føres i sammenheng med den gudstjenesten.
- **Unscheduled Group** – en gruppe som fører oppmøte på egen hånd, uten å være knyttet til et gudstjenestetidspunkt.

## Sette opp oppmøtestrukturen {#setting-up-your-attendance-structure}

1. Åpne **B1 Admin**, åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), og utvid **People**.
2. Klikk **Attendance**, og deretter **Setup** i venstre kolonne. Tabellen **Service structure** åpnes, med antall menigheter, gudstjenestetidspunkter, grupper med og uten tidsplan, og totalt antall grupper øverst. Tallene oppdateres så snart du legger til, redigerer eller fjerner noe i tabellen. Hver menighet viser sine gudstjenester, tidspunktene deres og gruppene tilordnet hvert tidspunkt, gruppert etter kategori (et tjenesteteam vises under navnet på sin tjeneste). Grupper som fører oppmøte men ikke har et gudstjenestetidspunkt, vises nederst under **Unassigned**.
3. Klikk **Manage Campuses** (øverst til høyre i panelet **Service structure**). Dette tar deg til **Settings → Campuses**. Klikk **Add Campus**, skriv inn navnet på lokasjonen (adresse og tidssone er valgfritt), og klikk **Save**.
4. Gå tilbake til **People → Attendance** og klikk **Setup**. Menigheten din vises nå i oppsettstabellen.
5. Klikk på **+-knappen i kolonnen Service** under menigheten din. Skriv inn et gudstjenestenavn, for eksempel «Sunday Service», og klikk **Save**.
6. Klikk på **+-knappen i kolonnen Time** under gudstjenesten. Skriv inn et navn på **Service Time**, for eksempel «9:00 AM», fyll eventuelt inn [innsjekkingstidsplanen](#setting-a-check-in-schedule), og klikk **Save**. Gjenta for hvert gudstjenestetidspunkt.
7. For å koble en gruppe til et gudstjenestetidspunkt åpner du gruppen fra **People > Groups**, klikker **Edit** og bruker **Add Service Time** – se neste avsnitt.

### Slå på Track Attendance for en gruppe {#enabling-track-attendance-on-a-group}

Før det kan føres oppmøte for en gruppe, må Track Attendance være slått på for den gruppen.

1. I hurtigmenyen velger du **People > Groups** og velger gruppen.
2. Klikk på knappen **Edit** under gruppens navn.
3. Sett **Track Attendance** til **Yes**.
4. Klikk **Save**.

:::tip
Hvis du tilordnet gruppen til et gudstjenestetidspunkt i forrige trinn, bruk også alternativet **Add Service Time** på gruppens redigeringsside for å koble den til riktig gudstjeneste. Da sikrer du at samlingene knyttes til riktig menighet og tidspunkt.
:::

:::tip
Hvis en gruppe samles utenfor en vanlig gudstjeneste – for eksempel en smågruppe midt i uken som fører sitt eget oppmøte – kan du la den være en gruppe uten tidsplan. Den vises fortsatt i rapporten **Group Attendance** for oppmøterapportering.
:::

## Sette en innsjekkingstidsplan {#setting-a-check-in-schedule}

Hvert gudstjenestetidspunkt kan ha en valgfri innsjekkingstidsplan, slik at [selvinnsjekking](check-in.md) åpnes og lukkes av seg selv hver uke. Uten tidsplan er innsjekking for dette gudstjenestetidspunktet tilgjengelig til enhver tid (så lenge rommet ikke er stengt av andre grunner, for eksempel fordi det er fullt).

1. I visningen **Setup** klikker du på navnet til et gudstjenestetidspunkt i kolonnen **Time** (eller legger til et nytt).
2. Under **Check-in Schedule** velger du **Day** – ukedagen gudstjenestetidspunktet holdes.
3. Angi **Start Time** og eventuelt **End Time**.
4. Skriv inn **Open check-in (minutes before start)** – for eksempel `30` åpner innsjekkingen en halv time før gudstjenesten starter.
5. Skriv inn **Close check-in (minutes after end)** – for eksempel `15` holder innsjekkingen åpen i 15 minutter etter sluttidspunktet. Hvis du ikke har satt et sluttidspunkt, telles dette fra starttidspunktet. Hvis du lar både **End Time** og **Close check-in** stå tomme, forblir innsjekkingen åpen til slutten av den dagen.
6. Klikk **Save**.

Tidsplanen gjentas hver uke og måles i tidssonen til gudstjenestens menighet. Hvis menigheten ikke har en tidssone, brukes menighetens [tidssone](../settings/church-settings.md#time-zone) i stedet, deretter tidssonen til den første menigheten som har en, og til slutt østlig tid (America/New_York). Hvis innsjekkingen åpner på feil tidspunkt, kontroller **Time Zone** for menigheten under [Campuses](../settings/campuses.md). For å fjerne en tidsplan setter du **Day** tilbake til **No schedule** og klikker **Save**. En tidsplan trer bare i kraft når både **Day** og **Start Time** er satt.

Mens innsjekkingsvinduet for et gudstjenestetidspunkt er stengt:

- **Selvinnsjekking på B1.church** viser gudstjenestetidspunktet som **Closed** (eller for eksempel **Closed · opens Sun 9:30 AM**), og det kan ikke velges. Hvis ingen av tidspunktene for en gudstjeneste er åpne, ser familiene når innsjekkingen åpner, for eksempel «Check-in opens Sun 9:30 AM».
- **Kioskappen B1 Checkin** viser også gudstjenestetidspunktet som **Closed**, med når det åpner. Hvis alle tidspunktene for en gudstjeneste er stengt, forteller kiosken når innsjekkingen for den gudstjenesten åpner. Noen som allerede er sjekket inn til et stengt gudstjenestetidspunkt, ser gruppen sin med **Checked in** i stedet. Hvis et vindu lukkes midt i en innsjekking, fullfører ikke kiosken den, og den viser en skjerm med **Can't check in yet** som lister opp det berørte rommet, slik at familien kan velge et annet.

En husstand som allerede har sjekket inn til et tidligere gudstjenestetidspunkt, kan fortsatt komme tilbake og legge til et senere gudstjenestetidspunkt som er åpent, selv etter at det tidligere vinduet er stengt. Eksisterende innsjekkinger beholdes.

:::tip
Sett et romslig åpningsvindu (for eksempel 45 minutter før start), slik at familier og frivillige som kommer tidlig kan sjekke inn, og et kort lukkevindu, slik at de som kommer for sent fortsatt kan sjekke inn etter at gudstjenesten har startet.
:::

## Redigere oppsettet {#editing-your-setup}

Du kan oppdatere oppsettet når som helst:

- **Gudstjenester og gudstjenestetidspunkter** – klikk på navnet til en gudstjeneste eller et gudstjenestetidspunkt i tabellen for å åpne skjemaet. Endre detaljene og klikk **Save**, eller klikk **Delete** for å fjerne det.
- **Menigheter** – klikk **Manage Campuses** for å legge til, gi nytt navn til eller fjerne menigheter under **Settings**.
- **Grupper** – klikk på navnet til en gruppe for å åpne den, og klikk deretter **Edit** for å endre gudstjenestetidspunktene den er knyttet til, eller slå **Track Attendance** av eller på.

Knappen **Check-in kiosk, QR, and labels** øverst i tabellen tar deg til [innstillingene for B1 CheckIn](check-in.md).

:::info
Hvis du fjerner et gudstjenestetidspunkt, slettes ikke tidligere oppmøteregistreringer. Historikken din bevares selv om du endrer tidsplanen.
:::

## Hva er neste steg {#whats-next}

Når menighetene, gudstjenestetidspunktene og gruppene dine er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt eller sette opp [selvinnsjekking](check-in.md) for gudstjenestene dine.
