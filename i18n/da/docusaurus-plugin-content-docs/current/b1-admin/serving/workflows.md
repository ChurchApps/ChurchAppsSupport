---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Workflows flytter personer gennem en række trin på en visuel tavle. Hver person bliver et kort, der bevæger sig fra ét trin til det næste -- fra opfølgning på en førstegangsgæst, til en medlemsproces, til en tak-for-gave til en førstegangsgiver, og alt andet hvor du skal spore mange personer gennem det samme sæt af faser. Et trin kan bede en frivillig om at gøre noget (ringe et opkald, have en samtale) **og** køre automatiske handlinger på egen hånd -- sende en e-mail, vente et par dage, tilføje personen til en gruppe -- så workflows håndterer både den menneskelige opfølgning og det praktiske arbejde omkring det. Workflows udvider [Opgaver](./tasks.md) til en drag-and-drop Kanban-tavle, så intet og ingen falder mellem to stole.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Sørg for, at de personer, du vil spore, findes i B1 Admin
- Bliv fortrolig med, hvordan [Opgaver](./tasks.md) fungerer, da hvert kort på en tavle er en opgave
- For at bruge handlingen **Send e-mail** skal du først oprette de e-mailskabeloner, du vil sende (administreres under **Beskeder → Administrer skabeloner**)
- Du skal have den relevante Opgaver-tilladelse. Visning, redigering af kort og administration af workflows er separate tilladelsesniveauer (se [Roller & tilladelser](../settings/roles-permissions.md))

</div>

## Se workflows

Naviger til **Tjeneste**, åbn området **Opgaver**, og vælg **Workflows** fra menuen. Du vil se dine workflows listet og grupperet efter kategori, med aktive workflows fremhævet. Klik på et vilkårligt workflow for at åbne dets tavle.

## Opret et workflow

1. På workflows-siden skal du klikke på **Tilføj workflow**.
2. Vælg, hvordan du vil starte:
   - **Tomt workflow** -- start fra bunden, og byg dine egne trin.
   - **Fra en skabelon** -- start med et færdiglavet sæt trin, du kan redigere. Indbyggede skabeloner inkluderer:
     - **Opfølgning på ny besøgende** -- Send velkomst-e-mail → Personligt telefonopkald → Inviter til næste trin → Forbundet
     - **Medlemsklasse** -- Udtryk interesse → Tilmeld dig klasse → Deltag i klasse → Fuldfør medlemskab
     - **Tak til førstegangsgiver** -- Send takkenote → Del givningens betydning → Plejet
3. Giv workflowet et **navn**.
4. Du kan valgfrit tildele en **kategori** for at gruppere beslægtede workflows sammen. Du kan oprette en ny kategori direkte fra dropdown-menuen.
5. Lad workflowet være **aktivt**, så personer kan tilføjes til det, eller sæt det til **inaktivt** for at skjule det fra tilføj-til-workflow-listerne.
6. Klik på **Gem**.

:::tip
Brug knappen **Dupliker** på workflow-listen til at kopiere et eksisterende workflow -- inklusive dets trin, automatiske handlinger og routing -- som udgangspunkt for et nyt.
:::

## Byg tavlen med trin

Hver workflow-tavle er opbygget af **trin**, vist som kolonner fra venstre mod højre. Åbn et workflow, og brug **Tilføj trin** til at oprette hver fase af din proces.

Når du tilføjer eller redigerer et trin, kan du konfigurere:

- **Trinnavn** -- kolonnens overskrift (for eksempel "Velkomstopkald" eller "Afventer tilmelding").
- **Forfald om (dage)** -- indstiller automatisk en forfaldsdato, når et kort kommer ind i dette trin. Kort, der er over deres forfaldsdato, markeres som **Forsinket**.
- **Standardmodtager** -- den person eller gruppe, nye kort på dette trin automatisk tildeles.
- **Automatiske handlinger** -- ting, systemet gør på egen hånd, når et kort ankommer (se nedenfor).
- **Routing** -- hvor kortet går hen, når det forlader trinnet (se [Routing](#routing-cards-with-outcomes-and-conditions)).

Træk trin-kolonner i den rækkefølge, der matcher din proces. Rækkefølgen definerer også den standardrute, et kort tager, når ingen anden routing gælder.

:::info
Gem et nyt trin først. Automatiske handlinger og routing knyttes til trinnet, så editoren låser først disse sektioner op, når trinnet findes.
:::

## Automatiske handlinger

Hvert trin kan have en liste af **automatiske handlinger**, der kører af sig selv, i det øjeblik et kort **kommer ind** i trinnet -- før nogen rører ved det. Sådan kan et trin både bede en frivillig om noget *og* tage sig af det rutinemæssige arbejde omkring opfølgningen.

I trin-editoren skal du åbne **Automatiske handlinger**, klikke på **Tilføj handling**, vælge en type, udfylde dens indstillinger og klikke på gem-ikonet på den handling. Tilføj lige så mange, du har brug for; de kører **fra top til bund i rækkefølge**.

| Handling | Hvad den gør |
|---|---|
| **Send e-mail** | Sender personen en e-mailskabelon, du vælger. Du kan tilsidesætte emnelinjen. |
| **Vent** | Sætter kortet på pause i et antal dage, før det fortsætter (se nedenfor). |
| **Tilføj til gruppe** | Tilføjer personen til en [gruppe](../groups/index.md), du vælger. |
| **Tilføj til workflow** | Starter personen på et andet workflow -- nyttigt til at overdrage mellem processer. |
| **Tilføj note** | Registrerer en note i kortets historik. |
| **Sæt felt** | Opdaterer et felt på personens post: Medlemsstatus, Civilstand, Køn, By, Region eller Postnummer. |
| **Webhook** | Sender kortets detaljer til en ekstern webadresse (URL), du angiver, til forbindelse med andre systemer. |

Når alle et trins handlinger er afsluttet, **bliver kortet liggende på det trin**, så en person kan arbejde med det -- medmindre trinnet har en automatisk rute, der flytter det videre (se [Fuldautomatiske trin](#fully-automated-steps)).

:::info
Automatiske handlinger kører kun, når et kort ankommer gennem det normale flow -- når det først tilføjes, når et resultat eller en automatisk rute bringer det ind, eller efter en Vent er afsluttet. De kører **ikke** igen, når et medarbejder manuelt trækker et kort til trinnet eller sender det tilbage, så en person ikke får den samme e-mail to gange.
:::

### Sende e-mail

Vælg **Send e-mail**, vælg en af dine e-mailskabeloner, og skriv eventuelt et brugerdefineret emne. Når et kort kommer ind i trinnet, modtager personen automatisk den e-mail. (Hvis personen ikke har en e-mailadresse registreret, springer trinnet blot denne handling over.)

### Vent et par dage (drypsekvenser)

Handlingen **Vent** holder et kort tilbage i det antal dage, du angiver. Mens det venter, vises kortet som **Udsat**. Når ventetiden er slut:

1. Eventuelle **resterende handlinger på samme trin** køres -- så du kan bygge en drypsekvens som **Send e-mail → Vent 3 dage → Send en påmindelses-e-mail**.
2. Derefter, hvis trinnet har en automatisk rute, flyttes kortet videre; ellers bliver det liggende på trinnet, indtil en person henter det.

:::tip
En **Vent** helt i starten af et trin er en enkel måde at "holde" et kort på, før det dukker op for en frivillig -- for eksempel *Vent 7 dage, og lad derefter en coach tage kontakt*.
:::

## Tilføj personer som kort

Der er flere måder at sætte personer på en tavle:

- **Fra tavlen** -- Klik på **Tilføj kort** nederst i en trin-kolonne, og vælg en person. Du kan også vælge en gruppe, og hvert medlem af den gruppe tilføjes som et kort.
- **Fra en persons post** -- Brug **Tilføj til workflow** på en persons side for at placere dem på et workflow.
- **Fra Personer-søgning** -- Vælg flere personer, og brug massehandlingen **Tilføj til workflow** for at tilføje dem alle på én gang.
- **Automatisk med en trigger** -- Tilføj personer, når noget sker, som en formularindsendelse eller en første gave (se [Triggere](#triggers) nedenfor).

## Arbejde med tavlen

Åbn et workflow for at se dets tavle. Hvert kort viser personens navn, hvem det er tildelt, og en forfaldsdato- eller status-chip (**Forsinket** eller **Udsat**). En trin-kolonne viser også små badges for eventuelle automatiske handlinger, den kører, samt annoteringer for dens routing, hvilket giver dig et overblik over, hvordan kort flyder.

- **Flyt et kort** -- Træk et kort fra en kolonne til den næste, efterhånden som personen skrider frem.
- **Åbn et kort** -- Dobbeltklik på et kort (eller klik på det) for at åbne dets detaljeskuffe, hvor du kan ændre trinnet, gentildele det, tilføje noter og gennemgå, hvad der allerede er sket.

Fra kortskuffen kan du:

- **Tildele** kortet til en anden person eller gruppe.
- **Udsætte** kortet i 1 dag, 3 dage eller 1 uge for midlertidigt at skjule dets forfaldsdato.
- **Sende tilbage** til det forrige trin eller **Springe over** til det næste trin.
- **Fastgøre tildeling** -- behold den samme ejer på kortet, selv når det flyttes mellem trin. Som standard tildeles et kort på ny til det trins standardmodtager, når det flyttes til et nyt trin; fastgørelse holder den nuværende ansvarlige person gennem hele forløbet.
- **Fuldføre** kortet for at afslutte det, eller vælge en **Resultat**-knap, hvis trinnet har resultater konfigureret (se [Routing](#routing-cards-with-outcomes-and-conditions)).
- **Tilføje noter** og gennemgå kortets **historik** -- inklusive en log over automatiske handlinger, der er kørt (sendte e-mails, ventetider osv.).

### Massehandlinger

Vælg afkrydsningsfelterne på flere kort for at handle på dem samlet. En værktøjslinje vises, hvor du kan **Fuldføre**, **Udsætte**, **Gentildele** eller **Flytte** alle valgte kort til et andet trin på én gang.

## Routing af kort med resultater og betingelser

Routing styrer, hvor et kort går hen, når det forlader et trin. Åbn en trins editor for at konfigurere to former for routing.

### Resultat-knapper

Resultater er knapper, der vises i kortskuffen, når du fuldfører et kort på det trin. I stedet for en enkelt **Fuldfør**-knap kan du tilbyde valg som "Blev medlem af en gruppe" eller "Ikke interesseret". Hvert resultat kan:

- Sende kortet til **et andet trin** i dette workflow,
- **Overdrage kortet** til et helt andet workflow, eller
- **Lukke** kortet.

Dette lader én beslutning forgrene personen ned ad forskellige stier.

### Automatisk routing (betinget)

Automatiske ruter flytter et kort videre **i det øjeblik det kommer ind i et trin** (og efter dets automatiske handlinger er afsluttet), uden at nogen klikker, hvis personen matcher et sæt betingelser. Tilføj en rute, vælg måltrinnet, og definer en eller flere **betingelser** (for eksempel en persons campus, alder eller medlemsstatus). En rute uden betingelser matcher alle.

:::info
På tavlen viser hver trin-kolonne små annoteringer, der beskriver dens routing -- for eksempel en resultat-label eller "hvis matcher" efterfulgt af en pil til destinationstrinnet eller -workflowet.
:::

## Fuldautomatiske trin

Du kan få et trin til at køre helt af sig selv, uden at nogen arbejder med det. Giv trinnet dets **automatiske handlinger**, og tilføj en **automatisk rute** (uden betingelser), der peger på det næste trin. Når et kort kommer ind, køres handlingerne, og derefter fremskynder ruten det med det samme -- kortet går lige igennem.

:::tip
Kombiner dette med **Vent**: *Send velkomst-e-mail → Vent 3 dage → fremskynd automatisk til trinnet "Personligt opkald".* E-mailen og timingen klares for dig, og en frivillig ser kun kortet, når det er tid til den menneskelige kontakt.
:::

## Triggere

Triggere tilføjer personer til et workflow automatisk, når noget sker, så du aldrig behøver at tilføje kort manuelt. På en workflow-tavle skal du klikke på fanen **Triggere** og derefter **Tilføj trigger**. Der er to typer:

### Hændelsestriggere

Udløses, så snart en post ændres i B1. Vælg hændelsen, og tilføj eventuelt **betingelser**, så kun matchende personer tilføjes:

- **Person · Oprettet / Opdateret** -- f.eks. tilføj alle, hvis status bliver *Besøgende*.
- **Donation · Oprettet** -- f.eks. tilføj en førstegangs- eller stor gave til et takke-workflow (match på beløb, fond eller metode).
- **Gruppe · Medlem tilsluttet** / **Gruppe · Oprettet**.
- **Formular · Indsendt** -- tilføj alle, der indsender en valgt formular (fantastisk til et "Jeg er ny" eller "Kontakt"-kort).

### Skematriggere

Kører på tilbagevendende basis -- dagligt, ugentligt, månedligt eller årligt -- mod et sæt betingelser. Brug disse til tidsbaseret opsøgende arbejde, f.eks. *alle, hvis medlemsjubilæum er i dag*, eller en *månedlig* opfølgning.

For enhver trigger kan du også indstille:

- **Starttrinnet**, det nye kort begynder på (standard er det første trin).
- **Én gang pr. person** -- så den samme person ikke tilføjes til workflowet to gange af triggeren.
- **Aktiv** -- slå triggeren til eller fra uden at slette den.

:::tip
Kombiner en **Formular · Indsendt**-trigger med skabelonen **Opfølgning på ny besøgende** for at gøre din "Kontaktkort"- eller "Jeg er ny"-formular til en automatisk opfølgningspipeline.
:::

## Mine kort

Frivillige og medarbejdere behøver ikke at grave gennem hver tavle for at finde deres arbejde. Siden **Mine kort** (linket fra workflows-siden) viser hvert kort, der er tildelt den aktuelle bruger på tværs af alle workflows. Klik på et kort for at åbne den tavle, det tilhører.

## Rapporter

Åbn et workflow, og klik på **Rapporter** for at se analyser for det workflow:

- **Forsinket** -- antallet af kort, der er over deres forfaldsdato.
- **Kort pr. trin** -- hvor mange kort der aktuelt ligger på hvert trin, vist som et søjlediagram.
- **Fuldført (30 dage)** -- gennemstrømning over de sidste 30 dage, vist som et liniediagram.

Brug disse til at spotte flaskehalse -- for eksempel et trin, hvor kort hober sig op og aldrig rykker videre.

## Relaterede artikler

- [Opgaver](./tasks.md) -- de individuelle handlingspunkter, som workflow-kort er bygget på
- [Automatiseringer](./automations.md) -- opret tilbagevendende opgaver på et skema
- [Formularer](../forms/index.md) -- byg de formularer, der kan udløse workflows
- [Grupper](../groups/index.md) -- de grupper, en "Tilføj til gruppe"-handling kan placere personer i
- [Roller & tilladelser](../settings/roles-permissions.md) -- kontroller, hvem der kan se, redigere og administrere workflows
