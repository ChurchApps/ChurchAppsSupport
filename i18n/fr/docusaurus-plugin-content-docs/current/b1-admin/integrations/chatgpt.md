---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT d'OpenAI à vos données B1 de l'église et laissez-le faire le travail difficile. Une fois connecté, ChatGPT peut voir vos dossiers d'église en direct et vous aider à accomplir des tâches qui prendraient autrement plusieurs étapes dans B1 Admin -- ou que vous ne pouviez pas du tout comprendre comment faire.

**Certaines choses que vous pouvez lui demander de faire :**
- *« Configurez les salles de classe de l'école du dimanche et mettez chaque enseignant dans la bonne salle en fonction de son groupe »*
- *« Montrez-moi tous les participants à la première visite de la semaine dernière qui n'ont pas été assignés à un petit groupe »*
- *« Résumez les donations de ce mois par fonds »*
- *« Qui sont nos nouveaux membres et les avons-nous contactés ? »*
- *« Je ne peux pas comprendre comment faire X dans B1 -- pouvez-vous m'expliquer ou le faire pour moi ? »*

ChatGPT tire les réponses et prend les mesures directement à partir de vos données B1, limitées à votre église uniquement.

:::tip Recommandé : Claude Code
Pour l'expérience MCP la plus fluide, [Claude Code](./claude) est le client recommandé -- la configuration ne prend qu'une commande et cela fonctionne immédiatement. ChatGPT fonctionne également et est un excellent choix si votre équipe l'utilise déjà.
:::

Deux chemins sont soutenus : le **Connecteur MCP** (intégré dans ChatGPT) et un **GPT personnalisé** pour les équipes qui veulent un assistant partageable.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Modifier les paramètres** dans B1 Admin (nécessaire pour créer une clé API)
- Un compte **ChatGPT Plus, Pro, Team ou Enterprise**

</div>

## Guide de configuration rapide

Suivez ces étapes dans l'**application de bureau ChatGPT** (Mac/Windows). Les écrans peuvent être légèrement différents dans les autres versions.

---

**Étape 1 — Obtenez d'abord votre clé API de B1 Admin**

Avant de toucher à ChatGPT, créez une clé API dans B1 Admin afin que vous l'ayez prête à coller :

1. Allez à **Paramètres → Développeur → Clés API** dans B1 Admin
2. Cliquez sur **Nouvelle clé API**, nommez-la \ChatGPT\, choisissez vos portées (commencez par \people:read\, \groups:read\, \ttendance:read\, \donations:read\), et cliquez sur **Enregistrer**
3. Copiez la clé \cak_…\ -- elle n'est affichée qu'une seule fois

---

**Étape 2 — Cliquez sur votre nom dans le coin inférieur gauche de ChatGPT**

![Cliquez sur votre nom de profil](/img/guides/chatgpt-mcp/01.png)

---

**Étape 3 — Cliquez sur Paramètres**

![Cliquez sur Paramètres du menu](/img/guides/chatgpt-mcp/02.png)

---

**Étape 4 — Cliquez sur Plugins dans la barre latérale gauche**

![Cliquez sur Plugins sous Intégrations](/img/guides/chatgpt-mcp/03.png)

---

**Étape 5 — Cliquez sur l'onglet MCPs**

