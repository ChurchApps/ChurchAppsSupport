---
title: "Integrasjon & Utvidelsesflate"
---

# Integrasjon & Utvidelsesflate

<div class="article-intro">

Alt en tredjepart kan plugge inn i kjøres gjennom ett API og én autorisasjonsmodell. Denne siden er kartet: den navngir hver integrasjonsflate, viser hvordan de forbinder, og lenker til den detaljerte referansen for hver. Hvis du bygger mot B1, start her for å plukke riktig dør, deretter følg lenken til siden som dokumenterer det i dybden.

</div>

## Flatene på et øyeblikk

Det er seks veier inn eller ut, og de deler alle den samme auth-laget:

- **[REST API](../api/api-keys)** — hele produktflaten, kalt med en bearer-token fra et hvilket som helst språk.
- **[API keys](../api/api-keys)** — den enkleste legitimasjonen: en `cak_…`-token bundet til en person i en kirke.
- **[OAuth 2.0 & Connected Apps](../api/connected-apps)** — per-kirke samtykke for flertenant-apper; utsteder samme JWT en bruker får.
- **[Webhooks](../api/webhooks)** — signert, varig-levert utgående hendelser.
- **[MCP server](../api/mcp)** — en AI-vendt innpakning over REST API på `/mcp`.
- **[Content providers](../freeplay-content-provider)** — inngangsstien for eksternt mediabibliotek inn i FreePlay og B1-appene.

Alt annet enn innholdsleverandører betjenes av en enkelt monolittisk API (Api-repositoriet) hvis moduler monteres under stabile basisbaner.

## Delingdelen seg auth-modell

Hver legitimasjon -- en brukers login JWT, en OAuth-tilgangtoken, eller en API-nøkkel -- løser seg til samme **Principal** og sjekkes på samme måte. Det er ingen separat "integrasjon auth"-bane; en scoped legitimasjon er ganske enkelt ikke å skille fra en lavere-privilegert bruker.

Per-kirke-scoping: `churchId` er en tokenkrav, ikke en forespørsel-parameter, slik at en legitimasjon aldri kan nå på tvers av kirker.

## Overflatereferanse

| Overflate | Auth-mekanisme | Retning | Hvor implementert | Referanse |
|---|---|---|---|---|
| REST API | `Bearer` JWT eller `cak_…` nøkkel | Innbånd | `Api/src/modules/*` | [API Keys](../api/api-keys) |
| API keys | SHA-256-hashen `cak_` token | Legitimasjon | `Api/.../membership/controllers/ApiKeyController.ts` | [API Keys](../api/api-keys) |
| OAuth 2.0 / Connected Apps | Auth kode · enhet · oppfrisk → JWT | Innbånd | `Api/.../membership/controllers/OAuthController.ts` | [Connected Apps](../api/connected-apps) |
| Webhooks | Per-hook hemmelighet, HMAC-SHA256 signatur | Utbånd | `Api/src/shared/webhooks/` | [Webhooks](../api/webhooks) |
| MCP server | `Bearer` JWT eller `cak_…` nøkkel | Innbånd (AI) | `Api/src/modules/mcp/` | [MCP Server](../api/mcp) |
| Content providers | Per-leverandør: ingen / OAuth PKCE / enhet / form | Innbånd-innhold | `Packages/content-providers/` | [Content Provider](../freeplay-content-provider) |

