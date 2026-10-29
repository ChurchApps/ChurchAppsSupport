---
title: "Claude"
---

# Claude

<div class="article-intro">

Posez des questions à Claude sur votre église en français courant, et il répond à partir de vos données B1 -- y compris vos leçons FreePlay et vos salles de classe. Des questions comme *« combien de visiteurs de première fois sont venus dimanche ? »* ou *« qui a rejoint un petit groupe ce mois-ci ? »* -- ou demandez-lui d'effectuer des tâches, comme *« ajoute une nouvelle page à notre site web appelée Événements. »* La configuration prend moins de 3 minutes et vous n'avez besoin d'aucune compétence technique ni d'aucun logiciel à installer.

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **Un compte Claude.** Le **forfait gratuit fonctionne** -- une bonne façon de l'essayer. Les comptes gratuits ont toutefois une limite quotidienne de messages, et la recherche d'informations dans B1 consomme rapidement des messages ; si vous l'utilisez régulièrement, nous recommandons **Claude Pro** (environ 20 $ US par mois).
- **Votre identifiant B1** -- le même que celui que vous utilisez pour B1 Admin.

</div>

:::tip Recommandé -- gratuit pour essayer
Claude est la façon la plus simple de connecter B1 à l'IA, et il fonctionne avec le **forfait gratuit** de Claude -- une façon parfaite pour votre église de l'essayer avant de payer quoi que ce soit.
:::

Il existe deux façons de vous connecter. **L'option 1 est la plus simple** -- aucune clé et aucune installation.

## Option 1 -- Se connecter avec B1 (le plus simple)

Fonctionne sur le site web de Claude, l'application de bureau Claude et l'application mobile Claude -- configurez-le une fois et il sera disponible partout.

### Étape 1 -- Ouvrir les paramètres des connecteurs de Claude

