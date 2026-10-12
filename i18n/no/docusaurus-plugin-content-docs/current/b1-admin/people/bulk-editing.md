---
title: "Masseredigering av personer"
---

# Masseredigering av personer

<div class="article-intro">
Masseredigering lar deg oppdatere flere personer samtidig, og sparer tid når du skal gjøre den samme endringen for mange. Du kan oppdatere medlemsstatus, sivilstatus, kjønn, reservasjonsvalg og gruppemedlemskap i én operasjon.
</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger tillatelse til å administrere personopplysninger. Se [Roller og tillatelser](./roles-permissions.md) for detaljer.
- Du bør ha lagt til eller importert personene du vil redigere. Se [Legge til personer](./adding-people.md) om nødvendig.
</div>

## Velge personer for masseredigering

1. Gå til **Personer** i B1 Admin
2. Bruk søke- eller filterverktøyene for å finne personene du vil oppdatere
3. Kryss av i boksene for å velge personer
   - I visningen **Husstander** velger du alle i en husstand ved å krysse av for husstanden
   - I visningen **Tabell** (bytt med bryteren **Vis som**) kan du velge personer enkeltvis
   - Eller bruk avkrysningsboksen over listen for å velge alle synlige personer
4. Når du har valgt minst én person, viser linjen over listen hvor mange som er valgt, sammen med **Fjern valg** og en knapp **Handlinger**

:::tip
Hvis du skal oppdatere en stor gruppe personer basert på bestemte kriterier, bruk [AI-søk](./ai-search.md) eller filtre for å snevre inn listen først, og velg deretter alle som passer.
:::

## Tilgjengelige massehandlinger

Menyen **Handlinger** gir flere alternativer:

### Oppdatere medlemsstatus

Oppdater medlemsstatusen for alle valgte personer:

1. Klikk på **Handlinger** → **Sett medlemsstatus**
2. Velg den nye statusen:
   - **Besøkende** -- Førstegangs- eller sporadiske gjester
   - **Gjest** -- Gjester, for eksempel familier som er registrert ved en innsjekkingskiosk
   - **Fast deltaker** -- Hyppige deltakere som ikke er medlemmer
   - **Medlem** -- Offisielle medlemmer av menigheten
   - **Ansatt** -- Ansatte i menigheten
   - **Inaktiv** -- Personer som ikke lenger deltar
   - **Avdød** -- Personer som har gått bort
3. Velg oppdateringsmodus:
   - **Overskriv alle** -- Erstatt gjeldende status for alle valgte personer
   - **Oppdater bare tomme** -- Sett status bare for personer som ikke har en
4. Klikk på **Oppdater**

### Oppdatere sivilstatus

Oppdater sivilstatus i bulk:

1. Klikk på **Handlinger** → **Sett sivilstatus**
2. Velg den nye statusen:
   - **Ukjent**
   - **Enslig**
   - **Gift**
   - **Skilt**
   - **Enke/enkemann**
3. Velg om eksisterende verdier skal overskrives, eller om bare tomme felt skal oppdateres
4. Klikk på **Oppdater**

### Oppdatere kjønn

Oppdater kjønnsopplysninger for flere personer:

1. Klikk på **Handlinger** → **Sett kjønn**
2. Velg verdien:
   - **Ikke spesifisert**
   - **Mann**
   - **Kvinne**
3. Velg oppdateringsmodus (overskriv alle eller bare tomme)
4. Klikk på **Oppdater**

### Oppdatere reservasjonsstatus

Styr om personer har reservert seg mot kommunikasjon:

1. Klikk på **Handlinger** → **Sett reservasjon i katalogen**
2. Velg:
   - **Nei** -- Tillat kommunikasjon (fjern reservasjonen)
   - **Ja** -- Blokker kommunikasjon (sett reservasjonen)
3. Velg oppdateringsmodus
4. Klikk på **Oppdater**

:::warning
Vær forsiktig når du endrer reservasjonsstatus. Personer som uttrykkelig har reservert seg, skal ikke motta kommunikasjon uten at de har gitt nytt samtykke.
:::

### Sette egendefinert felt

Sett en verdi for et Ja/Nei-[egendefinert felt](../settings/custom-fields.md) for alle valgte personer samtidig:

1. Klikk på **Handlinger** → **Sett egendefinert felt**.
2. Velg det egendefinerte Ja/Nei-feltet du vil sette.
3. Velg verdien (**Ja** eller **Nei**) som skal brukes.
4. Klikk på **Oppdater**.

