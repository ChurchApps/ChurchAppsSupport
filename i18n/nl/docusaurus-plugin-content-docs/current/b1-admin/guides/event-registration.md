---
title: "Gids: Event-registratie instellen"
---

# Event-registratie instellen

<div class="article-intro">

Maak een event-registratieformulier, verzamel deelnemerinformatie en optionele betalingen, voeg het in op uw kerkwebsite en beheer inzendingen wanneer deze binnenkomen. Aan het einde hebt u een deelbare registratiepagina voor elk kerk-event.

</div>

:::info
**Twee manieren om event-registratie af te handelen:** Deze gids behandelt **op formulieren gebaseerde registratie**, wat u volledige controle geeft over aangepaste velden en betalingsverzameling. Voor eenvoudiger events waar u gewoon wilt weten wie er komt, gebruikt u **native event-registratie** ingebouwd in de agenda -- zie [Agenda's maken](../calendars/creating-calendars.md#enabling-event-registration) voor setupinstructies. Native registratie stelt leden in staat zich rechtstreeks van de [B1-website](../../b1-church/events/registering) en [mobiele app](../../b1-mobile/events/registering) aan te melden met capaciteit bijhouden, datumvensters en e-mailbevestigingen.
:::

<div class="prereqs">
<h4>Voordat u begint</h4>

- B1 Admin-account met beheerdersrechten
- Voor betalingsverzameling: [Stripe moet eerst zijn geconfigureerd](../donations/online-giving-setup.md)

</div>

## Stap 1: Maak een zelfstandig formulier

Zelfstandige formulieren hebben hun eigen openbare URL die iedereen kan openen -- perfect voor event-registratie.

Volg de gids [Formulieren maken](../forms/creating-forms.md) om:

1. Navigeer naar Formulieren en klik op Formulier toevoegen
2. Kies het type "Stand Alone" -- dit geeft uw formulier zijn eigen openbare URL
3. Noem het naar het event (bijv. "Mannenretreate-registratie", "VBS-aanmelding")

## Stap 2: Voeg vragen toe

Bouw de velden op die u nodig hebt om van inschrijvers te verzamelen.

Volg de gids [Formulieren maken](../forms/creating-forms.md#adding-questions) om uw vragen toe te voegen:

1. Ga naar het tabblad Vragen en voeg velden in voor de informatie die u nodig hebt: naam, e-mail, telefoon, voedingsrestricties, T-shirtmaat, noodcontact, enzovoort.
2. Gebruik Meerdere keuzes voor opties zoals maaltijdvoorkeur of sessieselecties

:::warning
Het veldtype Betaling vereist dat Stripe is geconfigureerd. Zie [Online Geven instellen](../donations/online-giving-setup.md) als u online geven nog niet hebt ingesteld voordat u betalingsvelden toevoegt.
:::

## Stap 3: Configureer formuliereigenschappen

Bepaal wanneer en hoe uw registratieformulier beschikbaar is.

1. Stel beschikbaarheidsdatums in als de registratie slechts voor een beperkte tijd open moet zijn
2. Kopieer de openbare URL -- u kunt deze rechtstreeks delen
3. Voeg formuulierleden toe met Admin- of View Only-rollen om inzendingen te beheren

## Stap 4: Voeg in op uw website

Maak het registratieformulier gemakkelijk te vinden door het toe te voegen aan uw kerkwebsite.

Volg de gids [Pagina's beheren](../website/managing-pages.md) om:

1. Voeg in uw B1-website-editor een nieuwe sectie aan een pagina toe en selecteer het formulierelement
2. Kies uw registratieformulier uit de lijst

:::tip
Deel de zelfstandige URL ook via e-mail, social media en kerkbulletins -- hoe meer plaatsen waar het zichtbaar is, hoe meer aanmeldingen u krijgt.
:::

## Stap 5: Beheer inzendingen

Volg registraties wanneer ze binnenstromen en exporteer gegevens wanneer u deze nodig hebt.

Volg de gids [Inzendingen beheren](../forms/managing-submissions.md) om:

1. Controleer reacties terwijl ze op het tabblad Inzendingen binnenkomen
2. Exporteren naar CSV voor spreadsheets, koppelingsbijhouden of delen met event-coördinatoren

## U bent klaar!

Uw event-registratie is live. Deel de link, voeg deze in op uw website en volg aanmeldingen van B1 Admin. Wanneer het event is voorbij, exporteert u de definitieve lijst voor uw gegevens.

## Gerelateerde artikelen

- [Formulieren maken](../forms/creating-forms.md) -- bouw formulieren met verschillende veldtypen
- [Inzendingen beheren](../forms/managing-submissions.md) -- controleer en exporteer formulierreacties
- [Pagina's beheren](../website/managing-pages.md) -- voeg formulieren in op uw website
- [Online Geven instellen](../donations/online-giving-setup.md) -- vereist voor betalingsvelden
