---
title: "Architektura"
---

# Architektura

<div class="article-intro">

Tyto stránky jsou mapy systémů napříč repozitáři: popisují, jak základní systém ChurchApps funguje od začátku do konce, přes aplikace, moduly API a sdílené knihovny. Nepopisují, jak nastavit jednotlivý projekt. Přečtěte si je, než změníte chování některého systému. [Nastavení](../setup/) vám pomůže spustit projekt a [sekce API](../api/) slouží jako referenční přehled na úrovni endpointů.

</div>

## Ekosystém na první pohled

ChurchApps tvoří přibližně 20 nezávislých repozitářů (nejde o monorepo). Klientské aplikace komunikují s malou sadou backendových API přes HTTPS a WebSocket a sdílejí kód prostřednictvím balíčků npm publikovaných pod oborem `@churchapps`.

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

Dvě strukturální pravidla určují vše, co je v této sekci popsáno:

1. **Moduly jsou izolované.** Každý modul Api vlastní svou databázi a své tabulky. Ostatní moduly a aplikace se k jeho datům dostanou pouze přes jeho REST endpointy. Viz [Struktura modulu](../api/module-structure).
2. **Sdílený kód se distribuuje jako balíčky npm.** Aplikace nikdy neimportují zdrojový kód jedna druhé. Cokoli znovupoužitelného přechází hranice repozitářů přes `@churchapps/helpers`, `@churchapps/apphelper` nebo `@churchapps/apihelper`. Viz [Sdílené knihovny](../shared-libraries/).

## Mapy systémů

| Stránka | Co pokrývá | Oblast |
|------|----------------|-------|
| [Oznámení a připomínky](./notifications) | Jak něco sdělí člověku: dvě odesílací brány, eskalační řetězec kanálů a engine připomínek | Api (messaging), B1Admin, B1App |
| [Architektura v reálném čase](../realtime) | Framework pro doručování přes WebSocket, na kterém stojí chat, přítomnost a doručování v aplikaci | Api (messaging), všechny webové aplikace |
| [Webová push oznámení](../web-push) | Kanál webových push oznámení: klíče VAPID, ukládání odběrů, doručování | Api (messaging), všechny webové aplikace |
| [Dary](./giving) | Poskytovatelé plateb a brány, toky darů, fondy a dávky, webhooky bran | Api (giving), apphelper, B1App, B1Admin |
| [Registrace na akce](./registrations) | Obchodní model registrací: typy účastníků, výběry, slevové kódy, platby přes bránu darů a seznam čekajících | Api (content + giving), B1App, B1Admin |
| [Check-in](./check-ins) | Check-in na kiosku i samoobslužný, datový model účasti, směrování do místností, ochranná vrstva pro děti, tisk štítků | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Tvorba webu](./website-builder) | Strom stránek, sekcí a prvků, kontrakt typů prvků a renderery, blog, stránky s přístupovým omezením, SEO a generování pomocí AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Směrování webu a více webů](./websites) | Jak se požadavek přiřadí ke kostelu a konkrétnímu webu, datový model více webů se `siteId` a okrajová vrstva Caddy pro vlastní domény | B1App, Api (membership + content), B1Admin |
| [Integrace](./integrations) | Rozšiřitelný povrch: OAuth, klíče API, webhooky, poskytovatelé obsahu, MCP | Api, sdílené knihovny, externí aplikace |
| [Auditní protokol a vratné dávky](./audit-log) | Výchozí auditování každé změny v jednom kontrolním bodě kontrolérů a vrstva dávek, která umožňuje vrátit importy a hromadné akce | Api (všechny moduly), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Placená služba úložiště a kreditů pro SMS: identita přes sdílený JWT, S2S se servisním klíčem, rozhraní poskytovatelů SMS a úložiště, fakturace přes Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), balíčky texting/apihelper, B1Admin |
| [Vlastní úložiště (BYOS)](./byos-storage) | Kostely propojí Google Drive, Dropbox, OneDrive nebo S3-kompatibilní bucket pro nahrávání souborů nad rámec bezplatných 100 MB: připojení přes OAuth, tvary nahrávání pro jednotlivé poskytovatele, veřejné přesměrování pro stahování | Api (content + membership), balíčky helpers/apphelper, B1Admin, B1App |
| [Sdílený obsah](./commons) | Sdílená páteř aktiv a příspěvků za uživatelský obsah napříč produkty a jediná fronta moderování pro pracovníky v sekci Server Admin v B1Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Když změna ovlivní, jak některý z těchto systémů funguje (nejen stránku uvnitř jedné aplikace), měla by být odpovídající mapa systému zde aktualizována ve stejném kroku. Tím zůstane tato sekce důvěryhodným prvním zdrojem pro nové přispěvatele.
:::

## Návrhy

Tyto dokumenty popisují navrhovanou práci k posouzení, nikoli dostupné chování produktu.

| Návrh | Co pokrývá |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Účet, klíče, služba a telefonní číslo ve vlastnictví kostela; rozsah integrace, souhlas, doručování, odhady a kontroly před vydáním |
| [Koncept zavádění kostelů pro Twilio](./twilio-byok-onboarding-draft) | Navrhovaná nastavení registračního formuláře B1, příklady kampaní pro konkrétní kostely a kontrolní seznamy pro schválení a provoz |
