---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin est le tableau de bord d'administration de l'église -- une application monopage React construite avec Vite et Material-UI. Le personnel de l'église l'utilise pour gérer les personnes, les groupes, la présence, les dons, le contenu et bien plus encore.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Installez **Node.js 22+** et **Git** -- voir [Prérequis](../setup/prerequisites)
- Configurez votre cible d'API (démo ou locale) -- voir [Variables d'environnement](../setup/environment-variables)

</div>

## Installation

### 1. Cloner le dépôt

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

Ouvrez `.env` et configurez les points de terminaison de l'API. Vous pouvez les faire pointer vers l'API de démonstration partagée (`https://api.demo.churchapps.org`) ou vers votre instance locale de l'API. Le fichier d'exemple peut encore répertorier d'anciennes URL de préproduction retirées ; remplacez-les.

### 4. Démarrer le serveur de développement

```bash
npm start
```

Cela lance le serveur de développement Vite. L'application sera disponible dans votre navigateur avec le rechargement à chaud (HMR) activé.

## Variables d'environnement principales

| Variable | Description |
|----------|-------------|
| `REACT_APP_STAGE` | Nom de l'environnement (par ex. `demo` comme dans le fichier d'exemple, `prod` ou `selfhost`) |
| `PORT` | Port du serveur de développement (par défaut : `3101`) |
| `REACT_APP_*_API` | URL des points de terminaison de l'API pour chaque module |

:::info
Le script `postinstall` copie les fichiers de locale et de CSS depuis `@churchapps/apphelper`. Si des composants apparaissent sans style, exécutez manuellement `npm run postinstall`.
:::

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm start` | Démarrer le serveur de développement Vite |
| `npm run build` | Build de production via Vite |
| `npm run test` | Exécuter les tests de bout en bout avec Playwright |
| `npm run lint` | Exécuter ESLint avec correction automatique |

## Pile technique

- **React 19** avec TypeScript
- **Vite** pour les outils de build et le serveur de développement
- **Material-UI 7** pour les composants d'interface
- **React Query 5** pour l'état côté serveur
- **`@churchapps/apphelper*`** -- paquets partagés de composants communs

## Déploiement

Les builds de production sont déployés sur **S3 + CloudFront** :

1. `npm run build` génère les ressources statiques
2. Les ressources sont synchronisées vers un bucket S3
3. Une invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour des instructions de déploiement détaillées, consultez le guide [Déploiement de l'application web](../deployment/web-apps).
:::
