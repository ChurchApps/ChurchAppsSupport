---
title: "Arkitektur"
description: "Systemkartor över flera repositorier som visar hur gåvor, incheckningar, notifikationer och webbplatser fungerar i B1 Admin, B1.church och Api innan du ändrar dem."
---

# Arkitektur

<div class="article-intro">

Dessa sidor är systemkartor över flera repositorier: de dokumenterar hur ett centralt ChurchApps-system fungerar från början till slut, över apparna, API-modulerna och de delade biblioteken, snarare än hur ett enskilt projekt är konfigurerat. Läs dem innan du ändrar ett systems beteende. Läs [Installation](../setup/index.md) för att få ett projekt igång och [API-avsnittet](../api/index.md) för referens på endpoint-nivå.

</div>

## Ekosystemet i korthet

ChurchApps består av ~20 oberoende repositorier (inte en monorepo). Klientappar kommunicerar med ett litet antal backend-API:er över HTTPS och WebSocket, och delar kod via npm-paket publicerade under scopet `@churchapps`.

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

Två strukturella regler styr allt som dokumenteras i det här avsnittet:

1. **Modulerna är isolerade.** Varje Api-modul äger sin databas och sina tabeller. Andra moduler och appar når dess data endast via dess REST-endpoints. Se [Modulstruktur](../api/module-structure.md).
2. **Delad kod levereras som npm-paket.** Appar importerar aldrig varandras källkod. Allt som återanvänds korsar repogränser via `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delade bibliotek](../shared-libraries/index.md).

## Systemkartor

| Sida | Vad den täcker | Omfattar |
|------|----------------|----------|
| [Aviseringar & påminnelser](./notifications.md) | Hur något förmedlar information till en person: de två utskicksingångarna, eskaleringskedjan för kanaler och påminnelsemotorn | Api (messaging), B1Admin, B1App |
| [Realtidsarkitektur](../realtime.md) | WebSocket-leveransramverket bakom chatt, närvaro och leverans i appen | Api (messaging), alla webbappar |
| [Webbpush-notifikationer](../web-push.md) | Webbläsarens pushkanal: VAPID-nycklar, lagring av prenumerationer, leverans | Api (messaging), alla webbappar |
| [Gåvor](./giving.md) | Betalningsleverantörer och gateways, gåvoflöden, fonder/batcher, gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Eventregistreringar](./registrations.md) | Registreringsmodellen för kommers: deltagartyper, val, rabattkoder, betalningar via gåvogatewayen och väntelistan | Api (content + giving), B1App, B1Admin |
| [Incheckningar](./check-ins.md) | Kiosk- och självincheckning, närvarodatamodellen, rumsrouting, barnsäkerhetslagret, etikettutskrift | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Webbplatsbyggaren](./website-builder.md) | Sid-/sektions-/elementträdet, kontraktet för elementtyper och renderare, blogg, åtkomstskyddade sidor, SEO och AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Webbplatsrouting & flera webbplatser](./websites.md) | Hur en förfrågan kopplas till en kyrka och en specifik webbplats, datamodellen för flera webbplatser med `siteId` och Caddy-kantnoden för egna domäner | B1App, Api (membership + content), B1Admin |
| [Integrationer](./integrations.md) | Utökningsytan: OAuth, API-nycklar, webhooks, innehållsleverantörer, MCP | Api, delade bibliotek, externa appar |
| [Granskningslogg & ångringsbara batcher](./audit-log.md) | Standardaktiverad granskning av varje ändring vid controllerns kontrollpunkt, och batchlagret som gör importer och massåtgärder ångringsbara | Api (alla moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Den betalda tjänsten för lagring och SMS-krediter: delad JWT-identitet, S2S med tjänstnyckel, leverantörsgränssnitten för SMS och lagring, Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-paket, B1Admin |
| [Egen lagring (BYOS)](./byos-storage.md) | Kyrkor kopplar Google Drive, Dropbox, OneDrive eller en S3-kompatibel bucket för uppladdningar över de kostnadsfria 100 MB: OAuth-anslutning, uppladdningsformat per leverantör, den offentliga nedladdningsomdirigeringen | Api (content + membership), helpers/apphelper-paket, B1Admin, B1App |
| [Content Commons](./commons.md) | Den delade tillgångs- och inlämningsstrukturen bakom användargenererat innehåll över produkter, och den enda modereringskön för endast personal i B1Admin Server Admin | Api (commons-modulen), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
När en ändring påverkar hur ett av dessa system fungerar, inte bara en sida i en enskild app, bör motsvarande systemkarta här uppdateras i samma arbete. Det håller det här avsnittet tillförlitligt som första stopp för nya bidragsgivare.
:::

## Förslag

Dessa dokument beskriver föreslaget arbete för granskning, snarare än tillgängligt produktbeteende.

| Förslag | Vad den täcker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Kyrkans egna konto, nycklar, tjänst och telefonnummer; integrationens omfattning, samtycke, leverans, uppskattningar och släppkontroller |
| [Twilio-utkast för kyrkans onboarding](./twilio-byok-onboarding-draft.md) | Föreslagna inställningar för B1:s registreringsformulär, kyrkspecifika kampanjexempel och checklistor för godkännande och drift |
