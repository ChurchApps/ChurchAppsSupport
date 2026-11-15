---
title: "ChatGPT"
description: "Connectez ChatGPT aux données B1 de votre église avec une clé API pour poser des questions en langage courant sur les personnes, les dons et la fréquentation dans B1 Admin."
---

# ChatGPT

<div class="article-intro">

Connectez ChatGPT aux données B1 de votre église et posez-lui vos questions en langage courant : il répond à partir de vos dossiers d'église en temps réel. Vous pouvez aussi lui demander de vous aider pour des tâches qui exigeraient plusieurs étapes dans B1 Admin.

**Quelques exemples de questions :**
- *« Montre-moi toutes les personnes présentes la semaine dernière qui n'ont pas encore été affectées à un petit groupe »*
- *« Résume les dons de ce mois-ci par fonds »*
- *« Qui sont nos nouveaux membres, et leur avons-nous déjà fait un suivi ? »*
- *« Je n'arrive pas à faire X dans B1 — peux-tu me guider pas à pas ? »*

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **L'application de bureau ChatGPT** pour Mac ou Windows
- **Un abonnement ChatGPT payant** (Plus ou supérieur). Les comptes ChatGPT gratuits ne peuvent pas se connecter à B1.
- **Votre identifiant B1** avec l'autorisation de gérer les paramètres de l'église (nécessaire pour créer une clé). Vous ne l'avez pas ? Demandez à l'administrateur B1 de votre église.

</div>

:::tip Recommandé : essayez d'abord Claude — c'est gratuit
[Claude](./claude.md) se connecte à B1 avec son **forfait gratuit** et se configure en moins de 3 minutes : il suffit d'ajouter B1 comme connecteur et de vous connecter avec votre compte B1. Aucune clé n'est nécessaire. C'est la façon la plus simple pour votre église d'essayer l'IA avec B1 avant de payer quoi que ce soit.
:::

## Configuration {#set-it-up}

Les écrans peuvent légèrement différer selon votre version de ChatGPT.

---

**Étape 1 — Créer votre clé B1**

La clé est ce qui permet à ChatGPT d'accéder aux données B1 de *votre* église — pensez-y comme à un mot de passe réservé à ChatGPT.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et accédez à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API** et nommez-la `ChatGPT`.
3. **Autorisations :** cochez ce que ChatGPT peut faire. Chaque domaine comporte une case **lecture** (consultation uniquement) et une case **écriture** (modification). Pas sûr ? Cochez seulement les cases **lecture** pour commencer.
4. Cliquez sur **Enregistrer**, puis sur **Copier** la clé (elle commence par `cak_`). Elle n'est affichée qu'une seule fois.

---

**Étape 2 — Cliquez sur votre nom en bas à gauche de ChatGPT**

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

![Cliquez sur Ajouter puis sur Ajouter un serveur MCP](/img/guides/chatgpt-mcp/06.png)

---

**Étape 7 — Remplissez le formulaire et cliquez sur Enregistrer**

![Formulaire de connexion à un MCP personnalisé](/img/guides/chatgpt-mcp/07.png)

Cliquez sur **Streamable HTTP**, puis remplissez :

| Champ | Ce qu'il faut saisir |
|---|---|
| **Nom** | `B1 Church` (ou tout autre nom de votre choix) |
| **Type** | Cliquez sur **Streamable HTTP** |
| **URL** | `https://api.churchapps.org/mcp` |
| **Variable d'environnement du jeton Bearer** | Laissez vide |
| **En-têtes** | Cliquez sur **+ Ajouter un en-tête** → Clé : `Authorization` → Valeur : voir ci-dessous |

![Exemple rempli montrant Authorization dans la clé et la clé Bearer dans la valeur](/img/guides/chatgpt-mcp/08.png)

- **Clé :** `Authorization`
- **Valeur :** `Bearer cak_yourkey` — le mot Bearer, un espace, puis votre clé

Cliquez sur **Enregistrer**.

Voilà ! Revenez dans une conversation et posez une question du type *« Combien de personnes compte notre église ? »* : ChatGPT tirera la réponse directement de B1.

---

## Est-ce sécuritaire ? {#is-it-safe}

- ChatGPT ne peut voir que les données de **votre église**.
- Il ne peut faire que ce que votre clé autorise — une clé avec uniquement des cases **lecture** cochées peut consulter les données, mais ne peut jamais rien modifier.
- Pour la désactiver, supprimez la clé dans B1 Admin sous **Paramètres → Développeur**. L'accès s'arrête immédiatement.

## Quel est le coût ? {#what-does-it-cost}

La connexion à B1 est gratuite : elle fait partie de ChurchApps. ChatGPT exige un forfait payant (Plus ou supérieur) pour se connecter ; consultez la tarification d'OpenAI.

## Détails techniques {#technical-details}

La suite de cette page s'adresse aux utilisateurs techniques et aux assistants IA. Le serveur MCP de B1 se trouve à l'adresse `https://api.churchapps.org/mcp` (Streamable HTTP) et accepte la clé API sous forme d'en-tête `Authorization: Bearer cak_…`. Consultez la [référence du serveur MCP pour développeurs](/docs/developer/api/mcp).

