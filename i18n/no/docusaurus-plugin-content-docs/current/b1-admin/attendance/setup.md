---
title: "Oppmøteoppsett"
---

# Oppmøteoppsett

<div class="article-intro">

Før du kan følge opp oppmøte, må du fortelle B1 Admin om kirkens fysiske lokasjoner, når gudstjenestene holdes, og hvilke grupper som møtes på hver gudstjeneste. Dette engangsoppsettet oppretter strukturen som driver all oppfølging og rapportering av oppmøte i hele kirken din.

</div>

## Opplæringsvideo

<YouTube id="LQPc2gVlXvQ" title="Sette opp gudstjenester og oppmøte i B1" next="Sette opp barneinnsjekking i B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du planlegger å knytte grupper til gudstjenestetider, må [gruppene dine være opprettet](../groups/creating-groups.md) først.

</div>

## Nøkkelbegreper

- **Kampus** — en fysisk lokasjon der kirken din samles (f.eks. «Hovedkampus», «Nordkampus»). Kampuser administreres under **Innstillinger**.
- **Gudstjeneste** — en gjentakende samling på en kampus (f.eks. «Søndagsgudstjeneste», «Midtuke»).
- **Gudstjenestetid** — et bestemt tidspunkt en gudstjeneste holdes (f.eks. «09:00», «11:00»).
- **Planlagt gruppe** — en gruppe knyttet til en bestemt gudstjenestetid. Oppmøte følges i sammenheng med den gudstjenesten.
- **Ikke-planlagt gruppe** — en gruppe som følger sitt eget oppmøte, uten å være knyttet til en gudstjenestetid.

## Sette opp oppmøtestrukturen din

