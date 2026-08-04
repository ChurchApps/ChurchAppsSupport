---
title: "Base de données"
---

# Base de données

<div class="article-intro">

L'API ChurchApps utilise une architecture **base de données par module**. Chacun des six modules de données possède sa propre base de données MySQL avec un pool de connexions indépendant, ce qui offre des frontières de données claires tout en gardant l'ensemble au sein d'un déploiement unique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **MySQL 8.0+** -- voir [Prérequis](../setup/prerequisites)
- Configurez les chaînes de connexion à la base de données dans votre fichier `.env` -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Vue d'ensemble de l'architecture

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Décisions de conception clés

- **Une base de données par module** -- Chaque module gère sa propre base de données MySQL avec un pool de connexions dédié (géré par `KyselyPool`). Cela garde les modules découplés et permet une évolution indépendante des schémas.
- **Propriété exclusive** -- Les tables d'un module ne sont lues et écrites que par le code de ce module. Lorsqu'un autre module a besoin de ces données, il appelle la passerelle du module propriétaire plutôt que d'interroger directement les tables -- voir [Communication inter-modules](./module-structure#cross-module-communication).
- **Motif dépôt (repository) sans ORM** -- Tous les accès aux données passent par des classes de dépôt qui construisent du SQL typé avec le générateur de requêtes Kysely, contre le schéma du module. Cela offre un contrôle total sur la performance et le comportement des requêtes.
- **Multi-tenant par conception** -- Chaque requête est délimitée par `churchId`. Toutes les tables incluent une colonne `churchId`, et la couche de dépôt applique automatiquement l'isolation des tenants.

## Chaînes de connexion

La connexion à la base de données de chaque module est configurée dans `.env` en utilisant le format standard de chaîne de connexion MySQL :

```
mysql://user:password@host:port/database
```

Par exemple, une configuration de développement locale pourrait ressembler à ceci :

Chaque module lit sa connexion depuis une variable d'environnement nommée `<MODULE>_CONNECTION_STRING` :

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
En production, les chaînes de connexion sont stockées dans AWS SSM Parameter Store et lues par la classe `Environment` au démarrage.
:::

## Scripts de schéma

Les schémas de table sont définis comme des migrations Kysely dans le répertoire `tools/migrations/`, organisés par module :

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Les migrations définissent la création des tables, les index et les changements de schéma. Le répertoire `tools/dbScripts/` contient les données de démo et d'amorçage (seed) qui peuvent être chargées par-dessus le schéma.

## Initialisation de la base de données

### Initialiser toutes les bases de données

```bash
npm run initdb
```

Cela crée les six bases de données et exécute les migrations pour chacune d'elles.

### Initialiser un seul module

```bash
npm run initdb -- --module=membership
```

:::tip
Lorsque vous travaillez sur un module spécifique, vous pouvez réinitialiser uniquement la base de données de ce module sans affecter les autres.
:::

## Motif d'accès aux données

Les dépôts construisent des requêtes avec le générateur de requêtes Kysely contre le schéma de base de données typé du module, obtenu via la fonction `getDb()` du module. Une méthode de dépôt typique ressemble à ceci :

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Les dépôts sont obtenus via `RepoManager` :

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Incluez toujours `churchId` dans vos requêtes pour maintenir l'isolation multi-tenant. Ne faites jamais de requête à travers les tenants sauf si vous avez une raison spécifique et autorisée de le faire.
:::

## Références inter-modules

Comme les données de chaque module vivent dans une base de données séparée, il n'existe aucune clé étrangère ni jointure SQL au-delà des frontières de module. Un enregistrement lié aux données d'un autre module stocke l'id de cet enregistrement -- par exemple, un don dans la base de données giving porte le `personId` d'une personne dans la base de données membership -- et toute composition inter-modules se fait dans le code applicatif.

Cette contrainte est ce qui rend les frontières de module réelles : chaque schéma peut évoluer indépendamment, la base de données d'un module peut être déplacée sur son propre serveur, et un module pourrait même être extrait en un service autonome sans avoir à démêler des tables partagées ou des requêtes inter-bases de données.

## Articles connexes

- **[Structure des modules](./module-structure)** -- Comment les contrôleurs et les dépôts sont organisés au sein de chaque module
- **[Configuration locale de l'API](./local-setup)** -- Guide de configuration complet, étape par étape
