---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Als uw kerk giften ontvangt via Donorbox maar mensen en overzichten in B1 bijhoudt, kunt u met de directe Zapier-triggers van Donorbox overeenkomende giftregistraties in B1 laten aanmaken. Als de donor nog niet bestaat, kan daarbij ook meteen een B1-persoon worden aangemaakt. Geen handmatige afstemming, geen maandelijkse export.

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Een [Donorbox](https://donorbox.org)-account met minstens één campagne
- Een [Zapier](https://zapier.com)-account
- Een B1Admin-gebruiker met de rechten **Instellingen bewerken**

</div>

## Wat u kunt koppelen

| Richting | Donorbox-trigger | B1-actie |
|---|---|---|
| Donorbox → B1 | Nieuwe of bijgewerkte donatie (direct) | Persoon zoeken → Donatie toevoegen |
| Donorbox → B1 | Nieuwe of bijgewerkte donor | Persoon aanmaken |
| Donorbox → B1 | Nieuw of bijgewerkt plan (terugkerend) | Persoon zoeken → Donatie toevoegen (gebruik het plan-id als notitie) |

Donorbox publiceert zijn triggers als **direct**. Ze worden binnen enkele seconden geactiveerd na een echte donatie. Er is geen vertraging door peilen.

## Installatie

### 1. Maak een B1 API-sleutel aan

In B1Admin: **Instellingen → Ontwikkelaar → API-sleutels → Nieuwe API-sleutel**. Scopes:

- `people:read`: om de donor op e-mailadres op te zoeken
- `people:write`: om die aan te maken als de donor nieuw is
- `donations:write`: om de gift vast te leggen

Triggers in deze richting komen van Donorbox, niet van B1. Daarom hebt u hier `settings:write` niet nodig.

### 2. Bouw de Zap "donatie vastleggen"

1. **Trigger**: Donorbox: Nieuwe donatie. Verbind met de API-sleutel van Donorbox (in Donorbox: *Account → Profiel → API-instellingen*).
2. **Actie**: B1.church: Persoon zoeken. Koppel het e-mailadres van de donor uit de trigger aan het zoekveld *E-mail*.
3. **Actie**: Filter door Zapier (optioneel): ga alleen door als de donor niet is gevonden, dan…
4. **Actie**: B1.church: Persoon aanmaken. Koppel voornaam, achternaam en e-mail, zodat de donor als lid wordt opgeslagen en niet alleen als giftregistratie.
5. **Actie**: B1.church: Donatie toevoegen. Koppel:
   - Bedrag → `data.amount`
   - Donatiedatum → donatiedatum uit de trigger
   - Fonds → kies het B1-fonds dat overeenkomt met de Donorbox-campagne (met Zapier kunt u fondsen wisselen op basis van een filter of een Formatter-stap)
   - Methode → "Online"
   - Notities → Donorbox-transactie-id (handig bij afstemming)

Zet de Zap aan. De volgende live donatie via Donorbox komt automatisch terecht in **B1Admin → Donaties**.

## Veelgebruikte recepten

### Eén Zap per fonds

Als u meerdere Donorbox-campagnes draait die naar aparte B1-fondsen gaan, is de overzichtelijkste opzet één Zap per campagne, met bovenaan een filter op de *campagne* van Donorbox. Zo ligt de fondskoppeling vast en slaat u de opzoekstap over.

### Bijgewerkte donaties behandelen als correcties

Donorbox' *Nieuwe of bijgewerkte donatie* wordt ook geactiveerd bij bewerkingen. Gebruik een Zapier-stap *Pad* op `event_type` om te splitsen: "new" → Donatie toevoegen, "updated" → Donatie zoeken + Bijwerken. Let op: de Zapier-app van B1 heeft momenteel geen actie *Donatie bijwerken*. Registreer "updated"-gebeurtenissen daarom voorlopig in een Slack-kanaal voor handmatige beoordeling.

### Wijzigingen in terugkerende plannen naar een Slack-kanaal sturen

- **Trigger**: Donorbox: Nieuw of bijgewerkt plan
- **Actie**: Slack: Bericht verzenden naar `#donations` (bijv. "Plan gewijzigd: de maandelijkse gift van Sarah is nu $200")

## Beperkingen en opmerkingen

- **Koppel donors op e-mailadres.** Donorbox deelt het persoon-id van B1 niet. De enige duurzame koppelsleutel is het e-mailadres. Donors die onder een ander e-mailadres geven, krijgen een nieuwe B1-persoon. Uw maandelijkse afstemming moet hierop letten.
- **Terugboekingen worden niet apart weergegeven.** Donorbox stuurt een statusupdate voor dezelfde donatie. De Zapier-app van B1 heeft momenteel geen actie *Donatie bijwerken*. Het veilige patroon is nu om terugboekingen buiten het systeem te registreren en de donatie handmatig aan te passen.
- **Test eerst in de sandbox van Donorbox** om te voorkomen dat er nepgiften in de productieomgeving van B1 terechtkomen. Donorbox levert testmodus-gegevens die los staan van de live-gegevens.

## Probleemoplossing

- **Elke keer de waarschuwing "Persoon niet gevonden"**: dat is prima als u de stappen zo hebt geordend dat een *Persoon aanmaken* in de tak "niet gevonden" wordt uitgevoerd. Als de stap Persoon aanmaken ook nooit wordt uitgevoerd, controleer dan of de API-sleutel `people:write` heeft.
- **Donatiebedrag lijkt 100× te groot of te klein**: Donorbox stuurt in sommige payloadvarianten centen en in andere dollars. Gebruik indien nodig een stap *Formatter by Zapier — Numbers* om door 100 te delen.
- **Dubbele donaties van één gift**: Donorbox activeert zowel *Nieuwe donatie* als *Bijgewerkte donatie*. Filter op `event_type = "donation.succeeded"` of bouw twee Zaps met elkaar uitsluitende filters.

## Zie ook

- [Zapier (overzicht)](../zapier): de B1-kant van elk Zapier-recept
- [Subsplash](./subsplash): een ander donatieplatform met een Zapier-app
- [Mailchimp](./mailchimp): koppel "nieuwe gift" aan een e-mailtag
