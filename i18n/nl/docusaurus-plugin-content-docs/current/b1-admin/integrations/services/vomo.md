---
title: "VOMO"
---

# VOMO

<div class="article-intro">

VOMO is een platform voor vrijwilligersbetrokkenheid. Mensen melden zich aan voor projecten, checken in bij de kiosk en sparen uren op. Als je VOMO gebruikt voor de planning van vrijwilligers maar B1 voor de ledengegevens, kan Zapier het lidmaatschap en de incheckingen tussen beide systemen synchroniseren, zodat de gegevens in beide niet uit elkaar lopen.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [VOMO](https://vomo.org)-account met een abonnement dat Zapier ondersteunt (neem bij twijfel contact op met de VOMO-support)
- Een [Zapier](https://zapier.com)-account
- Een B1Admin-gebruiker met de rechten **Instellingen bewerken**

</div>

## Wat je kunt koppelen

De Zapier-app van VOMO biedt vier directe triggers en vier acties. Dit zijn de koppelingen die de meeste kerken willen:

| Richting | Trigger | Actie |
|---|---|---|
| VOMO → B1 | VOMO Lidmaatschap (aangemaakt) | B1: Persoon zoeken → Persoon aanmaken (als die nieuw is) |
| VOMO → B1 | VOMO-incheck bij de kiosk | B1: Groepslid toevoegen aan een groep "Nu dienend", of registreren als aanwezigheid |
| B1 → VOMO | B1 `person.created` | VOMO: Organisator zoeken (op e-mail); anders een aangepaste stap |
| Beide | VOMO-deelname (aanmeldingen) | B1: Groepslid toevoegen aan een groep voor het specifieke project |

De VOMO-acties beperken zich momenteel tot **het opstellen van projecten** en **het zoeken** naar bestaande organisatoren of projecten. Er is nu geen actie om iemand toe te voegen aan een VOMO-project. De interessante koppelingen gaan vooral van VOMO naar B1.

## Instellen

### 1. Maak een B1-API-sleutel aan

**Instellingen → Ontwikkelaar → API-sleutels → Nieuwe API-sleutel**. Bereiken:

- `people:read`, `people:write`: om vrijwilligers als B1-personen op te zoeken en aan te maken
- `groups:write`: om hen toe te voegen aan groepen van dienstteams
- (Optioneel) `attendance:write` als je kioskincheckingen als aanwezigheid wilt registreren

### 2. Bouw de Zap voor lidmaatschapssynchronisatie

1. **Trigger**: VOMO: Lidmaatschap (gebeurtenis = `created`).
2. **Actie**: B1.church: Persoon zoeken, gekoppeld op e-mailadres.
3. **Filter / Pad**: splits op gevonden en niet gevonden:
   - Niet gevonden → B1.church: Persoon aanmaken, en daarna Groepslid toevoegen aan de juiste vrijwilligersgroep.
   - Gevonden → B1.church: Groepslid toevoegen direct.
4. Zet hem aan. Nieuwe VOMO-vrijwilligers verschijnen nu in B1 met het juiste groepslidmaatschap.

### 3. (Optioneel) Bouw de Zap voor kioskincheck

1. **Trigger**: VOMO: Kiosk
2. **Actie**: B1.church: Persoon zoeken (op e-mailadres)
3. **Actie**: naar keuze:
   - *Als je het als aanwezigheid behandelt*: Webhooks by Zapier stuurt een POST naar het eindpunt `/attendance/visits` van B1 (de Zapier-app van B1 heeft nog geen eigen actie *Aanwezigheid registreren*). De B1-[API-sleutel](/docs/developer/api/api-keys) gaat in de header `Authorization: Bearer cak_…`.
   - *Als je het als groepslidmaatschap behandelt*: B1.church: Groepslid toevoegen met de groep "Nu dienend (vandaag)", en een tweede Zap later op de dag verwijdert hen via een geplande opschoning.

## Veelgebruikte recepten

### Deelnemers per project synchroniseren naar een groep

- **Trigger**: VOMO: Deelname (aangemaakt)
- **Actie**: Filteren via Zapier op project-id, en daarna
- **Actie**: B1.church: Groepslid toevoegen aan een B1-groep waarvan de naam overeenkomt met het VOMO-project.

Wanneer het VOMO-project eindigt, maak je de B1-groep handmatig leeg (of koppel je dit aan een trigger *Deelname verwijderd* die hen verwijdert).

### Een sms met "bedankt voor je aanmelding" versturen

Koppel in dezelfde Zap VOMO-deelname aan Clearstream: Sms verzenden of Text In Church: Bericht verzenden. Beide hebben eigen Zapier-acties. Zie [Clearstream](./clearstream) en [Text In Church](./text-in-church).

### Afhaken opsporen

Draai een dagelijkse Zapier-trigger *Planning* die in VOMO de functie Organisator zoeken aanroept voor een lijst met B1-personen die deze maand in het dienstteam zijn gekomen. Als VOMO "niet gevonden" teruggeeft, hebben ze VOMO niet geactiveerd en moeten ze een herinnering krijgen.

## Beperkingen en opmerkingen

- **E-mail is de koppelsleutel.** De gegevens van VOMO bevatten een e-mailadres van de gebruiker, maar geen B1-persoons-id. Donateurs die in elk systeem een ander e-mailadres gebruiken, leveren dubbele records op.
- **Geen actie "Toevoegen aan project" in de Zapier-app van VOMO.** Als je B1 → VOMO-inschrijving voor projecten nodig hebt, moet je vanuit een stap *Webhooks by Zapier* een POST naar de REST-API van VOMO doen. Dat is een maatwerkintegratie.
- **De gratis of lagere abonnementen van VOMO bevatten Zapier mogelijk niet.** Bevestig dit met de VOMO-support voordat je een datum voor de koppeling toezegt.

## Problemen oplossen

- **De trigger wordt nooit geactiveerd**: de directe triggers van VOMO vereisen dat het API-token geldig blijft. Test de Zap opnieuw en koppel VOMO opnieuw als het token is vervangen.
- **B1 *Groepslid toevoegen* mislukt met 422**: het groep-id in de actie bestaat niet. Open **B1Admin → Groepen**, klik op de groep en kopieer het id-segment uit de URL naar de Zap-stap.
- **Dubbele B1-personen van één VOMO-vrijwilliger**: waarschijnlijk hebben ze zich aangemeld met een ander e-mailadres dan het adres dat ze al in B1 hadden. Standaardiseer de e-mailadressen, of voeg een Zapier-*Pad* toe dat ook op telefoonnummer zoekt voordat er een nieuw record wordt aangemaakt.

## Zie ook

- [Zapier (overzicht)](../zapier): de B1-kant van elk Zapier-recept
- [Clearstream](./clearstream), [Text In Church](./text-in-church): combineer aanmeldingen van vrijwilligers met sms-bevestigingen
- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks): de gebeurtenissen waarop VOMO triggers kan geven
