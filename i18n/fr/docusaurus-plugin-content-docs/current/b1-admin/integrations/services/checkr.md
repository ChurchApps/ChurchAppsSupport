---
title: "Checkr"
description: "Reliez les inscriptions de bénévoles dans B1 Admin aux vérifications d'antécédents Checkr grâce à Make.com, avec des alertes facultatives sur le statut des rapports pour votre coordinateur du ministère sécurisé."
---

# Checkr

<div class="article-intro">

[Checkr](https://checkr.com) assure la vérification d'antécédents du personnel et des bénévoles — un besoin presque universel pour toute église qui gère un programme pour enfants ou pour jeunes. B1 n'a **aucune fonctionnalité de vérification d'antécédents intégrée** : la commande des vérifications, le suivi des résultats et la conformité des contrôles relèvent entièrement de Checkr ; la recette ci-dessous relie seulement les événements B1 à Checkr. Checkr ne dispose pas d'application Zapier, mais [l'intégration Checkr de Make.com](https://www.make.com/en/integrations/checkr) est vérifiée et expose les actions nécessaires pour lancer une vérification à partir d'un événement B1.

</div>

:::caution
Cette recette utilise l'application B1.church pour Make, qui n'est pas encore publiée (voir [Make](../make.md)). D'ici là, le volet B1 de ces scénarios doit être construit avec le module **HTTP** de Make appelant l'[API REST](/docs/developer/api) de B1.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Checkr](https://checkr.com) avec accès à l'API et au moins un forfait de contrôle configuré
- Un compte [Make](https://www.make.com)
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

L'application Checkr de Make expose 1 déclencheur et 6 actions :

| Sens | Déclencheur B1 / Make | Action |
|---|---|---|
| B1 → Checkr | B1 `group.member.added` (filtré sur un groupe de bénévoles) | Checkr : Créer un candidat → Créer une invitation de vérification d'antécédents |
| Checkr → B1 | Webhook Checkr (événement d'invitation / de rapport) | B1 : Mettre à jour la fiche de la personne (par exemple, ajouter l'étiquette « Checkr validé ») |

Les actions Checkr de Make sont : Créer un candidat, Créer une invitation de vérification d'antécédents, Obtenir un candidat, Obtenir un rapport, Obtenir le délai estimé d'un rapport, et Obtenir une invitation. S'y ajoutent 4 modules de recherche.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — pour le webhook du déclencheur
- `people:read` — pour retrouver le nom et le courriel de la personne au lancement d'une vérification
- (Facultatif) `people:write` si vous voulez réinscrire le statut du rapport comme champ personnalisé ou étiquette

### 2. Créer le scénario « lancer une vérification à l'inscription d'un bénévole » dans Make {#2-build-the-kick-off-a-check-on-volunteer-signup-scenario-in-make}

1. **Déclencheur** — B1.church : Surveiller les événements (`group.member.added`).
2. **Filtre** — ne poursuivre que si `data.groupId` correspond à votre groupe « Bénévoles du ministère des enfants » (ou équivalent).
3. **Action** — B1.church : Rechercher une personne (par `data.personId`) pour obtenir le courriel ainsi que le prénom et le nom.
4. **Action** — Checkr : Créer un candidat. Associez le prénom, le nom et le courriel de l'étape 3.
5. **Action** — Checkr : Créer une invitation de vérification d'antécédents. Associez l'identifiant du nouveau candidat issu de l'étape 4 au champ *candidate_id*. Choisissez le forfait de contrôle (par exemple `tasker_standard`, ou celui que votre compte propose).
6. (Facultatif) **Action** — Slack : avertir votre coordinateur du ministère sécurisé qu'une vérification a été lancée.

Activez le scénario. Les nouveaux bénévoles du groupe ciblé reçoivent automatiquement une invitation Checkr par courriel ; ils la remplissent sur leur téléphone ou leur ordinateur, puis Checkr effectue la vérification.

### 3. (Facultatif) Recevoir le rapport en retour {#3-optional-receive-the-report-back}

1. **Déclencheur** — Checkr : Surveiller les événements (webhook). Make enregistre un webhook Checkr à l'activation.
2. **Filtre** — ne poursuivre que si `event_type = report.completed`.
3. **Action** — Checkr : Obtenir un rapport (à l'aide de l'identifiant du rapport reçu dans le webhook).
4. **Action** — B1.church : Rechercher une personne (par courriel du candidat).
5. **Action** — Slack / courriel conditionnel : avertir le coordinateur avec le statut `clear` / `consider` / `suspended`.

Remarque : B1 ne dispose pas actuellement d'un champ intégré « statut de vérification d'antécédents ». Les options pratiques sont (a) publier le résultat dans un canal Slack privé pour examen, (b) l'écrire dans un Google Sheet pour l'audit, ou (c) ajouter la personne au groupe B1 « Bénévoles validés » lorsque le statut est `clear`.

## Recettes courantes {#common-recipes}

### Refaire la vérification des bénévoles tous les 2 ans {#re-screen-volunteers-every-2-years}

Associez ce qui précède à un déclencheur planifié de Make :

- **Déclencheur** — Make : Planification (mensuelle)
- **Action** — HTTP — Effectuer une requête : GET sur `/membership/groupmembers?groupId=…` de B1 pour votre groupe « Bénévoles validés » (l'application B1.church n'a pas d'action de liste)
- **Action** — Filtre Make : date de validation antérieure à 22 mois
- **Action** — Checkr : Créer une invitation de vérification d'antécédents (même flux que la configuration initiale)

### Bloquer l'accès de l'étape 1 jusqu'à la fin de la vérification {#block-stage-1-access-until-check-completes}

Si votre église utilise l'appartenance aux groupes B1 pour contrôler l'accès (par exemple, seuls les membres du groupe « Validés » apparaissent dans les plannings de service), gardez les nouveaux bénévoles dans un groupe provisoire jusqu'à ce que l'événement Checkr `report.completed` les fasse passer au groupe définitif.

## Limites et remarques {#limits--notes}

- **Checkr ne couvre que les États-Unis** pour la plupart des forfaits de contrôle. Les églises d'Australie, du Royaume-Uni et du Canada devront recourir à une autre solution.
- **Tarification** à la vérification — chaque création d'invitation dans Make consomme une vérification réelle. Testez d'abord dans le compte bac à sable / de préproduction de Checkr (l'application Checkr de Make utilise les identifiants que vous saisissez dans la connexion ; changer d'identifiants permet donc de basculer entre bac à sable et production).
- **Accès à l'API soumis au forfait Checkr.** Les petits comptes Checkr peuvent être limités à l'interface web ; contactez Checkr pour activer l'API.

## Dépannage {#troubleshooting}

- **Créer un candidat échoue avec `403`** — le jeton d'API Checkr est en lecture seule ou ne dispose pas des bonnes autorisations de compte. Régénérez-le depuis le tableau de bord Checkr avec une autorisation en écriture.
- **L'invitation n'arrive jamais** — vérifiez le courriel du candidat à l'étape 3 ; B1 peut avoir un champ courriel vide pour cette personne. Ajoutez un filtre exigeant un courriel avant l'étape Checkr.
- **Le déclencheur webhook ne se déclenche pas** — l'enregistrement du webhook Checkr échoue parfois silencieusement si votre compte Make n'est pas sur un forfait payant prenant en charge les webhooks sortants. Vérifiez sur la page *Webhooks* du tableau de bord Checkr que l'URL de Make y figure.

## Voir aussi {#see-also}

- [Make (présentation)](../make.md) — volet B1 de chaque scénario Make
- [Mobile Message](./mobile-message.md) — pour les fournisseurs de SMS sans application Zapier, avec le même schéma Webhooks / HTTP que la configuration Make de Checkr
- [Documentation de l'API Checkr](https://docs.checkr.com/)
