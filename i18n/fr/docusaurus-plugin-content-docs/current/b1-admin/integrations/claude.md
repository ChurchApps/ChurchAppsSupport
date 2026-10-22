---
title: "Claude"
---

# Claude {#claude}

<div class="article-intro">

Connectez Claude d'Anthropic aux données B1 de votre église. Ajoutez B1 comme connecteur personnalisé sur claude.ai et connectez-vous, ou utilisez une clé API avec Claude Code ou Claude Desktop. Après quelques minutes de configuration, vous pouvez poser à Claude des questions comme « combien de visiteurs pour la première fois sont venus dimanche ? » ou « rédige un courriel de remerciement pour les personnes qui ont donné au fonds de construction ce mois-ci » -- et Claude lira les réponses directement dans les fiches de votre église, dans la limite de vos permissions.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte **Claude Pro/Max/Team/Enterprise** (pour le connecteur personnalisé claude.ai), ou **Claude Code** (CLI / extension IDE) ou **Claude Desktop** (Mac/Windows)
- Pour la configuration par clé API : un administrateur de l'église ayant la permission **Modifier les paramètres** (pour générer une clé API)
- L'URL complète de votre API B1 -- généralement `https://api.churchapps.org` pour les églises hébergées, ou l'hôte de votre API auto-hébergée

</div>

## Ce que Claude peut voir {#what-claude-can-see}

Claude communique avec B1 via le **serveur Model Context Protocol (MCP)** intégré à l'API B1. Chaque appel de Claude passe par les mêmes règles d'authentification, de permissions et de rattachement à l'église que toute requête venant de B1 Admin. Claude :

- Ne voit que les données de **votre** église
- Est limité aux **permissions et portées** que porte la clé API ou la connexion que vous lui donnez
- Ne peut pas accéder aux webhooks, aux points d'accès d'administration OAuth ni aux autres chemins réservés à l'opérateur (ils sont bloqués)

Une clé `donations:read` permet à Claude de résumer les dons, mais pas d'enregistrer un don. Une clé `people:write` permet d'ajouter une personne, mais pas de voir les dons. Choisissez les portées qui correspondent au travail à accomplir.

## Configuration {#setup}

Il existe deux façons de se connecter :

- **Connecteur personnalisé Claude.ai** -- la plus simple. Vous vous connectez à B1 et autorisez l'accès dans votre navigateur, sans clé à copier. Le connecteur fonctionne aussi dans Claude Desktop et les applications mobiles Claude une fois ajouté à votre compte.
- **Clé API** -- pour Claude Code, ou un fichier de configuration de Claude Desktop. Vous créez une clé et la collez dans les paramètres de Claude.

### Claude.ai (web) — Connecteur personnalisé {#claudeai-web--custom-connector}

