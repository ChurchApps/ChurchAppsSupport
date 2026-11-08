---
title: "Architektūra"
description: "Tarpsisteminės sistemos schemos, rodančios, kaip veikia aukojimai, atvykimo registracija, pranešimai ir svetainės tarp B1 Admin, B1.church ir Api, prieš jas keičiant."
---

# Architektūra

<div class="article-intro">

Šie puslapiai yra tarpsisteminės sistemos schemos: jie aprašo, kaip pagrindinė ChurchApps sistema veikia nuo pradžios iki galo, įskaitant programėles, API modulius ir bendrąsias bibliotekas, o ne tai, kaip nustatomas atskiras projektas. Prieš keisdami sistemos elgseną, perskaitykite juos. Norėdami paleisti projektą, skaitykite [Sąranka](../setup/index.md), o galutinių taškų (endpoint) lygio nuorodai žiūrėkite [API skyrių](../api/index.md).

</div>

## Ekosistema vienu žvilgsniu

ChurchApps sudaro apie 20 nepriklausomų saugyklų (tai ne monorepo). Klientinės programėlės bendrauja su nedideliu skaičiumi backend API per HTTPS ir WebSocket ir dalijasi kodu per npm paketus, publikuojamus `@churchapps` vardų erdvėje.

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

Du struktūriniai principai, kuriais grindžiamas visas šiame skyriuje aprašytas turinys:

1. **Moduliai yra izoliuoti.** Kiekvienas Api modulis valdo savo duomenų bazę ir lenteles. Kiti moduliai ir programėlės prie jo duomenų prieina tik per jo REST galutinius taškus. Žr. [Modulio struktūra](../api/module-structure.md).
2. **Bendras kodas platinamas kaip npm paketai.** Programėlės niekada neimportuoja viena kitos šaltinio kodo. Bet kas, kas perpanaudojama, peržengia saugyklų ribas per `@churchapps/helpers`, `@churchapps/apphelper` ar `@churchapps/apihelper`. Žr. [Bendrosios bibliotekos](../shared-libraries/index.md).

## Sistemų schemos

| Puslapis | Ką apima | Apima |
|----------|----------|-------|
| [Pranešimai ir priminimai](./notifications.md) | Kaip kas nors praneša asmeniui kažką: dvi siuntimo „durys“, kanalų eskalavimo grandinė ir priminimų variklis | Api (messaging), B1Admin, B1App |
| [Realaus laiko architektūra](../realtime.md) | WebSocket pristatymo sistema, kuri palaiko pokalbius, buvimo rodymą ir pristatymą programėlėje | Api (messaging), visos web programėlės |
| [Web Push pranešimai](../web-push.md) | Naršyklės push kanalas: VAPID raktai, prenumeratų saugojimas, pristatymas | Api (messaging), visos web programėlės |
| [Aukojimai](./giving.md) | Mokėjimo teikėjai ir šliuzai, aukojimų srautai, fondai ir partijos, šliuzų webhook'ai | Api (giving), apphelper, B1App, B1Admin |
| [Renginių registracijos](./registrations.md) | Registracijos komercinis modelis: dalyvių tipai, pasirinkimai, nuolaidų kodai, mokėjimai per aukojimų šliuzą ir laukiamųjų sąrašas | Api (content + giving), B1App, B1Admin |
| [Atvykimo registracija](./check-ins.md) | Kioskų ir savitarnos atvykimo registracija, lankomumo duomenų modelis, kambarių maršrutizavimas, vaikų saugumo sluoksnis, etikečių spausdinimas | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Svetainių kūrėjas](./website-builder.md) | Puslapių, skyrių ir elementų medis, elementų tipo sutartis ir atvaizdavimo komponentai, tinklaraštis, prieigos apribotos puslapiai, SEO ir DI generavimas | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Svetainių maršrutizavimas ir kelios svetainės](./websites.md) | Kaip užklausa nukreipiama į bažnyčią ir konkrečią svetainę, kelių svetainių `siteId` duomenų modelis ir Caddy pasirinktinių domenų kraštas | B1App, Api (membership + content), B1Admin |
| [Integracijos](./integrations.md) | Plėtinių paviršius: OAuth, API raktai, webhook'ai, turinio teikėjai, MCP | Api, bendrosios bibliotekos, išorinės programėlės |
| [Audito žurnalas ir atšaukiami paketai](./audit-log.md) | Pagal numatytuosius nustatymus įjungtas kiekvieno pakeitimo auditas kontrolerio kontrolės taške ir paketų sluoksnis, leidžiantis atšaukti importus ir masinius veiksmus | Api (visi moduliai), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Mokama saugyklos ir SMS kreditų paslauga: bendru JWT pagrindu grindžiama tapatybė, S2S su paslaugos raktu, SMS ir saugyklos teikėjų sąsajos, Stripe atsiskaitymai | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper paketai, B1Admin |
| [Savo saugykla (BYOS)](./byos-storage.md) | Bažnyčios susieja Google Drive, Dropbox, OneDrive ar S3 suderinamą saugyklą įkėlimams, viršijantiems nemokamus 100 MB: OAuth prijungimas, kiekvieno teikėjo įkėlimo formos, viešas atsisiuntimo peradresavimas | Api (content + membership), helpers/apphelper paketai, B1Admin, B1App |
| [Turinio bendrija](./commons.md) | Bendras turto ir pateikimų pagrindas, kuriuo remiasi produktų ribas peržengiantis vartotojų sukurtas turinys, ir vienintelė tik darbuotojams skirta moderavimo eilė B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Kai pakeitimas keičia vienos iš šių sistemų veikimą, o ne tik puslapį viename iš programėlių, atitinkama sistemos schema čia turi būti atnaujinta tuo pačiu darbu. Tai išlaiko šį skyrių patikimu pirmuoju šaltiniu naujiems prisidedantiems asmenims.
:::

## Pasiūlymai

Šiuose dokumentuose aprašomi siūlomi darbai peržiūrai, o ne esamas produkto elgesys.

| Pasiūlymas | Ką apima |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Bažnyčiai priklausanti paskyra, raktai, paslauga ir telefono numeris; integracijos apimtis, sutikimas, pristatymas, įvertinimai ir išleidimo patikros |
| [Twilio bažnyčios įtraukimo juodraštis](./twilio-byok-onboarding-draft.md) | Siūlomi B1 registracijos formos nustatymai, bažnyčiai specifiniai kampanijų pavyzdžiai ir patvirtinimo bei veiklos kontroliniai sąrašai |
