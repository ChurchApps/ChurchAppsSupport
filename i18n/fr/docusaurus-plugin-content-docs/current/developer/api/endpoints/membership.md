---
title: "Points de terminaison Membership"
---

# Points de terminaison Membership

<div class="article-intro">

Le module Membership gère les personnes, les églises, les groupes, les foyers, les rôles, les autorisations, les formulaires et les paramètres. C'est le plus grand module ; il fournit la couche d'identité et d'autorisation centrale pour tous les autres modules.

</div>

**Chemin de base :** `/membership`

## Personnes

Chemin de base : `/membership/people`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | People.View ou Member | Lister toutes les personnes de l'église |
| GET | `/:id` | JWT | People.View ou sa propre fiche | Obtenir une personne par ID (inclut les soumissions de formulaires) |
| GET | `/ids?ids=` | JWT | People.View, Member ou People.ViewNames | Obtenir plusieurs personnes par ID séparés par des virgules. Les appelants People.ViewNames sans People.View obtiennent le modèle de base, les personnes désabonnées étant exclues (sauf l'appelant lui-même) |
| GET | `/basic?ids=` | JWT | — | Obtenir les renseignements de base (nom seulement) pour plusieurs personnes |
| GET | `/names?ids=` | JWT | Toute autorisation de l'église | `[{ id, name: { display, first, last }, photo }]`, trié par nom de famille puis prénom, pour des ID séparés par des virgules que l'appelant possède déjà, afin que les rôles sans People.View (dons, présence) puissent identifier les personnes. Ni recherche ni filtre de répertoire |
| POST | `/names` | JWT | Toute autorisation de l'église | Identique à `GET /names`. Corps : `{ peopleIds }` (ou `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member ou People.ViewNames | Personnes ajoutées récemment. Les appelants People.ViewNames sans People.View (même les membres ayant accès au répertoire) obtiennent le modèle de base (`id`, `name.display`, `photo`, `membershipStatus`), les personnes désabonnées étant exclues |
| GET | `/guest-register/options?churchId=` | Publique | — | Liste de contrôle de l'inscription des visiteurs par code QR : renvoie `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, chacun valant `"off"`, `"optional"` ou `"required"` (lu depuis le paramètre public `guestRegistrationFields` ; les valeurs absentes ou mal formées reviennent à e-mail/téléphone facultatifs, le reste désactivé). Exige `enableQRGuestRegistration`, sauf si la requête porte un jeton de site/église correspondant ; limité en débit (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member ou People.ViewNames | Rechercher des personnes par nom ou e-mail (jusqu'à 100, triées par nom de famille puis prénom). Les appelants People.ViewNames sans People.View (même les membres ayant accès au répertoire) obtiennent une recherche par nom renvoyant le modèle de base ; une recherche par `email` renvoie `[]` |
| GET | `/search/phone?number=` | JWT | People.View ou Member | Rechercher par numéro de téléphone |
| GET | `/search/group?groupId=` | JWT | People.View ou Member | Obtenir les personnes d'un groupe précis |
| GET | `/household/:householdId` | JWT | — | Obtenir toutes les personnes d'un foyer |
| GET | `/attendance` | JWT | People.Edit | Charger les participants avec des filtres (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Charger les données de chronologie pour des personnes et des groupes |
| GET | `/directory/:id` | JWT | — | Obtenir une personne pour la vue du répertoire (respecte les préférences de visibilité) |
| GET | `/claim/:churchId` | JWT | — | Réclamer une fiche de personne pour l'utilisateur actuel dans une église |
| POST | `/` | JWT | People.Edit ou EditSelf | Créer ou mettre à jour des personnes (lot) |
| POST | `/search` | JWT | People.View, Member ou People.ViewNames | Rechercher des personnes (variante POST). Corps : `{ term }` ou `{ email }` ; mêmes règles de noms seulement que `GET /search` |
| POST | `/advancedSearch` | JWT | People.View ou Member | Recherche à conditions multiples (âge, birthMonth, membershipStatus, etc.). Le corps est un tableau de conditions ; un corps vide signifie aucune condition, et tout autre corps non tabulaire renvoie 400 |
| POST | `/loadOrCreate` | Publique | — | Trouver ou créer une personne par e-mail. Corps : `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Publique | — | Inscription des visiteurs par code QR. Corps : `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1 à 10 membres ; e-mail/téléphone/maritalStatus s'appliquent au premier membre seulement). Les champs désactivés par l'église sont retirés ; les valeurs obligatoires manquantes ou invalides renvoient 400. D'abord, réutilise les personnes existantes : un membre correspond lorsqu'exactement une personne non supprimée a le même prénom (sans tenir compte de la casse) et le même e-mail ou les mêmes chiffres de téléphone (domicile, travail ou mobile) ; un membre sans e-mail ni téléphone correspond par prénom au sein du foyer associé. Les personnes correspondantes ne sont jamais modifiées. Les membres non associés rejoignent le foyer associé, ou sinon un nouveau foyer (nommé d'après le nom de famille du premier membre), avec `membershipStatus: "Visitor"` et l'`address` partagée. Enregistre `comments` comme note sur le premier membre, ajoute tout le monde au groupe privé `guestRegistrationGroupId` s'il est défini, et -- lorsque `guestRegistrationRecordAttendance` vaut `"true"` -- enregistre la présence aux horaires de service planifiés de ce groupe dont la fenêtre d'enregistrement est ouverte à cet instant. Renvoie `{ householdId, people: [{ id, name }] }`, reprenant les noms soumis plutôt que ceux enregistrés. Mêmes règles d'adhésion/de jeton et de limitation de débit que l'appel des options |
| POST | `/household/:householdId` | JWT | People.Edit | Mettre à jour les affectations des membres d'un foyer |
| POST | `/public/email` | Publique | — | Envoyer un e-mail à une personne. Corps : `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Interne | — | Charger les e-mails de personnes par ID (serveur à serveur, exige jwtSecret) |
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

Consultez [Authentification et autorisations](./authentication) pour les points de terminaison de connexion, d'inscription et de gestion des mots de passe.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/login` | Publique | — | Se connecter (e-mail/mot de passe, renouvellement JWT ou authGuid) |
| POST | `/register` | Publique | — | Inscrire un nouvel utilisateur |
| POST | `/forgot` | Publique | — | Envoyer un e-mail de réinitialisation du mot de passe |
| POST | `/setPasswordGuid` | Publique | — | Définir le mot de passe à l'aide du GUID d'authentification provenant du lien e-mail |
| POST | `/verifyCredentials` | Publique | — | Vérifier l'e-mail/mot de passe et renvoyer les églises associées |
| POST | `/loadOrCreate` | JWT | — | Trouver ou créer un utilisateur par e-mail/userId |
| POST | `/setDisplayName` | JWT | — | Mettre à jour le prénom et le nom de l'utilisateur |
| POST | `/updateEmail` | JWT | — | Modifier l'adresse e-mail de l'utilisateur |
| POST | `/updatePassword` | JWT | — | Modifier le mot de passe de l'utilisateur (6 caractères minimum) |
| POST | `/updateOptedOut` | JWT | — | Définir le statut de désabonnement d'une personne |
| POST | `/sendInviteEmail` | JWT | People.Edit | Envoyer une invitation par e-mail à une personne de cette église (`email`, `personName`, `contextName`). Le bouton affiche **Sign Up** pour une personne sans compte et **Log In** pour un utilisateur existant. Un utilisateur qui ne s'est jamais connecté reçoit plutôt un lien **Set Your Password** valable 7 jours. Modèle fixe, il ne compte donc pas dans la limite quotidienne d'e-mails de l'église |
| GET | `/search?term=` | JWT | Server.Admin | Rechercher tous les utilisateurs par nom/e-mail |
| DELETE | `/` | JWT | — | Supprimer le compte de l'utilisateur actuel |

## Églises

Chemin de base : `/membership/churches`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Charger toutes les églises de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une église par ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Obtenir l'utilisateur administrateur de domaine d'une église |
| GET | `/:id/impersonate` | JWT | Server.Admin | Se faire passer pour une église (administrateur serveur seulement) |
| GET | `/all?term=` | JWT | Server.Admin | Rechercher toutes les églises (administration) |
| GET | `/search/?name=` | Publique | — | Rechercher des églises par nom |
| GET | `/lookup/?subDomain=&id=` | Publique | — | Rechercher une église par sous-domaine ou ID |
| POST | `/` | JWT | Settings.Edit | Mettre à jour les détails de l'église |
| POST | `/add` | JWT | — | Inscrire une nouvelle église. Champs obligatoires : name, address1, city, state, zip, country |
| POST | `/search` | Publique | — | Rechercher des églises par nom (variante POST) |
| POST | `/select` | JWT | — | Sélectionner/changer d'église. Corps : `{ churchId }` ou `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Archiver ou désarchiver une église |
| POST | `/byIds` | Publique | — | Charger plusieurs églises par ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Supprimer les églises abandonnées depuis 7 jours ou plus |

## Groupes

Chemin de base : `/membership/groups`

Étend le CRUD standard (GET `/`, GET `/:id` depuis la classe de base).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les groupes |
| GET | `/:id` | JWT | — | Obtenir un groupe par ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Rechercher des groupes par filtres de service |
| GET | `/my` | JWT | — | Obtenir les groupes de l'utilisateur actuel |
| GET | `/my/:tag` | JWT | — | Obtenir les groupes de l'utilisateur actuel filtrés par étiquette |
| GET | `/tag/:tag` | JWT | — | Obtenir tous les groupes ayant une étiquette précise |
| GET | `/public/:churchId/:id` | Publique | — | Obtenir un groupe public par église et ID |
| GET | `/public/:churchId/tag/:tag` | Publique | — | Obtenir les groupes publics par étiquette |
| GET | `/public/:churchId/label?label=` | Publique | — | Obtenir les groupes publics par libellé |
| GET | `/public/:churchId/slug/:slug` | Publique | — | Obtenir un groupe public par slug |
| POST | `/` | JWT | Groups.Edit | Créer ou mettre à jour des groupes (génère automatiquement le slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Supprimer un groupe (supprime aussi les équipes enfants des groupes de ministère) |

## Membres de groupe

Chemin de base : `/membership/groupmembers`

Étend le CRUD standard (GET `/:id`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Obtenir un membre de groupe par ID |
| GET | `/` | JWT | GroupMembers.View* | Lister les membres de groupe. Filtrer par `?groupId=`, `?groupIds=` ou `?personId=`. *Également permis si l'utilisateur est membre du groupe ou interroge son propre personId, et pour `?groupId=` de tout groupe non confidentiel lorsque l'utilisateur a Attendance.View ou Attendance.Edit (les membres de moins de 13 ans sont inclus pour eux) |
| GET | `/my` | JWT | — | Obtenir les adhésions aux groupes de l'utilisateur actuel |
| GET | `/basic/:groupId` | JWT | — | Obtenir la liste de base des membres d'un groupe |
| GET | `/public/leaders/:churchId/:groupId` | Publique | — | Obtenir les responsables d'un groupe (public) |
| GET | `/public/:churchId/:groupId` | Publique | — | Obtenir la liste publique d'un groupe (champs minimaux : `personId`, `displayName`, `leader`, photo). Seulement lorsque le groupe accepte via `publicRoster` ; alimente l'élément `staffGrid` du constructeur de site web |
| POST | `/` | JWT | GroupMembers.Edit | Ajouter ou mettre à jour des membres de groupe |
| DELETE | `/:id` | JWT | GroupMembers.View | Retirer un membre de groupe |

## Foyers

Chemin de base : `/membership/households`

Contrôleur CRUD standard.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les foyers |
| GET | `/:id` | JWT | — | Obtenir un foyer par ID |
| POST | `/` | JWT | People.Edit | Créer ou mettre à jour des foyers |
| DELETE | `/:id` | JWT | People.Edit | Supprimer un foyer |

## Rôles

Chemin de base : `/membership/roles`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | Roles.View | Obtenir un rôle par ID |
| GET | `/church/:churchId` | JWT | Roles.View | Obtenir tous les rôles d'une église. Chaque rôle comprend `memberCount`, le nombre d'utilisateurs distincts qui en font partie |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour des rôles |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer un rôle (supprime aussi ses autorisations et ses membres) |

## Membres de rôle

Chemin de base : `/membership/rolemembers`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les membres d'un rôle. Ajoutez `?include=users` pour inclure les détails des utilisateurs |
| POST | `/` | JWT | Roles.Edit | Ajouter des membres à un rôle (crée l'utilisateur si l'e-mail n'existe pas) |
| DELETE | `/:id` | JWT | Roles.View | Retirer un membre de rôle |
| DELETE | `/self/:churchId/:userId` | JWT | — | Vous retirer d'une église |

## Autorisations de rôle

Chemin de base : `/membership/rolepermissions`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Obtenir les autorisations d'un rôle (utilisez `null` comme ID pour le rôle « Tout le monde ») |
| POST | `/` | JWT | Roles.Edit | Créer ou mettre à jour les autorisations d'un rôle |
| DELETE | `/:id` | JWT | Roles.Edit | Supprimer une autorisation de rôle |

## Autorisations

Chemin de base : `/membership/permissions`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Obtenir la liste complète des autorisations disponibles |

Chaque entrée comprend `apiName`, `section` (type de contenu), `action`, et les libellés `displaySection` / `displayAction` qu'affiche l'éditeur de rôles de B1Admin. Ajouts récents : `MembershipApi` / `People` / `View Names` (**Voir les noms des personnes uniquement**, sous Personnes et groupes) et `GivingApi` / `Donations` / `Enter` (**Saisir les dons**, sous Dons ; consultez [Lots de dons](./giving.md#donation-batches)).

## Formulaires

Chemin de base : `/membership/forms`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister tous les formulaires (l'administrateur voit tout ; les éditeurs voient les formulaires assignés et ceux qui ne concernent pas les membres) |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir un formulaire par ID |
| GET | `/archived` | JWT | Forms.Admin ou Forms.Edit | Lister les formulaires archivés |
| GET | `/group/:groupId` | JWT | Membre du groupe, responsable du groupe ou Forms.Admin | Formulaires autonomes liés au groupe (`forms.groupId`), à l'exclusion des archivés, triés par nom. Renvoie `id`, `name`, `description` et `open` (dans la fenêtre de disponibilité). Les membres n'obtiennent que les formulaires ouverts ; les responsables et les administrateurs des formulaires obtiennent aussi les fermés. Alimente la section des formulaires liés de la page du groupe |
| GET | `/standalone/:id?churchId=` | JWT | — | Obtenir un formulaire autonome (les formulaires restreints exigent une authentification) |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des formulaires. Les formulaires autonomes acceptent un `photoUrl` facultatif (photo d'en-tête affichée au-dessus du formulaire) et un `groupId` facultatif (groupe lié) |
| DELETE | `/:id` | JWT | Accès au formulaire | Supprimer un formulaire |

## Soumissions de formulaires

Chemin de base : `/membership/formsubmissions`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les soumissions. Filtrer par `?personId=` ou `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Portée personnelle : jusqu'à 50 soumissions de formulaires autonomes (pas de formulaires de personne) que le membre connecté a soumises ou qui sont liées à sa personne (`contentType` `person`, `contentId` = l'ID de sa personne -- par exemple après un changement de personne par un administrateur), les plus récentes en premier, chacune avec `form.name`. `include` joint les questions de chaque formulaire et les réponses de la soumission. Renvoie `401` si l'utilisateur n'est pas lié à une personne. Alimente la section **Mes formulaires** de la page Moi de B1 |
| GET | `/group/:groupId` | JWT | Responsable du groupe | Réponses pour les responsables du groupe : une entrée par formulaire lié et par événement de groupe avec un formulaire d'inscription, chacune avec `form`, `event` (`id`, `title`, `start` ; entrées d'événement seulement), `questions` et `submissions` (avec `answers` et `personName`, `null` si anonyme) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit ou accès en lecture | Obtenir une soumission par ID. Ajoutez `?include=form,questions,answers`. Les responsables du groupe lié au formulaire, et les responsables du groupe auquel appartient une inscription à un événement, peuvent aussi la lire |
| GET | `/formId/:formId` | JWT | Accès au formulaire (lecture) | Obtenir toutes les soumissions d'un formulaire (inclut le formulaire, les questions et les réponses). Les responsables du groupe lié au formulaire ont un accès en lecture |
| POST | `/` | JWT | — | Soumettre les réponses d'un formulaire (gère les formulaires restreints et non restreints, envoie les notifications par e-mail). Lorsque le formulaire a `autoCreatePerson`, trouve-ou-crée une personne invitée par e-mail et lie la soumission ; lorsque le formulaire a aussi un `groupId`, ajoute cette personne au groupe ; lorsque `followUpSubject`/`followUpBody` sont définis, envoie un e-mail de suivi basé sur un modèle à l'auteur de la soumission. Sauf si l'appelant peut gérer le formulaire, `submittedBy` est toujours défini sur la personne du membre connecté (ou laissé vide pour les soumissions anonymes) |
| DELETE | `/:id` | JWT | Forms.Admin ou Forms.Edit | Supprimer une soumission et ses réponses |

## Questions

Chemin de base : `/membership/questions`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Accès au formulaire | Lister les questions d'un formulaire. Exige `?formId=` |
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une question par ID |
| GET | `/unrestricted?formId=` | JWT | — | Obtenir les questions d'un formulaire non restreint |
| GET | `/sort/:id/up` | JWT | — | Monter une question dans l'ordre de tri |
| GET | `/sort/:id/down` | JWT | — | Descendre une question dans l'ordre de tri |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des questions (attribue automatiquement l'ordre de tri) |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une question |

## Réponses

Chemin de base : `/membership/answers`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Forms.Admin ou Forms.Edit | Lister les réponses. Filtrer par `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin ou Forms.Edit | Créer ou mettre à jour des réponses |

## Autorisations de membre

Chemin de base : `/membership/memberpermissions`

Contrôle l'accès de chaque membre à des formulaires précis.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | Accès au formulaire | Obtenir une autorisation de membre par ID |
| GET | `/member/:id` | JWT | Accès au formulaire | Obtenir toutes les autorisations de formulaire d'un membre |
| GET | `/form/:id` | JWT | Accès au formulaire | Obtenir toutes les autorisations de membre d'un formulaire |
| GET | `/form/:id/my` | JWT | Accès au formulaire | Obtenir l'autorisation de l'utilisateur actuel pour un formulaire |
| POST | `/` | JWT | Accès au formulaire | Créer ou mettre à jour des autorisations de membre |
| DELETE | `/:id?formId=` | JWT | Accès au formulaire | Supprimer une autorisation de membre |
| DELETE | `/member/:id?formId=` | JWT | Accès au formulaire | Supprimer toutes les autorisations d'un membre sur un formulaire |

## Paramètres

Chemin de base : `/membership/settings`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | Settings.Edit | Obtenir tous les paramètres de l'église |
| GET | `/public/:churchId` | Publique | — | Obtenir les paramètres publics d'une église |
| POST | `/` | JWT | Settings.Edit | Enregistrer les paramètres (prend en charge le téléversement d'images en base64) |

## Domaines

Chemin de base : `/membership/domains`

Étend le CRUD standard (GET `/:id`, GET `/`, DELETE `/:id` depuis la classe de base).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les domaines |
| GET | `/:id` | JWT | — | Obtenir un domaine par ID |
| GET | `/lookup/:domainName` | JWT | — | Rechercher un domaine par nom |
| GET | `/public/lookup/:domainName` | Publique | — | Recherche publique de domaine par nom |
| GET | `/health/check` | Publique | — | Lancer une vérification de l'état des domaines non vérifiés |
| POST | `/` | JWT | Settings.Edit | Créer ou mettre à jour des domaines (déclenche une mise à jour de Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Supprimer un domaine |

## Lien utilisateur-église

Chemin de base : `/membership/userchurch`

Gère l'association entre les utilisateurs et les églises.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/userid/:userId` | JWT | — | Obtenir l'enregistrement utilisateur-église par ID utilisateur |
| GET | `/personid/:personId` | JWT | — | Obtenir l'e-mail de l'utilisateur lié à une personne |
| GET | `/user/:userId` | JWT | Server.Admin | Charger toutes les églises d'un utilisateur |
| POST | `/` | JWT | — | Créer une association utilisateur-église |
| PATCH | `/:userId` | JWT | — | Mettre à jour la date du dernier accès et consigner l'accès |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Supprimer un enregistrement utilisateur-église |

## Préférences de visibilité

Chemin de base : `/membership/visibilityPreferences`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/my` | JWT | — | Obtenir les préférences de visibilité de l'utilisateur actuel |
| POST | `/` | JWT | — | Enregistrer les préférences de visibilité (visibilité de l'adresse, du téléphone et de l'e-mail) |

## Requête

Chemin de base : `/membership/query`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/members` | JWT | — | Recherche de membres en langage naturel à l'aide de l'IA. Corps : `{ text, subDomain, siteUrl }` |

## Erreurs client

Chemin de base : `/membership/clientErrors`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/` | JWT | — | Consigner une erreur côté client |

## Pages connexes

- [Authentification et autorisations](./authentication) — Flux de connexion, JWT, OAuth, modèle d'autorisations
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure des modules](../module-structure) — Modèles d'organisation du code
