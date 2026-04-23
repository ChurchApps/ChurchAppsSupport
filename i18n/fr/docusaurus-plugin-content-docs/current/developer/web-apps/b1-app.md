---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App est l'application publique des membres de l'église construite avec Next.js. Elle fournit l'expérience des membres y compris les profils, les répertoires de groupe, la diffusion en direct et les pages de donation.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installer **Node.js 22+** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Configurer votre cible API (staging ou local) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

:::warning
B1App nécessite Node.js 22 ou ultérieur. Les versions antérieures ne sont pas supportées.
:::

## Configuration

### 1. Cloner le référentiel

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Installer les dépendances

```bash
cd B1App
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp dotenv.sample.txt .env
```

Ouvrez `.env` et configurez les URLs des endpoints `NEXT_PUBLIC_*_API`. Ceux-ci peuvent pointer vers l'API de staging ou votre instance d'API locale.

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur de développement Next.js démarre à [http://localhost:3301](http://localhost:3301).

## Commandes clés

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de développement Next.js sur le port 3301 |
| `npm run build` | Build de production via Next.js |
| `npm run test` | Exécuter les tests end-to-end avec Playwright |
| `npm run lint` | Exécuter le lint Next.js |

## Variables d'environnement clés

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URLs des endpoints API pour chaque module |

:::info
Le script `postinstall` copie les fichiers de locale et CSS de `@churchapps/apphelper`. Si les composants semblent non stylisés après l'installation, exécutez `npm run postinstall` manuellement.
:::

## Pile technologique

- **Next.js 16** avec TypeScript
- **React 19** pour les composants UI
- **Material-UI 7** pour le système de design
- **React Query 5** pour l'état du serveur
- Paquets **`@churchapps/apphelper*`** pour les composants partagés

## Déploiement

Les builds de production sont déployés vers **S3 + CloudFront** :

1. `npm run build` génère la build Next.js optimisée
2. La sortie de build est synchronisée vers un bucket S3
3. L'invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour les instructions de déploiement détaillées, voir le guide [Déploiement des applications web](../deployment/web-apps).
:::
