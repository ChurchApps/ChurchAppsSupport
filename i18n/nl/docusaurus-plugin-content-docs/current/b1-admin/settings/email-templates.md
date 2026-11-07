---
title: "E-mailsjablonen"
description: "Stel e-mail- en sms-sjablonen in B1 Admin in, met samenvoegvelden, sms-opties en voorvertoningen voor massacommunicatie."
---

# E-mailsjablonen

<div class="article-intro">

Met e-mailsjablonen kun je herbruikbare e-mailteksten opslaan -- zoals een welkomstbericht, een herinnering voor een evenement of een bedankbericht voor een gift -- zodat jij (of een [workflow](../serving/workflows.md)) ze met één klik kunt versturen, in plaats van elke keer opnieuw te schrijven. In dezelfde lijst staan ook sjablonen voor sms-berichten voor de groeps- en persoonsvensters voor tekstberichten.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Je hebt toegang nodig tot het gedeelte Instellingen in B1 Admin.

</div>

## Toegang tot e-mailsjablonen

1. Open in B1 Admin het [Jump-menu](../introduction.md#getting-around-with-the-jump-menu) (de zoekbalk linksboven) en klap **Instellingen** uit.
2. Klik op **E-mailsjablonen**.
3. Je ziet een lijst met bestaande sjablonen, met het onderwerp, de categorie en de datum van de laatste wijziging.

## Een sjabloon maken

1. Klik op **Nieuw sjabloon**.
2. Voer een **Sjabloonnaam** in om het sjabloon in de lijst te herkennen, en kies een **Categorie** (Algemeen, Evenementen, Groepen, Giften, Welkom of Tekst) om je sjablonen te ordenen. Kies **Tekst** om in plaats daarvan een sjabloon voor sms-berichten te maken (zie [Tekstsjablonen](#text-templates) hieronder).
3. Voer de **Onderwerpregel** in.
4. Schrijf de **Inhoud** met de rich-text-editor.
5. Klik op **Opslaan**.

## Samenvoegvelden

Klik op een samenvoegveld-chip boven het Onderwerp- of Inhoudsveld om het op de cursorpositie in te voegen -- klik eerst in de tekst op de plek waar het veld moet komen en klik daarna op de chip. Je cursor blijft op zijn plek, zodat je direct na het ingevoegde veld verder kunt typen. Als je op een chip voor de inhoud klikt zonder eerst in de inhoud te klikken, wordt het veld aan het einde van de inhoud toegevoegd. Wanneer de e-mail wordt verzonden, wordt elk samenvoegveld vervangen door de werkelijke gegevens van de ontvanger:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- De naam van de ontvanger
- `{{email}}` -- Het e-mailadres van de ontvanger
- `{{churchName}}` -- De naam van je kerk

## Tekstsjablonen

Een sjabloon met de categorie **Tekst** is een eenvoudig tekstbericht voor sms in plaats van een e-mail:

- Het heeft geen onderwerp. De rich-text-editor wordt vervangen door een eenvoudig vak **Tekstbericht** met maximaal 1.600 tekens.
- De chips met samenvoegvelden boven het vak voegen op de cursorpositie `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` of `{{churchName}}` in.
- Tekstsjablonen verschijnen in de keuzelijst **Sjabloon laden (optioneel)** van het tekstvenster voor een [groep](../groups/group-members.md#texting-group-members) of een afzonderlijk persoon. Als je er een kiest, wordt het bericht ingevuld, en je kunt het nog bewerken voordat je het verstuurt.
- Ze worden niet opgenomen in de keuzelijsten voor e-mailsjablonen, ook niet in de workflow-actie **E-mail verzenden**.

Voor sms-berichten is een verbonden [sms-provider](./church-settings.md#texting) nodig.

## Een sjabloon voorbeeld bekijken

Klik op **Voorbeeld** om te zien hoe het onderwerp en de inhoud eruitzien met voorbeeldgegevens voor de samenvoegvelden, voordat je opslaat of verstuurt.

## Een sjabloon gebruiken

Opgeslagen sjablonen kun je selecteren bij het opstellen van een e-mail aan personen of een groep, en als actie in [Workflows](../serving/workflows.md). Voordat je kerk ze kan verzenden, moet het ChurchApps-team e-mail naar groepen eenmalig goedkeuren. Zie [E-mail naar groepen inschakelen voor je kerk](../groups/group-members.md#turning-on-group-email-for-your-church).

## Bewerken en verwijderen

Klik op het pictogram **Bewerken** naast een sjabloon om het bij te werken, of op het pictogram **Verwijderen** om het permanent te verwijderen.

## Volgende stappen

- [Workflows](../serving/workflows.md) -- Stel automatisch een sjabloonmail in op basis van regels
