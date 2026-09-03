---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT d'OpenAI aux données B1 de votre église et laissez-le faire le travail difficile. Une fois connecté, ChatGPT peut voir les dossiers vivants de votre église et vous aider à accomplir des choses qui prendraient autrement plusieurs étapes dans B1 Admin — ou que vous ne sauriez pas du tout comment faire.

**Quelques choses que vous pouvez lui demander de faire :**
- *"Configurez les salles de catéchèse du dimanche et placez chaque enseignant dans la bonne salle en fonction de son groupe"*
- *"Montrez-moi tous ceux qui ont assisté la semaine dernière mais n'ont pas été assignés à un petit groupe"*
- *"Résumez les dons de ce mois par fonds"*
- *"Qui sont nos nouveaux membres et leur avons-nous fait un suivi?"*
- *"Je ne sais pas comment faire X dans B1 — peux-tu me guider à travers ou le faire pour moi?"*

ChatGPT récupère les réponses et prend les mesures directement à partir de vos données B1, limitées à votre église uniquement.

:::tip Recommandé : Claude Code
Pour l'expérience MCP la plus fluide, [Claude Code](./claude) est le client recommandé — la configuration prend une commande et elle fonctionne directement. ChatGPT fonctionne également et est un excellent choix si votre équipe l'utilise déjà.
:::

Deux voies sont prises en charge : le **Connecteur MCP** (intégré à ChatGPT) et un **GPT personnalisé** pour les équipes qui veulent un assistant partageable.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur d'église avec la permission **Éditer les Paramètres** dans B1 Admin (nécessaire pour créer une clé API)
- Un compte **ChatGPT Plus, Pro, Team, ou Enterprise**

</div>

## Guide de Configuration Rapide

Suivez ces étapes dans l'**application de bureau ChatGPT** (Mac/Windows). Les écrans peuvent être légèrement différents dans d'autres versions.

---

**Étape 1 — Obtenez votre clé API de B1 Admin en premier**

Avant de toucher à ChatGPT, créez une clé API dans B1 Admin pour qu'elle soit prête à coller :

1. Allez à **Paramètres → Développeur → Clés API** dans B1 Admin
2. Cliquez sur **Nouvelle Clé API**, nommez-la `ChatGPT`, choisissez vos portées (commencez par `people:read`, `groups:read`, `attendance:read`, `donations:read`), et cliquez sur **Enregistrer**
3. Copiez la clé `cak_…` — elle n'est affichée qu'une fois

---

**Étape 2 — Cliquez sur votre nom dans le coin inférieur gauche de ChatGPT**

![Cliquez sur le nom de votre profil](/img/guides/chatgpt-mcp/01.png)

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

**Étape 6 — Cliquez sur Ajouter → Ajouter un serveur MCP**

