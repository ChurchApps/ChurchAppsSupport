---
title: "Clés API"
---

# Clés API

<div class="article-intro">

Les clés API (jetons d'accès personnel) sont le moyen le plus simple de s'authentifier auprès de l'API B1 à partir d'un script côté serveur, un connecteur tiers (Zapier, Make, Google Sheets), ou partout où un flux OAuth complet est excessif. Une clé est liée à une personne spécifique dans une église spécifique et hérite des permissions de cette personne, restreinte par un ensemble optionnel de portées.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Modifier les paramètres** crée et gère les clés
- La clé brute est affichée **une seule fois** à la création -- stockez-la quelque part en toute sécurité immédiatement
- Toutes les requêtes API doivent utiliser **HTTPS**

</div>

## Format de clé

Une clé API B1 ressemble à :

```
cak_<prefix>.<secret>
```

- `cak_` — identifiant fixe (le préfixe de clé API que la couche auth fait correspondre)
- `<prefix>` — segment de consultation publique de 8 caractères
- `<secret>` — secret de 48 caractères ; seul un hash SHA-256 est stocké côté serveur

La clé complète est présentée au serveur dans l'en-tête porteur standard :

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

La couche auth de l'API achemine tout jeton commençant par `cak_` vers le chemin de clé API, hash le secret, le recherche par préfixe et résout les permissions actuelles de la personne de la clé -- donc révoquer une permission dans B1Admin prend effet à la prochaine requête, et la clé ne s'écarte jamais de la limite.

## Création d'une clé (B1Admin)

1. Connectez-vous à B1Admin en tant qu'utilisateur avec **Modifier les paramètres**.
2. Ouvrez **Paramètres → Développeur → Clés API**.
3. Cliquez sur **Nouvelle clé API**, donnez-lui un nom reconnaissable (par exemple « Zapier — synchronisation des donations »), sélectionnez les portées que la clé doit avoir, et **Enregistrer**.
4. La clé complète `cak_…` est affichée **une seule fois** dans un dialogue. Copiez-la dans la configuration de votre intégration avant de fermer -- il n'y a pas de moyen de la récupérer plus tard. Vous pouvez toujours créer une nouvelle clé.

## Portées

Une portée **restreint** ce qu'une clé peut faire -- elle ne peut jamais accorder une permission que la personne sous-jacente n'a pas. Portées vides / nulles signifie que la clé porte l'ensemble complet des permissions de la personne.

| Portée | Permet |
|---|---|
| `people:read` / `people:write` | Afficher / modifier les personnes, les ménages, les membres du groupe |
| `groups:read` / `groups:write` | Afficher / modifier les groupes et leur adhésion |
| `donations:read` / `donations:write` | Afficher / enregistrer les donations |
| `attendance:read` / `attendance:write` | Afficher / enregistrer l'assiduité, les sessions, les enregistrements |
| `forms:write` | Gérer les formulaires (l'accès en lecture est implicite dans l'écriture) |
| `content:read` / `content:write` | Afficher / modifier le contenu du site Web, les inscriptions, le streaming |
| `messaging:read` / `messaging:write` | Messagerie de lecture ; l'écriture permet également l'envoi de SMS |
| `roles:read` / `roles:write` | Afficher / modifier les définitions de rôle |
| `settings:read` / `settings:write` | Afficher / modifier les paramètres de l'église (**requis** pour enregistrer les webhooks par programme) |
| `offline_access` | Permettre les jetons de rafraîchissement de longue durée (flux OAuth uniquement -- n'a aucun effet sur les clés API) |

Les portées `write` incluent implicitement le `read` correspondant. Les permissions d'administrateur de serveur et de domaine ne sont délibérément pas exposées comme des portées -- une credential scopée ne peut jamais élever vers l'administration du site.

:::tip
Si vous utiliserez la clé pour enregistrer les webhooks (par exemple, pour une intégration Zapier ou Make), la clé a besoin de `settings:write`. Une clé `people:read`-uniquement s'affichera silencieusement 403 sur `POST /membership/webhooks`.
:::

## Utilisation d'une clé

Comme n'importe quel jeton porteur -- chaque point de terminaison authentifié accepte les clés API exactement comme il accepte les JWTs :

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Une requête dont la clé a des portées insuffisantes répond **403 Interdit** avec la même forme que toute erreur de permission refusée utilise.

## Gestion des clés via l'API

Tous les points de terminaison sont sous le chemin `/membership/apiKeys` du module Membership et nécessitent un JWT (pas une clé API) d'un administrateur d'église avec **Modifier les paramètres**.

| Méthode et chemin | Objectif |
|---|---|
| `GET /membership/apiKeys` | Lister les clés de l'église (pas de secret -- uniquement `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste de tous les noms de portée disponibles -- pour une IU de création de clé |
| `POST /membership/apiKeys` | Créer une nouvelle clé. Corps : `{ "name": "...", "scopes": ["people:read"] }`. La réponse inclut la clé brute `cak_…` **une seule fois**. |
| `DELETE /membership/apiKeys/:id` | Révoquer une clé -- prend effet à la prochaine requête |

Une clé révoquée est disparue immédiatement -- il n'y a pas de période de grâce.

## Meilleures pratiques

- **Une clé par intégration.** Si quelque chose est compromis, vous révoquez une seule clé sans casser les autres.
- **Créez les portées les plus étroites qui fonctionnent.** Une export Google Sheets n'a besoin que de `people:read`, pas `settings:write`.
- **Liez la clé à un compte de service, pas à un vrai membre du personnel.** Si un membre du personnel s'en va, son accès B1 se termine -- et aussi toutes les clés créées sous son identité.
- **Stockez les clés dans un gestionnaire de secrets** (les variables d'environnement de votre fournisseur d'hébergement, AWS Secrets Manager, etc.) -- jamais dans le contrôle de source.
- **Faites pivoter les clés** si vous soupçonnez une exposition : créez une nouvelle clé, mettez à jour l'intégration, puis supprimez l'ancienne.

## Comment c'est différent de OAuth

Les clés API sont appropriées quand **votre église est la seule à utiliser l'intégration**. Pour un connecteur qui doit accéder à de nombreuses églises avec le consentement explicite de chacune -- comme une application SaaS partagée dans la communauté B1 -- utilisez plutôt [OAuth et les applications connectées](./connected-apps).

| | Clé API | OAuth |
|---|---|---|
| Qui l'installe | Un administrateur d'église | Chaque administrateur d'église autorise l'application |
| En-tête d'authentification | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durée de vie du jeton | Jusqu'à révocation | Accès ≈ 7 jours, rafraîchissement ≈ 90 jours |
| Idéal pour | Scripts internes, connecteurs Zapier/Make/Sheets | Applications tierces multi-tenant |
