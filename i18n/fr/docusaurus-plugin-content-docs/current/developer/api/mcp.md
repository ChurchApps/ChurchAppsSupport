---
title: "Serveur MCP"
---

# Serveur MCP

<div class="article-intro">

L'API B1 envoie un serveur [MCP (Model Context Protocol)](https://modelcontextprotocol.io) à `/mcp`. N'importe quel client compatible avec MCP -- Claude Code, Claude Desktop, le SDK Agents OpenAI, Cursor, ou le vôtre -- peut s'y connecter et appeler l'API REST sous-jacente au nom d'un utilisateur d'église authentifié. C'est un wrapper fin et générique : trois outils génériques exposent toute la surface de l'API dynamiquement plutôt que de modéliser manuellement chaque point de terminaison, plus un outil de guide de domaine pour le créateur de sites web.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Une [clé API B1](./api-keys) (`cak_…`) avec les portées que le client doit avoir
- Un hôte API B1 accessible -- `https://api.churchapps.org` pour les églises hébergées, ou votre propre déploiement
- Un client MCP. Voir [Claude](/docs/b1-admin/integrations/claude) et [ChatGPT](/docs/b1-admin/integrations/chatgpt) pour la configuration de l'utilisateur final

</div>

## Point de terminaison

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspect | Valeur |
|---|---|
| **Chemin** | `/mcp` (relatif au l'hôte de l'API) |
| **Méthode** | `POST` uniquement -- la requête/réponse et le streaming SSE se produisent tous deux sur le même point de terminaison |
| **Transport** | [MCP HTTP Diffusable](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) |
| **Modèle de session** | Sans état. Une nouvelle instance du serveur MCP est construite par requête -- pas d'identifiant de session, pas de reprise |
| **Auth** | Jeton porteur. Les clés API `cak_…` et les JWTs B1 fonctionnent tous les deux ; la résolution est la même que tout autre point de terminaison authentifié |

Une requête dont l'en-tête `Authorization` est manquant ou invalide retourne :

```json
{ "error": "Unauthorized — MCP requires a valid bearer token (cak_* API key or JWT)." }
```

avec HTTP 401.

## Outils

Trois outils génériques plus un guide. Le modèle utilise `list_endpoints` pour la découverte, `describe_endpoint` pour apprendre une forme de charge utile, `api_call` pour invoquer réellement l'API, et `describe_page_builder` quand la tâche implique du contenu web.

### `list_endpoints`

Retourne l'inventaire complet des routes REST enregistrées, filtré par une sous-chaîne optionnelle et/ou un verbe HTTP. Chaque entrée inclut le nom du contrôleur et les portées de clé API les plus susceptibles d'être nécessaires.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `filter` | string (optionnel) | Sous-chaîne insensible à la casse comparée au chemin, par exemple `"people"` |
| `method` | enum (optionnel) | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |

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

L'inventaire est construit une seule fois au démarrage de l'API à partir de la table des routes en direct -- tout ce que vous pouvez atteindre avec `curl` apparaît ici.

### `describe_endpoint`

Retourne un bref résumé plus, quand disponible, un exemple de corps de requête et de réponse curé manuellement pour un point de terminaison.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `method` | string | Verbe HTTP |
| `path` | string | Chemin complet tel que retourné par `list_endpoints` |

**Sortie :** pour les points de terminaison curés, un exemple avec `summary`, `requestBody` et `responseSample`. Pour les points de terminaison non curés, un message de secours invitant le modèle à appeler `GET` en premier pour voir la forme. Environ une douzaine de routes à fort trafic (people, groups, donations, attendance, funds) sont curées.

### `api_call`

Invoque le point de terminaison REST choisi, dans le processus, à travers la même pile de middleware Express qu'une requête HTTP normale -- authentification, analyse du corps, enregistrement d'audit, et portée par église s'appliquent tous.

**Entrée :**

| Champ | Type | Description |
|---|---|---|
| `method` | enum | `GET` / `POST` / `PUT` / `DELETE` / `PATCH` |
| `path` | string | Chemin incluant tout préfixe de module, par exemple `/membership/people` |
| `query` | object (optionnel) | Objet plat des paramètres de chaîne de requête |
| `body` | any (optionnel) | Corps de la requête JSON -- généralement un tableau d'objets de modèle pour `POST` |

**Sortie :**

```json
{
  "status": 200,
  "truncated": false,
  "body": [ /* the controller's JSON response */ ]
}
```

Le résultat de l'outil est marqué `isError: true` pour toute réponse avec un statut ≥ 400.

### `describe_page_builder`

L'un des outils non-génériques : un guide statique et autonome pour construire des pages de site web via les points de terminaison `/content/*` -- le modèle de données Page → Section → Element, le flux de création, chaque `elementType` avec sa forme `answersJSON`, les paramètres au niveau de la section tels que la forme des séparateurs `dividerTop`/`dividerBottom`, et un exemple complet de bout en bout. Il ne prend aucune entrée et reflète le catalogue d'éléments entretenu dans l'éditeur B1Admin (voir [Architecture du créateur de sites web](../architecture/website-builder)). Les agents sont censés l'appeler une fois avant de créer ou modifier du contenu de page, puis agir via `api_call`.

## Modèle d'authentification

