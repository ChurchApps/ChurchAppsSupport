---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT aux données de votre église dans B1 et posez-lui vos questions en langage courant : il répond à partir de vos fiches d'église en temps réel. Vous pouvez aussi lui demander de vous aider pour des tâches qui nécessiteraient plusieurs étapes dans B1 Admin.

**Quelques exemples de questions :**
- *« Montre-moi toutes les personnes venues la semaine dernière mais qui n'ont pas encore été affectées à un petit groupe »*
- *« Résume les dons de ce mois-ci par fonds »*
- *« Qui sont nos nouveaux membres et avons-nous déjà assuré leur suivi ? »*
- *« Je n'arrive pas à faire X dans B1, peux-tu me guider pas à pas ? »*

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **L'application de bureau ChatGPT** pour Mac ou Windows
- **Un abonnement ChatGPT payant** (Plus ou supérieur). Les comptes ChatGPT gratuits ne peuvent pas se connecter à B1.
- **Votre identifiant B1** avec l'autorisation de gérer les paramètres de l'église (nécessaire pour créer une clé). Vous ne l'avez pas ? Demandez à l'administrateur B1 de votre église.

</div>

:::tip Recommandé : essayez d'abord Claude, c'est gratuit
[Claude](./claude) se connecte à B1 avec son **forfait gratuit** et se configure en moins de 3 minutes : il suffit d'ajouter B1 comme connecteur et de vous connecter avec votre compte B1. Aucune clé n'est nécessaire. C'est la façon la plus simple pour votre église d'essayer l'IA avec B1 avant de payer quoi que ce soit.
:::

## Configuration

Les écrans peuvent légèrement différer selon votre version de ChatGPT.

---

**Étape 1 — Créez votre clé B1**

La clé permet à ChatGPT d'accéder aux données *de votre* église dans B1 : elle joue le rôle d'un mot de passe réservé à ChatGPT.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et accédez à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **API Keys**, cliquez sur **New API Key** et nommez-la `ChatGPT`.
3. **Scopes :** cochez ce que ChatGPT est autorisé à faire. Chaque domaine dispose d'une case **read** (consultation uniquement) et d'une case **write** (modification). Vous ne savez pas quoi choisir ? Cochez seulement les cases **read** pour commencer.
4. Cliquez sur **Save**, puis sur **Copy** pour copier la clé (elle commence par `cak_`). Elle n'est affichée qu'une seule fois.

---

**Étape 2 — Cliquez sur votre nom, en bas à gauche de ChatGPT**

![Cliquez sur le nom de votre profil](/img/guides/chatgpt-mcp/01.png)

---

**Étape 3 — Cliquez sur Settings**

![Cliquez sur Settings dans le menu](/img/guides/chatgpt-mcp/02.png)

---

**Étape 4 — Cliquez sur Plugins dans la barre latérale gauche**

![Cliquez sur Plugins sous Integrations](/img/guides/chatgpt-mcp/03.png)

---

**Étape 5 — Cliquez sur l'onglet MCPs**

