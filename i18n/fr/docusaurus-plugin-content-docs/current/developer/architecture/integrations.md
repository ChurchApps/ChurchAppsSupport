---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension {#integration--extension-surface}

<div class="article-intro">

Tout ce qu'un tiers peut connecter passe par une seule API et un seul modèle d'autorisation. Cette page sert de carte : elle nomme chaque surface d'intégration, montre comment elles se connectent et renvoie vers la référence détaillée de chacune. Si vous développez pour B1, commencez ici pour choisir la bonne porte, puis suivez le lien vers la page qui la décrit en détail.

</div>

## Les surfaces en un coup d'œil {#the-surfaces-at-a-glance}

Il existe six façons d'entrer ou de sortir, et elles partagent toutes la même couche d'authentification :

- **[API REST](../api/api-keys)** — toute la surface du produit, appelable avec un jeton Bearer depuis n'importe quel langage.
- **[Clés d'API](../api/api-keys)** — l'identifiant le plus simple : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** — consentement par église pour les applications multi-locataires ; émet le même JWT qu'un utilisateur reçoit.
- **[Webhooks](../api/webhooks)** — événements sortants signés, livrés de façon durable.
- **[Serveur MCP](../api/mcp)** — un enrobage destiné aux IA par-dessus l'API REST, à `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** — la voie entrante permettant d'alimenter FreePlay et les applications B1 depuis des bibliothèques de médias externes.

Tout sauf les fournisseurs de contenu est servi par une API monolithique unique (le dépôt [Api](https://github.com/ChurchApps/Api)) dont les modules sont montés sous des chemins de base stables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` et `/mcp`.

## Fonctionnement global {#how-it-fits-together}

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Third-party app     │   Bearer  cak_… / JWT    │              B1 API (Api)              │
   │  · server / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   cak_ key ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · AI client (MCP)   │ ─── POST /mcp ──────────▶ │  │   scopes filter → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  API modules: /membership /giving     │
             │        signed JSON POST                │  /attendance /content /messaging …    │
             │   (person / donation / group / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signed)     └───────────────────────────────────────┘

   External content sources (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / device flow / none   ──  B1 is the OAuth *client* here  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / B1 apps        (inbound content path)
```

Trois flèches résument l'ensemble : un tiers **appelle** l'API avec un jeton Bearer (clé d'API ou JWT OAuth, y compris via `/mcp`) ; l'API **rappelle** en sortie par des webhooks signés ; et les fournisseurs de contenu constituent la seule voie **de contenu entrant**, où B1 agit lui-même comme client OAuth pour récupérer des médias auprès d'une source externe.

## Le modèle d'authentification partagé {#the-shared-auth-model}

Chaque identifiant — le JWT de connexion d'un utilisateur, un jeton d'accès OAuth ou une clé d'API — se résout en un **même `Principal`** et est vérifié de la même façon. Il n'existe aucune voie d'« authentification d'intégration » distincte ; un identifiant limité par portées ne se distingue tout simplement pas d'un utilisateur aux privilèges moindres.

### Structure du JWT {#jwt-structure}

Les jetons d'accès B1 sont des JWT HS256 générés dans `Api/src/modules/membership/auth/AuthenticatedUser.ts`. Ensemble des revendications (claims) :

| Revendication | Signification |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La personne derrière le jeton |
| `churchId` | L'unique église dans laquelle ce jeton agit — point d'ancrage de tout le périmètre des données |
| `personId` | L'enregistrement de la personne dans cette église |
| `permissions` | Tableau plat de chaînes de permission RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenance et direction de groupes, pour les contrôles limités aux groupes |
| `membershipStatus` | Invité ou membre, pour le filtrage des services en libre-service |

Un jeton d'accès OAuth a exactement la même forme qu'un JWT de connexion : la seule différence est que son tableau `permissions` a été **filtré par les portées accordées avant la signature** (`getCombinedApiJwt(...)`).

### Périmètre par église {#per-church-scoping}

`churchId` est une revendication du jeton, et non un paramètre de requête ; un identifiant ne peut donc jamais atteindre une autre église. Chaque requête sur le dépôt filtre sur le `churchId` de l'appelant ; une clé d'API ou un jeton OAuth est lié à exactement une église au moment de sa création.

### Permissions basées sur les rôles à la frontière {#role-based-permissions-at-the-boundary}

Les contrôleurs filtrent les actions avec `au.checkAccess(contentType, action)` sur le tableau `permissions` du jeton. Les portées sont un **filtre, jamais une attribution** (`Api/src/shared/auth/Scopes.ts`) : le `SCOPE_CATALOG` associe chaque portée (par ex. `people:read`, `donations:write`) aux couples RBAC qu'elle autorise, et `filterPermissionsByScopes()` croise cette liste avec les permissions **actuelles** de la personne à chaque résolution. Conséquences :

- Retirer une permission dans B1Admin coupe l'accès de l'identifiant dès la requête suivante — les jetons ne divergent jamais du rôle.
- Une portée ne peut que *retirer* des permissions ; un identifiant limité par portées ne peut donc jamais s'élever à l'administration du serveur ou du domaine (ces permissions ne sont délibérément rattachées à aucune portée).
- Les clés d'API portent le préfixe `cak_` ; `CustomAuthProvider.getUser()` le détecte, hache le secret et recalcule les permissions RBAC actuelles de la personne propriétaire à chaque appel.

Voir [Clés d'API → Portées](../api/api-keys#scopes) pour le catalogue complet.

## Référence des surfaces {#surface-reference}

### API REST {#rest-api}

L'ensemble complet de la surface du produit. Tout point de terminaison authentifié accepte soit un JWT, soit une clé d'API `cak_…` dans l'en-tête `Authorization: Bearer` — il n'existe pas de table de routes réservée aux clés ou réservée à OAuth. Les modules et leurs chemins de base se trouvent sous `Api/src/modules/*`.

### Clés d'API {#api-keys}

Un jeton d'accès personnel `cak_<prefix>.<secret>`, créé dans **B1Admin → Settings → Developer → API Keys**. Seul un hachage SHA-256 est conservé ; la clé brute n'est affichée qu'une seule fois. Gérée à `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Idéale pour les scripts propres à une seule église et pour les connecteurs comme Zapier, Make et Google Sheets. → **[Clés d'API](../api/api-keys)**

### OAuth 2.0 et applications connectées {#oauth-20--connected-apps}

Pour les applications multi-locataires qui exigent le consentement de chaque église. Implémenté dans `Api/src/modules/membership/controllers/OAuthController.ts` sous `/membership/oauth`. Le serveur prend en charge trois types d'autorisation :

- **Code d'autorisation** — `POST /oauth/authorize` (authentifié) renvoie un code de courte durée ; `POST /oauth/token` avec `grant_type=authorization_code` l'échange contre un JWT d'accès (≈ 7 jours) et un jeton de rafraîchissement (≈ 90 jours). Les clients publics (sans secret) doivent utiliser PKCE (`S256` uniquement) : un `code_challenge` lors de l'autorisation et le `code_verifier` correspondant lors de l'échange du jeton.
- **Code d'appareil** (RFC 8628) — `POST /oauth/device/authorize` émet un `user_code` ; l'utilisateur l'approuve dans B1Admin (`/oauth/device/approve`) ; l'appareil interroge `/oauth/token` avec le type d'autorisation par code d'appareil. Pour les téléviseurs, les bornes et les CLI sans navigateur.
- **Jeton de rafraîchissement** — `grant_type=refresh_token` génère un nouveau jeton d'accès ; les clients publics (sans secret) peuvent omettre le secret.

Les clients publics peuvent aussi s'enregistrer eux-mêmes avec `POST /oauth/register` (enregistrement dynamique de client, RFC 7591) ; ils reçoivent un `client_id` sans secret, et leurs URI de redirection doivent être en `https` ou sur une adresse de bouclage.

Une **application connectée** est la vue, destinée à l'administrateur de l'église, d'un jeton accordé ; elle est listée et révocable à `/membership/oauth/connections`. Le contrôleur héberge aussi un pont de **session relais** OAuth (`/oauth/relay/*`) qui permet à un appareil sans navigateur de terminer une connexion auprès d'un fournisseur *externe*. → **[Applications connectées et OAuth](../api/connected-apps)**

### Webhooks {#webhooks}

La seule surface sortante. Une église abonne un point de terminaison HTTPS public à des événements ; lorsqu'un changement correspondant survient, `WebhookDispatcher.emit(churchId, event, payload)` enrichit les charges utiles ne contenant que des identifiants avec des noms d'affichage (`personName`, `groupName`, `formName` — les recherches n'ont lieu que lorsqu'un abonnement correspond), enregistre une livraison, et un travail en arrière-plan envoie une enveloppe JSON signée avec des nouvelles tentatives avec attente progressive et une relivraison. Le moteur se trouve dans `Api/src/shared/webhooks/`, et la gestion CRUD par église sous `/membership/webhooks` (`WebhookController.ts`). Un champ `connectorType` remodèle le corps pour Slack / Discord ; le connecteur `mailchimp` va plus loin et prend en charge l'ensemble de l'échange HTTP (méthode, URL et authentification par événement selon l'API de Mailchimp, identifiants chiffrés dans `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Serveur MCP {#mcp-server}

Un enrobage destiné aux IA, à `/mcp` (`Api/src/modules/mcp/`). Trois outils génériques — `list_endpoints`, `describe_endpoint`, `api_call` — exposent dynamiquement toute la surface REST à n'importe quel client MCP. L'authentification est le même jeton Bearer que pour le reste. Pour les clients qui se connectent par OAuth (connecteurs personnalisés de claude.ai), une réponse 401 de `/mcp` contient un en-tête `WWW-Authenticate` pointant vers `/.well-known/oauth-protected-resource`, et `/.well-known/oauth-authorization-server` annonce les points de terminaison `/membership/oauth`, l'enregistrement dynamique, PKCE et la page de consentement `/oauth` de B1Admin (`WellKnownController.ts`, `OAuthMetadata.ts`). `api_call` réintègre la pile Express en interne, de sorte que toutes les règles de permission et de périmètre par église continuent de s'appliquer. → **[Serveur MCP](../api/mcp)**

### Fournisseurs de contenu {#content-providers}

La voie de contenu entrant se trouve dans le paquet séparé `Packages/content-providers` (`@churchapps/content-providers`) plutôt que dans l'API. Chaque fournisseur implémente l'interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, ainsi que des points d'accroche d'authentification — et s'enregistre lui-même dans un registre de type `Map` (`src/providers/registry.ts`). Ici, **B1 est le client OAuth** : un fournisseur déclare un `AuthType` parmi `none`, `oauth_pkce`, `device_flow` ou `form_login`, et les assistants partagés (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) exécutent côté client le flux PKCE ou le flux par appareil auprès de la source externe. Onze fournisseurs sont livrés aujourd'hui — notamment Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church et B1.church — alimentant FreePlay et les applications B1. → **[Fournisseur de contenu FreePlay](../freeplay-content-provider)**

**Les plans annuels** empruntent cette voie. Un éditeur de programmes (avec `lessons.edit`) maintient des séquences ordonnées de semaines 1/2/3 dans l'administration de Lessons.church (tables `yearPlans` / `yearPlanWeeks` de `LessonsApi`, avec `startMonth` facultatif et un `anchor` par semaine valant `easter` / `christmas`) ; `GET /yearPlans/public` de LessonsApi diffuse anonymement les plans en service, en hydratant le programme, l'étude et le lieu de chaque semaine à partir de l'arborescence des leçons. Le menu **Serving → Plans → Schedule Lesson → Apply Year Plan** de B1Admin consomme ce point de terminaison et crée un plan DoingApi par semaine incluse (`providerId=lessonschurch`, `providerPlanId=/lessons/{programId}/{studyId}/{lessonId}/{venueId}`). Les plans dotés d'un `startMonth` calculent les semaines ancrées pour l'année choisie (Pâques par le calcul grégorien, Noël comme le dimanche précédant le 25 décembre ou ce jour-là) et remplissent les périodes intermédiaires ; les plans sans `startMonth` associent toujours la semaine N à `startDate + (N−1)×7` jours. Les semaines issues de fournisseurs OLF externes ou dont le chemin est incomplet sont ignorées au moment de l'application ; les églises modifient les plans obtenus comme tous les autres, et FreePlay diffuse ce qui figure dans le plan.

## Résumé {#summary}

| Surface | Mécanisme d'authentification | Sens | Lieu d'implémentation | Référence |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou clé `cak_…` | Entrant | `Api/src/modules/*` | [Clés d'API](../api/api-keys) |
| Clés d'API | Jeton `cak_` haché en SHA-256 | Identifiant | `Api/.../membership/controllers/ApiKeyController.ts` | [Clés d'API](../api/api-keys) |
| OAuth 2.0 / applications connectées | Code d'autorisation (PKCE) · appareil · rafraîchissement → JWT ; enregistrement dynamique de client | Entrant | `Api/.../membership/controllers/OAuthController.ts` | [Applications connectées](../api/connected-apps) |
| Webhooks | Secret propre à chaque hook, signature HMAC-SHA256 | Sortant | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Serveur MCP | JWT `Bearer`, JWT OAuth (découvert via `/.well-known`), ou clé `cak_…` | Entrant (IA) | `Api/src/modules/mcp/` | [Serveur MCP](../api/mcp) |
| Fournisseurs de contenu | Par fournisseur : aucun / OAuth PKCE / appareil / formulaire | Contenu entrant | `Packages/content-providers/` | [Fournisseur de contenu](../freeplay-content-provider) |

## Connecteurs prêts à l'emploi {#prebuilt-connectors}

Plutôt que de tout construire à partir de zéro, ChurchApps fournit des connecteurs au-dessus des surfaces ci-dessus :

- **[Slack et Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` de type webhook remodèle l'enveloppe standard en message de discussion ; configuré entièrement dans B1Admin, sans compte tiers.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` `mailchimp` qui synchronise les personnes vers une audience Mailchimp et associe l'appartenance aux groupes et aux listes à des étiquettes (`Api/src/shared/webhooks/MailchimpConnector.ts`). Contrairement aux connecteurs de messagerie, il émet ses propres requêtes authentifiées pour chaque événement (création/mise à jour, archivage, étiquetage) au lieu d'envoyer un POST vers une URL fournie par l'église ; la clé d'API et l'identifiant d'audience sont stockés chiffrés dans `webhooks.connectorConfig`. Sens unique, avec les seuls champs de fusion standard.
- **[Zapier](/docs/b1-admin/integrations/zapier)** et **[Make](/docs/b1-admin/integrations/make)** — se déclenchent sur des événements de webhook et agissent via l'API REST ; ils enregistrent leur propre webhook lorsqu'un Zap ou un scénario est activé (nécessite une clé avec `settings:write`). Le code source de l'application Zapier se trouve dans le dépôt `Integrations`, sous `zapier/` (CLI Zapier, déployée avec `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un complément authentifié par clé d'API qui exporte à la demande les personnes, les dons, les groupes et la présence.
- **[Claude](/docs/b1-admin/integrations/claude)** et **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — des clients MCP pointés vers `/mcp`.

Pour votre propre code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) encapsule l'ensemble : un client REST typé, un client OAuth (code d'autorisation / rafraîchissement / flux par appareil) et un vérificateur de webhooks HMAC avec middleware Express.

## Pages connexes {#related-pages}

- [Clés d'API](../api/api-keys) — l'identifiant le plus simple et le catalogue des portées
- [Applications connectées et OAuth](../api/connected-apps) — flux de consentement multi-locataires
- [Webhooks](../api/webhooks) — le système d'événements sortants
- [Serveur MCP](../api/mcp) — l'enrobage d'intégration pour les IA
- [Fournisseur de contenu FreePlay](../freeplay-content-provider) — devenir une source de contenu entrant
- [Intégrations (utilisateur final)](/docs/b1-admin/integrations/) — guides de configuration des connecteurs prêts à l'emploi
