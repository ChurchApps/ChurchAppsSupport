---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) effectue des vérifications antécédents pour les personnels et bénévoles — un besoin quasi universel pour toute église dirigeant un programme d'enfants ou de jeunes. Checkr n'a pas d'application Zapier, mais [l'intégration Checkr de Make.com](https://www.make.com/en/integrations/checkr) est vérifiée et expose les actions dont vous avez besoin pour déclencher une vérification à partir d'un événement B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Checkr](https://checkr.com) avec accès API et au moins un package de dépistage configuré
- Un compte [Make](https://www.make.com)
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

L'application Checkr de Make expose 1 déclencheur et 6 actions :

| Direction | Déclencheur B1 / Make | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtré sur un groupe de bénévoles) | Checkr : Créer un candidat → Créer une invitation de vérification d'antécédents |
| Checkr → B1 | Webhook Checkr (événement d'invitation / de rapport) | B1 : Mettre à jour le dossier de la personne (par exemple ajouter un tag « Checkr approuvé ») |

Les actions Checkr de Make : Créer un candidat, Créer une invitation de vérification d'antécédents, Obtenir un candidat, Obtenir un rapport, Obtenir l'ETA d'un rapport, Obtenir une invitation. Plus 4 modules de recherche.

## Configuration

### 1. Créer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — pour le webhook de déclencheur
- `people:read` — pour rechercher le nom/email de la personne au démarrage d'une vérification
- (Optionnel) `people:write` si vous voulez écrire l'état du rapport comme un champ personnalisé ou un tag

### 2. Créer le scénario « déclencher une vérification à l'inscription de bénévole » dans Make

1. **Déclencheur** — B1.church : Surveiller les événements (`group.member.added`).
2. **Filtre** — continuer uniquement si `data.groupId` correspond à votre groupe « Bénévoles des enfants » (ou équivalent).
3. **Action** — B1.church : Trouver une personne (par `data.personId`) pour obtenir l'email + prénom/nom.
4. **Action** — Checkr : Créer un candidat. Mappez prénom/nom/email à partir de l'étape 3.
5. **Action** — Checkr : Créer une invitation de vérification d'antécédents. Mappez le nouvel id de candidat de l'étape 4 au champ *candidate_id*. Choisissez le package de dépistage (par exemple `tasker_standard` ou celui que votre compte expose).
6. (Optionnel) **Action** — Slack : notifiez votre coordinateur de sécurité des ministères qu'une vérification a été lancée.

Activez le scénario. Les nouveaux bénévoles du groupe ciblé reçoivent automatiquement une invitation Checkr par email; ils la complètent sur leur téléphone ou ordinateur portable; Checkr exécute le dépistage.

### 3. (Optionnel) Recevoir le rapport en retour

1. **Déclencheur** — Checkr : Surveiller les événements (webhook). Make enregistre un webhook Checkr à l'activation.
2. **Filtre** — continuer uniquement si `event_type = report.completed`.
3. **Action** — Checkr : Obtenir un rapport (utilisez l'id de rapport du webhook).
4. **Action** — B1.church : Trouver une personne (par email du candidat).
5. **Action** — Slack / Email conditionnel : notifiez le coordinateur avec le statut `clear` / `consider` / `suspended`.

Remarque : B1 n'a pas aujourd'hui de champ « statut de vérification d'antécédents » intégré. Les options pragmatiques sont (a) poster le résultat à un canal Slack privé pour examen, (b) l'écrire dans une Google Sheet pour audit, ou (c) ajouter la personne à un groupe B1 « Bénévoles approuvés » sur `clear`.

## Recettes courantes

### Re-dépister les bénévoles tous les 2 ans

Associez ce qui précède avec un déclencheur de programmation Make :

- **Déclencheur** — Make : Horaire (mensuel)
- **Action** — B1.church : Énumérer les membres du groupe pour « Bénévoles approuvés »
- **Action** — Filtre par Make : date d'approbation antérieure à 22 mois
- **Action** — Checkr : Créer une invitation de vérification d'antécédents (même que le flux initial)

### Bloquer l'accès de la phase 1 jusqu'à ce que la vérification soit complète

Si votre église utilise l'adhésion au groupe B1 pour contrôler l'accès (par exemple, seuls les membres du groupe « Approuvés » apparaissent dans les horaires de service), gardez les nouveaux bénévoles dans un groupe d'attente jusqu'à ce que l'événement Checkr `report.completed` les fasse basculer.

## Limites et remarques

- **Checkr est uniquement aux États-Unis** pour la plupart des packages de dépistage. Les églises australiennes, britanniques et canadiennes auront besoin d'une alternative.
- **Tarification** par vérification — chaque Créer une invitation dans Make consomme une vérification réelle. Testez d'abord dans le compte sandbox / staging de Checkr (l'application Checkr de Make respecte les identifiants que vous transmettez à la connexion, donc changer les identifiants bascule sandbox/live).
- **L'accès à l'API Checkr est limité par plan.** Les petits comptes Checkr peuvent être sur un niveau UI uniquement; contactez Checkr pour activer l'API.

## Dépannage

- **Créer un candidat échoue avec `403`** — le jeton API Checkr est en lecture seule ou manque les bonnes permissions de compte. Re-émettez-le depuis le tableau de bord Checkr avec un scope d'écriture.
- **L'invitation n'arrive jamais** — vérifiez l'email du candidat à l'étape 3; B1 peut avoir un champ email vide pour cette personne. Ajoutez un filtre nécessitant l'email avant l'étape Checkr.
- **Le déclencheur webhook ne se déclenche pas** — l'enregistrement du webhook Checkr échoue parfois silencieusement si votre compte Make n'est pas sur un niveau payant qui supporte les webhooks sortants. Vérifiez dans la page *Webhooks* du tableau de bord Checkr que l'URL de Make est listée.

## Voir aussi

- [Make (aperçu)](../make) — le côté B1 de chaque scénario Make
- [Mobile Message](./mobile-message) — pour les fournisseurs SMS sans applications Zapier, même motif Webhooks/HTTP que le câblage Make Checkr
- [Docs API Checkr](https://docs.checkr.com/)
