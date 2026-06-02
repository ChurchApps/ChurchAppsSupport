---
title: "Zapier"
---

# Zapier

<div class="article-intro">

L'application B1.church officielle sur Zapier vous permet à un Zap de réagir aux événements de votre église (nouvelle personne, nouveau don, nouveau membre du groupe, ...) et d'écrire les enregistrements dans B1. Aucun codage, aucune infrastructure — vous le configurez dans l'éditeur glisser-déposer de Zapier, collez une clé API et activez le Zap.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Zapier](https://zapier.com) (le plan gratuit suffit pour quelques Zaps)
- Un administrateur d'église avec la permission **Modifier les paramètres** dans B1Admin (vous créerez une clé API)
- Une idée de ce que vous voulez faire — par exemple « quand une personne est ajoutée dans B1, l'ajouter à ma liste Mailchimp »

</div>

## Déclencheurs et actions

| Type | Quoi | Événement / point d'extrémité B1 |
|---|---|---|
| **Déclencheur** | Nouvelle personne | `person.created` |
| **Déclencheur** | Personne mise à jour | `person.updated` |
| **Déclencheur** | Nouveau don | `donation.created` |
| **Déclencheur** | Nouveau membre du groupe | `group.member.added` |
| **Déclencheur** | Nouvelle soumission de formulaire | `form.submission.created` |
| **Action** | Créer une personne | ajoute une nouvelle personne |
| **Action** | Ajouter un don | enregistre un don |
| **Action** | Ajouter un membre du groupe | ajoute une personne à un groupe |
| **Recherche** | Trouver une personne | cherche une personne par nom ou e-mail |

Combinez-les librement avec n'importe quelle application parmi les 7 000+ applications supportées par Zapier.

## Configuration

### 1. Créer une clé API B1

1. Dans B1Admin, allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, donnez-lui un nom comme « Zapier » et sélectionnez les portées dont le Zap a besoin.
3. **Important :** Les déclencheurs Zapier enregistrent un webhook en votre nom lorsque le Zap s'active, ce qui nécessite la portée **`settings:write`**. Incluez toujours `settings:write` si l'un de vos Zaps utilise un déclencheur B1.
4. Accordez également les portées dont les actions ont besoin — par exemple une action « Ajouter un don » nécessite `donations:write`, « Créer une personne » nécessite `people:write`.
5. Enregistrer. La clé complète `cak_…` est affichée **une seule fois** — copiez-la.

### 2. Connecter Zapier à B1

1. Dans Zapier, créez un nouveau Zap.
2. Quand vous choisissez un déclencheur ou une action B1 pour la première fois, Zapier vous demande de **Vous connecter à B1.church**.
3. Collez la clé API de l'étape 1 et cliquez sur **Oui, continuer**. Zapier la valide contre votre église.

La connexion est sauvegardée dans Zapier et réutilisée par tous les Zaps de votre compte.

### 3. Créer le Zap

Choisissez un déclencheur, puis ajoutez une ou plusieurs étapes d'action. Exemples ci-dessous.

## Recettes courantes

### Ajouter les nouvelles personnes B1 à Mailchimp

- **Déclencheur** — B1 : Nouvelle personne
- **Action** — Mailchimp : Ajouter/Mettre à jour l'abonné. Mappez `name__first`, `name__last`, `contactInfo__email` de B1 dans les champs Prénom / Nom / Email de Mailchimp.

### Publier les dons sur un canal Slack avec une carte plus riche que le connecteur intégré

- **Déclencheur** — B1 : Nouveau don
- **Action** — Slack : Envoyer un message de canal. Composez n'importe quelle mise en page — boutons, pièces jointes, etc. — que le [connecteur Slack](./slack-discord) intégré ne peut pas gérer.

### Ajouter les nouveaux membres du groupe à un groupe Google

- **Déclencheur** — B1 : Nouveau membre du groupe (filtré par un `groupId` spécifique)
- **Action** — Filtrer par Zapier : continuer uniquement si le groupe B1 est celui qui vous intéresse
- **Action** — B1 : Trouver une personne (utilisez le `personId` du déclencheur pour récupérer l'e-mail)
- **Action** — Groupes Google : Ajouter un membre

### Transférer les soumissions de formulaire vers un suivi de projet

- **Déclencheur** — B1 : Nouvelle soumission de formulaire
- **Action** — Notion / Linear / Asana / Trello : Créer une page / problème / tâche

## Comment fonctionnent les déclencheurs en coulisse

Les déclencheurs sont des **crochets REST**, pas du sondage — Zapier ne ping pas B1 toutes les 15 minutes. Quand vous activez le Zap, Zapier demande à B1 d'enregistrer un webhook pointant vers une URL Zapier privée ; quand l'événement se déclenche, B1 POSTe l'enveloppe à Zapier et votre Zap démarre **en quelques secondes**. Désactivez le Zap et Zapier demande à B1 de supprimer le webhook — pas de souscriptions orphelines.

Cela signifie que le déclencheur ne se déclenche que pour les événements qui se produisent **après** l'activation du Zap. Il n'y a pas de rétrospective — activer un Zap ne relit pas les dons d'hier.

## Limites et notes

- **Plusieurs Zaps avec le même déclencheur** enregistrent chacun leur propre webhook B1 — il n'y a pas de conflit, mais c'est bon de le savoir si vous inspectez **Paramètres → Développeur → Webhooks** et vous demandez pourquoi trois lignes `Zapier — donation.created` identiques sont là.
- **Données de test dans la configuration du Zap** — quand vous créez un Zap, Zapier demande des données d'exemple pour mapper les champs. Il extraira l'événement correspondant le plus récent de B1 s'il en existe un ; sinon, il utilise un exemple synthétique de la définition de l'application.
- **Les défaillances d'action apparaissent comme des erreurs de Zap** dans l'historique des tâches de Zapier. Cause courante : une clé API sans la bonne portée (par exemple une action « Ajouter un don » nécessite `donations:write`). Recréez la clé avec les bonnes portées et reconnectez-vous dans Zapier.
- **Quotas d'appels API sortants** — chaque appel API B1 à partir d'une action compte vers votre quota de tâches Zapier, et non vers quoi que ce soit du côté B1.

## Dépannage

- **« L'authentification a échoué »** lors de la connexion — la clé API est incorrecte, révoquée ou manque les portées dont le Zap a besoin. Recréez-la dans B1Admin avec au moins `settings:write` plus toutes les portées de ressources que le Zap touche, puis mettez à jour la connexion.
- **Le déclencheur ne se déclenche jamais** — confirmez que le webhook a bien été enregistré : dans B1Admin, **Paramètres → Développeur → Webhooks** devrait maintenant afficher une ligne nommée « Zapier — &lt;événement&gt; ». S'il n'y a pas là, la clé API manquait probablement `settings:write` quand vous avez activé le Zap. Corrigez la clé, désactivez le Zap et réactivez-le.
- **Le déclencheur se déclenche deux fois** — Zapier rélivre occasionnellement si son accusé de réception a été perdu. Utilisez une étape « Filtrer par Zapier » sur un identifiant unique (par exemple le `id` de la personne) si vous avez besoin d'une déduplication stricte.

## Voir aussi

- [Make](./make) — même motif, plateforme différente
- [Slack & Discord](./slack-discord) — notifications de chat plus simples sans Zapier
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
