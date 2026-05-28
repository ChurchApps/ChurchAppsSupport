---
title: "Masseredigering av personer"
---

# Masseredigering av personer

<div class="article-intro">
Masseredigering lar deg oppdatere flere personer samtidig, noe som sparer tid når du gjør samme endring på mange individer. Du kan oppdatere medlemskapsstatus, sivilstatus, kjønn, avmeldingspreferanser og gruppemedlemskap i én enkelt operasjon.
</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere persondata. Se [Roller og tillatelser](./roles-permissions.md) for detaljer.
- Du bør allerede ha lagt til eller importert personene du vil redigere. Se [Legge til personer](./adding-people.md) om nødvendig.
</div>

## Velge personer for masseredigering

1. Naviger til **Personer** i B1 Admin
2. Bruk søke- eller filterverktøyene for å finne personene du vil oppdatere
3. Kryss av i boksene ved siden av hver persons navn for å velge dem
   - Du kan velge personer individuelt
   - Eller bruk overskriftsboksen for å velge alle synlige personer på gjeldende side
4. Når du har valgt minst én person, vil **Massehandlinger**-knappen vises

:::tip
Hvis du trenger å oppdatere en stor gruppe personer basert på spesifikke kriterier, bruk [AI-søk](./ai-search.md)-funksjonen eller filtre for å innsnevre listen din først, og velg deretter alle matchende personer.
:::

## Tilgjengelige massehandlinger

**Massehandlinger**-menyen gir flere alternativer:

### Oppdater medlemskapsstatus

Oppdater medlemskapsstatusen for alle valgte personer:

1. Klikk **Massehandlinger** → **Sett medlemskapsstatus**
2. Velg den nye statusen:
   - **Besøkende** -- Førstegangs- eller sporadiske deltakere
   - **Fast deltaker** -- Hyppige deltakere som ikke er medlemmer
   - **Medlem** -- Offisielle kirkemedlemmer
   - **Ansatt** -- Kirkeansatte
   - **Inaktiv** -- Personer som ikke lenger deltar
3. Velg oppdateringsmodus:
   - **Overskriv alle** -- Erstatt gjeldende status for alle valgte personer
   - **Bare oppdater tomme** -- Sett bare status for personer som ikke har en
4. Klikk **Oppdater**

### Oppdater sivilstatus

Oppdater sivilstatus i bulk:

1. Klikk **Massehandlinger** → **Sett sivilstatus**
2. Velg den nye statusen:
   - **Ukjent**
   - **Singel**
   - **Gift**
   - **Skilt**
   - **Enke/enkemann**
3. Velg om du vil overskrive eksisterende verdier eller bare oppdatere tomme felt
4. Klikk **Oppdater**

### Oppdater kjønn

Oppdater kjønnsinformasjon for flere personer:

1. Klikk **Massehandlinger** → **Sett kjønn**
2. Velg verdien:
   - **Uspesifisert**
   - **Mann**
   - **Kvinne**
3. Velg oppdateringsmodus (overskriv alle eller bare tomme)
4. Klikk **Oppdater**

### Oppdater avmeldingsstatus

Kontroller om personer har meldt seg av kommunikasjon:

1. Klikk **Massehandlinger** → **Sett avmeldt**
2. Velg:
   - **Nei** -- Tillat kommunikasjon (fjern avmelding)
   - **Ja** -- Blokker kommunikasjon (sett avmelding)
3. Velg oppdateringsmodus
4. Klikk **Oppdater**

:::warning
Vær forsiktig når du endrer avmeldingsstatus. Personer som eksplisitt har meldt seg av, bør ikke motta kommunikasjon med mindre de har gitt nytt samtykke.
:::

### Legg til i gruppe

Legg til alle valgte personer i en eller flere grupper:

1. Klikk **Massehandlinger** → **Legg til i gruppe**
2. Søk etter og velg gruppene du vil legge personer til
3. Du kan velge flere grupper for å legge personer til i alle
4. Klikk **Legg til i grupper**

