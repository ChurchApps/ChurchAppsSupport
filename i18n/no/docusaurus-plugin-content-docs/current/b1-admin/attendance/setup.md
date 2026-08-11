---
title: "Oppmøte Setup"
---

# Oppmøte Setup

<div class="article-intro">

Før du kan spore oppmøte, må du fortelle B1 Admin om de fysiske stedene for kirken, når gudstjenester skjer, og hvilke grupper som møtes ved hver gudstjeneste. Dette engangsoppsettet oppretter strukturen som driver all oppmøtesporing og rapportering på tvers av kirken.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere oppmøte. Se [Roller og tillatelser](../people/roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du planlegger å tilordne grupper til gudstjenesteklokkeslett, pass på at [gruppene dine er opprettet](../groups/creating-groups.md) først.

</div>

## Nøkkelkonsepter

- **Campus** -- et fysisk sted hvor kirken din møtes (f.eks. "Hovedcampus", "Nordcampus"). Campuser administreres under **Innstillinger**.
- **Gudstjeneste** -- en gjentakende forsamling på et campus (f.eks. "Søndagsgudstjeneste", "Midtuke").
- **Gudstjenesteklokkeslett** -- et bestemt tidspunkt en gudstjeneste skjer (f.eks. "9:00 AM", "11:00 AM").
- **Planlagt gruppe** -- en gruppe tilordnet et bestemt gudstjenesteklokkeslett. Oppmøte spores i konteksten av den gudstjenesten.
- **Uplanlagt gruppe** -- en gruppe som sporer oppmøte på egen hånd, uten å være knyttet til et gudstjenesteklokkeslett.

## Sette opp oppmøte-strukturen

1. Åpne **B1 Admin**, klikk **seksjonsmenyene** i det øvre venstre hjørnet (seksjonsnavnet med den lille pilen) og velg **Mennesker**.
2. I navigasjonslinjen klikker du **Oppmøte**-fanen. **Setup**-fanen er valgt som standard.
3. Klikk **Administrer campuser** (øverst til høyre i Setup-panelet). Dette tar deg til **Innstillinger → Campuser**. Klikk **Legg til campus**, angi navn på plasseringen (adresse og tidssone er valgfri), og klikk **Lagre**.
4. Gå tilbake til **Mennesker → Oppmøte → Setup**. Campusen din vises nå i oppsettstabellen.
5. Klikk **+ knappen i gudstjeneste-kolonnen** under campusen. Angi et gudstjeneste-navn som "Søndagsgudstjeneste" og klikk **Lagre**.
6. Klikk **+ knappen i tid-kolonnen** under gudstjenesten. Angi et tidspunkt som "9:00 AM" og klikk **Lagre**. Gjenta for hvert gudstjenesteklokkeslett.
7. For å koble en gruppe til et gudstjenesteklokkeslett, åpne gruppen fra **Grupper**-fanen, klikk **Rediger**-blyanten, og bruk **Legg til gudstjenesteklokkeslett** -- se neste seksjon.

### Aktivering av sporingsjobblisten på en gruppe

Før en gruppe kan ha oppmøte registrert, må Track Attendance være slått på for den gruppen.

1. Klikk **Grupper** i sidestolpen og velg gruppen.
2. Klikk **Rediger**-blyantikonen.
3. Sett **Spor oppmøte** til **Ja**.
4. Klikk **Lagre**.

:::tip
Hvis du tilordnet gruppen til et gudstjenesteklokkeslett i forrige trinn, bruk også **Legg til gudstjenesteklokkeslett**-alternativet på gruppens redigeringsskjerm for å koble den til riktig gudstjeneste. Dette sikrer at økter er koblet til riktig campus og tid.
:::

:::tip
Hvis en gruppe møtes utenfor en vanlig gudstjeneste -- som en midtuke smågruppe som sporer sitt eget oppmøte -- kan du la den være som en uplanlagt gruppe. Den vil fortsatt vises på Grupper-fanen for oppmøterapportering.
:::

## Redigering av oppsettet

Du kan oppdatere oppsettet ditt når som helst. Velg en campus, gudstjenesteklokkeslett eller gruppe og klikk **Rediger** for å endre detaljer, eller **Slett** for å fjerne det.

:::info
Fjerning av et gudstjenesteklokkeslett sletter ikke tidligere oppmøteregistreringer. Historiske data oppbevares selv om du endrer planen.
:::

## Hva er neste

Når campuser, gudstjenesteklokkeslett og grupper er på plass, er du klar til å begynne å [registrere oppmøte](recording-attendance.md) manuelt eller sette opp [selvsjekk inn](check-in.md) for gudstjenestene dine.
