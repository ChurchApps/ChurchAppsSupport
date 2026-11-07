---
title: "Checkr"
description: "Koppel vrijwilligersaanmeldingen in B1 Admin via Make.com aan Checkr-achtergrondcontroles, met optionele meldingen voor je veiligheidscoördinator."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) verzorgt achtergrondcontroles voor medewerkers en vrijwilligers, een bijna universele behoefte voor elke kerk met een kinder- of jeugdprogramma. B1 heeft **geen ingebouwde functie voor achtergrondcontroles**. Het aanvragen van controles, het bijhouden van resultaten en het naleven van screeningsregels gebeurt allemaal in Checkr. Het onderstaande recept koppelt alleen B1-gebeurtenissen aan Checkr. Checkr heeft geen Zapier-app, maar de [Checkr-integratie van Make.com](https://www.make.com/en/integrations/checkr) is geverifieerd en biedt de acties die je nodig hebt om een controle te starten vanuit een B1-gebeurtenis.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Checkr](https://checkr.com)-account met API-toegang en minstens één geconfigureerd screeningspakket
- Een [Make](https://www.make.com)-account
- Een B1Admin-gebruiker met het recht **Instellingen bewerken**

</div>

## Wat je kunt koppelen

De Checkr-app van Make biedt 1 trigger en 6 acties:

| Richting | B1- / Make-trigger | Actie |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (gefilterd op een vrijwilligersgroep) | Checkr: Create Candidate → Create Background Check Invitation |
| Checkr → B1 | Checkr-webhook (uitnodiging- / rapportgebeurtenis) | B1: De gegevens van de persoon bijwerken (bijv. label "Checkr cleared") |

De acties van Make voor Checkr zijn: Create Candidate, Create Background Check Invitation, Get Candidate, Get Report, Get Report's ETA en Get an Invitation. Daarnaast zijn er 4 zoekmodules.

## Instellen

### 1. Maak een B1-API-sleutel aan

**Instellingen → Ontwikkelaar → API-sleutels → Nieuwe API-sleutel**:

- `settings:write`: voor de triggerwebhook
- `people:read`: om de naam en het e-mailadres van de persoon op te zoeken bij het starten van een controle
- (Optioneel) `people:write` als je de rapportstatus als aangepast veld of label wilt terugschrijven

### 2. Bouw het scenario "controle starten bij aanmelding als vrijwilliger" in Make

1. **Trigger**: B1.church: Watch Events (`group.member.added`).
2. **Filter**: ga alleen door als `data.groupId` overeenkomt met je groep "Children's Volunteers" (of een gelijkwaardige groep).
3. **Actie**: B1.church: Find Person (op `data.personId`) om het e-mailadres en de voor- en achternaam op te halen.
4. **Actie**: Checkr: Create Candidate. Koppel voornaam, achternaam en e-mail uit stap 3.
5. **Actie**: Checkr: Create Background Check Invitation. Koppel het nieuwe kandidaat-id uit stap 4 aan het veld *candidate_id*. Kies het screeningspakket (bijv. `tasker_standard` of wat je account aanbiedt).
6. (Optioneel) **Actie**: Slack: stuur je coördinator voor veilige bediening een melding dat er een controle is gestart.

Zet het scenario aan. Nieuwe vrijwilligers in de geselecteerde groep ontvangen automatisch een uitnodiging van Checkr per e-mail. Ze voltooien die op hun telefoon of laptop, en Checkr voert de screening uit.

### 3. (Optioneel) Het rapport terugontvangen

1. **Trigger**: Checkr: Watch Events (webhook). Make registreert bij activering een Checkr-webhook.
2. **Filter**: ga alleen door als `event_type = report.completed`.
3. **Actie**: Checkr: Get Report (gebruik het rapport-id uit de webhook).
4. **Actie**: B1.church: Find Person (op het e-mailadres van de kandidaat).
5. **Actie**: Voorwaardelijke Slack- of e-mailmelding: stuur de coördinator de status `clear` / `consider` / `suspended`.

Let op: B1 heeft momenteel geen ingebouwd veld voor de status van een achtergrondcontrole. De praktische opties zijn (a) het resultaat posten in een privékanaal in Slack ter beoordeling, (b) het wegschrijven in een Google Sheet voor controle achteraf, of (c) de persoon bij `clear` toevoegen aan een B1-groep "Cleared volunteers".

## Veelvoorkomende recepten

### Vrijwilligers elke 2 jaar opnieuw screenen

Combineer het bovenstaande met een schematrigger van Make:

- **Trigger**: Make: Schedule (maandelijks)
- **Actie**: B1.church: List Group Members voor "Cleared volunteers"
- **Actie**: Filter via Make: datum van goedkeuring ouder dan 22 maanden
- **Actie**: Checkr: Create Background Check Invitation (zoals bij de eerste stroom)

### Toegang in fase 1 blokkeren tot de controle is voltooid

Als je kerk het lidmaatschap van B1-groepen gebruikt om toegang te beperken (bijv. alleen leden van de groep "Cleared" verschijnen in roosters voor diensten), houd nieuwe vrijwilligers dan in een wachtgroep totdat de Checkr-gebeurtenis `report.completed` ze vrijgeeft.

## Beperkingen en opmerkingen

- **Checkr werkt voor de meeste screeningspakketten alleen in de VS.** Kerken in Australië, het Verenigd Koninkrijk en Canada hebben een alternatief nodig.
- **De prijs wordt per controle berekend.** Elke uitnodiging die je via Make aanmaakt, is een echte controle. Test eerst in de sandbox- of stagingomgeving van Checkr. De Checkr-app van Make gebruikt de inloggegevens die je in de verbinding opgeeft, dus door de gegevens te wisselen schakel je tussen sandbox en live.
- **API-toegang bij Checkr hangt af van het abonnement.** Kleinere Checkr-accounts hebben mogelijk alleen toegang via de webinterface. Neem contact op met Checkr om de API te laten activeren.

## Probleemoplossing

- **Create Candidate mislukt met `403`**: het Checkr-API-token is alleen-lezen of heeft niet de juiste accountrechten. Maak in het Checkr-dashboard een nieuw token aan met schrijfrechten.
- **Uitnodiging komt nooit aan**: controleer het e-mailadres van de kandidaat in stap 3. B1 heeft mogelijk een leeg e-mailveld voor die persoon. Voeg vóór de Checkr-stap een filter toe dat een e-mailadres verplicht stelt.
- **Webhooktrigger wordt niet geactiveerd**: de registratie van de Checkr-webhook mislukt soms stilletjes als je Make-account geen betaald abonnement heeft dat uitgaande webhooks ondersteunt. Controleer op de pagina *Webhooks* in het Checkr-dashboard of de URL van Make is vermeld.

## Zie ook

- [Make (overzicht)](../make.md): de B1-kant van elk Make-scenario
- [Mobile Message](./mobile-message.md): voor sms-providers zonder Zapier-apps, met hetzelfde webhook- en HTTP-patroon als de Checkr-koppeling in Make
- [Checkr API-documentatie](https://docs.checkr.com/)