![Cliquez sur Ajouter puis Ajouter un serveur MCP](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Enregistrer**

![Connecter à un formulaire MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **HTTP Streamable**, puis remplissez :

| Champ | Ce qu'il faut entrer |
|---|---|
| **Nom** | `B1 Church` (ou n'importe quel nom que vous aimez) |
| **Type** | Cliquez sur **HTTP Streamable** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable de jeton Bearer** | Laissez vide |
| **En-têtes** | Cliquez sur **+ Ajouter en-tête** → Clé : `Authorization` → Valeur : voir ci-dessous |

![Exemple rempli affichant Authorization dans Clé et clé Bearer dans Valeur](/img/guides/chatgpt-mcp/08.png)

- **Clé :** `Authorization`
- **Valeur :** `Bearer cak_votrecle` — le mot Bearer, un espace, puis votre clé

Cliquez sur **Enregistrer**.

C'est tout ! Retournez à une conversation et demandez quelque chose comme *"Combien de personnes y a-t-il dans notre église?"* et ChatGPT récupérera la réponse directement de B1.

---

## Étape 1 — Créer une Clé API dans B1 Admin

Chaque connexion à B1 utilise une clé API que vous créez. Cette clé identifie votre église, contrôle ce que ChatGPT peut voir, et peut être révoquée à tout moment.

1. Ouvrez **B1 Admin** et allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle Clé API**.
3. Donnez un nom à la clé — `ChatGPT` fonctionne bien.
4. Sélectionnez les portées (permissions) que ChatGPT devrait avoir. Un bon ensemble de démarrage pour un assistant en lecture seule :
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Cliquez sur **Enregistrer**.
6. Copiez la clé complète qui apparaît — elle commence par `cak_` et s'affiche **une seule fois**. Collez-la quelque part de sûr.

:::tip
Si vous devez jamais révoquer l'accès de ChatGPT, retournez à **Paramètres → Développeur → Clés API** et supprimez la clé. L'accès se termine immédiatement.
:::

---

## Chemin A — Connecteur MCP ChatGPT (Recommandé)

C'est le moyen le plus simple de se connecter. ChatGPT a une boîte de dialogue intégrée "Connecter à un MCP personnalisé" qui fonctionne directement avec le serveur MCP de B1 — pas de GPT personnalisé requis.

### Ce dont vous avez besoin

- Votre clé `cak_…` de l'Étape 1

### Ouvrez le connecteur MCP dans ChatGPT

Dans ChatGPT, allez à **Paramètres → Plugins → MCPs** et cliquez sur **Ajouter → Ajouter un serveur MCP**.

### Remplissez la boîte de dialogue

Cliquez sur **HTTP Streamable**, puis utilisez ces valeurs :

| Champ | Valeur |
|---|---|
| **Nom** | `B1 Church` (ou n'importe quel nom que vous aimez) |
| **Type** | **HTTP Streamable** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable de jeton Bearer** | Laissez vide |
| **En-têtes** | Clé : `Authorization` / Valeur : `Bearer cak_votreprefix.votresecret` |

Pour le champ Valeur, tapez le mot `Bearer`, un espace, puis collez votre clé — tout dans la même boîte. Exemple : `Bearer cak_prefix.secret`.

Cliquez sur **Enregistrer**.

### Demandez quelque chose à ChatGPT

Une fois connecté, il suffit de demander en langage naturel — pas de commandes spéciales nécessaires :

- *"Combien de personnes y a-t-il dans notre église?"*
- *"Qui a adhéré au cours des 30 derniers jours?"*
- *"Quels groupes sont actifs maintenant?"*
- *"Résumez les dons de ce mois par fonds."*

ChatGPT appellera B1 en arrière-plan et répondra à partir de vos données en direct.

---

## Chemin B — GPT Personnalisé avec Actions

Un GPT Personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager — ils ouvrent un lien et commencent à poser des questions sans aucune configuration de leur part. Cela nécessite un compte ChatGPT Plus, Team, ou Enterprise et environ 10 minutes.

### 1. Créer une clé API

Suivez l'Étape 1 ci-dessus si vous ne l'avez pas déjà fait.

### 2. Construire le GPT Personnalisé

1. Dans ChatGPT, cliquez sur votre profil → **Mes GPTs** → **Créer un GPT**.
2. Basculez vers l'onglet **Configurer**, donnez au GPT un nom (p. ex. "Assistante B1") et ajoutez des instructions :

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Faites défiler jusqu'à **Actions** → **Créer une nouvelle action** → **Authentification**.
   - **Type d'authentification :** Clé API
   - **Clé API :** collez votre clé `cak_…`
   - **Type d'authentification :** Bearer
   - Enregistrer.

4. Dans la boîte **Schéma**, collez cette spécification OpenAPI de démarrage :

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
   ```

5. Enregistrez l'action. Testez-la : *"combien de personnes y a-t-il dans l'église?"* — ChatGPT appelle `listPeople` et répond.
6. **Publiez** le GPT (Seulement moi / N'importe qui avec un lien / Organisation) et partagez le lien avec votre équipe.

### 3. L'utiliser

Quiconque dispose du lien peut poser des questions en langage naturel. Les portées de la clé s'appliquent toujours — une clé en lecture seule refuse les écritures indépendamment de ce que le schéma d'action dit.

---

## Sécurité et Limites

- **Isolation par église.** La clé API se résout en une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Scoped par permission.** La clé ne porte que les portées que vous avez accordées. Supprimer une portée (en supprimant et en recréant la clé) supprime cet accès à l'appel suivant.
- **Révocable instantanément.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès se termine immédiatement.
- **Partager un GPT Personnalisé partage les données.** Tous ceux qui ont accès au GPT peuvent voir ce que les portées de la clé permettent. Préférez des portées plus étroites (p. ex. omettez `donations:read`) pour les GPTs partagés largement.
- **Piste d'audit.** Tous les changements effectués via ChatGPT passent par le même journal d'audit que les actions B1 Admin — trouvez-les sous **Rapports → Journal d'Audit**.

## Coût

ChurchApps est gratuit et open-source — l'API que ChatGPT appelle fait partie de ce que votre église gère déjà. OpenAI facture l'utilisation de ChatGPT selon ses propres plans. Il n'y a pas de coût par appel de ChurchApps.

## Dépannage

**Le connecteur MCP dit "Non autorisé" ou affiche une erreur 401 :** votre clé API est manquante ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez que la clé dans l'argument `Authorization:Bearer` est la valeur complète de `cak_…` sans espaces supplémentaires.

**ChatGPT dit qu'il ne peut pas trouver certaines données :** la clé n'a peut-être pas les bonnes portées. Créez une nouvelle clé dans **Paramètres → Développeur → Clés API** avec les portées supplémentaires et mettez à jour le connecteur.

**La commande `npx` échoue :** Node.js n'est peut-être pas installé. Téléchargez et installez-le à partir de [nodejs.org](https://nodejs.org), puis essayez de sauvegarder le connecteur à nouveau.

**L'action personnalisée du GPT renvoie 401 :** dans le panneau d'authentification de l'action, confirmez que **Type d'authentification : Bearer** est sélectionné et que la clé n'inclut pas le mot `Bearer` (ChatGPT l'ajoute automatiquement).

**L'action personnalisée du GPT renvoie 403 :** la clé n'a pas la portée pour ce point de terminaison. Créez une nouvelle clé avec les bonnes portées et mettez à jour le GPT.

**Le schéma d'action est rejeté :** ChatGPT nécessite OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML à [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Connexes

- [Clés API](/docs/developer/api/api-keys) — référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas d'outils
- [Claude](./claude) — la même idée, pour les modèles d'Anthropic
- [Référence API REST](/docs/developer/api/endpoints) — chaque point de terminaison qu'une action personnalisée du GPT peut appeler
