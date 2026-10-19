---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les foyers, les rôles, les permissions, les formulaires et les paramètres. C'est le plus grand module : il fournit la couche centrale d'identité et d'autorisation pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## Personnes

Chemin de base : `/membership/people`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Liste toutes les personnes de l'église |
| GET | `/:id` | JWT | People.View ou son propre dossier | Obtient une personne par ID (inclut les soumissions de formulaires) |
| GET | `/ids?ids=` | JWT | People.View ou Member | Obtient plusieurs personnes par IDs séparés par des virgules |
| GET | `/basic?ids=` | JWT | — | Obtient les informations de base (nom seulement) de plusieurs personnes |
| GET | `/names?ids=` | JWT | Toute permission de l'église | `[{ id, name: { display, first, last }, photo }]`, trié par nom de famille puis prénom, pour les IDs séparés par des virgules déjà accessibles à l'appelant, afin que les rôles sans People.View (dons, présences) puissent afficher le nom des personnes. Pas de recherche ni de filtre d'annuaire |
| POST | `/names` | JWT | Toute permission de l'église | Identique à `GET /names`. Corps : `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Personnes récemment ajoutées. Les appelants ayant uniquement People.ViewNames reçoivent le modèle de base (`id`, `name.display`, `photo`, `membershipStatus`), sans les personnes désinscrites |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Recherche de personnes par nom ou e-mail (jusqu'à 100, triées par nom de famille puis prénom). Les appelants ayant uniquement People.ViewNames obtiennent une recherche par nom renvoyant le modèle de base ; une recherche par `email` renvoie `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Recherche par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtient les personnes d'un groupe précis |
| GET | `/household/:householdId` | JWT | — | Obtient toutes les personnes d'un foyer |
| GET | `/attendance` | JWT | People.Edit | Charge les participants avec filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charge les données chronologiques des personnes et des groupes |
| GET | `/directory/:id` | JWT | — | Obtient la personne pour l'affichage dans l'annuaire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Revendique un dossier de personne pour l'utilisateur actuel dans une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Crée ou met à jour des personnes (par lot) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Recherche de personnes (variante POST). Corps : `{ term }` ou `{ email }` ; mêmes règles de noms seulement que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche multicritère (âge, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Public | — | Trouve ou crée une personne par e-mail. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Met à jour les affectations des membres du foyer |
| POST | `/public/email` | Public | — | Envoie un e-mail à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interne | — | Charge les e-mails des personnes par IDs (de serveur à serveur, nécessite jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Supprime une personne |

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

## Utilisateurs {#users}

Chemin de base : `/membership/users`

Voir [Authentification et permissions](./authentication) pour les points de terminaison de connexion, d'inscription et de gestion des mots de passe.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Se connecter (e-mail/mot de passe, rafraîchissement JWT ou authGuid) |
| POST | `/register` | Public | — | Inscrire un nouvel utilisateur |
| POST | `/forgot` | Public | — | Envoie un e-mail de réinitialisation du mot de passe |
| POST | `/setPasswordGuid` | Public | — | Définit le mot de passe à l'aide du GUID d'authentification du lien reçu par e-mail |
| POST | `/verifyCredentials` | Public | — | Vérifie l'e-mail et le mot de passe, et renvoie les églises associées |
| POST | `/loadOrCreate` | JWT | — | Trouve ou crée un utilisateur par e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Met à jour le prénom et le nom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Modifie l'adresse e-mail de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Modifie le mot de passe de l'utilisateur (6 caractères minimum) |
| POST | `/updateOptedOut` | JWT | — | Définit le statut de désinscription d'une personne |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envoie une invitation par e-mail à une personne de cette église (`email`, `personName`, `contextName`). Le bouton affiche **S'inscrire** pour une personne sans compte et **Se connecter** pour un utilisateur existant. Un utilisateur qui ne s'est jamais connecté reçoit plutôt un lien **Définir votre mot de passe** valable 7 jours. Compte dans la limite quotidienne d'e-mails de l'église (`429` lorsqu'elle est atteinte) |
| GET | `/search?term=` | JWT | Server.Admin | Recherche tous les utilisateurs par nom/e-mail |
| DELETE | `/` | JWT | — | Supprime le compte utilisateur actuel |

## Églises

Chemin de base : `/membership/churches`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charge toutes les églises de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtient une église par ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtient l'administrateur de domaine d'une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Se faire passer pour une église (administrateur serveur uniquement) |
| GET | `/all?term=` | JWT | Server.Admin | Recherche toutes les églises (administrateur) |
| GET | `/search/?name=` | Public | — | Recherche des églises par nom |
| GET | `/lookup/?subDomain=&id=` | Public | — | Recherche une église par sous-domaine ou ID |
| POST | `/` | JWT | Settings.Edit | Met à jour les informations de l'église |
| POST | `/add` | JWT | — | Inscrit une nouvelle église. Champs obligatoires : name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Recherche des églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionne ou change d'église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archive ou désarchive une église |
| POST | `/byIds` | Public | — | Charge plusieurs églises par IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprime les églises abandonnées depuis 7 jours ou plus |

## Groupes

Chemin de base : `/membership/groups`

Étend le CRUD standard (GET `/`, GET `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les groupes |
| GET | `/:id` | JWT | — | Obtient un groupe par ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Recherche des groupes par filtres de service |
| GET | `/my` | JWT | — | Obtient les groupes de l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtient les groupes de l'utilisateur actuel filtrés par étiquette |
| GET | `/tag/:tag` | JWT | — | Obtient tous les groupes portant une étiquette précise |
| GET | `/public/:churchId/:id` | Public | — | Obtient un groupe public par église et ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obtient les groupes publics par étiquette |
| GET | `/public/:churchId/label?label=` | Public | — | Obtient les groupes publics par libellé |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtient un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Crée ou met à jour des groupes (génère automatiquement le slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprime un groupe (supprime aussi les équipes enfants pour les groupes de ministère) |

## Membres de groupe

Chemin de base : `/membership/groupmembers`

Étend le CRUD standard (GET `/:id`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtient un membre de groupe par ID |
| GET | `/` | JWT | GroupMembers.View* | Liste les membres de groupe. Filtrer par `?groupId=`, `?groupIds=` ou `?personId=`. *Également autorisé si l'utilisateur est membre du groupe ou interroge son propre personId |
| GET | `/my` | JWT | — | Obtient les appartenances à des groupes de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtient la liste de base des membres d'un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obtient les responsables d'un groupe (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Obtient la liste publique d'un groupe (champs minimaux : `personId`, `displayName`, `leader`, photo). Uniquement si le groupe y consent via `publicRoster` ; alimente l'élément `staffGrid` du créateur de site web |
| POST | `/` | JWT | GroupMembers.Edit | Ajoute ou met à jour des membres de groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Retire un membre de groupe |

## Foyers

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les foyers |
| GET | `/:id` | JWT | — | Obtient un foyer par ID |
| POST | `/` | JWT | People.Edit | Crée ou met à jour des foyers |
| DELETE | `/:id` | JWT | People.Edit | Supprime un foyer |

## Rôles

Chemin de base : `/membership/roles`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtient un rôle par ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtient tous les rôles d'une église |
| POST | `/` | JWT | Roles.Edit | Crée ou met à jour des rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprime un rôle (supprime aussi ses permissions et ses membres) |

## Membres de rôle

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtient les membres d'un rôle. Ajouter `?include=users` pour inclure les détails des utilisateurs |
| POST | `/` | JWT | Roles.Edit | Ajoute des membres à un rôle (crée l'utilisateur si l'e-mail n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Retire un membre d'un rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Se retirer d'une église |

## Permissions de rôle

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtient les permissions d'un rôle (utiliser `null` comme ID pour le rôle « Everyone ») |
| POST | `/` | JWT | Roles.Edit | Crée ou met à jour les permissions de rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprime une permission de rôle |

## Permissions

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtient la liste complète des permissions disponibles |

Chaque entrée contient `apiName`, `section` (type de contenu), `action`, ainsi que les libellés `displaySection` / `displayAction` affichés par l'éditeur de rôles de B1Admin. Ajouts récents : `MembershipApi` / `People` / `View Names` (**Voir uniquement les noms des personnes**, sous Personnes et Groupes) et `GivingApi` / `Donations` / `Enter` (**Saisir des dons**, sous Dons ; voir [Lots de dons](./giving.md#donation-batches)).

## Formulaires

Chemin de base : `/membership/forms`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste tous les formulaires (l'administrateur voit tout ; les éditeurs voient les formulaires qui leur sont assignés et les formulaires non membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtient un formulaire par ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Liste les formulaires archivés |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtient un formulaire autonome (les formulaires restreints nécessitent une authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Crée ou met à jour des formulaires |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprime un formulaire |

## Soumissions de formulaires

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste les soumissions. Filtrer par `?personId=` ou `?formId=` |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obtient une soumission par ID. Ajouter `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accès au formulaire | Obtient toutes les soumissions d'un formulaire (inclut le formulaire, les questions et les réponses) |
| POST | `/` | JWT | — | Soumet les réponses d'un formulaire (gère les formulaires restreints et non restreints, envoie des notifications par e-mail). Lorsque le formulaire a `autoCreatePerson`, trouve ou crée une personne Invité par e-mail et lie la soumission ; lorsque `followUpSubject` ou `followUpBody` sont définis, envoie à l'auteur de la soumission un e-mail de suivi basé sur un modèle |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprime une soumission et ses réponses |

## Questions

Chemin de base : `/membership/questions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Liste les questions d'un formulaire. Requiert `?formId=` |
| GET | `/:id` | JWT | Accès au formulaire | Obtient une question par ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtient les questions d'un formulaire non restreint |
| GET | `/sort/:id/up` | JWT | — | Monte une question dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Descend une question dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Crée ou met à jour des questions (attribue automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprime une question |

## Réponses

Chemin de base : `/membership/answers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste les réponses. Filtrer par `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Crée ou met à jour des réponses |

## Permissions des membres

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès de chaque membre à des formulaires spécifiques.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtient une permission de membre par ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtient toutes les permissions de formulaire d'un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtient toutes les permissions de membres pour un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtient la permission de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Crée ou met à jour des permissions de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprime une permission de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprime toutes les permissions d'un membre pour un formulaire |

## Paramètres

Chemin de base : `/membership/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtient tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtient les paramètres publics d'une église |
| POST | `/` | JWT | Settings.Edit | Enregistre les paramètres (prend en charge le téléversement d'images en base64) |

## Domaines

Chemin de base : `/membership/domains`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les domaines |
| GET | `/:id` | JWT | — | Obtient un domaine par ID |
| GET | `/lookup/:domainName` | JWT | — | Recherche un domaine par nom |
| GET | `/public/lookup/:domainName` | Public | — | Recherche publique d'un domaine par nom |
| GET | `/health/check` | Public | — | Lance une vérification de l'état des domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Crée ou met à jour des domaines (déclenche la mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprime un domaine |

## Utilisateur-église

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtient l'enregistrement utilisateur-église par ID utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtient l'e-mail de l'utilisateur lié à une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charge toutes les églises d'un utilisateur |
| POST | `/` | JWT | — | Crée une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Met à jour la date du dernier accès et journalise l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprime un enregistrement utilisateur-église |

## Préférences de visibilité

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtient les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistre les préférences de visibilité (visibilité de l'adresse, du téléphone et de l'e-mail) |

## Requête

Chemin de base : `/membership/query`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Recherche de membres en langage naturel à l'aide de l'IA. Corps : `{ text, subDomain, siteUrl }` |

## Erreurs client

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Journalise une erreur côté client |

## Pages connexes

- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Modèles d'organisation du code
