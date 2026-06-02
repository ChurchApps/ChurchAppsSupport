---
title: "Applications connectées et OAuth"
---

# Applications connectées et OAuth

<div class="article-intro">

L'API B1 prend en charge OAuth 2.0 afin qu'une application tierce puisse demander la permission à chaque administrateur d'église pour accéder à ses données -- sans que l'église ne partage jamais un mot de passe ou une clé API. Une **Application connectée** est un jeton OAuth qu'un administrateur d'église a approuvé ; la révoquer coupe l'accès de l'application tierce en un clic. Utilisez ce chemin pour les connecteurs SaaS multi-tenant. Pour une intégration monoeglise, préférez les [clés API](./api-keys).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un **client** OAuth doit être enregistré (actuellement par un administrateur du serveur B1) avant que les églises puissent lui accorder l'accès
- Tous les points de terminaison OAuth vivent sous le module Membership : `/membership/oauth/...`
- Les jetons d'accès sont des JWTs -- ils portent les permissions de l'utilisateur filtrées par les portées accordées

</div>

## Concepts

| Terme | Signification |
|---|---|
| **Client OAuth** | L'application tierce elle-même -- identifiée par `client_id`, sécurisée par `client_secret`. Enregistrée une fois avec B1, partagée entre toutes les églises qui l'installent. |
| **Application connectée** | Une paire `(client, church-admin)` spécifique où l'administrateur a accordé au client l'accès. Chaque application connectée est soutenue par un jeton de rafraîchissement OAuth. |
| **Jeton d'accès** | JWT de courte durée (≈ 7 jours) que le client utilise pour les appels API. Même forme qu'un JWT utilisateur -- `Authorization: Bearer <jwt>`. |
| **Jeton de rafraîchissement** | Chaîne opaque de longue durée (≈ 90 jours) que le client utilise pour créer de nouveaux jetons d'accès. |
| **Portée** | Restreint ce que le jeton d'accès peut faire -- voir le [catalogue des portées](./api-keys#scopes). |

## Flux de subvention

B1 prend en charge trois flux OAuth, tous définis par RFC 6749 + RFC 8628.

### Code d'autorisation (applications Web)

À utiliser quand votre application a un composant côté serveur et peut garder `client_secret` privé.

