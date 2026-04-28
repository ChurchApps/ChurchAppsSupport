---
title: "Revision log"
---

# Revision log

<div class="article-intro">

Revision loggen sporer alle vigtige handlinger og ændringer på tværs af dit kirke administrationssystem. Brug det til at gennemgå login aktivitet, spore hvem der gjorde ændringer til folk registreringer, overvåge tilladelse opdateringer og vedligeholde ansvar på tværs af dit hold.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- B1 Admin-konto med server admin adgang
- Gå til **Indstillinger** for at finde revision loggen

</div>

## Se revision loggen

1. Gå til **Indstillinger** i B1 Admin.
2. Vælg **revision log**.
3. Loggen viser seneste poster i en tabel med følgende søjler:
   - **dato** -- Når handlingen fandt sted.
   - **kategori** -- Handlingstypen (farve-kodet for hurtig scanning).
   - **handling** -- Hvad der blev gjort (f.eks. opret, opdater, slet, login_success).
   - **enhed** -- Type og ID for den registrering som blev påvirket.
   - **IP-adresse** -- IP-adressen for brugeren som udfører handlingen.
   - **detaljer** -- En sammendrag af de specifikke ændringer gjort.

## Filter loggen

Brug filtrene øverst på siden for at indsnævre resultaterne:

- **kategori** -- Filter efter handlingstype:
  - **alle kategorier** -- Vise alt.
  - **login** -- Login succeser og fejl.
  - **folk** -- Oprettelse, opdatering eller sletning af folk registreringer.
  - **tilladelser** -- Tilladelse rettelser og tilbagekaldelser.
  - **donationer** -- Donation registrering ændringer.
  - **grupper** -- gruppe administrations handlinger.
  - **formularer** -- Form indsendelse aktivitet.
  - **Indstillinger** -- Konfiguration ændringer.
- **startdato** -- Vise poster fra denne dato fremad.
- **slutdato** -- Vise poster op til denne dato.

Klik **søg** efter indstilling dine filtre for at opdatere resultaterne.

## Forstå kategorier

Hver kategori er farve-kodet til hurtig identifikation:

- **login** -- Blå chip. Spor vellykkede og mislykkede login forsøg.
- **folk** -- Lilla chip. Spor folk registrering oprettelser, opdaterings og sletninger.
- **tilladelser** -- Rød chip. Spor når adgangsrettigheder gis eller tilbagekaldes.
- **donationer** -- Grøn chip. Spor donation registrering ændringer.
- **grupper** -- grå chip. Spor gruppe administrations operationer.
- **formularer** -- orange chip. Spor form indsendelse aktivitet.
- **Indstillinger** -- gul chip. Spor konfiguration ændringer.

## Eksportér loggen

Når log poster bliver vist, en **CSV download** knap vises. Klik den for at eksportere de nuværende filtrerede resultater til et regneark til offline gennemgangen eller journalføring.

## sidepaginering

Brug paginerings kontrollerne i bunden af tabellen for at navigere gennem resultaterne. Du kan vise 25, 50 eller 100 poster pr. side.

:::info
Revision log poster automatisk fastholdes i et år. Poster ældre end 365 dage er fjernet for at holde systemet performant.
:::

:::tip
Gennemgå revision loggen regelmæssigt, især efter onboarding nye holmedlemmer eller foretage betydelige konfiguration ændringer. Det hjælper med at identificere uventet aktivitet tidligt.
:::

## Relaterede artikler

- [roller og tilladelser](../settings/roles-permissions) -- Administrer hvem der har adgang til hvad
- [datasikkerhed](../settings/data-security) -- Forstå hvordan dine data er beskyttet
- [rapporter oversigt](./index.md) -- Se alle tilgængelige rapporter