1. Åpne **B1 Admin**, åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), og utvid **Personer**.
2. Klikk **Oppmøte**, og deretter **Oppsett** i venstre kolonne. Tabellen **Gudstjenestestruktur** åpnes, med antall kampuser, gudstjenestetider og planlagte og ikke-planlagte grupper øverst. Tallene oppdateres med en gang du legger til, redigerer eller fjerner noe i tabellen.
3. Klikk **Administrer kampuser** (øverst til høyre i panelet **Gudstjenestestruktur**). Dette tar deg til **Innstillinger → Kampuser**. Klikk **Legg til kampus**, skriv inn navnet på lokasjonen din (adresse og tidssone er valgfritt), og klikk **Lagre**.
4. Gå tilbake til **Personer → Oppmøte** og klikk **Oppsett**. Kampusen din vises nå i oppsettstabellen.
5. Klikk på **+-knappen i kolonnen Gudstjeneste** under kampusen din. Skriv inn et gudstjenestenavn, for eksempel «Søndagsgudstjeneste», og klikk **Lagre**.
6. Klikk på **+-knappen i kolonnen Tid** under gudstjenesten. Skriv inn et navn på **gudstjenestetiden**, for eksempel «09:00», fyll eventuelt ut [innsjekkingsplanen](#setting-a-check-in-schedule), og klikk **Lagre**. Gjenta for hver gudstjenestetid.
7. For å koble en gruppe til en gudstjenestetid åpner du gruppen fra **Personer > Grupper**, klikker **Rediger** og bruker **Legg til gudstjenestetid** — se neste avsnitt.

### Aktivere Følg oppmøte for en gruppe

Før en gruppe kan få registrert oppmøte, må Følg oppmøte være slått på for den gruppen.

1. I hurtigmenyen velger du **Personer > Grupper** og velger gruppen.
2. Klikk **Rediger**-knappen under gruppens navn.
3. Sett **Følg oppmøte** til **Ja**.
4. Klikk **Lagre**.

:::tip
Hvis du knyttet gruppen til en gudstjenestetid i forrige steg, bruk også alternativet **Legg til gudstjenestetid** på gruppens redigeringsside for å koble den til riktig gudstjeneste. Dette sikrer at øktene er koblet til riktig kampus og tidspunkt.
:::

:::tip
Hvis en gruppe møtes utenfor en vanlig gudstjeneste — for eksempel en midtuke-smågruppe som følger sitt eget oppmøte — kan du la den være en ikke-planlagt gruppe. Den vil fortsatt vises i rapporten **Gruppeoppmøte** for oppmøterapportering.
:::

## Sette en innsjekkingsplan

Hver gudstjenestetid kan ha en valgfri innsjekkingsplan, slik at [selvinnsjekking](check-in.md) åpner og stenger av seg selv hver uke. Uten en plan er innsjekking for den gudstjenestetiden tilgjengelig til enhver tid (så lenge rommet ikke er stengt av andre grunner, for eksempel fordi det er fullt).

1. På **Oppsett**-visningen klikker du på en gudstjenestetids navn i kolonnen **Tid** (eller legger til en ny).
2. Under **Innsjekkingsplan** velger du **Dag** i uken gudstjenestetiden holdes.
3. Angi **Starttid** og eventuelt **Sluttid**.
4. Skriv inn **Åpne innsjekking (minutter før start)** — for eksempel `30` åpner innsjekkingen en halv time før gudstjenesten starter.
5. Skriv inn **Lukk innsjekking (minutter etter slutt)** — for eksempel `15` holder innsjekkingen åpen i 15 minutter etter sluttidspunktet. Hvis du ikke har satt en sluttid, regnes dette fra starttidspunktet.
6. Klikk **Lagre**.

Planen gjentas hver uke og måles i tidssonen til gudstjenestens kampus. Hvis den kampusen ikke har en tidssone, brukes kirkens [tidssone](../settings/church-settings.md#time-zone) i stedet, deretter tidssonen til din første kampus som har en, og til slutt østlig tid (America/New_York). Hvis innsjekkingen åpner til feil klokkeslett, sjekk **Tidssone** for kampusen under [Kampuser](../settings/campuses.md). For å fjerne en plan setter du **Dag** tilbake til **Ingen plan** og klikker **Lagre**. En plan trer kun i kraft når både **Dag** og **Starttid** er satt.

Mens innsjekkingsvinduet for en gudstjenestetid er stengt:

- **Selvinnsjekking på B1.church** viser gudstjenestetiden som **Stengt** (eller for eksempel **Stengt · åpner søn 09:30**), og den kan ikke velges. Hvis ingen av en gudstjenestes tider er åpne, ser familier når innsjekkingen åpner, for eksempel «Innsjekking åpner søn 09:30».
- **Kioskappen B1 Checkin** viser også gudstjenestetiden som **Stengt**, med når den åpner. Hvis alle tidene for en gudstjeneste er stengt, sier kiosken når innsjekkingen for den gudstjenesten åpner. Noen som allerede er sjekket inn på en stengt gudstjenestetid, vises med gruppen sin som **Innsjekket** i stedet. Hvis et vindu stenger midt i en innsjekking, fullfører ikke kiosken innsjekkingen, og den viser en skjerm med **Kan ikke sjekke inn ennå** med rommet det gjelder, slik at familien kan velge et annet.

En husstand som allerede har sjekket inn på en tidligere gudstjenestetid, kan fortsatt komme tilbake og legge til en senere gudstjenestetid som er åpen, selv etter at det tidligere vinduet er stengt. Eksisterende innsjekkinger beholdes.

:::tip
Sett et romslig åpningsvindu (for eksempel 45 minutter før start), slik at familier og frivillige som kommer tidlig kan sjekke inn, og et kort lukkingsvindu, slik at folk som kommer for sent fortsatt kan sjekke inn etter at gudstjenesten har startet.
:::

## Redigere oppsettet ditt

Du kan oppdatere oppsettet ditt når som helst. Velg en kampus, gudstjenestetid eller gruppe og klikk **Rediger** for å endre detaljene, eller **Slett** for å fjerne den.

:::info
Å fjerne en gudstjenestetid sletter ikke tidligere oppmøteposter. Historiske data beholdes selv om du endrer planen din.
:::

## Hva er neste steg

Når kampusene, gudstjenestetidene og gruppene dine er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt, eller sette opp [selvinnsjekking](check-in.md) for gudstjenestene dine.
