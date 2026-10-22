---
title: "Claude"
---

# Claude

<div class="article-intro">

Posez à Claude des questions sur votre église en langage courant, et il vous répond à partir de vos données B1. Des questions comme *« combien de nouveaux visiteurs sont venus dimanche ? »* ou *« qui a rejoint un petit groupe ce mois-ci ? »* — ou demandez-lui de faire des choses, comme *« ajoute une nouvelle page appelée Événements à notre site web. »* La configuration prend moins de 3 minutes et ne demande aucune compétence technique ni aucun logiciel à installer.

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **Un compte Claude.** Le **forfait gratuit fonctionne** — un bon moyen de l'essayer. Les comptes gratuits ont toutefois une limite quotidienne de messages, et les recherches dans B1 consomment vite des messages ; si vous l'utilisez régulièrement, nous recommandons donc **Claude Pro** (environ 20 $ US/mois).
- **Votre identifiant B1** — le même que celui que vous utilisez pour B1 Admin.

</div>

:::tip Recommandé — gratuit pour essayer
Claude est le moyen le plus simple de connecter B1 à l'IA, et il fonctionne avec le **forfait gratuit** de Claude — parfait pour que votre église l'essaie avant de payer quoi que ce soit.
:::

Il existe deux façons de se connecter. **L'option 1 est la plus simple** — pas de clé et rien à installer.

## Option 1 — Se connecter avec B1 (le plus simple)

Fonctionne sur le site web de Claude, dans l'application de bureau Claude et dans l'application mobile Claude — configurez-la une fois et elle est disponible partout.

### Étape 1 — Ouvrir les paramètres des connecteurs de Claude

