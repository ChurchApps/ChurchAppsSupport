---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT d'OpenAI aux données B1 de votre église afin que vous puissiez poser des questions comme « qui n'a pas été dans un groupe ce trimestre ? » ou « résumez les dons pour le fonds de construction ce mois » et que ChatGPT tire les réponses directement de B1. Deux chemins sont supportés : un **GPT Personnalisé** qui fonctionne sur n'importe quel plan ChatGPT Plus, et le **serveur MCP** pour les outils de développement qui le supporte.

</div>

<div class="prereqs">
<h4>Avant de Commencer</h4>

- Un administrateur d'église avec la permission **Modifier les Paramètres** (pour créer une clé API)
- Un compte **ChatGPT Plus, Pro, Team ou Enterprise** (le niveau gratuit ne peut pas utiliser les GPT personnalisés ou les connecteurs)
- L'URL complète de votre API B1 -- généralement `https://api.churchapps.org` pour les églises hébergées, ou votre hôte Api auto-hébergé

</div>

## Choisissez le Bon Chemin

| Chemin | Plan requis | Effort | Ce que vous obtenez |
|---|---|---|---|
| **GPT Personnalisé avec Actions** | ChatGPT Plus / Team / Enterprise | 10 minutes | Un GPT partageabil qui appelle l'API REST B1 pour tout coéquipier |
| **MCP via les Outils OpenAI** | Développeur / Agent SDK / Pro Connecteurs | Plus | Découverte complète via le serveur MCP, adapté aux outils de codage et aux plateformes d'agent |

Pour la plupart des églises, le chemin **GPT Personnalisé** est la bonne réponse -- il ne nécessite aucune configuration de développeur, fonctionne dans l'application ChatGPT régulière et les clients mobiles, et peut être partagé avec votre équipe. Le chemin MCP est documenté ci-dessous pour le personnel technique utilisant les outils de développeur d'OpenAI ou les plateformes d'agent.

## Chemin A -- GPT Personnalisé avec Actions

Cela relie ChatGPT directement à l'API REST B1. Votre GPT personnalisé sera capable de lire et (éventuellement) d'écrire les enregistrements B1 au nom de celui qui l'utilise.

### 1. Créer une Clé API

