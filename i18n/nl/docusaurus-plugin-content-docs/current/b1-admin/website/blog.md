---
title: "Blog"
---

# Blog

<div class="article-intro">

Op de pagina Blog kun je nieuws, updates en overdenkingen publiceren op de website van je kerk. Berichten verschijnen in een kaartenoverzicht op `/blog`, op hun eigen URL en in een RSS-feed die andere tools (zoals Zapier) kunnen volgen om nieuwe berichten te zien.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Voltooi de [Initiële instelling](initial-setup) voor je website
- Voeg een navigatielink naar `/blog` toe via [Pagina's beheren](managing-pages) als bezoekers je blog via het menu moeten kunnen vinden

</div>

## Toegang tot de blog

1. Open in B1 Admin het [Sprongmenu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven) en klap **Website** uit.
2. Klik op **Blog**.
3. De pagina Blog toont alle berichten met hun status en publicatiedatum.

## Een bericht toevoegen

1. Klik rechtsboven op **Bericht toevoegen**.
2. Voer een **Titel** in. Een URL-vriendelijk **Webadres** (slug) wordt automatisch gegenereerd terwijl je typt -- je kunt dit direct bewerken als je een ander adres wilt.
3. Voeg een **Samenvatting** toe -- een korte beschrijving die in het berichtenoverzicht, in meta-beschrijvingen en in de RSS-feed wordt getoond. Als je dit leeg laat, wordt er automatisch een samenvatting gemaakt van het begin van de inhoud van je bericht.
4. Schrijf de tekst van het bericht in de editor **Inhoud** met Markdown. Klik op **Voorbeeld** om te zien hoe het opgemaakte bericht eruitziet.
5. Kies een **Categorie** (kies een bestaande of typ een nieuwe) en optioneel **Tags**, gescheiden door komma's.
6. Klik op **Afbeelding selecteren** om een foto te kiezen uit je [Bestanden](files)-galerij, of upload een nieuwe. Geüploade foto's openen in een ingebouwde bijsnijdtool die vastzit op een verhouding van 16:9, zodat je elke foto kunt bijsnijden om in de koptekst van het bericht en de overzichtskaarten te passen.
7. Stel de **Auteur** in -- standaard ben jij dat, maar je kunt iedere persoon in je database zoeken en selecteren.
8. Zet **Gepubliceerd** aan en stel een **Publicatiedatum** in wanneer je het bericht openbaar wilt maken. Laat het uit om het bericht als concept op te slaan.

:::tip
Stel een **Publicatiedatum** in de toekomst in om een bericht in te plannen. Het blijft verborgen voor bezoekers en toont een **Gepland**-label in de bloglijst tot die datum is aangebroken.
:::

## Berichtstatussen

Elk bericht in de lijst toont een van drie statussen:

- **Concept** -- Niet gepubliceerd. Alleen zichtbaar in de beheeromgeving.
- **Gepland** -- Gepubliceerd staat aan, maar de publicatiedatum ligt in de toekomst.
- **Gepubliceerd** -- Live op je website en opgenomen in de RSS-feed.

## Bewerken, voorbeeld bekijken en verwijderen van berichten

- Klik naast een bericht op **Bewerken** om wijzigingen aan te brengen.
- Klik op **Bekijk op site** (zichtbaar bij gepubliceerde berichten) om het live bericht op je website in een nieuw tabblad te openen.
- Klik op **Verwijderen** om een bericht permanent te verwijderen.

## Hoe bezoekers je blog zien

Gepubliceerde berichten verschijnen op `{yoursite}/blog`, 10 per pagina, met links **Ouder**/**Nieuwer** om door je archief te bladeren, samen met een categoriefilter en de auteur en foto van elk bericht. Tags worden ook als klikbare labels weergegeven, zodat bezoekers de lijst op dezelfde manier op tag kunnen filteren. Afzonderlijke berichten staan op `{yoursite}/blog/{slug}` en bevatten gerelateerde berichten uit dezelfde categorie. De blogpagina publiceert ook een RSS-feed, die automatisch wordt herkend door feedlezers en automatiseringstools zoals Zapier.

:::info
Blogberichten zijn een apart inhoudstype los van gewone websitepagina's -- ze worden niet gemaakt in de [paginaeditor](page-editor) en verschijnen niet in de lijst Pagina's. Dit houdt het schrijven van blogberichten snel en gericht op het schrijven zelf.
:::

## Reacties onder berichten toevoegen

B1 host blogreacties niet zelf, maar je kunt een reactiedienst toevoegen. Je kunt ook iets anders onder elk bericht plaatsen, zoals een aanmelding voor een nieuwsbrief of een geefknop.

1. Meld je aan bij een reactiedienst zoals [Hyvor Talk](https://talk.hyvor.com), [FastComments](https://fastcomments.com) of [Disqus](https://disqus.com) en kopieer de insluitcode.
2. Scrol op de pagina Blog naar **Onder elk bericht**.
3. Plak de insluitcode en klik op **Opslaan**.

De code verschijnt onder de inhoud van elk gepubliceerd bericht. Je reactiedienst regelt de moderatie en spamfiltering, dus controleer het dashboard regelmatig.

:::tip
Maak het vak leeg en klik op **Opslaan** om de code uit elk bericht te verwijderen. Alleen personen die kerkinstellingen mogen bewerken, zien dit vak.
:::

## Volgende stappen

- [Pagina's beheren](managing-pages) -- Een navigatielink naar je blog toevoegen
- [Bestanden](files) -- Foto's uploaden om in je berichten te gebruiken
- [Zapier-integratie](../integrations/zapier.md) -- Automatiseringen starten wanneer nieuwe berichten worden gepubliceerd
