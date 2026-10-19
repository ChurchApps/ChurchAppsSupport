---
title: "Déploiement de l'API"
---

# Déploiement de l'API

<div class="article-intro">

Les API ChurchApps sont déployées sous forme de fonctions AWS Lambda à l'aide de Serverless Framework. Cette page décrit le flux de compilation, de déploiement et de configuration pour les environnements de démonstration et de production.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez l'API en local -- voir [Configuration locale de l'API](../api/local-setup)
- Configurez vos identifiants AWS sur votre machine
- Assurez-vous d'avoir accès au compte AWS cible

</div>

## Compilation

Les API sont compilées pour la production à l'aide d'une configuration TypeScript dédiée :

```bash
npm run build:prod
```

Cette commande utilise `tsconfig.prod.json` pour compiler le projet pour l'environnement d'exécution Lambda.

## Déploiement

Déployer dans l'environnement de démonstration :

```bash
npm run deploy-demo
```

Déployer en production :

```bash
npm run deploy-prod
```

En pratique, l'API est déployée par GitHub Actions : **Deploy Demo** s'exécute à chaque push sur `main`, et **Deploy Prod** est lancé manuellement (déclenchement du workflow). Il n'existe plus d'environnement de préproduction.

## Migrations de base de données

**Deploy Prod** applique les migrations de base de données en attente dans le cadre du déploiement. Les bases de données de production n'acceptent les connexions que depuis l'intérieur du VPC ; juste après `serverless deploy`, le workflow invoque la fonction Lambda `migrate` (`api-Prod-migrate`), qui exécute les migrations en attente de chaque module et renvoie `{ ok, environment, modules }`. Si un module échoue ou est refusé (par exemple une base de données sans historique de migrations), le job échoue afin que le schéma ne soit jamais en retard par rapport au code. **Rollback Prod** ne rétablit que le code de la fonction Lambda ; les migrations restent appliquées. Gardez donc les migrations additives. Voir [Administration serveur -- Migrations de base de données](../server-admin#database-migrations) pour vérifier leur état ou les exécuter manuellement.

## Ce qui est créé

Chaque déploiement d'API crée ou met à jour les fonctions AWS Lambda suivantes :

| Fonction | Rôle |
|----------|---------|
| `web` | Gestionnaire des requêtes HTTP via API Gateway |
| `socket` | Gestionnaire des connexions WebSocket |
| `timer15Min` | Tâche planifiée exécutée toutes les 30 minutes (le nom est historique) |
| `timerMidnight` | Tâche planifiée exécutée chaque jour à minuit |
| `migrate` | Applique les migrations de base de données en attente ; invoquée par le workflow Deploy Prod |

## Configuration de l'environnement

Dans les environnements déployés, la configuration est lue depuis **AWS SSM Parameter Store** plutôt que depuis les fichiers `.env`. Cela garde les secrets hors du paquet de déploiement et permet de modifier la configuration sans redéployer.

:::warning
Ne committez jamais d'identifiants de production dans le dépôt. Toute la configuration sensible doit être stockée dans AWS SSM Parameter Store et lue à l'exécution.
:::

:::tip
Chaque fusion dans `main` déploie d'abord dans l'environnement de démonstration. Vérifiez votre modification là-bas (par exemple sur [demo.b1.church](https://demo.b1.church)) avant de lancer Deploy Prod.
:::

## Articles connexes

- **[Configuration locale de l'API](../api/local-setup)** -- Configurer l'API pour le développement
- **[Structure des modules](../api/module-structure)** -- Comprendre l'architecture des fonctions Lambda
- **[Déploiement des applications web](./web-apps)** -- Déployer les applications frontend
