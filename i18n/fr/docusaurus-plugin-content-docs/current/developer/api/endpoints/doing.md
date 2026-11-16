---
title: "Points de terminaison Doing"
description: "Référence des points de terminaison de l'API Doing, qui gère les plans de service, les affectations de bénévoles, les tâches et les automatisations dans B1 Admin, avec les chemins, l'authentification et les permissions."
---

# Points de terminaison Doing {#doing-endpoints}

<div class="article-intro">

Le module Doing gère la planification des services, la planification des bénévoles, la gestion des tâches et les automatisations. Il fournit des outils pour créer des plans de service avec des horaires et des postes, affecter des bénévoles, gérer les dates d'indisponibilité, construire les éléments de l'ordre de service, se connecter à des fournisseurs de contenu externes et configurer des flux de travail automatisés avec des conditions et des actions.

</div>

**Chemin de base :** `/doing`

## Plans {#plans}

Chemin de base : `/doing/plans`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les plans de l'église |
| GET | `/:id` | JWT | — | Obtenir un plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs plans à partir d'une liste d'ID séparés par des virgules |
| GET | `/types/:planTypeId` | JWT | — | Obtenir les plans d'un type de plan |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + édition du ministère | Prévisualiser l'envoi **Envoyer un texto aux bénévoles** de l'aperçu de service : `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` pour les bénévoles affectés dans la plage (une fois par personne, en ignorant les personnes ayant refusé les messages et les numéros manquants, en dédoublonnant les numéros partagés, plafonné à 200) |
| GET | `/presenter` | JWT | — | Obtenir les plans des 7 prochains jours (vue présentateur) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Édition du ministère | Flux de confirmation d'affectation de service actifs (`workflowType = "assignmentConfirmation"`) qu'un plan peut sélectionner : `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Publique | — | Obtenir le plan en cours pour un type de plan |
| GET | `/public/signup/:churchId` | Publique | — | Plans ouverts à l'inscription libre-service, les plus proches en premier, chacun avec ses postes d'inscription libre-service (triés par `categoryName`, puis `name`, plus `filledCount` des affectations Acceptées ou Non confirmées) et ses horaires. Aucun nom de bénévole. Lorsque le paramètre d'église `volunteerSignupNextOnly` vaut `"true"`, seul le premier plan de chaque type est renvoyé. Chaque `plan` comprend un `signupDeadline` calculé (instant ISO, ou `null`) : `signupDeadlineHours` avant l'horaire `service` le plus tôt du plan (n'importe quel horaire daté s'il n'y a pas d'horaire de service ; 9 h dans le fuseau horaire de l'église à `serviceDate` si le plan n'a aucun horaire) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` pour les postes d'inscription libre-service du plan (noms affichés des personnes Acceptées ou Non confirmées). Renvoie `[]` sauf si l'option `showVolunteerNames` du plan est activée |
| POST | `/` | JWT | — | Créer ou mettre à jour des plans (accepte un objet unique ou un tableau). Définissez `confirmationWorkflowId` pour inscrire le plan à un flux de confirmation de service, ou `null` pour le désinscrire des demandes futures. Envoyez `signupDeadlineHours: null` pour supprimer une échéance ; si le champ est omis, la valeur enregistrée est conservée |
| POST | `/copy/:id` | JWT | Édition du ministère | Copier un plan avec ses postes, horaires, affectations et éléments de l'ordre de service. Le corps comprend `ministryId`, `serviceDate`, `copyMode` (« none », « positions », « all ») et `copyServiceOrder` (booléen). Sans `targetPlanId`, un nouveau plan est créé, et `notes`, `signupDeadlineHours`, `showVolunteerNames` et `autoReplaceOnDecline` sont repris du plan source sauf si le corps les fournit. Avec `targetPlanId`, la copie remplit ce plan existant à la place (l'appelant doit pouvoir le modifier). L'option **Répéter chaque semaine** de B1Admin appelle cette route une fois par semaine, chaque fois en copiant depuis le plan créé la semaine précédente |
| POST | `/textRange` | JWT | `texting.send` + édition du ministère | Envoyer un texto à chaque bénévole affecté dans une plage de dates, via le fournisseur de textos de l'église. Corps : `{ startDate, endDate, ministryId, planTypeId?, message }` (message de 1600 caractères maximum ; les champs de fusion sont résolus pour chaque destinataire). Renvoie les chiffres de l'aperçu ainsi que `recipientCount`, `successCount`, `failCount` et `error` (`no_provider` ou `insufficient_credits`) lorsque l'envoi s'interrompt tôt |
| POST | `/:id/issueRequests` | JWT | Édition du plan | Émettre les nouvelles affectations non confirmées et non encore notifiées du plan via son flux de confirmation : marque chacune comme notifiée et démarre une fiche de processus par affectation. Corps vide ; renvoie `{ issued }`. Échoue si le plan n'est pas publié (pas `prepared`), si son `confirmationWorkflowId` n'est pas actif avec au moins une étape, ou si la date limite de réponse est dépassée |
| POST | `/autofill/:id` | JWT | — | Remplir automatiquement les affectations de bénévoles d'un plan. Corps : `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Supprimer un plan ainsi que tous ses horaires, affectations, postes et éléments de plan associés |