1. Dans Claude, ouvrez **Paramètres → Connecteurs** et cliquez sur **Ajouter un connecteur personnalisé**. (Sur les forfaits Team et Enterprise, un propriétaire doit peut-être l'ajouter d'abord pour l'organisation.)
2. Nommez-le `B1` et saisissez l'URL du serveur `https://api.churchapps.org/mcp`, puis cliquez sur **Ajouter**.
3. Cliquez sur **Se connecter**. Une fenêtre de connexion B1 s'ouvre. Connectez-vous avec votre compte B1 et choisissez votre église si on vous le demande.
4. La page **AUTORISATION REQUISE** affiche le nom de l'application, les données qu'elle demande (par exemple **Voir les personnes, les foyers et les coordonnées**, ou **Tout ce à quoi votre compte B1 peut accéder** si elle n'a rien demandé de plus restreint), et l'adresse vers laquelle vous serez redirigé après votre choix -- vérifiez qu'il s'agit de **claude.ai**.
5. Cliquez sur **Autoriser**. Vous revenez dans Claude, et B1 apparaît comme connecté.

Claude s'enregistre auprès de B1 la première fois que vous vous connectez ; la page indique donc aussi que l'application s'est enregistrée elle-même et ne peut jamais faire plus que ce que votre propre compte B1 peut faire. Pour la déconnecter plus tard, allez dans **Paramètres → Développeur → Applications connectées** dans B1Admin et révoquez-la.

### Utiliser une clé API {#using-an-api-key}

#### 1. Créer une clé API {#1-create-an-api-key}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la `Claude`, et sélectionnez les portées que Claude doit avoir. Ensembles de départ courants :
   - **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lecture + ajout de notes / tâches :** ajoutez `people:write`
   - **Assistant opérationnel complet :** ajoutez les portées `:write` correspondantes que vous souhaitez
3. Enregistrez. La clé complète `cak_…` n'est affichée **qu'une fois** -- copiez-la.

Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que permet chaque portée.

#### 2. Connecter Claude {#2-connect-claude}

Choisissez le client Claude que vous utilisez :

##### Claude Code (CLI) {#claude-code-cli}

Dans un terminal :

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans n'importe quelle session Claude Code, tapez `/mcp` pour vérifier que le serveur `b1` est connecté, puis posez à Claude une question sur votre église.

##### Claude Desktop {#claude-desktop}

Modifiez le fichier de configuration de Claude Desktop :

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

Ajoutez une entrée de serveur `b1`. Les versions récentes de Claude Desktop parlent nativement le MCP en HTTP :

```json
{
  "mcpServers": {
    "b1": {
      "url": "https://api.churchapps.org/mcp",
      "headers": {
        "Authorization": "Bearer cak_<prefix>.<secret>"
      }
    }
  }
}
```

Si votre version de Claude Desktop ne prend en charge que les serveurs stdio, passez par `mcp-remote` :

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

Redémarrez Claude Desktop. L'icône du connecteur dans la zone de saisie du chat affichera `b1` avec trois outils (`list_endpoints`, `describe_endpoint`, `api_call`).

### Posez une question à Claude {#ask-claude-something}

Une fois connecté, aucune syntaxe particulière n'est nécessaire -- Claude découvre à la volée ce qui est disponible. Exemples :

- *« Combien de personnes compte mon église et quels sont les groupes actifs ? »*
- *« Résume les dons de ce mois par fonds. »*
- *« Liste les personnes qui ont assisté au service de 10 h dimanche dernier mais qui ne sont allées à aucun groupe du mercredi au cours des 60 derniers jours. »*
- *« Rédige un courriel de bienvenue pour les quatre personnes ajoutées cette semaine, en les appelant par leur prénom. »*

En coulisses, Claude appellera les outils MCP -- d'abord pour découvrir le bon point d'accès, puis pour récupérer les données -- et répondra en langage courant.

## Fonctionnement {#how-it-works}

L'API B1 expose un seul point d'accès MCP à `/mcp`. Claude s'y connecte, s'authentifie avec votre clé `cak_…` ou la connexion que vous avez approuvée, et obtient accès à trois outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Liste les points d'accès REST que Claude peut appeler, filtrables par chemin. Sert à la découverte. |
| `describe_endpoint` | Renvoie un bref résumé et un exemple de requête et de réponse pour un point d'accès précis. |
| `api_call` | Appelle réellement un point d'accès REST en tant qu'utilisateur authentifié. |

Il s'agit de la même surface `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. qu'utilise B1Admin -- chaque règle d'autorisation s'applique de façon identique.

## Sécurité et limites {#safety-and-limits}

- **Isolement par église.** La clé API ou la connexion ne correspond qu'à une seule église. Claude ne peut pas voir les données d'autres églises.
- **Limité par les permissions.** Si vous retirez une permission à la personne qui a généré la clé (ou qui s'est connectée) dans B1Admin, Claude la perd dès l'appel suivant -- instantanément.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API**, ou révoquez la connexion claude.ai dans **Paramètres → Développeur → Applications connectées**, et l'accès de Claude prend fin immédiatement.
- **Liste de blocage.** Les webhooks des fournisseurs, les points d'accès d'administration des clients OAuth et la route `apiEmails` réservée à l'opérateur ne sont pas appelables via MCP.
- **Limite de taille des réponses.** Une seule réponse d'outil est limitée à 64 Ko afin que les longues listes ne saturent pas le contexte de Claude -- Claude restreindra alors la requête à l'aide de filtres.
- **Piste d'audit.** Les modifications passent par le même journal d'audit que les actions de B1Admin ; vous pouvez les consulter dans **Paramètres → Journal d'audit**.

## Coût {#cost}

ChurchApps est gratuit et open source -- le serveur MCP fait partie de l'API que votre église exploite déjà. Anthropic facture l'utilisation de Claude selon ses forfaits. ChurchApps ne facture aucun coût par appel.

## Dépannage {#troubleshooting}

**Claude signale « Unauthorized » ou une erreur 401 :** le jeton Bearer est absent, mal formé, ou la clé a été révoquée. Vérifiez l'en-tête `Authorization: Bearer cak_…` (notez l'espace et le mot `Bearer` tel quel). Sur claude.ai, déconnectez et reconnectez le connecteur B1 pour vous reconnecter.

**Un appel d'outil renvoie 403 :** la clé API n'a pas la portée requise pour ce point d'accès. Ajoutez la portée dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé -- les portées ne peuvent pas être modifiées sur place) et mettez à jour la configuration de Claude.

**Claude ne trouve pas un point d'accès :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utilise list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré à partir de l'API en direct : tout ce que vous pouvez atteindre avec `curl` s'y trouve.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp` -- même authentification, mêmes outils.

## Liens connexes {#related}

- [Clés API](/docs/developer/api/api-keys) -- référence complète des portées
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) -- détails du protocole et schémas des outils
- [ChatGPT](./chatgpt) -- même principe, pour les modèles d'OpenAI
