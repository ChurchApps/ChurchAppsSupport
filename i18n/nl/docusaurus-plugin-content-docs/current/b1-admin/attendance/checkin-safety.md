---
title: "Veiligheid bij inchecken"
---

# Veiligheid bij inchecken

<div class="article-intro">

B1 bevat een set kinderveiligheidsfuncties voor het inchecken: limieten voor de zaalcapaciteit en de verhouding tussen vrijwilligers en kinderen, leeftijds- en groepsadvies bij de kiosk, inchecktypes die leden, gasten en vrijwilligers onderscheiden, en een lijst met vertrouwde ophaalpersonen per huishouden die bij het uitchecken wordt geverifieerd. Deze pagina beschrijft hoe u elke veiligheidsfunctie in B1 Admin configureert.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Stel uw [aanwezigheidsstructuur](setup.md) en [incheckkiosken](check-in.md) in
- Zalen zijn [groepen](../groups/creating-groups.md) die zijn gekoppeld aan diensttijden — de onderstaande veiligheidsinstellingen bevinden zich op de groep
- Ouder oproepen en noodberichten vereisen een gekoppelde sms-provider ([Text In Church](../integrations/services/text-in-church), [Clearstream](../integrations/services/clearstream) of Mutual Ministry)

</div>

## Zaalcapaciteit en een zaal sluiten

Elke incheckzaal (groep) kan zijn eigen limieten afdwingen. Open de groep, klik op het **potloodpictogram** om de instellingen te bewerken en zoek de sectie **Check-In-capaciteit**:

- **Capaciteit** -- Het maximumaantal personen dat tegelijk in deze zaal kan worden ingecheckt. Wanneer de zaal vol is, wordt inchecken geblokkeerd en meldt de kiosk dat de zaal vol is.
- **Gastcapaciteit** -- Een optionele afzonderlijke limiet voor het aantal gasten dat de zaal kan bevatten.
- **Gesloten voor inchecken** -- Zet op **Ja** om alle inchecks in deze zaal onmiddellijk te stoppen (bijvoorbeeld wanneer een klas is geannuleerd of een zaal niet beschikbaar is). Uitchecken blijft werken.

## Vrijwilligersverhoudingen

Dezelfde sectie **Check-In-capaciteit** op de groep bevat bemanningsregels:

- **Kinderen per vrijwilliger** -- Het maximumaantal kinderen dat elke ingecheckte vrijwilliger kan begeleiden (bijvoorbeeld 5 betekent één vrijwilliger per vijf kinderen).
- **Minimum aantal vrijwilligers** -- Het kleinste aantal vrijwilligers dat moet zijn ingecheckt voordat kinderen in de zaal kunnen inchecken.

