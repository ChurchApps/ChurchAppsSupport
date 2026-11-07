---
title: "Arkitektur"
---

# Arkitektur

<div class="article-intro">

Dessa sidor är systemkartor över hela ekosystemet. De beskriver hur ett centralt ChurchApps-system fungerar från början till slut, över apparna, API-modulerna och de delade biblioteken, snarare än hur ett enskilt projekt konfigureras. Läs dem innan du ändrar hur ett system beter sig. Läs [Installation](../setup/) för att få igång ett projekt och [API-avsnittet](../api/) för referens på endpoint-nivå.

</div>

## Ekosystemet i korthet

ChurchApps består av ungefär 20 oberoende repositories (inte en monorepo). Klientappar kommunicerar med ett litet antal backend-API:er över HTTPS och WebSocket och delar kod via npm-paket som publiceras under scopet `@churchapps`.

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

Två strukturella regler styr allt som dokumenteras i det här avsnittet:

1. **Moduler är isolerade.** Varje Api-modul äger sin databas och sina tabeller. Andra moduler och appar når dess data endast via dess REST-endpoints. Se [Modulstruktur](../api/module-structure).
2. **Delad kod distribueras som npm-paket.** Appar importerar aldrig varandras källkod. Allt som återanvänds korsar repository-gränser via `@churchapps/helpers`, `@churchapps/apphelper` eller `@churchapps/apihelper`. Se [Delade bibliotek](../shared-libraries/).

## Systemkartor

| Sida | Vad den täcker | Omfattar |
|------|----------------|----------|
| [Aviseringar och påminnelser](./notifications) | Hur något meddelar en person: de två utskickskanalerna, eskaleringskedjan för kanaler och påminnelsemotorn | Api (messaging), B1Admin, B1App |
| [Realtidsarkitektur](../realtime) | WebSocket-leveransramverket bakom chatt, närvaro och leverans i appen | Api (messaging), alla webbappar |
| [Webbpush-notiser](../web-push) | Webbläsarens pushkanal: VAPID-nycklar, lagring av prenumerationer, leverans | Api (messaging), alla webbappar |
| [Givande](./giving) | Betalningsleverantörer och gateways, donationsflöden, fonder och batcher, gateway-webhooks | Api (giving), apphelper, B1App, B1Admin |
| [Eventregistreringar](./registrations) | Modellen för registreringshandel: deltagartyper, val, rabattkoder, betalningar via givande-gatewayen och väntelistan | Api (content + giving), B1App, B1Admin |
| [Incheckningar](./check-ins) | Incheckning vid kiosk och själv-incheckning, datamodellen för närvaro, rumsroutning, barnsäkerhetslagret och utskrift av etiketter | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Webbplatsbyggaren](./website-builder) | Trädet med sidor, sektioner och element, elementtypernas kontrakt och renderare, blogg, åtkomststyrda sidor, SEO och AI-generering | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Webbplatsroutning och flera webbplatser](./websites) | Hur en förfrågan kopplas till en kyrka och en specifik webbplats, datamodellen för `siteId` med flera webbplatser och Caddy-kantservern för egna domäner | B1App, Api (membership + content), B1Admin |
| [Integrationer](./integrations) | Tilläggsytan: OAuth, API-nycklar, webhooks, innehållsleverantörer och MCP | Api, delade bibliotek, externa appar |
| [Granskningslogg och ångringsbara batcher](./audit-log) | Standardaktiverad granskning av varje ändring vid controller-flaskhalsen, och batchlagret som gör importer och massåtgärder ångringsbara | Api (alla moduler), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Den betalda tjänsten för lagring och SMS-krediter: identitet via delad JWT, S2S med tjänstnyckel, leverantörsgränssnitten för SMS och lagring samt Stripe-fakturering | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper-paket, B1Admin |
| [Egen lagring](./byos-storage) | Kyrkor kopplar Google Drive, Dropbox, OneDrive eller en S3-kompatibel bucket för uppladdningar utöver de kostnadsfria 100 MB: OAuth-anslutning, uppladdningsformat per leverantör och den offentliga nedladdningsomdirigeringen | Api (content + membership), helpers/apphelper-paket, B1Admin, B1App |
| [Content Commons](./commons) | Den delade ryggraden för tillgångar och inlämningar bakom användargenererat innehåll över produkter, och den enda moderationskön för endast personal i B1Admin Server Admin | Api (commons-modul), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
När en ändring påverkar hur ett av dessa system fungerar, inte bara en sida i en app, ska motsvarande systemkarta här uppdateras i samma arbete. Det håller det här avsnittet tillförlitligt som första stopp för nya bidragsgivare.
:::

## Förslag

Dessa dokument beskriver föreslaget arbete för granskning snarare än tillgängligt produktbeteende.

| Förslag | Vad det täcker |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | Kyrkans egna konto, nycklar, tjänst och telefonnummer; integrationens omfattning, samtycke, leverans, uppskattningar och kontroller inför lansering |
| [Utkast till Twilio-onboarding för kyrkor](./twilio-byok-onboarding-draft) | Föreslagna inställningar för B1:s registreringsformulär, kyrkspecifika exempel på kampanjer och checklistor för godkännande och drift |
