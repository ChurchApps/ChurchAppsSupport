---
title: "Architektúra"
---

# Architektúra

<div class="article-intro">

Tieto stránky sú systémové prehľady naprieč repozitármi. Popisujú, ako základné systémy ChurchApps fungujú od začiatku do konca, naprieč aplikáciami, modulmi API a zdieľanými knižnicami. Nepopisujú, ako nastaviť jeden konkrétny projekt. Pred zmenou správania systému si ich prečítajte. Ak chcete spustiť projekt, pozrite si [Inštalácia](../setup/), a ak hľadáte referenciu na úrovni endpointov, pozrite si [sekciu API](../api/).

</div>

## Ekosystém na prvý pohľad

ChurchApps má približne 20 nezávislých repozitárov (nejde o monorepo). Klientské aplikácie komunikujú s malou sadou backendových API cez HTTPS a WebSocket a zdieľajú kód prostredníctvom npm balíkov publikovaných pod rozsahom `@churchapps`.

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

Dve štrukturálne pravidlá určujú všetko, čo je v tejto sekcii zdokumentované:

1. **Moduly sú izolované.** Každý modul Api vlastní svoju databázu a svoje tabuľky. Ostatné moduly a aplikácie sa k jeho dátam dostanú len cez jeho REST endpointy. Pozri [Štruktúra modulu](../api/module-structure).
2. **Zdieľaný kód sa distribuuje ako npm balíky.** Aplikácie nikdy neimportujú zdrojový kód jedna druhej. Všetko, čo sa opätovne používa, prechádza hranicami repozitárov cez `@churchapps/helpers`, `@churchapps/apphelper` alebo `@churchapps/apihelper`. Pozri [Zdieľané knižnice](../shared-libraries/).

## Systémové prehľady

| Stránka | Čo pokrýva | Zasahuje |
|------|----------------|-------|
| [Oznámenia a pripomienky](./notifications) | Ako sa človeku niečo oznámi: dva odosielacie vstupy, reťaz eskalácie kanálov a motor pripomienok | Api (messaging), B1Admin, B1App |
| [Architektúra v reálnom čase](../realtime) | Framework doručovania cez WebSocket, na ktorom stoja chat, prítomnosť a doručovanie v aplikácii | Api (messaging), všetky webové aplikácie |
| [Webové push oznámenia](../web-push) | Push kanál v prehliadači: kľúče VAPID, ukladanie odberov a doručovanie | Api (messaging), všetky webové aplikácie |
| [Dary](./giving) | Poskytovatelia platieb a brány, toky darov, fondy a dávky, webhooky brán | Api (giving), apphelper, B1App, B1Admin |
| [Registrácie na podujatia](./registrations) | Model obchodovania s registráciami: typy účastníkov, výbery, zľavové kódy, platby cez bránu darov a čakacia listina | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Check-in na kiosku a samoobslužný check-in, dátový model účasti, smerovanie do miestností, vrstva ochrany detí, tlač štítkov | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Tvorca webových stránok](./website-builder) | Strom stránok, sekcií a prvkov, zmluva typov prvkov a renderery, blog, stránky s prístupovým obmedzením, SEO a generovanie pomocou AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Smerovanie webu a viac webov](./websites) | Ako sa požiadavka priradí k cirkvi a konkrétnej webovej stránke, dátový model viacerých webov so `siteId` a okrajová vrstva Caddy pre vlastné domény | B1App, Api (membership + content), B1Admin |
| [Integrácie](./integrations) | Rozširujúca plocha: OAuth, API kľúče, webhooky, poskytovatelia obsahu, MCP | Api, zdieľané knižnice, externé aplikácie |
| [Auditný záznam a dávky s možnosťou vrátenia](./audit-log) | Predvolene zapnutý audit každej zmeny v kontrolnom bode radiča a vrstva dávok, vďaka ktorej sa importy a hromadné akcie dajú vrátiť späť | Api (všetky moduly), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Platená služba úložiska a kreditov na SMS: identita cez zdieľaný JWT, S2S so servisným kľúčom, rozhrania poskytovateľov SMS a úložiska, fakturácia cez Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), balíky texting/apihelper, B1Admin |
| [Vlastné úložisko](./byos-storage) | Cirkvi môžu pripojiť Google Drive, Dropbox, OneDrive alebo S3-kompatibilný bucket na nahrávanie súborov nad bezplatný limit 100 MB: pripojenie cez OAuth, nahrávanie pre jednotlivých poskytovateľov, verejné presmerovanie na stiahnutie | Api (content + membership), balíky helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons) | Zdieľaná kostra aktív a odoslaní, na ktorej stojí používateľský obsah naprieč produktmi, a jediný moderátorský front pre zamestnancov v B1Admin Server Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Keď zmena mení spôsob fungovania niektorého z týchto systémov, nielen stránky v jednej aplikácii, mal by sa v rovnakom kroku aktualizovať aj zodpovedajúci systémový prehľad. Tak táto sekcia zostane dôveryhodným prvým zdrojom pre nových prispievateľov.
:::

## Návrhy

Tieto dokumenty opisujú navrhovanú prácu na posúdenie, nie dostupné správanie produktu.

| Návrh | Čo pokrýva |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Účet vo vlastníctve cirkvi, kľúče, služba a telefónne číslo; rozsah integrácie, súhlas, doručovanie, odhady a kontroly pred vydaním |
| [Návrh onboardingu Twilio pre cirkvi](./twilio-byok-onboarding-draft) | Navrhované nastavenia prihlasovacieho formulára B1, príklady kampaní pre konkrétne cirkvi a kontrolné zoznamy na schvaľovanie a prevádzku |