1. Rendez-vous sur [claude.ai](https://claude.ai) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur votre nom dans le coin inférieur gauche, puis sur **Paramètres** → **Connecteurs**.

### Étape 2 -- Ajouter B1

1. Cliquez sur **Ajouter**, puis sur **Ajouter un connecteur personnalisé**.
2. **Nom :** saisissez `B1`.
3. **URL :** collez `https://api.churchapps.org/mcp`
4. Laissez les autres options telles quelles et cliquez sur **Ajouter**.

### Étape 3 -- Se connecter à B1

1. Cliquez sur **Connecter**. Une page de connexion B1 s'ouvre.
2. Connectez-vous avec votre compte B1. Si vous appartenez à plus d'une église, vérifiez que la bonne église est affichée en haut.
3. B1 indique ce que Claude demande de faire et confirme que vous serez renvoyé sur **claude.ai**. Cliquez sur **Autoriser**.

Vous êtes de retour dans Claude, et B1 s'affiche comme connecté.

### Étape 4 -- Posez une question

Ouvrez une **nouvelle conversation** et essayez :

- *« Combien de personnes font partie de notre église ? »*
- *« Liste nos groupes actifs. »*
- *« Résume les dons de ce mois-ci par fonds. »*
- *« Qui a rejoint l'église au cours des 30 derniers jours ? »*

La première fois, Claude vous demande la permission d'utiliser B1 -- cliquez sur **Autoriser**.

## Option 2 -- Extension de bureau avec une clé B1

Utilisez cette option si vous préférez donner à Claude une clé avec des autorisations limitées (par exemple, lecture seule). Elle fonctionne dans l'application de bureau Claude pour Mac ou Windows, et vous devez avoir l'autorisation de gérer les paramètres de l'église dans B1 pour créer une clé.

### Étape 1 -- Obtenir l'application Claude

Téléchargez l'application Claude depuis [claude.com/download](https://claude.com/download), installez-la, ouvrez-la et connectez-vous.

### Étape 2 -- Créer votre clé B1

La clé permet à Claude d'accéder au B1 *de votre* église -- pensez-y comme à un mot de passe réservé à Claude.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et rendez-vous à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API**.
3. **Nom :** saisissez `Claude`.
4. **Portées :** cochez ce que Claude peut faire. Chaque domaine comporte une case **lecture** (consultation seulement) et une case **écriture** (apporter des modifications). Vous ne savez pas ? Cochez uniquement les cases **lecture** pour commencer -- vous pourrez créer plus tard une nouvelle clé avec davantage d'autorisations.
5. Cliquez sur **Enregistrer**, puis sur **Copier** la clé. Elle n'est affichée qu'une seule fois, passez donc directement à l'étape 3.

### Étape 3 -- Ajouter B1 à Claude

1. [Téléchargez l'extension B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Double-cliquez** sur le fichier téléchargé (`b1-churchapps.mcpb`). Claude s'ouvre et affiche **B1 (ChurchApps)**.
3. Cliquez sur **Installer**.
4. Lorsqu'elle vous demande votre **clé API B1**, collez la clé de l'étape 2 et enregistrez.
5. **Quittez complètement Claude** (Mac : **Cmd+Q** · Windows : faites un clic droit sur l'icône de Claude dans la barre des tâches → **Quitter**) puis rouvrez-le.

Si le double-clic n'ouvre pas Claude, allez dans **Paramètres → Extensions → Paramètres avancés → Installer l'extension…** dans Claude et choisissez le fichier téléchargé. Ensuite, ouvrez une nouvelle conversation et posez une question.

:::tip Vous avez déjà installé l'extension ?
Il n'y a rien à faire -- FreePlay fonctionne avec la même connexion. La seule exception est la version 1.1.0, qui demandait un e-mail et un mot de passe B1 : téléchargez et réinstallez l'extension pour la mettre à jour. Votre clé reste valide.
:::

## Est-ce sécuritaire ?

- Claude ne peut voir que les données **de votre église**.
- **Connecté (Option 1) :** Claude ne peut jamais faire plus que ce que peut faire votre propre connexion B1. La page de connexion B1 énumère tout ce que Claude peut faire avant que vous cliquiez sur **Autoriser**.
- **Avec une clé (Option 2) :** Claude ne peut faire que ce que la clé permet dans B1 -- une clé dont seules les cases **lecture** sont cochées peut consulter, mais ne peut jamais rien modifier. FreePlay fonctionne de la même façon, avec la même clé.
- **Pour le désactiver :** dans B1 Admin, allez dans **Paramètres → Développeur** et révoquez l'application sous **Applications connectées** (Option 1) ou supprimez la clé sous **Clés API** (Option 2). L'accès cesse immédiatement. Vous pouvez aussi cliquer sur **Déconnecter** sur le connecteur B1 dans Claude.

## Quel est le coût ?

La connexion B1 est gratuite -- elle fait partie de ChurchApps. Claude lui-même a un forfait gratuit ; Claude Pro (environ 20 $ US par mois) vous donne beaucoup plus d'utilisation. Consultez [claude.com/pricing](https://claude.com/pricing).

## Détails techniques

Le reste de cette page s'adresse aux utilisateurs techniques et aux assistants IA : portées, autres façons de se connecter et fonctionnement.

### Portées

Claude communique avec B1 par l'intermédiaire du **serveur Model Context Protocol (MCP)** intégré à l'API B1 (`https://api.churchapps.org/mcp`). Chaque appel passe par les mêmes règles d'authentification, d'autorisation et de limitation à l'église que les requêtes provenant de B1 Admin. Claude est limité aux **autorisations et portées** de la clé API, et ne peut pas accéder aux webhooks, aux points de terminaison OAuth d'administration ni aux autres chemins réservés à l'opérateur.

Ensembles de portées de départ courants :

- **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lecture + ajout de notes / tâches :** ajoutez `people:write`
- **Assistant opérationnel complet :** ajoutez les portées `:write` correspondantes que vous souhaitez

Une clé `donations:read` permet à Claude de résumer les dons, mais elle ne peut pas enregistrer un don. Une clé `people:write` peut ajouter une personne, mais ne peut pas voir les dons. Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que permet chaque portée.

### Autres façons de se connecter

#### Claude Code (CLI)

Dans un terminal :

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans n'importe quelle session Claude Code, tapez `/mcp` pour confirmer que le serveur `b1` est connecté, puis posez à Claude n'importe quelle question sur votre église.

#### Claude Desktop -- configuration manuelle (avancé)

Si vous préférez ne pas utiliser l'extension, modifiez le fichier de configuration de Claude Desktop :

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

Ajoutez une entrée de serveur `b1` qui se connecte à B1 via `mcp-remote` (nécessite [Node.js](https://nodejs.org)) :

```json
{
  "mcpServers": {
    "b1": {
      "command": "npx",
      "args": [
        "-y", "mcp-remote",
        "https://api.churchapps.org/mcp",
        "--header", "Authorization:Bearer cak_<prefix>.<secret>"
      ]
    }
  }
}
```

Redémarrez Claude Desktop. Le menu des connecteurs dans la zone de saisie du chat affichera `b1` avec ses outils.

#### Claude.ai (web) -- connecteur personnalisé

Voir l'**Option 1** ci-dessus. Le connecteur utilise OAuth 2.1 : Claude découvre le serveur d'autorisation de B1 à partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, s'enregistre lui-même avec l'enregistrement dynamique de client, et se connecte avec PKCE. Sur les forfaits Team et Enterprise, un propriétaire peut devoir d'abord ajouter le connecteur pour l'organisation. Claude ne demande pas de portées précises ; la page de consentement propose donc tout ce à quoi le compte B1 connecté a accès. Révoquez-le sous **Paramètres → Développeur → Applications connectées** dans B1 Admin.

### Fonctionnement

L'API B1 expose un point de terminaison MCP unique à `/mcp`. Claude s'y connecte, s'authentifie avec votre clé `cak_…` et obtient accès à quatre outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Liste les points de terminaison REST que Claude peut appeler, filtrables par chemin. Sert à la découverte. |
| `describe_endpoint` | Renvoie un bref résumé et un exemple de requête/réponse pour un point de terminaison précis. |
| `api_call` | Invoque réellement un point de terminaison REST en tant qu'utilisateur authentifié. |
| `describe_page_builder` | Un guide pour créer et modifier les pages du site web de votre église, que Claude lit avant de travailler sur le contenu du site. |

Il s'agit de la même surface `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. qu'utilise votre B1Admin -- chaque règle d'autorisation s'applique de manière identique. Les points de terminaison de FreePlay (lessons.church) sont listés sous `/lessons/*` ; les appels de Claude vers eux sont transmis à FreePlay en tant que même utilisateur, avec les mêmes autorisations.

### Sécurité et limites

- **Isolement par église.** La clé API correspond à une seule église. Claude n'a aucun moyen de voir les données d'autres églises.
- **Limité par les autorisations.** Si vous retirez une autorisation à la personne qui a créé la clé dans B1Admin, Claude la perd dès l'appel suivant -- instantanément.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de Claude prend fin immédiatement.
- **Liste de blocage.** Les webhooks des fournisseurs, les points de terminaison d'administration des clients OAuth et la route `apiEmails` réservée à l'opérateur ne sont pas accessibles via MCP.
- **Limite de taille des réponses.** Une seule réponse d'outil est limitée à 64 Ko pour que les longues listes ne saturent pas le contexte de Claude -- Claude restreindra alors la requête avec des filtres lorsque cela se produit.
- **Piste d'audit.** Les modifications passent par le même journal d'audit que les actions de B1Admin ; vous pouvez les consulter sous **Paramètres → Journal d'audit**.

### Dépannage

**Claude demande un e-mail et un mot de passe B1 pour utiliser FreePlay :** vous avez la version 1.1.0 de l'extension de bureau. Téléchargez-la et réinstallez-la pour la mettre à jour -- les versions plus récentes utilisent seulement votre clé.

**Claude signale « Unauthorized » ou 401 :** le jeton porteur est absent, mal formé, ou la clé a été révoquée. Si vous avez utilisé l'extension, ouvrez **Paramètres → Extensions → B1 (ChurchApps)** dans Claude et collez de nouveau la clé. Sinon, vérifiez à nouveau l'en-tête `Authorization: Bearer cak_…` (notez l'espace et le mot `Bearer` tel quel).

**Un appel d'outil renvoie 403 :** la clé API n'a pas la portée requise pour ce point de terminaison. Ajoutez la portée dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé -- les portées ne peuvent pas être modifiées sur place) et collez la nouvelle clé dans les paramètres de l'extension ou la configuration de Claude.

**Claude ne trouve pas un point de terminaison :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utilise list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré à partir de l'API en direct ; tout ce que vous pouvez atteindre avec `curl` s'y trouve.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp` -- mêmes authentification, mêmes outils.

## Liens connexes

- [Clés API](/docs/developer/api/api-keys) -- référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) -- détails du protocole et schémas des outils
- [ChatGPT](./chatgpt) -- même idée, pour les modèles d'OpenAI
