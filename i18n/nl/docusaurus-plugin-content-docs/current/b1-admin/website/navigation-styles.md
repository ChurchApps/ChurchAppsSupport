---
title: "Navigatiestijlen"
---

# Navigatiestijlen

<div class="article-intro">

Pas de kleuren van de navigatiebalk van uw kerkwebsite aan om bij uw huisstijl te passen. U kunt kleuren configureren voor zowel effen achtergronden als transparante overlays, waardoor u volledige controle hebt over hoe uw navigatie eruitziet op verschillende pagina's.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- U hebt toestemming nodig om uw kerkwebsite te beheren. Zie [Rollen en machtigingen](../people/roles-permissions.md) voor details.
- Houd uw merkkleuren bij de hand, inclusief hexadecimale kleurcodes (bijvoorbeeld #03A9F4).
- Begrijp het verschil tussen effen en transparante navigatiestijlen op uw website.

</div>

## Navigatiemodi begrijpen

Uw websitenavigatie kan op twee verschillende manieren verschijnen, afhankelijk van de pagina:

- **Effen navigatie** -- Navigatiebalk met een achtergrondkleur, meestal gebruikt op contentpagina's
- **Transparante navigatie** -- Navigatie die over de paginacontent heen ligt, meestal gebruikt op pagina's met hero-afbeeldingen of volledige achtergronden

U kunt de kleuren voor beide modi onafhankelijk van elkaar aanpassen.

## Toegang tot Navigatiestijlen

1. Navigeer naar **Website** in B1 Admin
2. Klik op **Uiterlijk** in de zijbalk
3. Scroll naar de sectie **Navigatiestijlen**
4. Klik op **Navigatiestijlen bewerken**

## Effen navigatie configureren

Effen navigatie verschijnt met een achtergrondkleur achter de navigatiebalk. U kunt het volgende aanpassen:

### Achtergrondkleur

1. Schakel de knop **Overschrijven** in voor **Achtergrondkleur**
2. Klik op de kleurkiezer
3. Kies de gewenste achtergrondkleur
4. De standaardwaarde is wit (#FFFFFF)

### Linkkleur

1. Schakel de knop **Overschrijven** in voor **Linkkleur**
2. Kies de kleur voor de tekst van navigatielinks
3. Dit heeft invloed op links in hun standaardtoestand
4. De standaardwaarde is donkergrijs (#555555)

### Linkkleur bij hover

1. Schakel de knop **Overschrijven** in voor **Linkkleur bij hover**
2. Kies de kleur waar links naar veranderen wanneer gebruikers erover hoveren
3. Dit geeft visuele feedback voor klikbare links
4. De standaardwaarde is lichtblauw (#03A9F4)

### Actieve kleur

1. Schakel de knop **Overschrijven** in voor **Actieve kleur**
2. Kies de kleur voor de link van de huidige actieve pagina
3. Dit helpt gebruikers te zien op welke pagina ze zich bevinden
4. De standaardwaarde is lichtblauw (#03A9F4)

## Transparante navigatie configureren

Transparante navigatie ligt over uw paginacontent heen zonder achtergrond. U kunt het volgende aanpassen:

### Linkkleur

1. Schakel de knop **Overschrijven** in voor **Linkkleur**
2. Kies een kleur die goed contrasteert met uw paginaachtergrond
3. Wit of lichte kleuren werken vaak het beste op donkere achtergronden
4. De standaardwaarde is donkergrijs (#555555)

### Linkkleur bij hover

1. Schakel de knop **Overschrijven** in voor **Linkkleur bij hover**
2. Kies de kleur voor de hoverstatus
3. Zorg ervoor dat deze zichtbaar is tegen uw paginaachtergrond
4. De standaardwaarde is lichtblauw (#03A9F4)

### Actieve kleur

1. Schakel de knop **Overschrijven** in voor **Actieve kleur**
2. Kies de kleur voor de indicator van de actieve pagina
3. Moet opvallen en toch bij uw ontwerp passen
4. De standaardwaarde is lichtblauw (#03A9F4)

:::info
Transparante navigatie heeft geen instelling voor achtergrondkleur, omdat deze rechtstreeks over de paginacontent heen ligt.
:::

## Uw wijzigingen opslaan

1. Klik na het configureren van uw kleuren op **Navigatiestijlen opslaan**
2. Uw wijzigingen worden onmiddellijk toegepast op uw live website
3. Bezoek uw website om de navigatie in beide modi te bekijken

## Terugzetten naar standaardwaarden

Als u terug wilt naar de standaardkleuren:

1. Schakel de knoppen **Overschrijven** uit voor aangepaste kleuren
2. Klik op **Navigatiestijlen opslaan**
3. De navigatie keert terug naar het standaard kleurenschema

Of klik op **Annuleren** om alle wijzigingen te verwerpen zonder op te slaan.

## Aanbevolen werkwijzen

### Kleurcontrast

- **Leesbaarheid** -- Zorg ervoor dat linkkleuren voldoende contrast hebben met de achtergrond
- **WCAG-naleving** -- Streef naar minstens een contrastverhouding van 4,5:1 voor toegankelijkheid
- **Test beide modi** -- Bekijk uw site vooraf met zowel effen als transparante navigatie

### Merkconsistentie

- **Gebruik uw merkkleuren** -- Laat het overeenkomen met uw logo en websitethema
- **Beperk uw kleurenpalet** -- Houd het bij 2-3 kleuren voor een samenhangende uitstraling
- **Houd rekening met uw afbeeldingen** -- Test bij gebruik van transparante navigatie tegen typische paginaachtergronden

### Hover- en actieve statussen

- **Duidelijke feedback** -- Zorg dat hoverstatussen duidelijk afwijken van standaardlinks
- **Onderscheid actieve pagina's** -- Gebruik een duidelijk onderscheidende kleur zodat gebruikers weten waar ze zijn
- **Vloeiende overgangen** -- Het systeem animeert kleurwijzigingen automatisch

## Problemen oplossen

### Kleuren zien er niet goed uit

- **Wis uw cache** -- Browsercaching kan oude kleuren weergeven
- **Controleer hexcodes** -- Zorg ervoor dat u geldige hexadecimale kleurcodes hebt ingevoerd
- **Test op verschillende achtergronden** -- Kleuren kunnen er anders uitzien afhankelijk van de pagina

### Navigatie niet zichtbaar

- **Transparante modus** -- Bij gebruik van transparante navigatie over lichte afbeeldingen kan donkere tekst moeilijk zichtbaar zijn
- **Oplossing** -- Pas uw linkkleuren aan of gebruik donkerdere paginaachtergronden
- **Alternatief** -- Voeg een subtiele schaduw of achtergrondoverlay toe aan het navigatiegebied

## Technische details

Navigatiestijlen worden opgeslagen als JSON en toegepast met CSS-variabelen:

- Wijzigingen worden onmiddellijk van kracht zonder de site opnieuw te bouwen
- Kleuren cascaderen naar alle navigatie-elementen
- Overschrijvingen zijn optioneel; niet-ingestelde kleuren gebruiken themastandaarden

## Gerelateerde artikelen

- [Uiterlijk](./appearance.md) -- Pas het algehele uiterlijk van uw website aan
- [Pagina's beheren](./managing-pages.md) -- Maak en organiseer uw websitepagina's
- [Pagina-editor](./page-editor.md) -- Ontwerp paginalayouts en content