![Cliquez sur l'onglet MCPs](/img/guides/chatgpt-mcp/04.png)

Vous verrez ici les serveurs MCP que vous avez déjà ajoutés.

---

**Étape 6 — Cliquez sur Add → Add MCP server**

![Cliquez sur Add puis sur Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Save**

![Formulaire de connexion à un MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **Streamable HTTP**, puis renseignez :

| Champ | Ce qu'il faut saisir |
|---|---|
| **Name** | `B1 Church` (ou tout autre nom de votre choix) |
| **Type** | Cliquez sur **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Laissez vide |
| **Headers** | Cliquez sur **+ Add header** → Key : `Authorization` → Value : voir ci-dessous |

![Exemple rempli montrant Authorization dans Key et la clé Bearer dans Value](/img/guides/chatgpt-mcp/08.png)

- **Key :** `Authorization`
- **Value :** `Bearer cak_votreclé` — le mot Bearer, un espace, puis votre clé

Cliquez sur **Save**.

C'est tout ! Retournez dans une conversation et posez une question comme *« Combien de personnes compte notre église ? »* : ChatGPT ira chercher la réponse directement dans B1.

---

## Est-ce sûr ?

- ChatGPT ne peut voir que les données **de votre église**.
- Il ne peut faire que ce que votre clé autorise : une clé dont seules les cases **read** sont cochées peut consulter les données, mais ne peut jamais rien modifier.
- Pour la désactiver, supprimez la clé dans B1 Admin sous **Paramètres → Développeur**. L'accès cesse immédiatement.

## Quel est le coût ?

La connexion à B1 est gratuite : elle fait partie de ChurchApps. ChatGPT nécessite un abonnement payant (Plus ou supérieur) pour se connecter ; consultez la grille tarifaire d'OpenAI.

## Détails techniques

La suite de cette page s'adresse aux utilisateurs techniques et aux assistants d'IA. Le serveur MCP de B1 se trouve à `https://api.churchapps.org/mcp` (Streamable HTTP) et reçoit la clé API sous la forme d'un en-tête `Authorization: Bearer cak_…`. Consultez la [documentation de référence du serveur MCP pour développeurs](/docs/developer/api/mcp).

### GPT personnalisé avec Actions

Un GPT personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager : il suffit d'ouvrir un lien et de commencer à poser des questions, sans aucune configuration de leur côté. Il nécessite un compte ChatGPT Plus, Team ou Enterprise et environ 10 minutes.

#### 1. Créer une clé API

Suivez l'étape 1 de Configuration ci-dessus si ce n'est pas déjà fait.

#### 2. Créer le GPT personnalisé

1. Dans ChatGPT, cliquez sur votre profil → **My GPTs** → **Create a GPT**.
2. Passez à l'onglet **Configure**, donnez un nom au GPT (par exemple « Assistant B1 ») et ajoutez les instructions :

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Faites défiler jusqu'à **Actions** → **Create new action** → **Authentication**.
   - **Authentication type :** API Key
   - **API Key :** collez votre clé `cak_…`
   - **Auth Type :** Bearer
   - Enregistrez.

4. Dans la zone **Schema**, collez cette spécification OpenAPI de départ :

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

5. Enregistrez l'action. Testez-la : *« combien de personnes compte l'église ? »* — ChatGPT appelle `listPeople` et répond.
6. **Publiez** le GPT (Only me / Anyone with link / Organization) et partagez le lien avec votre équipe.

#### 3. Utilisation

Toute personne disposant du lien peut poser des questions en langage courant. Les autorisations de la clé s'appliquent toujours : une clé en lecture seule refuse toute modification, quel que soit le contenu du schéma d'actions.

---

### Sécurité et limites

- **Isolation par église.** La clé API ne correspond qu'à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Limité par les autorisations.** La clé ne dispose que des autorisations que vous avez accordées. Supprimer une autorisation (en supprimant puis recréant la clé) coupe cet accès dès l'appel suivant.
- **Révocable immédiatement.** Supprimez la clé dans **Paramètres → Développeur → API Keys** et l'accès prend fin immédiatement.
- **Partager un GPT personnalisé revient à partager les données.** Toute personne ayant accès au GPT peut voir tout ce que les autorisations de la clé permettent. Préférez des autorisations plus restreintes (par exemple, omettez `donations:read`) pour les GPT largement partagés.
- **Piste d'audit.** Toute modification effectuée via ChatGPT passe par le même journal d'audit que les actions de B1 Admin : retrouvez-les sous **Paramètres → Audit Log**.

### Dépannage

**Le connecteur MCP affiche « Unauthorized » ou une erreur 401 :** votre clé API est absente ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez l'en-tête **Authorization** : la valeur doit être le mot `Bearer`, un espace, puis la clé `cak_…` complète, sans espaces superflus.

**ChatGPT indique qu'il ne trouve pas certaines données :** la clé ne dispose peut-être pas des bonnes autorisations. Créez une nouvelle clé dans **Paramètres → Développeur → API Keys** avec les autorisations supplémentaires et mettez à jour le connecteur.

**L'action du GPT personnalisé renvoie 401 :** dans le panneau d'authentification de l'action, vérifiez que **Auth Type: Bearer** est sélectionné et que la clé ne contient pas le mot `Bearer` (ChatGPT l'ajoute automatiquement).

**L'action du GPT personnalisé renvoie 403 :** la clé ne dispose pas de l'autorisation nécessaire pour ce point de terminaison. Créez une nouvelle clé avec les bonnes autorisations et mettez à jour le GPT.

**Le schéma d'action est rejeté :** ChatGPT exige OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML sur [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Voir aussi

- [API Keys](/docs/developer/api/api-keys) — référence complète des autorisations
- [MCP Server (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas des outils
- [Claude](./claude) — même principe, pour les modèles d'Anthropic
- [Référence de l'API REST](/docs/developer/api/endpoints) — chaque point de terminaison que peut appeler une action de GPT personnalisé
