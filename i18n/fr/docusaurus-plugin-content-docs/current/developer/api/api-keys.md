---
title: "Clés API"
description: "Créez, limitez par périmètre et révoquez des clés API B1 dans B1 Admin pour les scripts serveur et les connecteurs Zapier, Make ou Google Sheets, sans flux OAuth complet."
---

# Clés API

<div class="article-intro">

Les clés API (jetons d'accès personnels) sont le moyen le plus simple de vous authentifier auprès de l'API B1 depuis un script côté serveur, un connecteur tiers (Zapier, Make, Google Sheets), ou partout où un flux OAuth complet serait excessif. Une clé est liée à une personne précise dans une église précise et hérite des autorisations de cette personne, restreintes par un ensemble facultatif de périmètres (scopes).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église disposant de l'autorisation **Modifier les paramètres** crée et gère les clés
- La clé brute n'est affichée **qu'une seule fois** à la création — conservez-la immédiatement dans un endroit sûr
- Toutes les requêtes API doivent utiliser **HTTPS**

</div>

## Format de clé {#key-format}

Une clé API B1 se présente ainsi :

```
cak_<prefix>.<secret>
```

- `cak_` — identifiant fixe (le préfixe de clé API que la couche d'authentification reconnaît)
- `<prefix>` — segment de recherche public de 8 caractères
- `<secret>` — secret de 48 caractères ; seul un hachage SHA-256 est stocké côté serveur

La clé complète est présentée au serveur dans l'en-tête bearer standard :

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

La couche d'authentification de l'API dirige tout jeton commençant par `cak_` vers le chemin des clés API, hache le secret, recherche la clé par son préfixe et détermine les autorisations actuelles de la personne liée à la clé — ainsi, la révocation d'une autorisation dans B1Admin prend effet dès la requête suivante, et la clé ne se désynchronise jamais du rôle.

## Créer une clé (B1Admin) {#creating-a-key-b1admin}

1. Connectez-vous à B1Admin avec un utilisateur disposant de **Modifier les paramètres**.
2. Ouvrez **Paramètres → Développeur → Clés API**.
3. Cliquez sur **Nouvelle clé API**, donnez-lui un **Nom** reconnaissable (par ex. « Zapier — synchro des dons »), sélectionnez au moins un des **Périmètres** que la clé doit avoir, choisissez éventuellement une date d'**Expiration** (laissez vide pour une clé sans expiration), puis **Enregistrez**.
4. La clé complète `cak_…` est affichée **une seule fois** dans une boîte de dialogue. Copiez-la dans la configuration de votre intégration avant de fermer — il est impossible de la récupérer ensuite. Vous pouvez toujours créer une nouvelle clé.

## Périmètres (scopes) {#scopes}

Un périmètre **restreint** ce que peut faire une clé — il ne peut jamais accorder une autorisation que la personne sous-jacente ne possède pas. Sans périmètre, la clé porte l'ensemble des autorisations de la personne ; B1Admin exige toujours au moins un périmètre, donc une clé sans périmètre ne peut être créée que par l'API.

| Périmètre | Autorise |
|---|---|
| `people:read` / `people:write` | Consulter / modifier les personnes, les foyers, les membres de groupes |
| `groups:read` / `groups:write` | Consulter / modifier les groupes et leur composition |
| `donations:read` / `donations:write` | Consulter / enregistrer les dons |
| `attendance:read` / `attendance:write` | Consulter / enregistrer les présences, sessions, enregistrements d'arrivée |
| `forms:write` | Gérer les formulaires (l'accès en lecture est implicite en écriture) |
| `content:read` / `content:write` | Consulter / modifier le contenu du site web, les inscriptions, la diffusion en direct |
| `messaging:read` / `messaging:write` | Lire la messagerie ; l'écriture permet aussi d'envoyer des SMS |
| `roles:read` / `roles:write` | Consulter / modifier les définitions de rôles |
| `settings:read` / `settings:write` | Consulter / modifier les paramètres de l'église (**requis** pour enregistrer des webhooks par programmation) |
| `workflows:read` / `workflows:write` | Consulter les workflows et tâches / exécuter et modifier les workflows. L'exécution d'un workflow peut envoyer des courriels et des SMS, déclencher des webhooks et modifier l'appartenance à des groupes |
| `offline_access` | Autorise des jetons d'actualisation de longue durée (flux OAuth uniquement — sans effet sur les clés API) |

Les périmètres `write` incluent implicitement le `read` correspondant. Les autorisations d'administrateur de serveur et de domaine ne sont volontairement pas exposées comme périmètres — une identité limitée ne peut jamais s'élever à l'administration du site.

:::tip
Si vous utiliserez la clé pour enregistrer des webhooks (par exemple pour une intégration Zapier ou Make), la clé a besoin de `settings:write`. Une clé avec uniquement `people:read` échoue silencieusement avec une erreur 403 sur `POST /membership/webhooks`.
:::

## Utiliser une clé {#using-a-key}

Comme tout jeton bearer — chaque point de terminaison authentifié accepte les clés API exactement comme il accepte les JWT :

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Une requête dont la clé ne dispose pas de périmètres suffisants renvoie **403 Forbidden**, avec la même structure que toute erreur de refus d'autorisation.

## Gérer les clés via l'API {#managing-keys-via-the-api}

Tous les points de terminaison se trouvent sous le chemin `/membership/apiKeys` du module Membership et exigent un JWT (et non une clé API) d'un administrateur d'église disposant de **Modifier les paramètres**.

| Méthode et chemin | Rôle |
|---|---|
| `GET /membership/apiKeys` | Lister les clés de l'église (sans secret — seulement `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Liste de tous les noms de périmètres disponibles — pour une interface de création de clé |
| `POST /membership/apiKeys` | Créer une nouvelle clé. Corps : `{ "name": "...", "scopes": ["people:read"] }`. La réponse contient la clé brute `cak_…`, **une seule fois**. |
| `DELETE /membership/apiKeys/:id` | Révoquer une clé — prend effet dès la requête suivante |

Une clé révoquée cesse de fonctionner immédiatement — il n'y a aucune période de grâce.

## Bonnes pratiques {#best-practices}

- **Une clé par intégration.** En cas de compromission, vous révoquez une seule clé sans casser les autres.
- **Créez les périmètres les plus restreints possibles.** Un export vers Google Sheets n'a besoin que de `people:read`, pas de `settings:write`.
- **Liez la clé à un compte de service, pas à un membre du personnel réel.** Si un membre du personnel part, son accès à B1 prend fin — et avec lui toutes les clés créées sous son identité.
- **Conservez les clés dans un gestionnaire de secrets** (variables d'environnement de votre hébergeur, AWS Secrets Manager, etc.) — jamais dans un dépôt de code source.
- **Renouvelez les clés** si vous soupçonnez une exposition : créez une nouvelle clé, mettez à jour l'intégration, puis supprimez l'ancienne.

## En quoi c'est différent d'OAuth {#how-it-differs-from-oauth}

Les clés API conviennent lorsque **votre église est la seule à utiliser l'intégration**. Pour un connecteur qui doit accéder à de nombreuses églises, chacune avec son consentement explicite — comme une application SaaS partagée dans la communauté B1 — utilisez plutôt [OAuth et applications connectées](./connected-apps.md).

| | Clé API | OAuth |
|---|---|---|
| Qui l'installe | Un seul administrateur d'église | Chaque administrateur d'église autorise l'application |
| En-tête d'authentification | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Durée de vie du jeton | Jusqu'à révocation | Accès ≈ 7 jours, actualisation ≈ 90 jours |
| Idéal pour | Scripts internes, connecteurs Zapier/Make/Sheets | Applications tierces multi-locataires |
