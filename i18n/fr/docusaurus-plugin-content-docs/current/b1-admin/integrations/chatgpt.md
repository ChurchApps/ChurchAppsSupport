---
title: "ChatGPT"
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT aux données B1 de votre église et posez-lui des questions en langage courant — il vous répond à partir des dossiers à jour de votre église. Vous pouvez aussi lui demander de l'aide pour des tâches qui prendraient plusieurs étapes dans B1 Admin.

**Quelques questions que vous pouvez poser :**
- *"Montre-moi tous ceux qui ont assisté la semaine dernière mais n'ont pas été assignés à un petit groupe"*
- *"Résume les dons de ce mois par fonds"*
- *"Qui sont nos nouveaux membres et leur avons-nous fait un suivi ?"*
- *"Je ne sais pas comment faire X dans B1 — peux-tu me guider étape par étape ?"*

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **L'application de bureau ChatGPT** pour Mac ou Windows
- **Un forfait ChatGPT payant** (Plus ou supérieur). Les comptes ChatGPT gratuits ne peuvent pas se connecter à B1.
- **Votre identifiant B1** avec la permission de gérer les paramètres de l'église (nécessaire pour créer une clé). Vous ne l'avez pas ? Demandez à l'administrateur B1 de votre église.

</div>

:::tip Recommandé : essayez d'abord Claude — c'est gratuit
[Claude](./claude) se connecte à B1 avec son **forfait gratuit** et se configure en moins de 3 minutes — ajoutez simplement B1 comme connecteur et connectez-vous avec votre compte B1. Aucune clé n'est nécessaire. C'est le moyen le plus simple pour votre église d'essayer l'IA avec B1 avant de payer quoi que ce soit.
:::

## Configuration

Les écrans peuvent être légèrement différents dans votre version de ChatGPT.

---

**Étape 1 — Créez votre clé B1**

La clé est ce qui permet à ChatGPT d'accéder au B1 de *votre* église — voyez-la comme un mot de passe réservé à ChatGPT.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et allez à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API** et nommez-la `ChatGPT`.
3. **Portées :** cochez ce que ChatGPT a le droit de faire. Chaque domaine a une case **read** (consulter uniquement) et une case **write** (apporter des modifications). Vous hésitez ? Cochez seulement les cases **read** pour commencer.
4. Cliquez sur **Enregistrer**, puis sur **Copier** pour copier la clé (elle commence par `cak_`). Elle n'est affichée qu'une seule fois.

---

**Étape 2 — Cliquez sur votre nom dans le coin inférieur gauche de ChatGPT**

![Cliquez sur le nom de votre profil](/img/guides/chatgpt-mcp/01.png)

---

**Étape 3 — Cliquez sur Settings (Paramètres)**

![Cliquez sur Settings dans le menu](/img/guides/chatgpt-mcp/02.png)

---

**Étape 4 — Cliquez sur Plugins dans la barre latérale gauche**

![Cliquez sur Plugins sous Intégrations](/img/guides/chatgpt-mcp/03.png)

---

**Étape 5 — Cliquez sur l'onglet MCPs**

