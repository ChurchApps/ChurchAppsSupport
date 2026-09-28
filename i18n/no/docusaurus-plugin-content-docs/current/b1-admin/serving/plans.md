---
title: "Tjenesteplaner"
---

# Tjenesteplaner

<div class="article-intro">

Tjenesteplaner organiserer hvem som tjener og når. Hver plan er knyttet til en bestemt dato og ministerium, noe som gjør det enkelt å koordinere frivilliglagene dine uke for uke og sikre at hver tjeneste er fullt bemannet.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Sett opp ministeriene og lagene dine i tjeneste-området
- Sørg for at frivillige har blitt lagt til i [personkatalogen](../people/adding-people.md) og tildelt lag

</div>

## Tilgang til planer

1. Naviger til **Tjeneste** fra hovedmenyen.
2. Velg en **ministeriumfane** øverst på siden.
3. Klikk på en **plantype** for å se listen over planer for den typen.
4. Klikk på en bestemt plan for å åpne den.

:::info
Full administrator-tilgang er ikke nødvendig for å administrere planer. Alle som er medlemmer av et ministerium kan navigere til Tjeneste og lage, redigere og planlegge planer for sitt eget ministerium uten å trenge tillatelsen Planer rediger. Redaktører med rollen Planer rediger kan administrere planer på tvers av alle ministerier.
:::

## Opprett en plan

1. Fra plantypvisningen klikker du **Ny plan**.
2. Gi planen et navn eller bruk datoen som navn. Velg **datoen** for tjenesten.
3. Hvis du vil kopiere fra en tidligere plan, velger du bare stillinger eller stillinger og tildelinger. Hvis du ikke vil kopiere, velger du ingenting. Du kan også kopiere tjenesterekkefølgen fra forrige plan.
4. Lagre planen. Du kan nå begynne å tildele lagmedlemmer og bygge ut [tjenesterekkefølgen](./service-order.md).

## Siden med plandetaljer

Når du åpner en plan, vil du se to faner:

- **Tildelinger** -- Administrer hvilke lagmedlemmer som er tildelt denne planen. Du kan legge til mennesker fra dine eksisterende lag og se hvem som har bekreftet eller fortsatt venter.
- **[Tjenesterekkefølge](./service-order.md)** -- Bygge ut tjenesterekkefølgen med elementer som tilbedelseissanger, bønner, kunngjøringer og preken.

## Tildelning av lagmedlemmer

1. Åpne en plan og gå til fanen **Tildelinger**.
2. Klikk på **legg til stilling** for å utvide den. Fyll ut informasjonen i skjemaet for å legge til en stilling. For kategorinavn legger du til hvilken som helst kategori du ønsker.
3. Klikk på **Mennesker trengs** og velg frivillige for å fylle den stillingen. Hvis stillingen har en **Frivillighetsgruppe**, velger du fra medlemmene i den gruppen. Hvis frivillighetsgruppen er satt til **Ingen**, kan du i stedet søke etter hvem som helst i kirken.
4. Legg til medlemmer fra lagrullen ved å klikke **Legg til**.
5. Tildelte medlemmer vises under laget sitt med tildelingsstatus.
6. Klikk varsel frivillige for å varsle dem i B1-appen eller via e-post.

Hver stilling viser en tellemerke (for eksempel "2/3") slik at du kan se hvor mange plasser som er fylt på et øyeblikk. Øverst på fanen Tildelinger viser en fremdriftslinje og et oppsummering-merke ("X av Y stillinger fylt") det samlede bemanningen for planen, og bytter til **Fullt bemannet** når hver stilling er dekket.

:::tip
Sett opp lagene dine i ministeriuminnstillingene før du oppretter planer. På denne måten vil du ha en klar pool med frivillige å tildele fra.
:::

## Planinnstillinger

Hver plan har tillegginnstillinger du kan konfigurere ved å klikke redigeringsikonet (blyant) på planen. Disse inkluderer:

- **Påmelding-fristen** — antall timer før tjenesten når frivilligpåmeldinger lukkes. Skriv inn et negativt tall for å holde påmeldinger åpne etter tjenestens starttid.
- **Vis frivilligens navn på påmeldingssiden** — når den er avkrysset, kan frivillige se hvem annet som allerede har meldt seg på for hver stilling.
- **Satt i blyant** — skjuler tildelinger fra frivillige til du er klar til å publisere planen.
- **Planlegge automatisk en erstatning når en frivillig avslår** — når den er avkrysset, hvis en tildelt frivillig avslår posisjonen, vil B1 automatisk kontakte neste tilgjengelige person på lagkullrullen og spørre om de kan tjene. Dette fortsetter ned i listen til noen godtar, og holder stillingene dine fylte uten manuell oppfølging.

