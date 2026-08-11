---
title: "Gudstjenesteplaner"
---

# Gudstjenesteplaner

<div class="article-intro">

Gudstjenesteplaner organiserer hvem som tjener og når. Hver plan er knyttet til en bestemt dato og ministerium, noe som gjør det enkelt å koordinere frivilliges-lag uke for uke og sikre at hver gudstjeneste er fullt bemanna.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp ministrier og lag i Serving-området
- Pass på at frivillige har blitt lagt til i [mennesker-mappen](../people/adding-people.md) og tilordnet til lag

</div>

## Tilgang til planer

1. Naviger til **Serving** fra hovedmenyene.
2. Velg et **ministeriums-fane** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer for denne typen.
4. Klikk på en spesifikk plan for å åpne den.

:::info
Fullstendig admin-tilgang er ikke påkrevd for å administrere planer. Enhver som er medlem av et ministerium kan navigere til Serving og opprette, redigere og planlegge planer for sitt eget ministerium uten å trenge planer-redigeringstillatelsen. Redaktører med planer-redigeringrollen kan administrere planer på tvers av alle ministerier.
:::

## Opprett en plan

1. Fra plantype-visningen, klikk **Ny plan**.
2. Gi planen et navn eller bruk datoen som navn. Velg **datoen** for gudstjenesten.
3. Hvis du vil kopiere fra en tidligere plan, velg bare stillinger eller stillinger og oppgaver. Hvis du ikke vil kopiere, velg ingenting. Du kan også kopiere tjenesteordningen fra min tidligere plan.
4. Lagre planen. Du kan nå begynne å tildele lagets medlemmer og bygge ut [tjenesteordningen](./service-order.md).

## Plansdet detalj-siden

Når du åpner en plan, vil du se to faner:

- **Oppgaver** -- Administrer hvilke lagets medlemmer som er tilordnet denne planen. Du kan legge til mennesker fra eksisterende lag og se hvem som har bekreftet eller fortsatt venter.
- **[Tjenesteordningen](./service-order.md)** -- Bygg ut ordningen for tjeneste med elementer som gudstjeneste-sanger, bønner, kunngjøringer og predikenen.

## Tilordning av lagets medlemmer

1. Åpne en plan og gå til **Oppgaver**-fanen.
2. Klikk på **legg til stilling** for å utvide den. Fyll ut informasjonen i "legg til en stilling"-skjemaet. For kategorinavn, legg til enhver kategori du vil.
3. Klikk på **mennesker som trengs** og velg frivillige for å fylle denne stillingen.
4. Legg til medlemmer fra lagroststeren ved å klikk **Legg til**.
5. Tilordnede medlemmer vil vises under laget med oppgave-status.
6. Klikk varsle frivillige for å varsle dem i B1-appen eller via e-post.

Hver stilling viser et tell-brikke (for eksempel, "2/3") slik at du kan se hvor mange plasser som er fylt på et blikk. Øverst på oppgave-fanen viser en fremgangslinje og en sammendrag-brikke ("X av Y-stillinger fylt") den generelle bemanningen for planen, bytter til **Fullt bemanna** når hver stilling er dekket.

:::tip
Sett opp lag i ministerium-innstillingene før du lager planer. På denne måten vil du ha en klar pulje med frivillige å tildele fra.
:::

## Planinnstillinger

Hver plan har tilleggs-innstillinger du kan konfigurere ved å klikk redigering (blyant) ikonet på planen. Disse inkluderer:

- **Påmeldings-frist** -- antall timer før gudstjenesten når frivilliges-påmeldinger lukkes. Angi et negativt tall for å holde påmeldinger åpne etter servicen starter.
- **Vis frivilliges navn på påmeldingssiden** -- når markert, kan frivillige se hvem som allerede er påmeldt for hver stilling.
- **Blyant inn** -- skjuler oppgaver fra frivillige til du er klar til å publisere tidsplanen.
- **Automatisk planlegg en erstatning når en frivillig avslår** -- når markert, hvis en tilordnet frivillig avslår deres stilling, vil B1 automatisk kontakte neste tilgjengelige person på lagroststeren og spør om de kan tjene. Dette fortsetter ned listen til noen aksepterer, holdt stillingene fulle uten manuell oppfølging.

