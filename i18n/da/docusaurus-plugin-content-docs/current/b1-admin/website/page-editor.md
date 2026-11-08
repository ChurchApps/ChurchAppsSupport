---
title: "Sådan bruger du sideeditoren"
description: "Opsæt en sideeditor i B1 Admin ved at tilføje sektioner og elementer, style dem, forhåndsvise på mobil og publicere kladder. Dækker også fortryd og versionshistorik."
---

# Sådan bruger du sideeditoren

<div class="article-intro">

Sideeditoren i B1 er en visuel byggeværktøj med træk-og-slip, som lader dig designe dine kirkes websidesider uden at skrive kode. Du kan tilføje sektioner og indholdsblokke, tilpasse stilarter, forhåndsvise dit arbejde og fortryde ændringer -- alt sammen direkte i din browser.

</div>

## Træningsvideo

<YouTube id="m2B_JxmfFm4" title="Redigering af sider og navigation i B1" next="Tilslutning af et eget domæne i B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Før du går i gang</h4>

- Gennemfør [Indledende opsætning](./initial-setup.md) for at få dit website konfigureret
- Opret mindst én side i [Administration af sider](./managing-pages.md)
- Du skal have tilladelsen **content.edit** for at få adgang til editoren

</div>

## Åbning af editoren