## Frivilligs påminnelser

B1 kan automatisk påminne frivillige før tjenestene de er planlagt for, slik at du ikke må jakte på laget ditt hver uke. Påminnelser går til **alle planlagte** — både de som har bekreftet og de som ikke har svart ennå — via e-post og som en app-/push-varsling. Hver påminnelse inkluderer frivilligens stilling(er), tjenestdatoen, plannotatene og den egendefinerte meldingen.

Påminnelses-timing og innhold angis per **plantype**, slik at hver slags tjeneste kan ha sitt eget skjema.

1. Fra **Tjeneste**-området velger du ministeriet som inneholder plantypen.
2. Klikk på **redigeringsikonet (blyant)** ved siden av plantypen.
3. I delen **Påminnelser** angir du:
   - **Påminnelsesdager før tjeneste** — en kommadelt liste over hvor mange dager før du skal sende, for eksempel `7,1,0`. Bruk `0` for å sende påminnelse på dagen for tjenesten. La dette feltet være tomt for å slå av påminnelser for denne plantypen.
   - **Egendefinert påminnelsesmelding** *(valgfritt)* — ekstra tekst lagt til påminnelsen, for eksempel "Ankomst 30 minutter tidlig for å øve."
4. Lagre plantypen.

Nye plantyper påminner frivillige **2 dager før** hver tjeneste som standard til du endrer dette.

:::tip
Frivillige som ikke har bekreftet ennå får **Godta** og **Avslå** knapper direkte i påminnelses-e-posten, slik at de kan svare uten å logge inn.
:::

:::info
Hver påminnelse sendes en gang. Planer som fortsatt er satt i blyant (ikke ennå sendt til laget) utløser ikke påminnelser.
:::

## Knytte grupper til en plantype

Under plannisten på plantypesiden lar delen **Grupper** deg bestemme hvilke grupper som kan se planene for denne plantypen fra medlemsportalen. Dette er en rask måte å vise kommende tjenester for de rette lagene uten å gi dem administrator-tilgang.

1. På plantypesiden ruller du ned til delen **Grupper**.
2. Klikk **Legg til gruppe** og velg en gruppe fra rullelisten.
3. I kolonnen **Viser** velger du om medlemmer av den gruppen skal se **Tidligere**, **Fremtidtige** eller **Begge** planer for denne plantypen.
4. Gjenta for å knytte flere grupper, eller klikk søppelkanikonet for å fjerne en gruppe.

:::info
Bare grupper som er merket som **Standard** vises i velgeren. Medlemmer av en tilknyttet gruppe ser automatisk denne plantypen sin planer på gruppesiden i B1-medlemsportalen — begrenset til tidligere/fremtidelige/begge-vinduet du valgte.
:::

Hvis planene er Lessons.church-leksjoner, ser medlemmer av den tilknyttede gruppen også et kort **Denne ukens leksjon** på gruppesiden (siste linje, vers og et spørsmål for foreldre). Knytt en foreldregruppe her og sett filteret til **Tidligere** slik at dagens leksjon er inkludert. Frivillige lag bruker typisk **Fremtidtige** eller **Begge**.

## Utskrift av planer

Du kan skrive ut en plan for distribusjon til laget ditt. Åpne planen, åpne tjenesterekkefølge-fanen og bruk **Skriv ut**-alternativet for å generere en utskrivbar versjon som inkluderer tildelinger og tjenesterekkefølgen. Dette er nyttig for utdeling på øvelser eller plassering i et felles område.

:::info
Planer er organisert etter ministerium. Sørg for at du er på riktig ministerium-fane før du oppretter eller viser planer.
:::

## Neste trinn

- Bruk [Planoversikten](./plans-overview.md) til å se alle kommende tildelinger over flere uker i ett rutenett og oppdage ufylte stillinger — og tildel frivillige direkte fra rutenettet
- Lagre en plans struktur som en [planmal](./plan-templates.md) slik at du kan stemple det på fremtidsplaner på ett klikk
- Bygge ut [tjenesterekkefølgen](./service-order.md) med sanger, lesinger og andre elementer
- Legg til [sanger](./songs.md) fra biblioteket ditt direkte inn i tjenesterekkefølgen
- Bruk [oppgaver](./tasks.md) til å tildele oppfølgingshandlinger til lagmedlemmer
- Vis gjeldende leksjonsinnhold på en lobby-TV med [Digital skilting](./digital-signage.md)