### Exemple : copier un plan {#example-copy-a-plan}

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

## Types de plans {#plan-types}

Chemin de base : `/doing/planTypes`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister tous les types de plans |
| GET | `/:id` | JWT | — | Obtenir un type de plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs types de plans à partir d'une liste d'ID séparés par des virgules |
| GET | `/ministryId/:ministryId` | JWT | — | Obtenir les types de plans d'un ministère |
| POST | `/` | JWT | — | Créer ou mettre à jour des types de plans |
| DELETE | `/:id` | JWT | — | Supprimer un type de plan |

## Éléments de plan {#plan-items}

Chemin de base : `/doing/planItems`

Gère les éléments de l'ordre de service (en-têtes, sections, chants, etc.) organisés dans une arborescence parent-enfant.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un élément de plan par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs éléments de plan à partir d'une liste d'ID séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les éléments d'un plan (renvoie une structure en arbre) |
| GET | `/presenter/:churchId/:planId` | Publique | — | Obtenir les éléments de plan pour la vue présentateur (renvoie une structure en arbre) |
| POST | `/` | JWT | — | Créer ou mettre à jour des éléments de plan |
| POST | `/sort` | JWT | — | Mettre à jour l'ordre de tri d'un élément de plan (réordonne les éléments de même niveau) |
| DELETE | `/:id` | JWT | — | Supprimer un élément de plan |

## Flux du plan {#plan-feed}

Chemin de base : `/doing/planFeed`

