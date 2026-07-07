---
title: "Structure du module"
---

# Structure du module

<div class="article-intro">

Chaque module API suit une structure interne cohérente avec les contrôleurs, les repositories, les modèles et les helpers. Comprendre cette disposition rend simple la navigation dans le codebase et l'ajout de nouvelles fonctionnalités à n'importe quel module.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurer l'API localement -- voir [Configuration locale de l'API](./local-setup)
- Consulter l'architecture [Base de données](./database) pour comprendre la couche d'accès aux données

</div>

## Disposition du répertoire

Les modules vivent sous `src/modules/{name}/`. Un module typique contient quatre répertoires :

```
src/modules/{name}/
├── controllers/    ← Gestionnaires de routes (points de terminaison Express)
├── repositories/   ← Couche d'accès aux données (requêtes SQL typées)
├── models/         ← Interfaces et types TypeScript
└── helpers/        ← Logique métier spécifique au module
```

Par exemple, le module membership :

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

Les six modules de données de base -- membership, attendance, content, giving, messaging et doing -- suivent tous cette disposition. Quelques modules spécialisés (comme reporting, qui sert les rapports multi-modules et ne possède aucune donnée propre) se trouvent à côté d'eux sous `src/modules/`.

## Une application, de nombreux modules

L'API est un **monolithe modulaire** : les modules marquent les limites de l'organisation du code et de la propriété des données, pas des services séparés. Au démarrage, les contrôleurs de chaque module sont enregistrés dans un seul conteneur d'injection de dépendances derrière une seule application Express, donc l'API entière est construite, exécutée et déployée en tant qu'unité unique -- les fonctions déployées décrites ci-dessous sont tous des points d'entrée vers la même application.

Les routes de chaque module vivent sous un préfixe d'URL correspondant au nom du module :

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

Cela maintient la surface API de chaque module autonome tandis que les clients parlent toujours à un seul hôte.

## Contrôleurs

Les contrôleurs définissent les routes API pour un module. Chaque module a son propre contrôleur de base (par exemple `MembershipBaseController`), qui étend le `BaseController` partagé -- lui-même construit sur `CustomBaseController` de `@churchapps/apihelper`. Les routes sont enregistrées avec les décorateurs Inversify.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = contexte utilisateur authentifié
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

Le `actionWrapper` authentifie la requête et hydrate `this.repos` avec les repositories du module avant d'exécuter votre action.

### Décorateurs de route

| Décorateur | Méthode HTTP |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

Le décorateur `@controller("/base")` définit le chemin de base pour toutes les routes du contrôleur.

## Repositories

Les repositories gèrent toutes les opérations de base de données. Il n'y a pas d'ORM -- les requêtes sont écrites avec le constructeur de requêtes Kysely, typées par rapport au schéma de base de données du module. Le `db/index.ts` de chaque module expose une fonction `getDb()` qui retourne l'instance Kysely typée du module.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

À l'intérieur d'un contrôleur, les repositories du module sont disponibles en tant que `this.repos`. En dehors des contrôleurs, obtenez-les via `RepoManager` :

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## Communication entre modules

Chaque module possède sa propre base de données (voir [Base de données](./database)), et un module ne requête jamais directement les tables d'un autre module. Quand un module a besoin de données possédées par un autre -- par exemple, le module doing résolvant les personnes de membership -- il passe par la **gateway** du module propriétaire dans `src/shared/modules/` :

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

Chaque gateway (`MembershipModuleGateway`, `GivingModuleGateway`, et ainsi de suite) est une interface TypeScript définissant exactement quelles opérations le module propriétaire expose au reste de l'API. L'interface est le contrat : les implémentations actuelles lisent la base de données du module propriétaire dans le processus, mais parce que les appelants ne dépendent que de l'interface, une implémentation pourrait être échangée -- par exemple, pour celle qui fait des appels HTTP -- si un module était jamais extrait en un service séparé.

:::info
Si les données que vous avez besoin vivent dans un autre module et sa gateway n'expose pas une opération pour cela, étendez l'interface gateway plutôt que d'atteindre les repositories ou la base de données du module pour ce qui n'existe pas encore.
:::

## Authentification et autorisation

### Authentification JWT

Toutes les requêtes sont authentifiées via les jetons JWT gérés par `CustomAuthProvider`. Le jeton est validé automatiquement et le contexte utilisateur authentifié (`au`) est disponible dans chaque action du contrôleur.

### Vérifications de permissions

Utilisez `au.checkAccess()` pour vérifier que l'utilisateur actuel dispose de la permission requise :

```typescript
au.checkAccess("People", "View");    // Accès en lecture
au.checkAccess("People", "Edit");    // Accès en écriture
```

Si l'utilisateur n'a pas la permission requise, une réponse d'erreur est retournée automatiquement.

:::warning
Appelez toujours `au.checkAccess()` avant d'effectuer des opérations de données. Ne jamais sauter les vérifications de permissions, même pour les endpoints apparemment en lecture seule.
:::

## Configuration de l'environnement

La classe `Environment` gère la configuration dans les environnements :

- **Développement local :** Lit à partir du fichier `.env` à la racine du projet
- **Environnements déployés :** Lit à partir d'AWS SSM Parameter Store

```typescript
// Accéder aux variables d'environnement
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

Cette abstraction signifie que votre code n'a pas besoin de savoir d'où provient la configuration.

## Fonctions Lambda

Lors du déploiement sur AWS, l'API s'exécute en tant que six fonctions Lambda :

| Fonction | Objectif |
|----------|---------|
| `web` | Gère toutes les requêtes API REST HTTP |
| `socket` | Gère les connexions WebSocket pour les fonctionnalités en temps réel |
| `timer15Min` | Programmée toutes les 30 minutes pour les notifications par e-mail (le nom est historique) |
| `timerMidnight` | Programmée quotidiennement pour les e-mails de résumé et la maintenance |
| `timerScheduledTasks` | Programmée quotidiennement pour les automations dues et le traitement des flux de travail en retard |
| `timerWebhooks` | Programmée chaque minute pour livrer les webhooks sortants en attente |

:::info
Localement, la fonction `web` s'exécute sur le port 8084 et la fonction `socket` s'exécute sur le port 8087. Les fonctions de minuterie peuvent être déclenchées manuellement pendant le développement.
:::

## Articles connexes

- **[Base de données](./database)** -- Chaînes de connexion, scripts de schéma et modèles d'accès aux données
- **[Configuration locale de l'API](./local-setup)** -- Guide de configuration complet étape par étape
- **[ApiHelper](../shared-libraries/api-helper)** -- La bibliothèque partagée qui fournit `CustomBaseController` et les middleware d'authentification
