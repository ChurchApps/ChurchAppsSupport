---
title: "Bulk-redigering af folk"
---

# Bulk-redigering af folk

<div class="article-intro">
Bulk-redigering giver dig mulighed for at opdatere flere personer på én gang, hvilket sparer tid, når du foretager den samme ændring for mange personer. Du kan opdatere medlemsstatus, civilstand, køn, fravalgspræferencer og gruppemedlemskaber i én samlet handling.
</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for tilladelse til at administrere persondata. Se [Roller og tilladelser](./roles-permissions.md) for detaljer.
- Du bør allerede have tilføjet eller importeret de personer, du vil redigere. Se [Tilføj folk](./adding-people.md) om nødvendigt.
</div>

## Vælg folk til bulk-redigering

1. Gå til **Folk** i B1 Admin
2. Brug søge- eller filterværktøjerne til at finde de personer, du vil opdatere
3. Markér afkrydsningsfelterne ved siden af hver persons navn for at vælge dem
   - Du kan vælge personer enkeltvis
   - Eller brug afkrydsningsfeltet i headeren for at vælge alle synlige personer på den aktuelle side
4. Så snart du har valgt mindst én person, vises knappen **Bulk-handlinger**

:::tip
Hvis du skal opdatere en stor gruppe af personer baseret på specifikke kriterier, kan du bruge funktionen [AI søgning](./ai-search.md) eller filtre til først at indsnævre din liste, og derefter vælge alle matchende personer.
:::

## Tilgængelige bulk-handlinger

Menuen **Bulk-handlinger** giver flere muligheder:

### Opdater medlemsstatus

Opdater medlemsstatus for alle valgte personer:

1. Klik **Bulk-handlinger** → **Angiv medlemsstatus**
2. Vælg den nye status:
   - **Besøgende** -- Førstegangs- eller lejlighedsvise fremmødte
   - **Fast fremmødt** -- Hyppige fremmødte, der ikke er medlemmer
   - **Medlem** -- Officielle kirkemedlemmer
   - **Personale** -- Kirkens personale
   - **Inaktiv** -- Personer, der ikke længere deltager
3. Vælg opdateringstilstand:
   - **Overskriv alle** -- Erstat den nuværende status for alle valgte personer
   - **Opdater kun tomme** -- Angiv kun status for personer, der ikke har en
4. Klik **Opdater**

### Opdater civilstand

Opdater civilstand i bulk:

1. Klik **Bulk-handlinger** → **Angiv civilstand**
2. Vælg den nye status:
   - **Ukendt**
   - **Single**
   - **Gift**
   - **Skilt**
   - **Enke/enkemand**
3. Vælg om du vil overskrive eksisterende værdier eller kun opdatere tomme felter
4. Klik **Opdater**

### Opdater køn

Opdater kønsoplysninger for flere personer:

1. Klik **Bulk-handlinger** → **Angiv køn**
2. Vælg værdien:
   - **Uspecificeret**
   - **Mand**
   - **Kvinde**
3. Vælg opdateringstilstand (overskriv alle eller kun tomme)
4. Klik **Opdater**

### Opdater fravalgsstatus

Kontrollér, om personer har fravalgt kommunikation:

1. Klik **Bulk-handlinger** → **Angiv fravalgt**
2. Vælg:
   - **Nej** -- Tillad kommunikation (fjern fravalg)
   - **Ja** -- Blokér kommunikation (angiv fravalg)
3. Vælg opdateringstilstand
4. Klik **Opdater**

:::warning
Vær forsigtig, når du ændrer fravalgsstatus. Personer, der eksplicit har fravalgt, bør ikke modtage kommunikation, medmindre de har givet nyt samtykke.
:::

### Tilføj til gruppe

Tilføj alle valgte personer til én eller flere grupper:

1. Klik **Bulk-handlinger** → **Tilføj til gruppe**
2. Søg efter og vælg den/de gruppe(r), du vil tilføje personer til
3. Du kan vælge flere grupper for at tilføje personer til dem alle
4. Klik **Tilføj til grupper**

