---
title: "Applications connectées et OAuth"
---

# Applications connectées et OAuth

<div class="article-intro">

L'API B1 prend en charge OAuth 2.0 afin qu'une application tierce puisse demander à chaque administrateur d'église l'autorisation d'accéder à ses données -- sans que l'église ne partage jamais un mot de passe ou une clé d'API. Une **application connectée** est un jeton OAuth approuvé par un administrateur d'église ; le révoquer coupe l'accès de l'application tierce en un clic. Utilisez cette voie pour les connecteurs SaaS multi-locataires. Pour une intégration mono-église, privilégiez les [clés d'API](./api-keys).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un **client** OAuth doit être enregistré avant que les églises puissent lui accorder l'accès -- par un administrateur serveur de B1, ou par le client lui-même via l'[enregistrement dynamique](#dynamic-client-registration)
- Tous les points d'accès OAuth se trouvent dans le module Membership : `/membership/oauth/...`
- Les jetons d'accès sont des JWT -- ils transportent les autorisations de l'utilisateur, filtrées par les portées accordées

</div>

## Concepts

| Terme | Signification |
|---|---|
| **Client OAuth** | L'application tierce elle-même -- identifiée par `client_id`, sécurisée par `client_secret`. Enregistrée une fois auprès de B1, partagée entre toutes les églises qui l'installent. |
| **Application connectée** | Une paire `(client, administrateur d'église)` spécifique pour laquelle l'administrateur a accordé l'accès au client. Chaque application connectée est adossée à un jeton de rafraîchissement OAuth. |
| **Jeton d'accès** | Un JWT à courte durée de vie (≈ 7 jours) que le client utilise pour les appels API. Même forme qu'un JWT utilisateur -- `Authorization: Bearer <jwt>`. |
| **Jeton de rafraîchissement** | Une chaîne opaque de longue durée (≈ 90 jours) que le client utilise pour générer de nouveaux jetons d'accès. |
| **Portée** | Restreint ce que le jeton d'accès peut faire -- voir le [catalogue des portées](./api-keys#scopes). |

## Types de flux

B1 prend en charge trois flux OAuth, tous définis par la RFC 6749 et la RFC 8628.

### Code d'autorisation (applications web)

À utiliser lorsque votre application dispose d'un composant côté serveur et peut garder le `client_secret` privé.

1. **Autoriser**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <JWT utilisateur>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Les clients publics (sans `client_secret`) doivent aussi envoyer `"code_challenge": "..."` et `"code_challenge_method": "S256"` (PKCE, RFC 7636). Seul `S256` est accepté.

   Renvoie `{ "code": "...", "state": "xyz" }`. Le point d'accès du code d'autorisation est volontairement un POST authentifié -- votre application récupère le JWT B1 de l'utilisateur (généralement en hébergeant un bouton dans la session B1 de l'utilisateur) et le transmet dans l'étape de consentement.

2. **Échanger le code contre des jetons**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Si l'étape d'autorisation a envoyé un `code_challenge`, incluez le `"code_verifier": "..."` correspondant. Un client public envoie le vérificateur et omet `client_secret`. Le point d'accès de jeton accepte les corps JSON ou encodés en formulaire (`application/x-www-form-urlencoded`).

   Renvoie la réponse de jeton :

   ```json
   {
     "access_token": "eyJ...",
     "token_type": "Bearer",
     "expires_in": 604800,
     "created_at": 1715000000,
     "refresh_token": "abc123…",
     "scope": "people:read groups:read"
   }
   ```

3. **Rafraîchir** lorsque le jeton d'accès est sur le point d'expirer :

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Le jeton de rafraîchissement expire après 90 jours d'inactivité ; s'il est expiré, l'administrateur d'église doit autoriser à nouveau l'application.

### Code d'appareil (téléviseurs, bornes, CLI)

À utiliser lorsque l'appareil n'a pas de navigateur. Défini par la RFC 8628.

1. **Demander un code d'appareil**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Renvoie le code destiné à l'utilisateur et l'intervalle d'interrogation :

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Affichez `user_code` et `verification_uri` à l'utilisateur.

3. **Interrogez** `/membership/oauth/token` avec `grant_type=urn:ietf:params:oauth:grant-type:device_code` et le `device_code`. Réponses standard :

   | Erreur | Signification |
   |---|---|
   | `authorization_pending` | L'utilisateur n'a pas encore approuvé -- continuez d'interroger à l'intervalle suggéré |
   | `expired_token` | Le code d'appareil a dépassé `expires_in` -- recommencez depuis le début |
   | `access_denied` | L'utilisateur a refusé la demande |
   | _(aucune erreur — 200 OK)_ | Approuvé -- le corps est une `B1TokenResponse` |

4. Une fois approuvé, conservez le `refresh_token` et utilisez le `access_token` jusqu'à son expiration.

Le SDK B1 inclut `B1OAuthClient.awaitDeviceToken(...)`, qui exécute pour vous la boucle d'interrogation avec un recul conforme à la RFC.

### Jeton de rafraîchissement

Toujours disponible comme requête autonome dès que vous possédez un `refresh_token` :

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Un nouveau `access_token` et un nouveau `refresh_token` sont renvoyés. Les **clients publics** (sans `client_secret`) peuvent omettre `client_secret` lors du rafraîchissement -- utile pour les applications OAuth mobiles ou de bureau qui ne peuvent pas garder un secret.