## Frivilliges påminnelser

B1 kan automatisk minne frivillige om gudstjenestene de er planlagt for, slik at du ikke må jage laget hver uke. Påminnelser går til **alle planlagte** -- både de som har bekreftet og de som ikke har respondert ennå -- via e-post og som en in-app/push-varsel. Hver påminnelse inkluderer frivilliges stilling(er), gudstjenestens dato, planens notater og din egendefinerte melding.

Påminnel-timing og innhold er satt per **plantype**, slik at hver gudstjeneste-type kan holde sitt eget tidsplanen.

1. Fra **Serving**-området, velg ministerium som inneholder plantypen.
2. Klikk **rediger (blyant) ikonet** ved siden av plantypen.
3. I **Påminnelser**-seksjonen, sett:
   - **Påminnel dager før gudstjeneste** -- en kommatalskilt liste over hvor mange dager før skal sendes, for eksempel `7,1,0`. Bruk `0` for å sende en påminnelse på serviceens dag. La dette feltet tomt for å slå av påminnelser for denne plantypen.
   - **Egendefinert påminnel-melding** *(valgfritt)* -- ekstra tekst lagt til påminnelsen, som "Ankomst 30 minutter tidlig for å øve."
4. Lagre plantypen.

Nye plantyper minner frivillige **2 dager før** hver gudstjeneste som standard til du endrer dette.

:::tip
Frivillige som ikke har bekreftet ennå får **Godta** og **Avslå**-knapper rett inne i påminnel-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes en gang. Planer som fremdeles er innblyant (ennå ikke sendt til laget) utløser ikke påminnelser.
:::

## Tilknytting av grupper til en plantype

Nedenfor planlisten på plantype-siden, **Grupper**-seksjonen lar deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlem-portalen. Dette er en rask måte å overflate kommende tjenester til de rette lagene uten å gi dem admin-tilgang.

1. På plantype-siden, rull ned til **Grupper**-seksjonen.
2. Klikk **Legg til gruppe** og velg en gruppe fra rullemenyene.
3. I **Viser**-kolonnen, velg om medlemmer av denne gruppen skal se **Forbi**, **Fremtid** eller **Begge** planer for denne plantypen.
4. Gjenta for å tilknytte tilleggs-grupper, eller klikk søppel-ikonet for å fjerne en gruppe.

:::info
Kun grupper merket som **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypen-planene på [Planer](/docs/b1-church/plans/)-fanen i B1-medlem-portalen -- begrenset til vinduet du valgte for forbi/fremtid/begge.
:::

## Utskrift av planer

Du kan skrive ut en plan for distribusjon til laget. Åpne planen, Åpne tjenesteordningtabben og bruk **Utskrift**-alternativet for å generere en utskrivbar versjon som inkluderer oppgaver og tjenesteordningen. Dette er nyttig for å dele ut på øvingene eller legge igjen på et vanlig område.

:::info
Planer er organisert etter ministerium. Pass på at du er på riktig ministerium-fane før du lager eller viser planer.
:::

## Neste trinn

- Bruk [Planer oversikt](./plans-overview.md) for å se alle kommende oppgaver på tvers av flere uker i ett rutenett og se uutkyldt stillinger -- og tilordne frivillige direkte fra rutenettet
- Lagre en plans struktur som en [Planmal](./plan-templates.md) slik at du kan stempel den til fremtidsplaner i et klikk
- Bygg ut [tjenesteordningen](./service-order.md) med sanger, avlesninger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket direkte inn i tjenesteordningen
- Bruk [oppgaver](./tasks.md) for å tilordne oppfølgingshandlinger til lagets medlemmer
