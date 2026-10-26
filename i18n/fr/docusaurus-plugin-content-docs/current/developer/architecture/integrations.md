---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension

<div class="article-intro">

Tout ce à quoi un tiers peut se connecter passe par une seule API et un modèle d'autorisation unique. Cette page est la carte : elle nomme chaque surface d'intégration, montre comment elles se connectent, et renvoie vers la référence détaillée de chacune. Si vous développez pour B1, commencez ici pour choisir la bonne porte, puis suivez le lien vers la page qui la documente en détail.

</div>

## Les surfaces en un coup d'œil

Il existe six façons d'entrer ou de sortir, et toutes partagent la même couche d'authentification :

- **[API REST](../api/api-keys)** — la surface complète du produit, accessible avec un jeton porteur depuis n'importe quel langage.
- **[Clés d'API](../api/api-keys)** — l'identifiant le plus simple : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** — consentement par église pour les applications multi-locataires ; émet le même JWT qu'un utilisateur reçoit.
- **[Webhooks](../api/webhooks)** — événements sortants signés, livrés de façon durable.
- **[Serveur MCP](../api/mcp)** — une enveloppe orientée IA au-dessus de l'API REST, sous `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** — la voie entrante pour les bibliothèques de médias externes vers FreePlay et les applications B1.

Tout sauf les fournisseurs de contenu est servi par une API monolithique unique (le dépôt [Api](https://github.com/ChurchApps/Api)) dont les modules sont montés sous des chemins de base stables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` et `/mcp`.

## Comment tout s'articule

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Application tierce  │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · serveur / SaaS    │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clé cak_ ─┐                    │  │
   │  · CLI / scripts     │                          │  │   JWT OAuth ┴▶ Principal          │  │
   │  · client IA (MCP)   │ ─── POST /mcp ──────────▶ │  │   filtres de périmètre → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Modules d'API : /membership /giving  │
             │        POST JSON signé                 │  /attendance /content /messaging …    │
             │   (personne / don / groupe / …)        │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durables, signés HMAC-SHA256)   └───────────────────────────────────────┘

   Sources de contenu externes (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flux d'appareil / aucun  ──  B1 est ici le client OAuth  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / applications B1        (voie de contenu entrant)
```

Trois flèches résument l'ensemble : un tiers **appelle** avec un jeton porteur (clé d'API ou JWT OAuth, y compris via `/mcp`) ; l'API **rappelle** via des webhooks signés ; et les fournisseurs de contenu sont l'unique voie de **contenu entrant**, où B1 lui-même est le client OAuth qui récupère des médias depuis une source externe.

## Le modèle d'authentification partagé

Chaque identifiant — le jeton de connexion d'un utilisateur, un jeton d'accès OAuth ou une clé d'API — se résout en un **même `Principal`** et est vérifié de la même façon. Il n'existe pas de chemin d'authentification « d'intégration » distinct ; un identifiant restreint est simplement indiscernable d'un utilisateur ayant moins de privilèges.

### Structure du JWT

Les jetons d'accès B1 sont des JWT HS256 émis dans `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Voici l'ensemble des revendications :

| Revendication | Signification |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La personne derrière le jeton |
| `churchId` | L'unique église dans laquelle ce jeton agit — l'ancrage de tout le cloisonnement des données |
| `personId` | La fiche personne au sein de cette église |
| `permissions` | Tableau plat de chaînes de permissions RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenance et responsabilité de groupe, pour les vérifications à l'échelle du groupe |
| `membershipStatus` | Visiteur ou membre, pour le contrôle des services en libre-service |

Un jeton d'accès OAuth a exactement la même forme qu'un JWT de connexion — la seule différence est que son tableau `permissions` a été **filtré par les périmètres accordés avant la signature** (`getCombinedApiJwt(...)`).

### Cloisonnement par église

`churchId` est une revendication du jeton, et non un paramètre de requête ; un identifiant ne peut donc jamais atteindre des données d'une autre église. Chaque requête sur un dépôt filtre sur le `churchId` de l'appelant ; une clé d'API ou un jeton OAuth est lié à exactement une église au moment de sa création.

### Permissions par rôle à la frontière

Les contrôleurs protègent les actions avec `au.checkAccess(contentType, action)` contre le tableau `permissions` du jeton. Les périmètres sont un **filtre, jamais une attribution** (`Api/src/shared/auth/Scopes.ts`) : le `SCOPE_CATALOG` associe chaque périmètre (par exemple `people:read`, `donations:write`) aux paires RBAC qu'il autorise, et `filterPermissionsByScopes()` les croise avec les permissions **actuelles** de la personne à chaque résolution. Conséquences :

- Retirer une permission dans B1Admin coupe l'accès de l'identifiant dès la requête suivante — les jetons ne divergent jamais du rôle.
- Un périmètre ne peut qu'*enlever* des permissions ; un identifiant restreint ne peut donc jamais s'élever à l'administration serveur ou de domaine (ces permissions ne sont délibérément associées à aucun périmètre).
- Les clés d'API portent un préfixe `cak_` ; `CustomAuthProvider.getUser()` s'y branche, hache le secret et re-résout à chaque appel les permissions RBAC actuelles de la personne propriétaire.

Voir [Clés d'API → Périmètres](../api/api-keys#scopes) pour le catalogue complet.

## Référence des surfaces

### API REST

La surface complète du produit. Tout point de terminaison authentifié accepte soit un JWT, soit une clé `cak_…` dans l'en-tête `Authorization: Bearer` — il n'existe pas de table de routes réservée aux clés ou à OAuth seul. Les modules et leurs chemins de base se trouvent sous `Api/src/modules/*`.

### Clés d'API

Un jeton d'accès personnel `cak_<prefix>.<secret>`, créé dans **B1Admin → Settings → Developer → API Keys**. Seul un hachage SHA-256 est stocké ; la clé brute n'est affichée qu'une fois. Géré à `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Idéal pour les scripts propres à une seule église et pour les connecteurs comme Zapier, Make et Google Sheets. → **[Clés d'API](../api/api-keys)**

### OAuth 2.0 et applications connectées

Pour les applications multi-locataires qui ont besoin du consentement de chaque église. Implémenté dans `Api/src/modules/membership/controllers/OAuthController.ts` sous `/membership/oauth`. Le serveur prend en charge trois types d'autorisation :

- **Code d'autorisation** — `POST /oauth/authorize` (authentifié) renvoie un code de courte durée ; `POST /oauth/token` avec `grant_type=authorization_code` l'échange contre un JWT d'accès (≈ 7 jours) et un jeton de rafraîchissement (≈ 90 jours). Les clients publics (sans secret) doivent utiliser PKCE (`S256` uniquement) : un `code_challenge` à l'autorisation, et le `code_verifier` correspondant à l'échange de jeton.
- **Code d'appareil** (RFC 8628) — `POST /oauth/device/authorize` émet un `user_code` ; l'utilisateur l'approuve dans B1Admin (`/oauth/device/approve`) ; l'appareil interroge `/oauth/token` avec le type de code d'appareil. Pour les téléviseurs, kiosques et CLI sans navigateur.
- **Jeton de rafraîchissement** — `grant_type=refresh_token` émet un nouveau jeton d'accès ; les clients publics (sans secret) peuvent omettre le secret.

Les clients publics peuvent aussi s'enregistrer eux-mêmes avec `POST /oauth/register` (enregistrement dynamique de client, RFC 7591) ; ils reçoivent un `client_id` sans secret, et leurs URI de redirection doivent être `https` ou de boucle locale (loopback).

Une **application connectée** (Connected App) est la vue, côté administrateur d'église, d'un jeton accordé ; elle est listée et révocable à `/membership/oauth/connections`. Le contrôleur héberge aussi un pont de **session relais** OAuth (`/oauth/relay/*`) qui permet à un appareil sans navigateur de terminer une connexion auprès d'un fournisseur *externe*. → **[Applications connectées et OAuth](../api/connected-apps)**

### Webhooks

La seule surface sortante. Une église abonne un point de terminaison HTTPS public à des événements ; lorsqu'un changement correspondant survient, `WebhookDispatcher.emit(churchId, event, payload)` enrichit les charges utiles ne contenant que des identifiants avec des noms d'affichage (`personName`, `groupName`, `formName` — les recherches n'ont lieu qu'une fois un abonnement correspondant), enregistre une livraison, et un worker en arrière-plan envoie en POST une enveloppe JSON signée, avec relances à délai progressif et nouvelles livraisons. Moteur dans `Api/src/shared/webhooks/`, CRUD par église sous `/membership/webhooks` (`WebhookController.ts`). Un champ `connectorType` remodèle le corps pour Slack / Discord ; le connecteur `mailchimp` va plus loin et gère tout l'échange HTTP (méthode, URL et authentification par événement auprès de l'API Mailchimp, identifiants chiffrés dans `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Serveur MCP

Une enveloppe orientée IA sous `/mcp` (`Api/src/modules/mcp/`). Trois outils génériques — `list_endpoints`, `describe_endpoint`, `api_call` — exposent dynamiquement toute la surface REST à n'importe quel client MCP. L'authentification est le même jeton porteur que pour le reste. Pour les clients qui se connectent avec OAuth (connecteurs personnalisés claude.ai), une réponse 401 de `/mcp` porte un en-tête `WWW-Authenticate` pointant vers `/.well-known/oauth-protected-resource`, et `/.well-known/oauth-authorization-server` annonce les points de terminaison `/membership/oauth`, l'enregistrement dynamique, PKCE et la page de consentement `/oauth` de B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` ré-entre dans la pile Express en cours de processus, si bien que toutes les règles de permissions et de cloisonnement par église s'appliquent. → **[Serveur MCP](../api/mcp)**

### Fournisseurs de contenu

La voie de contenu entrant, dans le paquet séparé `Packages/content-providers` (`@churchapps/content-providers`) plutôt que dans l'API. Chaque fournisseur implémente l'interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus des points d'accroche d'authentification — et s'enregistre lui-même dans un registre `Map` (`src/providers/registry.ts`). Ici **B1 est le client OAuth** : un fournisseur déclare un `AuthType` parmi `none`, `oauth_pkce`, `device_flow` ou `form_login`, et les aides partagées (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) exécutent côté client le flux PKCE ou le flux d'appareil vers la source externe. Onze fournisseurs sont livrés aujourd'hui — dont Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church et B1.church — alimentant FreePlay et les applications B1. → **[Fournisseur de contenu FreePlay](../freeplay-content-provider)**

**Les plans annuels** empruntent cette voie. Un éditeur de programmes (avec `lessons.edit`) maintient des séquences ordonnées semaine 1 / 2 / 3 dans l'administration Lessons.church (tables `yearPlans` / `yearPlanWeeks` de LessonsApi, avec `startMonth` facultatif et `anchor` par semaine `easter` / `christmas`) ; `GET /yearPlans/public` sur LessonsApi sert les plans en ligne de façon anonyme, en hydratant le programme, l'étude et le lieu de chaque semaine à partir de l'arbre des leçons. **Serving → Plans → Schedule Lesson → Apply Year Plan** dans B1Admin consomme ce point de terminaison et écrit un plan DoingApi par semaine incluse (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Les plans avec `startMonth` résolvent les semaines ancrées par rapport à l'année choisie (Pâques par le calcul grégorien, Noël comme le dimanche précédant ou égal au 25 décembre) et remplissent les séquences entre elles ; les plans sans `startMonth` associent quand même la semaine N à `startDate + (N−1)×7` jours. Les semaines issues de fournisseurs OLF externes, ou dont le chemin est incomplet, sont ignorées au moment de l'application ; les églises modifient les plans obtenus comme les autres, et FreePlay joue ce qui figure dans le plan.

## Résumé

| Surface | Mécanisme d'authentification | Sens | Lieu d'implémentation | Référence |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou clé `cak_…` | Entrant | `Api/src/modules/*` | [Clés d'API](../api/api-keys) |
| Clés d'API | Jeton `cak_` haché en SHA-256 | Identifiant | `Api/.../membership/controllers/ApiKeyController.ts` | [Clés d'API](../api/api-keys) |
| OAuth 2.0 / Applications connectées | Code d'autorisation (PKCE) · appareil · rafraîchissement → JWT ; enregistrement dynamique de client | Entrant | `Api/.../membership/controllers/OAuthController.ts` | [Applications connectées](../api/connected-apps) |
| Webhooks | Secret par webhook, signature HMAC-SHA256 | Sortant | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Serveur MCP | JWT `Bearer`, JWT OAuth (découvert via `/.well-known`) ou clé `cak_…` | Entrant (IA) | `Api/src/modules/mcp/` | [Serveur MCP](../api/mcp) |
| Fournisseurs de contenu | Selon le fournisseur : aucun / OAuth PKCE / appareil / formulaire | Contenu entrant | `Packages/content-providers/` | [Fournisseur de contenu](../freeplay-content-provider) |

## Connecteurs prêts à l'emploi

Plutôt que de demander à chacun de tout construire, ChurchApps fournit des connecteurs au-dessus des surfaces ci-dessus :

- **[Slack et Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` de type webhook remodèle l'enveloppe standard en message de discussion ; configuré entièrement dans B1Admin, sans compte tiers.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` `mailchimp` qui synchronise les personnes vers une audience Mailchimp et fait correspondre l'appartenance aux groupes et listes à des étiquettes (`Api/src/shared/webhooks/MailchimpConnector.ts`). Contrairement aux connecteurs de discussion, il émet ses propres requêtes authentifiées par événement (ajout, archivage, étiquetage) au lieu d'envoyer en POST vers une URL fournie par l'église ; la clé d'API et l'identifiant d'audience sont stockés chiffrés dans `webhooks.connectorConfig`. Sens unique, champs de fusion standard uniquement.
- **[Zapier](/docs/b1-admin/integrations/zapier)** et **[Make](/docs/b1-admin/integrations/make)** — se déclenchent sur les événements de webhook et agissent via l'API REST ; ils enregistrent leur propre webhook lorsqu'un Zap ou un scénario est activé (nécessite une clé avec `settings:write`). Le code source de l'application Zapier se trouve dans le dépôt `Integrations` sous `zapier/` (CLI Zapier, déployé avec `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un complément authentifié par clé d'API qui exporte à la demande les personnes, dons, groupes et présences.
- **[Claude](/docs/b1-admin/integrations/claude)** et **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clients MCP pointant vers `/mcp`.

Pour votre propre code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) encapsule l'ensemble : un client REST typé, un client OAuth (code d'autorisation, rafraîchissement, flux d'appareil), et un vérificateur de webhooks HMAC avec middleware Express.

## Pages connexes

- [Clés d'API](../api/api-keys) — l'identifiant le plus simple et le catalogue des périmètres
- [Applications connectées et OAuth](../api/connected-apps) — flux de consentement multi-locataires
- [Webhooks](../api/webhooks) — le système d'événements sortants
- [Serveur MCP](../api/mcp) — l'enveloppe d'intégration IA
- [Fournisseur de contenu FreePlay](../freeplay-content-provider) — devenir une source de contenu entrant
- [Intégrations (utilisateur final)](/docs/b1-admin/integrations/) — guides de configuration des connecteurs prêts à l'emploi
