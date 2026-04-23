---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin est le tableau de bord d'administration de l'église -- une application monopage React construite avec Vite et Material-UI. Le personnel de l'église l'utilise pour gérer les personnes, les groupes, la présence, les donations, le contenu et plus.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js 22+** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Configurer votre cible API (staging ou local) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Configuration

### 1. Cloner le référentiel

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Installer les dépendances

```bash
cd B1Admin
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp dotenv.sample.txt .env
```

Ouvrez `.env` et configurez les endpoints API. Vous pouvez les pointer vers l'API de staging ou votre instance d'API locale.

### 4. Démarrer le serveur de développement

```bash
npm start
```

Cela lance le serveur de développement Vite. L'application sera disponible dans votre navigateur avec le remplacement de module chaud activé.

## Variables d'environnement clés

| Variable | Description |
|----------|-------------|
| `REACT_APP_STAGE` | Nom de l'environnement (par exemple, `local`, `staging`, `prod`) |
| `PORT` | Port du serveur de développement (défaut : `3101`) |
| `REACT_APP_*_API` | URLs des endpoints API pour chaque module |

:::info
Le script `postinstall` copie les fichiers de locale et CSS de `@churchapps/apphelper`. Si les composants semblent non stylisés, exécutez `npm run postinstall` manuellement.
:::

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm start` | Démarrer le serveur de développement Vite |
| `npm run build` | Build de production via Vite |
| `npm run test` | Exécuter les tests end-to-end avec Playwright |
| `npm run lint` | Exécuter ESLint avec correction automatique |

## Pile technologique

- **React 19** avec TypeScript
- **Vite** pour les outils de build et le serveur de développement
- **Material-UI 7** pour les composants UI
- **React Query 5** pour l'état du serveur
- Paquets **`@churchapps/apphelper*`** pour les composants partagés

## Déploiement

Les builds de production sont déployés vers **S3 + CloudFront** :

1. `npm run build` génère les actifs statiques
2. Les actifs sont synchronisés vers un bucket S3
3. L'invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour les instructions de déploiement détaillées, voir le guide [Déploiement des applications web](../deployment/web-apps).
:::