Fournit les flux d'éléments de plan pour le présentateur. S'il n'existe aucun élément de plan, le flux se remplit automatiquement à partir du flux de lieu Lessons.church, à l'aide du `contentId` du plan.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Publique | — | Obtenir le flux du plan pour le présentateur (se remplit automatiquement à partir du flux de lieu s'il est vide) |

## Postes {#positions}

Chemin de base : `/doing/positions`

Étend la classe de base CRUD (GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir un poste par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs postes à partir d'une liste d'ID séparés par des virgules |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les postes de plusieurs plans à partir d'une liste d'ID de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les postes d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des postes |
| DELETE | `/:id` | JWT | — | Supprimer un poste |

## Horaires {#times}

Chemin de base : `/doing/times`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Lister tous les horaires de l'église |
| GET | `/:id` | JWT | — | Obtenir un horaire par son ID |
| GET | `/plans?planIds=` | JWT | — | Obtenir les horaires de plusieurs plans à partir d'une liste d'ID de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir tous les horaires d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des horaires |
| DELETE | `/:id` | JWT | — | Supprimer un horaire |

## Affectations {#assignments}

Chemin de base : `/doing/assignments`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Obtenir les affectations de l'utilisateur courant |
| GET | `/my/upcoming` | JWT | — | Jusqu'à 20 affectations de l'utilisateur courant sur des plans datés à partir d'hier (les plans proposés à titre provisoire, ou `prepared`, sont ignorés), les plus proches en premier : `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Alimente l'aperçu des services sur la page d'accueil des membres |
| GET | `/:id` | JWT | — | Obtenir une affectation par son ID |
| GET | `/plan/ids?planIds=` | JWT | — | Obtenir les affectations de plusieurs plans à partir d'une liste d'ID de plans séparés par des virgules |
| GET | `/plan/:planId` | JWT | — | Obtenir toutes les affectations d'un plan |
| POST | `/` | JWT | — | Créer ou mettre à jour des affectations (statut « Unconfirmed » par défaut) |
| POST | `/accept/:id` | JWT | — | Accepter une affectation (doit être la personne affectée) |
| POST | `/decline/:id` | JWT | — | Refuser une affectation (doit être la personne affectée) |
| POST | `/signup` | JWT | — | S'inscrire soi-même à un poste. Corps : `{ positionId }`. Le poste doit autoriser l'inscription libre-service et avoir de la place ; crée une affectation Acceptée. Rejetée avec « Signup deadline has passed » une fois la date limite d'inscription du plan dépassée (comptée à partir de son premier horaire de service, comme ci-dessus) |
| DELETE | `/signup/:id` | JWT | — | Retirer votre propre inscription libre-service. Rejetée avec « Removal deadline has passed » après la date limite d'inscription du plan |
| DELETE | `/:id` | JWT | — | Supprimer une affectation |

### Exemple : accepter une affectation {#example-accept-an-assignment}

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

## Dates d'indisponibilité {#blockout-dates}

Chemin de base : `/doing/blockoutDates`

Étend la classe de base CRUD (GET `/:id`, DELETE `/:id` — sans vérification de permission).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une date d'indisponibilité par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs dates d'indisponibilité à partir d'une liste d'ID séparés par des virgules |
| GET | `/my` | JWT | — | Obtenir les dates d'indisponibilité de l'utilisateur courant |
| GET | `/upcoming` | JWT | — | Obtenir toutes les dates d'indisponibilité à venir de l'église |
| POST | `/` | JWT | — | Créer ou mettre à jour des dates d'indisponibilité (utilise par défaut l'utilisateur courant si `personId` n'est pas fourni) |
| DELETE | `/:id` | JWT | — | Supprimer une date d'indisponibilité |

## Tâches {#tasks}

Chemin de base : `/doing/tasks`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Obtenir les tâches ouvertes de l'utilisateur courant |
| GET | `/:id` | JWT | — | Obtenir une tâche par son ID |
| GET | `/:id/contact` | JWT | Peut consulter la fiche | Coordonnées de la personne concernée par une fiche de processus : `{ personId, displayName, mobilePhone, email }`. Permet à un appelant assigné qui n'a pas accès aux personnes de joindre la personne |
| GET | `/closed` | JWT | — | Obtenir les tâches fermées de l'utilisateur courant |
| GET | `/timeline?taskIds=` | JWT | — | Obtenir les données de chronologie de tâches à partir d'une liste d'ID de tâches séparés par des virgules |
| GET | `/directoryUpdate/:personId` | JWT | — | Obtenir la tâche de mise à jour de l'annuaire pour une personne |
| POST | `/` | JWT | — | Créer ou mettre à jour des tâches. Ajoutez `?type=directoryUpdate` pour traiter les tâches de mise à jour de l'annuaire (téléverse automatiquement les photos). Modifier le `assignedToId` d'une tâche existante ajoute une entrée « Reassigned from ... to ... » à l'historique de son `data` |
| POST | `/:id/conversation` | JWT | `tasks.edit` ou assigné de la fiche | Joindre la conversation de notes à une fiche. Corps : `{ conversationId }`. La première conversation jointe l'emporte ; les appels suivants renvoient la fiche sans modification |
| POST | `/loadForGroups` | JWT | — | Charger les tâches de groupes précis. Corps : `{ groupIds: [], status: "Open" }` |
| DELETE | `/:id` | JWT | `tasks.edit` | Supprimer définitivement une tâche simple. Renvoie 400 pour les fiches de processus (utiliser les points de terminaison des fiches) et pour les demandes de suppression de compte (les traiter à partir de l'action de revue) |

## Automatisations {#automations}

Chemin de base : `/doing/automations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les automatisations de l'église |
| GET | `/:id` | JWT | — | Obtenir une automatisation par son ID |
| GET | `/check` | Publique | — | Déclencher une vérification de toutes les automatisations |
| POST | `/` | JWT | — | Créer ou mettre à jour des automatisations |
| DELETE | `/:id` | JWT | — | Supprimer une automatisation |

## Actions {#actions}

Chemin de base : `/doing/actions`

Les actions définissent ce qui se produit lorsqu'une automatisation est déclenchée.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une action par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les actions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des actions |
| DELETE | `/:id` | JWT | — | Supprimer une action |

## Conditions {#conditions}

Chemin de base : `/doing/conditions`

Les conditions définissent les critères qui déclenchent une automatisation.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une condition par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conditions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conditions |
| DELETE | `/:id` | JWT | — | Supprimer une condition |

## Conjonctions {#conjunctions}

Chemin de base : `/doing/conjunctions`

Les conjonctions relient plusieurs conditions dans une automatisation (logique ET/OU).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Obtenir une conjonction par son ID |
| GET | `/automation/:id` | JWT | — | Obtenir toutes les conjonctions d'une automatisation |
| POST | `/` | JWT | — | Créer ou mettre à jour des conjonctions |
| DELETE | `/:id` | JWT | — | Supprimer une conjonction |

## Authentifications des fournisseurs de contenu {#content-provider-auths}

Chemin de base : `/doing/contentProviderAuths`

Étend la classe de base CRUD (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — sans vérification de permission).

Gère les enregistrements d'authentification OAuth pour les fournisseurs de contenu externes (par exemple, les intégrations de logiciels de présentation).

`accessToken` et `refreshToken` sont chiffrés au repos avec `EncryptionHelper` et déchiffrés à la lecture ; l'API renvoie donc toujours les jetons en clair. Les lignes enregistrées avant le chiffrement contiennent du texte en clair (qui ne contient jamais `|`) ; elles sont renvoyées telles quelles, puis chiffrées lors de leur prochain enregistrement.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lister toutes les authentifications de fournisseurs de contenu |
| GET | `/:id` | JWT | — | Obtenir une authentification de fournisseur de contenu par son ID |
| GET | `/ids?ids=` | JWT | — | Obtenir plusieurs authentifications de fournisseurs de contenu à partir d'une liste d'ID séparés par des virgules |
| GET | `/ministry/:ministryId` | JWT | — | Obtenir toutes les authentifications de fournisseurs de contenu d'un ministère |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Obtenir l'enregistrement d'authentification pour un ministère et un fournisseur donnés |
| POST | `/` | JWT | — | Créer ou mettre à jour des authentifications de fournisseurs de contenu |
| DELETE | `/:id` | JWT | — | Supprimer une authentification de fournisseur de contenu |

## Mandataire de fournisseur {#provider-proxy}

Chemin de base : `/doing/providerProxy`

Transmet les requêtes aux fournisseurs de contenu externes (par exemple, ProPresenter, EasyWorship). Renouvelle automatiquement les jetons lorsqu'ils expirent.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Parcourir les fichiers d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Obtenir les présentations d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Obtenir une liste de lecture d'un fournisseur de contenu. Corps : `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Obtenir les instructions d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Obtenir les instructions détaillées d'un élément de contenu. Corps : `{ ministryId, providerId, path }` |

## Pages connexes {#related-pages}

- [Points de terminaison Membership](./membership.md) — Personnes, groupes, rôles et permissions
- [Points de terminaison de présence](./attendance.md) — Suivi des services et des visites
- [Structure des modules](../module-structure.md) — Organisation du code
