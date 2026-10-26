---
title: "Claude"
---

# Claude

<div class="article-intro">

Posez à Claude des questions sur votre église en langage courant, et il répondra à partir de vos données B1. Des questions comme *« combien de visiteurs de première fois sont venus dimanche ? »* ou *« qui a rejoint un petit groupe ce mois-ci ? »*, ou demandez-lui d'agir, par exemple *« ajoute une nouvelle page à notre site web intitulée Événements. »* La configuration prend moins de 3 minutes, et vous n'avez besoin d'aucune compétence technique ni d'aucun logiciel à installer.

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **Un compte Claude.** Le **forfait gratuit fonctionne**, et c'est une bonne façon de l'essayer. Les comptes gratuits ont toutefois une limite quotidienne de messages, et les recherches dans B1 consomment rapidement ces messages. Si vous l'utilisez régulièrement, nous vous recommandons **Claude Pro** (environ 20 $ par mois).
- **Votre identifiant B1.** Le même que celui que vous utilisez pour B1 Admin.

</div>

:::tip Recommandé, essai gratuit
Claude est le moyen le plus simple de connecter B1 à l'IA, et il fonctionne avec le **forfait gratuit** de Claude, une excellente façon pour votre église de l'essayer avant de payer quoi que ce soit.
:::

Il existe deux façons de connecter les deux outils. **L'option 1 est la plus simple**, car elle ne nécessite ni clé ni installation.

## Option 1 : Se connecter avec B1 (le plus simple)

Fonctionne sur le site web de Claude, l'application de bureau Claude et l'application mobile Claude. Configurez-le une seule fois, et il sera disponible sur tous ces appareils.

### Étape 1 : Ouvrir les paramètres des connecteurs de Claude