:::info
Bare Ja/Nei-felt kan settes med denne massehandlingen. For å sette andre felttyper må du redigere hver person enkeltvis.
:::

### Legge til i gruppe

Legg alle valgte personer til i en eller flere grupper:

1. Klikk på **Handlinger** → **Legg til i gruppe**
2. Søk etter og velg gruppen(e) personene skal legges til i
3. Du kan velge flere grupper og legge personene til i alle sammen
4. Klikk på **Legg til i grupper**

Hver person legges til som vanlig medlem i den valgte gruppen(e). Du kan senere gjøre enkeltpersoner til gruppeledere ved behov, fra siden [Gruppemedlemmer](../groups/group-members.md).

### Fjerne fra gruppe

Fjern alle valgte personer fra en eller flere grupper:

1. Klikk på **Handlinger** → **Fjern fra gruppe**
2. Søk etter og velg gruppen(e) personene skal fjernes fra
3. Du kan velge flere grupper
4. Klikk på **Fjern fra grupper**

:::info
Denne handlingen fjerner bare personene fra de angitte gruppene. Den sletter ikke personpostene deres.
:::

### Slette personer

Slett de valgte personene permanent fra menighetens database:

1. Klikk på **Handlinger** → **Slett**
2. Dialogen **Slett valgte personer** ber deg bekrefte hvor mange personer som skal slettes
3. Klikk på **Slett**

:::danger
Sletting av personer er permanent og kan ikke angres. Dette fjerner all data om dem, inkludert:
- Personopplysninger
- Gruppemedlemskap
- Oppmøteregistreringer
- Gavehistorikk
- Skjemainnsendinger

Bruk bare denne handlingen hvis du er helt sikker på at du vil fjerne disse personene fra systemet.
:::

## Resultater av masseredigering

Etter at du har utført en massehandling, får du en oppsummering som viser:

- **Totalt valgt** -- Hvor mange personer som var med i operasjonen
- **Oppdatert** -- Hvor mange poster som ble endret
- **Mislyktes** -- Poster som ikke kunne oppdateres (hvis aktuelt)
- **Uendret** -- Poster som ikke trengte endringer (for eksempel når modusen «oppdater bare tomme» er brukt)

Hvis noen oppdateringer mislyktes, får du feildetaljer som forklarer hvorfor.

## Beste praksis

- **Start i det små** -- Test massehandlinger på noen få poster først, slik at du er sikker på at endringene er riktige
- **Bruk filtre** -- Snevre inn listen med filtre eller AI-søk før du velger personer, slik at du bare oppdaterer de rette personene
- **Dobbeltsjekk valgene** -- Gå gjennom de valgte personene før du bruker massendringer
- **Bruk modusen «oppdater bare tomme»** -- Når du vil fylle inn manglende data uten å overskrive eksisterende opplysninger
- **Dokumenter større endringer** -- Før notater om massoppdateringer, i tilfelle du trenger å se på dem senere
- **Samordne med teamet ditt** -- Gi beskjed til andre administratorer når du gjør store massendringer

## Vanlige bruksområder

### Oppdatere nye medlemmer

Etter en medlemsklasse, oppdater alle deltakerne til medlemsstatus:

1. Søk etter personene som deltok i klassen
2. Velg dem alle
3. Bruk **Handlinger** → **Sett medlemsstatus** → **Medlem**

### Organisere smågrupper

Legg flere personer til i en ny smågruppe:

1. Søk etter personene du vil ha med i gruppen
2. Velg dem
3. Bruk **Handlinger** → **Legg til i gruppe** og velg smågruppen

### Rydde opp i data

Fyll inn manglende sivilstatus for ektepar:

1. Filtrer på personer som er gift (ved hjelp av husstandsinformasjon)
2. Velg de som har tom sivilstatus
3. Bruk **Handlinger** → **Sett sivilstatus** → **Gift** → **Oppdater bare tomme**

## Relaterte artikler

- [Søke etter personer](./searching-people.md) -- Finn personer å redigere
- [AI-søk](./ai-search.md) -- Bruk naturlig språk for å finne bestemte grupper av personer
- [Gruppemedlemmer](../groups/group-members.md) -- Administrer gruppemedlemskap
- [Eksportere data](./exporting-data.md) -- Eksporter personopplysninger før massendringer
