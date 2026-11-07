---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Activeer een sms via [Clearstream](https://clearstream.io) vanuit elke B1-gebeurtenis, zoals een nieuwe persoon, een nieuwe gift, een formulierinzending of een agendawijziging, en haal antwoorden terug als B1-gegevens. De Zapier-app van Clearstream ondersteunt beide richtingen, dus de hele koppeling is een recept en geen maatwerkcode.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Clearstream](https://clearstream.io)-account met minstens één lijst en een sms-tegoed
- Een [Zapier](https://zapier.com)-account
- Een B1Admin-gebruiker met de machtiging **Instellingen bewerken**

</div>

## Wat je kunt koppelen

| Richting | Trigger | Actie |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Abonnee maken/bijwerken + Tekstbericht naar nummer sturen |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Tekstbericht naar lijst sturen (bijv. het financiële team op de hoogte brengen) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Tekstbericht naar een routeringslijst sturen (bijv. het gebedsverzoekteam) |
| Clearstream → B1 | Nieuw inkomend bericht | B1: Persoon aanmaken; label toekennen met het trefwoord dat ze hebben gestuurd |

De Zapier-acties van Clearstream zijn: *Tekstbericht naar nummer sturen*, *Tekstbericht naar lijst sturen*, *Abonnee maken/bijwerken*, *Abonnee toevoegen aan geautomatiseerde workflow*, *Label toevoegen aan abonnee* en *Abonnee verwijderen uit lijst*.

## Instellen

### 1. Maak een B1-API-sleutel aan

**Instellingen → Ontwikkelaar → API-sleutels → Nieuwe API-sleutel**:

- `settings:write`: vereist, zodat B1 de webhook voor de trigger kan registreren
- `people:read`: nodig om de persoon uit de gebeurtenis op te zoeken (`personId` → naam/telefoonnummer/e-mail)
- (Optioneel) `people:write` als tekstantwoorden van Clearstream B1-contacten moeten aanmaken

### 2. Bouw de Zap "tekstbericht bij nieuwe gift"

1. **Trigger**: B1.church: Nieuwe gift
2. **Actie**: B1.church: Persoon zoeken (de `personId` van de gift)
3. **Actie**: Clearstream: Tekstbericht naar nummer sturen. Gebruik het telefoonnummer van de persoon uit stap 2 als ontvanger en stel het bericht op (`"Bedankt voor je gift, {first}! …"`).

Zet de Zap aan. B1 registreert de webhook voor giften bij activering; in **Instellingen → Ontwikkelaar → Webhooks** verschijnt dan `Zapier — donation.created`.

### 3. (Optioneel) Antwoorden terughalen als B1-gegevens

1. **Trigger**: Clearstream: Nieuw inkomend bericht
2. **Actie**: Filter door Zapier op het trefwoord, bijvoorbeeld alleen doorgaan als de berichttekst begint met `PRAY`
3. **Actie**: B1.church: Persoon zoeken (op telefoonnummer)
4. **Actie**: Filter/Pad: als de persoon niet is gevonden, maak deze aan; leg de berichttekst in beide gevallen ergens vast (Slack, een Google Spreadsheet of een B1-formulierinzending via Webhooks by Zapier).

## Veelvoorkomende recepten

### Vrijwilligersteam oproepen

- **Trigger**: B1.church: Nieuwe formulierinzending (gefilterd op de id van het gebedsverzoekformulier)
- **Actie**: Clearstream: Tekstbericht naar lijst sturen, waarbij de lijst je pastorale piketteam is. Stel de tekst op als `Nieuw gebedsverzoek: {data.questions.0.answer}`.

### Opvolgingsreeks voor eerste bezoekers

- **Trigger**: B1.church: Nieuwe persoon, gefilterd op een B1-persoonslabel "Eerste bezoek"
- **Actie**: Clearstream: Abonnee toevoegen aan geautomatiseerde workflow. Koppel de workflow-id aan een vooraf gebouwde tekstreeks van zeven dagen.

### Groepslidmaatschap via trefwoord

- **Trigger**: Clearstream: Nieuw inkomend bericht (filter op het trefwoord `MENS`)
- **Actie**: B1.church: Persoon zoeken (op telefoonnummer); splits bij niet gevonden → Persoon aanmaken
- **Actie**: B1.church: Groepslid toevoegen aan de groep Mannenbediening

## Beperkingen en opmerkingen

- **Clearstream rekent sms'en per bericht.** Elke actie Tekstbericht sturen verbruikt één of meer tegoeden, afhankelijk van de lengte en het aantal ontvangers. Controleer het tegoed van je abonnement.
- **Het telefoonnummer moet in E.164-indeling staan** (bijv. `+15555550199`) voor *Tekstbericht naar nummer sturen*. Het persoonsrecord van B1 slaat op wat er is ingevoerd; gebruik een stap *Formatter by Zapier: Nummers → Telefoonnummer opmaken* als je het formaat niet kunt garanderen.
- **Aan de kant van B1 is geen header nodig.** De authenticatie van Clearstream zit volledig in de Zapier-verbinding.

## Problemen oplossen

- **De trigger wordt nooit geactiveerd**: onder `Instellingen → Ontwikkelaar → Webhooks` zou na het aanzetten van de Zap een regel `Zapier — <gebeurtenis>` moeten staan. Ontbreekt die, dan mist de B1-API-sleutel `settings:write`. Maak de sleutel opnieuw aan en verbind opnieuw.
- **Clearstream meldt "Ongeldig telefoonnummer"**: het ontvangerveld staat niet in E.164. Voeg een stap Telefoonnummer opmaken toe.
- **Tekstbericht naar lijst sturen mislukt met `403`**: de Clearstream-API-gebruiker heeft geen toestemming voor die lijst, of het lijst-id is onjuist. Lijst-id's zijn zichtbaar op de detailpagina van de lijst in Clearstream.

## Zie ook

- [Text In Church](./text-in-church): een alternatief sms-platform met een vergelijkbare koppeling
- [Mobile Message](./mobile-message): voor kerken buiten de Verenigde Staten
- [Zapier (overzicht)](../zapier): de B1-kant van elk Zapier-recept
- [Clearstream API-documentatie](https://api-docs.clearstream.io/): voor maatwerkintegraties die verder gaan dan de Zapier-app