1. Rendez-vous sur [claude.ai](https://claude.ai) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur votre nom dans le coin inférieur gauche, puis sur **Paramètres** → **Connecteurs**.

### Étape 2 : Ajouter B1

1. Cliquez sur **Ajouter**, puis sur **Ajouter un connecteur personnalisé**.
2. **Nom :** saisissez `B1`.
3. **URL :** collez `https://api.churchapps.org/mcp`
4. Laissez les autres options telles quelles et cliquez sur **Ajouter**.

### Étape 3 : Se connecter à B1

1. Cliquez sur **Connecter**. Une page de connexion B1 s'ouvre.
2. Connectez-vous avec votre compte B1. Si vous appartenez à plusieurs églises, vérifiez que la bonne église s'affiche en haut.
3. B1 affiche ce que Claude demande à faire et vous confirme que vous serez renvoyé vers **claude.ai**. Cliquez sur **Autoriser**.

Vous êtes de retour dans Claude, et B1 apparaît comme connecté.

### Étape 4 : Poser une question

Démarrez une **nouvelle conversation** et essayez :

- *« Combien de personnes compte notre église ? »*
- *« Liste nos groupes actifs. »*
- *« Résume les dons de ce mois-ci par fonds. »*
- *« Qui a rejoint l'église au cours des 30 derniers jours ? »*

La première fois, Claude demande l'autorisation d'utiliser B1. Cliquez sur **Autoriser**.

## Option 2 : Extension de bureau avec une clé B1

Utilisez cette option si vous préférez donner à Claude une clé aux autorisations limitées (par exemple, consultation seulement). Elle fonctionne dans l'application de bureau Claude pour Mac ou Windows, et vous devez avoir l'autorisation de gérer les paramètres de l'église dans B1 pour créer une clé.

### Étape 1 : Obtenir l'application Claude

Téléchargez l'application Claude depuis [claude.com/download](https://claude.com/download), installez-la, ouvrez-la et connectez-vous.

### Étape 2 : Créer votre clé B1

La clé permet à Claude d'accéder à B1 *de votre église*. Considérez-la comme un mot de passe réservé à Claude.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et rendez-vous dans [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API**.
3. **Nom :** saisissez `Claude`.
4. **Portées :** cochez ce que Claude peut faire. Chaque domaine dispose d'une case **lecture** (consultation seulement) et d'une case **écriture** (modification). Vous ne savez pas quoi choisir ? Cochez uniquement les cases **lecture** pour commencer. Vous pourrez créer plus tard une nouvelle clé avec davantage d'autorisations.
5. Cliquez sur **Enregistrer**, puis sur **Copier** la clé. Elle n'est affichée qu'une seule fois. Passez donc directement à l'étape 3.

### Étape 3 : Ajouter B1 à Claude

1. [Téléchargez l'extension B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Double-cliquez** sur le fichier téléchargé (`b1-churchapps.mcpb`). Claude s'ouvre et affiche **B1 (ChurchApps)**.
3. Cliquez sur **Installer**.
4. Lorsqu'il vous demande votre **clé API B1**, collez la clé de l'étape 2 et enregistrez.
5. **Quittez complètement Claude** (Mac : **Cmd+Q** · Windows : faites un clic droit sur l'icône de Claude dans la barre des tâches, puis **Quitter**) et rouvrez-le.

Si le double-clic n'ouvre pas Claude, allez dans **Paramètres → Extensions → Paramètres avancés → Installer l'extension…** dans Claude, puis choisissez le fichier téléchargé. Démarrez ensuite une nouvelle conversation et posez une question.

## Est-ce sûr ?

- Claude ne peut voir que les données **de votre église**.
- **Connecté (option 1) :** Claude ne peut jamais faire plus que ce que permet votre propre connexion B1. La page de connexion B1 affiche tout ce que Claude peut faire avant que vous ne cliquiez sur **Autoriser**.
- **Avec une clé (option 2) :** Claude ne peut faire que ce que la clé autorise. Une clé dont seules les cases **lecture** sont cochées peut consulter les données, mais ne peut jamais rien modifier.
- **Pour le désactiver :** dans B1 Admin, allez dans **Paramètres → Développeur** et révoquez l'application sous **Applications connectées** (option 1) ou supprimez la clé sous **Clés API** (option 2). L'accès est interrompu immédiatement. Vous pouvez aussi cliquer sur **Déconnecter** dans le connecteur B1 de Claude.

## Quel est le coût ?

La connexion B1 est gratuite, car elle fait partie de ChurchApps. Claude dispose lui-même d'un forfait gratuit ; Claude Pro (environ 20 $ par mois) offre une utilisation beaucoup plus étendue. Consultez [claude.com/pricing](https://claude.com/pricing).

## Détails techniques

Le reste de cette page s'adresse aux utilisateurs techniques et aux assistants IA : portées, autres façons de se connecter et fonctionnement.

### Portées

Claude communique avec B1 par l'intermédiaire du **serveur Model Context Protocol (MCP)** intégré à l'API B1 (`https://api.churchapps.org/mcp`). Chaque appel passe par les mêmes règles d'authentification, d'autorisation et de périmètre d'église que les requêtes depuis B1 Admin. Claude est limité aux **autorisations et portées** de la clé API, et ne peut pas accéder aux webhooks, aux points de terminaison d'administration OAuth, ni aux autres chemins réservés à l'opérateur.

Ensembles de portées de départ courants :

- **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lecture + ajout de notes / tâches :** ajoutez `people:write`
- **Assistant opérationnel complet :** ajoutez les portées `:write` correspondantes que vous souhaitez

Une clé `donations:read` permet à Claude de résumer les dons, mais pas d'enregistrer un don. Une clé `people:write` permet d'ajouter une personne, mais pas de consulter les dons. Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que permet chaque portée.

### Autres façons de se connecter

#### Claude Code (CLI)

Dans un terminal :

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans une session Claude Code, tapez `/mcp` pour confirmer que le serveur `b1` est connecté, puis posez n'importe quelle question sur votre église.

#### Claude Desktop : configuration manuelle (avancé)

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

#### Claude.ai (web) : connecteur personnalisé

Consultez l'**option 1** ci-dessus. Le connecteur utilise OAuth 2.1 : Claude découvre le serveur d'autorisation de B1 à partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, s'enregistre avec Dynamic Client Registration et se connecte avec PKCE. Sur les forfaits Team et Enterprise, un propriétaire peut devoir d'abord ajouter le connecteur pour l'organisation. Claude ne demande pas de portées précises : la page de consentement propose donc tout ce à quoi le compte B1 connecté a accès. Révoquez-le dans **Paramètres → Développeur → Applications connectées** dans B1 Admin.

### Fonctionnement

L'API B1 expose un seul point de terminaison MCP à `/mcp`. Claude s'y connecte, s'authentifie avec votre clé `cak_…` et accède à quatre outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Liste les points de terminaison REST que Claude peut appeler, filtrables par chemin. Utilisé pour la découverte. |
| `describe_endpoint` | Renvoie un bref résumé et un exemple de requête/réponse pour un point de terminaison précis. |
| `api_call` | Appelle réellement un point de terminaison REST au nom de l'utilisateur authentifié. |
| `describe_page_builder` | Un guide pour créer et modifier les pages du site web de votre église, que Claude lit avant de travailler sur le contenu du site. |

Il s'agit de la même surface que `/membership/people`, `/giving/donations`, `/attendance/visits`, etc., utilisée par B1 Admin. Toutes les règles d'autorisation s'appliquent de manière identique.

### Sécurité et limites

- **Isolation par église.** La clé API est rattachée à une seule église. Claude ne peut pas voir les données d'autres églises.
- **Limité par les autorisations.** Si vous retirez une autorisation à la personne qui a créé la clé dans B1 Admin, Claude la perd dès son prochain appel, immédiatement.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de Claude prend fin immédiatement.
- **Liste de blocage.** Les webhooks des fournisseurs, les points de terminaison d'administration des clients OAuth et la route `apiEmails` réservée à l'opérateur ne peuvent pas être appelés via MCP.
- **Limite de taille des réponses.** Une réponse d'outil est limitée à 64 Ko afin que les longues listes ne saturent pas le contexte de Claude. Dans ce cas, Claude affinera la requête à l'aide de filtres.
- **Piste d'audit.** Les modifications passent par le même journal d'audit que les actions de B1 Admin. Vous pouvez les consulter dans **Paramètres → Journal d'audit**.

### Dépannage

**Claude signale « Unauthorized » ou une erreur 401 :** le jeton au porteur est absent, mal formé, ou la clé a été révoquée. Si vous avez utilisé l'extension, ouvrez **Paramètres → Extensions → B1 (ChurchApps)** dans Claude et collez de nouveau la clé. Sinon, vérifiez l'en-tête `Authorization: Bearer cak_…` (attention à l'espace et au mot `Bearer` tel quel).

**Un appel d'outil renvoie une erreur 403 :** la clé API ne dispose pas de la portée nécessaire pour ce point de terminaison. Ajoutez la portée dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé, car les portées ne peuvent pas être modifiées sur place), puis collez la nouvelle clé dans les paramètres de l'extension ou dans la configuration de Claude.

**Claude ne trouve pas un point de terminaison :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utilise list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré à partir de l'API en direct : tout ce que vous pouvez appeler avec `curl` s'y trouve.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp`. L'authentification et les outils restent identiques.

## Voir aussi

- [Clés API](/docs/developer/api/api-keys) : référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) : détails du protocole et schémas des outils
- [ChatGPT](./chatgpt) : la même idée, avec les modèles d'OpenAI
