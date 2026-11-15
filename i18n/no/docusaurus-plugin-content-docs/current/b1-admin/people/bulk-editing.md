---
title: "Masseredigering av personer"
description: "Oppdater medlemsstatus, sivilstatus, kjønn, valg om å stå utenfor katalogen, kampus, ja/nei-egendefinerte felt eller grupper for mange personer samtidig i B1 Admin."
---

# Masseredigering av personer

<div class="article-intro">
Masseredigering lar deg oppdatere flere personer samtidig, og sparer tid når du gjør den samme endringen for mange. Du kan oppdatere medlemsstatus, sivilstatus, kjønn, valg om å stå utenfor katalogen, kampus, ja/nei-egendefinerte felt, gruppemedlemskap og arbeidsflyter i én operasjon, eller slette personer.
</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere personopplysninger. Se [Roller og tillatelser](./roles-permissions.md) for detaljer.
- Du bør allerede ha lagt til eller importert personene du vil redigere. Se [Legge til personer](./adding-people.md) om nødvendig.
</div>

## Velge personer for masseredigering {#selecting-people-for-bulk-editing}

1. Gå til **Personer** i B1 Admin
2. Bruk søke- eller filterverktøyene for å finne personene du vil oppdatere
3. Kryss av i boksene for å velge personer
   - I visningen **Husstander** velger du alle i en husstand ved å krysse av for husstanden
   - I visningen **Tabell** (bytt med bryteren **Vis som**) kan du velge personer enkeltvis
   - Eller bruk avmerkingsboksen over listen for å velge alle synlige personer
4. Når du har valgt minst én person, viser linjen over listen hvor mange som er valgt, sammen med **Fjern valg** og en knapp **Handlinger**

:::tip
Hvis du trenger å oppdatere en stor gruppe personer basert på bestemte kriterier, bruk funksjonen [AI-søk](./ai-search.md) eller filtre for å snevre inn listen først. Velg deretter alle som passer.
:::

## Tilgjengelige masseoperasjoner {#available-bulk-actions}

Menyen **Handlinger** har alternativene nedenfor. Hvert av dem åpner en liten dialog som viser hvor mange personer den vil endre. Velg en verdi og klikk på **Bruk**. Den nye verdien erstatter det hver valgte person hadde før. Når det er ferdig, bekrefter en melding nederst på siden hvor mange personer som ble oppdatert.

### Sett medlemsstatus {#set-membership-status}

1. Klikk på **Handlinger** → **Sett medlemsstatus**
2. Velg den nye **Medlemsstatusen**:
   - **Besøkende**: førstegangs- eller sporadiske deltakere
   - **Gjest**: gjester, for eksempel familier som er registrert på en innsjekkingsterminal
   - **Fast deltaker**: hyppige deltakere som ikke er medlemmer
   - **Medlem**: offisielle medlemmer av kirken
   - **Ansatt**: ansatte i kirken
   - **Inaktiv**: personer som ikke lenger deltar
   - **Død**: personer som har gått bort
3. Klikk på **Bruk**

### Sett sivilstatus {#set-marital-status}

1. Klikk på **Handlinger** → **Sett sivilstatus**
2. Velg **Ukjent**, **Ugift**, **Gift**, **Skilt** eller **Enke/enkemann**
3. Klikk på **Bruk**

### Sett kjønn {#set-gender}

1. Klikk på **Handlinger** → **Sett kjønn**
2. Velg **Ikke oppgitt**, **Mann** eller **Kvinne**
3. Klikk på **Bruk**

### Sett valg om å stå utenfor katalogen {#set-directory-opt-out}

Valget om å stå utenfor katalogen styrer om personer vises i medlemskatalogen: [utskriftskatalogen](./print-directory.md) og medlemskatalogen i B1-appen. Det er den samme innstillingen som **Skjul meg fra medlemskatalogen** på en persons post.

1. Klikk på **Handlinger** → **Sett valg om å stå utenfor katalogen**
2. Velg **Valgt bort ja** for å skjule de valgte personene fra katalogen, eller **Valgt bort nei** for å vise dem igjen
3. Klikk på **Bruk**

:::warning
Personer som har valgt å skjule seg fra katalogen, bør forbli skjult med mindre de ber om å bli oppført igjen.
:::

### Sett kampus {#set-campus}

Dette alternativet vises når kirken din har satt opp [kampuser](../settings/campuses.md).

1. Klikk på **Handlinger** → **Sett kampus**
2. Velg kampusen
3. Klikk på **Bruk**

