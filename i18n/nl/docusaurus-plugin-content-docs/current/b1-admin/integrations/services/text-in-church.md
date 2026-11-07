---
title: "Text In Church"
description: "Koppel B1 Admin en Text In Church met Zapier: maak een API-sleutel, bouw een Zap van connectiekaart naar B1 en spiegel groepslidmaatschap."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) bundelt sms-berichten, drip-workflows (automatische reeksen berichten) en automatiseringen voor verbindingskaarten. De Zapier-app ondersteunt beide richtingen: je stuurt B1-gebeurtenissen door naar een Text In Church-workflow, en haalt triggers voor verbindingskaarten of nieuwe contacten uit Text In Church om ze naar B1 door te sturen.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Een [Text In Church](https://textinchurch.com)-account met een abonnement dat de Zapier-integratie bevat
- Een [Zapier](https://zapier.com)-account
- Een B1Admin-gebruiker met de rechten **Instellingen bewerken**

</div>

## Wat je kunt koppelen

| Richting | Trigger | Actie |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Persoon aanmaken/bijwerken + toevoegen aan groep |
| B1 → Text In Church | B1 `form.submission.created` | Tekstbericht verzenden via het relevante team |
| B1 → Text In Church | B1 `group.member.added` | Toevoegen aan groep (groepslidmaatschap spiegelen) |
| Text In Church → B1 | Verbindingskaart ingediend | B1: persoon aanmaken + groepslid toevoegen |
| Text In Church → B1 | Persoon aangemaakt | B1: persoon aanmaken |
| Text In Church → B1 | Persoon is lid geworden van groep | B1: groepslid toevoegen |

Acties in Text In Church omvatten ook *Tekstbericht verzenden*, *Spraakbericht verzenden*, *Taak aanmaken*, *Persoon/groep zoeken* en het toevoegen en verwijderen van groepslidmaatschappen.

## Instellen

### 1. Maak een B1-API-sleutel aan

**Instellingen → Ontwikkelaar → API-sleutels → Nieuwe API-sleutel**:

- `settings:write` — vereist voor Zaps die door B1 worden geactiveerd
- `people:read`, `people:write` — om de persoon te zoeken of aan te maken
- `groups:write` — voor het synchroniseren van groepen
- (Optioneel) `donations:write` als je giftbevestigingen naar TIC doorstuurt

### 2. Koppel Text In Church aan Zapier

Volg de [Zapier-integratiehandleiding van Text In Church](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Zij genereren een API-token vanuit het TIC-dashboard.

### 3. Bouw de Zap van verbindingskaart naar B1

Dit is de meest voorkomende richting. Verbindingskaarten die vanuit TIC worden verstuurd, worden automatisch nieuwe personen in B1.

1. **Trigger** — Text In Church: Verbindingskaart ingediend.
2. **Actie** — B1.church: Persoon zoeken (op e-mailadres).
3. **Pad** — splitsen op gevonden / niet gevonden:
   - Niet gevonden → B1.church: Persoon aanmaken.
   - Gevonden → doorgaan.
4. **Actie** — B1.church: Groepslid toevoegen aan de groep "Nieuw contact".

Zet de Zap aan. De volgende verbindingskaart die via TIC wordt ingediend, verschijnt automatisch onder **B1Admin → Personen**.

## Veelgebruikte recepten

### Een workflow voor verbindingskaarten starten vanuit een B1-formulier

- **Trigger** — B1.church: Nieuwe formulierinzending (filteren op het formulier-id van "Ik ben nieuw hier")
- **Actie** — Text In Church: Persoon aanmaken/bijwerken, waarbij de antwoorden op e-mail / telefoon / naam uit het formulier worden toegewezen
- **Actie** — Text In Church: Toevoegen aan groep, waarbij de groep een vooraf ingestelde welkomstworkflow heeft

### Groepslidmaatschap spiegelen

- **Trigger** — B1.church: Nieuw groepslid, gefilterd op een specifieke `groupId`
- **Actie** — Text In Church: Toevoegen aan groep (zelfde persoon, spiegelgroep). Combineer dit met een Zap voor `group.member.removed` als je volledige synchronisatie wilt.

### Een leider waarschuwen wanneer iemand lid wordt

- **Trigger** — B1.church: Nieuw groepslid
- **Actie** — Text In Church: Tekstbericht verzenden, ontvanger = het telefoonnummer van de groepsleider, bericht = `"{first} {last} is net lid geworden van {group}"`.

## Beperkingen en opmerkingen

- **De Zapier-app van TIC is afhankelijk van het abonnementsniveau.** Als de Zapier-integratie grijs weergegeven wordt in het TIC-dashboard, neem dan contact op met de support van TIC om deze voor je abonnement in te schakelen.
- **Groep-id's zijn die van TIC, niet van B1.** Bij het spiegelen moet je ergens een koppeltabel bijhouden (een Zapier *Opzoektabel*, of per Zap vastgelegd).
- **Tekstbericht verzenden kost credits.** Elke Zap die *Tekst verzenden* uitvoert, verbruikt van je sms-tegoed bij TIC.

## Probleemoplossing

- **Trigger voor verbindingskaarten wordt niet geactiveerd** — In TIC moet de Zapier-integratieschakelaar aanstaan. Controleer ook of het formulier waarmee je test is ingesteld als "Verbindingskaart" en niet als gewone enquête.
- **Persoon aanmaken in B1 mislukt met 401** — De API-sleutel is onjuist, ingetrokken, of mist `people:write`. Maak een nieuwe sleutel aan.
- **Dubbele personen in B1** — TIC verstuurt zowel *Persoon aangemaakt* als *Verbindingskaart ingediend* voor dezelfde gebeurtenis. Kies één als bron van waarheid en voeg een Zapier-filter toe aan de andere.

## Zie ook

- [Clearstream](./clearstream.md) — alternatief sms-platform met een vergelijkbare Zapier-opzet
- [Zapier (overzicht)](../zapier.md) — B1-kant van elk Zapier-recept
- [Text In Church Zapier-handleiding](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (documentatie van TIC)
