---
title: "Serveur MCP"
---

# Serveur MCP {#mcp-server}

<div class="article-intro">

L'API B1 fournit un serveur [MCP (Model Context Protocol)](https://modelcontextprotocol.io) à l'adresse `/mcp`. Tout client d'IA compatible MCP (connecteurs personnalisés de claude.ai, Claude Code, Claude Desktop, le SDK OpenAI Agents, Cursor ou un client maison) peut s'y connecter et appeler l'API REST sous-jacente au nom d'un utilisateur d'église authentifié. Il s'agit d'un enrobage léger et générique : trois outils génériques exposent toute la surface de l'API de façon dynamique, au lieu de modéliser chaque point de terminaison à la main, plus un outil de guide métier pour le créateur de site web.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Une [clé d'API B1](./api-keys) (`cak_…`) avec les portées (scopes) dont le client a besoin, ou un client MCP capable de se connecter par OAuth (voir [Découverte OAuth](#oauth-discovery))
- Un hôte d'API B1 accessible — `https://api.churchapps.org` pour les églises hébergées, ou votre propre déploiement
- Un client MCP. Voir [Claude](/docs/b1-admin/integrations/claude) et [ChatGPT](/docs/b1-admin/integrations/chatgpt) pour la configuration destinée aux utilisateurs finaux

</div>

## Point de terminaison {#endpoint}

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspect | Valeur |
|---|---|
| **Chemin** | `/mcp` (relatif à l'hôte de l'API) |
| **Méthode** | `POST` uniquement — les requêtes/réponses et le streaming SSE passent tous deux par le même point de terminaison |
| **Transport** | [MCP Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modèle de session** | Sans état. Une nouvelle instance de serveur MCP est créée pour chaque requête — pas d'identifiant de session, pas de reprise |
| **Auth** | Jeton Bearer. Les clés d'API `cak_…` et les JWT B1 (y compris les jetons d'accès OAuth) fonctionnent tous ; la résolution est identique à celle de tout autre point de terminaison authentifié |

Une requête dont l'en-tête `Authorization` est absent ou invalide renvoie :

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

avec le code HTTP 401 et un en-tête `WWW-Authenticate: Bearer resource_metadata="<api>/.well-known/oauth-protected-resource"`, que les clients compatibles OAuth suivent pour démarrer la connexion.

## Outils {#tools}

Trois outils génériques et un guide. Le modèle utilise `list_endpoints` pour la découverte, `describe_endpoint` pour connaître la structure d'une charge utile, `api_call` pour invoquer réellement l'API, et `describe_page_builder` lorsque la tâche concerne le contenu d'un site web.

### `list_endpoints`

Renvoie l'inventaire complet des routes REST enregistrées, filtré par une sous-chaîne facultative et/ou un verbe HTTP. Chaque entrée comprend le nom du contrôleur et les portées de clé d'API les plus probablement nécessaires.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `filter` | chaîne (facultatif) | Sous-chaîne insensible à la casse recherchée dans le chemin, par exemple `"people"` |
| `method` | énumération (facultatif) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

**Sortie :** un document JSON de la forme

```json
{
  "total": 24,
  "endpoints": [
    {
      "method": "GET",
      "path": "/membership/people",
      "controller": "PersonController.getAll",
      "likelyScopes": ["people:read", "people:write"]
    }
  ]
}
```

L'inventaire est construit une seule fois au démarrage de l'API, à partir de la table de routes en cours d'exécution — tout ce qui est accessible avec `curl` apparaît ici.

### `describe_endpoint`

Renvoie un court résumé et, lorsqu'ils existent, un exemple de corps de requête et de réponse rédigé à la main pour un point de terminaison.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `method` | chaîne | Verbe HTTP |
| `path` | chaîne | Chemin complet tel que renvoyé par `list_endpoints` |

**Sortie :** pour les points de terminaison documentés, un exemple comprenant `summary`, `requestBody` et `responseSample`. Pour les points de terminaison non documentés, un message de repli demande au modèle d'appeler d'abord `GET` pour voir la structure. Une douzaine de routes très utilisées (personnes, groupes, dons, présences, fonds) sont documentées.

### `api_call`

Invoque le point de terminaison REST choisi, en interne, à travers la même pile de middlewares Express qu'une requête HTTP normale — l'authentification, l'analyse du corps, la journalisation d'audit et le périmètre par église s'appliquent tous.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `method` | énumération | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | chaîne | Chemin incluant le préfixe de module, par exemple `/membership/people` |
| `query` | objet (facultatif) | Objet plat de paramètres de requête |
| `body` | quelconque (facultatif) | Corps de requête JSON — généralement un tableau d'objets de modèle pour `POST` |

**Sortie :**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Le résultat de l'outil est marqué `isError: true` pour toute réponse dont le statut est ≥ 400.

### `describe_page_builder`

Le seul outil non générique : un guide statique et autonome pour créer des pages de site web via les points de terminaison `/content/*` — le modèle de données Page → Section → Élément, le flux de création, chaque `elementType` avec la structure de son `answersJSON`, les paramètres au niveau des sections comme les séparateurs de forme `dividerTop`/`dividerBottom`, et un exemple complet pas à pas. Il ne prend aucune entrée et reprend le catalogue d'éléments maintenu dans l'éditeur B1Admin (voir [Architecture du créateur de site web](../architecture/website-builder)). Les agents doivent l'appeler une fois avant de créer ou de modifier du contenu de page, puis agir via `api_call`.

## Modèle d'autorisation {#auth-model}

La requête MCP elle-même passe par `CustomAuthProvider.getUser()` — le même chemin que suivent tous les points de terminaison B1 authentifiés. Un jeton Bearer `cak_…` se résout en un `Principal` dont les permissions correspondent au RBAC actuel de la personne qui a émis la clé, **croisé** avec les portées accordées à la clé. Cette intersection est recalculée à chaque requête, donc :

- Retirer une portée d'une clé (en la supprimant puis en la recréant) coupe l'accès dès l'appel suivant.
- Retirer une permission à la personne sous-jacente dans B1Admin coupe l'accès dès l'appel suivant, même si la clé existe toujours.

Pour les invocations imbriquées de `api_call`, l'en-tête `Authorization` d'origine est copié sur la requête synthétique, de sorte que `CustomAuthProvider` s'exécute à nouveau et que l'intersection des portées est réappliquée à chaque appel. Il n'y a aucune mise en cache des jetons.

## Liste de blocage des chemins {#path-blocklist}

Un petit ensemble de routes n'est pas accessible via `api_call`, même avec une clé valide :

| Motif | Raison |
|---|---|
| `/giving/donate/webhook/*` | Les points de terminaison de webhook des fournisseurs attendent des corps bruts dont la signature a été vérifiée, envoyés par Stripe/PayPal — pas par des appelants généraux |
| `/membership/oauth/clients*` | L'enregistrement des clients OAuth est réservé à l'opérateur |
| `/membership/people/apiEmails` | Protégé par le `jwtSecret` de l'opérateur, et non par les permissions des utilisateurs |
| Toute route attendant `multipart/form-data` | Les téléversements de fichiers ne sont pas adaptés à JSON-RPC |

Un chemin bloqué renvoie un résultat d'outil `isError: true` avec un message descriptif ; la route sous-jacente n'est jamais invoquée.

## Limite de taille des réponses {#response-size-cap}

Le corps de chaque réponse de `api_call` est limité à **64 Ko** de sortie capturée. Si une requête dépasse cette limite, la réponse contient `"truncated": true` et le modèle est censé réessayer avec des paramètres de requête plus restrictifs. Cela empêche une seule réponse d'outil de saturer la fenêtre de contexte du client.

## Limitation de débit {#rate-limiting}

Il n'existe aucune limite de débit au niveau de l'application sur `/mcp`. En production, la régulation est reportée à la concurrence d'API Gateway / Lambda, et dans les déploiements auto-hébergés, à ce qu'impose votre proxy inverse.

## Découverte OAuth {#oauth-discovery}

Le serveur MCP annonce les métadonnées OAuth 2.1 afin que les clients qui ne se connectent qu'à des serveurs découverts par OAuth — notamment l'interface « Add custom connector » de Claude.ai — puissent connecter un utilisateur sans clé collée manuellement. `/mcp` est la ressource protégée, le [fournisseur OAuth](./connected-apps) existant sous `/membership/oauth` en est le serveur d'autorisation, et la page `/oauth` de B1Admin sert d'écran de consentement.

| Point de terminaison | Rôle |
|---|---|
| `GET /.well-known/oauth-protected-resource` (également `/.well-known/oauth-protected-resource/mcp`) | Métadonnées de la ressource protégée (RFC 9728) : `resource` vaut `<api>/mcp`, `authorization_servers` vaut la racine de l'API, `scopes_supported` liste toutes les [portées de clé d'API](./api-keys#scopes) |
| `GET /.well-known/oauth-authorization-server` | Métadonnées du serveur d'autorisation (RFC 8414) : `authorization_endpoint` est la page `/oauth` de B1Admin, `token_endpoint` est `/membership/oauth/token`, `registration_endpoint` est `/membership/oauth/register` |
| `POST /membership/oauth/register` | Enregistrement dynamique de client (RFC 7591) |

Le flux suivi par un client tel que claude.ai :

1. `POST /mcp` sans jeton renvoie 401 avec l'en-tête `WWW-Authenticate` pointant vers les métadonnées de la ressource protégée.
2. Le client lit les deux documents de métadonnées, puis s'enregistre avec `POST /membership/oauth/register` en envoyant `client_name`, `redirect_uris` et, facultativement, `scope`. Chaque client qui s'enregistre lui-même est un client **public** : aucun secret n'est émis et la réponse contient `token_endpoint_auth_method: "none"`. Les URI de redirection doivent être en `https`, ou en `http` sur une adresse de bouclage (`localhost`, `127.0.0.1`, `[::1]`) ; au plus 10 par client. L'enregistrement est limité à 20 par heure et par adresse IP.
3. L'utilisateur est envoyé vers la page `/oauth` de B1Admin avec `code_challenge` et `code_challenge_method=S256`. La page de consentement énumère chaque portée demandée en langage clair (ou « Everything your B1 account can access » si aucune n'est demandée), affiche l'hôte vers lequel l'utilisateur sera renvoyé, et indique lorsque l'application s'est enregistrée elle-même. L'utilisateur clique sur **Allow**.
4. Le client échange le code sur `/membership/oauth/token` avec `grant_type=authorization_code` et son `code_verifier`, puis rafraîchit ensuite avec `grant_type=refresh_token`. Les corps encodés en formulaire et en JSON sont tous deux acceptés.
5. Le jeton d'accès obtenu est un JWT B1 limité par portées, utilisé comme jeton Bearer sur `/mcp`.