La requête MCP elle-même s'exécute via `CustomAuthProvider.getUser()` -- le même chemin que chaque point de terminaison B1 authentifié utilise. Un porteur `cak_…` se résout en un `Principal` dont les permissions sont le RBAC actuel de la personne émettrice, **intersectées** avec les portées accordées de la clé. Cette intersection est recalculée à chaque requête, donc :

- Supprimer une portée d'une clé (en la supprimant et la recréant) coupe l'accès au prochain appel.
- Supprimer une permission de la personne sous-jacente dans B1Admin coupe l'accès au prochain appel, même si la clé existe toujours.

Pour les invocations `api_call` imbriquées, l'en-tête `Authorization` original est copié sur la requête synthétique, donc `CustomAuthProvider` s'exécute à nouveau et l'intersection de portée est réappliquée par appel. Il n'y a pas de mise en cache de jeton.

## Liste noire des chemins

Un petit ensemble de routes ne sont pas accessibles via `api_call`, même avec une clé valide :

| Motif | Pourquoi |
|---|---|
| `/giving/donate/webhook/*` | Les points de terminaison de webhook du fournisseur attendent des corps bruts vérifiés par signature de Stripe/PayPal -- pas des appelants généraux |
| `/membership/oauth/clients*` | L'enregistrement des clients OAuth est uniquement pour l'opérateur |
| `/membership/people/apiEmails` | Verrouillé par le `jwtSecret` de l'opérateur, pas les permissions des utilisateurs |
| Tout itinéraire attendant `multipart/form-data` | Les téléchargements de fichiers ne sont pas JSON-RPC-amicaux |

Un chemin bloqué retourne un résultat d'outil `isError: true` avec un message descriptif ; l'itinéraire sous-jacent n'est jamais invoqué.

## Plafond de taille de réponse

Chaque corps de réponse `api_call` est plafonné à **64 Ko** de sortie capturée. Si une requête dépasse le plafond, la réponse porte `"truncated": true` et le modèle est censé réessayer avec des paramètres de requête plus étroits. Cela empêche une seule réponse d'outil de dépasser la fenêtre de contexte du client.

## Limitation de débit

Il n'y a pas de limite de débit au niveau de l'application sur `/mcp`. La limitation est déférée à API Gateway / concurrence Lambda en production, et à tout ce que votre proxy inverse applique dans les déploiements auto-hébergés.

## Découverte OAuth

Le serveur MCP n'annonce **pas** les métadonnées OAuth 2.1 (`/.well-known/oauth-authorization-server`, enregistrement de client dynamique, flux PKCE). Les clients qui nécessitent des serveurs MCP découverts OAuth -- notamment l'IU « Ajouter un connecteur personnalisé » de Claude.ai et la fonctionnalité « Connecteurs » de ChatGPT -- ne peuvent pas se connecter sans cette surface.

Les clients qui acceptent un jeton porteur statique dans leur configuration -- Claude Code, Claude Desktop, SDK Agents OpenAI, Cursor, code personnalisé -- fonctionnent aujourd'hui. Le [OAuthController](/docs/developer/api/connected-apps) existant émet déjà des jetons via code d'autorisation + PKCE pour les applications tierces ; une couche de découverte conforme à la spec MCP par-dessus celle-ci comblerait le gap.

## Développement local

Le point de terminaison MCP se monte à côté de tout le reste quand l'API s'exécute localement :

```bash
cd Api
npm run dev
# Server listening on http://localhost:8084
```

Au démarrage, la ligne de journal `📡 MCP server ready at /mcp — N routes in inventory` confirme que l'inventaire a été construit.

Sondez-le avec le MCP Inspector :

```bash
npx @modelcontextprotocol/inspector
```

Dans l'IU Inspector, pointez-le vers `http://localhost:8084/mcp` et définissez l'en-tête `Authorization` sur `Bearer cak_<prefix>.<secret>`. Appelez `list_endpoints` en premier ; vous devriez voir la liste complète des routes. Ensuite, `api_call({ method: "GET", path: "/membership/people" })` devrait retourner les personnes de vos semences locales.

## Disposition du code

Le serveur MCP vit à `src/modules/mcp/` dans le repo Api. Fichiers notables :

| Fichier | Objectif |
|---|---|
| `McpController.ts` | `@controller("/mcp")`; câble `StreamableHTTPServerTransport` par requête |
| `McpServer.ts` | Construit un MCP `Server`, enregistre les quatre outils |
| `RouteInventory.ts` | Marche les métadonnées inversify-express-utils au démarrage pour énumérer les routes |
| `internalDispatch.ts` | Synthétique `req`/`res` qui re-entre dans l'application Express dans le processus |
| `tools/` | `listEndpoints.ts`, `describeEndpoint.ts`, `apiCall.ts`, `describePageBuilder.ts` |
| `examples.ts` | Exemples de requête/réponse curés pour les points de terminaison à fort trafic |

## Connexes

- [Clés API](./api-keys)
- [Webhooks](./webhooks)
- [Applications connectées (OAuth)](./connected-apps)
- [Claude -- configuration de l'utilisateur final](/docs/b1-admin/integrations/claude)
- [ChatGPT -- configuration de l'utilisateur final](/docs/b1-admin/integrations/chatgpt)
