---
title: "Points de terminaison Doing"
---

# Points de terminaison Doing

<div class="article-intro">

Le module Doing gère la planification des services, la programmation des bénévoles, la gestion des tâches et les automatisations. Il fournit des outils pour créer des plans de service avec des horaires et des postes, assigner des bénévoles, gérer les dates d'indisponibilité, construire les éléments de l'ordre du service, se connecter à des fournisseurs de contenu externes et configurer des flux de travail automatisés avec des conditions et des actions.

</div>

**Chemin de base :** `/doing`

## Plans

Chemin de base : `/doing/plans`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les plans de l'église |
| GET | `/:id` | JWT | — | Obtenir un plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs plans par ID séparés par des virgules |
| GET | `/types/:planTypeId` | JWT | — | Obtenir les plans par type de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modification du ministère | Prévisualiser l'envoi **Textos aux bénévoles** de l'aperçu des services : `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pour les bénévoles assignés dans la plage (une fois par personne ; les numéros de personnes désabonnées et manquants sont ignorés ; les numéros partagés sont dédupliqués ; plafonné à 200) |
| GET | `/presenter` | JWT | — | Obtenir les plans des 7 prochains jours (vue présentateur) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Modification du ministère | Flux de travail de confirmation d'affectation de service actifs (`workflowType = "assignmentConfirmation"`) qu'un plan peut sélectionner : `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Publique | — | Obtenir le plan actuel pour un type de plan |
| GET | `/public/signup/:churchId` | Publique | — | Plans ouverts à l'inscription libre, les plus proches en premier, chacun avec ses postes d'inscription libre (triés par `categoryName`, puis `name`, plus `filledCount` des affectations Acceptées/Non confirmées) et les horaires. Aucun nom de bénévole. Lorsque le paramètre d'église `volunteerSignupNextOnly` vaut `"true"`, seul le premier plan de chaque type de plan est renvoyé. Chaque `plan` comprend un `signupDeadline` calculé (instant ISO, ou `null`) : `signupDeadlineHours` avant le premier horaire `service` du plan (toute entrée horodatée s'il n'y a pas d'horaire de service ; 9 h 00 dans le fuseau horaire de l'église à `serviceDate` si le plan n'a pas d'horaires) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pour les postes d'inscription libre du plan (noms affichés des personnes Acceptées/Non confirmées assignées). Renvoie `[]` sauf si `showVolunteerNames` du plan est activé |
| POST | `/` | JWT | — | Créer ou mettre à jour des plans (accepte un objet unique ou un tableau). Définissez `confirmationWorkflowId` pour inscrire le plan à un flux de travail de confirmation des services, ou `null` pour le désinscrire des demandes futures. Envoyez `signupDeadlineHours: null` pour effacer une échéance ; omettre le champ conserve la valeur enregistrée |
| POST | `/copy/:id` | JWT | Modification du ministère | Copier un plan avec ses postes, ses horaires, ses affectations et ses éléments d'ordre du service. Le corps comprend `ministryId`, `serviceDate`, `copyMode` (« none », « positions », « all ») et `copyServiceOrder` (booléen). Sans `targetPlanId`, un nouveau plan est créé, et `notes`, `signupDeadlineHours`, `showVolunteerNames` et `autoReplaceOnDecline` sont reportés depuis le plan source, sauf si le corps les fournit. Avec `targetPlanId`, la copie remplit plutôt ce plan existant (l'appelant doit pouvoir le modifier). L'option **Répéter chaque semaine** de B1Admin appelle cette route une fois par semaine, chaque fois en copiant depuis le plan créé la semaine précédente |
| POST | `/textRange` | JWT | `texting.send` + modification du ministère | Envoyer un texto à chaque bénévole assigné dans une plage de dates par l'intermédiaire du fournisseur de messagerie texte de l'église. Corps : `{ startDate, endDate, ministryId, planTypeId?, message }` (message jusqu'à 1600 caractères ; champs de fusion résolus pour chaque destinataire). Renvoie les décomptes de l'aperçu plus `recipientCount`, `successCount`, `failCount`, et `error` (`no_provider` ou `insufficient_credits`) lorsque l'envoi s'arrête prématurément |
| POST | `/:id/issueRequests` | JWT | Modification du plan | Émettre les nouvelles affectations Non confirmées et non encore avisées du plan par son flux de travail de confirmation : marque chacune comme avisée et démarre une carte de flux de travail par affectation. Corps vide ; renvoie `{ issued }`. Échoue à moins que le plan soit publié (non `prepared`), qu'il ait un `confirmationWorkflowId` actif comportant au moins une étape, et que son échéance de réponse ne soit pas dépassée |
| POST | `/autofill/:id` | JWT | — | Remplir automatiquement les affectations de bénévoles d'un plan. Corps : `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Supprimer un plan ainsi que tous ses horaires, affectations, postes et éléments de plan liés |

### Exemple : copier un plan

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Types de plans

Chemin de base : `/doing/planTypes`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérifications d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister tous les types de plans |
| GET | `/:id` | JWT | — | Obtenir un type de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs types de plans par ID séparés par des virgules |
| GET | `/ministryId/:ministryId` | JWT | — | Obtenir les types de plans d'un ministère |
| POST | `/` | JWT | — | Créer ou mettre à jour des types de plans |
| DELETE | `/:id` | JWT | — | Supprimer un type de plan |

## Éléments de plan

Chemin de base : `/doing/planItems`

Gère les éléments de l'ordre du service (en-têtes, sections, chants, etc.) organisés dans une structure arborescente parent-enfant.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs éléments de plan par ID séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les éléments d'un plan (renvoie une structure arborescente) |
| GET | `/presenter/:churchId/:planId` | Publique | — | Obtenir les éléments de plan pour la vue présentateur (renvoie une structure arborescente) |
| POST | `/` | JWT | — | Créer ou mettre à jour des éléments de plan |
| POST | `/sort` | JWT | — | Mettre à jour l'ordre de tri d'un élément de plan (réordonne les éléments frères) |
| DELETE | `/:id` | JWT | — | Supprimer un élément de plan |

## Flux du plan

Chemin de base : `/doing/planFeed`

Fournit les flux d'éléments de plan pour le présentateur. Si aucun élément de plan n'existe, remplit automatiquement à partir du flux de la venue Lessons.church à l'aide du `contentId` du plan.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/presenter/:churchId/:planId` | Publique | — | Obtenir le flux du plan pour le présentateur (remplissage automatique depuis le flux de la venue si vide) |

## Postes

Chemin de base : `/doing/positions`

Étend la classe de base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sans vérifications d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un poste par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs postes par ID séparés par des virgules |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les postes de plusieurs plans par ID de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les postes d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des postes |
| DELETE | `/:id` | JWT | — | Supprimer un poste |

## Horaires

Chemin de base : `/doing/times`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/all` | JWT | — | Lister tous les horaires de l'église |
| GET | `/:id` | JWT | — | Obtenir un horaire par ID |
| GET | `/plans?planIds=` | JWT | — | Obtenir les horaires de plusieurs plans par ID de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les horaires d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des horaires |
| DELETE | `/:id` | JWT | — | Supprimer un horaire |

## Affectations

Chemin de base : `/doing/assignments`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/my` | JWT | — | Obtenir les affectations de l'utilisateur actuel |
| GET | `/my/upcoming` | JWT | — | Jusqu'à 20 affectations de l'utilisateur actuel sur des plans datés à partir d'hier (les plans mis en attente ou `prepared` sont ignorés), les plus proches en premier : `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimente l'aperçu des services sur la page d'accueil des membres |
| GET | `/:id` | JWT | — | Obtenir une affectation par ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les affectations de plusieurs plans par ID de plan séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir toutes les affectations d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des affectations (le statut est par défaut « Unconfirmed ») |
| POST | `/accept/:id` | JWT | — | Accepter une affectation (doit être la personne assignée) |
| POST | `/decline/:id` | JWT | — | Refuser une affectation (doit être la personne assignée) |
| POST | `/signup` | JWT | — | Inscription libre à un poste. Corps : `{ positionId }`. Le poste doit autoriser l'inscription libre et avoir de la place ; crée une affectation Acceptée. Refusée avec « Signup deadline has passed » une fois l'échéance d'inscription du plan (comptée à reculons à partir de son premier horaire de service, comme ci-dessus) dépassée |
| DELETE | `/signup/:id` | JWT | — | Retirer votre propre inscription libre. Refusée avec « Removal deadline has passed » après l'échéance d'inscription du plan |
| DELETE | `/:id` | JWT | — | Supprimer une affectation |

### Exemple : accepter une affectation

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Dates d'indisponibilité

Chemin de base : `/doing/blockoutDates`

Étend la classe de base CRUD (GET `/:id`, DELETE `/:id` — sans vérifications d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une date d'indisponibilité par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs dates d'indisponibilité par ID séparés par des virgules |
| GET | `/my` | JWT | — | Obtenir les dates d'indisponibilité de l'utilisateur actuel |
| GET | `/upcoming` | JWT | — | Obtenir toutes les dates d'indisponibilité à venir de l'église |
| POST | `/` | JWT | — | Créer ou mettre à jour des dates d'indisponibilité (définit par défaut personId sur l'utilisateur actuel si non fourni) |
| DELETE | `/:id` | JWT | — | Supprimer une date d'indisponibilité |

## Tâches

Chemin de base : `/doing/tasks`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Obtenir les tâches ouvertes de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une tâche par ID |
| GET | `/:id/contact` | JWT | Peut voir la carte | Coordonnées de la personne visée par une carte de flux de travail : `{ personId, displayName, mobilePhone, email }`. Permet à un appelant assigné sans accès aux Personnes de joindre la personne |
| GET | `/closed` | JWT | — | Obtenir les tâches fermées de l'utilisateur actuel |
| GET | `/timeline?taskIds=` | JWT | — | Obtenir les données de chronologie pour des tâches par ID séparés par des virgules |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtenir la tâche de mise à jour du répertoire pour une personne |
| POST | `/` | JWT | — | Créer ou mettre à jour des tâches. Ajoutez `?type=directoryUpdate` pour traiter les tâches de mise à jour du répertoire (téléverse automatiquement les photos) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou assigné de la carte | Rattacher la conversation de notes à une carte. Corps : `{ conversationId }`. La première conversation rattachée l'emporte ; les appels suivants renvoient la carte sans modification |
| POST | `/loadForGroups` | JWT | — | Charger les tâches de groupes précis. Corps : `{ groupIds: [], status: "Open" }` |

## Automatisations

Chemin de base : `/doing/automations`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister toutes les automatisations de l'église |
| GET | `/:id` | JWT | — | Obtenir une automatisation par ID |
| GET | `/check` | Publique | — | Déclencher une vérification de toutes les automatisations |
| POST | `/` | JWT | — | Créer ou mettre à jour des automatisations |
| DELETE | `/:id` | JWT | — | Supprimer une automatisation |

## Actions

Chemin de base : `/doing/actions`

Les actions définissent ce qui se produit lorsqu'une automatisation est déclenchée.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une action par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les actions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des actions |
| DELETE | `/:id` | JWT | — | Supprimer une action |

## Conditions

Chemin de base : `/doing/conditions`

Les conditions définissent les critères qui déclenchent une automatisation.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une condition par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conditions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conditions |
| DELETE | `/:id` | JWT | — | Supprimer une condition |

## Conjonctions

Chemin de base : `/doing/conjunctions`

Les conjonctions relient plusieurs conditions dans une automatisation (logique ET/OU).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une conjonction par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conjonctions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conjonctions |
| DELETE | `/:id` | JWT | — | Supprimer une conjonction |

## Authentifications de fournisseurs de contenu

Chemin de base : `/doing/contentProviderAuths`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérifications d'autorisations).

Gère les enregistrements d'authentification OAuth pour les fournisseurs de contenu externes (par exemple les intégrations de logiciels de présentation).

`accessToken` et `refreshToken` sont chiffrés au repos avec `EncryptionHelper` et déchiffrés à la lecture ; l'API renvoie donc toujours des jetons en clair. Les lignes enregistrées avant le chiffrement contiennent du texte en clair (qui ne contient jamais de `|`) ; elles sont renvoyées telles quelles et chiffrées à la prochaine sauvegarde.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Lister toutes les authentifications de fournisseurs de contenu |
| GET | `/:id` | JWT | — | Obtenir une authentification de fournisseur de contenu par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs authentifications de fournisseurs de contenu par ID séparés par des virgules |
| GET | `/ministry/:ministryId` | JWT | — | Obtenir toutes les authentifications de fournisseurs de contenu d'un ministère |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtenir l'enregistrement d'authentification pour un ministère et un fournisseur précis |
| POST | `/` | JWT | — | Créer ou mettre à jour des authentifications de fournisseurs de contenu |
| DELETE | `/:id` | JWT | — | Supprimer une authentification de fournisseur de contenu |

## Proxy de fournisseur

Chemin de base : `/doing/providerProxy`

Transmet les requêtes à des fournisseurs de contenu externes (par exemple ProPresenter, EasyWorship). Gère automatiquement le renouvellement des jetons lorsqu'ils expirent.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/browse` | JWT | — | Parcourir les fichiers du fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtenir les présentations d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtenir une liste de lecture d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtenir les instructions d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtenir les instructions développées d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et autorisations
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure des modules](../module-structure) — Modèles d'organisation du code
