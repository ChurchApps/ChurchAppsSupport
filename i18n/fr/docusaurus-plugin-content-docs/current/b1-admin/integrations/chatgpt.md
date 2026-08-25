---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT d'OpenAI aux données B1 de votre église et laissez-le faire le travail. Une fois connecté, ChatGPT peut voir vos dossiers d'église en direct et vous aider à accomplir des tâches qui prendraient autrement plusieurs étapes dans B1 Admin.

**Quelques choses que vous pouvez lui demander de faire :**
- *« Configurer les salles de classe d'école du dimanche et mettre chaque enseignant dans la bonne salle en fonction de son groupe »*
- *« Me montrer tout le monde qui a assisté la semaine dernière mais n'a pas été assigné à un petit groupe »*
- *« Résumer les dons de ce mois par fonds »*
- *« Qui sont nos nouveaux membres et les avons-nous suivis ? »*
- *« Je ne sais pas comment faire X dans B1 -- peux-tu me le montrer ou le faire pour moi ? »*

ChatGPT tire les réponses et les actions directement de vos données B1, limitées à votre église uniquement.

:::tip Recommandé : Claude Code
Pour la meilleure expérience MCP, [Claude Code](./claude) est le client recommandé -- la configuration prend une commande et cela fonctionne immédiatement. ChatGPT fonctionne aussi et est un excellent choix si votre équipe l'utilise déjà.
:::

Deux chemins sont pris en charge : le **Connecteur MCP** (intégré à ChatGPT) et un **Custom GPT** pour les équipes qui veulent un assistant partageable.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Modification des paramètres** dans B1 Admin (nécessaire pour créer une clé API)
- Un compte **ChatGPT Plus, Pro, Team ou Enterprise**

</div>

## Guide de configuration rapide

Suivez ces étapes dans l'**application de bureau ChatGPT** (Mac/Windows).

**Étape 1 -- Obtenez d'abord votre clé API de B1 Admin**

Avant de toucher à ChatGPT, créez une clé API dans B1 Admin pour l'avoir prête à coller :

1. Allez à **Paramètres → Développeur → Clés API** dans B1 Admin
2. Cliquez sur **Nouvelle clé API**, nommez-la « ChatGPT », choisissez vos scopes et cliquez sur **Enregistrer**
3. Copiez la clé `cak_…` -- elle ne s'affiche qu'une seule fois

**Étapes 2-7 :** Suivez les écrans de l'application ChatGPT pour ajouter un nouveau serveur MCP avec :

- **Nom** : `B1 Church`
- **URL** : `https://api.churchapps.org/mcp`
- **En-têtes** : `Authorization: Bearer cak_yourkey`

Une fois connecté, vous pouvez poser des questions en langage naturel à ChatGPT et il appellera l'API B1 pour vous.

## Sécurité

- **Isolation par église** -- La clé API est liée à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Scopes de permission** -- La clé porte uniquement les scopes que vous avez accordés. Supprimer un scope coupe l'accès au prochain appel.
- **Révocable instantanément** -- Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès se termine immédiatement.

## Coût

ChurchApps est gratuit et open-source -- l'API que ChatGPT appelle fait partie de ce que votre église exécute déjà. OpenAI facture l'utilisation de ChatGPT selon ses propres plans. Il n'y a pas de coût par appel de la part de ChurchApps.
