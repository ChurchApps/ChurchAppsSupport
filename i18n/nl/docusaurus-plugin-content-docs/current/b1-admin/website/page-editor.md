---
title: "De pagina-editor gebruiken"
description: "Stel een pagina-editor in B1 Admin in door secties en elementen toe te voegen, ze op te maken, een voorbeeld op mobiel te bekijken en concepten te publiceren. Behandelt ook ongedaan maken en versiegeschiedenis."
---

# De pagina-editor gebruiken

<div class="article-intro">

De B1 pagina-editor is een visuele sleep-en-zet-bouwer waarmee je de pagina's van je kerkwebsite kunt ontwerpen zonder code te schrijven. Je kunt secties en inhoudsblokken toevoegen, stijlen aanpassen, je werk bekijken en wijzigingen ongedaan maken -- allemaal vanuit je browser.

</div>

## Trainingsvideo

<YouTube id="m2B_JxmfFm4" title="Pagina's en navigatie bewerken in B1" next="Een eigen domein koppelen in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Voordat je begint</h4>

- Voltooi de [initiële instelling](./initial-setup.md) om je website te configureren
- Maak minstens één pagina aan in [Pagina's beheren](./managing-pages.md)
- Je hebt de **content.edit**-machtiging nodig om toegang te krijgen tot de editor

</div>

## De editor openen

1. Open in B1 Admin het [Jump-menu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven), klap **Website** uit en klik op **Pagina's**.
2. Zoek de pagina die je wilt bewerken in de tabel Pagina's en klik op **Inhoud bewerken**.

De editor opent in volledig schermmodus. Het linkerpaneel toont de structuur van je pagina en de beschikbare inhoudselementen; het middelste gebied toont een live voorbeeld van je pagina.

:::info
De editor wordt altijd in de lichte modus weergegeven, ongeacht je thema-instelling in B1 Admin, en gebruikt de kop- en hoofdlettertypen die je hebt gekozen in [Uiterlijk](./appearance.md). Zo komt het voorbeeld precies overeen met hoe je pagina er voor websitebezoekers uitziet.
:::

## Paginastructuur: secties en elementen

Elke pagina is opgebouwd uit twee niveaus:

- **Secties** -- De containers op het hoogste niveau die je pagina in horizontale stroken verdelen (bijvoorbeeld een kopgedeelte, een inhoudsblok of een voettekststrook). Elke pagina moet minstens één sectie hebben voordat je inhoud kunt toevoegen.
- **Elementen** -- De afzonderlijke inhoudsonderdelen binnen een sectie, zoals tekst, afbeeldingen, knoppen, kaarten, formulieren en agenda's.

### Een sectie toevoegen

1. Klik op **Sectie toevoegen** (of op de knop **+** bovenaan het linkerpaneel).
2. Kies hoe je wilt beginnen:
   - **Vanuit een sjabloon** -- blader door de galerij met sectiesjablonen, geordend per categorie (Kop, Over, Diensten, Geven, enz.), en klik op één om het in te voegen als volledig opgemaakte, vooraf ingevulde sectie. Je kunt daarna alles aanpassen.
   - **Lege sectie** -- kies een kolomindeling (enkel, twee kolommen, drie kolommen, enz.) en bouw vanaf nul.
3. De nieuwe sectie verschijnt in het voorbeeld. Klik erop om deze te selecteren en de achtergrondkleur, opvulling en andere stijlopties in te stellen.

### De indeling van een sectie wisselen

Heb je al een sectie gebouwd, maar wil je een andere structuur? Gebruik dan de indelingswisselaar op die sectie om de kolomindeling te vervangen door een andere uit de galerij, terwijl je bestaande inhoud en elementen behoudt.

### Elementen aan een sectie toevoegen

1. Klik in het voorbeeld binnen een sectie om deze te selecteren.
2. Klik op **Inhoud toevoegen** en kies een elementtype uit de lijst:
   - **Tekst** -- Koppen, alinea's en opgemaakte tekst
   - **Afbeelding** -- Upload een foto of koppel er een
   - **Knop** -- Een klikbare oproep tot actie met link
   - **Kaart** -- Een afbeelding met een titel en beschrijving
   - **Formulier** -- Plaats een [formulier](../forms/creating-forms.md) direct op de pagina. Als het formulier een [koptekstfoto](../forms/creating-forms.md#adding-a-header-photo) heeft, wordt deze boven de vragen getoond
   - **Agenda** -- Toon een evenementenagenda
   - **FAQ** -- Accordeonachtige blokken met vragen en antwoorden
   - **Video** -- Plaats een video via een URL
   - **Groepenoverzicht** -- Een filterbare lijst van alle kerkgroepen, met optioneel zoeken, een categoriefilter en een labelfilter. De **Indeling** kan **Raster** (de standaard) of **Scrollend (automatisch)** zijn -- zie [Scrollende indelingen](#scrolling-layouts)
   - **Groepslijst** -- Tegels voor je openbare groepen, optioneel alleen de groepen met een bepaald label. De **Indeling** kan **Raster** (de standaard; maximaal drie tegels per rij) of **Scrollend (automatisch)** zijn -- zie [Scrollende indelingen](#scrolling-layouts)
   - **Pictogramkenmerk** -- Een pictogram met een titel en korte beschrijving, voor het uitlichten van functies of bedieningen
   - **Galerij** -- Een raster of metselwerklay-out met meerdere foto's
   - **Getuigenis** -- Een of meer citaten met naam, rol en foto van de auteur
   - **Sociale pictogrammen** -- Gekoppelde pictogrammen voor de social media-profielen van je kerk: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo en Podcast. Vul voor elk pictogram dat je wilt tonen een link in; voor **WhatsApp** gebruik je een `https://wa.me/`-link met je nummer of een groepsuitnodigingslink
   - **Aftelling** -- Een timer die terugtelt naar een datum of een wekelijkse diensttijd
   - **Statistieken** -- Een rij grote getallen met labels (leden, jaren, locaties)
   - **Campagnevoortgang** -- Een live voortgangsbalk voor een geefcampagne, die het totaal dat is opgehaald richting een fondsdoel toont
   - **Medewerkersraster** -- Foto-kaarten van de leden van een groep; de groep moet de optie **openbare ledenlijst** ingeschakeld hebben
   - **Dienstijden** -- Het dienstrooster van je locaties, automatisch opgehaald uit de aanwezigheidsinstellingen
   - **Preken** -- Je preekbibliotheek, als volledige browser of in een raster-, lijst- of uitgelichte-laatste-indeling
   - **Kaart** -- Een ingesloten kaart gecentreerd op het adres van je kerk
   - **Tabel** -- Een eenvoudig raster van rijen en kolommen voor tabelgegevens
   - **Tekst met foto** -- Tekst en een afbeelding naast elkaar
   - **Logo** -- Het logo van je kerk, opgehaald uit [Uiterlijk](./appearance.md)
   - **Livestream** -- Je livestreamspeler, direct op de pagina ingesloten
   - **Podcast** -- Een lijst van afleveringen die worden opgehaald uit een externe podcast-RSS-feed-URL die je opgeeft, met instellingen voor het aantal af te beelden afleveringen en of datums en beschrijvingen worden getoond. Elke aflevering op de live site heeft een audiospeler en een **Downloaden**-link die het audiobestand van de aflevering opslaat onder de titel van de aflevering. Dit is bedoeld om elke podcastfeed op je site uit te lichten; om je eigen preken als podcast te publiceren, zie in plaats daarvan [Preken beheren](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donatie** -- Een gefknop voor geven of een ingesloten donatieformulier
   - **HTML** -- Je eigen ruwe HTML, voor geavanceerd gebruik, zoals het insluiten van een widget van derden (zie [Het HTML-element gebruiken](#using-the-html-element))
   - **iFrame** -- Plaats externe inhoud via een URL
3. Configureer het element met behulp van het instellingenpaneel dat verschijnt.

### Het HTML-element gebruiken

Het **HTML**-element heeft twee vakken:

- **HTML-inhoud** -- De opmaak die op de pagina wordt getoond. Alle `<script>`-tags die je hier opneemt, worden uitgevoerd op je live site.
- **JavaScript (zonder script-tag)** -- Scriptcode die wordt uitgevoerd wanneer de pagina laadt. Je kunt hier ook een insluitfragment van een leverancier plakken met de bijbehorende `<script>`-tags, en het wordt op de live site uitgevoerd.

Als je alleen een webadres (zoals een afbeeldingslink) in het JavaScript-vak plakt, wordt het vak rood met de waarschuwing *"Dit is een webadres, geen JavaScript."* Een kaal adres in dat vak doet niets. Om een afbeelding te tonen, gebruik je een **Afbeelding**-element of zet je `<img src="...">` in **HTML-inhoud**.

### Het Agenda-element gebruiken {#using-the-calendar-element}

Het **Agenda**-element toont evenementen uit een van je agenda's:

1. Kies onder **Selecteren** **Groepsagenda** (de evenementen van één groep -- de lijst toont groepen waarvan jij lid bent) of **Samengestelde agenda** (een agenda die je hebt gebouwd onder **Agenda's**; zie [Samengestelde agenda](../calendars/curated-calendar.md)).
2. Kies onder **Agenda selecteren** de groep of agenda.
3. Kies onder **Weergave** hoe je deze wilt tonen:
   - **Maandagenda** -- Een maandraster waar bezoekers doorheen kunnen bladeren. Elk evenement krijgt de kleur van de groep waartoe het behoort, zodat de evenementen van een groep op elke agenda dezelfde kleur hebben. B1 kiest de kleuren automatisch; er valt niets in te stellen.
   - **Komende evenementen** -- Een raster van tegels voor de volgende 12 komende evenementen, waarbij een herhalend evenement één keer wordt getoond op de eerstvolgende datum. Elke tegel toont de foto van het evenement (of zijn titel op de donkere kleur van je thema als er geen foto is), een datumbadge, de dag en tijd, en de eerste regel van de beschrijving. Een knop **Abonneren** boven de tegels laat bezoekers de ICS-link van de agenda kopiëren of downloaden. Voor deze weergave verschijnt een instelling **Indeling**: **Raster** (de standaard) of **Scrollend (automatisch)**, waarbij de tegels in één rij worden geplaatst die vanzelf doorscrolt (zie [Scrollende indelingen](#scrolling-layouts)). Voor een **Samengestelde agenda** schakel je de instelling **Groepsbadge** in om de naam van de groep van elk evenement rechtsboven op de tegel te tonen, in de agendakleur van die groep. Evenementen van gearchiveerde of vertrouwelijke groepen krijgen geen badge.
4. Om alleen sommige evenementen te tonen, typ je een tag in **Alleen evenementen met tag** -- bijvoorbeeld `jeugd`. Alleen evenementen waarvan de **Tags** dat woord bevatten, verschijnen. Laat het leeg om elk evenement te tonen. Tags worden per evenement ingesteld; zie [Evenementen toevoegen en bewerken](../calendars/creating-calendars.md#adding-and-editing-events).

In beide weergaven opent een klik op een evenement de eigen pagina op je website. De evenementpagina toont de foto, titel, datum en tijd en beschrijving van het evenement, plus een vak met **Wanneer** (inclusief het herhalingspatroon voor een terugkerend evenement) en **Waar** (de ruimtes die ervoor zijn geboekt). Ook staat er een knop **Aanmelden voor dit evenement** als aanmelding is ingeschakeld, en een link **Toevoegen aan mijn agenda** die het evenement downloadt als agendabestand. De pagina is zo ingericht dat zoekmachines de datum en details van het evenement in hun resultaten kunnen tonen. Evenementpagina's van samengestelde agenda's die op je pagina's worden getoond (voor evenementen in de komende zes maanden) worden ook in de sitemap van je site vermeld, zodat zoekmachines ze kunnen vinden.

### Scrollende indelingen {#scrolling-layouts}

De indeling **Scrollend (automatisch)** bij het **Groepenoverzicht**, de **Groepslijst** en de weergave **Komende evenementen** van het Agenda-element zet de tegels in één rij in plaats van in een raster. Op een telefoon vult elke tegel de rij; op een computer passen er twee tegels naast elkaar. Wanneer er meer tegels zijn dan er passen, gebeurt het volgende in de rij:

- Elke ongeveer vier seconden schuift de rij één tegel door, en na de laatste tegel begint het weer bij de eerste.
- De rij pauzeert wanneer een bezoeker erboven zweeft, het aanraakt of ernaartoe tabt, en hervat een paar seconden later.
- Onder de rij verschijnt een reeks stippen, één per tegel, waarbij de stip van de huidige tegel is ingevuld. Bezoekers kunnen op een stip klikken om naar die tegel te springen.

Op apparaten waarop bewegingsvermindering is ingesteld, blijft de rij stilstaan en swipen of scrollen bezoekers zelf. Als alle tegels passen, beweegt de rij niet en verschijnen er geen stippen.

### Inhoud herordenen

Sleep secties of elementen met het grijpvak (zes puntjes) aan de linkerkant van elk onderdeel om ze te herordenen. Je kunt elementen binnen een sectie slepen of ze naar andere secties verplaatsen.

## Je pagina opmaken

### Sectiestijlen

Klik op een sectie om het stijlpaneel te openen. Je kunt instellen:

- **Achtergrond** -- Effen kleur, verloop of afbeelding. Bij een afbeeldingsachtergrond kun je met een **Brandpunt**-kiezer klikken om in te stellen welk deel van de afbeelding gecentreerd blijft wanneer de sectie schaalt, en met de optie **Overlay**-kleur kun je een halfdoorzichtige tint over de afbeelding leggen om de leesbaarheid van de tekst te verbeteren
- **Opvulling** -- Ruimte boven en onder binnenin de sectie
- **Breedte** -- Volledige breedte of gecentreerd/beperkt
- **Scheidingslijnen** -- Decoratieve vormscheidingslijnen (golf, schuin, boog, driehoek en meer) aan de boven- of onderrand van de sectie, met opties voor kleur, hoogte en spiegelen

### Elementstijlen

Klik op een element om het stijlpaneel te openen. Veelgebruikte opties zijn lettergrootte, kleur, uitlijning, marge en opvulling. Voor afbeeldingen kun je alternatieve tekst en linkdoelen instellen.

### Eigen CSS

Voor geavanceerde opmaak heeft elke sectie en elk element een veld **Eigen CSS** waarin je je eigen CSS-regels kunt schrijven. Deze gelden alleen voor dat element, zodat ze de rest van de pagina niet per ongeluk beïnvloeden.

:::tip
Als je stijlen over je hele site wilt toepassen -- zoals een eigen lettertype of een algemene kleur -- gebruik dan de instellingen onder [Uiterlijk](./appearance.md) in plaats van eigen CSS op afzonderlijke pagina's.
:::

## Je pagina bekijken

Gebruik de voorbeeldbediening in de werkbalk om te controleren hoe je pagina er op verschillende schermformaten uitziet:

- **Desktop** -- Weergave op volledige browserbreedte
- **Mobiel** -- Smalle weergave op telefoonformaat

Op telefoons worden de kolommen in een rij onder elkaar gestapeld op volle breedte, tenzij je een **Mobiele breedte** voor ze instelt in de instellingen van de rij. Lijsten met preken en podcasts stapelen op telefoons ook de tekst van elke aflevering onder de miniatuur.

Om de live pagina precies te zien zoals bezoekers die zien, ga je terug naar de lijst Pagina's en klik je op het pad van de pagina. Die opent in een nieuw browsertabblad.

## Toegankelijkheid controleren

Klik op het pictogram **Toegankelijkheid** in de werkbalk om een snelle controle uit te voeren op veelvoorkomende problemen -- afbeeldingen zonder alternatieve tekst, lage kleurcontrast of koppen in de verkeerde volgorde. Elk probleem linkt rechtstreeks naar het element dat aandacht nodig heeft, zodat je het ter plekke kunt oplossen.

## Wijzigingen ongedaan maken

De editor houdt je bewerkingsgeschiedenis automatisch bij. Gebruik de knoppen in de werkbalk of sneltoetsen om te navigeren:

- **Ongedaan maken** (Ctrl+Z / Cmd+Z) -- Maak je laatste actie terug
- **Opnieuw** (Ctrl+Shift+Z of Ctrl+Y / Cmd+Shift+Z) -- Herhaal een ongedaan gemaakte actie

Je kunt de pagina ook terugzetten naar een eerdere momentopname. Klik op **Geschiedenis bekijken** in de werkbalk om een lijst met opgeslagen momentopnamen met beschrijvingen te zien, en klik op een item om terug te gaan naar dat punt.

:::warning
Het terugzetten van een momentopname vervangt je huidige paginainhoud door de versie uit de momentopname. Dit kan niet ongedaan worden gemaakt met de gewone knop Ongedaan maken. Sla een momentopname van je huidige situatie op voordat je een oude terugzet, als je de mogelijkheid wilt behouden om terug te keren.
:::

## Opslaan en publiceren

Wijzigingen worden automatisch opgeslagen terwijl je werkt. Een statusindicator in de werkbalk laat zien of je wijzigingen zijn opgeslagen.

### Concept- en gepubliceerde status

Pagina's kunnen een **gepubliceerde** status hebben, die bepaalt wanneer bezoekers je wijzigingen zien. De werkbalk toont een statuslabel met de huidige status:

- **Direct live bij opslaan** -- De pagina gebruikt geen publicatieproces. Elke opgeslagen wijziging gaat direct live. Dit is de standaard voor nieuwe pagina's.
- **Niet-gepubliceerde wijzigingen** -- De pagina is eerder gepubliceerd, maar je hebt wijzigingen gemaakt sinds de laatste publicatie. Bezoekers zien nog steeds de eerder gepubliceerde versie.
- **Gepubliceerd** -- De pagina is live en je opgeslagen inhoud komt overeen met wat bezoekers zien.

Om je wijzigingen te publiceren, klik je op de knop **Publiceren** in de werkbalk. De pagina wordt direct live.

Om terug te gaan naar de laatst gepubliceerde versie zonder wat bezoekers zien te veranderen, open je het overloopmenu (⋮) en klik je op **Niet-gepubliceerde wijzigingen verwerpen**.

Om het publicatieproces niet langer te gebruiken, open je het overloopmenu en klik je op **Publiceren uitschakelen**. Bewerkingen gaan dan weer direct live.

:::tip
Gebruik de concept-/publicatieworkflow wanneer je een pagina wilt voorbereiden -- bijvoorbeeld voor een komend evenement -- en pas op het juiste moment live wilt zetten. Bouw en bekijk de pagina, en klik dan op Publiceren wanneer je er klaar voor bent.
:::

## Gerelateerde artikelen

- [Pagina's beheren](./managing-pages.md) -- Pagina's aanmaken, URL's instellen en sitenavigatie beheren
- [Uiterlijk](./appearance.md) -- Sitebrede kleuren, lettertypen en huisstijl instellen
- [Bestanden](./files.md) -- Afbeeldingen en documenten uploaden om in de editor te gebruiken
- [Formulieren maken](../forms/creating-forms.md) -- Formulieren bouwen die je op pagina's kunt insluiten
