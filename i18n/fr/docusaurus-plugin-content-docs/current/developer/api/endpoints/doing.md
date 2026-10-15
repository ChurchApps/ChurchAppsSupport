---
title: "Points de terminaison Doing"
---

# Points de terminaison Doing

<div class="article-intro">

Le module Doing gère la planification des services, la programmation des bénévoles, la gestion des tâches et les automatisations. Il fournit des outils pour créer des plans de service avec horaires et postes, affecter des bénévoles, gérer les dates d'indisponibilité, construire les éléments de l'ordre du service, se connecter à des fournisseurs de contenu externes et configurer des flux de travail automatisés avec conditions et actions.

</div>

**Chemin de base :** `/doing`

## Plans

Chemin de base : `/doing/plans`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les plans de l'église |
| GET | `/:id` | JWT | — | Obtenir un plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs plans par IDs séparés par des virgules |
| GET | `/types/:planTypeId` | JWT | — | Obtenir les plans par type de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + modification du ministère | Prévisualiser l'envoi **Text Volunteers** de l'aperçu du service : `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pour les bénévoles affectés dans la plage (une fois par personne, les personnes désabonnées et les numéros manquants sont ignorés, les numéros partagés sont dédupliqués, limité à 200) |
| GET | `/presenter` | JWT | — | Obtenir les plans des 7 prochains jours (vue présentateur) |
| GET | `/public/current/:planTypeId` | Public | — | Obtenir le plan en cours pour un type de plan |
| GET | `/public/signup/:churchId` | Public | — | Plans ouverts à l'inscription volontaire, les plus proches en premier, chacun avec ses postes d'inscription volontaire (triés par `categoryName`, puis par `name`, plus `filledCount` des affectations Accepted/Unconfirmed) et ses horaires. Aucun nom de bénévole. Lorsque le paramètre d'église `volunteerSignupNextOnly` vaut `"true"`, seul le premier plan de chaque type de plan est renvoyé |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pour les postes d'inscription volontaire du plan (noms affichés des personnes affectées en Accepted/Unconfirmed). Renvoie `[]` sauf si `showVolunteerNames` est activé pour le plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des plans (accepte un objet unique ou un tableau) |
| POST | `/copy/:id` | JWT | Modification du ministère | Copier un plan avec ses postes, horaires, affectations et éléments de l'ordre du service. Le corps contient `ministryId`, `serviceDate`, `copyMode` (« none », « positions », « all ») et `copyServiceOrder` (booléen). Sans `targetPlanId`, un nouveau plan est créé, et `notes`, `signupDeadlineHours`, `showVolunteerNames` et `autoReplaceOnDecline` sont repris du plan source sauf si le corps les fournit. Avec `targetPlanId`, la copie remplit ce plan existant à la place (l'appelant doit pouvoir le modifier). L'option **Repeat weekly** de B1Admin appelle cette route une fois par semaine, en copiant à chaque fois depuis le plan créé la semaine précédente |
| POST | `/textRange` | JWT | `texting.send` + modification du ministère | Envoyer un texto à chaque bénévole affecté dans une plage de dates via le fournisseur de SMS de l'église. Corps : `{ startDate, endDate, ministryId, planTypeId?, message }` (message jusqu'à 1600 caractères ; les champs de fusion sont résolus pour chaque destinataire). Renvoie les chiffres de l'aperçu ainsi que `recipientCount`, `successCount`, `failCount`, et `error` (`no_provider` ou `insufficient_credits`) lorsque l'envoi s'arrête prématurément |
| POST | `/autofill/:id` | JWT | — | Remplir automatiquement les affectations de bénévoles pour un plan. Corps : `{ teams: [{ positionId, personIds }] }` |
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

Hérite de la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les types de plan |
| GET | `/:id` | JWT | — | Obtenir un type de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs types de plan par IDs séparés par des virgules |
| GET | `/ministryId/:ministryId` | JWT | — | Obtenir les types de plan d'un ministère |
| POST | `/` | JWT | — | Créer ou mettre à jour des types de plan |
| DELETE | `/:id` | JWT | — | Supprimer un type de plan |

## Éléments de plan

Chemin de base : `/doing/planItems`

Gère les éléments de l'ordre du service (en-têtes, sections, chansons, etc.) organisés dans une structure arborescente parent-enfant.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément de plan par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs éléments de plan par IDs séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les éléments d'un plan (renvoie une structure arborescente) |
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir les éléments de plan pour la vue présentateur (renvoie une structure arborescente) |
| POST | `/` | JWT | — | Créer ou mettre à jour des éléments de plan |
| POST | `/sort` | JWT | — | Mettre à jour l'ordre de tri d'un élément de plan (réordonne les frères et sœurs) |
| DELETE | `/:id` | JWT | — | Supprimer un élément de plan |

## Flux du plan

Chemin de base : `/doing/planFeed`

Fournit les flux d'éléments de plan pour le présentateur. Si aucun élément de plan n'existe, il est alimenté automatiquement à partir du flux de lieu de Lessons.church à l'aide du `contentId` du plan.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Public | — | Obtenir le flux du plan pour le présentateur (alimenté automatiquement depuis le flux de lieu s'il est vide) |

## Postes

Chemin de base : `/doing/positions`

Hérite de la classe de base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un poste par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs postes par IDs séparés par des virgules |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les postes de plusieurs plans par IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les postes d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des postes |
| DELETE | `/:id` | JWT | — | Supprimer un poste |

## Horaires

Chemin de base : `/doing/times`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Lister tous les horaires de l'église |
| GET | `/:id` | JWT | — | Obtenir un horaire par ID |
| GET | `/plans?planIds=` | JWT | — | Obtenir les horaires de plusieurs plans par IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les horaires d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des horaires |
| DELETE | `/:id` | JWT | — | Supprimer un horaire |

## Affectations

Chemin de base : `/doing/assignments`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les affectations de l'utilisateur courant |
| GET | `/my/upcoming` | JWT | — | Jusqu'à 20 affectations de l'utilisateur courant sur des plans datés à partir d'hier (les plans en attente, ou `prepared`, sont ignorés), les plus proches en premier : `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimente l'aperçu du service sur la page d'accueil du membre |
| GET | `/:id` | JWT | — | Obtenir une affectation par ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les affectations de plusieurs plans par IDs de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir toutes les affectations d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des affectations (le statut est "Unconfirmed" par défaut) |
| POST | `/accept/:id` | JWT | — | Accepter une affectation (doit être la personne affectée) |
| POST | `/decline/:id` | JWT | — | Refuser une affectation (doit être la personne affectée) |
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