1. Åbn [Jump-menuen](../introduction.md#getting-around-with-the-jump-menu) i B1 Admin (søgefeltet øverst til venstre), udvid **Website**, og klik på **Pages**.
2. Find den side, du vil redigere, i tabellen over sider, og klik på **Edit Content**.

Editoren åbner i fuldskærmstilstand. Venstre panel viser din sides struktur og de tilgængelige indholdselementer; midterområdet viser en live-forhåndsvisning af din side.

:::info
Editoren vises altid i lys tilstand, uanset din tema-indstilling i B1 Admin, og den bruger de overskrifts- og brødteksttyper, du valgte under [Udseende](./appearance.md). Det sikrer, at forhåndsvisningen præcist matcher, hvordan din side vil se ud for dine besøgende.
:::

## Sidestruktur: Sektioner og elementer

Hver side er bygget op af to niveauer:

- **Sektioner** -- De øverste containere, som opdeler din side i vandrette bånd (for eksempel et hero-afsnit, en indholdsblok eller en sidefodsstrimmel). Hver side skal have mindst én sektion, før du kan tilføje indhold.
- **Elementer** -- De enkelte indholdsdele, der placeres inde i en sektion, såsom tekst, billeder, knapper, kort, formularer og kalendere.

### Tilføjelse af en sektion

1. Klik på **Add Section** (eller på knappen **+** øverst i venstre panel).
2. Vælg, hvordan du vil starte:
   - **Fra en skabelon** -- gennemse skabelongalleriet, som er organiseret efter kategori (Hero, About, Services, Giving osv.), og klik på en for at indsætte den som en færdigstylet, forududfyldt sektion. Du kan tilpasse alt, efter den er tilføjet.
   - **Tom sektion** -- vælg et kolonnelayout (enkelt, to kolonner, tre kolonner osv.) og byg fra bunden.
3. Den nye sektion vises i forhåndsvisningen. Klik på den for at vælge den og konfigurere baggrundsfarve, polstring og andre stilindstillinger.

### Skift af en sektions layout

Har du allerede bygget en sektion, men vil have en anden struktur? Brug layoutskifteren på sektionen til at skifte kolonneopstillingen ud med en anden fra galleriet, mens dit eksisterende indhold og dine elementer bevares.

### Tilføjelse af elementer til en sektion

1. Klik inde i en sektion i forhåndsvisningen for at vælge den.
2. Klik på **Add Content**, og vælg en elementtype fra listen:
   - **Text** -- Overskrifter, afsnit og rich text
   - **Image** -- Upload eller link til et foto
   - **Button** -- Et klikbart call-to-action-link
   - **Card** -- Et billede med en titel og en beskrivelse
   - **Form** -- Indlejr en [formular](../forms/creating-forms.md) direkte på siden. Hvis formularen har et [headerfoto](../forms/creating-forms.md#adding-a-header-photo), vises det over spørgsmålene
   - **Calendar** -- Vis en begivenhedskalender
   - **FAQ** -- Harmonikastil-blokke med spørgsmål og svar
   - **Video** -- Indlejr en video via URL
   - **Groups Browser** -- En filtrerbar oversigt over alle kirkens grupper med valgfri søgning, kategorifilter og etiketfilter. Dens **Layout** kan være **Grid** (standard) eller **Scrolling (automatic)** -- se [Rullende layouts](#scrolling-layouts)
   - **Group List** -- Fliser for dine offentlige grupper, eventuelt kun de grupper med en bestemt etiket. Dens **Layout** kan være **Grid** (standard; op til tre fliser pr. række) eller **Scrolling (automatic)** -- se [Rullende layouts](#scrolling-layouts)
   - **Icon Feature** -- Et ikon med en titel og en kort beskrivelse, til fremhævning af funktioner eller tjenester
   - **Gallery** -- Et gitter eller en masonry-layout med flere fotos
   - **Testimonial** -- Et eller flere citater med forfatterens navn, rolle og foto
   - **Social Icons** -- Linkede ikoner til kirkens profiler på sociale medier: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo og Podcast. Udfyld et link for hver, du vil vise; for **WhatsApp** skal du bruge et `https://wa.me/`-link med dit nummer eller et gruppeinvitationslink
   - **Countdown** -- En timer, der tæller ned til en dato eller et ugentligt gudstjenestetidspunkt
   - **Stats** -- En række store tal med etiketter (medlemmer, år, afdelinger)
   - **Campaign Progress** -- En live statuslinje for en givekampagne, der viser det samlede beløb indsamlet mod et fondsmål
   - **Staff Grid** -- Fotokort for medlemmerne af en gruppe; gruppen skal have indstillingen **public roster** slået til
   - **Service Times** -- Dine afdelingers gudstjenesteplan, automatisk hentet fra opsætningen af fremmøde
   - **Sermons** -- Dit prædikenbibliotek, som en fuld browser eller en layout med gitter, liste eller fremhævet seneste prædiken
   - **Map** -- Et indlejret kort centreret på kirkens adresse
   - **Table** -- Et simpelt gitter af rækker og kolonner til tabeldata
   - **Text with Photo** -- Tekst og et billede side om side
   - **Logo** -- Din kirkes logo, hentet fra [Udseende](./appearance.md)
   - **Live Stream** -- Din livestream-afspiller, indlejret direkte på siden
   - **Podcast** -- En liste over afsnit hentet fra en ekstern podcast-RSS-feed-URL, du angiver, med indstillinger for hvor mange afsnit der skal vises, og om datoer og beskrivelser skal vises. Hvert afsnit på det live website har en lydafspiller og et **Download**-link, der gemmer afsnittets lydfil under afsnittets titel. Dette bruges til at fremhæve en hvilken som helst podcast-feed på dit website; hvis du vil udgive dine egne prædikener som podcast, se i stedet [Administration af prædikener](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donation** -- En gaveknap eller en indlejret donationsformular
   - **HTML** -- Din egen rå HTML, til avancerede brugstilfælde, for eksempel indlejring af en tredjepartswidget (se [Brug af HTML-elementet](#using-the-html-element))
   - **iFrame** -- Indlejr eksternt indhold via URL
3. Konfigurer elementet ved hjælp af indstillingspanelet, der vises.

### Brug af HTML-elementet

**HTML**-elementet har to felter:

- **HTML Content** -- Den markup, der skal vises på siden. Eventuelle `<script>`-tags, du inkluderer her, køres på dit live website.
- **JavaScript (exclude script tag)** -- Scriptkode, der køres, når siden indlæses. Du kan også indsætte en leverandørs embed-snippet her med dets `<script>`-tags medtaget, og det vil køre på det live website.

Hvis du kun indsætter en webadresse (for eksempel et billedlink) i JavaScript-feltet, bliver feltet rødt med advarslen *"Dette er en webadresse, ikke JavaScript."* En nøgen adresse i feltet gør ingenting. Hvis du vil vise et billede, skal du bruge et **Image**-element eller sætte `<img src="...">` i **HTML Content**.

### Brug af kalenderelementet {#using-the-calendar-element}

**Calendar**-elementet viser begivenheder fra en af dine kalendere:

1. Under **Select** vælger du **Group Calendar** (en gruppes begivenheder -- listen viser de grupper, du er medlem af) eller **Curated Calendar** (en kalender, du har bygget under **Calendars**; se [Curated Calendar](../calendars/curated-calendar.md)).
2. Under **Select Calendar** vælger du gruppen eller kalenderen.
3. Under **Display** vælger du, hvordan den skal vises:
   - **Month calendar** -- Et månedsgitter, som besøgende kan bladre i. Hver begivenhed er farvet efter den gruppe, den tilhører, så en gruppes begivenheder har samme farve på alle kalendere. B1 vælger farverne automatisk; der er intet at opsætte.
   - **Upcoming events** -- Et gitter af fliser for de næste 12 kommende begivenheder, hvor en gentagende begivenhed vises én gang på sin næste dato. Hver flise viser begivenhedens foto (eller dens titel på dit temas mørke farve, hvis den ikke har et foto), en datomærkat, dag og tidspunkt samt den første linje i beskrivelsen. En knap **Subscribe** over flisene lader besøgende kopiere kalenderens ICS-link eller downloade den. Der vises en indstilling **Layout** for denne visning: **Grid** (standard) eller **Scrolling (automatic)**, som placerer flisene i én række, der automatisk ruller af sig selv (se [Rullende layouts](#scrolling-layouts)). For en **Curated Calendar** kan du slå indstillingen **Group badge** til for at vise hver begivenheds gruppenavn i det øverste højre hjørne af dens flise, i gruppens kalenderfarve. Begivenheder fra arkiverede eller fortrolige grupper får ikke et mærke.
4. For kun at vise nogle begivenheder skriver du et tag i **Only events tagged** -- for eksempel `youth`. Kun begivenheder, hvis **Tags** indeholder det ord, vises. Lad feltet være tomt for at vise alle begivenheder. Tags angives på hver begivenhed; se [Tilføjelse og redigering af begivenheder](../calendars/creating-calendars.md#adding-and-editing-events).

I begge visninger åbner et klik på en begivenhed dens egen side på dit website. Begivenhedssiden viser begivenhedens foto, titel, dato og tidspunkt samt beskrivelse, plus en boks med **When** (inklusive gentagelsesmønsteret for en gentagende begivenhed) og **Where** (de lokaler, der er booket til den). Den har også en knap **Register for this Event**, når tilmelding er slået til, og et link **Add to my calendar**, der downloader begivenheden som en kalenderfil. Siden er opsat, så søgemaskiner kan vise begivenhedens dato og detaljer i deres resultater. Begivenhedssider fra curated-kalendere, der vises på dine sider (for begivenheder i de næste seks måneder), vises også i dit websites sitemap, så søgemaskiner kan finde dem.

### Rullende layouts {#scrolling-layouts}

Layoutet **Scrolling (automatic)** på **Groups Browser**, **Group List** og kalenderelementets visning **Upcoming events** placerer flisene i én række i stedet for et gitter. På en telefon fylder hver flise hele rækken; på en computer passer to fliser ved siden af hinanden. Når der er flere fliser, end der kan vises, sker følgende i rækken:

- Den rykker frem én flise ca. hvert fjerde sekund og starter forfra ved den første flise, når den sidste er nået.
- Den holder pause, mens en besøgende holder musen over, rører ved eller tabulerer ind i den, og fortsætter et par sekunder senere.
- Der vises en række prikker under den, én pr. flise, hvor den aktuelle flises prik er udfyldt. Besøgende kan klikke på en prik for at springe til den flise.

På enheder, hvor bevægelsesreduktion er slået til, står rækken stille, og besøgende kan selv swipe eller scrolle i den. Hvis alle fliserne kan vises på én gang, bevæger rækken sig ikke, og der vises ingen prikker.

### Omarrangering af indhold

Træk sektioner eller elementer ved hjælp af håndtaget (seks prikker) på venstre side af hvert element for at ændre rækkefølgen. Du kan trække elementer inden for en sektion eller flytte dem mellem sektioner.

## Styling af din side

### Sektionsstilarter

Klik på en sektion for at åbne dens stilpanel. Du kan indstille:

- **Background** -- Ensfarvet, gradient eller billede. Når du bruger et billede som baggrund, kan du med vælgeren **Focal Point** klikke for at angive, hvilken del af billedet der forbliver centreret, når sektionen skaleres, og valgmuligheden **Overlay** lader dig lægge et halvgennemsigtigt farvelag over billedet for at forbedre tekstens læsbarhed.
- **Padding** -- Afstand øverst og nederst inde i sektionen
- **Width** -- Fuld bredde eller centreret/indesluttet
- **Dividers** -- Dekorative formdelere (bølge, skråt, kurve, trekant og flere) på sektionens øverste eller nederste kant, med indstillinger for farve, højde og spejlvending

### Elementstilarter

Klik på et element for at åbne dets stilpanel. Almindelige indstillinger omfatter skriftstørrelse, farve, justering, margin og padding. For billeder kan du angive alt-tekst og linkmål.

### Brugerdefineret CSS

Til avanceret styling har hver sektion og hvert element et felt **Custom CSS**, hvor du kan skrive dine egne CSS-regler. Disse er afgrænset til det pågældende element, så de ikke utilsigtet påvirker resten af siden.

:::tip
Hvis du vil anvende stilarter på hele dit website -- for eksempel en brugerdefineret skrifttype eller en global farve -- så brug indstillingerne under [Udseende](./appearance.md) i stedet for brugerdefineret CSS på de enkelte sider.
:::

## Forhåndsvisning af din side

Brug forhåndsvisningsknapperne i værktøjslinjen for at se, hvordan din side ser ud ved forskellige skærmstørrelser:

- **Desktop** -- Visning i fuld browserbredde
- **Mobile** -- Smal visning i telefonstørrelse

På telefoner stables kolonnerne i en række oven på hinanden i fuld bredde, medmindre du angiver en **Mobile Width** for dem i rækkens indstillinger. Lister med prædikener og podcasts stabler også hvert afsnits tekst under dets miniature på telefoner.

For at se den live side præcist, som besøgende vil se den, skal du gå tilbage til listen over sider og klikke på sidens sti. Den åbnes i en ny browserfane.

## Kontrol af tilgængelighed

Klik på ikonet **Accessibility** i værktøjslinjen for at køre et hurtigt tjek for almindelige problemer -- billeder uden alt-tekst, lav farvekontrast eller overskrifter i forkert rækkefølge. Hvert problem linker direkte til det element, der skal rettes, så du kan rette det på stedet.

## Fortrydelse af ændringer

Editoren gemmer automatisk din redigeringshistorik. Brug knapperne i værktøjslinjen eller tastaturgenveje til at navigere:

- **Undo** (Ctrl+Z / Cmd+Z) -- Fortryd din seneste handling
- **Redo** (Ctrl+Shift+Z eller Ctrl+Y / Cmd+Shift+Z) -- Genskab en fortrudt handling

Du kan også gendanne siden til et tidligere øjebliksbillede. Klik på **View history** i værktøjslinjen for at se en liste over gemte øjebliksbilleder med beskrivelser, og klik på et punkt for at gendanne til det tidspunkt.

:::warning
Gendannelse af et øjebliksbillede erstatter dit nuværende sideindhold med øjebliksbilledets version. Dette kan ikke fortrydes med den almindelige fortrydknap. Gem et øjebliksbillede af din nuværende tilstand, før du gendanner et gammelt, hvis du vil have mulighed for at vende tilbage.
:::

## Gemning og publicering

Ændringer gemmes automatisk, mens du arbejder. En statusindikator i værktøjslinjen viser, om dine ændringer er gemt.

### Kladde- og publiceret tilstand

Sider kan have en **published**-tilstand, som styrer, hvornår besøgende ser dine ændringer. Værktøjslinjen viser en statusmærkat med den aktuelle tilstand:

- **Live on save** -- Siden bruger ikke en publiceringsproces. Hver gemt ændring går straks live. Dette er standard for nye sider.
- **Unpublished changes** -- Siden har været publiceret før, men du har lavet ændringer siden den seneste publicering. Besøgende ser stadig den tidligere publicerede version.
- **Published** -- Siden er live, og dit gemte indhold svarer til det, besøgende ser.

For at publicere dine ændringer klikker du på knappen **Publish** i værktøjslinjen. Siden bliver straks live.

For at vende tilbage til den sidst publicerede version uden at påvirke det, besøgende ser, skal du åbne overløbsmenuen (⋮) og klikke på **Discard unpublished changes**.

For at stoppe med at bruge publiceringsprocessen skal du åbne overløbsmenuen og klikke på **Turn off publishing**. Redigeringer går derefter straks live igen.

:::tip
Brug kladde-/publiceringsprocessen, når du vil forberede en side -- for eksempel til en kommende begivenhed -- og først gøre den live på det rigtige tidspunkt. Byg og forhåndsvis siden, og klik derefter på Publish, når du er klar.
:::

## Relaterede artikler

- [Administration af sider](./managing-pages.md) -- Opret sider, angiv URL'er og administrer sidernavigation
- [Udseende](./appearance.md) -- Angiv farver, skrifttyper og branding for hele siden
- [Filer](./files.md) -- Upload billeder og dokumenter, der skal bruges i editoren
- [Oprettelse af formularer](../forms/creating-forms.md) -- Byg formularer, du kan indlejre på sider