![Cliquez sur l'onglet MCPs](/img/guides/chatgpt-mcp/04.png)

Vous verrez tous les serveurs MCP que vous avez déjà ajoutés ici.

---

**Étape 6 — Cliquez sur Ajouter → Ajouter le serveur MCP**

![Cliquez sur Ajouter puis Ajouter le serveur MCP](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Enregistrer**

![Formulaire de connexion à un MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **HTTP en flux continu**, puis remplissez :

| Champ | Quoi entrer |
|---|---|
| **Nom** | \B1 Church\ (ou tout nom que vous aimez) |
| **Type** | Cliquez sur **HTTP en flux continu** |
| **URL** | \https://api.churchapps.org/mcp\ |
| **Var env du jeton bearer** | Laissez vide |
| **En-têtes** | Cliquez sur **+ Ajouter un en-tête** → Clé : \Authorization\ → Valeur : voir ci-dessous |

![Exemple rempli montrant Authorization dans Key et clé Bearer dans Value](/img/guides/chatgpt-mcp/08.png)

- **Clé :** \Authorization\
- **Valeur :** \Bearer cak_votrecle\ -- le mot Bearer, un espace, puis votre clé

Cliquez sur **Enregistrer**.

C'est tout ! Retournez à un chat et demandez quelque chose comme *« Combien de personnes sont dans notre église ? »* et ChatGPT tirera la réponse directement de B1.

---

## Étape 1 — Créer une clé API dans B1 Admin

Chaque connexion à B1 utilise une clé API que vous créez. Cette clé identifie votre église, contrôle ce que ChatGPT peut voir, et peut être révoquée à tout moment.

1. Ouvrez **B1 Admin** et allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**.
3. Donnez un nom à la clé -- \ChatGPT\ fonctionne bien.
4. Sélectionnez les portées (permissions) que ChatGPT devrait avoir. Un bon ensemble de démarrage pour un assistant en lecture seule :
   - \people:read\
   - \groups:read\
   - \ttendance:read\
   - \donations:read\
5. Cliquez sur **Enregistrer**.
6. Copiez la clé complète qui apparaît -- elle commence par \cak_\ et n'est affichée **qu'une seule fois**. Collez-la quelque part de sûr.

:::tip
Si vous avez jamais besoin de révoquer l'accès de ChatGPT, retournez à **Paramètres → Développeur → Clés API** et supprimez la clé. L'accès se termine immédiatement.
:::

---

## Chemin A — Connecteur ChatGPT MCP (Recommandé)

C'est le moyen le plus simple de se connecter. ChatGPT a une boîte de dialogue intégrée « Connecter à un MCP personnalisé » qui fonctionne directement avec le serveur MCP de B1 -- aucun GPT personnalisé requis.

### Ce dont vous avez besoin

- Votre clé \cak_…\ de l'étape 1

### Ouvrez le connecteur MCP dans ChatGPT

Dans ChatGPT, allez à **Paramètres → Plugins → MCPs** et cliquez sur **Ajouter → Ajouter le serveur MCP**.

### Remplissez la boîte de dialogue

Cliquez sur **HTTP en flux continu**, puis utilisez ces valeurs :

| Champ | Valeur |
|---|---|
| **Nom** | \B1 Church\ (ou tout nom que vous aimez) |
| **Type** | **HTTP en flux continu** |
| **URL** | \https://api.churchapps.org/mcp\ |
| **Var env du jeton bearer** | Laissez vide |
| **En-têtes** | Clé : \Authorization\ / Valeur : \Bearer cak_votreprefix.votresecret\ |

Pour le champ Valeur, tapez le mot \Bearer\, un espace, puis collez votre clé -- tout dans la même boîte. Exemple : \Bearer cak_prefix.secret\.

Cliquez sur **Enregistrer**.

### Demandez à ChatGPT quelque chose

Une fois connecté, posez simplement des questions en langage courant -- aucune commande spéciale requise :

- *« Combien de personnes sont dans notre église ? »*
- *« Qui a adhéré dans les 30 derniers jours ? »*
- *« Quels groupes sont actifs maintenant ? »*
- *« Résumez les donations de ce mois par fonds. »*

ChatGPT appellera B1 en arrière-plan et répondra à partir de vos données en direct.

---

## Chemin B — GPT personnalisé avec Actions

Un GPT personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager -- ils ouvrent un lien et commencent à poser des questions sans aucune configuration de leur côté. Cela nécessite un compte ChatGPT Plus, Team ou Enterprise et environ 10 minutes.

### 1. Créez une clé API

Suivez l'étape 1 ci-dessus si vous ne l'avez pas déjà fait.

### 2. Construisez le GPT personnalisé

1. Dans ChatGPT, cliquez sur votre profil → **Mes GPTs** → **Créer un GPT**.
2. Basculez vers l'onglet **Configurer**, donnez au GPT un nom (par exemple, « Assistant B1 ») et ajoutez les instructions :

   \\\
   Vous aidez le personnel de l'église à interroger leurs dossiers B1. Utilisez les actions de l'API B1 pour
   rechercher les personnes, les groupes, la présence, les donations et le contenu. Limitez toujours
   les réponses aux données que l'utilisateur a la permission de voir. Soyez concis.
   \\\

3. Faites défiler jusqu'à **Actions** → **Créer une nouvelle action** → **Authentification**.
   - **Type d'authentification :** Clé API
   - **Clé API :** collez votre clé \cak_…\
   - **Type d'authentification :** Bearer
   - Enregistrez.

4. Dans la boîte **Schéma**, collez ce spec OpenAPI de démarrage :

   \\\yaml
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
         summary: List people in the church
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
         summary: Get a single person by id
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
         summary: List groups in the church
         responses:
           "200":
             description: OK
     /giving/donations:
       get:
         operationId: listDonations
         summary: List donations
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
         summary: List attendance records
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
   \\\

5. Enregistrez l'action. Testez-le : *« combien de personnes sont dans l'église ? »* -- ChatGPT appelle \listPeople\ et répond.
6. **Publiez** le GPT (Moi uniquement / N'importe qui avec le lien / Organisation) et partagez le lien avec votre équipe.

### 3. Utilisez-le

N'importe qui ayant le lien peut poser des questions en langage naturel. Les portées de la clé s'appliquent toujours -- une clé en lecture seule refuse les écritures indépendamment de ce que dit le schéma d'action.

---

## Sécurité et limites

- **Isolation par église.** La clé API se résout à une seule église. ChatGPT ne peut pas voir les données des autres églises.
- **Limité aux permissions.** La clé ne porte que les portées que vous avez accordées. Supprimer une portée (en supprimant et en recréant la clé) coupe cet accès au prochain appel.
- **Révocable instantanément.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès se termine immédiatement.
- **Partager un GPT personnalisé partage les données.** Tous ceux qui ont accès au GPT peuvent voir tout ce que les portées de la clé permettent. Préférez les portées plus étroites (par exemple, omettez \donations:read\) pour les GPTs partagés largement.
- **Piste d'audit.** Tous les changements effectués via ChatGPT passent par le même journal d'audit que les actions B1 Admin -- trouvez-les sous **Rapports → Journal d'audit**.

## Coût

ChurchApps est gratuit et open-source -- l'API que ChatGPT appelle fait partie de ce que votre église exécute déjà. OpenAI facture l'utilisation de ChatGPT selon leurs propres plans. Il n'y a pas de coût par appel de ChurchApps.

## Dépannage

**Le connecteur MCP dit « Non autorisé » ou affiche une erreur 401 :** votre clé API est manquante ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez que la clé dans l'argument \Authorization:Bearer\ est la valeur \cak_…\ complète sans espaces supplémentaires.

**ChatGPT dit qu'il ne peut pas trouver certaines données :** la clé peut ne pas avoir les bonnes portées. Créez une nouvelle clé dans **Paramètres → Développeur → Clés API** avec les portées supplémentaires et mettez à jour le connecteur.

**La commande \
px\ échoue :** Node.js peut ne pas être installé. Téléchargez et installez-le à partir de [nodejs.org](https://nodejs.org), puis essayez d'enregistrer le connecteur à nouveau.

**L'action GPT personnalisée retourne 401 :** dans le panneau d'authentification de l'action, confirmez que **Type d'authentification : Bearer** est sélectionné et que la clé n'inclut pas le mot \Bearer\ (ChatGPT l'ajoute automatiquement).

**L'action GPT personnalisée retourne 403 :** la clé n'a pas la portée pour ce point de terminaison. Créez une nouvelle clé avec les bonnes portées et mettez à jour le GPT.

**Le schéma d'action est rejeté :** ChatGPT nécessite OpenAPI 3.1 avec au moins une entrée \paths\ et une URL \servers\. Validez le YAML sur [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Similaire

- [Clés API](/docs/developer/api/api-keys) -- référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) -- détails du protocole et schémas d'outils
- [Claude](./claude) -- même idée, pour les modèles d'Anthropic
- [Référence de l'API REST](/docs/developer/api/endpoints) -- chaque point de terminaison qu'une action GPT personnalisée peut appeler
