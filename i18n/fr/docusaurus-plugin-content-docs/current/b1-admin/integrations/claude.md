---
title: "Claude"
description: "Connectez B1 Admin à Claude pour poser des questions sur la fréquentation, les dons et les groupes en langage courant, avec une option de connexion par compte B1 ou une clé à autorisations limitées."
---

# Claude

<div class="article-intro">

Posez vos questions sur votre église à Claude en langage courant : il répond à partir de vos données B1, y compris vos leçons FreePlay et vos salles de classe. Des questions comme *« combien de visiteurs venus pour la première fois sont venus dimanche ? »* ou *« qui a rejoint un petit groupe ce mois-ci ? »*, ou demandez-lui d'agir, par exemple *« ajoute une nouvelle page à notre site web intitulée Événements. »* La configuration prend moins de 3 minutes et ne nécessite aucune compétence technique ni aucun logiciel à installer.

</div>

<div class="prereqs">
<h4>Ce dont vous avez besoin</h4>

- **Un compte Claude.** Le **forfait gratuit fonctionne** — une bonne façon de l'essayer. Les comptes gratuits ont toutefois une limite de messages quotidienne, et les recherches dans B1 consomment rapidement des messages ; si vous l'utilisez régulièrement, nous recommandons **Claude Pro** (environ 20 $ par mois).
- **Votre identifiant B1** — le même que celui que vous utilisez pour B1 Admin.

</div>

:::tip Recommandé — gratuit pour essayer
Claude est la façon la plus simple de relier B1 à l'IA, et cela fonctionne avec le **forfait gratuit** de Claude — une manière idéale pour votre église de l'essayer avant de payer quoi que ce soit.
:::

Il existe deux façons de se connecter. **L'option 1 est la plus simple** — aucune clé et rien à installer.

## Option 1 — Se connecter avec B1 (le plus simple) {#option-1--sign-in-with-b1-easiest}

Fonctionne sur le site web de Claude, l'application de bureau Claude et l'application mobile Claude — configurez-le une fois et il est disponible sur tous.

### Étape 1 — Ouvrir les paramètres des connecteurs de Claude {#step-1--open-claudes-connector-settings}