Hérite de la classe de base CRUD (GET `/:id`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une date d'indisponibilité par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs dates d'indisponibilité par IDs séparés par des virgules |
| GET | `/my` | JWT | — | Obtenir les dates d'indisponibilité de l'utilisateur courant |
| GET | `/upcoming` | JWT | — | Obtenir toutes les dates d'indisponibilité à venir de l'église |
| POST | `/` | JWT | — | Créer ou mettre à jour des dates d'indisponibilité (utilise par défaut l'utilisateur courant comme personId si non fourni) |
| DELETE | `/:id` | JWT | — | Supprimer une date d'indisponibilité |

## Tâches

Chemin de base : `/doing/tasks`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtenir les tâches ouvertes de l'utilisateur courant |
| GET | `/:id` | JWT | — | Obtenir une tâche par ID |
| GET | `/:id/contact` | JWT | Peut voir la carte | Coordonnées de la personne concernée par une carte de flux de travail : `{ personId, displayName, mobilePhone, email }`. Permet à un appelant affecté sans accès à People de joindre la personne |
| GET | `/closed` | JWT | — | Obtenir les tâches fermées de l'utilisateur courant |
| GET | `/timeline?taskIds=` | JWT | — | Obtenir les données de chronologie des tâches par IDs de tâches séparés par des virgules |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtenir la tâche de mise à jour de l'annuaire pour une personne |
| POST | `/` | JWT | — | Créer ou mettre à jour des tâches. Ajoutez `?type=directoryUpdate` pour traiter les tâches de mise à jour de l'annuaire (envoie automatiquement les photos) |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou assigné à la carte | Attacher la conversation de notes à une carte. Corps : `{ conversationId }`. La première conversation attachée est conservée ; les appels suivants renvoient la carte sans modification |
| POST | `/loadForGroups` | JWT | — | Charger les tâches de groupes spécifiques. Corps : `{ groupIds: [], status: "Open" }` |

## Automatisations

Chemin de base : `/doing/automations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les automatisations de l'église |
| GET | `/:id` | JWT | — | Obtenir une automatisation par ID |
| GET | `/check` | Public | — | Déclencher une vérification de toutes les automatisations |
| POST | `/` | JWT | — | Créer ou mettre à jour des automatisations |
| DELETE | `/:id` | JWT | — | Supprimer une automatisation |

## Actions

Chemin de base : `/doing/actions`

Les actions définissent ce qui se produit lorsqu'une automatisation est déclenchée.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une action par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les actions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des actions |
| DELETE | `/:id` | JWT | — | Supprimer une action |

## Conditions

Chemin de base : `/doing/conditions`

Les conditions définissent les critères qui déclenchent une automatisation.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une condition par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conditions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conditions |
| DELETE | `/:id` | JWT | — | Supprimer une condition |

## Conjonctions

Chemin de base : `/doing/conjunctions`

Les conjonctions relient plusieurs conditions entre elles dans une automatisation (logique ET/OU).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une conjonction par ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conjonctions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conjonctions |
| DELETE | `/:id` | JWT | — | Supprimer une conjonction |

## Authentifications des fournisseurs de contenu

Chemin de base : `/doing/contentProviderAuths`

Hérite de la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

Gère les enregistrements d'authentification OAuth pour les fournisseurs de contenu externes (par exemple, les intégrations de logiciels de présentation).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les authentifications de fournisseurs de contenu |
| GET | `/:id` | JWT | — | Obtenir une authentification de fournisseur de contenu par ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs authentifications de fournisseurs de contenu par IDs séparés par des virgules |
| GET | `/ministry/:ministryId` | JWT | — | Obtenir toutes les authentifications de fournisseurs de contenu d'un ministère |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtenir l'enregistrement d'authentification pour un ministère et un fournisseur donnés |
| POST | `/` | JWT | — | Créer ou mettre à jour des authentifications de fournisseurs de contenu |
| DELETE | `/:id` | JWT | — | Supprimer une authentification de fournisseur de contenu |

## Proxy de fournisseur

Chemin de base : `/doing/providerProxy`

Transmet les requêtes aux fournisseurs de contenu externes (par exemple, ProPresenter, EasyWorship). Gère automatiquement le renouvellement du jeton lorsqu'il expire.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Parcourir les fichiers du fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtenir les présentations d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtenir une playlist d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtenir les instructions d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtenir les instructions détaillées d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |

## Pages connexes

- [Points de terminaison Membership](./membership) — Personnes, groupes, rôles et permissions
- [Points de terminaison Attendance](./attendance) — Suivi des services et des visites
- [Structure du module](../module-structure) — Modèles d'organisation du code
