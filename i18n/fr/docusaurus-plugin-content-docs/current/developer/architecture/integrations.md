---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension

<div class="article-intro">

Tout ce qu'un tiers peut brancher passe par une API et un modèle d'autorisation. Cette page est la carte : elle nomme chaque surface d'intégration, montre comment elles se connectent et renvoie à la référence détaillée pour chacune. Si vous construisez contre B1, commencez ici pour choisir la bonne porte, puis suivez le lien vers la page qui la documente en profondeur.

</div>

## Les surfaces en un coup d'œil

Il y a six façons d'entrer ou de sortir, et elles partagent toutes la même couche d'autorisation :

- **[API REST](../api/api-keys)** — la surface du produit complet, appelable avec un jeton porteur depuis n'importe quel langage.
- **[Clés API](../api/api-keys)** — les identifiants les plus simples : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** — consentement par église pour les applications multi-locataires ; émet le même JWT qu'un utilisateur reçoit.
- **[Webhooks](../api/webhooks)** — événements sortants signés et livrés de manière durable.
- **[Serveur MCP](../api/mcp)** — un wrapper orienté IA sur l'API REST à `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** — le chemin entrant pour les bibliothèques de médias externes vers FreePlay et les applications B1.

Tout sauf les fournisseurs de contenu est servi par une seule API monolithique (le dépôt [Api](https://github.com/ChurchApps/Api)) dont les modules se montent sous des chemins de base stables — `/membership`, `/giving`, `/attendance`, `/content`, `/messaging`, `/doing`, `/reporting` et `/mcp`.

## Comment c'est assemblé

```
   ┌─────────────────────┐                          ┌───────────────────────────────────────┐
   │  Application tiers   │   Bearer  cak_… / JWT    │              API B1 (Api)             │
   │  · serveur / SaaS    │ ───────────────────────▶ │  ┌─────────────────────────────────┐  │
   │  · Zapier / Make     │                          │  │ CustomAuthProvider.getUser()    │  │
   │  · Google Sheets     │                          │  │   clé cak_ ─┐                    │  │
   │  · CLI / scripts     │                          │  │   JWT OAuth ┴▶ Principal         │  │
   │  · Client IA (MCP)   │ ─── POST /mcp ──────────▶ │  │   portées filtre → permissions[]  │  │
   └─────────────────────┘                          │  └────────────────┬────────────────┘  │
             ▲                                        │                   ▼                    │
             │                                        │  Modules API : /membership /giving     │
             │        POST JSON signé                 │  /attendance /content /messaging …    │
             │   (personne / donation / groupe / …)   │                   │                    │
             └──────────── webhooks ◀─────────────────┼─ shared/webhooks/WebhookDispatcher     │
                     (durable, HMAC-SHA256 signé)     └───────────────────────────────────────┘

   Sources de contenu externes (Planning Center, Dropbox, Life.Church, CBN, …)
             │   OAuth PKCE / flux d'appareil / aucun   ──  B1 est le client OAuth *ici*  ──▶
             ▼
   Packages/content-providers   ──▶   FreePlay / applications B1        (chemin du contenu entrant)
```

Trois flèches racontent toute l'histoire : un tiers **appelle** avec un jeton porteur (clé API ou JWT OAuth, y compris via `/mcp`) ; l'API **rappelle** via des webhooks signés ; et les fournisseurs de contenu sont le seul chemin **content entrant** où B1 lui-même est le client OAuth tirant les médias d'une source externe.

## Le modèle d'authentification partagée

Chaque identifiant — un JWT de connexion utilisateur, un jeton d'accès OAuth ou une clé API — se résout au **même `Principal`** et est vérifiée de la même manière. Il n'y a pas de chemin d'authentification d'intégration séparé ; un identifiant à portée est simplement indiscernable d'un utilisateur moins privilégié.

### Structure JWT

Les jetons d'accès B1 sont des JWT HS256 créés dans `Api/src/modules/membership/auth/AuthenticatedUser.ts`. L'ensemble des réclamations :

| Réclamation | Sens |
|---|---|
| `id`, `email`, `firstName`, `lastName` | La personne derrière le jeton |
| `churchId` | L'unique église au sein de laquelle ce jeton agit — l'ancre pour tous les cadre de données |
| `personId` | Le dossier personnel à l'intérieur de cette église |
| `permissions` | Tableau plat des chaînes de permission RBAC (`[apiName_]contentType_contentId_action`) |
| `groupIds`, `leaderGroupIds` | Adhésion au groupe / direction, pour les vérifications au-delà du groupe |
| `membershipStatus` | Invité vs. membre, pour la porte d'auto-service |

Un jeton d'accès OAuth est byte-pour-byte la même forme qu'un JWT de connexion — la seule différence est que son tableau `permissions` a été **filtré via les portées accordées avant la signature** (`getCombinedApiJwt(...)`).

### Cadre par église

`churchId` est une réclamation de jeton, pas un paramètre de demande, afin un identifiant ne peut jamais atteindre les églises. Chaque requête de dépôt filtre sur le `churchId` de l'appelant ; une clé API ou un jeton OAuth est lié à exactement une église au moment de la création.

### Permissions basées sur les rôles à la limite

Les contrôleurs écontrolentles actions avec `au.checkAccess(contentType, action)` contre le tableau `permissions` du jeton. Les portées sont un **filtre, jamais une subvention** (`Api/src/shared/auth/Scopes.ts`) : la `SCOPE_CATALOG` mappe chaque portée (par ex. `people:read`, `donations:write`) aux paires RBAC qu'elle autorise, et `filterPermissionsByScopes()` intercsectionne cela avec les permissions *actuelles* de la personne sur chaque résolution. Les conséquences :

- Révoquer une permission dans B1Admin coupe l'accès de l'identifiant sur la demande suivante — les jetons ne dérivent jamais du rôle.
- Une portée ne peut que *supprimer* les permissions, de sorte qu'un identifiant à portée ne peut jamais s'élever à l'administration du serveur / domaine (ces permissions sont volontairement non mappées à aucune portée).
- Les clés API portent un préfixe `cak_` ; `CustomAuthProvider.getUser()` se branche sur elle, hash le secret et résout à nouveau le RBAC en direct de la personne propriétaire à chaque appel.

Voir [Clés API → Portées](../api/api-keys#scopes) pour le catalogue complet.

## Référence de surface

### API REST

La surface du produit complet. N'importe quel point de terminaison authentifié accepte soit un JWT soit une clé API `cak_…` dans l'en-tête `Authorization: Bearer` — il n'y a pas de table de routes séparée clé uniquement ou OAuth uniquement. Les modules et leurs chemins de base vivent sous `Api/src/modules/*`.

### Clés API

Un jeton d'accès personnel `cak_<prefix>.<secret>`, créé dans **B1Admin → Paramètres → Développeur → Clés API**. Seul un hash SHA-256 est stocké ; la clé brute est affichée une fois. Géré à `/membership/apiKeys` (`Api/src/modules/membership/controllers/ApiKeyController.ts`). Meilleur pour les propres scripts d'une unique église et pour les connecteurs comme Zapier, Make et Google Sheets. → **[Clés API](../api/api-keys)**

### OAuth 2.0 et applications connectées

Pour les applications multi-locataires qui ont besoin du consentement de chaque église. Implémenté dans `Api/src/modules/membership/controllers/OAuthController.ts` sous `/membership/oauth`. Le serveur prend en charge trois subventions :

- **Code d'autorisation** — `POST /oauth/authorize` (authentifié) retourne un code de courte durée ; `POST /oauth/token` avec `grant_type=authorization_code` l'échange contre un JWT d'accès (≈ 7 jours) plus un jeton de rafraîchissement (≈ 90 jours).
- **Code d'appareil** (RFC 8628) — `POST /oauth/device/authorize` émet un `user_code` ; l'utilisateur l'approuve dans B1Admin (`/oauth/device/approve`) ; l'appareil interroge `/oauth/token` avec la subvention de code d'appareil. Pour les TV, les kiosques et les CLI sans navigateur.
- **Jeton de rafraîchissement** — `grant_type=refresh_token` crée un nouveau jeton d'accès ; les clients publics (sans secret) peuvent omettre le secret.

Une **Application connectée** est la vue du côté administrateur d'église d'un jeton accordé, listé et révocable à `/membership/oauth/connections`. Le contrôleur héberge également un pont de **séance relais** OAuth (`/oauth/relay/*`) qui permet à un appareil sans navigateur de compléter une connexion contre un fournisseur *externe*. → **[Applications connectées et OAuth](../api/connected-apps)**

### Webhooks

La seule surface sortante. Une église s'abonne à un point de terminaison HTTPS public pour les événements ; lorsqu'une modification correspondante se produit, `WebhookDispatcher.emit(churchId, event, payload)` enrichit les charges utiles avec id uniquement avec les noms d'affichage (`personName`, `groupName`, `formName` — les recherches ne s'exécutent qu'une fois qu'un abonnement correspond), enregistre une livraison et un processus de fond POST une enveloppe JSON signée avec retry/backoff et renvoi. Moteur à `Api/src/shared/webhooks/`, CRUD par église sous `/membership/webhooks` (`WebhookController.ts`). Un champ `connectorType` remet en forme le corps pour Slack / Discord ; le connecteur `mailchimp` va plus loin et possède l'échange HTTP complet (méthode/URL/auth par événement contre l'API Mailchimp, identifiants chiffrés dans `webhooks.connectorConfig`). → **[Webhooks](../api/webhooks)**

### Serveur MCP

Un wrapper orienté IA à `/mcp` (`Api/src/modules/mcp/`). Trois outils génériques — `list_endpoints`, `describe_endpoint`, `api_call` — exposent la surface REST complète de manière dynamique à n'importe quel client MCP. L'autorisation est le même jeton porteur que tout le reste, et `api_call` rentre dans la pile Express en cours de processus afin que chaque permission et règle de cadre d'église s'applique toujours. → **[Serveur MCP](../api/mcp)**

### Fournisseurs de contenu

Le chemin du contenu entrant, dans le paquet séparé `Packages/content-providers` (`@churchapps/content-providers`) plutôt que l'API. Chaque fournisseur implémente l'interface `IProvider` (`src/interfaces.ts`) — `browse`, `getPlaylist`, `getInstructions`, plus les crochets d'authentification — et s'enregistre automatiquement dans un registre `Map` (`src/providers/registry.ts`). Ici **B1 est le client OAuth** : un fournisseur déclare un `AuthType` de `none`, `oauth_pkce`, `device_flow` ou `form_login`, et les aides partagées (`OAuthHelper`, `DeviceFlowHelper`, `TokenHelper`, `ApiHelper`) exécutent le PKCE client / le flux d'appareil contre la source externe. Onze fournisseurs naviguent aujourd'hui — y compris Planning Center, Dropbox, Life.Church, CBN, BibleProject, Jesus Film, Lessons.church et B1.church — alimentant FreePlay et les applications B1. → **[Fournisseur de contenu FreePlay](../freeplay-content-provider)**

## Résumé

| Surface | Mécanisme d'authentification | Direction | Où implémenté | Référence |
|---|---|---|---|---|
| API REST | `Bearer` JWT ou clé `cak_…` | Entrant | `Api/src/modules/*` | [Clés API](../api/api-keys) |
| Clés API | Jeton `cak_` haché SHA-256 | Identifiant | `Api/.../membership/controllers/ApiKeyController.ts` | [Clés API](../api/api-keys) |
| OAuth 2.0 / Applications connectées | Code auth · appareil · rafraîchir → JWT | Entrant | `Api/.../membership/controllers/OAuthController.ts` | [Applications connectées](../api/connected-apps) |
| Webhooks | Secret par crochet, signature HMAC-SHA256 | Sortant | `Api/src/shared/webhooks/` + `WebhookController.ts` | [Webhooks](../api/webhooks) |
| Serveur MCP | `Bearer` JWT ou clé `cak_…` | Entrant (IA) | `Api/src/modules/mcp/` | [Serveur MCP](../api/mcp) |
| Fournisseurs de contenu | Par fournisseur : aucun / OAuth PKCE / appareil / formulaire | Contenu entrant | `Packages/content-providers/` | [Fournisseur de contenu](../freeplay-content-provider) |

## Connecteurs pré-construits

Plutôt que tout le monde construire de zéro, ChurchApps expédie les connecteurs au-dessus des surfaces ci-dessus :

- **[Slack & Discord](/docs/b1-admin/integrations/slack-discord)** — un webhook `connectorType` remet en forme l'enveloppe standard dans un message de chat ; configuré entièrement dans B1Admin, aucun compte tiers.
- **[Mailchimp](/docs/b1-admin/integrations/services/mailchimp)** — un `connectorType` mailchimp qui synchronise les personnes dans une audience Mailchimp et mappe l'adhésion au groupe/liste aux balises (`Api/src/shared/webhooks/MailchimpConnector.ts`). Contrairement aux connecteurs de chat, il émet ses propres demandes authentifiées par événement (upsert/archive/tag) au lieu de POSTER vers une URL fournie par l'église ; la clé API et l'id d'audience vivent chiffrés dans `webhooks.connectorConfig`. Unidirectionnel, champs de fusion standard uniquement.
- **[Zapier](/docs/b1-admin/integrations/zapier)** et **[Make](/docs/b1-admin/integrations/make)** — déclenchez sur les événements webhook et agissez via l'API REST ; ils enregistrent leurs propres webhook lorsqu'un Zap/scénario s'active (a besoin d'une clé avec `settings:write`). La source de l'application Zapier vit dans le dépôt `Integrations` sous `zapier/` (Zapier CLI, déployé avec `zapier push`).
- **[Google Sheets](/docs/b1-admin/integrations/google-sheets)** — un add-on authentifié par clé API qui exporte Personnes / Donations / Groupes / Présence à la demande.
- **[Claude](/docs/b1-admin/integrations/claude)** et **[ChatGPT](/docs/b1-admin/integrations/chatgpt)** — clients MCP pointés sur `/mcp`.

Pour votre propre code, **[`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)** (`Packages/integration-sdk`) enveloppe tout cela : un client REST typé, un client OAuth (code d'authentification / rafraîchir / flux d'appareil) et un vérificateur de webhook HMAC avec middleware Express.

## Pages associées

- [Clés API](../api/api-keys) — l'identifiant le plus simple et le catalogue de portées
- [Applications connectées et OAuth](../api/connected-apps) — flux de consentement multi-locataires
- [Webhooks](../api/webhooks) — le système d'événements sortants
- [Serveur MCP](../api/mcp) — le wrapper d'intégration IA
- [Fournisseur de contenu FreePlay](../freeplay-content-provider) — devenir une source de contenu entrant
- [Intégrations (utilisateur final)](/docs/b1-admin/integrations/) — guides de configuration des connecteurs pré-construits
