---
title: "Make"
description: "Koppel B1 Admin aan Make om workflows te automatiseren: maak een API-sleutel, stel de B1.church-trigger en acties in en los veelvoorkomende fouten op."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (voorheen Integromat) is een visueel platform voor workflowautomatisering, vergelijkbaar met Zapier, maar met flexibelere logica en een lagere kostenpost op grote schaal. De officiële B1.church Make-app laat je "scenario's" bouwen die direct reageren op B1-gebeurtenissen en gegevens terug naar B1 schrijven.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Make](https://www.make.com)-account (het gratis abonnement dekt kleine workflows)
- Een kerkbeheerder met de rechten **Instellingen bewerken** in B1Admin
- Een globaal idee van het scenario dat je wilt bouwen

</div>

## Modules

| Type | Wat | B1-gebeurtenis / eindpunt |
|---|---|---|
| **Instant Trigger** | Watch Events | elke geabonneerde B1-gebeurtenis (`person.created`, `donation.created`, …) |
| **Actie** | Create Person | voegt een nieuwe persoon toe |
| **Actie** | Add Donation | registreert een gift |
| **Actie** | Add Group Member | voegt een persoon toe aan een groep |
| **Zoeken** | Search People | zoekt personen op naam of e-mailadres |

De instant trigger laat je kiezen naar welke gebeurtenis je luistert. Er is één triggermodule per scenario, die per gebeurtenis wordt ingesteld.

## Installatie

### 1. Een B1-API-sleutel aanmaken

1. Ga in B1Admin naar **Instellingen → Developer → API Keys**.
2. Klik op **New API Key**, geef de sleutel de naam "Make" en ken de bereiken toe die je nodig hebt.
3. **Neem `settings:write` op** als een van je scenario's de instant trigger gebruikt. Make registreert dan namens jou een webhook wanneer het scenario wordt ingeschakeld.
4. Ken ook de bereiken toe die de actiemodules nodig hebben (bijvoorbeeld `donations:write` voor de module Add Donation).
5. Sla op en kopieer de sleutel `cak_…`.

### 2. De verbinding instellen

1. Maak in Make een nieuw scenario en plaats de triggermodule **B1.church** op het canvas.
2. Kies **Create a connection** wanneer daarom wordt gevraagd. Plak de API-sleutel in het veld *API Key* en laat *API Base URL* staan op `https://api.churchapps.org` (tenzij je tegen een testomgeving werkt).
3. Klik op **Save**. Make test de sleutel door je kerkprofiel op te vragen.

De verbinding wordt opgeslagen in je Make-account en hergebruikt voor alle scenario's.

### 3. De trigger configureren

1. Open de instellingen van de module **Watch Events**.
2. Kies de gebeurtenis die je wilt, bijvoorbeeld `donation.created`.
3. Sla op. Make genereert een unieke webhook-URL en slaat die intern op.

### 4. Vervolgmodules toevoegen

Plaats een willekeurige app-module van Make op het canvas, zoals Mailchimp, Google Sheets, Slack, HubSpot of je eigen HTTP-eindpunt. Koppel de uitvoer van de trigger (`event`, `churchId`, `data.id`, `data.amount`, …) aan de invoervelden. Met de modules flatten, iterator, router en aggregator van Make kun je vertakkende en parallelle stromen bouwen die in Zapier lastig zouden zijn.

### 5. Het scenario inschakelen

Zet **Active** aan in de kop van het scenario. Make roept het endpoint `POST /membership/webhooks` van B1 aan om de URL te registreren. Vanaf dat moment stroomt elke overeenkomende B1-gebeurtenis in realtime door het scenario.

Wanneer je het scenario uitschakelt, wordt `DELETE /membership/webhooks/{id}` aangeroepen, zodat er geen losse abonnementen achterblijven.

## Veelvoorkomende recepten

### Giften naar een Google Sheet synchroniseren voor financiële controle

- **Trigger**: B1: Watch Events (`donation.created`)
- **Actie**: Google Sheets: Add a Row. Koppel `data.donationDate`, `data.amount`, `data.personId`, `data.method` en `data.batchId` aan de kolommen van het werkblad.

### Voorwaardelijke Slack-melding op basis van het giftbedrag

- **Trigger**: B1: Watch Events (`donation.created`)
- **Router**:
  - Tak A: Filter `data.amount >= 1000` → Slack: bericht plaatsen in `#major-gifts`
  - Tak B: alle overige gevallen → Slack: bericht plaatsen in `#donations`

### Nieuwe persoon → CRM + welkomstmail + Slack

- **Trigger**: B1: Watch Events (`person.created`)
- **Actie**: HubSpot: Create Contact
- **Actie**: Mailgun: Send Welcome Email
- **Actie**: Slack: melding naar `#new-people` (parallel; gebruik de router van Make)

## Hoe de instant trigger werkt

De instant trigger is gebaseerd op webhooks en niet op polling. Bij activatie roept Make `POST /membership/webhooks` aan met de gegenereerde URL en de gekozen gebeurtenis. Wanneer de gebeurtenis in B1 plaatsvindt, stuurt B1 de gegevens naar de URL van Make en draait je scenario binnen enkele seconden. Het deactiveren van het scenario verwijdert de webhook.

De trigger reageert alleen op gebeurtenissen die plaatsvinden **terwijl het scenario actief is**. Er vindt geen naverwerking van eerdere gebeurtenissen plaats.

## Beperkingen en opmerkingen

- **Eén gebeurtenis per module Watch Events.** Wil je in één scenario naar meerdere gebeurtenissen luisteren, plaats dan meerdere triggermodules in afzonderlijke scenario's (of gebruik één module met de samengevoegde lijst van gebeurtenissen; zie hieronder).
- **Handtekeningverificatie is niet beschikbaar.** Make geeft `X-B1-Signature` niet door aan het scenario. De vertrouwensgrens is de niet te raden webhook-URL per scenario van Make. Dit is gebruikelijk in Make. Heb je expliciete handtekeningcontroles nodig, bouw dan een eigen integratie met de [SDK](/docs/developer/api/webhooks#sdk-support).
- **Aantal bewerkingen.** Elke API-aanroep van een actiemodule telt mee in je quotum van Make-bewerkingen. Aan de kant van B1 heeft dit geen gevolgen.

## Problemen oplossen

- **De verbindingstest mislukt.** Meestal is er een typefout in de API-sleutel. Kopieer de sleutel opnieuw uit B1Admin. De volledige sleutel wordt maar één keer getoond. Als je hem kwijt bent, maak dan een nieuwe sleutel aan.
- **De triggermodule activeert niet.** Controleer **Instellingen → Developer → Webhooks** in B1Admin. Als je na het activeren van het scenario geen rij "Make — &lt;event&gt;" ziet, ontbreekt `settings:write` in de sleutel. Werk de sleutel bij en schakel het scenario opnieuw in.
- **Een actie geeft `403 Forbidden`.** De API-sleutel mist het bereik voor dat eindpunt. Voor Add Donation is bijvoorbeeld `donations:write` nodig. Werk de sleutel bij in B1Admin en test opnieuw.

## De app aanpassen

De B1.church Make-app is open source. De JSON-definities staan in de repository `B1Integrations/Make/`. Als je een module nodig hebt die nog niet bestaat, bijvoorbeeld een nieuwe actie voor een eindpunt dat we nog niet ondersteunen, open dan een issue of pull request in die repository.

## Zie ook

- [Zapier](./zapier.md): hetzelfde patroon met een eenvoudigere interface en een grotere catalogus met apps
- [Slack & Discord](./slack-discord.md): ingebouwde chatmeldingen zonder Make
- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks)