1. Rendez-vous sur [claude.ai](https://claude.ai) et connectez-vous (ou créez un compte gratuit).
2. Cliquez sur votre nom en bas à gauche, puis sur **Paramètres** → **Connecteurs**.

### Étape 2 — Ajouter B1 {#step-2--add-b1}

1. Cliquez sur **Ajouter**, puis sur **Ajouter un connecteur personnalisé**.
2. **Nom :** saisissez `B1`.
3. **URL :** collez `https://api.churchapps.org/mcp`
4. Laissez les autres options telles quelles et cliquez sur **Ajouter**.

### Étape 3 — Se connecter à B1 {#step-3--sign-in-to-b1}

1. Cliquez sur **Connecter**. Une page de connexion B1 s'ouvre.
2. Connectez-vous avec votre compte B1. Si vous appartenez à plusieurs églises, vérifiez que la page indique la bonne église (« Souhaitez-vous accéder aux données suivantes de *votre église*… »).
3. B1 indique ce que Claude demande (**Tout ce à quoi votre compte B1 peut accéder**), précise que l'application s'est enregistrée auprès de B1 et confirme que vous serez redirigé vers **claude.ai**. Cliquez sur **Autoriser**.

Vous revenez dans Claude, et B1 apparaît comme connecté.

### Étape 4 — Poser une question {#step-4--ask-it-something}

Ouvrez une **nouvelle conversation** et essayez :

- *« Combien de personnes compte notre église ? »*
- *« Liste nos groupes actifs. »*
- *« Résume les dons de ce mois-ci par fonds. »*
- *« Qui a rejoint l'église au cours des 30 derniers jours ? »*

La première fois, Claude demande l'autorisation d'utiliser B1 — cliquez sur **Autoriser**.

## Option 2 — Extension de bureau avec une clé B1 {#option-2--desktop-extension-with-a-b1-key}

Utilisez cette option si vous préférez donner à Claude une clé aux autorisations limitées (par exemple, en consultation uniquement). Elle fonctionne dans l'application de bureau Claude pour Mac ou Windows, et vous devez avoir l'autorisation de gérer les paramètres de l'église dans B1 pour créer une clé.

### Étape 1 — Obtenir l'application Claude {#step-1--get-the-claude-app}

Téléchargez l'application Claude sur [claude.com/download](https://claude.com/download), installez-la, ouvrez-la et connectez-vous.

### Étape 2 — Créer votre clé B1 {#step-2--make-your-b1-key}

La clé est ce qui permet à Claude d'accéder aux données B1 de *votre* église — pensez-y comme à un mot de passe réservé à Claude.

1. Connectez-vous à [B1 Admin](https://admin.b1.church) et accédez à [Paramètres → Développeur](https://admin.b1.church/settings/developer).
2. Dans l'onglet **Clés API**, cliquez sur **Nouvelle clé API**.
3. **Nom :** saisissez `Claude`.
4. **Autorisations :** cochez ce que Claude peut faire. La plupart des domaines comportent une case **lecture** (consultation uniquement) et une case **écriture** (modifications) ; les formulaires ne comportent que **forms:write**. Pas sûr ? Cochez seulement les cases **lecture** pour commencer — vous pourrez créer une nouvelle clé avec davantage d'autorisations plus tard.
5. Cliquez sur **Enregistrer**, puis sur **Copier** la clé. Elle n'est affichée qu'une seule fois : passez directement à l'étape 3.

### Étape 3 — Ajouter B1 à Claude {#step-3--add-b1-to-claude}

1. [Téléchargez l'extension B1](https://github.com/mbyrdLCS/b1-claude-connect/releases/latest/download/b1-churchapps.mcpb).
2. **Double-cliquez** sur le fichier téléchargé (`b1-churchapps.mcpb`). Claude s'ouvre et affiche **B1 (ChurchApps)**.
3. Cliquez sur **Installer**.
4. Lorsqu'il vous demande votre **clé API B1**, collez la clé de l'étape 2 et enregistrez.
5. **Quittez complètement Claude** (Mac : **Cmd+Q** · Windows : faites un clic droit sur l'icône de Claude dans la barre des tâches → **Quitter**), puis rouvrez-le.

Si le double-clic n'ouvre pas Claude, allez dans **Paramètres → Extensions → Paramètres avancés → Installer une extension…** dans Claude et choisissez le fichier téléchargé. Démarrez ensuite une nouvelle conversation et posez une question.

:::tip Extension déjà installée ?
Il n'y a rien à faire — FreePlay fonctionne avec la même connexion. Seule exception : la version 1.1.0 demandait un courriel et un mot de passe B1 ; téléchargez et installez à nouveau l'extension pour la mettre à jour. Votre clé reste valide.
:::

## Est-ce sécuritaire ? {#is-it-safe}

- Claude ne peut voir que les données de **votre église**.
- **Avec connexion (option 1) :** Claude ne peut jamais faire plus que ce que votre propre identifiant B1 permet. La page de connexion B1 indique ce que Claude demande avant que vous ne cliquiez sur **Autoriser**.
- **Avec une clé (option 2) :** Claude ne peut faire que ce que la clé permet dans B1 — une clé avec uniquement des cases **lecture** cochées peut consulter les données, mais ne peut jamais rien modifier. FreePlay fonctionne de la même façon, avec la même clé.
- **Pour désactiver l'accès :** dans B1 Admin, allez dans **Paramètres → Développeur** et révoquez l'application sous **Applications connectées** (option 1) ou supprimez la clé sous **Clés API** (option 2). L'accès prend fin immédiatement. Vous pouvez aussi cliquer sur **Déconnecter** dans le connecteur B1 de Claude.

## Quel est le coût ? {#what-does-it-cost}

La connexion à B1 est gratuite : elle fait partie de ChurchApps. Claude dispose d'un forfait gratuit ; Claude Pro (environ 20 $ par mois) offre une utilisation bien plus importante. Consultez [claude.com/pricing](https://claude.com/pricing).

## Détails techniques {#technical-details}

La suite de cette page s'adresse aux utilisateurs techniques et aux assistants IA : autorisations, autres façons de se connecter et fonctionnement.

### Autorisations {#scopes}

Claude communique avec B1 par l'intermédiaire du **serveur Model Context Protocol (MCP)** intégré à l'API B1 (`https://api.churchapps.org/mcp`). Chaque appel passe par les mêmes règles d'authentification, d'autorisation et de cloisonnement par église qu'une requête provenant de B1 Admin. Claude est limité aux **autorisations et portées** de la clé API, et ne peut pas accéder aux webhooks des fournisseurs de paiement, aux points de terminaison d'administration des clients OAuth, ni aux points de terminaison de connexion et de mot de passe.

Ensembles d'autorisations de départ courants :

- **Assistant en lecture seule :** `people:read`, `groups:read`, `attendance:read`, `donations:read`, `content:read`
- **Lecture + ajout de notes / tâches :** ajoutez `people:write`
- **Assistant opérationnel complet :** ajoutez les autorisations `:write` correspondantes que vous souhaitez

Une clé `donations:read` permet à Claude de résumer les dons, mais pas d'enregistrer un don. Une clé `people:write` permet d'ajouter une personne, mais pas de consulter les dons. Consultez [Clés API](/docs/developer/api/api-keys) pour savoir ce que permet chaque autorisation.

### Autres façons de se connecter {#other-ways-to-connect}

#### Claude Code (CLI) {#claude-code-cli}

Dans un terminal :

```bash
claude mcp add --scope user --transport http b1 https://api.churchapps.org/mcp \
  --header "Authorization: Bearer cak_<prefix>.<secret>"
```

C'est tout. Dans n'importe quelle session Claude Code, tapez `/mcp` pour vérifier que le serveur `b1` est connecté, puis posez n'importe quelle question sur votre église.

#### Claude Desktop — configuration manuelle (avancé) {#claude-desktop--manual-config-advanced}

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

#### Claude.ai (web) — connecteur personnalisé {#claudeai-web--custom-connector}

Consultez l'**option 1** ci-dessus. Le connecteur utilise OAuth 2.1 : Claude découvre le serveur d'autorisation de B1 à partir de `https://api.churchapps.org/.well-known/oauth-protected-resource`, s'enregistre avec Dynamic Client Registration et se connecte avec PKCE. Sur les forfaits Team et Enterprise, un propriétaire peut devoir d'abord ajouter le connecteur pour l'organisation. Claude ne demande pas d'autorisations précises : la page de consentement propose donc tout ce à quoi le compte B1 connecté peut accéder. Révoquez-le sous **Paramètres → Développeur → Applications connectées** dans B1 Admin.

### Fonctionnement {#how-it-works}

L'API B1 expose un point de terminaison MCP unique à `/mcp`. Claude s'y connecte, s'authentifie avec votre clé `cak_…` et accède à quatre outils :

| Outil | Ce qu'il fait |
|---|---|
| `list_endpoints` | Liste les points de terminaison REST que Claude peut appeler, filtrables par chemin. Sert à la découverte. |
| `describe_endpoint` | Renvoie un bref résumé et un exemple de requête et de réponse pour un point de terminaison donné. |
| `api_call` | Appelle effectivement un point de terminaison REST au nom de l'utilisateur authentifié. |
| `describe_page_builder` | Un guide pour créer et modifier les pages du site web de votre église, que Claude lit avant de travailler sur le contenu du site. |

Il s'agit de la même surface que celle qu'utilise B1Admin, avec les mêmes points de terminaison `/membership/people`, `/giving/donations`, `/attendance/visits`, etc. — chaque règle d'autorisation s'applique de manière identique. Les points de terminaison de FreePlay (lessons.church) sont listés sous `/lessons/*` ; les appels de Claude vers ceux-ci sont transmis à FreePlay au nom du même utilisateur, avec les mêmes autorisations.

### Sécurité et limites {#safety-and-limits}

- **Isolement par église.** La clé API correspond à une seule église. Claude n'a aucun moyen de voir les données d'autres églises.
- **Limité par les autorisations.** Si vous retirez une autorisation à la personne qui a créé la clé dans B1Admin, Claude la perd dès l'appel suivant — immédiatement.
- **Révocable.** Supprimez la clé dans **Paramètres → Développeur → Clés API** et l'accès de Claude prend fin immédiatement.
- **Liste de blocage.** Les points de terminaison de webhooks des fournisseurs de paiement, les points de terminaison d'administration des clients OAuth, ainsi que les points de terminaison de connexion, d'inscription, de mot de passe et de double authentification ne sont pas accessibles via MCP.
- **Limite de taille des réponses.** Une seule réponse d'outil est limitée à 64 Ko afin que les longues listes ne saturent pas le contexte de Claude — Claude affinera alors la requête à l'aide de filtres.
- **Piste d'audit.** Les modifications passent par le même journal d'audit que les actions de B1Admin ; vous pouvez les consulter sous **Paramètres → Journal d'audit**.

### Dépannage {#troubleshooting}

**Claude demande un courriel et un mot de passe B1 pour utiliser FreePlay :** vous utilisez la version 1.1.0 de l'extension de bureau. Téléchargez-la et installez-la à nouveau pour la mettre à jour — les versions récentes n'utilisent que votre clé.

**Claude signale « Unauthorized » ou une erreur 401 :** le jeton Bearer est absent, mal formé, ou la clé a été révoquée. Si vous avez utilisé l'extension, ouvrez **Paramètres → Extensions → B1 (ChurchApps)** dans Claude et collez de nouveau la clé. Sinon, vérifiez l'en-tête `Authorization: Bearer cak_…` (attention à l'espace et au mot `Bearer` tel quel).

**Un appel d'outil renvoie une erreur 403 :** la clé API n'a pas l'autorisation pour ce point de terminaison. Ajoutez l'autorisation dans **Paramètres → Développeur → Clés API** (vous devrez créer une nouvelle clé — les autorisations ne peuvent pas être modifiées sur place) et collez la nouvelle clé dans les paramètres de l'extension ou dans la configuration de Claude.

**Claude ne trouve pas un point de terminaison :** demandez-lui d'appeler `list_endpoints` avec un filtre, par exemple *« utilise list_endpoints avec le filtre 'donations' pour trouver le bon chemin »*. L'inventaire des routes est généré à partir de l'API en service, donc tout ce que vous pouvez atteindre avec `curl` s'y trouve.

**Développement local :** remplacez `https://api.churchapps.org/mcp` par `http://localhost:8084/mcp` — mêmes mécanismes d'authentification, mêmes outils.

## Voir aussi {#related}

- [Clés API](/docs/developer/api/api-keys) — référence complète des autorisations
- [Serveur MCP (référence développeur)](/docs/developer/api/mcp) — détails du protocole et schémas des outils
- [ChatGPT](./chatgpt.md) — même principe, pour les modèles d'OpenAI
