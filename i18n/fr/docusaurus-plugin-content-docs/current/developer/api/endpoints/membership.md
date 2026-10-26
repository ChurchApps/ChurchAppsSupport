---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les foyers, les rôles, les permissions, les formulaires et les paramètres. C'est le plus grand module et il fournit la couche d'identité et d'autorisation de base pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## Personnes

Chemin de base : `/membership/people`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View ou Member | Lister toutes les personnes de l'église |
| GET | `/:id` | JWT | People.View ou propre fiche | Obtenir une personne par ID (inclut les soumissions de formulaires) |
| GET | `/ids?ids=` | JWT | People.View, Member ou People.ViewNames | Obtenir plusieurs personnes à partir d'IDs séparés par des virgules. Les appelants disposant de People.ViewNames sans People.View reçoivent le modèle de base, les personnes ayant refusé d'être listées étant exclues (sauf l'appelant) |
| GET | `/basic?ids=` | JWT | — | Obtenir les informations de base (nom uniquement) de plusieurs personnes |
| GET | `/names?ids=` | JWT | Toute permission de l'église | `[{ id, name: { display, first, last }, photo }]`, trié par nom de famille puis prénom, pour les IDs séparés par des virgules que l'appelant possède déjà, afin que les rôles sans People.View (dons, présences) puissent identifier les personnes. Pas de recherche, pas de filtre d'annuaire |
| POST | `/names` | JWT | Toute permission de l'église | Identique à `GET /names`. Corps : `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Personnes ajoutées récemment. Les appelants disposant de People.ViewNames sans People.View (même les membres ayant accès à l'annuaire) reçoivent le modèle de base (`id`, `name.display`, `photo`, `membershipStatus`), les personnes ayant refusé d'être listées étant exclues |
| GET | `/guest-register/options?churchId=` | Public | — | Liste de contrôle de l'inscription d'invité par QR code : renvoie `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, chacun ayant la valeur `"off"`, `"optional"` ou `"required"` (lue depuis le paramètre public `guestRegistrationFields` ; les valeurs absentes ou mal formées reviennent à e-mail/téléphone facultatifs, le reste désactivé). Nécessite `enableQRGuestRegistration`, sauf si la requête contient un jeton de site ou d'église correspondant ; limité en débit (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Rechercher des personnes par nom ou e-mail (jusqu'à 100, triées par nom de famille puis prénom). Les appelants disposant de People.ViewNames sans People.View (même les membres ayant accès à l'annuaire) obtiennent une recherche par nom renvoyant le modèle de base ; une recherche par `email` renvoie `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Rechercher par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtenir les personnes d'un groupe précis |
| GET | `/household/:householdId` | JWT | — | Obtenir toutes les personnes d'un foyer |
| GET | `/attendance` | JWT | People.Edit | Charger les participants avec des filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charger les données de chronologie pour des personnes et des groupes |
| GET | `/directory/:id` | JWT | — | Obtenir une personne pour l'affichage dans l'annuaire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Revendiquer la fiche d'une personne pour l'utilisateur actuel dans une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Créer ou mettre à jour des personnes (par lot) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Rechercher des personnes (variante POST). Corps : `{ term }` ou `{ email }` ; mêmes règles de noms uniquement que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche multicritères (âge, birthMonth, membershipStatus, etc.). Le corps est un tableau de conditions ; un corps vide signifie aucune condition, et tout autre corps qui n'est pas un tableau renvoie 400 |
| POST | `/loadOrCreate` | Public | — | Trouver ou créer une personne par e-mail. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Public | — | Inscription d'invité par QR code. Corps : `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1 à 10 membres ; email, phone et maritalStatus ne s'appliquent qu'au premier membre). Les champs désactivés par l'église sont supprimés ; les valeurs obligatoires manquantes ou invalides renvoient 400. Crée un nouveau foyer (nommé d'après le nom de famille du premier membre) avec chaque membre en `membershipStatus: "Visitor"`, partage `address` entre tous les membres, enregistre `comments` comme note sur le chef de foyer, ajoute tout le monde au groupe privé `guestRegistrationGroupId` s'il est défini, et — lorsque `guestRegistrationRecordAttendance` vaut `"true"` — enregistre la présence aux créneaux planifiés de ce groupe dont la fenêtre d'enregistrement est ouverte en ce moment. Renvoie `{ householdId, people: [{ id, name }] }`. Mêmes règles d'adhésion, de jeton et de limitation de débit que l'appel d'options |
| POST | `/household/:householdId` | JWT | People.Edit | Mettre à jour les affectations des membres du foyer |
| POST | `/public/email` | Public | — | Envoyer un e-mail à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interne | — | Charger les e-mails des personnes par IDs (de serveur à serveur, nécessite jwtSecret) |
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

## Utilisateurs

Chemin de base : `/membership/users`

Consultez [Authentification et permissions](./authentication) pour les points de terminaison de connexion, d'inscription et de gestion des mots de passe.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Public | — | Se connecter (e-mail/mot de passe, rafraîchissement du JWT ou authGuid) |
| POST | `/register` | Public | — | Inscrire un nouvel utilisateur |
| POST | `/forgot` | Public | — | Envoyer un e-mail de réinitialisation du mot de passe |
| POST | `/setPasswordGuid` | Public | — | Définir le mot de passe à l'aide du GUID d'authentification du lien reçu par e-mail |
| POST | `/verifyCredentials` | Public | — | Vérifier l'e-mail et le mot de passe, et renvoyer les églises associées |
| POST | `/loadOrCreate` | JWT | — | Trouver ou créer un utilisateur par e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Mettre à jour le prénom et le nom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Modifier l'adresse e-mail de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Modifier le mot de passe de l'utilisateur (6 caractères minimum) |
| POST | `/updateOptedOut` | JWT | — | Définir le statut de refus (opted-out) d'une personne |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envoyer par e-mail une invitation à une personne de cette église (`email`, `personName`, `contextName`). Le bouton affiche **Sign Up** pour une personne sans compte et **Log In** pour un utilisateur existant. Un utilisateur qui ne s'est jamais connecté reçoit plutôt un lien **Set Your Password** valable 7 jours. Modèle fixe, il ne compte donc pas dans la limite quotidienne d'e-mails de l'église |
| GET | `/search?term=` | JWT | Server.Admin | Rechercher tous les utilisateurs par nom ou e-mail |
| DELETE | `/` | JWT | — | Supprimer le compte utilisateur actuel |

## Églises

Chemin de base : `/membership/churches`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charger toutes les églises de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une église par ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtenir l'administrateur de domaine d'une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Se faire passer pour une église (administrateurs serveur uniquement) |
| GET | `/all?term=` | JWT | Server.Admin | Rechercher toutes les églises (admin) |
| GET | `/search/?name=` | Public | — | Rechercher des églises par nom |
| GET | `/lookup/?subDomain=&id=` | Public | — | Rechercher une église par sous-domaine ou ID |
| POST | `/` | JWT | Settings.Edit | Mettre à jour les informations de l'église |
| POST | `/add` | JWT | — | Enregistrer une nouvelle église. Champs obligatoires : name, address1, city, state, zip, country |
| POST | `/search` | Public | — | Rechercher des églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionner ou changer d'église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiver ou désarchiver une église |
| POST | `/byIds` | Public | — | Charger plusieurs églises à partir d'IDs |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprimer les églises abandonnées depuis 7 jours ou plus |

## Groupes

Chemin de base : `/membership/groups`

Étend le CRUD standard (GET `/`, GET `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les groupes |
| GET | `/:id` | JWT | — | Obtenir un groupe par ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Rechercher des groupes selon les filtres de service |
| GET | `/my` | JWT | — | Obtenir les groupes de l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtenir les groupes de l'utilisateur actuel filtrés par étiquette |
| GET | `/tag/:tag` | JWT | — | Obtenir tous les groupes portant une étiquette précise |
| GET | `/public/:churchId/:id` | Public | — | Obtenir un groupe public par église et ID |
| GET | `/public/:churchId/tag/:tag` | Public | — | Obtenir les groupes publics par étiquette |
| GET | `/public/:churchId/label?label=` | Public | — | Obtenir les groupes publics par libellé |
| GET | `/public/:churchId/slug/:slug` | Public | — | Obtenir un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Créer ou mettre à jour des groupes (génère automatiquement le slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprimer un groupe (supprime aussi les équipes enfants pour les groupes de ministère) |

## Membres de groupe

Chemin de base : `/membership/groupmembers`

Étend le CRUD standard (GET `/:id`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtenir un membre de groupe par ID |
| GET | `/` | JWT | GroupMembers.View* | Lister les membres de groupe. Filtrer avec `?groupId=`, `?groupIds=` ou `?personId=`. *Également autorisé si l'utilisateur fait partie du groupe ou demande son propre personId, et pour `?groupId=` de tout groupe non confidentiel lorsque l'utilisateur dispose de Attendance.View ou Attendance.Edit (les membres de moins de 13 ans sont inclus pour eux) |
| GET | `/my` | JWT | — | Obtenir les adhésions aux groupes de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtenir la liste de base des membres d'un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Public | — | Obtenir les responsables d'un groupe (public) |
| GET | `/public/:churchId/:groupId` | Public | — | Obtenir la liste publique d'un groupe (champs minimaux : `personId`, `displayName`, `leader`, photo). Uniquement lorsque le groupe accepte via `publicRoster` ; alimente l'élément `staffGrid` du créateur de sites |
| POST | `/` | JWT | GroupMembers.Edit | Ajouter ou mettre à jour des membres de groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Retirer un membre de groupe |

## Foyers

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les foyers |
| GET | `/:id` | JWT | — | Obtenir un foyer par ID |
| POST | `/` | JWT | People.Edit | Créer ou mettre à jour des foyers |
| DELETE | `/:id` | JWT | People.Edit | Supprimer un foyer |

## Rôles

Chemin de base : `/membership/roles`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtenir un rôle par ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtenir tous les rôles d'une église. Chaque rôle inclut `memberCount`, le nombre d'utilisateurs distincts qui en font partie |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour des rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer un rôle (supprime aussi ses permissions et ses membres) |

## Membres de rôle

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les membres d'un rôle. Ajouter `?include=users` pour inclure les détails des utilisateurs |
| POST | `/` | JWT | Roles.Edit | Ajouter des membres à un rôle (crée l'utilisateur si l'e-mail n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Retirer un membre d'un rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Se retirer d'une église |

## Permissions de rôle

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les permissions d'un rôle (utiliser `null` comme ID pour le rôle « Everyone ») |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour les permissions d'un rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer une permission de rôle |

## Permissions

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtenir la liste complète des permissions disponibles |

Chaque entrée comporte `apiName`, `section` (type de contenu), `action`, ainsi que les libellés `displaySection` / `displayAction` affichés par l'éditeur de rôles de B1Admin. Ajouts récents : `MembershipApi` / `People` / `View Names` (**View People Names Only**, sous People and Groups) et `GivingApi` / `Donations` / `Enter` (**Enter Donations**, sous Donations ; voir [Lots de dons](./giving.md#donation-batches)).

## Formulaires

Chemin de base : `/membership/forms`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister tous les formulaires (l'admin voit tout ; les éditeurs voient ceux qui leur sont assignés et les formulaires non réservés aux membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir un formulaire par ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lister les formulaires archivés |
| GET | `/group/:groupId` | JWT | Membre du groupe, responsable du groupe ou Forms.Admin | Formulaires autonomes liés au groupe (`forms.groupId`), à l'exclusion des formulaires archivés, triés par nom. Renvoie `id`, `name`, `description` et `open` (dans la période de disponibilité). Les membres n'obtiennent que les formulaires ouverts ; les responsables et les administrateurs de formulaires obtiennent aussi les formulaires fermés. Alimente les formulaires liés sur la page du groupe |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtenir un formulaire autonome (les formulaires à accès restreint exigent une authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des formulaires. Les formulaires autonomes acceptent `photoUrl` (photo d'en-tête affichée au-dessus du formulaire) et `groupId` (groupe lié), tous deux facultatifs |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprimer un formulaire |

## Soumissions de formulaires

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les soumissions. Filtrer avec `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Limité à l'utilisateur : jusqu'à 50 soumissions de formulaires autonomes (et non de formulaires de personne) envoyées par le membre connecté ou liées à sa fiche (`contentType` `person`, `contentId` = l'ID de sa personne — par exemple, après une modification faite par un administrateur), les plus récentes en premier, chacune avec `form.name`. `include` joint les questions de chaque formulaire et les réponses de la soumission. Renvoie `401` si l'utilisateur n'est lié à aucune personne. Alimente la section **My Forms** de la page B1 Me |
| GET | `/group/:groupId` | JWT | Responsable du groupe | Réponses destinées aux responsables du groupe : une entrée par formulaire lié et par événement de groupe disposant d'un formulaire d'inscription, chacune avec `form`, `event` (`id`, `title`, `start` ; uniquement pour les entrées d'événement), `questions` et `submissions` (avec `answers` et `personName`, `null` si anonyme) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ou accès en lecture | Obtenir une soumission par ID. Ajouter `?include=form,questions,answers`. Les responsables du groupe lié au formulaire, ainsi que les responsables du groupe auquel appartient une inscription à un événement, peuvent aussi la lire |
| GET | `/formId/:formId` | JWT | Accès au formulaire (lecture) | Obtenir toutes les soumissions d'un formulaire (inclut form, questions, answers). Les responsables du groupe lié au formulaire ont un accès en lecture |
| POST | `/` | JWT | — | Envoyer les réponses d'un formulaire (gère les formulaires à accès restreint ou non, envoie des notifications par e-mail). Lorsque le formulaire a `autoCreatePerson`, trouve ou crée une personne Guest par e-mail et lie la soumission ; lorsque le formulaire a aussi un `groupId`, ajoute cette personne au groupe ; lorsque `followUpSubject`/`followUpBody` sont définis, envoie un e-mail de suivi à partir d'un modèle à la personne qui a soumis. Sauf si l'appelant peut gérer le formulaire, `submittedBy` est toujours défini comme la personne du membre connecté (ou laissé vide pour les soumissions anonymes) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprimer une soumission et ses réponses |

## Questions

Chemin de base : `/membership/questions`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Lister les questions d'un formulaire. `?formId=` requis |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une question par ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtenir les questions d'un formulaire non restreint |
| GET | `/sort/:id/up` | JWT | — | Monter une question dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Descendre une question dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des questions (attribue automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une question |

## Réponses

Chemin de base : `/membership/answers`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les réponses. Filtrer avec `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des réponses |

## Permissions des membres

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès de chaque membre à des formulaires précis.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une permission de membre par ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de formulaire d'un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtenir toutes les permissions de membre pour un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtenir la permission de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des permissions de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une permission de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprimer toutes les permissions d'un membre sur un formulaire |

## Paramètres

Chemin de base : `/membership/settings`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Public | — | Obtenir les paramètres publics d'une église |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres (prend en charge l'envoi d'images en base64) |

## Domaines

Chemin de base : `/membership/domains`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les domaines |
| GET | `/:id` | JWT | — | Obtenir un domaine par ID |
| GET | `/lookup/:domainName` | JWT | — | Rechercher un domaine par nom |
| GET | `/public/lookup/:domainName` | Public | — | Recherche publique de domaine par nom |
| GET | `/health/check` | Public | — | Lancer une vérification d'état sur les domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour des domaines (déclenche la mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer un domaine |

## Lien utilisateur-église

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtenir l'enregistrement utilisateur-église par ID d'utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtenir l'e-mail de l'utilisateur lié à une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charger toutes les églises d'un utilisateur |
| POST | `/` | JWT | — | Créer une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Mettre à jour la date du dernier accès et enregistrer l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprimer un enregistrement utilisateur-église |

## Préférences de visibilité

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistrer les préférences de visibilité (visibilité de l'adresse, du téléphone et de l'e-mail) |

## Requête

Chemin de base : `/membership/query`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Recherche de membres en langage naturel grâce à l'IA. Corps : `{ text, subDomain, siteUrl }` |

## Erreurs côté client

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Enregistrer une erreur côté client |

## Pages connexes

- [Authentification et permissions](./authentication) — Flux de connexion, JWT, OAuth, modèle de permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure des modules](../module-structure) — Modèles d'organisation du code
