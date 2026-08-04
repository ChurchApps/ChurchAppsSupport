---
title: "Zapier"
---

# Zapier

<div class="article-intro">

L'application officielle B1.church sur Zapier permet à un Zap de réagir aux événements de votre église (nouvelle personne, nouveau don, nouveau membre de groupe, …) et d'écrire des enregistrements en retour dans B1. Pas de code, pas d'infrastructure — vous le câblez dans l'éditeur glisser-déposer de Zapier, collez une clé API, et activez le Zap.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Zapier](https://zapier.com) (le forfait gratuit suffit pour quelques Zaps)
- Un administrateur d'église avec l'autorisation **Modifier les paramètres** dans B1Admin (vous créerez une clé API)
- Une idée de ce que vous voulez faire — par ex. « quand une personne est ajoutée dans B1, l'ajouter à ma liste Mailchimp »

</div>

## Déclencheurs et actions

| Type | Quoi | Événement B1 / point de terminaison |
|---|---|---|
| **Déclencheur** | Nouvelle personne | `person.created` |
| **Déclencheur** | Personne mise à jour | `person.updated` |
| **Déclencheur** | Nouveau don | `donation.created` |
| **Déclencheur** | Nouveau membre de groupe | `group.member.added` |
| **Déclencheur** | Nouvelle soumission de formulaire | `form.submission.created` |
| **Action** | Créer une personne | ajoute une nouvelle personne |
| **Action** | Ajouter un don | enregistre un don |
| **Action** | Ajouter un membre de groupe | ajoute une personne à un groupe |
| **Action** | Rechercher une personne | recherche une personne par id, e-mail ou nom ; fait échouer la tâche si personne ne correspond |

Combinez-les librement avec n'importe laquelle des plus de 7 000 applications prises en charge par Zapier.

## Configuration

### 1. Créer une clé API B1

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, donnez-lui un nom comme « Zapier », et sélectionnez les portées dont le Zap a besoin.
3. **Important :** les déclencheurs Zapier enregistrent un webhook en votre nom lorsque le Zap est activé, ce qui nécessite la portée **`settings:write`**. Incluez toujours `settings:write` si l'un de vos Zaps utilise un déclencheur B1.
4. Accordez également les portées dont les actions ont besoin — par exemple une action « Ajouter un don » nécessite `donations:write`, « Créer une personne » nécessite `people:write`.
5. Enregistrez. La clé complète `cak_…` n'est affichée **qu'une seule fois** — copiez-la.

### 2. Connecter Zapier à B1

1. Dans Zapier, créez un nouveau Zap.
2. Lorsque vous choisissez un déclencheur ou une action B1 pour la première fois, Zapier vous demande de **vous connecter à B1.church**.
3. Collez la clé API de l'étape 1 et cliquez sur **Oui, continuer**. Zapier la valide auprès de votre église.

La connexion est enregistrée dans Zapier et réutilisée par tous les Zaps de votre compte.

### 3. Construire le Zap

Choisissez un déclencheur, puis ajoutez une ou plusieurs étapes d'action. Exemples ci-dessous.

## Recettes courantes

### Ajouter les nouvelles personnes B1 à Mailchimp

- **Déclencheur** — B1 : Nouvelle personne
- **Action** — Mailchimp : Ajouter/Mettre à jour un abonné. Associez `name__first`, `name__last`, `contactInfo__email` de B1 aux champs Prénom / Nom / E-mail de Mailchimp.

### Publier les dons dans un canal Slack avec une carte plus riche que le connecteur intégré

- **Déclencheur** — B1 : Nouveau don
- **Action** — Slack : Envoyer un message au canal. Composez n'importe quelle mise en page — boutons, pièces jointes, etc. — que le [connecteur Slack](./slack-discord) intégré ne peut pas faire.

### Ajouter les nouveaux membres de groupe à un groupe Google

- **Déclencheur** — B1 : Nouveau membre de groupe (filtré sur un `groupId` spécifique)
- **Action** — Filtrer par Zapier : ne continuer que si le groupe B1 est celui qui vous intéresse
- **Action** — B1 : Rechercher une personne (utiliser le `personId` du déclencheur pour récupérer l'e-mail)
- **Action** — Google Groups : Ajouter un membre

### Transférer les soumissions de formulaire vers un gestionnaire de projet

- **Déclencheur** — B1 : Nouvelle soumission de formulaire
- **Action** — Notion / Linear / Asana / Trello : Créer une page / un ticket / une tâche

## Comment fonctionnent les déclencheurs en coulisses

Les déclencheurs sont des **REST hooks**, pas du polling — Zapier ne sollicite pas B1 toutes les 15 minutes. Lorsque vous activez le Zap, Zapier demande à B1 d'enregistrer un webhook pointant vers une URL Zapier privée ; lorsque l'événement se déclenche, B1 envoie l'enveloppe en POST à Zapier et votre Zap démarre **en quelques secondes**. Désactivez le Zap et Zapier demande à B1 de supprimer le webhook — aucun abonnement orphelin.

Cela signifie que le déclencheur ne se déclenche que pour les événements qui se produisent **après** l'activation du Zap. Il n'y a pas de rattrapage rétroactif — activer un Zap ne rejoue pas les dons d'hier.

## Limites et remarques

- **Plusieurs Zaps avec le même déclencheur** enregistrent chacun leur propre webhook B1 — il n'y a pas de conflit, mais il est utile de le savoir si vous inspectez **Paramètres → Développeur → Webhooks** et vous demandez pourquoi trois lignes identiques `Zapier — donation.created` sont présentes.
- **Données de test dans la configuration du Zap** — lorsque vous créez un Zap, Zapier demande des données d'exemple pour associer les champs. Il récupérera l'événement correspondant le plus récent de B1 s'il en existe un ; sinon, il utilise un exemple synthétique provenant de la définition de l'application.
- **Les échecs d'action se manifestent comme des erreurs de Zap** dans l'historique des tâches de Zapier. Cause courante : une clé API sans la bonne portée (par ex. une action « Ajouter un don » nécessite `donations:write`). Réémettez la clé avec les bonnes portées et reconnectez-vous dans Zapier.
- **Quotas d'appels API sortants** — chaque appel API B1 provenant d'une action compte dans votre quota de tâches Zapier, pas dans quoi que ce soit du côté de B1.

## Dépannage

- **« Authentication failed »** lors de la connexion — la clé API est incorrecte, révoquée, ou manque des portées dont le Zap a besoin. Réémettez-la dans B1Admin avec au moins `settings:write` plus les portées de ressources touchées par le Zap, puis mettez à jour la connexion.
- **Le déclencheur ne se déclenche jamais** — confirmez que le webhook a bien été enregistré : dans B1Admin, **Paramètres → Développeur → Webhooks** devrait maintenant afficher une ligne nommée « Zapier — &lt;event&gt; ». Si elle n'y est pas, la clé API manquait probablement de `settings:write` lorsque vous avez activé le Zap. Corrigez la clé, désactivez puis réactivez le Zap.
- **Le déclencheur se déclenche deux fois** — Zapier redistribue parfois si son accusé de réception a été perdu. Utilisez une étape « Filtrer par Zapier » sur un id unique (par ex. l'`id` de la personne) si vous avez besoin d'une déduplication stricte.

## Voir aussi

- [Make](./make) — même schéma, plateforme différente
- [Slack et Discord](./slack-discord) — notifications de chat plus simples sans Zapier
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
