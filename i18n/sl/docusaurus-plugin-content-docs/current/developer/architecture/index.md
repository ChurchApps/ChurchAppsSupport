---
title: "Arhitektura"
description: "Sistemski zemljevidi, ki prikazujejo, kako darovanje, prijave, obvestila in spletna mesta delujejo v B1 Admin, B1.church in API-ju, preden jih spremenite."
---

# Arhitektura

<div class="article-intro">

Te strani so sistemski zemljevidi, ki segajo čez več repozitorijev. Opisujejo, kako ključni sistemi ChurchApps delujejo od začetka do konca, prek aplikacij, API modulov in skupnih knjižnic, ne pa, kako je nastavljen posamezen projekt. Preberite jih, preden spremenite delovanje sistema. Za zagon projekta preberite [Nastavitev](../setup/index.md), za podrobno referenco končnih točk pa [razdelek API](../api/index.md).

</div>

## Ekosistem na prvi pogled

ChurchApps obsega približno 20 neodvisnih repozitorijev (ne monorepo). Odjemalske aplikacije prek HTTPS in WebSocket komunicirajo z majhnim naborom zalednih API-jev, kodo pa si delijo prek npm paketov, objavljenih pod imenskim prostorom `@churchapps`.

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

Dve strukturni pravili oblikujeta vse, kar je dokumentirano v tem razdelku:

1. **Moduli so izolirani.** Vsak modul API-ja upravlja s svojo podatkovno bazo in tabelami. Drugi moduli in aplikacije do njegovih podatkov dostopajo le prek njegovih REST končnih točk. Glejte [Struktura modula](../api/module-structure.md).
2. **Skupna koda se distribuira kot npm paketi.** Aplikacije nikoli ne uvažajo izvorne kode druga druge. Vse, kar se ponovno uporablja, prečka meje repozitorijev prek `@churchapps/helpers`, `@churchapps/apphelper` ali `@churchapps/apihelper`. Glejte [Skupne knjižnice](../shared-libraries/index.md).

## Sistemski zemljevidi

| Stran | Kaj zajema | Obsega |
|------|----------------|-------|
| [Obvestila in opomniki](./notifications.md) | Kako sistem komu sporoči informacijo: dve vstopni točki za pošiljanje, veriga eskalacije kanalov in motor opomnikov | Api (messaging), B1Admin, B1App |
| [Arhitektura v realnem času](../realtime.md) | Ogrodje za dostavo prek WebSocket, na katerem temeljita klepet in prisotnost ter dostava znotraj aplikacije | Api (messaging), vse spletne aplikacije |
| [Potisna obvestila v brskalniku](../web-push.md) | Kanal potisnih obvestil v brskalniku: VAPID ključi, shranjevanje naročnin, dostava | Api (messaging), vse spletne aplikacije |
| [Darovanja](./giving.md) | Ponudniki plačil in prehodi, tokovi donacij, skladi in serije, webhooki prehodov | Api (giving), apphelper, B1App, B1Admin |
| [Prijave na dogodke](./registrations.md) | Model prijav na dogodke: vrste udeležencev, izbire, kode popustov, plačila prek prehoda za darovanja ter čakalna lista | Api (content + giving), B1App, B1Admin |
| [Prijave](./check-ins.md) | Prijava na kiosku in samoprijava, podatkovni model prisotnosti, usmerjanje po sobah, plast za varnost otrok, tiskanje nalepk | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Gradnik spletnih strani](./website-builder.md) | Drevo strani, razdelkov in elementov, pogodba o tipih elementov in upodabljalniki, blog, strani z omejenim dostopom, SEO in generiranje z AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Usmerjanje spletnih strani in več spletnih mest](./websites.md) | Kako zahteva doseže cerkev in določeno spletno mesto, podatkovni model več spletnih mest z `siteId` ter robni strežnik Caddy za domene po meri | B1App, Api (membership + content), B1Admin |
| [Integracije](./integrations.md) | Razširitvena površina: OAuth, API ključi, webhooki, ponudniki vsebin, MCP | Api, skupne knjižnice, zunanje aplikacije |
| [Dnevnik sprememb in razveljavljive serije](./audit-log.md) | Privzeto vključeno beleženje vsake spremembe na nadzorni točki krmilnika ter plast serij, ki omogoča razveljavitev uvozov in množičnih dejanj | Api (vsi moduli), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Plačljiva storitev shranjevanja in kreditov za SMS: identiteta prek deljenega JWT, S2S prek servisnih ključev, vmesniki ponudnikov za SMS in shranjevanje, obračunavanje prek Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paketi texting/apihelper, B1Admin |
| [Lastno shranjevanje (BYOS)](./byos-storage.md) | Cerkve povežejo Google Drive, Dropbox, OneDrive ali S3-združljiv bucket za nalaganja nad brezplačnih 100 MB: povezava OAuth, oblike nalaganja po ponudnikih, javna preusmeritev prenosov | Api (content + membership), paketi helpers/apphelper, B1Admin, B1App |
| [Skupna vsebina](./commons.md) | Skupna hrbtenica sredstev in prispevkov, na kateri temelji uporabniško ustvarjena vsebina med izdelki, ter ena sama čakalna vrsta za moderiranje, dostopna samo osebju v B1Admin Server Admin | Api (modul commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Ko sprememba spremeni delovanje enega od teh sistemov, ne le strani znotraj ene aplikacije, je treba ustrezen sistemski zemljevid tukaj posodobiti v istem delu. Tako ostane ta razdelek zanesljiv prvi vir za nove sodelavce.
:::

## Predlogi

Ti dokumenti opisujejo predlagano delo za pregled, ne razpoložljivega delovanja izdelka.

| Predlog | Kaj zajema |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Cerkveni račun, ključi, storitev in telefonska številka; obseg integracije, soglasje, dostava, ocene in preverjanja pred izdajo |
| [Osnutek uvajanja cerkva v Twilio](./twilio-byok-onboarding-draft.md) | Predlagane nastavitve obrazca za prijavo v B1, primeri kampanij za posamezne cerkve ter kontrolni seznami za odobritev in delovanje |
