---
title: "Brug af sideeditoren"
---

# Brug af sideeditoren

<div class="article-intro">

B1-sideeditoren er en visuel drag-and-drop-builder, der lader dig designe din kirkes hjemmesidesider uden at skrive kode. Du kan tilføje sektioner og indholdsblokke, tilpasse typografier, forhåndsvise dit arbejde og fortryde ændringer -- alt sammen inde fra din browser.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Gennemfør [Indledende opsætning](initial-setup) for at få din hjemmeside konfigureret
- Opret mindst én side i [Administrer sider](managing-pages)
- Du skal have tilladelsen **content.edit** for at få adgang til editoren

</div>

## Åbne editoren

1. Klik på **Hjemmeside** i venstremenuen i B1 Admin.
2. Find den side, du vil redigere, i sidetabellen, og klik på **Rediger**.

Editoren åbner i fuldskærmstilstand. Det venstre panel viser din sidestruktur og tilgængelige indholdselementer; midterområdet viser en live forhåndsvisning af din side.

:::info
Editoren vises altid i lyst tema, uanset din temaindstilling i B1 Admin. Dette sikrer, at forhåndsvisningen nøjagtigt matcher, hvordan din side vil se ud for hjemmesidebesøgende.
:::

## Sidestruktur: sektioner og elementer

Hver side er bygget op af to niveauer:

- **Sektioner** -- De øverste containere, der opdeler din side i vandrette bånd (for eksempel en hero-sektion, en indholdsblok eller en footer-stribe). Hver side skal have mindst én sektion, før du kan tilføje indhold.
- **Elementer** -- De individuelle indholdsdele, der placeres inde i en sektion, såsom tekst, billeder, knapper, kort, formularer og kalendere.

### Tilføje en sektion

1. Klik på **Tilføj sektion** (eller **+**-knappen øverst i venstre panel).
2. Vælg, hvordan du vil starte:
   - **Fra en skabelon** — gennemse skabelongalleriet for sektioner, organiseret efter kategori (Hero, Om, Tjenester, Giving osv.), og klik på én for at indsætte den som en fuldt stylet, forududfyldt sektion. Du kan tilpasse alt, efter den er tilføjet.
   - **Tom sektion** — vælg et kolonnelayout (enkelt, to kolonner, tre kolonner osv.), og byg fra bunden.
3. Den nye sektion vises i forhåndsvisningen. Klik på den for at vælge den og konfigurere dens baggrundsfarve, padding og andre typografiindstillinger.

### Tilføje elementer til en sektion

1. Klik inde i en sektion i forhåndsvisningen for at vælge den.
2. Klik på **Tilføj indhold**, og vælg en elementtype fra listen:
   - **Tekst** -- Overskrifter, afsnit og rig tekst
   - **Billede** -- Upload eller link til et foto
   - **Knap** -- Et klikbart call-to-action-link
   - **Kort** -- Et billede med en titel og beskrivelse
   - **Formular** -- Indlejr en [formular](../forms/creating-forms) direkte på siden
   - **Kalender** -- Vis en begivenhedskalender
   - **FAQ** -- Harmonika-stil spørgsmål-og-svar-blokke
   - **Video** -- Indlejr en video via URL
   - **Gruppeoversigt** -- Et filtrerbart katalog over alle kirkens grupper med valgfri søgning, kategorifilter og labelfilter
   - **Ikon-funktion** -- Et ikon med en titel og kort beskrivelse, til fremhævelse af funktioner eller tjenester
   - **Galleri** -- Et gitter- eller mursten-layout med flere fotos
   - **Testimonial** -- Ét eller flere citater med forfatterens navn, rolle og foto
   - **Sociale ikoner** -- Linkede ikoner til din kirkes profiler på sociale medier
   - **Nedtælling** -- En timer, der tæller ned til en dato eller et ugentligt gudstjenestetidspunkt
   - **Statistik** -- En række store tal med labels (medlemmer, år, campusser)
   - **Kampagnefremgang** -- En live fremgangslinje for en givningskampagne, der viser det samlede indsamlede beløb mod et fondsmål
   - **Personalegitter** -- Fotokort til medlemmerne af en gruppe; gruppen skal have sin indstilling for **offentlig medlemsliste** slået til
   - **Gudstjenestetider** -- Dine campusers gudstjenesteskema, hentet automatisk fra fremmødeopsætningen
   - **Prædikener** -- Dit prædikenbibliotek, som en fuld browser eller et gitter-, liste- eller fremhævet-seneste-layout
3. Konfigurer elementet ved hjælp af det indstillingspanel, der vises.

### Omarrangere indhold

Træk sektioner eller elementer ved hjælp af håndtag-ikonet (seks prikker) i venstre side af hvert element for at omarrangere dem. Du kan trække elementer inden for en sektion eller flytte dem mellem sektioner.

## Style din side

### Sektionsstile

