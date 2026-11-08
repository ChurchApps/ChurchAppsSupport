---
title: "Architectuur"
description: "Systeemoverzichten over meerdere repositories die laten zien hoe doneren, incheckfuncties, meldingen en websites werken in B1 Admin, B1.church en de Api, voordat je ze wijzigt."
---

# Architectuur

<div class="article-intro">

Deze pagina's zijn systeemoverzichten over meerdere repositories: ze documenteren hoe een kernsysteem van ChurchApps van begin tot eind werkt, over de apps, de API-modules en de gedeelde bibliotheken heen, in plaats van hoe één project is ingesteld. Lees ze voordat je het gedrag van een systeem wijzigt. Lees [Installatie](../setup/index.md) om een project op gang te brengen en de [API-sectie](../api/index.md) voor naslag op endpointniveau.

</div>

## Het ecosysteem in een oogopslag

ChurchApps bestaat uit ongeveer 20 onafhankelijke repositories (geen monorepo). Clientapps communiceren via HTTPS en WebSocket met een beperkt aantal backend-API's en delen code via npm-pakketten die onder de `@churchapps`-scope worden gepubliceerd.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Twee structurele regels bepalen alles wat in deze sectie wordt beschreven:

1. **Modules zijn geïsoleerd.** Elke Api-module beheert zijn eigen database en tabellen. Andere modules en apps bereiken zijn gegevens alleen via de REST-endpoints. Zie [Modulestructuur](../api/module-structure.md).
2. **Gedeelde code wordt uitgeleverd als npm-pakketten.** Apps importeren nooit elkaars broncode. Alles wat hergebruikt wordt, gaat via `@churchapps/helpers`, `@churchapps/apphelper` of `@churchapps/apihelper` over de grenzen van repositories heen. Zie [Gedeelde bibliotheken](../shared-libraries/index.md).

## Systeemoverzichten

| Pagina | Wat het behandelt | Omvat |
|--------|-------------------|-------|
| [Meldingen en herinneringen](./notifications.md) | Hoe alles een persoon iets laat weten: de twee verzendingsingangen, de kanaalescalatieketen en de herinneringsengine | Api (messaging), B1Admin, B1App |
| [Realtime-architectuur](../realtime.md) | Het WebSocket-leveringsframework achter chat, aanwezigheid en levering binnen de app | Api (messaging), alle webapps |
| [Webpush-meldingen](../web-push.md) | Het webpushkanaal in de browser: VAPID-sleutels, opslag van abonnementen, levering | Api (messaging), alle webapps |
| [Doneren](./giving.md) | Betalingsproviders en gateways, donatiestromen, fondsen en batches, gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Evenementregistraties](./registrations.md) | Het registratie-commerce-model: deelnemertypen, selecties, kortingscodes, betalingen via de givinggateway en de wachtlijst | Api (content + giving), B1App, B1Admin |
| [Incheckfuncties](./check-ins.md) | Incheckkiosk en zelfinchecken, het aanwezigheidsdatamodel, ruimtetoewijzing, de kinderveiligheidslaag, het printen van labels | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Websitebouwer](./website-builder.md) | De pagina-, sectie- en elementstructuur, het contract en de renderers voor elementtypen, blog, pagina's met toegangsbeperking, SEO en AI-generatie | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Websiterouting en multi-site](./websites.md) | Hoe een verzoek wordt herleid naar een kerk en een specifieke site, het multi-site-datamodel met `siteId` en de Caddy-edge voor eigen domeinen | B1App, Api (membership + content), B1Admin |
| [Integraties](./integrations.md) | Het uitbreidingsoppervlak: OAuth, API-sleutels, webhooks, contentproviders, MCP | Api, gedeelde bibliotheken, externe apps |
| [Auditlog en ongedaan te maken batches](./audit-log.md) | Standaard ingeschakelde auditing van elke mutatie op het controllerknooppunt, en de batchlaag die imports en bulkacties ongedaan maakbaar maakt | Api (alle modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | De betaalde opslag- en sms-tegoeddienst: identiteit via gedeelde JWT, service-key S2S, de sms- en opslagprovider-koppelpunten, Stripe-facturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-pakketten, B1Admin |
| [Eigen opslag meebrengen (BYOS)](./byos-storage.md) | Kerken koppelen Google Drive, Dropbox, OneDrive of een S3-compatibele bucket voor uploads boven de gratis 100MB: OAuth-koppeling, uploadvormen per provider, de openbare downloadredirect | Api (content + membership), helpers/apphelper-pakketten, B1Admin, B1App |
| [Gedeelde content](./commons.md) | De gedeelde spil voor assets en inzendingen achter cross-product gebruikersinhoud, en de enkele moderatiewachtrij voor alleen medewerkers in Server Admin van B1Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Wanneer een wijziging de werking van een van deze systemen verandert, en niet alleen een pagina binnen één app, moet de bijbehorende systeemkaart hier in dezelfde inspanning worden bijgewerkt. Zo blijft deze sectie betrouwbaar als eerste aanspreekpunt voor nieuwe bijdragers.
:::

## Voorstellen

Deze documenten beschrijven voorgestelde werkzaamheden ter beoordeling en geen beschikbaar productgedrag.

| Voorstel | Wat het behandelt |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Account, sleutels, service en telefoonnummer in eigendom van de kerk; integratiereikwijdte, toestemming, levering, schattingen en controles vóór release |
| [Concept onboarding Twilio-kerken](./twilio-byok-onboarding-draft.md) | Voorgestelde instellingen voor het aanmeldformulier van B1, voorbeelden van kerkspecifieke campagnes en checklists voor goedkeuring en beheer |