### GPT personnalisé avec actions {#custom-gpt-with-actions}

Un GPT personnalisé vous permet de créer un assistant dédié que toute votre équipe peut partager : il suffit d'ouvrir un lien et de commencer à poser des questions, sans aucune configuration de leur côté. Il nécessite un compte ChatGPT Plus, Team ou Enterprise et environ 10 minutes.

#### 1. Créer une clé API {#1-create-an-api-key}

Suivez l'étape 1 de la section Configuration ci-dessus si ce n'est pas déjà fait.

#### 2. Créer le GPT personnalisé {#2-build-the-custom-gpt}

1. Dans ChatGPT, cliquez sur votre profil → **Mes GPT** → **Créer un GPT**.
2. Passez à l'onglet **Configurer**, donnez un nom au GPT (par exemple « Assistant B1 ») et ajoutez les instructions :

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

4. Dans la zone **Schéma**, collez ce schéma OpenAPI de départ :

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
         summary: List everyone in the church
         responses:
           "200":
             description: OK
     /membership/people/search:
       get:
         operationId: searchPeople
         summary: Find people by name, or by exact email
         parameters:
           - in: query
             name: term
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
         summary: List donations for one person, or between two dates (send both startDate and endDate as YYYY-MM-DD)
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
     /attendance/attendancerecords/search:
       get:
         operationId: listAttendance
         summary: List attendance records between two dates, optionally for one campus, service, service time, or group
         parameters:
           - in: query
             name: startDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: endDate
             required: true
             schema: { type: string, format: date }
           - in: query
             name: campusId
             schema: { type: string }
           - in: query
             name: serviceTimeId
             schema: { type: string }
           - in: query
             name: groupId
             schema: { type: string }
         responses:
           "200":
             description: OK
   ```

5. Enregistrez l'action. Testez-la : *« combien de personnes y a-t-il dans l'église ? »* — ChatGPT appelle `listPeople` et répond.
6. **Publiez** le GPT (Moi uniquement / Toute personne disposant du lien / Organisation) et partagez le lien avec votre équipe.

#### 3. Utiliser le GPT {#3-use-it}

Toute personne disposant du lien peut poser des questions en langage courant. Les autorisations de la clé s'appliquent toujours : une clé en lecture seule refuse les modifications, quel que soit le contenu du schéma d'actions.

---

### Sécurité et limites {#safety-and-limits}

- **Isolement par église.** La clé API ne correspond qu'à une seule église. ChatGPT ne peut pas voir les données d'autres églises.
- **Limité par les autorisations.** La clé ne comporte que les autorisations que vous avez accordées. Retirer une autorisation (en supprimant puis recréant la clé) coupe cet accès dès l'appel suivant.
- **Révocable immédiatement.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès prend fin immédiatement.
- **Partager un GPT personnalisé revient à partager les données.** Toute personne ayant accès au GPT peut voir tout ce que les autorisations de la clé permettent. Privilégiez des autorisations plus restreintes (par exemple, omettez `donations:read`) pour les GPT largement partagés.
- **Piste d'audit.** Toute modification effectuée via ChatGPT passe par le même journal d'audit que les actions de B1 Admin — retrouvez-les sous **Paramètres → Journal d'audit**.

### Dépannage {#troubleshooting}

**Le connecteur MCP indique « Unauthorized » ou affiche une erreur 401 :** votre clé API est absente ou incorrecte. Ouvrez les paramètres du connecteur et vérifiez l'en-tête **Authorization** : la valeur doit être le mot `Bearer`, un espace, puis la clé `cak_…` complète, sans espace superflu.

**ChatGPT indique qu'il ne trouve pas certaines données :** la clé n'a peut-être pas les bonnes autorisations. Créez une nouvelle clé dans **Paramètres → Développeur → Clés API** avec les autorisations supplémentaires, puis mettez à jour le connecteur.

**L'action du GPT personnalisé renvoie une erreur 401 :** dans le panneau d'authentification de l'action, vérifiez que **Type d'authentification : Bearer** est sélectionné et que la clé ne contient pas le mot `Bearer` (ChatGPT l'ajoute automatiquement).

**L'action du GPT personnalisé renvoie une erreur 403 :** la clé n'a pas l'autorisation nécessaire pour ce point de terminaison. Créez une nouvelle clé avec les bonnes autorisations et mettez à jour le GPT.

**Le schéma d'action est refusé :** ChatGPT exige OpenAPI 3.1 avec au moins une entrée `paths` et une URL `servers`. Validez le YAML sur [editor.swagger.io](https://editor.swagger.io) avant de le coller.

## Voir aussi {#related}

- [Clés API](/docs/developer/api/api-keys) — référence complète des autorisations
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas des outils
- [Claude](./claude.md) — même principe, pour les modèles d'Anthropic
- [Référence de l'API REST](/docs/developer/api/endpoints) — chaque point de terminaison que peut appeler une action de GPT personnalisé