Klik på en vilkårlig sektion for at åbne dens stylingpanel. Du kan indstille:

- **Baggrund** -- Ensfarvet, gradient eller billede. Når du bruger et billede som baggrund, lader en **fokuspunkt**-vælger dig klikke for at angive, hvilken del af billedet der forbliver centreret, mens sektionen skalerer, og en **overlay**-farveindstilling lader dig tilføje en semitransparent tone over billedet for at forbedre tekstens læsbarhed.
- **Padding** -- Afstand foroven og forneden inde i sektionen
- **Bredde** -- Fuld bredde eller centreret/begrænset
- **Dividere** -- Dekorative formdividere (bølge, skrå, kurve, trekant og flere) på sektionens øverste eller nederste kant, med indstillinger for farve, højde og vending

### Elementstile

Klik på et vilkårligt element for at åbne dets stylingpanel. Almindelige indstillinger inkluderer skriftstørrelse, farve, justering, margin og padding. For billeder kan du angive alt-tekst og linkmål.

### Brugerdefineret CSS

Til avanceret styling har hver sektion og hvert element et felt til **Brugerdefineret CSS**, hvor du kan skrive dine egne CSS-regler. Disse er afgrænset til det pågældende element, så de ikke utilsigtet påvirker resten af siden.

:::tip
Hvis du skal anvende typografier på tværs af hele dit websted -- som en brugerdefineret skrifttype eller en global farve -- skal du bruge indstillingerne under [Udseende](appearance) i stedet for brugerdefineret CSS på individuelle sider.
:::

## Forhåndsvise din side

Brug forhåndsvisningskontrollerne i værktøjslinjen for at se, hvordan din side ser ud på forskellige skærmstørrelser:

- **Desktop** -- Fuld bredde browservisning
- **Mobil** -- Smal, telefonstørrelse visning

Klik på **Forhåndsvisning** for at åbne en live version af siden i en ny browserfane, præcis som besøgende vil se den.

## Fortryde ændringer

Editoren sporer automatisk din redigeringshistorik. Brug værktøjslinjeknapperne eller tastaturgenveje til at navigere:

- **Fortryd** (Ctrl+Z / Cmd+Z) -- Tilbagefør din seneste handling
- **Gentag** (Ctrl+Y / Cmd+Y) -- Genanvend en fortrudt handling

Du kan også gendanne siden til et tidligere øjebliksbillede. Klik på **Historik** i værktøjslinjen for at se en liste over gemte øjebliksbilleder med beskrivelser, og klik på et vilkårligt element for at gendanne til det tidspunkt.

:::warning
Gendannelse af et øjebliksbillede erstatter dit nuværende sideindhold med øjebliksbilledets version. Dette kan ikke fortrydes med den almindelige fortryd-knap. Gem et øjebliksbillede af din nuværende tilstand, før du gendanner en gammel én, hvis du vil bevare muligheden for at vende tilbage.
:::

## Gemme og publicere

Ændringer gemmes automatisk, mens du arbejder. En statusindikator i værktøjslinjen viser, om dine ændringer er gemt.

### Kladde- og publiceret tilstand

Sider kan have en **publiceret** tilstand, som styrer, hvornår besøgende ser dine ændringer. Værktøjslinjen viser en status-chip, der viser den aktuelle tilstand:

- **Live ved gem** -- Siden bruger ikke en publiceringsworkflow. Hver gemt ændring går live øjeblikkeligt. Dette er standard for nye sider.
- **Upublicerede ændringer** -- Siden er blevet publiceret før, men du har lavet ændringer siden den seneste publicering. Besøgende ser stadig den tidligere publicerede version.
- **Publiceret** -- Siden er live, og dit gemte indhold matcher, hvad besøgende ser.

For at publicere dine ændringer skal du klikke på knappen **Publicer** i værktøjslinjen. Siden bliver live øjeblikkeligt.

For at vende tilbage til den senest publicerede version uden at påvirke, hvad besøgende ser, skal du åbne overløbsmenuen (⋮) og klikke på **Kassér ændringer**.

For at tage en side helt offline skal du åbne overløbsmenuen og klikke på **Afpublicer**. Besøgende vil ikke længere se den side, før du publicerer den igen.

:::tip
Brug kladde-/publiceringsworkflowet, når du vil forberede en side -- for eksempel til en kommende begivenhed -- og først gøre den live på det rette tidspunkt. Byg og forhåndsvis siden, og klik derefter på Publicer, når du er klar.
:::

## Relaterede artikler

- [Administrer sider](managing-pages) -- Opret sider, angiv URL'er, og administrer webstedsnavigation
- [Udseende](appearance) -- Angiv webstedsdækkende farver, skrifttyper og branding
- [Filer](files) -- Upload billeder og dokumenter til brug i editoren
- [Opret formularer](../forms/creating-forms) -- Byg formularer, du kan indlejre på sider
