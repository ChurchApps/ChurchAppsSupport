---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) effectue des vérifications de dossier pour le personnel et les bénévoles — un besoin quasi universel pour toute église gérant un programme pour enfants ou pour jeunes. B1 n'a **aucune fonctionnalité intégrée de vérification de dossier** — commander des vérifications, suivre les résultats, et la conformité du filtrage se déroulent tous dans Checkr ; la recette ci-dessous se contente de connecter les événements B1 à celui-ci. Checkr n'a pas d'application Zapier, mais l'[intégration Checkr de Make.com](https://www.make.com/en/integrations/checkr) est vérifiée et expose les actions dont vous avez besoin pour déclencher une vérification à partir d'un événement B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Checkr](https://checkr.com) avec accès API et au moins un forfait de filtrage configuré
- Un compte [Make](https://www.make.com)
- Un utilisateur B1Admin avec l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

L'application Checkr de Make expose 1 déclencheur et 6 actions :

| Direction | Déclencheur B1 / Make | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtré sur un groupe de bénévoles) | Checkr : Créer un candidat → Créer une invitation de vérification de dossier |
| Checkr → B1 | Webhook Checkr (événement invitation / rapport) | B1 : Mettre à jour la fiche de la personne (par ex. tag « Checkr validé ») |

Actions Checkr de Make : Créer un candidat, Créer une invitation de vérification de dossier, Obtenir un candidat, Obtenir un rapport, Obtenir le délai estimé d'un rapport, Obtenir une invitation. Plus 4 modules de recherche.

## Configuration

### 1. Générer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — pour le webhook du déclencheur
- `people:read` — pour rechercher le nom/e-mail de la personne lors du démarrage d'une vérification
- (Facultatif) `people:write` si vous voulez réécrire le statut du rapport comme champ personnalisé ou tag

### 2. Construire le scénario « déclencher une vérification à l'inscription d'un bénévole » dans Make

1. **Déclencheur** — B1.church : Surveiller les événements (`group.member.added`).
2. **Filtre** — ne continuer que si `data.groupId` correspond à votre groupe « Bénévoles enfants » (ou équivalent).
3. **Action** — B1.church : Rechercher une personne (par `data.personId`) pour obtenir l'e-mail + prénom/nom.
4. **Action** — Checkr : Créer un candidat. Associez le prénom/nom/e-mail depuis l'étape 3.
5. **Action** — Checkr : Créer une invitation de vérification de dossier. Associez l'id du nouveau candidat de l'étape 4 au champ *candidate_id*. Choisissez le forfait de filtrage (par ex. `tasker_standard` ou tout autre forfait exposé par votre compte).
6. (Facultatif) **Action** — Slack : notifier votre coordinateur de sécurité ministérielle qu'une vérification a été initiée.

Activez le scénario. Les nouveaux bénévoles du groupe ciblé reçoivent automatiquement une invitation Checkr par e-mail ; ils la complètent sur leur téléphone ou ordinateur portable ; Checkr effectue le filtrage.

### 3. (Facultatif) Recevoir le rapport en retour

1. **Déclencheur** — Checkr : Surveiller les événements (webhook). Make enregistre un webhook Checkr à l'activation.
2. **Filtre** — ne continuer que si `event_type = report.completed`.
3. **Action** — Checkr : Obtenir un rapport (utilisez l'id du rapport provenant du webhook).
4. **Action** — B1.church : Rechercher une personne (par e-mail du candidat).
5. **Action** — Slack / E-mail conditionnel : notifier le coordinateur avec le statut `clear` / `consider` / `suspended`.

Remarque : B1 n'a pas aujourd'hui de champ intégré « statut de vérification de dossier ». Les options pragmatiques sont (a) publier le résultat dans un canal Slack privé pour examen, (b) l'écrire dans une feuille Google pour audit, ou (c) ajouter la personne à un groupe B1 « Bénévoles validés » lors du statut `clear`.

## Recettes courantes

### Refiltrer les bénévoles tous les 2 ans

Associez ce qui précède à un déclencheur de planification Make :

- **Déclencheur** — Make : Planification (mensuelle)
- **Action** — B1.church : Lister les membres du groupe pour « Bénévoles validés »
- **Action** — Filtrer par Make : date de validation antérieure à 22 mois
- **Action** — Checkr : Créer une invitation de vérification de dossier (identique au flux initial)

### Bloquer l'accès de niveau 1 jusqu'à la fin de la vérification

Si votre église utilise l'appartenance à un groupe B1 pour contrôler l'accès (par ex. seuls les membres du groupe « Validés » apparaissent dans les plannings de service), maintenez les nouveaux bénévoles dans un groupe d'attente jusqu'à ce que l'événement Checkr `report.completed` les fasse basculer.

## Limites et remarques

- **Checkr est réservé aux États-Unis** pour la plupart des forfaits de filtrage. Les églises australiennes, britanniques et canadiennes devront trouver une alternative.
- **La tarification** est par vérification — chaque Créer une invitation dans Make consomme une vérification réelle. Testez d'abord dans le compte sandbox / de préproduction de Checkr (l'application Checkr de Make respecte les identifiants que vous passez dans la connexion, donc changer d'identifiants bascule entre sandbox et production).
- **L'accès API de Checkr est conditionné au forfait.** Les petits comptes Checkr peuvent être sur un niveau interface uniquement ; contactez Checkr pour activer l'API.

## Dépannage

- **Créer un candidat échoue avec `403`** — le jeton API Checkr est en lecture seule ou manque des autorisations de compte appropriées. Réémettez-le depuis le tableau de bord Checkr avec la portée d'écriture.
- **L'invitation n'arrive jamais** — vérifiez l'e-mail du candidat à l'étape 3 ; B1 peut avoir un champ e-mail vide pour cette personne. Ajoutez un filtre e-mail obligatoire avant l'étape Checkr.
- **Le déclencheur webhook ne se déclenche pas** — l'enregistrement du webhook Checkr échoue parfois silencieusement si votre compte Make n'est pas sur un niveau payant prenant en charge les webhooks sortants. Vérifiez dans la page *Webhooks* du tableau de bord Checkr que l'URL de Make y figure.

## Voir aussi

- [Make (vue d'ensemble)](../make) — le côté B1 de chaque scénario Make
- [Mobile Message](./mobile-message) — pour les fournisseurs SMS sans application Zapier, même schéma Webhooks/HTTP que le câblage Make de Checkr
- [Documentation API Checkr](https://docs.checkr.com/)
