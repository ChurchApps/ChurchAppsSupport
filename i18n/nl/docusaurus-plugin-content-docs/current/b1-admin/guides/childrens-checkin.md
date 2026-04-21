---
title: "Gids: Incheck-systeem voor kinderministerie instellen"
---

# Incheck-systeem voor kinderministerie instellen

<div class="article-intro">

Deze gids beleidt u door alles wat u nodig hebt om een incheck-systeem voor kinderen in uw kerk te laten werken -- van gezinnen in de database invoeren tot het configureren van leeftijdsgeschikte groepen tot het afdrukken van naamkaarten zondagmorgen. Aan het einde kunnen ouders hun kinderen in een kioskletablet inchecken en een bijpassend beveiligingslabel ontvangen.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Maak uw kerkrekening aan op [admin.b1.church](https://admin.b1.church)
- Zorg ervoor dat u beheerdersrechten hebt -- zie [Rollen & Machtigingen](../people/roles-permissions.md) indien nodig
- Optioneel: Bereid een CSV-bestand met gezinnen voor als u van een ander systeem migreert

</div>

## Stap 1: Voeg gezinnen toe aan uw database

Voordat incheck kan werken, moet het systeem over uw gezinnen weten. Elk kind moet via de huishoudfunctie aan een ouder worden gekoppeld.

Volg de gids [Personen toevoegen](../people/adding-people.md) om minstens één gezin toe te voegen. Zorg ervoor dat u:

- De ouder(s) eerst toevoegt
- Elk kind toevoegt
- Koppel ze in dezelfde huishouding met behulp van de [huishoudeditor](../people/adding-people.md#managing-households)

:::tip
Als u meer dan een paar gezinnen moet toevoegen, gebruikt u in plaats daarvan het hulpmiddel [CSV Import](../people/importing-data.md). U kunt uw volledige directorybestanden in minuten importeren.
:::

## Stap 2: Maak kindgroepen

Groepen bepalen in welke klassen kinderen inchecken. U wilt doorgaans één groep per leeftijdsgroep.

Volg de gids [Groepen maken](../groups/creating-groups.md) om groepen als volgt te maken:

- **Nursery** (leeftijd 0-2)
- **Kleuterschool** (leeftijd 3-5)
- **Basisschool** (leeftijd 6-10)

U kunt de namen en leeftijdsbereiken aanpassen aan uw ministeristructuur.

## Stap 3: Configureer campussen en services

Incheck is gekoppeld aan specifieke servicetijden. U hebt minstens één campus en één service nodig die zijn geconfigureerd.

Volg de gids [Aanwezigheidsinstelling](../attendance/setup.md) om:

1. Uw campus toe te voegen (bijv. "Hoofdcampus")
2. Een service toe te voegen (bijv. "Zondagmorgen")
3. De servicetijd in te stellen (bijv. "09:00 uur")
4. Uw kindgroepen aan de service toe te wijzen

## Stap 4: Stel de incheck-app in

Verbind nu alles door de incheck-app op een tablet te installeren.

1. Installeer de **B1 Checkin-app** -- zie het artikel [Incheck](../attendance/check-in.md) voor downloadlinks
2. Meld u aan met uw B1 Admin-aanmeldgegevens
3. Selecteer uw campus en servicetijd

Zie het volledige artikel [Incheck](../attendance/check-in.md) voor gedetailleerde setupstappen.

## Stap 5: Zorg voor uw hardware

U hebt een tablet nodig voor de kiosk en optioneel een Brother labelprinter voor naamkaarten.

Minimaal:
- **Eén Android of Amazon Fire-tablet** -- zie [aanbevolen tablets](../attendance/check-in.md#recommended-hardware)
- **Eén Brother labelprinter** -- de QL-1110NWB wordt aanbevolen vanwege de Bluetooth- en WiFi-ondersteuning
- **Brother DK-1201 labels** (1-1/7" x 3-1/2")

:::warning
Alleen Brother-labelprinters zijn compatibel met de B1 Checkin-app. Andere printermerkenen zullen niet werken.
:::

## Stap 6: Voer een testincheck uit

Voer vóór zondagmorgen een testronde uit:

1. Open de B1 Checkin-app op uw tablet
2. Selecteer uw campus en de juiste servicetijd
3. Zoek naar één van de gezinnen die u hebt toegevoegd
4. Checkin een kind in en controleer:
   - De aanwezigheid verschijnt in B1 Admin onder **Aanwezigheid**
   - Indien u een printer gebruikt, wordt een naamkaart correct afgedrukt

:::tip
Train uw welkomsteamvrijwilligers op het incheckproces voordat u start. Meestal is een korte uitleg van 5 minuten alles wat nodig is.
:::

## U bent klaar!

Uw incheck-systeem voor kinderministerie is gereed. Ouders kunnen hun gezin zoeken, hun kinderen selecteren en inchecken in de kiosk. Aanwezigheid wordt automatisch in B1 Admin geregistreerd.

## Gerelateerde artikelen

- [Personen toevoegen](../people/adding-people.md) -- voeg meer gezinnen toe wanneer zij bezoeken
- [Groepen maken](../groups/creating-groups.md) -- beheer uw kindgroepen
- [Aanwezigheidsinstelling](../attendance/setup.md) -- configureer campussen en services
- [Incheck](../attendance/check-in.md) -- gedetailleerde incheck-app-installatie en hardware
- [Aanwezigheid bijhouden](../attendance/tracking-attendance.md) -- bekijk incheck-rapporten
