---
title: "Architektúra"
description: "Rendszerszintű térképek, amelyek megmutatják, hogyan működik az adakozás, a bejelentkezés, az értesítések és a weboldalak a B1 Adminban, a B1.churchben és az API-ban, mielőtt bármit módosítanál."
---

# Architektúra

<div class="article-intro">

Ezek az oldalak a ChurchApps fő rendszereinek összefoglaló térképei. Azt írják le, hogyan működik egy-egy alapvető rendszer a kezdetektől a végéig, az alkalmazásokon, az API-modulokon és a megosztott könyvtárakon átívelve. Nem azt magyarázzák, hogyan kell beállítani egy adott projektet. Egy rendszer működésének megváltoztatása előtt olvasd el őket. A projekt futtatásához a [Beállítás](../setup/index.md) oldalt, a végpontok részletes leírásához pedig az [API-szakaszt](../api/index.md) használd.

</div>

## Az ökoszisztéma egy pillantásra

A ChurchApps körülbelül 20 önálló tárolóból áll (nem monorepo). A kliensalkalmazások HTTPS-en és WebSocketen keresztül kommunikálnak néhány backend API-val, a kódot pedig a `@churchapps` névtér alatt közzétett npm-csomagokon keresztül osztják meg.

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

Ez a szakasz minden leírását két szerkezeti szabály határozza meg:

1. **A modulok elkülönítettek.** Minden Api-modul a saját adatbázisának és tábláinak tulajdonosa. Más modulok és alkalmazások csak a REST-végpontjain keresztül férhetnek hozzá az adataihoz. Lásd: [Modulstruktúra](../api/module-structure.md).
2. **A megosztott kód npm-csomagként jut el a felhasználókhoz.** Az alkalmazások nem importálják egymás forráskódját. Az újrafelhasznált kód a `@churchapps/helpers`, a `@churchapps/apphelper` vagy a `@churchapps/apihelper` csomagon keresztül lép át a tárolók határain. Lásd: [Megosztott könyvtárak](../shared-libraries/index.md).

## Rendszertérképek

| Oldal | Mit fed le | Érintett részek |
|------|----------------|-------|
| [Értesítések és emlékeztetők](./notifications.md) | Hogyan értesít valaki valakit valamiről: a két kiküldési csatorna, a csatornák közötti lépcsőzetes váltás és az emlékeztető-motor | Api (messaging), B1Admin, B1App |
| [Valós idejű architektúra](../realtime.md) | A WebSocket-alapú kézbesítési keretrendszer, amely a csevegést, a jelenlétet és az alkalmazáson belüli kézbesítést szolgálja ki | Api (messaging), minden webes alkalmazás |
| [Webes push-értesítések](../web-push.md) | A böngészős push-csatorna: VAPID-kulcsok, feliratkozások tárolása, kézbesítés | Api (messaging), minden webes alkalmazás |
| [Adományozás](./giving.md) | Fizetési szolgáltatók és átjárók, adományozási folyamatok, alapok és kötegek, átjáró-webhookok | Api (giving), apphelper, B1App, B1Admin |
| [Eseményregisztrációk](./registrations.md) | A regisztrációs kereskedelmi modell: résztvevőtípusok, választások, kedvezménykódok, fizetések az adományozási átjárón keresztül és a várólista | Api (content + giving), B1App, B1Admin |
| [Bejelentkezések](./check-ins.md) | Kiosk- és önellenőrzéses bejelentkezés, a részvételi adatmodell, teremirányítás, gyermekvédelmi réteg, címkenyomtatás | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Weboldal-szerkesztő](./website-builder.md) | Az oldal/szakasz/elem fa, az elemtípus-szerződés és a renderelők, a blog, a hozzáférés-korlátozott oldalak, a SEO és az AI-alapú generálás | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Weboldal-útvonalak és többoldalas működés](./websites.md) | Hogyan oldódik fel egy kérés egy gyülekezetre és egy adott oldalra, a többoldalas `siteId` adatmodell és a Caddy egyedi domain-szélső rétege | B1App, Api (membership + content), B1Admin |
| [Integrációk](./integrations.md) | A bővítési felület: OAuth, API-kulcsok, webhookok, tartalomszolgáltatók, MCP | Api, megosztott könyvtárak, külső alkalmazások |
| [Auditnapló és visszavonható kötegek](./audit-log.md) | Minden módosítás alapértelmezett auditálása a vezérlő központi pontján, valamint a kötegréteg, amely az importálásokat és a tömegesműveleteket visszavonhatóvá teszi | Api (minden modul), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | A fizetős tárhely- és SMS-kreditszolgáltatás: megosztott JWT-identitás, szolgáltatókulcsos szerverek közötti (S2S) kommunikáció, az SMS- és tárhely-szolgáltatói illesztési pontok, Stripe-számlázás | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper csomagok, B1Admin |
| [Saját tárhely (BYOS)](./byos-storage.md) | Gyülekezetek összekapcsolhatják a Google Drive-ot, a Dropboxot, az OneDrive-ot vagy egy S3-kompatibilis tárolót az ingyenes 100 MB-on túli feltöltésekhez: OAuth-csatlakozás, szolgáltatónkénti feltöltési formátumok, nyilvános letöltési átirányítás | Api (content + membership), helpers/apphelper csomagok, B1Admin, B1App |
| [Közös tartalomtár](./commons.md) | A termékek közötti, felhasználók által létrehozott tartalmakat kiszolgáló közös eszköz- és beküldési gerinc, valamint az egyetlen, csak személyzetnek szánt moderációs sor a B1Admin Server Adminban | Api (commons modul), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Ha egy változtatás ezeknek a rendszereknek a működését módosítja, nem csak egy alkalmazáson belüli oldalt, a hozzájuk tartozó rendszertérképet ugyanabban a munkafolyamatban frissítsd. Így ez a szakasz továbbra is megbízható első kiindulópont marad az új közreműködők számára.
:::

## Javaslatok

Ezek a dokumentumok felülvizsgálatra szánt tervezett munkát írnak le, nem pedig jelenleg elérhető termékfunkciókat.

| Javaslat | Mit fed le |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Gyülekezeti tulajdonú fiók, kulcsok, szolgáltatás és telefonszám; az integráció hatóköre, hozzájárulás, kézbesítés, becslések és kiadás előtti ellenőrzések |
| [Twilio gyülekezeti bevezetési tervezet](./twilio-byok-onboarding-draft.md) | Tervezett B1-regisztrációs űrlap-beállítások, gyülekezetspecifikus kampánypéldák, valamint jóváhagyási és üzemeltetési ellenőrzőlisták |
