---
title: "Architektúra"
description: "Systémové mapy naprieč repozitármi, ktoré ukazujú, ako fungujú dary, check-iny, oznámenia a webové stránky v B1 Admin, B1.church a Api, skôr než ich zmeníte."
---

# Architektúra

<div class="article-intro">

Tieto stránky sú systémové mapy naprieč repozitármi: dokumentujú, ako základný systém ChurchApps funguje od začiatku do konca, naprieč aplikáciami, modulmi API a zdieľanými knižnicami, a nie to, ako je nastavený jeden konkrétny projekt. Prečítajte si ich predtým, ako zmeníte správanie systému. Ak chcete spustiť projekt, prečítajte si [Nastavenie](../setup/index.md), a pre referenciu na úrovni endpointov [sekciu API](../api/index.md).

</div>

## Ekosystém na prvý pohľad

ChurchApps tvorí približne 20 nezávislých repozitárov (nie monorepo). Klientske aplikácie komunikujú s malou sadou backendových API cez HTTPS a WebSocket a zdieľajú kód prostredníctvom npm balíkov publikovaných v rozsahu `@churchapps`.

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

Dve štruktúrne pravidlá formujú všetko, čo je v tejto sekcii zdokumentované:

1. **Moduly sú izolované.** Každý modul Api vlastní svoju databázu a svoje tabuľky. Ostatné moduly a aplikácie sa k jeho dátam dostanú iba cez jeho REST endpointy. Pozri [Štruktúra modulu](../api/module-structure.md).
2. **Zdieľaný kód sa dodáva ako npm balíky.** Aplikácie nikdy neimportujú zdrojový kód jedna druhej. Čokoľvek opätovne použité prechádza hranicami repozitárov cez `@churchapps/helpers`, `@churchapps/apphelper` alebo `@churchapps/apihelper`. Pozri [Zdieľané knižnice](../shared-libraries/index.md).

## Systémové mapy

| Stránka | Čo pokrýva | Zasahuje |
|------|----------------|-------|
| [Oznámenia a pripomienky](./notifications.md) | Ako niečo informuje človeka: dva odosielacie vstupy, reťaz eskalácie kanálov a motor pripomienok | Api (messaging), B1Admin, B1App |
| [Architektúra reálneho času](../realtime.md) | Framework doručovania cez WebSocket za chatom, prítomnosťou a doručovaním v aplikácii | Api (messaging), všetky webové aplikácie |
| [Webové push notifikácie](../web-push.md) | Kanál webových push notifikácií v prehliadači: kľúče VAPID, ukladanie predplatných, doručovanie | Api (messaging), všetky webové aplikácie |
| [Dary](./giving.md) | Poskytovatelia platieb a brány, toky darov, fondy a dávky, webhooky brán | Api (giving), apphelper, B1App, B1Admin |
| [Registrácie na udalosti](./registrations.md) | Model obchodovania s registráciami: typy účastníkov, výbery, zľavové kódy, platby cez bránu darov a čakacia listina | Api (content + giving), B1App, B1Admin |
| [Check-iny](./check-ins.md) | Kiosk a samoobslužný check-in, dátový model účasti, smerovanie do miestností, vrstva ochrany detí, tlač štítkov | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Tvorca webov](./website-builder.md) | Strom stránok, sekcií a prvkov, zmluva o type prvku a renderery, blog, stránky s prístupom, SEO a generovanie pomocou AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Smerovanie webov a viacero stránok](./websites.md) | Ako sa požiadavka priradí k cirkvi a konkrétnej stránke, dátový model viacerých stránok so `siteId` a okrajová vrstva Caddy pre vlastné domény | B1App, Api (membership + content), B1Admin |
| [Integrácie](./integrations.md) | Rozširujúca plocha: OAuth, API kľúče, webhooky, poskytovatelia obsahu, MCP | Api, zdieľané knižnice, externé aplikácie |
| [Auditný záznam a vratné dávky](./audit-log.md) | Predvolené auditovanie každej mutácie na kontrolnom bode kontrolérov a vrstva dávok, vďaka ktorej sú importy a hromadné akcie vratné | Api (všetky moduly), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Platená služba úložiska a kreditov na SMS: identita cez zdieľaný JWT, S2S cez service-key, rozhrania poskytovateľov SMS a úložiska, fakturácia cez Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), balíky texting/apihelper, B1Admin |
| [Vlastné úložisko (BYOS)](./byos-storage.md) | Cirkvi prepájajú Google Drive, Dropbox, OneDrive alebo S3-kompatibilný bucket pre nahrávanie nad bezplatných 100 MB: pripojenie OAuth, tvary nahrávania pre jednotlivých poskytovateľov, verejné presmerovanie na stiahnutie | Api (content + membership), balíky helpers/apphelper, B1Admin, B1App |
| [Zdieľaný obsah (Content Commons)](./commons.md) | Zdieľaná chrbtica assetov a príspevkov pre používateľský obsah naprieč produktmi a jediný moderačný front len pre zamestnancov v B1Admin Server Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Keď zmena mení, ako funguje jeden z týchto systémov, a nie len stránka v jednej aplikácii, príslušná systémová mapa sa má aktualizovať v rovnakom kroku. Tak zostane táto sekcia dôveryhodným prvým zdrojom pre nových prispievateľov.
:::

## Návrhy

Tieto dokumenty opisujú navrhovanú prácu na posúdenie, a nie dostupné správanie produktu.

| Návrh | Čo pokrýva |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Účet, kľúče, služba a telefónne číslo vo vlastníctve cirkvi; rozsah integrácie, súhlas, doručovanie, odhady a kontroly pred vydaním |
| [Návrh zavedenia cirkví pre Twilio](./twilio-byok-onboarding-draft.md) | Navrhované nastavenia registračného formulára B1, príklady kampaní pre konkrétne cirkvi a kontrolné zoznamy schválenia a prevádzky |
