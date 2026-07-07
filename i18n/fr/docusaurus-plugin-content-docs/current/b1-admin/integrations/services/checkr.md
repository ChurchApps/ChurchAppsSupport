---
title: "Checkr"
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) exécute un contrôle des antécédents pour le personnel et les bénévoles -- un besoin quasi universel pour toute église ayant un programme pour enfants ou jeunesse. B1 n'a **pas de fonction intégrée de vérification des antécédents** -- commander des contrôles, suivre les résultats et la conformité en matière d'antécédents vivent tous dans Checkr ; la recette ci-dessous ne fils que les événements B1 à celui-ci. Checkr n'a pas d'application Zapier, mais [l'intégration Checkr de Make.com](https://www.make.com/en/integrations/checkr) est vérifiée et expose les actions dont vous avez besoin pour déclencher un contrôle à partir d'un événement B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Checkr](https://checkr.com) avec accès API et au moins un paquet de dépistage configuré
- Un compte [Make](https://www.make.com)
- Un utilisateur B1Admin avec l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez câbler

L'application Checkr de Make expose 1 déclencheur et 6 actions :

| Direction | Déclencheur B1 / Make | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtré sur un groupe de bénévoles) | Checkr : Créer un candidat → Créer une invitation de vérification des antécédents |
| Checkr → B1 | Webhook Checkr (événement d'invitation / rapport) | B1 : Mettre à jour l'enregistrement de la personne (par exemple, balise « Checkr autorisé ») |

Actions Checkr de Make : Créer un candidat, Créer une invitation de vérification des antécédents, Obtenir un candidat, Obtenir un rapport, Obtenir l'ETA d'un rapport, Obtenir une invitation. Plus 4 modules de recherche.

## Configuration

### 1. Menthe une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` -- pour le webhook de déclenchement
- `people:read` -- pour chercher le nom/e-mail de la personne au démarrage d'un contrôle
- (Optionnel) `people:write` si vous souhaitez écrire le statut du rapport en tant que champ personnalisé ou balise

### 2. Construire le scénario « déclencher un contrôle lors de l'inscription d'un bénévole » dans Make

1. **Déclencheur** -- B1.church : Regarder les événements (`group.member.added`).
2. **Filtre** -- continuer uniquement si `data.groupId` correspond à votre groupe « Bénévoles enfants » (ou équivalent).
3. **Action** -- B1.church : Trouver une personne (par `data.personId`) pour obtenir l'e-mail + prénom/nom.
4. **Action** -- Checkr : Créer un candidat. Mapper prénom/nom/e-mail à partir de l'étape 3.
5. **Action** -- Checkr : Créer une invitation de vérification des antécédents. Mapper l'ID du nouveau candidat de l'étape 4 au champ *candidate_id*. Choisissez le paquet de dépistage (par exemple `tasker_standard` ou ce que votre compte expose).
6. (Optionnel) **Action** -- Slack : notifiez votre coordinateur de la sécurité familiale qu'un contrôle a été initié.

Activez le scénario. Les nouveaux bénévoles du groupe ciblé reçoivent automatiquement une invitation Checkr par e-mail ; ils la complètent sur leur téléphone ou ordinateur portable ; Checkr exécute le dépistage.

### 3. (Optionnel) Recevoir le rapport en retour

1. **Déclencheur** -- Checkr : Regarder les événements (webhook). Make enregistre un webhook Checkr à l'activation.
2. **Filtre** -- continuer uniquement si `event_type = report.completed`.
3. **Action** -- Checkr : Obtenir le rapport (utiliser l'ID de rapport du webhook).
4. **Action** -- B1.church : Trouver une personne (par e-mail du candidat).
5. **Action** -- Slack / E-mail conditionnel : notifiez le coordinateur avec le statut `clear` / `consider` / `suspended`.

Remarque : B1 n'a pas de champ intégré « statut de vérification des antécédents » actuellement. Les options pragmatiques sont (a) publier le résultat sur un canal Slack privé pour examen, (b) l'écrire dans une feuille Google pour audit ou (c) ajouter la personne à un groupe B1 « Bénévoles autorisés » en cas d'autorisation.

## Recettes courantes

### Re-dépister les bénévoles tous les 2 ans

Associez ce qui précède à un déclencheur de programmation de Make :

- **Déclencheur** -- Make : Programmation (mensuelle)
- **Action** -- B1.church : Lister les membres du groupe pour « Bénévoles autorisés »
- **Action** -- Filtrer par Make : date d'autorisation antérieure à 22 mois
- **Action** -- Checkr : Créer une invitation de vérification des antécédents (comme le flux initial)

### Bloquer l'accès à la phase 1 jusqu'à la fin du contrôle

Si votre église utilise l'adhésion au groupe B1 pour contrôler l'accès (par exemple, seuls les membres du groupe « Autorisés » apparaissent dans les calendriers de service), gardez les nouveaux bénévoles dans un groupe d'attente jusqu'à ce que l'événement `report.completed` de Checkr les permute.

## Limites et notes

- **Checkr est aux États-Unis uniquement** pour la plupart des forfaits de dépistage. Les églises australiennes, britanniques et canadiennes auront besoin d'une alternative.
- **Les tarifs** sont par contrôle -- chaque invitation créée dans Make brûle un vrai contrôle. Testez d'abord dans le compte sandbox / staging de Checkr (l'application Checkr de Make respecte les identifiants que vous transmettez dans la connexion, de sorte que l'échange d'identifiants bascule sandbox / en direct).
- **L'accès à l'API Checkr est bloqué par un plan.** Les comptes Checkr plus petits peuvent être à un niveau UI uniquement ; contactez Checkr pour activer l'API.

## Dépannage

- **Créer un candidat échoue avec `403`** -- le jeton API Checkr est en lecture seule ou manque les bonnes autorisations de compte. Rééditez-le à partir du tableau de bord Checkr avec étendue d'écriture.
- **L'invitation n'arrive jamais** -- vérifiez l'e-mail du candidat à l'étape 3 ; B1 peut avoir un champ e-mail vide pour cette personne. Ajoutez un filtre e-mail requis avant l'étape Checkr.
- **Le déclencheur webhook ne s'active pas** -- l'enregistrement du webhook Checkr échoue parfois silencieusement si votre compte Make n'est pas sur un niveau payant qui prend en charge les webhooks sortants. Vérifiez dans la page **Webhooks** du tableau de bord Checkr que l'URL de Make est répertoriée.

## Voir aussi

- [Make (aperçu)](../make) -- le côté B1 de chaque scénario Make
- [Message mobile](./mobile-message) -- pour les fournisseurs SMS sans applications Zapier, le même motif Webhooks / HTTP que le câblage Make de Checkr
- [Documentation de l'API Checkr](https://docs.checkr.com/)
