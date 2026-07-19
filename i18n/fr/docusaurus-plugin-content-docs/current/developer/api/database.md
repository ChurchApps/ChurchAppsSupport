---
title: "Base de données"
---

# Base de données

<div class="article-intro">

L'API ChurchApps utilise une architecture **base de données par module**. Chacun des six modules de données a sa propre base de données MySQL avec un pool de connexion indépendant, fournissant des limites de données claires tout en conservant tout au sein d'un déploiement unique.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **MySQL 8.0+** -- voir [Conditions préalables](../setup/prerequisites)
- Configurez les chaînes de connexion à la base de données dans votre fichier `.env` -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Aperçu de l'architecture

```
Api
├── membership_db   ← People, groups, permissions
├── attendance_db   ← Services, sessions, records
├── content_db      ← Pages, sections, elements
├── giving_db       ← Donations, funds, payments
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tasks, plans, assignments
```

### Principales décisions de conception

- **Une base de données par module** -- Chaque module maintient sa propre base de données MySQL avec un pool de connexion dédié (géré par `KyselyPool`). Cela garde les modules découplés et permet une évolution de schéma indépendante.
- **Propriété exclusive** -- Les tables d'un module sont lues et écrites uniquement par le code du module lui-même. Lorsqu'un autre module a besoin des données, il appelle la passerelle du module propriétaire plutôt que d'interroger les tables lui-même -- consultez [Communication inter-module](./module-structure#cross-module-communication).
- **Motif de référentiel sans ORM** -- Tous les accès aux données passent par des classes de référentiel qui construisent du SQL typé avec le générateur de requêtes Kysely par rapport au schéma du module. Cela donne un contrôle total sur les performances et le comportement des requêtes.
- **Multi-locataire par conception** -- Chaque requête est limitée par `churchId`. Tous les tableaux incluent une colonne `churchId`, et la couche de référentiel applique automatiquement l'isolation des locataires.

## Chaînes de connexion

La connexion à la base de données de chaque module est configurée dans `.env` en utilisant le format de chaîne de connexion MySQL standard :

```
mysql://user:password@host:port/database
```

Par exemple, une configuration locale de développement pourrait ressembler à :

Chaque module lit sa connexion à partir d'une variable d'environnement nommée `<MODULE>_CONNECTION_STRING` :

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

Les migrations définissent la création de table, les index et les changements de schéma. Le répertoire `tools/dbScripts/` contient les données de démonstration et d'amorce qui peuvent être chargées sur le schéma.

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

Les référentiels construisent des requêtes avec le générateur de requêtes Kysely par rapport au schéma de base de données typé du module, obtenu via la fonction `getDb()` du module. Une méthode de référentiel typique ressemble à ceci :

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Les référentiels sont obtenus via `RepoManager` :

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Incluez toujours `churchId` dans vos requêtes pour maintenir l'isolation multi-locataire. Ne faites jamais de requête entre les locataires à moins d'avoir une raison spécifique et autorisée.
:::

## Références inter-module

Parce que les données de chaque module vivent dans une base de données séparée, il n'y a pas de clés étrangères ou de jointures SQL à travers les limites des modules. Un enregistrement qui se rapporte aux données d'un autre module stocke l'id de cet enregistrement : par exemple, un don dans la base de données de dons porte le `personId` d'une personne dans la base de données des adhésions, et tout ce qui est composé entre modules se produit dans le code de l'application.

Cette contrainte est ce qui rend les limites du module réelles : chaque schéma peut évoluer indépendamment, la base de données d'un module peut être déplacée sur son propre serveur, et un module pourrait même être extrait dans un service autonome sans démêler les tableaux partagés ou les requêtes inter-bases de données.

## Articles connexes

- **[Structure du module](./module-structure)** -- Comment les contrôleurs et les référentiels sont organisés au sein de chaque module
- **[Configuration locale de l'API](./local-setup)** -- Guide de configuration complet étape par étape