1. Allez sur [claude.ai](https://claude.ai) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur votre nom en bas à gauche, puis sur **Settings** (Paramètres) → **Connectors** (Connecteurs).

### Étape 2 — Ajouter B1

1. Cliquez sur **Add** (Ajouter), puis sur **Add custom connector** (Ajouter un connecteur personnalisé).
2. **Name** (Nom) : tapez `B1`.
3. **URL :** collez `https://api.churchapps.org/mcp`
4. Laissez les autres options telles quelles et cliquez sur **Add** (Ajouter).

### Étape 3 — Se connecter à B1

1. Cliquez sur **Connect** (Connecter). Une page de connexion B1 s'ouvre.
2. Connectez-vous avec votre compte B1. Si vous appartenez à plusieurs églises, vérifiez que la bonne église est affichée en haut.
3. B1 indique ce que Claude demande à faire et confirme que vous serez renvoyé vers **claude.ai**. Cliquez sur **Allow** (Autoriser).

Vous êtes de retour dans Claude, et B1 apparaît comme connecté.

### Étape 4 — Posez-lui une question

Démarrez une **nouvelle conversation** et essayez :

- *« Combien de personnes compte notre église ? »*
- *« Liste nos groupes actifs. »*
- *« Résume les dons de ce mois par fonds. »*
- *« Qui a rejoint l'église au cours des 30 derniers jours ? »*

La première fois, Claude demande la permission d'utiliser B1 — cliquez sur **Allow** (Autoriser).

## Option 2 — Extension de bureau avec une clé B1

Utilisez cette option si vous préférez donner à Claude une clé aux permissions limitées (par exemple, en consultation seule). Elle fonctionne dans l'application de bureau Claude pour Mac ou Windows, et vous devez avoir la permission de gérer les paramètres de l'église dans B1 pour créer une clé.

### Étape 1 — Obtenir l'application Claude

Téléchargez l'application Claude depuis [claude.com/download](https://claude.com/download), installez-la, ouvrez-la et connectez-vous.

### Étape 2 — Créer votre clé B1

La clé est ce qui permet à Claude d'accéder au B1 de *votre* église — voyez-la comme un mot de passe réservé à Claude.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et allez à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API**.
3. **Nom :** tapez `Claude`.
4. **Scopes :** cochez ce que Claude a le droit de faire. Chaque domaine a une case **read** (consulter uniquement) et une case **write** (apporter des modifications). Vous hésitez ? Cochez seulement les cases **read** pour commencer — vous pourrez créer plus tard une nouvelle clé avec davantage de droits.
5. Cliquez sur **Enregistrer**, puis sur **Copier** pour copier la clé. Elle n'est affichée qu'une seule fois, alors passez directement à l'étape 3.

### Étape 3 — Ajouter B1 à Claude

1. [Téléchargez l'extension B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Double-cliquez** sur le fichier téléchargé (`b1-churchapps.mcpb`). Claude s'ouvre et affiche **B1 (ChurchApps)**.
3. Cliquez sur **Install** (Installer).
4. Lorsqu'on vous demande votre **B1 API key**, collez la clé de l'étape 2 et enregistrez.
5. **Quittez complètement Claude** (Mac : **Cmd+Q** · Windows : clic droit sur l'icône Claude dans la barre des tâches → **Quit** (Quitter)) puis rouvrez-le.

Si le double-clic n'ouvre pas Claude, allez dans **Settings → Extensions → Advanced settings → Install Extension…** (Paramètres → Extensions → Paramètres avancés → Installer une extension) dans Claude et choisissez le fichier téléchargé. Démarrez ensuite une nouvelle conversation et posez-lui une question.

## Est-ce sécurisé ?

- Claude ne peut voir que les données de **votre église**.
- **Connecté avec B1 (option 1) :** Claude ne peut jamais faire plus que votre propre identifiant B1. La page de connexion B1 liste tout ce que Claude pourra faire avant que vous cliquiez sur **Allow** (Autoriser).
- **Avec une clé (option 2) :** Claude ne peut faire que ce que la clé autorise — une clé dont seules les cases **read** sont cochées peut consulter mais jamais rien modifier.
- **Pour le désactiver :** dans B1 Admin, allez dans **Paramètres → Développeur** et révoquez l'application sous **Applications connectées** (option 1) ou supprimez la clé sous **Clés API** (option 2). L'accès s'arrête immédiatement. Vous pouvez aussi cliquer sur **Disconnect** (Déconnecter) sur le connecteur B1 dans Claude.

## Combien ça coûte ?

La connexion B1 est gratuite — elle fait partie de ChurchApps. Claude lui-même propose un forfait gratuit ; Claude Pro (environ 20 $ US/mois) vous offre une utilisation bien plus importante. Voir [claude.com/pricing](https://claude.com/pricing).

## Détails techniques

Le reste de cette page s'adresse aux utilisateurs techniques et aux assistants IA : scopes, autres façons de se connecter et fonctionnement.

### Scopes

Claude parle à B1 via le **serveur du protocole de contexte de modèle (MCP)** intégré à l'API B1 (`https://api.churchapps.org/mcp`). Chaque appel passe par les mêmes règles d'authentification, de permission et de portée d'église qu'une requête de B1 Admin. Claude est limité aux **permissions et scopes** de la clé API, et ne peut pas atteindre les webhooks, les points de terminaison administrateur OAuth ou d'autres chemins réservés à l'opérateur.

Ensembles de scopes de départ courants :

- **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lecture + ajouter des notes / tâches :** ajoutez `people:write`
- **Assistant opérationnel complet :** ajoutez les scopes `:write` correspondants que vous souhaitez

Une clé `donations:read` permet à Claude de résumer les dons mais pas d'enregistrer un don. Une clé `people:write` peut ajouter une personne mais ne peut pas voir les dons. Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que chaque scope permet.

### Autres façons de se connecter

#### Claude Code (CLI)

Dans un terminal :

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans n'importe quelle session Claude Code, tapez `/mcp` pour confirmer que le serveur `b1` est connecté, puis posez à Claude n'importe quelle question sur votre église.

#### Claude Desktop — configuration manuelle (avancé)

Si vous préférez ne pas utiliser l'extension, modifiez le fichier de configuration de Claude Desktop :

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

Ajoutez une entrée de serveur `b1` qui fait le pont vers B1 via `mcp-remote` (nécessite [Node.js](https://nodejs.org)) :

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

#### Claude.ai (web) — Connecteur personnalisé

Voir la section **Option 1** ci-dessus. Le connecteur utilise OAuth 2.1 : Claude découvre le serveur d'autorisation de B1 à partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, s'enregistre via Dynamic Client Registration et se connecte avec PKCE. Sur les forfaits Team et Enterprise, un propriétaire devra peut-être d'abord ajouter le connecteur pour l'organisation. Claude ne demande pas de scopes précis : la page de consentement propose donc tout ce à quoi le compte B1 connecté peut accéder. Révoquez l'accès sous **Paramètres → Développeur → Applications connectées** dans B1 Admin.

### Fonctionnement

L'API B1 expose un seul point de terminaison MCP à `/mcp`. Claude s'y connecte, s'authentifie avec votre clé `cak_…`, et obtient l'accès à quatre outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Liste les points de terminaison REST que Claude peut appeler, filtrables par chemin. Utilisé pour la découverte. |
| `describe_endpoint` | Renvoie un court résumé et un exemple de requête/réponse pour un point de terminaison spécifique. |
| `api_call` | Invoque réellement un point de terminaison REST en tant qu'utilisateur authentifié. |
| `describe_page_builder` | Un guide pour créer et modifier les pages du site web de votre église, que Claude lit avant de travailler sur le contenu du site. |

C'est la même surface `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que votre B1 Admin utilise — chaque règle d'autorisation s'applique à l'identique.

### Sécurité et limites

- **Isolation par église.** La clé API correspond à une seule église. Claude n'a aucun moyen de voir les données d'autres églises.
- **Limité par les permissions.** Si vous retirez une permission à la personne qui a créé la clé dans B1 Admin, Claude la perd au prochain appel — instantanément.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de Claude prend fin immédiatement.
- **Liste noire.** Les webhooks de fournisseurs, les points de terminaison d'administration des clients OAuth et la route `apiEmails` réservée à l'opérateur ne sont pas appelables via MCP.
- **Limite de taille de réponse.** Une seule réponse d'outil est limitée à 64 ko pour que les longues listes ne saturent pas le contexte de Claude — Claude affine alors la requête avec des filtres.
- **Piste d'audit.** Les modifications passent par le même journal d'audit que les actions B1 Admin ; vous pouvez les consulter dans **Paramètres → Journal d'audit**.

### Dépannage

**Claude signale « Unauthorized » ou 401 :** le token Bearer est manquant, mal formé, ou la clé a été révoquée. Si vous avez utilisé l'extension, ouvrez **Settings → Extensions → B1 (ChurchApps)** (Paramètres → Extensions) dans Claude et collez à nouveau la clé. Sinon, revérifiez l'en-tête `Authorization: Bearer cak_…` (notez l'espace et le mot littéral `Bearer`).

**Un appel d'outil renvoie 403 :** la clé API n'a pas le scope pour ce point de terminaison. Ajoutez le scope dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé — les scopes ne peuvent pas être modifiés sur une clé existante) et collez la nouvelle clé dans les paramètres de l'extension ou dans la configuration de Claude.

**Claude ne trouve pas un point de terminaison :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utilise list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré depuis l'API en direct, donc tout ce que vous pouvez atteindre avec `curl` s'y trouve.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp` — même authentification, mêmes outils.

## En savoir plus

- [Clés API](/docs/developer/api/api-keys) — référence complète des scopes
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas des outils
- [ChatGPT](./chatgpt) — même idée, pour les modèles d'OpenAI
