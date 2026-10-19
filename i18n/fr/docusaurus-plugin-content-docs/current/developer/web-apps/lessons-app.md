---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp est l'application de gestion des contenus de leçons pour [Lessons.church](https://lessons.church). Elle fournit une interface pour créer, organiser et publier les programmes de leçons de l'église, développée avec Next.js et React.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez **Node.js 22+** et **Git** -- voir les [prérequis](../setup/prerequisites)
- Configurez la cible de votre API (LessonsApi en local) -- voir les [variables d'environnement](../setup/environment-variables)

</div>

:::warning
LessonsApp nécessite Node.js 22 ou une version ultérieure. Les versions antérieures ne sont pas prises en charge.
:::

## Configuration

### 1. Cloner le dépôt

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Installer les dépendances

```bash
cd LessonsApp
npm install
```

### 3. Configurer les variables d'environnement

Copiez le fichier d'exemple des variables d'environnement vers `.env` et configurez les points de terminaison de l'API :

```bash
cp dotenv.sample.txt .env
```

Mettez à jour les URL des points de terminaison de l'API pour qu'elles pointent vers votre instance locale de LessonsApi (`http://localhost:8090`). L'API de préproduction de Lessons a été retirée : remplacez donc toutes les URL `api.staging.lessons.church` présentes dans le fichier d'exemple.

### 4. Démarrer le serveur de développement

```bash
npm run dev
```

Le serveur de développement Next.js se lance sur [http://localhost:3501](http://localhost:3501).

## Commandes principales

| Commande | Description |
|---------|-------------|
| `npm run dev` | Démarre le serveur de développement Next.js sur le port 3501 |
| `npm run build` | Compilation de production via Next.js |

## Pile technique

- **Next.js 16** avec TypeScript
- **React 19** pour les composants d'interface
- **Paquets `@churchapps/apphelper*`** pour les composants partagés

:::info
LessonsApp communique avec le backend **LessonsApi**, une API distincte de l'API principale de ChurchApps. Assurez-vous que votre environnement est configuré avec le bon point de terminaison de l'API Lessons.
:::

## Déploiement

Les builds de production sont déployés sur **S3 + CloudFront** :

1. `npm run build` génère le build Next.js optimisé
2. Le résultat du build est synchronisé avec un bucket S3
3. Une invalidation CloudFront est déclenchée pour servir la nouvelle version

:::tip
Pour des instructions de déploiement détaillées, consultez le guide [Déploiement des applications web](../deployment/web-apps).
:::
