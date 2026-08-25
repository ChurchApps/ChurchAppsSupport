---
title: "Surface d'intégration et d'extension"
---

# Surface d'intégration et d'extension

<div class="article-intro">

Tout ce qu'un tiers peut intégrer fonctionne via une API et un modèle d'autorisation. Cette page est la carte : elle nomme chaque surface d'intégration, montre comment elles se connectent et relie à la référence détaillée pour chacune. Si vous construisez contre B1, commencez ici pour choisir la bonne porte, puis suivez le lien vers la page qui la documente en profondeur.

</div>

## Les surfaces en un coup d'œil

Il y a six façons d'entrer ou de sortir, et elles partagent toutes la même couche d'authentification :

- **[API REST](../api/api-keys)** -- la surface complète du produit, appelable avec un jeton porteur de n'importe quel langage.
- **[Clés API](../api/api-keys)** -- les plus simples identifiants : un jeton `cak_…` lié à une personne dans une église.
- **[OAuth 2.0 et applications connectées](../api/connected-apps)** -- consentement par église pour les applications multi-locataires.
- **[Webhooks](../api/webhooks)** -- événements sortants signés et livrés de manière durable.
- **[Serveur MCP](../api/mcp)** -- un wrapper orienté vers l'IA sur l'API REST à `/mcp`.
- **[Fournisseurs de contenu](../freeplay-content-provider)** -- le chemin entrant pour les bibliothèques multimédias externes dans FreePlay et les applications B1.

Tout sauf les fournisseurs de contenu est servi par une seule API monolithique dont les modules se montent sous des chemins de base stables.

## Modèle d'authentification partagé

Chaque identifiant -- un JWT de connexion utilisateur, un jeton d'accès OAuth ou une clé API -- se résout au même **Principal** et est vérifié de la même façon. Il n'y a pas de chemin d'authentification d'intégration séparé.

## Structure JWT

Les jetons d'accès B1 sont des HS256 JWTs. L'ensemble des revendications :

| Revendication | Signification |
|---|---|
| \id\, \email\, \irstName\, \lastName\ | La personne derrière le jeton |
| \churchId\ | L'unique église dans laquelle ce jeton agit |
| \personId\ | L'enregistrement de personne dans cette église |
| \permissions\ | Tableau plat de chaînes de permissions RBAC |
| \groupIds\, \leaderGroupIds\ | Adhésion au groupe / leadership |
| \membershipStatus\ | Invité vs. membre |

Un jeton d'accès OAuth a exactement la même forme qu'un JWT de connexion -- la seule différence est que son tableau de \permissions\ a été **filtré via les scopes accordés avant de signer**.

## Référence de surface

### Clés API

Un jeton d'accès personnel \cak_<prefix>.<secret>\, créé dans **B1Admin → Paramètres → Développeur → Clés API**. Seul un hash SHA-256 est stocké. Géré à `/membership/apiKeys`. Idéal pour les scripts propres d'une seule église et pour les connecteurs comme Zapier et Make.

### OAuth 2.0 et applications connectées

Pour les applications multi-locataires qui ont besoin du consentement de chaque église. Implémenté sous `/membership/oauth`. Le serveur prend en charge trois subventions : Authorization Code, Device Code et Refresh Token.

### Webhooks

La seule surface sortante. Une église s'abonne à un point de terminaison HTTPS publique pour les événements ; quand une modification correspondante se produit, l'API envoie l'événement.

### Serveur MCP

Un wrapper orienté vers l'IA à `/mcp`. Trois outils génériques -- \list_endpoints\, \describe_endpoint\, \pi_call\ -- exposent toute la surface REST dynamiquement à n'importe quel client MCP.

### Fournisseurs de contenu

Le chemin du contenu entrant. B1 est le client OAuth ici : un fournisseur déclare un \AuthType\ et les assistants partagés exécutent le flux PKCE côté client / client contre la source externe.

## Connecteurs préconstruits

ChurchApps expédie des connecteurs sur les surfaces ci-dessus :

- **Slack & Discord** -- reshaper le webhook
- **Mailchimp** -- synchronisation des personnes dans une audience Mailchimp
- **Zapier et Make** -- déclencher sur les événements webhook et agir via l'API REST
- **Google Sheets** -- add-on authentifiée par clé API
- **Claude et ChatGPT** -- clients MCP
