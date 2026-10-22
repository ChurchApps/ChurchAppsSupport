---
title: "ChatGPT"
---

# ChatGPT {#chatgpt}

<div class="article-intro">

Connectez ChatGPT d'OpenAI aux données B1 de votre église et laissez-le faire le gros du travail. Une fois connecté, ChatGPT peut consulter vos fiches d'église en temps réel et vous aider à accomplir des tâches qui exigeraient autrement plusieurs étapes dans B1 Admin -- ou que vous ne sauriez pas réaliser du tout.

**Voici quelques demandes possibles :**
- *« Configure les salles de l'école du dimanche et place chaque enseignant dans la bonne salle selon son groupe »*
- *« Montre-moi toutes les personnes présentes la semaine dernière qui n'ont pas été affectées à un petit groupe »*
- *« Résume les dons de ce mois par fonds »*
- *« Qui sont nos plus récents membres, et avons-nous fait le suivi auprès d'eux ? »*
- *« Je n'arrive pas à faire X dans B1 -- peux-tu me guider pas à pas ou le faire pour moi ? »*

ChatGPT récupère les réponses et effectue les actions directement à partir de vos données B1, limitées à votre église seulement.

:::tip Recommandé : Claude Code
Pour l'expérience MCP la plus fluide, [Claude Code](./claude) est le client recommandé -- la configuration prend une seule commande et fonctionne telle quelle. ChatGPT fonctionne aussi et constitue un excellent choix si votre équipe l'utilise déjà.
:::

Deux voies sont prises en charge : le **connecteur MCP** (intégré à ChatGPT) et un **GPT personnalisé** pour les équipes qui veulent un assistant partageable.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur de l'église ayant la permission **Modifier les paramètres** dans B1 Admin (nécessaire pour créer une clé API)
- Un compte **ChatGPT Plus, Pro, Team ou Enterprise**

</div>

## Guide d'installation rapide {#quick-setup-guide}

Suivez ces étapes dans l'**application de bureau ChatGPT** (Mac/Windows). Les écrans peuvent légèrement différer dans d'autres versions.

---

**Étape 1 — Obtenez d'abord votre clé API dans B1 Admin**

Avant de toucher à ChatGPT, créez une clé API dans B1 Admin pour l'avoir prête à coller :

1. Allez dans **Paramètres → Développeur → Clés API** dans B1 Admin
2. Cliquez sur **Nouvelle clé API**, nommez-la `ChatGPT`, choisissez vos portées (commencez par `people:read`, `groups:read`, `attendance:read`, `donations:read`), puis cliquez sur **Enregistrer**
3. Copiez la clé `cak_…` -- elle n'est affichée qu'une seule fois

---

**Étape 2 — Cliquez sur votre nom dans le coin inférieur gauche de ChatGPT**

![Cliquez sur le nom de votre profil](/img/guides/chatgpt-mcp/01.png)

---

**Étape 3 — Cliquez sur Paramètres**

![Cliquez sur Paramètres dans le menu](/img/guides/chatgpt-mcp/02.png)

---

**Étape 4 — Cliquez sur Plugins dans la barre latérale gauche**

![Cliquez sur Plugins sous Intégrations](/img/guides/chatgpt-mcp/03.png)

---

**Étape 5 — Cliquez sur l'onglet MCPs**