Règles PKCE : seul `S256` est accepté. Un client sans secret doit envoyer un `code_challenge` lors de l'autorisation et le `code_verifier` correspondant lors de l'échange du jeton ; les clients confidentiels (avec un secret) peuvent toutefois se contenter du secret. Les URI de redirection doivent correspondre exactement à une URI enregistrée.

Les clients qui acceptent un jeton Bearer statique dans leur configuration — Claude Code, Claude Desktop, le SDK OpenAI Agents, Cursor, le code personnalisé — peuvent continuer à utiliser une clé `cak_…`.

## Développement local {#local-development}

Le point de terminaison MCP se monte avec le reste lorsque l'API s'exécute localement :

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Au démarrage, la ligne de journal `📡 MCP server ready at /mcp — N routes in inventory` confirme que l'inventaire a été construit.

Testez-le avec le MCP Inspector :

```bash
npx @modelcontextprotocol/inspector
```

Dans l'interface de l'Inspector, pointez-le vers `http://localhost:8084/mcp` et définissez l'en-tête `Authorization` sur `Bearer cak_<prefix>.<secret>`. Appelez d'abord `list_endpoints` ; vous devriez voir la liste complète des routes. Ensuite, `api_call({ method: "GET", path: "/membership/people" })` devrait renvoyer les personnes de test de votre instance locale.

## Organisation du code {#code-layout}

Le serveur MCP se trouve dans `src/modules/mcp/` du dépôt Api. Fichiers notables :

| Fichier | Rôle |
|---|---|
| `McpController.ts` | `@controller("/mcp")` ; crée un `StreamableHTTPServerTransport` pour chaque requête et envoie le défi `WWW-Authenticate` en cas de 401 |
| `WellKnownController.ts` / `OAuthMetadata.ts` | Sert les documents de découverte OAuth de `/.well-known` |
| `McpServer.ts` | Construit un `Server` MCP et enregistre les quatre outils |
| `RouteInventory.ts` | Parcourt les métadonnées inversify-express-utils au démarrage pour énumérer les routes |
| `internalDispatch.ts` | `req`/`res` synthétiques qui réintègrent l'application Express en interne |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Exemples de requêtes/réponses rédigés pour les points de terminaison très utilisés |

## Liens connexes {#related}

- [Clés d'API](./api-keys)
- [Webhooks](./webhooks)
- [Applications connectées (OAuth)](./connected-apps)
- [Claude — configuration pour utilisateurs finaux](/docs/b1-admin/integrations/claude)
- [ChatGPT — configuration pour utilisateurs finaux](/docs/b1-admin/integrations/chatgpt)