Les jetons de rafraîchissement tournent, mais l'ancien n'est pas supprimé immédiatement. Si un client ne reçoit jamais la réponse de rafraîchissement (par exemple, un téléviseur qui a perdu l'alimentation ou le Wi-Fi en pleine requête), il peut réessayer avec le `refresh_token` précédent pendant **7 jours** au maximum. La nouvelle tentative ne réussit que tant que le jeton de remplacement n'a pas encore été utilisé ; le remplacement non utilisé est alors abandonné et une nouvelle paire est émise. Une fois le remplacement lui-même rafraîchi, l'ancien jeton renvoie `invalid_grant`. Révoquer une connexion révoque aussi les jetons tournés encore dans cette fenêtre de grâce, et la liste des applications connectées affiche chaque connexion une seule fois.

## Forme du jeton

Un jeton d'accès est un JWT émis par B1, identique à celui qu'un utilisateur obtiendrait via `POST /membership/users/login` -- même revendication d'autorisations modulaire, même comportement de `checkAccess` dans chaque contrôleur -- **à ceci près** que le tableau des autorisations a été filtré par les portées accordées au moment de la création. Un jeton d'accès limité ne peut rien faire qu'une clé d'API aux portées similaires ne puisse faire, et il n'existe aucune « voie OAuth » distincte dans un contrôleur ; `actionWrapper` ignore si le porteur est une personne, une clé d'API ou un client OAuth.

## Applications connectées (côté utilisateur)

Du point de vue d'un administrateur d'église, « Applications connectées » est la liste des applications auxquelles l'accès a été accordé pour son église. Chaque ligne correspond à une paire `(OAuthClient, OAuthToken)` active.

Dans B1Admin : **Paramètres → Développeur → Applications connectées** affiche :

- Le nom du client
- Les portées approuvées par l'administrateur
- La date à laquelle l'accès a été accordé
- Un bouton **Révoquer**

| Méthode et chemin | Authentification | Rôle |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lister les connexions actives de l'appelant (avec le nom du client et les portées) |
| `DELETE /membership/oauth/connections/:id` | JWT | Révoquer une connexion par son identifiant de jeton OAuth -- le jeton cesse de fonctionner dès la requête suivante |

La liste exclut automatiquement les jetons expirés.

## Portées et consentement

Les chaînes de portées sont le même catalogue que pour les [clés d'API](./api-keys#scopes). Bonnes pratiques pour les clients :

- **Demandez les portées les plus restreintes qui fonctionnent.** Les églises remarquent si vous demandez `donations:write` alors que vous n'avez besoin que de lire les personnes.
- **Utilisez un jeton de rafraîchissement accompagné de jetons d'accès à courte durée de vie.** Les jetons d'accès de longue durée sont plus difficiles à révoquer rapidement.
- **Présentez toujours les portées accordées à l'utilisateur** dans votre propre interface, afin qu'il puisse vérifier ce à quoi il a consenti.

## Gestion des clients OAuth

Les clients OAuth (les applications tierces elles-mêmes) sont enregistrés globalement. Un client confidentiel disposant d'un `client_secret` est créé par un administrateur serveur de B1 -- pour en obtenir un, contactez l'équipe ChurchApps afin de recevoir une paire `client_id` / `client_secret` et d'enregistrer vos URI de redirection. Les clients publics, comme les connecteurs MCP, peuvent s'enregistrer eux-mêmes (voir ci-dessous).

Les URI de redirection enregistrés doivent correspondre exactement au `redirect_uri` de la requête ; une correspondance partielle ou par préfixe est rejetée.

| Méthode et chemin | Autorisation | Description |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lister tous les clients OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Obtenir un client par son identifiant public (secret masqué) |
| `POST /membership/oauth/clients` | Server.Admin | Créer ou mettre à jour un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Supprimer un client |

### Enregistrement dynamique de client

`POST /membership/oauth/register` (public, RFC 7591) permet à un client, comme le connecteur MCP de claude.ai, de s'enregistrer lui-même. Il est annoncé dans le document `/.well-known/oauth-authorization-server` de l'API -- voir [Serveur MCP → Découverte OAuth](./mcp#oauth-discovery).

```http
POST /membership/oauth/register
Content-Type: application/json

{ "client_name": "My AI assistant", "redirect_uris": ["https://assistant.example.com/oauth/callback"], "scope": "people:read" }
```

Renvoie 201 avec `client_id`, `client_id_issued_at`, `client_name`, `redirect_uris`, `grant_types` (`authorization_code`, `refresh_token`), `response_types` (`code`) et `token_endpoint_auth_method: "none"`.

- Aucun secret n'est jamais émis : le client doit donc utiliser PKCE à chaque autorisation.
- `redirect_uris` doit contenir de 1 à 10 URL `https`, ou `http` sur `localhost`, `127.0.0.1` ou `[::1]`.
- `client_name` est tronqué à 45 caractères (valeur par défaut « AI assistant »).
- Limité à 20 enregistrements par heure et par adresse IP.

Sur la page de consentement de B1Admin, un client qui s'est enregistré lui-même affiche un avertissement indiquant qu'il s'est enregistré seul ; il ne peut jamais faire plus que le compte B1 de l'utilisateur, et il peut être déconnecté dans **Paramètres → Développeur → Applications connectées**.

## Prise en charge par le SDK

Le paquet `@churchapps/integration-sdk` encapsule chaque flux OAuth avec des fonctions d'aide typées -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Consultez le README du paquet et [Webhooks](./webhooks#sdk-support) pour un exemple de bout en bout.
