---
title: "Architektūra"
description: "Tarpsisteminiai žemėlapiai, rodantys, kaip aukos, registracijos, pranešimai ir svetainės veikia tarp B1 Admin, B1.church ir Api, prieš keičiant jas."
---

# Architektūra

<div class="article-intro">

Šie puslapiai yra tarpsaugyklinės sistemų schemos: jie aprašo, kaip pagrindinė ChurchApps sistema veikia nuo pradžios iki galo, įskaitant programėles, API modulius ir bendrąsias bibliotekas, o ne tai, kaip nustatomas atskiras projektas. Prieš keisdami sistemos elgseną, perskaitykite juos. Kad paleistumėte projektą, skaitykite [Diegimas](../setup/index.md), o galutinių taškų nuorodai skirtas [API skyrius](../api/index.md).

</div>

## Ekosistema apžvalgoje

ChurchApps turi apie 20 nepriklausomų saugyklų (tai ne monorepo). Klientinės programėlės bendrauja su nedidele backend API rinkinio dalimi per HTTPS ir WebSocket, o kodu dalijasi per npm paketus, publikuotus `@churchapps` vardų erdvėje.

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

Du struktūriniai principai lemia viską, kas aprašyta šiame skyriuje:

1. **Moduliai yra izoliuoti.** Kiekvienas Api modulis valdo savo duomenų bazę ir lenteles; kiti moduliai ir programėlės prie jo duomenų prieina tik per jo REST galutinius taškus. Žr. [Modulio struktūra](../api/module-structure.md).
2. **Bendras kodas platinamas kaip npm paketai.** Programėlės niekada neimportuoja viena kitos šaltinio kodo; viskas, kas naudojama pakartotinai, peržengia saugyklų ribas per `@churchapps/helpers`, `@churchapps/apphelper` arba `@churchapps/apihelper`. Žr. [Bendrosios bibliotekos](../shared-libraries/index.md).

## Sistemų schemos

| Puslapis | Ką apima | Aprėptis |
|------|----------------|-------|
| [Pranešimai ir priminimai](./notifications.md) | Kaip kas nors praneša asmeniui: du siuntimo kanalai, kanalų eskalavimo grandinė ir priminimų variklis | Api (messaging), B1Admin, B1App |
| [Realaus laiko architektūra](../realtime.md) | WebSocket pristatymo sistema, kuri palaiko pokalbius, buvimo būseną ir pristatymą programėlėje | Api (messaging), visos žiniatinklio programėlės |
| [Žiniatinklio push pranešimai](../web-push.md) | Naršyklės push kanalas: VAPID raktai, prenumeratų saugykla, pristatymas | Api (messaging), visos žiniatinklio programėlės |
| [Aukojimas](./giving.md) | Mokėjimo tiekėjai ir šliuzai, aukojimo srautai, fondai ir partijos, šliuzų webhook'ai | Api (giving), apphelper, B1App, B1Admin |
| [Renginių registracijos](./registrations.md) | Registracijos komercinis modelis: dalyvių tipai, pasirinkimai, nuolaidų kodai, mokėjimai per aukojimo šliuzą ir laukiamasis sąrašas | Api (content + giving), B1App, B1Admin |
| [Registracija atvykus](./check-ins.md) | Kioskų ir savitarnos registracija, lankomumo duomenų modelis, kambarių maršrutizavimas, vaikų saugos sluoksnis, etikečių spausdinimas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Svetainių kūrėjas](./website-builder.md) | Puslapių, skyrių ir elementų medis, elementų tipų sutartis ir atvaizdavimo komponentai, tinklaraštis, prieigą ribojantys puslapiai, SEO ir DI generavimas | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Svetainių maršrutizavimas ir kelios svetainės](./websites.md) | Kaip užklausa nukreipiama į bažnyčią ir konkrečią svetainę, kelių svetainių `siteId` duomenų modelis ir Caddy pasirinktinių domenų kraštas | B1App, Api (membership + content), B1Admin |
| [Integracijos](./integrations.md) | Plėtinių paviršius: OAuth, API raktai, webhook'ai, turinio tiekėjai, MCP | Api, bendrosios bibliotekos, išorinės programėlės |
| [Veiksmų žurnalas ir atšaukiamos partijos](./audit-log.md) | Numatytasis kiekvieno duomenų keitimo auditas valdiklio kontrolės taške ir partijų sluoksnis, leidžiantis atšaukti importus ir masinius veiksmus | Api (visi moduliai), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Mokama saugyklos ir teksto žinučių kreditų paslauga: bendru JWT pagrindu veikianti tapatybė, service-key S2S, teksto žinučių ir saugyklos tiekėjų sąsajos, Stripe atsiskaitymas | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper paketai, B1Admin |
| [Naudokite savo saugyklą](./byos-storage.md) | Bažnyčios susieja Google Drive, Dropbox, OneDrive arba S3 suderinamą saugyklą įkėlimams virš nemokamų 100 MB: OAuth prijungimas, kiekvieno tiekėjo įkėlimo formatai, viešas atsisiuntimo peradresavimas | Api (content + membership), helpers/apphelper paketai, B1Admin, B1App |
| [Turinio bendrieji ištekliai](./commons.md) | Bendras išteklių ir pateikimų pagrindas, skirtas tarpprodukciniam vartotojų sukurtam turiniui, ir vienintelė tik personalui skirta moderavimo eilė B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kai pakeitimas keičia vienos iš šių sistemų veikimą, o ne tik vieno programėlės puslapį, atitinkama sistemos schema čia turi būti atnaujinta tuo pačiu darbu. Taip šis skyrius išlieka patikimas pirmuoju šaltiniu naujiems prisidedantiems asmenims.
:::

## Pasiūlymai

Šiuose dokumentuose aprašomi siūlomi darbai peržiūrai, o ne esama produkto elgsena.

| Pasiūlymas | Ką apima |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Bažnyčiai priklausanti paskyra, raktai, paslauga ir telefono numeris; integracijos apimtis, sutikimas, pristatymas, įvertinimai ir išleidimo patikros |
| [Twilio bažnyčios registracijos juodraštis](./twilio-byok-onboarding-draft.md) | Siūlomi B1 registracijos formos nustatymai, konkrečioms bažnyčioms skirti kampanijų pavyzdžiai ir patvirtinimo bei veiklos kontroliniai sąrašai |
