---
title: "Architectuur"
description: "Systeemkaarten over alle repo's: hoe geven, inchecken, meldingen en websites samenwerken tussen B1 Admin, B1.church en de API."
---

# Architectuur

<div class="article-intro">

Deze pagina's zijn systeemoverzichten over meerdere repositories. Ze beschrijven hoe een kernsysteem van ChurchApps van begin tot eind werkt, over de apps, de API-modules en de gedeelde bibliotheken heen, in plaats van hoe één project is ingesteld. Lees ze voordat je het gedrag van een systeem wijzigt. Lees [Installatie](../setup/index.md) om een project aan de praat te krijgen, en de [API-sectie](../api/index.md) voor naslag op endpointniveau.

</div>

## Het ecosysteem in één oogopslag

ChurchApps bestaat uit ongeveer 20 onafhankelijke repositories (geen monorepo). Clientapps communiceren via HTTPS en WebSocket met een kleine set backend-API's, en delen code via npm-pakketten die onder de `@churchapps`-scope worden gepubliceerd.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Twee structurele regels bepalen alles wat in deze sectie wordt beschreven:

1. **Modules zijn geïsoleerd.** Elke Api-module beheert zijn eigen database en tabellen. Andere modules en apps bereiken zijn gegevens alleen via de REST-endpoints. Zie [Modulestructuur](../api/module-structure.md).
2. **Gedeelde code wordt als npm-pakketten uitgeleverd.** Apps importeren nooit elkaars broncode. Alles wat hergebruikt wordt, gaat over repositorygrenzen heen via `@churchapps/helpers`, `@churchapps/apphelper` of `@churchapps/apihelper`. Zie [Gedeelde bibliotheken](../shared-libraries/index.md).

## Systeemoverzichten

| Pagina | Wat het behandelt | Betreft |
|------|----------------|-------|
| [Meldingen & herinneringen](./notifications.md) | Hoe iets een persoon iets laat weten: de twee verzendingspunten, de escalatieketen van kanalen en de herinneringsengine | Api (messaging), B1Admin, B1App |
| [Realtime-architectuur](../realtime.md) | Het WebSocket-leveringsframework achter chat, aanwezigheid en levering binnen de app | Api (messaging), alle webapps |
| [Webpushmeldingen](../web-push.md) | Het browserpushkanaal: VAPID-sleutels, opslag van abonnementen en levering | Api (messaging), alle webapps |
| [Geven](./giving.md) | Betalingsproviders en gateways, donatiestromen, fondsen/batches en gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Evenementregistraties](./registrations.md) | Het registratie-handelsmodel: deelnemerstypes, selecties, kortingscodes, betalingen via de giving-gateway en de wachtlijst | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins.md) | Kiosk- en zelf-check-in, het aanwezigheidsdatamodel, kamerroutering, de kinderveiligheidslaag en het printen van labels | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Websitebouwer](./website-builder.md) | De boomstructuur van pagina's, secties en elementen, het contract voor elementtypes en renderers, blog, pagina's met toegangsbeperking, SEO en AI-generatie | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Websiteroutering & multi-site](./websites.md) | Hoe een verzoek wordt omgezet naar een kerk en een specifieke site, het multi-site `siteId`-datamodel en de Caddy-edge voor eigen domeinen | B1App, Api (membership + content), B1Admin |
| [Integraties](./integrations.md) | Het uitbreidingsoppervlak: OAuth, API-sleutels, webhooks, contentproviders en MCP | Api, gedeelde bibliotheken, externe apps |
| [Auditlog & terugdraaibare batches](./audit-log.md) | Standaard ingeschakelde audit van elke mutatie op het controllerpunt, en de batchlaag die imports en bulkacties terugdraaibaar maakt | Api (alle modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | De betaalde service voor opslag en sms-tegoed: gedeelde-JWT-identiteit, service-key S2S, de koppelpunten voor sms- en opslagproviders en Stripe-facturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-pakketten, B1Admin |
| [Eigen opslag meenemen (Bring-Your-Own Storage)](./byos-storage.md) | Kerken koppelen Google Drive, Dropbox, OneDrive of een S3-compatibele bucket voor uploads boven de gratis 100 MB: OAuth-koppeling, uploadvormen per provider en de openbare downloadredirect | Api (content + membership), helpers/apphelper-pakketten, B1Admin, B1App |
| [Contentcommons](./commons.md) | De gedeelde basis voor assets en inzendingen achter gebruikersinhoud over producten heen, en de enkele moderatiewachtrij die alleen voor medewerkers is, in B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Wanneer een wijziging de werking van een van deze systemen verandert, en niet alleen een pagina binnen één app, moet het bijbehorende systeemoverzicht hier in dezelfde inspanning worden bijgewerkt. Zo blijft deze sectie betrouwbaar als eerste aanspreekpunt voor nieuwe bijdragers.
:::

## Voorstellen

Deze documenten beschrijven voorgestelde werkzaamheden ter beoordeling. Ze beschrijven geen beschikbaar productgedrag.

| Voorstel | Wat het behandelt |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kerkeigen account, sleutels, service en telefoonnummer; integratiescope, toestemming, levering, schattingen en releasecontroles |
| [Twilio-onboarding concept](./twilio-byok-onboarding-draft.md) | Voorgestelde instellingen voor het B1-aanmeldformulier, kerkspecifieke campagnevoorbeelden en goedkeurings- en beheerchecklists |
