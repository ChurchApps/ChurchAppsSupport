---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les foyers, les rôles, les permissions, les formulaires et les paramètres. C'est le plus grand module et il fournit la couche d'identité et d'autorisation de base pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## People

Chemin de base : `/membership/people`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Lister toutes les personnes de l'église |
| GET | `/:id` | JWT | People.View ou son propre enregistrement | Obtenir une personne par ID (inclut les soumissions de formulaire) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obtenir plusieurs personnes par des ID séparés par des virgules |
| GET | `/basic?ids=` | JWT | — | Obtenir des informations de base (nom uniquement) pour plusieurs personnes |
| GET | `/recent` | JWT | People.View ou Member | Personnes ajoutées récemment |
| GET | `/search?term=&email=` | JWT | People.View ou Member | Rechercher des personnes par nom ou e-mail |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Rechercher par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtenir les personnes d'un groupe spécifique |
| GET | `/household/:householdId` | JWT | — | Obtenir toutes les personnes d'un foyer |
| GET | `/attendance` | JWT | People.Edit | Charger les participants avec filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charger les données de timeline pour des personnes et des groupes |
| GET | `/directory/:id` | JWT | — | Obtenir une personne pour l'affichage annuaire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Réclamer un enregistrement de personne pour l'utilisateur actuel dans une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Créer ou mettre à jour des personnes (par lot) |
| POST | `/search` | JWT | People.View ou Member | Rechercher des personnes (variante POST) |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche multi-critères (âge, mois de naissance, statut de membre, etc.) |
| POST | `/loadOrCreate` | Public | — | Trouver ou créer une personne par e-mail. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Mettre à jour les affectations de membres d'un foyer |
| POST | `/public/email` | Public | — | Envoyer un e-mail à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Internal | — | Charger les e-mails de personnes par ID (serveur-à-serveur, nécessite jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Supprimer une personne |

### Exemple : rechercher des personnes

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

### Exemple : créer une personne

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Users

Chemin de base : `/membership/users`

Voir [Authentification et permissions](./authentication) pour les points de terminaison de connexion, d'inscription et de gestion des mots de passe.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Se connecter (e-mail/mot de passe, actualisation JWT, ou authGuid) |
| POST | `/register` | Public | — | Inscrire un nouvel utilisateur |
| POST | `/forgot` | Public | — | Envoyer l'e-mail de réinitialisation du mot de passe |
| POST | `/setPasswordGuid` | Public | — | Définir le mot de passe à l'aide du GUID d'authentification du lien e-mail |
| POST | `/verifyCredentials` | Public | — | Vérifier l'e-mail/mot de passe et renvoyer les églises associées |
| POST | `/loadOrCreate` | JWT | — | Trouver ou créer un utilisateur par e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Mettre à jour le prénom et le nom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Changer l'adresse e-mail de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Changer le mot de passe de l'utilisateur (6 caractères min.) |
| POST | `/updateOptedOut` | JWT | — | Définir le statut de désabonnement d'une personne |
| GET | `/search?term=` | JWT | Server.Admin | Rechercher tous les utilisateurs par nom/e-mail |
| DELETE | `/` | JWT | — | Supprimer le compte utilisateur actuel |

## Churches

Chemin de base : `/membership/churches`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charger toutes les églises de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une église par ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtenir l'utilisateur administrateur de domaine d'une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Usurper une église (administrateur serveur uniquement) |
| GET | `/all?term=` | JWT | Server.Admin | Rechercher toutes les églises (admin) |
| GET | `/search/?name=` | Public | — | Rechercher des églises par nom |
| GET | `/lookup/?subDomain=&id=` | Public | — | Rechercher une église par sous-domaine ou par ID |
| POST | `/` | JWT | Settings.Edit | Mettre à jour les détails de l'église |
| POST | `/add` | JWT | — | Enregistrer une nouvelle église. Champs requis : name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Rechercher des églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionner/basculer vers une église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiver ou désarchiver une église |
| POST | `/byIds` | Public | — | Charger plusieurs églises par ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprimer les églises abandonnées depuis 7 jours ou plus |

## Groups

Chemin de base : `/membership/groups`

Étend le CRUD standard (GET `/`, GET `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les groupes |
| GET | `/:id` | JWT | — | Obtenir un groupe par ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Rechercher des groupes par filtres de service |
| GET | `/my` | JWT | — | Obtenir les groupes de l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtenir les groupes de l'utilisateur actuel filtrés par étiquette |
| GET | `/tag/:tag` | JWT | — | Obtenir tous les groupes portant une étiquette spécifique |
| GET | `/public/:churchId/:id` | Public | — | Obtenir un groupe public par église et par ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obtenir des groupes publics par étiquette |
| GET | `/public/:churchId/label?label=` | Public | — | Obtenir des groupes publics par libellé |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Créer ou mettre à jour des groupes (génère automatiquement le slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprimer un groupe (supprime aussi les équipes enfants pour les groupes de ministère) |

## Group Members

Chemin de base : `/membership/groupmembers`

Étend le CRUD standard (GET `/:id`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtenir un membre de groupe par ID |
| GET | `/` | JWT | GroupMembers.View* | Lister les membres de groupe. Filtrer par `?groupId=`, `?groupIds=`, ou `?personId=`. *Également autorisé si l'utilisateur est dans le groupe ou interroge son propre personId |
| GET | `/my` | JWT | — | Obtenir les adhésions à des groupes de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtenir la liste de base des membres d'un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obtenir les responsables d'un groupe (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Obtenir la liste publique des membres d'un groupe (champs minimaux : `personId`, `displayName`, `leader`, photo). Uniquement lorsque le groupe active `publicRoster` ; alimente l'élément `staffGrid` du générateur de sites web |
| POST | `/` | JWT | GroupMembers.Edit | Ajouter ou mettre à jour des membres de groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Retirer un membre du groupe |

## Households

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les foyers |
| GET | `/:id` | JWT | — | Obtenir un foyer par ID |
| POST | `/` | JWT | People.Edit | Créer ou mettre à jour des foyers |
| DELETE | `/:id` | JWT | People.Edit | Supprimer un foyer |

## Roles

Chemin de base : `/membership/roles`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtenir un rôle par ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtenir tous les rôles d'une église |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour des rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer un rôle (retire aussi ses permissions et ses membres) |

## Role Members

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les membres d'un rôle. Ajouter `?include=users` pour inclure les détails utilisateur |
| POST | `/` | JWT | Roles.Edit | Ajouter des membres à un rôle (crée un utilisateur si l'e-mail n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Retirer un membre d'un rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Vous retirer vous-même d'une église |

## Role Permissions

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les permissions d'un rôle (utiliser `null` comme ID pour le rôle « Everyone ») |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour des permissions de rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer une permission de rôle |

## Permissions

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtenir la liste complète des permissions disponibles |

## Forms

Chemin de base : `/membership/forms`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister tous les formulaires (l'admin voit tout ; les éditeurs voient les formulaires assignés + les formulaires non réservés aux membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir un formulaire par ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lister les formulaires archivés |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtenir un formulaire autonome (les formulaires restreints nécessitent une authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des formulaires |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprimer un formulaire |

## Form Submissions

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les soumissions. Filtrer par `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obtenir une soumission par ID. Ajouter `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accès au formulaire | Obtenir toutes les soumissions d'un formulaire (inclut formulaire, questions, réponses) |
| POST | `/` | JWT | — | Soumettre des réponses de formulaire (gère les formulaires restreints/non restreints, envoie des notifications par e-mail). Lorsque le formulaire a `autoCreatePerson`, trouve ou crée une personne Invité par e-mail et relie la soumission ; lorsque `followUpSubject`/`followUpBody` sont définis, envoie un e-mail de suivi modélisé au soumissionnaire |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprimer une soumission et ses réponses |

## Questions

Chemin de base : `/membership/questions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Lister les questions d'un formulaire. Nécessite `?formId=` |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une question par ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtenir les questions d'un formulaire non restreint |
| GET | `/sort/:id/up` | JWT | — | Déplacer une question vers le haut dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Déplacer une question vers le bas dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des questions (assigne automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une question |

## Answers

Chemin de base : `/membership/answers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les réponses. Filtrer par `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des réponses |

## Member Permissions

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès par membre à des formulaires spécifiques.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une permission de membre par ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de formulaire d'un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de membre d'un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtenir la permission de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des permissions de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une permission de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprimer toutes les permissions d'un membre sur un formulaire |

## Settings

Chemin de base : `/membership/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics d'une église |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres (prend en charge le téléversement d'image en base64) |

## Domains

Chemin de base : `/membership/domains`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les domaines |
| GET | `/:id` | JWT | — | Obtenir un domaine par ID |
| GET | `/lookup/:domainName` | JWT | — | Rechercher un domaine par nom |
| GET | `/public/lookup/:domainName` | Public | — | Recherche publique de domaine par nom |
| GET | `/health/check` | Public | — | Exécuter un contrôle de santé sur les domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour des domaines (déclenche une mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer un domaine |

## User Church

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtenir l'enregistrement utilisateur-église par ID utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtenir l'e-mail de l'utilisateur lié à une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charger toutes les églises d'un utilisateur |
| POST | `/` | JWT | — | Créer une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Mettre à jour l'heure du dernier accès et journaliser l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprimer un enregistrement utilisateur-église |

## Visibility Preferences

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistrer les préférences de visibilité (visibilité de l'adresse, du téléphone, de l'e-mail) |

## Query

Chemin de base : `/membership/query`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Recherche de membres en langage naturel par IA. Corps : `{ text, subDomain, siteUrl }` |

## Client Errors

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Journaliser une erreur côté client |

## Pages connexes

- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure des modules](../module-structure) — Motifs d'organisation du code