Hver person vil bli lagt til som et vanlig medlem av den eller de valgte gruppene. Du kan senere forfremme enkeltpersoner til gruppeledere om nødvendig fra [Gruppemedlemmer](../groups/group-members.md)-siden.

### Fjern fra gruppe

Fjern alle valgte personer fra en eller flere grupper:

1. Klikk **Massehandlinger** → **Fjern fra gruppe**
2. Søk etter og velg gruppene du vil fjerne personer fra
3. Du kan velge flere grupper
4. Klikk **Fjern fra grupper**

:::info
Denne handlingen fjerner bare personer fra de angitte gruppene. Den sletter ikke personopptegnelsene deres.
:::

### Slett personer

Slett permanent de valgte personene fra kirkens database:

1. Klikk **Massehandlinger** → **Slett**
2. Gjennomgå listen over personer som vil bli slettet
3. Skriv **DELETE** i bekreftelsesfeltet
4. Klikk **Bekreft sletting**

:::danger
Sletting av personer er permanent og kan ikke angres. Dette vil fjerne alle deres data inkludert:
- Personlig informasjon
- Gruppemedlemskap
- Fremmøteposter
- Donasjonshistorikk
- Skjemainnsendinger

Bruk bare denne handlingen hvis du er helt sikker på at du vil fjerne disse personene fra systemet ditt.
:::

## Masseredigeringsresultater

Etter å ha fullført en massehandling, vil du se et sammendrag som viser:

- **Totalt valgt** -- Hvor mange personer som var inkludert i operasjonen
- **Vellykket oppdatert** -- Hvor mange poster som ble endret
- **Mislyktes** -- Eventuelle poster som ikke kunne oppdateres (hvis aktuelt)
- **Uendret** -- Poster som ikke trengte endringer (f.eks. når du bruker "bare oppdater tomme"-modus)

Hvis noen oppdateringer mislyktes, vil du se feildetaljer som forklarer hvorfor.

## Beste praksis

- **Start i det små** -- Test masseoperasjoner på noen få poster først for å sikre at du gjør de riktige endringene
- **Bruk filtre** -- Innsnevr listen din med filtre eller AI-søk før du velger personer for å sikre at du bare oppdaterer de riktige individene
- **Dobbeltsjekk valg** -- Gjennomgå de valgte personene før du bruker masseendringer
- **Bruk "bare oppdater tomme"-modus** -- Når du vil fylle ut manglende data uten å overskrive eksisterende informasjon
- **Dokumenter store endringer** -- Hold notater om masseoppdateringer i tilfelle du trenger å referere til dem senere
- **Koordiner med teamet ditt** -- La andre administratorer vite når du gjør store masseendringer

## Vanlige brukstilfeller

### Oppdatere nye medlemmer

Etter en medlemsklasse, oppdater alle deltakere til Medlem-status:

1. Søk etter personene som deltok i klassen
2. Velg dem alle
3. Bruk **Massehandlinger** → **Sett medlemskapsstatus** → **Medlem**

### Organisere smågrupper

Legg til flere personer i en ny smågruppe:

1. Søk etter personene du vil ha i gruppen
2. Velg dem
3. Bruk **Massehandlinger** → **Legg til i gruppe** og velg smågruppen

### Rydde opp i data

Fyll ut manglende sivilstatus for gifte par:

1. Filtrer for personer som er gift (ved å bruke husholdningsinformasjon)
2. Velg de med blank sivilstatus
3. Bruk **Massehandlinger** → **Sett sivilstatus** → **Gift** → **Bare oppdater tomme**

## Relaterte artikler

- [Søke etter personer](./searching-people.md) -- Finn personer å redigere
- [AI-søk](./ai-search.md) -- Bruk naturlig språk for å finne spesifikke grupper av personer
- [Gruppemedlemmer](../groups/group-members.md) -- Administrer gruppemedlemskap
- [Eksportere data](./exporting-data.md) -- Eksporter persondata før du gjør masseendringer