1. Dans B1Admin, allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle Clé API**, nommez-la `ChatGPT` et choisissez les portées. Les ensembles de démarrage courants :
   - **Assistant en Lecture Seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`
   - **Lecture + Écriture :** ajouter les portées `:write` correspondantes
3. Enregistrez et copiez la clé `cak_…` complète.

Voir [Clés API](/docs/developer/api/api-keys) pour la liste complète des portées.

### 2. Créer le GPT Personnalisé

1. Dans ChatGPT, cliquez sur votre profil → **Mes GPT** → **Créer un GPT**.
2. Passez à l'onglet **Configurer** et donnez au GPT un nom (par exemple « Assistant B1 ») et des instructions comme :

   ```
   Vous aidez le personnel de l'église à interroger leurs enregistrements B1. Utilisez les actions de l'API B1 pour
   rechercher les gens, les groupes, la présence, les dons et le contenu. Limitez toujours les réponses aux données
   que l'utilisateur a la permission de voir. Soyez concis.
   ```

3. Faites défiler jusqu'à **Actions** → **Créer une Nouvelle Action** → **Authentification**.
   - **Type d'Authentification :** Clé API
   - **Clé API :** `cak_<préfixe>.<secret>`
   - **Type d'Auth :** Porteur
   - Enregistrez.
4. Dans la boîte **Schéma**, collez une spécification OpenAPI minimale décrivant les points de terminaison que vous souhaitez que le GPT utilise. Un début qui couvre les lectures les plus courantes :

   ```yaml
   openapi: 3.1.0
   info:
     title: B1 API
     version: "1.0"
   servers:
     - url: https://api.churchapps.org
   paths:
     /membership/people:
       get:
         operationId: listPeople
         summary: Lister les Gens de l'Église
         parameters:
           - in: query
             name: firstName
             schema: { type: string }
           - in: query
             name: lastName
             schema: { type: string }
           - in: query
             name: email
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/people/{id}:
       get:
         operationId: getPerson
         summary: Obtenir une Seule Personne par ID
         parameters:
           - in: path
             name: id
             required: true
             schema: { type: string }
         responses:
           "200":
             description: OK
     /membership/groups:
       get:
         operationId: listGroups
         summary: Lister les Groupes de l'Église
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: Lister les Dons
         parameters:
           - in: query
             name: personId
             schema: { type: string }
           - in: query
             name: startDate
             schema: { type: string, format: date }
           - in: query
             name: endDate
             schema: { type: string, format: date }
         responses:
           "200":
             description: OK
     /attendance/attendance:
       get:
         operationId: listAttendance
         summary: Lister les Dossiers de Présence
         parameters:
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: campusId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

   Élargissez le schéma avec plus de points de terminaison selon les besoins -- chaque route authentifiée dans B1 accepte la même clé `cak_…`. La [référence de l'API REST](/docs/developer/api/endpoints) répertorie ce qui est disponible.

5. Enregistrez l'action. Testez-la avec une invite comme *« Combien de Gens y a-t-il à l'Église ? »* -- ChatGPT appellera `listPeople` et répondra.
6. **Publiez** le GPT (Seulement Moi / N'importe qui avec le Lien / Organisation) et partagez avec votre équipe.

### 3. L'Utiliser

Toute personne avec qui vous partagez le GPT peut poser des questions en langage naturel -- ChatGPT choisit la bonne action, appelle B1 et répond. Les portées de la clé s'appliquent toujours : une clé en lecture seule refusera les écritures peu importe l'action définie dans le schéma.

## Chemin B -- MCP via les Outils OpenAI

L'API B1 inclut un serveur MCP à `/mcp` que n'importe quel outil MCP-conscient d'OpenAI peut utiliser -- par exemple [l'SDK des Agents OpenAI](https://platform.openai.com/docs/guides/agents), l'outil MCP de l'API Responses, ou les plateformes d'agent tierces qui consomment les serveurs MCP.

Authentifiez-vous avec la même clé `cak_…` dans l'en-tête `Authorization: Bearer`. Trois outils sont exposés : `list_endpoints`, `describe_endpoint` et `api_call`. Voir la [référence du Développeur du Serveur MCP](/docs/developer/api/mcp) pour le protocole, le transport et les schémas d'outils.

Les « Connecteurs » intégrés de ChatGPT (Pro/Business/Enterprise) attendent actuellement les serveurs MCP avec des formes d'outils `search` et `fetch` spécifiques et l'authentification basée sur OAuth, que le serveur MCP B1 ne publie pas. Pour ChatGPT à l'intérieur de l'application grand public, le chemin GPT Personnalisé ci-dessus est le choix pratique.

## Sécurité et Limites

- **Isolation par Église.** La clé API se résout à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Portée des Permissions.** Si vous supprimez une permission de la personne qui a créé la clé, ChatGPT la perd au prochain appel -- instantanément.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de ChatGPT se termine immédiatement.
- **Partager un GPT Personnalisé Partage les Données.** Toute personne ayant accès au GPT peut lui poser des questions et voir tout ce que la clé a des portées pour. Limitez le partage au personnel qui devrait voir ces données, et préférez des portées plus étroites (par exemple, omettez `donations:read` pour un GPT partagé largement).
- **Piste d'Audit.** Les mutations passent par le même journal d'audit que les actions B1Admin ; examinez-les sous **Rapports → Journal d'Audit**.

## Coût

ChurchApps est gratuit et open-source -- l'API que votre GPT personnalisé appelle fait partie de l'API que votre église exécute déjà. OpenAI facture l'utilisation de ChatGPT selon leurs plans. Il n'y a pas de coût par appel de ChurchApps.

## Dépannage

**L'Action Retourne 401 :** l'en-tête porteur n'est pas défini correctement. Dans le panneau d'authentification de l'action, assurez-vous que **Type d'Auth : Porteur** est sélectionné et que la valeur de la clé n'inclut pas le mot `Bearer` (ChatGPT l'ajoute pour vous).

**L'Action Retourne 403 :** la clé n'a pas la portée pour ce point de terminaison. Créez une nouvelle clé avec les bonnes portées et mettez à jour le GPT.

**ChatGPT Appelle la Mauvaise Action :** serrez les champs `summary` et `description` dans votre schéma OpenAPI pour que le modèle choisisse le bon. L'ajout de requêtes d'exemple aux instructions du GPT aide également.

**Le Panneau d'Action Rejette le Schéma :** ChatGPT nécessite OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML dans n'importe quel validateur OpenAPI en ligne avant de coller.

**Développement Local :** pointez l'URL `servers` de l'action vers votre API locale (par exemple `http://localhost:8084`) -- mais notez que les actions de ChatGPT n'appellent que les URL publiques, donc pour les tests locaux, utilisez un tunnel comme `ngrok` ou frappez l'API directement avec `curl` pour confirmer la clé d'abord.

## Associé

- [Clés API](/docs/developer/api/api-keys) -- référence complète des portées
- [Serveur MCP (référence du Développeur)](/docs/developer/api/mcp) -- détails du protocole et schémas d'outils
- [Claude](./claude) -- la même idée, pour les modèles d'Anthropic
- [Référence de l'API REST](/docs/developer/api/endpoints) -- chaque point de terminaison qu'une action GPT Personnalisée peut appeler
