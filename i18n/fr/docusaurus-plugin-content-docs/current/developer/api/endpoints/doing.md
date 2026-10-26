---
title: "Points de terminaison Doing"
---

# Points de terminaison Doing

<div class="article-intro">

Le module Doing gère la planification des services, la planification des bénévoles, la gestion des tâches et les automatisations. Il fournit des outils pour créer des plans de service avec des horaires et des postes, affecter des bénévoles, gérer les dates d'indisponibilité, construire les éléments de l'ordre du service, se connecter à des fournisseurs de contenu externes et configurer des workflows automatisés avec des conditions et des actions.

</div>

**Chemin de base :** `/doing`

## Plans

Chemin de base : `/doing/plans`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les plans de l'église |
| GET | `/:id` | JWT | — | Obtenir un plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs plans à partir d'IDs séparés par des virgules |
| GET | `/types/:planTypeId` | JWT | — | Obtenir les plans d'un type de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modification du ministère | Prévisualiser l'aperçu du service que la fonction **Envoyer un SMS aux bénévoles** enverrait : `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pour les bénévoles affectés sur la plage (un par personne, en ignorant les personnes désinscrites et les numéros manquants, les numéros partagés dédoublonnés, plafonné à 200) |
| GET | `/presenter` | JWT | — | Obtenir les plans des 7 prochains jours (vue présentateur) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Modification du ministère | Workflows actifs de confirmation d'affectation (`workflowType = "assignmentConfirmation"`) qu'un plan peut sélectionner : `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Public | — | Obtenir le plan actuel d'un type de plan |
| GET | `/public/signup/:churchId` | Public | — | Plans ouverts à l'inscription autonome, les plus proches en premier, chacun avec ses postes d'inscription autonome (triés par `categoryName`, puis `name`, avec `filledCount` des affectations Accepted/Unconfirmed) et ses horaires. Aucun nom de bénévole. Lorsque le paramètre d'église `volunteerSignupNextOnly` vaut `"true"`, seul le premier plan de chaque type de plan est renvoyé. Chaque `plan` inclut un `signupDeadline` calculé (instant ISO, ou `null`) : `signupDeadlineHours` avant l'horaire `service` le plus tôt du plan (n'importe quel horaire daté s'il n'y a aucun horaire de service ; 9 h dans le fuseau horaire de l'église à la date `serviceDate` si le plan n'a pas d'horaires) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pour les postes d'inscription autonome du plan (noms affichés des personnes affectées en Accepted/Unconfirmed). Renvoie `[]` sauf si `showVolunteerNames` du plan est activé |
| POST | `/` | JWT | — | Créer ou mettre à jour des plans (accepte un objet unique ou un tableau). Définissez `confirmationWorkflowId` pour inscrire le plan à un workflow de confirmation de service, ou `null` pour le désinscrire des demandes futures. Envoyez `signupDeadlineHours: null` pour supprimer une échéance ; si le champ est omis, la valeur enregistrée est conservée |
| POST | `/copy/:id` | JWT | Modification du ministère | Copier un plan avec ses postes, horaires, affectations et éléments de l'ordre du service. Le corps comprend `ministryId`, `serviceDate`, `copyMode` ("none", "positions", "all") et `copyServiceOrder` (booléen). Sans `targetPlanId`, un nouveau plan est créé, et `notes`, `signupDeadlineHours`, `showVolunteerNames` et `autoReplaceOnDecline` sont repris du plan source, sauf si le corps les fournit. Avec `targetPlanId`, la copie remplit ce plan existant à la place (l'appelant doit pouvoir le modifier). L'option **Répéter chaque semaine** de B1Admin appelle cet endpoint une fois par semaine, en copiant à chaque fois le plan créé la semaine précédente |
| POST | `/textRange` | JWT | `texting.send` + modification du ministère | Envoyer un SMS à chaque bénévole affecté sur une plage de dates, via le fournisseur de messagerie texte de l'église. Corps : `{ startDate, endDate, ministryId, planTypeId?, message }` (message de 1600 caractères au maximum ; champs de fusion résolus pour chaque destinataire). Renvoie les chiffres de l'aperçu ainsi que `recipientCount`, `successCount`, `failCount` et `error` (`no_provider` ou `insufficient_credits`) lorsque l'envoi s'arrête prématurément |
| POST | `/:id/issueRequests` | JWT | Modification du plan | Émettre les nouvelles affectations Unconfirmed non encore notifiées du plan via son workflow de confirmation : marque chacune comme notifiée et démarre une carte de workflow par affectation. Corps vide ; renvoie `{ issued }`. Échoue sauf si le plan est publié (non `prepared`), dispose d'un `confirmationWorkflowId` actif comportant au moins une étape, et si sa date limite de réponse n'est pas dépassée |
| POST | `/autofill/:id` | JWT | — | Remplir automatiquement les affectations de bénévoles d'un plan. Corps : `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Supprimer un plan ainsi que tous ses horaires, affectations, postes et éléments de plan associés |

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