![Cliquez sur l'onglet MCPs](/img/guides/chatgpt-mcp/04.png)

Vous verrez ici tous les serveurs MCP que vous avez déjà ajoutés.

---

**Étape 6 — Cliquez sur Add → Add MCP server (Ajouter → Ajouter un serveur MCP)**

![Cliquez sur Add puis sur Add MCP server](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Save (Enregistrer)**

![Formulaire de connexion à un MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **Streamable HTTP**, puis remplissez :

| Champ | Ce qu'il faut entrer |
|---|---|
| **Name** (Nom) | `B1 Church` (ou n'importe quel nom de votre choix) |
| **Type** | Cliquez sur **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Bearer token env var** | Laissez vide |
| **Headers** (En-têtes) | Cliquez sur **+ Add header** → Key : `Authorization` → Value : voir ci-dessous |

![Exemple rempli affichant Authorization dans Key et la clé Bearer dans Value](/img/guides/chatgpt-mcp/08.png)

- **Key :** `Authorization`
- **Value :** `Bearer cak_votrecle` — le mot Bearer, un espace, puis votre clé

Cliquez sur **Save** (Enregistrer).

C'est tout ! Retournez dans une conversation et demandez quelque chose comme *"Combien de personnes compte notre église ?"* et ChatGPT récupérera la réponse directement depuis B1.

---

## Est-ce sécurisé ?

- ChatGPT ne peut voir que les données de **votre église**.
- Il ne peut faire que ce que votre clé autorise — une clé dont seules les cases **read** sont cochées peut consulter mais jamais rien modifier.
- Pour le désactiver, supprimez la clé dans B1 Admin sous **Paramètres → Développeur**. L'accès s'arrête immédiatement.

## Combien ça coûte ?

La connexion B1 est gratuite — elle fait partie de ChurchApps. ChatGPT nécessite un forfait payant (Plus ou supérieur) pour se connecter ; consultez les tarifs d'OpenAI.

## Détails techniques

Le reste de cette page s'adresse aux utilisateurs techniques et aux assistants IA. Le serveur MCP de B1 se trouve à `https://api.churchapps.org/mcp` (Streamable HTTP) et reçoit la clé API sous forme d'en-tête `Authorization: Bearer cak_…`. Voir la [référence développeur du serveur MCP](/docs/developer/api/mcp).

### GPT personnalisé avec Actions

Un GPT personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager — ses membres ouvrent un lien et commencent à poser des questions sans aucune configuration de leur côté. Cela nécessite un compte ChatGPT Plus, Team ou Enterprise et environ 10 minutes.

#### 1. Créer une clé API

Suivez l'étape 1 de la Configuration ci-dessus si vous ne l'avez pas déjà fait.

#### 2. Construire le GPT personnalisé

1. Dans ChatGPT, cliquez sur votre profil → **My GPTs** (Mes GPTs) → **Create a GPT** (Créer un GPT).
2. Passez à l'onglet **Configure** (Configurer), donnez un nom au GPT (p. ex. "Assistant B1") et ajoutez des instructions :

   ```
   You help church staff query their B1 records. Use the B1 API actions to
   look up people, groups, attendance, donations, and content. Always scope
   answers to data the user has permission to see. Be concise.
   ```

3. Faites défiler jusqu'à **Actions** → **Create new action** (Créer une nouvelle action) → **Authentication** (Authentification).
   - **Authentication type :** API Key
   - **API Key :** collez votre clé `cak_…`
   - **Auth Type :** Bearer
   - Enregistrez.

4. Dans la zone **Schema** (Schéma), collez cette spécification OpenAPI de départ :

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

5. Enregistrez l'action. Testez-la : *"combien de personnes y a-t-il dans l'église ?"* — ChatGPT appelle `listPeople` et répond.
6. **Publiez** le GPT avec **Publish** (Only me / Anyone with link / Organization) et partagez le lien avec votre équipe.

#### 3. L'utiliser

Toute personne disposant du lien peut poser des questions en langage naturel. Les portées de la clé s'appliquent toujours — une clé en lecture seule refuse les écritures, quoi que dise le schéma d'action.

---

### Sécurité et limites

- **Isolation par église.** La clé API correspond à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Limité par les permissions.** La clé ne porte que les portées que vous avez accordées. Retirer une portée (en supprimant et en recréant la clé) coupe cet accès dès l'appel suivant.
- **Révocable instantanément.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès prend fin immédiatement.
- **Partager un GPT personnalisé, c'est partager les données.** Tous ceux qui ont accès au GPT peuvent voir ce que les portées de la clé permettent. Préférez des portées plus restreintes (p. ex. omettez `donations:read`) pour les GPTs largement partagés.
- **Piste d'audit.** Toutes les modifications effectuées via ChatGPT passent par le même journal d'audit que les actions B1 Admin — retrouvez-les sous **Paramètres → Journal d'audit**.

### Dépannage

**Le connecteur MCP indique "Unauthorized" ou affiche une erreur 401 :** votre clé API est manquante ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez l'en-tête **Authorization** : la valeur doit être le mot `Bearer`, un espace, puis la clé complète `cak_…` sans espaces supplémentaires.

**ChatGPT dit qu'il ne trouve pas certaines données :** la clé n'a peut-être pas les bonnes portées. Créez une nouvelle clé dans **Paramètres → Développeur → Clés API** avec les portées supplémentaires et mettez à jour le connecteur.

**L'action du GPT personnalisé renvoie 401 :** dans le panneau d'authentification de l'action, vérifiez que **Auth Type: Bearer** est sélectionné et que la clé n'inclut pas le mot `Bearer` (ChatGPT l'ajoute automatiquement).

**L'action du GPT personnalisé renvoie 403 :** la clé n'a pas la portée pour ce point de terminaison. Créez une nouvelle clé avec les bonnes portées et mettez à jour le GPT.

**Le schéma d'action est rejeté :** ChatGPT exige OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML sur [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Connexes

- [Clés API](/docs/developer/api/api-keys) — référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas d'outils
- [Claude](./claude) — la même idée, pour les modèles d'Anthropic
- [Référence API REST](/docs/developer/api/endpoints) — chaque point de terminaison qu'une action de GPT personnalisé peut appeler
