---
title: "Betaalde inschrijvingen"
---

# Betaalde inschrijvingen

<div class="article-intro">

Evenementregistratie kan verder gaan dan een eenvoudige koptelling. U kunt geprijsde deelnemertypes definiëren (zoals Volwassene en Kind), optionele extra's aanbieden met hun eigen prijzen en aantallen, kortingscodes aanmaken en betalingen bij inschrijving innen via de bestaande geefprovider van uw kerk. Wanneer een evenement volgeboekt raakt, houdt een optionele wachtlijst geïnteresseerde leden in de rij en promoveert hen automatisch zodra er plekken vrijkomen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Schakel eerst registratie in voor het evenement — zie [Agenda's aanmaken](creating-calendars#enabling-event-registration)
- Om betalingen te innen heeft uw kerk [online geven geconfigureerd](../donations/online-giving-setup.md) nodig (Stripe, PayPal of Kingdom Funding). Gratis evenementen hebben geen geefinstellingen nodig.

</div>

## Registratie-instellingen openen

1. Ga in B1 Admin naar de pagina **Registraties** en open uw evenement (of open het evenement vanuit de agenda).
2. De kaart **Registratie-instellingen** toont de basisgegevens — **Registratie inschakelen**, **Capaciteit**, **Registratie opent/sluit**, **Tags** en **Registratievragen**.
3. Onder de basisgegevens staan drie accordeons: **Deelnemertypes**, **Selecties** en **Kortingscodes**.

## Deelnemertypes

Met deelnemertypes kunt u verschillende prijzen vragen voor verschillende soorten deelnemers — en elk type afzonderlijk beperken.

1. Klap het accordeon **Deelnemertypes** open en klik op **Type toevoegen**.
2. Voer een **Naam** in (bijvoorbeeld "Volwassene", "Kind", "Student").
3. Stel een **Prijs** in. Gebruik 0 voor een gratis type.
4. Stel eventueel een **Capaciteit** in voor alleen dit type (bijvoorbeeld slechts 20 plekken voor Kind). Laat leeg voor geen limiet per type.
5. Klik op **Opslaan**.

Tijdens de inschrijving kiest elke deelnemer een type; uitverkochte types worden weergegeven als **Uitverkocht** en kunnen niet worden geselecteerd. Het overzicht toont het type van elke deelnemer en de lopende aantallen per type.

## Selecties

Selecties zijn optionele extra's met een prijs — T-shirts, maaltijdpakketten, activiteitupgrades.

1. Klap het accordeon **Selecties** open en klik op **Selectie toevoegen**.
2. Voer een **Naam**, optionele **Beschrijving** en een **Prijs** in (0 wordt weergegeven als "Gratis").
3. Stel eventueel een **Capaciteit** in (totaal beschikbaar voor alle registraties) en een **Max. aantal** (het maximumaantal dat één registratie kan bestellen).
4. Klik op **Opslaan**.

Deelnemers kiezen aantallen tijdens de inschrijving, en de totalen tellen mee voor de capaciteit, zodat u nooit te veel verkoopt.

## Kortingscodes

1. Klap het accordeon **Kortingscodes** open en klik op **Kortingscode toevoegen**.
2. Voer de **Code** in die deelnemers zullen typen.
3. Kies het **Type** — **Percentage** of **Bedrag** — en de bijbehorende **Waarde**.
4. Beperk de code eventueel met een **Startdatum**/**Einddatum**, een **Min. aantal leden** (minimumaantal deelnemers op de registratie) en **Max. gebruik**.
5. Klik op **Opslaan**.

Elke code toont een teller **Gebruikt** zodat u kunt zien hoe vaak deze is ingewisseld. Deelnemers krijgen direct feedback wanneer ze een code toepassen — inclusief duidelijke meldingen wanneer een code is verlopen, nog niet is gestart of meer deelnemers vereist.

## Wachtlijst

Schakel **Wachtlijst inschakelen** in op de kaart Registratie-instellingen. Wanneer het evenement de capaciteit bereikt:

- Nieuwe deelnemers krijgen een plek op de wachtlijst aangeboden in plaats van te worden afgewezen. Zij doorlopen dezelfde inschrijving (betaling wordt overgeslagen zolang ze op de wachtlijst staan).
- Wanneer iemand annuleert, wordt de oudste registratie op de wachtlijst automatisch gepromoveerd en ontvangt deze persoon een e-mail dat er een plek vrij is gekomen. Als er nog een saldo openstaat, verwijst de e-mail hen naar het voltooien van de betaling.
- U kunt iemand op elk moment handmatig promoveren met de actie **Promoveren** op een rij op de wachtlijst — nuttig na het verhogen van de evenementcapaciteit.

:::info
Gepromoveerde registraties blijven *in behandeling* totdat een eventueel saldo is betaald; betalen (of niets verschuldigd zijn) bevestigt ze.
:::

## Het registratieoverzicht

Open een evenement vanaf de pagina Registraties om alle registraties te zien. De tabel toont **Naam**, **Leden**, **Type** (het type van elke deelnemer), **Betaald/Totaal** (met een saldowaarschuwing wanneer er nog geld verschuldigd is), **Status** en **Datum**, plus telchips per type boven de tabel.

- Klik op het detailpictogram van een rij om het dialoogvenster **Registratiedetails** te openen — leden, selecties, betaald/saldo en een tabel **Betalingen** met elke transactie (bedrag, methode, datum).
- **CSV exporteren** downloadt het volledige overzicht met kolommen voor leden, deelnemertypes, selecties, betaald/totaal/saldo, status en één kolom per registratievraag.
- Met **Deelnemer toevoegen** kunt u nog steeds offline inschrijvingen handmatig registreren.

:::info
Terugbetalingen worden niet verwerkt binnen B1. Als u een geannuleerde betaalde registratie moet terugbetalen, doe dit dan vanuit het dashboard van uw geefprovider (bijvoorbeeld Stripe).
:::

## Hoe betaling werkt

Betalingen lopen via dezelfde geefgateway die uw kerk al gebruikt voor donaties — kaartgegevens gaan rechtstreeks naar de provider en komen nooit op de servers van B1 terecht. Prijzen worden altijd op de server berekend op basis van uw geconfigureerde types, selecties en kortingscodes, zodat een deelnemer het totaal niet kan manipuleren. Ingelogde leden kunnen betalen met een opgeslagen kaart; gasten voeren een kaart in bij het afrekenen.

## Gerelateerde artikelen

- [Agenda's aanmaken](creating-calendars#enabling-event-registration) — registratie inschakelen en de basisinstellingen
- [Online geven instellen](../donations/online-giving-setup.md) — configureer de betaalgateway die bij het afrekenen wordt gebruikt
- [Inschrijven voor evenementen](../../b1-church/events/registering) — wat leden zien wanneer ze zich inschrijven
- [Mijn registraties](../../b1-church/events/my-registrations) — hoe leden saldi betalen en registraties bewerken
