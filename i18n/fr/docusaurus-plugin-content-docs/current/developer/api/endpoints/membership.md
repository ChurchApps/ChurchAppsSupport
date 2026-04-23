---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les ménages, les rôles, les permissions, les formulaires et les paramètres. C'est le module le plus volumineux et fournit la couche d'identité et d'autorisation core pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## Personnes

Chemin de base : `/membership/people`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Lister toutes les personnes pour l'église |
| GET | `/:id` | JWT | People.View ou enregistrement personnel | Obtenir une personne par ID (inclut les soumissions de formulaire) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obtenir plusieurs personnes par IDs séparés par des virgules |
| GET | `/basic?ids=` | JWT | — | Obtenir les informations de base (nom uniquement) pour plusieurs personnes |
| GET | `/recent` | JWT | People.View ou Member | Personnes récemment ajoutées |
| GET | `/search?term=&email=` | JWT | People.View ou Member | Rechercher les personnes par nom ou e-mail |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Rechercher par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtenir les personnes dans un groupe spécifique |
| GET | `/household/:householdId` | JWT | — | Obtenir toutes les personnes dans un ménage |
| GET | `/attendance` | JWT | People.Edit | Charger les participants avec des filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charger les données de chronologie pour les personnes et les groupes |
| GET | `/directory/:id` | JWT | — | Obtenir une personne pour l'affichage du répertoire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Réclamer un enregistrement de personne pour l'utilisateur actuel à une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Créer ou mettre à jour les personnes (lot) |
| POST | `/search` | JWT | People.View ou Member | Rechercher les personnes (variante POST) |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche multi-critère (âge, moisNaissance, statutMembership, etc.) |
| POST | `/loadOrCreate` | Public | — | Rechercher ou créer une personne par e-mail. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Mettre à jour les assignments des membres du ménage |
| POST | `/public/email` | Public | — | Envoyer un e-mail à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Charger les e-mails des personnes par IDs (serveur à serveur, nécessite jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Supprimer une personne |

### Exemple : Rechercher les personnes

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Exemple : Créer une personne

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Utilisateurs

Chemin de base : `/membership/users`

Voir [Authentification et permissions](./authentication) pour les points de terminaison de connexion, d'enregistrement et de gestion des mots de passe.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| POST | `/login` | Public | — | Se connecter (e-mail/mot de passe, actualisation JWT ou authGuid) |
| POST | `/register` | Public | — | Enregistrer un nouvel utilisateur |
| POST | `/forgot` | Public | — | Envoyer un e-mail de réinitialisation de mot de passe |
| POST | `/setPasswordGuid` | Public | — | Définir le mot de passe à l'aide du GUID d'authentification à partir du lien e-mail |
| POST | `/verifyCredentials` | Public | — | Vérifier l'e-mail/le mot de passe et retourner les églises associées |
| POST | `/loadOrCreate` | JWT | — | Rechercher ou créer un utilisateur par e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Mettre à jour le nom et le prénom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Modifier l'adresse e-mail de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Modifier le mot de passe de l'utilisateur (min 6 caractères) |
| POST | `/updateOptedOut` | JWT | — | Définir le statut de désactivation d'une personne |
| GET | `/search?term=` | JWT | Server.Admin | Rechercher tous les utilisateurs par nom/e-mail |
| DELETE | `/` | JWT | — | Supprimer le compte utilisateur actuel |

## Églises

Chemin de base : `/membership/churches`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Charger toutes les églises pour l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une église par ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtenir l'utilisateur administrateur de domaine pour une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Emprunter l'identité d'une église (administrateur serveur uniquement) |
| GET | `/all?term=` | JWT | Server.Admin | Rechercher toutes les églises (administrateur) |
| GET | `/search/?name=` | Public | — | Rechercher les églises par nom |
| GET | `/lookup/?subDomain=&id=` | Public | — | Rechercher une église par sous-domaine ou ID |
| POST | `/` | JWT | Settings.Edit | Mettre à jour les détails de l'église |
| POST | `/add` | JWT | — | Enregistrer une nouvelle église. Champs requis : name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Rechercher les églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionner/basculer vers une église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiver ou désarchiver une église |
| POST | `/byIds` | Public | — | Charger plusieurs églises par IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprimer les églises abandonnées depuis 7+ jours |

## Groupes

Chemin de base : `/membership/groups`

Étend le CRUD standard (GET `/`, GET `/:id` de la classe de base).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les groupes |
| GET | `/:id` | JWT | — | Obtenir un groupe par ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Rechercher les groupes par filtres de service |
| GET | `/my` | JWT | — | Obtenir les groupes pour l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtenir les groupes de l'utilisateur actuel filtrés par tag |
| GET | `/tag/:tag` | JWT | — | Obtenir tous les groupes avec un tag spécifique |
| GET | `/public/:churchId/:id` | Public | — | Obtenir un groupe public par église et ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obtenir les groupes publics par tag |
| GET | `/public/:churchId/label?label=` | Public | — | Obtenir les groupes publics par label |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Créer ou mettre à jour les groupes (génère automatiquement slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprimer un groupe (supprime aussi les équipes enfants pour les groupes ministériels) |

## Membres du groupe

Chemin de base : `/membership/groupmembers`

Étend le CRUD standard (GET `/:id`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtenir un membre du groupe par ID |
| GET | `/` | JWT | GroupMembers.View* | Lister les membres du groupe. Filtrer par `?groupId=`, `?groupIds=`, ou `?personId=`. *Également autorisé si l'utilisateur est dans le groupe ou interroge le personId personnel |
| GET | `/my` | JWT | — | Obtenir les appartenances à un groupe de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtenir la liste des membres de base pour un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obtenir les leaders du groupe (public) |
| POST | `/` | JWT | GroupMembers.Edit | Ajouter ou mettre à jour les membres du groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Supprimer un membre du groupe |

## Ménages

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les ménages |
| GET | `/:id` | JWT | — | Obtenir un ménage par ID |
| POST | `/` | JWT | People.Edit | Créer ou mettre à jour les ménages |
| DELETE | `/:id` | JWT | People.Edit | Supprimer un ménage |

## Rôles

Chemin de base : `/membership/roles`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtenir un rôle par ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtenir tous les rôles pour une église |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour les rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer un rôle (supprime aussi ses permissions et ses membres) |

## Membres du rôle

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les membres d'un rôle. Ajouter `?include=users` pour inclure les détails des utilisateurs |
| POST | `/` | JWT | Roles.Edit | Ajouter des membres à un rôle (crée un utilisateur si l'e-mail n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Supprimer un membre du rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Vous supprimer d'une église |

## Permissions du rôle

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les permissions pour un rôle (utiliser `null` comme ID pour le rôle "Tout le monde") |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour les permissions du rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer une permission du rôle |

## Permissions

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Obtenir la liste complète des permissions disponibles |

## Formulaires

Chemin de base : `/membership/forms`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister tous les formulaires (l'administrateur voit tous ; les éditeurs voient les formulaires assignés + non-membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir un formulaire par ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lister les formulaires archivés |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtenir un formulaire autonome (les formulaires restreints nécessitent l'authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour les formulaires |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprimer un formulaire |

## Soumissions de formulaire

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les soumissions. Filtrer par `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obtenir la soumission par ID. Ajouter `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accès au formulaire | Obtenir toutes les soumissions pour un formulaire (inclut le formulaire, les questions, les réponses) |
| POST | `/` | JWT | — | Soumettre les réponses du formulaire (gère les formulaires restreints/sans restriction, envoie les notifications par e-mail) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprimer une soumission et ses réponses |

## Questions

Chemin de base : `/membership/questions`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Lister les questions pour un formulaire. Nécessite `?formId=` |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une question par ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtenir les questions pour un formulaire sans restriction |
| GET | `/sort/:id/up` | JWT | — | Déplacer une question vers le haut dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Déplacer une question vers le bas dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour les questions (assigne automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une question |

## Réponses

Chemin de base : `/membership/answers`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les réponses. Filtrer par `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour les réponses |

## Permissions des membres

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès par membre aux formulaires spécifiques.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une permission de membre par ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de formulaire pour un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de membre pour un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtenir la permission de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour les permissions de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une permission de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprimer toutes les permissions pour un membre sur un formulaire |

## Paramètres

Chemin de base : `/membership/settings`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres pour l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics pour une église |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres (supporte le téléchargement d'image base64) |

## Domaines

Chemin de base : `/membership/domains`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les domaines |
| GET | `/:id` | JWT | — | Obtenir un domaine par ID |
| GET | `/lookup/:domainName` | JWT | — | Rechercher un domaine par nom |
| GET | `/public/lookup/:domainName` | Public | — | Recherche de domaine public par nom |
| GET | `/health/check` | Public | — | Exécuter une vérification de santé sur les domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour les domaines (déclenche la mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer un domaine |

## Église utilisateur

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtenir l'enregistrement utilisateur-église par ID utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtenir l'e-mail pour l'utilisateur lié d'une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charger toutes les églises pour un utilisateur |
| POST | `/` | JWT | — | Créer une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Mettre à jour l'heure d'accès récent et enregistrer l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprimer un enregistrement utilisateur-église |

## Préférences de visibilité

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistrer les préférences de visibilité (visibilité de l'adresse, du téléphone, de l'e-mail) |

## Requête

Chemin de base : `/membership/query`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| POST | `/members` | JWT | — | Recherche de membre en langage naturel utilisant l'IA. Corps : `{ text, subDomain, siteUrl }` |

## Erreurs client

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| POST | `/` | JWT | — | Enregistrer une erreur côté client |

## Pages connexes

- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Modèles d'organisation du code