1. **Autoriser**

   ```http
   POST /membership/oauth/authorize
   Authorization: Bearer <user JWT>
   Content-Type: application/json

   { "client_id": "...", "redirect_uri": "https://app.example.com/cb",
     "response_type": "code", "scope": "people:read groups:read", "state": "xyz" }
   ```

   Retourne `{ "code": "...", "state": "xyz" }`. Le point de terminaison du code d'autorisation est intentionnellement un POST authentifié -- votre application collecte le JWT B1 de l'utilisateur (généralement en hébergeant un bouton dans la session B1 de l'utilisateur) et le transmet dans le cadre de l'étape du consentement.

2. **Échangez le code contre des jetons**

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "authorization_code", "code": "...",
     "client_id": "...", "client_secret": "...", "redirect_uri": "..." }
   ```

   Retourne la réponse du jeton :

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

3. **Rafraîchir** quand le jeton d'accès est sur le point d'expirer :

   ```http
   POST /membership/oauth/token
   Content-Type: application/json

   { "grant_type": "refresh_token", "refresh_token": "...",
     "client_id": "...", "client_secret": "..." }
   ```

   Le jeton de rafraîchissement expire après 90 jours sans utilisation ; s'il est expiré, l'administrateur d'église se réautorise.

### Code de l'appareil (téléviseurs, kiosques, CLI)

À utiliser quand l'appareil n'a pas de navigateur. Défini par RFC 8628.

1. **Demander un code d'appareil**

   ```http
   POST /membership/oauth/device/authorize
   Content-Type: application/json

   { "client_id": "...", "scope": "content:read" }
   ```

   Retourne le code destiné à l'utilisateur et l'intervalle d'interrogation :

   ```json
   { "device_code": "...", "user_code": "WXYZ-1234",
     "verification_uri": "https://app.b1.church/device",
     "expires_in": 900, "interval": 5 }
   ```

2. Affichez `user_code` + `verification_uri` à l'utilisateur.

3. **Interrogez** `/membership/oauth/token` avec `grant_type=urn:ietf:params:oauth:grant-type:device_code` et le `device_code`. Réponses standard :

   | Erreur | Signification |
   |---|---|
   | `authorization_pending` | L'utilisateur n'a pas encore approuvé -- continuez à interroger à l'intervalle suggéré |
   | `expired_token` | Le code d'appareil dépasse `expires_in` -- recommencez |
   | `access_denied` | L'utilisateur a refusé la requête |
   | _(aucun -- 200 OK)_ | Approuvé -- le corps est une `B1TokenResponse` |

4. Une fois approuvé, stockez le `refresh_token` et utilisez le `access_token` jusqu'à ce qu'il expire.

Le SDK B1 inclut `B1OAuthClient.awaitDeviceToken(...)` qui exécute la boucle d'interrogation pour vous avec un backoff conforme à la RFC sensé.

### Jeton de rafraîchissement

Toujours disponible en tant que demande autonome une fois que vous tenez un `refresh_token` :

```http
POST /membership/oauth/token
{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "..." }
```

Un nouveau `access_token` et `refresh_token` reviennent. Les **clients publics** (pas de `client_secret`) peuvent omettre `client_secret` sur le rafraîchissement -- utile pour les applications mobiles/de bureau OAuth qui ne peuvent pas garder un secret.

## Forme du jeton

Un jeton d'accès est un JWT émis par B1 identique à celui qu'un utilisateur obtiendrait de `POST /membership/users/login` -- même revendication de permission modulaire, même comportement `checkAccess` dans chaque contrôleur -- **sauf** que le tableau de permissions a été filtré via les portées accordées au moment de l'émission. Un jeton d'accès scopé ne peut rien faire qu'une clé API similarement scopée ne pourrait pas, et il n'y a pas de « chemin OAuth » séparé dans aucun contrôleur ; `actionWrapper` ne sait pas si le porteur est une personne, une clé API ou un client OAuth.

## Applications connectées (face utilisateur)

Du point de vue d'un administrateur d'église, « Applications connectées » est la liste des applications qui ont reçu l'accès à leur église. Chaque ligne est une paire `(OAuthClient, OAuthToken)` en direct.

Dans B1Admin : **Paramètres → Développeur → Applications connectées** affiche :

- Le nom du client
- Les portées que l'administrateur a approuvées
- La date à laquelle l'accès a été accordé
- Un bouton **Révoquer**

| Méthode et chemin | Auth | Objectif |
|---|---|---|
| `GET /membership/oauth/connections` | JWT | Lister les connexions actives propres à l'appelant (jointes avec le nom du client + portées) |
| `DELETE /membership/oauth/connections/:id` | JWT | Révoquer une connexion par son identifiant de jeton OAuth -- le jeton s'arrête de fonctionner à la prochaine requête |

La liste exclut automatiquement les jetons expirés.

## Portées et consentement

Les chaînes de portée sont le même catalogue que les [clés API](./api-keys#scopes). Meilleures pratiques pour les clients :

- **Demandez les portées les plus étroites qui fonctionnent.** Les églises remarquent si vous demandez `donations:write` quand vous n'avez besoin que de lire les personnes.
- **Utilisez un jeton de rafraîchissement plus jetons d'accès de courte durée.** Les jetons d'accès de longue durée sont plus difficiles à révoquer rapidement.
- **Présentez toujours les portées accordées à l'utilisateur** dans votre propre IU pour qu'ils puissent vérifier ce à quoi ils ont consenti.

## Gestion des clients OAuth

Les clients OAuth (les applications tierces elles-mêmes) sont actuellement enregistrés mondialement par un administrateur du serveur B1. L'auto-enregistrement par église est sur la feuille de route -- jusqu'à présent, pour livrer un connecteur public, vous contactez l'équipe ChurchApps pour créer une paire `client_id` / `client_secret` et enregistrer vos URIs de redirection.

| Méthode et chemin | Permission | Description |
|---|---|---|
| `GET /membership/oauth/clients` | Server.Admin | Lister tous les clients OAuth |
| `GET /membership/oauth/clients/clientId/:clientId` | — | Obtenir un client par son identifiant public (secret masqué) |
| `POST /membership/oauth/clients` | Server.Admin | Créer ou mettre à jour un client |
| `DELETE /membership/oauth/clients/:id` | Server.Admin | Supprimer un client |

## Prise en charge du SDK

Le package `@churchapps/integration-sdk` enveloppe chaque flux OAuth avec des aides typées -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`. Consultez le README du package et les [Webhooks](./webhooks#sdk-support) pour un exemple complet.
