---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension

<div class="article-intro">

Tout ce qu'un tiers peut brancher passe par une seule API et un seul modèle d'autorisation. Cette page est la carte : elle nomme chaque surface d'intégration, montre comment elles se connectent, et renvoie vers la référence détaillée de chacune. Si vous développez contre B1, commencez ici pour choisir la bonne porte, puis suivez le lien vers la page qui la documente en détail.

</div>

## Les surfaces en un coup d'œil

Il existe six voies d'entrée ou de sortie, et elles partagent toutes la même couche d'authentification :

- **[API REST](../api/api-keys)** — la surface complète du produit, appelable avec un jeton bearer depuis n'importe quel langage.
- **[Clés API](../api/api-keys)** — l'identifiant le plus simple : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** — consentement par église pour les applications multi-locataires ; émet le même JWT qu'un utilisateur.
- **[Webhooks](../api/webhooks)** — événements sortants signés, livrés de façon durable.
- **[Serveur MCP](../api/mcp)** — une enveloppe orientée IA au-dessus de l'API REST à `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** — le chemin entrant pour les bibliothèques de médias externes vers FreePlay et les applications B1.

Tout, sauf les fournisseurs de contenu, est servi par une seule API monolithique (le dépôt [Api](https://github.com/ChurchApps/Api)) dont les modules se montent sous des chemins de base stables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, et `/mcp`.

## Comment tout s'assemble

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Application tierce  │   Bearer  cak_… / JWT    │              API B1 (Api)              │
   │  · serveur / SaaS    │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clé cak_ ─┐                    │  │
   │  · CLI / scripts     │                          │  │   JWT OAuth ┴▶ Principal          │  │
   │  · client IA (MCP)   │ ─── POST /mcp ──────────▶ │  │   portées filtrent → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Modules API : /membership /giving     │
             │        POST JSON signé                 │  /attendance /content /messaging …    │
             │   (personne / don / groupe / …)        │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, signé HMAC-SHA256)      └───────────────────────────────────────┘

   Sources de contenu externes (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flux d'appareil / aucun   ──  B1 est le *client* OAuth ici  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / applications B1        (chemin de contenu entrant)
```

Trois flèches racontent toute l'histoire : un tiers **appelle** avec un jeton bearer (clé API ou JWT OAuth, y compris via `/mcp`) ; l'API **rappelle** via des webhooks signés ; et les fournisseurs de contenu constituent l'unique chemin de **contenu entrant** où B1 lui-même est le *client* OAuth qui tire des médias depuis une source externe.

## Le modèle d'authentification partagé

Chaque identifiant — un JWT de connexion utilisateur, un jeton d'accès OAuth, ou une clé API — se résout vers le **même `Principal`** et est vérifié de la même manière. Il n'y a pas de chemin d'authentification « intégration » séparé ; un identifiant à portée limitée est simplement indiscernable d'un utilisateur avec moins de privilèges.

### Structure du JWT

Les jetons d'accès B1 sont des JWT HS256 frappés dans `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'ensemble de revendications (claims) :

| Revendication | Signification |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La personne derrière le jeton |
| `churchId` | L'unique église dans laquelle ce jeton agit — l'ancrage pour toute délimitation des données |
| `personId` | L'enregistrement de personne à l'intérieur de cette église |
| `permissions` | Tableau plat de chaînes de permission RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Appartenance/responsabilité de groupe, pour les vérifications à portée de groupe |
| `membershipStatus` | Invité vs membre, pour le filtrage en libre-service |

Un jeton d'accès OAuth a exactement la même forme, octet pour octet, qu'un JWT de connexion — la seule différence est que son tableau `permissions` a été **filtré selon les portées accordées avant la signature** (`getCombinedApiJwt(...)`).

### Délimitation par église

`churchId` est une revendication du jeton, pas un paramètre de requête, si bien qu'un identifiant ne peut jamais franchir les frontières entre églises. Chaque requête de référentiel filtre sur le `churchId` de l'appelant ; une clé API ou un jeton OAuth est lié à exactement une église au moment de sa frappe.

### Permissions basées sur les rôles à la frontière

Les contrôleurs protègent les actions avec `au.checkAccess(contentType, action)` contre le tableau `permissions` du jeton. Les portées sont un **filtre, jamais une attribution** (`Api/src/shared/auth/Scopes.ts`) : le `SCOPE_CATALOG` associe chaque portée (par ex. `people:read`, `donations:write`) aux paires RBAC qu'elle autorise, et `filterPermissionsByScopes()` croise cela avec les permissions *actuelles* de la personne à chaque résolution. Conséquences :

- Révoquer une permission dans B1Admin coupe l'accès de l'identifiant dès la requête suivante — les jetons ne dérivent jamais du rôle.
- Une portée ne peut que *retirer* des permissions, si bien qu'un identifiant à portée limitée ne peut jamais s'élever vers l'administration serveur / domaine (ces permissions sont délibérément non associées à aucune portée).
- Les clés API portent un préfixe `cak_` ; `CustomAuthProvider.getUser()` teste ce préfixe, hache le secret, et re-résout le RBAC en direct de la personne propriétaire à chaque appel.

Voir [Clés API → Portées](../api/api-keys#scopes) pour le catalogue complet.

## Référence des surfaces

### API REST

La surface complète du produit. Tout point de terminaison authentifié accepte soit un JWT soit une clé API `cak_…` dans l'en-tête `Authorization: Bearer` — il n'y a pas de table de routes séparée uniquement-par-clé ou uniquement-OAuth. Les modules et leurs chemins de base vivent sous `Api/src/modules/*`.

### Clés API

Un jeton d'accès personnel `cak_<prefix>.<secret>`, créé dans **B1Admin → Paramètres → Développeur → Clés API**. Seul un hachage SHA-256 est stocké ; la clé brute n'est affichée qu'une fois. Gérées à `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Idéal pour les scripts propres à une église et pour les connecteurs comme Zapier, Make, et Google Sheets. → **[Clés API](../api/api-keys)**

### OAuth 2.0 et applications connectées

Pour les applications multi-locataires qui ont besoin du consentement de chaque église. Implémenté dans `Api/src/modules/membership/controllers/OAuthController.ts` sous `/membership/oauth`. Le serveur prend en charge trois types d'attribution (grants) :

- **Code d'autorisation** — `POST /oauth/authorize` (authentifié) renvoie un code de courte durée ; `POST /oauth/token` avec `grant_type=authorization_code` l'échange contre un JWT d'accès (~7 jours) plus un jeton de rafraîchissement (~90 jours).
- **Code d'appareil** (RFC 8628) — `POST /oauth/device/authorize` délivre un `user_code` ; l'utilisateur l'approuve dans B1Admin (`/oauth/device/approve`) ; l'appareil sonde `/oauth/token` avec le grant de code d'appareil. Pour les téléviseurs, kiosques, et CLI sans navigateur.
- **Jeton de rafraîchissement** — `grant_type=refresh_token` frappe un nouveau jeton d'accès ; les clients publics (sans secret) peuvent omettre le secret.

Une **application connectée** est la vue côté administrateur d'église d'un jeton accordé, listée et révocable à `/membership/oauth/connections`. Le contrôleur héberge aussi un pont de **session relais** OAuth (`/oauth/relay/*`) qui permet à un appareil sans navigateur de compléter une connexion auprès d'un fournisseur *externe*. → **[Applications connectées et OAuth](../api/connected-apps)**

### Webhooks

L'unique surface sortante. Une église abonne un point de terminaison HTTPS public à des événements ; quand un changement correspondant se produit, `WebhookDispatcher.emit(churchId, event, payload)` enrichit les charges utiles ne contenant que des id avec des noms d'affichage (`personName`, `groupName`, `formName` — les recherches ne s'exécutent qu'une fois qu'un abonnement correspond), enregistre une livraison, et un travailleur en arrière-plan poste une enveloppe JSON signée avec relance/backoff et redistribution. Moteur dans `Api/src/shared/webhooks/`, CRUD par église sous `/membership/webhooks` (`WebhookController.ts`). Un champ `connectorType` remodèle le corps pour Slack / Discord. → **[Webhooks](../api/webhooks)**

### Serveur MCP

Une enveloppe orientée IA à `/mcp` (`Api/src/modules/mcp/`). Trois outils génériques — `list_endpoints`, `describe_endpoint`, `api_call` — exposent dynamiquement toute la surface REST à n'importe quel client MCP. L'authentification est le même jeton bearer que partout ailleurs, et `api_call` rentre à nouveau dans la pile Express en processus, si bien que chaque règle de permission et de délimitation par église continue de s'appliquer. → **[Serveur MCP](../api/mcp)**

### Fournisseurs de contenu

Le chemin de contenu entrant, dans le paquet séparé `Packages/content-providers` (`@churchapps/content-providers`) plutôt que dans l'API. Chaque fournisseur implémente l'interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus des crochets d'authentification — et s'auto-enregistre dans un registre `Map` (`src/providers/registry.ts`). Ici, **B1 est le client OAuth** : un fournisseur déclare un `AuthType` de `none`, `oauth_pkce`, `device_flow`, ou `form_login`, et les aides partagées (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) exécutent le PKCE côté client / le flux d'appareil contre la source externe. Onze fournisseurs sont livrés aujourd'hui — dont Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, et B1.church — alimentant FreePlay et les applications B1. → **[Fournisseur de contenu FreePlay](../freeplay-content-provider)**

## Résumé

| Surface | Mécanisme d'authentification | Direction | Où implémenté | Référence |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou clé `cak_…` | Entrant | `Api/src/modules/*` | [Clés API](../api/api-keys) |
| Clés API | Jeton `cak_` haché SHA-256 | Identifiant | `Api/.../membership/controllers/ApiKeyController.ts` | [Clés API](../api/api-keys) |
| OAuth 2.0 / Applications connectées | Code d'autorisation · appareil · rafraîchissement → JWT | Entrant | `Api/.../membership/controllers/OAuthController.ts` | [Applications connectées](../api/connected-apps) |
| Webhooks | Secret par crochet, signature HMAC-SHA256 | Sortant | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Serveur MCP | JWT `Bearer` ou clé `cak_…` | Entrant (IA) | `Api/src/modules/mcp/` | [Serveur MCP](../api/mcp) |
| Fournisseurs de contenu | Par fournisseur : aucun / OAuth PKCE / appareil / formulaire | Contenu entrant | `Packages/content-providers/` | [Fournisseur de contenu](../freeplay-content-provider) |

## Connecteurs prêts à l'emploi

Plutôt que de laisser chacun repartir de zéro, ChurchApps livre des connecteurs par-dessus les surfaces ci-dessus :

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` de webhook remodèle l'enveloppe standard en message de chat ; configuré entièrement dans B1Admin, sans compte tiers.
- **[Zapier](/docs/b1-admin/integrations/zapier)** et **[Make](/docs/b1-admin/integrations/make)** — se déclenchent sur des événements webhook et agissent via l'API REST ; ils enregistrent leur propre webhook quand un Zap/scénario est activé (nécessite une clé avec `settings:write`). Le code source de l'application Zapier vit dans le dépôt `Integrations` sous `zapier/` (Zapier CLI, déployé avec `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un module complémentaire authentifié par clé API qui exporte à la demande Personnes / Dons / Groupes / Présences.
- **[Claude](/docs/b1-admin/integrations/claude)** et **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clients MCP pointés vers `/mcp`.

Pour votre propre code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) enveloppe tout cela : un client REST typé, un client OAuth (code d'autorisation / rafraîchissement / flux d'appareil), et un vérificateur de webhook HMAC avec middleware Express.

## Pages connexes

- [Clés API](../api/api-keys) — l'identifiant le plus simple et le catalogue de portées
- [Applications connectées et OAuth](../api/connected-apps) — flux de consentement multi-locataires
- [Webhooks](../api/webhooks) — le système d'événements sortants
- [Serveur MCP](../api/mcp) — l'enveloppe d'intégration IA
- [Fournisseur de contenu FreePlay](../freeplay-content-provider) — devenir une source de contenu entrant
- [Intégrations (utilisateur final)](/docs/b1-admin/integrations/) — guides de configuration des connecteurs prêts à l'emploi
