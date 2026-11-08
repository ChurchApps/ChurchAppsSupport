---
title: "Gids: evenementregistratie instellen"
description: "Stel in B1 Admin een registratieformulier voor evenementen in om gegevens van deelnemers en optionele betalingen te verzamelen, het op je kerkwebsite in te sluiten en aanmeldingen bij te houden."
---

# Evenementregistratie instellen

<div class="article-intro">

Maak een registratieformulier voor evenementen, verzamel deelnemersgegevens en optionele betalingen, sluit het in op je kerkwebsite en beheer de inzendingen zodra ze binnenkomen. Aan het eind heb je een deelbare registratiepagina voor elk kerkevenement.

</div>

:::info
**Twee manieren om evenementregistratie af te handelen:** Deze gids behandelt **registratie via formulieren**, waarmee je volledige controle hebt over aangepaste velden en het innen van betalingen. Voor eenvoudigere evenementen waarbij je alleen wilt bijhouden wie er komt, gebruik je de **ingebouwde evenementregistratie** van de agenda -- zie [Agenda's maken](../calendars/creating-calendars.md#enabling-event-registration) voor instructies. Met de ingebouwde registratie kunnen leden zich rechtstreeks aanmelden via [B1.church of de B1 App](../../b1-church/events/registering.md), met capaciteitsbeheer, datumvensters en e-mailbevestigingen.
:::

<div class="prereqs">
<h4>Voordat je begint</h4>

- B1 Admin-account met beheerdersrechten
- Om betalingen te innen: [Stripe moet eerst worden ingesteld](../donations/online-giving-setup.md)

</div>

## Stap 1: Maak een zelfstandig formulier

Zelfstandige formulieren hebben hun eigen openbare URL die iedereen kan openen -- perfect voor evenementregistratie.

Volg de gids [Formulieren maken](../forms/creating-forms.md) om:

1. Naar Formulieren te gaan en op Formulier toevoegen te klikken
2. Het type "Zelfstandig" te kiezen -- hiermee krijgt je formulier zijn eigen openbare URL
3. Het formulier een naam te geven naar het evenement (bijv. "Registratie mannenretraite", "Aanmelding VBS")

## Stap 2: Vragen toevoegen

Stel de velden samen die je van deelnemers nodig hebt.

Volg de gids [Formulieren maken](../forms/creating-forms.md#adding-questions) om je vragen toe te voegen:

1. Ga naar het tabblad Vragen en voeg velden toe voor de gegevens die je nodig hebt: naam, e-mail, telefoonnummer, dieetwensen, T-shirtmaat, noodcontact, enz.
2. Gebruik Meerkeuze voor opties zoals maaltijdvoorkeuren of sessiekeuzes

:::warning
Het veldtype Betaling vereist dat Stripe is ingesteld. Als je online geven nog niet hebt ingesteld, bekijk dan [Online geven instellen](../donations/online-giving-setup.md) voordat je betalingsvelden toevoegt.
:::

## Stap 3: Formulierinstellingen configureren

Bepaal wanneer en hoe je registratieformulier beschikbaar is.

1. Stel beschikbaarheidsdatums in als de registratie alleen gedurende een beperkte tijd open moet zijn
2. Kopieer de openbare URL -- deze kun je direct delen
3. Voeg formulierleden met de rol Beheerder of Alleen weergave toe om het beheer van inzendingen te ondersteunen

## Stap 4: Insluiten op je website

Zorg dat het registratieformulier makkelijk te vinden is door het aan je kerkwebsite toe te voegen.

Volg de gids [Pagina's beheren](../website/managing-pages.md) om:

1. In je B1-websiteeditor een nieuwe sectie aan een pagina toe te voegen en het element Formulier te selecteren
2. Je registratieformulier uit de lijst te kiezen

:::tip
Deel de zelfstandige URL ook via e-mail, sociale media en kerkbulletins -- hoe meer plekken waar het zichtbaar is, hoe meer aanmeldingen je krijgt.
:::

## Stap 5: Inzendingen beheren

Volg registraties zodra ze binnenkomen en exporteer gegevens wanneer je ze nodig hebt.

Volg de gids [Inzendingen beheren](../forms/managing-submissions.md) om:

1. Reacties te bekijken zodra ze binnenkomen op het tabblad Inzendingen
2. Te exporteren naar CSV voor spreadsheets, het bijhouden van aantallen of het delen met evenementcoördinatoren

## Klaar!

Je evenementregistratie is live. Deel de link, sluit het in op je website en volg de aanmeldingen vanuit B1 Admin. Als het evenement voorbij is, exporteer je de definitieve lijst voor je administratie.

## Gerelateerde artikelen

- [Formulieren maken](../forms/creating-forms.md) — formulieren bouwen met verschillende veldtypen
- [Inzendingen beheren](../forms/managing-submissions.md) — formulierreacties bekijken en exporteren
- [Pagina's beheren](../website/managing-pages.md) — formulieren op je website insluiten
- [Online geven instellen](../donations/online-giving-setup.md) — vereist voor betalingsvelden
