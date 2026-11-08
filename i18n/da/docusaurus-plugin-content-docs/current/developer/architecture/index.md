---
title: "Arkitektur"
description: "Systemkort på tværs af repositories, der viser, hvordan donationer, check-ins, notifikationer og hjemmesider fungerer på tværs af B1 Admin, B1.church og Api, før du ændrer dem."
---

# Arkitektur

<div class="article-intro">

Disse sider er systemkort på tværs af repositories: de dokumenterer, hvordan et centralt ChurchApps-system fungerer fra start til slut — på tværs af apps, API-moduler og delte biblioteker — snarere end hvordan et enkelt projekt er opsat. Læs dem, før du ændrer et systems adfærd. Læs [Opsætning](../setup/index.md) for at få et projekt i gang, og [API-sektionen](../api/index.md) for referencer på endpoint-niveau.

</div>

## Økosystemet i overblik

ChurchApps består af ca. 20 uafhængige repositories (ikke et monorepo). Klientapps kommunikerer med et lille sæt backend-API'er over HTTPS og WebSocket og deler kode via npm-pakker, der udgives under `@churchapps`-scopet.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Klienter                      │            │  Api — kernemodulær monolit (AWS Lambda)     │
│                                │            │                                              │
│  B1Admin    personaleportal    │   HTTPS    │   membership    attendance    content        │
│  B1App      medlemsportal +    │ ─────────▶ │   giving        messaging     doing          │
│             kirkehjemmesider   │            │                                              │
│  B1Checkin  check-in-kiosk     │ ◀───WS───▶ │   én MySQL-database pr. modul (6 i alt)      │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   tv-indholdsafspiller│           ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church-backend         │
                │                             └──────────────────────────────────────────────┘
                │  delt kode via npm (@churchapps/*)
                ▼
   helpers (tværgående grænseflader) · apphelper (React-komponenter) · apihelper (Express/server-hjælpefunktioner)
```

To strukturelle regler former alt, der dokumenteres i denne sektion:

1. **Moduler er isolerede.** Hvert Api-modul ejer sin database og sine tabeller; andre moduler og apps får kun adgang til dets data via dets REST-endpoints. Se [Modulstruktur](../api/module-structure.md).
2. **Delt kode udgives som npm-pakker.** Apps importerer aldrig hinandens kildekode; alt, der genbruges, krydser repository-grænser via `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/index.md).

## Systemkort

| Side | Hvad den dækker | Omfatter |
|------|----------------|-------|
| [Notifikationer & påmindelser](./notifications.md) | Hvordan noget fortæller en person noget: de to afsendelsesindgange, eskaleringskæden for kanaler og påmindelsesmotoren | Api (messaging), B1Admin, B1App |
| [Realtidsarkitektur](../realtime.md) | WebSocket-leveringsrammeværket bag chat, tilstedeværelse og levering i appen | Api (messaging), alle web-apps |
| [Web push-notifikationer](../web-push.md) | Browserens push-kanal: VAPID-nøgler, lagring af abonnementer, levering | Api (messaging), alle web-apps |
| [Donationer](./giving.md) | Betalingsudbydere og gateways, donationsflows, fonde/batches, gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Eventregistreringer](./registrations.md) | Registreringsmodellen for kommercielle transaktioner: deltagertyper, valg, rabatkoder, betalinger via donationsgatewayen og venteliste | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins.md) | Kiosk- og selvbetjent check-in, datamodellen for fremmøde, rumrouting, børnesikkerhedslaget, udskrivning af etiketter | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Hjemmesidebygger](./website-builder.md) | Side-/sektion-/elementtræet, kontrakten for elementtyper og renderere, blog, adgangsstyrede sider, SEO og AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Hjemmesideroutning & multi-site](./websites.md) | Hvordan en forespørgsel løses til en kirke og et specifikt site, datamodellen for multi-site `siteId` og Caddy-kanten til egne domæner | B1App, Api (membership + content), B1Admin |
| [Integrationer](./integrations.md) | Udvidelsesfladen: OAuth, API-nøgler, webhooks, indholdsudbydere, MCP | Api, delte biblioteker, eksterne apps |
| [Revisionslog & fortrydelige batches](./audit-log.md) | Standardaktiveret revision af alle ændringer på controller-niveau, og batch-laget der gør import og masseoperationer fortrydelige | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Den betalte lagrings- og sms-kredittjeneste: identitet via delt JWT, service-key S2S, sms- og lagringsudbyder-sømme, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-pakker, B1Admin |
| [Egen lagring (BYOS)](./byos-storage.md) | Kirker kan forbinde Google Drive, Dropbox, OneDrive eller en S3-kompatibel bucket til uploads ud over de gratis 100 MB: OAuth-forbindelse, upload-format pr. udbyder, den offentlige download-omdirigering | Api (content + membership), helpers/apphelper-pakker, B1Admin, B1App |
| [Content Commons](./commons.md) | Det delte aktiv- og indsendelseslag bag tværprodukt-brugergenereret indhold og den ene modereringskø for kun medarbejdere i B1Admin Server Admin | Api (commons-modul), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Når en ændring ændrer, hvordan et af disse systemer fungerer — ikke blot en side i en enkelt app — skal det tilsvarende systemkort her opdateres i samme arbejde. Det holder denne sektion troværdig som det første holdepunkt for nye bidragydere.
:::

## Forslag

Disse dokumenter beskriver foreslået arbejde til gennemgang og ikke tilgængelig produktadfærd.

| Forslag | Hvad det dækker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kirkeejet konto, nøgler, tjeneste og telefonnummer; integrationsomfang, samtykke, levering, estimater og udgivelsestjek |
| [Udkast til Twilio-onboarding for kirker](./twilio-byok-onboarding-draft.md) | Foreslåede indstillinger for B1-tilmeldingsformularen, kirkespecifikke kampagneeksempler og godkendelses- og driftstjeklister |