Vrijwilligers tellen mee voor deze regels wanneer ze bij de kiosk inchecken met het type **Vrijwilliger** (zie [Inchecktypes](#check-in-types) hieronder).

### Waarschuwen versus blokkeren kiezen

Hoe strikt verhoudingen worden gehandhaafd, is een kerkbrede instelling:

1. Ga in B1 Admin naar **Instellingen > Kerk beheren** en open de tegel **Check-In**.
2. Stel **Handhaving vrijwilligersverhouding** in:
   - **Waarschuwen (toestaan met bevestiging)** -- De kiosk toont een waarschuwing wanneer een zaal boven de verhouding zit of onder het minimumaantal vrijwilligers, en een medewerker kan bevestigen om toch door te gaan. Dit is de standaardinstelling.
   - **Blokkeren (inchecken voorkomen)** -- Inchecken in de zaal wordt geweigerd totdat er voldoende vrijwilligers zijn ingecheckt.

:::info
Capaciteit en Gesloten voor inchecken zijn altijd harde limieten — de keuze tussen waarschuwen en blokkeren geldt alleen voor vrijwilligersverhoudingen.
:::

## Inchecktypes

Bij elke inchecking wordt vastgelegd of de persoon een **Lid**, **Gast** of **Vrijwilliger** is. Het type wordt gekozen met chips op het huishoudscherm van de kiosk (Lid is de standaardwaarde). Types voeden de veiligheidsregels — vrijwilligers zorgen voor dekking van de verhouding, en gasten tellen mee voor de gastcapaciteit van de zaal.

## Leeftijds- en groepsadvies voor zalen

U kunt elke zaal leeftijds- of groepsgrenzen geven, zodat de kiosk gezinnen naar de juiste zalen leidt:

- Gebruik in de instellingen van de groep de sectie **Leeftijd en groep** om de minimum-/maximumleeftijd (jaren en maanden) en/of groep voor de zaal in te stellen.
- Bij de kiosk worden zalen waarvoor een kind in aanmerking komt, gemarkeerd en zalen waarvoor dit niet geldt, worden gedimd. Een gedimde zaal kan nog steeds worden gekozen na bevestiging door een medewerker — het advies blokkeert nooit hard.

Groepen gaan over op de **groepspromotiedatum** van uw kerk:

1. Ga in B1 Admin naar **Instellingen > Kerk beheren** en open de tegel voor groepspromotie.
2. Stel de maand en dag in waarop uw kerk leerlingen promoveert (bijvoorbeeld 1 augustus). Leeftijden en groepen bij de kiosk worden berekend vanaf de meest recente promotiedatum.

## Vertrouwde en niet-geautoriseerde ophaalpersonen

Elk huishouden kan een lijst bijhouden van personen die de kinderen wel of niet mogen ophalen.

1. Open de pagina van een persoon in **Personen** en zoek de kaart **Ophalen**.
2. Klik op **Toevoegen**. Zoek naar een bestaande persoon, of voeg iemand toe die niet in het systeem staat door diens **Naam**, **Relatie** en een foto in te voeren.
3. Stel de **Status** in:
   - **Vertrouwd** -- Bij het uitchecken verschijnt deze persoon als een aantikbare ophaalkaart met foto, waardoor geverifieerd ophalen snel gaat.
   - **Niet geautoriseerd** -- Als iemand probeert op te halen onder deze naam, blokkeert de kiosk het uitchecken met een waarschuwing. Een medewerker kan dit overschrijven, en de overschrijving wordt vastgelegd op het aanwezigheidsrecord.

Klik op de statuschip van een persoon op de kaart om te wisselen tussen Vertrouwd en Niet geautoriseerd.

:::tip
Voeg waar mogelijk foto's toe aan vertrouwde ophaalpersonen — het uitcheckscherm toont de foto zodat vrijwilligers de persoon die voor hen staat visueel kunnen verifiëren.
:::

## Ouder oproepen en noodberichten

Beide functies versturen sms-berichten via de gekoppelde sms-provider van uw kerk — er is geen ingebouwde sms-service, dus eerst moet een van de ondersteunde providers worden geconfigureerd.

- **Ouder oproepen** -- Vanaf het uitcheckscherm van een bemande kiosk kan een medewerker de ouders/voogden van een ingecheckt kind een sms sturen (bijvoorbeeld "Kom alstublieft naar de crèche").
- **Noodbericht** -- Vanuit de beheerinstellingen van de kiosk kan een medewerker in één keer een sms sturen naar de voogden van elk ingecheckt huishouden voor de geselecteerde dienst. Voor het verzenden moet **EMERGENCY** worden getypt ter bevestiging.

Personen die zich hebben afgemeld voor sms-berichten, of die geen mobiel nummer geregistreerd hebben, worden automatisch overgeslagen — de kiosk rapporteert hoeveel berichten zijn verzonden en hoeveel zijn overgeslagen.

Zie de doorloop aan de kioskzijde in [Uitchecken en kinderveiligheid](../../b1-checkin/check-in/checking-out).

## Gerelateerde artikelen

- [Check-In](check-in.md) — kiosk-instellingen en hardware
- [Uitchecken en kinderveiligheid](../../b1-checkin/check-in/checking-out) — het uitchecken bij de kiosk, ophaalverificatie en oproepfuncties
- [Groepen aanmaken](../groups/creating-groups.md) — waar zaalinstellingen zich bevinden
- [Aanwezigheid instellen](setup.md) — diensten, diensttijden en zaaltoewijzingen
