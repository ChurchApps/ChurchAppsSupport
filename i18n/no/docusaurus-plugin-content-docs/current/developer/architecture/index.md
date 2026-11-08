---
title: "Arkitektur"
description: "Systemkart på tvers av repositorier som viser hvordan givertjenester, innsjekking, varsler og nettsider fungerer i B1 Admin, B1.church og Api, før du endrer dem."
---

# Arkitektur

<div class="article-intro">

Disse sidene er systemkart på tvers av repositorier: de dokumenterer hvordan et sentralt ChurchApps-system fungerer fra ende til ende, på tvers av appene, API-modulene og de delte bibliotekene, i stedet for hvordan ett enkelt prosjekt settes opp. Les dem før du endrer et systems oppførsel. Les [Oppsett](../setup/index.md) for å få et prosjekt i gang, og [API-delen](../api/index.md) for referanse på endepunktnivå.

</div>

## Økosystemet i korte trekk

ChurchApps består av rundt 20 uavhengige repositorier (ikke et monorepo). Klientappene kommuniserer med et lite sett backend-API-er over HTTPS og WebSocket, og deler kode via npm-pakker publisert under `@churchapps`-scopet.

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

To strukturelle regler former alt som dokumenteres i denne delen:

1. **Moduler er isolert.** Hver Api-modul eier sin database og sine tabeller. Andre moduler og apper får bare tilgang til dataene via modulens REST-endepunkter. Se [Modulstruktur](../api/module-structure.md).
2. **Delt kode leveres som npm-pakker.** Apper importerer aldri hverandres kildekode. Alt som gjenbrukes, går på tvers av repositoriegrenser via `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/index.md).

## Systemkart

| Side | Hva den dekker | Omfatter |
|------|----------------|----------|
| [Varsler og påminnelser](./notifications.md) | Hvordan noe varsler en person: de to utsendingsinngangene, eskaleringskjeden for kanaler og påminnelsesmotoren | Api (messaging), B1Admin, B1App |
| [Sanntidsarkitektur](../realtime.md) | WebSocket-leveringsrammeverket bak chat, tilstedeværelse og levering i appen | Api (messaging), alle web-apper |
| [Web push-varsler](../web-push.md) | Nettleserens push-kanal: VAPID-nøkler, lagring av abonnementer, levering | Api (messaging), alle web-apper |
| [Givertjenester](./giving.md) | Betalingsleverandører og gatewayer, givingsflyter, fond og batcher, gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Arrangementspåmeldinger](./registrations.md) | Påmeldingsmodellen: deltakertyper, valg, rabattkoder, betalinger via givergatewayen og venteliste | Api (content + giving), B1App, B1Admin |
| [Innsjekking](./check-ins.md) | Kiosk- og selvinnsjekking, datamodellen for oppmøte, romtildeling, barnesikkerhetslaget, utskrift av etiketter | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Nettstedsbygger](./website-builder.md) | Side-, seksjon- og elementtreet, kontrakten for elementtyper og renderere, blogg, sider med tilgangsstyring, SEO og AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Nettstedsruting og flere nettsteder](./websites.md) | Hvordan en forespørsel løses til en menighet og et bestemt nettsted, datamodellen for flere nettsteder med `siteId`, og kantlaget (Caddy) for egendefinerte domener | B1App, Api (membership + content), B1Admin |
| [Integrasjoner](./integrations.md) | Utvidelsesflaten: OAuth, API-nøkler, webhooker, innholdsleverandører, MCP | Api, delte biblioteker, eksterne apper |
| [Revisjonslogg og angrbare batcher](./audit-log.md) | Standard påslått revisjon av hver endring i kontrollerens flaskehals, og batchlaget som gjør import og masseoperasjoner angrbare | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Den betalte tjenesten for lagring og SMS-kreditter: identitet via delt JWT, S2S med tjenestenøkkel, leverandørgrensesnitt for SMS og lagring, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-pakker, B1Admin |
| [Egen lagring (BYOS)](./byos-storage.md) | Menigheter kobler Google Drive, Dropbox, OneDrive eller en S3-kompatibel bucket for opplastinger utover de gratis 100 MB: OAuth-tilkobling, opplastingsformer per leverandør, offentlig nedlastingsomdirigering | Api (content + membership), helpers/apphelper-pakker, B1Admin, B1App |
| [Delt innhold (Content Commons)](./commons.md) | Den delte ressurs- og innsendingsstrukturen bak brukergenerert innhold på tvers av produkter, og den ene moderasjonskøen for kun ansatte i Server Admin i B1Admin | Api (commons-modulen), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Når en endring påvirker hvordan et av disse systemene fungerer, ikke bare en side i én app, bør det tilsvarende systemkartet her oppdateres i samme arbeid. Det holder denne delen pålitelig som første stopp for nye bidragsytere.
:::

## Forslag

Disse dokumentene beskriver foreslått arbeid til gjennomgang, og ikke tilgjengelig produktfunksjonalitet.

| Forslag | Hva det dekker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Menighetseid konto, nøkler, tjeneste og telefonnummer; omfang for integrasjon, samtykke, levering, estimater og utgivelseskontroller |
| [Twilio-utkast for menighetsregistrering](./twilio-byok-onboarding-draft.md) | Foreslåtte innstillinger for registreringsskjemaet i B1, menighetsspesifikke eksempler på kampanjer og sjekklister for godkjenning og drift |
