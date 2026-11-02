---
title: "Zapier"
---

# Zapier

<div class="article-intro">

L'application officielle B1.church sur Zapier permet à un Zap de réagir aux événements de votre église (nouvelle personne, nouveau don, nouveau membre de groupe, …) et d'écrire des enregistrements dans B1. Aucun code, aucune infrastructure : vous la configurez dans l'éditeur glisser-déposer de Zapier, collez une clé API et activez le Zap.

</div>

:::caution En attente de l'approbation de Zapier
L'application B1.church est construite et fonctionne, mais elle attend encore l'examen de Zapier avant d'apparaître publiquement dans le répertoire d'applications de l'éditeur de Zap. Tant qu'elle n'est pas approuvée, seuls les comptes invités peuvent l'utiliser. Tout ce qui suit décrit son fonctionnement une fois approuvée.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Zapier](https://zapier.com) (le forfait gratuit suffit pour quelques Zaps)
- Un administrateur d'église disposant de l'autorisation **Modifier les paramètres** dans B1 Admin (vous allez créer une clé API)
- Une idée de ce que vous voulez faire -- par exemple « quand une personne est ajoutée dans B1, l'ajouter à ma liste Mailchimp »

</div>

## Déclencheurs et actions

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
| **Action** | Trouver une personne | recherche une personne par identifiant, courriel ou nom ; fait échouer la tâche si personne ne correspond |

Combinez-les librement avec n'importe laquelle des plus de 7 000 applications prises en charge par Zapier.

## Configuration

### 1. Créer une clé API B1

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, donnez-lui un nom comme « Zapier », et sélectionnez les portées dont le Zap a besoin.
3. **Important :** les déclencheurs Zapier enregistrent un webhook en votre nom lorsque le Zap est activé, ce qui exige la portée **`settings:write`**. Incluez toujours `settings:write` si l'un de vos Zaps utilise un déclencheur B1.
4. Accordez aussi les portées nécessaires aux actions -- par exemple, une action « Ajouter un don » exige `donations:write`, et « Créer une personne » exige `people:write`.
5. Enregistrez. La clé complète `cak_…` n'est affichée qu'**une seule fois** -- copiez-la.

### 2. Connecter Zapier à B1

1. Dans Zapier, créez un nouveau Zap.
2. Lorsque vous choisissez pour la première fois un déclencheur ou une action B1, Zapier vous demande de **vous connecter à B1.church**.
3. Collez la clé API de l'étape 1 et cliquez sur **Oui, continuer**. Zapier la valide auprès de votre église.

La connexion est enregistrée dans Zapier et réutilisée par tous les Zaps de votre compte.

### 3. Construire le Zap

Choisissez un déclencheur, puis ajoutez une ou plusieurs étapes d'action. Exemples ci-dessous.

## Recettes courantes

### Ajouter les nouvelles personnes de B1 à Mailchimp

- **Déclencheur** — B1 : Nouvelle personne
- **Action** — Mailchimp : Ajouter/Mettre à jour un abonné. Associez les champs `name__first`, `name__last` et `contactInfo__email` de B1 aux champs Prénom / Nom / Courriel de Mailchimp.

### Publier les dons dans un canal Slack avec une carte plus riche que le connecteur intégré

- **Déclencheur** — B1 : Nouveau don
- **Action** — Slack : Envoyer un message dans un canal. Composez la mise en page de votre choix -- boutons, pièces jointes, etc. -- que le [connecteur Slack intégré](./slack-discord) ne permet pas de réaliser.

### Ajouter les nouveaux membres de groupe à un groupe Google

- **Déclencheur** — B1 : Nouveau membre de groupe (filtré sur un `groupId` précis)
- **Action** — Filtre par Zapier : continuer seulement si le groupe B1 est celui qui vous intéresse
- **Action** — B1 : Trouver une personne (utilisez le `personId` du déclencheur pour récupérer le courriel)
- **Action** — Google Groupes : Ajouter un membre

### Transférer les soumissions de formulaires vers un outil de suivi de projets

- **Déclencheur** — B1 : Nouvelle soumission de formulaire
- **Action** — Notion / Linear / Asana / Trello : Créer une page / un ticket / une tâche

## Fonctionnement interne des déclencheurs

Les déclencheurs sont des **REST hooks**, et non de l'interrogation périodique -- Zapier ne sollicite pas B1 toutes les 15 minutes. Lorsque vous activez le Zap, Zapier demande à B1 d'enregistrer un webhook pointant vers une URL Zapier privée ; lorsque l'événement se produit, B1 envoie l'enveloppe à Zapier et votre Zap démarre **en quelques secondes**. Désactivez le Zap, et Zapier demande à B1 de supprimer le webhook -- aucun abonnement orphelin.

Cela signifie que le déclencheur ne se déclenche que pour les événements qui surviennent **après** l'activation du Zap. Il n'y a aucune rétroactivité : activer un Zap ne rejoue pas les dons d'hier.

## Limites et remarques

- **Plusieurs Zaps avec le même déclencheur** enregistrent chacun leur propre webhook B1 -- aucun conflit, mais il est bon de le savoir si vous consultez **Paramètres → Développeur → Webhooks** et vous demandez pourquoi trois lignes identiques « Zapier — donation.created » apparaissent.
- **Données de test dans la configuration du Zap** -- lorsque vous construisez un Zap, Zapier demande des données d'exemple pour faire correspondre les champs. Il récupère l'événement correspondant le plus récent de B1 s'il en existe un ; sinon, il utilise un exemple synthétique issu de la définition de l'application.
- **Les échecs d'action apparaissent comme des erreurs de Zap** dans l'historique des tâches de Zapier. Cause courante : une clé API sans la bonne portée (par exemple, une action « Ajouter un don » exige `donations:write`). Générez à nouveau la clé avec les portées correctes et reconnectez-la dans Zapier.
- **Quotas d'appels API sortants** -- chaque appel API B1 effectué par une action compte dans votre quota de tâches Zapier, et non dans quoi que ce soit du côté de B1.

## Dépannage

- **« Échec de l'authentification »** lors de la connexion -- la clé API est erronée, révoquée ou n'a pas les portées nécessaires au Zap. Générez-la à nouveau dans B1Admin avec au moins `settings:write` plus les portées de ressources touchées par le Zap, puis mettez à jour la connexion.
- **Le déclencheur ne se déclenche jamais** -- vérifiez que le webhook a bien été enregistré : dans B1Admin, **Paramètres → Développeur → Webhooks** doit maintenant afficher une ligne nommée « Zapier — &lt;événement&gt; ». Si elle n'y est pas, la clé API n'avait probablement pas `settings:write` lorsque vous avez activé le Zap. Corrigez la clé, puis désactivez et réactivez le Zap.
- **Le déclencheur se déclenche deux fois** -- Zapier renvoie parfois un événement si son accusé de réception a été perdu. Utilisez une étape « Filtre par Zapier » sur un identifiant unique (par exemple l'`id` de la personne) si vous avez besoin d'une déduplication stricte.

## Voir aussi

- [Make](./make) -- le même principe, sur une autre plateforme
- [Slack et Discord](./slack-discord) -- notifications de clavardage plus simples, sans Zapier
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
