---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App est l'application destinée aux membres de l'église, accessible au public, développée avec Next.js. Elle offre l'expérience membre, notamment les profils, les annuaires de groupes, la diffusion en direct et les pages de dons.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js 22+** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Configurez votre cible d'API (démo ou locale) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

:::warning
B1App nécessite Node.js 22 ou une version ultérieure. Les versions antérieures ne sont pas prises en charge.
:::

## Installation

### 1. Cloner le dépôt

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

Ouvrez `.env` et configurez les URL des points de terminaison `NEXT_PUBLIC_*_API`. Elles peuvent pointer vers l'API de démonstration partagée (`https://api.demo.churchapps.org`) ou vers votre instance locale de l'API. Le fichier d'exemple peut encore contenir d'anciennes URL de préproduction retirées ; remplacez-les.

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur de développement Next.js se lance à l'adresse [http://localhost:3301](http://localhost:3301).

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarrer le serveur de développement Next.js sur le port 3301 |
| `npm run build` | Build de production via Next.js |
| `npm run test` | Exécuter les tests de bout en bout avec Playwright |
| `npm run lint` | Exécuter le linter de Next.js |

## Principales variables d'environnement

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URL des points de terminaison de l'API pour chaque module |

:::info
Le script `postinstall` copie les fichiers de langue et de CSS depuis `@churchapps/apphelper`. Si les composants apparaissent sans style après l'installation, exécutez `npm run postinstall` manuellement.
:::

## Pile technique

- **Next.js 16** avec TypeScript
- **React 19** pour les composants d'interface
- **Material-UI 7** pour le système de design
- **React Query 5** pour l'état serveur
- **Paquets `@churchapps/apphelper*`** pour les composants partagés

## Déploiement

Les builds de production sont déployés sur **S3 + CloudFront** :

1. `npm run build` génère le build Next.js optimisé
2. Le résultat du build est synchronisé vers un bucket S3
3. Une invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour des instructions de déploiement détaillées, consultez le guide [Déploiement des applications web](../deployment/web-apps).
:::
