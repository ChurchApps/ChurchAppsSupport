---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sider er tværgående systemkort: de beskriver, hvordan et centralt ChurchApps-system fungerer fra start til slut på tværs af apps, API-moduler og delte biblioteker, i stedet for hvordan et enkelt projekt er sat op. Læs dem, før du ændrer et systems adfærd. Læs [Opsætning](../setup/) for at få et projekt til at køre, og [API-afsnittet](../api/) for referencer på endpoint-niveau.

</div>

## Økosystemet i overblik

ChurchApps består af ca. 20 uafhængige repositories (ikke et monorepo). Klientapps kommunikerer med et lille sæt backend-API'er over HTTPS og WebSocket og deler kode via npm-pakker, der udgives under `@churchapps`-scopet.

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

To strukturelle regler former alt det, der dokumenteres i dette afsnit:

1. **Moduler er isolerede.** Hvert Api-modul ejer sin database og sine tabeller. Andre moduler og apps får kun adgang til dets data via dets REST-endpoints. Se [Modulstruktur](../api/module-structure).
2. **Delt kode distribueres som npm-pakker.** Apps importerer aldrig hinandens kildekode. Alt, der genbruges, krydser repository-grænser via `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/).

## Systemkort

| Side | Hvad den dækker | Omfatter |
|------|----------------|-------|
| [Notifikationer og påmindelser](./notifications) | Hvordan noget giver en person besked: de to afsendelsesindgange, eskaleringskæden for kanaler og motoren for påmindelser | Api (messaging), B1Admin, B1App |
| [Realtidsarkitektur](../realtime) | WebSocket-leveringsrammeværket bag chat, tilstedeværelse og levering i appen | Api (messaging), alle webapps |
| [Web push-notifikationer](../web-push) | Browserens push-kanal: VAPID-nøgler, lagring af abonnementer, levering | Api (messaging), alle webapps |
| [Donationer](./giving) | Betalingsudbydere og gateways, donationsflows, fonde/batcher, webhooks fra gateways | Api (giving), apphelper, B1App, B1Admin |
| [Tilmeldinger til begivenheder](./registrations) | Tilmeldingernes handelsmodel: deltagertyper, valg, rabatkoder, betalinger via donations-gatewayen og venteliste | Api (content + giving), B1App, B1Admin |
| [Check-ins](./check-ins) | Check-in ved kiosk og selvbetjent check-in, datamodellen for fremmøde, rumrouting, børnesikkerhedslaget, udskrivning af etiketter | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Hjemmesidebygger](./website-builder) | Side-, sektion- og elementtræet, kontrakten for elementtyper og renderere, blog, adgangsstyrede sider, SEO og AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routing af hjemmesider og flere sites](./websites) | Hvordan en anmodning kobles til en kirke og et bestemt site, datamodellen for flere sites med `siteId`, og Caddy-kanten for egne domæner | B1App, Api (membership + content), B1Admin |
| [Integrationer](./integrations) | Udvidelsesfladen: OAuth, API-nøgler, webhooks, indholdsudbydere, MCP | Api, delte biblioteker, eksterne apps |
| [Revisionslog og batcher, der kan fortrydes](./audit-log) | Automatisk revision af alle ændringer ved controllerens kontrolpunkt, og batchlaget, der gør import og massehandlinger reversible | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Den betalte tjeneste for lagerplads og sms-kreditter: identitet via delt JWT, service-key S2S, sms- og lagringsudbyderes integrationspunkter, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), pakkerne texting/apihelper, B1Admin |
| [Egen lagring (Bring-Your-Own Storage)](./byos-storage) | Kirker kan forbinde Google Drive, Dropbox, OneDrive eller en S3-kompatibel bucket til uploads over den gratis grænse på 100 MB: OAuth-forbindelse, uploadformater pr. udbyder, offentlig omdirigering ved download | Api (content + membership), pakkerne helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons) | Den delte spine for aktiver og indsendelser bag brugergenereret indhold på tværs af produkter, og den ene modkøe for moderation, som kun medarbejdere har adgang til i B1Admin Server Admin | Api (commons-modulet), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Når en ændring ændrer, hvordan et af disse systemer fungerer, og ikke kun en side i en enkelt app, bør det tilsvarende systemkort her opdateres i samme arbejde. Det holder dette afsnit pålideligt som første holdepunkt for nye bidragydere.
:::

## Forslag

Disse dokumenter beskriver foreslået arbejde til gennemgang og ikke tilgængelig produktadfærd.

| Forslag | Hvad den dækker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Kirkeejet konto, nøgler, tjeneste og telefonnummer; integrationens omfang, samtykke, levering, estimater og udgivelseskontroller |
| [Udkast til Twilio-onboarding for kirker](./twilio-byok-onboarding-draft) | Foreslåede indstillinger for B1-tilmeldingsformularen, kirkespecifikke eksempler på kampagner og tjeklister for godkendelse og drift |
