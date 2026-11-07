---
title: "Verbonden diensten"
description: "Koppel B1 Admin aan Mailchimp, Donorbox, Subsplash, VOMO, Clearstream en andere tools via Zapier- of Make-recepten, met installatiegidsen per tool."
---

# Verbonden diensten

<div class="article-intro">

De snelste manier om B1 met een ander kerktechnologie-hulpmiddel te verbinden is meestal een Zapier- of Make-recept. Je hebt daarvoor geen nieuwe B1-infrastructuur nodig, en de derde partij host de workflow. Deze pagina is een samengestelde lijst van diensten waarvan we hebben bevestigd dat ze nu al te koppelen zijn, met voor elke dienst een korte, kopieer-en-plakbare installatiegids.

</div>

## In het kort

| Dienst | Categorie | Brug | Wat je kunt koppelen |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-mail | Zapier of Make | Nieuwe B1-personen en gevers synchroniseren naar een Mailchimp-doelgroep |
| [Donorbox](./donorbox.md) | Donaties | Zapier | Donorbox-donaties en donateurs terugsturen naar B1 |
| [Subsplash](./subsplash.md) | App / Donaties | Zapier | Subsplash-giften en personen naar B1 halen |
| [VOMO](./vomo.md) | Vrijwilligerswerk | Zapier | Vrijwilligersaanmeldingen synchroniseren tussen B1-groepen en VOMO-projecten |
| [Clearstream](./clearstream.md) | sms | Zapier | Een Clearstream-sms activeren vanuit B1-gebeurtenissen; antwoorden opnemen als B1-records |
| [Text In Church](./text-in-church.md) | sms / workflows | Zapier | Text In Church-workflows activeren vanuit B1; Connect Card-gegevens ontvangen |
| [Mobile Message](./mobile-message.md) | sms (AU) | Webhooks via Zapier of Make | sms versturen vanuit elke B1-gebeurtenis |
| [Checkr](./checkr.md) | Achtergrondcontroles | Make | Een achtergrondcontrole starten wanneer iemand zich bij een dienstteam aansluit |

## Wat ze allemaal gemeen hebben

1. **De B1-kant van de koppeling is identiek.** Maak een API-sleutel met de juiste scopes aan onder **B1Admin → Settings → Developer → API Keys**. Laat daarna de brug een webhook registreren voor de trigger (Zapier en Make doen dit automatisch en vereisen `settings:write`), of roep de REST-endpoints van B1 aan vanuit een vervolgactie.
2. **De brug rekent jou, niet ons.** ChurchApps is gratis. Zapier en Make hebben allebei een gratis abonnement dat een handvol recepten dekt.
3. **Je kunt de koppeling testen zonder live te gaan.** Beide bruggen hebben een knop "Test step" die de trigger één keer tegen B1 afvuurt en de gegevensstructuur toont voordat je het recept inschakelt.

## Een brug kiezen

- **Zapier** is toegankelijker en heeft de grotere appcatalogus. Gebruik het als standaard, tenzij de kosten een probleem zijn.
- **Make** is goedkoper op schaal en heeft flexibelere routerings- en filterlogica. Gebruik het wanneer één workflow vertakkingen, voorwaarden of veel stappen heeft.
- **Webhooks by Zapier** (gebruikt voor de documentatie over Mobile Message) is een generieke adapter. Hiermee kun je vanuit een Zap naar elk HTTP-eindpunt een POST sturen, wanneer de bestemming geen eersteklas Zapier-app is.

Als je iets wilt dat niet op deze lijst staat, zijn de [REST API](/docs/developer/api) en [webhooks](/docs/developer/api/webhooks) van B1 open. Met de [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) kun je in een paar uur een eenmalige brug bouwen.

## Wat hier niet staat (en waarom)

Verschillende populaire kerktechnologie-hulpmiddelen, zoals Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck en MinistrySafe, hebben momenteel geen gepubliceerde Zapier-app of Make-module. Ze hebben wel eigen API's, maar ze aan B1 koppelen is maatwerk en geen recept, dus ze passen niet op deze lijst. Als een leverancier een Zapier-app of Make-module toevoegt, voegen we de documentatie toe.

We hebben ook bewust tools overgeslagen die specifiek zijn voor Planning Center Services (muziek, presentatie), concurrerende ChMS-producten, migratieadviseurs en tools die alleen PCO-specifieke gegevens opschonen. Geen van deze heeft een bruikbare koppelingsroute naar B1.

## Zie ook

- [Zapier (overzicht)](../zapier.md): de B1-kant van elk Zapier-recept is identiek. Deze documentatie behandelt dat één keer.
- [Make (overzicht)](../make.md): hetzelfde geldt voor Make-scenario's.
- [Slack & Discord](../slack-discord.md): chatmeldingen zonder enige brug.
- [Google Sheets](../google-sheets.md): exports op aanvraag.
- [Webhooks (ontwikkelaarsreferentie)](/docs/developer/api/webhooks): de gebeurteniscatalogus waar elk recept op vertrouwt.
