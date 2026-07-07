---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Disse sidene er kors-depo system kart: de dokumenterer hvordan ett kjerne ChurchApps system fungerer ende-til-ende — på tvers av appene, API modulene, og delte biblioteker — snarere enn hvordan noen enkelt prosjekt er satt opp. Les dem før endring ett system oppførsel; les [Oppsett](../setup/) for å få ett prosjekt kjørende og [API seksjonen](../api/) for endepunkt-nivå referanse.

</div>

## Økosystemet på et blikk

ChurchApps er ~20 uavhengige depoer (ikke en monorepo). Klient apper snakker til ett lite sett av backend APIer over HTTPS og WebSocket, og dele kode gjennom npm pakker publisert under `@churchapps` omfang.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Klienter                      │            │  Api — kjerne modulær monolitt (AWS Lambda)  │
│                                │            │                                              │
│  B1Admin    stab instrumentbrett│  HTTPS    │   membership    attendance    content        │
│  B1App      medlem portal +    │ ─────────▶ │   giving        messaging     doing          │
│             kirke nettsteder   │            │                                              │
│  B1Checkin  innsjekking kiosk  │ ◀───WS───▶ │   ein MySQL database per modul (6 total)     │
│  B1Mobile   (vedlikehold-bare) │            └──────────────────────────────────────────────┘
│  FreePlay   TV innhold spiller  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  delt kode via npm (@churchapps/*)
                ▼
   helpers (kors-app grensesnitt) · apphelper (React komponenter) · apihelper (Express/server verktøy)
```

To strukturelle regler former alt dokumentert i denne seksjonen:

1. **Moduler er isolerte.** Hver Api modul eier sin database og sine tabeller; andre moduler og apper når sin data bare gjennom sin REST endepunkter. Se [Modul struktur](../api/module-structure).
2. **Delt kode lever som npm pakker.** Apper aldri import hverandre kilder; noe gjenbrukt kors depo grenser gjennom `@churchapps/helpers`, `@churchapps/apphelper`, eller `@churchapps/apihelper`. Se [Delte biblioteker](../shared-libraries/).

## System kart

| Side | Hva den dekker | Utvidelse |
|------|----------------|-------|
| [Varsler og påminnelser](./notifications) | Hvordan noe forteller en person noe: de to dispatch dørene, kanal eskalering kjede, og påminning motor | Api (messaging), B1Admin, B1App |
| [Realtids arkitektur](../realtime) | WebSocket leveringen ramverk bak chat, tilstedeværelse, og i-app leveringen | Api (messaging), alle nett apper |
| [Nett push varsler](../web-push) | Nettleser push kanal: VAPID nøkler, abonnement lagring, leveringen | Api (messaging), alle nett apper |
| [Donering](./giving) | Betalings leverandørers og gateways, donerings flyter, midler/partier, gateway webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Arrangements registreringer](./registrations) | Registrerings handels modellen: deltager typer, valg, rabatt koder, betalinger gjennom donerings gateway, og venteliste | Api (content + giving), B1App, B1Admin |
| [Innsjekking](./check-ins) | Kiosk og selvinnsjekking, oppmøte data modellen, rom ruting, barnesikkerhet laget, etikett utskrift | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Nettsted bygging](./website-builder) | Side/seksjonen/element tre, element-type kontrakt og gjengivere, blogg, tilgang-gated sider, SEO, og AI generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Nettsted ruting og multi-nettsted](./websites) | Hvordan ett forespørsel løse til en kirke og ett spesifikk nettsted, multi-nettsted `siteId` data modellen, og Caddy egne-domene kant | B1App, Api (membership + content), B1Admin |
| [Integrasjoner](./integrations) | Utvidelse flaten: OAuth, API nøkler, webhooks, innhold leverandørers, MCP | Api, delte biblioteker, eksterne apper |
| [Revisjonlogg og angrettbar partier](./audit-log) | Standard-på revisjonering av hver mutasjon ved kontroller trangpunkt, og partie laget som gjør import og masse handlinger angrettbar | Api (alle moduler), B1Admin, B1Transfer |

:::tip
Når en endring endrer hvordan en av disse systemene fungerer — ikke bare en side innsiden en app — det matchende system kart her skal oppdateres i samme innsats. At holder denne seksjonen pålitelig som første stopp for nye bidragsytere.
:::
