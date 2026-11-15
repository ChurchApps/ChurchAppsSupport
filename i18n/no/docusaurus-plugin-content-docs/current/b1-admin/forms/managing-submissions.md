---
title: "Administrere innsendinger"
description: "Gjennomgå, skriv ut og flytt skjemainnsendinger i B1 Admin, slik at svarene havner hos rett person, og følg opp besøkskort og bønneforespørsler."
---

# Administrere innsendinger

<div class="article-intro">

Når skjemaet ditt er tilgjengelig, begynner innsendingene å komme inn. Fanen **Form Submissions** lar deg gjennomgå alle svarene, følge med på hvem som har sendt inn, og bruke dataene til å følge opp menigheten i tide.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- [Opprett et skjema](./creating-forms.md) med minst ett spørsmål
- Del skjemaet via den offentlige nettadressen eller bygg det inn på [nettstedet ditt](../website/managing-pages.md)

</div>

## Se innsendinger {#viewing-submissions}

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk **Forms**.
2. Klikk på skjemaet du vil gjennomgå.
3. Gå til fanen **Form Submissions**.

Fanen har to kort:

- **Form Submission Summary** – for hvert spørsmål av typen Multiple Choice, Checkbox og Yes/No vises en oversikt over hvor mange som valgte hvert svar.
- **Form Submission Results** – en tabell med alle svarene og et antall innsendinger. Hver rad viser hvem innsendingen gjelder for (**Submitted For** på skjemaer av typen People, **Submitted By** på frittstående skjemaer, eller **Anonymous**) og **Submission Date**, etterfulgt av én kolonne for hvert spørsmål på skjemaet, i skjemaets rekkefølge. Har skjemaet mange spørsmål, kan du rulle tabellen sideveis for å se de andre kolonnene. Klikk på en persons navn for å åpne posten deres.

Klikk **Export** på et av kortene for å laste ned svarene som en CSV-fil, med én rad per innsending. Klikk på **Print**-ikonet (skriver) for å skrive ut oppsummeringen og resultattabellen, med menighetens navn i toppteksten.

## Gjennomgå enkeltinnsendinger {#reviewing-individual-submissions}

For å lese eller skrive ut svarene til én person, åpner du personens post i [People](../people/adding-people.md#working-with-forms) og klikker på skjemaet i seksjonen **Forms**. Du ser alle svarene vedkommende ga, ett spørsmål per linje.

Klikk på **utskriftsikonet** ved siden av innsendingen for å skrive ut personens utfylte svar – nyttig for en papirarkivering eller en signert samtykkeerklæring du må ha tilgjengelig. Utskriften viser menighetens logo (**Light Background Logo** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) midtstilt øverst, med menighetens navn under. Utskrifter bruker alltid mørk tekst på hvit side, selv om du bruker B1 Admin i mørk modus. Dette er atskilt fra [utskrift av et tomt skjema](./creating-forms.md#printing-a-blank-form); det skriver ut en persons allerede innsendte svar, ikke en tom kopi.

## Endre personen på en innsending {#changing-the-person-on-a-submission}

Hvis en innsending er knyttet til feil person – for eksempel at to familiemedlemmer deler en e-postadresse – kan du flytte den til riktig person eller koble den fra.

1. På fanen **Form Submissions** klikker du på ikonet **Change person** (to piler) ved siden av personens navn. Det samme ikonet vises ved siden av en innsending på [en persons profil](../people/adding-people.md#working-with-forms).
2. I dialogen **Change person** søker du etter riktig person og klikker **Move to this person**.
3. Eller klikk **Unlink (Anonymous)** for å koble innsendingen fra enhver person. Den vises da som **Anonymous**.

Det er bare koblingen som endres. Svarene forblir de samme, og det sendes ikke nye oppfølgings-e-poster.

:::info
På skjemaer som er satt til å opprette en personpost, blir innsendingen knyttet til personens egen post når vedkommende er innlogget på menighetens nettside når de sender inn, selv om en annen person i databasen din deler e-postadressen. Når du [slår sammen to personposter](../people/adding-people.md), flyttes innsendingene på skjemaer for den fjernede personen over til personen du beholder.
:::

## Hvordan innsendinger samles inn {#how-submissions-are-collected}

Innsendinger kan komme inn på flere måter:

- **Offentlig nettadresse** – hvis skjemaet ditt har en offentlig nettadresse (frittstående skjemaer), kan hvem som helst med lenken sende inn et svar. Del adressen via e-post, sosiale medier eller tekstmeldinger.
- **Innbygd på nettstedet ditt** – skjemaer som er bygget inn på B1-nettstedet ditt, samler inn innsendinger automatisk når besøkende fyller dem ut.
- **Intern bruk** – ansatte kan fylle ut skjemaer av typen People for noen fra vedkommendes post i B1 Admin. Se [Arbeide med skjemaer](../people/adding-people.md#working-with-forms).

:::tip
Sjekk fanen **Form Submissions** jevnlig for skjemaer som besøkskort eller bønneforespørsler, slik at du kan følge opp raskt.
:::

## Bruke innsendingsdata {#using-submission-data}

Dataene som samles inn gjennom skjemaer, kan hjelpe deg med å:

- Følge påmeldinger til arrangementer og planlegge deretter
- Følge opp besøkende eller nye medlemmer
- Samle inn tilbakemeldinger fra spørreundersøkelser til planlegging av tjenesten
- Behandle betalinger for arrangementer eller programmer

:::info
Skjemamedlemmer med rollen **Admin** eller **View Only** kan åpne fanen **Form Submissions**. Sørg for at de rette personene i teamet ditt har tilgang til skjemaene de trenger, ved å administrere roller i fanen **Form Members**.
:::

:::info
Hvis et frittstående skjema er [knyttet til en gruppe](./creating-forms.md#linking-a-form-to-a-group), kan gruppens ledere lese og skrive ut innsendingene fra gruppens side på B1.church, uten å være skjemamedlemmer. Ledere kan også lese svarene på påmeldingsspørsmål til gruppens arrangementer der. Se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Hvis et **frittstående** skjema er satt til å opprette en personpost, vises eventuelle innsendinger som er koblet til en eksisterende person også i seksjonen **Forms** på den personens side i People – ikke bare skjemaer av typen People.
:::

## Neste steg {#next-steps}

- Lær hvordan du bygger og tilpasser skjemaer i [Opprette skjemaer](./creating-forms.md)
- Legg til personer fra skjemainnsendinger i [personregisteret ditt](../people/adding-people.md) for videre oppfølging
- [Knytt et skjema til en gruppe](./creating-forms.md#linking-a-form-to-a-group) slik at lederne kan lese svarene, eller [legg til innsendere i gruppen automatisk](./creating-forms.md#automatically-adding-submitters-to-a-group) slik at et frittstående påmeldingsskjema bygger sin egen deltakerliste
