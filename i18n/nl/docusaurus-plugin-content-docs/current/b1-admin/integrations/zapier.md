---
title: "Zapier"
description: "Koppel B1 Admin aan Zapier om automatiseringen te starten bij nieuwe personen, giften en groepsleden, zonder programmeerkennis."
---

# Zapier

<div class="article-intro">

De officiële B1.church-app in Zapier laat een Zap reageren op gebeurtenissen in je kerk (nieuwe persoon, nieuwe gift, nieuw groepslid, …) en schrijft gegevens terug naar B1. Je hoeft niet te programmeren en hebt geen eigen infrastructuur nodig. Je stelt alles in via de drag-and-drop-editor van Zapier, plakt een API-sleutel en zet de Zap aan.

</div>

:::caution Wachten op goedkeuring door Zapier
De B1.church-app is gebouwd en werkt, maar hij wacht nog op de beoordeling door Zapier voordat hij openbaar verschijnt in de appcatalogus van de Zap-editor. Tot die goedkeuring er is, kunnen alleen uitgenodigde accounts de app gebruiken. Hieronder staat hoe het werkt zodra de app is goedgekeurd.
:::

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Zapier](https://zapier.com)-account (het gratis abonnement is genoeg voor een handvol Zaps)
- Een kerkbeheerder met het recht **Instellingen bewerken** in B1Admin (je maakt hier een API-sleutel aan)
- Een idee van wat je wilt doen, bijvoorbeeld: "wanneer een persoon in B1 wordt toegevoegd, voeg die dan toe aan mijn Mailchimp-lijst"

</div>

## Triggers en acties

| Type | Wat | B1-gebeurtenis / endpoint |
|---|---|---|
| **Trigger** | Nieuwe persoon | `person.created` |
| **Trigger** | Bijgewerkte persoon | `person.updated` |
| **Trigger** | Nieuwe gift | `donation.created` |
| **Trigger** | Nieuw groepslid | `group.member.added` |
| **Trigger** | Nieuwe formulierinzending | `form.submission.created` |
| **Actie** | Persoon aanmaken | voegt een nieuwe persoon toe |
| **Actie** | Gift toevoegen | registreert een gift |
| **Actie** | Groepslid toevoegen | voegt een persoon toe aan een groep |
| **Actie** | Persoon zoeken | zoekt een persoon op id, e-mailadres of naam; laat de taak mislukken als niemand overeenkomt |

Je kunt deze vrij combineren met een van de meer dan 7.000 apps die Zapier ondersteunt.

## Instellen

### 1. Maak een B1 API-sleutel aan

1. Ga in B1Admin naar **Instellingen → Ontwikkelaar → API-sleutels**.
2. Klik op **Nieuwe API-sleutel**, geef hem een naam zoals "Zapier" en selecteer de scopes die de Zap nodig heeft.
3. **Belangrijk:** Zapier-triggers registreren bij het inschakelen van de Zap een webhook namens jou. Daarvoor is de scope **`settings:write`** nodig. Neem `settings:write` altijd op als een van je Zaps een B1-trigger gebruikt.
4. Geef ook de scopes die de acties nodig hebben. Een actie "Gift toevoegen" heeft bijvoorbeeld `donations:write` nodig, en "Persoon aanmaken" heeft `people:write` nodig.
5. Sla op. De volledige `cak_…`-sleutel wordt **één keer** getoond. Kopieer hem dan.

### 2. Verbind Zapier met B1

1. Maak in Zapier een nieuwe Zap.
2. Wanneer je voor de eerste keer een B1-trigger of -actie kiest, vraagt Zapier je om **in te loggen bij B1.church**.
3. Plak de API-sleutel uit stap 1 en klik op **Ja, doorgaan**. Zapier controleert de sleutel bij je kerk.

De verbinding wordt opgeslagen in Zapier en door elke Zap op je account hergebruikt.

### 3. Bouw de Zap

Kies een trigger en voeg daarna een of meer actiestappen toe. Hieronder staan voorbeelden.

## Veelgebruikte recepten

### Nieuwe B1-personen toevoegen aan Mailchimp

- **Trigger**: B1: Nieuwe persoon
- **Actie**: Mailchimp: Abonnee toevoegen/bijwerken. Koppel `name__first`, `name__last` en `contactInfo__email` van B1 aan de velden Voornaam, Achternaam en E-mail in Mailchimp.

### Giften posten in een Slack-kanaal met een rijkere kaart dan de ingebouwde connector

- **Trigger**: B1: Nieuwe gift
- **Actie**: Slack: Kanaalbericht verzenden. Stel elke lay-out samen, zoals knoppen, bijlagen of andere opties, die de ingebouwde [Slack-connector](./slack-discord.md) niet kan.

### Nieuwe groepsleden toevoegen aan een Google-groep

- **Trigger**: B1: Nieuw groepslid (gefilterd op een specifieke `groupId`)
- **Actie**: Filter door Zapier: ga alleen door als de B1-groep de groep is die je wilt
- **Actie**: B1: Persoon zoeken (gebruik de `personId` van de trigger om het e-mailadres op te halen)
- **Actie**: Google Groepen: Lid toevoegen

### Formulierinzendingen doorsturen naar een projectbord

- **Trigger**: B1: Nieuwe formulierinzending
- **Actie**: Notion / Linear / Asana / Trello: pagina / issue / taak aanmaken

## Hoe triggers er van binnen werken

Triggers zijn **REST-hooks** en geen polling. Zapier vraagt B1 niet elke 15 minuten of er iets nieuws is. Wanneer je de Zap aanzet, vraagt Zapier B1 om een webhook te registreren die naar een privé-Zapier-URL wijst. Zodra de gebeurtenis plaatsvindt, stuurt B1 de gegevens naar Zapier en start je Zap **binnen enkele seconden**. Zet je de Zap uit, dan vraagt Zapier B1 om de webhook te verwijderen. Er blijven geen losse abonnementen achter.

Dat betekent dat de trigger alleen afgaat voor gebeurtenissen die plaatsvinden **nadat** je de Zap hebt aangezet. Er is geen terugwerkende kracht: als je een Zap aanzet, worden de giften van gisteren niet opnieuw verwerkt.

## Beperkingen en opmerkingen

- **Meerdere Zaps met dezelfde trigger** registreren elk hun eigen B1-webhook. Dat geeft geen conflicten, maar het is goed om te weten als je **Instellingen → Ontwikkelaar → Webhooks** bekijkt en je je afvraagt waarom er drie identieke rijen `Zapier — donation.created` staan.
- **Testgegevens bij het instellen van een Zap**: wanneer je een Zap bouwt, vraagt Zapier om voorbeeldgegevens om velden te koppelen. Zapier haalt dan de meest recente passende gebeurtenis uit B1 op, als die er is. Anders gebruikt het een synthetisch voorbeeld uit de app-definitie.
- **Mislukte acties verschijnen als Zap-fouten** in de taakgeschiedenis van Zapier. Een veelvoorkomende oorzaak is een API-sleutel zonder de juiste scope. Een actie "Gift toevoegen" heeft bijvoorbeeld `donations:write` nodig. Maak de sleutel opnieuw aan met de juiste scopes en verbind opnieuw in Zapier.
- **Quota voor uitgaande API-aanroepen**: elke B1-API-aanroep vanuit een actie telt mee in je Zapier-taakquota en niet in iets aan de B1-kant.

## Probleemoplossing

- **"Authenticatie mislukt"** bij het verbinden: de API-sleutel is onjuist, ingetrokken of mist de scopes die de Zap nodig heeft. Maak hem opnieuw aan in B1Admin met minimaal `settings:write` en de resourcescopes die de Zap gebruikt, en werk daarna de verbinding bij.
- **Trigger wordt nooit uitgevoerd**: controleer of de webhook echt is geregistreerd. In B1Admin moet onder **Instellingen → Ontwikkelaar → Webhooks** nu een rij staan met de naam "Zapier — &lt;gebeurtenis&gt;". Als die er niet staat, had de API-sleutel waarschijnlijk geen `settings:write` toen je de Zap aanzette. Pas de sleutel aan, zet de Zap uit en weer aan.
- **Trigger wordt twee keer uitgevoerd**: Zapier levert af en toe opnieuw als de bevestiging is verloren gegaan. Gebruik een stap "Filter door Zapier" op een uniek id, zoals het `id` van de persoon, als je strikte deduplicatie nodig hebt.

## Zie ook

- [Make](./make.md): hetzelfde patroon, maar op een ander platform
- [Slack & Discord](./slack-discord.md): eenvoudigere chatmeldingen zonder Zapier
- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks)
