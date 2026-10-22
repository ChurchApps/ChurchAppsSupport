---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership {#membership-endpoints}

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les foyers, les rôles, les permissions, les formulaires et les paramètres. C'est le plus grand module, et il fournit la couche fondamentale d'identité et d'autorisation pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## Personnes {#people}

Chemin de base : `/membership/people`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Liste toutes les personnes de l'église |
| GET | `/:id` | JWT | People.View ou son propre dossier | Obtient une personne par son ID (inclut les soumissions de formulaires) |
| GET | `/ids?ids=` | JWT | People.View, Member, ou People.ViewNames | Obtient plusieurs personnes à partir d'ID séparés par des virgules. Les appelants People.ViewNames sans People.View obtiennent le modèle de base, les personnes ayant refusé la visibilité étant exclues (sauf l'appelant lui-même) |
| GET | `/basic?ids=` | JWT | — | Obtient les informations de base (nom seulement) de plusieurs personnes |
| GET | `/names?ids=` | JWT | Toute permission de l'église | `[{ id, name: { display, first, last }, photo }]`, trié par nom de famille puis prénom, pour les ID séparés par des virgules que l'appelant possède déjà. Permet aux rôles sans People.View (dons, présences) d'afficher le nom des personnes. Pas de recherche, pas de filtre de répertoire |
| POST | `/names` | JWT | Toute permission de l'église | Identique à `GET /names`. Corps : `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, ou People.ViewNames | Personnes ajoutées récemment. Les appelants People.ViewNames sans People.View (même les membres ayant accès au répertoire) obtiennent le modèle de base (`id`, `name.display`, `photo`, `membershipStatus`), les personnes ayant refusé la visibilité étant exclues |
| GET | `/search?term=&email=` | JWT | People.View, Member, ou People.ViewNames | Recherche des personnes par nom ou courriel (jusqu'à 100, triées par nom de famille puis prénom). Les appelants People.ViewNames sans People.View (même les membres ayant accès au répertoire) obtiennent une recherche par nom renvoyant le modèle de base ; une recherche par `email` renvoie `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Recherche par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtient les personnes d'un groupe précis |
| GET | `/household/:householdId` | JWT | — | Obtient toutes les personnes d'un foyer |
| GET | `/attendance` | JWT | People.Edit | Charge les participants avec filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charge les données de chronologie des personnes et des groupes |
| GET | `/directory/:id` | JWT | — | Obtient une personne pour la vue du répertoire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Revendique un dossier de personne pour l'utilisateur actuel dans une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Crée ou met à jour des personnes (par lot) |
| POST | `/search` | JWT | People.View, Member, ou People.ViewNames | Recherche des personnes (variante POST). Corps : `{ term }` ou `{ email }` ; mêmes règles de noms seulement que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche à plusieurs conditions (âge, birthMonth, membershipStatus, etc.) |
| POST | `/loadOrCreate` | Public | — | Trouve ou crée une personne par courriel. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/household/:householdId` | JWT | People.Edit | Met à jour les affectations des membres du foyer |
| POST | `/public/email` | Public | — | Envoie un courriel à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interne | — | Charge les courriels de personnes par ID (serveur à serveur, nécessite jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Supprime une personne |

### Exemple : rechercher des personnes {#example-search-people}

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

### Exemple : créer une personne {#example-create-a-person}

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
| POST | `/login` | Public | — | Connexion (courriel/mot de passe, renouvellement du JWT ou authGuid) |
| POST | `/register` | Public | — | Inscrit un nouvel utilisateur |
| POST | `/forgot` | Public | — | Envoie un courriel de réinitialisation du mot de passe |
| POST | `/setPasswordGuid` | Public | — | Définit le mot de passe à l'aide du GUID d'authentification du lien reçu par courriel |
| POST | `/verifyCredentials` | Public | — | Vérifie le courriel et le mot de passe, et renvoie les églises associées |
| POST | `/loadOrCreate` | JWT | — | Trouve ou crée un utilisateur par courriel ou userId |
| POST | `/setDisplayName` | JWT | — | Met à jour le prénom et le nom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Modifie l'adresse courriel de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Modifie le mot de passe de l'utilisateur (6 caractères minimum) |
| POST | `/updateOptedOut` | JWT | — | Définit le statut de refus (opt-out) d'une personne |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envoie par courriel une invitation à une personne de cette église (`email`, `personName`, `contextName`). Le bouton affiche **Sign Up** pour une personne sans compte et **Log In** pour un utilisateur existant. Un utilisateur qui ne s'est jamais connecté reçoit plutôt un lien **Set Your Password** valide 7 jours. Il s'agit d'un modèle fixe, qui ne compte donc pas dans la limite quotidienne de courriels de l'église |
| GET | `/search?term=` | JWT | Server.Admin | Recherche tous les utilisateurs par nom ou courriel |
| DELETE | `/` | JWT | — | Supprime le compte utilisateur actuel |

## Églises {#churches}

Chemin de base : `/membership/churches`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charge toutes les églises de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtient une église par son ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtient l'administrateur de domaine d'une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Usurpe l'identité d'une église (administrateurs serveur uniquement) |
| GET | `/all?term=` | JWT | Server.Admin | Recherche toutes les églises (administration) |
| GET | `/search/?name=` | Public | — | Recherche des églises par nom |
| GET | `/lookup/?subDomain=&id=` | Public | — | Recherche une église par sous-domaine ou ID |
| POST | `/` | JWT | Settings.Edit | Met à jour les informations de l'église |
| POST | `/add` | JWT | — | Inscrit une nouvelle église. Champs obligatoires : name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Recherche des églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionne ou change d'église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archive ou désarchive une église |
| POST | `/byIds` | Public | — | Charge plusieurs églises à partir de leurs ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprime les églises abandonnées depuis 7 jours ou plus |

## Groupes {#groups}

Chemin de base : `/membership/groups`

Hérite du CRUD standard (GET `/`, GET `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les groupes |
| GET | `/:id` | JWT | — | Obtient un groupe par son ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Recherche des groupes selon les filtres de service |
| GET | `/my` | JWT | — | Obtient les groupes de l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtient les groupes de l'utilisateur actuel filtrés par étiquette |
| GET | `/tag/:tag` | JWT | — | Obtient tous les groupes portant une étiquette précise |
| GET | `/public/:churchId/:id` | Public | — | Obtient un groupe public par église et ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obtient les groupes publics par étiquette |
| GET | `/public/:churchId/label?label=` | Public | — | Obtient les groupes publics par libellé |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtient un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Crée ou met à jour des groupes (génère automatiquement le slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprime un groupe (supprime aussi les équipes enfants pour les groupes de ministère) |

## Membres de groupe {#group-members}

Chemin de base : `/membership/groupmembers`

Hérite du CRUD standard (GET `/:id`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtient un membre de groupe par son ID |
| GET | `/` | JWT | GroupMembers.View* | Liste les membres de groupe. Filtre par `?groupId=`, `?groupIds=` ou `?personId=`. *Également autorisé si l'utilisateur fait partie du groupe ou demande son propre personId, et pour `?groupId=` de tout groupe non confidentiel lorsque l'utilisateur dispose de Attendance.View ou Attendance.Edit (les membres de moins de 13 ans sont inclus pour eux) |
| GET | `/my` | JWT | — | Obtient les adhésions aux groupes de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtient la liste de base des membres d'un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obtient les responsables d'un groupe (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Obtient la liste publique d'un groupe (champs minimaux : `personId`, `displayName`, `leader`, photo). Uniquement lorsque le groupe accepte l'option `publicRoster` ; alimente l'élément `staffGrid` du créateur de site web |
| POST | `/` | JWT | GroupMembers.Edit | Ajoute ou met à jour des membres de groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Retire un membre de groupe |

## Foyers {#households}

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les foyers |
| GET | `/:id` | JWT | — | Obtient un foyer par son ID |
| POST | `/` | JWT | People.Edit | Crée ou met à jour des foyers |
| DELETE | `/:id` | JWT | People.Edit | Supprime un foyer |

## Rôles {#roles}

Chemin de base : `/membership/roles`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtient un rôle par son ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtient tous les rôles d'une église |
| POST | `/` | JWT | Roles.Edit | Crée ou met à jour des rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprime un rôle (supprime aussi ses permissions et ses membres) |

## Membres de rôle {#role-members}

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtient les membres d'un rôle. Ajoutez `?include=users` pour inclure les détails des utilisateurs |
| POST | `/` | JWT | Roles.Edit | Ajoute des membres à un rôle (crée l'utilisateur si le courriel n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Retire un membre de rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Vous retire d'une église |

## Permissions de rôle {#role-permissions}

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtient les permissions d'un rôle (utilisez `null` comme ID pour le rôle « Everyone ») |
| POST | `/` | JWT | Roles.Edit | Crée ou met à jour les permissions de rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprime une permission de rôle |

## Permissions {#permissions}

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtient la liste complète des permissions disponibles |

Chaque entrée comprend `apiName`, `section` (type de contenu), `action`, ainsi que les libellés `displaySection` / `displayAction` affichés par l'éditeur de rôles de B1Admin. Ajouts récents : `MembershipApi` / `People` / `View Names` (**View People Names Only**, sous People et Groups) et `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sous Donations ; voir [Lots de dons](./giving.md#donation-batches)).

## Formulaires {#forms}

Chemin de base : `/membership/forms`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste tous les formulaires (l'administrateur voit tout ; les éditeurs voient les formulaires qui leur sont assignés et les formulaires non réservés aux membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtient un formulaire par son ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Liste les formulaires archivés |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtient un formulaire autonome (les formulaires restreints exigent une authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Crée ou met à jour des formulaires |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprime un formulaire |

## Soumissions de formulaires {#form-submissions}

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste les soumissions. Filtre par `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limité à l'utilisateur : jusqu'à 50 soumissions de formulaires autonomes (pas les formulaires de personnes) faites par le membre connecté, les plus récentes en premier, chacune avec `form.name`. `include` ajoute les questions de chaque formulaire et les réponses de la soumission. Renvoie `401` si l'utilisateur n'est pas lié à une personne. Alimente la section **My Forms** de la page B1 Me |
| GET | `/:id` | JWT | Forms.Admin ou Forms.Edit | Obtient une soumission par son ID. Ajoutez `?include=form,questions,answers` |
| GET | `/formId/:formId` | JWT | Accès au formulaire | Obtient toutes les soumissions d'un formulaire (inclut le formulaire, les questions et les réponses) |
| POST | `/` | JWT | — | Soumet les réponses d'un formulaire (gère les formulaires restreints et non restreints, envoie des notifications par courriel). Lorsque le formulaire a `autoCreatePerson`, trouve ou crée une personne Guest à partir du courriel et lie la soumission ; lorsque `followUpSubject`/`followUpBody` sont définis, envoie à l'auteur un courriel de suivi basé sur un modèle. Sauf si l'appelant peut gérer le formulaire, `submittedBy` est toujours défini sur la personne du membre connecté (ou laissé vide pour les soumissions anonymes) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprime une soumission et ses réponses |

## Questions {#questions}

Chemin de base : `/membership/questions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Liste les questions d'un formulaire. Requiert `?formId=` |
| GET | `/:id` | JWT | Accès au formulaire | Obtient une question par son ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtient les questions d'un formulaire non restreint |
| GET | `/sort/:id/up` | JWT | — | Monte une question dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Descend une question dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Crée ou met à jour des questions (attribue automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprime une question |

## Réponses {#answers}

Chemin de base : `/membership/answers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Liste les réponses. Filtre par `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Crée ou met à jour des réponses |

## Permissions de membre {#member-permissions}

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès de chaque membre à des formulaires précis.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtient une permission de membre par son ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtient toutes les permissions de formulaire d'un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtient toutes les permissions de membre d'un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtient la permission de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Crée ou met à jour des permissions de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprime une permission de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprime toutes les permissions d'un membre sur un formulaire |

## Paramètres {#settings}

Chemin de base : `/membership/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtient tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtient les paramètres publics d'une église |
| POST | `/` | JWT | Settings.Edit | Enregistre les paramètres (accepte le téléversement d'images en base64) |

## Domaines {#domains}

Chemin de base : `/membership/domains`

Hérite du CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` de la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liste tous les domaines |
| GET | `/:id` | JWT | — | Obtient un domaine par son ID |
| GET | `/lookup/:domainName` | JWT | — | Recherche un domaine par son nom |
| GET | `/public/lookup/:domainName` | Public | — | Recherche publique d'un domaine par son nom |
| GET | `/health/check` | Public | — | Lance une vérification de l'état des domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Crée ou met à jour des domaines (déclenche la mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprime un domaine |

## Utilisateur et église {#user-church}

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtient l'enregistrement utilisateur-église par ID utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtient le courriel de l'utilisateur lié à une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charge toutes les églises d'un utilisateur |
| POST | `/` | JWT | — | Crée une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Met à jour la date du dernier accès et consigne l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprime un enregistrement utilisateur-église |

## Préférences de visibilité {#visibility-preferences}

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtient les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistre les préférences de visibilité (visibilité de l'adresse, du téléphone et du courriel) |

## Requête {#query}

Chemin de base : `/membership/query`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Recherche de membres en langage naturel à l'aide de l'IA. Corps : `{ text, subDomain, siteUrl }` |

## Erreurs client {#client-errors}

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Consigne une erreur côté client |

## Pages connexes {#related-pages}

- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Modèles d'organisation du code
