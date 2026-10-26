---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sidene er systemoversikter på tvers av repositorier: de dokumenterer hvordan et kjernesystem i ChurchApps fungerer fra ende til ende – på tvers av appene, API-modulene og de delte bibliotekene – i stedet for hvordan ett enkelt prosjekt settes opp. Les dem før du endrer et systems oppførsel. Les [Oppsett](../setup/) for å få et prosjekt i gang, og [API-delen](../api/) for referanse på endepunktnivå.

</div>

## Økosystemet i korte trekk

ChurchApps består av rundt 20 uavhengige repositorier (ikke et monorepo). Klientappene kommuniserer med et lite sett backend-API-er over HTTPS og WebSocket, og deler kode gjennom npm-pakker publisert under `@churchapps`-scopet.

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

To strukturelle regler former alt som dokumenteres i denne delen:

1. **Modulene er isolerte.** Hver API-modul eier sin database og sine tabeller; andre moduler og apper får bare tilgang til dataene gjennom REST-endepunktene. Se [Modulstruktur](../api/module-structure).
2. **Delt kode leveres som npm-pakker.** Apper importerer aldri hverandres kildekode; alt som gjenbrukes går på tvers av repositorier gjennom `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/).

## Systemkart

| Side | Hva den dekker | Omfatter |
|------|----------------|----------|
| [Varsler og påminnelser](./notifications) | Hvordan noe informerer en person: de to utsendingsinngangene, eskaleringskjeden for kanaler og påminnelsesmotoren | Api (messaging), B1Admin, B1App |
| [Sanntidsarkitektur](../realtime) | WebSocket-leverings-rammeverket bak chat, tilstedeværelse og levering i appen | Api (messaging), alle webappene |
| [Web push-varsler](../web-push) | Kanalen for push i nettleseren: VAPID-nøkler, lagring av abonnement, levering | Api (messaging), alle webappene |
| [Giving](./giving) | Betalingsleverandører og gatewayer, donasjonsflyt, fond/batcher, webhooks fra gatewayer | Api (giving), apphelper, B1App, B1Admin |
| [Arrangementspåmeldinger](./registrations) | Påmeldingens handelsmodell: deltakertyper, valg, rabattkoder, betalinger via giving-gatewayen og venteliste | Api (content + giving), B1App, B1Admin |
| [Innsjekking](./check-ins) | Innsjekking ved kiosk og selv, datamodellen for oppmøte, romtildeling, sikkerhetslaget for barn, utskrift av etiketter | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Nettsidebygger](./website-builder) | Trestrukturen for side/seksjon/element, kontrakten for elementtyper og renderere, blogg, sider med tilgangsstyring, SEO og AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Nettsideruting og flere nettsteder](./websites) | Hvordan en forespørsel løses til en menighet og et bestemt nettsted, datamodellen for flere nettsteder med `siteId`, og Caddy-kanten for egne domener | B1App, Api (membership + content), B1Admin |
| [Integrasjoner](./integrations) | Utvidelsesflaten: OAuth, API-nøkler, webhooks, innholdsleverandører, MCP | Api, delte biblioteker, eksterne apper |
| [Revisjonslogg og angrbare batcher](./audit-log) | Standard-på revisjon av hver endring i kontrollerens kontrollpunkt, og batch-laget som gjør import og masseoperasjoner angrbare | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Den betalte tjenesten for lagring og tekstmeldingskreditter: identitet med delt JWT, S2S med tjenestenøkkel, leverandørgrensesnittene for tekst og lagring, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-pakker, B1Admin |
| [Egen lagring (BYOS)](./byos-storage) | Menigheter kobler til Google Drive, Dropbox, OneDrive eller en S3-kompatibel bøtte for opplastinger over de gratis 100 MB: OAuth-tilkobling, opplastingsformer per leverandør, den offentlige nedlastingsomdirigeringen | Api (content + membership), helpers/apphelper-pakker, B1Admin, B1App |
| [Innholdsfellesskap](./commons) | Det delte ressurs- og innsendingsgrunnlaget bak brukergenerert innhold på tvers av produkter, og den ene moderasjonskøen for kun ansatte i B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Når en endring endrer hvordan et av disse systemene fungerer – og ikke bare en side i én app – bør det tilsvarende systemkartet her oppdateres i samme arbeidsøkt. Det holder denne delen pålitelig som første stopp for nye bidragsytere.
:::

## Forslag

Disse dokumentene beskriver foreslått arbeid som skal vurderes, og ikke tilgjengelig produktoppførsel.

| Forslag | Hva det dekker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Menighetens egen konto, nøkler, tjeneste og telefonnummer; integrasjonsomfang, samtykke, levering, estimater og utgivelseskontroller |
| [Utkast til onboarding av menighet i Twilio](./twilio-byok-onboarding-draft) | Foreslåtte innstillinger for B1-registreringsskjema, kampanjeeksempler for den enkelte menigheten, og sjekklister for godkjenning og drift |