### Sett egendefinert felt {#set-custom-field}

Sett en ja/nei-verdi for et [egendefinert felt](../settings/custom-fields.md) for alle valgte personer samtidig:

1. Klikk på **Handlinger** → **Sett egendefinert felt**.
2. Velg det ja/nei-baserte **egendefinerte feltet** du vil sette.
3. Velg **Verdi** (**Ja** eller **Nei**) som skal brukes.
4. Klikk på **Bruk**.

:::info
Bare ja/nei-egendefinerte felt er tilgjengelige for denne masseoperasjonen. For å sette andre feltyper, rediger hver person enkeltvis. Hvis kirken din ikke har noen ja/nei-egendefinerte felt, sier dialogen fra.
:::

### Legg til i gruppe {#add-to-group}

1. Klikk på **Handlinger** → **Legg til i gruppe**
2. Velg **Gruppen** du vil legge personene til i. Hvis du vil legge dem i en helt ny gruppe i stedet, kryss av for **Opprett ny gruppe** og skriv inn et **Nytt gruppenavn**.
3. Klikk på **Bruk**

Hver person legges til som et vanlig medlem av gruppen. Du kan senere gjøre enkeltpersoner til gruppeledere fra siden [Gruppemedlemmer](../groups/group-members.md). Hvis du vil legge personer til i flere grupper, gjentar du dette for hver gruppe.

### Fjern fra gruppe {#remove-from-group}

1. Klikk på **Handlinger** → **Fjern fra gruppe**
2. Velg **Gruppen** du vil fjerne personene fra
3. Klikk på **Bruk**

:::info
Denne handlingen fjerner bare personene fra gruppen. Den sletter ikke personpostene deres.
:::

### Legg til i arbeidsflyt {#add-to-workflow}

Legg de valgte personene til i en [arbeidsflyt](../serving/workflows.md) som kort:

1. Klikk på **Handlinger** → **Legg til i arbeidsflyt**
2. Velg arbeidsflyten
3. Klikk på **Bruk**

### Slett personer {#delete-people}

Slett de valgte personene fra kirkens database:

1. Klikk på **Handlinger** → **Slett**
2. Dialogen **Slett valgte personer** ber deg bekrefte hvor mange personer som slettes
3. Klikk på **Slett**

:::danger
Slettede personer forsvinner fra katalogen, gruppene og søkene dine. Bruk bare denne handlingen hvis du er helt sikker på at du vil fjerne disse personene fra systemet.
:::

Du kan ikke velge deg selv, så du kan ikke slette eller masseredigere din egen post i bulk.


## Beste praksis {#best-practices}

- **Start i det små**: Test masseoperasjoner på noen få poster først, for å være sikker på at du gjør de riktige endringene
- **Bruk filtre**: Snevre inn listen med filtre eller AI-søk før du velger personer, slik at du bare oppdaterer de rette personene
- **Dobbeltsjekk valgene**: Gå gjennom de valgte personene før du bruker masseendringer
- **Dokumenter store endringer**: Før notater om masseoppdateringer, i tilfelle du trenger å se tilbake på dem senere
- **Koordiner med teamet ditt**: Gi beskjed til andre administratorer når du gjør store masseendringer

## Vanlige bruksområder {#common-use-cases}

### Oppdatere nye medlemmer {#updating-new-members}

Etter en medlemsklasse oppdaterer du alle deltakerne til medlemsstatus:

1. Søk etter personene som deltok i klassen
2. Velg alle sammen
3. Bruk **Handlinger** → **Sett medlemsstatus** → **Medlem**

### Organisere smågrupper {#organizing-small-groups}

Legg flere personer til i en ny smågruppe:

1. Søk etter personene du vil ha i gruppen
2. Velg dem
3. Bruk **Handlinger** → **Legg til i gruppe** og velg smågruppen

### Rydde opp i data {#cleaning-up-data}

Merk en gruppe tidligere deltakere som inaktive:

1. Åpne **Avansert** søk og filtrer for personene du vil oppdatere (for eksempel alle som ikke har deltatt nylig)
2. Velg dem
3. Bruk **Handlinger** → **Sett medlemsstatus** → **Inaktiv**

## Relaterte artikler {#related-articles}

- [Søke etter personer](./searching-people.md): finn personer å redigere
- [AI-søk](./ai-search.md): bruk naturlig språk for å finne bestemte grupper av personer
- [Gruppemedlemmer](../groups/group-members.md): administrer gruppemedlemskap
- [Eksportere data](./exporting-data.md): eksporter personopplysninger før masseendringer
