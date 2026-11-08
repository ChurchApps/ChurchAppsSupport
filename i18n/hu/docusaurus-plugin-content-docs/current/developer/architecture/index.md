---
title: "Architektúra"
description: "Több repót átfogó rendszertérképek, amelyek bemutatják, hogyan működik az adományozás, a bejelentkezés, az értesítések és a webhelyek a B1 Admin, a B1.church és az Api között, mielőtt módosítanál rajtuk."
---

# Architektúra

<div class="article-intro">

Ezek az oldalak több repót átfogó rendszertérképek: a rendszer működését végponttól végpontig dokumentálják, az alkalmazásokon, az API-modulokon és a megosztott könyvtárakon átívelően, nem pedig egyetlen projekt beállítását. Olvasd el őket, mielőtt módosítanál egy rendszer működésén. A projekt elindításához a [Beállítás](../setup/index.md) oldalt, a végpontszintű referenciához pedig az [API-szakaszt](../api/index.md) olvasd el.

</div>

## Az ökoszisztéma áttekintése

A ChurchApps mintegy 20 független repóból áll (nem monorepo). A kliensalkalmazások HTTPS-en és WebSocketen keresztül kommunikálnak néhány backend API-val, a kódot pedig a `@churchapps` hatókörben közzétett npm-csomagokon keresztül osztják meg.

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

Két szerkezeti szabály határozza meg ebben a szakaszban dokumentált minden elemet:

1. **A modulok el vannak szigetelve.** Minden Api-modul a saját adatbázisát és tábláit birtokolja; más modulok és alkalmazások csak a REST-végpontjain keresztül férnek hozzá az adataihoz. Lásd: [Modulstruktúra](../api/module-structure.md).
2. **A megosztott kód npm-csomagként érkezik.** Az alkalmazások nem importálják egymás forráskódját; ami újrahasznosításra kerül, az repóhatárokon át a `@churchapps/helpers`, `@churchapps/apphelper` vagy `@churchapps/apihelper` csomagon keresztül jut el. Lásd: [Megosztott könyvtárak](../shared-libraries/index.md).

## Rendszertérképek

| Oldal | Mit fed le | Érintett területek |
|------|----------------|-------|
| [Értesítések és emlékeztetők](./notifications.md) | Hogyan értesít valaki valakit valamiről: a két küldési csatorna, a csatornák fokozatos láncolata és az emlékeztető-motor | Api (messaging), B1Admin, B1App |
| [Valós idejű architektúra](../realtime.md) | A WebSocket-kézbesítési keretrendszer, amely a csevegést, a jelenlétet és az alkalmazáson belüli kézbesítést támogatja | Api (messaging), minden webes alkalmazás |
| [Webes push-értesítések](../web-push.md) | A böngészős push-csatorna: VAPID-kulcsok, feliratkozások tárolása, kézbesítés | Api (messaging), minden webes alkalmazás |
| [Adományozás](./giving.md) | Fizetési szolgáltatók és átjárók, adományozási folyamatok, alapok és kötegek, átjáró-webhookok | Api (giving), apphelper, B1App, B1Admin |
| [Eseménybejelentkezések](./registrations.md) | A regisztrációs kereskedelmi modell: résztvevőtípusok, kiválasztások, kedvezménykódok, fizetések az adományozási átjárón keresztül és a várólista | Api (content + giving), B1App, B1Admin |
| [Bejelentkezések](./check-ins.md) | Kiosk- és önálló bejelentkezés, a részvételi adatmodell, a termek útválasztása, a gyermekvédelmi réteg és a címkenyomtatás | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Webhely-készítő](./website-builder.md) | Az oldal/szakasz/elem fa, az elemtípus-szerződés és a renderelők, a blog, a hozzáférés-korlátozott oldalak, az SEO és az AI-generálás | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Webhely-útválasztás és több webhely](./websites.md) | Hogyan oldódik fel egy kérés egy gyülekezetre és egy adott webhelyre, a többwebhelyes `siteId` adatmodell és a Caddy egyedi domain-széle | B1App, Api (membership + content), B1Admin |
| [Integrációk](./integrations.md) | A bővítési felület: OAuth, API-kulcsok, webhookok, tartalomszolgáltatók, MCP | Api, megosztott könyvtárak, külső alkalmazások |
| [Naplózás és visszavonható kötegek](./audit-log.md) | Alapértelmezetten bekapcsolt naplózás minden módosításra a vezérlő ellenőrzési pontján, valamint a kötegrétegek, amelyek az importálásokat és a tömeges műveleteket visszavonhatóvá teszik | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | A fizetős tárhely- és SMS-kreditszolgáltatás: megosztott JWT-identitás, szolgáltatókulcsos S2S, az SMS- és tárhelyszolgáltatók illesztőpontjai, Stripe-számlázás | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper csomagok, B1Admin |
| [Saját tárhely (BYOS)](./byos-storage.md) | A gyülekezetek a 100 MB-os ingyenes keret fölötti feltöltésekhez Google Drive-ot, Dropboxot, OneDrive-ot vagy S3-kompatibilis tárolót kapcsolhatnak: OAuth-kapcsolat, szolgáltatónkénti feltöltési formák, nyilvános letöltési átirányítás | Api (content + membership), helpers/apphelper csomagok, B1Admin, B1App |
| [Tartalomközösség](./commons.md) | A termékek közötti, felhasználók által létrehozott tartalmak közös eszköz- és beküldési gerince, valamint az egyetlen, csak munkatársaknak szóló moderációs sor a B1Admin Server Adminban | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Ha egy változtatás e rendszerek valamelyikének működését érinti, nem csupán egy alkalmazáson belüli oldalt, akkor a megfelelő rendszertérképet ugyanabban a munkában kell frissíteni. Így ez a szakasz megbízható marad az új közreműködők első megállójaként.
:::

## Javaslatok

Ezek a dokumentumok felülvizsgálatra szánt javasolt munkát írnak le, nem pedig elérhető termékfunkciókat.

| Javaslat | Mit fed le |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Gyülekezet tulajdonában lévő fiók, kulcsok, szolgáltatás és telefonszám; integrációs hatókör, hozzájárulás, kézbesítés, becslések és kiadási ellenőrzések |
| [Twilio gyülekezeti regisztráció – tervezet](./twilio-byok-onboarding-draft.md) | Javasolt B1 regisztrációs űrlap-beállítások, gyülekezet-specifikus kampánypéldák és jóváhagyási, illetve üzemeltetési ellenőrzőlisták |
