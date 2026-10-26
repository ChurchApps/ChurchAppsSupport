---
title: "Clés d'API"
---

# Clés d'API

<div class="article-intro">

Les clés d'API (jetons d'accès personnels) constituent le moyen le plus simple de s'authentifier auprès de l'API B1 depuis un script serveur, un connecteur tiers (Zapier, Make, Google Sheets), ou dans tout cas où un flux OAuth complet serait disproportionné. Une clé est liée à une personne précise dans une église précise et hérite des autorisations de cette personne, restreintes par un ensemble optionnel de portées.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église disposant de l'autorisation **Modifier les paramètres** crée et gère les clés
- La clé brute n'est affichée **qu'une seule fois** lors de sa création -- conservez-la immédiatement dans un endroit sûr
- Toutes les requêtes API doivent utiliser **HTTPS**

</div>

## Format de la clé

Une clé d'API B1 se présente ainsi :

```
cak_<prefix>.<secret>
```

- `cak_` — identifiant fixe (le préfixe des clés d'API sur lequel la couche d'authentification se base)
- `<prefix>` — segment de recherche public de 8 caractères
- `<secret>` — secret de 48 caractères ; seul un hachage SHA-256 est stocké côté serveur

La clé complète est présentée au serveur dans l'en-tête bearer standard :

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

La couche d'authentification de l'API dirige tout jeton commençant par `cak_` vers le traitement des clés d'API, hache le secret, recherche la clé par son préfixe et résout les autorisations actuelles de la personne liée à la clé. Ainsi, révoquer une autorisation dans B1Admin prend effet dès la requête suivante, et la clé ne se désynchronise jamais du rôle.

## Créer une clé (B1Admin)

1. Connectez-vous à B1Admin avec un utilisateur disposant de **Modifier les paramètres**.
2. Ouvrez **Paramètres → Développeur → Clés d'API**.
3. Cliquez sur **Nouvelle clé d'API**, donnez-lui un nom reconnaissable (par ex. « Zapier — synchronisation des dons »), sélectionnez les portées que la clé doit avoir, puis **Enregistrez**.
4. La clé `cak_…` complète est affichée **une seule fois** dans une fenêtre. Copiez-la dans la configuration de votre intégration avant de fermer la fenêtre : il est impossible de la récupérer ensuite. Vous pouvez toujours créer une nouvelle clé.

## Portées

Une portée **restreint** ce que peut faire une clé -- elle ne peut jamais accorder une autorisation que la personne sous-jacente ne possède pas. Sans portée (ou aucune portée), la clé dispose de l'ensemble complet des autorisations de la personne.

| Portée | Autorise |
|---|---|
| `people:read` / `people:write` | Consulter / modifier les personnes, les foyers, les membres des groupes |
| `groups:read` / `groups:write` | Consulter / modifier les groupes et leurs membres |
| `donations:read` / `donations:write` | Consulter / enregistrer les dons |
| `attendance:read` / `attendance:write` | Consulter / enregistrer les présences, séances, pointages |
| `forms:write` | Gérer les formulaires (l'accès en lecture est implicite en écriture) |
| `content:read` / `content:write` | Consulter / modifier le contenu du site web, les inscriptions, la diffusion en direct |
| `messaging:read` / `messaging:write` | Lire la messagerie ; l'écriture permet aussi d'envoyer des SMS |
| `roles:read` / `roles:write` | Consulter / modifier les définitions de rôles |
| `settings:read` / `settings:write` | Consulter / modifier les paramètres de l'église (**requis** pour enregistrer des webhooks par programmation) |
| `workflows:read` / `workflows:write` | Consulter les workflows et tâches / exécuter et modifier les workflows. L'exécution d'un workflow peut envoyer des e-mails et des SMS, déclencher des webhooks et modifier l'appartenance à des groupes |
| `offline_access` | Autorise les jetons de rafraîchissement de longue durée (flux OAuth uniquement -- sans effet sur les clés d'API) |

Les portées `write` incluent implicitement la portée `read` correspondante. Les autorisations d'administrateur serveur et de domaine ne sont volontairement pas exposées comme portées -- un identifiant limité ne peut jamais s'élever au rang d'administrateur du site.

:::tip
Si vous utiliserez la clé pour enregistrer des webhooks (par ex. pour une intégration Zapier ou Make), la clé a besoin de `settings:write`. Une clé ne disposant que de `people:read` échoue silencieusement avec une erreur 403 sur `POST /membership/webhooks`.
:::

## Utiliser une clé

Comme tout jeton bearer -- chaque point d'accès authentifié accepte les clés d'API exactement comme il accepte les JWT :

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Une requête dont la clé ne dispose pas des portées suffisantes reçoit une réponse **403 Forbidden** avec la même structure que celle de toute erreur de refus d'autorisation.

## Gérer les clés via l'API

Tous les points d'accès se trouvent sous le chemin `/membership/apiKeys` du module Membership et nécessitent un JWT (et non une clé d'API) émis pour un administrateur d'église disposant de **Modifier les paramètres**.

| Méthode et chemin | Rôle |
|---|---|
| `GET /membership/apiKeys` | Lister les clés de l'église (sans le secret -- uniquement `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Lister toutes les portées disponibles -- pour une interface de création de clé |
| `POST /membership/apiKeys` | Créer une nouvelle clé. Corps : `{ "name": "...", "scopes": ["people:read"] }`. La réponse contient la clé brute `cak_…`, **une seule fois**. |
| `DELETE /membership/apiKeys/:id` | Révoquer une clé -- prend effet dès la requête suivante |

Une clé révoquée est immédiatement inutilisable -- il n'y a aucune période de grâce.

## Bonnes pratiques

- **Une clé par intégration.** En cas de compromission, vous révoquez une seule clé sans casser les autres.
- **Créez les portées les plus restreintes qui fonctionnent.** Un export vers Google Sheets n'a besoin que de `people:read`, pas de `settings:write`.
- **Liez la clé à un compte de service, pas à un membre du personnel.** Si un membre du personnel quitte l'église, son accès à B1 prend fin -- et avec lui, toutes les clés créées sous son identité.
- **Conservez les clés dans un gestionnaire de secrets** (variables d'environnement de votre hébergeur, AWS Secrets Manager, etc.) -- jamais dans un gestionnaire de versions.
- **Renouvelez les clés** si vous suspectez une fuite : créez une nouvelle clé, mettez à jour l'intégration, puis supprimez l'ancienne.

## En quoi elles diffèrent d'OAuth

Les clés d'API conviennent lorsque **votre église est la seule à utiliser l'intégration**. Pour un connecteur qui doit accéder aux données de nombreuses églises, chacune donnant son consentement explicite -- comme une application SaaS partagée au sein de la communauté B1 -- utilisez plutôt [OAuth et applications connectées](./connected-apps).

| | Clé d'API | OAuth |
|---|---|---|
| Qui l'installe | Un seul administrateur d'église | Chaque administrateur d'église autorise l'application |
| En-tête d'authentification | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durée de vie du jeton | Jusqu'à révocation | Accès ≈ 7 jours, rafraîchissement ≈ 90 jours |
| Idéal pour | Scripts internes, connecteurs Zapier/Make/Sheets | Applications tierces multi-locataires |
