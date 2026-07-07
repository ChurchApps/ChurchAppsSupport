---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension

<div class="article-intro">

Tout ce qu'un tiers peut brancher court via une API et un modèle d'autorisation. Cette page est la carte : elle nomme chaque surface d'intégration, montre comment elles se connectent, et relie à la référence détaillée pour chacune. Si vous construisez contre B1, commencez ici pour choisir la bonne porte, puis suivez le lien à la page qui la documente en profondeur.

</div>

## Les surfaces d'un coup d'œil

Il y a six voies vers l'intérieur ou l'extérieur, et elles partagent tous la même couche d'authentification :

- **[API REST](../api/api-keys)** — la surface du produit entière, appelable avec un jeton bearer de n'importe quel langage.
- **[Clés API](../api/api-keys)** — la credential la plus simple : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** — consentement par église pour les applications multi-locataires ; émet le même JWT qu'un utilisateur.
- **[Webhooks](../api/webhooks)** — événements sortants signés, durables-livrés.
- **[Serveur MCP](../api/mcp)** — un enveloppe face à l'IA sur l'API REST à `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** — le chemin entrant pour les bibliothèques de médias externes vers FreePlay et les applications B1.

Tout sauf les fournisseurs de contenu est servi par une seule API monolithique (le dépôt [Api](https://github.com/ChurchApps/Api)) dont les modules montent sous les chemins de base stables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting`, et `/mcp`.

