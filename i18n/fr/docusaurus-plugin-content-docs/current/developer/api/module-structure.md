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

Chaque module vit sous `src/modules/{name}/` et contient quatre répertoires :

```
src/modules/{name}/
├── controllers/    ← Gestionnaires de routes (endpoints Express)
├── repositories/   ← Couche d'accès aux données (SQL direct)
├── models/         ← Interfaces TypeScript et types
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
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## Contrôleurs

Les contrôleurs définissent les routes API d'un module. Ils étendent `CustomBaseController` de `@churchapps/apihelper` et utilisent les décorateurs Inversify pour l'enregistrement des routes.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = contexte utilisateur authentifié
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... logique de sauvegarde
    });
  }
}
```

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

Les repositories gèrent toutes les opérations de base de données en utilisant SQL direct via `DB.query()`. Il n'y a pas d'ORM -- vous écrivez le SQL directement.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // Logique INSERT ou UPDATE
  }
}
```

Accédez aux repositories via le `RepositoryManager` :

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

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

Lorsqu'il est déployé sur AWS, l'API s'exécute en tant que quatre fonctions Lambda :

| Fonction | Objectif |
|----------|---------|
| `web` | Gère toutes les requêtes API REST HTTP |
| `socket` | Gère les connexions WebSocket pour les fonctionnalités en temps réel |
| `timer15Min` | Programmé tous les 15 minutes pour les notifications par e-mail |
| `timerMidnight` | Programmé quotidiennement pour les e-mails de résumé et la maintenance |

:::info
Localement, la fonction `web` s'exécute sur le port 8084 et la fonction `socket` s'exécute sur le port 8087. Les fonctions de minuterie peuvent être déclenchées manuellement pendant le développement.
:::

## Articles connexes

- **[Base de données](./database)** -- Chaînes de connexion, scripts de schéma et modèles d'accès aux données
- **[Configuration locale de l'API](./local-setup)** -- Guide complet étape par étape
- **[ApiHelper](../shared-libraries/api-helper)** -- La bibliothèque partagée qui fournit `CustomBaseController` et les middleware d'authentification
