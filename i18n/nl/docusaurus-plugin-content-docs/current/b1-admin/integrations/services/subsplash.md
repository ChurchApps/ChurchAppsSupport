---
title: "Subsplash"
description: "Koppel Subsplash-donaties, nieuwe personen en formulierreacties aan B1 met Zapier, zodat giften en profielen automatisch in B1 Admin terechtkomen."
---

# Subsplash

<div class="article-intro">

Als je Subsplash gebruikt voor je kerk-app, giving of formulieren, maar B1 als systeem van record voor personen en donaties wilt gebruiken, kan de Zapier-app van Subsplash donaties, nieuwe profielen en formulierreacties realtime naar B1 doorsturen. Let op: de Zapier-app van Subsplash werkt momenteel **alleen met triggers**. De koppeling is eenrichtingsverkeer (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een Subsplash-account met een abonnement dat **API- en Zapier-toegang** omvat (vraag dit na bij je Client Success Manager van Subsplash, want dit hangt af van het abonniesniveau)
- Een [Zapier](https://zapier.com)-account
- Een B1Admin-gebruiker met de rechten **Edit Settings**

</div>

## Wat je kunt koppelen

Alle onderstaande triggers komen van Subsplash. De acties komen van B1.

| Subsplash-trigger | B1-actie |
|---|---|
| Nieuwe donatie | Persoon zoeken → Donatie toevoegen (Persoon aanmaken als die ontbreekt) |
| Nieuwe toezegging | Donatie toevoegen (met `notes` = "Toezegging: …") |
| Nieuwe persoon aangemaakt | Persoon aanmaken |
| Profiel van persoon bijgewerkt | (geen directe B1-actie; log naar een Google Sheet voor handmatige controle) |
| Nieuwe formulierreactie | Persoon aanmaken + (optioneel) groepslid toevoegen op basis van het formulier |

Op dit moment ondersteunt de app van Subsplash alleen de richting Subsplash → B1.

## Instellen

### 1. Maak een B1 API-sleutel aan

Ga in B1Admin naar **Instellingen → Developer → API-sleutels → Nieuwe API-sleutel**. Scopes:

- `people:read`: om de donor op e-mailadres op te zoeken
- `people:write`: om de persoon aan te maken als die nog niet bestaat
- `donations:write`: om de gift te registreren
- (Geen `settings:write` nodig. De trigger wordt hier beheerd door Subsplash, niet door B1.)

### 2. Koppel Subsplash aan Zapier

Volg de [Zapier-integratiehandleiding van Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash geeft je via het Subsplash-dashboard een API-token uit dat Zapier gebruikt om de trigger aan de Subsplash-kant te authenticeren.

### 3. Bouw de Zap "donatie registreren"

1. **Trigger**: Subsplash: Nieuwe donatie
2. **Actie**: B1.church: Persoon zoeken (op e-mailadres)
3. **Filter / Pad**: splits op basis van "persoon gevonden":
   - **Gevonden:** B1.church: Donatie toevoegen. Koppel bedrag, datum, fonds, methode = "Online" en notes = de Subsplash-transactie-id.
   - **Niet gevonden:** B1.church: Persoon aanmaken → B1.church: Donatie toevoegen (met de id van de nieuw aangemaakte persoon).

Zet de Zap aan. Nieuwe donaties via Subsplash verschijnen binnen enkele seconden onder **B1Admin → Donations**.

## Veelvoorkomende recepten

### Stuur een bedankbericht bij een eerste gift

- **Trigger**: Subsplash: Nieuwe donatie
- **Actie**: Filter van Zapier: ga alleen door als dit de eerste gift van de donor is (gebruik een *Lookup Table* op donor-e-mail tegen een Google Sheet met eerdere gevers, of een Zapier *Paths*-stap op basis van de datum waarop de donor is aangemaakt)
- **Actie**: Mailchimp / SMTP / SendGrid: stuur het bedankbericht voor de eerste gift
- **Actie**: B1.church: Donatie toevoegen (zoals gebruikelijk)

### Haal toezeggingen uit de reguliere giving-stroom

- **Trigger**: Subsplash: Nieuwe toezegging
- **Actie**: B1.church: Donatie toevoegen met `notes = "Toezegging: Subsplash"` en een fonds met de naam `Toezeggingen` (los van je exploitatiefonds), zodat je toezeggingen apart kunt rapporteren onder **B1Admin → Donations → Summary**.

### Synchroniseer nieuwe app-gebruikers als B1-personen

- **Trigger**: Subsplash: Nieuwe persoon aangemaakt
- **Actie**: B1.church: Persoon aanmaken, met naam, e-mailadres en telefoonnummer. Label de persoon in B1 door hem of haar toe te voegen aan een groep zoals "Subsplash-appgebruikers".

## Beperkingen en opmerkingen

- **De Zapier-app van Subsplash werkt alleen met triggers.** Als je wilt dat wijzigingen in B1 ook in Subsplash terechtkomen (bijvoorbeeld een nieuwe B1-persoon die ook in Subsplash wordt aangemaakt), moet je die brug zelf bouwen. Gebruik dan triggers uit de Zapier-app van B1 die via de actie *Webhooks by Zapier — POST* de REST-API van Subsplash aanroepen. Dat is een maatwerkintegratie en geen kant-en-klaar recept.
- **API-toegang hangt af van je abonnement.** Als de Zapier-verbinding mislukt met `403 Forbidden`, omvat je Subsplash-abonnement waarschijnlijk geen API-toegang. Neem contact op met je Client Success Manager.
- **Fondstoewijzing is handmatig.** Subsplash geeft een campagne- of categorienaam door, maar B1 heeft een numeriek fonds-id nodig. Leg het fonds vast in de Zap of onderhoud een Zapier *Lookup Table* die Subsplash-campagnes koppelt aan B1-fondsen.

## Problemen oplossen

- **Geen trigger na een donatie**: controleer in het Zapier-dashboard van Subsplash of de verbinding nog steeds *Connected* aangeeft. Als het API-token aan de Subsplash-kant is vernieuwd, stopt de Zap stilzwijgend. Maak dan opnieuw verbinding.
- **B1 *Donatie toevoegen* mislukt met 422**: meestal ontbreekt het `fundId` of is het niet herkend. Bekijk je fondsen via **B1Admin → Donations → Funds** en kopieer het exacte id naar de Zap-stap.
- **Eerste gift wordt twee keer verwerkt**: Subsplash stuurt een trigger soms opnieuw als Zapier de bevestiging heeft gemist. Voeg een *Filter van Zapier* toe op het donatie-id (Subsplash stuurt dit mee in de payload) om duplicaten te negeren.

## Zie ook

- [Donorbox](./donorbox.md): hetzelfde receptmodel, maar voor een ander donatieplatform
- [Zapier (overzicht)](../zapier.md): de B1-kant van elk Zapier-recept
- [Zapier-integratiehandleiding van Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentatie van Subsplash)
