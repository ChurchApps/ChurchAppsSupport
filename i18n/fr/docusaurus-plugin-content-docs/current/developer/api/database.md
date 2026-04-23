---
title: "Base de données"
---

# Base de données

<div class="article-intro">

L'API ChurchApps utilise une architecture **une base de données par module**. Chacun des six modules possède sa propre base de données MySQL avec un pool de connexions indépendant, fournissant des limites de données claires tout en gardant tout au sein d'un seul déploiement.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **MySQL 8.0+** -- voir [Prérequis](../setup/prerequisites)
- Configurer les chaînes de connexion à la base de données dans votre fichier `.env` -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Aperçu de l'architecture

```
Api
├── membership_db   ← Personnes, groupes, permissions
├── attendance_db   ← Services, sessions, enregistrements
├── content_db      ← Pages, sections, éléments
├── giving_db       ← Donations, fonds, paiements
├── messaging_db    ← Conversations, notifications
└── doing_db        ← Tâches, plans, assignments
```

### Décisions de conception clés

- **Une base de données par module** -- Chaque module maintient sa propre base de données MySQL avec un pool de connexions dédié (`EnhancedPoolHelper`). Cela garde les modules découplés et permet l'évolution indépendante du schéma.
- **Modèle de repository avec SQL direct** -- Il n'y a pas d'ORM. Tous les accès aux données passent par des classes de repository qui exécutent du SQL directement en utilisant `DB.query()`. Cela donne un contrôle total sur les performances et le comportement des requêtes.
- **Multi-tenant par conception** -- Chaque requête est délimitée par `churchId`. Tous les tableaux incluent une colonne `churchId`, et la couche de repository applique automatiquement l'isolation des locataires.

## Chaînes de connexion

Chaque connexion à la base de données du module est configurée dans `.env` en utilisant le format standard de chaîne de connexion MySQL :

```
mysql://user:password@host:port/database
```

Par exemple, une configuration de développement local pourrait ressembler à :

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
En production, les chaînes de connexion sont stockées dans AWS SSM Parameter Store et lues par la classe `Environment` au démarrage.
:::

## Scripts de schéma

Les scripts de schéma de base de données se trouvent dans le répertoire `tools/dbScripts/`, organisés par module :

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Ces scripts définissent la création de tables, les index et toute donnée de seed nécessaire.

## Initialisation de la base de données

### Initialiser toutes les bases de données

```bash
npm run initdb
```

Cela crée les six bases de données et exécute les scripts de schéma pour chacune.

### Initialiser un seul module

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Lorsque vous travaillez sur un module spécifique, vous pouvez réinitialiser uniquement la base de données de ce module sans affecter les autres.
:::

## Modèle d'accès aux données

Les repositories accèdent aux données via la méthode `DB.query()`. Une méthode de repository typique ressemble à ceci :

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Les repositories sont obtenus via `RepositoryManager` :

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Incluez toujours `churchId` dans vos requêtes pour maintenir l'isolation multi-tenant. Ne jamais interroger entre les locataires sauf si vous avez une raison spécifique et autorisée.
:::

## Articles connexes

- **[Structure du module](./module-structure)** -- Comment les contrôleurs et les repositories sont organisés dans chaque module
- **[Configuration locale de l'API](./local-setup)** -- Guide complet étape par étape
