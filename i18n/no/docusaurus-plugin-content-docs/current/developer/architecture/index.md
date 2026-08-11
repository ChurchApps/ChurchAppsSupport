---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sidene er tverr-repo systemkart: de dokumenterer hvordan et kjerne ChurchApps system fungerer ende-til-ende -- på tvers av appene, API-modulene og delte biblioteker -- i stedet for hvordan ethvert enkelt prosjekt er satt opp. Les dem før endring av et systems oppførsel; les [Oppsett](../setup/) for å få et prosjekt kjørende og [API-seksjonen](../api/) for referanse på endepunktnivå.

</div>

## Økosystemet på øyeblikk

ChurchApps er ~20 uavhengige depoter (ikke en monorepo). Klientapper snakker til et lite sett av backend APIer over HTTPS og WebSocket, og deler kode gjennom npm-pakker publisert under `@churchapps` omfanget.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Klienter                      │            │  Api — kjerne modulær monolitt (AWS Lambda)  │
│                                │            │                                              │
│  B1Admin    personal panel      │   HTTPS    │   medlemskap      nærvær        innhold      │
│  B1App      medlemsportal +     │ ─────────▶ │   giving          meldinger     gjøring     │
│             kirke nettsted      │            │                                              │
│  B1Checkin  innsjekk kiosk      │ ◀───WS───▶ │   en MySQL database per modul (6 totalt)   │
│  B1Mobile   (vedlikehold-kun)   │            └──────────────────────────────────────────────┘
│  FreePlay   TV innholds spiller │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend        │
                │                             └──────────────────────────────────────────────┘
                │  delt kode via npm (@churchapps/*)
                ▼
   helpers (tverr-app grensesnitt) · apphelper (React komponenter) · apihelper (Express/server verktøy)
```

To strukturregler former alt dokumentert i denne seksjonen:

1. **Moduler er isolert.** Hver Api modul eier sin database og sine tabeller; andre moduler og apper når dataene kun gjennom REST endepunktene. Se [Modulstruktur](../api/module-structure).
2. **Delt kode sendes som npm pakker.** Apper importerer aldri hverandres kilde; noe som gjenbrukes krysser repo grenser gjennom `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/).

## Systemkart

| Side | Hva den dekker | Spenn |
|------|----------------|-------|
| [Meldinger & påminnelser](./notifications) | Hvordan hva som helst forteller en person noe: de to dispatch dørene, kanal eskaleringskjeden og påminnelsesmotoren | Api (meldinger), B1Admin, B1App |
| [Sanntidsarkitektur](../realtime) | WebSocket leveringsrammeverket bak chat, tilstedeværelse og i-app levering | Api (meldinger), alle web apper |
| [Web push-meldinger](../web-push) | Nettleseren push kanal: VAPID nøkler, abonnements lagring, levering | Api (meldinger), alle web apper |
| [Giving](./giving) | Betalingsleverandører og gatewayer, donasjonsflyter, midler/batcher, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Hendelsespåmeldinger](./registrations) | Påmeldingss commerce modell: deltaker typer, valg, rabattkoder, betalinger gjennom giving gateway, og ventelisten | Api (innhold + giving), B1App, B1Admin |
| [Innsjekk](./check-ins) | Kiosk og selvinnsjekk, nærværsdatamodell, romruting, barnesikkerhetslaget, etikettutskrift | B1Checkin, B1App, B1Admin, Api (nærvær + medlemskap) |
| [Nettstedbygger](./website-builder) | Siden/seksjonen/element tre, element-type kontrakt og gjengiver, blog, tilgangsgater sider, SEO og AI generering | Api (innhold), AskApi, helpers/apphelper, B1Admin, B1App |
| [Nettstedruting & multi-site](./websites) | Hvordan en forespørsel løser til en kirke og et spesifikkt nettsted, multi-site `siteId` datamodell og Caddy egendefinert-domene kant | B1App, Api (medlemskap + innhold), B1Admin |
| [Integrasjoner](./integrations) | Utvidelses overflaten: OAuth, API nøkler, webhooks, innholdsleverandører, MCP | Api, delte biblioteker, eksterne apper |
| [Revisjonslogg & Reversible batcher](./audit-log) | Standard-på revisjon av hver mutasjon ved kontroller choke punkt, og batch-laget som gjør import og bulk handlinger reversible | Api (alle moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Den betalte lagring & tekstkreditt service: delt-JWT identitet, service-nøkkel S2S, tekstering og lagring leverandør søm, Stripe fakturering | MinistryStuffApi, MinistryStuffWeb, Api (innhold + meldinger), tekstering/apihelper pakker, B1Admin |
| [Bring-Your-Own lagring](./byos-storage) | Kirker koble Google Drive, Dropbox, OneDrive eller en S3-kompatibel bøtte for opplastinger forbi gratis 100MB: OAuth koble, per-leverandør opplasting former, offentlig nedlasting omdirigering | Api (innhold + medlemskap), helpers/apphelper pakker, B1Admin, B1App |

:::tip
Når en endring endrer hvordan en av disse systemene virker -- ikke bare en side inne i en app -- matchende system kart her bør oppdateres i samme innsats. Det holder denne seksjonen tillitverdig som første stopp for nye bidragsytere.
:::
