---
title: "Architektura"
description: "Mapy systémů napříč repozitáři, které ukazují, jak dary, check-iny, oznámení a weby fungují napříč B1 Admin, B1.church a Api, než něco změníte."
---

# Architektura

<div class="article-intro">

Tyto stránky jsou mapy systémů napříč repozitáři: popisují, jak základní systém ChurchApps funguje od začátku do konce, napříč aplikacemi, moduly API a sdílenými knihovnami, a ne jak je nastaven jednotlivý projekt. Před změnou chování systému si je přečtěte. [Nastavení](../setup/index.md) vám pomůže spustit projekt a [sekce API](../api/index.md) slouží jako referenční přehled endpointů.

</div>

## Ekosystém na první pohled

ChurchApps je přibližně 20 nezávislých repozitářů (nikoli monorepo). Klientské aplikace komunikují s malou sadou backendových API přes HTTPS a WebSocket a sdílejí kód prostřednictvím npm balíčků publikovaných pod scope `@churchapps`.

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

Dvě strukturální pravidla formují vše, co je v této sekci popsáno:

1. **Moduly jsou izolované.** Každý modul API vlastní svou databázi a své tabulky; ostatní moduly a aplikace se k jeho datům dostanou pouze přes jeho REST endpointy. Viz [Struktura modulu](../api/module-structure.md).
2. **Sdílený kód se distribuuje jako npm balíčky.** Aplikace nikdy neimportují zdrojový kód jedna druhé; cokoli znovupoužitelného přechází hranice repozitářů přes `@churchapps/helpers`, `@churchapps/apphelper` nebo `@churchapps/apihelper`. Viz [Sdílené knihovny](../shared-libraries/index.md).

## Mapy systémů

| Stránka | Co pokrývá | Zasahuje |
|------|----------------|-------|
| [Oznámení a připomínky](./notifications.md) | Jak cokoli sdělí osobě zprávu: dvě odesílací brány, řetězec eskalace kanálů a engine připomínek | Api (messaging), B1Admin, B1App |
| [Architektura v reálném čase](../realtime.md) | Framework pro doručování přes WebSocket, na kterém stojí chat, přítomnost a doručování v aplikaci | Api (messaging), všechny webové aplikace |
| [Webové push notifikace](../web-push.md) | Kanál push notifikací v prohlížeči: klíče VAPID, ukládání odběrů, doručování | Api (messaging), všechny webové aplikace |
| [Dary](./giving.md) | Platební poskytovatelé a brány, toky darů, fondy a dávky, webhooky bran | Api (giving), apphelper, B1App, B1Admin |
| [Registrace na akce](./registrations.md) | Model registrací na akce: typy účastníků, výběry, slevové kódy, platby přes bránu darů a čekací listina | Api (content + giving), B1App, B1Admin |
| [Check-iny](./check-ins.md) | Check-in na kiosku i samoobslužný check-in, datový model docházky, směrování do místností, vrstva ochrany dětí, tisk štítků | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Tvorba webu](./website-builder.md) | Strom stránek, sekcí a prvků, kontrakt typů prvků a renderery, blog, stránky s přístupem omezeným na skupiny, SEO a generování pomocí AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Směrování webů a více webů](./websites.md) | Jak se požadavek přiřadí ke konkrétnímu kostelu a konkrétnímu webu, datový model více webů se `siteId` a okrajová vrstva Caddy pro vlastní domény | B1App, Api (membership + content), B1Admin |
| [Integrace](./integrations.md) | Rozšiřitelná plocha: OAuth, klíče API, webhooky, poskytovatelé obsahu, MCP | Api, sdílené knihovny, externí aplikace |
| [Auditní log a dávky s možností vrácení](./audit-log.md) | Výchozí auditování každé změny v bodu řízení kontroleru a vrstva dávek, která umožňuje vrátit importy a hromadné akce zpět | Api (všechny moduly), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Placená služba pro úložiště a kredity na SMS: identita přes sdílený JWT, S2S s servisním klíčem, rozhraní poskytovatelů SMS a úložiště, fakturace přes Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), balíčky texting/apihelper, B1Admin |
| [Vlastní úložiště](./byos-storage.md) | Kostely mohou pro nahrávání nad bezplatných 100 MB propojit Disk Google, Dropbox, OneDrive nebo bucket kompatibilní s S3: připojení přes OAuth, tvar nahrávání pro jednotlivé poskytovatele, veřejné přesměrování pro stahování | Api (content + membership), balíčky helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | Sdílená páteř aktiv a příspěvků pro uživatelský obsah napříč produkty a jediná fronta moderace pro zaměstnance v Server Admin v B1Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Když změna ovlivní, jak některý z těchto systémů funguje, a ne jen stránku uvnitř jedné aplikace, je třeba ve stejné práci aktualizovat odpovídající mapu systému zde. Tím zůstane tato sekce důvěryhodným prvním místem pro nové přispěvatele.
:::

## Návrhy

Tyto dokumenty popisují navrhované práce k posouzení, nikoli dostupné chování produktu.

| Návrh | Co pokrývá |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Vlastní účet, klíče, služba a telefonní číslo kostela; rozsah integrace, souhlas, doručování, odhady a kontroly před vydáním |
| [Návrh zavedení Twilio pro kostely](./twilio-byok-onboarding-draft.md) | Navrhovaná nastavení registračního formuláře v B1, příklady kampaní pro konkrétní kostely a kontrolní seznamy pro schválení a provoz |