## Types de plan

Chemin de base : `/doing/planTypes`

Hérite de la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les types de plan |
| GET | `/:id` | JWT | — | Obtenir un type de plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs types de plan à partir d'IDs séparés par des virgules |
| GET | `/ministryId/:ministryId` | JWT | — | Obtenir les types de plan d'un ministère |
| POST | `/` | JWT | — | Créer ou mettre à jour des types de plan |
| DELETE | `/:id` | JWT | — | Supprimer un type de plan |

## Éléments de plan

Chemin de base : `/doing/planItems`

Gère les éléments de l'ordre du service (en-têtes, sections, chansons, etc.) organisés dans une structure arborescente parent-enfant.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément de plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs éléments de plan à partir d'IDs séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les éléments d'un plan (renvoie une structure arborescente) |
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir les éléments d'un plan pour la vue présentateur (renvoie une structure arborescente) |
| POST | `/` | JWT | — | Créer ou mettre à jour des éléments de plan |
| POST | `/sort` | JWT | — | Mettre à jour l'ordre de tri d'un élément de plan (réordonne les éléments de même niveau) |
| DELETE | `/:id` | JWT | — | Supprimer un élément de plan |

## Flux du plan

Chemin de base : `/doing/planFeed`

Fournit les flux d'éléments de plan pour le présentateur. S'il n'existe aucun élément de plan, les éléments sont remplis automatiquement à partir du flux de lieu de Lessons.church, à l'aide du `contentId` du plan.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir le flux du plan pour le présentateur (rempli automatiquement depuis le flux de lieu s'il est vide) |

## Postes

Chemin de base : `/doing/positions`

Hérite de la classe de base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sans vérification d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un poste par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs postes à partir d'IDs séparés par des virgules |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les postes de plusieurs plans à partir d'IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les postes d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des postes |
| DELETE | `/:id` | JWT | — | Supprimer un poste |

## Horaires

Chemin de base : `/doing/times`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Lister tous les horaires de l'église |
| GET | `/:id` | JWT | — | Obtenir un horaire par son ID |
| GET | `/plans?planIds=` | JWT | — | Obtenir les horaires de plusieurs plans à partir d'IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les horaires d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des horaires |
| DELETE | `/:id` | JWT | — | Supprimer un horaire |

## Affectations

Chemin de base : `/doing/assignments`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les affectations de l'utilisateur actuel |
| GET | `/my/upcoming` | JWT | — | Jusqu'à 20 affectations de l'utilisateur actuel sur des plans datés à partir d'hier (les plans provisoires ou `prepared` sont ignorés), les plus proches en premier : `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimente l'aperçu des services sur la page d'accueil des membres |
| GET | `/:id` | JWT | — | Obtenir une affectation par son ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les affectations de plusieurs plans à partir d'IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir toutes les affectations d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des affectations (le statut est par défaut « Unconfirmed ») |
| POST | `/accept/:id` | JWT | — | Accepter une affectation (doit être la personne affectée) |
| POST | `/decline/:id` | JWT | — | Refuser une affectation (doit être la personne affectée) |
| POST | `/signup` | JWT | — | Inscription autonome à un poste. Corps : `{ positionId }`. Le poste doit autoriser l'inscription autonome et disposer de places ; crée une affectation Accepted. Refusé avec « Signup deadline has passed » une fois la date limite d'inscription du plan dépassée (décomptée à partir du premier horaire de service, comme indiqué ci-dessus) |
| DELETE | `/signup/:id` | JWT | — | Retirer sa propre inscription autonome. Refusé avec « Removal deadline has passed » après la date limite d'inscription du plan |
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

Hérite de la classe de base CRUD (GET `/:id`, DELETE `/:id` — sans vérification d'autorisations).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une date d'indisponibilité par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs dates d'indisponibilité à partir d'IDs séparés par des virgules |
| GET | `/my` | JWT | — | Obtenir les dates d'indisponibilité de l'utilisateur actuel |
| GET | `/upcoming` | JWT | — | Obtenir toutes les dates d'indisponibilité à venir de l'église |
| POST | `/` | JWT | — | Créer ou mettre à jour des dates d'indisponibilité (utilise par défaut l'utilisateur actuel si `personId` n'est pas fourni) |
| DELETE | `/:id` | JWT | — | Supprimer une date d'indisponibilité |

## Tâches

Chemin de base : `/doing/tasks`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtenir les tâches ouvertes de l'utilisateur actuel |
| GET | `/:id` | JWT | — | Obtenir une tâche par son ID |
| GET | `/:id/contact` | JWT | Peut voir la carte | Coordonnées de la personne concernée par une carte de workflow : `{ personId, displayName, mobilePhone, email }`. Permet à un appelant assigné sans accès aux personnes de joindre la personne |
| GET | `/closed` | JWT | — | Obtenir les tâches fermées de l'utilisateur actuel |
| GET | `/timeline?taskIds=` | JWT | — | Obtenir les données de chronologie des tâches à partir d'IDs de tâches séparés par des virgules |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtenir la tâche de mise à jour de l'annuaire d'une personne |
| POST | `/` | JWT | — | Créer ou mettre à jour des tâches. Ajoutez `?type=directoryUpdate` pour traiter les tâches de mise à jour de l'annuaire (téléverse automatiquement les photos) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou assigné de la carte | Associer la conversation de notes à une carte. Corps : `{ conversationId }`. La première conversation associée est retenue ; les appels suivants renvoient la carte inchangée |
| POST | `/loadForGroups` | JWT | — | Charger les tâches de groupes précis. Corps : `{ groupIds: [], status: "Open" }` |

## Automatisations

Chemin de base : `/doing/automations`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les automatisations de l'église |
| GET | `/:id` | JWT | — | Obtenir une automatisation par son ID |
| GET | `/check` | Public | — | Déclencher une vérification de toutes les automatisations |
| POST | `/` | JWT | — | Créer ou mettre à jour des automatisations |
| DELETE | `/:id` | JWT | — | Supprimer une automatisation |

## Actions

Chemin de base : `/doing/actions`

Les actions définissent ce qui se produit lorsqu'une automatisation est déclenchée.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une action par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les actions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des actions |
| DELETE | `/:id` | JWT | — | Supprimer une action |

## Conditions

Chemin de base : `/doing/conditions`

Les conditions définissent les critères qui déclenchent une automatisation.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une condition par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conditions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conditions |
| DELETE | `/:id` | JWT | — | Supprimer une condition |

## Conjonctions

Chemin de base : `/doing/conjunctions`

Les conjonctions relient plusieurs conditions entre elles dans une automatisation (logique ET/OU).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une conjonction par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conjonctions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conjonctions |
| DELETE | `/:id` | JWT | — | Supprimer une conjonction |

## Authentifications des fournisseurs de contenu

Chemin de base : `/doing/contentProviderAuths`

Hérite de la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification d'autorisations).

Gère les enregistrements d'authentification OAuth pour les fournisseurs de contenu externes (par exemple, les intégrations de logiciels de présentation).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les authentifications des fournisseurs de contenu |
| GET | `/:id` | JWT | — | Obtenir une authentification de fournisseur de contenu par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs authentifications de fournisseurs de contenu à partir d'IDs séparés par des virgules |
| GET | `/ministry/:ministryId` | JWT | — | Obtenir toutes les authentifications de fournisseurs de contenu d'un ministère |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtenir l'enregistrement d'authentification d'un ministère et d'un fournisseur précis |
| POST | `/` | JWT | — | Créer ou mettre à jour des authentifications de fournisseurs de contenu |
| DELETE | `/:id` | JWT | — | Supprimer une authentification de fournisseur de contenu |

## Proxy de fournisseur

Chemin de base : `/doing/providerProxy`

Relaie les requêtes vers les fournisseurs de contenu externes (par exemple, ProPresenter, EasyWorship). Gère automatiquement le renouvellement des jetons lorsqu'ils expirent.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Parcourir les fichiers du fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtenir les présentations d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtenir une liste de lecture d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtenir les instructions d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtenir les instructions détaillées d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et autorisations
- [Points de terminaison de présence](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Organisation du code
