---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sidene er systemkart på tvers av repoer: de dokumenterer hvordan et kjernesystem i ChurchApps fungerer ende-til-ende — på tvers av appene, API-modulene og de delte bibliotekene — snarere enn hvordan et enkelt prosjekt er satt opp. Les dem før du endrer et systems atferd; les [Oppsett](../setup/) for å få et prosjekt i gang, og [API-seksjonen](../api/) for referanse på endepunktnivå.

</div>

## Økosystemet i fugleperspektiv

ChurchApps er ~20 uavhengige repoer (ikke et monorepo). Klientapper snakker med et lite sett backend-API-er over HTTPS og WebSocket, og deler kode gjennom npm-pakker publisert under `@churchapps`-omfanget.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Klienter                      │            │  Api — kjerne modulær monolitt (AWS Lambda)  │
│                                │            │                                              │
│  B1Admin    ansatt-dashbord    │   HTTPS    │   membership    attendance    content        │
│  B1App      medlemsportal +    │ ─────────▶ │   giving        messaging     doing          │
│             kirkenettsteder    │            │                                              │
│  B1Checkin  innsjekkingskiosk  │ ◀───WS───▶ │   én MySQL-database per modul (6 totalt)     │
│  B1Mobile   (kun vedlikehold)  │            └──────────────────────────────────────────────┘
│  FreePlay   TV-innholdsspiller │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church-backend         │
                │                             └──────────────────────────────────────────────┘
                │  delt kode via npm (@churchapps/*)
                ▼
   helpers (grensesnitt på tvers av apper) · apphelper (React-komponenter) · apihelper (Express-/server-verktøy)
```

To strukturelle regler former alt som er dokumentert i denne seksjonen:

1. **Moduler er isolerte.** Hver Api-modul eier sin database og sine tabeller; andre moduler og apper når dataene bare gjennom dens REST-endepunkter. Se [Modulstruktur](../api/module-structure).
2. **Delt kode leveres som npm-pakker.** Apper importerer aldri hverandres kildekode; alt som gjenbrukes krysser repo-grensene gjennom `@churchapps/helpers`, `@churchapps/apphelper`, eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/).

## Systemkart

| Side | Hva den dekker | Omfatter |
|------|----------------|-------|
| [Varsler og påminnelser](./notifications) | Hvordan noe forteller en person noe: de to sendedørene, kanaleskaleringskjeden, og påminnelsesmotoren | Api (messaging), B1Admin, B1App |
| [Sanntidsarkitektur](../realtime) | WebSocket-leveringsrammeverket bak chat, tilstedeværelse og levering i appen | Api (messaging), alle nettapper |
| [Nett-push-varsler](../web-push) | Nettleserens push-kanal: VAPID-nøkler, abonnementslagring, levering | Api (messaging), alle nettapper |
| [Givertjeneste](./giving) | Betalingsleverandører og gatewayer, donasjonsflyter, formål/partier, gateway-webhooker | Api (giving), apphelper, B1App, B1Admin |
| [Arrangementspåmeldinger](./registrations) | Handelsmodellen for påmelding: deltakertyper, valg, rabattkoder, betalinger gjennom givertjeneste-gatewayen, og venteliste | Api (content + giving), B1App, B1Admin |
| [Innsjekking](./check-ins) | Kiosk og selvinnsjekking, oppmøtedatamodellen, romruting, barnesikkerhetslaget, etikettutskrift | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Nettstedbygging](./website-builder) | Side-/seksjons-/elementtreet, element-type-kontrakten og gjengivere, blogg, tilgangssperrede sider, SEO, og AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Nettstedruting og multi-nettsted](./websites) | Hvordan en forespørsel løses til en kirke og et spesifikt nettsted, multi-nettsted `siteId`-datamodellen, og Caddy-kanten for egne domener | B1App, Api (membership + content), B1Admin |
| [Integrasjoner](./integrations) | Utvidelsesflaten: OAuth, API-nøkler, webhooker, innholdsleverandører, MCP | Api, delte biblioteker, eksterne apper |
| [Revisjonslogg og angrebare partier](./audit-log) | Standard-på-revisjon av hver mutasjon ved controllerens trange punkt, og partilaget som gjør importer og masseoperasjoner angrebare | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Den betalte lagrings- og SMS-kreditt-tjenesten: delt JWT-identitet, tjeneste-nøkkel S2S, tekstmeldings- og lagringsleverandørskjøtene, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting-/apihelper-pakker, B1Admin |

:::tip
Når en endring endrer hvordan ett av disse systemene fungerer — ikke bare en side inne i én app — bør det tilhørende systemkartet her oppdateres i samme innsats. Det holder denne seksjonen pålitelig som første stopp for nye bidragsytere.
:::
