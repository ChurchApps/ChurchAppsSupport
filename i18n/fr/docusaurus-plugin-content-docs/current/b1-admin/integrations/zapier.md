---
title: "Zapier"
description: "Reliez B1 Admin à Zapier pour lancer des automatisations sur les nouvelles personnes, les dons et les membres de groupe, et réécrire des enregistrements dans B1 sans programmation."
---

# Zapier

<div class="article-intro">

L'application officielle B1.church sur Zapier permet à un Zap de réagir aux événements de votre église (nouvelle personne, nouveau don, nouveau membre de groupe, …) et d'écrire des enregistrements dans B1. Aucune programmation, aucune infrastructure : vous la configurez dans l'éditeur glisser-déposer de Zapier, collez une clé API, puis activez le Zap.

</div>

:::caution En attente de l'approbation de Zapier
L'application B1.church est construite et fonctionnelle, mais elle attend encore l'examen de Zapier avant d'apparaître publiquement dans le répertoire d'applications de l'éditeur de Zaps. Tant qu'elle n'est pas approuvée, seuls les comptes invités peuvent l'utiliser. Tout ce qui suit décrit son fonctionnement une fois approuvée.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Zapier](https://zapier.com) (l'offre gratuite suffit pour quelques Zaps)
- Un administrateur d'église disposant de l'autorisation **Modifier les paramètres** dans B1Admin (vous y créerez une clé API)
- Une idée de ce que vous voulez faire — par exemple « quand une personne est ajoutée dans B1, l'ajouter à ma liste Mailchimp »

</div>

## Déclencheurs et actions {#triggers-and-actions}

| Type | Quoi | Événement / point de terminaison B1 |
|---|---|---|
| **Déclencheur** | Nouvelle personne | `person.created` |
| **Déclencheur** | Personne mise à jour | `person.updated` |
| **Déclencheur** | Nouveau don | `donation.created` |
| **Déclencheur** | Nouveau membre de groupe | `group.member.added` |
| **Déclencheur** | Nouvelle soumission de formulaire | `form.submission.created` |
| **Action** | Créer une personne | ajoute une nouvelle personne |
| **Action** | Ajouter un don | enregistre un don |
| **Action** | Ajouter un membre de groupe | ajoute une personne à un groupe |
| **Action** | Rechercher une personne | recherche une personne par identifiant, courriel ou nom ; fait échouer la tâche si personne ne correspond |

Combinez-les librement avec les plus de 7 000 applications prises en charge par Zapier.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-create-a-b1-api-key}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, donnez-lui un nom tel que « Zapier », et sélectionnez les portées dont le Zap a besoin.
3. **Important :** incluez toujours la portée **`settings:write`**. Zapier vérifie la clé par rapport à la liste des webhooks de B1 lors de la connexion, et les déclencheurs B1 enregistrent un webhook en votre nom lorsque le Zap est activé — les deux exigent `settings:write`. Une clé sans cette portée échoue au test de connexion, même si vos Zaps n'utilisent que des actions B1.
4. Accordez aussi les portées que les actions nécessitent — par exemple, une action « Ajouter un don » requiert `donations:write`, et « Créer une personne » requiert `people:write`.
5. Enregistrez. La clé complète `cak_…` n'est affichée **qu'une seule fois** — copiez-la.

### 2. Connecter Zapier à B1 {#2-connect-zapier-to-b1}

1. Dans Zapier, créez un nouveau Zap.
2. Lorsque vous choisissez pour la première fois un déclencheur ou une action B1, Zapier vous demande de **vous connecter à B1.church**.
3. Collez la clé API de l'étape 1 dans **Clé API** (laissez **URL de l'API** vide) et cliquez sur **Oui, continuer**. Zapier la valide auprès de votre église.

La connexion est enregistrée dans Zapier et réutilisée par tous les Zaps de votre compte.

### 3. Créer le Zap {#3-build-the-zap}

Choisissez un déclencheur, puis ajoutez une ou plusieurs étapes d'action. Exemples ci-dessous.

## Recettes courantes {#common-recipes}

### Ajouter les nouvelles personnes de B1 dans Mailchimp {#add-new-b1-people-to-mailchimp}

- **Déclencheur** — B1 : Nouvelle personne
- **Action** — Mailchimp : Ajouter / mettre à jour un abonné. Associez `name__first`, `name__last` et `contactInfo__email` de B1 aux champs Prénom / Nom / Courriel de Mailchimp.