## Comment il s'emboîte

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Application tierce  │   Bearer  cak_… / JWT    │              API B1 (Api)              │
   │  · serveur / SaaS     │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clé cak_ ─┐                    │  │
   │  · CLI / scripts     │                          │  │   OAuth JWT ┴▶ Principal          │  │
   │  · Client IA (MCP)   │ ─── POST /mcp ──────────▶ │  │   portées filtrer → permissions[] │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Modules API : /membership /giving     │
             │        POST JSON signé                │  /attendance /content /messaging …    │
             │   (personne / don / groupe / …)      │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signé)     └───────────────────────────────────────┘

   Sources de contenu externes (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flux d'appareil / aucun   ──  B1 est le client OAuth *ici* ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / applications B1        (chemin de contenu entrant)
```

Trois flèches racontent toute l'histoire : une tierce partie **appelle** avec un jeton bearer (clé API ou OAuth JWT, y compris via `/mcp`) ; l'API **rappelle** via des webhooks signés ; et les fournisseurs de contenu sont l'unique chemin de **contenu entrant** où B1 lui-même est le client OAuth tirant le médias d'une source externe.

## Le modèle d'authentification partagée

Toute credential — un JWT de connexion d'utilisateur, un jeton d'accès OAuth, ou une clé API — se résout au même `Principal` et est vérifiée de la même manière. Il n'y a pas de chemin d'authentification "intégration" séparé ; une credential limitée est simplement indiscernable d'un utilisateur avec des permissions inférieures.

### Structure JWT

Les jetons d'accès B1 sont des HS256 JWTs frappés dans `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'ensemble de claims :

| Claim | Sens |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La personne derrière le jeton |
| `churchId` | La seule église que ce jeton agit à l'intérieur — l'ancre pour toute portée de données |
| `personId` | L'enregistrement de personne à l'intérieur de cette église |
| `permissions` | Tableau plat de chaînes de permission RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Adhésion de groupe / leadership, pour les vérifications limitées au groupe |
| `membershipStatus` | Invité contre membre, pour le gate automatique |

Un jeton d'accès OAuth est octet-pour-octet la même forme qu'un JWT de connexion — la seule différence est que son tableau `permissions` a été **filtré via les portées accordées avant de signer** (`getCombinedApiJwt(...)`).

### Portée par église

`churchId` est une réclamation de jeton, pas un paramètre de demande, donc une credential ne peut jamais atteindre les églises. Chaque requête du référentiel filtre sur le `churchId` de l'appelant ; une clé API ou jeton OAuth est lié à exactement une église au moment de la frappe.

### Permissions basées sur les rôles à la limite

Les contrôleurs ferment les actions avec `au.checkAccess(contentType, action)` par rapport au tableau `permissions` du jeton. Les portées sont un **filtre, jamais une subvention** (`Api/src/shared/auth/Scopes.ts`) : le `SCOPE_CATALOG` mappe chaque portée (par ex. `people:read`, `donations:write`) aux paires RBAC qu'elle permet, et `filterPermissionsByScopes()` croise cela avec les permissions *actuelles* de la personne sur chaque résolution. Conséquences :

- Révoquer une permission dans B1Admin coupe l'accès de la credential à la demande suivante — les jetons ne dérivent jamais du rôle.
- Une portée ne peut jamais *supprimer* les permissions, donc une credential limitée ne peut jamais s'élever vers le serveur / l'administration de domaine (ces permissions sont intentionnellement non-mapées à aucune portée).
- Les clés API portent un préfixe `cak_` ; `CustomAuthProvider.getUser()` se branche sur lui, hache le secret, et re-résout le RBAC en direct du propriétaire à chaque appel.

Voir [Clés API → Portées](../api/api-keys#scopes) pour le catalogue complet.

## Référence de surface

### API REST

La surface de produit complet. N'importe quel point de terminaison authentifié accepte soit un JWT soit une clé API `cak_…` dans l'en-tête `Authorization: Bearer` — il n'y a pas de table de routes séparé clé-seulement ou OAuth-seulement. Les modules et leurs chemins de base vivent sous `Api/src/modules/*`.

### Clés API

Un jeton `cak_<prefix>.<secret>` d'accès personnel, créé dans **B1Admin → Paramètres → Développeur → Clés API**. Seulement un hachage SHA-256 est stocké ; la clé brute est affichée une fois. Géré à `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Mieux pour les scripts d'une seule église et pour les connecteurs comme Zapier, Make, et Google Sheets. → **[Clés API](../api/api-keys)**

### OAuth 2.0 et applications connectées

Pour les applications multi-locataires qui ont besoin que chaque église consente. Implémenté dans `Api/src/modules/membership/controllers/OAuthController.ts` sous `/membership/oauth`. Le serveur supporte trois subventions :

- **Code d'autorisation** — `POST /oauth/authorize` (authentifié) retourne un code de courte durée ; `POST /oauth/token` avec `grant_type=authorization_code` l'échange pour un JWT d'accès (~7 jours) plus un jeton de rafraîchissement (~90 jours).
- **Code d'appareil** (RFC 8628) — `POST /oauth/device/authorize` délivre un `user_code` ; l'utilisateur l'approuve dans B1Admin (`/oauth/device/approve`) ; l'appareil sonde `/oauth/token` avec la subvention d'appareil. Pour les téléviseurs, kiosques, et CLIs sans navigateur.
- **Jeton de rafraîchissement** — `grant_type=refresh_token` frappe un nouveau jeton d'accès ; les clients publics (sans secret) peuvent omettre le secret.

Une **application connectée** est la vue face à l'administrateur d'église d'un jeton accordé, listé et révocable à `/membership/oauth/connections`. Le contrôleur accueille également un pont de **relais-session** OAuth (`/oauth/relay/*`) qui permet à un appareil sans navigateur de compléter une connexion contre un fournisseur *externe*. → **[Applications connectées et OAuth](../api/connected-apps)**

### Webhooks

La seule surface sortante. Une église s'abonne à un point de terminaison HTTPS public pour les événements ; quand un changement appairé se produit, `WebhookDispatcher.emit(churchId, event, payload)` enregistre une livraison et un travailleur de fond POSTE une enveloppe JSON signée avec relance/backoff et reliaison. Moteur à `Api/src/shared/webhooks/`, CRUD par église sous `/membership/webhooks` (`WebhookController.ts`). Un champ `connectorType` remodèle le corps pour Slack / Discord. → **[Webhooks](../api/webhooks)**

### Serveur MCP

Un enveloppe face à l'IA à `/mcp` (`Api/src/modules/mcp/`). Trois outils génériques — `list_endpoints`, `describe_endpoint`, `api_call` — exposent la surface REST entière de manière dynamique à n'importe quel client MCP. L'authentification est le même jeton bearer que tout le reste, et `api_call` re-rentre la pile Express en processus pour que chaque permission et règle de portée d'église s'appliquent toujours. → **[Serveur MCP](../api/mcp)**

### Fournisseurs de contenu

Le chemin de contenu entrant, dans le package séparé `Packages/content-providers` (`@churchapps/content-providers`) plutôt que l'API. Chaque fournisseur implémente l'interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus les crochets d'authentification — et s'auto-enregistre dans un registre `Map` (`src/providers/registry.ts`). Ici **B1 est le client OAuth** : un fournisseur déclare un `AuthType` de `none`, `oauth_pkce`, `device_flow`, ou `form_login`, et les aides partagées (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) exécutent le PKCE client-side / le flux d'appareil contre la source externe. Onze fournisseurs navire aujourd'hui — y compris Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church, et B1.church — alimentant FreePlay et les applications B1. → **[Fournisseur de contenu FreePlay](../freeplay-content-provider)**

## Résumé

| Surface | Mécanisme d'authentification | Direction | Où implémenté | Référence |
|---|---|---|---|---|
| API REST | JWT `Bearer` ou clé `cak_…` | Entrant | `Api/src/modules/*` | [Clés API](../api/api-keys) |
| Clés API | Jeton `cak_` haché SHA-256 | Credential | `Api/.../membership/controllers/ApiKeyController.ts` | [Clés API](../api/api-keys) |
| OAuth 2.0 / Applications connectées | Code d'autorisation · appareil · rafraîchissement → JWT | Entrant | `Api/.../membership/controllers/OAuthController.ts` | [Applications connectées](../api/connected-apps) |
| Webhooks | Par secret de crochet, signature HMAC-SHA256 | Sortant | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Serveur MCP | JWT `Bearer` ou clé `cak_…` | Entrant (IA) | `Api/src/modules/mcp/` | [Serveur MCP](../api/mcp) |
| Fournisseurs de contenu | Par fournisseur : aucun / OAuth PKCE / appareil / formulaire | Contenu entrant | `Packages/content-providers/` | [Fournisseur de contenu](../freeplay-content-provider) |

## Connecteurs pré-construits

Plutôt que chacun construit à partir de zéro, ChurchApps navire les connecteurs au-dessus des surfaces ci-dessus :

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — un `connectorType` webhook remodèle l'enveloppe standard en un message de chat ; configuré entièrement dans B1Admin, pas de compte tiers.
- **[Zapier](/docs/b1-admin/integrations/zapier)** et **[Make](/docs/b1-admin/integrations/make)** — déclencher sur les événements webhook et agir via l'API REST ; ils enregistrent leur propre webhook quand un Zap/scénario s'active (a besoin d'une clé avec `settings:write`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un module d'extension authentifié par clé API qui exporte les personnes / dons / groupes / présence à la demande.
- **[Claude](/docs/b1-admin/integrations/claude)** et **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clients MCP pointés à `/mcp`.

Pour votre propre code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) enveloppe tout : un client REST typé, un client OAuth (code-auth / rafraîchissement / flux d'appareil), et un vérificateur webhook HMAC avec middleware Express.

## Pages connexes

- [Clés API](../api/api-keys) — la credential la plus simple et le catalogue de portée
- [Applications connectées et OAuth](../api/connected-apps) — flux de consentement multi-locataire
- [Webhooks](../api/webhooks) — le système d'événement sortant
- [Serveur MCP](../api/mcp) — l'enveloppe d'intégration IA
- [Fournisseur de contenu FreePlay](../freeplay-content-provider) — devenir une source de contenu entrant
- [Intégrations (end-user)](/docs/b1-admin/integrations/) — guides de configuration du connecteur pré-construits
