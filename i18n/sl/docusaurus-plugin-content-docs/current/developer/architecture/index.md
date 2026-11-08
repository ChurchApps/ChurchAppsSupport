---
title: "Arhitektura"
description: "Sistemske karte čez več repozitorijev, ki prikazujejo, kako delujejo darovanja, prijave, obvestila in spletna mesta v B1 Admin, B1.church in Api, preden jih spremenite."
---

# Arhitektura

<div class="article-intro">

Te strani so sistemske karte čez več repozitorijev: opisujejo, kako deluje ključni sistem ChurchApps od začetka do konca – čez aplikacije, module API-ja in skupne knjižnice – ne pa, kako je nastavljen posamezen projekt. Preberite jih, preden spremenite vedenje sistema; če želite zagnati projekt, preberite [Nastavitev](../setup/index.md), za podrobnosti o končnih točkah pa [razdelek o API-ju](../api/index.md).

</div>

## Ekosistem na prvi pogled

ChurchApps je ~20 neodvisnih repozitorijev (ne monorepo). Odjemalske aplikacije komunicirajo z manjšim naborom zalednih API-jev prek HTTPS in WebSocket, kodo pa si delijo prek paketov npm, objavljenih pod obsegom `@churchapps`.

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

Dve strukturni pravili oblikujeta vse, kar je dokumentirano v tem razdelku:

1. **Moduli so med seboj izolirani.** Vsak modul API-ja je lastnik svoje baze podatkov in svojih tabel; drugi moduli in aplikacije do njegovih podatkov dostopajo le prek njegovih REST končnih točk. Glejte [Zgradba modula](../api/module-structure.md).
2. **Skupna koda je dostavljena kot paketi npm.** Aplikacije nikoli ne uvažajo izvorne kode druga druge; vse, kar se ponovno uporablja, prečka meje repozitorijev prek `@churchapps/helpers`, `@churchapps/apphelper` ali `@churchapps/apihelper`. Glejte [Skupne knjižnice](../shared-libraries/index.md).

## Sistemske karte

| Stran | Kaj zajema | Obsega |
|------|----------------|-------|
| [Obvestila in opomniki](./notifications.md) | Kako nekaj sporoči osebi: dva načina pošiljanja, veriga stopnjevanja kanalov in mehanizem opomnikov | Api (messaging), B1Admin, B1App |
| [Arhitektura v realnem času](../realtime.md) | Ogrodje za dostavo prek WebSocket, na katerem temeljijo klepet, prisotnost in dostava znotraj aplikacije | Api (messaging), vse spletne aplikacije |
| [Potisna obvestila v brskalniku](../web-push.md) | Kanal potisnih obvestil v brskalniku: ključi VAPID, shranjevanje naročnin, dostava | Api (messaging), vse spletne aplikacije |
| [Darovanja](./giving.md) | Ponudniki plačil in plačilni prehodi, tokovi donacij, skladi in serije, webhooki plačilnih prehodov | Api (giving), apphelper, B1App, B1Admin |
| [Prijave na dogodke](./registrations.md) | Model poslovanja pri prijavah: vrste udeležencev, izbire, kode za popust, plačila prek plačilnega prehoda za darovanja ter čakalni seznam | Api (content + giving), B1App, B1Admin |
| [Prijave (check-in)](./check-ins.md) | Kioskna in samopostrežna prijava, podatkovni model obiskov, usmerjanje po sobah, plast za varnost otrok, tiskanje nalepk | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Gradnik spletnih strani](./website-builder.md) | Drevo strani, razdelkov in elementov, pogodba za tipe elementov in upodabljalniki, blog, strani z omejenim dostopom, SEO ter generiranje z umetno inteligenco | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Usmerjanje spletnih mest in več mest](./websites.md) | Kako zahtevek preide do cerkve in določenega mesta, podatkovni model več mest s `siteId` ter robni sloj za domene po meri v Caddyju | B1App, Api (membership + content), B1Admin |
| [Integracije](./integrations.md) | Površina za razširitve: OAuth, ključi API, webhooki, ponudniki vsebin, MCP | Api, skupne knjižnice, zunanje aplikacije |
| [Dnevnik revizij in serije, ki jih je mogoče razveljaviti](./audit-log.md) | Privzeto vklopljeno revidiranje vsake spremembe na kontrolni točki krmilnika ter plast serij, ki omogoča razveljavitev uvozov in množičnih dejanj | Api (all modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Plačana storitev shranjevanja in kreditov za pošiljanje sporočil: identiteta s skupnim JWT-jem, S2S s storitvenimi ključi, ponudniška mesta za sporočila in shranjevanje, obračunavanje prek Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paketi texting/apihelper, B1Admin |
| [Lastna shramba (BYOS)](./byos-storage.md) | Cerkve povežejo Google Drive, Dropbox, OneDrive ali vedro, združljivo s S3, za nalaganja, ki presegajo brezplačnih 100 MB: povezava OAuth, oblika nalaganja po ponudnikih, javna preusmeritev prenosa | Api (content + membership), paketi helpers/apphelper, B1Admin, B1App |
| [Skupna vsebina](./commons.md) | Skupna osnova za sredstva in predloge, ki podpira uporabniško ustvarjeno vsebino čez izdelke, ter enotna čakalna vrsta za moderiranje, dostopna samo osebju v Server Admin v B1Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Ko sprememba spremeni delovanje enega od teh sistemov – ne le strani znotraj ene aplikacije –, je treba ustrezno sistemsko karto tukaj posodobiti v istem delu. Tako ostane ta razdelek zanesljiv prvi vir za nove sodelavce.
:::

## Predlogi

Ti dokumenti opisujejo predlagano delo za pregled, ne pa obstoječega delovanja izdelka.

| Predlog | Kaj zajema |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Račun v lasti cerkve, ključi, storitev in telefonska številka; obseg integracije, soglasje, dostava, ocene in preverjanja pred izdajo |
| [Osnutek uvajanja cerkva v Twilio](./twilio-byok-onboarding-draft.md) | Predlagane nastavitve prijavnega obrazca B1, primeri kampanj, specifičnih za cerkve, ter kontrolni seznami za odobritev in delovanje |