### Publier les dons dans un canal Slack avec une carte plus riche que le connecteur intégré {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Déclencheur** — B1 : Nouveau don
- **Action** — Slack : Envoyer un message dans le canal. Composez la mise en page de votre choix — boutons, pièces jointes, etc. — que le [connecteur Slack intégré](./slack-discord.md) ne permet pas.

### Ajouter les nouveaux membres de groupe à un groupe Google {#add-new-group-members-to-a-google-group}

- **Déclencheur** — B1 : Nouveau membre de groupe
- **Action** — Filtre Zapier : ne poursuivre que si le `groupId` du déclencheur correspond au groupe B1 qui vous intéresse
- **Action** — B1 : Rechercher une personne (utilisez le `personId` du déclencheur pour récupérer le courriel)
- **Action** — Google Groupes : Ajouter un membre

### Transmettre les soumissions de formulaires à un outil de suivi de projets {#forward-form-submissions-to-a-project-tracker}

- **Déclencheur** — B1 : Nouvelle soumission de formulaire
- **Action** — Notion / Linear / Asana / Trello : Créer une page / un ticket / une tâche

## Fonctionnement interne des déclencheurs {#how-triggers-work-under-the-hood}

Les déclencheurs sont des **REST hooks**, et non de l'interrogation périodique — Zapier n'interroge pas B1 toutes les 15 minutes. Lorsque vous activez le Zap, Zapier demande à B1 d'enregistrer un webhook pointant vers une URL Zapier privée ; lorsque l'événement se produit, B1 envoie l'enveloppe à Zapier et votre Zap démarre **en quelques secondes**. Désactiver le Zap amène Zapier à demander à B1 de supprimer le webhook — aucun abonnement orphelin.

Cela signifie que le déclencheur ne se déclenche que pour les événements qui surviennent **après** l'activation du Zap. Il n'y a pas de rattrapage : activer un Zap ne rejoue pas les dons d'hier.

## Limites et remarques {#limits--notes}

- **Plusieurs Zaps avec le même déclencheur** enregistrent chacun leur propre webhook B1 — il n'y a pas de conflit, mais il est utile de le savoir si vous consultez **Paramètres → Développeur → Webhooks** et que vous vous demandez pourquoi trois lignes identiques `Zapier — donation.created` apparaissent.
- **Données de test lors de la configuration du Zap** — lorsque vous créez un Zap, Zapier demande des exemples de données pour associer les champs. Il récupère l'événement correspondant le plus récent de B1 s'il en existe un ; sinon, il utilise un exemple synthétique issu de la définition de l'application.
- **Les échecs d'action apparaissent comme erreurs de Zap** dans l'historique des tâches de Zapier. Cause fréquente : une clé API sans la bonne portée (par exemple, une action « Ajouter un don » requiert `donations:write`). Créez de nouveau la clé avec les bonnes portées et reconnectez-la dans Zapier.
- **Quotas d'appels d'API sortants** — chaque appel d'API B1 effectué par une action est décompté de votre quota de tâches Zapier, et non de quoi que ce soit côté B1.

## Dépannage {#troubleshooting}

- **« Authentication failed »** lors de la connexion — la clé API est erronée, supprimée, ou ne comporte pas `settings:write`. Créez une nouvelle clé dans B1Admin avec `settings:write` ainsi que les portées de ressources utilisées par le Zap (les portées ne peuvent pas être modifiées sur une clé existante), puis mettez à jour la connexion.
- **Le déclencheur ne se déclenche jamais** — vérifiez que le webhook a bien été enregistré : dans B1Admin, **Paramètres → Développeur → Webhooks** doit maintenant afficher une ligne nommée « Zapier — &lt;événement&gt; ». Si elle est absente, la clé API ne comportait probablement pas `settings:write` au moment de l'activation du Zap. Corrigez la clé, puis désactivez et réactivez le Zap.
- **Le déclencheur se déclenche deux fois** — Zapier renvoie parfois un événement si son accusé de réception a été perdu. Utilisez une étape « Filtre Zapier » sur un identifiant unique (par exemple l'`id` de la personne) si vous avez besoin d'une déduplication stricte.

## Voir aussi {#see-also}

- [Make](./make.md) — même principe, sur une autre plateforme
- [Slack et Discord](./slack-discord.md) — notifications de discussion plus simples, sans Zapier
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
