---
title: "De pagina-editor gebruiken"
---

# De pagina-editor gebruiken

<div class="article-intro">

De B1-pagina-editor is een visuele sleep-en-neerzet-bouwer waarmee je de pagina's van je kerkwebsite kunt ontwerpen zonder code te schrijven. Je kunt secties en inhoudsblokken toevoegen, stijlen aanpassen, je werk voorvertonen en wijzigingen ongedaan maken -- allemaal vanuit je browser.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Voltooi [Eerste instellingen](initial-setup) om je website te configureren
- Maak minstens één pagina aan in [Pagina's beheren](managing-pages)
- Je hebt de **content.edit**-rechten nodig om toegang te krijgen tot de editor

</div>

## De editor openen

1. Klik in B1 Admin op **Website** in het linkermenu.
2. Zoek de pagina die je wilt bewerken in de Pagina's-tabel en klik op **Bewerken**.

De editor opent in volledig-schermmodus. Het linkerpaneel toont de structuur van je pagina en de beschikbare inhoudselementen; het middengebied toont een live voorvertoning van je pagina.

:::info
De editor wordt altijd weergegeven in lichte modus, ongeacht je thema-instelling in B1 Admin. Dit zorgt ervoor dat de voorvertoning nauwkeurig overeenkomt met hoe je pagina eruitziet voor bezoekers van de website.
:::

## Paginastructuur: secties en elementen

Elke pagina is opgebouwd uit twee niveaus:

- **Secties** -- De containers op het hoogste niveau die je pagina verdelen in horizontale banden (bijvoorbeeld een hero-sectie, een inhoudsblok of een footerstrook). Elke pagina moet minstens één sectie hebben voordat je inhoud kunt toevoegen.
- **Elementen** -- De afzonderlijke inhoudsonderdelen die binnen een sectie worden geplaatst, zoals tekst, afbeeldingen, knoppen, kaarten, formulieren en kalenders.

### Een sectie toevoegen

1. Klik op **Sectie toevoegen** (of de **+**-knop bovenaan het linkerpaneel).
2. Kies hoe je wilt starten:
   - **Vanuit een sjabloon** — blader door de galerij met sectiesjablonen, georganiseerd per categorie (Hero, Over ons, Diensten, Geven, enz.) en klik op een sjabloon om het in te voegen als een volledig gestileerde, vooraf ingevulde sectie. Je kunt na het toevoegen alles aanpassen.
   - **Lege sectie** — kies een kolomindeling (enkel, twee kolommen, drie kolommen, enz.) en bouw vanaf nul.
3. De nieuwe sectie verschijnt in de voorvertoning. Klik erop om hem te selecteren en de achtergrondkleur, opvulling en andere stijlopties te configureren.

### Elementen aan een sectie toevoegen

1. Klik binnen een sectie in de voorvertoning om hem te selecteren.
2. Klik op **Inhoud toevoegen** en kies een elementtype uit de lijst:
   - **Tekst** -- Koppen, alinea's en opgemaakte tekst
   - **Afbeelding** -- Upload of link naar een foto
   - **Knop** -- Een klikbare call-to-action-link
   - **Kaart** -- Een afbeelding met een titel en beschrijving
   - **Formulier** -- Sluit een [formulier](../forms/creating-forms) rechtstreeks in op de pagina
   - **Kalender** -- Toon een evenementenkalender
   - **FAQ** -- Accordeonstijl vraag-en-antwoordblokken
   - **Video** -- Sluit een video in via URL
   - **Groepenbrowser** -- Een filterbare gids van alle kerkgroepen met optioneel zoeken, categoriefilter en labelfilter
   - **Icoonfunctie** -- Een icoon met een titel en korte beschrijving, voor functie- of bedieningshoogtepunten
   - **Galerij** -- Een raster of masonry-indeling met meerdere foto's
   - **Getuigenis** -- Een of meer citaten met naam, rol en foto van de auteur
   - **Sociale iconen** -- Gekoppelde iconen voor de sociale-mediaprofielen van je kerk
   - **Aftellen** -- Een timer die aftelt naar een datum of een wekelijkse diensttijd
   - **Statistieken** -- Een rij grote cijfers met labels (leden, jaren, campussen)
   - **Campagnevoortgang** -- Een live voortgangsbalk voor een geefcampagne, die het totaal opgehaalde bedrag toont ten opzichte van een fondsdoel
   - **Personeelsraster** -- Fotokaarten voor de leden van een groep; de groep moet de optie **openbare ledenlijst** ingeschakeld hebben
   - **Diensttijden** -- Het diensttijdenschema van je campussen, automatisch opgehaald uit de aanwezigheidsinstellingen
   - **Preken** -- Je preekbibliotheek, als een volledige browser of als een raster-, lijst- of uitgelicht-nieuwste-indeling
3. Configureer het element met behulp van het instellingenpaneel dat verschijnt.

### Inhoud herordenen

Sleep secties of elementen met behulp van het greepicoon (zes stippen) aan de linkerkant van elk item om ze te herordenen. Je kunt elementen binnen een sectie slepen of ze tussen secties verplaatsen.

## Je pagina stylen

### Sectiestijlen

Klik op een sectie om het stijlpaneel te openen. Je kunt het volgende instellen:

- **Achtergrond** -- Effen kleur, verloop of afbeelding. Bij gebruik van een afbeeldingsachtergrond laat een **brandpunt**-kiezer je klikken om in te stellen welk deel van de afbeelding gecentreerd blijft naarmate de sectie schaalt, en een **overlay**-kleuroptie laat je een semitransparante tint over de afbeelding toevoegen om de leesbaarheid van tekst te verbeteren.
- **Opvulling** -- Boven- en onderruimte binnen de sectie
- **Breedte** -- Volledige breedte of gecentreerd/beperkt
- **Scheidingen** -- Decoratieve vormscheidingen (golf, schuine kant, curve, driehoek en meer) aan de boven- of onderrand van de sectie, met kleur-, hoogte- en spiegelopties

### Elementstijlen

Klik op een element om het stijlpaneel te openen. Veelvoorkomende opties zijn lettergrootte, kleur, uitlijning, marge en opvulling. Voor afbeeldingen kun je alt-tekst en linkbestemmingen instellen.

### Aangepaste CSS

Voor geavanceerde styling heeft elke sectie en elk element een veld **Aangepaste CSS** waar je je eigen CSS-regels kunt schrijven. Deze zijn beperkt tot dat element, zodat ze de rest van de pagina niet onbedoeld beïnvloeden.

:::tip
Als je stijlen op je hele site wilt toepassen -- zoals een aangepast lettertype of globale kleur -- gebruik dan de instellingen onder [Uiterlijk](appearance) in plaats van aangepaste CSS op individuele pagina's.
:::

## Je pagina voorvertonen

Gebruik de voorvertoningsbediening in de werkbalk om te controleren hoe je pagina eruitziet op verschillende schermformaten:

- **Desktop** -- Weergave over de volledige breedte van de browser
- **Mobiel** -- Smalle weergave op telefoonformaat

Klik op **Voorvertoning** om een live versie van de pagina te openen in een nieuw browsertabblad, precies zoals bezoekers hem zullen zien.

## Wijzigingen ongedaan maken

De editor houdt automatisch je bewerkingsgeschiedenis bij. Gebruik de werkbalkknoppen of sneltoetsen om te navigeren:

- **Ongedaan maken** (Ctrl+Z / Cmd+Z) -- Maak je laatste actie ongedaan
- **Opnieuw** (Ctrl+Y / Cmd+Y) -- Pas een ongedaan gemaakte actie opnieuw toe

Je kunt de pagina ook terugzetten naar een eerdere momentopname. Klik op **Geschiedenis** in de werkbalk om een lijst met opgeslagen momentopnames met beschrijvingen te zien, en klik op een item om terug te keren naar dat punt.

:::warning
Het herstellen van een momentopname vervangt de huidige inhoud van je pagina door de versie van de momentopname. Dit kan niet ongedaan worden gemaakt met de standaard ongedaan-maken-knop. Sla een momentopname van je huidige staat op voordat je een oude versie herstelt, als je de mogelijkheid wilt behouden om terug te keren.
:::

## Opslaan en publiceren

Wijzigingen worden automatisch opgeslagen terwijl je werkt. Een statusindicator in de werkbalk toont of je wijzigingen zijn opgeslagen.

### Concept- en gepubliceerde status

Pagina's kunnen een **gepubliceerde** status hebben, die bepaalt wanneer bezoekers je wijzigingen zien. De werkbalk toont een statuschip met de huidige status:

- **Live bij opslaan** -- De pagina gebruikt geen publicatieworkflow. Elke opgeslagen wijziging gaat direct live. Dit is de standaard voor nieuwe pagina's.
- **Niet-gepubliceerde wijzigingen** -- De pagina is eerder gepubliceerd, maar je hebt wijzigingen aangebracht sinds de laatste publicatie. Bezoekers zien nog steeds de eerder gepubliceerde versie.
- **Gepubliceerd** -- De pagina is live en je opgeslagen inhoud komt overeen met wat bezoekers zien.

Om je wijzigingen te publiceren, klik je op de knop **Publiceren** in de werkbalk. De pagina gaat direct live.

Om terug te keren naar de laatst gepubliceerde versie zonder invloed op wat bezoekers zien, open je het overloopmenu (⋮) en klik je op **Wijzigingen negeren**.

Om een pagina volledig offline te halen, open je het overloopmenu en klik je op **Publicatie ongedaan maken**. Bezoekers zien die pagina niet meer totdat je hem opnieuw publiceert.

:::tip
Gebruik de concept/publicatie-workflow wanneer je een pagina wilt voorbereiden -- bijvoorbeeld voor een aankomend evenement -- en hem pas op het juiste moment live wilt zetten. Bouw en bekijk de pagina, en klik op Publiceren wanneer je klaar bent.
:::

## Gerelateerde artikelen

- [Pagina's beheren](managing-pages) -- Maak pagina's aan, stel URL's in en beheer sitenavigatie
- [Uiterlijk](appearance) -- Stel site-brede kleuren, lettertypen en branding in
- [Bestanden](files) -- Upload afbeeldingen en documenten om in de editor te gebruiken
- [Formulieren maken](../forms/creating-forms) -- Bouw formulieren die je op pagina's kunt insluiten