![Cliquez sur l'onglet MCPs](/img/guides/chatgpt-mcp/04.png)

Vous verrez ici les serveurs MCP que vous avez déjà ajoutés.

---

**Étape 6 — Cliquez sur Ajouter → Ajouter un serveur MCP**

![Cliquez sur Ajouter puis Ajouter un serveur MCP](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Enregistrer**

![Formulaire de connexion à un MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **Streamable HTTP**, puis remplissez :

| Champ | Quoi saisir |
|---|---|
| **Nom** | `B1 Church` (ou le nom de votre choix) |
| **Type** | Cliquez sur **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable d'environnement du jeton Bearer** | Laisser vide |
| **En-têtes** | Cliquez sur **+ Ajouter un en-tête** → Clé : `Authorization` → Valeur : voir ci-dessous |

![Exemple rempli montrant Authorization dans Clé et la clé Bearer dans Valeur](/img/guides/chatgpt-mcp/08.png)

- **Clé :** `Authorization`
- **Valeur :** `Bearer cak_votreclé` -- le mot Bearer, un espace, puis votre clé

Cliquez sur **Enregistrer**.

Voilà ! Revenez dans une conversation et demandez par exemple *« Combien de personnes compte notre église ? »* : ChatGPT tirera la réponse directement de B1.

---

## Étape 1 — Créer une clé API dans B1 Admin {#step-1--create-an-api-key-in-b1-admin}

Chaque connexion à B1 utilise une clé API que vous créez. Cette clé identifie votre église, contrôle ce que ChatGPT peut voir, et peut être révoquée à tout moment.

1. Ouvrez **B1 Admin** et allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**.
3. Donnez un nom à la clé -- `ChatGPT` convient bien.
4. Sélectionnez les portées (permissions) que ChatGPT doit avoir. Un bon ensemble de départ pour un assistant en lecture seule :
   - `people:read`
   - `groups:read`
   - `attendance:read`
   - `donations:read`
5. Cliquez sur **Enregistrer**.
6. Copiez la clé complète qui apparaît -- elle commence par `cak_` et n'est affichée qu'**une seule fois**. Collez-la dans un endroit sûr.

:::tip
Si vous devez révoquer l'accès de ChatGPT, retournez dans **Paramètres → Développeur → Clés API** et supprimez la clé. L'accès prend fin immédiatement.
:::

---

## Voie A — Connecteur MCP de ChatGPT (recommandé) {#path-a--chatgpt-mcp-connector-recommended}

C'est la façon la plus simple de se connecter. ChatGPT dispose d'une boîte de dialogue intégrée « Se connecter à un MCP personnalisé » qui fonctionne directement avec le serveur MCP de B1 -- sans GPT personnalisé.

### Ce dont vous avez besoin {#what-you-need}

- Votre clé `cak_…` de l'étape 1

### Ouvrir le connecteur MCP dans ChatGPT {#open-the-mcp-connector-in-chatgpt}

Dans ChatGPT, allez dans **Paramètres → Plugins → MCPs** et cliquez sur **Ajouter → Ajouter un serveur MCP**.

### Remplir la boîte de dialogue {#fill-in-the-dialog}

Cliquez sur **Streamable HTTP**, puis utilisez ces valeurs :

| Champ | Valeur |
|---|---|
| **Nom** | `B1 Church` (ou le nom de votre choix) |
| **Type** | **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable d'environnement du jeton Bearer** | Laisser vide |
| **En-têtes** | Clé : `Authorization` / Valeur : `Bearer cak_votrepréfixe.votresecret` |

Pour le champ Valeur, saisissez le mot `Bearer`, un espace, puis collez votre clé -- le tout dans la même case. Exemple : `Bearer cak_prefixe.secret`.

Cliquez sur **Enregistrer**.

### Posez une question à ChatGPT {#ask-chatgpt-something}

Une fois connecté, posez simplement votre question en langage courant -- aucune commande spéciale n'est nécessaire :

- *« Combien de personnes compte notre église ? »*
- *« Qui s'est joint à nous au cours des 30 derniers jours ? »*
- *« Quels groupes sont actifs en ce moment ? »*
- *« Résume les dons de ce mois par fonds. »*

ChatGPT appellera B1 en arrière-plan et répondra à partir de vos données en temps réel.

---

## Voie B — GPT personnalisé avec Actions {#path-b--custom-gpt-with-actions}

Un GPT personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager -- elle ouvre un lien et commence à poser des questions sans aucune configuration de son côté. Il nécessite un compte ChatGPT Plus, Team ou Enterprise et environ 10 minutes.

### 1. Créer une clé API {#1-create-an-api-key}

Suivez l'étape 1 ci-dessus si ce n'est pas déjà fait.

### 2. Créer le GPT personnalisé {#2-build-the-custom-gpt}

1. Dans ChatGPT, cliquez sur votre profil → **Mes GPT** → **Créer un GPT**.
2. Passez à l'onglet **Configurer**, donnez un nom au GPT (par exemple « Assistant B1 ») et ajoutez des instructions :

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Faites défiler jusqu'à **Actions** → **Créer une nouvelle action** → **Authentification**.
   - **Type d'authentification :** Clé API
   - **Clé API :** collez votre clé `cak_…`
   - **Type d'authentification :** Bearer
   - Enregistrez.

4. Dans la zone **Schema**, collez ce modèle OpenAPI de départ :

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

5. Enregistrez l'action. Testez-la : *« combien de personnes y a-t-il dans l'église ? »* -- ChatGPT appelle `listPeople` et répond.
6. **Publiez** le GPT (Moi seulement / Toute personne ayant le lien / Organisation) et partagez le lien avec votre équipe.

### 3. L'utiliser {#3-use-it}

Toute personne disposant du lien peut poser des questions en langage naturel. Les portées de la clé s'appliquent toujours -- une clé en lecture seule refuse les écritures, quel que soit le contenu du schéma d'actions.

---

## Sécurité et limites {#safety-and-limits}

- **Isolement par église.** La clé API ne correspond qu'à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Limité par les permissions.** La clé ne porte que les portées que vous avez accordées. Retirer une portée (en supprimant et recréant la clé) coupe cet accès dès l'appel suivant.
- **Révocable instantanément.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès prend fin immédiatement.
- **Partager un GPT personnalisé partage les données.** Toute personne ayant accès au GPT peut voir tout ce que les portées de la clé permettent. Préférez des portées plus restreintes (par exemple, omettez `donations:read`) pour les GPT largement partagés.
- **Piste d'audit.** Toute modification effectuée via ChatGPT passe par le même journal d'audit que les actions de B1 Admin -- consultez-le dans **Paramètres → Journal d'audit**.

## Coût {#cost}

ChurchApps est gratuit et open source -- l'API que ChatGPT appelle fait partie de ce que votre église exploite déjà. OpenAI facture l'utilisation de ChatGPT selon ses propres forfaits. ChurchApps ne facture aucun coût par appel.

## Dépannage {#troubleshooting}

**Le connecteur MCP affiche « Unauthorized » ou une erreur 401 :** votre clé API est absente ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez que la clé dans l'argument `Authorization:Bearer` est la valeur `cak_…` complète, sans espaces superflus.

**ChatGPT affirme ne pas trouver certaines données :** la clé n'a peut-être pas les bonnes portées. Créez une nouvelle clé dans **Paramètres → Développeur → Clés API** avec les portées supplémentaires, puis mettez à jour le connecteur.

**La commande `npx` échoue :** Node.js n'est peut-être pas installé. Téléchargez-le et installez-le depuis [nodejs.org](https://nodejs.org), puis essayez d'enregistrer à nouveau le connecteur.

**L'action du GPT personnalisé renvoie 401 :** dans le panneau d'authentification de l'action, confirmez que **Type d'authentification : Bearer** est sélectionné et que la clé ne contient pas le mot `Bearer` (ChatGPT l'ajoute automatiquement).

**L'action du GPT personnalisé renvoie 403 :** la clé n'a pas la portée requise pour ce point d'accès. Créez une nouvelle clé avec les bonnes portées et mettez à jour le GPT.

**Le schéma d'action est rejeté :** ChatGPT exige OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML sur [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Liens connexes {#related}

- [Clés API](/docs/developer/api/api-keys) -- référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) -- détails du protocole et schémas des outils
- [Claude](./claude) -- même principe, pour les modèles d'Anthropic
- [Référence de l'API REST](/docs/developer/api/endpoints) -- chaque point d'accès qu'une action de GPT personnalisé peut appeler
