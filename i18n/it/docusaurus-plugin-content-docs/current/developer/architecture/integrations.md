---
title: "Superficie di Integrazione e Estensione"
---

# Superficie di Integrazione e Estensione

<div class="article-intro">

Tutto ciò che una terza parte può collegare viene eseguito tramite un'API e un modello di autorizzazione. Questa pagina mappa ogni superficie di integrazione, mostra come si connettono e collega al riferimento dettagliato per ciascuna.

</div>

## Le Superficie a Colpo d'Occhio

Ci sono sei modi di entrare e uscire, e tutti condividono lo stesso strato di autorizzazione:

- **[REST API](../api/api-keys)** — l'intera superficie del prodotto, richiamabile con un token bearer.
- **[Chiavi API](../api/api-keys)** — la credenziale più semplice: un token `cak_…` legato a una persona in una chiesa.
- **[OAuth 2.0 e App Connesse](../api/connected-apps)** — consenso per chiesa per app multi-tenant.
- **[Webhook](../api/webhooks)** — eventi in uscita firmati, consegnati durabilmente.
- **[Server MCP](../api/mcp)** — un wrapper rivolto all'IA sull'API REST.
- **[Provider di Contenuto](../freeplay-content-provider)** — il percorso in entrata per le biblioteche di media esterne.

Tutto tranne i provider di contenuto è servito da una singola API monolitica (il repository [Api](https://github.com/ChurchApps/Api)) i cui moduli si montano su percorsi di base stabili.

## Come Si Unisce

Tutto circonda un'unica autorizzazione JWT condivisa e il modello di autorizzazione RBAC. Ogni credenziale -- un JWT di accesso utente, un token di accesso OAuth o una chiave API -- si risolve nello stesso `Principal` e viene controllata allo stesso modo.

## Riferimento di Superficie

### API REST

La superficie del prodotto completo. Qualsiasi endpoint autenticato accetta un JWT o una chiave API `cak_…` nel file di intestazione `Authorization: Bearer`.

### Chiavi API

Un token `cak_<prefix>.<secret>` di accesso personale, creato in **B1Admin → Impostazioni → Sviluppatore → Chiavi API**. Solo un hash SHA-256 è archiviato.

### OAuth 2.0 e App Connesse

Per app multi-tenant che necessitano del consenso di ogni chiesa. Implementato in `Api/src/modules/membership/controllers/OAuthController.ts`. Il server supporta tre sovvenzioni:

- **Authorization Code** — `POST /oauth/authorize` restituisce un codice di breve durata.
- **Device Code** (RFC 8628) — Per TV, chioschi e CLI senza browser.
- **Refresh Token** — Conia un nuovo token di accesso.

### Webhook

L'unica superficie in uscita. Una chiesa sottoscrive un endpoint HTTPS pubblico agli eventi.

### Server MCP

Un wrapper rivolto all'IA su `/mcp`. Tre strumenti generici espongono l'intera superficie REST dinamicamente.

### Provider di Contenuto

Il percorso del contenuto in entrata, nel pacchetto separato `Packages/content-providers`. Ogni provider implementa l'interfaccia `IProvider`.

---

## Riepilogo

| Superficie | Meccanismo di Autenticazione | Direzione | Riferimento |
|---|---|---|---|
| API REST | Bearer JWT o chiave cak_ | In entrata | [Chiavi API](../api/api-keys) |
| Chiavi API | Token cak_ con hash SHA-256 | Credenziale | [Chiavi API](../api/api-keys) |
| OAuth 2.0 / App Connesse | Auth code · device · refresh → JWT | In entrata | [App Connesse](../api/connected-apps) |
| Webhook | Firma HMAC-SHA256 per hook | In uscita | [Webhook](../api/webhooks) |
| Server MCP | Bearer JWT o chiave cak_ | In entrata (IA) | [Server MCP](../api/mcp) |
| Provider di Contenuto | Per-provider: none / OAuth PKCE / device / form | Contenuto in entrata | [Provider di Contenuto](../freeplay-content-provider) |

## Connettori Precostruiti

ChurchApps fornisce connettori su queste superfici: Slack, Discord, Mailchimp, Zapier, Make, Google Sheets, Claude e ChatGPT.

---

## Pagine Correlate

- [Chiavi API](../api/api-keys) — la credenziale più semplice e il catalogo degli ambiti
- [App Connesse e OAuth](../api/connected-apps) — flussi di consenso multi-tenant
- [Webhook](../api/webhooks) — il sistema di eventi in uscita
- [Server MCP](../api/mcp) — il wrapper di integrazione AI
- [Provider di Contenuto FreePlay](../freeplay-content-provider) — diventare una fonte di contenuto in entrata