Hver person tilføjes som et almindeligt medlem af den/de valgte gruppe(r). Du kan senere forfremme enkeltpersoner til gruppeledere, hvis nødvendigt, fra siden [Gruppedlemmer](../groups/group-members.md).

### Fjern fra gruppe

Fjern alle valgte personer fra én eller flere grupper:

1. Klik **Bulk-handlinger** → **Fjern fra gruppe**
2. Søg efter og vælg den/de gruppe(r), du vil fjerne personer fra
3. Du kan vælge flere grupper
4. Klik **Fjern fra grupper**

:::info
Denne handling fjerner kun personer fra de angivne grupper. Den sletter ikke deres personregistreringer.
:::

### Slet folk

Slet de valgte personer permanent fra din kirkedatabase:

1. Klik **Bulk-handlinger** → **Slet**
2. Gennemgå listen over personer, der vil blive slettet
3. Skriv **DELETE** i bekræftelsesfeltet
4. Klik **Bekræft sletning**

:::danger
Sletning af personer er permanent og kan ikke fortrydes. Dette vil fjerne alle deres data, herunder:
- Personlige oplysninger
- Gruppemedlemskaber
- Tilstedeværelsesregistreringer
- Donationshistorik
- Formularindsendelser

Brug kun denne handling, hvis du er helt sikker på, at du vil fjerne disse personer fra dit system.
:::

## Resultater af bulk-redigering

Efter en bulk-handling er gennemført, vil du se et resumé, der viser:

- **Total valgt** -- Hvor mange personer der indgik i handlingen
- **Opdateret uden fejl** -- Hvor mange registreringer der blev ændret
- **Mislykkedes** -- Eventuelle registreringer, der ikke kunne opdateres (hvis relevant)
- **Uændret** -- Registreringer, der ikke krævede ændringer (f.eks. når du bruger tilstanden "Opdater kun tomme")

Hvis nogen opdateringer mislykkedes, vil du se fejldetaljer, der forklarer hvorfor.

## Best practice

- **Start i det små** -- Test bulk-handlinger på nogle få registreringer først for at sikre, at du foretager de rigtige ændringer
- **Brug filtre** -- Indsnævr din liste med filtre eller AI-søgning, før du vælger personer, for at sikre, at du kun opdaterer de rigtige personer
- **Dobbelttjek dine valg** -- Gennemgå de valgte personer, før du anvender bulk-ændringer
- **Brug tilstanden "Opdater kun tomme"** -- Når du vil udfylde manglende data uden at overskrive eksisterende oplysninger
- **Dokumentér større ændringer** -- Før noter om bulk-opdateringer, hvis du senere skal referere til dem
- **Koordinér med dit team** -- Informér andre administratorer, når du foretager store bulk-ændringer

## Almindelige anvendelsestilfælde

### Opdatering af nye medlemmer

Efter et medlemskabskursus skal du opdatere alle deltagere til status Medlem:

1. Søg efter de personer, der deltog i kurset
2. Vælg dem alle
3. Brug **Bulk-handlinger** → **Angiv medlemsstatus** → **Medlem**

### Organisering af smågrupper

Tilføj flere personer til en ny smågruppe:

1. Søg efter de personer, du vil have i gruppen
2. Vælg dem
3. Brug **Bulk-handlinger** → **Tilføj til gruppe**, og vælg smågruppen

### Oprydning af data

Udfyld manglende civilstand for gifte par:

1. Filtrer efter personer, der er gift (ved hjælp af husstandsoplysninger)
2. Vælg dem med tom civilstand
3. Brug **Bulk-handlinger** → **Angiv civilstand** → **Gift** → **Opdater kun tomme**

## Relaterede artikler

- [Søg folk](./searching-people.md) -- Find personer til redigering
- [AI søgning](./ai-search.md) -- Brug naturligt sprog til at finde specifikke grupper af personer
- [Gruppedlemmer](../groups/group-members.md) -- Administrer gruppemedlemskab
- [Eksportér data](./exporting-data.md) -- Eksportér persondata, før du foretager bulk-ændringer
