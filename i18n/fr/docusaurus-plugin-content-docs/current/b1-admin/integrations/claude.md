---
title: "Claude"
---

# Claude

<div class="article-intro">

Connectez Claude d'Anthropic aux données de B1 de votre église. Avec une clé API et quelques minutes de configuration, vous pouvez poser à Claude des questions comme « combien de nouveaux visitants sont venus dimanche? » ou « rédiger un email de remerciement aux personnes qui ont donné au fonds de construction ce mois-ci » — et Claude lira les réponses directement depuis les dossiers de votre église, limité à vos permissions.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un administrateur de l'église avec la permission **Modifier les paramètres** (pour créer une clé API)
- L'un des éléments suivants : **Claude Code** (CLI / extension IDE), **Claude Desktop** (Mac/Windows), ou un compte **Claude Pro/Max/Team**
- L'URL complète de votre API B1 — généralement `https://api.churchapps.org` pour les églises hébergées, ou votre hôte Api auto-hébergé

</div>

## Ce que Claude peut voir

Claude parle à B1 via le **serveur du protocole de contexte de modèle (MCP)** intégré à l'API B1. Chaque appel que Claude effectue passe par les mêmes règles d'authentification, de permission et de portée d'église qu'une requête de B1Admin — ce qui signifie que Claude :

- Ne voit que les données de **votre** église
- Est limité aux **permissions et scopes** que la clé API que vous lui donnez porte
- Ne peut pas atteindre les webhooks, les points de terminaison administrateur OAuth ou autres chemins réservés à l'opérateur (ceux-ci sont sur liste noire)

Une clé `donations:read` permet à Claude de résumer les donations mais ne peut pas enregistrer un don. Une clé `people:write` peut ajouter une personne mais ne peut pas voir les donations. Choisissez les scopes qui correspondent au travail.

## Configuration

### 1. Créer une clé API

1. Dans B1Admin allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la `Claude`, et sélectionnez les scopes que Claude devrait avoir. Les ensembles de démarrage courants :
   - **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
   - **Lecture + ajouter des notes / tâches :** ajoutez `people:write`
   - **Assistant opérationnel complet :** ajoutez les scopes `:write` correspondants que vous souhaitez
3. Enregistrez. La clé complète `cak_…` est affichée **une seule fois** — copiez-la.

Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que chaque scope permet.

### 2. Connecter Claude

Choisissez le client Claude que vous utilisez :

#### Claude Code (CLI)

Dans un terminal :

```bash
claude mcp add --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans n'importe quelle session Claude Code, tapez `/mcp` pour confirmer que le serveur `b1` est connecté, puis posez à Claude n'importe quelle question sur votre église.

#### Claude Desktop

Modifiez le fichier de configuration de Claude Desktop :

- **macOS :** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows :** `%APPDATA%\Claude\claude_desktop_config.json`

Ajoutez une entrée de serveur `b1`. Les versions plus récentes de Claude Desktop parlent nativement MCP HTTP :

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

Si votre version de Claude Desktop ne supporte que les serveurs stdio, faites un pont via `mcp-remote` :

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

Redémarrez Claude Desktop. L'icône de connecteur dans le compositeur de chat affichera `b1` avec trois outils (`list_endpoints`, `describe_endpoint`, `api_call`).

#### Claude.ai (web) — Connecteur personnalisé

La fonction « Ajouter un connecteur personnalisé » de Claude.ai nécessite OAuth, que le serveur MCP B1 ne supporte pas actuellement. Utilisez plutôt Claude Code ou Claude Desktop.

### 3. Posez une question à Claude

Une fois connecté, aucune syntaxe spéciale n'est nécessaire — Claude découvre ce qui est disponible à la volée. Exemples :

- *« Combien de personnes sont dans ma église et quels sont les groupes actifs? »*
- *« Résumez les donations de ce mois par fonds. »*
- *« Énumérez les personnes qui ont assisté au service de 10h dimanche dernier mais n'ont pas assisté à un groupe mercredi au cours des 60 derniers jours. »*
- *« Rédigez un email de bienvenue pour les quatre personnes ajoutées cette semaine, adressé par prénom. »*

En arrière-plan, Claude appellera les outils MCP — d'abord pour découvrir le bon point de terminaison, puis pour récupérer les données — et répondra en langage naturel.

## Fonctionnement

L'API B1 expose un seul point de terminaison MCP à `/mcp`. Claude se connecte à celui-ci, s'authentifie avec votre clé `cak_…`, et obtient accès à trois outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Énumère les points de terminaison REST que Claude peut appeler, filtrables par chemin. Utilisé pour la découverte. |
| `describe_endpoint` | Renvoie un court résumé et un exemple de requête/réponse pour un point de terminaison spécifique. |
| `api_call` | Invoque réellement un point de terminaison REST en tant qu'utilisateur authentifié. |

C'est la même surface `/membership/people`, `/giving/donations`, `/attendance/visits` etc. que B1Admin utilise — chaque règle d'autorisation s'applique identiquement.

## Sécurité et limites

- **Isolation par église.** La clé API se résout à une église. Claude n'a aucun moyen de voir les données d'autres églises.
- **Limité par permission.** Si vous supprimez une permission de la personne qui a créé la clé dans B1Admin, Claude la perd au prochain appel — instantanément.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de Claude se termine immédiatement.
- **Liste noire.** Les webhooks de fournisseur, les points de terminaison administrateur client OAuth et la route `apiEmails` réservée à l'opérateur ne sont pas appelables via MCP.
- **Limite de taille de réponse.** Une seule réponse d'outil est limitée à 64 ko pour que les longues listes ne dépassent pas le contexte de Claude — Claude réduira la requête avec des filtres quand cela se produit.
- **Piste d'audit.** Les mutations passent par le même journal d'audit que les actions B1Admin; vous pouvez les consulter dans **Rapports → Journal d'audit**.

## Coût

ChurchApps est gratuit et open-source — le serveur MCP fait partie de l'API que votre église exécute déjà. Anthropic facture l'utilisation de Claude selon ses plans. Il n'y a aucun coût par appel de ChurchApps.

## Dépannage

**Claude signale « Non autorisé » ou 401 :** le token Bearer est manquant, mal formé, ou la clé a été révoquée. Re-vérifiez l'en-tête `Authorization: Bearer cak_…` (notez l'espace et le littéral `Bearer`).

**Un appel d'outil retourne 403 :** la clé API n'a pas le scope pour ce point de terminaison. Ajoutez le scope dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé — les scopes ne peuvent pas être modifiés en place) et mettez à jour la configuration de Claude.

**Claude ne trouve pas un point de terminaison :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utiliser list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré depuis l'API en direct, donc tout ce que vous pouvez atteindre avec `curl` est là.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp` — même authentification, mêmes outils.

## En savoir plus

- [Clés API](/docs/developer/api/api-keys) — référence complète des scopes
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas des outils
- [ChatGPT](./chatgpt) — même idée, pour les modèles d'OpenAI
