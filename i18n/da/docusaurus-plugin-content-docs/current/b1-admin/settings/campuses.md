---
title: "Campusser"
---

# Campusser

<div class="article-intro">

Hvis din kirke mødes på mere end ét sted, lader **Campusser** dig registrere, hvilket sted hver person og gruppe hører til. Når de er konfigureret, vises campusser som en mulighed på personprofiler, i opsætning af tilstedeværelse og i dashboardet Demografi. Kirker med flere lokationer kan filtrere, søge og rapportere efter campus i hele B1 Admin.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for tilladelsen **Rediger kirkeindstillinger** for at administrere campusser. Se [Roller og tilladelser](./roles-permissions.md).

</div>

## Åbn campusindstillinger

Gå til **Indstillinger** i venstre sidebar i B1 Admin, og vælg **Campusser** fra indstillingernavigationen. Du vil se en liste over alle konfigurerede campusser med deres navn, placering og tidszone.

## Tilføj et campus

1. Klik **Tilføj campus** (eller **+**-knappen, hvis der ikke findes nogen campusser endnu).
2. Udfyld campusdetaljerne:
   - **Navn** *(påkrævet)* — visningsnavnet, der vises i hele B1 Admin (for eksempel "Hovedcampus" eller "Nordcampus").
   - **Adresse** — campussets gadeadresse (bruges til informativ visning; ikke det samme som din kirkes hovedadresse i Kirkeindstillinger).
   - **By/stat/postnummer** — campussets placering.
   - **Tidszone** — IANA-tidszonen for dette campus (for eksempel *America/Chicago*). Nyttigt, når campusser befinder sig i forskellige tidszoner.
   - **Websted** — en valgfri URL til dette campus' egen webtilstedeværelse.
3. Klik **Gem**.

## Rediger et campus

Klik på en vilkårlig campusrække i listen for at åbne dens redigeringsvindue i panelet til højre. Opdater felterne, og klik **Gem**.

## Slet et campus

Åbn et campus til redigering, og klik **Slet**. Du bliver bedt om at bekræfte. Sletning af et campus fjerner ikke de personer, der er tildelt det — deres campusfelt bliver blot tomt.

## Tildel personer til et campus

Efter oprettelse af campusser kan personalet tildele en person til et campus fra deres profil:

1. Åbn en persons registrering i **Folk**.
2. Klik **Rediger**.
3. Vælg campus fra dropdown-menuen **Campus**.
4. Klik **Gem**.

Du kan også opdatere campus i bulk fra siden Folk. Vælg flere personer, brug **Bulk-redigering**, og angiv campusfeltet for alle på én gang.

## Filtrer efter campus

Så snart campusser er sat op, kan du filtrere på tværs af B1 Admin efter campus:

- **Folk-søgning** — tilføj en campusbetingelse i den avancerede søgning, eller indlæs en [gemt liste](../people/lists.md) afgrænset til et campus.
- **Demografi** — dashboardet [Demografi](../people/demographics.md) viser et campus-ringdiagram, når mindst én person har et tildelt campus.
- **Opsætning af tilstedeværelse** — hver gudstjenestetid i Tilstedeværelse kan knyttes til et campus.

:::tip
Kirker med kun én lokation behøver ikke at konfigurere campusser. Alle campusfunktioner er valgfrie — hvis der ikke findes nogen campusser, vises campusfelter og -diagrammer simpelthen ikke.
:::

## Relaterede artikler

- [Kirkeindstillinger](./church-settings.md) — din kirkes hovedadresse og branding (adskilt fra campusadresser)
- [Demografi](../people/demographics.md) — campus-fordelingsdiagrammet
- [Opsætning af tilstedeværelse](../attendance/setup.md) — knyt gudstjenestetider til et campus
- [Bulk-redigering](../people/bulk-editing.md) — tildel campus til mange personer på én gang
