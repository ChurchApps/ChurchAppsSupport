---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) is een Australische SMS-API. Veel Australische kerken kiezen ervoor omdat die lokale nummers en concurrerende Australische tarieven biedt, terwijl Clearstream en Text In Church vooral op de Amerikaanse markt zijn gericht. Mobile Message heeft momenteel geen eigen Zapier-app, maar het publiceert wel een openbare REST-API. Daarmee kunt u in enkele minuten B1-gebeurtenissen koppelen aan sms'jes van Mobile Message via **Webhooks by Zapier** (of de HTTP-module van Make).

</div>

<div class="prereqs">
<h4>Voordat u begint</h4>

- Een [Mobile Message](https://mobilemessage.com.au)-account met een geregistreerde Sender ID en API-gegevens (API-gebruikersnaam en -wachtwoord onder *Account → API Settings*)
- Een [Zapier](https://zapier.com)-account (of een [Make](https://www.make.com)-account)
- Een B1Admin-gebruiker met de rechten **Edit Settings**

</div>

## Wat u kunt koppelen

De API van Mobile Message draait om het versturen van sms'jes: er zijn geen triggers, alleen uitgaande berichten. De recepten gaan dus allemaal van B1 naar sms:

| Richting | B1-trigger | Resultaat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Welkomstbericht naar de nieuwe persoon |
| B1 → Mobile Message | `donation.created` | Bedankbericht naar de gever |
| B1 → Mobile Message | `form.submission.created` | Het piketteam oproepen |
| B1 → Mobile Message | `event.created` | Herinneringsbericht naar een lijst |

## Instellen

### 1. Maak een B1 API-sleutel aan

**Settings → Developer → API Keys → New API Key**:

- `settings:write`: nodig om de triggerwebhook te registreren
- `people:read`: om het telefoonnummer van de ontvanger op te zoeken op basis van een `personId`

### 2. Bouw de Zap met Webhooks by Zapier

1. **Trigger**: B1.church, kies de gebeurtenis die u wilt (bijvoorbeeld New Donation).
2. **Actie**: B1.church, Find Person (met `data.personId`) om het telefoonnummer en de naam op te halen.
3. **Actie**: Webhooks by Zapier, **POST**. Configureer dit zoals hieronder beschreven.

De instellingen van de POST-stap:

- **URL**: `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type**: JSON
- **Data**:
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Bedankt voor uw gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Headers**: `Content-Type: application/json` (Webhooks by Zapier voegt dit automatisch toe)
- **Basic Auth**: vul het veld *Basic Auth* in met `<api_username>|<api_password>` (Zapier zet dit om naar de juiste `Authorization: Basic …`-header)

Zet de Zap aan. Verstuur in B1Admin een testgift om te controleren of er een sms binnenkomt.

## Veelgebruikte recepten

### Herinneringen voor evenementen op de ochtend zelf

- **Trigger**: Schedule by Zapier (dagelijks, om 7:00)
- **Actie**: B1.church, Find Events voor vandaag (of gebruik een Find-stap met een vaste datumfilter, of sla de lijst met evenementen van vandaag op in een Google Sheet)
- **Actie**: Webhooks by Zapier, POST naar Mobile Message met de lijst met evenementen naar een geregistreerde abonneegroep

### Gebruik het batch-eindpunt voor een uitzending naar een lijst

Het eindpunt `/v1/messages` van Mobile Message accepteert maximaal 10.000 berichten per aanroep. Om naar een B1-groep uit te zenden:

- **Trigger**: B1.church, New Form Submission (gefilterd op een specifiek formulier)
- **Actie**: B1.church, List Group Members voor de doelgroep (via een stap *Webhooks by Zapier, GET* op `/membership/groupmembers?groupId=…`)
- **Actie**: Formatter by Zapier → Utilities → maak van het antwoord een regel per item om er een `messages`-array van te maken
- **Actie**: Webhooks by Zapier, POST de volledige array naar `/v1/messages`

### Make als alternatief

Als u liever Make gebruikt, plaatst u de module **HTTP, Make a request** na de B1 Watch Events-trigger en configureert u deze op dezelfde manier (POST, Basic Auth, JSON-body). Zie het [Make-overzicht](../make) voor de B1-kant.

## Beperkingen en opmerkingen

- **Basic Auth is de enige authenticatiemethode**: Mobile Message geeft een gebruikersnaam en wachtwoord uit via het dashboard. Behandel beide als geheimen.
- **`sender` moet een geregistreerde Sender ID zijn** op uw Mobile Message-account, anders geeft het verzenden `400 Invalid sender` terug. De Australische regelgeving vereist registratie van de afzender.
- **Australische telefoonnummers** kunnen als `0412345678` (lokaal) of `+61412345678` (internationaal) worden opgegeven. De API accepteert beide, maar als u ook naar het buitenland verstuurt, is het verstandig om alles naar de vorm `+61…` om te zetten.
- **Maximaal 10.000 berichten per verzoek**: handig voor uitzendingen, maar één B1-webhookbezorging levert zelden een lijst van die omvang op. Bewaar het batch-eindpunt voor geplande bulk-Zaps.

## Probleemoplossing

- **POST geeft `401 Unauthorized`**: de Basic Auth-gegevens kloppen niet. Kopieer ze opnieuw uit het Mobile Message-dashboard onder *Account → API Settings*. Let op: de gebruikersnaam is standaard het e-mailadres van uw account, en niet een aparte API-sleutel.
- **POST geeft `400 Invalid sender`**: de waarde van `sender` is geen geregistreerde Sender ID op uw account. Registreer deze eerst in het Mobile Message-dashboard.
- **Het sms'je komt aan maar is afgekapt**: Mobile Message splitst berichten langer dan ongeveer 160 tekens in meerdere delen, en u betaalt per deel. Controleer de responsbody; die vermeldt het aantal delen.

## Zie ook

- [Clearstream](./clearstream) en [Text In Church](./text-in-church): alternatieve sms-providers met eigen Zapier-apps (er is geen stap met Webhooks by Zapier nodig)
- [Zapier (overzicht)](../zapier): de B1-kant van elk Zapier-recept
- [Mobile Message API-documentatie](https://mobilemessage.com.au/api-documentation)
